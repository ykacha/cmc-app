import { useState } from "react";
import { mean, sd, tolK, rng, fmt } from "./stats";

/* Setting a specification from data: SEC monomer purity (lower limit only).
   Tolerance interval from batch history, projected stability loss over shelf
   life, and analytical variability give the shelf-life and release limits. */

const W = 900, H = 260, PL = 46, PR = 16, PT = 18, PB = 36;

export default function Specifications() {
  const [n, setN] = useState(10);
  const [mu, setMu] = useState(98.6);
  const [sigma, setSigma] = useState(0.25);
  const [rate, setRate] = useState(0.04);     // % monomer lost per month at 2–8 °C
  const [shelf, setShelf] = useState(36);
  const [asd, setAsd] = useState(0.15);       // analytical SD
  const [seed, setSeed] = useState(3);

  const R = rng(seed);
  const lots = Array.from({ length: n }, () => mu + sigma * R.n());
  const m = mean(lots), s = sd(lots), k = tolK(n, 0.99, 0.95);
  const tiLo = m - k * s;
  const loss = rate * shelf;
  const shelfLimit = Math.floor((tiLo - loss) * 2) / 2;          // rounded down to 0.5%
  const releaseLimit = shelfLimit + loss + 2 * asd;
  const failRelease = lots.filter(v => v < releaseLimit).length;
  const minLot = Math.min(...lots);

  const lo = Math.min(shelfLimit - 0.5, tiLo - 0.3, minLot - 0.3), hi = 100;
  const X = (v) => PL + ((v - lo) / (hi - lo)) * (W - PL - PR);
  const ticks = []; for (let v = Math.ceil(lo); v <= hi; v += 1) ticks.push(v);
  const curve = []; for (let i = 0; i <= 200; i++) { const v = lo + (i / 200) * (hi - lo); curve.push([X(v), H - PB - 120 * Math.exp(-0.5 * ((v - m) / s) ** 2)]); }

  // stability projection inset
  const SW = 420, SH = 200, sx = (t) => 40 + (t / shelf) * (SW - 56), sy = (v) => SH - 30 - ((v - (shelfLimit - 0.4)) / (releaseLimit + 0.6 - (shelfLimit - 0.4))) * (SH - 50);

  return (
    <div className="sp">
      <div className="sp-grid">
        <div className="sp-plot">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Lot results, tolerance interval and proposed limits">
            <rect x={X(lo)} width={X(shelfLimit) - X(lo)} y={PT} height={H - PT - PB} fill="color-mix(in srgb, var(--bad) 8%, transparent)" />
            {ticks.map(t => <g key={t}><line x1={X(t)} x2={X(t)} y1={H - PB} y2={H - PB + 4} stroke="var(--border-bright)" />
              <text x={X(t)} y={H - PB + 16} textAnchor="middle" fontSize="11" fill="var(--text-faint)" className="sv-mono">{t}</text></g>)}
            <line x1={PL} x2={W - PR} y1={H - PB} y2={H - PB} stroke="var(--border-bright)" />
            <text x={W - PR} y={H - 4} textAnchor="end" fontSize="10.5" fill="var(--text-faint)" className="sv-mono">SEC monomer (%)</text>
            <path d={curve.map((q, i) => `${i ? "L" : "M"}${q[0].toFixed(1)},${q[1].toFixed(1)}`).join("")} fill="none" stroke="var(--chain-h)" strokeWidth="1.4" opacity=".6" />
            {/* tolerance interval bracket */}
            <line x1={X(tiLo)} x2={X(Math.min(hi, m + k * s))} y1={PT + 26} y2={PT + 26} stroke="var(--chain-h)" strokeWidth="2" />
            <line x1={X(tiLo)} x2={X(tiLo)} y1={PT + 20} y2={PT + 32} stroke="var(--chain-h)" strokeWidth="2" />
            <text x={X(tiLo) + 6} y={PT + 20} fontSize="11" fill="var(--chain-h)" className="sv-mono">99/95 tolerance interval, k = {fmt(k, 2)}</text>
            {/* limits */}
            {[["Shelf-life limit", shelfLimit, "var(--bad)"], ["Release limit", releaseLimit, "var(--chain-l)"]].map(([l, v, c], i) => (
              <g key={l} className="sp-limit">
                <line x1={X(v)} x2={X(v)} y1={PT + 44} y2={H - PB} stroke={c} strokeWidth="2" strokeDasharray={i ? "6 4" : "none"} />
                <text x={X(v) + (i || X(v) < 260 ? 6 : -6)} y={PT + 56 + i * 16} textAnchor={i || X(v) < 260 ? "start" : "end"} fontSize="11" fontWeight="700" fill={c} className="sv-mono">{l} ≥ {fmt(v, 1)}%</text>
              </g>
            ))}
            {lots.map((v, i) => <circle key={i} cx={X(v)} cy={H - PB - 10 - (i % 4) * 9} r="5" fill={v < releaseLimit ? "var(--bad)" : "var(--text-h)"} className="th-pop" />)}
          </svg>
        </div>
        <div className="sp-side">
          <h3 className="an-h3">Batch history</h3>
          <label className="vl-slider"><span>Lots manufactured<b className="sv-mono">{n}</b></span><input type="range" min="3" max="30" value={n} onChange={e => setN(+e.target.value)} /></label>
          <label className="vl-slider"><span>Process mean<b className="sv-mono">{mu.toFixed(2)}%</b></span><input type="range" min="97" max="99.5" step="0.05" value={mu} onChange={e => setMu(+e.target.value)} /></label>
          <label className="vl-slider"><span>Lot-to-lot SD<b className="sv-mono">{sigma.toFixed(2)}%</b></span><input type="range" min="0.05" max="0.8" step="0.01" value={sigma} onChange={e => setSigma(+e.target.value)} /></label>
          <h3 className="an-h3">Stability and the assay</h3>
          <label className="vl-slider"><span>Monomer loss at 2–8 °C<b className="sv-mono">{rate.toFixed(3)}%/mo</b></span><input type="range" min="0" max="0.15" step="0.005" value={rate} onChange={e => setRate(+e.target.value)} /></label>
          <label className="vl-slider"><span>Shelf life claimed<b className="sv-mono">{shelf} mo</b></span><input type="range" min="12" max="48" step="6" value={shelf} onChange={e => setShelf(+e.target.value)} /></label>
          <label className="vl-slider"><span>Analytical SD (intermediate precision)<b className="sv-mono">{asd.toFixed(2)}%</b></span><input type="range" min="0.03" max="0.5" step="0.01" value={asd} onChange={e => setAsd(+e.target.value)} /></label>
          <button className="hm-secondary" onClick={() => setSeed(v => v + 1)}>Resample lots</button>
        </div>
      </div>

      <div className="sp-grid sp-lower">
        <div>
          <h3 className="an-h3">How the two limits connect</h3>
          <svg viewBox={`0 0 ${SW} ${SH}`} className="sp-inset" role="img" aria-label="Worst-case lot released at the release limit, degrading to the shelf-life limit">
            <line x1={40} x2={SW - 16} y1={sy(shelfLimit)} y2={sy(shelfLimit)} stroke="var(--bad)" strokeWidth="1.6" />
            <line x1={40} x2={SW - 16} y1={sy(releaseLimit)} y2={sy(releaseLimit)} stroke="var(--chain-l)" strokeWidth="1.6" strokeDasharray="6 4" />
            <path d={`M${sx(0)},${sy(releaseLimit)}L${sx(shelf)},${sy(releaseLimit - loss)}`} stroke="var(--text-h)" strokeWidth="2" />
            <rect x={sx(shelf) - 4} y={sy(releaseLimit - loss)} width="8" height={Math.max(0, sy(shelfLimit) - sy(releaseLimit - loss))} fill="color-mix(in srgb, var(--chain-h) 40%, transparent)" />
            <text x={sx(0)} y={sy(releaseLimit) - 8} fontSize="10.5" fill="var(--chain-l)" className="sv-mono">release {fmt(releaseLimit, 2)}%</text>
            <text x={SW - 16} y={sy(shelfLimit) + 16} textAnchor="end" fontSize="10.5" fill="var(--bad)" className="sv-mono">end of shelf life {fmt(shelfLimit, 1)}%</text>
            <text x={sx(shelf) - 8} y={(sy(releaseLimit - loss) + sy(shelfLimit)) / 2 + 4} textAnchor="end" fontSize="10" fill="var(--chain-h)" className="sv-mono">2 × assay SD</text>
            <text x={40} y={SH - 8} fontSize="10" fill="var(--text-faint)" className="sv-mono">0</text>
            <text x={SW - 16} y={SH - 8} textAnchor="end" fontSize="10" fill="var(--text-faint)" className="sv-mono">{shelf} months</text>
          </svg>
        </div>
        <div>
          <h3 className="an-h3">The arithmetic</h3>
          <table className="vl-stats"><tbody>
            <tr><th>Mean of {n} lots</th><td className="sv-mono">{fmt(m, 2)}%</td></tr>
            <tr><th>SD</th><td className="sv-mono">{fmt(s, 3)}%</td></tr>
            <tr><th>Tolerance factor k (99% coverage, 95% confidence)</th><td className="sv-mono">{fmt(k, 2)}</td></tr>
            <tr><th>Lower tolerance bound, mean − k·SD</th><td className="sv-mono">{fmt(tiLo, 2)}%</td></tr>
            <tr><th>Projected loss over {shelf} months</th><td className="sv-mono">{fmt(loss, 2)}%</td></tr>
            <tr><th>Shelf-life limit (rounded down)</th><td className="sv-mono">≥ {fmt(shelfLimit, 1)}%</td></tr>
            <tr><th>Release limit = shelf-life + loss + 2·SD</th><td className="sv-mono">≥ {fmt(releaseLimit, 2)}%</td></tr>
            <tr className={failRelease ? "is-fail" : ""}><th>Historical lots that would fail release</th><td className="sv-mono">{failRelease} of {n}</td></tr>
          </tbody></table>
          <p className="vl-explain">
            With few lots, k is large: at 3 lots it is about {fmt(tolK(3), 1)}, at 30 lots about {fmt(tolK(30), 1)}. Early specifications are therefore wide and tighten as data accrues.
            ICH Q6B also expects limits to reflect lots used in clinical studies, so a statistically derived limit is checked against clinical experience before it is proposed.
            {failRelease > 0 && " Some historical lots now fall below the release limit: the stability allowance or assay variability is eating the margin. Reduce degradation, tighten the assay, or shorten the claimed shelf life."}
          </p>
        </div>
      </div>
    </div>
  );
}
