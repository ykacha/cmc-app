import type { ModuleContent } from '../../types/content';

export const module6: ModuleContent = {
  id: 'cqa-m6',
  sectionId: 'cqa',
  moduleNumber: 6,
  eyebrow: 'CQA 07',
  title: 'Process Impurities — HCP, HCD, Protein A & Viral Safety',
  lead: 'The process-related impurities that define the safety profile of every mAb drug substance — from hitchhiker host cell proteins and residual DNA to leached Protein A and the viral clearance validation that underpins the safety claim for biologics.',
  tags: [
    { label: 'HCP', color: 'red' },
    { label: 'Host Cell DNA', color: 'amber' },
    { label: 'Protein A', color: 'purple' },
    { label: 'Viral Clearance', color: 'blue' },
  ],
  stats: [
    { label: 'HCP Target', value: '<100 ppm' },
    { label: 'HCD Limit', value: '<10 ng/dose' },
    { label: 'Protein A Target', value: '<10 ppm' },
    { label: 'Viral Clearance', value: '>12 LRV total' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Process Impurities — Regulatory Framework',
      color: 'blue',
      content:
        'Process-related impurities are substances derived from the manufacturing process rather than the product itself. For mAbs produced in CHO cells and purified by Protein A chromatography, the principal process impurities are: host cell proteins (HCPs), host cell DNA (HCD), residual Protein A ligand, cell culture medium components, and endotoxin. ICH Q6B (Specifications for Biotechnological/Biological Products) requires that process impurities be reduced to acceptable levels using validated methods and that limits be justified based on safety data or regulatory precedent. The EMA guideline on "Production and Quality Control of Monoclonal Antibodies and Related Substances" (EMA/CHMP/BWP/532517/2008) provides specific expectations for each impurity class. The FDA Process Validation Guidance (2011) requires that clearance of process impurities be demonstrated during process validation and that the validated purification process consistently achieves the target clearance. All process impurity specifications must appear in CTD Module 3.2.S.3.2 (Impurities — Drug Substance) and 3.2.P.5 (Control of Drug Product).',
    },
    {
      type: 'card',
      title: 'Host Cell Proteins (HCPs) — The Complex Impurity',
      color: 'red',
      content:
        'HCPs are the proteins expressed by the CHO host cell that co-purify with the mAb product. A typical CHO cell culture supernatant contains 200-500 ug/mL HCP (vs. 2-5 g/L mAb), representing a 1000-2500-fold excess that must be removed to <100 ppm (100 ng HCP per mg mAb). The total HCP pool comprises >4000 distinct proteins, but only a subset (50-200) survive the purification process to appear in the drug substance. These "hitchhiker" HCPs co-purify because they bind to the Protein A resin, the mAb product, or ion exchange/HIC resins through specific physicochemical interactions rather than random carryover. The most problematic hitchhiker HCPs are those with enzymatic activity that can degrade the product during storage. PLBL2 (phospholipase B-like 2) is the most notorious example — a CHO lipase that co-purifies with IgG at 1-100 ppm levels and hydrolyses polysorbate 80 in the drug product, leading to free fatty acid particle formation, loss of surfactant protection, and protein aggregation. PLBL2 was identified as the root cause of a major FDA product hold in 2015, catalysing industry-wide awareness of specific HCP identification beyond generic ELISA testing.',
    },
    {
      type: 'table',
      title: 'Problem Hitchhiker HCPs',
      headers: ['HCP', 'Type', 'MW (kDa)', 'Co-purification Mechanism', 'Impact on Product', 'Detection Method'],
      rows: [
        ['PLBL2 (Phospholipase B-Like 2)', 'Lipase', '66', 'Binds Protein A resin directly; elutes with IgG at low pH', 'Degrades PS80; generates sub-visible particles from free fatty acids', 'LC-MS/MS, specific ELISA, lipase activity assay'],
        ['Cathepsin D', 'Aspartic protease', '45', 'Size/charge similar to IgG fragments; co-elutes on IEX/HIC', 'Cleaves IgG hinge region (Asp-Pro bond); fragmentation on storage', 'LC-MS/MS, specific ELISA, fluorogenic protease assay'],
        ['Cathepsin L', 'Cysteine protease', '37', 'Binds to IgG Fc region; co-purifies through affinity', 'Cleaves lower hinge; generates fragments similar to CatD', 'LC-MS/MS, specific ELISA'],
        ['Lipoprotein Lipase (LPL)', 'Lipase', '53', 'Associates with PS80 micelles that coat product', 'Degrades PS80; synergistic with PLBL2', 'LC-MS/MS, specific lipase activity assay'],
        ['LPLA2 (Group XV PLA2)', 'Phospholipase', '45', 'Co-purifies on cation exchange at certain pH', 'Degrades PS80 via phospholipase activity', 'LC-MS/MS, specific activity assay'],
        ['Clusterin', 'Chaperone', '75-80', 'Binds aggregated/misfolded IgG; co-purifies as complex', 'May mask aggregate detection by SEC; no direct product impact', 'LC-MS/MS; dissociates under denaturing SEC conditions'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'HCP Detection — ELISA vs. LC-MS/MS',
      color: 'teal',
      content:
        'HCP measurement relies on two complementary approaches with fundamentally different capabilities. Generic HCP ELISA (Cygnus, Gyros, in-house) uses polyclonal anti-CHO HCP antibodies raised by immunising animals with a CHO null cell lysate. The ELISA reports total HCP as a single number (ng/mL or ppm). The critical limitation: antibody coverage is incomplete — the polyclonal antibody panel typically covers 80-95% of the HCP proteome, meaning 5-20% of HCPs are invisible to the assay. This "blind spot" is where the most dangerous hitchhiker HCPs often reside — PLBL2, for example, was poorly immunogenic and was underreported by >10-fold in early commercial ELISA kits. Antibody coverage must be validated by 2D gel/Western blot or by orthogonal LC-MS/MS. LC-MS/MS-based HCP identification (HCP-ID) provides protein-level identification and semi-quantitative measurement of individual HCPs. The workflow: deplete the mAb (e.g., by Protein G affinity or by native digest that preferentially cleaves the mAb), digest the remaining HCPs with trypsin, and analyse by nanoLC-MS/MS with database searching against the CHO proteome. LC-MS/MS can identify 50-200 individual HCPs in a drug substance sample, providing a comprehensive hitchhiker profile. Best practice: use ELISA for lot release (quantitative, validated, rapid) and LC-MS/MS for characterisation (identifies specific HCPs, informs process development, validates ELISA coverage).',
    },
    {
      type: 'card',
      title: 'Host Cell DNA (HCD)',
      color: 'amber',
      content:
        'Residual host cell DNA in the drug substance is a process impurity with a historical safety concern rooted in the oncogenicity risk of CHO-derived DNA containing activated oncogenes (CHO cells are transformed). The WHO study group (1997) recommended a limit of <=10 ng residual DNA per dose, which has been universally adopted. This limit was set conservatively, assuming that even a single copy of an activated oncogene integrated into a patient cell could theoretically initiate transformation. Modern risk assessments (Kramer, 2009; Sheng-Fowler et al., 2009) have demonstrated that the actual oncogenic risk is negligible — the probability of a single transforming event from 10 ng of CHO DNA is estimated at <10^-24 per dose — but the 10 ng/dose limit persists as a regulatory expectation. Measurement is by quantitative PCR (qPCR) using CHO-specific primers targeting repetitive elements (e.g., CHO-specific LINE elements) or by the threshold method (a fluorescence-based total DNA assay). qPCR is the preferred method because it provides CHO-specific quantification (excluding DNA from other sources) with sub-pg/mL sensitivity. Typical drug substance HCD levels after a well-optimised purification process: 0.1-10 ng/mg (well below the 10 ng/dose limit for a typical 10 mg/kg dose). DNA clearance occurs primarily at the Protein A step (3-4 log reduction) and the anion exchange polishing step (2-3 log reduction, where negatively charged DNA binds the AEX resin and is separated from the mAb in the flow-through).',
    },
    {
      type: 'card',
      title: 'Residual Protein A',
      color: 'purple',
      content:
        'Protein A affinity chromatography is the industry-standard first purification step for mAbs, providing >99% purity in a single step by exploiting the specific interaction between Staphylococcal Protein A and the Fc CH2-CH3 interface. However, Protein A ligand leaches from the resin during the low-pH elution step (pH 3.0-3.5), introducing leached Protein A (rProtein A) as a process impurity. The safety concern: Protein A is a bacterial protein that is immunogenic in humans, and anti-Protein A antibodies (primarily IgE) have been detected in patients receiving mAb therapies with elevated rProtein A levels. Clinical symptoms can include hypersensitivity reactions. Industry target levels are <10 ppm (10 ng rProtein A per mg mAb), with many companies achieving <1 ppm. Measurement is by a Protein A-specific ELISA (Cygnus Repligen Protein A ELISA is the most widely used kit, with a detection limit of ~0.5 ng/mL). Clearance occurs primarily during cation exchange chromatography (the second chromatography step after Protein A) — under typical CEX conditions (pH 5.0, low conductivity), the mAb binds and elutes while Protein A (pI 5.1) passes through in the flow-through or elutes at a different salt concentration. Additional clearance occurs on the AEX polishing step. Modern high-stability Protein A resins (e.g., MabSelect SuRe, Amsphere A3) are engineered with alkaline-resistant protein variants that leach 5-10 fold less than first-generation resins.',
    },
    {
      type: 'table',
      title: 'Viral Clearance — Target LRV by Model Virus',
      headers: ['Model Virus', 'Target Virus Represented', 'Genome', 'Envelope', 'Size (nm)', 'Target LRV', 'Key Clearance Steps'],
      rows: [
        ['MuLV (Xenotropic Murine Leukemia Virus)', 'Endogenous retrovirus (Type C) particles in CHO cells', 'RNA', 'Yes', '80-110', '>=12 LRV', 'Low-pH inactivation (4-6 LRV) + nanofiltration (4-5 LRV) + Protein A (1-3 LRV)'],
        ['MMV (Minute Virus of Mice)', 'Small non-enveloped parvoviruses (robust, hard to inactivate)', 'DNA', 'No', '18-24', '>=6 LRV', 'Nanofiltration 20nm (>=4 LRV) + AEX (1-2 LRV); low-pH NOT effective'],
        ['Reovirus Type 3', 'Non-enveloped dsRNA viruses; represents hardy virus model', 'RNA', 'No', '60-80', '>=6 LRV', 'Nanofiltration (>=4 LRV) + AEX (1-2 LRV)'],
        ['PRV (Pseudorabies Virus)', 'Large enveloped DNA viruses (herpesvirus family)', 'DNA', 'Yes', '120-200', '>=6 LRV', 'Low-pH inactivation (>=4 LRV) + Protein A (2-3 LRV) + nanofiltration'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Viral Clearance Validation — Regulatory Framework',
      color: 'green',
      content:
        'Viral safety is the most heavily regulated aspect of biologics manufacturing, governed by ICH Q5A(R2) (Viral Safety Evaluation of Biotechnological Products Derived from Cell Lines of Human or Animal Origin, revised 2024). The framework requires a three-pronged approach: (1) Cell line characterisation — testing the MCB, WCB, and EPC (end-of-production cells) for the presence of adventitious and endogenous viruses using in vitro assays (multiple detector cell lines: MRC-5, Vero, CHO), in vivo assays (suckling mice, embryonated eggs — now being phased out), and molecular methods (PCR panels, next-generation sequencing). CHO cells are known to harbour endogenous retrovirus-like particles (Type A and Type C) but are free from infectious retroviruses. (2) Raw material controls — all animal-derived raw materials (bovine serum, porcine trypsin, soy hydrolysate from insect-contaminated crops) must be sourced from low-risk origins and tested for specific viral contaminants. Chemically defined media eliminate most raw material viral risk. (3) Viral clearance validation — the purification process must be validated to demonstrate robust removal/inactivation of viruses using scaled-down model virus spiking studies. Each clearance step is assigned a log reduction value (LRV), and the overall clearance must provide an adequate safety margin (typically >=12 LRV for the model retrovirus, MuLV).',
    },
    {
      type: 'bullets',
      title: 'Viral Clearance Steps in a Typical mAb Process',
      items: [
        'Low-pH viral inactivation (pH 3.3-3.6, >=30 minutes at 15-25C): The dedicated viral inactivation step targeting enveloped viruses. MuLV is reduced by 4-6 LRV. Critical process parameters: pH (must reach target throughout the vessel — mixing is critical), hold time (minimum 30 min from last aliquot reaching target pH), and temperature (>=15C; lower temperatures slow inactivation kinetics). This step is NOT effective against non-enveloped viruses (MMV, Reovirus).',
        'Protein A chromatography: Provides 1-3 LRV for MuLV and large enveloped viruses by size exclusion/partitioning. Not a dedicated viral clearance step, but contributes to the overall safety margin. The low-pH elution also contributes to inactivation of any enveloped virus co-bound to the resin.',
        'Anion exchange chromatography (AEX, flow-through mode): The mAb passes through while negatively charged viruses bind. Provides 1-3 LRV depending on virus type and operating conditions (pH, conductivity). More effective for enveloped viruses than non-enveloped.',
        'Nanofiltration (20 nm Planova/Viresolve filters): The dedicated size-based viral removal step. Removes viruses >=20 nm by sieving, providing >=4 LRV for MuLV, >=4 LRV for MMV, and >=4 LRV for Reovirus. The filter integrity must be verified pre- and post-use by gold nanoparticle or bubble point testing. Nanofiltration is the only step that provides robust clearance of non-enveloped parvoviruses.',
      ],
    },
    {
      type: 'callout',
      title: 'ICH Q5A(R2) 2024 Update — Key Changes',
      variant: 'info',
      content:
        'The 2024 revision of ICH Q5A introduces several significant updates: (1) Acceptance of next-generation sequencing (NGS/massively parallel sequencing) as a replacement for in vivo virus testing, which was previously required for cell bank characterisation. This eliminates the need for suckling mouse and embryonated egg assays, improving animal welfare and increasing detection sensitivity. (2) A risk-based approach to viral clearance validation that allows reduced study scope when the process includes orthogonal inactivation and removal steps with well-understood mechanisms. (3) Recognition that CHO-derived endogenous retroviral particles, while detectable by TEM and RT activity, are non-infectious and do not require the same safety margin as an infectious retrovirus. (4) Guidance on re-evaluation triggers — when a viral clearance study should be repeated (e.g., after significant process changes to a viral clearance step, not for minor parameter adjustments within the validated range).',
    },
    {
      type: 'callout',
      title: 'PLBL2 — Lessons Learned from Industry',
      variant: 'danger',
      content:
        'The PLBL2 episode (2014-2016) represents the most impactful HCP-related quality event in the mAb industry. PLBL2 (phospholipase B-like 2) is a CHO lipase that co-purifies with IgG because it binds directly to Protein A resin (not to the mAb itself). At levels of 1-50 ppm, PLBL2 hydrolyses polysorbate 80 over the shelf life, generating free oleic acid and stearic acid that form insoluble fatty acid particles visible as subvisible/visible particulates. The consequences: (1) Multiple commercial mAb products experienced unexplained particle formation on stability, leading to batch rejections and supply disruptions. (2) Generic HCP ELISAs significantly underreported PLBL2 because it was poorly immunogenic in the animals used to generate anti-CHO antibodies. (3) The root cause was identified only when LC-MS/MS HCP identification was applied. Mitigation strategies: PLBL2-specific ELISA for targeted monitoring, downstream process optimization (wash steps on Protein A, HIC chromatography for PLBL2 removal), and PLBL2-knockout CHO cell lines (now commercially available from multiple suppliers). The lesson: generic HCP ELISA alone is insufficient — orthogonal LC-MS/MS HCP identification must be performed during development and periodically during commercial manufacturing.',
    },
  ],
  mentorQuestions: [
    'Your generic HCP ELISA reports 30 ppm total HCP, well below your 100 ppm specification. However, LC-MS/MS identifies PLBL2 at an estimated 5 ppm and Cathepsin D at 0.8 ppm. How do you reconcile the ELISA and LC-MS/MS data, and what is your risk assessment for product stability?',
    'You are designing a viral clearance validation study for a mAb purified by Protein A, cation exchange, and anion exchange (flow-through), plus low-pH inactivation and nanofiltration. Which model viruses would you select, which steps would you validate for each, and what is the minimum overall LRV you would target for MuLV?',
    'A regulatory reviewer asks why your residual DNA specification is set at <10 ng/dose when modern risk assessments suggest the oncogenic risk is negligible at levels 1000-fold higher. How do you respond while maintaining a compliant and scientifically justified position?',
  ],
};
