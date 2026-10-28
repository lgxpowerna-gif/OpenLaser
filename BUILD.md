# Building OpenLaser on Node 18+

The original stack is old. These notes help get a working build on modern Node.

## Quick start (Node 18+)

```sh
git clone https://github.com/lgxpowerna-gif/OpenLaser.git
cd OpenLaser
npm install --legacy-peer-deps
npm start
```

A `.npmrc` with `legacy-peer-deps=true` is now included so `npm install` works more reliably.

## Known issues on Node 18 / 20

- Webpack 2 and webpack-dev-server 2.x produce many deprecation warnings (expected).
- Some Babel 6 plugins are obsolete but still functional for this codebase.
- Git dependencies may occasionally fail; retry with:
  ```sh
  npm install --legacy-peer-deps
  ```
- If `webpack-dev-server` fails to start, build a static bundle instead:
  ```sh
  npm run bundle-dev
  ```
  then serve the `dist` folder with any static server (e.g. `npx serve dist`).

## Backend

The forked `lw.comm-server` (with longer firmware timeouts) is used. It is installed via the `package.json` git dependency.

## Recommended install sequence

```sh
git clone https://github.com/lgxpowerna-gif/OpenLaser.git
cd OpenLaser
npm install --legacy-peer-deps
# If submodules are needed:
# git submodule update --init --recursive
npm start
```

## Next modernization steps

1. Get a clean `npm start` on Node 18 (warnings OK for now).
2. Replace webpack-dev-server with a simpler workflow.
3. Gradually update critical dependencies.

See MODERNIZATION.md and ROADMAP.md.
