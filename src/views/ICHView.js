import { useState } from "react";
import { LiquidHeader } from "../lc";
import { ICH_GUIDELINES } from "../extra-data";

export default function ICHView() {
  const [activeGl, setActiveGl] = useState(null);
  const gl = activeGl ? ICH_GUIDELINES.find(g => g.id===activeGl) : null;

  return (
    <div style={{ maxWidth:1400, margin:"0 auto", padding:"28px 24px" }}>
      <LiquidHeader eyebrow="GLOBAL HARMONIZATION" icon="📜" title="ICH Quality Guidelines" subtitle="9 core guidelines every CMC professional must know — decoded with practical CMC context" />

      <div style={{ display:"grid", gridTemplateColumns: gl ? "1fr 2fr" : "repeat(auto-fill,minmax(260px,1fr))", gap:16, alignItems:"start" }}>
        <div style={{ display:"grid", gridTemplateColumns: gl ? "1fr" : "repeat(auto-fill,minmax(260px,1fr))", gap:12 }}>
          {ICH_GUIDELINES.map((g, i) => (
            <div key={g.id} onClick={() => setActiveGl(g.id===activeGl ? null : g.id)}
              className="card-hover method-card"
              style={{
                background: g.id===activeGl ? `${g.color}18` : "var(--bg-card)",
                border:`1.5px solid ${g.id===activeGl ? g.color : "var(--border)"}`,
                borderRadius:12, padding:18, cursor:"pointer",
                borderLeft:`4px solid ${g.color}`,
                animationDelay:`${i*0.05}s`,
              }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                <span style={{ background:`${g.color}22`, color:g.color, border:`1px solid ${g.color}33`,
                  borderRadius:8, padding:"3px 10px", fontSize:12, fontWeight:800, fontFamily:"monospace" }}>
                  {g.code}
                </span>
                <span style={{ background:"var(--bg-surface)", color:"var(--text-muted)", fontSize:10, fontWeight:700,
                  borderRadius:8, padding:"2px 8px" }}>{g.category}</span>
              </div>
              <div style={{ color:"var(--text-h)", fontWeight:700, fontSize:14, marginBottom:6 }}>{g.topic}</div>
              <p style={{ color:"var(--text-sec)", fontSize:12, margin:0, lineHeight:1.5 }}>
                {g.summary.slice(0,90)}{g.summary.length>90 ? "…" : ""}
              </p>
            </div>
          ))}
        </div>

        {!gl && (
          <div style={{ background:"var(--bg-card)", borderRadius:14, border:"1px solid var(--border)", position:"sticky", top:80 }}>
            <div className="empty-hint">
              <span className="eh-icon">📜</span>
              <p>Select a guideline on the left to see key requirements and CMC practical context.</p>
            </div>
          </div>
        )}
        {gl && (
          <div className="panel-enter" style={{ background:"var(--bg-card)", borderRadius:14, border:`1.5px solid ${gl.color}55`,
            padding:28, position:"sticky", top:80, maxHeight:"calc(100vh - 100px)", overflowY:"auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
              <div style={{ background:`${gl.color}22`, borderRadius:10, padding:"4px 14px", display:"inline-block" }}>
                <span style={{ color:gl.color, fontWeight:900, fontSize:18, fontFamily:"monospace" }}>{gl.code}</span>
              </div>
              <button onClick={() => setActiveGl(null)}
                style={{ background:"none", border:"none", color:"var(--text-muted)", cursor:"pointer", fontSize:18, padding:4, lineHeight:1 }}>✕</button>
            </div>

            <h3 style={{ color:"var(--text-h)", margin:"0 0 8px", fontSize:20, fontWeight:900 }}>{gl.topic}</h3>
            <p style={{ color:"var(--text-sec)", fontSize:14, lineHeight:1.7, marginBottom:18 }}>{gl.summary}</p>

            <div style={{ background:"var(--bg-surface)", borderRadius:10, padding:"12px 16px", marginBottom:14 }}>
              <strong style={{ color:"#34D399", fontSize:11, letterSpacing:"0.05em" }}>KEY REQUIREMENTS</strong>
              <ul style={{ margin:"8px 0 0", paddingLeft:18, color:"var(--text-body)", fontSize:13, lineHeight:1.8 }}>
                {gl.key.map((k,i) => <li key={i}>{k}</li>)}
              </ul>
            </div>

            <div style={{ background:"#7C3AED11", border:"1px solid #7C3AED33", borderRadius:10, padding:"12px 16px" }}>
              <strong style={{ color:"var(--accent-light)", fontSize:11, letterSpacing:"0.05em" }}>CMC PRACTICAL CONTEXT</strong>
              <p style={{ color:"var(--text-body)", margin:"8px 0 0", fontSize:13, lineHeight:1.65 }}>{gl.cmc}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
