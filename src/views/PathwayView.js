import { useState, useEffect } from "react";
import { PATHWAY_LEVELS, LEARNING_PATHWAYS, PATHWAY_MILESTONES } from "../pathway-data";

const LS_KEY = "cmc-pathway-progress";

// ── Day-plan tab color sequence ───────────────────────────────
const PLAN_TABS = [
  { id: "day30", label: "Days 1–30",  shortLabel: "30-Day" },
  { id: "day60", label: "Days 31–60", shortLabel: "60-Day" },
  { id: "day90", label: "Days 61–90", shortLabel: "90-Day" },
];

// ── Helper: plural topic count ────────────────────────────────
const topicCount = (plan) => (plan?.topics?.length ?? 0);

// ── Sub-component: TopicRow ───────────────────────────────────
const TopicRow = ({ topic, color }) => (
  <div style={{
    display: "flex", gap: 10, alignItems: "flex-start",
    padding: "10px 12px",
    background: "var(--bg-raised)",
    border: "1px solid var(--border)",
    borderLeft: `3px solid ${color}`,
    borderRadius: 8,
    marginBottom: 8,
  }}>
    {/* Day badge */}
    <div style={{
      background: `${color}22`, border: `1px solid ${color}44`,
      borderRadius: 7, padding: "3px 8px",
      minWidth: 52, textAlign: "center", flexShrink: 0,
    }}>
      <div style={{ color: color, fontSize: 9, fontWeight: 800, letterSpacing: "0.05em" }}>DAYS</div>
      <div style={{ color: color, fontSize: 11, fontWeight: 800, lineHeight: 1.2 }}>{topic.day}</div>
    </div>

    {/* Main content */}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 4 }}>
        <span style={{ color: "var(--text-h)", fontSize: 12, fontWeight: 700, lineHeight: 1.4 }}>
          {topic.topic}
        </span>
        {/* View link as text badge */}
        {topic.view && (
          <span style={{
            background: "var(--bg-surface)", border: "1px solid var(--border)",
            padding: "1px 7px", borderRadius: 8,
            color: "var(--text-muted)", fontSize: 9, fontWeight: 700,
            letterSpacing: "0.05em",
          }}>
            → {topic.view.toUpperCase()}
          </span>
        )}
      </div>
      <p style={{ color: "var(--text-sec)", fontSize: 11, margin: "0 0 4px", lineHeight: 1.5 }}>
        {topic.competency}
      </p>
      <div style={{ color: "var(--text-faint)", fontSize: 10 }}>
        <span style={{ fontWeight: 700 }}>~{topic.time_min} min</span>
      </div>
    </div>
  </div>
);

// ── Sub-component: MilestoneBanner ───────────────────────────
const MilestoneBanner = ({ text, color }) => (
  <div style={{
    background: `${color}11`, border: `1px solid ${color}33`,
    borderRadius: 8, padding: "10px 14px", marginTop: 8,
    display: "flex", gap: 8, alignItems: "flex-start",
  }}>
    <span style={{ fontSize: 16, flexShrink: 0 }}>🏁</span>
    <div>
      <div style={{ color: color, fontSize: 10, fontWeight: 800, marginBottom: 3 }}>MILESTONE</div>
      <p style={{ color: "var(--text-body)", margin: 0, fontSize: 12, lineHeight: 1.55 }}>{text}</p>
    </div>
  </div>
);

// ── Sub-component: BadgeCard ──────────────────────────────────
const BadgeCard = ({ badge, earned, onToggle }) => {
  return (
    <div style={{
      background: "var(--bg-card)",
      border: `1px solid ${earned ? badge.color + "55" : "var(--border)"}`,
      borderRadius: 10,
      padding: "14px 14px",
      textAlign: "center",
      opacity: earned ? 1 : 0.45,
      filter: earned ? "none" : "grayscale(0.7)",
      transition: "all 0.2s ease",
      cursor: "pointer",
      position: "relative",
    }}
      onClick={onToggle}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.filter = "none";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = earned ? "1" : "0.45";
        e.currentTarget.style.filter = earned ? "none" : "grayscale(0.7)";
        e.currentTarget.style.transform = "none";
      }}
    >
      {/* Earned checkmark */}
      {earned && (
        <div style={{
          position: "absolute", top: 6, right: 8,
          background: "#34D399", color: "#000",
          borderRadius: "50%", width: 16, height: 16,
          fontSize: 9, fontWeight: 800,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          ✓
        </div>
      )}

      {/* Icon */}
      <div style={{
        fontSize: 30, marginBottom: 8, lineHeight: 1,
        filter: earned ? `drop-shadow(0 0 8px ${badge.color}99)` : "none",
      }}>
        {badge.icon}
      </div>

      {/* Label */}
      <div style={{
        color: earned ? badge.color : "var(--text-muted)",
        fontSize: 11, fontWeight: 800, marginBottom: 5, lineHeight: 1.3,
      }}>
        {badge.label}
      </div>

      {/* Requirement */}
      <p style={{
        color: "var(--text-faint)", fontSize: 9.5, margin: 0, lineHeight: 1.45,
      }}>
        {badge.req}
      </p>

      {/* Toggle button hint */}
      <div style={{
        marginTop: 8,
        color: earned ? "#34D399" : "var(--text-faint)",
        fontSize: 9, fontWeight: 700, letterSpacing: "0.05em",
      }}>
        {earned ? "EARNED — click to undo" : "click to mark earned"}
      </div>
    </div>
  );
};

// ── Sub-component: ProgressBar ────────────────────────────────
const ProgressBar = ({ value, max, color = "#34D399" }) => {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ color: "var(--text-muted)", fontSize: 11, fontWeight: 700 }}>
          {value} / {max} badges earned
        </span>
        <span style={{ color, fontSize: 14, fontWeight: 800 }}>{pct}%</span>
      </div>
      <div style={{
        background: "var(--bg-raised)", borderRadius: 8, height: 10, overflow: "hidden",
        border: "1px solid var(--border)",
      }}>
        <div style={{
          width: `${pct}%`, height: "100%",
          background: `linear-gradient(90deg, ${color}, ${color}bb)`,
          borderRadius: 8,
          transition: "width 0.4s ease",
          boxShadow: pct > 0 ? `0 0 8px ${color}66` : "none",
        }} />
      </div>
    </div>
  );
};

// ── Main PathwayView ──────────────────────────────────────────
export default function PathwayView() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [planTab, setPlanTab] = useState("day30");
  const [earnedBadges, setEarnedBadges] = useState([]);

  // ── Load badge progress from localStorage ─────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setEarnedBadges(parsed);
      }
    } catch (_) {
      // ignore parse errors
    }
  }, []);

  // ── Save badge progress to localStorage ───────────────────
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(earnedBadges));
    } catch (_) {
      // ignore write errors
    }
  }, [earnedBadges]);

  const toggleBadge = (id) => {
    setEarnedBadges((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  // ── Derived ───────────────────────────────────────────────
  const level = selectedLevel ? PATHWAY_LEVELS.find((l) => l.id === selectedLevel) : null;
  const pathway = selectedLevel ? LEARNING_PATHWAYS[selectedLevel] : null;
  const activePlan = pathway ? pathway[planTab] : null;
  const totalTopics = activePlan ? topicCount(activePlan) : 0;
  const totalMins = activePlan
    ? (activePlan.topics || []).reduce((acc, t) => acc + (t.time_min || 0), 0)
    : 0;

  return (
    <div className="view-enter" style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 36 }}>🗺️</span>
          <div>
            <h2 style={{ color: "var(--text-h)", margin: 0, fontSize: 26, fontWeight: 900 }}>
              Learning Pathways
            </h2>
            <p style={{ color: "var(--text-sec)", margin: "4px 0 0", fontSize: 15 }}>
              Personalized 90-day study plans by career level, milestone badges, and progress tracking
            </p>
          </div>
        </div>

        {/* Overall badge progress — always visible */}
        <div style={{
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: 10, padding: "14px 18px", marginTop: 16, maxWidth: 480,
        }}>
          <div style={{ color: "var(--text-h)", fontSize: 12, fontWeight: 800, marginBottom: 10 }}>
            OVERALL BADGE PROGRESS
          </div>
          <ProgressBar
            value={earnedBadges.length}
            max={PATHWAY_MILESTONES.length}
            color="#A78BFA"
          />
          {earnedBadges.length === PATHWAY_MILESTONES.length && (
            <p style={{ color: "#A78BFA", fontSize: 12, margin: "8px 0 0", fontWeight: 700 }}>
              All badges earned — CMC Master status achieved!
            </p>
          )}
        </div>
      </div>

      {/* ── LEVEL SELECTOR ─────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ color: "var(--text-muted)", fontSize: 11, fontWeight: 700, marginBottom: 12, letterSpacing: "0.06em" }}>
          SELECT YOUR CAREER LEVEL
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {PATHWAY_LEVELS.map((lv) => {
            const active = selectedLevel === lv.id;
            return (
              <button
                key={lv.id}
                onClick={() => {
                  setSelectedLevel(active ? null : lv.id);
                  setPlanTab("day30");
                }}
                style={{
                  background: active ? `${lv.color}22` : "var(--bg-card)",
                  border: `2px solid ${active ? lv.color : "var(--border)"}`,
                  borderRadius: 12, padding: "12px 18px",
                  cursor: "pointer", textAlign: "left",
                  minWidth: 160, transition: "all 0.18s ease",
                  boxShadow: active ? `0 4px 16px ${lv.color}33` : "none",
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 4 }}>{lv.icon}</div>
                <div style={{
                  color: active ? lv.color : "var(--text-h)",
                  fontSize: 12, fontWeight: 800, lineHeight: 1.3, marginBottom: 3,
                }}>
                  {lv.label}
                </div>
                <div style={{ color: "var(--text-faint)", fontSize: 10 }}>
                  {lv.years}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── PATHWAY CONTENT (shows when level selected) ─────── */}
      {level && pathway && (
        <div>
          {/* Level header */}
          <div style={{
            background: `${level.color}11`, border: `1px solid ${level.color}33`,
            borderRadius: 10, padding: "12px 16px", marginBottom: 24,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ fontSize: 24 }}>{level.icon}</span>
            <div>
              <div style={{ color: level.color, fontSize: 13, fontWeight: 800 }}>{level.label}</div>
              <p style={{ color: "var(--text-sec)", margin: "3px 0 0", fontSize: 13, lineHeight: 1.5 }}>
                {pathway.goal}
              </p>
            </div>
          </div>

          {/* Two-column layout: Plans on left, Badges on right */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
            gap: 24,
            alignItems: "start",
          }}>
            {/* ── LEFT: 30/60/90 Day Plans ─────────────────── */}
            <div>
              <div style={{ color: "var(--text-muted)", fontSize: 11, fontWeight: 700, marginBottom: 10, letterSpacing: "0.06em" }}>
                STUDY PLAN
              </div>

              {/* Plan tab selector */}
              <div style={{
                display: "flex", gap: 4, marginBottom: 16,
                background: "var(--bg-card)", borderRadius: 10, padding: "4px",
                border: "1px solid var(--border)", width: "fit-content",
              }}>
                {PLAN_TABS.map((pt) => {
                  const plan = pathway[pt.id];
                  const planColor = plan?.color || level.color;
                  const active = planTab === pt.id;
                  return (
                    <button
                      key={pt.id}
                      onClick={() => setPlanTab(pt.id)}
                      style={{
                        background: active ? planColor : "transparent",
                        color: active ? "#000" : "var(--text-sec)",
                        border: "none", borderRadius: 7,
                        padding: "7px 16px", cursor: "pointer",
                        fontSize: 12, fontWeight: 700,
                        transition: "all 0.16s ease",
                      }}
                    >
                      {pt.shortLabel}
                    </button>
                  );
                })}
              </div>

              {activePlan && (
                <div>
                  {/* Plan header */}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ color: activePlan.color || level.color, fontSize: 13, fontWeight: 800, marginBottom: 4 }}>
                      {activePlan.label}
                    </div>
                    <p style={{ color: "var(--text-sec)", margin: 0, fontSize: 13, lineHeight: 1.5 }}>
                      {activePlan.focus}
                    </p>
                    <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                      <span style={{ color: "var(--text-muted)", fontSize: 11 }}>
                        <strong style={{ color: activePlan.color || level.color }}>{totalTopics}</strong> topics
                      </span>
                      <span style={{ color: "var(--text-muted)", fontSize: 11 }}>
                        <strong style={{ color: activePlan.color || level.color }}>{totalMins}</strong> min total
                      </span>
                    </div>
                  </div>

                  {/* Topics */}
                  <div>
                    {(activePlan.topics || []).map((topic, i) => (
                      <TopicRow key={i} topic={topic} color={activePlan.color || level.color} />
                    ))}
                  </div>

                  {/* Milestone */}
                  {activePlan.milestone && (
                    <MilestoneBanner text={activePlan.milestone} color={activePlan.color || level.color} />
                  )}
                </div>
              )}
            </div>

            {/* ── RIGHT: Badges + Progress ─────────────────── */}
            <div>
              {/* Section label */}
              <div style={{ color: "var(--text-muted)", fontSize: 11, fontWeight: 700, marginBottom: 10, letterSpacing: "0.06em" }}>
                ACHIEVEMENT BADGES
              </div>

              {/* Per-level progress bar */}
              <div style={{
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: 10, padding: "12px 14px", marginBottom: 16,
              }}>
                <ProgressBar
                  value={earnedBadges.length}
                  max={PATHWAY_MILESTONES.length}
                  color={level.color}
                />
              </div>

              {/* Badges grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: 10,
              }}>
                {PATHWAY_MILESTONES.map((badge) => (
                  <BadgeCard
                    key={badge.id}
                    badge={badge}
                    earned={earnedBadges.includes(badge.id)}
                    onToggle={() => toggleBadge(badge.id)}
                  />
                ))}
              </div>

              {/* Hint */}
              <p style={{ color: "var(--text-faint)", fontSize: 10, marginTop: 10, lineHeight: 1.5 }}>
                Click any badge to manually mark it as earned. Progress is saved to your browser automatically.
              </p>

              {/* Earned list */}
              {earnedBadges.length > 0 && (
                <div style={{
                  background: "var(--bg-card)", border: "1px solid #34D39933",
                  borderRadius: 10, padding: "12px 14px", marginTop: 14,
                }}>
                  <div style={{ color: "#34D399", fontSize: 11, fontWeight: 800, marginBottom: 8 }}>
                    EARNED BADGES ({earnedBadges.length})
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {PATHWAY_MILESTONES.filter((b) => earnedBadges.includes(b.id)).map((b) => (
                      <span key={b.id} style={{
                        background: `${b.color}22`, color: b.color,
                        border: `1px solid ${b.color}44`,
                        padding: "3px 10px", borderRadius: 12,
                        fontSize: 10, fontWeight: 700,
                      }}>
                        {b.icon} {b.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── NO LEVEL SELECTED — full badge grid ─────────────── */}
      {!selectedLevel && (
        <div>
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: 10, padding: "18px 20px",
          }}>
            <div style={{ color: "var(--text-muted)", fontSize: 11, fontWeight: 700, marginBottom: 14, letterSpacing: "0.06em" }}>
              ALL ACHIEVEMENT BADGES
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: 12,
            }}>
              {PATHWAY_MILESTONES.map((badge) => (
                <BadgeCard
                  key={badge.id}
                  badge={badge}
                  earned={earnedBadges.includes(badge.id)}
                  onToggle={() => toggleBadge(badge.id)}
                />
              ))}
            </div>
            <p style={{ color: "var(--text-faint)", fontSize: 10, marginTop: 14, lineHeight: 1.5 }}>
              Select a career level above to view your personalized 90-day study plan.
              Badges can be toggled at any time — progress is saved locally.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
