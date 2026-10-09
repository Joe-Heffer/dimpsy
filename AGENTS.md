<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Agent guidance

Dimpsy is an open source bedside sleep light (early prototype). See [README.md](README.md) for the overview and [CONTRIBUTING.md](CONTRIBUTING.md) for the full rules.

## Layout

* `firmware/`: ESPHome configuration for the ESP32 DevKitC (GPL-3.0-or-later)
* `hardware/`: KiCad files and `bom.csv` (CERN-OHL-S-2.0)
* `enclosure/`: CAD and STL files (CC-BY-SA-4.0)
* `docs/`: design principles, requirements and prototype notes (CC-BY-SA-4.0)

## Checks

Run both before committing. CI runs the same checks.

```sh
reuse lint
cd firmware && cp secrets.example.yaml secrets.yaml && esphome config dimpsy.yaml
```

## Rules

* Dimpsy is USB-C powered only. Never add or suggest anything that connects to mains voltage.
* Every new file needs an SPDX copyright and licence header matching its folder (`reuse annotate`). Files that cannot hold comments are covered by `REUSE.toml`.
* Do not copy code or files from Led’o’clock. Record any other third-party material in [THIRD_PARTY.md](THIRD_PARTY.md) and keep its notices intact.
* The board in `firmware/dimpsy.yaml` follows [decision 0007](docs/decisions/0007-microcontroller-board.md) for the first prototype only. The board for the finished lamp is not decided.
* Never commit `firmware/secrets.yaml`. Use `firmware/secrets.example.yaml` for placeholders.
* Write prose in British English, in Markdown, using `*` for bullet lists.
* Follow `.editorconfig` (2-space indent, 4 for C/C++, INI and TOML).
* Record notable changes in [CHANGELOG.md](CHANGELOG.md) under “Unreleased”.
