import { useState, useMemo } from "react";
import { SectionHeader, InfoBox, FilterBtn, Badge, LC, sm2Update } from "../shared";
import { PIPELINE, DOMAINS } from "../cmc-data";

export default function ExamView() {
  const [source, setSource] = useState("domains");
  const [levelFilter, setLevelFilter] = useState("All");
  const [domainFilter, setDomainFilter] = useState("All");
  const [questions, setQuestions] = useState([]);
  const [revealed, setRevealed] = useState({});
  const [started, setStarted] = useState(false);
  const [srMode, setSrMode] = useState(false);
  const [quizProgress, setQuizProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cmc-quiz-progress") || "{}"); } catch { return {}; }
  });
  const [srRated, setSrRated] = useState({});

  const saveProgress = (data) => {
    setQuizProgress(data);
    try { localStorage.setItem("cmc-quiz-progress", JSON.stringify(data)); } catch { /* ignore */ }
  };

  const rateSR = (qid, quality) => {
    const existing = quizProgress[qid] || {};
    const updated = sm2Update(existing, quality);
    const history = [...(existing.history || []), { quality, date: new Date().toISOString().slice(0, 10) }];
    saveProgress({ ...quizProgress, [qid]: { ...updated, history } });
    setSrRated(r => ({ ...r, [qid]: quality }));
  };

  const dueToday = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return Object.entries(quizProgress).filter(([, v]) => v?.nextDue && v.nextDue <= today).length;
  }, [quizProgress]);

  const allQ = useMemo(() => {
    const pool = source==="pipeline"
      ? PIPELINE.flatMap(s => s.questions)
      : source==="domains"
      ? DOMAINS.flatMap(d => d.questions)
      : [...PIPELINE.flatMap(s => s.questions), ...DOMAINS.flatMap(d => d.questions)];
    return pool
      .filter(q => levelFilter==="All" || q.level===levelFilter)
      .filter(q => {
        if (domainFilter==="All") return true;
        const dom = DOMAINS.find(d => d.id===domainFilter);
        return dom?.questions.some(dq => dq.id===q.id);
      });
  }, [source, levelFilter, domainFilter]);

  const start = () => {
    setQuestions([...allQ].sort(() => Math.random()-0.5).slice(0,20));
    setRevealed({});
    setStarted(true);
  };
  const reveal = id => setRevealed(r => ({...r, [id]:true}));
  const revealAll = () => { const a={}; questions.forEach(q => a[q.id]=true); setRevealed(a); };
  const score = Object.keys(revealed).length;

  if (!started) return (
    <div style={{ maxWidth:960, margin:"0 auto", padding:"32px 24px" }}>
      <SectionHeader icon="🎯" title="Exam Mode" subtitle="Answers are hidden — reveal them one at a time as you work through each question" />

      {dueToday > 0 && (
        <div style={{ background:"#F59E0B18", border:"1px solid #F59E0B44", borderRadius:10, padding:"10px 16px",
          marginBottom:16, display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ color:"#F59E0B", fontWeight:800 }}>🧠 {dueToday} SM-2 questions due today</span>
          <button onClick={() => setSrMode(true)}
            style={{ background:"#F59E0B", color:"#000", border:"none", borderRadius:6, padding:"4px 12px",
              cursor:"pointer", fontWeight:700, fontSize:12 }}>Enable Spaced Rep Mode</button>
        </div>
      )}

      <div style={{ background:"var(--bg-card)", borderRadius:14, border:"1px solid var(--border)", padding:28, marginBottom:24 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h3 style={{ color:"var(--text-h)", margin:0, fontSize:16, fontWeight:800 }}>Configure Your Exam</h3>
          <button onClick={() => setSrMode(m => !m)}
            style={{ background: srMode ? "#F59E0B" : "var(--bg-surface)", color: srMode ? "#000" : "var(--text-sec)",
              border:`1px solid ${srMode ? "#F59E0B" : "var(--border)"}`, borderRadius:8, padding:"6px 14px",
              cursor:"pointer", fontWeight:700, fontSize:12, transition:"all 0.18s" }}>
            🧠 Spaced Rep {srMode ? "ON" : "OFF"}
          </button>
        </div>

        <div style={{ marginBottom:18 }}>
          <label style={{ color:"var(--text-sec)", fontSize:12, fontWeight:700, display:"block", marginBottom:8, letterSpacing:"0.05em" }}>QUESTION SOURCE</label>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {["pipeline","domains","all"].map(s => (
              <button key={s} onClick={() => setSource(s)}
                style={{ background: source===s ? "var(--accent)" : "var(--bg-surface)",
                  color: source===s ? "#fff" : "var(--text-sec)",
                  border:`1px solid ${source===s ? "var(--accent)" : "var(--border)"}`,
                  borderRadius:8, padding:"8px 16px", cursor:"pointer", fontWeight:600, fontSize:13,
                  textTransform:"capitalize", transition:"all 0.18s" }}>
                {s==="all" ? "All Questions" : s==="pipeline" ? "Pipeline Only" : "Domain Q-Bank"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:18 }}>
          <label style={{ color:"var(--text-sec)", fontSize:12, fontWeight:700, display:"block", marginBottom:8, letterSpacing:"0.05em" }}>DIFFICULTY</label>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {["All","Foundational","Intermediate","Advanced","Expert"].map(l => (
              <FilterBtn key={l} label={l} active={levelFilter===l}
                color={l==="All" ? null : LC[l]} onClick={() => setLevelFilter(l)} />
            ))}
          </div>
        </div>

        <div style={{ marginBottom:24 }}>
          <label style={{ color:"var(--text-sec)", fontSize:12, fontWeight:700, display:"block", marginBottom:8, letterSpacing:"0.05em" }}>DOMAIN FILTER</label>
          <select value={domainFilter} onChange={e => setDomainFilter(e.target.value)}
            style={{ background:"var(--select-bg)", border:"1px solid var(--border)", borderRadius:8, padding:"9px 12px",
              color:"var(--text-body)", fontSize:13 }}>
            <option value="All">All Domains</option>
            {DOMAINS.map(d => <option key={d.id} value={d.id}>{d.icon} {d.label}</option>)}
          </select>
        </div>

        <div style={{ color:"var(--text-muted)", fontSize:13, marginBottom:20 }}>
          <strong style={{ color:"var(--text-body)" }}>{allQ.length}</strong> questions available — exam draws up to 20 randomly
        </div>

        <button onClick={start} disabled={allQ.length===0}
          style={{ background:"var(--accent)", color:"white", border:"none", borderRadius:10,
            padding:"12px 32px", cursor: allQ.length===0 ? "not-allowed" : "pointer",
            fontWeight:800, fontSize:16, opacity: allQ.length===0 ? 0.5 : 1,
            transition:"transform 0.15s, opacity 0.2s" }}
          onMouseEnter={e => { if(allQ.length>0) e.currentTarget.style.transform="scale(1.03)"; }}
          onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
          Start Exam →
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"28px 24px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22, flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ color:"var(--text-h)", margin:0, fontSize:24, fontWeight:900 }}>🎯 Exam Mode</h2>
          <p style={{ color:"var(--text-sec)", margin:"4px 0 0", fontSize:13 }}>{score} of {questions.length} revealed</p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={revealAll}
            style={{ background:"var(--bg-card)", color:"var(--text-body)", border:"1px solid var(--border)",
              borderRadius:8, padding:"8px 16px", cursor:"pointer", fontSize:13, fontWeight:600 }}>
            Reveal All
          </button>
          <button onClick={() => setStarted(false)}
            style={{ background:"var(--accent)", color:"white", border:"none",
              borderRadius:8, padding:"8px 18px", cursor:"pointer", fontWeight:700, fontSize:13 }}>
            New Exam
          </button>
        </div>
      </div>

      <div style={{ marginBottom:22 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <span style={{ color:"var(--text-muted)", fontSize:12, fontWeight:600 }}>
            Progress: <strong style={{ color:"var(--text-h)" }}>{score}</strong> / {questions.length} revealed
          </span>
          <span style={{ background:`${score===questions.length?"#34D39922":"var(--bg-surface)"}`, color:score===questions.length?"#34D399":"var(--accent-light)",
            borderRadius:8, padding:"3px 10px", fontSize:11, fontWeight:800 }}>
            {score===questions.length ? "✓ Complete" : `${Math.round(score/questions.length*100)}%`}
          </span>
        </div>
        <div style={{ background:"var(--bg-surface)", borderRadius:4, height:7, overflow:"hidden" }}>
          <div className="progress-bar" style={{ background:"linear-gradient(90deg, var(--accent), #22D3EE)", borderRadius:4, height:7,
            width:`${score/questions.length*100}%` }} />
        </div>
      </div>

      {questions.map((q, i) => (
        <div key={q.id}
          style={{ background:"var(--bg-card)", borderRadius:12, padding:22, marginBottom:16,
            border:`1px solid ${LC[q.level]}22`, borderLeft:`3px solid ${LC[q.level]}`,
            animation:`fadeUp 0.3s ease ${Math.min(i*0.03,0.3)}s both` }}>
          <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:12 }}>
            <span style={{ color:"var(--text-faint)", fontSize:12, fontWeight:800, background:"var(--bg-surface)",
              borderRadius:6, padding:"2px 8px" }}>Q{i+1}</span>
            <Badge level={q.level} />
          </div>
          <p style={{ color:"var(--text-body)", margin:"0 0 16px", fontWeight:600, lineHeight:1.65, fontSize:15 }}>{q.q}</p>

          {!revealed[q.id] ? (
            <button onClick={() => reveal(q.id)}
              style={{ background:"var(--bg-surface)", color:"var(--accent-light)",
                border:"1px solid var(--accent)", borderRadius:8, padding:"8px 20px",
                cursor:"pointer", fontWeight:700, fontSize:13, transition:"all 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.background="var(--accent)"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background="var(--bg-surface)"; e.currentTarget.style.color="var(--accent-light)"; }}>
              👁 Reveal Answer
            </button>
          ) : (
            <div style={{ borderTop:"1px solid var(--border)", paddingTop:16, animation:"slideDown 0.2s ease" }}>
              <InfoBox color="#22D3EE" label="WHY IT MATTERS" text={q.why} />
              <InfoBox color="#34D399" label="HOW TO FIND THE ANSWER" text={q.how} />
              <p style={{ color:"var(--text-faint)", fontSize:11, margin:0, fontStyle:"italic" }}>📎 {q.ref}</p>
              {srMode && (
                <div style={{ marginTop:14, padding:"12px", background:"var(--bg-surface)", borderRadius:8 }}>
                  <div style={{ color:"var(--text-faint)", fontSize:11, fontWeight:700, marginBottom:8 }}>
                    🧠 HOW WELL DID YOU KNOW THIS? {srRated[q.id] !== undefined && <span style={{ color:"#34D399" }}>✓ Rated</span>}
                  </div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {[{q:0,label:"Again",c:"#F87171"},{q:1,label:"Hard",c:"#F59E0B"},{q:3,label:"Good",c:"#34D399"},{q:5,label:"Easy",c:"#22D3EE"}].map(r => (
                      <button key={r.q} onClick={() => rateSR(q.id, r.q)}
                        style={{ background: srRated[q.id]===r.q ? r.c : "transparent",
                          color: srRated[q.id]===r.q ? "#fff" : r.c,
                          border:`1px solid ${r.c}`, borderRadius:6, padding:"5px 14px",
                          cursor:"pointer", fontWeight:700, fontSize:12, transition:"all 0.15s" }}>
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
