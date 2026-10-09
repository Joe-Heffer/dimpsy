<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# 0004: Firmware platform for the prototype

* **Status:** Open
* **Date:** 2026-10-09
* **Deciders:** Joe Heffer and collaborator

## Context

The repository and the prototype description point in different directions:

* `firmware/platformio.ini` sets up a PlatformIO project with the Arduino framework, now targeting the ESP32 DevKitC (see [decision 0007](0007-microcontroller-board.md)).
* [docs/prototype.md](../prototype.md) says the prototype runs ESPHome on an ESP32 DevKit, with settings and schedules reached through the ESPHome web page.

The design principles also call for the lamp to work without a network, and the project prefers reusing existing open source work.

## Options

* **ESPHome:** quick to get a working prototype, a web page for settings, and a large existing component library. Behaviour is mostly configuration, and offline operation and tactile-first control need checking.
* **PlatformIO with Arduino:** full control of the dawn curve and the controls, and a firmware that is easy to test and port to a custom PCB. More code to write and maintain.
* **ESPHome first, custom firmware later:** use ESPHome to tune the dawn curve and controls, then move the settled behaviour into custom firmware.

## Decision

Not yet decided.

## Consequences

Whichever is chosen, the other should be removed or clearly labelled, so the `firmware/` folder and the prototype description agree. CI currently builds the PlatformIO project.
