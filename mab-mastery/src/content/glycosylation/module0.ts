import type { ModuleContent } from '../../types/content';

export const module0: ModuleContent = {
  id: 'glycosylation-m0',
  sectionId: 'glycosylation',
  moduleNumber: 0,
  eyebrow: 'GLYCOSYLATION 01',
  title: 'Why Glycans Matter',
  lead: 'Glycosylation is not decoration — it is the single most impactful quality attribute of a therapeutic mAb, controlling effector function, pharmacokinetics, immunogenicity, and structural stability.',
  tags: [
    { label: 'CQA', color: 'green' },
    { label: 'Effector Function', color: 'red' },
    { label: '30+ Glycoforms', color: 'teal' },
  ],
  stats: [
    { label: 'Glycoforms/Batch', value: '~30' },
    { label: 'ADCC Enhancement', value: 'Up to 50\u00d7' },
    { label: 'CH2 Tm Drop', value: '-10\u00b0C aglyco' },
    { label: 'Mass Contribution', value: '~2\u20133%' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Glycans Are Always CQAs',
      color: 'green',
      content:
        'Glycosylation at Asn297 (EU numbering) is invariably classified as a critical quality attribute (CQA) for every Fc-containing therapeutic. The rationale is fourfold. First, the N-glycan serves as a structural strut that maintains the open conformation of the CH2 domain pair \u2014 without it, the two CH2 domains collapse inward, reducing the Tm by approximately 10\u00b0C and abolishing the geometry required for Fc\u03b3 receptor engagement. Second, specific glycan features directly modulate effector functions: afucosylation enhances ADCC up to 50-fold, galactosylation modulates CDC, and sialylation confers anti-inflammatory properties. Third, the glycan profile influences pharmacokinetics through receptor-mediated clearance pathways (mannose receptor for high-mannose species, asialoglycoprotein receptor for terminal galactose). Fourth, non-human glycan epitopes \u2014 particularly \u03b1-Gal (Gal\u03b11,3-Gal) and Neu5Gc (N-glycolylneuraminic acid) \u2014 are immunogenic in humans and can provoke anti-drug antibody (ADA) responses. These four axes of impact mean that glycosylation cannot be excluded from the CQA list regardless of the molecule\u2019s mechanism of action.',
    },
    {
      type: 'card',
      title: 'Structural Role \u2014 The CH2 Domain Strut',
      color: 'blue',
      content:
        'X-ray crystallography of intact IgG1 Fc fragments (PDB 1HZH, Saphire et al. 2001) reveals that the two N297-linked glycans fill the inter-CH2 cavity, making approximately 30 non-covalent contacts with the protein surface of each CH2 domain. Key contact residues include Phe241, Phe243, Val264, Asp265, and Arg301 (all EU numbering), which form a hydrophobic platform and hydrogen-bond network that cradles the first two GlcNAc residues and the core fucose. When the glycan is removed \u2014 either enzymatically (PNGase F digestion) or genetically (N297Q mutation) \u2014 the CH2 domains lose this scaffolding and collapse toward each other, as demonstrated by small-angle X-ray scattering (SAXS) and hydrogen-deuterium exchange mass spectrometry (HDX-MS). The functional consequence is profound: the Fc\u03b3R binding site, which spans the lower hinge and upper CH2 domain (residues L234\u2013G236, D265, and the adjacent loops), is disrupted. DSC measurements confirm a reduction in CH2 Tm from approximately 72\u00b0C to 62\u00b0C upon deglycosylation, while Fab and CH3 transitions remain unaffected.',
    },
    {
      type: 'card',
      title: 'Asymmetric Glycosylation',
      color: 'teal',
      content:
        'A critical concept often underappreciated in CMC is that the two heavy chains within a single IgG molecule can carry different glycoforms at their respective Asn297 sites. This asymmetric glycosylation means that the total number of distinct molecular species in a batch is not simply the number of unique glycan structures, but rather the number of unique pairwise combinations. If a batch contains N distinct glycan species, the number of possible glycoform combinations is N(N+1)/2 (accounting for the indistinguishability of the two chains in a symmetric molecule). For a typical CHO-expressed IgG1 with approximately 8 major glycan species (G0F, G1F, G1F\u2019, G2F, Man5, G0, G1F-GlcNAc, G0F-GlcNAc), this yields 8 \u00d7 9 / 2 = 36 distinct molecular species. Each glycoform pair presents a potentially different Fc\u03b3R engagement surface, since the two glycans cooperatively interact with the single Fc\u03b3R molecule at the CH2-CH2 junction. Intact mass spectrometry can resolve some of these glycoform pairs, but complete characterisation requires released glycan analysis (HILIC-FLR) combined with site-specific glycopeptide mapping.',
    },
    {
      type: 'card',
      title: 'Effector Function Modulation \u2014 The Fucosylation Axis',
      color: 'red',
      content:
        'The most potent glycan-mediated effector function modulation is afucosylation. Shields et al. (J. Biol. Chem. 277:26733, 2002) demonstrated that removal of core \u03b11,6-linked fucose from the Asn297 glycan increases binding affinity for Fc\u03b3RIIIa (CD16a) by approximately 50-fold and enhances antibody-dependent cellular cytotoxicity (ADCC) by a corresponding magnitude. The mechanism involves a steric clash at the Fc\u2013Fc\u03b3RIIIa interface: the receptor itself is glycosylated at Asn162, and when the Fc carries core fucose, the fucose residue sterically interferes with the Asn162 glycan of the receptor (PDB 3SGJ, Ferrara et al. 2011). Removing the Fc fucose eliminates this clash and allows closer engagement. This discovery drove the development of glyco-engineered platforms including Roche\u2019s GlycoMAb technology (MGAT3 overexpression to produce bisecting GlcNAc, which inhibits FUT8 action) and BioWa\u2019s POTELLIGENT platform (FUT8-knockout CHO cells). Obinutuzumab (Gazyva), an anti-CD20 type II antibody manufactured using GlycoMAb technology, was the first glyco-engineered mAb approved by the FDA (2013).',
    },
    {
      type: 'card',
      title: 'Aglycosylation \u2014 Complete Effector Silencing',
      color: 'purple',
      content:
        'Complete removal of the Asn297 glycan \u2014 by mutation (N297A, N297Q, N297G), enzymatic treatment (PNGase F), or expression in the presence of tunicamycin (an inhibitor of ALG7/DPAGT1, the first step of dolichol pathway) \u2014 results in near-complete loss of Fc\u03b3R binding and abolition of ADCC, ADCP, and CDC. Tao and Morrison (J. Immunol. 143:2595, 1989) first demonstrated that aglycosylated IgG1 retains antigen binding but loses all effector functions. Mechanistically, without the glycan strut, the CH2 domains collapse (see Structural Role section), distorting the L234/L235/G236 lower hinge region that constitutes the primary Fc\u03b3R contact surface. Additionally, the aglycosylated Fc cannot engage C1q because the P329/P331 face is also distorted. Importantly, aglycosylation does NOT affect FcRn binding (which occurs at the CH2\u2013CH3 interface, distant from Asn297) and therefore does not alter serum half-life. This property has been exploited to create "effector-silent" formats for blocking/antagonist antibodies (e.g., some T-cell engager scaffolds) where Fc\u03b3R engagement is undesirable.',
    },
    {
      type: 'card',
      title: 'PK Impact \u2014 High-Mannose Clearance',
      color: 'amber',
      content:
        'High-mannose glycoforms (Man5, Man6, Man7, Man8, Man9) are cleared more rapidly from circulation than complex-type glycoforms. Goetze et al. (Glycobiology 21:949, 2011) provided the first human clinical evidence: radiolabeled high-mannose-enriched IgG1 fractions showed approximately 2-fold faster clearance than the corresponding complex-type fractions in healthy volunteers. The clearance mechanism involves the mannose receptor (CD206/MRC1), a C-type lectin expressed on macrophages, dendritic cells, and hepatic sinusoidal endothelial cells. CD206 recognises terminal \u03b11,2-linked mannose residues, a pattern normally associated with microbial surfaces (bacteria, fungi). Because high-mannose glycoforms retain terminal mannose residues that are not processed by Golgi enzymes, they are perceived as "non-self" and cleared via receptor-mediated endocytosis. At high antibody doses, the mannose receptor pathway can be saturated, partially mitigating the PK difference \u2014 but at lower doses the effect is clinically significant.',
    },
    {
      type: 'card',
      title: 'Immunogenicity Risk \u2014 Non-Human Glycan Epitopes',
      color: 'red',
      content:
        'CHO cells, the dominant expression host for therapeutic mAbs, are generally considered "human-compatible" for glycosylation because they do not express the enzymes responsible for the two most immunogenic non-human glycan epitopes. The first is \u03b1-Gal (Gal\u03b11,3-Gal\u03b21,4-GlcNAc), synthesised by \u03b11,3-galactosyltransferase (GGTA1), which is inactivated in humans but active in non-primate mammals (mouse myeloma lines like NS0 and Sp2/0 do express functional GGTA1). Anti-\u03b1-Gal antibodies constitute approximately 1% of circulating IgG in humans and can trigger hypersensitivity reactions. The second is Neu5Gc (N-glycolylneuraminic acid), synthesised by CMP-Neu5Ac hydroxylase (CMAH), which is also inactivated in humans. CHO cells lack functional CMAH, but they can incorporate trace amounts of Neu5Gc from bovine-derived culture media components (e.g., bovine serum albumin, peptone). Most humans carry circulating anti-Neu5Gc antibodies at low titres. These non-human epitopes are evaluated during host cell line selection and media optimisation as part of CQA risk assessment.',
    },
    {
      type: 'table',
      title: 'Glycan Species and Functional Impact',
      headers: ['Glycan Feature', 'Key Species', 'Primary Impact', 'Mechanism', 'Magnitude', 'Key Reference'],
      rows: [
        ['Core fucose', 'G0F, G1F, G2F', 'ADCC suppression', 'Steric clash with Fc\u03b3RIIIa Asn162 glycan', '10\u201350\u00d7 reduction', 'Shields 2002'],
        ['Afucosylation', 'G0, G1, G2', 'ADCC enhancement', 'Eliminates steric clash at Fc\u03b3RIIIa', 'Up to 50\u00d7 increase', 'Shinkawa 2003'],
        ['High mannose', 'Man5\u2013Man9', 'Faster PK clearance', 'CD206 mannose receptor binding', '~2\u00d7 faster clearance', 'Goetze 2011'],
        ['Galactosylation', 'G2F vs G0F', 'CDC enhancement', 'Improved C1q engagement', 'Moderate', 'Hodoniczky 2005'],
        ['Sialylation', 'G2FS1, G2FS2', 'Anti-inflammatory', 'DC-SIGN \u2192 FcyRIIb upregulation', 'Context-dependent', 'Anthony 2008'],
        ['Bisecting GlcNAc', 'G0F+bisect', 'ADCC enhancement', 'Inhibits FUT8 core fucosylation', 'Indirect', 'Umana 1999'],
        ['Aglycosylation', 'None (N297 free)', 'Effector silencing', 'CH2 collapse, Fc\u03b3R loss', 'Complete loss', 'Tao 1989'],
        ['\u03b1-Gal', 'Terminal Gal\u03b11,3-Gal', 'Immunogenicity', 'Anti-\u03b1-Gal IgE/IgG response', 'Hypersensitivity risk', 'Chung 2008'],
        ['Neu5Gc', 'Sialic acid variant', 'Immunogenicity', 'Anti-Neu5Gc antibody binding', 'Variable', 'Ghaderi 2010'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: 'Regulatory Expectation \u2014 ICH Q6B and Q8',
      variant: 'warning',
      content:
        'ICH Q6B (Specifications: Test Procedures and Acceptance Criteria for Biotechnological/Biological Products) explicitly requires characterisation of oligosaccharide patterns including "antennary profile, including the degree of branching, and the identification of the types of oligosaccharide chains (neutral, sialylated, etc.)." ICH Q8(R2) (Pharmaceutical Development) expects that glycosylation is evaluated as part of CQA assessment using prior knowledge, risk assessment, and experimental data. The FDA\u2019s 2015 Guidance for Industry on biosimilar analytical similarity studies lists glycan profile as a Tier 1 analytical attribute requiring the most rigorous statistical comparison. In practice, this means every IND/BLA filing must include: (1) released N-glycan profiling by HILIC-FLR with mass confirmation, (2) site-specific glycopeptide mapping by LC-MS/MS, (3) functional correlation of glycan variants to effector function, PK, and safety endpoints.',
    },
    {
      type: 'bullets',
      title: 'CQA Classification Rationale by Mechanism of Action',
      color: 'teal',
      items: [
        'ADCC-dependent mAbs (e.g., rituximab, trastuzumab): Fucosylation is the primary CQA driver. Afucosylated species directly enhance the intended mechanism of action. Tight specification limits on %afucosylation are typical.',
        'CDC-dependent mAbs (e.g., ofatumumab): Galactosylation becomes a key CQA in addition to fucosylation. G2F species enhance C1q binding and complement activation.',
        'Blocking/antagonist mAbs (e.g., nivolumab, pembrolizumab): Effector function is not part of the mechanism of action, but glycosylation remains a CQA for PK (high-mannose clearance), immunogenicity (Neu5Gc), and structural integrity.',
        'Fc-fusion proteins (e.g., etanercept, abatacept): Additional O-glycosylation sites and multiple N-glycosylation sites beyond Asn297 increase glycan heterogeneity and CQA complexity.',
        'Bispecific antibodies: Asymmetric formats may have differential glycosylation on each arm/Fc, requiring arm-specific glycan characterisation.',
        'ADCs (antibody-drug conjugates): Glycosylation at Asn297 can serve as a conjugation site (e.g., GlycoConnect technology), making glycan homogeneity directly linked to DAR consistency.',
      ],
    },
    {
      type: 'card',
      title: 'Batch-to-Batch Variability \u2014 Process Sensitivity',
      color: 'amber',
      content:
        'Glycosylation is among the most process-sensitive quality attributes of a mAb. Subtle changes in cell culture conditions \u2014 dissolved oxygen, pH, temperature, osmolality, glucose and glutamine feed concentrations, ammonia accumulation, and Mn\u00b2\u207a trace metal levels \u2014 can shift the glycan profile significantly. For example, a 0.5\u00b0C temperature shift in production bioreactors can alter galactosylation by 5\u201310% relative. Glucose limitation below 0.5 g/L drives high-mannose accumulation because UDP-GlcNAc levels drop, starving GnTI (MGAT1) of its nucleotide sugar donor. Ammonia accumulation above 5\u201310 mM raises Golgi pH, disrupting enzyme activity gradients across the cis\u2013medial\u2013trans compartments. These sensitivities make glycosylation the quality attribute most likely to shift during process scale-up, site transfer, or manufacturing changes \u2014 and therefore the one most frequently cited in post-approval change comparability assessments.',
    },
    {
      type: 'table',
      title: 'Typical IgG1 Glycan Profile from CHO \u2014 Benchmark Ranges',
      headers: ['Glycan Species', 'Typical Range (%)', 'CQA Relevance', 'Primary Functional Impact'],
      rows: [
        ['G0F', '30\u201350%', 'Dominant species', 'Baseline effector function'],
        ['G1F (total)', '20\u201335%', 'Galactosylation marker', 'Moderate CDC modulation'],
        ['G2F', '5\u201315%', 'High galactosylation', 'Enhanced CDC, ASGPR risk'],
        ['Man5', '2\u20138%', 'Always CQA', 'Faster clearance via CD206'],
        ['Afucosylated (total)', '2\u20136%', 'ADCC driver', 'Enhanced Fc\u03b3RIIIa binding'],
        ['Sialylated (total)', '2\u20138%', 'Anti-inflammatory', 'DC-SIGN engagement'],
        ['G0F-GlcNAc', '1\u20134%', 'Processing variant', 'Reduced effector function'],
        ['G0 (no fucose)', '1\u20133%', 'Afucosylated species', 'Enhanced ADCC'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: 'The 2\u20133% Mass Contribution That Controls Everything',
      variant: 'info',
      content:
        'The two N-glycans at Asn297 contribute only approximately 2\u20133% of the total molecular mass of an IgG (~3 kDa out of ~150 kDa). Yet this small carbohydrate component controls all Fc\u03b3 receptor interactions, complement activation, serum half-life, and a significant fraction of immunogenicity risk. No other post-translational modification on any protein has such a disproportionate functional impact relative to its mass. This is why glycosylation dominates CQA discussions, drives biosimilarity assessments, and is the quality attribute most likely to trigger regulatory questions at any stage from IND through post-approval changes.',
    },
  ],
  mentorQuestions: [
    'If glycosylation is always a CQA regardless of mechanism of action, why do some companies argue that glycan profile specifications should differ between an ADCC-dependent and a blocking antibody?',
    'Explain how asymmetric glycosylation complicates biosimilarity assessment. What analytical strategy would you propose to address this?',
    'A process deviation causes a batch to shift from 4% to 12% high-mannose species. Walk through the CQA impact assessment you would perform before making a lot disposition decision.',
  ],
};
