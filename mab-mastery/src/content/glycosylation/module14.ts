import type { ModuleContent } from '../../types/content';

export const module14: ModuleContent = {
  id: 'glycosylation-m14',
  sectionId: 'glycosylation',
  moduleNumber: 14,
  eyebrow: 'GLYCOSYLATION 15',
  title: 'Glycan CQA Specifications',
  lead: 'The three-input framework for setting glycan specifications — integrating functional biology, process capability, and clinical data into defensible CQA ranges.',
  tags: [
    { label: 'Specifications', color: 'green' },
    { label: 'Three-Input', color: 'blue' },
    { label: 'Process Capability', color: 'amber' },
  ],
  stats: [
    { label: 'Framework Inputs', value: '3' },
    { label: 'Typical Specs', value: '5-8 glycan CQAs' },
    { label: 'Key Guidance', value: 'ICH Q6B' },
    { label: 'Approach', value: 'Biology + Process + Clinical' },
  ],
  sections: [
    {
      type: 'card',
      title: 'The Three-Input Specification Framework',
      color: 'blue',
      content:
        'Setting glycan CQA specifications is one of the most consequential decisions in mAb CMC development. Too-tight specifications create manufacturing failures and lot rejections that disrupt supply; too-loose specifications allow functionally impaired product to reach patients. The three-input framework provides a systematic, defensible approach by integrating three independent sources of information: (1) Functional biology — What is the relationship between each glycan attribute and the mAb\'s mechanism of action, PK, and safety? This input defines which glycan attributes are CQAs and how tightly they must be controlled based on functional impact. (2) Process capability — What range can the manufacturing process consistently and reproducibly deliver? This input defines what is achievable, using statistical process capability analysis (Cpk, Ppk) to set limits that the process can reliably meet. (3) Clinical data — What glycan profile range was present in the material used in pivotal clinical trials? This input defines the clinically qualified range — the glycan space that has been demonstrated to be safe and effective in patients. The specification should represent the intersection of all three inputs: functionally acceptable, process-achievable, and clinically qualified. When the three inputs conflict (e.g., functional data suggests a tighter range than the process can deliver), the resolution requires either process improvement or additional clinical justification.',
    },
    {
      type: 'card',
      title: 'Input 1 — Functional Biology',
      color: 'green',
      content:
        'The functional biology input requires understanding the relationship between each glycan CQA and the molecule\'s biological activity. This understanding comes from: (1) Glycan variant characterisation studies — producing glycan-enriched or glycan-depleted variants (by cell line engineering, media manipulation, enzymatic remodelling, or chromatographic fractionation) and measuring their functional properties (binding affinity, effector function, PK). (2) Structure-function correlations — analysing clinical lot data to correlate glycan profile with potency, PK parameters, and clinical response. (3) Published literature — leveraging the extensive body of knowledge on glycan-function relationships. The functional impact assessment classifies each glycan attribute into one of three categories: (a) Critical — direct impact on mechanism of action (e.g., afucosylation for ADCC-dependent mAbs) → tight specification required; (b) Relevant — measurable impact on secondary attributes (e.g., high mannose on PK) → moderate specification; (c) Non-critical — no measurable functional impact within the tested range → specification based on process capability alone. The challenge is that functional impact may be glycan-level-dependent: 5% afucosylation may have no clinical effect, while 50% may be transformative. Establishing the functional threshold requires dose-response data from glycan variant studies.',
    },
    {
      type: 'card',
      title: 'Input 2 — Process Capability',
      color: 'amber',
      content:
        'Process capability analysis uses statistical data from process performance qualification (PPQ) batches and commercial manufacturing experience to determine the range of glycan values that the process consistently delivers. The key metrics are: (1) Process capability index (Cpk) — measures how well the process output fits within specification limits, considering both the mean and variability. Cpk ≥ 1.33 is the target, meaning the process operates at least 4σ within the specification limits, corresponding to <0.006% out-of-specification probability. (2) Process performance index (Ppk) — similar to Cpk but uses long-term variability including batch-to-batch variation, seasonal effects, and raw material lot-to-lot differences. Ppk is typically lower than Cpk and provides a more realistic estimate. (3) Normal operating range (NOR) — the range containing 99% of expected batch results (mean ± 2.58σ for normally distributed data). The specification should be set wider than the NOR to allow for normal process variability while maintaining a safety margin. For glycan CQAs, process capability analysis typically uses data from ≥15-30 batches at commercial scale. The analysis should account for trending over time, as cell line drift, media lot changes, and seasonal temperature variations can shift glycan profiles gradually. Specification limits are often set at the NOR + a justified margin, ensuring Cpk ≥ 1.33.',
    },
    {
      type: 'card',
      title: 'Input 3 — Clinical Data',
      color: 'purple',
      content:
        'The clinical data input grounds the specification in demonstrated patient safety and efficacy. The glycan profile of every clinical lot used in Phase 1, 2, and 3 studies should be documented, creating a "clinical experience range" — the full span of glycan values that patients have been exposed to with documented outcomes. ICH Q6B and FDA/EMA guidance emphasise that the specification should encompass the clinical experience range, because narrowing below this range would exclude product quality that has been demonstrated to be safe and effective. Conversely, setting specifications wider than the clinical experience range introduces product that has not been clinically qualified. In practice, the clinical experience range for glycan attributes may be relatively narrow (if the manufacturing process was well-controlled during clinical development) or broad (if process changes occurred between clinical phases). For pivotal Phase 3 lots, detailed glycan characterisation data are expected: HILIC glycan profile, total afucosylation, total galactosylation, high mannose, sialylation, and NGHC. The specification justification section of the BLA/MAA (CTD Module 3.2.S.4.5/3.2.P.5.6) should present a clear narrative linking each specification limit to the three-input framework.',
    },
    {
      type: 'table',
      title: 'Example Glycan Specification — Afucosylated Anti-CD20 mAb',
      headers: ['Glycan CQA', 'Specification', 'Functional Justification', 'Process Capability (Cpk)', 'Clinical Range'],
      rows: [
        ['Afucosylated species', '≥90%', 'ADCC-dependent MoA; afucosylation critical for FcγRIIIa binding', '1.8 (mean 94%, σ 1.5%)', '91-97% (Phase 3 lots)'],
        ['G0 (total agalactosylated)', '20-40%', 'Moderate CDC impact; minimal ADCC effect within range', '1.5 (mean 30%, σ 3.5%)', '24-38%'],
        ['G1 (total monogalactosylated)', '25-45%', 'Intermediate processing; galactose supports C1q binding', '1.4 (mean 35%, σ 4%)', '28-42%'],
        ['G2 (total digalactosylated)', '10-25%', 'Higher CDC; acceptable ADCC within range', '1.6 (mean 17%, σ 2.5%)', '12-23%'],
        ['High mannose (Man5 + Man6-9)', 'NMT 5%', 'Accelerated clearance above 5-10%; MR-mediated PK impact', '2.0 (mean 2%, σ 0.8%)', '1-4%'],
        ['Sialylated species', 'NMT 10%', 'Anti-inflammatory shift above 10%; may modulate ADCC', '1.8 (mean 4%, σ 1.5%)', '2-7%'],
        ['NGHC', 'NMT 1%', 'Reduced FcγR binding; CH2 instability; aggregation risk', '1.5 (mean 0.5%, σ 0.2%)', '0.3-0.8%'],
        ['Bisecting GlcNAc', 'Report result (for information)', 'Dual ADCC mechanism (GlycoMAb platform); monitored for consistency', 'N/A (for info only)', '35-55%'],
      ],
      sortable: false,
    },
    {
      type: 'callout',
      title: 'ICH Q6B — The Regulatory Foundation',
      variant: 'info',
      content:
        'ICH Q6B "Specifications: Test Procedures and Acceptance Criteria for Biotechnological/Biological Products" (1999) provides the overarching framework for setting quality specifications for glycoproteins. Q6B states: "Oligosaccharide pattern (e.g., neutral, sialylated) should be determined and the structures of the sugar chains characterised where possible." For glycan specifications, Q6B requires: (1) Identification and quantification of the carbohydrate content (monosaccharide composition, oligosaccharide pattern, glycan site identification); (2) Functional assessment of glycosylation variants; (3) Specifications that ensure batch-to-batch consistency within the range demonstrated to be safe and effective. Importantly, Q6B does not mandate specific glycan species specifications — the level of detail in glycan specifications is product-specific and should be justified based on the three-input framework. ICH Q8(R2) and Q11 complement Q6B by linking glycan CQAs to the upstream process control strategy and design space.',
    },
    {
      type: 'card',
      title: 'Setting the Afucosylation Specification — A Detailed Walkthrough',
      color: 'red',
      content:
        'Consider an ADCC-dependent anti-CD20 mAb manufactured using a glycoengineered (FUT8-KO) CHO cell line. The afucosylation specification is the most critical glycan CQA. Step 1 — Functional biology: Glycan variant studies show that ADCC activity increases linearly from 2% afucosylation (WT CHO) to 50% afucosylation, then plateaus above 80%. Below 80% afucosylation, the ADCC assay fails the potency specification. Above 90%, ADCC potency is consistent at 10-20× enhancement. The functional lower limit is therefore ~80-90% afucosylated. Step 2 — Process capability: PPQ data from 20 consecutive batches show mean afucosylation 94.2%, standard deviation 1.3%, range 91.5-97.1%. The NOR is 90.8-97.6%. Setting a lower specification at 90% gives Cpk = (94.2 - 90.0) / (3 × 1.3) = 1.08. Tightening to 91% gives Cpk = 0.82 (unacceptable). Widening to 88% gives Cpk = 1.59 (comfortable). Step 3 — Clinical data: Phase 3 lots ranged from 91.3-96.8% afucosylated. A lower limit of 90% encompasses the clinical range with a 1.3% margin. Resolution: Set the specification at ≥90% afucosylated, noting that Cpk at 90% is borderline (1.08). To improve Cpk, either tighten process control (reduce σ) or accept the 90% limit with enhanced in-process monitoring.',
    },
    {
      type: 'card',
      title: 'High-Mannose Specification — PK-Driven',
      color: 'teal',
      content:
        'High-mannose (primarily Man5) specification setting is driven by PK considerations rather than effector function. Man5 glycans expose terminal mannose residues that are recognised by the mannose receptor (MRC1/CD206) on liver sinusoidal endothelial cells and Kupffer cells, leading to receptor-mediated endocytosis and accelerated clearance. Published studies demonstrate a dose-dependent PK impact: (1) At 0-5% Man5, serum half-life is within normal range (18-21 days for IgG1); (2) At 5-15% Man5, modest half-life reduction (~10-20% decrease) becomes detectable in PK modelling; (3) Above 15-20% Man5, clinically significant half-life reduction occurs (>30% decrease). The functional threshold for clinical significance varies by molecule (target biology, dose regimen, therapeutic window) but is generally considered to be ~5-10%. Process capability analysis typically shows Man5 at 2-5% for well-controlled CHO processes, with occasional excursions to 6-8% during process upsets. The typical specification is NMT 5% for most innovator products, which balances PK safety with process capability. For biosimilars, the specification must match the reference product range — if the reference shows 2-4% Man5 across multiple lots, the biosimilar target of NMT 5% may be appropriate if comparability data support equivalence within this range.',
    },
    {
      type: 'table',
      title: 'Glycan CQA Impact Assessment Matrix',
      headers: ['Glycan CQA', 'Effector Function', 'PK', 'Immunogenicity', 'Stability', 'Overall Criticality'],
      rows: [
        ['Afucosylation', 'HIGH — direct ADCC impact', 'Low — minimal PK effect', 'Low', 'Low', 'CRITICAL (ADCC mAbs)'],
        ['Galactosylation', 'Moderate — CDC impact', 'Low-Moderate', 'Low', 'Low', 'CQA (CDC mAbs)'],
        ['High mannose (Man5)', 'Low', 'HIGH — MR clearance', 'Low', 'Moderate — Man5 aggregation', 'CQA (PK-driven)'],
        ['Sialylation', 'Moderate — anti-inflammatory', 'Moderate — ASGPR clearance', 'Moderate — Neu5Gc risk', 'Low', 'CQA (molecule-specific)'],
        ['NGHC', 'Moderate — reduced FcγR', 'Low', 'Low', 'HIGH — aggregation risk', 'CQA (stability-driven)'],
        ['Bisecting GlcNAc', 'HIGH — dual ADCC mechanism', 'Low', 'Low', 'Low', 'CRITICAL (GlycoMAb products)'],
        ['α-Gal', 'None', 'Low', 'HIGH — anaphylaxis risk', 'None', 'CRITICAL (safety-driven)'],
        ['Neu5Gc', 'None', 'Moderate — immune complex clearance', 'HIGH — pre-existing Abs', 'None', 'CQA (safety-driven)'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Specification Lifecycle Management',
      color: 'amber',
      content:
        'Glycan specifications are not static — they evolve through the product lifecycle as manufacturing experience accumulates and understanding deepens. Phase 1-2 (early clinical): Wide specifications based on limited process understanding. Glycan profiling is performed for characterisation, but formal specifications may list only the primary method (HILIC) with acceptance criteria for the major peak pattern. Individual glycan species may be "report result" rather than specified limits. Phase 3 (pivotal): Specifications tighten as process understanding improves and DoE data define the design space. Individual glycan CQAs (afucosylated, galactosylated, high mannose, sialylated) are specified with justified limits based on the three-input framework. These specifications are included in the BLA/MAA filing. Post-approval (commercial): Specifications are further refined based on commercial manufacturing data. The Cpk analysis is updated with additional batches, and limits may be tightened (to improve consistency) or widened (if manufacturing data and functional studies justify a broader range). Any specification change requires a regulatory variation/supplement, with justification based on updated three-input analysis. Lifecycle management also addresses specification evolution during biosimilar development — the biosimilar must demonstrate analytical similarity within the reference product specification, which itself may have evolved over time.',
    },
    {
      type: 'callout',
      title: 'When the Three Inputs Conflict',
      variant: 'warning',
      content:
        'Conflicts between the three inputs require careful resolution: (1) Process capability narrower than functional range: If the process can only deliver 92-96% afucosylation but the functional minimum is 80%, the specification can be set at ≥90% (comfortable Cpk with functional margin). This is the easiest case — the process naturally exceeds the functional requirement. (2) Process capability wider than clinical range: If the process delivers 25-55% galactosylation but Phase 3 lots were 30-45%, setting the specification at 25-55% includes product that was not clinically qualified. Options: (a) Tighten the specification to 28-48% (NOR within clinical range + margin); (b) Generate additional functional data showing that 25-55% is functionally equivalent; (c) Conduct a bridging clinical study. (3) Functional threshold within process range: If Man5 above 10% accelerates clearance but the process occasionally produces 8-12%, the specification NMT 10% may have inadequate Cpk. Options: (a) Improve the process to consistently produce <8%; (b) Accept NMT 10% with enhanced in-process monitoring and reject lots above 10%; (c) Generate PK data showing that 10-12% Man5 does not meaningfully impact clinical efficacy at the approved dose.',
    },
    {
      type: 'bullets',
      title: 'Best Practices for Glycan Specification Setting',
      items: [
        'Start early with glycan variant characterisation: Generate glycan-enriched and glycan-depleted variants during early development (Phase 1) using enzymatic remodelling, chromatographic enrichment, or cell culture manipulation. Establishing structure-function relationships before Phase 3 ensures that specifications are science-driven rather than process-driven.',
        'Use orthogonal functional assays: Correlate glycan attributes with multiple functional endpoints — not just the primary potency assay, but also FcγR binding (SPR/BLI), C1q binding (ELISA), ADCC (reporter cell assay), and PK (FcRn binding for half-life, mannose receptor binding for clearance).',
        'Build process capability data systematically: Include glycan profiling in every process development run, PPQ batch, and commercial lot from the earliest stage. The more data points available for Cpk analysis, the more defensible the specification.',
        'Document the three-input analysis transparently: The specification justification in CTD Module 3.2.S.4.5/3.2.P.5.6 should present all three inputs (functional, process, clinical) and clearly explain how the specification limits were derived from their intersection. Regulatory reviewers look for this logic.',
        'Consider aggregate specifications alongside individual glycoforms: In addition to individual glycan species specifications, consider aggregate CQAs such as total afucosylated, total galactosylated (G1+G2), and total sialylated. Aggregate specifications are more robust to minor glycan profile shifts (e.g., G1F isomer distribution changes) that may not have functional significance.',
        'Plan for specification evolution: Design the initial specification with lifecycle management in mind. Document the rationale for each limit so that future tightening or widening can be justified against the original framework. Include trending and capability analysis as routine activities.',
      ],
    },
  ],
  mentorQuestions: [
    'Walk through the three-input specification framework for setting the high-mannose (Man5) specification for a non-ADCC-dependent anti-PD-1 mAb. How does the analysis differ from an ADCC-dependent product?',
    'Your PPQ data show Cpk of 1.1 for afucosylation at the proposed specification of ≥90%. What are your options, and which would you recommend to the CMC team?',
    'A regulatory reviewer challenges your galactosylation specification as too wide (20-50%) compared to the Phase 3 clinical experience range (28-42%). How do you respond?',
  ],
};

export default module14;
