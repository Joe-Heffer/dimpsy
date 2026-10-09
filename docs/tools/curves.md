<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Dawn curve explorer

The lamp’s dimmer and its dawn and dusk ramps map a position (a dial setting, or the fraction of a ramp’s duration) to light output through a perceptual brightness curve. Issue [#16](https://github.com/Joe-Heffer/dimpsy/issues/16) lists three candidates. This page runs the same curve code as the firmware, so you can compare them before any LEDs are wired.

<div id="curve-explorer" class="ce" markdown="0">
  <div class="ce-controls">
    <label>Curve
      <select data-id="curve">
        <option value="exponential">Exponential</option>
        <option value="cie" selected>CIE 1931 lightness</option>
        <option value="gamma">Gamma</option>
      </select>
    </label>
    <label data-id="range-row">Range <output data-id="range-value"></output>
      <input data-id="range" type="range" min="2" max="5" step="0.1" value="4">
    </label>
    <label data-id="gamma-row">Gamma <output data-id="gamma-value"></output>
      <input data-id="gamma" type="range" min="1.2" max="3.5" step="0.1" value="2.2">
    </label>
    <label>Dawn length <output data-id="minutes-value"></output>
      <input data-id="minutes" type="range" min="5" max="60" step="5" value="30">
    </label>
    <label>PWM resolution
      <select data-id="bits">
        <option value="8">8-bit</option>
        <option value="10">10-bit</option>
        <option value="12">12-bit</option>
        <option value="16" selected>16-bit</option>
      </select>
    </label>
    <label class="ce-check"><input data-id="log" type="checkbox"> Log scale</label>
  </div>
  <svg data-id="plot" class="ce-plot" role="img" aria-label="Light output against time for the three candidate curves, with the selected curve highlighted"></svg>
  <div class="ce-preview">
    <div data-id="lamp" class="ce-lamp" aria-hidden="true"></div>
    <div class="ce-player">
      <button data-id="play" type="button" class="md-button md-button--primary">Play dawn</button>
      <input data-id="scrub" type="range" min="0" max="1000" step="1" value="0" aria-label="Position in the dawn">
      <p data-id="readout" class="ce-readout" aria-live="polite"></p>
    </div>
  </div>
  <div class="ce-table-wrap">
    <table data-id="steps" class="ce-table"></table>
  </div>
</div>

<script src="../brightness.js"></script>
<script src="../curve-explorer.js"></script>

## Reading the results

* **The plot** shows relative light output over the dawn. Turn on the log scale to see the first few minutes, where the curves differ most and where the eye is most sensitive.
* **The preview disc** shows the selected curve on your screen. Screens cannot go as dark as an LED, so treat it as a rough guide only.
* **The table** counts the distinct PWM duty values the output passes through in the first one and three minutes, updating every 100 ms. Few values means visible steps at low brightness (see issue [#8](https://github.com/Joe-Heffer/dimpsy/issues/8)).

## Where the code comes from

`brightness.js` is a direct port of [`firmware/core/brightness.h`](https://github.com/Joe-Heffer/dimpsy/blob/main/firmware/core/brightness.h). CI runs `firmware/core/test/curves_parity.js` to check that both give the same values, so the explorer cannot drift from the firmware. The same CI job adds charts of the default curves to its job summary.
