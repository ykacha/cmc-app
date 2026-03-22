import type { ModuleContent } from '../../types/content';

export const module8: ModuleContent = {
  id: 'structure-m8',
  sectionId: 'structure',
  moduleNumber: 8,
  eyebrow: 'STRUCTURE 09',
  title: 'Hinge Region',
  lead: 'The flexible linker connecting Fab to Fc — subclass-specific sequences, IgG4 Fab-arm exchange, hinge clipping, and the impact of low-pH viral inactivation.',
  tags: [
    { label: 'IgG Subclass', color: 'blue' },
    { label: 'S228P', color: 'amber' },
    { label: 'Hinge Clipping', color: 'red' },
  ],
  stats: [
    { label: 'IgG1 Hinge', value: '15 residues' },
    { label: 'IgG3 Hinge', value: '62 residues' },
    { label: 'Key Mutation', value: 'S228P (IgG4)' },
    { label: 'Clip Site', value: 'Asp-Pro' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Hinge Region Architecture and Functional Role',
      color: 'blue',
      content:
        'The hinge region is the unstructured polypeptide segment connecting the CH1 domain (Fab) to the CH2 domain (Fc), spanning EU positions 216-237 in IgG1. It serves three critical functions: (1) providing segmental flexibility that allows independent Fab arm movement for bivalent antigen binding on cell surfaces — cryo-EM studies show Fab-Fc angles ranging from 60 to 180 degrees in IgG1; (2) positioning the two inter-heavy-chain disulfide bonds (C226-C226\' and C229-C229\' in IgG1) that covalently link the two heavy chains; and (3) forming the lower hinge segment (L234-G236) that directly contacts Fc gamma receptors — making the hinge a structural bridge between antigen recognition and effector function. The hinge is the most proteolytically sensitive region of the antibody due to its extended, solvent-exposed conformation and lack of secondary structure. Pepsin cleaves below the inter-chain disulfides (residue 237) to generate F(ab\')2, while papain cleaves above them (residue 224) to generate separate Fab and Fc fragments.',
    },
    {
      type: 'code',
      title: 'Complete Hinge Sequences — All Four IgG Subclasses (EU Numbering)',
      language: 'text',
      code:
        'IgG1 Hinge (15 residues, 216-237):\n' +
        '  Upper:  E216-P-K-S-C-D-K-T-H-T225     (10 aa)\n' +
        '  Core:   C226-P-P-C229-P                 (5 aa, 2 disulfides)\n' +
        '  Lower:  A230-P-E-L-L234-G-G-P-S-V-F-L242  (extends into CH2)\n' +
        '  Inter-chain S-S: C226-C226\' and C229-C229\'\n' +
        '\n' +
        'IgG2 Hinge (12 residues, rigid):\n' +
        '  E-R-K-C-C-V-E-C-P-P-C-P\n' +
        '  Inter-chain S-S: 4 disulfide bonds (C219, C220, C226, C229)\n' +
        '  Note: Extra disulfides create rigid, compact hinge\n' +
        '\n' +
        'IgG3 Hinge (62 residues, extended):\n' +
        '  E-L-K-T-P-L-G-D-T-T-H-T-C-P-R-C-P  (core unit)\n' +
        '  Above 17-residue motif repeated 4x with 11 disulfide bonds\n' +
        '  Provides extreme segmental flexibility\n' +
        '  Inter-chain S-S: 11 disulfide bonds total\n' +
        '\n' +
        'IgG4 Hinge (12 residues):\n' +
        '  E-S-K-Y-G-P-P-C-P-S228-C-P\n' +
        '  Wild-type: C-P-S-C (forms intra-chain S-S → half-antibody)\n' +
        '  S228P:     C-P-P-C (forces inter-chain S-S → intact IgG)\n' +
        '  Inter-chain S-S: C226-C226\' and C229-C229\' (when S228P present)',
    },
    {
      type: 'table',
      title: 'IgG Subclass Hinge Properties Comparison',
      headers: ['Property', 'IgG1', 'IgG2', 'IgG3', 'IgG4'],
      rows: [
        ['Hinge length (aa)', '15', '12', '62', '12'],
        ['Inter-chain S-S bonds', '2', '4', '11', '2'],
        ['Flexibility', 'Moderate', 'Rigid', 'Very high', 'Moderate'],
        ['Segmental flexibility angle', '60-180\u00B0', '~120\u00B0 (fixed)', '60-180\u00B0+', '60-180\u00B0'],
        ['Papain sensitivity', 'High', 'Resistant', 'Very high', 'High'],
        ['Pepsin sensitivity', 'High', 'Moderate', 'Very high', 'Moderate'],
        ['Hinge clipping risk', 'Moderate', 'Low', 'High', 'Moderate'],
        ['Fab-arm exchange', 'No', 'No', 'No', 'Yes (WT)'],
        ['Half-antibody risk', 'Low', 'Low (isoform B)', 'Low', 'High (WT)'],
        ['Preferred for mAb Rx', 'Yes (most common)', 'Niche (no effector)', 'Rare', 'Yes (non-effector)'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'IgG4 Fab-Arm Exchange (FAE) and the S228P Solution',
      color: 'amber',
      content:
        'Wild-type IgG4 contains the sequence C226-P-S228-C229 in the core hinge. The serine at position 228 destabilises the inter-chain disulfide bonds by introducing backbone flexibility that favours intra-chain C226-C229 disulfide formation within each heavy chain rather than inter-chain bonding. This produces "half-antibodies" — monovalent HC-LC pairs that can reassociate randomly with half-antibodies from different IgG4 molecules, a process called Fab-arm exchange (FAE). In vivo, FAE occurs with a half-life of ~12 hours in human serum, driven by the reducing environment of the blood (glutathione ~5 micromolar). The result is functionally monovalent bispecific antibodies with unpredictable specificity. The S228P mutation (CPSC to CPPC) was introduced by Angal et al. (1993, Mol Immunol 30:105) and restores the stable inter-chain disulfide by mimicking the IgG1 core hinge CPPC motif. S228P is now standard in all therapeutic IgG4 antibodies: pembrolizumab, nivolumab, dupilumab, and natalizumab all carry this mutation. CMC testing must confirm absence of half-antibody by non-reducing CE-SDS (<5% specification typically) and absence of FAE by mixing studies with a control IgG4.',
    },
    {
      type: 'bullets',
      title: 'Hinge Clipping: Mechanism and Process Impact',
      color: 'red',
      items: [
        'Primary clip site: The Asp-Pro (D-P) peptide bond in the upper hinge (D221-K222 region in IgG1) is uniquely susceptible to acid-catalysed hydrolysis. The mechanism involves protonation of the Asp side chain at low pH, which attacks the backbone carbonyl of the preceding peptide bond through a cyclic succinimide intermediate.',
        'Low-pH viral inactivation (pH 3.3-3.7 for 60-120 minutes post-Protein A) is the primary manufacturing step that drives hinge clipping. Temperature and hold time are the critical process parameters — a 2-hour hold at pH 3.5 and 20 degrees C can generate 2-8% single-clipped species in susceptible molecules.',
        'Single-clipped species: One hinge cleavage produces a ~100 kDa Fab-Fc fragment + ~50 kDa Fab fragment, held together by the remaining disulfide and non-covalent interactions. Under non-reducing CE-SDS, these resolve as distinct peaks at ~100 kDa and ~50 kDa.',
        'Double-clipped species: Both hinge regions cleaved, producing 2x ~50 kDa Fab + ~50 kDa Fc(glycosylated). This species lacks bivalent binding and may have altered pharmacokinetics.',
        'Metalloprotease-mediated clipping: Residual host cell metalloproteases (e.g., matrix metalloproteinases from CHO) can cleave at the upper hinge during cell culture. EDTA addition to harvest or immediate capture on Protein A mitigates this route.',
        'Detection hierarchy: Non-reducing CE-SDS (primary, LOQ ~0.5%) > reduced CE-SDS (confirms fragment MW) > SEC-MALS (resolves by size) > LC-MS peptide mapping (identifies exact clip site).',
      ],
    },
    {
      type: 'table',
      title: 'Hinge Clipping Process Optimisation Parameters',
      headers: ['Parameter', 'Higher Clipping Risk', 'Lower Clipping Risk', 'Typical Target', 'Monitoring Method'],
      rows: [
        ['Viral inactivation pH', 'pH 3.3', 'pH 3.7', 'pH 3.5 \u00B1 0.1', 'In-line pH probe'],
        ['Hold temperature', '25\u00B0C', '15\u00B0C', '18 \u00B1 2\u00B0C', 'Temperature logger'],
        ['Hold time', '120 min', '30 min', '60 \u00B1 5 min', 'Timer with alarm'],
        ['Product concentration', '>20 mg/mL', '<10 mg/mL', '5-15 mg/mL', 'A280 measurement'],
        ['Neutralisation speed', 'Slow (>5 min)', 'Fast (<1 min)', '<2 min to pH 6.0', 'In-line pH + conductivity'],
        ['Residual Protein A', '>10 ng/mg', '<1 ng/mg', '<5 ng/mL (ELISA)', 'Protein A ELISA'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'IgG3 Extended Hinge: Structural and CMC Implications',
      color: 'teal',
      content:
        'IgG3 possesses the longest hinge of any IgG subclass at 62 amino acids, formed by four tandem repeats of a 15-residue motif (ELKTPLGDTTHTCPRCPE, with slight variations between repeats). This extended hinge contains 11 inter-chain disulfide bonds and creates exceptional segmental flexibility, allowing the Fab arms to sweep through a radius ~2-fold larger than IgG1. While this flexibility enhances bivalent binding to widely spaced epitopes on viral surfaces (IgG3 is the dominant anti-viral subclass), it introduces severe CMC liabilities: (1) extreme protease sensitivity — the extended hinge is rapidly cleaved by papain, pepsin, and endogenous proteases, making IgG3 unsuitable for standard purification trains; (2) short serum half-life (~7 days vs ~21 days for IgG1) due to an R435 polymorphism in CH3 that impairs Protein A and FcRn binding; (3) high aggregation propensity driven by hinge-mediated intermolecular disulfide scrambling. No therapeutic mAb has been developed on an IgG3 backbone, though IgG3 hinge elements have been grafted onto IgG1 backbones for research constructs requiring enhanced flexibility.',
    },
    {
      type: 'card',
      title: 'Lower Hinge — The Effector Function Switch',
      color: 'purple',
      content:
        'The lower hinge (residues L234-G237 in IgG1, EU numbering) is arguably the most functionally critical region of the antibody despite its small size. The sequence L234-L235-G236-G237 directly contacts Fc\u03B3 receptors: L234 and L235 insert into a hydrophobic groove on Fc\u03B3RIIIa formed by Trp87, Trp110, and Leu158, while G236 makes backbone contacts that orient the Fc for receptor engagement. The LALA mutation (L234A/L235A) removes these hydrophobic contacts, reducing ADCC and ADCP by >99%. The lower hinge also distinguishes IgG subclass effector profiles: IgG1 (L-L-G-G) has strong Fc\u03B3R binding, IgG2 (A-G-G-G) has minimal binding, IgG3 (L-L-G-G, same as IgG1) has strong binding, and IgG4 (F-L-G-G) has weak Fc\u03B3RI binding but minimal Fc\u03B3RIII binding. The Phe at position 234 in IgG4 creates a bulkier contact that selectively reduces Fc\u03B3RIII affinity while maintaining some Fc\u03B3RI interaction.',
    },
    {
      type: 'table',
      title: 'Lower Hinge Sequences and Effector Function Profiles',
      headers: ['IgG Subclass', 'Lower Hinge (234-237)', 'Fc\u03B3RI', 'Fc\u03B3RIIa', 'Fc\u03B3RIIIa', 'C1q/CDC', 'Therapeutic Use'],
      rows: [
        ['IgG1', 'L-L-G-G', '+++', '++', '+++', '+++', 'Depleting (rituximab, trastuzumab)'],
        ['IgG2', 'A-G-G-G', '+/-', '+', '-', '-', 'Blocking (denosumab, panitumumab)'],
        ['IgG3', 'L-L-G-G', '+++', '++', '+++', '++++', 'Not used therapeutically'],
        ['IgG4', 'F-L-G-G', '++', '+', '-', '-', 'Blocking (pembrolizumab, dupilumab)'],
        ['IgG1-LALA', 'A-A-G-G', '-', '-', '-', '+/-', 'Non-depleting (atezolizumab)'],
        ['IgG1-LALAPG', 'A-A-G-G (+ P329G)', '-', '-', '-', '-', 'Fully silent Fc (research)'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: 'Manufacturing Risk: Hinge Clipping During Viral Inactivation',
      variant: 'danger',
      content:
        'Hinge clipping is one of the top five product quality risks in mAb manufacturing. During low-pH viral inactivation, the Asp-Pro bond susceptibility creates a time-temperature-pH design space with competing objectives: sufficient viral inactivation (minimum 30 minutes at pH 3.6 per ICH Q5A) versus minimal product degradation. Best practices include: (1) titrate to pH 3.6 (not 3.3) when viral validation data supports it; (2) hold at 15-18 degrees C rather than room temperature; (3) neutralise rapidly (<2 min) to pH 5.5-6.0 using 1M Tris base; (4) monitor clipping by non-reducing CE-SDS at each process development run; (5) establish molecule-specific time-temperature-pH windows during early development. Some molecules (particularly those with exposed Asp-Pro motifs in CDR loops) may require alternative viral inactivation strategies such as solvent-detergent treatment (TNBP/Triton X-100).',
    },
    {
      type: 'card',
      title: 'Engineered Hinges in Novel Antibody Formats',
      color: 'green',
      content:
        'Beyond natural IgG hinges, engineered hinge regions are critical components of novel antibody formats. Fc-fusion proteins (e.g., etanercept, abatacept) use modified IgG1 hinges with the upper hinge deleted to remove the papain-sensitive site, directly connecting the fusion partner to the core hinge C226-C229 disulfides. Bispecific formats such as the IgG-scFv require linker peptides that functionally replace the hinge, with (G4S)n repeats (n = 3-5) being the most common — these provide flexibility similar to the natural hinge without protease-sensitive motifs. The IgG1 hinge has also been engineered for half-life extension in Fc-containing fusion proteins: replacing the upper hinge with a (G4S)3 linker eliminates hinge clipping risk while maintaining FcRn-mediated recycling. For CMC, any hinge modification requires re-evaluation of: inter-chain disulfide bonding efficiency, effector function (lower hinge contacts), proteolytic stability profiling under process conditions, and aggregation propensity.',
    },
  ],
  mentorQuestions: [
    'You observe 6% hinge-clipped species after viral inactivation at pH 3.5 for 60 minutes at 22 degrees C. Design a process optimisation study to reduce clipping below 2% while maintaining validated viral clearance. What parameters would you vary, and what is your viral validation strategy?',
    'A colleague proposes using an IgG4 backbone without the S228P mutation for a blocking antibody, arguing that Fab-arm exchange provides a built-in safety mechanism against target cross-linking. Critique this argument from both a pharmacological and CMC perspective.',
    'Your IgG3-based research antibody shows potent ADCC but degrades rapidly during purification. Design a modified backbone that preserves IgG3-level effector function on an IgG1 scaffold, specifying which hinge, CH2, and CH3 elements you would swap and the analytical package to characterise the chimeric construct.',
  ],
};

export default module8;
