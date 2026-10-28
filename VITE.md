# Vite Configuration (Experimental)

## Current status

Vite starts and serves the app after renaming key files from `.js` to `.jsx`.

### Renamed so far
- `src/index.js` → `src/index.jsx`
- `src/components/laserweb.js` → `src/components/laserweb.jsx`
- `src/components/cam.js` → `src/components/cam.jsx`
- `src/components/workspace.js` → `src/components/workspace.jsx`
- `src/components/com.js` → `src/components/com.jsx`

`index.html` points to `/src/index.jsx`.

## How to run

```sh
npm install --save-dev vite @vitejs/plugin-react
npx vite --config vite.config.mjs
```

The app is available at http://localhost:8080 (or the port Vite prints).

## Remaining work

Other component files that contain JSX may still need to be renamed from `.js` to `.jsx` as they are imported. Vite will report the next file that fails.

## Notes

- The original Webpack setup still works.
- Vite is now past the first JSX parsing error on the entry point.

See also BUILD.md.
