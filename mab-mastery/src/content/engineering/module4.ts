import type { ModuleContent } from '../../types/content';

export const module4: ModuleContent = {
  id: 'engineering-m4',
  sectionId: 'engineering',
  moduleNumber: 4,
  eyebrow: 'ENGINEERING 05',
  title: 'S228P — IgG4 Hinge Stabilisation',
  lead: 'The S228P mutation is a universal requirement for all therapeutic IgG4 antibodies. It corrects the intrinsic instability of the IgG4 CPSC hinge motif, which enables in vivo Fab-arm exchange — the spontaneous formation of bispecific half-antibody hybrids — by converting it to the IgG1-like CPPC sequence.',
  tags: [
    { label: 'IgG4 Engineering', color: 'amber' },
    { label: 'Hinge Stabilisation', color: 'blue' },
    { label: 'Fab-Arm Exchange', color: 'red' },
    { label: 'S228P', color: 'teal' },
  ],
  stats: [
    { label: 'Mutation', value: 'S228P (EU)' },
    { label: 'Mechanism', value: 'CPSC to CPPC' },
    { label: 'Discovery', value: 'Angal et al. 1993' },
    { label: 'Approved IgG4 mAbs', value: 'All use S228P' },
  ],
  sections: [
    {
      type: 'card',
      title: '1. The IgG4 Fab-Arm Exchange Problem',
      color: 'red',
      content:
        'Wild-type human IgG4 undergoes a unique post-secretory process called Fab-arm exchange (FAE), in which two half-antibody molecules (each consisting of one heavy chain + one light chain) from different IgG4 molecules swap to form bispecific antibodies in vivo. This process was first described in detail by van der Neut Kolfschoten et al. (Science 317:1554, 2007), though the hinge instability underlying it was recognised earlier by Angal et al. (Molecular Immunology 30:105, 1993). The mechanism proceeds in two steps: (1) the IgG4 inter-heavy chain disulfide bonds in the hinge region undergo reversible thiol-disulfide exchange, forming intra-chain disulfide bonds instead of inter-chain bonds; (2) once the two heavy chains are non-covalently associated (held only by CH3-CH3 interactions), they can dissociate and re-associate with heavy chains from other IgG4 molecules. The result is random pairing of half-antibodies, generating bispecific IgG4 molecules that have lost monospecific bivalent binding. In vivo, approximately 30-50% of circulating IgG4 exists as bispecific half-antibody hybrids.',
    },
    {
      type: 'card',
      title: '2. Structural Basis — CPSC vs CPPC Hinge Motif',
      color: 'blue',
      content:
        'The molecular basis of IgG4 FAE lies in the core hinge sequence. IgG1, IgG2, and IgG3 all contain the sequence CPPC (Cys-Pro-Pro-Cys, EU positions 226-229) in their core hinge, where the two cysteine residues form inter-heavy chain disulfide bonds. IgG4 uniquely has the sequence CPSC (Cys-Pro-Ser-Cys), where S228 replaces the second proline. The serine at position 228 introduces two problems: (1) it confers conformational flexibility to the hinge, allowing the cysteine residues to access both inter-chain and intra-chain bonding orientations; (2) serine is a poorer helix-breaking residue than proline, further destabilising the extended hinge conformation required for stable inter-chain disulfides. In the intra-chain bonding state, C226 forms a disulfide with C229 within the same heavy chain rather than bridging to the partner heavy chain. This eliminates the covalent link between the two half-molecules, leaving only the CH3-CH3 non-covalent interaction (KD approximately 0.5-2 micromolar), which is insufficient to prevent dissociation under physiological conditions.',
    },
    {
      type: 'code',
      title: '3. Hinge Sequence Alignment — All Four IgG Subclasses',
      language: 'text',
      code:
`EU Numbering:  ...221  222  223  224  225  226  227  228  229  230  231  232  233  234  235  236...
                                                C    P    x    C              (core hinge disulfides)
IgG1:          ...Asp  Lys  Thr  His  Thr  Cys  Pro  Pro  Cys  Pro  Ala  Pro  Glu  Leu  Leu  Gly...
IgG2:          ...Val  Glu  Arg  Lys  Cys  Cys  Val  Glu  Cys  Pro  Pro  Cys  Pro  Ala  Pro  Pro...
IgG3:          ...Glu  Leu  Lys  Thr  Pro  Cys  Pro  Pro  Cys  Pro  (15x hinge repeat)...
IgG4 WT:       ...Glu  Ser  Lys  Tyr  Gly  Cys  Pro  Ser  Cys  Pro  Ala  Pro  Glu  Phe  Leu  Gly...
                                                         ^^^
                                                      S228 (FAE problem)
IgG4 S228P:    ...Glu  Ser  Lys  Tyr  Gly  Cys  Pro  Pro  Cys  Pro  Ala  Pro  Glu  Phe  Leu  Gly...
                                                         ^^^
                                                      P228 (stabilised = IgG1-like CPPC)

Result: S228P converts CPSC -> CPPC, eliminating intra-chain disulfide formation
        and preventing Fab-arm exchange in vivo.`,
    },
    {
      type: 'card',
      title: '4. Angal et al. 1993 — The Foundational Discovery',
      color: 'green',
      content:
        'Angal and colleagues at Wellcome Research Laboratories (Molecular Immunology 30:105, 1993) were the first to identify the IgG4 hinge instability problem and propose the S228P solution. Working with chimeric anti-CD3 IgG4 antibodies, they observed that IgG4 preparations showed heterogeneous disulfide bonding patterns on non-reducing SDS-PAGE, with significant half-antibody populations. They systematically mutated hinge residues and demonstrated that converting S228 to proline (creating the IgG1-like CPPC motif) eliminated the heterogeneity and produced homogeneous inter-chain disulfide-bonded molecules. The S228P mutation did not alter antigen binding, thermal stability, or other biophysical properties. This work predated the discovery of in vivo FAE by over a decade but correctly identified the structural basis. The Angal discovery is one of the most impactful single-residue mutations in therapeutic antibody history, as S228P has been incorporated into every therapeutic IgG4 mAb approved or in clinical development.',
    },
    {
      type: 'table',
      title: '5. Approved Therapeutic IgG4 Antibodies — All Contain S228P',
      headers: ['Product', 'Target', 'First Approval', 'Indication(s)', 'Company'],
      rows: [
        ['Natalizumab (Tysabri)', 'alpha4-integrin', '2004', 'MS, Crohn disease', 'Biogen'],
        ['Nivolumab (Opdivo)', 'PD-1', '2014', 'Multiple cancers', 'BMS'],
        ['Pembrolizumab (Keytruda)', 'PD-1', '2014', 'Multiple cancers', 'Merck'],
        ['Ixekizumab (Taltz)', 'IL-17A', '2016', 'Psoriasis, PsA, axSpA', 'Lilly'],
        ['Dupilumab (Dupixent)', 'IL-4Ralpha', '2017', 'Atopic dermatitis, asthma', 'Sanofi/Regeneron'],
        ['Cemiplimab (Libtayo)', 'PD-1', '2018', 'CSCC, BCC, NSCLC', 'Sanofi/Regeneron'],
        ['Caplacizumab (Cablivi)', 'vWF', '2018', 'aTTP', 'Ablynx/Sanofi (nanobody)'],
        ['Dostarlimab (Jemperli)', 'PD-1', '2021', 'Endometrial cancer, dMMR', 'GSK'],
        ['Tislelizumab (Tevimbra)', 'PD-1', '2023 (US)', 'Esophageal SCC, NSCLC', 'BeiGene'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: '6. Why IgG4 Is Chosen Despite the FAE Problem',
      variant: 'info',
      content:
        'Despite requiring the S228P correction, IgG4 remains the preferred subclass for blocking/antagonist antibodies where effector function is undesirable. IgG4 has naturally low FcgammaR binding (lower hinge Phe234/Leu235 instead of IgG1 Leu234/Leu235), negligible C1q/CDC activity, and preserved FcRn binding. For checkpoint inhibitors (anti-PD-1, anti-PD-L1, anti-CTLA-4), the goal is to block receptor-ligand interactions without killing the T cells expressing the target. IgG1 with effector function would deplete the very T cells you are trying to activate. IgG4-S228P provides: (a) blocking function with minimal effector activity; (b) normal 21-day half-life via FcRn; (c) standard Protein A purification; (d) well-established manufacturing platform. The alternative — IgG1 with LALA or LALA-PG — is also used but requires additional mutation validation. Many sponsors prefer IgG4-S228P because it is a single conservative mutation on a naturally low-effector-function backbone.',
    },
    {
      type: 'card',
      title: '7. Detection of Fab-Arm Exchange — Analytical Methods',
      color: 'purple',
      content:
        'Confirming the absence of FAE is a critical component of the CMC characterisation package for IgG4-S228P molecules. Key analytical methods include: (1) Native mass spectrometry: Resolves intact IgG4 from half-antibody species under non-denaturing conditions. Half-antibodies appear at approximately 75 kDa (vs 150 kDa for intact IgG). S228P should show <1% half-antibody. (2) Non-reducing CE-SDS: Separates intact IgG from half-antibody (H+L) and free heavy/light chain species. Wild-type IgG4 typically shows 5-30% half-antibody; S228P should show <2%. (3) Size-exclusion chromatography under mildly denaturing conditions (0.5 M guanidine HCl): Enhances resolution of half-antibody species. (4) In vivo FAE assay: Incubate two distinguishable IgG4 antibodies (e.g., anti-A and anti-B) in serum or with glutathione, then detect bispecific species by bridging ELISA. S228P should show no bispecific formation. (5) Peptide mapping: Confirms Ser-to-Pro substitution at position 228 and verifies inter-chain disulfide bonding by identifying disulfide-linked hinge peptides.',
    },
    {
      type: 'table',
      title: '8. IgG4 WT vs IgG4-S228P Biophysical Comparison',
      headers: ['Property', 'IgG4 WT (CPSC)', 'IgG4 S228P (CPPC)', 'Impact'],
      rows: [
        ['Inter-chain disulfide', '50-70% intact', '>98% intact', 'S228P eliminates hinge heterogeneity'],
        ['Half-antibody (native MS)', '15-30%', '<1-2%', 'Eliminates FAE substrate'],
        ['In vivo FAE', '30-50% bispecific at steady-state', 'Undetectable', 'Maintains monospecific bivalency'],
        ['FcgammaRI binding', 'Low-moderate', 'Low-moderate (unchanged)', 'S228P does not affect effector function'],
        ['FcgammaRIIIa binding', 'Very low', 'Very low (unchanged)', 'IgG4 naturally low effector function'],
        ['C1q/CDC', 'Negligible', 'Negligible (unchanged)', 'IgG4 does not fix complement'],
        ['FcRn binding (pH 6.0)', 'Normal (~500 nM)', 'Normal (~500 nM)', 'Half-life preserved'],
        ['Tm (CH2)', '~69 C', '~69-70 C', 'Slight stabilisation from rigid hinge'],
        ['Protein A binding', 'Normal', 'Normal', 'Standard capture chromatography'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: '9. Residual IgG4 Effector Function',
      variant: 'warning',
      content:
        'While IgG4-S228P effectively eliminates FAE, it is important to recognise that IgG4 is not truly effector-null. IgG4 retains low-level binding to FcgammaRI (the high-affinity receptor, which can bind even low-affinity ligands when monomeric IgG concentrations are sufficiently high) and measurable FcgammaRIIa binding. In vitro, IgG4-S228P can mediate weak ADCP by macrophages (approximately 10-20% of IgG1 wild-type levels) and very low ADCC (<5% of IgG1). This residual effector function is usually not clinically significant but should be characterised and disclosed in regulatory filings. For applications requiring absolute effector silencing (e.g., T-cell bispecifics), IgG1-LALA-PG is preferred over IgG4-S228P because the triple mutation achieves lower residual effector function than the IgG4 subclass. However, for most checkpoint inhibitor applications, the IgG4-S228P residual effector profile is acceptable and has been validated by the safety profiles of pembrolizumab, nivolumab, and other approved IgG4 mAbs.',
    },
    {
      type: 'bullets',
      title: '10. CMC Release Testing for IgG4-S228P',
      items: [
        'Identity: Peptide mapping confirming P228 substitution. Mass spec of hinge-containing tryptic peptide should show proline at position 228.',
        'Purity (non-reducing CE-SDS): Report half-antibody percentage as a specified impurity. Acceptance criterion typically less than 2% half-antibody species.',
        'Native SEC or native MS: Monitor for half-antibody and low-molecular-weight species at release. S228P should maintain >98% intact IgG.',
        'Potency: Binding assay (SPR or ELISA) confirming bivalent target engagement. Any reduction in potency may indicate reversion to half-antibody formation.',
        'Forced degradation: Include FAE stress test (incubation with reduced glutathione at 37 degrees C for 24 hours) to demonstrate stability of S228P inter-chain disulfides under reducing conditions.',
        'Stability monitoring: Half-antibody formation should be monitored at all stability time points (real-time and accelerated). Increasing half-antibody over time would indicate incomplete S228P stabilisation or unusual degradation pathway.',
      ],
    },
    {
      type: 'card',
      title: '11. Therapeutic Implications of FAE',
      color: 'teal',
      content:
        'The discovery of IgG4 FAE had profound implications for understanding both endogenous IgG4 biology and therapeutic antibody design. Endogenous IgG4 FAE is now understood to be a natural anti-inflammatory mechanism: by generating bispecific (functionally monovalent) antibodies that cannot crosslink antigens, the immune system uses IgG4 FAE to produce blocking antibodies that dampen immune responses without triggering effector function. This is why IgG4 is the dominant subclass in allergen-specific immunotherapy (blocking IgE:allergen interactions) and in chronic antigen exposure. For therapeutic IgG4 mAbs, failure to include S228P would be catastrophic: the drug product would progressively lose bivalent binding activity in vivo as FAE generates monovalent half-antibody hybrids with endogenous IgG4. At steady-state IgG4 concentrations (0.2-1 mg/mL), the equilibrium would strongly favour hybrid formation, potentially reducing drug efficacy by >50%.',
    },
  ],
  mentorQuestions: [
    'You discover that your IgG4-S228P mAb shows 4% half-antibody content by native MS at the 24-month stability time point (it was <1% at release). What root cause investigations would you conduct, and how would you assess the clinical impact?',
    'A competitor has filed a biosimilar application for an approved IgG4-S228P checkpoint inhibitor. Their product shows 2.5% half-antibody by non-reducing CE-SDS versus 0.8% for the reference product. How would you evaluate whether this difference is clinically meaningful in your role as CMC assessor?',
    'Explain why IgG4-S228P is preferred over IgG1-LALA for pembrolizumab-like anti-PD-1 mAbs, even though both achieve low effector function. Consider the full development lifecycle from construct design through commercial manufacturing.',
  ],
};
