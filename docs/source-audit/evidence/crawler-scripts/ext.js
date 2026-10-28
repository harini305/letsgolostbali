const { chromium } = require('playwright-core');
const EXE = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1208/chrome-win64/chrome.exe';
(async () => {
  const b = await chromium.launch({ executablePath: EXE });
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  for (const u of process.argv.slice(2)) {
    await p.goto(u, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => { });
    await p.waitForTimeout(2500);
    const t = await p.evaluate(() => document.body.innerText.replace(/\n{2,}/g, '\n').slice(0, 900));
    console.log('\n##', u, '\n', t.replace(/\n/g, ' | '));
  }
  await b.close();
})();
