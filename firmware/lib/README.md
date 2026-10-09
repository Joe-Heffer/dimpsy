<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: GPL-3.0-or-later
-->

# lib

Private libraries for this project go here, one folder per library.

PlatformIO’s Library Dependency Finder compiles a library from this folder when code in `src/` includes one of its headers. A typical layout is:

```text
lib/
  ExampleLib/
    src/
      ExampleLib.cpp
      ExampleLib.h
```

Third-party libraries should normally be declared under `lib_deps` in `platformio.ini` rather than copied here. If third-party code is copied into this folder, record it in `THIRD_PARTY.md` and keep its original copyright and licence notices intact.
