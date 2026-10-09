// SPDX-FileCopyrightText: 2026 Joe Heffer
//
// SPDX-License-Identifier: GPL-3.0-or-later

// Checks that the browser port in docs/tools/brightness.js matches the C++
// curves. Reads the output of `make csv` on standard input:
//
//   make -C firmware/core --no-print-directory -s csv | node firmware/core/test/curves_parity.js

"use strict";

const fs = require("fs");
const path = require("path");
const b = require(path.join(__dirname, "../../../docs/tools/brightness.js"));

// The same curves as firmware/core/tools/curves.cpp, in the same order.
const curves = [
  { curve: b.Curve.Exponential, range: 10000, gamma: 2.2 },
  { curve: b.Curve.CieLightness, range: 10000, gamma: 2.2 },
  { curve: b.Curve.Gamma, range: 10000, gamma: 2.2 },
];
const dawnMs = 30 * 60 * 1000;

const rows = fs.readFileSync(0, "utf8").trim().split("\n").slice(1);
let failures = 0;

for (const row of rows) {
  const [minute, ...expected] = row.split(",").map(Number);
  curves.forEach((params, i) => {
    const actual = b.level(params, b.rampPosition(minute * 60000, dawnMs));
    // The CSV has six decimal places.
    if (Math.abs(actual - expected[i]) > 1e-6 + 1e-5 * expected[i]) {
      console.error(
        `minute ${minute}, curve ${i}: JS ${actual}, C++ ${expected[i]}`);
      failures += 1;
    }
  });
}

if (rows.length === 0) {
  console.error("No CSV rows on standard input.");
  process.exit(1);
}
if (failures > 0) {
  process.exit(1);
}
console.log(`Curves match at ${rows.length} points.`);
