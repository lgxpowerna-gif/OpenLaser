# Connection Reliability

## What is already in place

- Longer firmware detection timeout in the forked `lw.comm-server` (firmwareWaitTime 15 s, grblWaitTime 3 s)
- Frontend auto-retry once if the first detection fails
- Clearer error messages for no ports, disconnect, and alarms
- Improved success message: “Firmware detected: grbl … Ready for laser work.”

## Recommended steps for GRBL / ESP32 diode lasers

1. Power the board and connect the USB cable.
2. In OpenLaser, select the correct port and baud (usually 115200).
3. Click Connect.
4. If detection fails the first time, wait — it will retry once automatically.
5. Confirm the success message appears.

## Controller settings

```
$32=1
$30=1000
```

Use **Generic GRBL** profile. Startup G-code should end with `M4 S0`.

## If connection still fails

- Try a different USB cable or port.
- Confirm the board appears in the OS device list.
- Restart the backend and try again.
- Check that no other program is using the serial port.

## Backend

Forked server: https://github.com/lgxpowerna-gif/lw.comm-server

See also RELIABILITY.md and MACHINES.md.
