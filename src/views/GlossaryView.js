import { useState } from "react";
import { FilterBtn } from "../shared";
import { LiquidHeader } from "../lc";
import { GLOSSARY } from "../cmc-data";

export default function GlossaryView() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  const cats = ["All", ...new Set(GLOSSARY.map(g => g.cat))];
  const catColors = {
    Regulatory:"#F59E0B", QbD:"#34D399", "Cell Science":"#22D3EE",
    Manufacturing:"#A78BFA", Analytical:"#F472B6", Quality:"#FB923C",
    Validation:"#38BDF8", "Novel Modalities":"#C084FC"
  };

  const filtered = GLOSSARY.filter(g =>
    (catFilter==="All" || g.cat===catFilter) &&
    (!search || g.term.toLowerCase().includes(search.toLowerCase()) ||
      g.def.toLowerCase().includes(search.toLowerCase()))
  ).sort((a,b) => a.term.localeCompare(b.term));

  return (
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"28px 24px" }}>
      <LiquidHeader eyebrow="A–Z REFERENCE" icon="📖" title="CMC Glossary" subtitle={`${GLOSSARY.length} essential terms and definitions — search or filter by category`} />

      <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap", alignItems:"center" }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search terms or definitions…"
          style={{ flex:1, minWidth:220, background:"var(--bg-card)", border:"1px solid var(--border)",
            borderRadius:10, padding:"10px 14px", color:"var(--text-body)", fontSize:14 }} />
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
          style={{ background:"var(--select-bg)", border:"1px solid var(--border)", borderRadius:10, padding:"10px 14px",
            color:"var(--text-body)", fontSize:13 }}>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:22 }}>
        {cats.map(c => (
          <FilterBtn key={c} label={c} active={catFilter===c}
            color={c==="All" ? null : catColors[c]}
            onClick={() => setCatFilter(c)} />
        ))}
      </div>

      <div style={{ display:"grid", gap:10 }}>
        {filtered.map((g, i) => {
          const cc = catColors[g.cat] || "#475569";
          return (
            <div key={g.term} className="card-hover"
              style={{ background:"var(--bg-card)", borderRadius:12, padding:"14px 18px",
                border:`1px solid ${cc}22`, borderLeft:`3px solid ${cc}`,
                animation:`fadeUp 0.3s ease ${Math.min(i*0.02,0.25)}s both` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <span style={{ color:"var(--text-h)", fontWeight:900, fontSize:16 }}>{g.term}</span>
                <span style={{ background:`${cc}22`, color:cc, border:`1px solid ${cc}44`,
                  padding:"2px 10px", borderRadius:12, fontSize:10, fontWeight:700 }}>{g.cat}</span>
              </div>
              <p style={{ color:"var(--text-body)", margin:0, fontSize:14, lineHeight:1.72 }}>{g.def}</p>
            </div>
          );
        })}
        {filtered.length===0 && <p style={{ color:"var(--text-muted)", fontStyle:"italic" }}>No terms matching search.</p>}
      </div>
    </div>
  );
}
