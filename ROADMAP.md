# OpenLaser Roadmap

Continuation of LaserWeb4 under the name **OpenLaser**.

## Goals
- Fix long-standing bugs and inconsistencies
- Modernize the tech stack so it builds and runs on current Node/browsers
- Improve reliability for common diode lasers (GRBL, Sculpfun, etc.)
- Add useful missing features from the original wishlist

## Phase 1 — Stabilization & Branding
- [x] Fork and rebrand content to OpenLaser
- [x] Update package.json name/description
- [x] Update About page and page title
- [ ] Rename GitHub repository to `OpenLaser` (user action in Settings)
- [x] Document current build requirements and known breakage
- [x] Add engines field and basic modern Node compatibility notes

## Phase 2 — Critical Bug Fixes
- [x] Firefox raster G-code generation recursion crash (safer iterative postProcessRaster)
- [ ] Connection / firmware detection failures (GRBL-ESP32, some Sculpfun boards)
- [ ] Jerky motion on raster due to overly fine S-value steps
- [ ] Inconsistent PWM / S-value scaling vs other tools
- [ ] Out-of-bounds handling and machine bounds checks
- [ ] Dependency security and build failures on modern systems

## Phase 3 — Modernization
- Move from React 15 + Webpack 2 + Babel 6 to current React (or keep stable and upgrade tooling first)
- Replace ancient webpack-dev-server / hot reload setup
- Node 18+ / 20+ support (engines already declared)
- Update or replace unmaintained submodules (lw.comm-server, raster-to-gcode, etc.)
- Improve Electron / installer story

## Phase 4 — Features
- G-code optimizer (reduce unnecessary G0 moves)
- Better raster → vector options
- Improved material database and profiles
- Webcam / alignment helpers
- More firmware profiles and auto-detection
- Better progress and error reporting

## Contribution
Pull requests welcome. Start with small, testable fixes. Preserve AGPL-3.0 and original copyright notices.

Original project: https://github.com/LaserWeb/LaserWeb4
