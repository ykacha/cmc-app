import { useState } from "react";
import { OOS_TREE, ROOT_CAUSES, OOT_CRITERIA, OOS_SCENARIOS } from "../oos-data";

/* ─── Shared tiny components ──────────────────────────────── */
function SectionHeader({ icon, title, subtitle }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "var(--text-h)", letterSpacing: "-0.3px" }}>
          {title}
        </h2>
      </div>
      {subtitle && (
        <p style={{ margin: 0, fontSize: 13, color: "var(--text-sec)", paddingLeft: 32 }}>{subtitle}</p>
      )}
    </div>
  );
}

function TabBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "9px 20px", borderRadius: 8, border: "1.5px solid",
        borderColor: active ? "var(--accent)" : "var(--border)",
        background: active ? "var(--accent)" : "transparent",
        color: active ? "#fff" : "var(--text-sec)",
        fontWeight: active ? 700 : 500, fontSize: 13, cursor: "pointer",
        transition: "all 0.18s ease",
      }}
    >
      {label}
    </button>
  );
}

const PHASE_COLORS = {
  "Initial Assessment": "#38BDF8",
  "Phase 1 — Laboratory Investigation": "#34D399",
  "Phase 1 — Invalidation": "#34D399",
  "Phase 1 — Retest": "#34D399",
  "Phase 1 → Phase 2 Escalation": "#F59E0B",
  "Phase 2A — Expanded Lab Investigation": "#F59E0B",
  "Phase 2A — Expanded Results": "#F59E0B",
  "Phase 2A → Phase 2B Escalation": "#FB923C",
  "Phase 2B — Manufacturing Investigation": "#F472B6",
  "Phase 2B — Cause Found": "#F472B6",
  "Phase 2B — Unresolved": "#F87171",
  "Phase 2B — Further Review": "#F87171",
  "Resolution": "#A78BFA",
  "Final Decision — REJECT": "#F87171",
};
function phaseColor(phase) { return PHASE_COLORS[phase] || "#6B88A8"; }

/* ─── Tab 1: Decision Tree ────────────────────────────────── */
function DecisionTreeTab() {
  const [currentId, setCurrentId] = useState("start");
  const [visited, setVisited] = useState([]);
  const [animKey, setAnimKey] = useState(0);

  const node = OOS_TREE[currentId];

  function navigate(targetId) {
    if (!targetId) return;
    setVisited(prev => [...prev, currentId]);
    setCurrentId(targetId);
    setAnimKey(k => k + 1);
  }

  function reset() {
    setCurrentId("start");
    setVisited([]);
    setAnimKey(k => k + 1);
  }

  function goBack() {
    if (visited.length === 0) return;
    const prev = [...visited];
    const last = prev.pop();
    setVisited(prev);
    setCurrentId(last);
    setAnimKey(k => k + 1);
  }

  const isResult = node.type === "result";
  const pColor = phaseColor(node.phase);

  return (
    <div>
      <SectionHeader
        icon="🔍"
        title="OOS Decision Tree"
        subtitle="FDA 2006 OOS Guidance — Phase 1 laboratory investigation → Phase 2A expanded lab → Phase 2B manufacturing investigation"
      />

      {/* Path breadcrumb */}
      {visited.length > 0 && (
        <div style={{
          display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap",
          padding: "10px 14px", background: "var(--bg-raised)", border: "1px solid var(--border)",
          borderRadius: 10, marginBottom: 20,
        }}>
          <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginRight: 4 }}>
            Path:
          </span>
          {visited.map((vid, i) => {
            const vNode = OOS_TREE[vid];
            const vColor = phaseColor(vNode?.phase || "");
            return (
              <span key={vid} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button
                  onClick={() => {
                    setVisited(visited.slice(0, i));
                    setCurrentId(vid);
                    setAnimKey(k => k + 1);
                  }}
                  style={{
                    padding: "3px 10px", borderRadius: 14,
                    border: `1.5px solid ${vColor}44`, background: vColor + "18",
                    color: vColor, fontSize: 11, fontWeight: 700, cursor: "pointer",
                  }}
                >
                  {vNode?.phase?.replace("Phase ", "P") || vid}
                </button>
                {i < visited.length - 1 && <span style={{ color: "var(--text-muted)", fontSize: 13 }}>›</span>}
              </span>
            );
          })}
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>›</span>
          <span style={{
            padding: "3px 10px", borderRadius: 14,
            border: `1.5px solid ${pColor}66`, background: pColor + "22",
            color: pColor, fontSize: 11, fontWeight: 700,
          }}>
            {node.phase?.replace("Phase ", "P")}
          </span>
        </div>
      )}

      {/* Node card */}
      <div
        key={animKey}
        style={{
          background: "var(--bg-card)",
          border: `1.5px solid ${isResult ? (node.outcome === "pass" ? "#34D399" : "#F472B6") : "var(--border)"}`,
          borderTop: `4px solid ${pColor}`,
          borderRadius: 14, padding: 28, animation: "fadeUp 0.25s ease", marginBottom: 20,
          boxShadow: isResult
            ? `0 8px 32px ${node.outcome === "pass" ? "rgba(52,211,153,0.25)" : "rgba(244,114,182,0.25)"}`
            : "0 4px 16px rgba(0,0,0,0.3)",
        }}
      >
        {/* Phase badge + ref */}
        <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            display: "inline-block", padding: "4px 12px", borderRadius: 20,
            background: pColor + "22", color: pColor, fontSize: 11, fontWeight: 800,
            letterSpacing: "0.4px", border: `1.5px solid ${pColor}44`,
          }}>
            {node.phase}
          </span>
          {node.ref && <span style={{ fontSize: 11, color: "var(--text-muted)", fontStyle: "italic" }}>{node.ref}</span>}
        </div>

        {/* Result banner */}
        {isResult && (
          <div style={{
            padding: "14px 18px", borderRadius: 10,
            background: node.outcome === "pass" ? "#34D39920" : "#F472B620",
            border: `1.5px solid ${node.outcome === "pass" ? "#34D39955" : "#F472B655"}`,
            marginBottom: 18, display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ fontSize: 28 }}>{node.outcome === "pass" ? "✅" : "❌"}</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: node.outcome === "pass" ? "#34D399" : "#F472B6", marginBottom: 2 }}>
                {node.outcome === "pass" ? "INVESTIGATION RESOLVED — BATCH MAY PROCEED" : "BATCH REJECTED — OOS CONFIRMED"}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-sec)" }}>
                {node.outcome === "pass"
                  ? "Document all findings. Apply CAPA if systemic issue. Close deviation."
                  : "Mandatory CAPA required. Regulatory notification assessment. Complete all documentation."}
              </div>
            </div>
          </div>
        )}

        {/* Question */}
        <h3 style={{ margin: "0 0 14px", fontSize: isResult ? 16 : 17, fontWeight: 700, color: "var(--text-h)", lineHeight: 1.45 }}>
          {node.question}
        </h3>

        {/* Guidance */}
        <div style={{
          padding: "14px 16px", background: "var(--bg-raised)", border: "1px solid var(--border)",
          borderLeft: `3px solid ${pColor}`, borderRadius: 8, fontSize: 13,
          color: "var(--text-sec)", lineHeight: 1.7, marginBottom: node.example ? 12 : 0,
        }}>
          <strong style={{ color: "var(--text-h)", display: "block", marginBottom: 6, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.4px" }}>
            Guidance
          </strong>
          {node.guidance}
        </div>

        {/* Example */}
        {node.example && (
          <div style={{
            padding: "12px 16px", background: "#A78BFA10",
            border: "1px solid #A78BFA33", borderLeft: "3px solid #A78BFA",
            borderRadius: 8, fontSize: 12, color: "var(--text-sec)", lineHeight: 1.65,
          }}>
            <strong style={{ color: "#A78BFA", display: "block", marginBottom: 5, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.4px" }}>
              Real-World Example
            </strong>
            {node.example}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        {!isResult && node.yes && (
          <button
            onClick={() => navigate(node.yes)}
            style={{
              flex: 1, minWidth: 200, padding: "13px 20px", borderRadius: 10,
              border: "1.5px solid #34D39955",
              background: "linear-gradient(135deg, #34D39920, #34D39910)",
              color: "#34D399", fontWeight: 700, fontSize: 14, cursor: "pointer",
              transition: "all 0.18s ease", textAlign: "center",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#34D39930"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, #34D39920, #34D39910)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ fontSize: 18, marginBottom: 2 }}>✓</div>
            <div>{node.yesLabel || "Yes"}</div>
          </button>
        )}
        {!isResult && node.no && (
          <button
            onClick={() => navigate(node.no)}
            style={{
              flex: 1, minWidth: 200, padding: "13px 20px", borderRadius: 10,
              border: "1.5px solid #F59E0B55",
              background: "linear-gradient(135deg, #F59E0B18, #F59E0B10)",
              color: "#F59E0B", fontWeight: 700, fontSize: 14, cursor: "pointer",
              transition: "all 0.18s ease", textAlign: "center",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#F59E0B28"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, #F59E0B18, #F59E0B10)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ fontSize: 18, marginBottom: 2 }}>✗</div>
            <div>{node.noLabel || "No"}</div>
          </button>
        )}
      </div>

      {/* Nav controls */}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {visited.length > 0 && (
          <button
            onClick={goBack}
            style={{
              padding: "9px 18px", borderRadius: 8, border: "1.5px solid var(--border)",
              background: "transparent", color: "var(--text-sec)", fontSize: 13,
              fontWeight: 600, cursor: "pointer",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--text-sec)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            ← Back
          </button>
        )}
        <button
          onClick={reset}
          style={{
            padding: "9px 18px", borderRadius: 8, border: "1.5px solid #F4727288",
            background: "#F4727218", color: "#F47272", fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#F4727230"}
          onMouseLeave={e => e.currentTarget.style.background = "#F4727218"}
        >
          ↺ Restart
        </button>
        <div style={{
          marginLeft: "auto", padding: "9px 14px", borderRadius: 8,
          background: "var(--bg-raised)", border: "1px solid var(--border)",
          fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6,
        }}>
          Step {visited.length + 1}
          {isResult && (
            <span style={{
              marginLeft: 6, padding: "2px 8px", borderRadius: 10,
              background: node.outcome === "pass" ? "#34D39920" : "#F472B620",
              color: node.outcome === "pass" ? "#34D399" : "#F472B6",
              fontWeight: 700, fontSize: 11,
            }}>
              {node.outcome === "pass" ? "RESOLVED" : "REJECTED"}
            </span>
          )}
        </div>
      </div>

      {/* Regulatory callout */}
      <div style={{
        marginTop: 28, padding: "14px 18px", background: "var(--bg-raised)",
        border: "1px solid var(--border)", borderLeft: "4px solid #38BDF8",
        borderRadius: 10, fontSize: 12, color: "var(--text-sec)", lineHeight: 1.65,
      }}>
        <strong style={{ color: "var(--text-h)" }}>Key regulatory principle:</strong> Per FDA 2006 OOS Guidance and <em>United States v. Barr Laboratories</em> (1993),
        an unexplained OOS result that cannot be traced to a confirmed, documented laboratory error must be treated as a real OOS.
        A batch <em>cannot</em> be released solely on the basis of passing retests when the original OOS cannot be explained.
        Phase 1 invalidation requires confirmed, documented cause — suspicion alone is insufficient.
      </div>
    </div>
  );
}

/* ─── Tab 2: Case Simulator ───────────────────────────────── */
function SimulatorTab() {
  const [selected, setSelected] = useState(null);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [revealed, setRevealed] = useState(new Set());
  const [decisions, setDecisions] = useState({});
  const [score, setScore] = useState(0);

  const phase = selected ? selected.phases[phaseIdx] : null;
  const decided = phase ? !!decisions[phase.id] : false;
  const allPhasesComplete = selected && phaseIdx >= selected.phases.length;
  const totalPhases = selected ? selected.phases.length : 0;

  function startScenario(s) {
    setSelected(s);
    setPhaseIdx(0);
    setRevealed(new Set());
    setDecisions({});
    setScore(0);
  }

  function toggleReveal(itemId) {
    setRevealed(prev => { const n = new Set(prev); n.has(itemId) ? n.delete(itemId) : n.add(itemId); return n; });
  }

  function makeDecision(optionId) {
    if (decided) return;
    const option = phase.options.find(o => o.id === optionId);
    setDecisions(prev => ({ ...prev, [phase.id]: optionId }));
    if (option.correct) setScore(s => s + 1);
  }

  function nextPhase() {
    setPhaseIdx(i => i + 1);
    setRevealed(new Set());
  }

  // ── Scenario selection ──
  if (!selected) {
    return (
      <div>
        <SectionHeader
          icon="🎮"
          title="Investigation Simulator"
          subtitle="Choose a case and conduct a real OOS/OOT investigation — reveal evidence, make decisions, and follow the regulatory path to a verdict."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {OOS_SCENARIOS.map(s => (
            <button
              key={s.id}
              onClick={() => startScenario(s)}
              style={{
                background: "var(--bg-card)", border: "1.5px solid var(--border)",
                borderRadius: 14, padding: 0, cursor: "pointer", textAlign: "left",
                transition: "all 0.18s", overflow: "hidden",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* Header strip */}
              <div style={{
                background: s.isOOT ? "#38BDF820" : "#F8717120",
                borderBottom: `1px solid ${s.isOOT ? "#38BDF833" : "#F8717133"}`,
                padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{
                    padding: "3px 10px", borderRadius: 12,
                    background: s.diffColor + "22", color: s.diffColor,
                    fontSize: 11, fontWeight: 700, border: `1px solid ${s.diffColor}44`,
                  }}>
                    {s.difficulty}
                  </span>
                  <span style={{
                    padding: "3px 10px", borderRadius: 12,
                    background: s.isOOT ? "#38BDF822" : "#F8717122",
                    color: s.isOOT ? "#38BDF8" : "#F87171",
                    fontSize: 11, fontWeight: 700,
                    border: `1px solid ${s.isOOT ? "#38BDF844" : "#F8717144"}`,
                  }}>
                    {s.isOOT ? "OOT" : "OOS"}
                  </span>
                </div>
              </div>
              {/* Body */}
              <div style={{ padding: "16px 18px" }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: "var(--text-h)", marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-sec)", marginBottom: 12 }}>{s.product}</div>
                {/* Finding pill */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "var(--bg-raised)", border: "1px solid var(--border)",
                  borderRadius: 8, padding: "8px 12px", marginBottom: 14, width: "100%", boxSizing: "border-box",
                }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.4px", flexShrink: 0 }}>
                    {s.method}
                  </span>
                  <span style={{ flex: 1, textAlign: "right", fontWeight: 800, fontSize: 14, color: s.isOOT ? "#38BDF8" : "#F87171" }}>
                    {s.finding.result}
                  </span>
                </div>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  fontSize: 12, color: "var(--text-sec)",
                }}>
                  <span>{s.phases.length} investigation phase{s.phases.length !== 1 ? "s" : ""}</span>
                  <span style={{ color: "var(--accent)", fontWeight: 700 }}>Start Investigation →</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Tip callout */}
        <div style={{
          marginTop: 24, padding: "14px 18px", background: "var(--bg-raised)",
          border: "1px solid var(--border)", borderLeft: "4px solid #A78BFA",
          borderRadius: 10, fontSize: 13, color: "var(--text-sec)", lineHeight: 1.65,
        }}>
          <strong style={{ color: "#A78BFA" }}>How to play:</strong> Pick a scenario, then reveal investigation findings one by one.
          Each finding gives you real evidence. Once you have reviewed the evidence, choose the correct regulatory determination.
          Cases range from simple lab errors (Phase 1 resolved) to complex manufacturing OOS requiring batch rejection.
        </div>
      </div>
    );
  }

  // ── Final verdict ──
  if (allPhasesComplete) {
    const pct = totalPhases > 0 ? Math.round((score / totalPhases) * 100) : 0;
    const perfect = score === totalPhases;
    return (
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {/* Verdict banner */}
        <div style={{
          background: selected.finalVerdictColor + "18",
          border: `2px solid ${selected.finalVerdictColor}55`,
          borderRadius: 16, padding: "28px 32px", textAlign: "center", marginBottom: 24,
          animation: "scaleIn 0.3s ease",
        }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{selected.finalVerdictIcon}</div>
          <div style={{ fontWeight: 900, fontSize: 22, color: selected.finalVerdictColor, marginBottom: 6 }}>
            {selected.finalVerdictLabel}
          </div>
          <div style={{ fontSize: 14, color: "var(--text-sec)" }}>{selected.title} — {selected.product}</div>
        </div>

        {/* Score */}
        <div style={{
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: 12, padding: "20px 24px", marginBottom: 20,
          display: "flex", alignItems: "center", gap: 16,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: perfect ? "#34D39920" : score > 0 ? "#F59E0B20" : "#F8717120",
            border: `3px solid ${perfect ? "#34D399" : score > 0 ? "#F59E0B" : "#F87171"}`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ fontWeight: 900, fontSize: 20, color: perfect ? "#34D399" : score > 0 ? "#F59E0B" : "#F87171" }}>
              {pct}%
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-h)", marginBottom: 3 }}>
              {perfect ? "Perfect investigation!" : score > 0 ? "Good work — review the feedback above." : "Review the correct paths — then try again."}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-sec)" }}>
              {score} of {totalPhases} decision{totalPhases !== 1 ? "s" : ""} correct
            </div>
          </div>
        </div>

        {/* Key Learning */}
        <div style={{
          background: "#34D39912", border: "1px solid #34D39933",
          borderLeft: "4px solid #34D399", borderRadius: 10, padding: "16px 20px", marginBottom: 14,
        }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: "#34D399", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.4px" }}>
            Key Learning
          </div>
          <div style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.65 }}>{selected.keyLearning}</div>
        </div>

        {/* CAPA */}
        <div style={{
          background: "#F59E0B10", border: "1px solid #F59E0B33",
          borderLeft: "4px solid #F59E0B", borderRadius: 10, padding: "16px 20px", marginBottom: 24,
        }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: "#F59E0B", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.4px" }}>
            CAPA Recommendation
          </div>
          <div style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.65 }}>{selected.capa}</div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => { setSelected(null); setDecisions({}); setScore(0); setPhaseIdx(0); }}
            style={{
              flex: 1, padding: "12px 20px", borderRadius: 10,
              border: "1.5px solid var(--accent)", background: "var(--accent)",
              color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
            }}
          >
            ← Try Another Case
          </button>
          <button
            onClick={() => startScenario(selected)}
            style={{
              flex: 1, padding: "12px 20px", borderRadius: 10,
              border: "1.5px solid var(--border)", background: "transparent",
              color: "var(--text-sec)", fontWeight: 700, fontSize: 14, cursor: "pointer",
            }}
          >
            ↺ Replay This Case
          </button>
        </div>
      </div>
    );
  }

  // ── Active investigation phase ──
  const phaseColor_ = phase.color;
  const allRevealed = phase.items.every(item => revealed.has(item.id));
  const anyRevealed = phase.items.some(item => revealed.has(item.id));

  return (
    <div>
      {/* Header + progress */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <button
          onClick={() => setSelected(null)}
          style={{
            padding: "7px 14px", borderRadius: 8, border: "1.5px solid var(--border)",
            background: "transparent", color: "var(--text-muted)", fontSize: 12, cursor: "pointer",
          }}
        >
          ← Cases
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text-h)" }}>{selected.title}</div>
          <div style={{ fontSize: 12, color: "var(--text-sec)" }}>{selected.product}</div>
        </div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", background: "var(--bg-raised)", padding: "6px 12px", borderRadius: 8, border: "1px solid var(--border)", whiteSpace: "nowrap" }}>
          Phase {phaseIdx + 1} of {totalPhases}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: "var(--bg-surface)", borderRadius: 4, height: 4, marginBottom: 24, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 4, background: phaseColor_,
          width: `${((phaseIdx) / totalPhases) * 100}%`, transition: "width 0.4s",
        }} />
      </div>

      {/* OOS/OOT Alert box */}
      <div style={{
        background: selected.isOOT ? "#38BDF812" : "#F8717115",
        border: `1.5px solid ${selected.isOOT ? "#38BDF844" : "#F8717144"}`,
        borderRadius: 12, padding: "16px 20px", marginBottom: 24,
        display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
      }}>
        <span style={{ fontSize: 28 }}>{selected.isOOT ? "⚠️" : "🚨"}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 13, color: selected.isOOT ? "#38BDF8" : "#F87171", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {selected.isOOT ? "Out-of-Trend Result Flagged" : "Out-of-Specification Result"}
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 13 }}>
            <span style={{ color: "var(--text-sec)" }}><strong style={{ color: "var(--text-body)" }}>Method:</strong> {selected.method}</span>
            <span style={{ color: "var(--text-sec)" }}><strong style={{ color: "var(--text-body)" }}>Result:</strong> <span style={{ color: selected.isOOT ? "#38BDF8" : "#F87171", fontWeight: 700 }}>{selected.finding.result}</span></span>
            <span style={{ color: "var(--text-sec)" }}><strong style={{ color: "var(--text-body)" }}>Spec:</strong> {selected.finding.spec}</span>
          </div>
        </div>
      </div>

      {/* Phase header */}
      <div style={{
        background: phaseColor_ + "12", border: `1.5px solid ${phaseColor_}33`,
        borderTop: `4px solid ${phaseColor_}`,
        borderRadius: 12, padding: "16px 20px", marginBottom: 20,
      }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: phaseColor_, marginBottom: 4 }}>{phase.title}</div>
        <div style={{ fontSize: 13, color: "var(--text-sec)", lineHeight: 1.55 }}>{phase.intro}</div>
      </div>

      {/* Investigation items */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        {phase.items.map(item => {
          const isRev = revealed.has(item.id);
          const statusColor = item.isIssue ? (item.isCause ? "#F87171" : "#F59E0B") : "#34D399";
          const statusIcon = item.isIssue ? (item.isCause ? "⚠️" : "🔶") : "✅";
          const statusLabel = item.isIssue ? (item.isCause ? "Issue Found" : "Relevant") : "No Issue";

          return (
            <div
              key={item.id}
              style={{
                background: "var(--bg-card)", border: `1.5px solid ${isRev && item.isIssue ? statusColor + "55" : "var(--border)"}`,
                borderRadius: 12, overflow: "hidden",
                boxShadow: isRev ? "0 4px 16px rgba(0,0,0,0.25)" : "0 2px 8px rgba(0,0,0,0.15)",
                transition: "all 0.2s",
              }}
            >
              {/* Item header — always visible */}
              <button
                onClick={() => toggleReveal(item.id)}
                style={{
                  width: "100%", padding: "14px 18px", background: "transparent",
                  border: "none", cursor: "pointer", display: "flex",
                  alignItems: "center", gap: 12, textAlign: "left",
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: isRev ? statusColor + "18" : "var(--bg-raised)",
                  border: `1.5px solid ${isRev ? statusColor + "44" : "var(--border)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, transition: "all 0.2s",
                }}>
                  {isRev ? statusIcon : item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-h)" }}>{item.area}</div>
                  {!isRev && <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 1 }}>Click to investigate</div>}
                  {isRev && <div style={{ fontSize: 12, color: statusColor, fontWeight: 700, marginTop: 1 }}>{statusLabel}</div>}
                </div>
                <div style={{
                  width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                  background: isRev ? statusColor + "18" : "var(--bg-surface)",
                  border: `1px solid ${isRev ? statusColor + "44" : "var(--border)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: isRev ? statusColor : "var(--text-muted)", fontSize: 12, fontWeight: 700,
                  transition: "all 0.2s",
                }}>
                  {isRev ? "▲" : "▼"}
                </div>
              </button>

              {/* Finding (revealed) */}
              {isRev && (
                <div style={{
                  padding: "0 18px 16px", animation: "slideDown 0.2s ease",
                  borderTop: `1px solid ${statusColor}22`,
                }}>
                  <div style={{
                    padding: "12px 14px", background: statusColor + "0C",
                    border: `1px solid ${statusColor}22`, borderRadius: 8,
                    fontSize: 13, color: "var(--text-body)", lineHeight: 1.65, marginTop: 12,
                  }}>
                    {item.finding}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reveal all shortcut */}
      {!allRevealed && (
        <button
          onClick={() => setRevealed(new Set(phase.items.map(i => i.id)))}
          style={{
            padding: "8px 16px", borderRadius: 8, border: "1.5px solid var(--border)",
            background: "transparent", color: "var(--text-muted)", fontSize: 12,
            fontWeight: 600, cursor: "pointer", marginBottom: 24, display: "block",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--text-sec)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
        >
          Reveal all findings →
        </button>
      )}

      {/* Decision section */}
      <div style={{
        background: "var(--bg-card)", border: `1.5px solid ${anyRevealed ? phaseColor_ + "44" : "var(--border)"}`,
        borderRadius: 14, padding: "22px 24px",
        opacity: anyRevealed ? 1 : 0.5, transition: "all 0.3s",
      }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-h)", marginBottom: 6 }}>
          {phase.question}
        </div>
        {!anyRevealed && (
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>
            Investigate at least one item above before making a decision.
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
          {phase.options.map(opt => {
            const isChosen = decisions[phase.id] === opt.id;
            const showResult = decided && isChosen;
            const btnColor = showResult
              ? (opt.correct ? "#34D399" : "#F87171")
              : (decided ? "var(--border)" : phaseColor_);

            return (
              <div key={opt.id}>
                <button
                  onClick={() => anyRevealed && !decided && makeDecision(opt.id)}
                  disabled={decided || !anyRevealed}
                  style={{
                    width: "100%", padding: "13px 18px", borderRadius: 10,
                    border: `1.5px solid ${isChosen ? btnColor : (decided ? "var(--border)" : phaseColor_ + "44")}`,
                    background: isChosen ? btnColor + "20" : (decided ? "var(--bg-raised)" : phaseColor_ + "0A"),
                    color: isChosen ? btnColor : (decided ? "var(--text-muted)" : "var(--text-body)"),
                    fontWeight: isChosen ? 700 : 500, fontSize: 13, cursor: decided || !anyRevealed ? "default" : "pointer",
                    textAlign: "left", transition: "all 0.18s",
                    display: "flex", alignItems: "center", gap: 10,
                  }}
                  onMouseEnter={e => { if (!decided && anyRevealed) e.currentTarget.style.borderColor = phaseColor_; }}
                  onMouseLeave={e => { if (!decided && anyRevealed) e.currentTarget.style.borderColor = phaseColor_ + "44"; }}
                >
                  {isChosen && <span style={{ fontSize: 16, flexShrink: 0 }}>{opt.correct ? "✅" : "❌"}</span>}
                  <span>{opt.label}</span>
                </button>
                {/* Feedback */}
                {showResult && (
                  <div style={{
                    marginTop: 8, padding: "12px 16px",
                    background: opt.correct ? "#34D39912" : "#F8717112",
                    border: `1px solid ${opt.correct ? "#34D39933" : "#F8717133"}`,
                    borderLeft: `4px solid ${opt.correct ? "#34D399" : "#F87171"}`,
                    borderRadius: 8, fontSize: 13, color: "var(--text-body)", lineHeight: 1.65,
                    animation: "fadeUp 0.25s ease",
                  }}>
                    <strong style={{ color: opt.correct ? "#34D399" : "#F87171" }}>
                      {opt.correct ? "Correct!" : "Not quite."}
                    </strong>{" "}
                    {opt.feedback}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Next phase / finish button */}
        {decided && (
          <button
            onClick={nextPhase}
            style={{
              marginTop: 18, width: "100%", padding: "13px 20px", borderRadius: 10,
              border: `1.5px solid ${phaseColor_}`,
              background: `linear-gradient(135deg, ${phaseColor_}20, ${phaseColor_}10)`,
              color: phaseColor_, fontWeight: 700, fontSize: 14, cursor: "pointer",
              transition: "all 0.18s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = phaseColor_ + "30"; }}
            onMouseLeave={e => { e.currentTarget.style.background = `linear-gradient(135deg, ${phaseColor_}20, ${phaseColor_}10)`; }}
          >
            {phaseIdx + 1 < totalPhases ? `Continue to ${selected.phases[phaseIdx + 1].title} →` : "See Final Verdict →"}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Tab 3: Root Causes ──────────────────────────────────── */
function RootCausesTab() {
  const [expanded, setExpanded] = useState(null);
  const [hovered, setHovered] = useState(null);

  function toggle(cat) { setExpanded(exp => exp === cat ? null : cat); }

  return (
    <div>
      <SectionHeader
        icon="🔎"
        title="Root Cause Categories"
        subtitle="Common root causes investigated during OOS Phase 1 and Phase 2B — click a category to expand examples"
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {ROOT_CAUSES.map(rc => {
          const isOpen = expanded === rc.category;
          return (
            <div
              key={rc.category}
              style={{
                background: "var(--bg-card)",
                border: `1.5px solid ${isOpen ? rc.color + "66" : "var(--border)"}`,
                borderTop: `4px solid ${rc.color}`, borderRadius: 12, overflow: "hidden",
                transition: "all 0.18s",
                boxShadow: hovered === rc.category || isOpen
                  ? `0 6px 24px rgba(0,0,0,0.4), 0 0 0 1px ${rc.color}33` : "0 2px 8px rgba(0,0,0,0.22)",
              }}
            >
              <button
                onClick={() => toggle(rc.category)}
                onMouseEnter={() => setHovered(rc.category)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  width: "100%", padding: "18px 20px", background: "transparent",
                  border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, textAlign: "left",
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: rc.color + "20",
                  border: `1.5px solid ${rc.color}44`, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 20, flexShrink: 0,
                }}>
                  {rc.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-h)", marginBottom: 2 }}>{rc.category}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {rc.examples.length} example causes — {isOpen ? "click to collapse" : "click to expand"}
                  </div>
                </div>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: rc.color + "18",
                  border: `1.5px solid ${rc.color}44`, display: "flex", alignItems: "center",
                  justifyContent: "center", color: rc.color, fontSize: 14, fontWeight: 700,
                  transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0,
                }}>
                  ↓
                </div>
              </button>
              {isOpen && (
                <div style={{ padding: "0 20px 18px", animation: "slideDown 0.22s ease", borderTop: `1px solid ${rc.color}22` }}>
                  <div style={{ paddingTop: 14 }}>
                    {rc.examples.map((ex, i) => (
                      <div key={i} style={{
                        display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0",
                        borderBottom: i < rc.examples.length - 1 ? "1px solid var(--border)" : "none",
                      }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: rc.color, marginTop: 6, flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.55 }}>{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{
        marginTop: 28, padding: "16px 20px", background: "var(--bg-card)",
        border: "1px solid var(--border)", borderLeft: "4px solid #F59E0B",
        borderRadius: 10, fontSize: 13, color: "var(--text-sec)", lineHeight: 1.7,
      }}>
        <strong style={{ color: "var(--text-h)", display: "block", marginBottom: 6 }}>Root Cause Investigation Requirements (21 CFR 211.192)</strong>
        Each root cause must be documented with supporting evidence — instrument logs, analyst records, calibration data, environmental monitoring reports.
        Suspected causes without supporting evidence are insufficient for Phase 1 invalidation.
        Phase 2B manufacturing investigation requires review of batch production records, equipment maintenance logs, raw material CoAs, and process parameter data.
      </div>
    </div>
  );
}

/* ─── Tab 4: OOT Criteria ─────────────────────────────────── */
function OOTCriteriaTab() {
  const [hovered, setHovered] = useState(null);

  const typeColors = { warning: "#F59E0B", reject: "#F472B6", trend: "#38BDF8", alert: "#FB923C" };
  const typeIcons = { warning: "⚠️", reject: "🚫", trend: "📈", alert: "🔔" };
  const typeLabels = { warning: "Warning", reject: "Reject", trend: "Trend", alert: "Alert" };

  return (
    <div>
      <SectionHeader
        icon="📊"
        title="OOT / Statistical Control Criteria"
        subtitle="Westgard rules and statistical control criteria for Out-of-Trend (OOT) detection — ICH Q10, ICH Q9, USP <1010>"
      />
      <div style={{
        padding: "14px 18px", background: "var(--bg-raised)", border: "1px solid var(--border)",
        borderLeft: "4px solid #A78BFA", borderRadius: 10, marginBottom: 28,
        fontSize: 13, color: "var(--text-sec)", lineHeight: 1.7,
      }}>
        <strong style={{ color: "var(--text-h)" }}>OOT vs OOS:</strong> An Out-of-Trend (OOT) result is within specification but follows an unexpected statistical
        pattern. OOT triggers enhanced monitoring and investigation before a formal OOS occurs.
        Westgard rules are widely adopted in pharmaceutical QC per USP &lt;1010&gt; and ICH Q10 continuous improvement principles.
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 22 }}>
        {Object.entries(typeColors).map(([type, color]) => (
          <div key={type} style={{
            display: "flex", alignItems: "center", gap: 7, padding: "6px 14px",
            borderRadius: 20, background: color + "18", border: `1.5px solid ${color}44`,
          }}>
            <span style={{ fontSize: 13 }}>{typeIcons[type]}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color }}>{typeLabels[type]}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {OOT_CRITERIA.map(rule => {
          const color = typeColors[rule.type] || rule.color;
          return (
            <div
              key={rule.rule}
              onMouseEnter={() => setHovered(rule.rule)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "var(--bg-card)", border: "1.5px solid var(--border)",
                borderLeft: `5px solid ${color}`, borderRadius: 10, padding: "18px 20px",
                transition: "all 0.18s",
                boxShadow: hovered === rule.rule ? `0 6px 24px rgba(0,0,0,0.4), 0 0 0 1px ${color}33` : "0 2px 8px rgba(0,0,0,0.22)",
                transform: hovered === rule.rule ? "translateY(-1px)" : "translateY(0)",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ padding: "3px 12px", borderRadius: 20, background: color + "20", color, fontSize: 13, fontWeight: 800, border: `1.5px solid ${color}44` }}>
                      {rule.rule}
                    </span>
                    <span style={{ padding: "2px 8px", borderRadius: 6, background: color + "18", color, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {typeIcons[rule.type]} {typeLabels[rule.type]}
                    </span>
                  </div>
                  <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--text-body)", lineHeight: 1.55, fontWeight: 500 }}>{rule.description}</p>
                  <div style={{ display: "flex", gap: 8, padding: "10px 12px", background: color + "10", border: `1px solid ${color}30`, borderRadius: 7 }}>
                    <span style={{ fontSize: 12, color, fontWeight: 700, flexShrink: 0 }}>Required Action:</span>
                    <span style={{ fontSize: 12, color: "var(--text-sec)", lineHeight: 1.55 }}>{rule.action}</span>
                  </div>
                </div>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, background: color + "18",
                  border: `2px solid ${color}44`, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 22, flexShrink: 0,
                }}>
                  {typeIcons[rule.type]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
        {[
          { ref: "USP <1010>", desc: "Analytical Data Interpretation and Treatment — trending and statistical evaluation of analytical data" },
          { ref: "ICH Q10", desc: "Pharmaceutical Quality System — product lifecycle monitoring, OOT detection framework" },
          { ref: "ICH Q9(R1)", desc: "Quality Risk Management — risk-based approach to OOT investigations and escalation decisions" },
          { ref: "21 CFR 211.192", desc: "Production record review — investigation of any unexplained discrepancy or failure of a batch" },
        ].map(r => (
          <div key={r.ref} style={{ padding: "14px 16px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 9 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#A78BFA", marginBottom: 6, fontFamily: "monospace" }}>{r.ref}</div>
            <div style={{ fontSize: 12, color: "var(--text-sec)", lineHeight: 1.55 }}>{r.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Export ─────────────────────────────────────────── */
export default function OOSView() {
  const [activeTab, setActiveTab] = useState("Decision Tree");
  const tabs = ["Decision Tree", "Case Simulator", "Root Causes", "OOT Criteria"];
  const totalNodes = Object.keys(OOS_TREE).length;
  const resultNodes = Object.values(OOS_TREE).filter(n => n.type === "result").length;

  return (
    <div className="view-enter" style={{ maxWidth: 1080, margin: "0 auto", padding: "32px 24px" }}>

      {/* Page header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
          <div style={{
            width: 50, height: 50, borderRadius: 14,
            background: "linear-gradient(135deg, #F59E0B, #F472B6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, boxShadow: "0 4px 16px rgba(245,158,11,0.35)",
          }}>
            🔍
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "var(--text-h)", letterSpacing: "-0.5px" }}>
              OOS / OOT Investigation
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-sec)" }}>
              FDA 2006 OOS Guidance · 21 CFR 211.192 · Barr Laboratories · Westgard Rules · ICH Q10
            </p>
          </div>
        </div>
        {/* Quick stats */}
        <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
          {[
            { label: "Decision Nodes", value: totalNodes - resultNodes, color: "#38BDF8" },
            { label: "Outcome Nodes", value: resultNodes, color: "#A78BFA" },
            { label: "Root Cause Categories", value: ROOT_CAUSES.length, color: "#F59E0B" },
            { label: "OOT / Westgard Rules", value: OOT_CRITERIA.length, color: "#34D399" },
            { label: "Case Simulations", value: OOS_SCENARIOS.length, color: "#F472B6" },
          ].map(s => (
            <div key={s.label} style={{
              padding: "10px 16px", borderRadius: 10, background: "var(--bg-card)",
              border: `1px solid ${s.color}44`, display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</span>
              <span style={{ fontSize: 12, color: "var(--text-sec)", fontWeight: 500 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tab nav */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <TabBtn key={t} label={t} active={activeTab === t} onClick={() => setActiveTab(t)} />
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "Decision Tree" && <DecisionTreeTab />}
        {activeTab === "Case Simulator" && <SimulatorTab />}
        {activeTab === "Root Causes" && <RootCausesTab />}
        {activeTab === "OOT Criteria" && <OOTCriteriaTab />}
      </div>
    </div>
  );
}
