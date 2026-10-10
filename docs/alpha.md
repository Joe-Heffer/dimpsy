<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# Alpha build

The alpha is a smoke test rig. It checks that the whole system works end to end (power, controller, controls, clock, firmware, sunrise ramp and lamp) using parts that UK hobby suppliers keep in stock. It comes before the [first prototype](prototype.md) and does not replace it. Why it exists is recorded in [decision 0009](decisions/0009-alpha-build.md).

A smoke test is a first switch-on to check that nothing fails in an obvious way, before any careful measurement.

## What it tests, and what it does not

It tests:

* that a standard USB-C charger can run the lamp at 5 V, in line with [decision 0003](decisions/0003-usb-c-power-only.md)
* the ESP32 DevKitC, the pin map in [decision 0007](decisions/0007-microcontroller-board.md) and the ESPHome firmware
* a knob, a snooze button and an alarm toggle, used in the dark
* keeping the time with no network, from a battery-backed clock
* a sunrise ramp from deep red to warm white, started by the alarm
* safe start after a power cut, and the limit on time at full brightness
* heat inside the IKEA Fado with an LED core

It does not settle:

* the LED choice in [decision 0006](decisions/0006-led-candidate.md). The alpha uses an SK6812 RGBW strip, which is candidate A. Its 256 steps per channel will show visible steps at the start of a sunrise, so it says little about light quality.
* the brightness curve ([#16](https://github.com/Joe-Heffer/dimpsy/issues/16)) or flicker-free dimming at low levels ([#8](https://github.com/Joe-Heffer/dimpsy/issues/8)). The optional add-on below starts on these.
* light levels at the pillow. The TSL2591 logger is left out. A phone light meter app gives a rough reading in the meantime.

## Layout

The layout is the first prototype’s, with fewer parts.

* **Console.** The ESP32 on a breadboard in a card or foam-board box, with one rotary encoder (a knob that clicks round and can be pressed), a 30 mm arcade button and a toggle switch.
* **Power.** A Raspberry Pi 15 W USB-C charger feeds a USB-C breakout board (a small board that brings the socket’s power out to screw holes). A 3 A inline fuse follows, then two Wago lever connectors acting as the 5 V and ground rails. Strip current goes from the Wago connectors to the lamp and never through the breadboard.
* **Lamp.** The IKEA Fado ([decision 0005](decisions/0005-lamp-body.md)) with its bulb holder and mains flex removed. Thirty LEDs of SK6812 RGBW strip (half a metre) are wound round a short aluminium tube standing in the base.
* **Firmware.** [`firmware/esphome/dimpsy-alpha.yaml`](../firmware/esphome/dimpsy-alpha.yaml), which adds the strip, controls, clock and sunrise to the base configuration.

## Power budget

The charger gives 5.1 V at 3 A. [Decision 0003](decisions/0003-usb-c-power-only.md) asks for a supply rated at least 1.25 times the greatest draw, so the alpha should stay under 2.4 A.

| Load | Worst case | With the firmware cap |
| --- | --- | --- |
| 30 SK6812 RGBW LEDs, 20 mA per channel | 2.4 A (all four channels full) | about 1.5 A (white full, colours at half) |
| ESP32 DevKitC with Wi-Fi | about 0.25 A | about 0.25 A |
| Total | about 2.65 A | about 1.75 A |

The hardware worst case is slightly over the 2.4 A target, so the firmware cap matters. It is the `color_correct` line in the alpha configuration. Do not raise it, and do not lengthen the strip, without redoing this table. The 30-LED length also keeps the hardware worst case under what the charger can supply.

As a rough guide, 30 LEDs on the white channel give a few hundred lumens. That is enough to see the ramp and judge heat, and less than the 800 lm estimated in decision 0006 for 250 lux at the pillow.

## Parts

Prices are from The Pi Hut on 9 October 2026, including VAT. Stock is patchy, so each line gives an alternative. Parts marked “held” are already owned or come in the Elegoo Mega starter kit.

| Ref | Part | Qty | Where to buy | About | Notes |
| --- | --- | --- | --- | --- | --- |
| A1 | ESP32 DevKitC | 1 | Held | | From decision 0007 |
| D1 | SK6812 RGBW LED strip, 5 V, 60 LEDs/m, 1 m | 1 | [The Pi Hut 104549](https://thepihut.com/products/flexible-rgbw-led-strip-neopixel-ws2812-sk6812-compatible-60-led-metre) | £14.40 | The listing does not give the white colour temperature. For a known warm white, search Amazon for an SK6812 “RGBWW” or “warm white” 5 V 60 LEDs/m strip (BTF-LIGHTING sell one). Cut to 30 LEDs |
| U1 | 74AHCT125 or 74HCT125 level shifter, 14-pin DIP | 1 | [The Pi Hut ADA1787](https://thepihut.com/products/74ahct125-quad-level-shifter-3v-to-5v) or [RS 709-2205](https://uk.rs-online.com/web/p/line-interface-ics/7092205) (SN74HCT125N) | £1–2 | Lifts the ESP32’s 3.3 V data signal to the 5 V the strip expects |
| PS1 | Raspberry Pi 15 W USB-C power supply, UK plug | 1 | [The Pi Hut SC0443](https://thepihut.com/products/raspberry-pi-psu-uk) | £7.70 | 5.1 V, 3 A |
| J1 | USB-C breakout, downstream, with 5.1 kΩ CC resistors | 1 | [The Pi Hut ADA4090](https://thepihut.com/products/adafruit-usb-c-breakout-board-downstream-connection-ada4090) or [Pimoroni](https://shop.pimoroni.com/products/adafruit-usb-c-breakout-board-downstream-connection) | £2.90 | Sold out at The Pi Hut when checked. The [sunken version](https://thepihut.com/products/adafruit-sunken-usb-type-c-breakout-board-downstream-connection) also works. See the note below on cheap adapters |
| F1 | Inline blade fuse holder and 3 A blade fuse | 1 | Amazon, Halfords or RS | £3–5 | On the 5 V wire, next to J1 |
| W1 | Wago 221 lever connectors, 3- or 5-way | 2 | Amazon, Screwfix or Toolstation | £5 (pack) | The 5 V and ground rails |
| C1 | 1000 µF electrolytic capacitor, 10 V or higher | 1 | RS, The Pi Hut or Amazon | £1 | Across the strip’s power wires, to absorb the surge at switch-on. Mind the polarity |
| R1 | 330 Ω resistor | 1 | Held (Elegoo kit) | | In the strip’s data wire |
| S1 | Rotary encoder with push switch | 1 | [The Pi Hut ADA377](https://thepihut.com/products/adafruit-rotary-encoder-extras), or a KY-040 encoder module from Amazon | £3–5 | ADA377 was sold out when checked. A KY-040 module also works, powered from 3.3 V |
| S2 | 30 mm arcade button | 1 | [The Pi Hut 104438](https://thepihut.com/products/arcade-button-30mm-translucent-clear) | £2.50 | Snooze |
| S3 | Miniature toggle switch, on-off | 1 | The Pi Hut, Amazon or RS | £1–2 | Alarm on or off |
| U2 | DS3231 real-time clock (a clock chip with its own battery) | 1 | [The Pi Hut ADA5188](https://thepihut.com/products/adafruit-ds3231-precision-rtc-stemma-qt) or [Pimoroni](https://shop.pimoroni.com/products/adafruit-ds3231-precision-rtc-stemma-qt) | £13.40 | Needs a CR1220 coin cell (£1.90). See the note below on cheap modules |
| M1 | Aluminium tube, about 25 mm across and 150 mm long | 1 | B&Q, Wickes or Amazon | £3–5 | The LED core. Sheds heat from the strip |
| L1 | IKEA Fado lamp | 1 | IKEA | | Bulb holder and mains flex removed (see [safety](safety.md)) |
| | Breadboard, jumper wires, card or foam-board box | | Held (Elegoo kit) | | |
| | Hook-up wire, 20 AWG or thicker, red and black | 1 m each | Amazon, RS or The Pi Hut | £3 | For the strip power. Thinner wire is fine for signals |

The new parts come to roughly £60 to £70. The same parts are listed in [`hardware/bom.csv`](../hardware/bom.csv) under the build name `alpha`.

!!! warning "Cheap USB-C to screw terminal adapters"
    Many cheap USB-C sockets sold as power adapters leave out the two 5.1 kΩ resistors on the CC pins. Without them a USB-C charger does not switch its output on, and the lamp gets no power. Buy a breakout that states it has them, such as the Adafruit boards above.

!!! warning "Cheap DS3231 modules"
    The common ZS-042 DS3231 module from Amazon is built to charge a rechargeable LIR2032 cell. Fitted with an ordinary CR2032, it tries to charge a cell that must not be charged. Use the Adafruit board, or disable the charging path on the module before fitting a CR2032.

### Optional add-on: smooth dimming test

To start on the dimming questions in [#8](https://github.com/Joe-Heffer/dimpsy/issues/8) and [decision 0006](decisions/0006-led-candidate.md) candidate C, add a second, plain warm white light source driven by high-resolution PWM. PWM (pulse-width modulation) dims an LED by switching it on and off thousands of times a second.

| Part | Where to buy | About | Notes |
| --- | --- | --- | --- |
| DFRobot 5 V COB LED strip, warm white 3000 K | [The Pi Hut FIT0876](https://thepihut.com/products/5v-cob-led-strip-light-warm-white) | £3.80 | 60 mm long, 16 LEDs, 3 W, 0.6 A |
| IRLB8721 logic-level MOSFET | RS or The Pi Hut | £1–2 | A transistor that switches the strip from a 3.3 V signal |
| 10 kΩ and 100 Ω resistors | Held (Elegoo kit) | | 10 kΩ from gate to ground, 100 Ω between GPIO13 and the gate |

It adds 0.6 A, which still fits the power budget with the firmware cap. The firmware for it is not written yet. It would be a `ledc` output on GPIO13 at 12 bits or more.

## Wiring

Wire colours follow [hardware practices](hardware-practices.md): red for 5 V, black for ground, and other colours for signals. The Pi Hut strip uses white for ground, so label its wires.

### Power

| From | To | Wire |
| --- | --- | --- |
| J1 VBUS | F1, then the 5 V Wago | Red, 20 AWG |
| J1 GND | Ground Wago | Black, 20 AWG |
| 5 V Wago | Strip 5 V, with C1 positive at the strip end | Red, 20 AWG |
| Ground Wago | Strip ground, with C1 negative at the strip end | Black, 20 AWG |
| 5 V Wago | ESP32 `5V` pin, and U1 pin 14 (VCC) | Red, thin |
| Ground Wago | ESP32 `GND`, and U1 pin 7 (GND) | Black, thin |

### Signals

| ESP32 pin | Goes to | Notes |
| --- | --- | --- |
| GPIO23 | U1 pin 2 (1A). U1 pin 3 (1Y) goes through R1 to the strip’s data in | Data. Connect to the end of the strip where its printed arrows start |
| GND | U1 pin 1 (1OE) | Turns the first channel of U1 on |
| GND | U1 pins 5, 9 and 12 (unused inputs) | Stops the unused channels picking up noise |
| GPIO32, GPIO33 | S1 A and B | The encoder’s middle pin goes to ground. On a KY-040 module, `CLK` is A, `DT` is B, `SW` is the push switch, and `+` goes to `3V3` |
| GPIO25 | S1 push switch | Other side to ground |
| GPIO17 | S2 | Other side to ground |
| GPIO16 | S3 | Other side to ground |
| GPIO21, GPIO22 | U2 SDA, SCL | Power U2 from the ESP32’s `3V3` pin |

The firmware turns on the ESP32’s internal pull-up resistors, so the buttons and encoder need no extra resistors.

!!! danger "Flashing over USB"
    Before plugging the ESP32 into a computer to flash it, unplug the red wire from the ESP32’s `5V` pin, or unplug the USB-C charger. Otherwise the two supplies are joined through the board. After the first flash, updates can go over Wi-Fi.

## Firmware

Build and flash from `firmware/esphome/`, as in the [firmware guide](reference/firmware.md):

```sh
esphome run dimpsy-alpha.yaml
```

The alpha configuration gives:

* **Knob.** Turn to dim or brighten in 5% steps. Turning up from off starts at 5%. Press to switch the lamp on or off.
* **Snooze button.** Stops a sunrise in progress and fades out. Otherwise switches the lamp on or off.
* **Alarm toggle.** The sunrise runs only when the toggle is on.
* **Web page.** Wake time, sunrise length (5 to 60 minutes, default 30), and a button that runs a three-minute test sunrise.
* **Clock.** The DS3231 keeps the time. When Wi-Fi is connected, network time sets it. The time zone is Europe/London.
* **Safety.** The lamp starts off after any restart, fades out an hour after a sunrise ends, and fades out three hours after any switch-on. The colour channels are capped at half.

## Smoke test plan

Work through these in order and note the results in the pull request or an issue. Stop at the first failure.

1. **Power only.** Connect the charger, breakout, fuse and Wago rails with nothing else attached. If you have a multimeter, check for about 5 V between the rails.
2. **Controller.** Flash the firmware with the 5 V wire unplugged (see the warning above). Check the log shows the clock and Wi-Fi.
3. **Strip.** Reconnect power and switch the lamp on at low brightness from the web page. All 30 LEDs should light the same colour. If the colours are wrong, check `channel_colors` in the configuration.
4. **Controls.** Try the knob, the knob press, the snooze button and the toggle. The web page shows each one changing.
5. **Clock without a network.** Let network time set the clock, switch the router off or move out of range, then unplug and replug the lamp. The time on the log should still be right.
6. **Test sunrise.** Press “Test sunrise” on the web page. The lamp should rise from dim red to warm white over three minutes. Press the snooze button during a second run to check it stops.
7. **Real alarm.** Set the wake time 35 minutes ahead, turn the alarm toggle on and leave it. The sunrise should start 30 minutes before the wake time.
8. **Safe start.** Unplug the lamp in the middle of a sunrise and plug it back in. It must come back off.
9. **Heat.** Leave the lamp at full brightness for an hour inside the Fado, then check the strip, tube, fuse, Wago connectors and charger as on the [safety page](safety.md). Nothing should be above about 50 to 60 °C.
10. **Overnight.** Run the alarm for a few nights before relying on it. Keep another alarm until then.

## Next steps

The results feed [decision 0006](decisions/0006-led-candidate.md) on candidate A and the open questions in [issue #42](https://github.com/Joe-Heffer/dimpsy/issues/42) (DS3231 and SK6812 support in ESPHome) and [issue #44](https://github.com/Joe-Heffer/dimpsy/issues/44) (working offline). Most of the alpha (charger, breakout, fuse, controls, clock and core tube) carries over to the first prototype unchanged.
