import { useState } from "react";

/* Reference standard programme: a two-tier lineage drawn on a timeline.
   Select a lot to see how it was made and qualified. */

const LOTS = [
  { id: "IRS", tier: "interim", t: 0.04, name: "Interim RS", src: "Phase 1 toxicology / clinical lot", qual: "Identity, purity and potency characterised; potency assigned 100% by definition.", note: "Used until a process representative of commercial manufacture exists." },
  { id: "PRS-1", tier: "primary", t: 0.3, name: "Primary RS lot 1", src: "Phase 3 lot made with the commercial process", qual: "Full characterisation panel: peptide map, intact mass, glycan, HOS, charge, size, potency against the interim RS.", note: "Bridged to the interim RS so clinical potency stays traceable." },
  { id: "WRS-1", tier: "working", t: 0.42, parent: "PRS-1", name: "Working RS lot 1", src: "Commercial-scale DS lot", qual: "Release panel plus side-by-side potency against PRS-1 (n ≥ 3 independent runs); assigned potency with confidence interval.", note: "Used for every routine release and stability assay." },
  { id: "WRS-2", tier: "working", t: 0.66, parent: "PRS-1", name: "Working RS lot 2", src: "Commercial DS lot", qual: "Same qualification protocol; acceptance criteria set before testing.", note: "Replaces WRS-1 before stock runs out, with overlap to confirm continuity." },
  { id: "PRS-2", tier: "primary", t: 0.78, parent: "PRS-1", name: "Primary RS lot 2", src: "Post-approval commercial lot", qual: "Bridged to PRS-1 with an extended panel; potency assigned from PRS-1.", note: "Planned years ahead: a primary standard change is a filed change in most regions." },
  { id: "WRS-3", tier: "working", t: 0.92, parent: "PRS-2", name: "Working RS lot 3", src: "Commercial DS lot", qual: "Qualified against PRS-2.", note: "The chain of traceability now runs WRS-3 → PRS-2 → PRS-1 → interim RS." },
];
const ROWS = { interim: 50, primary: 130, working: 210 };
const COL = { interim: "var(--text-muted)", primary: "var(--chain-h)", working: "var(--chain-l)" };

export default function ReferenceStandards() {
  const [sel, setSel] = useState("WRS-1");
  const W = 900, X = (t) => 60 + t * (W - 100);
  const lot = LOTS.find(l => l.id === sel);
  const byId = Object.fromEntries(LOTS.map(l => [l.id, l]));
  return (
    <div className="rs">
      <svg viewBox={`0 0 ${W} 260`} className="rs-tree" role="img" aria-label="Reference standard lineage over the product lifecycle">
        {Object.entries(ROWS).map(([k, y]) => <g key={k}><line x1="60" x2={W - 40} y1={y} y2={y} stroke="var(--hairline)" />
          <text x="54" y={y + 4} textAnchor="end" fontSize="11.5" fontWeight="700" fill="var(--text-sec)">{k[0].toUpperCase() + k.slice(1)}</text></g>)}
        {LOTS.map(l => {
          const par = l.parent ? byId[l.parent] : l.id === "PRS-1" ? byId.IRS : null;
          if (!par) return null;
          return <path key={"e" + l.id} d={`M${X(par.t)},${ROWS[par.tier]} C${X(par.t) + 40},${ROWS[par.tier]} ${X(l.t) - 40},${ROWS[l.tier]} ${X(l.t)},${ROWS[l.tier]}`}
            fill="none" stroke="var(--border-bright)" strokeWidth="1.6" className="rs-edge" />;
        })}
        {LOTS.map(l => { const on = sel === l.id;
          return (
            <g key={l.id} className="lc-node" tabIndex={0} role="button" aria-pressed={on} onClick={() => setSel(l.id)}
              onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(l.id); } }}>
              <circle cx={X(l.t)} cy={ROWS[l.tier]} r={on ? 12 : 9} fill={on ? COL[l.tier] : "var(--bg-base)"} stroke={COL[l.tier]} strokeWidth="2.5" />
              <text x={X(l.t)} y={ROWS[l.tier] - 18} textAnchor="middle" fontSize="11" fontWeight="700" fill={on ? "var(--text-h)" : "var(--text-sec)"} className="sv-mono">{l.id}</text>
            </g>
          ); })}
        {[["Phase 1", 0.04], ["Phase 3", 0.3], ["Approval", 0.5], ["Lifecycle", 0.85]].map(([l, t]) => <text key={l} x={X(t)} y="250" textAnchor="middle" fontSize="10.5" fill="var(--text-faint)" className="sv-mono">{l}</text>)}
      </svg>

      <div className="rs-detail" key={sel}>
        <h2 className="an-abbr rs-name">{lot.name}</h2>
        <dl className="am-wwd">
          <div><dt>Made from</dt><dd>{lot.src}</dd></div>
          <div><dt>Qualified by</dt><dd>{lot.qual}</dd></div>
          <div><dt>Why it matters</dt><dd>{lot.note}</dd></div>
        </dl>
      </div>

      <div className="rs-rules">
        <h3 className="an-h3">Programme essentials</h3>
        <ul className="an-list">
          <li>Two tiers: a primary standard, used sparingly, and working standards qualified against it for routine testing.</li>
          <li>Each standard has its own stability programme and re-test date, stored at −70 °C or below in single-use aliquots.</li>
          <li>Potency is assigned, not measured once: several independent runs against the parent, reported with a confidence interval.</li>
          <li>Qualification protocols and acceptance criteria are approved before the new lot is tested.</li>
          <li>Quantities are planned from assay consumption so a replacement is qualified well before the current lot runs out.</li>
        </ul>
      </div>
    </div>
  );
}
