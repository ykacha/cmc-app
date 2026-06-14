import { useState, useRef } from "react";
import { Badge } from "../shared";
import { Reveal, Tilt, Magnetic, CountUp, TEXT, SUB, FAINT } from "../lc";
import { PIPELINE, DOMAINS } from "../cmc-data";
import { ANALYTICAL_METHODS, ICH_GUIDELINES } from "../extra-data";
import { CASE_STUDIES } from "../case-study-data";
import { COMPENDIAL_METHODS } from "../compendial-data";

/* ──────────────────────────────────────────────────────────────
   Chrome hero centerpiece — morphing blob + antibody + orbits
   ────────────────────────────────────────────────────────────── */
function ChromeHero() {
  return (
    <div style={{ position:"relative", width:320, height:320, margin:"0 auto" }}>
      <div style={{ position:"absolute", inset:"8%", borderRadius:"50%",
        background:"radial-gradient(circle at 38% 32%, #ffffffaa, #A78BFA55 32%, #22D3EE33 56%, transparent 72%)",
        filter:"blur(10px)", animation:"lc-pulse 4.5s ease-in-out infinite" }}/>

      <svg viewBox="0 0 320 320" style={{ position:"absolute", inset:0, width:"100%", height:"100%", overflow:"visible" }}>
        <defs>
          <linearGradient id="lc-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22D3EE"/><stop offset="50%" stopColor="#A78BFA"/><stop offset="100%" stopColor="#F472B6"/>
          </linearGradient>
        </defs>
        <g style={{ transformOrigin:"160px 160px", animation:"lc-spin 20s linear infinite" }}>
          <ellipse cx="160" cy="160" rx="150" ry="56" transform="rotate(-22 160 160)" stroke="url(#lc-ring)" strokeWidth="1.3" fill="none" opacity=".55"/>
        </g>
        <g style={{ transformOrigin:"160px 160px", animation:"lc-spin-rev 26s linear infinite" }}>
          <ellipse cx="160" cy="160" rx="128" ry="68" transform="rotate(26 160 160)" stroke="url(#lc-ring)" strokeWidth="1" fill="none" opacity=".4"/>
        </g>
      </svg>

      {[
        { c:"#22D3EE", d:"20s", r:140, delay:"0s" },
        { c:"#F472B6", d:"26s", r:128, delay:"-9s" },
        { c:"#34D399", d:"16s", r:118, delay:"-5s" },
      ].map((n, i) => (
        <div key={i} style={{ position:"absolute", inset:0, animation:`lc-spin ${n.d} linear infinite`, animationDelay:n.delay }}>
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:`translate(${n.r}px,-50%)` }}>
            <div style={{ width:15, height:15, borderRadius:"50%",
              background:`radial-gradient(circle at 35% 30%, #fff, ${n.c} 60%, ${n.c}99)`,
              boxShadow:`0 0 12px ${n.c}, inset 0 1px 1px rgba(255,255,255,.8)` }}/>
          </div>
        </div>
      ))}

      <div className="lc-gloss" style={{ position:"absolute", inset:"24%",
        animation:"lc-morph 14s ease-in-out infinite, lc-float 6.5s ease-in-out infinite",
        background:"radial-gradient(circle at 33% 27%, #ffffff, #d6e6ff 13%, #9fb6d8 36%, #4a5876 64%, #1c2238 100%)",
        boxShadow:"inset 0 7px 20px rgba(255,255,255,.6), inset 0 -18px 34px rgba(0,0,0,.55), 0 34px 64px -18px rgba(34,211,238,.5), 0 0 0 1px rgba(255,255,255,.14)" }}>
        <svg viewBox="0 0 100 100" style={{ position:"absolute", inset:0, width:"100%", height:"100%", filter:"drop-shadow(0 2px 3px rgba(0,0,0,.35))" }}>
          <g stroke="#fff" strokeWidth="5.5" strokeLinecap="round" fill="none" opacity=".96">
            <path d="M50 74 L50 50"/><path d="M50 50 L34 30"/><path d="M50 50 L66 30"/>
          </g>
          <g stroke="#bfe9ff" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".9"><path d="M41 41 L59 41"/></g>
          {[["50","78"],["32","26"],["68","26"]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="4.4" fill="#fff" opacity=".96"/>)}
        </svg>
      </div>

      <div style={{ position:"absolute", bottom:"4%", left:"50%", transform:"translateX(-50%)", width:"54%", height:20,
        background:"radial-gradient(ellipse, rgba(120,200,255,.45), transparent 70%)", filter:"blur(7px)" }}/>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Section catalog
   ────────────────────────────────────────────────────────────── */
const SECTIONS = [
  { id:"pipeline",  icon:"🗺️", label:"Pipeline Explorer",     desc:"16-stage biologic lifecycle",        color:"#C084FC", group:"core" },
  { id:"methods",   icon:"🔬", label:"Analytical Methods",     desc:"22 assay deep-dive cards",           color:"#22D3EE", group:"core" },
  { id:"qbd",       icon:"⚗️", label:"QbD / CQA / CPP",       desc:"FMEA, design space, COA",            color:"#F472B6", group:"core" },
  { id:"ctd",       icon:"📂", label:"CTD Navigator",          desc:"Modules 1–5 CMC reference",          color:"#34D399", group:"core" },
  { id:"timeline",  icon:"📅", label:"CMC Timeline",           desc:"Phase-by-phase deliverables",        color:"#F59E0B", group:"core" },
  { id:"domains",   icon:"📚", label:"Domain Q-Bank",          desc:"100+ Qs across 10 domains",          color:"#38BDF8", group:"core" },
  { id:"exam",      icon:"🎯", label:"Exam Mode",              desc:"Adaptive spaced-repetition",         color:"#F472B6", group:"core" },
  { id:"ich",       icon:"📜", label:"ICH Guidelines",         desc:"9 quality guidelines decoded",       color:"#A78BFA", group:"core" },
  { id:"career",    icon:"🚀", label:"Career & Interviews",    desc:"Ladder, salaries, 18 Q&As",          color:"#60A5FA", group:"core" },
  { id:"notes",     icon:"📝", label:"My Notes",               desc:"Capture & organize notes",           color:"#FB923C", group:"core" },
  { id:"glossary",  icon:"📖", label:"CMC Glossary",           desc:"50 essential terms",                 color:"#34D399", group:"core" },
  { id:"stability", icon:"🧊", label:"Stability Studies",      desc:"ICH Q1A(R2) + T90 calc",             color:"#38BDF8", group:"tools" },
  { id:"oos",       icon:"🚨", label:"OOS / OOT",              desc:"FDA 2006 decision tree",             color:"#F59E0B", group:"tools" },
  { id:"batch",     icon:"📋", label:"Batch Record Sim",       desc:"Sterile mAb BPR + deviations",       color:"#34D399", group:"tools" },
  { id:"cases",     icon:"📰", label:"Case Studies",           desc:`${CASE_STUDIES.length} landmark CMC failures`, color:"#F472B6", group:"tools" },
  { id:"compendial",icon:"📗", label:"Compendial Ref",         desc:"USP / EP / JP cross-ref",            color:"#A78BFA", group:"tools" },
  { id:"excipient", icon:"🧫", label:"Excipient Compat",       desc:"18 excipients + matrix",             color:"#60A5FA", group:"tools" },
  { id:"pathway",   icon:"🎓", label:"Learning Pathways",      desc:"30/60/90-day plans",                 color:"#FB923C", group:"tools" },
  { id:"progress",  icon:"📊", label:"My Progress",            desc:"Queue, activity & badges",           color:"#C084FC", group:"tools" },
];

function SectionTile({ s, onClick, delay }) {
  return (
    <Reveal delay={delay}>
      <Tilt onClick={onClick} className="lc-shine lc-gloss"
        style={{ borderRadius:18, padding:"18px 18px 20px", cursor:"pointer", height:"100%",
          background:"linear-gradient(160deg, rgba(255,255,255,.07), rgba(255,255,255,.015))",
          border:"1px solid rgba(255,255,255,.09)", position:"relative",
          boxShadow:"inset 0 1px 0 rgba(255,255,255,.14), 0 18px 40px -26px rgba(0,0,0,.9)" }}>
        <span className="lc-meshlayer" />
        <div style={{ position:"relative", zIndex:1 }}>
          <span style={{ display:"flex", alignItems:"center", justifyContent:"center", width:48, height:48, borderRadius:14,
            fontSize:23, marginBottom:13,
            background:`radial-gradient(circle at 35% 28%, ${s.color}dd, ${s.color}33)`,
            boxShadow:`inset 0 1px 0 rgba(255,255,255,.5), 0 8px 18px -7px ${s.color}aa` }}>{s.icon}</span>
          <div style={{ color:TEXT, fontWeight:800, fontSize:14, marginBottom:4, letterSpacing:".01em" }}>{s.label}</div>
          <div style={{ color:SUB, fontSize:11.5, lineHeight:1.5 }}>{s.desc}</div>
          <span style={{ position:"absolute", top:0, right:0, color:s.color, fontSize:15, opacity:.65 }}>↗</span>
        </div>
      </Tilt>
    </Reveal>
  );
}

/* ──────────────────────────────────────────────────────────────
   Pipeline ribbon — glossy nodes + glass detail
   ────────────────────────────────────────────────────────────── */
function PipelineRibbon({ onOpen }) {
  const [hov, setHov] = useState(PIPELINE[0]?.id);
  const stage = PIPELINE.find(s => s.id === hov);
  return (
    <div className="lc-glass lc-edge lc-edge-soft" style={{ borderRadius:22, padding:"22px 24px 24px", position:"relative", overflow:"hidden" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18, flexWrap:"wrap", gap:10 }}>
        <div>
          <div className="lc-iri-text" style={{ fontSize:11, fontWeight:900, letterSpacing:".16em" }}>THE JOURNEY</div>
          <h3 style={{ color:TEXT, margin:"3px 0 0", fontSize:18, fontWeight:900 }}>Biologic Development Pipeline</h3>
        </div>
        <Magnetic><button onClick={onOpen} className="lc-pill lc-shine" style={{ padding:"9px 18px", fontSize:12.5 }}>Open Explorer →</button></Magnetic>
      </div>

      <div style={{ position:"relative", padding:"6px 0 2px" }}>
        <div style={{ position:"absolute", top:"50%", left:0, right:0, height:2, transform:"translateY(-50%)",
          background:"linear-gradient(90deg,#22D3EE,#A78BFA,#F472B6,#34D399)", opacity:.4, borderRadius:2 }}/>
        <div style={{ position:"relative", display:"flex", justifyContent:"space-between", gap:4, flexWrap:"wrap", rowGap:14 }}>
          {PIPELINE.map(s => {
            const on = hov === s.id;
            return (
              <button key={s.id} onMouseEnter={() => setHov(s.id)} onClick={onOpen} title={`${s.stage}. ${s.label}`}
                style={{ position:"relative", width:34, height:34, borderRadius:"50%", cursor:"pointer", flexShrink:0,
                  border:`1.5px solid ${on ? s.accent : "rgba(255,255,255,.2)"}`,
                  background: on ? `radial-gradient(circle at 35% 28%, #fff, ${s.accent} 65%)` : "radial-gradient(circle at 35% 28%, rgba(255,255,255,.25), rgba(255,255,255,.04))",
                  color: on ? "#06121b" : SUB, fontSize:11, fontWeight:900,
                  boxShadow: on ? `0 0 16px ${s.accent}, inset 0 1px 0 rgba(255,255,255,.7)` : "inset 0 1px 0 rgba(255,255,255,.25)",
                  transform: on ? "scale(1.22)" : "scale(1)", transition:"all .25s cubic-bezier(.34,1.6,.5,1)" }}>
                {s.stage}
              </button>
            );
          })}
        </div>
      </div>

      {stage && (
        <div style={{ marginTop:20, display:"flex", gap:16, alignItems:"flex-start", animation:"lc-dropin .3s ease" }}>
          <span style={{ fontSize:30, width:54, height:54, borderRadius:15, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center",
            background:`radial-gradient(circle at 35% 28%, ${stage.accent}cc, ${stage.accent}22)`,
            boxShadow:`inset 0 1px 0 rgba(255,255,255,.5), 0 8px 18px -7px ${stage.accent}aa` }}>{stage.icon}</span>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:5, flexWrap:"wrap" }}>
              <span style={{ color:stage.accent, fontWeight:900, fontSize:15 }}>Stage {stage.stage}: {stage.label}</span>
              <span style={{ background:`${stage.accent}22`, color:stage.accent, border:`1px solid ${stage.accent}44`, borderRadius:20, padding:"2px 10px", fontSize:10, fontWeight:800 }}>
                {stage.questions?.length || 0} Q · {stage.topics?.length || 0} topics
              </span>
            </div>
            <p style={{ color:SUB, fontSize:13, margin:0, lineHeight:1.55 }}>{stage.sub}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionBand({ eyebrow, title, count }) {
  return (
    <Reveal>
      <div style={{ display:"flex", alignItems:"flex-end", gap:14, marginBottom:16 }}>
        <div>
          <div className="lc-iri-text" style={{ fontSize:11, fontWeight:900, letterSpacing:".16em" }}>{eyebrow}</div>
          <h2 style={{ color:TEXT, margin:"3px 0 0", fontSize:24, fontWeight:900, letterSpacing:"-.02em" }}>{title}</h2>
        </div>
        <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(255,255,255,.16),transparent)", marginBottom:8 }}/>
        <span style={{ color:FAINT, fontSize:11, marginBottom:6, whiteSpace:"nowrap" }}>{count}</span>
      </div>
    </Reveal>
  );
}

/* ──────────────────────────────────────────────────────────────
   Dashboard
   ────────────────────────────────────────────────────────────── */
export default function Dashboard({ setView }) {
  const allQ = PIPELINE.flatMap(s => s.questions).length + DOMAINS.flatMap(d => d.questions).length;
  const allTopics = PIPELINE.flatMap(s => s.topics || []).length;

  const stats = [
    { n: allQ, label:"Exam Questions", view:"exam",     c:"#38BDF8" },
    { n: ANALYTICAL_METHODS.length, label:"Methods",    view:"methods",  c:"#22D3EE" },
    { n: PIPELINE.length, label:"Pipeline Stages",       view:"pipeline", c:"#C084FC" },
    { n: allTopics, label:"Deep-Dive Topics",            view:"pipeline", c:"#F59E0B" },
    { n: CASE_STUDIES.length, label:"Case Studies",      view:"cases",    c:"#F472B6" },
    { n: ICH_GUIDELINES.length + COMPENDIAL_METHODS.length, label:"Guidelines & Refs", view:"ich", c:"#A78BFA" },
  ];

  const pool = [...PIPELINE.flatMap(s => s.questions), ...DOMAINS.flatMap(d => d.questions)];
  const [spot, setSpot] = useState(() => pool[Math.floor(Math.random() * pool.length)]);
  const [open, setOpen] = useState(false);
  const shuffle = () => { setSpot(pool[Math.floor(Math.random() * pool.length)]); setOpen(false); };

  const heroRef = useRef(null);
  const heroMove = (e) => {
    const el = heroRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const core = SECTIONS.filter(s => s.group === "core");
  const tools = SECTIONS.filter(s => s.group === "tools");

  return (
    <div style={{ position:"relative", zIndex:1, maxWidth:1320, margin:"0 auto", padding:"30px 24px 70px", color:TEXT }}>

      {/* HERO */}
      <div ref={heroRef} onMouseMove={heroMove} className="lc-edge"
        style={{ position:"relative", borderRadius:28, overflow:"hidden", marginBottom:26, padding:"46px 48px",
          display:"flex", alignItems:"center", gap:40, flexWrap:"wrap",
          background:"linear-gradient(160deg, rgba(255,255,255,.06), rgba(255,255,255,.012))",
          boxShadow:"inset 0 1px 0 rgba(255,255,255,.16), 0 40px 90px -50px rgba(0,0,0,.9)" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          background:"radial-gradient(420px circle at var(--mx,70%) var(--my,30%), rgba(120,200,255,.13), transparent 60%)" }}/>

        <div style={{ flex:"1 1 360px", minWidth:300, position:"relative", zIndex:1 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:16,
            background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.14)", borderRadius:999, padding:"5px 14px", backdropFilter:"blur(8px)" }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#34D399", boxShadow:"0 0 8px #34D399" }}/>
            <span style={{ fontSize:10.5, fontWeight:800, letterSpacing:".14em", color:"#CFE0FF" }}>BIOLOGIC DEVELOPMENT PLATFORM</span>
          </div>

          <div style={{ position:"relative", marginBottom:8 }}>
            <h1 className="lc-iri-text" style={{ fontSize:72, fontWeight:900, margin:0, letterSpacing:"-.04em", lineHeight:.92 }}>CMC App</h1>
            <div aria-hidden className="lc-iri-text" style={{ position:"absolute", top:"100%", left:0, fontSize:72, fontWeight:900,
              letterSpacing:"-.04em", lineHeight:.92, transform:"scaleY(-1)", opacity:.16,
              WebkitMaskImage:"linear-gradient(transparent 38%, #000)", maskImage:"linear-gradient(transparent 38%, #000)" }}>CMC App</div>
          </div>

          <p style={{ color:SUB, fontSize:16, margin:"16px 0 28px", maxWidth:480, lineHeight:1.6 }}>
            The complete Chemistry, Manufacturing &amp; Controls toolkit for biologics — from gene construction to post-approval lifecycle, in one glass cockpit.
          </p>

          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <Magnetic strength={20}><button onClick={() => setView("pipeline")} className="lc-pill lc-shine" style={{ padding:"14px 28px", fontSize:15 }}>🗺️ Explore the Pipeline</button></Magnetic>
            <Magnetic strength={12}><button onClick={() => setView("exam")} className="lc-ghost lc-shine" style={{ padding:"14px 24px", fontSize:14.5 }}>🎯 Exam Mode</button></Magnetic>
            <Magnetic strength={12}><button onClick={() => setView("methods")} className="lc-ghost lc-shine" style={{ padding:"14px 24px", fontSize:14.5 }}>🔬 Methods</button></Magnetic>
          </div>
        </div>

        <div style={{ flex:"0 1 360px", position:"relative", zIndex:1, animation:"lc-pop .9s cubic-bezier(.22,1,.36,1) both" }}>
          <ChromeHero />
        </div>
      </div>

      {/* STATS */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:14, marginBottom:36 }}>
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 70}>
            <Tilt max={6} onClick={() => setView(s.view)} className="lc-gloss"
              style={{ borderRadius:18, padding:"20px 18px", cursor:"pointer", textAlign:"center", position:"relative",
                background:"linear-gradient(160deg, rgba(255,255,255,.07), rgba(255,255,255,.015))",
                border:"1px solid rgba(255,255,255,.09)",
                boxShadow:"inset 0 1px 0 rgba(255,255,255,.14), 0 18px 40px -26px rgba(0,0,0,.9)" }}>
              <span className="lc-meshlayer" />
              <div style={{ position:"relative", zIndex:1 }}>
                <div style={{ fontSize:40, fontWeight:900, lineHeight:1,
                  background:`linear-gradient(180deg,#fff,${s.c})`, WebkitBackgroundClip:"text", backgroundClip:"text",
                  WebkitTextFillColor:"transparent", filter:`drop-shadow(0 4px 12px ${s.c}55)` }}>
                  <CountUp to={s.n} />
                </div>
                <div style={{ color:SUB, fontSize:11.5, marginTop:8, fontWeight:600, letterSpacing:".02em" }}>{s.label}</div>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>

      {/* CORE */}
      <SectionBand eyebrow="START LEARNING" title="Core Curriculum" count={`${core.length} sections`} />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14, marginBottom:40 }}>
        {core.map((s, i) => <SectionTile key={s.id} s={s} delay={i * 45} onClick={() => setView(s.id)} />)}
      </div>

      {/* PIPELINE RIBBON */}
      <div style={{ marginBottom:40 }}>
        <Reveal><PipelineRibbon onOpen={() => setView("pipeline")} /></Reveal>
      </div>

      {/* TOOLS */}
      <SectionBand eyebrow="GO DEEPER" title="Advanced Tools" count={`${tools.length} tools`} />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14, marginBottom:40 }}>
        {tools.map((s, i) => <SectionTile key={s.id} s={s} delay={i * 45} onClick={() => setView(s.id)} />)}
      </div>

      {/* CONCEPT SPOTLIGHT */}
      <Reveal>
        <div className="lc-glass lc-edge lc-edge-soft" style={{ borderRadius:22, padding:"26px 28px", position:"relative", overflow:"hidden" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16, flexWrap:"wrap", marginBottom: open ? 16 : 0 }}>
            <div style={{ flex:1, minWidth:240 }}>
              <div className="lc-iri-text" style={{ fontSize:11, fontWeight:900, letterSpacing:".16em", marginBottom:6 }}>CONCEPT SPOTLIGHT</div>
              <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:10, flexWrap:"wrap" }}><Badge level={spot.level} /></div>
              <p style={{ color:TEXT, margin:0, fontSize:18, fontWeight:700, lineHeight:1.5, maxWidth:760 }}>{spot.q}</p>
            </div>
            <Magnetic><button onClick={shuffle} className="lc-pill lc-shine" style={{ padding:"11px 20px", fontSize:13 }}>🎲 Surprise me</button></Magnetic>
          </div>

          {!open ? (
            <button onClick={() => setOpen(true)} className="lc-ghost" style={{ marginTop:16, padding:"9px 20px", fontSize:13 }}>👁 Reveal rationale</button>
          ) : (
            <div style={{ animation:"lc-dropin .3s ease" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginTop:4 }}>
                <div style={{ background:"#22D3EE12", border:"1px solid #22D3EE33", borderRadius:12, padding:"12px 14px" }}>
                  <div style={{ color:"#22D3EE", fontSize:10.5, fontWeight:800, letterSpacing:".05em", marginBottom:6 }}>WHY IT MATTERS</div>
                  <p style={{ color:SUB, margin:0, fontSize:13, lineHeight:1.6 }}>{spot.why}</p>
                </div>
                <div style={{ background:"#34D39912", border:"1px solid #34D39933", borderRadius:12, padding:"12px 14px" }}>
                  <div style={{ color:"#34D399", fontSize:10.5, fontWeight:800, letterSpacing:".05em", marginBottom:6 }}>HOW TO APPROACH</div>
                  <p style={{ color:SUB, margin:0, fontSize:13, lineHeight:1.6 }}>{spot.how}</p>
                </div>
              </div>
              <p style={{ color:FAINT, fontSize:11, margin:"12px 0 0", fontStyle:"italic" }}>📎 {spot.ref}</p>
            </div>
          )}
        </div>
      </Reveal>

      <div style={{ marginTop:40, textAlign:"center" }}>
        <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent)", marginBottom:14 }}/>
        <span style={{ color:FAINT, fontSize:11, letterSpacing:".08em" }}>Yash Kacha · CMC App · {SECTIONS.length} sections · {allQ} questions</span>
      </div>
    </div>
  );
}
