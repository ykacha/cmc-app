/* The guided path through analytical testing, written for someone new to
   CMC. Chapters follow the order a QC scientist actually reasons in: where
   the sample comes from, then the questions every lot must answer. */

export const SAMPLE_POINTS = [
  { id: "culture", n: "Cell culture", note: "CHO cells secrete the antibody into the medium over about two weeks.", tests: "titer, viability, bioburden, mycoplasma, adventitious virus" },
  { id: "harvest", n: "Harvest", note: "Cells are removed by centrifugation and depth filtration; the clarified fluid holds the product and a lot of host-cell debris.", tests: "bioburden, endotoxin, titer" },
  { id: "capture", n: "Protein A capture", note: "The antibody binds to Protein A resin and is eluted at low pH, leaving most impurities behind.", tests: "yield, HCP, leached Protein A" },
  { id: "vi", n: "Low-pH hold", note: "The acidic eluate is held to inactivate enveloped viruses.", tests: "pH, hold time, aggregates" },
  { id: "polish", n: "Polishing", note: "Ion-exchange and mixed-mode steps remove aggregates, charge variants, HCP and DNA.", tests: "HCP, DNA, aggregates" },
  { id: "vf", n: "Virus filtration", note: "A nanofilter removes viruses by size.", tests: "filter integrity" },
  { id: "ufdf", n: "UF/DF", note: "The product is concentrated and exchanged into its final formulation buffer.", tests: "concentration, pH, osmolality" },
  { id: "ds", n: "Drug substance", note: "The bulk is frozen and released against the DS specification.", tests: "full release panel", release: true },
  { id: "dp", n: "Drug product", note: "The DS is filled into vials or syringes and released again.", tests: "release panel plus sterility, particles, container closure", release: true },
];

export const CHAPTERS = [
  {
    id: "identity", q: "Is it the right molecule?",
    plain: "Before any other number means anything, QC proves the vial contains the intended antibody and not a different product made on the same line. Identity tests compare the sample to a reference standard: the same fingerprint means the same molecule.",
    patient: "A mix-up between two products in a multi-product plant is one of the most serious errors a manufacturer can make.",
    assays: [
      { id: "am-peptide-map", says: "Cuts the protein into peptides and reads them by mass spectrometry. The pattern is a fingerprint of the amino-acid sequence." },
      { id: "am-intact-mass", says: "Weighs the whole antibody to within a few daltons and confirms the expected glycoforms." },
      { id: "am-cief", says: "Its charge profile is distinctive enough to serve as a routine identity test on every lot." },
    ],
    links: "Peptide mapping is also the tool that finds the oxidation and deamidation sites in chapter 4.",
  },
  {
    id: "quantity", q: "How much is there, and is the solution right?",
    plain: "Protein concentration is measured by UV absorbance at 280 nm, where tryptophan and tyrosine absorb light. It sets the dose a patient receives and is the denominator of almost every other result. Alongside it, simple compendial tests confirm the solution itself: colour, clarity, pH and osmolality.",
    patient: "A concentration error is a dosing error, and a wrong pH or osmolality makes an injection painful.",
    assays: [
      { id: "am-a280", says: "Absorbance at 280 nm divided by the extinction coefficient gives mg/mL. Fast, precise, done on every lot." },
      { id: "am-general", says: "Colour, clarity, pH and osmolality: quick checks that the formulation is what it should be." },
    ],
    links: "Every later result expressed per milligram (HCP in ppm, DNA in pg/mg, endotoxin in EU/mg) divides by this number.",
  },
  {
    id: "size", q: "Is it intact, and in one piece?",
    plain: "An antibody can stick to itself (aggregates) or break apart (fragments). Both are tracked closely: aggregates are linked to immune reactions, and fragments have lost function. Different methods see different size ranges, so several are needed to cover them all.",
    patient: "Aggregates are among the main suspected causes of anti-drug antibodies.",
    assays: [
      { id: "am-sec", says: "Separates by size in a column. Reports % monomer and % aggregate on every lot." },
      { id: "am-ce-sds", says: "Denatures the protein and separates chains by size, finding fragments and clips SEC cannot resolve." },
      { id: "am-sec-mals", says: "Adds light scattering to SEC so each peak's mass is measured, not assumed." },
      { id: "am-dls", says: "Senses larger, submicron aggregates quickly; useful for formulation screening." },
      { id: "am-auc", says: "Spins the sample with no column at all, the independent check that SEC is telling the truth." },
      { id: "am-mfi", says: "Photographs and counts subvisible particles, about 2 to 100 µm, far too large for SEC to see." },
    ],
    links: "SEC and CE-SDS are the core of the stability programme: they are the first to move when the product degrades.",
    ruler: true,
  },
  {
    id: "modification", q: "Has it been chemically changed?",
    plain: "Even an intact antibody changes chemically: asparagines deamidate, methionines oxidise, the C-terminal lysine is clipped, and the sugars on the Fc vary. Some of these changes are harmless; others reduce binding or shorten half-life. Each family has its own method.",
    patient: "Fc glycan changes alter how strongly the antibody recruits immune cells, which for some products is the mechanism of action.",
    assays: [
      { id: "am-iex", says: "Cation exchange separates acidic and basic variants by surface charge." },
      { id: "am-cief", says: "Focuses the same variants by isoelectric point with high resolution." },
      { id: "am-peptide-map", says: "Locates each modification to a single residue and measures its level." },
      { id: "am-glycan", says: "Releases and profiles the N-glycans: fucosylation, galactosylation, high mannose, sialylation." },
      { id: "am-mam", says: "The modern QC version of peptide mapping: many modifications measured site by site in one run." },
      { id: "am-hic", says: "Separates the folded antibody by surface hydrophobicity; oxidised and isomerised forms often appear as side peaks." },
      { id: "am-rp", says: "Denatures and reduces the antibody, then separates the chains; with MS it names each variant by mass." },
    ],
    links: "Charge-variant methods report the sum of many modifications; peptide mapping tells you which ones they are.",
  },
  {
    id: "function", q: "Does it still work?",
    plain: "Potency measures biological activity relative to a reference standard. It is the attribute closest to clinical effect, so release always includes a potency assay that reflects the mechanism of action.",
    patient: "A lot that is pure but inactive does nothing for the patient.",
    assays: [
      { id: "am-cell-bioassay", says: "Living cells respond to the antibody; the shift against the reference curve gives relative potency." },
      { id: "am-elisa", says: "Measures binding to the target. Faster and more precise, but it shows binding, not function." },
      { id: "am-spr", says: "Measures on and off rates of binding to the target and to Fc receptors such as FcRn." },
      { id: "am-octet", says: "Same kinetic idea as SPR on a higher-throughput dip-and-read platform." },
    ],
    links: "When a modification from chapter 4 sits in the binding site, potency is where its effect shows up.",
  },
  {
    id: "structure", q: "Is it folded correctly?",
    plain: "The sequence can be perfect while the three-dimensional shape is not. Higher-order structure methods compare the fold with the reference standard. They are characterisation and comparability tools rather than routine release tests.",
    patient: "A misfolded protein can lose activity and is more likely to aggregate.",
    assays: [
      { id: "am-cd", says: "Reports secondary structure; the antibody's β-sheet fold gives a characteristic spectrum." },
      { id: "am-dsc", says: "Heats the protein and records the temperature at which each domain unfolds." },
    ],
    links: "A drop in DSC melting temperature after a process change is an early warning of future aggregation (chapter 3).",
  },
  {
    id: "safety", q: "Is it clean and safe?",
    plain: "Some impurities come from the process rather than the molecule: host-cell proteins and DNA from the CHO cells, Protein A leached from the capture resin, bacterial endotoxin and microbes. Purification removes them; these assays prove it did.",
    patient: "Endotoxin causes fever at very low levels, and some host-cell proteins can trigger immune responses or degrade the formulation.",
    assays: [
      { id: "am-hcp-elisa", says: "Measures total host-cell protein, reported in ng per mg product (ppm)." },
      { id: "am-hcp-ms", says: "Names the individual host-cell proteins that survive purification." },
      { id: "am-qpcr", says: "Amplifies CHO DNA to measure picogram residues." },
      { id: "am-pra-elisa", says: "Measures Protein A that leached off the capture column." },
      { id: "am-endotoxin", says: "Uses a horseshoe crab clotting cascade to detect bacterial endotoxin." },
      { id: "am-bioburden", says: "Counts living microbes before the final sterile filtration; sterility is tested on the filled product." },
      { id: "am-myco", says: "Tests every unprocessed harvest for mycoplasma and adventitious viruses." },
    ],
    links: "These levels fall step by step through the purification train you saw at the start; viral clearance validation is covered in the Viral Clearance section.",
  },
  {
    id: "product", q: "Is the filled vial fit to inject?",
    plain: "Drug product adds risks the bulk never had: particles from the container, a stopper that might leak, a surfactant that slowly degrades, and the need for sterility in every single unit. These tests run on the filled product, and several of them on every unit.",
    patient: "A patient sees only the vial. Particles, leaks and sterility failures are the defects most likely to reach them.",
    assays: [
      { id: "am-visual", says: "Every filled unit is inspected for visible particles and container defects." },
      { id: "am-lo", says: "The compendial count of subvisible particles at 10 and 25 µm." },
      { id: "am-cci", says: "Proves vial, stopper and seal keep microbes out for the whole shelf life." },
      { id: "am-ps80", says: "Measures the surfactant that protects the antibody at interfaces, and tracks its breakdown." },
    ],
    links: "Particle counts here and aggregates in chapter 3 are two ends of the same size range; polysorbate loss often traces back to host-cell lipases from chapter 7.",
  },
  {
    id: "decision", q: "Can this lot be released?",
    plain: "Each result is compared with the specification, the list of tests and acceptance criteria approved by the regulator. QC compiles them into a certificate of analysis, and QA decides whether the lot can be released. The same stability-indicating tests are then repeated over the shelf life to show the product stays within specification.",
    patient: "The specification is the promise the manufacturer makes about every vial.",
    assays: [],
    next: [
      { page: "strategy", label: "See a typical drug substance specification" },
      { page: "specs", label: "Learn how acceptance criteria are set" },
      { page: "validation", label: "See how each method is proven fit for use" },
    ],
  },
];

// a method's home chapter (first chapter that lists it)
export const CHAPTER_OF = {};
CHAPTERS.forEach((c, i) => c.assays.forEach(a => { if (!(a.id in CHAPTER_OF)) CHAPTER_OF[a.id] = { id: c.id, n: i + 1, q: c.q }; }));

// size ranges each technique can see (log scale, metres)
export const SIZE_RANGES = [
  { n: "SEC / SEC-MALS", lo: 3e-9, hi: 8e-8, note: "monomer to small soluble aggregates" },
  { n: "SV-AUC", lo: 3e-9, hi: 1e-7, note: "same range, no column" },
  { n: "DLS", lo: 1e-9, hi: 1e-6, note: "submicron aggregates" },
  { n: "Flow imaging / LO", lo: 2e-6, hi: 1e-4, note: "subvisible particles" },
  { n: "Visual inspection", lo: 1e-4, hi: 1e-3, note: "visible particles" },
];
