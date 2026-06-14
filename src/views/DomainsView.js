import { useState } from "react";
import { FilterBtn, Badge, InfoBox, LC } from "../shared";
import { LiquidHeader } from "../lc";
import { DOMAINS } from "../cmc-data";

export default function DomainsView() {
  const [activeDomain, setActiveDomain] = useState(null);
  const [levelFilter, setLevelFilter] = useState("All");
  const [search, setSearch] = useState("");
  const domain = activeDomain ? DOMAINS.find(d => d.id === activeDomain) : null;
  const filteredQ = domain?.questions.filter(q =>
    (levelFilter==="All" || q.level===levelFilter) &&
    (!search || q.q.toLowerCase().includes(search.toLowerCase()))
  ) || [];

  return (
    <div style={{ maxWidth:1400, margin:"0 auto", padding:"28px 24px" }}>
      <LiquidHeader eyebrow="10 DOMAINS" icon="📚" title="Domain Question Bank" subtitle="100 questions across 10 CMC domains — filter by difficulty and search by keyword" />

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(165px,1fr))", gap:12, marginBottom:28 }}>
        {DOMAINS.map(d => (
          <button key={d.id} onClick={() => { setActiveDomain(d.id===activeDomain?null:d.id); setLevelFilter("All"); setSearch(""); }}
            className="card-hover method-card"
            style={{
              background: d.id===activeDomain ? `${d.accent}22` : "var(--bg-card)",
              border:`1.5px solid ${d.id===activeDomain ? d.accent : "var(--border)"}`,
              borderRadius:12, padding:14, cursor:"pointer", textAlign:"left",
              borderTop:`2px solid ${d.id===activeDomain ? d.accent : d.accent+"55"}`,
            }}>
            <div style={{ fontSize:24 }}>{d.icon}</div>
            <div style={{ color:"var(--text-h)", fontSize:12, fontWeight:800, marginTop:6, lineHeight:1.4 }}>{d.label}</div>
            <div style={{ color:d.accent, fontSize:11, marginTop:4, fontWeight:700 }}>{d.questions.length} questions</div>
            <div style={{ color:"var(--text-faint)", fontSize:10, marginTop:2 }}>{d.desc}</div>
          </button>
        ))}
      </div>

      {!domain && (
        <div style={{ background:"var(--bg-card)", borderRadius:14, border:"1px solid var(--border)" }}>
          <div className="empty-hint">
            <span className="eh-icon">📚</span>
            <p>Select a domain above to browse questions and filter by difficulty level.</p>
          </div>
        </div>
      )}
      {domain && (
        <div style={{ background:"var(--bg-card)", borderRadius:14, border:`1px solid ${domain.accent}44`, padding:26, animation:"scaleIn 0.22s ease" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
            <span style={{ fontSize:32, background:`${domain.accent}22`, borderRadius:12, padding:10 }}>{domain.icon}</span>
            <div>
              <h3 style={{ color:"var(--text-h)", margin:0, fontSize:20, fontWeight:900 }}>{domain.label}</h3>
              <p style={{ color:"var(--text-sec)", margin:"4px 0 0", fontSize:13 }}>{domain.desc}</p>
            </div>
          </div>

          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:18, alignItems:"center" }}>
            {["All","Foundational","Intermediate","Advanced","Expert"].map(l => (
              <FilterBtn key={l} label={l} active={levelFilter===l}
                color={l==="All" ? null : LC[l]} onClick={() => setLevelFilter(l)} />
            ))}
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search questions…"
              style={{ flex:1, minWidth:160, background:"var(--bg-surface)", border:"1px solid var(--border)",
                borderRadius:10, padding:"6px 12px", color:"var(--text-body)", fontSize:13 }} />
          </div>

          {filteredQ.map(q => (
            <details key={q.id} style={{ background:"var(--bg-surface)", borderRadius:10, padding:16, marginBottom:10,
              border:`1px solid ${LC[q.level]}22`, borderLeft:`3px solid ${LC[q.level]}` }}>
              <summary style={{ color:"var(--text-body)", display:"flex", gap:10, alignItems:"flex-start" }}>
                <Badge level={q.level} />
                <span style={{ fontWeight:600, fontSize:14, lineHeight:1.55 }}>{q.q}</span>
              </summary>
              <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid var(--border)" }}>
                <InfoBox color="#22D3EE" label="WHY IT MATTERS" text={q.why} />
                <InfoBox color="#34D399" label="HOW TO FIND THE ANSWER" text={q.how} />
                <p style={{ color:"var(--text-faint)", fontSize:11, margin:0, fontStyle:"italic" }}>📎 {q.ref}</p>
              </div>
            </details>
          ))}
          {filteredQ.length===0 && <p style={{ color:"var(--text-muted)", fontStyle:"italic" }}>No questions matching filters.</p>}
        </div>
      )}
    </div>
  );
}
