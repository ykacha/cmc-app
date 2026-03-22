import type { ModuleContent } from '../../types/content';

export const module11: ModuleContent = {
  id: 'moa-m11',
  sectionId: 'moa',
  moduleNumber: 11,
  eyebrow: 'MOA 12',
  title: 'MoA-to-CQA Integration',
  lead: 'Master integration of mechanism of action with critical quality attribute assignment — how MoA type dictates the CQA hierarchy, potency assay selection, and analytical focus for every antibody modality.',
  tags: [
    { label: 'CQA Integration', color: 'blue' },
    { label: 'Potency Design', color: 'green' },
    { label: 'Risk-Based', color: 'amber' },
    { label: 'ICH Q8/Q9', color: 'purple' },
  ],
  stats: [
    { label: 'MoA Types Covered', value: '8' },
    { label: 'CQA Categories', value: 'Critical / Less Critical' },
    { label: 'Framework', value: 'ICH Q8–Q12' },
    { label: 'Key Principle', value: 'MoA Drives CQA' },
  ],
  sections: [
    {
      type: 'card',
      title: '1. The MoA-CQA Nexus — Foundational Principle',
      color: 'blue',
      content:
        'The single most important principle in therapeutic antibody CMC development is that the mechanism of action determines the criticality ranking of quality attributes. Two antibodies with identical IgG1 structures but different MoAs will have fundamentally different CQA hierarchies. Example: for an ADCC-dependent anti-CD20 mAb, core fucosylation is a critical CQA (directly modulates FcgammaRIIIa binding and tumour cell killing); for an anti-PD-1 checkpoint blocker (IgG4), core fucosylation is irrelevant (no effector function required). This MoA-driven CQA assignment is mandated by ICH Q8(R2) ("Pharmaceutical Development"), which requires a science- and risk-based approach to quality attribute identification, and ICH Q9 ("Quality Risk Management"), which provides the framework for CQA criticality ranking. The CMC development strategy — from process development priorities to analytical method selection to specification setting — flows directly from the MoA-CQA nexus. Getting this wrong leads to either over-specification (testing attributes that do not affect safety or efficacy) or under-specification (failing to control attributes that critically affect the mechanism).',
    },
    {
      type: 'table',
      title: 'Master Table: MoA Type → CQA Hierarchy → Potency Assay → Analytical Focus',
      headers: ['MoA Type', 'Critical CQAs', 'Less Critical CQAs', 'Potency Assay Type', 'Key Analytical Focus'],
      rows: [
        [
          'Neutralisation / Blockade',
          'Binding affinity (KD), epitope integrity, charge variants (affect binding)',
          'Glycosylation (if effector-silent Fc), Fc effector function',
          'Cell-based ligand-blocking reporter assay (NFAT-luc); binding inhibition ELISA',
          'SPR kinetics (kon, koff, KD); epitope mapping (HDX-MS); charge variant profile (icIEF)',
        ],
        [
          'ADCC',
          'Core fucosylation (%), FcgammaRIIIa binding, galactosylation, afucosylation level',
          'C1q binding, FcRn binding (unless PK-dependent)',
          'ADCC reporter bioassay (Jurkat-FcgammaRIIIa-NFAT-luc); primary NK cell ADCC',
          'Glycan profiling (HILIC-FLD); fucosylation by CE-LIF; FcgammaRIIIa SPR',
        ],
        [
          'ADCP',
          'FcgammaRI/FcgammaRIIa binding, Fc glycosylation, aggregation (opsonisation)',
          'C1q binding, FcgammaRIIIa binding (minor ADCP role)',
          'MDM phagocytosis assay (flow cytometry); characterisation-level (not lot release)',
          'FcgammaRIIa binding (SPR, both allotypes H131/R131); macrophage polarisation markers',
        ],
        [
          'CDC',
          'C1q binding, galactosylation (G0F/G1F/G2F), hexamerisation capacity, CH2 integrity',
          'FcgammaRIIIa binding (unless ADCC also contributes), sialylation',
          'Complement-dependent lysis assay (serum complement + target cells); C1q binding ELISA',
          'Glycan galactosylation profile; C1q SPR; complement regulatory protein expression on target cells',
        ],
        [
          'ADC',
          'DAR distribution, linker integrity, free drug, conjugation site, internalisation rate',
          'Fc effector function (usually irrelevant), charge variants (unless affecting binding)',
          'Cell-based cytotoxicity assay (CellTiter-Glo/MTT, 72–120 h); target binding ELISA',
          'DAR by HIC/rpHPLC/native MS; free drug by LC-MS; linker stability by forced degradation',
        ],
        [
          'T Cell Redirection',
          'CD3 binding affinity (tuned), TAA binding affinity, bridging activity, Fc silence',
          'Glycosylation (minimal role), aggregation (affects CD3 binding avidity)',
          'T cell-dependent cellular cytotoxicity (TDCC) co-culture assay; dual-binding SPR',
          'Dual-arm binding kinetics (SPR); FcgammaR binding absence (confirm Fc silence); potency vs CRS risk balance',
        ],
        [
          'Agonist (TNFR SF)',
          'FcgammaRIIb binding (IgG1) or IgG2 isoform ratio, aggregation (crosslinking confound)',
          'FcgammaRIIIa binding (may cause unwanted ADCC), C1q binding',
          'NF-kappaB reporter assay with FcgammaRIIb crosslinking; plate-bound format for characterisation',
          'IgG2 disulfide isoform profiling; aggregation vs potency correlation; FcgammaRIIb SPR (both allotypes)',
        ],
        [
          'Receptor Crosslinking / Apoptosis',
          'Aggregation (confounding crosslinking), valency/format integrity, death domain engagement',
          'Glycosylation (if Fc-independent mechanism), standard Fc attributes',
          'Caspase-3/7 activation or cell viability assay (crosslinker-free format); ± secondary XL for characterisation',
          'HMW by SEC-HPLC (aggregation control); format integrity by native MS; potency in crosslinker-free conditions',
        ],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '2. CQA Criticality Ranking — The Risk Matrix Approach',
      color: 'green',
      content:
        'ICH Q9 provides the risk management framework for CQA ranking. The standard approach is a Failure Mode and Effects Analysis (FMEA) or a risk priority matrix where each quality attribute is scored across three dimensions: (1) Severity — the clinical impact if the attribute deviates from the acceptable range (e.g., complete loss of ADCC for an ADCC-dependent mAb is high severity; 10% shift in charge variant profile for the same mAb is moderate severity). (2) Occurrence — the likelihood that the attribute will deviate during manufacturing (e.g., fucosylation levels routinely vary by 5-15% between batches; N-terminal pyroglutamate formation is nearly universal at >95%). (3) Detectability — the ability of the analytical control strategy to detect the deviation before lot release (e.g., ADCC potency is directly measured at release; charge variants are monitored by icIEF). The composite risk score (Severity x Occurrence x Detectability, or a weighted variant) determines whether the attribute is classified as Critical (directly impacts safety/efficacy, tight specification), Important (moderate impact, specification with wider range), or Not Critical (minimal impact, monitor but no specification). The MoA dictates the severity score, which is the dominant factor in criticality ranking.',
    },
    {
      type: 'card',
      title: '3. Glycosylation CQA Assignment — MoA-Dependent',
      color: 'amber',
      content:
        'Glycosylation is the paradigmatic example of MoA-dependent CQA assignment. The N297 glycan on IgG Fc influences ADCC (fucosylation), CDC (galactosylation), ADCP (via FcgammaR binding), anti-inflammatory activity (sialylation), and serum half-life (high-mannose clearance via mannose receptor). For an ADCC-dependent mAb: fucosylation is critical (afucosylated fraction specification, e.g., <5% or >95% depending on the engineering intent). Galactosylation is moderate (affects CDC, which may be secondary). High-mannose is moderate (accelerated clearance if >10-15%). For a neutralising mAb with effector-silent Fc: the entire glycosylation profile is less critical — it affects neither the Fab-mediated blockade mechanism nor the engineered effector silence. Glycan specifications can be wider. For an ADC: glycosylation affects neither the payload delivery mechanism nor the cytotoxic activity (unless conjugation is glycan-based, e.g., transglutaminase at Q295 after N297Q). For a CDC-dependent mAb: galactosylation is critical (G2F enhances C1q binding), while fucosylation is less critical (ADCC is secondary to CDC). This attribute-by-attribute analysis, driven by MoA, is the foundation of the glycosylation specification strategy in CTD Module 3.2.S.4.5.',
    },
    {
      type: 'card',
      title: '4. Potency Assay Selection — Aligned with MoA',
      color: 'purple',
      content:
        'ICH Q6B states that the potency assay must be "relevant to the mechanism of action." This seemingly simple requirement has profound implications for assay design. The potency assay must measure the rate-limiting or defining step of the therapeutic mechanism. For neutralising mAbs: the potency assay measures blockade of the ligand-receptor interaction (cell-based reporter assay showing inhibition of pathway signalling). For ADCC-dependent mAbs: the potency assay measures FcgammaRIIIa-mediated effector function (ADCC reporter bioassay or primary NK cell killing assay). For ADCs: the potency assay measures end-to-end payload delivery and cell killing (cytotoxicity assay with 72-120 h incubation). For T cell engagers: the potency assay measures T cell-mediated target cell killing in a co-culture system. The consequence for multi-mechanism mAbs (e.g., trastuzumab: HER2 blockade + ADCC + ADCP) is that multiple potency-related assays may be needed: a primary potency assay reflecting the dominant mechanism and supplementary functional assays capturing secondary mechanisms. The primary potency assay appears in the specification (CTD 3.2.S.4.1 and 3.2.P.5.1); supplementary assays appear in characterisation (3.2.S.3) and may be used for comparability.',
    },
    {
      type: 'table',
      title: 'Fc Engineering Decisions Driven by MoA',
      headers: ['MoA', 'Desired Fc Profile', 'Subclass / Mutation', 'CQAs Eliminated', 'CQAs Added'],
      rows: [
        ['Neutralisation (ligand)', 'Effector-silent, long half-life', 'IgG4-S228P or IgG1-LALA-PG', 'ADCC, CDC, ADCP assays not needed', 'Fab-arm exchange (IgG4), LALA-PG confirmation'],
        ['ADCC-enhanced', 'Maximum FcgammaRIIIa binding', 'IgG1 afucosylated (FUT8-KO)', 'None eliminated', 'Fucosylation specification (tight), ADCC potency'],
        ['CDC-enhanced', 'Maximum C1q binding', 'IgG1 + HexaBody (E430G)', 'None eliminated', 'Hexamerisation capacity, galactosylation specification'],
        ['T cell engager', 'Effector-silent, FcRn-positive', 'IgG1-LALA-PG or IgG4 backbone', 'ADCC, CDC assays → absence confirmation', 'Dual-arm potency, CD3 affinity, bridging assay'],
        ['ADC', 'Depends on desired effector function', 'IgG1 (T-DM1) or engineered', 'Some Fc assays reduced', 'DAR, free drug, linker stability, conjugation chemistry'],
        ['Agonist (TNFR SF)', 'FcgammaRIIb crosslinking or IgG2 self-XL', 'IgG1 (FcgammaRIIb-dependent) or IgG2', 'Standard ADCC assay may mislead', 'FcgammaRIIb binding SPR, IgG2 isoform, XL-dependent potency'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '5. Comparability Assessment — MoA-Informed Strategy',
      color: 'teal',
      content:
        'When a manufacturing process change occurs (facility transfer, cell line change, media change, scale-up), comparability assessment must evaluate the impact on quality attributes. The ICH Q5E framework requires that the comparability exercise is risk-based and focused on attributes that affect safety and efficacy — which means MoA-critical CQAs receive the most stringent comparability criteria. Tiered comparability approach: Tier 1 (most stringent, equivalence testing with predefined margins): MoA-critical CQAs — potency, binding to the primary target, and the critical Fc function (ADCC, CDC, or confirmed absence). Tier 2 (quality range comparison): Important but less critical attributes — glycosylation profile, charge variants, aggregation, oxidation. Tier 3 (characterisation-level comparison): Descriptive attributes — higher-order structure (CD, DSC, HDX-MS), peptide map coverage, disulfide connectivity. For biosimilar development, the FDA and EMA have formalised this tiered approach: ADCC potency similarity for rituximab biosimilars requires an equivalence margin (e.g., 80-125% relative potency), while charge variant profile similarity uses a quality range approach (within the originator variability range). The MoA determines which attributes are Tier 1.',
    },
    {
      type: 'card',
      title: '6. Specification Setting — MoA-Aligned Acceptance Criteria',
      color: 'red',
      content:
        'Specification limits (CTD 3.2.S.4.5 / 3.2.P.5.6) must be justified based on clinical relevance, which is determined by MoA. For MoA-critical CQAs: specifications are set tightly based on the range demonstrated in clinical material (clinical experience range) and supported by structure-function studies demonstrating the impact of attribute variation on the critical function. Example: for an afucosylated anti-CD20 mAb with ADCC as the primary MoA, the specification for afucosylated glycoform fraction might be >=90% (based on the structure-function relationship showing ADCC drops significantly below 85% afucosylation). For non-MoA-critical attributes: specifications can be wider, set based on manufacturing capability (process range) and general safety considerations (e.g., aggregation <2% for immunogenicity risk, regardless of MoA). The specification strategy directly reflects the CQA criticality ranking, which traces back to the MoA analysis. This MoA → CQA → specification cascade must be clearly articulated in the CTD Module 3.2.S.2.6 (manufacturing process development) and cross-referenced in 3.2.S.4.5 (specification justification).',
    },
    {
      type: 'bullets',
      title: 'Multi-Mechanism Antibodies — Integrated CQA Strategy',
      items: [
        'Trastuzumab (anti-HER2): MoA includes HER2 signalling blockade + ADCC + ADCP + receptor downregulation. CQA hierarchy: HER2 binding affinity (critical for all mechanisms), FcgammaRIIIa binding and ADCC potency (critical for immune effector mechanisms), glycosylation/fucosylation (critical for ADCC), internalisation rate (less critical for naked mAb, would become critical for T-DM1 ADC). Potency assay: cell-based anti-proliferation assay (BT-474 or SK-BR-3) + ADCC reporter assay.',
        'Rituximab (anti-CD20 type I): MoA includes CDC + ADCC + ADCP + direct apoptosis (minor). CQA hierarchy: C1q binding and CDC potency (critical in blood/CLL context), FcgammaRIIIa binding and ADCC potency (critical in tissue/lymphoma context), galactosylation (critical for CDC), fucosylation (critical for ADCC). Potency assay: CDC lysis assay (WIL2-S + human complement) as primary; ADCC reporter assay as supplementary.',
        'Cetuximab (anti-EGFR): MoA includes EGFR signalling blockade + ADCC + receptor downregulation. CQA hierarchy: EGFR binding and blockade (critical), ADCC potency (contributing mechanism), alpha-gal glycoform (critical safety CQA — anaphylaxis risk), galactosylation/fucosylation (important for ADCC). Potency assay: cell-based proliferation inhibition (A431 cells).',
        'Daratumumab (anti-CD38): MoA includes CDC + ADCC + ADCP + direct apoptosis + immunomodulation. Multiple effector mechanisms, each with CQA implications. Requires comprehensive CQA assessment covering CDC, ADCC, ADCP, and complement pathway attributes.',
        'Atezolizumab (anti-PD-L1, N297A): MoA is purely PD-L1 blockade — all Fc effector functions deliberately eliminated. CQA hierarchy: PD-L1 binding affinity (critical), N297A aglycosylation confirmation (critical — must demonstrate absence of effector functions), FcRn binding (critical for PK). Potency assay: PD-1/PD-L1 blocking reporter assay. Fc effector function assays: negative control confirmation only.',
      ],
    },
    {
      type: 'callout',
      title: 'Regulatory Expectation — MoA Justification in CTD Module 3',
      variant: 'info',
      content:
        'Regulatory reviewers expect a clear, documented linkage from MoA to CQA assignment to specification in the CTD dossier. The standard expectation: Module 3.2.S.3.1 (Elucidation of Structure) establishes the higher-order structure and post-translational modifications. Module 3.2.S.3.2 (Biological Activity) presents the potency assay data, explicitly justified relative to the MoA. Module 3.2.S.2.6 (Manufacturing Process Development) includes the CQA risk assessment table linking each quality attribute to its impact on safety and efficacy via MoA. Module 3.2.S.4.5 (Specification Justification) references the CQA ranking to justify why certain specifications are tight (critical CQAs) and others are wider (non-critical). This end-to-end narrative — MoA → structure-function → CQA ranking → process control → specification — is the backbone of a science-based CMC submission.',
    },
    {
      type: 'callout',
      title: 'Key Takeaway — The MoA-First Mindset',
      variant: 'success',
      content:
        'The most common CMC development error is treating all quality attributes with equal importance, applying a generic mAb analytical platform without MoA-informed prioritisation. This leads to over-testing of irrelevant attributes (e.g., ADCC potency for an anti-PD-1 IgG4), under-testing of critical attributes (e.g., DAR distribution for an ADC tested only by SEC), and specification ranges that do not reflect the clinical risk. The MoA-first mindset asks: "What must this molecule do to produce the clinical effect?" From this answer, all CMC decisions cascade logically: which quality attributes are critical (and must be tightly controlled), which analytical methods are needed (and at what level of validation), what the potency assay measures (and how it is qualified), and how comparability is assessed for process changes. This MoA-to-CQA integration is what distinguishes a science-driven CMC programme from a checklist-driven one.',
    },
    {
      type: 'card',
      title: '7. Biosimilar CQA Assessment — MoA-Informed Similarity Criteria',
      color: 'purple',
      content:
        'Biosimilar development provides the clearest practical application of MoA-driven CQA ranking. FDA and EMA guidance (e.g., FDA 2015 biosimilar guidance, EMA "Similar Biological Medicinal Products" guideline) explicitly require that the analytical similarity exercise be structured based on the MoA of the reference product. For rituximab biosimilars: ADCC similarity (Tier 1), CDC similarity (Tier 1), C1q binding (Tier 1), FcgammaRIIIa binding (Tier 1), glycosylation profile including fucosylation and galactosylation (Tier 1). For adalimumab biosimilars: TNF-alpha binding and neutralisation (Tier 1), ADCC potency (Tier 2 — contributing but not primary mechanism), CDC (Tier 3 — minimal role). For pembrolizumab biosimilars (hypothetical): PD-1 binding and PD-L1 blockade (Tier 1), FcgammaR binding absence (Tier 1 — must demonstrate effector silence), IgG4 Fab-arm exchange (Tier 1 — S228P confirmation). The tier assignment directly reflects which mechanisms drive clinical efficacy and safety, enabling a focused, efficient analytical programme that satisfies regulatory expectations without unnecessary testing.',
    },
    {
      type: 'card',
      title: '8. Emerging MoAs — Expanding the CQA Framework',
      color: 'green',
      content:
        'New antibody modalities require extension of the traditional MoA-CQA framework. (1) Antibody-cytokine fusions (immunocytokines): The MoA combines target-mediated localisation with cytokine receptor activation. CQAs include cytokine bioactivity, linker integrity, and receptor binding on both the antibody and cytokine moieties. (2) Fc-engineered half-life-extended antibodies (YTE, LS mutations): The MoA relies on enhanced FcRn binding (M252Y/S254T/T256E or M428L/N434S). FcRn binding affinity at pH 6.0 (binding) and pH 7.4 (release) becomes a critical CQA. (3) pH-dependent (recycling) antibodies: Engineered to bind target at neutral pH and release in the acidic endosome, enabling target clearance while recycling the antibody. pH-dependent binding kinetics (SPR at pH 7.4 vs pH 5.8) is a unique CQA. (4) Bispecific ADCs: Combine bispecific target engagement with ADC payload delivery — the CQA framework must cover chain pairing, dual-arm binding, DAR, linker stability, and potency in a single integrated system. Each new modality extends the CQA assessment to include the unique molecular features that drive the specific mechanism.',
    },
  ],
  mentorQuestions: [
    'Construct the complete CQA risk assessment table for a hypothetical anti-PD-L1 x VEGF bispecific antibody (IgG1 backbone, KiH format, one arm blocks PD-L1, other arm neutralises VEGF-A), assigning criticality rankings for glycosylation, effector function, chain pairing, and each arm binding affinity.',
    'If you are a CMC reviewer at the EMA assessing a biosimilar rituximab, and the applicant shows equivalent ADCC but 20% lower CDC compared to the originator, how would you apply the MoA-CQA framework to decide whether this difference is clinically relevant?',
    'For a multi-mechanism mAb like trastuzumab where ADCC, signalling blockade, and receptor downregulation all contribute to efficacy, how would you prioritise potency assay development — which mechanism gets the primary lot-release assay and why?',
  ],
};
