import { useState } from "react";
import { LiquidHeader } from "../lc";
import { CMC_TIMELINE } from "../extra-data";

export default function TimelineView() {
  const [activePhase, setActivePhase] = useState(null);
  const phase = activePhase ? CMC_TIMELINE.find(p => p.phase===activePhase) : null;

  return (
    <div style={{ maxWidth:1400, margin:"0 auto", padding:"28px 24px" }}>
      <LiquidHeader eyebrow="PHASE BY PHASE" icon="📅" title="CMC Development Timeline" subtitle="Phase-by-phase CMC deliverables, from Hit-to-Lead through Post-Approval lifecycle management" />

      <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:28 }}>
        {CMC_TIMELINE.map(p => (
          <button key={p.phase} onClick={() => setActivePhase(p.phase===activePhase ? null : p.phase)}
            style={{
              background: p.phase===activePhase ? `${p.color}22` : "var(--bg-card)",
              color: p.phase===activePhase ? p.color : "var(--text-sec)",
              border:`1.5px solid ${p.phase===activePhase ? p.color : "var(--border)"}`,
              borderRadius:20, padding:"7px 16px", cursor:"pointer", fontWeight:700, fontSize:12,
              transition:"all 0.18s"
            }}>
            {p.icon} {p.shortPhase}
          </button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns: phase ? "1fr 2fr" : "1fr", gap:24, alignItems:"start" }}>
        <div className="timeline-track" style={{ paddingLeft:48 }}>
          {CMC_TIMELINE.map((p, i) => (
            <div key={p.phase} onClick={() => setActivePhase(p.phase===activePhase ? null : p.phase)}
              style={{ position:"relative", marginBottom:20, cursor:"pointer" }}>
              <div style={{
                position:"absolute", left:-38, top:8,
                width:20, height:20, borderRadius:"50%",
                background: p.phase===activePhase ? p.color : "var(--bg-raised)",
                border:`2px solid ${p.color}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:10, transition:"all 0.2s",
                boxShadow: p.phase===activePhase ? `0 0 12px ${p.color}55` : "none"
              }}>{p.phase===activePhase ? "●" : i+1}</div>

              <div style={{
                background: p.phase===activePhase ? `${p.color}15` : "var(--bg-card)",
                border:`1px solid ${p.phase===activePhase ? p.color : "var(--border)"}`,
                borderRadius:12, padding:"12px 16px", transition:"all 0.2s",
              }}
                onMouseEnter={e => { if(p.phase!==activePhase) e.currentTarget.style.borderColor=p.color; }}
                onMouseLeave={e => { if(p.phase!==activePhase) e.currentTarget.style.borderColor="var(--border)"; }}
              >
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                  <span style={{ color: p.phase===activePhase ? p.color : "var(--text-h)", fontWeight:800, fontSize:14 }}>
                    {p.icon} {p.shortPhase}
                  </span>
                  <span style={{ background:`${p.color}22`, color:p.color, borderRadius:8, padding:"2px 8px", fontSize:10, fontWeight:700 }}>
                    {p.years}
                  </span>
                </div>
                <div style={{ color:"var(--text-muted)", fontSize:11 }}>{p.keyMilestone}</div>
              </div>
            </div>
          ))}
        </div>

        {phase && (
          <div style={{ background:"var(--bg-card)", borderRadius:14, border:`1.5px solid ${phase.color}55`,
            padding:28, animation:"scaleIn 0.22s ease", position:"sticky", top:80 }}>
            <div style={{ marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <span style={{ fontSize:32 }}>{phase.icon}</span>
                <div>
                  <h3 style={{ color:"var(--text-h)", margin:0, fontSize:20, fontWeight:900 }}>{phase.phase}</h3>
                  <div style={{ color:phase.color, fontWeight:700, fontSize:13, marginTop:2 }}>{phase.years}</div>
                </div>
              </div>
              <div style={{ background:`${phase.color}15`, border:`1px solid ${phase.color}33`, borderRadius:10, padding:"10px 14px", marginBottom:10 }}>
                <div style={{ color:"var(--text-muted)", fontSize:11, fontWeight:700, marginBottom:4 }}>KEY MILESTONE</div>
                <div style={{ color:"var(--text-body)", fontSize:13 }}>{phase.keyMilestone}</div>
              </div>
              <div style={{ background:"#7C3AED11", border:"1px solid #7C3AED33", borderRadius:10, padding:"10px 14px" }}>
                <div style={{ color:"var(--text-muted)", fontSize:11, fontWeight:700, marginBottom:4 }}>REGULATORY EVENT</div>
                <div style={{ color:"var(--text-body)", fontSize:13 }}>{phase.regulatoryEvent}</div>
              </div>
            </div>

            <hr className="section-divider" />
            <h4 style={{ color:"var(--text-h)", margin:"0 0 14px", fontSize:14, fontWeight:800 }}>CMC Deliverables</h4>
            {phase.deliverables.map(d => (
              <div key={d.category} style={{ marginBottom:14 }}>
                <div style={{ color:phase.color, fontSize:12, fontWeight:800, marginBottom:6, letterSpacing:"0.04em" }}>
                  ▸ {d.category}
                </div>
                <ul style={{ margin:0, paddingLeft:18, color:"var(--text-body)", fontSize:13, lineHeight:1.75 }}>
                  {d.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
        {!phase && (
          <div style={{ background:"var(--bg-card)", borderRadius:14, border:"1px solid var(--border)",
            padding:32, display:"flex", alignItems:"center", justifyContent:"center", minHeight:200 }}>
            <p style={{ color:"var(--text-muted)", fontStyle:"italic", textAlign:"center" }}>← Select a phase to view CMC deliverables</p>
          </div>
        )}
      </div>
    </div>
  );
}
