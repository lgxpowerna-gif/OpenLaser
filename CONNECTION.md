# Connection & Firmware Detection

Common issues and workarounds for OpenLaser (fork of LaserWeb4).

## GRBL / Sculpfun / ESP32 boards

Many modern diode lasers (Sculpfun S9, GRBL-ESP32, etc.) fail to connect with "No supported firmware detected" or timeout.

### Typical causes
- Firmware does not send a welcome string immediately after soft-reset (Ctrl-X)
- Detection timeout too short (default often ~10s in `lw.comm-server`)
- Wrong machine profile (use Generic GRBL, not Smoothie)
- PWM max ($30) mismatch

### Workarounds that often work
1. In Settings → Machine: select **Generic GRBL** profile.
2. Set **PWM Max S Value** to **1000** (must match `$30` on the controller).
3. Increase firmware detection time if the UI allows it, or edit `.env` in the backend (`lw.comm-server`) and raise the timeout.
4. Try connecting twice (first connection sometimes fails, second succeeds). A simple frontend retry is planned.
5. Make sure laser mode is on: `$32=1`.
6. Startup G-code should end with `M4 S0` for dynamic power mode.

### ESP32-specific
Some GRBL-ESP32 builds do not reply to the initial firmware query the same way classic GRBL does. Longer timeout or a manual reconnect usually resolves it.

## Planned code improvements
- Longer default detection timeout in `lw.comm-server`
- Simple auto-retry on first connection failure (frontend or backend)
- Explicit ESP32 / Sculpfun profiles
- Clearer error messages in the UI

## Backend location
The actual serial/firmware detection lives in the `lw.comm-server` submodule (not in this frontend repo). Changes there require updating or forking that package.

See also ROADMAP.md Phase 2.
