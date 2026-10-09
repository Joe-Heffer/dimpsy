// SPDX-FileCopyrightText: 2026 Joe Heffer
//
// SPDX-License-Identifier: GPL-3.0-or-later

// Perceptual brightness curves for the dimmer and the dawn and dusk ramps.
//
// The curves are the candidates in issue #16. This file does not choose one.
// It has no ESPHome or Arduino code, so the same functions run on the ESP32,
// in the native unit tests and, later, in a browser simulator.
//
// Levels are relative light output from 0 (off) to 1 (full). A position is a
// dial position or a fraction of a ramp's duration, also from 0 to 1.

#ifndef DIMPSY_BRIGHTNESS_H
#define DIMPSY_BRIGHTNESS_H

#include <cmath>
#include <cstdint>

namespace dimpsy {

enum class Curve {
    // output = (1 / range) * range^x. Each equal step multiplies the light by
    // a fixed factor. The lowest level is 1 / range, not off.
    Exponential,
    // CIE 1931 lightness, with L* = 100 * x.
    CieLightness,
    // output = x^gamma.
    Gamma,
};

struct CurveParams {
    Curve curve = Curve::CieLightness;
    // Ratio of the highest to the lowest level, for Exponential.
    float range = 10000.0f;
    // Exponent, for Gamma.
    float gamma = 2.2f;
};

inline float clamp01(float x) {
    if (!(x > 0.0f)) {  // also catches NaN
        return 0.0f;
    }
    return x < 1.0f ? x : 1.0f;
}

inline float exponential_level(float position, float range) {
    return std::pow(range, clamp01(position) - 1.0f);
}

inline float cie_lightness_level(float position) {
    const float lightness = 100.0f * clamp01(position);
    if (lightness <= 8.0f) {
        return lightness / 903.3f;
    }
    const float f = (lightness + 16.0f) / 116.0f;
    return f * f * f;
}

inline float gamma_level(float position, float gamma) {
    return std::pow(clamp01(position), gamma);
}

inline float level(const CurveParams &params, float position) {
    switch (params.curve) {
    case Curve::Exponential:
        return exponential_level(position, params.range);
    case Curve::CieLightness:
        return cie_lightness_level(position);
    case Curve::Gamma:
        return gamma_level(position, params.gamma);
    }
    return 0.0f;
}

// Fraction of a ramp completed after elapsed_ms, from 0 to 1. A ramp with no
// duration is complete at once.
inline float ramp_position(uint32_t elapsed_ms, uint32_t duration_ms) {
    if (duration_ms == 0 || elapsed_ms >= duration_ms) {
        return 1.0f;
    }
    return static_cast<float>(elapsed_ms) / static_cast<float>(duration_ms);
}

// PWM duty for a level at the given resolution, rounded to the nearest step.
inline uint32_t duty(float level, unsigned bits) {
    const uint32_t max_duty = (bits >= 32) ? UINT32_MAX : ((1u << bits) - 1u);
    const double scaled = static_cast<double>(clamp01(level)) * max_duty;
    return static_cast<uint32_t>(scaled + 0.5);
}

}  // namespace dimpsy

#endif  // DIMPSY_BRIGHTNESS_H
