import type { ModuleContent } from '../../types/content';

export const module11: ModuleContent = {
  id: 'structure-m11',
  sectionId: 'structure',
  moduleNumber: 11,
  eyebrow: 'STRUCTURE 12',
  title: 'Disulfide Bond Atlas',
  lead: 'All 16 disulfide bonds in IgG1 — their EU positions, structural roles, and the CMC consequences when they break, scramble, or fail to form.',
  tags: [
    { label: '16 Bonds', color: 'amber' },
    { label: 'Redox', color: 'red' },
    { label: 'CE-SDS', color: 'blue' },
  ],
  stats: [
    { label: 'Intra-domain', value: '12 bonds' },
    { label: 'Inter-chain', value: '4 bonds' },
    { label: 'Detection', value: 'Non-reducing CE-SDS' },
    { label: 'Key Risk', value: 'Trisulfide bonds' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Overview — The 16 Disulfide Bonds of IgG1',
      color: 'blue',
      content:
        'A complete IgG1 molecule contains 16 disulfide bonds: 12 intra-domain bonds (one per immunoglobulin domain, with CH2 and CH3 counting twice for the two heavy chains) and 4 inter-chain bonds (2 HC-LC bonds and 2 HC-HC bonds in the hinge). Each bond serves a distinct structural role: intra-domain disulfides pin together the two beta-sheets of the immunoglobulin fold and are essential for domain stability, while inter-chain disulfides covalently link the four polypeptide chains into the intact heterotetramer. The 32 cysteine residues involved in these bonds represent approximately 2.3% of total IgG1 residues (~1340 amino acids for a typical IgG1). Any deviation from correct disulfide pairing — whether incomplete formation, reduction, scrambling, or aberrant bonding — generates product-related impurities that must be controlled through CMC specifications. The disulfide bond map is the structural foundation for interpreting non-reducing CE-SDS, peptide mapping, and intact mass spectrometry data.',
    },
    {
      type: 'table',
      title: 'Complete IgG1 Disulfide Bond Map (EU Numbering)',
      headers: ['Bond #', 'Bond Type', 'Residue 1 (EU)', 'Residue 2 (EU)', 'Domain', 'Structural Role', 'CMC Consequence if Broken'],
      rows: [
        ['1', 'Intra-domain', 'C22 (VH)', 'C92 (VH)', 'VH', 'Pins VH beta-sheets, stabilises CDR3 architecture', 'CDR3 loop distortion, reduced binding affinity'],
        ['2', 'Intra-domain', 'C23 (VL)', 'C88 (VL)', 'VL (Kabat C23-C88)', 'Pins VL beta-sheets, positions CDR1/CDR3', 'VL fold instability, aggregation'],
        ['3', 'Intra-domain', 'C144 (CH1)', 'C200 (CH1)', 'CH1', 'CH1 fold stability', 'CH1 unfolding, impaired LC pairing'],
        ['4', 'Intra-domain', 'C134 (CL)', 'C194 (CL)', 'CL\u03BA', 'CL fold stability', 'CL unfolding, free LC release'],
        ['5', 'Intra-domain', 'C261 (CH2-A)', 'C321 (CH2-A)', 'CH2 (chain A)', 'CH2 fold, glycan-Fc\u03B3R positioning', 'CH2 Tm drop ~10\u00B0C, loss of effector function'],
        ['6', 'Intra-domain', 'C261 (CH2-B)', 'C321 (CH2-B)', 'CH2 (chain B)', 'CH2 fold, glycan positioning (chain B)', 'Same as bond 5, on second HC'],
        ['7', 'Intra-domain', 'C367 (CH3-A)', 'C425 (CH3-A)', 'CH3 (chain A)', 'CH3 fold stability', 'CH3 Tm drop ~5\u00B0C, ProA binding affected'],
        ['8', 'Intra-domain', 'C367 (CH3-B)', 'C425 (CH3-B)', 'CH3 (chain B)', 'CH3 fold stability (chain B)', 'Same as bond 7, on second HC'],
        ['9', 'Intra-domain', 'C22 (VH-B)', 'C92 (VH-B)', 'VH (chain B)', 'VH fold stability (second HC)', 'CDR architecture destabilised'],
        ['10', 'Intra-domain', 'C23 (VL-B)', 'C88 (VL-B)', 'VL (chain B, Kabat)', 'VL fold stability (second LC)', 'VL unfolding on second LC'],
        ['11', 'Intra-domain', 'C144 (CH1-B)', 'C200 (CH1-B)', 'CH1 (chain B)', 'CH1 fold (second HC)', 'Second arm CH1 instability'],
        ['12', 'Intra-domain', 'C134 (CL-B)', 'C194 (CL-B)', 'CL (chain B)', 'CL fold (second LC)', 'Second LC fold instability'],
        ['13', 'Inter-chain', 'C220 (HC-A)', 'C214 (LC-A)', 'HC-LC (arm A)', 'Covalent HC-LC linkage', 'Free LC peak on non-reducing CE-SDS'],
        ['14', 'Inter-chain', 'C220 (HC-B)', 'C214 (LC-B)', 'HC-LC (arm B)', 'Covalent HC-LC linkage (arm B)', 'Free LC peak, half-antibody formation'],
        ['15', 'Inter-chain', 'C226 (HC-A)', 'C226 (HC-B)', 'Hinge (upper)', 'First HC-HC bridge', 'Half-antibody (under reducing stress)'],
        ['16', 'Inter-chain', 'C229 (HC-A)', 'C229 (HC-B)', 'Hinge (lower)', 'Second HC-HC bridge', 'Complete HC-HC dissociation'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Intra-domain Disulfide Bonds — The Immunoglobulin Fold Staple',
      color: 'teal',
      content:
        'Each immunoglobulin domain contains a conserved intra-domain disulfide bond that connects the two beta-sheets of the Greek-key fold. In VH, the C22-C92 disulfide bond (EU numbering; Kabat C22-C92) spans approximately 60 residues and links the B strand (outer sheet) to the F strand (inner sheet), creating a rigid pin that holds the two sheets at a defined distance of ~5.5 angstroms. This bond is buried within the hydrophobic core of the domain and is not normally solvent-accessible. Reduction of the intra-domain disulfide in VH causes the CDR3 loop (which sits between the two sheets on the membrane-distal tip) to lose its structural scaffold, resulting in a 10-100-fold reduction in antigen binding affinity depending on CDR3 rigidity requirements. In CL\u03BA, the C134-C194 disulfide bond is slightly more accessible than the VH bond and can be partially reduced under aggressive low-pH conditions (pH <3.0), leading to CL unfolding and free LC release. The intra-CH2 disulfide (C261-C321) is critical for maintaining the glycan-bridged CH2 dimer geometry — its reduction causes CH2 to collapse onto itself, occluding the Fc\u03B3R binding groove.',
    },
    {
      type: 'card',
      title: 'Inter-chain Disulfide Bonds — Heterotetramer Assembly',
      color: 'amber',
      content:
        'The four inter-chain disulfides assemble the IgG1 heterotetramer in a defined hierarchy. HC-LC bonds (C220-C214, two bonds) form first during biosynthesis in the ER, facilitated by the BiP/GRP78 chaperone that holds the HC CH1 domain in an unfolded state until LC association occurs. The hinge inter-chain bonds (C226-C226\' and C229-C229\') form subsequently as the two HC-LC half-antibodies dimerize, a process facilitated by PDI (protein disulfide isomerase) family members. The two hinge bonds are not equivalent: C226-C226\' forms preferentially in the upper hinge and provides the primary covalent linkage, while C229-C229\' adds the second bridge closer to the CH2 domain. Under mild reducing conditions (e.g., 1-5 mM DTT), the hinge inter-chain bonds are reduced first (most solvent-exposed), followed by HC-LC bonds, and finally intra-domain bonds (most buried). This hierarchical susceptibility is exploited analytically: non-reducing CE-SDS without alkylation allows partial re-oxidation artifacts, so iodoacetamide (IAM) or N-ethylmaleimide (NEM) alkylation immediately after denaturation is essential for accurate free-thiol quantitation.',
    },
    {
      type: 'card',
      title: 'Trisulfide Bonds — The Extra Sulfur Problem',
      color: 'red',
      content:
        'Trisulfide bonds (-C-S-S-S-C-) result from insertion of an extra sulfur atom into a disulfide bond, creating a persulfide linkage that is approximately 1 angstrom longer than a standard disulfide (2.03 vs 3.04 angstroms S-S distance). Trisulfides occur predominantly at the inter-chain positions (C226-C226\' hinge and C220-C214 HC-LC) and are found at 1-10% levels in CHO-produced IgG1 depending on cell culture conditions. The mechanism involves hydrogen sulfide (H2S) generated by cysteine catabolism in CHO cells: the cystathionine-beta-synthase (CBS) and cystathionine-gamma-lyase (CSE) pathways convert cysteine and homocysteine to H2S, which reacts with nascent disulfide bonds through sulfhydryl-disulfide exchange to insert the extra sulfur. Cell culture levers to reduce trisulfide formation: (1) reduce cysteine feed concentration (decrease H2S precursor); (2) limit homocysteine accumulation by supplementing vitamin B12 and folic acid (promote methionine synthase over transsulfuration); (3) control dissolved oxygen at >30% air saturation (H2S is oxidatively consumed at higher DO); (4) harvest at lower cell viability thresholds (dead cells release CBS/CSE enzymes). Trisulfide bonds are detected by LC-MS peptide mapping: the trisulfide-containing peptide shows +32 Da mass shift (one extra sulfur).',
    },
    {
      type: 'table',
      title: 'Disulfide Variant Species — Detection and Specification',
      headers: ['Variant', 'Mass Shift (Da)', 'Detection Method', 'Primary Assay', 'Typical Specification', 'Root Cause'],
      rows: [
        ['Free thiol (unpaired Cys)', '0 (detected by Ellman)', 'Ellman\'s assay (DTNB)', 'UV absorbance at 412 nm', '<0.5 mol SH/mol IgG', 'Incomplete S-S formation in ER'],
        ['Trisulfide (-S-S-S-)', '+32 Da per bond', 'LC-MS peptide mapping', 'Extracted ion chromatogram', '<5% (per inter-chain bond)', 'H2S from cysteine catabolism'],
        ['Thioether (-C-S-C-)', '-34 Da vs S-S', 'LC-MS peptide mapping', 'Extracted ion chromatogram', 'Report only (characterisation)', 'Beta-elimination under alkaline stress'],
        ['Half-antibody (HC-LC)', 'N/A (intact ~75 kDa)', 'Non-reducing CE-SDS', '~75 kDa peak', '<5% (sum of all fragments)', 'Hinge S-S reduction'],
        ['Free light chain', 'N/A (intact ~25 kDa)', 'Non-reducing CE-SDS', '~25 kDa peak', '<2%', 'C220-C214 bond failure'],
        ['Scrambled disulfide', '0 Da (isomeric)', 'Non-reduced peptide mapping', 'Aberrant disulfide-linked peptides', 'Report only', 'PDI-mediated reshuffling'],
        ['Cysteinylation', '+119 Da', 'LC-MS (deconvoluted intact)', 'Intact mass or reduced LC-MS', '<5% (total)', 'Free Cys in media reacts with surface SH'],
        ['Glutathionylation', '+305 Da', 'LC-MS (deconvoluted intact)', 'Intact mass', '<2%', 'GSH/GSSG from cell lysate'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Free Thiol Species — Formation and CMC Impact',
      color: 'amber',
      content:
        'Free (unpaired) thiol groups on IgG arise from incomplete disulfide bond formation during biosynthesis in the ER or from post-translational reduction events. Typical IgG1 from CHO cells contains 0.1-0.5 mol free SH per mol IgG, with the most common sites being C220 (HC, the inter-chain bond partner) and C229 (hinge). Free thiols are measured by Ellman\'s assay: 5,5\'-dithiobis-(2-nitrobenzoic acid) (DTNB) reacts with -SH groups at pH 8.0 to release the yellow TNB2- chromophore (molar absorptivity 14,150 M-1 cm-1 at 412 nm). Alternatively, fluorescent maleimide labelling (e.g., Alexa Fluor 488 C5 maleimide) followed by SEC-fluorescence allows quantitation of free-thiol-containing species. The CMC significance of free thiols is threefold: (1) covalent aggregation — exposed SH groups undergo intermolecular disulfide exchange to form disulfide-linked dimers and higher-order aggregates detectable by non-reducing SDS-PAGE; (2) cysteinylation and glutathionylation — free thiols react with free cysteine (119 Da) or glutathione (305 Da) in cell culture media, creating charge heterogeneity detectable by intact mass MS; (3) thiol-catalysed fragmentation — free thiols in the hinge promote beta-elimination at elevated pH, converting disulfides to thioether bonds with simultaneous peptide backbone cleavage.',
    },
    {
      type: 'bullets',
      title: 'Disulfide Scrambling — Mechanisms and Analytical Detection',
      color: 'red',
      items: [
        'Disulfide scrambling occurs when the correct Cys-Cys pairing is disrupted and new non-native disulfide bonds form. In IgG1, the most common scrambling event is VH C22-C92 to VH C22-C220, where the intra-VH disulfide swaps to form an aberrant bond with the inter-chain cysteine — this creates a "clipped" VH domain with loss of CDR architecture.',
        'pH-induced scrambling: during low-pH viral inactivation (pH 3.3-3.7), partial unfolding of CH2 can expose C261 and C321 to solvent, enabling PDI-independent reshuffling with nearby free thiols. Scrambled CH2 species lose Fc\u03B3R binding.',
        'Thermal-induced scrambling: forced degradation at 40 degrees C / 75% RH can trigger scrambling events in surface-exposed disulfides, particularly the hinge inter-chain bonds. This manifests as increasing HMW (covalent aggregates) and decreasing main peak by non-reducing CE-SDS.',
        'Detection strategy: non-reduced peptide mapping with LC-MS/MS identifies scrambled disulfide linkages as unexpected disulfide-linked peptide pairs. The native disulfide map serves as the reference; any non-native linked pairs indicate scrambling. Software tools like BioPharma Finder (Thermo) or PEAKS (BSI) can perform automated disulfide assignment.',
        'Specification approach: disulfide scrambling is typically a characterisation-tier attribute (not release testing) unless the molecule shows high propensity. Forced degradation data demonstrating <2% scrambled species after 6 months at 25 degrees C / 60% RH is generally acceptable for regulatory filing.',
      ],
    },
    {
      type: 'card',
      title: 'IgG2 Disulfide Isoforms — A Special Case',
      color: 'purple',
      content:
        'IgG2 presents a unique disulfide challenge because its hinge contains four cysteines (C219, C220, C226, C229) that can form three distinct disulfide connectivity patterns. IgG2-A (classical): C219-C220\', C220-C219\' (cross-linked), C226-C226\', C229-C229\' — the two HC chains are connected in the standard anti-parallel arrangement with the HC-LC bonds at C131-C214. IgG2-B: the hinge cysteines form alternative bonds where C219 or C226 connects to the LC C214 instead of forming HC-HC bridges, creating a compact structure where the Fab arms are pulled closer to the hinge. IgG2-A/B (hybrid): one arm in A configuration, the other in B. These isoforms have different biological activities: IgG2-B shows approximately 2-fold higher Fc\u03B3RIIa binding than IgG2-A, which is significant for an isotype supposedly lacking effector function. CHO cell culture conditions that affect the A:B ratio include: copper concentration (4-8 ppb copper promotes isoform A), dissolved oxygen, redox potential of the media, and harvest timing. For IgG2 therapeutics (e.g., denosumab, panitumumab), the isoform distribution must be characterised and controlled, typically by reversed-phase HPLC or CE-SDS under non-reducing conditions.',
    },
    {
      type: 'callout',
      title: 'Non-Reducing CE-SDS — The Primary Disulfide Integrity Assay',
      variant: 'info',
      content:
        'Non-reducing CE-SDS (nr-CE-SDS) is the workhorse release test for monitoring disulfide bond integrity. The method denatures the protein with SDS in the absence of reducing agent (no DTT/BME), preserving covalent inter-chain disulfide bonds while disrupting non-covalent interactions. Intact IgG1 migrates as a single ~150 kDa peak. Broken inter-chain disulfides generate characteristic fragments: free LC (~25 kDa), HC-LC half-antibody (~75 kDa), HC (~50 kDa), and HHL three-chain species (~125 kDa). Alkylation with iodoacetamide (20 mM IAM, 30 min, room temperature, dark) immediately after SDS denaturation is critical to prevent disulfide reshuffling during sample preparation. Without alkylation, false-negative results occur as free thiols re-oxidise during the 10-minute CE separation at 70 degrees C. Typical release specifications: main peak (intact IgG) >90%, free LC <2%, half-antibody <5%, fragments (total) <5%, HMW (non-reducible aggregates) <2%. The reduced CE-SDS companion assay confirms HC and LC molecular weights and purity.',
    },
    {
      type: 'table',
      title: 'Disulfide Integrity — Analytical Method Toolbox',
      headers: ['Method', 'Attribute Measured', 'LOQ', 'Release/Characterisation', 'Sample Prep', 'Key Pitfall'],
      rows: [
        ['Non-reducing CE-SDS', 'Fragment/half-Ab profile', '~0.5%', 'Release', 'SDS + IAM alkylation, no reductant', 'Omitting alkylation causes re-oxidation'],
        ['Reducing CE-SDS', 'HC/LC MW and purity', '~0.5%', 'Release', 'SDS + DTT (full reduction)', 'Incomplete reduction gives false fragments'],
        ['Ellman\'s assay (DTNB)', 'Free thiol count', '~0.05 mol/mol', 'Release or in-process', 'Native conditions, pH 8.0, DTNB reagent', 'Buried thiols may be inaccessible'],
        ['Intact mass (LC-MS)', 'Trisulfide, cysteinylation', '~1%', 'Characterisation', 'Desalt, deglycosylation optional', 'Glycan heterogeneity masks small adducts'],
        ['Non-reduced peptide mapping', 'Disulfide linkage assignment', '~0.1%', 'Characterisation', 'Alkylation, digestion, no reduction', 'Complex data — requires specialised software'],
        ['Reduced + alkylated peptide mapping', 'Free thiol site ID', '~0.1%', 'Characterisation', 'Differential alkylation (IAM then DTT + NEM)', 'Alkylation kinetics must be optimised'],
        ['Fluorescent maleimide labelling', 'Free thiol species by SEC', '~0.1%', 'Characterisation', 'Alexa-maleimide, native SEC, dual UV/FL', 'Maleimide may modify non-thiol nucleophiles'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: 'Cell Culture Control of Disulfide Quality',
      variant: 'success',
      content:
        'The cell culture process is the primary control point for disulfide bond quality. Key levers include: (1) Dissolved oxygen (DO): maintaining DO at 30-50% air saturation promotes oxidative disulfide formation and prevents accumulation of free thiols. DO below 20% shifts the intracellular redox environment toward reduction, increasing free thiol species. (2) Copper supplementation: Cu2+ ions (2-8 ppb) catalyse disulfide bond formation by acting as electron acceptors. Copper also inhibits trisulfide formation by promoting correct S-S bonding kinetics. (3) Cysteine/cystine ratio in feeds: feeding cystine (oxidised form) instead of cysteine reduces intracellular free thiol burden. Typical feed formulations use 2:1 cystine:cysteine molar ratio. (4) Redox buffer additives: GSSG (oxidised glutathione, 0.5-2 mM) in the media promotes extracellular disulfide formation on secreted IgG. (5) Harvest timing: late-harvest cultures (viability <70%) release intracellular reducing agents (glutathione, thioredoxin) that can reduce inter-chain disulfides post-secretion. Harvesting at >80% viability minimises this risk.',
    },
  ],
  mentorQuestions: [
    'Your non-reducing CE-SDS release test shows 4.5% half-antibody species in a clinical manufacturing lot, exceeding the 4.0% specification. Outline the root cause investigation you would conduct, including which upstream process parameters you would examine and what confirmatory analytical methods you would deploy.',
    'A new IgG1 molecule consistently shows 0.4 mol free SH per mol IgG by Ellman\'s assay despite optimised cell culture conditions. You suspect the free thiol is at C220 (the HC-LC inter-chain bond site). Design an experiment using differential alkylation and peptide mapping to confirm the site, and propose process or formulation changes to mitigate covalent aggregation risk.',
    'During characterisation of a biosimilar IgG1, you detect 3% trisulfide bonds at the hinge C226-C226\' position by LC-MS peptide mapping — twice the level seen in the reference product. What cell culture and downstream process levers would you adjust to reduce trisulfide formation, and how would you demonstrate that the trisulfide difference does not affect clinical comparability?',
  ],
};

export default module11;
