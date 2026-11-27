// Renders the original Open Graph image (no personal photo) to public/og.png.
import { chromium } from '@playwright/test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { writeFileSync, rmSync } from 'node:fs';
const root = fileURLToPath(new URL('..', import.meta.url));
const f = (p) => pathToFileURL(root + 'node_modules/' + p).href;
let rings = '';
for (let i = 1; i <= 16; i++) {
  const pts = [];
  for (let k = 0; k <= 80; k++) {
    const t = (k / 80) * Math.PI * 2, r = i * 26;
    const d = 1 + 0.16 * Math.sin(3 * t + 1.3 + i * .21) + 0.07 * Math.sin(5 * t + 2.6 - i * .13);
    pts.push(`${k ? 'L' : 'M'}${(900 + Math.cos(t) * r * d * 1.25).toFixed(1)} ${(250 + Math.sin(t) * r * d * .85).toFixed(1)}`);
  }
  rings += `<path d="${pts.join(' ')}Z" fill="none" stroke="#e08a5f" stroke-opacity="${i % 5 === 0 ? .55 : .28}" stroke-width="${i % 5 === 0 ? 1.6 : 1}"/>`;
}
const html = `<!doctype html><html><head><style>
@font-face{font-family:BS;src:url(${f('@fontsource-variable/big-shoulders-display/files/big-shoulders-display-latin-wght-normal.woff2')});font-weight:100 900}
@font-face{font-family:SS;font-style:italic;src:url(${f('@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-italic.woff2')});font-weight:200 900}
@font-face{font-family:MM;src:url(${f('@fontsource-variable/martian-mono/files/martian-mono-latin-wght-normal.woff2')});font-weight:100 800}
html,body{margin:0}body{width:1200px;height:630px;background:#1b1714;color:#ede8e0;position:relative;overflow:hidden;font-family:MM}
svg{position:absolute;inset:0}
.k{position:absolute;left:64px;top:56px;font:500 18px MM;letter-spacing:.1em;color:#e08a5f;text-transform:uppercase}
.n{position:absolute;left:58px;top:92px;font:900 210px/.8 BS;text-transform:uppercase}
.n b{display:block;color:transparent;-webkit-text-stroke:3px #e08a5f;font-weight:900}
.q{position:absolute;left:64px;bottom:118px;font:italic 450 40px SS}
.c{position:absolute;left:0;right:0;bottom:0;height:64px;background:#b4532f;color:#fff;display:flex;align-items:center;padding:0 64px;font:500 17px MM}
.t{position:absolute;right:64px;top:60px;text-align:right;font:500 15px/1.6 MM;color:#b8ada1}
.t b{display:block;font:300 64px/1 MM;color:#ede8e0;letter-spacing:-.05em}
</style></head><body>
<svg viewBox="0 0 1200 630">${rings}<path d="M0 470 C200 470 260 380 420 400 S700 520 860 430 1100 300 1200 330" fill="none" stroke="#e08a5f" stroke-width="3"/></svg>
<div class="k">Running &amp; trail · Maroc</div>
<div class="n">Saad<b>Khaled</b></div>
<div class="t">Meilleur 10 km officiel relevé<b>51:31</b>Deca Run 2026</div>
<div class="q">« Discipline en personne. »</div>
<div class="c">Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.</div>
</body></html>`;
const b = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
const tmp = root + 'tools/.og-render.html';
writeFileSync(tmp, html);
await p.goto(pathToFileURL(tmp).href, { waitUntil: 'load' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(300);
await p.screenshot({ path: root + 'public/og.png' });
await b.close();
rmSync(tmp);
console.log('og.png written');
