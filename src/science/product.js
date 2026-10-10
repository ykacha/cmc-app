/* ============================================================
   CMX-417: the fictional reference product that runs through the
   Science journey. One source of truth so every page stays consistent.

   Data provenance is explicit. Every value carries one of:
     "assumption"   a simplified planning assumption made for teaching
     "hypothetical" invented educational data, not a measurement
     "representative" a typical range for IgG1 mAbs from general knowledge
     "expectation"  a regulatory or compendial expectation (cited)
   Nothing here is a real product, a real measurement or a submission.
   ============================================================ */

export const PROVENANCE = {
  assumption: { label: "Assumption", note: "A simplified planning assumption for this learning scenario." },
  hypothetical: { label: "Hypothetical data", note: "Invented educational data. Not a measurement." },
  representative: { label: "Representative range", note: "Typical for IgG1 monoclonal antibodies; product-specific studies decide." },
  expectation: { label: "Regulatory expectation", note: "Drawn from the cited guidance or pharmacopoeia." },
};

export const PRODUCT = {
  code: "CMX-417",
  fictional: true,
  modality: "Humanised IgG1κ monoclonal antibody",
  target: "IFX, a fictional soluble pro-inflammatory cytokine",
  mechanism: "Binds soluble IFX and blocks it from engaging its receptor (neutralisation). Fc effector function is not part of the intended mechanism.",
  indication: "Moderate-to-severe chronic inflammatory disease in adults (fictional programme)",
  route: "Subcutaneous injection, self-administered",
  presentation: "1.0 mL prefilled glass syringe with staked needle; autoinjector planned for later phases",
  strength: "150 mg/mL",
  dosing: "150 mg every 4 weeks (planning assumption)",
  storage: "2–8 °C; target shelf life of at least 24 months",
  markets: "United States (BLA) and European Union (MAA)",
  platform: "CHO host cell line, fed-batch culture, platform three-column purification",
  stage: "Development proposal: candidate nominated, pre-IND",
};

/* The development proposal, written as a CMC team would draft it. */
export const PROPOSAL = [
  { id: "intent", title: "Therapeutic intent", body: "Neutralise IFX to reduce chronic inflammation, with monthly subcutaneous dosing that patients can give themselves at home.", prov: "assumption" },
  { id: "concept", title: "Target product concept", body: "A ready-to-use liquid in a prefilled syringe, stored refrigerated, with a short room-temperature allowance for patient handling.", prov: "assumption" },
  { id: "molecule", title: "Molecule", body: "Humanised IgG1κ with a wild-type Fc. Developability screening flagged one Asn-Gly motif in heavy-chain CDR2 and no free cysteines.", prov: "hypothetical" },
  { id: "route", title: "Route and presentation", body: "Subcutaneous, 1.0 mL per injection. Delivering 150 mg in 1 mL requires a 150 mg/mL formulation with acceptable injection force.", prov: "assumption" },
  { id: "patient", title: "Patient use", body: "Self-injection by adults, some with reduced hand dexterity. Injection comfort, small volume and a device-ready syringe matter.", prov: "assumption" },
  { id: "storage", title: "Storage and stability goals", body: "At least 24 months at 2–8 °C; up to 14 days at no more than 25 °C after dispensing (target, to be supported by data).", prov: "assumption" },
  { id: "mfg", title: "Manufacturing feasibility", body: "Fits the CHO fed-batch and platform purification. Main open question is whether high-concentration UF/DF reaches 150 mg/mL with acceptable viscosity and aggregation.", prov: "assumption" },
  { id: "analytical", title: "Analytical feasibility", body: "Platform IgG1 methods apply for size, charge, glycans and impurities. A new cell-based neutralisation assay is needed for potency, and high-concentration samples need method adaptation.", prov: "assumption" },
  { id: "markets", title: "Target markets", body: "US and EU first. ICH quality guidelines apply to both, but regional requirements (for example, EU GMP Annex 1 for the sterile drug product) must be planned separately.", prov: "assumption" },
];

export const UNCERTAINTIES = [
  { id: "u1", risk: "CDR deamidation", why: "The HC CDR2 Asn-Gly motif could deamidate and reduce binding over shelf life.", resolve: "Forced deamidation (high pH, 40 °C), enrichment of deamidated variant, binding and potency of the enriched fraction." },
  { id: "u2", risk: "Viscosity and aggregation at 150 mg/mL", why: "High-concentration IgG1 solutions can become viscous and aggregate, limiting syringe injection.", resolve: "Early concentration-dependent viscosity, SEC and particle screening across pH and excipient options." },
  { id: "u3", risk: "Particles in a glass prefilled syringe", why: "Silicone oil and protein particles both appear in syringes and are hard to tell apart by light obscuration.", resolve: "Flow imaging and light obscuration on syringe fills, agitation and shipping stress studies." },
  { id: "u4", risk: "Potency assay", why: "No validated neutralisation assay exists yet; a weak assay cannot detect a real potency loss.", resolve: "Develop a reporter-cell neutralisation assay and show it detects stressed material." },
  { id: "u5", risk: "Polysorbate stability", why: "Residual host-cell lipases can hydrolyse polysorbate over a 24-month shelf life.", resolve: "HCP identification by LC-MS on early purified material; polysorbate degradation on stability." },
];

export const DELIVERABLES = [
  { id: "d1", item: "Draft QTPP", owner: "CMC lead with clinical", when: "Now" },
  { id: "d2", item: "Developability assessment report", owner: "Discovery / analytical", when: "Now" },
  { id: "d3", item: "Initial quality attribute risk assessment", owner: "Analytical, process, formulation", when: "Now" },
  { id: "d4", item: "Platform fit assessment (upstream, downstream, analytical)", owner: "Process and analytical development", when: "Now" },
  { id: "d5", item: "Cell line development plan", owner: "Cell line development", when: "Next" },
  { id: "d6", item: "Interim reference standard plan", owner: "Analytical development", when: "Next" },
  { id: "d7", item: "CMC development plan and timeline to first-in-human", owner: "CMC lead", when: "Next" },
  { id: "d8", item: "CMC questions for a pre-IND meeting", owner: "Regulatory CMC", when: "Before IND" },
];

/* QTPP: product-level targets. Specification limits do not belong here;
   they come later, from data. */
export const QTPP = [
  { id: "q-moa", element: "Mechanism and activity", target: "Neutralises IFX with potency comparable to the reference standard", rationale: "Efficacy depends on neutralisation; potency is critical by definition.", attrs: ["potency", "cdr-deam", "agg"] },
  { id: "q-route", element: "Route of administration", target: "Subcutaneous, self-injected", rationale: "Patient preference for home dosing.", attrs: ["visc"] },
  { id: "q-form", element: "Dosage form", target: "Sterile liquid solution, ready to use", rationale: "No reconstitution step for patients.", attrs: ["agg", "particles", "ps"] },
  { id: "q-strength", element: "Strength and volume", target: "150 mg in 1.0 mL", rationale: "Dose delivered in one injection.", attrs: ["conc", "visc", "agg"] },
  { id: "q-cc", element: "Container closure and device", target: "1.0 mL glass prefilled syringe, autoinjector-compatible", rationale: "Self-administration; device in later phases.", attrs: ["particles", "ccit"] },
  { id: "q-shelf", element: "Shelf life and storage", target: "≥ 24 months at 2–8 °C; up to 14 days ≤ 25 °C after dispensing", rationale: "Commercial supply chain and patient handling.", attrs: ["agg", "cdr-deam", "met-ox", "frag", "ps"] },
  { id: "q-pk", element: "Pharmacokinetics", target: "Half-life consistent with monthly dosing", rationale: "Depends on FcRn-mediated recycling.", attrs: ["met-ox", "hm"] },
  { id: "q-safety", element: "Sterility and microbiological safety", target: "Sterile; endotoxin below the dose-based limit", rationale: "Parenteral product.", attrs: ["endo"] },
  { id: "q-immuno", element: "Immunogenicity risk", target: "Minimise product- and process-related contributors", rationale: "Chronic dosing increases exposure.", attrs: ["agg", "particles", "hcp"] },
  { id: "q-comfort", element: "Injection tolerability", target: "Near-physiological pH and near-isotonic", rationale: "Comfort for repeated self-injection.", attrs: ["visc"] },
];

/* Impact and uncertainty scales adapted from the public A-Mab case study
   (CMC Biotech Working Group, 2009). Score = impact x uncertainty.
   Bands are this programme's own planning rule, not a regulatory standard. */
export const IMPACT_SCALE = [
  { v: 2, label: "None expected" }, { v: 4, label: "Low" }, { v: 12, label: "Moderate" }, { v: 16, label: "High" }, { v: 20, label: "Very high" },
];
export const UNCERTAINTY_SCALE = [
  { v: 1, label: "Product-specific data" }, { v: 3, label: "Platform or literature data" }, { v: 5, label: "Limited relevant data" }, { v: 7, label: "No information" },
];
export const BANDS = [
  { min: 60, id: "high", label: "Priority for early studies" },
  { min: 20, id: "mod", label: "Characterise and monitor" },
  { min: 0, id: "low", label: "Low priority; revisit with data" },
];
export const bandOf = (score) => BANDS.find(b => score >= b.min);

/* Candidate quality attributes and their provisional assessment at the
   proposal stage. All scores are hypothetical teaching values. */
export const ATTRIBUTES = [
  { id: "potency", name: "Neutralisation potency", kind: "Biological activity", status: "Critical by definition",
    impact: 20, uncertainty: 3, impactWhy: "Directly determines efficacy.", uncWhy: "Assay not yet developed; no product-specific data.",
    next: "Develop and qualify the reporter-cell neutralisation assay; test stressed samples.", methods: ["am-cell-bioassay", "am-spr"], cqa: "potency" },
  { id: "cdr-deam", name: "CDR Asn deamidation", kind: "Product-related variant", status: "Provisional CQA",
    impact: 20, uncertainty: 5, impactWhy: "The motif sits in a binding loop; deamidation could reduce neutralisation.", uncWhy: "Motif predicted in silico; rate and functional effect unknown.",
    next: "Forced deamidation, peptide mapping of the site, potency of enriched variant.", methods: ["am-peptide-map", "am-cief", "am-cell-bioassay"], cqa: "deam" },
  { id: "agg", name: "Aggregates (HMW)", kind: "Product-related impurity", status: "Provisional CQA",
    impact: 16, uncertainty: 5, impactWhy: "Linked to immunogenicity and loss of active monomer.", uncWhy: "High-concentration behaviour of this molecule not yet studied.",
    next: "Concentration and excipient screening by SEC and SV-AUC; stress studies.", methods: ["am-sec", "am-auc", "am-sec-mals"], cqa: "agg" },
  { id: "particles", name: "Subvisible particles", kind: "Product-related impurity", status: "Provisional CQA",
    impact: 16, uncertainty: 5, impactWhy: "Immunogenicity risk; compendial limits apply to the drug product.", uncWhy: "Syringe and silicone oil interaction untested for this formulation.",
    next: "Flow imaging and light obscuration on prototype syringe fills under agitation.", methods: ["am-lo", "am-mfi"], cqa: "particles" },
  { id: "hcp", name: "Host-cell proteins", kind: "Process-related impurity", status: "Provisional CQA",
    impact: 16, uncertainty: 3, impactWhy: "Immunogenicity; some lipases degrade polysorbate.", uncWhy: "Platform process clears HCP well for other IgG1s.",
    next: "HCP ELISA on early material; LC-MS to identify persistent HCPs.", methods: ["am-hcp-elisa", "am-hcp-ms"], cqa: "hcp" },
  { id: "met-ox", name: "Fc Met oxidation", kind: "Product-related variant", status: "Provisional CQA",
    impact: 12, uncertainty: 3, impactWhy: "Met252/Met428 oxidation can reduce FcRn binding and half-life.", uncWhy: "Well characterised for IgG1 Fc in the literature.",
    next: "Light and peroxide stress; site-specific oxidation by peptide mapping; FcRn binding.", methods: ["am-peptide-map", "am-spr"], cqa: "ox" },
  { id: "frag", name: "Fragments (LMW)", kind: "Product-related impurity", status: "Monitor",
    impact: 12, uncertainty: 3, impactWhy: "Fragments lose bivalent binding and may reduce potency.", uncWhy: "Hinge clipping behaviour typical for IgG1.",
    next: "CE-SDS on stressed and stability samples.", methods: ["am-ce-sds", "am-sec"], cqa: "frag" },
  { id: "hm", name: "High-mannose glycans", kind: "Product-related variant", status: "Monitor",
    impact: 12, uncertainty: 3, impactWhy: "Faster clearance shortens exposure.", uncWhy: "Known effect for IgG1; level depends on culture conditions.",
    next: "Glycan profiling across upstream development runs.", methods: ["am-glycan"], cqa: "glycan" },
  { id: "afuc", name: "Afucosylation", kind: "Product-related variant", status: "Monitor",
    impact: 4, uncertainty: 3, impactWhy: "Raises ADCC, which is not part of this neutralising mechanism.", uncWhy: "Fc effector relevance must still be confirmed by characterisation.",
    next: "Confirm effector functions are not clinically relevant (FcγR binding, ADCC).", methods: ["am-glycan"], cqa: "glycan" },
  { id: "ctlys", name: "C-terminal lysine", kind: "Product-related substance", status: "Monitor",
    impact: 2, uncertainty: 3, impactWhy: "Clipped rapidly in circulation; no expected effect on activity or PK.", uncWhy: "Well established for IgG1.",
    next: "Track as part of basic charge variants.", methods: ["am-cief", "am-iex"], cqa: "charge" },
  { id: "dna", name: "Residual host-cell DNA", kind: "Process-related impurity", status: "Monitor",
    impact: 12, uncertainty: 1, impactWhy: "Theoretical safety risk from continuous cell line DNA.", uncWhy: "Platform clearance demonstrated repeatedly by this team (assumption).",
    next: "Confirm clearance on early lots.", methods: ["am-qpcr"], cqa: "resdna" },
  { id: "endo", name: "Endotoxin and bioburden", kind: "Safety", status: "Critical by definition",
    impact: 20, uncertainty: 1, impactWhy: "Patient safety for a parenteral product.", uncWhy: "Compendial methods and GMP controls apply.",
    next: "Low endotoxin recovery study once the formulation is chosen.", methods: ["am-endotoxin", "am-bioburden"], cqa: "endo" },
  { id: "ccit", name: "Container closure integrity", kind: "Drug product attribute", status: "Critical by definition",
    impact: 20, uncertainty: 3, impactWhy: "A leak breaks sterility without any visible change in the liquid.", uncWhy: "Syringe and plunger system not yet chosen; platform data from other syringes only.",
    next: "Deterministic CCI testing of the chosen syringe at 2–8 °C and after shipping.", methods: ["am-cci"], cqa: "ccit" },
  { id: "conc", name: "Protein concentration", kind: "Content", status: "Critical by definition",
    impact: 16, uncertainty: 3, impactWhy: "Determines the delivered dose.", uncWhy: "Extinction coefficient calculated, not yet measured.",
    next: "Determine the extinction coefficient experimentally.", methods: ["am-a280"], cqa: "conc" },
  { id: "visc", name: "Viscosity", kind: "Product performance attribute", status: "Not a CQA",
    impact: 12, uncertainty: 5, impactWhy: "Affects injection force and manufacturability, not the molecule's safety or efficacy directly.", uncWhy: "Not yet measured at 150 mg/mL.",
    next: "Concentration-dependent viscosity in formulation screening.", methods: [], cqa: null,
    note: "Controlled as a drug product performance attribute and device requirement, not a CQA of the molecule." },
  { id: "ps", name: "Polysorbate content", kind: "Excipient attribute", status: "Not a CQA",
    impact: 12, uncertainty: 5, impactWhy: "Loss of surfactant can lead to aggregates and particles.", uncWhy: "Lipase activity in this process unknown.",
    next: "Polysorbate degradation on stability; HCP LC-MS.", methods: ["am-ps80"], cqa: "excip",
    note: "Its effect acts through aggregates and particles, which are the CQAs; polysorbate content is controlled in the drug product specification." },
];
export const scoreOf = (a) => a.impact * a.uncertainty;

/* What we know about CMX-417 at each stage, and what must be established next.
   At the proposal stage most later rows are expectations, not results. */
export const STAGE_STATE = {
  proposal: { know: "A nominated IgG1 with one CDR deamidation motif; a target presentation of 150 mg/mL in a 1 mL syringe.", next: "Confirm the concept is feasible and write the QTPP." },
  qtpp: { know: "A draft QTPP and a provisional list of CQAs scored for impact and uncertainty.", next: "Generate data on the highest-priority attributes: CDR deamidation, aggregation, particles." },
  candidate: { know: "Developability screening complete (hypothetical); the Asn-Gly motif accepted for now.", next: "Decide whether to re-engineer the motif if forced deamidation shows potency loss." },
  cellline: { know: "Not started. Platform CHO host and vector are available.", next: "Generate a clonal, stable production cell line and qualified cell banks." },
  upstream: { know: "Platform fed-batch conditions are expected to apply.", next: "Show how culture conditions affect glycans, charge and titer for this molecule." },
  downstream: { know: "Platform three-column purification is expected to apply.", next: "Measure HCP, DNA and aggregate clearance and run viral clearance studies." },
  analytical: { know: "Platform methods available; potency assay must be built.", next: "Develop the neutralisation assay and qualify methods for first-in-human release." },
  formulation: { know: "Target 150 mg/mL liquid; viscosity unknown.", next: "Screen pH, excipients and concentration for viscosity, aggregation and particles." },
  stability: { know: "No product-specific stability data.", next: "Forced degradation to find the pathways; start stability on the first GMP lot." },
  qbd: { know: "Initial risk assessment only.", next: "Reassess criticality as data arrives; identify CPPs during characterisation." },
  specs: { know: "No specifications yet.", next: "Phase-appropriate release specification for the first clinical lot." },
  ctd: { know: "No submission evidence yet.", next: "Assemble the IND quality section from the first GMP lot." },
};
