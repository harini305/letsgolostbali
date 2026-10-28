// Samples rendered colours/typography per section theme, plus header/footer/nav dropdown and hover states.
const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1208/chrome-win64/chrome.exe';
const urls = process.argv.slice(3);
const out = process.argv[2];

const toHex = c => {
  const m = c && c.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
  if (!m) return c;
  const h = [1, 2, 3].map(i => Math.round(+m[i]).toString(16).padStart(2, '0')).join('').toUpperCase();
  return '#' + h + (m[4] !== undefined && +m[4] < 1 ? ` @${m[4]}` : '');
};

(async () => {
  const browser = await chromium.launch({ executablePath: EXE });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const results = [];
  for (const url of urls) {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => { });
    const data = await page.evaluate(() => {
      const st = (el, props) => { if (!el) return null; const c = getComputedStyle(el); const o = {}; props.forEach(p => o[p] = c[p]); return o; };
      const secs = [...document.querySelectorAll('main section.page-section')].map((s, i) => {
        const bgEl = s.querySelector('.section-background') || s;
        const ov = s.querySelector('.section-background-overlay');
        const h = s.querySelector('h1,h2,h3,h4');
        const p = s.querySelector('p');
        const a = s.querySelector('p a, .sqs-html-content a');
        const btn = s.querySelector('.sqs-block-button-element, .list-item-content__button, .btn');
        const card = s.querySelector('.list-item, .user-items-list-simple .list-item');
        return {
          i: i + 1, theme: s.getAttribute('data-section-theme'),
          bg: getComputedStyle(bgEl).backgroundColor,
          overlay: ov ? getComputedStyle(ov).backgroundColor + ' op=' + getComputedStyle(ov).opacity : null,
          heading: h ? { tag: h.tagName, ...st(h, ['color', 'fontFamily', 'fontWeight', 'fontSize', 'lineHeight', 'letterSpacing', 'textTransform']) } : null,
          p: st(p, ['color', 'fontFamily', 'fontWeight', 'fontSize', 'lineHeight']),
          link: st(a, ['color', 'textDecorationLine']),
          button: btn ? { text: btn.innerText.trim(), ...st(btn, ['color', 'backgroundColor', 'fontFamily', 'fontWeight', 'fontSize', 'borderRadius', 'padding', 'border', 'textTransform', 'letterSpacing']) } : null,
          card: st(card, ['backgroundColor', 'borderRadius', 'boxShadow']),
        };
      });
      const header = document.querySelector('header#header');
      const hb = header && header.querySelector('.header-background, .header-announcement-bar-wrapper');
      const navA = document.querySelector('.header-display-desktop .header-nav-folder-title, .header-display-desktop .header-nav-item a');
      const folder = document.querySelector('.header-display-desktop .header-nav-folder-content');
      const folderA = folder && folder.querySelector('a');
      const footer = document.querySelector('footer#footer-sections');
      const fsec = footer && footer.querySelector('section');
      return {
        sections: secs,
        header: { theme: header?.getAttribute('data-section-theme'), pos: header && getComputedStyle(header).position, bg: header && getComputedStyle(header).backgroundColor, bgEl: hb && getComputedStyle(hb).backgroundColor, height: header?.getBoundingClientRect().height, classes: header?.className },
        nav: st(navA, ['color', 'fontFamily', 'fontWeight', 'fontSize', 'letterSpacing', 'textTransform']),
        folder: { box: st(folder, ['backgroundColor', 'borderRadius', 'boxShadow', 'padding']), link: st(folderA, ['color', 'fontFamily', 'fontSize']) },
        footer: { theme: fsec?.getAttribute('data-section-theme'), bg: fsec && getComputedStyle(fsec.querySelector('.section-background') || fsec).backgroundColor, p: st(footer?.querySelector('p'), ['color', 'fontFamily', 'fontSize', 'fontWeight']), a: st(footer?.querySelector('a'), ['color']) },
        rootVars: ['--white-hsl', '--black-hsl', '--accent-hsl', '--lightAccent-hsl', '--darkAccent-hsl', '--safeLightAccent-hsl', '--safeDarkAccent-hsl'].map(v => v + '=' + getComputedStyle(document.documentElement).getPropertyValue(v)),
      };
    });
    // hover state on first nav folder + first button
    const hover = {};
    try {
      const nav = page.locator('.header-display-desktop .header-nav-folder-title').first();
      await nav.hover(); await page.waitForTimeout(500);
      hover.folderOpen = await page.evaluate(() => { const f = [...document.querySelectorAll('.header-display-desktop .header-nav-item--folder')].find(x => getComputedStyle(x.querySelector('.header-nav-folder-content')).opacity === '1' || x.matches(':hover')); return f ? f.innerText : null; });
      await page.screenshot({ path: out.replace('.json', '-navhover.jpg'), type: 'jpeg', quality: 60, clip: { x: 0, y: 0, width: 1440, height: 450 } });
      const b = page.locator('main .sqs-block-button-element').first();
      if (await b.count()) {
        await b.scrollIntoViewIfNeeded();
        const before = await b.evaluate(e => [getComputedStyle(e).backgroundColor, getComputedStyle(e).color, getComputedStyle(e).opacity, getComputedStyle(e).transition]);
        await b.hover(); await page.waitForTimeout(600);
        const after = await b.evaluate(e => [getComputedStyle(e).backgroundColor, getComputedStyle(e).color, getComputedStyle(e).opacity]);
        hover.button = { before, after };
      }
    } catch (e) { hover.err = e.message; }
    results.push({ url, ...data, hover });
  }
  // hexify
  const json = JSON.stringify(results, null, 1).replace(/rgba?\([\d.,\s]+\)/g, m => toHex(m) + ' ' + m);
  fs.writeFileSync(out, json);
  await browser.close();
})();
