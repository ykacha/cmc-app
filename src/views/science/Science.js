import "./science.css";
import "../analytical/analytical.css";
import { useState } from "react";
import { STAGES, STAGE, GROUPS, CTD, EVIDENCE } from "../../science/journey";
import { TOPICS, topicOf } from "../../science/content";
import { WIDGETS } from "./widgets";
import { ProvLegend, EvidenceLegend } from "../../science/ui";
import StageHero from "./StageHero";
import Proposal from "./Proposal";
import Qtpp from "./Qtpp";
import { Blocks } from "./Blocks";

/* The Science journey. Routes:
     #/science                     overview
     #/science/<stage>             stage hero + topic index
     #/science/<stage>/<topic>     deep-dive topic */

const DEEP = { proposal: Proposal, qtpp: Qtpp };
const num = (n) => String(n).padStart(2, "0");
const N_TOPICS = Object.values(TOPICS).reduce((s, t) => s + t.length, 0);

// every topic in journey order, for prev/next across stage boundaries
const SEQUENCE = STAGES.flatMap(s => [{ stage: s.id }, ...(TOPICS[s.id] || []).map(t => ({ stage: s.id, topic: t.id }))]);

export default function Science({ navigate, focus, dark }) {
  const [id, tid] = (focus || "overview").split("/");
  const go = (path) => navigate("science", path === "overview" ? null : path);
  const stage = STAGE[id];
  const topic = stage && tid ? topicOf(id, tid) : null;

  return (
    <div className="an an-series sc">
      <aside className="an-rail" aria-label="Science journey">
        <button className={`an-rail-home${!stage ? " is-on" : ""}`} onClick={() => go("overview")}>Science</button>
        {GROUPS.map(g => (
          <div key={g.id} className="an-rail-part">
            <span className="an-rail-ptitle">{g.title}</span>
            <ol>
              {STAGES.filter(s => s.group === g.id).map(s => (
                <li key={s.id} className={id === s.id ? "is-on" : ""}>
                  <button onClick={() => go(s.id)} aria-current={id === s.id && !topic ? "page" : undefined}>
                    <span className="sv-mono">{num(STAGE[s.id].n)}</span>{s.short}
                  </button>
                  {id === s.id && TOPICS[s.id] && (
                    <ul className="sc-rail-topics">
                      {TOPICS[s.id].map(t => (
                        <li key={t.id}><button className={tid === t.id ? "is-on" : ""} aria-current={tid === t.id ? "page" : undefined} onClick={() => go(`${s.id}/${t.id}`)}>{t.title}</button></li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </aside>

      <div className="an-bar an-bar-mobile" role="navigation" aria-label="Science stages">
        <div className="an-bar-in">
          <button className="an-bar-home" onClick={() => go("overview")}>Science</button>
          <div className="an-bar-tabs">
            {STAGES.map(s => <button key={s.id} className={`an-bar-tab${id === s.id ? " is-on" : ""}`} onClick={() => go(s.id)}>{num(STAGE[s.id].n)} {s.short}</button>)}
          </div>
        </div>
      </div>

      <div className="an-main" key={focus || "overview"}>
        {!stage ? <Overview go={go} />
          : topic ? <TopicPage stage={stage} topic={topic} go={go} nav={navigate} dark={dark} />
          : <StagePage stage={stage} go={go} nav={navigate} dark={dark} />}
      </div>
    </div>
  );
}

function Pager({ at, go }) {
  const i = SEQUENCE.findIndex(x => x.stage === at.stage && x.topic === at.topic);
  const label = (x) => x.topic ? topicOf(x.stage, x.topic).title : STAGE[x.stage].title;
  const path = (x) => x.topic ? `${x.stage}/${x.topic}` : x.stage;
  const prev = SEQUENCE[i - 1], next = SEQUENCE[i + 1];
  return (
    <nav className="ch-pager" aria-label="Journey navigation">
      {prev ? <button onClick={() => go(path(prev))}><span>{prev.topic ? "Previous" : "Back to stage"}</span><strong>{!prev.topic && <em className="sv-mono">{num(STAGE[prev.stage].n)}</em>}{label(prev)}</strong></button>
        : <button onClick={() => go("overview")}><span>Back to</span><strong>The journey</strong></button>}
      {next ? <button className="is-next" onClick={() => go(path(next))}><span>{next.topic ? "Next" : "Next stage"}</span><strong>{!next.topic && <em className="sv-mono">{num(STAGE[next.stage].n)}</em>}{label(next)}</strong></button> : <span />}
    </nav>
  );
}

function StagePage({ stage, go, nav, dark }) {
  const Deep = DEEP[stage.id];
  const topics = TOPICS[stage.id] || [];
  return (
    <>
      <StageHero id={stage.id} go={go} nav={nav} />
      {topics.length > 0 && (
        <section className="sc-inside" aria-labelledby="inside-h">
          <h2 id="inside-h" className="hm-h2">Inside this stage.</h2>
          <ol className="sc-topics">
            {topics.map((t, i) => {
              const tools = t.blocks.filter(b => b.t === "widget" && WIDGETS[b.id]).length;
              return (
                <li key={t.id}>
                  <button onClick={() => go(`${stage.id}/${t.id}`)}>
                    <span className="sv-mono">{num(i + 1)}</span>
                    <strong>{t.title}</strong>
                    <em>{t.lede}</em>
                    {tools > 0 && <span className="sc-topic-tool">Interactive</span>}
                  </button>
                </li>
              );
            })}
          </ol>
        </section>
      )}
      {Deep && (
        <>
          <div className="sc-example">
            <h2 className="hm-h2">Worked example.</h2>
            <p className="hm-sub sv-measure">This stage is easiest to learn by doing it once. The example follows a fictional antibody; the method applies to any biologic.</p>
          </div>
          <Deep go={go} nav={nav} dark={dark} />
        </>
      )}
      <Pager at={{ stage: stage.id }} go={go} />
    </>
  );
}

function TopicPage({ stage, topic, go, nav, dark }) {
  const topics = TOPICS[stage.id];
  return (
    <article className="sc-topic">
      <nav className="an-crumbs">
        <button className="hm-link" onClick={() => go(stage.id)}><span className="sv-mono">{num(stage.n)}</span> {stage.title}</button>
      </nav>
      <h1 className="sc-topic-h">{topic.title}</h1>
      <p className="sc-topic-lede">{topic.lede}</p>
      <div className="sc-topic-tabs" role="navigation" aria-label={`Topics in ${stage.short}`}>
        {topics.map(t => <button key={t.id} className={`sv-tab${t.id === topic.id ? " is-on" : ""}`} aria-current={t.id === topic.id ? "page" : undefined} onClick={() => go(`${stage.id}/${t.id}`)}>{t.title}</button>)}
      </div>
      <Blocks blocks={topic.blocks} go={go} nav={nav} dark={dark} />
      <Pager at={{ stage: stage.id, topic: topic.id }} go={go} />
    </article>
  );
}

/* ─────────── Overview: two perspectives on one programme ─────────── */

function Overview({ go }) {
  const [view, setView] = useState("journey");
  const [hover, setHover] = useState(null);
  const n_tools = Object.values(TOPICS).flat().flatMap(t => t.blocks).filter(b => b.t === "widget").length;
  return (
    <>
      <section className="sc-hero">
        <div>
          <h1 className="ov-h1">Biologics CMC, from proposal to dossier.</h1>
          <p className="ov-lede">
            Twelve stages of a therapeutic protein programme, in the order the work happens. Each stage explains the science,
            the decisions it supports, how it connects to the others, and where its evidence ends up in the Common Technical Document.
          </p>
          <div className="hm-actions">
            <button className="hm-primary" onClick={() => go("proposal")}>Start at the beginning</button>
            <button className="hm-secondary" onClick={() => go("qbd/explorer")}>Follow one attribute end to end</button>
          </div>
        </div>
        <aside className="sc-card" aria-label="What is inside">
          <dl className="sc-counts">
            <div><dt>Stages</dt><dd className="sv-mono">{STAGES.length}</dd></div>
            <div><dt>Deep-dive topics</dt><dd className="sv-mono">{N_TOPICS}</dd></div>
            <div><dt>Interactive tools</dt><dd className="sv-mono">{n_tools}</dd></div>
            <div><dt>CTD sections mapped</dt><dd className="sv-mono">{CTD.length}</dd></div>
          </dl>
          <p className="sc-card-note">General science throughout. Where a worked example helps (the proposal and the QTPP), it uses a fictional antibody and labels every number with where it comes from.</p>
        </aside>
      </section>

      <section className="sc-persp">
        <div className="sc-persp-head">
          <h2 className="hm-h2">{view === "journey" ? "The development journey." : "The CTD evidence map."}</h2>
          <div className="sc-toggle" role="tablist" aria-label="Perspective">
            <button role="tab" aria-selected={view === "journey"} className={`sv-tab${view === "journey" ? " is-on" : ""}`} onClick={() => setView("journey")}>Development journey</button>
            <button role="tab" aria-selected={view === "ctd"} className={`sv-tab${view === "ctd" ? " is-on" : ""}`} onClick={() => setView("ctd")}>CTD evidence map</button>
          </div>
        </div>
        <p className="hm-sub sv-measure">
          {view === "journey"
            ? "What happens, in the order the work is done. Stages overlap in practice; this is the dependency order."
            : "Where each stage's evidence is filed. The dossier is organised by subject, not by chronology, so one section collects evidence from several stages."}
        </p>

        {view === "journey" ? (
          <div className="sc-lanes">
            {GROUPS.map(g => (
              <div key={g.id} className="sc-lane">
                <span className="sc-lane-title">{g.title}</span>
                {STAGES.filter(s => s.group === g.id).map(s => (
                  <button key={s.id} className="sc-node" onClick={() => go(s.id)}>
                    <span className="sv-mono">{num(STAGE[s.id].n)}</span>
                    <strong>{s.title}</strong>
                    <em>{s.purpose}</em>
                    <span className="sc-node-ctd">{TOPICS[s.id] ? `${TOPICS[s.id].length} topics` : "Worked example"}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="sv-tablewrap">
              <table className="sc-matrix">
                <thead>
                  <tr>
                    <th className="sc-m-corner">CTD section</th>
                    {STAGES.map(s => (
                      <th key={s.id} className={hover === s.id ? "is-hover" : ""}><button onClick={() => go(s.id)} title={s.title}><span className="sv-mono">{num(STAGE[s.id].n)}</span><span>{s.short}</span></button></th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CTD.map(c => (
                    <tr key={c.id}>
                      <th scope="row"><span className="sv-mono">{c.id}</span>{c.title}</th>
                      {STAGES.map(s => {
                        const hit = s.ctd.find(x => x.s === c.id);
                        return (
                          <td key={s.id} className={hover === s.id ? "is-hover" : ""} onMouseEnter={() => setHover(s.id)} onMouseLeave={() => setHover(null)}>
                            {hit ? <span className={`sc-dot sc-ev-${hit.status}`} title={`${s.title} → ${c.id}: ${EVIDENCE[hit.status].label}`} /> : null}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <EvidenceLegend />
            <p className="vl-explain">Dot colours show example statuses for a programme at the proposal stage. The mapping is educational, not a dossier template; Module 3 structure follows ICH M4Q. <button className="hm-link" onClick={() => go("ctd/navigator")}>Open the evidence navigator</button> to track your own programme.</p>
          </>
        )}
      </section>

      <section className="sc-howto">
        <h2 className="hm-h2">How to read the numbers.</h2>
        <p className="hm-sub sv-measure">Every example value in the Science section is labelled with where it comes from. None of it is real product data.</p>
        <ProvLegend />
      </section>
    </>
  );
}
