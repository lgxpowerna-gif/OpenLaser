# PWM / S-Value Scaling

OpenLaser (like LaserWeb4) uses a **PWM Max S Value** setting that must match the controller's `$30` value.

## Recommended defaults

| Firmware / Board       | Typical `$30` | OpenLaser PWM Max S Value |
|------------------------|---------------|---------------------------|
| GRBL 1.1 (most diodes) | 1000          | **1000**                  |
| GRBL-ESP32             | 1000          | **1000**                  |
| Smoothieware           | 1.0           | 1.0                       |
| Some older GRBL        | 255           | 255                       |

## How to set it

1. In the machine terminal, run `$30` and note the value.
2. In OpenLaser: **Settings → Machine → PWM Max S Value** → set it to the same number.
3. Default in OpenLaser is now **1000** (was 1).

## Why it matters

If the values do not match, the same power percentage produces different laser output compared to LightBurn, LaserGRBL, or other tools. Matching `$30` and the PWM Max S Value makes the behavior consistent.

## Related settings

- `PWM Min S Value` — usually 0
- Startup G-code should include `M4 S0` for dynamic power mode on GRBL
- Laser mode must be enabled on the controller: `$32=1`

See also CONNECTION.md.
