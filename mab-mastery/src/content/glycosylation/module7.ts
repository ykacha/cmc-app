import type { ModuleContent } from '../../types/content';

export const module7: ModuleContent = {
  id: 'glycosylation-m7',
  sectionId: 'glycosylation',
  moduleNumber: 7,
  eyebrow: 'GLYCOSYLATION 08',
  title: 'Sialylation',
  lead: 'The anti-inflammatory sugar \u2014 how terminal sialic acid modulates Fc function through DC-SIGN, the \u03B12,6 vs \u03B12,3 linkage biology, and why CHO cells under-sialylate.',
  tags: [
    { label: 'ST6Gal1', color: 'teal' },
    { label: 'DC-SIGN', color: 'purple' },
    { label: 'Anti-inflammatory', color: 'green' },
    { label: 'IVIG', color: 'blue' },
  ],
  stats: [
    { label: 'Key Discovery', value: 'Anthony 2008' },
    { label: 'Pathway', value: 'DC-SIGN/CD209' },
    { label: 'ADCC Reduction', value: '2\u20133\u00D7' },
    { label: 'CHO Linkage', value: '\u03B12,3 dominant' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Sialylation \u2014 The Terminal Cap of the Glycan Cascade',
      color: 'teal',
      content:
        'Sialylation is the final step in the Golgi enzyme cascade, adding N-acetylneuraminic acid (Neu5Ac, sialic acid) to terminal galactose residues via sialyltransferases. For IgG Fc glycans, sialylation produces mono-sialylated (S1: one sialic acid on one arm) and di-sialylated (S2: sialic acid on both arms) species, designated G2FS1 and G2FS2 in Oxford notation. Sialylation requires prior galactosylation \u2014 only galactose-capped arms are substrates for sialyltransferases \u2014 so the extent of sialylation is directly limited by galactosylation. In CHO-produced IgG1, total sialylation is typically low: 1\u201315% S1, <2% S2, reflecting both the low galactosylation baseline and the steric constraints of the CH2 glycan pocket that limit sialyltransferase access. Sialylation is functionally significant because terminal sialic acid: (1) masks the underlying galactose from ASGPR recognition, preventing hepatic clearance; (2) introduces a negative charge that modulates charge variant profiles (each Neu5Ac adds one negative charge); (3) reduces Fc\u03B3R binding affinity, decreasing ADCC potency; and (4) confers anti-inflammatory properties through the DC-SIGN pathway, the mechanistic basis of IVIG\u2019s anti-inflammatory activity.',
    },
    {
      type: 'card',
      title: 'Anthony 2008 \u2014 The Anti-Inflammatory IgG Discovery',
      color: 'blue',
      content:
        'Anthony et al. (Science, 2008, "Recapitulation of IVIG Anti-Inflammatory Activity with a Recombinant IgG Fc") made the landmark discovery that the anti-inflammatory activity of intravenous immunoglobulin (IVIG) resides in the \u03B12,6-sialylated Fc fraction. IVIG is pooled human IgG from >1000 donors, used at high doses (1\u20132 g/kg) to treat autoimmune and inflammatory conditions (ITP, Kawasaki disease, CIDP, GBS). The mechanism of IVIG\u2019s anti-inflammatory activity had been debated for decades. Anthony et al. demonstrated that: (1) enrichment of the \u03B12,6-sialylated Fc fraction from IVIG (approximately 5\u201310% of total IgG) recapitulated the full anti-inflammatory activity at 10-fold lower doses; (2) removal of sialic acid by neuraminidase treatment abolished the anti-inflammatory activity; (3) a recombinant IgG1 Fc fragment enzymatically sialylated with \u03B12,6-linked Neu5Ac was sufficient to suppress inflammation in murine arthritis and nephritis models; (4) the \u03B12,6-sialylated Fc bound to DC-SIGN (CD209) on splenic marginal zone macrophages, initiating an anti-inflammatory signalling cascade. This work established \u03B12,6-sialylation as a functional switch that converts IgG from a pro-inflammatory (ADCC/CDC-active) to an anti-inflammatory (DC-SIGN-engaging) molecule.',
    },
    {
      type: 'card',
      title: 'DC-SIGN/CD209 Pathway \u2014 The Anti-Inflammatory Signalling Cascade',
      color: 'purple',
      content:
        'DC-SIGN (dendritic cell-specific intercellular adhesion molecule-3-grabbing non-integrin, CD209) is a C-type lectin receptor expressed on dendritic cells and macrophage subsets, particularly splenic marginal zone macrophages and dermal dendritic cells. DC-SIGN recognises high-mannose glycans and fucose-containing structures, but the Anthony group showed it also binds \u03B12,6-sialylated Fc through a distinct binding mode involving the sialic acid\u2013galactose disaccharide. The proposed signalling cascade following \u03B12,6-sialylated Fc binding to DC-SIGN is: (1) DC-SIGN engagement on marginal zone macrophages triggers production of IL-33; (2) IL-33 acts on basophils (via ST2/IL-33R) to induce IL-4 secretion; (3) IL-4 upregulates the inhibitory Fc\u03B3RIIb (CD32b) on effector macrophages; (4) increased Fc\u03B3RIIb raises the inhibitory-to-activating Fc\u03B3R ratio, dampening immune complex-driven inflammation. This pathway shifts the effector macrophage response from pro-inflammatory (phagocytosis, cytokine release) to tolerogenic. However, the DC-SIGN pathway remains debated: (a) human DC-SIGN orthologue specificity differs from the murine SIGN-R1 used in many studies; (b) some groups have not reproduced the sialylation-dependent anti-inflammatory effect; (c) the stoichiometry of \u03B12,6-sialylated Fc required for in vivo efficacy remains unclear.',
    },
    {
      type: 'card',
      title: '\u03B12,6 vs \u03B12,3 Linkage \u2014 Species-Specific Sialyltransferase Biology',
      color: 'green',
      content:
        'The biological linkage of sialic acid to galactose is a critical determinant of function. In humans, the predominant IgG Fc sialyltransferase is ST6Gal1 (ST6GAL1 gene), which adds Neu5Ac via an \u03B12,6 linkage to galactose. Human-derived IgG (from serum or HEK293 cell expression) therefore carries \u03B12,6-linked sialic acid, which is the linkage associated with DC-SIGN binding and anti-inflammatory activity. CHO cells, however, do not express functional ST6GAL1. Instead, CHO cells express ST3Gal4 (ST3GAL4) and ST3Gal6 (ST3GAL6), which add Neu5Ac via \u03B12,3 linkage. The \u03B12,3-linked sialic acid has not been demonstrated to bind DC-SIGN or to confer anti-inflammatory activity in the same manner as \u03B12,6-linked. This linkage difference means that sialylated CHO-derived mAbs may not reproduce the anti-inflammatory biology observed with human \u03B12,6-sialylated IgG. Several engineering strategies address this gap: (1) stable overexpression of human ST6GAL1 in CHO cells (demonstrated by multiple groups, including Roche and Genentech); (2) in-vitro enzymatic sialylation with recombinant ST6Gal1 + CMP-Neu5Ac post-purification; (3) use of human cell lines (HEK293, PER.C6) that natively express ST6GAL1. For mAbs where sialylation is not part of the MoA, the \u03B12,3 vs \u03B12,6 distinction is less relevant, and total sialylation is monitored primarily for charge heterogeneity and ASGPR clearance considerations.',
    },
    {
      type: 'table',
      title: 'Sialylation \u2014 Functional Effects on IgG Properties',
      headers: ['Property', '\u03B12,6-Sialylated Effect', '\u03B12,3-Sialylated Effect', 'Mechanism', 'Key Reference'],
      rows: [
        ['Anti-inflammatory activity', 'Enhanced (DC-SIGN pathway)', 'Not demonstrated', 'DC-SIGN binding on marginal zone macrophages', 'Anthony 2008 (Science)'],
        ['Fc\u03B3RIIIa binding (ADCC)', 'Reduced 2\u20133\u00D7', 'Reduced 2\u20133\u00D7', 'Sialic acid alters CH2 conformation; reduces Fc\u03B3RIIIa contact', 'Scallon 2007'],
        ['Fc\u03B3RI binding', 'Reduced ~1.5\u00D7', 'Reduced ~1.5\u00D7', 'Modest CH2 conformational effect', 'Kaneko 2006'],
        ['C1q binding / CDC', 'Reduced ~1.5\u20132\u00D7', 'Reduced ~1.5\u20132\u00D7', 'Sialic acid bulk may partially occlude C1q contact region', 'Quast 2015'],
        ['FcRn binding (PK)', 'Unchanged', 'Unchanged', 'FcRn site is at CH2\u2013CH3 interface; glycan-independent', 'Multiple'],
        ['ASGPR clearance', 'Protective (caps galactose)', 'Protective (caps galactose)', 'Sialic acid blocks ASGPR recognition of terminal galactose', 'Ashwell & Harford 1982'],
        ['Charge profile (icIEF/CEX)', 'Shifts acidic (+1 charge per Neu5Ac)', 'Shifts acidic (+1 charge per Neu5Ac)', 'Carboxyl group on Neu5Ac at physiological pH', 'N/A (physical property)'],
        ['Thermal stability (DSC)', 'Unchanged to slight increase', 'Unchanged', 'Sialic acid may slightly stabilise CH2 open conformation', 'Zheng 2011'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Why CHO Cells Under-Sialylate IgG Fc',
      color: 'amber',
      content:
        'CHO-produced IgG typically shows only 1\u201315% total sialylation (S1 + S2), far below the theoretical maximum of 100% (if both galactose residues on G2F were fully sialylated). Multiple factors contribute to this under-sialylation: (1) Galactosylation prerequisite: sialylation requires terminal galactose, and CHO IgG is predominantly G0F (30\u201350%), which has no galactose acceptor sites. Only the G1F and G2F fractions are sialylation-competent, immediately limiting the theoretical maximum. (2) Steric constraints: the N297 glycan sits within the CH2\u2013CH2 inter-domain space, and sialyltransferases (being larger enzymes than galactosyltransferases) have limited access to the glycan tips within this cavity. Soluble glycoprotein glycans in CHO conditioned media are typically >50% sialylated, confirming that the enzyme is active but the Fc substrate is poorly accessible. (3) Wrong enzyme: CHO cells express ST3Gal4/6 (\u03B12,3 linkage) rather than ST6Gal1 (\u03B12,6 linkage). ST3Gal4 may have different kinetics and substrate preferences compared to ST6Gal1 for the Fc glycan context. (4) CMP-Neu5Ac availability: cytoplasmic CMP-Neu5Ac synthesis and Golgi luminal transport (SLC35A1) may be rate-limiting in CHO cells under high secretion rates. (5) Sialidase release from lysed cells: in late-stage fed-batch culture, sialidase (neuraminidase) released from dead cells cleaves terminal sialic acid from the secreted product, reducing net sialylation over time.',
    },
    {
      type: 'card',
      title: 'Neu5Gc \u2014 The Non-Human Sialic Acid Risk',
      color: 'red',
      content:
        'N-glycolylneuraminic acid (Neu5Gc) is a sialic acid variant found in most mammals but not in humans due to an inactivating mutation in the CMAH gene (CMP-Neu5Ac hydroxylase). CHO cells, being hamster-derived, express functional CMAH and can incorporate Neu5Gc onto glycoprotein glycans. CHO-produced mAbs may carry 1\u20135% Neu5Gc relative to total sialic acid, depending on cell culture conditions (bovine serum-free media reduces Neu5Gc compared to serum-containing media, because fetal bovine serum is a rich Neu5Gc source). Humans naturally produce circulating anti-Neu5Gc antibodies (predominantly IgG and IgM) at variable levels, likely from dietary exposure to red meat and dairy. These pre-existing anti-Neu5Gc antibodies can theoretically form immune complexes with Neu5Gc-bearing therapeutic mAbs, potentially accelerating clearance and increasing immunogenicity risk. The clinical significance of Neu5Gc on therapeutic mAbs remains debated: (1) the total Neu5Gc content per mAb molecule is very low (<0.1 mol Neu5Gc per mol IgG in typical CHO processes); (2) no clinical adverse events have been definitively attributed to Neu5Gc immunogenicity; (3) however, regulatory agencies expect Neu5Gc to be characterised and monitored as part of the glycan CQA assessment. Neu5Gc is detected by HPAEC-PAD monosaccharide analysis or by LC-MS/MS after sialic acid release with mild acid (2 M acetic acid, 80\u00B0C, 2 hours). CMAH knockout CHO cell lines have been generated to eliminate Neu5Gc entirely.',
    },
    {
      type: 'table',
      title: 'Engineering Strategies for Enhanced Sialylation',
      headers: ['Strategy', 'Approach', 'Expected Sialylation', 'Linkage', 'Advantages', 'Limitations'],
      rows: [
        ['ST6GAL1 overexpression in CHO', 'Stable transfection of human ST6GAL1', '15\u201340% S1+S2', '\u03B12,6', 'Single cell line; in-process control', 'Still limited by galactosylation and Fc steric constraints'],
        ['ST6GAL1 + B4GALT1 co-overexpression', 'Dual gene overexpression', '30\u201360% S1+S2', '\u03B12,6', 'Addresses galactose prerequisite', 'May reduce titre; complex cell line development'],
        ['In-vitro enzymatic sialylation', 'Recombinant ST6Gal1 + CMP-Neu5Ac post-purification', '>80% S1+S2 (from G2F starting material)', '\u03B12,6', 'Maximum control; decoupled from cell culture', 'Additional DS step; enzyme removal; cost'],
        ['CMP-Neu5Ac feed supplementation', 'Add CMP-Neu5Ac to cell culture media', '5\u201315% increase over baseline', '\u03B12,3 (CHO native)', 'Simple process change', 'CMP-Neu5Ac is expensive; cell permeability issues'],
        ['ManNAc feed supplementation', 'N-acetylmannosamine precursor for CMP-Neu5Ac', '5\u201310% increase over baseline', '\u03B12,3 (CHO native)', 'Inexpensive precursor; cell-permeable', 'Moderate effect; indirect pathway'],
        ['Human cell lines (HEK293, PER.C6)', 'Native human glycosylation machinery', '10\u201325% S1+S2', '\u03B12,6 (native)', 'Correct linkage; no engineering needed', 'Lower titre than CHO; limited platform experience'],
        ['CMAH knockout + ST6GAL1 OE', 'Eliminate Neu5Gc and add \u03B12,6 sialylation', '15\u201340% S1+S2 (Neu5Gc-free)', '\u03B12,6', 'Eliminates Neu5Gc risk; correct linkage', 'Complex cell line; two genetic modifications'],
      ],
      sortable: true,
    },
    {
      type: 'bullets',
      title: 'Sialylation as a CQA \u2014 Context-Dependent Classification',
      color: 'purple',
      items: [
        'IVIG replacement / anti-inflammatory: sialylation is a Tier 1 CQA. The anti-inflammatory MoA directly requires \u03B12,6-sialylated Fc. Specifications must control total sialylation, \u03B12,6 vs \u03B12,3 linkage ratio, and Neu5Gc content. The Momenta (now Janssen) sialylated Fc programme exemplifies this approach.',
        'ADCC-dependent oncology mAbs: sialylation is typically a Tier 2\u20133 attribute. Sialic acid reduces ADCC 2\u20133-fold, so high sialylation is undesirable but naturally limited in CHO processes (<15%). Monitor and trend; no tight specification needed because CHO under-sialylation is inherently self-limiting.',
        'CDC-dependent mAbs: sialylation is Tier 2. Sialic acid modestly reduces C1q binding (~1.5\u20132\u00D7). For rituximab-type products where CDC contributes to efficacy, monitor sialylation but recognise the effect is much smaller than the galactosylation\u2013CDC relationship.',
        'Blocking/neutralising mAbs (no effector function): sialylation is Tier 2\u20133. Impact is limited to charge profile consistency and theoretical ASGPR/PK considerations. Specifications are set for batch-to-batch consistency rather than functional thresholds.',
        'Fc fusion proteins: sialylation is often Tier 1\u20132 due to ASGPR clearance risk. Multi-glycosylated Fc fusions with exposed glycans (e.g., etanercept) are more susceptible to ASGPR-mediated clearance when desialylated. Terminal sialic acid is protective, making sialylation a positive CQA.',
        'Biosimilar context: sialylation profile (total %, linkage, Neu5Gc) must match the innovator quality range. Linkage analysis (\u03B12,6 vs \u03B12,3) by HPLC after sialidase-A (cleaves \u03B12,3 only) vs sialidase-AU (cleaves all linkages) is part of the characterisation package.',
      ],
    },
    {
      type: 'callout',
      title: 'The IVIG Mechanism Debate \u2014 Settled or Ongoing?',
      variant: 'warning',
      content:
        'The Anthony 2008 discovery that \u03B12,6-sialylated Fc mediates IVIG\u2019s anti-inflammatory activity remains one of the most debated findings in glycoimmunology. Supporting evidence includes: sialylated Fc recapitulates IVIG activity at 10-fold lower doses in multiple murine models; the DC-SIGN\u2192IL-33\u2192basophil\u2192IL-4\u2192Fc\u03B3RIIb upregulation cascade has been mapped; and clinical-grade hyper-sialylated IgG preparations show enhanced anti-inflammatory potency. Contradicting evidence includes: some groups report that desialylated IVIG retains anti-inflammatory activity; the murine SIGN-R1 receptor used in many studies differs from human DC-SIGN in glycan specificity; the proportion of \u03B12,6-sialylated Fc in IVIG (~5\u201310%) seems too low for a primary MoA; and alternative mechanisms (Fc\u03B3RIIb cross-linking by intact IgG dimers, Fab-mediated effects, complement consumption) have also been proposed. The clinical translation is ongoing: Momenta (now Janssen) developed M254, a hyper-sialylated recombinant Fc with >90% \u03B12,6-sialylation, which entered Phase 1 for ITP. The clinical data from such programmes will ultimately determine whether \u03B12,6-sialylation is sufficient for IVIG replacement therapy. Regardless of the IVIG debate, the functional impact of sialylation on ADCC (2\u20133-fold reduction), charge heterogeneity, and ASGPR protection is well-established and informs CQA assessment for all therapeutic mAbs.',
    },
    {
      type: 'card',
      title: 'Analytical Methods for Sialylation Characterisation',
      color: 'blue',
      content:
        'Sialylation is quantified through multiple orthogonal analytical approaches. Released glycan profiling by HILIC-FLD resolves sialylated species (G1FS1, G2FS1, G2FS2) as distinct late-eluting peaks due to the polar sialic acid. However, sialic acid is labile during sample preparation \u2014 the glycosidic bond between Neu5Ac and Gal is acid-sensitive and can be cleaved during the PNGase F release step if pH drops below 5.0. Strict pH control (pH 7\u20138 throughout) is essential for accurate sialylation measurement. Weak anion exchange (WAX) chromatography separates glycans purely by charge (sialic acid count), providing a direct readout of neutral (G0F, G1F, G2F), mono-sialylated (S1), and di-sialylated (S2) fractions. Sialic acid linkage analysis uses differential sialidase treatment: \u03B12,3-specific sialidase (Sialidase S from Macrobdella decora) cleaves only \u03B12,3-linked Neu5Ac, while broad-specificity sialidase (Sialidase A from Arthrobacter ureafaciens) cleaves all linkages. Treating parallel aliquots with each sialidase and comparing the released glycan profiles reveals the \u03B12,6:\u03B12,3 ratio. For Neu5Gc quantitation, HPAEC-PAD (high-performance anion-exchange chromatography with pulsed amperometric detection) after mild acid release (2 M acetic acid, 80\u00B0C, 2 hours) provides baseline resolution of Neu5Ac and Neu5Gc, with a typical LOQ of ~0.1% relative to total sialic acid.',
    },
    {
      type: 'callout',
      title: 'Process Control of Sialylation \u2014 The Sialidase Problem',
      variant: 'danger',
      content:
        'One of the most significant process challenges for maintaining sialylation is the release of intracellular sialidases (neuraminidases) from lysed CHO cells during late-stage fed-batch culture. As cell viability decreases below 80\u201385%, lysosomal sialidases (primarily NEU1 and NEU3) are released into the conditioned media where they cleave terminal sialic acid from the secreted IgG product. The sialidase activity follows first-order kinetics with respect to viable cell density decline, and can reduce total sialylation by 30\u201370% during the final 2\u20133 days of a 14-day fed-batch culture. Mitigation strategies include: (1) harvesting at viability >80\u201385% (the single most effective lever); (2) adding sialidase inhibitors to the culture media (e.g., 2-deoxy-2,3-didehydro-N-acetylneuraminic acid, DANA, at 0.1\u20131 mM \u2014 but this is expensive and may have regulatory implications as a process additive); (3) rapid harvest processing to minimise hold time between harvest and Protein A capture; (4) low-temperature hold (2\u20138\u00B0C) of harvested cell culture fluid to slow sialidase activity. For products where sialylation is a Tier 1 CQA, the harvest viability criterion and post-harvest hold conditions must be rigorously controlled and validated.',
    },
  ],
  mentorQuestions: [
    'Your company is developing a hyper-sialylated Fc fragment for autoimmune indications, produced in ST6GAL1-overexpressing CHO cells. The product shows 45% \u03B12,6-sialylation and 15% \u03B12,3-sialylation. A regulatory reviewer asks why \u03B12,3-sialylated species should not be considered a product-related impurity that must be minimised. Construct the scientific argument for or against this position, referencing the functional differences between the two linkages.',
    'You are developing a biosimilar trastuzumab. The innovator (Herceptin) shows 3\u20135% total sialylation (predominantly \u03B12,6 from the human cell line), while your CHO-derived biosimilar shows 8\u201312% sialylation (\u03B12,3 dominant). Assess the CQA risk of this difference for an ADCC-dependent anti-HER2 mAb, considering the opposing effects of sialylation on ADCC reduction versus ASGPR protection.',
    'During stability studies at 25\u00B0C/60% RH, your mAb shows a 50% decrease in total sialylation over 6 months (from 10% to 5%), while all other glycan species remain stable. Your stability-indicating method (HILIC-FLD) picks up the change. Investigate whether this is true chemical degradation or an analytical artifact, and describe the confirmatory experiments you would run.',
  ],
};
