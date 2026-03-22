import type { ModuleContent } from '../../types/content';

export const module1: ModuleContent = {
  id: 'glycosylation-m1',
  sectionId: 'glycosylation',
  moduleNumber: 1,
  eyebrow: 'GLYCOSYLATION 02',
  title: 'Glycan Nomenclature',
  lead: 'The Oxford notation system for naming antibody glycoforms \u2014 decoding G0F, G1F, G2FS1, Man5, and every monosaccharide building block.',
  tags: [
    { label: 'Oxford Notation', color: 'blue' },
    { label: 'Monosaccharides', color: 'teal' },
    { label: 'Structural Codes', color: 'amber' },
  ],
  stats: [
    { label: 'System', value: 'Oxford/Harvey' },
    { label: 'Letters', value: 'G/F/S/B/M' },
    { label: 'Building Blocks', value: '6 monosaccharides' },
    { label: 'Common Species', value: 'G0F dominant' },
  ],
  sections: [
    {
      type: 'card',
      title: 'The Oxford Notation System',
      color: 'blue',
      content:
        'The Oxford (also called Harvey) notation system is the industry-standard shorthand for naming IgG Fc glycoforms. Developed by Raymond Dwek\u2019s group at the Oxford Glycobiology Institute, this system encodes the key structural features of an N-glycan into a compact alphanumeric string. The notation describes complex-type biantennary glycans (the predominant class on IgG Fc) using letter codes for each terminal modification applied to the core structure. The core structure common to all complex-type IgG glycans consists of two N-acetylglucosamine (GlcNAc) residues and three mannose residues arranged in the trimannosyl core: GlcNAc\u03b21,4-GlcNAc\u03b21,4-Man with \u03b11,3-Man and \u03b11,6-Man branches, plus one antennary GlcNAc on each branch (\u03b21,2-linked to each arm\u2019s terminal mannose). This is the "G0" structure \u2014 the fully processed complex-type biantennary glycan before galactose addition.',
    },
    {
      type: 'card',
      title: 'G \u2014 Galactose Count',
      color: 'teal',
      content:
        'The letter "G" followed by a number indicates how many terminal galactose residues are present on the two antennary GlcNAc arms. G0 = zero galactose (agalactosylated) \u2014 both antenna terminate in GlcNAc. G1 = one galactose residue on either the \u03b11,3-arm (designated G1 or G1\u2019) or the \u03b11,6-arm (G1 or G1). In HILIC-FLR chromatography, G1 species on different arms can sometimes be partially resolved as two peaks (G1 and G1\u2019), reflecting the structural isomerism. G2 = two galactose residues, one on each antenna \u2014 the fully galactosylated biantennary glycan. The galactose linkage is \u03b21,4 to the antennary GlcNAc, catalysed by \u03b21,4-galactosyltransferase 1 (B4GALT1 gene). In CHO cell culture, galactosylation is highly process-sensitive: it is promoted by lower temperature (e.g., 32\u201333\u00b0C during production phase), Mn\u00b2\u207a supplementation (cofactor for B4GalT1), and UDP-galactose feed supplementation.',
    },
    {
      type: 'card',
      title: 'F \u2014 Core Fucose',
      color: 'amber',
      content:
        'The letter "F" indicates the presence of a core \u03b11,6-linked fucose residue on the innermost (reducing-end) GlcNAc of the chitobiose core. Core fucosylation is catalysed by \u03b11,6-fucosyltransferase 8 (FUT8 gene) in the medial-to-trans Golgi, using GDP-fucose as the sugar nucleotide donor. In wild-type CHO cells, >90% of IgG glycoforms carry core fucose, making fucosylated species (G0F, G1F, G2F) the dominant population. The notation "G0F" therefore means: biantennary complex-type glycan with zero galactose and core fucose present. "G0" (without F) means the same structure but lacking core fucose. The presence or absence of this single sugar has the largest functional impact of any glycan modification on ADCC activity: afucosylated species bind Fc\u03b3RIIIa with up to 50-fold higher affinity.',
    },
    {
      type: 'card',
      title: 'S \u2014 Sialic Acid Count',
      color: 'purple',
      content:
        'The letter "S" followed by a number indicates the count of terminal sialic acid (N-acetylneuraminic acid, Neu5Ac/NANA) residues capping terminal galactose. S1 = one sialic acid on one antenna; S2 = two sialic acid residues, one on each antenna (requires G2 as prerequisite, since sialic acid is added to galactose). The resulting nomenclature builds cumulatively: G2FS1 = biantennary, two galactose, core fucose, one sialic acid; G2FS2 = fully sialylated, both antennae capped. Sialic acid linkage on IgG Fc is predominantly \u03b12,6 in human serum IgG (catalysed by ST6GAL1), but CHO cells primarily produce \u03b12,3 linkages (via ST3GAL4/ST3GAL6 genes) because CHO cells have minimal endogenous ST6GAL1 expression. This linkage difference has functional implications: the anti-inflammatory effect mediated via DC-SIGN (CD209) is primarily associated with \u03b12,6-linked sialic acid (Anthony et al., Science 2008). Sialylation on IgG Fc from CHO is typically low (\u22645\u201315% total S1, <2% S2).',
    },
    {
      type: 'card',
      title: 'B \u2014 Bisecting GlcNAc',
      color: 'green',
      content:
        'The letter "B" indicates the presence of a bisecting \u03b21,4-linked GlcNAc residue attached to the \u03b2-mannose of the trimannosyl core. This modification is catalysed by \u03b21,4-N-acetylglucosaminyltransferase III (GnTIII, MGAT3 gene). The bisecting GlcNAc is added to the core mannose rather than to an antenna, creating a third branch that does not extend further (it is not elongated by galactosyltransferases). Wild-type CHO cells express very low levels of endogenous MGAT3, so bisecting species are rare (<1\u20132%) in standard CHO-derived mAbs. However, bisecting GlcNAc is functionally significant because its presence sterically hinders FUT8 from adding core fucose \u2014 effectively producing afucosylated glycoforms indirectly. This is the basis of Roche/Glycart\u2019s GlycoMAb technology: overexpression of MGAT3 in CHO cells drives bisecting GlcNAc addition, which competitively inhibits core fucosylation, yielding mAbs with enhanced ADCC (Um\u00e3na et al., Nat. Biotechnol. 17:176, 1999). Obinutuzumab (Gazyva) is manufactured using this platform.',
    },
    {
      type: 'card',
      title: 'M \u2014 High-Mannose Species',
      color: 'red',
      content:
        'The prefix "Man" followed by a number (Man5, Man6, Man7, Man8, Man9) designates high-mannose glycoforms \u2014 N-glycans that have not been processed through the Golgi enzyme cascade. These structures retain the mannose residues from the ER precursor (Glc\u2083Man\u2089GlcNAc\u2082) that are normally trimmed by ER and Golgi \u03b1-mannosidases before complex-type processing begins. Man5 (five mannose residues on a GlcNAc\u2082 core) is the most common high-mannose species on CHO-derived IgG, representing the product of complete ER mannosidase I trimming (Man9 \u2192 Man8 \u2192 Man7 \u2192 Man6 \u2192 Man5) but incomplete Golgi processing (i.e., GnTI/MGAT1 did not act). Man5 typically comprises 2\u20138% of total glycans in a standard CHO process. Higher mannose species (Man6\u2013Man9) are less common unless the Golgi is stressed (e.g., glucose limitation, high cell density late culture). High-mannose species are clinically significant because they are cleared faster via the mannose receptor (CD206) pathway and because they lack core fucose, creating a paradoxical situation: Man5 slightly enhances ADCC but reduces serum exposure.',
    },
    {
      type: 'table',
      title: 'Monosaccharide Building Blocks',
      headers: ['Monosaccharide', 'Abbreviation', 'Glycan Position', 'Linkage(s)', 'Biosynthetic Donor', 'Key Enzyme(s)'],
      rows: [
        ['N-Acetylglucosamine', 'GlcNAc', 'Core chitobiose + antennary arms', '\u03b21,4 (core); \u03b21,2 (antennary); \u03b21,4 (bisecting)', 'UDP-GlcNAc', 'OST (core); MGAT1/MGAT2 (antennary); MGAT3 (bisecting)'],
        ['Mannose', 'Man', 'Trimannosyl core + high-mannose branches', '\u03b11,3 and \u03b11,6 (core branches); \u03b11,2 (high-mannose extensions)', 'GDP-Man (dolichol pathway)', 'ALG genes (ER); MAN1A1/MAN2A1 (trimming)'],
        ['Fucose', 'Fuc', 'Core (\u03b11,6 to reducing GlcNAc)', '\u03b11,6', 'GDP-Fucose', 'FUT8'],
        ['Galactose', 'Gal', 'Terminal on antennary GlcNAc', '\u03b21,4', 'UDP-Gal', 'B4GALT1'],
        ['N-Acetylneuraminic acid', 'Neu5Ac (NANA)', 'Terminal on galactose', '\u03b12,3 (CHO); \u03b12,6 (human)', 'CMP-Neu5Ac', 'ST3GAL4/6 (CHO); ST6GAL1 (human)'],
        ['N-Glycolylneuraminic acid', 'Neu5Gc (NGNA)', 'Terminal on galactose (non-human)', '\u03b12,3 or \u03b12,6', 'CMP-Neu5Gc', 'CMAH (absent in humans/CHO)'],
      ],
      sortable: true,
    },
    {
      type: 'code',
      title: 'Annotated Glycan Structure \u2014 G2FS1',
      language: 'text',
      code: [
        'G2FS1 = Biantennary, 2 galactose, core fucose, 1 sialic acid',
        '',
        '                    Neu5Ac                          ',
        '                      \u03b12,3 (or \u03b12,6)                   ',
        '                     \u2502                              ',
        '                    Gal                    Gal      ',
        '                     \u03b21,4                   \u03b21,4    ',
        '                     \u2502                      \u2502      ',
        '                   GlcNAc                 GlcNAc   ',
        '                     \u03b21,2                   \u03b21,2    ',
        '                     \u2502                      \u2502      ',
        '           \u03b11,3-Man\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u03b2-Man\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u03b11,6-Man  ',
        '                              \u2502                      ',
        '                            GlcNAc                  ',
        '                              \u03b21,4                   ',
        '                              \u2502                      ',
        '                            GlcNAc  \u2190 Reducing end   ',
        '                              \u2502                      ',
        '                         Fuc\u2500\u2500\u03b11,6                  ',
        '',
        'Reading the name:',
        '  G2  = 2 terminal galactose residues (one per arm)',
        '  F   = core \u03b11,6-fucose on reducing-end GlcNAc',
        '  S1  = 1 sialic acid (Neu5Ac) on one galactose',
        '',
        'Molecular formula: GlcNAc\u2084Man\u2083Fuc\u2081Gal\u2082Neu5Ac\u2081',
        'Approximate mass addition: ~2,400 Da per chain',
      ].join('\n'),
    },
    {
      type: 'table',
      title: 'Common IgG Fc Glycoform Nomenclature',
      headers: ['Name', 'Full Composition', 'Core Fucose', 'Galactose', 'Sialic Acid', 'Bisecting', 'Typical % (CHO)'],
      rows: [
        ['G0F', 'GlcNAc\u2084Man\u2083Fuc\u2081', 'Yes', '0', '0', 'No', '30\u201350%'],
        ['G0', 'GlcNAc\u2084Man\u2083', 'No', '0', '0', 'No', '1\u20133%'],
        ['G1F', 'GlcNAc\u2084Man\u2083Fuc\u2081Gal\u2081', 'Yes', '1', '0', 'No', '20\u201335%'],
        ['G1F\u2019', 'GlcNAc\u2084Man\u2083Fuc\u2081Gal\u2081 (isomer)', 'Yes', '1 (\u03b11,6 arm)', '0', 'No', 'Included in G1F'],
        ['G2F', 'GlcNAc\u2084Man\u2083Fuc\u2081Gal\u2082', 'Yes', '2', '0', 'No', '5\u201315%'],
        ['G2FS1', 'GlcNAc\u2084Man\u2083Fuc\u2081Gal\u2082Neu5Ac\u2081', 'Yes', '2', '1', 'No', '2\u20138%'],
        ['G2FS2', 'GlcNAc\u2084Man\u2083Fuc\u2081Gal\u2082Neu5Ac\u2082', 'Yes', '2', '2', 'No', '<1\u20132%'],
        ['Man5', 'GlcNAc\u2082Man\u2085', 'No', '0', '0', 'No', '2\u20138%'],
        ['Man6', 'GlcNAc\u2082Man\u2086', 'No', '0', '0', 'No', '<1\u20132%'],
        ['Man7', 'GlcNAc\u2082Man\u2087', 'No', '0', '0', 'No', '<1%'],
        ['G0FB', 'GlcNAc\u2085Man\u2083Fuc\u2081', 'Yes', '0', '0', 'Yes', '<1\u20132% (WT CHO)'],
        ['G0F-GlcNAc', 'GlcNAc\u2083Man\u2083Fuc\u2081', 'Yes', '0', '0', 'No', '1\u20134%'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: 'G0F-GlcNAc \u2014 The Truncated Species',
      variant: 'warning',
      content:
        'G0F-GlcNAc (also called G0F minus one GlcNAc, or "truncated G0F") is a commonly observed minor species where one of the two antennary GlcNAc residues is missing. This results from incomplete GnTII (MGAT2) processing or from in-process enzymatic degradation by hexosaminidases released from lysed cells during late-stage cell culture. This species has one arm terminating in mannose rather than GlcNAc, giving it hybrid-type character. G0F-GlcNAc is analytically important because it can co-migrate with other species in HILIC-FLR and must be resolved by mass confirmation. Functionally, the loss of one antenna reduces Fc\u03b3R engagement on the affected side of the Fc.',
    },
    {
      type: 'bullets',
      title: 'Analytical Methods for Glycan Identification',
      color: 'blue',
      items: [
        'HILIC-FLR (2-AB or RFMS/RapiFluor-MS labelling): Released N-glycan profiling with fluorescence quantification. The gold standard for relative glycan abundance. Each peak is assigned by retention time relative to a dextran ladder (glucose units, GU values) and confirmed by ESI-MS.',
        'LC-MS/MS glycopeptide mapping: Site-specific glycosylation analysis. Tryptic digestion produces the Asn297-containing glycopeptide (EEQYNSTYR for IgG1), whose intact mass reveals the glycan composition, and MS/MS fragmentation confirms the glycan identity via diagnostic oxonium ions (m/z 204.09 for GlcNAc, 366.14 for HexHexNAc).',
        'Intact/subunit mass spectrometry: IdeS digestion (below hinge) + reduction yields ~25 kDa Fc/2 subunits, each carrying one glycan. High-resolution MS (Orbitrap or QTOF) resolves glycoform pairs at the intact Fc level or individual glycoforms at the Fc/2 subunit level.',
        'CE-LIF (capillary electrophoresis with laser-induced fluorescence): Alternative to HILIC for released glycan profiling, used by some biosimilar companies. APTS labelling provides charge-based separation.',
        'Exoglycosidase sequencing: Sequential treatment with specific exoglycosidases (\u03b1-sialidase, \u03b2-galactosidase, \u03b1-fucosidase, \u03b2-N-acetylhexosaminidase) followed by HILIC-FLR analysis after each digestion step confirms glycan structures by observing peak shifts.',
        'MALDI-TOF: Rapid glycan mass fingerprinting of released, permethylated glycans. Less quantitative than HILIC-FLR but useful for rapid screening and linkage analysis.',
      ],
    },
    {
      type: 'card',
      title: 'Alternative Nomenclature Systems',
      color: 'amber',
      content:
        'While the Oxford notation is dominant in the biopharmaceutical industry, other nomenclature systems exist and are encountered in academic literature and regulatory submissions. The IUPAC-IUBMB system uses full monosaccharide names with linkage designations (e.g., Neu5Ac\u03b12,6Gal\u03b21,4GlcNAc\u03b21,2Man\u03b11,3[Neu5Ac\u03b12,6Gal\u03b21,4GlcNAc\u03b21,2Man\u03b11,6]Man\u03b21,4GlcNAc\u03b21,4[Fuc\u03b11,6]GlcNAc). This is precise but unwieldy. The CFG/Consortium for Functional Glycomics uses symbolic representation with coloured shapes (blue square = GlcNAc, green circle = Man, red triangle = Fuc, yellow circle = Gal, purple diamond = Neu5Ac). The GlyTouCan database assigns unique accession numbers to each glycan structure. In regulatory filings (CTD Module 3.2.S.3.1), the Oxford notation is standard, but the full compositional formula (e.g., GlcNAc\u2084Man\u2083Fuc\u2081Gal\u2082Neu5Ac\u2081) should also be provided for unambiguous identification.',
    },
    {
      type: 'callout',
      title: 'Practical Tip \u2014 Reading HILIC Chromatograms',
      variant: 'info',
      content:
        'In HILIC-FLR chromatography of released IgG glycans, the elution order follows increasing hydrophilicity (more polar glycans elute later). The typical elution order for CHO-derived IgG1 is: G0F (earliest, least polar) \u2192 G0FB \u2192 G1F/G1F\u2019 (partial resolution of isomers) \u2192 G1FB \u2192 G2F \u2192 Man5 (elutes near G2F region) \u2192 G2FS1 \u2192 G2FS2 (latest, most polar due to charged sialic acid). High-mannose species can sometimes co-elute with complex-type species of similar polarity, requiring MS confirmation. When reviewing glycan data in a batch record or comparability study, always check that the integration method accounts for these co-elutions and that peak assignments are mass-confirmed.',
    },
  ],
  mentorQuestions: [
    'You receive a HILIC-FLR chromatogram showing an unexpected peak between G1F and G2F. How would you systematically identify this species using exoglycosidase sequencing and mass spectrometry?',
    'Why does the Oxford notation system not capture linkage information (e.g., \u03b12,3 vs \u03b12,6 sialic acid)? What analytical method would you use to determine linkage, and why does it matter for a biosimilar programme?',
    'A colleague reports that the G1F peak in their HILIC chromatogram is broader than expected. What structural feature of G1F could explain this, and how would you investigate?',
  ],
};
