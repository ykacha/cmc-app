import type { ModuleContent } from '../../types/content';

export const module9: ModuleContent = {
  id: 'engineering-m9',
  sectionId: 'engineering',
  moduleNumber: 9,
  eyebrow: 'ENGINEERING 10',
  title: 'Combination Strategies and Master Comparison',
  lead: 'Rational Fc engineering increasingly combines multiple mutation sets to achieve complex functional profiles: enhanced ADCC with extended half-life, silenced effector function with prolonged exposure, or heterodimerisation with tailored effector activity. Understanding which combinations are compatible — and which are antagonistic — is essential for modern mAb design.',
  tags: [
    { label: 'Combination Engineering', color: 'purple' },
    { label: 'Compatibility Matrix', color: 'blue' },
    { label: 'Master Reference', color: 'green' },
    { label: 'Platform Design', color: 'amber' },
  ],
  stats: [
    { label: 'Compatible Combos', value: '8+' },
    { label: 'Incompatible Combos', value: '5+' },
    { label: 'Total Mutations Covered', value: '20+' },
    { label: 'Approved Combos', value: '3+' },
  ],
  sections: [
    {
      type: 'card',
      title: '1. Principles of Fc Mutation Combinability',
      color: 'blue',
      content:
        'The combinability of Fc mutations depends on three factors: (1) Spatial independence — mutations at non-overlapping structural sites can generally be combined without interference. Hinge mutations (L234A/L235A), CH2 surface mutations (S239D/I332E), CH2-CH3 junction mutations (YTE), and CH3 surface mutations (LS) occupy distinct regions of the Fc domain and are typically compatible. (2) Functional coherence — combinations must serve a coherent therapeutic purpose. Combining ADCC-enhancing mutations (DE) with ADCC-silencing mutations (LALA) would be contradictory. However, combining effector silencing (LALA-PG) with half-life extension (YTE) makes clear sense for long-acting blocking antibodies. (3) Biophysical tolerance — each additional mutation incrementally alters the Fc domain stability, charge profile, and surface properties. While individual mutations typically have negligible biophysical impact, stacking 5-8 mutations can cumulatively affect thermal stability, aggregation propensity, and expression levels. Every combination must be empirically validated for biophysical acceptability. The general rule is that combinations of up to 5-6 point mutations in the Fc are well-tolerated; beyond this, careful assessment is required.',
    },
    {
      type: 'table',
      title: '2. Compatible Fc Engineering Combinations',
      headers: ['Combination', 'Mutations', 'Functional Profile', 'Application', 'Clinical Precedent'],
      rows: [
        ['LALA-PG + YTE', 'L234A/L235A/P329G + M252Y/S254T/T256E', 'Silent effector + extended half-life', 'Long-acting blocking mAbs (anti-PD-1, anti-IL-X)', 'Nirsevimab-type (YTE + silenced Fc)'],
        ['LALA-PG + LS', 'L234A/L235A/P329G + M428L/N434S', 'Silent effector + extended half-life', 'Same as above; Xencor IP route', 'Preclinical validated'],
        ['S228P + YTE', 'S228P + M252Y/S254T/T256E', 'IgG4 stabilised + extended half-life', 'Long-acting IgG4 blocking mAbs', 'Preclinical/Phase I'],
        ['S228P + LS', 'S228P + M428L/N434S', 'IgG4 stabilised + extended half-life', 'Same as above; Xencor IP route', 'Preclinical validated'],
        ['DE + afucosylation', 'S239D/I332E + FUT8 KO', 'Maximal ADCC enhancement', 'Oncology (anti-tumour mAbs)', 'Preclinical (caution: may over-enhance)'],
        ['LS + afucosylation', 'M428L/N434S + FUT8 KO', 'Enhanced ADCC + extended half-life', 'Oncology with extended dosing', 'Sotrovimab-related (LS + glyco consideration)'],
        ['KiH + LALA-PG', 'T366W/T366S:L368A:Y407V + L234A/L235A/P329G', 'Bispecific + silenced effector', 'T-cell bispecifics (CD3 x TAA)', 'Glofitamab, cibisatamab'],
        ['KiH + DE', 'T366W/T366S:L368A:Y407V + S239D/I332E', 'Bispecific + enhanced ADCC', 'Bispecific oncology with ADCC', 'Xencor bispecific programmes'],
        ['LALA + charge pairs', 'L234A/L235A + K409D:D399K (or similar)', 'Bispecific + silenced effector', 'Checkpoint bispecifics', 'AstraZeneca bispecific platform'],
      ],
      sortable: true,
    },
    {
      type: 'table',
      title: '3. Incompatible or Antagonistic Combinations',
      headers: ['Combination', 'Mutations', 'Problem', 'Consequence'],
      rows: [
        ['DE + LALA', 'S239D/I332E + L234A/L235A', 'Opposing objectives (enhance vs silence FcgammaR)', 'Partial silencing with residual enhancement; unclear profile'],
        ['GASDALIE + LALA-PG', 'G236A/S239D/A330L/I332E + L234A/L235A/P329G', 'Contradictory: all four GASDALIE sites near LALA-PG sites', 'Mutations at overlapping or proximal positions create unpredictable effects'],
        ['YTE + LS', 'M252Y/S254T/T256E + M428L/N434S', 'Both target FcRn interface; potentially redundant or interfering', 'Combined effect is not additive; may destabilise CH2-CH3 interface'],
        ['N297A + afucosylation', 'N297A + FUT8 KO', 'N297A removes the glycan entirely; nothing to afucosylate', 'Pointless: aglycosylation eliminates the substrate for glycoengineering'],
        ['S228P + LALA', 'S228P (IgG4) + L234A/L235A (IgG1)', 'S228P is IgG4-specific; LALA is IgG1-specific', 'Subclass mismatch: cannot use IgG1 mutations in IgG4 context (positions 234/235 differ)'],
        ['Afucosylation + N297Q', 'FUT8 KO + N297Q', 'N297Q removes glycosylation site; no glycan to modify', 'Aglycosylation supersedes glycoengineering'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '4. LALA-PG + YTE — The Long-Acting Silent Platform',
      color: 'green',
      content:
        'The combination of LALA-PG (L234A/L235A/P329G) with YTE (M252Y/S254T/T256E) creates a 6-mutation Fc that is completely effector-silent with approximately 50-day half-life. This is the ideal platform for long-acting blocking antibodies in chronic diseases where: (a) the target is on immune cells (requiring no effector function to avoid cell depletion), and (b) the disease requires lifelong treatment (benefiting from extended dosing intervals). The LALA-PG mutations (positions 234, 235, 329) are in the lower hinge and CH2 FG loop, while the YTE mutations (positions 252, 254, 256) are at the CH2-CH3 interface. These regions are spatially separated by approximately 25-30 angstroms, and crystallographic analysis confirms no structural interference. The combined biophysical profile shows CH2 Tm within 1-2 degrees Celsius of wild-type, preserved Protein A binding, and normal SEC profiles. A LALA-PG + YTE anti-PD-1 or anti-IL-4Ralpha could theoretically enable Q12W or even Q16W dosing — transformative for patient convenience and adherence.',
    },
    {
      type: 'card',
      title: '5. KiH + LALA-PG — The Bispecific Silent Platform',
      color: 'purple',
      content:
        'Knob-in-hole (KiH) heterodimerisation combined with LALA-PG effector silencing is the dominant platform for T-cell-engaging bispecific antibodies (TCBs). KiH (T366W on the "knob" chain; T366S/L368A/Y407V on the "hole" chain) forces correct heavy chain pairing in the CH3 domain. LALA-PG in both CH2 domains ensures complete effector silencing, preventing FcgammaR-mediated T-cell depletion or non-specific activation. The Roche/Genentech CrossMAb platform uses this combination for multiple approved and pipeline bispecifics: glofitamab (Columvi, anti-CD20 x CD3), mosunetuzumab (Lunsumio, anti-CD20 x CD3), and cibisatamab (anti-CEA x CD3). Key CMC considerations for the KiH + LALA-PG combination: (a) the asymmetric Fc (different CH3 mutations on each chain) creates a unique charge profile that can be exploited for analytical separation of homodimer impurities by hydrophobic interaction chromatography (HIC) or ion exchange chromatography (IEX); (b) mass spectrometry must confirm correct chain pairing and the presence of all 8+ Fc mutations; (c) bioassay design must confirm both target binding and the absence of Fc-mediated effector function.',
    },
    {
      type: 'table',
      title: '6. Master Comparison — All Fc Engineering Mutations',
      headers: ['Mutation Set', 'Positions (EU)', 'Effect on FcgammaR', 'Effect on C1q/CDC', 'Effect on FcRn/Half-Life', 'Primary Application'],
      rows: [
        ['LALA', 'L234A/L235A', 'Silenced (>99%)', 'Reduced (10-40x) but residual', 'Unchanged', 'First-generation effector silencing'],
        ['LALA-PG', 'L234A/L235A/P329G', 'Silenced (>99.9%)', 'Silenced (undetectable)', 'Unchanged', 'Complete effector silencing'],
        ['GASDALIE', 'G236A/S239D/A330L/I332E', 'Enhanced (~100x FcgammaRIIIa)', 'Modestly enhanced (~2-3x)', 'Unchanged', 'Maximal ADCC enhancement'],
        ['DE', 'S239D/I332E', 'Enhanced (~40x FcgammaRIIIa)', 'Minimal change', 'Unchanged', 'Moderate ADCC enhancement'],
        ['S228P', 'S228P (IgG4)', 'N/A (IgG4 natural low)', 'N/A (IgG4 no CDC)', 'Unchanged', 'IgG4 hinge stabilisation'],
        ['YTE', 'M252Y/S254T/T256E', 'Modestly reduced ADCC', 'Unchanged', '~50-70 day half-life', 'Half-life extension (maximal)'],
        ['LS', 'M428L/N434S', 'Minimal change', 'Unchanged', '~35-40 day half-life', 'Half-life extension (moderate)'],
        ['Afucosylation', 'Glycan engineering', 'Enhanced (~50x FcgammaRIIIa only)', 'Unchanged', 'Unchanged', 'Selective ADCC enhancement'],
        ['N297A/Q', 'N297A or N297Q', 'Silenced (aglycosylated)', 'Silenced', 'Unchanged', 'Aglycosylation-based silencing'],
        ['KiH', 'T366W + T366S/L368A/Y407V', 'Unchanged per chain', 'Unchanged', 'Unchanged', 'Bispecific heterodimerisation'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: '7. The Over-Enhancement Risk',
      variant: 'danger',
      content:
        'Combining multiple ADCC-enhancing strategies (e.g., DE + afucosylation, or GASDALIE + afucosylation) can create molecules with >200-fold FcgammaRIIIa enhancement. While this provides maximal ADCC in vitro, it raises significant safety concerns in vivo. Over-enhanced effector function can cause: (a) severe cytokine release syndrome (CRS) from excessive immune cell activation, particularly at first infusion; (b) on-target, off-tumour toxicity if the target antigen is expressed at low levels on normal tissues; (c) rapid target cell depletion leading to tumour lysis syndrome; (d) paradoxical efficacy loss due to excessive NK cell activation and exhaustion (activation-induced cell death). The therapeutic window for ADCC-enhanced mAbs is narrower than for standard mAbs, and over-enhancement narrows it further. Most clinical programmes that combine ADCC-enhancing strategies use conservative starting doses (10-100x lower than typical mAb Phase I doses) with mandatory cytokine monitoring and step-dose escalation protocols.',
    },
    {
      type: 'card',
      title: '8. IgG4-S228P + YTE — Long-Acting Checkpoint Blockade',
      color: 'amber',
      content:
        'For next-generation checkpoint inhibitors (anti-PD-1, anti-PD-L1, anti-LAG-3), combining IgG4-S228P with YTE (or LS) half-life extension mutations is an attractive strategy for achieving Q8W-Q12W dosing. Current approved anti-PD-1 mAbs (pembrolizumab, nivolumab) require Q3W or Q6W administration. Extending to Q8W-Q12W would significantly reduce patient treatment burden and healthcare resource utilisation. The technical feasibility is established: S228P (position 228 in the hinge) and YTE (positions 252/254/256 at the CH2-CH3 interface) are spatially remote and structurally non-interfering. The IgG4 FcRn binding interface is structurally homologous to IgG1 at the key YTE contact positions, so the YTE enhancement transfers to the IgG4 backbone. Preclinical data in cynomolgus monkeys confirm 2-3-fold half-life extension for IgG4-S228P-YTE constructs. The primary risk is immunogenicity: the combination of S228P + YTE introduces 4 non-germline amino acids in the Fc, which may incrementally increase the risk of anti-drug antibodies. Clinical validation is ongoing in multiple Phase I programmes.',
    },
    {
      type: 'bullets',
      title: '9. CMC Strategy for Multi-Mutation Fc Platforms',
      items: [
        'Sequence confirmation: Peptide mapping must confirm every mutation position. For 6+ mutation combinations, this requires high sequence coverage (>98%) with specific identification of each mutated peptide.',
        'Biophysical comparability: Compare the multi-mutant Fc to wild-type using DSC/DSF (thermal stability), SEC (aggregation), DLS (particle size), icIEF (charge variants), and HIC (hydrophobicity). Establish that the combination does not introduce new liabilities.',
        'Effector function panel: Full FcgammaR SPR binding + cell-based ADCC/ADCP/CDC + FcRn binding at pH 6.0 and 7.4. Verify that each mutation component delivers its intended effect in the combination context.',
        'Forced degradation: Mutations may alter degradation pathways. Conduct accelerated stability (40C/75% RH), thermal stress, oxidative stress, light stress, freeze-thaw, and agitation stress studies on the multi-mutant. Compare degradation products to wild-type.',
        'Protein A binding: Confirm that the cumulative mutations do not reduce Protein A dynamic binding capacity below manufacturing requirements.',
        'Expression/productivity: Multi-mutant Fc domains may have reduced expression in CHO cells due to altered protein folding. Verify that the combination does not reduce titre below economically viable levels.',
        'Potency assay: Design the potency assay to reflect the dominant mechanism of action. For LALA-PG + YTE, potency is target binding (not effector function). For DE + afucosylation, potency is ADCC. The reference standard must be manufactured with the same Fc combination.',
        'Immunogenicity: Risk assessment should consider the total non-germline amino acid burden. Use in silico T-cell epitope prediction tools (EpiVax, NetMHCpan) to evaluate whether mutation clusters create new immunogenic peptides.',
      ],
    },
    {
      type: 'table',
      title: '10. Decision Guide — Selecting Fc Engineering for Your Programme',
      headers: ['Therapeutic Goal', 'Recommended Fc Strategy', 'Mutations', 'Key Consideration'],
      rows: [
        ['Blocking/neutralising (no effector function)', 'IgG4-S228P or IgG1-LALA-PG', 'S228P or L234A/L235A/P329G', 'IgG4 simpler but residual effector; LALA-PG more complete'],
        ['Blocking + extended half-life', 'IgG4-S228P-YTE or IgG1-LALA-PG-YTE/LS', 'S228P+YTE or LALA-PG+YTE/LS', 'YTE for maximal extension; LS for ADCC preservation (if relevant)'],
        ['ADCC-dependent tumour killing', 'IgG1-afucosylated or IgG1-DE', 'FUT8 KO or S239D/I332E', 'Afucosylation: selective FcgammaRIIIa; DE: broader FcgammaR enhancement'],
        ['Maximal ADCC + extended dosing', 'IgG1-afucosylated + LS', 'FUT8 KO + M428L/N434S', 'LS preserves ADCC better than YTE; monitor for over-enhancement'],
        ['T-cell bispecific (CD3-engaging)', 'KiH + LALA-PG', 'T366W + T366S/L368A/Y407V + L234A/L235A/P329G', 'Bispecific format requires both heterodimerisation and Fc silencing'],
        ['Bispecific with ADCC', 'KiH + DE or KiH + afucosylation', 'KiH + S239D/I332E or KiH + FUT8 KO', 'Asymmetric Fc may affect enhancement level'],
        ['CDC-enhanced (complement-dependent)', 'IgG1 WT or E345R/E430G (hexamer-enhancing)', 'Wild-type + hexamerisation mutations', 'Hexamerisation enhances CDC; specialist application'],
        ['IgG4 blocking (standard)', 'IgG4-S228P', 'S228P only', 'Simplest Fc for blocking mAbs; mandatory for all IgG4'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: '11. Future Directions — Programmable Fc Engineering',
      variant: 'info',
      content:
        'The field is evolving toward programmable Fc platforms where effector function, half-life, and heterodimerisation can be independently tuned from standardised mutation menus. Emerging concepts include: (a) Conditional Fc activation — Fc domains that are effector-silent in circulation but become activated in specific tissue microenvironments (e.g., protease-cleavable masking domains that expose FcgammaR binding sites in the tumour); (b) Switch-Fc — pH-sensitive or small molecule-controlled Fc domains that can be toggled between effector-active and effector-silent states; (c) Computational Fc design — machine learning-guided combinatorial optimisation of Fc mutations for desired multi-parameter profiles (simultaneous optimisation of FcgammaR binding, C1q binding, FcRn binding, thermal stability, and expressibility); (d) Glycan-Fc co-engineering — combining glycan modifications (afucosylation, galactosylation, sialylation) with Fc point mutations for nuanced effector function tuning. These advances will further expand the Fc engineering toolkit, but will also increase CMC complexity and regulatory scrutiny of the characterisation evidence package.',
    },
    {
      type: 'callout',
      title: '12. Regulatory Perspective on Combination Fc Engineering',
      variant: 'warning',
      content:
        'Regulatory agencies evaluate multi-mutation Fc engineering with increasing scrutiny as the number of mutations increases. Each mutation must be individually justified in the BLA/MAA. The combined effect must be characterised, not just predicted from individual mutation data. Specific regulatory expectations include: (1) A clear rationale for why the specific combination is necessary (e.g., why LALA-PG + YTE rather than LALA-PG alone or YTE alone); (2) In vitro characterisation demonstrating that each mutation contributes its intended effect in the combination context; (3) PK/PD modelling showing the predicted clinical benefit of the combination; (4) Non-clinical toxicology in a relevant species (usually cynomolgus) with the final combination molecule (not with individual mutation variants); (5) For novel combinations without clinical precedent, regulators may request additional safety pharmacology studies addressing potential immune-related adverse events. The FDA has informally indicated that combinations of >6 Fc mutations receive additional review scrutiny and may trigger advisory committee discussion.',
    },
  ],
  mentorQuestions: [
    'You are designing the Fc for a bispecific antibody that engages CD3 on T cells and a tumour antigen, and you want Q8W dosing in a chronic oncology setting. Walk through your Fc engineering decision process, considering heterodimerisation, effector function, and half-life extension. Justify each component of your final Fc design.',
    'A programme team proposes combining GASDALIE mutations with afucosylation to achieve maximal ADCC for a difficult-to-treat tumour. As the CMC lead, what concerns would you raise about this combination, and how would you design the non-clinical pharmacology programme to evaluate the therapeutic window?',
    'Compare the regulatory filing complexity of a standard IgG1 mAb (no Fc engineering) versus a KiH + LALA-PG + YTE trispecific antibody. What additional CMC characterisation studies are required for the engineered molecule, and how would you structure CTD Module 3.2.S.3 (Characterisation) to address them?',
  ],
};
