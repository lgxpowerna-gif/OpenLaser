# G-code Optimizer

Reducing unnecessary G0 travel moves improves job time and reduces wear.

## Status

- Simple travel optimizer module: `src/lib/gcode-optimizer.js`
- **UI integration prepared**: An “Optimize” button (magic wand icon) is added next to the Export button in the CAM panel.
  - It runs `optimizeGcodeTravel()` on the current G-code and replaces it in the store.
  - Safe, non-destructive (only merges consecutive G0 moves).

## How to use

1. Generate G-code as usual.
2. Click the **Optimize** button (magic wand) in the GCODE toolbar.
3. The G-code is updated in place. You can then View or Export it.

## Notes

The button is wired in `src/components/cam.js`. If the button does not appear after a pull, the local working copy contains the full change.

See also MACHINES.md for recommended L1/L2 settings.
