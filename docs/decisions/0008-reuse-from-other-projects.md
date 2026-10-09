<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# 0008: What to reuse from other projects

* **Status:** Accepted
* **Date:** 2026-10-09
* **Deciders:** Joe Heffer and collaborator

## Context

[THIRD_PARTY.md](../../THIRD_PARTY.md) listed four sunrise and night light projects that Dimpsy might draw on, with unverified licences ([issue #15](https://github.com/Joe-Heffer/dimpsy/issues/15)). A fifth, HA-Sunrise-Lamp-Alarm, is the closest match to the prototype and was missing.

Each folder has its own licence ([decision 0009](0009-permissive-licences.md), which replaced [decision 0002](0002-licensing.md)), so a project can be usable in one folder and not in another:

* `firmware/`: MIT. Accepts MIT, BSD and similar permissive code. GPL or LGPL code could only go in as separate files under their own licence, which would make the built firmware GPL in any case.
* `hardware/`: CERN-OHL-P-2.0. Accepts permissively licensed designs.
* `enclosure/` and `docs/`: CC-BY-4.0. Accepts MIT, CC0 and CC-BY-4.0 material. Does not accept CC-BY-SA, GPL or LGPL material.

Each licence below was checked on 2026-10-09 from the project’s own licence file or README, at the commit noted.

## Options

### Projects reviewed

* **ESPHome** (`esphome/esphome`): the prototype platform ([decision 0004](0004-prototype-firmware-platform.md)). Its licence file states that the C++ runtime is GPL-3.0 and the Python code and everything else is MIT. Its built-in components already cover most of the prototype: `rotary_encoder`, `gpio` binary sensors for the buttons, `ds1307` time for an RTC, `esp32_rmt_led_strip` or `neopixelbus` for the SK6812 strip, `ledc` outputs for the MOSFET candidate, light transitions, `globals` and `script` for schedules. Using these is reuse without copying.
* **HA-Sunrise-Lamp-Alarm** (`AlexD717/HA-Sunrise-Lamp-Alarm`, commit `0ad90e3`): an ESPHome lamp with an SK6812 RGBW strip, an ESP32-C3, a rotary encoder, a button and a round display. It has no licence file and no licence statement, so all rights are reserved. It also depends on Home Assistant for time and for its sunrise schedule, which Dimpsy avoids ([Works without a network](../design-principles.md#works-without-a-network)). Useful as confirmation that the SK6812 RGBW strip, encoder and button work together in ESPHome.
* **GlowLight** (`Friedjof/GlowLight`, commit `eefb0e9`): an Arduino bedside lamp on an ESP32-C3 with WS2812B LEDs, USB-C power and 3D printed parts. The licence is inconsistent. The licence file is LGPL-3.0, the README says GPL-3.0, some lighting modes declare MIT and others GPL-3.0 in their metadata, and nothing says “or later”. Its `SunsetMode` fades warm white through orange and deep red to off over 5 to 60 minutes, which is close to Dimpsy’s dusk mode. It also has native unit tests and hardware-in-the-loop tests. Its STL files cannot go into `enclosure/` under any of the stated licences.
* **kid-alarm-light** (`EtHeO18/kid-alarm-light`, commit `c2a40d8`): MIT, copyright 2022 Daan Meijer. An Arduino sleep trainer on an ESP8266 with a weekly schedule of time and colour entries saved as JSON, colour easing between entries, brightness adjusted by a light-dependent resistor, and a Vue web page for editing the schedule. Compatible with every folder.
* **wakeup-light-esp8266** (`edusteinhorst/wakeup-light-esp8266`, commit `e7bd41b`): MIT, copyright 2015 Eduardo Steinhorst. An Arduino wake-up light on an ESP8266 with a gamma lookup table, a non-blocking fade and a beeper as a failsafe alarm. Its hardware dims a mains AC lamp, which [decision 0003](0003-usb-c-power-only.md) rules out. Compatible with every folder for firmware and text.
* **Led’o’clock** (`denouche/led-o-clock`): CC-BY-NC-SA-4.0, stated in the README. The licence forbids commercial use and is incompatible with all of Dimpsy’s licences. It has a WS2812B ring that turns off one LED at a time to count down to the next event, and runs its schedule locally after a single NTP sync.

### Approaches

* **Copy code where the licence allows:** saves effort, but most of these projects are Arduino code for other boards and would need rewriting as ESPHome configuration anyway.
* **Use ESPHome components first and treat the other projects as references:** nothing is copied, so no notices are needed and the licence questions do not block the prototype.

## Decision

Build the prototype from ESPHome’s own components, and use the other projects as references for behaviour and design. Nothing is copied from any of them at this stage.

| Project | Use | Reason |
| --- | --- | --- |
| ESPHome | Build platform and components | Already chosen in decision 0004; not copied into the repository |
| HA-Sunrise-Lamp-Alarm | Reference only | No licence |
| GlowLight | Ideas only | Licence is inconsistent; ask the author before copying anything |
| kid-alarm-light | Reference; code may be copied into `firmware/` or `docs/` with its notice | MIT |
| wakeup-light-esp8266 | Reference for firmware; never the hardware | MIT, but the hardware uses mains AC |
| Led’o’clock | Ideas only | CC-BY-NC-SA-4.0 is incompatible |

The ideas worth taking forward are:

* GlowLight’s dusk sequence (warm white, orange, deep red, off) and its timed durations, for the dusk mode.
* kid-alarm-light’s schedule model (weekday, time and target colour, eased between entries) and ambient light compensation.
* wakeup-light-esp8266’s failsafe beeper if the light alone does not wake the user, and its cap on maximum duty.
* Led’o’clock’s countdown, shown by turning off one LED at a time, as a possible wind-down cue.

`firmware/core/brightness.h` already covers the gamma and perceptual curves, so none of the projects’ curve code is needed.

## Consequences

* [THIRD_PARTY.md](../../THIRD_PARTY.md) records the verified licences and the outcome for each project, and adds ESPHome and HA-Sunrise-Lamp-Alarm.
* If anyone later copies code, they must update its row, keep the original notices, add the licence text to `LICENSES/` and mark the files with `reuse annotate`.
* Before copying from GlowLight, ask its author which licence and version applies, and whether “or later” is intended.
* HA-Sunrise-Lamp-Alarm could be asked to add a licence if its YAML would save effort later.
* Two further projects turned up in a search but were not reviewed: BorneoIoT (ESP-IDF aquarium lighting with sunrise and sunset, believed GPL-3.0) and SunAVR (AVR light alarm, believed BSD). Review them in a new decision if the dawn or dusk code needs more reference material.
