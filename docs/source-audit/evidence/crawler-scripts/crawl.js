// Phase 1 audit crawler: renders pages, extracts structured content, takes screenshots.
// Usage: node crawl.js <urls.txt> <outDir> <shotDir> [viewports=1440,768,390] [fullpage=1]
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const EXE = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1208/chrome-win64/chrome.exe';
const [, , urlFile, outDir, shotDir, vpArg = '1440,768,390', fullArg = '1'] = process.argv;
const urls = fs.readFileSync(urlFile, 'utf8').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
const viewports = vpArg.split(',').map(Number);
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(shotDir, { recursive: true });

const slugOf = u => {
  const p = new URL(u).pathname.replace(/^\/|\/$/g, '');
  return (p || 'root').replace(/[^a-z0-9-]+/gi, '__');
};

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise(res => {
      let y = 0;
      const step = () => {
        y += 600;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight + 600) setTimeout(step, 120);
        else { window.scrollTo(0, 0); setTimeout(res, 600); }
      };
      step();
    });
  });
}

function extract() {
  const txt = el => (el ? el.innerText.replace(/ /g, ' ').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim() : '');
  const abs = h => { try { return new URL(h, location.href).href; } catch { return h; } };
  const meta = {};
  document.querySelectorAll('meta[name],meta[property],meta[itemprop]').forEach(m => {
    const k = m.getAttribute('name') || m.getAttribute('property') || 'itemprop:' + m.getAttribute('itemprop');
    meta[k] = m.getAttribute('content');
  });
  const canonical = document.querySelector('link[rel=canonical]')?.href || null;
  const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => s.textContent.trim());

  const imgInfo = img => ({
    src: img.currentSrc || img.src || img.getAttribute('data-src') || img.getAttribute('data-image'),
    dataSrc: img.getAttribute('data-src') || img.getAttribute('data-image'),
    alt: img.getAttribute('alt'),
    natural: img.naturalWidth ? `${img.naturalWidth}x${img.naturalHeight}` : null,
    dataDims: img.getAttribute('data-image-dimensions'),
    rendered: `${Math.round(img.getBoundingClientRect().width)}x${Math.round(img.getBoundingClientRect().height)}`,
    focal: img.getAttribute('data-image-focal-point'),
  });
  const bgImgs = root => [...root.querySelectorAll('*')].map(e => getComputedStyle(e).backgroundImage).filter(b => b && b !== 'none' && b.includes('url('));

  const header = document.querySelector('header#header, header');
  const footer = document.querySelector('footer#footer-sections, footer');
  // Navigation structure (desktop)
  const nav = [];
  document.querySelectorAll('.header-display-desktop .header-nav-list > div, .header-nav-list > div').forEach(item => {
    const title = item.querySelector('.header-nav-folder-title, a');
    if (!title) return;
    const children = [...item.querySelectorAll('.header-nav-folder-item a, .header-nav-folder-content a')].map(a => ({ label: txt(a), href: a.getAttribute('href') }));
    nav.push({ label: txt(title).split('\n')[0], href: title.getAttribute('href'), children });
  });
  const mobileNav = [...document.querySelectorAll('.header-menu-nav a')].map(a => ({ label: a.textContent.replace(/\s+/g, ' ').trim(), href: a.getAttribute('href') }));
  const headerCtas = [...(header ? header.querySelectorAll('.header-actions a, .btn, .header-button a') : [])].map(a => ({ label: txt(a), href: a.getAttribute('href') }));

  const sectionEls = [...document.querySelectorAll('main section.page-section, #sections > section, main article section, .sections > section')];
  const uniq0 = [...new Set(sectionEls)];
  const uniq = uniq0.filter(s => !uniq0.some(o => o !== s && s.contains(o)) && !(footer && footer.contains(s)));
  const sections = (uniq.length ? uniq : [document.querySelector('main') || document.body]).map((s, i) => {
    const r = s.getBoundingClientRect();
    const cs = getComputedStyle(s);
    return {
      index: i + 1,
      theme: s.getAttribute('data-section-theme') || null,
      id: s.getAttribute('data-section-id') || s.id || null,
      classes: s.className,
      top: Math.round(r.top + scrollY),
      height: Math.round(r.height),
      bg: cs.backgroundColor,
      headings: [...s.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => ({ tag: h.tagName, text: txt(h) })).filter(h => h.text),
      text: txt(s),
      images: [...s.querySelectorAll('img')].map(imgInfo),
      bgImages: [...new Set(bgImgs(s))],
      videos: [...s.querySelectorAll('video, [data-config-video], .sqs-video-wrapper, .video-block')].map(v => ({ tag: v.tagName, src: v.currentSrc || v.getAttribute('src') || v.getAttribute('data-config-video') || v.getAttribute('data-html') || '', poster: v.getAttribute('poster') })),
      iframes: [...s.querySelectorAll('iframe')].map(f => f.src || f.getAttribute('data-src')),
      buttons: [...s.querySelectorAll('a.sqs-block-button-element, a.btn, button, .sqs-button-element--primary, .sqs-button-element--secondary, .sqs-button-element--tertiary')].map(b => ({ label: txt(b), href: b.getAttribute('href') })),
      links: [...s.querySelectorAll('a[href]')].map(a => ({ label: txt(a).slice(0, 120), href: abs(a.getAttribute('href')) })),
      forms: [...s.querySelectorAll('form')].map(f => ({
        action: f.getAttribute('action'),
        fields: [...f.querySelectorAll('input,textarea,select')].filter(i => i.type !== 'hidden').map(i => ({ tag: i.tagName, type: i.type, name: i.name, required: i.required || !!i.closest('.required'), label: txt(i.closest('.form-item, label, fieldset')?.querySelector('label, legend, .title')) || i.placeholder })),
        submit: txt(f.querySelector('[type=submit], button')),
      })),
      accordions: [...s.querySelectorAll('.accordion-item, details')].map(a => ({ q: txt(a.querySelector('.accordion-item__title, summary, button')), a: txt(a.querySelector('.accordion-item__description, .accordion-item__dropdown, p')) })),
      galleries: s.querySelectorAll('.sqs-gallery, .gallery-grid, .gallery-slideshow, .gallery-reel, .user-items-list, .gallery-masonry, .list-section-carousel').length,
      layoutHints: [...new Set([...s.querySelectorAll('[class]')].flatMap(e => [...e.classList]).filter(c => /gallery|slideshow|carousel|list-section|accordion|summary|banner|form|video|map|newsletter|marquee|instagram|calendar|product|scheduling|acuity|embed|code-block|quote|testimonial/i.test(c)))].slice(0, 40),
    };
  });

  const allImgs = [...document.querySelectorAll('img')].map(imgInfo);
  const allLinks = [...document.querySelectorAll('a[href]')].map(a => ({ label: txt(a).slice(0, 120), href: abs(a.getAttribute('href')), inHeader: !!header?.contains(a), inFooter: !!footer?.contains(a), target: a.target }));
  const iframes = [...document.querySelectorAll('iframe')].map(f => ({ src: f.src || f.getAttribute('data-src'), title: f.title }));
  const scripts = [...document.querySelectorAll('script[src]')].map(s => s.src);

  // Typography & colors
  const sample = sel => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const c = getComputedStyle(el);
    return { sel, text: txt(el).slice(0, 60), fontFamily: c.fontFamily, fontWeight: c.fontWeight, fontStyle: c.fontStyle, fontSize: c.fontSize, lineHeight: c.lineHeight, letterSpacing: c.letterSpacing, textTransform: c.textTransform, color: c.color, bg: c.backgroundColor, borderRadius: c.borderRadius, padding: c.padding, border: c.border };
  };
  const typo = ['h1', 'h2', 'h3', 'h4', 'main p', '.header-nav-item a', '.header-title-text a', '.header-actions .btn, .header-actions a', '.sqs-block-button-element--large', '.sqs-block-button-element--medium', '.sqs-block-button-element--small', '.sqs-block-button-element', 'footer p', 'footer a', 'footer h2, footer h3, footer h4', 'blockquote', 'input', '.form-submit-button, form button', '.blog-title, .blog-item-title', '.product-title', '.product-price', '.sqs-money-native'].map(sample).filter(Boolean);
  const rootStyle = getComputedStyle(document.documentElement);
  const cssVars = {};
  for (const sheet of document.styleSheets) {
    try { for (const rule of sheet.cssRules) { if (rule.selectorText && /^(:root|body|html|\.white|\.light|\.dark|\.black|\.bright|\.white-bold|\.light-bold|\.dark-bold|\.black-bold|\.bright-inverse)/.test(rule.selectorText)) { for (const p of rule.style) if (p.startsWith('--')) cssVars[rule.selectorText + ' ' + p] = rule.style.getPropertyValue(p).trim(); } } } catch (e) { }
  }
  const fontsLoaded = [...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family} ${f.weight} ${f.style}`);
  const fontsAll = [...new Set([...document.fonts].map(f => `${f.family}|${f.weight}|${f.style}|${f.status}`))];

  return {
    url: location.href, title: document.title, lang: document.documentElement.lang, meta, canonical, jsonld,
    h1s: [...document.querySelectorAll('h1')].map(txt),
    nav, mobileNav, headerCtas,
    headerText: txt(header), headerLogo: header ? [...header.querySelectorAll('img')].map(imgInfo) : [],
    footerText: txt(footer), footerLinks: footer ? [...footer.querySelectorAll('a[href]')].map(a => ({ label: txt(a), href: abs(a.getAttribute('href')) })) : [],
    footerImgs: footer ? [...footer.querySelectorAll('img')].map(imgInfo) : [],
    sections, allImgs, allLinks, iframes, scripts, typo, cssVars, fontsLoaded, fontsAll,
    bodyText: txt(document.querySelector('main') || document.body),
    docHeight: document.documentElement.scrollHeight,
    overflowX: document.documentElement.scrollWidth > window.innerWidth,
    bodyBg: getComputedStyle(document.body).backgroundColor,
    headerPos: header ? getComputedStyle(header).position : null,
    headerHeight: header ? Math.round(header.getBoundingClientRect().height) : null,
    burgerVisible: !!document.querySelector('.header-burger') && getComputedStyle(document.querySelector('.header-burger')).display !== 'none',
  };
}

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, headless: true });
  const summary = [];
  for (const url of urls) {
    const slug = slugOf(url);
    for (const vw of viewports) {
      const vh = vw >= 1200 ? 900 : vw >= 700 ? 1024 : 844;
      const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, userAgent: vw < 700 ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' : undefined, deviceScaleFactor: 1, isMobile: vw < 700, hasTouch: vw < 700 });
      const page = await ctx.newPage();
      const rec = { url, vw };
      try {
        const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        rec.status = resp ? resp.status() : null;
        rec.finalUrl = page.url();
        await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => { });
        await autoScroll(page);
        await page.waitForTimeout(800);
        const data = await page.evaluate(extract);
        Object.assign(rec, { title: data.title, docHeight: data.docHeight, overflowX: data.overflowX, sections: data.sections.length, burgerVisible: data.burgerVisible });
        if (vw === viewports[0]) fs.writeFileSync(path.join(outDir, slug + '.json'), JSON.stringify({ status: rec.status, finalUrl: rec.finalUrl, ...data }, null, 1));
        else fs.writeFileSync(path.join(outDir, slug + `.vw${vw}.json`), JSON.stringify({ status: rec.status, finalUrl: rec.finalUrl, docHeight: data.docHeight, overflowX: data.overflowX, burgerVisible: data.burgerVisible, headerPos: data.headerPos, headerHeight: data.headerHeight, typo: data.typo, mobileNav: data.mobileNav, sections: data.sections.map(s => ({ index: s.index, height: s.height, images: s.images.map(i => ({ src: i.src, rendered: i.rendered })), headings: s.headings })) }, null, 1));
        if (fullArg === '1') {
          await page.screenshot({ path: path.join(shotDir, `${slug}__${vw}.jpg`), fullPage: true, type: 'jpeg', quality: 55 }).catch(e => rec.shotErr = e.message);
        }
      } catch (e) { rec.error = e.message; }
      summary.push(rec);
      console.log(JSON.stringify(rec));
      await ctx.close();
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(outDir, '_summary.' + viewports.join('-') + '.json'), JSON.stringify(summary, null, 1));
})();
