import { useEffect, useRef, useState, useMemo } from "react";

/* ============================================================
   Motion graphics: explanatory, instrument-paced animation.
   Pure SVG + rAF, no libraries. Every piece honours
   prefers-reduced-motion by rendering its finished state.
   ============================================================ */

const MONO = "var(--font-mono)";
export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* ── SEC-HPLC trace that "acquires" like a live detector ── */

// plot geometry (viewBox units)
const W = 560, H = 236, X0 = 44, X1 = 540, Y0 = 18, Y1 = 196;
const RUN_MIN = 30;           // x axis: retention time 0–30 min
const DRAW_MS = 6400, HOLD_MS = 3800, FADE_MS = 700;

const PEAKS = [
  { id:"hmw",  label:"HMW",     mu:0.40, sig:0.013, amp:0.055, area:1.4 },
  { id:"mono", label:"Monomer", mu:0.50, sig:0.021, amp:0.93,  area:98.1 },
  { id:"lmw",  label:"LMW",     mu:0.615,sig:0.014, amp:0.026, area:0.5 },
  { id:"buf",  label:"Buffer",  mu:0.86, sig:0.010, amp:0.16,  area:null },
];

// deterministic detector noise so the trace is identical every loop
function noise(t) {
  return 0.004 * Math.sin(t * 410) + 0.003 * Math.sin(t * 977 + 1.3) + 0.002 * Math.sin(t * 2311 + 0.4);
}
const signal = (t) => 0.012 + 0.01 * t + noise(t) +
  PEAKS.reduce((s, p) => s + p.amp * Math.exp(-0.5 * ((t - p.mu) / p.sig) ** 2), 0);
const px = (t) => X0 + t * (X1 - X0);
const py = (v) => Y1 - v * (Y1 - Y0);

function useInView(ref) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return seen;
}

export function InstrumentTrace({ bare = false } = {}) {
  const host = useRef(null);
  const clip = useRef(null), cursor = useRef(null), rt = useRef(null), abs = useRef(null), plot = useRef(null);
  const inView = useInView(host);
  const still = useMemo(reducedMotion, []);
  const [found, setFound] = useState(still ? PEAKS.length : 0);
  const [done, setDone] = useState(still);

  const { line, area } = useMemo(() => {
    const N = 420; let d = "";
    for (let i = 0; i <= N; i++) { const t = i / N; d += `${i ? "L" : "M"}${px(t).toFixed(1)},${py(signal(t)).toFixed(1)}`; }
    return { line: d, area: `${d}L${X1},${Y1}L${X0},${Y1}Z` };
  }, []);

  useEffect(() => {
    if (still || !inView) return;
    let raf = 0, start = performance.now(), lastFound = -1, lastDone = null;
    const tick = (now) => {
      const el = now - start;
      if (el > DRAW_MS + HOLD_MS + FADE_MS) start = now;          // loop
      const e = Math.min((now - start) / DRAW_MS, 1);
      const fade = Math.max(0, (now - start - DRAW_MS - HOLD_MS) / FADE_MS);
      const x = px(e);
      clip.current?.setAttribute("width", (x - X0 + 1).toFixed(1));
      cursor.current?.setAttribute("transform", `translate(${x.toFixed(1)},0)`);
      if (cursor.current) cursor.current.style.opacity = e < 1 ? 1 : 0;
      if (plot.current) plot.current.style.opacity = 1 - fade;
      if (rt.current) rt.current.textContent = (e * RUN_MIN).toFixed(2).padStart(5, "0");
      if (abs.current) abs.current.textContent = String(Math.max(0, Math.round(signal(e) * 1000))).padStart(4, "0");
      const f = PEAKS.filter(p => e > p.mu + 2.2 * p.sig).length;
      if (f !== lastFound) { lastFound = f; setFound(f); }
      const d = e >= 1 && fade < 1;
      if (d !== lastDone) { lastDone = d; setDone(d); }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, still]);

  const ticks = [0, 5, 10, 15, 20, 25, 30];
  const rows = PEAKS.filter(p => p.area != null);

  return (
    <div ref={host} aria-label="Animated SEC-HPLC chromatogram of a monoclonal antibody drug substance" role="img"
      className={bare ? "mo-bare" : undefined} style={bare ? { fontFamily:MONO } : { border:"1px solid var(--hairline)", borderRadius:2, background:"var(--panel)", fontFamily:MONO }}>
      {/* instrument header */}
      <div style={{ display:"flex", justifyContent:"space-between", gap:12, padding:"12px 16px", borderBottom:"1px solid var(--hairline)", fontSize:11, letterSpacing:".02em", color:"var(--text-faint)" }}>
        <span><span style={{ color:"var(--accent)", fontWeight:700 }}>SEC-HPLC</span>, mAb drug substance, lot 24-017</span>
        <span style={{ display:"inline-flex", alignItems:"center", gap:6 }}>
          <span className={done || still ? "" : "mo-blink"} style={{ width:6, height:6, borderRadius:"50%", background: done || still ? "var(--text-faint)" : "var(--accent-2)" }} />
          {done || still ? "Run complete" : "Acquiring"}
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ display:"block", width:"100%", height:"auto" }}>
        <defs>
          <clipPath id="mo-trace-clip"><rect ref={clip} x={X0} y={0} width={still ? X1 - X0 : 0} height={H} /></clipPath>
        </defs>
        {/* grid + axes */}
        {[0.25, 0.5, 0.75, 1].map(v => <line key={v} x1={X0} x2={X1} y1={py(v)} y2={py(v)} stroke="var(--hairline)" strokeWidth="1" strokeDasharray="2 4" />)}
        <line x1={X0} x2={X1} y1={Y1} y2={Y1} stroke="var(--text-faint)" strokeWidth="1" opacity=".5" />
        <line x1={X0} x2={X0} y1={Y0} y2={Y1} stroke="var(--text-faint)" strokeWidth="1" opacity=".5" />
        {ticks.map(m => (
          <g key={m}>
            <line x1={px(m / RUN_MIN)} x2={px(m / RUN_MIN)} y1={Y1} y2={Y1 + 4} stroke="var(--text-faint)" opacity=".6" />
            <text x={px(m / RUN_MIN)} y={Y1 + 16} textAnchor="middle" fontSize="9" fill="var(--text-faint)" fontFamily="ui-monospace, Menlo, monospace">{m}</text>
          </g>
        ))}
        <text x={X1} y={H - 4} textAnchor="end" fontSize="8.5" fill="var(--text-faint)" fontFamily="ui-monospace, Menlo, monospace">Retention time (min)</text>
        <text x={12} y={Y0 + 4} fontSize="8.5" fill="var(--text-faint)" letterSpacing="1.2" fontFamily="ui-monospace, Menlo, monospace" transform={`rotate(-90 12 ${Y0 + 4})`} textAnchor="end">mAU</text>

        <g ref={plot} style={{ transition:"none" }}>
          <g clipPath="url(#mo-trace-clip)">
            <path d={area} fill="color-mix(in srgb, var(--accent) 9%, transparent)" />
            <path d={line} fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinejoin="round" />
          </g>
          {/* peak call-outs, appear as the detector passes each peak */}
          {PEAKS.map((p, i) => {
            const on = i < found;
            const tx = px(p.mu), ty = py(signal(p.mu));
            const ly = p.id === "mono" ? ty - 8 : Math.min(ty - 22, Y1 - 46);
            return (
              <g key={p.id} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(4px)", transition:"opacity .5s ease, transform .5s ease" }}>
                {p.id !== "mono" && <line x1={tx} x2={tx} y1={ly + 4} y2={ty - 3} stroke="var(--text-faint)" strokeWidth="1" />}
                <text x={tx} y={ly} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={p.id === "buf" ? "var(--text-faint)" : "var(--text-h)"} fontFamily="ui-monospace, Menlo, monospace">{p.label}</text>
                <text x={tx} y={ly - 11} textAnchor="middle" fontSize="8" fill="var(--text-faint)" fontFamily="ui-monospace, Menlo, monospace">{(p.mu * RUN_MIN).toFixed(1)}</text>
              </g>
            );
          })}
        </g>

        {/* detector cursor */}
        {!still && (
          <g ref={cursor}>
            <line x1={0} x2={0} y1={Y0} y2={Y1} stroke="var(--accent-2)" strokeWidth="1" opacity=".7" />
          </g>
        )}
      </svg>

      {/* live readout + integration table */}
      <div style={{ borderTop:"1px solid var(--hairline)", padding:"10px 16px 14px" }}>
        {!still && (
          <div style={{ display:"flex", gap:22, fontSize:11, color:"var(--text-faint)", marginBottom:8 }}>
            <span>t <span ref={rt} style={{ color:"var(--text-h)", fontVariantNumeric:"tabular-nums" }}>00.00</span> min</span>
            <span>A280 <span ref={abs} style={{ color:"var(--text-h)", fontVariantNumeric:"tabular-nums" }}>0000</span> mAU</span>
          </div>
        )}
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto auto", columnGap:20, rowGap:4, fontSize:11.5 }}>
          {["Peak", "RT (min)", "Area %"].map(h => <span key={h} style={{ fontSize:10, color:"var(--text-faint)", textAlign: h === "Peak" ? "left" : "right" }}>{h}</span>)}
          {rows.map(p => {
            const on = PEAKS.indexOf(p) < found;
            const s = { opacity: on ? 1 : 0.18, transition:"opacity .5s ease", fontVariantNumeric:"tabular-nums" };
            return [
              <span key={p.id + "l"} style={{ ...s, color:"var(--text-h)" }}>{p.label}</span>,
              <span key={p.id + "r"} style={{ ...s, color:"var(--text-sec)", textAlign:"right" }}>{on ? (p.mu * RUN_MIN).toFixed(1) : "--.-"}</span>,
              <span key={p.id + "a"} style={{ ...s, color: p.id === "mono" ? "var(--accent)" : "var(--text-sec)", fontWeight: p.id === "mono" ? 700 : 400, textAlign:"right" }}>{on ? p.area.toFixed(1) : "--.-"}</span>,
            ];
          })}
        </div>
        <div style={{ marginTop:10, paddingTop:8, borderTop:"1px dashed var(--hairline)", display:"flex", justifyContent:"space-between", fontSize:11,
          opacity: done ? 1 : 0, transition:"opacity .6s ease" }}>
          <span style={{ color:"var(--text-faint)" }}>Spec: monomer ≥ 95.0%</span>
          <span style={{ color:"var(--ok)", fontWeight:700 }}>Conforms</span>
        </div>
      </div>
    </div>
  );
}

/* ── Pipeline process line: a serpentine track of the 16 stages with a
      molecule that travels along it, driven by scroll position ── */

const PL_COLS = 4, PL_XS = [30, 102, 174, 246], PL_Y0 = 20, PL_DY = 46, PL_TURN = 28;

function nodeXY(i) {
  const r = Math.floor(i / PL_COLS), c = i % PL_COLS;
  return [r % 2 === 0 ? PL_XS[c] : PL_XS[PL_COLS - 1 - c], PL_Y0 + r * PL_DY];
}
function segPath(i) {
  const [x1, y1] = nodeXY(i), [x2, y2] = nodeXY(i + 1);
  if (y1 === y2) return `M${x1},${y1}L${x2},${y2}`;
  const k = x1 > 140 ? PL_TURN : -PL_TURN;
  return `M${x1},${y1}C${x1 + k},${y1} ${x2 + k},${y2} ${x2},${y2}`;
}

export function ProcessLine({ stages, colorOf, pos, activeId, onPick, onHover }) {
  const segs = useRef([]);
  const mol = useRef(null);
  const n = stages.length;
  const rows = Math.ceil(n / PL_COLS);
  const h = PL_Y0 * 2 + (rows - 1) * PL_DY;
  const p = Math.min(Math.max(pos, 0), n - 1);
  const si = Math.min(Math.floor(p), n - 2), sf = p - si;

  // place the molecule on the current segment
  useEffect(() => {
    const seg = segs.current[si]; if (!seg || !mol.current) return;
    const len = seg.getTotalLength();
    const pt = seg.getPointAtLength(len * (p >= n - 1 ? 1 : sf));
    mol.current.setAttribute("transform", `translate(${pt.x.toFixed(1)},${pt.y.toFixed(1)})`);
  }, [p, si, sf, n]);

  return (
    <svg viewBox={`0 0 276 ${h}`} style={{ display:"block", width:"100%", height:"auto", overflow:"visible" }}>
      {/* track */}
      {stages.slice(0, -1).map((s, i) => {
        const fill = i < si ? 1 : i === si ? (p >= n - 1 ? 1 : sf) : 0;
        return (
          <g key={s.id}>
            <path d={segPath(i)} fill="none" stroke="var(--hairline)" strokeWidth="2" />
            <path ref={el => (segs.current[i] = el)} d={segPath(i)} fill="none" stroke={colorOf(s)} strokeWidth="2" strokeLinecap="round"
              pathLength="1" strokeDasharray="1" strokeDashoffset={1 - fill} />
          </g>
        );
      })}
      {/* stations */}
      {stages.map((s, i) => {
        const [x, y] = nodeXY(i);
        const c = colorOf(s);
        const on = s.id === activeId, past = i < p - 0.001;
        return (
          <g key={s.id} transform={`translate(${x},${y})`} style={{ cursor:"pointer" }}
            onClick={() => onPick(s.id)} onMouseEnter={() => onHover?.(s.id)} onMouseLeave={() => onHover?.(null)}>
            <circle r="15" fill="transparent" />
            {on && <circle r="11" fill="none" stroke={c} strokeWidth="1.2" className="mo-halo" />}
            <circle r={on ? 10 : 8.5} fill={past || on ? c : "var(--bg-base)"} stroke={past || on ? c : "var(--hairline)"} strokeWidth="1.5"
              style={{ transition:"r .3s ease, fill .3s ease" }} />
            <text y="3" textAnchor="middle" fontSize="7.5" fontWeight="700" fontFamily="ui-monospace, Menlo, monospace"
              fill={past || on ? "var(--bg-base)" : "var(--text-faint)"} style={{ pointerEvents:"none" }}>{s.stage}</text>
          </g>
        );
      })}
      {/* the molecule: a small IgG "Y" riding the line */}
      <g ref={mol} style={{ pointerEvents:"none" }}>
        <g transform="translate(0,-17)">
          <circle r="7" fill="var(--bg-base)" stroke="var(--accent)" strokeWidth="1.2" />
          <path d="M0,4 L0,0.5 M0,0.5 L-3.4,-3.6 M0,0.5 L3.4,-3.6" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </g>
      </g>
    </svg>
  );
}
