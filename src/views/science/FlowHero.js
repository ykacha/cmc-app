import { useEffect, useRef } from "react";
import { STAGES } from "../../science/journey";

/* "From proposal to dossier", drawn. Particles of evidence enter on the left
   as scattered, noisy points, travel through the stages (taking each stage's
   colour), lose their scatter as each stage removes variability, and are
   finally filed by subject into the five CTD modules on the right.
   The stage is always drawn on the dark palette; in light theme it sits on the
   page as a dark instrument panel.
   Chronology in, subject structure out. The cursor causes a local excursion. */

function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
const ease = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));

const RUN = 0.74;         // share of the width used by the stages; the rest is the dossier
const GROUP_VAR = { plan: "--chain-h", make: "--chain-l", measure: "--bridge", dp: "--cpk-cl", control: "--glycan", scale: "--ok", file: "--text-h" };
const MODULE_VAR = ["--text-muted", "--chain-l", "--chain-h", "--bridge", "--glycan"]; // M1..M5

// a target point inside the CTD triangle, with the module it belongs to
function dossierPoint(r) {
  for (;;) {
    const yy = Math.sqrt(r());                        // 0 at apex, 1 at base, uniform by area
    const half = yy * 0.5;
    const xx = 0.5 + (r() * 2 - 1) * half;
    // tiers as in the CTD triangle, with small gaps between modules
    if (yy < 0.3) return { tx: xx, ty: yy, m: 0 };
    if (yy < 0.34) continue;
    if (yy < 0.6) return { tx: xx, ty: yy, m: 1 };
    if (yy < 0.64) continue;
    const f = (xx - (0.5 - half)) / (2 * half);
    if (Math.abs(f - 1 / 3) < 0.025 || Math.abs(f - 2 / 3) < 0.025) continue;
    return { tx: xx, ty: yy, m: f < 1 / 3 ? 2 : f < 2 / 3 ? 3 : 4 };
  }
}

export default function FlowHero({ dark }) {
  const host = useRef(null), canvas = useRef(null);

  useEffect(() => {
    const el = host.current, cv = canvas.current;
    if (!el || !cv || !cv.getContext) return undefined;
    const ctx = cv.getContext("2d");
    if (!ctx) return undefined;
    const css = getComputedStyle(el);
    const tok = (v, f) => css.getPropertyValue(v).trim() || f;
    const stageCol = STAGES.map(s => tok(GROUP_VAR[s.group], "#888"));
    const modCol = MODULE_VAR.map(v => tok(v, "#888"));
    const faint = tok("--hairline", "rgba(128,128,128,.25)");
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const r = rng(2024);

    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, last = performance.now();
    let mx = -1e4, my = -1e4;
    let parts = [];
    const spawn = (p, u) => {
      Object.assign(p, dossierPoint(r));
      p.u = u; p.y0 = 0.08 + r() * 0.84; p.ph = r() * 6.283; p.f = 0.6 + r() * 1.4;
      p.v = 0.055 + r() * 0.045; p.hold = 7 + r() * 9; p.age = 0; p.px = null; p.py = null; p.kick = 0;
    };
    const resize = () => {
      const b = el.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = b.width; h = b.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      cv.style.width = w + "px"; cv.style.height = h + "px";
      const n = Math.round(Math.min(1800, Math.max(520, w * 1.35)));
      parts = Array.from({ length: n }, (_, i) => { const p = {}; spawn(p, (i / n) * 1.6 - 0.05); if (p.u > 1) p.age = r() * p.hold; return p; });
    };
    resize();

    // geometry of the dossier triangle in pixels
    const tri = () => {
      const size = Math.min(h * 0.84, w * (1 - RUN) * 0.92);
      return { x: w * (RUN + (1 - RUN) / 2) - size / 2, y: h * 0.5 - size * 0.48, s: size };
    };

    const draw = (now) => {
      const dt = reduce ? 0 : Math.min(0.05, (now - last) / 1000); last = now;
      const t = now / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // stage gates: a faint rule at each stage boundary
      ctx.strokeStyle = faint; ctx.lineWidth = 1;
      for (let i = 1; i < STAGES.length; i++) {
        const x = (i / STAGES.length) * RUN * w;
        ctx.beginPath(); ctx.moveTo(x, h * 0.1); ctx.lineTo(x, h * 0.9); ctx.stroke();
      }

      const T = tri();
      // the dossier: CTD triangle with its module tiers
      ctx.strokeStyle = faint; ctx.lineWidth = 1.2; ctx.fillStyle = faint;
      const P = (fx, fy) => [T.x + fx * T.s, T.y + fy * T.s];
      ctx.beginPath(); ctx.moveTo(...P(0.5, -0.02)); ctx.lineTo(...P(-0.02, 1.01)); ctx.lineTo(...P(1.02, 1.01)); ctx.closePath(); ctx.stroke();
      [0.32, 0.62].forEach(fy => { ctx.beginPath(); ctx.moveTo(...P(0.5 - fy * 0.51, fy)); ctx.lineTo(...P(0.5 + fy * 0.51, fy)); ctx.stroke(); });
      [1 / 3, 2 / 3].forEach(f => { const x0 = 0.5 - 0.62 * 0.5 + f * 0.62, x1 = 0 + f; ctx.beginPath(); ctx.moveTo(...P(x0, 0.62)); ctx.lineTo(...P(x1, 1.01)); ctx.stroke(); });
      ctx.font = "500 10.5px ui-monospace, monospace"; ctx.textAlign = "center";
      [["M1", 0.5, 0.24], ["M2", 0.5, 0.52], ["M3", 0.2, 0.93], ["M4", 0.5, 0.93], ["M5", 0.8, 0.93]].forEach(([l, fx, fy]) => { ctx.globalAlpha = 0.9; ctx.fillStyle = tok("--text-muted", "#888"); ctx.fillText(l, ...P(fx, fy)); });
      ctx.globalAlpha = 1;
      for (const p of parts) {
        p.u += p.v * dt;
        let x, y, col, alpha = 1;
        if (p.u < 1) {
          // travelling through the stages: scatter shrinks as the stages add control
          const k = Math.max(0, p.u);
          const stage = Math.min(STAGES.length - 1, Math.floor((k / 1) * STAGES.length));
          const amp = 0.22 * Math.pow(1 - k, 1.8);
          const lane = 0.5 + (p.y0 - 0.5) * Math.pow(1 - k, 1.25) * 0.95 + (p.y0 - 0.5) * 0.06;
          const sx = k * RUN * w, sy = (lane + amp * Math.sin(t * p.f + p.ph) * 0.5) * h;
          // converge on the dossier over the last stretch
          const c = ease((k - 0.82) / 0.18);
          const tx = T.x + p.tx * T.s, ty = T.y + p.ty * T.s;
          x = sx + (tx - sx) * c; y = sy + (ty - sy) * c;
          col = c > 0.6 ? modCol[p.m] : stageCol[stage];
          alpha = Math.min(1, (p.u + 0.05) * 6) * (0.45 + 0.55 * k);
        } else {
          // filed: sits in its module, then retires and a new piece of evidence starts
          p.age += dt;
          x = T.x + p.tx * T.s + Math.sin(t * 1.3 + p.ph) * 0.6;
          y = T.y + p.ty * T.s + Math.cos(t * 1.1 + p.ph) * 0.6;
          col = modCol[p.m];
          alpha = p.age > p.hold ? Math.max(0, 1 - (p.age - p.hold) / 0.8) : 1;
          if (p.age > p.hold + 0.8) { spawn(p, -0.02); continue; }
        }
        y = Math.max(h * 0.08, Math.min(h * 0.9, y));
        // a process excursion near the cursor
        const dx = x - mx, dy = y - my, d2 = dx * dx + dy * dy;
        if (d2 < 9000 && p.u < 0.9) p.kick = Math.min(28, p.kick + (9000 - d2) / 900);
        p.kick *= 0.94; y += Math.sin(p.ph + t * 9) * p.kick;

        ctx.globalAlpha = alpha * 0.95;
        ctx.strokeStyle = col; ctx.fillStyle = col;
        if (p.px !== null && p.u < 1 && !reduce) {
          ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(x, y); ctx.stroke();
        } else {
          ctx.fillRect(x - 1.1, y - 1.1, 2.2, 2.2);
        }
        p.px = x; p.py = y;
      }
      ctx.globalAlpha = 1;
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => { const b = el.getBoundingClientRect(); mx = e.clientX - b.left; my = e.clientY - b.top; };
    const onLeave = () => { mx = -1e4; my = -1e4; };
    const resume = () => { if (!reduce) { last = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); } };
    const io = "IntersectionObserver" in window ? new IntersectionObserver(([e]) => { const was = visible; visible = e.isIntersecting && !document.hidden; if (visible && !was) resume(); }) : null;
    const onVis = () => { const was = visible; visible = !document.hidden; if (visible && !was) resume(); };
    const onResize = () => { resize(); if (reduce) draw(performance.now()); };

    io && io.observe(el);
    window.addEventListener("resize", onResize);
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf); io && io.disconnect();
      window.removeEventListener("resize", onResize);
      el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [dark]);

  return (
    <figure className="sc-flow">
      <div className="sc-flow-stage" data-theme="dark" ref={host}>
        <canvas ref={canvas} aria-hidden="true" />
        <ol className="sc-flow-ticks" aria-hidden="true">
          {STAGES.map((s, i) => <li key={s.id} style={{ left: `${((i + 0.5) / STAGES.length) * RUN * 100}%` }}>{String(i + 1).padStart(2, "0")}</li>)}
        </ol>
        <span className="sc-flow-end is-start">Proposal</span>
        <span className="sc-flow-end is-end">Dossier, Modules 1–5</span>
      </div>
      <figcaption>Evidence enters scattered, gains control at every stage, and is filed by subject into the five CTD modules. Move the cursor through the stream to cause an excursion.</figcaption>
    </figure>
  );
}
