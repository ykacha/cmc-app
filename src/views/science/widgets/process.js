import { useState, useMemo } from "react";
import { VARIABLES } from "../../../science/content/upstream";
import { OPERATIONS, TRAIN_DATA } from "../../../science/content/downstream";
import { FORMULATIONS } from "../../../science/content/formulation";
import { ANALYTICAL_METHODS } from "../../../extra-data";
import { linreg, tInv, fmt } from "../../analytical/stats";
import { ProvTag } from "../../../science/ui";

const ABBR = Object.fromEntries(ANALYTICAL_METHODS.map(m => [m.id, m.abbreviation]));

function MethodChips({ ids, nav }) {
  return (
    <div className="wg-chips">
      {ids.map(id => <button key={id} className="sv-tab" onClick={() => nav("analytical", "atlas/" + id)}>{ABBR[id] || id}</button>)}
    </div>
  );
}

/* ─────────── Bioreactor: variable → mechanism → quality → control ─────────── */

export function Bioreactor() {
  const [sel, setSel] = useState("ph");
  const v = VARIABLES.find(x => x.id === sel);
  const on = (part) => v.where === part ? " is-on" : "";
  return (
    <div className="wg wg-split">
      <div className="wg-br">
        <svg viewBox="0 0 290 300" className="wg-br-svg" aria-hidden="true">
          <path className={`br-jacket${on("jacket")}`} d="M48 70 h164 v170 a30 30 0 0 1 -30 30 h-104 a30 30 0 0 1 -30 -30 z" />
          <path className="br-vessel" d="M58 78 h144 v160 a24 24 0 0 1 -24 24 h-96 a24 24 0 0 1 -24 -24 z" />
          <path className="br-liquid" d="M58 112 h144 v126 a24 24 0 0 1 -24 24 h-96 a24 24 0 0 1 -24 -24 z" />
          <g className={`br-impeller${on("impeller")}`}>
            <line x1="130" y1="30" x2="130" y2="232" />
            <rect x="104" y="160" width="52" height="8" rx="2" />
            <rect x="104" y="214" width="52" height="8" rx="2" />
          </g>
          <g className="br-bubbles">{[0, 1, 2, 3, 4, 5].map(i => <circle key={i} cx={112 + i * 7} cy={238 - (i % 3) * 22} r="2.6" />)}</g>
          <line className="br-sparger" x1="104" y1="246" x2="156" y2="246" />
          <g className={`br-probe${on("probe-do")}`}><line x1="80" y1="40" x2="80" y2="190" /><circle cx="80" cy="192" r="4" /></g>
          <g className={`br-probe${on("probe-ph")}`}><line x1="96" y1="40" x2="96" y2="170" /><circle cx="96" cy="172" r="4" /></g>
          <g className={`br-line${on("feed")}`}><path d="M254 34 h-62 v44" /><circle cx="254" cy="34" r="5" /></g>
          <g className={`br-line${on("exhaust")}`}><path d="M166 78 v-52" /></g>
          <g className={`br-line${on("harvest")}`}><path d="M130 270 v18 h70" /></g>
          <text x="80" y="34" className="br-t" textAnchor="middle">DO</text><text x="96" y="22" className="br-t" textAnchor="middle">pH</text>
          <text x="258" y="24" className="br-t" textAnchor="end">feed</text><text x="166" y="18" className="br-t" textAnchor="middle">gas out</text>
          <text x="204" y="292" className="br-t">harvest</text>
        </svg>
      </div>
      <div>
        <div className="wg-chips" role="group" aria-label="Process variable">
          {VARIABLES.map(x => <button key={x.id} aria-pressed={sel === x.id} className={`sv-tab${sel === x.id ? " is-on" : ""}`} onClick={() => setSel(x.id)}>{x.name}</button>)}
        </div>
        <div className="wg-detail" key={v.id}>
          <h4>{v.name}</h4>
          <p className="wg-range sv-mono">{v.range}</p>
          <dl className="wg-dl">
            <div><dt>Mechanism</dt><dd>{v.mech}</dd></div>
            <div><dt>Process performance</dt><dd>{v.perf}</dd></div>
            <div><dt>Product quality</dt><dd>{v.quality}</dd></div>
            <div><dt>How it is measured</dt><dd>{v.measure}</dd></div>
            <div><dt>How it is controlled</dt><dd>{v.control}</dd></div>
          </dl>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Fed-batch culture profile with a harvest-day slider ─────────── */

const CULTURE = {
  vcd: { name: "Viable cells (10⁶/mL)", max: 22, color: "var(--chain-h)", d: [0.5, 0.9, 1.7, 3.2, 5.8, 9.5, 13.5, 16.8, 18.9, 19.8, 19.6, 18.7, 17.2, 15.3, 13.1, 10.8, 8.6] },
  via: { name: "Viability (%)", max: 100, color: "var(--ok)", d: [98, 98, 98, 98, 97, 97, 97, 96, 96, 95, 94, 92, 89, 85, 80, 74, 67] },
  titer: { name: "Titer (g/L)", max: 6, color: "var(--chain-l)", d: [0, 0.02, 0.05, 0.1, 0.2, 0.4, 0.7, 1.1, 1.6, 2.1, 2.7, 3.3, 3.9, 4.4, 4.9, 5.3, 5.6] },
  lac: { name: "Lactate (g/L)", max: 4, color: "var(--bridge)", d: [0.3, 0.8, 1.5, 2.4, 3.1, 3.0, 2.4, 1.8, 1.3, 1.0, 0.8, 0.7, 0.7, 0.8, 0.9, 1.0, 1.1] },
};

export function CultureProfile() {
  const [show, setShow] = useState({ vcd: true, via: true, titer: true, lac: false });
  const [day, setDay] = useState(14);
  const W = 560, H = 230, P = { l: 34, r: 12, t: 12, b: 28 };
  const x = (d) => P.l + (d / 16) * (W - P.l - P.r);
  const y = (v, max) => H - P.b - (v / max) * (H - P.t - P.b);
  const via = CULTURE.via.d[day], titer = CULTURE.titer.d[day];
  const burden = via >= 90 ? "low" : via >= 80 ? "moderate" : "high";
  return (
    <div className="wg">
      <div className="wg-head"><ProvTag p="hypothetical" /><span>A typical CHO fed-batch, with a temperature shift on day 5.</span></div>
      <div className="wg-chips" role="group" aria-label="Series">
        {Object.entries(CULTURE).map(([k, s]) => (
          <button key={k} aria-pressed={show[k]} className={`sv-tab wg-series${show[k] ? " is-on" : ""}`} style={{ "--s": s.color }} onClick={() => setShow({ ...show, [k]: !show[k] })}><i />{s.name}</button>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="wg-chart" role="img" aria-label={`Culture profile. On day ${day}: titer ${titer} g/L, viability ${via}%.`}>
        {[0, 4, 8, 12, 16].map(d => <g key={d}><line x1={x(d)} x2={x(d)} y1={P.t} y2={H - P.b} className="wg-grid" /><text x={x(d)} y={H - 8} className="wg-tick" textAnchor="middle">day {d}</text></g>)}
        <line x1={x(5)} x2={x(5)} y1={P.t} y2={H - P.b} className="wg-mark" />
        <text x={x(5) + 4} y={P.t + 10} className="wg-tick">37 → 33 °C</text>
        {Object.entries(CULTURE).filter(([k]) => show[k]).map(([k, s]) => (
          <polyline key={k} points={s.d.map((v, i) => `${x(i)},${y(v, s.max)}`).join(" ")} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinejoin="round" />
        ))}
        <rect x={x(day) - 1} y={P.t} width="2" height={H - P.t - P.b} className="wg-cursor" />
      </svg>
      <label className="wg-slider">
        <span>Harvest on day <strong className="sv-mono">{day}</strong></span>
        <input type="range" min="10" max="16" value={day} onChange={e => setDay(+e.target.value)} />
      </label>
      <div className="wg-stats" aria-live="polite">
        <div><span>Titer</span><strong className="sv-mono">{titer} g/L</strong></div>
        <div><span>Viability</span><strong className="sv-mono">{via}%</strong></div>
        <div><span>Downstream burden</span><strong className={`wg-band wg-band-${burden}`}>{burden}</strong></div>
      </div>
      <p className="vl-explain">Waiting longer adds titer, but falling viability releases host-cell proteins, proteases and DNA, and the product spends longer in warm culture, where acidic variants accumulate. The harvest criterion balances the two.</p>
    </div>
  );
}

/* ─────────── Purification train: step-by-step anatomy ─────────── */

export function Train({ nav }) {
  const [sel, setSel] = useState("proa");
  const op = OPERATIONS.find(o => o.id === sel);
  return (
    <div className="wg">
      <ol className="wg-train" aria-label="Unit operations">
        {OPERATIONS.map((o, i) => (
          <li key={o.id}>
            <button aria-pressed={sel === o.id} className={sel === o.id ? "is-on" : ""} onClick={() => setSel(o.id)}>
              <span className="sv-mono">{String(i + 1).padStart(2, "0")}</span>{o.short}
            </button>
          </li>
        ))}
      </ol>
      <div className="wg-detail" key={op.id}>
        <h4>{op.name}</h4>
        <p className="an-prose">{op.why}</p>
        <div className="wg-cols">
          <dl className="wg-dl">
            <div><dt>Principle</dt><dd>{op.principle}</dd></div>
            <div><dt>Key variables</dt><dd><ul className="an-list">{op.variables.map(x => <li key={x}>{x}</li>)}</ul></dd></div>
            <div><dt>Criticality</dt><dd>{op.cpp}</dd></div>
          </dl>
          <dl className="wg-dl">
            <div><dt>Removes or achieves</dt><dd>{op.removes.join("; ")}</dd></div>
            <div><dt>In-process controls</dt><dd>{op.ipc.join("; ")}</dd></div>
            <div><dt>What can go wrong</dt><dd>{op.risk}</dd></div>
            <div><dt>Measured with</dt><dd><MethodChips ids={op.methods} nav={nav} /></dd></div>
          </dl>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Clearance through the train ─────────── */

const IMP = {
  hcp: { name: "Host-cell protein", unit: "ppm (ng/mg)", log: true, limit: 100 },
  dna: { name: "Residual DNA", unit: "pg/mg", log: true, limit: 10 },
  hmw: { name: "Aggregates (HMW)", unit: "%", log: false, limit: 3 },
  pra: { name: "Leached Protein A", unit: "ppm (ng/mg)", log: false, limit: 10 },
};

export function Clearance() {
  const [k, setK] = useState("hcp");
  const m = IMP[k], d = TRAIN_DATA[k];
  const cumYield = TRAIN_DATA.yield.reduce((a, v, i) => [...a, i ? a[i - 1] * v / 100 : v], []);
  const W = 560, H = 240, P = { l: 52, r: 44, t: 16, b: 34 };
  const n = d.length, bw = (W - P.l - P.r) / n;
  const vals = d.filter(v => v != null);
  const top = m.log ? Math.ceil(Math.log10(Math.max(...vals))) : Math.max(...vals, m.limit) * 1.15;
  const bottom = m.log ? 0 : 0;
  const yv = (v) => {
    const f = m.log ? (Math.log10(Math.max(v, 1)) - bottom) / (top - bottom) : v / top;
    return H - P.b - f * (H - P.t - P.b);
  };
  const yy = (v) => H - P.b - (v / 100) * (H - P.t - P.b);
  const lrv = d.map((v, i) => (i && d[i - 1] != null && v != null && m.log) ? Math.log10(d[i - 1] / v) : null);
  return (
    <div className="wg">
      <div className="wg-head"><ProvTag p="hypothetical" /><span>Teaching values for a platform IgG1 process. Limits are illustrative.</span></div>
      <div className="wg-chips" role="group" aria-label="Impurity">
        {Object.entries(IMP).map(([id, x]) => <button key={id} aria-pressed={k === id} className={`sv-tab${k === id ? " is-on" : ""}`} onClick={() => setK(id)}>{x.name}</button>)}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="wg-chart" role="img" aria-label={`${m.name} by step, with cumulative yield`}>
        {(m.log ? Array.from({ length: top + 1 }, (_, i) => i) : [0, top / 2, top]).map(t => {
          const yy0 = m.log ? yv(10 ** t) : yv(t);
          return <g key={t}><line x1={P.l} x2={W - P.r} y1={yy0} y2={yy0} className="wg-grid" /><text x={P.l - 6} y={yy0 + 4} className="wg-tick" textAnchor="end">{m.log ? `10${"⁰¹²³⁴⁵⁶⁷"[t]}` : fmt(t, 1)}</text></g>;
        })}
        <line x1={P.l} x2={W - P.r} y1={yv(m.limit)} y2={yv(m.limit)} className="wg-limit" />
        <text x={W - P.r} y={yv(m.limit) - 5} className="wg-tick" textAnchor="end">limit {m.limit}</text>
        {d.map((v, i) => v == null ? null : (
          <rect key={i} x={P.l + i * bw + bw * 0.22} y={yv(v)} width={bw * 0.56} height={H - P.b - yv(v)} rx="2" className={v <= m.limit ? "wg-bar is-ok" : "wg-bar"} />
        ))}
        <polyline points={cumYield.map((v, i) => `${P.l + i * bw + bw / 2},${yy(v)}`).join(" ")} className="wg-yield" />
        {cumYield.map((v, i) => <circle key={i} cx={P.l + i * bw + bw / 2} cy={yy(v)} r="3" className="wg-yield-dot" />)}
        <text x={W - P.r + 4} y={yy(cumYield[n - 1]) + 4} className="wg-tick">{Math.round(cumYield[n - 1])}%</text>
        {TRAIN_DATA.steps.map((s, i) => <text key={s} x={P.l + i * bw + bw / 2} y={H - 12} className="wg-tick" textAnchor="middle">{s}</text>)}
      </svg>
      <div className="wg-legend"><span><i className="wg-sw-bar" />{m.name}, {m.unit}{m.log ? ", log scale" : ""}</span><span><i className="wg-sw-line" />Cumulative product yield</span></div>
      {m.log && (
        <div className="sv-tablewrap"><table className="sv-table wg-lrv"><thead><tr><th>Step</th>{TRAIN_DATA.steps.slice(1).map(s => <th key={s}>{s}</th>)}</tr></thead>
          <tbody><tr><td><span className="sv-rowname">Log reduction</span></td>{lrv.slice(1).map((v, i) => <td key={i} className="sv-mono">{v == null ? "–" : fmt(v, 1)}</td>)}</tr></tbody></table></div>
      )}
      <p className="vl-explain">{k === "hmw" ? "Aggregates are not only removed: low-pH inactivation creates some, and CEX polishing removes them. UF/DF at high concentration can add a little back." : k === "pra" ? "Protein A appears only because the capture step introduces it; polishing steps clear it." : "Most clearance happens at capture. Polishing steps take the remainder below the limit with margin; the final steps add little."}</p>
    </div>
  );
}

/* ─────────── Formulation trade-off matrix ─────────── */

export function Formulations() {
  const [sel, setSel] = useState("A");
  const F = FORMULATIONS;
  const best = (m) => {
    const vs = F.candidates.map(c => c.v[m.id]);
    if (m.better === "low") return Math.min(...vs);
    if (m.better === "high") return Math.max(...vs);
    return null;
  };
  const c = F.candidates.find(x => x.id === sel);
  const passes = F.metrics.filter(m => m.ok(c.v[m.id])).length;
  return (
    <div className="wg">
      <div className="wg-head"><ProvTag p="hypothetical" /><span>{F.note}</span></div>
      <div className="sv-tablewrap">
        <table className="sv-table wg-fm">
          <thead><tr><th>Measure</th><th>Target</th>{F.candidates.map(x => <th key={x.id}><button className={`wg-fm-h${sel === x.id ? " is-on" : ""}`} aria-pressed={sel === x.id} onClick={() => setSel(x.id)}>{x.name}</button></th>)}</tr></thead>
          <tbody>
            {F.metrics.map(m => (
              <tr key={m.id}>
                <td><span className="sv-rowname">{m.name}</span></td>
                <td className="sv-mono">{m.target} {m.unit}</td>
                {F.candidates.map(x => {
                  const v = x.v[m.id], ok = m.ok(v);
                  return <td key={x.id} className={`sv-mono wg-fm-c${ok ? " is-ok" : " is-bad"}${v === best(m) ? " is-best" : ""}${sel === x.id ? " is-sel" : ""}`}>{v}<span className="sr-only">{ok ? " meets target" : " misses target"}</span></td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="wg-legend"><span><i className="wg-sw-ok" />Meets target</span><span><i className="wg-sw-bad" />Misses target</span><span><i className="wg-sw-best" />Best on this measure</span></div>
      <div className="wg-detail" key={sel}>
        <h4>{c.name}: {passes} of {F.metrics.length} targets met</h4>
        <p className="sv-mono wg-range">{c.comp}</p>
        <p className="an-prose">{F.verdict}</p>
      </div>
    </div>
  );
}

/* ─────────── Injection force from viscosity (Hagen–Poiseuille) ─────────── */

const NEEDLES = [
  { id: "25", label: "25G", id_mm: 0.26 },
  { id: "27tw", label: "27G thin wall", id_mm: 0.24 },
  { id: "27", label: "27G", id_mm: 0.21 },
  { id: "29tw", label: "29G thin wall", id_mm: 0.18 },
];

export function Injection() {
  const [visc, setVisc] = useState(14);
  const [needle, setNeedle] = useState("27tw");
  const [time, setTime] = useState(10);
  const [limit, setLimit] = useState(20);
  const nd = NEEDLES.find(n => n.id === needle);
  const L = 0.0127, barrel = 6.35e-3, glide = 5, vol = 1e-6;
  const r = nd.id_mm / 2 / 1000, Q = vol / time;
  const dP = (8 * (visc / 1000) * L * Q) / (Math.PI * r ** 4);
  const F = dP * Math.PI * (barrel / 2) ** 2 + glide;
  const pct = Math.min(100, (F / 40) * 100);
  return (
    <div className="wg">
      <div className="wg-head"><ProvTag p="assumption" /><span>Idealised Newtonian estimate: 1 mL syringe (6.35 mm barrel), ½-inch needle, 5 N glide force. Real solutions are often shear-thinning, and needle diameters are approximate.</span></div>
      <div className="wg-chips" role="group" aria-label="Viscosity presets">
        {FORMULATIONS.candidates.map(c => <button key={c.id} className={`sv-tab${visc === c.v.visc ? " is-on" : ""}`} onClick={() => setVisc(c.v.visc)}>{c.name} ({c.v.visc} mPa·s)</button>)}
      </div>
      <div className="wg-controls">
        <label className="wg-slider"><span>Viscosity <strong className="sv-mono">{visc} mPa·s</strong></span><input type="range" min="1" max="40" value={visc} onChange={e => setVisc(+e.target.value)} /></label>
        <label className="wg-slider"><span>Injection time <strong className="sv-mono">{time} s</strong></span><input type="range" min="3" max="20" value={time} onChange={e => setTime(+e.target.value)} /></label>
        <label className="wg-slider"><span>Example force target <strong className="sv-mono">{limit} N</strong></span><input type="range" min="10" max="35" value={limit} onChange={e => setLimit(+e.target.value)} /></label>
        <label className="wg-select"><span>Needle</span>
          <select value={needle} onChange={e => setNeedle(e.target.value)}>{NEEDLES.map(n => <option key={n.id} value={n.id}>{n.label} (ID ≈ {n.id_mm} mm)</option>)}</select>
        </label>
      </div>
      <div className="wg-gauge" aria-live="polite">
        <div className="wg-gauge-track"><div className={`wg-gauge-fill${F > limit ? " is-bad" : ""}`} style={{ width: pct + "%" }} /><span className="wg-gauge-limit" style={{ left: (limit / 40) * 100 + "%" }} /></div>
        <p><strong className="sv-mono">{fmt(F, 1)} N</strong> estimated plunger force; {F > limit ? "above" : "within"} the example target of {limit} N.</p>
      </div>
      <p className="vl-explain">Force scales linearly with viscosity and with flow rate, but with the fourth power of the needle radius: one step to a thinner needle can matter more than a large formulation change.</p>
    </div>
  );
}

/* ─────────── Stability trend and shelf-life estimate (ICH Q1E style) ─────────── */

const STAB_T = [0, 3, 6, 9, 12, 18, 24];
const STAB_LOTS = [
  { id: "L1", d: [0.9, 1.0, 1.15, 1.2, 1.35, 1.5, 1.75] },
  { id: "L2", d: [1.0, 1.1, 1.2, 1.35, 1.4, 1.65, 1.85] },
  { id: "L3", d: [0.8, 0.95, 1.0, 1.15, 1.25, 1.45, 1.6] },
];

export function StabilityTrend() {
  const [avail, setAvail] = useState(12);
  const [lim, setLim] = useState(2.5);
  const res = useMemo(() => {
    const xs = [], ys = [];
    STAB_LOTS.forEach(l => STAB_T.forEach((t, i) => { if (t <= avail) { xs.push(t); ys.push(l.d[i]); } }));
    const f = linreg(xs, ys);
    const n = xs.length, mx = xs.reduce((s, x) => s + x, 0) / n, sxx = xs.reduce((s, x) => s + (x - mx) ** 2, 0);
    const tq = tInv(0.95, n - 2);
    const ub = (x) => f.a + f.b * x + tq * f.syx * Math.sqrt(1 / n + (x - mx) ** 2 / sxx);
    let cross = null;
    for (let x = 0; x <= 60; x += 0.25) if (ub(x) >= lim) { cross = x; break; }
    return { f, ub, cross };
  }, [avail, lim]);
  const W = 560, H = 240, P = { l: 40, r: 14, t: 14, b: 30 }, XM = 48, YM = 3.5;
  const x = (t) => P.l + (t / XM) * (W - P.l - P.r);
  const y = (v) => H - P.b - (v / YM) * (H - P.t - P.b);
  const statistical = res.cross == null ? XM : Math.floor(res.cross);
  const supported = Math.min(statistical, avail);
  return (
    <div className="wg">
      <div className="wg-head"><ProvTag p="hypothetical" /><span>HMW (%) by SEC for three drug product lots at 2–8 °C, pooled linear fit.</span></div>
      <svg viewBox={`0 0 ${W} ${H}`} className="wg-chart" role="img" aria-label={`Stability trend; statistical estimate ${statistical} months`}>
        {[0, 12, 24, 36, 48].map(t => <g key={t}><line x1={x(t)} x2={x(t)} y1={P.t} y2={H - P.b} className="wg-grid" /><text x={x(t)} y={H - 10} className="wg-tick" textAnchor="middle">{t} mo</text></g>)}
        {[0, 1, 2, 3].map(v => <text key={v} x={P.l - 6} y={y(v) + 4} className="wg-tick" textAnchor="end">{v}%</text>)}
        <rect x={x(0)} y={P.t} width={x(avail) - x(0)} height={H - P.t - P.b} className="wg-avail" />
        <line x1={x(0)} x2={x(XM)} y1={y(lim)} y2={y(lim)} className="wg-limit" />
        <text x={x(0) + 6} y={y(lim) - 6} className="wg-tick">acceptance criterion {lim}%</text>
        <line x1={x(0)} x2={x(XM)} y1={y(res.f.a)} y2={y(res.f.a + res.f.b * XM)} className="wg-fit" />
        <polyline points={Array.from({ length: 49 }, (_, t) => `${x(t)},${y(Math.min(YM, res.ub(t)))}`).join(" ")} className="wg-ci" />
        {STAB_LOTS.map((l, li) => STAB_T.filter(t => t <= avail).map((t, i) => <circle key={l.id + t} cx={x(t) + (li - 1) * 2.5} cy={y(l.d[i])} r="3.2" className={`wg-pt wg-pt-${li}`} />))}
        {res.cross != null && <line x1={x(res.cross)} x2={x(res.cross)} y1={y(lim)} y2={H - P.b} className="wg-mark" />}
      </svg>
      <div className="wg-controls">
        <label className="wg-slider"><span>Real-time data available <strong className="sv-mono">{avail} months</strong></span><input type="range" min="6" max="24" step="3" value={avail} onChange={e => setAvail([6, 9, 12, 18, 24].reduce((a, b) => Math.abs(b - e.target.value) < Math.abs(a - e.target.value) ? b : a))} /></label>
        <label className="wg-slider"><span>Acceptance criterion <strong className="sv-mono">≤ {lim}%</strong></span><input type="range" min="1.8" max="3.5" step="0.1" value={lim} onChange={e => setLim(+e.target.value)} /></label>
      </div>
      <div className="wg-stats" aria-live="polite">
        <div><span>Slope</span><strong className="sv-mono">{fmt(res.f.b * 12, 2)}% per year</strong></div>
        <div><span>Where the 95% bound meets the limit</span><strong className="sv-mono">{res.cross == null ? `> ${XM}` : statistical} months</strong></div>
        <div><span>Shelf life the real-time data support</span><strong className="sv-mono">{supported} months</strong></div>
      </div>
      <p className="vl-explain">The dashed curve is the one-sided 95% upper confidence bound on the mean trend. For a biologic the proposed shelf life is also limited by the real-time data in hand: the statistics may point further out, but extension waits for the next time points.</p>
    </div>
  );
}
