# Running Smoothly on Low-RAM PCs

OpenLaser can be used on modest hardware. These settings help it stay responsive.

## Recommended settings

- **G-code Concurrency**: 1 (default is now 1)
  - Found in Settings. Higher values use more memory and CPU.
- **Raster resolution**: Keep DPI reasonable (300 is usually enough).
- Close other browser tabs while generating large jobs.

## What was changed

- Default `gcodeConcurrency` lowered from 2 to **1** so generation uses less memory.
- Travel optimizer reports progress and processes line-by-line (avoids extra large intermediate structures).

## Tips

- Use the static build (`npm run bundle-dev` + a simple server) instead of webpack-dev-server when possible — it uses less memory.
- Generate one operation at a time for very large rasters.
- If the browser becomes sluggish, reduce image size or DPI before generating.

See also BUILD_SIMPLE.md and ACCURACY.md.
