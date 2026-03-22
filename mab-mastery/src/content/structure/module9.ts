import type { ModuleContent } from '../../types/content';

export const module9: ModuleContent = {
  id: 'structure-m9',
  sectionId: 'structure',
  moduleNumber: 9,
  eyebrow: 'STRUCTURE 10',
  title: 'CH2 Domain',
  lead: 'The effector domain — Fc\u03B3R contact residues at atomic resolution, glycan-CH2 structural interdependence, and the complete Fc engineering mutation landscape.',
  tags: [
    { label: 'Fc\u03B3R Contacts', color: 'red' },
    { label: 'Fc Engineering', color: 'amber' },
    { label: 'Effector Function', color: 'purple' },
  ],
  stats: [
    { label: 'Tm', value: '60-65\u00B0C' },
    { label: 'Key Glycan', value: 'N297' },
    { label: 'Fc\u03B3R Contacts', value: '~12 residues' },
    { label: 'C1q Face', value: 'P329/P331' },
  ],
  sections: [
    {
      type: 'card',
      title: 'CH2 Domain Architecture and Thermal Properties',
      color: 'blue',
      content:
        'The CH2 domain (residues 231-340, EU numbering) is structurally unique among antibody constant domains. Unlike the tightly packed CH1-CL, CH3-CH3, and VH-VL dimers, the two CH2 domains do not make direct protein-protein contacts across the dimer interface. Instead, they are held in a defined spatial orientation by the N297-linked glycans, which bridge the ~15 angstrom gap between the two CH2 domains through carbohydrate-carbohydrate interactions. This glycan-mediated spacing creates the horseshoe-shaped Fc cavity that accommodates Fc\u03B3 receptor binding. The CH2 domain has the lowest thermal stability of any Fc domain, with Tm values of 60-65 degrees C for typical IgG1 molecules (compared to 70-75 degrees C for CH3 as measured by DSC). This relatively low Tm makes CH2 the first domain to unfold during thermal stress, and CH2 unfolding is the primary initiating event for Fc-mediated aggregation. The intra-domain disulfide C261-C321 stabilises the immunoglobulin fold, and its reduction drops CH2 Tm by an additional ~10 degrees C.',
    },
    {
      type: 'table',
      title: 'Complete Fc\u03B3R Contact Map — CH2 Domain Residues',
      headers: ['CH2 Residue (EU)', 'Secondary Structure', 'Fc\u03B3R Partner', 'Contact Type', 'Mutation Impact', 'In LALA Scope'],
      rows: [
        ['L234', 'Lower hinge loop', 'Fc\u03B3RIIIa W87/W110', 'Hydrophobic insertion', 'L234A: >99% ADCC loss', 'Yes'],
        ['L235', 'Lower hinge loop', 'Fc\u03B3RIIIa L158', 'Hydrophobic packing', 'L235A: >99% ADCC loss', 'Yes'],
        ['G236', 'Lower hinge loop', 'Fc\u03B3RIIIa K158', 'Backbone H-bond', 'G236A: new van der Waals to Fc\u03B3RIIIa', 'No'],
        ['S239', 'BC loop', 'Fc\u03B3RIIIa K158', 'H-bond (weak)', 'S239D: salt bridge to K158, ~20x ADCC', 'No'],
        ['D265', 'DE loop', 'Fc\u03B3RIIa H131', 'Salt bridge', 'D265A: abolishes all Fc\u03B3R binding', 'No'],
        ['N297', 'CE loop (glycan)', 'Fc\u03B3RIIIa (indirect)', 'Glycan-mediated CH2 positioning', 'N297A: aglycosylation, no effector', 'No'],
        ['K326', 'FG loop', 'C1q (direct)', 'Electrostatic', 'K326W: 5x CDC enhancement', 'No'],
        ['A327', 'FG loop', 'C1q (direct)', 'Contact surface', 'Contributes to C1q platform', 'No'],
        ['P329', 'FG loop', 'Fc\u03B3RIIIa W87', 'Proline sandwich', 'P329G: disrupts C1q + Fc\u03B3R', 'LALA-PG only'],
        ['A330', 'FG loop', 'Fc\u03B3RIIIa', 'Hydrophobic packing', 'A330L: enhanced ADCC (GASDALIE)', 'No'],
        ['P331', 'FG loop', 'C1q', 'Proline sandwich (C1q face)', 'P331S: abolishes CDC', 'No'],
        ['I332', 'FG loop', 'Fc\u03B3RIIIa Y157', 'Hydrophobic packing', 'I332E: H-bond to Y157, ~20x ADCC', 'No'],
        ['E333', 'FG loop', 'C1q', 'Electrostatic', 'E333A: moderate CDC reduction', 'No'],
        ['K334', 'FG loop', 'Fc\u03B3RIIa', 'Salt bridge', 'K334A: Fc\u03B3RIIa-selective reduction', 'No'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'LALA Mutation (L234A/L235A) — Mechanism at Atomic Resolution',
      color: 'red',
      content:
        'The LALA mutation replaces the two leucines at positions 234 and 235 with alanines, removing the hydrophobic side chains that insert into the Fc\u03B3R binding groove. In the crystal structure of the IgG1-Fc/Fc\u03B3RIIIa complex (PDB: 3SGJ), L234 projects its isobutyl side chain into a pocket formed by Fc\u03B3RIIIa residues W87 and W110, while L235 packs against L158 of Fc\u03B3RIIIa. The L234A mutation eliminates 47 angstrom-squared of hydrophobic contact surface, and L235A removes an additional 42 angstrom-squared. Together, the binding free energy loss is approximately 5 kcal/mol, reducing Fc\u03B3RIIIa affinity from ~200 nM (wild-type) to essentially undetectable (>100 micromolar). LALA preserves some residual C1q binding because the C1q contact surface (centred on P329-P331, the "proline sandwich") is spatially separated from the lower hinge Fc\u03B3R contact. LALA-mutant antibodies retain approximately 10-20% wild-type CDC activity. Clinical examples: atezolizumab (anti-PD-L1, IgG1-LALA) deliberately uses an effector-silent Fc to avoid depleting PD-L1-expressing T cells. Durvalumab uses a related triple mutation (L234F/L235E/D265A).',
    },
    {
      type: 'card',
      title: 'LALA-PG Mutation (L234A/L235A/P329G) — Complete Effector Silencing',
      color: 'amber',
      content:
        'LALA-PG adds the P329G mutation to the LALA backbone, targeting the "proline sandwich" interaction with C1q. In wild-type IgG1, P329 and P331 form a rigid double-proline motif that wedges into the C1q globular head domain through shape complementarity and hydrophobic contacts with Trp residues on C1q. P329G disrupts this motif by introducing backbone flexibility and removing the pyrrolidine ring contact. The combined LALA-PG triple mutation achieves: (1) >99.9% reduction in ADCC (Fc\u03B3RIIIa affinity undetectable); (2) >99% reduction in ADCP (Fc\u03B3RIIa affinity undetectable); (3) >99% reduction in CDC (C1q binding abolished). LALA-PG is considered the gold standard "silent Fc" for therapeutic applications where target binding must not trigger effector function — particularly immune checkpoint inhibitors and T-cell engagers where the bispecific backbone Fc should not kill effector T cells. Stability impact is minimal: LALA-PG typically reduces CH2 Tm by 1-2 degrees C and does not affect FcRn binding (the FcRn site on CH2-CH3 is remote from positions 234/235/329).',
    },
    {
      type: 'card',
      title: 'GASDALIE Mutation — Maximum ADCC Enhancement at Molecular Detail',
      color: 'purple',
      content:
        'The GASDALIE quadruple mutation (G236A/S239D/A330L/I332E), developed by Lazar et al. (PNAS 103:4005, 2006), engineers four complementary molecular contacts to achieve approximately 100-fold enhanced ADCC over wild-type IgG1. Each mutation contributes a distinct structural mechanism: (1) G236A creates new van der Waals contacts with Fc\u03B3RIIIa residues in the lower hinge-receptor interface, filling a small cavity at the binding groove entrance — the glycine-to-alanine substitution adds a methyl group that packs against the receptor surface; (2) S239D introduces a negatively charged aspartate that forms a salt bridge with K158 of Fc\u03B3RIIIa (V158 polymorphism variant), converting a weak serine H-bond into a strong ionic interaction — this single mutation alone provides ~20-fold ADCC enhancement; (3) A330L replaces the small alanine with a leucine, creating enhanced hydrophobic packing in the FG loop region that stabilises the Fc\u03B3R-bound conformation; (4) I332E substitutes isoleucine with glutamate, forming a hydrogen bond with Fc\u03B3RIIIa Y157 — the charged glutamate side chain reaches across the interface to contact the tyrosine hydroxyl. The aggregate effect increases Fc\u03B3RIIIa affinity from ~200 nM to ~2 nM, shifting the dose-response curve for NK cell-mediated ADCC by approximately 100-fold.',
    },
    {
      type: 'table',
      title: 'Complete Fc Engineering Mutation Catalogue',
      headers: ['Mutation Set', 'Residue Changes', 'Molecular Mechanism', 'Functional Outcome', 'Fold Change (ADCC)', 'Clinical Example'],
      rows: [
        ['LALA', 'L234A/L235A', 'Removes hydrophobic Fc\u03B3R insertion', 'Effector-silent (residual CDC)', '-99%', 'Atezolizumab (Tecentriq)'],
        ['LALA-PG', 'L234A/L235A/P329G', 'LALA + disrupts C1q proline sandwich', 'Fully silent (no ADCC/CDC/ADCP)', '-99.9%', 'Cibisatamab (Phase II)'],
        ['N297A', 'N297A (aglycosylation)', 'Eliminates glycan, CH2 collapses', 'No effector function, reduced Tm', '-99%', 'Otelixizumab (Phase III)'],
        ['DE', 'S239D/I332E', 'Salt bridge + H-bond to Fc\u03B3RIIIa', 'Enhanced ADCC', '+40-fold', 'Margetuximab (Margenza)'],
        ['GASDALIE', 'G236A/S239D/A330L/I332E', 'Four complementary Fc\u03B3R contacts', 'Maximum ADCC enhancement', '+100-fold', 'Preclinical'],
        ['DLE', 'S239D/A330L/I332E', 'Three-mutation ADCC enhancer', 'Strong ADCC, moderate CDC', '+70-fold', 'Preclinical'],
        ['SDIE', 'S239D/I332E', 'Same as DE', 'Enhanced ADCC + some ADCP', '+40-fold', 'MGA271 (Phase I)'],
        ['K322A', 'K322A', 'Removes C1q electrostatic contact', 'CDC-silent, ADCC intact', 'CDC -90%', 'Research tool'],
        ['K326W/E333S', 'K326W/E333S', 'Enhanced C1q hydrophobic + electrostatic', 'CDC enhancement', 'CDC +5-fold', 'Research'],
        ['Afucosylation', 'N/A (glycoengineering)', 'Removes steric clash at Fc\u03B3RIIIa D265', 'Enhanced ADCC via glycan', '+50-fold', 'Obinutuzumab (Gazyva)'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Glycan-CH2 Structural Interdependence',
      color: 'teal',
      content:
        'The N297-linked glycan is not merely a post-translational decoration but an integral structural component of the CH2 domain. Crystallographic studies (PDB: 1HZH, 1FC1) reveal that the core GlcNAc-GlcNAc-Man trisaccharide makes extensive contacts with the CH2 protein surface: (1) the first GlcNAc (GlcNAc-1) packs against F241 and F243 through CH-pi interactions; (2) the second GlcNAc (GlcNAc-2) contacts K246 and E258 through hydrogen bonds; (3) the branching mannose contacts D265 through a direct H-bond that positions the DE loop for Fc\u03B3R engagement. Removal of the glycan by N297A/Q/D mutation or PNGase F treatment causes CH2 domain collapse: the two CH2 domains move ~8 angstroms closer together, occluding the Fc\u03B3R binding groove. This collapse reduces CH2 Tm by approximately 10 degrees C (from 65 to 55 degrees C in typical IgG1) and eliminates all Fc\u03B3R binding. The core fucose residue (alpha-1,6 linked to GlcNAc-1) extends toward D265 on the partner CH2 domain, creating a steric clash with the Fc\u03B3RIIIa glycan at N162 — removal of core fucose (afucosylation) eliminates this clash, enhancing Fc\u03B3RIIIa affinity ~50-fold.',
    },
    {
      type: 'bullets',
      title: 'CH2 Stability and Aggregation — CMC Critical Path',
      color: 'amber',
      items: [
        'CH2 is the aggregation-initiating domain: partial unfolding of CH2 (at temperatures 5-10 degrees C below the DSC-measured Tm) exposes hydrophobic patches centred on F241/F243 and the glycan-protein interface, which nucleate intermolecular association.',
        'Accelerated stability at 40 degrees C primarily reports on CH2 stability. High-molecular-weight species (HMWS) formation rate at 40 degrees C correlates with CH2 Tm (R-squared > 0.85 across panels of IgG1 variants).',
        'Fc engineering mutations in CH2 must be evaluated for Tm impact: LALA reduces Tm by ~1-2 degrees C (minimal), GASDALIE reduces Tm by ~3-4 degrees C (moderate, requires formulation optimisation), N297A reduces Tm by ~10 degrees C (severe, limits developability).',
        'Formulation strategies targeting CH2 stability: sucrose (10-15% w/v) stabilises CH2 by preferential exclusion, increasing apparent Tm by 3-5 degrees C. Arginine (100-200 mM) reduces aggregation by disrupting hydrophobic intermolecular contacts. PS80 (0.02-0.05% w/v) prevents surface-induced CH2 unfolding at air-liquid interfaces.',
        'Process parameters affecting CH2 integrity: UF/DF shear stress (>4000 s-1 shear rate risks CH2 unfolding), freeze-thaw cycles (CH2 is sensitive to ice-interface denaturation), and low-pH viral inactivation (CH2 acid-unfolding begins at pH 3.0-3.5 for some molecules).',
      ],
    },
    {
      type: 'card',
      title: 'C1q Binding Surface — The Proline Sandwich',
      color: 'green',
      content:
        'C1q, the first component of the classical complement cascade, binds to the CH2 FG loop through a distinct surface that partially overlaps with but is separable from the Fc\u03B3R contact area. The key structural motif is the "proline sandwich": P329 and P331 present their pyrrolidine rings in a parallel orientation that creates a hydrophobic platform ~8 angstroms wide. The C1q globular head domain (gC1q) docks onto this platform through complementary tryptophan residues (W Trp residues in gC1q B-chain). Surrounding residues K326, A327, E333, and K334 provide electrostatic complementarity. Importantly, C1q binding requires hexameric IgG arrangement on the target cell surface — six IgG molecules must cluster to form a "staple" pattern that presents six Fc regions in a circular array with the right spatial geometry (~12 nm inter-Fc distance) for C1q hexavalent binding. This explains why CDC is highly antigen-density dependent and why small, mobile antigens (e.g., soluble receptors) rarely trigger CDC even with complement-competent IgG1. The P331S mutation (found naturally in IgG4) abolishes CDC by disrupting the proline sandwich without significantly affecting Fc\u03B3R binding.',
    },
    {
      type: 'callout',
      title: 'Fc\u03B3R Polymorphism and Its Impact on Fc Engineering Strategy',
      variant: 'info',
      content:
        'Fc\u03B3RIIIa exists as two allelic variants: V158 (valine, high affinity) and F158 (phenylalanine, low affinity). The V158 allele binds wild-type IgG1 Fc with ~200 nM KD, while F158 binds at ~500 nM. Approximately 10-15% of Caucasian populations are V/V homozygous, 40-45% are V/F heterozygous, and 40-50% are F/F homozygous. Fc engineering mutations like S239D/I332E preferentially enhance binding to both variants but may show greater fold-enhancement for F158 (the lower-affinity variant), narrowing the pharmacogenomic gap. This has clinical implications: clinical trials of Fc-enhanced antibodies should stratify patients by Fc\u03B3RIIIa genotype, and potency assays using NK cells should specify the donor genotype. Similarly, Fc\u03B3RIIa has H131 (high-affinity, binds IgG2) and R131 (low-affinity) variants that affect ADCP. CMC potency assays for ADCC should include both V158 and F158 reporter cell lines to ensure the product meets specifications across the patient population.',
    },
    {
      type: 'table',
      title: 'Fc Engineering — Analytical Confirmation Package',
      headers: ['Mutation Set', 'Primary Assay', 'Confirmatory Assay', 'Specification Approach', 'Key Control'],
      rows: [
        ['LALA / LALA-PG', 'Fc\u03B3R SPR binding panel', 'ADCC reporter assay', '<10% WT binding for each Fc\u03B3R', 'WT IgG1 positive control'],
        ['GASDALIE / DE', 'Fc\u03B3RIIIa (V158) SPR', 'Primary NK-ADCC (51-Cr release)', 'EC50 ratio vs reference', 'Genotyped NK donors'],
        ['K326W/E333S', 'C1q ELISA binding', 'CDC with human complement', 'Fold-change vs reference', 'Serum complement lot control'],
        ['N297A / Aglycosyl', 'Intact mass (confirm N297A)', 'Fc\u03B3R SPR + ADCC + CDC panel', 'No detectable binding/activity', 'Glycosylated WT control'],
        ['Afucosylation', 'HILIC glycan mapping', 'ADCC reporter + primary ADCC', 'Afucosylation >95%', 'Normal fucosylation control'],
        ['All Fc mutants', 'DSC (CH2 Tm)', 'Accelerated stability (40\u00B0C/4wk)', 'Tm >58\u00B0C, HMWS <2%/month', 'Molecule-specific reference'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: 'Margetuximab — Clinical Proof of Fc Engineering',
      variant: 'success',
      content:
        'Margetuximab (Margenza, approved 2020) is the first Fc-engineered antibody to demonstrate clinical benefit through enhanced ADCC. It carries the S239D/I332E (DE) mutations on an anti-HER2 IgG1 backbone and was approved for metastatic HER2+ breast cancer after progression on trastuzumab. The SOPHIA trial showed that margetuximab benefit was enriched in patients carrying the Fc\u03B3RIIIa F158 allele (hazard ratio 0.68) compared to V158 homozygotes (hazard ratio 0.95), validating the pharmacogenomic hypothesis that Fc engineering preferentially benefits patients with the low-affinity Fc\u03B3R genotype. CMC development of margetuximab required: (1) a validated ADCC potency assay using both V158 and F158 effector cells; (2) Fc\u03B3RIIIa binding by SPR as a release test; (3) confirmation that the DE mutations did not alter glycosylation, charge variants, or stability compared to the wild-type backbone.',
    },
  ],
  mentorQuestions: [
    'You are designing an Fc-engineered anti-tumour antibody and must choose between GASDALIE mutations and afucosylation to enhance ADCC. Compare the two approaches in terms of: (a) magnitude and selectivity of Fc\u03B3R enhancement; (b) impact on CDC and ADCP; (c) CMC manufacturability and lot-to-lot consistency; (d) analytical method requirements. Which would you recommend and why?',
    'Your LALA-PG silent-Fc bispecific shows unexpected residual ADCP activity at high concentrations (>100 micrograms/mL) in a primary macrophage assay, despite no detectable Fc\u03B3R binding by SPR. What could explain this discrepancy, and how would you investigate whether it poses a clinical risk?',
    'During CH2 Tm optimisation of a GASDALIE-mutant antibody, DSC reveals a CH2 Tm of 56 degrees C (vs 65 degrees C for the wild-type parent). The accelerated stability target is <2% HMWS/month at 40 degrees C. Design a formulation strategy to close this stability gap, specifying excipients, concentrations, and the experimental design for the formulation screen.',
  ],
};

export default module9;
