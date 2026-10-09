<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: GPL-3.0-or-later
-->

# test

Unit tests for the firmware go here.

PlatformIO Unit Testing uses the Unity framework by default. Put each test suite in its own folder whose name starts with `test_`, for example `test/test_fade/test_main.cpp`, then run:

```sh
pio test
```

Tests that do not need the hardware can run on the host by adding a `native` environment to `platformio.ini`.

See https://docs.platformio.org/page/advanced/unit-testing/index.html for details.
