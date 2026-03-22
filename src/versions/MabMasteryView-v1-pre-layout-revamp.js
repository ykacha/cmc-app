import { useState, useEffect, useRef, useCallback } from "react";
import { MAB_SECTIONS } from "../mab-mastery-data";

const VISITED_KEY = "mab-mastery-visited";
const QUIZ_KEY    = "mab-mastery-quiz";

/* ─────────────────────────────────────────────────────────────
   Tiny shared helpers
───────────────────────────────────────────────────────────── */
function pct(n, total) {
  return total > 0 ? Math.round((n / total) * 100) : 0;
}

function useLocalStorage(key, defaultVal) {
  const [val, setValState] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? defaultVal; }
    catch { return defaultVal; }
  });
  const setVal = useCallback((v) => {
    const next = typeof v === "function" ? v(val) : v;
    setValState(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
  }, [key, val]);
  return [val, setVal];
}

/* ─────────────────────────────────────────────────────────────
   Progress bar (inline)
───────────────────────────────────────────────────────────── */
function ProgressBar({ value, color, height = 4 }) {
  return (
    <div style={{ background: "var(--border)", borderRadius: 99, overflow: "hidden", height }}>
      <div style={{
        height: "100%", borderRadius: 99,
        width: `${Math.min(100, value)}%`,
        background: color,
        transition: "width 0.6s ease",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Content: Concept Card
───────────────────────────────────────────────────────────── */
function ConceptCard({ title, content, color = "var(--accent)" }) {
  return (
    <div style={{
      background: "var(--bg-card)",
      border: `1px solid ${color}30`,
      borderLeft: `3px solid ${color}`,
      borderRadius: 10,
      padding: "14px 18px",
      marginBottom: 14,
    }}>
      {title && (
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color, marginBottom: 6 }}>
          {title}
        </div>
      )}
      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.7, color: "var(--text-body)" }}>
        {content}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Content: Bullet List Card
───────────────────────────────────────────────────────────── */
function BulletCard({ title, items, color = "var(--accent)" }) {
  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: 10,
      padding: "14px 18px",
      marginBottom: 14,
    }}>
      {title && (
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>
          {title}
        </div>
      )}
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: "flex", gap: 10, marginBottom: 7, fontSize: 13.5, lineHeight: 1.65, color: "var(--text-body)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, marginTop: 7, flexShrink: 0 }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Content: Reference Table
───────────────────────────────────────────────────────────── */
function RefTable({ title, headers, rows }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {title && (
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>
          {title}
        </div>
      )}
      <div style={{ overflowX: "auto", borderRadius: 10, border: "1px solid var(--border)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
          <thead>
            <tr style={{ background: "var(--bg-raised)" }}>
              {headers.map((h, i) => (
                <th key={i} style={{
                  padding: "9px 14px", textAlign: "left", fontWeight: 600,
                  color: "var(--text-sec)", borderBottom: "1px solid var(--border)",
                  whiteSpace: "nowrap",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ background: ri % 2 === 0 ? "var(--bg-card)" : "var(--bg-surface)" }}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{
                    padding: "8px 14px", color: "var(--text-body)",
                    borderBottom: ri < rows.length - 1 ? "1px solid var(--border)" : "none",
                    fontWeight: ci === 0 ? 500 : 400,
                    fontFamily: ci === 0 ? "inherit" : "monospace",
                    fontSize: ci === 0 ? 13 : 12,
                  }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Content: Callout / InfoBox
───────────────────────────────────────────────────────────── */
const CALLOUT_STYLES = {
  info:    { bg: "#1976d220", border: "#1976d2", icon: "ℹ️" },
  warning: { bg: "#f59e0b20", border: "#f59e0b", icon: "⚠️" },
  success: { bg: "#10b98120", border: "#10b981", icon: "✅" },
  danger:  { bg: "#ef444420", border: "#ef4444", icon: "🚨" },
};
function Callout({ title, content, variant = "info" }) {
  const s = CALLOUT_STYLES[variant] || CALLOUT_STYLES.info;
  return (
    <div style={{
      background: s.bg,
      border: `1px solid ${s.border}40`,
      borderLeft: `3px solid ${s.border}`,
      borderRadius: 10,
      padding: "12px 16px",
      marginBottom: 14,
      display: "flex",
      gap: 10,
    }}>
      <span style={{ fontSize: 16, flexShrink: 0 }}>{s.icon}</span>
      <div>
        {title && <div style={{ fontWeight: 600, fontSize: 13, color: s.border, marginBottom: 3 }}>{title}</div>}
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: "var(--text-body)" }}>{content}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Quiz Panel
───────────────────────────────────────────────────────────── */
function QuizPanel({ questions = [], moduleId, quizAnswers, onAnswer }) {
  const [activeQ, setActiveQ] = useState(0);
  const q = questions[activeQ];
  if (!questions.length || !q) return null;

  const answeredKey = `${moduleId}-q${activeQ}`;
  const answered = quizAnswers[answeredKey] ?? null;

  const handleSelect = (idx) => {
    if (answered !== null) return;
    onAnswer(answeredKey, idx);
  };

  const correct = quizAnswers[answeredKey] === q.correct;

  return (
    <div style={{
      marginTop: 28,
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        padding: "10px 16px",
        background: "var(--bg-raised)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>🎯</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-sec)", letterSpacing: "0.05em" }}>
            KNOWLEDGE CHECK
          </span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {questions.map((_, i) => {
            const k = `${moduleId}-q${i}`;
            const ans = quizAnswers[k];
            return (
              <button key={i} onClick={() => setActiveQ(i)} style={{
                width: i === activeQ ? 20 : 8, height: 8, borderRadius: 99,
                background: ans !== undefined && ans !== null
                  ? (ans === questions[i].correct ? "#10b981" : "#ef4444")
                  : i === activeQ ? "var(--accent)" : "var(--border)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "all 0.2s ease",
              }} />
            );
          })}
        </div>
      </div>

      <div style={{ padding: "16px 18px" }}>
        <p style={{ margin: "0 0 14px 0", fontSize: 13.5, fontWeight: 500, color: "var(--text-h)", lineHeight: 1.55 }}>
          {q.q}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {q.options.map((opt, i) => {
            let bg = "var(--bg-surface)";
            let border = "var(--border)";
            let color = "var(--text-body)";
            if (answered !== null) {
              if (i === q.correct) { bg = "#10b98120"; border = "#10b981"; color = "#10b981"; }
              else if (i === answered && i !== q.correct) { bg = "#ef444420"; border = "#ef4444"; color = "#ef4444"; }
            }
            return (
              <button key={i} onClick={() => handleSelect(i)} style={{
                background: bg,
                border: `1px solid ${border}`,
                borderRadius: 8, padding: "9px 14px",
                textAlign: "left", cursor: answered !== null ? "default" : "pointer",
                fontSize: 13, color,
                transition: "all 0.15s ease",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{
                  width: 18, height: 18, borderRadius: "50%",
                  border: `1.5px solid ${border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, flexShrink: 0, color,
                }}>
                  {answered !== null && i === q.correct ? "✓" : answered === i && i !== q.correct ? "✕" : String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {answered !== null && (
          <div style={{
            marginTop: 12,
            padding: "10px 14px",
            background: correct ? "#10b98110" : "#ef444410",
            border: `1px solid ${correct ? "#10b98130" : "#ef444430"}`,
            borderRadius: 8,
            fontSize: 12.5,
            lineHeight: 1.6,
            color: "var(--text-sec)",
          }}>
            <span style={{ fontWeight: 600, color: correct ? "#10b981" : "#ef4444", marginRight: 6 }}>
              {correct ? "Correct." : "Incorrect."}
            </span>
            {q.explanation}
          </div>
        )}

        {activeQ < questions.length - 1 && answered !== null && (
          <button onClick={() => setActiveQ(activeQ + 1)} style={{
            marginTop: 12, padding: "8px 18px", borderRadius: 8,
            background: "var(--accent)", color: "#fff",
            border: "none", cursor: "pointer", fontSize: 12.5, fontWeight: 600,
          }}>
            Next Question →
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Module Header
───────────────────────────────────────────────────────────── */
function ModuleHeader({ module, section, visited }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
          color: section.color,
        }}>
          {section.title} · Module {module.id.split("-m")[1] * 1 + 1}
        </span>
        {visited && (
          <span style={{
            fontSize: 9, padding: "2px 7px", borderRadius: 99,
            background: "#10b98120", color: "#10b981", fontWeight: 700, letterSpacing: "0.05em",
          }}>
            VISITED
          </span>
        )}
      </div>
      <h2 style={{ margin: "0 0 10px 0", fontSize: 26, fontWeight: 700, color: "var(--text-h)", lineHeight: 1.15 }}>
        {module.title}
      </h2>
      <p style={{ margin: "0 0 14px 0", fontSize: 14, lineHeight: 1.75, color: "var(--text-sec)", maxWidth: 680 }}>
        {module.lead}
      </p>
      {module.tags && module.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {module.tags.map((tag, i) => (
            <span key={i} style={{
              fontSize: 10.5, padding: "2px 9px", borderRadius: 99,
              background: section.color + "12", color: section.color,
              fontWeight: 600, letterSpacing: "0.04em",
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}
      <div style={{ width: 32, height: 2, borderRadius: 99, background: section.color, marginTop: 20 }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Nav row (prev / next)
───────────────────────────────────────────────────────────── */
function NavRow({ onPrev, onNext, hasPrev, hasNext, prevTitle, nextTitle }) {
  const btn = (onClick, disabled, label, direction) => (
    <button onClick={onClick} disabled={disabled} style={{
      flex: direction === "next" ? "0 0 auto" : "0 0 auto",
      padding: "9px 18px", borderRadius: 10,
      background: disabled ? "var(--bg-raised)" : direction === "next" ? "var(--accent)" : "var(--bg-card)",
      border: "1px solid var(--border)",
      color: disabled ? "var(--text-muted)" : direction === "next" ? "#fff" : "var(--text-sec)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      fontSize: 12.5, fontWeight: 600,
      transition: "all 0.15s ease",
      maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
    }}>
      {label}
    </button>
  );

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 36, paddingTop: 24, borderTop: "1px solid var(--border)", gap: 12 }}>
      {btn(onPrev, !hasPrev, hasPrev ? `← ${prevTitle}` : "← Previous", "prev")}
      {btn(onNext, !hasNext, hasNext ? `${nextTitle} →` : "Next →", "next")}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section accordion item (sidebar)
───────────────────────────────────────────────────────────── */
function SectionAccordion({ section, isActive, selectedModule, visitedModules, onNavigate }) {
  const [open, setOpen] = useState(isActive);
  const visited = section.modules.filter(m => visitedModules.has(m.id)).length;
  const progress = pct(visited, section.modules.length);

  useEffect(() => { if (isActive) setOpen(true); }, [isActive]);

  return (
    <div style={{ marginBottom: 2 }}>
      <button
        onClick={() => setOpen(p => !p)}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 8,
          padding: "8px 12px", borderRadius: 8, border: "none",
          background: isActive ? section.color + "14" : "transparent",
          cursor: "pointer", textAlign: "left",
          transition: "background 0.15s ease",
        }}
        onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "var(--bg-raised)"; }}
        onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
      >
        <span style={{ fontSize: 16, flexShrink: 0 }}>{section.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-h)", truncate: true, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {section.title}
          </div>
          <div style={{ marginTop: 3 }}>
            <ProgressBar value={progress} color={section.color} height={2} />
          </div>
        </div>
        <span style={{
          fontSize: 10, color: "var(--text-muted)", flexShrink: 0,
          transform: open ? "rotate(0deg)" : "rotate(-90deg)",
          transition: "transform 0.2s ease",
          display: "inline-block",
        }}>▾</span>
      </button>

      {open && (
        <div style={{ paddingLeft: 14, borderLeft: "1px solid var(--border)", marginLeft: 20, paddingTop: 2, paddingBottom: 4 }}>
          {section.modules.map((mod, i) => {
            const isSelected = isActive && selectedModule === i;
            const isVisited = visitedModules.has(mod.id);
            return (
              <button
                key={mod.id}
                onClick={() => onNavigate(MAB_SECTIONS.findIndex(s => s.id === section.id), i)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 7,
                  padding: "5px 10px", borderRadius: 6, border: "none",
                  background: isSelected ? section.color + "18" : "transparent",
                  cursor: "pointer", textAlign: "left",
                  transition: "background 0.12s ease",
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "var(--bg-raised)"; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{
                  width: 5, height: 5, borderRadius: "50%", flexShrink: 0,
                  background: isSelected ? section.color
                    : isVisited ? section.color + "80"
                    : "transparent",
                  border: isVisited || isSelected ? "none" : "1.5px solid var(--border)",
                  transition: "all 0.15s ease",
                }} />
                <span style={{
                  fontSize: 11.5, color: isSelected ? section.color : "var(--text-sec)",
                  fontWeight: isSelected ? 600 : 400,
                  lineHeight: 1.35,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {mod.title}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stats Bar (overall progress)
───────────────────────────────────────────────────────────── */
function StatsBar({ visitedModules, quizAnswers }) {
  const totalModules = MAB_SECTIONS.reduce((s, sec) => s + sec.modules.length, 0);
  const totalVisited = visitedModules.size;
  const totalQuizAnswered = Object.keys(quizAnswers).length;
  const totalQuizCorrect  = Object.entries(quizAnswers).filter(([k, v]) => {
    const [modId, qIdx] = k.split("-q");
    const sec = MAB_SECTIONS.find(s => modId.startsWith(s.id));
    const mod = sec?.modules.find(m => m.id === modId);
    return mod?.quiz?.[+qIdx]?.correct === v;
  }).length;

  const stats = [
    { label: "Modules Visited", value: totalVisited, total: totalModules, color: "#1976d2" },
    { label: "Overall Progress", value: pct(totalVisited, totalModules) + "%", color: "#00897b" },
    { label: "Quiz Answered", value: totalQuizAnswered, color: "#f59e0b" },
    { label: "Quiz Correct", value: totalQuizAnswered > 0 ? Math.round(totalQuizCorrect / totalQuizAnswered * 100) + "%" : "—", color: "#10b981" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
      {stats.map((s) => (
        <div key={s.label} style={{
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: 10, padding: "10px 14px",
        }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: s.color, fontVariantNumeric: "tabular-nums" }}>
            {s.total !== undefined ? `${s.value} / ${s.total}` : s.value}
          </div>
          <div style={{ fontSize: 10.5, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Search results overlay
───────────────────────────────────────────────────────────── */
function SearchResults({ query, onNavigate }) {
  if (!query.trim()) return null;
  const q = query.toLowerCase();
  const results = [];
  MAB_SECTIONS.forEach((sec, si) => {
    sec.modules.forEach((mod, mi) => {
      if (
        mod.title.toLowerCase().includes(q) ||
        mod.lead?.toLowerCase().includes(q) ||
        mod.tags?.some(t => t.toLowerCase().includes(q))
      ) {
        results.push({ sec, si, mod, mi });
      }
    });
  });

  if (!results.length) return (
    <div style={{ padding: "10px 14px", fontSize: 13, color: "var(--text-muted)" }}>
      No modules match "{query}"
    </div>
  );

  return (
    <div>
      {results.map(({ sec, si, mod, mi }) => (
        <button
          key={mod.id}
          onClick={() => onNavigate(si, mi)}
          style={{
            width: "100%", padding: "10px 14px", border: "none", borderBottom: "1px solid var(--border)",
            background: "transparent", cursor: "pointer", textAlign: "left",
            display: "flex", flexDirection: "column", gap: 2,
          }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--bg-raised)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-h)" }}>{mod.title}</span>
          <span style={{ fontSize: 11, color: sec.color }}>{sec.title}</span>
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main View
───────────────────────────────────────────────────────────── */
export default function MabMasteryView() {
  const [selectedSection, setSelectedSection] = useState(0);
  const [selectedModule,  setSelectedModule]  = useState(0);
  const [sidebarOpen,     setSidebarOpen]     = useState(true);
  const [searchQuery,     setSearchQuery]     = useState("");
  const [searchOpen,      setSearchOpen]      = useState(false);
  const contentRef = useRef(null);

  const [visitedModules, setVisitedModules] = useLocalStorage(VISITED_KEY, []);
  const visitedSet = new Set(visitedModules);
  const [quizAnswers, setQuizAnswers] = useLocalStorage(QUIZ_KEY, {});

  const section = MAB_SECTIONS[selectedSection];
  const module  = section?.modules[selectedModule] ?? null;

  // Mark visited on mount / change
  useEffect(() => {
    if (!module) return;
    setVisitedModules(prev => {
      const s = new Set(prev);
      if (s.has(module.id)) return prev;
      s.add(module.id);
      return [...s];
    });
    // Scroll content to top
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [module?.id]);

  const navigate = useCallback((si, mi) => {
    setSelectedSection(si);
    setSelectedModule(mi);
    setSearchQuery("");
    setSearchOpen(false);
  }, []);

  const handlePrev = () => {
    if (selectedModule > 0) {
      navigate(selectedSection, selectedModule - 1);
    } else if (selectedSection > 0) {
      const prevSec = MAB_SECTIONS[selectedSection - 1];
      navigate(selectedSection - 1, prevSec.modules.length - 1);
    }
  };

  const handleNext = () => {
    if (selectedModule < section.modules.length - 1) {
      navigate(selectedSection, selectedModule + 1);
    } else if (selectedSection < MAB_SECTIONS.length - 1) {
      navigate(selectedSection + 1, 0);
    }
  };

  const hasPrev = selectedSection > 0 || selectedModule > 0;
  const hasNext = selectedSection < MAB_SECTIONS.length - 1 || selectedModule < section.modules.length - 1;

  const getPrevTitle = () => {
    if (selectedModule > 0) return section.modules[selectedModule - 1].title;
    if (selectedSection > 0) {
      const p = MAB_SECTIONS[selectedSection - 1];
      return p.modules[p.modules.length - 1].title;
    }
    return "";
  };

  const getNextTitle = () => {
    if (selectedModule < section.modules.length - 1) return section.modules[selectedModule + 1].title;
    if (selectedSection < MAB_SECTIONS.length - 1) return MAB_SECTIONS[selectedSection + 1].modules[0].title;
    return "";
  };

  const handleQuizAnswer = (key, idx) => {
    setQuizAnswers(prev => ({ ...prev, [key]: idx }));
  };

  const totalModules = MAB_SECTIONS.reduce((s, sec) => s + sec.modules.length, 0);
  const overallPct = pct(visitedSet.size, totalModules);

  return (
    <div style={{ display: "flex", height: "calc(100vh - 60px)", overflow: "hidden", background: "var(--bg-base)" }}>

      {/* ── Sidebar ─────────────────────────────── */}
      <aside style={{
        width: sidebarOpen ? 268 : 52,
        minWidth: sidebarOpen ? 268 : 52,
        flexShrink: 0,
        background: "var(--bg-card)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "width 0.25s ease, min-width 0.25s ease",
      }}>

        {sidebarOpen ? (
          <>
            {/* Sidebar header */}
            <div style={{ padding: "16px 14px 10px", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-h)", lineHeight: 1 }}>
                    <span style={{ color: "#00897b" }}>mAb</span> Mastery
                  </div>
                  <div style={{ fontSize: 10.5, color: "var(--text-muted)", marginTop: 2 }}>
                    {visitedSet.size} / {totalModules} modules
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 16, padding: 4 }}
                  title="Collapse sidebar"
                >
                  ‹
                </button>
              </div>
              <ProgressBar value={overallPct} color="#00897b" height={3} />
            </div>

            {/* Search */}
            <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--border)" }}>
              <div style={{ position: "relative" }}>
                <input
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true); }}
                  onFocus={() => setSearchOpen(true)}
                  placeholder="Search modules…"
                  style={{
                    width: "100%", padding: "6px 10px 6px 28px", borderRadius: 7,
                    border: "1px solid var(--border)", background: "var(--bg-raised)",
                    color: "var(--text-body)", fontSize: 12.5, boxSizing: "border-box",
                    outline: "none",
                  }}
                />
                <span style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "var(--text-muted)" }}>
                  🔍
                </span>
              </div>
            </div>

            {/* Search results or section nav */}
            <nav style={{ flex: 1, overflowY: "auto", padding: "8px 8px" }}>
              {searchOpen && searchQuery.trim() ? (
                <SearchResults query={searchQuery} onNavigate={(si, mi) => { navigate(si, mi); setSearchOpen(false); setSearchQuery(""); }} />
              ) : (
                MAB_SECTIONS.map((sec, si) => (
                  <SectionAccordion
                    key={sec.id}
                    section={sec}
                    isActive={si === selectedSection}
                    selectedModule={selectedModule}
                    visitedModules={visitedSet}
                    onNavigate={navigate}
                  />
                ))
              )}
            </nav>

            {/* Quiz link */}
            <div style={{ padding: "10px 12px", borderTop: "1px solid var(--border)" }}>
              <button
                onClick={() => navigate(selectedSection, selectedModule)}
                style={{
                  width: "100%", padding: "8px 14px", borderRadius: 8,
                  background: "var(--bg-raised)", border: "1px solid var(--border)",
                  cursor: "pointer", fontSize: 12, color: "var(--text-sec)",
                  display: "flex", alignItems: "center", gap: 8,
                }}
              >
                <span>🎯</span>
                <span style={{ fontWeight: 500 }}>Quiz questions below each module</span>
              </button>
            </div>
          </>
        ) : (
          /* Collapsed rail */
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 8, gap: 2 }}>
            <button
              onClick={() => setSidebarOpen(true)}
              title="Expand sidebar"
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 18, padding: "6px 0", width: "100%" }}
            >
              ›
            </button>
            {MAB_SECTIONS.map((sec, si) => (
              <button
                key={sec.id}
                onClick={() => { setSidebarOpen(true); navigate(si, 0); }}
                title={sec.title}
                style={{
                  width: 36, height: 36, borderRadius: 8, border: "none",
                  background: si === selectedSection ? sec.color + "20" : "transparent",
                  cursor: "pointer", fontSize: 18,
                  borderLeft: si === selectedSection ? `3px solid ${sec.color}` : "3px solid transparent",
                  transition: "all 0.15s ease",
                }}
              >
                {sec.icon}
              </button>
            ))}
          </div>
        )}
      </aside>

      {/* ── Main content ──────────────────────── */}
      <main
        ref={contentRef}
        style={{ flex: 1, overflowY: "auto", padding: "32px 40px 60px", minWidth: 0 }}
      >
        {/* Stats bar */}
        <StatsBar visitedModules={visitedSet} quizAnswers={quizAnswers} />

        {module ? (
          <>
            <ModuleHeader module={module} section={section} visited={visitedSet.has(module.id)} />

            {/* Bullet list */}
            {module.bullets && module.bullets.length > 0 && (
              <BulletCard title="Key Points" items={module.bullets} color={section.color} />
            )}

            {/* Custom content sections */}
            {module.sections && module.sections.map((sec, i) => {
              if (sec.type === "card")    return <ConceptCard    key={i} title={sec.title} content={sec.content} color={section.color} />;
              if (sec.type === "bullets") return <BulletCard     key={i} title={sec.title} items={sec.items}   color={section.color} />;
              if (sec.type === "table")   return <RefTable       key={i} title={sec.title} headers={sec.headers} rows={sec.rows} />;
              if (sec.type === "callout") return <Callout        key={i} title={sec.title} content={sec.content} variant={sec.variant} />;
              if (sec.type === "code")    return (
                <div key={i} style={{ marginBottom: 14 }}>
                  {sec.title && (
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>
                      {sec.title}
                    </div>
                  )}
                  <pre style={{
                    background: "var(--bg-raised)", border: "1px solid var(--border)",
                    borderRadius: 10, padding: "14px 18px", overflowX: "auto",
                    fontSize: 11.5, lineHeight: 1.7, color: "var(--text-body)",
                    fontFamily: "monospace", margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word",
                  }}>{sec.code}</pre>
                </div>
              );
              return null;
            })}

            {/* Inline table */}
            {module.table && (
              <RefTable title={module.table.title} headers={module.table.headers} rows={module.table.rows} />
            )}

            {/* CMC Implication card */}
            {module.cmc && (
              <Callout
                title="CMC Implication"
                content={module.cmc}
                variant="info"
              />
            )}

            {/* Quiz */}
            {module.quiz && module.quiz.length > 0 && (
              <QuizPanel
                questions={module.quiz}
                moduleId={module.id}
                quizAnswers={quizAnswers}
                onAnswer={handleQuizAnswer}
              />
            )}

            <NavRow
              onPrev={handlePrev}
              onNext={handleNext}
              hasPrev={hasPrev}
              hasNext={hasNext}
              prevTitle={getPrevTitle()}
              nextTitle={getNextTitle()}
            />
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--text-muted)" }}>
            Select a module from the sidebar to begin.
          </div>
        )}
      </main>
    </div>
  );
}
