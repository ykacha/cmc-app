import type { ModuleContent } from '../../types/content';

export const module2: ModuleContent = {
  id: 'cqa-m2',
  sectionId: 'cqa',
  moduleNumber: 2,
  eyebrow: 'CQA 03',
  title: 'Size Variants — Aggregates, Fragments & Particles',
  lead: 'The full landscape of mAb size heterogeneity from soluble dimers to visible particles — aggregation mechanisms, fragmentation pathways, analytical detection, and the immunogenicity implications that make size variants among the highest-priority CQAs.',
  tags: [
    { label: 'Aggregation', color: 'red' },
    { label: 'Fragmentation', color: 'amber' },
    { label: 'Subvisible Particles', color: 'purple' },
    { label: 'SEC / CE-SDS', color: 'teal' },
  ],
  stats: [
    { label: 'Aggregation Mechanisms', value: '6 major' },
    { label: 'Fragment Types', value: '4+' },
    { label: 'Analytical Methods', value: '6 orthogonal' },
    { label: 'Monomer Spec', value: '>=95%' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Size Variant Landscape — Why It Matters',
      color: 'red',
      content:
        'Size variants encompass all species that deviate from the expected ~150 kDa monomeric IgG, ranging from low-molecular-weight fragments (25-75 kDa) through soluble oligomers (300-600 kDa) to subvisible particles (0.1-100 um) and visible particles (>100 um). They are universally classified as CQAs for therapeutic mAbs because they impact all four risk dimensions: (1) Biological Activity — aggregates have reduced target binding per molecule due to Fab steric occlusion; fragments lack bivalent binding or Fc effector function. (2) PK — large aggregates are cleared rapidly via the reticuloendothelial system; fragments below the FcRn recycling threshold (~50 kDa) have dramatically shortened half-lives. (3) Immunogenicity — subvisible aggregates (0.1-10 um) are the single greatest immunogenicity risk factor for therapeutic proteins, presenting repetitive epitopes that cross-link B-cell receptors. (4) Safety — aggregates activate complement (C3a, C5a anaphylatoxins) and cross-link FcgammaR on basophils/mast cells, causing infusion-related reactions. The FDA has increasingly scrutinised the "gap" between SEC detection (>~0.5 nm radius, <~10 MDa) and visible particle detection (>100 um), leading to mandates for subvisible particle characterisation in the 2-100 um range.',
    },
    {
      type: 'table',
      title: 'Aggregation Mechanisms',
      headers: ['Mechanism', 'Driving Force', 'Typical Conditions', 'Prevention Strategy', 'Monitoring Method'],
      rows: [
        ['Thermal', 'Partial unfolding exposes hydrophobic core; intermolecular hydrophobic association', '>=40C; below Tonset (~62-72C for IgG1 CH2)', 'Cold chain maintenance; formulation Tm optimisation with DSC/nanoDSF', 'SEC, DLS, DSF thermal ramp'],
        ['Mechanical (shear)', 'Air-liquid and solid-liquid interfaces; cavitation at high shear', 'Pumping, filling, shipping, freeze-thaw; vortexing', 'Surfactant (PS80 0.02-0.1%); minimise headspace; controlled fill speed', 'SEC, subvisible particle counting (MFI)'],
        ['Interfacial (surface)', 'Adsorption to hydrophobic surfaces unfolds protein; nucleation at interfaces', 'Silicone oil in PFS, glass delamination, filter membranes', 'Baked-on silicone or silicone-free PFS; surfactant; low-bind containers', 'MFI (silicone oil droplet discrimination), HIAC'],
        ['pH-induced', 'Charge neutralisation near pI reduces electrostatic repulsion; acid/base unfolding', 'Low-pH viral inactivation (pH 3.3-3.6); buffer exchange', 'Minimise hold time at low pH; rapid neutralisation; formulate away from pI', 'SEC, turbidity, DLS'],
        ['Freeze-thaw', 'Ice-liquid interface concentration; cryoconcentration of solutes and protein', 'DS freezing at -20C/-70C; DP freeze-thaw in shipping', 'Controlled freezing rate; cryoprotectants (sucrose, trehalose); surfactant', 'SEC, subvisible particles pre/post F/T'],
        ['Chemical (covalent)', 'Disulfide scrambling, thioether crosslinks, formaldehyde-mediated crosslinks', 'Oxidative stress, formaldehyde from PEG degradation, high pH', 'Minimise oxidative exposure; avoid PEG in stoppers; control pH', 'CE-SDS (non-reducing), SEC-MALS'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Fragment Types and Mechanisms',
      color: 'amber',
      content:
        'Fragmentation generates species smaller than the intact 150 kDa monomer and is a primary degradation pathway during storage. The major fragmentation routes are: (1) Hinge-region clipping at Asp-Pro bonds — the single most common non-enzymatic fragmentation pathway. The Asp221-Pro222 bond in the upper hinge of IgG1 is susceptible to acid-catalysed hydrolysis, generating ~100 kDa (Fab + Fc-half) and ~50 kDa (Fab, half-Fc) fragments. The rate is pH-dependent (accelerated below pH 5) and increases at elevated temperatures. (2) Enzymatic clipping by cathepsin D — a host cell protein impurity (aspartic protease) that survives purification and clips the hinge at a nearby but distinct site. Cathepsin D activity is a leading cause of in-use stability failures; even sub-ppm levels can cause measurable clipping over 24-month storage at 2-8C. (3) Enzymatic clipping by cathepsin L — a cysteine protease that clips in the lower hinge. Particularly problematic for IgG1 molecules expressed in CHO cells with high cathepsin L secretion. (4) Acid hydrolysis at Asp-X bonds — generalised acid-labile cleavage at any Asp-Xxx peptide bond, but kinetically significant primarily in unstructured regions (hinge, linkers). Fragments are detected by CE-SDS under non-reducing conditions (intact molecular sizing) and reducing conditions (individual heavy and light chain integrity).',
    },
    {
      type: 'table',
      title: 'Fragment Species and Detection',
      headers: ['Fragment Species', 'Approx. MW', 'Mechanism', 'Detection Method', 'Clinical Impact'],
      rows: [
        ['Half-antibody (HL)', '~75 kDa', 'Incomplete inter-chain disulfide bonding (IgG4 > IgG1)', 'CE-SDS (NR), native MS', 'Monovalent binding; loss of avidity; reduced potency'],
        ['Fab fragment', '~50 kDa', 'Hinge clipping (Asp-Pro hydrolysis; cathepsin D/L)', 'CE-SDS (NR), SEC', 'No Fc effector function; short half-life (~hours); loss of bivalency'],
        ['Fc fragment', '~50 kDa', 'Hinge clipping (same mechanisms)', 'CE-SDS (NR), SEC', 'No target binding; FcRn binding retained; competitor for FcRn recycling'],
        ['scFc (single-chain Fc)', '~25 kDa', 'Reducing conditions or incomplete disulfide formation', 'CE-SDS (R)', 'No biological activity; minor impurity'],
        ['Light chain free', '~25 kDa', 'Disulfide reduction or incomplete assembly', 'CE-SDS (R), SEC', 'Free light chain can be immunogenic (Bence Jones protein analogy)'],
        ['Low-MW species (<25 kDa)', 'Variable', 'Extensive backbone hydrolysis at multiple Asp-X sites', 'CE-SDS (R), peptide mapping', 'Loss of all function; indicator of severe degradation'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Subvisible Particles — The Regulatory Gap',
      color: 'purple',
      content:
        'Subvisible particles (SVPs) in the 0.1-100 um range occupy a critical gap between SEC detection (upper limit ~50 nm aggregate radius) and visual inspection (lower limit ~100 um). This gap is the most immunologically dangerous size range: particles of 0.1-10 um are efficiently taken up by antigen-presenting cells (dendritic cells, macrophages), and their repetitive epitope presentation activates B cells through BCR cross-linking. USP <787> (Subvisible Particulate Matter in Therapeutic Protein Injections) established specific limits: <=6000 particles/container >=10 um and <=600 particles/container >=25 um. The FDA 2014 guidance "Immunogenicity Assessment for Therapeutic Protein Products" explicitly calls for subvisible particle characterisation as part of the immunogenicity risk assessment. Emerging regulatory expectations include characterisation in the 2-10 um range (below traditional HIAC detection) using flow imaging microscopy (MFI, FlowCam) with morphological discrimination between protein aggregates (irregular, translucent) and silicone oil droplets (spherical, bright edge), glass particles (angular, birefringent), and air bubbles (circular, dark edge). The challenge is that SVP counts are highly sensitive to sample handling — agitation, freeze-thaw, degassing, and filtration all affect results, making method qualification and sample handling SOPs critical.',
    },
    {
      type: 'table',
      title: 'Analytical Methods for Size Variants',
      headers: ['Method', 'Size Range', 'Principle', 'Key Parameters', 'Typical Spec/Limit', 'Limitations'],
      rows: [
        ['SEC-HPLC', '10 kDa – 10 MDa', 'Size-based chromatographic separation; larger species elute first', 'Column (TSKgel G3000SWXL); mobile phase pH/ionic strength; flow rate 0.5 mL/min', '>=95% monomer; <=2% HMW; <=3% LMW', 'Column interaction artefacts; dilution dissociates weak aggregates; upper size limit ~50 nm radius'],
        ['CE-SDS (NR)', '10–250 kDa', 'SDS-denatured sizing by capillary electrophoresis under non-reducing conditions', 'SDS concentration; denaturation temperature (70C, 10 min); capillary length', '>=95% intact IgG (NR); report fragments', 'Denaturing: destroys non-covalent aggregates; only detects covalent aggregates'],
        ['CE-SDS (R)', '10–100 kDa', 'SDS + reducing agent (beta-ME) — separates individual chains', 'beta-ME concentration; denaturation conditions; internal standard', 'HC ~67%, LC ~28%; report additional bands', 'Incomplete reduction or over-reduction; glycosylation affects HC migration'],
        ['DLS', '1 nm – 6 um', 'Photon correlation spectroscopy measures hydrodynamic radius from Brownian motion', 'Temperature; viscosity correction; measurement angle; accumulation time', 'Z-average hydrodynamic radius; polydispersity index <0.2', 'Intensity-weighted: large particles dominate signal; poor resolution of closely-sized species'],
        ['AUC-SV', '1 kDa – 1 GDa', 'Sedimentation velocity in analytical ultracentrifuge; size from sedimentation coefficient', 'Rotor speed (40-50k RPM); detection (absorbance or interference); c(s) analysis', 'Report % monomer, dimer, HMW; gold standard for oligomer quantification', 'Low throughput (4-6 hr per run); expensive instrumentation; requires experienced operators'],
        ['MFI (Micro-Flow Imaging)', '2–100 um', 'Flow imaging microscopy captures particle images in flow cell; automated morphological classification', 'Flow rate; illumination; image quality threshold; focus', '<=6000 particles/container >=10 um (USP <787>)', 'Sample handling sensitivity; air bubble interference; requires morphological classifier training'],
        ['HIAC (Light Obscuration)', '2–100 um', 'Particles passing through laser beam cause light obscuration proportional to projected area', 'Flow rate 10 mL/min; sensor calibration with NIST-traceable beads', '<=6000/container >=10 um; <=600/container >=25 um', 'Cannot discriminate particle types; silicone oil counted as particles; minimum volume 0.2 mL'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: 'Cathepsin D — The Hidden Hitchhiker',
      variant: 'danger',
      content:
        'Cathepsin D (CatD), an aspartic protease secreted by CHO cells, is among the most problematic "hitchhiker" HCPs for mAb products. At concentrations as low as 0.1-1 ppm, CatD can cause measurable hinge clipping over a 24-month shelf life at 2-8C, generating fragments that accumulate linearly with time. CatD is particularly insidious because: (1) it co-purifies with IgG through Protein A and ion exchange chromatography due to its size (~45 kDa) and charge properties; (2) it is active at the slightly acidic pH (5.5-6.5) typical of mAb formulations; (3) it is not reliably detected by generic HCP ELISAs (poor immunoreactivity in many commercial anti-CHO HCP antibody panels). Mitigation requires: orthogonal HCP analysis by LC-MS/MS to identify CatD specifically, optimisation of downstream purification to remove CatD (hydrophobic interaction chromatography is often effective), and accelerated stability studies at 25C and 40C to monitor fragmentation kinetics as an indirect CatD activity readout.',
    },
    {
      type: 'bullets',
      title: 'Aggregation Control Strategy — Lifecycle Approach',
      items: [
        'Molecular design: Engineer Fab and Fc for high colloidal stability. Screen during candidate selection using AC-SINS (affinity-capture self-interaction nanoparticle spectroscopy), CIC (cross-interaction chromatography), and DLS at high concentration. Reject candidates with B22 (second virial coefficient) < 0.',
        'Upstream process: Control cell culture viability (>80% at harvest) to minimise protease/nuclease release. Avoid feed strategies that drive excessive cell lysis. Harvest clarification (depth filtration + 0.2 um) removes cell debris that nucleates aggregation.',
        'Downstream process: Minimise low-pH hold time during viral inactivation (pH 3.3-3.6). Optimise UF/DF to avoid concentration-dependent aggregation at >100 mg/mL. Control freeze-thaw of DS intermediates with controlled-rate freezing.',
        'Formulation: Optimise pH (typically 5.5-6.5, away from pI). Add surfactant (PS80 0.02-0.1%). Include stabilisers (sucrose 5-10%, trehalose, arginine). Minimise headspace in container closure. Target protein concentration that balances dosing needs against concentration-dependent aggregation.',
        'Storage and distribution: Validated cold chain 2-8C. Shipping qualification with temperature and vibration monitoring. In-use stability studies for reconstitution/dilution conditions. Photostability per ICH Q1B (light-induced aggregation).',
      ],
    },
    {
      type: 'callout',
      title: 'Emerging Regulatory Focus — Subvisible Particle Characterisation',
      variant: 'warning',
      content:
        'Regulatory expectations for subvisible particle characterisation have evolved significantly since 2014. The current expectation (reflected in FDA and EMA review practice, not yet in formal guidance) includes: (1) Orthogonal particle counting covering 0.1-100 um using at least two complementary methods (e.g., MFI + HIAC, or MFI + RMM/Archimedes for the submicron range). (2) Morphological discrimination between protein particles, silicone oil, glass, and air. (3) Stress studies demonstrating particle formation kinetics under representative stress conditions (agitation, freeze-thaw, temperature cycling, light exposure). (4) A clear rationale for any acceptance criteria beyond compendial USP <787> limits. Biosimilar applications face particularly stringent expectations — the FDA expects side-by-side SVP profiling with the reference product, and differences must be justified in the totality of evidence.',
    },
  ],
  mentorQuestions: [
    'Your SEC stability data show a steady 0.3%/year increase in HMW species, but your HIAC subvisible particle counts remain constant. Does this mean you have no particle problem? What could explain the disconnect between these two orthogonal methods?',
    'A batch shows 1.8% aggregate by SEC — within the <=2% specification — but the MFI data reveal an unusually high particle count in the 2-10 um range with irregular morphology. How do you disposition this batch, and what investigation do you initiate?',
    'You discover that cathepsin D is present at 0.5 ppm in your drug substance. Your 6-month accelerated stability at 25C shows no increase in fragmentation. Can you conclude that CatD is not a risk? What additional studies would you design?',
  ],
};
