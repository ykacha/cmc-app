import type { ModuleContent } from '../../types/content';

export const module5: ModuleContent = {
  id: 'engineering-m5',
  sectionId: 'engineering',
  moduleNumber: 5,
  eyebrow: 'ENGINEERING 06',
  title: 'YTE Half-Life Extension (M252Y/S254T/T256E)',
  lead: 'The YTE triple mutation (M252Y/S254T/T256E) enhances FcRn binding at acidic pH by approximately 10-fold while preserving pH-dependent release at neutral pH. This extends serum half-life from approximately 21 days to 50+ days, enabling less frequent dosing as demonstrated by ravulizumab (Ultomiris).',
  tags: [
    { label: 'Half-Life Extension', color: 'green' },
    { label: 'FcRn Engineering', color: 'blue' },
    { label: 'pH-Dependent', color: 'amber' },
    { label: 'Ravulizumab', color: 'purple' },
  ],
  stats: [
    { label: 'Mutations', value: 'M252Y/S254T/T256E' },
    { label: 'FcRn Enhancement', value: '~10x at pH 6.0' },
    { label: 'Half-Life', value: '~50 days (vs 21 WT)' },
    { label: 'Approved Product', value: 'Ravulizumab (Ultomiris)' },
  ],
  sections: [
    {
      type: 'card',
      title: '1. FcRn Biology — The Recycling Mechanism',
      color: 'blue',
      content:
        'The neonatal Fc receptor (FcRn) is a heterodimeric MHC class I-related receptor (alpha chain + beta-2-microglobulin) that mediates IgG homeostasis through pH-dependent recycling. FcRn is expressed on endothelial cells, epithelial cells, and haematopoietic cells. IgG in the circulation is constitutively taken up by pinocytosis into acidic endosomes (pH 6.0-6.5), where FcRn binds the Fc region at the CH2-CH3 interface. The FcRn:Fc complex is then recycled to the cell surface, where the neutral pH of the extracellular space (pH 7.4) triggers dissociation and release of the IgG back into circulation. IgG molecules that fail to bind FcRn in the endosome are routed to lysosomes for degradation. This recycling mechanism extends IgG half-life from approximately 1-2 days (without FcRn) to 18-21 days, accounting for the uniquely long serum persistence of IgG among serum proteins. The FcRn binding site on IgG Fc involves EU residues I253, H310, H433, N434, and H435 at the CH2-CH3 junction, with the critical histidine residues (H310, H435) acting as pH sensors — they are protonated at pH 6.0 (enabling binding) and deprotonated at pH 7.4 (triggering release).',
    },
    {
      type: 'card',
      title: '2. Molecular Basis of Each YTE Mutation',
      color: 'teal',
      content:
        'M252Y: Methionine 252 (EU) is located at the CH2-CH3 interface near the FcRn binding site. Mutation to tyrosine introduces an aromatic hydroxyphenyl ring that creates new aromatic packing interactions with FcRn Glu130. The tyrosine OH group forms an additional hydrogen bond with the FcRn alpha chain, and the aromatic ring engages in pi-stacking with adjacent aromatic residues. M252Y is the most impactful single mutation in the YTE set, contributing approximately 5-fold FcRn affinity enhancement at pH 6.0. S254T: Serine 254 is adjacent to M252 in the CH2 domain. Mutation to threonine introduces an additional methyl group that creates new van der Waals contacts with FcRn residues in the alpha-2 domain. The threonine side chain is slightly larger and more hydrophobic than serine, optimising the local packing at the interface. S254T contributes approximately 1.5-2-fold enhancement. T256E: Threonine 256 is in the same CH2 region. Mutation to glutamate introduces a negatively charged carboxylate that forms a pH-dependent salt bridge with FcRn His161 at pH 6.0 (when the histidine imidazole is protonated). At pH 7.4, His161 deprotonation weakens this salt bridge, contributing to the maintained pH-dependent release mechanism.',
    },
    {
      type: 'table',
      title: '3. FcRn Binding Kinetics — WT vs YTE',
      headers: ['Parameter', 'WT IgG1', 'YTE IgG1', 'Fold Change', 'Significance'],
      rows: [
        ['KD at pH 6.0', '500-1,000 nM', '50-100 nM', '~10x tighter', 'Enhanced endosomal capture'],
        ['ka (on-rate) at pH 6.0', '~1 x 10^5 M-1s-1', '~3 x 10^5 M-1s-1', '~3x faster', 'More rapid FcRn engagement in endosome'],
        ['kd (off-rate) at pH 6.0', '~5 x 10^-2 s-1', '~3 x 10^-3 s-1', '~15x slower', 'Prolonged residence on FcRn during recycling'],
        ['KD at pH 7.4', '>10,000 nM (no binding)', '>5,000 nM (minimal)', 'Preserved release', 'Critical: must release at neutral pH'],
        ['pH selectivity ratio', '~20-fold', '~50-100-fold', 'Enhanced', 'Greater discrimination between pH 6.0 and 7.4'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: '4. The Critical Requirement — pH-Dependent Release',
      variant: 'danger',
      content:
        'The single most important design constraint for FcRn-enhancing mutations is preservation of pH-dependent release at pH 7.4. Mutations that increase FcRn binding at pH 6.0 but also increase binding at pH 7.4 will trap the IgG on the cell surface, paradoxically shortening half-life by preventing release back into circulation. This has been termed the "FcRn sink" phenomenon. The YTE mutations achieve enhanced pH selectivity because T256E specifically strengthens a pH-dependent salt bridge (glutamate-histidine) that is only present at acidic pH. Several failed FcRn-enhancing mutations in the literature increased binding at both pH values and showed reduced rather than extended half-life in vivo. When evaluating FcRn mutations, always compare the pH 6.0/pH 7.4 selectivity ratio: WT is approximately 20-fold; successful half-life extension requires maintaining or increasing this ratio. YTE achieves a selectivity ratio of 50-100-fold.',
    },
    {
      type: 'card',
      title: '5. Ravulizumab (Ultomiris) — Clinical Validation',
      color: 'green',
      content:
        'Ravulizumab (ALXN1210, Alexion/AstraZeneca) is the first and most prominent approved product using YTE-based half-life extension. Ravulizumab is an anti-C5 complement inhibitor engineered from eculizumab (Soliris) with four amino acid substitutions, including modifications at the FcRn binding interface that leverage the YTE concept. The clinical impact is dramatic: eculizumab has a terminal half-life of approximately 11 days, requiring intravenous dosing every 2 weeks; ravulizumab has a terminal half-life of approximately 50 days, enabling dosing every 8 weeks (Q8W). In the Phase III CHAMPION studies in paroxysmal nocturnal haemoglobinuria (PNH), ravulizumab demonstrated non-inferior efficacy to eculizumab with 75% fewer infusions per year. The extended half-life also produces more sustained C5 inhibition with less trough-level breakthrough, reducing the incidence of breakthrough haemolysis. Ravulizumab was approved in 2018 for PNH and subsequently for atypical haemolytic uraemic syndrome (aHUS) and generalised myasthenia gravis (gMG).',
    },
    {
      type: 'table',
      title: '6. Eculizumab vs Ravulizumab — Head-to-Head',
      headers: ['Parameter', 'Eculizumab (Soliris)', 'Ravulizumab (Ultomiris)', 'Improvement'],
      rows: [
        ['Terminal half-life', '~11 days', '~50 days', '~4.5x longer'],
        ['Dosing frequency', 'Q2W (every 2 weeks)', 'Q8W (every 8 weeks)', '75% fewer infusions'],
        ['Steady-state Cmin', 'Variable (trough dips)', 'Sustained high levels', 'Less breakthrough haemolysis'],
        ['Annual infusions', '26', '6-7', '~75% reduction in treatment burden'],
        ['C5 binding affinity', 'KD ~120 pM', 'KD ~120 pM', 'Unchanged (same Fab)'],
        ['FcRn binding (pH 6.0)', 'WT (~500-1,000 nM)', 'Enhanced (~50-100 nM)', '~10x improvement'],
        ['Effector function', 'WT IgG2/4 hybrid', 'WT IgG2/4 hybrid', 'No change intended'],
        ['Complement inhibition', '>99% at trough', '>99.5% sustained', 'More consistent suppression'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '7. Impact on Effector Function',
      color: 'amber',
      content:
        'A critical consideration for YTE mutations is their potential impact on effector function. The M252Y substitution is in the CH2-CH3 interface region, which is proximal to (but not overlapping with) the FcgammaR binding site in the lower hinge and upper CH2. Published data from MedImmune/AstraZeneca suggest that YTE can modestly reduce ADCC activity (approximately 2-3-fold reduction in some constructs). The mechanism is thought to be an indirect conformational effect: the bulkier tyrosine at position 252 may subtly alter the orientation of the CH2 domain relative to CH3, which propagates to the FcgammaR-binding lower hinge/upper CH2 region. This is important for molecules where ADCC is part of the mechanism of action. For effector-silent molecules (e.g., anti-PD-1 IgG4-S228P + YTE, or IgG1-LALA-PG + YTE), the effector function attenuation is irrelevant. For ADCC-dependent molecules, the YTE-mediated ADCC reduction may need to be compensated by combining with ADCC-enhancing mutations (e.g., DE + YTE) or afucosylation, though such combinations require careful empirical validation.',
    },
    {
      type: 'bullets',
      title: '8. CMC Analytical Strategy for YTE Molecules',
      items: [
        'FcRn SPR binding: Full pH profile at pH 5.8, 6.0, 6.5, 7.0, 7.4 to characterise the pH-dependent binding curve. Report KD at pH 6.0 and confirm release at pH 7.4 (no detectable binding or very rapid off-rate).',
        'Cell-based FcRn recycling assay: MDCK-FcRn transcytosis assay measures functional recycling efficiency. YTE should show 3-5-fold enhanced recycling compared to wild-type.',
        'PK modelling: Population PK modelling using FcRn binding parameters to predict human half-life. Allometric scaling from cynomolgus monkey (which has high FcRn homology) to human.',
        'Effector function panel: Full FcgammaR binding and cell-based ADCC/ADCP/CDC characterisation to document any effector function changes due to YTE.',
        'Thermal stability (DSC/DSF): Monitor CH2-CH3 interface stability. YTE typically has minimal impact on Tm (<1 degree Celsius change).',
        'Accelerated stability: YTE should not affect chemical degradation pathways (oxidation, deamidation, isomerisation). Confirm by peptide mapping at accelerated conditions.',
        'Protein A binding: Unaffected. The Protein A binding site (H435, I253) partially overlaps with FcRn binding, but YTE mutations do not disrupt Protein A capture.',
        'Immunogenicity assessment: YTE introduces non-germline residues in the CH2 domain. Anti-drug antibody (ADA) assays must be capable of detecting anti-Fc responses.',
      ],
    },
    {
      type: 'table',
      title: '9. YTE Clinical and Preclinical Data Summary',
      headers: ['Molecule', 'YTE Application', 'WT Half-Life', 'YTE Half-Life', 'Dosing Benefit', 'Status'],
      rows: [
        ['Ravulizumab (Ultomiris)', 'Anti-C5', '~11 days', '~50 days', 'Q2W to Q8W', 'Approved (2018)'],
        ['MEDI8897 (nirsevimab)', 'Anti-RSV F', '~21 days', '~60-70 days', 'Single dose for RSV season', 'Approved (2023)'],
        ['MEDI4893 (suptavumab)', 'Anti-RSV F (site V)', '~21 days', '~70 days (predicted)', 'Single dose prophylaxis', 'Discontinued (Phase III)'],
        ['MEDI3902', 'Anti-Pseudomonas (PcrV/Psl)', '~21 days', '~45-60 days (predicted)', 'Less frequent dosing in ICU', 'Phase II'],
        ['Multiple MedImmune pipeline', 'Various targets', '18-21 days', '40-70 days', 'Reduced administration frequency', 'Phase I-II'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: '10. Nirsevimab — YTE Enabling Single-Dose Prophylaxis',
      variant: 'success',
      content:
        'Nirsevimab (Beyfortus, AstraZeneca/Sanofi) represents a transformative application of YTE technology. As an anti-RSV F protein mAb for infant prophylaxis, nirsevimab requires protection lasting an entire RSV season (approximately 5 months). The WT IgG1 half-life of ~21 days would necessitate monthly injections in infants — impractical for a prophylactic intervention. YTE extends the half-life to approximately 60-70 days in infants, enabling a single intramuscular injection to provide protective antibody levels for the full 5-month RSV season. The Phase III MELODY and HARMONIE trials demonstrated 74.5% efficacy against RSV-associated lower respiratory tract infection with a single dose. Nirsevimab was approved in the EU (2022) and US (2023) and has become a landmark example of how FcRn engineering can enable entirely new therapeutic paradigms that would be impossible with wild-type pharmacokinetics.',
    },
    {
      type: 'card',
      title: '11. Intellectual Property and Alternative FcRn Mutations',
      color: 'purple',
      content:
        'The YTE mutations (M252Y/S254T/T256E) are covered by MedImmune/AstraZeneca patents (US7083784, US7317091). This IP position has driven development of alternative FcRn-enhancing mutations by competing companies. The LS mutation (M428L/N434S, Xencor) is the primary competitor (covered in the next module). Other alternatives include: N434A (Genentech, moderate 3-fold enhancement), N434W (larger enhancement but potential aggregation), T307Q/N434A (moderate enhancement), and various combinatorial approaches. The choice between YTE and LS for a specific programme depends on IP access, the desired half-life extension magnitude, and compatibility with other Fc modifications. YTE generally provides greater half-life extension than LS (~50 days vs ~35-40 days for LS) but with a potentially greater impact on ADCC. For programmes where IP freedom-to-operate is critical, N434A or T307Q/N434A may be preferred, though they provide more modest half-life extension.',
    },
  ],
  mentorQuestions: [
    'You are developing an anti-inflammatory mAb for a chronic condition requiring lifelong treatment. Compare the patient burden, compliance, and health-economic implications of WT (Q2W dosing) versus YTE-enhanced (Q8W dosing). How would you factor this into your target product profile?',
    'Your YTE-enhanced mAb shows a 10-fold enhanced FcRn binding at pH 6.0 but also a detectable (2-fold) increase in binding at pH 7.4 compared to WT. How would you assess whether this residual pH 7.4 binding will cause an FcRn sink effect, and what in vivo experiments would you design to address this?',
    'Explain why the T256E mutation is particularly important for maintaining pH selectivity. What would happen if you replaced T256E with a non-pH-dependent affinity-enhancing mutation at the same position?',
  ],
};
