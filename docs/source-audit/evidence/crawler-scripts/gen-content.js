// Generates per-page verbatim content markdown + a combined pages.json from crawl output.
const fs = require('fs');
const path = require('path');
const [, , crawlDir, outDir] = process.argv;
fs.mkdirSync(path.join(outDir, 'pages'), { recursive: true });

const NOISE = /^(Unmute|Mute|Settings|Enter fullscreen|Exit fullscreen|Speed.*|Normal|[0-9.]+x|\d\d:\d\d|Play|Pause|Skip to Content|Previous|Next|Close|Open Menu|Close Menu|Folder:)$/;
const clean = t => t.split('\n').filter(l => !NOISE.test(l.trim())).join('\n').replace(/\n{3,}/g, '\n\n').trim();
const fileOf = src => { try { return decodeURIComponent(new URL(src).pathname.split('/').pop()); } catch { return src; } };
const route = u => new URL(u).pathname;

const skip = new Set(['about.json', 'offerings.json', 'teacher-trainings.json', 'online.json']); // folder redirects (dupes)
const all = [];
for (const f of fs.readdirSync(crawlDir).filter(f => f.endsWith('.json') && !f.includes('.vw') && !f.startsWith('_') && !skip.has(f)).sort()) {
  const d = JSON.parse(fs.readFileSync(path.join(crawlDir, f)));
  const slug = f.replace('.json', '');
  const r = route(d.finalUrl || d.url);
  const secs = d.sections.map(s => ({
    index: s.index, theme: s.theme,
    headings: s.headings,
    text: clean(s.text),
    images: s.images.filter(i => i.src && !/thirdPartyMemberAvatar/.test(i.src)).map(i => ({ file: fileOf(i.src), src: i.src.split('?')[0], alt: i.alt || '', natural: i.natural || i.dataDims, rendered: i.rendered })),
    bgImages: s.bgImages,
    videos: s.videos.filter(v => v.src).map(v => { try { const j = JSON.parse(v.src); return { url: j.alexandriaUrl, durationSeconds: Math.round(j.durationSeconds), variants: j.systemDataVariants }; } catch { return { src: v.src.slice(0, 200) }; } }),
    iframes: s.iframes.filter(Boolean),
    buttons: s.buttons.filter(b => b.label && b.href).map(b => ({ label: b.label, href: b.href })),
    forms: s.forms,
    layoutHints: s.layoutHints.filter(h => !/plyr|video-player__|navigation-indicator/.test(h)),
  }));
  const page = { slug, route: r, status: d.status, title: d.title, metaDescription: d.meta.description || '', canonical: d.canonical, ogTitle: d.meta['og:title'], ogImage: d.meta['og:image'], h1: d.h1s, docHeight1440: d.docHeight, sections: secs };
  all.push(page);
  let md = `# ${d.title}\n\n`;
  md += `- **Route:** \`${r}\` (HTTP ${d.status})\n- **Canonical:** ${d.canonical || '—'}\n- **Meta description:** ${page.metaDescription || '_(none)_'}\n- **OG title:** ${page.ogTitle || '—'}\n- **OG image:** ${page.ogImage || '—'}\n- **H1(s):** ${d.h1s.length ? d.h1s.map(h => `"${h}"`).join(' · ') : '_(none)_'}\n- **Page height @1440:** ${d.docHeight}px\n- **Source:** rendered DOM captured 2026-10-28 (headless Chromium, 1440px)\n\n`;
  md += `> Verbatim text extracted from the live page. Video-player control labels have been stripped. Header and footer are shared and documented in 03-content-inventory.md.\n\n`;
  for (const s of secs) {
    md += `---\n\n## Section ${s.index}${s.theme ? ` (theme: ${s.theme})` : ''}\n\n`;
    if (s.headings.length) md += `**Headings:** ${s.headings.map(h => `${h.tag} "${h.text.replace(/\n/g, ' ')}"`).join(' · ')}\n\n`;
    md += s.text ? s.text.split('\n').map(l => l ? l : '').join('\n') + '\n\n' : '_(no text)_\n\n';
    if (s.buttons.length) md += `**Buttons/CTAs:**\n${s.buttons.map(b => `- "${b.label}" → ${b.href}`).join('\n')}\n\n`;
    if (s.images.length) md += `**Images:**\n${s.images.map(i => `- \`${i.file}\` (${i.natural || '?'}; rendered ${i.rendered})${i.alt ? ` — alt: "${i.alt.replace(/\s+/g, ' ').slice(0, 160)}"` : ' — no alt'}`).join('\n')}\n\n`;
    if (s.bgImages.length) md += `**Background images:** ${s.bgImages.join(', ')}\n\n`;
    if (s.videos.length) md += `**Video:** ${s.videos.map(v => JSON.stringify(v)).join('; ')}\n\n`;
    if (s.iframes.length) md += `**Embeds/iframes:** ${s.iframes.join(', ')}\n\n`;
    if (s.forms.length) md += `**Forms:** ${JSON.stringify(s.forms)}\n\n`;
    if (s.layoutHints.length) md += `<sub>Layout components detected: ${s.layoutHints.join(', ')}</sub>\n\n`;
  }
  fs.writeFileSync(path.join(outDir, 'pages', slug + '.md'), md);
}
fs.writeFileSync(path.join(outDir, 'pages.json'), JSON.stringify(all, null, 1));
console.log('pages', all.length);
