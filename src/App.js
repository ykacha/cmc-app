import { useState, useMemo } from "react";
import StabilityView from "./views/StabilityView";
import OOSView from "./views/OOSView";
import CaseStudiesView from "./views/CaseStudiesView";
import CompendialView from "./views/CompendialView";
import ExcipientView from "./views/ExcipientView";
import PathwayView from "./views/PathwayView";
import BatchRecordView from "./views/BatchRecordView";
import ProgressView from "./views/ProgressView";
import { PIPELINE, DOMAINS, GLOSSARY } from "./cmc-data";
import { ANALYTICAL_METHODS, CTD_MODULES, CMC_TIMELINE, ICH_GUIDELINES } from "./extra-data";
import { CAREER_PATHS, INTERVIEW_QUESTIONS, SKILLS_MATRIX } from "./career-data";
import { QTPP, CQA_LIST, CPP_LIST, FMEA_TABLE, DOE_STUDIES, DESIGN_SPACE, CONTROL_STRATEGY, COA_ELEMENTS } from "./qbd-data";

// ── Level colors ──────────────────────────────────────────────
const LC = { Foundational:"#22D3EE", Intermediate:"#34D399", Advanced:"#F59E0B", Expert:"#F472B6" };

// ── Method ratings (sensitivity / throughput / cost 0-100) ────
const RATINGS = {
  "am-peptide-map":  { sensitivity:93, throughput:25, cost:90, reg:5 },
  "am-intact-mass":  { sensitivity:88, throughput:42, cost:83, reg:4 },
  "am-ce-sds":       { sensitivity:84, throughput:78, cost:38, reg:5 },
  "am-cief":         { sensitivity:82, throughput:73, cost:36, reg:5 },
  "am-sec":          { sensitivity:70, throughput:92, cost:28, reg:5 },
  "am-iex":          { sensitivity:76, throughput:76, cost:34, reg:4 },
  "am-sec-mals":     { sensitivity:86, throughput:40, cost:72, reg:3 },
  "am-cell-bioassay":{ sensitivity:82, throughput:22, cost:88, reg:5 },
  "am-elisa":        { sensitivity:91, throughput:82, cost:28, reg:4 },
  "am-spr":          { sensitivity:96, throughput:36, cost:84, reg:4 },
  "am-glycan":       { sensitivity:88, throughput:44, cost:60, reg:5 },
  "am-dls":          { sensitivity:64, throughput:92, cost:23, reg:3 },
  "am-dsc":          { sensitivity:82, throughput:52, cost:54, reg:3 },
  "am-mfi":          { sensitivity:76, throughput:70, cost:44, reg:5 },
  "am-endotoxin":    { sensitivity:96, throughput:82, cost:18, reg:5 },
  "am-bioburden":    { sensitivity:88, throughput:18, cost:22, reg:5 },
  "am-cd":           { sensitivity:78, throughput:55, cost:50, reg:4 },
  "am-a280":         { sensitivity:58, throughput:98, cost:4,  reg:5 },
};

// ── Method workflow steps ─────────────────────────────────────
const METHOD_STEPS = {
  "am-peptide-map":   ["Denature & reduce (DTT + guanidine HCl, 37°C 1h)","Alkylate cysteines (iodoacetamide, dark 30 min)","Digest with trypsin (37°C, 18h, enzyme:protein 1:20)","Quench digest (0.1% TFA), C18 desalt","RP-HPLC gradient (5→50% ACN/0.1% FA, 60 min)","ESI-MS/MS detection (Orbitrap, Top10 DDA)","Data analysis: compare peptide map to reference"],
  "am-intact-mass":   ["Buffer exchange to volatile buffer (10 mM AmAc pH 7)","Optional IdeS digestion to Fab₂ + Fc/2 subunits","Optional DTT reduction for HC + LC analysis","Direct infusion or LC-MS (C4 column)","ESI charge state envelope recorded","Deconvolute with MaxEnt/UniDec","Compare mass to expected (± 5 ppm)"],
  "am-ce-sds":        ["Dilute protein to 1 mg/mL in SDS sample buffer","NR: alkylate with NEM (10 mM, RT 5 min)","R: add DTT (50 mM, 70°C 5 min), then IAA","Dilute with run buffer; inject ~25 nL","Electrophoresis at 15 kV, 35 min","Detect at UV 220 nm","Quantify peak areas vs. MW ladder"],
  "am-cief":          ["Prepare protein in ampholyte + pI markers mix","Load into capillary (10 cm × 100 µm ID)","Focus: 3 kV × 1 min → 5 kV × 8 min (icIEF)","Whole-column UV imaging (280 nm)","Identify peaks by pI markers","Integrate % main, % acidic, % basic","Report pI profile vs. reference standard"],
  "am-sec":           ["Equilibrate column (3–5 CV PBS pH 7.4)","Inject 10–50 µg protein","Isocratic flow 0.5 mL/min × 30 min","UV 280 nm detection","Integrate monomer, HMW, LMW peaks","Report % main peak and % HMW","Compare to reference standard and specification"],
  "am-iex":           ["Equilibrate CEX column (low salt buffer pH 5)","Inject ~100 µg protein","Apply linear NaCl gradient (0→500 mM, 40 min)","UV 280 nm detection","Integrate % main, % acidic, % basic","Compare elution profile to reference standard","Track acidic/basic species across stability time points"],
  "am-cell-bioassay": ["Thaw target cell line, check passage number","Seed in 96-well plate (50,000 cells/well)","Add serial dilutions of sample + reference (8 points, 1:3)","Incubate 4–6h (37°C, 5% CO₂)","Add substrate (BriteLite luciferase reagent)","Read luminescence (Envision plate reader)","Fit 4PL, test parallelism, calculate relative potency"],
  "am-elisa":         ["Coat plate with antigen (2 µg/mL, overnight 4°C)","Wash 3× PBST, block 1h (1% BSA)","Add serial dilutions sample + reference standard","Incubate 1h RT, wash 5× PBST","Add HRP-conjugated anti-Fc antibody (1h RT)","Add TMB substrate (15 min); stop with H₂SO₄","Read OD450–OD620, fit 4PL, report EC50"],
  "am-spr":           ["Dock CM5 sensor chip; activate with EDC/NHS","Immobilize ligand (antigen, 30–50 RU)","Deactivate excess with ethanolamine","Inject analyte (5 concentrations spanning KD)","Measure association (60s) and dissociation (300s)","Regenerate surface (glycine pH 1.5–2.0)","Fit global 1:1 kinetic model, extract kon/koff/KD"],
  "am-glycan":        ["Denature protein (SDS, 70°C 5 min)","Add surfactant & PNGase F (37°C 18h)","Dry glycans by speed-vac (30 min)","Label with RapiFluor-MS (5 min RT)","Quench labeling; inject on HILIC column","FLR detection (Ex 265/Em 425 nm)","Identify glycan peaks by reference library, report %"],
  "am-dls":           ["Centrifuge sample (10,000g, 5 min) to remove dust","Load 50 µL into cuvette (ZetaSizer Nano)","Equilibrate to target temperature (25°C)","Acquire 3 × 10 measurements (1 min each)","Report Z-average diameter and PDI","Optional: temperature ramp 25→90°C for Tm","Interpret number/volume/intensity distributions"],
  "am-dsc":           ["Buffer exchange protein into formulation buffer","Load 300 µL (~0.5–2 mg/mL) into sample cell","Load matched buffer into reference cell","Scan 10→100°C at 1°C/min","Rescan (post-unfolding) to assess reversibility","Subtract buffer baseline, convert to Cp","Fit transitions to extract Tm, ΔH, onset temp"],
  "am-mfi":           ["Degas water for flow cell rinse","Prime MFI-5200 instrument (3× DI water flush)","Inject sample (1 mL) at 0.1 mL/min","Capture images at 23 fps, 100× field","Analyze morphology (ECD, aspect ratio, transparency)","Classify: protein vs. silicone vs. glass particles","Report cumulative count ≥2, ≥5, ≥10, ≥25 µm/mL"],
  "am-endotoxin":     ["Prepare sample at MVD dilution in LAL water","Prepare standard curve (4–5 points, 0.005–5 EU/mL)","Add kinetic chromogenic LAL reagent","Incubate 37°C; read OD405 every 1 min","Determine onset time for each concentration","Calculate IPC (spike recovery: 50–200%)","Report EU/mL; compare vs. specification"],
  "am-bioburden":     ["Filter sample (≤0.45 µm membrane, aseptic technique)","Transfer membrane to TAMC plate (R2A or TSA)","Incubate 3–5 days at 30–35°C (TAMC)","Transfer second membrane to TYMC plate (SDA)","Incubate 5–7 days at 20–25°C (TYMC)","Count colonies (25–250 CFU per plate rule)","Report CFU/mL or CFU/g vs. specification"],
  "am-cd":            ["Buffer exchange into CD-compatible buffer (no TRIS)","Measure A280 for exact protein concentration","Load into 0.1 mm cuvette (far-UV) or 10 mm (near-UV)","Scan 190–250 nm (far) or 250–320 nm (near), 3 accumulations","Subtract buffer spectrum baseline","Convert to mean residue ellipticity (MRE)","Compare spectrum shape to reference standard"],
  "am-a280":          ["Pipette 2 µL into NanoDrop (or 1 cm cuvette)","Blank with formulation buffer","Measure A280 and A320 (turbidity correction)","Apply: Conc = (A280–A320) / ε × pathlength","Verify result within ±10% of nominal","Dilute if >3.5 AU or use SoloVPE for HiConc","Report mg/mL with units and method reference"],
};

// ── SVG Mini Diagrams (per method visual type) ────────────────
const Chromatogram = ({ color, peaks=[0.35,1,0.18], label="UV 280nm" }) => (
  <svg width="100%" height="68" viewBox="0 0 200 68" preserveAspectRatio="none" className="method-diagram">
    <defs>
      <linearGradient id={`g${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.55"/>
        <stop offset="100%" stopColor={color} stopOpacity="0"/>
      </linearGradient>
    </defs>
    <line x1="0" y1="62" x2="200" y2="62" stroke="var(--border-bright)" strokeWidth="1"/>
    {peaks.map((h,i)=>{
      const cx=28+i*58; const ry=h*52; const rx=12+h*10;
      return <g key={i}>
        <ellipse cx={cx} cy={62} rx={rx} ry={ry} fill={`url(#g${color.replace('#','')})`}/>
        <ellipse cx={cx} cy={62} rx={rx} ry={ry} fill="none" stroke={color} strokeWidth="1.5"/>
      </g>;
    })}
    <text x="2" y="66" fill="var(--text-faint)" fontSize="7">{label}</text>
  </svg>
);

const SigmoidCurve = ({ color }) => (
  <svg width="100%" height="68" viewBox="0 0 200 68" preserveAspectRatio="none" className="method-diagram">
    <defs>
      <linearGradient id={`sg${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.4"/>
        <stop offset="100%" stopColor={color} stopOpacity="0"/>
      </linearGradient>
    </defs>
    <line x1="0" y1="62" x2="200" y2="62" stroke="var(--border-bright)" strokeWidth="1"/>
    <path d="M5,60 C30,60 50,55 80,32 C110,10 130,5 195,4" stroke={color} strokeWidth="2.5" fill="none"/>
    <path d="M5,62 C30,62 50,57 80,33 C110,11 130,6 195,6 L195,62 Z" fill={`url(#sg${color.replace('#','')})`}/>
    <line x1="97" y1="32" x2="97" y2="62" stroke={color} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>
    <text x="2" y="66" fill="var(--text-faint)" fontSize="7">Dose →</text>
    <text x="80" y="66" fill={color} fontSize="7">EC₅₀</text>
  </svg>
);

const GelBands = ({ color }) => (
  <svg width="100%" height="68" viewBox="0 0 200 68" preserveAspectRatio="none" className="method-diagram">
    <rect x="0" y="0" width="200" height="68" fill="var(--bg-surface)" rx="4"/>
    {[[30,8,"HC ~50kDa"],[18,22,"LC ~25kDa"],[8,38,"frag"],[25,48,"HC+LC"]].map(([w,y,lbl],i)=>(
      <g key={i}>
        <rect x={10} y={y} width={w} height={7} fill={color} opacity={0.7} rx="2"/>
        <text x={10+w+4} y={y+6} fill="var(--text-faint)" fontSize="6.5">{lbl}</text>
      </g>
    ))}
    <text x="2" y="66" fill="var(--text-faint)" fontSize="7">CE-SDS Gel</text>
  </svg>
);

const MultiPeaks = ({ color }) => (
  <svg width="100%" height="68" viewBox="0 0 200 68" preserveAspectRatio="none" className="method-diagram">
    <defs>
      <linearGradient id={`mp${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.5"/>
        <stop offset="100%" stopColor={color} stopOpacity="0"/>
      </linearGradient>
    </defs>
    <line x1="0" y1="62" x2="200" y2="62" stroke="var(--border-bright)" strokeWidth="1"/>
    {[[18,0.4],[38,0.85],[60,1],[80,0.7],[100,0.45],[120,0.6],[145,0.38],[168,0.28]].map(([cx,h],i)=>(
      <ellipse key={i} cx={cx} cy={62} rx={8} ry={h*52} fill={`url(#mp${color.replace('#','')})`} stroke={color} strokeWidth="1.2"/>
    ))}
    <text x="2" y="66" fill="var(--text-faint)" fontSize="7">Glycan Profile</text>
  </svg>
);

const ScatterDot = ({ color }) => (
  <svg width="100%" height="68" viewBox="0 0 200 68" preserveAspectRatio="none" className="method-diagram">
    <line x1="0" y1="62" x2="200" y2="62" stroke="var(--border-bright)" strokeWidth="1"/>
    <line x1="5" y1="0" x2="5" y2="62" stroke="var(--border-bright)" strokeWidth="1"/>
    {[[20,50],[45,22],[70,8],[95,14],[115,42],[140,58],[160,55],[180,36]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r="3.5" fill={color} opacity={0.75}/>
    ))}
    <path d="M20,50 C50,20 80,8 120,25 C150,40 165,54 180,38" stroke={color} strokeWidth="1.5" fill="none" strokeDasharray="4,3" opacity="0.6"/>
    <text x="2" y="66" fill="var(--text-faint)" fontSize="7">kD / Rh</text>
  </svg>
);

const ThermalCurve = ({ color }) => (
  <svg width="100%" height="68" viewBox="0 0 200 68" preserveAspectRatio="none" className="method-diagram">
    <line x1="0" y1="55" x2="200" y2="55" stroke="var(--border-bright)" strokeWidth="1"/>
    <path d="M5,52 C20,52 35,52 55,52 C65,52 68,30 75,10 C82,30 85,52 95,52 C120,52 125,52 145,52 C155,52 158,35 163,20 C168,35 171,52 185,52" stroke={color} strokeWidth="2.2" fill="none"/>
    <text x="70" y="8" fill={color} fontSize="7">Tm₁</text>
    <text x="156" y="18" fill={color} fontSize="7">Tm₂</text>
    <text x="2" y="66" fill="var(--text-faint)" fontSize="7">Temperature →</text>
  </svg>
);

const BarSpectrum = ({ color }) => (
  <svg width="100%" height="68" viewBox="0 0 200 68" preserveAspectRatio="none" className="method-diagram">
    <line x1="0" y1="62" x2="200" y2="62" stroke="var(--border-bright)" strokeWidth="1"/>
    {[[18,45],[30,20],[48,55],[62,12],[80,38],[92,8],[108,50],[125,18],[142,30],[160,42],[178,10]].map(([x,h],i)=>(
      <rect key={i} x={x-2} y={62-h} width={4} height={h} fill={color} opacity={0.7+(i%3)*0.1} rx="1"/>
    ))}
    <text x="2" y="66" fill="var(--text-faint)" fontSize="7">m/z →</text>
  </svg>
);

const CDSpectrum = ({ color }) => (
  <svg width="100%" height="68" viewBox="0 0 200 68" preserveAspectRatio="none" className="method-diagram">
    <line x1="0" y1="34" x2="200" y2="34" stroke="var(--border-bright)" strokeWidth="1"/>
    <path d="M5,34 C20,34 30,12 45,8 C60,12 70,34 85,54 C100,34 115,14 135,22 C155,30 175,34 195,34" stroke={color} strokeWidth="2.2" fill="none"/>
    <text x="2" y="66" fill="var(--text-faint)" fontSize="7">λ (nm) →  [θ] MRE</text>
  </svg>
);

const PassFailViz = ({ color }) => (
  <svg width="100%" height="68" viewBox="0 0 200 68" preserveAspectRatio="none" className="method-diagram">
    <rect x="10" y="16" width="78" height="36" fill={color+"22"} stroke={color} strokeWidth="1.5" rx="6"/>
    <text x="49" y="38" textAnchor="middle" fill={color} fontSize="11" fontWeight="bold">PASS</text>
    <rect x="112" y="16" width="78" height="36" fill="var(--bg-surface)" stroke="var(--border)" strokeWidth="1.5" rx="6" strokeDasharray="4,3"/>
    <text x="151" y="38" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="bold">FAIL</text>
    <text x="2" y="66" fill="var(--text-faint)" fontSize="7">Lot Release Decision</text>
  </svg>
);

// Map method ID → diagram component
const MethodDiagram = ({ method }) => {
  const c = method.color;
  if (method.id==="am-ce-sds") return <GelBands color={c}/>;
  if (method.id==="am-glycan") return <MultiPeaks color={c}/>;
  if (method.id==="am-cief")   return <Chromatogram color={c} peaks={[0.25,0.55,1,0.6,0.3,0.18]} label="pI →"/>;
  if (method.id==="am-cell-bioassay"||method.id==="am-elisa"||method.id==="am-spr") return <SigmoidCurve color={c}/>;
  if (method.id==="am-dls")    return <ScatterDot color={c}/>;
  if (method.id==="am-dsc")    return <ThermalCurve color={c}/>;
  if (method.id==="am-cd")     return <CDSpectrum color={c}/>;
  if (method.id==="am-intact-mass"||method.id==="am-a280") return <BarSpectrum color={c}/>;
  if (method.category==="Safety") return <PassFailViz color={c}/>;
  return <Chromatogram color={c}/>;
};

// ── Rating Bar ─────────────────────────────────────────────────
const RatingBar = ({ label, value, color }) => (
  <div style={{ marginBottom:6 }}>
    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
      <span style={{ color:"var(--text-muted)", fontSize:10, fontWeight:700, letterSpacing:"0.04em" }}>{label}</span>
      <span style={{ color, fontSize:10, fontWeight:800 }}>{value}%</span>
    </div>
    <div style={{ background:"var(--bg-surface)", borderRadius:4, height:5, overflow:"hidden" }}>
      <div className="rating-fill" style={{ width:`${value}%`, background:color, height:5, borderRadius:4 }}/>
    </div>
  </div>
);

// ── Reg Stars ──────────────────────────────────────────────────
const RegStars = ({ n, color }) => (
  <span>{[1,2,3,4,5].map(i=>(
    <span key={i} style={{ color: i<=n ? color : "var(--text-faint)", fontSize:12 }}>★</span>
  ))}</span>
);

// ── Shared Components ─────────────────────────────────────────
const Badge = ({ level }) => (
  <span style={{ background:LC[level]+"22", color:LC[level], border:`1px solid ${LC[level]}44`,
    padding:"2px 8px", borderRadius:12, fontSize:11, fontWeight:700, whiteSpace:"nowrap" }}>
    {level}
  </span>
);

const SectionHeader = ({ icon, title, subtitle }) => (
  <div style={{ marginBottom:32 }}>
    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
      <span style={{ fontSize:36 }}>{icon}</span>
      <div>
        <h2 style={{ color:"var(--text-h)", margin:0, fontSize:26, fontWeight:900 }}>{title}</h2>
        {subtitle && <p style={{ color:"var(--text-sec)", margin:"4px 0 0", fontSize:15 }}>{subtitle}</p>}
      </div>
    </div>
  </div>
);

const InfoBox = ({ color, label, text }) => (
  <div style={{ background:`${color}11`, border:`1px solid ${color}33`, borderRadius:8, padding:"10px 14px", marginBottom:8 }}>
    <strong style={{ color, fontSize:11, letterSpacing:"0.05em" }}>{label}</strong>
    <p style={{ color:"var(--text-body)", margin:"6px 0 0", fontSize:13, lineHeight:1.65 }}>{text}</p>
  </div>
);

const PhasePill = ({ phase, active }) => (
  <span style={{
    background: active ? "#34D39933" : "var(--bg-raised)",
    color: active ? "#34D399" : "var(--text-faint)",
    border: `1px solid ${active ? "#34D39944" : "var(--border)"}`,
    padding:"2px 7px", borderRadius:10, fontSize:10, fontWeight:700,
    transition:"all 0.2s ease",
  }}>{phase}</span>
);

// ── DNA Logo SVG ───────────────────────────────────────────────
const DNALogo = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 2C8.5 2 15 5.5 19.5 5.5" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M5 6.5C8.5 6.5 15 10 19.5 10" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M5 11C8.5 11 15 14.5 19.5 14.5" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M5 15.5C8.5 15.5 15 19 19.5 19" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M5 20C8.5 20 15 23.5 19.5 23.5" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="9" y1="2" x2="9" y2="6.5" stroke="#DDD6FE" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="15.5" y1="5.5" x2="15.5" y2="10" stroke="#DDD6FE" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="9" y1="11" x2="9" y2="15.5" stroke="#DDD6FE" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="15.5" y1="14.5" x2="15.5" y2="19" stroke="#DDD6FE" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="9" y1="20" x2="9" y2="23.5" stroke="#DDD6FE" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

// ── Filter Button ─────────────────────────────────────────────
const FilterBtn = ({ label, active, color, onClick }) => (
  <button onClick={onClick} className="cat-tab"
    style={{
      background: active ? (color||"var(--accent)") : "var(--bg-raised)",
      color: active ? (color ? "#000" : "#fff") : "var(--text-sec)",
      border:`1px solid ${active ? (color||"var(--accent)") : "var(--border)"}`,
      borderRadius:20, padding:"5px 14px", cursor:"pointer", fontSize:12, fontWeight:600,
    }}>
    {label}
  </button>
);

// ════════════════════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════════════════════
function Dashboard({ setView }) {
  const allPipelineQ = PIPELINE.flatMap(s => s.questions);
  const allDomainQ = DOMAINS.flatMap(d => d.questions);
  const dcounts = l => allDomainQ.filter(q => q.level===l).length;

  const stats = [
    { label:"Pipeline Stages", value:PIPELINE.length, icon:"🗺️", color:"#C084FC", view:"pipeline" },
    { label:"Pipeline Questions", value:allPipelineQ.length, icon:"❓", color:"#38BDF8", view:"pipeline" },
    { label:"Domain Questions", value:allDomainQ.length, icon:"📚", color:"#34D399", view:"domains" },
    { label:"Analytical Methods", value:ANALYTICAL_METHODS.length, icon:"🔬", color:"#22D3EE", view:"methods" },
    { label:"ICH Guidelines", value:ICH_GUIDELINES.length, icon:"📜", color:"#A78BFA", view:"ich" },
    { label:"Glossary Terms", value:GLOSSARY.length, icon:"📖", color:"#FB923C", view:"glossary" },
  ];

  const [randQ, setRandQ] = useState(null);
  const [pipeOffset, setPipeOffset] = useState(0);
  const [hoveredStage, setHoveredStage] = useState(null);
  const PIPE_CARD_W = 120; // card width (110px) + gap (10px)
  const PIPE_MAX = PIPELINE.length - 6; // max offset so last 6+ cards always reachable
  const random = () => {
    const all = [...allPipelineQ, ...allDomainQ];
    setRandQ(all[Math.floor(Math.random()*all.length)]);
  };

  const navCards = [
    { view:"pipeline",  icon:"🗺️", label:"Pipeline Explorer",      desc:"16-stage biologic development lifecycle", color:"#C084FC" },
    { view:"methods",   icon:"🔬", label:"Analytical Methods",      desc:"20 detailed assay cards with specs",       color:"#22D3EE" },
    { view:"qbd",       icon:"⚗️", label:"QbD / CQA / CPP / COA",  desc:"Quality by Design — FMEA, design space",  color:"#F472B6" },
    { view:"ctd",       icon:"📂", label:"CTD Navigator",           desc:"Modules 1–5 complete CMC reference",       color:"#34D399" },
    { view:"timeline",  icon:"📅", label:"CMC Timeline",            desc:"Phase-by-phase CMC deliverables",          color:"#F59E0B" },
    { view:"domains",   icon:"📚", label:"Domain Q-Bank",           desc:"100 questions across 10 domains",          color:"#38BDF8" },
    { view:"exam",      icon:"🎯", label:"Exam Mode",               desc:"Test yourself — answers hidden",           color:"#F472B6" },
    { view:"ich",       icon:"📜", label:"ICH Guidelines",          desc:"9 core quality guidelines decoded",        color:"#A78BFA" },
    { view:"career",    icon:"🚀", label:"Career & Interviews",     desc:"Career ladder, salaries, 18 expert Q&As",  color:"#60A5FA" },
    { view:"notes",     icon:"📝", label:"My Notes",                desc:"Capture and organize your CMC notes",      color:"#FB923C" },
    { view:"glossary",  icon:"📖", label:"CMC Glossary",            desc:"50 essential terms defined",               color:"#34D399" },
    { view:"stability", icon:"🧊", label:"Stability Studies",       desc:"ICH Q1A(R2) conditions, zones & T90 calc", color:"#38BDF8" },
    { view:"oos",       icon:"🚨", label:"OOS/OOT Investigation",   desc:"FDA 2006 interactive decision tree",       color:"#F59E0B" },
    { view:"batch",     icon:"📋", label:"Batch Record Simulator",  desc:"Sterile mAb BPR with deviation practice",  color:"#34D399" },
    { view:"cases",     icon:"📰", label:"Case Studies",            desc:"6 landmark CMC failures & lessons",        color:"#F472B6" },
    { view:"compendial",icon:"📗", label:"Compendial Reference",    desc:"USP/EP/JP/ICH cross-reference guide",      color:"#A78BFA" },
    { view:"excipient", icon:"⚗️", label:"Excipient Compatibility", desc:"18 excipients, incompatibility matrix",    color:"#60A5FA" },
    { view:"pathway",   icon:"🎓", label:"Learning Pathways",       desc:"30/60/90-day plans per career level",      color:"#FB923C" },
    { view:"progress",  icon:"📊", label:"My Progress",             desc:"SM-2 queue, activity & badges",            color:"#C084FC" },
  ];

  return (
    <div style={{ maxWidth:1000, margin:"0 auto", padding:"36px 20px" }}>
      {/* Hero */}
      <div style={{ textAlign:"center", marginBottom:48 }}>
        <div className="float-emoji" style={{ fontSize:56, marginBottom:12 }}>🧬</div>
        <h1 className="gradient-text" style={{ fontSize:38, fontWeight:900, margin:0, letterSpacing:"-0.02em" }}>CMC Master App</h1>
        <p style={{ color:"var(--text-sec)", marginTop:10, fontSize:17, maxWidth:520, margin:"10px auto 0" }}>
          Your complete Chemistry, Manufacturing & Controls career development toolkit
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:14, marginBottom:36 }}>
        {stats.map(s => (
          <button key={s.label} onClick={() => setView(s.view)} className="stat-card card-hover"
            style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:"20px 14px",
              textAlign:"center", cursor:"pointer", borderTop:`3px solid ${s.color}`,
              transition:"all 0.22s cubic-bezier(0.34,1.56,0.64,1)" }}
            onMouseEnter={e => { e.currentTarget.style.background="var(--bg-raised)"; e.currentTarget.style.boxShadow=`0 8px 24px ${s.color}20`; }}
            onMouseLeave={e => { e.currentTarget.style.background="var(--bg-card)"; e.currentTarget.style.boxShadow="none"; }}>
            <div style={{ fontSize:26, marginBottom:6 }}>{s.icon}</div>
            <div style={{ fontSize:30, fontWeight:900, color:s.color, lineHeight:1 }}>{s.value}</div>
            <div style={{ color:"var(--text-sec)", fontSize:12, marginTop:6, lineHeight:1.4 }}>{s.label}</div>
            <div style={{ color:s.color, fontSize:9, marginTop:6, fontWeight:800, letterSpacing:"0.06em", opacity:0.7 }}>EXPLORE →</div>
          </button>
        ))}
      </div>

      {/* Pipeline Carousel */}
      <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:24, marginBottom:28 }}>
        {/* Header row */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <h3 style={{ color:"var(--text-h)", margin:0, fontSize:16, fontWeight:800 }}>🗺️ Biologic Development Pipeline — At a Glance</h3>
          <div style={{ display:"flex", gap:6, alignItems:"center" }}>
            <span style={{ color:"var(--text-faint)", fontSize:11, marginRight:4 }}>
              {pipeOffset+1}–{Math.min(pipeOffset+8, PIPELINE.length)} of {PIPELINE.length}
            </span>
            {[
              { dir:-3, label:"‹", disabled: pipeOffset===0 },
              { dir:3,  label:"›", disabled: pipeOffset>=PIPE_MAX },
            ].map(btn => (
              <button key={btn.label}
                onClick={() => !btn.disabled && setPipeOffset(o => Math.max(0, Math.min(PIPE_MAX, o+btn.dir)))}
                style={{
                  background: btn.disabled ? "var(--bg-surface)" : "var(--bg-raised)",
                  border:`1px solid ${btn.disabled ? "var(--border)" : "var(--border-bright)"}`,
                  borderRadius:8, width:34, height:34, cursor: btn.disabled ? "default" : "pointer",
                  color: btn.disabled ? "var(--text-faint)" : "var(--text-h)",
                  fontSize:20, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center",
                  transition:"all 0.18s",
                }}
                onMouseEnter={e => !btn.disabled && (e.currentTarget.style.background="var(--accent)", e.currentTarget.style.color="#fff")}
                onMouseLeave={e => !btn.disabled && (e.currentTarget.style.background="var(--bg-raised)", e.currentTarget.style.color="var(--text-h)")}>
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrolling window */}
        <div style={{ overflow:"hidden", position:"relative" }}>
          <div style={{
            display:"flex", gap:10,
            transition:"transform 0.48s cubic-bezier(0.22,1,0.36,1)",
            transform:`translateX(-${pipeOffset * PIPE_CARD_W}px)`,
            willChange:"transform",
          }}>
            {PIPELINE.map(s => {
              const isHov = hoveredStage === s.id;
              return (
                <div key={s.id}
                  onMouseEnter={() => setHoveredStage(s.id)}
                  onMouseLeave={() => setHoveredStage(null)}
                  style={{
                    flexShrink:0, width:110, borderRadius:12, padding:"12px 8px", textAlign:"center",
                    background: isHov ? `${s.accent}22` : `${s.accent}0D`,
                    border:`1.5px solid ${isHov ? s.accent : s.accent+"44"}`,
                    cursor:"default", userSelect:"none",
                    transition:"all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                    transform: isHov ? "translateY(-6px) scale(1.06)" : "none",
                    boxShadow: isHov ? `0 10px 28px ${s.accent}30` : "none",
                  }}>
                  <div style={{ fontSize:22, marginBottom:5 }}>{s.icon}</div>
                  <div style={{ color: isHov ? s.accent : s.accent+"CC", fontSize:9, fontWeight:900, lineHeight:1.3, letterSpacing:"0.02em" }}>
                    {s.stage}. {s.label}
                  </div>
                  <div style={{ color:"var(--text-faint)", fontSize:8, marginTop:3, lineHeight:1.3 }}>{s.sub}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot progress */}
        <div style={{ display:"flex", justifyContent:"center", gap:5, marginTop:12 }}>
          {Array.from({ length: Math.ceil(PIPELINE.length / 3) }).map((_, i) => {
            const active = Math.round(pipeOffset / 3) === i;
            return (
              <div key={i} onClick={() => setPipeOffset(Math.min(PIPE_MAX, i*3))}
                style={{
                  width: active ? 18 : 6, height:6, borderRadius:3,
                  background: active ? "var(--accent-glow)" : "var(--border)",
                  transition:"all 0.3s ease", cursor:"pointer",
                }}/>
            );
          })}
        </div>

        {/* Hover info panel */}
        <div style={{
          marginTop:14, borderTop:"1px solid var(--border)", paddingTop:14,
          minHeight:84, transition:"opacity 0.2s ease",
          opacity: hoveredStage ? 1 : 0, pointerEvents:"none",
        }}>
          {(() => {
            const s = hoveredStage ? PIPELINE.find(p => p.id===hoveredStage) : null;
            if (!s) return <div style={{ height:84 }}/>;
            return (
              <div style={{ display:"flex", gap:14, alignItems:"flex-start", animation:"fadeIn 0.15s ease" }}>
                <span style={{
                  fontSize:28, background:`${s.accent}22`, borderRadius:10, width:50, height:50,
                  display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                  border:`1.5px solid ${s.accent}44`,
                }}>{s.icon}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                    <span style={{ color:s.accent, fontWeight:900, fontSize:14 }}>Stage {s.stage}: {s.label}</span>
                    <span style={{ background:`${s.accent}22`, color:s.accent, borderRadius:8, padding:"2px 8px", fontSize:9, fontWeight:800 }}>
                      {s.questions?.length || 0} questions
                    </span>
                  </div>
                  <p style={{ color:"var(--text-sec)", fontSize:12, margin:"0 0 8px", lineHeight:1.5 }}>{s.sub}</p>
                  <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                    {s.topics?.slice(0,3).map(t => (
                      <div key={t.id} style={{ display:"flex", gap:5, alignItems:"flex-start" }}>
                        <span style={{ color:s.accent, fontSize:10, marginTop:1, flexShrink:0 }}>▸</span>
                        <span style={{ color:"var(--text-body)", fontSize:12, lineHeight:1.4 }}>{t.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Level breakdown */}
      <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:20, marginBottom:28 }}>
        <h3 style={{ color:"var(--text-h)", margin:"0 0 14px", fontSize:15, fontWeight:800 }}>📊 Domain Q-Bank by Difficulty</h3>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
          {["Foundational","Intermediate","Advanced","Expert"].map(l => (
            <div key={l} style={{ textAlign:"center", background:"var(--bg-surface)", borderRadius:10, padding:14,
              border:`1px solid ${LC[l]}44`, transition:"all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor=LC[l]}
              onMouseLeave={e => e.currentTarget.style.borderColor=LC[l]+"44"}
            >
              <div style={{ fontSize:26, fontWeight:900, color:LC[l] }}>{dcounts(l)}</div>
              <div style={{ color:"var(--text-sec)", fontSize:11, marginTop:4, fontWeight:600 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:14, marginBottom:28 }}>
        {navCards.map(n => (
          <button key={n.view} onClick={() => setView(n.view)} className="card-hover"
            style={{ background:"var(--bg-card)", border:`1px solid var(--border)`, borderRadius:14, padding:20,
              cursor:"pointer", textAlign:"left", borderTop:`3px solid ${n.color}` }}
            onMouseEnter={e => e.currentTarget.style.background="var(--bg-raised)"}
            onMouseLeave={e => e.currentTarget.style.background="var(--bg-card)"}
          >
            <div style={{ fontSize:26, marginBottom:10 }}>{n.icon}</div>
            <div style={{ color:"var(--text-h)", fontWeight:800, fontSize:14, marginBottom:5 }}>{n.label}</div>
            <div style={{ color:"var(--text-muted)", fontSize:12, lineHeight:1.5 }}>{n.desc}</div>
          </button>
        ))}
      </div>

      {/* Random question */}
      <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:22 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: randQ ? 16 : 0 }}>
          <h3 style={{ color:"var(--text-h)", margin:0, fontSize:15, fontWeight:800 }}>🎲 Random Question</h3>
          <button onClick={random}
            style={{ background:"var(--accent)", color:"white", border:"none", borderRadius:8, padding:"8px 18px",
              cursor:"pointer", fontWeight:700, fontSize:13, transition:"opacity 0.2s, transform 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.opacity="0.85"; e.currentTarget.style.transform="scale(1.03)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="scale(1)"; }}>
            Randomize
          </button>
        </div>
        {randQ && (
          <div style={{ background:"var(--bg-surface)", borderRadius:10, padding:16, borderLeft:`3px solid ${LC[randQ.level]}`, animation:"slideDown 0.22s ease" }}>
            <Badge level={randQ.level} />
            <p style={{ color:"var(--text-body)", margin:"12px 0 10px", fontWeight:600, fontSize:15, lineHeight:1.6 }}>{randQ.q}</p>
            <details>
              <summary style={{ color:"var(--accent-light)", cursor:"pointer", fontSize:13, fontWeight:600 }}>▶ Show rationale</summary>
              <div style={{ marginTop:10, paddingTop:10, borderTop:"1px solid var(--border)" }}>
                <InfoBox color="#22D3EE" label="WHY IT MATTERS" text={randQ.why} />
                <InfoBox color="#34D399" label="HOW TO APPROACH" text={randQ.how} />
                <p style={{ color:"var(--text-faint)", fontSize:11, margin:0, fontStyle:"italic" }}>📎 {randQ.ref}</p>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// PIPELINE EXPLORER
// ════════════════════════════════════════════════════════════════
function PipelineView() {
  const [active, setActive] = useState(null);
  const [tab, setTab] = useState("topics");
  const [levelFilter, setLevelFilter] = useState("All");
  const stage = active ? PIPELINE.find(s => s.id === active) : null;
  const filteredQ = stage?.questions.filter(q => levelFilter==="All" || q.level===levelFilter) || [];

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"28px 20px" }}>
      <SectionHeader icon="🗺️" title="Pipeline Explorer" subtitle="All 16 stages of the biologic drug development lifecycle — click any stage for in-depth coverage" />

      {/* Stage grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(115px,1fr))", gap:10, marginBottom:28 }}>
        {PIPELINE.map(s => (
          <button key={s.id} onClick={() => { setActive(s.id===active?null:s.id); setTab("topics"); setLevelFilter("All"); }}
            className="stage-btn"
            style={{
              background: s.id===active ? `${s.accent}28` : "var(--bg-card)",
              border:`1.5px solid ${s.id===active ? s.accent : "var(--border)"}`,
              borderRadius:12, padding:"12px 8px", cursor:"pointer", textAlign:"center",
              boxShadow: s.id===active ? `0 0 16px ${s.accent}33` : "none",
            }}>
            <div style={{ fontSize:22 }}>{s.icon}</div>
            <div style={{ color: s.id===active ? s.accent : "var(--text-h)", fontSize:10, fontWeight:800, marginTop:4, lineHeight:1.3 }}>
              {s.stage}. {s.label}
            </div>
            <div style={{ color:"var(--text-muted)", fontSize:9, marginTop:2 }}>{s.sub}</div>
          </button>
        ))}
      </div>

      {/* Stage detail panel */}
      {stage && (
        <div style={{ background:"var(--bg-card)", borderRadius:14, border:`1px solid ${stage.accent}44`,
          padding:28, animation:"scaleIn 0.25s ease",
          boxShadow:`0 0 32px ${stage.accent}15` }}>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:22 }}>
            <span style={{ fontSize:38, background:`${stage.accent}22`, borderRadius:12, width:60, height:60,
              display:"flex", alignItems:"center", justifyContent:"center" }}>{stage.icon}</span>
            <div>
              <h3 style={{ color:"var(--text-h)", margin:0, fontSize:22, fontWeight:900 }}>Stage {stage.stage}: {stage.label}</h3>
              <p style={{ color:"var(--text-sec)", margin:"4px 0 0", fontSize:14 }}>{stage.sub}</p>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", gap:8, flexWrap:"wrap" }}>
              <span style={{ background:`${stage.accent}22`, color:stage.accent, border:`1px solid ${stage.accent}44`,
                borderRadius:20, padding:"4px 12px", fontSize:11, fontWeight:700 }}>
                {stage.topics?.length || 0} topics
              </span>
              <span style={{ background:"var(--bg-surface)", color:"var(--text-sec)", border:"1px solid var(--border)",
                borderRadius:20, padding:"4px 12px", fontSize:11, fontWeight:700 }}>
                {stage.questions?.length || 0} questions
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display:"flex", gap:8, marginBottom:22 }}>
            {["topics","questions"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  background: tab===t ? stage.accent : "var(--bg-surface)",
                  color: tab===t ? "#000" : "var(--text-sec)",
                  border:"none", borderRadius:8, padding:"8px 20px",
                  cursor:"pointer", fontWeight:700, fontSize:13, textTransform:"capitalize",
                  transition:"all 0.18s"
                }}>
                {t} ({t==="topics" ? stage.topics?.length : stage.questions?.length})
              </button>
            ))}
          </div>

          {tab==="topics" && stage.topics?.map(tp => (
            <details key={tp.id} style={{ background:"var(--bg-surface)", borderRadius:10, padding:16, marginBottom:10,
              border:"1px solid var(--border)" }}>
              <summary style={{ color:"var(--text-body)", fontWeight:700, fontSize:15 }}>
                📘 {tp.title}
              </summary>
              <div style={{ marginTop:14, borderTop:"1px solid var(--border)", paddingTop:14 }}>
                <p style={{ color:"var(--text-body)", margin:"0 0 14px", lineHeight:1.75, fontSize:14 }}>{tp.body}</p>
                <InfoBox color="#22D3EE" label="WHY THIS MATTERS" text={tp.why} />
                <InfoBox color="#34D399" label="HOW TO STUDY" text={tp.how} />
                <p style={{ color:"var(--text-faint)", fontSize:11, margin:0, fontStyle:"italic" }}>📎 {tp.ref}</p>
              </div>
            </details>
          ))}

          {tab==="questions" && (
            <>
              <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
                {["All","Foundational","Intermediate","Advanced","Expert"].map(l => (
                  <FilterBtn key={l} label={l} active={levelFilter===l}
                    color={l==="All" ? null : LC[l]}
                    onClick={() => setLevelFilter(l)} />
                ))}
              </div>
              {filteredQ.map(q => (
                <details key={q.id} style={{ background:"var(--bg-surface)", borderRadius:10, padding:16, marginBottom:10,
                  border:`1px solid ${LC[q.level]}22`, borderLeft:`3px solid ${LC[q.level]}` }}>
                  <summary style={{ color:"var(--text-body)", display:"flex", gap:10, alignItems:"flex-start" }}>
                    <Badge level={q.level} />
                    <span style={{ fontWeight:600, fontSize:14, lineHeight:1.55 }}>{q.q}</span>
                  </summary>
                  <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid var(--border)" }}>
                    <InfoBox color="#22D3EE" label="WHY IT MATTERS" text={q.why} />
                    <InfoBox color="#34D399" label="HOW TO FIND THE ANSWER" text={q.how} />
                    <p style={{ color:"var(--text-faint)", fontSize:11, margin:0, fontStyle:"italic" }}>📎 {q.ref}</p>
                  </div>
                </details>
              ))}
              {filteredQ.length===0 && <p style={{ color:"var(--text-muted)", fontStyle:"italic" }}>No questions at this level.</p>}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// ANALYTICAL METHODS  — fully enhanced with diagrams + ratings
// ════════════════════════════════════════════════════════════════
function MethodsView({ navigate }) {
  const catColors = {
    Identity:"#22D3EE", Purity:"#34D399", Potency:"#F472B6",
    Glycosylation:"#A78BFA", "Physical/Chemical":"#FB923C", Safety:"#F59E0B", Structural:"#38BDF8"
  };
  const categories = ["All", ...new Set(ANALYTICAL_METHODS.map(m => m.category))];
  const [catFilter, setCatFilter] = useState("All");
  const [activeMethod, setActiveMethod] = useState(null);
  const [search, setSearch] = useState("");
  const [detailTab, setDetailTab] = useState("overview");

  const filtered = ANALYTICAL_METHODS.filter(m =>
    (catFilter==="All" || m.category===catFilter) &&
    (!search || m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.abbreviation.toLowerCase().includes(search.toLowerCase()) ||
      m.purpose.toLowerCase().includes(search.toLowerCase()))
  );
  const method = activeMethod ? ANALYTICAL_METHODS.find(m => m.id===activeMethod) : null;
  const phaseList = ["Pre-IND","IND","Ph1","Ph2","Ph3","BLA"];

  const handleSelect = (id) => {
    setActiveMethod(prev => prev===id ? null : id);
    setDetailTab("overview");
  };

  return (
    <div style={{ maxWidth:1300, margin:"0 auto", padding:"28px 20px" }}>
      <SectionHeader icon="🔬" title="Analytical Methods"
        subtitle="20 detailed assay cards — SVG diagrams, performance ratings, workflow steps, regulatory requirements & CQA linkage" />

      {/* Filters */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:20, alignItems:"center" }}>
        {categories.map(c => (
          <FilterBtn key={c} label={c} active={catFilter===c}
            color={c==="All" ? null : catColors[c]}
            onClick={() => { setCatFilter(c); setActiveMethod(null); }} />
        ))}
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search assays, abbreviations, or purpose…"
          style={{ flex:1, minWidth:200, background:"var(--bg-card)", border:"1px solid var(--border)",
            borderRadius:10, padding:"7px 14px", color:"var(--text-body)", fontSize:13 }} />
      </div>

      <div style={{ display:"grid", gridTemplateColumns: method ? "minmax(0,340px) 1fr" : "1fr", gap:20, alignItems:"start" }}>

        {/* ── Card Grid ─────────────────────────────────────────── */}
        <div style={{ display:"grid", gridTemplateColumns: method ? "1fr" : "repeat(auto-fill,minmax(270px,1fr))", gap:14 }}>
          {filtered.map((m, i) => {
            const r = RATINGS[m.id] || { sensitivity:70, throughput:60, cost:50, reg:3 };
            const isActive = m.id===activeMethod;
            return (
              <div key={m.id} className={`card-hover method-card`}
                onClick={() => handleSelect(m.id)}
                style={{
                  background: isActive ? `${m.color}14` : "var(--bg-card)",
                  border:`1.5px solid ${isActive ? m.color : "var(--border)"}`,
                  borderRadius:14, overflow:"hidden", cursor:"pointer",
                  boxShadow: isActive ? `0 0 20px ${m.color}25` : "none",
                  animationDelay:`${i*0.04}s`,
                }}>

                {/* ── Diagram strip ── */}
                <div style={{ background:`${m.color}0E`, padding:"10px 14px 6px",
                  borderBottom:`1px solid ${m.color}22` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:20 }}>{m.icon}</span>
                      <span style={{ background:`${m.color}28`, color:m.color, borderRadius:20, padding:"2px 9px",
                        fontSize:10, fontWeight:800, fontFamily:"monospace" }}>{m.abbreviation}</span>
                    </div>
                    <span style={{ background:`${m.color}18`, color:m.color, border:`1px solid ${m.color}33`,
                      borderRadius:20, padding:"2px 8px", fontSize:9, fontWeight:700 }}>{m.category}</span>
                  </div>
                  <MethodDiagram method={m}/>
                </div>

                {/* ── Card body ── */}
                <div style={{ padding:"12px 14px" }}>
                  <div style={{ color:"var(--text-h)", fontWeight:900, fontSize:14, marginBottom:3 }}>{m.name}</div>
                  <div style={{ color:"var(--text-muted)", fontSize:10, marginBottom:8, lineHeight:1.4 }}>{m.fullName}</div>

                  <p style={{ color:"var(--text-sec)", fontSize:12, margin:"0 0 10px", lineHeight:1.55,
                    display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                    {m.purpose}
                  </p>

                  {/* Rating bars */}
                  {!method && (
                    <div style={{ marginBottom:10 }}>
                      <RatingBar label="SENSITIVITY" value={r.sensitivity} color={m.color}/>
                      <RatingBar label="THROUGHPUT" value={r.throughput} color="#38BDF8"/>
                      <RatingBar label="COST (lower=cheaper)" value={100-r.cost} color="#34D399"/>
                    </div>
                  )}

                  {/* Regulatory stars + phases */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ display:"flex", gap:3, flexWrap:"wrap" }}>
                      {phaseList.map(p => <PhasePill key={p} phase={p} active={m.phases[p]} />)}
                    </div>
                    {!method && (
                      <div style={{ display:"flex", alignItems:"center", gap:3, flexShrink:0 }}>
                        <span style={{ color:"var(--text-faint)", fontSize:9 }}>REG</span>
                        <RegStars n={r.reg} color={m.color}/>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length===0 && <p style={{ color:"var(--text-muted)", fontStyle:"italic", gridColumn:"1/-1" }}>No methods match your search.</p>}
        </div>

        {/* ── Detail Panel ───────────────────────────────────────── */}
        {method && (
          <div className="panel-enter" style={{ background:"var(--bg-card)", borderRadius:16,
            border:`1.5px solid ${method.color}44`, overflow:"hidden",
            position:"sticky", top:70, maxHeight:"calc(100vh - 90px)", overflowY:"auto",
            boxShadow:`0 0 48px ${method.color}18` }}>

            {/* Header with diagram */}
            <div style={{ background:`linear-gradient(135deg, ${method.color}18 0%, var(--bg-surface) 100%)`,
              padding:"22px 24px 16px", borderBottom:`1px solid ${method.color}33` }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:14, marginBottom:14 }}>
                <span style={{ fontSize:36, background:`${method.color}22`, borderRadius:12, width:58, height:58,
                  display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{method.icon}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <h3 style={{ color:"var(--text-h)", margin:"0 0 3px", fontSize:19, fontWeight:900, lineHeight:1.2 }}>{method.name}</h3>
                  <div style={{ color:method.color, fontSize:11, fontFamily:"monospace", fontWeight:800 }}>{method.abbreviation}</div>
                  <div style={{ color:"var(--text-sec)", fontSize:11, marginTop:3, lineHeight:1.4 }}>{method.fullName}</div>
                </div>
                <button onClick={() => setActiveMethod(null)}
                  style={{ background:"none", border:"none", color:"var(--text-muted)", cursor:"pointer",
                    fontSize:18, padding:4, lineHeight:1, flexShrink:0 }}>✕</button>
              </div>

              {/* Mini diagram (larger in panel) */}
              <div style={{ background:"var(--bg-surface)", borderRadius:10, padding:"10px 14px",
                border:`1px solid ${method.color}22`, marginBottom:12 }}>
                <div style={{ height:80 }}>
                  <MethodDiagram method={method}/>
                </div>
              </div>

              {/* Badges row */}
              <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                <span style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:8,
                  padding:"3px 10px", fontSize:10, color:"var(--text-sec)", fontWeight:600 }}>📂 {method.ctdSection}</span>
                <span style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:8,
                  padding:"3px 10px", fontSize:10, color:"var(--text-sec)", fontWeight:600 }}>📜 {method.ichRef}</span>
                <span style={{ background:`${method.color}20`, border:`1px solid ${method.color}44`, borderRadius:8,
                  padding:"3px 10px", fontSize:10, color:method.color, fontWeight:700 }}>🎯 {method.cqaLink}</span>
              </div>
            </div>

            {/* Detail tabs */}
            <div style={{ display:"flex", borderBottom:"1px solid var(--border)" }}>
              {["overview","workflow","parameters","regulatory"].map(t => (
                <button key={t} onClick={() => setDetailTab(t)}
                  style={{ flex:1, background: detailTab===t ? `${method.color}18` : "none",
                    border:"none", borderBottom: detailTab===t ? `2px solid ${method.color}` : "2px solid transparent",
                    color: detailTab===t ? method.color : "var(--text-muted)",
                    padding:"10px 6px", cursor:"pointer", fontWeight:700, fontSize:11,
                    textTransform:"uppercase", letterSpacing:"0.04em", transition:"all 0.18s" }}>
                  {t}
                </button>
              ))}
            </div>

            <div style={{ padding:"18px 22px 24px" }}>

              {/* ── OVERVIEW TAB ── */}
              {detailTab==="overview" && (
                <>
                  {/* Phase applicability */}
                  <div style={{ marginBottom:18 }}>
                    <div style={{ color:"var(--text-muted)", fontSize:10, fontWeight:800, marginBottom:7, letterSpacing:"0.08em" }}>PHASE APPLICABILITY</div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {phaseList.map(p => <PhasePill key={p} phase={p} active={method.phases[p]} />)}
                    </div>
                  </div>

                  {/* Ratings */}
                  {RATINGS[method.id] && (
                    <div style={{ background:"var(--bg-surface)", borderRadius:10, padding:"12px 14px", marginBottom:14 }}>
                      <div style={{ color:"var(--text-muted)", fontSize:10, fontWeight:800, marginBottom:10, letterSpacing:"0.08em" }}>PERFORMANCE PROFILE</div>
                      <RatingBar label="SENSITIVITY" value={RATINGS[method.id].sensitivity} color={method.color}/>
                      <RatingBar label="THROUGHPUT" value={RATINGS[method.id].throughput} color="#38BDF8"/>
                      <RatingBar label="COST (lower = cheaper)" value={100-RATINGS[method.id].cost} color="#34D399"/>
                      <div style={{ display:"flex", justifyContent:"space-between", marginTop:10, alignItems:"center" }}>
                        <span style={{ color:"var(--text-muted)", fontSize:10, fontWeight:700 }}>REGULATORY IMPORTANCE</span>
                        <RegStars n={RATINGS[method.id].reg} color={method.color}/>
                      </div>
                    </div>
                  )}

                  <InfoBox color={method.color} label="PURPOSE & APPLICATION" text={method.purpose} />
                  <InfoBox color="#60A5FA" label="SCIENTIFIC PRINCIPLE" text={method.principle} />

                  {/* Detects as chips */}
                  <div style={{ background:`${method.color}0A`, border:`1px solid ${method.color}22`, borderRadius:10, padding:"12px 14px", marginBottom:8 }}>
                    <div style={{ color:"#34D399", fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.08em" }}>DETECTS / MEASURES</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                      {method.detects.map((d,i) => (
                        <span key={i} style={{ background:`${method.color}20`, color:"var(--text-body)",
                          border:`1px solid ${method.color}33`, borderRadius:20, padding:"3px 10px",
                          fontSize:11, lineHeight:1.4 }}>{d}</span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ── WORKFLOW TAB ── */}
              {detailTab==="workflow" && (
                <div>
                  <div style={{ color:"var(--text-muted)", fontSize:10, fontWeight:800, marginBottom:14, letterSpacing:"0.08em" }}>METHOD PROCEDURE — STEP BY STEP</div>
                  {(METHOD_STEPS[method.id] || ["Method steps not yet defined."]).map((step, i) => (
                    <div key={i} style={{ display:"flex", gap:12, marginBottom:12, alignItems:"flex-start" }}>
                      <div style={{ flexShrink:0, width:26, height:26, borderRadius:"50%",
                        background:`${method.color}22`, border:`1.5px solid ${method.color}55`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        color:method.color, fontSize:11, fontWeight:900 }}>{i+1}</div>
                      <div style={{ background:"var(--bg-surface)", borderRadius:8, padding:"8px 12px", flex:1,
                        border:"1px solid var(--border)", fontSize:13, color:"var(--text-body)", lineHeight:1.55 }}>
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── PARAMETERS TAB ── */}
              {detailTab==="parameters" && (
                <>
                  <div style={{ color:"var(--text-muted)", fontSize:10, fontWeight:800, marginBottom:12, letterSpacing:"0.08em" }}>KEY ASSAY PARAMETERS</div>
                  <div style={{ background:"var(--bg-surface)", borderRadius:10, overflow:"hidden", border:"1px solid var(--border)", marginBottom:14 }}>
                    <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                      <thead>
                        <tr style={{ background:`${method.color}14`, borderBottom:`1px solid ${method.color}33` }}>
                          <th style={{ color:method.color, padding:"8px 14px", textAlign:"left", fontSize:10, fontWeight:800, letterSpacing:"0.06em" }}>PARAMETER</th>
                          <th style={{ color:method.color, padding:"8px 14px", textAlign:"left", fontSize:10, fontWeight:800, letterSpacing:"0.06em" }}>TYPICAL VALUE / SPECIFICATION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {method.parameters.map((p,i) => (
                          <tr key={p.name} style={{ borderBottom:"1px solid var(--border)", background: i%2===0 ? "transparent" : `${method.color}06` }}>
                            <td style={{ color:"var(--text-sec)", padding:"8px 14px", fontWeight:700, whiteSpace:"nowrap" }}>{p.name}</td>
                            <td style={{ color:"var(--text-body)", padding:"8px 14px", fontFamily:"monospace", fontSize:11 }}>{p.typical}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div style={{ background:"var(--bg-surface)", borderRadius:10, padding:"12px 14px", border:"1px solid var(--border)" }}>
                    <div style={{ color:"#A78BFA", fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.08em" }}>KEY CONSIDERATIONS</div>
                    <ul style={{ margin:0, paddingLeft:18, color:"var(--text-body)", fontSize:13, lineHeight:1.75 }}>
                      {method.keyConsiderations.map((k,i) => <li key={i} style={{ marginBottom:4 }}>{k}</li>)}
                    </ul>
                  </div>
                </>
              )}

              {/* ── REGULATORY TAB ── */}
              {detailTab==="regulatory" && (
                <>
                  <div style={{ color:"var(--text-muted)", fontSize:10, fontWeight:800, marginBottom:12, letterSpacing:"0.08em" }}>REGULATORY CONTEXT</div>

                  <div style={{ background:"#7C3AED0F", border:"1px solid #7C3AED33", borderRadius:10, padding:"14px", marginBottom:14 }}>
                    <div style={{ color:"var(--accent-light)", fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.06em" }}>FDA / EMA EXPECTATION</div>
                    <p style={{ color:"var(--text-body)", margin:0, fontSize:13, lineHeight:1.7 }}>{method.regulatoryNote}</p>
                  </div>

                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                    <button onClick={() => navigate && navigate("ctd")}
                      style={{ background:"var(--bg-surface)", borderRadius:10, padding:"12px 14px", border:"1px solid var(--border)", cursor:navigate?"pointer":"default", textAlign:"left", transition:"all 0.15s" }}
                      onMouseEnter={e => navigate && (e.currentTarget.style.borderColor="var(--accent-glow)")}
                      onMouseLeave={e => (e.currentTarget.style.borderColor="var(--border)")}>
                      <div style={{ color:"var(--text-muted)", fontSize:10, fontWeight:800, marginBottom:6, letterSpacing:"0.06em" }}>📂 CTD SECTION</div>
                      <div style={{ color:"var(--text-h)", fontWeight:700, fontSize:13 }}>{method.ctdSection}</div>
                      {navigate && <div style={{ color:"var(--accent-light)", fontSize:9, marginTop:3 }}>Click to open CTD Navigator →</div>}
                    </button>
                    <button onClick={() => navigate && navigate("ich")}
                      style={{ background:"var(--bg-surface)", borderRadius:10, padding:"12px 14px", border:"1px solid var(--border)", cursor:navigate?"pointer":"default", textAlign:"left", transition:"all 0.15s" }}
                      onMouseEnter={e => navigate && (e.currentTarget.style.borderColor="var(--accent-glow)")}
                      onMouseLeave={e => (e.currentTarget.style.borderColor="var(--border)")}>
                      <div style={{ color:"var(--text-muted)", fontSize:10, fontWeight:800, marginBottom:6, letterSpacing:"0.06em" }}>📜 GUIDELINE REF</div>
                      <div style={{ color:"var(--text-h)", fontWeight:700, fontSize:13 }}>{method.ichRef}</div>
                      {navigate && <div style={{ color:"var(--accent-light)", fontSize:9, marginTop:3 }}>Click to open ICH Guidelines →</div>}
                    </button>
                  </div>

                  <div style={{ background:`${method.color}0A`, border:`1px solid ${method.color}33`, borderRadius:10, padding:"12px 14px" }}>
                    <div style={{ color:method.color, fontSize:10, fontWeight:800, marginBottom:6, letterSpacing:"0.06em" }}>CQA LINKAGE</div>
                    <div style={{ color:"var(--text-body)", fontSize:13, lineHeight:1.6 }}>{method.cqaLink}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// CTD NAVIGATOR
// ════════════════════════════════════════════════════════════════
function CTDView() {
  const [activeModule, setActiveModule] = useState("m3");
  const [activeSection, setActiveSection] = useState(null);
  const mod = CTD_MODULES.find(m => m.id===activeModule);
  const sec = activeSection ? mod?.sections.find(s => s.id===activeSection) : null;

  return (
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"28px 20px" }}>
      <SectionHeader icon="📂" title="CTD Navigator" subtitle="Common Technical Document — complete Module 1–5 reference with CMC deep-dive on Module 3" />

      {/* Module tabs */}
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:24 }}>
        {CTD_MODULES.map(m => (
          <button key={m.id} onClick={() => { setActiveModule(m.id); setActiveSection(null); }} className="cat-tab"
            style={{
              background: activeModule===m.id ? `${m.color}22` : "var(--bg-card)",
              color: activeModule===m.id ? m.color : "var(--text-sec)",
              border:`1.5px solid ${activeModule===m.id ? m.color : "var(--border)"}`,
              borderRadius:10, padding:"10px 16px", cursor:"pointer", fontWeight:700, fontSize:13,
            }}>
            {m.icon} Module {m.module}
          </button>
        ))}
      </div>

      {mod && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:20, alignItems:"start" }}>
          {/* Module info + section list */}
          <div>
            <div style={{ background:"var(--bg-card)", border:`1px solid ${mod.color}44`, borderRadius:14, padding:22, marginBottom:16,
              borderTop:`3px solid ${mod.color}` }}>
              <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:12 }}>
                <span style={{ fontSize:28 }}>{mod.icon}</span>
                <div>
                  <div style={{ color:"var(--text-h)", fontWeight:900, fontSize:16 }}>{mod.label}</div>
                  <div style={{ color:mod.color, fontSize:11, fontWeight:700, marginTop:2 }}>ICH CTD Structure</div>
                </div>
              </div>
              <p style={{ color:"var(--text-body)", fontSize:13, lineHeight:1.7, margin:0 }}>{mod.description}</p>
            </div>

            {/* Section list */}
            <div style={{ display:"grid", gap:8 }}>
              {mod.sections.map(s => (
                <button key={s.id} onClick={() => setActiveSection(s.id===activeSection ? null : s.id)}
                  style={{
                    background: s.id===activeSection ? `${mod.color}18` : "var(--bg-card)",
                    border:`1px solid ${s.id===activeSection ? mod.color : "var(--border)"}`,
                    borderRadius:10, padding:"12px 16px", cursor:"pointer", textAlign:"left",
                    transition:"all 0.18s",
                  }}>
                  <div style={{ color:s.id===activeSection ? mod.color : "var(--text-h)", fontWeight:700, fontSize:13, marginBottom:4 }}>
                    {s.label}
                  </div>
                  <div style={{ color:"var(--text-muted)", fontSize:12, lineHeight:1.4 }}>
                    {s.description.slice(0,75)}{s.description.length>75 ? "…" : ""}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Section detail */}
          {sec && (
            <div style={{ background:"var(--bg-card)", borderRadius:14, border:`1.5px solid ${mod.color}55`,
              padding:28, animation:"scaleIn 0.22s ease", position:"sticky", top:80 }}>
              <div style={{ color:mod.color, fontSize:12, fontFamily:"monospace", fontWeight:700, marginBottom:6 }}>{sec.id}</div>
              <h3 style={{ color:"var(--text-h)", margin:"0 0 14px", fontSize:20, fontWeight:900 }}>{sec.label}</h3>
              <p style={{ color:"var(--text-body)", fontSize:14, lineHeight:1.75, marginBottom:20 }}>{sec.description}</p>

              <div style={{ background:"var(--bg-surface)", borderRadius:10, padding:"12px 16px", marginBottom:14 }}>
                <strong style={{ color:"#34D399", fontSize:11, letterSpacing:"0.05em" }}>KEY CONTENT / REQUIRED ELEMENTS</strong>
                <ul style={{ margin:"8px 0 0", paddingLeft:18, color:"var(--text-body)", fontSize:13, lineHeight:1.8 }}>
                  {sec.keyContent.map((k,i) => <li key={i}>{k}</li>)}
                </ul>
              </div>

              {sec.tips && (
                <div style={{ background:"#7C3AED11", border:"1px solid #7C3AED33", borderRadius:10, padding:"12px 16px" }}>
                  <strong style={{ color:"var(--accent-light)", fontSize:11, letterSpacing:"0.05em" }}>💡 REVIEWER TIPS & BEST PRACTICES</strong>
                  <p style={{ color:"var(--text-body)", margin:"8px 0 0", fontSize:13, lineHeight:1.65 }}>{sec.tips}</p>
                </div>
              )}
            </div>
          )}
          {!sec && (
            <div style={{ background:"var(--bg-card)", borderRadius:14, border:"1px solid var(--border)",
              padding:32, display:"flex", alignItems:"center", justifyContent:"center", minHeight:200 }}>
              <p style={{ color:"var(--text-muted)", fontStyle:"italic", textAlign:"center" }}>← Select a section to see detailed content</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// CMC TIMELINE
// ════════════════════════════════════════════════════════════════
function TimelineView() {
  const [activePhase, setActivePhase] = useState(null);
  const phase = activePhase ? CMC_TIMELINE.find(p => p.phase===activePhase) : null;

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"28px 20px" }}>
      <SectionHeader icon="📅" title="CMC Development Timeline" subtitle="Phase-by-phase CMC deliverables, from Hit-to-Lead through Post-Approval lifecycle management" />

      {/* Phase selector pills */}
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:28 }}>
        {CMC_TIMELINE.map(p => (
          <button key={p.phase} onClick={() => setActivePhase(p.phase===activePhase ? null : p.phase)}
            style={{
              background: p.phase===activePhase ? `${p.color}22` : "var(--bg-card)",
              color: p.phase===activePhase ? p.color : "var(--text-sec)",
              border:`1.5px solid ${p.phase===activePhase ? p.color : "var(--border)"}`,
              borderRadius:20, padding:"7px 16px", cursor:"pointer", fontWeight:700, fontSize:12,
              transition:"all 0.18s"
            }}>
            {p.icon} {p.shortPhase}
          </button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns: phase ? "1fr 2fr" : "1fr", gap:24, alignItems:"start" }}>
        {/* Timeline track */}
        <div className="timeline-track" style={{ paddingLeft:48 }}>
          {CMC_TIMELINE.map((p, i) => (
            <div key={p.phase} onClick={() => setActivePhase(p.phase===activePhase ? null : p.phase)}
              style={{ position:"relative", marginBottom:20, cursor:"pointer" }}>
              {/* Dot */}
              <div style={{
                position:"absolute", left:-38, top:8,
                width:20, height:20, borderRadius:"50%",
                background: p.phase===activePhase ? p.color : "var(--bg-raised)",
                border:`2px solid ${p.color}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:10, transition:"all 0.2s",
                boxShadow: p.phase===activePhase ? `0 0 12px ${p.color}55` : "none"
              }}>{p.phase===activePhase ? "●" : i+1}</div>

              <div style={{
                background: p.phase===activePhase ? `${p.color}15` : "var(--bg-card)",
                border:`1px solid ${p.phase===activePhase ? p.color : "var(--border)"}`,
                borderRadius:12, padding:"12px 16px", transition:"all 0.2s",
              }}
                onMouseEnter={e => { if(p.phase!==activePhase) e.currentTarget.style.borderColor=p.color; }}
                onMouseLeave={e => { if(p.phase!==activePhase) e.currentTarget.style.borderColor="var(--border)"; }}
              >
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                  <span style={{ color: p.phase===activePhase ? p.color : "var(--text-h)", fontWeight:800, fontSize:14 }}>
                    {p.icon} {p.shortPhase}
                  </span>
                  <span style={{ background:`${p.color}22`, color:p.color, borderRadius:8, padding:"2px 8px", fontSize:10, fontWeight:700 }}>
                    {p.years}
                  </span>
                </div>
                <div style={{ color:"var(--text-muted)", fontSize:11 }}>{p.keyMilestone}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Phase detail */}
        {phase && (
          <div style={{ background:"var(--bg-card)", borderRadius:14, border:`1.5px solid ${phase.color}55`,
            padding:28, animation:"scaleIn 0.22s ease", position:"sticky", top:80 }}>
            <div style={{ marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <span style={{ fontSize:32 }}>{phase.icon}</span>
                <div>
                  <h3 style={{ color:"var(--text-h)", margin:0, fontSize:20, fontWeight:900 }}>{phase.phase}</h3>
                  <div style={{ color:phase.color, fontWeight:700, fontSize:13, marginTop:2 }}>{phase.years}</div>
                </div>
              </div>
              <div style={{ background:`${phase.color}15`, border:`1px solid ${phase.color}33`, borderRadius:10, padding:"10px 14px", marginBottom:10 }}>
                <div style={{ color:"var(--text-muted)", fontSize:11, fontWeight:700, marginBottom:4 }}>KEY MILESTONE</div>
                <div style={{ color:"var(--text-body)", fontSize:13 }}>{phase.keyMilestone}</div>
              </div>
              <div style={{ background:"#7C3AED11", border:"1px solid #7C3AED33", borderRadius:10, padding:"10px 14px" }}>
                <div style={{ color:"var(--text-muted)", fontSize:11, fontWeight:700, marginBottom:4 }}>REGULATORY EVENT</div>
                <div style={{ color:"var(--text-body)", fontSize:13 }}>{phase.regulatoryEvent}</div>
              </div>
            </div>

            <hr className="section-divider" />
            <h4 style={{ color:"var(--text-h)", margin:"0 0 14px", fontSize:14, fontWeight:800 }}>CMC Deliverables</h4>
            {phase.deliverables.map(d => (
              <div key={d.category} style={{ marginBottom:14 }}>
                <div style={{ color:phase.color, fontSize:12, fontWeight:800, marginBottom:6, letterSpacing:"0.04em" }}>
                  ▸ {d.category}
                </div>
                <ul style={{ margin:0, paddingLeft:18, color:"var(--text-body)", fontSize:13, lineHeight:1.75 }}>
                  {d.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
        {!phase && (
          <div style={{ background:"var(--bg-card)", borderRadius:14, border:"1px solid var(--border)",
            padding:32, display:"flex", alignItems:"center", justifyContent:"center", minHeight:200 }}>
            <p style={{ color:"var(--text-muted)", fontStyle:"italic", textAlign:"center" }}>← Select a phase to view CMC deliverables</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// DOMAIN Q-BANK
// ════════════════════════════════════════════════════════════════
function DomainsView() {
  const [activeDomain, setActiveDomain] = useState(null);
  const [levelFilter, setLevelFilter] = useState("All");
  const [search, setSearch] = useState("");
  const domain = activeDomain ? DOMAINS.find(d => d.id === activeDomain) : null;
  const filteredQ = domain?.questions.filter(q =>
    (levelFilter==="All" || q.level===levelFilter) &&
    (!search || q.q.toLowerCase().includes(search.toLowerCase()))
  ) || [];

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"28px 20px" }}>
      <SectionHeader icon="📚" title="Domain Question Bank" subtitle="100 questions across 10 CMC domains — filter by difficulty and search by keyword" />

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(165px,1fr))", gap:12, marginBottom:28 }}>
        {DOMAINS.map(d => (
          <button key={d.id} onClick={() => { setActiveDomain(d.id===activeDomain?null:d.id); setLevelFilter("All"); setSearch(""); }}
            className="card-hover method-card"
            style={{
              background: d.id===activeDomain ? `${d.accent}22` : "var(--bg-card)",
              border:`1.5px solid ${d.id===activeDomain ? d.accent : "var(--border)"}`,
              borderRadius:12, padding:14, cursor:"pointer", textAlign:"left",
              borderTop:`2px solid ${d.id===activeDomain ? d.accent : d.accent+"55"}`,
            }}>
            <div style={{ fontSize:24 }}>{d.icon}</div>
            <div style={{ color:"var(--text-h)", fontSize:12, fontWeight:800, marginTop:6, lineHeight:1.4 }}>{d.label}</div>
            <div style={{ color:d.accent, fontSize:11, marginTop:4, fontWeight:700 }}>{d.questions.length} questions</div>
            <div style={{ color:"var(--text-faint)", fontSize:10, marginTop:2 }}>{d.desc}</div>
          </button>
        ))}
      </div>

      {!domain && (
        <div style={{ background:"var(--bg-card)", borderRadius:14, border:"1px solid var(--border)" }}>
          <div className="empty-hint">
            <span className="eh-icon">📚</span>
            <p>Select a domain above to browse questions and filter by difficulty level.</p>
          </div>
        </div>
      )}
      {domain && (
        <div style={{ background:"var(--bg-card)", borderRadius:14, border:`1px solid ${domain.accent}44`, padding:26, animation:"scaleIn 0.22s ease" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
            <span style={{ fontSize:32, background:`${domain.accent}22`, borderRadius:12, padding:10 }}>{domain.icon}</span>
            <div>
              <h3 style={{ color:"var(--text-h)", margin:0, fontSize:20, fontWeight:900 }}>{domain.label}</h3>
              <p style={{ color:"var(--text-sec)", margin:"4px 0 0", fontSize:13 }}>{domain.desc}</p>
            </div>
          </div>

          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:18, alignItems:"center" }}>
            {["All","Foundational","Intermediate","Advanced","Expert"].map(l => (
              <FilterBtn key={l} label={l} active={levelFilter===l}
                color={l==="All" ? null : LC[l]} onClick={() => setLevelFilter(l)} />
            ))}
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search questions…"
              style={{ flex:1, minWidth:160, background:"var(--bg-surface)", border:"1px solid var(--border)",
                borderRadius:10, padding:"6px 12px", color:"var(--text-body)", fontSize:13 }} />
          </div>

          {filteredQ.map(q => (
            <details key={q.id} style={{ background:"var(--bg-surface)", borderRadius:10, padding:16, marginBottom:10,
              border:`1px solid ${LC[q.level]}22`, borderLeft:`3px solid ${LC[q.level]}` }}>
              <summary style={{ color:"var(--text-body)", display:"flex", gap:10, alignItems:"flex-start" }}>
                <Badge level={q.level} />
                <span style={{ fontWeight:600, fontSize:14, lineHeight:1.55 }}>{q.q}</span>
              </summary>
              <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid var(--border)" }}>
                <InfoBox color="#22D3EE" label="WHY IT MATTERS" text={q.why} />
                <InfoBox color="#34D399" label="HOW TO FIND THE ANSWER" text={q.how} />
                <p style={{ color:"var(--text-faint)", fontSize:11, margin:0, fontStyle:"italic" }}>📎 {q.ref}</p>
              </div>
            </details>
          ))}
          {filteredQ.length===0 && <p style={{ color:"var(--text-muted)", fontStyle:"italic" }}>No questions matching filters.</p>}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// EXAM MODE
// ════════════════════════════════════════════════════════════════
// SM-2 Algorithm implementation
function sm2Update(card, quality) {
  // quality: 0=Again, 1=Hard, 2=Hard+, 3=Good, 4=Easy, 5=Perfect
  let { n = 0, ef = 2.5, interval = 1 } = card;
  if (quality >= 3) {
    if (n === 0) interval = 1;
    else if (n === 1) interval = 6;
    else interval = Math.round(interval * ef);
    n++;
  } else {
    n = 0;
    interval = 1;
  }
  ef = Math.max(1.3, ef + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  const nextDue = new Date(Date.now() + interval * 86400000).toISOString().slice(0, 10);
  return { n, ef: parseFloat(ef.toFixed(2)), interval, nextDue };
}

function ExamView() {
  const [source, setSource] = useState("domains");
  const [levelFilter, setLevelFilter] = useState("All");
  const [domainFilter, setDomainFilter] = useState("All");
  const [questions, setQuestions] = useState([]);
  const [revealed, setRevealed] = useState({});
  const [started, setStarted] = useState(false);
  const [srMode, setSrMode] = useState(false);
  const [quizProgress, setQuizProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cmc-quiz-progress") || "{}"); } catch { return {}; }
  });
  const [srRated, setSrRated] = useState({});

  const saveProgress = (data) => {
    setQuizProgress(data);
    try { localStorage.setItem("cmc-quiz-progress", JSON.stringify(data)); } catch { /* ignore */ }
  };

  const rateSR = (qid, quality) => {
    const existing = quizProgress[qid] || {};
    const updated = sm2Update(existing, quality);
    const history = [...(existing.history || []), { quality, date: new Date().toISOString().slice(0, 10) }];
    saveProgress({ ...quizProgress, [qid]: { ...updated, history } });
    setSrRated(r => ({ ...r, [qid]: quality }));
  };

  const dueToday = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return Object.entries(quizProgress).filter(([, v]) => v?.nextDue && v.nextDue <= today).length;
  }, [quizProgress]);

  const allQ = useMemo(() => {
    const pool = source==="pipeline"
      ? PIPELINE.flatMap(s => s.questions)
      : source==="domains"
      ? DOMAINS.flatMap(d => d.questions)
      : [...PIPELINE.flatMap(s => s.questions), ...DOMAINS.flatMap(d => d.questions)];
    return pool
      .filter(q => levelFilter==="All" || q.level===levelFilter)
      .filter(q => {
        if (domainFilter==="All") return true;
        const dom = DOMAINS.find(d => d.id===domainFilter);
        return dom?.questions.some(dq => dq.id===q.id);
      });
  }, [source, levelFilter, domainFilter]);

  const start = () => {
    setQuestions([...allQ].sort(() => Math.random()-0.5).slice(0,20));
    setRevealed({});
    setStarted(true);
  };
  const reveal = id => setRevealed(r => ({...r, [id]:true}));
  const revealAll = () => { const a={}; questions.forEach(q => a[q.id]=true); setRevealed(a); };
  const score = Object.keys(revealed).length;

  if (!started) return (
    <div style={{ maxWidth:700, margin:"0 auto", padding:"32px 20px" }}>
      <SectionHeader icon="🎯" title="Exam Mode" subtitle="Answers are hidden — reveal them one at a time as you work through each question" />

      {dueToday > 0 && (
        <div style={{ background:"#F59E0B18", border:"1px solid #F59E0B44", borderRadius:10, padding:"10px 16px",
          marginBottom:16, display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ color:"#F59E0B", fontWeight:800 }}>🧠 {dueToday} SM-2 questions due today</span>
          <button onClick={() => setSrMode(true)}
            style={{ background:"#F59E0B", color:"#000", border:"none", borderRadius:6, padding:"4px 12px",
              cursor:"pointer", fontWeight:700, fontSize:12 }}>Enable Spaced Rep Mode</button>
        </div>
      )}

      <div style={{ background:"var(--bg-card)", borderRadius:14, border:"1px solid var(--border)", padding:28, marginBottom:24 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h3 style={{ color:"var(--text-h)", margin:0, fontSize:16, fontWeight:800 }}>Configure Your Exam</h3>
          <button onClick={() => setSrMode(m => !m)}
            style={{ background: srMode ? "#F59E0B" : "var(--bg-surface)", color: srMode ? "#000" : "var(--text-sec)",
              border:`1px solid ${srMode ? "#F59E0B" : "var(--border)"}`, borderRadius:8, padding:"6px 14px",
              cursor:"pointer", fontWeight:700, fontSize:12, transition:"all 0.18s" }}>
            🧠 Spaced Rep {srMode ? "ON" : "OFF"}
          </button>
        </div>

        <div style={{ marginBottom:18 }}>
          <label style={{ color:"var(--text-sec)", fontSize:12, fontWeight:700, display:"block", marginBottom:8, letterSpacing:"0.05em" }}>QUESTION SOURCE</label>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {["pipeline","domains","all"].map(s => (
              <button key={s} onClick={() => setSource(s)}
                style={{ background: source===s ? "var(--accent)" : "var(--bg-surface)",
                  color: source===s ? "#fff" : "var(--text-sec)",
                  border:`1px solid ${source===s ? "var(--accent)" : "var(--border)"}`,
                  borderRadius:8, padding:"8px 16px", cursor:"pointer", fontWeight:600, fontSize:13,
                  textTransform:"capitalize", transition:"all 0.18s" }}>
                {s==="all" ? "All Questions" : s==="pipeline" ? "Pipeline Only" : "Domain Q-Bank"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:18 }}>
          <label style={{ color:"var(--text-sec)", fontSize:12, fontWeight:700, display:"block", marginBottom:8, letterSpacing:"0.05em" }}>DIFFICULTY</label>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {["All","Foundational","Intermediate","Advanced","Expert"].map(l => (
              <FilterBtn key={l} label={l} active={levelFilter===l}
                color={l==="All" ? null : LC[l]} onClick={() => setLevelFilter(l)} />
            ))}
          </div>
        </div>

        <div style={{ marginBottom:24 }}>
          <label style={{ color:"var(--text-sec)", fontSize:12, fontWeight:700, display:"block", marginBottom:8, letterSpacing:"0.05em" }}>DOMAIN FILTER</label>
          <select value={domainFilter} onChange={e => setDomainFilter(e.target.value)}
            style={{ background:"var(--select-bg)", border:"1px solid var(--border)", borderRadius:8, padding:"9px 12px",
              color:"var(--text-body)", fontSize:13 }}>
            <option value="All">All Domains</option>
            {DOMAINS.map(d => <option key={d.id} value={d.id}>{d.icon} {d.label}</option>)}
          </select>
        </div>

        <div style={{ color:"var(--text-muted)", fontSize:13, marginBottom:20 }}>
          <strong style={{ color:"var(--text-body)" }}>{allQ.length}</strong> questions available — exam draws up to 20 randomly
        </div>

        <button onClick={start} disabled={allQ.length===0}
          style={{ background:"var(--accent)", color:"white", border:"none", borderRadius:10,
            padding:"12px 32px", cursor: allQ.length===0 ? "not-allowed" : "pointer",
            fontWeight:800, fontSize:16, opacity: allQ.length===0 ? 0.5 : 1,
            transition:"transform 0.15s, opacity 0.2s" }}
          onMouseEnter={e => { if(allQ.length>0) e.currentTarget.style.transform="scale(1.03)"; }}
          onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
          Start Exam →
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth:820, margin:"0 auto", padding:"28px 20px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22, flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ color:"var(--text-h)", margin:0, fontSize:24, fontWeight:900 }}>🎯 Exam Mode</h2>
          <p style={{ color:"var(--text-sec)", margin:"4px 0 0", fontSize:13 }}>{score} of {questions.length} revealed</p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={revealAll}
            style={{ background:"var(--bg-card)", color:"var(--text-body)", border:"1px solid var(--border)",
              borderRadius:8, padding:"8px 16px", cursor:"pointer", fontSize:13, fontWeight:600, transition:"all 0.18s" }}>
            Reveal All
          </button>
          <button onClick={() => setStarted(false)}
            style={{ background:"var(--accent)", color:"white", border:"none",
              borderRadius:8, padding:"8px 18px", cursor:"pointer", fontWeight:700, fontSize:13, transition:"opacity 0.2s" }}>
            New Exam
          </button>
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom:22 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <span style={{ color:"var(--text-muted)", fontSize:12, fontWeight:600 }}>
            Progress: <strong style={{ color:"var(--text-h)" }}>{score}</strong> / {questions.length} revealed
          </span>
          <span style={{ background:`${score===questions.length?"#34D39922":"var(--bg-surface)"}`, color:score===questions.length?"#34D399":"var(--accent-light)",
            borderRadius:8, padding:"3px 10px", fontSize:11, fontWeight:800 }}>
            {score===questions.length ? "✓ Complete" : `${Math.round(score/questions.length*100)}%`}
          </span>
        </div>
        <div style={{ background:"var(--bg-surface)", borderRadius:4, height:7, overflow:"hidden" }}>
          <div className="progress-bar" style={{ background:`linear-gradient(90deg, var(--accent), #22D3EE)`, borderRadius:4, height:7,
            width:`${score/questions.length*100}%` }} />
        </div>
      </div>

      {questions.map((q, i) => (
        <div key={q.id}
          style={{ background:"var(--bg-card)", borderRadius:12, padding:22, marginBottom:16,
            border:`1px solid ${LC[q.level]}22`, borderLeft:`3px solid ${LC[q.level]}`,
            animation:`fadeUp 0.3s ease ${Math.min(i*0.03,0.3)}s both` }}>
          <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:12 }}>
            <span style={{ color:"var(--text-faint)", fontSize:12, fontWeight:800, background:"var(--bg-surface)",
              borderRadius:6, padding:"2px 8px" }}>Q{i+1}</span>
            <Badge level={q.level} />
          </div>
          <p style={{ color:"var(--text-body)", margin:"0 0 16px", fontWeight:600, lineHeight:1.65, fontSize:15 }}>{q.q}</p>

          {!revealed[q.id] ? (
            <button onClick={() => reveal(q.id)}
              style={{ background:"var(--bg-surface)", color:"var(--accent-light)",
                border:`1px solid var(--accent)`, borderRadius:8, padding:"8px 20px",
                cursor:"pointer", fontWeight:700, fontSize:13, transition:"all 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.background="var(--accent)"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background="var(--bg-surface)"; e.currentTarget.style.color="var(--accent-light)"; }}>
              👁 Reveal Answer
            </button>
          ) : (
            <div style={{ borderTop:"1px solid var(--border)", paddingTop:16, animation:"slideDown 0.2s ease" }}>
              <InfoBox color="#22D3EE" label="WHY IT MATTERS" text={q.why} />
              <InfoBox color="#34D399" label="HOW TO FIND THE ANSWER" text={q.how} />
              <p style={{ color:"var(--text-faint)", fontSize:11, margin:0, fontStyle:"italic" }}>📎 {q.ref}</p>
              {srMode && (
                <div style={{ marginTop:14, padding:"12px", background:"var(--bg-surface)", borderRadius:8 }}>
                  <div style={{ color:"var(--text-faint)", fontSize:11, fontWeight:700, marginBottom:8 }}>
                    🧠 HOW WELL DID YOU KNOW THIS? {srRated[q.id] !== undefined && <span style={{ color:"#34D399" }}>✓ Rated</span>}
                  </div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {[{q:0,label:"Again",c:"#F87171"},{q:1,label:"Hard",c:"#F59E0B"},{q:3,label:"Good",c:"#34D399"},{q:5,label:"Easy",c:"#22D3EE"}].map(r => (
                      <button key={r.q} onClick={() => rateSR(q.id, r.q)}
                        style={{ background: srRated[q.id]===r.q ? r.c : "transparent",
                          color: srRated[q.id]===r.q ? "#fff" : r.c,
                          border:`1px solid ${r.c}`, borderRadius:6, padding:"5px 14px",
                          cursor:"pointer", fontWeight:700, fontSize:12, transition:"all 0.15s" }}>
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// ICH GUIDELINES
// ════════════════════════════════════════════════════════════════
function ICHView() {
  const [activeGl, setActiveGl] = useState(null);
  const gl = activeGl ? ICH_GUIDELINES.find(g => g.id===activeGl) : null;

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"28px 20px" }}>
      <SectionHeader icon="📜" title="ICH Quality Guidelines" subtitle="9 core guidelines every CMC professional must know — decoded with practical CMC context" />

      <div style={{ display:"grid", gridTemplateColumns: gl ? "1fr 2fr" : "repeat(auto-fill,minmax(260px,1fr))", gap:16, alignItems:"start" }}>
        <div style={{ display:"grid", gridTemplateColumns: gl ? "1fr" : "repeat(auto-fill,minmax(260px,1fr))", gap:12 }}>
          {ICH_GUIDELINES.map((g, i) => (
            <div key={g.id} onClick={() => setActiveGl(g.id===activeGl ? null : g.id)}
              className="card-hover method-card"
              style={{
                background: g.id===activeGl ? `${g.color}18` : "var(--bg-card)",
                border:`1.5px solid ${g.id===activeGl ? g.color : "var(--border)"}`,
                borderRadius:12, padding:18, cursor:"pointer",
                borderLeft:`4px solid ${g.color}`,
                animationDelay:`${i*0.05}s`,
              }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                <span style={{ background:`${g.color}22`, color:g.color, border:`1px solid ${g.color}33`,
                  borderRadius:8, padding:"3px 10px", fontSize:12, fontWeight:800, fontFamily:"monospace" }}>
                  {g.code}
                </span>
                <span style={{ background:"var(--bg-surface)", color:"var(--text-muted)", fontSize:10, fontWeight:700,
                  borderRadius:8, padding:"2px 8px" }}>{g.category}</span>
              </div>
              <div style={{ color:"var(--text-h)", fontWeight:700, fontSize:14, marginBottom:6 }}>{g.topic}</div>
              <p style={{ color:"var(--text-sec)", fontSize:12, margin:0, lineHeight:1.5 }}>
                {g.summary.slice(0,90)}{g.summary.length>90 ? "…" : ""}
              </p>
            </div>
          ))}
        </div>

        {!gl && (
          <div style={{ background:"var(--bg-card)", borderRadius:14, border:"1px solid var(--border)", position:"sticky", top:80 }}>
            <div className="empty-hint">
              <span className="eh-icon">📜</span>
              <p>Select a guideline on the left to see key requirements and CMC practical context.</p>
            </div>
          </div>
        )}
        {gl && (
          <div className="panel-enter" style={{ background:"var(--bg-card)", borderRadius:14, border:`1.5px solid ${gl.color}55`,
            padding:28, position:"sticky", top:80, maxHeight:"calc(100vh - 100px)", overflowY:"auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
              <div style={{ background:`${gl.color}22`, borderRadius:10, padding:"4px 14px", display:"inline-block" }}>
                <span style={{ color:gl.color, fontWeight:900, fontSize:18, fontFamily:"monospace" }}>{gl.code}</span>
              </div>
              <button onClick={() => setActiveGl(null)}
                style={{ background:"none", border:"none", color:"var(--text-muted)", cursor:"pointer", fontSize:18, padding:4, lineHeight:1 }}>✕</button>
            </div>
            <h3 style={{ color:"var(--text-h)", margin:"0 0 10px", fontSize:19, fontWeight:900 }}>{gl.topic}</h3>
            <p style={{ color:"var(--text-body)", fontSize:14, lineHeight:1.75, marginBottom:20 }}>{gl.summary}</p>

            <div style={{ background:"var(--bg-surface)", borderRadius:10, padding:"12px 16px", marginBottom:14 }}>
              <strong style={{ color:"#34D399", fontSize:11, letterSpacing:"0.05em" }}>KEY REQUIREMENTS</strong>
              <ul style={{ margin:"8px 0 0", paddingLeft:18, color:"var(--text-body)", fontSize:13, lineHeight:1.8 }}>
                {gl.key.map((k,i) => <li key={i}>{k}</li>)}
              </ul>
            </div>

            <div style={{ background:"#7C3AED11", border:"1px solid #7C3AED33", borderRadius:10, padding:"12px 16px" }}>
              <strong style={{ color:"var(--accent-light)", fontSize:11, letterSpacing:"0.05em" }}>CMC PRACTICAL CONTEXT</strong>
              <p style={{ color:"var(--text-body)", margin:"8px 0 0", fontSize:13, lineHeight:1.65 }}>{gl.cmc}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// GLOSSARY
// ════════════════════════════════════════════════════════════════
function GlossaryView() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  const cats = ["All", ...new Set(GLOSSARY.map(g => g.cat))];
  const catColors = {
    Regulatory:"#F59E0B", QbD:"#34D399", "Cell Science":"#22D3EE",
    Manufacturing:"#A78BFA", Analytical:"#F472B6", Quality:"#FB923C",
    Validation:"#38BDF8", "Novel Modalities":"#C084FC"
  };

  const filtered = GLOSSARY.filter(g =>
    (catFilter==="All" || g.cat===catFilter) &&
    (!search || g.term.toLowerCase().includes(search.toLowerCase()) ||
      g.def.toLowerCase().includes(search.toLowerCase()))
  ).sort((a,b) => a.term.localeCompare(b.term));

  return (
    <div style={{ maxWidth:940, margin:"0 auto", padding:"28px 20px" }}>
      <SectionHeader icon="📖" title="CMC Glossary" subtitle={`${GLOSSARY.length} essential terms and definitions — search or filter by category`} />

      <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap", alignItems:"center" }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search terms or definitions…"
          style={{ flex:1, minWidth:220, background:"var(--bg-card)", border:"1px solid var(--border)",
            borderRadius:10, padding:"10px 14px", color:"var(--text-body)", fontSize:14 }} />
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
          style={{ background:"var(--select-bg)", border:"1px solid var(--border)", borderRadius:10, padding:"10px 14px",
            color:"var(--text-body)", fontSize:13 }}>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Category pills */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:22 }}>
        {cats.map(c => (
          <FilterBtn key={c} label={c} active={catFilter===c}
            color={c==="All" ? null : catColors[c]}
            onClick={() => setCatFilter(c)} />
        ))}
      </div>

      <div style={{ display:"grid", gap:10 }}>
        {filtered.map((g, i) => {
          const cc = catColors[g.cat] || "#475569";
          return (
            <div key={g.term} className="card-hover"
              style={{ background:"var(--bg-card)", borderRadius:12, padding:"14px 18px",
                border:`1px solid ${cc}22`, borderLeft:`3px solid ${cc}`,
                animation:`fadeUp 0.3s ease ${Math.min(i*0.02,0.25)}s both` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <span style={{ color:"var(--text-h)", fontWeight:900, fontSize:16 }}>{g.term}</span>
                <span style={{ background:`${cc}22`, color:cc, border:`1px solid ${cc}44`,
                  padding:"2px 10px", borderRadius:12, fontSize:10, fontWeight:700 }}>{g.cat}</span>
              </div>
              <p style={{ color:"var(--text-body)", margin:0, fontSize:14, lineHeight:1.72 }}>{g.def}</p>
            </div>
          );
        })}
        {filtered.length===0 && <p style={{ color:"var(--text-muted)", fontStyle:"italic" }}>No terms matching search.</p>}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// CAREER & INTERVIEWS
// ════════════════════════════════════════════════════════════════
function CareerView({ navigate }) {
  const [activeLevel, setActiveLevel] = useState("sci1");
  const [levelTab, setLevelTab] = useState("overview");
  const [catFilter, setCatFilter] = useState("All");
  const [lvlFilter, setLvlFilter] = useState("All");
  const [openQ, setOpenQ] = useState(null);

  const cp = CAREER_PATHS.find(p => p.id === activeLevel) || CAREER_PATHS[1];
  const cats = ["All", ...new Set(INTERVIEW_QUESTIONS.map(q => q.category))];
  const lvls = ["All","Entry","Mid-Level","Senior","Director"];
  const filteredQ = INTERVIEW_QUESTIONS.filter(q =>
    (catFilter === "All" || q.category === catFilter) &&
    (lvlFilter === "All" || q.level === lvlFilter)
  );

  return (
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"28px 20px" }}>
      <SectionHeader icon="🚀" title="Career & Interviews"
        subtitle="CMC career ladder, salary benchmarks, skills matrix, and 18 expert interview Q&As with model answers" />

      {/* Career Ladder */}
      <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:20, marginBottom:24 }}>
        <h3 style={{ color:"var(--text-h)", margin:"0 0 16px", fontSize:15, fontWeight:800 }}>📈 CMC Career Progression Ladder</h3>
        <div style={{ display:"flex", alignItems:"center", gap:4, overflowX:"auto", paddingBottom:8 }}>
          {CAREER_PATHS.map((p, i) => (
            <div key={p.id} style={{ display:"flex", alignItems:"center", flexShrink:0, gap:4 }}>
              <button onClick={() => { setActiveLevel(p.id); setLevelTab("overview"); }}
                className="stage-btn"
                style={{
                  background: activeLevel===p.id ? `${p.color}22` : "var(--bg-surface)",
                  border:`1.5px solid ${activeLevel===p.id ? p.color : "var(--border)"}`,
                  borderRadius:12, padding:"12px 14px", cursor:"pointer", textAlign:"center", minWidth:120,
                  boxShadow: activeLevel===p.id ? `0 0 16px ${p.color}33` : "none",
                }}>
                <div style={{ fontSize:22 }}>{p.icon}</div>
                <div style={{ color: activeLevel===p.id ? p.color : "var(--text-h)", fontSize:10, fontWeight:800, marginTop:4, lineHeight:1.3 }}>
                  {p.title.split(" / ")[0]}
                </div>
                <div style={{ color:"var(--text-muted)", fontSize:9, marginTop:2 }}>{p.years}</div>
              </button>
              {i < CAREER_PATHS.length-1 && <div style={{ color:"var(--text-faint)", fontSize:18 }}>›</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Level Detail Panel */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:28 }}>
        <div style={{ background:"var(--bg-card)", border:`2px solid ${cp.color}44`, borderRadius:14, padding:22, borderTop:`3px solid ${cp.color}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
            <span style={{ fontSize:36, background:`${cp.color}22`, borderRadius:12, width:56, height:56, display:"flex", alignItems:"center", justifyContent:"center" }}>{cp.icon}</span>
            <div>
              <h3 style={{ color:"var(--text-h)", margin:0, fontSize:16, fontWeight:900 }}>{cp.title}</h3>
              <div style={{ color:cp.color, fontSize:11, fontWeight:700, marginTop:2 }}>{cp.level} · {cp.years}</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, marginBottom:16 }}>
            {["overview","skills","salary"].map(t => (
              <button key={t} onClick={() => setLevelTab(t)}
                style={{ background: levelTab===t ? cp.color : "var(--bg-surface)", color: levelTab===t ? "#000" : "var(--text-sec)",
                  border:"none", borderRadius:8, padding:"6px 14px", cursor:"pointer", fontWeight:700, fontSize:11, textTransform:"capitalize", transition:"all 0.18s" }}>
                {t}
              </button>
            ))}
          </div>

          {levelTab==="overview" && (
            <>
              <InfoBox color={cp.color} label="DEGREE REQUIREMENT" text={cp.degree}/>
              <div style={{ background:"var(--bg-surface)", borderRadius:10, padding:"12px 14px", marginBottom:8 }}>
                <div style={{ color:"#34D399", fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.06em" }}>KEY RESPONSIBILITIES</div>
                <ul style={{ margin:0, paddingLeft:18, color:"var(--text-body)", fontSize:12, lineHeight:1.75 }}>
                  {cp.responsibilities.slice(0,5).map((r,i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
              <InfoBox color="#A78BFA" label="INTERVIEW TIP" text={cp.interviewTip}/>
            </>
          )}

          {levelTab==="skills" && (
            <>
              <div style={{ marginBottom:12 }}>
                <div style={{ color:"#22D3EE", fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.06em" }}>TECHNICAL SKILLS</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {cp.technicalSkills.map((s,i) => (
                    <span key={i} style={{ background:`${cp.color}18`, color:"var(--text-body)", border:`1px solid ${cp.color}33`,
                      borderRadius:20, padding:"3px 10px", fontSize:11 }}>{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ color:"#F59E0B", fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.06em" }}>SOFT SKILLS</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {cp.softSkills.map((s,i) => (
                    <span key={i} style={{ background:"#F59E0B18", color:"var(--text-body)", border:"1px solid #F59E0B33",
                      borderRadius:20, padding:"3px 10px", fontSize:11 }}>{s}</span>
                  ))}
                </div>
              </div>
            </>
          )}

          {levelTab==="salary" && (
            <div>
              <div style={{ color:"var(--text-muted)", fontSize:10, fontWeight:800, marginBottom:10, letterSpacing:"0.06em" }}>SALARY BENCHMARKS (USD, 2024)</div>
              {[
                { label:"🇺🇸 National Average", val:cp.salary.us },
                { label:"🌉 Bay Area / Boston Premium", val:cp.salary.bay },
                { label:"🏠 Remote / Mid-Market", val:cp.salary.remote },
              ].map(s => (
                <div key={s.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                  background:"var(--bg-surface)", borderRadius:8, padding:"10px 14px", marginBottom:8, border:"1px solid var(--border)" }}>
                  <span style={{ color:"var(--text-sec)", fontSize:12 }}>{s.label}</span>
                  <span style={{ color:cp.color, fontWeight:900, fontSize:14 }}>{s.val}</span>
                </div>
              ))}
              <div style={{ background:`${cp.color}11`, border:`1px solid ${cp.color}33`, borderRadius:10, padding:"10px 14px", marginTop:10 }}>
                <div style={{ color:cp.color, fontSize:10, fontWeight:800, marginBottom:6, letterSpacing:"0.06em" }}>TYPICAL COMPANIES</div>
                <ul style={{ margin:0, paddingLeft:16, color:"var(--text-body)", fontSize:12, lineHeight:1.7 }}>
                  {cp.companies.map((c,i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Skills Matrix */}
        <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:22 }}>
          <h4 style={{ color:"var(--text-h)", margin:"0 0 14px", fontSize:14, fontWeight:800 }}>🎯 Skills Proficiency Matrix (0–5 scale)</h4>
          <div style={{ overflow:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11 }}>
              <thead>
                <tr style={{ borderBottom:"1px solid var(--border)" }}>
                  <th style={{ color:"var(--text-muted)", padding:"6px 8px", textAlign:"left", fontSize:9, fontWeight:800, letterSpacing:"0.05em" }}>SKILL</th>
                  {CAREER_PATHS.map(p => (
                    <th key={p.id} style={{ color: p.id===activeLevel ? p.color : "var(--text-muted)", padding:"6px 6px", textAlign:"center",
                      fontSize:9, fontWeight:800, letterSpacing:"0.04em", cursor:"pointer" }}
                      onClick={() => setActiveLevel(p.id)}>
                      {p.icon}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SKILLS_MATRIX.map((row, i) => (
                  <tr key={row.skill} style={{ borderBottom:"1px solid var(--border)", background: i%2===0?"transparent":"var(--bg-surface)" }}>
                    <td style={{ color:"var(--text-sec)", padding:"5px 8px", fontSize:10, lineHeight:1.3 }}>{row.skill}</td>
                    {CAREER_PATHS.map(p => {
                      const val = row[p.id] || 0;
                      return (
                        <td key={p.id} style={{ padding:"5px 6px", textAlign:"center" }}>
                          <div style={{ display:"flex", justifyContent:"center", gap:1 }}>
                            {[1,2,3,4,5].map(n => (
                              <div key={n} style={{ width:8, height:8, borderRadius:2,
                                background: n<=val ? (p.id===activeLevel ? p.color : "var(--text-faint)") : "var(--bg-surface)",
                                border:`1px solid ${n<=val ? (p.id===activeLevel ? p.color : "var(--border-bright)") : "var(--border)"}`,
                              }}/>
                            ))}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Interview Q&A Browser */}
      <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:24 }}>
        <h3 style={{ color:"var(--text-h)", margin:"0 0 16px", fontSize:15, fontWeight:800 }}>💬 Interview Q&A Bank ({INTERVIEW_QUESTIONS.length} expert questions with model answers)</h3>

        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:12 }}>
          <FilterBtn label="All Categories" active={catFilter==="All"} onClick={() => setCatFilter("All")}/>
          {cats.filter(c=>c!=="All").map(c => (
            <FilterBtn key={c} label={c} active={catFilter===c}
              color={INTERVIEW_QUESTIONS.find(q=>q.category===c)?.color || "var(--accent)"}
              onClick={() => setCatFilter(c)}/>
          ))}
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:18 }}>
          {lvls.map(l => (
            <FilterBtn key={l} label={l} active={lvlFilter===l}
              color={l==="All" ? null : LC[l] || "#A78BFA"}
              onClick={() => setLvlFilter(l)}/>
          ))}
        </div>

        <div style={{ display:"grid", gap:10 }}>
          {filteredQ.map(q => (
            <div key={q.id} style={{
              background:"var(--bg-surface)", borderRadius:12, border:`1px solid ${q.color}22`,
              borderLeft:`3px solid ${q.color}`, overflow:"hidden"
            }}>
              <button onClick={() => setOpenQ(openQ===q.id ? null : q.id)}
                style={{ width:"100%", background:"none", border:"none", padding:"14px 18px", cursor:"pointer", textAlign:"left",
                  display:"flex", gap:12, alignItems:"flex-start" }}>
                <span style={{ fontSize:18, flexShrink:0 }}>{q.icon}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", gap:8, marginBottom:6, flexWrap:"wrap" }}>
                    <span style={{ background:`${q.color}22`, color:q.color, borderRadius:12, padding:"1px 8px", fontSize:9, fontWeight:800 }}>{q.category}</span>
                    <span style={{ background:"var(--bg-card)", color:"var(--text-muted)", borderRadius:12, padding:"1px 8px", fontSize:9, fontWeight:700, border:"1px solid var(--border)" }}>{q.level}</span>
                  </div>
                  <p style={{ color:"var(--text-h)", margin:0, fontWeight:700, fontSize:14, lineHeight:1.5 }}>{q.question}</p>
                </div>
                <span style={{ color:"var(--text-faint)", fontSize:14, flexShrink:0, transition:"transform 0.2s",
                  transform: openQ===q.id ? "rotate(90deg)" : "none" }}>›</span>
              </button>

              {openQ===q.id && (
                <div style={{ padding:"0 18px 18px 18px", borderTop:"1px solid var(--border)", animation:"slideDown 0.22s ease" }}>
                  <div style={{ background:`${q.color}0A`, border:`1px solid ${q.color}22`, borderRadius:10, padding:"14px 16px", marginTop:14, marginBottom:12 }}>
                    <div style={{ color:q.color, fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.06em" }}>MODEL ANSWER</div>
                    <p style={{ color:"var(--text-body)", margin:0, fontSize:13, lineHeight:1.75 }}>{q.answer}</p>
                  </div>
                  {q.followUps?.length > 0 && (
                    <div style={{ marginBottom:12 }}>
                      <div style={{ color:"#F59E0B", fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.06em" }}>LIKELY FOLLOW-UP QUESTIONS</div>
                      {q.followUps.map((f,i) => (
                        <div key={i} style={{ background:"#F59E0B0A", border:"1px solid #F59E0B22", borderRadius:8, padding:"8px 12px", marginBottom:6 }}>
                          <span style={{ color:"#F59E0B", fontSize:11, fontWeight:800, marginRight:6 }}>Q{i+1}:</span>
                          <span style={{ color:"var(--text-body)", fontSize:12 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {q.linkedMethods?.length > 0 && (
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
                      <span style={{ color:"var(--text-muted)", fontSize:10, fontWeight:800 }}>LINKED METHODS:</span>
                      {q.linkedMethods.map(mId => {
                        const m = ANALYTICAL_METHODS.find(am => am.id===mId);
                        return m ? (
                          <button key={mId} onClick={() => navigate && navigate("methods")}
                            style={{ background:`${m.color}22`, color:m.color, border:`1px solid ${m.color}44`,
                              borderRadius:12, padding:"2px 10px", fontSize:10, fontWeight:700, cursor:"pointer" }}>
                            🔬 {m.abbreviation}
                          </button>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {filteredQ.length===0 && <p style={{ color:"var(--text-muted)", fontStyle:"italic" }}>No questions match current filters.</p>}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// NOTES
// ════════════════════════════════════════════════════════════════
function NotesView({ adminMode }) {
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cmc-notes") || "[]"); } catch { return []; }
  });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [pinned, setPinned] = useState(false);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  const NOTE_CATS = ["General","Analytical","Regulatory","Formulation","Process","QbD","Career","Study Tips"];
  const catColors = { General:"#A78BFA", Analytical:"#22D3EE", Regulatory:"#F472B6", Formulation:"#34D399",
    Process:"#F59E0B", QbD:"#C084FC", Career:"#60A5FA", "Study Tips":"#FB923C" };

  const save = (ns) => { setNotes(ns); localStorage.setItem("cmc-notes", JSON.stringify(ns)); };

  const addNote = () => {
    if (!text.trim()) return;
    const note = { id:Date.now(), title: title||"Untitled Note", text, category, pinned,
      created: new Date().toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" }) };
    if (editId) {
      save(notes.map(n => n.id===editId ? { ...n, ...note, id:editId } : n));
    } else {
      save([note, ...notes]);
    }
    setTitle(""); setText(""); setCategory("General"); setPinned(false); setShowForm(false); setEditId(null);
  };

  const deleteNote = (id) => save(notes.filter(n => n.id!==id));
  const togglePin = (id) => save(notes.map(n => n.id===id ? { ...n, pinned:!n.pinned } : n));
  const editNote = (note) => { setEditId(note.id); setTitle(note.title); setText(note.text); setCategory(note.category); setPinned(note.pinned||false); setShowForm(true); };

  const cats = ["All", ...NOTE_CATS];
  const filtered = notes
    .filter(n => (catFilter==="All" || n.category===catFilter) && (!search || n.title.toLowerCase().includes(search.toLowerCase()) || n.text.toLowerCase().includes(search.toLowerCase())))
    .sort((a,b) => (b.pinned?1:0)-(a.pinned?1:0));

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"28px 20px" }}>
      <SectionHeader icon="📝" title="My CMC Notes" subtitle="Capture study notes, key concepts, and personal annotations — all saved locally in your browser"/>

      {/* Top bar */}
      <div style={{ display:"flex", gap:12, marginBottom:16, flexWrap:"wrap", alignItems:"center" }}>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setTitle(""); setText(""); setCategory("General"); setPinned(false); }}
          style={{ background:"var(--accent)", color:"#fff", border:"none", borderRadius:10, padding:"9px 20px",
            cursor:"pointer", fontWeight:700, fontSize:13, transition:"opacity 0.18s" }}
          onMouseEnter={e => e.currentTarget.style.opacity="0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity="1"}>
          {showForm ? "✕ Cancel" : "+ Add Note"}
        </button>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notes…"
          style={{ flex:1, minWidth:200, background:"var(--bg-card)", border:"1px solid var(--border)",
            borderRadius:10, padding:"8px 14px", color:"var(--text-body)", fontSize:13 }}/>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
          style={{ background:"var(--select-bg)", border:"1px solid var(--border)", borderRadius:10,
            padding:"8px 12px", color:"var(--text-body)", fontSize:13 }}>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div style={{ background:"var(--bg-card)", border:"1px solid var(--accent)44", borderRadius:14, padding:22, marginBottom:20, animation:"slideDown 0.22s ease" }}>
          <h4 style={{ color:"var(--text-h)", margin:"0 0 14px", fontSize:14, fontWeight:800 }}>{editId ? "✏️ Edit Note" : "📝 New Note"}</h4>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Note title (optional)…"
            style={{ width:"100%", background:"var(--bg-surface)", border:"1px solid var(--border)", borderRadius:8,
              padding:"8px 12px", color:"var(--text-body)", fontSize:14, marginBottom:10, boxSizing:"border-box" }}/>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Your note content…"
            rows={5} style={{ width:"100%", background:"var(--bg-surface)", border:"1px solid var(--border)", borderRadius:8,
              padding:"10px 12px", color:"var(--text-body)", fontSize:13, lineHeight:1.65, resize:"vertical", marginBottom:10, boxSizing:"border-box" }}/>
          <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
            <select value={category} onChange={e => setCategory(e.target.value)}
              style={{ background:"var(--select-bg)", border:"1px solid var(--border)", borderRadius:8,
                padding:"7px 12px", color:"var(--text-body)", fontSize:12 }}>
              {NOTE_CATS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <label style={{ display:"flex", alignItems:"center", gap:6, cursor:"pointer", color:"var(--text-sec)", fontSize:12 }}>
              <input type="checkbox" checked={pinned} onChange={e => setPinned(e.target.checked)} style={{ cursor:"pointer" }}/> 📌 Pin to top
            </label>
            <button onClick={addNote}
              style={{ background:"var(--accent)", color:"#fff", border:"none", borderRadius:8, padding:"8px 20px",
                cursor:"pointer", fontWeight:700, fontSize:13, marginLeft:"auto" }}>
              {editId ? "Save Changes" : "Save Note"}
            </button>
          </div>
        </div>
      )}

      {/* Notes grid */}
      {filtered.length === 0 && (
        <div style={{ textAlign:"center", padding:"60px 20px", color:"var(--text-muted)" }}>
          <div style={{ fontSize:48, marginBottom:12 }}>📓</div>
          <p style={{ fontSize:15, marginBottom:6 }}>No notes yet.</p>
          <p style={{ fontSize:13 }}>Click "Add Note" above to capture your first CMC note.</p>
        </div>
      )}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:14 }}>
        {filtered.map(n => {
          const cc = catColors[n.category] || "#A78BFA";
          return (
            <div key={n.id} className="card-hover"
              style={{ background:"var(--bg-card)", borderRadius:14, border:`1px solid ${cc}22`,
                borderTop:`3px solid ${cc}`, padding:18, display:"flex", flexDirection:"column", gap:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
                <div style={{ flex:1, minWidth:0 }}>
                  {n.pinned && <span style={{ fontSize:11, marginRight:4 }}>📌</span>}
                  <span style={{ color:"var(--text-h)", fontWeight:800, fontSize:14 }}>{n.title}</span>
                </div>
                <span style={{ background:`${cc}22`, color:cc, borderRadius:12, padding:"2px 8px", fontSize:9, fontWeight:800, whiteSpace:"nowrap", flexShrink:0 }}>{n.category}</span>
              </div>
              <p style={{ color:"var(--text-body)", fontSize:13, lineHeight:1.65, margin:0,
                display:"-webkit-box", WebkitLineClamp:5, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{n.text}</p>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"auto", borderTop:"1px solid var(--border)", paddingTop:10 }}>
                <span style={{ color:"var(--text-faint)", fontSize:10 }}>{n.created}</span>
                <div style={{ display:"flex", gap:6 }}>
                  <button onClick={() => togglePin(n.id)} title={n.pinned?"Unpin":"Pin"}
                    style={{ background:"none", border:"none", cursor:"pointer", fontSize:13, opacity:n.pinned?1:0.4 }}>📌</button>
                  <button onClick={() => editNote(n)}
                    style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text-muted)", fontSize:12 }}>✏️</button>
                  <button onClick={() => deleteNote(n.id)}
                    style={{ background:"none", border:"none", cursor:"pointer", color:"#F472B6", fontSize:12 }}>🗑</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// QbD / CQA / CPP / COA
// ════════════════════════════════════════════════════════════════
function QbDView({ navigate }) {
  const [tab, setTab] = useState("qtpp");
  const [cqaFilter, setCqaFilter] = useState("All");
  const [cppFilter, setCppFilter] = useState("All");
  const [activeCQA, setActiveCQA] = useState(null);
  const [activeCPP, setActiveCPP] = useState(null);
  const [fmeaSort, setFmeaSort] = useState("rpn");
  const [coaTab, setCoaTab] = useState("ds");
  const [csTab, setCsTab] = useState(0);

  const TABS = [
    { id:"qtpp", label:"QTPP", icon:"🎯" },
    { id:"cqa", label:"CQAs", icon:"🔴" },
    { id:"fmea", label:"Risk (FMEA)", icon:"⚠️" },
    { id:"cpp", label:"CPPs", icon:"⚙️" },
    { id:"doe", label:"Design Space", icon:"📐" },
    { id:"strategy", label:"Control Strategy", icon:"🛡️" },
    { id:"coa", label:"COA", icon:"📋" },
  ];

  const cqaCats = ["All", ...new Set(CQA_LIST.map(c => c.category))];
  const cppSteps = ["All", ...new Set(CPP_LIST.map(c => c.processStep.split(" — ")[0]))];
  const filteredCQA = CQA_LIST.filter(c => cqaFilter==="All" || c.category===cqaFilter);
  const filteredCPP = CPP_LIST.filter(c => cppFilter==="All" || c.processStep.startsWith(cppFilter));
  const sortedFMEA = [...FMEA_TABLE].sort((a,b) => fmeaSort==="rpn" ? b.rpn-a.rpn : b.severity-a.severity);

  return (
    <div style={{ maxWidth:1300, margin:"0 auto", padding:"28px 20px" }}>
      <SectionHeader icon="🔬" title="QbD / CQA / CPP / COA"
        subtitle="Quality by Design framework — QTPP, Critical Quality Attributes, Critical Process Parameters, FMEA, Design Space, Control Strategy, and Certificate of Analysis" />

      {/* Tab Bar */}
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:24, background:"var(--bg-card)",
        border:"1px solid var(--border)", borderRadius:12, padding:8 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ flex:1, minWidth:80, background: tab===t.id ? "var(--accent)" : "none",
              color: tab===t.id ? "#fff" : "var(--text-sec)", border:"none",
              borderRadius:8, padding:"8px 10px", cursor:"pointer", fontWeight:700, fontSize:11,
              letterSpacing:"0.03em", transition:"all 0.18s", whiteSpace:"nowrap" }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ─── QTPP TAB ─── */}
      {tab==="qtpp" && (
        <div>
          <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:24, marginBottom:20 }}>
            <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:18 }}>
              <span style={{ fontSize:32 }}>🎯</span>
              <div>
                <h3 style={{ color:"var(--text-h)", margin:0, fontSize:18, fontWeight:900 }}>Quality Target Product Profile (QTPP)</h3>
                <p style={{ color:"var(--text-sec)", margin:"4px 0 0", fontSize:13 }}>Defines what the drug product must achieve from a patient/clinical perspective — the starting point for all QbD activities per ICH Q8(R2)</p>
              </div>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                <thead>
                  <tr style={{ background:"var(--bg-surface)", borderBottom:"1px solid var(--border)" }}>
                    {["QTPP Element","Clinical/Regulatory Target","Scientific Justification"].map(h => (
                      <th key={h} style={{ color:"var(--text-muted)", padding:"10px 14px", textAlign:"left", fontSize:10, fontWeight:800, letterSpacing:"0.06em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {QTPP.map((q, i) => (
                    <tr key={q.attribute} style={{ borderBottom:"1px solid var(--border)", background: i%2===0?"transparent":"var(--bg-surface)" }}>
                      <td style={{ color:"var(--accent-light)", padding:"12px 14px", fontWeight:800, fontSize:12, whiteSpace:"nowrap" }}>{q.attribute}</td>
                      <td style={{ color:"var(--text-h)", padding:"12px 14px", fontWeight:600, fontSize:12 }}>{q.target}</td>
                      <td style={{ color:"var(--text-body)", padding:"12px 14px", fontSize:12, lineHeight:1.6 }}>{q.justification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <InfoBox color="#A78BFA" label="ICH Q8(R2) FRAMEWORK"
            text="QTPP → CQA Identification → Risk Assessment → Design of Experiments (DoE) → Design Space → Control Strategy. Working within the design space does not require regulatory notification. The QTPP is documented in CTD Section 3.2.P.2 (DP development) and 3.2.S.2 (DS development)."/>
          <InfoBox color="#22D3EE" label="LINK TO CTD & SUBMISSIONS"
            text="QTPP elements directly map to BLA/IND CTD Module 3.2 content: potency → 3.2.S.4.4 (bioassay method); purity → 3.2.S.4.1 (specification); container closure → 3.2.P.3; shelf life → 3.2.P.8 (stability). QTPP is not a submission section itself but drives all CMC content."/>
        </div>
      )}

      {/* ─── CQA TAB ─── */}
      {tab==="cqa" && (
        <div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:18 }}>
            {cqaCats.map(c => (
              <FilterBtn key={c} label={c} active={cqaFilter===c}
                color={c==="All" ? null : CQA_LIST.find(q=>q.category===c)?.color}
                onClick={() => { setCqaFilter(c); setActiveCQA(null); }}/>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns: activeCQA ? "minmax(0,380px) 1fr" : "repeat(auto-fill,minmax(300px,1fr))", gap:16, alignItems:"start" }}>
            <div style={{ display:"grid", gap:12, gridTemplateColumns: activeCQA ? "1fr" : "repeat(auto-fill,minmax(300px,1fr))" }}>
              {filteredCQA.map(cqa => (
                <button key={cqa.id} onClick={() => setActiveCQA(activeCQA===cqa.id ? null : cqa.id)}
                  style={{
                    background: activeCQA===cqa.id ? `${cqa.color}18` : "var(--bg-card)",
                    border:`1.5px solid ${activeCQA===cqa.id ? cqa.color : "var(--border)"}`,
                    borderRadius:12, padding:"14px 16px", cursor:"pointer", textAlign:"left",
                    transition:"all 0.18s", boxShadow: activeCQA===cqa.id ? `0 0 16px ${cqa.color}25` : "none",
                  }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                    <div>
                      <span style={{ color:"var(--text-h)", fontWeight:900, fontSize:13 }}>{cqa.name}</span>
                      <span style={{ display:"block", color:"var(--text-muted)", fontSize:10, marginTop:2 }}>{cqa.abbreviation} · {cqa.category}</span>
                    </div>
                    <span style={{ background:`${cqa.color}22`, color:cqa.color, borderRadius:12, padding:"2px 8px", fontSize:9, fontWeight:800, whiteSpace:"nowrap", flexShrink:0 }}>
                      {cqa.risk}
                    </span>
                  </div>
                  <p style={{ color:"var(--text-sec)", fontSize:11, margin:"0 0 8px", lineHeight:1.5,
                    display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{cqa.rationale}</p>
                  <div style={{ color:"var(--text-muted)", fontSize:10, fontFamily:"monospace" }}>{cqa.spec}</div>
                  {cqa.testMethods?.length > 0 && (
                    <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginTop:8 }}>
                      {cqa.testMethods.map(mId => {
                        const m = ANALYTICAL_METHODS.find(am => am.id===mId);
                        return m ? (
                          <button key={mId} onClick={e => { e.stopPropagation(); navigate && navigate("methods"); }}
                            style={{ background:`${m.color}22`, color:m.color, border:`1px solid ${m.color}33`,
                              borderRadius:10, padding:"2px 8px", fontSize:9, fontWeight:800, cursor:"pointer" }}>
                            🔬 {m.abbreviation}
                          </button>
                        ) : null;
                      })}
                    </div>
                  )}
                </button>
              ))}
            </div>
            {activeCQA && (() => {
              const cqa = CQA_LIST.find(c => c.id===activeCQA);
              if (!cqa) return null;
              return (
                <div className="panel-enter" style={{ background:"var(--bg-card)", borderRadius:14, border:`1.5px solid ${cqa.color}44`,
                  padding:24, position:"sticky", top:80, maxHeight:"calc(100vh - 100px)", overflowY:"auto" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                    <h3 style={{ color:"var(--text-h)", margin:0, fontSize:17, fontWeight:900 }}>{cqa.name}</h3>
                    <button onClick={() => setActiveCQA(null)} style={{ background:"none", border:"none", color:"var(--text-muted)", cursor:"pointer", fontSize:18 }}>✕</button>
                  </div>
                  <span style={{ background:`${cqa.color}22`, color:cqa.color, borderRadius:12, padding:"3px 10px", fontSize:10, fontWeight:800 }}>{cqa.risk}</span>
                  <InfoBox color={cqa.color} label="SCIENTIFIC RATIONALE" text={cqa.rationale}/>
                  <InfoBox color="#34D399" label="SPECIFICATION" text={cqa.spec}/>
                  <InfoBox color="#F59E0B" label="PATIENT RISK (if OOS)" text={cqa.patientRisk}/>
                  <InfoBox color="#22D3EE" label="CONTROL TIER" text={cqa.controlTier}/>
                  <InfoBox color="#A78BFA" label="MITIGATION STRATEGY" text={cqa.mitigation}/>
                  <div style={{ marginTop:12 }}>
                    <div style={{ color:"var(--text-muted)", fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.06em" }}>CTD SECTION & ICH REF</div>
                    <div style={{ display:"flex", gap:8 }}>
                      <button onClick={() => navigate && navigate("ctd")}
                        style={{ background:"var(--bg-surface)", border:"1px solid var(--border)", borderRadius:8, padding:"6px 12px", cursor:"pointer", fontSize:11, color:"var(--text-sec)" }}>
                        📂 {cqa.ctdSection}
                      </button>
                      {cqa.linkedICH?.map(ich => (
                        <button key={ich} onClick={() => navigate && navigate("ich")}
                          style={{ background:"var(--bg-surface)", border:"1px solid var(--border)", borderRadius:8, padding:"6px 12px", cursor:"pointer", fontSize:11, color:"var(--accent-light)" }}>
                          📜 ICH {ich.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ─── FMEA TAB ─── */}
      {tab==="fmea" && (
        <div>
          <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:16, flexWrap:"wrap" }}>
            <InfoBox color="#F59E0B" label="FMEA METHODOLOGY"
              text="Failure Mode and Effects Analysis (FMEA) per ICH Q9 Risk Management. RPN = Severity × Occurrence × Detectability (each scored 1–10; Detectability: 10=hardest to detect). RPN ≥72 = High priority for control strategy enhancement." />
          </div>
          <div style={{ display:"flex", gap:8, marginBottom:16 }}>
            <span style={{ color:"var(--text-muted)", fontSize:12, alignSelf:"center" }}>Sort by:</span>
            <FilterBtn label="RPN (High→Low)" active={fmeaSort==="rpn"} onClick={() => setFmeaSort("rpn")}/>
            <FilterBtn label="Severity" active={fmeaSort==="sev"} onClick={() => setFmeaSort("sev")}/>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr style={{ background:"var(--bg-card)", borderBottom:"2px solid var(--border)" }}>
                  {["CQA","Failure Mode","Severity","Occurrence","Detectability","RPN","Residual RPN","Top Controls"].map(h => (
                    <th key={h} style={{ color:"var(--text-muted)", padding:"10px 12px", textAlign:"left", fontSize:9, fontWeight:800, letterSpacing:"0.06em", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedFMEA.map((row, i) => {
                  const rpnColor = row.rpn >= 80 ? "#F472B6" : row.rpn >= 50 ? "#F59E0B" : "#34D399";
                  const cqa = CQA_LIST.find(c => c.id===row.cqaId);
                  return (
                    <tr key={row.cqaId} style={{ borderBottom:"1px solid var(--border)", background: i%2===0?"transparent":"var(--bg-surface)" }}>
                      <td style={{ padding:"10px 12px" }}>
                        <div style={{ color: cqa?.color || "var(--text-h)", fontWeight:800, fontSize:11 }}>{row.cqaName}</div>
                      </td>
                      <td style={{ padding:"10px 12px", color:"var(--text-body)", fontSize:11, maxWidth:200 }}>{row.failureMode}</td>
                      {[row.severity, row.occurrence, row.detectability].map((v, vi) => (
                        <td key={vi} style={{ padding:"10px 12px", textAlign:"center" }}>
                          <span style={{
                            background: v>=8 ? "#F472B622" : v>=5 ? "#F59E0B22" : "#34D39922",
                            color: v>=8 ? "#F472B6" : v>=5 ? "#F59E0B" : "#34D399",
                            borderRadius:8, padding:"3px 8px", fontWeight:900, fontSize:12
                          }}>{v}</span>
                        </td>
                      ))}
                      <td style={{ padding:"10px 12px", textAlign:"center" }}>
                        <span style={{ background:`${rpnColor}22`, color:rpnColor, borderRadius:8, padding:"4px 10px", fontWeight:900, fontSize:13 }}>{row.rpn}</span>
                      </td>
                      <td style={{ padding:"10px 12px", textAlign:"center" }}>
                        <span style={{ background:"#34D39922", color:"#34D399", borderRadius:8, padding:"3px 8px", fontWeight:700, fontSize:11 }}>{row.residualRpn}</span>
                      </td>
                      <td style={{ padding:"10px 12px" }}>
                        <ul style={{ margin:0, paddingLeft:14, color:"var(--text-sec)", fontSize:10, lineHeight:1.6 }}>
                          {row.mitigations.slice(0,3).map((m,mi) => <li key={mi}>{m}</li>)}
                        </ul>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── CPP TAB ─── */}
      {tab==="cpp" && (
        <div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:18 }}>
            {cppSteps.map(s => (
              <FilterBtn key={s} label={s} active={cppFilter===s}
                color={s==="All" ? null : CPP_LIST.find(c=>c.processStep.startsWith(s))?.stepColor}
                onClick={() => { setCppFilter(s); setActiveCPP(null); }}/>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns: activeCPP ? "minmax(0,360px) 1fr" : "repeat(auto-fill,minmax(300px,1fr))", gap:16, alignItems:"start" }}>
            <div style={{ display:"grid", gap:10, gridTemplateColumns: activeCPP ? "1fr" : "repeat(auto-fill,minmax(300px,1fr))" }}>
              {filteredCPP.map(cpp => (
                <button key={cpp.id} onClick={() => setActiveCPP(activeCPP===cpp.id ? null : cpp.id)}
                  style={{
                    background: activeCPP===cpp.id ? `${cpp.stepColor}18` : "var(--bg-card)",
                    border:`1.5px solid ${activeCPP===cpp.id ? cpp.stepColor : "var(--border)"}`,
                    borderRadius:12, padding:"14px 16px", cursor:"pointer", textAlign:"left",
                    transition:"all 0.18s",
                  }}>
                  <div style={{ color:cpp.stepColor, fontSize:9, fontWeight:800, marginBottom:4, letterSpacing:"0.06em" }}>{cpp.processStep}</div>
                  <div style={{ color:"var(--text-h)", fontWeight:900, fontSize:13, marginBottom:4 }}>{cpp.name}</div>
                  <div style={{ display:"flex", gap:10, marginBottom:6 }}>
                    <span style={{ color:"#34D399", fontSize:10, fontWeight:700 }}>NOR: {cpp.normalRange}</span>
                  </div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {cpp.linkedCQAs?.map(cqaId => {
                      const cqa = CQA_LIST.find(c => c.id===cqaId);
                      return cqa ? (
                        <span key={cqaId} style={{ background:`${cqa.color}22`, color:cqa.color, borderRadius:10, padding:"2px 7px", fontSize:9, fontWeight:800 }}>
                          ↔ {cqa.abbreviation}
                        </span>
                      ) : null;
                    })}
                  </div>
                </button>
              ))}
            </div>
            {activeCPP && (() => {
              const cpp = CPP_LIST.find(c => c.id===activeCPP);
              if (!cpp) return null;
              return (
                <div className="panel-enter" style={{ background:"var(--bg-card)", borderRadius:14, border:`1.5px solid ${cpp.stepColor}44`,
                  padding:24, position:"sticky", top:80, maxHeight:"calc(100vh - 100px)", overflowY:"auto" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
                    <h3 style={{ color:"var(--text-h)", margin:0, fontSize:16, fontWeight:900 }}>{cpp.name}</h3>
                    <button onClick={() => setActiveCPP(null)} style={{ background:"none", border:"none", color:"var(--text-muted)", cursor:"pointer", fontSize:18 }}>✕</button>
                  </div>
                  <div style={{ color:cpp.stepColor, fontSize:11, fontWeight:700, marginBottom:14 }}>⚙️ {cpp.processStep}</div>
                  <InfoBox color={cpp.stepColor} label="NORMAL OPERATING RANGE (NOR)" text={cpp.normalRange}/>
                  {cpp.criticalLow && <InfoBox color="#F59E0B" label="CRITICAL LOW LIMIT" text={cpp.criticalLow}/>}
                  {cpp.criticalHigh && <InfoBox color="#F472B6" label="CRITICAL HIGH LIMIT" text={cpp.criticalHigh}/>}
                  <InfoBox color="#A78BFA" label="MECHANISM OF EFFECT ON CQAs" text={cpp.mechanismOfEffect}/>
                  <InfoBox color="#22D3EE" label="MONITORING STRATEGY" text={cpp.monitoringStrategy}/>
                  <InfoBox color="#34D399" label="CONTROL METHOD" text={cpp.controlMethod}/>
                  <div style={{ marginTop:10 }}>
                    <div style={{ color:"var(--text-muted)", fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.06em" }}>LINKED CQAs</div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {cpp.linkedCQAs?.map(cqaId => {
                        const cqa = CQA_LIST.find(c => c.id===cqaId);
                        return cqa ? (
                          <button key={cqaId} onClick={() => { setTab("cqa"); setActiveCQA(cqaId); setActiveCPP(null); }}
                            style={{ background:`${cqa.color}22`, color:cqa.color, border:`1px solid ${cqa.color}44`,
                              borderRadius:12, padding:"4px 12px", fontSize:11, fontWeight:700, cursor:"pointer" }}>
                            🔴 {cqa.name.split(" ")[0]}
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ─── DESIGN SPACE / DOE TAB ─── */}
      {tab==="doe" && (
        <div>
          <InfoBox color="#A78BFA" label="ICH Q8 DESIGN SPACE"
            text="Design space is the multidimensional combination and interaction of input variables (material attributes and process parameters) that have been demonstrated to provide assurance of quality. Working within the approved design space is not considered a change. PAR = Proven Acceptable Range (univariate); Design Space = multivariate (proven by DoE)."/>
          <div style={{ display:"grid", gap:20, marginTop:16 }}>
            {DESIGN_SPACE.map(ds => (
              <div key={ds.id} style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:22 }}>
                <h3 style={{ color:"var(--text-h)", margin:"0 0 10px", fontSize:16, fontWeight:900 }}>{ds.title}</h3>
                <p style={{ color:"var(--text-sec)", fontSize:13, margin:"0 0 16px", lineHeight:1.6 }}>{ds.description}</p>
                <div style={{ overflowX:"auto", marginBottom:14 }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                    <thead>
                      <tr style={{ background:"var(--bg-surface)", borderBottom:"1px solid var(--border)" }}>
                        {["Parameter","Proven Acceptable Range (PAR)","Normal Operating Range (NOR)","Setpoint","Linked CQAs"].map(h => (
                          <th key={h} style={{ color:"var(--text-muted)", padding:"8px 12px", textAlign:"left", fontSize:9, fontWeight:800, letterSpacing:"0.05em", whiteSpace:"nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ds.parameters.map((p, i) => (
                        <tr key={p.name} style={{ borderBottom:"1px solid var(--border)", background: i%2===0?"transparent":"var(--bg-surface)" }}>
                          <td style={{ color:"var(--accent-light)", padding:"8px 12px", fontWeight:700, fontSize:11 }}>{p.name}</td>
                          <td style={{ color:"#F59E0B", padding:"8px 12px", fontFamily:"monospace", fontSize:11 }}>{p.par}</td>
                          <td style={{ color:"#34D399", padding:"8px 12px", fontFamily:"monospace", fontSize:11 }}>{p.nor}</td>
                          <td style={{ color:"#22D3EE", padding:"8px 12px", fontFamily:"monospace", fontSize:11 }}>{p.setpoint}</td>
                          <td style={{ padding:"8px 12px" }}>
                            <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                              {(p.linkedCQAs||[]).map(c => (
                                <span key={c} style={{ background:"#A78BFA22", color:"#A78BFA", borderRadius:8, padding:"1px 7px", fontSize:9, fontWeight:700 }}>{c}</span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <InfoBox color="#22D3EE" label="REGULATORY STATUS" text={ds.regulatoryStatus}/>
              </div>
            ))}

            <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:22 }}>
              <h3 style={{ color:"var(--text-h)", margin:"0 0 16px", fontSize:16, fontWeight:900 }}>🧪 DoE Study Examples</h3>
              {DOE_STUDIES.map(doe => (
                <details key={doe.id} style={{ background:"var(--bg-surface)", borderRadius:10, padding:16, marginBottom:12, border:"1px solid var(--border)" }}>
                  <summary style={{ color:"var(--text-h)", fontWeight:700, fontSize:14, cursor:"pointer" }}>
                    📐 {doe.title}
                  </summary>
                  <div style={{ marginTop:14, borderTop:"1px solid var(--border)", paddingTop:14 }}>
                    <InfoBox color="#A78BFA" label="OBJECTIVE" text={doe.objective}/>
                    <InfoBox color="#22D3EE" label="DESIGN" text={`${doe.design} (${doe.runs} runs) · Software: ${doe.software}`}/>
                    <div style={{ marginBottom:10 }}>
                      <div style={{ color:"#F59E0B", fontSize:10, fontWeight:800, marginBottom:8, letterSpacing:"0.06em" }}>FACTORS (3)</div>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:8 }}>
                        {doe.factors.map(f => (
                          <div key={f.name} style={{ background:"var(--bg-card)", borderRadius:8, padding:"8px 12px", border:"1px solid var(--border)", fontSize:11 }}>
                            <div style={{ color:"var(--text-h)", fontWeight:700 }}>{f.name}</div>
                            <div style={{ color:"var(--text-muted)", marginTop:3 }}>Low: {f.low} | Center: {f.center} | High: {f.high}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <InfoBox color="#34D399" label="KEY FINDINGS" text={doe.keyFindings}/>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── CONTROL STRATEGY TAB ─── */}
      {tab==="strategy" && (
        <div>
          <InfoBox color="#34D399" label="MULTI-TIERED CONTROL STRATEGY (ICH Q10 + Q8)" text={CONTROL_STRATEGY.overview}/>
          <div style={{ marginTop:16, display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
            {CONTROL_STRATEGY.tiers.map((t, i) => (
              <button key={i} onClick={() => setCsTab(i)}
                style={{ background: csTab===i ? t.color : "var(--bg-card)", color: csTab===i ? "#000" : "var(--text-sec)",
                  border:`1.5px solid ${csTab===i ? t.color : "var(--border)"}`, borderRadius:10, padding:"8px 16px",
                  cursor:"pointer", fontWeight:700, fontSize:12, transition:"all 0.18s" }}>
                Tier {t.tier}: {t.name}
              </button>
            ))}
          </div>
          {(() => {
            const t = CONTROL_STRATEGY.tiers[csTab];
            if (!t) return null;
            return (
              <div style={{ background:"var(--bg-card)", border:`1.5px solid ${t.color}44`, borderRadius:14, padding:22 }}>
                <h3 style={{ color:"var(--text-h)", margin:"0 0 8px", fontSize:16, fontWeight:900 }}>Tier {t.tier}: {t.name}</h3>
                <p style={{ color:"var(--text-sec)", fontSize:13, margin:"0 0 16px", lineHeight:1.6 }}>{t.description}</p>
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                    <thead>
                      <tr style={{ background:`${t.color}18`, borderBottom:`1px solid ${t.color}33` }}>
                        {["Control Measure","Target / Specification","Frequency","Linked CQA / CPP"].map(h => (
                          <th key={h} style={{ color:t.color, padding:"8px 12px", textAlign:"left", fontSize:9, fontWeight:800, letterSpacing:"0.06em" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {t.elements.map((el, i) => {
                        const linkedCQA = el.linkedCQA && CQA_LIST.find(c => c.id===el.linkedCQA);
                        return (
                          <tr key={i} style={{ borderBottom:"1px solid var(--border)", background: i%2===0?"transparent":"var(--bg-surface)" }}>
                            <td style={{ color:"var(--text-h)", padding:"8px 12px", fontWeight:700, fontSize:11 }}>{el.control}</td>
                            <td style={{ color:"#34D399", padding:"8px 12px", fontFamily:"monospace", fontSize:10 }}>{el.target}</td>
                            <td style={{ color:"var(--text-muted)", padding:"8px 12px", fontSize:10 }}>{el.frequency}</td>
                            <td style={{ padding:"8px 12px" }}>
                              {linkedCQA && (
                                <button onClick={() => { setTab("cqa"); setActiveCQA(linkedCQA.id); }}
                                  style={{ background:`${linkedCQA.color}22`, color:linkedCQA.color, border:`1px solid ${linkedCQA.color}33`,
                                    borderRadius:10, padding:"2px 8px", fontSize:9, fontWeight:800, cursor:"pointer" }}>
                                  🔴 {linkedCQA.abbreviation}
                                </button>
                              )}
                              {!linkedCQA && <span style={{ color:"var(--text-muted)", fontSize:10 }}>{el.linkedCPP || el.linkedCQA || "—"}</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ─── COA TAB ─── */}
      {tab==="coa" && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
            <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:20 }}>
              <h3 style={{ color:"var(--text-h)", margin:"0 0 12px", fontSize:14, fontWeight:900 }}>📋 Required COA Elements</h3>
              <ol style={{ paddingLeft:18, margin:0, color:"var(--text-body)", fontSize:12, lineHeight:1.9 }}>
                {COA_ELEMENTS.required.map((r, i) => <li key={i}>{r}</li>)}
              </ol>
            </div>
            <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:20 }}>
              <h3 style={{ color:"var(--text-h)", margin:"0 0 12px", fontSize:14, fontWeight:900 }}>⚖️ Regulatory Basis</h3>
              <ul style={{ paddingLeft:16, margin:0, color:"var(--text-body)", fontSize:12, lineHeight:1.9 }}>
                {COA_ELEMENTS.regulatoryBasis.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          </div>

          <div style={{ display:"flex", gap:8, marginBottom:16 }}>
            <button onClick={() => setCoaTab("ds")}
              style={{ background: coaTab==="ds" ? "#A78BFA" : "var(--bg-card)", color: coaTab==="ds" ? "#fff" : "var(--text-sec)",
                border:"none", borderRadius:10, padding:"9px 20px", cursor:"pointer", fontWeight:700, fontSize:13, transition:"all 0.18s" }}>
              📦 Drug Substance COA
            </button>
            <button onClick={() => setCoaTab("dp")}
              style={{ background: coaTab==="dp" ? "#34D399" : "var(--bg-card)", color: coaTab==="dp" ? "#000" : "var(--text-sec)",
                border:"none", borderRadius:10, padding:"9px 20px", cursor:"pointer", fontWeight:700, fontSize:13, transition:"all 0.18s" }}>
              💉 Drug Product COA
            </button>
          </div>

          {(() => {
            const ex = coaTab==="ds" ? COA_ELEMENTS.dsExample : COA_ELEMENTS.dpExample;
            const accentColor = coaTab==="ds" ? "#A78BFA" : "#34D399";
            return (
              <div style={{ background:"var(--bg-card)", border:`1.5px solid ${accentColor}44`, borderRadius:14, overflow:"hidden" }}>
                <div style={{ background:`${accentColor}18`, padding:"16px 22px", borderBottom:`1px solid ${accentColor}33` }}>
                  <h3 style={{ color:"var(--text-h)", margin:0, fontSize:14, fontWeight:900 }}>{ex.title}</h3>
                </div>
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                    <thead>
                      <tr style={{ background:"var(--bg-surface)", borderBottom:"1px solid var(--border)" }}>
                        {["Test","Analytical Method","Acceptance Criteria","Lot Result"].map(h => (
                          <th key={h} style={{ color:"var(--text-muted)", padding:"8px 14px", textAlign:"left", fontSize:9, fontWeight:800, letterSpacing:"0.06em" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ex.tests.map((t, i) => {
                        const passed = t.result.includes("PASS");
                        return (
                          <tr key={i} style={{ borderBottom:"1px solid var(--border)", background: i%2===0?"transparent":"var(--bg-surface)" }}>
                            <td style={{ color:"var(--text-h)", padding:"10px 14px", fontWeight:700, fontSize:11 }}>{t.test}</td>
                            <td style={{ color:"var(--text-sec)", padding:"10px 14px", fontSize:10, maxWidth:180 }}>{t.method}</td>
                            <td style={{ color:"#22D3EE", padding:"10px 14px", fontFamily:"monospace", fontSize:10 }}>{t.spec}</td>
                            <td style={{ padding:"10px 14px" }}>
                              <span style={{ background: passed ? "#34D39922" : "#F472B622",
                                color: passed ? "#34D399" : "#F472B6",
                                borderRadius:8, padding:"3px 8px", fontSize:10, fontWeight:700 }}>
                                {t.result}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div style={{ background:"#34D39918", borderTop:"1px solid #34D39944", padding:"12px 22px" }}>
                  <strong style={{ color:"#34D399", fontSize:11 }}>LOT DISPOSITION: </strong>
                  <span style={{ color:"var(--text-h)", fontSize:12, fontWeight:700 }}>{ex.disposition}</span>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// ADMIN LOGIN MODAL
// ════════════════════════════════════════════════════════════════
function AdminModal({ onLogin, onClose }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const attempt = () => {
    if (user === "ykacha" && pass === "Yash@123") {
      onLogin();
    } else {
      setErr("Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}
      onClick={e => e.target===e.currentTarget && onClose()}>
      <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:16, padding:32, width:340, maxWidth:"90vw",
        boxShadow:"var(--shadow-lg)", animation:"scaleIn 0.22s ease" }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:40, marginBottom:8 }}>🔐</div>
          <h3 style={{ color:"var(--text-h)", margin:0, fontSize:18, fontWeight:900 }}>CMC Admin Login</h3>
          <p style={{ color:"var(--text-muted)", margin:"6px 0 0", fontSize:12 }}>Enter credentials to enable admin mode</p>
        </div>
        <div style={{ marginBottom:12 }}>
          <label style={{ color:"var(--text-sec)", fontSize:12, fontWeight:700, display:"block", marginBottom:5 }}>Username</label>
          <input value={user} onChange={e => setUser(e.target.value)} placeholder="Username"
            autoFocus
            style={{ width:"100%", background:"var(--input-bg)", border:"1px solid var(--border)", borderRadius:8,
              padding:"9px 12px", color:"var(--text-body)", fontSize:13, boxSizing:"border-box" }}
            onKeyDown={e => e.key==="Enter" && attempt()}/>
        </div>
        <div style={{ marginBottom:16 }}>
          <label style={{ color:"var(--text-sec)", fontSize:12, fontWeight:700, display:"block", marginBottom:5 }}>Password</label>
          <input value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="Password"
            style={{ width:"100%", background:"var(--input-bg)", border:"1px solid var(--border)", borderRadius:8,
              padding:"9px 12px", color:"var(--text-body)", fontSize:13, boxSizing:"border-box" }}
            onKeyDown={e => e.key==="Enter" && attempt()}/>
        </div>
        {err && <div style={{ color:"#F472B6", fontSize:12, marginBottom:12, textAlign:"center" }}>{err}</div>}
        <button onClick={attempt}
          style={{ width:"100%", background:"var(--accent)", color:"#fff", border:"none", borderRadius:10,
            padding:"11px", cursor:"pointer", fontWeight:800, fontSize:14, marginBottom:10, transition:"opacity 0.18s" }}
          onMouseEnter={e => e.currentTarget.style.opacity="0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity="1"}>
          Login
        </button>
        <button onClick={onClose}
          style={{ width:"100%", background:"none", border:"1px solid var(--border)", color:"var(--text-muted)",
            borderRadius:10, padding:"9px", cursor:"pointer", fontSize:13 }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// ROOT APP
// ════════════════════════════════════════════════════════════════
export default function App() {
  const [view, setView] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("cmc-theme") !== "light");
  const [, setMobileMenuOpen] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const toggleTheme = () => setDarkMode(d => {
    const next = !d;
    localStorage.setItem("cmc-theme", next ? "dark" : "light");
    return next;
  });

  const NAV = [
    { id:"dashboard", icon:"🏠", label:"Home" },
    { id:"pipeline",  icon:"🗺️", label:"Pipeline" },
    { id:"methods",   icon:"🔬", label:"Methods" },
    { id:"qbd",       icon:"⚗️", label:"QbD/CQA" },
    { id:"ctd",       icon:"📂", label:"CTD" },
    { id:"timeline",  icon:"📅", label:"Timeline" },
    { id:"domains",   icon:"📚", label:"Domains" },
    { id:"exam",      icon:"🎯", label:"Exam" },
    { id:"ich",       icon:"📜", label:"ICH" },
    { id:"career",    icon:"🚀", label:"Career" },
    { id:"notes",     icon:"📝", label:"Notes" },
    { id:"glossary",  icon:"📖", label:"Glossary" },
    { id:"stability", icon:"🧊", label:"Stability" },
    { id:"oos",       icon:"🚨", label:"OOS/OOT" },
    { id:"batch",     icon:"📋", label:"Batch Sim" },
    { id:"cases",     icon:"📰", label:"Case Studies" },
    { id:"compendial",icon:"📗", label:"Compendial" },
    { id:"excipient", icon:"⚗️", label:"Excipients" },
    { id:"pathway",   icon:"🎓", label:"Learning Path" },
    { id:"progress",  icon:"📊", label:"My Progress" },
  ];

  const navigate = (id) => {
    setView(id);
    setMobileMenuOpen(false);
    try {
      const visited = JSON.parse(localStorage.getItem("cmc-visited-views") || "[]");
      if (!visited.includes(id)) {
        visited.push(id);
        localStorage.setItem("cmc-visited-views", JSON.stringify(visited));
      }
    } catch (e) { /* ignore */ }
  };

  return (
    <div data-theme={darkMode ? "dark" : "light"}
      style={{ minHeight:"100vh", background:"var(--bg-base)", fontFamily:"system-ui,sans-serif", color:"var(--text-body)" }}>

      {/* ── Navigation ── */}
      <nav className="main-nav"
        style={{ background:"var(--nav-bg)", borderBottom:"1px solid var(--border)",
          padding:"0 16px", display:"flex", alignItems:"center", gap:2,
          position:"sticky", top:0, zIndex:200, height:52,
          boxShadow:"0 1px 12px rgba(0,0,0,0.15)" }}>

        <button onClick={() => navigate("dashboard")} className="logo-btn"
          style={{ display:"flex", alignItems:"center", gap:7, background:"none", border:"none",
            cursor:"pointer", padding:"4px 8px 4px 0", marginRight:4, flexShrink:0 }}>
          <DNALogo/>
          <span style={{ color:"#A78BFA", fontWeight:900, fontSize:15, whiteSpace:"nowrap", letterSpacing:"-0.01em" }}>
            CMC Master
          </span>
        </button>

        {/* Nav items — scrollable */}
        <div style={{ display:"flex", gap:2, overflowX:"auto", flex:1, scrollbarWidth:"none" }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => navigate(n.id)} className="nav-btn"
              style={{
                background: view===n.id ? "var(--nav-active)" : "var(--nav-inactive)",
                color: view===n.id ? "var(--text-h)" : "var(--text-sec)",
                border:"none",
                borderBottom: view===n.id ? `2px solid var(--accent-glow)` : "2px solid transparent",
                padding:"8px 12px", cursor:"pointer",
                fontWeight: view===n.id ? 700 : 500, fontSize:13, whiteSpace:"nowrap",
                borderRadius:"6px 6px 0 0",
              }}>
              {n.icon} <span className="hide-mobile">{n.label}</span>
            </button>
          ))}
        </div>

        {/* Theme toggle */}
        <button onClick={toggleTheme} className="theme-toggle"
          style={{ background:"var(--bg-surface)", border:"1px solid var(--border)",
            borderRadius:8, padding:"5px 9px", cursor:"pointer",
            color:"var(--text-h)", fontSize:15, lineHeight:1, flexShrink:0, marginLeft:8 }}>
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Admin lock */}
        <button onClick={() => adminMode ? setAdminMode(false) : setShowAdminModal(true)}
          title={adminMode ? "Admin Mode Active — Click to logout" : "Admin Login"}
          style={{ background: adminMode ? "#34D39922" : "var(--bg-surface)",
            border:`1px solid ${adminMode ? "#34D399" : "var(--border)"}`,
            borderRadius:8, padding:"5px 9px", cursor:"pointer",
            color: adminMode ? "#34D399" : "var(--text-muted)", fontSize:15, lineHeight:1, flexShrink:0, marginLeft:4,
            transition:"all 0.2s" }}>
          {adminMode ? "🔓" : "🔒"}
        </button>
      </nav>

      {/* Admin bar */}
      {adminMode && (
        <div style={{ background:"#34D39918", borderBottom:"1px solid #34D39944", padding:"6px 16px",
          display:"flex", alignItems:"center", gap:12, fontSize:12 }}>
          <span style={{ color:"#34D399", fontWeight:800 }}>⚡ Admin Mode Active</span>
          <span style={{ color:"var(--text-muted)" }}>Logged in as ykacha · Notes fully editable · Full access enabled</span>
          <button onClick={() => setAdminMode(false)}
            style={{ marginLeft:"auto", background:"none", border:"1px solid #34D39944", color:"#34D399",
              borderRadius:6, padding:"2px 10px", cursor:"pointer", fontSize:11, fontWeight:700 }}>
            Logout
          </button>
        </div>
      )}

      {/* Admin modal */}
      {showAdminModal && (
        <AdminModal
          onLogin={() => { setAdminMode(true); setShowAdminModal(false); }}
          onClose={() => setShowAdminModal(false)}
        />
      )}

      {/* ── Content ── */}
      <main key={view} className="view-enter">
        {view==="dashboard" && <Dashboard setView={setView} />}
        {view==="pipeline"  && <PipelineView />}
        {view==="methods"   && <MethodsView navigate={navigate} />}
        {view==="qbd"       && <QbDView navigate={navigate} />}
        {view==="ctd"       && <CTDView />}
        {view==="timeline"  && <TimelineView />}
        {view==="domains"   && <DomainsView />}
        {view==="exam"      && <ExamView />}
        {view==="ich"       && <ICHView />}
        {view==="career"    && <CareerView navigate={navigate} />}
        {view==="notes"     && <NotesView adminMode={adminMode} />}
        {view==="glossary"  && <GlossaryView />}
        {view==="stability" && <StabilityView />}
        {view==="oos"       && <OOSView />}
        {view==="batch"     && <BatchRecordView />}
        {view==="cases"     && <CaseStudiesView />}
        {view==="compendial"&& <CompendialView />}
        {view==="excipient" && <ExcipientView />}
        {view==="pathway"   && <PathwayView />}
        {view==="progress"  && <ProgressView />}
      </main>
    </div>
  );
}
