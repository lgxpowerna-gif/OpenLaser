# Info Tab

A new **Info** tab is available in the sidebar.

## What it shows

- Firmware name and version (when connected)
- Machine size (width × height)
- PWM Max / Min S values
- Beam diameter
- Quick recommended settings for GRBL diode lasers (`$32=1`, `$30=1000`, etc.)

## Location

Sidebar → **Info** (info-circle icon), between Settings and About.

## Files

- `src/components/info.jsx` — the component
- `src/components/laserweb.jsx` — pane registration

The tab reads from the current settings and connection state.
