# G-code Optimizer

Travel optimization runs **automatically** after every G-code generation.

## Behavior

1. Click **Generate**.
2. When generation finishes, the optimizer runs immediately.
3. Progress is shown on the existing progress bar.
4. Optimized G-code (consecutive G0 moves merged) is stored and ready to View or Export.

No manual button is needed.

## Implementation

`optimizeGcodeTravel()` is called from the generation completion callback in `src/components/cam.js`. It reports real progress based on lines processed.

See also MACHINES.md for recommended settings.
