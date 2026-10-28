# Dependency Security Notes

OpenLaser inherits an old dependency tree (Webpack 2, Babel 6, React 15, etc.).

## Current status (Node 18/20)

- Many packages are unmaintained.
- `npm audit` reports high and critical issues (expected).
- Most are in build tooling or transitive dependencies, not in the runtime G-code path.

## Practical recommendations

1. Use the install method that works:
   ```sh
   npm install --legacy-peer-deps --ignore-scripts
   ```
2. Do **not** run `npm audit fix --force` — it will break the old stack.
3. Prefer the static build (`npm run bundle-dev`) over `webpack-dev-server`.
4. The forked `lw.comm-server` is the only dependency we actively control. Security updates there are higher priority than the frontend build tools.

## Long-term

A real modernization (new bundler, updated React, etc.) is the proper fix. Until then, treat the current frontend as a known-old codebase and keep the communications server isolated.

See ROADMAP.md Phase 3.
