import { useState, useEffect, useRef } from "react";

/* ──────────────────────────────────────────────────────────────
   Praxis — shared primitives + theme-aware palette
   TEXT/SUB/FAINT resolve to CSS vars so everything is dual-theme.
   ────────────────────────────────────────────────────────────── */
export const TEXT = "var(--text-h)", SUB = "var(--text-sec)", FAINT = "var(--text-muted)";
const NOISE = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* Fixed ambient backdrop — soft drifting accent glow + grid + grain (theme-aware) */
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
        background:"radial-gradient(circle, color-mix(in srgb, var(--ambient-a) 13%, transparent), transparent 66%)",
        filter:"blur(20px)", animation:"lc-drift 30s ease-in-out infinite" }}/>
      <div ref={b} style={{ position:"absolute", bottom:"-26%", right:"-14%", width:820, height:820, borderRadius:"50%",
        background:"radial-gradient(circle, color-mix(in srgb, var(--ambient-b) 11%, transparent), transparent 66%)",
        filter:"blur(20px)", animation:"lc-drift2 36s ease-in-out infinite" }}/>
      <div style={{ position:"absolute", inset:0,
        backgroundImage:"linear-gradient(color-mix(in srgb, var(--text-faint) 16%, transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb, var(--text-faint) 16%, transparent) 1px,transparent 1px)",
        backgroundSize:"58px 58px",
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
