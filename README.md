<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Dimpsy (Sleep Light)

Dimpsy is an open source bedside sleep light with a gentle sunrise alarm and dawn and dusk modes to support sleep hygiene.

Its defaults are sensory-friendly and suitable for autistic adults, but it is a general-purpose lamp. Every setting is configurable.

**Status: early prototype.** Nothing here is ready to build yet.

## Safety

Dimpsy is designed to be powered by USB-C only. It must never be connected to mains voltage, and no part of the design should be adapted to run from mains.

## Folder layout

| Folder | Contents |
| --- | --- |
| `firmware/` | PlatformIO project for the ESP32 DevKitC (Arduino framework) |
| `hardware/` | KiCad schematics and PCB layout |
| `enclosure/` | CAD source and exported STL files |
| `docs/` | Design principles and requirements |
| `LICENSES/` | Full text of every licence used |

## Licensing

The project follows the [REUSE specification](https://reuse.software), so every file states its copyright and licence.

* Firmware: GPL-3.0-or-later
* Hardware: CERN-OHL-S-2.0
* Enclosure and documentation: CC-BY-SA-4.0
* Small configuration files: CC0-1.0

See [LICENSE.md](LICENSE.md) for details and [THIRD_PARTY.md](THIRD_PARTY.md) for upstream projects we may draw on.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
