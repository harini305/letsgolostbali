const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1208/chrome-win64/chrome.exe';
(async () => {
  const b = await chromium.launch({ executablePath: EXE });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const out = {};
  for (const r of ['/faqs', '/sustainability', '/reiki-courses', '/our-teachers', '/meditations', '/spain', '/contact', '/store', '/store/courses', '/store/gift-vouchers', '/store/class-packages', '/store/p/reiki-level-1', '/store/p/reiki-level-1-g6rr3', '/store/p/reiki-level-1-g6rr3-flxph', '/store/p/100-hour-breathwork-teaining', '/store/p/6-month-online-breathwork-teacher-training', '/store/p/gift-voucher']) {
    await p.goto('https://www.letsgetlostbali.com' + r, { waitUntil: 'networkidle' }).catch(() => { });
    out[r] = await p.evaluate(() => {
      const tc = e => e ? e.textContent.replace(/\s+/g, ' ').trim() : '';
      return {
        accordions: [...document.querySelectorAll('.accordion-item')].map(a => ({ q: tc(a.querySelector('.accordion-item__title')), a: tc(a.querySelector('.accordion-item__description')) })),
        dropdowns: [...document.querySelectorAll('.dropdown')].map(d => ({ q: tc(d.querySelector('h3')), a: tc(d.querySelector('.answer')) })),
        codeBlocks: [...document.querySelectorAll('.sqs-block-code, .code-block')].map(c => c.innerHTML.slice(0, 600)),
        product: document.querySelector('.ProductItem, .product-detail') ? {
          title: tc(document.querySelector('.ProductItem-details-title, .product-title')),
          price: tc(document.querySelector('.ProductItem-details .product-price, .product-price')),
          excerpt: tc(document.querySelector('.ProductItem-details-excerpt, .product-description')),
          variants: [...document.querySelectorAll('.variant-option, select')].map(tc),
          button: tc(document.querySelector('.sqs-add-to-cart-button, .product-add-to-cart')),
          more: tc(document.querySelector('.ProductItem-additional, .product-detail ~ section')).slice(0, 1500),
          images: [...document.querySelectorAll('.ProductItem-gallery img, .product-gallery img')].map(i => (i.getAttribute('data-src') || i.src).split('?')[0]),
        } : null,
        grid: [...document.querySelectorAll('.ProductList-item, .grid-item, .product-list-item')].map(g => ({ title: tc(g.querySelector('.ProductList-title, .grid-title, .product-list-item-title')), price: tc(g.querySelector('.product-price, .grid-prices, .ProductList-price')), href: g.querySelector('a')?.getAttribute('href'), status: tc(g.querySelector('.product-mark, .grid-meta-status, .sold-out')) })),
        categories: [...document.querySelectorAll('.ProductList-filter-list-item, .nested-category-tree-wrapper a, .product-list-category-nav a')].map(tc),
        maps: [...document.querySelectorAll('.sqs-block-map, .map-block')].map(m => m.getAttribute('data-block-json')?.slice(0, 600)),
        mailerliteEmbeds: [...document.querySelectorAll('[class*=ml-embedded], .ml-form-embedContainer, [data-form]')].map(e => (e.getAttribute('data-form') || '') + ' ' + tc(e).slice(0, 300)),
      };
    });
  }
  fs.writeFileSync(process.argv[2], JSON.stringify(out, null, 1));
  await b.close();
})();
