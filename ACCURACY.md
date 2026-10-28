# Accuracy & Consistency

OpenLaser is aimed at both amateurs and professionals. These defaults and behaviors improve consistent results.

## Recommended defaults (already applied)

- **PWM Max S Value**: 1000 (matches typical GRBL `$30`)
- **Firmware detection**: longer timeout + one automatic retry
- **Travel optimization**: runs automatically after every G-code generation
- **Machine bounds warning**: software check before generation (no hardware sensors required)

## For consistent results

1. Set machine size correctly in Settings (width × height in mm).
2. Use **Generic GRBL** profile for most diode lasers.
3. Match PWM Max S Value to the controller `$30`.
4. Enable laser mode on the controller: `$32=1`.
5. Startup G-code should end with `M4 S0`.

## What is automatic

- Travel move optimization after Generate
- Connection retry on first firmware detection failure
- Bounds warning if document origin is outside machine size

See MACHINES.md, PWM.md, and CONNECTION.md.
