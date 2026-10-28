# Building OpenLaser on Node 18+

**Primary path: embedded Webpack setup.** No external bundler required.

## Quick start (Node 18 / 20)

```sh
git clone https://github.com/lgxpowerna-gif/OpenLaser.git
cd OpenLaser
npm install --legacy-peer-deps --ignore-scripts
npm start
```

A `.npmrc` with `legacy-peer-deps=true` is included.

## Simpler static build (recommended for reliability)

```sh
npm run bundle-dev
npx serve dist
```

## Known notes

- Webpack 2 shows deprecation warnings on modern Node (harmless).
- Native serial modules may need build tools if you want full backend serial support.
- The Vite config is experimental only. Stick with Webpack for daily use.

## Backend

Uses the forked `lw.comm-server` with longer firmware timeouts.

See BUILD_SIMPLE.md, RELIABILITY.md, and MATERIALS.md.
