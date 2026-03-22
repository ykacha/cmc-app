import type { ModuleContent } from '../../types/content';

export const module7: ModuleContent = {
  id: 'moa-m7',
  sectionId: 'moa',
  moduleNumber: 7,
  eyebrow: 'MOA 08',
  title: 'Agonist Antibodies — TNFR Superfamily Activation',
  lead: 'Agonist antibody mechanisms for TNFR superfamily targets — FcgammaRIIb crosslinking requirement, IgG2 self-crosslinking, clinical challenges, and potency assay design.',
  tags: [
    { label: 'Agonist', color: 'green' },
    { label: 'TNFR Superfamily', color: 'amber' },
    { label: 'FcgammaRIIb', color: 'purple' },
    { label: 'Co-Stimulation', color: 'blue' },
  ],
  stats: [
    { label: 'Key Targets', value: 'CD40, 4-1BB, OX40' },
    { label: 'Crosslinking Via', value: 'FcgammaRIIb (CD32b)' },
    { label: 'Natural Ligand', value: 'Trimeric TNF Family' },
    { label: 'Cluster Requirement', value: '≥2 Trimers' },
  ],
  sections: [
    {
      type: 'card',
      title: '1. Agonist Antibodies — Conceptual Challenge',
      color: 'blue',
      content:
        'Most therapeutic antibodies function as antagonists — they block ligand-receptor interactions or mark cells for immune destruction. Agonist antibodies are fundamentally different: they must actively stimulate the target receptor, mimicking the natural ligand to trigger downstream signalling. This is mechanistically challenging because TNFR superfamily receptors (CD40, 4-1BB/CD137, OX40/CD134, GITR, CD27, DR4, DR5) signal through receptor trimerisation and higher-order clustering. The natural ligands are trimeric type II transmembrane proteins (TNF superfamily members) that engage three receptor molecules simultaneously. A bivalent IgG antibody can crosslink at most two receptor molecules — insufficient for productive TNFR signalling. This "valency gap" means that conventional bivalent IgG agonists require an extrinsic crosslinking mechanism to achieve the higher-order receptor clustering needed for signal transduction. Understanding this requirement is essential for both antibody design and potency assay development.',
    },
    {
      type: 'card',
      title: '2. TNFR Superfamily Signalling — TRAF Recruitment',
      color: 'teal',
      content:
        'TNFR superfamily receptors lack intrinsic kinase activity and signal through adaptor proteins called TRAFs (TNF receptor-associated factors). The signalling cascade: (1) Receptor trimerisation/clustering exposes intracellular TRAF-binding motifs (PxQx[T/S] for TRAF2/3/5, PxExx[Ar/Ac] for TRAF6). (2) TRAF proteins are recruited and oligomerise, forming signalling platforms. (3) TRAF2/5 activate the canonical NF-kappaB pathway (IKKbeta phosphorylation, IkappaBalpha degradation, p50/p65 nuclear translocation) and MAPK pathways (JNK, ERK, p38). TRAF3 mediates the non-canonical NF-kappaB pathway (NIK stabilisation, IKKalpha phosphorylation, p100 processing to p52/RelB). (4) For co-stimulatory receptors (4-1BB, OX40, CD27), NF-kappaB activation drives anti-apoptotic gene expression (Bcl-xL, Bfl-1), cytokine production (IFN-gamma, IL-2), and proliferation. The critical insight: TRAF recruitment requires higher-order receptor clustering beyond trimerisation — a trimer of trimers (9-mer) or hexagonal lattice creates the avidity needed for stable TRAF oligomerisation and productive signalling.',
    },
    {
      type: 'card',
      title: '3. FcgammaRIIb-Dependent Crosslinking',
      color: 'green',
      content:
        'The primary mechanism by which conventional IgG1 agonist antibodies achieve higher-order receptor clustering is through FcgammaRIIb (CD32b)-mediated crosslinking. FcgammaRIIb is an inhibitory Fc receptor expressed on B cells, dendritic cells, macrophages, and some tumour cells. When an agonist antibody binds its target receptor on one cell and its Fc simultaneously binds FcgammaRIIb on an adjacent cell (or the same cell, in cis), the FcgammaRIIb acts as a scaffold that clusters multiple antibody-receptor complexes. This trans-crosslinking hyper-clusters the target receptor beyond the bivalent limit of the IgG. The consequence: agonist activity is entirely dependent on the local density of FcgammaRIIb-expressing cells. In tissues rich in FcgammaRIIb+ cells (lymph nodes, spleen), agonism is robust. In tissues lacking FcgammaRIIb (peripheral blood, solid tumours), the same antibody is functionally inert as an agonist. This tissue-dependent activity creates both a therapeutic advantage (tumour microenvironment conditioning) and a clinical challenge (unpredictable pharmacodynamic responses).',
    },
    {
      type: 'card',
      title: '4. IgG2 Self-Crosslinking — The Isoform B Mechanism',
      color: 'amber',
      content:
        'IgG2 antibodies can function as FcgammaRIIb-independent agonists through a unique structural mechanism. The IgG2 hinge region contains four disulfide bonds (vs two in IgG1), which can adopt two distinct isoforms: Isoform A (classical, where the hinge cysteines pair within the same heavy chain) and Isoform B (where the hinge cysteines form interchain disulfide bonds between the upper hinge and CH1 domain, creating a compact, rigid structure). IgG2 Isoform B adopts a constrained conformation where the two Fab arms are held in close proximity, creating a "locked" configuration that forces the target receptor into a crosslinked orientation upon bivalent binding — effectively mimicking higher-order clustering without requiring extrinsic crosslinking. This was demonstrated for agonist anti-CD40 antibodies: IgG2 anti-CD40 mAbs showed potent agonist activity independent of FcgammaRIIb, while IgG1 versions of the same antibody required FcgammaRIIb crosslinking. The disulfide shuffling between isoforms A and B is a redox-dependent process that can occur during manufacturing and storage, making the A/B isoform ratio a unique CQA for IgG2 agonist antibodies.',
    },
    {
      type: 'table',
      title: 'TNFR Superfamily Agonist Targets — Clinical Landscape',
      headers: ['Target', 'Natural Ligand', 'Expression', 'Function', 'Lead Clinical mAb', 'Status / Challenge'],
      rows: [
        ['CD40', 'CD40L (CD154)', 'B cells, DC, macrophages', 'APC activation, B cell class switch', 'Selicrelumab (IgG2)', 'Phase II — hepatotoxicity dose-limiting'],
        ['4-1BB (CD137)', '4-1BBL', 'Activated T/NK cells', 'T cell co-stimulation, survival', 'Urelumab (IgG4)', 'Halted — severe hepatotoxicity at 1 mg/kg'],
        ['4-1BB (CD137)', '4-1BBL', 'Activated T/NK cells', 'T cell co-stimulation', 'Utomilumab (IgG2)', 'Phase II — weak agonism, limited efficacy'],
        ['OX40 (CD134)', 'OX40L', 'Activated T cells', 'T cell expansion, memory', 'Ivuxolimab (IgG1)', 'Phase I/II — combination studies'],
        ['GITR', 'GITRL', 'T cells (Treg high)', 'Teff activation, Treg depletion', 'TRX518 (aglycosylated IgG1)', 'Phase I — Treg effects variable'],
        ['CD27', 'CD70', 'T, NK, memory B cells', 'T cell co-stimulation', 'Varlilumab (IgG1)', 'Phase I/II — limited single-agent activity'],
        ['DR5 (TRAIL-R2)', 'TRAIL', 'Tumour cells, normal cells', 'Apoptosis induction', 'GEN1029 (HexaBody-DR5)', 'Phase I/II — hexamerisation for clustering'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '5. Clinical Challenges — The 4-1BB Story',
      color: 'red',
      content:
        'The clinical history of anti-4-1BB agonists illustrates the challenge of agonist antibody development. Urelumab (BMS, IgG4) was a strong agonist that showed potent T cell co-stimulation and anti-tumour activity in preclinical models. In clinical trials, however, urelumab caused severe hepatotoxicity at doses of 1 mg/kg and above (Grade 3-4 transaminase elevation in ~10% of patients), leading to dose restriction to 0.1 mg/kg where efficacy was minimal. The hepatotoxicity is attributed to FcgammaRIIb-mediated crosslinking in the liver, where Kupffer cells express high levels of FcgammaRIIb — the same mechanism that drives agonist activity in the tumour became the source of on-target/off-tumour toxicity. Utomilumab (Pfizer, IgG2) was designed as a weaker agonist to avoid hepatotoxicity. It was well tolerated but showed limited single-agent efficacy due to insufficient agonism. This "Goldilocks problem" — too much agonism causes toxicity, too little is ineffective — remains the central challenge in agonist antibody development. Solutions being explored include tumour-conditional agonists, low-FcgammaRIIb-binding Fc variants, and bispecific formats that localise agonism to the tumour.',
    },
    {
      type: 'card',
      title: '6. Potency Assay Design for Agonist Antibodies',
      color: 'purple',
      content:
        'Potency assay design for agonist antibodies is uniquely complex because the assay must recapitulate the crosslinking requirement. Key considerations: (1) Plate-bound vs soluble format: Agonist antibodies coated on plastic plates (plate-bound format) show strong agonist activity because the solid phase provides the crosslinking scaffold. In solution (soluble format), the same antibody may show no activity without FcgammaRIIb crosslinking. The plate-bound assay is useful for screening but does not reflect in vivo biology. (2) FcgammaRIIb co-culture assay: Co-culture of target-expressing cells with FcgammaRIIb-transfected CHO cells (or FcgammaRIIb+ cell lines) provides the physiological crosslinking requirement. This is the preferred format for IgG1 agonists. (3) Reporter readout: NF-kappaB-luciferase reporter cells (e.g., HEK-Blue CD40, Jurkat-NF-kappaB for 4-1BB) provide quantitative readout. (4) IgG2 agonist assay: IgG2 agonists that function via self-crosslinking (isoform B) may show activity in soluble format without FcgammaRIIb crosslinking. The assay format must match the mechanism. (5) The potency specification for agonist antibodies should be set relative to a reference standard that has been qualified for agonist activity in the crosslinking-dependent assay format.',
    },
    {
      type: 'bullets',
      title: 'CMC Considerations for Agonist Antibodies',
      items: [
        'IgG2 disulfide isoform profiling: The A/B isoform ratio of IgG2 agonists must be characterised and controlled. Non-reducing CE-SDS and rpHPLC can distinguish isoforms by differential migration. The isoform ratio is affected by cell culture redox conditions, purification conditions, and storage (disulfide shuffling over time). A stability-indicating method must track isoform conversion.',
        'FcgammaRIIb binding characterisation: For IgG1 agonists requiring FcgammaRIIb crosslinking, FcgammaRIIb binding affinity is a functional CQA. SPR measurement of Fc binding to recombinant FcgammaRIIb (both allotypes — I232 and T232) should be included in the characterisation panel.',
        'Subclass selection as a CQA: The choice between IgG1 (FcgammaRIIb-dependent) and IgG2 (self-crosslinking) fundamentally determines the mechanism and the analytical strategy. IgG1 agonists additionally retain ADCC/CDC potential against target-expressing cells — this may be desired (e.g., anti-CD40 depleting tumour-resident Tregs) or undesired (e.g., anti-4-1BB depleting activated T cells).',
        'Aggregation and potency: Aggregated antibody inherently provides multimerisation/crosslinking, which can artefactually enhance agonist potency. High-molecular-weight species (HMW) in agonist antibody preparations may show disproportionately high potency in cell-based assays. HMW specification must be tightly controlled and correlated with potency measurements.',
        'Dose-response curve steepness: Agonist antibodies often show steep dose-response curves (Hill coefficient >1) due to the cooperative nature of receptor clustering. This affects potency assay precision — small concentration changes near the EC50 cause large response changes, increasing assay variability.',
      ],
    },
    {
      type: 'callout',
      title: 'Emerging Solutions — Conditional Agonism',
      variant: 'success',
      content:
        'Next-generation agonist antibodies aim to restrict agonism to the tumour microenvironment. Approaches include: (1) Bispecific agonists — one arm binds a tumour antigen, the other binds the co-stimulatory receptor. Agonism only occurs at cells co-expressing both targets. Example: PRS-343 (HER2 x 4-1BB bispecific). (2) Tumour-conditional Fc engagement — engineering the Fc to selectively engage FcgammaRIIb only in the context of tumour-associated immune cells (lower affinity variants). (3) Protease-activated ("pro-body") agonists — masked antibodies where the agonist binding site is blocked by a pro-domain that is cleaved by tumour-associated proteases (MMP, cathepsin). (4) Fc-free multivalent formats — tetravalent or hexavalent constructs that achieve receptor clustering without Fc, avoiding FcgammaRIIb-dependent hepatotoxicity.',
    },
    {
      type: 'callout',
      title: 'Regulatory Perspective — Agonist-Specific Requirements',
      variant: 'info',
      content:
        'Regulatory agencies treat agonist antibodies with particular scrutiny due to the hepatotoxicity signals observed with anti-4-1BB and anti-CD40 agonists. The CMC package must clearly define: (1) the crosslinking mechanism and its dependence on FcgammaRIIb or IgG2 self-crosslinking, (2) the potency assay format that recapitulates this mechanism, (3) the relationship between aggregation level and agonist potency (demonstrating that HMW does not confound the potency readout), and (4) for IgG2 agonists, the disulfide isoform distribution and its stability over shelf life. The clinical pharmacology package must address tissue-specific agonism: PK/PD modelling of liver versus tumour FcgammaRIIb density helps predict the therapeutic index. Step-up dosing may be required (analogous to T cell engagers) for highly potent agonists to mitigate hepatic cytokine release.',
    },
  ],
  mentorQuestions: [
    'Why did urelumab (IgG4 anti-4-1BB) cause hepatotoxicity while utomilumab (IgG2 anti-4-1BB) did not, and how does this inform the Fc subclass strategy and CMC characterisation requirements for agonist antibodies?',
    'How would you design a potency assay for an IgG2 anti-CD40 agonist that functions via hinge disulfide isoform B self-crosslinking, and what controls would you include to confirm that the activity is FcgammaRIIb-independent?',
    'If aggregation levels increased from 0.5% to 2.0% HMW during stability studies of an agonist antibody, and potency simultaneously increased by 30%, how would you interpret this and what corrective actions would you recommend?',
  ],
};
