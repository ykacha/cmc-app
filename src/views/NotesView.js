import { useState } from "react";
import { SectionHeader } from "../shared";

export default function NotesView({ adminMode }) {
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cmc-notes") || "[]"); } catch { return []; }
  });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [pinned, setPinned] = useState(false);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  const NOTE_CATS = ["General","Analytical","Regulatory","Formulation","Process","QbD","Career","Study Tips"];
  const catColors = { General:"#A78BFA", Analytical:"#22D3EE", Regulatory:"#F472B6", Formulation:"#34D399",
    Process:"#F59E0B", QbD:"#C084FC", Career:"#60A5FA", "Study Tips":"#FB923C" };

  const save = (ns) => { setNotes(ns); localStorage.setItem("cmc-notes", JSON.stringify(ns)); };

  const addNote = () => {
    if (!text.trim()) return;
    const note = { id:Date.now(), title: title||"Untitled Note", text, category, pinned,
      created: new Date().toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" }) };
    if (editId) {
      save(notes.map(n => n.id===editId ? { ...n, ...note, id:editId } : n));
    } else {
      save([note, ...notes]);
    }
    setTitle(""); setText(""); setCategory("General"); setPinned(false); setShowForm(false); setEditId(null);
  };

  const deleteNote = (id) => save(notes.filter(n => n.id!==id));
  const togglePin = (id) => save(notes.map(n => n.id===id ? { ...n, pinned:!n.pinned } : n));
  const editNote = (note) => { setEditId(note.id); setTitle(note.title); setText(note.text); setCategory(note.category); setPinned(note.pinned||false); setShowForm(true); };

  const cats = ["All", ...NOTE_CATS];
  const filtered = notes
    .filter(n => (catFilter==="All" || n.category===catFilter) && (!search || n.title.toLowerCase().includes(search.toLowerCase()) || n.text.toLowerCase().includes(search.toLowerCase())))
    .sort((a,b) => (b.pinned?1:0)-(a.pinned?1:0));

  return (
    <div style={{ maxWidth:1400, margin:"0 auto", padding:"28px 24px" }}>
      <SectionHeader icon="📝" title="My CMC Notes" subtitle="Capture study notes, key concepts, and personal annotations — all saved locally in your browser"/>

      <div style={{ display:"flex", gap:12, marginBottom:16, flexWrap:"wrap", alignItems:"center" }}>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setTitle(""); setText(""); setCategory("General"); setPinned(false); }}
          style={{ background:"var(--accent)", color:"#fff", border:"none", borderRadius:10, padding:"9px 20px",
            cursor:"pointer", fontWeight:700, fontSize:13, transition:"opacity 0.18s" }}
          onMouseEnter={e => e.currentTarget.style.opacity="0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity="1"}>
          {showForm ? "✕ Cancel" : "+ Add Note"}
        </button>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notes…"
          style={{ flex:1, minWidth:200, background:"var(--bg-card)", border:"1px solid var(--border)",
            borderRadius:10, padding:"8px 14px", color:"var(--text-body)", fontSize:13 }}/>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
          style={{ background:"var(--select-bg)", border:"1px solid var(--border)", borderRadius:10,
            padding:"8px 12px", color:"var(--text-body)", fontSize:13 }}>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {showForm && (
        <div style={{ background:"var(--bg-card)", border:"1px solid var(--accent)44", borderRadius:14, padding:22, marginBottom:20, animation:"slideDown 0.22s ease" }}>
          <h4 style={{ color:"var(--text-h)", margin:"0 0 14px", fontSize:14, fontWeight:800 }}>{editId ? "✏️ Edit Note" : "📝 New Note"}</h4>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Note title (optional)…"
            style={{ width:"100%", background:"var(--bg-surface)", border:"1px solid var(--border)", borderRadius:8,
              padding:"8px 12px", color:"var(--text-body)", fontSize:14, marginBottom:10, boxSizing:"border-box" }}/>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Your note content…"
            rows={5} style={{ width:"100%", background:"var(--bg-surface)", border:"1px solid var(--border)", borderRadius:8,
              padding:"10px 12px", color:"var(--text-body)", fontSize:13, lineHeight:1.65, resize:"vertical", marginBottom:10, boxSizing:"border-box" }}/>
          <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
            <select value={category} onChange={e => setCategory(e.target.value)}
              style={{ background:"var(--select-bg)", border:"1px solid var(--border)", borderRadius:8,
                padding:"7px 12px", color:"var(--text-body)", fontSize:12 }}>
              {NOTE_CATS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <label style={{ display:"flex", alignItems:"center", gap:6, cursor:"pointer", color:"var(--text-sec)", fontSize:12 }}>
              <input type="checkbox" checked={pinned} onChange={e => setPinned(e.target.checked)} style={{ cursor:"pointer" }}/> 📌 Pin to top
            </label>
            <button onClick={addNote}
              style={{ background:"var(--accent)", color:"#fff", border:"none", borderRadius:8, padding:"8px 20px",
                cursor:"pointer", fontWeight:700, fontSize:13, marginLeft:"auto" }}>
              {editId ? "Save Changes" : "Save Note"}
            </button>
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div style={{ textAlign:"center", padding:"60px 20px", color:"var(--text-muted)" }}>
          <div style={{ fontSize:48, marginBottom:12 }}>📓</div>
          <p style={{ fontSize:15, marginBottom:6 }}>No notes yet.</p>
          <p style={{ fontSize:13 }}>Click "Add Note" above to capture your first CMC note.</p>
        </div>
      )}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:14 }}>
        {filtered.map(n => {
          const cc = catColors[n.category] || "#A78BFA";
          return (
            <div key={n.id} className="card-hover"
              style={{ background:"var(--bg-card)", borderRadius:14, border:`1px solid ${cc}22`,
                borderTop:`3px solid ${cc}`, padding:18, display:"flex", flexDirection:"column", gap:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
                <div style={{ flex:1, minWidth:0 }}>
                  {n.pinned && <span style={{ fontSize:11, marginRight:4 }}>📌</span>}
                  <span style={{ color:"var(--text-h)", fontWeight:800, fontSize:14 }}>{n.title}</span>
                </div>
                <span style={{ background:`${cc}22`, color:cc, borderRadius:12, padding:"2px 8px", fontSize:9, fontWeight:800, whiteSpace:"nowrap", flexShrink:0 }}>{n.category}</span>
              </div>
              <p style={{ color:"var(--text-body)", fontSize:13, lineHeight:1.65, margin:0,
                display:"-webkit-box", WebkitLineClamp:5, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{n.text}</p>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"auto", borderTop:"1px solid var(--border)", paddingTop:10 }}>
                <span style={{ color:"var(--text-faint)", fontSize:10 }}>{n.created}</span>
                <div style={{ display:"flex", gap:6 }}>
                  <button onClick={() => togglePin(n.id)} title={n.pinned?"Unpin":"Pin"}
                    style={{ background:"none", border:"none", cursor:"pointer", fontSize:13, opacity:n.pinned?1:0.4 }}>📌</button>
                  <button onClick={() => editNote(n)}
                    style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text-muted)", fontSize:12 }}>✏️</button>
                  <button onClick={() => deleteNote(n.id)}
                    style={{ background:"none", border:"none", cursor:"pointer", color:"#F472B6", fontSize:12 }}>🗑</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
