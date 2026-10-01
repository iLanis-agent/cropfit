# CropFit

Photo pixels in, print crop and sharpness out.

The print keeps the photo's orientation; its shape is fitted inside the photo and the excess edge is cropped (centered). Effective dpi = pixels kept across / print inches across.
Tests: 35 checks. Published 300 dpi pixel counts: 8x10 = 2400 x 3000 (7.2 MP), 4x6 = 1200 x 1800, 5x7 = 1500 x 2100, 11x14 = 3300 x 4200, 16x20 = 4800 x 6000 (e.g. https://pixelsforprint.com/tools/photo-size-print-dimensions-converter/, https://photographyicon.com/print-size-calculator/). Crop shares are exact geometry: 3:2 to 8x10 crops 1/6 (16.7%), to 5x7 crops 1/15 (6.7%), to 4x6 crops 0.
Quality words (300+ Excellent, 200+ Good, 150+ Acceptable, below Soft) are rough guidance for up-close viewing, not a standard; large prints are viewed from farther away.

Static client-side. `node test-engine.js` runs the tests.
