import "./careers.css";
import { useEffect, useMemo, useState } from "react";
import { PARTS, ROLES, COMPANIES, MARKS, AUDIENCES, chaptersFor, checklistFor } from "../../careers/content";

/* The career guide, #/careers: a section of its own in the site navigation. */

const ART = (id) => `${process.env.PUBLIC_URL || ""}/science-art/${id}.webp`;
const KEY = "cmc-career-checklist";
const loadDone = () => { try { return new Set(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { return new Set(); } };

function rich(text) {
  return String(text).split(/(\*\*[^*]+\*\*)/g).map((p, i) => (p.startsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong> : p));
}

const MARK_ICON = {
  myth: <path d="M5 12h14M12 5v14" transform="rotate(45 12 12)" />,
  action: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  warn: <><path d="M12 4l9 16H3z" /><path d="M12 10v4M12 17h.01" /></>,
  tip: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3z" /></>,
};
function Mark({ kind, text, done, toggle, id }) {
  const m = MARKS[kind];
  return (
    <div className={`cg-mark is-${kind}`}>
      <span className="cg-mark-ic" aria-hidden="true"><svg viewBox="0 0 24 24">{MARK_ICON[kind]}</svg></span>
      <div>
        <span className="cg-mark-label">{m.label}</span>
        <p>{rich(text)}</p>
        {kind === "action" && <button className={`cg-tick${done ? " is-done" : ""}`} aria-pressed={done} onClick={() => toggle(id)}>{done ? "Done" : "Mark as done"}</button>}
      </div>
    </div>
  );
}

function Roles() {
  const families = [...new Set(ROLES.map(r => r.family))];
  const [fam, setFam] = useState(families[0]);
  const list = ROLES.filter(r => r.family === fam);
  const [sel, setSel] = useState(list[0].id);
  const r = ROLES.find(x => x.id === sel) || list[0];
  const pick = (f) => { setFam(f); setSel(ROLES.find(x => x.family === f).id); };
  return (
    <div className="cg-roles">
      <div className="cg-fams" role="group" aria-label="Career area">
        {families.map(f => <button key={f} aria-pressed={f === fam} className={f === fam ? "is-on" : ""} onClick={() => pick(f)}>{f}</button>)}
      </div>
      <div className="cg-roles-body">
        <ul className="cg-role-list">
          {list.map(x => <li key={x.id}><button aria-pressed={x.id === r.id} className={x.id === r.id ? "is-on" : ""} onClick={() => setSel(x.id)}>{x.name}</button></li>)}
        </ul>
        <article className="cg-role" key={r.id} aria-live="polite">
          <h4>{r.name}</h4>
          <p className="cg-role-day">{r.day}</p>
          <dl>
            <div><dt>Entry titles</dt><dd>{r.entry.join(" · ")}</dd></div>
            <div><dt>Tools you will use</dt><dd>{r.tools.join(" · ")}</dd></div>
            <div><dt>You might enjoy it if</dt><dd>{r.fit}</dd></div>
          </dl>
          <ol className="cg-path" aria-label="Where it leads">
            <li><span>Entry</span>{r.entry[0]}</li>
            {r.path.map((p, i) => <li key={p}><span>Step {i + 1}</span>{p}</li>)}
          </ol>
          <small>Titles and levels vary by company and country.</small>
        </article>
      </div>
    </div>
  );
}

function Companies() {
  return (
    <div className="cg-tablewrap">
      <table className="cg-table cg-compare">
        <thead><tr>{COMPANIES.head.map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{COMPANIES.rows.map(r => <tr key={r[0]}>{r.map((c, i) => (i ? <td key={i}>{c}</td> : <th scope="row" key={i}>{c}</th>))}</tr>)}</tbody>
      </table>
      <p className="cg-small">{COMPANIES.note}</p>
    </div>
  );
}

function Block({ b, done, toggle, cid, idx }) {
  switch (b.t) {
    case "p": return <p className="cg-p">{rich(b.text)}</p>;
    case "list": return <ul className="cg-list">{b.items.map(x => <li key={x}>{rich(x)}</li>)}</ul>;
    case "steps": return <ol className="cg-steps">{b.items.map((x, i) => <li key={x}><span>{i + 1}</span><p>{rich(x)}</p></li>)}</ol>;
    case "table": return (
      <div className="cg-tablewrap">
        <table className="cg-table"><thead><tr>{b.head.map(h => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>{b.rows.map(r => <tr key={r[0]}>{r.map((c, i) => (i ? <td key={i}>{c}</td> : <th scope="row" key={i}>{c}</th>))}</tr>)}</tbody></table>
      </div>
    );
    case "dodont": return (
      <div className="cg-dd">
        <div className="is-do"><span>Do</span><ul>{b.do.map(x => <li key={x}>{x}</li>)}</ul></div>
        <div className="is-dont"><span>Don't</span><ul>{b.dont.map(x => <li key={x}>{x}</li>)}</ul></div>
      </div>
    );
    case "mark": { const id = `${cid}-${idx}`; return <Mark kind={b.kind} text={b.text} id={id} done={done.has(id)} toggle={toggle} />; }
    case "widget": return b.id === "roles" ? <Roles /> : b.id === "companies" ? <Companies /> : null;
    default: return null;
  }
}

export default function Careers({ navigate, focus }) {
  const fromFocus = AUDIENCES.some(a => a.id === focus) ? focus : "student";
  const [aud, setAud] = useState(fromFocus);
  useEffect(() => setAud(fromFocus), [fromFocus]);   // back/forward and pasted links
  // switching track updates the link without leaving the page or jumping to the top
  const chooseTrack = (id) => {
    if (id === aud) return;
    setAud(id);
    try { window.history.replaceState(null, "", `#/careers/${id}`); } catch { /* ignore */ }
  };
  const CHAPTERS = useMemo(() => chaptersFor(aud), [aud]);
  const CHECKLIST = useMemo(() => checklistFor(aud), [aud]);
  const [done, setDone] = useState(loadDone);
  const [active, setActive] = useState(CHAPTERS[0].id);
  const toggle = (id) => { const n = new Set(done); n.has(id) ? n.delete(id) : n.add(id); setDone(n); try { localStorage.setItem(KEY, JSON.stringify([...n])); } catch { /* private mode */ } };
  // action ids are chapter + index among that chapter's action marks
  const actionIds = useMemo(() => new Set(CHECKLIST.map(c => c.id)), [CHECKLIST]);
  const doneCount = [...done].filter(id => actionIds.has(id)).length;

  // highlight the question whose heading most recently passed the top third of the screen
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const line = window.innerHeight * 0.33;
        let cur = CHAPTERS[0].id;
        for (const c of CHAPTERS) { const el = document.getElementById(`q-${c.id}`); if (el && el.getBoundingClientRect().top <= line) cur = c.id; }
        setActive(cur);
      });
    };
    window.addEventListener("scroll", on, { passive: true }); on();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", on); };
  }, [CHAPTERS]);
  const jump = (id) => document.getElementById(`q-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  let n = 0;

  return (
    <div className="cg">

      <section className="cg-hero">
        <div>
          <h1>Build a career<br />in biopharma.</h1>
          <p>Short, direct answers to the questions people ask when they start or switch: bench science, manufacturing and QC, CDMOs, automation and leadership. Read it in order, or jump to your question.</p>
          <div className="cg-legend">
            {Object.entries(MARKS).map(([k, m]) => (
              <span key={k} className={`is-${k}`}><i aria-hidden="true"><svg viewBox="0 0 24 24">{MARK_ICON[k]}</svg></i>{m.label}</span>
            ))}
          </div>
        </div>
        <img src={ART("career-hero")} alt="" width="1200" height="800" />
      </section>

      <section className="cg-aud" aria-label="Choose your stage">
        <span className="cg-aud-ask">Where are you now?</span>
        <div className="cg-aud-row">
          {AUDIENCES.map((a, i) => (
            <button key={a.id} className={a.id === aud ? "is-on" : ""} aria-pressed={a.id === aud} onClick={() => chooseTrack(a.id)}>
              <span className="cg-aud-n sv-mono">0{i + 1}</span>
              <strong>{a.name}</strong>
              <em>{a.years}</em>
              <span className="cg-aud-line">{a.line}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="cg-body" key={aud}>
        <nav className="cg-toc" aria-label="Questions">
          <div className="cg-progress">
            <span>Your actions</span>
            <strong>{doneCount} of {CHECKLIST.length}</strong>
            <i style={{ "--p": `${(doneCount / CHECKLIST.length) * 100}%` }} />
          </div>
          {PARTS.filter(p => CHAPTERS.some(c => c.part === p.id)).map(p => (
            <div key={p.id} className="cg-toc-part">
              <span>{p.title}</span>
              <ol>
                {CHAPTERS.filter(c => c.part === p.id).map(c => (
                  <li key={c.id}><button className={active === c.id ? "is-on" : ""} aria-current={active === c.id ? "true" : undefined} onClick={() => jump(c.id)}>{c.short}</button></li>
                ))}
              </ol>
            </div>
          ))}
        </nav>

        <main className="cg-main">
          {PARTS.filter(p => CHAPTERS.some(c => c.part === p.id)).map((p, pi) => (
            <section key={p.id} className="cg-part" aria-labelledby={`part-${p.id}`}>
              <header className="cg-part-head">
                <div>
                  <span className="cg-part-n">Part {pi + 1}</span>
                  <h2 id={`part-${p.id}`}>{p.title}</h2>
                  <p>{p.line}</p>
                </div>
                <img src={ART(p.art)} alt="" loading="lazy" width="1200" height="800" />
              </header>
              {CHAPTERS.filter(c => c.part === p.id).map(c => {
                n += 1; let a = 0;
                return (
                  <article key={c.id} id={`q-${c.id}`} className="cg-q">
                    <h3><span>{String(n).padStart(2, "0")}</span>{c.q}</h3>
                    {c.blocks.map((b, i) => <Block key={i} b={b} done={done} toggle={toggle} cid={c.id} idx={b.t === "mark" && b.kind === "action" ? a++ : `x${i}`} />)}
                  </article>
                );
              })}
            </section>
          ))}
          <footer className="cg-foot">
            <p>Career paths, titles and visa rules vary by company and country and change over time. Use this guide to orient yourself, then check the specifics for your target role and location.</p>
            <button className="hm-link" onClick={() => navigate("science", null)}>Learn the science on Biologics CMC</button>
          </footer>
        </main>
      </div>
    </div>
  );
}
