// ── Shared constants and components used across all views ────────
import { useState, useRef } from "react";

export const LC = {
  Foundational: "#1F9D63",
  Intermediate:  "#3D63DD",
  Advanced:      "#D9731A",
  Expert:        "#E0393E",
};

export const METHOD_STEPS = {
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
  "am-hcp-elisa":     ["Prepare MRD dilution of sample in assay buffer","Set up 8-point HCP standard curve (0.78–100 ng/mL, 2-fold serial)","Add 100 µL standards + samples to anti-HCP coated plate (1h RT)","Wash plate 3× PBST; add HRP-conjugated anti-HCP detection antibody (1h RT)","Wash 5× PBST; add TMB substrate (15 min RT, protected from light)","Stop reaction with 2N H₂SO₄; read OD450–OD620","Interpolate HCP concentration from 4PL curve; convert to ppm vs. protein concentration"],
  "am-pra-elisa":     ["Dilute DS to appropriate MRD in sample diluent buffer","Prepare Protein A standard curve (0.25–16 ng/mL, 2-fold dilutions)","Coat plate with capture anti-PrA antibody (overnight 4°C); block 1h (2% BSA)","Add 100 µL standards + samples; incubate 1h RT on plate shaker","Wash 5× PBST; add HRP-conjugated detection anti-PrA antibody (1h RT)","Wash 5× PBST; add TMB substrate (20 min); stop with H₂SO₄","Read OD450; fit 4PL; report ng PrA/mg DS (ppm)"],
  "am-qpcr":          ["Extract and purify DNA from sample (proteinase K + silica column)","Quantify extracted DNA with PicoGreen fluorescence to assess recovery","Prepare CHO genomic DNA standard curve (7 points, 10-fold dilutions: 100 pg–0.001 pg/µL)","Set up triplicate TaqMan reactions: 20 µL volume, 1× master mix, 900 nM primers, 250 nM probe","Include no-template control (NTC) and positive spike control (IPC)","Run qPCR: 95°C 10 min hold → [95°C 15s → 60°C 60s] × 40 cycles","Determine Ct values; validate spike recovery ≥50%; calculate pg DNA/mL in sample"],
  "am-octet":         ["Load Protein A (or antigen) biosensor tips in buffer (hydrate ≥10 min)","Baseline in assay buffer (60 s); load ligand (60 s, ~0.5–2 nm shift)","Wash in buffer (30 s) to remove non-specifically bound ligand","Dip into analyte dilution series (5–7 concentrations spanning expected KD, 120–300 s)","Transfer to buffer-only wells for dissociation phase (120–600 s)","Regenerate tip with glycine pH 1.5–2.0 (2 × 30 s); baseline again","Globally fit association + dissociation to 1:1 Langmuir model; extract kon, koff, KD"],
};

export const Badge = ({ level }) => (
  <span className="sv-chip" style={{ "--chip": LC[level] }}>{level}</span>
);

/* Page title block: wide display title and a one-paragraph subtitle. */
export const SectionHeader = ({ title, subtitle }) => (
  <header className="sv-title">
    <h1>{title}</h1>
    {subtitle && <p>{subtitle}</p>}
  </header>
);

/* Page head for tool pages: title block and the page's mode tabs. */
export const PageHead = ({ title, subtitle, tabs = [], active, onTab }) => (
  <div className="sv-pagehead">
    <SectionHeader title={title} subtitle={subtitle} />
    {tabs.length > 0 && (
      <div className="sv-modebar" role="tablist">
        {tabs.map(t => (
          <button key={t} role="tab" aria-selected={active === t} className={`sv-tab${active === t ? " is-on" : ""}`} onClick={() => onTab(t)}>{t}</button>
        ))}
      </div>
    )}
  </div>
);

export const InfoBox = ({ color, label, text }) => (
  <div style={{ background:`${color}11`, border:`1px solid ${color}33`, borderRadius:8, padding:"10px 14px", marginBottom:8 }}>
    <strong style={{ color, fontSize:11, letterSpacing:"0.05em" }}>{label}</strong>
    <p style={{ color:"var(--text-body)", margin:"6px 0 0", fontSize:13, lineHeight:1.65 }}>{text}</p>
  </div>
);

export const PhasePill = ({ phase, active }) => (
  <span style={{
    background: active ? "#1F9D6333" : "var(--bg-raised)",
    color: active ? "#1F9D63" : "var(--text-faint)",
    border: `1px solid ${active ? "#1F9D6344" : "var(--border)"}`,
    padding:"2px 7px", borderRadius:6, fontSize:10, fontWeight:700,
    transition:"all 0.2s ease",
  }}>{phase}</span>
);

export const FilterBtn = ({ label, active, color, onClick }) => (
  <button onClick={onClick} className={`sv-tab${active ? " is-on" : ""}`} aria-pressed={!!active}
    style={color ? { "--tab": color } : undefined}>
    {label}
  </button>
);

// Brand mark: a size-exclusion chromatogram (aggregate shoulder, monomer peak) in a rounded square.
export const DNALogo = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="64" height="64" rx="15" style={{ fill:"var(--accent)" }} />
    <path d="M 8.00 46.00 L 8.48 46.00 L 8.96 46.00 L 9.44 46.00 L 9.92 46.00 L 10.40 46.00 L 10.88 46.00 L 11.36 46.00 L 11.84 46.00 L 12.32 46.00 L 12.80 46.00 L 13.28 46.00 L 13.76 46.00 L 14.24 46.00 L 14.72 46.00 L 15.20 46.00 L 15.68 46.00 L 16.16 46.00 L 16.64 46.00 L 17.12 46.00 L 17.60 45.99 L 18.08 45.98 L 18.56 45.96 L 19.04 45.90 L 19.52 45.77 L 20.00 45.54 L 20.48 45.15 L 20.96 44.57 L 21.44 43.79 L 21.92 42.88 L 22.40 41.97 L 22.88 41.22 L 23.36 40.78 L 23.84 40.73 L 24.32 41.02 L 24.80 41.50 L 25.28 41.96 L 25.76 42.19 L 26.24 42.06 L 26.72 41.49 L 27.20 40.44 L 27.68 38.96 L 28.16 37.06 L 28.64 34.81 L 29.12 32.28 L 29.60 29.56 L 30.08 26.75 L 30.56 23.99 L 31.04 21.43 L 31.52 19.23 L 32.00 17.52 L 32.48 16.42 L 32.96 16.00 L 33.44 16.30 L 33.92 17.29 L 34.40 18.91 L 34.88 21.04 L 35.36 23.55 L 35.84 26.28 L 36.32 29.09 L 36.80 31.85 L 37.28 34.43 L 37.76 36.77 L 38.24 38.81 L 38.72 40.53 L 39.20 41.94 L 39.68 43.06 L 40.16 43.92 L 40.64 44.56 L 41.12 45.03 L 41.60 45.36 L 42.08 45.59 L 42.56 45.74 L 43.04 45.84 L 43.52 45.91 L 44.00 45.94 L 44.48 45.97 L 44.96 45.98 L 45.44 45.99 L 45.92 45.99 L 46.40 46.00 L 46.88 46.00 L 47.36 46.00 L 47.84 46.00 L 48.32 46.00 L 48.80 46.00 L 49.28 46.00 L 49.76 46.00 L 50.24 46.00 L 50.72 46.00 L 51.20 46.00 L 51.68 46.00 L 52.16 46.00 L 52.64 46.00 L 53.12 46.00 L 53.60 46.00 L 54.08 46.00 L 54.56 46.00 L 55.04 46.00 L 55.52 46.00 L 56.00 46.00 L 56 46 L 8 46 Z" style={{ fill:"var(--chain-l)" }} />
    <path d="M 8.00 46.00 L 8.48 46.00 L 8.96 46.00 L 9.44 46.00 L 9.92 46.00 L 10.40 46.00 L 10.88 46.00 L 11.36 46.00 L 11.84 46.00 L 12.32 46.00 L 12.80 46.00 L 13.28 46.00 L 13.76 46.00 L 14.24 46.00 L 14.72 46.00 L 15.20 46.00 L 15.68 46.00 L 16.16 46.00 L 16.64 46.00 L 17.12 46.00 L 17.60 45.99 L 18.08 45.98 L 18.56 45.96 L 19.04 45.90 L 19.52 45.77 L 20.00 45.54 L 20.48 45.15 L 20.96 44.57 L 21.44 43.79 L 21.92 42.88 L 22.40 41.97 L 22.88 41.22 L 23.36 40.78 L 23.84 40.73 L 24.32 41.02 L 24.80 41.50 L 25.28 41.96 L 25.76 42.19 L 26.24 42.06 L 26.72 41.49 L 27.20 40.44 L 27.68 38.96 L 28.16 37.06 L 28.64 34.81 L 29.12 32.28 L 29.60 29.56 L 30.08 26.75 L 30.56 23.99 L 31.04 21.43 L 31.52 19.23 L 32.00 17.52 L 32.48 16.42 L 32.96 16.00 L 33.44 16.30 L 33.92 17.29 L 34.40 18.91 L 34.88 21.04 L 35.36 23.55 L 35.84 26.28 L 36.32 29.09 L 36.80 31.85 L 37.28 34.43 L 37.76 36.77 L 38.24 38.81 L 38.72 40.53 L 39.20 41.94 L 39.68 43.06 L 40.16 43.92 L 40.64 44.56 L 41.12 45.03 L 41.60 45.36 L 42.08 45.59 L 42.56 45.74 L 43.04 45.84 L 43.52 45.91 L 44.00 45.94 L 44.48 45.97 L 44.96 45.98 L 45.44 45.99 L 45.92 45.99 L 46.40 46.00 L 46.88 46.00 L 47.36 46.00 L 47.84 46.00 L 48.32 46.00 L 48.80 46.00 L 49.28 46.00 L 49.76 46.00 L 50.24 46.00 L 50.72 46.00 L 51.20 46.00 L 51.68 46.00 L 52.16 46.00 L 52.64 46.00 L 53.12 46.00 L 53.60 46.00 L 54.08 46.00 L 54.56 46.00 L 55.04 46.00 L 55.52 46.00 L 56.00 46.00" stroke="#fff" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

export const HeroBiologic = () => (
  <>
    <style>{`
      @keyframes cmc-glow-pulse { 0%,100%{opacity:.25;transform:scale(1)} 50%{opacity:.6;transform:scale(1.18)} }
      @keyframes cmc-mab-float  { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-7px)} }
      @keyframes cmc-ring-cw    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes cmc-ring-ccw   { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
      @keyframes cmc-ring-tilt  { from{transform:rotate(-20deg)} to{transform:rotate(340deg)} }
      @keyframes cmc-orbit-a    { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
      @keyframes cmc-orbit-b    { from{transform:rotate(120deg)} to{transform:rotate(480deg)} }
      @keyframes cmc-orbit-c    { from{transform:rotate(240deg)} to{transform:rotate(600deg)} }
      @keyframes cmc-dot-pulse  { 0%,100%{r:3.5} 50%{r:5.5} }
      @keyframes cmc-fab-glow   { 0%,100%{opacity:.88} 50%{opacity:1} }
    `}</style>
    <div style={{ width:170, height:170, margin:"0 auto 4px", position:"relative" }}>
      <svg width="170" height="170" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hb-fc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D9731A"/><stop offset="100%" stopColor="#92400E"/>
          </linearGradient>
          <linearGradient id="hb-fab" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE68A"/><stop offset="100%" stopColor="#B45309"/>
          </linearGradient>
          <radialGradient id="hb-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#1F9D63" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="85" cy="92" r="46" fill="url(#hb-glow)" style={{animation:"cmc-glow-pulse 2.8s ease-in-out infinite"}}/>
        <g style={{transformOrigin:"85px 85px", animation:"cmc-ring-cw 11s linear infinite"}}>
          <ellipse cx="85" cy="85" rx="70" ry="22" stroke="#D9731A" strokeWidth="0.8" strokeOpacity="0.45" strokeDasharray="6 5" fill="none" transform="rotate(-18,85,85)"/>
        </g>
        <g style={{transformOrigin:"85px 85px", animation:"cmc-ring-ccw 15s linear infinite"}}>
          <ellipse cx="85" cy="85" rx="60" ry="19" stroke="#1F9D63" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="4 7" fill="none" transform="rotate(25,85,85)"/>
        </g>
        <g style={{transformOrigin:"85px 85px", animation:"cmc-ring-tilt 20s linear infinite"}}>
          <ellipse cx="85" cy="85" rx="76" ry="24" stroke="#D9731A" strokeWidth="0.6" strokeOpacity="0.28" strokeDasharray="5 9" fill="none" transform="rotate(50,85,85)"/>
        </g>
        <g style={{transformOrigin:"85px 95px", animation:"cmc-mab-float 3.4s ease-in-out infinite"}}>
          <path d="M79 92 Q79 108 79 122 Q79 130 85 132 Q91 130 91 122 Q91 108 91 92" fill="url(#hb-fc)" opacity="0.92"/>
          <rect x="77" y="78" width="16" height="17" rx="7" fill="url(#hb-fc)"/>
          <line x1="77" y1="84" x2="93" y2="84" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.65"/>
          <line x1="77" y1="89" x2="93" y2="89" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.65"/>
          <path d="M80 80 Q68 68 50 52 Q43 45 38 40 Q33 34 38 28 Q43 22 51 26 Q56 29 60 35 Q72 54 83 72" fill="url(#hb-fab)" opacity="0.9" style={{animation:"cmc-fab-glow 3.4s ease-in-out infinite"}}/>
          <ellipse cx="38" cy="26" rx="10" ry="8" fill="#FCD34D"/>
          <path d="M31 22 Q38 13 45 22" stroke="white" strokeWidth="1.6" fill="none" strokeOpacity="0.9" strokeLinecap="round"/>
          <ellipse cx="56" cy="38" rx="8" ry="7" fill="#D9731A" opacity="0.6"/>
          <path d="M90 80 Q102 68 120 52 Q127 45 132 40 Q137 34 132 28 Q127 22 119 26 Q114 29 110 35 Q98 54 87 72" fill="url(#hb-fab)" opacity="0.9" style={{animation:"cmc-fab-glow 3.4s ease-in-out infinite"}}/>
          <ellipse cx="132" cy="26" rx="10" ry="8" fill="#FCD34D"/>
          <path d="M125 22 Q132 13 139 22" stroke="white" strokeWidth="1.6" fill="none" strokeOpacity="0.9" strokeLinecap="round"/>
          <ellipse cx="114" cy="38" rx="8" ry="7" fill="#D9731A" opacity="0.6"/>
          <path d="M81 112 Q73 120 69 130" stroke="#1F9D63" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
          <path d="M89 112 Q97 120 101 130" stroke="#1F9D63" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
          <circle cx="69" cy="131" r="4" fill="#1F9D63" opacity="0.9"/>
          <circle cx="101" cy="131" r="4" fill="#1F9D63" opacity="0.9"/>
          <path d="M69 131 Q61 138 59 145" stroke="#6EE7B7" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
          <path d="M69 131 Q66 140 70 146" stroke="#6EE7B7" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
          <path d="M101 131 Q109 138 111 145" stroke="#6EE7B7" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
          <path d="M101 131 Q104 140 100 146" stroke="#6EE7B7" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
          <circle cx="59" cy="146" r="3" fill="#A7F3D0"/>
          <circle cx="70" cy="147" r="3" fill="#A7F3D0"/>
          <circle cx="111" cy="146" r="3" fill="#A7F3D0"/>
          <circle cx="100" cy="147" r="3" fill="#A7F3D0"/>
        </g>
        <g transform="translate(85,85)">
          <g style={{transformOrigin:"0px 0px", animation:"cmc-orbit-a 4.5s linear infinite"}}>
            <circle cx="0" cy="-68" r="12" fill="#031A0F" stroke="#1F9D63" strokeWidth="1.8"/>
            <circle cx="0" cy="-68" r="4" fill="#1F9D63" style={{animation:"cmc-dot-pulse 2.2s ease-in-out infinite"}}/>
          </g>
          <g style={{transformOrigin:"0px 0px", animation:"cmc-orbit-b 6.5s linear infinite"}}>
            <circle cx="0" cy="-62" r="12" fill="#1C1000" stroke="#D9731A" strokeWidth="1.8"/>
            <circle cx="0" cy="-62" r="4" fill="#D9731A" style={{animation:"cmc-dot-pulse 2.8s ease-in-out infinite"}}/>
          </g>
          <g style={{transformOrigin:"0px 0px", animation:"cmc-orbit-c 9s linear infinite"}}>
            <circle cx="0" cy="-73" r="12" fill="#031A0F" stroke="#1F9D63" strokeWidth="1.8"/>
            <circle cx="0" cy="-73" r="4" fill="#1F9D63" style={{animation:"cmc-dot-pulse 3.4s ease-in-out infinite"}}/>
          </g>
        </g>
      </svg>
    </div>
  </>
);


/* ── QC release stamp: the app's "you earned this" moment ──
   Evokes a batch-release / CoA approval stamp. Used at genuine
   completion states (perfect exam, all badges earned). */
export function ReleaseStamp({ label = "QC RELEASED · VERIFIED", sublabel = "PASS", size = 128, color = "var(--accent-2)" }) {
  const idRef = useRef(`stamp-${Math.random().toString(36).slice(2, 9)}`);
  const id = idRef.current;
  const r = size / 2 - 11, cx = size / 2, cy = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="lc-stamp" aria-hidden="true">
      <defs>
        <path id={id} fill="none" d={`M ${cx - r},${cy} a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`} />
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="2.5" opacity="0.9" />
      <circle cx={cx} cy={cy} r={r - 9} fill="none" stroke={color} strokeWidth="1" opacity="0.55" />
      <text fontSize={size * 0.078} fontWeight="800" letterSpacing="1.5" fill={color} style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>
        <textPath href={`#${id}`} startOffset="1%">{label}</textPath>
      </text>
      <path d={`M ${cx - r * 0.32} ${cy} l ${r * 0.2} ${r * 0.22} l ${r * 0.42} -${r * 0.46}`}
        fill="none" stroke={color} strokeWidth={size * 0.042} strokeLinecap="round" strokeLinejoin="round" />
      <text x={cx} y={cy + r * 0.56} textAnchor="middle" fontSize={size * 0.1} fontWeight="900" letterSpacing="1" fill={color}
        style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>{sublabel}</text>
    </svg>
  );
}

// unused but kept to satisfy react import
void useState;
