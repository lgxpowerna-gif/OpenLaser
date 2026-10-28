# OpenLaser Modern Scaffold

Parallel React 18 + Vite starting point.
The original Webpack version in the repo root remains the stable path for production use.

## Run the modern scaffold

```sh
cd modern
npm install
npm run dev
```

Opens at http://localhost:5173.

## Status

- React 18 + Vite configured
- Minimal App component
- No CAM or connection logic ported yet

## Migration plan

1. Port connection status and firmware display
2. Port G-code generation (reuse existing logic where possible)
3. Port the main workspace UI
4. Replace workers with native Vite workers
5. Switch only after the modern path passes the same tests as the Webpack version

See the root README and BUILD.md for the current stable version.
