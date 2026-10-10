import "./analytical.css";
import { SepTheatre } from "./theatre";
import { THEATRES } from "./theatre-configs";
import { ANALYTICAL_METHODS } from "../../extra-data";
import { QUALITY_ATTRIBUTES } from "../../analytical-data";
import Atlas from "./Atlas";
import Journey from "./Journey";
import CqaMethod from "./CqaMethod";
import Strategy from "./Strategy";
import ValidationLab from "./ValidationLab";
import SystemSuitability from "./SystemSuitability";
import Specifications from "./Specifications";
import Comparability from "./Comparability";
import ForcedDegradation from "./ForcedDegradation";
import ReferenceStandards from "./ReferenceStandards";

/* The analytical sub-site. Routes: #/analytical/<page>/<item> */
export const AN_PAGES = [
  { id: "overview",      label: "Overview",           line: "How the analytical package fits together." },
  { id: "journey",       label: "Start here",         line: "The questions every lot must answer, in the order a QC scientist asks them, and the assays that answer each one." },
  { id: "atlas",         label: "Assays",             line: `All ${ANALYTICAL_METHODS.length} assays, each shown running on its instrument.` },
  { id: "cqa",           label: "CQA × Method",       line: `${QUALITY_ATTRIBUTES.length} critical quality attributes against ${ANALYTICAL_METHODS.length} assays: which method answers which question, and what confirms it.` },
  { id: "strategy",      label: "Strategy & phases",  line: "What is expected of the analytical package at each stage, from toxicology lots to post-approval change." },
  { id: "validation",    label: "Validation lab",     line: "ICH Q2(R2) linearity, accuracy, precision and LOQ, computed from data you control." },
  { id: "sst",           label: "System suitability", line: "Drag peaks and watch resolution, plates and tailing move against their limits." },
  { id: "specs",         label: "Specifications",     line: "Set acceptance criteria from batch data with tolerance intervals and stability." },
  { id: "comparability", label: "Comparability",      line: "ICH Q5E tiered statistics: equivalence test, quality range, visual." },
  { id: "degradation",   label: "Forced degradation", line: "Stress the molecule and see which assay is stability-indicating for what." },
  { id: "standards",     label: "Reference standards", line: "Primary and working standards, qualification and bridging." },
];
const LEGACY = { map: "cqa", lifecycle: "strategy" };

const PAGE_VIEWS = {
  journey: Journey, atlas: Atlas, cqa: CqaMethod, strategy: Strategy, validation: ValidationLab, sst: SystemSuitability,
  specs: Specifications, comparability: Comparability, degradation: ForcedDegradation, standards: ReferenceStandards,
};

export default function Analytical({ navigate, focus, dark }) {
  const [raw = "overview", item] = (focus || "overview").split("/");
  const page = LEGACY[raw] || raw;
  const go = (path) => navigate("analytical", path);
  const View = PAGE_VIEWS[page];
  const meta = AN_PAGES.find(p => p.id === page) || AN_PAGES[0];

  return (
    <div className="an">
      <div className="an-bar" role="navigation" aria-label="Analytical sections">
        <div className="an-bar-in">
          <button className="an-bar-home" onClick={() => go("overview")}>Analytical</button>
          <div className="an-bar-tabs">
            {AN_PAGES.slice(1).map(p => (
              <button key={p.id} className={`an-bar-tab${page === p.id ? " is-on" : ""}`} aria-current={page === p.id ? "page" : undefined} onClick={() => go(p.id)}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="an-page" key={page}>
        {page === "overview" || !View ? <Overview go={go} /> : (
          <>
            {!(page === "atlas" && item) && (
              <header className="sv-title an-title">
                <h1>{meta.label}</h1>
                <p>{meta.line}</p>
              </header>
            )}
            <View item={item} go={go} dark={dark} />
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────── Overview ─────────── */

const BAY = ["am-sec", "am-iex", "am-ce-sds", "am-cief"];
const FLOW = [
  { id: "cqa", label: "Attribute", sub: "what could go wrong" },
  { id: "atlas", label: "Assay", sub: "how it is measured" },
  { id: "validation", label: "Validation", sub: "proof the method works" },
  { id: "specs", label: "Specification", sub: "what counts as good" },
  { id: "degradation", label: "Stability", sub: "how it changes over time" },
  { id: "comparability", label: "Comparability", sub: "same product after a change" },
];

function Overview({ go }) {
  return (
    <>
      <section className="ov-hero">
        <div className="ov-copy">
          <h1 className="ov-h1">Every attribute, measured two ways.</h1>
          <p className="ov-lede">
            A biologic is released on numbers. This is how those numbers are produced and defended: which assay
            answers which quality question, the orthogonal method that confirms it, and the statistics that turn a
            result into a specification.
          </p>
          <div className="hm-actions">
            <button className="hm-primary" onClick={() => go("journey")}>Start here</button>
            <button className="hm-secondary" onClick={() => go("cqa")}>See the CQA × Method map</button>
          </div>
        </div>
        <div className="ov-bay" aria-label="Four release assays acquiring at once">
          {BAY.map(id => {
            const m = ANALYTICAL_METHODS.find(x => x.id === id);
            return (
              <button key={id} className="ov-channel" onClick={() => go("atlas/" + id)}>
                <span className="ov-ch-label"><strong>{m.abbreviation}</strong>{m.name !== m.abbreviation && <span>{m.name}</span>}<span className="ov-ch-go">Open</span></span>
                <SepTheatre cfg={THEATRES[id]} compact />
              </button>
            );
          })}
        </div>
      </section>

      <section className="ov-flow-sec">
        <h2 className="hm-h2">From a risk to a release decision.</h2>
        <p className="hm-sub sv-measure">Each step hands evidence to the next. Open any step.</p>
        <SignalFlow go={go} />
      </section>

      <section className="ov-index">
        <div className="mt-cells">
          {AN_PAGES.slice(1).map((p, i) => (
            <button key={p.id} className="mt-cell" style={{ "--seg": ["var(--chain-h)", "var(--chain-l)", "var(--bridge)", "var(--cpk-cl)", "var(--glycan)"][i % 5] }} onClick={() => go(p.id)}>
              <i />
              <span className="mt-cell-top"><strong>{p.label}</strong></span>
              <span className="mt-cell-purpose">{p.line}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

// The chain of evidence, left to right. Static: the order is the message.
function SignalFlow({ go }) {
  return (
    <div className="ov-flow">
      <div className="ov-flow-rule" aria-hidden="true" />
      <ol className="ov-flow-nodes">
        {FLOW.map(s => (
          <li key={s.id}>
            <button onClick={() => go(s.id)}>
              <span className="ov-node" />
              <strong>{s.label}</strong>
              <span>{s.sub}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
