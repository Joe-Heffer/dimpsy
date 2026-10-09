<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: GPL-3.0-or-later
-->

# Firmware

The Dimpsy prototype runs [ESPHome](https://esphome.io) on an ESP32 DevKitC. The choice is recorded in [decision 0004](../docs/decisions/0004-prototype-firmware-platform.md). The board and pin map are in [decision 0007](../docs/decisions/0007-microcontroller-board.md).

## Files

* `esphome/dimpsy.yaml`: the ESPHome configuration.
* `esphome/secrets.yaml.example`: a template for `secrets.yaml`, which holds Wi-Fi and update passwords and is not committed.
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

## Core tests and curves

The core needs a C++17 compiler and `make`. Run these from the `firmware/core/` folder:

```sh
make test      # build and run the unit tests
make summary   # print the dawn curves as Markdown with Mermaid charts
make csv       # print the dawn curves as CSV
```

CI runs the tests and adds the curve charts and a table of PWM steps to the job summary of each run.

## Licensing

The configuration is GPL-3.0-or-later like the rest of `firmware/`. ESPHome itself is a separate project: its Python tooling is MIT-licensed and its C++ runtime, which is built into the firmware, is GPL-3.0-or-later. Nothing from ESPHome is copied into this repository.
