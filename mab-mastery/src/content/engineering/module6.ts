import type { ModuleContent } from '../../types/content';

export const module6: ModuleContent = {
  id: 'engineering-m6',
  sectionId: 'engineering',
  moduleNumber: 6,
  eyebrow: 'ENGINEERING 07',
  title: 'LS Mutation (M428L/N434S) — Half-Life Extension',
  lead: 'The LS mutation (M428L/N434S) is Xencor\'s FcRn-enhancing technology, providing approximately 3-fold half-life extension through enhanced hydrophobic packing and hydrogen bonding at the Fc:FcRn interface. LS offers a differentiated profile from YTE with potentially better preservation of effector function.',
  tags: [
    { label: 'Xencor Xtend', color: 'blue' },
    { label: 'FcRn Enhancement', color: 'green' },
    { label: 'M428L/N434S', color: 'amber' },
    { label: 'Half-Life', color: 'purple' },
  ],
  stats: [
    { label: 'Mutations', value: 'M428L + N434S' },
    { label: 'FcRn Enhancement', value: '~5-8x at pH 6.0' },
    { label: 'Half-Life Extension', value: '~3x (35-40 days)' },
    { label: 'ADCC Impact', value: 'Minimal' },
  ],
  sections: [
    {
      type: 'card',
      title: '1. Molecular Basis of LS Mutations',
      color: 'blue',
      content:
        'The LS mutations target the CH3 domain face of the Fc:FcRn interface, complementary to the CH2 domain contacts targeted by YTE. M428L (EU numbering): Methionine 428 is located on the CH3 domain surface in direct contact with FcRn alpha chain residues. Mutation to leucine replaces the thioether-containing methionine side chain with a branched aliphatic chain that creates enhanced hydrophobic packing with FcRn. The leucine side chain fills a shallow hydrophobic pocket on FcRn more efficiently than methionine, contributing approximately 0.5-1.0 kcal/mol of additional binding free energy. N434S: Asparagine 434 is a key contact residue at the Fc:FcRn interface, located adjacent to H435 (which is critical for pH-dependent binding). Mutation to serine introduces a smaller side chain with a hydroxyl group that forms a new hydrogen bond with FcRn His166 (alpha chain). The shorter serine side chain also reduces steric clash with FcRn residues at the interface, improving the geometric complementarity. Together, M428L and N434S enhance FcRn binding at pH 6.0 by approximately 5-8-fold, which is somewhat less than YTE (~10-fold) but sufficient to achieve clinically meaningful half-life extension.',
    },
    {
      type: 'table',
      title: '2. LS vs YTE — Binding and PK Comparison',
      headers: ['Parameter', 'WT IgG1', 'LS (M428L/N434S)', 'YTE (M252Y/S254T/T256E)', 'Notes'],
      rows: [
        ['FcRn KD (pH 6.0)', '500-1,000 nM', '80-200 nM', '50-100 nM', 'YTE slightly tighter at pH 6.0'],
        ['FcRn KD (pH 7.4)', '>10 uM', '>8 uM', '>5 uM', 'Both preserve pH release; YTE slightly more residual'],
        ['pH selectivity ratio', '~20x', '~40-80x', '~50-100x', 'Both enhance selectivity'],
        ['Human half-life (predicted/observed)', '18-21 days', '~35-40 days', '~50-70 days', 'YTE achieves greater extension'],
        ['Cynomolgus half-life fold change', '1x', '~2-3x', '~3-5x', 'Monkey data less predictive than human'],
        ['ADCC impact', 'Baseline', 'Minimal (<1.5x reduction)', '~2-3x reduction', 'LS may preserve ADCC better'],
        ['CDC impact', 'Baseline', 'Minimal', 'Minimal', 'Neither significantly affects CDC'],
        ['Protein A binding', 'Normal', 'Normal', 'Normal', 'Standard purification for both'],
        ['Thermal stability (CH3 Tm)', '82-85 C', '80-83 C', '82-85 C', 'LS may modestly reduce CH3 Tm'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '3. Potential ADCC/CDC Preservation Advantage',
      color: 'green',
      content:
        'A key potential advantage of LS over YTE is better preservation of effector function. The LS mutations (M428L/N434S) are located exclusively on the CH3 domain surface, which is spatially distant from the FcgammaR binding site (lower hinge/upper CH2). The FcgammaR binding site and the LS mutation sites are separated by approximately 30-40 angstroms in the Fc crystal structure. In contrast, YTE mutations (M252Y/S254T/T256E) are at the CH2-CH3 interface junction, closer to the CH2 domain, where indirect conformational effects can propagate to the FcgammaR binding region. Published comparative data (Zalevsky et al., Nature Biotechnology 28:157, 2010) showed that LS-enhanced antibodies retained wild-type-level ADCC activity in primary NK cell assays, whereas YTE-enhanced antibodies showed a measurable (2-3-fold) reduction. This distinction is clinically relevant for oncology programmes where both ADCC and half-life extension are desired. An LS-enhanced anti-tumour mAb could achieve longer dosing intervals without sacrificing effector function, whereas YTE may require compensatory ADCC enhancement (e.g., afucosylation or DE mutations).',
    },
    {
      type: 'code',
      title: '4. Fc:FcRn Interface — LS Contact Map',
      language: 'text',
      code:
`Fc:FcRn Interface — LS Mutation Contact Map (EU Numbering)

CH3 Domain Face (LS mutations):
   M428 -> L428: Enhanced hydrophobic packing
                  Contact: FcRn alpha chain Ile130, Leu131
                  Delta-G: ~0.8 kcal/mol improvement

   N434 -> S434: New H-bond + reduced steric clash
                  Contact: FcRn alpha chain His166
                  Delta-G: ~0.5 kcal/mol improvement

   H435:         pH sensor (not mutated)
                  Protonated at pH 6.0: salt bridge with FcRn Glu115
                  Deprotonated at pH 7.4: lost salt bridge -> release

CH2-CH3 Junction (YTE mutations, for comparison):
   M252 -> Y252: Aromatic packing with FcRn Glu130
   S254 -> T254: VdW contacts with FcRn alpha-2 domain
   T256 -> E256: pH-dependent salt bridge with FcRn His161

Key difference:
   LS = CH3 domain surface (distal from FcgammaR site)
   YTE = CH2-CH3 junction (proximal to FcgammaR propagation path)
   => LS preserves effector function better than YTE`,
    },
    {
      type: 'table',
      title: '5. LS-Enhanced Molecules in Development',
      headers: ['Molecule', 'Target', 'Application', 'Sponsor', 'Rationale for LS', 'Stage'],
      rows: [
        ['Sotrovimab (Xevudy)', 'SARS-CoV-2 Spike', 'COVID-19 treatment', 'GSK/Vir', 'Extended half-life for single-dose efficacy', 'Approved (EUA 2021)'],
        ['VIR-7831 variants', 'Various viral targets', 'Antiviral prophylaxis', 'Vir Biotechnology', 'Single-dose passive immunisation', 'Preclinical-Phase I'],
        ['XmAb bispecifics', 'Various oncology targets', 'Bispecific mAbs', 'Xencor', 'Extended dosing intervals', 'Phase I-II'],
        ['MEDI8897 comparison', 'RSV F protein', 'RSV prophylaxis (competitor)', 'AstraZeneca (YTE)', 'Industry comparison with LS approach', 'Approved (YTE version)'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '6. Sotrovimab — LS in Anti-Infective Applications',
      color: 'amber',
      content:
        'Sotrovimab (VIR-7831/GSK4182136) is a notable example of LS technology in an anti-infective application. Developed by Vir Biotechnology and GSK for COVID-19 treatment, sotrovimab is an anti-SARS-CoV-2 spike protein mAb incorporating the LS mutations (M428L/N434S) for half-life extension. The rationale was to achieve sustained antiviral antibody levels from a single intravenous infusion. Sotrovimab also incorporates the LS mutations in conjunction with additional modifications for enhanced effector function, demonstrating the compatibility of LS with other Fc engineering approaches. In the Phase III COMET-ICE trial, a single dose of sotrovimab reduced the risk of hospitalisation or death by 79% in high-risk patients with mild-to-moderate COVID-19. The extended half-life from LS contributed to sustained neutralising activity over several weeks, though the rapid evolution of SARS-CoV-2 variants ultimately limited the clinical utility of all early anti-spike mAbs. The sotrovimab experience validated LS technology in a real-world clinical setting with rapid regulatory review.',
    },
    {
      type: 'bullets',
      title: '7. Advantages of LS Over YTE',
      items: [
        'Better preservation of ADCC: LS mutations on CH3 surface are spatially distant from FcgammaR binding site. Published data show wild-type-level ADCC retained with LS vs 2-3-fold reduction with YTE.',
        'Better preservation of CDC: C1q binding and complement fixation are unaffected by LS. YTE also has minimal CDC impact, so this advantage is marginal.',
        'Fewer mutations: LS requires only 2 mutations (M428L/N434S) vs 3 for YTE (M252Y/S254T/T256E). Fewer mutations means less immunogenicity risk from non-germline residues.',
        'Compatibility with ADCC enhancement: LS can be combined with afucosylation or DE mutations for dual ADCC-enhancement + half-life extension without the concern of YTE-mediated ADCC attenuation.',
        'IP differentiation: LS is Xencor IP (Xtend technology); YTE is MedImmune/AstraZeneca IP. The choice may be driven by licensing access.',
      ],
    },
    {
      type: 'bullets',
      title: '8. Advantages of YTE Over LS',
      items: [
        'Greater half-life extension: YTE achieves ~50-70 day half-life vs ~35-40 days for LS. For applications requiring maximal duration (e.g., single-dose RSV prophylaxis for infants), YTE is preferred.',
        'Greater FcRn affinity enhancement: ~10x vs ~5-8x at pH 6.0. Stronger FcRn binding provides more robust competition against endogenous IgG for FcRn binding sites.',
        'Better pH selectivity ratio: YTE achieves higher discrimination between pH 6.0 binding and pH 7.4 release due to the T256E pH-dependent salt bridge.',
        'Clinical precedent: Ravulizumab (YTE-based) has longer post-approval experience than LS-based molecules in chronic disease settings.',
        'More predictable PK modelling: Extensive YTE PK data from multiple clinical programmes enables more reliable half-life predictions for new YTE molecules.',
      ],
    },
    {
      type: 'card',
      title: '9. CMC Considerations Specific to LS',
      color: 'purple',
      content:
        'The CMC characterisation of LS-enhanced molecules follows the general framework for FcRn-engineered antibodies with some specific considerations. The N434S mutation replaces asparagine with serine at a position adjacent to H435, which is part of the Protein A binding site. While Protein A binding is generally preserved with LS, some LS constructs show a modest (1.5-2-fold) reduction in Protein A affinity. This can affect dynamic binding capacity on Protein A columns and may require optimisation of the capture step (e.g., increased residence time, lower flow rate, or alternative Protein A resins with higher binding capacity). The N434S mutation also eliminates a potential asparagine deamidation site (Asn434 can deamidate to Asp/isoAsp in WT IgG1). This is actually a CMC advantage: LS molecules have one fewer deamidation hotspot, potentially improving chemical stability at the FcRn binding interface. Forced degradation studies should confirm this reduced deamidation propensity. Thermal stability should be assessed by DSC, monitoring the CH3 Tm specifically, as the LS mutations are on the CH3 domain surface.',
    },
    {
      type: 'callout',
      title: '10. Combination Strategies with LS',
      variant: 'info',
      content:
        'LS is designed for broad compatibility with other Fc modifications. Validated combinations include: LS + afucosylation (enhanced ADCC + extended half-life; ideal for oncology), LS + LALA-PG (silenced effector function + extended half-life; ideal for anti-inflammatory/T-cell-engaging mAbs), LS + knob-in-hole (bispecific + extended half-life), LS + S228P (IgG4 hinge stabilisation + half-life extension, though IgG4 FcRn binding parameters differ from IgG1). Incompatible combinations: LS + N434A (conflicting mutations at position 434) and LS + H435A (H435A ablates FcRn binding entirely). When combining LS with effector-modifying mutations, the overall impact must be empirically confirmed — additive or synergistic effects on biophysical properties, FcRn binding, FcgammaR binding, and stability should be characterised in the combination context, not extrapolated from individual mutation data.',
    },
    {
      type: 'callout',
      title: '11. Regulatory Filing Strategy for Half-Life Extended Molecules',
      variant: 'warning',
      content:
        'Regulatory agencies evaluate half-life extended molecules with specific attention to: (1) Justification that the extended half-life does not create new safety risks (e.g., prolonged exposure to off-target toxicity, delayed clearance of ADA-drug complexes, extended duration of adverse events). The benefit-risk assessment should explicitly address how the longer half-life affects the time course of adverse events and the ability to manage them with dose interruption. (2) PK/PD modelling linking FcRn binding enhancement to predicted human PK, validated by clinical data. Population PK models should account for FcRn polymorphisms (though clinically significant FcRn polymorphisms are rare). (3) Immunogenicity: non-germline mutations in the Fc domain may generate anti-drug antibodies. The ADA assay must be able to detect anti-Fc antibodies in the presence of high drug concentrations (drug-tolerant assay formats). (4) For anti-infective applications, the extended half-life may raise questions about selection pressure on pathogen escape mutations during prolonged sub-therapeutic exposure.',
    },
  ],
  mentorQuestions: [
    'You are selecting between YTE and LS for an anti-tumour mAb where ADCC is the primary mechanism of action and you want Q4W dosing. Walk through the trade-off analysis considering efficacy, safety, manufacturing, and IP.',
    'Your LS-enhanced mAb shows a 1.8-fold reduction in Protein A dynamic binding capacity compared to the wild-type version. How would you optimise the Protein A capture step, and at what point would this reduction become commercially unacceptable?',
    'Compare the immunogenicity risk of LS (2 non-germline mutations) versus YTE (3 non-germline mutations). How would you design the ADA assay to distinguish anti-Fab from anti-Fc antibody responses in a clinical trial?',
  ],
};
