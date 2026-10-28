# Build Notes

## Preferred: Embedded Webpack path

Use the original Webpack setup. It is self-contained and already works.

```sh
npm install --legacy-peer-deps --ignore-scripts
npm start
# or the simpler static build
npm run bundle-dev
npx serve dist
```

No external bundler (Vite, etc.) is required.

## Vite (experimental only)

A Vite config exists for testing, but it is not the recommended path.
Workers still use Webpack's `worker-loader!` syntax, which is embedded in the current stack.

If you want a fully embedded modern build later, the workers would need to be rewritten without external loader plugins. For now, stick with Webpack.

See BUILD.md and BUILD_SIMPLE.md.
