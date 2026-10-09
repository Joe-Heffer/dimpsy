<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# 0009: Permissive licences, MIT by default

* **Status:** Accepted
* **Date:** 2026-10-09
* **Deciders:** Joe Heffer
* **Supersedes:** [0002](0002-licensing.md)

## Context

[Decision 0002](0002-licensing.md) gave each folder a reciprocal (share-alike) licence: GPL-3.0-or-later for firmware, CERN-OHL-S-2.0 for hardware and CC-BY-SA-4.0 for the enclosure and documentation. The project would rather let anyone reuse Dimpsy with as few conditions as possible, and use MIT unless a framework it depends on rules that out.

No third-party code or files are in the repository ([decision 0008](0008-reuse-from-other-projects.md)), and every file so far was written by Joe Heffer or with Joe Heffer as the copyright holder, so the project can be relicensed without asking anyone else.

The dependencies were checked for anything that would force a licence:

* **ESPHome:** its C++ runtime is GPL-3.0 and is compiled into every firmware binary. This does not restrict the licence of Dimpsy’s own YAML or of `firmware/core/`, which contains no ESPHome code. It does mean a distributed firmware binary, such as the one the website publishes, is a combined work under GPL-3.0. Any future ESPHome custom component that includes ESPHome headers is also a derived work of the runtime.
* **Material for MkDocs, MkDocs and its plugins:** MIT or BSD, used to build the website. No restriction.
* **ESP Web Tools:** Apache-2.0, loaded at run time from a CDN. No restriction.
* **KiCad:** its symbol and footprint libraries carry an exception that lets designs using them take any licence. No restriction.

MIT is a software licence and is a poor fit for schematics, PCB layouts, CAD files and prose, so those use the closest permissive equivalents.

## Options

* **Keep decision 0002:** share-alike everywhere, so improvements made by others must stay open. Discourages some reuse.
* **MIT for everything:** simplest, but MIT does not address hardware or creative works well.
* **MIT by default, with permissive equivalents for hardware, CAD and prose:** MIT wherever it fits, and licences written for the other kinds of work.

## Decision

Use MIT by default, with permissive equivalents where MIT fits poorly:

* firmware, and code anywhere in the repository (including the website’s scripts and stylesheet): MIT
* hardware: CERN-OHL-P-2.0
* enclosure and documentation: CC-BY-4.0
* small configuration files: CC0-1.0, unchanged, since it is already more permissive than MIT

Two exceptions follow from ESPHome:

* Firmware binaries built with ESPHome are distributed under GPL-3.0, as a whole, because they contain the ESPHome runtime. Dimpsy’s own source in them stays MIT.
* An ESPHome custom component that includes ESPHome headers must be licensed GPL-3.0-or-later, with its own SPDX header and the licence text added to `LICENSES/`.

## Consequences

* SPDX headers, `REUSE.toml`, `LICENSES/`, `LICENSE.md`, `CITATION.cff` and the documentation now state the new licences.
* Decision 0002 is superseded. Its folder-per-licence approach and the use of REUSE continue.
* Third-party material must now be compatible with a permissive destination. GPL or LGPL code could only be added as separate files under their own licence, which would make the built firmware GPL in any case. CC-BY-SA material cannot go into `docs/` or `enclosure/`.
* Others may make closed derivatives of Dimpsy. Attribution is still required by MIT, CERN-OHL-P-2.0 and CC-BY-4.0.
* Once a collaborator contributes, a further change of licence needs their agreement too.
