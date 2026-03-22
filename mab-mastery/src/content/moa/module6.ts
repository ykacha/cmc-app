import type { ModuleContent } from '../../types/content';

export const module6: ModuleContent = {
  id: 'moa-m6',
  sectionId: 'moa',
  moduleNumber: 6,
  eyebrow: 'MOA 07',
  title: 'T Cell Redirection — BiTEs and Beyond',
  lead: 'Bispecific T cell engager mechanism: CD3-epsilon crosslinking, immunological synapse formation without MHC restriction, CRS pathophysiology, step-up dosing rationale, and CMC challenges.',
  tags: [
    { label: 'BiTE', color: 'red' },
    { label: 'CD3 Crosslinking', color: 'amber' },
    { label: 'CRS', color: 'purple' },
    { label: 'T Cell Engager', color: 'blue' },
  ],
  stats: [
    { label: 'Pioneer', value: 'Blinatumomab (2014)' },
    { label: 'T Cell Target', value: 'CD3-epsilon' },
    { label: 'Synapse Formation', value: 'MHC-Independent' },
    { label: 'Key Risk', value: 'CRS / Neurotoxicity' },
  ],
  sections: [
    {
      type: 'card',
      title: '1. T Cell Redirection — Conceptual Framework',
      color: 'blue',
      content:
        'T cell redirecting bispecific antibodies (TCBs) are engineered molecules that simultaneously bind a tumour-associated antigen (TAA) on the target cell and the CD3-epsilon subunit of the T cell receptor (TCR) complex on T cells. This creates a forced immunological synapse between the T cell and the tumour cell, bypassing the normal requirement for MHC-peptide-TCR recognition. The power of this approach is that it recruits the entire polyclonal T cell population regardless of their native TCR specificity — every T cell becomes a potential tumour killer. This is therapeutically transformative because most tumour-infiltrating T cells bear TCRs irrelevant to the tumour. The concept was first validated clinically with blinatumomab (Blincyto), a BiTE (bispecific T cell engager) targeting CD19 on B cell malignancies and CD3-epsilon on T cells, approved in 2014 for Ph-negative relapsed/refractory B-ALL. Since then, multiple T cell engager formats have entered clinical development: IgG-based TCBs, DARTs, half-life-extended BiTEs, and trispecific formats.',
    },
    {
      type: 'card',
      title: '2. CD3-Epsilon Crosslinking — Signal 1 Without Signal 2',
      color: 'teal',
      content:
        'The CD3 complex comprises CD3-epsilon/delta and CD3-epsilon/gamma heterodimers plus the CD3-zeta/zeta homodimer, which together associate with the TCR alpha-beta heterodimer. CD3 subunits contain immunoreceptor tyrosine-based activation motifs (ITAMs) in their cytoplasmic tails — a total of 10 ITAMs per TCR-CD3 complex (1 each in gamma, delta, and two epsilon chains, plus 3 in each zeta chain). T cell engagers bind CD3-epsilon specifically, which is the most accessible subunit in the extracellular domain. When the engager simultaneously binds TAA on the target cell and CD3-epsilon on the T cell, the resulting forced proximity triggers TCR-CD3 clustering, ITAM phosphorylation by Lck, and ZAP-70 recruitment — effectively mimicking Signal 1 (TCR engagement) without requiring MHC-peptide recognition. Critically, this occurs without Signal 2 (co-stimulation via CD28/B7 interaction), yet the spatial constraints of the bispecific bridge are sufficient to trigger productive T cell activation, degranulation, and target cell killing. The resulting T cell activation is polyclonal and MHC-independent.',
    },
    {
      type: 'card',
      title: '3. Forced Immunological Synapse Formation',
      color: 'green',
      content:
        'The immunological synapse formed by T cell engagers differs structurally from the conventional TCR-MHC synapse. In a normal synapse, the TCR-MHC interaction spans approximately 13 nm, establishing an intermembrane distance that organises the supramolecular activation cluster (SMAC). T cell engagers create a synapse whose geometry depends on the format: classical BiTE (two scFvs, ~55 kDa) creates a short ~10-15 nm gap, closely mimicking the natural synapse distance. IgG-based TCBs (~150-200 kDa) create a larger intermembrane distance (~20-25 nm), which can affect signalling efficiency. The synapse formed by T cell engagers shows characteristic features of productive immunological synapses: (1) central SMAC (cSMAC) — accumulation of TCR-CD3 complexes and PKC-theta, (2) peripheral SMAC (pSMAC) — LFA-1/ICAM-1 adhesion ring, (3) polarisation of the microtubule-organising centre (MTOC) toward the synapse, and (4) directed granule release. Synapse formation occurs within minutes of T cell engager-mediated bridging and can be visualised by confocal microscopy using conjugate assays.',
    },
    {
      type: 'card',
      title: '4. CRS Mechanism — Cytokine Release Syndrome',
      color: 'red',
      content:
        'Cytokine release syndrome (CRS) is the signature dose-limiting toxicity of T cell engagers. The mechanism: upon T cell activation by the engager, massive polyclonal T cell activation triggers release of pro-inflammatory cytokines — primarily IL-6, TNF-alpha, IFN-gamma, IL-2, and IL-10. IL-6 is the central pathogenic mediator: T cell-derived IFN-gamma activates macrophages, which release IL-6 via trans-signalling (IL-6 + soluble IL-6R activating gp130 on endothelial cells). This IL-6 trans-signalling cascade drives endothelial activation, vascular permeability, hypotension, and capillary leak. The CRS grading scale (ASTCT 2019): Grade 1 — fever alone; Grade 2 — hypotension responsive to fluids, hypoxia requiring low-flow O2; Grade 3 — hypotension requiring vasopressors, hypoxia requiring high-flow O2; Grade 4 — life-threatening, requiring ICU. Tocilizumab (anti-IL-6R) is the standard treatment for Grade 2+ CRS. The CRS risk is highest during the first treatment cycle and correlates with tumour burden, T cell dose (for BiTEs), and the affinity of the CD3-binding arm.',
    },
    {
      type: 'card',
      title: '5. Blinatumomab — The Prototype BiTE',
      color: 'purple',
      content:
        'Blinatumomab (Blincyto) is a 54.1 kDa bispecific single-chain antibody comprising two scFvs (anti-CD19 and anti-CD3-epsilon) connected by a short flexible linker. Its small size confers rapid tissue penetration but also rapid renal clearance (t½ ~2 hours), necessitating continuous intravenous infusion (CIVI) via portable pump over 28-day cycles. The CIVI requirement creates unique CMC challenges: (1) the drug product must be stable in the infusion bag for the entire delivery period at room temperature with ambulatory pump, (2) extremely low protein concentration (~12.5 microg/mL in the infusion bag) creates adsorption losses to IV lines and container surfaces, requiring surfactant optimisation and specialized IV sets, (3) the short half-life means any infusion interruption causes rapid drug level decline. Clinical dosing uses a step-up regimen: 9 microg/day for the first week, escalating to 28 microg/day thereafter, to mitigate first-dose CRS by limiting the initial T cell activation magnitude. The target dose achieves steady-state serum concentrations of ~228 pg/mL (cycle 1) to ~616 pg/mL (subsequent cycles).',
    },
    {
      type: 'table',
      title: 'T Cell Engager Formats — Comparison',
      headers: ['Format', 'MW (kDa)', 'Half-Life', 'Fc Effector', 'Dosing', 'Clinical Example'],
      rows: [
        ['BiTE (tandem scFv)', '~55', '~2 h', 'None', 'CIVI 28-day', 'Blinatumomab (CD19)'],
        ['HLE-BiTE (Fc-fused)', '~105', '~7-10 days', 'Silenced (LALA)', 'Weekly IV', 'Teclistamab precursor format'],
        ['IgG-based TCB (2+1)', '~195', '~6-14 days', 'Silenced (PG-LALA)', 'Q1-3W IV/SC', 'Glofitamab (CD20xCD3)'],
        ['IgG-based TCB (1+1)', '~150', '~12-21 days', 'Silenced (varies)', 'Q1-4W', 'Teclistamab (BCMAxCD3)'],
        ['DART (dual affinity re-targeting)', '~110', '~5-8 days', 'Silenced', 'Weekly IV', 'Flotetuzumab (CD123xCD3)'],
        ['Trispecific (CD38xCD28xCD3)', '~200+', '~10-14 days', 'Silenced', 'Q1-3W', 'SAR442257 (preclinical)'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '6. Step-Up Dosing Rationale — CRS Mitigation',
      color: 'amber',
      content:
        'Step-up dosing (also called ramp-up or priming dosing) is a hallmark of T cell engager clinical regimens. The principle: initial low doses activate a limited number of T cells, causing controlled cytokine release and partial tumour debulking. This "cytokine priming" desensitises the system before the full therapeutic dose is administered. Blinatumomab: 9 microg/day week 1, then 28 microg/day weeks 2-4. Teclistamab: step-up 0.06 mg/kg, then 0.3 mg/kg, then therapeutic 1.5 mg/kg SC weekly. Glofitamab: step-up cycle 1 with obinutuzumab pre-treatment to reduce CD20+ B cell tumour burden and free CD20 epitopes. The molecular basis: first-dose T cell activation is limited by the number of pre-existing effector-memory T cells with cytotoxic potential. The initial low dose activates and expands this population while releasing cytokines at tolerable levels. By the time the full dose is administered, the tumour burden is partially reduced and the cytokine response is attenuated. Step-up dosing impacts CMC because multiple dose strengths or concentrations must be manufactured and released.',
    },
    {
      type: 'card',
      title: '7. Extended Half-Life Formats',
      color: 'teal',
      content:
        'The original BiTE format suffers from extremely short half-life (~2 h), requiring CIVI administration. Multiple engineering strategies extend half-life: (1) Fc fusion (HLE-BiTE): Adding an effector-silent Fc domain (LALA or KiH heterodimeric) to the BiTE increases MW above the renal filtration threshold (~60 kDa) and enables FcRn-mediated recycling, extending t½ to 7-10 days. (2) IgG-based formats: Full IgG backbones naturally provide ~21-day half-life via FcRn. Bispecific IgG formats (KiH, CrossMAb, DVD-Ig) retain this property. (3) Albumin binding: Fusing an anti-albumin domain or albumin-binding peptide extends half-life by piggybacking on albumin FcRn recycling (t½ ~19 days for albumin). (4) PEGylation: Chemical attachment of polyethylene glycol (40 kDa) increases hydrodynamic radius, reducing renal clearance. Less favoured due to potential immunogenicity and manufacturing complexity. The CMC implications of extended half-life are significant: longer-acting formats enable subcutaneous dosing (higher concentration formulations, lower injection volumes) but require demonstration of formulation stability at high protein concentrations (>100 mg/mL) and acceptable viscosity.',
    },
    {
      type: 'bullets',
      title: 'CMC Challenges Unique to T Cell Engagers',
      items: [
        'Dual potency assay requirement: The potency assay must demonstrate simultaneous binding to both targets AND functional T cell-mediated killing. A co-culture assay with TAA-positive target cells + primary T cells (or Jurkat reporter cells) measuring target cell lysis is the standard. Single-arm binding assays are insufficient as standalone potency.',
        'CD3 affinity tuning and CQA designation: The affinity of the CD3-binding arm is deliberately tuned to low-to-moderate affinity (KD ~10-100 nM for CD3 vs ~1-10 nM for TAA) to prevent off-target T cell activation. Any process change that alters CD3-binding affinity is a critical CQA concern.',
        'Effector-silent Fc requirement: T cell engagers must NOT have Fc effector function, because activating FcgammaRIIIa on NK cells via the Fc while simultaneously crosslinking CD3 on T cells would cause uncontrolled immune activation. LALA, LALA-PG, or N297A mutations are standard.',
        'Stability at low concentration: BiTE products require stability at ng/mL to microg/mL concentrations in IV bags over extended infusion periods. Surface adsorption to IV sets and bags (polyolefin, PVC) requires evaluation and potentially specialized delivery systems.',
        'Multi-arm binding kinetics: SPR characterisation must independently confirm binding kinetics for each arm (TAA and CD3), bridging activity (simultaneous dual binding), and demonstrate no steric interference between the two binding arms.',
        'Immunogenicity risk: BiTE format contains non-human linker sequences and novel VH-VL junctions. Anti-drug antibodies (ADA) can neutralise either or both binding arms. ADA assays must detect antibodies against each functional domain.',
      ],
    },
    {
      type: 'callout',
      title: 'Pharmacovigilance — CRS and Neurotoxicity Management',
      variant: 'danger',
      content:
        'T cell engagers carry black-box warnings for CRS and neurotoxicity (ICANS — immune effector cell-associated neurotoxicity syndrome). ICANS manifests as confusion, aphasia, tremor, seizures, and cerebral oedema (rare but potentially fatal). The mechanism is thought to involve endothelial activation by TNF-alpha and IL-6, disrupting the blood-brain barrier and allowing cytokines and activated immune cells into the CNS. Risk factors: high tumour burden, first dose, rapid dose escalation, pre-existing CNS disease. Management: corticosteroids (dexamethasone) for ICANS; tocilizumab for CRS. The CMC connection: potency assay variability that allows higher-than-intended biological activity in a lot could increase CRS risk. Tight potency specifications (e.g., 80-120% relative potency) and well-controlled CD3-binding affinity are essential CMC safeguards.',
    },
    {
      type: 'callout',
      title: 'Clinical Success — Expanding Indications',
      variant: 'success',
      content:
        'T cell engagers have demonstrated remarkable clinical efficacy: teclistamab (BCMAxCD3) achieved 63% ORR in heavily pretreated relapsed/refractory multiple myeloma (MajesTEC-1). Glofitamab (CD20xCD3) showed 52% complete response rate in relapsed/refractory DLBCL. Mosunetuzumab (CD20xCD3) was the first bispecific approved for follicular lymphoma (2022). Epcoritamab (CD20xCD3, SC) demonstrated the feasibility of subcutaneous T cell engager delivery. Talquetamab (GPRC5DxCD3) provided an alternative BCMA-independent target in myeloma. The field is rapidly expanding into solid tumours (HER2, EGFR, DLL3, CLDN18.2, MUC16, PSMA targets), though the immunosuppressive tumour microenvironment and limited T cell infiltration present greater challenges than haematological malignancies.',
    },
  ],
  mentorQuestions: [
    'Why must the Fc of a T cell engager be effector-silent, and what specific Fc mutations would you recommend — and how would your CMC analytical package confirm the absence of FcgammaR engagement while still characterising the Fc for FcRn binding and pharmacokinetics?',
    'How would you design the potency assay for a bispecific T cell engager that must demonstrate both target cell binding AND functional T cell-mediated killing in a single assay, and what is the expected assay variability compared to a simple binding ELISA?',
    'If a manufacturing process change for a BiTE product altered the charge variant profile, resulting in a shift in the acidic peak fraction from 15% to 25%, how would you assess whether this impacts CD3-binding affinity and CRS risk?',
  ],
};
