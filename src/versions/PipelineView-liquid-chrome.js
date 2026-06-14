import { useState, useRef } from "react";
import { Reveal, Magnetic, TEXT, SUB, FAINT } from "../lc";
import { LC } from "../shared";
import { PIPELINE } from "../cmc-data";
import { STAGE_OVERVIEWS } from "../pipeline-overview-data";

/* 5-phase grouping of the 16-stage journey */
const PHASES = [
  { id:"p1", name:"Cell Line Engineering",        range:[1, 4],   color:"#A78BFA", icon:"🧬" },
  { id:"p2", name:"Process & Product Development", range:[5, 8],   color:"#22D3EE", icon:"⚗️" },
  { id:"p3", name:"Transfer & Clinical Supply",    range:[9, 10],  color:"#2DD4BF", icon:"🏭" },
  { id:"p4", name:"Characterization & Validation", range:[11, 13], color:"#34D399", icon:"✅" },
  { id:"p5", name:"Filing & Lifecycle",            range:[14, 16], color:"#F59E0B", icon:"📋" },
];
const phaseOfNum = (n) => PHASES.find(p => n >= p.range[0] && n <= p.range[1]) || PHASES[0];

function GBox({ color, label, children, style }) {
  return (
    <div style={{ background:`${color}12`, border:`1px solid ${color}30`, borderRadius:12, padding:"12px 14px", marginBottom:10, ...style }}>
      <div style={{ color, fontSize:10, fontWeight:800, letterSpacing:".06em", marginBottom:6 }}>{label}</div>
      <div style={{ color:SUB, fontSize:12.5, lineHeight:1.65 }}>{children}</div>
    </div>
  );
}

const glassPanel = {
  background:"linear-gradient(160deg, rgba(255,255,255,.055), rgba(255,255,255,.012))",
  border:"1px solid rgba(255,255,255,.09)", borderRadius:14,
};

export default function PipelineView() {
  const [activeId, setActiveId] = useState(PIPELINE[0].id);
  const [tab, setTab] = useState("overview");
  const [lvl, setLvl] = useState("All");
  const detailRef = useRef(null);

  const idx = PIPELINE.findIndex(s => s.id === activeId);
  const stage = PIPELINE[idx];
  const prev = idx > 0 ? PIPELINE[idx - 1] : null;
  const next = idx < PIPELINE.length - 1 ? PIPELINE[idx + 1] : null;
  const overview = STAGE_OVERVIEWS[stage.id];
  const ph = phaseOfNum(parseInt(stage.stage, 10));
  const filteredQ = (stage.questions || []).filter(q => lvl === "All" || q.level === lvl);

  const select = (id) => {
    setActiveId(id); setTab("overview"); setLvl("All");
    if (typeof window !== "undefined" && window.innerWidth < 960) {
      setTimeout(() => detailRef.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 60);
    }
  };

  return (
    <div style={{ position:"relative", zIndex:1, maxWidth:1320, margin:"0 auto", padding:"28px 24px 70px", color:TEXT }}>

      {/* ── Header ── */}
      <Reveal>
        <div className="lc-edge" style={{ ...glassPanel, borderRadius:24, padding:"26px 30px", marginBottom:22, position:"relative", overflow:"hidden" }}>
          <div className="lc-iri-text" style={{ fontSize:11, fontWeight:900, letterSpacing:".18em", marginBottom:6 }}>THE JOURNEY · 16 STAGES</div>
          <h1 className="lc-iri-text" style={{ fontSize:42, fontWeight:900, margin:"0 0 8px", letterSpacing:"-.03em", lineHeight:1 }}>Pipeline Explorer</h1>
          <p style={{ color:SUB, fontSize:14.5, margin:"0 0 20px", maxWidth:620, lineHeight:1.6 }}>
            Walk the biologic drug-development lifecycle end-to-end — pick any stop on the journey to see what happens, why it matters, and how it's tested.
          </p>

          {/* progress */}
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16, flexWrap:"wrap" }}>
            <span style={{ color:ph.color, fontWeight:900, fontSize:13 }}>{ph.icon} {ph.name}</span>
            <span style={{ color:FAINT, fontSize:12 }}>Stage <b style={{ color:TEXT }}>{stage.stage}</b> of 16</span>
            <div style={{ flex:1, minWidth:160, height:6, background:"rgba(255,255,255,.08)", borderRadius:6, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${((idx + 1) / PIPELINE.length) * 100}%`, borderRadius:6,
                background:"linear-gradient(90deg,#22D3EE,#A78BFA,#F472B6,#34D399)", transition:"width .5s cubic-bezier(.22,1,.36,1)" }}/>
            </div>
          </div>

          {/* phase legend — click to jump */}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {PHASES.map(p => {
              const on = p.id === ph.id;
              const first = PIPELINE.find(s => parseInt(s.stage, 10) >= p.range[0]);
              return (
                <button key={p.id} onClick={() => first && select(first.id)} className="lc-meshhost lc-shine"
                  style={{ position:"relative", overflow:"hidden", display:"inline-flex", alignItems:"center", gap:7, cursor:"pointer",
                    background: on ? `${p.color}22` : "rgba(255,255,255,.04)",
                    border:`1px solid ${on ? p.color + "88" : "rgba(255,255,255,.12)"}`,
                    color: on ? p.color : SUB, borderRadius:999, padding:"6px 13px", fontSize:11.5, fontWeight:700,
                    transition:"all .2s" }}>
                  <span className="lc-meshlayer" />
                  <span style={{ position:"relative", zIndex:1, display:"inline-flex", alignItems:"center", gap:6 }}>
                    <span>{p.icon}</span>{p.name}
                    <span style={{ opacity:.6, fontSize:10 }}>{p.range[0]}–{p.range[1]}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* ── Master–detail ── */}
      <div className="pl-grid">

        {/* LEFT: journey rail */}
        <div className="pl-rail">
          {PHASES.map(p => {
            const stages = PIPELINE.filter(s => { const n = parseInt(s.stage, 10); return n >= p.range[0] && n <= p.range[1]; });
            return (
              <div key={p.id} style={{ marginBottom:6 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, margin:"12px 2px 8px" }}>
                  <span style={{ fontSize:13 }}>{p.icon}</span>
                  <span style={{ color:p.color, fontWeight:800, fontSize:10, letterSpacing:".1em", textTransform:"uppercase" }}>{p.name}</span>
                  <div style={{ flex:1, height:1, background:`linear-gradient(90deg, ${p.color}55, transparent)` }}/>
                </div>

                <div style={{ position:"relative" }}>
                  <div style={{ position:"absolute", left:25, top:18, bottom:18, width:2, borderRadius:2,
                    background:`linear-gradient(${p.color}77, ${p.color}22)`, zIndex:0 }}/>
                  {stages.map(s => {
                    const on = s.id === activeId;
                    return (
                      <button key={s.id} onClick={() => select(s.id)} className="lc-meshhost lc-shine"
                        style={{ position:"relative", overflow:"hidden", display:"flex", gap:12, alignItems:"center", width:"100%", textAlign:"left",
                          background: on ? `${s.accent}1f` : "transparent",
                          border:`1px solid ${on ? s.accent + "66" : "transparent"}`,
                          borderRadius:12, padding:"7px 10px", cursor:"pointer", marginBottom:3, transition:"all .2s" }}>
                        <span className="lc-meshlayer" />
                        <span style={{ position:"relative", zIndex:1, flexShrink:0, width:30, height:30, borderRadius:"50%",
                          display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900,
                          color: on ? "#06121b" : SUB,
                          background: on ? `radial-gradient(circle at 35% 28%, #fff, ${s.accent} 70%)` : "radial-gradient(circle at 35% 28%, rgba(255,255,255,.22), rgba(255,255,255,.05))",
                          border:`1.5px solid ${on ? s.accent : "rgba(255,255,255,.2)"}`,
                          boxShadow: on ? `0 0 14px ${s.accent}, inset 0 1px 0 rgba(255,255,255,.7)` : "inset 0 1px 0 rgba(255,255,255,.2)",
                          transition:"all .25s cubic-bezier(.34,1.6,.5,1)" }}>{s.stage}</span>
                        <span style={{ position:"relative", zIndex:1, minWidth:0 }}>
                          <span style={{ display:"block", color: on ? s.accent : TEXT, fontWeight: on ? 800 : 600, fontSize:12.5, lineHeight:1.25 }}>{s.label}</span>
                          <span style={{ display:"block", color:FAINT, fontSize:10, marginTop:1 }}>{s.sub}</span>
                        </span>
                        {on && <span style={{ position:"relative", zIndex:1, marginLeft:"auto", color:s.accent, fontSize:13 }}>◆</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: detail */}
        <div ref={detailRef} className="lc-glass lc-edge" style={{ borderRadius:22, padding:"24px 26px 26px", position:"relative", overflow:"hidden", animation:"lc-dropin .25s ease" }}>
          {/* header */}
          <div style={{ display:"flex", gap:16, alignItems:"center", marginBottom:18, flexWrap:"wrap" }}>
            <span style={{ fontSize:34, width:62, height:62, borderRadius:18, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center",
              background:`radial-gradient(circle at 34% 28%, ${stage.accent}dd, ${stage.accent}33)`,
              boxShadow:`inset 0 1px 0 rgba(255,255,255,.5), 0 10px 24px -8px ${stage.accent}aa` }}>{stage.icon}</span>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ color:stage.accent, fontSize:11, fontWeight:800, letterSpacing:".08em" }}>STAGE {stage.stage} · {ph.name.toUpperCase()}</div>
              <h2 style={{ color:TEXT, margin:"3px 0 0", fontSize:24, fontWeight:900, letterSpacing:"-.02em" }}>{stage.label}</h2>
              <p style={{ color:SUB, margin:"3px 0 0", fontSize:13 }}>{stage.sub}</p>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <span style={{ background:`${stage.accent}1c`, color:stage.accent, border:`1px solid ${stage.accent}44`, borderRadius:20, padding:"4px 12px", fontSize:11, fontWeight:800 }}>{stage.topics?.length || 0} topics</span>
              <span style={{ background:"rgba(255,255,255,.05)", color:SUB, border:"1px solid rgba(255,255,255,.12)", borderRadius:20, padding:"4px 12px", fontSize:11, fontWeight:700 }}>{stage.questions?.length || 0} questions</span>
            </div>
          </div>

          {/* tabs */}
          <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
            {[
              { key:"overview", label:"🔬 Overview" },
              { key:"topics", label:`📘 Topics (${stage.topics?.length || 0})` },
              { key:"questions", label:`❓ Questions (${stage.questions?.length || 0})` },
            ].map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} className={tab === t.key ? "lc-pill lc-shine" : "lc-ghost lc-shine"}
                style={{ padding:"8px 16px", fontSize:13 }}>{t.label}</button>
            ))}
          </div>

          {/* ── OVERVIEW ── */}
          {tab === "overview" && (overview ? (
            <div style={{ animation:"lc-dropin .25s ease" }}>
              <h4 style={{ color:stage.accent, margin:"0 0 10px", fontSize:12.5, fontWeight:800, textTransform:"uppercase", letterSpacing:".06em" }}>🧬 What is this stage?</h4>
              {overview.what.split("\n\n").map((para, i) => (
                <p key={i} style={{ color:SUB, margin:"0 0 12px", lineHeight:1.75, fontSize:14 }}>{para}</p>
              ))}

              {(overview.before || overview.after) && (
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, margin:"16px 0" }}>
                  <GBox color={prev ? prev.accent : "#8aa"} label={`← INPUTS${prev ? ` · ${prev.stage} ${prev.label}` : ""}`} style={{ marginBottom:0 }}>{overview.before}</GBox>
                  <GBox color={next ? next.accent : "#8aa"} label={`OUTPUTS${next ? ` · ${next.stage} ${next.label}` : ""} →`} style={{ marginBottom:0 }}>{overview.after}</GBox>
                </div>
              )}

              {overview.steps?.length > 0 && (
                <>
                  <h4 style={{ color:stage.accent, margin:"18px 0 12px", fontSize:12.5, fontWeight:800, textTransform:"uppercase", letterSpacing:".06em" }}>⚙️ What actually happens — step by step</h4>
                  {overview.steps.map((step, i) => (
                    <div key={i} style={{ display:"flex", gap:14, background:"rgba(255,255,255,.035)", border:"1px solid rgba(255,255,255,.08)",
                      borderLeft:`3px solid ${stage.accent}`, borderRadius:12, padding:14, marginBottom:10 }}>
                      <div style={{ flexShrink:0, width:30, height:30, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
                        background:`${stage.accent}22`, border:`2px solid ${stage.accent}55`, color:stage.accent, fontWeight:800, fontSize:13 }}>{step.num}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ color:TEXT, fontWeight:800, fontSize:14, marginBottom:5 }}>{step.title}</div>
                        <div style={{ color:SUB, fontSize:13, lineHeight:1.7 }}>{step.detail}</div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {(overview.duration || overview.team || overview.deliverables) && (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:12, marginTop:16 }}>
                  {overview.duration && <GBox color="#F59E0B" label="⏱️ TYPICAL DURATION" style={{ marginBottom:0 }}>{overview.duration}</GBox>}
                  {overview.team && <GBox color="#34D399" label="👥 TEAM INVOLVED" style={{ marginBottom:0 }}>{overview.team}</GBox>}
                  {overview.deliverables && (
                    <GBox color="#C084FC" label="📦 KEY DELIVERABLES" style={{ marginBottom:0 }}>
                      <ul style={{ margin:0, paddingLeft:16, lineHeight:1.8 }}>{overview.deliverables.map((d, i) => <li key={i}>{d}</li>)}</ul>
                    </GBox>
                  )}
                </div>
              )}
            </div>
          ) : <p style={{ color:FAINT, fontStyle:"italic" }}>Overview content coming soon for this stage.</p>)}

          {/* ── TOPICS ── */}
          {tab === "topics" && (
            <div style={{ animation:"lc-dropin .25s ease" }}>
              {(stage.topics || []).map(tp => (
                <details key={tp.id} style={{ ...glassPanel, padding:"14px 16px", marginBottom:10 }}>
                  <summary style={{ cursor:"pointer", color:TEXT, fontWeight:700, fontSize:14.5 }}>📘 {tp.title}</summary>
                  <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid rgba(255,255,255,.08)" }}>
                    <p style={{ color:SUB, margin:"0 0 12px", lineHeight:1.75, fontSize:13.5 }}>{tp.body}</p>
                    <GBox color="#22D3EE" label="WHY THIS MATTERS">{tp.why}</GBox>
                    <GBox color="#34D399" label="HOW TO STUDY">{tp.how}</GBox>
                    <p style={{ color:FAINT, fontSize:11, margin:0, fontStyle:"italic" }}>📎 {tp.ref}</p>
                  </div>
                </details>
              ))}
              {!stage.topics?.length && <p style={{ color:FAINT, fontStyle:"italic" }}>No deep-dive topics for this stage.</p>}
            </div>
          )}

          {/* ── QUESTIONS ── */}
          {tab === "questions" && (
            <div style={{ animation:"lc-dropin .25s ease" }}>
              <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
                {["All", "Foundational", "Intermediate", "Advanced", "Expert"].map(l => {
                  const on = lvl === l;
                  const c = l === "All" ? "#fff" : LC[l];
                  return (
                    <button key={l} onClick={() => setLvl(l)}
                      style={{ cursor:"pointer", borderRadius:999, padding:"5px 13px", fontSize:11.5, fontWeight:700,
                        background: on ? (l === "All" ? "rgba(255,255,255,.16)" : `${c}26`) : "rgba(255,255,255,.04)",
                        border:`1px solid ${on ? (l === "All" ? "rgba(255,255,255,.4)" : c + "88") : "rgba(255,255,255,.12)"}`,
                        color: on ? (l === "All" ? TEXT : c) : SUB, transition:"all .18s" }}>{l}</button>
                  );
                })}
              </div>
              {filteredQ.map(q => (
                <details key={q.id} style={{ ...glassPanel, padding:"14px 16px", marginBottom:10, borderLeft:`3px solid ${LC[q.level]}` }}>
                  <summary style={{ cursor:"pointer", display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
                    <span style={{ background:`${LC[q.level]}22`, color:LC[q.level], border:`1px solid ${LC[q.level]}44`, borderRadius:12, padding:"2px 9px", fontSize:10, fontWeight:800 }}>{q.level}</span>
                    <span style={{ color:TEXT, fontWeight:600, fontSize:14, lineHeight:1.5 }}>{q.q}</span>
                  </summary>
                  <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid rgba(255,255,255,.08)" }}>
                    <GBox color="#22D3EE" label="WHY IT MATTERS">{q.why}</GBox>
                    <GBox color="#34D399" label="HOW TO FIND THE ANSWER">{q.how}</GBox>
                    <p style={{ color:FAINT, fontSize:11, margin:0, fontStyle:"italic" }}>📎 {q.ref}</p>
                  </div>
                </details>
              ))}
              {filteredQ.length === 0 && <p style={{ color:FAINT, fontStyle:"italic" }}>No questions at this level.</p>}
            </div>
          )}

          {/* ── Prev / Next ── */}
          <div style={{ display:"flex", justifyContent:"space-between", gap:12, marginTop:24, paddingTop:18, borderTop:"1px solid rgba(255,255,255,.1)" }}>
            {prev ? (
              <Magnetic strength={10}>
                <button onClick={() => select(prev.id)} className="lc-ghost lc-shine" style={{ padding:"10px 18px", fontSize:12.5, textAlign:"left" }}>
                  <span style={{ display:"block", fontSize:9, color:FAINT, letterSpacing:".08em" }}>← PREVIOUS</span>
                  {prev.stage} · {prev.label}
                </button>
              </Magnetic>
            ) : <span/>}
            {next ? (
              <Magnetic strength={10}>
                <button onClick={() => select(next.id)} className="lc-pill lc-shine" style={{ padding:"10px 20px", fontSize:12.5, textAlign:"right" }}>
                  <span style={{ display:"block", fontSize:9, opacity:.7, letterSpacing:".08em" }}>NEXT →</span>
                  {next.stage} · {next.label}
                </button>
              </Magnetic>
            ) : <span/>}
          </div>
        </div>
      </div>
    </div>
  );
}
