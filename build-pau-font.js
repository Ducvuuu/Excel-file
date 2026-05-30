'use strict';
const opentype = require('opentype.js');
const fs = require('fs');

// Convert screen coordinates (y=0 top, y=100 bottom, baseline at y=75)
// to font coordinates (y=0 baseline, y increases upward), scaled ×10 for 1000 UPM.
function sy(screen_y) { return (75 - screen_y) * 10; }
function sx(screen_x) { return screen_x * 10; }

// Add a filled rectangle to a path. x1,y1 = bottom-left, x2,y2 = top-right (font coords).
function rect(path, x1, y1, x2, y2) {
  path.moveTo(x1, y1);
  path.lineTo(x2, y1);
  path.lineTo(x2, y2);
  path.lineTo(x1, y2);
  path.close();
}

// Notdef — empty
const notdefPath = new opentype.Path();
const notdefGlyph = new opentype.Glyph({
  name: '.notdef', unicode: 0, advanceWidth: 700, path: notdefPath
});

// U+E001 — Primary closed glyph (square-bracket with foot)
const p1 = new opentype.Path();
rect(p1, sx(15), sy(23), sx(85), sy(15)); // top bar
rect(p1, sx(15), sy(68), sx(23), sy(15)); // left vertical
rect(p1, sx(15), sy(75), sx(62), sy(67)); // bottom bar
rect(p1, sx(54), sy(83), sx(62), sy(67)); // right descender foot
const g1 = new opentype.Glyph({ name: 'pau1', unicode: 0xE001, advanceWidth: 800, path: p1 });

// U+E002 — Vertical head (upside-down L)
const p2 = new opentype.Path();
rect(p2, sx(20), sy(23), sx(72), sy(15)); // horizontal head
rect(p2, sx(20), sy(75), sx(28), sy(15)); // vertical stroke
const g2 = new opentype.Glyph({ name: 'pau2', unicode: 0xE002, advanceWidth: 600, path: p2 });

// U+E003 — Diagonal connector (Z-shape)
const p3 = new opentype.Path();
rect(p3, sx(15), sy(23), sx(78), sy(15)); // top horizontal
p3.moveTo(sx(75), sy(23));               // diagonal parallelogram
p3.lineTo(sx(83), sy(23));
p3.lineTo(sx(28), sy(67));
p3.lineTo(sx(20), sy(67));
p3.close();
rect(p3, sx(15), sy(75), sx(78), sy(67)); // bottom foot
const g3 = new opentype.Glyph({ name: 'pau3', unicode: 0xE003, advanceWidth: 750, path: p3 });

// U+E004 — Three-sided box with inner tick
const p4 = new opentype.Path();
rect(p4, sx(15), sy(23), sx(82), sy(15)); // top bar
rect(p4, sx(15), sy(73), sx(23), sy(15)); // left vertical
rect(p4, sx(15), sy(73), sx(82), sy(65)); // bottom bar
rect(p4, sx(48), sy(73), sx(56), sy(55)); // inner tick
const g4 = new opentype.Glyph({ name: 'pau4', unicode: 0xE004, advanceWidth: 750, path: p4 });

// U+E005 — Tall ascender (only glyph above cap height)
const p5 = new opentype.Path();
rect(p5, sx(46), sy(75), sx(54), sy(0)); // tall vertical (reaches y=0 screen = 750 font)
rect(p5, sx(18), sy(10), sx(54), sy(0)); // left hook at top
rect(p5, sx(46), sy(75), sx(72), sy(67)); // foot going right
const g5 = new opentype.Glyph({ name: 'pau5', unicode: 0xE005, advanceWidth: 650, path: p5 });

// U+E006 — Wide base П-shape
const p6 = new opentype.Path();
rect(p6, sx(10), sy(28), sx(90), sy(20)); // top bar
rect(p6, sx(10), sy(75), sx(18), sy(20)); // left leg
rect(p6, sx(82), sy(75), sx(90), sy(20)); // right leg
rect(p6, sx(10), sy(75), sx(90), sy(67)); // base
const g6 = new opentype.Glyph({ name: 'pau6', unicode: 0xE006, advanceWidth: 850, path: p6 });

// U+E007 — Minimal horizontal comb
const p7 = new opentype.Path();
rect(p7, sx(15), sy(30), sx(85), sy(22)); // top stroke
rect(p7, sx(22), sy(55), sx(30), sy(22)); // left descender
rect(p7, sx(62), sy(55), sx(70), sy(22)); // right descender
const g7 = new opentype.Glyph({ name: 'pau7', unicode: 0xE007, advanceWidth: 750, path: p7 });

// U+E008 — Punctuation separator (two diamonds)
const p8 = new opentype.Path();
rect(p8, sx(39), sy(34), sx(51), sy(22)); // upper diamond
rect(p8, sx(39), sy(58), sx(51), sy(46)); // lower diamond
const g8 = new opentype.Glyph({ name: 'pau8', unicode: 0xE008, advanceWidth: 400, path: p8 });

const font = new opentype.Font({
  familyName: 'PAUScript',
  styleName: 'Regular',
  unitsPerEm: 1000,
  ascender: 800,
  descender: -200,
  glyphs: [notdefGlyph, g1, g2, g3, g4, g5, g6, g7, g8]
});

const arrayBuffer = font.arrayBuffer();
const buffer = Buffer.from(arrayBuffer);
const base64 = buffer.toString('base64');
fs.writeFileSync('pau-font-b64.txt', base64);
console.log('PAUScript font built successfully. Base64 length:', base64.length);
