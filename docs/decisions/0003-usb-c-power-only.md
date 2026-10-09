<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# 0003: Power the finished lamp from USB-C only

* **Status:** Accepted
* **Date:** 2026-10-09
* **Deciders:** Joe Heffer

## Context

The lamp sits next to a bed. Keeping the design at extra-low voltage removes the main electrical safety risk and makes it safer for others to build. The README already states this rule.

## Options

* **USB-C only:** no mains wiring anywhere in the design. Output is limited by the supply, and a 12 V LED option would need USB-C Power Delivery.
* **Mains-powered with an internal supply:** more freedom over LEDs, but it adds shock and fire risks and certification concerns for anyone building from the files.

## Decision

The design is powered by USB-C only. No part of it is to be connected to mains voltage or adapted to run from it.

## Consequences

The LED choice has to fit within what USB-C can supply. The bench prototype currently uses separate 5 V and 12 V supplies, which conflicts with this rule. Whether that is acceptable for the prototype only is tracked in [0006](0006-led-candidate.md).
