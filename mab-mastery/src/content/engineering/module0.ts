import type { ModuleContent } from '../../types/content';

export const module0: ModuleContent = {
  id: 'engineering-m0',
  sectionId: 'engineering',
  moduleNumber: 0,
  eyebrow: 'ENGINEERING 01',
  title: 'LALA Mutation (L234A/L235A)',
  lead: 'The LALA double mutation (L234A/L235A, EU numbering) is the foundational Fc-silencing strategy in therapeutic mAb development. By replacing two hydrophobic leucine residues in the lower hinge with alanine, LALA eliminates the critical hydrophobic contacts with the FcgammaR binding groove, reducing effector function engagement by more than 99%.',
  tags: [
    { label: 'Fc Silencing', color: 'blue' },
    { label: 'Lower Hinge', color: 'teal' },
    { label: 'EU Numbering', color: 'amber' },
    { label: 'Effector Function', color: 'red' },
  ],
  stats: [
    { label: 'Mutation Sites', value: 'L234A + L235A' },
    { label: 'FcgammaR Reduction', value: '>99%' },
    { label: 'C1q/CDC', value: 'Residual' },
    { label: 'IgG Subclass', value: 'IgG1 backbone' },
  ],
  sections: [
    {
      type: 'card',
      title: '1. Structural Basis of the LALA Mutation',
      color: 'blue',
      content:
        'Positions L234 and L235 reside in the lower hinge region of IgG1, the primary interface for all FcgammaR engagement. In wild-type IgG1, L234 and L235 form a hydrophobic patch that inserts into a complementary groove on FcgammaR ectodomains. The leucine side chains make van der Waals contacts with aromatic and hydrophobic residues in the D2 domain of FcgammaRIIIa (Trp87, Trp110, Leu111) and FcgammaRIIa. Mutation to alanine removes the isobutyl side chain, leaving only a methyl group. This drastically reduces the buried hydrophobic surface area at the Fc:FcgammaR interface (estimated loss of ~200 square angstroms per Fc:receptor contact). The lower hinge in IgG1 adopts an extended conformation when bound to FcgammaR; LALA may also subtly alter the hinge flexibility, reducing the ability of this region to adopt the optimal binding conformation. Critically, L234 and L235 are conserved across all human IgG subclasses at this position (with minor sequence variation in IgG2 and IgG4), confirming their universal importance for FcgammaR recognition.',
    },
    {
      type: 'table',
      title: '2. WT vs LALA Binding Affinity per FcgammaR',
      headers: ['Receptor', 'WT IgG1 KD (nM)', 'LALA IgG1 KD (nM)', 'Fold Reduction', 'Functional Consequence'],
      rows: [
        ['FcgammaRI (CD64)', '1-10', '>10,000 (undetectable)', '>1,000x', 'No monomeric IgG binding to monocytes/macrophages'],
        ['FcgammaRIIa-H131', '500-800', '>50,000', '>100x', 'Loss of ADCP by macrophages'],
        ['FcgammaRIIa-R131', '700-1,200', '>50,000', '>50x', 'Loss of ADCP by macrophages'],
        ['FcgammaRIIb', '1,000-3,000', '>50,000', '>30x', 'Loss of inhibitory feedback on B cells'],
        ['FcgammaRIIIa-V158', '100-300', '>30,000', '>100x', 'No ADCC by NK cells'],
        ['FcgammaRIIIa-F158', '300-800', '>50,000', '>100x', 'No ADCC by NK cells'],
        ['C1q', '~50 (on clusters)', '~500-2,000', '~10-40x', 'Residual CDC activity (not fully silenced)'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '3. Residual C1q and CDC Activity',
      color: 'amber',
      content:
        'A critical limitation of the LALA mutation is that it does not fully abrogate C1q binding or complement-dependent cytotoxicity (CDC). C1q binds the Fc region at a distinct site centred on EU residues D270, K322, P329, and P331 on the CH2 domain surface, which is partially but not completely overlapping with the FcgammaR binding site. While LALA reduces C1q binding by approximately 10-40-fold (depending on assay format and target antigen density), measurable residual C1q engagement persists. In reporter assays using high-density antigen-expressing target cells, LALA mutants can still trigger low-level CDC (typically <10% of wild-type at saturating concentrations). This residual CDC is clinically relevant for applications where any cell killing is undesirable (e.g., T-cell bispecifics, checkpoint inhibitors targeting T-cell antigens). This limitation directly motivated the development of LALA-PG (L234A/L235A/P329G), which adds a third mutation to completely silence C1q engagement.',
    },
    {
      type: 'bullets',
      title: '4. Molecular Mechanism of FcgammaR Binding Abolition',
      items: [
        'L234A: Removes the primary hydrophobic contact to FcgammaR Trp87 in the D2 domain. The Trp87 indole ring normally stacks against the L234 leucine side chain, contributing approximately 2-3 kcal/mol to binding free energy.',
        'L235A: Eliminates the secondary hydrophobic contact to FcgammaR Trp110 and Leu111. L235 packs into a hydrophobic groove between the D1-D2 hinge region of the receptor.',
        'The combined effect is cooperative: single L234A reduces binding ~10-fold; single L235A reduces binding ~10-fold; the double mutant reduces binding >100-1,000-fold, indicating synergistic disruption of the interface.',
        'LALA does not alter the CH2 domain fold or the N297 glycan orientation, as confirmed by X-ray crystallography. The mutations are localised to the hinge, preserving the overall Fc architecture.',
        'FcRn binding at the CH2-CH3 interface (residues I253, H310, H435) is completely unaffected by LALA, preserving normal serum half-life.',
      ],
    },
    {
      type: 'table',
      title: '5. Clinical Examples of LALA-Containing mAbs',
      headers: ['Product', 'Target', 'Indication', 'Format', 'Rationale for Fc Silencing', 'Status'],
      rows: [
        ['Durvalumab (Imfinzi)', 'PD-L1', 'NSCLC, SCLC, BTC', 'IgG1 LALA', 'Prevent ADCC/ADCP killing of PD-L1+ T cells', 'Approved (2017)'],
        ['Tremelimumab (Imjudo)', 'CTLA-4', 'HCC (with durvalumab)', 'IgG2 (natural silence)', 'IgG2 used instead of IgG1-LALA; similar silencing intent', 'Approved (2022)'],
        ['Teplizumab (Tzield)', 'CD3', 'Type 1 diabetes delay', 'IgG1 Fc-mutant', 'Prevent T-cell depletion; signal without killing', 'Approved (2022)'],
        ['Faricimab (Vabysmo)', 'ANG-2/VEGF-A', 'wAMD, DME', 'Bispecific IgG1 LALA', 'No effector function needed for ligand neutralisation', 'Approved (2022)'],
        ['MEDI-524 (motavizumab)', 'RSV F protein', 'RSV prophylaxis', 'IgG1 LALA variant tested', 'Clinical candidate explored Fc-silent version', 'Discontinued'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '6. CMC Analytical Strategy for Confirming LALA Silencing',
      color: 'green',
      content:
        'Confirming Fc silencing is a critical component of the CMC characterisation package for LALA-containing molecules. The minimum analytical strategy includes: (1) SPR binding to all FcgammaR allotypes (FcgammaRI, FcgammaRIIa-H131/R131, FcgammaRIIb, FcgammaRIIIa-V158/F158, FcgammaRIIIb) demonstrating undetectable or negligible binding (KD values reported as not determinable or >10 micromolar); (2) ADCC reporter bioassay (Jurkat-FcgammaRIIIa-NFAT-luc) showing no dose-response activity compared to a positive control wild-type IgG1; (3) ADCP assay using primary monocyte-derived macrophages showing no phagocytic activity; (4) CDC assay using complement-replete human serum showing <5% lysis at the highest concentration tested (with explicit acknowledgment of residual CDC for LALA without P329G); (5) C1q ELISA or SPR confirming reduced but not abolished C1q binding. For regulatory submissions, include a wild-type IgG1 positive control and an effector-null negative control (e.g., IgG4 or LALA-PG) for benchmarking.',
    },
    {
      type: 'code',
      title: '7. Sequence Context — Lower Hinge Region',
      language: 'text',
      code:
`EU Numbering:    ...228  229  230  231  232  233  234  235  236  237  238...
IgG1 WT:         ...Pro  Ala  Pro  Glu  Leu  Leu  Leu  Gly  Gly  Pro  Ser...
                                            ^^   ^^
IgG1 LALA:       ...Pro  Ala  Pro  Glu  Leu  Leu  Ala  Ala  Gly  Pro  Ser...
                                            ^^   ^^
Hinge region:    |---- Upper hinge -----||-- Lower hinge --||- CH2 --->
FcgammaR contact:                             *** ***
FcRn contact:    (none in this region — preserved in LALA)

Note: EU residues 234-235 are in the lower hinge, the primary
FcgammaR interaction hotspot. Kabat numbering differs: L234=L234EU,
L235=L235EU. Always specify EU numbering in regulatory filings.`,
    },
    {
      type: 'callout',
      title: '8. Regulatory Expectations for Fc-Silenced Molecules',
      variant: 'warning',
      content:
        'For BLA submissions containing LALA or similar Fc-silencing mutations, the FDA and EMA expect explicit characterisation of effector function even though the molecule is designed to be effector-null. ICH S6(R1) requires functional characterisation proportional to the intended mechanism of action. For Fc-silenced molecules, this means demonstrating the absence of effector function to the limit of detection of validated assays. The characterisation package should include: (a) SPR binding data for the full FcgammaR panel with both V158/F158 and H131/R131 allotypes; (b) cell-based ADCC, ADCP, and CDC assays with appropriate positive controls; (c) FcRn binding confirmation to demonstrate preserved half-life; and (d) for biosimilars of LALA-containing originators, demonstration of equivalent Fc silencing within pre-specified equivalence margins.',
    },
    {
      type: 'card',
      title: '9. LALA in Bispecific Antibody Platforms',
      color: 'purple',
      content:
        'LALA has become a near-universal feature of Fc-containing bispecific antibody platforms. In T-cell bispecifics (TCBs) that bind CD3 on T cells and a tumour-associated antigen, Fc effector function is undesirable because FcgammaR engagement would cause non-specific T-cell activation, cytokine release, and potential T-cell depletion via ADCC. Examples include the Roche CrossMAb platform (e.g., glofitamab, used with knob-in-hole + LALA), Regeneron bispecifics (used with modified Fc), and AstraZeneca bispecifics built on the IgG1-LALA backbone. For bispecifics that simultaneously engage immune checkpoint receptors (e.g., anti-PD-1 x anti-LAG-3), LALA prevents FcgammaR-mediated depletion of T cells expressing both targets. The silenced Fc also reduces the risk of FcgammaR-mediated crosslinking that could cause unintended agonism of co-stimulatory targets. In bispecific development, LALA is typically combined with heterodimerisation mutations (knob-in-hole, charge pairs, or SEED) to ensure correct heavy chain pairing.',
    },
    {
      type: 'callout',
      title: '10. Key Limitation: LALA Does Not Silence C1q/CDC',
      variant: 'danger',
      content:
        'The most important limitation of LALA in clinical practice is its incomplete silencing of complement activation. While LALA reduces FcgammaR binding by >99%, C1q binding is only reduced 10-40-fold. On target cells with high antigen density (e.g., CD20-high B cells, CD38-high myeloma cells), residual C1q engagement can drive measurable CDC. This is particularly problematic for T-cell-engaging bispecifics where the CD3-binding arm can bring the Fc into proximity with complement-bearing surfaces. The LALA-PG mutation (adding P329G) was developed specifically to address this gap. For new programmes where complete effector silencing is required, LALA-PG is now preferred over LALA alone. However, legacy molecules (e.g., durvalumab, approved with LALA) continue to use the original LALA format, and their clinical safety profiles confirm that residual CDC is generally manageable in the anti-PD-L1 context where target cell density is relatively low.',
    },
    {
      type: 'bullets',
      title: '11. Comparative Context: LALA vs Other Fc-Silencing Approaches',
      items: [
        'LALA (L234A/L235A): >99% FcgammaR reduction, residual C1q/CDC. Most widely used; multiple approved products. First-generation silencing.',
        'LALA-PG (L234A/L235A/P329G): >99.9% FcgammaR reduction + complete C1q/CDC silencing. Second-generation; preferred for new programmes.',
        'N297A/N297Q (aglycosylated): Removes N-glycan entirely, eliminating FcgammaR and C1q binding. Also eliminates complement binding. However, causes CH2 domain destabilisation and increased aggregation propensity.',
        'IgG2/IgG4 backbone: Natural low effector function. IgG4 has Fab-arm exchange issues (requires S228P). IgG2 has disulfide heterogeneity. Neither achieves true zero effector function.',
        'D265A: Single mutation removing FcgammaR binding. Less commonly used than LALA; fewer clinical precedents.',
        'Fc-null (e.g., aglycosylated IgG1 or Fc deletion): Eliminates all Fc-dependent functions but also eliminates FcRn-mediated recycling, dramatically shortening half-life.',
      ],
    },
    {
      type: 'table',
      title: '12. Impact on Biophysical Properties',
      headers: ['Property', 'WT IgG1', 'LALA IgG1', 'Impact Assessment'],
      rows: [
        ['Tm (CH2 onset)', '68-72 C', '67-71 C', 'Negligible change; <1 C reduction typical'],
        ['FcRn binding (pH 6.0)', 'KD ~500 nM', 'KD ~500 nM', 'No impact; half-life preserved'],
        ['FcRn release (pH 7.4)', 'Rapid dissociation', 'Rapid dissociation', 'pH-dependent binding maintained'],
        ['Aggregation propensity', 'Baseline', 'Baseline (no change)', 'LALA does not affect colloidal stability'],
        ['Protein A binding', 'Normal', 'Normal', 'CH2-CH3 interface unaffected; standard purification applicable'],
        ['Glycan profile', 'Normal N297 glycan', 'Normal N297 glycan', 'LALA does not alter glycosylation'],
        ['Serum half-life (human)', '18-21 days', '18-21 days', 'FcRn-mediated recycling fully preserved'],
      ],
      sortable: true,
    },
  ],
  mentorQuestions: [
    'Your bispecific antibody programme uses LALA for Fc silencing, but a sensitive CDC assay detects 3-5% complement-dependent lysis at the highest dose. How do you assess the clinical risk of this residual CDC, and at what point would you consider upgrading to LALA-PG?',
    'Explain the molecular basis for why LALA effectively silences FcgammaR binding but only partially reduces C1q engagement. What structural features of the C1q binding site make it resistant to hinge mutations?',
    'In a head-to-head comparability study, your LALA-containing mAb from Manufacturing Process B shows a 5-fold reduction in residual C1q binding compared to Process A material. Both are well below the WT benchmark. How would you assess this change in the context of a post-approval manufacturing change?',
  ],
};
