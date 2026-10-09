<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# 0004: Firmware platform for the prototype

* **Status:** Accepted
* **Date:** 2026-10-09
* **Deciders:** Joe Heffer and collaborator

## Context

The repository and the prototype description pointed in different directions:

* The firmware project set up the Arduino framework, targeting the ESP32 DevKitC (see [decision 0007](0007-microcontroller-board.md)). Its only code was an empty `setup()` and `loop()`.
* [docs/prototype.md](../prototype.md) says the prototype runs ESPHome on an ESP32 DevKit, with settings and schedules reached through the ESPHome web page.
* The earlier build plan suggested WLED first, and the prototype phase plan suggested ESPHome with WLED as the fallback.

The design principles also call for the lamp to work without a network, and the project prefers reusing existing open source work.

## Options

* **ESPHome:** quick to get a working prototype, a web page for settings, and a large existing component library. Behaviour is mostly configuration, and offline operation and tactile-first control need checking.
* **Custom Arduino firmware:** full control of the dawn curve and the controls, and a firmware that is easy to test and port to a custom PCB. More code to write and maintain.
* **ESPHome first, custom firmware later:** use ESPHome to tune the dawn curve and controls, then move the settled behaviour into custom firmware.
* **ESPHome with Home Assistant:** as ESPHome, with schedules and logging handled in [Home Assistant](https://www.home-assistant.io), an open source smart home hub that runs on a separate computer or small server. Neither of us runs one, and it would make the lamp depend on another device.
* **WLED:** drives both LED candidates and buttons, with a built-in sunrise effect, but rotary encoders need usermods and the dawn curve cannot be written exactly. Not chosen, and kept only as a fallback if ESPHome fails.

## Decision

`proto-1` runs **ESPHome**.

* It is the quickest route to a lamp that can be tuned, which is the purpose of the prototype (see [docs/prototype.md](../prototype.md)).
* The web page gives settings and schedules from a phone without writing a user interface.
* The earlier firmware project held no firmware yet, so nothing is lost by removing it.

ESPHome runs on its own, with no Home Assistant. Nothing stops an owner linking the lamp to a smart home system later, but the lamp works offline by default and the link is optional (see [Works without a network](../design-principles.md#works-without-a-network)).

The design principles still require the lamp to work fully without a network. Offline behaviour and tactile-first control must be checked on the prototype ([issue #44](https://github.com/Joe-Heffer/dimpsy/issues/44)). If ESPHome cannot meet them, a new decision record will supersede this one.

Two further conditions from issue [#5](https://github.com/Joe-Heffer/dimpsy/issues/5) are tracked separately:

* ESPHome support for the DS3231 RTC, high-resolution LEDC PWM and the SK6812 RGBW strip is unconfirmed ([issue #42](https://github.com/Joe-Heffer/dimpsy/issues/42)).
* Temporal dithering must be off ([issue #43](https://github.com/Joe-Heffer/dimpsy/issues/43)).

## Consequences

* The earlier firmware project files, including the `src`, `include`, `lib` and `test` folders, are removed. `firmware/esphome/dimpsy.yaml` and `firmware/esphome/secrets.yaml.example` replace them.
* CI validates and builds `firmware/esphome/dimpsy.yaml` with ESPHome in place of the earlier build and static analysis jobs.
* The release workflow no longer attaches a firmware binary. A binary built in CI would carry the placeholder Wi-Fi and update passwords, so each builder compiles their own with their own `secrets.yaml`.
* The `esp32dev` board in decision 0007 is unchanged.
* The dawn curve, controls and schedule are still to be written as ESPHome components and configuration.
* Custom firmware for the finished lamp remains possible and would be a new decision.
