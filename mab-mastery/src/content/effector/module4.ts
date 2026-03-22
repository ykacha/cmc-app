import type { ModuleContent } from '../../types/content';

export const module4: ModuleContent = {
  id: 'effector-m4',
  sectionId: 'effector',
  moduleNumber: 4,
  eyebrow: 'EFFECTOR 05',
  title: 'FcRn Recycling',
  lead: 'The neonatal Fc receptor (FcRn) is the molecular basis of the 21-day serum half-life of IgG antibodies. This module details the pH-dependent binding mechanism, the structural contacts, the endosomal recycling itinerary, and the tissue distribution that together govern therapeutic mAb pharmacokinetics.',
  tags: [
    { label: 'FcRn', color: 'teal' },
    { label: 'pH-Dependent', color: 'blue' },
    { label: 'Half-Life', color: 'green' },
    { label: 'Endosomal Recycling', color: 'purple' },
  ],
  stats: [
    { label: 'IgG Half-Life', value: '~21 days' },
    { label: 'Stoichiometry', value: '2 FcRn : 1 IgG' },
    { label: 'Binding pH', value: '≤6.5 (endosomal)' },
    { label: 'Release pH', value: '7.4 (blood)' },
  ],
  sections: [
    {
      type: 'card',
      title: 'FcRn Structure — MHC-I-Like Heterodimer',
      color: 'blue',
      content:
        'FcRn is a heterodimer consisting of a 45 kDa α-chain (structurally related to MHC class I heavy chains with α1, α2, and α3 domains) non-covalently associated with β2-microglobulin (β2m, 12 kDa). Unlike classical MHC-I molecules, FcRn does not bind peptide antigens — its α1–α2 peptide-binding groove is occluded. Instead, the FcRn α-chain presents an acidic patch on its α2 domain surface (including residues E115, E116, E132, D130, and W131) that forms the IgG Fc binding interface. The β2m subunit is essential for proper folding and cell-surface expression of FcRn, similar to its role in classical MHC-I. FcRn is widely expressed: vascular endothelial cells (the primary recycling compartment for serum IgG), haematopoietic cells (monocytes, macrophages, dendritic cells), epithelial cells (intestinal, pulmonary, renal tubular), hepatocytes, and placental syncytiotrophoblasts (mediating maternal-to-foetal IgG transfer). The crystal structure of human FcRn in complex with human IgG1 Fc (Oganesyan et al., J. Biol. Chem. 289:7812, 2014) confirmed the 2:1 FcRn:IgG stoichiometry and defined the precise pH-dependent contacts.',
    },
    {
      type: 'card',
      title: 'pH-Dependent Binding — The Histidine Switch',
      color: 'teal',
      content:
        'The pH dependence of FcRn:Fc binding is the cornerstone of the IgG recycling mechanism, and it is mediated by histidine residues at the binding interface. Histidine has a side-chain imidazole pKa of approximately 6.0–6.5, meaning it transitions between protonated (positively charged) and neutral states across exactly the pH range encountered in endosomal trafficking. At endosomal pH (5.5–6.0), His310 and His435 on the Fc CH2–CH3 interface become protonated, creating positive charges that form salt bridges and hydrogen bonds with the FcRn acidic patch (E115, E116, D130). His433 provides an additional stabilising contact. The net effect: tight binding at pH 6.0 (KD ~10–100 nM for wild-type IgG1). At physiological blood pH (7.4), His310 and His435 are deprotonated (neutral), the electrostatic contacts with FcRn collapse, and the complex dissociates (KD >10 µM). This >100-fold affinity differential is the molecular switch that drives the recycling cycle. Importantly, the binding is exclusively pH-dependent — there is no conformational change in FcRn or Fc upon pH shift; only the protonation state of the histidine residues changes.',
    },
    {
      type: 'code',
      title: 'Fc Contact Residues for FcRn (EU Numbering)',
      language: 'text',
      code: [
        '═══ CH2–CH3 ELBOW INTERFACE — Primary FcRn contact ═══',
        '',
        'I253    Ile → hydrophobic packing into FcRn α2 domain pocket',
        '              Critical: I253A abolishes FcRn binding at all pH values',
        '',
        'H310    His → pH SWITCH residue #1',
        '              pH 6.0: protonated imidazolium⁺ → salt bridge to FcRn E115',
        '              pH 7.4: neutral imidazole → contact lost → release',
        '              H310A: eliminates pH-dependent binding; >100× reduction at pH 6.0',
        '',
        'H433    His → pH SWITCH residue #2 (secondary)',
        '              pH 6.0: protonated → H-bond to FcRn D130',
        '              pH 7.4: neutral → contact lost',
        '              H433A: ~10× reduction in FcRn binding at pH 6.0',
        '',
        'N434    Asn → H-bond to FcRn backbone; van der Waals to FcRn W131',
        '              N434A: ~5× reduction; N434S: enhanced binding (LS mutation)',
        '',
        'H435    His → pH SWITCH residue #3 (critical)',
        '              pH 6.0: protonated → salt bridge to FcRn E116',
        '              pH 7.4: neutral → contact lost → release',
        '              H435A: abolishes FcRn binding; used in "Abdeg" half-life reduction',
        '',
        'Y436    Tyr → hydroxyl H-bond + aromatic packing with FcRn',
        '              Y436A: ~3× reduction; contributes to binding stability',
        '',
        '═══ 2:1 STOICHIOMETRY ═══',
        'Two FcRn molecules bind one IgG Fc (one FcRn per CH2-CH3 interface)',
        'Each heavy chain provides an identical binding site → symmetric 2:1 complex',
        'Cooperative binding: second FcRn binds with ~3× higher affinity than first',
      ].join('\n'),
    },
    {
      type: 'card',
      title: 'The Endosomal Recycling Pathway — Step by Step',
      color: 'green',
      content:
        'The FcRn recycling pathway is the mechanism by which IgG avoids lysosomal degradation and achieves its 21-day serum half-life. Step 1 — Pinocytosis: vascular endothelial cells continuously internalise extracellular fluid (and dissolved IgG) through fluid-phase pinocytosis into early endosomes. This is non-selective — all serum proteins are taken up proportionally to their concentration. Step 2 — pH drop: as the early endosome matures, vacuolar H⁺-ATPase acidifies the lumen to pH 6.0–6.5 within 5–10 minutes. Step 3 — FcRn engagement: at pH 6.0, FcRn molecules in the endosomal membrane bind IgG via the histidine switch mechanism. FcRn is present at high density in endosomal membranes (~10,000 copies per endothelial cell). Step 4 — Sorting: IgG-FcRn complexes are segregated into tubular recycling endosomes (Rab4⁺/Rab11⁺), while unbound proteins (albumin at this stage is also FcRn-bound; other proteins are not) remain in the maturing endosome destined for lysosomal fusion and degradation. Step 5 — Return to cell surface: recycling vesicles fuse with the plasma membrane, exposing the IgG-FcRn complex to the extracellular pH of 7.4. Step 6 — pH-triggered release: histidine deprotonation at pH 7.4 causes FcRn:Fc dissociation, releasing intact IgG back into the circulation. The cycle takes approximately 15–30 minutes per round.',
    },
    {
      type: 'card',
      title: '2:1 FcRn:IgG Stoichiometry and Cooperative Binding',
      color: 'purple',
      content:
        'Structural and biophysical studies (Abdiche et al., Biochemistry 54:3321, 2015; Oganesyan et al., 2014) established that two FcRn molecules bind each IgG in a 2:1 complex. Each FcRn molecule engages one CH2–CH3 elbow interface of the Fc homodimer — the Fc presents two identical binding sites, one per heavy chain. Binding is cooperative: the first FcRn binds with moderate affinity (KD ~200–500 nM at pH 6.0), and the second binds ~3-fold more tightly (KD ~50–150 nM) due to avidity and subtle conformational stabilisation of the Fc. The 2:1 complex is essential for efficient recycling — mutants that can bind only one FcRn (e.g., asymmetric Fc with H435A on one chain) show reduced recycling efficiency and ~2-fold shorter half-life. The 2:1 stoichiometry also explains why engineered Fc variants must maintain both binding sites: heterodimeric Fc formats (knobs-into-holes bispecifics) must ensure that both CH2–CH3 interfaces retain FcRn contact residues. Disruption of either site compromises the cooperative 2:1 complex and reduces serum persistence.',
    },
    {
      type: 'card',
      title: 'IgG Half-Life — The 21-Day Paradigm',
      color: 'amber',
      content:
        'Wild-type human IgG1, IgG2, and IgG4 all have serum half-lives of approximately 21 days in humans, while IgG3 has a shorter half-life of ~7 days. The 21-day half-life is directly attributable to FcRn-mediated recycling: without FcRn, IgG would be cleared with the same kinetics as other serum proteins (~2–3 days, matching albumin half-life in FcRn-knockout mice). The quantitative basis: approximately 50–70% of pinocytosed IgG is rescued by FcRn in each endosomal cycle. With an estimated 3–5 pinocytic cycles per day per endothelial cell, the fractional catabolic rate (FCR) for IgG is approximately 3–5% per day, yielding a half-life of ~21 days (ln(2)/FCR). The shorter IgG3 half-life is caused by an arginine at position 435 (R435) instead of histidine: R435 is constitutively charged at all pH values, so IgG3 binds FcRn at both pH 6.0 and pH 7.4, preventing clean pH-dependent release. The IgG3 remains tethered to FcRn at the cell surface, competing with newly pinocytosed IgG for FcRn binding in the next cycle. IgG3 allotypes with H435 (found in some populations) have normal 21-day half-lives, confirming H435 as the critical determinant.',
    },
    {
      type: 'table',
      title: 'FcRn Contact Residues — Binding and Functional Impact',
      headers: ['Residue (EU)', 'Amino Acid', 'pH 6.0 Contact', 'Mutation Effect on FcRn KD (pH 6.0)', 'Mutation Effect on Half-Life'],
      rows: [
        ['I253', 'Ile', 'Hydrophobic core packing', 'I253A: >100× weaker', 'Abolished recycling'],
        ['H310', 'His', 'Salt bridge to FcRn E115 (pH switch)', 'H310A: >100× weaker', 'Abolished recycling'],
        ['H433', 'His', 'H-bond to FcRn D130 (pH switch)', 'H433A: ~10× weaker', '~3× shorter'],
        ['N434', 'Asn', 'H-bond + van der Waals to FcRn W131', 'N434S: ~3× stronger (LS)', '~3× longer (LS)'],
        ['H435', 'His', 'Salt bridge to FcRn E116 (pH switch)', 'H435A: abolished', 'Abolished recycling'],
        ['Y436', 'Tyr', 'Aromatic packing + H-bond', 'Y436A: ~3× weaker', '~1.5× shorter'],
        ['M252', 'Met', 'Adjacent hydrophobic contact', 'M252Y: ~10× stronger (YTE)', '~4× longer (YTE)'],
        ['T250', 'Thr', 'Peripheral contact', 'T250Q/M428L: enhanced', '~2× longer'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Tissue Distribution of FcRn — Beyond Endothelium',
      color: 'blue',
      content:
        'While vascular endothelial cells are the primary site of IgG homeostatic recycling, FcRn is expressed in multiple tissue compartments with distinct physiological roles. (1) Haematopoietic cells: monocytes, macrophages, and dendritic cells express FcRn and use it for immune complex internalisation, antigen processing, and MHC-II cross-presentation. Macrophage FcRn also contributes to IgG recycling in tissue compartments. (2) Intestinal epithelium: FcRn mediates bidirectional IgG transport across the intestinal barrier — apical-to-basolateral (luminal IgG uptake for immune surveillance) and basolateral-to-apical (IgG secretion into the gut lumen for pathogen neutralisation). (3) Pulmonary epithelium: FcRn transports IgG across airway epithelium, relevant for inhaled antibody delivery strategies. (4) Renal proximal tubules: FcRn rescues filtered IgG from urinary excretion by recycling it back into the peritubular capillaries. (5) Hepatocytes: liver FcRn contributes to IgG catabolism and albumin recycling. (6) Placental syncytiotrophoblasts: FcRn mediates maternal-to-foetal IgG transfer in the third trimester, ensuring passive immunity of the neonate. (7) Blood-brain barrier endothelium: FcRn expression here is the basis for investigating antibody brain penetration strategies (reverse transcytosis).',
    },
    {
      type: 'card',
      title: 'Albumin Recycling via FcRn — Shared Mechanism',
      color: 'teal',
      content:
        'FcRn binds not only IgG but also serum albumin (67 kDa), and this dual binding is responsible for the similarly long half-lives of both proteins (~21 days for IgG, ~19 days for albumin). Importantly, albumin and IgG bind to distinct, non-overlapping sites on FcRn: IgG binds at the α2 domain (I253/H310/H435 interface), while albumin binds at the α1 domain via its domain III. Both interactions are pH-dependent — albumin binding to FcRn is also mediated by histidine residues on albumin (His464, His510, His535) that become protonated at endosomal pH. Because the binding sites are non-overlapping, FcRn can simultaneously bind one IgG and one albumin molecule, forming a ternary complex. This has important implications: (1) albumin-Fc fusion proteins (e.g., albutrepin) can exploit both binding sites; (2) engineered albumin-binding domains (e.g., ABD094) fused to therapeutic proteins achieve half-life extension through FcRn-mediated albumin recycling; (3) perturbation of one binding site (e.g., by Fc-engineering mutations) does not affect the other. The shared FcRn recycling mechanism for IgG and albumin is one of the most elegant examples of receptor economy in human physiology.',
    },
    {
      type: 'callout',
      title: 'CMC Implication — FcRn Binding as a CQA',
      variant: 'warning',
      content:
        'FcRn binding affinity at pH 6.0 is a critical quality attribute for all therapeutic mAbs and Fc-fusion proteins. Modifications that perturb the CH2–CH3 elbow region — including oxidation of Met252 (a common degradation pathway), deamidation of Asn434, and isomerisation of Asp at positions near the FcRn contact site — can reduce FcRn binding and shorten in vivo half-life. Forced degradation studies (ICH Q5C) must evaluate FcRn binding of stressed samples. SPR-based FcRn binding assays should be performed at both pH 6.0 (binding) and pH 7.4 (release): an ideal therapeutic mAb shows tight binding at pH 6.0 and complete dissociation at pH 7.4. Engineered variants (YTE, LS) that enhance pH 6.0 binding must be verified to maintain clean pH 7.4 release — mutations that increase pH 7.4 binding ("sticky Fc") can paradoxically reduce half-life by preventing release from FcRn at the cell surface.',
    },
    {
      type: 'callout',
      title: 'Key Principle — The Histidine pKa Window',
      variant: 'info',
      content:
        'The entire FcRn recycling mechanism depends on histidine\'s unique physicochemical property: an imidazole side-chain pKa of approximately 6.0–6.5, which falls precisely in the pH range between endosomal lumen (pH 5.5–6.0) and blood (pH 7.4). No other naturally occurring amino acid has a pKa in this range. Asp/Glu (pKa ~4) are already deprotonated at endosomal pH; Lys/Arg (pKa ~10–12) remain protonated at both pH values. Only histidine transitions between charged and neutral states across the endosomal-to-surface pH gradient. This makes histidine a natural pH-sensing switch, and evolution has placed three histidines (H310, H433, H435) at the Fc–FcRn interface to exploit this property. Understanding this principle is essential for rational Fc engineering: any half-life-extending mutation must enhance pH 6.0 binding without introducing contacts that persist at pH 7.4.',
    },
  ],
  mentorQuestions: [
    'Explain the molecular mechanism by which Met252 oxidation (a common forced-degradation product) reduces FcRn binding and IgG half-life. How would you design a stability-indicating FcRn binding assay to detect this modification?',
    'IgG3 has a half-life of ~7 days due to R435 instead of H435. If you replaced R435 with histidine in an IgG3 backbone, would you expect to fully restore the 21-day half-life? What other IgG3-specific features might limit FcRn recycling efficiency?',
    'A bispecific antibody with a knobs-into-holes heterodimeric Fc shows 30% reduced FcRn binding compared to homodimeric IgG1. Given the 2:1 FcRn:IgG stoichiometry and cooperative binding model, what structural explanation would you propose, and how would you investigate it?',
  ],
};
