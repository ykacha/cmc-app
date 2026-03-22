import type { ModuleContent } from '../../types/content';

export const module1: ModuleContent = {
  id: 'effector-m1',
  sectionId: 'effector',
  moduleNumber: 1,
  eyebrow: 'EFFECTOR 02',
  title: 'ADCC at the Molecular Level',
  lead: 'Antibody-dependent cellular cytotoxicity is the dominant killing mechanism for most tumour-targeting therapeutic mAbs. This module dissects the molecular contacts, signalling cascade, and assay design at the resolution needed for rational Fc engineering.',
  tags: [
    { label: 'ADCC', color: 'red' },
    { label: 'FcγRIIIa', color: 'blue' },
    { label: 'NK Cells', color: 'green' },
    { label: 'Afucosylation', color: 'amber' },
  ],
  stats: [
    { label: 'Key Receptor', value: 'FcγRIIIa (CD16a)' },
    { label: 'Contact Residues', value: '~20 on Fc' },
    { label: 'Afucosyl Enhancement', value: 'Up to 50×' },
    { label: 'NK Serial Kills', value: '7–10 targets' },
  ],
  sections: [
    {
      type: 'card',
      title: 'The Fc–FcγRIIIa Interface — Structural Overview',
      color: 'blue',
      content:
        'The co-crystal structure of human IgG1 Fc in complex with FcγRIIIa (PDB 1E4K, Sondermann et al. 2000; PDB 3SGJ, Ferrara et al. 2011) reveals a 1:1 stoichiometry with the receptor engaging both Fc chains asymmetrically. The binding interface buries approximately 1,800 Å² of solvent-accessible surface area and involves two principal contact regions on the Fc: (1) the lower hinge/upper CH2 region (L234–P238) from one heavy chain, and (2) the CH2 domain body (D265–E269, Y296–S298, A327–I332) from both heavy chains. On FcγRIIIa, the D2 domain membrane-proximal loops (including the 156–160 region containing the V158/F158 polymorphism) and D1–D2 interdomain hinge make the primary contacts. The interaction is predominantly hydrophobic and shape-complementary, with the Fc lower hinge L234/L235 side chains inserting into a hydrophobic groove on the receptor. Electrostatic contacts (D265 Fc – K120 receptor; E269 Fc – K131 receptor) provide charge complementarity. The N297-linked glycan does not directly contact the receptor but is essential for maintaining the CH2 open conformation required for receptor access.',
    },
    {
      type: 'code',
      title: 'Fc Contact Residues for FcγRIIIa (EU Numbering)',
      language: 'text',
      code: [
        '═══ LOWER HINGE — Primary hydrophobic contact ═══',
        'L234    Leu → inserts into FcγRIIIa hydrophobic groove (Chain A)',
        'L235    Leu → adjacent hydrophobic packing with receptor Trp87/Trp110',
        'G236    Gly → backbone contact at receptor interface',
        'G237    Gly → extended hinge positioning',
        'P238    Pro → conformational constraint of hinge turn',
        '',
        '═══ CH2 BODY — Secondary contacts (both chains) ═══',
        'D265    Asp → salt bridge to FcγRIIIa Lys120',
        'D270    Asp → H-bond to receptor loop',
        'Y296    Tyr → hydrophobic/H-bond contact',
        'S298    Ser → H-bond to receptor',
        'T299    Thr → glycan-proximal positioning',
        'N325    Asn → H-bond to receptor',
        'A327    Ala → hydrophobic contact',
        'L328    Leu → hydrophobic packing',
        'P329    Pro → adjacent to C1q site; minor FcγR contact',
        'A330    Ala → GASDALIE target (A330L enhances contact)',
        'P331    Pro → boundary residue',
        'I332    Ile → DE/GASDALIE target (I332E creates H-bond)',
        '',
        '═══ GLYCAN — Indirect but essential ═══',
        'N297    Asn → N-glycosylation site (glycan maintains CH2 open conformation)',
        '        Core fucose sterically clashes with FcγRIIIa Asn162 glycan',
      ].join('\n'),
    },
    {
      type: 'card',
      title: 'The Afucosylation Mechanism — Asn162 Steric Clash',
      color: 'amber',
      content:
        'The molecular explanation for the dramatic ADCC enhancement of afucosylated antibodies was elucidated by Ferrara et al. (Proc. Natl. Acad. Sci. USA 108:12669, 2011) using co-crystal structures of fucosylated vs afucosylated Fc bound to FcγRIIIa. FcγRIIIa is itself glycosylated at five N-linked sites, with Asn162 being the most critical. The Asn162-linked glycan extends into the space between the two CH2 domains of the Fc at the receptor binding interface. When the Fc carries core α1,6-linked fucose at Asn297, the fucose residue (attached to the first GlcNAc of the N-glycan) projects outward from the Fc surface directly into the path of the FcγRIIIa Asn162 glycan. This steric clash weakens the Fc–receptor interaction by ~50-fold. Removal of core fucose eliminates this clash, allowing the receptor Asn162 glycan to dock into the inter-CH2 space in a more favourable conformation, with additional carbohydrate–carbohydrate interactions stabilising the complex. The net result: afucosylated IgG1 binds FcγRIIIa with Ka ~10⁷ M⁻¹ compared to ~2×10⁵ M⁻¹ for fucosylated IgG1. This 50-fold affinity enhancement translates directly to enhanced NK cell activation and target cell killing.',
    },
    {
      type: 'card',
      title: 'ITAM Signalling Cascade in NK Cells',
      color: 'red',
      content:
        'When multiple FcγRIIIa molecules on an NK cell surface are crosslinked by Fc regions of opsonising mAbs on a target cell, the associated FcεRIγ or CD3ζ homodimer ITAM tyrosines are phosphorylated by the Src-family kinases Lck and Fyn. Phosphorylated ITAMs create high-affinity docking sites for the tandem SH2 domains of Syk kinase (or ZAP-70 in some NK subsets). Syk activation triggers multiple parallel cascades: (1) PLCγ2 activation → IP3 generation → ER calcium release → calcineurin activation → NFAT nuclear translocation → cytokine gene transcription (IFN-γ, TNF-α); (2) DAG generation → PKC activation → NF-κB activation → pro-inflammatory cytokine production; (3) PI3K activation → PIP3 generation → Akt/mTOR → survival signalling and metabolic reprogramming; (4) Vav1 GEF activation → Rac1 → WAVE2/Arp2/3 → actin polymerisation → lytic synapse formation. The lytic synapse is a polarised interface where the NK cell microtubule-organising centre (MTOC) reorients toward the target cell, directing lytic granule exocytosis through the synapse. Perforin polymerises in the target cell membrane to form pores, through which granzyme B enters and activates caspase-3/7, initiating apoptosis.',
    },
    {
      type: 'card',
      title: 'NK Cell Serial Killing — Kinetics of ADCC',
      color: 'green',
      content:
        'NK cells are serial killers: a single NK cell can sequentially engage and kill 7–10 target cells over 12–16 hours in vitro before becoming exhausted. The serial killing capacity is limited by: (1) perforin granule depletion — NK cells contain ~200 lytic granules, with ~20–30 required per kill event; (2) FcγRIIIa shedding — upon activation, ADAM17 (TACE) cleaves FcγRIIIa from the NK cell surface, reducing receptor density and subsequent target engagement capacity; (3) inhibitory receptor upregulation — activated NK cells upregulate NKG2A and other inhibitory receptors; (4) metabolic exhaustion — repeated killing cycles deplete ATP and biosynthetic capacity. The kinetics of ADCC are typically: initial adhesion and immune synapse formation (5–10 minutes), perforin/granzyme delivery (2–5 minutes per target), target cell apoptosis (30–60 minutes detectable by Annexin V), and NK cell detachment and re-engagement (10–20 minutes). In in vitro ADCC assays, the typical incubation time of 4 hours at a 10:1 effector-to-target ratio captures 2–3 rounds of serial killing. Afucosylated antibodies increase the per-kill efficiency (lower antibody concentration threshold) but do not significantly alter the maximum serial killing capacity.',
    },
    {
      type: 'table',
      title: 'Fc Mutations Enhancing FcγRIIIa Binding / ADCC',
      headers: ['Mutation(s)', 'EU Positions', 'Mechanism', 'FcγRIIIa Enhancement', 'ADCC Enhancement', 'Clinical Example'],
      rows: [
        ['Afucosylation', 'N297 glycan', 'Eliminates steric clash with receptor Asn162 glycan', '~50×', '10–50× (dose-dependent)', 'Obinutuzumab (Gazyva)'],
        ['S239D/I332E (DE)', 'S239, I332', 'S239D salt bridge + I332E H-bond to receptor', '~7×', '~5–10×', 'Preclinical (Xencor)'],
        ['GASDALIE', 'G236, S239, A330, I332', 'Multiple new contacts with FcγRIIIa', '~100×', '~40×', 'Research stage'],
        ['S239D/A330L/I332E', 'S239, A330, I332', 'Triple-mutant enhanced contacts', '~50×', '~20–40×', 'Research stage'],
        ['F243L/R292P/Y300L/V305I/P396L', 'Multiple CH2', 'Combinatorial optimisation', '~10×', '~5–10×', 'Margetuximab (MARGENZA)'],
        ['Afucosyl + DE', 'N297 glycan + S239/I332', 'Glycan + protein engineering combined', '>100×', '>50×', 'Preclinical'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'In Vitro ADCC Assay Design — Primary NK vs Reporter',
      color: 'purple',
      content:
        'Two assay formats dominate ADCC measurement in CMC. (1) Primary NK cell assays: peripheral blood NK cells (CD3⁻CD56⁺) isolated from healthy donors are mixed with ⁵¹Cr-labeled or calcein AM-labeled target cells expressing the antigen at effector-to-target (E:T) ratios of 5:1 to 50:1. After 4 hours, supernatant is measured for released chromium (γ-counter) or calcein (fluorescence). Advantages: physiologically relevant, accounts for full NK activation cascade. Disadvantages: high donor-to-donor variability (FcγRIIIa V158F genotype, NK cell percentage, activation state), requires fresh blood, batch-to-batch variability makes it unsuitable for lot-release. (2) Reporter bioassays: Jurkat T cells stably expressing FcγRIIIa (V158 or F158) with an NFAT-response element driving luciferase reporter (e.g., Promega ADCC Reporter Bioassay). Target cells express the antigen; upon FcγRIIIa crosslinking, NFAT activation drives luciferase production measured by luminescence. Advantages: highly reproducible, standardisable, V158 and F158 variants available, suitable for lot-release and stability-indicating assay. Disadvantages: measures only proximal signalling (not actual killing), does not capture perforin/granzyme pathway or serial killing kinetics.',
    },
    {
      type: 'table',
      title: 'ADCC Assay Comparison — Primary vs Reporter',
      headers: ['Parameter', 'Primary NK Cell Assay', 'Reporter Bioassay (NFAT-Luc)'],
      rows: [
        ['Readout', 'Target cell death (⁵¹Cr, calcein, LDH, flow)', 'Luciferase luminescence (NFAT activation)'],
        ['Effector cells', 'Freshly isolated CD3⁻CD56⁺ NK cells', 'Jurkat-FcγRIIIa-NFAT-Luc (frozen thaw-and-use)'],
        ['E:T ratio', '5:1 to 50:1', '6:1 to 10:1 (typical)'],
        ['Incubation', '4 hours', '6 hours'],
        ['Variability (CV)', '15–40% (donor-dependent)', '5–15% (standardised)'],
        ['FcγRIIIa genotype control', 'Requires donor genotyping', 'V158 and F158 lines available'],
        ['Measures killing?', 'Yes (actual cytotoxicity)', 'No (signalling only)'],
        ['Regulatory acceptance', 'Characterisation', 'Lot-release and stability testing'],
        ['Sensitivity to Fc changes', 'High (full cascade)', 'Moderate (proximal signalling only)'],
        ['Throughput', 'Low (fresh cells, limited donors)', 'High (frozen cells, plate-based)'],
      ],
      sortable: false,
    },
    {
      type: 'card',
      title: 'Crystal Structure Insights — Asymmetric Binding',
      color: 'teal',
      content:
        'A critical structural insight from the Fc–FcγRIIIa co-crystal structures is that the receptor binds asymmetrically to the Fc homodimer. Although the Fc is a symmetric homodimer of two identical CH2–CH3 chain pairs, FcγRIIIa engages primarily with the lower hinge and upper CH2 of one heavy chain (chain A) while making secondary contacts with the CH2 body of the other chain (chain B). This asymmetry means that the receptor "reads" both heavy chains but derives most of its binding energy from chain A contacts. The lower hinge of chain A provides approximately 60% of the total binding energy through L234, L235, and G236 contacts. The CH2 body of chain B contributes ~25% through D265, Y296, and I332 contacts. The remaining ~15% comes from glycan-mediated contacts and water-mediated hydrogen bonds. This asymmetric engagement has implications for hetero-Fc formats (e.g., knobs-into-holes bispecifics): if the two Fc chains carry different mutations, the orientation of chain A vs chain B relative to the receptor determines which mutation dominates the interaction. Crystal structures also reveal that the Fc C\'E loop (residues 325–332) undergoes a conformational shift upon receptor binding, suggesting an induced-fit component to the interaction.',
    },
    {
      type: 'bullets',
      title: 'Factors Modulating ADCC Potency In Vivo',
      items: [
        'Target antigen density: minimum ~1,000–5,000 copies per target cell required for efficient NK cell activation. Below this threshold, insufficient Fc density prevents stable FcγRIIIa crosslinking. Antigen downregulation during treatment (e.g., CD20 internalisation) reduces ADCC over time.',
        'FcγRIIIa V158F genotype: V/V patients show 2–3× higher ADCC in ex vivo assays and statistically better clinical responses in several indications (follicular lymphoma, breast cancer, CRC).',
        'NK cell count and activation state: patients with low NK cell counts (e.g., post-chemotherapy) or NK cell exhaustion (tumour microenvironment) show reduced ADCC. IL-2/IL-15 pre-activation of NK cells enhances ADCC in vitro.',
        'Competing serum IgG: at physiological IgG concentrations (7–15 mg/mL), endogenous IgG competes with therapeutic mAb for FcγRIIIa binding. The therapeutic mAb must outcompete endogenous IgG through multivalent avidity on the target cell surface.',
        'Tumour microenvironment immunosuppression: TGF-β, IL-10, and adenosine in the tumour microenvironment suppress NK cell function. Tumour-associated macrophages may express inhibitory FcγRIIb, sequestering mAb Fc without activating effector functions.',
        'Fc glycosylation of therapeutic mAb: core fucosylation (standard CHO production) limits FcγRIIIa engagement. Afucosylated mAbs overcome the V158F genotype disparity and perform equivalently in V/V, V/F, and F/F patients.',
        'Antibody dose and saturation: ADCC follows a bell-shaped dose-response in some systems — excess mAb can saturate antigen sites and paradoxically reduce ADCC by preventing immune synapse formation (the "prozone effect").',
      ],
    },
    {
      type: 'callout',
      title: 'Industry Practice — ADCC Testing in CMC',
      variant: 'info',
      content:
        'For therapeutic mAbs where ADCC contributes to the mechanism of action, the ADCC assay is classified as a critical quality attribute (CQA)-linked functional assay and is included in the lot-release panel. The industry standard for lot-release ADCC testing is the reporter bioassay (FcγRIIIa-V158 Jurkat-NFAT-Luc) due to its reproducibility (inter-assay CV <15%) and frozen-thaw-and-use convenience. Primary NK cell ADCC assays are used during characterisation (ICH Q6B extended characterisation) to confirm that reporter bioassay results correlate with actual target cell killing. For biosimilar development, both assay formats are expected: reporter bioassay for formal analytical similarity (Tier 1 attribute) and primary NK cell ADCC for confirmatory functional equivalence. Acceptance criteria are typically set as relative potency to a reference standard (50–200% of reference, or tighter for mature products).',
    },
    {
      type: 'callout',
      title: 'Clinical Translation — From Bench to Bedside',
      variant: 'success',
      content:
        'The clinical validation of ADCC as a mechanism of action came from three landmark observations: (1) FcγRIIIa V158F genotype-outcome correlations for rituximab (Cartron 2002), trastuzumab (Musolino 2008), and cetuximab (Zhang 2007), demonstrating that patients with higher-affinity FcγRIIIa alleles had better outcomes; (2) The superiority of glyco-engineered obinutuzumab over rituximab in CLL (GALLIUM trial, Marcus 2017), attributed in part to enhanced ADCC from afucosylation; (3) The approval of margetuximab (MARGENZA), an Fc-engineered anti-HER2 mAb with F243L/R292P/Y300L/V305I/P396L mutations enhancing FcγRIIIa binding, showing improved progression-free survival over trastuzumab in F carrier patients (SOPHIA trial, Rugo 2021). These clinical data firmly establish that ADCC modulation through Fc engineering translates to measurable clinical benefit.',
    },
  ],
  mentorQuestions: [
    'Why does the steric clash between core fucose on the Fc glycan and FcγRIIIa Asn162 selectively enhance ADCC without significantly affecting ADCP or CDC? What does this tell you about the molecular architecture of the different Fc–receptor interfaces?',
    'You are designing a lot-release ADCC potency assay for an afucosylated anti-CD20 mAb. What factors would you consider when choosing between a primary NK cell assay and a reporter bioassay, and how would you set acceptance criteria?',
    'Explain the "prozone effect" in ADCC and its implications for therapeutic antibody dosing. How does this differ from classical antigen–antibody prozone in precipitation assays?',
  ],
};
