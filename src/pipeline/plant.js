/* The production line: what is physically in hand at each Pipeline stage,
   who does the work and with what. Figures are typical orders of magnitude
   for a CHO-expressed monoclonal antibody, not values from one programme.
   Keys match PIPELINE ids in cmc-data.js. */

export const PHASES = [
  { id: "p1", name: "Build the cell line", range: [1, 4], color: "var(--chain-h)" },
  { id: "p2", name: "Develop the process and product", range: [5, 8], color: "var(--chain-l)" },
  { id: "p3", name: "Transfer and make clinical supply", range: [9, 10], color: "var(--bridge)" },
  { id: "p4", name: "Characterise and validate", range: [11, 13], color: "var(--ok)" },
  { id: "p5", name: "File and maintain", range: [14, 16], color: "var(--glycan)" },
];
export const phaseOf = (n) => PHASES.find(p => n >= p.range[0] && n <= p.range[1]) || PHASES[0];

export const PLANT = {
  s01: {
    inHand: { big: "1", unit: "DNA construct", note: "A sequence-verified expression vector: the genetic raw material of every future batch." },
    people: [
      { role: "Molecular biologist", does: "Designs the vector, orders gene synthesis, clones and sequence-verifies the construct." },
      { role: "Protein engineer", does: "Screens the sequence for liabilities before money is spent on cell lines." },
      { role: "CMC lead", does: "Starts the target product profile that every later decision refers back to." },
    ],
    equipment: ["Gene synthesis (usually outsourced)", "Thermocycler and gel electrophoresis", "Sanger or NGS sequencing", "In-silico developability tools"],
  },
  s02: {
    inHand: { big: "10⁷", unit: "transfected cells", note: "Stable pools: millions of cells that survived selection, each with the gene integrated somewhere different." },
    people: [
      { role: "Cell line development scientist", does: "Runs transfection and selection, and decides which pools go to cloning." },
      { role: "Research associate", does: "Passages cultures daily, counts cells and tracks recovery after selection." },
    ],
    equipment: ["Electroporator", "Shaking incubators and shake flasks", "Automated cell counter", "Biosafety cabinet"],
  },
  s03: {
    inHand: { big: "1", unit: "cell, then a clone", note: "One cell per well, imaged on day zero, grown into the clone that will make every batch." },
    people: [
      { role: "Cell line development scientist", does: "Clones, screens thousands of candidates down to a lead and backups." },
      { role: "Automation specialist", does: "Runs single-cell dispensing and plate imaging that document clonality." },
      { role: "Analytical scientist", does: "Profiles product quality of top clones, not only titre." },
    ],
    equipment: ["Single-cell dispenser or FACS", "Plate imager", "Micro-bioreactor system", "Protein A HPLC for titre"],
  },
  s04: {
    inHand: { big: "~200", unit: "vials per bank", note: "Master and working cell banks frozen in vapour-phase liquid nitrogen, stored at two sites." },
    people: [
      { role: "Cell banking specialist", does: "Manufactures banks under GMP and manages the inventory." },
      { role: "Virologist (often a contract lab)", does: "Tests banks for adventitious agents, retroviruses and identity." },
      { role: "QA", does: "Reviews testing and releases the bank for use." },
    ],
    equipment: ["Controlled-rate freezer", "Vapour-phase LN₂ storage with monitoring", "Cryovials", "Biosafety cabinet"],
  },
  s05: {
    inHand: { big: "2,000", unit: "litres of culture", note: "A two-week fed-batch run producing several grams of antibody per litre." },
    people: [
      { role: "Upstream process scientist", does: "Develops feeds, set points and the seed train; defines CPPs." },
      { role: "Bioreactor operator", does: "Runs vessels, takes samples, records parameters." },
      { role: "Process analytics specialist", does: "Builds in-line models (for example Raman) for real-time monitoring." },
    ],
    equipment: ["Bioreactors from 2 L to 2,000 L", "pH, DO and temperature probes", "Metabolite and gas analysers", "Raman probe"],
  },
  s06: {
    inHand: { big: "~3–5", unit: "kg of antibody", note: "Purified drug substance, concentrated into a few tens of litres and frozen." },
    people: [
      { role: "Downstream process scientist", does: "Designs the purification train and sets loading and pooling." },
      { role: "Purification engineer", does: "Sizes columns and filters, scales the process up." },
      { role: "Viral clearance specialist", does: "Plans spiking studies with a contract virology lab." },
    ],
    equipment: ["Centrifuge and depth filters", "Chromatography skids and columns", "Virus filters", "Tangential-flow filtration system"],
  },
  s07: {
    inHand: { big: "20+", unit: "analytical methods", note: "Microlitre samples answering identity, purity, potency and safety questions." },
    people: [
      { role: "Analytical development scientist", does: "Develops and qualifies methods, characterises the molecule." },
      { role: "Mass spectrometrist", does: "Peptide maps, intact mass, site-specific modifications." },
      { role: "Bioassay scientist", does: "Builds the potency assay that shows the product still works." },
    ],
    equipment: ["UHPLC", "LC-MS", "Capillary electrophoresis", "Plate readers and SPR"],
  },
  s08: {
    inHand: { big: "1", unit: "formulation", note: "A composition and presentation chosen to keep the antibody stable and injectable." },
    people: [
      { role: "Formulation scientist", does: "Screens buffers and excipients, runs stress and stability studies." },
      { role: "Drug product engineer", does: "Develops fill-finish and container closure." },
      { role: "Device engineer", does: "Makes the syringe or autoinjector work with the formulation." },
    ],
    equipment: ["Viscometer and DLS", "Stress chambers", "Aseptic filling isolator", "Visual inspection"],
  },
  s09: {
    inHand: { big: "2", unit: "sites", note: "A sending and a receiving site, joined by a transfer package and a comparability plan." },
    people: [
      { role: "MSAT engineer", does: "Owns the process at the receiving site and closes equipment gaps." },
      { role: "Tech transfer lead", does: "Runs the transfer plan, risk assessment and timelines." },
      { role: "QC method transfer analyst", does: "Shows the receiving lab gets equivalent results." },
    ],
    equipment: ["Transfer protocols and gap assessments", "Engineering runs at scale", "Shared scale-down models"],
  },
  s10: {
    inHand: { big: "Lots", unit: "of clinical supply", note: "GMP batches released for phase 1 to 3 studies, each with a full batch record." },
    people: [
      { role: "GMP manufacturing operators", does: "Execute the batch record in the clean suite." },
      { role: "QA disposition", does: "Reviews records and deviations, releases each lot." },
      { role: "Clinical supply manager", does: "Plans lots, labelling and distribution to trial sites." },
    ],
    equipment: ["GMP clean suites", "Single-use systems", "Electronic batch records", "Clinical labelling and packaging"],
  },
  s11: {
    inHand: { big: "Dozens", unit: "of small-scale runs", note: "Designed experiments in qualified scale-down models that find which parameters matter." },
    people: [
      { role: "Process characterisation scientist", does: "Designs and runs the DoE studies." },
      { role: "Statistician", does: "Builds the models and defines proven acceptable ranges." },
    ],
    equipment: ["Scale-down bioreactor arrays", "Bench chromatography systems", "DoE and statistics software"],
  },
  s12: {
    inHand: { big: "3", unit: "PPQ lots, typically", note: "Consecutive commercial-scale batches with enhanced sampling against predefined criteria." },
    people: [
      { role: "Validation engineer", does: "Writes and executes the PPQ protocol and report." },
      { role: "MSAT", does: "Monitors the runs and investigates anything unexpected." },
      { role: "QA validation", does: "Approves the protocol, results and conclusion." },
    ],
    equipment: ["Commercial-scale train", "Enhanced sampling plans", "Validated analytical methods"],
  },
  s13: {
    inHand: { big: "Campaigns", unit: "of commercial lots", note: "Routine GMP production, released lot by lot and shipped through the cold chain." },
    people: [
      { role: "Manufacturing supervisor and operators", does: "Run the campaign schedule." },
      { role: "QC analysts", does: "Test every lot against the specification." },
      { role: "QA or Qualified Person", does: "Certifies each lot for release." },
    ],
    equipment: ["Production train", "MES and LIMS", "Cold-chain warehouse and shippers"],
  },
  s14: {
    inHand: { big: "36", unit: "months of data", note: "Real-time studies at the storage condition, plus accelerated and stress conditions." },
    people: [
      { role: "Stability coordinator", does: "Schedules pulls across chambers and conditions." },
      { role: "QC analysts", does: "Test stability samples with stability-indicating methods." },
      { role: "Statistician", does: "Estimates shelf life from the trends." },
    ],
    equipment: ["Stability chambers at 5 °C, 25 °C/60% RH, 40 °C/75% RH", "Photostability cabinet", "LIMS"],
  },
  s15: {
    inHand: { big: "1", unit: "dossier", note: "Module 3 and its summary, assembled from every stage and submitted electronically." },
    people: [
      { role: "Regulatory CMC writer", does: "Authors Module 3 and the Quality Overall Summary." },
      { role: "CMC lead", does: "Owns the quality story and answers agency questions." },
      { role: "Publishing specialist", does: "Builds and validates the eCTD sequence." },
    ],
    equipment: ["Document management system", "eCTD publishing tools", "Regulatory information system"],
  },
  s16: {
    inHand: { big: "Years", unit: "of lifecycle", note: "Changes, continued verification and annual reviews for as long as the product is sold." },
    people: [
      { role: "Lifecycle regulatory CMC", does: "Files post-approval changes in the right category." },
      { role: "Change control owner", does: "Assesses impact of each change on quality." },
      { role: "CPV engineer", does: "Trends parameters and attributes across lots." },
    ],
    equipment: ["Change control system", "CPV dashboards", "Product quality review"],
  },
};

// Pipeline stage id to the Science journey stage that explains why it matters
export const TO_JOURNEY = {
  s01: "candidate", s02: "cellline", s03: "cellline", s04: "cellline", s05: "upstream", s06: "downstream",
  s07: "analytical", s08: "formulation", s09: "transfer", s10: "transfer", s11: "qbd", s12: "transfer",
  s13: "specs", s14: "stability", s15: "ctd", s16: "specs",
};
