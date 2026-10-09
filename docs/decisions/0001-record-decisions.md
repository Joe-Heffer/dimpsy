<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# 0001: Record decisions as one file each

* **Status:** Accepted
* **Date:** 2026-10-09
* **Deciders:** Joe Heffer

## Context

Two people now work on Dimpsy. Choices such as the lamp body, the LED and the firmware platform affect each other, and the reasons are easy to forget. A single long decisions file would be hard to review and would produce merge conflicts.

## Options

* **One file per decision:** small pull requests, easy linking from issues, and a clear history. It needs an index to stay navigable.
* **One decisions log:** one place to read, but conflicts and unfocused diffs as it grows.
* **Issues only:** quick to write, but the outcome is not versioned with the design and is harder to find later.

## Decision

Use one Markdown file per decision in `docs/decisions/`, based on [template.md](template.md), with an index in the folder README.

## Consequences

Decisions are reviewed through pull requests like any other change. Open questions that are currently scattered through other documents can be moved here and linked back.
