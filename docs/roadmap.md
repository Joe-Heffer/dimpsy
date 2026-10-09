<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# Roadmap

Dimpsy is an early prototype. This page gives the broad order of work. The detail lives in [GitHub issues](https://github.com/Joe-Heffer/dimpsy/issues) and the [decision records](decisions/README.md).

## Now: alpha and first prototype

An [alpha build](alpha.md) from stocked parts smoke-tests the whole system while the first prototype’s parts are sourced. The first prototype is a bench and bedside test rig, described in [First prototype](prototype.md).

* Choose an LED: an SK6812 RGBW strip or warm white and red 12 V strips ([decision 0006](decisions/0006-led-candidate.md), open).
* Choose a perceptual brightness curve for the dimmer and the dawn and dusk ramps (issue [#16](https://github.com/Joe-Heffer/dimpsy/issues/16)). Try them in the [curve explorer](tools/curves.md).
* Smooth dimming at very low levels without visible steps or flicker (issue [#8](https://github.com/Joe-Heffer/dimpsy/issues/8)).
* Add the controls to the firmware and simulate them in Wokwi (issue [#9](https://github.com/Joe-Heffer/dimpsy/issues/9)).
* Measure light at the pillow with a TSL2591 logger.

## Next

* Write the [requirements](requirements.md) and fill in the [design principles](design-principles.md) from what the prototype shows.
* Decide the board for the finished lamp. Decision 0007 covers the prototype only.
* Design a USB-C powered circuit in KiCad, in line with [decision 0003](decisions/0003-usb-c-power-only.md).

## Later

* A custom enclosure, with CAD source and STL files.
* Build instructions that others can follow.

See the [changelog](changelog.md) for what has been done so far.
