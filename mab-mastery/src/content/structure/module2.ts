import type { ModuleContent } from '../../types/content';

export const module2: ModuleContent = {
  id: 'structure-m2',
  sectionId: 'structure',
  moduleNumber: 2,
  eyebrow: 'STRUCTURE 03',
  title: 'Chain Architecture & Biosynthesis',
  lead: 'From gene to secreted antibody \u2014 how heavy and light chains are synthesized, folded, assembled, and quality-controlled in CHO cells.',
  tags: [
    { label: 'CHO Cell', color: 'green' },
    { label: 'Secretory Pathway', color: 'teal' },
    { label: 'Quality Control', color: 'amber' },
  ],
  stats: [
    { label: 'Heavy Chain', value: '~50 kDa' },
    { label: 'Light Chain', value: '~25 kDa' },
    { label: 'Assembly Time', value: '~30-60 min' },
    { label: 'Secretion Rate', value: '~20 pg/cell/day' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Heavy Chain Domain Organisation',
      color: 'blue',
      content:
        'The heavy chain gene encodes a polypeptide of approximately 450 amino acids (IgG1, excluding signal peptide) organised into distinct structural and functional domains. From N- to C-terminus: Signal peptide (19-30 residues, cleaved co-translationally in the ER lumen) \u2192 VH (variable heavy, ~120 residues, encoded by V and D and J gene segments) \u2192 CH1 (constant heavy 1, ~98 residues) \u2192 Hinge (15 residues in IgG1; up to 62 in IgG3) \u2192 CH2 (~110 residues, contains the N297 glycosylation site) \u2192 CH3 (~107 residues). Each domain boundary is marked by a short connecting peptide of 3-8 residues. The hinge region is the most flexible segment, adopting extended conformations that allow Fab arm movement of up to \u00b160\u00b0 relative to the Fc axis (demonstrated by cryo-EM and SAXS). The light chain is shorter: Signal peptide \u2192 VL (~107 residues) \u2192 CL (~107 residues). Light chains are either kappa (\u03ba) or lambda (\u03bb) isotype \u2014 approximately 60% of human antibodies use \u03ba and 40% use \u03bb, though this ratio varies by species and can shift in certain disease states.',
    },
    {
      type: 'card',
      title: 'ER Translocation and Co-translational Modification',
      color: 'teal',
      content:
        'Antibody heavy and light chains are synthesised on ER-bound ribosomes. The N-terminal signal peptide is recognised by the signal recognition particle (SRP) as it emerges from the ribosomal exit tunnel, directing the ribosome-nascent chain complex to the ER translocon (Sec61 channel). Upon translocation into the ER lumen, the signal peptide is cleaved by signal peptidase, generating the mature N-terminus. N-linked glycosylation occurs co-translationally: the oligosaccharyltransferase (OST) complex, specifically its STT3A catalytic subunit, transfers the Glc\u2083Man\u2089GlcNAc\u2082 precursor oligosaccharide from dolichol-PP to the Asn297 side chain as the nascent polypeptide exits the translocon. The STT3B subunit provides post-translational glycosylation as a backup mechanism for any sites missed by STT3A. Glycosylation efficiency at Asn297 is typically 97-99% in CHO cells, but macroheterogeneity (the fraction of unoccupied sites, producing aglycosylated HC) is a CQA that must be controlled. Incomplete glycosylation can result from nutrient limitation (especially manganese or glucose depletion), ER stress, or high specific productivity driving secretory pathway saturation.',
    },
    {
      type: 'card',
      title: 'ER Chaperone System for Antibody Folding',
      color: 'purple',
      content:
        'The ER houses a specialised chaperone network that guides antibody folding and assembly. BiP (HSPA5/GRP78, an Hsp70 family member) is the master regulator of antibody assembly. BiP binds specifically to the CH1 domain of the heavy chain and retains it in the ER until a light chain pairs with it. The CH1 domain is unique among Ig constant domains in that it cannot fold autonomously \u2014 it requires CL domain pairing to complete its \u03b2-sandwich structure. This BiP-CH1 interaction serves as an elegant quality control checkpoint: only properly assembled H-L pairs are released for further processing. Calnexin and calreticulin, the lectin chaperones, engage the monoglucosylated N-glycan (Glc\u2081Man\u2089GlcNAc\u2082) on the heavy chain and facilitate folding cycles: glucosidase I and II sequentially trim glucose residues \u2192 if the protein is properly folded, it exits to the ER-Golgi intermediate compartment (ERGIC) \u2192 if not, UGGT re-glucosylates it for another calnexin cycle. Protein disulfide isomerase (PDI, PDIA1) and its family members (ERp57, ERp72) catalyse the formation and isomerisation of all 16 disulfide bonds in IgG1. ERp57 works in concert with calnexin/calreticulin, specifically targeting glycoprotein substrates.',
    },
    {
      type: 'table',
      title: 'Antibody Assembly Pathway in the Secretory System',
      headers: ['Step', 'Compartment', 'Event', 'Key Players'],
      rows: [
        ['1', 'ER translocon', 'Signal peptide cleavage, translocation into ER lumen', 'SRP, Sec61, Signal peptidase'],
        ['2', 'ER lumen', 'Co-translational N-glycosylation at Asn297', 'OST (STT3A subunit), Dolichol-PP-oligosaccharide'],
        ['3', 'ER lumen', 'BiP binds CH1 domain, prevents HC aggregation', 'BiP (GRP78), ATP-dependent binding cycle'],
        ['4', 'ER lumen', 'Intra-domain disulfide bond formation in each Ig domain', 'PDI, ERp57, Ero1\u03b1 (oxidant supply)'],
        ['5', 'ER lumen', 'Light chain folds (VL-CL), pairs with HC via VH-VL and CH1-CL interfaces', 'BiP release upon CL binding to CH1'],
        ['6', 'ER lumen', 'Inter-chain disulfide bond formation: HC-LC (C220-C214)', 'PDI family'],
        ['7', 'ER lumen', 'H-L + H-L \u2192 H\u2082L\u2082: dimerisation via hinge disulfides (C226, C229) and CH3-CH3 interface', 'PDI, non-covalent CH3 association drives assembly'],
        ['8', 'ER lumen', 'Calnexin/calreticulin QC cycle for glycoprotein folding validation', 'Calnexin, calreticulin, UGGT, glucosidases I/II'],
        ['9', 'ERGIC \u2192 Golgi', 'Glycan processing: Man trimming (Golgi \u03b1-mannosidase I/II), GlcNAc, Gal, Fuc, NeuAc addition', 'Golgi glycosyltransferases (see Glycosylation module)'],
        ['10', 'Trans-Golgi \u2192 Secretion', 'Packaging into secretory vesicles, transport to plasma membrane, exocytosis', 'COPII vesicles, SNARE-mediated fusion'],
      ],
    },
    {
      type: 'card',
      title: 'LC:HC Expression Ratio \u2014 Critical for Assembly',
      color: 'amber',
      content:
        'The ratio of light chain to heavy chain expression is one of the most important parameters in cell line development. Optimal assembly requires a slight molar excess of light chain over heavy chain, typically 1.2-1.5:1 (LC:HC). This excess drives the equilibrium toward complete H\u2082L\u2082 assembly by ensuring every HC molecule encounters an LC partner before it can aggregate or form aberrant species. When HC is in excess over LC, several undesirable species accumulate: (1) Half-antibody (H1L1, ~75 kDa) \u2014 a single H-L pair that has not dimerised, detected by non-reducing CE-SDS; (2) Free heavy chain (~50 kDa) \u2014 misfolded HC that escapes BiP quality control; (3) HC-HC dimers without light chains \u2014 aberrant species with exposed hydrophobic patches. In CHO cell line development, the LC:HC ratio is controlled at the genetic level through: codon optimisation (independently for HC and LC), promoter strength selection, gene copy number (via vector design and amplification), and mRNA stability elements. Some modern vector systems use a 2:1 LC:HC gene cassette ratio or IRES/2A-based polycistronic designs to bias expression toward LC excess.',
    },
    {
      type: 'callout',
      title: 'Half-Antibody \u2014 A Common CQA Issue',
      variant: 'info',
      content:
        'Half-antibody (H1L1) species arise when HC is in excess over LC, or when inter-HC disulfide bonds fail to form. These are detected by non-reducing CE-SDS as ~75 kDa species and are a common CQA for IgG4 products. IgG4 is particularly susceptible because: (1) The S228 residue in the hinge allows Fab-arm exchange with endogenous IgG4, a process that proceeds through a half-antibody intermediate; (2) The S228P mutation (found in pembrolizumab, nivolumab) stabilises the hinge disulfide and suppresses half-antibody formation. For IgG1 products, half-antibody typically represents <2% of the total by non-reducing CE-SDS, but levels can increase under reducing conditions in cell culture (e.g., high cell density, low dissolved oxygen). A specification of \u226595% intact IgG by non-reducing CE-SDS is common for IgG1 products.',
    },
    {
      type: 'card',
      title: 'ERAD \u2014 Disposal of Misfolded Antibodies',
      color: 'red',
      content:
        'Misfolded or unassembled antibody chains that fail to pass ER quality control are targeted for ER-associated degradation (ERAD). The ERAD pathway involves: (1) Recognition of terminally misfolded substrates by ER lectins (EDEM1, OS-9) that detect mannose-trimmed glycans (Man\u2085-\u2086GlcNAc\u2082), signalling prolonged ER residence; (2) Retro-translocation through the Sec61 or Hrd1 channels back to the cytoplasm; (3) Ubiquitination by the Hrd1 E3 ligase complex; (4) Extraction by the p97/VCP AAA-ATPase; (5) Proteasomal degradation. The UDP-glucose:glycoprotein glucosyltransferase (UGGT) acts as the key folding sensor: it specifically recognises nearly-folded but not-yet-native glycoproteins and re-glucosylates their N-glycans to give them another chance in the calnexin cycle. Only proteins that repeatedly fail to fold are directed to ERAD. In high-producing CHO clones (>5 g/L), the secretory pathway can become saturated, leading to ER stress and activation of the unfolded protein response (UPR). Sustained UPR (via PERK, IRE1\u03b1, ATF6 pathways) can reduce cell viability and productivity, creating a ceiling on specific productivity.',
    },
    {
      type: 'table',
      title: 'Antibody Species Detected by Non-Reducing CE-SDS',
      headers: ['Species', 'Approximate MW (kDa)', 'Identity', 'Typical Acceptance Criterion'],
      rows: [
        ['Intact IgG (H\u2082L\u2082)', '~150', 'Fully assembled, all disulfides formed', '\u226595%'],
        ['Half-antibody (H1L1)', '~75', 'One H-L pair, no inter-HC disulfides', '<5% (IgG1); variable for IgG4'],
        ['Free heavy chain (H)', '~50', 'Unpaired HC, may retain partial folding', '<2%'],
        ['Heavy-heavy dimer (H\u2082)', '~100', 'HC dimer without LC, aberrant', '<1%'],
        ['Free light chain (L)', '~25', 'Unpaired LC, fully folded', '<2%'],
        ['Fragments (<25 kDa)', 'Variable', 'Hinge clipping, domain fragments', '<2%'],
        ['HMW aggregates (>150 kDa)', '>150', 'Disulfide-linked or covalent aggregates', '<5%'],
      ],
    },
    {
      type: 'card',
      title: 'The CH3 Domain Drives Dimerisation',
      color: 'green',
      content:
        'The formation of the H\u2082L\u2082 tetramer is thermodynamically driven by two forces: (1) the CH3-CH3 homodimeric interface, which buries ~2000 \u00c5\u00b2 of surface area and contributes a Kd in the low nanomolar range (too tight to dissociate under physiological conditions); and (2) the inter-HC hinge disulfide bonds (C226, C229 in IgG1), which covalently lock the dimer. Assembly proceeds in an ordered pathway: first, HC-LC pair formation (driven by BiP release and VH-VL/CH1-CL complementarity), then H-L + H-L dimerisation (driven by CH3-CH3 association, followed by hinge disulfide formation). This order is evidenced by the accumulation of H1L1 half-antibody as a kinetic intermediate during biosynthesis. In engineering contexts that disrupt the CH3 homodimer (e.g., knobs-into-holes mutations T366W / T366S+L368A+Y407V), heterodimerisation efficiency replaces homodimerisation, and the CH3-CH3 interface must be carefully re-optimised to maintain stability. A reduction in CH3-CH3 interface affinity by more than 100-fold typically leads to unacceptable levels of half-antibody and aggregation in the final product.',
    },
    {
      type: 'bullets',
      title: 'CMC Implications \u2014 Cell Line and Process Development',
      items: [
        'Cell line screening must assess LC:HC ratio by intracellular staining, mRNA quantification (RT-qPCR), or metabolic labelling. Clones with HC excess typically produce higher half-antibody and lower titres.',
        'Clone stability assessment: Gene copy number loss over 60+ generations can shift LC:HC ratio. Stability studies under non-selective conditions (\u2212MTX for DHFR, \u2212MSX for GS) are required to demonstrate stable expression over the manufacturing campaign.',
        'Specific productivity (qP) is a function of secretory pathway capacity. Typical values for CHO clones: 10-50 pg/cell/day for early development, 20-80 pg/cell/day for platform processes, >100 pg/cell/day for highly optimised processes. Upper limit is set by ER folding capacity.',
        'Temperature shift (37\u00b0C \u2192 33-34\u00b0C) in production bioreactors reduces growth rate but can improve qP by 1.5-3\u00d7 and improve product quality (reduced aggregation, more complete glycosylation) by reducing ER stress.',
        'Dissolved oxygen (DO), pH, and osmolality directly impact the ER redox environment. Low DO can compromise disulfide bond formation; high osmolality activates stress pathways. These are controlled via bioreactor setpoints in the manufacturing process.',
        'Protein A chromatography capture step exploits the CH2-CH3 interface (H433, H435, Y436). Correct folding of CH3 is prerequisite for platform purification — misfolded CH3 variants will not bind Protein A and are lost in flow-through.',
      ],
    },
    {
      type: 'callout',
      title: 'Secretory Pathway Bottlenecks',
      variant: 'warning',
      content:
        'In high-expressing CHO clones, the rate-limiting steps in antibody secretion are typically: (1) ER folding and assembly (BiP-mediated quality control), (2) ER-to-Golgi transport (COPII vesicle budding), and (3) Golgi glycan processing capacity. Overloading any of these steps triggers the UPR, which initially upregulates chaperones (adaptive response) but eventually induces apoptosis (terminal UPR via CHOP/GADD153). Process strategies to manage secretory stress include temperature shift, controlled feeding to avoid nutrient excess, and in some cases, co-expression of ER chaperones (BiP, PDI) or UPR regulators (XBP1s). The observation that titre does not scale linearly with gene copy number above a certain threshold is a direct consequence of secretory pathway saturation.',
    },
    {
      type: 'table',
      title: 'Key ER Chaperones in Antibody Biosynthesis',
      headers: ['Chaperone', 'Alternate Names', 'Function', 'Substrate Specificity'],
      rows: [
        ['BiP', 'HSPA5, GRP78', 'Binds CH1 domain, prevents HC aggregation, retains unassembled HC in ER', 'Hydrophobic peptide segments; strong affinity for CH1'],
        ['Calnexin', 'CANX', 'Membrane-bound lectin chaperone; binds monoglucosylated glycans', 'N-glycosylated proteins with Glc\u2081Man\u2089GlcNAc\u2082'],
        ['Calreticulin', 'CALR', 'Soluble lectin chaperone; same function as calnexin in ER lumen', 'N-glycosylated proteins with Glc\u2081Man\u2089GlcNAc\u2082'],
        ['PDI', 'PDIA1, P4HB', 'Disulfide bond formation and isomerisation', 'Broad substrate range; all Cys-containing proteins'],
        ['ERp57', 'PDIA3', 'Disulfide bond formation in calnexin/calreticulin-bound substrates', 'Glycoprotein-specific via CNX/CRT complex'],
        ['UGGT', 'UGGT1', 'Folding sensor; re-glucosylates near-native glycoproteins for another CNX cycle', 'Nearly-folded but non-native glycoproteins'],
        ['Ero1\u03b1', 'ERO1L', 'Oxidises PDI to regenerate its catalytic activity', 'PDI (indirect substrate for all ER clients)'],
      ],
    },
  ],
  mentorQuestions: [
    'Why is BiP binding to CH1 essential for correct antibody assembly?',
    'How would you troubleshoot a clone that produces 15% half-antibody?',
    'What upstream process parameters can influence the folding and assembly pathway?',
  ],
};
