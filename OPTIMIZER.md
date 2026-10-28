# G-code Travel Optimizer

## What it does

After G-code is generated, OpenLaser automatically:
1. Merges consecutive G0 rapid moves
2. Applies a lightweight nearest-neighbor reordering on short groups of G0 moves

This reduces unnecessary travel without heavy memory use.

## Files

- `src/lib/gcode-optimizer.js`
- Called from `src/components/gcode.jsx` after generation

## Notes

- Only reorders short G0 groups (< 20 lines) for safety and low RAM
- Does not change cutting paths (G1)
- Runs on the stable Webpack version

See IMPROVEMENTS.md for related engraving and large-raster tips.
