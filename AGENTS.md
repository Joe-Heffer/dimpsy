<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Agent guidance

Dimpsy is an open source bedside sleep light (early prototype). See [README.md](README.md) for the overview and [CONTRIBUTING.md](CONTRIBUTING.md) for the full rules.

## Layout

* `firmware/`: PlatformIO project, ESP32-C3, Arduino framework (GPL-3.0-or-later)
* `hardware/`: KiCad files and `bom.csv` (CERN-OHL-S-2.0)
* `enclosure/`: CAD and STL files (CC-BY-SA-4.0)
* `docs/`: design principles, requirements and prototype notes (CC-BY-SA-4.0)

## Checks

Run both before committing. CI runs the same checks.

```sh
reuse lint
pio run --project-dir firmware
```

## Rules

* Dimpsy is USB-C powered only. Never add or suggest anything that connects to mains voltage.
* Every new file needs an SPDX copyright and licence header matching its folder (`reuse annotate`). Files that cannot hold comments are covered by `REUSE.toml`.
* Do not copy code or files from Led’o’clock. Record any other third-party material in [THIRD_PARTY.md](THIRD_PARTY.md) and keep its notices intact.
* The board in `platformio.ini` is a placeholder, not a hardware decision.
* Write prose in British English, in Markdown, using `*` for bullet lists.
* Follow `.editorconfig` (2-space indent, 4 for C/C++, INI and TOML).
* Record notable changes in [CHANGELOG.md](CHANGELOG.md) under “Unreleased”.
