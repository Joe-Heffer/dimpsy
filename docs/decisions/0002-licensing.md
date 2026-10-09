<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# 0002: Licence each folder separately and follow REUSE

* **Status:** Superseded by [0009](0009-permissive-licences.md)
* **Date:** 2026-10-09
* **Deciders:** Joe Heffer

## Context

Dimpsy is a private project that is meant to be open source, and it should be easy to reuse other people’s open source work. Firmware, electronics and physical design are normally licensed differently, and a single software licence does not suit hardware files.

## Options

* **One licence for everything:** simple, but software licences fit hardware and CAD files poorly.
* **A licence per kind of work, tracked with REUSE:** each part gets a licence designed for it, and `reuse lint` in CI checks that every file is covered.

## Decision

Use a licence per kind of work, as set out in [LICENSE.md](../../LICENSE.md):

* firmware: GPL-3.0-or-later
* hardware: CERN-OHL-S-2.0
* enclosure and documentation: CC-BY-SA-4.0
* small configuration files: CC0-1.0

Contributions are accepted under the licence of the folder they go into. Third-party material is recorded in [THIRD_PARTY.md](../../THIRD_PARTY.md) before reuse.

## Consequences

Every new file needs an SPDX header or a rule in `REUSE.toml`. Upstream projects with non-commercial or otherwise incompatible licences, such as Led’o’clock, can inform ideas only.
