<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Licensing

Each folder has its own licence, chosen in [decision 0002](decisions/0002-licensing.md). The project follows the [REUSE specification](https://reuse.software), so every file states its copyright and licence, either in a header or in [`REUSE.toml`](https://github.com/Joe-Heffer/dimpsy/blob/main/REUSE.toml).

| Part | Folder | Licence |
| --- | --- | --- |
| Firmware | `firmware/` | [GPL-3.0-or-later](https://github.com/Joe-Heffer/dimpsy/blob/main/LICENSES/GPL-3.0-or-later.txt) |
| Hardware | `hardware/` | [CERN-OHL-S-2.0](https://github.com/Joe-Heffer/dimpsy/blob/main/LICENSES/CERN-OHL-S-2.0.txt) |
| Enclosure | `enclosure/` | [CC-BY-SA-4.0](https://github.com/Joe-Heffer/dimpsy/blob/main/LICENSES/CC-BY-SA-4.0.txt) |
| Documentation and this website | `docs/` | [CC-BY-SA-4.0](https://github.com/Joe-Heffer/dimpsy/blob/main/LICENSES/CC-BY-SA-4.0.txt) |
| Small configuration files | various | [CC0-1.0](https://github.com/Joe-Heffer/dimpsy/blob/main/LICENSES/CC0-1.0.txt) |

The curve explorer’s scripts are ported from the firmware, so they are GPL-3.0-or-later like the firmware.

## Citing Dimpsy

If you use or build on Dimpsy, please cite it using [`CITATION.cff`](https://github.com/Joe-Heffer/dimpsy/blob/main/CITATION.cff). GitHub shows a “Cite this repository” button for it.

{%
  include-markdown "../THIRD_PARTY.md"
  start="-->"
  heading-offset=1
%}
