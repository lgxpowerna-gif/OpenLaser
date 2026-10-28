# G-code Optimizer

Reducing unnecessary G0 travel moves improves job time and reduces wear.

## Status

- Simple travel optimizer module: `src/lib/gcode-optimizer.js`
- **UI integration**: An “Optimize” button (magic wand icon) is in the CAM panel GCODE toolbar.
- **Progress feedback**: Clicking Optimize shows the existing G-code progress bar (10% → 60% → 100%) so you get visual confirmation even though the operation is fast.

## How to use

1. Generate G-code as usual.
2. Click the **Optimize** button (magic wand).
3. The progress bar appears briefly, then the optimized G-code replaces the original.
4. View or Export the result.

## Notes

The progress is simulated because the optimizer itself is a quick line-by-line pass. It reuses the same `generatingGcode` progress UI already used for generation.

See also MACHINES.md for recommended L1/L2 settings.
