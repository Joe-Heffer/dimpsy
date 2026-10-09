# Licensing

Dimpsy uses different licences for different parts of the project. It follows the [REUSE specification](https://reuse.software): each file states its copyright holder and licence in an SPDX header, or is covered by an entry in [`REUSE.toml`](REUSE.toml). Those per-file statements are authoritative. This page is a summary.

| Part | Folder | Licence | Full text |
| --- | --- | --- | --- |
| Firmware | `firmware/` | GNU General Public License v3.0 or later | [GPL-3.0-or-later](LICENSES/GPL-3.0-or-later.txt) |
| Hardware (schematics, PCB) | `hardware/` | CERN Open Hardware Licence v2, Strongly Reciprocal | [CERN-OHL-S-2.0](LICENSES/CERN-OHL-S-2.0.txt) |
| Enclosure (CAD, STL) | `enclosure/` | Creative Commons Attribution-ShareAlike 4.0 International | [CC-BY-SA-4.0](LICENSES/CC-BY-SA-4.0.txt) |
| Documentation | `docs/` and top-level Markdown files | Creative Commons Attribution-ShareAlike 4.0 International | [CC-BY-SA-4.0](LICENSES/CC-BY-SA-4.0.txt) |
| Small configuration files | `.gitignore`, `.editorconfig`, CI workflows, `REUSE.toml` and similar | Creative Commons Zero v1.0 Universal | [CC0-1.0](LICENSES/CC0-1.0.txt) |

Copyright © 2026 Joe Heffer and contributors.

To check that every file is covered, install [reuse](https://pypi.org/project/reuse/) and run `reuse lint`.
