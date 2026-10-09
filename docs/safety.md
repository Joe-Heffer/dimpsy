<!--
SPDX-FileCopyrightText: 2026 Joe Heffer

SPDX-License-Identifier: CC-BY-4.0
-->

# Safety

Dimpsy sits next to a bed and may run overnight, so it has to be safe to leave alone. This page sets out the precautions for anyone building or working on it, and what to keep an eye on to catch problems early. The reasoning behind the power rules is in [decision 0003](decisions/0003-usb-c-power-only.md).

!!! danger "USB-C power only"
    Dimpsy is powered by USB-C only. It must never be connected to mains voltage (the 230 V supply from a wall socket), and no part of the design should be adapted to run from mains.

## Precautions

### Electricity

* **Keep mains out of the build.** The IKEA Fado is sold as a mains lamp. Remove its bulb holder and original flex (the mains cable) before fitting any LEDs, and never reconnect them to the modified lamp. Keep the removed parts so the lamp can be restored to its original state.
* **Do not wire anything to mains by hand.** If a mains device ever needs switching, use a ready-made smart plug or smart bulb that carries the UKCA or CE mark, and control it over the network. No homemade circuit should sit on mains voltage.
* **Use a certified supply.** Buy USB-C chargers from a reputable seller, with the UKCA or CE mark. Cheap unbranded adapters are a common cause of electrical fires.
* **Leave headroom on the supply.** Choose a supply rated at least 1.25 times the greatest current the LEDs can draw. The current in amps is the strip’s power in watts divided by its voltage.
* **Fuse the supply input.** Fit an inline fuse (about 3 A) where the supply enters the lamp, and use wire rated for more than the fuse current, so a short circuit blows the fuse before a wire overheats.
* **Keep strip current off the breadboard.** Run the LED current from a screw terminal straight to the lamp, as described in the [prototype notes](prototype.md). Breadboard contacts are not made for several amps.
* **Use a separate connector for each LED candidate,** so the wrong supply cannot be plugged in.

### Heat and fire

* **Leave air round anything that gets warm.** LEDs, the transistors that switch them (MOSFETs) and power supplies all give off heat. Mount the strip and MOSFETs on something that sheds heat, such as the aluminium core tube.
* **Keep warm parts away from things that burn.** Nothing hot should touch paper, fabric, foam board or the inside of the glass globe.
* **Keep the lamp and its cable clear of bedding and curtains.**
* **Cap the brightness in the firmware.** Set a maximum level so the LEDs cannot draw more than the supply and wiring are rated for.

### Light

* **No flashing.** Never use rapid flashing or strobe effects. Flashing light can trigger seizures in people with photosensitive epilepsy, and the [design principles](design-principles.md) rule it out for sensory reasons as well.
* **No flicker.** Keep dimming flicker-free, including at the lowest levels of a dawn ramp.
* **Change brightness slowly.** Ramp the light up and down with smooth fades, never with sudden jumps to full brightness.

### Firmware failures

* **Start safe.** After a power cut, a crash or a restart, the lamp should come back off or dim. It must never come back at full brightness in the middle of the night.
* **Use a watchdog.** A watchdog is a timer that restarts the chip if the firmware freezes. Combined with a safe start, it stops a crash leaving the lamp stuck on.
* **Limit time at full brightness.** Turn the lamp down after it has been at full output for a set time.
* **Do not rely on the lamp as your only alarm** until it has run reliably for a few weeks.

### Physical

* **Secure the lamp.** The Fado’s globe is glass. Make sure the base is stable and the lamp cannot be knocked off a bedside table. Handle the globe with care when fitting parts inside it.
* **Route the cable safely.** Keep the cable where it cannot be tripped over or pulled, and stop it tugging on the joints inside the lamp, for example with a cable tie or clamp where it enters.

## What to monitor

### Heat

* After an hour at full brightness, check the supply, the LED core, the MOSFETs and every wiring joint. Nothing should be above about 50 to 60 °C. As a rough check, if a part is too hot to keep a finger on, switch off and find out why.
* Repeat the check after any change to the LEDs, the supply, the wiring or the maximum brightness.

### Warning signs

Switch off and unplug at once if you notice any of these:

* a burning or hot plastic smell
* discoloured, softened or melted wire insulation or connectors
* buzzing, crackling or whining
* flickering or flashing that the firmware was not told to do
* a supply or cable that is hotter than usual

### Power draw

* Measure the current the lamp draws at full brightness, for example with a USB-C power meter (an inexpensive inline display between the charger and the cable). Check that it stays inside the supply’s rating and below the fuse rating.

### Connections

* Check the joints and wires in the control panel from time to time. Knobs, sliders and switches move, and the wires behind them flex and can work loose or break.
* Check that screw terminals are still tight, especially after the lamp has been moved.

### Running unattended

* Unplug early prototypes overnight and when nobody is at home.
* Only leave a build running overnight once it has passed the heat check and run without problems for several supervised sessions.
