(function (root) {
  'use strict';
  var SIZES = { '4x6': [6, 4], '5x7': [7, 5], '8x10': [10, 8], '8x12': [12, 8], '11x14': [14, 11], '16x20': [20, 16], '20x30': [30, 20], 'A4': [11.69, 8.27], 'A3': [16.54, 11.69] };
  // Print is oriented to match the photo (landscape photo -> landscape print). Sizes are [long side, short side] in inches.
  function orient(imgW, imgH, size) { var L = size[0], S = size[1]; return imgW >= imgH ? [L, S] : [S, L]; }
  // Fit the print shape inside the photo by cropping the excess dimension. Returns kept pixels, crop share, and effective dpi.
  function fit(imgW, imgH, size) {
    var p = orient(imgW, imgH, size), pw = p[0], ph = p[1], ir = imgW / imgH, pr = pw / ph, kw = imgW, kh = imgH, cut = 'none';
    if (ir > pr + 1e-9) { kw = imgH * pr; cut = 'sides'; } else if (ir < pr - 1e-9) { kh = imgW / pr; cut = 'top and bottom'; }
    return { printW: pw, printH: ph, keptW: kw, keptH: kh, cut: cut, cropShare: 1 - (kw * kh) / (imgW * imgH), dpi: kw / pw };
  }
  // Rough guideline bands for viewing a print up close; labelled as guidance, not a standard.
  function quality(dpi) { return dpi >= 300 ? 'Excellent' : dpi >= 200 ? 'Good' : dpi >= 150 ? 'Acceptable for viewing at arm length' : 'Soft: will look blurry up close'; }
  function pixelsNeeded(size, dpi) { return [Math.round(size[0] * dpi), Math.round(size[1] * dpi)]; }
  function megapixels(w, h) { return w * h / 1e6; }
  // Largest long side (inches) a photo reaches at a given dpi after cropping to a shape with the given long:short ratio
  function maxPrintLong(imgW, imgH, shapeRatio, dpi) { var long = Math.max(imgW, imgH), short = Math.min(imgW, imgH); var kl = Math.min(long, short * shapeRatio); return kl / dpi; }
  var api = { SIZES: SIZES, orient: orient, fit: fit, quality: quality, pixelsNeeded: pixelsNeeded, megapixels: megapixels, maxPrintLong: maxPrintLong };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Crop = api;
})(typeof window !== 'undefined' ? window : this);
