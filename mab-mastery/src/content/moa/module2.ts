import type { ModuleContent } from '../../types/content';

export const module2: ModuleContent = {
  id: 'moa-m2',
  sectionId: 'moa',
  moduleNumber: 2,
  eyebrow: 'MOA 03',
  title: 'ADCP — Antibody-Dependent Cellular Phagocytosis',
  lead: 'Macrophage-mediated tumour clearance through FcgammaRI and FcgammaRIIa — the phagocytic mechanism and its distinction from ADCC.',
  tags: [
    { label: 'ADCP', color: 'green' },
    { label: 'Macrophages', color: 'amber' },
    { label: 'FcgammaRI/IIa', color: 'blue' },
    { label: 'CD47-SIRPalpha', color: 'red' },
  ],
  stats: [
    { label: 'Primary Effectors', value: 'Macrophages' },
    { label: 'Key Receptors', value: 'FcgammaRI, FcgammaRIIa' },
    { label: 'Checkpoint', value: 'CD47-SIRPalpha' },
    { label: 'Killing Mode', value: 'Engulfment' },
  ],
  sections: [
    {
      type: 'card',
      title: 'ADCP Mechanism Overview',
      color: 'green',
      content:
        'Antibody-dependent cellular phagocytosis (ADCP) is an Fc-mediated effector mechanism in which macrophages (and to a lesser extent neutrophils and dendritic cells) engulf and destroy antibody-opsonised target cells. Unlike ADCC, which kills via extracellular secretion of cytotoxic granules, ADCP involves complete physical engulfment of the target cell, followed by intracellular degradation within phagolysosomes. ADCP is increasingly recognised as a major mechanism of action for several clinically important mAbs, particularly anti-CD20 antibodies (rituximab, obinutuzumab) in B cell malignancies, where tumour-associated macrophages in lymph nodes and spleen are the primary effectors. In vivo depletion studies in mouse models have demonstrated that macrophage depletion (using clodronate liposomes) abrogates anti-CD20 efficacy more severely than NK cell depletion, suggesting that ADCP may be the dominant effector mechanism in tissue compartments with high macrophage density.',
    },
    {
      type: 'card',
      title: 'FcgammaR Engagement — FcgammaRI and FcgammaRIIa',
      color: 'blue',
      content:
        'Macrophages express multiple activating Fc receptors. FcgammaRI (CD64) is a high-affinity receptor (KD ~10-9 M for monomeric IgG1) constitutively expressed on monocytes and macrophages and upregulated by IFN-gamma. FcgammaRI can bind monomeric IgG, but efficient phagocytosis requires receptor crosslinking by multivalent immune complexes (i.e., multiple Fc regions on an opsonised cell). FcgammaRIIa (CD32a) is a low-affinity receptor (KD ~10-7 M) broadly expressed on monocytes, macrophages, neutrophils, dendritic cells, and platelets. It has two allotypic variants: H131 (higher affinity for IgG2) and R131 (lower affinity). Unlike FcgammaRIIIa on NK cells, FcgammaRIIa contains an intracellular ITAM within its own cytoplasmic tail, eliminating the need for adaptor chains. Both receptors engage the lower hinge and CH2 domain of IgG, sharing overlapping but not identical contact residues with FcgammaRIIIa. Importantly, macrophages also express the inhibitory receptor FcgammaRIIb (CD32b), which contains an ITIM motif and opposes phagocytic signalling — the balance between activating and inhibitory receptor engagement determines the phagocytic outcome.',
    },
    {
      type: 'card',
      title: 'Phagocytic Signalling and Actin Remodelling',
      color: 'teal',
      content:
        'FcgammaR crosslinking on macrophages initiates a signalling cascade centred on Syk kinase activation, which is recruited to phosphorylated ITAMs. Syk activates PI3K (generating PIP3 at the phagocytic cup), Vav family GEFs (activating Rac1 and Cdc42 small GTPases), and PLCgamma (generating IP3 and DAG). The critical downstream event is massive actin cytoskeleton remodelling: Rac1 and Cdc42 activate the Arp2/3 complex and formins, driving de novo actin polymerisation at the contact site. This creates the "phagocytic cup" — an F-actin-rich structure that extends pseudopods around the target cell. The pseudopods progressively encircle the target via a "zipper" mechanism, where sequential FcgammaR-Fc interactions along the target surface drive progressive membrane engulfment. The cup closes to form a sealed phagosome containing the entire target cell. This process requires substantial membrane — up to 20-50% of the macrophage plasma membrane may be consumed during engulfment of a large target cell, supplied by exocytic insertion of endomembranes.',
    },
    {
      type: 'card',
      title: 'Phagosome Maturation and Target Destruction',
      color: 'amber',
      content:
        'Once the phagosome is sealed, it undergoes a stepwise maturation process. Early phagosome: acquires Rab5, EEA1, and the V-ATPase proton pump, beginning acidification (pH drops from 7.4 to ~6.0). Late phagosome: acquires Rab7, LAMP-1, LAMP-2, mannose-6-phosphate receptor, further acidification (pH ~5.0-5.5). Phagolysosome fusion: the phagosome fuses with lysosomes, delivering acid hydrolases (cathepsins B, D, L, S), reactive oxygen species (via NADPH oxidase/NOX2), and reactive nitrogen species (via iNOS). The combination of low pH, proteolytic enzymes, superoxide anion (O2-), hydrogen peroxide (H2O2), hypochlorous acid (HOCl via myeloperoxidase), and nitric oxide (NO) ensures complete degradation of the engulfed target cell. Importantly, phagolysosomal degradation generates peptide fragments that are loaded onto MHC class II molecules and presented on the macrophage surface, potentially priming adaptive immune responses against tumour antigens — a process called "cross-presentation" when peptides are also loaded onto MHC class I.',
    },
    {
      type: 'table',
      title: 'ADCP vs ADCC — Mechanistic Comparison',
      headers: ['Feature', 'ADCC', 'ADCP'],
      rows: [
        ['Primary effector cell', 'NK cell', 'Macrophage'],
        ['Key FcgammaR', 'FcgammaRIIIa (CD16a)', 'FcgammaRI (CD64), FcgammaRIIa (CD32a)'],
        ['Killing mechanism', 'Extracellular (perforin/granzyme)', 'Intracellular (phagolysosome)'],
        ['Target cell fate', 'Apoptosis in situ', 'Complete engulfment and degradation'],
        ['Antigen presentation', 'Minimal', 'Yes — MHC-II (and cross-presentation)'],
        ['Tissue distribution', 'Blood, limited tissue access', 'Tissue-resident macrophages abundant'],
        ['Speed of killing', '~20-60 min per target', '~30-120 min per target'],
        ['Serial killing capacity', 'Yes (4-10 targets/NK cell)', 'Limited (1-3 targets, depends on size)'],
        ['Impact of afucosylation', 'Major (~50x enhancement)', 'Moderate (primarily FcgammaRIIIa-driven)'],
        ['CD47 checkpoint', 'Not relevant', 'Major inhibitory checkpoint'],
        ['In vivo compartment', 'Blood, lymph node paracortex', 'Spleen red pulp, liver Kupffer, lymph node sinus'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Tumour-Associated Macrophages — M1 vs M2 Polarisation',
      color: 'red',
      content:
        'Tumour-associated macrophages (TAMs) are highly abundant in most solid tumours and haematological malignancies, often constituting 30-50% of the tumour immune infiltrate. TAMs exist on a polarisation spectrum: M1 (classically activated, pro-inflammatory) macrophages are induced by IFN-gamma and LPS, express high levels of FcgammaRI, produce TNF-alpha, IL-12, ROS, and are competent for ADCP and antigen presentation. M2 (alternatively activated, anti-inflammatory) macrophages are induced by IL-4, IL-13, IL-10, M-CSF, express higher levels of FcgammaRIIb (inhibitory), produce IL-10, TGF-beta, and support tumour growth, angiogenesis, and immune evasion. In established tumours, the majority of TAMs are M2-polarised, creating an immunosuppressive environment that opposes ADCP. Therapeutic strategies to enhance ADCP include: repolarising TAMs from M2 to M1 (e.g., with CD40 agonists, TLR agonists), blocking the CD47-SIRPalpha checkpoint, and engineering Fc for enhanced FcgammaRIIa binding (S239D/I332E mutations enhance both ADCC and ADCP).',
    },
    {
      type: 'card',
      title: 'CD47-SIRPalpha — The "Don\'t Eat Me" Checkpoint',
      color: 'purple',
      content:
        'CD47 is a ubiquitously expressed transmembrane protein that serves as a "marker of self." Its ligand, SIRPalpha (signal regulatory protein alpha, CD172a), is expressed on macrophages and dendritic cells. CD47-SIRPalpha engagement delivers a potent anti-phagocytic ("don\'t eat me") signal through SIRPalpha ITIM-mediated recruitment of SHP-1/SHP-2 phosphatases, which dephosphorylate proximal phagocytic signalling intermediates and inhibit actin polymerisation at the phagocytic cup. Tumour cells frequently overexpress CD47 (2-5 fold above normal cells) as an immune evasion strategy. Magrolimab (Hu5F9-G4) is an anti-CD47 antibody that blocks the CD47-SIRPalpha interaction, enabling macrophage-mediated phagocytosis of opsonised tumour cells. In combination with anti-CD20 (rituximab), anti-CD47 blockade dramatically enhances ADCP — providing the "eat me" signal (rituximab opsonisation) while removing the "don\'t eat me" brake (CD47 blockade). Calreticulin surface expression provides a counter-balancing "eat me" signal recognised by LRP1 on macrophages.',
    },
    {
      type: 'table',
      title: 'FcgammaR Expression on ADCP Effector Cells',
      headers: ['FcgammaR', 'CD Name', 'Affinity', 'ITAM/ITIM', 'Cell Expression', 'Role in ADCP'],
      rows: [
        ['FcgammaRI', 'CD64', 'High (KD ~10-9 M)', 'ITAM (gamma chain)', 'Monocytes, macrophages, DC (IFN-gamma-induced)', 'Activating — drives phagocytosis'],
        ['FcgammaRIIa', 'CD32a', 'Low (KD ~10-7 M)', 'ITAM (cytoplasmic)', 'Monocytes, macrophages, neutrophils, DC, platelets', 'Activating — major ADCP driver'],
        ['FcgammaRIIb', 'CD32b', 'Low (KD ~10-7 M)', 'ITIM (cytoplasmic)', 'B cells, macrophages, DC, mast cells', 'Inhibitory — opposes phagocytosis'],
        ['FcgammaRIIIa', 'CD16a', 'Low (KD ~10-6 M)', 'ITAM (zeta/gamma chain)', 'NK cells, macrophage subset', 'Minor role in macrophage ADCP'],
      ],
      sortable: true,
    },
    {
      type: 'bullets',
      title: 'Clinical Relevance — ADCP for Key Therapeutic mAbs',
      items: [
        'Rituximab (anti-CD20): In vivo studies show macrophage depletion (clodronate liposomes) reduces rituximab efficacy more than NK cell depletion (anti-asialo-GM1), establishing ADCP as a dominant in vivo mechanism for B cell depletion in tissues.',
        'Obinutuzumab (anti-CD20, type II): Glycoengineered (afucosylated) for enhanced ADCC, but also induces direct cell death via lysosome-mediated mechanism. ADCP contribution is significant in lymph node and splenic macrophage compartments.',
        'Trastuzumab (anti-HER2): ADCP by tumour-infiltrating macrophages contributes to efficacy in HER2+ breast cancer, alongside ADCC and receptor signalling blockade. Macrophage density in tumour biopsies correlates with trastuzumab response.',
        'Daratumumab (anti-CD38): ADCP by splenic and hepatic macrophages is a significant clearance mechanism for CD38+ myeloma cells, in addition to ADCC, CDC, and direct apoptosis.',
        'Magrolimab + rituximab: Combination blocks CD47 (removing "don\'t eat me" signal) while opsonising B cells with rituximab (providing "eat me" signal), synergistically enhancing ADCP in NHL and AML clinical trials.',
      ],
    },
    {
      type: 'callout',
      title: 'CMC Consideration — ADCP Assay Development',
      variant: 'info',
      content:
        'Unlike ADCC, there is no widely adopted standardised commercial ADCP assay kit. ADCP assays are typically bespoke: fluorescently labelled target cells (CFSE or PKH67) are co-cultured with monocyte-derived macrophages (MDMs) differentiated with M-CSF for 6-7 days, and phagocytosis is quantified by flow cytometry (% of macrophages that are double-positive for macrophage markers and target cell label) or by imaging (confocal microscopy confirms true engulfment vs surface adhesion). Key challenges include: (1) donor-to-donor variability in MDM differentiation and FcgammaR expression, (2) distinguishing true phagocytosis from trogocytosis (membrane transfer) or surface adhesion, (3) M1 vs M2 polarisation state dramatically affects assay sensitivity, and (4) long differentiation time (7+ days) limits throughput. For CQA assessment, ADCP assays are typically used as characterisation tools rather than lot-release assays, unless ADCP is the dominant mechanism of action.',
    },
    {
      type: 'card',
      title: 'Trogocytosis — The Phagocytic Halfway Point',
      color: 'teal',
      content:
        'Trogocytosis (from Greek "trogo," to gnaw) is a process in which effector cells (macrophages, NK cells, T cells) extract small membrane fragments and associated proteins from target cells without complete engulfment. In the context of ADCP, trogocytosis represents a partial phagocytic event where macrophages "nibble" the target cell surface, stripping antigen-antibody complexes from the tumour cell membrane. This has two important consequences: (1) Target antigen loss — trogocytosis can reduce surface antigen density on surviving tumour cells, leading to antigen-negative escape (demonstrated for CD20 after rituximab treatment, where trogocytosis by monocytes reduces CD20 expression on residual B cells). (2) Assay interference — trogocytosis transfer of fluorescent membrane label from target to effector cells is indistinguishable from true phagocytosis by flow cytometry alone, requiring confocal imaging or pH-sensitive dyes (pHrodo) that only fluoresce in acidic phagolysosomes to confirm genuine engulfment.',
    },
    {
      type: 'callout',
      title: 'Fc Engineering for Enhanced ADCP',
      variant: 'success',
      content:
        'Fc mutations that enhance FcgammaRIIa binding generally also enhance ADCP. The S239D/I332E (DE) double mutation enhances binding to both FcgammaRIIIa (ADCC) and FcgammaRIIa (ADCP), providing a dual-enhanced effector profile. For antibodies where ADCP is the desired primary mechanism, optimal Fc engineering would maximise the activating/inhibitory (A/I) ratio by enhancing FcgammaRI and FcgammaRIIa binding while reducing FcgammaRIIb binding. Afucosylation primarily enhances FcgammaRIIIa binding and has a lesser (but still positive) effect on ADCP through improved macrophage FcgammaRIIIa engagement. Combination of afucosylation with S239D/I332E mutations provides the broadest effector function enhancement across ADCC and ADCP pathways.',
    },
  ],
  mentorQuestions: [
    'Why might ADCP be the dominant effector mechanism in lymph node and splenic tumour clearance rather than ADCC, and how does this affect which effector function assays you prioritise in the CMC comparability package?',
    'If you are developing an anti-CD47 combination therapy, what unique CMC challenges arise from combining a phagocytosis checkpoint inhibitor with an opsonising antibody, particularly regarding potency assay design?',
    'How would you experimentally distinguish genuine ADCP from trogocytosis in a flow cytometry-based assay, and why does this distinction matter for CQA classification?',
  ],
};
