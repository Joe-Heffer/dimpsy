<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# 0007: Microcontroller board

* **Status:** Accepted
* **Date:** 2026-10-09
* **Deciders:** Joe Heffer and collaborator
* **Issue:** [#6](https://github.com/Joe-Heffer/dimpsy/issues/6)

## Context

The project sources named three different boards:

* `firmware/platformio.ini` targeted the ESP32-C3 DevKitM-1 as a placeholder.
* `hardware/bom.csv` and the prototype phase plan listed a full-size ESP32 DevKit, which is easier to wire on a breadboard.
* The earlier build plan proposed an ESP32-C3 SuperMini for the finished lamp.

The board for `proto-1` must provide:

* two rotary encoders with push switches (6 pins)
* a slide potentiometer on an ADC input (1 pin)
* a toggle switch (1 pin)
* an arcade button (1 pin)
* an optional three-position mode switch (2 pins)
* two PWM outputs for LED candidate B, or one data line for the SK6812 strip of candidate A (1 or 2 pins)
* I²C for the real-time clock (2 pins)

That is 14 to 15 pins, plus smooth low-level dimming for the dawn curve.

We already hold two boards, so buying nothing new was a factor:

* an ESP32 DevKitC (ESP32-WROOM-32 module), bought October 2024
* an Arduino Mega 2560 R3 (Elegoo clone, in the ELEGOO Mega R3 starter kit), bought February 2026

Code portability between boards was not treated as a factor. Firmware can be adapted with tooling if the board changes, so the comparison rests on hardware.

## Options

* **ESP32 DevKitC (held).** Around 25 usable GPIO. The LEDC peripheral has 16 channels with selectable resolution, so 12 to 16-bit dimming at a flicker-free frequency is simple. The RMT peripheral drives SK6812 timing. Wi-Fi and Bluetooth allow NTP time, over-the-air updates and ESPHome or WLED. Drawbacks: 3.3 V logic, so the SK6812 data line needs a level shifter to be reliable; ADC2 pins cannot be used while Wi-Fi is on; the ADC is non-linear; several strapping pins must be avoided; the 38-pin board covers most of a standard breadboard.
* **Arduino Mega 2560 (held).** 54 digital and 16 analogue pins, six external interrupts, four 16-bit timers for smooth dimming, 8 KB RAM, and 5 V logic that drives SK6812 directly. The starter kit includes parts for trying controls quickly. Drawbacks: no wireless, so no NTP, ESPHome or WLED; too large for a finished lamp; its electrical behaviour differs from any likely final board.
* **ESP32-C3 SuperMini (not held).** Small enough for the finished lamp, with Wi-Fi, Bluetooth LE and 6 LEDC channels. It exposes only about 13 GPIO, three of which are strapping pins, which is fewer than the 14 to 15 listed above.

## Decision

`proto-1` uses the **ESP32 DevKitC** we already hold.

* It meets the pin and PWM requirements with spare capacity (see the provisional pin map below).
* It shares 3.3 V logic, ADC behaviour, strapping-pin rules and the LEDC and RMT peripherals with any ESP32-family final board, so electrical problems show up on `proto-1` rather than later.
* It keeps ESPHome and WLED available for [decision 0004](0004-prototype-firmware-platform.md) (issue [#5](https://github.com/Joe-Heffer/dimpsy/issues/5)). The Mega would rule both out.
* It allows NTP time, settings from a phone and firmware updates without opening the lamp. The design principles still require the lamp to work fully without a network, so wireless features stay optional.

The Mega 2560 stays available as a bench rig for trying the feel and layout of the physical controls. It is not part of `proto-1`.

The board for the finished lamp is not decided here. It is expected to be ESP32-family. If it is the ESP32-C3 SuperMini, the pin budget must first be reduced, for example by reading the three-position switch on one ADC pin through a resistor ladder or by adding an I²C GPIO expander on the RTC bus. That choice gets its own decision record.

## Provisional pin map

For the ESP32-WROOM-32 on the DevKitC. Check against the board silkscreen before wiring. It avoids strapping pins (0, 2, 5, 12, 15), flash pins (6 to 11) and the USB serial pins (1, 3), and puts the analogue input on ADC1 so it works with Wi-Fi on.

| Function | GPIO | Notes |
| --- | --- | --- |
| I²C SDA (RTC) | 21 | Default I²C pins |
| I²C SCL (RTC) | 22 | |
| Encoder 1 A, B, push | 32, 33, 25 | Internal pull-ups available |
| Encoder 2 A, B, push | 26, 27, 14 | Internal pull-ups available |
| Slide potentiometer | 34 | ADC1, input only |
| Toggle switch | 16 | |
| Arcade button | 17 | |
| Three-position switch | 18, 19 | Optional |
| SK6812 data (candidate A) or PWM 1 (candidate B) | 23 | Only one candidate is fitted at a time |
| PWM 2 (candidate B) | 13 | |
| Spare | 4, 35, 36, 39 | 35, 36 and 39 are input only, with no internal pull-ups |

## Consequences

* `firmware/platformio.ini` targets `esp32dev` (the PlatformIO board definition for the DevKitC) in place of the ESP32-C3 placeholder.
* `hardware/bom.csv` records the DevKitC as held, and adds a 74AHCT125 level shifter for the SK6812 data line.
* Two breadboards side by side, or a screw-terminal breakout board, will make the 38-pin board easier to wire.
* The pin map above is provisional and should be confirmed when the controls are wired.
* A separate decision is needed for the finished lamp’s board, including the pin budget check for the ESP32-C3 SuperMini.
