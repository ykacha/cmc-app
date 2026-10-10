import { PROVENANCE } from "./product";
import { EVIDENCE } from "./journey";

/* Shared Science primitives. */

// Labels every example value with where it comes from.
export function ProvTag({ p }) {
  const d = PROVENANCE[p];
  if (!d) return null;
  return <span className={`sc-prov sc-prov-${p}`} title={d.note}>{d.label}</span>;
}

// A CTD section reference with its evidence status for the fictional programme.
export function CtdChip({ s, status, title }) {
  return (
    <span className={`sc-ctd sc-ev-${status || "none"}`} title={`${title ? title + ": " : ""}${EVIDENCE[status || "none"].label}`}>
      <span className="sv-mono">{s}</span>
      {status && <em>{EVIDENCE[status].label}</em>}
    </span>
  );
}

export function EvidenceLegend() {
  return (
    <div className="sc-ev-legend" aria-label="Evidence status legend">
      {Object.entries(EVIDENCE).map(([k, v]) => <span key={k} className={`sc-ev-${k}`}><i />{v.label}</span>)}
    </div>
  );
}

export function ProvLegend() {
  return (
    <div className="sc-prov-legend">
      {Object.entries(PROVENANCE).map(([k, v]) => <span key={k}><ProvTag p={k} /><em>{v.note}</em></span>)}
    </div>
  );
}
