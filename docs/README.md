<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# Docs folder

This folder holds the project documentation and the source of the website at <https://joe-heffer.github.io/dimpsy/>. `mkdocs.yml` in the repository root builds it with Material for MkDocs, and the page order comes from its `nav` section. This file is for people browsing the repository and is left out of the website.

## Pages

* `index.md`: the website home page.
* `design-principles.md`, `requirements.md`, `roadmap.md`, `licensing.md`: why the lamp exists, what it must do, what comes next and how it is licensed.
* `prototype.md`: the first prototype, with its block diagram and line drawing.
* `hardware-practices.md`: conventions for the hardware design.
* `flash.md`: flash the firmware from a browser, using `firmware/manifest.json`.
* `developers.md`: notes on the developer tools.
* `decisions/`: one short file per design decision, with an index (`README.md`) and a `template.md`. Follow [decision 0001](decisions/0001-record-decisions.md) to add one.

## Website copies

These files only include a file from elsewhere in the repository. Edit the original, not the copy.

* `changelog.md` includes `CHANGELOG.md`.
* `contributing.md` includes `CONTRIBUTING.md`.
* `reference/firmware.md`, `reference/hardware.md` and `reference/enclosure.md` include the README in `firmware/`, `hardware/` and `enclosure/`.

## Supporting files

* `assets/`: site stylesheet and favicon.
* `images/`: SVG diagrams used by the pages.
* `tools/`: the curve explorer page (`curves.md`) and its scripts. Keep `brightness.js` in step with `firmware/core/brightness.h`.
* `hooks/links.py`: MkDocs hook that points links to files outside this folder at GitHub. It is not published.
* `firmware/manifest.json`: web flasher manifest.

## Building

```sh
pip install -r requirements-docs.txt
mkdocs serve
mkdocs build --strict
```

Run `mkdocs build --strict` from the repository root before committing changes to this folder. Prose is British English Markdown, with `*` for bullet lists. Every new file needs an SPDX header, as described in [CONTRIBUTING.md](../CONTRIBUTING.md).
