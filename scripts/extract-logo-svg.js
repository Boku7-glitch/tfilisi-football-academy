const fs = require('fs');
const path = require('path');

const publicLogoDir = path.join(__dirname, '..', 'public', 'logo');
if (!fs.existsSync(publicLogoDir)) {
  fs.mkdirSync(publicLogoDir, { recursive: true });
}

const brainDir = 'C:/Users/sabab/.gemini/antigravity/brain/ed5c90c5-8edd-47d9-a1c7-cbc807671134';

const stream = fs.readFileSync(path.join(__dirname, '..', 'decompressed_stream.txt'), 'utf-8');
const tokens = stream.trim().split(/\s+/);

function multMatrix(m1, m2) {
  return [
    m1[0] * m2[0] + m1[2] * m2[1],
    m1[1] * m2[0] + m1[3] * m2[1],
    m1[0] * m2[2] + m1[2] * m2[3],
    m1[1] * m2[2] + m1[3] * m2[3],
    m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
    m1[1] * m2[4] + m1[3] * m2[5] + m1[5]
  ];
}

function applyMatrix(pt, m) {
  return [
    m[0] * pt[0] + m[2] * pt[1] + m[4],
    m[1] * pt[0] + m[3] * pt[1] + m[5]
  ];
}

let matrixStack = [[1, 0, 0, 1, 0, 0]];
let curColor = '#000000';
let allPaths = [];

let curCmds = [];
let curPoints = [];

let i = 0;
while (i < tokens.length) {
  const tok = tokens[i];
  if (tok === 'q') {
    matrixStack.push([...matrixStack[matrixStack.length - 1]]);
    i++;
  } else if (tok === 'Q') {
    if (matrixStack.length > 1) matrixStack.pop();
    i++;
  } else if (tok === 'cm') {
    const a = parseFloat(tokens[i - 6]);
    const b = parseFloat(tokens[i - 5]);
    const c = parseFloat(tokens[i - 4]);
    const d = parseFloat(tokens[i - 3]);
    const e = parseFloat(tokens[i - 2]);
    const f = parseFloat(tokens[i - 1]);
    const top = matrixStack[matrixStack.length - 1];
    matrixStack[matrixStack.length - 1] = multMatrix(top, [a, b, c, d, e, f]);
    i++;
  } else if (tok === 'k') {
    const c = parseFloat(tokens[i - 4]);
    const m = parseFloat(tokens[i - 3]);
    const y = parseFloat(tokens[i - 2]);
    const k = parseFloat(tokens[i - 1]);
    const r = Math.round(255 * (1 - c) * (1 - k));
    const g = Math.round(255 * (1 - m) * (1 - k));
    const b = Math.round(255 * (1 - y) * (1 - k));
    curColor = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    i++;
  } else if (tok === 'm') {
    const x = parseFloat(tokens[i - 2]);
    const y = parseFloat(tokens[i - 1]);
    const pt = applyMatrix([x, y], matrixStack[matrixStack.length - 1]);
    curCmds.push({ type: 'M', p: [pt] });
    curPoints.push(pt);
    i++;
  } else if (tok === 'l') {
    const x = parseFloat(tokens[i - 2]);
    const y = parseFloat(tokens[i - 1]);
    const pt = applyMatrix([x, y], matrixStack[matrixStack.length - 1]);
    curCmds.push({ type: 'L', p: [pt] });
    curPoints.push(pt);
    i++;
  } else if (tok === 'c') {
    const top = matrixStack[matrixStack.length - 1];
    const p1 = applyMatrix([parseFloat(tokens[i - 6]), parseFloat(tokens[i - 5])], top);
    const p2 = applyMatrix([parseFloat(tokens[i - 4]), parseFloat(tokens[i - 3])], top);
    const p3 = applyMatrix([parseFloat(tokens[i - 2]), parseFloat(tokens[i - 1])], top);
    curCmds.push({ type: 'C', p: [p1, p2, p3] });
    curPoints.push(p1, p2, p3);
    i++;
  } else if (tok === 'h') {
    curCmds.push({ type: 'Z' });
    i++;
  } else if (tok === 're') {
    const x = parseFloat(tokens[i - 4]);
    const y = parseFloat(tokens[i - 3]);
    const w = parseFloat(tokens[i - 2]);
    const h = parseFloat(tokens[i - 1]);
    const top = matrixStack[matrixStack.length - 1];
    const p1 = applyMatrix([x, y], top);
    const p2 = applyMatrix([x + w, y], top);
    const p3 = applyMatrix([x + w, y + h], top);
    const p4 = applyMatrix([x, y + h], top);
    curCmds.push({ type: 'M', p: [p1] });
    curCmds.push({ type: 'L', p: [p2] });
    curCmds.push({ type: 'L', p: [p3] });
    curCmds.push({ type: 'L', p: [p4] });
    curCmds.push({ type: 'Z' });
    curPoints.push(p1, p2, p3, p4);
    i++;
  } else if (tok === 'f' || tok === 'f*' || tok === 'B' || tok === 'B*') {
    if (curCmds.length > 0) {
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const p of curPoints) {
        if (p[0] < minX) minX = p[0];
        if (p[0] > maxX) maxX = p[0];
        if (p[1] < minY) minY = p[1];
        if (p[1] > maxY) maxY = p[1];
      }
      allPaths.push({
        cmds: curCmds,
        fill: curColor,
        isEvenOdd: tok.includes('*'),
        minX, maxX, minY, maxY
      });
      curCmds = [];
      curPoints = [];
    }
    i++;
  } else {
    i++;
  }
}

// Left logo paths are indices 14 to 26
const leftPaths = allPaths.slice(14, 27);
let gMinX = Infinity, gMaxX = -Infinity, gMinY = Infinity, gMaxY = -Infinity;
for (const lp of leftPaths) {
  if (lp.minX < gMinX) gMinX = lp.minX;
  if (lp.maxX > gMaxX) gMaxX = lp.maxX;
  if (lp.minY < gMinY) gMinY = lp.minY;
  if (lp.maxY > gMaxY) gMaxY = lp.maxY;
}

const w = Math.ceil(gMaxX - gMinX);
const h = Math.ceil(gMaxY - gMinY);
console.log('Logo dimensions:', w, 'x', h, 'bbox:', gMinX, gMaxX, gMinY, gMaxY);

function toSvgPathString(lp) {
  return lp.cmds.map(cmd => {
    if (cmd.type === 'Z') return 'Z';
    if (cmd.type === 'M') {
      const x = (cmd.p[0][0] - gMinX).toFixed(2);
      const y = (gMaxY - cmd.p[0][1]).toFixed(2);
      return `M ${x} ${y}`;
    }
    if (cmd.type === 'L') {
      const x = (cmd.p[0][0] - gMinX).toFixed(2);
      const y = (gMaxY - cmd.p[0][1]).toFixed(2);
      return `L ${x} ${y}`;
    }
    if (cmd.type === 'C') {
      const x1 = (cmd.p[0][0] - gMinX).toFixed(2);
      const y1 = (gMaxY - cmd.p[0][1]).toFixed(2);
      const x2 = (cmd.p[1][0] - gMinX).toFixed(2);
      const y2 = (gMaxY - cmd.p[1][1]).toFixed(2);
      const x3 = (cmd.p[2][0] - gMinX).toFixed(2);
      const y3 = (gMaxY - cmd.p[2][1]).toFixed(2);
      return `C ${x1} ${y1}, ${x2} ${y2}, ${x3} ${y3}`;
    }
  }).join(' ');
}

function generateSvg(fillColor) {
  const pathElements = leftPaths.map(lp => {
    const d = toSvgPathString(lp);
    const rule = lp.isEvenOdd ? ' fill-rule="evenodd"' : '';
    return `<path d="${d}" fill="${fillColor}"${rule} />`;
  }).join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="none">\n  ${pathElements}\n</svg>`;
}

// 1. Navy Logo
const navySvg = generateSvg('#052442');
fs.writeFileSync(path.join(publicLogoDir, 'tfilisi-logo-navy.svg'), navySvg);
fs.writeFileSync(path.join(brainDir, 'tfilisi-logo-navy.svg'), navySvg);

// 2. White Logo
const whiteSvg = generateSvg('#ffffff');
fs.writeFileSync(path.join(publicLogoDir, 'tfilisi-logo-white.svg'), whiteSvg);
fs.writeFileSync(path.join(brainDir, 'tfilisi-logo-white.svg'), whiteSvg);

// 3. Royal Blue Logo
const blueSvg = generateSvg('#0052ff');
fs.writeFileSync(path.join(publicLogoDir, 'tfilisi-logo-blue.svg'), blueSvg);
fs.writeFileSync(path.join(brainDir, 'tfilisi-logo-blue.svg'), blueSvg);

// --- Crest Only (Wolf & Spartan Mask without text) ---
const crestPaths = leftPaths.filter((_, idx) => idx < 5 || idx === 12);
let cMinX = Infinity, cMaxX = -Infinity, cMinY = Infinity, cMaxY = -Infinity;
for (const cp of crestPaths) {
  if (cp.minX < cMinX) cMinX = cp.minX;
  if (cp.maxX > cMaxX) cMaxX = cp.maxX;
  if (cp.minY < cMinY) cMinY = cp.minY;
  if (cp.maxY > cMaxY) cMaxY = cp.maxY;
}
const cw = Math.ceil(cMaxX - cMinX);
const ch = Math.ceil(cMaxY - cMinY);

function toCrestPathString(cp) {
  return cp.cmds.map(cmd => {
    if (cmd.type === 'Z') return 'Z';
    if (cmd.type === 'M') {
      const x = (cmd.p[0][0] - cMinX).toFixed(2);
      const y = (cMaxY - cmd.p[0][1]).toFixed(2);
      return `M ${x} ${y}`;
    }
    if (cmd.type === 'L') {
      const x = (cmd.p[0][0] - cMinX).toFixed(2);
      const y = (cMaxY - cmd.p[0][1]).toFixed(2);
      return `L ${x} ${y}`;
    }
    if (cmd.type === 'C') {
      const x1 = (cmd.p[0][0] - cMinX).toFixed(2);
      const y1 = (cMaxY - cmd.p[0][1]).toFixed(2);
      const x2 = (cmd.p[1][0] - cMinX).toFixed(2);
      const y2 = (cMaxY - cmd.p[1][1]).toFixed(2);
      const x3 = (cmd.p[2][0] - cMinX).toFixed(2);
      const y3 = (cMaxY - cmd.p[2][1]).toFixed(2);
      return `C ${x1} ${y1}, ${x2} ${y2}, ${x3} ${y3}`;
    }
  }).join(' ');
}

function generateCrestSvg(fillColor) {
  const pathElements = crestPaths.map(cp => {
    const d = toCrestPathString(cp);
    const rule = cp.isEvenOdd ? ' fill-rule="evenodd"' : '';
    return `<path d="${d}" fill="${fillColor}"${rule} />`;
  }).join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cw} ${ch}" fill="none">\n  ${pathElements}\n</svg>`;
}

fs.writeFileSync(path.join(publicLogoDir, 'tfilisi-crest-navy.svg'), generateCrestSvg('#052442'));
fs.writeFileSync(path.join(brainDir, 'tfilisi-crest-navy.svg'), generateCrestSvg('#052442'));

fs.writeFileSync(path.join(publicLogoDir, 'tfilisi-crest-white.svg'), generateCrestSvg('#ffffff'));
fs.writeFileSync(path.join(brainDir, 'tfilisi-crest-white.svg'), generateCrestSvg('#ffffff'));

fs.writeFileSync(path.join(publicLogoDir, 'tfilisi-crest-blue.svg'), generateCrestSvg('#0052ff'));
fs.writeFileSync(path.join(brainDir, 'tfilisi-crest-blue.svg'), generateCrestSvg('#0052ff'));

console.log('All Logo and Crest SVGs generated successfully!');
