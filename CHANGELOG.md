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
* Decision 0005: the first prototype uses the IKEA Fado as the lamp body.
* Decision 0008: what to reuse from other projects. `THIRD_PARTY.md` now records verified licences and adds ESPHome and HA-Sunrise-Lamp-Alarm.
* CI job that validates ESPHome configs in `firmware/esphome/` with `esphome config`. It skips when none exist.
* “Works without a network” design principle: the lamp works offline from its controls by default, and any smart home link is optional.
* `firmware/core/brightness.h` with the candidate perceptual brightness curves (exponential, CIE 1931 lightness and gamma), native unit tests, and a CI job that runs them and charts each curve in the job summary.
* Browser flashing with ESP Web Tools: a “Flash from your browser” page on the website, a password-free `firmware/esphome/dimpsy-web.yaml` build with Wi-Fi setup over Improv Serial, and a website workflow step that publishes the binary and manifest.
* Wokwi simulation project in `firmware/esphome/` and a CI workflow that builds the firmware and runs its scenarios when `WOKWI_CLI_TOKEN` is set.
* zizmor security checks for GitHub Actions workflows, and a codespell spelling check, in the Lint workflow.
* Project website built with Material for MkDocs from `docs/` and published to GitHub Pages, with home, roadmap, licensing and developer tools pages, including how to run the Wokwi simulation.
* Dawn curve explorer on the website: a browser port of `firmware/core/brightness.h` with a CI check that it matches the C++ curves.

### Changed

* Decision 0004 now records the options it did not choose (WLED and ESPHome with Home Assistant), that no Home Assistant is needed, and the conditions still to check.
* Firmware platform is now ESPHome (decision 0004). `firmware/esphome/` holds `dimpsy.yaml` and `secrets.yaml.example` in place of the PlatformIO project, and CI validates and builds the configuration with ESPHome.
* GitHub Actions are pinned to commit SHAs, checkouts no longer persist credentials, Release Please permissions are set per job, and Dependabot waits seven days before proposing new releases.
* Firmware now targets the ESP32 DevKitC (`esp32dev`) in place of the ESP32-C3 placeholder.
* BOM records the ESP32 DevKitC as held and adds a level shifter for the SK6812 strip.

### Removed

* PlatformIO project files, the `pio check` CI job and the firmware binary attached to releases.
