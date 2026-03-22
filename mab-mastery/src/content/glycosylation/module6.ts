import type { ModuleContent } from '../../types/content';

export const module6: ModuleContent = {
  id: 'glycosylation-m6',
  sectionId: 'glycosylation',
  moduleNumber: 6,
  eyebrow: 'GLYCOSYLATION 07',
  title: 'High-Mannose & PK',
  lead: 'Why high-mannose glycoforms are always a CQA \u2014 the mannose receptor clearance mechanism, clinical PK evidence, and the ADCC paradox.',
  tags: [
    { label: 'Man5-9', color: 'teal' },
    { label: 'CD206', color: 'red' },
    { label: 'PK Impact', color: 'amber' },
    { label: 'Always CQA', color: 'green' },
  ],
  stats: [
    { label: 'Receptor', value: 'CD206 (MR)' },
    { label: 'PK Impact', value: 'Faster clearance' },
    { label: 'ADCC Effect', value: 'Slight enhancement' },
    { label: 'Key Paper', value: 'Goetze 2011' },
  ],
  sections: [
    {
      type: 'card',
      title: 'High-Mannose Glycoforms \u2014 Definition and Origin',
      color: 'teal',
      content:
        'High-mannose glycoforms (Man5, Man6, Man7, Man8, Man9) are N-linked glycans that have not undergone Golgi processing beyond the \u03B1-mannosidase I trimming stage. They retain the oligomannose structure characteristic of ER-exit glycans rather than the complex biantennary structure of fully processed IgG glycans. In CHO-produced IgG1, Man5 (Man\u2085GlcNAc\u2082) is the predominant high-mannose species at 2\u201310% of total glycans, representing glycans that reached the medial-Golgi but were not acted upon by GnTI (MGAT1) before exiting the Golgi in secretory vesicles. Higher mannose forms (Man6\u2013Man9) are typically present at <1\u20132% each, arising from glycans that exited even earlier in the Golgi processing pathway. The total high-mannose content is the sum of all Man5\u2013Man9 species and is always designated as a CQA for therapeutic mAbs because of its direct impact on pharmacokinetics through mannose receptor-mediated clearance. High-mannose species lack core fucose (FUT8 acts after GnTI/GnTII, which have not yet processed these glycans), which paradoxically gives them enhanced Fc\u03B3RIIIa binding \u2014 the "ADCC paradox" that complicates CQA risk assessment.',
    },
    {
      type: 'card',
      title: 'Mannose Receptor (CD206) \u2014 The Clearance Mechanism',
      color: 'red',
      content:
        'The mannose receptor (MR, CD206, gene MRC1) is a 175 kDa type I transmembrane C-type lectin expressed on macrophages, dendritic cells, hepatic sinusoidal endothelial cells, and Kupffer cells. It contains eight C-type lectin domains (CTLDs), of which CTLDs 4 and 5 are the primary carbohydrate recognition domains (CRDs) with specificity for terminal mannose, fucose, and N-acetylglucosamine residues in a calcium-dependent manner. The mannose receptor binds high-mannose glycans through multivalent interaction: the extended mannose antennae of Man5\u2013Man9 present multiple terminal \u03B11,2-linked mannose residues that engage multiple CTLDs simultaneously, achieving high-avidity binding (apparent K\u2084 in the low nanomolar range for multivalent ligands versus millimolar for monovalent mannose). Upon binding, the mannose receptor mediates clathrin-dependent endocytosis, routing the ligand to early endosomes and subsequently to lysosomes for degradation. The receptor itself is recycled to the cell surface with a half-life of approximately 15\u201330 minutes. For IgG bearing high-mannose glycans, this creates a non-FcRn-dependent clearance pathway that operates in parallel with the normal FcRn-mediated recycling pathway, effectively reducing the fraction of IgG that is rescued by FcRn and accelerating net clearance.',
    },
    {
      type: 'card',
      title: 'Goetze 2011 \u2014 Clinical PK Evidence',
      color: 'amber',
      content:
        'Goetze et al. (Glycobiology, 2011, "High-mannose glycans on the Fc region of therapeutic IgG antibodies increase serum clearance in humans") provided the definitive clinical evidence linking high-mannose content to faster PK clearance. They analysed the glycan composition and PK parameters of multiple clinical-stage mAbs and demonstrated that: (1) mAbs with elevated Man5 content (>10%) showed measurably faster serum clearance (shorter terminal half-life) compared to matched batches with lower Man5; (2) the clearance acceleration was proportional to high-mannose content, with each 5% increase in Man5 associated with approximately 10\u201320% faster clearance (molecule-dependent); (3) the effect was consistent across multiple target antigens and IgG1 frameworks, indicating a glycan-intrinsic mechanism rather than target-mediated disposition; (4) the faster clearance was attributed to mannose receptor-mediated uptake by hepatic sinusoidal endothelium and Kupffer cells, as demonstrated by co-administration studies with mannan (a mannose receptor competitor) in preclinical models. The Goetze data established high-mannose as a universal CQA for therapeutic IgG \u2014 regardless of the mechanism of action, elevated Man5 reduces drug exposure and potentially compromises efficacy.',
    },
    {
      type: 'table',
      title: 'High-Mannose Impact on PK and Effector Function',
      headers: ['Parameter', 'Standard IgG1 (Man5 3\u20135%)', 'Elevated Man5 (10\u201315%)', 'High Man5 (>20%)', 'Mechanism'],
      rows: [
        ['Terminal half-life', '~18\u201321 days', '~15\u201318 days', '~10\u201315 days', 'Mannose receptor clearance competes with FcRn recycling'],
        ['AUC (dose-normalised)', 'Reference', '~80\u201390% of reference', '~60\u201375% of reference', 'Reduced net FcRn-mediated recycling'],
        ['C_trough (steady-state)', 'Reference', '~75\u201390% of reference', '~50\u201370% of reference', 'Clinically relevant for target coverage'],
        ['Fc\u03B3RIIIa V158 binding', 'Reference (fucosylated)', '~2\u20135\u00D7 enhanced', '~5\u201310\u00D7 enhanced', 'Man5 species lack core fucose \u2192 no steric clash'],
        ['ADCC (NK cell-based)', 'Reference', '~1.5\u20133\u00D7 enhanced', '~3\u20135\u00D7 enhanced', 'Afucosylated Man5 drives Fc\u03B3RIIIa engagement'],
        ['CDC (C1q binding)', 'Reference', '~0.8\u20131\u00D7 (neutral)', '~0.7\u20130.9\u00D7 (slight reduction)', 'Man5 alters CH2 conformation modestly'],
        ['FcRn binding (pH 6.0)', 'Reference', '~1\u00D7 (unchanged)', '~1\u00D7 (unchanged)', 'FcRn site is glycan-independent'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'The ADCC Paradox \u2014 Enhanced ADCC but Faster Clearance',
      color: 'purple',
      content:
        'High-mannose glycoforms create a paradox for CQA risk assessment: they enhance ADCC (desirable for oncology mAbs) but accelerate PK clearance (undesirable for all mAbs). The ADCC enhancement arises because Man5\u2013Man9 glycans lack core fucose (FUT8 acts after GnTI/GnTII in the Golgi cascade, and high-mannose species never reach the FUT8-accessible stage). Afucosylated Man5 species therefore bind Fc\u03B3RIIIa with the same ~20\u201350-fold enhancement as intentionally glyco-engineered afucosylated complex-type glycans. However, this ADCC benefit is offset by the mannose receptor-mediated clearance that reduces drug exposure. The net clinical impact depends on the balance between enhanced per-molecule ADCC potency and reduced total drug concentration at the target site. For most ADCC-dependent oncology mAbs dosed at trough-driven regimens, the PK penalty outweighs the ADCC benefit because reduced trough concentration means less antibody available for target engagement. This is why regulatory agencies consistently treat high-mannose as a negative CQA regardless of the ADCC enhancement: the PK impact is universal and dose-limiting, while the ADCC enhancement can be more effectively achieved through intentional glyco-engineering (FUT8 KO, 2FF) of complex-type glycans that do not carry the PK penalty.',
    },
    {
      type: 'table',
      title: 'Root Causes of Elevated High-Mannose in CHO Manufacturing',
      headers: ['Root Cause', 'Mechanism', 'Typical Man5 Increase', 'Process Lever to Mitigate'],
      rows: [
        ['Glucose starvation', 'Reduced HBP flux \u2192 low UDP-GlcNAc \u2192 GnTI stalls', '+5\u201315%', 'Maintain glucose >1\u20132 g/L; continuous glucose feed'],
        ['Ammonia accumulation (>5 mM)', 'Golgi pH increase \u2192 \u03B1-ManI and GnTI efficiency drops', '+3\u201310%', 'GlutaMAX substitution; asparagine feeding'],
        ['Short Golgi transit time', 'High growth rate \u2192 rapid vesicular transport \u2192 incomplete processing', '+2\u20138%', 'Temperature shift to 32\u201333\u00B0C; slower growth phase'],
        ['Low dissolved oxygen (<20% air sat)', 'Hypoxia-driven Golgi dysfunction; nucleotide sugar depletion', '+3\u20138%', 'Maintain DO 30\u201350% air saturation'],
        ['Scale-up heterogeneity', 'Nutrient gradients in large bioreactors \u2192 local glucose/NH\u2083 pockets', '+2\u20135%', 'Improve mixing; reduce feed addition rate'],
        ['Cell line-intrinsic (MGAT1 expression)', 'Low GnTI expression in specific CHO clones', '+5\u201320% (clone-dependent)', 'Clone selection for low Man5; MGAT1 OE'],
        ['ER stress / high secretion rate', 'Protein overload reduces ER-to-Golgi transport quality', '+2\u20135%', 'Optimise gene copy number; reduce specific productivity'],
        ['Late-harvest (viability <70%)', 'Intracellular mannosidase release; but also reduced processing', '+2\u20135%', 'Harvest at viability >80%'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: 'High-Mannose Is Always a CQA \u2014 The Regulatory Consensus',
      variant: 'danger',
      content:
        'Regulatory agencies (FDA, EMA, PMDA) universally classify high-mannose content as a CQA requiring Tier 1 release specifications, regardless of the mAb\u2019s mechanism of action. This classification is based on the mannose receptor clearance mechanism that affects all IgG antibodies: faster clearance reduces drug exposure, which can compromise efficacy at the approved dose. For biosimilars, high-mannose is one of the most scrutinised analytical comparability attributes because even small differences (e.g., 5% vs 3% Man5) can translate to measurable PK differences in healthy volunteer studies. Typical release specifications set Man5 as NMT 5\u201310% (molecule-specific, based on clinical batch history). For molecules with high intrinsic Man5 (>10% due to cell line characteristics), the sponsor must demonstrate through clinical PK data that the proposed Man5 range does not compromise the approved PK profile and dose regimen. The FDA has issued multiple complete response letters (CRLs) for biosimilar applications where high-mannose content exceeded the innovator quality range without adequate PK bridging data.',
    },
    {
      type: 'bullets',
      title: 'Process Control Strategy for High-Mannose',
      color: 'green',
      items: [
        'In-process glucose monitoring: Online glucose sensors (e.g., BioPAT Trace, Raman-based soft sensors) with automated bolus feeding to maintain glucose >1\u20132 g/L throughout the culture. This is the single most effective lever for preventing Man5 spikes.',
        'Ammonia control: Replace glutamine with GlutaMAX (L-alanyl-L-glutamine dipeptide) in the basal and feed media to reduce ammonia generation rate by ~50%. Target ammonia <5 mM at harvest.',
        'Temperature shift timing: Shift from 37\u00B0C to 32\u201333\u00B0C at mid-exponential phase (day 3\u20135) to slow cellular growth rate and extend Golgi transit time. Optimise shift timing through DoE to balance Man5 reduction against titre impact.',
        'Dissolved oxygen (DO) setpoint: Maintain DO at 30\u201350% air saturation. Implement cascade control (stirrer \u2192 gas flow \u2192 O\u2082 enrichment) to prevent transient DO drops during peak cell density.',
        'Clone selection: Screen clonal cell lines specifically for Man5 content in addition to titre and growth. Prioritise clones with Man5 <5% at standard conditions. High MGAT1 expression correlates with low Man5.',
        'Scale-up mixing characterisation: Perform mixing time studies at manufacturing scale. Ensure t_mix < 30 seconds to prevent local nutrient gradients. Consider impeller redesign or baffle optimisation if mixing is inadequate.',
        'Harvest timing: Set viability-based harvest criteria (>80% viability) with a concurrent Man5 in-process control. Implement rapid CE-LIF or HILIC-based glycan monitoring to enable real-time harvest decisions.',
        'Design space definition: Establish a multivariate design space (glucose, NH\u2083, DO, temperature) around Man5 using DoE (response surface methodology). Define proven acceptable ranges (PARs) for each parameter with Man5 as a response variable.',
      ],
    },
    {
      type: 'card',
      title: 'Analytical Detection of High-Mannose Species',
      color: 'blue',
      content:
        'High-mannose species are quantified by the same released glycan profiling methods used for the overall glycan distribution, but their identification requires careful chromatographic resolution from complex-type glycans. By HILIC-FLD (2-AB labelling), Man5 elutes earlier than G0F due to its smaller size and higher hydrophilicity (five mannose residues versus GlcNAc/Gal antennae on complex-type). Man6\u2013Man9 elute progressively later than Man5 but earlier than G0F, forming a distinct cluster in the high-mannose region. MALDI-TOF of permethylated glycans provides unambiguous mass identification: Man5 = m/z 1579.8 [M+Na]\u207A (permethylated), Man6 = m/z 1783.9, Man7 = m/z 1988.0, Man8 = m/z 2192.1, Man9 = m/z 2396.2. Glycopeptide-level LC-MS/MS confirms that the high-mannose species are located at Asn297 (the expected site) rather than at aberrant glycosylation sites. For in-process monitoring, CE-LIF with APTS labelling provides a rapid 2\u20134 hour turnaround for Man5 quantitation, enabling real-time process control decisions. Enzyme-based methods using Endoglycosidase H (Endo H), which specifically cleaves high-mannose and hybrid glycans but not complex-type, followed by SDS-PAGE or intact mass shift analysis, provide an orthogonal confirmation of total high-mannose content.',
    },
    {
      type: 'card',
      title: 'Endo H Sensitivity \u2014 Exploiting the Enzymatic Specificity',
      color: 'green',
      content:
        'Endoglycosidase H (Endo H) from Streptomyces plicatus is a highly specific enzyme that cleaves the chitobiose core (between the two GlcNAc residues) of high-mannose and hybrid glycans but cannot cleave complex-type glycans (which have the \u03B11,6-fucose and/or the second antennary GlcNAc that block Endo H access). This selectivity makes Endo H a powerful analytical tool: treating IgG with Endo H followed by intact mass analysis reveals a mass shift of approximately -1217 Da for Man5 (loss of Man\u2085GlcNAc from the reducing-end GlcNAc that remains attached to Asn297). The percentage of Endo H-sensitive glycoforms (mass-shifted peaks) directly quantifies total high-mannose + hybrid content. Endo H sensitivity is also used as a manufacturing in-process control: if Endo H-sensitive species exceed a threshold (e.g., >15%), the batch is flagged for further investigation. The complementary enzyme PNGase F cleaves all N-linked glycans regardless of type, so the difference between PNGase F-released total glycans and Endo H-resistant glycans provides the complex-type fraction. Endo H sensitivity is particularly useful for characterising glyco-engineered cell lines (e.g., MGAT1-knockout cells, which produce 100% Man5 and are fully Endo H-sensitive).',
    },
    {
      type: 'callout',
      title: 'Biosimilar Challenge \u2014 The Man5 Comparability Hurdle',
      variant: 'warning',
      content:
        'High-mannose content is one of the most difficult glycan attributes to match during biosimilar development because: (1) it is highly sensitive to upstream process conditions that differ fundamentally between the innovator and biosimilar manufacturing processes (cell line, media, bioreactor configuration); (2) even 2\u20133% differences in Man5 can be statistically significant with sufficient analytical power, and regulators may request PK bridging for such differences; (3) the innovator product\u2019s Man5 range may be narrow (e.g., 2\u20134%) while the biosimilar process targets a wider range. Multiple biosimilar filings have been delayed or received complete response letters (CRLs) due to Man5 differences. The mitigation strategy involves: (a) aggressive clone screening for Man5 content, (b) process development DoE targeting Man5 as a primary response variable, (c) establishing a robust glucose control strategy at manufacturing scale, and (d) generating clinical PK comparability data early in development to de-risk any residual Man5 difference. If the biosimilar Man5 is consistently 1\u20133% higher than the innovator, a healthy volunteer PK bridging study demonstrating equivalent AUC and C_max within the 80\u2013125% bioequivalence window is typically required.',
    },
  ],
  mentorQuestions: [
    'Your clinical manufacturing lot shows 12% Man5 by HILIC-FLD, exceeding the 10% release specification. The lot passed all other specifications including ADCC potency (115% relative potency, within 80\u2013125% range). Commercial team argues the lot should be released based on potency. Construct the CMC and regulatory argument for why the Man5 specification failure cannot be overridden by the potency result, referencing the PK clearance mechanism.',
    'During scale-up from 200L to 2000L, Man5 increases from 4% to 9% despite identical media, temperature, and DO setpoints. Walk through the systematic root cause investigation, identifying which scale-dependent process parameters are most likely responsible and what mixing studies you would conduct.',
    'A preclinical pharmacology colleague proposes producing a research-grade mAb batch with 100% Man5 (using kifunensine) to test whether the enhanced ADCC from afucosylated Man5 outweighs the PK penalty in a mouse xenograft model. Critique this experimental design \u2014 what are the limitations of mouse models for predicting human mannose receptor clearance, and how would you interpret the results?',
  ],
};
