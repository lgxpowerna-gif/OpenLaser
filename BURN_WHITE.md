# Smart Burn White Cleanup

## Problem

Burn White (`G1 S0` for white areas) keeps the controller planner happy, but long runs of white make the job slower than necessary.

## Solution

After generation, OpenLaser automatically:
- Converts **long** runs of `G1 S0` into a single `G0` to the end of the white area
- Keeps **short** `G1 S0` segments so the planner does not thrash between G0/G1

Default threshold: more than 5 consecutive white moves become a rapid.

## Result

- Controller stays smoother on detailed areas
- Large empty regions are skipped quickly
- No change to the final engraving appearance

## Files

- `src/lib/gcode-optimizer.js` — `smartBurnWhiteCleanup`
- Called automatically from `src/components/cam.jsx` after travel optimization

See also IMPROVEMENTS.md.
