# OpenLaser Modernization Plan

The original LaserWeb4 stack (Webpack 2, Babel 6, React 15, Node 10-era) no longer builds cleanly on current systems.

## Goal
Make the project build and run on Node 18+ / 20+ with minimal behavior change first, then consider larger upgrades.

## Immediate steps (in progress)
- [x] Declared `"engines": { "node": ">=18.0.0" }` in package.json
- [x] Updated repository URLs after rename
- [ ] Document known build failures and workarounds
- [ ] Add a simple `npm run build:modern` script or notes for using a newer bundler later
- [ ] Test and fix critical dependency issues one by one

## Known problems on modern Node
- Webpack 2 + webpack-dev-server 2.x fail or warn heavily
- Many Babel 6 plugins are obsolete
- React 15 + react-hot-loader beta is incompatible with newer React
- Some native/git dependencies (gamepad.js, etc.) may need updates
- Submodules (lw.comm-server, lw.raster-to-gcode) also use old stacks

## Recommended path
1. **Stabilize current build** — get `npm run installdev && npm start` working on Node 18 with minimal patches (ignore warnings first).
2. **Replace webpack-dev-server** with a simpler static serve + manual rebuild, or upgrade webpack incrementally.
3. **Backend** — update or fork `lw.comm-server` for modern Node.
4. **Frontend** — once stable, evaluate React 18 migration or keep React 15 if the UI is acceptable.

## Contribution
Small, testable PRs preferred. Do not break existing G-code generation behavior while modernizing.

See also ROADMAP.md Phase 3.
