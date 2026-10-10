import { useState } from "react";
import { mean, sd, tInv, rng, fmt } from "./stats";

/* ICH Q5E comparability, tiered statistical approach (as used in FDA
   biosimilar and process-change assessments):
   Tier 1  equivalence test (TOST) on the highest-risk attribute
   Tier 2  quality range: post-change lots within ref mean ± 3 SD
   Tier 3  side-by-side visual comparison of profiles */

const W = 900, P = { l: 40, r: 16 };

export default function Comparability() {
  const [shift, setShift] = useState(0.4);      // post-change mean shift, in reference SD units
  const [ratio, setRatio] = useState(1.0);      // post-change variability vs reference
  const [nTest, setNTest] = useState(6);
  const [seed, setSeed] = useState(21);

  const R = rng(seed);
  const refMu = 100, refSd = 6;                  // relative potency, %
  const ref = Array.from({ length: 10 }, () => refMu + refSd * R.n());
  const test = Array.from({ length: nTest }, () => refMu + shift * refSd + ratio * refSd * R.n());
  const mr = mean(ref), mt = mean(test), sr = sd(ref), st = sd(test);
  const margin = 1.5 * sr;
  const se = Math.sqrt(sr ** 2 / ref.length + st ** 2 / test.length);
  const dfW = se ** 4 / ((sr ** 2 / ref.length) ** 2 / (ref.length - 1) + (st ** 2 / test.length) ** 2 / (test.length - 1));
  const tq = tInv(0.95, dfW);
  const diff = mt - mr, ciLo = diff - tq * se, ciHi = diff + tq * se;
  const t1 = ciLo > -margin && ciHi < margin;
  const qrLo = mr - 3 * sr, qrHi = mr + 3 * sr;
  const inQR = test.filter(v => v >= qrLo && v <= qrHi).length;
  const t2 = inQR / test.length >= 0.9;

  // Tier 1 scale
  const span = Math.max(margin * 1.6, Math.abs(ciLo) * 1.2, Math.abs(ciHi) * 1.2);
  const X1 = (v) => P.l + ((v + span) / (2 * span)) * (W - P.l - P.r);
  // Tier 2 scale
  const all = [...ref, ...test, qrLo, qrHi];
  const lo2 = Math.min(...all) - 3, hi2 = Math.max(...all) + 3;
  const X2 = (v) => P.l + ((v - lo2) / (hi2 - lo2)) * (W - P.l - P.r);

  // Tier 3: charge-variant profiles, post-change acidic shift scales with `shift`
  const prof = (acidic) => { let d = ""; for (let i = 0; i <= 300; i++) { const x = i / 300;
    const y = acidic * Math.exp(-0.5 * ((x - 0.36) / 0.04) ** 2) + 0.68 * Math.exp(-0.5 * ((x - 0.5) / 0.035) ** 2) + 0.14 * Math.exp(-0.5 * ((x - 0.62) / 0.04) ** 2);
    d += `${i ? "L" : "M"}${(P.l + x * (W - P.l - P.r)).toFixed(1)},${(150 - y * 190).toFixed(1)}`; } return d; };

  return (
    <div className="cp">
      <div className="cp-knobs">
        <label className="vl-slider"><span>Post-change mean shift<b className="sv-mono">{shift.toFixed(2)} SD</b></span><input type="range" min="-2" max="2" step="0.05" value={shift} onChange={e => setShift(+e.target.value)} /></label>
        <label className="vl-slider"><span>Post-change variability<b className="sv-mono">{ratio.toFixed(2)}× ref</b></span><input type="range" min="0.5" max="2.5" step="0.05" value={ratio} onChange={e => setRatio(+e.target.value)} /></label>
        <label className="vl-slider"><span>Post-change lots<b className="sv-mono">{nTest}</b></span><input type="range" min="3" max="15" value={nTest} onChange={e => setNTest(+e.target.value)} /></label>
        <button className="hm-secondary" onClick={() => setSeed(v => v + 1)}>New lots</button>
      </div>

      <section className="cp-tier">
        <div className="cp-tier-head">
          <h2 className="an-h3">Tier 1: equivalence test on relative potency</h2>
          <span className={`vl-verdict ${t1 ? "is-pass" : "is-fail"}`}>{t1 ? "Equivalent" : "Not shown equivalent"}</span>
        </div>
        <svg viewBox={`0 0 ${W} 110`} className="cp-plot" role="img" aria-label="90% confidence interval of the mean difference against the equivalence margin">
          <rect x={X1(-margin)} width={X1(margin) - X1(-margin)} y="18" height="58" fill="color-mix(in srgb, var(--ok) 10%, transparent)" />
          <line x1={X1(-margin)} x2={X1(-margin)} y1="12" y2="82" stroke="var(--ok)" strokeDasharray="4 3" />
          <line x1={X1(margin)} x2={X1(margin)} y1="12" y2="82" stroke="var(--ok)" strokeDasharray="4 3" />
          <line x1={X1(0)} x2={X1(0)} y1="12" y2="82" stroke="var(--border-bright)" />
          <line x1={X1(ciLo)} x2={X1(ciHi)} y1="47" y2="47" stroke={t1 ? "var(--chain-h)" : "var(--bad)"} strokeWidth="4" strokeLinecap="round" className="cp-ci" />
          <circle cx={X1(diff)} cy="47" r="7" fill="var(--bg-base)" stroke={t1 ? "var(--chain-h)" : "var(--bad)"} strokeWidth="3" className="cp-ci" />
          <text x={X1(-margin)} y="98" textAnchor="middle" fontSize="11" fill="var(--ok)" className="sv-mono">−{fmt(margin, 1)}</text>
          <text x={X1(margin)} y="98" textAnchor="middle" fontSize="11" fill="var(--ok)" className="sv-mono">+{fmt(margin, 1)}</text>
          <text x={X1(0)} y="98" textAnchor="middle" fontSize="11" fill="var(--text-faint)" className="sv-mono">0</text>
          <text x={P.l} y="14" fontSize="10.5" fill="var(--text-faint)" className="sv-mono">mean difference, post − pre (% RP)</text>
        </svg>
        <p className="vl-explain">
          Margin = 1.5 × reference SD = ±{fmt(margin, 2)}. The 90% CI of the difference (Welch, df ≈ {fmt(dfW, 1)}) is [{fmt(ciLo, 2)}, {fmt(ciHi, 2)}].
          Equivalence needs the whole interval inside the margin, which is two one-sided tests at α = 0.05. A small, real shift can pass; too few lots widen the interval until even a perfect process fails.
        </p>
      </section>

      <section className="cp-tier">
        <div className="cp-tier-head">
          <h2 className="an-h3">Tier 2: quality range on the same lots</h2>
          <span className={`vl-verdict ${t2 ? "is-pass" : "is-fail"}`}>{inQR} of {test.length} within range</span>
        </div>
        <svg viewBox={`0 0 ${W} 120`} className="cp-plot" role="img" aria-label="Pre- and post-change lots against the quality range">
          <rect x={X2(qrLo)} width={X2(qrHi) - X2(qrLo)} y="10" height="84" fill="color-mix(in srgb, var(--chain-h) 8%, transparent)" />
          <text x={X2(qrLo) + 4} y="22" fontSize="10.5" fill="var(--chain-h)" className="sv-mono">reference mean ± 3 SD</text>
          {ref.map((v, i) => <circle key={"r" + i} cx={X2(v)} cy={44} r="5.5" fill="var(--text-muted)" />)}
          {test.map((v, i) => <circle key={"t" + i} cx={X2(v)} cy={74} r="5.5" fill={v >= qrLo && v <= qrHi ? "var(--chain-l)" : "var(--bad)"} className="th-pop" />)}
          <text x={P.l} y="48" fontSize="10.5" fill="var(--text-sec)" className="sv-mono">pre</text>
          <text x={P.l} y="78" fontSize="10.5" fill="var(--text-sec)" className="sv-mono">post</text>
        </svg>
        <p className="vl-explain">Tier 2 is for moderate-risk attributes. The usual expectation is that a high proportion of post-change lots, often 90%, fall within the quality range. It is less powerful than Tier 1 but works with fewer lots.</p>
      </section>

      <section className="cp-tier">
        <div className="cp-tier-head">
          <h2 className="an-h3">Tier 3: visual comparison of cIEF profiles</h2>
          <span className="cp-legend"><i style={{ background: "var(--text-muted)" }} />pre-change <i style={{ background: "var(--chain-l)" }} />post-change</span>
        </div>
        <svg viewBox={`0 0 ${W} 160`} className="cp-plot" role="img" aria-label="Overlay of pre- and post-change charge profiles">
          <path d={prof(0.2)} fill="none" stroke="var(--text-muted)" strokeWidth="2" />
          <path d={prof(0.2 + shift * 0.06)} fill="none" stroke="var(--chain-l)" strokeWidth="2" strokeDasharray="6 3" />
          <text x={P.l + 0.36 * (W - P.l - P.r)} y="152" textAnchor="middle" fontSize="10.5" fill="var(--text-faint)" className="sv-mono">acidic</text>
          <text x={P.l + 0.5 * (W - P.l - P.r)} y="152" textAnchor="middle" fontSize="10.5" fill="var(--text-faint)" className="sv-mono">main</text>
          <text x={P.l + 0.62 * (W - P.l - P.r)} y="152" textAnchor="middle" fontSize="10.5" fill="var(--text-faint)" className="sv-mono">basic</text>
        </svg>
        <p className="vl-explain">Tier 3 covers attributes where statistics add little: chromatographic and spectral fingerprints, glycan maps, HOS. Reviewers expect new peaks to be absent and existing peaks to match in position and shape; any difference must be explained.</p>
      </section>
    </div>
  );
}
