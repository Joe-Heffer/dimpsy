# SPDX-FileCopyrightText: 2026 Joe Heffer
#
# SPDX-License-Identifier: GPL-3.0-or-later

# Native builds of the firmware core, for tests and tools.
#
#   make test     build and run the unit tests
#   make summary  print the curve charts as Markdown
#   make csv      print the curves as CSV

CXX ?= g++
CXXFLAGS ?= -std=c++17 -O2 -Wall -Wextra -Wpedantic -Wshadow -Werror

BUILD := build

.PHONY: test summary csv clean

test: $(BUILD)/test_brightness
	./$(BUILD)/test_brightness

summary: $(BUILD)/curves
	@./$(BUILD)/curves

csv: $(BUILD)/curves
	@./$(BUILD)/curves --csv

$(BUILD)/test_brightness: test/test_brightness.cpp brightness.h | $(BUILD)
	$(CXX) $(CXXFLAGS) -o $@ $<

$(BUILD)/curves: tools/curves.cpp brightness.h | $(BUILD)
	$(CXX) $(CXXFLAGS) -o $@ $<

$(BUILD):
	mkdir -p $@

clean:
	rm -rf $(BUILD)
