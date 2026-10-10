/* Small, dependency-free statistics used by the analytical labs.
   Approximations are documented inline; they are accurate to well under
   1% for the sample sizes these tools use (n >= 3). */

export const mean = (a) => a.reduce((s, x) => s + x, 0) / a.length;
export const sd = (a) => { const m = mean(a); return Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1)); };
export const rsd = (a) => (100 * sd(a)) / mean(a);

// Least-squares fit y = a + b x, with r, R², residuals, residual SD (Sy.x)
export function linreg(xs, ys) {
  const n = xs.length, mx = mean(xs), my = mean(ys);
  let sxx = 0, sxy = 0, syy = 0;
  for (let i = 0; i < n; i++) { sxx += (xs[i] - mx) ** 2; sxy += (xs[i] - mx) * (ys[i] - my); syy += (ys[i] - my) ** 2; }
  const b = sxy / sxx, a = my - b * mx;
  const res = ys.map((y, i) => y - (a + b * xs[i]));
  const ssr = res.reduce((s, r) => s + r * r, 0);
  const syx = Math.sqrt(ssr / (n - 2));
  const r = sxy / Math.sqrt(sxx * syy);
  return { a, b, r, r2: r * r, res, syx, seB: syx / Math.sqrt(sxx), seA: syx * Math.sqrt(1 / n + mx * mx / sxx) };
}

// Inverse standard normal (Acklam's rational approximation, |error| < 1.2e-9)
export function zInv(p) {
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const pl = 0.02425;
  if (p < pl) { const q = Math.sqrt(-2 * Math.log(p)); return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  if (p > 1 - pl) return -zInv(1 - p);
  const q = p - 0.5, r = q * q;
  return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}

// Student t quantile via Cornish-Fisher expansion (good for df >= 3)
export function tInv(p, df) {
  const z = zInv(p);
  const z3 = z ** 3, z5 = z ** 5, z7 = z ** 7;
  return z + (z3 + z) / (4 * df) + (5 * z5 + 16 * z3 + 3 * z) / (96 * df ** 2) + (3 * z7 + 19 * z5 + 17 * z3 - 15 * z) / (384 * df ** 3);
}

// Chi-square lower quantile via Wilson-Hilferty
export function chi2Inv(p, df) {
  const z = zInv(p);
  return df * (1 - 2 / (9 * df) + z * Math.sqrt(2 / (9 * df))) ** 3;
}

// Two-sided normal tolerance factor k (Howe 1969): covers `coverage` of the
// population with `confidence`. Used for specification setting.
export function tolK(n, coverage = 0.99, confidence = 0.95) {
  const nu = n - 1;
  const z = zInv((1 + coverage) / 2);
  return Math.sqrt((nu * (1 + 1 / n) * z * z) / chi2Inv(1 - confidence, nu));
}

// Deterministic pseudo-random normal generator (seeded) so demo data is stable
export function rng(seed = 1) {
  let s = seed % 2147483647; if (s <= 0) s += 2147483646;
  const u = () => (s = (s * 16807) % 2147483647) / 2147483647;
  return { u, n: () => Math.sqrt(-2 * Math.log(u() || 1e-9)) * Math.cos(2 * Math.PI * u()) };
}

export const fmt = (x, d = 2) => (Number.isFinite(x) ? x.toFixed(d) : "–");
