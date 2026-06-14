import { useState, useRef, useEffect } from "react";
import { Reveal, Magnetic, CountUp, TEXT, SUB, FAINT } from "../lc";
import { Icon } from "../icons";
import { PIPELINE, DOMAINS, GLOSSARY } from "../cmc-data";
import { ANALYTICAL_METHODS, ICH_GUIDELINES } from "../extra-data";
import { CASE_STUDIES } from "../case-study-data";
import { COMPENDIAL_METHODS } from "../compendial-data";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const tile = {
  background:"linear-gradient(180deg, var(--panel-2), var(--panel))",
  border:"1px solid var(--hairline)", borderRadius:20, boxShadow:"var(--shadow)",
};

const toRgb = (s) => {
  s = (s || "").trim();
  if (s.startsWith("#")) { let h = s.slice(1); if (h.length === 3) h = h.split("").map(c => c + c).join(""); const n = parseInt(h, 16); return [(n>>16)&255,(n>>8)&255,n&255]; }
  const m = s.match(/(\d+\.?\d*)/g); return m ? [+m[0], +m[1], +m[2]] : [140,140,140];
};

/* ── generative flow-field (canvas) — particle currents + cursor vortex ── */
function FlowField({ themeKey }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const host = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cs = getComputedStyle(host);
    const acc = toRgb(cs.getPropertyValue("--accent"));
    const acc2 = toRgb(cs.getPropertyValue("--accent-2"));
    const bg = toRgb(cs.getPropertyValue("--bg-base"));
    let w = 0, h = 0, raf = 0, t = 0, parts = [];
    const mouse = { x: -9999, y: -9999, on: false };
    const init = () => {
      w = host.clientWidth; h = host.clientHeight;
      canvas.width = w*dpr; canvas.height = h*dpr; canvas.style.width = w+"px"; canvas.style.height = h+"px";
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const n = Math.min(900, Math.floor(w*h/760));
      parts = Array.from({length:n}, () => ({ x:Math.random()*w, y:Math.random()*h, px:0, py:0, c:Math.random() }));
      ctx.fillStyle = `rgb(${bg[0]},${bg[1]},${bg[2]})`; ctx.fillRect(0,0,w,h);
    };
    const onMove = (e) => { const r = host.getBoundingClientRect(); mouse.x = e.clientX-r.left; mouse.y = e.clientY-r.top; mouse.on = true; };
    const onLeave = () => { mouse.on = false; };
    const frame = () => {
      t++;
      ctx.fillStyle = `rgba(${bg[0]},${bg[1]},${bg[2]},${reduce ? 1 : 0.09})`;
      ctx.fillRect(0,0,w,h);
      for (const p of parts) {
        p.px = p.x; p.py = p.y;
        const a = (Math.sin(p.x*0.0041 + t*0.0009) + Math.cos(p.y*0.0041 - t*0.0011) + Math.sin((p.x+p.y)*0.0025 + t*0.0007)) * 1.45;
        let vx = Math.cos(a), vy = Math.sin(a);
        if (mouse.on) {
          const dx = p.x-mouse.x, dy = p.y-mouse.y, d = Math.hypot(dx,dy) || 1;
          if (d < 155) { const f = (1 - d/155); vx += (dx/d)*f*3.4 - (dy/d)*f*1.7; vy += (dy/d)*f*3.4 + (dx/d)*f*1.7; }
        }
        const sp = reduce ? 0.18 : 1.15;
        p.x += vx*sp; p.y += vy*sp;
        if (p.x < 0) p.x += w; else if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h; else if (p.y > h) p.y -= h;
        const r = Math.round(acc[0]+(acc2[0]-acc[0])*p.c), g = Math.round(acc[1]+(acc2[1]-acc[1])*p.c), b = Math.round(acc[2]+(acc2[2]-acc[2])*p.c);
        if (Math.abs(p.x-p.px) < 40 && Math.abs(p.y-p.py) < 40) {
          ctx.strokeStyle = `rgba(${r},${g},${b},0.55)`; ctx.lineWidth = 1.15;
          ctx.beginPath(); ctx.moveTo(p.px,p.py); ctx.lineTo(p.x,p.y); ctx.stroke();
        }
      }
      raf = requestAnimationFrame(frame);
    };
    init(); raf = requestAnimationFrame(frame);
    const ro = new ResizeObserver(init); ro.observe(host);
    host.addEventListener("mousemove", onMove); host.addEventListener("mouseleave", onLeave);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); host.removeEventListener("mousemove", onMove); host.removeEventListener("mouseleave", onLeave); };
  }, [themeKey]);
  return <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

/* ── kinetic word cycler ── */
function WordCycler({ words }) {
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI(v => (v+1) % words.length), 2300); return () => clearInterval(id); }, [words.length]);
  return (
    <span style={{ display:"inline-grid", verticalAlign:"bottom" }}>
      {words.map((wd, idx) => (
        <span key={wd} style={{ gridArea:"1 / 1", color:"var(--accent)", fontWeight:700, whiteSpace:"nowrap",
          transition:"opacity .55s ease, transform .55s cubic-bezier(.22,1,.36,1)",
          opacity: idx===i ? 1 : 0, transform: idx===i ? "translateY(0)" : "translateY(9px)" }}>{wd}</span>
      ))}
    </span>
  );
}

/* ── module catalog ── */
const SECTIONS = [
  { id:"pipeline",  label:"Pipeline Explorer",  desc:"16-stage biologic lifecycle", group:"core" },
  { id:"methods",   label:"Analytical Methods", desc:"22 assay deep-dives",         group:"core" },
  { id:"qbd",       label:"QbD / CQA / CPP",    desc:"FMEA · design space · COA",   group:"core" },
  { id:"viral",     label:"Viral Clearance",    desc:"ICH Q5A · LRV calculator",    group:"core" },
  { id:"ctd",       label:"CTD Navigator",      desc:"Module 1–5 dossier map",      group:"core" },
  { id:"timeline",  label:"CMC Timeline",       desc:"Phase-by-phase deliverables", group:"core" },
  { id:"domains",   label:"Domain Q-Bank",      desc:"100+ Qs · 10 domains",        group:"core" },
  { id:"exam",      label:"Exam Mode",          desc:"Adaptive spaced repetition",  group:"core" },
  { id:"ich",       label:"ICH Guidelines",     desc:"9 quality guidelines",        group:"core" },
  { id:"career",    label:"Career & Interviews",desc:"Ladder · salaries · Q&As",    group:"core" },
  { id:"notes",     label:"My Notes",           desc:"Capture & organize",          group:"core" },
  { id:"glossary",  label:"CMC Glossary",       desc:"50 essential terms",          group:"core" },
  { id:"stability", label:"Stability Studies",  desc:"ICH Q1A(R2) · T90",           group:"tools" },
  { id:"oos",       label:"OOS / OOT",          desc:"FDA 2006 decision tree",      group:"tools" },
  { id:"batch",     label:"Batch Record Sim",   desc:"Sterile mAb BPR",             group:"tools" },
  { id:"cases",     label:"Case Studies",       desc:`${CASE_STUDIES.length} landmark failures`, group:"tools" },
  { id:"compendial",label:"Compendial Ref",     desc:"USP / EP / JP",               group:"tools" },
  { id:"excipient", label:"Excipient Compat",   desc:"18 excipients + matrix",      group:"tools" },
  { id:"pathway",   label:"Learning Pathways",  desc:"30/60/90-day plans",          group:"tools" },
  { id:"progress",  label:"My Progress",        desc:"Queue · activity · badges",   group:"tools" },
];

const STANDARDS = ["ICH Q5A(R2)","ICH Q8(R2)","ICH Q9","ICH Q10","ICH Q11","ICH Q6B","ICH Q12","USP ⟨788⟩","USP ⟨1207⟩","Ph.Eur. 2.6.1","21 CFR 211","EU Annex 1"];

export default function Dashboard({ setView, dark }) {
  const allQ = PIPELINE.flatMap(s => s.questions).length + DOMAINS.flatMap(d => d.questions).length;
  const topics = PIPELINE.flatMap(s => s.topics || []).length;

  const stats = [
    { n: allQ, label:"Questions" }, { n: ANALYTICAL_METHODS.length, label:"Methods" },
    { n: PIPELINE.length, label:"Stages" }, { n: topics, label:"Topics" },
    { n: CASE_STUDIES.length, label:"Cases" }, { n: GLOSSARY.length, label:"Terms" },
  ];
  const refs = ICH_GUIDELINES.length + COMPENDIAL_METHODS.length;

  const pool = [...PIPELINE.flatMap(s => s.questions), ...DOMAINS.flatMap(d => d.questions)];
  const [spot, setSpot] = useState(() => pool[Math.floor(Math.random()*pool.length)]);
  const [open, setOpen] = useState(false);
  const shuffle = () => { setSpot(pool[Math.floor(Math.random()*pool.length)]); setOpen(false); };

  const [hovPipe, setHovPipe] = useState(null);
  const core = SECTIONS.filter(s => s.group === "core");
  const tools = SECTIONS.filter(s => s.group === "tools");

  const Chip = ({ s }) => (
    <button onClick={() => setView(s.id)} className="lc-meshhost lc-shine"
      style={{ position:"relative", overflow:"hidden", display:"flex", gap:11, alignItems:"center", textAlign:"left", cursor:"pointer",
        background:"var(--panel)", border:"1px solid var(--hairline)", borderRadius:13, padding:"11px 13px", transition:"transform .2s, border-color .2s" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = "color-mix(in srgb, var(--accent) 45%, transparent)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "var(--hairline)"; }}>
      <span className="lc-meshlayer" />
      <span style={{ position:"relative", zIndex:1, flexShrink:0, width:36, height:36, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid var(--hairline)", background:"var(--panel-2)", color:"var(--accent)" }}>
        <Icon name={s.id} size={18} />
      </span>
      <span style={{ position:"relative", zIndex:1, minWidth:0 }}>
        <span style={{ display:"block", color:TEXT, fontWeight:700, fontSize:13 }}>{s.label}</span>
        <span style={{ display:"block", color:FAINT, fontSize:11, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.desc}</span>
      </span>
    </button>
  );

  return (
    <div style={{ position:"relative", zIndex:1, maxWidth:1280, margin:"0 auto", padding:"28px 24px 72px", color:"var(--text-body)" }}>
      <div className="bento">

        {/* ── HERO ── */}
        <div className="b-8" style={{ ...tile, position:"relative", overflow:"hidden", minHeight:452, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
          <FlowField themeKey={dark ? "d" : "l"} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(95deg, color-mix(in srgb, var(--bg-base) 82%, transparent), color-mix(in srgb, var(--bg-base) 30%, transparent) 52%, transparent 72%)", pointerEvents:"none" }}/>
          <div style={{ position:"relative", zIndex:1, padding:"40px 42px" }}>
            <div style={{ fontFamily:MONO, fontSize:11, fontWeight:700, letterSpacing:".24em", color:"var(--accent)", marginBottom:18 }}>
              CMC APP — BIOLOGIC DEVELOPMENT PLATFORM
            </div>
            <h1 style={{ fontSize:"clamp(38px,5vw,62px)", fontWeight:850, letterSpacing:"-.035em", lineHeight:1.02, margin:0, color:"var(--text-h)" }}>
              The craft of<br/>Biologics CMC<span style={{ color:"var(--accent)" }}>.</span>
            </h1>
            <p style={{ color:SUB, fontSize:16, lineHeight:1.6, margin:"18px 0 14px", maxWidth:480 }}>
              From gene construction to post-approval lifecycle — <b style={{ color:"var(--text-body)" }}>{SECTIONS.length} modules</b>, <b style={{ color:"var(--text-body)" }}>{allQ}</b> questions, and every analytical method, guideline and decision that matters.
            </p>
            <div style={{ fontFamily:MONO, fontSize:13, color:FAINT, marginBottom:26, display:"flex", gap:8 }}>
              <span>NOW MASTERING —</span>
              <WordCycler words={["gene construction","cell-line development","upstream & downstream","viral clearance","process validation","BLA filing"]} />
            </div>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <Magnetic strength={18}><button onClick={() => setView("pipeline")} className="lc-pill lc-shine" style={{ padding:"13px 26px", fontSize:14.5 }}>Explore the Pipeline →</button></Magnetic>
              <Magnetic strength={12}><button onClick={() => setView("exam")} className="lc-ghost lc-shine" style={{ padding:"13px 24px", fontSize:14 }}>Practice Exam</button></Magnetic>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="b-4" style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div style={{ ...tile, flex:1, padding:"22px 24px" }}>
            <div style={{ fontFamily:MONO, fontSize:10.5, fontWeight:700, letterSpacing:".2em", color:FAINT, marginBottom:16 }}>BY THE NUMBERS</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"18px 10px" }}>
              {stats.map(s => (
                <div key={s.label}>
                  <div style={{ fontSize:26, fontWeight:800, color:"var(--text-h)", lineHeight:1, letterSpacing:"-.02em" }}><CountUp to={s.n} /></div>
                  <div style={{ color:FAINT, fontSize:10.5, marginTop:5, fontFamily:MONO, letterSpacing:".04em" }}>{s.label.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => setView("pipeline")} className="lc-meshhost" style={{ ...tile, flex:1, padding:"22px 24px", position:"relative", overflow:"hidden", cursor:"pointer", textAlign:"left" }}>
            <span className="lc-meshlayer" />
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ fontFamily:MONO, fontSize:10.5, fontWeight:700, letterSpacing:".2em", color:"var(--accent)", marginBottom:12 }}>THE JOURNEY</div>
              <div style={{ display:"flex", alignItems:"center", gap:0, marginBottom:14 }}>
                {PIPELINE.map((s,i) => (
                  <div key={s.id} style={{ display:"flex", alignItems:"center", flex: i < PIPELINE.length-1 ? 1 : "0 0 auto" }}>
                    <span style={{ width:9, height:9, borderRadius:"50%", flexShrink:0,
                      background: hovPipe===null ? "var(--accent)" : (i<=hovPipe ? "var(--accent)" : "var(--hairline)") }}
                      onMouseEnter={() => setHovPipe(i)} />
                    {i < PIPELINE.length-1 && <span style={{ flex:1, height:2, background:"var(--hairline)" }}/>}
                  </div>
                ))}
              </div>
              <div style={{ color:"var(--text-h)", fontWeight:750, fontSize:15 }}>16 stages · 5 phases</div>
              <div style={{ color:FAINT, fontSize:12.5, marginTop:3 }}>Gene construction → commercial lifecycle</div>
            </div>
          </button>
        </div>

        {/* ── STANDARDS TICKER ── */}
        <div className="b-12 ticker" style={{ ...tile, padding:"13px 0", borderRadius:14 }}>
          <div className="ticker-track">
            {[...STANDARDS, ...STANDARDS].map((g,i) => (
              <span key={i} style={{ display:"inline-flex", alignItems:"center", color:FAINT, fontFamily:MONO, fontSize:12.5, letterSpacing:".02em", padding:"0 26px" }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background:"var(--accent-2)", marginRight:14 }}/>{g}
              </span>
            ))}
          </div>
        </div>

        {/* ── MODULES ── */}
        <Reveal style={{ gridColumn:"span 12" }}>
          <div style={{ ...tile, padding:"24px 24px 26px" }}>
            <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:18 }}>
              <h2 style={{ color:"var(--text-h)", fontSize:19, fontWeight:800, letterSpacing:"-.02em", margin:0 }}>All Modules</h2>
              <span style={{ fontFamily:MONO, fontSize:11, color:FAINT }}>{SECTIONS.length} TOTAL</span>
            </div>
            <div style={{ fontFamily:MONO, fontSize:10, fontWeight:700, letterSpacing:".2em", color:"var(--accent)", marginBottom:12 }}>CORE CURRICULUM</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:10, marginBottom:22 }}>
              {core.map(s => <Chip key={s.id} s={s} />)}
            </div>
            <div style={{ fontFamily:MONO, fontSize:10, fontWeight:700, letterSpacing:".2em", color:"var(--accent-2)", marginBottom:12 }}>ADVANCED TOOLS</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:10 }}>
              {tools.map(s => <Chip key={s.id} s={s} />)}
            </div>
          </div>
        </Reveal>

        {/* ── CONCEPT SPOTLIGHT ── */}
        <Reveal style={{ gridColumn:"span 12" }}>
          <div style={{ ...tile, padding:"26px 28px", position:"relative", overflow:"hidden" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16, flexWrap:"wrap", marginBottom: open ? 18 : 0 }}>
              <div style={{ flex:1, minWidth:260 }}>
                <div style={{ fontFamily:MONO, fontSize:10.5, fontWeight:700, letterSpacing:".2em", color:"var(--accent)", marginBottom:10 }}>CONCEPT SPOTLIGHT · {spot.level?.toUpperCase()}</div>
                <p style={{ color:"var(--text-h)", margin:0, fontSize:19, fontWeight:700, lineHeight:1.5, maxWidth:820, letterSpacing:"-.01em" }}>{spot.q}</p>
              </div>
              <Magnetic><button onClick={shuffle} className="lc-ghost lc-shine" style={{ padding:"10px 18px", fontSize:13 }}>↺ Shuffle</button></Magnetic>
            </div>
            {!open ? (
              <button onClick={() => setOpen(true)} className="lc-pill lc-shine" style={{ marginTop:18, padding:"10px 20px", fontSize:13 }}>Reveal rationale</button>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, animation:"lc-dropin .3s ease" }}>
                {[["WHY IT MATTERS", spot.why, "var(--accent)"], ["HOW TO APPROACH", spot.how, "var(--accent-2)"]].map(([l,txt,c]) => (
                  <div key={l} style={{ background:"var(--panel)", border:"1px solid var(--hairline)", borderRadius:14, padding:"14px 16px" }}>
                    <div style={{ color:c, fontFamily:MONO, fontSize:10, fontWeight:700, letterSpacing:".1em", marginBottom:7 }}>{l}</div>
                    <p style={{ color:SUB, margin:0, fontSize:13, lineHeight:1.6 }}>{txt}</p>
                  </div>
                ))}
                <p style={{ gridColumn:"span 2", color:FAINT, fontSize:11, margin:0, fontStyle:"italic" }}>Ref · {spot.ref}</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>

      <div style={{ marginTop:36, display:"flex", alignItems:"center", gap:14, justifyContent:"center", color:FAINT, fontFamily:MONO, fontSize:11, letterSpacing:".06em" }}>
        <span style={{ flex:1, height:1, background:"var(--hairline)", maxWidth:120 }}/>
        CMC APP · YASH KACHA · {refs} GUIDELINES & REFS
        <span style={{ flex:1, height:1, background:"var(--hairline)", maxWidth:120 }}/>
      </div>
    </div>
  );
}
