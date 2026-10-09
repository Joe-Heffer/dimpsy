// SPDX-FileCopyrightText: 2026 Joe Heffer
//
// SPDX-License-Identifier: GPL-3.0-or-later

// Unit tests for brightness.h. Build and run with `make test`.

#include "../brightness.h"

#include <cmath>
#include <cstdio>

namespace {

int failures = 0;

void check(bool condition, const char *what, int line) {
    if (!condition) {
        std::printf("FAIL line %d: %s\n", line, what);
        ++failures;
    }
}

#define CHECK(condition) check((condition), #condition, __LINE__)

bool near(float a, float b, float tolerance = 1e-4f) {
    return std::fabs(a - b) <= tolerance;
}

const dimpsy::CurveParams all_curves[] = {
    {dimpsy::Curve::Exponential, 10000.0f, 2.2f},
    {dimpsy::Curve::CieLightness, 10000.0f, 2.2f},
    {dimpsy::Curve::Gamma, 10000.0f, 2.2f},
};

void test_clamp() {
    CHECK(dimpsy::clamp01(-1.0f) == 0.0f);
    CHECK(dimpsy::clamp01(0.25f) == 0.25f);
    CHECK(dimpsy::clamp01(2.0f) == 1.0f);
    CHECK(dimpsy::clamp01(std::nanf("")) == 0.0f);
}

void test_end_points() {
    for (const auto &params : all_curves) {
        CHECK(near(dimpsy::level(params, 1.0f), 1.0f));
        CHECK(near(dimpsy::level(params, 5.0f), 1.0f));
    }
    CHECK(dimpsy::cie_lightness_level(0.0f) == 0.0f);
    CHECK(dimpsy::gamma_level(0.0f, 2.2f) == 0.0f);
    CHECK(near(dimpsy::exponential_level(0.0f, 10000.0f), 1e-4f, 1e-7f));
    CHECK(near(dimpsy::exponential_level(-1.0f, 10000.0f), 1e-4f, 1e-7f));
}

void test_known_values() {
    // L* = 50 is about 18.4 % luminance.
    CHECK(near(dimpsy::cie_lightness_level(0.5f), 0.1842f));
    // The linear segment and the cube meet at L* = 8.
    CHECK(near(dimpsy::cie_lightness_level(0.08f), 8.0f / 903.3f, 1e-5f));
    // Each tenth of the dial is a 10000^0.1 (about 2.5x) step.
    const float step = dimpsy::exponential_level(0.6f, 10000.0f) /
        dimpsy::exponential_level(0.5f, 10000.0f);
    CHECK(near(step, std::pow(10000.0f, 0.1f), 1e-3f));
    CHECK(near(dimpsy::gamma_level(0.5f, 2.0f), 0.25f));
}

void test_monotonic() {
    for (const auto &params : all_curves) {
        float previous = dimpsy::level(params, 0.0f);
        for (int i = 1; i <= 1000; ++i) {
            const float current = dimpsy::level(params, i / 1000.0f);
            CHECK(current > previous);
            previous = current;
        }
    }
}

void test_ramp_position() {
    CHECK(dimpsy::ramp_position(0, 1800000) == 0.0f);
    CHECK(near(dimpsy::ramp_position(900000, 1800000), 0.5f));
    CHECK(dimpsy::ramp_position(1800000, 1800000) == 1.0f);
    CHECK(dimpsy::ramp_position(5000000, 1800000) == 1.0f);
    CHECK(dimpsy::ramp_position(0, 0) == 1.0f);
}

void test_duty() {
    CHECK(dimpsy::duty(0.0f, 12) == 0);
    CHECK(dimpsy::duty(1.0f, 12) == 4095);
    CHECK(dimpsy::duty(1.0f, 16) == 65535);
    CHECK(dimpsy::duty(2.0f, 8) == 255);
    CHECK(dimpsy::duty(-1.0f, 8) == 0);
    CHECK(dimpsy::duty(0.5f, 8) == 128);
    CHECK(dimpsy::duty(1.0f, 32) == UINT32_MAX);
}

}  // namespace

int main() {
    test_clamp();
    test_end_points();
    test_known_values();
    test_monotonic();
    test_ramp_position();
    test_duty();
    if (failures != 0) {
        std::printf("%d check(s) failed\n", failures);
        return 1;
    }
    std::printf("All brightness tests passed\n");
    return 0;
}
