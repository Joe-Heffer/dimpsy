<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# Developer tools

Tools for working on Dimpsy without the hardware in front of you: simulators, local builds and the checks CI runs.

## Simulation with Wokwi

[Wokwi](https://wokwi.com) simulates the ESP32 and its controls. The folder [`firmware/esphome/`](https://github.com/Joe-Heffer/dimpsy/tree/main/firmware/esphome) is a Wokwi project:

* [`diagram.json`](https://github.com/Joe-Heffer/dimpsy/blob/main/firmware/esphome/diagram.json) wires an ESP32 DevKitC to two rotary encoders, a slide potentiometer, a toggle switch, a button and a DS1307 clock, using the pins in [decision 0007](decisions/0007-microcontroller-board.md).
* [`wokwi.toml`](https://github.com/Joe-Heffer/dimpsy/blob/main/firmware/esphome/wokwi.toml) points Wokwi at the firmware that ESPHome builds.
* [`scenarios/`](https://github.com/Joe-Heffer/dimpsy/tree/main/firmware/esphome/scenarios) holds automated test scenarios. The first checks that the firmware boots with no Wi-Fi network.

The diagram has no SK6812 strip or TSL2591 light sensor, so the lamp output is not simulated. Use the [curve explorer](tools/curves.md) for that.

### In VS Code

1. Install [ESPHome](https://esphome.io/guides/installing_esphome/) and the [Wokwi for VS Code](https://docs.wokwi.com/vscode/getting-started) extension.
2. In `firmware/esphome/`, copy `secrets.yaml.example` to `secrets.yaml` and run `esphome compile dimpsy.yaml`.
3. Open the folder in VS Code and run **Wokwi: Start Simulator** from the command palette.

### In the browser

1. Build the firmware as above.
2. Start a [new ESP32 project on wokwi.com](https://wokwi.com/projects/new/esp32).
3. Replace the contents of the `diagram.json` tab with the repository’s `diagram.json`.
4. Press F1, choose **Upload Firmware and Start Simulation**, and pick `.esphome/build/dimpsy/.pioenvs/dimpsy/firmware.factory.bin`.

### In CI

The [Wokwi simulation workflow](https://github.com/Joe-Heffer/dimpsy/actions/workflows/wokwi.yml) builds the firmware and runs the scenarios with the [Wokwi CI action](https://github.com/wokwi/wokwi-ci-action). It needs a [Wokwi CI token](https://wokwi.com/dashboard/ci) saved as the repository secret `WOKWI_CLI_TOKEN`. Without it, as on pull requests from forks, the job skips with a notice. Each run uploads the serial log as an artifact.

## Dawn curve explorer

The [curve explorer](tools/curves.md) runs the firmware’s brightness curves in your browser. Change the curve, range, gamma, dawn length and PWM resolution, then play the dawn on screen. Every run of the [CI workflow](https://github.com/Joe-Heffer/dimpsy/actions/workflows/ci.yml) also charts the default curves in the summary of its “Firmware core tests” job.

## Flash from the browser

The [flash page](flash.md) installs the prototype firmware over USB with [ESP Web Tools](https://esphome.github.io/esp-web-tools/). It uses `firmware/esphome/dimpsy-web.yaml`, which is `dimpsy.yaml` without Wi-Fi passwords or over-the-air updates. The website workflow builds it on `main` and publishes `dimpsy.factory.bin` beside `docs/firmware/manifest.json`. Locally, `mkdocs serve` shows the page but flashing needs the binary copied to `site/firmware/`.

## Build locally

### Firmware

ESPHome needs Python 3. Run these from `firmware/esphome/`:

```sh
pip install esphome
cp secrets.yaml.example secrets.yaml   # then edit secrets.yaml
esphome config dimpsy.yaml             # validate
esphome run dimpsy.yaml                # compile, flash and show logs
```

See the [firmware guide](reference/firmware.md) for more.

### Firmware core

The portable C++ in `firmware/core/` builds with the system compiler. Run these from `firmware/core/`:

```sh
make test      # build and run the unit tests
make summary   # print the dawn curves as Markdown with Mermaid charts
make csv       # print the dawn curves as CSV
```

### Website

This site is built with [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) from the Markdown in `docs/`. From the repository root:

```sh
pip install -r requirements-docs.txt
mkdocs serve           # preview at http://127.0.0.1:8000
mkdocs build --strict  # the check CI runs
```

### Checks

Run these before opening a pull request. CI runs the same checks.

```sh
reuse lint
make -C firmware/core test
cd firmware/esphome && cp secrets.yaml.example secrets.yaml && esphome config dimpsy.yaml
```

## Continuous integration

| Workflow | What it checks |
| --- | --- |
| [CI](https://github.com/Joe-Heffer/dimpsy/actions/workflows/ci.yml) | REUSE compliance, ESPHome validation and build, core unit tests and the browser curve port |
| [Lint](https://github.com/Joe-Heffer/dimpsy/actions/workflows/lint.yml) | Markdown, EditorConfig, actionlint, links, spelling and zizmor |
| [Wokwi simulation](https://github.com/Joe-Heffer/dimpsy/actions/workflows/wokwi.yml) | Boots the firmware in the simulator and runs the scenarios |
| Website (`pages.yml`) | Builds this site and publishes it from `main` |
| [Pull request title](https://github.com/Joe-Heffer/dimpsy/actions/workflows/pr-title.yml) | Conventional commit titles, which Release Please reads |
| [Release Please](https://github.com/Joe-Heffer/dimpsy/actions/workflows/release-please.yml) | Opens release pull requests and keeps the changelog |

## References

* [ESPHome documentation](https://esphome.io)
* [ESP32 DevKitC user guide](https://docs.espressif.com/projects/esp-dev-kits/en/latest/esp32/esp32-devkitc/user_guide.html)
* [Wokwi ESP32 guide](https://docs.wokwi.com/guides/esp32)
* [KiCad](https://www.kicad.org), for the hardware once it is designed
* [REUSE specification](https://reuse.software)
