import { useEffect, useRef } from "react";

/* An IgG1 drawn as a point cloud: each domain is a cloud of particles that
   flies in from a scattered field, assembles into the Y, then turns slowly in
   3D and leans toward the cursor. Colours are the Structure Viewer tokens:
   heavy chain, light chain, disulfide bonds, N-glycans. */

// deterministic random, so the molecule is the same on every visit
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

function buildMolecule() {
  const r = rng(417);
  const pts = [];
  const blob = (cx, cy, cz, rx, ry, rz, n, kind, rot = 0) => {
    const c = Math.cos(rot), s = Math.sin(rot);
    for (let i = 0; i < n; i++) {
      // uniform-ish inside an ellipsoid, denser at the surface for a crisp outline
      let x, y, z, d;
      do { x = r() * 2 - 1; y = r() * 2 - 1; z = r() * 2 - 1; d = x * x + y * y + z * z; } while (d > 1);
      const k = 0.55 + 0.45 * Math.cbrt(r());
      const lx = (x / Math.sqrt(d || 1)) * k * rx, ly = (y / Math.sqrt(d || 1)) * k * ry, lz = (z / Math.sqrt(d || 1)) * k * rz;
      pts.push({ x: cx + lx * c - ly * s, y: cy + lx * s + ly * c, z: cz + lz, kind });
    }
  };
  // Fc: two heavy chains side by side, CH2 above CH3
  [-0.27, 0.27].forEach(x => {
    blob(x, -0.5, 0, 0.23, 0.28, 0.22, 340, "h");
    blob(x, -1.08, 0, 0.23, 0.26, 0.22, 340, "h");
  });
  // N-glycans tucked between the CH2 domains
  [-0.09, 0.09].forEach(x => blob(x, -0.48, 0, 0.07, 0.17, 0.08, 70, "g"));
  // Fab arms at roughly 60° from vertical
  [-1, 1].forEach(side => {
    const A = 0.95;                                   // arm angle from vertical
    const dx = side * Math.sin(A), dy = Math.cos(A);  // along the arm
    const ox = side * Math.cos(A), oy = -Math.sin(A); // outward, where the light chain sits
    const at = (t, off) => [dx * t + ox * off, 0.12 + dy * t + oy * off];
    const rot = -side * A;
    const [h1x, h1y] = at(0.46, -0.04); blob(h1x, h1y, 0.03, 0.2, 0.25, 0.2, 300, "h", rot);
    const [h2x, h2y] = at(0.98, -0.04); blob(h2x, h2y, 0.03, 0.2, 0.26, 0.2, 300, "h", rot);
    const [l1x, l1y] = at(0.5, 0.38); blob(l1x, l1y, -0.03, 0.19, 0.24, 0.19, 290, "l", rot);
    const [l2x, l2y] = at(1.0, 0.38); blob(l2x, l2y, -0.03, 0.19, 0.25, 0.19, 290, "l", rot);
  });
  // hinge disulfide bonds: two short rungs between the heavy chains
  [0.06, -0.06].forEach(y => { for (let i = 0; i < 26; i++) { const t = i / 25; pts.push({ x: -0.2 + 0.4 * t, y: y + (r() - 0.5) * 0.02, z: (r() - 0.5) * 0.04, kind: "b" }); } });
  // flight paths: start scattered on a wide shell, arrive in waves
  pts.forEach(p => {
    const th = r() * Math.PI * 2, ph = Math.acos(r() * 2 - 1), R = 2.6 + r() * 1.6;
    p.sx = R * Math.sin(ph) * Math.cos(th); p.sy = R * Math.sin(ph) * Math.sin(th); p.sz = R * Math.cos(ph);
    p.delay = r() * 0.9 + (p.kind === "g" || p.kind === "b" ? 0.6 : 0);
    p.size = 0.55 + r() * 0.75;
  });
  return pts;
}

const ease = (t) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

export default function AntibodyHero({ dark }) {
  const host = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    const el = host.current, cv = canvas.current;
    if (!el || !cv || !cv.getContext) return undefined;
    const ctx = cv.getContext("2d");
    if (!ctx) return undefined;
    const pts = buildMolecule();
    const css = getComputedStyle(el);
    const col = {
      h: css.getPropertyValue("--chain-h").trim() || "#4f6bed",
      l: css.getPropertyValue("--chain-l").trim() || "#e08a3c",
      b: css.getPropertyValue("--bridge").trim() || "#c9a227",
      g: css.getPropertyValue("--glycan").trim() || "#d9534f",
      dust: css.getPropertyValue("--text-faint").trim() || "#999",
    };
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const r = rng(7);
    const dust = Array.from({ length: 140 }, () => ({ x: r() * 2 - 1, y: r() * 2 - 1, v: 0.004 + r() * 0.01, s: 0.5 + r() }));

    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, start = performance.now();
    let mx = 0, my = 0, tx = 0, ty = 0;
    const resize = () => {
      const b = el.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = b.width; h = b.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      cv.style.width = w + "px"; cv.style.height = h + "px";
    };
    resize();

    const draw = (now) => {
      const t = reduce ? 99 : (now - start) / 1000;
      tx += (mx - tx) * 0.05; ty += (my - ty) * 0.05;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // drifting dust: the unassembled world around the molecule
      ctx.globalAlpha = dark ? 0.35 : 0.28;
      ctx.fillStyle = col.dust;
      dust.forEach(d => {
        const y = ((d.y + 1 + (reduce ? 0 : t * d.v)) % 2) - 1;
        ctx.beginPath(); ctx.arc((d.x * 0.5 + 0.5) * w, (1 - (y * 0.5 + 0.5)) * h, d.s, 0, 6.283); ctx.fill();
      });

      const scale = Math.min(w * 0.31, h * 0.28);
      const cx = w < 700 ? w * 0.5 : w * 0.62, cy = h * 0.46;
      const spin = reduce ? -0.5 : -0.5 + Math.sin(t * 0.22) * 0.55 + tx * 0.6;
      const tilt = 0.12 + ty * 0.35;
      const cs = Math.cos(spin), sn = Math.sin(spin), ct = Math.cos(tilt), st = Math.sin(tilt);
      const breathe = reduce ? 1 : 1 + Math.sin(t * 1.1) * 0.012;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const k = ease((t - 0.2 - p.delay) / 1.8);
        let x = p.sx + (p.x - p.sx) * k, y = p.sy + (p.y - p.sy) * k, z = p.sz + (p.z - p.sz) * k;
        // gentle shimmer once assembled
        if (!reduce && k >= 1) { const j = Math.sin(t * 2 + i) * 0.006; x += j; y += j; }
        // rotate about y, then tilt about x
        const x1 = x * cs + z * sn, z1 = -x * sn + z * cs;
        const y2 = y * ct - z1 * st, z2 = y * st + z1 * ct;
        const f = 3.2 / (3.2 + Math.max(-1.6, z2));
        const px = cx + x1 * scale * f * breathe, py = cy - y2 * scale * f * breathe;
        const depth = Math.max(0.15, Math.min(1, 0.65 - z2 * 0.35));
        ctx.globalAlpha = depth * (0.35 + 0.65 * k);
        ctx.fillStyle = col[p.kind];
        const s = p.size * f * (p.kind === "b" ? 1.25 : 1) * (w < 500 ? 0.85 : 1);
        ctx.fillRect(px - s, py - s, s * 2, s * 2);
      }
      ctx.globalAlpha = 1;
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      const b = el.getBoundingClientRect();
      mx = ((e.clientX - b.left) / b.width - 0.5) * 2;
      my = ((e.clientY - b.top) / b.height - 0.5) * 2;
    };
    const onLeave = () => { mx = 0; my = 0; };
    const io = "IntersectionObserver" in window ? new IntersectionObserver(([e]) => {
      const was = visible; visible = e.isIntersecting && !document.hidden;
      if (visible && !was && !reduce) raf = requestAnimationFrame(draw);
    }) : null;
    const onVis = () => { const was = visible; visible = !document.hidden; if (visible && !was && !reduce) raf = requestAnimationFrame(draw); };

    io && io.observe(el);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      io && io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [dark]);

  return (
    <div className="sc-ab" ref={host} aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  );
}
