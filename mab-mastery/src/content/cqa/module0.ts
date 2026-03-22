import type { ModuleContent } from '../../types/content';

export const module0: ModuleContent = {
  id: 'cqa-m0',
  sectionId: 'cqa',
  moduleNumber: 0,
  eyebrow: 'CQA 01',
  title: 'CQA Framework & ICH Q6B',
  lead: 'The regulatory and scientific framework for identifying, classifying, and controlling critical quality attributes — from QTPP through risk-based CQA designation to the testing strategy that safeguards every batch.',
  tags: [
    { label: 'ICH Q6B', color: 'blue' },
    { label: 'QTPP', color: 'teal' },
    { label: 'Risk Assessment', color: 'amber' },
    { label: 'Control Strategy', color: 'green' },
  ],
  stats: [
    { label: 'ICH Guidelines', value: 'Q6B/Q8/Q9/Q10' },
    { label: 'QTPP Elements', value: '8–12 typical' },
    { label: 'pCQA per mAb', value: '20–40' },
    { label: 'Testing Tiers', value: '4' },
  ],
  sections: [
    {
      type: 'card',
      title: 'ICH Q6B Definition of CQA',
      color: 'blue',
      content:
        'ICH Q6B (Specifications: Test Procedures and Acceptance Criteria for Biotechnological/Biological Products, 1999) provides the foundational definition: a Critical Quality Attribute (CQA) is "a physical, chemical, biological, or microbiological property or characteristic that should be within an appropriate limit, range, or distribution to ensure the desired product quality." This definition, refined through ICH Q8(R2) (Pharmaceutical Development, 2009), establishes three critical principles. First, CQAs are derived from the Quality Target Product Profile (QTPP) — they are not arbitrarily assigned but systematically identified through a science- and risk-based workflow. Second, the phrase "appropriate limit, range, or distribution" acknowledges that biological products exhibit inherent micro-heterogeneity; the goal is not elimination of variability but rather confinement within a range demonstrated to be clinically acceptable. Third, the definition encompasses all attribute categories — from primary structure (sequence, PTMs) through higher-order structure (folding, disulfide bonds) to process-related impurities (HCP, DNA, leached Protein A) and product-related impurities (aggregates, fragments, charge variants). ICH Q6B Section 6 further specifies that the rationale for each specification must be justified based on manufacturing experience, stability data, and clinical/non-clinical studies.',
    },
    {
      type: 'card',
      title: 'Quality Target Product Profile (QTPP)',
      color: 'teal',
      content:
        'The QTPP is the starting point for all CQA identification. Defined in ICH Q8(R2) as "a prospective summary of the quality characteristics of a drug product that ideally will be achieved to ensure the desired quality, taking into account safety and efficacy," the QTPP captures the design intent of the product before any development work begins. For a therapeutic mAb, the QTPP typically comprises 8–12 elements that collectively define what the product must be. These elements include: dosage form (liquid for injection vs. lyophilised), route of administration (IV infusion vs. SC injection — which constrains concentration, viscosity, and volume), strength/concentration (e.g., 20 mg/mL for IV, 120 mg/mL for SC), container closure system (vial, pre-filled syringe, auto-injector), sterility (sterile, endotoxin-free), purity (limits on product- and process-related impurities), potency (biological activity relative to reference standard), stability (shelf life target, e.g., 36 months at 2–8°C), and any pharmacopeial requirements (USP <1> Injections, Ph. Eur. 2.6.1 Sterility). The QTPP is not a specification — it is an aspirational design document that drives all subsequent development decisions.',
    },
    {
      type: 'table',
      title: 'QTPP Elements for a Therapeutic mAb',
      headers: ['QTPP Element', 'Target', 'Rationale', 'Links to CQA Category'],
      rows: [
        ['Dosage form', 'Sterile solution for IV infusion', 'Hospital administration, large-volume infusion', 'Particulates, sterility, pH'],
        ['Strength', '20 mg/mL in 20 mL vial (400 mg/vial)', 'Weight-based dosing 10 mg/kg', 'Protein concentration, potency'],
        ['Route', 'Intravenous', 'Systemic exposure, efficacy data from Phase III', 'Aggregates (immunogenicity risk lower IV vs SC)'],
        ['Purity', '≥95% monomer, ≤2% aggregate', 'Clinical experience, safety', 'Size variants, HCP, DNA, rProtein A'],
        ['Potency', '80–125% relative to reference', 'Biological activity correlated to efficacy', 'Glycosylation, charge variants, oxidation'],
        ['Stability', '≥24 months at 2–8°C', 'Supply chain, hospital pharmacy needs', 'Aggregation, fragmentation, deamidation, oxidation'],
        ['Container closure', 'Type I glass vial, FluroTec stopper', 'Compatibility, extractables/leachables', 'Particulates, container-closure integrity'],
        ['Sterility', 'Sterile, <0.25 EU/mL endotoxin', 'Parenteral requirement', 'Bioburden, endotoxin'],
        ['pH', '6.0 ± 0.5', 'Protein stability optimum', 'Deamidation rate, aggregation propensity'],
        ['Osmolality', '280–320 mOsm/kg', 'Physiological tonicity', 'Formulation excipient levels'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'QTPP → pCQA → CQA Workflow',
      color: 'green',
      content:
        'The identification of CQAs follows a systematic three-step workflow mandated by ICH Q8/Q9/Q10. Step 1 — QTPP Definition: assemble the target product profile as described above, defining what the product must achieve. Step 2 — Potential CQA (pCQA) Identification: enumerate all quality attributes that could potentially impact the QTPP elements. For a mAb, this typically generates 20–40 pCQAs spanning product-related substances (glycoforms, charge variants, oxidation variants, disulfide isoforms), product-related impurities (aggregates, fragments, truncated species), process-related impurities (HCP, HCD, residual Protein A, residual cell culture additives), and formulation attributes (pH, osmolality, surfactant concentration, visible/subvisible particles). Step 3 — Risk-Based CQA Classification: each pCQA is evaluated for its impact on safety and efficacy using prior knowledge, experimental data, and formal risk assessment tools (FMEA, risk ranking matrices). Only those attributes where variation within the manufacturing range could affect clinical outcomes are designated as CQAs. The remainder are classified as non-critical quality attributes (nCQAs) or key quality attributes (KQAs, a mid-tier sometimes used internally but not formally defined in ICH). This classification is not static — as knowledge accumulates through development and post-marketing surveillance, the CQA list is revisited and updated.',
    },
    {
      type: 'bullets',
      title: 'Deriving pCQAs from QTPP — Systematic Enumeration',
      items: [
        'Product-related substances (molecular variants of the desired product): Glycosylation profile (fucosylation, galactosylation, high-mannose, sialylation, bisecting GlcNAc), charge variant distribution (acidic/main/basic species percentages), oxidation variants (Met252, Met428, Trp in CDR), deamidation products (Asn→Asp/isoAsp at labile sites), isomerisation products (Asp→isoAsp), C-terminal lysine processing, N-terminal pyroglutamate, disulfide bond isoforms (IgG2 A/B forms).',
        'Product-related impurities (degradation/modification products): Aggregates (soluble dimer/oligomer, subvisible particles ≥2 µm, visible particles ≥100 µm), fragments (Fab, Fc, half-antibody, hinge-clipped species), covalent and non-covalent dimers, glycated species (Lys + glucose), thioether variants.',
        'Process-related impurities: Host cell proteins (total by ELISA + specific hitchhiker HCPs by LC-MS/MS), host cell DNA (<10 ng/dose by qPCR), residual Protein A (<10 ppm by ELISA), residual cell culture additives (insulin, methotrexate if used for selection), endotoxin, bioburden.',
        'Formulation/drug product attributes: pH, protein concentration, osmolality, surfactant concentration (polysorbate 20/80), buffering agent concentration, visible/subvisible particulate matter, container-closure integrity, extractables/leachables.',
      ],
    },
    {
      type: 'card',
      title: 'Risk-Based CQA Classification — ICH Q8/Q9/Q10',
      color: 'amber',
      content:
        'ICH Q9 (Quality Risk Management) provides the risk assessment framework applied to CQA classification. For each pCQA, the risk is evaluated along two axes: (1) Impact — the severity of the consequence if the attribute falls outside the acceptable range, scored across safety (immunogenicity, infusion reactions, off-target toxicity), efficacy (potency loss, altered PK), and structural integrity (physical stability, aggregation propensity). (2) Uncertainty — the confidence in available data linking attribute variation to clinical outcomes, scored from high certainty (robust clinical/non-clinical evidence) to high uncertainty (no published data, novel attribute). The risk score is typically calculated as Impact × Uncertainty. Attributes scoring above a predefined threshold (e.g., >84 in the Alt et al. 2016 system, see Module 2) are designated CQAs. Medium-risk attributes are monitored and characterised but may not require batch release specifications. Low-risk attributes are documented but may only require one-time characterisation. The risk matrix must be documented in the regulatory filing (typically in CTD Module 3.2.P.2 Pharmaceutical Development) and updated throughout the product lifecycle.',
    },
    {
      type: 'table',
      title: 'pCQA Risk Classification Framework',
      headers: ['pCQA', 'Safety Impact', 'Efficacy Impact', 'Uncertainty', 'Risk Class', 'Testing Tier'],
      rows: [
        ['Aggregation (soluble)', 'High (immunogenicity)', 'Moderate (potency dilution)', 'Low', 'CQA', 'Tier 1 Release'],
        ['Afucosylation', 'Low', 'High (ADCC-dependent MoA)', 'Low', 'CQA', 'Tier 1 Release'],
        ['High-mannose', 'Low', 'Moderate (faster PK clearance)', 'Moderate', 'CQA', 'Tier 1 Release'],
        ['Deamidation (CDR)', 'Low', 'High (potency loss)', 'Low', 'CQA', 'Tier 1 Release'],
        ['Met252 oxidation', 'Low', 'Moderate (PK impact)', 'Moderate', 'CQA', 'Tier 1/2'],
        ['Charge variants', 'Low', 'Moderate (potency variant)', 'Moderate', 'CQA', 'Tier 1 Release'],
        ['C-terminal Lys', 'None', 'None (rapid serum clipping)', 'Low', 'Non-CQA', 'Tier 4 Characterisation'],
        ['N-terminal pyroGlu', 'None', 'None', 'Low', 'Non-CQA', 'Tier 4 Characterisation'],
        ['Disulfide isoforms', 'Low', 'Low', 'Moderate', 'KQA', 'Tier 2 Stability'],
        ['Subvisible particles', 'High (immunogenicity)', 'Low', 'Moderate', 'CQA', 'Tier 1 Release'],
        ['HCP (total)', 'High (immunogenicity, safety)', 'Low', 'Low', 'CQA', 'Tier 1 Release'],
        ['Residual DNA', 'Moderate (oncogenicity concern)', 'None', 'Low', 'CQA', 'Tier 1 Release'],
        ['Residual Protein A', 'High (anti-ProA antibodies)', 'Low', 'Low', 'CQA', 'Tier 1 Release'],
        ['Galactosylation', 'Low', 'Moderate (CDC modulation)', 'Moderate', 'CQA/KQA', 'Tier 1/2'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Testing Strategy Tiers',
      color: 'purple',
      content:
        'Once CQAs are identified, each is assigned to an appropriate testing strategy tier that determines how frequently and rigorously it is monitored. Tier 1 — Release Testing: applied to every batch. Includes specifications with defined acceptance criteria in the drug substance and/or drug product certificates of analysis. Examples: purity by SEC (≥95% monomer), potency by cell-based bioassay (80–125%), charge variants by iCIEF or CEX, glycan profile by HILIC-FLR. Tier 2 — Stability Testing: monitored over the product shelf life under ICH Q1A(R2)/Q5C conditions (25°C/60% RH long-term, 40°C/75% RH accelerated for drug product; also −20°C or −70°C for drug substance). Stability-indicating attributes include aggregation (SEC), fragmentation (CE-SDS), deamidation (CEX or peptide mapping), oxidation (HIC or peptide mapping), potency, and subvisible particles. Tier 3 — Characterisation (Extended): performed during development, process validation, and comparability exercises but not on every commercial batch. Includes intact/subunit mass spectrometry, peptide mapping with site-specific PTM quantification, DSC/nanoDSF for higher-order structure, AUC for oligomeric species, HDX-MS for conformational assessment. Tier 4 — In-Process Controls: real-time monitoring during manufacturing, including PAT (Process Analytical Technology) measurements such as in-line UV for protein concentration, online pH and dissolved oxygen, and at-line Raman spectroscopy for glycan monitoring.',
    },
    {
      type: 'table',
      title: 'Testing Tier Assignment — Typical mAb Panel',
      headers: ['CQA/Attribute', 'Method', 'Tier 1 Release', 'Tier 2 Stability', 'Tier 3 Characterisation', 'Tier 4 In-Process'],
      rows: [
        ['Purity (monomer %)', 'SEC-HPLC', 'Yes', 'Yes', 'Yes', 'At-line SEC'],
        ['Aggregates/fragments', 'CE-SDS (NR/R)', 'Yes', 'Yes', 'Yes', 'No'],
        ['Charge variants', 'iCIEF or CEX', 'Yes', 'Yes', 'Yes', 'No'],
        ['Glycan profile', 'HILIC-FLR', 'Yes', 'Selected timepoints', 'Yes', 'Raman (PAT)'],
        ['Potency', 'Cell-based bioassay', 'Yes', 'Yes', 'Yes', 'No'],
        ['Identity', 'Peptide map / iCIEF pI', 'Yes', 'No', 'Yes', 'No'],
        ['Protein concentration', 'UV A280', 'Yes', 'Yes', 'No', 'In-line UV'],
        ['pH', 'Potentiometric', 'Yes', 'Yes', 'No', 'In-line pH'],
        ['Subvisible particles', 'HIAC / MFI', 'Yes', 'Yes', 'Yes', 'No'],
        ['HCP', 'ELISA', 'Yes', 'No', 'LC-MS/MS (HCP-ID)', 'No'],
        ['Residual DNA', 'qPCR', 'Yes', 'No', 'No', 'No'],
        ['Residual Protein A', 'ELISA', 'Yes', 'No', 'No', 'No'],
        ['Oxidation (Met/Trp)', 'Peptide mapping LC-MS/MS', 'No', 'Selected timepoints', 'Yes', 'No'],
        ['Deamidation (site-specific)', 'Peptide mapping LC-MS/MS', 'No', 'Selected timepoints', 'Yes', 'No'],
        ['Higher-order structure', 'DSC, HDX-MS, CD', 'No', 'No', 'Yes', 'No'],
        ['Intact mass', 'ESI-TOF or Orbitrap', 'No', 'No', 'Yes', 'No'],
        ['Endotoxin', 'LAL / rFC', 'Yes', 'No', 'No', 'In-process hold'],
        ['Bioburden', 'Membrane filtration', 'Pre-filtration', 'No', 'No', 'In-process hold'],
        ['Osmolality', 'Vapour pressure', 'Yes', 'No', 'No', 'No'],
        ['Visible particles', 'Visual inspection', 'Yes', 'Yes', 'No', 'In-process (100% inspection)'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: 'Regulatory Expectation — CQA Justification in CTD Module 3',
      variant: 'warning',
      content:
        'The CQA assessment must be documented in CTD Module 3.2.P.2 (Pharmaceutical Development) and cross-referenced in Module 3.2.S.3.2 (Impurities — Drug Substance). Regulatory agencies expect: (1) A complete list of all pCQAs considered, with scientific rationale for inclusion or exclusion. (2) The risk assessment methodology used (FMEA, risk ranking matrix, or equivalent), with scoring criteria defined. (3) The resulting CQA classification and the testing tier assignment for each. (4) A clear linkage between CQA classification and the control strategy (specifications, in-process controls, process parameter ranges). The FDA has increasingly emphasised the importance of a "living" CQA assessment that evolves with product knowledge. Post-approval, any process change that could affect a CQA requires a comparability assessment per ICH Q5E, and the CQA risk matrix should be updated to reflect new data.',
    },
    {
      type: 'card',
      title: 'CQA vs. KQA vs. Non-CQA — Practical Distinctions',
      color: 'pink',
      content:
        'While ICH guidelines formally recognise only CQA and non-CQA categories, many companies employ a three-tier system in practice. CQAs are attributes where variation within the manufacturing range could directly affect safety or efficacy — these receive specifications with defined acceptance criteria on every batch release. Key Quality Attributes (KQAs) are attributes that contribute to product quality but whose impact on clinical outcomes is either moderate or well-controlled by the process — these are monitored (e.g., on stability studies, during process validation) but may not have formal release specifications. Non-CQAs are attributes with no demonstrable impact on safety, efficacy, or quality — these require one-time characterisation but no ongoing monitoring. The practical distinction matters for regulatory filing strategy: CQAs must appear in the specification table (CTD 3.2.S.4.1 / 3.2.P.5.1), KQAs may appear as "for information" results, and non-CQAs appear only in the characterisation section (3.2.S.3). Companies that over-classify (designating too many CQAs) face unnecessary specification tightening, while those that under-classify risk regulatory deficiency letters.',
    },
    {
      type: 'bullets',
      title: 'Common CQA Assessment Pitfalls',
      items: [
        'Platform bias: applying the same CQA list from a previous molecule without molecule-specific risk assessment. Each mAb has a unique sequence, structure, and mechanism of action that may alter which attributes are critical.',
        'Ignoring uncertainty: treating all pCQAs with equal certainty regardless of data availability. High-uncertainty attributes should be scored conservatively (assume worst case) until data are generated.',
        'Static assessment: treating the CQA list as fixed at IND filing. The CQA assessment should be updated at Phase I/II transition, at BLA filing, and post-approval as clinical data accumulate.',
        'Conflating process capability with criticality: arguing an attribute is "not a CQA" because the process consistently controls it. Criticality is an intrinsic property of the attribute; controllability determines the control strategy, not the CQA classification.',
        'Overlooking combination effects: evaluating each pCQA in isolation without considering that multiple suboptimal attributes (e.g., high aggregate + high HCP + borderline potency) may collectively compromise product quality even when each individually meets specification.',
      ],
    },
    {
      type: 'callout',
      title: 'Industry Practice — The Living CQA Document',
      variant: 'info',
      content:
        'Best-practice companies maintain a CQA Risk Assessment as a living document within their pharmaceutical quality system. This document is version-controlled and updated at predefined lifecycle milestones: (1) end of Phase I (initial clinical experience), (2) end of Phase II (dose-response data, expanded safety), (3) BLA submission (full clinical dataset), (4) post-approval annual product quality review, and (5) any significant manufacturing change (site transfer, scale-up, process improvement). Each update reviews new data against the existing risk scores and adjusts classifications as warranted. This approach aligns with ICH Q10 (Pharmaceutical Quality System) and ICH Q12 (Lifecycle Management), which emphasise knowledge management and continuous improvement. The document typically resides in the company QMS and is cross-referenced in the CTD.',
    },
  ],
  mentorQuestions: [
    'Why does ICH Q6B use the phrase "appropriate limit, range, or distribution" rather than a single fixed value when defining CQAs? What does this tell you about the regulatory philosophy for biologics?',
    'Walk through how you would update a CQA risk assessment when transitioning from a Phase I clinical programme (limited patients, short exposure) to BLA filing (large dataset, long-term follow-up). Which CQAs might change classification?',
    'A colleague argues that C-terminal lysine processing should be classified as a CQA because it changes the charge profile. How would you respond using the ICH Q8/Q9 framework?',
  ],
};
