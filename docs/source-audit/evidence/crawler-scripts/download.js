// Downloads unique original assets into the audit folder and records local paths.
const fs = require('fs');
const path = require('path');
const [, , assetsJson, destRoot] = process.argv;
const rows = JSON.parse(fs.readFileSync(assetsJson));
const slug = p => (p.split(' ')[0].replace(/^\/|\/$/g, '') || 'home').replace(/[^a-z0-9-]+/gi, '_').replace(/^ALL_\(header\)$/, 'brand');
const safe = n => n.replace(/[%'"]/g, '').replace(/[+\s]+/g, '-').replace(/[^a-zA-Z0-9._()-]/g, '');
const extras = [
  { url: 'https://images.squarespace-cdn.com/content/v1/5fb63e84f95ce03b8d429fee/047ded88-1da7-4a4a-aa08-943abcc848e3/favicon.ico', filename: 'favicon.ico', type: 'favicon', uses: ['ALL (head) favicon'], alts: [], dims: [], rendered: [] },
];
const want = [...rows.filter(r => !/social-share|video|instagram-thumb/.test(r.type)), ...extras];
// keep og-only images that are unique brand assets (old Embodiment Centre logo)
const oldLogo = rows.find(r => /Embodiment\+Centre-logo/.test(r.url));
if (oldLogo) want.push({ ...oldLogo, type: 'legacy-logo' });
const used = new Set();
(async () => {
  let i = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (i < want.length) {
      const a = want[i++];
      const dir = a.type === 'pdf' ? 'documents' : /logo|favicon/.test(a.type) ? 'brand' : 'images';
      let name = `${slug(a.uses[0])}__${safe(a.filename)}`;
      if (!/\.[a-z0-9]{2,4}$/i.test(name)) name += '.jpg';
      while (used.has(dir + name)) name = name.replace(/(\.[a-z0-9]+)$/i, '-b$1');
      used.add(dir + name);
      const out = path.join(destRoot, dir, name);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      try {
        const r = await fetch(a.url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'image/jpeg,image/png,image/gif,image/x-icon,application/pdf;q=0.9' } });
        if (!r.ok) throw new Error('HTTP ' + r.status);
        const buf = Buffer.from(await r.arrayBuffer());
        fs.writeFileSync(out, buf);
        a.local = path.posix.join('docs/source-audit/original-assets', dir, name);
        a.bytes = String(buf.length);
        a.contentType = r.headers.get('content-type');
      } catch (e) { a.local = ''; a.dlError = e.message; }
    }
  }));
  // merge local paths back
  const byUrl = new Map(want.map(w => [w.url + '|' + w.type, w]));
  for (const r of rows) { const w = byUrl.get(r.url + '|' + r.type); if (w) Object.assign(r, { local: w.local, dlError: w.dlError, bytes: w.bytes || r.bytes }); }
  const all = [...rows, ...extras, ...(oldLogo ? [want[want.length - 1]] : [])];
  fs.writeFileSync(assetsJson.replace('.json', '.local.json'), JSON.stringify(all, null, 1));
  console.log('downloaded', want.filter(w => w.local).length, 'failed', want.filter(w => w.dlError).map(w => w.url + ' ' + w.dlError));
})();
