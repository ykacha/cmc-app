import type { ModuleContent } from '../../types/content';

export const module8: ModuleContent = {
  id: 'engineering-m8',
  sectionId: 'engineering',
  moduleNumber: 8,
  eyebrow: 'ENGINEERING 09',
  title: 'Afucosylation — Glycoengineering for Enhanced ADCC',
  lead: 'Afucosylation removes core alpha-1,6-fucose from the Fc N297 glycan, eliminating steric clash with the FcgammaRIIIa Asn162 glycan and achieving approximately 50-fold ADCC enhancement. This glycoengineering approach has produced three approved products and is the most clinically validated ADCC enhancement strategy.',
  tags: [
    { label: 'Glycoengineering', color: 'green' },
    { label: 'FUT8 Knockout', color: 'red' },
    { label: 'ADCC Enhancement', color: 'blue' },
    { label: 'Approved Products', color: 'amber' },
  ],
  stats: [
    { label: 'Fucose Removal', value: 'Core alpha-1,6-fucose' },
    { label: 'ADCC Enhancement', value: '~50x' },
    { label: 'Approved Products', value: '3+' },
    { label: 'Methods', value: 'FUT8 KO, GnTIII, 2F-Fuc' },
  ],
  sections: [
    {
      type: 'card',
      title: '1. Structural Basis — The Steric Clash Model',
      color: 'blue',
      content:
        'The Fc N297 glycan occupies the interstitial space between the two CH2 domains. In wild-type IgG1 produced in CHO cells, approximately 90-95% of the N297 glycan carries a core alpha-1,6-linked fucose attached to the innermost GlcNAc residue. When IgG1 Fc engages FcgammaRIIIa, the receptor\'s own glycan at Asn162 (on the D2 domain) comes into direct proximity with the Fc N297 glycan. Core fucose on the Fc glycan sterically clashes with the FcgammaRIIIa Asn162 glycan, particularly with the innermost GlcNAc and the first mannose residue of the receptor glycan. This steric clash reduces the binding affinity by approximately 50-fold. Removal of core fucose eliminates this clash, allowing the Fc glycan and receptor glycan to pack more closely, creating additional carbohydrate-carbohydrate and carbohydrate-protein contacts that enhance binding. This steric clash model was elucidated through X-ray crystallography (Ferrara et al., PNAS 108:12669, 2011) and confirmed by glycan mutagenesis studies. Critically, the fucose-mediated steric clash is specific to FcgammaRIIIa (which is uniquely glycosylated at Asn162). Other FcgammaRs lack this glycosylation site, explaining why afucosylation selectively enhances FcgammaRIIIa binding without significantly affecting FcgammaRIIa, FcgammaRIIb, or C1q.',
    },
    {
      type: 'table',
      title: '2. Afucosylation Methods — Technical Approaches',
      headers: ['Method', 'Mechanism', 'Typical Afucose Level', 'Advantages', 'Limitations', 'Developer/User'],
      rows: [
        ['FUT8 knockout (CRISPR)', 'Deletion of alpha-1,6-fucosyltransferase gene', '>95% afucosylated', 'Complete; stable; irreversible', 'Requires cell line engineering; no fucose control', 'Kyowa Kirin (POTELLIGENT)'],
        ['FUT8 knockout (ZFN)', 'Zinc-finger nuclease-mediated FUT8 deletion', '>95% afucosylated', 'Complete; stable; first-generation gene editing', 'Older technology; less precise than CRISPR', 'Kyowa Kirin (early method)'],
        ['GnTIII overexpression', 'Beta-1,4-GlcNAc transferase III creates bisecting GlcNAc', '~60-80% afucosylated', 'Does not require FUT8 deletion; tunable', 'Incomplete afucosylation; bisecting GlcNAc heterogeneity', 'Roche/GlycoArt (GlycoMAb)'],
        ['2-Fluorofucose (2F-Fuc)', 'Fucose analogue inhibits FUT8 enzymatically', '~80-95% afucosylated (tunable)', 'Media additive; no cell line engineering; tunable', 'Supply chain for 2F-Fuc; batch variability', 'Seattle Genetics/others'],
        ['Kifunensine', 'Mannosidase I inhibitor; produces high-mannose glycans', '>90% afucosylated (high-mannose)', 'Simple media additive', 'High-mannose glycans cleared rapidly; reduces half-life', 'Research use; not for production'],
        ['CHO Lec13 cells', 'GDP-mannose 4,6-dehydratase deficient', '~90% afucosylated', 'Established mutant cell line', 'Growth and productivity limitations', 'Academic/early-stage research'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '3. FUT8 Knockout — The Gold Standard',
      color: 'green',
      content:
        'FUT8 (alpha-1,6-fucosyltransferase) is the sole enzyme responsible for adding core fucose to N-glycans in mammalian cells. Complete knockout of FUT8 from the production CHO cell line produces antibodies with >95% afucosylated N297 glycans. Kyowa Kirin pioneered this approach with their POTELLIGENT technology, originally using sequential gene disruption (random mutagenesis + selection) and later transitioning to ZFN and CRISPR-Cas9-mediated knockout. FUT8 KO cells are viable and grow at rates comparable to wild-type CHO, as core fucose is not essential for cell viability (unlike other glycosylation enzymes). The glycan profile of FUT8 KO-produced antibodies shows the expected complex biantennary glycans (G0, G1, G2) but without core fucose (designated G0-F, G1-F, G2-F in glycan nomenclature). Cell line development for FUT8 KO follows standard workflows: parental FUT8 KO CHO pool generation, followed by stable cell line generation by transfection of the antibody expression construct, limiting dilution cloning, and clone selection using standard productivity/quality screening with afucosylation confirmed by HILIC-FLR or LC-MS glycan analysis.',
    },
    {
      type: 'card',
      title: '4. GnTIII Overexpression — The Roche GlycoMAb Approach',
      color: 'teal',
      content:
        'Roche/Genentech, in collaboration with GlycoArt (acquired 2008), developed an alternative afucosylation strategy using overexpression of beta-1,4-N-acetylglucosaminyltransferase III (GnTIII, also called MGAT3). GnTIII adds a bisecting GlcNAc residue to the beta-mannose of the glycan core. The bisecting GlcNAc sterically hinders the subsequent action of FUT8, preventing core fucose addition. The result is a mixed glycan population: approximately 60-80% afucosylated (with bisecting GlcNAc) and 20-40% fucosylated (standard complex glycans). This produces the characteristic "GlycoMAb" glycan profile. Obinutuzumab (Gazyva/Gazyvaro) is the prototypical GlycoMAb product — an anti-CD20 antibody with enhanced ADCC that demonstrated superior efficacy over rituximab in chronic lymphocytic leukaemia (CLL). The GnTIII approach has the advantage of not requiring gene knockout (the endogenous FUT8 is still present), but the disadvantage of producing a heterogeneous glycan mixture rather than a homogeneous afucosylated product. This heterogeneity requires more sophisticated glycan monitoring and specification setting.',
    },
    {
      type: 'table',
      title: '5. Approved Afucosylated Antibody Products',
      headers: ['Product', 'Target', 'Afucosylation Method', 'Afucose Level', 'Indication(s)', 'Approval Year', 'Company'],
      rows: [
        ['Mogamulizumab (Poteligeo)', 'CCR4', 'FUT8 KO (POTELLIGENT)', '>95%', 'CTCL (mycosis fungoides, Sezary)', '2012 (JP), 2018 (US)', 'Kyowa Kirin'],
        ['Obinutuzumab (Gazyva)', 'CD20', 'GnTIII OE (GlycoMAb)', '~60-70%', 'CLL, FL', '2013 (US)', 'Roche/Genentech'],
        ['Benralizumab (Fasenra)', 'IL-5Ra', 'FUT8 KO-derived', '>90%', 'Severe eosinophilic asthma', '2017 (US)', 'AstraZeneca/MedImmune'],
        ['Margetuximab (Margenza)', 'HER2', 'Fc mutations (not glyco)', 'N/A (Fc mutation approach)', 'HER2+ breast cancer', '2020 (US)', 'MacroGenics'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '6. Cell Line Development for Afucosylated Products',
      color: 'purple',
      content:
        'Developing a production cell line for afucosylated antibodies requires integrating glycoengineering with standard cell line development (CLD) workflows. For FUT8 KO: Step 1 — Generate a FUT8 KO parental CHO pool using CRISPR-Cas9 with guides targeting exons 7-10 of the FUT8 gene. Screen clones by LCA (Lens culinaris agglutinin) lectin staining (LCA does not bind afucosylated glycans) or by HILIC glycan analysis. Step 2 — Transfect the validated FUT8 KO host with the antibody expression construct (typically glutamine synthetase or DHFR selection). Step 3 — Standard minipool/limiting dilution cloning, selecting for productivity (qP), growth, and glycan profile. Step 4 — Lead clone selection based on titre, growth in production medium, glycan homogeneity (>95% afucose), and general quality attributes (charge variants, aggregation, sequence confirmation). For GnTIII OE: The GnTIII gene is typically introduced on a separate expression cassette, either co-transfected with the antibody construct or stably integrated into the host cell prior to antibody transfection. GnTIII expression level must be balanced — too low gives insufficient afucosylation; too high can cause over-processing and hybrid/high-mannose glycan accumulation.',
    },
    {
      type: 'bullets',
      title: '7. Glycan Monitoring and Specification Setting',
      items: [
        'Primary method: HILIC-FLR (hydrophilic interaction liquid chromatography with fluorescence detection) of 2-AB or 2-AA labelled released glycans. Reports individual glycan species (G0-F, G1-F, G2-F, G0, G1, G2, etc.).',
        'Orthogonal method: LC-MS/MS of released glycans (with or without labelling) for unambiguous structural identification including fucose position (core vs outer-arm).',
        'Intact mass spectrometry: Provides a quick assessment of overall glycoform distribution without glycan release. Can distinguish fucosylated from afucosylated heavy chain species.',
        'Specification: For FUT8 KO products, the specification is typically >=90% or >=95% afucosylated glycans (total afucose species as % of total glycan area). For GlycoMAb products, a wider range (e.g., >=50% afucosylated with bisecting GlcNAc) may be acceptable.',
        'Process control: Afucosylation level can vary with cell culture conditions (passage number, media lot, bioreactor pH, temperature, dissolved oxygen). Design of experiments (DOE) should establish the relationship between process parameters and afucose level.',
        'Stability: Glycan profiles are generally stable during storage (glycosylation is a co-translational modification that does not change post-purification). However, high-mannose species may be selectively cleared in vivo by mannose receptor-mediated clearance.',
      ],
    },
    {
      type: 'callout',
      title: '8. 2-Fluorofucose — The Media Additive Approach',
      variant: 'info',
      content:
        '2-Fluorofucose (2F-Fuc) is a synthetic fucose analogue that, when added to cell culture media, is metabolically activated to GDP-2F-fucose, which competitively inhibits FUT8. The advantages are compelling: no cell line engineering required; tunable afucosylation by adjusting the 2F-Fuc concentration; applicable to any existing CHO cell line; reversible (stop adding 2F-Fuc to revert to normal fucosylation). Typical 2F-Fuc concentrations of 50-200 micromolar in production media achieve 80-95% afucosylation. However, 2F-Fuc introduces CMC complexities: (a) it is a specialty raw material requiring qualification and supply chain management; (b) lot-to-lot variability in 2F-Fuc potency can cause batch-to-batch variation in afucose levels; (c) residual 2F-Fuc in the drug substance must be monitored and cleared during downstream purification; (d) the metabolic effects of 2F-Fuc on overall cell metabolism and product quality (beyond glycosylation) must be characterised. 2F-Fuc is increasingly used in clinical-stage programmes but has not yet been used in an approved commercial product.',
    },
    {
      type: 'table',
      title: '9. Impact of Afucosylation on Full FcgammaR Panel',
      headers: ['Receptor', 'WT Fucosylated KD', 'Afucosylated KD', 'Fold Change', 'Mechanistic Explanation'],
      rows: [
        ['FcgammaRI', '1-10 nM', '1-10 nM', '~1x (no change)', 'FcgammaRI lacks Asn162 glycan; no steric clash'],
        ['FcgammaRIIa-H131', '500-800 nM', '400-700 nM', '~1-1.5x', 'Minimal; FcgammaRIIa lacks Asn162'],
        ['FcgammaRIIa-R131', '700-1,200 nM', '600-1,000 nM', '~1-1.5x', 'Minimal; no glycan clash mechanism'],
        ['FcgammaRIIb', '1,000-3,000 nM', '800-2,500 nM', '~1-1.5x', 'Minimal; FcgammaRIIb lacks Asn162'],
        ['FcgammaRIIIa-V158', '100-300 nM', '2-8 nM', '~40-60x', 'Eliminates fucose-Asn162 glycan steric clash'],
        ['FcgammaRIIIa-F158', '300-800 nM', '5-20 nM', '~50-80x', 'Same mechanism; partially compensates for F158 deficit'],
        ['C1q', '~50 nM (clustered)', '~50 nM (clustered)', '~1x (no change)', 'C1q binding is glycan-independent'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: '10. Selectivity Advantage — FcgammaRIIIa Specificity',
      variant: 'success',
      content:
        'The most important distinguishing feature of afucosylation compared to Fc point mutations (GASDALIE, DE) is its exquisite selectivity for FcgammaRIIIa. Afucosylation enhances FcgammaRIIIa binding by 40-80-fold while leaving FcgammaRIIa, FcgammaRIIb, and C1q essentially unchanged. This selectivity has two implications: (1) ADCC is dramatically enhanced without concurrent enhancement of ADCP (FcgammaRIIa-mediated) or CDC (C1q-mediated), creating a focused effector profile; (2) the inhibitory FcgammaRIIb is not enhanced, so the activating-to-inhibitory (A/I) ratio is maximised on NK cells. In contrast, GASDALIE and DE mutations enhance multiple FcgammaRs, including FcgammaRIIb, which may partially counteract the activating signal on some cell types. The selectivity also means that afucosylation does not increase platelet-mediated FcgammaRIIa activation (reducing thrombocytopenia risk) and does not increase complement activation (reducing complement-related adverse events). This selectivity profile is why afucosylation is considered the "cleanest" ADCC enhancement strategy from a safety perspective.',
    },
    {
      type: 'card',
      title: '11. Regulatory Expectations for Glycoengineered Products',
      color: 'amber',
      content:
        'Regulatory agencies treat afucosylated antibodies as deliberately glycoengineered products with specific expectations. ICH Q6B and ICH Q8/Q11 principles apply: the glycan profile is a critical quality attribute (CQA) directly linked to the mechanism of action (ADCC). Expectations include: (1) Glycan specification with acceptance criteria for afucosylated species (e.g., >=90% total afucose). This is a release and stability specification, not just characterisation. (2) Correlation between afucose level and ADCC potency, demonstrated through glycan-potency studies using samples with deliberate afucose variation. (3) Process validation demonstrating consistent afucose levels across commercial-scale batches. (4) Comparability protocols for any process changes that could affect glycosylation (cell bank changes, media changes, bioreactor scale changes). For biosimilars of afucosylated reference products (e.g., obinutuzumab biosimilars), the glycan similarity assessment is the most challenging element: the biosimilar must match not only the total afucose level but also the individual glycan species distribution, including bisecting GlcNAc content for GlycoMAb-type products.',
    },
  ],
  mentorQuestions: [
    'You are leading cell line development for an afucosylated anti-tumour mAb using a FUT8 KO CHO host. During clone screening, your top-producing clone shows 92% afucosylation while a lower-producing clone shows 98% afucosylation. How do you evaluate the trade-off between titre and glycan quality, and what specification would you set?',
    'Compare the CMC risk profiles of FUT8 KO versus 2-Fluorofucose for achieving afucosylation in a Phase III/commercial manufacturing process. Consider supply chain, batch consistency, process robustness, and regulatory filing strategy.',
    'Your afucosylated mAb shows 70% afucose at the 18-month real-time stability point (it was 93% at release). Discuss why this result is unexpected, what artifact might explain it, and how you would investigate.',
  ],
};
