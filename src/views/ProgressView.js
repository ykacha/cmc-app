import { useState, useEffect, useMemo } from "react";
import { PATHWAY_MILESTONES } from "../pathway-data";

function StatCard({ icon, label, value, color }) {
  return (
    <div style={{ background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border)",
      borderTop: `3px solid ${color}`, padding: "20px 16px", textAlign: "center" }}>
      <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 32, fontWeight: 900, color, lineHeight: 1 }}>{value}</div>
      <div style={{ color: "var(--text-sec)", fontSize: 12, marginTop: 6 }}>{label}</div>
    </div>
  );
}

export default function ProgressView() {
  const [quizData, setQuizData] = useState({});
  const [visitedViews, setVisitedViews] = useState([]);
  const [pathwayProgress, setPathwayProgress] = useState([]);
  const [notes, setNotes] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const q = JSON.parse(localStorage.getItem("cmc-quiz-progress") || "{}");
      setQuizData(q);
      const v = JSON.parse(localStorage.getItem("cmc-visited-views") || "[]");
      setVisitedViews(Array.isArray(v) ? v : []);
      const p = JSON.parse(localStorage.getItem("cmc-pathway-progress") || "[]");
      setPathwayProgress(Array.isArray(p) ? p : []);
      const n = JSON.parse(localStorage.getItem("cmc-notes") || "[]");
      setNotes(Array.isArray(n) ? n : []);
    } catch (e) { /* ignore */ }
  }, []);

  const stats = useMemo(() => {
    const keys = Object.keys(quizData);
    const allHistory = keys.flatMap(k => quizData[k]?.history || []);
    const correct = allHistory.filter(h => h.quality >= 3).length;
    const correctRate = allHistory.length ? Math.round((correct / allHistory.length) * 100) : 0;
    return { attempted: keys.length, correctRate, allHistory };
  }, [quizData]);

  const today = new Date().toISOString().slice(0, 10);
  const dueToday = useMemo(() => {
    return Object.entries(quizData).filter(([, v]) => v?.nextDue && v.nextDue <= today);
  }, [quizData, today]);

  const dueWeek = useMemo(() => {
    const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
    return Object.entries(quizData).filter(([, v]) => v?.nextDue && v.nextDue <= nextWeek);
  }, [quizData]);

  // Activity last 7 days
  const activity = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      const count = stats.allHistory.filter(h => h.date && h.date.startsWith(d)).length;
      days.push({ date: d, count, label: new Date(d + "T12:00:00").toLocaleDateString("en", { weekday: "short" }) });
    }
    return days;
  }, [stats.allHistory]);

  const copyReport = () => {
    const text = `CMC Progress Report — ${today}\nQuestions Attempted: ${stats.attempted}\nCorrect Rate: ${stats.correctRate}%\nViews Explored: ${visitedViews.length}\nNotes Created: ${notes.length}\nBadges Earned: ${pathwayProgress.length}/${PATHWAY_MILESTONES.length}`;
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const isEmpty = stats.attempted === 0 && visitedViews.length === 0;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px" }}>
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ color: "var(--text-h)", margin: 0, fontSize: 26, fontWeight: 900 }}>📊 My Progress</h2>
          <p style={{ color: "var(--text-sec)", margin: "6px 0 0", fontSize: 14 }}>Your CMC learning journey — quiz performance, activity, and milestones</p>
        </div>
        <button onClick={copyReport}
          style={{ background: copied ? "#34D399" : "var(--accent)", color: "#fff", border: "none",
            borderRadius: 8, padding: "9px 18px", cursor: "pointer", fontWeight: 700, fontSize: 13, transition: "background 0.2s" }}>
          {copied ? "✓ Copied!" : "📋 Copy Report"}
        </button>
      </div>

      {isEmpty && (
        <div style={{ background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border)", padding: 40, textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌱</div>
          <h3 style={{ color: "var(--text-h)", margin: "0 0 8px" }}>No progress data yet</h3>
          <p style={{ color: "var(--text-sec)", margin: 0, fontSize: 14 }}>Take some quizzes in Exam Mode to start tracking your progress. Use Spaced Rep Mode for SM-2 adaptive learning.</p>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 28 }}>
        <StatCard icon="❓" label="Questions Attempted" value={stats.attempted} color="#38BDF8" />
        <StatCard icon="✅" label="Correct Rate" value={`${stats.correctRate}%`} color="#34D399" />
        <StatCard icon="👁️" label="Views Explored" value={visitedViews.length} color="#A78BFA" />
        <StatCard icon="📝" label="Notes Created" value={notes.length} color="#FB923C" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        {/* SM-2 Queue */}
        <div style={{ background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border)", padding: 20 }}>
          <h3 style={{ margin: "0 0 16px", color: "var(--text-h)", fontWeight: 800, fontSize: 15 }}>🧠 Spaced Repetition Queue</h3>
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <div style={{ background: "#F4722822", border: "1px solid #F4722844", borderRadius: 8, padding: "10px 14px", flex: 1, textAlign: "center" }}>
              <div style={{ color: "#F47228", fontWeight: 900, fontSize: 22 }}>{dueToday.length}</div>
              <div style={{ color: "var(--text-muted)", fontSize: 11 }}>Due Today</div>
            </div>
            <div style={{ background: "#60A5FA15", border: "1px solid #60A5FA44", borderRadius: 8, padding: "10px 14px", flex: 1, textAlign: "center" }}>
              <div style={{ color: "#60A5FA", fontWeight: 900, fontSize: 22 }}>{dueWeek.length}</div>
              <div style={{ color: "var(--text-muted)", fontSize: 11 }}>Due This Week</div>
            </div>
          </div>
          {dueToday.length > 0 ? (
            <div>
              <div style={{ color: "var(--text-faint)", fontSize: 11, fontWeight: 700, marginBottom: 8 }}>NEXT DUE</div>
              {dueToday.slice(0, 5).map(([id, v]) => (
                <div key={id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0",
                  borderBottom: "1px solid var(--border)", fontSize: 12 }}>
                  <span style={{ color: "var(--text-body)", fontFamily: "monospace" }}>{id}</span>
                  <span style={{ color: "var(--text-muted)" }}>EF {v.ef?.toFixed(2) || "2.50"} · {v.interval || 1}d</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: "var(--text-muted)", fontSize: 13, textAlign: "center", padding: 12 }}>
              {stats.attempted > 0 ? "🎉 All caught up!" : "Answer questions in Exam → Spaced Rep Mode to populate queue"}
            </div>
          )}
        </div>

        {/* Activity heatmap */}
        <div style={{ background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border)", padding: 20 }}>
          <h3 style={{ margin: "0 0 16px", color: "var(--text-h)", fontWeight: 800, fontSize: 15 }}>📅 Last 7 Days Activity</h3>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 100 }}>
            {activity.map(d => {
              const maxH = 80;
              const maxCount = Math.max(...activity.map(a => a.count), 1);
              const h = d.count > 0 ? Math.max(16, (d.count / maxCount) * maxH) : 8;
              const color = d.count === 0 ? "var(--border)" : d.count >= 5 ? "#34D399" : d.count >= 2 ? "#60A5FA" : "#A78BFA";
              return (
                <div key={d.date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ color: "var(--text-muted)", fontSize: 10 }}>{d.count || ""}</div>
                  <div style={{ width: "100%", height: h, background: color, borderRadius: 4, transition: "all 0.3s" }} />
                  <div style={{ color: "var(--text-faint)", fontSize: 10 }}>{d.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Views visited */}
      {visitedViews.length > 0 && (
        <div style={{ background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border)", padding: 20, marginBottom: 28 }}>
          <h3 style={{ margin: "0 0 14px", color: "var(--text-h)", fontWeight: 800, fontSize: 15 }}>👁️ Views Explored</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {visitedViews.map(v => (
              <span key={v} style={{ background: "#A78BFA22", color: "#A78BFA", borderRadius: 20,
                padding: "4px 12px", fontSize: 12, fontWeight: 700, border: "1px solid #A78BFA44" }}>{v}</span>
            ))}
          </div>
        </div>
      )}

      {/* Badges */}
      <div style={{ background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border)", padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0, color: "var(--text-h)", fontWeight: 800, fontSize: 15 }}>🏆 Milestone Badges</h3>
          <span style={{ color: "var(--text-sec)", fontSize: 13 }}>{pathwayProgress.length} / {PATHWAY_MILESTONES.length} earned</span>
        </div>
        <div style={{ background: "var(--bg-surface)", borderRadius: 8, height: 6, marginBottom: 20 }}>
          <div style={{ background: "var(--accent)", borderRadius: 8, height: "100%",
            width: `${(pathwayProgress.length / PATHWAY_MILESTONES.length) * 100}%`, transition: "width 0.5s" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 10 }}>
          {PATHWAY_MILESTONES.map(m => {
            const earned = pathwayProgress.includes(m.id);
            return (
              <div key={m.id} style={{ background: earned ? `${m.color}18` : "var(--bg-surface)",
                border: `1px solid ${earned ? m.color + "55" : "var(--border)"}`,
                borderRadius: 10, padding: "12px 10px", textAlign: "center",
                opacity: earned ? 1 : 0.45, transition: "all 0.2s" }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{m.icon}</div>
                <div style={{ color: earned ? m.color : "var(--text-muted)", fontWeight: 700, fontSize: 11, lineHeight: 1.3 }}>{m.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
