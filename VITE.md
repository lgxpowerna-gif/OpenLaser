# Vite Configuration (Experimental)

A modern bundler option alongside the original Webpack 2 setup.

## Install Vite

```sh
npm install --save-dev vite
```

## Run with Vite

```sh
npx vite
```

Or add scripts to package.json:

```json
"dev:vite": "vite",
"build:vite": "vite build"
```

Then:

```sh
npm run dev:vite
```

## Notes

- This is an **experimental** parallel setup. The original Webpack scripts (`npm start`, `npm run bundle-dev`) still work.
- Vite expects an `index.html` at the project root (added).
- The existing React 15 code may need small adjustments (JSX, workers, CSS imports) before Vite fully replaces Webpack.
- Start here if you want fewer deprecation warnings and faster rebuilds.

See also BUILD.md and MODERNIZATION.md.
