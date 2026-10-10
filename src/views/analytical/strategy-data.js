/* Phase-appropriate analytical strategy for a monoclonal antibody.
   Expectations summarise FDA/EMA practice (21 CFR 312.23, FDA 2008 Phase 1
   CMC guidance, ICH Q2/Q5E/Q6B/Q14); they are typical, not product-specific. */

export const PHASES = [
  {
    id: "pre", short: "Preclinical", name: "Preclinical and toxicology",
    goal: "Show the material used in toxicology studies is the same molecule, at the same quality, that will go into humans.",
    rows: [
      ["Methods", "Fit for purpose and scientifically sound. Platform methods borrowed from earlier antibodies are normal; nothing is validated yet."],
      ["Specifications", "None formally; results are recorded to describe the tox lot and later justify Phase 1 limits."],
      ["Reference standard", "An interim reference is set aside, usually from the tox or engineering lot."],
      ["Stability", "Short studies to support the tox programme and choose a formulation."],
      ["Characterisation", "Intact mass, peptide map, glycan profile, charge and size variants: enough to know what the molecule is."],
      ["Comparability", "Tox lot versus first clinical lot must be shown comparable if the process changes between them."],
    ],
    reviewers: ["Is the tox material representative of the clinical material?", "Were impurities in the tox lot at or above the clinical levels, so they are qualified by the study?"],
    pitfalls: ["Scaling up between tox and GMP lots without enough analytics to prove comparability.", "Losing the tox lot retain that later anchors the reference standard."],
  },
  {
    id: "ph1", short: "IND / Phase 1", name: "IND and Phase 1",
    goal: "Ensure patient safety and adequate control of identity, strength, quality and purity. Phase 1 CMC is judged on safety first.",
    rows: [
      ["Methods", "Qualified, not fully validated: specificity, precision and range shown to be adequate. Safety tests (sterility, endotoxin, bioburden) follow compendial methods and must be suitable for the product."],
      ["Specifications", "Wide, clinical-stage limits; many characterisation attributes reported without limits ('report result')."],
      ["Reference standard", "Interim or first primary reference standard, characterised and stored at −70 °C."],
      ["Stability", "Data to cover the planned clinical duration, often real-time plus accelerated, with a commitment to continue."],
      ["Characterisation", "Primary structure, glycosylation and variant profiles on the clinical lot."],
      ["Comparability", "Any process change during Phase 1 is supported by release data and side-by-side characterisation."],
    ],
    reviewers: ["Are safety-related tests (endotoxin, bioburden, sterility, adventitious agents) adequate?", "Is there a potency assay, even if not yet the final one?", "Are the limits justified by the tox lot and early data?"],
    pitfalls: ["Starting with a potency assay that does not reflect the mechanism of action and having to bridge to a new one later.", "Specifications tighter than the process can deliver, causing avoidable lot failures."],
    filing: "IND module 3 sections 3.2.S.4 (control of DS) and 3.2.P.5 (control of DP); method descriptions, not full validation reports.",
  },
  {
    id: "ph2", short: "Phase 2", name: "Phase 2",
    goal: "Build process and product understanding while dose and indication are established.",
    rows: [
      ["Methods", "Methods optimised and locked; development data on robustness begins to accumulate under ICH Q14."],
      ["Specifications", "Tightened as batch history grows; release and shelf-life limits start to diverge."],
      ["Reference standard", "Primary standard from a lot representative of the intended commercial process."],
      ["Stability", "Forced degradation establishes degradation pathways and confirms methods are stability-indicating."],
      ["Characterisation", "Deeper: disulfide mapping, higher-order structure, functional characterisation of variants (for example, does an acidic variant lose potency?)."],
      ["Comparability", "Process changes for scale-up are common here; tiered statistical comparability begins to apply."],
    ],
    reviewers: ["Which attributes are critical, and what is the evidence?", "Are the release methods able to detect the degradation seen in forced degradation?"],
    pitfalls: ["Leaving method changes until Phase 3, when they need bridging studies on top of validation."],
  },
  {
    id: "ph3", short: "Phase 3 / PPQ", name: "Phase 3 and process validation",
    goal: "Lock the commercial process and analytical package so that validation lots and the pivotal clinical supply share one control strategy.",
    rows: [
      ["Methods", "Fully validated to ICH Q2(R2) before release of PPQ lots; transferred to commercial QC sites with comparative testing."],
      ["Specifications", "Proposed commercial limits, justified from clinical lot data, stability trends and tolerance intervals."],
      ["Reference standard", "Two-tier programme in place: primary standard plus qualified working standard."],
      ["Stability", "Registration stability on at least three lots at the commercial scale and container."],
      ["Characterisation", "Complete package for the BLA: structure, function, variants, process- and product-related impurities."],
      ["Comparability", "Clinical versus commercial process demonstrated with Tier 1 equivalence on the highest-risk attributes."],
    ],
    reviewers: ["Is each specification limit justified by clinical experience?", "Were the PPQ lots tested with validated methods?", "Are analytical methods the same at every testing site?"],
    pitfalls: ["Validating a method after PPQ lots were already released with it.", "Specifications based on too few lots, producing very wide tolerance intervals."],
  },
  {
    id: "bla", short: "BLA / MAA", name: "Marketing application",
    goal: "Present a complete, justified control strategy that a reviewer can follow from each CQA to the test that controls it.",
    rows: [
      ["Methods", "Validation reports for every release and stability method; method descriptions in enough detail to repeat."],
      ["Specifications", "Final DS and DP specifications with a justification for every test and limit (3.2.S.4.5, 3.2.P.5.6)."],
      ["Reference standard", "Preparation, characterisation and qualification described in 3.2.S.5."],
      ["Stability", "Shelf life proposed from registration data with statistical evaluation (ICH Q1E)."],
      ["Characterisation", "3.2.S.3.1 elucidation of structure and 3.2.S.3.2 impurities, showing orthogonal methods agree."],
      ["Comparability", "All process history bridged; pre-approval inspection checks the data behind it."],
    ],
    reviewers: ["Is every CQA controlled by release testing, in-process control or process validation?", "Do orthogonal methods support each other?", "Are the validation data consistent with the claimed method performance?"],
    pitfalls: ["Inconsistent numbers between the characterisation section and the specification justification.", "Missing justification for attributes deliberately not tested at release."],
    filing: "Module 3: 3.2.S.3, 3.2.S.4, 3.2.S.5, 3.2.S.7 and the DP equivalents.",
  },
  {
    id: "post", short: "Post-approval", name: "Post-approval lifecycle",
    goal: "Keep methods and specifications current while changes are managed without disrupting supply.",
    rows: [
      ["Methods", "Ongoing performance verification; method changes assessed against the analytical target profile (ICH Q14)."],
      ["Specifications", "Revisited as commercial data accumulates; tightening is common, widening needs strong justification."],
      ["Reference standard", "Working standards replaced on a planned cycle; primary standard changes are filed."],
      ["Stability", "Annual stability lots and post-approval stability commitments."],
      ["Characterisation", "Used to investigate trends and support changes."],
      ["Comparability", "Every manufacturing change (site, scale, raw material) needs a comparability package scaled to its risk."],
    ],
    reviewers: ["Is the change reported at the right category (prior approval, CBE-30, annual report)?", "Does the comparability package match the risk of the change?"],
    pitfalls: ["Treating a method change as minor when it changes the reportable result.", "Missing an established condition that turns a routine change into a prior-approval supplement."],
    filing: "Post-approval supplements and annual reports; ICH Q12 established conditions and PACMPs reduce the burden.",
  },
];

// A typical mAb drug substance specification (illustrative; limits are product-specific)
export const DS_SPEC = [
  { group: "General", test: "Appearance", method: "Visual, Ph. Eur. 2.2.1 / 2.2.2", crit: "Clear to slightly opalescent, colourless to slightly yellow" },
  { group: "General", test: "pH", method: "Potentiometry", crit: "Target ± 0.3" },
  { group: "Quantity", test: "Protein concentration", method: "UV A280", crit: "Target ± 10%", am: "am-a280" },
  { group: "Identity", test: "Identity", method: "Peptide map or icIEF", crit: "Conforms to reference standard", am: "am-peptide-map" },
  { group: "Purity", test: "Size variants: monomer", method: "SEC-HPLC", crit: "≥ 95.0%", am: "am-sec" },
  { group: "Purity", test: "Size variants: HMW", method: "SEC-HPLC", crit: "≤ 3.0%", am: "am-sec" },
  { group: "Purity", test: "Purity, non-reduced", method: "CE-SDS", crit: "≥ 90.0% main peak", am: "am-ce-sds" },
  { group: "Purity", test: "Purity, reduced", method: "CE-SDS", crit: "≥ 95.0% heavy + light chain", am: "am-ce-sds" },
  { group: "Charge", test: "Charge variants", method: "icIEF or CEX", crit: "Main, acidic and basic peaks within set ranges", am: "am-cief" },
  { group: "Glycan", test: "N-glycan profile", method: "HILIC-FLR", crit: "Afucosylated and high-mannose species within set ranges", am: "am-glycan" },
  { group: "Potency", test: "Relative potency", method: "Cell-based bioassay", crit: "70–130% of reference", am: "am-cell-bioassay" },
  { group: "Process impurities", test: "Host-cell protein", method: "HCP ELISA", crit: "≤ 100 ppm", am: "am-hcp-elisa" },
  { group: "Process impurities", test: "Residual DNA", method: "qPCR", crit: "≤ 10 pg/mg", am: "am-qpcr" },
  { group: "Process impurities", test: "Residual Protein A", method: "ELISA", crit: "≤ 10 ppm", am: "am-pra-elisa" },
  { group: "Safety", test: "Bacterial endotoxin", method: "LAL, kinetic chromogenic", crit: "≤ 0.5 EU/mg", am: "am-endotoxin" },
  { group: "Safety", test: "Bioburden", method: "Membrane filtration", crit: "≤ 10 CFU/100 mL", am: "am-bioburden" },
];
