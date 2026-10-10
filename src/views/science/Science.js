import "./science.css";
import "../analytical/analytical.css";
import { useState } from "react";
import { STAGES, STAGE, GROUPS, CTD, EVIDENCE } from "../../science/journey";
import { PRODUCT } from "../../science/product";
import { ProvLegend, EvidenceLegend } from "../../science/ui";
import StageHero from "./StageHero";
import Proposal from "./Proposal";
import Qtpp from "./Qtpp";

/* The Science journey. Routes: #/science/<stage>. Stages without a deep
   rebuild yet render their hero and link to existing modules. */

const DEEP = { proposal: Proposal, qtpp: Qtpp };
const num = (n) => String(n).padStart(2, "0");

export default function Science({ navigate, focus, dark }) {
  const [id] = (focus || "overview").split("/");
  const go = (stage) => navigate("science", stage === "overview" ? null : stage);
  const stage = STAGE[id];
  const Deep = DEEP[id];
  const i = stage ? STAGES.findIndex(s => s.id === id) : -1;
  const prev = STAGES[i - 1], next = STAGES[i + 1];

  return (
    <div className="an an-series sc">
      <aside className="an-rail" aria-label="Science journey">
        <button className={`an-rail-home${!stage ? " is-on" : ""}`} onClick={() => go("overview")}>Science</button>
        <div className="sc-rail-product"><span className="sv-mono">{PRODUCT.code}</span><span>{PRODUCT.modality}</span></div>
        {GROUPS.map(g => (
          <div key={g.id} className="an-rail-part">
            <span className="an-rail-ptitle">{g.title}</span>
            <ol>
              {STAGES.filter(s => s.group === g.id).map(s => (
                <li key={s.id} className={id === s.id ? "is-on" : ""}>
                  <button onClick={() => go(s.id)} aria-current={id === s.id ? "page" : undefined}>
                    <span className="sv-mono">{num(STAGE[s.id].n)}</span>{s.short}
                  </button>
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

      <div className="an-main" key={id}>
        {!stage ? <Overview go={go} /> : (
          <>
            <StageHero id={id} go={go} nav={navigate} />
            {Deep && <Deep go={go} nav={navigate} dark={dark} />}
            <nav className="ch-pager" aria-label="Journey navigation">
              {prev ? <button onClick={() => go(prev.id)}><span>Previous stage</span><strong><em className="sv-mono">{num(STAGE[prev.id].n)}</em>{prev.title}</strong></button>
                : <button onClick={() => go("overview")}><span>Back to</span><strong>The journey</strong></button>}
              {next ? <button className="is-next" onClick={() => go(next.id)}><span>Next stage</span><strong><em className="sv-mono">{num(STAGE[next.id].n)}</em>{next.title}</strong></button> : <span />}
            </nav>
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────── Overview: two perspectives on one programme ─────────── */

function Overview({ go }) {
  const [view, setView] = useState("journey");
  const [hover, setHover] = useState(null);
  return (
    <>
      <section className="sc-hero">
        <div>
          <h1 className="ov-h1">One antibody, from proposal to dossier.</h1>
          <p className="ov-lede">
            Twelve stages of a biologics development programme, followed through a single fictional antibody. Each stage shows
            what is done, what evidence it produces, and where that evidence ends up in the Common Technical Document.
          </p>
          <div className="hm-actions">
            <button className="hm-primary" onClick={() => go("proposal")}>Start with the proposal</button>
            <button className="hm-secondary" onClick={() => setView("ctd")}>See the CTD evidence map</button>
          </div>
        </div>
        <aside className="sc-card" aria-label="Reference product">
          <div className="sc-card-head"><span className="sv-mono">{PRODUCT.code}</span><span className="pp-fict">Fictional</span></div>
          <dl>
            <div><dt>Modality</dt><dd>{PRODUCT.modality}</dd></div>
            <div><dt>Mechanism</dt><dd>{PRODUCT.mechanism}</dd></div>
            <div><dt>Route and presentation</dt><dd>{PRODUCT.route}; {PRODUCT.strength}, 1.0 mL prefilled syringe</dd></div>
            <div><dt>Storage target</dt><dd>{PRODUCT.storage}</dd></div>
            <div><dt>Where it is now</dt><dd>{PRODUCT.stage}</dd></div>
          </dl>
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
                  <button key={s.id} className={`sc-node${s.built ? " is-built" : ""}`} onClick={() => go(s.id)}>
                    <span className="sv-mono">{num(STAGE[s.id].n)}</span>
                    <strong>{s.title}</strong>
                    <em>{s.purpose}</em>
                    <span className="sc-node-ctd">{s.ctd.map(c => c.s.replace("3.2.", "")).join("  ")}</span>
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
            <p className="vl-explain">Evidence status is for the fictional {PRODUCT.code} programme at the proposal stage. The mapping is educational, not a dossier template; Module 3 structure follows ICH M4Q.</p>
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
