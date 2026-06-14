import { useState, useRef, useEffect } from "react";
import { Reveal, Magnetic, TEXT, SUB, FAINT } from "../lc";
import { Icon, stageIcon } from "../icons";
import { LC } from "../shared";
import { PIPELINE } from "../cmc-data";
import { STAGE_OVERVIEWS } from "../pipeline-overview-data";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const PHASES = [
  { id:"p1", name:"Cell Line Engineering",        range:[1, 4],   color:"#A78BFA", ic:"cell" },
  { id:"p2", name:"Process & Product Development", range:[5, 8],   color:"#22D3EE", ic:"science" },
  { id:"p3", name:"Transfer & Clinical Supply",    range:[9, 10],  color:"#2DD4BF", ic:"transfer" },
  { id:"p4", name:"Characterization & Validation", range:[11, 13], color:"#34D399", ic:"shieldcheck" },
  { id:"p5", name:"Filing & Lifecycle",            range:[14, 16], color:"#F59E0B", ic:"cases" },
];
const phaseOfNum = (n) => PHASES.find(p => n >= p.range[0] && n <= p.range[1]) || PHASES[0];
const stagesIn = (p) => PIPELINE.filter(s => { const n = parseInt(s.stage, 10); return n >= p.range[0] && n <= p.range[1]; });
const preview = (s) => {
  const w = STAGE_OVERVIEWS[s.id]?.what;
  if (!w) return s.sub;
  const first = w.split(/\.\s/)[0];
  return first.length > 130 ? first.slice(0, 127) + "…" : first + ".";
};

const glassPanel = { background:"linear-gradient(180deg, var(--panel-2), var(--panel))", border:"1px solid var(--hairline)", borderRadius:14 };

function GBox({ color, label, children }) {
  return (
    <div style={{ background:`color-mix(in srgb, ${color} 10%, transparent)`, border:`1px solid color-mix(in srgb, ${color} 35%, transparent)`, borderRadius:12, padding:"12px 14px", marginBottom:10 }}>
      <div style={{ color, fontFamily:MONO, fontSize:10, fontWeight:700, letterSpacing:".06em", marginBottom:6 }}>{label}</div>
      <div style={{ color:SUB, fontSize:12.5, lineHeight:1.65 }}>{children}</div>
    </div>
  );
}

export default function PipelineView() {
  const [mode, setMode] = useState("overview");   // overview | journey
  const [activeId, setActiveId] = useState(PIPELINE[0].id);
  const [prog, setProg] = useState(0);
  const [hoverDot, setHoverDot] = useState(null);
  const [pendingJump, setPendingJump] = useState(null);
  const refs = useRef({});
  const sectionRef = useRef(null);

  const idx = PIPELINE.findIndex(s => s.id === activeId);
  const stage = PIPELINE[idx];
  const ph = phaseOfNum(parseInt(stage.stage, 10));
  const prev = idx > 0 ? PIPELINE[idx - 1] : null;
  const next = idx < PIPELINE.length - 1 ? PIPELINE[idx + 1] : null;

  // active stage as chapters cross the viewport mid-line (journey only)
  useEffect(() => {
    if (mode !== "journey") return;
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) setActiveId(e.target.dataset.id); });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    Object.values(refs.current).forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, [mode]);

  // continuous journey progress
  useEffect(() => {
    if (mode !== "journey") return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          const total = el.offsetHeight - window.innerHeight;
          setProg(total > 0 ? Math.min(Math.max((window.scrollY - top) / total, 0), 1) : 0);
        }
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [mode]);

  // jump to a stage after entering journey from overview (wait for layout)
  useEffect(() => {
    if (mode === "journey" && pendingJump) {
      const id = pendingJump; setPendingJump(null);
      const go = () => { const el = refs.current[id]; if (el) { setActiveId(id); el.scrollIntoView({ behavior: "auto", block: "start" }); } };
      let r2 = 0;
      const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(go); });
      const t = setTimeout(go, 140);
      return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); clearTimeout(t); };
    }
  }, [mode, pendingJump]);

  const jump = (id) => refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  const enterStage = (id) => { setActiveId(id); setMode("journey"); setPendingJump(id); };
  const R = 30, C = 2 * Math.PI * R;
  const hs = hoverDot ? PIPELINE.find(s => s.id === hoverDot) : null;

  return (
    <div style={{ position:"relative", zIndex:1, maxWidth:1280, margin:"0 auto", padding:"28px 24px 60px" }}>

      {/* header + mode toggle */}
      <Reveal>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", gap:16, flexWrap:"wrap", marginBottom:26 }}>
          <div>
            <div style={{ fontFamily:MONO, fontSize:11, fontWeight:700, letterSpacing:".22em", color:"var(--accent)", marginBottom:8 }}>THE JOURNEY · 16 STAGES · 5 PHASES</div>
            <h1 className="lc-iri-text" style={{ fontSize:42, fontWeight:850, margin:"0 0 8px", letterSpacing:"-.03em", lineHeight:1 }}>Pipeline Explorer</h1>
            <p style={{ color:SUB, fontSize:14.5, margin:0, maxWidth:560, lineHeight:1.6 }}>
              {mode === "overview" ? "Glance the whole lifecycle, then dive into any stage." : "Scroll to travel — the cockpit tracks where you are."}
            </p>
          </div>
          <div style={{ display:"inline-flex", background:"var(--panel)", border:"1px solid var(--hairline)", borderRadius:999, padding:3, flexShrink:0 }}>
            {[["overview","⊞ Overview"], ["journey","↓ Journey"]].map(([m, label]) => (
              <button key={m} onClick={() => setMode(m)} className="lc-shine"
                style={{ border:"none", cursor:"pointer", borderRadius:999, padding:"8px 16px", fontSize:13, fontWeight:700,
                  background: mode === m ? "var(--accent)" : "transparent", color: mode === m ? "#fff" : "var(--text-sec)", transition:"all .2s" }}>{label}</button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ════════ OVERVIEW (quick glance) ════════ */}
      {mode === "overview" && (
        <div style={{ animation:"lc-dropin .3s ease" }}>
          {PHASES.map(p => (
            <div key={p.id} style={{ marginBottom:26 }}>
              <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:13 }}>
                <span style={{ display:"flex", color:p.color }}><Icon name={p.ic} size={16} /></span>
                <span style={{ color:p.color, fontFamily:MONO, fontSize:11, fontWeight:800, letterSpacing:".1em", textTransform:"uppercase" }}>{p.name}</span>
                <span style={{ color:FAINT, fontFamily:MONO, fontSize:11 }}>STAGES {String(p.range[0]).padStart(2,"0")}–{String(p.range[1]).padStart(2,"0")}</span>
                <div style={{ flex:1, height:1, background:`linear-gradient(90deg, color-mix(in srgb, ${p.color} 45%, transparent), transparent)` }}/>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(265px,1fr))", gap:12 }}>
                {stagesIn(p).map(s => (
                  <button key={s.id} onClick={() => enterStage(s.id)} className="lc-meshhost lc-shine"
                    style={{ ...glassPanel, borderTop:`3px solid ${p.color}`, padding:"15px 17px", textAlign:"left", cursor:"pointer", position:"relative", overflow:"hidden", display:"flex", flexDirection:"column", transition:"transform .2s, border-color .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}>
                    <span className="lc-meshlayer" />
                    <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", height:"100%" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:9 }}>
                        <span style={{ fontFamily:MONO, fontSize:12, color:FAINT, fontWeight:700 }}>{s.stage}</span>
                        <span style={{ width:34, height:34, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid var(--hairline)", background:`color-mix(in srgb, ${p.color} 14%, transparent)`, color:p.color }}><Icon name={stageIcon(s.id)} size={18} /></span>
                        <span style={{ marginLeft:"auto", fontFamily:MONO, fontSize:10, color:FAINT }}>{s.topics?.length || 0}T · {s.questions?.length || 0}Q</span>
                      </div>
                      <div style={{ color:TEXT, fontWeight:800, fontSize:15, letterSpacing:"-.01em" }}>{s.label}</div>
                      <div style={{ color:p.color, fontSize:11.5, fontWeight:600, marginBottom:7 }}>{s.sub}</div>
                      <div style={{ color:SUB, fontSize:12, lineHeight:1.55, flex:1, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{preview(s)}</div>
                      <div style={{ color:"var(--accent)", fontSize:12, fontWeight:700, marginTop:11 }}>Enter stage →</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ════════ JOURNEY (scroll-choreographed) ════════ */}
      {mode === "journey" && (
      <div className="pl-grid">

        {/* COCKPIT */}
        <div className="pl-rail">
          <div className="lc-edge" style={{ ...glassPanel, borderRadius:20, padding:"22px 22px 20px", position:"relative", overflow:"hidden" }}>
            <div style={{ fontFamily:MONO, fontSize:11, letterSpacing:".14em", color:FAINT, marginBottom:16 }}>
              STAGE <span style={{ color:"var(--accent)", fontWeight:800 }}>{stage.stage}</span> / 16
            </div>

            <div key={activeId} style={{ animation:"lc-dropin .35s ease", display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
              <div style={{ position:"relative", width:66, height:66, flexShrink:0 }}>
                <svg width="66" height="66" viewBox="0 0 66 66" style={{ transform:"rotate(-90deg)" }}>
                  <circle cx="33" cy="33" r={R} fill="none" stroke="var(--hairline)" strokeWidth="3" />
                  <circle cx="33" cy="33" r={R} fill="none" stroke={ph.color} strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={C} strokeDashoffset={C * (1 - prog)} style={{ transition:"stroke-dashoffset .15s linear" }} />
                </svg>
                <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", color:ph.color }}><Icon name={stageIcon(stage.id)} size={26} /></div>
              </div>
              <div style={{ minWidth:0 }}>
                <div style={{ color:TEXT, fontWeight:800, fontSize:17, letterSpacing:"-.01em", lineHeight:1.15 }}>{stage.label}</div>
                <div style={{ color:FAINT, fontSize:12, marginTop:2 }}>{stage.sub}</div>
              </div>
            </div>

            <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:`color-mix(in srgb, ${ph.color} 14%, transparent)`, border:`1px solid color-mix(in srgb, ${ph.color} 40%, transparent)`, color:ph.color, borderRadius:999, padding:"4px 11px", fontSize:11, fontWeight:700, marginBottom:16 }}>
              <Icon name={ph.ic} size={13} />{ph.name}
            </div>

            <div style={{ height:5, background:"var(--panel-2)", borderRadius:5, overflow:"hidden", marginBottom:16, boxShadow:"inset 0 0 0 1px var(--hairline)" }}>
              <div style={{ height:"100%", width:`${prog*100}%`, background:"linear-gradient(90deg, var(--accent), var(--accent-2))", borderRadius:5 }} />
            </div>

            {/* dots + hover preview */}
            <div style={{ position:"relative", marginBottom:18 }}>
              {hs && (() => {
                const hp = phaseOfNum(parseInt(hs.stage, 10));
                return (
                  <div className="lc-glass lc-edge" style={{ position:"absolute", bottom:"calc(100% + 10px)", left:0, right:0, borderRadius:12, padding:"10px 12px", zIndex:5, animation:"lc-dropin .14s ease" }}>
                    <div style={{ fontFamily:MONO, fontSize:10, color:hp.color, letterSpacing:".06em" }}>STAGE {hs.stage} · {hp.name.toUpperCase()}</div>
                    <div style={{ color:TEXT, fontWeight:750, fontSize:13.5, marginTop:3 }}>{hs.label}</div>
                    <div style={{ color:FAINT, fontSize:11.5, marginTop:2 }}>{hs.sub} · {hs.topics?.length || 0} topics · {hs.questions?.length || 0} Qs</div>
                  </div>
                );
              })()}
              <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                {PIPELINE.map(s => {
                  const on = s.id === activeId;
                  const sp = phaseOfNum(parseInt(s.stage, 10));
                  return (
                    <button key={s.id} onClick={() => jump(s.id)} onMouseEnter={() => setHoverDot(s.id)} onMouseLeave={() => setHoverDot(null)}
                      style={{ width: on ? 22 : 13, height:13, borderRadius:99, cursor:"pointer", border:"none", padding:0, flexShrink:0,
                        background: on ? sp.color : (s.id === hoverDot ? `color-mix(in srgb, ${sp.color} 55%, transparent)` : "var(--panel-2)"),
                        boxShadow: on ? `0 0 10px ${sp.color}` : "inset 0 0 0 1px var(--hairline)", transition:"all .25s cubic-bezier(.34,1.6,.5,1)" }} />
                  );
                })}
              </div>
            </div>

            <div style={{ display:"flex", gap:8 }}>
              <button onClick={() => prev && jump(prev.id)} disabled={!prev} className="lc-ghost lc-shine" style={{ flex:1, padding:"9px 10px", fontSize:12, opacity: prev ? 1 : 0.4, cursor: prev ? "pointer" : "default" }}>← Prev</button>
              <Magnetic strength={8} style={{ flex:1 }}>
                <button onClick={() => next && jump(next.id)} disabled={!next} className="lc-pill lc-shine" style={{ width:"100%", padding:"9px 10px", fontSize:12, opacity: next ? 1 : 0.4, cursor: next ? "pointer" : "default" }}>Next →</button>
              </Magnetic>
            </div>
            <button onClick={() => setMode("overview")} className="lc-shine" style={{ width:"100%", marginTop:10, background:"none", border:"none", cursor:"pointer", color:FAINT, fontFamily:MONO, fontSize:11, letterSpacing:".06em", padding:"4px" }}>⊞ back to overview</button>
          </div>
        </div>

        {/* CHAPTERS */}
        <div ref={sectionRef}>
          {PIPELINE.map(s => {
            const ov = STAGE_OVERVIEWS[s.id];
            const sp = phaseOfNum(parseInt(s.stage, 10));
            const sNext = PIPELINE[PIPELINE.findIndex(x => x.id === s.id) + 1];
            return (
              <section key={s.id} data-id={s.id} ref={el => (refs.current[s.id] = el)}
                style={{ scrollMarginTop:88, minHeight:"66vh", paddingBottom:44, marginBottom:44, borderBottom:"1px solid var(--hairline)" }}>

                <Reveal>
                  <div style={{ fontFamily:MONO, fontSize:11, fontWeight:700, letterSpacing:".14em", color:sp.color, marginBottom:8 }}>STAGE {s.stage} · {sp.name.toUpperCase()}</div>
                  <h2 style={{ color:TEXT, margin:"0 0 6px", fontSize:30, fontWeight:850, letterSpacing:"-.025em" }}>{s.label}</h2>
                  <p style={{ color:SUB, fontSize:14, margin:0 }}>{s.sub}</p>
                </Reveal>

                {ov ? (
                  <>
                    <Reveal delay={60}>
                      <div style={{ marginTop:18 }}>
                        {ov.what.split("\n\n").map((para, i) => <p key={i} style={{ color:SUB, fontSize:14.5, lineHeight:1.8, margin:"0 0 12px" }}>{para}</p>)}
                      </div>
                    </Reveal>
                    {(ov.before || ov.after) && (
                      <Reveal delay={90}>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, margin:"6px 0 8px" }}>
                          <GBox color="#8aa" label="← INPUTS">{ov.before}</GBox>
                          <GBox color={sp.color} label="OUTPUTS →">{ov.after}</GBox>
                        </div>
                      </Reveal>
                    )}
                    {ov.steps?.length > 0 && (
                      <Reveal delay={110}>
                        <h4 style={{ color:sp.color, margin:"18px 0 12px", fontSize:12.5, fontWeight:800, textTransform:"uppercase", letterSpacing:".06em" }}>What actually happens</h4>
                        {ov.steps.map((step, i) => (
                          <div key={i} style={{ display:"flex", gap:14, ...glassPanel, borderLeft:`3px solid ${sp.color}`, padding:14, marginBottom:10 }}>
                            <div style={{ flexShrink:0, width:30, height:30, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", background:`color-mix(in srgb, ${sp.color} 16%, transparent)`, border:`2px solid color-mix(in srgb, ${sp.color} 45%, transparent)`, color:sp.color, fontWeight:800, fontSize:13, fontFamily:MONO }}>{step.num}</div>
                            <div style={{ flex:1, minWidth:0 }}>
                              <div style={{ color:TEXT, fontWeight:750, fontSize:14, marginBottom:5 }}>{step.title}</div>
                              <div style={{ color:SUB, fontSize:13, lineHeight:1.7 }}>{step.detail}</div>
                            </div>
                          </div>
                        ))}
                      </Reveal>
                    )}
                    {(ov.duration || ov.team || ov.deliverables) && (
                      <Reveal delay={130}>
                        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:12, marginTop:14 }}>
                          {ov.duration && <GBox color="#F59E0B" label="⏱ DURATION">{ov.duration}</GBox>}
                          {ov.team && <GBox color="#34D399" label="TEAM">{ov.team}</GBox>}
                          {ov.deliverables && <GBox color="#A78BFA" label="DELIVERABLES"><ul style={{ margin:0, paddingLeft:16, lineHeight:1.8 }}>{ov.deliverables.map((d, i) => <li key={i}>{d}</li>)}</ul></GBox>}
                        </div>
                      </Reveal>
                    )}
                  </>
                ) : <p style={{ color:FAINT, fontStyle:"italic", marginTop:18 }}>Overview content coming soon for this stage.</p>}

                <Reveal delay={150}>
                  <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginTop:18 }}>
                    {s.topics?.length > 0 && (
                      <details style={{ ...glassPanel, padding:"12px 16px", flex:"1 1 260px" }}>
                        <summary style={{ cursor:"pointer", color:TEXT, fontWeight:700, fontSize:13.5, display:"flex", alignItems:"center", gap:8 }}><Icon name="glossary" size={16} style={{ color:"var(--accent)" }} />{s.topics.length} deep-dive topics</summary>
                        <div style={{ marginTop:12 }}>
                          {s.topics.map(tp => (
                            <details key={tp.id} style={{ borderTop:"1px solid var(--hairline)", padding:"10px 0" }}>
                              <summary style={{ cursor:"pointer", color:SUB, fontWeight:600, fontSize:13 }}>{tp.title}</summary>
                              <div style={{ marginTop:10 }}>
                                <p style={{ color:SUB, fontSize:13, lineHeight:1.7, margin:"0 0 10px" }}>{tp.body}</p>
                                <GBox color="#22D3EE" label="WHY THIS MATTERS">{tp.why}</GBox>
                                <GBox color="#34D399" label="HOW TO STUDY">{tp.how}</GBox>
                                <p style={{ color:FAINT, fontSize:11, margin:0, fontStyle:"italic" }}>Ref · {tp.ref}</p>
                              </div>
                            </details>
                          ))}
                        </div>
                      </details>
                    )}
                    {s.questions?.length > 0 && (
                      <details style={{ ...glassPanel, padding:"12px 16px", flex:"1 1 260px" }}>
                        <summary style={{ cursor:"pointer", color:TEXT, fontWeight:700, fontSize:13.5, display:"flex", alignItems:"center", gap:8 }}><Icon name="exam" size={16} style={{ color:"var(--accent)" }} />{s.questions.length} exam questions</summary>
                        <div style={{ marginTop:12 }}>
                          {s.questions.map(q => (
                            <details key={q.id} style={{ borderTop:"1px solid var(--hairline)", padding:"10px 0" }}>
                              <summary style={{ cursor:"pointer", display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
                                <span style={{ background:`color-mix(in srgb, ${LC[q.level]} 18%, transparent)`, color:LC[q.level], borderRadius:12, padding:"1px 8px", fontSize:10, fontWeight:800 }}>{q.level}</span>
                                <span style={{ color:SUB, fontWeight:600, fontSize:13 }}>{q.q}</span>
                              </summary>
                              <div style={{ marginTop:10 }}>
                                <GBox color="#22D3EE" label="WHY IT MATTERS">{q.why}</GBox>
                                <GBox color="#34D399" label="HOW TO FIND THE ANSWER">{q.how}</GBox>
                                <p style={{ color:FAINT, fontSize:11, margin:0, fontStyle:"italic" }}>Ref · {q.ref}</p>
                              </div>
                            </details>
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                </Reveal>

                {sNext && (
                  <button onClick={() => jump(sNext.id)} className="lc-ghost lc-shine" style={{ marginTop:22, padding:"10px 18px", fontSize:13, display:"inline-flex", alignItems:"center", gap:8 }}>
                    Continue to {sNext.stage} · {sNext.label}<span style={{ color:"var(--accent)" }}>↓</span>
                  </button>
                )}
              </section>
            );
          })}
        </div>
      </div>
      )}
    </div>
  );
}
