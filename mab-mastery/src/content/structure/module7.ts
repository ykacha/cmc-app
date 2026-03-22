import type { ModuleContent } from '../../types/content';

export const module7: ModuleContent = {
  id: 'structure-m7',
  sectionId: 'structure',
  moduleNumber: 7,
  eyebrow: 'STRUCTURE 08',
  title: 'CH1-CL Interface',
  lead: 'The constant domain interface between heavy and light chains — inter-chain disulfide bonding, CrossMAb technology, and bispecific engineering at the CH1-CL junction.',
  tags: [
    { label: 'Inter-chain S-S', color: 'amber' },
    { label: 'CrossMAb', color: 'purple' },
    { label: 'Bispecifics', color: 'blue' },
  ],
  stats: [
    { label: 'Inter-chain Bond', value: 'C220-C214' },
    { label: 'Interface Area', value: '~800 A\u00B2' },
    { label: '\u03BA vs \u03BB', value: '60:40 human' },
    { label: 'CrossMAb Year', value: '2011' },
  ],
  sections: [
    {
      type: 'card',
      title: 'CH1-CL Inter-chain Disulfide Bond',
      color: 'amber',
      content:
        'The sole covalent linkage between the heavy-chain constant region and the light chain is the inter-chain disulfide bond between C220 (CH1, EU numbering) and C214 (CL, EU numbering). In IgG1, this bond forms post-translationally in the ER after chaperone-assisted folding of each domain. The C220 residue sits at the C-terminal end of the CH1 domain, while C214 is at the C-terminal end of CL. The bond geometry is solvent-exposed, making it susceptible to partial reduction under manufacturing stress. Under non-reducing CE-SDS, loss of this bond produces a characteristic ~25 kDa free light chain peak and a ~150 kDa species lacking one LC. IgG2 differs fundamentally: the inter-chain disulfide connects C131 (CH1) to C214 (CL) via a shorter linker, and IgG2 can form multiple disulfide isoforms (A, A/B, B) depending on redox conditions in the hinge-CH1 region.',
    },
    {
      type: 'table',
      title: 'CH1-CL Disulfide Bond Comparison Across IgG Subclasses',
      headers: ['IgG Subclass', 'HC Cys (EU)', 'LC Cys (EU)', 'Linker Length', 'Bond Accessibility', 'Isoform Risk'],
      rows: [
        ['IgG1', 'C220', 'C214', '~12 A distance', 'Solvent-exposed', 'Low'],
        ['IgG2', 'C131', 'C214', '~8 A distance', 'Partially buried', 'High (A/B isoforms)'],
        ['IgG3', 'C220', 'C214', '~12 A distance', 'Solvent-exposed', 'Low'],
        ['IgG4', 'C220', 'C214', '~12 A distance', 'Solvent-exposed', 'Moderate (half-Ab)'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '\u03BA Light Chain Structural Features',
      color: 'blue',
      content:
        'The human \u03BA light chain (encoded by IGKC on chromosome 2) is the predominant LC isotype, comprising approximately 60% of serum immunoglobulins. The CL\u03BA domain spans residues 108-214 (EU numbering) and contains a single intra-domain disulfide bond between C134 and C194. Key structural features distinguishing CL\u03BA from CL\u03BB include: (1) a shorter DE loop (residues 170-177) that creates a distinctive CH1-CL\u03BA interface topology, (2) a Ser at position 191 (vs Pro in CL\u03BB) that affects local backbone rigidity, and (3) a conserved Arg at position 211 that forms a critical salt bridge with Asp at CH1 position 148 across the interface. The CL\u03BA interface buries ~800 A\u00B2 of solvent-accessible surface area against CH1, with approximately 12-14 direct contact residues on each side. Kabat numbering for the V\u03BA-C\u03BA junction places the boundary at V\u03BA residue 107.',
    },
    {
      type: 'card',
      title: '\u03BB Light Chain Structural Differences',
      color: 'teal',
      content:
        'The human \u03BB light chain (IGLC1-7 gene cluster on chromosome 22) accounts for ~40% of human serum Ig. There are seven functional IGLC genes, but IGLC1-3 dominate expression. Structurally, CL\u03BB differs from CL\u03BA at the CH1 interface in several critical ways: (1) Pro191 in CL\u03BB introduces a rigid kink in the FG loop absent in CL\u03BA, altering the angle of CH1-CL\u03BB packing by ~5 degrees; (2) the C-terminal residues 210-214 adopt a different backbone trajectory, positioning C214 for the inter-chain disulfide with slightly different geometry; (3) Gln at CL\u03BB position 135 (vs Glu in CL\u03BA) changes the electrostatic complementarity at the inner face. For CMC development, \u03BB-containing mAbs may show different CEX charge variant profiles due to the altered pI contribution of CL\u03BB (typically ~0.2 pH units lower pI than the equivalent \u03BA construct). Analytical assays such as isoelectric focusing and icIEF must be optimised accordingly.',
    },
    {
      type: 'table',
      title: 'CH1-CL Interface Contact Residues',
      headers: ['CH1 Residue (EU)', 'CL Residue (EU)', 'Interaction Type', 'Conservation', 'Engineering Relevance'],
      rows: [
        ['L128', 'F116', 'Hydrophobic core', 'Invariant', 'Core packing — mutation destabilises'],
        ['A141', 'L135', 'Van der Waals', 'Conserved', 'Minor contributor'],
        ['S148 (D148 in some)', 'R211', 'Salt bridge', 'Highly conserved', 'Charged-pair mutation target'],
        ['V173', 'S174/Q160', 'Hydrophobic + H-bond', 'Conserved', 'CrossMAb domain swap tolerant'],
        ['F174', 'V133', 'Hydrophobic core', 'Invariant', 'Core packing'],
        ['T178', 'T164', 'H-bond network', 'Conserved', 'Moderate engineering tolerance'],
        ['Y185', 'F118', 'Aromatic stacking', 'Conserved', 'Aromatic cage residue'],
        ['K147', 'E124', 'Salt bridge', 'Semi-conserved', 'Key charged-pair mutation site'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'CrossMAb Technology for Correct Light Chain Pairing',
      color: 'purple',
      content:
        'CrossMAb technology, developed at Roche/Genentech and first published in 2011 (Schaefer et al., PNAS 108:11187), solves the light chain mis-pairing problem in bispecific antibodies. In a standard bispecific format combining two different half-antibodies, four possible LC-HC pairings exist, of which only one is the desired bispecific. CrossMAb swaps the CH1 and CL domains on one arm: the heavy chain of arm B carries CL instead of CH1, and the light chain of arm B carries CH1 instead of VL-CL. Because CL-CH1 interactions are sterically incompatible with CH1-CH1 or CL-CL self-pairing, each LC can only pair with its cognate HC. Three CrossMAb formats exist: CrossMAb(CH1-CL) swaps the entire constant domains, CrossMAb(VH-VL) swaps the variable domains, and CrossMAb(Fab) swaps the entire Fab arm. CrossMAb(CH1-CL) is preferred because it preserves the native VH-VL pairing geometry critical for antigen binding. Emicizumab (Hemlibra), approved 2017 for haemophilia A, uses a different bispecific format but demonstrates the clinical importance of correct chain pairing.',
    },
    {
      type: 'bullets',
      title: 'Charged-Pair Mutations for Heterodimer Enforcement',
      color: 'purple',
      items: [
        'K147E (CH1) / E124K (CL): Swapping the native salt-bridge polarity on one arm forces electrostatic complementarity with only the intended LC. The K147E mutation on HC-B repels the native E124 on LC-A while attracting the engineered K124 on LC-B.',
        'D148K (CH1) / K213E (CL): Alternative charged-pair set targeting the second salt bridge at the CH1-CL interface. Combining both pairs (quadruple mutant) achieves >98% correct pairing in co-expression systems.',
        'Electrostatic steering mutations must be validated by intact-mass MS to confirm absence of mis-paired species. Expected mass differences between correct and mis-paired bispecific are typically 0-50 Da (within glycoform heterogeneity), requiring deglycosylated intact mass or middle-down analysis.',
        'Thermal stability impact: charged-pair mutations typically reduce CH1-CL Tm by 2-5 degrees C. DSC or nanoDSF must confirm that the Fab Tm remains above 60 degrees C for acceptable stability.',
        'Alternative approaches include common light chain (Merus), DuoBody Fab-arm exchange (Genmab), and DVD-Ig (AbbVie) — each with distinct CMC challenges.',
      ],
    },
    {
      type: 'table',
      title: 'Bispecific LC Pairing Technologies Comparison',
      headers: ['Technology', 'Company', 'LC Pairing Strategy', 'Correct Pairing %', 'Key CMC Challenge', 'Approved Example'],
      rows: [
        ['CrossMAb', 'Roche', 'CH1-CL domain swap', '>95%', 'Swapped domain Tm reduction', 'Faricimab (2022)'],
        ['Common LC', 'Merus', 'Single LC for both arms', '100%', 'Affinity compromise on one arm', 'Zenocutuzumab (2024)'],
        ['DuoBody', 'Genmab', 'Fab-arm exchange (F405L/K409R)', '>95%', 'Controlled reduction conditions', 'Epcoritamab (2023)'],
        ['Charged pairs', 'Various', 'Electrostatic steering at CH1-CL', '>98%', 'Tm reduction, charge variants', 'None yet approved'],
        ['Ortho-Fab', 'Various', 'Orthogonal Fab interface design', '>97%', 'Extensive engineering validation', 'None yet approved'],
        ['KiH + CrossMAb', 'Roche', 'HC hetero + LC steering', '>99%', 'Combined mutation burden', 'Glofitamab (2023)'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Ortho-Fab Interface Engineering',
      color: 'blue',
      content:
        'Ortho-Fab (orthogonal Fab) technology redesigns the CH1-CL interface itself to create two mutually exclusive pairing surfaces. Lewis et al. (Nature Biotechnology, 2014) used computational design to identify mutations that maintain CH1-CL affinity within one pair while creating steric clashes with the alternative pair. Key mutations include: (1) steric complementarity redesign at positions L128/F118 and F174/V133 creating a "lock and key" that differs between arms; (2) cavity-filling mutations analogous to knobs-into-holes but at the Fab constant interface; (3) combined electrostatic and steric mutations achieving >97% correct pairing. The CMC challenge with ortho-Fab is the extensive mutational burden: 4-8 mutations per Fab constant region can affect protein A binding (if near the CH1-VH interface), thermal stability, and immunogenicity. Characterisation requires thermal stability profiling by DSC (separate Fab and Fc transitions), forced degradation studies comparing engineered vs wild-type arms, and anti-drug antibody (ADA) risk assessment.',
    },
    {
      type: 'callout',
      title: 'CMC Analytical Strategy for CH1-CL Pairing Confirmation',
      variant: 'warning',
      content:
        'Confirming correct LC pairing in bispecific production requires orthogonal methods: (1) Non-reducing CE-SDS resolves HC-LC covalent pairs (correct bispecific ~150 kDa vs mis-paired species); (2) Intact mass spectrometry after deglycosylation distinguishes bispecific from homodimer when mass difference is >200 Da; (3) For mass-similar species, middle-down LC-MS after IdeS digestion yields Fab fragments with distinct masses; (4) Hydrophobic interaction chromatography (HIC) or mixed-mode chromatography can separate pairing variants based on surface hydrophobicity differences. Quantitation of mis-paired species should target <5% by CE-SDS and <2% by LC-MS for clinical material. Process development must optimise co-transfection HC:LC plasmid ratios (typically 1:1:1:1 for two HC + two LC, but empirical optimisation often shifts to 1.2:0.8:1.0:1.0 ratios).',
    },
    {
      type: 'bullets',
      title: 'IgG2 Disulfide Isoforms at the CH1-CL Junction',
      items: [
        'IgG2-A isoform: Classical arrangement with 4 inter-chain disulfide bonds — C131(HC)-C214(LC) for both HC-LC pairs, plus C226-C226\' and C229-C229\' in the hinge. All cysteines in expected pairing.',
        'IgG2-B isoform: Alternative arrangement where hinge cysteines form non-canonical bonds connecting HC to LC through the upper hinge. C226 and C229 participate in HC-LC bridges rather than HC-HC bridges, creating a compact, rigid structure.',
        'IgG2-A/B isoform: Hybrid with one arm in A-form and one arm in B-form. This is the predominant species in CHO-produced IgG2 (typically 50-70% of total), with ratios dependent on cell culture redox conditions.',
        'Redox control: Dissolved oxygen, cysteine/cystine feed ratios, copper supplementation, and harvest timing all shift the A:A/B:B equilibrium. Copper at 4-8 ppb promotes isoform A by catalysing disulfide reshuffling toward the thermodynamic product.',
        'Detection: Reversed-phase HPLC under non-denaturing conditions resolves all three isoforms. IgG2 molecules must specify isoform distribution in release testing if the isoform ratio affects potency.',
      ],
    },
  ],
  mentorQuestions: [
    'You are developing a bispecific antibody where both arms bind targets with similar molecular weights. The intact mass difference between the correct bispecific and the LC-mis-paired species is only 87 Da. How would you design an analytical strategy to quantitate mis-paired species below the 2% specification?',
    'A CrossMAb bispecific shows a 4 degrees C reduction in Fab Tm for the domain-swapped arm compared to the wild-type arm. What formulation and process controls would you implement to ensure the swapped arm does not drive aggregation during manufacturing and storage?',
    'Your common-light-chain bispecific achieves 100% correct LC pairing but one arm shows 8-fold lower binding affinity than the parent monoclonal. Walk through the structural basis for this compromise and the CMC implications for potency assay development.',
  ],
};

export default module7;
