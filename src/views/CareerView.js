import { useState } from "react";
import { SectionHeader, InfoBox, FilterBtn, LC } from "../shared";
import { CAREER_PATHS, INTERVIEW_QUESTIONS, SKILLS_MATRIX } from "../career-data";
import { ANALYTICAL_METHODS } from "../extra-data";

export default function CareerView({ navigate }) {
  const [activeLevel, setActiveLevel] = useState("sci1");
  const [levelTab, setLevelTab] = useState("overview");
  const [catFilter, setCatFilter] = useState("All");
  const [lvlFilter, setLvlFilter] = useState("All");
  const [openQ, setOpenQ] = useState(null);

  const cp = CAREER_PATHS.find(p => p.id === activeLevel) || CAREER_PATHS[1];
  const cats = ["All", ...new Set(INTERVIEW_QUESTIONS.map(q => q.category))];
  const lvls = ["All","Entry","Mid-Level","Senior","Director"];
  const filteredQ = INTERVIEW_QUESTIONS.filter(q =>
    (catFilter === "All" || q.category === catFilter) &&
    (lvlFilter === "All" || q.level === lvlFilter)
  );

  return (
    <div style={{ maxWidth:1400, margin:"0 auto", padding:"28px 24px" }}>
      <SectionHeader icon="🚀" title="Career & Interviews"
        subtitle="CMC career ladder, salary benchmarks, skills matrix, and 18 expert interview Q&As with model answers" />

      <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:20, marginBottom:24 }}>
        <h3 style={{ color:"var(--text-h)", margin:"0 0 16px", fontSize:15, fontWeight:800 }}>📈 CMC Career Progression Ladder</h3>
        <div style={{ display:"flex", alignItems:"center", gap:4, overflowX:"auto", paddingBottom:8 }}>
          {CAREER_PATHS.map((p, i) => (
            <div key={p.id} style={{ display:"flex", alignItems:"center", flexShrink:0, gap:4 }}>
              <button onClick={() => { setActiveLevel(p.id); setLevelTab("overview"); }}
                className="stage-btn"
                style={{
                  background: activeLevel===p.id ? `${p.color}22` : "var(--bg-surface)",
                  border:`1.5px solid ${activeLevel===p.id ? p.color : "var(--border)"}`,
                  borderRadius:12, padding:"12px 14px", cursor:"pointer", textAlign:"center", minWidth:120,
                  boxShadow: activeLevel===p.id ? `0 0 16px ${p.color}33` : "none",
                }}>
                <div style={{ fontSize:22 }}>{p.icon}</div>
                <div style={{ color: activeLevel===p.id ? p.color : "var(--text-h)", fontSize:10, fontWeight:800, marginTop:4, lineHeight:1.3 }}>
                  {p.title.split(" / ")[0]}
                </div>
                <div style={{ color:"var(--text-muted)", fontSize:9, marginTop:2 }}>{p.years}</div>
              </button>
              {i < CAREER_PATHS.length-1 && <div style={{ color:"var(--text-faint)", fontSize:18 }}>›</div>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:28 }}>
        <div style={{ background:"var(--bg-card)", border:`2px solid ${cp.color}44`, borderRadius:14, padding:22, borderTop:`3px solid ${cp.color}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
            <span style={{ fontSize:36, background:`${cp.color}22`, borderRadius:12, width:56, height:56, display:"flex", alignItems:"center", justifyContent:"center" }}>{cp.icon}</span>
            <div>
              <h3 style={{ color:"var(--text-h)", margin:0, fontSize:16, fontWeight:900 }}>{cp.title}</h3>
              <div style={{ color:cp.color, fontSize:11, fontWeight:700, marginTop:2 }}>{cp.level} · {cp.years}</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, marginBottom:16 }}>
            {["overview","skills","salary"].map(t => (
              <button key={t} onClick={() => setLevelTab(t)}
                style={{ background: levelTab===t ? cp.color : "var(--bg-surface)", color: levelTab===t ? "#000" : "var(--text-sec)",
                  border:"none", borderRadius:8, padding:"6px 14px", cursor:"pointer", fontWeight:700, fontSize:11, textTransform:"capitalize", transition:"all 0.18s" }}>
                {t}
              </button>
            ))}
          </div>

          {levelTab==="overview" && (
            <>
              <InfoBox color={cp.color} label="DEGREE REQUIREMENT" text={cp.degree}/>
              <div style={{ background:"var(--bg-surface)", borderRadius:10, padding:"12px 14px", marginBottom:8 }}>
                <div style={{ color:"#34D399", fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.06em" }}>KEY RESPONSIBILITIES</div>
                <ul style={{ margin:0, paddingLeft:18, color:"var(--text-body)", fontSize:12, lineHeight:1.75 }}>
                  {cp.responsibilities.slice(0,5).map((r,i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
              <InfoBox color="#A78BFA" label="INTERVIEW TIP" text={cp.interviewTip}/>
            </>
          )}

          {levelTab==="skills" && (
            <>
              <div style={{ marginBottom:12 }}>
                <div style={{ color:"#22D3EE", fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.06em" }}>TECHNICAL SKILLS</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {cp.technicalSkills.map((s,i) => (
                    <span key={i} style={{ background:`${cp.color}18`, color:"var(--text-body)", border:`1px solid ${cp.color}33`,
                      borderRadius:20, padding:"3px 10px", fontSize:11 }}>{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ color:"#F59E0B", fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.06em" }}>SOFT SKILLS</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {cp.softSkills.map((s,i) => (
                    <span key={i} style={{ background:"#F59E0B18", color:"var(--text-body)", border:"1px solid #F59E0B33",
                      borderRadius:20, padding:"3px 10px", fontSize:11 }}>{s}</span>
                  ))}
                </div>
              </div>
            </>
          )}

          {levelTab==="salary" && (
            <div>
              <div style={{ color:"var(--text-muted)", fontSize:10, fontWeight:800, marginBottom:10, letterSpacing:"0.06em" }}>SALARY BENCHMARKS (USD, 2024)</div>
              {[
                { label:"🇺🇸 National Average", val:cp.salary.us },
                { label:"🌉 Bay Area / Boston Premium", val:cp.salary.bay },
                { label:"🏠 Remote / Mid-Market", val:cp.salary.remote },
              ].map(s => (
                <div key={s.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                  background:"var(--bg-surface)", borderRadius:8, padding:"10px 14px", marginBottom:8, border:"1px solid var(--border)" }}>
                  <span style={{ color:"var(--text-sec)", fontSize:12 }}>{s.label}</span>
                  <span style={{ color:cp.color, fontWeight:900, fontSize:14 }}>{s.val}</span>
                </div>
              ))}
              <div style={{ background:`${cp.color}11`, border:`1px solid ${cp.color}33`, borderRadius:10, padding:"10px 14px", marginTop:10 }}>
                <div style={{ color:cp.color, fontSize:10, fontWeight:800, marginBottom:6, letterSpacing:"0.06em" }}>TYPICAL COMPANIES</div>
                <ul style={{ margin:0, paddingLeft:16, color:"var(--text-body)", fontSize:12, lineHeight:1.7 }}>
                  {cp.companies.map((c,i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:22 }}>
          <h4 style={{ color:"var(--text-h)", margin:"0 0 14px", fontSize:14, fontWeight:800 }}>🎯 Skills Proficiency Matrix (0–5 scale)</h4>
          <div style={{ overflow:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11 }}>
              <thead>
                <tr style={{ borderBottom:"1px solid var(--border)" }}>
                  <th style={{ color:"var(--text-muted)", padding:"6px 8px", textAlign:"left", fontSize:9, fontWeight:800, letterSpacing:"0.05em" }}>SKILL</th>
                  {CAREER_PATHS.map(p => (
                    <th key={p.id} style={{ color: p.id===activeLevel ? p.color : "var(--text-muted)", padding:"6px 6px", textAlign:"center",
                      fontSize:9, fontWeight:800, letterSpacing:"0.04em", cursor:"pointer" }}
                      onClick={() => setActiveLevel(p.id)}>
                      {p.icon}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SKILLS_MATRIX.map((row, i) => (
                  <tr key={row.skill} style={{ borderBottom:"1px solid var(--border)", background: i%2===0?"transparent":"var(--bg-surface)" }}>
                    <td style={{ color:"var(--text-sec)", padding:"5px 8px", fontSize:10, lineHeight:1.3 }}>{row.skill}</td>
                    {CAREER_PATHS.map(p => {
                      const val = row[p.id] || 0;
                      return (
                        <td key={p.id} style={{ padding:"5px 6px", textAlign:"center" }}>
                          <div style={{ display:"flex", justifyContent:"center", gap:1 }}>
                            {[1,2,3,4,5].map(n => (
                              <div key={n} style={{ width:8, height:8, borderRadius:2,
                                background: n<=val ? (p.id===activeLevel ? p.color : "var(--text-faint)") : "var(--bg-surface)",
                                border:`1px solid ${n<=val ? (p.id===activeLevel ? p.color : "var(--border-bright)") : "var(--border)"}`,
                              }}/>
                            ))}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:24 }}>
        <h3 style={{ color:"var(--text-h)", margin:"0 0 16px", fontSize:15, fontWeight:800 }}>💬 Interview Q&A Bank ({INTERVIEW_QUESTIONS.length} expert questions with model answers)</h3>

        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:12 }}>
          <FilterBtn label="All Categories" active={catFilter==="All"} onClick={() => setCatFilter("All")}/>
          {cats.filter(c=>c!=="All").map(c => (
            <FilterBtn key={c} label={c} active={catFilter===c}
              color={INTERVIEW_QUESTIONS.find(q=>q.category===c)?.color || "var(--accent)"}
              onClick={() => setCatFilter(c)}/>
          ))}
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:18 }}>
          {lvls.map(l => (
            <FilterBtn key={l} label={l} active={lvlFilter===l}
              color={l==="All" ? null : LC[l] || "#A78BFA"}
              onClick={() => setLvlFilter(l)}/>
          ))}
        </div>

        <div style={{ display:"grid", gap:10 }}>
          {filteredQ.map(q => (
            <div key={q.id} style={{
              background:"var(--bg-surface)", borderRadius:12, border:`1px solid ${q.color}22`,
              borderLeft:`3px solid ${q.color}`, overflow:"hidden"
            }}>
              <button onClick={() => setOpenQ(openQ===q.id ? null : q.id)}
                style={{ width:"100%", background:"none", border:"none", padding:"14px 18px", cursor:"pointer", textAlign:"left",
                  display:"flex", gap:12, alignItems:"flex-start" }}>
                <span style={{ fontSize:18, flexShrink:0 }}>{q.icon}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", gap:8, marginBottom:6, flexWrap:"wrap" }}>
                    <span style={{ background:`${q.color}22`, color:q.color, borderRadius:12, padding:"1px 8px", fontSize:9, fontWeight:800 }}>{q.category}</span>
                    <span style={{ background:"var(--bg-card)", color:"var(--text-muted)", borderRadius:12, padding:"1px 8px", fontSize:9, fontWeight:700, border:"1px solid var(--border)" }}>{q.level}</span>
                  </div>
                  <p style={{ color:"var(--text-h)", margin:0, fontWeight:700, fontSize:14, lineHeight:1.5 }}>{q.question}</p>
                </div>
                <span style={{ color:"var(--text-faint)", fontSize:14, flexShrink:0, transition:"transform 0.2s",
                  transform: openQ===q.id ? "rotate(90deg)" : "none" }}>›</span>
              </button>

              {openQ===q.id && (
                <div style={{ padding:"0 18px 18px 18px", borderTop:"1px solid var(--border)", animation:"slideDown 0.22s ease" }}>
                  <div style={{ background:`${q.color}0A`, border:`1px solid ${q.color}22`, borderRadius:10, padding:"14px 16px", marginTop:14, marginBottom:12 }}>
                    <div style={{ color:q.color, fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.06em" }}>MODEL ANSWER</div>
                    <p style={{ color:"var(--text-body)", margin:0, fontSize:13, lineHeight:1.75 }}>{q.answer}</p>
                  </div>
                  {q.followUps?.length > 0 && (
                    <div style={{ marginBottom:12 }}>
                      <div style={{ color:"#F59E0B", fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.06em" }}>LIKELY FOLLOW-UP QUESTIONS</div>
                      {q.followUps.map((f,i) => (
                        <div key={i} style={{ background:"#F59E0B0A", border:"1px solid #F59E0B22", borderRadius:8, padding:"8px 12px", marginBottom:6 }}>
                          <span style={{ color:"#F59E0B", fontSize:11, fontWeight:800, marginRight:6 }}>Q{i+1}:</span>
                          <span style={{ color:"var(--text-body)", fontSize:12 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {q.linkedMethods?.length > 0 && (
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
                      <span style={{ color:"var(--text-muted)", fontSize:10, fontWeight:800 }}>LINKED METHODS:</span>
                      {q.linkedMethods.map(mId => {
                        const m = ANALYTICAL_METHODS.find(am => am.id===mId);
                        return m ? (
                          <button key={mId} onClick={() => navigate && navigate("methods")}
                            style={{ background:`${m.color}22`, color:m.color, border:`1px solid ${m.color}44`,
                              borderRadius:12, padding:"2px 10px", fontSize:10, fontWeight:700, cursor:"pointer" }}>
                            🔬 {m.abbreviation}
                          </button>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {filteredQ.length===0 && <p style={{ color:"var(--text-muted)", fontStyle:"italic" }}>No questions match current filters.</p>}
        </div>
      </div>
    </div>
  );
}
