import { useState, useMemo } from "react";
import { COMPENDIAL_METHODS, COMPENDIAL_CATEGORIES, COMPENDIAL_PRODUCT_TYPES } from "../compendial-data";

// ── Ref chip ──────────────────────────────────────────────────
function RefChip({ label, value, color }) {
  if (!value || value === "—") return null;
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: `${color}15`,
      border: `1px solid ${color}35`,
      borderRadius: 10,
      padding: "8px 14px",
      minWidth: 80,
      flex: "1 1 auto",
    }}>
      <span style={{
        color: "var(--text-muted)",
        fontSize: 9,
        fontWeight: 800,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        marginBottom: 4,
      }}>
        {label}
      </span>
      <span style={{
        color,
        fontSize: 14,
        fontWeight: 800,
        letterSpacing: "0.02em",
        lineHeight: 1.2,
        textAlign: "center",
      }}>
        {value}
      </span>
    </div>
  );
}

// ── Product type tag ──────────────────────────────────────────
function ProductTag({ label }) {
  return (
    <span style={{
      background: "var(--bg-raised)",
      color: "var(--text-sec)",
      border: "1px solid var(--border)",
      borderRadius: 8,
      padding: "2px 7px",
      fontSize: 10,
      fontWeight: 600,
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

// ── Category badge ────────────────────────────────────────────
function CatBadge({ category }) {
  const cat = COMPENDIAL_CATEGORIES.find(c => c.id === category);
  return (
    <span style={{
      background: "var(--bg-surface)",
      color: "var(--text-muted)",
      border: "1px solid var(--border)",
      borderRadius: 8,
      padding: "2px 8px",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
    }}>
      {cat?.icon} {cat?.label || category}
    </span>
  );
}

// ── Expanded detail panel ─────────────────────────────────────
function MethodDetail({ method, onClose }) {
  const c = method.color;

  return (
    <div
      className="scale-in"
      style={{
        background: "var(--bg-card)",
        border: `1px solid var(--border)`,
        borderLeft: `4px solid ${c}`,
        borderRadius: 14,
        overflow: "hidden",
        marginTop: 4,
      }}
    >
      {/* Detail header */}
      <div style={{
        padding: "20px 24px 16px",
        borderBottom: "1px solid var(--border)",
        background: `linear-gradient(135deg, ${c}0A 0%, transparent 70%)`,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>{method.icon}</span>
          <div>
            <h3 style={{
              color: "var(--text-h)",
              fontSize: 16,
              fontWeight: 800,
              margin: 0,
            }}>
              {method.test}
            </h3>
            <div style={{ display: "flex", gap: 6, marginTop: 5, flexWrap: "wrap" }}>
              <CatBadge category={method.category} />
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "var(--bg-raised)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            width: 30,
            height: 30,
            color: "var(--text-muted)",
            fontSize: 16,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.15s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "var(--bg-surface)";
            e.currentTarget.style.color = "var(--text-h)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "var(--bg-raised)";
            e.currentTarget.style.color = "var(--text-muted)";
          }}
        >
          ×
        </button>
      </div>

      <div style={{ padding: "20px 24px" }}>

        {/* Reference numbers prominent row */}
        <div style={{ marginBottom: 20 }}>
          <p style={{
            color: "var(--text-muted)",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}>
            Compendial References
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <RefChip label="USP" value={method.usp} color={c} />
            <RefChip label="EP" value={method.ep} color={c} />
            <RefChip label="JP" value={method.jp} color={c} />
            <RefChip label="ICH" value={method.ich} color="#A78BFA" />
          </div>
        </div>

        {/* Principle */}
        <div style={{ marginBottom: 16 }}>
          <p style={{
            color: "var(--text-muted)",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}>
            Principle
          </p>
          <div style={{
            background: "var(--bg-raised)",
            borderRadius: 10,
            padding: "12px 14px",
            borderLeft: `3px solid ${c}`,
          }}>
            <p style={{
              color: "var(--text-body)",
              fontSize: 13,
              lineHeight: 1.7,
              margin: 0,
            }}>
              {method.principle}
            </p>
          </div>
        </div>

        {/* Acceptance criteria */}
        <div style={{ marginBottom: 16 }}>
          <p style={{
            color: "var(--text-muted)",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}>
            Acceptance Criteria
          </p>
          <div style={{
            background: `${c}0E`,
            border: `1px solid ${c}28`,
            borderRadius: 10,
            padding: "12px 14px",
          }}>
            <p style={{
              color: "var(--text-body)",
              fontSize: 13,
              lineHeight: 1.65,
              margin: 0,
            }}>
              {method.acceptance}
            </p>
          </div>
        </div>

        {/* Notes */}
        <div style={{ marginBottom: 16 }}>
          <p style={{
            color: "var(--text-muted)",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}>
            Notes
          </p>
          <div style={{
            background: "var(--bg-surface)",
            borderRadius: 10,
            padding: "12px 14px",
            border: "1px solid var(--border)",
          }}>
            <p style={{
              color: "var(--text-sec)",
              fontSize: 12,
              lineHeight: 1.7,
              margin: 0,
            }}>
              {method.notes}
            </p>
          </div>
        </div>

        {/* Product types */}
        <div>
          <p style={{
            color: "var(--text-muted)",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}>
            Applicable Product Types
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {method.product_types.map(pt => (
              <ProductTag key={pt} label={pt} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Method row / card ─────────────────────────────────────────
function MethodRow({ method, isExpanded, onToggle }) {
  const c = method.color;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ marginBottom: isExpanded ? 12 : 0 }}
    >
      <div
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "13px 18px",
          background: isExpanded
            ? `${c}0D`
            : hovered
              ? "var(--bg-raised)"
              : "var(--bg-card)",
          borderLeft: `4px solid ${c}`,
          borderTop: "1px solid var(--border)",
          borderRight: "1px solid var(--border)",
          borderBottom: isExpanded ? "none" : "1px solid var(--border)",
          borderRadius: isExpanded ? "12px 12px 0 0" : 12,
          cursor: "pointer",
          transition: "background 0.18s ease",
        }}
      >
        {/* Icon */}
        <span style={{ fontSize: 18, flexShrink: 0, width: 28, textAlign: "center" }}>
          {method.icon}
        </span>

        {/* Name + category */}
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <div style={{
            color: isExpanded ? c : "var(--text-h)",
            fontSize: 13,
            fontWeight: 700,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            transition: "color 0.18s ease",
          }}>
            {method.test}
          </div>
          <div style={{ marginTop: 3 }}>
            <CatBadge category={method.category} />
          </div>
        </div>

        {/* Reference columns */}
        <div style={{
          display: "flex",
          gap: 6,
          flexShrink: 0,
          alignItems: "center",
        }}>
          {[
            { label: "USP", val: method.usp },
            { label: "EP", val: method.ep },
            { label: "JP", val: method.jp },
          ].map(ref => (
            <div key={ref.label} style={{
              textAlign: "center",
              minWidth: 54,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}>
              <span style={{
                color: "var(--text-faint)",
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.05em",
              }}>
                {ref.label}
              </span>
              <span style={{
                color: ref.val && ref.val !== "—" ? c : "var(--text-faint)",
                fontSize: 11,
                fontWeight: 700,
              }}>
                {ref.val || "—"}
              </span>
            </div>
          ))}
        </div>

        {/* ICH */}
        <div style={{
          flexShrink: 0,
          minWidth: 90,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          textAlign: "right",
        }}>
          <span style={{
            color: "var(--text-faint)",
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: "0.05em",
            textAlign: "right",
          }}>
            ICH
          </span>
          <span style={{
            color: method.ich && method.ich !== "—" ? "#A78BFA" : "var(--text-faint)",
            fontSize: 11,
            fontWeight: 700,
          }}>
            {method.ich || "—"}
          </span>
        </div>

        {/* Product types (hidden on narrow) */}
        <div style={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          maxWidth: 180,
          flexShrink: 0,
          justifyContent: "flex-end",
        }}>
          {method.product_types.slice(0, 2).map(pt => (
            <ProductTag key={pt} label={pt} />
          ))}
          {method.product_types.length > 2 && (
            <span style={{
              color: "var(--text-muted)",
              fontSize: 10,
              alignSelf: "center",
              fontWeight: 600,
            }}>
              +{method.product_types.length - 2}
            </span>
          )}
        </div>

        {/* Expand chevron */}
        <span style={{
          color: isExpanded ? c : "var(--text-muted)",
          fontSize: 14,
          flexShrink: 0,
          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.22s ease, color 0.18s ease",
          marginLeft: 4,
        }}>
          ▼
        </span>
      </div>

      {/* Expanded detail */}
      {isExpanded && (
        <MethodDetail method={method} onClose={onToggle} />
      )}
    </div>
  );
}

// ── Main View ─────────────────────────────────────────────────
export default function CompendialView() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [productType, setProductType] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return COMPENDIAL_METHODS.filter(m => {
      const matchSearch = !q || [
        m.test, m.usp, m.ep, m.jp, m.ich,
        m.principle, m.notes,
      ].some(s => s && s.toLowerCase().includes(q));

      const matchCat = activeCategory === "all" || m.category === activeCategory;

      const matchPT = productType === "All"
        || m.product_types.some(pt =>
          pt.toLowerCase().includes(productType.toLowerCase()) ||
          productType.toLowerCase().includes(pt.toLowerCase())
        );

      return matchSearch && matchCat && matchPT;
    });
  }, [search, activeCategory, productType]);

  const handleToggle = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div
      className="view-enter"
      style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px" }}
    >
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>📗</span>
          <div>
            <h2 style={{
              color: "var(--text-h)",
              fontSize: 26,
              fontWeight: 900,
              margin: 0,
              letterSpacing: "-0.01em",
            }}>
              Compendial Methods
            </h2>
            <p style={{
              color: "var(--text-sec)",
              margin: "4px 0 0",
              fontSize: 15,
              lineHeight: 1.5,
            }}>
              USP / EP / JP cross-reference with ICH guidelines — {COMPENDIAL_METHODS.length} pharmacopeial tests
            </p>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{
          display: "flex",
          gap: 10,
          marginTop: 16,
          flexWrap: "wrap",
        }}>
          {COMPENDIAL_CATEGORIES.filter(c => c.id !== "all").map(cat => {
            const cnt = COMPENDIAL_METHODS.filter(m => m.category === cat.id).length;
            return (
              <div key={cat.id} style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}>
                <span style={{ fontSize: 14 }}>{cat.icon}</span>
                <span style={{ color: "var(--text-body)", fontSize: 12, fontWeight: 700 }}>{cnt}</span>
                <span style={{ color: "var(--text-muted)", fontSize: 11 }}>{cat.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls bar */}
      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "16px 20px",
        marginBottom: 20,
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        alignItems: "center",
      }}>
        {/* Search */}
        <div style={{ position: "relative", flex: "1 1 200px" }}>
          <span style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-muted)",
            fontSize: 14,
            pointerEvents: "none",
          }}>
            🔍
          </span>
          <input
            type="text"
            placeholder="Search tests, chapters, principles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%",
              background: "var(--bg-raised)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "9px 12px 9px 34px",
              color: "var(--text-h)",
              fontSize: 13,
              outline: "none",
              transition: "border-color 0.18s ease",
            }}
            onFocus={e => (e.target.style.borderColor = "var(--accent-glow)")}
            onBlur={e => (e.target.style.borderColor = "var(--border)")}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                fontSize: 16,
                cursor: "pointer",
                padding: 2,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Product type dropdown */}
        <select
          value={productType}
          onChange={e => setProductType(e.target.value)}
          style={{
            background: "var(--select-bg)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: "9px 12px",
            color: "var(--text-h)",
            fontSize: 13,
            cursor: "pointer",
            outline: "none",
            minWidth: 160,
            flex: "0 0 auto",
          }}
        >
          {COMPENDIAL_PRODUCT_TYPES.map(pt => (
            <option key={pt} value={pt}>{pt}</option>
          ))}
        </select>

        {/* Result count */}
        <span style={{
          color: "var(--text-muted)",
          fontSize: 12,
          fontWeight: 600,
          flexShrink: 0,
          marginLeft: "auto",
        }}>
          Showing {filtered.length} of {COMPENDIAL_METHODS.length} methods
        </span>
      </div>

      {/* Category filters */}
      <div style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        marginBottom: 20,
      }}>
        {COMPENDIAL_CATEGORIES.map(cat => {
          const active = activeCategory === cat.id;
          const count = cat.id === "all"
            ? COMPENDIAL_METHODS.length
            : COMPENDIAL_METHODS.filter(m => m.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="cat-tab"
              style={{
                background: active ? "var(--accent)" : "var(--bg-raised)",
                color: active ? "#fff" : "var(--text-sec)",
                border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                borderRadius: 20,
                padding: "5px 14px",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span style={{
                background: active ? "rgba(255,255,255,0.25)" : "var(--bg-surface)",
                color: active ? "#fff" : "var(--text-muted)",
                borderRadius: 10,
                padding: "1px 6px",
                fontSize: 10,
                fontWeight: 800,
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table header */}
      {filtered.length > 0 && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "8px 18px 8px 22px",
          background: "var(--bg-surface)",
          borderRadius: "10px 10px 0 0",
          border: "1px solid var(--border)",
          borderBottom: "none",
        }}>
          <span style={{
            flex: "1 1 0",
            color: "var(--text-muted)",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            Test / Category
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            {["USP", "EP", "JP"].map(r => (
              <div key={r} style={{
                minWidth: 54,
                textAlign: "center",
                color: "var(--text-muted)",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>
                {r}
              </div>
            ))}
          </div>
          <div style={{
            minWidth: 90,
            textAlign: "right",
            color: "var(--text-muted)",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            ICH
          </div>
          <div style={{
            minWidth: 180,
            textAlign: "right",
            color: "var(--text-muted)",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            Product Types
          </div>
          <div style={{ width: 22 }} />
        </div>
      )}

      {/* Method list */}
      {filtered.length === 0 ? (
        <div className="empty-hint">
          <div className="eh-icon">📗</div>
          <p>No methods match your filters. Try adjusting the search or category.</p>
        </div>
      ) : (
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          background: "var(--bg-base)",
          borderRadius: "0 0 14px 14px",
          border: "1px solid var(--border)",
          borderTop: "none",
          overflow: "hidden",
          padding: "6px 6px",
        }}>
          {filtered.map((method, idx) => (
            <div key={method.id} style={{
              paddingTop: idx === 0 ? 6 : 0,
              paddingBottom: 6,
            }}>
              <MethodRow
                method={method}
                isExpanded={expandedId === method.id}
                onToggle={() => handleToggle(method.id)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Footer count */}
      {filtered.length > 0 && (
        <div style={{
          textAlign: "right",
          marginTop: 12,
          color: "var(--text-muted)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.02em",
        }}>
          Showing {filtered.length} of {COMPENDIAL_METHODS.length} methods
          {activeCategory !== "all" && ` in ${COMPENDIAL_CATEGORIES.find(c => c.id === activeCategory)?.label}`}
          {productType !== "All" && ` for ${productType}`}
        </div>
      )}
    </div>
  );
}
