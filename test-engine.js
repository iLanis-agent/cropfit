var E = require('./engine.js'), n = 0, bad = 0;
function eq(a, b, m, t) { n++; if (!(Math.abs(a - b) <= (t == null ? 1e-9 : t))) { bad++; console.log('FAIL', m, a, b); } }
function is(a, b, m) { n++; if (a !== b) { bad++; console.log('FAIL', m, a, b); } }
// 300 dpi pixel counts published by print-size guides: 8x10 = 2400 x 3000, 4x6 = 1200 x 1800, 5x7 = 1500 x 2100, 11x14 = 3300 x 4200, 16x20 = 4800 x 6000
is(JSON.stringify(E.pixelsNeeded([10, 8], 300)), '[3000,2400]', '8x10'); is(JSON.stringify(E.pixelsNeeded([6, 4], 300)), '[1800,1200]', '4x6'); is(JSON.stringify(E.pixelsNeeded([7, 5], 300)), '[2100,1500]', '5x7');
is(JSON.stringify(E.pixelsNeeded([14, 11], 300)), '[4200,3300]', '11x14'); is(JSON.stringify(E.pixelsNeeded([20, 16], 300)), '[6000,4800]', '16x20');
eq(E.megapixels(3000, 2400), 7.2, '8x10 = 7.2 MP'); eq(E.megapixels(1800, 1200), 2.16, '4x6 MP');
// A 3:2 photo (6000x4000) fits 4x6 exactly: no crop, 1000 dpi
var a = E.fit(6000, 4000, E.SIZES['4x6']); is(a.cut, 'none', '4x6 no cut'); eq(a.cropShare, 0, '4x6 crop 0', 1e-9); eq(a.dpi, 1000, '4x6 dpi', 1e-9);
// 3:2 to 8x10 (5:4) crops the sides: keeps 5000 of 6000 px, loses 1/6, 500 dpi
var b = E.fit(6000, 4000, E.SIZES['8x10']); is(b.cut, 'sides', '8x10 sides'); eq(b.keptW, 5000, '8x10 keptW', 1e-6); eq(b.keptH, 4000, 'keptH'); eq(b.cropShare, 1 / 6, '8x10 crop 16.7%', 1e-9); eq(b.dpi, 500, '8x10 dpi', 1e-9);
// 3:2 to 5x7 (7:5) keeps 5600 px, loses 400 (6.7%)
var c = E.fit(6000, 4000, E.SIZES['5x7']); eq(c.keptW, 5600, '5x7 keptW', 1e-6); eq(c.cropShare, 1 / 15, '5x7 crop', 1e-9);
// portrait photo gets a portrait print
var d = E.fit(4000, 6000, E.SIZES['8x10']); eq(d.printW, 8, 'portrait pw'); eq(d.printH, 10, 'portrait ph'); is(d.cut, 'top and bottom', 'portrait cut'); eq(d.keptH, 5000, 'portrait keptH', 1e-6);
// 4:3 phone-style 1600x1200 into 8x10: keeps 1500 px wide, 150 dpi
var e = E.fit(1600, 1200, E.SIZES['8x10']); eq(e.keptW, 1500, '4:3 keptW', 1e-6); eq(e.dpi, 150, '4:3 dpi', 1e-9);
// wider-than-print shape crops top and bottom: square 3000x3000 into 4x6 landscape
var f = E.fit(3000, 3000, E.SIZES['4x6']); is(f.cut, 'top and bottom', 'square'); eq(f.keptH, 2000, 'square keptH', 1e-6); eq(f.dpi, 500, 'square dpi');
// dpi bands
is(E.quality(300), 'Excellent', 'q300'); is(E.quality(299.9), 'Good', 'q299'); is(E.quality(200), 'Good', 'q200'); is(E.quality(150).indexOf('Acceptable'), 0, 'q150'); is(E.quality(149).indexOf('Soft'), 0, 'q149');
// max print: 6000x4000 at 300 dpi to 3:2 = 20 in long side; to 5:4 = 16.67 in
eq(E.maxPrintLong(6000, 4000, 1.5, 300), 20, 'max 3:2'); eq(E.maxPrintLong(6000, 4000, 1.25, 300), 5000 / 300, 'max 5:4', 1e-9); eq(E.maxPrintLong(4000, 6000, 1.5, 300), 20, 'max portrait');
// A4 shape is about 1.414
var g = E.fit(4200, 2970, E.SIZES['A4']); eq(g.cropShare, 0, 'A4 nearly exact', 0.001);
console.log((n - bad) + '/' + n + ' passed'); process.exit(bad ? 1 : 0);
