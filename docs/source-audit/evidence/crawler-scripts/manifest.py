import json, csv, os, sys
from PIL import Image
src, root, out = sys.argv[1], sys.argv[2], sys.argv[3]
rows = json.load(open(src, encoding='utf-8'))
seen = set(); res = []
# group duplicate photos (same filename, different CDN ids)
fname_count = {}
for r in rows: fname_count[r['filename']] = fname_count.get(r['filename'], 0) + 1
for i, r in enumerate(rows):
    key = r['url'] + '|' + r['type']
    if key in seen: continue
    seen.add(key)
    local = r.get('local') or ''
    dims = '; '.join(r.get('dims') or [])
    if local and os.path.exists(os.path.join(root, local)) and not local.endswith(('.pdf', '.ico')):
        try:
            with Image.open(os.path.join(root, local)) as im: dims = f'{im.width}x{im.height}'; mode = im.mode
        except Exception: pass
    size_kb = round(int(r['bytes']) / 1024) if str(r.get('bytes') or '').isdigit() else ''
    t = r['type']; fn = r['filename']; url = r['url']
    concerns = []
    if size_kb and size_kb > 1000: concerns.append(f'oversized original ({size_kb/1024:.1f} MB) - resize/compress')
    elif size_kb and size_kb > 500: concerns.append('large - compress')
    if fn.lower().endswith('.png') and t in ('photo', 'hero/banner', 'product-image') and size_kb and size_kb > 400: concerns.append('photographic content saved as PNG - convert to WebP/AVIF/JPEG')
    try:
        w, h = map(int, dims.split('x')[:2]) if 'x' in dims and ';' not in dims else (0, 0)
        if w >= 3000: concerns.append(f'very large dimensions ({dims}) - generate responsive sizes')
        if t == 'hero/banner' and w and w < 1600: concerns.append('below 1600px wide for full-bleed hero - may look soft on large/retina screens')
    except Exception: pass
    alts = [a for a in (r.get('alts') or []) if a]
    if t in ('photo', 'hero/banner') and not alts: concerns.append('no alt text on original')
    if 'pixlr-image-generator' in fn: concerns.append('appears AI-generated (Pixlr image generator filename)')
    if fn.startswith('unsplash-image'): concerns.append('Unsplash stock photo - not original photography')
    if fn in ('image-asset.jpeg', 'thumbnail') or fn.startswith(('Untitled', '1.', '2.', '3.', '6.')): concerns.append('generic/non-descriptive filename')
    if fname_count.get(fn, 0) > 1 and fn not in ('image-asset.jpeg', 'thumbnail'): concerns.append('same filename uploaded more than once (possible duplicate upload)')
    if 'Instagram+Post' in fn or 'Personalized+Yoga' in fn or '.pdf' in fn and t != 'pdf': concerns.append('designed graphic/Canva export - may contain baked-in text; check before reuse')
    if 'Embodiment+Centre' in fn: concerns.append('LEGACY brand (Men\'s Embodiment Centre) still used as og:image - replace')
    if 'video.squarespace-cdn' in url and 'thumbnail' not in url: concerns.append('Squarespace-hosted stream; original MP4 not publicly downloadable - request source file from client')
    if t == 'logo': concerns.append('white-only transparent PNG (1500x1928); no dark/positive version or SVG found')
    uses = r.get('uses') or []
    pages = sorted(set(u.split(' ')[0] for u in uses))
    intended = {'hero/banner': 'Full-width page hero / banner', 'photo': 'In-section content image', 'section-background-graphic': 'Decorative section background (cream/teal wave graphic)', 'video-poster': 'Video poster frame', 'video (Squarespace-hosted)': 'Inline/background video', 'pdf': 'Downloadable brochure/syllabus', 'logo': 'Primary site logo (header)', 'legacy-logo': 'Legacy logo - reference only', 'favicon': 'Favicon', 'social-share': 'og:image social share', 'instagram-thumb': 'Instagram feed thumbnail (third-party, live feed)', 'product-image': 'Store product image'}.get(t, t)
    avail = 'local' if local else ('remote only' if r.get('status') in (200, 'remote') else 'inaccessible')
    res.append({'asset_id': f'A{len(res)+1:03d}', 'filename': fn, 'asset_type': t, 'source_url': url, 'local_path': local, 'http_status': r.get('status', ''), 'used_on (page §section)': ' | '.join(uses[:12]) + (f' (+{len(uses)-12} more)' if len(uses) > 12 else ''), 'pages': ' '.join(pages), 'dimensions_px': dims, 'file_size_kb': size_kb, 'content_type': r.get('contentType', ''), 'alt_text_original': ' / '.join(alts)[:220], 'intended_use': intended, 'availability': avail, 'quality_performance_notes': '; '.join(concerns)})
with open(out, 'w', newline='', encoding='utf-8-sig') as f:
    w = csv.DictWriter(f, fieldnames=list(res[0].keys())); w.writeheader(); w.writerows(res)
print(len(res), 'rows;', sum(1 for r in res if r['availability']=='local'), 'local')
