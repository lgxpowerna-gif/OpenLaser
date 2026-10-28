# Reliability Checklist

Use this before important jobs to get consistent, professional results.

## Before connecting

- [ ] Controller is powered and USB/serial cable is secure
- [ ] Laser mode enabled: `$32=1`
- [ ] PWM max matches OpenLaser: `$30=1000` (or your value)
- [ ] Machine size in Settings matches the physical work area

## In OpenLaser

- [ ] Profile: **Generic GRBL** (for most diode lasers)
- [ ] PWM Max S Value = controller `$30`
- [ ] Startup G-code ends with `M4 S0`
- [ ] Generate G-code and confirm the automatic travel optimization ran
- [ ] Review the progress bar reaches 100% with no errors

## Connection reliability

- Firmware detection uses a longer timeout (15 s) in the forked `lw.comm-server`
- Frontend automatically retries once if the first detection fails
- If connection still fails, disconnect and reconnect once

## Low-RAM / modest PCs

- G-code Concurrency is set to 1 by default
- Prefer the static build (`npm run bundle-dev`) over the dev server for long sessions

## After the job

- Note any unexpected stops or power differences
- Adjust feed/power in small steps rather than large jumps

See also MACHINES.md, PWM.md, CONNECTION.md, and ACCURACY.md.
