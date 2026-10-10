import { useMemo, useState } from "react";
import { linreg, mean, sd, rsd, rng, fmt } from "./stats";
import { Q2_CATEGORIES, Q2_CHARACTERISTICS } from "../../analytical-data";

/* ICH Q2(R2) validation lab. Every number is computed live from the
   data set below; sliders change how the simulated method behaves. */

const CONTEXTS = {
  assay: { name: "Protein content (A280)", type: "Assay", unit: "mg/mL", levels: [80, 90, 100, 110, 120], target: 10,
    crit: { r2: 0.98, intercept: 5, recLo: 98, recHi: 102, rsdRep: 2, rsdIp: 3 } },
  impurity: { name: "Aggregate by SEC (%HMW)", type: "Impurity, quantitative", unit: "% HMW", levels: [10, 25, 50, 75, 100, 120], target: 2,
    crit: { r2: 0.98, intercept: 10, recLo: 80, recHi: 120, rsdRep: 10, rsdIp: 15 } },
  potency: { name: "Relative potency (bioassay)", type: "Assay (potency)", unit: "% RP", levels: [50, 71, 100, 141, 200], target: 100,
    crit: { r2: 0.95, intercept: 15, recLo: 80, recHi: 125, rsdRep: 10, rsdIp: 15 } },
};
const TABS = [["linearity", "Linearity & range"], ["accuracy", "Accuracy"], ["precision", "Precision"], ["limits", "LOD / LOQ"], ["matrix", "What to validate"]];

function Verdict({ ok, children }) {
  return <span className={`vl-verdict ${ok ? "is-pass" : "is-fail"}`}>{ok ? "Meets" : "Fails"} <span>{children}</span></span>;
}
function Slider({ label, value, min, max, step, onChange, fmtV = (v) => v }) {
  return (
    <label className="vl-slider">
      <span>{label}<b className="sv-mono">{fmtV(value)}</b></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)} />
    </label>
  );
}

export default function ValidationLab({ item, go }) {
  const [tab, setTab] = useState(TABS.some(t => t[0] === item) ? item : "linearity");
  const [ctx, setCtx] = useState("assay");
  const [noise, setNoise] = useState(1.0);     // method CV %
  const [bias, setBias] = useState(0);         // systematic % bias
  const [curve, setCurve] = useState(0);       // detector saturation at the top of range
  const [seed, setSeed] = useState(7);
  const C = CONTEXTS[ctx];

  return (
    <div className="vl">
      <div className="vl-setup">
        <div className="vl-ctx" role="group" aria-label="Method under validation">
          {Object.entries(CONTEXTS).map(([k, v]) => (
            <button key={k} className={`vl-ctx-btn${ctx === k ? " is-on" : ""}`} aria-pressed={ctx === k} onClick={() => setCtx(k)}>
              <strong>{v.name}</strong><span>{v.type}</span>
            </button>
          ))}
        </div>
        <div className="vl-knobs">
          <Slider label="Method noise (CV)" value={noise} min={0.2} max={8} step={0.1} onChange={setNoise} fmtV={v => `${v.toFixed(1)}%`} />
          <Slider label="Systematic bias" value={bias} min={-6} max={6} step={0.5} onChange={setBias} fmtV={v => `${v > 0 ? "+" : ""}${v.toFixed(1)}%`} />
          <Slider label="Detector saturation" value={curve} min={0} max={10} step={0.5} onChange={setCurve} fmtV={v => (v === 0 ? "none" : `${v.toFixed(1)}%`)} />
          <button className="hm-secondary vl-reroll" onClick={() => setSeed(s => s + 1)}>New data set</button>
        </div>
      </div>

      <div className="vl-tabs" role="tablist">
        {TABS.map(([id, l]) => <button key={id} role="tab" aria-selected={tab === id} className={`sv-tab${tab === id ? " is-on" : ""}`} onClick={() => { setTab(id); go("validation/" + id); }}>{l}</button>)}
      </div>

      {tab === "linearity" && <Linearity C={C} noise={noise} bias={bias} curve={curve} seed={seed} />}
      {tab === "accuracy" && <Accuracy C={C} noise={noise} bias={bias} seed={seed} />}
      {tab === "precision" && <Precision C={C} noise={noise} seed={seed} />}
      {tab === "limits" && <Limits C={C} noise={noise} seed={seed} />}
      {tab === "matrix" && <Matrix />}
    </div>
  );
}

/* plot helpers */
const W = 560, H = 260, P = { l: 52, r: 14, t: 14, b: 36 };
function scale(lo, hi, a, b) { return (v) => a + ((v - lo) / (hi - lo)) * (b - a); }
function Frame({ X, Y, xt, yt, xl, yl, xf = v => v, yf = v => v }) {
  return (
    <g>
      {yt.map(v => <g key={"y" + v}><line x1={P.l} x2={W - P.r} y1={Y(v)} y2={Y(v)} stroke="var(--hairline)" strokeDasharray="2 4" />
        <text x={P.l - 6} y={Y(v) + 3} textAnchor="end" fontSize="10" fill="var(--text-faint)" className="sv-mono">{yf(v)}</text></g>)}
      {xt.map(v => <g key={"x" + v}><line x1={X(v)} x2={X(v)} y1={H - P.b} y2={H - P.b + 4} stroke="var(--border-bright)" />
        <text x={X(v)} y={H - P.b + 15} textAnchor="middle" fontSize="10" fill="var(--text-faint)" className="sv-mono">{xf(v)}</text></g>)}
      <line x1={P.l} x2={W - P.r} y1={H - P.b} y2={H - P.b} stroke="var(--border-bright)" />
      <text x={W - P.r} y={H - 4} textAnchor="end" fontSize="10" fill="var(--text-faint)" className="sv-mono">{xl}</text>
      <text x={P.l} y={P.t - 2} fontSize="10" fill="var(--text-faint)" className="sv-mono">{yl}</text>
    </g>
  );
}

function Linearity({ C, noise, bias, curve, seed }) {
  const R = rng(seed);
  const xs = [], ys = [];
  C.levels.forEach(l => { for (let k = 0; k < 3; k++) {
    const x = (l / 100) * C.target;
    const sat = 1 - (curve / 100) * Math.max(0, (l - 60) / 60) ** 2;
    xs.push(x); ys.push(x * (1 + bias / 100) * sat * (1 + (noise / 100) * R.n()));
  } });
  const fit = linreg(xs, ys);
  const yAt100 = fit.a + fit.b * C.target;
  const intPct = (100 * Math.abs(fit.a)) / yAt100;
  const pass = { r2: fit.r2 >= C.crit.r2, int: intPct <= C.crit.intercept };
  const xmax = Math.max(...xs) * 1.08, ymax = Math.max(...ys) * 1.1;
  const X = scale(0, xmax, P.l, W - P.r), Y = scale(0, ymax, H - P.b, P.t);
  const rmax = Math.max(...fit.res.map(Math.abs)) * 1.4 || 1;
  const RY = scale(-rmax, rmax, 120 - 18, 10);
  const tk = (n) => Array.from({ length: n + 1 }, (_, i) => +(i * (C.target * 1.2) / n).toPrecision(2));

  return (
    <div className="vl-panel">
      <div className="vl-plots">
        <svg viewBox={`0 0 ${W} ${H}`} className="vl-plot" role="img" aria-label="Linearity: response against nominal with least-squares fit">
          <Frame X={X} Y={Y} xt={tk(4)} yt={tk(4)} xl={`nominal (${C.unit})`} yl="measured" />
          <line x1={X(0)} y1={Y(fit.a)} x2={X(xmax)} y2={Y(fit.a + fit.b * xmax)} stroke="var(--chain-h)" strokeWidth="1.8" />
          {xs.map((x, i) => <circle key={i} cx={X(x)} cy={Y(ys[i])} r="4" fill="var(--chain-l)" className="th-pop" />)}
        </svg>
        <svg viewBox={`0 0 ${W} 120`} className="vl-plot vl-resid" role="img" aria-label="Residuals">
          <line x1={P.l} x2={W - P.r} y1={RY(0)} y2={RY(0)} stroke="var(--border-bright)" />
          <text x={P.l} y={10} fontSize="10" fill="var(--text-faint)" className="sv-mono">residuals</text>
          {xs.map((x, i) => <line key={i} x1={X(x)} x2={X(x)} y1={RY(0)} y2={RY(fit.res[i])} stroke="var(--glycan)" strokeWidth="2" />)}
          {xs.map((x, i) => <circle key={"c" + i} cx={X(x)} cy={RY(fit.res[i])} r="2.6" fill="var(--glycan)" />)}
        </svg>
      </div>
      <div className="vl-results">
        <h3 className="an-h3">Least-squares fit</h3>
        <table className="vl-stats"><tbody>
          <tr><th>Slope</th><td className="sv-mono">{fmt(fit.b, 4)}</td></tr>
          <tr><th>Intercept</th><td className="sv-mono">{fmt(fit.a, 4)}</td></tr>
          <tr><th>Correlation r</th><td className="sv-mono">{fmt(fit.r, 5)}</td></tr>
          <tr><th>R²</th><td className="sv-mono">{fmt(fit.r2, 5)}</td></tr>
          <tr><th>Residual SD (Sy·x)</th><td className="sv-mono">{fmt(fit.syx, 4)}</td></tr>
          <tr><th>Intercept, % of 100% response</th><td className="sv-mono">{fmt(intPct, 2)}%</td></tr>
        </tbody></table>
        <div className="vl-verdicts">
          <Verdict ok={pass.r2}>R² ≥ {C.crit.r2}</Verdict>
          <Verdict ok={pass.int}>intercept ≤ {C.crit.intercept}% of target response</Verdict>
        </div>
        <p className="vl-explain">
          {C.levels.length} levels from {C.levels[0]}% to {C.levels[C.levels.length - 1]}% of target, triplicate. R² alone can hide curvature:
          read the residuals. A smile or frown pattern means the response is not linear at the ends of the range, even when R² looks excellent.
          {curve > 2 && " Detector saturation is bending the top of the range now: the residuals show it before R² does."}
        </p>
      </div>
    </div>
  );
}

function Accuracy({ C, noise, bias, seed }) {
  const R = rng(seed + 100);
  const lv = [C.levels[0], 100, C.levels[C.levels.length - 1]];
  const data = lv.map(l => ({ l, rec: [0, 1, 2].map(() => 100 + bias + noise * R.n()) }));
  const all = data.flatMap(d => d.rec);
  const m = mean(all);
  const ok = m >= C.crit.recLo && m <= C.crit.recHi && data.every(d => { const mm = mean(d.rec); return mm >= C.crit.recLo && mm <= C.crit.recHi; });
  const lo = Math.min(C.crit.recLo - 4, ...all), hi = Math.max(C.crit.recHi + 4, ...all);
  const Y = scale(lo, hi, H - P.b, P.t), X = (i) => P.l + 60 + i * ((W - P.l - P.r - 120) / 2);
  return (
    <div className="vl-panel">
      <svg viewBox={`0 0 ${W} ${H}`} className="vl-plot" role="img" aria-label="Accuracy: recovery by level">
        <rect x={P.l} width={W - P.l - P.r} y={Y(C.crit.recHi)} height={Y(C.crit.recLo) - Y(C.crit.recHi)} fill="color-mix(in srgb, var(--ok) 10%, transparent)" />
        <Frame X={(v) => v} Y={Y} xt={[]} yt={[Math.round(lo), 100, Math.round(hi)]} xl="" yl="recovery (%)" />
        <line x1={P.l} x2={W - P.r} y1={Y(100)} y2={Y(100)} stroke="var(--ok)" strokeDasharray="4 3" />
        {data.map((d, i) => <g key={d.l}>
          {d.rec.map((r, k) => <circle key={k} cx={X(i) + (k - 1) * 12} cy={Y(r)} r="4.5" fill="var(--chain-h)" className="th-pop" />)}
          <line x1={X(i) - 26} x2={X(i) + 26} y1={Y(mean(d.rec))} y2={Y(mean(d.rec))} stroke="var(--text-h)" strokeWidth="2" />
          <text x={X(i)} y={H - P.b + 15} textAnchor="middle" fontSize="10.5" fill="var(--text-sec)" className="sv-mono">{d.l}% level</text>
        </g>)}
        <text x={W - P.r - 4} y={Y(C.crit.recHi) + 12} textAnchor="end" fontSize="10" fill="var(--ok)" className="sv-mono">acceptance {C.crit.recLo}–{C.crit.recHi}%</text>
      </svg>
      <div className="vl-results">
        <h3 className="an-h3">Recovery</h3>
        <table className="vl-stats"><tbody>
          {data.map(d => <tr key={d.l}><th>{d.l}% level, mean of 3</th><td className="sv-mono">{fmt(mean(d.rec), 1)}%</td></tr>)}
          <tr><th>Overall mean (n = 9)</th><td className="sv-mono">{fmt(m, 1)}%</td></tr>
          <tr><th>Overall %RSD</th><td className="sv-mono">{fmt(rsd(all), 2)}%</td></tr>
        </tbody></table>
        <div className="vl-verdicts"><Verdict ok={ok}>mean recovery within {C.crit.recLo}–{C.crit.recHi}% at every level</Verdict></div>
        <p className="vl-explain">ICH Q2(R2) asks for at least nine determinations over three levels covering the range. Bias shifts every point together; noise only widens them. Try a +4% bias: precision still looks good while accuracy fails, which is why the two are validated separately.</p>
      </div>
    </div>
  );
}

function Precision({ C, noise, seed }) {
  const R = rng(seed + 200);
  const runs = ["Analyst A, day 1", "Analyst A, day 2", "Analyst B, day 1", "Analyst B, day 2"].map((n, i) => {
    const runBias = noise * 0.6 * R.n();
    return { n, v: Array.from({ length: 3 }, () => C.target * (1 + (runBias + noise * R.n()) / 100)), i };
  });
  const rep = Array.from({ length: 6 }, () => C.target * (1 + (noise * R.n()) / 100));
  const all = runs.flatMap(r => r.v);
  const runMeans = runs.map(r => mean(r.v));
  const sWithin = Math.sqrt(mean(runs.map(r => sd(r.v) ** 2)));
  const sBetween = Math.sqrt(Math.max(0, sd(runMeans) ** 2 - sWithin ** 2 / 3));
  const ipRSD = (100 * Math.sqrt(sWithin ** 2 + sBetween ** 2)) / mean(all);
  const repRSD = rsd(rep);
  const vals = [...all, ...rep], lo = Math.min(...vals) * 0.985, hi = Math.max(...vals) * 1.015;
  const Y = scale(lo, hi, H - P.b, P.t), X = (i) => P.l + 40 + i * ((W - P.l - P.r - 80) / 4);
  return (
    <div className="vl-panel">
      <svg viewBox={`0 0 ${W} ${H}`} className="vl-plot" role="img" aria-label="Precision: repeatability and intermediate precision runs">
        <Frame X={(v) => v} Y={Y} xt={[]} yt={[lo, C.target, hi].map(v => +v.toPrecision(3))} xl="" yl={`result (${C.unit})`} />
        <line x1={P.l} x2={W - P.r} y1={Y(C.target)} y2={Y(C.target)} stroke="var(--border-bright)" strokeDasharray="4 3" />
        {rep.map((v, k) => <circle key={"r" + k} cx={X(0) + (k - 2.5) * 7} cy={Y(v)} r="4" fill="var(--chain-l)" className="th-pop" />)}
        <text x={X(0)} y={H - P.b + 15} textAnchor="middle" fontSize="10" fill="var(--text-sec)" className="sv-mono">repeatability</text>
        {runs.map(r => <g key={r.n}>
          {r.v.map((v, k) => <circle key={k} cx={X(r.i + 1) + (k - 1) * 9} cy={Y(v)} r="4" fill="var(--chain-h)" className="th-pop" />)}
          <line x1={X(r.i + 1) - 20} x2={X(r.i + 1) + 20} y1={Y(mean(r.v))} y2={Y(mean(r.v))} stroke="var(--text-h)" strokeWidth="1.6" />
          <text x={X(r.i + 1)} y={H - P.b + 15} textAnchor="middle" fontSize="9.5" fill="var(--text-sec)" className="sv-mono">{r.n.replace("Analyst ", "").replace(", day ", " · d")}</text>
        </g>)}
      </svg>
      <div className="vl-results">
        <h3 className="an-h3">Variance components</h3>
        <table className="vl-stats"><tbody>
          <tr><th>Repeatability (n = 6)</th><td className="sv-mono">{fmt(repRSD, 2)}% RSD</td></tr>
          <tr><th>Within-run SD</th><td className="sv-mono">{fmt(sWithin, 4)}</td></tr>
          <tr><th>Between-run SD</th><td className="sv-mono">{fmt(sBetween, 4)}</td></tr>
          <tr><th>Intermediate precision</th><td className="sv-mono">{fmt(ipRSD, 2)}% RSD</td></tr>
        </tbody></table>
        <div className="vl-verdicts">
          <Verdict ok={repRSD <= C.crit.rsdRep}>repeatability ≤ {C.crit.rsdRep}% RSD</Verdict>
          <Verdict ok={ipRSD <= C.crit.rsdIp}>intermediate precision ≤ {C.crit.rsdIp}% RSD</Verdict>
        </div>
        <p className="vl-explain">Two analysts on two days, three replicates each. Intermediate precision adds the run-to-run variance to the within-run variance; it is the number that predicts how a result will scatter in routine QC and after method transfer.</p>
      </div>
    </div>
  );
}

function Limits({ C, noise, seed }) {
  const [peak, setPeak] = useState(6);
  const R = rng(seed + 300);
  const noiseAmp = 0.5 + noise * 0.15;
  const base = useMemo(() => { const r = rng(seed + 301); return Array.from({ length: 220 }, () => r.n() * noiseAmp * 0.33); }, [seed, noiseAmp]);
  const sn = (2 * peak) / (noiseAmp * 2);
  const xs = [0.02, 0.04, 0.06, 0.08, 0.1].map(f => f * C.target);
  const ys = xs.map(x => x * (1 + (noise / 40) * R.n()) + (noise / 400) * C.target * R.n());
  const fit = linreg(xs, ys);
  const LOD = (3.3 * fit.syx) / fit.b, LOQ = (10 * fit.syx) / fit.b;
  const Y = scale(-noiseAmp * 2, Math.max(16, peak * 1.3), 200 - 26, 12), X = scale(0, 219, P.l, W - P.r);
  let d = "";
  base.forEach((b, i) => { const y = b + peak * Math.exp(-0.5 * ((i - 110) / 6) ** 2); d += `${i ? "L" : "M"}${X(i).toFixed(1)},${Y(y).toFixed(1)}`; });
  return (
    <div className="vl-panel">
      <div className="vl-plots">
        <svg viewBox={`0 0 ${W} 200`} className="vl-plot" role="img" aria-label="Signal-to-noise of a small peak">
          <rect x={P.l} width={W - P.l - P.r} y={Y(noiseAmp)} height={Y(-noiseAmp) - Y(noiseAmp)} fill="color-mix(in srgb, var(--text-faint) 14%, transparent)" />
          <path d={d} fill="none" stroke="var(--chain-h)" strokeWidth="1.4" />
          <text x={W - P.r} y={Y(noiseAmp) - 4} textAnchor="end" fontSize="10" fill="var(--text-faint)" className="sv-mono">baseline noise band</text>
        </svg>
        <Slider label="Peak height" value={peak} min={0.5} max={14} step={0.1} onChange={setPeak} fmtV={v => v.toFixed(1)} />
      </div>
      <div className="vl-results">
        <h3 className="an-h3">Signal-to-noise</h3>
        <table className="vl-stats"><tbody><tr><th>S/N (2H/h)</th><td className="sv-mono">{fmt(sn, 1)}</td></tr></tbody></table>
        <div className="vl-verdicts">
          <Verdict ok={sn >= 3}>detectable, S/N ≥ 3</Verdict>
          <Verdict ok={sn >= 10}>quantifiable, S/N ≥ 10</Verdict>
        </div>
        <h3 className="an-h3">From the calibration line</h3>
        <table className="vl-stats"><tbody>
          <tr><th>σ (residual SD, low range)</th><td className="sv-mono">{fmt(fit.syx, 4)}</td></tr>
          <tr><th>Slope S</th><td className="sv-mono">{fmt(fit.b, 4)}</td></tr>
          <tr><th>LOD = 3.3σ / S</th><td className="sv-mono">{fmt(LOD, 4)} {C.unit}</td></tr>
          <tr><th>LOQ = 10σ / S</th><td className="sv-mono">{fmt(LOQ, 4)} {C.unit}</td></tr>
        </tbody></table>
        <p className="vl-explain">Both routes are accepted by ICH Q2(R2). The LOQ must also be confirmed experimentally with acceptable accuracy and precision at that level, and it must sit below the reporting threshold for the impurity.</p>
      </div>
    </div>
  );
}

function Matrix() {
  const [sel, setSel] = useState("spec");
  const ch = Q2_CHARACTERISTICS.find(c => c.id === sel);
  return (
    <div className="vl-panel vl-matrix">
      <div className="sv-tablewrap">
        <table className="sv-table q2">
          <thead><tr><th>Characteristic</th>{Q2_CATEGORIES.map(c => <th key={c.id}>{c.short}</th>)}</tr></thead>
          <tbody>
            {Q2_CHARACTERISTICS.map(c => (
              <tr key={c.id} className={sel === c.id ? "is-on" : ""} style={{ "--row": "var(--chain-h)" }} tabIndex={0} onClick={() => setSel(c.id)}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(c.id); } }}>
                <td><span className="sv-rowname">{c.name}</span></td>
                {Q2_CATEGORIES.map(cat => <td key={cat.id} className="q2-cell">{c.applies[cat.id] ? <span className="q2-yes" aria-label="required" /> : <span className="q2-no" aria-label="not required" />}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="vl-results">
        <h3 className="an-h3">{ch.name}</h3>
        <p className="an-prose">{ch.def}</p>
        <p className="an-prose"><strong>Typical criterion.</strong> {ch.crit}</p>
        <h3 className="an-h3">Test types</h3>
        {Q2_CATEGORIES.map(c => <p key={c.id} className="vl-explain"><strong>{c.name}.</strong> {c.desc}</p>)}
      </div>
    </div>
  );
}
