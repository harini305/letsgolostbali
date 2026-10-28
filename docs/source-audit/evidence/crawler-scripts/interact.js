// Tests visible interactive states; writes notes JSON + screenshots.
const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1208/chrome-win64/chrome.exe';
const [, , outJson, shotDir] = process.argv;
const B = 'https://www.letsgetlostbali.com';
const notes = {};
const log = (k, v) => { notes[k] = v; console.log(k, JSON.stringify(v).slice(0, 400)); };

(async () => {
  const browser = await chromium.launch({ executablePath: EXE });

  // 1. Mobile menu
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const p = await ctx.newPage();
    await p.goto(B + '/', { waitUntil: 'networkidle' }).catch(() => { });
    await p.waitForTimeout(1500);
    await p.screenshot({ path: shotDir + '/interaction__mobile-home-first-view__390.jpg', type: 'jpeg', quality: 60 });
    const popup = await p.evaluate(() => [...document.querySelectorAll('iframe')].map(f => f.src).filter(s => /mailerlite/.test(s)));
    log('mobile.mailerlitePopupIframes', popup);
    try {
      await p.locator('.header-burger-btn').first().click({ force: true });
      await p.waitForTimeout(900);
      await p.screenshot({ path: shotDir + '/interaction__mobile-menu-open__390.jpg', type: 'jpeg', quality: 60 });
      const top = await p.evaluate(() => [...document.querySelectorAll('.header-menu-nav-folder[data-folder="root"] a, .header-menu-nav-list > div > div > a')].filter(a => a.offsetParent).map(a => a.innerText.trim()));
      log('mobile.menuRootItems', top);
      await p.locator('.header-menu-nav a[data-folder-id="/teacher-trainings"]').first().click({ force: true });
      await p.waitForTimeout(900);
      await p.screenshot({ path: shotDir + '/interaction__mobile-menu-folder-teacher-trainings__390.jpg', type: 'jpeg', quality: 60 });
      const sub = await p.evaluate(() => [...document.querySelectorAll('.header-menu-nav-folder--active a')].map(a => a.innerText.trim()));
      log('mobile.teacherTrainingsFolder', sub);
      const menuBg = await p.evaluate(() => getComputedStyle(document.querySelector('.header-menu')).backgroundColor);
      log('mobile.menuOverlayBg', menuBg);
    } catch (e) { log('mobile.menuErr', e.message); }
    await ctx.close();
  }

  // 2. Desktop: MailerLite popup + header scroll behaviour + dropdown
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(B + '/', { waitUntil: 'networkidle' }).catch(() => { });
    await p.waitForTimeout(4000);
    await p.screenshot({ path: shotDir + '/interaction__desktop-home-first-view__1440.jpg', type: 'jpeg', quality: 60 });
    const ml = await p.evaluate(() => [...document.querySelectorAll('iframe, [class*=ml-], [id*=mlb2]')].filter(e => e.getBoundingClientRect().width > 0).map(e => ({ tag: e.tagName, id: e.id, cls: String(e.className).slice(0, 80), src: e.src || '', rect: JSON.stringify(e.getBoundingClientRect()) })));
    log('desktop.visibleIframesAndMailerlite', ml);
    const mlScripts = await p.evaluate(() => [...document.scripts].map(s => s.src || s.textContent.slice(0, 200)).filter(s => /mailerlite|ml\(/i.test(s)));
    log('desktop.mailerliteScripts', mlScripts);
    // try to read popup content
    for (const f of p.frames()) if (/mailerlite/.test(f.url())) { const t = await f.evaluate(() => document.body.innerText).catch(() => ''); log('desktop.mailerlitePopupText', t.slice(0, 1500)); }
    await p.keyboard.press('Escape');
    await p.mouse.wheel(0, 1500); await p.waitForTimeout(800);
    log('desktop.headerAfterScroll', await p.evaluate(() => { const h = document.querySelector('header#header'); const r = h.getBoundingClientRect(); return { pos: getComputedStyle(h).position, top: r.top, cls: h.className.replace(/\s+/g, ' ') }; }));
    await p.screenshot({ path: shotDir + '/interaction__desktop-home-scrolled__1440.jpg', type: 'jpeg', quality: 60 });
    await ctx.close();
  }

  // 3. FAQ toggles
  {
    const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(B + '/faqs', { waitUntil: 'networkidle' }).catch(() => { });
    const info = await p.evaluate(() => ({ dropdowns: document.querySelectorAll('.dropdown').length, accordions: document.querySelectorAll('.accordion-item').length, answersHidden: [...document.querySelectorAll('.answer')].filter(a => getComputedStyle(a).display === 'none').length, codeBlocks: document.querySelectorAll('.code-block, .sqs-block-code').length, scriptsInline: [...document.querySelectorAll('main script')].map(s => s.textContent.slice(0, 300)) }));
    log('faqs.structure', info);
    const first = p.locator('.dropdown h3, .accordion-item__click-target').first();
    if (await first.count()) {
      await first.scrollIntoViewIfNeeded(); await first.click({ force: true }); await p.waitForTimeout(700);
      log('faqs.afterClickVisibleAnswers', await p.evaluate(() => [...document.querySelectorAll('.answer, .accordion-item__dropdown')].filter(a => getComputedStyle(a).display !== 'none' && a.getBoundingClientRect().height > 0).length));
      await p.screenshot({ path: shotDir + '/interaction__faqs-toggle-open__1440.jpg', type: 'jpeg', quality: 60 });
    }
    await p.close();
  }

  // 4. Contact form
  {
    const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(B + '/contact', { waitUntil: 'networkidle' }).catch(() => { });
    const f = await p.evaluate(() => [...document.querySelectorAll('form')].map(f => ({ html: f.outerHTML.length, fields: [...f.querySelectorAll('input,textarea,select')].filter(i => i.type !== 'hidden').map(i => ({ type: i.type, name: i.name, aria: i.getAttribute('aria-required'), label: (i.closest('.form-item, fieldset')?.querySelector('label, legend')?.innerText || i.placeholder || '').trim() })), submit: f.querySelector('[type=submit],button')?.innerText })));
    log('contact.forms', f);
    const iframes = await p.evaluate(() => [...document.querySelectorAll('iframe')].map(i => i.src));
    log('contact.iframes', iframes);
    // visible validation: submit empty
    const btn = p.locator('main form button[type=submit], main form [type=submit]').first();
    if (await btn.count()) {
      await btn.scrollIntoViewIfNeeded(); await btn.click({ force: true }); await p.waitForTimeout(1200);
      log('contact.emptySubmitErrors', await p.evaluate(() => [...document.querySelectorAll('.field-error, [class*=error]')].map(e => e.innerText.trim()).filter(Boolean).slice(0, 12)));
      await p.screenshot({ path: shotDir + '/interaction__contact-empty-submit-validation__1440.jpg', type: 'jpeg', quality: 60, fullPage: false });
    }
    await p.close();
  }

  // 5. Store product: add-to-cart visible controls (do NOT complete checkout)
  {
    const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(B + '/store/p/reiki-level-1', { waitUntil: 'networkidle' }).catch(() => { });
    log('store.productControls', await p.evaluate(() => ({ variants: [...document.querySelectorAll('select')].map(s => ({ name: s.getAttribute('aria-label') || s.name, options: [...s.options].map(o => o.text) })), qty: !!document.querySelector('input[type=number], .product-quantity-input'), addBtn: document.querySelector('.sqs-add-to-cart-button, .product-add-to-cart button, [data-test=add-to-cart]')?.innerText?.trim(), price: document.querySelector('.product-price')?.innerText?.trim() })));
    await p.close();
    const c = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const r = await c.goto(B + '/cart', { waitUntil: 'networkidle' }).catch(() => null);
    log('store.cartPage', { status: r && r.status(), text: (await c.evaluate(() => document.body.innerText)).slice(0, 400) });
    await c.screenshot({ path: shotDir + '/interaction__cart-empty__1440.jpg', type: 'jpeg', quality: 60 });
    await c.close();
  }

  fs.writeFileSync(outJson, JSON.stringify(notes, null, 1));
  await browser.close();
})();
