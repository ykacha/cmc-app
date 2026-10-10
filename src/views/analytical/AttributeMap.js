import { useMemo, useState } from "react";
import Molecule from "../../molecule";
import { QUALITY_ATTRIBUTES, CQA_METHODS, ATTR_GROUPS } from "../../analytical-data";
import { ANALYTICAL_METHODS } from "../../extra-data";

const byId = Object.fromEntries(ANALYTICAL_METHODS.map(m => [m.id, m]));

// Where each attribute physically lives on an IgG1 (coarse-grained bead groups from molecule.js)
const REGION = {
  agg: { hit: b => b.group === "fc" && b.p[1] > -6.2, where: "CH2 domains: the least stable, first to unfold and seed aggregates" },
  frag: { hit: b => b.group === "hinge", where: "Hinge: the most protease- and acid-labile stretch" },
  charge: { hit: b => b.cdr || (b.group === "fc" && b.p[1] < -8.4), where: "CDRs (deamidation) and the heavy-chain C-terminus (lysine clipping)" },
  glycan: { hit: b => b.group === "glycan", where: "N297 glycans in the CH2 cavity" },
  ox: { hit: b => b.metox || b.cdr, where: "Met252 / Met428 at the CH2–CH3 interface, Trp in the CDRs" },
  deam: { hit: b => b.cdr, where: "Asn-Gly motifs in the complementarity-determining regions" },
  seq: { hit: b => b.group !== "glycan", where: "Every residue of both chains" },
  hos: { hit: b => b.group === "fab" || b.group === "fc", where: "The folded Ig domains: β-sandwich structure of every domain" },
  ds: { hit: b => b.role === "bridge", where: "Inter-chain disulfides in the hinge and at the CH1–CL junction" },
  potency: { hit: b => b.group === "fab", where: "Antigen binding at the Fab tips, effector function through the Fc" },
  identity: { hit: b => b.group !== "glycan", where: "The whole molecule, against the reference standard" },
  conc: { hit: b => true, where: "The whole molecule" },
  particles: { hit: b => b.group === "fc", where: "Exposed hydrophobic patches that nucleate particles" },
};
const IMPURITY = new Set(["hcp", "resdna", "resproa", "endo"]);
const ROLE_ORDER = ["primary", "orthogonal", "supporting"];
const ROLE_LINE = { primary: "Primary: the release or workhorse assay", orthogonal: "Orthogonal: a different physical principle that confirms it", supporting: "Supporting: screening or characterization only" };

export default function AttributeMap({ item, go, dark }) {
  const [sel, setSel] = useState(item && CQA_METHODS[item] ? item : "agg");
  const q = QUALITY_ATTRIBUTES.find(x => x.id === sel);
  const reg = REGION[sel];
  const hit = useMemo(() => (reg ? reg.hit : () => false), [reg]);
  const methods = CQA_METHODS[sel]?.methods || [];
  const groups = useMemo(() => {
    const out = {};
    QUALITY_ATTRIBUTES.forEach(a => { (out[a.group] = out[a.group] || []).push(a); });
    return out;
  }, []);

  return (
    <div className="am">
      <nav className="am-list" aria-label="Quality attributes">
        {Object.entries(groups).map(([gname, list]) => (
          <div key={gname} className="am-group">
            <div className="am-gname">{gname}</div>
            {list.map(a => (
              <button key={a.id} className={`am-item${sel === a.id ? " is-on" : ""}`} aria-pressed={sel === a.id} onClick={() => setSel(a.id)}>
                <span>{a.name}</span>
                <span className={`am-risk am-risk-${a.risk.toLowerCase()}`}>{a.risk}</span>
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="am-stage">
        <div className="am-mol">
          {IMPURITY.has(sel) ? (
            <div className="am-impurity">
              <strong>Not part of the molecule.</strong>
              <span>{q.name} is a process-related impurity carried over from the cell line or purification. It is measured in the drug substance, not located on the antibody.</span>
            </div>
          ) : <Molecule dark={dark} hit={hit} labels={false} />}
          {reg && !IMPURITY.has(sel) && <p className="am-where"><span className="th-dot" style={{ background: "var(--glycan)" }} />{reg.where}</p>}
        </div>

        <div className="am-detail" key={sel}>
          <h2 className="an-abbr am-name">{q.name}</h2>
          <p className="an-chiprow"><span className="sv-chip" style={{ "--chip": ATTR_GROUPS[q.group]?.color }}>{q.group}</span><span className="sv-chip" style={{ "--chip": q.risk === "High" ? "var(--glycan)" : "var(--chain-l)" }}>{q.risk} risk</span></p>
          <dl className="am-wwd">
            <div><dt>What it is</dt><dd>{q.what}</dd></div>
            <div><dt>Why it matters</dt><dd>{q.why}</dd></div>
            <div><dt>What drives it</dt><dd>{q.drivers}</dd></div>
          </dl>
          {CQA_METHODS[sel]?.ortho && <p className="an-prose an-pearl">{CQA_METHODS[sel].ortho}</p>}
          {ROLE_ORDER.map(role => {
            const ms = methods.filter(m => m.role === role);
            if (!ms.length) return null;
            return (
              <div key={role} className="am-role">
                <h3 className="an-h3">{ROLE_LINE[role]}</h3>
                {ms.map(m => (
                  <button key={m.m} className="am-method" onClick={() => go("atlas/" + m.m)}>
                    <strong>{byId[m.m]?.abbreviation}</strong>
                    <span>{m.note}</span>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
