import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "./motion";

/* ============================================================
   IgG1 structure viewer: a coarse-grained, depth-shaded sphere
   model on a 2D canvas (no WebGL, no libraries).
   12 Ig domains are generated as beta-sandwich bead lattices and
   placed in the Y/T geometry of an IgG1; hinge strands carry the
   inter-heavy disulfides, N297 glycans sit in the CH2 cavity.
   ============================================================ */

// ── vector helpers ──
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const norm = (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

// deterministic jitter so the model is identical on every load
let seed = 7;
const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };

/* Domain catalogue: role drives colour, group drives hover + links. */
export const DOMAIN_INFO = {
  fab:    { name:"Fab arm",        line:"Antigen binding. CDR loops at the tip carry the deamidation and oxidation hotspots that define potency.", method:"am-spr" },
  hinge:  { name:"Hinge",          line:"Inter-heavy-chain disulfides. The most protease- and acid-labile stretch: watch for clipping.",          method:"am-ce-sds" },
  glycan: { name:"N297 glycan",    line:"Fc glycosylation. Afucosylation drives ADCC; galactose and sialic acid shift CDC and half-life.",         method:"am-glycan" },
  fc:     { name:"Fc region",      line:"FcRn recycling and effector function. Met252 and Met428 oxidation here shortens half-life.",              method:"am-cell-bioassay" },
};

function buildModel() {
  seed = 7;
  const beads = []; // { p:[x,y,z], role, group, t }
  const domain = (center, axis, role, group, side = [0, 0, 1]) => {
    const u = norm(axis);
    const v = norm(cross(u, side));
    const w = norm(cross(u, v));
    const A = 1.85, B = 1.05, C = 0.62;
    for (let sheet = -1; sheet <= 1; sheet += 2) {
      for (let k = 0; k < 5; k++) {
        for (let i = 0; i < 9; i++) {
          const t = i / 8 - 0.5;                       // along the strand
          const tw = t * 0.9 * sheet;                  // gentle sheet twist
          const kk = (k - 2) / 2;
          const tp = Math.sqrt(Math.max(0.2, 1 - (t * 2) * (t * 2) * 0.78));   // round the domain ends into a lozenge
          const off = add(add(mul(u, t * 2 * A), mul(v, (kk * B + tw * 0.25) * tp)), mul(w, (sheet * C + kk * kk * 0.12 * -sheet) * tp));
          const j = [(rnd() - 0.5) * 0.26, (rnd() - 0.5) * 0.26, (rnd() - 0.5) * 0.26];
          beads.push({ p: add(add(center, off), j), role, group, t: t * 2 });
        }
      }
    }
  };

  // Fab arms: heavy (VH, CH1) and light (VL, CL) side by side
  const arm = (dir, tilt) => {
    const d = norm(dir);
    const perp = norm(add(cross(d, [0, 0, 1]), [0, 0, tilt]));
    const inner = mul(perp, -1.15), outer = mul(perp, 1.15);
    const base = mul(d, 1.2);
    domain(add(add(base, mul(d, 2.3)), inner), d, "heavy", "fab", perp);       // CH1
    domain(add(add(base, mul(d, 2.3)), outer), d, "light", "fab", perp);       // CL
    domain(add(add(base, mul(d, 6.4)), inner), d, "heavy", "fab", perp);       // VH
    domain(add(add(base, mul(d, 6.4)), outer), d, "light", "fab", perp);       // VL
    // HC-LC disulfide at the CH1/CL junction
    const j0 = add(base, mul(d, 0.7));
    for (let s = 0; s < 4; s++) beads.push({ p: add(j0, mul(perp, -0.55 + s * 0.37)), role: "bridge", group: "hinge", t: 0, small: true });
  };
  arm([-1.0, 0.82, -0.18], 0.25);
  arm([1.0, 0.78, 0.28], -0.25);

  // Hinge: two heavy-chain strands with two inter-heavy disulfides
  for (let i = 0; i < 7; i++) {
    const y = -1.2 + i * 0.42;
    beads.push({ p: [-0.62, y, 0.05], role: "heavy", group: "hinge", t: 0, small: true });
    beads.push({ p: [0.62, y, -0.05], role: "heavy", group: "hinge", t: 0, small: true });
  }
  for (const y of [-0.35, 0.35]) for (let s = 0; s < 4; s++) beads.push({ p: [-0.42 + s * 0.28, y, 0], role: "bridge", group: "hinge", t: 0, small: true });

  // Fc: CH2 pair held apart by the glycans, CH3 pair tightly packed
  domain([-1.35, -3.6, 0], [0.12, -1, 0], "heavy", "fc", [1, 0, 0]);   // CH2 A
  domain([1.35, -3.6, 0], [-0.12, -1, 0], "heavy", "fc", [1, 0, 0]);   // CH2 B
  domain([-1.1, -7.6, 0], [0, -1, 0], "heavy", "fc", [1, 0, 0]);       // CH3 A
  domain([1.1, -7.6, 0], [0, -1, 0], "heavy", "fc", [1, 0, 0]);        // CH3 B
  // tag CH2/CH3 interface (Met252 / Met428 neighbourhood)
  beads.forEach(b => { if (b.group === "fc") { const y = b.p[1]; b.metox = y < -4.9 && y > -6.4; } });

  // N297 glycans: biantennary clusters in the CH2 cavity
  const glycan = (x, sgn) => {
    const pts = [[0, 0, 0], [0.32 * sgn, -0.25, 0.12], [0.58 * sgn, -0.5, 0.22], [0.42 * sgn, -0.82, 0.42], [0.86 * sgn, -0.74, 0.02], [0.3 * sgn, -1.1, 0.55], [1.02 * sgn, -1.02, -0.1]];
    pts.forEach(q => beads.push({ p: [x + q[0] * -1, -2.6 + q[1], 0.35 + q[2]], role: "glycan", group: "glycan", t: 0, small: true }));
  };
  glycan(-0.55, -1);
  glycan(0.55, 1);

  // tag CDR tips: the outermost third of each V domain
  beads.forEach(b => { if (b.group === "fab" && Math.hypot(b.p[0], b.p[1]) > 7.4 && b.t > 0.45) b.cdr = true; });

  // centre vertically
  const ys = beads.map(b => b.p[1]); const cy = (Math.max(...ys) + Math.min(...ys)) / 2;
  beads.forEach(b => { b.p[1] -= cy; });

  // label anchors (centroids)
  const centroid = (f) => { const s = beads.filter(f); const c = s.reduce((a, b) => add(a, b.p), [0, 0, 0]); return mul(c, 1 / s.length); };
  const anchors = {
    fab: centroid(b => b.cdr && b.p[0] < 0),
    hinge: centroid(b => b.group === "hinge" && Math.abs(b.p[0]) < 1),
    glycan: centroid(b => b.group === "glycan"),
    fc: centroid(b => b.group === "fc" && b.p[1] < -6),
  };
  return { beads, anchors };
}

/* Stress conditions: which beads light up, what it means, how it's measured. */
export const STRESSES = [
  { id:"heat",  label:"Heat",      cond:"40 °C, 4 weeks",
    what:"CH2 unfolds first (lowest Tm, about 70 °C in IgG1) and exposed hydrophobic patches seed aggregation.",
    how:[["SEC-HPLC", "am-sec", "%HMW"], ["DSC", "am-dsc", "Tm1"]],
    hit:(b) => b.group === "fc" && b.p[1] > -6.2 },
  { id:"acid",  label:"Low pH",    cond:"pH 3.5 viral inactivation hold",
    what:"Hinge clipping and Asp-Pro cleavage fragment the molecule; acid-unfolded Fc forms aggregates on neutralisation.",
    how:[["CE-SDS (NR)", "am-ce-sds", "% fragments"], ["SEC-HPLC", "am-sec", "%HMW"]],
    hit:(b) => b.group === "hinge" || (b.group === "fc" && b.p[1] > -4.4 && b.p[1] < -2.2) },
  { id:"light", label:"Light",     cond:"ICH Q1B, 1.2M lux·h",
    what:"Met252 and Met428 oxidise at the CH2/CH3 interface, weakening FcRn binding; Trp in the CDRs oxidises too.",
    how:[["Peptide map", "am-peptide-map", "% Met-ox"], ["SPR (FcRn)", "am-spr", "KD shift"]],
    hit:(b) => b.metox || b.cdr },
  { id:"agit",  label:"Agitation", cond:"Shaking, pumping, air-liquid interface",
    what:"Interfacial stress partly unfolds the molecule at the air-liquid interface; exposed hydrophobic patches seed aggregates and subvisible particles.",
    how:[["Micro-flow imaging", "am-mfi", "particles/mL"], ["SEC-HPLC", "am-sec", "%HMW"]],
    hit:(b) => (b.group === "fc" && b.p[1] > -5.4) || b.cdr },
  { id:"base",  label:"High pH",   cond:"pH 8, long storage",
    what:"Asn deamidation at NG motifs in the CDRs adds negative charge and can cut binding.",
    how:[["cIEF", "am-cief", "% acidic"], ["CEX-HPLC", "am-iex", "% acidic"]],
    hit:(b) => b.cdr },
];

// sphere sprite with a key light from the upper left
function sprite(color, size = 64) {
  const c = document.createElement("canvas"); c.width = c.height = size;
  const g = c.getContext("2d");
  const r = size / 2;
  const grd = g.createRadialGradient(r * 0.68, r * 0.62, r * 0.08, r, r, r);
  grd.addColorStop(0, "rgba(255,255,255,0.95)");
  grd.addColorStop(0.16, color);
  grd.addColorStop(0.78, color);
  grd.addColorStop(1, "rgba(0,0,0,0.85)");
  g.fillStyle = grd; g.beginPath(); g.arc(r, r, r - 0.5, 0, Math.PI * 2); g.fill();
  // darken the lower right for form
  const sh = g.createRadialGradient(r * 1.35, r * 1.4, 0, r * 1.2, r * 1.2, r * 1.3);
  sh.addColorStop(0, "rgba(0,0,0,0.38)"); sh.addColorStop(1, "rgba(0,0,0,0)");
  g.globalCompositeOperation = "source-atop"; g.fillStyle = sh; g.fillRect(0, 0, size, size);
  return c;
}

export default function Molecule({ dark, stress, hit, onHover, onPick, labels = true, interactive = true }) {
  const host = useRef(null), cvs = useRef(null);
  const labelRefs = useRef({});
  const state = useRef({ yaw: 0.55, pitch: -0.12, vy: 0, vp: 0, drag: null, hover: null, t0: 0, stress: null });
  const [model] = useState(buildModel);
  const [hoverGroup, setHoverGroup] = useState(null);
  const cb = useRef({});
  cb.current = { onHover, onPick };

  useEffect(() => { state.current.stress = hit ? { hit } : stress ? STRESSES.find(s => s.id === stress) : null; state.current.stressAt = performance.now(); }, [stress, hit]);

  useEffect(() => {
    const canvas = cvs.current, el = host.current;
    const ctx = canvas.getContext("2d");
    const still = reducedMotion();
    const S = state.current;
    if (!S.t0) S.t0 = performance.now();   // assemble once, not on theme change

    // theme colours come from the app root (data-theme lives there)
    const css = getComputedStyle(el);
    const col = (v, f) => (css.getPropertyValue(v).trim() || f);
    const C = { heavy: col("--chain-h", "#3D63DD"), light: col("--chain-l", "#D9731A"), bridge: col("--bridge", "#E9B308"), glycan: col("--glycan", "#E0393E") };
    const hot = col("--glycan", "#E0393E");
    const sprites = {}; Object.entries(C).forEach(([k, v]) => { sprites[k] = sprite(v); }); sprites.hot = sprite(hot); sprites.hotb = sprite(col("--bridge", "#E9B308"));
    const ink = col("--text-faint", "#888");

    // scattered start positions for the assembly moment
    const B = model.beads;
    const start = B.map(() => { const a = rnd() * Math.PI * 2, z = rnd() * 2 - 1, r = 22 + rnd() * 10; return [Math.cos(a) * r * Math.sqrt(1 - z * z), Math.sin(a) * r * Math.sqrt(1 - z * z), z * r]; });
    const proj = new Float32Array(B.length * 4); // x, y, scale, depth
    const order = B.map((_, i) => i);

    let W = 0, H = 0, dpr = 1, raf = 0, visible = true, last = performance.now();
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = el.clientWidth; H = el.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(el);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame); }, { threshold: 0 });
    io.observe(el);

    const project = (p, cy, sy, cp, sp, f, D) => {
      // yaw about Y, then pitch about X
      let x = p[0] * cy + p[2] * sy, z = -p[0] * sy + p[2] * cy, y = p[1];
      const y2 = y * cp - z * sp, z2 = y * sp + z * cp;
      const k = f / (D - z2);
      return [W / 2 + x * k, H * 0.45 - y2 * k, k, z2];
    };

    function frame(now) {
      raf = 0;
      if (!visible || document.hidden) { last = now; return; }
      const dt = Math.min((now - last) / 1000, 0.05); last = now;

      // motion: auto-rotate, inertia, slow down while hovering
      if (!S.drag) {
        const auto = still ? 0 : (S.hover ? 0.04 : 0.16);
        S.vy += (auto - S.vy) * Math.min(dt * 2.2, 1);
        S.vp *= 0.92;
        S.pitch += (-0.12 - S.pitch) * dt * 0.8;
      }
      S.yaw += S.vy * dt; S.pitch += S.vp * dt;
      S.pitch = Math.max(-0.9, Math.min(0.9, S.pitch));

      const cy = Math.cos(S.yaw), sy = Math.sin(S.yaw), cp = Math.cos(S.pitch), sp = Math.sin(S.pitch);
      const scale = Math.min(W, H);
      const f = Math.min(H * 1.55, W * 1.9), D = 44;   // model ~19 units tall -> ~70% of the stage
      const asm = still ? 1 : Math.min((now - S.t0) / 2200, 1);
      const e = 1 - Math.pow(1 - asm, 4);

      for (let i = 0; i < B.length; i++) {
        const b = B[i];
        const p = e < 1 ? [start[i][0] + (b.p[0] - start[i][0]) * e, start[i][1] + (b.p[1] - start[i][1]) * e, start[i][2] + (b.p[2] - start[i][2]) * e] : b.p;
        const q = project(p, cy, sy, cp, sp, f, D);
        proj[i * 4] = q[0]; proj[i * 4 + 1] = q[1]; proj[i * 4 + 2] = q[2]; proj[i * 4 + 3] = q[3];
      }
      order.sort((a, b) => proj[a * 4 + 3] - proj[b * 4 + 3]);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const st = S.stress;
      const pulse = st ? 0.55 + 0.45 * Math.sin((now - S.stressAt) / 260) : 0;
      const hg = S.hover;
      for (let n = 0; n < order.length; n++) {
        const i = order[n], b = B[i];
        const k = proj[i * 4 + 2], z = proj[i * 4 + 3];
        const r = (b.small ? 0.3 : 0.4) * k;
        const fog = Math.max(0.28, Math.min(1, 0.62 + z * 0.07));
        let img = sprites[b.role], a = fog;
        if (hg && b.group !== hg) a *= 0.32;
        if (st) {
          if (st.hit(b)) { img = b.role === "bridge" ? sprites.hotb : sprites.hot; a = Math.max(a, 0.7 + pulse * 0.3); }
          else a *= 0.42;
        }
        ctx.globalAlpha = a * (e < 1 ? 0.35 + 0.65 * e : 1);
        ctx.drawImage(img, proj[i * 4] - r, proj[i * 4 + 1] - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;

      // leader lines + labels
      if (labels && e > 0.98) {
        ctx.strokeStyle = ink; ctx.lineWidth = 1;
        for (const [g, a] of Object.entries(model.anchors)) {
          const q = project(a, cy, sy, cp, sp, f, D);
          const lab = labelRefs.current[g]; if (!lab) continue;
          const dx = q[0] - W / 2, dy = q[1] - H * 0.45, l = Math.hypot(dx, dy) || 1;
          const reach = g === "hinge" || g === "glycan" ? 0.26 * scale : 0.13 * scale;
          const sideX = g === "glycan" ? 1 : g === "hinge" ? -1 : Math.sign(dx) || 1;
          const lx = g === "hinge" || g === "glycan" ? q[0] + sideX * reach : q[0] + (dx / l) * reach;
          let ly = g === "hinge" || g === "glycan" ? q[1] : q[1] + (dy / l) * reach;
          ly = Math.max(30, Math.min(H - (W < 600 ? 70 : 30), ly));
          ctx.globalAlpha = hg && hg !== g ? 0.25 : 0.8;
          ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(lx, ly); ctx.stroke();
          ctx.beginPath(); ctx.arc(q[0], q[1], 2.2, 0, Math.PI * 2); ctx.fillStyle = ink; ctx.fill();
          lab.style.transform = `translate(${lx.toFixed(1)}px, ${ly.toFixed(1)}px) translate(${lx < q[0] ? "-100%" : "0"}, -50%)`;
          lab.style.opacity = hg && hg !== g ? 0.35 : 1;
        }
        ctx.globalAlpha = 1;
      }

      S.proj = proj;
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    // pointer: drag to rotate, hover to inspect a domain
    const pick = (x, y) => {
      if (!S.proj) return null;
      let best = null, bd = 1e9;
      for (let i = 0; i < B.length; i++) {
        const dx = S.proj[i * 4] - x, dy = S.proj[i * 4 + 1] - y, d = dx * dx + dy * dy;
        const r = 0.5 * S.proj[i * 4 + 2];
        if (d < r * r * 2.2 && d < bd) { bd = d; best = B[i].group; }
      }
      return best;
    };
    const rect = () => canvas.getBoundingClientRect();
    const down = (ev) => { if (!interactive) return; S.drag = { x: ev.clientX, y: ev.clientY, moved: 0 }; canvas.setPointerCapture?.(ev.pointerId); };
    const move = (ev) => {
      if (!interactive) return;
      const r = rect();
      if (S.drag) {
        const dx = ev.clientX - S.drag.x, dy = ev.clientY - S.drag.y;
        S.drag.x = ev.clientX; S.drag.y = ev.clientY; S.drag.moved += Math.abs(dx) + Math.abs(dy);
        S.yaw += dx * 0.008; S.pitch += dy * 0.006;
        S.vy = dx * 0.5; S.vp = dy * 0.3;
        return;
      }
      const g = pick(ev.clientX - r.left, ev.clientY - r.top);
      if (g !== S.hover) { S.hover = g; setHoverGroup(g); cb.current.onHover?.(g); }
      canvas.style.cursor = g ? "pointer" : "grab";
    };
    const up = (ev) => {
      if (!S.drag) return;
      const clicked = S.drag.moved < 6;
      S.drag = null;
      if (clicked) {
        const r = rect(); const g = pick(ev.clientX - r.left, ev.clientY - r.top);
        // touch: first tap inspects a domain, a second tap on it opens its assay
        if (ev.pointerType === "touch" && g !== S.hover) { S.hover = g; setHoverGroup(g); cb.current.onHover?.(g); }
        else if (g) cb.current.onPick?.(g);
      }
    };
    const leave = () => { if (S.hover) { S.hover = null; setHoverGroup(null); cb.current.onHover?.(null); } };
    canvas.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    canvas.addEventListener("pointerleave", leave);
    const vis = () => { if (!document.hidden && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); } };
    document.addEventListener("visibilitychange", vis);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      canvas.removeEventListener("pointerdown", down); window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up); canvas.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", vis);
    };
  }, [dark, model, labels, interactive]);

  return (
    <div ref={host} style={{ position:"absolute", inset:0 }}>
      <canvas ref={cvs} role="img" aria-label="Rotating 3D model of an IgG1 monoclonal antibody: two Fab arms, the hinge with its disulfide bonds, the N297 glycans and the Fc region. Drag to rotate."
        style={{ display:"block", touchAction:"pan-y", cursor:"grab" }} />
      {labels && Object.entries(DOMAIN_INFO).map(([g, info]) => (
        <button key={g} ref={el => (labelRefs.current[g] = el)} className="mv-label" onClick={() => onPick?.(g)}
          onMouseEnter={() => { state.current.hover = g; setHoverGroup(g); onHover?.(g); }}
          onMouseLeave={() => { state.current.hover = null; setHoverGroup(null); onHover?.(null); }}
          aria-pressed={hoverGroup === g}>
          {info.name}
        </button>
      ))}
    </div>
  );
}
