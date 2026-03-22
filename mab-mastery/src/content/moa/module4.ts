import type { ModuleContent } from '../../types/content';

export const module4: ModuleContent = {
  id: 'moa-m4',
  sectionId: 'moa',
  moduleNumber: 4,
  eyebrow: 'MOA 05',
  title: 'Receptor Downregulation & Internalisation',
  lead: 'Antibody-induced receptor internalisation, clathrin-mediated endocytosis, lysosomal routing, and the critical impact on ADCC efficacy and ADC payload delivery.',
  tags: [
    { label: 'Internalisation', color: 'purple' },
    { label: 'Endocytosis', color: 'blue' },
    { label: 'HER2 / EGFR', color: 'green' },
    { label: 'ADC Design', color: 'red' },
  ],
  stats: [
    { label: 'Internalisation t½', value: '15–60 min (typical)' },
    { label: 'HER2 Turnover', value: '~5–8 h (trastuzumab)' },
    { label: 'EGFR Turnover', value: '~30 min (cetuximab)' },
    { label: 'Key Pathway', value: 'Clathrin-Mediated' },
  ],
  sections: [
    {
      type: 'card',
      title: '1. Antibody-Induced Receptor Internalisation — Overview',
      color: 'purple',
      content:
        'When a therapeutic antibody binds a cell-surface receptor, the antibody-receptor complex may remain at the cell surface or be actively internalised into the cell interior. Internalisation rate varies dramatically by target: EGFR is rapidly internalised upon antibody crosslinking (t½ ~15-30 min), HER2 is slowly internalised (t½ ~5-8 h with trastuzumab), and CD20 is minimally internalised (which is why anti-CD20 mAbs are effective for ADCC/CDC — the Fc remains surface-exposed). Internalisation is a double-edged sword for therapeutic efficacy: (1) it reduces surface antigen density, diminishing Fc effector functions (ADCC, CDC, ADCP), but (2) it is essential for ADC efficacy, as the antibody must deliver its cytotoxic payload to the intracellular compartment. Understanding the internalisation rate, trafficking pathway, and recycling fraction for each target antigen is therefore a critical element of mechanism-of-action-informed CMC development.',
    },
    {
      type: 'card',
      title: '2. Clathrin-Mediated Endocytosis — The Canonical Pathway',
      color: 'blue',
      content:
        'The primary internalisation route for most receptor-antibody complexes is clathrin-mediated endocytosis (CME). The process proceeds through defined stages: (1) Nucleation — the adaptor protein AP-2 recognises sorting signals (YxxPhi or [DE]xxxL[LI] motifs) in the receptor cytoplasmic tail and recruits clathrin triskelia to the plasma membrane. (2) Cargo selection — receptor-antibody complexes are concentrated into the nascent clathrin-coated pit (CCP) via adaptor interactions. Ubiquitination of receptor cytoplasmic lysine residues by Cbl E3 ubiquitin ligase (particularly for EGFR) enhances sorting into CCPs. (3) Coat assembly — clathrin triskelia polymerise into a polyhedral lattice, deforming the membrane into a ~100-150 nm invagination. (4) Scission — dynamin GTPase assembles into a helical collar at the neck of the invagination and, through GTP hydrolysis, mediates membrane fission. (5) Uncoating — auxilin recruits Hsc70, which disassembles the clathrin coat, releasing a free endocytic vesicle. The entire CME cycle takes approximately 60-120 seconds per pit.',
    },
    {
      type: 'card',
      title: '3. Endosomal Sorting — Lysosomal Degradation vs Recycling',
      color: 'teal',
      content:
        'After uncoating, the endocytic vesicle fuses with the early endosome (EE, pH ~6.0-6.5, Rab5-positive). Within the early endosome, the antibody-receptor complex faces a critical sorting decision. (1) Recycling pathway: The receptor dissociates from the antibody at endosomal pH and is returned to the cell surface via Rab11-positive recycling endosomes. This regenerates surface antigen and allows repeated antibody binding cycles. (2) Lysosomal degradation pathway: The receptor-antibody complex is retained, the early endosome matures into a late endosome (pH ~5.0-5.5, Rab7-positive) via ESCRT-mediated invagination into multivesicular bodies (MVBs), and ultimately fuses with lysosomes (pH ~4.5-5.0) containing acid hydrolases. EGFR follows predominantly the degradation pathway when ligand-activated (Cbl-mediated ubiquitination drives ESCRT sorting), while HER2 lacks efficient degradation sorting signals and preferentially recycles — explaining its slower surface clearance with trastuzumab. The recycling-to-degradation ratio is a fundamental parameter for ADC design.',
    },
    {
      type: 'card',
      title: '4. Trastuzumab + HER2 — Slow Internalisation, Recycling-Dominant',
      color: 'green',
      content:
        'HER2 (ErbB2) is an orphan receptor with no known direct ligand. Unlike EGFR, HER2 does not undergo rapid ligand-induced internalisation. Trastuzumab binding to HER2 domain IV induces relatively slow internalisation with a t½ of approximately 5-8 hours and a high recycling fraction (~50-70% of internalised HER2-trastuzumab complexes are recycled to the surface). This recycling behaviour has three consequences: (1) Surface HER2 density is maintained at moderate levels, supporting sustained ADCC by NK cells — the Fc remains accessible for FcgammaRIIIa engagement. (2) For ADC applications (e.g., T-DM1/ado-trastuzumab emtansine, T-DXd/trastuzumab deruxtecan), the slow internalisation means payload delivery is gradual but sustained. (3) The recycling fraction returns intact antibody-receptor complexes to the surface, where they can be re-internalised, creating a "conveyor belt" of payload delivery over time. T-DXd exploits a cleavable linker that releases DXd in the endolysosomal compartment; the released DXd is membrane-permeable, enabling bystander killing of HER2-negative neighbouring cells — partially compensating for the slow internalisation kinetics.',
    },
    {
      type: 'card',
      title: '5. Cetuximab + EGFR — Rapid Internalisation, Degradation-Dominant',
      color: 'amber',
      content:
        'EGFR internalisation is inherently rapid, driven by its evolved ligand-responsive endocytic machinery. Cetuximab binding to EGFR domain III mimics aspects of ligand-induced activation at the internalisation level: the receptor-antibody complex is rapidly internalised (t½ ~15-30 min) via clathrin-mediated endocytosis, with efficient Cbl-mediated ubiquitination directing the majority of complexes to lysosomal degradation rather than recycling. This rapid clearance reduces surface EGFR density by 50-80% within 2-4 hours of antibody exposure. The rapid downregulation is therapeutically beneficial for signalling blockade (less EGFR available for ligand-driven signalling) but disadvantageous for ADCC (less surface-exposed Fc for NK cell engagement). This explains the clinical observation that cetuximab efficacy in colorectal cancer is more closely linked to KRAS mutation status (signalling blockade mechanism) than to FcgammaRIIIa polymorphism (ADCC mechanism) — the rapid internalisation limits the ADCC window. For cetuximab-based ADCs, the rapid degradation-dominant trafficking is favourable for payload release but requires linker stability in the acidifying endosomal pathway.',
    },
    {
      type: 'table',
      title: 'Internalisation Kinetics for Key Therapeutic Targets',
      headers: ['Target', 'mAb Example', 'Internalisation t½', 'Dominant Pathway', 'Recycling Fraction', 'ADC Suitability'],
      rows: [
        ['HER2', 'Trastuzumab', '5–8 h', 'Recycling dominant', '50–70%', 'Good (T-DM1, T-DXd approved)'],
        ['EGFR', 'Cetuximab', '15–30 min', 'Degradation dominant', '10–20%', 'Moderate (rapid processing)'],
        ['CD20', 'Rituximab', '>24 h (minimal)', 'Minimal internalisation', 'N/A', 'Poor — remains on surface (good for ADCC)'],
        ['CD22', 'Epratuzumab', '15–30 min', 'Degradation dominant', '<20%', 'Excellent (inotuzumab ozogamicin)'],
        ['CD33', 'Gemtuzumab', '30–60 min', 'Degradation dominant', '~20%', 'Good (gemtuzumab ozogamicin)'],
        ['CD79b', 'Polatuzumab', '30–60 min', 'Degradation dominant', '<20%', 'Good (polatuzumab vedotin)'],
        ['Nectin-4', 'Enfortumab', '~1–2 h', 'Degradation', '~20%', 'Good (enfortumab vedotin)'],
        ['TROP-2', 'Sacituzumab', '~30 min', 'Degradation dominant', '<15%', 'Good (sacituzumab govitecan)'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '6. Impact on ADCC — The Surface Residence Time Paradigm',
      color: 'red',
      content:
        'ADCC requires that IgG Fc regions remain accessible on the target cell surface long enough for NK cell engagement, synapse formation, and degranulation — a process requiring approximately 20-60 minutes. If the antibody-receptor complex is internalised faster than the NK cell can engage and kill, ADCC efficacy is compromised. This establishes the "surface residence time" paradigm: targets with slow or minimal internalisation (CD20, CD38) are excellent for Fc effector function-dependent mechanisms, while rapidly internalising targets (EGFR, CD22, CD33) are suboptimal for ADCC but ideal for ADC payload delivery. The practical consequence for CMC development: for targets with intermediate internalisation rates (HER2), both ADCC and ADC mechanisms may contribute to efficacy, requiring the analytical package to characterise both effector function (ADCC potency assay) and internalisation/payload delivery (internalisation rate, lysosomal processing). The CQA assignment must reflect this dual mechanism.',
    },
    {
      type: 'card',
      title: '7. Impact on ADC Efficacy — Internalisation as a Rate-Limiting Step',
      color: 'purple',
      content:
        'For antibody-drug conjugates, internalisation is the rate-limiting step in the intracellular delivery of the cytotoxic payload. The ideal ADC target has: (1) high surface expression (>10,000 copies/cell) for efficient antibody accumulation, (2) rapid constitutive internalisation (t½ <1 h) for fast payload delivery, (3) efficient lysosomal routing (>80% degradation) for cleavable linker processing, and (4) minimal recycling to prevent payload re-export. Targets that recycle extensively (like HER2) require design adaptations: T-DXd uses a membrane-permeable payload (DXd) with a cleavable tetrapeptide linker (GGFG) that is efficiently cleaved by lysosomal enzymes, and the released DXd diffuses out of the cell to kill neighbouring cells (bystander effect), compensating for incomplete lysosomal delivery. In contrast, T-DM1 uses a non-cleavable SMCC linker — the entire antibody must be degraded in the lysosome to release lysine-MCC-DM1, which is charged and membrane-impermeable (no bystander effect). The internalisation rate directly determines the time to maximal intracellular drug accumulation and therefore the in vitro potency assay kinetics.',
    },
    {
      type: 'bullets',
      title: 'Measuring Internalisation — Analytical Methods',
      items: [
        'Flow cytometry with acid wash: Cells are incubated with fluorescent-labelled antibody, surface-bound antibody is stripped with low-pH buffer (glycine-HCl pH 2.5), and remaining (internalised) fluorescence is quantified. Rapid, quantitative, and amenable to time-course measurements. Standard method for internalisation rate determination.',
        'pHrodo-labelled antibody: pH-sensitive fluorophore (pHrodo Red/Green) conjugated to the mAb. Minimal fluorescence at neutral pH (cell surface), bright fluorescence in acidic endosomes/lysosomes (pH <6). Enables real-time visualisation of internalisation without wash steps. Suitable for high-content imaging and live-cell kinetic studies.',
        'Confocal microscopy co-localisation: Antibody labelled with one fluorophore; endosomal/lysosomal markers (EEA1, LAMP-1, Rab5, Rab7) labelled with another. Co-localisation coefficients (Pearson, Manders) quantify the proportion of antibody in each compartment over time. Gold standard for trafficking pathway determination.',
        'Surface plasmon resonance (SPR) internalisation assay: Cells plated on SPR sensor; antibody binding and internalisation detected as changes in refractive index. Provides label-free, real-time kinetic data. Emerging technique — not yet standardised.',
        'Radiolabelled antibody uptake: 125I-labelled mAb incubated with cells; internalised fraction measured after acid wash and gamma counting. Quantitative but requires radioactive handling. Used in preclinical biodistribution and ADC development.',
      ],
    },
    {
      type: 'table',
      title: 'Endosomal Trafficking — Key Markers and pH',
      headers: ['Compartment', 'pH', 'Key Markers', 'Residence Time', 'Relevance to ADC'],
      rows: [
        ['Clathrin-coated pit', '7.4', 'Clathrin, AP-2, dynamin', '1–2 min', 'Cargo capture'],
        ['Early endosome', '6.0–6.5', 'Rab5, EEA1', '5–15 min', 'Sorting decision point'],
        ['Recycling endosome', '6.5', 'Rab11, Rab4', '10–30 min', 'Receptor return — payload lost'],
        ['Late endosome / MVB', '5.0–5.5', 'Rab7, LAMP-1, CD63', '15–60 min', 'Acid-labile linker cleavage begins'],
        ['Lysosome', '4.5–5.0', 'LAMP-1/2, cathepsins', 'Terminal', 'Full linker processing; payload release'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: 'CMC Insight — Internalisation Rate as a CQA for ADCs',
      variant: 'warning',
      content:
        'For ADCs, the internalisation rate of the antibody-target complex is functionally a critical quality attribute, because it directly determines the rate of intracellular payload delivery. Any manufacturing change that alters antigen-binding kinetics (e.g., glycosylation changes affecting Fab glycans, charge variant distribution shifts, or aggregation affecting avidity) could potentially alter internalisation kinetics. The CMC characterisation package for an ADC should include internalisation rate measurement as part of the extended characterisation panel, with comparability assessment triggered by process changes. However, internalisation is not typically a lot-release test due to assay complexity and variability — instead, potency (cell killing EC50) serves as the integrated functional readout that captures binding, internalisation, trafficking, linker cleavage, and payload activity in a single measurement.',
    },
    {
      type: 'callout',
      title: 'Clinical Relevance — Antigen Downregulation and Resistance',
      variant: 'danger',
      content:
        'Antibody-induced receptor downregulation can contribute to acquired therapeutic resistance. Chronic cetuximab treatment reduces EGFR surface density through sustained internalisation, potentially diminishing both blockade and ADCC efficacy. Trogocytosis (membrane stripping by effector cells) can compound the loss. For HER2, compensatory upregulation of alternative ErbB family members (HER3, EGFR) can bypass the trastuzumab-mediated signalling blockade. Monitoring surface antigen levels during treatment (e.g., by flow cytometry on circulating tumour cells or on tissue biopsies) provides pharmacodynamic evidence of target engagement but also flags potential resistance mechanisms. ADC resistance can also arise from altered endosomal routing — upregulation of recycling (more Rab11-positive compartment residence) or lysosomal drug export via P-glycoprotein (MDR1/ABCB1) efflux pumps.',
    },
  ],
  mentorQuestions: [
    'For an ADC targeting a rapidly internalising receptor (t½ 15 min), would you recommend a cleavable or non-cleavable linker, and how does the choice interact with the bystander effect and tumour heterogeneity?',
    'How does the recycling fraction of a target receptor affect the design of the ADC potency assay (incubation time, drug accumulation kinetics, EC50 determination)?',
    'If a process change for a naked IgG1 mAb altered the charge variant profile and you observed a 20% reduction in internalisation rate on target cells, would this be a CQA concern for an ADCC-dependent mechanism versus an ADC mechanism — and how would the regulatory strategy differ?',
  ],
};
