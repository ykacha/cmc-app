import { useState, useRef } from "react";
import { METHOD_STEPS } from "../shared";
import { LiquidHeader } from "../lc";
import { Icon } from "../icons";
import { ANALYTICAL_METHODS } from "../extra-data";
import {
  QUALITY_ATTRIBUTES, ATTR_GROUPS, CQA_METHODS, METHOD_EXTRAS,
  ROLE_DEFS, METHOD_ROLE_BASE, Q2_CATEGORIES, Q2_CHARACTERISTICS, PHASE_STRATEGY,
} from "../analytical-data";

/* ══════════════════════════════════════════════════════════════
   Analytical Methods — the analytical workbench.
   4 modes: Atlas · CQA × Method matrix · ICH Q2 validation · Control strategy.
   ══════════════════════════════════════════════════════════════ */

// method category lens (atlas): muted editorial palette + glyph + the question it answers
const CAT = {
  Identity:             { color:"#5C9EAD", icon:"glossary",   q:"Is it the right molecule?" },
  Purity:               { color:"#2DBF9E", icon:"filter",     q:"How pure is it?" },
  Potency:              { color:"#E0707A", icon:"qbd",        q:"Does it actually work?" },
  Glycosylation:        { color:"#9B7DD4", icon:"excipient",  q:"What are the glycans?" },
  "Physical/Chemical":  { color:"#57B8C9", icon:"wave",       q:"What are its physical traits?" },
  Safety:               { color:"#D0895E", icon:"shieldcheck",q:"Is it safe to dose?" },
  Structural:           { color:"#7FB069", icon:"infinity",   q:"How is it folded?" },
  "Process Impurities": { color:"#E0A33B", icon:"vial",       q:"What's left from the process?" },
  "Binding/Kinetics":   { color:"#6E8AF2", icon:"transfer",   q:"How tightly does it bind?" },
};
const meta = (c) => CAT[c] || { color:"var(--accent)", icon:"methods", q:"" };
const PHASES = ["Pre-IND","IND","Ph1","Ph2","Ph3","BLA"];

const byId = Object.fromEntries(ANALYTICAL_METHODS.map(m => [m.id, m]));
const roleColor = (r) => { const b = METHOD_ROLE_BASE.find(x => r.startsWith(x)); return b ? ROLE_DEFS[b].color : "var(--text-muted)"; };
const riskColor = (r) => r === "High" ? "#E0707A" : r === "Medium" ? "#E0A33B" : "#8A94A6";
// which CQAs a method interrogates (derived from CQA_METHODS)
const methodCqas = (mid) => QUALITY_ATTRIBUTES
  .map(c => { const hit = CQA_METHODS[c.id]?.methods.find(x => x.m === mid); return hit ? { cqa:c, role:hit.role } : null; })
  .filter(Boolean);

// ── deterministic mini-chromatogram from a string seed ──
function seeded(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
function TraceGlyph({ seed, color, w = 300, h = 44, opacity = 0.55, sw = 1.5 }) {
  const rnd = seeded(seed);
  const peaks = 3 + Math.floor(rnd() * 4);
  const centers = Array.from({ length: peaks }, () => ({ mu: 0.05 + rnd() * 0.9, amp: 0.3 + rnd() * 0.7, sd: 0.016 + rnd() * 0.05 }));
  const N = 130; let d = "";
  for (let i = 0; i <= N; i++) {
    const x = i / N; let y = 0;
    centers.forEach(c => { y += c.amp * Math.exp(-((x - c.mu) ** 2) / (2 * c.sd * c.sd)); });
    y = Math.min(1, y);
    const px = (x * w).toFixed(1), py = (h - 3 - y * (h - 7)).toFixed(1);
    d += (i === 0 ? `M${px} ${py}` : ` L${px} ${py}`);
  }
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display:"block" }} aria-hidden="true">
      <line x1="0" y1={h-3} x2={w} y2={h-3} stroke={color} strokeWidth="0.75" opacity="0.25" />
      <path d={d} fill="none" stroke={color} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round" opacity={opacity} />
    </svg>
  );
}
function PhaseStrip({ phases, color }) {
  return (
    <div style={{ display:"flex", gap:3 }} title="Phase applicability: Pre-IND → BLA">
      {PHASES.map(p => <span key={p} title={p} style={{ width:7, height:7, borderRadius:2, background: phases[p] ? color : "var(--hairline)" }} />)}
    </div>
  );
}
function Label({ children, style }) {
  return <div style={{ color:"var(--text-faint)", fontSize:10, fontWeight:800, letterSpacing:".1em",
    textTransform:"uppercase", fontFamily:"ui-monospace, Menlo, monospace", marginBottom:10, ...style }}>{children}</div>;
}
function Block({ color, label, children }) {
  return (
    <div style={{ marginBottom:16 }}>
      <div style={{ color, fontSize:10, fontWeight:800, letterSpacing:".09em", textTransform:"uppercase",
        fontFamily:"ui-monospace, Menlo, monospace", marginBottom:7 }}>{label}</div>
      <p style={{ color:"var(--text-body)", margin:0, fontSize:13, lineHeight:1.7 }}>{children}</p>
    </div>
  );
}
function Chip({ label, color, onClick }) {
  return (
    <button onClick={onClick} style={{
      display:"inline-flex", alignItems:"center", gap:6, cursor:onClick?"pointer":"default",
      background:"var(--panel-2)", border:`1px solid color-mix(in srgb, ${color} 32%, var(--hairline))`,
      color:"var(--text-body)", borderRadius:8, padding:"5px 10px", fontSize:11.5, fontWeight:600, fontFamily:"inherit",
      transition:"all .14s",
    }}
    onMouseEnter={e => { if (onClick) e.currentTarget.style.background = `color-mix(in srgb, ${color} 12%, transparent)`; }}
    onMouseLeave={e => { e.currentTarget.style.background = "var(--panel-2)"; }}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:color, flexShrink:0 }} />{label}
    </button>
  );
}

const MODES = [
  { id:"atlas",      label:"Atlas",         icon:"methods", sub:"22 assays" },
  { id:"matrix",     label:"CQA × Method",  icon:"domains", sub:"orthogonality map" },
  { id:"validation", label:"ICH Q2",        icon:"shieldcheck", sub:"validation" },
  { id:"strategy",   label:"Strategy",      icon:"timeline", sub:"phase & role" },
];

export default function MethodsView({ navigate }) {
  const [mode, setMode] = useState("atlas");
  // atlas
  const [catFilter, setCatFilter] = useState("All");
  const [activeMethod, setActiveMethod] = useState(null);
  const [search, setSearch] = useState("");
  const [detailTab, setDetailTab] = useState("about");
  // matrix
  const [activeCqa, setActiveCqa] = useState(QUALITY_ATTRIBUTES[0].id);
  // validation
  const [activeChar, setActiveChar] = useState("spec");

  const openMethod = (id) => { setMode("atlas"); setCatFilter("All"); setSearch(""); setActiveMethod(id); setDetailTab("about"); window.scrollTo({ top:0, behavior:"smooth" }); };
  const openCqa = (id) => { setMode("matrix"); setActiveCqa(id); };

  return (
    <div style={{ maxWidth:1360, margin:"0 auto", padding:"28px 24px 56px" }}>
      <LiquidHeader eyebrow="ANALYTICAL WORKBENCH · 22 ASSAYS · 17 CQAs" icon={<Icon name="wave" size={30} sw={1.6} />}
        title="Analytical Methods"
        subtitle="Not just a catalogue of assays — the reasoning that connects them: which method answers which question, why orthogonality matters, how each is validated, and when it's run." />

      {/* mode bar */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:26 }}>
        {MODES.map(m => {
          const on = mode === m.id;
          return (
            <button key={m.id} onClick={() => setMode(m.id)} style={{
              display:"flex", alignItems:"center", gap:10, cursor:"pointer", textAlign:"left", fontFamily:"inherit",
              background: on ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "var(--panel)",
              border:`1px solid ${on ? "var(--accent)" : "var(--hairline)"}`,
              borderRadius:12, padding:"9px 15px", transition:"all .16s",
            }}>
              <span style={{ color: on ? "var(--accent)" : "var(--text-muted)", display:"flex" }}><Icon name={m.icon} size={18} sw={1.7} /></span>
              <span>
                <span style={{ display:"block", color: on ? "var(--text-h)" : "var(--text-sec)", fontWeight:700, fontSize:13.5, lineHeight:1.1 }}>{m.label}</span>
                <span style={{ color:"var(--text-faint)", fontSize:10, fontFamily:"ui-monospace, Menlo, monospace" }}>{m.sub}</span>
              </span>
            </button>
          );
        })}
      </div>

      {mode === "atlas" && (
        <Atlas {...{ catFilter, setCatFilter, activeMethod, setActiveMethod, search, setSearch, detailTab, setDetailTab, navigate, openCqa }} />
      )}
      {mode === "matrix" && <CqaMatrix {...{ activeCqa, setActiveCqa, openMethod }} />}
      {mode === "validation" && <Validation {...{ activeChar, setActiveChar, openMethod }} />}
      {mode === "strategy" && <Strategy {...{ openMethod }} />}
    </div>
  );
}

/* ───────────────────────── ATLAS ───────────────────────── */
function Atlas({ catFilter, setCatFilter, activeMethod, setActiveMethod, search, setSearch, detailTab, setDetailTab, navigate, openCqa }) {
  const categories = ["All", ...new Set(ANALYTICAL_METHODS.map(m => m.category))];
  const q = search.trim().toLowerCase();
  const filtered = ANALYTICAL_METHODS.filter(m =>
    (catFilter === "All" || m.category === catFilter) &&
    (!q || m.name.toLowerCase().includes(q) || m.abbreviation.toLowerCase().includes(q) ||
      m.purpose.toLowerCase().includes(q) || m.category.toLowerCase().includes(q))
  );
  const method = activeMethod ? byId[activeMethod] : null;
  const mc = method ? meta(method.category) : null;
  const ex = method ? METHOD_EXTRAS[method.id] : null;
  const select = (id) => { setActiveMethod(prev => prev === id ? null : id); setDetailTab("about"); };
  const countFor = (c) => c === "All" ? ANALYTICAL_METHODS.length : ANALYTICAL_METHODS.filter(m => m.category === c).length;

  return (
    <>
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"center", marginBottom:22 }}>
        <div style={{ display:"flex", gap:7, flexWrap:"wrap", flex:1, minWidth:0 }}>
          {categories.map(c => {
            const on = catFilter === c, m = c === "All" ? null : meta(c), col = m ? m.color : "var(--accent)";
            return (
              <button key={c} onClick={() => { setCatFilter(c); setActiveMethod(null); }} style={{
                display:"flex", alignItems:"center", gap:7, cursor:"pointer", fontFamily:"inherit",
                background: on ? `color-mix(in srgb, ${col} 13%, transparent)` : "var(--panel)",
                border:`1px solid ${on ? col : "var(--hairline)"}`, color: on ? col : "var(--text-sec)",
                borderRadius:999, padding:"6px 13px 6px 11px", fontSize:12, fontWeight:600, transition:"all .16s",
              }}>
                {m ? <span style={{ color:col, display:"flex" }}><Icon name={m.icon} size={14} sw={1.7} /></span>
                   : <span style={{ width:7, height:7, borderRadius:"50%", background: on ? col : "var(--text-faint)" }} />}
                <span>{c}</span>
                <span style={{ fontFamily:"ui-monospace, Menlo, monospace", fontSize:10, opacity:0.7, color: on ? col : "var(--text-faint)" }}>{countFor(c)}</span>
              </button>
            );
          })}
        </div>
        <div style={{ position:"relative", minWidth:230 }}>
          <span style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", color:"var(--text-faint)", display:"flex" }}><Icon name="glossary" size={14} sw={1.6} /></span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search assay, abbreviation, attribute…"
            style={{ width:"100%", background:"var(--panel)", border:"1px solid var(--hairline)", borderRadius:999, padding:"8px 14px 8px 32px", color:"var(--text-body)", fontSize:13, outline:"none" }} />
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns: method ? "minmax(0, 300px) 1fr" : "1fr", gap:22, alignItems:"start" }}>
        {method ? (
          <div style={{ display:"flex", flexDirection:"column", gap:6, position:"sticky", top:70, maxHeight:"calc(100vh - 90px)", overflowY:"auto" }}>
            {filtered.map(m => {
              const mm = meta(m.category), on = m.id === activeMethod;
              return (
                <button key={m.id} onClick={() => select(m.id)} style={{
                  display:"flex", alignItems:"center", gap:11, textAlign:"left", cursor:"pointer", fontFamily:"inherit",
                  background: on ? `color-mix(in srgb, ${mm.color} 11%, transparent)` : "transparent",
                  border:`1px solid ${on ? mm.color : "transparent"}`, borderLeft:`3px solid ${on ? mm.color : "transparent"}`,
                  borderRadius:10, padding:"9px 12px", transition:"all .14s",
                }}
                onMouseEnter={e => { if (!on) e.currentTarget.style.background = "var(--panel)"; }}
                onMouseLeave={e => { if (!on) e.currentTarget.style.background = "transparent"; }}>
                  <span style={{ color:mm.color, display:"flex", flexShrink:0 }}><Icon name={mm.icon} size={16} sw={1.7} /></span>
                  <span style={{ minWidth:0, flex:1 }}>
                    <span style={{ display:"block", color:"var(--text-h)", fontWeight:700, fontSize:13, lineHeight:1.25, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{m.name}</span>
                    <span style={{ color: on ? mm.color : "var(--text-faint)", fontSize:10, fontFamily:"ui-monospace, Menlo, monospace" }}>{m.abbreviation}</span>
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(290px, 1fr))", gap:14 }}>
            {filtered.map(m => {
              const mm = meta(m.category), ex2 = METHOD_EXTRAS[m.id];
              return (
                <button key={m.id} className="card-hover" onClick={() => select(m.id)} style={{
                  display:"flex", flexDirection:"column", textAlign:"left", cursor:"pointer", overflow:"hidden", fontFamily:"inherit",
                  background:"var(--panel)", border:"1px solid var(--hairline)", borderLeft:`3px solid ${mm.color}`, borderRadius:14, transition:"all .18s",
                }}>
                  <div style={{ padding:"14px 16px 0", flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:11 }}>
                      <span style={{ display:"flex", alignItems:"center", gap:7, color:mm.color, fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", fontFamily:"ui-monospace, Menlo, monospace" }}>
                        <Icon name={mm.icon} size={14} sw={1.7} />{m.category}
                      </span>
                      <PhaseStrip phases={m.phases} color={mm.color} />
                    </div>
                    <div style={{ color:mm.color, fontSize:18, fontWeight:800, lineHeight:1.1, fontFamily:"ui-monospace, Menlo, monospace", letterSpacing:"-.01em", marginBottom:4 }}>{m.abbreviation}</div>
                    <div style={{ color:"var(--text-h)", fontWeight:700, fontSize:14, lineHeight:1.25, marginBottom:6 }}>{m.name}</div>
                    <p style={{ color:"var(--text-sec)", fontSize:12, lineHeight:1.55, margin:"0 0 10px", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{m.purpose}</p>
                    {ex2 && <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:10 }}>
                      {ex2.role.slice(0,2).map(r => <span key={r} style={{ fontSize:9.5, fontWeight:700, padding:"2px 7px", borderRadius:6, fontFamily:"ui-monospace, Menlo, monospace", background:`color-mix(in srgb, ${roleColor(r)} 13%, transparent)`, color:roleColor(r) }}>{r}</span>)}
                    </div>}
                  </div>
                  <div style={{ opacity:0.7, padding:"0 4px" }}><TraceGlyph seed={m.id} color={mm.color} h={36} opacity={0.5} /></div>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"48px 0", color:"var(--text-muted)" }}>
                <div style={{ display:"inline-flex", color:"var(--text-faint)", marginBottom:10 }}><Icon name="glossary" size={30} sw={1.4} /></div>
                <p style={{ margin:0, fontSize:14 }}>No assays match — try a different lens or search.</p>
              </div>
            )}
          </div>
        )}

        {method && mc && (
          <div className="panel-enter" style={{
            background:"var(--panel)", border:`1px solid color-mix(in srgb, ${mc.color} 38%, var(--hairline))`, borderRadius:18,
            overflow:"hidden", position:"sticky", top:70, maxHeight:"calc(100vh - 90px)", overflowY:"auto",
            boxShadow:`0 18px 50px color-mix(in srgb, ${mc.color} 12%, transparent)`,
          }}>
            <div style={{ position:"relative", padding:"20px 22px 0", background:`linear-gradient(160deg, color-mix(in srgb, ${mc.color} 12%, transparent), transparent 70%)`, borderBottom:"1px solid var(--hairline)" }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
                <span style={{ display:"flex", alignItems:"center", gap:8, color:mc.color, fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", fontFamily:"ui-monospace, Menlo, monospace" }}>
                  <Icon name={mc.icon} size={15} sw={1.7} />{method.category}
                </span>
                <button onClick={() => setActiveMethod(null)} style={{ background:"var(--panel-2)", border:"1px solid var(--hairline)", color:"var(--text-muted)", cursor:"pointer", fontSize:13, padding:"3px 9px", lineHeight:1, borderRadius:8, flexShrink:0 }}>✕</button>
              </div>
              <div style={{ color:mc.color, fontSize:13, fontWeight:800, fontFamily:"ui-monospace, Menlo, monospace", margin:"12px 0 3px" }}>{method.abbreviation}</div>
              <h3 style={{ color:"var(--text-h)", margin:"0 0 4px", fontSize:21, fontWeight:850, lineHeight:1.15 }}>{method.name}</h3>
              <div style={{ color:"var(--text-sec)", fontSize:12, lineHeight:1.4, marginBottom:8 }}>{method.fullName}</div>
              <div style={{ color:"var(--text-muted)", fontSize:11, fontStyle:"italic", marginBottom:4 }}>{mc.q}</div>
              <div style={{ margin:"6px -22px 0", opacity:0.9 }}><TraceGlyph seed={method.id} color={mc.color} h={40} opacity={0.6} sw={1.6} /></div>
            </div>

            {/* logistics facts */}
            {ex && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:1, background:"var(--hairline)", borderBottom:"1px solid var(--hairline)" }}>
                {[{ k:"ICH Q2 class", v:ex.q2 }, { k:"Throughput", v:ex.throughput }, { k:"Sample need", v:ex.sample }].map(f => (
                  <div key={f.k} style={{ background:"var(--panel)", padding:"9px 12px" }}>
                    <div style={{ color:"var(--text-faint)", fontSize:8.5, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", fontFamily:"ui-monospace, Menlo, monospace", marginBottom:3 }}>{f.k}</div>
                    <div style={{ color:"var(--text-h)", fontWeight:700, fontSize:11.5, lineHeight:1.3 }}>{f.v}</div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 16px", background:"color-mix(in srgb, var(--accent-2) 9%, transparent)", borderBottom:"1px solid var(--hairline)" }}>
              <span style={{ color:"var(--accent-2)", display:"flex" }}><Icon name="qbd" size={16} sw={1.7} /></span>
              <div><div style={{ color:"var(--accent-2)", fontSize:9, fontWeight:800, letterSpacing:".09em", fontFamily:"ui-monospace, Menlo, monospace" }}>CQA LINKAGE</div>
                <div style={{ color:"var(--text-body)", fontSize:12.5, fontWeight:600, marginTop:1 }}>{method.cqaLink}</div></div>
            </div>

            <div style={{ display:"flex", gap:2, padding:"10px 12px 0", borderBottom:"1px solid var(--hairline)" }}>
              {[{ id:"about", label:"About" }, { id:"protocol", label:"Protocol" }, { id:"parameters", label:"Parameters" }, { id:"orthogonality", label:"Orthogonality" }, { id:"regulatory", label:"Regulatory" }].map(t => {
                const on = detailTab === t.id;
                return <button key={t.id} onClick={() => setDetailTab(t.id)} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", borderBottom: on ? `2px solid ${mc.color}` : "2px solid transparent", color: on ? "var(--text-h)" : "var(--text-muted)", padding:"8px 10px", fontWeight:700, fontSize:12, transition:"all .15s" }}>{t.label}</button>;
              })}
            </div>

            <div style={{ padding:"18px 20px 24px" }}>
              {detailTab === "about" && (<>
                {ex && <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
                  {ex.role.map(r => <span key={r} style={{ fontSize:10.5, fontWeight:700, padding:"3px 9px", borderRadius:7, fontFamily:"ui-monospace, Menlo, monospace", background:`color-mix(in srgb, ${roleColor(r)} 14%, transparent)`, color:roleColor(r), border:`1px solid color-mix(in srgb, ${roleColor(r)} 35%, transparent)` }}>{r}</span>)}
                </div>}
                <div style={{ marginBottom:16 }}>
                  <Label>Phase applicability</Label>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {PHASES.map(p => <span key={p} style={{ fontSize:11, fontWeight:700, padding:"3px 9px", borderRadius:8, fontFamily:"ui-monospace, Menlo, monospace", background: method.phases[p] ? `color-mix(in srgb, ${mc.color} 14%, transparent)` : "var(--panel-2)", color: method.phases[p] ? mc.color : "var(--text-faint)", border:`1px solid ${method.phases[p] ? `color-mix(in srgb, ${mc.color} 40%, transparent)` : "var(--hairline)"}` }}>{p}</span>)}
                  </div>
                </div>
                <Block color={mc.color} label="Purpose & application">{method.purpose}</Block>
                <Block color="var(--accent)" label="Scientific principle">{method.principle}</Block>
                {ex && <div style={{ background:"color-mix(in srgb, var(--accent-2) 8%, transparent)", border:"1px solid color-mix(in srgb, var(--accent-2) 28%, var(--hairline))", borderRadius:11, padding:"12px 14px", marginBottom:16 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:6 }}>
                    <span style={{ color:"var(--accent-2)", display:"flex" }}><Icon name="bolt" size={14} sw={1.8} /></span>
                    <span style={{ color:"var(--accent-2)", fontSize:9.5, fontWeight:800, letterSpacing:".1em", fontFamily:"ui-monospace, Menlo, monospace" }}>ANALYST'S PEARL</span>
                  </div>
                  <p style={{ color:"var(--text-body)", margin:0, fontSize:12.5, lineHeight:1.65 }}>{ex.pearl}</p>
                </div>}
                <div>
                  <Label>Detects / measures</Label>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                    {method.detects.map((d, i) => <span key={i} style={{ background:"var(--panel-2)", color:"var(--text-body)", border:`1px solid color-mix(in srgb, ${mc.color} 30%, var(--hairline))`, borderRadius:20, padding:"4px 11px", fontSize:12, lineHeight:1.4 }}>{d}</span>)}
                  </div>
                </div>
              </>)}

              {detailTab === "protocol" && (<>
                <Label>Step-by-step procedure</Label>
                {(METHOD_STEPS[method.id] || ["Method steps not yet defined."]).map((step, i) => (
                  <div key={i} style={{ display:"flex", gap:12, marginBottom:9, alignItems:"flex-start" }}>
                    <div style={{ flexShrink:0, width:24, height:24, borderRadius:"50%", background:`color-mix(in srgb, ${mc.color} 16%, transparent)`, border:`1.5px solid color-mix(in srgb, ${mc.color} 45%, transparent)`, display:"flex", alignItems:"center", justifyContent:"center", color:mc.color, fontSize:10, fontWeight:800, fontFamily:"ui-monospace, Menlo, monospace" }}>{i+1}</div>
                    <div style={{ background:"var(--panel-2)", borderRadius:9, padding:"9px 13px", flex:1, border:"1px solid var(--hairline)", fontSize:12.5, color:"var(--text-body)", lineHeight:1.6 }}>{step}</div>
                  </div>
                ))}
              </>)}

              {detailTab === "parameters" && (<>
                <Label>Key assay parameters</Label>
                <div style={{ background:"var(--panel-2)", borderRadius:11, overflow:"hidden", border:"1px solid var(--hairline)", marginBottom:16 }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12.5 }}><tbody>
                    {method.parameters.map((p, i) => (
                      <tr key={p.name} style={{ borderBottom: i < method.parameters.length-1 ? "1px solid var(--hairline)" : "none" }}>
                        <td style={{ color:"var(--text-sec)", padding:"9px 14px", fontWeight:700, width:"42%", verticalAlign:"top" }}>{p.name}</td>
                        <td style={{ color:"var(--text-body)", padding:"9px 14px", fontFamily:"ui-monospace, Menlo, monospace", fontSize:11.5, lineHeight:1.5 }}>{p.typical}</td>
                      </tr>
                    ))}
                  </tbody></table>
                </div>
                <Label>Key considerations</Label>
                <ul style={{ margin:0, paddingLeft:0, listStyle:"none" }}>
                  {method.keyConsiderations.map((k, i) => (
                    <li key={i} style={{ display:"flex", gap:9, marginBottom:8, color:"var(--text-body)", fontSize:12.5, lineHeight:1.6 }}>
                      <span style={{ flexShrink:0, marginTop:7, width:5, height:5, borderRadius:"50%", background:mc.color }} /><span>{k}</span>
                    </li>
                  ))}
                </ul>
              </>)}

              {detailTab === "orthogonality" && (<>
                <Label>Critical attributes this assay interrogates</Label>
                <p style={{ color:"var(--text-muted)", fontSize:11.5, margin:"-4px 0 14px", lineHeight:1.55 }}>No single method owns a CQA outright — here's where this one sits, and the assays that confirm it independently.</p>
                {methodCqas(method.id).length === 0 && <p style={{ color:"var(--text-muted)", fontSize:12.5 }}>Not mapped to a primary CQA.</p>}
                {methodCqas(method.id).map(({ cqa, role }) => {
                  const g = ATTR_GROUPS[cqa.group];
                  const partners = CQA_METHODS[cqa.id].methods.filter(x => x.m !== method.id);
                  return (
                    <div key={cqa.id} style={{ background:"var(--panel-2)", border:"1px solid var(--hairline)", borderRadius:12, padding:"12px 14px", marginBottom:10 }}>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8, marginBottom:8 }}>
                        <button onClick={() => openCqa(cqa.id)} style={{ display:"flex", alignItems:"center", gap:8, background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", padding:0 }}>
                          <span style={{ color:g.color, display:"flex" }}><Icon name={g.icon} size={15} sw={1.7} /></span>
                          <span style={{ color:"var(--text-h)", fontWeight:700, fontSize:13 }}>{cqa.name}</span>
                        </button>
                        <RolePill role={role} />
                      </div>
                      {partners.length > 0 && <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        <span style={{ color:"var(--text-faint)", fontSize:10.5, alignSelf:"center", fontFamily:"ui-monospace, Menlo, monospace" }}>orthogonal ▸</span>
                        {partners.map(p => <span key={p.m} style={{ fontSize:10.5, fontWeight:700, padding:"2px 8px", borderRadius:6, fontFamily:"ui-monospace, Menlo, monospace", background:"var(--panel)", border:`1px solid color-mix(in srgb, ${roleColor2(p.role)} 35%, var(--hairline))`, color:"var(--text-sec)" }}>{byId[p.m]?.abbreviation}</span>)}
                      </div>}
                    </div>
                  );
                })}
              </>)}

              {detailTab === "regulatory" && (<>
                <Label>FDA / EMA expectation</Label>
                <div style={{ background:"color-mix(in srgb, var(--accent) 8%, transparent)", border:"1px solid color-mix(in srgb, var(--accent) 30%, var(--hairline))", borderRadius:11, padding:"13px 15px", marginBottom:16 }}>
                  <p style={{ color:"var(--text-body)", margin:0, fontSize:13, lineHeight:1.7 }}>{method.regulatoryNote}</p>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  {[{ label:"CTD Section", value:method.ctdSection, to:"ctd", cta:"Open CTD Navigator" }, { label:"ICH Reference", value:method.ichRef, to:"ich", cta:"Open ICH Guidelines" }].map(b => (
                    <button key={b.label} onClick={() => navigate && navigate(b.to)} style={{ background:"var(--panel-2)", borderRadius:11, padding:"12px 14px", border:"1px solid var(--hairline)", cursor:navigate?"pointer":"default", textAlign:"left", fontFamily:"inherit", transition:"all .15s" }}
                      onMouseEnter={e => { if (navigate) e.currentTarget.style.borderColor = mc.color; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--hairline)"; }}>
                      <div style={{ color:"var(--text-faint)", fontSize:9, fontWeight:700, letterSpacing:".09em", textTransform:"uppercase", fontFamily:"ui-monospace, Menlo, monospace", marginBottom:5 }}>{b.label}</div>
                      <div style={{ color:"var(--text-h)", fontWeight:700, fontSize:13 }}>{b.value}</div>
                      {navigate && <div style={{ color:"var(--accent)", fontSize:10.5, marginTop:5 }}>{b.cta} →</div>}
                    </button>
                  ))}
                </div>
              </>)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const roleColor2 = (r) => r === "primary" ? "var(--accent)" : r === "orthogonal" ? "var(--accent-2)" : "#8A94A6";
function RolePill({ role }) {
  const map = { primary:{ c:"var(--accent)", t:"PRIMARY" }, orthogonal:{ c:"var(--accent-2)", t:"ORTHOGONAL" }, supporting:{ c:"#8A94A6", t:"SUPPORTING" } };
  const r = map[role] || map.supporting;
  return <span style={{ fontSize:9, fontWeight:800, letterSpacing:".08em", padding:"2px 8px", borderRadius:6, fontFamily:"ui-monospace, Menlo, monospace", background:`color-mix(in srgb, ${r.c} 14%, transparent)`, color:r.c, whiteSpace:"nowrap" }}>{r.t}</span>;
}

/* ─────────────────── CQA × METHOD MATRIX ─────────────────── */
function CqaMatrix({ activeCqa, setActiveCqa, openMethod }) {
  const detailRef = useRef(null);
  const cqa = QUALITY_ATTRIBUTES.find(c => c.id === activeCqa);
  const g = ATTR_GROUPS[cqa.group];
  const entries = CQA_METHODS[cqa.id];
  const grouped = { primary:[], orthogonal:[], supporting:[] };
  entries.methods.forEach(e => grouped[e.role].push(e));
  const cellFor = (cid, mid) => CQA_METHODS[cid].methods.find(x => x.m === mid)?.role || null;
  const selectRow = (id) => { setActiveCqa(id); if (window.innerWidth < 900) setTimeout(() => detailRef.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 50); };

  return (
    <>
      {/* legend */}
      <div style={{ display:"flex", gap:18, flexWrap:"wrap", alignItems:"center", marginBottom:14, fontSize:11.5, color:"var(--text-sec)" }}>
        <span style={{ color:"var(--text-faint)", fontFamily:"ui-monospace, Menlo, monospace", fontSize:10.5, letterSpacing:".06em" }}>17 ATTRIBUTES × 22 METHODS</span>
        {[["primary","Primary"],["orthogonal","Orthogonal"],["supporting","Supporting"]].map(([r,l]) => (
          <span key={r} style={{ display:"flex", alignItems:"center", gap:7 }}><Dot role={r} />{l}</span>
        ))}
      </div>

      {/* heatmap */}
      <div style={{ overflowX:"auto", border:"1px solid var(--hairline)", borderRadius:14, background:"var(--panel)", marginBottom:26 }}>
        <table style={{ borderCollapse:"collapse", width:"100%" }}>
          <thead>
            <tr>
              <th style={{ position:"sticky", left:0, zIndex:3, background:"var(--panel)", borderBottom:"1px solid var(--hairline)", borderRight:"1px solid var(--hairline)", minWidth:172, textAlign:"left", padding:"8px 12px", color:"var(--text-faint)", fontSize:9, fontWeight:800, letterSpacing:".1em", textTransform:"uppercase", fontFamily:"ui-monospace, Menlo, monospace" }}>Attribute ↓ / Method →</th>
              {ANALYTICAL_METHODS.map(m => (
                <th key={m.id} onClick={() => openMethod(m.id)} title={`${m.name} — open`} style={{ borderBottom:"1px solid var(--hairline)", cursor:"pointer", height:104, width:28, padding:0, verticalAlign:"bottom" }}>
                  <div style={{ writingMode:"vertical-rl", transform:"rotate(180deg)", margin:"0 auto 8px", color:"var(--text-sec)", fontSize:10.5, fontWeight:700, fontFamily:"ui-monospace, Menlo, monospace", whiteSpace:"nowrap", maxHeight:90, overflow:"hidden" }}>{m.abbreviation}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {QUALITY_ATTRIBUTES.map(c => {
              const cg = ATTR_GROUPS[c.group], on = c.id === activeCqa;
              return (
                <tr key={c.id} style={{ background: on ? `color-mix(in srgb, ${cg.color} 9%, transparent)` : "transparent" }}>
                  <td onClick={() => selectRow(c.id)} style={{ position:"sticky", left:0, zIndex:2, background: on ? "color-mix(in srgb, var(--panel-2) 100%, transparent)" : "var(--panel)", borderRight:`1px solid var(--hairline)`, borderBottom:"1px solid var(--hairline)", borderLeft:`3px solid ${on ? cg.color : "transparent"}`, cursor:"pointer", padding:"7px 12px", minWidth:172 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ color:cg.color, display:"flex", flexShrink:0 }}><Icon name={cg.icon} size={14} sw={1.7} /></span>
                      <span style={{ color: on ? "var(--text-h)" : "var(--text-sec)", fontSize:12, fontWeight: on ? 700 : 600, lineHeight:1.2 }}>{c.name}</span>
                    </div>
                  </td>
                  {ANALYTICAL_METHODS.map(m => {
                    const role = cellFor(c.id, m.id);
                    return (
                      <td key={m.id} onClick={() => selectRow(c.id)} title={role ? `${c.name} × ${m.abbreviation}: ${role}` : ""} style={{ borderBottom:"1px solid var(--hairline)", textAlign:"center", padding:0, height:34, cursor:"pointer" }}>
                        {role ? <span style={{ display:"inline-flex" }}><Dot role={role} /></span> : <span style={{ display:"inline-block", width:4, height:4, borderRadius:"50%", background:"var(--hairline)", opacity:.6 }} />}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* selected CQA detail */}
      <div ref={detailRef} style={{ display:"grid", gridTemplateColumns:"minmax(0, 360px) 1fr", gap:22, alignItems:"start" }}>
        <div style={{ background:"var(--panel)", border:`1px solid color-mix(in srgb, ${g.color} 38%, var(--hairline))`, borderRadius:18, overflow:"hidden", position:"sticky", top:70 }}>
          <div style={{ padding:"18px 20px", background:`linear-gradient(160deg, color-mix(in srgb, ${g.color} 12%, transparent), transparent 70%)`, borderBottom:"1px solid var(--hairline)" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <span style={{ display:"flex", alignItems:"center", gap:8, color:g.color, fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", fontFamily:"ui-monospace, Menlo, monospace" }}><Icon name={g.icon} size={15} sw={1.7} />{cqa.group}</span>
              <span style={{ fontSize:9.5, fontWeight:800, letterSpacing:".06em", padding:"3px 9px", borderRadius:7, fontFamily:"ui-monospace, Menlo, monospace", background:`color-mix(in srgb, ${riskColor(cqa.risk)} 15%, transparent)`, color:riskColor(cqa.risk), border:`1px solid color-mix(in srgb, ${riskColor(cqa.risk)} 38%, transparent)` }}>{cqa.risk} RISK</span>
            </div>
            <h3 style={{ color:"var(--text-h)", margin:0, fontSize:20, fontWeight:850, lineHeight:1.15 }}>{cqa.name}</h3>
          </div>
          <div style={{ padding:"16px 20px 20px" }}>
            <Block color={g.color} label="What it is">{cqa.what}</Block>
            <Block color="var(--accent)" label="Why it matters">{cqa.why}</Block>
            <Block color={riskColor(cqa.risk)} label="What drives it">{cqa.drivers}</Block>
          </div>
        </div>

        <div>
          <div style={{ background:"color-mix(in srgb, var(--accent-2) 9%, transparent)", border:"1px solid color-mix(in srgb, var(--accent-2) 28%, var(--hairline))", borderRadius:12, padding:"13px 15px", marginBottom:18, display:"flex", gap:10 }}>
            <span style={{ color:"var(--accent-2)", display:"flex", flexShrink:0, marginTop:1 }}><Icon name="infinity" size={16} sw={1.8} /></span>
            <div><div style={{ color:"var(--accent-2)", fontSize:9.5, fontWeight:800, letterSpacing:".1em", fontFamily:"ui-monospace, Menlo, monospace", marginBottom:4 }}>WHY ORTHOGONALITY</div>
              <p style={{ color:"var(--text-body)", margin:0, fontSize:12.5, lineHeight:1.65 }}>{entries.ortho}</p></div>
          </div>

          {[["primary","Primary — the spec-defining assay"],["orthogonal","Orthogonal — independent confirmation"],["supporting","Supporting — screen & context"]].map(([role, title]) => grouped[role].length > 0 && (
            <div key={role} style={{ marginBottom:18 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}><Dot role={role} /><span style={{ color:"var(--text-sec)", fontSize:11, fontWeight:700, letterSpacing:".05em", textTransform:"uppercase", fontFamily:"ui-monospace, Menlo, monospace" }}>{title}</span></div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:10 }}>
                {grouped[role].map(e => {
                  const m = byId[e.m], mm = meta(m.category);
                  return (
                    <button key={e.m} onClick={() => openMethod(e.m)} className="card-hover" style={{ textAlign:"left", cursor:"pointer", fontFamily:"inherit", background:"var(--panel)", border:"1px solid var(--hairline)", borderLeft:`3px solid ${mm.color}`, borderRadius:12, padding:"12px 14px", transition:"all .16s" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                        <span style={{ color:mm.color, fontFamily:"ui-monospace, Menlo, monospace", fontWeight:800, fontSize:13 }}>{m.abbreviation}</span>
                        <span style={{ color:"var(--text-faint)", fontSize:11 }}>{m.name}</span>
                      </div>
                      <p style={{ color:"var(--text-body)", margin:0, fontSize:12, lineHeight:1.55 }}>{e.note}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
function Dot({ role }) {
  const c = roleColor2(role);
  if (role === "primary") return <span style={{ width:12, height:12, borderRadius:"50%", background:c, boxShadow:`0 0 0 3px color-mix(in srgb, ${c} 22%, transparent)`, display:"inline-block" }} />;
  if (role === "orthogonal") return <span style={{ width:12, height:12, borderRadius:"50%", border:`2.5px solid ${c}`, display:"inline-block", boxSizing:"border-box" }} />;
  return <span style={{ width:7, height:7, borderRadius:"50%", background:c, opacity:.55, display:"inline-block" }} />;
}

/* ─────────────────── ICH Q2 VALIDATION ─────────────────── */
function Validation({ activeChar, setActiveChar, openMethod }) {
  const ch = Q2_CHARACTERISTICS.find(c => c.id === activeChar);
  return (
    <>
      <div style={{ display:"grid", gridTemplateColumns:"minmax(0, 1.5fr) minmax(0, 1fr)", gap:22, alignItems:"start" }}>
        {/* matrix */}
        <div style={{ overflowX:"auto", border:"1px solid var(--hairline)", borderRadius:14, background:"var(--panel)" }}>
          <table style={{ borderCollapse:"collapse", width:"100%", fontSize:12.5 }}>
            <thead>
              <tr>
                <th style={{ textAlign:"left", padding:"12px 14px", borderBottom:"1px solid var(--hairline)", color:"var(--text-faint)", fontSize:9, fontWeight:800, letterSpacing:".09em", textTransform:"uppercase", fontFamily:"ui-monospace, Menlo, monospace", minWidth:170 }}>Characteristic</th>
                {Q2_CATEGORIES.map(cat => (
                  <th key={cat.id} title={cat.name} style={{ padding:"12px 8px", borderBottom:"1px solid var(--hairline)", color:"var(--text-sec)", fontSize:10.5, fontWeight:700, fontFamily:"ui-monospace, Menlo, monospace", whiteSpace:"nowrap", textAlign:"center" }}>{cat.short}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Q2_CHARACTERISTICS.map(c => {
                const on = c.id === activeChar;
                return (
                  <tr key={c.id} onClick={() => setActiveChar(c.id)} style={{ cursor:"pointer", background: on ? "color-mix(in srgb, var(--accent) 9%, transparent)" : "transparent" }}>
                    <td style={{ padding:"10px 14px", borderBottom:"1px solid var(--hairline)", borderLeft:`3px solid ${on ? "var(--accent)" : "transparent"}`, color: on ? "var(--text-h)" : "var(--text-sec)", fontWeight: on ? 700 : 600 }}>{c.name}</td>
                    {Q2_CATEGORIES.map(cat => (
                      <td key={cat.id} style={{ textAlign:"center", padding:"10px 8px", borderBottom:"1px solid var(--hairline)" }}>
                        {c.applies[cat.id]
                          ? <span style={{ color:"var(--accent-2)", display:"inline-flex" }}><Icon name="exam" size={16} sw={2} /></span>
                          : <span style={{ color:"var(--text-faint)", opacity:.5 }}>—</span>}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* characteristic detail */}
        <div style={{ position:"sticky", top:70 }}>
          <div style={{ background:"var(--panel)", border:"1px solid color-mix(in srgb, var(--accent) 35%, var(--hairline))", borderRadius:16, padding:"18px 20px", marginBottom:16 }}>
            <Label style={{ color:"var(--accent)" }}>ICH Q2(R2) · validation characteristic</Label>
            <h3 style={{ color:"var(--text-h)", margin:"0 0 10px", fontSize:19, fontWeight:850 }}>{ch.name}</h3>
            <p style={{ color:"var(--text-body)", margin:"0 0 14px", fontSize:13, lineHeight:1.7 }}>{ch.def}</p>
            <div style={{ background:"var(--panel-2)", border:"1px solid var(--hairline)", borderRadius:10, padding:"11px 13px" }}>
              <div style={{ color:"var(--text-faint)", fontSize:9, fontWeight:800, letterSpacing:".09em", textTransform:"uppercase", fontFamily:"ui-monospace, Menlo, monospace", marginBottom:5 }}>Typical acceptance</div>
              <p style={{ color:"var(--text-body)", margin:0, fontSize:12.5, lineHeight:1.6 }}>{ch.crit}</p>
            </div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:14 }}>
              <span style={{ color:"var(--text-faint)", fontSize:10.5, alignSelf:"center", fontFamily:"ui-monospace, Menlo, monospace" }}>required for ▸</span>
              {Q2_CATEGORIES.filter(cat => ch.applies[cat.id]).map(cat => <span key={cat.id} style={{ fontSize:10.5, fontWeight:700, padding:"3px 9px", borderRadius:7, background:"color-mix(in srgb, var(--accent-2) 12%, transparent)", color:"var(--accent-2)", fontFamily:"ui-monospace, Menlo, monospace" }}>{cat.short}</span>)}
            </div>
          </div>
          <p style={{ color:"var(--text-muted)", fontSize:11.5, lineHeight:1.6, margin:0 }}>The validation burden is set by what a method <em>is</em>: an identity test needs only specificity (+ robustness), while a quantitative impurity method must prove accuracy, precision, LOQ, linearity and range.</p>
        </div>
      </div>

      {/* categories → methods */}
      <div style={{ marginTop:30 }}>
        <Label>Test categories → your assays</Label>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:14 }}>
          {Q2_CATEGORIES.map(cat => (
            <div key={cat.id} style={{ background:"var(--panel)", border:"1px solid var(--hairline)", borderRadius:14, padding:"15px 16px" }}>
              <div style={{ color:"var(--text-h)", fontWeight:800, fontSize:14, marginBottom:4 }}>{cat.name}</div>
              <p style={{ color:"var(--text-muted)", fontSize:11.5, lineHeight:1.55, margin:"0 0 11px" }}>{cat.desc}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {cat.methods.map(mid => byId[mid] && <Chip key={mid} label={byId[mid].abbreviation} color={meta(byId[mid].category).color} onClick={() => openMethod(mid)} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─────────────────── CONTROL STRATEGY ─────────────────── */
function Strategy({ openMethod }) {
  const methodsForRole = (base) => ANALYTICAL_METHODS.filter(m => (METHOD_EXTRAS[m.id]?.role || []).some(r => r.startsWith(base)));
  return (
    <>
      <Label>Phase-appropriate analytical package</Label>
      <p style={{ color:"var(--text-muted)", fontSize:12.5, margin:"-4px 0 18px", lineHeight:1.6, maxWidth:760 }}>
        The analytical control strategy is not static — it deepens as the program advances from a fit-for-purpose toolkit at Pre-IND to a fully validated, orthogonality-demonstrated package at the BLA.
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:14, marginBottom:34 }}>
        {PHASE_STRATEGY.map((p, i) => (
          <div key={p.phase} style={{ background:"var(--panel)", border:"1px solid var(--hairline)", borderRadius:14, padding:"16px 16px 14px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:12, right:14, color:"var(--hairline)", fontSize:30, fontWeight:900, fontFamily:"ui-monospace, Menlo, monospace", lineHeight:1 }}>{String(i+1).padStart(2,"0")}</div>
            <div style={{ color:"var(--accent)", fontWeight:800, fontSize:15, fontFamily:"ui-monospace, Menlo, monospace", marginBottom:8 }}>{p.phase}</div>
            <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:10 }}>
              {p.emphasis.map(r => <span key={r} style={{ fontSize:9.5, fontWeight:700, padding:"2px 7px", borderRadius:6, fontFamily:"ui-monospace, Menlo, monospace", background:`color-mix(in srgb, ${roleColor(r)} 13%, transparent)`, color:roleColor(r) }}>{r}</span>)}
            </div>
            <p style={{ color:"var(--text-body)", margin:0, fontSize:12, lineHeight:1.6 }}>{p.focus}</p>
          </div>
        ))}
      </div>

      <Label>Assays by role in the control strategy</Label>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:14 }}>
        {METHOD_ROLE_BASE.map(base => {
          const def = ROLE_DEFS[base], list = methodsForRole(base);
          return (
            <div key={base} style={{ background:"var(--panel)", border:`1px solid color-mix(in srgb, ${def.color} 30%, var(--hairline))`, borderTop:`3px solid ${def.color}`, borderRadius:14, padding:"15px 16px" }}>
              <div style={{ color:"var(--text-h)", fontWeight:800, fontSize:14, marginBottom:4 }}>{base}</div>
              <p style={{ color:"var(--text-muted)", fontSize:11.5, lineHeight:1.55, margin:"0 0 12px" }}>{def.desc}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {list.map(m => <Chip key={m.id} label={m.abbreviation} color={meta(m.category).color} onClick={() => openMethod(m.id)} />)}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
