<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Flash from your browser

Install the prototype firmware on an [ESP32 DevKitC](decisions/0007-microcontroller-board.md) from this page. You do not need ESPHome, Python or a driver install. The page uses [ESP Web Tools](https://esphome.github.io/esp-web-tools/), which writes the firmware to the board over USB through your browser.

!!! warning "Early prototype"
    The firmware is unfinished and does not yet drive the lamp. This page is for checking the board, the toolchain and the Wi-Fi setup.

<script type="module" src="https://unpkg.com/esp-web-tools@10.4.0/dist/web/install-button.js?module"></script>

<esp-web-install-button manifest="firmware/manifest.json">
  <button slot="activate" class="md-button md-button--primary">Install Dimpsy</button>
  <span slot="unsupported">Your browser cannot flash devices. Use Chrome, Edge or Opera on a computer.</span>
  <span slot="not-allowed">Open this page over HTTPS to flash a device.</span>
</esp-web-install-button>

## What you need

* A computer with Chrome, Edge or Opera. Firefox and Safari do not support the Web Serial API that flashing uses.
* An ESP32 DevKitC, as in decision 0007, and a USB data cable. Some cables only carry power.
* The board plugged in directly or through a hub. Close other programs that use its serial port, such as a serial monitor.

## How to flash

1. Press **Install Dimpsy** and choose the board’s serial port in the browser dialogue. It is often named “CP210x” or “USB Serial”.
2. Choose whether to erase the board first. Erasing clears any earlier firmware and saved Wi-Fi details.
3. Wait for the install to finish. The page shows the progress.
4. When asked, enter your Wi-Fi network name and password. The board saves them and joins the network.

The Wi-Fi details go from your browser to the board over USB. They are not sent to this website.

If the install cannot connect, hold the **BOOT** button on the board while the dialogue starts, and release it once writing begins.

## What the web build leaves out

The binary on this page is the same for everyone, so [`dimpsy-web.yaml`](https://github.com/Joe-Heffer/dimpsy/blob/main/firmware/esphome/dimpsy-web.yaml) removes the private settings from [`dimpsy.yaml`](https://github.com/Joe-Heffer/dimpsy/blob/main/firmware/esphome/dimpsy.yaml):

* No Wi-Fi network or password is built in. You set them at install time.
* The fallback access point “Dimpsy Fallback” has no password. It only starts when the lamp cannot join a network.
* Over-the-air updates are off, because their password would be public. To update, flash again from this page, or [build your own](developers.md#firmware) with your own secrets.

The lamp works without a network, so none of this affects its local behaviour (see the [design principles](design-principles.md)).

## Where the firmware comes from

The [website workflow](https://github.com/Joe-Heffer/dimpsy/actions/workflows/pages.yml) builds `dimpsy-web.yaml` with ESPHome every time `main` changes and publishes the result with a [manifest](https://github.com/Joe-Heffer/dimpsy/blob/main/docs/firmware/manifest.json) that tells ESP Web Tools what to write. The firmware is GPL-3.0-or-later. ESP Web Tools is Apache-2.0 and loads from [unpkg](https://unpkg.com) when you open this page.
