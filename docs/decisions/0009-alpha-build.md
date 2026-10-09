<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# 0009: An alpha build from stocked parts

* **Status:** Accepted
* **Date:** 2026-10-09
* **Deciders:** Joe Heffer

## Context

Parts for the [first prototype](../prototype.md) are proving hard to source. The LED candidates in [decision 0006](0006-led-candidate.md) are still open, and several of them (12 V strips, tunable-white COB strips, discrete power LEDs) mean specialist suppliers or overseas orders. Nothing has been switched on yet, so problems with the power, controls, clock or firmware will not show up until the LED is chosen.

A smaller build that runs end to end would let the firmware and controls move forward while the LED question is worked on.

## Options

* **Wait for the `proto-1` parts.** Nothing extra to buy, but no hardware testing until the LED is decided and the parts arrive.
* **An alpha build from parts that UK hobby suppliers stock.** An SK6812 RGBW strip at 5 V, a Raspberry Pi USB-C charger, a USB-C breakout, one encoder, an arcade button, a toggle and a DS3231 clock, from The Pi Hut, Pimoroni, RS or Amazon. Tests the whole system soon. The strip’s 8-bit steps limit what it says about light quality.
* **The Arduino Mega starter kit only.** Parts already held, but no Wi-Fi, no ESPHome and 5 V logic, so it tests little that carries over (see [decision 0007](0007-microcontroller-board.md)).

## Decision

Build an **alpha** before `proto-1`, as set out in [Alpha build](../alpha.md).

* It runs from a standard USB-C charger at 5 V, so it meets [decision 0003](0003-usb-c-power-only.md) without separate bench supplies.
* It uses the ESP32 DevKitC, the provisional pin map and ESPHome from decisions 0004 and 0007, so the firmware and wiring carry forward.
* The strip is cut to 30 LEDs and the colour channels are capped in firmware, which keeps the draw inside the charger’s rating.
* The LED is candidate A from decision 0006. The alpha is not the LED test and does not decide 0006.

## Consequences

* `firmware/esphome/dimpsy-alpha.yaml` adds the strip, controls, clock and sunrise to `dimpsy.yaml`.
* `hardware/bom.csv` lists the alpha parts under the build name `alpha`.
* Most alpha parts (charger, breakout, fuse, controls, clock and core tube) are reused in `proto-1`.
* Results from the smoke test plan feed decision 0006 and issues [#42](https://github.com/Joe-Heffer/dimpsy/issues/42) and [#44](https://github.com/Joe-Heffer/dimpsy/issues/44).
