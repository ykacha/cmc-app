import { useRef, useState } from "react";
import { rng, rsd, fmt } from "./stats";

/* System suitability: drag the two peaks, change their width and tailing,
   and the USP/Ph. Eur. figures of merit recompute against their limits. */

const W = 900, H = 350, PL = 46, PR = 16, PT = 52, PB = 40;
const T0 = 4, T1 = 14;                         // x range, minutes
const X = (t) => PL + ((t - T0) / (T1 - T0)) * (W - PL - PR);
const tOf = (x) => T0 + ((x - PL) / (W - PL - PR)) * (T1 - T0);
const Y = (v) => H - PB - v * (H - PT - PB);

// asymmetric gaussian: front/back sigma derived from tailing factor T at 5% height
function peak(t, mu, w, T) {
  const sf = w / 2.355, sb = sf * Math.max(0.3, 2 * T - 1);
  const s = t < mu ? sf : sb;
  return Math.exp(-0.5 * ((t - mu) / s) ** 2);
}

const LIMITS = { rs: 1.5, n: 2000, tf: 2.0, rsd: 2.0 };

export default function SystemSuitability() {
  const svg = useRef(null);
  const [p1, setP1] = useState({ mu: 8.1, w: 0.32, h: 0.16, T: 1.1, name: "Dimer (HMW)" });
  const [p2, setP2] = useState({ mu: 9.0, w: 0.36, h: 0.92, T: 1.3, name: "Monomer" });
  const [cv, setCv] = useState(0.6);
  const [drag, setDrag] = useState(null);

  // figures of merit (USP half-height conventions)
  const rs = (1.18 * (p2.mu - p1.mu)) / (p1.w + p2.w);
  const N = 5.54 * (p2.mu / p2.w) ** 2;
  const tf = p2.T;
  const R = rng(17);
  const areas = Array.from({ length: 6 }, () => 1000 * (1 + (cv / 100) * R.n()));
  const inj = rsd(areas);
  const checks = [
    { k: "Resolution, HMW to monomer", v: rs, ok: rs >= LIMITS.rs, lim: `≥ ${LIMITS.rs}`, d: 2 },
    { k: "Plate count, monomer", v: N, ok: N >= LIMITS.n, lim: `≥ ${LIMITS.n}`, d: 0 },
    { k: "Tailing factor, monomer", v: tf, ok: tf <= LIMITS.tf && tf >= 0.8, lim: `0.8–${LIMITS.tf}`, d: 2 },
    { k: "Injection repeatability (n = 6)", v: inj, ok: inj <= LIMITS.rsd, lim: `≤ ${LIMITS.rsd}% RSD`, d: 2 },
  ];
  const allOk = checks.every(c => c.ok);

  const toT = (e) => { const r = svg.current.getBoundingClientRect(); return tOf(((e.clientX - r.left) / r.width) * W); };
  const onMove = (e) => {
    if (!drag) return;
    const t = Math.min(T1 - 0.5, Math.max(T0 + 0.5, toT(e)));
    if (drag === "p1") setP1(p => ({ ...p, mu: Math.min(t, p2.mu - 0.05) }));
    if (drag === "p2") setP2(p => ({ ...p, mu: Math.max(t, p1.mu + 0.05) }));
  };

  let d = "", fill1 = "", fill2 = "";
  for (let i = 0; i <= 600; i++) {
    const t = T0 + (i / 600) * (T1 - T0);
    const a = p1.h * peak(t, p1.mu, p1.w, p1.T), b = p2.h * peak(t, p2.mu, p2.w, p2.T);
    d += `${i ? "L" : "M"}${X(t).toFixed(1)},${Y(a + b).toFixed(1)}`;
    fill1 += `${i ? "L" : "M"}${X(t).toFixed(1)},${Y(a).toFixed(1)}`;
    fill2 += `${i ? "L" : "M"}${X(t).toFixed(1)},${Y(b).toFixed(1)}`;
  }
  const close = `L${X(T1)},${Y(0)}L${X(T0)},${Y(0)}Z`;
  const half = (p) => [p.mu - p.w / 2, p.mu + p.w / 2];

  return (
    <div className="ss">
      <div className={`ss-banner ${allOk ? "is-pass" : "is-fail"}`} role="status">
        <strong>{allOk ? "System suitable." : "System not suitable."}</strong>
        <span>{allOk ? "The run may proceed and sample results can be reported." : "No sample result from this sequence can be reported. Fix the system, re-equilibrate, and re-inject the SST standard."}</span>
      </div>

      <div className="ss-plot-wrap">
        <svg ref={svg} viewBox={`0 0 ${W} ${H}`} className="ss-plot" onPointerMove={onMove} onPointerUp={() => setDrag(null)} onPointerLeave={() => setDrag(null)}
          role="img" aria-label="SST chromatogram with draggable HMW and monomer peaks">
          {[0.25, 0.5, 0.75, 1].map(v => <line key={v} x1={PL} x2={W - PR} y1={Y(v)} y2={Y(v)} stroke="var(--hairline)" strokeDasharray="2 4" />)}
          {[4, 6, 8, 10, 12, 14].map(t => <g key={t}><line x1={X(t)} x2={X(t)} y1={Y(0)} y2={Y(0) + 4} stroke="var(--border-bright)" />
            <text x={X(t)} y={Y(0) + 16} textAnchor="middle" fontSize="11" fill="var(--text-faint)" className="sv-mono">{t}</text></g>)}
          <text x={W - PR} y={H - 6} textAnchor="end" fontSize="10.5" fill="var(--text-faint)" className="sv-mono">retention time (min)</text>
          <path d={fill1 + close} fill="color-mix(in srgb, var(--glycan) 16%, transparent)" />
          <path d={fill2 + close} fill="color-mix(in srgb, var(--chain-h) 12%, transparent)" />
          <line x1={PL} x2={W - PR} y1={Y(0)} y2={Y(0)} stroke="var(--border-bright)" />
          <path d={d} fill="none" stroke="var(--text-h)" strokeWidth="1.8" />

          {/* half-height widths */}
          {[p1, p2].map((p, i) => { const [a, b] = half(p), yy = Y(p.h / 2 + (i === 0 ? 0 : 0));
            return <g key={i}><line x1={X(a)} x2={X(b)} y1={yy} y2={yy} stroke={i ? "var(--chain-h)" : "var(--glycan)"} strokeWidth="1.5" />
              <line x1={X(a)} x2={X(a)} y1={yy - 4} y2={yy + 4} stroke={i ? "var(--chain-h)" : "var(--glycan)"} /><line x1={X(b)} x2={X(b)} y1={yy - 4} y2={yy + 4} stroke={i ? "var(--chain-h)" : "var(--glycan)"} /></g>; })}

          {/* resolution dimension */}
          <g>
            <line x1={X(p1.mu)} x2={X(p2.mu)} y1={Y(1.04)} y2={Y(1.04)} stroke="var(--text-muted)" />
            <line x1={X(p1.mu)} x2={X(p1.mu)} y1={Y(1.04)} y2={Y(p1.h) - 6} stroke="var(--text-muted)" strokeDasharray="2 3" />
            <line x1={X(p2.mu)} x2={X(p2.mu)} y1={Y(1.04)} y2={Y(p2.h) - 6} stroke="var(--text-muted)" strokeDasharray="2 3" />
            <text x={(X(p1.mu) + X(p2.mu)) / 2} y={Y(1.04) - 6} textAnchor="middle" fontSize="11" fontWeight="700" fill={rs >= LIMITS.rs ? "var(--ok)" : "var(--bad)"} className="sv-mono">Rs {fmt(rs, 2)}</text>
          </g>

          {/* drag handles */}
          {[["p1", p1, "var(--glycan)"], ["p2", p2, "var(--chain-h)"]].map(([id, p, c]) => (
            <g key={id} className="ss-handle" onPointerDown={(e) => { e.currentTarget.setPointerCapture?.(e.pointerId); setDrag(id); }}
              tabIndex={0} role="slider" aria-label={`${p.name} retention time`} aria-valuenow={p.mu.toFixed(2)} aria-valuemin={T0} aria-valuemax={T1}
              onKeyDown={(e) => { const dlt = e.key === "ArrowRight" ? 0.05 : e.key === "ArrowLeft" ? -0.05 : 0; if (!dlt) return; e.preventDefault();
                (id === "p1" ? setP1 : setP2)(q => ({ ...q, mu: Math.min(T1 - 0.5, Math.max(T0 + 0.5, q.mu + dlt)) })); }}>
              <circle cx={X(p.mu)} cy={Y(p.h)} r="16" fill="transparent" />
              <circle cx={X(p.mu)} cy={Y(p.h)} r="7" fill="var(--bg-base)" stroke={c} strokeWidth="2.5" />
              <text x={X(p.mu)} y={Y(p.h) - 14} textAnchor="middle" fontSize="11" fontWeight="700" fill={c} className="sv-mono">{p.name}</text>
            </g>
          ))}
        </svg>
        <p className="ss-hint">Drag either peak apex along the time axis, or focus one and use the arrow keys.</p>
      </div>

      <div className="ss-grid">
        <div className="ss-knobs">
          <h3 className="an-h3">Column condition</h3>
          <label className="vl-slider"><span>Monomer width at half height<b className="sv-mono">{p2.w.toFixed(2)} min</b></span>
            <input type="range" min="0.15" max="0.9" step="0.01" value={p2.w} onChange={e => setP2(p => ({ ...p, w: +e.target.value }))} /></label>
          <label className="vl-slider"><span>HMW width at half height<b className="sv-mono">{p1.w.toFixed(2)} min</b></span>
            <input type="range" min="0.15" max="0.9" step="0.01" value={p1.w} onChange={e => setP1(p => ({ ...p, w: +e.target.value }))} /></label>
          <label className="vl-slider"><span>Monomer tailing (column void, silanol activity)<b className="sv-mono">{p2.T.toFixed(2)}</b></span>
            <input type="range" min="0.8" max="2.8" step="0.05" value={p2.T} onChange={e => setP2(p => ({ ...p, T: +e.target.value }))} /></label>
          <label className="vl-slider"><span>Autosampler precision (area CV)<b className="sv-mono">{cv.toFixed(1)}%</b></span>
            <input type="range" min="0.1" max="4" step="0.1" value={cv} onChange={e => setCv(+e.target.value)} /></label>
        </div>
        <div className="ss-checks">
          <h3 className="an-h3">Suitability criteria</h3>
          <table className="vl-stats"><tbody>
            {checks.map(c => <tr key={c.k} className={c.ok ? "" : "is-fail"}><th>{c.k}<span className="ss-lim">limit {c.lim}</span></th><td className="sv-mono">{c.d ? fmt(c.v, c.d) : Math.round(c.v).toLocaleString()}<span className={`ss-dot ${c.ok ? "ok" : "bad"}`} aria-label={c.ok ? "meets" : "fails"} /></td></tr>)}
          </tbody></table>
          <p className="vl-explain">
            Rs = 1.18 (t₂ − t₁) / (w½,₁ + w½,₂). N = 5.54 (t / w½)². Tailing is measured at 5% of peak height.
            A widening monomer peak is the usual sign of an ageing SEC column: plates fall first, then resolution from the aggregate goes, and %HMW starts to read low because the dimer hides in the monomer's front.
          </p>
        </div>
      </div>
    </div>
  );
}
