import type { ModuleContent } from '../../types/content';

export const module12: ModuleContent = {
  id: 'glycosylation-m12',
  sectionId: 'glycosylation',
  moduleNumber: 12,
  eyebrow: 'GLYCOSYLATION 13',
  title: 'Fab Glycosylation',
  lead: 'When somatic hypermutation introduces N-glycosylation sites in variable regions — prevalence, structural consequences, PK impact, and CMC analytical challenges.',
  tags: [
    { label: 'Somatic Origin', color: 'purple' },
    { label: 'CDR vs Framework', color: 'blue' },
    { label: 'PK Impact', color: 'amber' },
  ],
  stats: [
    { label: 'Prevalence', value: '15-25% of mAbs' },
    { label: 'Origin', value: 'Somatic hypermutation' },
    { label: 'Glycan Type', value: 'More processed' },
    { label: 'Key Study', value: 'Kristic 2024' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Origin of Fab Glycosylation Sites',
      color: 'purple',
      content:
        'Unlike Fc glycosylation at Asn297, which is encoded in the germline IgG heavy chain constant region and is conserved across all IgG subclasses, Fab glycosylation sites arise through somatic hypermutation (SHM) during B cell affinity maturation in germinal centres. SHM introduces point mutations at a rate of ~10⁻³ mutations per base pair per cell division, targeted primarily to the variable region genes by activation-induced cytidine deaminase (AID). Some of these mutations create new NxS/T N-glycosylation sequons (where x ≠ Pro) that were not present in the germline VH or VL gene segment. Population studies estimate that 15-25% of circulating serum IgG molecules carry at least one Fab N-glycosylation site, and approximately 15-20% of therapeutic mAb candidates in clinical development have a Fab glycosylation sequon in their variable region. The presence of a Fab glycan sequon does not guarantee glycosylation — site occupancy depends on the local structural context, accessibility during co-translational processing, and competition with protein folding. Typical site occupancy for Fab glycans ranges from 60-95%, compared to >97% for the well-positioned Asn297 Fc site.',
    },
    {
      type: 'table',
      title: 'Fab vs Fc Glycosylation — Key Differences',
      headers: ['Feature', 'Fc Glycosylation (Asn297)', 'Fab Glycosylation (Variable)'],
      rows: [
        ['Origin', 'Germline-encoded, conserved in all IgG', 'Somatic hypermutation, molecule-specific'],
        ['Sequon position', 'CH2 domain, buried in Fc inter-chain space', 'CDR or framework region, often solvent-exposed'],
        ['Site occupancy', '>97% (STT3A efficient)', '60-95% (position-dependent)'],
        ['Glycan processing', 'Limited by steric constraints → G0F/G1F dominant', 'More accessible → higher Gal, higher SA'],
        ['Sialylation', 'Low (2-10% of Fc glycans)', 'High (20-50% of Fab glycans)'],
        ['Functional impact', 'Effector function (ADCC, CDC, ADCP)', 'Antigen binding, PK, immunogenicity'],
        ['Prevalence', '100% of IgG molecules', '15-25% of IgG molecules'],
        ['CQA classification', 'Always a CQA', 'Molecule-specific risk assessment'],
      ],
      sortable: false,
    },
    {
      type: 'card',
      title: 'CDR-Located Glycosylation Sites — Highest Risk',
      color: 'red',
      content:
        'N-glycosylation sequons located within CDR loops represent the highest-risk category of Fab glycans because the bulky glycan (1.4-3.0 kDa depending on processing) is positioned directly in or adjacent to the antigen-binding site. The consequences can include: (1) Enhanced binding — in some cases, the Fab glycan makes additional contacts with the antigen, effectively creating a carbohydrate-protein interaction that augments the CDR-antigen interface. This has been documented for several autoantibodies in autoimmune disease (e.g., anti-citrullinated protein antibodies in rheumatoid arthritis, where ACPA Fab glycans contact citrullinated epitopes). (2) Reduced binding — the glycan may sterically obstruct antigen access to the CDR loops, reducing binding affinity. This is particularly likely when the glycan sequon is in HCDR2 or HCDR3, which form the central binding surface. (3) Altered specificity — the glycan may modify the shape and charge of the binding surface, changing fine specificity. For therapeutic mAb development, a CDR-located glycan site requires mandatory functional characterisation: compare binding affinity (SPR/BLI), potency (cell-based assay), and epitope mapping between glycosylated and deglycosylated forms. If the glycan contributes to binding, it becomes a critical CQA requiring tight specification control.',
    },
    {
      type: 'card',
      title: 'Framework-Located Glycosylation Sites',
      color: 'blue',
      content:
        'Fab glycosylation sites in framework regions (FR1-FR4) generally pose lower risk to antigen binding than CDR-located sites, because framework residues form the structural scaffold rather than direct antigen contacts. However, framework Fab glycans can still affect the molecule through several mechanisms: (1) Protein folding and stability — a framework glycan can influence VH or VL domain folding kinetics and thermodynamic stability. N-glycans often stabilise the protein fold through glycan-protein contacts (lectins, calnexin/calreticulin quality control in the ER), and removal may reduce Tm by 2-5°C. (2) VH-VL interface packing — if the glycan site is near the VH-VL interface (particularly in FR2 or FR4), the glycan may sterically influence domain pairing geometry, subtly altering CDR loop orientation and binding affinity. (3) Aggregation propensity — framework glycans shield hydrophobic surface patches that might otherwise drive self-association. Deglycosylated variants may show increased aggregation in formulation stability studies. (4) Immunogenicity — non-human glycan motifs (e.g., α-Gal, NGNA) on a solvent-exposed Fab glycan may trigger anti-drug antibody (ADA) responses, particularly in patients with pre-existing anti-α-Gal or anti-NGNA IgE/IgG.',
    },
    {
      type: 'card',
      title: 'Fab Glycan Processing — Why More Sialylation?',
      color: 'green',
      content:
        'A consistent observation across multiple studies is that Fab glycans are more extensively processed than Fc glycans — they carry higher levels of galactosylation (G2 > G1 > G0) and substantially more sialylation (20-50% sialylated vs 2-10% for Fc). The structural basis is straightforward: the Asn297 Fc glycan is located in the confined inter-CH2 space, where steric constraints limit the access of large Golgi-resident glycosyltransferases (B4GalT1/B4GALT1 MW ~44 kDa, ST6Gal1/ST6GAL1 MW ~46 kDa) to the glycan termini. In contrast, Fab glycans are typically located on solvent-exposed CDR loops or framework surfaces where there is no steric obstruction — the glycan extends freely into solution, and glycosyltransferases can access the terminal sugars without spatial constraints. This accessibility allows sequential processing to proceed further: mannosidase trimming → GnTI/GnTII → galactosylation → sialylation each occurs more efficiently. The practical consequence is that Fab glycan characterisation requires attention to sialylated species (including α2,3 vs α2,6 sialic acid linkage and Neu5Ac vs Neu5Gc identity) that may be minor components of the Fc glycan profile.',
    },
    {
      type: 'table',
      title: 'Typical Fab vs Fc Glycan Profile Comparison',
      headers: ['Glycan Species', 'Fc (Asn297) %', 'Fab (solvent-exposed) %', 'Driver'],
      rows: [
        ['Man5', '3-8%', '1-3%', 'Fab site more accessible for mannosidase trimming'],
        ['G0F', '30-50%', '5-15%', 'Fab glycans further processed beyond G0'],
        ['G1F (α1,3 + α1,6)', '25-35%', '15-25%', 'Intermediate processing state'],
        ['G2F', '5-15%', '20-35%', 'Higher B4GalT1 access at Fab site → more complete galactosylation'],
        ['G2FS1', '1-5%', '10-20%', 'Higher ST6Gal1 access → more sialylation'],
        ['G2FS2', '<1%', '5-15%', 'Disialylated species rare at Fc but significant at Fab'],
        ['Afucosylated (total)', '2-8%', '5-20%', 'Variable — some Fab sites show lower fucosylation'],
        ['Site occupancy', '>97%', '60-95%', 'Fab site less consistently occupied by OST'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'PK Impact of Fab Glycosylation',
      color: 'amber',
      content:
        'Fab glycans can significantly alter mAb pharmacokinetics through mechanisms distinct from Fc glycan-mediated PK effects. The primary PK-relevant pathways are: (1) Mannose receptor-mediated clearance — if the Fab glycan carries high-mannose species (Man5-Man9), it can be recognised by the mannose receptor (CD206/MRC1) on liver sinusoidal endothelial cells and macrophages, accelerating clearance and reducing half-life. This effect is typically smaller than for Fc high-mannose because the Fab glycan represents one of potentially three glycans on the molecule, diluting the mannose receptor engagement. (2) Asialoglycoprotein receptor (ASGPR) clearance — Fab glycans with terminal galactose (exposed after sialic acid loss or incomplete sialylation) can bind the hepatic ASGPR (CLEC4H1), which recognises terminal galactose and GalNAc. This receptor-mediated endocytosis pathway can accelerate hepatic clearance. (3) Tissue distribution — highly sialylated Fab glycans carry negative charge that may alter tissue distribution, particularly penetration into charged extracellular matrices. Kristic et al. (2024) demonstrated in a population-level study that IgG molecules with Fab glycans showed altered tissue distribution patterns compared to Fab-unglycosylated IgG, with implications for target accessibility in tissue compartments.',
    },
    {
      type: 'callout',
      title: 'Immunogenicity Risk — Non-Human Glycan Epitopes on Fab',
      variant: 'danger',
      content:
        'Fab glycans pose a unique immunogenicity risk because CHO cells can incorporate non-human glycan epitopes — principally N-glycolylneuraminic acid (Neu5Gc/NGNA) and α1,3-galactose (α-Gal) — that are recognised by pre-existing antibodies in most humans. CHO cells express low levels of CMP-Neu5Gc through metabolic conversion from CMP-Neu5Ac, and the resulting Neu5Gc incorporation is typically 1-5% of total sialic acid. While this is a concern for all mAb glycans, Fab glycans present a higher immunogenicity risk because: (1) Fab glycans are more highly sialylated than Fc glycans, so the absolute amount of Neu5Gc per molecule is higher on the Fab; (2) Fab glycans are solvent-exposed and readily accessible to the immune system, while Fc glycans are partially shielded by the CH2 inter-chain space; (3) Anti-Neu5Gc IgG and IgE pre-exist in human serum (from dietary red meat exposure), and these antibodies can form immune complexes with Neu5Gc-bearing therapeutic mAbs, potentially driving infusion reactions or accelerated clearance. Risk mitigation includes: CMP-Neu5Ac supplementation to outcompete Neu5Gc incorporation, ST6GAL1 overexpression to maximise α2,6-linked Neu5Ac, and Neu5Gc-specific monitoring by DMB (1,2-diamino-4,5-methylenedioxybenzene) HPLC.',
    },
    {
      type: 'card',
      title: 'Analytical Strategy for Fab Glycan Characterisation',
      color: 'teal',
      content:
        'Comprehensive Fab glycan characterisation requires site-specific analytical methods that can distinguish Fab and Fc glycans independently. The standard approach involves: (1) IdeS digestion — the IdeS protease (FabRICATOR) cleaves below the hinge, producing F(ab\')₂ and Fc/2 fragments. Under reducing conditions, this yields Fd\' (VH-CH1), LC, and Fc/2. (2) Site-specific glycopeptide LC-MS/MS — tryptic digestion followed by LC-MS/MS with extracted ion chromatograms (XICs) for Fab glycopeptides (identified by the unique peptide sequence containing the Fab NxS/T sequon) and Fc glycopeptides (EEQYNSTYR or equivalent). This enables independent profiling of each glycosylation site. (3) PNGaseF treatment of F(ab\')₂ vs Fc/2 — released glycan profiling by HILIC-UPLC-FLR of each fragment, comparing the Fab and Fc glycan populations. (4) Intact/subunit mass spectrometry — deconvoluted mass spectra of Fd\', LC, and Fc/2 reveal site occupancy and major glycoforms at each site. (5) Sialic acid speciation — DMB (1,2-diamino-4,5-methylenedioxybenzene) labelling of released sialic acids, followed by RP-HPLC-FLR to quantify Neu5Ac vs Neu5Gc. This is critical for Fab glycans where sialylation is high.',
    },
    {
      type: 'table',
      title: 'Examples of Therapeutic mAbs with Fab Glycosylation',
      headers: ['mAb', 'Target', 'Fab Glycan Site', 'Location', 'Impact', 'CQA Status'],
      rows: [
        ['Cetuximab', 'EGFR', 'Asn88 (VH)', 'Framework', 'α-Gal on Fab glycan → anaphylaxis risk (tick bite-sensitised patients)', 'Critical CQA'],
        ['Elotuzumab', 'SLAMF7', 'Asn84 (VH)', 'Framework', 'Monitored as quality attribute; no reported clinical impact', 'CQA (monitored)'],
        ['Adalimumab biosimilars', 'TNFα', 'No Fab glycan', 'N/A', 'Reference product lacks Fab glycan; presence in biosimilar would be a quality difference', 'N/A (comparability)'],
        ['Bevacizumab', 'VEGF-A', 'No Fab glycan', 'N/A', 'Germline VH/VL without acquired NxS/T sequons', 'N/A'],
      ],
      sortable: false,
    },
    {
      type: 'card',
      title: 'The Cetuximab α-Gal Case — A Cautionary Tale',
      color: 'red',
      content:
        'Cetuximab (Erbitux), an anti-EGFR chimeric IgG1, carries a Fab glycosylation site at Asn88 in the VH framework region. The Fab glycan on cetuximab contains α1,3-galactose (α-Gal), a non-human sugar epitope. The original cetuximab manufacturing cell line (SP2/0, a murine myeloma line) expresses functional α1,3-galactosyltransferase (GGTA1), which adds terminal α-Gal to glycans. In the southeastern United States, a subset of patients developed severe anaphylaxis upon first cetuximab infusion. Investigation revealed that these patients had pre-existing IgE antibodies against α-Gal, acquired through bites from Lone Star ticks (Amblyomma americanum), which sensitise humans to α-Gal. The pre-existing anti-α-Gal IgE cross-reacted with α-Gal on the cetuximab Fab glycan, triggering mast cell degranulation and anaphylaxis. This case established three critical CMC principles: (1) Non-human glycan epitopes must be characterised and controlled as CQAs; (2) Fab glycans are particularly exposed to immune recognition; (3) Host cell line selection (SP2/0 vs CHO — CHO lacks functional GGTA1) directly impacts glycan safety profiles.',
    },
    {
      type: 'card',
      title: 'Developability Assessment — Fab Glycan Risk Scoring',
      color: 'amber',
      content:
        'During early-stage antibody candidate selection, Fab glycosylation sites should be identified and risk-scored as part of the developability assessment. The risk scoring framework considers: (1) Sequon location — CDR sites (high risk) vs framework sites (moderate risk). CDR1 and CDR2 sites are higher risk than CDR3 because CDR3 loop flexibility may accommodate the glycan without steric interference. (2) Occupancy prediction — in silico tools (NetNGlyc, N-GlyDE) can predict site occupancy based on local sequence context and structural features. Sites predicted to be partially occupied (<80%) create additional heterogeneity that complicates analytical characterisation. (3) Glycan impact on binding — if the glycan is within 5-8 angstroms of predicted paratope residues (assessed by homology modelling), functional impact is likely and must be experimentally confirmed. (4) Removability — can the sequon be mutated (e.g., Asn → Gln, Thr → Ala in NxT) without affecting binding affinity? If yes, sequon removal during lead optimisation simplifies downstream CMC development. If no (glycan contributes to binding), the glycan becomes a permanent feature requiring specification control throughout the product lifecycle.',
    },
    {
      type: 'bullets',
      title: 'CMC Implications — Fab Glycosylation in Manufacturing',
      items: [
        'Additional glycan heterogeneity: Fab glycosylation adds a second (or third, if both VH and VL have sites) glycosylation site, each with its own glycoform distribution. This multiplies the number of molecular variants — an IgG with Fc + Fab glycosylation has (N_Fc × N_Fab) glycoform combinations, producing highly heterogeneous product that is more challenging to characterise and control.',
        'Site-specific specifications: Regulatory agencies may require separate glycan CQA specifications for Fab and Fc sites if functional impact differs between sites. This doubles the glycan analytical testing required at release.',
        'Fab glycan-specific CQAs: If the Fab glycan affects binding (CDR site) or safety (α-Gal, Neu5Gc content), it requires its own CQA designation with independent specification, control strategy, and stability trending.',
        'Process sensitivity: Fab and Fc glycans may respond differently to the same CPP changes. For example, lowering culture pH may increase galactosylation at both sites, but the magnitude of change may differ because of differences in steric accessibility. Site-specific DoE characterisation may be needed.',
        'Biosimilar complexity: For biosimilars targeting reference products with Fab glycosylation, analytical similarity must be demonstrated for both Fab and Fc glycan profiles independently — increasing the analytical burden and potentially narrowing the similarity margins.',
        'Stability monitoring: Fab glycans (being more sialylated) are more susceptible to sialic acid loss during storage, potentially exposing terminal galactose that triggers ASGPR-mediated clearance. Stability studies should include site-specific glycan profiling at each timepoint, not just total glycan analysis.',
      ],
    },
  ],
  mentorQuestions: [
    'During lead candidate selection, you identify an NxT sequon in HCDR2 of your top candidate. Walk through your risk assessment and decision process — would you advance or re-engineer?',
    'Explain why Fab glycans are more processed (higher Gal, higher SA) than Fc glycans, citing the structural basis and the implications for analytical characterisation.',
    'How does the cetuximab α-Gal case inform your choice of expression host cell line when your mAb candidate has a Fab glycosylation site?',
  ],
};

export default module12;
