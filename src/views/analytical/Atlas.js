import { useState, useMemo } from "react";
import { ANALYTICAL_METHODS } from "../../extra-data";
import { METHOD_EXTRAS, CQA_METHODS, QUALITY_ATTRIBUTES, ROLE_DEFS } from "../../analytical-data";
import { METHOD_STEPS } from "../../shared";
import { Theatre } from "./theatre";
import { THEATRES } from "./theatre-configs";

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
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");
  const cats = useMemo(() => ["All", ...new Set(ANALYTICAL_METHODS.map(m => m.category))], []);
  const list = ANALYTICAL_METHODS.filter(m => (filter === "All" || m.category === filter) &&
    (!q || `${m.name} ${m.abbreviation} ${m.purpose} ${m.category}`.toLowerCase().includes(q.toLowerCase())));

  if (item && byId[item]) return <AssayPage m={byId[item]} go={go} />;

  return (
    <div>
      <div className="an-filterbar">
        <div className="an-filters" role="group" aria-label="Filter by category">
          {cats.map(c => (
            <button key={c} className={`sv-tab${filter === c ? " is-on" : ""}`} style={c !== "All" ? { "--tab": cat(c) } : undefined}
              aria-pressed={filter === c} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>
        <label className="an-search">
          <span className="sr-only">Search assays</span>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search assay, abbreviation, attribute" />
        </label>
      </div>

      <div className="mt-cells">
        {list.map(m => {
          const ex = METHOD_EXTRAS[m.id];
          return (
            <button key={m.id} className="mt-cell" onClick={() => go("atlas/" + m.id)} style={{ "--seg": cat(m.category) }}>
              <i />
              <span className="mt-cell-top"><strong>{m.abbreviation}</strong>{THEATRES[m.id] && <span className="an-live">Live run</span>}</span>
              <span className="mt-cell-name">{m.name}</span>
              <span className="mt-cell-purpose">{m.purpose}</span>
              <span className="mt-cell-tags">
                <span className="sv-chip" style={{ "--chip": cat(m.category) }}>{m.category}</span>
                {ex?.role.slice(0, 2).map(r => <span key={r} className="sv-chip" style={{ "--chip": roleCol(r) }}>{r}</span>)}
              </span>
            </button>
          );
        })}
        {list.length === 0 && <p className="an-empty">No assay matches “{q}”. Try a technique (SEC, ELISA) or an attribute (aggregation, glycan).</p>}
      </div>
    </div>
  );
}

function AssayPage({ m, go }) {
  const ex = METHOD_EXTRAS[m.id];
  const steps = METHOD_STEPS[m.id] || [];
  const cqas = methodCqas(m.id);
  const i = ANALYTICAL_METHODS.findIndex(x => x.id === m.id);
  const prev = ANALYTICAL_METHODS[i - 1], next = ANALYTICAL_METHODS[i + 1];

  return (
    <article className="an-assay" key={m.id}>
      <nav className="an-crumbs">
        <button className="hm-link" onClick={() => go("atlas")}>All assays</button>
        <span className="an-crumb-sep" aria-hidden="true">/</span>
        <span>{m.category}</span>
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
          <div><dt>Guideline</dt><dd>{m.ichRef}</dd></div>
        </dl>
      </header>

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
          <h2 className="an-h3">What it measures</h2>
          <div className="an-chiprow">{m.detects.map(d => <span key={d} className="sv-chip" style={{ "--chip": cat(m.category) }}>{d}</span>)}</div>

          {cqas.length > 0 && (<>
            <h2 className="an-h3">Quality attributes it answers</h2>
            <ul className="an-cqa">
              {cqas.map(c => (
                <li key={c.cq}>
                  <button className="an-cqa-name" onClick={() => go("map/" + c.cq)}>{cqaName[c.cq]}</button>
                  <span className={`an-role an-role-${c.role}`}>{c.role}</span>
                  <p>{c.note}</p>
                </li>
              ))}
            </ul>
          </>)}

          <h2 className="an-h3">What reviewers look for</h2>
          <ul className="an-list">{m.keyConsiderations.map(k => <li key={k}>{k}</li>)}</ul>
          <p className="an-prose an-reg">{m.regulatoryNote}</p>
        </div>

        <aside className="an-col-side">
          {steps.length > 0 && (<>
            <h2 className="an-h3">Protocol</h2>
            <ol className="an-steps">{steps.map((s, k) => <li key={k}><span className="sv-mono">{String(k + 1).padStart(2, "0")}</span>{s}</li>)}</ol>
          </>)}
          <h2 className="an-h3">Typical parameters</h2>
          <table className="an-params"><tbody>{m.parameters.map(p => <tr key={p.name}><th>{p.name}</th><td>{p.typical}</td></tr>)}</tbody></table>
          <h2 className="an-h3">When it is used</h2>
          <PhaseTrack phases={m.phases} />
          {ex && <div className="an-chiprow" style={{ marginTop: 14 }}>{ex.role.map(r => <span key={r} className="sv-chip" style={{ "--chip": roleCol(r) }}>{r}</span>)}</div>}
        </aside>
      </div>

      <nav className="an-pager">
        {prev ? <button onClick={() => go("atlas/" + prev.id)}><span>Previous assay</span><strong>{prev.abbreviation}</strong></button> : <span />}
        {next ? <button onClick={() => go("atlas/" + next.id)} style={{ textAlign: "right" }}><span>Next assay</span><strong>{next.abbreviation}</strong></button> : <span />}
      </nav>
    </article>
  );
}
