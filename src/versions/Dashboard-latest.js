import { useState, useEffect, useMemo } from "react";
import { LC, Badge, InfoBox, HeroBiologic } from "../shared";
import { PIPELINE, DOMAINS, GLOSSARY } from "../cmc-data";
import { ANALYTICAL_METHODS, ICH_GUIDELINES } from "../extra-data";
import { CASE_STUDIES } from "../case-study-data";
import { COMPENDIAL_METHODS } from "../compendial-data";
import { PATHWAY_MILESTONES } from "../pathway-data";

const ALL_VIEWS = [
  { id:"pipeline",   icon:"🗺️", label:"Pipeline Explorer",       color:"#C084FC" },
  { id:"methods",    icon:"🔬", label:"Analytical Methods",       color:"#22D3EE" },
  { id:"qbd",        icon:"⚗️", label:"QbD / CQA / CPP",         color:"#F472B6" },
  { id:"ctd",        icon:"📂", label:"CTD Navigator",            color:"#34D399" },
  { id:"timeline",   icon:"📅", label:"CMC Timeline",             color:"#F59E0B" },
  { id:"domains",    icon:"📚", label:"Domain Q-Bank",            color:"#38BDF8" },
  { id:"exam",       icon:"🎯", label:"Exam Mode",                color:"#F472B6" },
  { id:"ich",        icon:"📜", label:"ICH Guidelines",           color:"#A78BFA" },
  { id:"career",     icon:"🚀", label:"Career & Interviews",      color:"#60A5FA" },
  { id:"notes",      icon:"📝", label:"My Notes",                 color:"#FB923C" },
  { id:"glossary",   icon:"📖", label:"CMC Glossary",             color:"#34D399" },
  { id:"stability",  icon:"🧊", label:"Stability Studies",        color:"#38BDF8" },
  { id:"oos",        icon:"🚨", label:"OOS/OOT Investigation",    color:"#F59E0B" },
  { id:"batch",      icon:"📋", label:"Batch Record Simulator",   color:"#34D399" },
  { id:"cases",      icon:"📰", label:"Case Studies",             color:"#F472B6" },
  { id:"compendial", icon:"📗", label:"Compendial Reference",     color:"#A78BFA" },
  { id:"excipient",  icon:"🧫", label:"Excipient Compatibility",  color:"#60A5FA" },
  { id:"pathway",    icon:"🎓", label:"Learning Pathways",        color:"#FB923C" },
  { id:"progress",   icon:"📊", label:"My Progress",              color:"#C084FC" },
];

const DAILY_GOAL = 20;

// ── Animated SVG progress ring ────────────────────────────────
function Ring({ pct, color, value, sub }) {
  const size = 88, stroke = 8;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const off = circ - (Math.min(Math.max(pct, 0), 100) / 100) * circ;
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:7 }}>
      <div style={{ position:"relative", width:size, height:size }}>
        <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
          <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,0.10)" strokeWidth={stroke} fill="none" />
          <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
            strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
            style={{ transition:"stroke-dashoffset 1.15s cubic-bezier(0.22,1,0.36,1)", filter:`drop-shadow(0 0 5px ${color}66)` }} />
        </svg>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ color, fontWeight:900, fontSize:19, lineHeight:1 }}>{value}</span>
        </div>
      </div>
      <span style={{ color:"#FDE68A", fontSize:10, fontWeight:700, letterSpacing:"0.02em", textAlign:"center", lineHeight:1.3, maxWidth:96 }}>{sub}</span>
    </div>
  );
}

export default function Dashboard({ setView }) {
  const allPipelineQ = PIPELINE.flatMap(s => s.questions);
  const allDomainQ   = DOMAINS.flatMap(d => d.questions);
  const allTopics    = PIPELINE.flatMap(s => s.topics || []);

  const [randQ, setRandQ] = useState(null);
  const [hoveredStage, setHoveredStage] = useState(null);

  // ── Personal data from localStorage ──
  const [quizData, setQuizData] = useState({});
  const [visited, setVisited]   = useState([]);
  const [pathway, setPathway]   = useState([]);

  useEffect(() => {
    try {
      setQuizData(JSON.parse(localStorage.getItem("cmc-quiz-progress") || "{}"));
      const v = JSON.parse(localStorage.getItem("cmc-visited-views") || "[]");
      setVisited(Array.isArray(v) ? v.filter(id => id !== "dashboard") : []);
      const p = JSON.parse(localStorage.getItem("cmc-pathway-progress") || "[]");
      setPathway(Array.isArray(p) ? p : []);
    } catch { /* ignore */ }
  }, []);

  const me = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const keys = Object.keys(quizData);
    const allHistory = keys.flatMap(k => quizData[k]?.history || []);
    const correct = allHistory.filter(h => h.quality >= 3).length;
    const correctRate = allHistory.length ? Math.round((correct / allHistory.length) * 100) : 0;
    const reviewsToday = allHistory.filter(h => (h.date || "").slice(0, 10) === today).length;
    const dueToday = Object.values(quizData).filter(v => v?.nextDue && v.nextDue <= today).length;

    // Study streak — consecutive days with ≥1 review, counting back from today
    // (a missed *today* doesn't break it until tomorrow, so start from yesterday if needed)
    const dates = new Set(allHistory.map(h => (h.date || "").slice(0, 10)).filter(Boolean));
    let streak = 0;
    let cursor = new Date();
    if (!dates.has(cursor.toISOString().slice(0, 10))) {
      cursor = new Date(Date.now() - 86400000);
    }
    while (dates.has(cursor.toISOString().slice(0, 10))) {
      streak++;
      cursor = new Date(cursor.getTime() - 86400000);
    }

    // last-7-days mini sparkline
    const week = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      week.push({ d, count: allHistory.filter(h => (h.date || "").slice(0, 10) === d).length });
    }

    const recent = [...visited].reverse().slice(0, 8);
    const recommended = ALL_VIEWS.find(v => !visited.includes(v.id));
    const attempted = keys.length;
    const isNew = attempted === 0 && visited.length === 0;

    return {
      attempted, correctRate, reviewsToday, dueToday, streak, week,
      recent, recommended, isNew,
      coverage: visited.length,
      coveragePct: Math.round((visited.length / ALL_VIEWS.length) * 100),
      reviewPct: Math.min(Math.round((reviewsToday / DAILY_GOAL) * 100), 100),
      badges: pathway.length,
    };
  }, [quizData, visited, pathway]);

  const random = () => {
    const all = [...allPipelineQ, ...allDomainQ];
    setRandQ(all[Math.floor(Math.random() * all.length)]);
  };

  const hr = new Date().getHours();
  const greeting = hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening";

  // ── Smart primary CTA ──
  const lastMeta = me.recent.length ? ALL_VIEWS.find(v => v.id === me.recent[0]) : null;
  let primary;
  if (me.dueToday > 0) {
    primary = { label:`🧠 Review ${me.dueToday} card${me.dueToday > 1 ? "s" : ""} due today`, view:"exam" };
  } else if (me.isNew) {
    primary = { label:"🚀 Start Learning", view:"pipeline" };
  } else if (lastMeta) {
    primary = { label:`▶ Continue: ${lastMeta.label}`, view:lastMeta.id };
  } else {
    primary = { label:"🎯 Start Exam Mode", view:"exam" };
  }

  const keyStats = [
    { label:"Exam Questions",     value: allPipelineQ.length + allDomainQ.length, icon:"🎯", color:"#38BDF8", view:"exam" },
    { label:"Analytical Methods", value: ANALYTICAL_METHODS.length,               icon:"🔬", color:"#22D3EE", view:"methods" },
    { label:"Pipeline Topics",    value: allTopics.length,                         icon:"📘", color:"#C084FC", view:"pipeline" },
    { label:"Pipeline Stages",    value: PIPELINE.length,                          icon:"🗺️", color:"#F59E0B", view:"pipeline" },
    { label:"Case Studies",       value: CASE_STUDIES.length,                      icon:"📰", color:"#F472B6", view:"cases" },
    { label:"Glossary Terms",     value: GLOSSARY.length,                          icon:"📖", color:"#34D399", view:"glossary" },
    { label:"ICH + Compendial",   value: ICH_GUIDELINES.length + COMPENDIAL_METHODS.length, icon:"📜", color:"#A78BFA", view:"ich" },
    { label:"CMC Domains",        value: DOMAINS.length,                           icon:"📚", color:"#60A5FA", view:"domains" },
  ];

  const coreCards = [
    { view:"pipeline",  icon:"🗺️", label:"Pipeline Explorer",      desc:"16-stage biologic development lifecycle", color:"#C084FC" },
    { view:"methods",   icon:"🔬", label:"Analytical Methods",      desc:"22 detailed assay cards with full specs",  color:"#22D3EE" },
    { view:"qbd",       icon:"⚗️", label:"QbD / CQA / CPP / COA",  desc:"Quality by Design — FMEA, design space",  color:"#F472B6" },
    { view:"ctd",       icon:"📂", label:"CTD Navigator",           desc:"Modules 1–5 complete CMC reference",       color:"#34D399" },
    { view:"timeline",  icon:"📅", label:"CMC Timeline",            desc:"Phase-by-phase CMC deliverables",          color:"#F59E0B" },
    { view:"domains",   icon:"📚", label:"Domain Q-Bank",           desc:"100+ questions across 10 domains",         color:"#38BDF8" },
    { view:"exam",      icon:"🎯", label:"Exam Mode",               desc:"Test yourself with SM-2 spaced repetition",color:"#F472B6" },
    { view:"ich",       icon:"📜", label:"ICH Guidelines",          desc:"9 core quality guidelines decoded",        color:"#A78BFA" },
    { view:"career",    icon:"🚀", label:"Career & Interviews",     desc:"Career ladder, salaries, 18 expert Q&As",  color:"#60A5FA" },
    { view:"notes",     icon:"📝", label:"My Notes",                desc:"Capture and organize your CMC notes",      color:"#FB923C" },
    { view:"glossary",  icon:"📖", label:"CMC Glossary",            desc:"50 essential terms defined",               color:"#34D399" },
  ];

  const advancedCards = [
    { view:"stability", icon:"🧊", label:"Stability Studies",       desc:"ICH Q1A(R2) conditions, zones & T90 calc", color:"#38BDF8" },
    { view:"oos",       icon:"🚨", label:"OOS/OOT Investigation",   desc:"FDA 2006 interactive decision tree",       color:"#F59E0B" },
    { view:"batch",     icon:"📋", label:"Batch Record Simulator",  desc:"Sterile mAb BPR with deviation scenarios", color:"#34D399" },
    { view:"cases",     icon:"📰", label:"Case Studies",            desc:`${CASE_STUDIES.length} landmark CMC failures & lessons`, color:"#F472B6" },
    { view:"compendial",icon:"📗", label:"Compendial Reference",    desc:"USP/EP/JP/ICH cross-reference guide",      color:"#A78BFA" },
    { view:"excipient", icon:"🧫", label:"Excipient Compatibility", desc:"18 excipients, incompatibility matrix",    color:"#60A5FA" },
    { view:"pathway",   icon:"🎓", label:"Learning Pathways",       desc:"30/60/90-day plans per career level",      color:"#FB923C" },
    { view:"progress",  icon:"📊", label:"My Progress",             desc:"SM-2 queue, activity & badges",            color:"#C084FC" },
  ];

  const startHereSteps = [
    { step:1, view:"pipeline", icon:"🗺️", label:"Explore the Pipeline", tip:"Start with the 16-stage lifecycle to see the full journey" },
    { step:2, view:"methods",  icon:"🔬", label:"Learn Key Assays",     tip:"Study the 22 analytical methods used to test biologics" },
    { step:3, view:"qbd",      icon:"⚗️", label:"Master QbD / CQAs",    tip:"Learn QTPP, CQAs, CPPs, FMEA and control strategy" },
    { step:4, view:"exam",     icon:"🎯", label:"Test Yourself",         tip:"Use Exam Mode with spaced repetition to lock it in" },
  ];

  const navCard = (n) => (
    <button key={n.view} onClick={() => setView(n.view)}
      style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:18,
        cursor:"pointer", textAlign:"left", borderTop:`3px solid ${n.color}`, transition:"all 0.18s" }}
      onMouseEnter={e => { e.currentTarget.style.background="var(--bg-raised)"; e.currentTarget.style.boxShadow=`0 6px 24px ${n.color}20`; e.currentTarget.style.transform="translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.background="var(--bg-card)"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="none"; }}>
      <div style={{ fontSize:24, marginBottom:8 }}>{n.icon}</div>
      <div style={{ color:"var(--text-h)", fontWeight:800, fontSize:13, marginBottom:4 }}>{n.label}</div>
      <div style={{ color:"var(--text-muted)", fontSize:11, lineHeight:1.5 }}>{n.desc}</div>
    </button>
  );

  return (
    <div style={{ maxWidth:1400, margin:"0 auto", padding:"32px 24px" }}>

      {/* ════════ HERO COMMAND CENTER ════════ */}
      <div style={{
        background:"radial-gradient(circle at 1px 1px, rgba(245,158,11,0.13) 1px, transparent 0) center/28px 28px, linear-gradient(135deg, #100A00 0%, #1E1400 50%, #100A00 100%)",
        borderRadius:20, border:"1px solid #F59E0B44",
        padding:"36px 44px", marginBottom:24,
        position:"relative", overflow:"hidden",
        display:"flex", alignItems:"center", gap:44, flexWrap:"wrap",
      }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:280, height:280, borderRadius:"50%", background:"#F59E0B12", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-80, left:-60, width:300, height:300, borderRadius:"50%", background:"#34D3990C", pointerEvents:"none" }}/>

        {/* Left — animated mAb instrument */}
        <div style={{ flex:"0 0 300px", display:"flex", flexDirection:"column", alignItems:"center", position:"relative", minHeight:230 }}>
          <div style={{ position:"absolute", width:250, height:250, borderRadius:"50%", border:"1px dashed #F59E0B28", top:"50%", left:"50%", transform:"translate(-50%,-52%)", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", width:210, height:210, borderRadius:"50%", border:"1px dashed #34D39920", top:"50%", left:"50%", transform:"translate(-50%,-52%)", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", top:"38%", right:0, zIndex:10, background:"#0c1a2eee", border:"1px solid #38BDF877", borderRadius:8, padding:"3px 10px", fontSize:10, fontWeight:800, color:"#38BDF8", whiteSpace:"nowrap" }}>Titer 3.2 g/L</div>
          <div style={{ position:"absolute", top:"38%", left:0, zIndex:10, background:"#1e1b4bee", border:"1px solid #A78BFA77", borderRadius:8, padding:"3px 10px", fontSize:10, fontWeight:800, color:"#A78BFA", whiteSpace:"nowrap" }}>pH 7.10 ✓</div>
          <div style={{ position:"absolute", top:-30, left:"50%", transform:"translateX(-50%)", background:"#052e16ee", border:"1px solid #34D39977", borderRadius:8, padding:"3px 10px", fontSize:10, fontWeight:800, color:"#34D399", whiteSpace:"nowrap" }}>Viability 98.4% ✓</div>
          <div style={{ position:"absolute", bottom:2, left:"50%", transform:"translateX(-50%)", zIndex:10, background:"#1c1028ee", border:"1px solid #F472B677", borderRadius:8, padding:"3px 10px", fontSize:10, fontWeight:800, color:"#F472B6", whiteSpace:"nowrap" }}>pO₂ 40% DO</div>
          <HeroBiologic />
        </div>

        {/* Right — personalized command center */}
        <div style={{ flex:1, minWidth:300 }}>
          {/* Greeting + streak */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8, flexWrap:"wrap" }}>
            <span style={{ fontSize:11, fontWeight:800, color:"#FCD34D", letterSpacing:"0.12em", textTransform:"uppercase" }}>
              {greeting} 👋
            </span>
            {me.streak > 0 && (
              <span title="Consecutive days with reviews"
                style={{ display:"inline-flex", alignItems:"center", gap:5, background:"#7c2d1233",
                  border:"1px solid #F59E0B66", borderRadius:20, padding:"3px 11px", fontSize:11, fontWeight:800, color:"#FDBA74" }}>
                🔥 {me.streak}-day streak
                {me.reviewsToday === 0 && <span style={{ color:"#FCA5A5", fontWeight:600 }}>· review to keep it</span>}
              </span>
            )}
            {me.badges > 0 && (
              <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:"#A78BFA22",
                border:"1px solid #A78BFA55", borderRadius:20, padding:"3px 11px", fontSize:11, fontWeight:800, color:"#C4B5FD" }}>
                🏆 {me.badges}/{PATHWAY_MILESTONES.length} badges
              </span>
            )}
          </div>

          <h1 style={{ fontSize:40, fontWeight:900, margin:"0 0 10px", letterSpacing:"-0.025em", lineHeight:1.1,
            background:"linear-gradient(135deg, #FFFFFF 0%, #FDE68A 30%, #F59E0B 60%, #34D399 100%)",
            WebkitBackgroundClip:"text", backgroundClip:"text", WebkitTextFillColor:"transparent", display:"inline-block" }}>
            CMC App
          </h1>
          <p style={{ color:"#FEF3C7", fontSize:14.5, margin:"0 0 22px", maxWidth:460, lineHeight:1.6 }}>
            {me.isNew
              ? "Your complete Chemistry, Manufacturing & Controls toolkit — from gene construction to post-approval lifecycle. Let's get started."
              : `You've explored ${me.coverage} of ${ALL_VIEWS.length} sections${me.attempted > 0 ? ` and practiced ${me.attempted} question${me.attempted > 1 ? "s" : ""}` : ""}. Keep the momentum going.`}
          </p>

          {/* Progress rings */}
          <div style={{ display:"flex", gap:26, marginBottom:24, flexWrap:"wrap" }}>
            <Ring pct={me.reviewPct} color="#F59E0B"
              value={`${me.reviewsToday}`} sub={`Reviews today / ${DAILY_GOAL}`} />
            <Ring pct={me.coveragePct} color="#34D399"
              value={`${me.coveragePct}%`} sub={`Explored · ${me.coverage}/${ALL_VIEWS.length}`} />
            <Ring pct={me.correctRate} color="#38BDF8"
              value={me.attempted > 0 ? `${me.correctRate}%` : "—"} sub={me.attempted > 0 ? "Answer accuracy" : "No quizzes yet"} />
          </div>

          {/* Smart CTA row */}
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <button onClick={() => setView(primary.view)}
              style={{ background:"linear-gradient(135deg,#92400E,#F59E0B)", color:"#fff", border:"none",
                borderRadius:10, padding:"12px 24px", cursor:"pointer", fontWeight:800, fontSize:14,
                boxShadow:"0 4px 20px #F59E0B44", transition:"transform 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.transform="scale(1.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; }}>
              {primary.label}
            </button>
            <button onClick={() => setView("pipeline")}
              style={{ background:"rgba(245,158,11,0.1)", color:"#FCD34D", border:"1px solid #F59E0B50",
                borderRadius:10, padding:"12px 22px", cursor:"pointer", fontWeight:700, fontSize:14, transition:"all 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.background="#F59E0B22"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(245,158,11,0.1)"; }}>
              🗺️ Explore Pipeline
            </button>
            <button onClick={() => setView("progress")}
              style={{ background:"rgba(52,211,153,0.08)", color:"#34D399", border:"1px solid #34D39950",
                borderRadius:10, padding:"12px 22px", cursor:"pointer", fontWeight:700, fontSize:14, transition:"all 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.background="#34D39918"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(52,211,153,0.08)"; }}>
              📊 My Progress
            </button>
          </div>
        </div>
      </div>

      {/* ════════ START HERE (new users) ════════ */}
      {me.isNew && (
        <div style={{ background:"linear-gradient(135deg,#0f1a2e,#0a1628)", border:"1px solid #38BDF844",
          borderRadius:16, padding:"22px 28px", marginBottom:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
            <span style={{ fontSize:20 }}>🧭</span>
            <h3 style={{ color:"var(--text-h)", margin:0, fontSize:16, fontWeight:900 }}>New here? Follow the path</h3>
            <span style={{ background:"#38BDF822", color:"#38BDF8", borderRadius:20, padding:"2px 10px", fontSize:10, fontWeight:800, border:"1px solid #38BDF833" }}>RECOMMENDED</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:10 }}>
            {startHereSteps.map(s => (
              <button key={s.step} onClick={() => setView(s.view)}
                style={{ background:"rgba(255,255,255,0.04)", border:"1px solid #38BDF822", borderRadius:12, padding:"14px 16px",
                  cursor:"pointer", textAlign:"left", transition:"all 0.18s", display:"flex", gap:12, alignItems:"flex-start" }}
                onMouseEnter={e => { e.currentTarget.style.background="#38BDF810"; e.currentTarget.style.borderColor="#38BDF844"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor="#38BDF822"; }}>
                <span style={{ background:"#38BDF822", color:"#38BDF8", borderRadius:"50%", width:28, height:28, display:"flex",
                  alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:900, flexShrink:0 }}>{s.step}</span>
                <div>
                  <div style={{ color:"var(--text-h)", fontWeight:800, fontSize:13, marginBottom:3 }}>{s.icon} {s.label}</div>
                  <div style={{ color:"var(--text-muted)", fontSize:11, lineHeight:1.4 }}>{s.tip}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ════════ JUMP BACK IN (returning users) ════════ */}
      {!me.isNew && (
        <div style={{ display:"grid", gridTemplateColumns: me.recommended ? "1fr 300px" : "1fr", gap:16, marginBottom:24 }}>
          <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:"16px 20px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <span style={{ color:"var(--text-muted)", fontSize:11, fontWeight:800, letterSpacing:"0.08em" }}>↩ JUMP BACK IN</span>
              <div style={{ flex:1, height:1, background:"var(--border)" }}/>
            </div>
            {me.recent.length > 0 ? (
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {me.recent.map(id => {
                  const v = ALL_VIEWS.find(x => x.id === id);
                  if (!v) return null;
                  return (
                    <button key={id} onClick={() => setView(id)}
                      style={{ background:`${v.color}14`, color:v.color, border:`1px solid ${v.color}33`,
                        borderRadius:20, padding:"7px 15px", cursor:"pointer", fontSize:12.5, fontWeight:700, transition:"all 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.background=`${v.color}28`; e.currentTarget.style.borderColor=`${v.color}66`; e.currentTarget.style.transform="translateY(-1px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background=`${v.color}14`; e.currentTarget.style.borderColor=`${v.color}33`; e.currentTarget.style.transform="none"; }}>
                      {v.icon} {v.label}
                    </button>
                  );
                })}
              </div>
            ) : (
              <p style={{ color:"var(--text-muted)", fontSize:13, margin:0 }}>Start exploring sections and they'll show up here for quick access.</p>
            )}
          </div>

          {me.recommended && (
            <button onClick={() => setView(me.recommended.id)}
              style={{ background:`linear-gradient(135deg, ${me.recommended.color}18, var(--bg-card))`,
                border:`1px solid ${me.recommended.color}55`, borderRadius:14, padding:"16px 20px",
                cursor:"pointer", textAlign:"left", transition:"all 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 26px ${me.recommended.color}25`; }}
              onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
              <div style={{ color:me.recommended.color, fontSize:10, fontWeight:800, letterSpacing:"0.08em", marginBottom:8 }}>✨ TRY NEXT</div>
              <div style={{ fontSize:26, marginBottom:6 }}>{me.recommended.icon}</div>
              <div style={{ color:"var(--text-h)", fontWeight:800, fontSize:14, marginBottom:3 }}>{me.recommended.label}</div>
              <div style={{ color:"var(--text-muted)", fontSize:11 }}>One of {ALL_VIEWS.length - me.coverage} section{ALL_VIEWS.length - me.coverage !== 1 ? "s" : ""} you haven't opened yet</div>
            </button>
          )}
        </div>
      )}

      {/* ════════ CONTENT LIBRARY ════════ */}
      <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:"16px 20px", marginBottom:24 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
          <span style={{ color:"var(--text-muted)", fontSize:11, fontWeight:800, letterSpacing:"0.08em" }}>📦 CONTENT LIBRARY</span>
          <div style={{ flex:1, height:1, background:"var(--border)" }}/>
          <span style={{ color:"var(--text-faint)", fontSize:10 }}>tap a stat to jump in</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:10 }}>
          {keyStats.map(s => (
            <button key={s.label} onClick={() => setView(s.view)}
              style={{ display:"flex", alignItems:"center", gap:12, background:"var(--bg-surface)", border:"1px solid var(--border)",
                borderRadius:12, padding:"11px 14px", cursor:"pointer", textAlign:"left", transition:"all 0.16s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=`${s.color}77`; e.currentTarget.style.background="var(--bg-raised)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.background="var(--bg-surface)"; }}>
              <span style={{ fontSize:20, flexShrink:0 }}>{s.icon}</span>
              <div>
                <div style={{ color:s.color, fontWeight:900, fontSize:19, lineHeight:1 }}>{s.value}</div>
                <div style={{ color:"var(--text-muted)", fontSize:10.5, marginTop:3, fontWeight:600 }}>{s.label}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ════════ PIPELINE STRIP ════════ */}
      <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:24, marginBottom:24 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div>
            <h3 style={{ color:"var(--text-h)", margin:"0 0 2px", fontSize:16, fontWeight:800 }}>🗺️ Biologic Development Pipeline</h3>
            <p style={{ color:"var(--text-muted)", margin:0, fontSize:11 }}>Hover any stage · {PIPELINE.length} stages · {allTopics.length} deep-dive topics · {allPipelineQ.length} questions</p>
          </div>
          <button onClick={() => setView("pipeline")}
            style={{ background:"var(--accent)", color:"#fff", border:"none", borderRadius:8, padding:"7px 16px", cursor:"pointer", fontWeight:700, fontSize:12 }}>
            Explore All →
          </button>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom: hoveredStage ? 16 : 0 }}>
          {PIPELINE.map(s => {
            const isHov = hoveredStage === s.id;
            return (
              <div key={s.id} onMouseEnter={() => setHoveredStage(s.id)} onMouseLeave={() => setHoveredStage(null)}
                onClick={() => setView("pipeline")}
                style={{ display:"flex", alignItems:"center", gap:7, padding:"8px 14px", borderRadius:24,
                  background: isHov ? `${s.accent}25` : "var(--bg-surface)",
                  border:`1.5px solid ${isHov ? s.accent : "var(--border)"}`,
                  cursor:"pointer", userSelect:"none", transition:"all 0.22s cubic-bezier(0.34,1.56,0.64,1)",
                  transform: isHov ? "translateY(-3px)" : "none",
                  boxShadow: isHov ? `0 6px 20px ${s.accent}30` : "none" }}>
                <span style={{ width:20, height:20, borderRadius:"50%", background: isHov ? s.accent : "var(--bg-raised)",
                  border:`1.5px solid ${isHov ? s.accent : "var(--border)"}`, color: isHov ? "#fff" : "var(--text-faint)",
                  fontSize:9, fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.2s" }}>{s.stage}</span>
                <span style={{ fontSize:14 }}>{s.icon}</span>
                <span style={{ color: isHov ? s.accent : "var(--text-sec)", fontSize:12, fontWeight: isHov ? 700 : 500, transition:"color 0.2s" }}>{s.label}</span>
              </div>
            );
          })}
        </div>
        {hoveredStage && (() => {
          const s = PIPELINE.find(p => p.id === hoveredStage);
          if (!s) return null;
          return (
            <div style={{ borderTop:"1px solid var(--border)", paddingTop:16, display:"flex", gap:14, alignItems:"flex-start", animation:"fadeUp 0.18s ease" }}>
              <span style={{ fontSize:32, background:`${s.accent}20`, borderRadius:12, width:56, height:56,
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, border:`2px solid ${s.accent}44` }}>{s.icon}</span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                  <span style={{ color:s.accent, fontWeight:900, fontSize:15 }}>Stage {s.stage}: {s.label}</span>
                  <span style={{ background:`${s.accent}20`, color:s.accent, borderRadius:8, padding:"2px 8px", fontSize:10, fontWeight:800 }}>
                    {s.questions?.length || 0} questions · {s.topics?.length || 0} topics
                  </span>
                </div>
                <p style={{ color:"var(--text-sec)", fontSize:13, margin:"0 0 10px", lineHeight:1.5 }}>{s.sub}</p>
                <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
                  {s.topics?.slice(0,4).map(t => (
                    <div key={t.id} style={{ display:"flex", gap:5, alignItems:"flex-start" }}>
                      <span style={{ color:s.accent, fontSize:11, marginTop:2, flexShrink:0 }}>▸</span>
                      <span style={{ color:"var(--text-body)", fontSize:13, lineHeight:1.4 }}>{t.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* ════════ CORE CURRICULUM ════════ */}
      <div style={{ marginBottom:24 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
          <span style={{ color:"var(--text-faint)", fontSize:11, fontWeight:800, letterSpacing:"0.08em" }}>CORE CURRICULUM</span>
          <div style={{ flex:1, height:1, background:"var(--border)" }}/>
          <span style={{ color:"var(--text-muted)", fontSize:10 }}>{coreCards.length} sections</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))", gap:12 }}>
          {coreCards.map(navCard)}
        </div>
      </div>

      {/* ════════ ADVANCED TOOLS ════════ */}
      <div style={{ marginBottom:24 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
          <span style={{ color:"var(--text-faint)", fontSize:11, fontWeight:800, letterSpacing:"0.08em" }}>ADVANCED TOOLS</span>
          <div style={{ flex:1, height:1, background:"var(--border)" }}/>
          <span style={{ color:"var(--text-muted)", fontSize:10 }}>{advancedCards.length} tools</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))", gap:12 }}>
          {advancedCards.map(navCard)}
        </div>
      </div>

      {/* ════════ RANDOM QUESTION ════════ */}
      <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:22 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: randQ ? 16 : 0 }}>
          <div>
            <h3 style={{ color:"var(--text-h)", margin:"0 0 2px", fontSize:15, fontWeight:800 }}>🎲 Random Question</h3>
            <p style={{ color:"var(--text-muted)", margin:0, fontSize:11 }}>Test your knowledge on a random CMC topic</p>
          </div>
          <button onClick={random}
            style={{ background:"var(--accent)", color:"white", border:"none", borderRadius:8, padding:"9px 20px",
              cursor:"pointer", fontWeight:700, fontSize:13, transition:"transform 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.transform="scale(1.03)"}
            onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
            Randomize
          </button>
        </div>
        {randQ && (
          <div style={{ background:"var(--bg-surface)", borderRadius:10, padding:16, borderLeft:`3px solid ${LC[randQ.level]}`, animation:"slideDown 0.22s ease" }}>
            <Badge level={randQ.level} />
            <p style={{ color:"var(--text-body)", margin:"12px 0 10px", fontWeight:600, fontSize:15, lineHeight:1.6 }}>{randQ.q}</p>
            <details>
              <summary style={{ color:"var(--accent-light)", cursor:"pointer", fontSize:13, fontWeight:600 }}>▶ Show rationale</summary>
              <div style={{ marginTop:10, paddingTop:10, borderTop:"1px solid var(--border)" }}>
                <InfoBox color="#22D3EE" label="WHY IT MATTERS" text={randQ.why} />
                <InfoBox color="#34D399" label="HOW TO APPROACH" text={randQ.how} />
                <p style={{ color:"var(--text-faint)", fontSize:11, margin:0, fontStyle:"italic" }}>📎 {randQ.ref}</p>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
