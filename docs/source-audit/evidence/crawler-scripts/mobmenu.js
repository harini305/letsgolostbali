const { chromium } = require('playwright-core');
const EXE = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1208/chrome-win64/chrome.exe';
const shot = process.argv[2];
(async () => {
  const b = await chromium.launch({ executablePath: EXE });
  for (const vw of [390, 768]) {
    const ctx = await b.newContext({ viewport: { width: vw, height: vw < 700 ? 844 : 1024 }, isMobile: true, hasTouch: true });
    const p = await ctx.newPage();
    await p.goto('https://www.letsgetlostbali.com/', { waitUntil: 'networkidle' }).catch(() => { });
    await p.waitForTimeout(3000);
    const popupInfo = await p.evaluate(() => { const els = [...document.querySelectorAll('[class*=ml-form-embedContainer], .ml-popup, [id^=mlb2], .mailerlite-popup, iframe[src*=mailerlite]')]; const r = els.map(e => ({ tag: e.tagName, cls: String(e.className).slice(0, 60), z: getComputedStyle(e).zIndex, rect: [e.getBoundingClientRect().width, e.getBoundingClientRect().height].map(Math.round) })); els.forEach(e => (e.closest('[style*=z-index]') || e).remove()); return r; });
    console.log(vw, 'popup', JSON.stringify(popupInfo));
    const vis = await p.evaluate(() => { const bt = document.querySelector('.header-burger-btn'); const r = bt.getBoundingClientRect(); return { r: [r.x, r.y, r.width, r.height].map(Math.round), disp: getComputedStyle(bt).display, vis: getComputedStyle(bt).visibility, op: getComputedStyle(bt.closest('.header-burger')).opacity }; });
    console.log(vw, 'burger', JSON.stringify(vis));
    await p.evaluate(() => document.querySelector('.header-display-mobile .header-burger-btn, .header-burger-btn').click());
    await p.waitForTimeout(1000);
    await p.screenshot({ path: `${shot}/interaction__mobile-menu-open__${vw}.jpg`, type: 'jpeg', quality: 60 });
    console.log(vw, 'menu', JSON.stringify(await p.evaluate(() => ({ open: document.body.className.includes('header--menu-open'), bg: getComputedStyle(document.querySelector('.header-menu-bg') || document.querySelector('.header-menu')).backgroundColor, items: [...document.querySelectorAll('.header-menu-nav-folder[data-folder=root] .header-menu-nav-item a')].map(a => a.innerText.trim()), cta: [...document.querySelectorAll('.header-menu-cta a')].map(a => a.innerText.trim()), socials: document.querySelectorAll('.header-menu-actions a').length }))));
    await p.evaluate(() => document.querySelector('.header-menu-nav a[data-folder-id="/teacher-trainings"]')?.click());
    await p.waitForTimeout(900);
    await p.screenshot({ path: `${shot}/interaction__mobile-menu-teacher-trainings-folder__${vw}.jpg`, type: 'jpeg', quality: 60 });
    console.log(vw, 'folder', JSON.stringify(await p.evaluate(() => [...document.querySelectorAll('.header-menu-nav-folder--active a')].map(a => a.innerText.trim()))));
    await ctx.close();
  }
  await b.close();
})();
