import { useEffect, useRef, useState, useMemo } from "react";
import { reducedMotion } from "../../motion";
import { rng } from "./stats";

/* ============================================================
   Separation theatre: each assay shown as the instrument runs it.
   Two engines:
   - SepTheatre (canvas): molecules travel a column / capillary /
     pH gradient; the detector trace is drawn as they arrive.
   - CurveTheatre (SVG): binding, dose-response, melting, mass spec,
     amplification and particle readouts drawn as data is acquired.
   Every theatre loops, pauses off-screen, and renders its finished
   state under prefers-reduced-motion.
   ============================================================ */

const MONO = "ui-monospace, 'JetBrains Mono', Menlo, monospace";
const g = (x, m, s) => Math.exp(-0.5 * ((x - m) / s) ** 2);
const ease = (t) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);

// resolve "--chain-h" style tokens to concrete colours for canvas, tracking theme changes
function useTokens(host) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const root = host.current?.closest("[data-theme]");
    if (!root) return;
    const mo = new MutationObserver(() => setTick(t => t + 1));
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, [host]);
  return useMemo(() => {
    void tick;
    return (v) => {
      if (!v || !v.startsWith("--") || !host.current) return v;
      return getComputedStyle(host.current).getPropertyValue(v).trim() || "#888";
    };
  }, [tick, host]);
}

// rAF clock: progress 0..1 over `run` ms, holds, then loops. Pauses off-screen.
function useClock(host, run = 7000, hold = 3200, key) {
  const still = useMemo(reducedMotion, []);
  const [p, setP] = useState(still ? 1 : 0);
  const [playing, setPlaying] = useState(!still);
  const t0 = useRef(0), acc = useRef(0);
  useEffect(() => { acc.current = 0; t0.current = performance.now(); if (!still) setP(0); }, [key, still]);
  useEffect(() => {
    if (!playing) return;
    let raf = 0, vis = true, last = performance.now();
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; }, { threshold: 0.05 });
    if (host.current) io.observe(host.current);
    const frame = (now) => {
      const dt = now - last; last = now;
      if (vis) {
        acc.current += dt;
        if (acc.current > run + hold) acc.current = 0;
        setP(Math.min(acc.current / run, 1));
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [playing, run, hold, host]);
  const replay = () => { acc.current = 0; setP(0); setPlaying(true); };
  return { p, playing, setPlaying, replay, still };
}

function Controls({ clock, label }) {
  if (clock.still) return null;
  return (
    <div className="th-ctrl">
      <button className="th-btn" onClick={() => clock.setPlaying(v => !v)} aria-label={clock.playing ? "Pause" : "Play"}>
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          {clock.playing ? <path d="M3 2h2v8H3zM7 2h2v8H7z" fill="currentColor" /> : <path d="M3 1.5l7 4.5-7 4.5z" fill="currentColor" />}
        </svg>
      </button>
      <button className="th-btn" onClick={clock.replay} aria-label="Replay run">
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2a4 4 0 1 1-3.6 2.3" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M1.5 1.5v3h3" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
      </button>
      <span className="th-time sv-mono">{label}</span>
    </div>
  );
}

/* ─────────────────────── Separation engine ─────────────────────── */

export function SepTheatre({ cfg, compact = false }) {
  const host = useRef(null), cvs = useRef(null);
  const tok = useTokens(host);
  const clock = useClock(host, cfg.run || 7600, 3200, cfg.id);
  const p = clock.p;

  // particles: count proportional to area, with a floor so minor species stay visible
  const parts = useMemo(() => {
    const R = rng(cfg.seed || 11);
    const total = compact ? 120 : 260;
    const out = [];
    cfg.species.forEach((s, si) => {
      const n = Math.max(compact ? 5 : 9, Math.round((total * s.area) / 100));
      for (let i = 0; i < n; i++) {
        out.push({
          si,
          arr: s.mu + s.sig * R.n() * 0.9,            // arrival time / focus position
          start: R.u(),                                // icIEF: random start along the capillary
          y: R.u(), ph: R.u() * 6.28, wob: 0.6 + R.u() * 0.8,
        });
      }
    });
    return out;
  }, [cfg, compact]);

  const tNow = p * cfg.tMax;

  useEffect(() => {
    const c = cvs.current, el = host.current; if (!c || !el) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = el.clientWidth, H = compact ? 64 : 96;
    c.width = W * dpr; c.height = H * dpr; c.style.width = W + "px"; c.style.height = H + "px";
    const ctx = c.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);

    const x0 = 14, x1 = W - (cfg.focus ? 14 : 34), y0 = 14, y1 = H - 14, mid = (y0 + y1) / 2;
    const ink = tok("--text-faint"), hair = tok("--hairline");

    // channel body
    ctx.strokeStyle = hair; ctx.lineWidth = 1;
    const r = (y1 - y0) / 2;
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x0, y0, x1 - x0, y1 - y0, cfg.skin === "column" ? 10 : r) : ctx.rect(x0, y0, x1 - x0, y1 - y0); ctx.stroke();

    if (cfg.skin === "column") {           // porous resin beads
      const R2 = rng(5); ctx.fillStyle = hair;
      for (let i = 0; i < (compact ? 40 : 90); i++) { ctx.beginPath(); ctx.arc(x0 + 6 + R2.u() * (x1 - x0 - 12), y0 + 5 + R2.u() * (y1 - y0 - 10), 3 + R2.u() * 4, 0, 6.28); ctx.fill(); }
    }
    if (cfg.skin === "gradient") {         // ampholyte pH gradient, acidic (left) to basic (right)
      const grd = ctx.createLinearGradient(x0, 0, x1, 0);
      grd.addColorStop(0, "rgba(224,57,62,0.16)"); grd.addColorStop(0.5, "rgba(201,154,6,0.10)"); grd.addColorStop(1, "rgba(61,99,221,0.16)");
      ctx.fillStyle = grd; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x0, y0, x1 - x0, y1 - y0, r) : ctx.rect(x0, y0, x1 - x0, y1 - y0); ctx.fill();
      ctx.fillStyle = ink; ctx.font = `10px ${MONO}`; ctx.fillText(cfg.leftLabel || "pH 3", x0 + 4, y1 + 11); ctx.textAlign = "right"; ctx.fillText(cfg.rightLabel || "pH 10", x1 - 4, y1 + 11); ctx.textAlign = "left";
    }
    if (!cfg.focus) {                       // detector window
      ctx.strokeStyle = tok("--accent"); ctx.setLineDash([2, 3]);
      ctx.beginPath(); ctx.moveTo(x1 + 8, y0 - 4); ctx.lineTo(x1 + 8, y1 + 4); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = ink; ctx.font = `9.5px ${MONO}`; ctx.fillText("det", x1 + 12, mid + 3);
    }

    // molecules
    for (const q of parts) {
      const s = cfg.species[q.si];
      let x, a = 1;
      if (cfg.focus) {
        const e = ease(p / 0.7);
        x = q.start + (q.arr - q.start) * e;
        x += Math.sin(q.ph + p * 30) * 0.012 * (1 - e);
      } else {
        const f = Math.min(tNow / q.arr, 1.04);
        x = f;
        if (f >= 1) a = Math.max(0, 1 - (f - 1) * 25);
        x += Math.sin(q.ph + tNow * 3) * 0.004 * q.wob;
      }
      if (a <= 0) continue;
      const px = x0 + 4 + Math.min(Math.max(x, 0), 1) * (x1 - x0 - 8);
      const spread = cfg.skin === "column" ? 0.42 : 0.3;
      const py = mid + (q.y - 0.5) * (y1 - y0) * spread * 2 + Math.sin(q.ph + tNow * q.wob * 2) * (cfg.skin === "column" ? 2.2 : 0.8);
      ctx.globalAlpha = a * 0.92; ctx.fillStyle = tok(s.color);
      ctx.beginPath(); ctx.arc(px, py, (s.size || 1) * (compact ? 2.1 : 2.6), 0, 6.28); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, [p, parts, cfg, compact, tok, tNow]);

  // detector trace (SVG, theme-aware)
  const TW = compact ? 600 : 1100, TH = compact ? 70 : 190, pad = { l: 28, r: 8, t: 14, b: compact ? 6 : 26 };
  const N = 300;
  const peak = Math.max(...cfg.species.map(s => s.area / s.sig));
  let d = "";
  const upto = cfg.focus ? 1 : p;
  for (let i = 0; i <= N; i++) {
    const f = i / N; if (f > upto) break;
    const t = f * cfg.tMax;
    let y = 0;
    if (cfg.focus) {
      // whole-column imaging: peaks sharpen as the gradient focuses
      const sharp = 0.25 + 0.75 * ease(p / 0.7);
      cfg.species.forEach(s => { y += (s.area / s.sig) * sharp * g(f, s.mu, s.sig / sharp); });
      y += 0.01 * peak;
    } else {
      cfg.species.forEach(s => { y += (s.area / s.sig) * g(t, s.mu, s.sig); });
    }
    y += Math.sin(t * 37) * peak * 0.004;
    const px = pad.l + f * (TW - pad.l - pad.r), py = TH - pad.b - (y / peak) * (TH - pad.t - pad.b) * 0.9;
    d += `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`;
  }
  const xTicks = cfg.ticks || [0, cfg.tMax / 2, cfg.tMax];
  const found = cfg.species.filter(s => (cfg.focus ? p > 0.72 : tNow > s.mu + 2 * s.sig));

  return (
    <div ref={host} className={`th${compact ? " th-compact" : ""}`}>
      {!compact && (
        <div className="th-head">
          <span><strong>{cfg.instrument}</strong> {cfg.mode}</span>
          <span className="th-state">{p < 1 ? (cfg.focus ? "Focusing" : "Acquiring") : "Run complete"}</span>
        </div>
      )}
      <canvas ref={cvs} aria-hidden="true" style={{ display: "block", width: "100%" }} />
      <svg viewBox={`0 0 ${TW} ${TH}`} className="th-trace" role="img" aria-label={`${cfg.instrument} trace: ${cfg.species.map(s => s.label).join(", ")}`}>
        <line x1={pad.l} x2={TW - pad.r} y1={TH - pad.b} y2={TH - pad.b} stroke="var(--border-bright)" />
        {!compact && xTicks.map(t => {
          const x = pad.l + (t / cfg.tMax) * (TW - pad.l - pad.r);
          return <g key={t}><line x1={x} x2={x} y1={TH - pad.b} y2={TH - pad.b + 4} stroke="var(--border-bright)" />
            <text x={x} y={TH - pad.b + 15} textAnchor="middle" fontSize="10" fill="var(--text-faint)" fontFamily={MONO}>{cfg.tickFmt ? cfg.tickFmt(t) : t}</text></g>;
        })}
        {!compact && <text x={TW - pad.r} y={TH - 2} textAnchor="end" fontSize="9.5" fill="var(--text-faint)" fontFamily={MONO}>{cfg.axis}</text>}
        <path d={d} fill="none" stroke="var(--chain-h)" strokeWidth={compact ? 1.4 : 1.7} strokeLinejoin="round" />
        {!compact && found.map(s => {
          const f = cfg.focus ? s.mu : s.mu / cfg.tMax;
          const x = pad.l + f * (TW - pad.l - pad.r);
          return <text key={s.id} x={x} y={pad.t + 10} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={`var(${s.color})`} fontFamily={MONO} className="th-fade">{s.label}</text>;
        })}
      </svg>
      {!compact && (
        <>
          <table className="th-table">
            <thead><tr><th>Species</th><th>{cfg.focus ? "pI" : "RT (min)"}</th><th>Area %</th></tr></thead>
            <tbody>
              {cfg.species.map(s => {
                const on = found.includes(s);
                return (
                  <tr key={s.id} style={{ opacity: on ? 1 : 0.3 }}>
                    <td><span className="th-dot" style={{ background: `var(${s.color})` }} />{s.label}</td>
                    <td className="sv-mono">{on ? (cfg.focus ? s.pI : (s.mu).toFixed(1)) : "–"}</td>
                    <td className="sv-mono">{on ? s.area.toFixed(1) : "–"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Controls clock={clock} label={cfg.focus ? `${Math.round(p * 100)}% focused` : `t ${tNow.toFixed(1)} / ${cfg.tMax} min`} />
          {cfg.note && <p className="th-note">{cfg.note}</p>}
        </>
      )}
    </div>
  );
}

/* ─────────────────────── Curve engine ─────────────────────── */

const PW = 900, PH = 280, PL = 50, PR = 14, PT = 16, PB = 36;
const sx = (x, lo, hi) => PL + ((x - lo) / (hi - lo)) * (PW - PL - PR);
const sy = (y, lo, hi) => PH - PB - ((y - lo) / (hi - lo)) * (PH - PT - PB);
const poly = (pts) => pts.map((q, i) => `${i ? "L" : "M"}${q[0].toFixed(1)},${q[1].toFixed(1)}`).join("");

function Axes({ xr, yr, xl, yl, xt, yt, xf = (v) => v, yf = (v) => v }) {
  return (
    <g>
      <line x1={PL} x2={PW - PR} y1={PH - PB} y2={PH - PB} stroke="var(--border-bright)" />
      <line x1={PL} x2={PL} y1={PT} y2={PH - PB} stroke="var(--border-bright)" />
      {xt.map(v => <g key={"x" + v}><line x1={sx(v, ...xr)} x2={sx(v, ...xr)} y1={PH - PB} y2={PH - PB + 4} stroke="var(--border-bright)" />
        <text x={sx(v, ...xr)} y={PH - PB + 15} textAnchor="middle" fontSize="10" fill="var(--text-faint)" fontFamily={MONO}>{xf(v)}</text></g>)}
      {yt.map(v => <g key={"y" + v}><line x1={PL} x2={PW - PR} y1={sy(v, ...yr)} y2={sy(v, ...yr)} stroke="var(--hairline)" strokeDasharray="2 4" />
        <text x={PL - 6} y={sy(v, ...yr) + 3} textAnchor="end" fontSize="10" fill="var(--text-faint)" fontFamily={MONO}>{yf(v)}</text></g>)}
      <text x={PW - PR} y={PH - 4} textAnchor="end" fontSize="9.5" fill="var(--text-faint)" fontFamily={MONO}>{xl}</text>
      <text x={PL} y={PT - 3} fontSize="9.5" fill="var(--text-faint)" fontFamily={MONO}>{yl}</text>
    </g>
  );
}

const CURVES = {
  // SPR / BLI sensorgram: 1:1 Langmuir association then dissociation
  binding: (cfg, p) => {
    const { ka = 2.4e5, kd = 3.1e-4, Rmax = 120, concs = [1.25, 2.5, 5, 10, 20], tAssoc = 240, tEnd = 600 } = cfg;
    const tNow = p * tEnd, cols = ["--chain-l", "--bridge", "--cpk-cl", "--chain-h", "--glycan"];
    const R = (C, t) => { const M = C * 1e-9, kobs = ka * M + kd, Req = Rmax * ka * M / kobs;
      return t <= tAssoc ? Req * (1 - Math.exp(-kobs * t)) : Req * (1 - Math.exp(-kobs * tAssoc)) * Math.exp(-kd * (t - tAssoc)); };
    const xr = [0, tEnd], yr = [0, Rmax * 1.05];
    const lines = concs.map((C, i) => { const pts = []; for (let t = 0; t <= tNow; t += tEnd / 240) pts.push([sx(t, ...xr), sy(R(C, t), ...yr)]); return { d: poly(pts), c: cols[i % cols.length], C }; });
    const frac = R(concs[concs.length - 1], tNow) / Rmax;
    return {
      svg: <>
        <Axes xr={xr} yr={yr} xl="time (s)" yl="response (RU)" xt={[0, 200, 400, 600]} yt={[0, 40, 80, 120]} />
        <line x1={sx(tAssoc, ...xr)} x2={sx(tAssoc, ...xr)} y1={PT} y2={PH - PB} stroke="var(--text-faint)" strokeDasharray="3 3" />
        <text x={sx(tAssoc, ...xr) + 4} y={PT + 10} fontSize="9.5" fill="var(--text-faint)" fontFamily={MONO}>buffer: dissociation</text>
        {lines.map(l => <path key={l.C} d={l.d} fill="none" stroke={`var(${l.c})`} strokeWidth="1.7" />)}
      </>,
      cartoon: { kind: "surface", frac },
      readout: [["ka", `${(ka / 1e5).toFixed(1)}×10⁵ M⁻¹s⁻¹`], ["kd", `${(kd * 1e4).toFixed(1)}×10⁻⁴ s⁻¹`], ["KD", `${((kd / ka) * 1e9).toFixed(2)} nM`]],
      done: p >= 1, label: `t ${Math.round(tNow)} s`,
    };
  },
  // 4PL dose-response: reference vs test (relative potency)
  dose: (cfg, p) => {
    const { top = 100, bot = 4, ec50 = 12, hill = 1.3, rp = 0.94, single = false, ylab = "signal (% max)", xlab = "concentration (ng/mL)", sample } = cfg;
    const f = (x, e) => bot + (top - bot) / (1 + Math.pow(e / x, hill));
    const doses = [0.4, 1.2, 3.7, 11, 33, 100, 300, 900];
    const xr = [Math.log10(0.25), Math.log10(1500)], yr = [0, top * 1.08];
    const shown = Math.floor(p * 1.6 * doses.length);
    const R = rng(4);
    const pts = (e, k) => doses.slice(0, shown).map((x, i) => ({ x, y: f(x, e) * (1 + (R.n() * 0.025)), i, k }));
    const fitP = Math.max(0, (p - 0.62) / 0.38);
    const curve = (e) => { const out = []; for (let lx = xr[0]; lx <= xr[0] + (xr[1] - xr[0]) * fitP; lx += 0.02) out.push([sx(lx, ...xr), sy(f(10 ** lx, e), ...yr)]); return poly(out); };
    const testE = ec50 / rp;
    return {
      svg: <>
        <Axes xr={xr} yr={yr} xl={xlab} yl={ylab} xt={[0, 1, 2, 3]} yt={[0, 50, 100]} xf={v => (10 ** v >= 1000 ? `${10 ** v / 1000}k` : 10 ** v)} />
        {pts(ec50, "r").map(q => <circle key={"r" + q.i} cx={sx(Math.log10(q.x), ...xr)} cy={sy(q.y, ...yr)} r="3.6" fill="var(--chain-h)" className="th-pop" />)}
        {!single && pts(testE, "t").map(q => <rect key={"t" + q.i} x={sx(Math.log10(q.x), ...xr) - 3} y={sy(q.y, ...yr) - 3} width="6" height="6" fill="var(--chain-l)" className="th-pop" />)}
        {fitP > 0 && <path d={curve(ec50)} fill="none" stroke="var(--chain-h)" strokeWidth="1.6" />}
        {fitP > 0 && !single && <path d={curve(testE)} fill="none" stroke="var(--chain-l)" strokeWidth="1.6" strokeDasharray="5 3" />}
        {fitP >= 1 && sample && <g className="th-fade">
          <line x1={PL} x2={sx(Math.log10(sample), ...xr)} y1={sy(f(sample, ec50), ...yr)} y2={sy(f(sample, ec50), ...yr)} stroke="var(--glycan)" strokeDasharray="3 3" />
          <line x1={sx(Math.log10(sample), ...xr)} x2={sx(Math.log10(sample), ...xr)} y1={sy(f(sample, ec50), ...yr)} y2={PH - PB} stroke="var(--glycan)" strokeDasharray="3 3" />
          <circle cx={sx(Math.log10(sample), ...xr)} cy={sy(f(sample, ec50), ...yr)} r="4.5" fill="none" stroke="var(--glycan)" strokeWidth="2" /></g>}
      </>,
      legend: single ? [["--chain-h", "Standard curve"], ...(sample ? [["--glycan", "Sample, interpolated"]] : [])] : [["--chain-h", "Reference standard"], ["--chain-l", "Test lot"]],
      readout: single ? [["EC50", `${ec50} ng/mL`], ...(sample ? [["Sample", `${sample} ng/mL`]] : [])] : [["EC50 ref", `${ec50.toFixed(1)}`], ["EC50 test", `${testE.toFixed(1)}`], ["Relative potency", `${(rp * 100).toFixed(0)}%`]],
      done: p >= 1, label: shown < doses.length ? `plate read, ${Math.min(shown, doses.length)}/${doses.length} dilutions` : (fitP < 1 ? "fitting 4PL" : "fit complete"),
    };
  },
  // DSC thermogram: domain unfolding transitions
  melt: (cfg, p) => {
    const tr = cfg.transitions || [{ T: 71.2, w: 2.4, h: 1, label: "CH2", c: "--chain-h" }, { T: 77.8, w: 2.0, h: 1.9, label: "Fab", c: "--chain-l" }, { T: 83.4, w: 1.8, h: 0.9, label: "CH3", c: "--bridge" }];
    const xr = [40, 100], yr = [0, 2.3];
    const Tnow = xr[0] + p * (xr[1] - xr[0]);
    const pts = []; for (let T = xr[0]; T <= Tnow; T += 0.25) { let y = 0.05; tr.forEach(t => { y += t.h * g(T, t.T, t.w); }); pts.push([sx(T, ...xr), sy(y, ...yr)]); }
    return {
      svg: <>
        <Axes xr={xr} yr={yr} xl="temperature (°C)" yl="excess Cp (kcal/mol·K)" xt={[40, 60, 80, 100]} yt={[0, 1, 2]} />
        {tr.map(t => Tnow > t.T + t.w && <g key={t.label} className="th-fade"><line x1={sx(t.T, ...xr)} x2={sx(t.T, ...xr)} y1={sy(t.h + 0.05, ...yr)} y2={sy(t.h + 0.32, ...yr)} stroke={`var(${t.c})`} />
          <text x={sx(t.T, ...xr)} y={sy(t.h + 0.38, ...yr)} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={`var(${t.c})`} fontFamily={MONO}>{t.label} {t.T.toFixed(1)}</text></g>)}
        <path d={poly(pts)} fill="none" stroke="var(--chain-h)" strokeWidth="1.8" />
      </>,
      readout: [["Tonset", `${(tr[0].T - 2 * tr[0].w).toFixed(1)} °C`], ["Tm1", `${tr[0].T} °C`], ["Scan", "1 °C/min"]],
      done: p >= 1, label: `${Tnow.toFixed(1)} °C`,
    };
  },
  // Intact mass: charge envelope then deconvolution to glycoforms
  mass: (cfg, p) => {
    const M = cfg.M || 148220, forms = [{ n: "G0F/G0F", dm: 0, h: 0.62 }, { n: "G0F/G1F", dm: 162, h: 1 }, { n: "G1F/G1F", dm: 324, h: 0.7 }, { n: "G1F/G2F", dm: 486, h: 0.3 }];
    const phase2 = Math.max(0, (p - 0.55) / 0.45);
    if (phase2 <= 0) {
      const xr = [2400, 3800], yr = [0, 1.1];
      const zs = []; for (let z = 40; z <= 60; z++) zs.push(z);
      const shown = Math.floor((p / 0.55) * zs.length);
      return {
        svg: <>
          <Axes xr={xr} yr={yr} xl="m/z" yl="intensity" xt={[2500, 3000, 3500]} yt={[0, 0.5, 1]} />
          {zs.slice(0, shown).map(z => { const mz = (M + z * 1.00728) / z, h = g(z, 50, 5.5);
            return <g key={z} className="th-pop"><line x1={sx(mz, ...xr)} x2={sx(mz, ...xr)} y1={PH - PB} y2={sy(h, ...yr)} stroke="var(--chain-h)" strokeWidth="2" />
              {z % 4 === 0 && <text x={sx(mz, ...xr)} y={sy(h, ...yr) - 4} textAnchor="middle" fontSize="9" fill="var(--text-faint)" fontFamily={MONO}>{z}+</text>}</g>; })}
        </>,
        readout: [["Charge states", "40+ to 60+"], ["Step", "ESI envelope"]], done: false, label: "acquiring charge envelope",
      };
    }
    const xr = [M - 300, M + 700], yr = [0, 1.15];
    const pts = []; for (let m = xr[0]; m <= xr[1]; m += 3) { let y = 0; forms.forEach(fm => { y += fm.h * g(m, M + fm.dm, 14); }); pts.push([sx(m, ...xr), sy(y * ease(phase2 * 1.4), ...yr)]); }
    return {
      svg: <>
        <Axes xr={xr} yr={yr} xl="deconvoluted mass (Da)" yl="relative abundance" xt={[M, M + 300, M + 600]} yt={[0, 0.5, 1]} xf={v => v.toLocaleString()} />
        <path d={poly(pts)} fill="none" stroke="var(--chain-h)" strokeWidth="1.8" />
        {phase2 > 0.7 && forms.map(fm => <text key={fm.n} x={sx(M + fm.dm, ...xr)} y={sy(fm.h, ...yr) - 6} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="var(--text-h)" fontFamily={MONO} className="th-fade">{fm.n}</text>)}
      </>,
      readout: [["Theoretical", `${M.toLocaleString()} Da`], ["Observed", `${(M + 1.3).toLocaleString()} Da`], ["Error", "9 ppm"]],
      done: p >= 1, label: "deconvoluting (MaxEnt)",
    };
  },
  // qPCR / kinetic LAL: sigmoid amplification with threshold crossing
  amp: (cfg, p) => {
    const { ctList = [14.1, 17.5, 20.9, 24.3, 27.6, 31.0], sampleCt = 29.2, xmax = 40, xl = "cycle", yl = "ΔRn", thr = 0.2, unit = "pg/mL", names } = cfg;
    const xr = [0, xmax], yr = [0, 1.15], cNow = p * xmax;
    const s = (c, ct) => 1 / (1 + Math.exp(-(c - ct - 2.2) / 1.25));
    const all = [...ctList.map((ct, i) => ({ ct, c: "--chain-h", n: names ? names[i] : `Std ${i + 1}` })), { ct: sampleCt, c: "--glycan", n: "Sample" }];
    return {
      svg: <>
        <Axes xr={xr} yr={yr} xl={xl} yl={yl} xt={[0, 10, 20, 30, 40].filter(v => v <= xmax)} yt={[0, 0.5, 1]} />
        <line x1={PL} x2={PW - PR} y1={sy(thr, ...yr)} y2={sy(thr, ...yr)} stroke="var(--text-muted)" strokeDasharray="4 3" />
        <text x={PW - PR} y={sy(thr, ...yr) - 4} textAnchor="end" fontSize="9.5" fill="var(--text-muted)" fontFamily={MONO}>threshold</text>
        {all.map(a => { const pts = []; for (let c = 0; c <= cNow; c += 0.25) pts.push([sx(c, ...xr), sy(s(c, a.ct), ...yr)]);
          return <path key={a.n} d={poly(pts)} fill="none" stroke={`var(${a.c})`} strokeWidth={a.n === "Sample" ? 2.2 : 1.4} opacity={a.n === "Sample" ? 1 : 0.75} />; })}
      </>,
      legend: [["--chain-h", cfg.stdLabel || "Standards (10-fold)"], ["--glycan", "Sample"]],
      readout: cfg.readout || [["Sample Ct", sampleCt.toFixed(1)], ["Efficiency", "98%"], ["Result", `${cfg.result || "3.1"} ${unit}`]],
      done: p >= 1, label: `${xl} ${Math.round(cNow)}`,
    };
  },
  // Particle sizing: DLS intensity distribution or MFI counts
  particles: (cfg, p) => {
    if (cfg.mode === "mfi") {
      const bins = [{ l: "≥2 µm", v: 2480 }, { l: "≥5 µm", v: 610 }, { l: "≥10 µm", v: 92 }, { l: "≥25 µm", v: 4 }];
      const xr = [0, 4], yr = [0, 3000], e = ease(p / 0.8);
      return {
        svg: <>
          <Axes xr={xr} yr={yr} xl="size class (ECD)" yl="particles / mL" xt={[]} yt={[0, 1000, 2000, 3000]} />
          {bins.map((b, i) => { const x = sx(i + 0.18, ...xr), w = sx(i + 0.82, ...xr) - x, y = sy(b.v * e, ...yr);
            return <g key={b.l}><rect x={x} y={y} width={w} height={PH - PB - y} fill="var(--chain-h)" opacity={0.85 - i * 0.15} />
              <text x={x + w / 2} y={PH - PB + 15} textAnchor="middle" fontSize="10" fill="var(--text-faint)" fontFamily={MONO}>{b.l}</text>
              {p > 0.85 && <text x={x + w / 2} y={y - 5} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--text-h)" fontFamily={MONO} className="th-fade">{b.v}</text>}</g>; })}
        </>,
        cartoon: { kind: "flowcell", p },
        readout: [["≥10 µm limit", "6000 / container"], ["≥25 µm limit", "600 / container"], ["Silicone oil", "classified separately"]],
        done: p >= 1, label: `imaging ${Math.round(p * 100)}%`,
      };
    }
    const xr = [0, 3], yr = [0, 1.1], e = ease(p / 0.85);
    const pts = []; for (let lx = 0; lx <= 3; lx += 0.02) { const y = g(lx, Math.log10(11), 0.09) + 0.08 * g(lx, Math.log10(180), 0.14); pts.push([sx(lx, ...xr), sy(y * e, ...yr)]); }
    return {
      svg: <>
        <Axes xr={xr} yr={yr} xl="hydrodynamic diameter (nm)" yl="intensity" xt={[0, 1, 2, 3]} yt={[0, 0.5, 1]} xf={v => 10 ** v} />
        <path d={poly(pts)} fill="none" stroke="var(--chain-h)" strokeWidth="1.8" />
        {p > 0.85 && <><text x={sx(Math.log10(11), ...xr)} y={sy(1.03, ...yr)} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--text-h)" fontFamily={MONO} className="th-fade">monomer 11 nm</text>
          <text x={sx(Math.log10(180), ...xr)} y={sy(0.15, ...yr)} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--glycan)" fontFamily={MONO} className="th-fade">aggregates</text></>}
      </>,
      cartoon: { kind: "brownian", p },
      readout: [["Z-average", "11.6 nm"], ["PDI", "0.08"], ["Temperature", "25 °C"]],
      done: p >= 1, label: `correlating ${Math.round(p * 100)}%`,
    };
  },
  // UV spectrum + Beer-Lambert (A280) or far-UV CD
  spectrum: (cfg, p) => {
    if (cfg.mode === "cd") {
      const xr = [190, 250], yr = [-12, 6], wNow = 250 - p * 60;
      const f = (w) => 5.2 * g(w, 196, 4) - 9.5 * g(w, 217.5, 7) - 1.2 * g(w, 232, 6);
      const pts = []; for (let w = 250; w >= wNow; w -= 0.4) pts.push([sx(w, ...xr), sy(f(w), ...yr)]);
      return {
        svg: <>
          <Axes xr={xr} yr={yr} xl="wavelength (nm)" yl="MRE ×10³" xt={[190, 210, 230, 250]} yt={[-10, -5, 0, 5]} />
          <line x1={PL} x2={PW - PR} y1={sy(0, ...yr)} y2={sy(0, ...yr)} stroke="var(--border-bright)" />
          <path d={poly(pts)} fill="none" stroke="var(--chain-h)" strokeWidth="1.8" />
          {p > 0.9 && <text x={sx(217.5, ...xr)} y={sy(-10.4, ...yr)} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--text-h)" fontFamily={MONO} className="th-fade">β-sheet minimum 218 nm</text>}
        </>,
        readout: [["Fold", "β-sheet rich (Ig fold)"], ["Path length", "0.1 mm"], ["Match to RS", "conforms"]], done: p >= 1, label: `${Math.round(wNow)} nm`,
      };
    }
    const xr = [240, 340], yr = [0, 1.6], wNow = 240 + p * 100;
    const f = (w) => 1.38 * g(w, 278, 13) + 0.18 * g(w, 290, 4) + (w < 250 ? (250 - w) * 0.035 : 0);
    const pts = []; for (let w = 240; w <= wNow; w += 0.5) pts.push([sx(w, ...xr), sy(f(w), ...yr)]);
    const A = f(280) - f(320), eps = 1.45, conc = A / eps;
    return {
      svg: <>
        <Axes xr={xr} yr={yr} xl="wavelength (nm)" yl="absorbance (AU)" xt={[250, 280, 310, 340]} yt={[0, 0.5, 1, 1.5]} />
        <path d={poly(pts)} fill="none" stroke="var(--chain-h)" strokeWidth="1.8" />
        {wNow > 280 && <g className="th-fade"><line x1={sx(280, ...xr)} x2={sx(280, ...xr)} y1={PT} y2={PH - PB} stroke="var(--glycan)" strokeDasharray="3 3" />
          <text x={sx(280, ...xr) + 4} y={PT + 10} fontSize="10" fill="var(--glycan)" fontFamily={MONO}>A280</text></g>}
      </>,
      readout: [["A280 − A320", A.toFixed(3)], ["ε (mL/mg·cm)", eps.toFixed(2)], ["Concentration", `${conc.toFixed(3)} mg/mL ×dil`]], done: p >= 1, label: `${Math.round(wNow)} nm`,
    };
  },
  // Agar plate: colonies appear over incubation days
  plate: (cfg, p) => {
    const R = rng(9), cols = []; for (let i = 0; i < 7; i++) cols.push({ x: 0.5 + (R.u() - 0.5) * 0.6, y: 0.5 + (R.u() - 0.5) * 0.6, t: R.u() * 0.85, r: 3 + R.u() * 4 });
    const seen = cols.filter(c => Math.hypot(c.x - 0.5, c.y - 0.5) < 0.42 && c.t < p);
    return {
      svg: <>
        <circle cx={PW / 2} cy={PH / 2} r={PH / 2 - 14} fill="color-mix(in srgb, var(--chain-l) 10%, transparent)" stroke="var(--border-bright)" />
        {seen.map((c, i) => <circle key={i} className="th-pop" cx={PW / 2 + (c.x - 0.5) * (PH - 28) * 2.2} cy={PH / 2 + (c.y - 0.5) * (PH - 28) * 1.05} r={c.r * Math.min(1, (p - c.t) * 6)} fill="var(--bridge)" opacity="0.85" />)}
        <text x={PW - PR} y={PH - 8} textAnchor="end" fontSize="10" fill="var(--text-faint)" fontFamily={MONO}>day {Math.min(5, Math.ceil(p * 5))} of 5, 30–35 °C</text>
      </>,
      readout: [["Colonies", `${seen.length}`], ["Sample filtered", "100 mL"], ["Result", `${seen.length} CFU / 100 mL (limit ≤ 10)`]], done: p >= 1, label: `incubating day ${Math.min(5, Math.ceil(p * 5))}`,
    };
  },
};

function Cartoon({ c }) {
  if (!c) return null;
  if (c.kind === "surface") {
    const n = 9, bound = Math.round(c.frac * n);
    return (
      <svg viewBox="0 0 160 120" className="th-cartoon" aria-hidden="true">
        <rect x="8" y="96" width="144" height="8" rx="2" fill="var(--border-bright)" />
        <text x="80" y="117" textAnchor="middle" fontSize="8.5" fill="var(--text-faint)" fontFamily={MONO}>sensor surface</text>
        {Array.from({ length: n }).map((_, i) => { const x = 18 + i * 15.5; return (
          <g key={i}>
            <path d={`M${x},96 L${x},84 M${x},84 l-4,-6 M${x},84 l4,-6`} stroke="var(--chain-h)" strokeWidth="2" strokeLinecap="round" fill="none" />
            {i < bound && <circle cx={x} cy={72} r="4.2" fill="var(--glycan)" className="th-pop" />}
          </g>); })}
        <text x="80" y="20" textAnchor="middle" fontSize="9" fill="var(--text-muted)" fontFamily={MONO}>{Math.round(c.frac * 100)}% occupied</text>
      </svg>
    );
  }
  if (c.kind === "brownian" || c.kind === "flowcell") {
    const R = rng(c.kind === "brownian" ? 3 : 8);
    const dots = Array.from({ length: c.kind === "brownian" ? 26 : 14 }).map((_, i) => ({ x: R.u(), y: R.u(), r: c.kind === "flowcell" ? 2 + R.u() * 7 : (i < 3 ? 6 : 2.4), ph: R.u() * 6 }));
    const t = c.p * 20;
    return (
      <svg viewBox="0 0 160 120" className="th-cartoon" aria-hidden="true">
        <rect x="6" y="6" width="148" height="100" rx="6" fill="none" stroke="var(--border-bright)" />
        {dots.map((d, i) => {
          const x = c.kind === "flowcell" ? 10 + ((d.x * 140 + t * 18) % 140) : 14 + d.x * 132 + Math.sin(t * (i < 3 ? 0.4 : 1.6) + d.ph) * 4;
          const y = 12 + d.y * 88 + (c.kind === "brownian" ? Math.cos(t * (i < 3 ? 0.4 : 1.6) + d.ph * 2) * 4 : 0);
          return c.kind === "flowcell"
            ? <rect key={i} x={x} y={y} width={d.r * 1.3} height={d.r} rx={d.r / 2.5} fill="none" stroke="var(--chain-h)" strokeWidth="1.3" />
            : <circle key={i} cx={x} cy={y} r={d.r} fill={i < 3 ? "var(--glycan)" : "var(--chain-h)"} opacity="0.85" />;
        })}
        <text x="80" y="117" textAnchor="middle" fontSize="8.5" fill="var(--text-faint)" fontFamily={MONO}>{c.kind === "flowcell" ? "flow cell, 100× imaging" : "Brownian motion, 633 nm laser"}</text>
      </svg>
    );
  }
  return null;
}

export function CurveTheatre({ cfg }) {
  const host = useRef(null);
  const clock = useClock(host, cfg.run || 7000, 3200, cfg.id);
  const out = CURVES[cfg.kind](cfg, clock.p);
  return (
    <div ref={host} className="th">
      <div className="th-head">
        <span><strong>{cfg.instrument}</strong> {cfg.mode}</span>
        <span className="th-state">{out.done ? "Run complete" : "Acquiring"}</span>
      </div>
      <div className={`th-body${out.cartoon ? " has-cartoon" : ""}`}>
        <svg viewBox={`0 0 ${PW} ${PH}`} className="th-plot" role="img" aria-label={`${cfg.instrument} readout`}>{out.svg}</svg>
        {out.cartoon && <Cartoon c={out.cartoon} />}
      </div>
      {out.legend && <div className="th-legend">{out.legend.map(([c, l]) => <span key={l}><i style={{ background: `var(${c})` }} />{l}</span>)}</div>}
      <dl className="th-readout" style={{ opacity: out.done ? 1 : 0.35 }}>
        {out.readout.map(([k, v]) => <div key={k}><dt>{k}</dt><dd className="sv-mono">{v}</dd></div>)}
      </dl>
      <Controls clock={clock} label={out.label} />
      {cfg.note && <p className="th-note">{cfg.note}</p>}
    </div>
  );
}

export function Theatre({ cfg, compact }) {
  if (!cfg) return null;
  return cfg.kind === "sep" ? <SepTheatre cfg={cfg} compact={compact} /> : <CurveTheatre cfg={cfg} />;
}
