import { test, expect, type Page } from '@playwright/test';

const ALLOWED_HOSTS = [
  'ig.me', 'www.instagram.com', 'www.youtube.com', 'www.tiktok.com', 'www.strava.com', 'www.threads.com',
  'www.facebook.com', 'results.racetimermorocco.com', 'mansourtechnologies.com',
];

async function load(page: Page) {
  const errors: string[] = [];
  const bad: string[] = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith('http://localhost')) bad.push(`${r.status()} ${r.url()}`); });
  await page.goto('./', { waitUntil: 'networkidle' });
  return { errors, bad };
}

test('loads without console errors or local 404s', async ({ page }) => {
  const { errors, bad } = await load(page);
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } });
  expect(bad).toEqual([]);
  expect(errors).toEqual([]);
});

test('notice, noindex, robots and absolute OG tags', async ({ page, request }) => {
  await load(page);
  await expect(page.locator('.notice')).toHaveText('Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.');
  await expect(page.locator('.foot__notice')).toContainText('Démonstration non officielle');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  const agency = page.locator('.foot__agency a');
  await expect(agency).toHaveAttribute('href', 'https://mansourtechnologies.com/');
  for (const sel of ['meta[property="og:image"]', 'meta[property="og:url"]', 'meta[name="twitter:image"]']) {
    const v = await page.locator(sel).getAttribute('content');
    expect(v).toMatch(/^https:\/\/mansour-technologies\.github\.io\/saad-khaled-website-concept\//);
  }
  const robots = await request.get('robots.txt');
  expect(await robots.text()).toContain('Disallow: /');
  expect((await request.get('og.png')).status()).toBe(200);
});

test('anchor navigation reaches every section', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await load(page);
  for (const id of ['parcours', 'chrono', 'terrain', 'partenaires', 'arrivee']) {
    await page.locator(`.mast__inline a[href="#${id}"]`).click();
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});

test('mobile route menu: keyboard open, focus trap, Escape closes and restores focus', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await load(page);
  const btn = page.locator('[data-menu-open]');
  await btn.focus();
  await page.keyboard.press('Enter');
  const menu = page.locator('#route-nav');
  await expect(menu).toBeVisible();
  await expect(btn).toHaveAttribute('aria-expanded', 'true');
  const n = await menu.locator('a[href], button').count();
  for (let i = 0; i < n + 1; i++) await page.keyboard.press('Tab');
  expect(await page.evaluate(() => !!document.activeElement?.closest('#route-nav'))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(btn).toBeFocused();
  await btn.click();
  await menu.locator('a[href="#chrono"]').click();
  await expect(menu).toBeHidden();
  await expect(page.locator('#chrono')).toBeInViewport();
});

test('external links: https, allowed domains, new tab with noopener', async ({ page }) => {
  await load(page);
  const links = await page.locator('a[href^="http"]').evaluateAll((els) => els.map((a) => ({ href: (a as HTMLAnchorElement).href, target: a.getAttribute('target'), rel: a.getAttribute('rel') || '' })));
  expect(links.length).toBeGreaterThan(20);
  for (const l of links) {
    const u = new URL(l.href);
    expect(u.protocol, l.href).toBe('https:');
    expect(ALLOWED_HOSTS, l.href).toContain(u.hostname);
    expect(l.target, l.href).toBe('_blank');
    expect(l.rel, l.href).toContain('noopener');
  }
  expect(await page.locator('a[href*="wa.me"]').count()).toBe(0); // whatsapp: null
  await expect(page.locator('.finish a[href="https://ig.me/m/saad.khaledd"]')).toBeVisible();
});

test('YouTube facades: no iframe until click, then youtube-nocookie of the same Short', async ({ page }) => {
  await load(page);
  expect(await page.locator('iframe').count()).toBe(0);
  const facades = page.locator('.poster__btn');
  expect(await facades.count()).toBeGreaterThanOrEqual(12);
  for (const b of await facades.all()) await expect(b).toHaveAttribute('aria-label', /^Lire la vidéo officielle : /);
  const lazy = await page.locator('.poster__btn img[loading="lazy"]').count();
  expect(lazy).toBe((await facades.count()) - 1); // only the hero poster is eager
  const target = page.locator('#terrain .poster__btn').first();
  const id = await target.getAttribute('data-yt');
  await target.scrollIntoViewIfNeeded();
  await target.click();
  const frame = page.locator(`#terrain iframe[src^="https://www.youtube-nocookie.com/embed/${id}"]`);
  await expect(frame).toHaveCount(1);
});

test('poster fallback renders when the official image fails', async ({ page }) => {
  await page.route('https://i.ytimg.com/**', (r) => r.abort());
  await page.goto('./');
  await expect(page.locator('.poster.is-broken').first()).toBeAttached();
  await expect(page.locator('#parcours .poster .poster__fallback')).toBeVisible();
});

test('Instagram embed is click-to-load', async ({ page }) => {
  await load(page);
  expect(await page.locator('iframe[src*="instagram.com"]').count()).toBe(0);
  await page.locator('[data-ig="DZ76vOwjYxz"]').click();
  await expect(page.locator('iframe[src="https://www.instagram.com/p/DZ76vOwjYxz/embed/"]')).toHaveCount(1);
});

test('every result links to its official RaceTimer page', async ({ page }) => {
  await load(page);
  const hrefs = await page.locator('.bib__src').evaluateAll((els) => els.map((a) => (a as HTMLAnchorElement).href));
  expect(hrefs).toHaveLength(5);
  for (const h of hrefs) expect(h).toMatch(/^https:\/\/results\.racetimermorocco\.com\/fr\/event\/\d+\/participants\/\d+$/);
});

for (const w of [320, 360, 375, 390, 393, 430, 768, 1024, 1440, 1920]) {
  test(`no horizontal overflow at ${w}px`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: 900 });
    await load(page);
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(sw).toBeLessThanOrEqual(w);
  });
}

test('tap targets at 375 are at least 44px', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await load(page);
  const small = await page.evaluate(() => [...document.querySelectorAll('a, button')].filter((el) => {
    const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    if (!r.width || cs.visibility === 'hidden' || el.closest('[hidden]') || el.closest('.sr-only')) return false;
    if (el.closest('p') && !el.classList.length) return false; // inline text links in running copy
    return r.height < 44 && r.width < 44;
  }).map((el) => el.outerHTML.slice(0, 80)));
  expect(small).toEqual([]);
});

test('unknown routes return the 404 page', async ({ request }) => {
  const r = await request.get('espace/');
  expect(r.status()).toBe(404);
});
