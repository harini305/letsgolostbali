// Builds asset manifest rows from crawl data; HEADs originals for size/type.
const fs = require('fs');
const path = require('path');
const [, , crawlDir, hiddenJson, outJson] = process.argv;
const hidden = JSON.parse(fs.readFileSync(hiddenJson));
const skip = new Set(['about.json', 'offerings.json', 'teacher-trainings.json', 'online.json', 'home.json', 'www__embodimentcentre__com.json', 'cart.json']);
const base = u => { try { const x = new URL(u.replace(/^http:/, 'https:')); return (x.origin + x.pathname).replace(/\/$/, ""); } catch { return null; } };
const fileOf = u => decodeURIComponent(u.split('/').pop());
const assets = new Map();
const add = (url, o) => {
  const b = base(url); if (!b) return;
  if (!/squarespace-cdn\.com|static1\.squarespace\.com|letsgetlostbali\.com\/s\//.test(b)) return;
  if (/thirdPartyMemberAvatar|universal\/svg/.test(b)) return;
  const a = assets.get(b) || { url: b, filename: fileOf(b), type: o.type, uses: [], alts: new Set(), dims: new Set(), rendered: new Set() };
  a.uses.push(`${o.page} §${o.section}${o.role ? ' ' + o.role : ''}`);
  if (o.alt) a.alts.add(o.alt.replace(/\s+/g, ' ').slice(0, 140));
  if (o.dims) a.dims.add(o.dims);
  if (o.rendered) a.rendered.add(o.rendered);
  if (o.type && a.type !== 'logo') a.type = o.type;
  assets.set(b, a);
};
for (const f of fs.readdirSync(crawlDir).filter(f => f.endsWith('.json') && !f.includes('.vw') && !f.startsWith('_') && !skip.has(f))) {
  const d = JSON.parse(fs.readFileSync(path.join(crawlDir, f)));
  const page = new URL(d.finalUrl || d.url).pathname;
  d.sections.forEach(s => {
    s.images.forEach((im, i) => {
      if (!im.src) return;
      const isHero = s.index === 1 && /^14\d\dx/.test(im.rendered || '') ;
      const isInsta = s.layoutHints.some(h => /instagram/.test(h));
      add(im.src, { page, section: s.index, alt: im.alt, dims: im.dataDims || im.natural, rendered: im.rendered, type: isInsta ? 'instagram-thumb' : isHero ? 'hero/banner' : (/\.png/i.test(im.src) && /pdf/i.test(im.src) ? 'section-background-graphic' : 'photo') });
    });
    s.bgImages.forEach(bg => { const m = bg.match(/url\("?([^")]+)/); if (m) add(m[1], { page, section: s.index, type: 'video-poster' }); });
    s.videos.forEach(v => { try { const j = JSON.parse(v.src); add(j.alexandriaUrl.replace('{variant}', ''), { page, section: s.index, type: 'video (Squarespace-hosted)', dims: j.systemDataVariants, role: `${Math.round(j.durationSeconds)}s` }); } catch { } });
    s.links.forEach(l => { if (/\/s\/.+\.pdf/i.test(l.href)) add(l.href, { page, section: s.index, type: 'pdf' }); });
  });
  (d.headerLogo || []).slice(0, 1).forEach(im => add(im.src, { page: 'ALL (header)', section: 'header', type: 'logo', alt: im.alt, dims: im.natural }));
  if (d.meta['og:image']) add(d.meta['og:image'], { page, section: 'meta', role: 'og:image', type: 'social-share' });
}
for (const [r, v] of Object.entries(hidden)) if (v.product) v.product.images.slice(0, 1).forEach(u => add(u, { page: r, section: 'product', type: 'product-image' }));

(async () => {
  const rows = [...assets.values()];
  let i = 0;
  await Promise.all(Array.from({ length: 8 }, async () => {
    while (i < rows.length) {
      const a = rows[i++];
      if (/video\.squarespace-cdn/.test(a.url) && !/thumbnail/.test(a.url)) { a.bytes = ''; a.contentType = 'video/mp4 (HLS/variants)'; a.status = 'remote'; continue; }
      try {
        const r = await fetch(a.url, { method: 'HEAD', redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0' } });
        a.status = r.status; a.bytes = r.headers.get('content-length') || ''; a.contentType = r.headers.get('content-type') || '';
      } catch (e) { a.status = 'ERR'; }
    }
  }));
  fs.writeFileSync(outJson, JSON.stringify(rows.map(a => ({ ...a, alts: [...a.alts], dims: [...a.dims], rendered: [...a.rendered] })), null, 1));
  console.log('assets', rows.length, 'total MB', (rows.reduce((s, a) => s + (+a.bytes || 0), 0) / 1e6).toFixed(1));
})();
