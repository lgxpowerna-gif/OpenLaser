# Simpler Build Setup

The original `webpack-dev-server` 2.x is fragile on modern Node. Use a static build instead when possible.

## Recommended (most reliable)

```sh
npm install --legacy-peer-deps --ignore-scripts
npm run bundle-dev
npx serve dist
```

Or any static server:

```sh
python3 -m http.server 8080 --directory dist
```

Then open http://localhost:8080.

## Why this is better

- No webpack-dev-server process to crash
- Works in headless environments
- Same output as the original production bundle
- Easier to deploy later (copy `dist/` anywhere)

## When you still want hot reload

```sh
npm start
```

Expect deprecation warnings. If it fails, fall back to the static method above.

See also BUILD.md.
