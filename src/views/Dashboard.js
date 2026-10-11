import { useState, useCallback } from "react";
import { Reveal } from "../lc";
import { InstrumentTrace } from "../motion";
import Molecule, { DOMAIN_INFO } from "../molecule";
import { pipeArt, stageArt } from "../science/art";
import { PIPELINE, DOMAINS, GLOSSARY } from "../cmc-data";
import { ANALYTICAL_METHODS } from "../extra-data";
import { CASE_STUDIES } from "../case-study-data";

const methodName = (id) => ANALYTICAL_METHODS.find(m => m.id === id)?.name || id;

/* The site's sections, grouped exactly like the sequence track. */
const GROUPS = [
  { label:"Explore", color:"var(--chain-h)", items:[
    { id:"pipeline", name:"Pipeline Explorer", line:`How it is done: gene construction to post-approval, in ${PIPELINE.length} operational stages.` },
    { id:"science",  name:"Science journey",   line:"Why it is done: the development programme from proposal to dossier, with interactive tools." },
    { id:"analytical", name:"Analytical",      line:`${ANALYTICAL_METHODS.length} assays run live, a validation lab, specs and comparability.` },
  ]},
  { label:"Tools", color:"var(--bridge)", items:[
    { id:"oos",   name:"OOS / OOT",    line:"The FDA 2006 investigation, worked as a decision tree." },
    { id:"batch", name:"Batch Record", line:"A sterile mAb batch to execute, deviations included." },
  ]},
  { label:"Practice", color:"var(--glycan)", items:[
    { id:"domains", name:"Domain Q-Bank", line:`${DOMAINS.length} domains of interview-grade questions.` },
    { id:"exam",  name:"Exam Mode", line:"Spaced repetition with written answers, no multiple choice." },
    { id:"notes", name:"Notes",     line:"Your own notes, kept in this browser." },
  ]},
  { label:"Library", color:"var(--chain-l)", items:[
    { id:"ich",       name:"ICH Guidelines",       line:"The guidelines, decoded into what they mean for CMC." },
    { id:"glossary",  name:"Glossary",             line:`${GLOSSARY.length} terms, defined the way a mentor would.` },
    { id:"compendial",name:"Compendial Reference", line:"USP, EP and JP methods, cross-referenced." },
    { id:"excipient", name:"Excipients",           line:"What can share a vial, and what cannot." },
    { id:"cases",     name:"Case Studies",         line:`${CASE_STUDIES.length} CMC failures, examined in full.` },
  ]},
  { label:"Career", color:"var(--text-muted)", items:[
    { id:"career",   name:"Career & Interviews", line:"The ladder from associate to VP, and what each rung is asked." },
    { id:"pathway",  name:"Learning Pathways",   line:"30, 60 and 90-day plans by level." },
    { id:"progress", name:"Progress",            line:"What you have covered and what is due for review." },
  ]},
];

const WAYS = [
  { id: "pipeline", name: "How it is made", line: "Walk the production line, station by station." },
  { id: "science", name: "Why it is done", line: "Follow the development programme to the dossier." },
  { id: "analytical", name: "How it is measured", line: "Run the assays and read the results." },
];
const FEATURE_ART = { pipeline: pipeArt("s05"), science: stageArt("ctd"), analytical: stageArt("analytical") };

export default function Dashboard({ setView, dark }) {
  const [hover, setHover] = useState(null);
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
          <Molecule dark={dark} stress={null} onHover={setHover} onPick={onPick} />
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

          <ul className="hm-ways" aria-label="Three ways in">
            {WAYS.map(w => (
              <li key={w.id}>
                <button onClick={() => go(w.id)}>
                  <strong>{w.name}</strong>
                  <span>{w.line}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Everything on the site: three explorations, then the rest ── */}
      <section className="hm-section">
        <Reveal>
          <h2 className="hm-h2">Everything on the site.</h2>
          <p className="hm-sub">Start with the three explorations. The tools, practice and reference are there when you need them.</p>
        </Reveal>
        <div className="hm-feature">
          {GROUPS[0].items.map(it => (
            <button key={it.id} className="hm-tile" onClick={() => go(it.id)}>
              <span className="hm-tile-art">{FEATURE_ART[it.id] && <img src={FEATURE_ART[it.id]} alt="" loading="lazy" width="1200" height="800" />}</span>
              <strong>{it.name}</strong>
              <span>{it.line}</span>
            </button>
          ))}
        </div>
        <div className="hm-dir">
          {GROUPS.slice(1).map(g => (
            <div key={g.label} className="hm-dir-col" style={{ "--seg": g.color }}>
              <h3>{g.label}</h3>
              <ul>
                {g.items.map(it => (
                  <li key={it.id}><button onClick={() => go(it.id)}><strong>{it.name}</strong><span>{it.line}</span></button></li>
                ))}
              </ul>
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
