// Torn-paper polygons for clip-path. Seeded, so server and client render identical shapes.

function rng(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Walks the four edges of a box, nudging each point inward by up to `amp` percent.
export function tornPolygon(seed, amp = 2.2, steps = 26) {
  const r = rng(seed);
  const j = () => (0.25 + r() * 0.75) * amp * (r() > 0.9 ? 1.6 : 1);
  const pts = [];
  for (let i = 0; i < steps; i++) pts.push([(i / steps) * 100, j()]);
  for (let i = 0; i < steps; i++) pts.push([100 - j(), (i / steps) * 100]);
  for (let i = 0; i < steps; i++) pts.push([100 - (i / steps) * 100, 100 - j()]);
  for (let i = 0; i < steps; i++) pts.push([j(), 100 - (i / steps) * 100]);
  return `polygon(${pts.map(([x, y]) => `${x.toFixed(2)}% ${y.toFixed(2)}%`).join(', ')})`;
}
