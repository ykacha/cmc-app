import { useState } from "react";
import { OOS_TREE, ROOT_CAUSES, OOT_CRITERIA } from "../oos-data";

/* ─── Shared tiny components ──────────────────────────────── */
function SectionHeader({ icon, title, subtitle }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <h2 style={{
          margin: 0,
          fontSize: 20,
          fontWeight: 700,
          color: "var(--text-h)",
          letterSpacing: "-0.3px",
        }}>{title}</h2>
      </div>
      {subtitle && (
        <p style={{ margin: 0, fontSize: 13, color: "var(--text-sec)", paddingLeft: 32 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function TabBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "9px 20px",
        borderRadius: 8,
        border: "1.5px solid",
        borderColor: active ? "var(--accent-glow)" : "var(--border)",
        background: active ? "var(--accent)" : "transparent",
        color: active ? "#fff" : "var(--text-sec)",
        fontWeight: active ? 700 : 500,
        fontSize: 13,
        cursor: "pointer",
        transition: "all 0.18s ease",
        letterSpacing: "0.1px",
      }}
    >
      {label}
    </button>
  );
}

/* ─── Phase color map ─────────────────────────────────────── */
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

function phaseColor(phase) {
  return PHASE_COLORS[phase] || "#6B88A8";
}

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
        subtitle="FDA 2006 OOS Guidance — Phase 1 laboratory investigation → Phase 2A/2B manufacturing investigation"
      />

      {/* Path breadcrumb */}
      {visited.length > 0 && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          flexWrap: "wrap",
          padding: "10px 14px",
          background: "var(--bg-raised)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          marginBottom: 20,
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
                    const newVisited = visited.slice(0, i);
                    setVisited(newVisited);
                    setCurrentId(vid);
                    setAnimKey(k => k + 1);
                  }}
                  style={{
                    padding: "3px 10px",
                    borderRadius: 14,
                    border: `1.5px solid ${vColor}44`,
                    background: vColor + "18",
                    color: vColor,
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {vNode?.phase?.replace("Phase ", "P") || vid}
                </button>
                {i < visited.length - 1 && (
                  <span style={{ color: "var(--text-muted)", fontSize: 13 }}>›</span>
                )}
              </span>
            );
          })}
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>›</span>
          <span style={{
            padding: "3px 10px",
            borderRadius: 14,
            border: `1.5px solid ${pColor}66`,
            background: pColor + "22",
            color: pColor,
            fontSize: 11,
            fontWeight: 700,
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
          borderRadius: 14,
          padding: 28,
          animation: "fadeUp 0.25s ease",
          marginBottom: 20,
          boxShadow: isResult
            ? `0 8px 32px ${node.outcome === "pass" ? "rgba(52,211,153,0.25)" : "rgba(244,114,182,0.25)"}`
            : "0 4px 16px rgba(0,0,0,0.3)",
        }}
      >
        {/* Phase badge */}
        <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: 20,
            background: pColor + "22",
            color: pColor,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.4px",
            border: `1.5px solid ${pColor}44`,
          }}>
            {node.phase}
          </span>
          {node.ref && (
            <span style={{
              fontSize: 11,
              color: "var(--text-muted)",
              fontStyle: "italic",
            }}>
              {node.ref}
            </span>
          )}
        </div>

        {/* Result outcome banner */}
        {isResult && (
          <div style={{
            padding: "14px 18px",
            borderRadius: 10,
            background: node.outcome === "pass" ? "#34D39920" : "#F472B620",
            border: `1.5px solid ${node.outcome === "pass" ? "#34D39955" : "#F472B655"}`,
            marginBottom: 18,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <span style={{ fontSize: 28 }}>{node.outcome === "pass" ? "✅" : "❌"}</span>
            <div>
              <div style={{
                fontWeight: 800,
                fontSize: 16,
                color: node.outcome === "pass" ? "#34D399" : "#F472B6",
                marginBottom: 2,
              }}>
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
        <h3 style={{
          margin: "0 0 14px",
          fontSize: isResult ? 16 : 17,
          fontWeight: 700,
          color: "var(--text-h)",
          lineHeight: 1.45,
        }}>
          {node.question}
        </h3>

        {/* Guidance */}
        <div style={{
          padding: "14px 16px",
          background: "var(--bg-raised)",
          border: "1px solid var(--border)",
          borderLeft: `3px solid ${pColor}`,
          borderRadius: 8,
          fontSize: 13,
          color: "var(--text-sec)",
          lineHeight: 1.7,
        }}>
          <strong style={{ color: "var(--text-h)", display: "block", marginBottom: 6, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.4px" }}>
            Guidance
          </strong>
          {node.guidance}
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {/* Yes button */}
        {!isResult && node.yes && (
          <button
            onClick={() => navigate(node.yes)}
            style={{
              flex: 1,
              minWidth: 200,
              padding: "13px 20px",
              borderRadius: 10,
              border: "1.5px solid #34D39955",
              background: "linear-gradient(135deg, #34D39920, #34D39910)",
              color: "#34D399",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              transition: "all 0.18s ease",
              textAlign: "center",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#34D39930";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(52,211,153,0.25)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "linear-gradient(135deg, #34D39920, #34D39910)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: 18, marginBottom: 2 }}>✓</div>
            <div>{node.yesLabel || "Yes"}</div>
          </button>
        )}

        {/* No button */}
        {!isResult && node.no && (
          <button
            onClick={() => navigate(node.no)}
            style={{
              flex: 1,
              minWidth: 200,
              padding: "13px 20px",
              borderRadius: 10,
              border: "1.5px solid #F59E0B55",
              background: "linear-gradient(135deg, #F59E0B18, #F59E0B10)",
              color: "#F59E0B",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              transition: "all 0.18s ease",
              textAlign: "center",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#F59E0B28";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(245,158,11,0.25)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "linear-gradient(135deg, #F59E0B18, #F59E0B10)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: 18, marginBottom: 2 }}>✗</div>
            <div>{node.noLabel || "No"}</div>
          </button>
        )}
      </div>

      {/* Navigation controls */}
      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        {visited.length > 0 && (
          <button
            onClick={goBack}
            style={{
              padding: "9px 18px",
              borderRadius: 8,
              border: "1.5px solid var(--border)",
              background: "transparent",
              color: "var(--text-sec)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s",
              display: "flex",
              alignItems: "center",
              gap: 6,
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
            padding: "9px 18px",
            borderRadius: 8,
            border: "1.5px solid #F47272aa",
            background: "#F4727218",
            color: "#F47272",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.15s",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#F4727230"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#F4727218"; }}
        >
          ↺ Reset to Start
        </button>

        {/* Step counter */}
        <div style={{
          marginLeft: "auto",
          padding: "9px 14px",
          borderRadius: 8,
          background: "var(--bg-raised)",
          border: "1px solid var(--border)",
          fontSize: 12,
          color: "var(--text-muted)",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}>
          Step {visited.length + 1} of investigation
          {isResult && (
            <span style={{
              marginLeft: 6,
              padding: "2px 8px",
              borderRadius: 10,
              background: node.outcome === "pass" ? "#34D39920" : "#F472B620",
              color: node.outcome === "pass" ? "#34D399" : "#F472B6",
              fontWeight: 700,
              fontSize: 11,
            }}>
              {node.outcome === "pass" ? "RESOLVED" : "REJECTED"}
            </span>
          )}
        </div>
      </div>

      {/* FDA info callout */}
      <div style={{
        marginTop: 28,
        padding: "14px 18px",
        background: "var(--bg-raised)",
        border: "1px solid var(--border)",
        borderLeft: "4px solid #38BDF8",
        borderRadius: 10,
        fontSize: 12,
        color: "var(--text-sec)",
        lineHeight: 1.65,
      }}>
        <strong style={{ color: "var(--text-h)" }}>Key regulatory principle:</strong> Per FDA 2006 OOS Guidance and United States v. Barr Laboratories (1993),
        an unexplained OOS result that cannot be traced to a confirmed, documented laboratory error must be treated as a real OOS.
        A batch <em>cannot</em> be released solely on the basis of passing retests when the original OOS cannot be explained.
        Phase 1 invalidation requires confirmed, documented cause — suspicion alone is insufficient.
      </div>
    </div>
  );
}

/* ─── Tab 2: Root Causes ──────────────────────────────────── */
function RootCausesTab() {
  const [expanded, setExpanded] = useState(null);
  const [hovered, setHovered] = useState(null);

  function toggle(cat) {
    setExpanded(exp => exp === cat ? null : cat);
  }

  return (
    <div>
      <SectionHeader
        icon="🔎"
        title="Root Cause Categories"
        subtitle="Common root causes investigated during OOS Phase 1 and Phase 2B — click a category to expand examples"
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {ROOT_CAUSES.map((rc) => {
          const isOpen = expanded === rc.category;
          const isHov = hovered === rc.category;
          return (
            <div
              key={rc.category}
              style={{
                background: "var(--bg-card)",
                border: `1.5px solid ${isOpen ? rc.color + "66" : "var(--border)"}`,
                borderTop: `4px solid ${rc.color}`,
                borderRadius: 12,
                overflow: "hidden",
                transition: "all 0.18s ease",
                boxShadow: isHov || isOpen
                  ? `0 6px 24px rgba(0,0,0,0.4), 0 0 0 1px ${rc.color}33`
                  : "0 2px 8px rgba(0,0,0,0.22)",
              }}
            >
              {/* Card header — always visible */}
              <button
                onClick={() => toggle(rc.category)}
                onMouseEnter={() => setHovered(rc.category)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  width: "100%",
                  padding: "18px 20px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  textAlign: "left",
                }}
              >
                <div style={{
                  width: 44, height: 44,
                  borderRadius: 12,
                  background: rc.color + "20",
                  border: `1.5px solid ${rc.color}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}>
                  {rc.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-h)", marginBottom: 2 }}>
                    {rc.category}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {rc.examples.length} example causes — {isOpen ? "click to collapse" : "click to expand"}
                  </div>
                </div>
                <div style={{
                  width: 28, height: 28,
                  borderRadius: "50%",
                  background: rc.color + "18",
                  border: `1.5px solid ${rc.color}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: rc.color,
                  fontSize: 14,
                  fontWeight: 700,
                  transition: "transform 0.2s ease",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  flexShrink: 0,
                }}>
                  ↓
                </div>
              </button>

              {/* Expanded examples */}
              {isOpen && (
                <div style={{
                  padding: "0 20px 18px",
                  animation: "slideDown 0.22s ease",
                  borderTop: `1px solid ${rc.color}22`,
                }}>
                  <div style={{ paddingTop: 14 }}>
                    {rc.examples.map((ex, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          padding: "8px 0",
                          borderBottom: i < rc.examples.length - 1 ? "1px solid var(--border)" : "none",
                        }}
                      >
                        <div style={{
                          width: 6, height: 6,
                          borderRadius: "50%",
                          background: rc.color,
                          marginTop: 6,
                          flexShrink: 0,
                        }} />
                        <span style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.55 }}>
                          {ex}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Regulatory note */}
      <div style={{
        marginTop: 28,
        padding: "16px 20px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderLeft: "4px solid #F59E0B",
        borderRadius: 10,
        fontSize: 13,
        color: "var(--text-sec)",
        lineHeight: 1.7,
      }}>
        <strong style={{ color: "var(--text-h)", display: "block", marginBottom: 6 }}>Root Cause Investigation Requirements (21 CFR 211.192)</strong>
        Each root cause must be documented with supporting evidence — instrument logs, analyst records, calibration data, environmental monitoring reports.
        Suspected causes without supporting evidence are insufficient for Phase 1 invalidation.
        Phase 2B manufacturing investigation requires review of batch production records, equipment maintenance logs, raw material CoAs, and process parameter data.
      </div>
    </div>
  );
}

/* ─── Tab 3: OOT Criteria ─────────────────────────────────── */
function OOTCriteriaTab() {
  const [hovered, setHovered] = useState(null);

  const typeColors = {
    warning: "#F59E0B",
    reject:  "#F472B6",
    trend:   "#38BDF8",
    alert:   "#FB923C",
  };

  const typeIcons = {
    warning: "⚠️",
    reject:  "🚫",
    trend:   "📈",
    alert:   "🔔",
  };

  const typeLabels = {
    warning: "Warning",
    reject:  "Reject",
    trend:   "Trend",
    alert:   "Alert",
  };

  return (
    <div>
      <SectionHeader
        icon="📊"
        title="OOT / Statistical Control Criteria"
        subtitle="Westgard rules and statistical control criteria for Out-of-Trend (OOT) detection — ICH Q10, ICH Q9, USP <1010>"
      />

      {/* Intro callout */}
      <div style={{
        padding: "14px 18px",
        background: "var(--bg-raised)",
        border: "1px solid var(--border)",
        borderLeft: "4px solid #A78BFA",
        borderRadius: 10,
        marginBottom: 28,
        fontSize: 13,
        color: "var(--text-sec)",
        lineHeight: 1.7,
      }}>
        <strong style={{ color: "var(--text-h)" }}>OOT vs OOS:</strong> An Out-of-Trend (OOT) result is within specification but follows an unexpected statistical
        pattern. OOT triggers enhanced monitoring and investigation before a formal OOS occurs.
        Westgard rules are widely adopted in pharmaceutical QC per USP &lt;1010&gt; and ICH Q10 continuous improvement principles.
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 22 }}>
        {Object.entries(typeColors).map(([type, color]) => (
          <div key={type} style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "6px 14px",
            borderRadius: 20,
            background: color + "18",
            border: `1.5px solid ${color}44`,
          }}>
            <span style={{ fontSize: 13 }}>{typeIcons[type]}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color }}>{typeLabels[type]}</span>
          </div>
        ))}
      </div>

      {/* OOT cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {OOT_CRITERIA.map((rule, i) => {
          const color = typeColors[rule.type] || rule.color;
          const isHov = hovered === rule.rule;
          return (
            <div
              key={rule.rule}
              onMouseEnter={() => setHovered(rule.rule)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "var(--bg-card)",
                border: "1.5px solid var(--border)",
                borderLeft: `5px solid ${color}`,
                borderRadius: 10,
                padding: "18px 20px",
                transition: "all 0.18s ease",
                boxShadow: isHov ? `0 6px 24px rgba(0,0,0,0.4), 0 0 0 1px ${color}33` : "0 2px 8px rgba(0,0,0,0.22)",
                transform: isHov ? "translateY(-1px)" : "translateY(0)",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  {/* Rule name + type badge */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{
                      padding: "3px 12px",
                      borderRadius: 20,
                      background: color + "20",
                      color,
                      fontSize: 13,
                      fontWeight: 800,
                      border: `1.5px solid ${color}44`,
                      letterSpacing: "0.2px",
                    }}>
                      {rule.rule}
                    </span>
                    <span style={{
                      padding: "2px 8px",
                      borderRadius: 6,
                      background: color + "18",
                      color,
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}>
                      {typeIcons[rule.type]} {typeLabels[rule.type]}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{
                    margin: "0 0 10px",
                    fontSize: 13,
                    color: "var(--text-body)",
                    lineHeight: 1.55,
                    fontWeight: 500,
                  }}>
                    {rule.description}
                  </p>

                  {/* Action */}
                  <div style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    padding: "10px 12px",
                    background: color + "10",
                    border: `1px solid ${color}30`,
                    borderRadius: 7,
                  }}>
                    <span style={{ fontSize: 12, color, fontWeight: 700, flexShrink: 0 }}>Required Action:</span>
                    <span style={{ fontSize: 12, color: "var(--text-sec)", lineHeight: 1.55 }}>{rule.action}</span>
                  </div>
                </div>

                {/* Visual indicator dot */}
                <div style={{
                  width: 48, height: 48,
                  borderRadius: 12,
                  background: color + "18",
                  border: `2px solid ${color}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  flexShrink: 0,
                }}>
                  {typeIcons[rule.type]}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* USP reference note */}
      <div style={{
        marginTop: 28,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 14,
      }}>
        {[
          { ref: "USP <1010>", desc: "Analytical Data Interpretation and Treatment — trending and statistical evaluation of analytical data" },
          { ref: "ICH Q10", desc: "Pharmaceutical Quality System — product lifecycle monitoring, OOT detection framework" },
          { ref: "ICH Q9(R1)", desc: "Quality Risk Management — risk-based approach to OOT investigations and escalation decisions" },
          { ref: "21 CFR 211.192", desc: "Production record review — investigation of any unexplained discrepancy or failure of a batch" },
        ].map(r => (
          <div key={r.ref} style={{
            padding: "14px 16px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 9,
          }}>
            <div style={{
              fontSize: 12,
              fontWeight: 800,
              color: "#A78BFA",
              marginBottom: 6,
              fontFamily: "monospace",
            }}>
              {r.ref}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-sec)", lineHeight: 1.55 }}>
              {r.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Export ─────────────────────────────────────────── */
export default function OOSView() {
  const [activeTab, setActiveTab] = useState("Decision Tree");

  const tabs = ["Decision Tree", "Root Causes", "OOT Criteria"];

  const totalNodes = Object.keys(OOS_TREE).length;
  const resultNodes = Object.values(OOS_TREE).filter(n => n.type === "result").length;

  return (
    <div className="view-enter" style={{ maxWidth: 1080, margin: "0 auto", padding: "32px 24px" }}>

      {/* Page header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
          <div style={{
            width: 50, height: 50,
            borderRadius: 14,
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
          ].map(s => (
            <div key={s.label} style={{
              padding: "10px 16px",
              borderRadius: 10,
              background: "var(--bg-card)",
              border: `1px solid ${s.color}44`,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</span>
              <span style={{ fontSize: 12, color: "var(--text-sec)", fontWeight: 500 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tab navigation */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <TabBtn
            key={t}
            label={t}
            active={activeTab === t}
            onClick={() => setActiveTab(t)}
          />
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "Decision Tree" && <DecisionTreeTab />}
        {activeTab === "Root Causes" && <RootCausesTab />}
        {activeTab === "OOT Criteria" && <OOTCriteriaTab />}
      </div>
    </div>
  );
}
