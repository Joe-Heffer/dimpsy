<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# 0003: Power the finished lamp from USB-C only

* **Status:** Accepted
* **Date:** 2026-10-09
* **Deciders:** Joe Heffer

## Context

The lamp sits next to a bed. Keeping the design at extra-low voltage (a level that cannot give a dangerous electric shock) removes the main electrical safety risk and makes it safer for others to build. The README already states this rule.

The lamp does not need a large supply. A bedside sunrise lamp aims for roughly 300 to 1000 lux (a measure of brightness) at the pillow, which a strip of about 10 to 20 W can deliver. For comparison:

* **USB-C at 5 V, 3 A:** 15 W, enough for a modest lamp.
* **USB-C Power Delivery (PD) at 12 V, 2 to 3 A:** 24 to 36 W, enough with room to spare. PD is the part of USB-C that lets a charger and a device agree on a higher voltage. A small “PD trigger” board does the asking, so the lamp can request 12 V from a standard USB-C charger.

## Options

* **USB-C only:** no mains wiring anywhere in the design. Output is limited by the supply, and a 12 V LED option would need USB-C Power Delivery.
* **Mains-powered with an internal supply:** more freedom over LEDs, but it adds shock and fire risks and certification concerns for anyone building from the files. Dimming mains voltage also needs specialist parts and careful construction.
* **Battery pack:** useful for a portable demo, but it adds a fire risk and charging circuitry, and it is a poor fit for a lamp left on overnight. A ready-made power bank would be the only acceptable form, and it would still be charged and used over USB-C.

## Decision

The design is powered by USB-C only. No part of it is to be connected to mains voltage or adapted to run from it.

The supply is a standard USB-C charger. Where an LED option needs more than 5 V, the lamp gets it through USB-C Power Delivery (for example 12 V), not through a separate barrel-jack adapter.

## Consequences

The LED choice has to fit within what USB-C can supply. Size the supply to at least 1.25 times the greatest LED draw, which is the strip’s power in watts divided by its voltage.

Safety practices for any build:

* Fuse the supply input (an inline 3 A fuse is cheap), and use wire rated above the fuse current.
* Check that nothing gets above about 50 to 60 °C after an hour at full output. Mount the transistors that switch the LEDs (MOSFETs) and the strip on something that sheds heat.
* Use a diffuser, and keep wiring out of reach of bedding and curtains.
* Add a limit on how long the lamp stays on at full brightness, and a watchdog (a timer that restarts the firmware if it freezes), so a crash cannot leave the lamp stuck at full brightness overnight.
* Use chargers from a reputable supplier that carry the UKCA or CE mark.

The bench prototype currently uses separate 5 V and 12 V supplies, which conflicts with this rule. Whether that is acceptable for the prototype only is tracked in [0006](0006-led-candidate.md). A bench power supply with an adjustable current limit is useful there, because it protects the LEDs and wiring from faults.
