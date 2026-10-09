<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# 0006: LED candidate for the prototype

* **Status:** Open
* **Date:** 2026-10-09
* **Deciders:** Joe Heffer and collaborator

## Context

The first prototype exists to choose an LED and tune the dawn curve. Candidates A and B are described in [docs/prototype.md](../prototype.md), and only one is fitted at a time. Each has its own connector type so the wrong supply cannot be connected.

[0003](0003-usb-c-power-only.md) requires USB-C-only power for the design. Candidate A is planned with a separate 5 V 4 A adapter, and candidate B needs a 12 V supply.

### Lighting aims

Published research gives the aims the LED has to meet.

* **Dawn:** [Gabel et al. (2013)](https://orbi.uliege.be/bitstream/2268/171514/1/Gabel_CI_2013.pdf) ramped light from 0 to 250 lux over the 30 minutes before waking, with the colour temperature rising from about 1090 K to 2750 K. It improved mood and well-being compared with dim light and blue light.
* **Evening and night:** [Brown et al. (2022)](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.3001571) recommend at most 10 lux melanopic EDI from three hours before bed, and at most 1 lux while asleep.
* **Flicker:** PWM dimming should be fast enough to avoid visible flicker. The working figure is 3 kHz or more at full modulation depth (IEEE 1789). This figure has not yet been checked against the standard.
* **Dimming range:** smooth steps at the lowest levels, which needs 12-bit or better PWM from the ESP32 (see [0007](0007-microcontroller-board.md)).

These point to a warm channel reaching 2700 K, a further channel for the evening and the start of dawn (amber at 1800 to 2200 K, or deep red), and enough output for about 250 lux at the pillow. A rough estimate puts that at 800 lm at 0.5 m from a diffuse globe. Measure it with the light logger before relying on it.

### Supply voltage

A strip is built for one voltage, and the same power needs less current at a higher voltage. Standard USB-C provides 5 V at up to 3 A (15 W). A 12 V strip needs a USB-C Power Delivery charger and a trigger board. A 24 V strip is above the 20 V that standard Power Delivery offers, so it needs a separate adapter. The strip supply must share its ground with the ESP32, and each MOSFET must be rated for the strip voltage and switch fully on at 3.3 V.

## Options

* **Candidate A, SK6812 RGBW strip (5 V):** one addressable strip with white and colour channels, and compatible with USB-C at 5 V if the current fits. The SK6812 family gives 256 levels per channel and PWM at about 1.2 kHz (from the WWA datasheet, to be confirmed for the RGBW part), so it falls short of the dimming and flicker aims.
* **Candidate B, warm white and red 12 V strips with logic-level MOSFETs:** simple analogue dimming, and a pure red channel for night use. It needs 12 V, so it would need USB-C Power Delivery or be dropped.
* **Candidate C, tunable-white (CCT) COB strip plus an amber or red strip, with logic-level MOSFETs:** a COB strip carries warm and cool white LEDs interleaved as a continuous line without visible dots. A 3-wire strip has a shared positive and one wire per colour, so it takes two MOSFETs and two PWM pins (a third for the amber or red strip). It meets the dimming and flicker aims, but stops at 2700 K, so the amber or red strip is still needed. It is sold at 5, 12 and 24 V. Strips found so far, with specifications taken from supplier pages and not yet confirmed:
  * [LED Supply COB-IP2024V10M-TW](https://www.ledsupply.com/content/pdf/COB-IP2024V10M-TW.pdf): 24 V, 2700 to 6500 K, 608 LEDs/m, about 13 W/m, about 1,080 lm/m, CRI 90+, 10 mm wide, 3-wire.
  * [Aspect AL-SL-LN-IP20-24-CCT](https://cdn.aspectled.com/downloads/cut-sheets/flexible-strip/color-changing/AL-SL-LN-IP20-24-CCT_CutSheet.pdf): 24 V, 2700 to 6500 K, 608 LEDs/m, up to 14 W/m, up to 1,400 lm/m, CRI 90, 10 mm wide.
  * [Superlighting 12 V COB CCT](https://www.superlightingled.com/12-volt-cob-led-cct-2700-to-6500-kelvin-adjustable-light-strip-cuttable-p-6950.html) and [5 V COB CCT](https://www.superlightingled.com/5v-small-cob-light-warm-to-cool-5mm-cob-led-strip-cct-adjustable-p-6858.html): the pages do not state LEDs per metre, output, CRI or wiring, so ask the supplier.
* **Candidate D, SK6812 WWA addressable strip (5 V):** cool white (6000 to 7000 K), warm white (2700 to 3000 K) and amber (1800 to 2000 K) channels, which match the Gabel ramp closely. It has the same 8-bit and 1.2 kHz limits as candidate A, so it suits a quick test of the spectrum more than the finished lamp.
* **Candidate E, discrete power LEDs with constant-current drivers:** for example a high-CRI warm white or full-spectrum LED, an amber or deep red LED and a cool white LED, each on an aluminium star bolted to the core tube. It gives the best light quality and dimming range from a 5 V supply, and needs the most design work.

Two kinds of strip are excluded. 2-wire CCT strips use a special controller and probably reverse polarity, which would need a different driver circuit. Addressable CCT strips with WS2811 chips are limited to 8-bit control.

## Decision

Not yet decided. Open sub-questions:

* Are the separate bench supplies acceptable for the prototype only, or should candidate B be dropped or run from USB-C Power Delivery?
* Which strip voltage should the first test of candidate C use? One proposal for discussion is 12 V, since it reuses candidate B’s supply and MOSFETs.
* Does ESPHome’s `cwww` light platform work with two `ledc` outputs at 12-bit or better? This links to [issue #42](https://github.com/Joe-Heffer/dimpsy/issues/42).
* What do the suppliers say about CRI, output per metre and wiring for the Superlighting strips?

## Consequences

The choice affects the driver circuit, the firmware output code and the power section of the requirements. Candidate C or E needs a third PWM output for the amber or red channel, so the provisional pin map in [0007](0007-microcontroller-board.md) would change.

Record the light logger results that informed the choice here once they exist. Add the chosen parts to `hardware/prototype-parts.csv` and `hardware/bom.csv` after the decision.
