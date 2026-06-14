import { useState } from "react";
import { LiquidHeader, TEXT, SUB, FAINT } from "../lc";
import { Icon } from "../icons";
import { VIRAL_INTRO, MODEL_VIRUSES, CLEARANCE_STEPS, SPIKING_WORKFLOW, VIRAL_FACTS } from "../viral-data";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const panel = { background:"linear-gradient(180deg, var(--panel-2), var(--panel))", border:"1px solid var(--hairline)", borderRadius:16 };

function GBox({ color, label, children }) {
  return (
    <div style={{ background:`color-mix(in srgb, ${color} 10%, transparent)`, border:`1px solid color-mix(in srgb, ${color} 35%, transparent)`, borderRadius:12, padding:"12px 14px", marginBottom:10 }}>
      <div style={{ color, fontFamily:MONO, fontSize:10, fontWeight:700, letterSpacing:".08em", marginBottom:6 }}>{label}</div>
      <div style={{ color:SUB, fontSize:13, lineHeight:1.6 }}>{children}</div>
    </div>
  );
}

const DEFAULTS = { protA:2.0, lowph:4.5, aex:4.0, vf:4.5, sd:4.0 };

export default function ViralClearanceView() {
  const [tab, setTab] = useState("overview");
  const [enabled, setEnabled] = useState({ lowph:true, aex:true, vf:true, protA:false, sd:false });
  const [vals, setVals] = useState(DEFAULTS);

  const TABS = [
    { id:"overview", label:"Overview" },
    { id:"steps", label:"Clearance Steps" },
    { id:"viruses", label:"Model Viruses" },
    { id:"spiking", label:"Spiking Study" },
    { id:"calc", label:"LRV Calculator" },
  ];

  const total = CLEARANCE_STEPS.reduce((sum, s) => sum + (enabled[s.id] ? (parseFloat(vals[s.id]) || 0) : 0), 0);
  const primaryMechs = new Set(CLEARANCE_STEPS.filter(s => enabled[s.id]).map(s => s.mech.split(" ")[0]));
  const clearsNonEnv = CLEARANCE_STEPS.some(s => enabled[s.id] && (s.id === "vf" || s.id === "aex"));
  const clearsEnv = CLEARANCE_STEPS.some(s => enabled[s.id] && (s.id === "lowph" || s.id === "sd" || s.id === "vf"));
  const robust = primaryMechs.size >= 2 && clearsNonEnv && clearsEnv && total >= 6;

  return (
    <div style={{ maxWidth:1280, margin:"0 auto", padding:"28px 24px 70px" }}>
      <LiquidHeader eyebrow="ICH Q5A(R2) · VIRAL SAFETY" icon={<Icon name="viral" size={30} />} title="Viral Clearance"
        subtitle="How a biologics process is proven to remove and inactivate potential viral contaminants — model viruses, orthogonal unit operations, spiking-study design, and a log-reduction calculator." />

      {/* tabs */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={tab === t.id ? "lc-pill lc-shine" : "lc-ghost lc-shine"} style={{ padding:"8px 16px", fontSize:13 }}>{t.label}</button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === "overview" && (
        <div style={{ animation:"lc-dropin .25s ease" }}>
          <div style={{ ...panel, padding:"22px 24px", marginBottom:18 }}>
            {VIRAL_INTRO.what.split("\n\n").map((p, i) => (
              <p key={i} style={{ color:SUB, fontSize:14.5, lineHeight:1.75, margin: i === 0 ? "0 0 12px" : 0 }}>{p}</p>
            ))}
          </div>
          <div style={{ fontFamily:MONO, fontSize:11, fontWeight:700, letterSpacing:".18em", color:"var(--accent)", margin:"6px 2px 12px" }}>THE THREE PILLARS OF VIRAL SAFETY</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:14, marginBottom:18 }}>
            {VIRAL_INTRO.pillars.map((p, i) => (
              <div key={i} style={{ ...panel, padding:"18px 20px" }}>
                <div style={{ width:32, height:32, borderRadius:9, border:"1px solid var(--hairline)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--accent)", fontFamily:MONO, fontWeight:800, marginBottom:12 }}>{i + 1}</div>
                <div style={{ color:TEXT, fontWeight:750, fontSize:14, marginBottom:6 }}>{p.t}</div>
                <div style={{ color:SUB, fontSize:12.5, lineHeight:1.6 }}>{p.d}</div>
              </div>
            ))}
          </div>
          <GBox color="#A78BFA" label="ICH Q5A(R2) — WHAT CHANGED">{VIRAL_FACTS.q5ar2}</GBox>
        </div>
      )}

      {/* CLEARANCE STEPS */}
      {tab === "steps" && (
        <div style={{ animation:"lc-dropin .25s ease" }}>
          <GBox color="#22D3EE" label="ORTHOGONALITY">{VIRAL_FACTS.orthogonality}</GBox>
          <div style={{ display:"grid", gap:14, marginTop:6 }}>
            {CLEARANCE_STEPS.map(s => (
              <div key={s.id} style={{ ...panel, padding:"18px 20px", borderLeft:`3px solid ${s.color}` }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap", marginBottom:10 }}>
                  <span style={{ color:TEXT, fontWeight:800, fontSize:16 }}>{s.name}</span>
                  <span style={{ fontFamily:MONO, fontSize:10.5, color:s.color, border:`1px solid color-mix(in srgb, ${s.color} 40%, transparent)`, borderRadius:20, padding:"2px 9px" }}>{s.mech}</span>
                  {s.primary
                    ? <span style={{ fontFamily:MONO, fontSize:10, color:"var(--accent-2)", border:"1px solid color-mix(in srgb, var(--accent-2) 40%, transparent)", borderRadius:20, padding:"2px 9px" }}>PRIMARY</span>
                    : <span style={{ fontFamily:MONO, fontSize:10, color:FAINT, border:"1px solid var(--hairline)", borderRadius:20, padding:"2px 9px" }}>SUPPORTING</span>}
                  <span style={{ marginLeft:"auto", fontFamily:MONO, fontSize:13, color:TEXT, fontWeight:700 }}>{s.lrv} <span style={{ color:FAINT, fontSize:11 }}>LOG₁₀</span></span>
                </div>
                <p style={{ color:SUB, fontSize:13, lineHeight:1.65, margin:"0 0 10px" }}>{s.how}</p>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
                  <span style={{ color:FAINT, fontSize:11, fontFamily:MONO }}>CLEARS:</span>
                  {s.targets.map(tid => {
                    const v = MODEL_VIRUSES.find(m => m.id === tid);
                    return v ? <span key={tid} style={{ background:`color-mix(in srgb, ${v.color} 16%, transparent)`, color:v.color, borderRadius:20, padding:"2px 9px", fontSize:11, fontWeight:700 }}>{v.name}</span> : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODEL VIRUSES */}
      {tab === "viruses" && (
        <div style={{ animation:"lc-dropin .25s ease" }}>
          <div style={{ ...panel, overflow:"hidden" }}>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:720 }}>
                <thead>
                  <tr style={{ borderBottom:"1px solid var(--hairline)" }}>
                    {["Model Virus","Family","Genome","Envelope","Size","Resistance"].map(h => (
                      <th key={h} style={{ textAlign:"left", padding:"13px 16px", color:FAINT, fontFamily:MONO, fontSize:10, fontWeight:700, letterSpacing:".06em" }}>{h.toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MODEL_VIRUSES.map((v, i) => (
                    <tr key={v.id} style={{ borderBottom: i < MODEL_VIRUSES.length - 1 ? "1px solid var(--hairline)" : "none" }}>
                      <td style={{ padding:"13px 16px" }}>
                        <div style={{ color:v.color, fontWeight:800 }}>{v.name}</div>
                        <div style={{ color:FAINT, fontSize:11 }}>{v.full}</div>
                      </td>
                      <td style={{ padding:"13px 16px", color:TEXT }}>{v.family}</td>
                      <td style={{ padding:"13px 16px", color:SUB, fontFamily:MONO, fontSize:12 }}>{v.genome}</td>
                      <td style={{ padding:"13px 16px", color:SUB }}>{v.env}</td>
                      <td style={{ padding:"13px 16px", color:SUB, fontFamily:MONO, fontSize:12 }}>{v.size}</td>
                      <td style={{ padding:"13px 16px" }}>
                        <span style={{ color: v.resistance.includes("High") ? "#F472B6" : v.resistance === "Medium" ? "#F59E0B" : "#34D399", fontWeight:700, fontSize:12 }}>{v.resistance}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:14, marginTop:16 }}>
            {MODEL_VIRUSES.map(v => (
              <div key={v.id} style={{ ...panel, padding:"16px 18px", borderTop:`3px solid ${v.color}` }}>
                <div style={{ color:v.color, fontWeight:800, fontSize:14, marginBottom:6 }}>{v.name} · <span style={{ color:FAINT, fontWeight:500, fontSize:12 }}>{v.size}</span></div>
                <div style={{ color:SUB, fontSize:12.5, lineHeight:1.6 }}>{v.role}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SPIKING STUDY */}
      {tab === "spiking" && (
        <div style={{ animation:"lc-dropin .25s ease" }}>
          <div style={{ display:"grid", gap:12 }}>
            {SPIKING_WORKFLOW.map(s => (
              <div key={s.n} style={{ ...panel, padding:"16px 18px", display:"flex", gap:16, alignItems:"flex-start" }}>
                <div style={{ flexShrink:0, width:34, height:34, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", background:"color-mix(in srgb, var(--accent) 14%, transparent)", border:"1px solid color-mix(in srgb, var(--accent) 40%, transparent)", color:"var(--accent)", fontWeight:800, fontFamily:MONO }}>{s.n}</div>
                <div>
                  <div style={{ color:TEXT, fontWeight:750, fontSize:14.5, marginBottom:4 }}>{s.t}</div>
                  <div style={{ color:SUB, fontSize:13, lineHeight:1.65 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:16 }}><GBox color="#F59E0B" label="ASSAY & STATISTICS">{VIRAL_FACTS.cap}</GBox></div>
        </div>
      )}

      {/* LRV CALCULATOR */}
      {tab === "calc" && (
        <div style={{ animation:"lc-dropin .25s ease" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 300px", gap:18, alignItems:"start" }}>
            <div style={{ ...panel, padding:"20px 22px" }}>
              <div style={{ fontFamily:MONO, fontSize:11, fontWeight:700, letterSpacing:".12em", color:FAINT, marginBottom:6 }}>BUILD YOUR CLEARANCE TRAIN</div>
              <p style={{ color:SUB, fontSize:12.5, margin:"0 0 16px", lineHeight:1.55 }}>Toggle unit operations and edit each step's log₁₀ reduction. Cumulative clearance sums the enabled steps.</p>
              {CLEARANCE_STEPS.map(s => {
                const on = enabled[s.id];
                return (
                  <div key={s.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 0", borderBottom:"1px solid var(--hairline)" }}>
                    <button onClick={() => setEnabled(e => ({ ...e, [s.id]: !e[s.id] }))}
                      style={{ width:42, height:24, borderRadius:999, flexShrink:0, cursor:"pointer", border:"none", padding:2, background: on ? "var(--accent)" : "var(--panel-2)", boxShadow: on ? "none" : "inset 0 0 0 1px var(--hairline)", transition:"background .2s" }}>
                      <span style={{ display:"block", width:20, height:20, borderRadius:"50%", background:"#fff", transform: on ? "translateX(18px)" : "translateX(0)", transition:"transform .2s", boxShadow:"0 1px 3px rgba(0,0,0,.3)" }}/>
                    </button>
                    <div style={{ flex:1, minWidth:0, opacity: on ? 1 : 0.5 }}>
                      <div style={{ color:TEXT, fontWeight:650, fontSize:13.5 }}>{s.name}</div>
                      <div style={{ color:FAINT, fontSize:11 }}>{s.mech}{s.primary ? " · primary" : " · supporting"}</div>
                    </div>
                    <input type="number" step="0.5" min="0" value={vals[s.id]} disabled={!on}
                      onChange={e => setVals(v => ({ ...v, [s.id]: e.target.value }))}
                      style={{ width:64, background:"var(--input-bg)", border:"1px solid var(--hairline)", borderRadius:8, padding:"6px 8px", color:TEXT, fontFamily:MONO, fontSize:13, textAlign:"right", opacity: on ? 1 : 0.4 }}/>
                    <span style={{ color:FAINT, fontFamily:MONO, fontSize:11, width:26 }}>log</span>
                  </div>
                );
              })}
            </div>

            <div style={{ ...panel, padding:"22px 20px", position:"sticky", top:88, textAlign:"center" }}>
              <div style={{ fontFamily:MONO, fontSize:11, fontWeight:700, letterSpacing:".12em", color:FAINT, marginBottom:10 }}>CUMULATIVE LRV</div>
              <div style={{ fontSize:54, fontWeight:850, color:"var(--accent)", lineHeight:1, letterSpacing:"-.03em" }}>{total.toFixed(1)}</div>
              <div style={{ color:FAINT, fontSize:11, fontFamily:MONO, marginTop:4 }}>LOG₁₀ TOTAL</div>
              <div style={{ height:1, background:"var(--hairline)", margin:"18px 0" }}/>
              <div style={{ display:"flex", flexDirection:"column", gap:8, textAlign:"left" }}>
                {[["Distinct mechanisms", primaryMechs.size], ["Enveloped covered", clearsEnv ? "Yes" : "No"], ["Non-enveloped covered", clearsNonEnv ? "Yes" : "No"]].map(([k, v]) => (
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:12.5 }}>
                    <span style={{ color:SUB }}>{k}</span>
                    <span style={{ color: (v === "No") ? "#F472B6" : TEXT, fontWeight:700, fontFamily:MONO }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:18, padding:"12px 14px", borderRadius:12, background: robust ? "color-mix(in srgb, var(--accent-2) 14%, transparent)" : "color-mix(in srgb, #F472B6 12%, transparent)", border:`1px solid ${robust ? "color-mix(in srgb, var(--accent-2) 40%, transparent)" : "color-mix(in srgb, #F472B6 35%, transparent)"}` }}>
                <div style={{ color: robust ? "var(--accent-2)" : "#F472B6", fontWeight:800, fontSize:13 }}>{robust ? "✓ Robust orthogonal clearance" : "⚠ Not yet orthogonal"}</div>
                <div style={{ color:SUB, fontSize:11.5, lineHeight:1.5, marginTop:5 }}>
                  {robust ? "Two+ distinct mechanisms covering both enveloped and small non-enveloped viruses." : "Need ≥2 distinct mechanisms covering both enveloped (e.g., low-pH) and non-enveloped (e.g., 20 nm filtration)."}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
