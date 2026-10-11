import { useEffect, useState } from "react";
import { PIPELINE } from "../../cmc-data";
import { STAGE_OVERVIEWS } from "../../pipeline-overview-data";
import { PLANT, phaseOf, TO_JOURNEY } from "../../pipeline/plant";
import { pipeArt } from "../../science/art";
import { STAGE as JSTAGE } from "../../science/journey";

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
          </dl>
        </div>
        {art && <img className="pl2-page-art" src={art} alt="" width="1536" height="1024" />}
      </header>

      <section className="pl2-handoff">
        <div><span>Arrives</span><p>{ov.before}</p></div>
        <div><span>Leaves</span><p>{ov.after}</p></div>
      </section>

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
                    {t.ref && <p className="pl2-card-ref">{t.ref}</p>}
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
                  {q.ref && <p className="pl2-card-ref">{q.ref}</p>}
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
