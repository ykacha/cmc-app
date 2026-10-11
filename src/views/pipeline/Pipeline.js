import "./pipeline.css";
import "../analytical/analytical.css";
import { useEffect, useRef, useState, useCallback } from "react";
import { PIPELINE } from "../../cmc-data";
import { STAGE_OVERVIEWS } from "../../pipeline-overview-data";
import { PLANT, PHASES, phaseOf } from "../../pipeline/plant";
import { pipeArt } from "../../science/art";
import StagePage from "./StagePage";

/* Pipeline Explorer. Routes:
     #/pipeline                 the production line
     #/pipeline/line/<sid>      the line, positioned at a station
     #/pipeline/<sid>[/<card>]  a station's deep dive */

const N = PIPELINE.length;
const num = (s) => s.stage;
const reduced = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const narrow = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 900px)").matches;

export default function Pipeline({ navigate, focus }) {
  const parts = (focus || "").split("/").filter(Boolean);
  const go = (path) => navigate("pipeline", path || null);
  if (parts[0] && parts[0] !== "line" && PIPELINE.some(s => s.id === parts[0])) {
    return <StagePage sid={parts[0]} card={parts[1]} go={go} navigate={navigate} />;
  }
  return <Line go={go} navigate={navigate} at={parts[0] === "line" ? parts[1] : null} />;
}

function Line({ go, navigate, at }) {
  const [linear, setLinear] = useState(() => reduced() || narrow());
  useEffect(() => {
    const mq = window.matchMedia ? window.matchMedia("(max-width: 900px)") : null;
    const on = () => setLinear(reduced() || narrow());
    mq && mq.addEventListener && mq.addEventListener("change", on);
    return () => mq && mq.removeEventListener && mq.removeEventListener("change", on);
  }, []);

  return (
    <div className="pl2">
      <header className="pl2-hero">
        <div>
          <h1 className="pl2-h1">How a biologic<br />is made.</h1>
          <p className="pl2-lede">Walk the production line: sixteen stations from a DNA construct to a medicine on the market. What is in hand at each one, who does the work, with what, and what they pass on.</p>
        </div>
        <aside className="pl2-vs">
          <p><strong>Pipeline</strong> shows how it is done, station by station.</p>
          <p><strong>Science journey</strong> explains why, and what each stage proves.</p>
          <button className="hm-link" onClick={() => navigate("science", null)}>Open the Science journey</button>
        </aside>
      </header>

      {linear ? <Vertical go={go} /> : <Horizontal go={go} at={at} />}

      <section className="pl2-index" aria-labelledby="pl2-index-h">
        <h2 id="pl2-index-h" className="hm-h2">Every station.</h2>
        {PHASES.map(p => (
          <div key={p.id} className="pl2-index-phase" style={{ "--ph": p.color }}>
            <h3>{p.name}</h3>
            <ol>
              {PIPELINE.filter(s => { const n = +s.stage; return n >= p.range[0] && n <= p.range[1]; }).map(s => (
                <li key={s.id}>
                  <button onClick={() => go(s.id)}>
                    <span className="sv-mono">{num(s)}</span>
                    <strong>{s.label}</strong>
                    <em>{s.topics.length} deep dives, {s.questions.length} questions</em>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </div>
  );
}

/* ─────────── The production line: vertical scroll drives a horizontal track ─────────── */

function Horizontal({ go, at }) {
  const outer = useRef(null), track = useRef(null);
  const [p, setP] = useState(0);           // 0..1 along the line
  const [vw, setVw] = useState(1200);

  const measure = useCallback(() => {
    const el = outer.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const total = el.offsetHeight - window.innerHeight;
    setP(Math.min(1, Math.max(0, -r.top / Math.max(1, total))));
    setVw(el.querySelector(".pl2-viewport")?.clientWidth || 1200);
  }, []);

  useEffect(() => {
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    measure();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, [measure]);

  // positioned at a station when arriving from a deep dive
  useEffect(() => {
    if (!at) return;
    const i = PIPELINE.findIndex(s => s.id === at);
    if (i >= 0) requestAnimationFrame(() => jump(i, "auto"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [at]);

  const stationW = Math.min(980, Math.max(620, vw * 0.72));
  const trackW = stationW * N + vw * 0.3;
  const x = p * (trackW - vw);
  const active = Math.min(N - 1, Math.max(0, Math.round((x + vw / 2 - vw * 0.15 - stationW / 2) / stationW)));

  const jump = (i, behavior = "smooth") => {
    const el = outer.current; if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const targetX = i * stationW + vw * 0.15 + stationW / 2 - vw / 2;
    const frac = Math.min(1, Math.max(0, targetX / (trackW - vw)));
    window.scrollTo({ top: el.offsetTop + frac * total, behavior });
  };

  const onKey = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); jump(Math.min(N - 1, active + 1)); }
    if (e.key === "ArrowLeft") { e.preventDefault(); jump(Math.max(0, active - 1)); }
  };

  // the pipe: one gentle wave through every station
  const pipeY = (i) => 0.5 + 0.035 * Math.sin(i * 1.3);
  const pts = PIPELINE.map((_, i) => [vw * 0.15 + i * stationW + stationW / 2, pipeY(i)]);

  return (
    <section className="pl2-line" ref={outer} style={{ height: `${N * 70 + 40}vh` }} aria-label="The production line">
      <div className="pl2-sticky">
        <div className="pl2-viewport" tabIndex={0} onKeyDown={onKey} aria-label="Production line. Use left and right arrows to move between stations.">
          <div className="pl2-track" ref={track} style={{ width: trackW, transform: `translate3d(${-x}px,0,0)` }}>
            <Pipe pts={pts} w={trackW} progress={p} />
            {PIPELINE.map((s, i) => (
              <Station key={s.id} s={s} i={i} left={vw * 0.15 + i * stationW} w={stationW} y={pipeY(i)} on={i === active} go={go} />
            ))}
          </div>
        </div>
        <Minimap active={active} jump={jump} />
      </div>
    </section>
  );
}

function Pipe({ pts, w, progress }) {
  const H = 1000;     // the SVG uses a 0..1000 vertical space mapped to the viewport height
  const d = pts.reduce((acc, [x, y], i) => {
    const Y = y * H;
    if (i === 0) return `M 0 ${Y} L ${x} ${Y}`;
    const [px, py] = pts[i - 1]; const PY = py * H; const mx = (px + x) / 2;
    return `${acc} C ${mx} ${PY}, ${mx} ${Y}, ${x} ${Y}`;
  }, "") + ` L ${w} ${pts[pts.length - 1][1] * H}`;
  return (
    <svg className="pl2-pipe" viewBox={`0 0 ${w} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="pl2-grad" x1="0" x2={w} y1="0" y2="0" gradientUnits="userSpaceOnUse">
          {PHASES.map((ph, k) => {
            const a = pts[ph.range[0] - 1][0] / w, b = pts[ph.range[1] - 1][0] / w;
            return [<stop key={ph.id + "a"} offset={Math.max(0, a - 0.01)} stopColor={ph.color} />, <stop key={ph.id + "b"} offset={Math.min(1, b + 0.01)} stopColor={ph.color} />];
          })}
        </linearGradient>
      </defs>
      <path d={d} className="pl2-pipe-shell" />
      <path d={d} className="pl2-pipe-core" stroke="url(#pl2-grad)" />
      <path d={d} className="pl2-pipe-flow" style={{ strokeDashoffset: -progress * 4000 }} />
    </svg>
  );
}

function Station({ s, i, left, w, y, on, go }) {
  const plant = PLANT[s.id], ov = STAGE_OVERVIEWS[s.id], ph = phaseOf(+s.stage);
  const art = pipeArt(s.id);
  const next = PIPELINE[i + 1];
  return (
    <article className={`pl2-st${on ? " is-on" : ""}`} style={{ left, width: w, "--ph": ph.color, "--py": `${y * 100}%` }} aria-current={on ? "step" : undefined}>
      <div className="pl2-st-art">{art && <img src={art} alt="" width="1536" height="1024" loading={i < 3 ? "eager" : "lazy"} />}</div>
      <span className="pl2-st-node" aria-hidden="true" />
      <div className="pl2-st-text">
        <div className="pl2-st-head">
          <span className="pl2-st-n sv-mono">{s.stage}</span>
          <span className="pl2-st-phase">{ph.name}</span>
        </div>
        <h2>{s.label}</h2>
        <div className="pl2-st-cols">
          <div className="pl2-st-hand">
            <span>In hand</span>
            <strong>{plant.inHand.big}</strong>
            <em>{plant.inHand.unit}</em>
            <p>{plant.inHand.note}</p>
          </div>
          <div className="pl2-st-who">
            <span>Who is at work</span>
            <ul>{plant.people.map(p => <li key={p.role}><b>{p.role}</b>{p.does}</li>)}</ul>
          </div>
        </div>
        <div className="pl2-st-foot">
          <span className="pl2-st-time">{ov.duration.split(/[;(]/)[0]}</span>
          {next && <span className="pl2-st-pass">Passes on to {next.label}</span>}
          <button className="hm-primary" onClick={() => go(s.id)} tabIndex={on ? 0 : -1}>Deep dive: {s.topics.length} topics</button>
        </div>
      </div>
    </article>
  );
}

function Minimap({ active, jump }) {
  return (
    <nav className="pl2-map" aria-label="Stations">
      {PHASES.map(ph => (
        <div key={ph.id} className="pl2-map-phase" style={{ "--ph": ph.color, flexGrow: ph.range[1] - ph.range[0] + 1 }}>
          <span className="pl2-map-name">{ph.name}</span>
          <div className="pl2-map-ticks">
            {PIPELINE.slice(ph.range[0] - 1, ph.range[1]).map((s, k) => {
              const i = ph.range[0] - 1 + k;
              return (
                <button key={s.id} className={`${i === active ? "is-on" : ""}${i < active ? " is-past" : ""}`} onClick={() => jump(i)} aria-label={`${s.stage} ${s.label}`} aria-current={i === active ? "step" : undefined}>
                  <i /><span>{s.stage}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

/* ─────────── Phone and reduced motion: the same stations, in a column ─────────── */

function Vertical({ go }) {
  return (
    <ol className="pl2-vert" aria-label="The production line">
      {PIPELINE.map((s, i) => {
        const plant = PLANT[s.id], ph = phaseOf(+s.stage), art = pipeArt(s.id), next = PIPELINE[i + 1];
        return (
          <li key={s.id} style={{ "--ph": ph.color }}>
            <span className="pl2-vert-node" aria-hidden="true" />
            <div className="pl2-st-head"><span className="pl2-st-n sv-mono">{s.stage}</span><span className="pl2-st-phase">{ph.name}</span></div>
            <h2>{s.label}</h2>
            {art && <img src={art} alt="" width="1536" height="1024" loading="lazy" />}
            <div className="pl2-st-hand"><span>In hand</span><strong>{plant.inHand.big}</strong><em>{plant.inHand.unit}</em><p>{plant.inHand.note}</p></div>
            <div className="pl2-st-who"><span>Who is at work</span><ul>{plant.people.map(p => <li key={p.role}><b>{p.role}</b>{p.does}</li>)}</ul></div>
            {next && <span className="pl2-st-pass">Passes on to {next.label}</span>}
            <button className="hm-primary" onClick={() => go(s.id)}>Deep dive: {s.topics.length} topics</button>
          </li>
        );
      })}
    </ol>
  );
}
