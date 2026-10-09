<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# Third-party projects

Upstream projects that Dimpsy may draw on. No third-party code or files are included yet, apart from the logo wordmark, which uses glyph outlines from the Fredoka typeface. The website loads ESP Web Tools from a CDN at run time, and the firmware is built with ESPHome. What to reuse from each project is recorded in [decision 0008](docs/decisions/0008-reuse-from-other-projects.md).

Before reusing anything, verify the licence from the project’s own licence file and confirm it is compatible with the licence of the folder it would go into. If code or files are copied, keep the original copyright and licence notices intact, add the licence text to `LICENSES/`, and update the row below.

Licences were checked on 2026-10-09.

| Project | URL | Licence | What we might reuse | Status |
| --- | --- | --- | --- | --- |
| ESPHome | <https://github.com/esphome/esphome> | GPL-3.0 (C++ runtime) and MIT (Python and everything else), per its licence file | Built-in components for the encoder, buttons, RTC, LED strip and PWM outputs | Build platform; nothing is copied into the repository |
| HA-Sunrise-Lamp-Alarm | <https://github.com/AlexD717/HA-Sunrise-Lamp-Alarm> | None stated (all rights reserved) | Confirmation that SK6812 RGBW, an encoder and a button work together in ESPHome | Reference only; do not copy |
| GlowLight | <https://github.com/Friedjof/GlowLight> | Inconsistent: licence file is LGPL-3.0, README says GPL-3.0, some modes say MIT; no “or later” | Dusk sequence from `SunsetMode`; test layout | Ideas only; ask the author before copying |
| kid-alarm-light | <https://github.com/EtHeO18/kid-alarm-light> | MIT (copyright 2022 Daan Meijer) | Weekly schedule model, colour easing, ambient light compensation | Reference; may be copied into `firmware/` or `docs/` with its notice |
| wakeup-light-esp8266 | <https://github.com/edusteinhorst/wakeup-light-esp8266> | MIT (copyright 2015 Eduardo Steinhorst) | Failsafe beeper, duty cap | Reference for firmware only; its hardware uses mains AC and must not be used |
| Led’o’clock | <https://github.com/denouche/led-o-clock> | CC-BY-NC-SA-4.0, per its README (incompatible) | Countdown by turning off one LED at a time | Ideas only; do not copy code or files |
| Fredoka | <https://github.com/hafontia/Fredoka-One> | OFL-1.1 (copyright 2016 The Fredoka Project Authors) | The “dimpsy” wordmark in `docs/assets/logo/` is drawn from Fredoka SemiBold glyph outlines | Converted to outlines; the font itself is not included |
| ESP Web Tools | <https://github.com/esphome/esp-web-tools> | Apache-2.0 | Loaded from unpkg by `docs/flash.md`; nothing is copied into the repository | Used at run time |
