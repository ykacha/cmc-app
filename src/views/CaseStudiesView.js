import { useState } from "react";
import { Icon } from "../icons";
import { CASE_STUDIES, CASE_CATEGORIES } from "../case-study-data";

const SEV_COLOR = { critical: "#F472B6", high: "#F59E0B", moderate: "#34D399" };
const SEV_LABEL = { critical: "CRITICAL", high: "HIGH", moderate: "MODERATE" };

// ── Severity bar (color strip) ────────────────────────────────
function SevBar({ severity }) {
  const c = SEV_COLOR[severity] || "var(--accent)";
  return (
    <span style={{
      background: `${c}22`, color: c, border: `1px solid ${c}50`,
      borderRadius: 5, padding: "2px 7px", fontSize: 9, fontWeight: 900,
      letterSpacing: "0.08em", textTransform: "uppercase",
      display: "inline-flex", alignItems: "center", gap: 5,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c, flexShrink: 0 }} /> {SEV_LABEL[severity] || severity}
    </span>
  );
}

// ── Category badge ─────────────────────────────────────────────
function CatBadge({ category, small }) {
  const cat = CASE_CATEGORIES.find(c => c.id === category);
  const color = cat?.color || "var(--accent)";
  return (
    <span style={{
      background: `${color}18`, color,
      border: `1px solid ${color}40`,
      padding: small ? "2px 7px" : "3px 10px",
      borderRadius: 8,
      fontSize: small ? 9 : 11,
      fontWeight: 700,
      display: "inline-flex", alignItems: "center", gap: 6,
    }}>
      {cat && <Icon name={cat.icon} size={small ? 11 : 13} sw={2} />} {cat?.label || category}
    </span>
  );
}

// ── Graphical Case Card ────────────────────────────────────────
function CaseCard({ cs, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const sevColor = SEV_COLOR[cs.severity] || "var(--accent)";

  return (
    <div
      onClick={() => onSelect(cs)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${hovered ? sevColor + "60" : "var(--border)"}`,
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? `0 14px 36px ${sevColor}20` : "0 1px 4px rgba(0,0,0,0.12)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Colored icon header */}
      <div style={{
        background: `${sevColor}14`,
        borderBottom: `3px solid ${sevColor}`,
        padding: "24px 16px 18px",
        textAlign: "center",
        position: "relative",
      }}>
        {/* Year pill: top left */}
        <span style={{
          position: "absolute", top: 10, left: 10,
          background: "rgba(0,0,0,0.35)", color: "rgba(255,255,255,0.9)",
          borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 800,
          letterSpacing: "0.04em",
        }}>
          {cs.year}
        </span>

        {/* Severity: top right */}
        <span style={{
          position: "absolute", top: 10, right: 10,
          background: `${sevColor}28`, color: sevColor,
          border: `1px solid ${sevColor}55`, borderRadius: 6,
          padding: "2px 7px", fontSize: 9, fontWeight: 900,
          letterSpacing: "0.06em", textTransform: "uppercase",
        }}>
          {SEV_LABEL[cs.severity]}
        </span>

        {/* Large icon in circle */}
        <div style={{
          width: 62, height: 62, borderRadius: "50%",
          background: `${sevColor}1E`,
          border: `2px solid ${sevColor}45`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: sevColor, margin: "0 auto",
          boxShadow: `0 0 20px ${sevColor}18`,
        }}>
          <Icon name={cs.icon} size={28} sw={1.6} />
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "14px 15px 15px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {/* Title */}
        <h3 style={{
          color: "var(--text-h)", fontSize: 13, fontWeight: 800,
          lineHeight: 1.45, margin: 0,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          overflow: "hidden", minHeight: "2.9em",
        }}>
          {cs.title}
        </h3>

        {/* Category */}
        <div>
          <CatBadge category={cs.category} small />
        </div>

        {/* Analytical technique pills */}
        {cs.analytical_techniques?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: "auto" }}>
            {cs.analytical_techniques.slice(0, 3).map((t, i) => (
              <span key={i} style={{
                background: "var(--bg-surface)", color: "var(--text-faint)",
                border: "1px solid var(--border)", borderRadius: 4,
                padding: "2px 6px", fontSize: 9, fontWeight: 600,
              }}>
                {t.split(" (")[0].split(" :")[0].split("/")[0]}
              </span>
            ))}
            {cs.analytical_techniques.length > 3 && (
              <span style={{ color: "var(--text-faint)", fontSize: 9, fontWeight: 600, padding: "2px 4px" }}>
                +{cs.analytical_techniques.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Numbered Learning Item ─────────────────────────────────────
function LearningItem({ n, text, color }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 12,
      background: `${color}0E`, border: `1px solid ${color}2A`,
      borderRadius: 10, padding: "10px 14px",
    }}>
      <span style={{
        flexShrink: 0, width: 24, height: 24, borderRadius: "50%",
        background: `${color}30`, color,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 800,
      }}>
        {n}
      </span>
      <p style={{ color: "var(--text-body)", fontSize: 13, lineHeight: 1.65, margin: 0 }}>
        {text}
      </p>
    </div>
  );
}

// ── Bullet item ────────────────────────────────────────────────
function BulletItem({ text, color }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "5px 0" }}>
      <span style={{
        flexShrink: 0, width: 6, height: 6, borderRadius: "50%",
        background: color, marginTop: 7,
      }} />
      <span style={{ color: "var(--text-body)", fontSize: 13, lineHeight: 1.65 }}>{text}</span>
    </div>
  );
}

// ── Section block ──────────────────────────────────────────────
function DetailSection({ label, color, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ width: 3, height: 18, background: color, borderRadius: 2, flexShrink: 0 }} />
        <h4 style={{
          color: "var(--text-h)", fontSize: 13, fontWeight: 800, margin: 0,
          letterSpacing: "0.04em", textTransform: "uppercase",
        }}>
          {label}
        </h4>
      </div>
      {children}
    </div>
  );
}

// ── Detail Panel ───────────────────────────────────────────────
function CaseDetailPanel({ cs, onBack }) {
  const sevColor = SEV_COLOR[cs.severity] || "var(--accent)";

  return (
    <div className="panel-enter" style={{
      background: "var(--bg-card)", border: "1px solid var(--border)",
      borderTop: `3px solid ${sevColor}`, borderRadius: 16, overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        padding: "28px 32px 24px",
        borderBottom: "1px solid var(--border)",
        background: `${sevColor}0A`,
      }}>
        <button
          onClick={onBack}
          style={{
            background: "var(--bg-raised)", border: "1px solid var(--border)",
            borderRadius: 8, padding: "5px 12px", color: "var(--text-sec)",
            fontSize: 12, fontWeight: 600, cursor: "pointer", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 6,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-surface)"; e.currentTarget.style.color = "var(--text-h)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--bg-raised)"; e.currentTarget.style.color = "var(--text-sec)"; }}
        >
          ← Back to Cases
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
          <span style={{
            background: "var(--bg-surface)", color: "var(--text-muted)",
            border: "1px solid var(--border)", padding: "2px 8px", borderRadius: 8,
            fontSize: 11, fontWeight: 700,
          }}>{cs.year}</span>
          <SevBar severity={cs.severity} />
          <CatBadge category={cs.category} />
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: `${sevColor}1E`, border: `2px solid ${sevColor}45`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: sevColor, flexShrink: 0,
          }}>
            <Icon name={cs.icon} size={26} sw={1.6} />
          </div>
          <div>
            <h2 style={{ color: "var(--text-h)", fontSize: 22, fontWeight: 900, margin: 0, lineHeight: 1.3 }}>
              {cs.title}
            </h2>
            <p style={{ color: "var(--text-sec)", margin: "6px 0 0", fontSize: 13 }}>
              <strong style={{ color: "var(--text-body)" }}>{cs.product}</strong>
              {" – "}
              {cs.company}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "28px 32px" }}>

        <DetailSection label="What Happened" color={sevColor}>
          <div style={{
            background: "var(--bg-raised)", borderRadius: 10, padding: "14px 16px",
            borderLeft: `3px solid ${sevColor}`,
          }}>
            <p style={{ color: "var(--text-body)", fontSize: 14, lineHeight: 1.75, margin: 0 }}>
              {cs.what_happened}
            </p>
          </div>
        </DetailSection>

        <DetailSection label="CMC Issues" color="#60A5FA">
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {cs.cmc_issues.map((issue, i) => (
              <BulletItem key={i} text={issue} color="#60A5FA" />
            ))}
          </div>
        </DetailSection>

        {/* Analytical Techniques */}
        {cs.analytical_techniques?.length > 0 && (
          <DetailSection label="Analytical Techniques" color="var(--accent-2)">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {cs.analytical_techniques.map((t, i) => (
                <span key={i} style={{
                  background: "color-mix(in srgb, var(--accent-2) 10%, transparent)", color: "var(--accent-2)",
                  border: "1px solid color-mix(in srgb, var(--accent-2) 30%, transparent)", borderRadius: 8,
                  padding: "5px 12px", fontSize: 12, fontWeight: 700,
                }}>
                  {t}
                </span>
              ))}
            </div>
          </DetailSection>
        )}

        <DetailSection label="Regulatory Outcome" color="var(--accent)">
          <div style={{ background: "color-mix(in srgb, var(--accent) 6%, transparent)", border: "1px solid color-mix(in srgb, var(--accent) 25%, transparent)", borderRadius: 10, padding: "14px 16px" }}>
            <p style={{ color: "var(--text-body)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              {cs.regulatory_outcome}
            </p>
          </div>
        </DetailSection>

        <DetailSection label="Key Learnings" color={sevColor}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cs.key_learnings.map((learning, i) => (
              <LearningItem key={i} n={i + 1} text={learning} color={sevColor} />
            ))}
          </div>
        </DetailSection>

        <DetailSection label="References" color="var(--text-muted)">
          <div style={{
            background: "var(--bg-surface)", borderRadius: 10, padding: "12px 16px",
            display: "flex", flexDirection: "column", gap: 4,
          }}>
            {cs.references.map((ref, i) => (
              <p key={i} style={{
                color: "var(--text-sec)", fontSize: 12, lineHeight: 1.6, margin: 0,
                paddingLeft: 12, borderLeft: "2px solid var(--border)",
              }}>
                {ref}
              </p>
            ))}
          </div>
        </DetailSection>
      </div>
    </div>
  );
}

// ── Main View ──────────────────────────────────────────────────
export default function CaseStudiesView() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeSev, setActiveSev] = useState("all");

  const filtered = CASE_STUDIES.filter(cs =>
    (activeCategory === "all" || cs.category === activeCategory) &&
    (activeSev === "all" || cs.severity === activeSev)
  );

  const counts = {
    total: CASE_STUDIES.length,
    critical: CASE_STUDIES.filter(c => c.severity === "critical").length,
    high:     CASE_STUDIES.filter(c => c.severity === "high").length,
    moderate: CASE_STUDIES.filter(c => c.severity === "moderate").length,
    cats:     CASE_CATEGORIES.length - 1,
  };

  if (selectedCase) {
    return (
      <div className="view-enter" style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 24px" }}>
        <CaseDetailPanel cs={selectedCase} onBack={() => setSelectedCase(null)} />
      </div>
    );
  }

  return (
    <div className="view-enter" style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 24px" }}>

      {/* ── Header ── */}
      <div style={{
        borderRadius: 16, padding: "28px 32px",
        background: "var(--panel)", border: "1px solid var(--hairline)",
        marginBottom: 24, position: "relative", overflow: "hidden",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 20, position: "relative" }}>
          <div>
            <h2 style={{ color: "var(--text-h)", margin: 0, fontSize: 24, fontWeight: 900, letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 11 }}>
              <Icon name="cases" size={22} sw={1.6} /> CMC Case Studies
            </h2>
            <p style={{ color: "var(--text-sec)", margin: "6px 0 0", fontSize: 14, lineHeight: 1.5 }}>
              Historical failures and regulatory events. Learn from what went wrong.
            </p>
          </div>

          {/* Stat chips */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { label: "Cases", value: counts.total, color: "var(--accent)" },
              { label: "Critical", value: counts.critical, color: "#F472B6" },
              { label: "High", value: counts.high, color: "#F59E0B" },
              { label: "Moderate", value: counts.moderate, color: "#34D399" },
              { label: "Categories", value: counts.cats, color: "#38BDF8" },
            ].map(s => (
              <div key={s.label} style={{
                background: `${s.color}15`, border: `1px solid ${s.color}35`,
                borderRadius: 10, padding: "8px 14px", textAlign: "center", minWidth: 58,
              }}>
                <div style={{ color: s.color, fontSize: 18, fontWeight: 900, lineHeight: 1 }}>{s.value}</div>
                <div style={{ color: s.color + "AA", fontSize: 9, fontWeight: 700, marginTop: 2, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div style={{
        display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20,
        background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border)",
        padding: "12px 16px", alignItems: "center",
      }}>
        {/* Category filter */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", flex: 1 }}>
          {CASE_CATEGORIES.map(cat => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: active ? cat.color : "var(--bg-raised)",
                  color: active ? "#000" : "var(--text-sec)",
                  border: `1px solid ${active ? cat.color : "var(--border)"}`,
                  borderRadius: 8, padding: "4px 12px", fontSize: 11, fontWeight: 700,
                  cursor: "pointer", transition: "all 0.15s ease",
                  letterSpacing: "0.01em",
                  display: "inline-flex", alignItems: "center", gap: 6,
                }}
              >
                <Icon name={cat.icon} size={12} sw={2} /> {cat.label}
                {cat.id !== "all" && (
                  <span style={{ opacity: 0.7, marginLeft: 4, fontSize: 10 }}>
                    ({CASE_STUDIES.filter(c => c.category === cat.id).length})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Severity filter */}
        <div style={{ display: "flex", gap: 5, borderLeft: "1px solid var(--border)", paddingLeft: 12 }}>
          {["all", "critical", "high", "moderate"].map(s => {
            const active = activeSev === s;
            const color = SEV_COLOR[s] || "var(--accent)";
            return (
              <button
                key={s}
                onClick={() => setActiveSev(s)}
                style={{
                  background: active && s !== "all" ? color : active ? "var(--accent)" : "var(--bg-raised)",
                  color: active ? (s === "all" ? "#fff" : "#000") : "var(--text-muted)",
                  border: `1px solid ${active && s !== "all" ? color : "var(--border)"}`,
                  borderRadius: 8, padding: "4px 10px", fontSize: 10, fontWeight: 700,
                  cursor: "pointer", textTransform: "capitalize",
                }}
              >
                {s === "all" ? "All Severity" : s}
              </button>
            );
          })}
        </div>

        <span style={{ color: "var(--text-muted)", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
          {filtered.length} case{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="empty-hint">
          <div className="eh-icon" style={{ display:"flex", justifyContent:"center", color:"var(--text-muted)" }}><Icon name="cases" size={26} sw={1.5} /></div>
          <p>No cases match these filters.</p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 16,
        }}>
          {filtered.map(cs => (
            <CaseCard key={cs.id} cs={cs} onSelect={setSelectedCase} />
          ))}
        </div>
      )}
    </div>
  );
}
