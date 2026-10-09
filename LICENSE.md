# Licensing

Dimpsy uses different licences for different parts of the project. It follows the [REUSE specification](https://reuse.software): each file states its copyright holder and licence in an SPDX header, or is covered by an entry in [`REUSE.toml`](REUSE.toml). Those per-file statements are authoritative. This page is a summary.

| Part | Folder | Licence | Full text |
| --- | --- | --- | --- |
| Firmware | `firmware/` | MIT License | [MIT](LICENSES/MIT.txt) |
| Hardware (schematics, PCB) | `hardware/` | CERN Open Hardware Licence v2, Permissive | [CERN-OHL-P-2.0](LICENSES/CERN-OHL-P-2.0.txt) |
| Enclosure (CAD, STL) | `enclosure/` | Creative Commons Attribution 4.0 International | [CC-BY-4.0](LICENSES/CC-BY-4.0.txt) |
| Documentation | `docs/` and top-level Markdown files | Creative Commons Attribution 4.0 International | [CC-BY-4.0](LICENSES/CC-BY-4.0.txt) |
| Website scripts and stylesheet | `docs/tools/*.js`, `docs/assets/site.css` | MIT License | [MIT](LICENSES/MIT.txt) |
| Small configuration files | `.gitignore`, `.editorconfig`, CI workflows, `REUSE.toml` and similar | Creative Commons Zero v1.0 Universal | [CC0-1.0](LICENSES/CC0-1.0.txt) |

The licences were chosen in [decision 0009](docs/decisions/0009-permissive-licences.md): MIT by default, with permissive equivalents for hardware, CAD and prose.

## ESPHome firmware binaries

The firmware is built with [ESPHome](https://esphome.io), whose C++ runtime is GPL-3.0. A firmware binary contains that runtime, so a distributed binary, including the one the website publishes, is licensed under GPL-3.0 as a whole. Dimpsy’s own source code in it remains MIT. An ESPHome custom component that includes ESPHome headers must be licensed GPL-3.0-or-later.

Copyright © 2026 Joe Heffer and contributors.

To check that every file is covered, install [reuse](https://pypi.org/project/reuse/) and run `reuse lint`.
