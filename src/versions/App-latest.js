import { useState, useEffect, useMemo, useRef } from "react";
import "./fx.css";
import Dashboard from "./views/Dashboard";
import { LiquidBackdrop } from "./lc";
import { Icon } from "./icons";
import PipelineView   from "./views/PipelineView";
import MethodsView    from "./views/MethodsView";
import QbDView        from "./views/QbDView";
import CTDView        from "./views/CTDView";
import TimelineView   from "./views/TimelineView";
import DomainsView    from "./views/DomainsView";
import ExamView       from "./views/ExamView";
import ICHView        from "./views/ICHView";
import GlossaryView   from "./views/GlossaryView";
import CareerView     from "./views/CareerView";
import NotesView      from "./views/NotesView";
import StabilityView  from "./views/StabilityView";
import OOSView        from "./views/OOSView";
import CaseStudiesView from "./views/CaseStudiesView";
import CompendialView from "./views/CompendialView";
import ExcipientView  from "./views/ExcipientView";
import PathwayView    from "./views/PathwayView";
import BatchRecordView from "./views/BatchRecordView";
import ProgressView   from "./views/ProgressView";
import ViralClearanceView from "./views/ViralClearanceView";
import { DNALogo }    from "./shared";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const LC_VIEWS = ["dashboard","pipeline","methods","qbd","ctd","timeline","domains","ich","glossary","viral"];
const SURFACE_VIEWS = ["methods","qbd","ctd","timeline","domains","ich","glossary","viral"];

const NAV_GROUPS = [
  { id:"learn",    label:"Learn",    color:"#8B79F7", items:[
    { id:"pipeline", label:"Pipeline Explorer" }, { id:"timeline", label:"CMC Timeline" },
    { id:"domains", label:"Domain Q-Bank" }, { id:"ich", label:"ICH Guidelines" }, { id:"glossary", label:"CMC Glossary" },
  ]},
  { id:"science",  label:"Science",  color:"#2DBF9E", items:[
    { id:"methods", label:"Analytical Methods" }, { id:"qbd", label:"QbD / CQA / CPP" }, { id:"viral", label:"Viral Clearance" },
    { id:"stability", label:"Stability Studies" }, { id:"compendial", label:"Compendial Reference" }, { id:"excipient", label:"Excipient Compatibility" },
  ]},
  { id:"tools",    label:"Tools",    color:"#8B79F7", items:[
    { id:"ctd", label:"CTD Navigator" }, { id:"oos", label:"OOS/OOT Investigation" },
    { id:"batch", label:"Batch Record Simulator" }, { id:"cases", label:"Case Studies" },
  ]},
  { id:"practice", label:"Practice", color:"#2DBF9E", items:[
    { id:"exam", label:"Exam Mode" }, { id:"notes", label:"My Notes" },
  ]},
  { id:"career",   label:"Career",   color:"#8B79F7", items:[
    { id:"career", label:"Career & Interviews" }, { id:"pathway", label:"Learning Pathways" }, { id:"progress", label:"My Progress" },
  ]},
];

function Magnetic({ children, strength = 12, style }) {
  const move = (e) => { const el = e.currentTarget, r = el.getBoundingClientRect();
    el.style.transform = `translate(${((e.clientX-(r.left+r.width/2))/r.width)*strength}px, ${((e.clientY-(r.top+r.height/2))/r.height)*strength}px)`; };
  const leave = (e) => { e.currentTarget.style.transform = ""; };
  return <span onMouseMove={move} onMouseLeave={leave} style={{ display:"inline-flex", transition:"transform .3s cubic-bezier(.34,1.55,.5,1)", ...style }}>{children}</span>;
}

// ── ⌘K Command Palette ────────────────────────────────────────
function CommandPalette({ open, onClose, items, onPick }) {
  const [q, setQ] = useState("");
  const [act, setAct] = useState(0);
  const inputRef = useRef(null);
  useEffect(() => { if (open) { setQ(""); setAct(0); setTimeout(() => inputRef.current?.focus(), 30); } }, [open]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase(); if (!s) return items;
    const score = (lab) => { lab = lab.toLowerCase(); if (lab.includes(s)) return 2;
      let i = 0; for (const ch of lab) { if (ch === s[i]) i++; if (i === s.length) return 1; } return 0; };
    return items.map(it => ({ it, sc: score(it.label) })).filter(x => x.sc > 0).sort((a,b) => b.sc - a.sc).map(x => x.it);
  }, [q, items]);
  useEffect(() => { setAct(0); }, [q]);
  if (!open) return null;

  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setAct(a => Math.min(a+1, filtered.length-1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setAct(a => Math.max(a-1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (filtered[act]) onPick(filtered[act]); }
  };

  return (
    <div onClick={e => e.target===e.currentTarget && onClose()}
      style={{ position:"fixed", inset:0, zIndex:1100, background:"color-mix(in srgb, var(--bg-base) 50%, transparent)", backdropFilter:"blur(7px)", display:"flex", alignItems:"flex-start", justifyContent:"center", paddingTop:"11vh" }}>
      <div className="lc-edge" style={{ width:580, maxWidth:"92vw", borderRadius:18, overflow:"hidden", background:"var(--bg-card)", border:"1px solid var(--border)", boxShadow:"var(--shadow-lg)", animation:"lc-pop .2s ease" }}>
        <div style={{ display:"flex", alignItems:"center", gap:11, padding:"15px 18px", borderBottom:"1px solid var(--hairline)" }}>
          <span style={{ color:"var(--accent)", fontSize:15 }}>⌘</span>
          <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)} onKeyDown={onKey} placeholder="Search modules and actions…"
            style={{ flex:1, background:"none", border:"none", outline:"none", color:"var(--text-h)", fontSize:15.5 }}/>
          <span style={{ fontFamily:MONO, fontSize:11, color:"var(--text-faint)", border:"1px solid var(--hairline)", borderRadius:6, padding:"2px 7px" }}>ESC</span>
        </div>
        <div style={{ maxHeight:"min(50vh,400px)", overflowY:"auto", padding:8 }}>
          {filtered.map((it, i) => (
            <button key={it.key} onMouseEnter={() => setAct(i)} onClick={() => onPick(it)}
              style={{ display:"flex", alignItems:"center", gap:12, width:"100%", textAlign:"left", cursor:"pointer", border:"none", borderRadius:11, padding:"10px 12px",
                background: i===act ? "color-mix(in srgb, var(--accent) 14%, transparent)" : "transparent" }}>
              <span style={{ display:"flex", color: i===act ? "var(--accent)" : "var(--text-muted)" }}>{it.icon}</span>
              <span style={{ fontWeight:600, fontSize:13.5, color: i===act ? "var(--accent)" : "var(--text-h)" }}>{it.label}</span>
              <span style={{ marginLeft:"auto", fontFamily:MONO, fontSize:10, color:"var(--text-faint)", letterSpacing:".06em" }}>{it.hint}</span>
            </button>
          ))}
          {filtered.length === 0 && <div style={{ padding:28, textAlign:"center", color:"var(--text-muted)", fontSize:13 }}>No matches for “{q}”</div>}
        </div>
        <div style={{ display:"flex", gap:16, padding:"10px 18px", borderTop:"1px solid var(--hairline)", color:"var(--text-faint)", fontSize:11, fontFamily:MONO }}>
          <span>↑↓ navigate</span><span>⏎ open</span><span>esc close</span>
          <span style={{ marginLeft:"auto" }}>{filtered.length} results</span>
        </div>
      </div>
    </div>
  );
}

// ── Admin Login Modal ─────────────────────────────────────────
function AdminModal({ onLogin, onClose }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err,  setErr]  = useState("");
  const attempt = () => { if (user === "ykacha" && pass === "Yash@123") onLogin(); else setErr("Invalid credentials. Please try again."); };
  return (
    <div style={{ position:"fixed", inset:0, background:"color-mix(in srgb, var(--bg-base) 55%, transparent)", backdropFilter:"blur(6px)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}
      onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="lc-glass lc-edge" style={{ borderRadius:20, padding:32, width:340, maxWidth:"90vw", animation:"lc-pop .3s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:40, marginBottom:8 }}>🔐</div>
          <h3 style={{ color:"var(--text-h)", margin:0, fontSize:18, fontWeight:850 }}>CMC Admin Login</h3>
          <p style={{ color:"var(--text-muted)", margin:"6px 0 0", fontSize:12 }}>Enter credentials to enable admin mode</p>
        </div>
        {[["Username", user, setUser, "text"], ["Password", pass, setPass, "password"]].map(([lbl, val, set, type], i) => (
          <div key={lbl} style={{ marginBottom: i === 0 ? 12 : 16 }}>
            <label style={{ color:"var(--text-sec)", fontSize:12, fontWeight:700, display:"block", marginBottom:5 }}>{lbl}</label>
            <input value={val} onChange={e => set(e.target.value)} type={type} placeholder={lbl} autoFocus={i === 0}
              style={{ width:"100%", background:"var(--input-bg)", border:"1px solid var(--border)", borderRadius:10, padding:"10px 12px", color:"var(--text-h)", fontSize:13, boxSizing:"border-box" }}
              onKeyDown={e => e.key==="Enter" && attempt()}/>
          </div>
        ))}
        {err && <div style={{ color:"#F472B6", fontSize:12, marginBottom:12, textAlign:"center" }}>{err}</div>}
        <button onClick={attempt} className="lc-pill lc-shine" style={{ width:"100%", padding:"12px", fontSize:14, marginBottom:10 }}>Login</button>
        <button onClick={onClose} className="lc-ghost" style={{ width:"100%", padding:"10px", fontSize:13 }}>Cancel</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
export default function App() {
  const [view, setView]           = useState("dashboard");
  const [darkMode, setDarkMode]   = useState(() => localStorage.getItem("cmc-theme") !== "light");
  const [adminMode, setAdminMode] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const [palette, setPalette]     = useState(false);

  const toggleTheme = () => setDarkMode(d => { const n = !d; localStorage.setItem("cmc-theme", n ? "dark" : "light"); return n; });

  const navigate = (id) => {
    setView(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    try { const v = JSON.parse(localStorage.getItem("cmc-visited-views") || "[]");
      if (!v.includes(id)) { v.push(id); localStorage.setItem("cmc-visited-views", JSON.stringify(v)); } } catch { /* ignore */ }
  };

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPalette(p => !p); }
      else if (e.key === "Escape") { setPalette(false); setOpenGroup(null); }
      else if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || "") && !document.activeElement?.isContentEditable) { e.preventDefault(); setPalette(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const paletteItems = [
    { key:"__home", icon:"🏠", label:"Go to Dashboard", hint:"HOME", type:"home" },
    { key:"__theme", icon:"🌓", label:`Switch to ${darkMode ? "light" : "dark"} theme`, hint:"THEME", type:"theme" },
    { key:"__mab", icon:"🧬", label:"Open mAb Mastery", hint:"EXTERNAL", type:"mab" },
    ...NAV_GROUPS.flatMap(g => g.items.map(it => ({ key:it.id, id:it.id, icon:<Icon name={it.id} size={16} />, label:it.label, hint:g.label.toUpperCase(), type:"nav" }))),
  ];
  const pickPalette = (it) => {
    setPalette(false);
    if (it.type === "theme") toggleTheme();
    else if (it.type === "home") navigate("dashboard");
    else if (it.type === "mab") window.open("https://mab.yashkacha.com", "_blank");
    else navigate(it.id);
  };

  const circBtn = { width:38, height:38, borderRadius:"50%", cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, lineHeight:1, background:"var(--panel)", border:"1px solid var(--hairline)", color:"var(--text-h)", transition:"all .2s" };

  return (
    <div data-theme={darkMode ? "dark" : "light"} style={{ minHeight:"100vh", background:"var(--bg-base)", fontFamily:"system-ui,sans-serif", color:"var(--text-body)" }}>

      {LC_VIEWS.includes(view) && <LiquidBackdrop />}
      {openGroup && <div onClick={() => setOpenGroup(null)} style={{ position:"fixed", inset:0, zIndex:198 }} />}
      <CommandPalette open={palette} onClose={() => setPalette(false)} items={paletteItems} onPick={pickPalette} />

      {/* ── Floating glass nav ── */}
      <div style={{ position:"sticky", top:0, zIndex:200, padding:"14px 16px" }}>
        <nav className="main-nav lc-glass lc-edge-soft" style={{ maxWidth:1280, margin:"0 auto", borderRadius:18, height:58, display:"flex", alignItems:"center", gap:6, padding:"0 12px 0 14px" }}>

          <button onClick={() => { navigate("dashboard"); setOpenGroup(null); }} className="logo-btn lc-shine"
            style={{ display:"flex", alignItems:"center", gap:9, background:"none", border:"none", cursor:"pointer", padding:"4px 14px 4px 0", marginRight:4, flexShrink:0, borderRight:"1px solid var(--hairline)", borderRadius:8 }}>
            <span style={{ display:"flex", borderRadius:"50%", padding:2, boxShadow:"0 0 0 1px var(--hairline), 0 4px 14px -4px color-mix(in srgb, var(--accent) 60%, transparent)" }}><DNALogo/></span>
            <div style={{ textAlign:"left" }}>
              <div className="lc-iri-text" style={{ fontWeight:850, fontSize:14.5, whiteSpace:"nowrap", lineHeight:1.05 }}>Yash Kacha</div>
              <div style={{ color:"var(--text-muted)", fontSize:8.5, fontWeight:700, letterSpacing:"0.16em", fontFamily:MONO }}>CMC APP</div>
            </div>
          </button>

          <div style={{ display:"flex", gap:4, flex:1 }}>
            {NAV_GROUPS.map(group => {
              const isActive = view !== "dashboard" && group.items.some(item => item.id === view);
              const isOpen   = openGroup === group.id;
              return (
                <div key={group.id} style={{ position:"relative" }}>
                  <button onClick={() => setOpenGroup(isOpen ? null : group.id)} className={isActive ? "lc-pill lc-shine" : "lc-ghost lc-shine"}
                    style={{ padding:"8px 13px", fontSize:13.5, display:"flex", alignItems:"center", gap:7, whiteSpace:"nowrap",
                      ...(isOpen && !isActive ? { background:"var(--panel-2)", borderColor:"var(--border-bright)" } : {}) }}>
                    <Icon name={group.id} size={16} /><span className="hide-mobile">{group.label}</span>
                    <span style={{ fontSize:8, opacity:.6, transition:"transform .2s", transform: isOpen ? "rotate(180deg)" : "none" }}>▾</span>
                  </button>

                  {isOpen && (
                    <div className="lc-edge" style={{ position:"absolute", top:"calc(100% + 10px)", left:0, borderRadius:16, padding:"7px", zIndex:300, minWidth:230, background:"var(--bg-raised)", border:"1px solid var(--border)", boxShadow:"var(--shadow-lg)", animation:"lc-dropin .22s cubic-bezier(.22,1,.36,1)" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:7, padding:"6px 12px 9px", color:group.color }}>
                        <Icon name={group.id} size={13} />
                        <span style={{ fontFamily:MONO, fontSize:10, fontWeight:800, letterSpacing:"0.14em" }}>{group.label.toUpperCase()}</span>
                      </div>
                      {group.items.map(item => {
                        const on = view === item.id;
                        return (
                          <button key={item.id} onClick={() => { navigate(item.id); setOpenGroup(null); }} className="lc-shine"
                            style={{ display:"flex", alignItems:"center", gap:11, width:"100%", borderRadius:11, background: on ? "color-mix(in srgb, var(--accent) 14%, transparent)" : "transparent", border:"none", cursor:"pointer", padding:"10px 12px", fontSize:13, fontWeight: on ? 750 : 500, textAlign:"left", color: on ? "var(--accent)" : "var(--text-body)", transition:"background .15s", borderLeft: on ? "2px solid var(--accent)" : "2px solid transparent" }}
                            onMouseEnter={e => { if (!on) e.currentTarget.style.background = "var(--panel)"; }}
                            onMouseLeave={e => { if (!on) e.currentTarget.style.background = "transparent"; }}>
                            <span style={{ display:"flex", color: on ? "var(--accent)" : "var(--text-muted)" }}><Icon name={item.id} size={17} /></span>
                            <span>{item.label}</span>
                            {on && <span style={{ marginLeft:"auto", fontSize:11, color:"var(--accent)" }}>●</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ⌘K search */}
          <button onClick={() => setPalette(true)} className="lc-ghost lc-shine" style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 12px", fontSize:12.5, flexShrink:0, color:"var(--text-muted)" }}>
            <span style={{ fontSize:13 }}>⌕</span><span className="hide-mobile">Search</span>
            <span style={{ fontFamily:MONO, fontSize:10.5, border:"1px solid var(--hairline)", borderRadius:5, padding:"1px 5px" }}>⌘K</span>
          </button>

          <Magnetic strength={10}>
            <button onClick={() => window.open("https://mab.yashkacha.com", "_blank")} className="lc-gloss lc-shine"
              style={{ position:"relative", overflow:"hidden", border:"none", cursor:"pointer", borderRadius:999, padding:"8px 16px", fontWeight:750, fontSize:13, color:"#fff", whiteSpace:"nowrap", flexShrink:0, marginRight:6, background:"linear-gradient(135deg,#0ea5e9,#14b8a6)", boxShadow:"inset 0 1px 0 rgba(255,255,255,.4), 0 8px 22px -8px rgba(20,184,166,.7)" }}>
              🧬 mAb
            </button>
          </Magnetic>

          <button onClick={toggleTheme} className="theme-toggle lc-shine" style={circBtn}
            onMouseEnter={e => e.currentTarget.style.background = "var(--panel-2)"} onMouseLeave={e => e.currentTarget.style.background = "var(--panel)"}>
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button onClick={() => adminMode ? setAdminMode(false) : setShowAdminModal(true)} title={adminMode ? "Admin Mode Active — Click to logout" : "Admin Login"} className="lc-shine"
            style={{ ...circBtn, marginLeft:2, background: adminMode ? "color-mix(in srgb, var(--accent-2) 18%, transparent)" : "var(--panel)", border:`1px solid ${adminMode ? "var(--accent-2)" : "var(--hairline)"}`, color: adminMode ? "var(--accent-2)" : "var(--text-muted)" }}>
            {adminMode ? "🔓" : "🔒"}
          </button>
        </nav>
      </div>

      {adminMode && (
        <div style={{ background:"color-mix(in srgb, var(--accent-2) 12%, transparent)", borderBottom:"1px solid color-mix(in srgb, var(--accent-2) 35%, transparent)", padding:"6px 16px", display:"flex", alignItems:"center", gap:12, fontSize:12, position:"relative", zIndex:5 }}>
          <span style={{ color:"var(--accent-2)", fontWeight:800 }}>⚡ Admin Mode Active</span>
          <span style={{ color:"var(--text-muted)" }}>Logged in as ykacha · Notes fully editable · Full access enabled</span>
          <button onClick={() => setAdminMode(false)} className="lc-ghost" style={{ marginLeft:"auto", padding:"2px 12px", fontSize:11 }}>Logout</button>
        </div>
      )}

      {showAdminModal && <AdminModal onLogin={() => { setAdminMode(true); setShowAdminModal(false); }} onClose={() => setShowAdminModal(false)} />}

      <main key={view} className={`view-enter ${SURFACE_VIEWS.includes(view) ? "lc-surface" : ""}`} style={{ position:"relative", zIndex:1 }}>
        {view==="dashboard"  && <Dashboard setView={navigate} dark={darkMode} />}
        {view==="pipeline"   && <PipelineView />}
        {view==="methods"    && <MethodsView navigate={navigate} />}
        {view==="qbd"        && <QbDView navigate={navigate} />}
        {view==="ctd"        && <CTDView />}
        {view==="timeline"   && <TimelineView />}
        {view==="domains"    && <DomainsView />}
        {view==="exam"       && <ExamView />}
        {view==="ich"        && <ICHView />}
        {view==="career"     && <CareerView navigate={navigate} />}
        {view==="notes"      && <NotesView adminMode={adminMode} />}
        {view==="glossary"   && <GlossaryView />}
        {view==="stability"  && <StabilityView />}
        {view==="oos"        && <OOSView />}
        {view==="batch"      && <BatchRecordView />}
        {view==="cases"      && <CaseStudiesView />}
        {view==="compendial" && <CompendialView />}
        {view==="excipient"  && <ExcipientView />}
        {view==="pathway"    && <PathwayView />}
        {view==="progress"   && <ProgressView />}
        {view==="viral"      && <ViralClearanceView />}
      </main>
    </div>
  );
}
