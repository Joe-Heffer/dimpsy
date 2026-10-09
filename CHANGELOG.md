<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

* Initial repository skeleton: firmware, hardware, enclosure and documentation folders, REUSE licensing and CI.
* Prototype block diagram and line drawing in `docs/prototype.md`.
* Decision records in `docs/decisions/`, one file per decision, with a template and index.
* Prototype parts list in `hardware/prototype-parts.csv`.
* Pull request template and issue templates for tasks and decisions.
* Working-together and large-file guidance in `CONTRIBUTING.md`.
* Hardware organisation guidance in `docs/hardware-practices.md` and a prototype bill of materials template in `hardware/bom.csv`.
* `AGENTS.md` with guidance for AI coding agents.
* Decision 0007: the first prototype uses the ESP32 DevKitC, with a provisional pin map.
* CI job that validates ESPHome configs in `firmware/esphome/` with `esphome config`. It skips when none exist.

### Changed

* Firmware now targets the ESP32 DevKitC (`esp32dev`) in place of the ESP32-C3 placeholder.
* BOM records the ESP32 DevKitC as held and adds a level shifter for the SK6812 strip.
