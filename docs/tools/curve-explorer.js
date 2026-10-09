// SPDX-FileCopyrightText: 2026 Joe Heffer
//
// SPDX-License-Identifier: MIT

// Interactive dawn curve explorer for docs/tools/curves.md.
// Uses the curve functions in brightness.js.

(function () {
  "use strict";

  const b = window.dimpsyBrightness;
  const root = document.getElementById("curve-explorer");
  if (!b || !root) {
    return;
  }

  const UPDATE_MS = 100;  // as firmware/core/tools/curves.cpp
  const CURVES = [
    { key: b.Curve.Exponential, name: "Exponential" },
    { key: b.Curve.CieLightness, name: "CIE 1931 lightness" },
    { key: b.Curve.Gamma, name: "Gamma" },
  ];
  // A warm white for the preview, in linear sRGB.
  const WARM = [1.0, 0.56, 0.24];

  const $ = (id) => root.querySelector(`[data-id="${id}"]`);
  const controls = {
    curve: $("curve"),
    range: $("range"),
    gamma: $("gamma"),
    minutes: $("minutes"),
    bits: $("bits"),
    log: $("log"),
  };
  const plot = $("plot");
  const lamp = $("lamp");
  const scrub = $("scrub");
  const play = $("play");
  const readout = $("readout");
  const table = $("steps");

  function settings() {
    return {
      curve: controls.curve.value,
      range: Math.round(10 ** Number(controls.range.value)),
      gamma: Number(controls.gamma.value),
      minutes: Number(controls.minutes.value),
      bits: Number(controls.bits.value),
      log: controls.log.checked,
    };
  }

  function paramsFor(curve, s) {
    return { curve, range: s.range, gamma: s.gamma };
  }

  function levelAt(params, elapsedMs, durationMs) {
    return b.level(params, b.rampPosition(elapsedMs, durationMs));
  }

  function distinctDuties(params, bits, durationMs, untilMs) {
    const seen = new Set();
    for (let t = 0; t <= untilMs; t += UPDATE_MS) {
      seen.add(b.duty(levelAt(params, t, durationMs), bits));
    }
    return seen.size;
  }

  function percent(level) {
    const p = 100 * level;
    if (p === 0) {
      return "0 %";
    }
    return p < 0.1 ? `${p.toPrecision(2)} %` : `${p.toFixed(p < 10 ? 2 : 1)} %`;
  }

  // Linear light to an sRGB channel value, so the preview disc emits
  // roughly the light output the curve asks for.
  function srgb(linear) {
    const c = linear <= 0.0031308 ? 12.92 * linear : 1.055 * linear ** (1 / 2.4) - 0.055;
    return Math.round(255 * Math.min(1, Math.max(0, c)));
  }

  const SVG = "http://www.w3.org/2000/svg";
  const W = 640;
  const H = 320;
  const PAD = { left: 56, right: 16, top: 16, bottom: 40 };
  const LOG_MIN = 1e-5;

  function el(name, attrs, text) {
    const node = document.createElementNS(SVG, name);
    for (const [k, v] of Object.entries(attrs)) {
      node.setAttribute(k, v);
    }
    if (text !== undefined) {
      node.textContent = text;
    }
    return node;
  }

  function drawPlot(s) {
    const durationMs = s.minutes * 60000;
    const x = (t) => PAD.left + (t / durationMs) * (W - PAD.left - PAD.right);
    const y = (v) => {
      const frac = s.log
        ? (Math.log10(Math.max(v, LOG_MIN)) - Math.log10(LOG_MIN)) / -Math.log10(LOG_MIN)
        : v;
      return H - PAD.bottom - frac * (H - PAD.top - PAD.bottom);
    };

    plot.replaceChildren();
    plot.setAttribute("viewBox", `0 0 ${W} ${H}`);

    const ticks = s.log ? [1e-5, 1e-4, 1e-3, 1e-2, 1e-1, 1] : [0, 0.25, 0.5, 0.75, 1];
    for (const v of ticks) {
      plot.append(el("line", { x1: PAD.left, x2: W - PAD.right, y1: y(v), y2: y(v), class: "ce-grid" }));
      plot.append(el("text", { x: PAD.left - 6, y: y(v) + 4, class: "ce-label", "text-anchor": "end" },
        `${Number((100 * v).toPrecision(3))}%`));
    }
    const step = s.minutes <= 20 ? 5 : 10;
    for (let m = 0; m <= s.minutes; m += step) {
      const t = m * 60000;
      plot.append(el("text", { x: x(t), y: H - PAD.bottom + 18, class: "ce-label", "text-anchor": "middle" }, String(m)));
    }
    plot.append(el("text", { x: (PAD.left + W - PAD.right) / 2, y: H - 4, class: "ce-label", "text-anchor": "middle" },
      "Minutes into the dawn"));

    const samples = 240;
    for (const c of CURVES) {
      const params = paramsFor(c.key, s);
      let d = "";
      for (let i = 0; i <= samples; i += 1) {
        const t = (i / samples) * durationMs;
        d += `${i === 0 ? "M" : "L"}${x(t).toFixed(1)},${y(levelAt(params, t, durationMs)).toFixed(1)}`;
      }
      const selected = c.key === s.curve;
      plot.append(el("path", { d, class: selected ? "ce-line ce-selected" : "ce-line" }));
    }

    const cursor = el("line", { y1: PAD.top, y2: H - PAD.bottom, class: "ce-cursor" });
    plot.append(cursor);
    return { x, cursor };
  }

  let geometry = null;

  function drawTable(s) {
    const durationMs = s.minutes * 60000;
    const rows = CURVES.map((c) => {
      const params = paramsFor(c.key, s);
      const at1 = levelAt(params, 60000, durationMs);
      return `<tr${c.key === s.curve ? ' class="ce-row-selected"' : ""}>
        <td>${c.name}</td>
        <td>${percent(at1)}</td>
        <td>${distinctDuties(params, s.bits, durationMs, 60000)}</td>
        <td>${distinctDuties(params, s.bits, durationMs, 180000)}</td>
      </tr>`;
    }).join("");
    table.innerHTML = `<thead><tr>
        <th>Curve</th><th>Output at 1 min</th>
        <th>${s.bits}-bit steps, 1 min</th><th>${s.bits}-bit steps, 3 min</th>
      </tr></thead><tbody>${rows}</tbody>`;
  }

  function showPosition(s) {
    const durationMs = s.minutes * 60000;
    const t = (Number(scrub.value) / 1000) * durationMs;
    const lvl = levelAt(paramsFor(s.curve, s), t, durationMs);
    const [r, g, bl] = WARM.map((c) => srgb(c * lvl));
    lamp.style.background = `rgb(${r}, ${g}, ${bl})`;
    lamp.style.boxShadow = `0 0 ${Math.round(8 + 48 * Math.sqrt(lvl))}px rgba(${r}, ${g}, ${bl}, ${0.25 + 0.6 * Math.sqrt(lvl)})`;
    const minutes = Math.floor(t / 60000);
    const seconds = Math.floor((t % 60000) / 1000);
    readout.textContent = `${minutes}:${String(seconds).padStart(2, "0")} · ${percent(lvl)} · duty ${b.duty(lvl, s.bits)} of ${2 ** s.bits - 1}`;
    if (geometry) {
      const xPos = geometry.x(t).toFixed(1);
      geometry.cursor.setAttribute("x1", xPos);
      geometry.cursor.setAttribute("x2", xPos);
    }
  }

  function render() {
    const s = settings();
    $("range-value").textContent = `${s.range.toLocaleString("en-GB")}:1`;
    $("gamma-value").textContent = s.gamma.toFixed(1);
    $("minutes-value").textContent = `${s.minutes} min`;
    $("range-row").hidden = s.curve !== b.Curve.Exponential;
    $("gamma-row").hidden = s.curve !== b.Curve.Gamma;
    geometry = drawPlot(s);
    drawTable(s);
    showPosition(s);
  }

  // Plays the whole dawn in about ten seconds.
  let frame = null;
  let last = 0;
  function tick(now) {
    const dt = last ? now - last : 0;
    last = now;
    let value = Number(scrub.value) + dt / 10;
    if (value >= 1000) {
      value = 1000;
      stop();
    }
    scrub.value = String(value);
    showPosition(settings());
    if (frame !== null) {
      frame = requestAnimationFrame(tick);
    }
  }
  function stop() {
    if (frame !== null) {
      cancelAnimationFrame(frame);
    }
    frame = null;
    play.textContent = "Play dawn";
  }
  play.addEventListener("click", () => {
    if (frame !== null) {
      stop();
      return;
    }
    if (Number(scrub.value) >= 1000) {
      scrub.value = "0";
    }
    last = 0;
    play.textContent = "Pause";
    frame = requestAnimationFrame(tick);
  });

  for (const input of Object.values(controls)) {
    input.addEventListener("input", render);
  }
  scrub.addEventListener("input", () => {
    stop();
    showPosition(settings());
  });

  render();
}());
