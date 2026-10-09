<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# 0002: Permissive licences, MIT by default, one per folder

* **Status:** Accepted
* **Date:** 2026-10-09
* **Deciders:** Joe Heffer

## Context

Dimpsy is meant to be open source, and it should be easy to reuse other people’s open source work. Firmware, electronics and physical design are normally licensed differently, and a single software licence does not suit hardware files. The project would also rather let anyone reuse Dimpsy with as few conditions as possible, and use MIT unless a framework it depends on rules that out.

No third-party code or files are in the repository ([decision 0008](0008-reuse-from-other-projects.md)), and every file so far was written by Joe Heffer or with Joe Heffer as the copyright holder, so no one else needs to agree to the choice.

The dependencies were checked for anything that would force a licence:

* **ESPHome:** its C++ runtime is GPL-3.0 and is compiled into every firmware binary. This does not restrict the licence of Dimpsy’s own YAML or of `firmware/core/`, which contains no ESPHome code. It does mean a distributed firmware binary, such as the one the website publishes, is a combined work under GPL-3.0. Any future ESPHome custom component that includes ESPHome headers is also a derived work of the runtime.
* **Material for MkDocs, MkDocs and its plugins:** MIT or BSD, used to build the website. No restriction.
* **ESP Web Tools:** Apache-2.0, loaded at run time from a CDN. No restriction.
* **KiCad:** its symbol and footprint libraries carry an exception that lets designs using them take any licence. No restriction.

MIT is a software licence and is a poor fit for schematics, PCB layouts, CAD files and prose, so those use the closest permissive equivalents.

## Options

* **One licence for everything:** simple, but software licences fit hardware and CAD files poorly.
* **A share-alike licence per kind of work:** GPL-3.0-or-later for firmware, CERN-OHL-S-2.0 for hardware and CC-BY-SA-4.0 for the enclosure and documentation. Improvements made by others must stay open, but it discourages some reuse. This was the first choice and was replaced before any outside contribution.
* **MIT by default, with permissive equivalents for hardware, CAD and prose:** MIT wherever it fits, and licences written for the other kinds of work.

Either per-kind option is tracked with REUSE, so `reuse lint` in CI checks that every file is covered.

## Decision

Use a licence per kind of work, as set out in [LICENSE.md](../../LICENSE.md), MIT by default with permissive equivalents where MIT fits poorly:

* firmware, and code anywhere in the repository (including the website’s scripts and stylesheet): MIT
* hardware: CERN-OHL-P-2.0
* enclosure and documentation: CC-BY-4.0
* small configuration files: CC0-1.0, since it is already more permissive than MIT

Two exceptions follow from ESPHome:

* Firmware binaries built with ESPHome are distributed under GPL-3.0, as a whole, because they contain the ESPHome runtime. Dimpsy’s own source in them stays MIT.
* An ESPHome custom component that includes ESPHome headers must be licensed GPL-3.0-or-later, with its own SPDX header and the licence text added to `LICENSES/`.

Contributions are accepted under the licence of the folder they go into. Third-party material is recorded in [THIRD_PARTY.md](../../THIRD_PARTY.md) before reuse.

## Consequences

* Every new file needs an SPDX header or a rule in `REUSE.toml`.
* Third-party material must be compatible with a permissive destination. GPL or LGPL code could only be added as separate files under their own licence, which would make the built firmware GPL in any case. CC-BY-SA material cannot go into `docs/` or `enclosure/`. Upstream projects with non-commercial or otherwise incompatible licences, such as Led’o’clock, can inform ideas only.
* Others may make closed derivatives of Dimpsy. Attribution is still required by MIT, CERN-OHL-P-2.0 and CC-BY-4.0.
* Once a collaborator contributes, a change of licence needs their agreement too.
