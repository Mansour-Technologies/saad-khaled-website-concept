// Captures a page at 375 (mobile) and 1440 (desktop) first screen + the full page.
import { chromium } from '@playwright/test';
const [url, out] = process.argv.slice(2);
const b = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
for (const [w, h, m, n] of [[375, 812, true, 'mobile'], [1440, 900, false, 'desktop']]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: m ? 2 : 1, isMobile: m, hasTouch: m });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.waitForTimeout(3500);
  await p.screenshot({ path: `${out}-${n}.png` });
  const vh = await p.evaluate(() => [document.querySelector('.hero, header, section')?.getBoundingClientRect().height, innerHeight]);
  console.log(n, vh);
  await ctx.close();
}
await b.close();
