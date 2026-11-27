// Deterministic, abstract contour lines (not a real route or place).
type Ring = { cx: number; cy: number; rings: number; step: number; seed: number };
const f = (n: number) => Math.round(n * 10) / 10;
export function contours(w: number, h: number, centers: Ring[]): string[] {
  const out: string[] = [];
  for (const c of centers) {
    for (let i = 1; i <= c.rings; i++) {
      const r = i * c.step;
      const pts: string[] = [];
      const N = 72;
      for (let k = 0; k <= N; k++) {
        const t = (k / N) * Math.PI * 2;
        const d = 1 + 0.16 * Math.sin(3 * t + c.seed + i * 0.21) + 0.07 * Math.sin(5 * t + c.seed * 2 - i * 0.13) + 0.04 * Math.cos(7 * t + i * 0.4);
        const x = c.cx + Math.cos(t) * r * d * 1.25;
        const y = c.cy + Math.sin(t) * r * d * 0.85;
        pts.push(`${k ? 'L' : 'M'}${f(x)} ${f(y)}`);
      }
      out.push(pts.join(' ') + 'Z');
    }
  }
  return out;
}
export function route(w: number, h: number, seed = 1): string {
  const pts: [number, number][] = [];
  const n = 9;
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * w;
    const y = h * (0.55 + 0.22 * Math.sin(i * 1.1 + seed) + 0.08 * Math.cos(i * 2.3 + seed * 3));
    pts.push([x, y]);
  }
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    const mx = (x0 + x1) / 2;
    d += ` C${f(mx)} ${f(y0)} ${f(mx)} ${f(y1)} ${f(x1)} ${f(y1)}`;
  }
  return d;
}
