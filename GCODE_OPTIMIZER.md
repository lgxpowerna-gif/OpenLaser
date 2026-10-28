# G-code Optimizer

Reducing unnecessary G0 travel moves improves job time and reduces wear.

## Status

- Simple travel optimizer module: `src/lib/gcode-optimizer.js`
- **UI integration**: An “Optimize” button (magic wand icon) is in the CAM panel GCODE toolbar.
- **Real progress**: The optimizer reports actual progress (based on lines processed) and the UI progress bar updates accordingly.

## How to use

1. Generate G-code as usual.
2. Click the **Optimize** button (magic wand).
3. The progress bar advances based on real work (lines processed).
4. Optimized G-code replaces the original. View or Export it.

## Implementation notes

`optimizeGcodeTravel(gcode, onProgress)` calls `onProgress(percent)` as it walks the lines. The UI handler wires this to the existing `generatingGcode` progress state.

See also MACHINES.md for recommended L1/L2 settings.
