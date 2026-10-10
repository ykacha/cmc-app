import { useMemo, useState } from "react";
import Molecule, { STRESSES } from "../../molecule";

/* Forced degradation: which stress produces which degradant, and which assay
   proves it is stability-indicating. Rows drive the molecule highlight. */

const METHODS = [
  { id: "am-sec", n: "SEC" }, { id: "am-ce-sds", n: "CE-SDS" }, { id: "am-iex", n: "CEX / icIEF" },
  { id: "am-peptide-map", n: "Peptide map" }, { id: "am-cell-bioassay", n: "Potency" }, { id: "am-mfi", n: "Particles" },
];
const hitOf = (id) => STRESSES.find(s => s.id === id)?.hit;

// 2 = primary readout, 1 = also changes, 0 = not expected
const ROWS = [
  { id: "heat", name: "Thermal", cond: "40 °C, 2–4 weeks", path: "Aggregation through CH2 unfolding; fragmentation; accelerated deamidation.", cells: [2, 1, 1, 1, 1, 1], hit: hitOf("heat") },
  { id: "acid", name: "Low pH", cond: "pH 3.0–3.5, 37 °C, hours to days", path: "Hinge and Asp-Pro clipping; Asp isomerisation; aggregation on neutralisation.", cells: [1, 2, 1, 1, 0, 0], hit: hitOf("acid") },
  { id: "base", name: "High pH", cond: "pH 8–9, 37 °C, 1–2 weeks", path: "Asn deamidation in the CDRs and Fc, raising acidic variants; possible loss of binding.", cells: [0, 0, 2, 2, 1, 0], hit: hitOf("base") },
  { id: "light", name: "Light", cond: "ICH Q1B, 1.2M lux·h + 200 W·h/m² UV", path: "Met and Trp oxidation, aggregation, colour change.", cells: [1, 0, 1, 2, 1, 0], hit: hitOf("light") },
  { id: "ox", name: "Oxidation", cond: "0.01–0.1% H₂O₂ or tBHP, room temp, hours", path: "Met252 / Met428 oxidation, cutting FcRn binding and half-life.", cells: [0, 0, 1, 2, 1, 0], hit: (b) => b.metox },
  { id: "agit", name: "Agitation", cond: "Orbital shaking, 24–72 h", path: "Interface-driven aggregates and subvisible particles.", cells: [2, 0, 0, 0, 0, 2], hit: hitOf("agit") },
  { id: "ft", name: "Freeze–thaw", cond: "5 cycles, −70 °C to room temp", path: "Cryoconcentration and ice-interface aggregation.", cells: [2, 0, 0, 0, 0, 2], hit: (b) => b.group === "fc" && b.p[1] > -6.2 },
];

export default function ForcedDegradation({ dark }) {
  const [sel, setSel] = useState("heat");
  const row = ROWS.find(r => r.id === sel);
  const hit = useMemo(() => row.hit, [row]);
  return (
    <div className="fd">
      <div className="fd-top">
        <div className="fd-mol"><Molecule dark={dark} hit={hit} labels={false} /></div>
        <div className="fd-copy" key={sel}>
          <h2 className="an-abbr fd-name">{row.name}</h2>
          <p className="hm-cond sv-mono">{row.cond}</p>
          <p className="an-prose">{row.path}</p>
          <p className="vl-explain">
            Target 5–20% degradation: enough to generate the degradants, not so much that secondary products confuse the picture.
            A method is stability-indicating when it resolves and quantifies these degradants from the intact product, which is what this study proves.
          </p>
        </div>
      </div>

      <div className="sv-tablewrap">
        <table className="sv-table fd-table">
          <thead><tr><th>Stress</th>{METHODS.map(m => <th key={m.id}>{m.n}</th>)}</tr></thead>
          <tbody>
            {ROWS.map(r => (
              <tr key={r.id} className={sel === r.id ? "is-on" : ""} style={{ "--row": "var(--glycan)" }} tabIndex={0} aria-selected={sel === r.id}
                onClick={() => setSel(r.id)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(r.id); } }}>
                <td><span className="sv-rowname">{r.name}</span></td>
                {r.cells.map((c, i) => <td key={i} className="q2-cell">{c === 2 ? <span className="fd-c2" title="primary readout">primary</span> : c === 1 ? <span className="fd-c1" title="also changes">changes</span> : <span className="q2-no" aria-label="not expected" />}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="vl-explain">Forced degradation sits in CTD 3.2.S.3 and is expected before Phase 3 at the latest. It informs formulation, the specification list, and which assays go on the stability protocol.</p>
    </div>
  );
}
