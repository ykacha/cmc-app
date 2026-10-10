import { useState, useEffect, useMemo, useRef } from "react";
import { flushSync } from "react-dom";
import { reducedMotion } from "./motion";
import "./fx.css";
import Dashboard from "./views/Dashboard";
import { Icon } from "./icons";
import PipelineView   from "./views/PipelineView";
import Analytical     from "./views/analytical/Analytical";
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
import PrivacyView    from "./views/PrivacyView";
import TermsView      from "./views/TermsView";
import { DNALogo }    from "./shared";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const SURFACE_VIEWS = ["methods","qbd","ctd","timeline","domains","ich","glossary","viral"];

// Each group is a chain segment in the sequence-track nav (colour = CPK role).
const NAV_GROUPS = [
  { id:"learn",    label:"Learn",    color:"var(--chain-h)", items:[
    { id:"pipeline", label:"Pipeline Explorer", short:"Pipeline" }, { id:"timeline", label:"CMC Timeline", short:"Timeline" },
    { id:"domains", label:"Domain Q-Bank", short:"Q-Bank" }, { id:"ich", label:"ICH Guidelines", short:"ICH" }, { id:"glossary", label:"CMC Glossary", short:"Glossary" },
  ]},
  { id:"science",  label:"Science",  color:"var(--chain-l)", items:[
    { id:"analytical", label:"Analytical", short:"Analytical" }, { id:"qbd", label:"QbD / CQA / CPP", short:"QbD" }, { id:"viral", label:"Viral Clearance", short:"Viral" },
    { id:"stability", label:"Stability Studies", short:"Stability" }, { id:"compendial", label:"Compendial Reference", short:"Compendial" }, { id:"excipient", label:"Excipient Compatibility", short:"Excipients" },
  ]},
  { id:"tools",    label:"Tools",    color:"var(--bridge)", items:[
    { id:"ctd", label:"CTD Navigator", short:"CTD" }, { id:"oos", label:"OOS/OOT Investigation", short:"OOS/OOT" },
    { id:"batch", label:"Batch Record Simulator", short:"Batch" }, { id:"cases", label:"Case Studies", short:"Cases" },
  ]},
  { id:"practice", label:"Practice", color:"var(--glycan)", items:[
    { id:"exam", label:"Exam Mode", short:"Exam" }, { id:"notes", label:"My Notes", short:"Notes" },
  ]},
  { id:"career",   label:"Career",   color:"var(--text-muted)", items:[
    { id:"career", label:"Career & Interviews", short:"Career" }, { id:"pathway", label:"Learning Pathways", short:"Pathways" }, { id:"progress", label:"My Progress", short:"Progress" },
  ]},
];
const ALL_VIEWS = new Set(["dashboard", "privacy", "terms", ...NAV_GROUPS.flatMap(g => g.items.map(i => i.id))]);

// "#/methods/am-sec" -> { view:"methods", focus:"am-sec" }
function readHash() {
  const [v, ...rest] = window.location.hash.replace(/^#\/?/, "").split("/");
  const f = rest.filter(Boolean).join("/") || null;
  if (v === "methods") return { view: "analytical", focus: f ? "atlas/" + f : "atlas" };   // legacy links
  return ALL_VIEWS.has(v) ? { view: v, focus: f } : { view: "dashboard", focus: null };
}

// Sequence-track navigation: every section is a residue cell on one chain.
function SequenceTrack({ view, onPick }) {
  return (
    <div className="sq-track" role="navigation" aria-label="Sections">
      {NAV_GROUPS.map(g => (
        <div key={g.id} className="sq-seg" style={{ "--seg": g.color }}>
          <span className="sq-seg-name">{g.label}</span>
          <div className="sq-cells">
            {g.items.map(it => (
              <button key={it.id} className={`sq-cell${view === it.id ? " is-on" : ""}`} onClick={() => onPick(it.id)}
                aria-current={view === it.id ? "page" : undefined} title={it.label}>
                <i /><span>{it.short}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Fullscreen index (replaces the dropdown mega-menu) ─────────
function IndexOverlay({ open, onClose, groups, view, onPick }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div style={{ position:"fixed", inset:0, zIndex:500, background:"var(--bg-base)", overflowY:"auto", animation:"lc-dropin .35s cubic-bezier(.16,.6,.2,1)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"26px 32px 0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontSize:15, fontWeight:700, color:"var(--text-h)" }}>All sections</div>
        <button onClick={onClose} className="lc-link" style={{ fontSize:14, display:"inline-flex", gap:8, alignItems:"center" }}><Icon name="cross" size={14} sw={2} /> Close</button>
      </div>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"48px 32px 100px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"48px 40px" }}>
        {groups.map(g => (
          <div key={g.id}>
            <div style={{ display:"flex", alignItems:"center", gap:10, fontSize:13, fontWeight:700, color:"var(--text-sec)", marginBottom:16, paddingBottom:12, borderBottom:"1px solid var(--hairline)" }}><span style={{ width:18, height:4, borderRadius:2, background:g.color }} />{g.label}</div>
            <div style={{ display:"flex", flexDirection:"column" }}>
              {g.items.map(item => {
                const on = view === item.id;
                return (
                  <button key={item.id} onClick={() => { onPick(item.id); onClose(); }}
                    style={{ textAlign:"left", background:"none", border:"none", cursor:"pointer", padding:"9px 0",
                      fontFamily:"var(--font-display)", fontStretch:"112%", fontWeight:700, fontSize:22, lineHeight:1.25, letterSpacing:"-.02em",
                      color: on ? "var(--accent)" : "var(--text-h)", transition:"color .25s ease" }}
                    onMouseEnter={e => { if (!on) e.currentTarget.style.color = "var(--accent)"; }}
                    onMouseLeave={e => { if (!on) e.currentTarget.style.color = "var(--text-h)"; }}>
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
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
      <div className="lc-glass lc-edge" style={{ borderRadius:6, padding:32, width:340, maxWidth:"90vw", animation:"lc-pop .3s ease" }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ display:"flex", justifyContent:"center", color:"var(--accent)", marginBottom:8 }}><Icon name="lock" size={32} sw={1.5} /></div>
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
        {err && <div style={{ color:"#C99A06", fontSize:12, marginBottom:12, textAlign:"center" }}>{err}</div>}
        <button onClick={attempt} className="lc-pill lc-shine" style={{ width:"100%", padding:"12px", fontSize:14, marginBottom:10 }}>Login</button>
        <button onClick={onClose} className="lc-ghost" style={{ width:"100%", padding:"10px", fontSize:13 }}>Cancel</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
export default function App() {
  const [{ view, focus }, setRoute] = useState(readHash);
  const setView = (v, f = null) => setRoute({ view: v, focus: f });
  const [darkMode, setDarkMode]   = useState(() => localStorage.getItem("cmc-theme") === "dark");
  const [adminMode, setAdminMode] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [palette, setPalette]     = useState(false);

  const toggleTheme = () => setDarkMode(d => { const n = !d; localStorage.setItem("cmc-theme", n ? "dark" : "light"); return n; });

  const navigate = (id, f = null) => {
    if (id === "methods") { f = f ? "atlas/" + f : "atlas"; id = "analytical"; }   // legacy callers
    const hash = id === "dashboard" ? "#/" : `#/${id}${f ? "/" + f : ""}`;
    if (window.location.hash !== hash) window.history.pushState(null, "", hash);
    const swap = () => { flushSync(() => setView(id, f)); window.scrollTo(0, 0); };
    if (document.startViewTransition && id !== view && !reducedMotion()) {
      document.documentElement.classList.add("mo-vt");
      document.startViewTransition(swap).finished.finally(() => document.documentElement.classList.remove("mo-vt"));
    } else {
      setView(id, f);
      window.scrollTo({ top: 0, behavior: id === view ? "smooth" : "auto" });
    }
    try { const v = JSON.parse(localStorage.getItem("cmc-visited-views") || "[]");
      if (!v.includes(id)) { v.push(id); localStorage.setItem("cmc-visited-views", JSON.stringify(v)); } } catch { /* ignore */ }
  };

  // back/forward and pasted links
  useEffect(() => {
    const onPop = () => { setRoute(readHash()); window.scrollTo(0, 0); };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPalette(p => !p); }
      else if (e.key === "Escape") { setPalette(false); }
      else if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || "") && !document.activeElement?.isContentEditable) { e.preventDefault(); setPalette(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const paletteItems = [
    { key:"__home", icon:<Icon name="home" size={16} />, label:"Go to Dashboard", hint:"HOME", type:"home" },
    { key:"__theme", icon:<Icon name={darkMode ? "sun" : "moon"} size={16} />, label:`Switch to ${darkMode ? "light" : "dark"} theme`, hint:"THEME", type:"theme" },
    ...NAV_GROUPS.flatMap(g => g.items.map(it => ({ key:it.id, id:it.id, icon:<Icon name={it.id} size={16} />, label:it.label, hint:g.label.toUpperCase(), type:"nav" }))),
  ];
  const pickPalette = (it) => {
    setPalette(false);
    if (it.type === "theme") toggleTheme();
    else if (it.type === "home") navigate("dashboard");
    else navigate(it.id);
  };

  return (
    <div data-theme={darkMode ? "dark" : "light"} style={{ minHeight:"100vh", background:"var(--bg-base)", color:"var(--text-body)" }}>

      <CommandPalette open={palette} onClose={() => setPalette(false)} items={paletteItems} onPick={pickPalette} />
      <IndexOverlay open={menuOpen} onClose={() => setMenuOpen(false)} groups={NAV_GROUPS} view={view} onPick={navigate} />

      {/* ── Masthead + sequence track ── */}
      <header className="mo-vt-nav sv-mast">
        <div className="sv-mast-row">
          <button onClick={() => navigate("dashboard")} className="sv-brand" aria-label="Yash Kacha, CMC reference: home">
            <span style={{ display:"flex" }}><DNALogo/></span>
            <span className="sv-brand-name">Yash Kacha</span>
            <span className="sv-brand-sub">Biologics CMC</span>
          </button>
          <div className="sv-mast-actions">
            <button onClick={() => setPalette(true)} className="sv-mast-btn hide-mobile">
              <Icon name="search" size={14} sw={2} /> Search <kbd>⌘K</kbd>
            </button>
            <button onClick={toggleTheme} className="sv-mast-btn" aria-label={`Switch to ${darkMode ? "light" : "dark"} theme`}>
              <Icon name={darkMode ? "sun" : "moon"} size={15} sw={1.8} />
            </button>
            <button onClick={() => setMenuOpen(true)} className="sv-mast-btn sv-mast-index">
              <Icon name="menu" size={15} sw={2} /> Index
            </button>
          </div>
        </div>
        <SequenceTrack view={view} onPick={navigate} />
      </header>

      {adminMode && (
        <div style={{ background:"color-mix(in srgb, var(--accent-2) 12%, transparent)", borderBottom:"1px solid color-mix(in srgb, var(--accent-2) 35%, transparent)", padding:"6px 16px", display:"flex", alignItems:"center", gap:12, fontSize:12, position:"relative", zIndex:5 }}>
          <span style={{ color:"var(--accent-2)", fontWeight:800, display:"flex", alignItems:"center", gap:6 }}><Icon name="unlock" size={13} sw={2} /> Admin mode active</span>
          <span style={{ color:"var(--text-muted)" }}>Logged in as ykacha. Notes fully editable. Full access enabled.</span>
          <button onClick={() => setAdminMode(false)} className="lc-ghost" style={{ marginLeft:"auto", padding:"2px 12px", fontSize:11 }}>Logout</button>
        </div>
      )}

      {showAdminModal && <AdminModal onLogin={() => { setAdminMode(true); setShowAdminModal(false); }} onClose={() => setShowAdminModal(false)} />}

      <main key={view} className={`view-enter ${SURFACE_VIEWS.includes(view) ? "lc-surface" : ""}`} style={{ position:"relative", zIndex:1 }}>
        {view==="dashboard"  && <Dashboard setView={navigate} dark={darkMode} />}
        {view==="pipeline"   && <PipelineView />}
        {view==="analytical" && <Analytical navigate={navigate} focus={focus} dark={darkMode} />}
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
        {view==="privacy"    && <PrivacyView />}
        {view==="terms"      && <TermsView />}
      </main>

      <footer style={{ position:"relative", zIndex:1, borderTop:"1px solid var(--hairline)", marginTop:40, padding:"22px 16px", display:"flex", flexDirection:"column", alignItems:"center", fontSize:13, color:"var(--text-muted)" }}>
        <div style={{ display:"flex", gap:20, flexWrap:"wrap", justifyContent:"center" }}>
        <span>CMC App by Yash Kacha</span>
        <button onClick={() => navigate("privacy")} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text-muted)", fontSize:13, padding:0 }}>Privacy Policy</button>
        <button onClick={() => navigate("terms")} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text-muted)", fontSize:13, padding:0 }}>Terms & Conditions</button>
        </div>
      </footer>
    </div>
  );
}
