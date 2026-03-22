import type { ModuleContent } from '../../types/content';

export const module1: ModuleContent = {
  id: 'structure-m1',
  sectionId: 'structure',
  moduleNumber: 1,
  eyebrow: 'STRUCTURE 02',
  title: 'The Immunoglobulin Fold',
  lead: 'The \u03b2-sandwich architecture that provides the structural foundation for all antibody domains \u2014 from thermal stability to aggregation propensity.',
  tags: [
    { label: '\u03b2-Sandwich', color: 'blue' },
    { label: 'Thermal Stability', color: 'amber' },
    { label: 'Domain Architecture', color: 'teal' },
  ],
  stats: [
    { label: '\u03b2-Strands', value: '7-9 per domain' },
    { label: 'Ig Fold Size', value: '~110 residues' },
    { label: 'Intra-domain S-S', value: '1 per domain' },
    { label: 'Superfamily Members', value: '>750' },
  ],
  sections: [
    {
      type: 'card',
      title: '\u03b2-Sandwich Architecture',
      color: 'blue',
      content:
        'The immunoglobulin fold is one of the most widespread protein structural motifs in nature, found in over 750 members of the immunoglobulin superfamily including antibodies, T-cell receptors, MHC molecules, and cell adhesion molecules. Each Ig domain consists of approximately 110 amino acids arranged into two anti-parallel \u03b2-sheets packed face-to-face, forming a "sandwich" with a hydrophobic core. Variable domains (VH, VL) adopt a 9-strand topology with strands designated A, B, C, C\u2032, C\u2032\u2032, D, E, F, G arranged into a 4-strand sheet (ABED) facing a 5-strand sheet (CC\u2032C\u2032\u2032FG). Constant domains (CH1, CL, CH2, CH3) have a simpler 7-strand topology (ABD/CEFG) lacking the C\u2032 and C\u2032\u2032 strands. The additional strands in variable domains form the structural framework for CDR loops \u2014 specifically, the C\u2032-C\u2032\u2032 loop corresponds to CDR2 and the connecting segments between strands B-C (CDR1) and F-G (CDR3) form the remaining CDR loops.',
    },
    {
      type: 'card',
      title: 'Intra-Domain Disulfide Bond',
      color: 'amber',
      content:
        'Each immunoglobulin domain contains a single conserved intra-domain disulfide bond that links the two \u03b2-sheets together, acting as a structural "staple." In VH domains, this bond connects Cys22 to Cys92 (Kabat numbering), spanning approximately 70 residues in sequence but only ~6 \u00c5 in three-dimensional space. In VL domains, the equivalent bond is Cys23 to Cys104 (Kabat). In constant domains, analogous positions are conserved (e.g., CH2 Cys261-Cys321, CH3 Cys367-Cys425 by EU numbering). This disulfide bond plays multiple critical roles: (1) Folding nucleation \u2014 formation of the intra-domain disulfide is an early event in Ig domain folding and helps template the correct \u03b2-sheet topology; (2) Thermodynamic stability \u2014 reduction of the intra-domain disulfide typically decreases domain Tm by 15-25\u00b0C; (3) Kinetic stability \u2014 the disulfide prevents sampling of extensively unfolded states that would expose aggregation-prone hydrophobic core residues. In manufacturing, incomplete intra-domain disulfide formation (e.g., due to reducing conditions in the bioreactor) leads to conformationally destabilised species with increased aggregation propensity.',
    },
    {
      type: 'table',
      title: 'Domain Thermal Stability (Tm Values by DSC)',
      headers: ['Domain', 'Typical Tm (\u00b0C)', 'Key Stabilising Features', 'Aggregation Risk'],
      rows: [
        ['CH2', '60-65', 'N297 glycan support; no direct CH2-CH2 protein contacts', 'Highest \u2014 unfolds first'],
        ['VH', '65-75', 'CDR loop conformation; VH-VL interface packing', 'Moderate \u2014 sequence-dependent'],
        ['VL', '60-80', 'Highly variable; framework and CDR composition', 'Low-Moderate'],
        ['CH1', '70-78', 'CH1-CL inter-chain disulfide; \u03b2-sheet hydrogen bonds', 'Low'],
        ['CL', '70-80', 'Tight \u03ba/\u03bb fold; CH1-CL interface', 'Low'],
        ['Fab (overall)', '65-80', 'VH-VL + CH1-CL packing; inter-domain contacts', 'Moderate'],
        ['CH3', '82-85', 'Tight CH3-CH3 homodimer interface (~2000 \u00c5\u00b2 buried)', 'Very Low \u2014 unfolds last'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Why CH2 Unfolds First',
      color: 'red',
      content:
        'CH2 is uniquely vulnerable among IgG domains because it lacks the stabilising inter-domain protein-protein contacts present in all other domain pairs. In the Fab, VH-VL and CH1-CL form tight, mutually stabilising interfaces (~700-800 \u00c5\u00b2 buried surface area each). In the Fc, CH3-CH3 forms the tightest homodimeric interface in the entire molecule (~2000 \u00c5\u00b2). But CH2-CH2 domains do not contact each other directly \u2014 they are separated by the N297 glycans, which fill the inter-domain space and provide the primary lateral stabilisation. This means CH2 stability is uniquely dependent on glycosylation: removal of the N297 glycan (by PNGase F treatment, N297Q mutation, or tunicamycin inhibition) typically reduces CH2 Tm by 5-10\u00b0C. Furthermore, CH2 has a relatively large solvent-accessible hydrophobic surface area compared to other domains, creating aggregation-prone patches that become exposed upon even partial unfolding. This makes CH2 the aggregation nucleation domain \u2014 the domain whose stability most directly determines the thermal stability ceiling of the entire molecule.',
    },
    {
      type: 'card',
      title: 'Hydrophobic Core Packing',
      color: 'teal',
      content:
        'The hydrophobic core of each Ig domain is composed of highly conserved residues positioned at the interior of the \u03b2-sandwich. A buried tryptophan residue is present in virtually every Ig domain \u2014 typically at position 35 or 36 in variable domains (Kabat) and at structurally equivalent positions in constant domains. This "conserved Trp" packs against other core hydrophobic residues (Val, Leu, Ile, Phe) and its fluorescence properties serve as a conformational reporter: native Trp fluorescence (\u03bbmax ~330 nm) shifts to ~350 nm upon domain unfolding and solvent exposure, forming the basis for intrinsic fluorescence-based stability measurements (nanoDSF). Additional conserved core residues include: (1) A hydrophobic residue at position 89 (VH, Kabat) that packs beneath HCDR3; (2) Phe/Tyr residues at the inner face of each \u03b2-sheet; (3) A conserved Pro in strand A that initiates the correct \u03b2-turn geometry. Mutations at core packing positions are generally destabilising and are avoided during humanisation. The computational tool SAbPred/AbYsis can flag proposed mutations that conflict with core packing consensus.',
    },
    {
      type: 'callout',
      title: 'CH2 \u2014 The Aggregation Nucleation Domain',
      variant: 'warning',
      content:
        'CH2 is the aggregation nucleation domain. Its low Tm (~60-65\u00b0C) and solvent-exposed hydrophobic patches make it the first domain to unfold under thermal stress. This directly impacts formulation development \u2014 excipients must stabilise CH2. In DSC, the first unfolding transition (Tm1) almost always corresponds to CH2. Formulation excipients that increase Tm1 (e.g., sucrose, trehalose, arginine) preferentially stabilise CH2 and are the most effective at preventing aggregation. A formulation screen that does not improve Tm1 is unlikely to improve long-term storage stability.',
    },
    {
      type: 'table',
      title: 'Ig Domain Structural Features \u2014 Variable vs Constant',
      headers: ['Feature', 'Variable Domain (V)', 'Constant Domain (C)'],
      rows: [
        ['\u03b2-Strand count', '9 (A, B, C, C\u2032, C\u2032\u2032, D, E, F, G)', '7 (A, B, D, C, E, F, G)'],
        ['Sheet 1 composition', 'ABED (4 strands)', 'ABD (3 strands)'],
        ['Sheet 2 composition', 'CC\u2032C\u2032\u2032FG (5 strands)', 'CEFG (4 strands)'],
        ['CDR loops', 'Yes \u2014 3 per domain (CDR1-3)', 'No'],
        ['Sequence variability', 'High (CDRs) / Low (FRs)', 'Low (<5% within subclass)'],
        ['Typical domain size', '~115-120 residues', '~100-110 residues'],
        ['Intra-domain disulfide', 'VH: C22-C92; VL: C23-C104', 'CH2: C261-C321; CH3: C367-C425'],
        ['Conserved Trp position', 'W36 (VH, Kabat); W35 (VL)', 'Structurally equivalent core position'],
      ],
    },
    {
      type: 'card',
      title: '\u03b2-Sheet Hydrogen Bond Network',
      color: 'green',
      content:
        'The structural integrity of the Ig fold depends on an extensive hydrogen bond network between backbone amide and carbonyl groups of adjacent \u03b2-strands. In each domain, ~20-30 main-chain hydrogen bonds connect the anti-parallel \u03b2-strands within each sheet, plus ~4-6 hydrogen bonds at the edges where the two sheets contact each other. This hydrogen bond network creates the characteristic rigid, protease-resistant architecture of antibodies. Disruption of these hydrogen bonds (by mutagenesis or post-translational modification) is rare in nature but can occur during manufacturing: (1) Deamidation of Asn residues in \u03b2-strands introduces a succinimide intermediate that can distort local backbone geometry; (2) Asp isomerisation inserts an extra methylene group in the backbone, disrupting hydrogen bond register; (3) Oxidation of Met or Trp residues at core positions can sterically perturb packing. These modifications are detectable by peptide mapping and are monitored as critical quality attributes (CQAs) when they occur at structurally important positions.',
    },
    {
      type: 'bullets',
      title: 'CMC Implications \u2014 Ig Fold Stability',
      items: [
        'DSC thermogram interpretation: A well-resolved DSC profile shows 2-3 transitions \u2014 Tm1 (CH2, ~62\u00b0C), Tm2 (Fab, ~71\u00b0C), Tm3 (CH3, ~83\u00b0C). Overlapping transitions complicate deconvolution and may indicate domain destabilisation. Biosimilar comparability requires overlay of DSC thermograms with reference product.',
        'Formulation screening by nanoDSF (e.g., Prometheus NT.48): Measures intrinsic Trp fluorescence ratio (350/330 nm) as a function of temperature. Tonset and Tm are determined for up to 48 conditions simultaneously, enabling rapid buffer/excipient screening. Tonset > 60\u00b0C generally required.',
        'Accelerated stability correlations: The relationship between thermal stability (Tm/Tonset) and real-time aggregation rates is molecule-specific. Higher Tm generally correlates with lower aggregation, but exceptions exist when aggregation is driven by colloidal instability (self-association) rather than conformational instability.',
        'Domain Tm as developability metric: Candidate molecules with CH2 Tm < 58\u00b0C or overall Tonset < 55\u00b0C are flagged as high-risk during developability assessment. Such molecules may require specialised formulations or engineering intervention (e.g., stabilising mutations in CH2).',
        'Glycan dependency: Because CH2 stability depends on the N297 glycan, changes in glycosylation profile (e.g., different CHO cell lines, process changes) can shift CH2 Tm by 1-3\u00b0C. This is a mechanism by which upstream process changes impact downstream product quality.',
        'Freeze-thaw stability: Ig fold integrity during freeze-thaw cycling is assessed by SEC (monomer content), sub-visible particle counts (MFI), and turbidity. The \u03b2-sandwich architecture is relatively robust to freeze-thaw, but ice-water interface stress can induce surface adsorption and partial unfolding.',
      ],
    },
    {
      type: 'card',
      title: 'The Immunoglobulin Superfamily Context',
      color: 'purple',
      content:
        'The Ig fold is not unique to antibodies \u2014 it is the defining structural motif of the immunoglobulin superfamily (IgSF), which includes over 750 proteins in the human genome. IgSF members include: T-cell receptors (TCR \u03b1\u03b2 and \u03b3\u03b4), MHC class I and II molecules, co-receptors (CD4, CD8, CD28), adhesion molecules (ICAM-1, VCAM-1, NCAM), growth factor receptors (PDGFR, VEGFR Ig domains), and Fc receptors (Fc\u03b3RI/II/III, FcRn). The conservation of the Ig fold across this superfamily reflects its exceptional structural properties: high thermodynamic stability, resistance to proteolysis, tolerance for loop insertions (CDRs), and ability to form regulated protein-protein interactions through edge-strand and face-to-face packing. For CMC scientists, the IgSF context is relevant because Fc fusion proteins (e.g., etanercept, abatacept, aflibercept) graft non-antibody IgSF domains onto an IgG Fc, inheriting the Fc\u2019s pharmacokinetic and purification advantages while maintaining the Ig fold architecture throughout.',
    },
    {
      type: 'callout',
      title: 'Analytical Readout \u2014 Domain Unfolding by DSC',
      variant: 'info',
      content:
        'A well-designed DSC experiment on an IgG1 at 0.5-1.0 mg/mL in formulation buffer (scan rate 1\u00b0C/min) should resolve 2-3 endothermic transitions. Assign transitions based on: (1) deglycosylated sample \u2014 CH2 transition shifts down by 5-10\u00b0C, confirming its identity; (2) isolated Fab fragment (papain digest) \u2014 shows only Fab transition; (3) isolated Fc fragment \u2014 shows CH2 and CH3 transitions. This deconvolution strategy is essential for biosimilar characterisation and is expected in regulatory submissions as part of higher-order structure (HOS) comparability.',
    },
    {
      type: 'table',
      title: 'Excipient Effects on CH2 Thermal Stability',
      headers: ['Excipient', 'Typical \u0394Tm (CH2)', 'Mechanism', 'Typical Concentration'],
      rows: [
        ['Sucrose', '+3 to +6\u00b0C', 'Preferential exclusion (Timasheff mechanism)', '5-10% w/v'],
        ['Trehalose', '+3 to +5\u00b0C', 'Preferential exclusion', '5-10% w/v'],
        ['Sorbitol', '+2 to +4\u00b0C', 'Preferential exclusion', '5-10% w/v'],
        ['Arginine-HCl', '+1 to +3\u00b0C', 'Aggregation suppression + mild stabilisation', '50-200 mM'],
        ['NaCl (>150 mM)', '\u22121 to \u22123\u00b0C', 'Electrostatic screening; can destabilise', '150-300 mM'],
        ['Polysorbate 80', 'Minimal \u0394Tm', 'Interface protection, not conformational stabilisation', '0.01-0.1% w/v'],
        ['Histidine (pH 6.0)', 'Reference buffer', 'Standard formulation buffer for mAbs', '10-25 mM'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Loop Insertions and Structural Tolerance',
      color: 'blue',
      content:
        'A remarkable property of the Ig fold is its tolerance for insertions at the loop regions connecting \u03b2-strands. The CDR loops represent the most dramatic example \u2014 HCDR3 can range from 3 to over 30 residues in length without disrupting the underlying \u03b2-sandwich scaffold. This structural tolerance is the basis for antibody diversity and has been exploited in protein engineering to graft novel binding loops onto Ig domain scaffolds (e.g., fibronectin type III domains, designed ankyrin repeat proteins). For CMC scientists, loop tolerance has a practical implication: CDR length and composition significantly influence domain thermal stability and aggregation propensity, but the framework \u03b2-sheet structure remains robust. This means that stability differences between antibodies are primarily driven by CDR loop properties and VH-VL packing, not by the core Ig fold itself. Consequently, developability assessment focuses on CDR composition (chemical liabilities, hydrophobicity patches) and VH-VL interface strength rather than framework stability per se.',
    },
  ],
  mentorQuestions: [
    'Why does CH2 have the lowest Tm among IgG domains, and what structural features explain this?',
    'How would you use DSC data to compare a biosimilar to its reference product?',
    'What happens to the Ig fold when you remove the glycan at Asn297?',
  ],
};
