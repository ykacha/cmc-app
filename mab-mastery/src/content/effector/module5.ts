import type { ModuleContent } from '../../types/content';

export const module5: ModuleContent = {
  id: 'effector-m5',
  sectionId: 'effector',
  moduleNumber: 5,
  eyebrow: 'EFFECTOR 06',
  title: 'FcRn Engineering',
  lead: 'Rational engineering of the Fc–FcRn interface enables half-life extension from 21 days to 80+ days, transforming dosing regimens and patient convenience. This module dissects the molecular contacts of YTE and LS mutations, compares clinical pharmacokinetic data, and addresses the CMC characterisation challenges unique to FcRn-engineered mAbs.',
  tags: [
    { label: 'YTE', color: 'amber' },
    { label: 'LS', color: 'blue' },
    { label: 'Half-Life Extension', color: 'green' },
    { label: 'CMC Considerations', color: 'red' },
  ],
  stats: [
    { label: 'YTE Half-Life', value: '~80–100 days' },
    { label: 'LS Half-Life', value: '~50–65 days' },
    { label: 'pH 6.0 Enhancement', value: '10–30×' },
    { label: 'pH 7.4 Maintained', value: 'Critical requirement' },
  ],
  sections: [
    {
      type: 'card',
      title: 'YTE Mutations (M252Y/S254T/T256E) — Molecular Contacts at pH 6.0',
      color: 'amber',
      content:
        'The YTE triple mutation (M252Y/S254T/T256E), developed by MedImmune/AstraZeneca, enhances FcRn binding at pH 6.0 by ~10-fold through three complementary mechanisms. M252Y: replacing methionine with tyrosine at position 252 introduces a bulky aromatic side chain that packs into a hydrophobic pocket on the FcRn α2 domain surface. The tyrosine hydroxyl forms an additional hydrogen bond with FcRn backbone carbonyls in the α2 helix, and the aromatic ring creates enhanced van der Waals contacts with FcRn residues L112 and W131. The net contribution is approximately 3-fold affinity improvement. S254T: replacing serine with threonine at position 254 introduces a methyl group that enhances van der Waals contacts with FcRn residues in the α2 domain loop (particularly I89 and L112). The branched threonine side chain fills a small hydrophobic cavity at the interface better than the smaller serine hydroxyl. Contribution: approximately 1.5-fold improvement. T256E: replacing threonine with glutamate at position 256 introduces a negatively charged carboxylate that forms a pH-dependent salt bridge with FcRn His161 (protonated at pH 6.0, providing the positive charge for the salt bridge). At pH 7.4, His161 is deprotonated, the salt bridge breaks, and the glutamate actually creates mild charge repulsion. This T256E contact therefore reinforces the pH dependence of the interaction rather than compromising it.',
    },
    {
      type: 'card',
      title: 'LS Mutations (M428L/N434S) — Molecular Contacts at pH 6.0',
      color: 'blue',
      content:
        'The LS double mutation (M428L/N434S), developed by Xencor (marketed as XTEND technology), enhances FcRn binding at pH 6.0 by approximately 11-fold through two complementary mechanisms. M428L: replacing methionine with leucine at position 428 (in the CH3 domain, adjacent to the H435 pH-switch histidine) improves hydrophobic packing with FcRn α2 domain residues. Leucine\'s branched aliphatic side chain creates tighter van der Waals contacts with FcRn I89 and L112 compared to the more flexible methionine thioether. The M428L substitution also stabilises the local CH3 conformation around the H435 pH-switch residue, indirectly optimising the H435–FcRn E116 salt bridge geometry at pH 6.0. Contribution: approximately 3–4-fold affinity improvement. N434S: replacing asparagine with serine at position 434 optimises a hydrogen bond network with FcRn. The shorter serine side chain repositions to form a more geometrically favourable hydrogen bond with FcRn His166 (protonated at pH 6.0). Wild-type N434 forms a suboptimal H-bond angle; N434S corrects this geometry. Additionally, the smaller serine side chain reduces steric strain at the interface, allowing tighter CH3–FcRn packing. Contribution: approximately 3-fold improvement. The combined LS mutations are additive, yielding ~11× enhancement at pH 6.0 while maintaining low affinity at pH 7.4 (KD >1 µM), preserving the essential pH-dependent release.',
    },
    {
      type: 'table',
      title: 'FcRn Engineering Variants — Comprehensive Comparison',
      headers: ['Variant', 'Mutations (EU)', 'FcRn KD pH 6.0 (nM)', 'FcRn KD pH 7.4 (µM)', 'Clinical Half-Life (days)', 'Clinical Molecule', 'Developer'],
      rows: [
        ['Wild-type IgG1', 'None', '~200–500', '>10 (undetectable)', '~21', 'Standard mAbs', 'N/A'],
        ['YTE', 'M252Y/S254T/T256E', '~20–50', '>5 (maintained)', '~80–100', 'Ravulizumab (Ultomiris)', 'MedImmune/AstraZeneca'],
        ['LS (XTEND)', 'M428L/N434S', '~20–50', '>5 (maintained)', '~50–65', 'Sotrovimab, Nirsevimab (Beyfortus)', 'Xencor'],
        ['N434A', 'N434A', '~50–100', '>5 (maintained)', '~35–40 (estimated)', 'Preclinical', 'Multiple'],
        ['T250Q/M428L', 'T250Q/M428L', '~50–80', '>5 (maintained)', '~40–50 (estimated)', 'Preclinical', 'Hinton et al.'],
        ['N434W', 'N434W', '~10–30', '~0.5–2 (partially retained)', 'Variable (pH 7.4 risk)', 'Preclinical', 'Multiple'],
        ['Abdeg (H435A)', 'H435A', 'Abolished', 'Abolished', '~2–5 (accelerated clearance)', 'Efgartigimod (Vyvgart)', 'argenx'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Ravulizumab — YTE Clinical Validation',
      color: 'green',
      content:
        'Ravulizumab (Ultomiris, Alexion/AstraZeneca) is the landmark clinical validation of YTE half-life extension technology. It is an anti-C5 complement mAb derived from eculizumab with four amino acid substitutions: M252Y/S254T/T256E (YTE for FcRn enhancement) plus H435-region modifications for optimised pH-dependent target release. Eculizumab has a standard IgG2/IgG4 hybrid half-life of ~11 days, requiring every-2-week IV dosing. Ravulizumab achieves a terminal half-life of ~50 days (effective dosing half-life ~80+ days considering target-mediated disposition), enabling every-8-week IV dosing — a 4-fold improvement in dosing frequency. In paroxysmal nocturnal haemoglobinuria (PNH), ravulizumab demonstrated non-inferiority to eculizumab in complement inhibition (LDH levels, breakthrough haemolysis) with the convenience of Q8W dosing (ALXN1210-PNH-301 trial, Lee et al., Blood 133:530, 2019). The clinical validation of YTE confirmed that the in vitro 10-fold FcRn enhancement translates to a ~4-fold half-life extension in vivo — the non-linear relationship reflects the saturation of FcRn recycling capacity at higher occupancy.',
    },
    {
      type: 'card',
      title: 'Nirsevimab — LS Clinical Validation',
      color: 'purple',
      content:
        'Nirsevimab (Beyfortus, AstraZeneca/Sanofi) is an anti-RSV F-protein mAb carrying the LS (M428L/N434S) mutations that provides passive immunisation against respiratory syncytial virus in infants for an entire RSV season from a single intramuscular injection. The LS mutations extend the half-life to approximately 63–73 days (compared to ~21 days for wild-type IgG1), enabling protective antibody levels to be maintained for 5+ months after a single 50 mg dose. In the MELODY phase III trial (Hammitt et al., N. Engl. J. Med. 386:837, 2022), a single IM dose of nirsevimab reduced medically attended RSV-associated lower respiratory tract infection by 74.5% through a full RSV season. This clinical programme established the LS/XTEND platform as commercially validated and demonstrated that half-life extension can transform the clinical utility of passive immunisation. Sotrovimab (anti-SARS-CoV-2, GSK/Vir) also used the LS mutations for extended half-life, though its clinical impact was limited by viral evolution. The LS platform is now being applied broadly across the therapeutic and prophylactic antibody pipeline.',
    },
    {
      type: 'card',
      title: 'pH 7.4 Release Verification — The "Sticky Fc" Problem',
      color: 'red',
      content:
        'The most critical design requirement for any FcRn-engineered Fc variant is that enhanced pH 6.0 binding must NOT be accompanied by significant residual binding at pH 7.4. Mutations that increase pH 7.4 affinity ("sticky Fc") create a paradox: the antibody binds FcRn tightly at pH 6.0 (good for rescue) but fails to release at pH 7.4 at the cell surface. The antibody remains tethered to FcRn, either cycling back into the endosome with the receptor (futile recycling) or being internalised along with FcRn turnover, ultimately accelerating clearance rather than extending half-life. The N434W mutation illustrates this risk: it provides excellent pH 6.0 binding (~10 nM KD) but introduces tryptophan aromatic stacking that partially persists at pH 7.4 (KD ~0.5–2 µM instead of >10 µM), resulting in variable and sometimes shortened half-life in vivo. SPR binding at pH 7.4 is therefore a mandatory characterisation step for any FcRn-engineered variant. Acceptance criterion: KD at pH 7.4 must be >5 µM (ideally >10 µM) with rapid off-rate (koff >0.1 s⁻¹). The YTE and LS mutations both pass this criterion because their new contacts are either hydrophobic (temperature/geometry-sensitive) or histidine-mediated (pH-sensitive), not salt bridges or H-bonds that persist at pH 7.4.',
    },
    {
      type: 'table',
      title: 'SPR Binding Profile — YTE vs LS vs Wild-Type',
      headers: ['Parameter', 'Wild-Type IgG1', 'YTE (M252Y/S254T/T256E)', 'LS (M428L/N434S)'],
      rows: [
        ['KD at pH 6.0 (nM)', '200–500', '20–50', '20–50'],
        ['ka at pH 6.0 (M⁻¹s⁻¹)', '~1–3 × 10⁵', '~3–5 × 10⁵', '~2–4 × 10⁵'],
        ['kd at pH 6.0 (s⁻¹)', '~5 × 10⁻²', '~1 × 10⁻²', '~1 × 10⁻²'],
        ['KD at pH 7.4 (µM)', '>10 (undetectable)', '>5 (maintained)', '>5 (maintained)'],
        ['pH differential (fold)', '>100×', '>100×', '>100×'],
        ['Clinical half-life (days)', '~21', '~80–100', '~50–65'],
        ['Fold half-life extension', '1×', '~4×', '~3×'],
        ['Protein A binding', 'Normal', 'Slightly reduced (~0.8×)', 'Normal'],
        ['Thermal stability (Tm CH2)', '~71°C', '~69°C (−2°C)', '~70°C (−1°C)'],
      ],
      sortable: false,
    },
    {
      type: 'card',
      title: 'Abdeg Technology — Engineered Half-Life Reduction',
      color: 'teal',
      content:
        'The Abdeg (antibody that enhances IgG degradation) concept inverts the FcRn engineering paradigm: instead of enhancing FcRn binding to extend half-life, Abdeg molecules are engineered to compete with endogenous IgG for FcRn binding, displacing pathogenic autoantibodies from the recycling pathway and accelerating their lysosomal degradation. The lead clinical molecule is efgartigimod (Vyvgart, argenx), an Fc fragment carrying M252Y/S254T/T256E/H433K/N434F (ABDEG mutations) that binds FcRn with ~10-fold enhanced affinity at pH 6.0 while also maintaining binding at pH 7.4. Efgartigimod saturates FcRn in the endosome, preventing endogenous pathogenic IgG (including anti-AChR autoantibodies in myasthenia gravis) from being rescued. The displaced IgG proceeds to lysosomal degradation. IV infusion of efgartigimod reduces total serum IgG by approximately 60–70% within 1–2 weeks, with pathogenic autoantibodies cleared proportionally. Efgartigimod was approved for generalised myasthenia gravis (gMG) in 2021 and is being developed for multiple autoimmune indications. This demonstrates that FcRn biology can be exploited in both directions — extending therapeutic mAb half-life and depleting pathogenic IgG.',
    },
    {
      type: 'bullets',
      title: 'CMC Considerations for FcRn-Engineered mAbs',
      items: [
        'Protein A binding: YTE mutations can modestly reduce Protein A binding (~0.8-fold) because M252Y is adjacent to the Protein A contact site on the CH2–CH3 elbow. Manufacturing processes using Protein A affinity chromatography may require resin screening and binding/elution optimisation. LS mutations do not significantly affect Protein A binding.',
        'Thermal stability: YTE introduces a mild CH2 destabilisation (Tm shift of −2°C) due to the bulky tyrosine at position 252. This can slightly increase aggregation propensity during thermal stress and may require tighter temperature excursion limits during manufacturing and storage. DSC characterisation in the extended stability programme should include the CH2 unfolding transition.',
        'Aggregation propensity: enhanced FcRn binding can correlate with subtle changes in CH2–CH3 elbow dynamics. Aggregation under accelerated stress conditions (40°C) should be compared head-to-head with the wild-type Fc to establish whether the mutations confer additional aggregation risk.',
        'Methionine oxidation susceptibility: the M252Y mutation eliminates the Met252 oxidation liability (a common forced-degradation pathway for wild-type IgG1). However, the introduced tyrosine is susceptible to photo-oxidation. The LS mutation (M428L) similarly eliminates Met428 oxidation but introduces no new oxidation-prone residues.',
        'FcRn binding assay: SPR at both pH 6.0 and pH 7.4 is a required lot-release assay for FcRn-engineered mAbs. The pH 6.0 KD must meet specification (typically within 0.5–2× of reference standard), and pH 7.4 binding must remain undetectable (KD >5 µM). This dual-pH assay replaces the single-pH FcRn ELISA used for wild-type IgG.',
        'Pharmacokinetic bridging: any process change (cell line, culture conditions, purification) for an FcRn-engineered mAb requires PK comparability, as subtle structural changes can differentially affect the engineered Fc–FcRn interface. This is more stringent than for wild-type IgG where FcRn binding is less sensitive to process variation.',
      ],
    },
    {
      type: 'callout',
      title: 'Regulatory Perspective — FcRn Engineering in BLA Filings',
      variant: 'warning',
      content:
        'For FcRn-engineered mAbs, regulatory agencies expect comprehensive characterisation of the pH-dependent binding profile (SPR at pH 5.5, 6.0, 6.5, 7.0, 7.4), demonstration that the mutations do not adversely affect FcγR binding or effector functions (unless intended), and PK/PD modelling to justify the extended dosing interval. The BLA must include a dedicated section on the Fc engineering rationale with structural data (X-ray crystallography or computational modelling) supporting the mutation design. FcRn binding at pH 6.0 is classified as a CQA, and the dual-pH SPR assay is expected in the lot-release panel. For process changes, an FcRn binding comparability assessment is required in addition to standard analytical comparability.',
    },
    {
      type: 'callout',
      title: 'Emerging Approaches — Beyond YTE and LS',
      variant: 'info',
      content:
        'Next-generation FcRn engineering approaches include: (1) combinatorial YTE+LS: stacking mutations from both platforms to achieve >30-fold FcRn enhancement and potentially >100-day half-life, though pH 7.4 release must be carefully verified; (2) pH-dependent antigen binding (sweeping antibodies): combining FcRn-enhanced Fc with histidine-substituted CDRs that release antigen in the endosome, allowing the mAb to recycle and re-engage fresh antigen — effectively creating a "catalytic" antibody with enhanced target clearance (e.g., satralizumab, anti-IL-6R); (3) FcRn-enhanced albumin fusion proteins: applying albumin domain III engineering to enhance the albumin–FcRn interaction for extended half-life of albumin-fused biologics; (4) asymmetric FcRn engineering in bispecific formats: optimising FcRn contacts on one Fc chain of a heterodimeric format to compensate for structural perturbation on the other chain.',
    },
  ],
  mentorQuestions: [
    'The YTE mutation achieves ~10-fold enhanced FcRn binding at pH 6.0 but only ~4-fold half-life extension in vivo. Explain the non-linear relationship between FcRn affinity enhancement and half-life extension. What biological factors limit the maximum achievable half-life?',
    'You are developing an FcRn-engineered mAb (LS mutations) for a subcutaneous monthly dosing regimen. During forced degradation studies, you discover that the LS variant shows 15% more aggregation than wild-type IgG1 after 4 weeks at 40°C. How do you investigate the root cause and what formulation strategies might you consider?',
    'Compare the YTE and LS engineering approaches in terms of: (a) molecular mechanism of FcRn enhancement, (b) impact on Protein A purification, (c) thermal stability, and (d) clinical half-life achieved. If you were selecting one platform for a new therapeutic mAb programme, what factors would guide your choice?',
  ],
};
