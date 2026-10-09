<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# Licensing

Each folder has its own licence, chosen in [decision 0002](decisions/0002-licensing.md). The project follows the [REUSE specification](https://reuse.software), so every file states its copyright and licence, either in a header or in [`REUSE.toml`](https://github.com/Joe-Heffer/dimpsy/blob/main/REUSE.toml).

| Part | Folder | Licence |
| --- | --- | --- |
| Firmware | `firmware/` | [MIT](../LICENSES/MIT.txt) |
| Hardware | `hardware/` | [CERN-OHL-P-2.0](../LICENSES/CERN-OHL-P-2.0.txt) |
| Enclosure | `enclosure/` | [CC-BY-4.0](../LICENSES/CC-BY-4.0.txt) |
| Documentation and this website | `docs/` | [CC-BY-4.0](../LICENSES/CC-BY-4.0.txt) |
| Website scripts and stylesheet | `docs/tools/`, `docs/assets/site.css` | [MIT](../LICENSES/MIT.txt) |
| Small configuration files | various | [CC0-1.0](../LICENSES/CC0-1.0.txt) |

Firmware binaries built with ESPHome, including the one on the [flashing page](flash.md), contain the GPL-3.0 ESPHome runtime, so a distributed binary is GPL-3.0 as a whole. Dimpsy’s own source code stays MIT.

## Citing Dimpsy

If you use or build on Dimpsy, please cite it using [`CITATION.cff`](https://github.com/Joe-Heffer/dimpsy/blob/main/CITATION.cff). GitHub shows a “Cite this repository” button for it.

{%
  include-markdown "../THIRD_PARTY.md"
  start="-->"
  heading-offset=1
%}
