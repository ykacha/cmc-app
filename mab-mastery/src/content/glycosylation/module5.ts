import type { ModuleContent } from '../../types/content';

export const module5: ModuleContent = {
  id: 'glycosylation-m5',
  sectionId: 'glycosylation',
  moduleNumber: 5,
  eyebrow: 'GLYCOSYLATION 06',
  title: 'Galactosylation & CDC',
  lead: 'Terminal galactose residues and complement activation \u2014 the C1q contact mechanism, contradictory ADCC data, population-scale glycomics, and ASGPR-mediated clearance.',
  tags: [
    { label: 'B4GalT1', color: 'teal' },
    { label: 'CDC', color: 'purple' },
    { label: 'C1q', color: 'blue' },
    { label: 'ASGPR', color: 'amber' },
  ],
  stats: [
    { label: 'CDC Effect', value: 'G2F > G0F' },
    { label: 'Enzyme', value: 'B4GalT1' },
    { label: 'Cofactor', value: 'Mn\u00B2\u207A' },
    { label: 'Key Study', value: 'Hodoniczky 2005' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Galactosylation \u2014 The Second Terminal Modification',
      color: 'teal',
      content:
        'Terminal \u03B21,4-linked galactose is added to the antennary GlcNAc residues of the biantennary core by \u03B21,4-galactosyltransferase 1 (B4GalT1, B4GALT1 gene) in the trans-Golgi. The resulting glycoforms follow the Oxford nomenclature: G0F (no galactose), G1F (one galactose on either the \u03B11,3-arm or \u03B11,6-arm), and G2F (galactose on both arms). In CHO-produced IgG1, the typical distribution is G0F 30\u201350%, G1F 20\u201335%, G2F 5\u201315%, reflecting incomplete galactosylation due to steric constraints within the CH2 glycan pocket that limit B4GalT1 access. Galactosylation is enzymatically dependent on three factors: (1) B4GalT1 protein level in the trans-Golgi, (2) luminal UDP-galactose concentration (transported by SLC35A2), and (3) Mn\u00B2\u207A availability as the essential divalent cation cofactor for B4GalT1 catalysis. The Mn\u00B2\u207A requirement makes galactosylation uniquely responsive to manganese supplementation in cell culture media: 0.01\u20130.1 mM MnCl\u2082 can increase G1F + G2F by 10\u201330% relative. Galactosylation is also temperature-sensitive: a temperature shift from 37\u00B0C to 32\u201333\u00B0C at mid-exponential phase slows cell metabolism, extends Golgi transit time, and allows more complete B4GalT1 processing.',
    },
    {
      type: 'card',
      title: 'C1q Hexamer Structure and Galactose-Dependent Binding',
      color: 'blue',
      content:
        'C1q is the recognition component of the classical complement pathway. It is a 460 kDa hexameric molecule composed of 18 polypeptide chains (6 copies each of C1qA, C1qB, and C1qC) arranged as six globular heads connected by collagen-like stalks to a central stalk bundle. Each globular head contains the IgG Fc binding site, and productive C1q activation requires simultaneous engagement of at least two globular heads with two Fc regions in close proximity (i.e., IgG immune complexes on a target cell surface). The C1q binding site on IgG1 Fc spans the CH2 domain, centring on residues D270, K322, P329, and P331 (EU numbering). Galactosylation modulates C1q binding through an indirect structural mechanism: the terminal galactose residues on the \u03B11,6-arm of the N297 glycan extend toward the C\u2019E loop of CH2, which contains several C1q contact residues. Hodoniczky et al. (2005) and Raju (2008) demonstrated that fully galactosylated IgG1 (G2F) shows approximately 2\u20134-fold enhanced C1q binding compared to agalactosylated IgG1 (G0F). The mechanistic interpretation is that terminal galactose stabilises the open CH2 conformation that optimally presents the C1q binding epitope.',
    },
    {
      type: 'card',
      title: 'CDC Activity \u2014 G2F > G1F > G0F Hierarchy',
      color: 'purple',
      content:
        'Complement-dependent cytotoxicity (CDC) follows the galactosylation hierarchy: G2F > G1F > G0F. The magnitude of the CDC difference is typically 2\u20134-fold between G2F and G0F, substantially less dramatic than the 20\u201350-fold ADCC enhancement from afucosylation. Hodoniczky et al. (Biotechnol. Prog., 2005) used enzymatically remodelled IgG1 glycovariants to demonstrate the systematic relationship: complete degalactosylation (G0F-only) reduced CDC to approximately 40\u201360% of the fully galactosylated (G2F-enriched) control, while intermediate galactosylation (G1F-dominant) showed intermediate CDC. The CDC effect is clinically relevant for rituximab-type anti-CD20 antibodies where CDC is a significant contributor to B-cell depletion, but is less relevant for most ADCC-dominant oncology mAbs. For CDC-dependent molecules, galactosylation becomes a Tier 1 CQA with specification ranges that maintain G1F + G2F above a defined threshold (typically >40\u201350% combined). Process control of galactosylation through Mn\u00B2\u207A supplementation, temperature shift, and UDP-galactose feed becomes critical for CDC-dependent products.',
    },
    {
      type: 'table',
      title: 'Galactosylation Effect on Effector Functions',
      headers: ['Effector Function', 'G0F Activity', 'G1F Activity', 'G2F Activity', 'Fold Change (G2F/G0F)', 'Mechanism'],
      rows: [
        ['C1q binding', 'Baseline', '~1.5\u20132\u00D7', '~2\u20134\u00D7', '2\u20134\u00D7', 'CH2 conformation stabilisation; enhanced C1q contact epitope presentation'],
        ['CDC (cell-based)', 'Baseline', '~1.3\u20132\u00D7', '~2\u20134\u00D7', '2\u20134\u00D7', 'Downstream of enhanced C1q binding; EC\u2085\u2080 shift'],
        ['Fc\u03B3RIIIa binding', 'Baseline', '~1\u20131.2\u00D7', '~1.1\u20131.5\u00D7', '1\u20131.5\u00D7', 'Minor; galactose does not contact Fc\u03B3RIIIa directly'],
        ['ADCC (cell-based)', 'Baseline', 'Variable', 'Variable', '0.8\u20131.5\u00D7', 'Contradictory data; depends on assay system and effector cells'],
        ['FcRn binding (pH 6.0)', 'Baseline', '~1\u00D7', '~1\u00D7', '~1\u00D7', 'Glycan-independent binding site at CH2\u2013CH3 interface'],
        ['Protein A binding', 'Baseline', '~1\u00D7', '~1\u00D7', '~1\u00D7', 'CH2\u2013CH3 interface; glycan-independent'],
        ['Serum half-life', 'Baseline', '~1\u00D7', '~1\u00D7*', '~1\u00D7*', '*ASGPR clearance only at extreme galactosylation (>80% G2)'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Contradictory ADCC Data \u2014 Why Galactose Effect on ADCC Is Ambiguous',
      color: 'amber',
      content:
        'The effect of galactosylation on ADCC has been reported as enhancing, neutral, or even slightly inhibitory depending on the study. This inconsistency stems from multiple confounding variables: (1) Co-variation with fucosylation: enzymatic remodelling with B4GalT1 to increase galactosylation does not change fucose content, but cell culture manipulations that increase galactosylation (e.g., Mn\u00B2\u207A, temperature shift) may also subtly alter fucose content, confounding the ADCC signal. Since afucosylation has a 20\u201350-fold ADCC effect versus the 1\u20132-fold galactosylation effect, even a 1\u20132% change in afucosylation can dominate the readout. (2) Effector cell variability: PBMC-based ADCC assays use heterogeneous effector populations where NK cells, monocytes, and granulocytes all contribute. The galactosylation effect may differ across these cell types due to differential Fc\u03B3R expression. (3) Target density effects: at high target antigen density, the immune complex clustering effect saturates Fc\u03B3RIIIa regardless of galactosylation, masking subtle affinity differences. (4) SPR versus cell-based assay discrepancies: SPR shows a minor (1.1\u20131.5-fold) increase in Fc\u03B3RIIIa binding for G2F versus G0F, but this does not consistently translate to cell-based ADCC enhancement because the avidity of multivalent Fc\u03B3RIIIa engagement on NK cell surfaces compensates for small monovalent affinity differences.',
    },
    {
      type: 'card',
      title: 'Kristi\u0107 2024 \u2014 Population-Scale IgG Glycomics',
      color: 'green',
      content:
        'Large-scale population glycomics studies, notably by the Kristi\u0107/Lauc group (Nat. Rev. Genet., 2024 and prior publications), have mapped the IgG glycan landscape across thousands of individuals, revealing that galactosylation is the most variable glycan feature in the healthy population. Key findings: (1) IgG galactosylation decreases approximately linearly with age, from ~50\u201360% G1+G2 in 20-year-olds to ~25\u201335% in 70-year-olds. This age-dependent agalactosylation correlates with increasing inflammatory burden and has been proposed as a biomarker of biological ageing. (2) Women have higher IgG galactosylation than men at all ages, with a sharp decrease at menopause consistent with oestrogen regulation of B4GalT1 expression. (3) In rheumatoid arthritis (RA), IgG galactosylation drops by 20\u201330% below age-matched healthy controls, preceding clinical flare by months \u2014 the "RA galactosylation deficit" first described by Parekh et al. (Nature, 1985). (4) Pregnancy transiently increases IgG galactosylation, correlating with RA remission during pregnancy. (5) Genome-wide association studies (GWAS) have identified SNPs in B4GALT1, MGAT3, ST6GAL1, and FUT8 that explain approximately 10\u201315% of inter-individual glycan variance, with the remainder attributed to environmental and metabolic factors. These population data provide the broader context for interpreting manufacturing glycan variability: the therapeutic mAb glycan profile should be understood relative to the endogenous IgG glycan landscape.',
    },
    {
      type: 'card',
      title: 'ASGPR-Mediated Clearance \u2014 The Exposed Galactose Risk',
      color: 'red',
      content:
        'The asialoglycoprotein receptor (ASGPR, hepatic lectin) is a C-type lectin on hepatocyte surfaces that binds exposed terminal galactose and GalNAc residues with high affinity, mediating rapid endocytosis and lysosomal degradation. For most therapeutic mAbs, ASGPR-mediated clearance is not a concern because: (1) the N297 glycan is partially buried within the CH2 cavity, reducing ASGPR access; (2) the typical mAb has only one glycan per heavy chain (two per intact IgG), below the valency threshold for efficient ASGPR engagement (ASGPR requires multivalent ligand clustering for high-avidity binding); (3) sialic acid caps on galactose residues block ASGPR recognition. However, ASGPR clearance becomes relevant in specific scenarios: (a) highly galactosylated Fc fusion proteins with multiple exposed glycosylation sites (e.g., etanercept has 3\u20136 N-glycan sites per molecule, all in accessible positions); (b) enzymatically remodelled mAbs with >80% G2 and very low sialylation; (c) high-dose therapeutic glycoproteins where the hepatic ASGPR capacity (~500,000 receptors per hepatocyte) is approached. For standard IgG1 mAbs with typical CHO glycosylation (G0F 30\u201350%, G2F 5\u201315%), ASGPR clearance does not measurably affect serum half-life.',
    },
    {
      type: 'table',
      title: 'Process Levers for Galactosylation Control',
      headers: ['Lever', 'Mechanism', 'Typical Range', 'Expected G2F Increase', 'Caveats'],
      rows: [
        ['Mn\u00B2\u207A supplementation', 'Essential cofactor for B4GalT1 catalysis', '0.01\u20130.1 mM MnCl\u2082', '+10\u201330% relative', 'Excess Mn\u00B2\u207A (>0.2 mM) can reduce cell viability; monitor VCD'],
        ['Temperature shift', 'Extends Golgi transit time; slows secretion rate', '37\u00B0C \u2192 32\u201333\u00B0C at day 3\u20135', '+10\u201320% relative', 'Reduces titre by 10\u201330%; trade-off with productivity'],
        ['Galactose feed', 'Precursor for UDP-Gal biosynthesis via Gal-1-P uridylyltransferase', '5\u201320 mM in feed', '+5\u201315% relative', 'Less effective than Mn\u00B2\u207A; metabolised to other pathways'],
        ['UDP-galactose supplementation', 'Direct donor substrate for B4GalT1', '1\u20135 mM in feed (cell-permeable analogue)', '+10\u201320% relative', 'Cell permeability varies; UDP-Gal is not membrane-permeable directly'],
        ['Uridine + galactose co-feed', 'Boosts both UDP and Gal pools for UDP-Gal synthesis', 'Uridine 1\u20134 mM + Gal 10\u201320 mM', '+10\u201325% relative', 'Synergistic with Mn\u00B2\u207A supplementation'],
        ['Ammonia control (GlutaMAX)', 'Preserves trans-Golgi pH for B4GalT1 activity', 'Replace Gln with GlutaMAX', '+5\u201315% relative', 'Also reduces high-mannose species'],
        ['Extended culture duration', 'More time for Golgi processing; but sialidase release', 'Harvest viability >80%', 'Variable', 'Late harvest releases hexosaminidases that can clip GlcNAc'],
        ['In-vitro galactosylation', 'Post-purification treatment with recombinant B4GalT1 + UDP-Gal + Mn\u00B2\u207A', 'Downstream processing step', 'Can reach >90% G2F', 'Additional DS processing step; must validate enzyme removal'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: 'In-Vitro Glycan Remodelling \u2014 Post-Purification Engineering',
      variant: 'success',
      content:
        'In-vitro enzymatic glycan remodelling after protein A purification offers an alternative to cell culture optimisation for galactosylation control. The approach treats purified IgG with recombinant B4GalT1 enzyme in the presence of UDP-galactose and MnCl\u2082 to convert G0F to G1F/G2F. Reaction conditions are typically: 5\u201320 \u03BCg B4GalT1 per mg IgG, 2\u20135 mM UDP-Gal, 10 mM MnCl\u2082, pH 7.4, 37\u00B0C for 4\u201324 hours. This approach can achieve >90% G2F from a G0F-dominant starting material. The B4GalT1 enzyme is subsequently removed by an additional chromatography step (typically mixed-mode or affinity). Roche/Genentech has published on this approach for CDC-enhanced anti-CD20 antibodies. Regulatory considerations include: (1) the remodelling enzyme must be manufactured to GMP-grade with defined specifications; (2) enzyme removal must be validated to below a defined limit (analogous to Protein A leachate); (3) the remodelled product must demonstrate equivalent stability, PK, and safety to the non-remodelled version; (4) process economics must justify the additional manufacturing step. This strategy is most valuable when cell culture optimisation alone cannot achieve the target galactosylation profile, or when the molecule has a strict CDC-dependent mechanism requiring G2F >50%.',
    },
    {
      type: 'bullets',
      title: 'Galactosylation as a CQA \u2014 When and How to Specify',
      color: 'blue',
      items: [
        'CDC-dependent mAbs (e.g., rituximab-type anti-CD20): Galactosylation is a Tier 1 CQA. Specify G0F upper limit (NMT 50\u201360%) and G1F+G2F lower limit (NLT 30\u201350%). Correlate with C1q binding and CDC potency data across clinical batches.',
        'ADCC-dominant mAbs (e.g., trastuzumab): Galactosylation is typically Tier 2 (characterisation with limits) because the ADCC impact is minimal compared to fucosylation. Monitor G0F/G1F/G2F by HILIC-FLD and trend across batches without tight release limits.',
        'Blocking/neutralising mAbs (e.g., anti-TNF, anti-IL6R): Galactosylation is Tier 2\u20133. The MoA is target neutralisation, not effector function, so galactosylation has no direct impact on efficacy. Specifications are set for consistency rather than functional thresholds.',
        'Biosimilar context: Galactosylation profile must match the innovator quality range. Even for non-CDC-dependent molecules, visible differences in the HILIC glycan profile (e.g., G0F:G1F:G2F ratio) trigger regulatory scrutiny and may require functional bridging.',
        'Stability-indicating: Galactosylation is relatively stable during shelf life (galactose is not cleaved by non-enzymatic degradation). However, low-pH viral inactivation (pH 3.3\u20133.7) can cause minor de-galactosylation if the IgG is exposed for extended hold times at low pH.',
        'Fc fusion proteins: More CQA-relevant due to exposed glycosylation sites. ASGPR clearance risk is higher for multi-glycosylated Fc fusions with high galactose and low sialic acid.',
      ],
    },
    {
      type: 'card',
      title: 'G0F and Inflammation \u2014 The Parekh Hypothesis',
      color: 'amber',
      content:
        'Parekh et al. (Nature, 1985) first reported that IgG from rheumatoid arthritis (RA) patients is significantly agalactosylated (elevated G0F) compared to healthy controls. The "Parekh hypothesis" proposed that agalactosylated IgG activates the lectin pathway of complement via mannose-binding lectin (MBL), which recognises the exposed GlcNAc residues on G0/G0F glycans. This MBL-mediated complement activation on IgG immune complexes in the synovium would amplify local inflammation, creating a positive feedback loop: inflammation \u2192 B4GalT1 downregulation in plasma cells \u2192 more G0F IgG \u2192 more MBL-mediated complement activation \u2192 more inflammation. Subsequent studies have partially validated this mechanism: MBL does bind G0 IgG with higher affinity than G2 IgG, and MBL-complement activation has been demonstrated on G0 IgG immune complexes in vitro. However, the clinical significance remains debated because: (1) MBL-mediated complement activation requires dense immune complex surfaces and may not occur efficiently on circulating IgG; (2) MBL deficiency (present in ~5\u201310% of the population) does not protect against RA; (3) the G0F increase in RA may be a biomarker of inflammation rather than a cause. Nevertheless, the Parekh observations established galactosylation as a biologically relevant glycan parameter and motivated decades of research into IgG glycan\u2013function relationships.',
    },
    {
      type: 'callout',
      title: 'Analytical Monitoring of Galactosylation',
      variant: 'info',
      content:
        'Galactosylation is monitored by the same glycan profiling methods used for the overall Asn297 glycan distribution. HILIC-FLD with 2-AB or 2-AA labelled released glycans provides baseline resolution of G0F, G1F(\u03B11,3), G1F(\u03B11,6), and G2F peaks. The galactosylation index (GI) is calculated as: GI = (0.5 \u00D7 %G1F + 1.0 \u00D7 %G2F) / (%G0F + %G1F + %G2F), ranging from 0 (fully agalactosylated) to 1.0 (fully galactosylated). Typical CHO IgG1 GI is 0.20\u20130.45. CE-LIF with APTS labelling provides rapid in-process galactosylation monitoring within 2\u20134 hours (versus 24\u201348 hours for HILIC-FLD). Intact mass spectrometry can resolve G0F, G1F, and G2F glycoforms on the intact or subunit (Fc/2) level, providing an orthogonal confirmation. For CDC-dependent products, the galactosylation specification should be correlated with C1q binding ELISA and CDC cell-based potency data. The correlation dataset should span at least 10\u201320 batches covering the development and clinical manufacturing history to establish the galactosylation\u2013CDC relationship within the design space.',
    },
  ],
  mentorQuestions: [
    'Your CDC-dependent anti-CD20 mAb shows G2F at 8% with a CDC potency of 75% relative to reference standard. Process development proposes adding 0.05 mM MnCl\u2082 to the cell culture media and shifting temperature to 33\u00B0C at day 4, projecting G2F to reach 18\u201322%. What additional studies would you require before implementing this change, and how would you assess the impact on ADCC, PK, and the overall CQA profile?',
    'A colleague claims that galactosylation is irrelevant for an Fc-silent bispecific (LALA-PG mutations) because all effector functions are ablated by the Fc mutations. Do you agree? Consider whether galactosylation could still affect CH2 stability, FcRn binding, aggregation propensity, or immunogenicity even in the absence of effector function.',
    'Population glycomics data shows that 70-year-old patients (the typical oncology population) have endogenous IgG galactosylation of ~25\u201335% G1+G2. Your mAb has 55% G1+G2. Could the mismatch between therapeutic mAb glycosylation and the patient\u2019s endogenous IgG glycosylation affect anti-drug antibody (ADA) formation or immune complex behaviour? How would you design a study to address this question?',
  ],
};
