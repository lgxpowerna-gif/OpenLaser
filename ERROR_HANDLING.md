# Error Handling

## What was added

- **Travel optimizer** is wrapped in try/catch.
  - If optimization fails, the original G-code is kept and an error is logged.
  - Message: “Travel optimization failed — using original G-code.”

- **Server error** messages now include a short recovery hint.

- **ALARM** messages already include resume guidance.

## Behavior

- Failures in post-processing no longer crash the generation flow.
- Connection and generation errors show actionable text in Command History.

## Files

- `src/lib/gcode-optimizer.js` — internal try/catch
- `src/components/cam.jsx` — optimizer call wrapped
- `src/components/com.jsx` — clearer server error text

See also ERRORS.md and RESUME.md.
