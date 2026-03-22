import type { ModuleContent } from '../../types/content';

export const module8: ModuleContent = {
  id: 'cqa-m8',
  sectionId: 'cqa',
  moduleNumber: 8,
  eyebrow: 'CQA 09',
  title: 'Control Strategy — From Specification to Lifecycle',
  lead: 'The ICH Q10 control strategy framework for therapeutic mAbs — a four-tiered system that translates CQA classification into actionable specifications, in-process controls, process parameter ranges, and raw material controls, integrated with design space and lifecycle management.',
  tags: [
    { label: 'ICH Q10', color: 'blue' },
    { label: 'Control Tiers', color: 'green' },
    { label: 'Design Space', color: 'amber' },
    { label: 'Lifecycle', color: 'purple' },
  ],
  stats: [
    { label: 'Control Tiers', value: '4' },
    { label: 'ICH Framework', value: 'Q8/Q9/Q10/Q12' },
    { label: 'Typical Release Tests', value: '15-20' },
    { label: 'CPPs per Unit Op', value: '5-15' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Control Strategy — The Bridge from Knowledge to Assurance',
      color: 'blue',
      content:
        'A control strategy, as defined by ICH Q10 (Pharmaceutical Quality System), is "a planned set of controls, derived from current product and process understanding, that assures process performance and product quality." It is the operational translation of CQA knowledge into manufacturing practice — the control strategy answers the question "how do we ensure that every CQA meets its acceptance criteria in every batch?" The strategy encompasses all elements that collectively provide this assurance: drug substance and drug product specifications (with acceptance criteria for each CQA), in-process controls and tests, critical process parameter (CPP) ranges, raw material specifications, facility and equipment controls, and the overall monitoring programme. A well-designed control strategy is risk-proportionate — CQAs with high clinical impact receive stringent controls at multiple tiers, while non-CQAs receive only characterisation-level controls. The strategy is documented in CTD Module 3.2.P.2 (Pharmaceutical Development) and 3.2.P.5 (Control of Drug Product), with cross-references to the CQA risk assessment and the process validation reports.',
    },
    {
      type: 'table',
      title: 'Four-Tier Control Strategy Framework',
      headers: ['Tier', 'Control Type', 'When Applied', 'Example Controls', 'Regulatory Expectation'],
      rows: [
        ['Tier 1', 'Release/Stability Specifications', 'Every batch release; stability timepoints', 'SEC >=95% monomer; potency 80-125%; HCP <100 ppm; charge variants %acidic/%main/%basic; glycan profile; endotoxin; sterility', 'Defined in CoA; filed in CTD 3.2.S.4.1 / 3.2.P.5.1; acceptance criteria justified by clinical data and process capability'],
        ['Tier 2', 'In-Process Controls (IPC) and PAT', 'During manufacturing at defined unit operation steps', 'Post-Protein A pool: protein concentration, pH, conductivity; post-viral inactivation: pH >=3.3 for >=30 min; UF/DF retentate: concentration, pH, osmolality; fill weight +-2%', 'IPC limits in batch record; PAT measurements logged; deviations investigated per deviation management SOP'],
        ['Tier 3', 'Critical Process Parameter (CPP) Ranges', 'Continuous monitoring/control during each unit operation', 'Bioreactor: pH 6.8-7.2, DO >=30%, temp 36.5-37.5C (growth), 32-34C (production); Protein A: load <=40 g/L resin, wash pH 7.0+-0.1, elute pH 3.4+-0.1; UF/DF: TMP 10-20 psi', 'CPP ranges in process description (CTD 3.2.S.2.2); ranges derived from DOE/design space; changes within ranges do not require regulatory notification'],
        ['Tier 4', 'Raw Material and Component Controls', 'Incoming material testing; supplier qualification', 'Cell culture media components: amino acid purity, glucose content, trace metals (Fe, Cu, Mn); PS80: peroxide value <10 mEq/kg; buffers: pH, conductivity; resins: ligand density, pressure-flow; container closure: extractables/leachables', 'Raw material specs in CTD 3.2.S.2.3 / 3.2.P.4; supplier audits; CoA verification; stability of critical reagents'],
      ],
    },
    {
      type: 'card',
      title: 'Tier 1 — Release Specifications',
      color: 'green',
      content:
        'Release specifications are the batch-disposition gatekeepers — every batch must meet every specification before it can be released to the market. ICH Q6B Section 6 provides the framework for setting biologics specifications: "Specifications should be based on data obtained from lots used in preclinical and clinical studies, lots used for demonstration of manufacturing consistency, and data from stability studies." For mAbs, the typical release panel includes 15-20 tests spanning: appearance (clear, colourless to pale yellow), pH (target +-0.3), protein concentration (UV A280, target +-10%), identity (peptide map or iCIEF pI match), purity by SEC (monomer >=95%), purity by CE-SDS NR (intact IgG >=90%), charge variants by iCIEF (%acidic, %main, %basic ranges), glycan profile by HILIC-FLR (afucosylation, galactosylation, high-mannose ranges), potency by bioassay (80-125% relative to reference), HCP by ELISA (<100 ppm), HCD by qPCR (<10 ng/dose), residual Protein A by ELISA (<10 ppm), endotoxin by LAL (<0.25 EU/mL), sterility (sterile by membrane filtration), subvisible particles by HIAC (USP <787>), and visible particles (essentially free). Each specification has a defined acceptance criterion, a reference to the validated method, and a statistical justification (typically process capability indices Cpk >=1.33, corresponding to a 99.99% pass rate).',
    },
    {
      type: 'card',
      title: 'Tier 2 — In-Process Controls and PAT',
      color: 'teal',
      content:
        'In-process controls (IPCs) are tests performed during manufacturing at critical decision points. They serve as real-time quality assurance, catching deviations before they propagate downstream. Key IPC points in a mAb process: (1) Harvest: cell viability (>80% target, >=60% action limit — low viability increases HCP and DNA load), turbidity (after depth filtration), bioburden (pre-0.2 um filtration). (2) Post-Protein A: pH, conductivity, protein concentration (yield calculation), aggregate check (optional at-line SEC). (3) Viral inactivation: pH verification (minimum 3.3 continuously for >=30 minutes, documented by calibrated pH probe with continuous logging), temperature (>=15C). (4) Chromatography polishing: column performance (HETP, asymmetry, pressure), pool criteria (UV, conductivity, volume). (5) UF/DF: retentate concentration (target +-10%), buffer exchange completeness (conductivity), transmembrane pressure (TMP within validated range). (6) Drug product filling: fill weight (target +-2%), container closure integrity (100% inspection for vials, headspace analysis for PFS). Process Analytical Technology (PAT) takes IPC further by providing continuous, real-time monitoring: in-line UV for protein concentration, Raman spectroscopy for glycan monitoring, capacitance probes for viable cell density, and multi-variate process monitoring (MVPM) for holistic process state assessment.',
    },
    {
      type: 'card',
      title: 'Tier 3 — Critical Process Parameters (CPPs)',
      color: 'amber',
      content:
        'CPPs are process parameters whose variability has an impact on a CQA and therefore must be monitored or controlled to ensure the process produces the desired quality. CPPs are identified through a combination of prior knowledge, risk assessment, and experimental studies (DOE). For each CPP, the control strategy defines: the normal operating range (NOR — where the process is typically operated), the proven acceptable range (PAR — the range demonstrated to produce acceptable quality, wider than NOR), and the design space boundary (the multidimensional space where quality is assured, potentially allowing CPP trade-offs). Examples for upstream cell culture: pH is a CPP for glycosylation (lower pH reduces galactosylation and increases high-mannose) with NOR 6.9-7.1 and PAR 6.8-7.2; temperature shift timing and magnitude are CPPs for product quality (temperature shift from 37C to 33C on Day 5-7 controls cell growth vs. productivity and affects glycan processing); dissolved oxygen is a CPP for cell viability and product quality (NOR >=30% air saturation, PAR >=20%). For downstream: Protein A elution pH is a CPP for product quality and viral inactivation (NOR 3.3-3.5, PAR 3.2-3.6, below 3.2 risks protein aggregation); CEX load challenge is a CPP for HCP clearance (NOR 30-40 g/L, PAR 20-50 g/L). Each CPP-CQA linkage must be documented with supporting data.',
    },
    {
      type: 'table',
      title: 'CPP-CQA Linkage Matrix (Selected Examples)',
      headers: ['Unit Operation', 'CPP', 'NOR', 'PAR', 'CQA(s) Affected', 'Mechanism'],
      rows: [
        ['Cell Culture', 'pH', '6.9-7.1', '6.8-7.2', 'Glycan profile (galactosylation, high-mannose), charge variants', 'pH affects Golgi enzyme activity; lower pH reduces galactosylation'],
        ['Cell Culture', 'Temperature (production phase)', '32.5-33.5C', '32-34C', 'Glycan profile, aggregates, titre', 'Lower temp reduces cell growth, increases specific productivity, allows more Golgi processing time'],
        ['Cell Culture', 'Dissolved oxygen', '>=30% sat', '>=20% sat', 'Cell viability, HCP levels, oxidation variants', 'Low DO causes cell stress, increases HCP release, promotes oxidative modifications'],
        ['Cell Culture', 'Harvest day', 'Day 12-14', 'Day 10-16', 'High-mannose, aggregates, HCP, titre', 'Extended culture increases high-mannose and HCP; earlier harvest reduces yield'],
        ['Protein A', 'Elution pH', '3.3-3.5', '3.2-3.6', 'Aggregate formation, viral inactivation effectiveness', 'Lower pH increases aggregation risk; higher pH reduces viral inactivation efficacy'],
        ['Protein A', 'Load challenge (g/L resin)', '30-40', '20-50', 'HCP clearance, Protein A leachate', 'Overloading reduces HCP clearance and increases Protein A leaching'],
        ['Low-pH VI', 'pH', '3.3-3.5', '3.2-3.6', 'Viral safety, aggregation', 'Must reach target pH throughout vessel; insufficient mixing = incomplete inactivation'],
        ['Low-pH VI', 'Hold time', '>=60 min', '>=30 min', 'Viral safety', 'Minimum 30 min from last portion reaching target pH; longer is safer'],
        ['CEX', 'Elution conductivity', '15-25 mS/cm', '10-30 mS/cm', 'HCP clearance, Protein A clearance, yield', 'Higher conductivity elutes more impurities with product'],
        ['UF/DF', 'TMP', '10-20 psi', '5-25 psi', 'Aggregation (concentration-dependent)', 'High TMP increases local concentration at membrane surface; promotes aggregation'],
        ['Formulation', 'PS80 concentration', '0.04-0.06%', '0.02-0.1%', 'Aggregation, subvisible particles', 'Below CMC (0.012%) loses protective effect; excess can increase degradation product particles'],
        ['Fill', 'Fill volume', 'Target +-2%', 'Target +-5%', 'Dose accuracy', 'Directly affects delivered dose; overfill/underfill are out-of-specification'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Design Space — ICH Q8(R2) Enhanced Approach',
      color: 'purple',
      content:
        'The design space concept, introduced in ICH Q8(R2), represents the pinnacle of the enhanced (Quality by Design) approach to pharmaceutical development. Defined as "the multidimensional combination and interaction of input variables (e.g., material attributes) and process parameters that have been demonstrated to provide assurance of quality," the design space allows operational flexibility within the filed boundaries without requiring prior regulatory approval for changes. For mAb processes, design spaces are typically defined for the most critical unit operations: upstream cell culture (pH, temperature, DO, feed strategy boundaries that maintain glycan profile and product quality), Protein A chromatography (load/wash/elution conditions that ensure purity and yield), viral inactivation (pH/time/temperature combinations that ensure >=4 LRV MuLV clearance), and UF/DF (concentration/TMP/flux conditions that prevent aggregation). The design space is established through DOE studies, often using response surface methodology (RSM) or definitive screening designs (DSD), and is visualised as contour plots showing the operating region where all CQAs meet acceptance criteria simultaneously. Movement within the design space is managed by the company PQS (Pharmaceutical Quality System) and does not require regulatory prior approval — this is the primary incentive for investing in design space development.',
    },
    {
      type: 'card',
      title: 'Lifecycle Management — ICH Q12',
      color: 'pink',
      content:
        'ICH Q12 (Technical and Regulatory Considerations for Pharmaceutical Product Lifecycle Management, 2020) provides the framework for managing post-approval changes to the control strategy. The key concept is the "Established Conditions" (ECs) — the subset of product and process information in the approved dossier that represents a legally binding commitment. Changes to ECs require regulatory reporting at a level proportionate to the risk. ICH Q12 defines three reporting categories: (1) Prior Approval Supplement (PAS) — required for changes outside the design space or changes to release specifications. Example: adding a new manufacturing site for drug substance, changing the cell substrate, widening a specification limit. (2) Changes Being Effected (CBE-30) — for changes within the design space that are supported by data but are outside the normal operating range. Example: shifting Protein A elution pH from 3.4 to 3.3 within the filed PAR. (3) Annual Report — for minor changes within approved ranges or administrative changes. Example: adjusting a non-critical process parameter, updating a reference standard lot. The lifecycle approach also encompasses comparability assessments per ICH Q5E (Comparability of Biotechnological/Biological Products Subject to Changes in Their Manufacturing Process) — any change that could affect a CQA requires demonstration that the pre-change and post-change product are comparable through analytical, functional, and potentially clinical bridging studies.',
    },
    {
      type: 'bullets',
      title: 'Control Strategy Integration — Linking Tiers',
      items: [
        'Vertical integration: Each CQA is controlled through multiple tiers simultaneously. Example: aggregate control includes Tier 1 (SEC >=95% at release), Tier 2 (at-line SEC after UF/DF, visual inspection at fill), Tier 3 (UF/DF TMP 10-20 psi, formulation pH 5.5-6.5, PS80 0.02-0.1%), and Tier 4 (PS80 incoming peroxide value <10 mEq/kg, sucrose purity >99%). No single tier provides sufficient assurance alone.',
        'Horizontal integration across unit operations: Glycan control requires aligned parameters across upstream (cell culture pH, temperature, DO, feed strategy), downstream (Protein A elution does not affect glycans; no downstream glycan modification), formulation (glycan-stable pH), and analytics (HILIC-FLR release testing). A change in any upstream parameter can affect glycans, requiring the entire chain to be reassessed.',
        'Risk-proportionate depth: High-risk CQAs (aggregates, potency, HCP) receive all four tiers of control. Medium-risk CQAs (charge variants, specific glycoforms) receive Tier 1 + Tier 3. Low-risk attributes (C-terminal Lys, pyroGlu) receive Tier 3 only (process control ensures consistency without release testing).',
        'Data flow and trending: All control strategy data (release, stability, IPC, CPP) must flow into a single trending system that enables statistical process control (SPC) and early detection of drift. ICH Q10 requires periodic product quality review (APQR — Annual Product Quality Review) that analyses trends across all tiers.',
      ],
    },
    {
      type: 'callout',
      title: 'Continuous Process Verification — The Modern Paradigm',
      variant: 'success',
      content:
        'FDA Guidance "Process Validation: General Principles and Practices" (2011) introduced the concept of three-stage process validation, with Stage 3 — Continuous Process Verification (CPV) — representing the ongoing assurance that the process remains in a state of control throughout commercial manufacturing. CPV uses statistical process control tools (control charts, capability analysis, multivariate monitoring) applied to CQAs, CPPs, and IPCs to detect trends, shifts, and drifts before they result in out-of-specification batches. For mAb processes, CPV typically monitors: CQA trends on release (SEC monomer, charge variants, glycan profile, potency trending over time), CPP consistency (bioreactor pH, DO, temperature excursion frequency), yield trends (step yields at each chromatography step), and environmental/utility monitoring (WFI quality, cleanroom particulates). CPV converts the control strategy from a static document into a dynamic, data-driven quality assurance system.',
    },
    {
      type: 'callout',
      title: 'Regulatory Filing — Control Strategy in the CTD',
      variant: 'warning',
      content:
        'The control strategy must be presented coherently across multiple CTD sections: (1) Module 3.2.S.2.2 (Description of Manufacturing Process) — CPP ranges and IPC tests for each unit operation. (2) Module 3.2.S.2.4 (Controls of Critical Steps and Intermediates) — rationale for critical step designation and the controls applied. (3) Module 3.2.S.3.2 (Impurities) — impurity clearance data and the specification justification. (4) Module 3.2.S.4.1 (Specifications) — release specifications with acceptance criteria and method references. (5) Module 3.2.P.2 (Pharmaceutical Development) — the overall control strategy narrative, CQA risk assessment, design space (if claimed), and the rationale for how the control strategy provides quality assurance. (6) Module 3.2.P.5 (Control of Drug Product) — drug product specifications and drug product manufacturing controls. Cross-referencing between these sections must be clear and consistent — reviewers will verify that every CQA identified in P.2 has a corresponding specification in S.4.1/P.5 or a justified alternative control.',
    },
  ],
  mentorQuestions: [
    'You have established a design space for cell culture pH (6.8-7.2) and temperature (32-34C in production phase) based on DOE data showing all CQAs meet specifications within these boundaries. Three months after approval, you want to operate at pH 6.85 and 33.5C (both within the design space but at the edge). What internal governance and documentation do you need, and do you need to notify the regulatory agency?',
    'Your annual product quality review reveals a statistically significant upward trend in %acidic species over 24 commercial batches (mean shifting from 25% to 29%, still within the 15-40% specification). All batches pass specification. How do you investigate this trend, and at what point do you escalate to a CAPA?',
    'A contract manufacturing organisation (CMO) proposes replacing your current Tier 2 at-line SEC measurement after UF/DF with a Multi-Attribute Method (MAM) that provides more information but takes 4 hours instead of 30 minutes. How do you evaluate this trade-off from a control strategy perspective?',
  ],
};
