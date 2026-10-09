<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# Decisions

Each design decision has its own short file in this folder, so that anyone joining the project can see what was chosen, what else was considered and why. It also saves the same question being argued twice.

## How to record a decision

1. Copy [template.md](template.md) to `NNNN-short-title.md`, using the next free number.
2. Fill it in. A few sentences per section is enough.
3. Set the status and add a row to the index below.
4. Open a pull request. The other person reviews the decision as they would review code.

Do not edit an accepted decision to change its outcome. Write a new one that supersedes it, and update the status of the old one to “Superseded by NNNN”. The history stays readable that way.

## Statuses

* **Open:** the question is stated and the options are listed, but nothing is chosen.
* **Accepted:** chosen, and the project follows it.
* **Superseded:** replaced by a later decision.

## Index

| No. | Decision | Status |
| --- | --- | --- |
| [0001](0001-record-decisions.md) | Record decisions as one file each | Accepted |
| [0002](0002-licensing.md) | Permissive licences, MIT by default, one per folder | Accepted |
| [0003](0003-usb-c-power-only.md) | Power the finished lamp from USB-C only | Accepted |
| [0004](0004-prototype-firmware-platform.md) | Firmware platform for the prototype | Accepted |
| [0005](0005-lamp-body.md) | Lamp body: IKEA Fado or Tokabo | Accepted |
| [0006](0006-led-candidate.md) | LED candidate for the prototype | Open |
| [0007](0007-microcontroller-board.md) | Microcontroller board | Accepted |
| [0008](0008-reuse-from-other-projects.md) | What to reuse from other projects | Accepted |
| [0009](0009-alpha-build.md) | An alpha build from stocked parts | Accepted |
