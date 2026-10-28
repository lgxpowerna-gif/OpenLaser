# Recent Improvements

## Stronger Travel Optimizer

`src/lib/gcode-optimizer.js` now:
- Merges consecutive G0 moves
- Applies a lightweight nearest-neighbor reordering on short G0 groups
- Stays memory-conscious (chunked processing)

Runs automatically after Generate.

## Unidirectional Raster

New **Unidirectional** toggle on Laser Raster operations.
When enabled, the laser only fires in one direction (return moves are rapid with laser off). Useful for machines with timing or backlash issues.

## Large Raster Tips (memory & freeze avoidance)

For big images or high resolution:
- Keep **G-code concurrency = 1** (default)
- Enable **Trim Pixels**, **Join Pixels**, and **Burn White**
- Reduce **Shades of Gray** (e.g. 8 or 16)
- Increase **Laser Diameter** slightly (e.g. 0.2–0.3 mm)
- Prefer smaller source images when possible

These reduce G-code size and generation memory use.

## Already in place

- Connection timeout + auto-retry
- PWM default 1000
- Material & engraving quality presets
- Power Adjust field
- Clearer errors and Info tab
- Default startup G-code includes M4 S0

See also OPTIMIZER.md, ENGRAVING.md, RELIABILITY.md.
