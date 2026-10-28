# Root Causes & Fixes

## Large raster freezes / high memory

**Root cause:** The raster engine creates one point per beam-diameter step. A 200×200 mm image at 0.2 mm produces ~1 million points and can exhaust memory.

**Mitigations already in place:**
- G-code concurrency defaults to 1
- S precision reduced to 1 (less jerky motion)
- Error handling around generation
- Documented tips: enable Trim Pixels, Join Pixels, Burn White; increase beam diameter; reduce shades

**User action for big images:**
- Set Laser Diameter to 0.2–0.3 mm
- Enable Trim / Join / Burn White
- Lower Shades of Gray to 8 or 16

## Connection failures (ESP32 / Sculpfun)

**Root cause:** Firmware does not always send a welcome string quickly after reset.

**Fix applied:** Longer timeouts in forked `lw.comm-server` + frontend auto-retry.

## Jerky raster motion

**Root cause:** Too-fine S-value steps (precision 4).

**Fix applied:** Default S precision reduced to 1.

## PWM / power inconsistency

**Root cause:** Default Max S was 1; most GRBL uses `$30=1000`.

**Fix applied:** Default PWM Max S Value = 1000. Startup G-code includes `M4 S0`.

## Firefox recursion crash

**Root cause:** Recursive postProcessRaster with XRegExp.

**Fix applied:** Safer iterative handling (documented).

See IMPROVEMENTS.md, RELIABILITY.md, and ERROR_HANDLING.md.
