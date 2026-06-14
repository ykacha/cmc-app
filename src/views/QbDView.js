import { useState } from "react";
import { InfoBox, FilterBtn } from "../shared";
import { LiquidHeader } from "../lc";
import { QTPP, CQA_LIST, CPP_LIST, FMEA_TABLE, DOE_STUDIES, DESIGN_SPACE, CONTROL_STRATEGY, COA_ELEMENTS } from "../qbd-data";
import { ANALYTICAL_METHODS } from "../extra-data";

export default function QbDView({ navigate }) {
  const [tab, setTab] = useState("qtpp");
  const [cqaFilter, setCqaFilter] = useState("All");
  const [cppFilter, setCppFilter] = useState("All");
  const [activeCQA, setActiveCQA] = useState(null);
  const [activeCPP, setActiveCPP] = useState(null);
  const [fmeaSort, setFmeaSort] = useState("rpn");
  const [coaTab, setCoaTab] = useState("ds");
  const [csTab, setCsTab] = useState(0);

  const TABS = [
    { id:"qtpp", label:"QTPP", icon:"🎯" },
    { id:"cqa", label:"CQAs", icon:"🔴" },
    { id:"fmea", label:"Risk (FMEA)", icon:"⚠️" },
    { id:"cpp", label:"CPPs", icon:"⚙️" },
    { id:"doe", label:"Design Space", icon:"📐" },
    { id:"strategy", label:"Control Strategy", icon:"🛡️" },
    { id:"coa", label:"COA", icon:"📋" },
  ];

  const cqaCats = ["All", ...new Set(CQA_LIST.map(c => c.category))];
  const cppSteps = ["All", ...new Set(CPP_LIST.map(c => c.processStep.split(" — ")[0]))];
  const filteredCQA = CQA_LIST.filter(c => cqaFilter==="All" || c.category===cqaFilter);
  const filteredCPP = CPP_LIST.filter(c => cppFilter==="All" || c.processStep.startsWith(cppFilter));
  const sortedFMEA = [...FMEA_TABLE].sort((a,b) => fmeaSort==="rpn" ? b.rpn-a.rpn : b.severity-a.severity);

  return (
    <div style={{ maxWidth:1400, margin:"0 auto", padding:"28px 24px" }}>
      <LiquidHeader icon="🔬" title="QbD / CQA / CPP / COA"
        subtitle="Quality by Design framework — QTPP, Critical Quality Attributes, Critical Process Parameters, FMEA, Design Space, Control Strategy, and Certificate of Analysis" />

      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:24, background:"var(--bg-card)",
        border:"1px solid var(--border)", borderRadius:12, padding:8 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ flex:1, minWidth:80, background: tab===t.id ? "var(--accent)" : "none",
              color: tab===t.id ? "#fff" : "var(--text-sec)", border:"none",
              borderRadius:8, padding:"8px 10px", cursor:"pointer", fontWeight:700, fontSize:11,
              letterSpacing:"0.03em", transition:"all 0.18s", whiteSpace:"nowrap" }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {tab==="qtpp" && (
        <div>
          <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:24, marginBottom:20 }}>
            <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:18 }}>
              <span style={{ fontSize:32 }}>🎯</span>
              <div>
                <h3 style={{ color:"var(--text-h)", margin:0, fontSize:18, fontWeight:900 }}>Quality Target Product Profile (QTPP)</h3>
                <p style={{ color:"var(--text-sec)", margin:"4px 0 0", fontSize:13 }}>Defines what the drug product must achieve from a patient/clinical perspective — the starting point for all QbD activities per ICH Q8(R2)</p>
              </div>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                <thead>
                  <tr style={{ background:"var(--bg-surface)", borderBottom:"1px solid var(--border)" }}>
                    {["QTPP Element","Clinical/Regulatory Target","Scientific Justification"].map(h => (
                      <th key={h} style={{ color:"var(--text-muted)", padding:"10px 14px", textAlign:"left", fontSize:10, fontWeight:800, letterSpacing:"0.06em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {QTPP.map((q, i) => (
                    <tr key={q.attribute} style={{ borderBottom:"1px solid var(--border)", background: i%2===0?"transparent":"var(--bg-surface)" }}>
                      <td style={{ color:"var(--accent-light)", padding:"12px 14px", fontWeight:800, fontSize:12, whiteSpace:"nowrap" }}>{q.attribute}</td>
                      <td style={{ color:"var(--text-h)", padding:"12px 14px", fontWeight:600, fontSize:12 }}>{q.target}</td>
                      <td style={{ color:"var(--text-body)", padding:"12px 14px", fontSize:12, lineHeight:1.6 }}>{q.justification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <InfoBox color="#A78BFA" label="ICH Q8(R2) FRAMEWORK"
            text="QTPP → CQA Identification → Risk Assessment → Design of Experiments (DoE) → Design Space → Control Strategy. Working within the design space does not require regulatory notification. The QTPP is documented in CTD Section 3.2.P.2 (DP development) and 3.2.S.2 (DS development)."/>
          <InfoBox color="#22D3EE" label="LINK TO CTD & SUBMISSIONS"
            text="QTPP elements directly map to BLA/IND CTD Module 3.2 content: potency → 3.2.S.4.4 (bioassay method); purity → 3.2.S.4.1 (specification); container closure → 3.2.P.3; shelf life → 3.2.P.8 (stability). QTPP is not a submission section itself but drives all CMC content."/>
        </div>
      )}

      {tab==="cqa" && (
        <div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:18 }}>
            {cqaCats.map(c => (
              <FilterBtn key={c} label={c} active={cqaFilter===c}
                color={c==="All" ? null : CQA_LIST.find(q=>q.category===c)?.color}
                onClick={() => { setCqaFilter(c); setActiveCQA(null); }}/>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns: activeCQA ? "minmax(0,380px) 1fr" : "repeat(auto-fill,minmax(300px,1fr))", gap:16, alignItems:"start" }}>
            <div style={{ display:"grid", gap:12, gridTemplateColumns: activeCQA ? "1fr" : "repeat(auto-fill,minmax(300px,1fr))" }}>
              {filteredCQA.map(cqa => (
                <button key={cqa.id} onClick={() => setActiveCQA(activeCQA===cqa.id ? null : cqa.id)}
                  style={{
                    background: activeCQA===cqa.id ? `${cqa.color}18` : "var(--bg-card)",
                    border:`1.5px solid ${activeCQA===cqa.id ? cqa.color : "var(--border)"}`,
                    borderRadius:12, padding:"14px 16px", cursor:"pointer", textAlign:"left",
                    transition:"all 0.18s", boxShadow: activeCQA===cqa.id ? `0 0 16px ${cqa.color}25` : "none",
                  }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                    <div>
                      <span style={{ color:"var(--text-h)", fontWeight:900, fontSize:13 }}>{cqa.name}</span>
                      <span style={{ display:"block", color:"var(--text-muted)", fontSize:10, marginTop:2 }}>{cqa.abbreviation} · {cqa.category}</span>
                    </div>
                    <span style={{ background:`${cqa.color}22`, color:cqa.color, borderRadius:12, padding:"2px 8px", fontSize:9, fontWeight:800, whiteSpace:"nowrap", flexShrink:0 }}>
                      {cqa.risk}
                    </span>
                  </div>
                  <p style={{ color:"var(--text-sec)", fontSize:11, margin:"0 0 8px", lineHeight:1.5,
                    display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{cqa.rationale}</p>
                  <div style={{ color:"var(--text-muted)", fontSize:10, fontFamily:"monospace" }}>{cqa.spec}</div>
                  {cqa.testMethods?.length > 0 && (
                    <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginTop:8 }}>
                      {cqa.testMethods.map(mId => {
                        const m = ANALYTICAL_METHODS.find(am => am.id===mId);
                        return m ? (
                          <button key={mId} onClick={e => { e.stopPropagation(); navigate && navigate("methods"); }}
                            style={{ background:`${m.color}22`, color:m.color, border:`1px solid ${m.color}33`,
                              borderRadius:10, padding:"2px 8px", fontSize:9, fontWeight:800, cursor:"pointer" }}>
                            🔬 {m.abbreviation}
                          </button>
                        ) : null;
                      })}
                    </div>
                  )}
                </button>
              ))}
            </div>
            {activeCQA && (() => {
              const cqa = CQA_LIST.find(c => c.id===activeCQA);
              if (!cqa) return null;
              return (
                <div className="panel-enter" style={{ background:"var(--bg-card)", borderRadius:14, border:`1.5px solid ${cqa.color}44`,
                  padding:24, position:"sticky", top:80, maxHeight:"calc(100vh - 100px)", overflowY:"auto" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                    <h3 style={{ color:"var(--text-h)", margin:0, fontSize:17, fontWeight:900 }}>{cqa.name}</h3>
                    <button onClick={() => setActiveCQA(null)} style={{ background:"none", border:"none", color:"var(--text-muted)", cursor:"pointer", fontSize:18 }}>✕</button>
                  </div>
                  <span style={{ background:`${cqa.color}22`, color:cqa.color, borderRadius:12, padding:"3px 10px", fontSize:10, fontWeight:800 }}>{cqa.risk}</span>
                  <InfoBox color={cqa.color} label="SCIENTIFIC RATIONALE" text={cqa.rationale}/>
                  <InfoBox color="#34D399" label="SPECIFICATION" text={cqa.spec}/>
                  <InfoBox color="#F59E0B" label="PATIENT RISK (if OOS)" text={cqa.patientRisk}/>
                  <InfoBox color="#22D3EE" label="CONTROL TIER" text={cqa.controlTier}/>
                  <InfoBox color="#A78BFA" label="MITIGATION STRATEGY" text={cqa.mitigation}/>
                  <div style={{ marginTop:12 }}>
                    <div style={{ color:"var(--text-muted)", fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.06em" }}>CTD SECTION & ICH REF</div>
                    <div style={{ display:"flex", gap:8 }}>
                      <button onClick={() => navigate && navigate("ctd")}
                        style={{ background:"var(--bg-surface)", border:"1px solid var(--border)", borderRadius:8, padding:"6px 12px", cursor:"pointer", fontSize:11, color:"var(--text-sec)" }}>
                        📂 {cqa.ctdSection}
                      </button>
                      {cqa.linkedICH?.map(ich => (
                        <button key={ich} onClick={() => navigate && navigate("ich")}
                          style={{ background:"var(--bg-surface)", border:"1px solid var(--border)", borderRadius:8, padding:"6px 12px", cursor:"pointer", fontSize:11, color:"var(--accent-light)" }}>
                          📜 ICH {ich.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {tab==="fmea" && (
        <div>
          <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:16, flexWrap:"wrap" }}>
            <InfoBox color="#F59E0B" label="FMEA METHODOLOGY"
              text="Failure Mode and Effects Analysis (FMEA) per ICH Q9 Risk Management. RPN = Severity × Occurrence × Detectability (each scored 1–10; Detectability: 10=hardest to detect). RPN ≥72 = High priority for control strategy enhancement." />
          </div>
          <div style={{ display:"flex", gap:8, marginBottom:16 }}>
            <span style={{ color:"var(--text-muted)", fontSize:12, alignSelf:"center" }}>Sort by:</span>
            <FilterBtn label="RPN (High→Low)" active={fmeaSort==="rpn"} onClick={() => setFmeaSort("rpn")}/>
            <FilterBtn label="Severity" active={fmeaSort==="sev"} onClick={() => setFmeaSort("sev")}/>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr style={{ background:"var(--bg-card)", borderBottom:"2px solid var(--border)" }}>
                  {["CQA","Failure Mode","Severity","Occurrence","Detectability","RPN","Residual RPN","Top Controls"].map(h => (
                    <th key={h} style={{ color:"var(--text-muted)", padding:"10px 12px", textAlign:"left", fontSize:9, fontWeight:800, letterSpacing:"0.06em", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedFMEA.map((row, i) => {
                  const rpnColor = row.rpn >= 80 ? "#F472B6" : row.rpn >= 50 ? "#F59E0B" : "#34D399";
                  const cqa = CQA_LIST.find(c => c.id===row.cqaId);
                  return (
                    <tr key={row.cqaId} style={{ borderBottom:"1px solid var(--border)", background: i%2===0?"transparent":"var(--bg-surface)" }}>
                      <td style={{ padding:"10px 12px" }}>
                        <div style={{ color: cqa?.color || "var(--text-h)", fontWeight:800, fontSize:11 }}>{row.cqaName}</div>
                      </td>
                      <td style={{ padding:"10px 12px", color:"var(--text-body)", fontSize:11, maxWidth:200 }}>{row.failureMode}</td>
                      {[row.severity, row.occurrence, row.detectability].map((v, vi) => (
                        <td key={vi} style={{ padding:"10px 12px", textAlign:"center" }}>
                          <span style={{
                            background: v>=8 ? "#F472B622" : v>=5 ? "#F59E0B22" : "#34D39922",
                            color: v>=8 ? "#F472B6" : v>=5 ? "#F59E0B" : "#34D399",
                            borderRadius:8, padding:"3px 8px", fontWeight:900, fontSize:12
                          }}>{v}</span>
                        </td>
                      ))}
                      <td style={{ padding:"10px 12px", textAlign:"center" }}>
                        <span style={{ background:`${rpnColor}22`, color:rpnColor, borderRadius:8, padding:"4px 10px", fontWeight:900, fontSize:13 }}>{row.rpn}</span>
                      </td>
                      <td style={{ padding:"10px 12px", textAlign:"center" }}>
                        <span style={{ background:"#34D39922", color:"#34D399", borderRadius:8, padding:"3px 8px", fontWeight:700, fontSize:11 }}>{row.residualRpn}</span>
                      </td>
                      <td style={{ padding:"10px 12px" }}>
                        <ul style={{ margin:0, paddingLeft:14, color:"var(--text-sec)", fontSize:10, lineHeight:1.6 }}>
                          {row.mitigations.slice(0,3).map((m,mi) => <li key={mi}>{m}</li>)}
                        </ul>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab==="cpp" && (
        <div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:18 }}>
            {cppSteps.map(s => (
              <FilterBtn key={s} label={s} active={cppFilter===s}
                color={s==="All" ? null : CPP_LIST.find(c=>c.processStep.startsWith(s))?.stepColor}
                onClick={() => { setCppFilter(s); setActiveCPP(null); }}/>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns: activeCPP ? "minmax(0,360px) 1fr" : "repeat(auto-fill,minmax(300px,1fr))", gap:16, alignItems:"start" }}>
            <div style={{ display:"grid", gap:10, gridTemplateColumns: activeCPP ? "1fr" : "repeat(auto-fill,minmax(300px,1fr))" }}>
              {filteredCPP.map(cpp => (
                <button key={cpp.id} onClick={() => setActiveCPP(activeCPP===cpp.id ? null : cpp.id)}
                  style={{
                    background: activeCPP===cpp.id ? `${cpp.stepColor}18` : "var(--bg-card)",
                    border:`1.5px solid ${activeCPP===cpp.id ? cpp.stepColor : "var(--border)"}`,
                    borderRadius:12, padding:"14px 16px", cursor:"pointer", textAlign:"left",
                    transition:"all 0.18s",
                  }}>
                  <div style={{ color:cpp.stepColor, fontSize:9, fontWeight:800, marginBottom:4, letterSpacing:"0.06em" }}>{cpp.processStep}</div>
                  <div style={{ color:"var(--text-h)", fontWeight:900, fontSize:13, marginBottom:4 }}>{cpp.name}</div>
                  <div style={{ display:"flex", gap:10, marginBottom:6 }}>
                    <span style={{ color:"#34D399", fontSize:10, fontWeight:700 }}>NOR: {cpp.normalRange}</span>
                  </div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {cpp.linkedCQAs?.map(cqaId => {
                      const cqa = CQA_LIST.find(c => c.id===cqaId);
                      return cqa ? (
                        <span key={cqaId} style={{ background:`${cqa.color}22`, color:cqa.color, borderRadius:10, padding:"2px 7px", fontSize:9, fontWeight:800 }}>
                          ↔ {cqa.abbreviation}
                        </span>
                      ) : null;
                    })}
                  </div>
                </button>
              ))}
            </div>
            {activeCPP && (() => {
              const cpp = CPP_LIST.find(c => c.id===activeCPP);
              if (!cpp) return null;
              return (
                <div className="panel-enter" style={{ background:"var(--bg-card)", borderRadius:14, border:`1.5px solid ${cpp.stepColor}44`,
                  padding:24, position:"sticky", top:80, maxHeight:"calc(100vh - 100px)", overflowY:"auto" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
                    <h3 style={{ color:"var(--text-h)", margin:0, fontSize:16, fontWeight:900 }}>{cpp.name}</h3>
                    <button onClick={() => setActiveCPP(null)} style={{ background:"none", border:"none", color:"var(--text-muted)", cursor:"pointer", fontSize:18 }}>✕</button>
                  </div>
                  <div style={{ color:cpp.stepColor, fontSize:11, fontWeight:700, marginBottom:14 }}>⚙️ {cpp.processStep}</div>
                  <InfoBox color={cpp.stepColor} label="NORMAL OPERATING RANGE (NOR)" text={cpp.normalRange}/>
                  {cpp.criticalLow && <InfoBox color="#F59E0B" label="CRITICAL LOW LIMIT" text={cpp.criticalLow}/>}
                  {cpp.criticalHigh && <InfoBox color="#F472B6" label="CRITICAL HIGH LIMIT" text={cpp.criticalHigh}/>}
                  <InfoBox color="#A78BFA" label="MECHANISM OF EFFECT ON CQAs" text={cpp.mechanismOfEffect}/>
                  <InfoBox color="#22D3EE" label="MONITORING STRATEGY" text={cpp.monitoringStrategy}/>
                  <InfoBox color="#34D399" label="CONTROL METHOD" text={cpp.controlMethod}/>
                  <div style={{ marginTop:10 }}>
                    <div style={{ color:"var(--text-muted)", fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.06em" }}>LINKED CQAs</div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {cpp.linkedCQAs?.map(cqaId => {
                        const cqa = CQA_LIST.find(c => c.id===cqaId);
                        return cqa ? (
                          <button key={cqaId} onClick={() => { setTab("cqa"); setActiveCQA(cqaId); setActiveCPP(null); }}
                            style={{ background:`${cqa.color}22`, color:cqa.color, border:`1px solid ${cqa.color}44`,
                              borderRadius:12, padding:"4px 12px", fontSize:11, fontWeight:700, cursor:"pointer" }}>
                            🔴 {cqa.name.split(" ")[0]}
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {tab==="doe" && (
        <div>
          <InfoBox color="#A78BFA" label="ICH Q8 DESIGN SPACE"
            text="Design space is the multidimensional combination and interaction of input variables (material attributes and process parameters) that have been demonstrated to provide assurance of quality. Working within the approved design space is not considered a change. PAR = Proven Acceptable Range (univariate); Design Space = multivariate (proven by DoE)."/>
          <div style={{ display:"grid", gap:20, marginTop:16 }}>
            {DESIGN_SPACE.map(ds => (
              <div key={ds.id} style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:22 }}>
                <h3 style={{ color:"var(--text-h)", margin:"0 0 10px", fontSize:16, fontWeight:900 }}>{ds.title}</h3>
                <p style={{ color:"var(--text-sec)", fontSize:13, margin:"0 0 16px", lineHeight:1.6 }}>{ds.description}</p>
                <div style={{ overflowX:"auto", marginBottom:14 }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                    <thead>
                      <tr style={{ background:"var(--bg-surface)", borderBottom:"1px solid var(--border)" }}>
                        {["Parameter","Proven Acceptable Range (PAR)","Normal Operating Range (NOR)","Setpoint","Linked CQAs"].map(h => (
                          <th key={h} style={{ color:"var(--text-muted)", padding:"8px 12px", textAlign:"left", fontSize:9, fontWeight:800, letterSpacing:"0.05em", whiteSpace:"nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ds.parameters.map((p, i) => (
                        <tr key={p.name} style={{ borderBottom:"1px solid var(--border)", background: i%2===0?"transparent":"var(--bg-surface)" }}>
                          <td style={{ color:"var(--accent-light)", padding:"8px 12px", fontWeight:700, fontSize:11 }}>{p.name}</td>
                          <td style={{ color:"#F59E0B", padding:"8px 12px", fontFamily:"monospace", fontSize:11 }}>{p.par}</td>
                          <td style={{ color:"#34D399", padding:"8px 12px", fontFamily:"monospace", fontSize:11 }}>{p.nor}</td>
                          <td style={{ color:"#22D3EE", padding:"8px 12px", fontFamily:"monospace", fontSize:11 }}>{p.setpoint}</td>
                          <td style={{ padding:"8px 12px" }}>
                            <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                              {(p.linkedCQAs||[]).map(c => (
                                <span key={c} style={{ background:"#A78BFA22", color:"#A78BFA", borderRadius:8, padding:"1px 7px", fontSize:9, fontWeight:700 }}>{c}</span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <InfoBox color="#22D3EE" label="REGULATORY STATUS" text={ds.regulatoryStatus}/>
              </div>
            ))}

            <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:22 }}>
              <h3 style={{ color:"var(--text-h)", margin:"0 0 16px", fontSize:16, fontWeight:900 }}>🧪 DoE Study Examples</h3>
              {DOE_STUDIES.map(doe => (
                <details key={doe.id} style={{ background:"var(--bg-surface)", borderRadius:10, padding:16, marginBottom:12, border:"1px solid var(--border)" }}>
                  <summary style={{ color:"var(--text-h)", fontWeight:700, fontSize:14, cursor:"pointer" }}>
                    📐 {doe.title}
                  </summary>
                  <div style={{ marginTop:14, borderTop:"1px solid var(--border)", paddingTop:14 }}>
                    <InfoBox color="#A78BFA" label="OBJECTIVE" text={doe.objective}/>
                    <InfoBox color="#22D3EE" label="DESIGN" text={`${doe.design} (${doe.runs} runs) · Software: ${doe.software}`}/>
                    <div style={{ marginBottom:10 }}>
                      <div style={{ color:"#F59E0B", fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.06em" }}>FACTORS</div>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:8 }}>
                        {doe.factors.map(f => (
                          <div key={f.name} style={{ background:"var(--bg-card)", borderRadius:8, padding:"8px 12px", border:"1px solid var(--border)", fontSize:11 }}>
                            <div style={{ color:"var(--text-h)", fontWeight:700 }}>{f.name}</div>
                            <div style={{ color:"var(--text-muted)", marginTop:3 }}>Low: {f.low} | Center: {f.center} | High: {f.high}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <InfoBox color="#34D399" label="KEY FINDINGS" text={doe.keyFindings}/>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab==="strategy" && (
        <div>
          <InfoBox color="#34D399" label="MULTI-TIERED CONTROL STRATEGY (ICH Q10 + Q8)" text={CONTROL_STRATEGY.overview}/>
          <div style={{ marginTop:16, display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
            {CONTROL_STRATEGY.tiers.map((t, i) => (
              <button key={i} onClick={() => setCsTab(i)}
                style={{ background: csTab===i ? t.color : "var(--bg-card)", color: csTab===i ? "#000" : "var(--text-sec)",
                  border:`1.5px solid ${csTab===i ? t.color : "var(--border)"}`, borderRadius:10, padding:"8px 16px",
                  cursor:"pointer", fontWeight:700, fontSize:12, transition:"all 0.18s" }}>
                Tier {t.tier}: {t.name}
              </button>
            ))}
          </div>
          {(() => {
            const t = CONTROL_STRATEGY.tiers[csTab];
            if (!t) return null;
            return (
              <div style={{ background:"var(--bg-card)", border:`1.5px solid ${t.color}44`, borderRadius:14, padding:22 }}>
                <h3 style={{ color:"var(--text-h)", margin:"0 0 8px", fontSize:16, fontWeight:900 }}>Tier {t.tier}: {t.name}</h3>
                <p style={{ color:"var(--text-sec)", fontSize:13, margin:"0 0 16px", lineHeight:1.6 }}>{t.description}</p>
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                    <thead>
                      <tr style={{ background:`${t.color}18`, borderBottom:`1px solid ${t.color}33` }}>
                        {["Control Measure","Target / Specification","Frequency","Linked CQA / CPP"].map(h => (
                          <th key={h} style={{ color:t.color, padding:"8px 12px", textAlign:"left", fontSize:9, fontWeight:800, letterSpacing:"0.06em" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {t.elements.map((el, i) => {
                        const linkedCQA = el.linkedCQA && CQA_LIST.find(c => c.id===el.linkedCQA);
                        return (
                          <tr key={i} style={{ borderBottom:"1px solid var(--border)", background: i%2===0?"transparent":"var(--bg-surface)" }}>
                            <td style={{ color:"var(--text-h)", padding:"8px 12px", fontWeight:700, fontSize:11 }}>{el.control}</td>
                            <td style={{ color:"#34D399", padding:"8px 12px", fontFamily:"monospace", fontSize:10 }}>{el.target}</td>
                            <td style={{ color:"var(--text-muted)", padding:"8px 12px", fontSize:10 }}>{el.frequency}</td>
                            <td style={{ padding:"8px 12px" }}>
                              {linkedCQA && (
                                <button onClick={() => { setTab("cqa"); setActiveCQA(linkedCQA.id); }}
                                  style={{ background:`${linkedCQA.color}22`, color:linkedCQA.color, border:`1px solid ${linkedCQA.color}33`,
                                    borderRadius:10, padding:"2px 8px", fontSize:9, fontWeight:800, cursor:"pointer" }}>
                                  🔴 {linkedCQA.abbreviation}
                                </button>
                              )}
                              {!linkedCQA && <span style={{ color:"var(--text-muted)", fontSize:10 }}>{el.linkedCPP || el.linkedCQA || "—"}</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {tab==="coa" && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
            <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:20 }}>
              <h3 style={{ color:"var(--text-h)", margin:"0 0 12px", fontSize:14, fontWeight:900 }}>📋 Required COA Elements</h3>
              <ol style={{ paddingLeft:18, margin:0, color:"var(--text-body)", fontSize:12, lineHeight:1.9 }}>
                {COA_ELEMENTS.required.map((r, i) => <li key={i}>{r}</li>)}
              </ol>
            </div>
            <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:20 }}>
              <h3 style={{ color:"var(--text-h)", margin:"0 0 12px", fontSize:14, fontWeight:900 }}>⚖️ Regulatory Basis</h3>
              <ul style={{ paddingLeft:16, margin:0, color:"var(--text-body)", fontSize:12, lineHeight:1.9 }}>
                {COA_ELEMENTS.regulatoryBasis.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          </div>

          <div style={{ display:"flex", gap:8, marginBottom:16 }}>
            <button onClick={() => setCoaTab("ds")}
              style={{ background: coaTab==="ds" ? "#A78BFA" : "var(--bg-card)", color: coaTab==="ds" ? "#fff" : "var(--text-sec)",
                border:"none", borderRadius:10, padding:"9px 20px", cursor:"pointer", fontWeight:700, fontSize:13, transition:"all 0.18s" }}>
              📦 Drug Substance COA
            </button>
            <button onClick={() => setCoaTab("dp")}
              style={{ background: coaTab==="dp" ? "#34D399" : "var(--bg-card)", color: coaTab==="dp" ? "#000" : "var(--text-sec)",
                border:"none", borderRadius:10, padding:"9px 20px", cursor:"pointer", fontWeight:700, fontSize:13, transition:"all 0.18s" }}>
              💉 Drug Product COA
            </button>
          </div>

          {(() => {
            const ex = coaTab==="ds" ? COA_ELEMENTS.dsExample : COA_ELEMENTS.dpExample;
            const accentColor = coaTab==="ds" ? "#A78BFA" : "#34D399";
            return (
              <div style={{ background:"var(--bg-card)", border:`1.5px solid ${accentColor}44`, borderRadius:14, overflow:"hidden" }}>
                <div style={{ background:`${accentColor}18`, padding:"16px 22px", borderBottom:`1px solid ${accentColor}33` }}>
                  <h3 style={{ color:"var(--text-h)", margin:0, fontSize:14, fontWeight:900 }}>{ex.title}</h3>
                </div>
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                    <thead>
                      <tr style={{ background:"var(--bg-surface)", borderBottom:"1px solid var(--border)" }}>
                        {["Test","Analytical Method","Acceptance Criteria","Lot Result"].map(h => (
                          <th key={h} style={{ color:"var(--text-muted)", padding:"8px 14px", textAlign:"left", fontSize:9, fontWeight:800, letterSpacing:"0.06em" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ex.tests.map((t, i) => {
                        const passed = t.result.includes("PASS");
                        return (
                          <tr key={i} style={{ borderBottom:"1px solid var(--border)", background: i%2===0?"transparent":"var(--bg-surface)" }}>
                            <td style={{ color:"var(--text-h)", padding:"10px 14px", fontWeight:700, fontSize:11 }}>{t.test}</td>
                            <td style={{ color:"var(--text-sec)", padding:"10px 14px", fontSize:10, maxWidth:180 }}>{t.method}</td>
                            <td style={{ color:"#22D3EE", padding:"10px 14px", fontFamily:"monospace", fontSize:10 }}>{t.spec}</td>
                            <td style={{ padding:"10px 14px" }}>
                              <span style={{ background: passed ? "#34D39922" : "#F472B622",
                                color: passed ? "#34D399" : "#F472B6",
                                borderRadius:8, padding:"3px 8px", fontSize:10, fontWeight:700 }}>
                                {t.result}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div style={{ background:"#34D39918", borderTop:"1px solid #34D39944", padding:"12px 22px" }}>
                  <strong style={{ color:"#34D399", fontSize:11 }}>LOT DISPOSITION: </strong>
                  <span style={{ color:"var(--text-h)", fontSize:12, fontWeight:700 }}>{ex.disposition}</span>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
