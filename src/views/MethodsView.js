import { useState } from "react";
import { InfoBox, FilterBtn, PhasePill, METHOD_STEPS } from "../shared";
import { LiquidHeader } from "../lc";
import { ANALYTICAL_METHODS } from "../extra-data";

export default function MethodsView({ navigate }) {
  const catColors = {
    Identity:"#22D3EE", Purity:"#34D399", Potency:"#F472B6",
    Glycosylation:"#A78BFA", "Physical/Chemical":"#FB923C", Safety:"#F59E0B", Structural:"#38BDF8"
  };
  const categories = ["All", ...new Set(ANALYTICAL_METHODS.map(m => m.category))];
  const [catFilter, setCatFilter] = useState("All");
  const [activeMethod, setActiveMethod] = useState(null);
  const [search, setSearch] = useState("");
  const [detailTab, setDetailTab] = useState("about");

  const filtered = ANALYTICAL_METHODS.filter(m =>
    (catFilter==="All" || m.category===catFilter) &&
    (!search || m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.abbreviation.toLowerCase().includes(search.toLowerCase()) ||
      m.purpose.toLowerCase().includes(search.toLowerCase()))
  );
  const method = activeMethod ? ANALYTICAL_METHODS.find(m => m.id===activeMethod) : null;
  const phaseList = ["Pre-IND","IND","Ph1","Ph2","Ph3","BLA"];

  const handleSelect = (id) => {
    setActiveMethod(prev => prev===id ? null : id);
    setDetailTab("about");
  };

  return (
    <div style={{ maxWidth:1400, margin:"0 auto", padding:"28px 24px" }}>
      <LiquidHeader eyebrow="22 ASSAYS" icon="🔬" title="Analytical Methods"
        subtitle="22 assay reference cards — principle, protocol, parameters, CQA linkage & regulatory context" />

      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:20, alignItems:"center" }}>
        {categories.map(c => (
          <FilterBtn key={c} label={c} active={catFilter===c}
            color={c==="All" ? null : catColors[c]}
            onClick={() => { setCatFilter(c); setActiveMethod(null); }} />
        ))}
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, abbreviation or purpose…"
          style={{ flex:1, minWidth:200, background:"var(--bg-card)", border:"1px solid var(--border)",
            borderRadius:10, padding:"7px 14px", color:"var(--text-body)", fontSize:13 }} />
        <span style={{ color:"var(--text-faint)", fontSize:12, whiteSpace:"nowrap" }}>
          {filtered.length} / {ANALYTICAL_METHODS.length}
        </span>
      </div>

      <div style={{ display:"grid", gridTemplateColumns: method ? "minmax(0,360px) 1fr" : "1fr", gap:20, alignItems:"start" }}>

        <div style={{ display:"grid", gridTemplateColumns: method ? "1fr" : "repeat(auto-fill,minmax(280px,1fr))", gap:12 }}>
          {filtered.map((m, i) => {
            const isActive = m.id===activeMethod;
            const col = catColors[m.category] || m.color;
            return (
              <div key={m.id} className="card-hover method-card"
                onClick={() => handleSelect(m.id)}
                style={{
                  background: isActive ? `${col}0E` : "var(--bg-card)",
                  border:`1.5px solid ${isActive ? col : "var(--border)"}`,
                  borderLeft:`3px solid ${col}`,
                  borderRadius:12, cursor:"pointer",
                  boxShadow: isActive ? `0 0 18px ${col}22` : "none",
                  transition:"all 0.18s", animationDelay:`${i*0.04}s`,
                }}>
                <div style={{ padding:"14px 16px 10px", display:"flex", alignItems:"center", gap:10,
                  borderBottom:`1px solid ${col}18` }}>
                  <span style={{ fontSize:22, flexShrink:0 }}>{m.icon}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ color:"var(--text-h)", fontWeight:800, fontSize:14, lineHeight:1.2 }}>{m.name}</div>
                    <div style={{ color:"var(--text-muted)", fontSize:10, marginTop:2 }}>{m.fullName}</div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4, flexShrink:0 }}>
                    <span style={{ background:`${col}20`, color:col, borderRadius:6, padding:"2px 8px",
                      fontSize:10, fontWeight:800, fontFamily:"monospace" }}>{m.abbreviation}</span>
                    <span style={{ background:`${col}12`, color:col, border:`1px solid ${col}30`,
                      borderRadius:10, padding:"1px 7px", fontSize:9, fontWeight:700 }}>{m.category}</span>
                  </div>
                </div>
                <div style={{ padding:"10px 16px 8px" }}>
                  <p style={{ color:"var(--text-sec)", fontSize:12, margin:"0 0 10px", lineHeight:1.55,
                    display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                    {m.purpose}
                  </p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:10 }}>
                    {m.detects.slice(0,3).map((d,di) => (
                      <span key={di} style={{ background:`${col}14`, color:"var(--text-body)",
                        border:`1px solid ${col}28`, borderRadius:14, padding:"2px 9px",
                        fontSize:10, lineHeight:1.5, whiteSpace:"nowrap",
                        overflow:"hidden", textOverflow:"ellipsis", maxWidth:160 }}>
                        {d}
                      </span>
                    ))}
                    {m.detects.length > 3 && (
                      <span style={{ color:"var(--text-faint)", fontSize:10, lineHeight:1.8 }}>+{m.detects.length-3} more</span>
                    )}
                  </div>
                  <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                    {phaseList.map(p => <PhasePill key={p} phase={p} active={m.phases[p]} />)}
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length===0 && (
            <div style={{ gridColumn:"1/-1", textAlign:"center", padding:40, color:"var(--text-muted)" }}>
              <div style={{ fontSize:32, marginBottom:8 }}>🔍</div>
              <p style={{ margin:0, fontSize:14 }}>No methods match — try a different search or filter</p>
            </div>
          )}
        </div>

        {method && (
          <div className="panel-enter" style={{ background:"var(--bg-card)", borderRadius:16,
            border:`1.5px solid ${method.color}44`, overflow:"hidden",
            position:"sticky", top:70, maxHeight:"calc(100vh - 90px)", overflowY:"auto",
            boxShadow:`0 8px 40px ${method.color}15` }}>

            <div style={{ background:`linear-gradient(135deg, ${method.color}18 0%, var(--bg-surface) 100%)`,
              padding:"22px 22px 16px", borderBottom:`1px solid ${method.color}28` }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:14, marginBottom:16 }}>
                <span style={{ fontSize:34, background:`${method.color}22`, borderRadius:12, width:56, height:56,
                  display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                  border:`1px solid ${method.color}33` }}>{method.icon}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <h3 style={{ color:"var(--text-h)", margin:"0 0 2px", fontSize:18, fontWeight:900, lineHeight:1.2 }}>{method.name}</h3>
                  <div style={{ color:method.color, fontSize:11, fontFamily:"monospace", fontWeight:800, marginBottom:3 }}>{method.abbreviation}</div>
                  <div style={{ color:"var(--text-sec)", fontSize:11, lineHeight:1.4 }}>{method.fullName}</div>
                </div>
                <button onClick={() => setActiveMethod(null)}
                  style={{ background:"var(--bg-raised)", border:"1px solid var(--border)", color:"var(--text-muted)",
                    cursor:"pointer", fontSize:14, padding:"4px 8px", lineHeight:1, borderRadius:6, flexShrink:0 }}>✕</button>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:14 }}>
                {[
                  { label:"CTD Section", value:method.ctdSection, icon:"📂" },
                  { label:"ICH Reference", value:method.ichRef, icon:"📜" },
                  { label:"Category", value:method.category, icon:"🏷️" },
                ].map(f => (
                  <div key={f.label} style={{ background:"var(--bg-card)", border:"1px solid var(--border)",
                    borderRadius:8, padding:"7px 10px" }}>
                    <div style={{ color:"var(--text-faint)", fontSize:9, fontWeight:700, marginBottom:2 }}>{f.icon} {f.label}</div>
                    <div style={{ color:"var(--text-h)", fontWeight:700, fontSize:11 }}>{f.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ background:`${method.color}12`, border:`1px solid ${method.color}30`,
                borderRadius:8, padding:"7px 12px", display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ color:method.color, fontSize:12 }}>🎯</span>
                <div>
                  <div style={{ color:method.color, fontSize:9, fontWeight:800, letterSpacing:"0.06em" }}>CQA LINKAGE</div>
                  <div style={{ color:"var(--text-body)", fontSize:12, fontWeight:600, marginTop:1 }}>{method.cqaLink}</div>
                </div>
              </div>
            </div>

            <div style={{ display:"flex", borderBottom:"1px solid var(--border)" }}>
              {[
                { id:"about", label:"About" },
                { id:"protocol", label:"Protocol" },
                { id:"parameters", label:"Parameters" },
                { id:"regulatory", label:"Regulatory" },
              ].map(t => (
                <button key={t.id} onClick={() => setDetailTab(t.id)}
                  style={{ flex:1, background: detailTab===t.id ? `${method.color}14` : "none",
                    border:"none", borderBottom: detailTab===t.id ? `2px solid ${method.color}` : "2px solid transparent",
                    color: detailTab===t.id ? method.color : "var(--text-muted)",
                    padding:"10px 6px", cursor:"pointer", fontWeight:700, fontSize:12,
                    letterSpacing:"0.02em", transition:"all 0.18s" }}>
                  {t.label}
                </button>
              ))}
            </div>

            <div style={{ padding:"18px 20px 24px" }}>
              {detailTab==="about" && (
                <>
                  <div style={{ marginBottom:16 }}>
                    <div style={{ color:"var(--text-faint)", fontSize:10, fontWeight:800, marginBottom:7, letterSpacing:"0.08em" }}>PHASE APPLICABILITY</div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {phaseList.map(p => <PhasePill key={p} phase={p} active={method.phases[p]} />)}
                    </div>
                  </div>
                  <InfoBox color={method.color} label="PURPOSE & APPLICATION" text={method.purpose} />
                  <InfoBox color="#60A5FA" label="SCIENTIFIC PRINCIPLE" text={method.principle} />
                  <div style={{ background:`${method.color}08`, border:`1px solid ${method.color}22`,
                    borderRadius:10, padding:"12px 14px" }}>
                    <div style={{ color:"#34D399", fontSize:10, fontWeight:800, marginBottom:10, letterSpacing:"0.08em" }}>DETECTS / MEASURES</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                      {method.detects.map((d,i) => (
                        <span key={i} style={{ background:`${method.color}18`, color:"var(--text-body)",
                          border:`1px solid ${method.color}30`, borderRadius:20, padding:"4px 11px",
                          fontSize:12, lineHeight:1.4 }}>{d}</span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {detailTab==="protocol" && (
                <div>
                  <div style={{ color:"var(--text-faint)", fontSize:10, fontWeight:800, marginBottom:14, letterSpacing:"0.08em" }}>STEP-BY-STEP PROCEDURE</div>
                  {(METHOD_STEPS[method.id] || ["Method steps not yet defined."]).map((step, i) => (
                    <div key={i} style={{ display:"flex", gap:12, marginBottom:10, alignItems:"flex-start" }}>
                      <div style={{ flexShrink:0, width:24, height:24, borderRadius:"50%",
                        background:`${method.color}22`, border:`1.5px solid ${method.color}55`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        color:method.color, fontSize:10, fontWeight:900 }}>{i+1}</div>
                      <div style={{ background:"var(--bg-surface)", borderRadius:8, padding:"8px 12px", flex:1,
                        border:"1px solid var(--border)", fontSize:12, color:"var(--text-body)", lineHeight:1.6 }}>
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {detailTab==="parameters" && (
                <>
                  <div style={{ color:"var(--text-faint)", fontSize:10, fontWeight:800, marginBottom:12, letterSpacing:"0.08em" }}>KEY ASSAY PARAMETERS</div>
                  <div style={{ background:"var(--bg-surface)", borderRadius:10, overflow:"hidden",
                    border:"1px solid var(--border)", marginBottom:16 }}>
                    <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                      <thead>
                        <tr style={{ background:`${method.color}12`, borderBottom:`1px solid ${method.color}28` }}>
                          <th style={{ color:method.color, padding:"9px 14px", textAlign:"left", fontSize:10, fontWeight:800, letterSpacing:"0.06em" }}>PARAMETER</th>
                          <th style={{ color:method.color, padding:"9px 14px", textAlign:"left", fontSize:10, fontWeight:800, letterSpacing:"0.06em" }}>TYPICAL VALUE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {method.parameters.map((p,i) => (
                          <tr key={p.name} style={{ borderBottom:"1px solid var(--border)",
                            background: i%2===0 ? "transparent" : `${method.color}05` }}>
                            <td style={{ color:"var(--text-sec)", padding:"9px 14px", fontWeight:700 }}>{p.name}</td>
                            <td style={{ color:"var(--text-body)", padding:"9px 14px", fontFamily:"monospace", fontSize:11 }}>{p.typical}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div style={{ background:"var(--bg-surface)", borderRadius:10, padding:"14px", border:"1px solid var(--border)" }}>
                    <div style={{ color:"#A78BFA", fontSize:10, fontWeight:800, marginBottom:10, letterSpacing:"0.08em" }}>KEY CONSIDERATIONS</div>
                    <ul style={{ margin:0, paddingLeft:18, color:"var(--text-body)", fontSize:13, lineHeight:1.8 }}>
                      {method.keyConsiderations.map((k,i) => <li key={i} style={{ marginBottom:4 }}>{k}</li>)}
                    </ul>
                  </div>
                </>
              )}

              {detailTab==="regulatory" && (
                <>
                  <div style={{ color:"var(--text-faint)", fontSize:10, fontWeight:800, marginBottom:12, letterSpacing:"0.08em" }}>REGULATORY CONTEXT</div>
                  <div style={{ background:"#7C3AED0F", border:"1px solid #7C3AED33", borderRadius:10,
                    padding:"14px 16px", marginBottom:14 }}>
                    <div style={{ color:"var(--accent-light)", fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.06em" }}>FDA / EMA EXPECTATION</div>
                    <p style={{ color:"var(--text-body)", margin:0, fontSize:13, lineHeight:1.75 }}>{method.regulatoryNote}</p>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                    <button onClick={() => navigate && navigate("ctd")}
                      style={{ background:"var(--bg-surface)", borderRadius:10, padding:"12px 14px",
                        border:"1px solid var(--border)", cursor:navigate?"pointer":"default",
                        textAlign:"left", transition:"all 0.15s" }}
                      onMouseEnter={e => navigate && (e.currentTarget.style.borderColor=method.color)}
                      onMouseLeave={e => (e.currentTarget.style.borderColor="var(--border)")}>
                      <div style={{ color:"var(--text-faint)", fontSize:10, fontWeight:800, marginBottom:6 }}>📂 CTD SECTION</div>
                      <div style={{ color:"var(--text-h)", fontWeight:700, fontSize:13 }}>{method.ctdSection}</div>
                      {navigate && <div style={{ color:"var(--accent-light)", fontSize:10, marginTop:4 }}>Open CTD Navigator →</div>}
                    </button>
                    <button onClick={() => navigate && navigate("ich")}
                      style={{ background:"var(--bg-surface)", borderRadius:10, padding:"12px 14px",
                        border:"1px solid var(--border)", cursor:navigate?"pointer":"default",
                        textAlign:"left", transition:"all 0.15s" }}
                      onMouseEnter={e => navigate && (e.currentTarget.style.borderColor=method.color)}
                      onMouseLeave={e => (e.currentTarget.style.borderColor="var(--border)")}>
                      <div style={{ color:"var(--text-faint)", fontSize:10, fontWeight:800, marginBottom:6 }}>📜 ICH REFERENCE</div>
                      <div style={{ color:"var(--text-h)", fontWeight:700, fontSize:13 }}>{method.ichRef}</div>
                      {navigate && <div style={{ color:"var(--accent-light)", fontSize:10, marginTop:4 }}>Open ICH Guidelines →</div>}
                    </button>
                  </div>
                  <div style={{ background:`${method.color}0A`, border:`1px solid ${method.color}30`,
                    borderRadius:10, padding:"12px 14px" }}>
                    <div style={{ color:method.color, fontSize:10, fontWeight:800, marginBottom:6, letterSpacing:"0.06em" }}>🎯 CQA LINKAGE</div>
                    <div style={{ color:"var(--text-body)", fontSize:13, lineHeight:1.65 }}>{method.cqaLink}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
