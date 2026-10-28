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
- [x] Rename GitHub repository to `OpenLaser`
- [x] Document current build requirements and known breakage
- [x] Add engines field and basic modern Node compatibility notes

## Phase 2 — Critical Bug Fixes
- [x] Firefox raster G-code generation recursion crash (safer iterative postProcessRaster)
- [x] Jerky motion on raster due to overly fine S-value steps (default S precision reduced from 4 to 1)
- [x] Connection / firmware detection timeouts increased in forked lw.comm-server (firmwareWaitTime 15s, grblWaitTime 3s)
- [ ] Connection auto-retry on first failure
- [ ] Inconsistent PWM / S-value scaling vs other tools
- [ ] Out-of-bounds handling and machine bounds checks
- [ ] Dependency security and build failures on modern systems

## Phase 3 — Modernization
- [x] Engines declared for Node 18+
- [x] MODERNIZATION.md added with plan
- [ ] Make current stack build cleanly on Node 18+/20+
- [ ] Replace ancient webpack-dev-server / hot reload setup
- [ ] Update or replace unmaintained submodules (lw.comm-server, raster-to-gcode, etc.)
- [ ] Improve Electron / installer story

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
