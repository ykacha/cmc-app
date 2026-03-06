import { useState } from "react";
import { CASE_STUDIES, CASE_CATEGORIES } from "../case-study-data";

// ── Severity helpers ──────────────────────────────────────────
const SEV_COLOR = {
  critical: "#F472B6",
  high:     "#F59E0B",
  moderate: "#34D399",
};

const SEV_LABEL = {
  critical: "Critical",
  high:     "High",
  moderate: "Moderate",
};

// ── SeverityBadge ─────────────────────────────────────────────
function SeverityBadge({ severity }) {
  const c = SEV_COLOR[severity] || "#A78BFA";
  return (
    <span style={{
      background: `${c}22`,
      color: c,
      border: `1px solid ${c}55`,
      padding: "2px 9px",
      borderRadius: 12,
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
    }}>
      {SEV_LABEL[severity] || severity}
    </span>
  );
}

// ── YearBadge ─────────────────────────────────────────────────
function YearBadge({ year }) {
  return (
    <span style={{
      background: "var(--bg-surface)",
      color: "var(--text-muted)",
      border: "1px solid var(--border)",
      padding: "2px 8px",
      borderRadius: 10,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.04em",
    }}>
      {year}
    </span>
  );
}

// ── CategoryTag ───────────────────────────────────────────────
function CategoryTag({ category }) {
  const cat = CASE_CATEGORIES.find(c => c.id === category);
  const color = cat?.color || "#A78BFA";
  return (
    <span style={{
      background: `${color}18`,
      color,
      border: `1px solid ${color}40`,
      padding: "2px 9px",
      borderRadius: 10,
      fontSize: 10,
      fontWeight: 700,
    }}>
      {cat?.label || category}
    </span>
  );
}

// ── Case Card ─────────────────────────────────────────────────
function CaseCard({ cs, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const sevColor = SEV_COLOR[cs.severity] || "#A78BFA";

  return (
    <div
      className="method-card card-hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${hovered ? sevColor + "55" : "var(--border)"}`,
        borderTop: `3px solid ${sevColor}`,
        borderRadius: 14,
        padding: "20px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        cursor: "default",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        boxShadow: hovered ? `0 8px 28px ${sevColor}1A` : "none",
      }}
    >
      {/* Top row: year + severity */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
        <YearBadge year={cs.year} />
        <SeverityBadge severity={cs.severity} />
      </div>

      {/* Icon + title */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{cs.icon}</span>
        <h3 style={{
          color: "var(--text-h)",
          fontSize: 14,
          fontWeight: 800,
          lineHeight: 1.4,
          margin: 0,
        }}>
          {cs.title}
        </h3>
      </div>

      {/* Product + company */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ color: "var(--text-body)", fontSize: 12, fontWeight: 600 }}>
          {cs.product}
        </span>
        <span style={{ color: "var(--text-muted)", fontSize: 11 }}>
          {cs.company}
        </span>
      </div>

      {/* Category tag */}
      <div>
        <CategoryTag category={cs.category} />
      </div>

      {/* View case button */}
      <button
        onClick={() => onSelect(cs)}
        style={{
          marginTop: "auto",
          background: `${sevColor}18`,
          color: sevColor,
          border: `1px solid ${sevColor}44`,
          borderRadius: 8,
          padding: "8px 0",
          fontSize: 12,
          fontWeight: 700,
          cursor: "pointer",
          width: "100%",
          transition: "all 0.18s ease",
          letterSpacing: "0.02em",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = sevColor;
          e.currentTarget.style.color = "#000";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = `${sevColor}18`;
          e.currentTarget.style.color = sevColor;
        }}
      >
        View Case →
      </button>
    </div>
  );
}

// ── Numbered Learning Item ────────────────────────────────────
function LearningItem({ n, text, color }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
      background: `${color}0E`,
      border: `1px solid ${color}2A`,
      borderRadius: 10,
      padding: "10px 14px",
    }}>
      <span style={{
        flexShrink: 0,
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: `${color}30`,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 800,
        lineHeight: 1,
      }}>
        {n}
      </span>
      <p style={{
        color: "var(--text-body)",
        fontSize: 13,
        lineHeight: 1.65,
        margin: 0,
      }}>
        {text}
      </p>
    </div>
  );
}

// ── Bullet item ───────────────────────────────────────────────
function BulletItem({ text, color }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      padding: "5px 0",
    }}>
      <span style={{
        flexShrink: 0,
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: color,
        marginTop: 7,
      }} />
      <span style={{ color: "var(--text-body)", fontSize: 13, lineHeight: 1.65 }}>
        {text}
      </span>
    </div>
  );
}

// ── Section block ─────────────────────────────────────────────
function DetailSection({ label, color, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
      }}>
        <div style={{
          width: 3,
          height: 18,
          background: color,
          borderRadius: 2,
          flexShrink: 0,
        }} />
        <h4 style={{
          color: "var(--text-h)",
          fontSize: 13,
          fontWeight: 800,
          margin: 0,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}>
          {label}
        </h4>
      </div>
      {children}
    </div>
  );
}

// ── Detail Panel ──────────────────────────────────────────────
function CaseDetailPanel({ cs, onBack }) {
  const sevColor = SEV_COLOR[cs.severity] || "#A78BFA";

  return (
    <div
      className="panel-enter"
      style={{
        background: "var(--bg-card)",
        border: `1px solid var(--border)`,
        borderTop: `3px solid ${sevColor}`,
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{
        padding: "28px 32px 24px",
        borderBottom: "1px solid var(--border)",
        background: `linear-gradient(135deg, ${sevColor}0A 0%, transparent 60%)`,
      }}>
        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            background: "var(--bg-raised)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "5px 12px",
            color: "var(--text-sec)",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "all 0.18s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "var(--bg-surface)";
            e.currentTarget.style.color = "var(--text-h)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "var(--bg-raised)";
            e.currentTarget.style.color = "var(--text-sec)";
          }}
        >
          ← Back to Cases
        </button>

        {/* Badges row */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
          <YearBadge year={cs.year} />
          <SeverityBadge severity={cs.severity} />
          <CategoryTag category={cs.category} />
        </div>

        {/* Title row */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 40, lineHeight: 1 }}>{cs.icon}</span>
          <div>
            <h2 style={{
              color: "var(--text-h)",
              fontSize: 22,
              fontWeight: 900,
              margin: 0,
              lineHeight: 1.3,
            }}>
              {cs.title}
            </h2>
            <p style={{ color: "var(--text-sec)", margin: "6px 0 0", fontSize: 13 }}>
              <strong style={{ color: "var(--text-body)" }}>{cs.product}</strong>
              {" — "}
              {cs.company}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "28px 32px" }}>

        {/* What Happened */}
        <DetailSection label="What Happened" color={sevColor}>
          <div style={{
            background: "var(--bg-raised)",
            borderRadius: 10,
            padding: "14px 16px",
            borderLeft: `3px solid ${sevColor}`,
          }}>
            <p style={{
              color: "var(--text-body)",
              fontSize: 14,
              lineHeight: 1.75,
              margin: 0,
            }}>
              {cs.what_happened}
            </p>
          </div>
        </DetailSection>

        {/* CMC Issues */}
        <DetailSection label="CMC Issues" color="#60A5FA">
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {cs.cmc_issues.map((issue, i) => (
              <BulletItem key={i} text={issue} color="#60A5FA" />
            ))}
          </div>
        </DetailSection>

        {/* Regulatory Outcome */}
        <DetailSection label="Regulatory Outcome" color="#A78BFA">
          <div style={{
            background: "#A78BFA0E",
            border: "1px solid #A78BFA28",
            borderRadius: 10,
            padding: "14px 16px",
          }}>
            <p style={{
              color: "var(--text-body)",
              fontSize: 13,
              lineHeight: 1.7,
              margin: 0,
            }}>
              {cs.regulatory_outcome}
            </p>
          </div>
        </DetailSection>

        {/* Key Learnings */}
        <DetailSection label="Key Learnings" color={sevColor}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cs.key_learnings.map((learning, i) => (
              <LearningItem key={i} n={i + 1} text={learning} color={sevColor} />
            ))}
          </div>
        </DetailSection>

        {/* References */}
        <DetailSection label="References" color="var(--text-muted)">
          <div style={{
            background: "var(--bg-surface)",
            borderRadius: 10,
            padding: "12px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}>
            {cs.references.map((ref, i) => (
              <p key={i} style={{
                color: "var(--text-sec)",
                fontSize: 12,
                lineHeight: 1.6,
                margin: 0,
                paddingLeft: 12,
                borderLeft: "2px solid var(--border)",
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

// ── Main View ─────────────────────────────────────────────────
export default function CaseStudiesView() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedCase, setSelectedCase] = useState(null);

  const filtered = activeCategory === "all"
    ? CASE_STUDIES
    : CASE_STUDIES.filter(cs => cs.category === activeCategory);

  if (selectedCase) {
    return (
      <div
        className="view-enter"
        style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}
      >
        <CaseDetailPanel cs={selectedCase} onBack={() => setSelectedCase(null)} />
      </div>
    );
  }

  return (
    <div
      className="view-enter"
      style={{ maxWidth: 1060, margin: "0 auto", padding: "32px 20px" }}
    >
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>📋</span>
          <div>
            <h2 style={{
              color: "var(--text-h)",
              fontSize: 26,
              fontWeight: 900,
              margin: 0,
              letterSpacing: "-0.01em",
            }}>
              Case Studies
            </h2>
            <p style={{
              color: "var(--text-sec)",
              margin: "4px 0 0",
              fontSize: 15,
              lineHeight: 1.5,
            }}>
              Historical CMC failures and regulatory events — learn from what went wrong
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex",
          gap: 16,
          marginTop: 16,
          flexWrap: "wrap",
        }}>
          {[
            { label: "Total Cases", value: CASE_STUDIES.length, color: "#A78BFA" },
            { label: "Critical", value: CASE_STUDIES.filter(c => c.severity === "critical").length, color: "#F472B6" },
            { label: "High", value: CASE_STUDIES.filter(c => c.severity === "high").length, color: "#F59E0B" },
            { label: "Moderate", value: CASE_STUDIES.filter(c => c.severity === "moderate").length, color: "#34D399" },
          ].map(s => (
            <div key={s.label} style={{
              background: "var(--bg-card)",
              border: `1px solid var(--border)`,
              borderTop: `2px solid ${s.color}`,
              borderRadius: 10,
              padding: "10px 18px",
              textAlign: "center",
              minWidth: 80,
            }}>
              <div style={{ color: s.color, fontSize: 20, fontWeight: 900 }}>{s.value}</div>
              <div style={{ color: "var(--text-sec)", fontSize: 10, fontWeight: 700, marginTop: 2, letterSpacing: "0.04em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category filters */}
      <div style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        marginBottom: 24,
        padding: "14px 18px",
        background: "var(--bg-card)",
        borderRadius: 12,
        border: "1px solid var(--border)",
      }}>
        {CASE_CATEGORIES.map(cat => {
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="cat-tab"
              style={{
                background: active ? cat.color : "var(--bg-raised)",
                color: active ? "#000" : "var(--text-sec)",
                border: `1px solid ${active ? cat.color : "var(--border)"}`,
                borderRadius: 20,
                padding: "5px 14px",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.18s ease",
              }}
            >
              {cat.label}
            </button>
          );
        })}
        <span style={{
          marginLeft: "auto",
          alignSelf: "center",
          color: "var(--text-muted)",
          fontSize: 12,
          fontWeight: 600,
        }}>
          {filtered.length} case{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="empty-hint">
          <div className="eh-icon">📋</div>
          <p>No cases match this category.</p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
          gap: 18,
        }}>
          {filtered.map(cs => (
            <CaseCard key={cs.id} cs={cs} onSelect={setSelectedCase} />
          ))}
        </div>
      )}
    </div>
  );
}
