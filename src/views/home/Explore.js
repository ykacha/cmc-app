import { useEffect, useRef } from "react";

/* The three explorations as large editorial rows. Each illustration floats on
   the page (transparent art), drifts with scroll and leans toward the cursor. */
const ART = (id) => `${process.env.PUBLIC_URL || ""}/science-art/home-${id}.webp`;
const ROWS = [
  { id: "pipeline", art: "pipeline", ask: "How is it done?", name: "Pipeline Explorer", line: "Walk the production line: sixteen stations from a DNA construct to a medicine on the market, with the people, equipment and research papers at each one.", go: "Walk the line" },
  { id: "science", art: "journey", ask: "Why, and what does it prove?", name: "Science journey", line: "The development programme from proposal to dossier: the decisions, the evidence, the interactive tools, and where every result is filed.", go: "Start the journey" },
  { id: "analytical", art: "analytical", ask: "How is it measured?", name: "Analytical", line: "Thirty-three assays run live, a validation lab, specifications and comparability, all from the bench chemist's point of view.", go: "Open the assays" },
];

export default function Explore({ go }) {
  const root = useRef(null);
  useEffect(() => {
    const el = root.current; if (!el) return undefined;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let raf = 0;
    const figs = [...el.querySelectorAll(".hx-art")];
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => figs.forEach(f => {
        const r = f.getBoundingClientRect(), mid = r.top + r.height / 2 - window.innerHeight / 2;
        f.style.setProperty("--py", `${(mid * -0.08).toFixed(1)}px`);
      }));
    };
    const onMove = (e) => {
      const f = e.currentTarget, r = f.getBoundingClientRect();
      f.style.setProperty("--rx", `${(((e.clientY - r.top) / r.height - 0.5) * -6).toFixed(2)}deg`);
      f.style.setProperty("--ry", `${(((e.clientX - r.left) / r.width - 0.5) * 8).toFixed(2)}deg`);
    };
    const onLeave = (e) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); };
    figs.forEach(f => { f.addEventListener("pointermove", onMove); f.addEventListener("pointerleave", onLeave); });
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); figs.forEach(f => { f.removeEventListener("pointermove", onMove); f.removeEventListener("pointerleave", onLeave); }); };
  }, []);

  return (
    <div className="hx" ref={root}>
      {ROWS.map((r, i) => (
        <article key={r.id} className={`hx-row${i % 2 ? " is-flip" : ""}`}>
          <button className="hx-art" onClick={() => go(r.id)} tabIndex={-1} aria-hidden="true">
            <img src={ART(r.art)} alt="" loading="lazy" width="1400" height="933" />
          </button>
          <div className="hx-text">
            <span className="hx-n sv-mono">0{i + 1}</span>
            <span className="hx-ask">{r.ask}</span>
            <h3>{r.name}</h3>
            <p>{r.line}</p>
            <button className="hm-primary" onClick={() => go(r.id)}>{r.go}</button>
          </div>
        </article>
      ))}
    </div>
  );
}
