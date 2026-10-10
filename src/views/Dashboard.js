import { useState, useCallback } from "react";
import { Reveal } from "../lc";
import { InstrumentTrace } from "../motion";
import Molecule, { DOMAIN_INFO, STRESSES } from "../molecule";
import { PIPELINE, DOMAINS, GLOSSARY } from "../cmc-data";
import { ANALYTICAL_METHODS } from "../extra-data";
import { CASE_STUDIES } from "../case-study-data";

const methodName = (id) => ANALYTICAL_METHODS.find(m => m.id === id)?.name || id;

/* The site's sections, grouped exactly like the sequence track. */
const GROUPS = [
  { label:"Learn", color:"var(--chain-h)", items:[
    { id:"pipeline", name:"Pipeline Explorer", line:`Gene construction to post-approval lifecycle, in ${PIPELINE.length} stages.` },
    { id:"timeline", name:"CMC Timeline",      line:"What is due, and when, from pre-IND to post-approval." },
    { id:"domains",  name:"Domain Q-Bank",     line:`${DOMAINS.length} domains of interview-grade questions.` },
    { id:"ich",      name:"ICH Guidelines",    line:"The guidelines, decoded into what they mean for CMC." },
    { id:"glossary", name:"Glossary",          line:`${GLOSSARY.length} terms, defined the way a mentor would.` },
  ]},
  { label:"Science", color:"var(--chain-l)", items:[
    { id:"analytical", name:"Analytical",       line:`${ANALYTICAL_METHODS.length} assays run live, a validation lab, specs and comparability.` },
    { id:"qbd",       name:"QbD / CQA / CPP",    line:"Design space, FMEA and the control strategy that follows." },
    { id:"viral",     name:"Viral Clearance",    line:"Model viruses, orthogonal steps and the LRV arithmetic." },
    { id:"stability", name:"Stability Studies",  line:"ICH Q1A(R2) conditions and the shelf-life math." },
    { id:"compendial",name:"Compendial Reference", line:"USP, EP and JP methods, cross-referenced." },
    { id:"excipient", name:"Excipients",         line:"What can share a vial, and what cannot." },
  ]},
  { label:"Tools", color:"var(--bridge)", items:[
    { id:"ctd",   name:"CTD Navigator",   line:"Where every part of the dossier lives." },
    { id:"oos",   name:"OOS / OOT",       line:"The FDA 2006 investigation, worked as a decision tree." },
    { id:"batch", name:"Batch Record",    line:"A sterile mAb batch to execute, deviations included." },
    { id:"cases", name:"Case Studies",    line:`${CASE_STUDIES.length} CMC failures, examined in full.` },
  ]},
  { label:"Practice", color:"var(--glycan)", items:[
    { id:"exam",  name:"Exam Mode", line:"Spaced repetition with written answers, no multiple choice." },
    { id:"notes", name:"Notes",     line:"Your own notes, kept in this browser." },
  ]},
  { label:"Career", color:"var(--text-muted)", items:[
    { id:"career",   name:"Career & Interviews", line:"The ladder from associate to VP, and what each rung is asked." },
    { id:"pathway",  name:"Learning Pathways",   line:"30, 60 and 90-day plans by level." },
    { id:"progress", name:"Progress",            line:"What you have covered and what is due for review." },
  ]},
];

export default function Dashboard({ setView, dark }) {
  const [hover, setHover] = useState(null);
  const [stress, setStress] = useState(null);
  const st = STRESSES.find(s => s.id === stress);
  const go = (id, focus) => setView(id, focus);
  const onPick = useCallback((g) => setView("methods", DOMAIN_INFO[g].method), [setView]);

  const pool = [...PIPELINE.flatMap(s => s.questions), ...DOMAINS.flatMap(d => d.questions)];
  const [spot, setSpot] = useState(() => pool[Math.floor(Math.random() * pool.length)]);
  const [open, setOpen] = useState(false);
  const shuffle = () => { setSpot(pool[Math.floor(Math.random() * pool.length)]); setOpen(false); };
  const info = hover ? DOMAIN_INFO[hover] : null;

  return (
    <div className="hm">
      {/* ── The molecule ── */}
      <section className="hm-hero">
        <div className="hm-stage">
          <Molecule dark={dark} stress={stress} onHover={setHover} onPick={onPick} />
          <div className="hm-readout" aria-live="polite">
            {info ? (
              <>
                <strong>{info.name}</strong>
                <span>{info.line}</span>
                <button className="hm-link" onClick={() => go("methods", info.method)}>Open {methodName(info.method)}</button>
              </>
            ) : (
              <span className="hm-hint">Drag to turn the molecule. Hover or tap a domain to see what lives there.</span>
            )}
          </div>
        </div>

        <div className="hm-copy">
          <h1 className="hm-h1">From sequence<br />to shelf.</h1>
          <p className="hm-lede">
            Biologics CMC, end to end: {PIPELINE.length} development stages, {ANALYTICAL_METHODS.length} analytical methods,
            and the reasoning behind every release specification. Written by Yash Kacha.
          </p>
          <div className="hm-actions">
            <button className="hm-primary" onClick={() => go("pipeline")}>Enter the pipeline</button>
            <button className="hm-secondary" onClick={() => go("methods")}>Open the assays</button>
          </div>

          <div className="hm-stress">
            <div className="hm-stress-head">
              <strong>Stress the molecule</strong>
              <div className="hm-stress-tabs" role="group" aria-label="Stress condition">
                {STRESSES.map(s => (
                  <button key={s.id} className={`sv-tab${stress === s.id ? " is-on" : ""}`} style={{ "--tab":"#C8262C" }}
                    aria-pressed={stress === s.id} onClick={() => setStress(stress === s.id ? null : s.id)}>{s.label}</button>
                ))}
              </div>
            </div>
            {st ? (
              <div className="hm-stress-body" key={st.id}>
                <div className="hm-cond sv-mono">{st.cond}</div>
                <p>{st.what}</p>
                <div className="hm-measure">
                  <span>Measured by</span>
                  {st.how.map(([n, id, unit]) => (
                    <button key={id + n} className="hm-assay" onClick={() => go("methods", id)}>
                      {n} <em className="sv-mono">{unit}</em>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="hm-stress-empty">Pick a condition to see where an IgG1 degrades, and which assay catches it.</p>
            )}
          </div>
        </div>
      </section>

      {/* ── The sections, read like a chain ── */}
      <section className="hm-section">
        <Reveal>
          <h2 className="hm-h2">Twenty sections, one molecule's life.</h2>
          <p className="hm-sub">Each row is a segment of the track at the top of every page.</p>
        </Reveal>
        <div className="hm-chain">
          {GROUPS.map(g => (
            <div key={g.label} className="hm-row" style={{ "--seg": g.color }}>
              <div className="hm-row-name">{g.label}</div>
              <div className="hm-cells">
                {g.items.map(it => (
                  <button key={it.id} className="hm-cell" onClick={() => go(it.id)}>
                    <i />
                    <strong>{it.name}</strong>
                    <span>{it.line}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Proof: a real release readout ── */}
      <section className="hm-section hm-proof">
        <Reveal>
          <div className="hm-proof-copy">
            <h2 className="hm-h2">Read a result the way QC does.</h2>
            <p className="hm-sub sv-measure">
              Size-exclusion chromatography separates aggregates, monomer and fragments by size. Monomer purity against a
              specification is one of the first numbers a release reviewer checks. The run on the right is illustrative.
            </p>
            <button className="hm-link" onClick={() => go("methods", "am-sec")}>How SEC-HPLC is run and validated</button>
          </div>
        </Reveal>
        <Reveal delay={80}><InstrumentTrace /></Reveal>
      </section>

      {/* ── One question ── */}
      <section className="hm-section">
        <Reveal>
          <div className="hm-q">
            <p className="hm-q-text">{spot.q}</p>
            <div className="hm-q-row">
              {!open && <button className="hm-secondary" onClick={() => setOpen(true)}>Show the reasoning</button>}
              <span className="hm-q-level">{spot.level} level</span>
              <button className="hm-link" onClick={shuffle}>Another question</button>
            </div>
            {open && (
              <div className="hm-q-ans">
                <div><strong>Why it matters</strong><p>{spot.why}</p></div>
                <div><strong>How to approach it</strong><p>{spot.how}</p></div>
                <small>Reference: {spot.ref}</small>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* ── Close ── */}
      <section className="hm-close">
        <h2 className="hm-close-h">Start at stage 01.</h2>
        <div className="hm-actions">
          <button className="hm-primary" onClick={() => go("pipeline")}>Enter the pipeline</button>
          <button className="hm-secondary" onClick={() => go("exam")}>Test yourself first</button>
        </div>
      </section>
    </div>
  );
}
