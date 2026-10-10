/* Chapter: the characterisation package and where the analytical story
   lives in Module 3, plus the questions reviewers most often send back. */

const CTD = [
  ["3.2.S.3.1", "Elucidation of structure and other characteristics", "Primary structure, PTMs, disulfides, glycosylation, HOS, size and charge variants, biological activity including Fc functions."],
  ["3.2.S.3.2", "Impurities", "Product-related impurities, process-related impurities (HCP, DNA, Protein A, media and resin components) and their clearance."],
  ["3.2.S.4.1", "Specification", "The release tests and acceptance criteria for drug substance."],
  ["3.2.S.4.2", "Analytical procedures", "Method descriptions detailed enough for another lab to repeat them."],
  ["3.2.S.4.3", "Validation of analytical procedures", "Validation summaries and reports (ICH Q2(R2))."],
  ["3.2.S.4.4", "Batch analyses", "Results for clinical, PPQ and commercial-scale lots."],
  ["3.2.S.4.5", "Justification of specification", "Why each test is there and why each limit is where it is."],
  ["3.2.S.5", "Reference standards", "Preparation, characterisation, qualification and storage of primary and working standards."],
  ["3.2.S.7", "Stability", "Summary and conclusions, post-approval protocol and commitment, and the data."],
  ["3.2.P.2", "Pharmaceutical development", "Formulation, container closure suitability and integrity, compatibility, in-use studies."],
  ["3.2.P.5", "Control of drug product", "Specification, procedures, validation, batch analyses, characterisation of impurities, justification."],
  ["3.2.P.8", "Stability (DP)", "Shelf life, storage conditions, in-use and photostability."],
];

const PACKAGE = [
  { n: "Primary structure", items: ["Sequence confirmed by peptide mapping and intact or subunit mass", "N- and C-termini, including C-terminal lysine and pyroglutamate", "Disulfide connectivity and free thiol", "Post-translational modifications located and quantified"] },
  { n: "Glycosylation", items: ["Released N-glycan profile", "Site occupancy, including any Fab glycosylation", "Afucosylation, galactosylation, high mannose, sialylation"] },
  { n: "Higher-order structure", items: ["Far- and near-UV CD, FTIR", "DSC thermal transitions", "Higher-resolution methods such as HDX-MS where needed"] },
  { n: "Variants", items: ["Size and charge variants isolated or enriched", "Each fraction tested for structure and potency", "Classified as product-related substances or impurities"] },
  { n: "Biological activity", items: ["Target binding and kinetics", "Mechanism-of-action potency", "Fc functions as relevant: FcγR binding, ADCC, CDC, C1q, FcRn"] },
  { n: "Process-related impurities", items: ["HCP (ELISA with coverage, plus LC-MS)", "Residual DNA and Protein A", "Leachables and process additives"] },
];

const QUESTIONS = [
  "Justify each acceptance criterion with data from lots used in clinical studies, not only with process capability.",
  "Provide low endotoxin recovery hold-time studies for the drug product formulation.",
  "Show antibody coverage for the HCP ELISA and identify persistent HCPs by LC-MS.",
  "Explain how the potency assay reflects the mechanism of action, and how Fc effector functions are controlled.",
  "Demonstrate that each method on the stability protocol is stability-indicating, with forced-degradation data.",
  "Describe how the reference standard was qualified and how its potency was assigned.",
  "Provide method transfer or validation data for every site that tests commercial lots.",
  "Characterise subvisible particles below 10 µm and explain the particle types observed.",
  "Justify any characterisation attribute that is not tested at release.",
  "Show container closure integrity at the actual storage temperature.",
];

export default function RegulatoryReview() {
  return (
    <div className="rv">
      <section className="ch-sec" style={{ paddingTop: 0 }}>
        <h2 className="hm-h2">Substances and impurities.</h2>
        <p className="an-prose">ICH Q6B draws a distinction that shapes the whole package. A product-related <strong>substance</strong> is a variant formed during manufacture or storage that is active and comparable to the desired product, such as a common charge variant. A product-related <strong>impurity</strong> is a variant without comparable properties, such as an aggregate or an inactive fragment. Characterisation is how a variant earns one label or the other, and the label decides how tightly it is controlled.</p>
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">What the characterisation package contains.</h2>
        <div className="rv-package">
          {PACKAGE.map(p => (
            <div key={p.n}>
              <i />
              <strong>{p.n}</strong>
              <ul>{p.items.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">Where it goes in Module 3.</h2>
        <div className="sv-tablewrap">
          <table className="sv-table rv-ctd">
            <thead><tr><th>Section</th><th>Title</th><th>Analytical content</th></tr></thead>
            <tbody>{CTD.map(r => <tr key={r[0]} style={{ "--row": "var(--chain-h)" }}><td className="sv-mono">{r[0]}</td><td><span className="sv-rowname" style={{ paddingLeft: 0 }}>{r[1]}</span></td><td>{r[2]}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">Questions reviewers send back.</h2>
        <p className="an-prose">Common themes in information requests on the analytical sections of antibody applications. Answering them in the original submission shortens review.</p>
        <ol className="rv-q">{QUESTIONS.map((q, i) => <li key={q}><span className="sv-mono">{String(i + 1).padStart(2, "0")}</span>{q}</li>)}</ol>
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">Before you submit.</h2>
        <ul className="an-list">
          <li>The same number for the same lot appears identically in 3.2.S.3, 3.2.S.4.4 and 3.2.S.7.</li>
          <li>Every specification limit has a justification that cites clinical lots, stability and method capability.</li>
          <li>Every method in the specification is described, validated and transferred to every testing site.</li>
          <li>Every critical quality attribute is controlled somewhere: release, in-process control or process validation.</li>
          <li>Orthogonal methods agree, and where they do not, the difference is explained.</li>
        </ul>
      </section>
    </div>
  );
}
