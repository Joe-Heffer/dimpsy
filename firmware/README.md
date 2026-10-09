<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: GPL-3.0-or-later
-->

# Firmware

The Dimpsy prototype runs [ESPHome](https://esphome.io) on an ESP32 DevKitC. The choice is recorded in [decision 0004](../docs/decisions/0004-prototype-firmware-platform.md). The board and pin map are in [decision 0007](../docs/decisions/0007-microcontroller-board.md).

## Files

* `esphome/dimpsy.yaml`: the ESPHome configuration.
* `esphome/secrets.yaml.example`: a template for `secrets.yaml`, which holds Wi-Fi and update passwords and is not committed.

## Build and flash

ESPHome needs Python 3.

```sh
pip install esphome
cp secrets.yaml.example secrets.yaml   # then edit secrets.yaml
esphome config dimpsy.yaml             # validate
esphome run dimpsy.yaml                # compile, flash and show logs
```

Run these from the `firmware/esphome/` folder.

## Licensing

The configuration is GPL-3.0-or-later like the rest of `firmware/`. ESPHome itself is a separate project: its Python tooling is MIT-licensed and its C++ runtime, which is built into the firmware, is GPL-3.0-or-later. Nothing from ESPHome is copied into this repository.
