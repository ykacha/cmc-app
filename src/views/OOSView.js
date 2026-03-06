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

/* ─── Decision Tree: node order + phase groups ────────────── */
const NODE_ORDER = [
  "start",
  "phase1-start", "phase1-invalidate", "phase1-retest", "phase1-pass", "phase1-no-cause",
  "phase2a-start", "phase2a-confirm", "phase2a-resolved", "phase2a-inconclusive",
  "phase2b-start", "phase2b-cause-found", "phase2b-no-cause", "phase2b-further", "phase2b-reject",
];
const NODE_NUM = Object.fromEntries(NODE_ORDER.map((id, i) => [id, i + 1]));

const PHASE_HEADERS = {
  "start":        { label: "Initial Assessment", color: "#38BDF8", desc: "Confirm and document the OOS/OOT result before starting the investigation" },
  "phase1-start": { label: "Phase 1 — Laboratory Investigation", color: "#34D399", desc: "Immediate laboratory investigation by the analyst (FDA 2006 Section IVA)" },
  "phase2a-start":{ label: "Phase 2A — Expanded Laboratory", color: "#F59E0B", desc: "Additional testing of retained samples with a second analyst (Section IVB1)" },
  "phase2b-start":{ label: "Phase 2B — Manufacturing Investigation", color: "#F472B6", desc: "Full batch record review and manufacturing investigation (Section IVB2)" },
};

/* ─── Tab 1: Decision Tree ────────────────────────────────── */
function DecisionTreeTab() {
  const [currentId, setCurrentId] = useState("start");
  const [visited, setVisited] = useState([]);

  function navigate(targetId) {
    if (!targetId || !OOS_TREE[targetId]) return;
    setVisited(prev => [...prev, currentId]);
    setCurrentId(targetId);
    setTimeout(() => {
      document.getElementById(`oos-node-${targetId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }

  function reset() { setCurrentId("start"); setVisited([]); }

  function goBack() {
    if (!visited.length) return;
    const prev = [...visited];
    const last = prev.pop();
    setVisited(prev);
    setCurrentId(last);
  }


  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h3 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800, color: "var(--text-h)" }}>
            OOS Decision Tree — FDA 2006 Guidance
          </h3>
          <p style={{ margin: 0, fontSize: 13, color: "var(--text-sec)" }}>
            All {NODE_ORDER.length} nodes shown below. Click any node to focus it, then use YES / NO to navigate the investigation path.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {visited.length > 0 && (
            <button
              onClick={goBack}
              style={{
                padding: "8px 16px", borderRadius: 8, border: "1.5px solid var(--border)",
                background: "transparent", color: "var(--text-sec)", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}
            >
              ← Back
            </button>
          )}
          <button
            onClick={reset}
            style={{
              padding: "8px 16px", borderRadius: 8, border: "1.5px solid #F4727288",
              background: "#F4727218", color: "#F47272", fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}
          >
            ↺ Restart
          </button>
        </div>
      </div>

      {/* Phase legend */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {Object.entries(PHASE_HEADERS).map(([, ph]) => (
          <div key={ph.label} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "5px 12px", borderRadius: 20,
            background: ph.color + "18", border: `1px solid ${ph.color}44`,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: ph.color, flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: ph.color }}>{ph.label}</span>
          </div>
        ))}
      </div>

      {/* Full tree — all nodes */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {NODE_ORDER.map((nodeId) => {
          const n = OOS_TREE[nodeId];
          if (!n) return null;
          const isActive = nodeId === currentId;
          const wasVisited = visited.includes(nodeId);
          const isResult = n.type === "result";
          const pc = phaseColor(n.phase);
          const num = NODE_NUM[nodeId];

          // Phase header divider
          const phaseHeader = PHASE_HEADERS[nodeId];

          // Outcome type styling
          const outcomeColor = isResult
            ? (n.outcome === "pass" ? "#34D399" : "#F87171")
            : null;

          return (
            <div key={nodeId}>
              {/* Phase divider */}
              {phaseHeader && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 12,
                  margin: nodeId === "start" ? "0 0 12px" : "20px 0 12px",
                  paddingBottom: 10, borderBottom: `2px solid ${phaseHeader.color}33`,
                }}>
                  <div style={{
                    width: 12, height: 12, borderRadius: "50%",
                    background: phaseHeader.color, flexShrink: 0,
                    boxShadow: `0 0 8px ${phaseHeader.color}88`,
                  }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: phaseHeader.color, letterSpacing: "0.3px" }}>
                      {phaseHeader.label}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>{phaseHeader.desc}</div>
                  </div>
                </div>
              )}

              {/* Node card */}
              <div
                id={`oos-node-${nodeId}`}
                onClick={() => { if (!isActive) { setVisited(prev => [...prev, currentId]); setCurrentId(nodeId); } }}
                style={{
                  display: "flex", gap: 0, marginBottom: 8, cursor: isActive ? "default" : "pointer",
                  borderRadius: 12, overflow: "hidden",
                  border: `1.5px solid ${isActive ? pc : wasVisited ? pc + "55" : "var(--border)"}`,
                  boxShadow: isActive ? `0 4px 20px ${pc}33` : "none",
                  transition: "all 0.2s",
                  opacity: (!isActive && !wasVisited && nodeId !== "start") ? 0.65 : 1,
                }}
              >
                {/* Left phase stripe + node number */}
                <div style={{
                  width: 48, flexShrink: 0,
                  background: isResult ? (outcomeColor + "20") : (isActive ? pc + "22" : pc + "0C"),
                  borderRight: `3px solid ${isResult ? outcomeColor : pc}`,
                  display: "flex", flexDirection: "column", alignItems: "center",
                  justifyContent: "flex-start", paddingTop: 16, gap: 4,
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: isResult ? (outcomeColor + "30") : (isActive ? pc + "33" : "var(--bg-raised)"),
                    border: `2px solid ${isResult ? outcomeColor : (isActive ? pc : pc + "55")}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 800,
                    color: isResult ? outcomeColor : (isActive ? pc : "var(--text-muted)"),
                  }}>
                    {num}
                  </div>
                  {wasVisited && !isActive && (
                    <div style={{ fontSize: 10, color: pc, fontWeight: 700, marginTop: 2 }}>✓</div>
                  )}
                  {isActive && (
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: pc, marginTop: 2 }} />
                  )}
                </div>

                {/* Node body */}
                <div style={{
                  flex: 1, padding: isActive ? "16px 20px" : "12px 18px",
                  background: isActive ? "var(--bg-card)" : "var(--bg-raised)",
                  transition: "all 0.2s",
                }}>
                  {/* Phase badge + ref */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                    <span style={{
                      padding: "2px 10px", borderRadius: 12,
                      background: (isResult ? outcomeColor : pc) + "18",
                      color: isResult ? outcomeColor : pc,
                      fontSize: 10, fontWeight: 700, letterSpacing: "0.3px",
                      border: `1px solid ${(isResult ? outcomeColor : pc) + "44"}`,
                    }}>
                      {isResult ? (n.outcome === "pass" ? "✅ RESOLVED" : "❌ REJECTED") : n.phase}
                    </span>
                    {n.ref && isActive && (
                      <span style={{ fontSize: 10, color: "var(--text-muted)", fontStyle: "italic" }}>{n.ref}</span>
                    )}
                  </div>

                  {/* Question */}
                  <div style={{
                    fontWeight: isActive ? 700 : 600,
                    fontSize: isActive ? 15 : 13,
                    color: isActive ? "var(--text-h)" : "var(--text-body)",
                    lineHeight: 1.45,
                    marginBottom: isActive ? 16 : 8,
                    overflow: isActive ? "visible" : "hidden",
                    display: isActive ? "block" : "-webkit-box",
                    WebkitLineClamp: isActive ? "none" : 2,
                    WebkitBoxOrient: "vertical",
                  }}>
                    {n.question}
                  </div>

                  {/* YES/NO path arrows — always visible when not active */}
                  {!isActive && (
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {n.yes && (
                        <button
                          onClick={e => { e.stopPropagation(); navigate(n.yes); }}
                          style={{
                            padding: "3px 10px", borderRadius: 10, fontSize: 11, fontWeight: 700,
                            background: "#34D39918", border: "1px solid #34D39944",
                            color: "#34D399", cursor: "pointer",
                          }}
                        >
                          YES → #{NODE_NUM[n.yes]}
                        </button>
                      )}
                      {n.no && (
                        <button
                          onClick={e => { e.stopPropagation(); navigate(n.no); }}
                          style={{
                            padding: "3px 10px", borderRadius: 10, fontSize: 11, fontWeight: 700,
                            background: "#F59E0B18", border: "1px solid #F59E0B44",
                            color: "#F59E0B", cursor: "pointer",
                          }}
                        >
                          NO → #{NODE_NUM[n.no]}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Expanded detail — only for active node */}
                  {isActive && (
                    <div style={{ animation: "fadeUp 0.2s ease" }}>
                      {/* Guidance */}
                      <div style={{
                        padding: "12px 16px", background: "var(--bg-raised)",
                        border: "1px solid var(--border)", borderLeft: `3px solid ${pc}`,
                        borderRadius: 8, fontSize: 13, color: "var(--text-sec)",
                        lineHeight: 1.7, marginBottom: 10,
                      }}>
                        <strong style={{ color: "var(--text-h)", display: "block", marginBottom: 5, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.4px" }}>
                          Guidance
                        </strong>
                        {n.guidance}
                      </div>

                      {/* Example */}
                      {n.example && (
                        <div style={{
                          padding: "10px 14px", background: "#A78BFA0C",
                          border: "1px solid #A78BFA30", borderLeft: "3px solid #A78BFA",
                          borderRadius: 8, fontSize: 12, color: "var(--text-sec)", lineHeight: 1.65, marginBottom: 16,
                        }}>
                          <strong style={{ color: "#A78BFA", display: "block", marginBottom: 4, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.4px" }}>
                            Real-World Example
                          </strong>
                          {n.example}
                        </div>
                      )}

                      {/* YES / NO action buttons */}
                      {!isResult && (
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                          {n.yes && (
                            <button
                              onClick={() => navigate(n.yes)}
                              style={{
                                flex: 1, minWidth: 160, padding: "11px 16px", borderRadius: 10,
                                border: "1.5px solid #34D39966",
                                background: "linear-gradient(135deg, #34D39922, #34D39910)",
                                color: "#34D399", fontWeight: 700, fontSize: 13, cursor: "pointer",
                                textAlign: "center", transition: "all 0.15s",
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = "#34D39935"}
                              onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(135deg, #34D39922, #34D39910)"}
                            >
                              <span style={{ fontSize: 14 }}>✓</span><br />
                              <span style={{ fontSize: 12 }}>{n.yesLabel || "Yes"}</span>
                            </button>
                          )}
                          {n.no && (
                            <button
                              onClick={() => navigate(n.no)}
                              style={{
                                flex: 1, minWidth: 160, padding: "11px 16px", borderRadius: 10,
                                border: "1.5px solid #F59E0B66",
                                background: "linear-gradient(135deg, #F59E0B18, #F59E0B0A)",
                                color: "#F59E0B", fontWeight: 700, fontSize: 13, cursor: "pointer",
                                textAlign: "center", transition: "all 0.15s",
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = "#F59E0B28"}
                              onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(135deg, #F59E0B18, #F59E0B0A)"}
                            >
                              <span style={{ fontSize: 14 }}>✗</span><br />
                              <span style={{ fontSize: 12 }}>{n.noLabel || "No"}</span>
                            </button>
                          )}
                        </div>
                      )}

                      {/* Outcome result banner */}
                      {isResult && (
                        <div style={{
                          padding: "14px 18px", borderRadius: 10,
                          background: n.outcome === "pass" ? "#34D39918" : "#F8717118",
                          border: `1.5px solid ${n.outcome === "pass" ? "#34D39955" : "#F8717155"}`,
                          display: "flex", alignItems: "center", gap: 12,
                        }}>
                          <span style={{ fontSize: 26 }}>{n.outcome === "pass" ? "✅" : "❌"}</span>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: 14, color: n.outcome === "pass" ? "#34D399" : "#F87171", marginBottom: 2 }}>
                              {n.outcome === "pass" ? "INVESTIGATION RESOLVED — BATCH MAY PROCEED" : "BATCH REJECTED — OOS CONFIRMED"}
                            </div>
                            <div style={{ fontSize: 12, color: "var(--text-sec)" }}>
                              {n.outcome === "pass"
                                ? "Document all findings. Apply CAPA if systemic issue. Close deviation. ↺ Click Restart to investigate a new path."
                                : "Mandatory CAPA required. Regulatory notification assessment. Complete documentation. ↺ Click Restart to investigate a new path."}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Regulatory callout */}
      <div style={{
        marginTop: 24, padding: "14px 18px", background: "var(--bg-raised)",
        border: "1px solid var(--border)", borderLeft: "4px solid #38BDF8",
        borderRadius: 10, fontSize: 12, color: "var(--text-sec)", lineHeight: 1.65,
      }}>
        <strong style={{ color: "var(--text-h)" }}>Key regulatory principle:</strong> Per FDA 2006 OOS Guidance and <em>United States v. Barr Laboratories</em> (1993),
        an unexplained OOS result that cannot be traced to a confirmed, documented laboratory error must be treated as a real OOS.
        Phase 1 invalidation requires a confirmed, documented cause — suspicion alone is insufficient.
      </div>
    </div>
  );
}

/* ─── Tab 2: Case Simulator ───────────────────────────────── */
const DIFF_LEVELS = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];
const DIFF_COLORS = { Beginner: "#34D399", Intermediate: "#F59E0B", Advanced: "#F97316", Expert: "#EF4444" };

function SimulatorTab() {
  const [selected, setSelected] = useState(null);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [revealed, setRevealed] = useState(new Set());
  const [decisions, setDecisions] = useState({});
  const [score, setScore] = useState(0);
  const [diffFilter, setDiffFilter] = useState("All");

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

  const filteredScenarios = diffFilter === "All" ? OOS_SCENARIOS : OOS_SCENARIOS.filter(s => s.difficulty === diffFilter);

  // ── Scenario selection ──
  if (!selected) {
    return (
      <div>
        <SectionHeader
          icon="🎮"
          title="Investigation Simulator"
          subtitle="20 cases across 4 difficulty levels — reveal evidence, make decisions, and follow the regulatory path to a verdict."
        />

        {/* Difficulty filter + stats */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {DIFF_LEVELS.map(d => {
            const count = d === "All" ? OOS_SCENARIOS.length : OOS_SCENARIOS.filter(s => s.difficulty === d).length;
            const active = diffFilter === d;
            const col = DIFF_COLORS[d] || "var(--accent)";
            return (
              <button key={d} onClick={() => setDiffFilter(d)}
                style={{
                  background: active ? (d === "All" ? "var(--accent)" : col) : "var(--bg-raised)",
                  color: active ? "#fff" : "var(--text-sec)",
                  border: `1.5px solid ${active ? (d === "All" ? "var(--accent)" : col) : "var(--border)"}`,
                  borderRadius: 20, padding: "5px 14px", cursor: "pointer", fontWeight: active ? 700 : 500, fontSize: 12,
                  transition: "all 0.15s",
                }}>
                {d} <span style={{ opacity: 0.7 }}>({count})</span>
              </button>
            );
          })}
          <span style={{ marginLeft: "auto", color: "var(--text-faint)", fontSize: 11 }}>
            {filteredScenarios.length} case{filteredScenarios.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {filteredScenarios.map(s => (
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
              <div style={{ padding: "14px 16px" }}>
                <div style={{
                  fontWeight: 800, fontSize: 14, color: "var(--text-h)", marginBottom: 3,
                  lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>{s.title}</div>
                <div style={{
                  fontSize: 11, color: "var(--text-sec)", marginBottom: 12,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>{s.product}</div>
                {/* Finding card — fully stacked, all overflow contained */}
                <div style={{
                  background: "var(--bg-raised)", border: "1px solid var(--border)",
                  borderRadius: 8, padding: "9px 12px", marginBottom: 12,
                  overflow: "hidden",
                }}>
                  {/* Method name — 1-line truncated */}
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: "var(--text-muted)",
                    textTransform: "uppercase", letterSpacing: "0.05em",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    marginBottom: 5,
                  }}>
                    {s.method}
                  </div>
                  {/* Result — 2-line clamp, never overflows */}
                  <div style={{
                    fontWeight: 900, fontSize: 14,
                    color: s.isOOT ? "#38BDF8" : "#F87171",
                    lineHeight: 1.35, marginBottom: 4,
                    display: "-webkit-box", WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>
                    {s.finding.result}
                  </div>
                  {/* Spec — 1-line truncated */}
                  <div style={{
                    fontSize: 10, color: "var(--text-faint)", fontWeight: 600,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    Spec: {s.finding.spec}
                  </div>
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
    <div className="view-enter" style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 24px" }}>

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
