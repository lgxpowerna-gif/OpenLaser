# G-code Optimizer

Reducing unnecessary G0 travel moves improves job time and reduces wear.

## Status

- Simple travel optimizer module: `src/lib/gcode-optimizer.js`
- **Automatic**: Optimization runs automatically after every G-code generation.
- **Manual**: An “Optimize” button (magic wand) is still available in the CAM panel if you want to re-run it.
- **Real progress**: The optimizer reports actual progress (based on lines processed).

## How it works

1. Click **Generate**.
2. When generation finishes, the optimizer automatically runs on the result.
3. The progress bar shows the optimization progress.
4. The optimized G-code is stored. View or Export it as usual.

You can still click the Optimize button later if you load external G-code or want to re-optimize.

## Implementation notes

`optimizeGcodeTravel(gcode, onProgress)` is called from the generation completion callback in `src/components/cam.js`.

See also MACHINES.md for recommended L1/L2 settings.
