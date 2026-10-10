import { useState } from "react";
import { ANALYTICAL_METHODS } from "../../extra-data";
import { METHOD_EXTRAS, CQA_METHODS, QUALITY_ATTRIBUTES, ROLE_DEFS } from "../../analytical-data";
import { METHOD_STEPS } from "../../shared";
import { Theatre } from "./theatre";
import { THEATRES } from "./theatre-configs";
import { CHAPTERS, CHAPTER_OF } from "./journey-data";

// Category colours follow the CPK roles: structure-type assays in chain colours,
// safety in oxygen red, function in phosphorus orange.
const CAT = {
  Identity: "--chain-h", Purity: "--chain-h", Potency: "--chain-l", Glycosylation: "--bridge",
  "Physical/Chemical": "--cpk-cl", Safety: "--glycan", Structural: "--cpk-cl", "Process Impurities": "--glycan", "Binding/Kinetics": "--chain-l",
};
const cat = (c) => `var(${CAT[c] || "--accent"})`;
const PHASES = ["Pre-IND", "IND", "Ph1", "Ph2", "Ph3", "BLA"];
const byId = Object.fromEntries(ANALYTICAL_METHODS.map(m => [m.id, m]));
const cqaName = Object.fromEntries(QUALITY_ATTRIBUTES.map(q => [q.id, q.name]));
const roleCol = (r) => { const k = Object.keys(ROLE_DEFS).find(x => r.startsWith(x)); return k ? ROLE_DEFS[k].color : "var(--accent)"; };

export function methodCqas(id) {
  return Object.entries(CQA_METHODS).flatMap(([cq, v]) => v.methods.filter(x => x.m === id).map(x => ({ cq, ...x })));
}

function PhaseTrack({ phases }) {
  return (
    <div className="an-phases" aria-label="Phase applicability">
      {PHASES.map(p => <span key={p} className={phases[p] ? "is-on" : ""}><i />{p}</span>)}
    </div>
  );
}

export default function Atlas({ item, go }) {
  const [q, setQ] = useState("");
  if (item && byId[item]) return <AssayPage m={byId[item]} go={go} />;
  const match = (m) => !q || `${m.name} ${m.abbreviation} ${m.purpose} ${m.category}`.toLowerCase().includes(q.toLowerCase());
  const shown = new Set();

  return (
    <div className="ax">
      <div className="ax-top">
        <p className="ax-intro">Grouped by the question each assay answers. New to analytical CMC? <button className="hm-link" onClick={() => go("journey")}>Start with the guided path</button>.</p>
        <label className="an-search"><span className="sr-only">Search assays</span>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search assay or attribute" /></label>
      </div>
      {CHAPTERS.filter(c => c.assays.length).map((c, ci) => {
        const rows = c.assays.filter(a => !shown.has(a.id) && match(byId[a.id]));
        rows.forEach(a => shown.add(a.id));
        if (!rows.length) return null;
        return (
          <section key={c.id} className="ax-group">
            <h2 className="ax-q"><span className="sv-mono">{String(ci + 1).padStart(2, "0")}</span>{c.q}</h2>
            <ul className="ax-rows">
              {rows.map(a => {
                const m = byId[a.id];
                return (
                  <li key={a.id}>
                    <button onClick={() => go("atlas/" + a.id)}>
                      <strong>{m.abbreviation}</strong>
                      <span className="ax-name">{m.name}</span>
                      <span className="ax-says">{a.says}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
      {q && shown.size === 0 && <p className="an-empty">No assay matches “{q}”. Try a technique (SEC, ELISA) or an attribute (aggregation, glycan).</p>}
    </div>
  );
}

function AssayPage({ m, go }) {
  const ex = METHOD_EXTRAS[m.id];
  const steps = METHOD_STEPS[m.id] || [];
  const cqas = methodCqas(m.id);
  const order = [...new Set(CHAPTERS.flatMap(c => c.assays.map(a => a.id)))];
  const i = order.indexOf(m.id);
  const prev = byId[order[i - 1]], next = byId[order[i + 1]];

  const ch = CHAPTER_OF[m.id];
  const says = CHAPTERS.flatMap(c => c.assays).find(a => a.id === m.id)?.says;

  return (
    <article className="an-assay" key={m.id}>
      <nav className="an-crumbs">
        <button className="hm-link" onClick={() => go("atlas")}>All assays</button>
        {ch && <><span className="an-crumb-sep" aria-hidden="true">/</span><button className="hm-link an-crumb-q" onClick={() => go("journey")}>{ch.q}</button></>}
      </nav>

      <header className="an-assay-head" style={{ "--seg": cat(m.category) }}>
        <div>
          <h1 className="an-abbr">{m.abbreviation}</h1>
          <p className="an-assay-name">{m.name}</p>
          <p className="an-assay-full">{m.fullName}</p>
        </div>
        <dl className="an-facts">
          {ex && <div><dt>ICH Q2 test type</dt><dd>{ex.q2}</dd></div>}
          {ex && <div><dt>Throughput</dt><dd>{ex.throughput}</dd></div>}
          {ex && <div><dt>Sample needed</dt><dd>{ex.sample}</dd></div>}
          <div><dt>CTD section</dt><dd className="sv-mono">{m.ctdSection}</dd></div>
        </dl>
      </header>

      <p className="an-lead">{says || m.purpose}</p>

      <section className="an-stage">
        <Theatre cfg={THEATRES[m.id]} />
      </section>

      <div className="an-assay-body">
        <div className="an-col-main">
          <h2 className="an-h3">How it works</h2>
          <p className="an-prose">{m.principle}</p>
          {ex?.pearl && (<>
            <h2 className="an-h3">From the bench</h2>
            <p className="an-prose an-pearl">{ex.pearl}</p>
          </>)}
        </div>
        <aside className="an-col-side">
          <h2 className="an-h3">What it measures</h2>
          <div className="an-chiprow">{m.detects.map(d => <span key={d} className="sv-chip" style={{ "--chip": cat(m.category) }}>{d}</span>)}</div>
          <h2 className="an-h3">When it is used</h2>
          <PhaseTrack phases={m.phases} />
          {ex && <div className="an-chiprow" style={{ marginTop: 14 }}>{ex.role.map(r => <span key={r} className="sv-chip" style={{ "--chip": roleCol(r) }}>{r}</span>)}</div>}
        </aside>
      </div>

      <div className="an-deeper">
        <h2 className="hm-h2 an-deeper-h">Go deeper</h2>
        {steps.length > 0 && (
          <details>
            <summary>Protocol, step by step</summary>
            <ol className="an-steps">{steps.map((s2, k) => <li key={k}><span className="sv-mono">{String(k + 1).padStart(2, "0")}</span>{s2}</li>)}</ol>
          </details>
        )}
        <details>
          <summary>Typical parameters</summary>
          <table className="an-params"><tbody>{m.parameters.map(p => <tr key={p.name}><th>{p.name}</th><td>{p.typical}</td></tr>)}</tbody></table>
        </details>
        {cqas.length > 0 && (
          <details>
            <summary>Quality attributes it answers ({cqas.length})</summary>
            <ul className="an-cqa">
              {cqas.map(c => (
                <li key={c.cq}>
                  <button className="an-cqa-name" onClick={() => go("cqa/" + c.cq)}>{cqaName[c.cq]}</button>
                  <span className={`an-role an-role-${c.role}`}>{c.role}</span>
                  <p>{c.note}</p>
                </li>
              ))}
            </ul>
          </details>
        )}
        <details>
          <summary>What reviewers look for</summary>
          <ul className="an-list">{m.keyConsiderations.map(k => <li key={k}>{k}</li>)}</ul>
          <p className="an-prose an-reg">{m.regulatoryNote} <span className="sv-mono">{m.ichRef}</span></p>
        </details>
      </div>

      <nav className="an-pager">
        {prev ? <button onClick={() => go("atlas/" + prev.id)}><span>Previous assay</span><strong>{prev.abbreviation}</strong></button> : <span />}
        {next ? <button onClick={() => go("atlas/" + next.id)} style={{ textAlign: "right" }}><span>Next assay</span><strong>{next.abbreviation}</strong></button> : <span />}
      </nav>
    </article>
  );
}
