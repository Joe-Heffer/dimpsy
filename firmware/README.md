<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: MIT
-->

# Firmware

The Dimpsy prototype runs [ESPHome](https://esphome.io) on an ESP32 DevKitC. The choice is recorded in [decision 0004](../docs/decisions/0004-prototype-firmware-platform.md). The board and pin map are in [decision 0007](../docs/decisions/0007-microcontroller-board.md).

## Files

* `esphome/dimpsy.yaml`: the ESPHome configuration.
* `esphome/dimpsy-web.yaml`: the same configuration without secrets, built for browser flashing from the website.
* `esphome/secrets.yaml.example`: a template for `secrets.yaml`, which holds Wi-Fi and update passwords and is not committed.
* `esphome/diagram.json`, `esphome/wokwi.toml` and `esphome/scenarios/`: the [Wokwi](https://wokwi.com) simulation (see below).
* `core/`: plain C++ for the lamp’s behaviour, with no ESPHome or Arduino code, so it can be tested on a computer. It holds the candidate brightness curves from [#16](https://github.com/Joe-Heffer/dimpsy/issues/16) in `brightness.h`, their unit tests and a tool that prints them.

## Build and flash

ESPHome needs Python 3.

```sh
pip install esphome
cp secrets.yaml.example secrets.yaml   # then edit secrets.yaml
esphome config dimpsy.yaml             # validate
esphome run dimpsy.yaml                # compile, flash and show logs
```

Run these from the `firmware/esphome/` folder.

To install without ESPHome, use the [flash page](https://joe-heffer.github.io/dimpsy/flash/) on the website. It flashes `dimpsy-web.yaml`, a copy of `dimpsy.yaml` with no built-in passwords.

## Simulation

The `esphome/` folder is a [Wokwi](https://wokwi.com) project. `diagram.json` wires an ESP32 DevKitC to two rotary encoders, a slide potentiometer, a toggle switch, a button and a DS1307 clock using the pins in [decision 0007](../docs/decisions/0007-microcontroller-board.md). Wokwi has no SK6812 strip or TSL2591 light sensor in this diagram, so the lamp output is not simulated.

To try it by hand, run `esphome compile dimpsy.yaml`, then open the folder with the [Wokwi for VS Code](https://docs.wokwi.com/vscode/getting-started) extension.

CI runs the scenarios in `esphome/scenarios/` with `wokwi/wokwi-ci-action`. It needs a [Wokwi CI token](https://wokwi.com/dashboard/ci) saved as the repository secret `WOKWI_CLI_TOKEN`. Without the secret, as on pull requests from forks, the job skips with a notice. The first scenario checks that the firmware boots with no Wi-Fi network. Scenarios for the controls follow once they are in `dimpsy.yaml` ([#9](https://github.com/Joe-Heffer/dimpsy/issues/9)).

## Core tests and curves

The core needs a C++17 compiler and `make`. Run these from the `firmware/core/` folder:

```sh
make test      # build and run the unit tests
make summary   # print the dawn curves as Markdown with Mermaid charts
make csv       # print the dawn curves as CSV
```

CI runs the tests and adds the curve charts and a table of PWM steps to the job summary of each run.

## Licensing

The configuration and `firmware/core/` are MIT like the rest of `firmware/`. ESPHome itself is a separate project: its Python tooling is MIT-licensed and its C++ runtime is GPL-3.0. Nothing from ESPHome is copied into this repository, but the runtime is built into every firmware binary, so a distributed binary is GPL-3.0 as a whole. An ESPHome custom component that includes ESPHome headers must be GPL-3.0-or-later. See [decision 0009](../docs/decisions/0009-permissive-licences.md).
