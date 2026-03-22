import type { ModuleContent } from '../../types/content';

export const module7: ModuleContent = {
  id: 'cqa-m7',
  sectionId: 'cqa',
  moduleNumber: 7,
  eyebrow: 'CQA 08',
  title: 'Analytical Toolbox — Complete Method Reference',
  lead: 'The comprehensive analytical method panel for therapeutic mAb characterisation, release, and stability — 15 essential methods covering identity, purity, potency, impurities, and higher-order structure, with key operating parameters and typical specifications.',
  tags: [
    { label: 'Release Methods', color: 'green' },
    { label: 'Characterisation', color: 'blue' },
    { label: 'Potency', color: 'red' },
    { label: 'Stability-Indicating', color: 'amber' },
  ],
  stats: [
    { label: 'Release Methods', value: '8-12' },
    { label: 'Characterisation Methods', value: '15+' },
    { label: 'Stability Panel', value: '6-8' },
    { label: 'Total CQAs Covered', value: '20+' },
  ],
  sections: [
    {
      type: 'card',
      title: 'The Analytical Control Strategy',
      color: 'blue',
      content:
        'The analytical toolbox for a therapeutic mAb serves three distinct purposes, each with different method requirements: (1) Release testing — rapid, validated, GMP-compliant methods with defined acceptance criteria, performed on every batch. Methods must be validated to ICH Q2(R2) for specificity, accuracy, precision, linearity, range, LOD, and LOQ. Release methods include SEC, CE-SDS, iCIEF or CEX, glycan profiling (HILIC-FLR), potency (cell-based bioassay), identity (peptide map or iCIEF pI), concentration (UV A280), pH, osmolality, endotoxin, bioburden, and subvisible particles. (2) Stability testing — a subset of release methods that are stability-indicating (detect degradation products), performed at defined timepoints under ICH Q5C conditions. The stability panel must include methods sensitive to every known degradation pathway: aggregation (SEC), fragmentation (CE-SDS), charge variants (iCIEF), oxidation (peptide map or HIC), and potency. (3) Extended characterisation — sophisticated methods providing molecular-level detail, used during development, process validation, comparability assessments, and regulatory submission support. These methods (intact MS, HDX-MS, AUC, DSC, native MS) are not performed on every batch but generate the structural knowledge base that underpins CQA classification.',
    },
    {
      type: 'table',
      title: 'Complete Analytical Method Reference',
      headers: ['Method', 'CQA/Attribute', 'Principle', 'Key Parameters', 'Typical Spec', 'Tier'],
      rows: [
        ['SEC-HPLC', 'Purity (monomer %), aggregates, fragments', 'Size-based chromatographic separation on silica-diol or polymer resin; UV 280 nm detection', 'Column: TSKgel G3000SWXL; mobile phase: 200 mM K-phosphate + 250 mM KCl, pH 6.2; flow 0.5 mL/min', '>=95% monomer; <=2% HMW; <=3% LMW', 'Tier 1 Release + Stability'],
        ['CE-SDS (non-reducing)', 'Intact IgG, fragments, covalent aggregates', 'SDS-denatured capillary electrophoresis; separation by apparent MW', 'SDS sample buffer; 70C/10 min denature; 25 kV separation; 30 cm capillary; UV 220 nm', '>=90% intact IgG; report all fragments', 'Tier 1 Release + Stability'],
        ['CE-SDS (reducing)', 'Heavy chain, light chain integrity, non-glycosylated HC', 'SDS + beta-ME reduction; separates individual chains', 'beta-ME 5%; 70C/10 min; same CE parameters as NR', 'HC ~67%; LC ~28%; NGHC <=2%', 'Tier 1 Release + Stability'],
        ['iCIEF', 'Charge variants (acidic/main/basic), pI', 'Capillary isoelectric focusing with whole-column UV imaging', '3% pharmalyte 3-10 + 2% 8-10.5; pI markers 7.05/9.77; urea 2-4M optional; 3 kV focus 8 min', '%Acidic 15-40; %Main 50-75; %Basic 5-20', 'Tier 1 Release + Stability'],
        ['CEX-HPLC', 'Charge variants (alternative to iCIEF)', 'Cation exchange with salt or pH gradient elution', 'ProPac WCX-10; pH gradient (CX-1 buffers) or NaCl gradient 0-500 mM; UV 280 nm', 'Same ranges as iCIEF; fraction collection possible', 'Tier 1/2 Release or Stability'],
        ['Peptide Mapping LC-MS/MS', 'Identity, PTM quantification (deamidation, oxidation, glycation)', 'Tryptic digest; RP-UPLC C18 separation; online ESI-MS/MS (Orbitrap)', 'Denature/reduce/alkylate; trypsin 1:20; BEH130 C18 1.7um; 0.1% FA gradient', 'Identity: peptide map matches reference; PTM: site-specific %', 'Tier 1 (identity) + Tier 3 (PTMs)'],
        ['Intact Mass (ESI-MS)', 'Molecular weight, glycoform confirmation, clip variants', 'Desalting on RP; ESI-Q-TOF or Orbitrap intact protein mode; deconvolution', 'RP desalt (C4 or diphenyl); 0.1% FA; mass accuracy <=10 ppm; charge deconvolution', 'MW within 50 Da of theoretical; major glycoforms resolved', 'Tier 3 Characterisation'],
        ['Native MS', 'Non-covalent complexes, higher-order assembly, drug loading (ADC)', 'Nano-ESI or SEC-MS under non-denaturing conditions; ammonium acetate buffer', 'Ammonium acetate 100-200 mM, pH 6.8; gentle source conditions; collision voltage optimised', 'Confirm intact tetrameric assembly; detect non-covalent dimers', 'Tier 3 Characterisation'],
        ['HILIC-FLR', 'N-glycan profile (afucosylation, galactosylation, high-mannose, sialylation)', 'PNGase F release; 2-AB or RFMS labelling; HILIC separation; FLR detection', 'BEH Glycan 1.7um; ACN/NH4 formate gradient; Ex 250/Em 428 nm (2-AB) or Ex 265/Em 425 nm (RFMS)', 'Report G0F, G1F, G2F, Man5, afucosylated %; afucose 5-15%', 'Tier 1 Release'],
        ['SPR (Surface Plasmon Resonance)', 'Target binding kinetics (ka, kd, KD), FcRn binding, FcgR binding', 'Real-time label-free binding measurement on gold sensor chip', 'CM5 chip; target immobilised by amine coupling; multi-cycle kinetics; 1:1 binding model', 'KD within 2-fold of reference; FcRn KD at pH 6.0: ~0.5-2 uM', 'Tier 2/3'],
        ['DSC (Differential Scanning Calorimetry)', 'Thermal stability, Tonset, Tm1 (CH2), Tm2 (Fab), Tm3 (CH3)', 'Controlled heating; measures excess heat capacity from protein unfolding', 'MicroCal VP-Capillary DSC; 0.5 mg/mL; 10-110C at 1C/min; PBS or formulation buffer', 'Tm values within 2C of reference; Tonset >55C', 'Tier 3 Characterisation'],
        ['nanoDSF', 'Thermal stability (high-throughput), Tonset, Tm', 'Intrinsic Trp/Tyr fluorescence ratio (350/330 nm) shift upon unfolding', 'Prometheus NT.48; 0.5-2 mg/mL; 20-95C at 1C/min; capillary format', 'Tm1 >62C (IgG1 CH2); Tonset >55C', 'Tier 3 (screening and comparability)'],
        ['Cell-Based Bioassay', 'Potency (biological activity relative to reference standard)', 'Target-dependent cell killing, proliferation inhibition, or reporter gene activation', 'Target-positive cells + mAb + effector cells (ADCC) or complement (CDC); 4-parameter logistic fit', '80-125% relative potency vs reference standard', 'Tier 1 Release + Stability'],
        ['ADCC Reporter Bioassay', 'Effector function (ADCC) — FcgRIIIa-dependent', 'Engineered Jurkat cells with FcgRIIIa + NFAT-luciferase; target cells + mAb triggers luminescence', 'Target cells + reporter cells (E:T 6:1); 6-hr incubation; luminescence readout; EC50 from dose-response', '70-130% relative ADCC activity', 'Tier 1/2 (ADCC-dependent mAbs)'],
        ['DLS (Dynamic Light Scattering)', 'Hydrodynamic radius, polydispersity, colloidal stability', 'Autocorrelation of scattered light from Brownian motion', 'Malvern Zetasizer; 1-5 mg/mL; 25C; 173 degree backscatter; 10 x 10 sec acquisitions', 'Rh 5-6 nm (monomer); PdI <0.2; no aggregates >100 nm', 'Tier 2/3'],
        ['MFI (Micro-Flow Imaging)', 'Subvisible particles (2-100 um) with morphological classification', 'Flow cell imaging with automated image analysis and particle classification', 'FlowCam or MFI 5200; 0.5 mL sample; 100 um or 400 um flow cell; automated MVSS classifier', '<=6000/container >=10 um; <=600/container >=25 um (USP <787>)', 'Tier 1 Release + Stability'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Method Validation — ICH Q2(R2) Essentials',
      color: 'green',
      content:
        'Every release and stability method must be validated per ICH Q2(R2) (Validation of Analytical Procedures, 2022 revision). The key validation parameters for mAb methods: Specificity — demonstrate that the method can distinguish the analyte from degradation products, excipients, and process impurities. For SEC, show that aggregate and fragment peaks are resolved from the monomer peak; spike experiments with stressed material confirm detection of degradation products. Accuracy — for impurity methods (HCP ELISA, rProtein A ELISA), demonstrate recovery by spiking known amounts of analyte into the sample matrix. Typical acceptance: 80-120% recovery. Precision — repeatability (same analyst, same day, 6 replicates): RSD <=2% for main peak methods, <=10% for low-level impurity methods. Intermediate precision (different analysts, different days): RSD <=5% for main peak. Linearity — demonstrate proportional response across the working range (typically 50-150% of the target concentration). R-squared >=0.99. Range — the interval over which linearity, accuracy, and precision are acceptable. For SEC monomer: 80-110% of target. LOD/LOQ — required for impurity methods. LOD: 3.3x sigma/slope; LOQ: 10x sigma/slope. Robustness — deliberate variation of method parameters (pH +-0.2, flow rate +-10%, column temperature +-5C) to identify critical parameters requiring tight control.',
    },
    {
      type: 'bullets',
      title: 'Method Selection Strategy by CQA Category',
      items: [
        'Size variants: Primary — SEC-HPLC (release and stability). Orthogonal — CE-SDS NR (covalent species, fragments), DLS (Z-average, polydispersity), AUC-SV (gold standard for oligomer quantification). Subvisible — MFI + HIAC. Visible — manual visual inspection against black/white background.',
        'Charge variants: Primary — iCIEF (release and stability) OR CEX-HPLC (if fraction collection needed). Orthogonal — peptide mapping LC-MS/MS for site-specific PTM quantification. CZE (capillary zone electrophoresis) as a third orthogonal option.',
        'Glycosylation: Primary — HILIC-FLR of released glycans (release). Orthogonal — CE-LIF, LC-MS glycopeptide mapping (site specificity), intact/subunit MS (mass confirmation). Functional correlation — SPR FcgRIIIa binding, ADCC reporter assay.',
        'Oxidation: Primary — peptide mapping LC-MS/MS for site-specific Met/Trp quantification (stability/characterisation). Orthogonal — HIC (intact-level oxidation profiling, faster than peptide map). Screening — Trp fluorescence spectroscopy for photostability studies.',
        'Potency: Primary — cell-based bioassay (release and stability). For ADCC-dependent mAbs, add ADCC reporter bioassay. For CDC-dependent mAbs, add CDC assay. Binding — SPR for target binding KD. Surrogate — target-binding ELISA for rapid in-process or interim potency assessment.',
        'Process impurities: HCP — generic ELISA (release) + LC-MS/MS (characterisation). HCD — qPCR (release). Protein A — specific ELISA (release). Endotoxin — LAL/rFC (release). Each validated to ICH Q2(R2).',
      ],
    },
    {
      type: 'callout',
      title: 'Emerging Methods — Next-Generation Analytical Tools',
      variant: 'info',
      content:
        'Several emerging analytical methods are gaining regulatory acceptance for mAb characterisation: (1) HDX-MS (Hydrogen/Deuterium Exchange Mass Spectrometry) — measures protein dynamics and conformational changes at peptide-level resolution. Used for comparability (biosimilar vs. reference), epitope mapping, and higher-order structure assessment. Now routinely requested by FDA reviewers for biosimilar applications. (2) Multi-Attribute Method (MAM) — a peptide mapping-based approach that simultaneously quantifies multiple CQAs (oxidation, deamidation, glycation, glycosylation site occupancy, clip variants) in a single LC-MS run. MAM is being adopted as a release/stability method to replace or complement several individual methods (iCIEF, HILIC). (3) Size Exclusion Chromatography with Multi-Angle Light Scattering (SEC-MALS) — provides absolute MW determination of SEC peaks without column calibration, enabling unambiguous assignment of dimer, trimer, and higher oligomer species. (4) Native SEC-MS — combines native SEC separation with online native MS detection for simultaneous size and mass information on non-denatured species.',
    },
    {
      type: 'card',
      title: 'Multi-Attribute Method (MAM) — The Convergence Trend',
      color: 'purple',
      content:
        'The Multi-Attribute Method (MAM) represents a paradigm shift in mAb release testing. Instead of running 5-8 separate methods to measure individual CQAs, MAM uses a single peptide mapping LC-MS run to simultaneously quantify oxidation (Met252, Met428, CDR Trp), deamidation (CDR Asn, Fc Asn), isomerisation (Asp sites), glycation (Lys sites), glycosylation site occupancy, clip variants, and sequence variants. The workflow: rapid tryptic digest (2-4 hours using immobilised trypsin or accelerated digestion at 70C), RPLC-UV-MS analysis (30-60 min gradient), automated data processing with targeted extracted ion chromatograms for each monitored attribute. The advantages: reduced testing time (one method vs. five), improved trending (all attributes from the same sample preparation), detection of new peaks (unknown degradation products appear as new peaks in the UV/MS trace), and potential to serve as both identity and purity method. The challenges: complex method validation (each attribute must be individually validated for accuracy, precision, and linearity), instrument qualification for GMP use, and regulatory acceptance (FDA has approved MAM in several BLAs but it is not yet universally adopted for release testing). Companies like Amgen, Genentech, and Regeneron have published MAM implementation strategies for commercial manufacturing.',
    },
    {
      type: 'table',
      title: 'Stability-Indicating Method Panel',
      headers: ['Degradation Pathway', 'Primary Method', 'Sensitivity', 'Typical Stability Trend (2-8C, 24 months)', 'Alert Trigger'],
      rows: [
        ['Aggregation', 'SEC-HPLC', '0.1% HMW', '0.1-0.5% HMW increase', '>1% increase from release'],
        ['Fragmentation', 'CE-SDS (NR)', '0.5% fragment', '0.5-2% fragment increase', '>3% decrease in intact IgG'],
        ['Deamidation', 'iCIEF or CEX', '1% charge shift', '3-10% acidic increase', 'Outside clinical lot trend'],
        ['Oxidation', 'Peptide map or HIC', '0.5% Met-SO', '1-3% Met252-ox increase', '>10% total Fc Met oxidation'],
        ['Potency loss', 'Cell-based bioassay', '5-10% relative', '0-15% decrease', '<80% relative potency'],
        ['Particle formation', 'MFI / HIAC', '100 particles/mL (>=10um)', 'Stable or slight increase', 'Exceeding USP <787> limits'],
        ['Colour/appearance', 'Visual inspection', 'Visible', 'Generally stable', 'Any colour change or opalescence increase'],
        ['pH drift', 'Potentiometry', '0.01 pH units', '<=0.1 pH unit drift', 'Outside 6.0 +/- 0.3'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: 'System Suitability — The Gatekeeper for Reliable Data',
      variant: 'warning',
      content:
        'System suitability tests (SST) are the mandatory pre-run checks that confirm the analytical system is performing within validated parameters before any sample data are accepted. For each release/stability method, SSTs must be defined and documented: SEC — resolution between monomer and aggregate peaks >=1.5 (using an aggregate-spiked reference); retention time of monomer within +-2% of expected; reference standard monomer% within +-2% of qualified value. CE-SDS — migration time of internal standard within +-5%; peak efficiency >100,000 theoretical plates; reference standard purity within +-3%. iCIEF — pI marker positions within +-0.1 pH units; reference standard %main within +-3%. Bioassay — reference standard EC50 within 70-130% of historical mean; Hill slope within 0.8-1.5; R-squared of 4PL fit >=0.98. Failure of SST requires investigation and re-run before proceeding with sample analysis. SST failures are tracked as part of the laboratory quality system and trended to identify instrument or reagent drift.',
    },
  ],
  mentorQuestions: [
    'You are proposing to replace three individual release methods (iCIEF for charge variants, HILIC-FLR for glycans, and peptide mapping for oxidation) with a single Multi-Attribute Method (MAM). What validation strategy would you use to demonstrate equivalence, and what are the regulatory risks of this approach?',
    'Your SEC method shows 98% monomer and 2% HMW on a batch. However, DLS data on the same batch show a polydispersity index of 0.35 and evidence of a population at Rh ~50 nm. How do you reconcile these apparently contradictory results, and what additional methods would you deploy?',
    'A regulatory reviewer questions why you report FcgRIIIa binding by SPR as a Tier 2 characterisation method rather than a Tier 1 release method for your ADCC-dependent mAb. How do you justify this decision, and under what circumstances would you elevate SPR to Tier 1?',
  ],
};
