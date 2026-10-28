# Vite Configuration (Experimental)

## Current status

Most component files that contain JSX have been renamed from `.js` to `.jsx`. Vite starts and serves the app.

### Key renames
- Entry: `src/index.jsx`
- Main components: `laserweb.jsx`, `cam.jsx`, `workspace.jsx`, `com.jsx`, `jog.jsx`, `operation.jsx`, `forms.jsx`, `font-awesome.jsx`, and others
- Explicit imports updated where they used `.js` extensions

## How to run

```sh
npm install --save-dev vite @vitejs/plugin-react
npx vite --config vite.config.mjs
```

## Remaining work

A few library files under `src/lib/` may still contain JSX-like syntax and need attention if Vite reports them. The original Webpack setup remains available as a fallback.

## Notes

- Syntax error in `cam.jsx` (stray brace) was fixed.
- Import paths that hard-coded `.js` were updated to `.jsx` for renamed files.

See also BUILD.md.
