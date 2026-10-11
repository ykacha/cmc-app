import { useState } from "react";
import { MODULES, ALL_SECTIONS, DOSSIER_STATUS } from "../../../science/content/dossier";
import { ProvTag } from "../../../science/ui";

/* The CTD triangle: Module 1 is regional and sits on top of the harmonised
   Modules 2 to 5. Each tier selects a module. */
function Triangle({ mod, setMod }) {
  const tier = (id, label, sub, points, tx, ty) => (
    <g className={`wg-dz-tier${mod === id ? " is-on" : ""}${id === "m1" ? " is-regional" : ""}`} role="button" tabIndex={0}
       aria-pressed={mod === id} aria-label={`Module ${label.slice(-1)}: ${sub}`}
       onClick={() => setMod(id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setMod(id); } }}>
      <polygon points={points} />
      <text x={tx} y={ty} textAnchor="middle" className="wg-dz-tn">{label}</text>
      <text x={tx} y={ty + 15} textAnchor="middle" className="wg-dz-ts">{sub}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 360 250" className="wg-dz-tri" aria-label="CTD structure">
      {tier("m1", "Module 1", "Regional", "180,4 236.7,84 123.3,84", 180, 63)}
      {tier("m2", "Module 2", "Summaries", "119.1,90 240.9,90 290.5,160 69.5,160", 180, 122)}
      {tier("m3", "Module 3", "Quality", "65.3,166 136,166 136,244 10,244", 96, 202)}
      {tier("m4", "Module 4", "Nonclinical", "142,166 218,166 218,244 142,244", 180, 202)}
      {tier("m5", "Module 5", "Clinical", "224,166 294.7,166 350,244 224,244", 264, 202)}
    </svg>
  );
}

export function Dossier({ go, nav }) {
  const [mod, setMod] = useState("m3");
  const [sel, setSel] = useState("3.2.S.2.2");
  const [view, setView] = useState("filed");
  const m = MODULES.find(x => x.id === mod);
  const s = ALL_SECTIONS.find(x => x.id === sel && x.module === mod) || m.sections[0];
  const counts = Object.keys(DOSSIER_STATUS).map(k => [k, ALL_SECTIONS.filter(x => x.status === k).length]);
  const pickMod = (id) => { setMod(id); setSel(MODULES.find(x => x.id === id).sections[0].id); };
  const follow = (to) => {
    if (to.startsWith("#")) { const t = ALL_SECTIONS.find(x => x.id === to.slice(1)); if (t) { setMod(t.module); setSel(t.id); } return; }
    if (to.includes(":")) { const [v, f] = to.split(":"); nav(v, f || null); return; }
    go(to);
  };
  const missing = view === "today" && s.status === "later";

  return (
    <div className="wg">
      <div className="wg-head"><ProvTag p="hypothetical" /><span>An illustrative marketing application for the fictional CMX-417, written as it would read at filing. Every product fact, result, study and date is invented for teaching. Structure: ICH M4 for Modules 2 to 5; US BLA for Module 1.</span></div>

      <div className="wg-dz-top">
        <Triangle mod={mod} setMod={pickMod} />
        <div className="wg-dz-sum">
          <div className="wg-br-mode" role="group" aria-label="Perspective">
            <button aria-pressed={view === "filed"} className={`sv-tab${view === "filed" ? " is-on" : ""}`} onClick={() => setView("filed")}>As it would be filed</button>
            <button aria-pressed={view === "today"} className={`sv-tab${view === "today" ? " is-on" : ""}`} onClick={() => setView("today")}>What exists today</button>
          </div>
          <p className="wg-br-small">
            {view === "filed"
              ? "Every section filled in, end to end, as a complete application would be. Pick a module on the triangle, then a section."
              : "The same dossier read against where the programme stands now: development finished at laboratory and scale-down scale, with no GMP lots, PPQ, GLP toxicology or clinical studies. Sections that need those are marked."}
          </p>
          <dl className="wg-dz-counts">
            {counts.map(([k, n]) => <div key={k}><dt><i className={`wg-dz-dot is-${k}`} />{DOSSIER_STATUS[k].label}</dt><dd className="sv-mono">{n}</dd></div>)}
          </dl>
        </div>
      </div>

      <div className="wg-dz-modhead">
        <h4 className="wg-br-h"><span className="sv-mono">Module {m.n}</span>{m.title}</h4>
        <p className="wg-br-small">{m.about}</p>
      </div>

      <div className="wg-dz">
        <ol className="wg-dz-list" aria-label={`Sections in Module ${m.n}`}>
          {m.sections.map(x => (
            <li key={x.id}>
              <button aria-current={x.id === s.id ? "true" : undefined} className={`${x.id === s.id ? "is-on" : ""}${view === "today" && x.status === "later" ? " is-later" : ""}`} onClick={() => setSel(x.id)}>
                <i className={`wg-dz-dot is-${x.status}`} title={DOSSIER_STATUS[x.status].label} />
                <span className="sv-mono">{x.id}</span>
                <span>{x.title}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="wg-dz-detail" aria-live="polite">
          <div className="wg-dz-dh">
            <h4 className="wg-br-h"><span className="sv-mono">{s.id}</span>{s.title}</h4>
            <span className={`wg-dz-chip is-${s.status}`}>{DOSSIER_STATUS[s.status].label}</span>
          </div>

          {missing && (
            <div className="bk-callout bk-risk"><strong>Not generated yet</strong><p>{s.gap || DOSSIER_STATUS.later.note}</p></div>
          )}

          <div className={`wg-dz-doc${missing ? " is-ghost" : ""}`}>
            <span className="wg-dz-doclabel">{missing ? "What this section will say" : "In the dossier"}</span>
            <p>{s.fill}</p>
          </div>

          <dl className="wg-dl">
            <div><dt>Where it comes from</dt><dd>{s.from}</dd></div>
            <div><dt>Why it is there</dt><dd>{s.why}</dd></div>
            {view === "filed" && s.gap && <div><dt>Status for this programme today</dt><dd>{s.gap}</dd></div>}
          </dl>
          {s.links.length > 0 && (
            <div className="wg-chips" aria-label="Follow the evidence">
              {s.links.map(l => <button key={l.label} className="sv-tab" onClick={() => follow(l.to)}>{l.label}</button>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
