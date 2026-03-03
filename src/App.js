import { useState, useMemo } from "react";
import { PIPELINE, DOMAINS, GLOSSARY } from "./cmc-data";

const LC = { Foundational:"#22D3EE", Intermediate:"#34D399", Advanced:"#F59E0B", Expert:"#F472B6" };

// ── util ──────────────────────────────────────────────────────
const Badge = ({ level }) => (
  <span style={{ background: LC[level]+"22", color: LC[level], border:`1px solid ${LC[level]}44`,
    padding:"2px 8px", borderRadius:12, fontSize:11, fontWeight:700, whiteSpace:"nowrap" }}>
    {level}
  </span>
);

// ══════════════════════════════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════════════════════════════
function Dashboard({ setView }) {
  const allQ = PIPELINE.flatMap(s => s.questions);
  const domainQ = DOMAINS.flatMap(d => d.questions);
  const counts = l => allQ.filter(q => q.level===l).length;
  const dcounts = l => domainQ.filter(q => q.level===l).length;

  const stats = [
    { label:"Pipeline Stages", value:PIPELINE.length, icon:"🗺️", color:"#C084FC" },
    { label:"Pipeline Questions", value:allQ.length, icon:"❓", color:"#38BDF8" },
    { label:"Domain Questions", value:domainQ.length, icon:"📚", color:"#34D399" },
    { label:"Glossary Terms", value:GLOSSARY.length, icon:"📖", color:"#FB923C" },
  ];

  const random = () => {
    const all = [...allQ, ...domainQ];
    return all[Math.floor(Math.random()*all.length)];
  };
  const [randQ, setRandQ] = useState(null);

  return (
    <div style={{ maxWidth:900, margin:"0 auto", padding:"32px 16px" }}>
      <div style={{ textAlign:"center", marginBottom:40 }}>
        <div style={{ fontSize:48, marginBottom:8 }}>🧬</div>
        <h1 style={{ fontSize:32, fontWeight:900, color:"#F1F5F9", margin:0 }}>CMC Master App</h1>
        <p style={{ color:"#94A3B8", marginTop:8, fontSize:16 }}>Your complete CMC career development toolkit</p>
      </div>

      {/* stat cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:16, marginBottom:32 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background:"#1E293B", border:"1px solid #334155", borderRadius:12, padding:"20px 16px", textAlign:"center" }}>
            <div style={{ fontSize:28 }}>{s.icon}</div>
            <div style={{ fontSize:32, fontWeight:900, color:s.color }}>{s.value}</div>
            <div style={{ color:"#94A3B8", fontSize:13, marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* level breakdown */}
      <div style={{ background:"#1E293B", border:"1px solid #334155", borderRadius:12, padding:20, marginBottom:24 }}>
        <h3 style={{ color:"#F1F5F9", margin:"0 0 16px" }}>📊 Domain Q-Bank by Difficulty</h3>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
          {["Foundational","Intermediate","Advanced","Expert"].map(l => (
            <div key={l} style={{ textAlign:"center", background:"#0F172A", borderRadius:8, padding:12,
              border:`1px solid ${LC[l]}44` }}>
              <div style={{ fontSize:24, fontWeight:900, color:LC[l] }}>{dcounts(l)}</div>
              <div style={{ color:"#94A3B8", fontSize:12, marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* navigation */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16, marginBottom:24 }}>
        {[
          { view:"pipeline", icon:"🗺️", label:"Pipeline Explorer", desc:"16-stage biologic development lifecycle", color:"#C084FC" },
          { view:"domains", icon:"📚", label:"Domain Q-Bank", desc:"100 questions across 10 domains", color:"#34D399" },
          { view:"exam", icon:"🎯", label:"Exam Mode", desc:"Test yourself — answers hidden until revealed", color:"#F472B6" },
          { view:"glossary", icon:"📖", label:"CMC Glossary", desc:"50 essential terms and definitions", color:"#FB923C" },
        ].map(n => (
          <button key={n.view} onClick={() => setView(n.view)}
            style={{ background:"#1E293B", border:`1px solid ${n.color}44`, borderRadius:12, padding:20,
              cursor:"pointer", textAlign:"left", transition:"all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor=n.color}
            onMouseLeave={e => e.currentTarget.style.borderColor=n.color+"44"}>
            <div style={{ fontSize:28, marginBottom:8 }}>{n.icon}</div>
            <div style={{ color:"#F1F5F9", fontWeight:700, fontSize:15, marginBottom:4 }}>{n.label}</div>
            <div style={{ color:"#64748B", fontSize:13 }}>{n.desc}</div>
          </button>
        ))}
      </div>

      {/* random question */}
      <div style={{ background:"#1E293B", border:"1px solid #334155", borderRadius:12, padding:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: randQ ? 16 : 0 }}>
          <h3 style={{ color:"#F1F5F9", margin:0 }}>🎲 Random Question</h3>
          <button onClick={() => setRandQ(random())}
            style={{ background:"#7C3AED", color:"white", border:"none", borderRadius:8, padding:"8px 16px",
              cursor:"pointer", fontWeight:700 }}>
            Random
          </button>
        </div>
        {randQ && (
          <div style={{ background:"#0F172A", borderRadius:8, padding:16, borderLeft:`3px solid ${LC[randQ.level]}` }}>
            <Badge level={randQ.level} />
            <p style={{ color:"#E2E8F0", margin:"12px 0 8px", fontWeight:600 }}>{randQ.q}</p>
            <details style={{ marginTop:8 }}>
              <summary style={{ color:"#7C3AED", cursor:"pointer", fontSize:13 }}>Show hint & rationale</summary>
              <div style={{ marginTop:10, borderTop:"1px solid #1E293B", paddingTop:10 }}>
                <p style={{ color:"#22D3EE", fontSize:13, margin:"0 0 6px" }}>💡 {randQ.why}</p>
                <p style={{ color:"#94A3B8", fontSize:13, margin:"0 0 6px" }}>📋 {randQ.how}</p>
                <p style={{ color:"#475569", fontSize:12, margin:0, fontStyle:"italic" }}>📎 {randQ.ref}</p>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PIPELINE
// ══════════════════════════════════════════════════════════════
function PipelineView() {
  const [active, setActive] = useState(null);
  const [tab, setTab] = useState("topics");
  const [levelFilter, setLevelFilter] = useState("All");

  const stage = active ? PIPELINE.find(s => s.id === active) : null;
  const filteredQ = stage?.questions.filter(q => levelFilter==="All" || q.level===levelFilter) || [];

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"24px 16px" }}>
      <h2 style={{ color:"#F1F5F9", marginBottom:24 }}>🗺️ Pipeline Explorer — 16 Stages</h2>

      {/* stage grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))", gap:10, marginBottom:32 }}>
        {PIPELINE.map(s => (
          <button key={s.id} onClick={() => { setActive(s.id===active?null:s.id); setTab("topics"); setLevelFilter("All"); }}
            style={{ background: s.id===active ? s.accent+"33" : "#1E293B",
              border:`1.5px solid ${s.id===active ? s.accent : "#334155"}`,
              borderRadius:10, padding:"12px 8px", cursor:"pointer", textAlign:"center",
              transition:"all 0.2s" }}>
            <div style={{ fontSize:22 }}>{s.icon}</div>
            <div style={{ color:"#F1F5F9", fontSize:11, fontWeight:700, marginTop:4, lineHeight:1.3 }}>{s.label}</div>
            <div style={{ color:"#64748B", fontSize:10, marginTop:2 }}>{s.sub}</div>
          </button>
        ))}
      </div>

      {/* stage detail */}
      {stage && (
        <div style={{ background:"#1E293B", borderRadius:12, border:`1px solid ${stage.accent}44`, padding:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
            <span style={{ fontSize:32 }}>{stage.icon}</span>
            <div>
              <h3 style={{ color:"#F1F5F9", margin:0, fontSize:20 }}>Stage {stage.stage}: {stage.label}</h3>
              <p style={{ color:"#64748B", margin:0, fontSize:13 }}>{stage.sub}</p>
            </div>
          </div>

          {/* tabs */}
          <div style={{ display:"flex", gap:8, marginBottom:20 }}>
            {["topics","questions"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ background: tab===t ? stage.accent : "#0F172A",
                  color: tab===t ? "#000" : "#94A3B8",
                  border:"none", borderRadius:8, padding:"8px 18px",
                  cursor:"pointer", fontWeight:700, fontSize:13, textTransform:"capitalize" }}>
                {t} ({t==="topics" ? stage.topics.length : stage.questions.length})
              </button>
            ))}
          </div>

          {tab==="topics" && stage.topics.map(tp => (
            <details key={tp.id} style={{ background:"#0F172A", borderRadius:8, padding:16, marginBottom:10,
              border:"1px solid #334155" }}>
              <summary style={{ color:"#E2E8F0", fontWeight:700, cursor:"pointer", fontSize:15 }}>
                📘 {tp.title}
              </summary>
              <div style={{ marginTop:12, borderTop:"1px solid #1E293B", paddingTop:12 }}>
                <p style={{ color:"#CBD5E1", margin:"0 0 12px", lineHeight:1.7 }}>{tp.body}</p>
                <div style={{ background:"#1E293B", borderRadius:6, padding:12, marginBottom:8 }}>
                  <strong style={{ color:"#22D3EE", fontSize:12 }}>WHY THIS MATTERS</strong>
                  <p style={{ color:"#94A3B8", margin:"6px 0 0", fontSize:13 }}>{tp.why}</p>
                </div>
                <div style={{ background:"#1E293B", borderRadius:6, padding:12, marginBottom:8 }}>
                  <strong style={{ color:"#34D399", fontSize:12 }}>HOW TO STUDY</strong>
                  <p style={{ color:"#94A3B8", margin:"6px 0 0", fontSize:13 }}>{tp.how}</p>
                </div>
                <p style={{ color:"#475569", fontSize:12, margin:0, fontStyle:"italic" }}>📎 {tp.ref}</p>
              </div>
            </details>
          ))}

          {tab==="questions" && (
            <>
              <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
                {["All","Foundational","Intermediate","Advanced","Expert"].map(l => (
                  <button key={l} onClick={() => setLevelFilter(l)}
                    style={{ background: levelFilter===l ? (l==="All"?"#7C3AED":LC[l]) : "#0F172A",
                      color: levelFilter===l ? (l==="All"?"#fff":"#000") : "#94A3B8",
                      border:`1px solid ${l==="All"?"#7C3AED":LC[l]+"66"}`,
                      borderRadius:20, padding:"4px 12px", cursor:"pointer", fontSize:12, fontWeight:600 }}>
                    {l}
                  </button>
                ))}
              </div>
              {filteredQ.map(q => (
                <details key={q.id} style={{ background:"#0F172A", borderRadius:8, padding:16, marginBottom:10,
                  border:`1px solid ${LC[q.level]}33`, borderLeft:`3px solid ${LC[q.level]}` }}>
                  <summary style={{ color:"#E2E8F0", cursor:"pointer", listStyle:"none", display:"flex", gap:10, alignItems:"flex-start" }}>
                    <Badge level={q.level} />
                    <span style={{ fontWeight:600, fontSize:14, lineHeight:1.5 }}>{q.q}</span>
                  </summary>
                  <div style={{ marginTop:12, borderTop:"1px solid #1E293B", paddingTop:12 }}>
                    <div style={{ background:"#1E293B", borderRadius:6, padding:10, marginBottom:8 }}>
                      <strong style={{ color:"#22D3EE", fontSize:11 }}>WHY IT MATTERS</strong>
                      <p style={{ color:"#94A3B8", margin:"6px 0 0", fontSize:13 }}>{q.why}</p>
                    </div>
                    <div style={{ background:"#1E293B", borderRadius:6, padding:10, marginBottom:8 }}>
                      <strong style={{ color:"#34D399", fontSize:11 }}>HOW TO FIND THE ANSWER</strong>
                      <p style={{ color:"#94A3B8", margin:"6px 0 0", fontSize:13 }}>{q.how}</p>
                    </div>
                    <p style={{ color:"#475569", fontSize:12, margin:0, fontStyle:"italic" }}>📎 {q.ref}</p>
                  </div>
                </details>
              ))}
              {filteredQ.length===0 && <p style={{ color:"#475569" }}>No questions at this level.</p>}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// DOMAIN Q-BANK
// ══════════════════════════════════════════════════════════════
function DomainsView() {
  const [activeDomain, setActiveDomain] = useState(null);
  const [levelFilter, setLevelFilter] = useState("All");
  const [search, setSearch] = useState("");

  const domain = activeDomain ? DOMAINS.find(d => d.id === activeDomain) : null;
  const filteredQ = domain?.questions.filter(q =>
    (levelFilter==="All" || q.level===levelFilter) &&
    (!search || q.q.toLowerCase().includes(search.toLowerCase()))
  ) || [];

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"24px 16px" }}>
      <h2 style={{ color:"#F1F5F9", marginBottom:24 }}>📚 Domain Question Bank — 10 Domains</h2>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:12, marginBottom:32 }}>
        {DOMAINS.map(d => (
          <button key={d.id} onClick={() => { setActiveDomain(d.id===activeDomain?null:d.id); setLevelFilter("All"); setSearch(""); }}
            style={{ background: d.id===activeDomain ? d.accent+"22" : "#1E293B",
              border:`1.5px solid ${d.id===activeDomain ? d.accent : "#334155"}`,
              borderRadius:10, padding:14, cursor:"pointer", textAlign:"left", transition:"all 0.2s" }}>
            <div style={{ fontSize:24 }}>{d.icon}</div>
            <div style={{ color:"#F1F5F9", fontSize:12, fontWeight:700, marginTop:6, lineHeight:1.4 }}>{d.label}</div>
            <div style={{ color:d.accent, fontSize:11, marginTop:4 }}>{d.questions.length} questions</div>
            <div style={{ color:"#475569", fontSize:10, marginTop:2 }}>{d.desc}</div>
          </button>
        ))}
      </div>

      {domain && (
        <div style={{ background:"#1E293B", borderRadius:12, border:`1px solid ${domain.accent}44`, padding:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
            <span style={{ fontSize:32 }}>{domain.icon}</span>
            <div>
              <h3 style={{ color:"#F1F5F9", margin:0 }}>{domain.label}</h3>
              <p style={{ color:"#64748B", margin:0, fontSize:13 }}>{domain.desc}</p>
            </div>
          </div>

          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16, alignItems:"center" }}>
            {["All","Foundational","Intermediate","Advanced","Expert"].map(l => (
              <button key={l} onClick={() => setLevelFilter(l)}
                style={{ background: levelFilter===l ? (l==="All"?"#7C3AED":LC[l]) : "#0F172A",
                  color: levelFilter===l ? (l==="All"?"#fff":"#000") : "#94A3B8",
                  border:`1px solid ${l==="All"?"#7C3AED":LC[l]+"66"}`,
                  borderRadius:20, padding:"4px 12px", cursor:"pointer", fontSize:12, fontWeight:600 }}>
                {l}
              </button>
            ))}
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search questions..." 
              style={{ flex:1, minWidth:160, background:"#0F172A", border:"1px solid #334155",
                borderRadius:8, padding:"6px 12px", color:"#E2E8F0", fontSize:13, outline:"none" }} />
          </div>

          {filteredQ.map(q => (
            <details key={q.id} style={{ background:"#0F172A", borderRadius:8, padding:16, marginBottom:10,
              border:`1px solid ${LC[q.level]}33`, borderLeft:`3px solid ${LC[q.level]}` }}>
              <summary style={{ color:"#E2E8F0", cursor:"pointer", listStyle:"none", display:"flex", gap:10, alignItems:"flex-start" }}>
                <Badge level={q.level} />
                <span style={{ fontWeight:600, fontSize:14, lineHeight:1.5 }}>{q.q}</span>
              </summary>
              <div style={{ marginTop:12, borderTop:"1px solid #1E293B", paddingTop:12 }}>
                <div style={{ background:"#1E293B", borderRadius:6, padding:10, marginBottom:8 }}>
                  <strong style={{ color:"#22D3EE", fontSize:11 }}>WHY IT MATTERS</strong>
                  <p style={{ color:"#94A3B8", margin:"6px 0 0", fontSize:13 }}>{q.why}</p>
                </div>
                <div style={{ background:"#1E293B", borderRadius:6, padding:10, marginBottom:8 }}>
                  <strong style={{ color:"#34D399", fontSize:11 }}>HOW TO FIND THE ANSWER</strong>
                  <p style={{ color:"#94A3B8", margin:"6px 0 0", fontSize:13 }}>{q.how}</p>
                </div>
                <p style={{ color:"#475569", fontSize:12, margin:0, fontStyle:"italic" }}>📎 {q.ref}</p>
              </div>
            </details>
          ))}
          {filteredQ.length===0 && <p style={{ color:"#475569" }}>No questions matching filters.</p>}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// EXAM MODE
// ══════════════════════════════════════════════════════════════
function ExamView() {
  const [source, setSource] = useState("domains");
  const [levelFilter, setLevelFilter] = useState("All");
  const [domainFilter, setDomainFilter] = useState("All");
  const [questions, setQuestions] = useState([]);
  const [revealed, setRevealed] = useState({});
  const [started, setStarted] = useState(false);

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
    const shuffled = [...allQ].sort(() => Math.random()-0.5).slice(0, 20);
    setQuestions(shuffled);
    setRevealed({});
    setStarted(true);
  };

  const reveal = id => setRevealed(r => ({...r, [id]:true}));
  const revealAll = () => {
    const all = {};
    questions.forEach(q => all[q.id]=true);
    setRevealed(all);
  };

  const score = Object.keys(revealed).length;

  if (!started) return (
    <div style={{ maxWidth:700, margin:"0 auto", padding:"32px 16px" }}>
      <h2 style={{ color:"#F1F5F9", marginBottom:8 }}>🎯 Exam Mode</h2>
      <p style={{ color:"#94A3B8", marginBottom:32 }}>Answers are hidden. Click to reveal after you've thought through your response.</p>

      <div style={{ background:"#1E293B", borderRadius:12, border:"1px solid #334155", padding:24, marginBottom:24 }}>
        <h3 style={{ color:"#F1F5F9", margin:"0 0 16px" }}>Configure Your Exam</h3>

        <div style={{ marginBottom:16 }}>
          <label style={{ color:"#94A3B8", fontSize:13, display:"block", marginBottom:8 }}>Question Source</label>
          <div style={{ display:"flex", gap:8 }}>
            {["pipeline","domains","all"].map(s => (
              <button key={s} onClick={() => setSource(s)}
                style={{ background: source===s ? "#7C3AED" : "#0F172A", color: source===s ? "#fff" : "#94A3B8",
                  border:`1px solid ${source===s?"#7C3AED":"#334155"}`,
                  borderRadius:8, padding:"8px 16px", cursor:"pointer", fontWeight:600, fontSize:13,
                  textTransform:"capitalize" }}>
                {s==="all" ? "All Questions" : s==="pipeline" ? "Pipeline Only" : "Domain Q-Bank"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:16 }}>
          <label style={{ color:"#94A3B8", fontSize:13, display:"block", marginBottom:8 }}>Difficulty Level</label>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {["All","Foundational","Intermediate","Advanced","Expert"].map(l => (
              <button key={l} onClick={() => setLevelFilter(l)}
                style={{ background: levelFilter===l ? (l==="All"?"#7C3AED":LC[l]) : "#0F172A",
                  color: levelFilter===l ? (l==="All"?"#fff":"#000") : "#94A3B8",
                  border:`1px solid ${l==="All"?"#7C3AED44":LC[l]+"44"}`,
                  borderRadius:20, padding:"6px 14px", cursor:"pointer", fontSize:13, fontWeight:600 }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:24 }}>
          <label style={{ color:"#94A3B8", fontSize:13, display:"block", marginBottom:8 }}>Domain (Domain Q-Bank only)</label>
          <select value={domainFilter} onChange={e => setDomainFilter(e.target.value)}
            style={{ background:"#0F172A", border:"1px solid #334155", borderRadius:8, padding:"8px 12px",
              color:"#E2E8F0", fontSize:13, outline:"none" }}>
            <option value="All">All Domains</option>
            {DOMAINS.map(d => <option key={d.id} value={d.id}>{d.icon} {d.label}</option>)}
          </select>
        </div>

        <div style={{ color:"#64748B", fontSize:13, marginBottom:20 }}>
          {allQ.length} questions available → exam draws up to 20 randomly
        </div>

        <button onClick={start} disabled={allQ.length===0}
          style={{ background:"#7C3AED", color:"white", border:"none", borderRadius:10,
            padding:"12px 32px", cursor:"pointer", fontWeight:800, fontSize:16 }}>
          Start Exam →
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth:800, margin:"0 auto", padding:"24px 16px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ color:"#F1F5F9", margin:0 }}>🎯 Exam Mode</h2>
          <p style={{ color:"#64748B", margin:"4px 0 0", fontSize:13 }}>{score}/{questions.length} revealed</p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={revealAll} style={{ background:"#334155", color:"#E2E8F0", border:"none",
            borderRadius:8, padding:"8px 16px", cursor:"pointer", fontSize:13 }}>Reveal All</button>
          <button onClick={() => { setStarted(false); }}
            style={{ background:"#7C3AED", color:"white", border:"none",
              borderRadius:8, padding:"8px 16px", cursor:"pointer", fontWeight:700, fontSize:13 }}>
            New Exam
          </button>
        </div>
      </div>

      {/* progress bar */}
      <div style={{ background:"#1E293B", borderRadius:4, height:6, marginBottom:24 }}>
        <div style={{ background:"#7C3AED", borderRadius:4, height:6,
          width:`${(score/questions.length)*100}%`, transition:"width 0.3s" }} />
      </div>

      {questions.map((q, i) => (
        <div key={q.id} style={{ background:"#1E293B", borderRadius:10, padding:20, marginBottom:16,
          border:`1px solid ${LC[q.level]}33`, borderLeft:`3px solid ${LC[q.level]}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <span style={{ color:"#475569", fontSize:13, fontWeight:700 }}>Q{i+1}</span>
              <Badge level={q.level} />
            </div>
          </div>
          <p style={{ color:"#E2E8F0", margin:"0 0 16px", fontWeight:600, lineHeight:1.6, fontSize:15 }}>{q.q}</p>

          {!revealed[q.id] ? (
            <button onClick={() => reveal(q.id)}
              style={{ background:"#0F172A", color:"#7C3AED", border:"1px solid #7C3AED44",
                borderRadius:8, padding:"8px 20px", cursor:"pointer", fontWeight:700, fontSize:13 }}>
              👁 Reveal Answer
            </button>
          ) : (
            <div style={{ borderTop:"1px solid #334155", paddingTop:14 }}>
              <div style={{ background:"#0F172A", borderRadius:6, padding:12, marginBottom:10 }}>
                <strong style={{ color:"#22D3EE", fontSize:11 }}>WHY IT MATTERS</strong>
                <p style={{ color:"#94A3B8", margin:"6px 0 0", fontSize:13, lineHeight:1.6 }}>{q.why}</p>
              </div>
              <div style={{ background:"#0F172A", borderRadius:6, padding:12, marginBottom:10 }}>
                <strong style={{ color:"#34D399", fontSize:11 }}>HOW TO FIND THE ANSWER</strong>
                <p style={{ color:"#94A3B8", margin:"6px 0 0", fontSize:13, lineHeight:1.6 }}>{q.how}</p>
              </div>
              <p style={{ color:"#475569", fontSize:12, margin:0, fontStyle:"italic" }}>📎 {q.ref}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// GLOSSARY
// ══════════════════════════════════════════════════════════════
function GlossaryView() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  const cats = ["All", ...new Set(GLOSSARY.map(g => g.cat))];
  const catColors = {
    Regulatory:"#F59E0B", QbD:"#34D399", "Cell Science":"#22D3EE",
    Manufacturing:"#A78BFA", Analytical:"#F472B6", Quality:"#FB923C",
    Validation:"#38BDF8", "Novel Modalities":"#C084FC"
  };

  const filtered = GLOSSARY.filter(g =>
    (catFilter==="All" || g.cat===catFilter) &&
    (!search || g.term.toLowerCase().includes(search.toLowerCase()) ||
      g.def.toLowerCase().includes(search.toLowerCase()))
  ).sort((a,b) => a.term.localeCompare(b.term));

  return (
    <div style={{ maxWidth:900, margin:"0 auto", padding:"24px 16px" }}>
      <h2 style={{ color:"#F1F5F9", marginBottom:8 }}>📖 CMC Glossary</h2>
      <p style={{ color:"#94A3B8", marginBottom:24 }}>{GLOSSARY.length} essential terms and definitions</p>

      <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap", alignItems:"center" }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search terms..."
          style={{ flex:1, minWidth:200, background:"#1E293B", border:"1px solid #334155",
            borderRadius:8, padding:"10px 14px", color:"#E2E8F0", fontSize:14, outline:"none" }} />
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
          style={{ background:"#1E293B", border:"1px solid #334155", borderRadius:8, padding:"10px 14px",
            color:"#E2E8F0", fontSize:14, outline:"none" }}>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div style={{ display:"grid", gap:12 }}>
        {filtered.map(g => (
          <div key={g.term} style={{ background:"#1E293B", borderRadius:10, padding:16,
            border:`1px solid ${catColors[g.cat]||"#334155"}33`,
            borderLeft:`3px solid ${catColors[g.cat]||"#475569"}` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              <span style={{ color:"#F1F5F9", fontWeight:800, fontSize:16 }}>{g.term}</span>
              <span style={{ background:(catColors[g.cat]||"#475569")+"22",
                color: catColors[g.cat]||"#94A3B8",
                border:`1px solid ${catColors[g.cat]||"#475569"}44`,
                padding:"2px 10px", borderRadius:12, fontSize:11, fontWeight:700 }}>
                {g.cat}
              </span>
            </div>
            <p style={{ color:"#CBD5E1", margin:0, fontSize:14, lineHeight:1.7 }}>{g.def}</p>
          </div>
        ))}
        {filtered.length===0 && <p style={{ color:"#475569" }}>No terms matching search.</p>}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════════════
export default function App() {
  const [view, setView] = useState("dashboard");

  const NAV = [
    { id:"dashboard", icon:"🏠", label:"Home" },
    { id:"pipeline", icon:"🗺️", label:"Pipeline" },
    { id:"domains", icon:"📚", label:"Domain Q-Bank" },
    { id:"exam", icon:"🎯", label:"Exam Mode" },
    { id:"glossary", icon:"📖", label:"Glossary" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#0F172A", fontFamily:"system-ui,sans-serif", color:"#E2E8F0" }}>
      {/* top nav */}
      <nav style={{ background:"#1E293B", borderBottom:"1px solid #334155", padding:"0 20px",
        display:"flex", alignItems:"center", gap:4, position:"sticky", top:0, zIndex:100,
        overflowX:"auto" }}>
        <div style={{ color:"#C084FC", fontWeight:900, fontSize:15, marginRight:12, whiteSpace:"nowrap" }}>
          🧬 CMC Master
        </div>
        {NAV.map(n => (
          <button key={n.id} onClick={() => setView(n.id)}
            style={{ background: view===n.id ? "#334155" : "transparent",
              color: view===n.id ? "#F1F5F9" : "#64748B",
              border:"none", borderRadius:8, padding:"10px 14px", cursor:"pointer",
              fontWeight:600, fontSize:13, whiteSpace:"nowrap", transition:"all 0.15s" }}>
            {n.icon} {n.label}
          </button>
        ))}
      </nav>

      {/* content */}
      <main>
        {view==="dashboard" && <Dashboard setView={setView} />}
        {view==="pipeline" && <PipelineView />}
        {view==="domains" && <DomainsView />}
        {view==="exam" && <ExamView />}
        {view==="glossary" && <GlossaryView />}
      </main>
    </div>
  );
}
