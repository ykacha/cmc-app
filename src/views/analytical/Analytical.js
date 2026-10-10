import "./analytical.css";
import { SepTheatre } from "./theatre";
import { THEATRES } from "./theatre-configs";
import { ANALYTICAL_METHODS } from "../../extra-data";
import { QUALITY_ATTRIBUTES } from "../../analytical-data";
import Journey from "./Journey";
import Atlas from "./Atlas";
import CqaMethod from "./CqaMethod";
import MethodLifecycle from "./MethodLifecycle";
import ValidationLab from "./ValidationLab";
import SystemSuitability from "./SystemSuitability";
import ReferenceStandards from "./ReferenceStandards";
import Specifications from "./Specifications";
import StabilityTesting from "./StabilityTesting";
import OosIntegrity from "./OosIntegrity";
import Comparability from "./Comparability";
import Strategy from "./Strategy";
import RegulatoryReview from "./RegulatoryReview";

/* The analytical series: four parts, thirteen chapters, read in order.
   Routes: #/analytical/<chapter>/<item> */

const N_METHODS = ANALYTICAL_METHODS.length, N_CQA = QUALITY_ATTRIBUTES.length;

export const PARTS = [
  { id: "I", title: "Foundations", line: "What is tested, and why.", chapters: [
    { id: "journey", label: "The questions every lot answers", short: "Start here", line: "Where the sample comes from, then the questions every lot must answer, in the order a QC scientist asks them.", View: Journey },
    { id: "atlas", label: "The assays", short: "Assays", line: `All ${N_METHODS} assays, grouped by the question they answer. Most can be watched running on their instrument.`, View: Atlas },
    { id: "cqa", label: "CQA × Method", short: "CQA × Method", line: `${N_CQA} quality attributes against ${N_METHODS} assays: which method answers which question, and what confirms it.`, View: CqaMethod },
  ]},
  { id: "II", title: "Methods you can trust", line: "Proving a method works, and keeping it working.", chapters: [
    { id: "lifecycle", label: "Method lifecycle and transfer", short: "Lifecycle", line: "ICH Q14 from analytical target profile to post-approval change, and how a method moves between labs.", View: MethodLifecycle },
    { id: "validation", label: "Validation lab", short: "Validation", line: "ICH Q2(R2) linearity, accuracy, precision and quantitation limit, computed from data you control.", View: ValidationLab },
    { id: "sst", label: "System suitability", short: "SST", line: "The checks that protect every run. Drag the peaks and watch resolution, plates and tailing move against their limits.", View: SystemSuitability },
    { id: "standards", label: "Reference standards", short: "Standards", line: "Primary and working standards: how they are made, qualified and replaced.", View: ReferenceStandards },
  ]},
  { id: "III", title: "From result to decision", line: "Turning numbers into release, shelf life and change.", chapters: [
    { id: "specs", label: "Setting specifications", short: "Specifications", line: "Acceptance criteria from batch data, tolerance intervals, stability and assay variability.", View: Specifications },
    { id: "stability", label: "Stability-indicating testing", short: "Stability", line: "Forced degradation, the real-time programme, and how a shelf life is assigned.", View: StabilityTesting },
    { id: "oos", label: "OOS, OOT and data integrity", short: "OOS & integrity", line: "What happens when a result fails, how drift is caught early, and why every number must be trustworthy.", View: OosIntegrity },
    { id: "comparability", label: "Comparability", short: "Comparability", line: "ICH Q5E tiered statistics for a process change: equivalence test, quality range, visual comparison.", View: Comparability },
  ]},
  { id: "IV", title: "Programme and filing", line: "What is expected when, and how it is reviewed.", chapters: [
    { id: "strategy", label: "Strategy across phases", short: "Phases", line: "What the analytical package must deliver at each stage, from toxicology lots to post-approval change.", View: Strategy },
    { id: "review", label: "Characterisation and regulatory review", short: "Review", line: "The characterisation package, where it sits in Module 3, and the questions reviewers send back.", View: RegulatoryReview },
  ]},
];
const CHAPTERS = PARTS.flatMap(p => p.chapters.map(c => ({ ...c, part: p })));
CHAPTERS.forEach((c, i) => { c.n = i + 1; });
const NUM_OF = Object.fromEntries(CHAPTERS.map(c => [c.id, c.n]));
const LEGACY = { map: "cqa", degradation: "stability" };
const num = (n) => String(n).padStart(2, "0");

export default function Analytical({ navigate, focus, dark }) {
  const [raw = "overview", item] = (focus || "overview").split("/");
  const id = LEGACY[raw] || raw;
  const go = (path) => navigate("analytical", path);
  const ch = CHAPTERS.find(c => c.id === id);
  const i = ch ? CHAPTERS.indexOf(ch) : -1;
  const prev = CHAPTERS[i - 1], next = CHAPTERS[i + 1];
  const View = ch?.View;

  return (
    <div className="an an-series">
      <aside className="an-rail" aria-label="Analytical series contents">
        <button className={`an-rail-home${!ch ? " is-on" : ""}`} onClick={() => go("overview")}>Analytical</button>
        {PARTS.map(p => (
          <div key={p.id} className="an-rail-part">
            <span className="an-rail-ptitle">{p.title}</span>
            <ol>
              {p.chapters.map(c => (
                <li key={c.id} className={id === c.id ? "is-on" : ""}>
                  <button onClick={() => go(c.id)} aria-current={id === c.id ? "page" : undefined}>
                    <span className="sv-mono">{num(NUM_OF[c.id])}</span>{c.label}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </aside>

      {/* compact chapter bar for narrow screens */}
      <div className="an-bar an-bar-mobile" role="navigation" aria-label="Analytical chapters">
        <div className="an-bar-in">
          <button className="an-bar-home" onClick={() => go("overview")}>Analytical</button>
          <div className="an-bar-tabs">
            {CHAPTERS.map(c => (
              <button key={c.id} className={`an-bar-tab${id === c.id ? " is-on" : ""}`} onClick={() => go(c.id)}>{num(c.n)} {c.short}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="an-main" key={id}>
        {!ch ? <Cover go={go} /> : (
          <>
            {!(id === "atlas" && item) && (
              <header className="ch-head">
                <h1><span className="ch-num sv-mono">{num(ch.n)}</span>{ch.label}</h1>
                <p>{ch.line}</p>
              </header>
            )}
            <View item={item} go={go} dark={dark} nav={navigate} />
            <nav className="ch-pager" aria-label="Series navigation">
              {prev
                ? <button onClick={() => go(prev.id)}><span>Previous chapter</span><strong><em className="sv-mono">{num(prev.n)}</em>{prev.label}</strong></button>
                : <button onClick={() => go("overview")}><span>Back to</span><strong>The series</strong></button>}
              {next ? <button className="is-next" onClick={() => go(next.id)}><span>Next chapter</span><strong><em className="sv-mono">{num(next.n)}</em>{next.label}</strong></button> : <span />}
            </nav>
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────── Series cover ─────────── */

const BAY = ["am-sec", "am-iex", "am-ce-sds", "am-cief"];

function Cover({ go }) {
  return (
    <>
      <section className="ov-hero">
        <div className="ov-copy">
          <h1 className="ov-h1">Every attribute, measured two ways.</h1>
          <p className="ov-lede">
            A biologic is released on numbers. This series follows how those numbers are produced and defended: which assay
            answers which quality question, the orthogonal method that confirms it, the statistics that turn a result into a
            specification, and how it is all reviewed.
          </p>
          <div className="hm-actions">
            <button className="hm-primary" onClick={() => go("journey")}>Begin with chapter 1</button>
            <button className="hm-secondary" onClick={() => go("cqa")}>Jump to CQA × Method</button>
          </div>
        </div>
        <div className="ov-bay" aria-label="Four release assays acquiring at once">
          {BAY.map(bid => {
            const m = ANALYTICAL_METHODS.find(x => x.id === bid);
            return (
              <button key={bid} className="ov-channel" onClick={() => go("atlas/" + bid)}>
                <span className="ov-ch-label"><strong>{m.abbreviation}</strong>{m.name !== m.abbreviation && <span>{m.name}</span>}<span className="ov-ch-go">Open</span></span>
                <SepTheatre cfg={THEATRES[bid]} compact />
              </button>
            );
          })}
        </div>
      </section>

      <section className="ov-series">
        <h2 className="hm-h2">The series, in four parts.</h2>
        <p className="hm-sub sv-measure">Read it in order the first time; afterwards, every chapter stands on its own.</p>
        <div className="ov-parts">
          {PARTS.map(p => (
            <div key={p.id} className="ov-part">
              <span className="ov-part-id sv-mono">Part {p.id}</span>
              <strong className="ov-part-title">{p.title}</strong>
              <p className="ov-part-line">{p.line}</p>
              <ol>
                {p.chapters.map(c => (
                  <li key={c.id}>
                    <button onClick={() => go(c.id)}>
                      <span className="sv-mono">{num(NUM_OF[c.id])}</span>
                      <span><strong>{c.label}</strong><em>{c.line}</em></span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
