import Lifecycle from "./Lifecycle";

/* Chapter: method lifecycle (ICH Q14), transfer (USP <1224>) and change. */

const APPROACH = [
  ["Analytical target profile", "Optional", "Defined first, and every later decision is checked against it"],
  ["Risk assessment", "Informal", "Structured (Ishikawa, FMEA) to rank method parameters"],
  ["Robustness", "One factor at a time", "Designed experiments across interacting parameters"],
  ["Operating ranges", "Fixed set points with tolerances", "Proven acceptable ranges or a method operable design region"],
  ["Post-approval change", "Most changes need prior approval", "Changes inside approved ranges can be managed with less regulatory burden"],
];

const TRANSFER = [
  { n: "Comparative testing", when: "The usual route: the same lots (and often stressed or spiked samples) are tested at both sites.", crit: "Pre-defined equivalence on the mean difference and on precision." },
  { n: "Co-validation", when: "The receiving lab joins the validation, supplying the reproducibility data.", crit: "Validation acceptance criteria, with between-lab precision included." },
  { n: "Revalidation", when: "Partial or full validation at the receiving lab, for example after a major equipment difference.", crit: "ICH Q2(R2) criteria for the characteristics affected." },
  { n: "Transfer waiver", when: "Compendial methods, or a lab already running the same method on a similar product.", crit: "A written justification instead of experimental data." },
];

const CRITERIA = [
  ["Protein concentration (A280)", "Mean difference within about ±2–3%"],
  ["Relative potency (bioassay)", "Mean difference within about ±10–15%, with intermediate precision met at the receiving lab"],
  ["SEC main peak", "Absolute difference within about ±0.5–1.0%"],
  ["Low-level impurity (e.g. %HMW ≈ 1%)", "Absolute difference within about ±0.2–0.3%"],
  ["Identity", "Both labs conform"],
];

export default function MethodLifecycle() {
  return (
    <div className="ml">
      <section className="ch-sec">
        <h2 className="hm-h2">Start from what the result must achieve.</h2>
        <p className="an-prose">
          ICH Q14 asks developers to write down, before choosing a technique, what the procedure must measure and how well: the
          analytical target profile. A method is then judged against that target for its whole life, rather than against the
          way it happened to be developed.
        </p>
        <div className="ml-atp">
          <span className="ml-atp-label">Example, SEC for aggregates</span>
          <p>The procedure must quantify high-molecular-weight species in drug substance from 0.5 to 5.0%, with accuracy within ±20%
            relative and precision of 10% RSD or better, and must resolve HMW from monomer with a resolution of at least 1.5.</p>
        </div>
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">Two ways to develop a method.</h2>
        <p className="an-prose">Q14 describes a minimal approach and an enhanced one. Both are acceptable; the enhanced approach costs more up front and buys flexibility later.</p>
        <div className="sv-tablewrap">
          <table className="sv-table ml-table">
            <thead><tr><th>Element</th><th>Minimal approach</th><th>Enhanced approach</th></tr></thead>
            <tbody>{APPROACH.map(r => <tr key={r[0]} style={{ "--row": "var(--chain-h)" }}><td><span className="sv-rowname">{r[0]}</span></td><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">The lifecycle, stage by stage.</h2>
        <p className="an-prose">Select a stage to see what it produces and where it sits in the guidance.</p>
        <Lifecycle />
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">Moving a method to another lab.</h2>
        <p className="an-prose">Every new testing site, whether a commercial QC lab or a contract lab, has to show it gets the same answer. USP &lt;1224&gt; describes four ways to do it.</p>
        <ol className="ml-transfer">
          {TRANSFER.map((t, i) => (
            <li key={t.n}>
              <span className="sv-mono">{String(i + 1).padStart(2, "0")}</span>
              <strong>{t.n}</strong>
              <p>{t.when}</p>
              <p className="ml-crit"><em>Accepted when</em> {t.crit}</p>
            </li>
          ))}
        </ol>
        <h3 className="an-h3">Typical comparative-testing criteria</h3>
        <div className="sv-tablewrap">
          <table className="sv-table ml-table">
            <thead><tr><th>Test</th><th>Illustrative acceptance criterion</th></tr></thead>
            <tbody>{CRITERIA.map(r => <tr key={r[0]} style={{ "--row": "var(--chain-h)" }}><td><span className="sv-rowname">{r[0]}</span></td><td>{r[1]}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="vl-explain">Criteria are set from each method's known precision before testing starts, never adjusted after the data are in.</p>
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">Changing a method that is already filed.</h2>
        <ul className="an-list">
          <li>Assess the change against the analytical target profile and the established conditions.</li>
          <li>Run old and new methods side by side on representative lots, including stability and forced-degradation samples, so the new method is shown to see the same degradants.</li>
          <li>Show the reportable results are equivalent, or explain and justify any offset, including its effect on historical trends and specifications.</li>
          <li>File at the reporting category the change requires; a post-approval change management protocol (ICH Q12) can agree the plan in advance.</li>
        </ul>
      </section>
    </div>
  );
}
