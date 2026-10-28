# Vite Configuration (Experimental)

## Current status

Vite starts, but the first real error is:

```
Unexpected JSX expression
File: src/index.js
Help: JSX syntax is disabled and should be enabled via the parser options
```

Vite (and its dependency scanner) does not treat `.js` files as JSX by default. The existing codebase uses JSX inside `.js` files.

## Next steps to make Vite work

1. Rename files that contain JSX from `.js` to `.jsx` (starting with `src/index.js` → `src/index.jsx` and the main components), **or**
2. Add a small Vite plugin that forces the JSX loader on `src/**/*.js` before the dependency scan runs.

## Install and run

```sh
npm install --save-dev vite @vitejs/plugin-react
npx vite --config vite.config.mjs
```

## Notes

- The original Webpack setup still works (`npm start` / `npm run bundle-dev`).
- Vite is experimental until the JSX-in-.js issue is resolved.
- A corrupted line in `src/components/cam.js` was fixed during testing.

See also BUILD.md.
