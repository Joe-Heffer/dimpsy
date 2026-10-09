<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# Dimpsy

<div class="dimpsy-hero" markdown>
<div markdown>

<p class="dimpsy-tagline">An open source bedside sleep light with a gentle sunrise alarm and dawn and dusk modes to support sleep hygiene.</p>

Its defaults are sensory-friendly and suitable for autistic adults, but it is a general-purpose lamp. Every setting is configurable.

[Read the docs](prototype.md){ .md-button .md-button--primary }
[View on GitHub](https://github.com/Joe-Heffer/dimpsy){ .md-button }

</div>

![Line drawing of the prototype: an IKEA Fado globe lamp cabled to a small console with two knobs, a toggle and a snooze button](images/prototype-line-drawing.svg){ .dimpsy-drawing }

</div>

!!! warning "Early prototype"
    Nothing here is ready to build yet. The design, parts and firmware will change.

!!! danger "USB-C power only"
    Dimpsy is designed to be powered by USB-C only. It must never be connected to mains voltage, and no part of the design should be adapted to run from mains. See [safety](safety.md) for the precautions and what to monitor, and [decision 0003](decisions/0003-usb-c-power-only.md) for the reasoning.

## What it does

* **Sunrise alarm.** The light rises slowly before you wake, following a perceptual curve so the first minutes are smooth and not stepped.
* **Dawn and dusk modes.** Slow, predictable fades in the evening and the morning.
* **Warm colours at night.** No blue-rich light after dark.
* **Tactile controls.** Knobs, a toggle and a snooze button you can use in the dark, with no app needed.
* **Works without a network.** The lamp runs offline from its own controls. Wi-Fi and smart home links are optional.
* **Quiet and flicker-free.** No fans, no whine and no visible PWM flicker at low levels.

The reasoning behind each of these is in the [design principles](design-principles.md).

## Where the project is

The first prototype is a bench and bedside test rig: an [ESP32 DevKitC](decisions/0007-microcontroller-board.md) running [ESPHome](decisions/0004-prototype-firmware-platform.md), cabled to an [IKEA Fado](decisions/0005-lamp-body.md) lamp with an LED core. Its job is to choose an LED, tune the dawn curve and try out the controls before any custom enclosure or PCB is designed. See the [roadmap](roadmap.md) for what comes next.

## Explore

* [First prototype](prototype.md): layout, block diagram and open questions.
* [Safety](safety.md): precautions for building and running the lamp, and what to monitor.
* [Decisions](decisions/README.md): what was chosen, what else was considered and why.
* [Developer tools](developers.md): Wokwi simulation, build commands and CI.
* [Dawn curve explorer](tools/curves.md): compare the candidate brightness curves in your browser.
* [Contributing](contributing.md): how to help.

## Licence

Dimpsy is open hardware and free software. Firmware and other code are MIT, hardware is CERN-OHL-P-2.0, and the enclosure and documentation are CC-BY-4.0. See [licensing](licensing.md).
