import { useState } from "react";
import { Reveal, CountUp } from "../lc";
import { PIPELINE, DOMAINS, GLOSSARY } from "../cmc-data";
import { ANALYTICAL_METHODS, ICH_GUIDELINES } from "../extra-data";
import { CASE_STUDIES } from "../case-study-data";
import { COMPENDIAL_METHODS } from "../compendial-data";

const MONO = "var(--font-mono)";
const SERIF = "var(--font-serif)";

/* ── module index (replaces the old icon-tile grid entirely) ── */
const SECTIONS = [
  { id:"pipeline",  label:"Pipeline Explorer",  desc:"Gene construction to commercial lifecycle, in sixteen stages.", group:"core" },
  { id:"methods",   label:"Analytical Methods", desc:"Twenty-two assays, and the reasoning behind each one.",         group:"core" },
  { id:"qbd",       label:"QbD / CQA / CPP",    desc:"Design space, FMEA, and the control strategy that follows.",   group:"core" },
  { id:"viral",     label:"Viral Clearance",    desc:"Model viruses, orthogonal steps, and the LRV math.",           group:"core" },
  { id:"ctd",       label:"CTD Navigator",      desc:"Where every piece of the dossier actually lives.",             group:"core" },
  { id:"timeline",  label:"CMC Timeline",       desc:"What's due, and when, from Pre-IND to post-approval.",         group:"core" },
  { id:"domains",   label:"Domain Q-Bank",      desc:`${DOMAINS.length} domains, built for depth over breadth.`,     group:"core" },
  { id:"exam",      label:"Exam Mode",          desc:"Spaced repetition, no multiple choice to hide behind.",        group:"core" },
  { id:"ich",       label:"ICH Guidelines",     desc:"Nine guidelines, decoded into what they mean for CMC.",        group:"core" },
  { id:"career",    label:"Career & Interviews",desc:"What the ladder pays, and what gets asked at each rung.",      group:"core" },
  { id:"notes",     label:"My Notes",           desc:"A place to keep what you don't want to relearn.",              group:"core" },
  { id:"glossary",  label:"CMC Glossary",       desc:`${GLOSSARY.length} terms, defined the way a mentor would.`,    group:"core" },
  { id:"stability", label:"Stability Studies",  desc:"ICH Q1A(R2) conditions, and the T90 math behind shelf life.",  group:"tools" },
  { id:"oos",       label:"OOS / OOT",          desc:"The FDA 2006 decision tree, worked as an actual investigation.", group:"tools" },
  { id:"batch",     label:"Batch Record Sim",   desc:"A sterile mAb batch, deviations included.",                    group:"tools" },
  { id:"compendial",label:"Compendial Ref",     desc:"USP, EP, and JP, cross-referenced instead of scattered.",      group:"tools" },
  { id:"excipient", label:"Excipient Compat",   desc:"What can and can't share a vial, and why.",                    group:"tools" },
  { id:"cases",     label:"Case Studies",       desc:`${CASE_STUDIES.length} failures worth understanding in full.`, group:"tools" },
  { id:"pathway",   label:"Learning Pathways",  desc:"A 30/60/90-day plan, scaled to where you actually are.",       group:"tools" },
  { id:"progress",  label:"My Progress",        desc:"What you've covered, and what's still due for review.",       group:"tools" },
];

/* ── hero backdrop: oversized corner wordmark + soft ambient light. ── */
function HeroBackdrop() {
  return (
    <div aria-hidden="true" style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
      <div style={{
        position:"absolute", top:"-24%", right:"-8%", width:"64vw", height:"64vw", borderRadius:"50%",
        background:"radial-gradient(circle, color-mix(in srgb, var(--accent) 20%, transparent), transparent 70%)",
      }} />
      <div style={{
        position:"absolute", top:"46%", left:"6%", width:"46vw", height:"46vw", borderRadius:"50%",
        transform:"translate(-30%,-50%)",
        background:"radial-gradient(circle, color-mix(in srgb, var(--accent) 16%, transparent), transparent 72%)",
      }} />
      <div style={{
        position:"absolute", top:"4%", right:"-2%", fontFamily:SERIF, fontWeight:600,
        fontSize:"clamp(240px,32vw,620px)", lineHeight:0.78, letterSpacing:"-.04em",
        color:"var(--text-h)", opacity:0.05, userSelect:"none", whiteSpace:"nowrap",
      }}>
        CMC
      </div>
    </div>
  );
}

function IndexRow({ n, s, setView, delay, tick }) {
  const [hover, setHover] = useState(false);
  return (
    <Reveal delay={delay}>
      <button onClick={() => setView(s.id)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        className="lc-index-row" style={{ width:"100%", background:"none", border:"none", cursor:"pointer", textAlign:"left", display:"grid", gridTemplateColumns:"3px 56px minmax(0,1fr) auto", alignItems:"center", gap:20 }}>
        <span style={{ alignSelf:"stretch", background: hover ? tick : "transparent", transition:"background .25s ease", borderRadius:1 }} />
        <span className="lc-index-num">{String(n).padStart(2,"0")}</span>
        <span>
          <span style={{ display:"block", fontFamily:SERIF, fontSize:22, color: hover ? "var(--accent)" : "var(--text-h)", letterSpacing:"-.01em", transition:"color .3s ease" }}>{s.label}</span>
          <span style={{ display:"block", fontFamily:MONO, fontSize:11.5, color:"var(--text-muted)", marginTop:4 }}>{s.desc}</span>
        </span>
        <span style={{ fontFamily:MONO, fontSize:13, color: hover ? "var(--accent)" : "var(--text-faint)", transition:"opacity .3s ease, color .3s ease", opacity: hover ? 1 : 0.4 }}>→</span>
      </button>
    </Reveal>
  );
}

function ChapterHeading({ label, mark }) {
  return (
    <div style={{ position:"relative", marginBottom:6, overflow:"hidden" }}>
      <div aria-hidden style={{ position:"absolute", right:0, top:-46, fontFamily:SERIF, fontSize:120, fontWeight:500, color:"var(--text-faint)", opacity:0.12, lineHeight:1, userSelect:"none" }}>{mark}</div>
      <div style={{ position:"relative", fontFamily:MONO, fontSize:10.5, fontWeight:700, letterSpacing:".2em", color:"var(--accent)" }}>{label}</div>
    </div>
  );
}

export default function Dashboard({ setView }) {
  const allQ = PIPELINE.flatMap(s => s.questions).length + DOMAINS.flatMap(d => d.questions).length;
  const refs = ICH_GUIDELINES.length + COMPENDIAL_METHODS.length;

  const pool = [...PIPELINE.flatMap(s => s.questions), ...DOMAINS.flatMap(d => d.questions)];
  const [spot, setSpot] = useState(() => pool[Math.floor(Math.random()*pool.length)]);
  const [open, setOpen] = useState(false);
  const shuffle = () => { setSpot(pool[Math.floor(Math.random()*pool.length)]); setOpen(false); };

  const core = SECTIONS.filter(s => s.group === "core");
  const tools = SECTIONS.filter(s => s.group === "tools");

  const SPECS = [
    { label:"Modules", value:SECTIONS.length },
    { label:"Pipeline Stages", value:PIPELINE.length },
    { label:"Analytical Methods", value:ANALYTICAL_METHODS.length },
    { label:"Practice Questions", value:allQ },
    { label:"Case Studies", value:CASE_STUDIES.length },
    { label:"References", value:refs },
  ];

  return (
    <div style={{ position:"relative", zIndex:1 }}>

      {/* ── OPENING ── */}
      <section style={{ minHeight:"92vh", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", overflow:"hidden", padding:"48px 32px" }}>
        <HeroBackdrop />
        <div style={{ maxWidth:1280, margin:"0 auto", width:"100%", position:"relative" }}>
          <div style={{ maxWidth:640 }}>
            <div style={{ fontFamily:MONO, fontSize:11, fontWeight:700, letterSpacing:".24em", color:"var(--accent)", marginBottom:28 }}>
              CMC APP · BUILT FROM THE BENCH UP
            </div>
            <h1 style={{ fontFamily:SERIF, fontWeight:500, fontSize:"clamp(38px,6vw,74px)", letterSpacing:"-.02em", lineHeight:1.04, margin:0, color:"var(--text-h)" }}>
              The CMC reference<br/>nobody handed you<br/>on day one<span style={{ color:"var(--accent)" }}>.</span>
            </h1>
            <p style={{ color:"var(--text-body)", fontSize:17, lineHeight:1.7, margin:"28px 0 0", maxWidth:480 }}>
              {SECTIONS.length} modules from gene construction to post-approval lifecycle, plus {allQ} practice questions
              pulled from the kind of thing that actually comes up in a tech transfer meeting.
            </p>
            <div style={{ marginTop:36, display:"flex", gap:32, alignItems:"center" }}>
              <button onClick={() => setView("pipeline")} className="lc-link" style={{ fontSize:15, fontFamily:SERIF }}>
                Begin with the Pipeline →
              </button>
              <button onClick={() => setView("exam")} className="lc-link" style={{ fontSize:15, fontFamily:SERIF, color:"var(--text-body)" }}>
                Or test yourself first
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="lc-manifesto-grid" style={{ maxWidth:1280, margin:"0 auto", padding:"64px 32px", borderTop:"1px solid var(--hairline)" }}>
        <Reveal>
          <p style={{ fontFamily:SERIF, fontSize:"clamp(22px,3vw,34px)", lineHeight:1.4, color:"var(--text-h)", maxWidth:760, letterSpacing:"-.01em" }}>
            Most of CMC is learned the hard way: after a deviation, in a tech transfer meeting, or the week before
            a filing is due. This is what it would have looked like written down first.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div style={{ borderLeft:"2px solid var(--accent)", paddingLeft:18 }}>
            <div style={{ fontFamily:MONO, fontSize:10, letterSpacing:".16em", color:"var(--text-faint)", marginBottom:6 }}>GOVERNED BY</div>
            <div style={{ fontFamily:MONO, fontSize:12, color:"var(--text-sec)", lineHeight:1.9 }}>
              ICH Q5A · Q6B · Q8(R2)<br/>ICH Q9 · Q10 · Q11<br/>21 CFR 211 · EU Annex 1
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── SPECIFICATIONS ── */}
      <section style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px 64px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:0, borderTop:"1px solid var(--hairline)", borderBottom:"1px solid var(--hairline)" }}>
          {SPECS.map((s, i) => (
            <Reveal key={s.label} delay={i*40}>
              <div className="lc-spec" style={{ borderTop:"none", borderLeft: i>0 ? "1px solid var(--hairline)" : "none", padding:"22px 20px" }}>
                <dt>{s.label}</dt>
                <dd style={{ fontSize:28 }}><CountUp to={s.value} /></dd>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── MODULE INDEX ── */}
      <section style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px 80px" }}>
        <div className="lc-index-grid">
          <div>
            <Reveal><ChapterHeading label="CORE CURRICULUM" mark="01–12" /></Reveal>
            <div>
              {core.map((s, i) => <IndexRow key={s.id} n={i+1} s={s} setView={setView} delay={i*30} tick="var(--accent)" />)}
            </div>
          </div>

          <div>
            <Reveal><ChapterHeading label="ADVANCED TOOLS" mark="13–20" /></Reveal>
            <div>
              {tools.map((s, i) => <IndexRow key={s.id} n={core.length+i+1} s={s} setView={setView} delay={i*30} tick="var(--accent-2)" />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONCEPT SPOTLIGHT ── */}
      <section style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px 100px" }}>
        <Reveal>
          <div style={{ border:"1px solid var(--hairline)", borderRadius:2, padding:"40px 40px 36px", background:"var(--panel)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16, flexWrap:"wrap" }}>
              <div style={{ flex:1, minWidth:280 }}>
                <div style={{ fontFamily:MONO, fontSize:10.5, fontWeight:700, letterSpacing:".2em", color:"var(--text-faint)", marginBottom:16 }}>
                  TODAY'S QUESTION · {spot.level?.toUpperCase()}
                </div>
                <p style={{ fontFamily:SERIF, color:"var(--text-h)", margin:0, fontSize:24, lineHeight:1.5, maxWidth:820 }}>{spot.q}</p>
              </div>
              <button onClick={shuffle} className="lc-link" style={{ fontSize:13, fontFamily:MONO, flexShrink:0 }}>Another one →</button>
            </div>
            {!open ? (
              <button onClick={() => setOpen(true)} className="lc-pill" style={{ marginTop:24, padding:"10px 22px", fontSize:13 }}>Reveal rationale</button>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:32, marginTop:28, animation:"lc-dropin .4s ease" }}>
                {[["Why it matters", spot.why], ["How to approach it", spot.how]].map(([l,txt]) => (
                  <div key={l} style={{ borderTop:"1px solid var(--hairline)", paddingTop:16 }}>
                    <div style={{ color:"var(--accent)", fontFamily:MONO, fontSize:10.5, fontWeight:700, letterSpacing:".1em", marginBottom:8, textTransform:"uppercase" }}>{l}</div>
                    <p style={{ color:"var(--text-sec)", margin:0, fontSize:14, lineHeight:1.7 }}>{txt}</p>
                  </div>
                ))}
                <p style={{ gridColumn:"span 2", color:"var(--text-faint)", fontSize:11.5, margin:0, fontStyle:"italic" }}>Ref: {spot.ref}</p>
              </div>
            )}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
