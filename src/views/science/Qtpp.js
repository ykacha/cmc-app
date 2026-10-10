import { useMemo, useState } from "react";
import { PRODUCT, QTPP, ATTRIBUTES, IMPACT_SCALE, UNCERTAINTY_SCALE, BANDS, bandOf, scoreOf } from "../../science/product";
import { ANALYTICAL_METHODS } from "../../extra-data";
import { ProvTag } from "../../science/ui";

/* Stage 2 deep content: QTPP, candidate attributes, and an interactive
   impact x uncertainty risk assessment for CMX-417. */

const byId = Object.fromEntries(ANALYTICAL_METHODS.map(m => [m.id, m]));
const STATUS_ORDER = ["Critical by definition", "Provisional CQA", "Monitor", "Not a CQA"];

export default function Qtpp({ nav }) {
  const [sel, setSel] = useState("cdr-deam");
  const [qSel, setQSel] = useState(null);
  const [overrides, setOverrides] = useState({});
  const attrs = useMemo(() => ATTRIBUTES.map(a => ({ ...a, ...(overrides[a.id] || {}) })), [overrides]);
  const a = attrs.find(x => x.id === sel);
  const qLinked = qSel ? new Set(QTPP.find(q => q.id === qSel).attrs) : null;
  const edit = (k, v) => setOverrides(o => ({ ...o, [sel]: { ...(o[sel] || {}), [k]: v } }));
  const ranked = [...attrs].sort((x, y) => scoreOf(y) - scoreOf(x));

  // matrix geometry
  const W = 640, H = 420, L = 120, B = 46, T = 18, R = 18;
  const xs = UNCERTAINTY_SCALE.map(u => u.v), ys = IMPACT_SCALE.map(i => i.v);
  const X = (v) => L + ((xs.indexOf(v) + 0.5) / xs.length) * (W - L - R);
  const Y = (v) => H - B - ((ys.indexOf(v) + 0.5) / ys.length) * (H - B - T);
  const cellW = (W - L - R) / xs.length, cellH = (H - B - T) / ys.length;
  const groups = {};
  attrs.forEach(x => { const k = x.impact + "|" + x.uncertainty; (groups[k] = groups[k] || []).push(x); });

  return (
    <div className="sc-deep">
      <section className="ch-sec">
        <h2 className="hm-h2">The QTPP for {PRODUCT.code}.</h2>
        <p className="an-prose">The QTPP describes the product, not the test results. Specification limits come much later, from data. Select a row to see which quality attributes it depends on.</p>
        <div className="sv-tablewrap">
          <table className="sv-table qt-table">
            <thead><tr><th>Element</th><th>Target</th><th>Rationale</th><th>Depends on</th></tr></thead>
            <tbody>
              {QTPP.map(q => (
                <tr key={q.id} className={qSel === q.id ? "is-on" : ""} style={{ "--row": "var(--chain-h)" }} tabIndex={0}
                  onClick={() => setQSel(qSel === q.id ? null : q.id)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setQSel(qSel === q.id ? null : q.id); } }}>
                  <td><span className="sv-rowname" style={{ paddingLeft: 0, whiteSpace: "normal" }}>{q.element}</span></td>
                  <td>{q.target}</td>
                  <td className="qt-why">{q.rationale}</td>
                  <td><span className="qt-attrs">{q.attrs.map(id => <span key={id} className="sv-chip">{ATTRIBUTES.find(x => x.id === id)?.name}</span>)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="vl-explain"><ProvTag p="assumption" /> Targets are planning assumptions for this fictional programme.</p>
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">Which attributes need evidence first.</h2>
        <p className="an-prose">
          Each candidate attribute is scored for <strong>impact</strong> on safety and efficacy and for <strong>uncertainty</strong> in what we know.
          The product of the two sets priority, not criticality. A high-impact attribute with good data can be lower priority than a moderate one nobody has studied.
        </p>
        <div className="qt-risk">
          <div className="qt-matrix">
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Risk matrix of impact against uncertainty for candidate quality attributes">
              {ys.map(iv => xs.map(uv => {
                const b = bandOf(iv * uv).id;
                return <rect key={iv + "-" + uv} x={X(uv) - cellW / 2} y={Y(iv) - cellH / 2} width={cellW - 2} height={cellH - 2} rx="6" className={`qt-cell qt-${b}`} />;
              }))}
              {IMPACT_SCALE.map(i => <text key={i.v} x={L - 12} y={Y(i.v) + 4} textAnchor="end" className="qt-axis">{i.label} <tspan className="sv-mono">({i.v})</tspan></text>)}
              {UNCERTAINTY_SCALE.map(u => <text key={u.v} x={X(u.v)} y={H - B + 18} textAnchor="middle" className="qt-axis">{u.label}</text>)}
              <text x={L - 12} y={T - 4} textAnchor="end" className="qt-axis-t">Impact</text>
              <text x={W - R} y={H - 6} textAnchor="end" className="qt-axis-t">Uncertainty</text>
              {Object.values(groups).map(list => list.map((x, k) => {
                const n = list.length, ang = n > 1 ? (k / n) * Math.PI * 2 : 0, rr = n > 1 ? Math.min(cellW, cellH) * 0.28 : 0;
                const cx = X(x.uncertainty) + Math.cos(ang) * rr, cy = Y(x.impact) + Math.sin(ang) * rr;
                const dim = qLinked && !qLinked.has(x.id);
                const notCqa = x.status === "Not a CQA";
                return (
                  <g key={x.id} className={`qt-dot${sel === x.id ? " is-on" : ""}`} opacity={dim ? 0.2 : 1} tabIndex={0} role="button" aria-label={`${x.name}, score ${scoreOf(x)}`}
                    onClick={() => setSel(x.id)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(x.id); } }}>
                    <circle cx={cx} cy={cy} r={sel === x.id ? 11 : 8} className={notCqa ? "qt-dot-hollow" : "qt-dot-fill"} />
                    <title>{x.name}</title>
                  </g>
                );
              }))}
            </svg>
            <div className="qt-legend">
              {BANDS.map(b => <span key={b.id}><i className={`qt-${b.id}`} />{b.label} (score {b.min === 0 ? "< 20" : `≥ ${b.min}`})</span>)}
              <span><i className="qt-hollow" />Measured, but not a CQA</span>
            </div>
            <p className="vl-explain">Scales adapted from the public A-Mab case study (CMC Biotech Working Group, 2009). The score bands are this programme's own planning rule, not a regulatory threshold. <ProvTag p="hypothetical" /></p>
          </div>

          <aside className="qt-detail" key={sel}>
            <span className="qt-kind">{a.kind}</span>
            <h3 className="qt-name">{a.name}</h3>
            <div className="qt-score">
              <span className="sv-mono">{a.impact} × {a.uncertainty} = {scoreOf(a)}</span>
              <span className={`qt-band qt-${bandOf(scoreOf(a)).id}`}>{bandOf(scoreOf(a)).label}</span>
            </div>
            <span className={`qt-status qt-status-${STATUS_ORDER.indexOf(a.status)}`}>{a.status}</span>
            <dl className="am-wwd">
              <div><dt>Why this impact</dt><dd>{a.impactWhy}</dd></div>
              <div><dt>Why this uncertainty</dt><dd>{a.uncWhy}</dd></div>
              {a.note && <div><dt>Why it is not a CQA</dt><dd>{a.note}</dd></div>}
              <div><dt>Evidence needed next</dt><dd>{a.next}</dd></div>
            </dl>
            <div className="qt-edit">
              <span>Try it: change the scores</span>
              <div role="group" aria-label="Impact">{IMPACT_SCALE.map(i => <button key={i.v} className={`sv-tab${a.impact === i.v ? " is-on" : ""}`} onClick={() => edit("impact", i.v)}>{i.v}</button>)}</div>
              <div role="group" aria-label="Uncertainty">{UNCERTAINTY_SCALE.map(u => <button key={u.v} className={`sv-tab${a.uncertainty === u.v ? " is-on" : ""}`} style={{ "--tab": "var(--chain-l)" }} onClick={() => edit("uncertainty", u.v)}>{u.v}</button>)}</div>
              {overrides[sel] && <button className="hm-link" onClick={() => setOverrides(o => { const n = { ...o }; delete n[sel]; return n; })}>Reset to the team's assessment</button>}
            </div>
            {a.methods.length > 0 && (
              <div className="qt-methods">
                <span>Measured by</span>
                {a.methods.map(m => <button key={m} className="hm-assay" onClick={() => nav("analytical", "atlas/" + m)}>{byId[m]?.abbreviation}</button>)}
                {a.cqa && <button className="hm-link" onClick={() => nav("analytical", "cqa/" + a.cqa)}>See it in CQA × Method</button>}
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">The resulting priorities.</h2>
        <ol className="qt-rank">
          {ranked.map((x, i) => (
            <li key={x.id} className={sel === x.id ? "is-on" : ""}>
              <button onClick={() => setSel(x.id)}>
                <span className="sv-mono">{String(i + 1).padStart(2, "0")}</span>
                <strong>{x.name}</strong>
                <span className="qt-rank-status">{x.status}</span>
                <span className={`qt-band qt-${bandOf(scoreOf(x)).id}`}>{scoreOf(x)}</span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">Three distinctions that matter.</h2>
        <div className="qt-three">
          <div><strong>Provisional is not final.</strong><p>At this stage a CQA is a hypothesis. Criticality is reassessed as process, analytical and clinical data arrive, and is fixed only when evidence supports it (ICH Q8(R2), Q11).</p></div>
          <div><strong>Measured is not critical.</strong><p>Viscosity and polysorbate content are measured and controlled, but their effect on patients acts through other attributes. Controlling them does not make them CQAs.</p></div>
          <div><strong>Priority is not criticality.</strong><p>Endotoxin sits near the bottom of the priority list because its controls are well established, yet it is critical by definition. The score tells you where to spend effort first, not what matters.</p></div>
        </div>
      </section>
    </div>
  );
}
