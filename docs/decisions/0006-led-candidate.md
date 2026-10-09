<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# 0006: LED candidate for the prototype

* **Status:** Open
* **Date:** 2026-10-09
* **Deciders:** Joe Heffer and collaborator

## Context

The first prototype exists to choose an LED and tune the dawn curve. Two candidates are described in [docs/prototype.md](../prototype.md), and only one is fitted at a time. Each has its own connector type so the wrong supply cannot be connected.

[0003](0003-usb-c-power-only.md) requires USB-C-only power for the design. Candidate A is planned with a separate 5 V 4 A adapter, and candidate B needs a 12 V supply.

## Options

* **Candidate A, SK6812 RGBW strip (5 V):** one addressable strip with white and colour channels, and compatible with USB-C at 5 V if the current fits.
* **Candidate B, warm white and red 12 V strips with logic-level MOSFETs:** simple analogue dimming, and a pure red channel for night use. It needs 12 V, so it would need USB-C Power Delivery or be dropped.

## Decision

Not yet decided. Open sub-question: are the separate bench supplies acceptable for the prototype only, or should candidate B be dropped or run from USB-C Power Delivery?

## Consequences

The choice affects the driver circuit, the firmware output code and the power section of the requirements. Record the light logger results that informed it here once they exist.
