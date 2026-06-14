import { useState } from "react";
import { LiquidHeader } from "../lc";
import { CTD_MODULES } from "../extra-data";

export default function CTDView() {
  const [activeModule, setActiveModule] = useState("m3");
  const [activeSection, setActiveSection] = useState(null);
  const mod = CTD_MODULES.find(m => m.id===activeModule);
  const sec = activeSection ? mod?.sections.find(s => s.id===activeSection) : null;

  return (
    <div style={{ maxWidth:1400, margin:"0 auto", padding:"28px 24px" }}>
      <LiquidHeader eyebrow="REGULATORY DOSSIER" icon="📂" title="CTD Navigator" subtitle="Common Technical Document — complete Module 1–5 reference with CMC deep-dive on Module 3" />

      <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:24 }}>
        {CTD_MODULES.map(m => (
          <button key={m.id} onClick={() => { setActiveModule(m.id); setActiveSection(null); }} className="cat-tab"
            style={{
              background: activeModule===m.id ? `${m.color}22` : "var(--bg-card)",
              color: activeModule===m.id ? m.color : "var(--text-sec)",
              border:`1.5px solid ${activeModule===m.id ? m.color : "var(--border)"}`,
              borderRadius:10, padding:"10px 16px", cursor:"pointer", fontWeight:700, fontSize:13,
            }}>
            {m.icon} Module {m.module}
          </button>
        ))}
      </div>

      {mod && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:20, alignItems:"start" }}>
          <div>
            <div style={{ background:"var(--bg-card)", border:`1px solid ${mod.color}44`, borderRadius:14, padding:22, marginBottom:16,
              borderTop:`3px solid ${mod.color}` }}>
              <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:12 }}>
                <span style={{ fontSize:28 }}>{mod.icon}</span>
                <div>
                  <div style={{ color:"var(--text-h)", fontWeight:900, fontSize:16 }}>{mod.label}</div>
                  <div style={{ color:mod.color, fontSize:11, fontWeight:700, marginTop:2 }}>ICH CTD Structure</div>
                </div>
              </div>
              <p style={{ color:"var(--text-body)", fontSize:13, lineHeight:1.7, margin:0 }}>{mod.description}</p>
            </div>

            <div style={{ display:"grid", gap:8 }}>
              {mod.sections.map(s => (
                <button key={s.id} onClick={() => setActiveSection(s.id===activeSection ? null : s.id)}
                  style={{
                    background: s.id===activeSection ? `${mod.color}18` : "var(--bg-card)",
                    border:`1px solid ${s.id===activeSection ? mod.color : "var(--border)"}`,
                    borderRadius:10, padding:"12px 16px", cursor:"pointer", textAlign:"left",
                    transition:"all 0.18s",
                  }}>
                  <div style={{ color:s.id===activeSection ? mod.color : "var(--text-h)", fontWeight:700, fontSize:13, marginBottom:4 }}>
                    {s.label}
                  </div>
                  <div style={{ color:"var(--text-muted)", fontSize:12, lineHeight:1.4 }}>
                    {s.description.slice(0,75)}{s.description.length>75 ? "…" : ""}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {sec && (
            <div style={{ background:"var(--bg-card)", borderRadius:14, border:`1.5px solid ${mod.color}55`,
              padding:28, animation:"scaleIn 0.22s ease", position:"sticky", top:80 }}>
              <div style={{ color:mod.color, fontSize:12, fontFamily:"monospace", fontWeight:700, marginBottom:6 }}>{sec.id}</div>
              <h3 style={{ color:"var(--text-h)", margin:"0 0 14px", fontSize:20, fontWeight:900 }}>{sec.label}</h3>
              <p style={{ color:"var(--text-body)", fontSize:14, lineHeight:1.75, marginBottom:20 }}>{sec.description}</p>

              <div style={{ background:"var(--bg-surface)", borderRadius:10, padding:"12px 16px", marginBottom:14 }}>
                <strong style={{ color:"#34D399", fontSize:11, letterSpacing:"0.05em" }}>KEY CONTENT / REQUIRED ELEMENTS</strong>
                <ul style={{ margin:"8px 0 0", paddingLeft:18, color:"var(--text-body)", fontSize:13, lineHeight:1.8 }}>
                  {sec.keyContent.map((k,i) => <li key={i}>{k}</li>)}
                </ul>
              </div>

              {sec.tips && (
                <div style={{ background:"#7C3AED11", border:"1px solid #7C3AED33", borderRadius:10, padding:"12px 16px" }}>
                  <strong style={{ color:"var(--accent-light)", fontSize:11, letterSpacing:"0.05em" }}>💡 REVIEWER TIPS & BEST PRACTICES</strong>
                  <p style={{ color:"var(--text-body)", margin:"8px 0 0", fontSize:13, lineHeight:1.65 }}>{sec.tips}</p>
                </div>
              )}
            </div>
          )}
          {!sec && (
            <div style={{ background:"var(--bg-card)", borderRadius:14, border:"1px solid var(--border)",
              padding:32, display:"flex", alignItems:"center", justifyContent:"center", minHeight:200 }}>
              <p style={{ color:"var(--text-muted)", fontStyle:"italic", textAlign:"center" }}>← Select a section to see detailed content</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
