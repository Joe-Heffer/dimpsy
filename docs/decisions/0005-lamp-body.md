<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# 0005: Lamp body: IKEA Fado or Tokabo

* **Status:** Accepted
* **Date:** 2026-10-09
* **Deciders:** Joe Heffer and collaborator
* **Issue:** [#13](https://github.com/Joe-Heffer/dimpsy/issues/13)

## Context

The first prototype uses an existing IKEA lamp as the body so that no custom enclosure is needed yet. The drawings in [docs/prototype.md](../prototype.md) assume the Fado. The Tokabo has also been considered.

## Options

* **IKEA Fado:** a globe lamp with a 25 cm diffuser and room inside for an LED core wound on a short aluminium tube. It is the larger of the two.
* **IKEA Tokabo:** smaller, and not assessed against the LED and wiring layout.

## Decision

`proto-1` uses the **IKEA Fado**.

* It is bigger, so there is more room for the LED core, the cable entry and the screw terminal, which makes it easier to work with while the layout is still changing.
* The 25 cm diffuser gives the strip candidates in [decision 0006](0006-led-candidate.md) space to blend into an even glow.
* The block diagram, line drawing, BOM and phase plan already assume it, so nothing needs redrawing.

The Tokabo is dropped from the prototype. Size is not a goal for `proto-1`, and the finished lamp is not tied to either IKEA product. Revisit the lamp body when the enclosure for the finished lamp is designed.

## Consequences

* `hardware/bom.csv` no longer lists the Tokabo as an alternative.
* The open question about the lamp body in `docs/prototype.md` is closed.
* The Fado is a large lamp for a bedside table. Check the footprint on the bedside table before the first full build.
