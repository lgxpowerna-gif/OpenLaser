# Connection & Firmware Detection

Common issues and workarounds for OpenLaser (fork of LaserWeb4).

## Backend patch applied

A forked `lw.comm-server` is now used (see package.json):
https://github.com/lgxpowerna-gif/lw.comm-server

**Changes in config.js:**
- `firmwareWaitTime` default increased from 10 → **15** seconds
- `grblWaitTime` default increased from 1 → **3** seconds
- `smoothieWaitTime` / `tinygWaitTime` increased to 2 seconds

This gives modern GRBL-ESP32 and Sculpfun boards more time to send their welcome string after reset.

## Frontend auto-retry

A simple one-time auto-retry has been added in the frontend (`src/components/com.js`):
- If the server reports "No supported firmware detected", the frontend automatically tries to connect once more after 1.5 seconds.
- This covers the common case where the first detection fails but the second succeeds.

## GRBL / Sculpfun / ESP32 boards

Many modern diode lasers fail to connect with "No supported firmware detected" or timeout.

### Typical causes
- Firmware does not send a welcome string immediately after soft-reset (Ctrl-X)
- Detection timeout too short
- Wrong machine profile (use Generic GRBL, not Smoothie)
- PWM max ($30) mismatch

### Workarounds that often work
1. In Settings → Machine: select **Generic GRBL** profile.
2. Set **PWM Max S Value** to **1000** (must match `$30` on the controller).
3. The forked backend now waits longer by default. You can still override with a `.env` file:
   ```
   FIRMWARE_WAIT_TIME=20
   GRBL_WAIT_TIME=5
   RESET_ON_CONNECT=1
   ```
4. The frontend will automatically retry once on detection failure.
5. Make sure laser mode is on: `$32=1`.
6. Startup G-code should end with `M4 S0` for dynamic power mode.

### ESP32-specific
Some GRBL-ESP32 builds do not reply to the initial firmware query the same way classic GRBL does. The longer timeout + auto-retry helps. If it still fails, the welcome string may need to be added in `server.js`.

## Planned further improvements
- Explicit ESP32 / Sculpfun profiles
- Clearer error messages in the UI

See also ROADMAP.md Phase 2.
