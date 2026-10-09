<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# 0004: Firmware platform for the prototype

* **Status:** Accepted
* **Date:** 2026-10-09
* **Deciders:** Joe Heffer and collaborator

## Context

The repository and the prototype description pointed in different directions:

* `firmware/platformio.ini` set up a PlatformIO project with the Arduino framework, targeting the ESP32 DevKitC (see [decision 0007](0007-microcontroller-board.md)). Its only code was an empty `setup()` and `loop()`.
* [docs/prototype.md](../prototype.md) says the prototype runs ESPHome on an ESP32 DevKit, with settings and schedules reached through the ESPHome web page.

The design principles also call for the lamp to work without a network, and the project prefers reusing existing open source work.

## Options

* **ESPHome:** quick to get a working prototype, a web page for settings, and a large existing component library. Behaviour is mostly configuration, and offline operation and tactile-first control need checking.
* **PlatformIO with Arduino:** full control of the dawn curve and the controls, and a firmware that is easy to test and port to a custom PCB. More code to write and maintain.
* **ESPHome first, custom firmware later:** use ESPHome to tune the dawn curve and controls, then move the settled behaviour into custom firmware.

## Decision

`proto-1` runs **ESPHome**.

* It is the quickest route to a lamp that can be tuned, which is the purpose of the prototype (see [docs/prototype.md](../prototype.md)).
* The web page gives settings and schedules from a phone without writing a user interface.
* The PlatformIO project held no firmware yet, so nothing is lost by removing it.
* ESPHome builds on PlatformIO internally, so the toolchain stays available if custom components are needed.

The design principles still require the lamp to work fully without a network. Offline behaviour and tactile-first control must be checked on the prototype. If ESPHome cannot meet them, a new decision record will supersede this one.

## Consequences

* `firmware/platformio.ini` and the `src`, `include`, `lib` and `test` folders are removed. `firmware/esphome/dimpsy.yaml` and `firmware/esphome/secrets.yaml.example` replace them.
* CI validates and builds `firmware/esphome/dimpsy.yaml` with ESPHome in place of the PlatformIO build and `pio check` jobs.
* The release workflow no longer attaches a firmware binary. A binary built in CI would carry the placeholder Wi-Fi and update passwords, so each builder compiles their own with their own `secrets.yaml`.
* The `esp32dev` board in decision 0007 is unchanged. Only its note about `platformio.ini` no longer applies.
* The dawn curve, controls and schedule are still to be written as ESPHome components and configuration.
* Custom firmware for the finished lamp remains possible and would be a new decision.
