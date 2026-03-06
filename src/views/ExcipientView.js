import { useState, useMemo } from "react";
import { EXCIPIENTS, INCOMPATIBILITIES, FUNCTION_MAP } from "../excipient-data";

// ── Class badge color map ──────────────────────────────────────
const CLASS_COLORS = {
  "Surfactant": "#38BDF8",
  "Lyoprotectant / Cryoprotectant": "#F472B6",
  "Bulking Agent / Tonicity Agent": "#A78BFA",
  "Buffer": "#F59E0B",
  "Tonicity Agent": "#94A3B8",
  "Chelating Agent / Antioxidant": "#34D399",
  "Antimicrobial Preservative": "#F472B6",
  "Polymeric Excipient / Laxative": "#60A5FA",
  "Polymer / Viscosity Modifier / Film Coat": "#A78BFA",
  "Superdisintegrant": "#FB923C",
  "Lubricant": "#94A3B8",
  "Filler / Binder / Disintegrant": "#34D399",
  "Filler / Diluent": "#F59E0B",
  "Stabilizer / Viscosity Reducer": "#C084FC",
};
const classColor = (cls) => CLASS_COLORS[cls] || "#94A3B8";

// ── Severity config ────────────────────────────────────────────
const SEV_CONFIG = {
  avoid:   { label: "AVOID",   color: "#F87171", bg: "#F8717122" },
  caution: { label: "CAUTION", color: "#FBBF24", bg: "#FBBF2422" },
  monitor: { label: "MONITOR", color: "#34D399", bg: "#34D39922" },
};

// ── Helper: look up excipient name from id ─────────────────────
const exName = (id) => {
  const ex = EXCIPIENTS.find((e) => e.id === id);
  return ex ? ex.name : id;
};

// ── Derive unique excipient classes ───────────────────────────
const deriveClasses = () => {
  const seen = new Set();
  EXCIPIENTS.forEach((e) => seen.add(e.class));
  return Array.from(seen);
};

// ── Sub-component: ExcipientCard ──────────────────────────────
const ExcipientCard = ({ ex }) => {
  const [open, setOpen] = useState(false);
  const col = ex.color || classColor(ex.class);

  return (
    <div
      onClick={() => setOpen((o) => !o)}
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${col}44`,
        borderLeft: `3px solid ${col}`,
        borderRadius: 10,
        padding: "14px 16px",
        cursor: "pointer",
        transition: "box-shadow 0.18s ease, transform 0.18s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 4px 20px ${col}33`;
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "none";
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
            <span style={{ fontSize: 18 }}>{ex.icon}</span>
            <span style={{ color: "var(--text-h)", fontWeight: 800, fontSize: 14 }}>{ex.name}</span>
            {ex.abbrev && ex.abbrev !== ex.name && (
              <span style={{
                background: `${col}22`, color: col, border: `1px solid ${col}44`,
                padding: "1px 7px", borderRadius: 10, fontSize: 10, fontWeight: 700,
              }}>
                {ex.abbrev}
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
            <span style={{
              background: `${classColor(ex.class)}18`, color: classColor(ex.class),
              border: `1px solid ${classColor(ex.class)}33`,
              padding: "2px 8px", borderRadius: 10, fontSize: 10, fontWeight: 700,
            }}>
              {ex.class}
            </span>
          </div>
          {ex.cas && (
            <div style={{ color: "var(--text-faint)", fontSize: 10, marginBottom: 4 }}>
              CAS: <span style={{ color: "var(--text-muted)" }}>{ex.cas}</span>
            </div>
          )}
          <p style={{ color: "var(--text-sec)", fontSize: 12, margin: 0, lineHeight: 1.5 }}>
            {ex.primary_function}
          </p>
        </div>
        <span style={{ color: "var(--text-muted)", fontSize: 14, flexShrink: 0, marginTop: 2 }}>
          {open ? "▲" : "▼"}
        </span>
      </div>

      {/* Expanded detail */}
      {open && (
        <div
          style={{ marginTop: 14, borderTop: `1px solid var(--border)`, paddingTop: 14 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mechanism */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ color: col, fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", marginBottom: 4 }}>
              MECHANISM
            </div>
            <p style={{ color: "var(--text-body)", fontSize: 12, margin: 0, lineHeight: 1.7 }}>
              {ex.mechanism}
            </p>
          </div>

          {/* Degradation */}
          {ex.degradation && (
            <div style={{
              background: "#F8717111", border: "1px solid #F8717133",
              borderRadius: 7, padding: "8px 12px", marginBottom: 10,
            }}>
              <div style={{ color: "#F87171", fontSize: 10, fontWeight: 700, marginBottom: 3 }}>
                DEGRADATION PATHWAY
              </div>
              <p style={{ color: "var(--text-body)", fontSize: 12, margin: 0, lineHeight: 1.6 }}>
                {ex.degradation}
              </p>
            </div>
          )}

          {/* Concentration ranges */}
          {ex.conc_range && Object.keys(ex.conc_range).length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ color: "var(--text-muted)", fontSize: 10, fontWeight: 700, marginBottom: 6 }}>
                CONCENTRATION RANGES
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {Object.entries(ex.conc_range).map(([k, v]) => (
                  <div key={k} style={{
                    background: "var(--bg-raised)", border: "1px solid var(--border)",
                    borderRadius: 7, padding: "5px 10px",
                  }}>
                    <div style={{ color: "var(--text-faint)", fontSize: 9, fontWeight: 700, marginBottom: 2 }}>
                      {k.replace(/_/g, " ").toUpperCase()}
                    </div>
                    <div style={{ color: col, fontSize: 12, fontWeight: 700 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regulatory refs */}
          {ex.regulatory && (
            <div style={{
              background: `${col}11`, border: `1px solid ${col}33`,
              borderRadius: 7, padding: "7px 12px",
            }}>
              <div style={{ color: col, fontSize: 10, fontWeight: 700, marginBottom: 3 }}>
                REGULATORY REFERENCES
              </div>
              <p style={{ color: "var(--text-sec)", fontSize: 11, margin: 0 }}>{ex.regulatory}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── Sub-component: IncompatibilityRow ────────────────────────
const IncompatibilityRow = ({ inc }) => {
  const [open, setOpen] = useState(false);
  const sev = SEV_CONFIG[inc.severity] || SEV_CONFIG.monitor;
  const name1 = exName(inc.excipient1);
  const name2 = exName(inc.excipient2);

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${sev.color}33`,
        borderLeft: `3px solid ${sev.color}`,
        borderRadius: 10,
        marginBottom: 8,
        overflow: "hidden",
      }}
    >
      {/* Summary row — always visible */}
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "12px 16px", cursor: "pointer",
          flexWrap: "wrap",
        }}
      >
        {/* Severity badge */}
        <span style={{
          background: sev.bg, color: sev.color,
          border: `1px solid ${sev.color}55`,
          padding: "3px 10px", borderRadius: 12,
          fontSize: 10, fontWeight: 800, letterSpacing: "0.06em",
          flexShrink: 0,
        }}>
          {sev.label}
        </span>

        {/* Excipient pair */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, flexWrap: "wrap" }}>
          <span style={{
            background: "var(--bg-raised)", border: "1px solid var(--border)",
            padding: "3px 10px", borderRadius: 8, fontSize: 12, fontWeight: 700,
            color: "var(--text-h)",
          }}>
            {name1}
          </span>
          <span style={{ color: "var(--text-faint)", fontSize: 16, fontWeight: 700 }}>↔</span>
          <span style={{
            background: "var(--bg-raised)", border: "1px solid var(--border)",
            padding: "3px 10px", borderRadius: 8, fontSize: 12, fontWeight: 700,
            color: "var(--text-h)",
          }}>
            {name2}
          </span>
        </div>

        {/* Short mechanism preview */}
        <p style={{
          color: "var(--text-muted)", fontSize: 11, margin: 0,
          flex: "2 1 200px", lineHeight: 1.4,
          overflow: "hidden", display: "-webkit-box",
          WebkitLineClamp: open ? "unset" : 2,
          WebkitBoxOrient: "vertical",
        }}>
          {inc.mechanism}
        </p>

        <span style={{ color: "var(--text-muted)", fontSize: 12, flexShrink: 0 }}>
          {open ? "▲" : "▼"}
        </span>
      </div>

      {/* Expanded detail */}
      {open && (
        <div style={{
          padding: "0 16px 14px",
          borderTop: "1px solid var(--border)",
          paddingTop: 12,
        }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ color: sev.color, fontSize: 10, fontWeight: 700, marginBottom: 4 }}>
              FULL MECHANISM
            </div>
            <p style={{ color: "var(--text-body)", fontSize: 12, margin: 0, lineHeight: 1.7 }}>
              {inc.mechanism}
            </p>
          </div>

          {inc.mitigation && (
            <div style={{
              background: "#34D39911", border: "1px solid #34D39933",
              borderRadius: 7, padding: "8px 12px", marginBottom: 10,
            }}>
              <div style={{ color: "#34D399", fontSize: 10, fontWeight: 700, marginBottom: 3 }}>
                MITIGATION STRATEGY
              </div>
              <p style={{ color: "var(--text-body)", fontSize: 12, margin: 0, lineHeight: 1.6 }}>
                {inc.mitigation}
              </p>
            </div>
          )}

          {inc.refs && (
            <div style={{ color: "var(--text-faint)", fontSize: 10 }}>
              <span style={{ fontWeight: 700 }}>References: </span>
              {inc.refs}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── Sub-component: FunctionCard ──────────────────────────────
const FunctionCard = ({ fnName, fnData }) => {
  const col = classColor(fnName) || "#A78BFA";
  const exampleExcipients = (fnData.examples || []).map((id) => {
    const ex = EXCIPIENTS.find((e) => e.id === id);
    return ex ? ex : { id, name: id, color: "#94A3B8", abbrev: id };
  });

  return (
    <div style={{
      background: "var(--bg-card)",
      border: `1px solid ${col}33`,
      borderTop: `3px solid ${col}`,
      borderRadius: 10,
      padding: "16px 18px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{
          background: `${col}22`, color: col,
          border: `1px solid ${col}44`,
          padding: "3px 10px", borderRadius: 12,
          fontSize: 11, fontWeight: 800,
        }}>
          {fnName}
        </span>
      </div>
      <p style={{ color: "var(--text-sec)", fontSize: 13, margin: "0 0 12px", lineHeight: 1.6 }}>
        {fnData.description}
      </p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {exampleExcipients.map((ex) => (
          <span key={ex.id} style={{
            background: `${ex.color || col}1A`,
            color: ex.color || col,
            border: `1px solid ${ex.color || col}44`,
            padding: "3px 10px", borderRadius: 10,
            fontSize: 11, fontWeight: 700,
          }}>
            {ex.abbrev || ex.name}
          </span>
        ))}
      </div>
    </div>
  );
};

// ── Main ExcipientView ─────────────────────────────────────────
export default function ExcipientView() {
  const [tab, setTab] = useState("library");
  const [classFilter, setClassFilter] = useState("All");

  const TABS = [
    { id: "library",  label: "Excipient Library",    icon: "🧪" },
    { id: "compat",   label: "Compatibility Matrix",  icon: "⚠️" },
    { id: "functions",label: "Functions",             icon: "⚗️" },
  ];

  // ── Library tab state ─────────────────────────────────────
  const allClasses = useMemo(() => ["All", ...deriveClasses()], []);
  const filteredExcipients = useMemo(() => {
    if (classFilter === "All") return EXCIPIENTS;
    return EXCIPIENTS.filter((e) => e.class === classFilter);
  }, [classFilter]);

  // ── Compatibility tab state ───────────────────────────────
  const grouped = useMemo(() => {
    const order = ["avoid", "caution", "monitor"];
    return order.map((sev) => ({
      sev,
      items: INCOMPATIBILITIES.filter((i) => i.severity === sev),
    })).filter((g) => g.items.length > 0);
  }, []);

  // ── Functions tab data ────────────────────────────────────
  const functionEntries = useMemo(() => Object.entries(FUNCTION_MAP), []);

  return (
    <div className="view-enter" style={{ padding: "24px 28px", maxWidth: 1400, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <span style={{ fontSize: 36 }}>🧴</span>
          <div>
            <h2 style={{ color: "var(--text-h)", margin: 0, fontSize: 26, fontWeight: 900 }}>
              Excipient Reference
            </h2>
            <p style={{ color: "var(--text-sec)", margin: "4px 0 0", fontSize: 15 }}>
              Pharmaceutical excipient properties, compatibility data, and functional classification
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
          {[
            { label: "Excipients", value: EXCIPIENTS.length, color: "#38BDF8" },
            { label: "Incompatibilities", value: INCOMPATIBILITIES.length, color: "#F87171" },
            { label: "Functional Classes", value: Object.keys(FUNCTION_MAP).length, color: "#34D399" },
            { label: "AVOID pairs", value: INCOMPATIBILITIES.filter((i) => i.severity === "avoid").length, color: "#F87171" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "var(--bg-card)", border: `1px solid ${s.color}33`,
              borderRadius: 10, padding: "10px 16px", textAlign: "center", minWidth: 90,
            }}>
              <div style={{ color: s.color, fontSize: 22, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: "var(--text-muted)", fontSize: 10, fontWeight: 700 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{
        display: "flex", gap: 6, marginBottom: 24,
        background: "var(--bg-card)", borderRadius: 12,
        padding: "6px", width: "fit-content",
        border: "1px solid var(--border)",
      }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              background: tab === t.id ? "var(--accent)" : "transparent",
              color: tab === t.id ? "#fff" : "var(--text-sec)",
              border: "none", borderRadius: 8,
              padding: "8px 18px", cursor: "pointer",
              fontSize: 13, fontWeight: 700,
              transition: "all 0.18s ease",
            }}
          >
            <span style={{ marginRight: 6 }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── LIBRARY TAB ─────────────────────────────────────── */}
      {tab === "library" && (
        <div>
          {/* Class filter chips */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
            {allClasses.map((cls) => {
              const col = cls === "All" ? "var(--accent)" : classColor(cls);
              const active = classFilter === cls;
              return (
                <button
                  key={cls}
                  onClick={() => setClassFilter(cls)}
                  style={{
                    background: active ? `${col}22` : "var(--bg-raised)",
                    color: active ? col : "var(--text-sec)",
                    border: `1px solid ${active ? col + "66" : "var(--border)"}`,
                    borderRadius: 20, padding: "5px 14px",
                    cursor: "pointer", fontSize: 11, fontWeight: 700,
                    transition: "all 0.16s ease",
                  }}
                >
                  {cls}
                </button>
              );
            })}
          </div>

          {/* Count */}
          <div style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 16 }}>
            Showing {filteredExcipients.length} of {EXCIPIENTS.length} excipients
            {classFilter !== "All" && (
              <span style={{ color: classColor(classFilter), marginLeft: 8, fontWeight: 700 }}>
                — {classFilter}
              </span>
            )}
          </div>

          {/* Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 14,
          }}>
            {filteredExcipients.map((ex) => (
              <ExcipientCard key={ex.id} ex={ex} />
            ))}
          </div>
        </div>
      )}

      {/* ── COMPATIBILITY MATRIX TAB ────────────────────────── */}
      {tab === "compat" && (
        <div>
          {/* Note */}
          <div style={{
            background: "#F59E0B11", border: "1px solid #F59E0B33",
            borderRadius: 8, padding: "10px 14px", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 18 }}>📚</span>
            <p style={{ color: "var(--text-sec)", margin: 0, fontSize: 13, lineHeight: 1.5 }}>
              Showing known incompatibilities from literature. Entries are grouped by severity:
              <strong style={{ color: "#F87171" }}> AVOID</strong> (serious incompatibility),
              <strong style={{ color: "#FBBF24" }}> CAUTION</strong> (conditional risk),
              <strong style={{ color: "#34D399" }}> MONITOR</strong> (requires monitoring).
            </p>
          </div>

          {/* Severity legend */}
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            {Object.entries(SEV_CONFIG).map(([key, cfg]) => (
              <div key={key} style={{
                display: "flex", alignItems: "center", gap: 6,
                background: cfg.bg, border: `1px solid ${cfg.color}44`,
                borderRadius: 8, padding: "5px 12px",
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: cfg.color,
                }} />
                <span style={{ color: cfg.color, fontSize: 11, fontWeight: 800 }}>
                  {cfg.label}
                </span>
                <span style={{ color: "var(--text-muted)", fontSize: 11 }}>
                  — {INCOMPATIBILITIES.filter((i) => i.severity === key).length} pairs
                </span>
              </div>
            ))}
          </div>

          {/* Grouped sections */}
          {grouped.map(({ sev, items }) => {
            const cfg = SEV_CONFIG[sev];
            return (
              <div key={sev} style={{ marginBottom: 28 }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 10, marginBottom: 12,
                }}>
                  <div style={{
                    background: cfg.bg, border: `1px solid ${cfg.color}55`,
                    borderRadius: 8, padding: "4px 14px",
                  }}>
                    <span style={{ color: cfg.color, fontSize: 12, fontWeight: 800 }}>
                      {cfg.label}
                    </span>
                  </div>
                  <span style={{ color: "var(--text-muted)", fontSize: 12 }}>
                    {items.length} incompatibilit{items.length === 1 ? "y" : "ies"}
                  </span>
                </div>
                {items.map((inc) => (
                  <IncompatibilityRow key={inc.id} inc={inc} />
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* ── FUNCTIONS TAB ────────────────────────────────────── */}
      {tab === "functions" && (
        <div>
          <p style={{ color: "var(--text-sec)", fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
            Each excipient serves one or more functional roles in a pharmaceutical formulation.
            Below are the key functional categories with representative excipients.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 14,
          }}>
            {functionEntries.map(([fnName, fnData]) => (
              <FunctionCard key={fnName} fnName={fnName} fnData={fnData} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
