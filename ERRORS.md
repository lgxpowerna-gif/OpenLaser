# Actionable Error Messages

G-code generation and connection errors now include short suggestions.

## Examples

- **Unknown operation** — “Check that the operation type is supported and enabled.”
- **Generation failed** — “Check documents, operation settings, and try again.”
- **Laser diameter must be > 0** — “Set a positive beam diameter.”
- **Cut rate must be > 0** — “Enter a positive feed rate.”
- **No serial ports** — “Check the USB cable, power, and OS recognition.”
- **Machine disconnected** — “Check the cable and power, then reconnect.”
- **ALARM** — “Check for endstops or limits, then clear the alarm.”

## Where they appear

- Command History / alert area during generation and connection
- Info tab still shows live firmware and machine specs

These messages are in `src/lib/cam-gcode.js`, `src/lib/cam-gcode-raster.js`, and `src/components/com.jsx`.
