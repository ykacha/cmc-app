import type { ModuleContent } from '../../types/content';

export const module9: ModuleContent = {
  id: 'glycosylation-m9',
  sectionId: 'glycosylation',
  moduleNumber: 9,
  eyebrow: 'GLYCOSYLATION 10',
  title: 'Bisecting GlcNAc',
  lead: 'The dual mechanism for ADCC enhancement — steric FUT8 exclusion plus direct FcγRIIIa contact — and the GlycoMAb vs POTELLIGENT comparison.',
  tags: [
    { label: 'MGAT3/GnTIII', color: 'teal' },
    { label: 'ADCC', color: 'red' },
    { label: 'GlycoMAb', color: 'purple' },
    { label: 'POTELLIGENT', color: 'blue' },
  ],
  stats: [
    { label: 'Enzyme', value: 'GnTIII (MGAT3)' },
    { label: 'Mechanism', value: 'Dual' },
    { label: 'ADCC Enhancement', value: '10-20×' },
    { label: 'Platform', value: 'GlycoMAb (Roche)' },
  ],
  sections: [
    {
      type: 'card',
      title: 'GnTIII (MGAT3) — The Bisecting Enzyme',
      color: 'teal',
      content:
        'N-acetylglucosaminyltransferase III (GnTIII), encoded by the MGAT3 gene, catalyses the addition of a β1,4-linked GlcNAc residue to the β-mannose of the N-glycan trimannosyl core. This "bisecting" GlcNAc bisects the two antennae of the glycan — hence the name. GnTIII is a type II transmembrane protein resident in the medial Golgi, positioned between GnTI (MGAT1, which adds the first GlcNAc to the α1,3-mannose arm) and GnTII (MGAT2, which adds GlcNAc to the α1,6-mannose arm). Critically, GnTIII activity depends on substrate availability: it can act on GlcNAcMan₃GlcNAc₂ (the product of GnTI) but not on Man₅GlcNAc₂ (the high-mannose precursor). This means bisecting GlcNAc addition requires prior GnTI activity. Wild-type CHO cells express very low levels of endogenous MGAT3 — typically below the threshold needed for significant bisecting GlcNAc incorporation. Consequently, bisecting species are usually <1% of the total glycan profile in standard CHO-produced mAbs. Increasing bisecting GlcNAc requires deliberate genetic engineering.',
    },
    {
      type: 'card',
      title: 'Dual Mechanism of ADCC Enhancement',
      color: 'red',
      content:
        'The bisecting GlcNAc enhances ADCC through two distinct and synergistic mechanisms. Mechanism 1 — Steric FUT8 exclusion: The bisecting β1,4-GlcNAc physically occludes the active site of α1,6-fucosyltransferase (FUT8). FUT8 requires access to the innermost GlcNAc of the glycan core to transfer fucose from GDP-fucose, but the bisecting residue sterically blocks this access. Therefore, glycans bearing a bisecting GlcNAc are almost always afucosylated, and the ADCC enhancement follows the same biophysical mechanism as direct afucosylation — removal of the steric clash between core fucose and the Asn162 glycan on FcγRIIIa, enabling tighter Fc-receptor engagement. Mechanism 2 — Direct FcγRIIIa contact: Structural studies (X-ray crystallography of Fc-FcγRIIIa complexes) suggest that the bisecting GlcNAc itself makes additional van der Waals contacts with the FcγRIIIa glycan at Asn162, creating a secondary binding interface that further stabilises the Fc-receptor interaction. The combined effect of both mechanisms produces 10-20× enhanced ADCC activity compared to standard fucosylated mAbs.',
    },
    {
      type: 'glycan',
      title: 'Bisecting GlcNAc Glycoform Series',
      glycoforms: [
        {
          name: 'G0 + bisecting GlcNAc (no fucose)',
          notation: 'GlcNAc₅Man₃',
          description: 'Core biantennary glycan with bisecting β1,4-GlcNAc on the β-mannose. No core fucose (sterically excluded by the bisecting residue). No galactose on either antenna. The predominant species in GnTIII-overexpressing CHO lines.',
          abundance: '30-50% in GlycoMAb',
          impact: 'Maximal ADCC enhancement via dual mechanism — both afucosylation-mediated and direct bisecting GlcNAc contact',
        },
        {
          name: 'G1 + bisecting GlcNAc (no fucose)',
          notation: 'Gal₁GlcNAc₅Man₃',
          description: 'One galactose on either the α1,3 or α1,6 arm, plus bisecting GlcNAc, no core fucose. Galactose adds minor additional CDC activity without compromising the ADCC enhancement from the bisecting/afucosylated structure.',
          abundance: '15-25% in GlycoMAb',
          impact: 'Strong ADCC enhancement maintained; minor CDC improvement from galactose',
        },
        {
          name: 'G2 + bisecting GlcNAc (no fucose)',
          notation: 'Gal₂GlcNAc₅Man₃',
          description: 'Fully galactosylated biantennary glycan with bisecting GlcNAc and no core fucose. The most processed bisecting species — both antennae carry terminal galactose.',
          abundance: '5-15% in GlycoMAb',
          impact: 'Full ADCC + improved C1q binding from terminal galactose',
        },
        {
          name: 'G0F + bisecting GlcNAc',
          notation: 'Fuc₁GlcNAc₅Man₃',
          description: 'Rare species where FUT8 manages to add core fucose despite the bisecting GlcNAc — occurs at low frequency when both enzymes are expressed at high levels. Kinetic competition between GnTIII and FUT8 determines the ratio.',
          abundance: '<5% in GlycoMAb',
          impact: 'Reduced ADCC enhancement — the presence of fucose partially negates the bisecting GlcNAc benefit',
        },
      ],
    },
    {
      type: 'card',
      title: 'GlycoMAb Platform — Roche/Glycart Engineering',
      color: 'purple',
      content:
        'The GlycoMAb technology (developed by Glycart Biotechnology, acquired by Roche in 2005) involves co-overexpression of two genes in CHO cells: (1) MGAT3 (GnTIII) — to introduce bisecting GlcNAc, which sterically blocks FUT8 and also provides direct FcγRIIIa contacts; (2) A Golgi-targeted α-mannosidase II (MAN2A1) — fused to the N-terminal transmembrane/stem region of GnTI (MGAT1) to redirect mannosidase II to the medial Golgi. This ensures that the GnTIII substrate (GlcNAcMan₃GlcNAc₂) is efficiently generated before GnTIII acts. Without the co-expressed mannosidase II, GnTIII overexpression can produce hybrid-type glycans with both high-mannose arms and bisecting GlcNAc, which are suboptimal for ADCC. The combination yields a glycan profile dominated by afucosylated, bisected complex-type glycans (>70% afucosylated). The first approved product using GlycoMAb technology is obinutuzumab (Gazyva/Gazyvaro), an anti-CD20 type II mAb approved in 2013 for CLL and subsequently for follicular lymphoma. Obinutuzumab demonstrates superior ADCC and direct cell death induction compared to rituximab.',
    },
    {
      type: 'card',
      title: 'POTELLIGENT Platform — BioWa/Kyowa Kirin Engineering',
      color: 'blue',
      content:
        'The POTELLIGENT technology (developed by Kyowa Kirin, commercialised through BioWa Inc.) takes a fundamentally different approach — complete FUT8 knockout in CHO cells using homologous recombination (originally), ZFN, or CRISPR/Cas9. FUT8 (α1,6-fucosyltransferase, gene FUT8) is the sole enzyme responsible for core fucosylation of N-glycans in mammalian cells. Biallelic knockout of FUT8 produces a CHO cell line incapable of adding core fucose to any glycoprotein, resulting in 100% afucosylated glycans — but without bisecting GlcNAc, since MGAT3 is not overexpressed. The glycan profile is therefore dominated by afucosylated complex-type biantennary glycans: G0 (no fucose), G1 (no fucose), G2 (no fucose). The first approved POTELLIGENT product is mogamulizumab (Poteligeo), an anti-CCR4 mAb approved in 2012 (Japan) and 2018 (US/EU) for adult T-cell leukaemia/lymphoma and mycosis fungoides/Sézary syndrome. Mogamulizumab demonstrates 100× enhanced ADCC compared to fucosylated anti-CCR4 antibodies in in vitro assays.',
    },
    {
      type: 'table',
      title: 'GlycoMAb vs POTELLIGENT vs 2F-Fucose — Head-to-Head Comparison',
      headers: ['Feature', 'GlycoMAb (Roche)', 'POTELLIGENT (Kyowa Kirin)', '2F-Fucose (Media Additive)'],
      rows: [
        ['Genetic modification', 'MGAT3 + ManII overexpression', 'FUT8 biallelic knockout', 'None (parental CHO)'],
        ['Bisecting GlcNAc', 'Yes — majority of glycans', 'No', 'No'],
        ['Core fucose level', '<30% (residual FUT8 activity)', '0% (complete KO)', '0-5% (dose-dependent)'],
        ['ADCC enhancement mechanism', 'Dual — afucosylation + bisecting contact', 'Single — afucosylation only', 'Single — afucosylation only'],
        ['ADCC fold-increase', '10-20×', '50-100×', '20-50×'],
        ['Cell line requirement', 'New engineered line', 'New FUT8-KO line', 'Existing CHO line'],
        ['Regulatory pathway', 'New cell line (full CMC)', 'New cell line (full CMC)', 'Process change (comparability)'],
        ['Glycan profile complexity', 'High — bisected species add peaks', 'Lower — standard minus fucose', 'Lower — standard minus fucose'],
        ['Approved products', 'Obinutuzumab (2013)', 'Mogamulizumab (2012)', 'None yet (clinical stage)'],
        ['IP landscape', 'Roche/Glycart patents', 'Kyowa Kirin/BioWa patents', 'Less encumbered'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Kinetic Competition — GnTIII vs FUT8 in the Golgi',
      color: 'amber',
      content:
        'The steric exclusion of FUT8 by bisecting GlcNAc is not absolute — it depends on the kinetic competition between GnTIII and FUT8 in the medial/trans-Golgi. Both enzymes act on the same substrate pool (complex-type biantennary glycans), and the outcome depends on which enzyme modifies the glycan first. If GnTIII adds the bisecting GlcNAc before FUT8 encounters the glycan, core fucosylation is blocked. If FUT8 adds core fucose first, GnTIII can still add bisecting GlcNAc (FUT8 activity is not blocked by prior bisecting GlcNAc, but the reverse is not true). This kinetic competition means that in GlycoMAb cells, residual core fucosylation (typically 10-30%) occurs when FUT8 "wins" the race on a fraction of glycans. Strategies to further reduce this residual fucosylation include: (1) increasing the GnTIII:FUT8 expression ratio; (2) optimising the Golgi-targeting signal on GnTIII to ensure earlier compartment access; (3) combining GnTIII overexpression with partial FUT8 knockdown (siRNA or weak promoter-driven antisense). Process parameters also influence the competition — higher UDP-GlcNAc availability favours GnTIII activity, while GDP-fucose concentration affects FUT8 kinetics.',
    },
    {
      type: 'table',
      title: 'Approved Glycoengineered Antibodies',
      headers: ['Product', 'Target', 'Technology', 'Glycan Feature', 'Indication', 'Approval'],
      rows: [
        ['Mogamulizumab (Poteligeo)', 'CCR4', 'POTELLIGENT (FUT8 KO)', '100% afucosylated', 'CTCL, ATLL', '2012 (JP), 2018 (US)'],
        ['Obinutuzumab (Gazyva)', 'CD20', 'GlycoMAb (GnTIII + ManII)', 'Bisected + afucosylated', 'CLL, FL', '2013 (US)'],
        ['Benralizumab (Fasenra)', 'IL-5Rα', 'POTELLIGENT (FUT8 KO)', '100% afucosylated', 'Severe eosinophilic asthma', '2017 (US)'],
        ['Inebilizumab (Uplizna)', 'CD19', 'POTELLIGENT (FUT8 KO)', '100% afucosylated', 'NMOSD', '2020 (US)'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'HILIC Profile Complexity with Bisecting Species',
      color: 'green',
      content:
        'The introduction of bisecting GlcNAc substantially increases the complexity of HILIC glycan profiles compared to standard CHO-produced mAbs. A typical wild-type CHO profile contains 5-8 major peaks (Man5, G0, G0F, G1F isomers, G2F, and minor sialylated species). With GnTIII overexpression, each of these base structures can exist in ±bisecting and ±fucose variants, expanding the number of resolved peaks to 15-25. For example, the G0 region alone may contain: G0F (fucosylated, no bisecting), G0 (afucosylated, no bisecting), G0F+bisecting (fucosylated, bisecting), and G0+bisecting (afucosylated, bisecting) — all with slightly different HILIC retention times. This complexity requires: (1) Higher-resolution HILIC columns (sub-2 µm particles, longer gradients); (2) Orthogonal confirmation by LC-MS to assign bisecting species; (3) Glucose unit (GU) reference standards including bisected glycan standards; (4) Robust peak integration methods validated for the expanded peak set. Regulatory agencies expect all major glycan species (>1% relative abundance) to be identified, quantified, and trended.',
    },
    {
      type: 'callout',
      title: 'Analytical Challenge — Distinguishing Bisecting from Triantennary',
      variant: 'warning',
      content:
        'Bisected biantennary glycans (e.g., G0 + bisecting GlcNAc, composition GlcNAc₅Man₃) are isobaric with triantennary glycans (GlcNAc₅Man₃ with three antennae and no bisecting). Both have identical monosaccharide composition and molecular weight. Distinguishing them requires: (1) Exoglycosidase sequencing — treatment with specific hexosaminidases that cleave antenna GlcNAc but not bisecting GlcNAc (e.g., S. pneumoniae β-N-acetylhexosaminidase); (2) MS/MS fragmentation — specific fragment ions differ between bisected and triantennary structures due to different glycosidic linkages; (3) HILIC retention time — bisected and triantennary structures typically have different GU values. For GlycoMAb-produced mAbs, this distinction is critical for accurate glycan profiling and must be validated during method development.',
    },
    {
      type: 'card',
      title: 'Obinutuzumab — The GlycoMAb Clinical Proof-of-Concept',
      color: 'purple',
      content:
        'Obinutuzumab (GA101, Gazyva/Gazyvaro) serves as the definitive clinical validation of the GlycoMAb approach. Developed by Roche/Genentech, it is a type II anti-CD20 mAb that combines two mechanisms of enhanced tumour cell killing: (1) Glycoengineered Fc with bisected, predominantly afucosylated glycans → 10-20× enhanced ADCC via enhanced FcγRIIIa binding; (2) Type II CD20 binding mode → direct programmed cell death (non-apoptotic, lysosome-dependent) without extensive CD20 redistribution into lipid rafts. In the pivotal CLL11 trial, obinutuzumab + chlorambucil demonstrated superior PFS compared to rituximab + chlorambucil (29.2 vs 15.2 months), validating the clinical benefit of glycoengineering. From a CMC perspective, obinutuzumab manufacturing requires monitoring of both afucosylated species (target >70%) and bisecting GlcNAc levels, with the glycan profile serving as a critical in-process and release test. The more complex HILIC profile demands validated peak identification and integration procedures not required for standard fucosylated mAbs.',
    },
    {
      type: 'bullets',
      title: 'CMC Implications — Bisecting GlcNAc in Manufacturing',
      items: [
        'Cell line stability: GnTIII and mannosidase II transgenes must remain stably expressed across the production cell line lifespan (typically ≥60 generations from MCB to EPC). Loss of transgene expression manifests as increasing core fucosylation and decreasing bisecting GlcNAc — monitored by HILIC glycan profiling at extended cell age studies.',
        'Upstream process sensitivity: Bisecting GlcNAc levels are sensitive to UDP-GlcNAc pool size, which depends on glutamine, glucose, and GlcNAc/glucosamine media supplementation. The hexosamine biosynthetic pathway (HBP) feeds UDP-GlcNAc production, and its flux is a key upstream control lever.',
        'HILIC method complexity: GlycoMAb glycan profiles require higher-resolution HILIC methods with MS confirmation. Method transfer between analytical laboratories and sites is more challenging than for standard glycan methods.',
        'Specification complexity: Two CQAs must be controlled — afucosylated species (target ≥70%) and bisecting GlcNAc species — with demonstrated correlation to FcγRIIIa binding and ADCC potency in the specification justification.',
        'Comparability challenge: Any process change (scale-up, media change, site transfer) requires demonstration that both the afucosylation and bisecting GlcNAc levels remain within the established glycan profile. The higher number of glycan species increases the statistical complexity of comparability assessments.',
        'Biosimilar implications: A biosimilar to obinutuzumab must replicate the glycoengineered profile — both afucosylation and bisecting GlcNAc — which likely requires the same or equivalent glycoengineering strategy. This creates a higher CMC barrier compared to biosimilars of standard fucosylated mAbs.',
      ],
    },
  ],
  mentorQuestions: [
    'Explain the dual mechanism by which bisecting GlcNAc enhances ADCC, and why the steric exclusion of FUT8 is the dominant contributor.',
    'If you were developing a biosimilar to obinutuzumab, how would your glycan analytical strategy differ from a biosimilar to rituximab?',
    'Why does the GlycoMAb platform require co-expression of Golgi-targeted mannosidase II alongside GnTIII — what happens without it?',
  ],
};

export default module9;
