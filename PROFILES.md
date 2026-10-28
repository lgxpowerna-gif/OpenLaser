# Firmware & Material Profiles

## Firmware profiles

OpenLaser uses machine profiles from the `lw.machines` data (submodule).

### Recommended for most diode lasers

- **Generic GRBL**
- PWM Max S Value = 1000 (matches typical `$30`)
- `$32=1` (laser mode)
- Startup G-code ending with `M4 S0`

### ESP32 / Sculpfun notes

- Use Generic GRBL
- Longer firmware detection timeout is already applied in the forked `lw.comm-server`
- Frontend auto-retry is present

## Material database

Materials live in the `lw.materials` data (submodule).

### Practical improvements

- Add common diode-laser materials (plywood, acrylic, cardboard, leather)
- Include suggested power % and speed for 5–10 W diodes
- Keep profiles simple so they work across different machines

## Status

Guidance documented. Profile data can be extended via the submodules or local overrides.

See also PWM.md and CONNECTION.md.
