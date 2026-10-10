/* Chapter: when a result fails (FDA 2006 OOS guidance), trending (OOT)
   and the data integrity expectations behind every reported number. */

const TERMS = [
  ["Out of specification (OOS)", "A reportable result outside the approved acceptance criterion. It triggers a formal investigation."],
  ["Out of trend (OOT)", "Still within specification, but inconsistent with the expected trend for that lot or attribute. Investigated so it never becomes an OOS."],
  ["Atypical result", "Within specification and trend, but unusual for the method: an odd peak shape, a new small peak. Recorded and assessed."],
  ["Invalid run", "A run that failed its own system suitability or assay validity criteria. It produces no reportable result and is not an OOS."],
];

const PHASES = [
  { n: "Phase I: laboratory investigation", p: "The analyst and supervisor check, without retesting first, whether the result is explained by a laboratory error: calculation, instrument, standards, sample preparation, the method as executed. Original preparations are kept until this is done.", out: "If a clear, documented assignable cause is found, the result can be invalidated and the test repeated." },
  { n: "Phase II: full-scale investigation", p: "If no laboratory error is found, the investigation widens to manufacturing: batch records, deviations, equipment and other lots. Retesting by a second analyst may be done under a written protocol; resampling only when the original sample is shown to be compromised.", out: "A conclusion on whether the batch fails, with root cause and CAPA, and an assessment of other affected lots." },
];

const RULES = [
  "No testing into compliance: you cannot keep retesting until a passing result appears and report only that one.",
  "Do not average an OOS result with passing results to hide it; averaging is only allowed where the method itself defines the reportable result as an average.",
  "Outlier tests are generally not used to discard chemical test results; they may be applied to highly variable biological assays if the procedure allows it.",
  "Every result, including invalidated ones, stays in the record with the reason it was invalidated.",
];

const ALCOA = [
  ["Attributable", "Who did it and when, recorded by the system"],
  ["Legible", "Readable and permanent"],
  ["Contemporaneous", "Recorded at the time the work was done"],
  ["Original", "The first record, or a verified true copy"],
  ["Accurate", "Correct, with changes traceable in the audit trail"],
  ["Complete", "All data, including repeats and invalid runs"],
  ["Consistent", "In the expected sequence, with time stamps that make sense"],
  ["Enduring", "Retained for the required period"],
  ["Available", "Retrievable for review and inspection"],
];

const FINDINGS = [
  "Trial or 'test' injections run before the official sequence and not reported",
  "Shared logins, so actions cannot be attributed to a person",
  "Audit trails switched off, or never reviewed",
  "Chromatograms reprocessed until a peak passes, without justification",
  "Results deleted or overwritten, with only the final value kept",
];

export default function OosIntegrity({ nav }) {
  return (
    <div className="oi">
      <section className="ch-sec" style={{ paddingTop: 0 }}>
        <h2 className="hm-h2">Four words that are not the same.</h2>
        <dl className="st-rows">{TERMS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">When a result fails.</h2>
        <p className="an-prose">FDA's guidance on investigating OOS results (2006, revised 2022), written after the 1993 Barr Laboratories ruling, sets out a two-phase investigation. Its purpose is to find the truth about the batch, not to find a passing number.</p>
        <ol className="oi-phases">
          {PHASES.map((ph, i) => (
            <li key={ph.n}>
              <span className="sv-mono">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <strong>{ph.n}</strong>
                <p>{ph.p}</p>
                <p className="ml-crit"><em>Outcome</em> {ph.out}</p>
              </div>
            </li>
          ))}
        </ol>
        <h3 className="an-h3">Rules that are easy to break</h3>
        <ul className="an-list">{RULES.map(r => <li key={r}>{r}</li>)}</ul>
        {nav && <div className="jn-next"><button className="hm-secondary" onClick={() => nav("oos")}>Walk through a full OOS investigation</button></div>}
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">Catching drift before it fails.</h2>
        <p className="an-prose">OOT detection compares each new result with what was expected. Common approaches are a regression control chart (is the new stability point within the prediction interval of the lot's trend?), a by-time-point method (is it within the range of other lots at the same time point?), and a slope comparison (is this lot degrading faster than the others?). The rules and limits are written in a procedure before they are needed.</p>
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">Every number has to be trustworthy.</h2>
        <p className="an-prose">Data integrity expectations (21 CFR Part 11, EU GMP Annex 11, FDA's 2018 data integrity guidance) are summarised as ALCOA+. In an analytical lab they apply most of all to chromatography data systems.</p>
        <ul className="oi-alcoa">{ALCOA.map(([k, v]) => <li key={k}><strong>{k}</strong><span>{v}</span></li>)}</ul>
        <h3 className="an-h3">What inspectors find most often in QC labs</h3>
        <ul className="an-list">{FINDINGS.map(r => <li key={r}>{r}</li>)}</ul>
      </section>
    </div>
  );
}
