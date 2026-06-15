/* ══════════════════════════════════════════════════════════════
   CMC Master App — Analytical Intelligence Layer
   Cross-cutting structure on top of ANALYTICAL_METHODS (extra-data.js):
   · Critical Quality Attributes (CQAs) for a mAb
   · CQA × Method orthogonality map (which assay answers which question)
   · Method enrichment: role, ICH Q2 category, logistics, analyst pearls
   · ICH Q2(R2) validation framework
   · Phase-appropriate control strategy
   All method ids match ANALYTICAL_METHODS exactly.
   ══════════════════════════════════════════════════════════════ */

// ── Attribute groups (drives color + icon in the UI) ──
export const ATTR_GROUPS = {
  Purity:    { color:"#2DBF9E", icon:"filter" },
  Charge:    { color:"#E0A33B", icon:"wave" },
  Glycan:    { color:"#9B7DD4", icon:"excipient" },
  Sequence:  { color:"#6E8AF2", icon:"gene" },
  Structure: { color:"#7FB069", icon:"infinity" },
  Potency:   { color:"#E0707A", icon:"qbd" },
  Identity:  { color:"#5C9EAD", icon:"glossary" },
  Safety:    { color:"#D0895E", icon:"shieldcheck" },
  General:   { color:"#8A94A6", icon:"vial" },
};

// ── Critical Quality Attributes (mAb) ──
export const QUALITY_ATTRIBUTES = [
  { id:"agg",       name:"Aggregation (HMW)",      group:"Purity",    risk:"High",
    what:"Dimers, oligomers and higher-order species formed from the monomer.",
    why:"A leading immunogenicity risk and a direct loss of active monomer — among the most scrutinized CQAs.",
    drivers:"Interfacial / freeze-thaw / agitation stress, low-pH viral inactivation & elution, high concentration." },
  { id:"frag",      name:"Fragmentation (LMW)",    group:"Purity",    risk:"Medium",
    what:"Clips and fragments (Fab, Fc, Fab/c) from peptide-bond cleavage.",
    why:"Reduces potency and can expose neo-epitopes; a key stability degradant.",
    drivers:"Hinge-region proteolysis, hydrolysis, host-cell protease activity, low/high pH." },
  { id:"charge",    name:"Charge Variants",        group:"Charge",    risk:"High",
    what:"Acidic and basic isoforms differing in net surface charge.",
    why:"Can shift PK, FcRn binding, potency and immunogenicity — a comparability linchpin.",
    drivers:"Deamidation & sialylation (acidic), C-terminal Lys & N-terminal pyroGlu (basic), aglycosylation." },
  { id:"glycan",    name:"N-Glycosylation",        group:"Glycan",    risk:"High",
    what:"The Fc N297 glycan profile — fucosylation, galactosylation, sialylation, high-mannose.",
    why:"Afucosylation drives ADCC; galactosylation modulates CDC; high-mannose accelerates clearance.",
    drivers:"Cell line, clone, media (Mn²⁺, galactose), culture duration, harvest timing." },
  { id:"ox",        name:"Oxidation (Met / Trp)",  group:"Sequence",  risk:"Medium",
    what:"Methionine (Met252/428) and tryptophan oxidation.",
    why:"Fc Met oxidation weakens FcRn binding (PK) and can reduce potency; a stability marker.",
    drivers:"Light, residual peroxides (polysorbate), trace metals, elevated temperature." },
  { id:"deam",      name:"Deamidation (Asn)",      group:"Sequence",  risk:"High",
    what:"Asn → Asp / isoAsp (and Gln → Glu) conversion, especially in CDRs.",
    why:"If in a binding loop it can abolish potency; otherwise an acidic-variant contributor.",
    drivers:"High pH, temperature, susceptible motifs (NG, NS), buffer composition." },
  { id:"seq",       name:"Primary Sequence",       group:"Sequence",  risk:"High",
    what:"The full amino-acid sequence and post-translational modification map.",
    why:"Confirms the molecule is the intended construct — the bedrock of identity.",
    drivers:"Amino-acid misincorporation, sequence variants, clonal drift." },
  { id:"hos",       name:"Higher-Order Structure", group:"Structure", risk:"High",
    what:"Secondary, tertiary and conformational stability of the fold.",
    why:"Function lives in the fold; HOS comparability is central to any process change.",
    drivers:"Thermal / pH / interfacial denaturation, formulation, excipient loss." },
  { id:"ds",        name:"Disulfide & Free Thiol", group:"Structure", risk:"Medium",
    what:"Correct disulfide connectivity and level of unpaired (free) cysteine.",
    why:"Mis-pairing or free thiols destabilize structure and seed covalent aggregation.",
    drivers:"Reductive cell-culture environment, harvest redox, trace metals." },
  { id:"potency",   name:"Potency / Bioactivity",  group:"Potency",   risk:"High",
    what:"Mechanism-of-action–reflective biological activity, expressed as relative potency.",
    why:"The definitive readout of efficacy and the assay regulators weight most at release.",
    drivers:"Any structural change touching target/effector binding — glycan, charge, oxidation, aggregation." },
  { id:"identity",  name:"Identity",               group:"Identity",  risk:"High",
    what:"Positive confirmation at release that the vial contains the right product.",
    why:"A regulatory must — distinguishes the product from others on the same line.",
    drivers:"Mislabeling / mix-up controls; orthogonal identity (size + charge + binding)." },
  { id:"conc",      name:"Protein Concentration",  group:"General",   risk:"Medium",
    what:"Total protein content (mg/mL), the basis of dose.",
    why:"Drives fill accuracy and dosing; feeds every normalized assay.",
    drivers:"Extinction coefficient accuracy, light-scattering interference, dilution error." },
  { id:"particles", name:"Sub-/Visible Particles", group:"Purity",    risk:"High",
    what:"Subvisible (≥2 / ≥10 / ≥25 µm) and visible particulate matter.",
    why:"Immunogenicity & safety risk; governed by USP <787>/<788>/<789>.",
    drivers:"Protein aggregation, silicone oil, glass/elastomer shedding, air-liquid stress." },
  { id:"hcp",       name:"Host Cell Proteins",     group:"Safety",    risk:"High",
    what:"Residual CHO/host proteins co-purified with the product.",
    why:"Immunogenicity and product-stability risk (e.g., PLBL2 lipase degrading polysorbate).",
    drivers:"Clone, harvest conditions, downstream clearance efficiency." },
  { id:"resdna",    name:"Residual DNA",           group:"Safety",    risk:"Medium",
    what:"Residual host-cell DNA carried through purification.",
    why:"Theoretical oncogenic/infectious risk; WHO/FDA limit ~10 ng/dose.",
    drivers:"Cell lysis at harvest, nuclease treatment & chromatographic clearance." },
  { id:"resproa",   name:"Residual Protein A",     group:"Safety",    risk:"Medium",
    what:"Protein A ligand leached from the capture resin.",
    why:"Immunogenicity risk and an indicator of resin/column health.",
    drivers:"Low-pH elution, resin age & cycle number, alkaline cleaning." },
  { id:"endo",      name:"Endotoxin & Bioburden",  group:"Safety",    risk:"High",
    what:"Bacterial endotoxin (pyrogen) and microbial load / sterility.",
    why:"Patient-safety critical for a parenteral; non-negotiable release tests.",
    drivers:"Raw materials, open handling, hold times, container-closure integrity." },
];

// ── CQA × Method orthogonality map ──
// role: "primary" (the spec-defining workhorse) · "orthogonal" (independent confirmation) · "supporting" (screen / context)
export const CQA_METHODS = {
  agg: {
    methods:[
      { m:"am-sec",         role:"primary",    note:"Workhorse release assay for %HMW; resolves dimer/oligomer by hydrodynamic size." },
      { m:"am-sec-mals",    role:"orthogonal", note:"Absolute molar mass — separates true aggregate from a column-interaction artifact." },
      { m:"am-ce-sds",      role:"orthogonal", note:"Non-reduced CE-SDS distinguishes covalent (disulfide-linked) HMW from non-covalent." },
      { m:"am-intact-mass", role:"orthogonal", note:"Native MS detects non-covalent dimers and half-antibody at the intact level." },
      { m:"am-dls",         role:"supporting", note:"Fast submicron-aggregate / PDI screen; intensity-weighted, not quantitative." },
      { m:"am-mfi",         role:"supporting", note:"Counts subvisible particles (2–100 µm) that SEC cannot detect." },
    ],
    ortho:"SEC alone can both create and mask aggregate. AUC sedimentation velocity (matrix-free) and SEC-MALS (calibration-free mass) are the classic orthogonal truth-checks." },
  frag: {
    methods:[
      { m:"am-ce-sds",     role:"primary",    note:"Reduced & non-reduced CE-SDS quantitate LMW species and the HC/LC ratio." },
      { m:"am-sec",        role:"orthogonal", note:"Resolves native fragments (e.g., Fab) under non-denaturing size separation." },
      { m:"am-peptide-map",role:"supporting", note:"Pinpoints the clip site at amino-acid resolution." },
    ],
    ortho:"CE-SDS sees denatured size; SEC sees native size — a clip can show in one and not the other, so both are run." },
  charge: {
    methods:[
      { m:"am-cief",       role:"primary",    note:"icIEF resolves acidic/main/basic isoforms by pI — the charge release assay." },
      { m:"am-iex",        role:"orthogonal", note:"CEX/AEX separates the same isoforms by a different mechanism (ionic interaction)." },
      { m:"am-peptide-map",role:"supporting", note:"Assigns the molecular cause (deamidation, C-term Lys, sialylation) of each peak." },
    ],
    ortho:"A charge peak is not an identity — fraction-collect and confirm by peptide map. cIEF and IEX disagreeing is itself diagnostic." },
  glycan: {
    methods:[
      { m:"am-glycan",     role:"primary",    note:"Released-glycan HILIC-UPLC quantitates the full N-glycan distribution." },
      { m:"am-intact-mass",role:"orthogonal", note:"Subunit/intact MS gives glycoform ratios without label or release chemistry." },
      { m:"am-peptide-map",role:"supporting", note:"Glycopeptide mapping localizes glycans to the specific N-site." },
    ],
    ortho:"Released-glycan (population view) and glycopeptide MS (site-specific view) answer different questions — afucosylation tracking usually needs both." },
  ox: {
    methods:[
      { m:"am-peptide-map",role:"primary",    note:"Site-specific %oxidation at each Met/Trp via LC-MS/MS." },
      { m:"am-intact-mass",role:"orthogonal", note:"+16 Da mass shift confirms bulk oxidation at the intact level." },
      { m:"am-spr",        role:"supporting", note:"FcRn binding by SPR shows the functional consequence of Fc Met oxidation." },
    ],
    ortho:"Oxidation is largely charge-neutral, so cIEF/IEX miss it — peptide mapping is the definitive readout, ideally with a forced-oxidation control." },
  deam: {
    methods:[
      { m:"am-peptide-map",role:"primary",    note:"Quantitates Asn→Asp/isoAsp at each motif; isoAsp distinguishable by MS/MS." },
      { m:"am-cief",       role:"orthogonal", note:"Deamidation adds negative charge → acidic-peak increase." },
      { m:"am-iex",        role:"orthogonal", note:"Confirms the acidic shift by an independent separation." },
      { m:"am-cell-bioassay",role:"supporting", note:"Detects potency loss when deamidation lands in a CDR." },
    ],
    ortho:"Keep digests cold, low-pH and short — sample-prep deamidation is the classic artifact that inflates the result." },
  seq: {
    methods:[
      { m:"am-peptide-map",role:"primary",    note:"≥95% sequence coverage with b/y-ion confirmation (ICH Q6B)." },
      { m:"am-intact-mass",role:"orthogonal", note:"Whole-molecule mass independently confirms the expected sequence + PTMs." },
    ],
    ortho:"Intact mass catches gross errors fast; peptide mapping localizes single-residue variants down to ~0.05% abundance." },
  hos: {
    methods:[
      { m:"am-cd",         role:"primary",    note:"Far-UV CD = secondary structure; near-UV CD = tertiary fingerprint." },
      { m:"am-dsc",        role:"primary",    note:"Tm / Tonset quantify conformational (thermal) stability of each domain." },
      { m:"am-intact-mass",role:"supporting", note:"Native MS probes conformational compactness and assembly state." },
    ],
    ortho:"For comparability, layer CD/DSC with orthogonal HOS tools — HDX-MS (local dynamics), FTIR, intrinsic fluorescence and NMR fingerprinting." },
  ds: {
    methods:[
      { m:"am-peptide-map",role:"primary",    note:"Non-reduced peptide mapping assigns disulfide connectivity." },
      { m:"am-ce-sds",     role:"orthogonal", note:"Non-reduced CE-SDS flags mis-pairing / scrambling as size shifts." },
      { m:"am-intact-mass",role:"supporting", note:"Mass under non-reducing conditions reflects total disulfide bonding." },
    ],
    ortho:"Free-thiol quantitation (Ellman's / mass-shift labeling) complements connectivity mapping." },
  potency: {
    methods:[
      { m:"am-cell-bioassay",role:"primary",  note:"MoA-reflective cellular response — the definitive release potency assay." },
      { m:"am-spr",        role:"orthogonal", note:"Binding kinetics (kon/koff, KD) to target / FcRn / FcγR." },
      { m:"am-octet",      role:"orthogonal", note:"BLI binding affinity — higher-throughput kinetic confirmation." },
      { m:"am-elisa",      role:"supporting", note:"Binding ELISA as a simpler, but non-functional, surrogate." },
    ],
    ortho:"Binding ≠ function. A CDR modification can pass an ELISA yet fail the cell-based assay, which is why the bioassay anchors the spec." },
  identity: {
    methods:[
      { m:"am-peptide-map",role:"primary",    note:"Sequence-level identity (often an abbreviated, targeted map at release)." },
      { m:"am-cief",       role:"orthogonal", note:"Charge fingerprint as a second, independent identity dimension." },
      { m:"am-intact-mass",role:"orthogonal", note:"Intact mass confirms molecular identity quickly." },
      { m:"am-elisa",      role:"supporting", note:"Binding-based identity (right target engagement)." },
    ],
    ortho:"Release identity is usually multi-attribute by design — size + charge + binding — so no single failure mode passes undetected." },
  conc: {
    methods:[
      { m:"am-a280",       role:"primary",    note:"UV A280 with a sequence-derived extinction coefficient." },
    ],
    ortho:"Subtract scatter at 320–340 nm and verify ε; for turbid or conjugated products, orthogonal colorimetric assays apply." },
  particles: {
    methods:[
      { m:"am-mfi",        role:"primary",    note:"Micro-flow imaging counts and images 2–100 µm subvisible particles." },
      { m:"am-dls",        role:"supporting", note:"Probes the submicron regime below the particle-count window." },
    ],
    ortho:"MFI bridges the gap HIAC light-obscuration (USP <788>) under-counts for translucent protein particles; morphology separates protein from silicone oil and air." },
  hcp: {
    methods:[
      { m:"am-hcp-elisa",  role:"primary",    note:"Process-specific anti-HCP ELISA gives total residual HCP (ppm)." },
    ],
    ortho:"A polyclonal reagent only sees what it was raised against — antibody-coverage analysis (2D-DIGE/Western) and orthogonal LC-MS/MS address blind spots." },
  resdna: {
    methods:[
      { m:"am-qpcr",       role:"primary",    note:"qPCR against the host genome quantifies residual DNA (pg/dose)." },
    ],
    ortho:"Spike-recovery and inhibition controls separate genuinely low DNA from a failed extraction; threshold-PCR confirms fragment size." },
  resproa: {
    methods:[
      { m:"am-pra-elisa",  role:"primary",    note:"Sandwich ELISA quantifies leached Protein A ligand (ppm/ng-per-mg)." },
    ],
    ortho:"Trend against resin cycle number, not just per lot — leaching climbs with resin age and after low-pH elution." },
  endo: {
    methods:[
      { m:"am-endotoxin",  role:"primary",    note:"LAL / BET (kinetic chromogenic) quantifies endotoxin (EU/mL)." },
      { m:"am-bioburden",  role:"primary",    note:"Bioburden & sterility (USP <61>/<71>) bound microbial load." },
    ],
    ortho:"Run a Positive Product Control for low-endotoxin-recovery (LER): citrate/polysorbate matrices can mask spiked endotoxin and invalidate the BET." },
};

// ── Method enrichment (keyed by ANALYTICAL_METHODS id) ──
// role: classification · q2: ICH Q2 test category · pearl: an analyst's failure-mode tip
export const METHOD_EXTRAS = {
  "am-peptide-map": { role:["Characterization","Release (ID)"], q2:"Identification", throughput:"Low · 1–2 days", sample:"~100 µg",
    env:"Characterization / MS lab",
    pearl:"Sample-prep deamidation & oxidation is the classic artifact — keep digests cold, low-pH and short, and co-run a reference-standard map on the same plate." },
  "am-intact-mass": { role:["Characterization","Release (ID)"], q2:"Identification", throughput:"Medium", sample:"10–50 µg",
    env:"MS lab",
    pearl:"Do subunit analysis (IdeS + reduce) before deconvolution — resolving Fd/LC/Fc turns a blurred 148 kDa envelope into assignable glycoform masses." },
  "am-ce-sds": { role:["Release","Stability-indicating"], q2:"Impurities (quantitative)", throughput:"High", sample:"~10 µg",
    env:"QC-friendly",
    pearl:"Free-thiol alkylation (NEM) is make-or-break for non-reduced CE-SDS — incomplete blocking generates artifactual fragments from thiol scrambling." },
  "am-cief": { role:["Release","Stability-indicating"], q2:"Impurities (quantitative)", throughput:"Medium", sample:"~50 µg",
    env:"QC-friendly",
    pearl:"Carbamylation from urea-containing ampholytes adds spurious acidic peaks — use fresh urea-free reagents and a forced-deamidation control to assign peaks." },
  "am-sec": { role:["Release","Stability-indicating","In-process"], q2:"Impurities (quantitative)", throughput:"High", sample:"~50 µg",
    env:"QC-friendly",
    pearl:"The mobile phase can suppress (high salt) or the column can inflate (carryover) %HMW — confirm an ambiguous number with column-free AUC or SEC-MALS." },
  "am-iex": { role:["Release","Stability-indicating"], q2:"Impurities (quantitative)", throughput:"Medium", sample:"~50 µg",
    env:"QC-friendly",
    pearl:"A 'basic' peak isn't self-explanatory — it could be C-term Lys, succinimide or aglycosylation; fraction-collect and confirm by peptide map." },
  "am-sec-mals": { role:["Characterization"], q2:"Characterization", throughput:"Low", sample:"~100 µg",
    env:"Characterization lab",
    pearl:"MALS reports absolute molar mass independent of column calibration — the orthogonal truth-check when SEC retention time is ambiguous (fusions, conjugates)." },
  "am-cell-bioassay": { role:["Release","Stability-indicating"], q2:"Assay (potency)", throughput:"Low · multi-day", sample:"Variable",
    env:"Cell-culture / bioassay lab",
    pearl:"Report geometric-mean relative potency from a parallel-line / 4-PL fit; system-suitability (similarity, slope ratio) matters more than the point estimate." },
  "am-elisa": { role:["Release","Characterization"], q2:"Assay (binding)", throughput:"High", sample:"Low",
    env:"QC-friendly",
    pearl:"Binding ≠ function — an ELISA can pass while a CDR modification kills cell-based potency; keep it orthogonal, never a potency surrogate." },
  "am-spr": { role:["Characterization"], q2:"Characterization", throughput:"Medium", sample:"Low",
    env:"Biophysics lab",
    pearl:"Mass-transport limitation flatters kon — keep ligand density low and flow high; report a confirmed 1:1 fit or fall back to steady-state KD." },
  "am-glycan": { role:["Characterization","Release (some)"], q2:"Impurities (quantitative)", throughput:"Low", sample:"~100 µg",
    env:"Characterization lab",
    pearl:"Watch high-mannose alongside afucosylation: it clears fast via the mannose receptor and tends to climb late in fed-batch, moving both PK and potency." },
  "am-dls": { role:["Characterization","In-process (screen)"], q2:"Characterization", throughput:"High", sample:"~20 µL",
    env:"QC / screening",
    pearl:"Z-average and PDI are intensity-weighted — a trace of large aggregate dominates the signal; superb for screening, poor for quantitation." },
  "am-dsc": { role:["Characterization"], q2:"Characterization", throughput:"Low", sample:"~0.5 mg",
    env:"Biophysics lab",
    pearl:"Tm ranks candidate/formulation stability but isn't a shelf-life predictor — pair with accelerated SEC/charge data; the CH2 domain unfolds first in IgG1." },
  "am-mfi": { role:["Release","Stability-indicating"], q2:"Impurities (limit)", throughput:"Medium", sample:"~1 mL",
    env:"QC-friendly",
    pearl:"Morphology is the payoff — it separates translucent protein particles from silicone-oil droplets and air bubbles that light obscuration miscounts." },
  "am-endotoxin": { role:["Release","In-process"], q2:"Impurities (limit)", throughput:"High", sample:"Low",
    env:"QC microbiology",
    pearl:"Always run a Positive Product Control for LER — citrate + polysorbate formulations can mask spiked endotoxin and silently invalidate the BET." },
  "am-bioburden": { role:["Release","In-process"], q2:"Impurities (limit)", throughput:"Medium · incubation", sample:"≥1 mL",
    env:"QC microbiology",
    pearl:"Membrane filtration out-recovers pour-plate for low-count biologics; pre-incubate to resuscitate organisms stressed by cold storage." },
  "am-cd": { role:["Characterization"], q2:"Characterization", throughput:"Medium", sample:"~0.2 mg",
    env:"Biophysics lab",
    pearl:"Use it for comparability, not absolute quantitation — far-UV (190–250 nm) reads secondary structure, near-UV (250–320 nm) the tertiary fingerprint." },
  "am-a280": { role:["Release","In-process"], q2:"Assay (content)", throughput:"High", sample:"<1 mg",
    env:"QC-friendly",
    pearl:"A wrong extinction coefficient gives a confidently wrong concentration — verify ε and subtract light-scattering at 320–340 nm." },
  "am-hcp-elisa": { role:["Release","In-process"], q2:"Impurities (limit)", throughput:"Medium", sample:"Low",
    env:"QC-friendly",
    pearl:"The reagent only sees antigens it was raised against — antibody coverage (2D Western / AAE) is the question reviewers ask; orthogonal LC-MS/MS is rising." },
  "am-pra-elisa": { role:["Release","Characterization"], q2:"Impurities (limit)", throughput:"Medium", sample:"Low",
    env:"QC-friendly",
    pearl:"Leached Protein A spikes after low-pH elution and with aged resin — trend it against resin cycle number, not just per lot." },
  "am-qpcr": { role:["Release","Characterization"], q2:"Impurities (limit)", throughput:"Medium", sample:"Low",
    env:"QC molecular",
    pearl:"Validate against the actual host genome with a defined amplicon; spike-recovery and inhibition controls separate 'low DNA' from a failed extraction." },
  "am-octet": { role:["Characterization","In-process (screen)"], q2:"Characterization", throughput:"High", sample:"Low",
    env:"Biophysics / screening",
    pearl:"Fluidics-free and plate-based (great throughput) but more prone to nonspecific binding than SPR — match your reference surfaces carefully." },
};

// ── Method role classification (control-strategy view) ──
export const ROLE_DEFS = {
  "Release":              { color:"#2DBF9E", desc:"Run on every lot to confirm it meets specification before disposition." },
  "Stability-indicating": { color:"#E0A33B", desc:"Detects degradation and is trended over shelf-life to justify the expiry date." },
  "Characterization":     { color:"#6E8AF2", desc:"Deep structural analysis — at the BLA, for comparability, not on every lot." },
  "In-process":           { color:"#9B7DD4", desc:"Monitors intermediates to keep the process in control in real time." },
};
export const METHOD_ROLE_BASE = ["Release","Stability-indicating","Characterization","In-process"];

// ── ICH Q2(R2) validation framework ──
export const Q2_CATEGORIES = [
  { id:"id",     name:"Identification",            short:"ID",
    desc:"Confirms the analyte is what it claims, against a reference standard.",
    methods:["am-peptide-map","am-intact-mass","am-cief"] },
  { id:"assay",  name:"Assay (content / potency)", short:"Assay",
    desc:"Quantitates the active substance — protein content or biological potency.",
    methods:["am-a280","am-cell-bioassay","am-elisa","am-spr","am-octet"] },
  { id:"impq",   name:"Impurities — quantitative", short:"Imp (quant)",
    desc:"Measures the level of an impurity or product-related variant.",
    methods:["am-sec","am-ce-sds","am-cief","am-iex","am-glycan","am-sec-mals"] },
  { id:"impl",   name:"Impurities — limit",        short:"Imp (limit)",
    desc:"Pass / fail against a threshold rather than an exact level.",
    methods:["am-endotoxin","am-bioburden","am-qpcr","am-pra-elisa","am-hcp-elisa","am-mfi"] },
];

// applies map: which characteristics are required per category (classic ICH Q2 table)
export const Q2_CHARACTERISTICS = [
  { id:"spec",    name:"Specificity",                applies:{ id:true,  assay:true,  impq:true,  impl:true },
    def:"Unequivocal assessment of the analyte in the presence of matrix, impurities and degradants.",
    crit:"No interference at the analyte position; resolution / peak purity demonstrated." },
  { id:"acc",     name:"Accuracy",                   applies:{ id:false, assay:true,  impq:true,  impl:false },
    def:"Closeness of the measured value to the true value.",
    crit:"≈98–102% recovery (assay); documented spike recovery across the range (impurities)." },
  { id:"prec-r",  name:"Precision — Repeatability",  applies:{ id:false, assay:true,  impq:true,  impl:false },
    def:"Agreement of replicate measurements under the same conditions (intra-assay).",
    crit:"%RSD ≤ ~1–2% (assay); method-appropriate for impurities." },
  { id:"prec-i",  name:"Precision — Intermediate",   applies:{ id:false, assay:true,  impq:true,  impl:false },
    def:"Variation across analysts, days and instruments within one lab.",
    crit:"Combined %RSD within pre-set limits; supports transfer." },
  { id:"lod",     name:"Detection Limit (LOD)",      applies:{ id:false, assay:false, impq:false, impl:true },
    def:"Lowest amount detectable but not necessarily quantifiable.",
    crit:"Signal-to-noise ≈ 3:1 (or statistical estimate)." },
  { id:"loq",     name:"Quantitation Limit (LOQ)",   applies:{ id:false, assay:false, impq:true,  impl:false },
    def:"Lowest amount quantifiable with acceptable accuracy and precision.",
    crit:"Signal-to-noise ≈ 10:1; reporting threshold defined." },
  { id:"lin",     name:"Linearity",                  applies:{ id:false, assay:true,  impq:true,  impl:false },
    def:"Proportionality of response to analyte concentration across the range.",
    crit:"r² ≥ 0.99; residuals random across the range." },
  { id:"range",   name:"Range",                      applies:{ id:false, assay:true,  impq:true,  impl:false },
    def:"Interval over which the method is accurate, precise and linear.",
    crit:"≈80–120% of target (assay); LOQ–120% of spec (impurities)." },
  { id:"robust",  name:"Robustness",                 applies:{ id:true,  assay:true,  impq:true,  impl:true },
    def:"Capacity to stay unaffected by small, deliberate parameter changes (established in development).",
    crit:"Defined acceptable ranges for key parameters (pH, temp, column lot)." },
];

// ── Phase-appropriate analytical strategy ──
export const PHASE_STRATEGY = [
  { phase:"Pre-IND",  emphasis:["Characterization","Release (ID)"],
    focus:"Establish identity, basic purity and a fit-for-purpose potency assay. Begin the reference standard. Methods are scientifically sound but not yet validated." },
  { phase:"IND / Ph1", emphasis:["Release","In-process"],
    focus:"Qualified release & safety panel (endotoxin, bioburden, sterility, identity, purity, potency, concentration). Specifications are wide and clinical-stage appropriate." },
  { phase:"Ph2",      emphasis:["Release","Stability-indicating"],
    focus:"Tighten specifications as data accrues, optimize methods, and build out the characterization package and forced-degradation understanding." },
  { phase:"Ph3",      emphasis:["Release","Stability-indicating","Characterization"],
    focus:"Validated methods (ICH Q2), a finalized control strategy and a comparability protocol ready for any process change." },
  { phase:"BLA",      emphasis:["Characterization","Release","Stability-indicating"],
    focus:"Full characterization (peptide map, intact/subunit MS, glycan, HOS), validated release & stability methods, demonstrated orthogonality and justified specifications." },
];
