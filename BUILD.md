# Building OpenLaser on Node 18+

The original stack is old. These notes help get a working build on modern Node.

## Quick start (Node 18 / 20) — tested working

```sh
git clone https://github.com/lgxpowerna-gif/OpenLaser.git
cd OpenLaser
npm install --legacy-peer-deps --ignore-scripts
npm start
```

`--ignore-scripts` skips native module rebuilds that often fail on modern Node (serialport, etc.). The frontend will still start.

A `.npmrc` with `legacy-peer-deps=true` is included.

## If you need the backend (serial port)

Native modules require build tools:

```sh
# Ubuntu/Debian
sudo apt-get install build-essential python3

# Then reinstall without --ignore-scripts
npm install --legacy-peer-deps
```

## Known issues

- Webpack 2 and webpack-dev-server 2.x produce many deprecation warnings (expected).
- Some Babel 6 plugins are obsolete but still functional.
- If `webpack-dev-server` fails to open a browser (headless), that is normal. The app is still available at http://localhost:8080.

## Backend

The forked `lw.comm-server` (longer firmware timeouts) is used via the `package.json` git dependency.

## Recommended install sequence

```sh
git clone https://github.com/lgxpowerna-gif/OpenLaser.git
cd OpenLaser
npm install --legacy-peer-deps --ignore-scripts
npm start
```

Frontend will be at http://localhost:8080.

## Next modernization steps

1. Get a clean `npm start` on Node 18 (warnings OK for now) — **done**.
2. Replace webpack-dev-server with a simpler workflow.
3. Gradually update critical dependencies.

See MODERNIZATION.md and ROADMAP.md.
