// Generates the torn-paper edge masks and paper grain used by the theme.
// Deterministic (seeded), so re-running produces identical files. Run with: node scripts/make-textures.mjs
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'public/textures');

function rng(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A ragged line across a 1200×28 box: small fibres plus occasional deeper tears.
function raggedPoints(seed, width = 1200, height = 28) {
  const r = rng(seed);
  const pts = [];
  let y = height * 0.5;
  for (let x = 0; x <= width; x += 6 + r() * 10) {
    y += (r() - 0.5) * 7;
    if (r() > 0.93) y += (r() - 0.3) * 10;
    y = Math.min(height - 3, Math.max(3, y));
    pts.push([x.toFixed(1), y.toFixed(1)]);
  }
  pts.push([width, pts.at(-1)[1]]);
  return pts;
}

// Mask: opaque below the ragged line (top edge) or above it (bottom edge).
function edgeSvg(seed, side) {
  const pts = raggedPoints(seed);
  const line = pts.map(([x, y]) => `${x},${y}`).join(' L');
  const d = side === 'top' ? `M0,28 L${line} L1200,28 Z` : `M0,0 L${line} L1200,0 Z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 28" preserveAspectRatio="none"><path d="${d}" fill="#000"/></svg>\n`;
}

async function grain(file, rgb, maxAlpha) {
  const size = 220;
  const r = rng(7);
  const buf = Buffer.alloc(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    buf[i * 4] = rgb[0];
    buf[i * 4 + 1] = rgb[1];
    buf[i * 4 + 2] = rgb[2];
    buf[i * 4 + 3] = Math.round(r() ** 3 * maxAlpha);
  }
  await sharp(buf, { raw: { width: size, height: size, channels: 4 } }).png({ compressionLevel: 9 }).toFile(path.join(OUT, file));
}

await mkdir(OUT, { recursive: true });
await writeFile(path.join(OUT, 'torn-top.svg'), edgeSvg(11, 'top'));
await writeFile(path.join(OUT, 'torn-bottom.svg'), edgeSvg(23, 'bottom'));
await grain('grain-light.png', [255, 248, 236], 34);
await grain('grain-dark.png', [40, 30, 20], 22);
console.log('textures written to public/textures');
