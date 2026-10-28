# Info Tab

A **Info** tab is available in the sidebar.

## What it shows

- Firmware name and version (when connected)
- Machine size (width × height)
- PWM Max / Min S values
- Beam diameter
- Connection tips for GRBL diode lasers
- Reminder that travel optimization runs automatically after Generate

## Location

Sidebar → **Info** (info-circle icon), between Settings and About.

## Files

- `src/components/info.jsx`
- `src/components/laserweb.jsx`

The tab reads from the current settings and connection state.
