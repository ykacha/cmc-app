import { useEffect, useRef, useState } from "react";
import { ANALYTICAL_METHODS } from "../../extra-data";
import { METHOD_EXTRAS } from "../../analytical-data";
import { CHAPTERS, SAMPLE_POINTS, SIZE_RANGES } from "./journey-data";

const byId = Object.fromEntries(ANALYTICAL_METHODS.map(m => [m.id, m]));
const isRelease = (id) => (METHOD_EXTRAS[id]?.role || []).some(r => r.startsWith("Release"));

export default function Journey({ go }) {
  const [active, setActive] = useState(CHAPTERS[0].id);
  const refs = useRef({});
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActive(e.target.dataset.id); }), { rootMargin: "-40% 0px -55% 0px" });
    Object.values(refs.current).forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  const jump = (id) => refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="jn">
      <SampleTrain />

      <div className="jn-grid">
        <nav className="jn-spine" aria-label="Chapters">
          <span className="jn-spine-head">The questions every lot must answer</span>
          <ol>
            {CHAPTERS.map((c, i) => (
              <li key={c.id} className={active === c.id ? "is-on" : ""}>
                <button onClick={() => jump(c.id)} aria-current={active === c.id ? "step" : undefined}>
                  <span className="sv-mono">{String(i + 1).padStart(2, "0")}</span>{c.q}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="jn-chapters">
          {CHAPTERS.map((c, i) => (
            <section key={c.id} data-id={c.id} ref={el => (refs.current[c.id] = el)} className="jn-ch">
              <span className="jn-num sv-mono">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="jn-q">{c.q}</h2>
              <p className="jn-plain">{c.plain}</p>
              <p className="jn-patient"><strong>For the patient.</strong> {c.patient}</p>

              {c.ruler && <SizeRuler />}

              {c.assays.length > 0 && (
                <ul className="jn-assays">
                  {c.assays.map(a => {
                    const m = byId[a.id];
                    return (
                      <li key={a.id}>
                        <button onClick={() => go("atlas/" + a.id)}>
                          <strong>{m.abbreviation}</strong>
                          <span className="jn-a-body"><em>{m.name}</em>{a.says}</span>
                          <span className="jn-a-meta">{isRelease(a.id) ? "On every lot" : "Characterisation"}<span className="jn-open">Open</span></span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              {c.links && <p className="jn-link"><strong>How it connects.</strong> {c.links}</p>}
              {c.next && (
                <div className="jn-next">
                  {c.next.map(n => <button key={n.page} className="hm-secondary" onClick={() => go(n.page)}>{n.label}</button>)}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

// Where samples are taken, from cell culture to the filled vial.
function SampleTrain() {
  const [sel, setSel] = useState("ds");
  const p = SAMPLE_POINTS.find(s => s.id === sel);
  return (
    <section className="jn-train">
      <h2 className="hm-h2">First, where the sample comes from.</h2>
      <p className="hm-sub sv-measure">Analytical testing follows the product through manufacturing. Samples are pulled along the way to control the process, and the finished drug substance and drug product are each released against a specification.</p>
      <ol className="jn-stations">
        {SAMPLE_POINTS.map(s => (
          <li key={s.id} className={`${sel === s.id ? "is-on" : ""}${s.release ? " is-release" : ""}`}>
            <button onClick={() => setSel(s.id)} aria-pressed={sel === s.id}>
              <i />
              <span>{s.n}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="jn-station-note" key={sel}>
        <strong>{p.n}{p.release ? ", a release point" : ""}</strong>
        <span>{p.note}</span>
        <span className="jn-tests"><em>Tested here:</em> {p.tests}</span>
      </div>
    </section>
  );
}

// What size range each technique can see, on one log scale.
function SizeRuler() {
  const W = 900, L = 150, R = 20, lo = Math.log10(1e-9), hi = Math.log10(1e-3);
  const X = (m) => L + ((Math.log10(m) - lo) / (hi - lo)) * (W - L - R);
  const ticks = [[1e-9, "1 nm"], [1e-8, "10 nm"], [1e-7, "100 nm"], [1e-6, "1 µm"], [1e-5, "10 µm"], [1e-4, "100 µm"], [1e-3, "1 mm"]];
  const marks = [[1.1e-8, "IgG monomer, ~11 nm"]];
  return (
    <figure className="jn-ruler">
      <svg viewBox={`0 0 ${W} 250`} role="img" aria-label="Size range covered by each technique, from 1 nanometre to 1 millimetre">
        {ticks.map(([v, l]) => <g key={l}><line x1={X(v)} x2={X(v)} y1="20" y2="210" stroke="var(--hairline)" />
          <text x={X(v)} y="232" textAnchor="middle" fontSize="12" fill="var(--text-muted)" className="sv-mono">{l}</text></g>)}
        {SIZE_RANGES.map((r, i) => {
          const y = 34 + i * 36;
          return <g key={r.n}>
            <text x={L - 12} y={y + 5} textAnchor="end" fontSize="13" fontWeight="700" fill="var(--text-h)">{r.n}</text>
            <rect x={X(r.lo)} y={y - 7} width={X(r.hi) - X(r.lo)} height="14" rx="7" fill={i < 2 ? "var(--chain-h)" : i < 4 ? "var(--chain-l)" : "var(--text-muted)"} opacity=".85" />
            <text x={X(r.hi) + 8} y={y + 4} fontSize="11.5" fill="var(--text-sec)">{r.note}</text>
          </g>;
        })}
        <line x1={X(marks[0][0])} x2={X(marks[0][0])} y1="14" y2="214" stroke="var(--glycan)" strokeDasharray="3 3" />
        <text x={X(marks[0][0]) + 5} y="16" fontSize="11" fill="var(--glycan)" className="sv-mono">{marks[0][1]}</text>
      </svg>
      <figcaption>No single method covers the full size range, which is why aggregates are measured with several techniques side by side.</figcaption>
    </figure>
  );
}
