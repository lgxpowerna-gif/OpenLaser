# Progress Bar

The G-code progress bar is shown in the CAM panel while generating or optimizing.

## Behavior

- Appears when you click **Generate**
- Advances during generation
- Continues during automatic travel optimization (real progress based on lines processed)
- Turns green and shows “Done” at 100%
- Stop button remains available

## Implementation

`GcodeProgress` in `src/components/cam.js` uses the existing `gcoding` state. The optimizer reports real percent values into the same state.

See GCODE_OPTIMIZER.md for optimization details.
