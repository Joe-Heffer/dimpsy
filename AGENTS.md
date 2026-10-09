<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# Agent guidance

Dimpsy is an open source bedside sleep light (early prototype). See [README.md](README.md) for the overview and [CONTRIBUTING.md](CONTRIBUTING.md) for the full rules.

## Layout

* `firmware/`: ESPHome configuration for the ESP32 DevKitC, and portable C++ in `firmware/core/` (MIT)
* `hardware/`: KiCad files and `bom.csv` (CERN-OHL-P-2.0)
* `enclosure/`: CAD and STL files (CC-BY-4.0)
* `docs/`: design principles, requirements, prototype notes and the website source, built by `mkdocs.yml` (CC-BY-4.0; scripts and stylesheets MIT)

## Checks

Run these before committing. CI runs the same checks.

```sh
reuse lint
make -C firmware/core test
cd firmware/esphome && cp secrets.yaml.example secrets.yaml && esphome config dimpsy.yaml
```

For changes to `docs/`, `mkdocs.yml` or the website, also run `mkdocs build --strict` (see `requirements-docs.txt`). Keep `docs/tools/brightness.js` in step with `firmware/core/brightness.h`.

## Rules

* Dimpsy is USB-C powered only. Never add or suggest anything that connects to mains voltage.
* Every new file needs an SPDX copyright and licence header matching its folder (`reuse annotate`). Files that cannot hold comments are covered by `REUSE.toml`.
* Licences follow [decision 0002](docs/decisions/0002-licensing.md): MIT by default. An ESPHome custom component that includes ESPHome headers must be GPL-3.0-or-later.
* Do not copy code or files from Led’o’clock. Record any other third-party material in [THIRD_PARTY.md](THIRD_PARTY.md) and keep its notices intact.
* The board in `firmware/esphome/dimpsy.yaml` follows [decision 0007](docs/decisions/0007-microcontroller-board.md) for the first prototype only. The board for the finished lamp is not decided.
* Keep `firmware/core/` free of ESPHome and Arduino code, so it builds with the system compiler.
* Never commit `firmware/esphome/secrets.yaml`. Use `firmware/esphome/secrets.yaml.example` for placeholders.
* Write prose in British English, in Markdown, using `*` for bullet lists.
* Follow `.editorconfig` (2-space indent, 4 for C/C++, INI and TOML).
* Record notable changes in [CHANGELOG.md](CHANGELOG.md) under “Unreleased”.
* Write commit messages in the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format: a type such as `feat`, `fix`, `docs`, `ci`, `build`, `test`, `refactor` or `chore`, an optional scope in brackets, a colon, then a short description in the imperative mood, for example `docs(safety): add monitoring checks`. Mark breaking changes with `!` after the type or scope, or with a `BREAKING CHANGE:` footer.
