/* ============================================================
   The Science journey: the development stages in the order the
   work happens, each mapped to where its evidence ends up in the CTD.
   Chronology and dossier structure are related but not the same: the
   dossier is assembled from evidence generated across all stages.
   ============================================================ */

/* ICH M4Q(R1) Module 3 (and 2.3) sections used in the evidence map. */
export const CTD = [
  { id: "2.3", title: "Quality Overall Summary", group: "Module 2" },
  { id: "3.2.S.1", title: "General information", group: "Drug substance" },
  { id: "3.2.S.2", title: "Manufacture", group: "Drug substance" },
  { id: "3.2.S.3", title: "Characterisation", group: "Drug substance" },
  { id: "3.2.S.4", title: "Control of drug substance", group: "Drug substance" },
  { id: "3.2.S.5", title: "Reference standards or materials", group: "Drug substance" },
  { id: "3.2.S.6", title: "Container closure system", group: "Drug substance" },
  { id: "3.2.S.7", title: "Stability", group: "Drug substance" },
  { id: "3.2.P.1", title: "Description and composition", group: "Drug product" },
  { id: "3.2.P.2", title: "Pharmaceutical development", group: "Drug product" },
  { id: "3.2.P.3", title: "Manufacture", group: "Drug product" },
  { id: "3.2.P.4", title: "Control of excipients", group: "Drug product" },
  { id: "3.2.P.5", title: "Control of drug product", group: "Drug product" },
  { id: "3.2.P.6", title: "Reference standards or materials", group: "Drug product" },
  { id: "3.2.P.7", title: "Container closure system", group: "Drug product" },
  { id: "3.2.P.8", title: "Stability", group: "Drug product" },
  { id: "3.2.A", title: "Appendices (facilities, adventitious agents, novel excipients)", group: "Appendices" },
];

/* Evidence status scale used throughout (educational, fictional programme). */
export const EVIDENCE = {
  none: { label: "Not started" },
  planned: { label: "Planned" },
  dev: { label: "Development evidence" },
  qual: { label: "Needs qualification or validation" },
  ready: { label: "Ready for scientific review" },
};

export const GROUPS = [
  { id: "plan", title: "Define the product" },
  { id: "make", title: "Make the molecule" },
  { id: "measure", title: "Measure the molecule" },
  { id: "dp", title: "Make the medicine" },
  { id: "control", title: "Design the controls" },
  { id: "scale", title: "Scale up and validate" },
  { id: "file", title: "Release and file" },
];

/* Each stage: what it is for, what flows in and out, and where its
   evidence lands. `built` marks stages rebuilt in the new architecture;
   other stages link to existing modules until their phase is delivered. */
export const STAGES = [
  {
    id: "proposal", group: "plan", title: "Candidate selection and product definition", short: "Proposal", built: true, phase: 1,
    purpose: "Choose a molecule that can be both effective and manufacturable, and state what the product must be before deciding how to make or test it.",
    inputs: ["Clinical hypothesis and target", "Lead candidates and developability data", "Platform capabilities"],
    activities: ["Screen candidates for developability and sequence liabilities", "Nominate one candidate", "Define therapeutic intent and target product concept", "Choose route, presentation and strength"],
    outputs: ["Nominated candidate and developability report", "Development proposal and target product concept", "Draft CMC plan"],
    decisions: ["Which candidate goes forward, and should a liability be engineered out or controlled?", "Is the product concept technically feasible on the platform?"],
    risks: ["Liabilities found only after the cell line is made", "A presentation goal (150 mg/mL) the molecule cannot meet"],
    feeds: ["qtpp", "cellline"], ctd: [{ s: "3.2.S.1", status: "dev" }, { s: "3.2.P.1", status: "dev" }, { s: "2.3", status: "none" }],
    links: [{ view: "pipeline", focus: "s01", label: "Pipeline: gene construction" }],
  },
  {
    id: "qtpp", group: "plan", title: "QTPP, initial CQAs and early risk assessment", short: "QTPP & CQAs", built: true, phase: 1,
    purpose: "Translate the product concept into quality targets and decide which quality attributes need evidence first.",
    inputs: ["Development proposal", "Molecule sequence and structure", "Platform and literature knowledge"],
    activities: ["Write the QTPP", "List candidate quality attributes", "Score impact and uncertainty", "Set development priorities"],
    outputs: ["QTPP", "Provisional CQA list", "Risk assessment and study plan"],
    decisions: ["Which attributes are provisional CQAs?", "Which studies come first?"],
    risks: ["Treating every measured attribute as a CQA", "Locking criticality before evidence exists"],
    feeds: ["cellline", "upstream", "analytical", "formulation", "qbd"], ctd: [{ s: "3.2.P.2", status: "dev" }, { s: "3.2.S.3", status: "dev" }],
  },
  {
    id: "cellline", group: "make", title: "Cell line construction and cell substrate", short: "Cell line", built: true, phase: 2,
    purpose: "Create a stable, productive, well-characterised source of the molecule.",
    inputs: ["Nominated sequence", "Host cell line", "Expression vector"], activities: ["Transfection and selection", "Clone screening and clonality", "MCB and WCB manufacture and testing"],
    outputs: ["Master and working cell banks", "Cell substrate characterisation"], decisions: ["Which clone becomes the production cell line?"],
    risks: ["Clonal instability", "Adventitious agent contamination of the bank"], feeds: ["upstream", "downstream"], ctd: [{ s: "3.2.S.2", status: "dev" }, { s: "3.2.A", status: "dev" }],
    links: [{ view: "pipeline", label: "Pipeline: cell line stages" }],
  },
  {
    id: "upstream", group: "make", title: "Upstream process development", short: "Upstream", built: true, phase: 2,
    purpose: "Grow the cells and produce the antibody at scale with consistent quality.",
    inputs: ["Working cell bank", "Media and feeds", "Quality targets"], activities: ["Seed train and production bioreactor development", "Feeding strategy", "Scale-down model, process characterisation"],
    outputs: ["Harvest with a known quality profile", "Proposed CPPs and in-process controls"], decisions: ["Which operating ranges protect glycosylation, charge and aggregation?"],
    risks: ["Culture conditions shift glycan or charge profiles", "Scale-up changes gas transfer"], feeds: ["downstream", "analytical"], ctd: [{ s: "3.2.S.2", status: "dev" }],
    links: [{ view: "pipeline", label: "Pipeline: upstream stage" }],
  },
  {
    id: "downstream", group: "make", title: "Downstream processing and viral safety", short: "Downstream", built: true, phase: 3,
    purpose: "Purify the antibody to drug substance and demonstrate viral safety.",
    inputs: ["Clarified harvest", "Impurity burden", "Platform purification"], activities: ["Capture, viral inactivation, polishing, virus filtration, UF/DF", "Impurity clearance studies", "Viral clearance validation"],
    outputs: ["Drug substance", "Clearance and recovery data", "Log reduction values"], decisions: ["Which steps and ranges deliver required purity and viral safety?"],
    risks: ["Aggregate formation at low pH", "Insufficient clearance margin"], feeds: ["analytical", "formulation"], ctd: [{ s: "3.2.S.2", status: "dev" }, { s: "3.2.A", status: "qual" }],
    links: [{ view: "tools", focus: "lrv", label: "Viral clearance calculator" }, { view: "batch", label: "Batch Record Simulator" }],
  },
  {
    id: "analytical", group: "measure", title: "Analytical development and characterisation", short: "Analytical", built: true, phase: 4,
    purpose: "Measure every quality attribute that matters, and prove the methods can be trusted.",
    inputs: ["QTPP and provisional CQAs", "Material from every process stage"], activities: ["Method selection and development", "Characterisation", "Qualification and validation", "Release and stability testing"],
    outputs: ["Analytical procedures", "Characterisation package", "Release and stability data"], decisions: ["Which methods control which attributes?", "Is a variant a product-related substance or impurity?"],
    risks: ["A method blind to a real change", "Artefacts mistaken for product changes"], feeds: ["formulation", "stability", "qbd", "specs"], ctd: [{ s: "3.2.S.3", status: "dev" }, { s: "3.2.S.4", status: "qual" }, { s: "3.2.S.5", status: "dev" }, { s: "3.2.P.5", status: "qual" }],
    links: [{ view: "analytical", label: "Analytical series (13 chapters)" }, { view: "compendial", label: "Compendial reference" }],
  },
  {
    id: "formulation", group: "dp", title: "Formulation, excipients and drug product", short: "Formulation", built: true, phase: 5,
    purpose: "Design a formulation and presentation that keep the antibody stable and injectable.",
    inputs: ["Drug substance properties", "Target presentation", "Degradation knowledge"], activities: ["Preformulation", "Excipient and pH screening", "High-concentration development", "Fill-finish and container closure"],
    outputs: ["Formulation composition", "Drug product process", "Container closure selection"], decisions: ["Which formulation balances stability, viscosity and manufacturability?"],
    risks: ["Viscosity too high for the syringe", "Polysorbate degradation"], feeds: ["stability", "specs"], ctd: [{ s: "3.2.P.1", status: "dev" }, { s: "3.2.P.2", status: "dev" }, { s: "3.2.P.3", status: "planned" }, { s: "3.2.P.4", status: "dev" }, { s: "3.2.P.7", status: "dev" }],
    links: [{ view: "excipient", label: "Excipient compatibility module" }],
  },
  {
    id: "stability", group: "dp", title: "Stability and shelf-life strategy", short: "Stability", built: true, phase: 5,
    purpose: "Show how the product changes over time and justify storage conditions and shelf life.",
    inputs: ["Formulation", "Stability-indicating methods"], activities: ["Forced degradation", "Long-term and accelerated studies", "Trend analysis"],
    outputs: ["Shelf life and storage conditions", "Stability commitments"], decisions: ["What shelf life does the data support?"],
    risks: ["Extrapolating beyond real-time data", "An unexpected degradation pathway late in development"], feeds: ["specs", "qbd"], ctd: [{ s: "3.2.S.7", status: "dev" }, { s: "3.2.P.8", status: "dev" }],
    links: [{ view: "tools", focus: "shelf", label: "Shelf-life calculator" }],
  },
  {
    id: "qbd", group: "control", title: "QbD, risk management and control strategy", short: "QbD & control", built: true, phase: 6,
    purpose: "Join process, material and analytical knowledge into a control strategy that protects every CQA.",
    inputs: ["Risk assessments from every stage", "Process characterisation", "Analytical data"], activities: ["Criticality reassessment", "CPP and CMA identification", "DoE and proven acceptable ranges", "Control strategy design"],
    outputs: ["Integrated control strategy", "Justified CPPs and ranges"], decisions: ["How is each CQA controlled: by design, by process control or by testing?"],
    risks: ["Calling every monitored parameter a CPP", "Labelling explored ranges as a design space"], feeds: ["transfer", "specs"], ctd: [{ s: "3.2.S.2", status: "dev" }, { s: "3.2.P.2", status: "dev" }],
  },
  {
    id: "transfer", group: "scale", title: "Scale-up, technology transfer and process validation", short: "Transfer & PPQ", built: true, phase: 7,
    purpose: "Move the process to GMP sites and commercial scale, then prove it runs consistently there.",
    inputs: ["Characterised process and control strategy", "Validated or qualified methods", "Scale-down models"], activities: ["Technology transfer to clinical and commercial sites", "GMP manufacture of clinical lots", "Comparability after each process change", "Process performance qualification"],
    outputs: ["Clinical and PPQ lots", "Comparability reports", "PPQ report"], decisions: ["Is product from the new site or scale comparable?", "Is the commercial process ready to validate?"],
    risks: ["Equipment differences between sites change product quality", "Know-how lost in the hand-over"], feeds: ["specs", "ctd"], ctd: [{ s: "3.2.S.2", status: "planned" }, { s: "3.2.P.3", status: "planned" }, { s: "3.2.A", status: "planned" }],
    links: [{ view: "batch", label: "Batch Record Simulator" }, { view: "analytical", focus: "comparability", label: "Analytical: comparability" }],
  },
  {
    id: "specs", group: "file", title: "Specifications, release and lifecycle control", short: "Specifications", built: true, phase: 6,
    purpose: "Set acceptance criteria, release each lot and keep control after approval.",
    inputs: ["Control strategy", "Batch and stability data", "Validated methods"], activities: ["Specification justification", "Batch release and CoA", "Continued process verification"],
    outputs: ["DS and DP specifications", "Certificates of analysis"], decisions: ["Which tests are on release, and with what limits?"],
    risks: ["Limits set from too few lots", "Confusing the CoA with the control strategy"], feeds: ["ctd"], ctd: [{ s: "3.2.S.4", status: "planned" }, { s: "3.2.P.5", status: "planned" }],
    links: [{ view: "analytical", focus: "specs", label: "Analytical: setting specifications" }],
  },
  {
    id: "ctd", group: "file", title: "CTD evidence integration and submission readiness", short: "CTD", built: true, phase: 6,
    purpose: "Assemble the evidence from every stage into a dossier a reviewer can follow.",
    inputs: ["Evidence from all stages"], activities: ["Map evidence to Module 3", "Write the Quality Overall Summary", "Check consistency and gaps"],
    outputs: ["Module 3 and Module 2.3"], decisions: ["Is the evidence sufficient and consistent for submission?"],
    risks: ["The same number reported differently in two sections", "Gaps found by the reviewer, not the team"], feeds: [], ctd: [{ s: "2.3", status: "none" }],
  },
];

export const STAGE = Object.fromEntries(STAGES.map((s, i) => [s.id, { ...s, n: i + 1 }]));

/* Milestones of a typical antibody programme, used as the time axis of the
   journey timeline. Durations vary widely; the order is what matters. */
export const MILESTONES = [
  { id: "disc", label: "Discovery" },
  { id: "preind", label: "Pre-IND" },
  { id: "p1", label: "Phase 1" },
  { id: "p2", label: "Phase 2" },
  { id: "p3", label: "Phase 3" },
  { id: "file", label: "Filing" },
  { id: "post", label: "Post-approval" },
];
// gates drawn between milestone columns: after column index
export const GATES = [{ after: 1, label: "IND / IMPD" }, { after: 5, label: "Approval" }];

/* For each stage: when the work is most active (first and last milestone
   column) and the three things to remember. */
export const GLANCE = {
  proposal: { span: [0, 1], keys: ["A candidate is chosen for manufacturability as well as biology: liabilities are found before the cell line is made.", "The product is defined before the process: route, dose, presentation and storage goals.", "The main uncertainties are named early so the first studies target them."] },
  qtpp: { span: [1, 4], keys: ["The QTPP is a set of product targets, not a specification.", "Quality attributes are ranked by impact and uncertainty; criticality is revisited as data arrive.", "The ranking decides which studies come first."] },
  cellline: { span: [1, 1], keys: ["The host, vector and clone fix much of the product's quality profile for life.", "Clonality and cell line stability must be demonstrated.", "Cell banks are tested once, thoroughly, because every batch starts from them."] },
  upstream: { span: [1, 4], keys: ["Culture conditions move glycosylation, charge variants and aggregation, not only titre.", "Scale-up changes oxygen transfer, CO2 removal and mixing.", "Qualified scale-down models are how CPPs and ranges are found."] },
  downstream: { span: [1, 4], keys: ["Each step has a job: capture, inactivate, polish, remove virus, formulate.", "Purity rises as yield falls; pooling decisions trade one for the other.", "Viral safety rests on prevention, testing and validated clearance together."] },
  analytical: { span: [0, 6], keys: ["Analytics runs alongside every stage, from developability to lifecycle.", "Important attributes are measured by orthogonal methods.", "Methods are developed, qualified, validated and transferred as the programme matures."] },
  formulation: { span: [1, 4], keys: ["The formulation is chosen against every target at once, not the best on one.", "High concentration brings viscosity and aggregation trade-offs.", "Container, closure and device are part of the product."] },
  stability: { span: [1, 6], keys: ["Shelf life comes from real-time data at the storage condition.", "Accelerated and stress studies explain pathways and support methods.", "Stability continues after approval under a commitment."] },
  qbd: { span: [3, 5], keys: ["Risk assessment links every CQA to the parameters and materials that move it.", "DoE and characterisation turn ranges into evidence.", "The control strategy combines design, process control and testing."] },
  transfer: { span: [1, 5], keys: ["Each new site or scale needs a structured transfer and a comparability exercise.", "GMP expectations grow from phase 1 to commercial.", "PPQ proves the commercial process at scale; CPV keeps proving it."] },
  specs: { span: [2, 6], keys: ["Specifications are justified from clinical lots, capability and stability.", "Release needs the batch record, deviations and QC results, not only a CoA.", "Lifecycle control keeps the process in a state of control after approval."] },
  ctd: { span: [1, 6], keys: ["The dossier is organised by subject, not by chronology.", "One study often supplies evidence to several sections.", "Quality content grows from IND to licence and continues as variations."] },
};
