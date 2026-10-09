<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Contributing

Thank you for your interest in Dimpsy. The project is at an early stage, so please open an issue to discuss an idea before starting substantial work.

## Licence of contributions

Contributions are accepted under the same licence as the folder they are made to (inbound = outbound):

* `firmware/`: GPL-3.0-or-later
* `hardware/`: CERN-OHL-S-2.0
* `enclosure/` and `docs/`: CC-BY-SA-4.0
* small configuration files: CC0-1.0

See [LICENSE.md](LICENSE.md) for the full mapping. You keep the copyright in your contribution.

We recommend signing off your commits with `git commit -s`. This adds a `Signed-off-by` line certifying the [Developer Certificate of Origin](https://developercertificate.org/), which states that you have the right to submit the work under the project’s licence.

## Licence headers (REUSE)

The project follows the [REUSE specification](https://reuse.software). Every new file needs copyright and licence information.

* For files that can hold comments, add a header with the `reuse` tool, for example:

  ```sh
  pip install reuse
  reuse annotate --copyright "Your Name" --year 2026 --license GPL-3.0-or-later firmware/src/example.cpp
  ```

* Files that cannot hold comments, such as KiCad, CAD, STL and image files, are covered by folder rules in `REUSE.toml`. Add a new entry if a file needs a different licence or copyright holder.
* Run `reuse lint` before opening a pull request. CI runs it too.

## Third-party code and files

* Record anything taken from another project in [THIRD_PARTY.md](THIRD_PARTY.md), with its source URL and verified licence.
* Keep the original copyright and licence notices intact. Do not remove or rewrite them.
* Add the upstream licence text to `LICENSES/` (`reuse download <SPDX-ID>`) and mark the file with the original copyright holder.
* Only reuse material whose licence is compatible with the destination folder.
* Do not copy any code or files from Led’o’clock. Its licence is non-commercial and incompatible with the GPL. It can inform ideas only.

## Style

* Write prose in British English, in Markdown, using `*` for bullet lists.
* Follow `.editorconfig` for whitespace and line endings.
* Record notable changes in [CHANGELOG.md](CHANGELOG.md) under “Unreleased”.
