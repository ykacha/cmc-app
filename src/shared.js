// ── Shared constants and components used across all views ────────
import { useState } from "react";

export const LC = {
  Foundational: "#22D3EE",
  Intermediate:  "#34D399",
  Advanced:      "#F59E0B",
  Expert:        "#F472B6",
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
  <span style={{ background:LC[level]+"22", color:LC[level], border:`1px solid ${LC[level]}44`,
    padding:"2px 8px", borderRadius:12, fontSize:11, fontWeight:700, whiteSpace:"nowrap" }}>
    {level}
  </span>
);

export const SectionHeader = ({ icon, title, subtitle }) => (
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

export const InfoBox = ({ color, label, text }) => (
  <div style={{ background:`${color}11`, border:`1px solid ${color}33`, borderRadius:8, padding:"10px 14px", marginBottom:8 }}>
    <strong style={{ color, fontSize:11, letterSpacing:"0.05em" }}>{label}</strong>
    <p style={{ color:"var(--text-body)", margin:"6px 0 0", fontSize:13, lineHeight:1.65 }}>{text}</p>
  </div>
);

export const PhasePill = ({ phase, active }) => (
  <span style={{
    background: active ? "#34D39933" : "var(--bg-raised)",
    color: active ? "#34D399" : "var(--text-faint)",
    border: `1px solid ${active ? "#34D39944" : "var(--border)"}`,
    padding:"2px 7px", borderRadius:10, fontSize:10, fontWeight:700,
    transition:"all 0.2s ease",
  }}>{phase}</span>
);

export const FilterBtn = ({ label, active, color, onClick }) => (
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

export const DNALogo = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="yk-grad" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4F46E5"/>
        <stop offset="100%" stopColor="#7C3AED"/>
      </linearGradient>
      <linearGradient id="yk-grad2" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#A78BFA"/>
        <stop offset="100%" stopColor="#38BDF8"/>
      </linearGradient>
    </defs>
    <circle cx="17" cy="17" r="17" fill="url(#yk-grad)"/>
    <circle cx="17" cy="17" r="13.5" stroke="url(#yk-grad2)" strokeWidth="1" strokeOpacity="0.4" fill="none"/>
    <circle cx="17" cy="17" r="3.5" fill="white" fillOpacity="0.95"/>
    <circle cx="17" cy="7" r="2" fill="white" fillOpacity="0.85"/>
    <circle cx="26.3" cy="22.5" r="2" fill="white" fillOpacity="0.85"/>
    <circle cx="7.7" cy="22.5" r="2" fill="white" fillOpacity="0.85"/>
    <line x1="17" y1="13.5" x2="17" y2="9" stroke="white" strokeWidth="1.8" strokeOpacity="0.7" strokeLinecap="round"/>
    <line x1="19.8" y1="19.6" x2="24.7" y2="21.3" stroke="white" strokeWidth="1.8" strokeOpacity="0.7" strokeLinecap="round"/>
    <line x1="14.2" y1="19.6" x2="9.3" y2="21.3" stroke="white" strokeWidth="1.8" strokeOpacity="0.7" strokeLinecap="round"/>
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
            <stop offset="0%" stopColor="#F59E0B"/><stop offset="100%" stopColor="#92400E"/>
          </linearGradient>
          <linearGradient id="hb-fab" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE68A"/><stop offset="100%" stopColor="#B45309"/>
          </linearGradient>
          <radialGradient id="hb-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#34D399" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="85" cy="92" r="46" fill="url(#hb-glow)" style={{animation:"cmc-glow-pulse 2.8s ease-in-out infinite"}}/>
        <g style={{transformOrigin:"85px 85px", animation:"cmc-ring-cw 11s linear infinite"}}>
          <ellipse cx="85" cy="85" rx="70" ry="22" stroke="#F59E0B" strokeWidth="0.8" strokeOpacity="0.45" strokeDasharray="6 5" fill="none" transform="rotate(-18,85,85)"/>
        </g>
        <g style={{transformOrigin:"85px 85px", animation:"cmc-ring-ccw 15s linear infinite"}}>
          <ellipse cx="85" cy="85" rx="60" ry="19" stroke="#34D399" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="4 7" fill="none" transform="rotate(25,85,85)"/>
        </g>
        <g style={{transformOrigin:"85px 85px", animation:"cmc-ring-tilt 20s linear infinite"}}>
          <ellipse cx="85" cy="85" rx="76" ry="24" stroke="#FBBF24" strokeWidth="0.6" strokeOpacity="0.28" strokeDasharray="5 9" fill="none" transform="rotate(50,85,85)"/>
        </g>
        <g style={{transformOrigin:"85px 95px", animation:"cmc-mab-float 3.4s ease-in-out infinite"}}>
          <path d="M79 92 Q79 108 79 122 Q79 130 85 132 Q91 130 91 122 Q91 108 91 92" fill="url(#hb-fc)" opacity="0.92"/>
          <rect x="77" y="78" width="16" height="17" rx="7" fill="url(#hb-fc)"/>
          <line x1="77" y1="84" x2="93" y2="84" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.65"/>
          <line x1="77" y1="89" x2="93" y2="89" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.65"/>
          <path d="M80 80 Q68 68 50 52 Q43 45 38 40 Q33 34 38 28 Q43 22 51 26 Q56 29 60 35 Q72 54 83 72" fill="url(#hb-fab)" opacity="0.9" style={{animation:"cmc-fab-glow 3.4s ease-in-out infinite"}}/>
          <ellipse cx="38" cy="26" rx="10" ry="8" fill="#FCD34D"/>
          <path d="M31 22 Q38 13 45 22" stroke="white" strokeWidth="1.6" fill="none" strokeOpacity="0.9" strokeLinecap="round"/>
          <ellipse cx="56" cy="38" rx="8" ry="7" fill="#F59E0B" opacity="0.6"/>
          <path d="M90 80 Q102 68 120 52 Q127 45 132 40 Q137 34 132 28 Q127 22 119 26 Q114 29 110 35 Q98 54 87 72" fill="url(#hb-fab)" opacity="0.9" style={{animation:"cmc-fab-glow 3.4s ease-in-out infinite"}}/>
          <ellipse cx="132" cy="26" rx="10" ry="8" fill="#FCD34D"/>
          <path d="M125 22 Q132 13 139 22" stroke="white" strokeWidth="1.6" fill="none" strokeOpacity="0.9" strokeLinecap="round"/>
          <ellipse cx="114" cy="38" rx="8" ry="7" fill="#F59E0B" opacity="0.6"/>
          <path d="M81 112 Q73 120 69 130" stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
          <path d="M89 112 Q97 120 101 130" stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
          <circle cx="69" cy="131" r="4" fill="#34D399" opacity="0.9"/>
          <circle cx="101" cy="131" r="4" fill="#34D399" opacity="0.9"/>
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
            <circle cx="0" cy="-68" r="12" fill="#031A0F" stroke="#34D399" strokeWidth="1.8"/>
            <circle cx="0" cy="-68" r="4" fill="#34D399" style={{animation:"cmc-dot-pulse 2.2s ease-in-out infinite"}}/>
          </g>
          <g style={{transformOrigin:"0px 0px", animation:"cmc-orbit-b 6.5s linear infinite"}}>
            <circle cx="0" cy="-62" r="12" fill="#1C1000" stroke="#F59E0B" strokeWidth="1.8"/>
            <circle cx="0" cy="-62" r="4" fill="#F59E0B" style={{animation:"cmc-dot-pulse 2.8s ease-in-out infinite"}}/>
          </g>
          <g style={{transformOrigin:"0px 0px", animation:"cmc-orbit-c 9s linear infinite"}}>
            <circle cx="0" cy="-73" r="12" fill="#031A0F" stroke="#34D399" strokeWidth="1.8"/>
            <circle cx="0" cy="-73" r="4" fill="#34D399" style={{animation:"cmc-dot-pulse 3.4s ease-in-out infinite"}}/>
          </g>
        </g>
      </svg>
    </div>
  </>
);

export function sm2Update(card, quality) {
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

// unused but kept to satisfy react import
void useState;
