import type { ModuleContent } from '../../types/content';

export const module3: ModuleContent = {
  id: 'engineering-m3',
  sectionId: 'engineering',
  moduleNumber: 3,
  eyebrow: 'ENGINEERING 04',
  title: 'DE Mutations (S239D/I332E)',
  lead: 'The DE mutations (S239D/I332E) represent a clinically validated subset of the GASDALIE set, providing substantial ADCC enhancement (~30-50-fold FcgammaRIIIa binding increase) while maintaining a more moderate effector function profile that balances efficacy with tolerability.',
  tags: [
    { label: 'ADCC Enhancement', color: 'green' },
    { label: 'Clinical Validation', color: 'blue' },
    { label: 'Margetuximab', color: 'amber' },
    { label: 'Xencor', color: 'purple' },
  ],
  stats: [
    { label: 'Mutations', value: 'S239D + I332E' },
    { label: 'FcgammaRIIIa Boost', value: '~40x' },
    { label: 'ADCC Boost', value: '~15-20x' },
    { label: 'CDC Impact', value: 'Minimal' },
  ],
  sections: [
    {
      type: 'card',
      title: '1. Rationale for the DE Subset',
      color: 'blue',
      content:
        'The DE combination (S239D/I332E) was selected from the full GASDALIE set as a clinically tractable Fc enhancement strategy that provides robust ADCC enhancement without the broader effector function amplification of the quadruple mutant. S239D and I332E are the two most impactful mutations in the GASDALIE set for FcgammaRIIIa binding: S239D contributes a salt bridge to FcgammaRIIIa Lys158, and I332E contributes a hydrogen bond to Tyr157. Together, they achieve approximately 30-50-fold enhancement of FcgammaRIIIa binding, which translates to 15-20-fold enhancement of ADCC in cell-based assays. By omitting G236A and A330L, the DE subset avoids the enhanced FcgammaRIIa binding (less ADCP amplification) and the modest CDC enhancement associated with A330L. This creates a more focused effector profile: primarily ADCC enhancement through FcgammaRIIIa, with minimal impact on complement activation. The moderate enhancement level also provides a wider therapeutic window for dose selection in clinical settings.',
    },
    {
      type: 'table',
      title: '2. DE vs GASDALIE — Side-by-Side Comparison',
      headers: ['Parameter', 'WT IgG1', 'DE (S239D/I332E)', 'GASDALIE', 'Afucosylation'],
      rows: [
        ['FcgammaRIIIa-V158 fold enhancement', '1x', '~30-40x', '~80-120x', '~40-60x'],
        ['FcgammaRIIIa-F158 fold enhancement', '1x', '~50-70x', '~100-150x', '~50-80x'],
        ['FcgammaRIIa-H131 fold enhancement', '1x', '~3-5x', '~20-30x', '~1-2x'],
        ['FcgammaRIIb fold enhancement', '1x', '~3-5x', '~5-10x', '~1x'],
        ['A/I ratio change', 'Baseline', 'Modest increase', 'Large increase', 'Selective (RIII only)'],
        ['ADCC EC50 shift', '1x', '~15-20x left', '~30-50x left', '~30-50x left'],
        ['ADCP enhancement', '1x', '~3-5x', '~15-20x', '~1-2x'],
        ['CDC enhancement', '1x', '~1-1.5x', '~2-3x', '~1x'],
        ['C1q binding change', 'Baseline', 'Minimal', 'Modest increase', 'No change'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '3. Structural Basis — Two Complementary Contacts',
      color: 'teal',
      content:
        'The S239D and I332E mutations operate through complementary interaction mechanisms on the CH2 domain surface. S239D (BC loop) introduces a negatively charged aspartate that forms a strong salt bridge (~2.8 angstroms) with Lys158 on FcgammaRIIIa. This electrostatic interaction is the primary driver of affinity enhancement and is particularly effective because Lys158 is partially solvent-exposed and not involved in a competing intramolecular salt bridge. I332E (adjacent CH2 position) introduces a glutamate that hydrogen-bonds with Tyr157 on FcgammaRIIIa (~2.6 angstroms). These two new contacts are spatially separated on the Fc surface (approximately 10 angstroms apart), allowing them to simultaneously engage the receptor without steric interference. Crystallographic analysis (PDB: 3SGJ) confirms that the local Fc backbone geometry is minimally perturbed by the DE mutations, with root-mean-square deviation of <0.3 angstroms for C-alpha atoms in the CH2 domain relative to wild-type.',
    },
    {
      type: 'card',
      title: '4. Margetuximab — Clinical Proof of Concept',
      color: 'amber',
      content:
        'Margetuximab (Margenza, MacroGenics) is the most clinically advanced Fc-engineered antibody designed for enhanced ADCC, though it uses a distinct mutation set (F243L/R292P/Y300L/V305I/P396L, the MGAH22 Fc) rather than the Xencor DE mutations. However, margetuximab demonstrates the clinical principle underlying DE-type engineering. Margetuximab targets HER2 (same as trastuzumab) with a modified Fc that enhances FcgammaRIIIa binding and reduces FcgammaRIIb binding, thereby increasing the A/I ratio. In the Phase III SOPHIA trial (Rugo et al., JAMA Oncology 2021), margetuximab showed a statistically significant PFS improvement over trastuzumab in the intent-to-treat population (5.8 vs 4.9 months, HR 0.76). Critically, the benefit was more pronounced in patients carrying the FcgammaRIIIa F/F genotype, validating the concept that Fc engineering can overcome genotype-dependent effector function deficits. This genotype-dependent benefit is the strongest clinical evidence supporting the ADCC-enhancement strategy embodied by DE and GASDALIE mutations.',
    },
    {
      type: 'bullets',
      title: '5. DE-Containing Clinical Candidates',
      items: [
        'Xencor XmAb5574 (tafasitamab/Monjuvi): Anti-CD19 with Xencor Fc modifications including enhanced FcgammaRIIIa binding. Approved (2020) in combination with lenalidomide for DLBCL. While the exact Fc mutations are proprietary, the molecule uses Xencor Xtmab technology derived from the S239D/I332E platform.',
        'Xencor XmAb24306: IL-15/IL-15Ra-Fc fusion with DE-enhanced Fc for enhanced NK cell activation. In clinical trials for solid tumours.',
        'Multiple investigational anti-tumour mAbs in preclinical/Phase I combining DE mutations with tumour-targeting variable domains (anti-EGFR, anti-HER2, anti-CD20 variants).',
        'The DE platform has been combined with Xencor heterodimerisation technology (knob-in-hole variants) for bispecific antibodies where one arm requires ADCC enhancement.',
      ],
    },
    {
      type: 'card',
      title: '6. Advantage Over GASDALIE — Safety and Therapeutic Window',
      color: 'green',
      content:
        'The primary advantage of DE over full GASDALIE is a wider therapeutic window. The ~40-fold FcgammaRIIIa enhancement of DE (vs ~100-fold for GASDALIE) provides substantial ADCC improvement while reducing the risk of excessive immune activation. In preclinical cynomolgus models, full GASDALIE-enhanced antibodies have shown a narrower dose range between efficacious ADCC and cytokine release syndrome, particularly for targets with broad tissue distribution. DE provides approximately 80% of the ADCC benefit of GASDALIE (as measured by maximum target cell lysis) but with a significantly reduced risk of off-target FcgammaR engagement on circulating monocytes and tissue macrophages. The more modest FcgammaRIIa enhancement (~3-5x vs ~20-30x) means less non-specific macrophage activation, reducing the risk of thrombocytopenia (mediated by platelet FcgammaRIIa) and infusion-related reactions. For most oncology indications, the DE level of ADCC enhancement is sufficient to overcome FcgammaRIIIa F/F genotype-dependent resistance.',
    },
    {
      type: 'table',
      title: '7. Impact on FcgammaR Binding Panel (KD Values)',
      headers: ['Receptor', 'WT IgG1 KD (nM)', 'DE IgG1 KD (nM)', 'Fold Enhancement', 'Clinical Relevance'],
      rows: [
        ['FcgammaRI', '1-10', '1-5', '~2x', 'Minimal clinical impact (already saturated in vivo)'],
        ['FcgammaRIIa-H131', '500-800', '100-250', '~3-5x', 'Modest ADCP enhancement on macrophages'],
        ['FcgammaRIIa-R131', '700-1,200', '200-400', '~3-5x', 'Modest ADCP enhancement on macrophages'],
        ['FcgammaRIIb', '1,000-3,000', '300-700', '~3-5x', 'Potential faster internalisation on B cells'],
        ['FcgammaRIIIa-V158', '100-300', '3-8', '~30-40x', 'Primary ADCC driver; NK cell activation'],
        ['FcgammaRIIIa-F158', '300-800', '5-15', '~50-70x', 'Overcomes F/F genotype deficit'],
        ['FcgammaRIIIb', '500-1,500', '50-150', '~10x', 'Enhanced neutrophil engagement'],
        ['C1q', '~50 (clustered)', '~40 (clustered)', '~1.2x', 'Negligible CDC change'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: '8. Genotype-Independent Efficacy — The Core Value Proposition',
      variant: 'success',
      content:
        'The defining clinical value of DE mutations is the ability to overcome FcgammaRIIIa V158F polymorphism-dependent efficacy differences. In the general population, approximately 40% carry V158 and 60% carry F158 (European frequencies). F/F homozygotes (~36% of the population) have 2-3-fold lower FcgammaRIIIa affinity for IgG1, translating to clinically meaningful reductions in ADCC-mediated anti-tumour responses. With DE enhancement, the F/F genotype FcgammaRIIIa affinity for DE-mutant IgG1 exceeds the V/V genotype affinity for wild-type IgG1 by approximately 5-10-fold. This means that even the lowest-affinity patient genotype achieves higher ADCC potency with DE-enhanced mAbs than the highest-affinity genotype achieves with wild-type mAbs. This genotype-levelling effect eliminates the pharmacogenomic variability that has been a consistent source of heterogeneous clinical responses for ADCC-dependent mAbs like rituximab, trastuzumab, and cetuximab.',
    },
    {
      type: 'card',
      title: '9. Manufacturing and Process Considerations',
      color: 'purple',
      content:
        'DE mutations are introduced at the DNA level during construct design and do not require any modification to standard CHO cell culture processes. Unlike afucosylation (which requires cell line engineering, media optimisation, or enzyme inhibitor addition), DE-enhanced molecules can be produced in any standard IgG1 CHO manufacturing platform. The Protein A capture step is unaffected (binding site is at CH2-CH3 interface). Downstream purification follows standard mAb processes. The S239D and I332E mutations introduce two additional negative charges per Fc monomer (four per intact IgG), which causes a measurable acidic shift in pI (typically 0.2-0.4 pH units). This shift can affect ion exchange chromatography behaviour, requiring adjustment of loading/elution conditions for cation exchange polish steps. The charge variants should be characterised by icIEF or CEX-HPLC, with the DE-specific charge profile established as part of the reference standard characterisation.',
    },
    {
      type: 'callout',
      title: '10. Combination with Other Fc Modifications',
      variant: 'info',
      content:
        'DE mutations are compatible with several other Fc engineering strategies. DE + afucosylation: Achieves maximal ADCC enhancement (potentially >200-fold over WT fucosylated IgG1) but may exceed the optimal therapeutic window; requires careful dose optimisation. DE + YTE/LS (half-life extension): Compatible combination for oncology — enhanced ADCC + extended dosing interval. However, some YTE data suggest modest ADCC attenuation, which DE may partially compensate. DE + heterodimerisation (knob-in-hole, charge pairs): Compatible for bispecific formats where ADCC is desired. The asymmetric Fc means only one CH2 chain carries the full DE effect. DE + LALA-PG: Incompatible — opposing objectives (enhancement vs silencing). DE + S228P: Incompatible — S228P is IgG4-specific, and DE is designed for IgG1. Combining DE with glycoengineering requires careful potency monitoring to avoid over-enhancement.',
    },
    {
      type: 'bullets',
      title: '11. Potency Assay Development for DE-Enhanced Molecules',
      items: [
        'Reference standard: A DE-mutant reference standard must be established. Wild-type IgG1 reference cannot serve as the primary standard because the dose-response curves are non-overlapping at the DE enhancement level.',
        'Reporter bioassay: Jurkat-FcgammaRIIIa-V158-NFAT-luc with a 4-parameter logistic fit. The EC50 will be approximately 15-20-fold lower than wild-type. Assay dynamic range must be adjusted accordingly.',
        'Relative potency: Report as percentage of the DE reference standard (target: 80-125% for lot release). Do not report relative potency against wild-type reference.',
        'Primary NK ADCC: Use as a characterisation assay (not lot-release) with donors genotyped for V158F. Demonstrate reduced donor-to-donor variability compared to wild-type as supporting evidence for the genotype-levelling claim.',
        'Include wild-type IgG1 and GASDALIE as system suitability controls to verify the assay can discriminate between enhancement levels.',
      ],
    },
  ],
  mentorQuestions: [
    'You are developing an anti-HER2 mAb with DE mutations to differentiate from trastuzumab. The FDA asks you to demonstrate clinical benefit specifically attributable to the Fc engineering. Design a Phase III trial that would generate the pharmacogenomic evidence to support this claim.',
    'Your DE-enhanced mAb shows a 5-fold higher rate of Grade 1-2 infusion-related reactions compared to the wild-type comparator in Phase I. How would you investigate whether this is FcgammaR-mediated, and what mitigation strategies would you implement for Phase II?',
    'Compare the relative potency assay challenges for DE-enhanced molecules versus afucosylated molecules. Which approach introduces more lot-to-lot variability in the potency assay, and why?',
  ],
};
