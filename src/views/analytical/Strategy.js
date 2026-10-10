import { useState } from "react";
import { ANALYTICAL_METHODS } from "../../extra-data";
import { METHOD_EXTRAS, ROLE_DEFS, METHOD_ROLE_BASE } from "../../analytical-data";
import { PHASES, DS_SPEC } from "./strategy-data";
import { CHAPTERS } from "./journey-data";
import Lifecycle from "./Lifecycle";

const byId = Object.fromEntries(ANALYTICAL_METHODS.map(m => [m.id, m]));
const PHASE_KEYS = ["Pre-IND", "IND", "Ph1", "Ph2", "Ph3", "BLA"];

export default function Strategy({ go }) {
  const [sel, setSel] = useState("ph1");
  const p = PHASES.find(x => x.id === sel);
  const idx = PHASES.findIndex(x => x.id === sel);

  return (
    <div className="st">
      {/* ── the programme, phase by phase ── */}
      <ol className="st-track" role="tablist" aria-label="Development phase">
        {PHASES.map((x, i) => (
          <li key={x.id} className={`${sel === x.id ? "is-on" : ""}${i <= idx ? " is-past" : ""}`}>
            <button role="tab" aria-selected={sel === x.id} onClick={() => setSel(x.id)}>
              <i /><span>{x.short}</span>
            </button>
          </li>
        ))}
      </ol>

      <section className="st-phase" key={sel}>
        <div className="st-phase-head">
          <h2 className="an-abbr st-name">{p.name}</h2>
          <p className="st-goal">{p.goal}</p>
        </div>
        <dl className="st-rows">
          {p.rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
        <div className="st-two">
          <div>
            <h3 className="an-h3">What reviewers ask at this stage</h3>
            <ul className="an-list">{p.reviewers.map(r => <li key={r}>{r}</li>)}</ul>
          </div>
          <div>
            <h3 className="an-h3">Where programmes stumble</h3>
            <ul className="an-list">{p.pitfalls.map(r => <li key={r}>{r}</li>)}</ul>
          </div>
        </div>
        {p.filing && <p className="vl-explain"><strong>Where it is filed.</strong> {p.filing}</p>}
        <div className="st-pager">
          {idx > 0 && <button className="hm-link" onClick={() => setSel(PHASES[idx - 1].id)}>Previous: {PHASES[idx - 1].short}</button>}
          {idx < PHASES.length - 1 && <button className="hm-link" onClick={() => setSel(PHASES[idx + 1].id)}>Next: {PHASES[idx + 1].short}</button>}
        </div>
      </section>

      {/* ── assays across the phases ── */}
      <section className="st-sec">
        <h2 className="hm-h2">When each assay enters the programme.</h2>
        <p className="hm-sub sv-measure">Grouped by the question it answers. Release and safety tests start early; deep characterisation builds toward the marketing application.</p>
        <div className="sv-tablewrap">
          <table className="sv-table st-matrix">
            <thead><tr><th>Assay</th>{PHASE_KEYS.map(k => <th key={k}>{k}</th>)}</tr></thead>
            {CHAPTERS.filter(c => c.assays.length).map(c => {
              const seen = new Set();
              const ids = c.assays.map(a => a.id).filter(id => !seen.has(id) && seen.add(id));
              return (
                <tbody key={c.id}>
                  <tr className="st-group"><td colSpan={PHASE_KEYS.length + 1}>{c.q}</td></tr>
                  {ids.map(id => {
                    const m = byId[id];
                    return (
                      <tr key={c.id + id} style={{ "--row": "var(--chain-h)" }} onClick={() => go("atlas/" + id)} tabIndex={0}
                        onKeyDown={e => { if (e.key === "Enter") go("atlas/" + id); }}>
                        <td><span className="sv-rowname">{m.abbreviation}{m.name !== m.abbreviation && <em>{m.name}</em>}</span></td>
                        {PHASE_KEYS.map(k => <td key={k} className="st-cell">{m.phases[k] ? <span className="st-on" /> : <span className="st-off" />}</td>)}
                      </tr>
                    );
                  })}
                </tbody>
              );
            })}
          </table>
        </div>
      </section>

      {/* ── roles ── */}
      <section className="st-sec">
        <h2 className="hm-h2">Four jobs an assay can do.</h2>
        <p className="hm-sub sv-measure">The same method can hold more than one job. Together they form the analytical half of the control strategy.</p>
        <div className="st-roles">
          {METHOD_ROLE_BASE.map(base => {
            const list = ANALYTICAL_METHODS.filter(m => (METHOD_EXTRAS[m.id]?.role || []).some(r => r.startsWith(base)));
            return (
              <div key={base} className="st-role" style={{ "--seg": ROLE_DEFS[base].color }}>
                <i />
                <strong>{base}</strong>
                <p>{ROLE_DEFS[base].desc}</p>
                <div className="st-role-list">
                  {list.map(m => <button key={m.id} onClick={() => go("atlas/" + m.id)}>{m.abbreviation}</button>)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── specification ── */}
      <section className="st-sec">
        <h2 className="hm-h2">What a drug substance specification looks like.</h2>
        <p className="hm-sub sv-measure">A representative release specification for a monoclonal antibody. Limits are typical, not from a specific product; each is justified from clinical lots, stability and method capability.</p>
        <div className="sv-tablewrap">
          <table className="sv-table st-spec">
            <thead><tr><th>Test</th><th>Method</th><th>Acceptance criterion</th></tr></thead>
            <tbody>
              {DS_SPEC.map((r, i) => (
                <tr key={r.test} className={i > 0 && DS_SPEC[i - 1].group !== r.group ? "st-break" : ""} style={{ "--row": "var(--chain-h)" }}
                  onClick={r.am ? () => go("atlas/" + r.am) : undefined} tabIndex={r.am ? 0 : undefined}>
                  <td><span className="st-spec-test">{r.test}<em>{r.group}</em></span></td>
                  <td>{r.method}</td>
                  <td className="sv-mono st-crit">{r.crit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="vl-explain">Drug product adds sterility, container closure integrity, visible and subvisible particles, extractable volume and, for some products, polysorbate content.</p>
      </section>

      {/* ── lifecycle ── */}
      <section className="st-sec">
        <h2 className="hm-h2">A method has a lifecycle too.</h2>
        <p className="hm-sub sv-measure">ICH Q14 treats each analytical procedure like the process it controls: designed against a target, validated, monitored and changed under control.</p>
        <Lifecycle />
      </section>
    </div>
  );
}
