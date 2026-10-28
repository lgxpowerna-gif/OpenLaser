# G-code Optimizer Notes

Reducing unnecessary G0 travel moves improves job time and reduces wear.

## Current state

LaserWeb4 / OpenLaser already does some path ordering in the CAM layer (`src/lib/cam.js` — path merging). It is not a full optimizer.

## Practical improvements (future)

- Sort closed paths by nearest-neighbor before cutting
- Prefer staying inside already-cut areas when possible
- Optional “optimize travel” checkbox in the UI
- Post-process G-code to merge consecutive G0 moves in the same direction

## Low-risk next step

Add a simple post-processor that:
1. Parses the final G-code
2. Merges consecutive G0 lines that share the same axis
3. Removes zero-length moves

This can be done without touching the CAM core.

## Status

Documented. Implementation planned as a small, optional post-process step.
