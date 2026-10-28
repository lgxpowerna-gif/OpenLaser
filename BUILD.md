# Building OpenLaser on Node 18+

The original stack is old. These notes help get a working build on modern Node.

## Quick start (Node 18+)

```sh
git clone https://github.com/lgxpowerna-gif/OpenLaser.git
cd OpenLaser
npm run installdev
npm start
```

## Known issues on Node 18 / 20

- Webpack 2 and webpack-dev-server 2.x produce many deprecation warnings.
- Some Babel 6 plugins may need `--legacy-peer-deps` or an older npm.
- `npm install` may fail on certain git dependencies; try:
  ```sh
  npm install --legacy-peer-deps
  ```
- If `webpack-dev-server` fails to start, you can still run:
  ```sh
npm run bundle-dev
  ```
  then serve the `dist` folder with any static server.

## Backend

The forked `lw.comm-server` is used (longer timeouts). Install it via the package.json git dependency.

## Next modernization steps

1. Get a clean `npm start` on Node 18 (warnings OK for now).
2. Replace webpack-dev-server with a simpler workflow.
3. Gradually update critical dependencies.

See MODERNIZATION.md and ROADMAP.md.
