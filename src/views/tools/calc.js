/* Pure calculations used by the Tools workbench. Kept separate from the UI so
   they can be tested. Each one follows a published formula or convention,
   named next to it; none of them makes a regulatory decision. */
import { linreg, tInv, tolK, mean, sd } from "../analytical/stats";

// Log reduction value per step, and the cumulative clearance claimed (ICH Q5A(R2)).
// Steps below 1 log are not counted, and two steps with the same mechanism are
// flagged rather than silently summed.
export function lrv(steps) {
  const rows = steps.map(s => {
    const v = Math.log10(s.inTiter) - Math.log10(s.outTiter);
    return { ...s, lrv: v, counted: Number.isFinite(v) && v >= 1 };
  });
  const counted = rows.filter(r => r.counted);
  const mechs = counted.map(r => r.mech);
  const dupes = [...new Set(mechs.filter((m, i) => mechs.indexOf(m) !== i))];
  return { rows, total: counted.reduce((s, r) => s + r.lrv, 0), dupes };
}

// Retrovirus-like particle safety margin: log10 particles expected per dose
// after clearance. Below zero means less than one particle per dose.
export function particleMargin({ rvlpPerMl, harvestLPerDose, totalLrv }) {
  const logPerDose = Math.log10(rvlpPerMl) + Math.log10(harvestLPerDose * 1000) - totalLrv;
  return { logPerDose, oneIn: Math.pow(10, -logPerDose) };
}

// Endotoxin limit (K/M) and maximum valid dilution, USP <85> and Ph. Eur. 2.6.14.
// K = 5 EU/kg for parenteral routes other than intrathecal; M = maximum dose per kg per hour.
export function endotoxin({ doseMgPerKg, concMgPerMl, lambda, K = 5 }) {
  const limit = K / doseMgPerKg;                // EU/mg
  const mvd = (limit * concMgPerMl) / lambda;   // dimensionless
  return { limit, mvd };
}

// Host-cell protein in ppm: ng HCP per mg product.
export const hcpPpm = (hcpNgPerMl, proteinMgPerMl) => hcpNgPerMl / proteinMgPerMl;

// Diafiltration with a freely permeating solute: fraction remaining = e^-N.
export const dfRemaining = (n) => Math.exp(-n);
export const dfVolumesFor = (fraction) => -Math.log(fraction);

// Two-sided tolerance interval (99% coverage, 95% confidence) from lot results.
export function tolerance(values, coverage = 0.99, confidence = 0.95) {
  const v = values.filter(Number.isFinite);
  if (v.length < 3) return null;
  const k = tolK(v.length, coverage, confidence), m = mean(v), s = sd(v);
  return { n: v.length, mean: m, sd: s, k, lo: m - k * s, hi: m + k * s };
}

// Shelf life by ICH Q1E: the time at which the one-sided 95% confidence bound
// of the regression mean meets the acceptance criterion.
export function shelfLife(points, limit, direction = "down", horizon = 60) {
  const p = points.filter(x => Number.isFinite(x.t) && Number.isFinite(x.y));
  if (p.length < 3) return null;
  const xs = p.map(x => x.t), ys = p.map(x => x.y);
  const f = linreg(xs, ys), n = p.length, mx = mean(xs);
  const sxx = xs.reduce((s, x) => s + (x - mx) ** 2, 0);
  const t = tInv(0.95, n - 2);
  const bound = (x) => {
    const yhat = f.a + f.b * x, half = t * f.syx * Math.sqrt(1 / n + (x - mx) ** 2 / sxx);
    return direction === "down" ? yhat - half : yhat + half;
  };
  const crosses = (x) => (direction === "down" ? bound(x) < limit : bound(x) > limit);
  let cross = null;
  for (let x = 0; x <= horizon; x += 0.1) if (crosses(x)) { cross = Math.round(x * 10) / 10; break; }
  return { slope: f.b, intercept: f.a, r2: f.r2, cross, lastPoint: Math.max(...xs), bound };
}

// Chromatography column sizing: resin volume and cycles for a given load.
export function column({ massG, loadGPerL, columnL }) {
  const resinNeeded = massG / loadGPerL;
  return { resinNeeded, cycles: Math.ceil(resinNeeded / columnL) };
}

// Overall yield from step yields (percent).
export const overallYield = (steps) => steps.reduce((p, s) => p * (s / 100), 1) * 100;
