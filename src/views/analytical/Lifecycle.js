import { useState } from "react";

/* ICH Q14 analytical procedure lifecycle as a loop; select a stage to read
   what it produces. Static by design: the loop is the information. */

const STAGES = [
  { id: "atp", n: "Analytical target profile", what: "States what the procedure must measure and how well, before any method is chosen.",
    out: "Example for SEC: quantify %HMW in drug substance from 0.5 to 5.0% with accuracy within ±20% relative and precision ≤ 10% RSD, resolving HMW from monomer (Rs ≥ 1.5).",
    reg: "ICH Q14 §3. The ATP links the procedure to the CQA and to the specification it supports." },
  { id: "risk", n: "Risk assessment", what: "Ranks the method parameters that could affect the result: sample prep, column, mobile phase, instrument, analyst.",
    out: "Ishikawa diagram and FMEA; a shortlist of parameters for experimental study.", reg: "ICH Q9 tools applied to the procedure." },
  { id: "dev", n: "Development and robustness", what: "Designed experiments map how the high-risk parameters move the reportable result.",
    out: "Proven acceptable ranges, or a method operable design region (MODR) under the enhanced approach.", reg: "ICH Q14 §4 enhanced approach; robustness is now expected during development, not validation." },
  { id: "acs", n: "Analytical control strategy", what: "Fixes set points, ranges and the checks that protect every run.",
    out: "System suitability criteria, sample-prep controls, reference standard and control-sample requirements.", reg: "Established conditions (ICH Q12) can be proposed here." },
  { id: "val", n: "Validation", what: "Demonstrates the procedure is fit for the ATP across the reportable range.",
    out: "Specificity, accuracy, precision, linearity/range, LOQ where relevant (ICH Q2(R2)).", reg: "Phase-appropriate: qualification in early phases, full validation before the BLA." },
  { id: "transfer", n: "Transfer", what: "Moves the procedure to QC or a contract lab with evidence that results agree.",
    out: "Comparative testing with pre-set equivalence criteria, co-validation, or a transfer waiver with justification.", reg: "USP <1224>." },
  { id: "monitor", n: "Routine monitoring", what: "Trends SST results, control samples and invalid-run rates to catch drift.",
    out: "Continued procedure performance verification; triggers for investigation.", reg: "Part of the pharmaceutical quality system (ICH Q10)." },
  { id: "change", n: "Change management", what: "Assesses changes against the ATP and established conditions, and files them at the right reporting category.",
    out: "Bridging data; a post-approval change management protocol (PACMP) for planned changes.", reg: "ICH Q12 / Q14: a change within the MODR may need no prior approval." },
];

export default function Lifecycle() {
  const [sel, setSel] = useState("atp");
  const n = STAGES.length, C = 260, Rr = 190;
  const pos = (i) => { const th = -Math.PI / 2 + (i / n) * Math.PI * 2; return [C + Rr * Math.cos(th), C + Rr * Math.sin(th)]; };
  const st = STAGES.find(s => s.id === sel);

  return (
    <div className="lc">
      <div className="lc-grid">
        <svg viewBox="-170 -20 860 560" className="lc-loop" role="img" aria-label="Analytical procedure lifecycle loop">
          <circle cx={C} cy={C} r={Rr} fill="none" stroke="var(--hairline)" strokeWidth="2" />
          <text x={C} y={C - 6} textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--text-h)" style={{ fontStretch: "115%" }}>ICH Q14</text>
          <text x={C} y={C + 14} textAnchor="middle" fontSize="11" fill="var(--text-muted)">procedure lifecycle</text>
          {STAGES.map((s, i) => { const [x, y] = pos(i), on = sel === s.id;
            return (
              <g key={s.id} className="lc-node" tabIndex={0} role="button" aria-pressed={on} onClick={() => setSel(s.id)}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(s.id); } }}>
                <circle cx={x} cy={y} r={on ? 13 : 10} fill={on ? "var(--chain-h)" : "var(--bg-base)"} stroke={on ? "var(--chain-h)" : "var(--border-bright)"} strokeWidth="2" />
                <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill={on ? "#fff" : "var(--text-muted)"} className="sv-mono">{i + 1}</text>
                <text x={x + (x > C + 5 ? 20 : x < C - 5 ? -20 : 0)} y={y + (Math.abs(x - C) < 5 ? (y < C ? -20 : 28) : 4)} textAnchor={x > C + 5 ? "start" : x < C - 5 ? "end" : "middle"}
                  fontSize="12.5" fontWeight={on ? 800 : 600} fill={on ? "var(--text-h)" : "var(--text-sec)"}>{s.n}</text>
              </g>
            ); })}
        </svg>
        <div className="lc-detail" key={sel}>
          <h2 className="an-abbr lc-name">{st.n}</h2>
          <p className="an-prose">{st.what}</p>
          <h3 className="an-h3">What it produces</h3>
          <p className="an-prose">{st.out}</p>
          <h3 className="an-h3">Regulatory basis</h3>
          <p className="an-prose an-reg">{st.reg}</p>
        </div>
      </div>

    </div>
  );
}
