# Vite Configuration (Experimental)

## Current status

Vite starts cleanly and serves the main entry and key components (HTTP 200 on root, index.jsx, laserweb.jsx, cam.jsx, workspace.jsx, com.jsx, operation.jsx).

Most component files containing JSX have been renamed from `.js` to `.jsx`, and explicit imports were updated.

## Next known blocker: Web Workers

The CAM pipeline uses Webpack-specific syntax:

```js
require('worker-loader!./workers/cam-preflight.js')
require('worker-loader!./workers/cam-lasercut.js')
require('worker-loader!./workers/cam-mill.js')
require('worker-loader!./workers/cam-lathe.js')
require('worker-loader!./workers/cam-raster.js')
```

Vite does not understand `worker-loader!`. These need to be converted to Vite's native worker imports (e.g. `new Worker(new URL('./workers/cam-preflight.js', import.meta.url))` or the `?worker` suffix).

Until that is done, G-code generation that relies on those workers will fail under Vite.

## How to run

```sh
npm install --save-dev vite @vitejs/plugin-react
npx vite --config vite.config.mjs
```

## Fallback

The original Webpack setup still works:

```sh
npm install --legacy-peer-deps --ignore-scripts
npm start
# or
npm run bundle-dev
```

See also BUILD.md.
