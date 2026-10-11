/* Line drawings for the three explorations on the home page. Drawn in the
   page's own colours, no frames, so they sit on the background in both themes.
   Hovering the parent (.hm-way) animates them; reduced motion keeps them still. */

const PHASE = ["var(--chain-h)", "var(--chain-l)", "var(--bridge)", "var(--ok)", "var(--glycan)"];
const phaseOf = (i) => (i < 4 ? 0 : i < 8 ? 1 : i < 10 ? 2 : i < 13 ? 3 : 4);

// a production line: sixteen stations on one pipe, with a pulse running along it
export function LineGlyph() {
  const pts = Array.from({ length: 16 }, (_, i) => [14 + i * 18.4, 60 + Math.sin(i * 0.9) * 14]);
  const d = pts.reduce((a, [x, y], i) => {
    if (!i) return `M 0 ${y} L ${x} ${y}`;
    const [px, py] = pts[i - 1], mx = (px + x) / 2;
    return `${a} C ${mx} ${py}, ${mx} ${y}, ${x} ${y}`;
  }, "") + ` L 300 ${pts[15][1]}`;
  return (
    <svg className="hg hg-line" viewBox="0 0 300 120" aria-hidden="true">
      <path d={d} className="hg-pipe" />
      <path d={d} className="hg-flow" />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 5 : 3.6} className="hg-node" style={{ "--c": PHASE[phaseOf(i)], "--i": i }} />)}
      <circle r="4.5" className="hg-pulse"><animateMotion dur="5s" repeatCount="indefinite" path={d} /></circle>
    </svg>
  );
}

// evidence: a scattered cloud narrows into a beam and files into the CTD triangle
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
const DOTS = (() => {
  const r = rng(9), out = [];
  for (let i = 0; i < 150; i++) {
    const k = r();                                   // 0 at the left, 1 at the triangle
    const spread = 46 * Math.pow(1 - k, 1.4) + 2;
    const x = 8 + k * 196, y = 60 + (r() * 2 - 1) * spread;
    out.push([x, y, PHASE[Math.min(4, Math.floor(k * 5))], k]);
  }
  for (let i = 0; i < 90; i++) {                     // the dossier
    const yy = Math.sqrt(r()), half = yy * 44, xx = 252 + (r() * 2 - 1) * half;
    const tier = yy < 0.32 ? 0 : yy < 0.62 ? 1 : 2 + Math.min(2, Math.floor(((xx - (252 - half)) / (2 * half)) * 3));
    out.push([xx, 16 + yy * 88, ["var(--text-muted)", "var(--chain-l)", "var(--chain-h)", "var(--bridge)", "var(--glycan)"][tier], 2]);
  }
  return out;
})();
export function FunnelGlyph() {
  return (
    <svg className="hg hg-funnel" viewBox="0 0 300 120" aria-hidden="true">
      <path d="M 252 12 L 298 106 L 206 106 Z" className="hg-tri" />
      {DOTS.map(([x, y, c, k], i) => <circle key={i} cx={x} cy={y} r={k > 1 ? 1.7 : 1.9} style={{ "--c": c, "--d": `${(k > 1 ? 1 : k) * 0.6}s` }} className="hg-dot" />)}
    </svg>
  );
}

// a size-exclusion chromatogram: aggregate shoulder, monomer, fragment
const TRACE = (() => {
  const g = (x, m, s, h) => h * Math.exp(-((x - m) ** 2) / (2 * s * s));
  let d = "";
  for (let x = 0; x <= 300; x += 2) {
    const y = 104 - g(x, 118, 5, 12) - g(x, 158, 9, 86) - g(x, 205, 6, 7) - g(x, 250, 4, 3);
    d += `${x ? "L" : "M"} ${x} ${y.toFixed(1)} `;
  }
  return d;
})();
export function TraceGlyph() {
  return (
    <svg className="hg hg-trace" viewBox="0 0 300 120" aria-hidden="true">
      <line x1="0" x2="300" y1="104.5" y2="104.5" className="hg-axis" />
      <path d={`${TRACE} L 300 104 L 0 104 Z`} className="hg-fill" />
      <path d={TRACE} className="hg-ink" pathLength="1" />
      <text x="118" y="84" className="hg-lab">HMW</text>
      <text x="158" y="12" className="hg-lab">Monomer</text>
      <text x="205" y="91" className="hg-lab">LMW</text>
    </svg>
  );
}
