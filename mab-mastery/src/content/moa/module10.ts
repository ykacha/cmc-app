import type { ModuleContent } from '../../types/content';

export const module10: ModuleContent = {
  id: 'moa-m10',
  sectionId: 'moa',
  moduleNumber: 10,
  eyebrow: 'MOA 11',
  title: 'Bispecific CMC Challenges',
  lead: 'HC:HC pairing (KiH purity), HC:LC pairing (CrossMAb, common light chain, charged pairs), homodimer detection, potency assays, stability, and process development for bispecific antibodies.',
  tags: [
    { label: 'CMC', color: 'teal' },
    { label: 'Chain Pairing', color: 'red' },
    { label: 'Homodimer Detection', color: 'amber' },
    { label: 'Process Development', color: 'blue' },
  ],
  stats: [
    { label: 'Chain Combinations', value: 'Up to 10 species' },
    { label: 'KiH Purity', value: '>95% heterodimer' },
    { label: 'Key Method', value: 'Native MS' },
    { label: 'Potency Assays', value: 'Dual-arm required' },
  ],
  sections: [
    {
      type: 'card',
      title: '1. The Chain Pairing Problem — Overview',
      color: 'blue',
      content:
        'A bispecific antibody requires two different heavy chains (HA, HB) and, in most formats, two different light chains (LA, LB). When all four chains are co-expressed in a single host cell, random chain association produces up to 10 distinct species: 3 homodimers (HA-HA, HB-HB, and the correct HA-HB heterodimer with wrong LC pairing), 1 correct bispecific (HA-LA + HB-LB), and 6 mispaired heterodimers with incorrect LC assignments. Only 1 out of 10 random combinations is the correct bispecific product. Without engineering solutions, the expected yield of correct bispecific is only ~12.5% (1/8 after excluding homodimers, assuming equimolar expression). This creates a manufacturing efficiency problem (most product is waste) and a product quality problem (mispaired species are difficult to detect and remove). The bispecific CMC challenge is therefore twofold: (1) engineering the molecule to favour correct chain pairing, and (2) developing analytical methods capable of detecting and quantifying all mispaired species.',
    },
    {
      type: 'card',
      title: '2. HC:HC Pairing — KiH Optimisation and Alternatives',
      color: 'teal',
      content:
        'Knobs-into-holes (KiH) drives HC heterodimerisation through steric complementarity (T366W knob / T366S+L368A+Y407V hole). With the additional stabilising disulfide (S354C/Y349C), KiH typically achieves 95-98% heterodimer purity. Residual homodimers (2-5%) arise from statistical mismatch during HC folding and assembly — if a knob HC folds and associates with another knob HC before the hole HC is available, a knob-knob homodimer forms. Process optimisation strategies: (1) DNA ratio tuning — adjusting the plasmid ratio of knob:hole chains (e.g., 1:1.5 to compensate for differential expression) minimises the mismatch, (2) temperature shift during production phase (33-34 degrees C) slows protein folding and allows better pairing equilibration, (3) co-expression in a single cell (preferred) versus separate expression and in vitro assembly (less efficient). Alternative HC heterodimerisation technologies: electrostatic steering (charge pairs, e.g., K409D/D399K on opposing CH3 domains), DEKK mutations (Janssen: K409R on one chain, K370E/D399K on the other), Azymetric (Zymeworks: asymmetric CH3 mutations selected by computational design), and controlled Fab-arm exchange (cFAE, Genmab: hinge-region mutations that enable post-expression in vitro Fab-arm exchange to generate bispecifics from two parental half-antibodies).',
    },
    {
      type: 'card',
      title: '3. HC:LC Pairing — Strategies to Ensure Correct Light Chain Association',
      color: 'green',
      content:
        'HC:LC mispairing is often the more challenging problem because the CH1-CL interface is highly conserved across different antibodies, providing no inherent discrimination between correct and incorrect LC pairing. Six major solutions: (1) CrossMAb — domain crossover (CH1-CL swap) in one arm creates orthogonal HC:LC interfaces. (2) Common light chain — both arms share an identical light chain, eliminating mispairing entirely (used in emicizumab). Requires screening large libraries to find common LC that supports both binding specificities. (3) Charged pair mutations — electrostatic complementarity engineered into the CH1-CL interface (e.g., positively charged mutations on one HC-CH1 paired with negatively charged mutations on the corresponding LC-CL, and opposite charges on the other pair). Amgen DuoBody uses K-E and E-K charge pairs. (4) kappa/lambda pairing — using a kappa LC for one arm and a lambda LC for the other, enabling selective purification (KappaSelect/LambdaSelect resins). (5) Separate expression + in vitro assembly — each half-antibody (HA-LA and HB-LB) is expressed and purified separately, then assembled via controlled Fab-arm exchange (cFAE) or chemical crosslinking. (6) Orthogonal Fab — engineered VH/VL interface mutations that create specificity for the cognate LC.',
    },
    {
      type: 'table',
      title: 'Homodimer and Mispaired Species Detection — Analytical Methods',
      headers: ['Method', 'Principle', 'What It Detects', 'Resolution', 'LOD / LOQ', 'Regulatory Role'],
      rows: [
        ['Native MS (intact mass)', 'Mass measurement under native conditions', 'Heterodimer vs homodimer (mass difference)', 'Excellent — resolves 100+ Da', '~1-2% species', 'Gold standard for bsAb identity and purity'],
        ['HIC (hydrophobic interaction)', 'Hydrophobicity differences', 'Homodimers (different surface hydrophobicity)', 'Moderate — depends on format', '~2-5% species', 'Process-in-control, lot release supplement'],
        ['SEC-MALS', 'Size + absolute molar mass', 'Aggregates, fragments, homodimer/heterodimer', 'Moderate — requires mass difference >10 kDa', '~2-3% species', 'Purity, aggregate quantification'],
        ['cIEF / icIEF', 'Isoelectric point differences', 'Charge variants, mispaired species if pI differs', 'High for pI — may not resolve all species', '~1-2% for distinct pI', 'Charge variant profile, identity'],
        ['Reduced CE-SDS', 'MW of individual chains', 'Confirms correct 4-chain composition', 'Resolves HC-knob, HC-hole, LC-A, LC-B', 'N/A — qualitative identity', 'Identity and chain stoichiometry'],
        ['2D-LC (SEC x HIC or IEX x SEC)', 'Orthogonal separation', 'Complex mixtures of mispaired species', 'Very high — two-dimensional resolution', '~0.5-1%', 'Extended characterisation'],
        ['Dual-binding ELISA', 'Simultaneous binding to both targets', 'Confirms bispecificity (not homodimer detection)', 'Functional — binary yes/no', 'N/A — functional assay', 'Identity, lot release potency supplement'],
        ['SPR dual-binding (tandem injection)', 'Sequential binding kinetics', 'Bridging activity — confirms both arms functional', 'Quantitative — fraction competent for dual binding', '~5% inactive arm', 'Characterisation, comparability'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '4. Native MS — The Gold Standard for Bispecific Identity',
      color: 'amber',
      content:
        'Native mass spectrometry (native MS) has emerged as the indispensable analytical method for bispecific antibody characterisation. Under native electrospray ionisation conditions (ammonium acetate buffer, gentle desolvation), the intact bispecific heterodimer, homodimers, and any mispaired species are resolved by their distinct masses. For a KiH bispecific: the knob homodimer has mass = 2 x MW(knob-HC) + 2 x MW(LC-A), the hole homodimer has mass = 2 x MW(hole-HC) + 2 x MW(LC-B), and the heterodimer has mass = MW(knob-HC) + MW(hole-HC) + MW(LC-A) + MW(LC-B). Even with glycosylation heterogeneity broadening each peak, the mass differences between homodimers and heterodimer (typically 500-5000 Da depending on format asymmetry) are readily resolved. Native MS also detects LC mispaired species: a heterodimer with incorrect LC pairing (HA-LB + HB-LA) has the same total mass as the correct bispecific (HA-LA + HB-LB) only if LA and LB have identical masses — any mass difference (even a single amino acid substitution) enables native MS detection. This is why molecular design increasingly incorporates deliberate mass asymmetry to enhance native MS resolving power.',
    },
    {
      type: 'card',
      title: '5. Potency Assay Design for Bispecific Antibodies',
      color: 'red',
      content:
        'Bispecific potency assays must demonstrate functional activity of both binding arms, ideally in a single integrated assay. Three-tier approach: (1) Single-arm binding assays: SPR or ELISA measuring binding to Target A alone and Target B alone. These confirm that each arm retains binding activity but do not demonstrate bispecific function. Necessary but insufficient. (2) Simultaneous dual-binding (bridging) assay: SPR tandem injection (target A immobilised, bispecific binds, target B injected — binding to B confirms both arms functional) or sandwich ELISA (target A captured, bispecific added, target B detected). This confirms bispecificity. (3) Mechanism-of-action potency assay: The definitive test. For T cell engagers: T cell-dependent cellular cytotoxicity (TDCC) assay — target cells + T cells + bispecific → target cell lysis. For cofactor mimetics (emicizumab): Factor Xa generation assay. For dual checkpoint blockade: dual-reporter co-culture assay. The MoA potency assay is the primary lot-release potency test. Single-arm binding assays serve as identity/supplementary tests. The potency assay variability for bispecifics is typically higher than for conventional mAbs (CV 15-30%) due to the complexity of the multi-component functional readout.',
    },
    {
      type: 'card',
      title: '6. Stability Considerations — Asymmetric Degradation',
      color: 'purple',
      content:
        'Bispecific antibodies present unique stability challenges compared to conventional homodimeric mAbs. (1) Asymmetric thermal stability: The two different Fab arms may have different melting temperatures (Tm), meaning one arm denatures at lower temperature than the other. DSC (differential scanning calorimetry) of a bispecific typically shows 3-4 thermal transitions rather than the 2-3 seen for a homodimeric mAb (Fab-A, Fab-B, CH2, CH3 each with distinct Tm). The arm with lower Tm is the stability liability. (2) Differential aggregation propensity: One Fab arm may be more aggregation-prone, driving preferential aggregation from that arm. (3) KiH interface stability: The engineered knob-hole CH3 interface has slightly lower intrinsic stability than the wild-type CH3 homodimer, though the engineered disulfide compensates. Under stress, however, knob-hole dissociation may be a degradation pathway not seen in conventional mAbs. (4) Format-specific liabilities: scFv-containing formats (IgG-scFv, BiTE) have the scFv as the primary instability point — the non-covalent VH-VL interface can open, leading to aggregation or loss of binding. Formulation must be optimised to stabilise the weakest element of the bispecific.',
    },
    {
      type: 'card',
      title: '7. Process Development — Expression and Purification',
      color: 'blue',
      content:
        'Process development for bispecifics is fundamentally more complex than for conventional mAbs. Expression: Co-expression of 3-4 different polypeptide chains from a single host cell requires either: (a) multiple expression cassettes on a single vector, (b) separate vectors co-transfected, or (c) tandem gene constructs. Chain stoichiometry control (adjusting promoter strength, gene copy number, or codon optimisation to match expression levels) is critical — if one chain is over-expressed relative to its partner, the excess accumulates as free light chain, half-antibody, or homodimer. Purification: Protein A capture is the first step for all Fc-containing bispecifics. Additional polishing steps are needed to remove homodimers and mispaired species: HIC (hydrophobic interaction chromatography) resolves species by surface hydrophobicity, mixed-mode chromatography (e.g., Capto Adhere) provides orthogonal selectivity, and ion exchange resolves charge differences. For formats using kappa/lambda LC discrimination, KappaSelect or LambdaFabSelect affinity resins provide LC-specific purification. Process analytical technology (PAT): In-process monitoring of heterodimer purity by HIC or native MS at the Protein A eluate stage enables real-time process adjustment.',
    },
    {
      type: 'bullets',
      title: 'Controlled Fab-Arm Exchange (cFAE) — Genmab DuoBody',
      items: [
        'Principle: Two parental homodimeric IgG1 antibodies, each with a single mutation in CH3 (F405L on one parent, K409R on the other), are mixed under mild reducing conditions (2-MEA, 2-mercaptoethylamine) that selectively reduce the hinge disulfides without disrupting intrachain disulfides.',
        'Mechanism: Hinge reduction allows half-antibodies (one HC + one LC) from each parent to dissociate and reassociate. The F405L and K409R mutations create a thermodynamic preference for heterodimer formation (F405L-K409R) over homodimer re-formation (F405L-F405L or K409R-K409R).',
        'Manufacturing advantage: Each parental antibody is expressed, purified, and characterised independently using standard mAb manufacturing — the bispecific assembly is a simple mixing step followed by reduction and re-oxidation. This dramatically simplifies upstream process development.',
        'Purity: cFAE achieves >95% heterodimer purity, with residual parental homodimers typically <5%. Parental homodimers can be removed by Protein A (if one parent has altered Protein A binding) or HIC.',
        'Clinical products: Epcoritamab (CD20xCD3, approved for DLBCL) and teclistamab (BCMAxCD3, approved for myeloma) use DuoBody technology. Both demonstrate that the cFAE manufacturing process is commercially scalable.',
        'CMC requirement: The cFAE process introduces a unique in-process control (IPC) for Fab-arm exchange efficiency, typically measured by HIC or native MS at the post-exchange intermediate stage before final polishing.',
      ],
    },
    {
      type: 'callout',
      title: 'Regulatory Expectations — ICH Considerations for Bispecifics',
      variant: 'info',
      content:
        'There is no ICH guideline specifically for bispecific antibodies, but regulatory expectations are derived from ICH Q6B (specifications for biotechnological products) and ICH Q5E (comparability). Key regulatory expectations for bispecific CMC: (1) The specification must include methods that confirm bispecific identity (dual binding, native MS), not just standard mAb release tests. (2) Homodimer/mispaired species must be quantified and controlled with justified acceptance criteria. (3) The potency assay must reflect the bispecific mechanism of action — single-arm binding is insufficient. (4) Comparability studies for process changes must include bispecific-specific attributes (chain pairing ratio, dual-arm binding, homodimer level). (5) Reference standard qualification must demonstrate functional activity of both arms. The FDA has issued specific guidance on bispecific development (2021), emphasising the need for analytical methods capable of detecting product-related variants unique to the bispecific format.',
    },
    {
      type: 'callout',
      title: 'Scale-Up Pitfall — Chain Ratio Drift',
      variant: 'danger',
      content:
        'One of the most common scale-up challenges for bispecific antibodies is "chain ratio drift" — the relative expression levels of the 3-4 polypeptide chains can change unpredictably when transitioning from bench scale (2L bioreactor) to manufacturing scale (2000L bioreactor). This is because promoter activity, mRNA stability, translation efficiency, and protein folding kinetics are all sensitive to cell culture conditions (DO, pH, temperature, media composition) that subtly differ at different scales. Chain ratio drift manifests as changes in homodimer/heterodimer ratio, free light chain levels, or altered glycosylation profiles. The consequence: a process that achieves 97% heterodimer at 2L may drop to 90% at 2000L, requiring additional purification to achieve the specification. Mitigation strategies include: stable cell line development with integrated gene copies (reducing expression variability), process parameter screening via Design of Experiments (DoE) at pilot scale, and in-process monitoring of chain ratio by HIC at the harvest stage.',
    },
  ],
  mentorQuestions: [
    'If native MS analysis of a KiH-CrossMAb bispecific reveals a 3% species at a mass consistent with a HC heterodimer with mispaired light chains (HA-LB + HB-LA), how would you confirm this assignment and what corrective action would you take in manufacturing?',
    'For a cFAE-produced bispecific (DuoBody technology), how would you design the in-process control strategy to ensure Fab-arm exchange efficiency at manufacturing scale, and what would trigger a rejection decision?',
    'Compare the analytical characterisation burden for a bispecific antibody versus a conventional mAb in the context of a CTD Module 3.2.S.3 submission — what additional studies and methods are required, and how does this affect development timelines?',
  ],
};
