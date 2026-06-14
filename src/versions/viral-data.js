/* ──────────────────────────────────────────────────────────────
   Viral Safety & Clearance — ICH Q5A(R2)
   Content module: model viruses, orthogonal clearance steps,
   spiking-study design, regulatory framing, LRV calculator.
   ────────────────────────────────────────────────────────────── */

export const VIRAL_INTRO = {
  what: "Viral safety of biotech products derived from mammalian cell lines rests on three complementary pillars (ICH Q5A(R2)): (1) selecting and testing cell lines and raw materials for viral contaminants, (2) testing the unprocessed bulk at appropriate steps, and (3) demonstrating the manufacturing process can clear potential viral contaminants. Clearance studies use deliberate \"spiking\" of model viruses into scaled-down unit operations to measure log10 reduction.\n\nA robust process provides orthogonal clearance — at least two effective, mechanistically distinct steps — and must address both enveloped and small non-enveloped viruses (the hardest to clear). For CHO-derived monoclonal antibodies the classic combination is low-pH inactivation (enveloped) plus 20 nm virus filtration (size-based, clears small non-enveloped MMV).",
  pillars: [
    { t:"Cell line & raw materials", d:"Characterize MCB/WCB for endogenous and adventitious viruses; control animal-origin and high-risk raw materials (e.g., switch to chemically-defined media)." },
    { t:"Process / in-process testing", d:"Test unprocessed bulk harvest for adventitious agents; in vitro/in vivo assays, TEM for retrovirus-like particles, qPCR; NGS increasingly accepted in Q5A(R2)." },
    { t:"Viral clearance", d:"Spiking studies on scaled-down steps quantify removal + inactivation; demonstrate orthogonality and robustness across worst-case conditions." },
  ],
};

export const MODEL_VIRUSES = [
  { id:"xmulv", name:"X-MuLV", full:"Xenotropic Murine Leukemia Virus", family:"Retroviridae", genome:"ssRNA", env:"Enveloped", size:"80–110 nm", resistance:"Low", color:"#34D399",
    role:"Specific model for the endogenous retrovirus-like particles of CHO/rodent cell lines. Readily inactivated by low pH and solvent/detergent; cleared by chromatography & filtration." },
  { id:"mmv", name:"MMV / MVM", full:"Minute Virus of Mice", family:"Parvoviridae", genome:"ssDNA", env:"Non-enveloped", size:"18–24 nm", resistance:"Very High", color:"#F472B6",
    role:"Worst-case small non-enveloped virus — the benchmark a process must clear. Extremely resistant to pH and chemicals; cleared mainly by 20 nm nanofiltration and robust AEX." },
  { id:"prv", name:"PRV", full:"Pseudorabies Virus", family:"Herpesviridae", genome:"dsDNA", env:"Enveloped", size:"120–200 nm", resistance:"Medium", color:"#38BDF8",
    role:"Large enveloped DNA virus; models herpes-type contaminants. Cleared efficiently by size-based filtration and inactivated by low pH." },
  { id:"reo", name:"Reo-3", full:"Reovirus Type 3", family:"Reoviridae", genome:"dsRNA", env:"Non-enveloped", size:"60–80 nm", resistance:"Medium–High", color:"#F59E0B",
    role:"Medium non-enveloped virus; broad biophysical/host range model. Resistant to inactivation; cleared by filtration and partitioning steps." },
];

export const CLEARANCE_STEPS = [
  { id:"protA", name:"Protein A Capture", mech:"Partitioning", lrv:"1.0 – 4.0", primary:false,
    targets:["xmulv","prv"], color:"#A78BFA",
    how:"Virus partitions away from antibody during bind/elute. Contributes clearance but variable and load-dependent — usually a supporting, not claimed-primary, step." },
  { id:"lowph", name:"Low-pH Inactivation", mech:"Inactivation", lrv:"≥ 4.0 – 6.0", primary:true,
    targets:["xmulv","prv"], color:"#22D3EE",
    how:"Hold at pH 3.3–3.7 for 30–60 min (often the post-Protein-A eluate). Disrupts viral envelopes → robust inactivation of enveloped viruses. Ineffective against non-enveloped (MMV, Reo)." },
  { id:"aex", name:"Anion Exchange (flow-through)", mech:"Partitioning / Removal", lrv:"3.0 – 6.0", primary:true,
    targets:["mmv","reo","xmulv"], color:"#34D399",
    how:"At pH where mAb flows through, negatively-charged viruses bind the resin and are removed. Effective for non-enveloped viruses; robust across conductivity within validated ranges." },
  { id:"vf", name:"Virus Filtration (20 nm)", mech:"Size Exclusion", lrv:"≥ 4.0 – 6.0", primary:true,
    targets:["mmv","reo","prv","xmulv"], color:"#F472B6",
    how:"Parvovirus-retentive nanofilter (e.g., 20N grade). Removes by size — the key orthogonal step for small non-enveloped MMV. Robust, mechanism-independent; validate Vmax, pressure, flux decay." },
  { id:"sd", name:"Solvent / Detergent", mech:"Inactivation", lrv:"≥ 4.0", primary:false,
    targets:["xmulv","prv"], color:"#FB923C",
    how:"Triton/tri-n-butyl phosphate disrupts lipid envelopes. Common in plasma products; less typical for mAbs but a strong enveloped-virus inactivation option." },
];

export const SPIKING_WORKFLOW = [
  { n:1, t:"Qualify the scale-down model", d:"Reproduce the manufacturing step at 1:100–1:1000 scale — match bed height, linear velocity, load ratio, buffers and worst-case parameters. Document representativeness." },
  { n:2, t:"Prepare & characterize virus stock", d:"High-titer, well-characterized model-virus stock; determine infectious titer (TCID50 / plaque assay) and total particles (qPCR)." },
  { n:3, t:"Spike the feed", d:"Add virus to the load at ≤10% v/v to avoid altering the matrix. Spiked-load control sampled for total input virus." },
  { n:4, t:"Run at worst-case", d:"Operate the unit op at the edges of the validated ranges (e.g., max load, end-of-life resin, lowest contact time / highest pH for inactivation)." },
  { n:5, t:"Sample & titrate", d:"Collect load, product pool (and fractions). Titrate by infectivity assay; confirm with qPCR. Include cytotoxicity & interference controls." },
  { n:6, t:"Compute LRV & assess", d:"LRV = log10(total virus in load ÷ total virus in pool). Combine orthogonal steps for cumulative clearance; apply ICH Q5A statistics (≈ ±0.5 log uncertainty)." },
];

export const VIRAL_FACTS = {
  orthogonality: "Claim clearance from at least two effective, mechanistically distinct steps. Don't sum two steps that share the same mechanism (e.g., two chromatography partitioning steps) without justification.",
  cap: "Steps achieving < ~1 log are generally not counted. A step where virus is at/below detection gives a minimum LRV (limited by assay sensitivity), not a true value.",
  q5ar2: "ICH Q5A(R2) (2023) modernized the 1999 guideline: explicit coverage of new expression systems & modalities, prior-knowledge / platform claims, continuous manufacturing, and next-generation sequencing (NGS) for adventitious-agent detection.",
};
