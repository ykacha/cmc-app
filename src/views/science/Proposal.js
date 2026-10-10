import { useState } from "react";
import { PRODUCT, PROPOSAL, UNCERTAINTIES, DELIVERABLES } from "../../science/product";
import { ProvTag } from "../../science/ui";

/* Stage 1 deep content: the proposal itself, the chain from intent to
   refined quality strategy, open uncertainties and deliverables. */

const CHAIN = [
  { id: "intent", n: "Development intent", what: "What the product is for and how patients will use it.", here: "Monthly subcutaneous self-injection that neutralises IFX." },
  { id: "qtpp", n: "QTPP", what: "The quality characteristics the product must have to deliver that intent.", here: "150 mg in 1 mL, liquid, prefilled syringe, at least 24 months at 2–8 °C, sterile." },
  { id: "qa", n: "Quality attribute identification", what: "Physical, chemical, biological and microbiological properties that could affect those targets.", here: "Fifteen candidate attributes, from neutralisation potency to viscosity." },
  { id: "risk", n: "Risk assessment", what: "How much each attribute could matter, and how much we already know.", here: "CDR deamidation and aggregation score highest: high impact, little data." },
  { id: "prio", n: "Development priorities", what: "The studies that reduce the biggest uncertainties first.", here: "Forced deamidation, high-concentration screening, syringe particle studies." },
  { id: "evidence", n: "Experimental evidence", what: "Data from process, analytical and formulation development.", here: "Generated in the stages that follow; none exists yet." },
  { id: "refined", n: "Refined quality strategy", what: "Updated criticality, ranges and controls, justified by data.", here: "Reassessed at each development milestone, ending in the control strategy." },
];

export default function Proposal({ go }) {
  const [sel, setSel] = useState("risk");
  const c = CHAIN.find(x => x.id === sel);
  return (
    <div className="sc-deep">
      <section className="ch-sec">
        <h2 className="hm-h2">The proposal, as a CMC team would write it.</h2>
        <p className="an-prose">Every later decision traces back to this page. It is short on purpose: it states intent and assumptions, and it lists what is not yet known.</p>
        <article className="pp-doc">
          <header className="pp-doc-head">
            <div><span className="sv-mono">{PRODUCT.code}</span><strong>Development proposal</strong></div>
            <span className="pp-fict">Fictional programme</span>
          </header>
          <dl className="pp-facts">
            <div><dt>Modality</dt><dd>{PRODUCT.modality}</dd></div>
            <div><dt>Target</dt><dd>{PRODUCT.target}</dd></div>
            <div><dt>Indication</dt><dd>{PRODUCT.indication}</dd></div>
            <div><dt>Dosing</dt><dd>{PRODUCT.dosing}</dd></div>
          </dl>
          <div className="pp-sections">
            {PROPOSAL.map(p => (
              <section key={p.id}>
                <h3>{p.title} <ProvTag p={p.prov} /></h3>
                <p>{p.body}</p>
              </section>
            ))}
          </div>
        </article>
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">From intent to a justified quality strategy.</h2>
        <p className="an-prose">The chain runs in one direction the first time and is revisited every time new data arrives. Select a step.</p>
        <ol className="pp-chain" role="tablist">
          {CHAIN.map((x, i) => (
            <li key={x.id} className={sel === x.id ? "is-on" : ""}>
              <button role="tab" aria-selected={sel === x.id} onClick={() => setSel(x.id)}>
                <span className="sv-mono">{String(i + 1).padStart(2, "0")}</span>{x.n}
              </button>
            </li>
          ))}
        </ol>
        <div className="pp-chain-detail" key={sel}>
          <p><strong>What it is.</strong> {c.what}</p>
          <p><strong>For {PRODUCT.code}.</strong> {c.here}</p>
          {sel === "qtpp" || sel === "qa" || sel === "risk" ? <button className="hm-link" onClick={() => go("qtpp")}>See it worked through in stage 2</button> : null}
        </div>
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">What we do not know yet.</h2>
        <div className="sv-tablewrap">
          <table className="sv-table pp-unc">
            <thead><tr><th>Uncertainty</th><th>Why it matters</th><th>How it will be resolved</th></tr></thead>
            <tbody>{UNCERTAINTIES.map(u => <tr key={u.id} style={{ "--row": "var(--chain-h)" }}><td><span className="sv-rowname" style={{ paddingLeft: 0, whiteSpace: "normal" }}>{u.risk}</span></td><td>{u.why}</td><td>{u.resolve}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">Deliverables from this stage.</h2>
        <ul className="pp-deliv">
          {DELIVERABLES.map(d => (
            <li key={d.id}><span className={`pp-when pp-when-${d.when.replace(/\s/g, "").toLowerCase()}`}>{d.when}</span><strong>{d.item}</strong><em>{d.owner}</em></li>
          ))}
        </ul>
      </section>
    </div>
  );
}
