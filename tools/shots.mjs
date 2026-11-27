// Usage: node tools/shots.mjs <outDir> [url]
// Captures the screenshot set required by the brief.
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
const out = process.argv[2] || 'shots';
const url = process.argv[3] || 'http://localhost:4417/saad-khaled-website-concept/';
const exe = process.env.PW_CHROMIUM;
mkdirSync(out, { recursive: true });
const b = await chromium.launch(exe ? { executablePath: exe } : {});
async function page(w, h, mobile) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile, locale: 'fr-FR' });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(3800);
  return p;
}
async function full(p, path) {
  // trigger reveals
  await p.evaluate(() => { document.querySelectorAll('img[loading=lazy]').forEach((i) => { i.loading = 'eager'; }); });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); } window.scrollTo(0, 0); });
  await p.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-in')));
  await p.waitForLoadState('networkidle');
  await p.waitForTimeout(1500);
  await p.screenshot({ path, fullPage: true });
}
async function section(p, sel, path) {
  await p.locator(sel).scrollIntoViewIfNeeded();
  await p.evaluate((s) => { const el = document.querySelector(s); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 8); }, sel);
  await p.waitForTimeout(1200);
  await p.screenshot({ path });
}
const d = await page(1440, 900, false);
await d.screenshot({ path: `${out}/desktop-hero.png` });
for (const [s, n] of [['#parcours', 'bio'], ['#chrono', 'achievements'], ['#partenaires', 'services'], ['#terrain', 'photography'], ['#arrivee', 'contact']]) await section(d, s, `${out}/desktop-${n}.png`);
await full(d, `${out}/desktop-full.png`);
const m = await page(390, 844, true);
await m.screenshot({ path: `${out}/mobile-hero.png` });
for (const [s, n] of [['#parcours', 'bio'], ['#chrono', 'achievements'], ['#partenaires', 'services'], ['#terrain', 'photography'], ['#arrivee', 'contact']]) await section(m, s, `${out}/mobile-${n}.png`);
await m.evaluate(() => window.scrollTo(0, 0)); await m.waitForTimeout(400);
await m.click('[data-menu-open]'); await m.waitForTimeout(500);
await m.screenshot({ path: `${out}/mobile-nav.png` });
await m.keyboard.press('Escape');
// Chromium's mobile emulation tiles full-page captures incorrectly; use a 390px desktop-mode context for the full page.
const mf = await page(390, 844, false);
await full(mf, `${out}/mobile-full.png`);
const s = await page(390, 844, true);
await s.screenshot({ path: `${out}/share-preview.png` });
await b.close();
console.log('done', out);
