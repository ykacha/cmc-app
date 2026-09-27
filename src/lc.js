import { useState, useEffect, useRef } from "react";

/* ──────────────────────────────────────────────────────────────
   Praxis: shared primitives + theme-aware palette
   TEXT/SUB/FAINT resolve to CSS vars so everything is dual-theme.
   ────────────────────────────────────────────────────────────── */
export const TEXT = "var(--text-h)", SUB = "var(--text-sec)", FAINT = "var(--text-muted)";
const NOISE = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* Fixed ambient backdrop: soft drifting accent glow + grid + grain (theme-aware) */
export function LiquidBackdrop() {
  const a = useRef(null), b = useRef(null);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        if (a.current) a.current.style.transform = `translateY(${y * 0.12}px)`;
        if (b.current) b.current.style.transform = `translateY(${y * -0.08}px)`;
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <div aria-hidden style={{ position:"fixed", inset:0, zIndex:0, overflow:"hidden", pointerEvents:"none", background:"var(--bg-base)" }}>
      <div ref={a} style={{ position:"absolute", top:"-22%", left:"-12%", width:760, height:760, borderRadius:"50%",
        background:"radial-gradient(circle, color-mix(in srgb, var(--ambient-a) 8%, transparent), transparent 68%)",
        filter:"blur(40px)", animation:"lc-drift 44s ease-in-out infinite" }}/>
      <div ref={b} style={{ position:"absolute", bottom:"-26%", right:"-14%", width:820, height:820, borderRadius:"50%",
        background:"radial-gradient(circle, color-mix(in srgb, var(--ambient-b) 7%, transparent), transparent 68%)",
        filter:"blur(40px)", animation:"lc-drift2 50s ease-in-out infinite" }}/>
      <div style={{ position:"absolute", inset:0,
        backgroundImage:"linear-gradient(90deg, color-mix(in srgb, var(--text-faint) 20%, transparent) 1px, transparent 1px)",
        backgroundSize:"128px 100%",
        WebkitMaskImage:"radial-gradient(120% 95% at 50% 0%, #000 26%, transparent 80%)",
        maskImage:"radial-gradient(120% 95% at 50% 0%, #000 26%, transparent 80%)" }}/>
      <div style={{ position:"absolute", inset:0, backgroundImage:NOISE, backgroundSize:"170px 170px", opacity:"var(--grain)", mixBlendMode:"overlay" }}/>
    </div>
  );
}

/* Scroll-reveal */
export function Reveal({ children, delay = 0, style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (!("IntersectionObserver" in window)) { el.classList.add("lc-in"); return; }
    const io = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) { el.classList.add("lc-in"); io.unobserve(el); } });
    }, { threshold:.1, rootMargin:"0px 0px -6% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className="lc-reveal" style={{ animationDelay:`${delay}ms`, ...style }}>{children}</div>;
}

/* 3D tilt + glare */
export function Tilt({ children, max = 8, className = "", style, onClick }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(1000px) rotateX(${(py - .5) * -2 * max}deg) rotateY(${(px - .5) * 2 * max}deg) translateY(-4px)`;
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
    const g = el.querySelector(".lc-glare"); if (g) g.style.opacity = "1";
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = "";
    const g = el.querySelector(".lc-glare"); if (g) g.style.opacity = "0";
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick} className={`lc-tilt ${className}`} style={style}>
      {children}
      <span className="lc-glare" />
    </div>
  );
}

/* Cursor-pull */
export function Magnetic({ children, strength = 14, style }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / r.width;
    const y = (e.clientY - (r.top + r.height / 2)) / r.height;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <span ref={ref} onMouseMove={move} onMouseLeave={leave}
      style={{ display:"inline-flex", transition:"transform .3s cubic-bezier(.34,1.55,.5,1)", ...style }}>
      {children}
    </span>
  );
}

/* Count-up (fires on scroll into view) */
export function CountUp({ to, dur = 1300, suffix = "" }) {
  const [v, setV] = useState(0);
  const ref = useRef(null), started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const run = () => {
      if (started.current) return; started.current = true;
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        setV(Math.round(e * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) { run(); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { run(); io.unobserve(el); } }), { threshold:.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, dur]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* Deterministic string seed → PRNG (used by TraceGlyph so the same id always draws the same trace) */
export function seeded(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/* The app's signature motif: a chromatogram-style trace line, seeded from any string.
   Used as decoration (method cards, hero backdrops) and functionally (assay sparklines). */
export function TraceGlyph({ seed, color = "var(--accent)", w = 300, h = 44, opacity = 0.55, sw = 1.5, peakRange = [3, 7] }) {
  const rnd = seeded(seed);
  const peaks = peakRange[0] + Math.floor(rnd() * (peakRange[1] - peakRange[0]));
  const centers = Array.from({ length: peaks }, () => ({ mu: 0.04 + rnd() * 0.92, amp: 0.3 + rnd() * 0.7, sd: 0.014 + rnd() * 0.045 }));
  const N = 160; let d = "";
  for (let i = 0; i <= N; i++) {
    const x = i / N; let y = 0;
    centers.forEach(c => { y += c.amp * Math.exp(-((x - c.mu) ** 2) / (2 * c.sd * c.sd)); });
    y = Math.min(1, y);
    const px = (x * w).toFixed(1), py = (h - 3 - y * (h - 7)).toFixed(1);
    d += (i === 0 ? `M${px} ${py}` : ` L${px} ${py}`);
  }
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display:"block" }} aria-hidden="true">
      <line x1="0" y1={h-3} x2={w} y2={h-3} stroke={color} strokeWidth="0.75" opacity={opacity * 0.45} />
      <path d={d} fill="none" stroke={color} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round" opacity={opacity} />
    </svg>
  );
}

/* Iridescent-free signal header (drop-in for shared SectionHeader on LC views) */
export function LiquidHeader({ icon, title, subtitle, eyebrow }) {
  return (
    <div style={{ marginBottom:26 }}>
      {eyebrow && <div style={{ fontSize:11, fontWeight:800, letterSpacing:".22em", marginBottom:8, color:"var(--accent)", fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace" }}>{eyebrow}</div>}
      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
        {icon && <span style={{ fontSize:32, filter:"drop-shadow(0 4px 12px color-mix(in srgb, var(--accent) 40%, transparent))" }}>{icon}</span>}
        <div>
          <h2 className="lc-iri-text" style={{ margin:0, fontSize:30, fontWeight:850, letterSpacing:"-.025em", lineHeight:1.05 }}>{title}</h2>
          {subtitle && <p style={{ color:SUB, margin:"6px 0 0", fontSize:14, lineHeight:1.55, maxWidth:720 }}>{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
