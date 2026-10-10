import ForcedDegradation from "./ForcedDegradation";

/* Chapter: stability-indicating testing. Forced degradation first, then
   the formal programme under ICH Q5C, and how shelf life is assigned. */

const CONDITIONS = [
  ["Long-term", "5 °C ± 3 °C", "0, 3, 6, 9, 12, 18, 24, 36 months (and beyond to the claimed shelf life)", "Sets the shelf life"],
  ["Accelerated", "25 °C ± 2 °C / 60% RH", "0, 1, 3, 6 months", "Supports excursions and shows degradation pathways"],
  ["Stressed", "40 °C ± 2 °C / 75% RH", "0, 1, 2, 4 weeks", "Pathway understanding; not used for shelf-life claims"],
  ["Frozen DS", "−40 °C or below", "0, 3, 6, 12 months and annually", "Bulk drug substance hold time"],
  ["Photostability", "ICH Q1B", "One exposure", "Packaging and handling claims"],
];

const PANEL = [
  ["SEC", "Aggregates and fragments", "am-sec"],
  ["CE-SDS (NR and R)", "Covalent fragments and clips", "am-ce-sds"],
  ["icIEF or CEX", "Deamidation and other charge changes", "am-cief"],
  ["Relative potency", "Loss of function", "am-cell-bioassay"],
  ["Subvisible particles", "Particles from aggregation or polysorbate", "am-lo"],
  ["Appearance, pH", "Colour change, formulation drift", "am-general"],
  ["Polysorbate", "Surfactant degradation (DP)", "am-ps80"],
  ["CCI or sterility", "Integrity at the end of shelf life (DP)", "am-cci"],
];

export default function StabilityTesting({ dark, go, nav }) {
  return (
    <div className="stb">
      <section className="ch-sec" style={{ paddingTop: 0 }}>
        <h2 className="hm-h2">Break it on purpose first.</h2>
        <p className="an-prose">Forced degradation pushes the product hard enough to generate its degradants. Only then can you prove that each assay on the stability protocol actually detects them, which is what &ldquo;stability-indicating&rdquo; means.</p>
        <ForcedDegradation dark={dark} />
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">Then watch it age in real time.</h2>
        <p className="an-prose">For a biologic, ICH Q5C expects the shelf life to rest on real-time data at the intended storage condition. Accelerated data help explain what happens and support short excursions, but they do not replace real-time data.</p>
        <div className="sv-tablewrap">
          <table className="sv-table">
            <thead><tr><th>Study</th><th>Condition</th><th>Typical pulls</th><th>Purpose</th></tr></thead>
            <tbody>{CONDITIONS.map(r => <tr key={r[0]} style={{ "--row": "var(--chain-h)" }}><td><span className="sv-rowname">{r[0]}</span></td><td className="sv-mono">{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">The stability-indicating panel.</h2>
        <p className="an-prose">Not every release test goes on stability, only those that can change with time or that protect the patient at the end of shelf life.</p>
        <ul className="stb-panel">
          {PANEL.map(([n, what, id]) => (
            <li key={n}><button onClick={() => go("atlas/" + id)}><strong>{n}</strong><span>{what}</span></button></li>
          ))}
        </ul>
      </section>

      <section className="ch-sec">
        <h2 className="hm-h2">How the shelf life is assigned.</h2>
        <div className="stb-steps">
          <div><span className="sv-mono">01</span><strong>Fit the trend</strong><p>Regress each stability-indicating attribute against time for each lot (ICH Q1E), testing whether lots can be pooled.</p></div>
          <div><span className="sv-mono">02</span><strong>Add the uncertainty</strong><p>Use the one-sided 95% confidence limit of the mean trend, not the trend line itself.</p></div>
          <div><span className="sv-mono">03</span><strong>Find the crossing</strong><p>The shelf life is where that confidence limit meets the shelf-life specification, capped by the real-time data available.</p></div>
          <div><span className="sv-mono">04</span><strong>Keep watching</strong><p>Commit to continue the studies and to put annual lots on stability; trend each new point against the expected line.</p></div>
        </div>
        <p className="vl-explain">A point that is still inside the specification but off the expected trend is out of trend (OOT). It is investigated before it becomes an out-of-specification result; see the next chapter.</p>
        <div className="jn-next">
          <button className="hm-secondary" onClick={() => go("oos")}>Next: OOS, OOT and data integrity</button>
          {nav && <button className="hm-secondary" onClick={() => nav("stability")}>Open the Stability Studies module</button>}
        </div>
      </section>
    </div>
  );
}
