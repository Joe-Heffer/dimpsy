<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Third-party projects

Upstream projects that Dimpsy may draw on. No third-party code or files are included yet. The website loads ESP Web Tools from a CDN at run time (see the last row).

Before reusing anything, verify the licence from the project’s own licence file and confirm it is compatible with the licence of the folder it would go into. If code or files are copied, keep the original copyright and licence notices intact, add the licence text to `LICENSES/`, and update the row below.

| Project | URL | Licence | What we might reuse | Status |
| --- | --- | --- | --- | --- |
| GlowLight | <https://github.com/Friedjof/GlowLight> | To verify (believed GPL-3.0) | To be decided | Not yet reviewed |
| kid-alarm-light | <https://github.com/EtHeO18/kid-alarm-light> | To verify (unknown) | To be decided | Not yet reviewed |
| wakeup-light-esp8266 | <https://github.com/edusteinhorst/wakeup-light-esp8266> | To verify (believed MIT) | To be decided | Not yet reviewed |
| Led’o’clock | <https://github.com/denouche/led-o-clock> | To verify (believed non-commercial, incompatible with GPL) | Ideas only | Do not copy code or files |
| ESP Web Tools | <https://github.com/esphome/esp-web-tools> | Apache-2.0 | Loaded from unpkg by `docs/flash.md`; nothing is copied into the repository | Used at run time |
