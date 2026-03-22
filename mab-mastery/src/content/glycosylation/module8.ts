import type { ModuleContent } from '../../types/content';

export const module8: ModuleContent = {
  id: 'glycosylation-m8',
  sectionId: 'glycosylation',
  moduleNumber: 8,
  eyebrow: 'GLYCOSYLATION 09',
  title: 'Non-Glycosylated Heavy Chain',
  lead: 'When the OST complex misses Asn297 — the frequency, detection, functional consequences, and specification setting for aglycosylated species.',
  tags: [
    { label: 'OST Efficiency', color: 'teal' },
    { label: 'NGHC', color: 'red' },
    { label: 'Hemi-glycosylated', color: 'amber' },
  ],
  stats: [
    { label: 'OST Miss Rate', value: '1-3%' },
    { label: 'Detection', value: 'HILIC + peptide map' },
    { label: 'Typical Spec', value: 'NMT 1%' },
    { label: 'Key Paper', value: 'Ha 2011' },
  ],
  sections: [
    {
      type: 'card',
      title: 'The OST Complex and N297 Glycosylation Efficiency',
      color: 'blue',
      content:
        'N-linked glycosylation at Asn297 (EU numbering) is catalysed co-translationally by the oligosaccharyltransferase (OST) complex in the endoplasmic reticulum. The mammalian OST exists as two isoforms distinguished by their catalytic subunits: the STT3A complex (co-translational, scanning the nascent chain as it enters the ER lumen) and the STT3B complex (post-translational, acting on sites missed by STT3A). For IgG heavy chains, the Asn297 sequon (Asn-Ser-Thr in IgG1) is primarily glycosylated by STT3A as the nascent polypeptide is translocated through the Sec61 translocon. The OST transfers a preassembled Glc₃Man₉GlcNAc₂ oligosaccharide from a dolichol-PP carrier to the asparagine amide nitrogen. Efficiency of this transfer is approximately 97-99% under normal culture conditions, meaning that 1-3% of heavy chains escape glycosylation entirely. This "miss rate" reflects the probabilistic nature of co-translational glycosylation — each Asn297 residue passing through the OST active site has a finite probability of not receiving the oligosaccharide.',
    },
    {
      type: 'card',
      title: 'Hemi-Glycosylated Antibodies — Ha et al. 2011',
      color: 'amber',
      content:
        'A seminal study by Ha, Bhatt, and Bhatt (2011, J. Chromatogr. B) characterised hemi-glycosylated mAb species — molecules in which one heavy chain bears the Asn297 glycan while the other does not. Because IgG is a homodimer assembled from two HL half-antibodies, and because glycosylation of each HC is an independent stochastic event, the population follows a binomial distribution: if the OST miss rate is p (~2%), then ~96% of molecules are fully glycosylated (both HCs), ~4% are hemi-glycosylated (one HC), and ~0.04% are fully aglycosylated (neither HC). Hemi-glycosylated species create an asymmetric Fc region — one CH2 domain has glycan-mediated stabilisation while the other does not. This asymmetry has structural consequences: the aglycosylated CH2 domain adopts a more closed conformation, the overall Fc geometry is distorted, and the molecule displays hybrid functional properties between fully glycosylated and fully aglycosylated forms.',
    },
    {
      type: 'table',
      title: 'Binomial Distribution of Glycosylation States',
      headers: ['Species', 'Formula', 'At p = 2%', 'At p = 5%', 'Functional Impact'],
      rows: [
        ['Fully glycosylated', '(1-p)²', '96.04%', '90.25%', 'Normal effector function'],
        ['Hemi-glycosylated', '2p(1-p)', '3.92%', '9.50%', 'Reduced FcγR binding on one side'],
        ['Fully aglycosylated', 'p²', '0.04%', '0.25%', 'Abolished ADCC/ADCP'],
      ],
      sortable: false,
    },
    {
      type: 'card',
      title: 'Functional Consequences of Aglycosylation',
      color: 'red',
      content:
        'The functional impact of NGHC is well-established and directly relevant to any mAb whose mechanism of action involves Fc-mediated effector functions. On the aglycosylated side of a hemi-glycosylated molecule: (1) FcγRIIIa binding is severely impaired — the Asn297 glycan makes direct contacts with FcγRIIIa that are essential for high-affinity engagement, and the aglycosylated CH2 domain adopts a "closed" conformation that further reduces receptor accessibility. (2) CH2 domain thermal stability decreases by 5-10°C, as the N297 glycan provides lateral support to the CH2 β-sandwich that cannot be replaced by protein-protein contacts alone. (3) Complement C1q binding is reduced because the C1q binding site spans both CH2 domains in the Fc and requires proper spatial orientation maintained by the glycan. For fully aglycosylated molecules, ADCC and ADCP are essentially abolished, C1q binding is severely reduced, and the molecule behaves more like an IgG4 or Fc-silenced variant in terms of effector function. Importantly, FcRn binding (at the CH2-CH3 interface) is minimally affected, so PK is largely preserved.',
    },
    {
      type: 'card',
      title: 'CH2 Structural Instability Without Glycan',
      color: 'purple',
      content:
        'The CH2 domain is unique among IgG constant domains in that it lacks stabilising inter-domain protein-protein contacts on the inner face. In the intact Fc, the two CH2 domains are held apart by the N297 glycans, which fill the inter-CH2 space and provide lateral structural support. When the glycan is absent, the CH2 domain experiences: (1) Loss of ~1.4 kDa of stabilising carbohydrate mass; (2) Exposure of the hydrophobic inner face that is normally shielded by glycan contacts; (3) Increased conformational flexibility and tendency toward a closed CH2-CH2 arrangement; (4) Accelerated aggregation nucleation, as the exposed hydrophobic patches serve as intermolecular contact points. Differential scanning calorimetry (DSC) of aglycosylated IgG consistently shows a 5-10°C reduction in the CH2 unfolding transition (Tm1), while CH3 and Fab transitions remain essentially unchanged. This domain-specific destabilisation is the structural basis for the higher aggregation propensity observed in NGHC-enriched preparations.',
    },
    {
      type: 'table',
      title: 'Detection Methods for NGHC Species',
      headers: ['Method', 'Principle', 'Sensitivity', 'Advantages', 'Limitations'],
      rows: [
        ['HILIC-UPLC-FLR', 'Absence of glycan peak in released glycan profile; intact/subunit MW shift', '~0.1%', 'High resolution; quantitative', 'Indirect — infers NGHC from missing glycan'],
        ['Peptide mapping (LC-MS/MS)', 'Unmodified Asn297 peptide (EEQYNSTYR or equivalent) detected', '~0.05%', 'Site-specific; unambiguous identification', 'Labour-intensive; requires digestion optimisation'],
        ['Intact/Subunit MS', 'Mass difference ~1.4 kDa (G0F) between glycosylated and aglycosylated HC', '~0.5%', 'Rapid; minimal sample preparation for subunit', 'Lower resolution for low-abundance species'],
        ['HIC', 'Aglycosylated species elute at different retention time due to altered hydrophobicity', '~1%', 'Orthogonal separation mechanism', 'Requires method development per molecule'],
        ['Non-reducing CE-SDS', 'Aglycosylated HC migrates faster (lower MW)', '~0.5%', 'Platform method; routine use', 'Co-migration with other HC variants possible'],
        ['Native MS', 'Resolves asymmetric glycoforms including hemi-glycosylated species', '~1%', 'Detects hemi-glycosylated specifically', 'Requires high-resolution instrument (Q-TOF or Orbitrap)'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'HILIC-UPLC-FLR Detection of NGHC',
      color: 'teal',
      content:
        'HILIC-UPLC-FLR (hydrophilic interaction liquid chromatography with ultraperformance LC and fluorescence detection) is the primary platform method for released glycan profiling, and it can indirectly quantify NGHC through the overall glycan-to-protein stoichiometry. In the standard workflow: (1) PNGaseF digestion releases N-glycans from all glycosylated Asn residues; (2) Released glycans are labelled with 2-AB (2-aminobenzamide) or RapiFluor-MS for fluorescence detection; (3) HILIC separation on a Waters BEH Glycan column resolves individual glycoforms; (4) The total integrated fluorescence is proportional to the moles of glycan released. If 100% of HC were glycosylated, the glycan-to-protein molar ratio would be 2.0 (two glycans per IgG molecule). A ratio of 1.96 implies ~2% NGHC. More directly, intact or subunit-level mass spectrometry after IdeS digestion and reduction separates Fc/2 fragments into glycosylated (~25.4 kDa for G0F-bearing) and aglycosylated (~24.0 kDa) populations, enabling direct quantification of the aglycosylated fraction.',
    },
    {
      type: 'card',
      title: 'Peptide Mapping for NGHC Confirmation',
      color: 'green',
      content:
        'Site-specific glycopeptide analysis by tryptic peptide mapping coupled with LC-MS/MS provides definitive identification and quantification of NGHC. The Asn297-containing tryptic peptide (EEQYNSTYR for IgG1, though the exact sequence depends on the specific mAb framework and any engineered mutations) is monitored in both its glycosylated and unmodified forms. The unmodified peptide (i.e., Asn297 not converted to Asp by PNGaseF, and not bearing any glycan) represents the true aglycosylated fraction. Key analytical considerations: (1) Trypsin digestion must be complete — incomplete digestion generates miscleaved peptides that can confuse quantification; (2) The aglycosylated peptide and the deamidated Asn297 peptide (Asp297, generated by PNGaseF-catalysed deglycosylation of the glycosylated form) must be chromatographically resolved; (3) PNGaseF treatment converts glycosylated Asn → Asp (mass shift +0.98 Da), but the native aglycosylated Asn297 retains its original mass. This mass difference enables unambiguous assignment: the Asn297-containing peptide = NGHC, the Asp297-containing peptide = deglycosylated (was glycosylated), and any remaining glycopeptide = incomplete PNGaseF digestion.',
    },
    {
      type: 'callout',
      title: 'Process Stress Indicators — When NGHC Increases',
      variant: 'warning',
      content:
        'NGHC levels serve as a sentinel indicator of upstream process disturbances affecting the glycosylation machinery. Conditions that increase NGHC above the typical 1-3% baseline include: (1) Nutrient limitation — glucose or glutamine depletion reduces UDP-GlcNAc and UDP-glucose synthesis, limiting the availability of dolichol-PP-oligosaccharide substrate for OST; (2) Dolichol pathway disruption — dolichol (a C₈₀-C₁₀₀ isoprenoid lipid) is the membrane-embedded carrier for the Glc₃Man₉GlcNAc₂ precursor, and its synthesis requires mevalonate pathway intermediates; statin-like metabolites or lipid depletion can reduce dolichol availability; (3) High culture pH (>7.2) — alkaline pH can reduce OST catalytic efficiency and alter ER lumenal conditions; (4) ER stress and UPR activation — during the unfolded protein response, ER processing capacity is overwhelmed, and some nascent HC may escape glycosylation; (5) Very high specific productivity (qP > 50 pg/cell/day) — when HC translation rate exceeds OST processing capacity, miss rate increases. Monitoring NGHC trends across production batches provides early warning of upstream process drift.',
    },
    {
      type: 'table',
      title: 'Factors Affecting OST Efficiency at Asn297',
      headers: ['Factor', 'Normal Range', 'Stress Condition', 'Effect on NGHC', 'Mechanism'],
      rows: [
        ['Glucose', '2-6 g/L', '< 0.5 g/L', '↑ to 3-5%', 'Depleted UDP-sugar donors for dolichol pathway'],
        ['Glutamine', '2-4 mM', 'Depletion', '↑ to 3-8%', 'Reduced hexosamine pathway flux → low UDP-GlcNAc'],
        ['Culture pH', '6.8-7.1', '> 7.3', '↑ to 2-5%', 'Altered OST catalytic efficiency'],
        ['Cell viability', '> 90%', '< 70%', '↑ to 5-10%', 'ER dysfunction in dying cells; incomplete processing'],
        ['Specific productivity', '20-40 pg/c/d', '> 60 pg/c/d', '↑ to 3-6%', 'HC translation rate exceeds OST capacity'],
        ['Temperature', '36-37°C', '< 32°C', 'Minimal change', 'OST activity preserved; slower translation may help'],
        ['Dissolved oxygen', '30-60%', '< 10%', '↑ to 3-5%', 'Hypoxic ER stress → UPR activation → processing defects'],
        ['Dolichol availability', 'Adequate', 'Statin metabolites', '↑ to 5-15%', 'Blocked mevalonate → dolichol synthesis pathway'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Specification Setting for NGHC',
      color: 'amber',
      content:
        'For innovator mAb products, NGHC is typically controlled as a CQA with a specification of NMT (not more than) 1% at release, based on several converging rationales: (1) Functional biology — NGHC species have impaired effector function, and even hemi-glycosylated molecules show reduced FcγR engagement on the aglycosylated side. For ADCC-dependent mAbs, even 1-2% NGHC represents a measurable loss of potency. (2) Process capability — a well-controlled CHO process using standard fed-batch with adequate nutrient supply consistently delivers NGHC levels of 0.5-2.0%, making a 1% specification achievable with Cpk > 1.33. (3) Clinical bridging — the specification should encompass the range observed in clinical trial material, particularly pivotal Phase 3 lots. (4) Structural integrity — NGHC species have reduced CH2 stability and elevated aggregation propensity, creating a product quality concern beyond effector function. For biosimilars, NGHC must fall within the quality range established for the reference product, and comparative HILIC and peptide mapping data are expected in the BLA/MAA.',
    },
    {
      type: 'bullets',
      title: 'CMC Risk Assessment — NGHC as a Product Quality Attribute',
      items: [
        'Risk ranking: NGHC is classified as a CQA for all mAbs with Fc-mediated effector function (ADCC, ADCP, CDC). For blocking-only mAbs (e.g., anti-PD-1) or Fc-silenced molecules (LALA-PG), NGHC remains a quality attribute but may have wider acceptance criteria because the functional impact is limited to stability and PK.',
        'Control strategy: NGHC is controlled primarily through upstream process parameter management (nutrient feed strategy, pH control, viability maintenance) rather than downstream purification, because aglycosylated and glycosylated mAbs co-purify on Protein A and ion exchange chromatography.',
        'Trending and comparability: NGHC should be included in process performance qualification (PPQ) trending and site-to-site comparability protocols. An upward trend in NGHC may indicate gradual cell line drift, media lot-to-lot variability, or bioreactor control issues.',
        'Regulatory expectation: ICH Q6B expects that glycosylation-related quality attributes be characterised, specified, and justified. For NGHC, the justification should link the specification to functional data (FcγR binding, potency assay), process capability analysis, and clinical lot experience.',
        'Biosimilar considerations: FDA and EMA expect analytical similarity for NGHC levels between biosimilar and reference product. If the reference product consistently shows 0.5-1.0% NGHC, the biosimilar should demonstrate equivalent levels. Significant differences in NGHC (even within a wider specification) may trigger additional functional characterisation requirements.',
      ],
    },
    {
      type: 'callout',
      title: 'STT3A vs STT3B — Isoform-Specific OST Activity',
      variant: 'info',
      content:
        'The two OST isoforms have distinct roles in N-glycosylation. STT3A is the primary co-translational glycosyltransferase — it scans the nascent polypeptide as it enters the ER lumen and modifies accessible NxS/T sequons. STT3A operates with high processivity but is not infallible; the ~1-3% miss rate at Asn297 reflects the kinetic competition between polypeptide translocation speed and STT3A catalytic turnover. STT3B serves as a "backup" post-translational glycosyltransferase, acting on sequons that STT3A missed, particularly those near the C-terminus of the protein or in regions that fold rapidly before STT3A can access them. For Asn297, which is located in a loop region of CH2 that folds relatively slowly, STT3A handles the majority of glycosylation events. CHO cells express both isoforms, and their relative activity levels can be modulated by cell line engineering — overexpression of STT3B has been explored as a strategy to reduce NGHC levels, though this approach has not been widely adopted commercially.',
    },
    {
      type: 'card',
      title: 'Impact on Aggregation and Stability',
      color: 'red',
      content:
        'NGHC species contribute disproportionately to aggregation in mAb drug substance and drug product. Even at 1-2% levels, aglycosylated HC can nucleate aggregate formation because: (1) The exposed hydrophobic inner face of the aglycosylated CH2 domain provides a sticky surface for intermolecular contacts; (2) The 5-10°C lower Tm of the aglycosylated CH2 means these species begin to unfold at temperatures where the bulk glycosylated population is still native — during shipping excursions, short-term thermal stress, or accelerated stability testing at 25°C or 40°C, NGHC molecules may unfold first and seed aggregation; (3) Partially unfolded NGHC can act as heterogeneous nucleation sites, capturing transiently unfolded regions of neighbouring glycosylated molecules. In forced degradation studies, enriched NGHC fractions (isolated by HIC or HILIC) show 3-5× faster aggregation kinetics compared to the fully glycosylated fraction at 40°C. This makes NGHC control important not only for efficacy but also for product shelf-life and stability profile.',
    },
  ],
  mentorQuestions: [
    'If you observe NGHC increasing from 1% to 4% across consecutive production batches, what process parameters would you investigate first, and what is your root cause analysis strategy?',
    'Explain why NGHC specification is set tighter for an ADCC-dependent anti-CD20 mAb compared to a blocking anti-PD-1 mAb.',
    'How would you analytically distinguish between hemi-glycosylated and fully aglycosylated mAb species in a single assay?',
  ],
};

export default module8;
