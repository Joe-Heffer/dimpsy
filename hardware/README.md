<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CERN-OHL-S-2.0
-->

# Hardware

The electronics design goes here: KiCad schematics, PCB layout, project-specific symbols and footprints, and exported fabrication files such as Gerbers and the bill of materials.

Files in this folder are licensed under the CERN Open Hardware Licence Version 2, Strongly Reciprocal (CERN-OHL-S-2.0). KiCad files cannot carry licence headers, so `REUSE.toml` covers them.

## Contents

* [`bom.csv`](bom.csv): bill of materials, with one row per part and a `build` column (for example `proto-1`). Keep it up to date when parts are added, swapped or removed.
* [`prototype-parts.csv`](prototype-parts.csv): parts for the first bench prototype. Fill in suppliers, links and prices as parts are chosen.
* `datasheets/` (add when needed): datasheets and pinouts, where the licence allows redistribution. Otherwise link to them from the BOM.

See [docs/hardware-practices.md](../docs/hardware-practices.md) for how to organise parts, wiring and build documentation.

Nothing has been designed yet.
