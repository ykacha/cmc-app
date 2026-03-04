import { useState, useEffect } from "react";
import { BPR_STEPS, DEVIATION_SCENARIOS, YIELD_STAGES } from "../batch-data";

// ── Phase colors ───────────────────────────────────────────────
const PHASE_COLORS = {
  Upstream:    "#38BDF8",
  Downstream:  "#F472B6",
  Formulation: "#34D399",
  "Fill/Finish": "#FB923C",
};

// ── Severity colors ────────────────────────────────────────────
const SEV_COLORS = {
  critical: "#F87171",
  major:    "#F59E0B",
  minor:    "#34D399",
};

// ── Phase Badge ────────────────────────────────────────────────
function PhaseBadge({ phase }) {
  const c = PHASE_COLORS[phase] || "#A78BFA";
  return (
    <span style={{
      background: `${c}22`,
      color: c,
      border: `1px solid ${c}44`,
      padding: "2px 9px",
      borderRadius: 12,
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
    }}>
      {phase}
    </span>
  );
}

// ── Severity Badge ─────────────────────────────────────────────
function SeverityBadge({ severity }) {
  const c = SEV_COLORS[severity] || "#A78BFA";
  return (
    <span style={{
      background: `${c}22`,
      color: c,
      border: `1px solid ${c}55`,
      padding: "2px 8px",
      borderRadius: 10,
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
    }}>
      {severity}
    </span>
  );
}

// ── Section Label ──────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div style={{
      color: "var(--text-muted)",
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      marginBottom: 10,
      paddingBottom: 6,
      borderBottom: "1px solid var(--border)",
    }}>
      {children}
    </div>
  );
}

// ── Cumulative yield calculator ────────────────────────────────
function computeCumulativeYield() {
  return YIELD_STAGES.reduce((acc, s) => acc * (s.expected_yield / 100), 1) * 100;
}

// ── Storage helpers ────────────────────────────────────────────
const STORAGE_KEY = "cmc-bpr-state";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return { checkboxes: {}, inputs: {} };
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {}
}

// ── Main Component ─────────────────────────────────────────────
export default function BatchRecordView() {
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedDeviations, setExpandedDeviations] = useState({});
  const [showYield, setShowYield] = useState(false);

  // Persisted state: checkboxes and inputs
  const [bprState, setBprState] = useState(() => loadState());

  // Persist to localStorage on every change
  useEffect(() => {
    saveState(bprState);
  }, [bprState]);

  const step = BPR_STEPS[currentStep];
  const stepKey = step.id;

  // ── Checkbox helpers ─────────────────────────────────────────
  function isChecked(cbIndex) {
    return !!(bprState.checkboxes[stepKey]?.[cbIndex]);
  }
  function toggleCheckbox(cbIndex) {
    setBprState(prev => {
      const stepCbs = { ...(prev.checkboxes[stepKey] || {}) };
      stepCbs[cbIndex] = !stepCbs[cbIndex];
      return { ...prev, checkboxes: { ...prev.checkboxes, [stepKey]: stepCbs } };
    });
  }
  function isStepComplete(s) {
    const cbs = bprState.checkboxes[s.id] || {};
    return s.checkboxes.every((_, i) => !!cbs[i]);
  }

  // ── Input helpers ─────────────────────────────────────────────
  function getInputVal(inputId) {
    return bprState.inputs[stepKey]?.[inputId] ?? "";
  }
  function setInputVal(inputId, val) {
    setBprState(prev => {
      const stepInputs = { ...(prev.inputs[stepKey] || {}) };
      stepInputs[inputId] = val;
      return { ...prev, inputs: { ...prev.inputs, [stepKey]: stepInputs } };
    });
  }
  function isDeviating(inp) {
    const val = parseFloat(getInputVal(inp.id));
    if (isNaN(val)) return false;
    const lo = parseFloat(inp.alert_low);
    const hi = parseFloat(inp.alert_high);
    return val < lo || val > hi;
  }

  // ── Deviation helpers ─────────────────────────────────────────
  const stepDeviations = DEVIATION_SCENARIOS.filter(d => d.step === step.step);

  function toggleDeviation(id) {
    setExpandedDeviations(prev => ({ ...prev, [id]: !prev[id] }));
  }

  // ── Navigation ────────────────────────────────────────────────
  function goPrev() { if (currentStep > 0) setCurrentStep(s => s - 1); }
  function goNext() { if (currentStep < BPR_STEPS.length - 1) setCurrentStep(s => s + 1); }

  const cumYield = computeCumulativeYield().toFixed(1);

  return (
    <div
      className="view-enter"
      style={{
        minHeight: "100vh",
        background: "var(--bg-base)",
        padding: "32px 24px 64px",
        boxSizing: "border-box",
      }}
    >
      {/* ── Page Header ──────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <span style={{ fontSize: 32 }}>📋</span>
          <h2 style={{ color: "var(--text-h)", margin: 0, fontSize: 26, fontWeight: 900 }}>
            Batch Production Record
          </h2>
        </div>
        <p style={{ color: "var(--text-sec)", margin: "0 0 0 44px", fontSize: 14 }}>
          Sterile mAb manufacturing simulator — 10-step BPR with IPC, deviation management, and yield tracking
        </p>
      </div>

      {/* ── Two-Column Layout ─────────────────────────────────── */}
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>

        {/* ── LEFT SIDEBAR ─────────────────────────────────────── */}
        <div style={{
          width: 240,
          flexShrink: 0,
          position: "sticky",
          top: 16,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}>
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: "14px 10px",
            marginBottom: 4,
          }}>
            <div style={{
              color: "var(--text-muted)",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 10,
              paddingLeft: 4,
            }}>
              Steps
            </div>
            {BPR_STEPS.map((s, idx) => {
              const isActive = idx === currentStep;
              const complete = isStepComplete(s);
              const phaseColor = PHASE_COLORS[s.phase] || "#A78BFA";
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(idx)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "9px 10px",
                    borderRadius: 9,
                    border: isActive
                      ? `1px solid ${s.color}55`
                      : "1px solid transparent",
                    background: isActive
                      ? `${s.color}14`
                      : "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s",
                    marginBottom: 2,
                  }}
                >
                  {/* Step icon */}
                  <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }}>
                    {s.icon}
                  </span>

                  {/* Step info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      marginBottom: 2,
                    }}>
                      <span style={{
                        fontSize: 9,
                        fontWeight: 800,
                        color: isActive ? s.color : "var(--text-faint)",
                        letterSpacing: "0.04em",
                      }}>
                        {String(s.step).padStart(2, "0")}
                      </span>
                      {/* Phase dot */}
                      <span style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: phaseColor,
                        flexShrink: 0,
                      }} />
                    </div>
                    <div style={{
                      color: isActive ? "var(--text-h)" : "var(--text-body)",
                      fontSize: 11,
                      fontWeight: isActive ? 700 : 500,
                      lineHeight: 1.3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                      {s.title}
                    </div>
                  </div>

                  {/* Completion checkmark */}
                  {complete && (
                    <span style={{
                      color: "#34D399",
                      fontSize: 13,
                      fontWeight: 900,
                      flexShrink: 0,
                    }}>
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Yield Panel Toggle */}
          <button
            onClick={() => setShowYield(v => !v)}
            style={{
              width: "100%",
              padding: "10px 14px",
              background: showYield ? "#34D39922" : "var(--bg-card)",
              border: `1px solid ${showYield ? "#34D399" : "var(--border)"}`,
              borderRadius: 10,
              color: showYield ? "#34D399" : "var(--text-body)",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 700,
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>📊</span>
            <span>Yield Calculator</span>
            <span style={{ marginLeft: "auto", opacity: 0.6 }}>
              {showYield ? "▲" : "▼"}
            </span>
          </button>

          {/* Yield Table */}
          {showYield && (
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: 14,
              animation: "slideDown 0.2s ease",
            }}>
              <div style={{
                color: "var(--text-muted)",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}>
                Step Yields
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Step", "Exp %", "Loss %"].map(h => (
                      <th key={h} style={{
                        fontSize: 9,
                        fontWeight: 800,
                        color: "var(--text-faint)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        padding: "3px 0",
                        textAlign: "left",
                        borderBottom: "1px solid var(--border)",
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {YIELD_STAGES.map((y, i) => (
                    <tr key={i}>
                      <td style={{
                        fontSize: 10,
                        color: "var(--text-body)",
                        padding: "5px 0",
                        borderBottom: "1px solid var(--border)",
                        maxWidth: 90,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        paddingRight: 4,
                      }}>
                        {y.step}
                      </td>
                      <td style={{
                        fontSize: 10,
                        color: "#34D399",
                        fontWeight: 700,
                        padding: "5px 0",
                        borderBottom: "1px solid var(--border)",
                      }}>
                        {y.expected_yield}%
                      </td>
                      <td style={{
                        fontSize: 10,
                        color: "#F87171",
                        fontWeight: 700,
                        padding: "5px 0",
                        borderBottom: "1px solid var(--border)",
                      }}>
                        {y.typical_loss}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Cumulative yield */}
              <div style={{
                marginTop: 12,
                padding: "10px 12px",
                background: "var(--bg-surface)",
                borderRadius: 8,
                border: "1px solid var(--border)",
              }}>
                <div style={{
                  fontSize: 10,
                  color: "var(--text-muted)",
                  fontWeight: 700,
                  marginBottom: 4,
                }}>
                  Theoretical Cumulative Yield
                </div>
                <div style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: "#34D399",
                  lineHeight: 1,
                }}>
                  {cumYield}%
                </div>
                <div style={{
                  fontSize: 10,
                  color: "var(--text-faint)",
                  marginTop: 4,
                }}>
                  Harvest → Fill/Finish
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── MAIN CONTENT ─────────────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Step Header Card */}
          <div style={{
            background: "var(--bg-card)",
            border: `1px solid ${step.color}44`,
            borderRadius: 16,
            padding: "22px 24px",
            marginBottom: 16,
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Color accent bar */}
            <div style={{
              position: "absolute",
              left: 0, top: 0, bottom: 0,
              width: 4,
              background: step.color,
              borderRadius: "4px 0 0 4px",
            }} />

            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
              <span style={{ fontSize: 36, lineHeight: 1 }}>{step.icon}</span>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 900,
                    color: step.color,
                    letterSpacing: "0.06em",
                  }}>
                    STEP {String(step.step).padStart(2, "0")}
                  </span>
                  <PhaseBadge phase={step.phase} />
                  <span style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    padding: "2px 8px",
                    fontWeight: 600,
                  }}>
                    ⏱ {step.duration}
                  </span>
                </div>
                <h3 style={{
                  color: "var(--text-h)",
                  margin: "0 0 8px",
                  fontSize: 20,
                  fontWeight: 900,
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: "var(--text-sec)",
                  margin: 0,
                  fontSize: 13,
                  lineHeight: 1.6,
                }}>
                  {step.description}
                </p>
              </div>

              {/* Step progress pills */}
              <div style={{
                display: "flex",
                gap: 4,
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}>
                {BPR_STEPS.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentStep(i)}
                    title={s.title}
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      border: i === currentStep
                        ? `2px solid ${s.color}`
                        : `1px solid ${isStepComplete(s) ? "#34D39966" : "var(--border)"}`,
                      background: i === currentStep
                        ? `${s.color}33`
                        : isStepComplete(s)
                        ? "#34D39922"
                        : "var(--bg-surface)",
                      cursor: "pointer",
                      fontSize: 9,
                      fontWeight: 800,
                      color: i === currentStep ? s.color : isStepComplete(s) ? "#34D399" : "var(--text-faint)",
                    }}
                  >
                    {String(s.step).padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Critical Parameters Section ──────────────────── */}
          {step.critical_params && step.critical_params.length > 0 && (
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: "18px 20px",
              marginBottom: 14,
            }}>
              <SectionLabel>Critical Parameters</SectionLabel>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Parameter", "Target / Spec", "Method", "CQA Link", "Actual Value"].map(h => (
                      <th key={h} style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: "var(--text-faint)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        padding: "6px 8px",
                        textAlign: "left",
                        borderBottom: "1px solid var(--border)",
                        whiteSpace: "nowrap",
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {step.critical_params.map((cp, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{
                        padding: "10px 8px",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "var(--text-body)",
                        minWidth: 140,
                      }}>
                        {cp.param}
                      </td>
                      <td style={{
                        padding: "10px 8px",
                        fontSize: 12,
                        color: step.color,
                        fontWeight: 700,
                        fontFamily: "monospace",
                        minWidth: 120,
                      }}>
                        {cp.target}
                      </td>
                      <td style={{
                        padding: "10px 8px",
                        fontSize: 11,
                        color: "var(--text-sec)",
                        maxWidth: 160,
                      }}>
                        {cp.method}
                      </td>
                      <td style={{
                        padding: "10px 8px",
                        fontSize: 11,
                        color: "var(--text-muted)",
                        fontStyle: "italic",
                        maxWidth: 180,
                      }}>
                        {cp.cqa_link}
                      </td>
                      <td style={{ padding: "10px 8px", minWidth: 140 }}>
                        {/* Find matching input by position or skip if no inputs */}
                        {step.inputs && step.inputs[i] ? (() => {
                          const inp = step.inputs[i];
                          const dev = isDeviating(inp);
                          return (
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <input
                                type="number"
                                step="any"
                                placeholder={inp.target}
                                value={getInputVal(inp.id)}
                                onChange={e => setInputVal(inp.id, e.target.value)}
                                style={{
                                  width: 80,
                                  padding: "5px 8px",
                                  background: dev ? "#F8717122" : "var(--bg-surface)",
                                  border: `1px solid ${dev ? "#F87171" : "var(--border)"}`,
                                  borderRadius: 7,
                                  color: dev ? "#F87171" : "var(--text-body)",
                                  fontSize: 12,
                                  fontFamily: "monospace",
                                  fontWeight: 700,
                                  outline: "none",
                                  transition: "border-color 0.15s",
                                }}
                              />
                              {inp.unit && (
                                <span style={{ fontSize: 10, color: "var(--text-faint)" }}>
                                  {inp.unit}
                                </span>
                              )}
                              {dev && (
                                <span style={{
                                  background: "#F8717122",
                                  color: "#F87171",
                                  border: "1px solid #F8717155",
                                  borderRadius: 8,
                                  padding: "2px 7px",
                                  fontSize: 10,
                                  fontWeight: 800,
                                  whiteSpace: "nowrap",
                                  animation: "scaleIn 0.15s ease",
                                }}>
                                  ⚠️ DEVIATION
                                </span>
                              )}
                            </div>
                          );
                        })() : (
                          <span style={{ fontSize: 11, color: "var(--text-faint)" }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── IPC Tests Section ─────────────────────────────── */}
          {step.ipc_tests && step.ipc_tests.length > 0 && (
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: "18px 20px",
              marginBottom: 14,
            }}>
              <SectionLabel>In-Process Controls (IPC)</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {step.ipc_tests.map((t, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 14px",
                    background: "var(--bg-raised)",
                    borderRadius: 9,
                    border: "1px solid var(--border)",
                    flexWrap: "wrap",
                  }}>
                    <span style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: `${step.color}22`,
                      border: `1px solid ${step.color}44`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 800,
                      color: step.color,
                      flexShrink: 0,
                    }}>
                      {i + 1}
                    </span>
                    <div style={{ flex: 1, minWidth: 120 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-body)", marginBottom: 2 }}>
                        {t.test}
                      </div>
                      <div style={{ fontSize: 11, color: step.color, fontFamily: "monospace", fontWeight: 600 }}>
                        {t.spec}
                      </div>
                    </div>
                    <div style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 7,
                      padding: "3px 10px",
                      fontSize: 10,
                      color: "var(--text-muted)",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}>
                      {t.timing}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Checkboxes Section ────────────────────────────── */}
          {step.checkboxes && step.checkboxes.length > 0 && (
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: "18px 20px",
              marginBottom: 14,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <SectionLabel>BPR Checkboxes</SectionLabel>
                <span style={{
                  fontSize: 11,
                  color: isStepComplete(step) ? "#34D399" : "var(--text-muted)",
                  fontWeight: 700,
                }}>
                  {step.checkboxes.filter((_, i) => isChecked(i)).length}/{step.checkboxes.length} complete
                  {isStepComplete(step) && " ✓"}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {step.checkboxes.map((cb, i) => {
                  const checked = isChecked(i);
                  return (
                    <button
                      key={i}
                      onClick={() => toggleCheckbox(i)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "10px 14px",
                        background: checked ? "#34D39914" : "var(--bg-raised)",
                        border: `1px solid ${checked ? "#34D39955" : "var(--border)"}`,
                        borderRadius: 9,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.15s",
                        width: "100%",
                      }}
                    >
                      {/* Checkbox visual */}
                      <span style={{
                        width: 18,
                        height: 18,
                        borderRadius: 5,
                        border: `2px solid ${checked ? "#34D399" : "var(--border)"}`,
                        background: checked ? "#34D399" : "transparent",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 1,
                        transition: "all 0.15s",
                        fontSize: 11,
                        color: "white",
                        fontWeight: 900,
                      }}>
                        {checked ? "✓" : ""}
                      </span>
                      <span style={{
                        fontSize: 12,
                        color: checked ? "var(--text-sec)" : "var(--text-body)",
                        lineHeight: 1.5,
                        textDecoration: checked ? "line-through" : "none",
                        opacity: checked ? 0.75 : 1,
                      }}>
                        {cb}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Deviation Scenarios ───────────────────────────── */}
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: "18px 20px",
            marginBottom: 14,
          }}>
            <SectionLabel>Deviation Scenarios for this Step</SectionLabel>
            {stepDeviations.length === 0 ? (
              <div style={{
                padding: "20px 0",
                textAlign: "center",
                color: "var(--text-faint)",
                fontSize: 13,
              }}>
                No deviation scenarios defined for this step.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {stepDeviations.map(dev => {
                  const expanded = !!expandedDeviations[dev.id];
                  const c = SEV_COLORS[dev.severity] || "#A78BFA";
                  return (
                    <div key={dev.id} style={{
                      border: `1px solid ${c}44`,
                      borderRadius: 11,
                      overflow: "hidden",
                    }}>
                      {/* Scenario header button */}
                      <button
                        onClick={() => toggleDeviation(dev.id)}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "12px 16px",
                          background: expanded ? `${c}14` : "var(--bg-raised)",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "background 0.15s",
                        }}
                      >
                        <span style={{ fontSize: 18, flexShrink: 0 }}>{dev.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-body)", marginBottom: 2 }}>
                            {dev.trigger}
                          </div>
                        </div>
                        <SeverityBadge severity={dev.severity} />
                        <span style={{
                          fontSize: 12,
                          color: "var(--text-muted)",
                          marginLeft: 6,
                          flexShrink: 0,
                        }}>
                          {expanded ? "▲" : "▼"}
                        </span>
                      </button>

                      {/* Expanded details */}
                      {expanded && (
                        <div style={{
                          padding: "14px 16px 16px",
                          background: `${c}08`,
                          borderTop: `1px solid ${c}33`,
                          animation: "slideDown 0.2s ease",
                        }}>
                          <p style={{
                            color: "var(--text-body)",
                            fontSize: 13,
                            lineHeight: 1.6,
                            margin: "0 0 12px",
                          }}>
                            {dev.description}
                          </p>
                          <div style={{
                            padding: "10px 14px",
                            background: "var(--bg-card)",
                            borderRadius: 9,
                            border: `1px solid ${c}33`,
                            marginBottom: 12,
                          }}>
                            <div style={{
                              fontSize: 10,
                              fontWeight: 800,
                              color: c,
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              marginBottom: 6,
                            }}>
                              Guidance
                            </div>
                            <p style={{
                              color: "var(--text-sec)",
                              fontSize: 12,
                              lineHeight: 1.65,
                              margin: 0,
                            }}>
                              {dev.guidance}
                            </p>
                          </div>

                          {/* Required actions */}
                          <div>
                            <div style={{
                              fontSize: 10,
                              fontWeight: 800,
                              color: "var(--text-muted)",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              marginBottom: 8,
                            }}>
                              Required Actions
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                              {dev.required_actions.map((action, ai) => (
                                <div key={ai} style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: 8,
                                  fontSize: 12,
                                  color: "var(--text-body)",
                                  lineHeight: 1.5,
                                }}>
                                  <span style={{
                                    color: c,
                                    fontWeight: 900,
                                    flexShrink: 0,
                                    fontSize: 14,
                                    lineHeight: 1.2,
                                  }}>
                                    {ai + 1}.
                                  </span>
                                  {action}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Step Navigation ───────────────────────────────── */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            marginTop: 4,
          }}>
            <button
              onClick={goPrev}
              disabled={currentStep === 0}
              style={{
                padding: "10px 20px",
                background: currentStep === 0 ? "var(--bg-surface)" : "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 9,
                color: currentStep === 0 ? "var(--text-faint)" : "var(--text-body)",
                cursor: currentStep === 0 ? "default" : "pointer",
                fontSize: 13,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 6,
                opacity: currentStep === 0 ? 0.4 : 1,
              }}
            >
              ← Previous
            </button>

            <div style={{
              fontSize: 12,
              color: "var(--text-muted)",
              fontWeight: 600,
            }}>
              {currentStep + 1} of {BPR_STEPS.length}
            </div>

            <button
              onClick={goNext}
              disabled={currentStep === BPR_STEPS.length - 1}
              style={{
                padding: "10px 20px",
                background: currentStep === BPR_STEPS.length - 1
                  ? "var(--bg-surface)"
                  : `${step.color}22`,
                border: `1px solid ${currentStep === BPR_STEPS.length - 1 ? "var(--border)" : step.color + "55"}`,
                borderRadius: 9,
                color: currentStep === BPR_STEPS.length - 1 ? "var(--text-faint)" : step.color,
                cursor: currentStep === BPR_STEPS.length - 1 ? "default" : "pointer",
                fontSize: 13,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 6,
                opacity: currentStep === BPR_STEPS.length - 1 ? 0.4 : 1,
              }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
