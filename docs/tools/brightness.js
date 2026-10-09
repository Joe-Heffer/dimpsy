// SPDX-FileCopyrightText: 2026 Joe Heffer
//
// SPDX-License-Identifier: GPL-3.0-or-later

// Browser port of firmware/core/brightness.h, for the curve explorer.
//
// Keep this in step with the C++ header. firmware/core/test/curves_parity.js
// compares the two in CI. Math.fround rounds to 32-bit floats as the C++ does.

(function (root) {
  "use strict";

  const f = Math.fround;

  const Curve = Object.freeze({
    Exponential: "exponential",
    CieLightness: "cie",
    Gamma: "gamma",
  });

  function clamp01(x) {
    if (!(x > 0)) {  // also catches NaN
      return 0;
    }
    return x < 1 ? f(x) : 1;
  }

  function exponentialLevel(position, range) {
    return f(Math.pow(f(range), f(clamp01(position) - 1)));
  }

  function cieLightnessLevel(position) {
    const lightness = f(100 * clamp01(position));
    if (lightness <= 8) {
      return f(lightness / f(903.3));
    }
    const v = f(f(lightness + 16) / 116);
    return f(f(v * v) * v);
  }

  function gammaLevel(position, gamma) {
    return f(Math.pow(clamp01(position), f(gamma)));
  }

  function level(params, position) {
    switch (params.curve) {
    case Curve.Exponential:
      return exponentialLevel(position, params.range);
    case Curve.CieLightness:
      return cieLightnessLevel(position);
    case Curve.Gamma:
      return gammaLevel(position, params.gamma);
    }
    return 0;
  }

  // Fraction of a ramp completed after elapsedMs, from 0 to 1.
  function rampPosition(elapsedMs, durationMs) {
    if (durationMs === 0 || elapsedMs >= durationMs) {
      return 1;
    }
    return f(elapsedMs / durationMs);
  }

  // PWM duty for a level at the given resolution, rounded to the nearest step.
  function duty(lvl, bits) {
    const maxDuty = bits >= 32 ? 4294967295 : 2 ** bits - 1;
    return Math.floor(clamp01(lvl) * maxDuty + 0.5);
  }

  const api = {
    Curve,
    clamp01,
    exponentialLevel,
    cieLightnessLevel,
    gammaLevel,
    level,
    rampPosition,
    duty,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    root.dimpsyBrightness = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : this));
