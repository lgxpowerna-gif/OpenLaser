# Recommended Settings for L1 and L2

Use these settings on both laser machines for best compatibility with OpenLaser.

## Controller settings (run in terminal or via OpenLaser)

```
$32=1          ; Laser mode
$30=1000       ; PWM max (match OpenLaser PWM Max S Value)
$31=0          ; PWM min
```

## OpenLaser settings

- Machine profile: **Generic GRBL**
- PWM Max S Value: **1000**
- PWM Min S Value: **0**
- Startup G-code should end with: `M4 S0`

## Connection

- Use the forked `lw.comm-server` (already configured in package.json)
- Longer firmware detection timeout is applied
- Frontend will auto-retry once on first detection failure

## Install on a machine

```sh
git clone https://github.com/lgxpowerna-gif/OpenLaser.git
cd OpenLaser
npm install --legacy-peer-deps --ignore-scripts
npm run bundle-dev
npx serve dist
```

Or use `npm start` if you prefer the dev server.

See also CONNECTION.md, PWM.md, and BUILD_SIMPLE.md.
