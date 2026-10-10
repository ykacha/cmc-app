import { useState, useMemo } from "react";
import { RELATIONS, FMEA, CONTROL_LAYERS, COA, CTD_SECTIONS } from "../../../science/content/quality";
import { STAGE, EVIDENCE } from "../../../science/journey";
import { fmt } from "../../analytical/stats";
import { ProvTag } from "../../../science/ui";

/* ─────────── Relationship explorer: one attribute across the programme ─────────── */

const LANES = [
  { k: "upstream", title: "Upstream", to: "upstream/variables" },
  { k: "downstream", title: "Downstream", to: "downstream/train" },
  { k: "analytical", title: "Analytical methods", to: "analytical/questions" },
  { k: "formulation", title: "Formulation", to: "formulation/degradation" },
  { k: "stability", title: "Stability", to: "stability/trends" },
  { k: "controls", title: "Control strategy", to: "qbd/control" },
  { k: "spec", title: "Specification", to: "specs/justify" },
];

export function Explorer({ go, nav }) {
  const [id, setId] = useState("agg");
  const r = RELATIONS.find(x => x.id === id);
  return (
    <div className="wg">
      <div className="wg-chips" role="tablist" aria-label="Attribute">
        {RELATIONS.map(x => <button key={x.id} role="tab" aria-selected={id === x.id} className={`sv-tab${id === x.id ? " is-on" : ""}`} onClick={() => setId(x.id)}>{x.name}</button>)}
      </div>
      <div className="wg-ex" key={r.id}>
        <div className="wg-ex-why"><h4>{r.name}</h4><p>{r.why}</p></div>
        <ol className="wg-ex-lanes">
          {LANES.map(l => (
            <li key={l.k}>
              <button className="wg-ex-title" onClick={() => go(l.to)}>{l.title}</button>
              {l.k === "analytical"
                ? <div className="wg-chips">{r.analytical.map(([label, m]) => <button key={m} className="sv-tab" onClick={() => nav("analytical", "atlas/" + m)}>{label}</button>)}</div>
                : <p>{r[l.k]}</p>}
            </li>
          ))}
          <li>
            <button className="wg-ex-title" onClick={() => go("ctd/navigator")}>Where it is filed</button>
            <div className="wg-chips">{r.ctd.map(c => <span key={c} className="sc-ctd wg-ctdchip"><span className="sv-mono">{c}</span></span>)}</div>
          </li>
        </ol>
      </div>
      <p className="vl-explain">Directions of effect are common tendencies for IgG antibodies. Which ones apply, and how strongly, is decided by each product's own data.</p>
    </div>
  );
}

/* ─────────── FMEA: editable scores, ranked two ways ─────────── */

export function Fmea() {
  const [rows, setRows] = useState(FMEA.map((r, i) => ({ ...r, i })));
  const [sort, setSort] = useState("rpn");
  const set = (i, k, v) => setRows(rows.map(r => r.i === i ? { ...r, [k]: v } : r));
  const sorted = [...rows].sort((a, b) => sort === "rpn" ? b.s * b.o * b.d - a.s * a.o * a.d : b.s - a.s || b.s * b.o * b.d - a.s * a.o * a.d);
  const Score = ({ r, k }) => (
    <select aria-label={`${k === "s" ? "Severity" : k === "o" ? "Occurrence" : "Detectability"} for ${r.mode}`} value={r[k]} onChange={e => set(r.i, k, +e.target.value)} className="wg-score">
      {Array.from({ length: 10 }, (_, n) => <option key={n + 1}>{n + 1}</option>)}
    </select>
  );
  return (
    <div className="wg">
      <div className="wg-head"><ProvTag p="hypothetical" /><span>Example failure modes for an antibody process. Change the scores to see how the ranking moves.</span></div>
      <div className="wg-chips" role="group" aria-label="Rank by">
        <button aria-pressed={sort === "rpn"} className={`sv-tab${sort === "rpn" ? " is-on" : ""}`} onClick={() => setSort("rpn")}>Rank by RPN</button>
        <button aria-pressed={sort === "s"} className={`sv-tab${sort === "s" ? " is-on" : ""}`} onClick={() => setSort("s")}>Rank by severity</button>
      </div>
      <div className="sv-tablewrap">
        <table className="sv-table wg-fmea">
          <thead><tr><th>Step and failure mode</th><th>Effect</th><th>S</th><th>O</th><th>D</th><th>RPN</th><th>Mitigation</th></tr></thead>
          <tbody>
            {sorted.map(r => {
              const rpn = r.s * r.o * r.d;
              return (
                <tr key={r.i} className={r.s >= 9 ? "is-sev" : ""}>
                  <td className="wg-fmea-mode"><strong>{r.step}</strong><span>{r.mode}</span></td>
                  <td>{r.effect}</td>
                  <td><Score r={r} k="s" /></td><td><Score r={r} k="o" /></td><td><Score r={r} k="d" /></td>
                  <td className="sv-mono wg-rpn">{rpn}{r.s >= 9 && <span className="wg-sev" title="High severity">high severity</span>}</td>
                  <td>{r.mitigation}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="vl-explain">S severity, O occurrence, D detectability (10 = hardest to detect). Compare the two rankings: the viral safety failure modes sit low on RPN because they are rare and well detected, yet top the list by severity. In this example any severity of 9 or more is reviewed whatever its RPN; that is a programme rule, not a regulatory one.</p>
    </div>
  );
}

/* ─────────── DoE: why one-factor-at-a-time misses interactions ─────────── */

// coded model for HMW (%) after low-pH hold: x1 = pH (-1 = 3.4, +1 = 3.8), x2 = time (-1 = 30, +1 = 120 min)
const doeY = (x1, x2, b12) => 1.2 - 0.3 * x1 + 0.25 * x2 - b12 * x1 * x2;

export function Doe() {
  const [b12, setB12] = useState(0.25);
  const [mode, setMode] = useState("doe");
  const corners = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
  const ys = corners.map(([a, b]) => doeY(a, b, b12));
  const e1 = (ys[1] + ys[3] - ys[0] - ys[2]) / 2, e2 = (ys[2] + ys[3] - ys[0] - ys[1]) / 2, e12 = (ys[0] + ys[3] - ys[1] - ys[2]) / 2;
  const G = 9, S = 240, pad = 56;
  const cell = S / G;
  const runs = mode === "doe" ? [...corners, [0, 0]] : [[-1, 0], [0, 0], [1, 0], [0, -1], [0, 1]];
  const px = (c) => pad + ((c + 1) / 2) * S, py = (c) => pad + S - ((c + 1) / 2) * S;
  const maxY = Math.max(...ys), worst = corners[ys.indexOf(maxY)];
  const ofatMax = Math.max(...[[-1, 0], [1, 0], [0, -1], [0, 1], [0, 0]].map(([a, b]) => doeY(a, b, b12)));
  return (
    <div className="wg wg-split">
      <div>
        <svg viewBox={`0 0 ${S + pad + 24} ${S + pad + 36}`} className="wg-doe" role="img" aria-label="Predicted aggregate level across hold pH and time">
          {Array.from({ length: G * G }, (_, k) => {
            const i = k % G, j = Math.floor(k / G);
            const x1 = -1 + (2 * (i + 0.5)) / G, x2 = 1 - (2 * (j + 0.5)) / G;
            const v = doeY(x1, x2, b12), t = Math.max(0, Math.min(1, (v - 0.4) / 1.6));
            return <rect key={k} x={pad + i * cell} y={pad + j * cell} width={cell + 0.5} height={cell + 0.5} style={{ fill: `color-mix(in srgb, var(--glycan) ${Math.round(t * 70)}%, var(--panel))` }} />;
          })}
          {mode === "ofat" && <><line x1={px(-1)} x2={px(1)} y1={py(0)} y2={py(0)} className="wg-doe-path" /><line x1={px(0)} x2={px(0)} y1={py(-1)} y2={py(1)} className="wg-doe-path" /></>}
          {runs.map(([a, b], k) => <circle key={k} cx={px(a)} cy={py(b)} r="7" className="wg-doe-run" />)}
          {mode === "ofat" && <circle cx={px(worst[0])} cy={py(worst[1])} r="11" className="wg-doe-miss" />}
          <text x={pad} y={S + pad + 24} className="wg-tick" textAnchor="middle">pH 3.4</text><text x={pad + S} y={S + pad + 24} className="wg-tick" textAnchor="middle">pH 3.8</text>
          <text x={pad - 14} y={pad + 4} className="wg-tick" textAnchor="end">120 min</text><text x={pad - 14} y={pad + S + 4} className="wg-tick" textAnchor="end">30 min</text>
        </svg>
      </div>
      <div>
        <div className="wg-head"><ProvTag p="hypothetical" /><span>Aggregates after a low-pH hold, as a function of hold pH and time.</span></div>
        <div className="wg-chips" role="group" aria-label="Experimental approach">
          <button aria-pressed={mode === "doe"} className={`sv-tab${mode === "doe" ? " is-on" : ""}`} onClick={() => setMode("doe")}>2² factorial + centre point</button>
          <button aria-pressed={mode === "ofat"} className={`sv-tab${mode === "ofat" ? " is-on" : ""}`} onClick={() => setMode("ofat")}>One factor at a time</button>
        </div>
        <label className="wg-slider"><span>Strength of the pH × time interaction <strong className="sv-mono">{fmt(b12, 2)}</strong></span>
          <input type="range" min="0" max="0.5" step="0.05" value={b12} onChange={e => setB12(+e.target.value)} /></label>
        <div className="wg-stats" aria-live="polite">
          <div><span>pH effect</span><strong className="sv-mono">{fmt(e1, 2)}%</strong></div>
          <div><span>Time effect</span><strong className="sv-mono">+{fmt(e2, 2)}%</strong></div>
          <div><span>Interaction</span><strong className="sv-mono">{fmt(e12, 2)}%</strong></div>
        </div>
        <p className="an-prose">
          {mode === "doe"
            ? `Five runs estimate both main effects and the interaction. The worst corner, low pH with a long hold, predicts ${fmt(maxY, 2)}% HMW.`
            : `Five runs along two lines through the centre see at most ${fmt(ofatMax, 2)}% HMW. The worst corner (${fmt(maxY, 2)}%) was never tested, and the interaction cannot be estimated.`}
        </p>
      </div>
    </div>
  );
}

/* ─────────── Ranges: knowledge space, PAR, NOR, design space ─────────── */

// hypothetical constraints: HMW ≤ 1.6% (model above, b12 = 0.25); inactivation needs pH ≤ 3.7 and time ≥ 45 min
const toPh = (c) => 3.4 + ((c + 1) / 2) * 0.4, toMin = (c) => 30 + ((c + 1) / 2) * 90;
const feasible = (x1, x2) => doeY(x1, x2, 0.25) <= 1.6 && toPh(x1) <= 3.7 && toMin(x2) >= 45;

export function DesignSpace() {
  const [layers, setLayers] = useState({ feas: true, par: true, nor: true, ds: false });
  const G = 24, S = 260, pad = 40, cell = S / G;
  const X = (ph) => pad + ((ph - 3.4) / 0.4) * S, Y = (min) => pad + S - ((min - 30) / 90) * S;
  const L = [
    ["feas", "Region meeting both constraints"], ["par", "Proven acceptable ranges"], ["nor", "Normal operating ranges"], ["ds", "A proposed design space"],
  ];
  return (
    <div className="wg wg-split">
      <svg viewBox={`0 0 ${S + pad + 14} ${S + pad + 30}`} className="wg-doe" role="img" aria-label="Operating ranges for low-pH hold pH and time">
        <rect x={pad} y={pad} width={S} height={S} className="wg-ks" />
        {layers.feas && Array.from({ length: G * G }, (_, k) => {
          const i = k % G, j = Math.floor(k / G);
          const x1 = -1 + (2 * (i + 0.5)) / G, x2 = 1 - (2 * (j + 0.5)) / G;
          return feasible(x1, x2) ? <rect key={k} x={pad + i * cell} y={pad + j * cell} width={cell + 0.4} height={cell + 0.4} className="wg-feas" /> : null;
        })}
        {layers.ds && <path d={`M${X(3.45)},${Y(48)} L${X(3.69)},${Y(48)} L${X(3.69)},${Y(110)} L${X(3.56)},${Y(110)} L${X(3.45)},${Y(80)} Z`} className="wg-ds" />}
        {layers.par && <rect x={X(3.5)} y={Y(100)} width={X(3.68) - X(3.5)} height={Y(50) - Y(100)} className="wg-par" />}
        {layers.nor && <rect x={X(3.55)} y={Y(80)} width={X(3.65) - X(3.55)} height={Y(60) - Y(80)} className="wg-nor" />}
        <circle cx={X(3.6)} cy={Y(70)} r="4" className="wg-sp" />
        {[3.4, 3.5, 3.6, 3.7, 3.8].map(p => <text key={p} x={X(p)} y={pad + S + 18} className="wg-tick" textAnchor="middle">{p.toFixed(1)}</text>)}
        {[30, 60, 90, 120].map(m => <text key={m} x={pad - 6} y={Y(m) + 4} className="wg-tick" textAnchor="end">{m}</text>)}
        <text x={pad + S / 2} y={pad + S + 32} className="wg-tick" textAnchor="middle">hold pH</text>
        <text x={pad} y={pad - 10} className="wg-tick">hold time (min)</text>
      </svg>
      <div>
        <div className="wg-head"><ProvTag p="hypothetical" /><span>Constraints for this example: HMW ≤ 1.6%, and inactivation demonstrated only for pH ≤ 3.7 and at least 45 minutes.</span></div>
        <div className="wg-layers">
          {L.map(([k, label]) => (
            <label key={k} className={`wg-layer wg-layer-${k}`}><input type="checkbox" checked={layers[k]} onChange={() => setLayers({ ...layers, [k]: !layers[k] })} /><i />{label}</label>
          ))}
        </div>
        <p className="an-prose">The whole square is the explored region. The shaded area is where both constraints were met in the studies. The PAR box shows ranges proven acceptable for each parameter; the NOR is where the process actually runs, around the set point. A design space, if one is proposed, is a multidimensional region the applicant justifies and the regulator approves; it need not be a rectangle.</p>
      </div>
    </div>
  );
}

/* ─────────── Control strategy layers ─────────── */

export function ControlLayers() {
  const [attr, setAttr] = useState(null);
  const [open, setOpen] = useState("process");
  return (
    <div className="wg">
      <div className="wg-chips" role="group" aria-label="Highlight layers protecting an attribute">
        <button aria-pressed={!attr} className={`sv-tab${!attr ? " is-on" : ""}`} onClick={() => setAttr(null)}>All layers</button>
        {RELATIONS.map(r => <button key={r.id} aria-pressed={attr === r.id} className={`sv-tab${attr === r.id ? " is-on" : ""}`} onClick={() => setAttr(r.id)}>{r.name}</button>)}
      </div>
      <ol className="wg-layersx">
        {CONTROL_LAYERS.map((l, i) => {
          const hit = !attr || l.cqas.includes(attr);
          return (
            <li key={l.id} className={`${hit ? "" : "is-dim"}${open === l.id ? " is-open" : ""}`}>
              <button aria-expanded={open === l.id} onClick={() => setOpen(open === l.id ? null : l.id)}>
                <span className="sv-mono">{String(i + 1).padStart(2, "0")}</span>{l.name}
              </button>
              {open === l.id && <ul className="an-list">{l.items.map(x => <li key={x}>{x}</li>)}</ul>}
            </li>
          );
        })}
      </ol>
      <p className="vl-explain">{attr ? `${CONTROL_LAYERS.filter(l => l.cqas.includes(attr)).length} of ${CONTROL_LAYERS.length} layers contribute to controlling this attribute. Release testing is only one of them.` : "Layers run from inputs to lifecycle. Pick an attribute to see which layers protect it."}</p>
    </div>
  );
}

/* ─────────── Certificate of analysis ─────────── */

export function Coa() {
  const [open, setOpen] = useState(null);
  return (
    <div className="wg">
      <div className="wg-head"><ProvTag p="hypothetical" /><span>{COA.note}</span></div>
      <div className="wg-coa">
        <dl className="wg-coa-head">
          <div><dt>Product</dt><dd>{COA.head.product}</dd></div>
          <div><dt>Lot</dt><dd className="sv-mono">{COA.head.lot}</dd></div>
          <div><dt>Manufactured</dt><dd className="sv-mono">{COA.head.mfg}</dd></div>
          <div><dt>Specification</dt><dd className="sv-mono">{COA.head.spec}</dd></div>
        </dl>
        <div className="sv-tablewrap">
          <table className="sv-table">
            <thead><tr><th>Test</th><th>Method</th><th>Acceptance criterion</th><th>Result</th></tr></thead>
            <tbody>
              {COA.rows.map(r => (
                <tr key={r.test} className={open === r.test ? "is-open" : ""}>
                  <td><button className="wg-coa-test" aria-expanded={open === r.test} onClick={() => setOpen(open === r.test ? null : r.test)}>{r.test}</button>{open === r.test && <p className="wg-coa-why">{r.why}</p>}</td>
                  <td>{r.method}</td><td className="sv-mono">{r.limit}</td><td className="sv-mono">{r.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="wg-coa-foot">Conclusion: the lot conforms to the specification. Release is a separate QA decision that also considers the batch record and deviations.</p>
      </div>
    </div>
  );
}

/* ─────────── CTD evidence navigator with a readiness self-check ─────────── */

const KEY = "cmc-ctd-readiness";
function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } }

export function CtdNavigator({ go }) {
  const [sel, setSel] = useState("3.2.S.2");
  const [state, setState] = useState(load);
  const s = CTD_SECTIONS.find(x => x.id === sel);
  const setStatus = (v) => { const n = { ...state, [sel]: v }; setState(n); try { localStorage.setItem(KEY, JSON.stringify(n)); } catch { /* storage unavailable */ } };
  const counts = useMemo(() => Object.keys(EVIDENCE).map(k => [k, CTD_SECTIONS.filter(c => (state[c.id] || "none") === k).length]), [state]);
  return (
    <div className="wg">
      <div className="wg-ctd-bar" aria-label="Readiness summary">
        {counts.filter(([, n]) => n).map(([k, n]) => <span key={k} className={`sc-ev-${k}`} style={{ flex: n }} title={`${EVIDENCE[k].label}: ${n}`} />)}
      </div>
      <div className="wg-ctd">
        <ul className="wg-ctd-list">
          {CTD_SECTIONS.map(c => (
            <li key={c.id}><button aria-pressed={sel === c.id} className={sel === c.id ? "is-on" : ""} onClick={() => setSel(c.id)}>
              <span className={`sc-dot sc-ev-${state[c.id] || "none"}`} /><span className="sv-mono">{c.id}</span>{c.title}
            </button></li>
          ))}
        </ul>
        <div className="wg-detail" key={s.id}>
          <h4><span className="sv-mono">{s.id}</span> {s.title}</h4>
          <p className="an-prose">{s.what}</p>
          <dl className="wg-dl">
            <div><dt>Evidence comes from</dt><dd><div className="wg-chips">{s.from.map(f => STAGE[f] ? <button key={f} className="sv-tab" onClick={() => go(f)}>{STAGE[f].short}</button> : <span key={f}>{f}</span>)}</div></dd></div>
            {s.studies.length > 0 && <div><dt>Typical studies and documents</dt><dd><ul className="an-list">{s.studies.map(x => <li key={x}>{x}</li>)}</ul></dd></div>}
          </dl>
          <label className="wg-select"><span>Your programme's status for this section</span>
            <select value={state[s.id] || "none"} onChange={e => setStatus(e.target.value)}>
              {Object.entries(EVIDENCE).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </label>
        </div>
      </div>
      <p className="vl-explain">Statuses you set are kept only in this browser.</p>
    </div>
  );
}
