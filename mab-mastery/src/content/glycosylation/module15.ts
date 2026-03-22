import type { ModuleContent } from '../../types/content';

export const module15: ModuleContent = {
  id: 'glycosylation-m15',
  sectionId: 'glycosylation',
  moduleNumber: 15,
  eyebrow: 'GLYCOSYLATION 16',
  title: 'QTPP → Glycan CQA Decision Map',
  lead: 'The decision tree for classifying glycan quality attributes based on mechanism of action — with four worked examples covering the major therapeutic paradigms.',
  tags: [
    { label: 'Decision Tree', color: 'green' },
    { label: 'QTPP', color: 'blue' },
    { label: 'Risk-Based', color: 'amber' },
    { label: 'Worked Examples', color: 'purple' },
  ],
  stats: [
    { label: 'Decision Nodes', value: '8' },
    { label: 'Worked Examples', value: '4' },
    { label: 'Paradigms', value: 'ADCC/CDC/Neutral/YTE' },
    { label: 'Framework', value: 'ICH Q8/Q9' },
  ],
  sections: [
    {
      type: 'card',
      title: 'From QTPP to Glycan CQAs — The Risk-Based Approach',
      color: 'blue',
      content:
        'ICH Q8(R2) defines the Quality Target Product Profile (QTPP) as the prospective summary of quality characteristics that should be achieved to ensure the desired quality, safety, and efficacy. For a therapeutic mAb, the QTPP includes clinical attributes (route of administration, dosage form, strength, PK profile, efficacy, safety) that translate into quality attributes (CQAs) through a risk-based assessment. Glycosylation connects to the QTPP through multiple pathways: (1) Efficacy → if the MoA requires effector function (ADCC, ADCP, CDC), glycan attributes that modulate effector function become CQAs linked to efficacy; (2) PK → glycan attributes affecting clearance (high mannose, Fab glycan sialylation) become CQAs linked to PK profile; (3) Safety → non-human glycan epitopes (α-Gal, Neu5Gc) and immunogenicity-related glycan features become CQAs linked to safety; (4) Stability → glycan attributes affecting structural integrity (NGHC, Man5 on CH2 stability) become CQAs linked to shelf-life. The decision tree below provides a systematic, MoA-driven framework for classifying glycan quality attributes as critical, important, or informational for any given mAb product.',
    },
    {
      type: 'decision',
      title: 'Glycan CQA Classification Decision Tree',
      nodes: [
        {
          id: 'node1',
          question: 'Does the mAb\'s mechanism of action rely on ADCC (antibody-dependent cellular cytotoxicity)?',
          yes: 'node2',
          no: 'node3',
        },
        {
          id: 'node2',
          question: 'Is the product glycoengineered (FUT8 KO, GnTIII OE, or 2F-fucose)?',
          yes: 'result-adcc-eng',
          no: 'result-adcc-wt',
        },
        {
          id: 'result-adcc-eng',
          question: 'Glycoengineered ADCC product pathway',
          result: 'Afucosylation is CRITICAL CQA — set specification ≥90% (FUT8 KO) or ≥70% (GnTIII). Monitor galactosylation as CQA (CDC support). Control Man5 NMT 5% (PK). Bisecting GlcNAc is CQA if GlycoMAb platform. NGHC NMT 1%.',
        },
        {
          id: 'result-adcc-wt',
          question: 'Wild-type CHO ADCC product pathway',
          result: 'Monitor afucosylation as CQA — typical 2-8% in WT CHO; even small changes (e.g., 3% → 6%) can measurably affect ADCC. Galactosylation is CQA. Man5 NMT 5%. NGHC NMT 1%. Consider glycoengineering if clinical data show insufficient ADCC at WT afucosylation levels.',
        },
        {
          id: 'node3',
          question: 'Does the mAb\'s mechanism of action rely on CDC (complement-dependent cytotoxicity)?',
          yes: 'result-cdc',
          no: 'node4',
        },
        {
          id: 'result-cdc',
          question: 'CDC-dependent product pathway',
          result: 'Galactosylation is the primary glycan CQA — G2F species enhance C1q binding. Set galactosylation specification (G1+G2 combined). Afucosylation monitored but not primary driver (fucose has minimal CDC impact). Man5 NMT 5% (PK). Sialylation CQA — high sialylation may reduce CDC. NGHC NMT 1%.',
        },
        {
          id: 'node4',
          question: 'Is this a blocking/neutralising mAb with no intended effector function?',
          yes: 'node5',
          no: 'result-full-panel',
        },
        {
          id: 'result-full-panel',
          question: 'Mixed or undefined MoA pathway',
          result: 'Full glycan CQA panel applies — monitor afucosylation, galactosylation, high mannose, sialylation, NGHC all as CQAs. Set specifications based on three-input framework (functional biology, process capability, clinical data). Err on the side of caution when MoA is not fully elucidated.',
        },
        {
          id: 'node5',
          question: 'Does the Fc contain silencing mutations (LALA, LALA-PG, N297A/Q, or YTE)?',
          yes: 'node6',
          no: 'result-blocking-wt',
        },
        {
          id: 'result-blocking-wt',
          question: 'Blocking mAb, wild-type Fc pathway',
          result: 'Standard glycan CQA panel. Effector function glycan CQAs (afucosylation, galactosylation) are still relevant because the WT Fc retains effector function capability. While not therapeutically intended, unwanted ADCC/CDC could cause safety issues (e.g., depletion of target-expressing normal cells). Man5 NMT 5% (PK). NGHC NMT 1%.',
        },
        {
          id: 'node6',
          question: 'Does the Fc engineering include N297A/Q (aglycosylation mutation)?',
          yes: 'result-aglyco',
          no: 'result-silenced',
        },
        {
          id: 'result-aglyco',
          question: 'Aglycosylated Fc pathway (N297A/Q)',
          result: 'No Fc glycosylation by design — N297A/Q eliminates the glycosylation sequon. Glycan CQAs do not apply to the Fc. However, if Fab glycosylation sites exist, Fab glycan CQAs still apply (antigen binding, PK, immunogenicity). Monitor residual glycosylation (confirm N297 site is truly unoccupied). CH2 stability is reduced — monitor aggregation as CQA.',
        },
        {
          id: 'result-silenced',
          question: 'Fc-silenced (LALA/LALA-PG/YTE) pathway',
          result: 'Glycans remain as CQAs for PK (Man5 → MR clearance), immunogenicity (Neu5Gc), and structural stability (NGHC), but effector-function-linked glycan specifications can be wider. Afucosylation and galactosylation are monitored for consistency but are not functionally critical because LALA/LALA-PG mutations abrogate FcγR and C1q binding regardless of glycan status. Man5 NMT 5% (PK protection). NGHC NMT 2% (wider than ADCC products). If YTE mutations present, monitor Met252Tyr oxidation impact on CH2 glycan stability.',
        },
      ],
    },
    {
      type: 'card',
      title: 'Worked Example 1 — Afucosylated Anti-CD20 (Obinutuzumab-like)',
      color: 'red',
      content:
        'Product profile: Type II anti-CD20 mAb, IgG1, glycoengineered (GlycoMAb platform — GnTIII overexpression + Golgi-targeted ManII), indicated for CLL and follicular lymphoma. MoA: ADCC-dependent B cell depletion + direct programmed cell death. Decision tree path: Node 1 → YES (ADCC-dependent) → Node 2 → YES (glycoengineered, GnTIII OE). Glycan CQA classification: (1) Afucosylation — CRITICAL CQA. The GlycoMAb platform targets ≥70% afucosylated species. Specification: ≥70% total afucosylated (measured by HILIC-UPLC-FLR). Justification: ADCC activity correlates linearly with afucosylation up to ~70%, then plateaus. Below 70%, ADCC potency drops below the specification minimum. (2) Bisecting GlcNAc — CQA (platform-specific). Monitor bisecting species as indicator of GnTIII expression stability. Specification: report result with trending. (3) Galactosylation — CQA. G2F enhances C1q binding; obinutuzumab also utilises CDC as secondary mechanism. Specification: total galactosylated (G1+G2) 40-70%. (4) Man5 — CQA. NMT 5% to protect PK. (5) Sialylation — CQA. NMT 10% (anti-inflammatory shift concern). (6) NGHC — CQA. NMT 1% (effector function and stability). Total glycan CQAs: 6 specified attributes.',
    },
    {
      type: 'card',
      title: 'Worked Example 2 — LALA Anti-Cytokine (Dupilumab-like)',
      color: 'purple',
      content:
        'Product profile: Anti-IL-4Rα mAb, IgG4 (S228P stabilised hinge), indicated for atopic dermatitis, asthma, and chronic rhinosinusitis with nasal polyps. MoA: Blocking — prevents IL-4 and IL-13 signalling by occupying IL-4Rα. No effector function required (IgG4 naturally has reduced effector function; S228P prevents Fab-arm exchange). Decision tree path: Node 1 → NO → Node 3 → NO → Node 4 → YES (blocking mAb) → Node 5 → IgG4 with S228P (functionally similar to Fc-silenced). Glycan CQA classification: (1) Afucosylation — monitored for consistency but NOT critical for MoA. IgG4 has inherently low FcγRIIIa binding regardless of fucosylation. Specification: report result with trending (no hard limit). (2) Galactosylation — CQA (moderate) for process consistency and C1q binding (IgG4 has negligible C1q binding, but monitoring ensures consistency). Specification: total galactosylated 30-60%. (3) Man5 — CQA. NMT 5% (PK protection). (4) Sialylation — CQA (moderate). NMT 15% (wider than ADCC products — less functionally critical). (5) NGHC — CQA. NMT 2% (wider than ADCC products — reduced effector function impact). Total glycan CQAs: 4 specified attributes (fewer and wider than ADCC-dependent products).',
    },
    {
      type: 'card',
      title: 'Worked Example 3 — Standard IgG1 Anti-PD-1 (Pembrolizumab-like)',
      color: 'green',
      content:
        'Product profile: Anti-PD-1 mAb, IgG4 (S228P), indicated for multiple solid tumours. MoA: Immune checkpoint blockade — blocks PD-1/PD-L1 interaction to restore T cell anti-tumour immunity. No effector function required (blocking MoA). However, PD-1 is expressed on the T cells that the mAb is trying to activate — ADCC/CDC against PD-1+ T cells would be counterproductive. Decision tree path: Node 1 → NO → Node 3 → NO → Node 4 → YES (blocking) → Node 5 → IgG4 S228P (functionally Fc-silenced). Glycan CQA classification: (1) Afucosylation — monitored but NOT critical. In fact, higher afucosylation would be undesirable because it would enhance ADCC against PD-1+ T cells (the very cells needed for anti-tumour immunity). Specification: report result; investigate if afucosylation trends upward. (2) Galactosylation — CQA (moderate). Specification: total galactosylated 25-55%. (3) Man5 — CQA. NMT 5%. (4) Sialylation — CQA (moderate). NMT 15%. (5) NGHC — CQA. NMT 2%. Key insight: For anti-PD-1 mAbs, glycoengineering for enhanced ADCC would be contraindicated — the glycan specification should ensure that afucosylation does NOT increase substantially, which is the opposite strategy from anti-CD20 products.',
    },
    {
      type: 'card',
      title: 'Worked Example 4 — YTE Half-Life Extended mAb',
      color: 'amber',
      content:
        'Product profile: Anti-target mAb, IgG1 with YTE mutations (M252Y/S254T/T256E in CH2), designed for extended half-life through enhanced FcRn binding at pH 6.0. Indicated for chronic disease requiring infrequent dosing. MoA: Blocking + enhanced PK. The YTE mutations are in the CH2 domain, adjacent to the Asn297 glycan, creating a unique glycan-engineering interface. Decision tree path: Node 1 → assess based on target biology (varies) → Node 4 → depends on blocking vs effector → Node 5 → YTE mutations present (Fc engineered but not for silencing). Glycan CQA classification: (1) Standard glycan panel (afucosylation, galactosylation, Man5, sialylation, NGHC) — all apply with specifications determined by MoA. (2) Additional CQA — Met252Tyr oxidation: The M252Y mutation in YTE introduces a tyrosine at position 252 (replacing methionine), and this tyrosine is susceptible to oxidation. Tyr252 is near the Asn297 glycan, and its oxidation can alter CH2 conformation, potentially affecting: (a) glycan presentation and FcγR binding; (b) FcRn binding at the CH2-CH3 interface; (c) CH2 thermal stability. Specification: Monitor Tyr252 oxidation by peptide mapping (RP-LC-MS/MS) and correlate with glycan profile changes. (3) Man5 — particularly critical for YTE mAbs because enhanced FcRn recycling means that MR-mediated clearance (from Man5) can disproportionately impact PK of the high-mannose subpopulation. The effective half-life of Man5-bearing YTE mAb is shorter than expected from FcRn enhancement alone. Specification: NMT 3% (tighter than standard 5%).',
    },
    {
      type: 'table',
      title: 'Glycan CQA Specifications Across Therapeutic Paradigms',
      headers: ['Glycan CQA', 'ADCC-Eng (Anti-CD20)', 'Blocking IgG4 (Anti-IL4Rα)', 'Blocking IgG4 (Anti-PD-1)', 'YTE Extended (Variable)'],
      rows: [
        ['Afucosylation', '≥70-90% (CRITICAL)', 'Report result', 'Report result (monitor for increase)', 'MoA-dependent'],
        ['Total galactosylated', '40-70%', '30-60%', '25-55%', 'MoA-dependent'],
        ['Man5', 'NMT 5%', 'NMT 5%', 'NMT 5%', 'NMT 3% (tighter)'],
        ['Sialylation', 'NMT 10%', 'NMT 15%', 'NMT 15%', 'NMT 10%'],
        ['NGHC', 'NMT 1%', 'NMT 2%', 'NMT 2%', 'NMT 1%'],
        ['Bisecting GlcNAc', 'CQA (GlycoMAb)', 'Report', 'Report', 'Report'],
        ['Additional CQAs', 'None', 'None', 'Monitor ↑ afucosylation', 'Tyr252 oxidation; Man5-PK correlation'],
        ['Number of specified CQAs', '6', '4', '4', '5-6'],
        ['Specification stringency', 'Tightest', 'Moderate', 'Moderate', 'Tight (PK-driven)'],
      ],
      sortable: false,
    },
    {
      type: 'callout',
      title: 'The Anti-PD-1 Paradox — When Enhanced ADCC Is Unwanted',
      variant: 'danger',
      content:
        'Anti-PD-1 mAbs illustrate a critical principle: glycoengineering for enhanced ADCC is not universally beneficial. PD-1 is expressed on the very CD8+ T cells that mediate anti-tumour immunity. ADCC-enhanced anti-PD-1 would kill PD-1+ T cells — the cells that the checkpoint blockade therapy is designed to activate. This is why pembrolizumab and nivolumab use IgG4 (which has minimal ADCC) rather than IgG1. If an anti-PD-1 were produced in a glycoengineered cell line with high afucosylation, the residual ADCC activity (even with IgG4) could compromise efficacy by depleting activated T cells. The glycan specification for anti-PD-1 products should therefore include monitoring for unexpected increases in afucosylation — a process deviation that increased afucosylation would be a quality concern, not an improvement. This paradigm applies broadly to any mAb targeting cells that should not be depleted: anti-PD-L1 on tumour-infiltrating immune cells (complex situation), anti-CD3 (T cell depletion risk), anti-CD28 (superagonist risk).',
    },
    {
      type: 'card',
      title: 'ICH Q8/Q9 Integration — Risk Assessment Tools',
      color: 'teal',
      content:
        'The decision tree integrates with ICH Q8 (Pharmaceutical Development) and Q9 (Quality Risk Management) through formal risk assessment tools: (1) FMEA (Failure Mode and Effects Analysis) — for each glycan CQA, evaluate Severity (impact on patient), Occurrence (probability of out-of-spec), and Detectability (ability to measure and detect out-of-spec). The Risk Priority Number (RPN = S × O × D) ranks glycan CQAs. For an ADCC-dependent product: Afucosylation S=10, O=2, D=2, RPN=40 (high priority). For a blocking IgG4: Afucosylation S=3, O=2, D=2, RPN=12 (lower priority). (2) Risk ranking matrix — plot Severity vs Probability for all glycan CQAs, creating a visual risk map that identifies which attributes require the tightest control. (3) Knowledge management — the decision tree captures institutional knowledge about glycan-function relationships and provides a structured framework for training new CMC scientists. It should be maintained as a living document, updated as new structure-function data become available. The ICH Q9 framework ensures that glycan CQA classification is documented, traceable, and justifiable during regulatory review.',
    },
    {
      type: 'card',
      title: 'Biosimilar Application of the Decision Tree',
      color: 'purple',
      content:
        'For biosimilar development, the decision tree is applied to the reference product to understand which glycan CQAs are most critical for analytical similarity assessment. The FDA totality-of-evidence framework and EMA similarity guidelines require that biosimilar glycan profiles fall within the quality range of the reference product for all glycan CQAs. However, not all glycan attributes carry equal weight in the similarity assessment: (1) For an ADCC-dependent reference product (e.g., rituximab), afucosylation is the highest-priority glycan similarity attribute, and the biosimilar must demonstrate near-identical afucosylation levels with demonstrated FcγRIIIa binding comparability. (2) For a blocking reference product (e.g., adalimumab), galactosylation and Man5 are higher priority than afucosylation, because the clinical MoA does not depend on ADCC. (3) For all biosimilars, non-human glycan epitopes (Neu5Gc, α-Gal) must be comparable to the reference product — a biosimilar with significantly higher Neu5Gc could have a different immunogenicity profile. The decision tree guides the risk-based design of the analytical similarity assessment, focusing resources on the glycan CQAs most relevant to clinical outcomes for each specific reference product.',
    },
    {
      type: 'bullets',
      title: 'Applying the Framework — Practical Steps',
      items: [
        'Step 1: Define the QTPP for your mAb product, explicitly stating the clinical MoA, target biology, intended patient population, dosing regimen, and route of administration. The QTPP is the starting point for all CQA classification.',
        'Step 2: Walk through the decision tree using the product-specific MoA. Document the path taken and the rationale at each decision node. If the MoA involves multiple mechanisms (e.g., ADCC + blocking), take the most stringent path.',
        'Step 3: For each glycan attribute classified as CQA, apply the three-input specification framework (functional biology, process capability, clinical data) to set justified acceptance criteria.',
        'Step 4: Document the glycan CQA classification in a formal risk assessment report (FMEA or equivalent), linked to the QTPP and the control strategy. This report becomes part of the regulatory submission (CTD Module 3.2.S.2.6 or 3.2.P.2.3).',
        'Step 5: Design the analytical method panel to ensure adequate characterisation and control of all identified glycan CQAs. The method panel must be validated for its intended purpose (release, stability, characterisation) per ICH Q2(R2).',
        'Step 6: Establish the process control strategy linking upstream CPPs to glycan CQAs through the CPP-CQA map (Module 10). Ensure that PAT and in-process controls are in place to detect glycan deviations before lot release.',
        'Step 7: Review and update the glycan CQA classification at each development milestone (Phase transitions, process changes, post-approval). New functional data, clinical experience, or process understanding may shift CQA criticality rankings.',
      ],
    },
    {
      type: 'callout',
      title: 'Knowledge Check — Integrating Across the Glycosylation Section',
      variant: 'success',
      content:
        'This module integrates concepts from across the entire Glycosylation section: (1) Glycan structure and nomenclature (Modules 1-2) inform the decision tree node definitions; (2) Functional biology (Modules 3-5 on ADCC, CDC, PK) provides the Input 1 data for specification setting; (3) Non-glycosylated HC, bisecting GlcNAc, and Fab glycosylation (Modules 8-9, 12) feed specific CQA classifications; (4) Upstream CPP-CQA relationships (Module 10) and glycoengineering strategies (Module 11) determine process capability and control options; (5) Analytical methods (Module 13) define the toolkit for measuring and monitoring each glycan CQA; (6) Specification setting (Module 14) provides the three-input framework applied in the worked examples. Mastery of this decision tree demonstrates the ability to think across the entire glycosylation knowledge domain — connecting molecular biology, process engineering, analytical science, and regulatory strategy into a coherent CMC framework.',
    },
  ],
  mentorQuestions: [
    'You are developing an anti-CD38 mAb (IgG1) for multiple myeloma. CD38 is expressed on both myeloma cells (target) and NK cells (effector cells for ADCC). Walk through the decision tree — what unique glycan CQA considerations arise from this dual-expression biology?',
    'A biosimilar developer asks you to prioritise glycan similarity attributes for a rituximab biosimilar versus an adalimumab biosimilar. Using the decision tree, explain why the priority ranking differs between these two products.',
    'Your company is considering adding 2-fluorofucose to an existing anti-HER2 mAb manufacturing process (currently wild-type CHO) to enhance ADCC. Using the decision tree and the three-input framework, outline the complete CMC strategy for this change, including regulatory pathway.',
    'Explain the anti-PD-1 paradox to a clinical colleague who asks why you are not glycoengineering the company\'s checkpoint inhibitor for enhanced ADCC — what patient safety concern does the decision tree highlight?',
  ],
};

export default module15;
