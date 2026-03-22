import type { ModuleContent } from '../../types/content';

export const module8: ModuleContent = {
  id: 'moa-m8',
  sectionId: 'moa',
  moduleNumber: 8,
  eyebrow: 'MOA 09',
  title: 'Receptor Crosslinking & Apoptosis Induction',
  lead: 'Bivalent antibody-mediated receptor clustering, TRAIL receptor agonists, lipid raft coalescence, complement-independent apoptosis, and multivalent engineering strategies.',
  tags: [
    { label: 'Crosslinking', color: 'amber' },
    { label: 'Apoptosis', color: 'red' },
    { label: 'TRAIL Receptors', color: 'purple' },
    { label: 'Multivalent', color: 'teal' },
  ],
  stats: [
    { label: 'Key Targets', value: 'DR4, DR5, Fas' },
    { label: 'Death Domain', value: 'FADD-Caspase-8' },
    { label: 'Raft Aggregation', value: 'Lipid Microdomain' },
    { label: 'Enhanced Format', value: 'Hexabody / IgM' },
  ],
  sections: [
    {
      type: 'card',
      title: '1. Receptor Crosslinking — Beyond Bivalent Binding',
      color: 'blue',
      content:
        'Receptor crosslinking by therapeutic antibodies refers to the ability of a multivalent antibody to cluster multiple receptor molecules into signalling-competent arrays on the cell surface. While all bivalent IgG antibodies can crosslink two receptor molecules (one per Fab arm), certain receptors require higher-order clustering — trimerisation, hexamerisation, or lipid raft-associated superclustering — to initiate productive signalling. This is particularly true for death receptors (DR4/TRAIL-R1, DR5/TRAIL-R2, Fas/CD95) of the TNFR superfamily, which signal apoptosis through death domain-mediated recruitment of the DISC (death-inducing signalling complex). The natural ligand TRAIL (TNF-related apoptosis-inducing ligand) is a homotrimeric type II transmembrane protein that clusters three receptor molecules simultaneously. A conventional bivalent IgG can only achieve dimeric crosslinking, which is generally insufficient for robust death receptor signalling. This valency limitation has been the primary obstacle in developing effective TRAIL receptor agonist antibodies for cancer therapy.',
    },
    {
      type: 'card',
      title: '2. Death Receptor Signalling — The DISC',
      color: 'red',
      content:
        'Death receptor signalling proceeds through a tightly ordered intracellular cascade. Upon receptor trimerisation/clustering, the intracellular death domains (DD) of DR4/DR5/Fas undergo conformational change and recruit the adaptor protein FADD (Fas-associated death domain protein) via homotypic DD-DD interactions. FADD contains a death effector domain (DED) that recruits procaspase-8 (and procaspase-10) through DED-DED interactions, assembling the DISC. Within the DISC, procaspase-8 undergoes proximity-induced autoproteolytic activation — the local concentration of procaspase-8 zymogens in the DISC drives trans-cleavage between adjacent molecules, releasing active caspase-8 heterotetramer (p18/p10)2 into the cytoplasm. Active caspase-8 then directly cleaves and activates executioner caspases-3 and -7 (Type I signalling, sufficient in lymphocytes) or cleaves Bid to generate tBid, which activates the mitochondrial apoptotic pathway (Type II signalling, required in most solid tumour cells where XIAP inhibits direct caspase-3 activation). The quantity and quality of receptor clustering directly determines the number of DISCs assembled and hence the magnitude of the apoptotic signal.',
    },
    {
      type: 'card',
      title: '3. TRAIL Receptor Agonist Antibodies — Clinical Challenges',
      color: 'amber',
      content:
        'TRAIL receptor agonist antibodies have been extensively explored as cancer therapeutics due to the selective apoptosis of tumour cells over normal cells (TRAIL receptors are overexpressed on many tumour types). However, multiple Phase II trials (mapatumumab/anti-DR4, conatumumab/anti-DR5, lexatumumab/anti-DR5, drozitumab/anti-DR5, tigatuzumab/anti-DR5) failed to show significant single-agent clinical efficacy despite promising preclinical data. The primary reason: conventional bivalent IgG antibodies provide insufficient receptor crosslinking for robust DISC formation in vivo. In vitro, agonist antibodies often require exogenous crosslinking (anti-Fc secondary antibody or protein A/G) to show potent activity, and the in vitro activity without crosslinking poorly predicts in vivo efficacy. The disconnect between crosslinked (potent) and uncrosslinked (weak) activity explains the clinical failure. This realisation has driven the development of multivalent formats specifically designed to overcome the valency limitation of IgG.',
    },
    {
      type: 'card',
      title: '4. Lipid Raft Coalescence — Membrane Microdomain Signalling',
      color: 'teal',
      content:
        'Lipid rafts (now termed lipid microdomains or membrane-ordered domains) are cholesterol- and sphingolipid-enriched nanoscale regions of the plasma membrane that serve as signalling platforms. Death receptors (DR4, DR5, Fas) constitutively partition into lipid rafts at low density, but upon ligand-mediated or antibody-mediated clustering, they coalesce into large raft aggregates (also called signalling protein oligomeric transduction structures, or SPOTS). Raft coalescence amplifies death receptor signalling by: (1) concentrating receptor-FADD-caspase-8 complexes in a confined membrane area, enhancing DISC assembly efficiency, (2) excluding anti-apoptotic molecules (cFLIP) from the raft domain, removing signalling inhibition, and (3) recruiting additional pro-apoptotic components (e.g., ceramide-enriched platforms). Cholesterol depletion (methyl-beta-cyclodextrin) disrupts lipid rafts and abrogates death receptor signalling, even with optimal receptor crosslinking, demonstrating that raft integrity is essential. Type II anti-CD20 antibodies (obinutuzumab) exploit this principle — they redistribute CD20 into lipid rafts and induce lysosome-dependent cell death through raft-mediated signalling, independently of ADCC, CDC, or classical apoptosis.',
    },
    {
      type: 'card',
      title: '5. Complement-Independent Apoptosis — Direct Cell Death',
      color: 'purple',
      content:
        'Certain therapeutic antibodies induce target cell death through direct signalling, independent of Fc effector functions (ADCC, CDC, ADCP). This mechanism is termed "direct cell death" or "complement-independent apoptosis." Examples: (1) Obinutuzumab (type II anti-CD20) — induces homotypic adhesion, actin-dependent cell death involving lysosomes, and ROS generation. This is non-classical apoptosis (caspase-independent, not blocked by Bcl-2 overexpression). (2) Rituximab at high concentration induces modest direct apoptosis in some B cell lines through CD20 crosslinking. (3) Trastuzumab induces growth arrest (G1 arrest) through inhibition of HER2-HER3 heterodimer signalling and AKT pathway suppression, but this is cytostatic rather than cytotoxic. (4) Anti-DR5 agonists with adequate crosslinking induce classical caspase-dependent apoptosis. For CMC characterisation, direct cell death assays complement Fc effector function assays. When direct killing is a claimed mechanism, the potency assay format must be able to detect this activity — which means using target cells expressing the appropriate receptor and measuring viability/apoptosis markers in the absence of effector cells and complement.',
    },
    {
      type: 'table',
      title: 'Multivalent Formats for Enhanced Receptor Crosslinking',
      headers: ['Format', 'Valency', 'MW (kDa)', 'Crosslinking Mechanism', 'Half-Life', 'Clinical Example'],
      rows: [
        ['Conventional IgG1', '2', '~150', 'Dimeric only (insufficient for DR)', '~21 days', 'Mapatumumab (failed Phase II)'],
        ['HexaBody (E430G)', '2 (hexamerises)', '~150 x 6', 'Fc-Fc hexamerisation on cell surface', '~21 days', 'GEN1029 (DR5xDR5, Phase I)'],
        ['IgM (pentamer)', '10', '~970', 'Pentameric — 10 binding sites', '~5 days', 'IGM-8444 (anti-DR5 IgM)'],
        ['Tetravalent bispecific', '4 (2+2)', '~200', 'Dual-target clustering', '~7-14 days', 'ABBV-621 (DR4+DR5 agonist)'],
        ['scFv-Fc fusion trimer', '6', '~240', 'Trimeric — mimics TRAIL', '~7-10 days', 'APG350 (TRAIL-R agonist)'],
        ['Fc-TRAIL fusion', '6 (2 trimers)', '~210', 'Trimeric TRAIL head on Fc', '~10-14 days', 'Dulanermin-Fc variants'],
        ['Diabody-Fc', '4', '~180', 'Tetravalent crosslinking', '~10-14 days', 'Various preclinical'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '6. HexaBody Technology — IgG Hexamerisation',
      color: 'green',
      content:
        'HexaBody technology (Genmab) addresses the valency limitation of IgG through a single point mutation (E430G) in the CH3 domain that enhances Fc-Fc intermolecular contacts. On the cell surface, HexaBody-mutated IgGs self-assemble into ordered hexameric rings upon antigen binding, presenting six pairs of Fab arms (12 binding sites) in a clustered array. For death receptor agonists, this hexameric arrangement provides the higher-order receptor clustering needed for efficient DISC formation without requiring exogenous crosslinking or multivalent scaffolds. GEN1029 is a bispecific HexaBody-DR5/DR5 (two different anti-DR5 antibodies combined as a bispecific) with E430G mutation. Each arm binds a different epitope on DR5, and hexamerisation creates a supramolecular complex that potently clusters DR5 into signalling-competent arrays. In preclinical studies, GEN1029 induced tumour regression in models where conventional anti-DR5 IgG failed. The CMC challenge: hexamerisation creates large molecular complexes on the cell surface that are transient and cannot be isolated — activity must be inferred from functional potency assays rather than direct structural characterisation of the hexamer.',
    },
    {
      type: 'card',
      title: '7. IgM Antibodies — Natural Multivalency',
      color: 'amber',
      content:
        'IgM is the naturally pentameric (or hexameric) antibody isotype, presenting 10 (or 12) antigen-binding sites per molecule. This high valency makes IgM an ideal scaffold for receptor crosslinking applications where higher-order clustering is required. IGM Biosciences has developed engineered IgM antibodies, including IGM-8444 (anti-DR5 IgM), which achieves potent TRAIL receptor clustering and tumour cell apoptosis without requiring Fc-Fc hexamerisation mutations or extrinsic crosslinking. The IgM format provides: (1) 10 binding sites for simultaneous engagement of up to 10 DR5 molecules, (2) natural avidity-driven binding that compensates for the lower intrinsic affinity of individual IgM binding sites, and (3) C1q binding via the Cmu3/Cmu4 domains for CDC activity. CMC challenges specific to IgM therapeutics: (1) large molecular weight (~970 kDa) complicates SEC analysis and formulation, (2) J-chain requirement for pentameric assembly adds manufacturing complexity, (3) shorter serum half-life (~5 days) due to the absence of FcRn binding (IgM lacks FcRn-interacting residues), requiring more frequent dosing, (4) glycosylation heterogeneity is amplified by the five N-glycosylation sites per mu heavy chain (25 sites per pentamer).',
    },
    {
      type: 'bullets',
      title: 'Potency Assay Design for Crosslinking-Dependent mAbs',
      items: [
        'Crosslinker-free assay (preferred for clinical relevance): Target cells expressing the receptor (e.g., Colo205 for DR5) are incubated with the antibody without secondary crosslinking. This tests the intrinsic crosslinking capacity of the format — conventional IgG may show weak activity, while HexaBody or IgM formats show potent activity. Reports the therapeutically relevant potency.',
        'Secondary crosslinker assay (characterisation): Anti-Fc antibody (goat anti-human IgG Fc) or protein A/G is added to provide exogenous crosslinking. This assay reveals the maximal agonist potential of the antibody regardless of format limitations. Useful for benchmarking and format selection but does not predict in vivo potency.',
        'Plate-bound assay: Antibody coated onto microtiter plates provides solid-phase crosslinking. Target cells are added, and viability/apoptosis is measured. Simple but does not model in vivo conditions — overestimates potency of weak agonists.',
        'Readout selection: Caspase-3/7 activation (CaspaseGlo) provides rapid (4-6 h) apoptosis-specific readout. Viability assays (CellTiter-Glo, MTT) require longer incubation (24-72 h) but capture the complete death pathway. Annexin V/PI flow cytometry distinguishes early apoptosis from necrosis.',
        'Specification setting: For agonist antibodies dependent on intrinsic crosslinking, the potency specification must be set using the crosslinker-free assay format. The crosslinked format provides supplementary information for characterisation but should not be used for lot release if the in vivo mechanism does not involve extrinsic crosslinking.',
      ],
    },
    {
      type: 'callout',
      title: 'CMC Insight — Aggregation as a Confounding Factor',
      variant: 'warning',
      content:
        'Aggregated antibody inherently provides multivalent crosslinking, creating a potency confound for agonist and crosslinking-dependent antibodies. Even low levels of high-molecular-weight species (HMW, e.g., dimer at 1-2%) can disproportionately enhance apparent agonist activity in cell-based assays, because a small fraction of multivalent aggregates may dominate the crosslinking-dependent signal. This creates a paradox for lot release: a lot with higher aggregation may test as higher potency — but this is artifactual and not predictive of in vivo efficacy (where aggregates are cleared rapidly and may cause immunogenicity). For agonist antibodies, potency trending must be interpreted alongside SEC-HPLC aggregation data, and correlation analysis between HMW% and potency should be performed across multiple lots to establish whether a confounding relationship exists.',
    },
    {
      type: 'callout',
      title: 'Future Direction — Targeted Apoptosis',
      variant: 'info',
      content:
        'The next generation of crosslinking-dependent antibodies combines tumour targeting with death receptor agonism in bispecific formats. Examples include bispecific antibodies with one arm targeting a tumour antigen (EpCAM, EGFR, HER2) and the other arm targeting DR5, ensuring that death receptor clustering occurs only on tumour cells co-expressing both targets. The HexaBody platform extends this further: bispecific HexaBody-DR5/TAA molecules hexamerise only when both DR5 and TAA are present on the same cell, providing a conditional clustering mechanism. This spatial control minimises off-tumour apoptosis in normal tissues expressing DR5. For CMC, bispecific crosslinking-dependent formats require dual-arm potency assays confirming both target binding and conditional death receptor activation, with specificity controls using single-target-expressing cells.',
    },
  ],
  mentorQuestions: [
    'Why did conventional IgG anti-DR5 agonist antibodies fail in clinical trials, and how do HexaBody and IgM formats address the fundamental valency limitation — what are the unique CMC challenges introduced by each format?',
    'How would you design a potency assay that distinguishes between antibody-intrinsic receptor crosslinking (the desired mechanism) and aggregation-driven artifactual crosslinking (a CQA concern)?',
    'For an obinutuzumab-like type II anti-CD20 antibody that induces direct cell death via lipid raft coalescence, how would you demonstrate this mechanism in the CMC characterisation package and what assay would you use to differentiate it from CDC and ADCC?',
  ],
};
