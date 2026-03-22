import type { ModuleContent } from '../../types/content';

export const module5: ModuleContent = {
  id: 'moa-m5',
  sectionId: 'moa',
  moduleNumber: 5,
  eyebrow: 'MOA 06',
  title: 'ADC Biology — Antibody-Drug Conjugates',
  lead: 'ADC components, DAR distribution, linker chemistry, payload mechanisms, the bystander effect, and CMC challenges for this rapidly expanding modality.',
  tags: [
    { label: 'ADC', color: 'red' },
    { label: 'Linker Chemistry', color: 'amber' },
    { label: 'DAR', color: 'teal' },
    { label: 'Payloads', color: 'purple' },
  ],
  stats: [
    { label: 'Approved ADCs', value: '14+' },
    { label: 'Target DAR', value: '2–8 (format-dependent)' },
    { label: 'Payload Potency', value: 'pM – nM IC50' },
    { label: 'Linker Types', value: 'Cleavable / Non-Cleavable' },
  ],
  sections: [
    {
      type: 'card',
      title: '1. ADC Architecture — Three-Component Design',
      color: 'blue',
      content:
        'An antibody-drug conjugate (ADC) consists of three functional components: (1) the antibody, which provides target specificity, pharmacokinetic properties (FcRn-mediated recycling, ~21-day half-life), and potentially Fc effector functions; (2) the linker, which covalently attaches the payload to the antibody and must balance systemic stability (minimising off-target toxicity from premature release) with efficient intracellular release (maximising on-target payload delivery); and (3) the cytotoxic payload (also called warhead), a small-molecule drug that is too toxic for systemic administration as a free agent (typical IC50 in the picomolar to low nanomolar range). The drug-to-antibody ratio (DAR) — the average number of payload molecules conjugated per antibody — is a critical quality attribute that influences efficacy (higher DAR = more drug delivered per internalisation event), pharmacokinetics (high DAR species are cleared faster due to increased hydrophobicity), and tolerability (excess DAR increases off-target toxicity). The therapeutic index of an ADC is fundamentally determined by the balance between these three components.',
    },
    {
      type: 'card',
      title: '2. Conjugation Chemistry — Stochastic vs Site-Specific',
      color: 'teal',
      content:
        'Stochastic conjugation attaches payloads to naturally occurring reactive amino acid residues. Lysine conjugation (T-DM1/Kadcyla): amine-reactive NHS esters or carbodiimide chemistry target ~40 surface-accessible lysines on IgG1, producing a heterogeneous mixture with DAR 0-8 (average ~3.5) and approximately 10^6 possible positional isomers. This heterogeneity creates analytical challenges: each DAR species has different pharmacokinetics, potency, and safety profiles. Cysteine conjugation (brentuximab vedotin, enfortumab vedotin): partial reduction of the four interchain disulfide bonds exposes 8 cysteine thiols for maleimide conjugation. Controlled reduction typically yields a mixture of DAR 0, 2, 4, 6, and 8 species (average DAR ~4). Site-specific conjugation resolves the heterogeneity problem: engineered cysteines (ThioMab, DAR 2), non-natural amino acids (pAMF for click chemistry), enzymatic conjugation (transglutaminase at Q295 after N297Q mutation, sortase), or glycan-based conjugation (oxidised glycan aldehyde + hydrazide). Site-specific ADCs show improved therapeutic indices in preclinical models due to homogeneous DAR and defined conjugation sites.',
    },
    {
      type: 'table',
      title: 'Linker Types and Cleavage Mechanisms',
      headers: ['Linker Class', 'Specific Linker', 'Cleavage Trigger', 'Released Species', 'Example ADC', 'Key CMC Consideration'],
      rows: [
        ['Cleavable — Protease', 'Val-Cit (mc-vc-PABC)', 'Cathepsin B (lysosomal)', 'Free payload', 'Brentuximab vedotin', 'Assess plasma stability vs cathepsin cleavage rate'],
        ['Cleavable — Protease', 'GGFG tetrapeptide', 'Lysosomal proteases', 'DXd (membrane-permeable)', 'Trastuzumab deruxtecan', 'Bystander effect — validate in co-culture'],
        ['Cleavable — Disulfide', 'SPDB (hindered disulfide)', 'Intracellular GSH (1–10 mM)', 'Thiol-payload', 'Mirvetuximab soravtansine', 'Stability in plasma (GSH ~5 microM) vs cytoplasm (GSH ~10 mM)'],
        ['Cleavable — Acid-labile', 'Hydrazone', 'Endosomal/lysosomal pH <5.5', 'Free payload', 'Gemtuzumab ozogamicin (v1)', 'pH-dependent stability profile — leaky in circulation'],
        ['Non-cleavable', 'SMCC (thioether)', 'Requires full antibody proteolysis', 'Lys-MCC-DM1 (charged, impermeable)', 'T-DM1 (ado-trastuzumab emtansine)', 'No bystander — charged metabolite trapped in cell'],
        ['Non-cleavable', 'mc (maleimidocaproyl)', 'Full proteolysis', 'Cys-mc-payload', 'Various preclinical', 'Maleimide ring stability — succinimide hydrolysis'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '3. Payload Classes — Mechanisms of Cytotoxicity',
      color: 'red',
      content:
        'ADC payloads are selected for extreme potency (IC50 typically 10-12 to 10-9 M) because only a fraction of the administered ADC reaches the tumour and only a subset of those molecules are internalised and processed. Major payload classes: (1) Auristatins (MMAE, MMAF) — tubulin polymerisation inhibitors that bind the vinca domain of beta-tubulin, arresting cells in G2/M. MMAE (vedotin) is membrane-permeable and shows bystander killing; MMAF is charged (C-terminal phenylalanine) and membrane-impermeable. (2) Maytansinoids (DM1, DM4) — also tubulin inhibitors binding the vinca site, with IC50 ~10-11 M. DM1 is used with non-cleavable SMCC linker (T-DM1) or cleavable SPDB linker. (3) Camptothecin analogues (SN-38, DXd/exatecan derivative) — topoisomerase I inhibitors that trap the covalent Top1-DNA complex, generating lethal double-strand breaks during replication. DXd (deruxtecan) is 10-fold more potent than SN-38 and membrane-permeable. (4) Pyrrolobenzodiazepine (PBD) dimers — DNA minor groove crosslinkers with sub-picomolar potency. (5) Calicheamicin — DNA double-strand break inducer used in gemtuzumab ozogamicin and inotuzumab ozogamicin.',
    },
    {
      type: 'table',
      title: 'Approved ADCs — Comprehensive Overview',
      headers: ['ADC', 'Target', 'Payload', 'Linker', 'DAR', 'Indication', 'Year'],
      rows: [
        ['Gemtuzumab ozogamicin', 'CD33', 'Calicheamicin', 'Acid-labile hydrazone', '~2-3', 'AML', '2000/2017'],
        ['Brentuximab vedotin', 'CD30', 'MMAE', 'Cleavable mc-vc-PABC', '~4', 'HL, ALCL', '2011'],
        ['Ado-trastuzumab emtansine', 'HER2', 'DM1', 'Non-cleavable SMCC', '~3.5', 'HER2+ breast', '2013'],
        ['Inotuzumab ozogamicin', 'CD22', 'Calicheamicin', 'Acid-labile hydrazone', '~6', 'ALL', '2017'],
        ['Polatuzumab vedotin', 'CD79b', 'MMAE', 'Cleavable mc-vc-PABC', '~3.5', 'DLBCL', '2019'],
        ['Enfortumab vedotin', 'Nectin-4', 'MMAE', 'Cleavable mc-vc-PABC', '~3.8', 'Urothelial', '2019'],
        ['Trastuzumab deruxtecan', 'HER2', 'DXd', 'Cleavable GGFG', '~8', 'HER2+ breast, NSCLC, gastric', '2019'],
        ['Sacituzumab govitecan', 'TROP-2', 'SN-38', 'Cleavable CL2A (pH)', '~7.6', 'TNBC, urothelial', '2020'],
        ['Belantamab mafodotin', 'BCMA', 'MMAF', 'Non-cleavable mc', '~4', 'Myeloma', '2020'],
        ['Loncastuximab tesirine', 'CD19', 'PBD dimer (SG3199)', 'Cleavable Val-Ala', '~2.3', 'DLBCL', '2021'],
        ['Tisotumab vedotin', 'TF (CD142)', 'MMAE', 'Cleavable mc-vc-PABC', '~4', 'Cervical', '2021'],
        ['Mirvetuximab soravtansine', 'FRalpha', 'DM4', 'Cleavable SPDB', '~3.5', 'Ovarian', '2022'],
        ['Trastuzumab duocarmazine', 'HER2', 'Duocarmycin', 'Cleavable vc-seco-DUBA', '~2.8', 'HER2+ breast', '2023'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '4. DAR Distribution — Impact on PK and Efficacy',
      color: 'amber',
      content:
        'The drug-to-antibody ratio distribution is one of the most critical quality attributes for ADCs. Stochastic cysteine conjugation produces even-numbered DAR species (0, 2, 4, 6, 8) following a quasi-binomial distribution centred on the target DAR. The contribution of each species differs: DAR 0 (unconjugated antibody) is therapeutically inert but competes with conjugated species for target binding — it is a direct potency dilutant. DAR 2 species have the longest half-life and best tolerability but deliver less drug per binding event. DAR 4 represents the optimal balance of efficacy and PK for most cysteine-conjugated ADCs. DAR 6 and DAR 8 species are the most potent in vitro but are cleared rapidly in vivo (t½ reduced by 50-70%) due to increased hydrophobicity driving hepatic uptake and FcRn binding disruption. The overall ADR is reported as a weighted average, but the distribution matters: two ADC lots with the same average DAR of 4 can have very different efficacy and safety profiles if their DAR distributions differ (e.g., 100% DAR 4 vs a mixture of 25% DAR 2, 50% DAR 4, 25% DAR 6).',
    },
    {
      type: 'card',
      title: '5. The Bystander Effect',
      color: 'purple',
      content:
        'The bystander effect is the ability of an ADC to kill antigen-negative cells in the immediate vicinity of antigen-positive cells. This occurs when the released payload is membrane-permeable: after intracellular linker cleavage and payload release inside the target cell, the free drug diffuses across the cell membrane into the extracellular space and enters neighbouring cells regardless of their antigen expression. The bystander effect is therapeutically critical for tumours with heterogeneous antigen expression — if only 50% of tumour cells express the target antigen, an ADC with bystander killing can eliminate the antigen-negative population. Bystander-competent payloads: MMAE (vedotin — uncharged, membrane-permeable), DXd (deruxtecan — membrane-permeable camptothecin analogue), PBD dimers. Non-bystander payloads: MMAF (mafodotin — charged C-terminal Phe, impermeable), Lys-MCC-DM1 (emtansine via non-cleavable linker — charged lysine adduct). The bystander effect can be quantified in co-culture assays: antigen-positive and antigen-negative cells are mixed, and selective killing of the antigen-negative population is measured.',
    },
    {
      type: 'bullets',
      title: 'ADC CMC Challenges — Unique Quality Attributes',
      items: [
        'DAR distribution analysis: HIC (hydrophobic interaction chromatography) resolves DAR species by hydrophobicity. Reversed-phase HPLC (rpHPLC) of reduced ADC separates conjugated heavy/light chains. Native MS provides intact mass and DAR ladder. The average DAR, DAR distribution width, and unconjugated fraction (DAR 0) are all specified quality attributes.',
        'Drug load heterogeneity: For lysine-conjugated ADCs, peptide mapping with LC-MS/MS identifies conjugation site occupancy across ~40 potential lysine sites. Positional isomers cannot be resolved chromatographically but affect local structure and function.',
        'Linker-payload stability: Forced degradation studies must assess linker cleavage under stress conditions (pH, temperature, freeze-thaw, oxidation). Maleimide-thiol conjugates can undergo retro-Michael reaction (deconjugation) or succinimide ring hydrolysis. Free drug release in formulation is a critical stability-indicating attribute.',
        'Aggregation propensity: Hydrophobic payloads increase surface hydrophobicity, promoting aggregation. High-DAR species are particularly aggregation-prone. SEC-HPLC with UV/fluorescence dual detection distinguishes aggregated ADC from aggregated unconjugated antibody.',
        'Potency assay design: Cell-based cytotoxicity assay (e.g., CellTiter-Glo viability) measures EC50 relative to reference standard. The assay integrates all steps: binding, internalisation, trafficking, linker cleavage, payload release, and cell killing. Incubation time (72-120 h) must allow full payload processing.',
        'Residual free drug: Unbound payload in the ADC drug substance is a safety-critical impurity. Quantified by rpHPLC or LC-MS/MS. Specification typically <1% of total drug load. Free drug can cause systemic toxicity without target-mediated delivery.',
      ],
    },
    {
      type: 'callout',
      title: 'Site-Specific Conjugation — The Industry Trend',
      variant: 'success',
      content:
        'Site-specific conjugation technologies produce homogeneous ADCs with defined DAR and conjugation sites, eliminating the heterogeneity challenges of stochastic conjugation. ThioMab (Genentech): Engineered cysteines at specific positions (e.g., LC-V205C, HC-A114C) provide two conjugation sites per antibody (DAR 2). The resulting ADCs show improved therapeutic index compared to stochastic DAR 4 equivalents — lower DAR is compensated by improved PK (no high-DAR species) and consistent drug exposure. Enzymatic approaches: microbial transglutaminase conjugates to Q295 (after N297Q deglycosylation), providing homogeneous DAR 2 with site-defined attachment in the Fc CH2 domain. Sortase A conjugation at engineered LPETG motifs enables chemoenzymatic ligation. Non-natural amino acid (nnAA) incorporation: amber codon suppression installs pAMF (para-azidomethylphenylalanine) for strain-promoted azide-alkyne cycloaddition (SPAAC) — the most chemically orthogonal approach. The CMC advantage: reduced DAR distribution testing, simplified release specifications, and improved batch-to-batch consistency.',
    },
    {
      type: 'callout',
      title: 'Regulatory Landscape — ADC-Specific CMC Guidance',
      variant: 'info',
      content:
        'ADCs are regulated as biologics (not small molecules), but require hybrid CMC characterisation spanning both biologics and small molecule paradigms. The antibody intermediate is characterised per ICH Q6B (biological substance), while the linker-payload (drug-linker) is characterised per ICH Q6A (chemical substance). The conjugated ADC drug substance requires both: physicochemical characterisation of the conjugate (DAR, drug distribution, positional isomers), biological characterisation (binding, effector function if relevant, potency), and small-molecule quality attributes (free drug, linker stability, organic solvent residuals from conjugation). FDA has issued specific guidance on ADC development, and EMA considers ADCs under the advanced therapy framework. Key CMC differences from naked antibodies: the manufacturing process includes a conjugation step (often with organic co-solvents like DMA or DMSO), additional purification to remove free drug and aggregates, and unique formulation challenges (hydrophobic payloads require surfactant optimisation, often polysorbate 80 at higher concentrations than typical mAbs).',
    },
  ],
  mentorQuestions: [
    'Compare T-DM1 and T-DXd: both target HER2, but T-DXd shows efficacy in HER2-low tumours where T-DM1 fails. Explain the mechanistic basis (linker, payload, bystander effect, DAR) and the corresponding CMC characterisation differences.',
    'If a DAR distribution shift is observed during ADC stability studies (DAR 4 average shifting to DAR 3.2 due to linker deconjugation), how would you assess the impact on potency, safety, and shelf-life specification?',
    'For a site-specific ADC with homogeneous DAR 2, what analytical methods would you reduce or eliminate compared to the release panel for a stochastic DAR 4 ADC, and what new characterisation would you add?',
  ],
};
