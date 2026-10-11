import "./science.css";
import "../analytical/analytical.css";
import { useState } from "react";
import { STAGES, STAGE, GROUPS, CTD, EVIDENCE, MILESTONES, GATES, GLANCE } from "../../science/journey";
import { TOPICS, topicOf } from "../../science/content";
import { WIDGETS } from "./widgets";
import { ProvLegend, EvidenceLegend } from "../../science/ui";
import StageHero from "./StageHero";
import Proposal from "./Proposal";
import Qtpp from "./Qtpp";
import { Blocks } from "./Blocks";
import FlowHero from "./FlowHero";
import { Icon } from "../../icons";

/* The Science journey. Routes:
     #/science                     overview
     #/science/<stage>             stage hero + topic index
     #/science/<stage>/<topic>     deep-dive topic */

const DEEP = { proposal: Proposal, qtpp: Qtpp };
const num = (n) => String(n).padStart(2, "0");

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
        {!stage ? <Overview go={go} dark={dark} />
          : topic ? <TopicPage stage={stage} topic={topic} go={go} nav={navigate} dark={dark} />
          : <>{tid && <p className="sc-missing" role="status">That topic is not in this stage. Here is the stage overview instead.</p>}<StagePage stage={stage} go={go} nav={navigate} dark={dark} /></>}
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

function Overview({ go, dark }) {
  const [view, setView] = useState("journey");
  const [hover, setHover] = useState(null);
  return (
    <>
      <section className="sc-hero">
        <div className="sc-hero-top">
          <h1 className="sc-hero-h">Biologics CMC,<br />from proposal to dossier.</h1>
          <div className="sc-hero-side">
            <p className="ov-lede">
              The stages of a therapeutic protein programme in the order the work happens: the science, the decisions,
              how each stage feeds the next, and where its evidence ends up in the Common Technical Document.
            </p>
            <div className="hm-actions">
              <button className="hm-primary" onClick={() => go("proposal")}>Start at the beginning</button>
              <button className="hm-secondary" onClick={() => go("qbd/explorer")}>Follow one attribute end to end</button>
            </div>
          </div>
        </div>
        <FlowHero dark={dark} />
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
            ? "When each stage happens across a typical programme, then every stage in dependency order. Select any stage to open it."
            : "Where each stage's evidence is filed. The dossier is organised by subject, not by chronology, so one section collects evidence from several stages."}
        </p>

        {view === "journey" ? (
          <>
            <Timeline go={go} />
            <Route go={go} />
          </>
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
            <p className="vl-explain">Dot colours show example statuses for a programme that has finished development at laboratory and scale-down scale, before GMP manufacture. The mapping is educational, not a dossier template; Module 3 structure follows ICH M4Q. <button className="hm-link" onClick={() => go("ctd/navigator")}>Open the evidence navigator</button> to track your own programme.</p>
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

/* When each stage is most active, against the milestones of a typical
   antibody programme. Stages overlap: that is the point of the picture. */
function Timeline({ go }) {
  const cols = MILESTONES.length;
  return (
    <figure className="sc-tl" aria-label="When each stage happens">
      <div className="sc-tl-scroll">
        <div className="sc-tl-grid" style={{ "--cols": cols }}>
          <span className="sc-tl-corner" />
          {MILESTONES.map(m => (
            <span key={m.id} className="sc-tl-head">
              {m.label}
            </span>
          ))}
          {GATES.map(g => <i key={g.label} className="sc-tl-gate" style={{ "--at": (g.after + 1) / cols }} aria-hidden="true"><b>{g.label}</b></i>)}
          {STAGES.map(s => {
            const [a, b] = GLANCE[s.id].span;
            return (
              <button key={s.id} className={`sc-tl-row sc-g-${s.group}`} onClick={() => go(s.id)} aria-label={`${s.title}: ${MILESTONES[a].label} to ${MILESTONES[b].label}`}>
                <span className="sc-tl-name"><span className="sv-mono">{num(STAGE[s.id].n)}</span>{s.short}</span>
                <span className="sc-tl-track" style={{ gridColumn: `2 / span ${cols}` }}>
                  <span className="sc-tl-bar" style={{ left: `${(a / cols) * 100}%`, width: `${((b - a + 1) / cols) * 100}%` }} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <figcaption>Typical timing for a monoclonal antibody. Bars show when each stage's work is most active; real programmes vary, and many stages run in parallel. Analytical work runs from the first screen to the last variation.</figcaption>
    </figure>
  );
}

const STAGE_ICON = { proposal: "target", qtpp: "chartbar", candidate: "gene", cellline: "cell", upstream: "bioreactor", downstream: "filter", analytical: "wave", formulation: "vial", stability: "thermometer", qbd: "shieldcheck", transfer: "factory", specs: "check", ctd: "book" };

/* The journey as a route: one line from proposal to dossier, a station per
   stage, a chapter per group, and on each leg what one stage hands to the next. */
function Route({ go }) {
  let side = 0;
  return (
    <div className="sc-route">
      <figure className="sc-route-art">
        <img src={`${process.env.PUBLIC_URL || ""}/science-art/science-journey-hero.webp`} alt="Illustration of the material flow: cells, a bioreactor, a chromatography skid, a syringe filling line and the dossier binders." loading="lazy" width="1600" height="1067" />
      </figure>
      <ol className="sc-route-line" aria-label="The journey, stage by stage">
        {GROUPS.map((g, gi) => (
          <li key={g.id} className={`sc-route-part sc-g-${g.id}`}>
            <div className="sc-route-chapter"><span className="sv-mono">Part {gi + 1}</span><strong>{g.title}</strong></div>
            <ol>
              {STAGES.filter(s => s.group === g.id).map(s => {
                const n = TOPICS[s.id] ? TOPICS[s.id].length : 0;
                const left = side++ % 2 === 0;
                return (
                  <li key={s.id} className={`sc-station${left ? " is-left" : " is-right"}`}>
                    <button onClick={() => go(s.id)} aria-label={`${num(STAGE[s.id].n)} ${s.title}`}>
                      <span className="sc-station-dot"><Icon name={STAGE_ICON[s.id]} size={22} /></span>
                      <span className="sc-station-body">
                        <span className="sc-station-n sv-mono">{num(STAGE[s.id].n)}</span>
                        <strong>{s.title}</strong>
                        <em>{s.purpose}</em>
                        <span className="sc-station-meta">
                          <span className="sc-station-ticks" aria-hidden="true">{Array.from({ length: n || 1 }, (_, i) => <i key={i} className={n ? "" : "is-example"} />)}</span>
                          {n ? `${n} topics` : "Worked example"}
                        </span>
                      </span>
                    </button>
                    {s.outputs[0] && STAGES[STAGE[s.id].n] && (
                      <span className="sc-station-hand"><span>Hands over</span>{s.outputs[0]}</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
}
