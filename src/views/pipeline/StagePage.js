import { useEffect, useState } from "react";
import { PIPELINE } from "../../cmc-data";
import { STAGE_OVERVIEWS } from "../../pipeline-overview-data";
import { PLANT, phaseOf, TO_JOURNEY } from "../../pipeline/plant";
import { pipeArt } from "../../science/art";
import { STAGE as JSTAGE } from "../../science/journey";
import { PAPERS, STAGE_PAPERS, pubmedUrl, matchPaper } from "../../pipeline/papers";
import { splitRefs } from "../../pipeline/refs";

/* A station's deep dive: what actually happens, step by step; who and what;
   then every knowledge card and interview question for the stage. */

const LEVEL = { Foundational: "var(--chain-h)", Intermediate: "var(--ok)", Advanced: "var(--bridge)", Expert: "var(--glycan)" };

export default function StagePage({ sid, card, go, navigate }) {
  const i = PIPELINE.findIndex(s => s.id === sid);
  const s = PIPELINE[i], ov = STAGE_OVERVIEWS[sid], plant = PLANT[sid], ph = phaseOf(+s.stage);
  const prev = PIPELINE[i - 1], next = PIPELINE[i + 1];
  const art = pipeArt(sid);
  const [open, setOpen] = useState(() => new Set(card ? [card] : []));
  const toggle = (id) => { const n = new Set(open); n.has(id) ? n.delete(id) : n.add(id); setOpen(n); };

  // deep link to a card: open it and bring it into view
  useEffect(() => {
    if (!card) return;
    setOpen(o => new Set([...o, card]));
    requestAnimationFrame(() => document.getElementById(`card-${card}`)?.scrollIntoView({ block: "start" }));
  }, [card]);

  const journey = JSTAGE[TO_JOURNEY[sid]];
  const papers = (STAGE_PAPERS[sid] || []).map(([pmid, why]) => ({ pmid, why, ...PAPERS[pmid],
    citedBy: s.topics.filter(t => splitRefs(t.ref).some(r => r.paper && matchPaper(r.text) === pmid)) }));
  const openCard = (id) => { setOpen(o => new Set([...o, id])); requestAnimationFrame(() => document.getElementById(`card-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })); };

  return (
    <article className="pl2-page" style={{ "--ph": ph.color }}>
      <nav className="pl2-crumbs">
        <button className="hm-link" onClick={() => go(`line/${sid}`)}>Production line</button>
        <span aria-hidden="true">/</span>
        <span>{ph.name}</span>
      </nav>

      <header className="pl2-page-hero">
        <div className="pl2-page-title">
          <span className="pl2-st-n sv-mono">{s.stage}</span>
          <h1>{s.label}</h1>
          <p className="pl2-page-sub">{ov.what.split("\n\n")[0]}</p>
          <dl className="pl2-page-facts">
            <div><dt>In hand</dt><dd><strong>{plant.inHand.big}</strong> {plant.inHand.unit}</dd></div>
            <div><dt>Typical duration</dt><dd>{ov.duration}</dd></div>
            {papers.length > 0 && <div><dt>Research papers</dt><dd><a className="hm-link" href="#papers" onClick={(e) => { e.preventDefault(); document.getElementById("papers")?.scrollIntoView({ behavior: "smooth" }); }}>{papers.length} to read</a></dd></div>}
          </dl>
        </div>
        {art && <img className="pl2-page-art" src={art} alt="" width="1536" height="1024" />}
      </header>

      <section className="pl2-handoff">
        <div><span>Arrives</span><p>{ov.before}</p></div>
        <div><span>Leaves</span><p>{ov.after}</p></div>
      </section>

      {papers.length > 0 && (
        <section className="pl2-sec" id="papers" aria-labelledby="papers-h">
          <h2 id="papers-h" className="hm-h2">Research papers.</h2>
          <p className="pl2-small">The papers behind this station, checked against PubMed. Titles open the PubMed record.</p>
          <ol className="pl2-papers">
            {papers.map(p => (
              <li key={p.pmid}>
                <span className="pl2-paper-year sv-mono">{p.year}</span>
                <div>
                  <a className="pl2-paper-title" href={pubmedUrl(p.pmid)} target="_blank" rel="noopener noreferrer">{p.title}</a>
                  <span className="pl2-paper-meta">{p.authors} <em>{p.journal}</em> {p.year};{p.cite}</span>
                  <p className="pl2-paper-why">{p.why}</p>
                  {p.citedBy.length > 0 && (
                    <span className="pl2-paper-cited">Discussed in {p.citedBy.map((t, k) => <button key={t.id} className="hm-link" onClick={() => openCard(t.id)}>{t.title}{k < p.citedBy.length - 1 ? "," : ""}</button>)}</span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="pl2-sec">
        <h2 className="hm-h2">What actually happens.</h2>
        {ov.what.split("\n\n").slice(1).map((para, k) => <p key={k} className="an-prose pl2-p">{para}</p>)}
        <ol className="pl2-steps">
          {ov.steps.map(st => (
            <li key={st.num}>
              <span className="sv-mono">{String(st.num).padStart(2, "0")}</span>
              <div><strong>{st.title}</strong><p>{st.detail}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="pl2-sec pl2-crew">
        <div>
          <h2 className="hm-h2">Who.</h2>
          <ul className="pl2-people">{plant.people.map(p => <li key={p.role}><strong>{p.role}</strong><p>{p.does}</p></li>)}</ul>
          <p className="pl2-small">Teams usually involved: {ov.team}.</p>
        </div>
        <div>
          <h2 className="hm-h2">With what.</h2>
          <ul className="pl2-kit">{plant.equipment.map(e => <li key={e}>{e}</li>)}</ul>
          <h3 className="pl2-h3">What comes out</h3>
          <ul className="pl2-kit">{ov.deliverables.map(e => <li key={e}>{e}</li>)}</ul>
        </div>
      </section>

      <section className="pl2-sec">
        <div className="pl2-sec-head">
          <h2 className="hm-h2">Deep dives.</h2>
          <button className="hm-link" onClick={() => setOpen(open.size === s.topics.length ? new Set() : new Set(s.topics.map(t => t.id)))}>
            {open.size === s.topics.length ? "Close all" : "Open all"}
          </button>
        </div>
        <ol className="pl2-cards">
          {s.topics.map((t, k) => {
            const isOpen = open.has(t.id);
            return (
              <li key={t.id} id={`card-${t.id}`} className={isOpen ? "is-open" : ""}>
                <button className="pl2-card-h" aria-expanded={isOpen} onClick={() => toggle(t.id)}>
                  <span className="sv-mono">{String(k + 1).padStart(2, "0")}</span>
                  <strong>{t.title}</strong>
                  <i aria-hidden="true" />
                </button>
                {isOpen && (
                  <div className="pl2-card-b">
                    <p className="pl2-card-body">{t.body}</p>
                    <div className="pl2-card-grid">
                      <div><span>Why it matters</span><p>{t.why}</p></div>
                      <div><span>How to learn it</span><p>{t.how}</p></div>
                    </div>
                    <Sources refText={t.ref} />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      {s.questions.length > 0 && (
        <section className="pl2-sec">
          <h2 className="hm-h2">Interview questions.</h2>
          <ol className="pl2-qs">
            {s.questions.map(q => (
              <li key={q.id} style={{ "--lv": LEVEL[q.level] || "var(--text-muted)" }}>
                <details>
                  <summary><span className="pl2-lv">{q.level}</span>{q.q}</summary>
                  <div className="pl2-card-grid">
                    <div><span>What the interviewer is testing</span><p>{q.why}</p></div>
                    <div><span>How to answer</span><p>{q.how}</p></div>
                  </div>
                  <Sources refText={q.ref} />
                </details>
              </li>
            ))}
          </ol>
        </section>
      )}

      {journey && (
        <aside className="pl2-why">
          <span>Why this stage exists, and what it proves</span>
          <button className="hm-secondary" onClick={() => navigate("science", journey.id)}>Science journey: {journey.title}</button>
        </aside>
      )}

      <nav className="ch-pager" aria-label="Stations">
        {prev ? <button onClick={() => go(prev.id)}><span>Previous station</span><strong><em className="sv-mono">{prev.stage}</em>{prev.label}</strong></button>
          : <button onClick={() => go(null)}><span>Back to</span><strong>The production line</strong></button>}
        {next ? <button className="is-next" onClick={() => go(next.id)}><span>Next station</span><strong><em className="sv-mono">{next.stage}</em>{next.label}</strong></button> : <span />}
      </nav>
    </article>
  );
}

function Sources({ refText }) {
  const refs = splitRefs(refText);
  if (!refs.length) return null;
  const papers = refs.filter(r => r.paper), other = refs.filter(r => !r.paper);
  return (
    <div className="pl2-sources">
      {papers.map(r => {
        const pmid = matchPaper(r.text), p = pmid && PAPERS[pmid];
        return p
          ? <a key={r.text} className="pl2-src-paper" href={pubmedUrl(pmid)} target="_blank" rel="noopener noreferrer"><span>Paper</span>{p.title} <em>{p.journal} {p.year}</em></a>
          : <span key={r.text} className="pl2-src-paper is-plain"><span>Paper</span>{r.text}</span>;
      })}
      {other.length > 0 && <p className="pl2-card-ref">{other.map(r => r.text).join(" · ")}</p>}
    </div>
  );
}
