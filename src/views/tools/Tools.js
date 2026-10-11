import "./tools.css";
import { useEffect, useMemo, useState } from "react";
import { lrv, particleMargin, endotoxin, hcpPpm, dfRemaining, dfVolumesFor, tolerance, shelfLife, column, overallYield } from "./calc";
import { fmt } from "../analytical/stats";
import { Injection } from "../science/widgets/process";

/* The CMC workbench. Routes: #/tools, #/tools/<tool>. Every calculator shows its
   formula, its assumptions and where it comes from, and links to the topic that
   explains it. Your product context is kept in this browser only. */

const CTX_KEY = "cmc-tools-context";
const DEFAULT_CTX = { name: "My antibody", concMgPerMl: 150, doseMgPerKg: 2, phase: "Phase 1" };
const loadCtx = () => { try { return { ...DEFAULT_CTX, ...JSON.parse(localStorage.getItem(CTX_KEY) || "{}") }; } catch { return DEFAULT_CTX; } };

const TOOLS = [
  { id: "lrv", group: "Viral safety", name: "Viral clearance and safety margin", line: "LRV per step, what can be claimed, and particles per dose." },
  { id: "shelf", group: "Stability", name: "Shelf life from stability data", line: "Regression with the one-sided 95% confidence bound (ICH Q1E)." },
  { id: "spec", group: "Specifications", name: "Limits from lot data", line: "Two-sided tolerance interval from your lot results." },
  { id: "endo", group: "Safety testing", name: "Endotoxin limit and MVD", line: "K/M limit and the maximum valid dilution." },
  { id: "hcp", group: "Impurities", name: "Host-cell protein in ppm", line: "From ELISA concentration and protein concentration." },
  { id: "df", group: "Downstream", name: "Diafiltration exchange", line: "Buffer remaining after N diavolumes, or volumes needed." },
  { id: "column", group: "Downstream", name: "Column sizing and cycles", line: "Resin volume and cycles for a given load." },
  { id: "yield", group: "Process", name: "Overall yield", line: "Step yields multiplied through the train." },
  { id: "inject", group: "Drug product", name: "Injection force", line: "Syringe glide force from viscosity and needle." },
];

export default function Tools({ navigate, focus }) {
  const [ctx, setCtx] = useState(loadCtx);
  useEffect(() => { try { localStorage.setItem(CTX_KEY, JSON.stringify(ctx)); } catch { /* private mode */ } }, [ctx]);
  const tool = TOOLS.find(t => t.id === (focus || "").split("/")[0]);
  const go = (id) => navigate("tools", id || null);
  const learn = (to) => { const [stage, topic] = to.split("/"); navigate("science", topic ? `${stage}/${topic}` : stage); };

  return (
    <div className="tl">
      <header className="tl-head">
        <div>
          <h1 className="tl-h1">CMC workbench.</h1>
          <p className="tl-lede">Calculators for the numbers CMC scientists work out every week. Each one shows its formula, its assumptions and the source it follows. Results are for learning and checking, not regulatory decisions.</p>
        </div>
        <Context ctx={ctx} setCtx={setCtx} />
      </header>

      <div className="tl-body">
        <nav className="tl-nav" aria-label="Tools">
          {TOOLS.map(t => (
            <button key={t.id} className={tool?.id === t.id ? "is-on" : ""} aria-current={tool?.id === t.id ? "page" : undefined} onClick={() => go(t.id)}>
              <span>{t.group}</span><strong>{t.name}</strong>
            </button>
          ))}
          <div className="tl-nav-more">
            <span>Investigations and records</span>
            <button className="hm-link" onClick={() => navigate("oos", null)}>OOS and OOT investigation</button>
            <button className="hm-link" onClick={() => navigate("batch", null)}>Batch record simulator</button>
          </div>
        </nav>

        <main className="tl-main" key={tool?.id || "home"}>
          {!tool && (
            <div className="tl-grid">
              {TOOLS.map(t => (
                <button key={t.id} className="tl-card" onClick={() => go(t.id)}>
                  <span>{t.group}</span><strong>{t.name}</strong><em>{t.line}</em>
                </button>
              ))}
            </div>
          )}
          {tool?.id === "lrv" && <Lrv learn={learn} />}
          {tool?.id === "shelf" && <Shelf learn={learn} />}
          {tool?.id === "spec" && <Spec learn={learn} />}
          {tool?.id === "endo" && <Endo ctx={ctx} learn={learn} />}
          {tool?.id === "hcp" && <Hcp ctx={ctx} learn={learn} />}
          {tool?.id === "df" && <Df learn={learn} />}
          {tool?.id === "column" && <Column learn={learn} />}
          {tool?.id === "yield" && <Yield learn={learn} />}
          {tool?.id === "inject" && <Panel title="Injection force" learn={learn} topic="formulation/highconc" source="Hagen–Poiseuille estimate for a Newtonian solution; real force also depends on stopper glide force and shear-thinning." formula="F ≈ 8·μ·L·Q·A_barrel / (π·r⁴) + glide force"><Injection /></Panel>}
        </main>
      </div>
    </div>
  );
}

function Context({ ctx, setCtx }) {
  const set = (k) => (e) => setCtx({ ...ctx, [k]: e.target.type === "number" ? +e.target.value : e.target.value });
  return (
    <aside className="tl-ctx" aria-label="Product context">
      <strong>Your product</strong>
      <label>Name<input value={ctx.name} onChange={set("name")} /></label>
      <label>Concentration (mg/mL)<input type="number" min="0" value={ctx.concMgPerMl} onChange={set("concMgPerMl")} /></label>
      <label>Maximum dose (mg/kg per hour)<input type="number" min="0" step="0.1" value={ctx.doseMgPerKg} onChange={set("doseMgPerKg")} /></label>
      <label>Phase<select value={ctx.phase} onChange={set("phase")}>{["Preclinical", "Phase 1", "Phase 2", "Phase 3", "Commercial"].map(p => <option key={p}>{p}</option>)}</select></label>
      <small>Used to prefill the calculators. Kept in this browser only.</small>
    </aside>
  );
}

function Panel({ title, children, formula, source, learn, topic }) {
  return (
    <section className="tl-panel">
      <h2>{title}</h2>
      {children}
      <dl className="tl-meta">
        {formula && <div><dt>Formula</dt><dd className="sv-mono">{formula}</dd></div>}
        {source && <div><dt>Basis and limits</dt><dd>{source}</dd></div>}
      </dl>
      {topic && <button className="hm-link" onClick={() => learn(topic)}>Learn the science behind this</button>}
    </section>
  );
}

const Num = ({ label, value, onChange, step = "any", unit }) => (
  <label className="tl-num"><span>{label}</span><span className="tl-num-in"><input type="number" step={step} value={value} onChange={(e) => onChange(e.target.value === "" ? "" : +e.target.value)} />{unit && <em>{unit}</em>}</span></label>
);
const Out = ({ label, value, tone }) => <div className={`tl-out${tone ? ` is-${tone}` : ""}`}><span>{label}</span><strong>{value}</strong></div>;

/* ── viral clearance ── */
const MECHS = ["Inactivation (low pH)", "Inactivation (solvent/detergent)", "Size exclusion (virus filter)", "Partitioning (chromatography)"];
function Lrv({ learn }) {
  const [steps, setSteps] = useState([
    { id: 1, name: "Low-pH hold", mech: MECHS[0], inTiter: 1e7, outTiter: 3e2 },
    { id: 2, name: "Anion exchange", mech: MECHS[3], inTiter: 2e6, outTiter: 4e1 },
    { id: 3, name: "Virus filtration", mech: MECHS[2], inTiter: 5e6, outTiter: 50 },
  ]);
  const [rvlp, setRvlp] = useState(1e6), [vol, setVol] = useState(0.2);
  const r = useMemo(() => lrv(steps), [steps]);
  const m = particleMargin({ rvlpPerMl: rvlp, harvestLPerDose: vol, totalLrv: r.total });
  const upd = (i, k, v) => setSteps(steps.map((s, j) => (j === i ? { ...s, [k]: v } : s)));
  return (
    <Panel title="Viral clearance and safety margin" learn={learn} topic="downstream/viralstudies"
      formula="LRV = log₁₀(total virus in load) − log₁₀(total virus in product); margin = log₁₀(particles per dose) after clearance"
      source="ICH Q5A(R2). Enter total virus (titre × volume) for load and product from your spiking study. Steps below 1 log are not counted; steps sharing a mechanism should not simply be summed. Example values are illustrative.">
      <div className="tl-table">
        <div className="tl-tr tl-th"><span>Step</span><span>Mechanism</span><span>Virus in</span><span>Virus out</span><span>LRV</span><span /></div>
        {r.rows.map((s, i) => (
          <div className="tl-tr" key={s.id}>
            <input value={s.name} onChange={(e) => upd(i, "name", e.target.value)} aria-label="Step name" />
            <select value={s.mech} onChange={(e) => upd(i, "mech", e.target.value)} aria-label="Mechanism">{MECHS.map(x => <option key={x}>{x}</option>)}</select>
            <input type="number" value={s.inTiter} onChange={(e) => upd(i, "inTiter", +e.target.value)} aria-label="Virus in" />
            <input type="number" value={s.outTiter} onChange={(e) => upd(i, "outTiter", +e.target.value)} aria-label="Virus out" />
            <span className={`sv-mono${s.counted ? "" : " tl-muted"}`}>{fmt(s.lrv, 1)}{!s.counted && " (not counted)"}</span>
            <button className="hm-link" onClick={() => setSteps(steps.filter((_, j) => j !== i))} aria-label={`Remove ${s.name}`}>Remove</button>
          </div>
        ))}
        <button className="hm-link" onClick={() => setSteps([...steps, { id: Date.now(), name: "New step", mech: MECHS[3], inTiter: 1e6, outTiter: 1e3 }])}>Add a step</button>
      </div>
      <div className="tl-row">
        <Num label="Retrovirus-like particles in unprocessed bulk" value={rvlp} onChange={setRvlp} unit="per mL" />
        <Num label="Harvest volume needed per dose" value={vol} onChange={setVol} unit="L" />
      </div>
      <div className="tl-outs">
        <Out label="Cumulative LRV claimed" value={`${fmt(r.total, 1)} log₁₀`} />
        <Out label="Particles per dose after clearance" value={`10^${fmt(m.logPerDose, 1)}`} tone={m.logPerDose < -6 ? "ok" : m.logPerDose < 0 ? "warn" : "bad"} />
        <Out label="Expressed as" value={m.logPerDose < 0 ? `about 1 in ${Number(m.oneIn.toPrecision(2)).toLocaleString()} doses` : "one or more per dose"} />
      </div>
      {r.dupes.length > 0 && <p className="tl-warn">Two counted steps share a mechanism ({r.dupes.join(", ")}). Justify independence before summing them.</p>}
    </Panel>
  );
}

/* ── shelf life ── */
const parsePairs = (txt) => txt.split(/\n/).map(l => l.split(/[\s,;\t]+/).map(Number)).filter(a => a.length >= 2 && a.every(Number.isFinite)).map(([t, y]) => ({ t, y }));
function Shelf({ learn }) {
  const [txt, setTxt] = useState("0, 99.1\n3, 98.9\n6, 98.6\n9, 98.5\n12, 98.2\n18, 97.9\n24, 97.5");
  const [limit, setLimit] = useState(95), [dir, setDir] = useState("down");
  const pts = parsePairs(txt), r = shelfLife(pts, limit, dir);
  return (
    <Panel title="Shelf life from stability data" learn={learn} topic="stability/trends"
      formula="Fit y = a + b·t; shelf life = earliest t where the one-sided 95% confidence bound of the mean meets the acceptance criterion"
      source="ICH Q1E for one batch or poolable batches. ICH Q5C expects the shelf life of a biological to be based on real-time data at the storage condition, so a crossing point beyond your last time point is not a supported shelf life. Example data are illustrative.">
      <div className="tl-row">
        <label className="tl-num tl-text"><span>Time (months), result: one pair per line</span><textarea rows={8} value={txt} onChange={(e) => setTxt(e.target.value)} /></label>
        <div className="tl-col">
          <Num label="Acceptance criterion" value={limit} onChange={setLimit} />
          <label className="tl-num"><span>Criterion is a</span><select value={dir} onChange={(e) => setDir(e.target.value)}><option value="down">Lower limit (result falls)</option><option value="up">Upper limit (result rises)</option></select></label>
        </div>
      </div>
      {r ? (
        <>
          <ShelfChart pts={pts} r={r} limit={limit} />
          <div className="tl-outs">
            <Out label="Slope" value={`${fmt(r.slope, 3)} per month`} />
            <Out label="Bound meets criterion at" value={r.cross === null ? "beyond 60 months" : `${r.cross} months`} />
            <Out label="Supported by real-time data to" value={`${r.lastPoint} months`} tone={r.cross !== null && r.cross < r.lastPoint ? "bad" : "ok"} />
          </div>
          {r.cross !== null && r.cross < r.lastPoint && <p className="tl-warn">The confidence bound already meets the criterion inside the data: the trend does not support the time points tested.</p>}
        </>
      ) : <p className="tl-warn">Enter at least three time points.</p>}
    </Panel>
  );
}
function ShelfChart({ pts, r, limit }) {
  const W = 640, H = 220, P = 36, tMax = Math.max(r.lastPoint * 1.6, 24);
  const ys = [...pts.map(p => p.y), limit], yMin = Math.min(...ys) - 0.5, yMax = Math.max(...ys) + 0.5;
  const X = (t) => P + (t / tMax) * (W - P * 1.5), Y = (y) => H - P - ((y - yMin) / (yMax - yMin)) * (H - P * 1.6);
  const line = (f) => Array.from({ length: 61 }, (_, i) => { const t = (i / 60) * tMax; return `${i ? "L" : "M"}${X(t).toFixed(1)},${Y(f(t)).toFixed(1)}`; }).join(" ");
  return (
    <svg className="tl-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Stability data with regression and confidence bound">
      <rect x={X(0)} y={P * 0.6} width={X(r.lastPoint) - X(0)} height={H - P * 1.6} className="tl-avail" />
      <line x1={X(0)} x2={X(tMax)} y1={Y(limit)} y2={Y(limit)} className="tl-limit" />
      <path d={line(t => r.intercept + r.slope * t)} className="tl-fit" />
      <path d={line(r.bound)} className="tl-ci" />
      {pts.map((p, i) => <circle key={i} cx={X(p.t)} cy={Y(p.y)} r="4" className="tl-pt" />)}
      {r.cross !== null && <line x1={X(r.cross)} x2={X(r.cross)} y1={P * 0.6} y2={H - P} className="tl-cross" />}
      <text x={X(tMax)} y={H - 10} textAnchor="end" className="tl-tick">months</text>
    </svg>
  );
}

/* ── tolerance interval ── */
function Spec({ learn }) {
  const [txt, setTxt] = useState("98.6, 98.9, 98.4, 98.7, 99.0, 98.5, 98.8, 98.3, 98.6, 98.9");
  const vals = txt.split(/[\s,;]+/).map(Number).filter(Number.isFinite), r = tolerance(vals);
  return (
    <Panel title="Limits from lot data" learn={learn} topic="specs/justify"
      formula="mean ± k·s, with k for 99% coverage and 95% confidence (two-sided normal tolerance interval)"
      source="One statistical input to specification setting. Limits also depend on clinical experience, stability, method variability and safety; with few lots the interval is wide and should not be adopted without judgement.">
      <label className="tl-num tl-text"><span>Lot results, separated by commas or spaces</span><textarea rows={3} value={txt} onChange={(e) => setTxt(e.target.value)} /></label>
      {r ? (
        <div className="tl-outs">
          <Out label="Lots" value={r.n} /><Out label="Mean ± SD" value={`${fmt(r.mean)} ± ${fmt(r.sd)}`} /><Out label="k" value={fmt(r.k)} />
          <Out label="Tolerance interval" value={`${fmt(r.lo)} to ${fmt(r.hi)}`} />
        </div>
      ) : <p className="tl-warn">Enter at least three results.</p>}
    </Panel>
  );
}

/* ── endotoxin ── */
function Endo({ ctx, learn }) {
  const [dose, setDose] = useState(ctx.doseMgPerKg), [conc, setConc] = useState(ctx.concMgPerMl), [lambda, setLambda] = useState(0.005), [K, setK] = useState(5);
  const ok = dose > 0 && conc > 0 && lambda > 0 && K > 0, r = ok ? endotoxin({ doseMgPerKg: dose, concMgPerMl: conc, lambda, K }) : null;
  return (
    <Panel title="Endotoxin limit and maximum valid dilution" learn={learn} topic="specs/qcrecords"
      formula="Limit = K / M;  MVD = (limit × concentration) / λ"
      source="USP <85> and Ph. Eur. 2.6.14. K is 5 EU/kg for parenteral routes other than intrathecal (0.2 EU/kg intrathecal); M is the maximum dose per kg per hour; λ is the lowest point of the standard curve or the labelled lysate sensitivity.">
      <div className="tl-row">
        <Num label="K" value={K} onChange={setK} unit="EU/kg" /><Num label="Maximum dose M" value={dose} onChange={setDose} unit="mg/kg/h" />
        <Num label="Product concentration" value={conc} onChange={setConc} unit="mg/mL" /><Num label="λ" value={lambda} onChange={setLambda} unit="EU/mL" />
      </div>
      {r && <div className="tl-outs"><Out label="Endotoxin limit" value={`${fmt(r.limit, 3)} EU/mg`} /><Out label="Maximum valid dilution" value={`1 : ${Math.floor(r.mvd).toLocaleString()}`} /></div>}
    </Panel>
  );
}

/* ── HCP ── */
function Hcp({ ctx, learn }) {
  const [ng, setNg] = useState(121), [mg, setMg] = useState(15.1);
  return (
    <Panel title="Host-cell protein in ppm" learn={learn} topic="downstream/clearance"
      formula="ppm = HCP (ng/mL) ÷ protein (mg/mL) = ng HCP per mg product"
      source="Use the HCP and protein concentration of the same diluted sample. Check dilutional linearity across several dilutions before reporting.">
      <div className="tl-row"><Num label="HCP measured in the well" value={ng} onChange={setNg} unit="ng/mL" /><Num label="Product in the well" value={mg} onChange={setMg} unit="mg/mL" /></div>
      <div className="tl-outs"><Out label="HCP" value={mg > 0 ? `${fmt(hcpPpm(ng, mg), 1)} ppm` : "–"} /><Out label="Undiluted product concentration (context)" value={`${ctx.concMgPerMl} mg/mL`} /></div>
    </Panel>
  );
}

/* ── diafiltration ── */
function Df({ learn }) {
  const [n, setN] = useState(7), [target, setTarget] = useState(0.001);
  return (
    <Panel title="Diafiltration exchange" learn={learn} topic="downstream/filtration"
      formula="Fraction remaining = e^(−N);  N needed = −ln(target fraction)"
      source="Constant-volume diafiltration of a solute that permeates freely. Charged excipients and high protein concentration (Donnan and volume-exclusion effects) shift real values, so measure final pH and excipient levels.">
      <div className="tl-row"><Num label="Diavolumes" value={n} onChange={setN} /><Num label="Target fraction remaining" value={target} onChange={setTarget} /></div>
      <div className="tl-outs"><Out label={`Remaining after ${n} DV`} value={`${fmt(dfRemaining(n) * 100, 3)} %`} /><Out label="Diavolumes needed for target" value={target > 0 && target < 1 ? fmt(dfVolumesFor(target), 1) : "–"} /></div>
    </Panel>
  );
}

/* ── column ── */
function Column({ learn }) {
  const [mass, setMass] = useState(5520), [load, setLoad] = useState(36), [cv, setCv] = useState(40);
  const r = mass > 0 && load > 0 && cv > 0 ? column({ massG: mass, loadGPerL: load, columnL: cv }) : null;
  return (
    <Panel title="Column sizing and cycles" learn={learn} topic="downstream/chromatography"
      formula="Resin needed = mass to load ÷ load density;  cycles = ⌈resin needed ÷ column volume⌉"
      source="Set the load density below the dynamic binding capacity measured at your residence time, with a safety margin and allowance for resin ageing.">
      <div className="tl-row"><Num label="Product to load" value={mass} onChange={setMass} unit="g" /><Num label="Load density" value={load} onChange={setLoad} unit="g/L resin" /><Num label="Column volume" value={cv} onChange={setCv} unit="L" /></div>
      {r && <div className="tl-outs"><Out label="Resin volume needed in one cycle" value={`${fmt(r.resinNeeded, 1)} L`} /><Out label="Cycles on this column" value={r.cycles} /></div>}
    </Panel>
  );
}

/* ── yield ── */
function Yield({ learn }) {
  const [txt, setTxt] = useState("Protein A, 94.7\nLow pH and depth filtration, 97.5\nCation exchange, 91.0\nAnion exchange, 98.1\nVirus filtration, 98.2\nUF/DF, 98.0");
  const steps = txt.split("\n").map(l => { const m = l.match(/^(.*?)[,\t]\s*([\d.]+)\s*$/); return m ? { name: m[1], y: +m[2] } : null; }).filter(Boolean);
  return (
    <Panel title="Overall yield" learn={learn} topic="downstream/clearance"
      formula="Overall yield = Π (step yield / 100) × 100"
      source="A mass balance that does not close at a step usually hides a loss in flow-through, washes or strip, or an assay bias.">
      <label className="tl-num tl-text"><span>Step, yield %: one per line</span><textarea rows={7} value={txt} onChange={(e) => setTxt(e.target.value)} /></label>
      <div className="tl-outs"><Out label="Steps" value={steps.length} /><Out label="Overall yield" value={steps.length ? `${fmt(overallYield(steps.map(s => s.y)), 1)} %` : "–"} /></div>
    </Panel>
  );
}
