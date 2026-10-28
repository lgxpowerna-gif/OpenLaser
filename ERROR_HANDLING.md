# Error Handling

## What was added

- **G-code generation** (`getGcode`) is wrapped in try/catch.
  - Failures show an actionable alert instead of crashing.

- **Travel optimizer** is wrapped in try/catch.
  - On failure, the original G-code is kept and an error is logged.

- **Info tab** render is protected.
  - Shows a fallback message if rendering fails.

- **Server and ALARM** messages include recovery hints.

## Behavior

- Critical paths no longer fail silently or crash the UI.
- Errors appear in Command History with short suggestions.

## Files

- `src/lib/cam-gcode.js`
- `src/lib/gcode-optimizer.js`
- `src/components/cam.jsx`
- `src/components/com.jsx`
- `src/components/info.jsx`

See also ERRORS.md and RESUME.md.
