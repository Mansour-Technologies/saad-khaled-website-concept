// Tiny client layer: route menu (focus trap + Escape), click-to-play facades, reveals, header state.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add('js');

/* ---------- Route menu ---------- */
const menu = document.querySelector<HTMLElement>('[data-menu]');
const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
const closeBtn = document.querySelector<HTMLButtonElement>('[data-menu-close]');
let lastFocus: HTMLElement | null = null;

function focusables(): HTMLElement[] {
  return menu ? Array.from(menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')) : [];
}
function openMenu() {
  if (!menu || !openBtn) return;
  lastFocus = document.activeElement as HTMLElement;
  menu.hidden = false;
  requestAnimationFrame(() => menu.classList.add('is-open'));
  openBtn.setAttribute('aria-expanded', 'true');
  document.body.classList.add('menu-open');
  focusables()[0]?.focus();
}
function closeMenu(restore = true) {
  if (!menu || !openBtn || menu.hidden) return;
  menu.classList.remove('is-open');
  openBtn.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
  menu.hidden = true;
  if (restore) (lastFocus ?? openBtn).focus();
}
openBtn?.addEventListener('click', openMenu);
closeBtn?.addEventListener('click', () => closeMenu());
menu?.querySelectorAll('[data-menu-link]').forEach((a) => a.addEventListener('click', () => closeMenu(false)));
document.addEventListener('keydown', (e) => {
  if (!menu || menu.hidden) return;
  if (e.key === 'Escape') { e.preventDefault(); closeMenu(); }
  if (e.key === 'Tab') {
    const f = focusables();
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* ---------- Click-to-play YouTube facades (youtube-nocookie, loaded only on click) ---------- */
document.querySelectorAll<HTMLButtonElement>('[data-yt]').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.hasAttribute('data-proxy')) {
      const target = document.querySelector<HTMLButtonElement>(`.poster [data-yt="${btn.dataset.yt}"]`);
      if (target) { target.click(); btn.hidden = true; target.closest('.poster')?.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' }); }
      return;
    }
    const id = btn.dataset.yt!;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;
    iframe.title = `Vidéo officielle YouTube : ${btn.dataset.title ?? ''}`;
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    iframe.loading = 'eager';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.className = 'poster__frame';
    const fig = btn.closest('.poster');
    fig?.classList.add('is-playing');
    btn.replaceWith(iframe);
    iframe.focus();
  });
});

/* ---------- Instagram official embeds, loaded only on click ---------- */
document.querySelectorAll<HTMLButtonElement>('[data-ig]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.instagram.com/p/${btn.dataset.ig}/embed/`;
    iframe.title = btn.dataset.title ?? 'Publication Instagram officielle';
    iframe.className = 'igframe';
    iframe.setAttribute('scrolling', 'no');
    btn.closest('.igembed')?.classList.add('is-loaded');
    btn.replaceWith(iframe);
  });
});

/* ---------- Reveal on scroll ---------- */
const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (!reduce && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('is-in'));
}

/* ---------- Header state + route progress ---------- */
const mast = document.querySelector<HTMLElement>('[data-mast]');
const prog = document.querySelector<HTMLElement>('[data-progress]');
let ticking = false;
function onScroll() {
  ticking = false;
  const y = window.scrollY;
  mast?.classList.toggle('is-solid', y > 40);
  if (prog) {
    prog.classList.toggle('is-on', y > window.innerHeight * 0.6);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, y / max) : 0;
    prog.style.setProperty('--p', p.toFixed(4));
    const km = (p * 21.1).toFixed(1).replace('.', ',');
    const out = prog.querySelector('[data-km]');
    if (out) out.textContent = km;
  }
}
window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();
