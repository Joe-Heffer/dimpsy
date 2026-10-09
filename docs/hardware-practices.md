<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# Organising hardware materials and components

Practices for keeping the physical parts of the project tidy, traceable and easy to hand over between the two people working on it. They apply to the first prototype described in [prototype.md](prototype.md) and to later revisions.

## Components and stock

* Keep the bill of materials in [`hardware/bom.csv`](../hardware/bom.csv). Record the part, supplier, supplier part number, quantity, unit price, datasheet link and the role the part plays in the design.
* Give each component class a labelled home, such as sectioned organisers or small zip bags for switches, dials, sliders, connectors, LED strips, microcontroller boards and passives.
* Use the BOM name on the label, so the physical stock and the document match.
* Keep spares of cheap parts (resistors, connectors, jumper wires, a spare microcontroller board) so one mistake does not stall the build.
* Keep datasheets and pinouts in `hardware/datasheets/` where the licence allows redistribution. Otherwise link to them from the BOM.
* If the two of you hold parts in different places, record in the BOM who holds what, to avoid duplicate orders.

## Power and safety

The full precautions and monitoring checks are on the [safety page](safety.md). In short:

* Dimpsy is powered by USB-C only ([decision 0003](decisions/0003-usb-c-power-only.md)). No part of the build connects to mains.
* Use a certified, off-the-shelf power supply. The prototype keeps the supply outside both boxes.
* Before modifying the IKEA lamp, note in the repository how it was wired. Remove the bulb holder and mains flex, never reconnect them to the modified lamp, and keep them so the lamp can be restored.
* Give each LED candidate its own connector type so the wrong supply cannot be connected (as described in the prototype notes).

## Prototype structure

* Build in modules: lamp and LED stage, power, controller, and the control panel with the tactile controls.
* Join modules with labelled connectors instead of soldered joints where possible, so each one can be swapped or tested alone.
* Keep the control panel as a separate unit with a defined connector. It is the part most likely to change as the controls are tried out.
* Start on a breadboard, then move to perfboard or a printed circuit board once the design settles.
* Use one wire colour convention throughout, for example red for positive, black for ground and a distinct colour for signal lines. Write the convention next to the wiring diagram.

## Documentation

* Keep schematics and wiring diagrams as editable source files (KiCad, or a text-based format) as well as exported images.
* Photograph each build stage and keep the photos with short notes, so the other person can pick the work up.
* Record hardware choices, such as lamp model, LED type, controller and connector standard, as decision records with the reasoning.
* Describe changes to the physical prototype in commit messages in the same way as code changes, so the history shows the state of the hardware.
* Number prototype builds (for example `proto-1`) and say in the BOM which build each part belongs to.

## Workspace

* Use a clear, dedicated work surface with an anti-static mat and a tray for screws and small parts.
* Keep tools in fixed places: soldering iron and stand, side cutters, wire strippers, multimeter, heat-shrink and a helping-hands clamp.

## Open source

* Hardware files are licensed under CERN-OHL-P-2.0 and enclosure files under CC-BY-4.0. See [LICENSE.md](../LICENSE.md).
* Before designing a part, check for existing open source sunrise alarm and LED controller designs. Record anything reused in [THIRD_PARTY.md](../THIRD_PARTY.md), with its source URL and verified licence.
