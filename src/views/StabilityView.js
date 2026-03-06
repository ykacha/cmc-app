import { useState } from "react";
import {
  STABILITY_CONDITIONS,
  ICH_Q1_ZONES,
  STABILITY_TESTS,
  STABILITY_TIMEPOINTS,
  SHELF_LIFE_STATS,
} from "../stability-data";

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

function Badge({ children, color, bg }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 9px",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.4px",
      color: color || "#fff",
      background: bg || "var(--accent)",
    }}>
      {children}
    </span>
  );
}

/* ─── Tab 1: Conditions ───────────────────────────────────── */
function ConditionsTab({ selectedCondition, onSelectCondition }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div>
      <SectionHeader
        icon="🌡️"
        title="Stability Conditions"
        subtitle="ICH Q1A(R2) — required storage conditions for drug substance and drug product stability studies"
      />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 16,
        marginBottom: 32,
      }}>
        {STABILITY_CONDITIONS.map((cond) => {
          const isSelected = selectedCondition?.id === cond.id;
          const isHovered = hovered === cond.id;
          return (
            <div
              key={cond.id}
              onClick={() => onSelectCondition(isSelected ? null : cond)}
              onMouseEnter={() => setHovered(cond.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "var(--bg-card)",
                border: `1.5px solid ${isSelected ? cond.color : "var(--border)"}`,
                borderRadius: 12,
                borderTop: `4px solid ${cond.color}`,
                padding: 20,
                cursor: "pointer",
                transition: "all 0.18s ease",
                boxShadow: isHovered || isSelected
                  ? `0 6px 24px rgba(0,0,0,0.45), 0 0 0 1px ${cond.color}44`
                  : "0 2px 8px rgba(0,0,0,0.25)",
                transform: isHovered ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{cond.icon}</span>
                  <span style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: "var(--text-h)",
                  }}>{cond.label}</span>
                </div>
                <Badge color={cond.color} bg={cond.color + "22"}>Zone {cond.zone}</Badge>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6px 12px",
                marginBottom: 10,
                padding: "10px 12px",
                background: "var(--bg-surface)",
                borderRadius: 8,
                border: "1px solid var(--border)",
              }}>
                <div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.6px" }}>Temp</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: cond.color }}>{cond.temp}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.6px" }}>RH</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-body)" }}>{cond.rh}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.6px" }}>Duration</div>
                  <div style={{ fontSize: 12, color: "var(--text-body)" }}>{cond.duration}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.6px" }}>Timepoints</div>
                  <div style={{ fontSize: 12, color: "var(--text-body)" }}>{cond.freq_notes.split(",").length} pulls</div>
                </div>
              </div>

              <p style={{ margin: 0, fontSize: 12, color: "var(--text-sec)", lineHeight: 1.5 }}>
                {cond.description}
              </p>

              {isSelected && (
                <div style={{
                  marginTop: 12,
                  padding: "8px 10px",
                  background: cond.color + "18",
                  borderRadius: 6,
                  border: `1px solid ${cond.color}44`,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}>
                  <span style={{ fontSize: 11, color: cond.color, fontWeight: 600 }}>
                    ↓ See timepoints below
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Timepoints panel */}
      {selectedCondition && (
        <div style={{
          background: "var(--bg-card)",
          border: `1.5px solid ${selectedCondition.color}55`,
          borderLeft: `4px solid ${selectedCondition.color}`,
          borderRadius: 12,
          padding: 24,
          animation: "slideDown 0.22s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 16 }}>{selectedCondition.icon}</span>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--text-h)" }}>
              {selectedCondition.label} — Required Timepoints
            </h3>
          </div>
          <p style={{ margin: "0 0 16px", fontSize: 12, color: "var(--text-sec)" }}>
            {selectedCondition.purpose}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {(STABILITY_TIMEPOINTS[selectedCondition.id] || []).map((tp, i) => (
              <span key={i} style={{
                padding: "5px 14px",
                borderRadius: 20,
                background: selectedCondition.color + "22",
                border: `1.5px solid ${selectedCondition.color}55`,
                color: selectedCondition.color,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.3px",
              }}>
                {typeof tp === "number" && tp < 1 ? `${Math.round(tp * 4)} wk` : `${tp} ${typeof tp === "number" ? "mo" : ""}`}
              </span>
            ))}
          </div>
          <div style={{ marginTop: 14, fontSize: 11, color: "var(--text-muted)" }}>
            Full schedule: {selectedCondition.freq_notes}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Tab 2: ICH Zones ────────────────────────────────────── */
function ICHZonesTab() {
  const [hovered, setHovered] = useState(null);

  return (
    <div>
      <SectionHeader
        icon="🌍"
        title="ICH Q1 Climatic Zones"
        subtitle="WHO and ICH Q1A(R2) climatic zone classification — determines required long-term storage conditions by market"
      />

      {/* Info box */}
      <div style={{
        background: "var(--bg-raised)",
        border: "1px solid var(--border)",
        borderLeft: "4px solid #38BDF8",
        borderRadius: 10,
        padding: "14px 18px",
        marginBottom: 24,
        fontSize: 13,
        color: "var(--text-sec)",
        lineHeight: 1.65,
      }}>
        <strong style={{ color: "var(--text-h)" }}>Key concept:</strong> The Mean Kinetic Temperature (MKT) is the single calculated temperature equivalent
        to the effects of variable temperatures experienced during storage. ICH Q1A(R2) mandates the zone that applies
        for each target market drives the long-term condition selection.
      </div>

      {/* Zone cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16, marginBottom: 32 }}>
        {ICH_Q1_ZONES.map((z) => (
          <div
            key={z.zone}
            onMouseEnter={() => setHovered(z.zone)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: "var(--bg-card)",
              border: "1.5px solid var(--border)",
              borderTop: `4px solid ${z.color}`,
              borderRadius: 12,
              padding: 20,
              transition: "all 0.18s ease",
              boxShadow: hovered === z.zone
                ? `0 8px 28px rgba(0,0,0,0.4), 0 0 0 1px ${z.color}44`
                : "0 2px 8px rgba(0,0,0,0.25)",
              transform: hovered === z.zone ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 36, height: 36,
                  borderRadius: 10,
                  background: z.color + "22",
                  border: `1.5px solid ${z.color}55`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 15, color: z.color,
                }}>
                  {z.zone}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-h)" }}>{z.label}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Zone {z.zone}</div>
                </div>
              </div>
              <div style={{
                padding: "4px 10px",
                borderRadius: 8,
                background: z.color + "22",
                color: z.color,
                fontSize: 12,
                fontWeight: 700,
              }}>
                {z.mkt}
              </div>
            </div>

            <div style={{
              fontSize: 12,
              color: "var(--text-sec)",
              lineHeight: 1.6,
              marginBottom: 10,
            }}>
              {z.description}
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 10px",
              background: "var(--bg-surface)",
              borderRadius: 7,
              border: "1px solid var(--border)",
            }}>
              <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>Countries:</span>
              <span style={{ fontSize: 12, color: "var(--text-body)" }}>{z.countries}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary table */}
      <div style={{
        background: "var(--bg-card)",
        border: "1.5px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
      }}>
        <div style={{
          padding: "14px 20px",
          background: "var(--bg-raised)",
          borderBottom: "1px solid var(--border)",
          fontWeight: 700,
          fontSize: 13,
          color: "var(--text-h)",
        }}>
          Zone Comparison Table
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--bg-surface)" }}>
                {["Zone", "Climate Type", "Countries", "MKT Condition", "Long-Term Condition"].map(h => (
                  <th key={h} style={{
                    padding: "10px 16px", textAlign: "left",
                    fontSize: 11, fontWeight: 700,
                    color: "var(--text-sec)",
                    textTransform: "uppercase", letterSpacing: "0.5px",
                    borderBottom: "1px solid var(--border)",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ICH_Q1_ZONES.map((z, i) => (
                <tr key={z.zone} style={{
                  borderBottom: "1px solid var(--border)",
                  background: i % 2 === 0 ? "transparent" : "var(--bg-raised)",
                }}>
                  <td style={{ padding: "12px 16px" }}>
                    <Badge color={z.color} bg={z.color + "22"}>Zone {z.zone}</Badge>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--text-body)", fontWeight: 600 }}>{z.label}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-sec)" }}>{z.countries}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: z.color, fontWeight: 700 }}>{z.mkt}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-sec)" }}>
                    {z.zone === "I" || z.zone === "II" ? "25°C/60% RH" :
                     z.zone === "III" ? "30°C/35% RH" :
                     z.zone === "IVA" ? "30°C/65% RH" : "30°C/75% RH"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── Tab 3: Study Matrix ─────────────────────────────────── */
function StudyMatrixTab() {
  const [selectedProduct, setSelectedProduct] = useState(STABILITY_TESTS[0].id);
  const [hovered, setHovered] = useState(null);

  const product = STABILITY_TESTS.find(p => p.id === selectedProduct);

  return (
    <div>
      <SectionHeader
        icon="📋"
        title="Stability Study Matrix"
        subtitle="Required stability-indicating tests by product type — ICH Q1A(R2), Q6A, Q6B"
      />

      {/* Product type selector */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Select Product Type
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {STABILITY_TESTS.map((p) => {
            const isActive = selectedProduct === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProduct(p.id)}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: "10px 18px",
                  borderRadius: 10,
                  border: `1.5px solid ${isActive ? p.color : "var(--border)"}`,
                  background: isActive ? p.color + "18" : "var(--bg-card)",
                  color: isActive ? p.color : "var(--text-sec)",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 13,
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  boxShadow: (isActive || hovered === p.id) ? `0 4px 14px rgba(0,0,0,0.35)` : "none",
                  transform: hovered === p.id ? "translateY(-1px)" : "none",
                }}
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tests table */}
      {product && (
        <div style={{
          background: "var(--bg-card)",
          border: `1.5px solid ${product.color}44`,
          borderTop: `4px solid ${product.color}`,
          borderRadius: 12,
          overflow: "hidden",
          animation: "scaleIn 0.2s ease",
        }}>
          <div style={{
            padding: "14px 20px",
            background: "var(--bg-raised)",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
            <span style={{ fontSize: 18 }}>{product.icon}</span>
            <div>
              <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text-h)" }}>{product.label}</span>
              <span style={{ marginLeft: 10, fontSize: 12, color: "var(--text-sec)" }}>{product.tests.length} stability tests required</span>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--bg-surface)" }}>
                  {["#", "Test / Attribute", "Analytical Method", "Acceptance Criteria", "ICH Reference", "USP Chapter"].map(h => (
                    <th key={h} style={{
                      padding: "10px 14px",
                      textAlign: "left",
                      fontSize: 11, fontWeight: 700,
                      color: "var(--text-sec)",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      borderBottom: "1px solid var(--border)",
                      whiteSpace: "nowrap",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {product.tests.map((t, i) => (
                  <tr key={i} style={{
                    borderBottom: "1px solid var(--border)",
                    background: i % 2 === 0 ? "transparent" : "var(--bg-raised)",
                    transition: "background 0.12s",
                  }}>
                    <td style={{ padding: "11px 14px" }}>
                      <span style={{
                        width: 22, height: 22,
                        borderRadius: "50%",
                        background: product.color + "22",
                        border: `1px solid ${product.color}44`,
                        color: product.color,
                        fontSize: 11, fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        {i + 1}
                      </span>
                    </td>
                    <td style={{ padding: "11px 14px", fontSize: 13, fontWeight: 600, color: "var(--text-h)" }}>{t.test}</td>
                    <td style={{ padding: "11px 14px", fontSize: 12, color: "var(--text-body)" }}>{t.method}</td>
                    <td style={{ padding: "11px 14px", fontSize: 12, color: "var(--text-sec)", maxWidth: 240 }}>{t.spec}</td>
                    <td style={{ padding: "11px 14px" }}>
                      {t.ich !== "—" ? (
                        <Badge color={product.color} bg={product.color + "18"}>
                          {t.ich}
                        </Badge>
                      ) : (
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: "11px 14px", fontSize: 12, color: "var(--text-sec)", fontFamily: "monospace" }}>
                      {t.usp !== "—" ? t.usp : <span style={{ color: "var(--text-muted)" }}>—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Tab 4: Shelf Life ───────────────────────────────────── */
function ShelfLifeTab() {
  const [initVal, setInitVal] = useState("100");
  const [kRate, setKRate] = useState("0.5");
  const [calcResult, setCalcResult] = useState(null);

  function calculate() {
    const C0 = parseFloat(initVal);
    const kMonth = parseFloat(kRate) / 100;
    if (!C0 || !kMonth || kMonth <= 0) return;
    // First-order: C(t) = C0 * e^(-k*t), T90 when C = 0.9*C0
    // ln(0.9) = -k*T90  =>  T90 = ln(0.9) / (-k)
    const T90_months = Math.log(0.9) / (-kMonth);
    const T90_years = T90_months / 12;
    const today = new Date();
    const expiry = new Date(today);
    expiry.setMonth(expiry.getMonth() + Math.floor(T90_months));
    setCalcResult({ T90_months: T90_months.toFixed(1), T90_years: T90_years.toFixed(2), expiry: expiry.toLocaleDateString("en-US", { month: "long", year: "numeric" }) });
  }

  const progressPoints = [0, 3, 6, 9, 12, 18, 24];
  const kM = parseFloat(kRate) / 100;

  return (
    <div>
      <SectionHeader
        icon="⏳"
        title="Shelf Life Statistics"
        subtitle="Typical approved shelf-life durations by product type and ICH Q1E statistical extrapolation guidance"
      />

      {/* Stats table */}
      <div style={{
        background: "var(--bg-card)",
        border: "1.5px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 32,
      }}>
        <div style={{
          padding: "14px 20px",
          background: "var(--bg-raised)",
          borderBottom: "1px solid var(--border)",
          fontWeight: 700, fontSize: 14, color: "var(--text-h)",
        }}>
          Industry Typical Shelf Life by Product Type
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--bg-surface)" }}>
                {["Product Type", "Typical Approved", "With Extended Data", "Storage Condition"].map(h => (
                  <th key={h} style={{
                    padding: "10px 18px",
                    textAlign: "left",
                    fontSize: 11, fontWeight: 700,
                    color: "var(--text-sec)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    borderBottom: "1px solid var(--border)",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SHELF_LIFE_STATS.map((row, i) => (
                <tr key={i} style={{
                  borderBottom: "1px solid var(--border)",
                  background: i % 2 === 0 ? "transparent" : "var(--bg-raised)",
                }}>
                  <td style={{ padding: "13px 18px", fontSize: 13, fontWeight: 600, color: "var(--text-h)" }}>{row.product}</td>
                  <td style={{ padding: "13px 18px" }}>
                    <span style={{
                      padding: "3px 10px",
                      borderRadius: 6,
                      background: "#34D39920",
                      color: "#34D399",
                      fontSize: 13, fontWeight: 700,
                    }}>{row.typical}</span>
                  </td>
                  <td style={{ padding: "13px 18px" }}>
                    <span style={{
                      padding: "3px 10px",
                      borderRadius: 6,
                      background: "#38BDF820",
                      color: "#38BDF8",
                      fontSize: 13, fontWeight: 700,
                    }}>{row.with_data}</span>
                  </td>
                  <td style={{ padding: "13px 18px", fontSize: 12, color: "var(--text-sec)", fontFamily: "monospace" }}>{row.storage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* T90 Calculator */}
      <div style={{
        background: "var(--bg-card)",
        border: "1.5px solid var(--border)",
        borderLeft: "4px solid var(--accent-glow)",
        borderRadius: 12,
        padding: 28,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 20 }}>🧮</span>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--text-h)" }}>T90 Shelf-Life Calculator</h3>
        </div>
        <p style={{ margin: "0 0 22px", fontSize: 13, color: "var(--text-sec)", lineHeight: 1.6 }}>
          Calculates time to 90% of initial potency using first-order Arrhenius kinetics.
          T90 = ln(0.9) / (−k). Assumes constant temperature, linear degradation.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 16, alignItems: "flex-end", marginBottom: 24 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-sec)", marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Initial Potency (%)
            </label>
            <input
              type="number"
              value={initVal}
              onChange={e => setInitVal(e.target.value)}
              placeholder="100"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 8,
                border: "1.5px solid var(--border)",
                background: "var(--bg-surface)",
                color: "var(--text-h)",
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-sec)", marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Degradation Rate k (%/month)
            </label>
            <input
              type="number"
              step="0.1"
              value={kRate}
              onChange={e => setKRate(e.target.value)}
              placeholder="0.5"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 8,
                border: "1.5px solid var(--border)",
                background: "var(--bg-surface)",
                color: "var(--text-h)",
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>
          <button
            onClick={calculate}
            style={{
              padding: "10px 24px",
              borderRadius: 8,
              border: "none",
              background: "var(--accent)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              height: 42,
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => e.target.style.opacity = "0.85"}
            onMouseLeave={e => e.target.style.opacity = "1"}
          >
            Calculate
          </button>
        </div>

        {calcResult && (
          <div style={{ animation: "scaleIn 0.2s ease" }}>
            {/* Result summary */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 14,
              marginBottom: 22,
            }}>
              {[
                { label: "T90 (months)", value: calcResult.T90_months + " mo", color: "#34D399" },
                { label: "T90 (years)", value: calcResult.T90_years + " yr", color: "#38BDF8" },
                { label: "Projected Expiry", value: calcResult.expiry, color: "#A78BFA" },
              ].map(stat => (
                <div key={stat.label} style={{
                  padding: "16px 18px",
                  borderRadius: 10,
                  background: stat.color + "14",
                  border: `1.5px solid ${stat.color}44`,
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: stat.color }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Degradation progress bar chart */}
            <div style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: 18,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-sec)", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Projected Potency Decay
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {progressPoints.map(month => {
                  const potency = kM > 0 ? parseFloat(initVal) * Math.exp(-kM * month) : parseFloat(initVal);
                  const pct = Math.max(0, Math.min(100, potency));
                  const color = pct >= 95 ? "#34D399" : pct >= 90 ? "#F59E0B" : "#F472B6";
                  return (
                    <div key={month} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 40, fontSize: 11, color: "var(--text-sec)", fontWeight: 600, textAlign: "right", flexShrink: 0 }}>
                        {month === 0 ? "T=0" : `${month}mo`}
                      </div>
                      <div style={{ flex: 1, height: 10, background: "var(--bg-surface)", borderRadius: 6, overflow: "hidden" }}>
                        <div style={{
                          width: `${pct}%`,
                          height: "100%",
                          background: `linear-gradient(90deg, ${color}, ${color}aa)`,
                          borderRadius: 6,
                          transition: "width 0.4s ease",
                        }} />
                      </div>
                      <div style={{ width: 56, fontSize: 12, color, fontWeight: 700, flexShrink: 0 }}>
                        {pct.toFixed(1)}%
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{
                marginTop: 12,
                padding: "8px 12px",
                background: "var(--bg-surface)",
                borderRadius: 7,
                fontSize: 11,
                color: "var(--text-muted)",
              }}>
                Spec limit: 90% (T90 threshold). Green = in spec, Yellow = approaching, Pink = below limit.
                First-order kinetics: C(t) = C₀ · e^(−kt)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main Export ─────────────────────────────────────────── */
export default function StabilityView() {
  const [activeTab, setActiveTab] = useState("Conditions");
  const [selectedCondition, setSelectedCondition] = useState(null);

  const tabs = ["Conditions", "ICH Zones", "Study Matrix", "Shelf Life"];

  return (
    <div className="view-enter" style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 24px" }}>

      {/* Page header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
          <div style={{
            width: 50, height: 50,
            borderRadius: 14,
            background: "linear-gradient(135deg, #34D399, #38BDF8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, boxShadow: "0 4px 16px rgba(52,211,153,0.35)",
          }}>
            🌡️
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "var(--text-h)", letterSpacing: "-0.5px" }}>
              Stability Studies
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-sec)" }}>
              ICH Q1A(R2) · Q1B · Q1C · Q1D · Q1E — Storage conditions, climatic zones, study design &amp; shelf life
            </p>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
          {[
            { label: "Conditions", value: STABILITY_CONDITIONS.length, color: "#34D399" },
            { label: "ICH Zones", value: ICH_Q1_ZONES.length, color: "#38BDF8" },
            { label: "Product Types", value: STABILITY_TESTS.length, color: "#A78BFA" },
            { label: "Shelf Life Profiles", value: SHELF_LIFE_STATS.length, color: "#F59E0B" },
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
        {activeTab === "Conditions" && (
          <ConditionsTab
            selectedCondition={selectedCondition}
            onSelectCondition={setSelectedCondition}
          />
        )}
        {activeTab === "ICH Zones" && <ICHZonesTab />}
        {activeTab === "Study Matrix" && <StudyMatrixTab />}
        {activeTab === "Shelf Life" && <ShelfLifeTab />}
      </div>
    </div>
  );
}
