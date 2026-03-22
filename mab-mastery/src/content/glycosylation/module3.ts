import type { ModuleContent } from '../../types/content';

export const module3: ModuleContent = {
  id: 'glycosylation-m3',
  sectionId: 'glycosylation',
  moduleNumber: 3,
  eyebrow: 'GLYCOSYLATION 04',
  title: 'Golgi Processing',
  lead: 'The ordered enzyme cascade that converts high-mannose precursors into complex-type glycans \u2014 and the process levers that control each step in CHO manufacturing.',
  tags: [
    { label: 'Enzyme Cascade', color: 'teal' },
    { label: 'Process Levers', color: 'amber' },
    { label: 'UDP-Sugar Donors', color: 'green' },
  ],
  stats: [
    { label: 'Key Enzymes', value: '8+' },
    { label: 'Compartments', value: 'cis\u2192medial\u2192trans' },
    { label: 'Transit Time', value: '~10\u201320 min' },
    { label: 'Key Cofactor', value: 'Mn\u00b2\u207a' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Golgi Organisation \u2014 The Assembly Line',
      color: 'teal',
      content:
        'The Golgi apparatus functions as a sequential processing assembly line for N-glycan maturation. Glycoproteins enter the cis-Golgi from the ER via COPII vesicles and progress through medial-Golgi to trans-Golgi/TGN before secretion. Each Golgi compartment houses a distinct set of glycosyltransferases and glycosidases, creating an ordered enzyme cascade. The spatial segregation of enzymes is maintained by differences in transmembrane domain length (short TMDs in cis, longer in trans) and by retrieval mechanisms (COPI retrograde transport of escaped enzymes). For IgG glycan processing, the key transformation is: Man\u2088\u2013\u2089GlcNAc\u2082 (ER exit form) \u2192 Man\u2085GlcNAc\u2082 (cis-Golgi trimming) \u2192 GlcNAcMan\u2085GlcNAc\u2082 (medial, GnTI) \u2192 GlcNAcMan\u2083GlcNAc\u2082 (medial, ManII trimming) \u2192 GlcNAc\u2082Man\u2083GlcNAc\u2082 (medial, GnTII) \u2192 complex-type modifications (fucose, galactose, sialic acid in trans-Golgi). Transit time through the entire Golgi stack is approximately 10\u201320 minutes, and kinetic competition between enzymes at each step determines the final glycan distribution.',
    },
    {
      type: 'card',
      title: '\u03b1-Mannosidase I (cis-Golgi)',
      color: 'blue',
      content:
        'Golgi \u03b1-mannosidase I (primarily MAN1A1 and MAN1A2 genes, also called Golgi ManIA and ManIB) is the first processing enzyme encountered in the cis-Golgi. It is a class I \u03b1-mannosidase that sequentially removes the four \u03b11,2-linked mannose residues added during the luminal phase of LLO assembly, converting Man\u2088\u2013\u2089GlcNAc\u2082 to Man\u2085GlcNAc\u2082. The trimming proceeds through Man\u2088 \u2192 Man\u2087 \u2192 Man\u2086 \u2192 Man\u2085 intermediates. MAN1A1 and MAN1A2 have partially overlapping specificities but different kinetics for each mannose removal step. The product, Man\u2085GlcNAc\u2082, is the obligate substrate for the next enzyme in the cascade (GnTI/MGAT1). Incomplete \u03b1-mannosidase I processing (i.e., residual Man\u2086\u2013Man\u2089 species escaping to the medial Golgi) is the primary source of high-mannose glycoforms on the final product. Kifunensine, a potent competitive inhibitor of \u03b1-mannosidase I, is used experimentally to produce uniformly high-mannose antibodies (Man\u2089) for structural and functional studies.',
    },
    {
      type: 'card',
      title: 'GnTI \u2014 The Gateway Enzyme (medial-Golgi)',
      color: 'green',
      content:
        'N-acetylglucosaminyltransferase I (GnTI, MGAT1 gene) is the gateway enzyme that commits the glycan to complex-type processing. GnTI adds a \u03b21,2-linked GlcNAc to the \u03b11,3-mannose branch of Man\u2085GlcNAc\u2082, producing GlcNAcMan\u2085GlcNAc\u2082 (also called the hybrid intermediate). This step is absolutely required for all subsequent processing: without GnTI action, \u03b1-mannosidase II cannot act (it requires the \u03b21,2-GlcNAc as a "flag" to recognise its substrate), and the glycan remains trapped as Man\u2085. GnTI uses UDP-GlcNAc as the nucleotide sugar donor, which is transported into the Golgi lumen by the SLC35A3 transporter. The availability of UDP-GlcNAc in the Golgi lumen is therefore rate-limiting for GnTI activity. In cell culture, glucose limitation reduces the hexosamine biosynthetic pathway (HBP) flux, lowering UDP-GlcNAc levels and causing GnTI to stall \u2014 this is the primary metabolic mechanism by which glucose starvation increases Man5 on the final product.',
    },
    {
      type: 'card',
      title: '\u03b1-Mannosidase II (medial-Golgi)',
      color: 'purple',
      content:
        '\u03b1-Mannosidase II (MAN2A1 gene, also called Golgi ManII) is a class II \u03b1-mannosidase that removes two mannose residues (\u03b11,3-Man and \u03b11,6-Man) from the GnTI product, converting GlcNAcMan\u2085GlcNAc\u2082 to GlcNAcMan\u2083GlcNAc\u2082. This trimming is prerequisite for GnTII action. \u03b1-Mannosidase II is the target of swainsonine, an indolizidine alkaloid inhibitor originally isolated from Swainsona canescens. Swainsonine treatment blocks the conversion from hybrid-type to complex-type glycans, resulting in hybrid structures (one GlcNAc antenna on the \u03b11,3-arm, unprocessed mannose on the \u03b11,6-arm). Unlike \u03b1-mannosidase I, \u03b1-mannosidase II requires prior GnTI action \u2014 it cannot act on Man\u2085GlcNAc\u2082 directly. This enzymatic dependency ensures the ordered processing: ManI \u2192 GnTI \u2192 ManII \u2192 GnTII. In cell culture, \u03b1-mannosidase II activity is rarely rate-limiting under normal conditions, but Golgi pH perturbation (e.g., from ammonia accumulation) can reduce its efficiency.',
    },
    {
      type: 'card',
      title: 'GnTII \u2014 Completing the Biantennary Core (medial-Golgi)',
      color: 'teal',
      content:
        'N-acetylglucosaminyltransferase II (GnTII, MGAT2 gene) adds a \u03b21,2-linked GlcNAc to the \u03b11,6-mannose branch of GlcNAcMan\u2083GlcNAc\u2082, producing GlcNAc\u2082Man\u2083GlcNAc\u2082 \u2014 the fully processed biantennary core. This is the "G0" structure in Oxford notation (before fucose, galactose, or sialic acid additions). GnTII also uses UDP-GlcNAc as the sugar donor. Incomplete GnTII processing produces monoantennary species (GlcNAc\u2081Man\u2083GlcNAc\u2082), which are rare under normal conditions but can increase under severe UDP-GlcNAc limitation. With both antennary GlcNAc residues in place, the glycan is now competent for the three terminal modifications: core fucosylation (FUT8), galactosylation (B4GalT1), and sialylation (ST6Gal1/ST3Gal4). These terminal modifications can occur in partially overlapping Golgi compartments and are subject to kinetic competition with each other and with the rate of vesicular transport through the Golgi.',
    },
    {
      type: 'card',
      title: 'FUT8 \u2014 Core Fucosylation (medial-to-trans Golgi)',
      color: 'red',
      content:
        '\u03b11,6-Fucosyltransferase 8 (FUT8 gene) adds a core \u03b11,6-linked fucose to the innermost (reducing-end) GlcNAc of the chitobiose core. FUT8 uses GDP-fucose as the nucleotide sugar donor, which is synthesised via two pathways: the de novo pathway (from GDP-mannose, through GMD/GMDS gene and FX/TSTA3 gene) and the salvage pathway (from free fucose, through FUK gene and FPGT gene). FUT8 acts on the biantennary core after GnTII has added both antennary GlcNAc residues, although it can also act on GnTI products at lower efficiency. Critically, FUT8 and GnTIII (MGAT3) compete for the same substrate: if GnTIII adds a bisecting GlcNAc first, FUT8 is sterically blocked and cannot add core fucose. This competition is exploited in glyco-engineering. Process levers for fucosylation control include: GDP-fucose pathway inhibitors (e.g., 2-fluorofucose, which generates GDP-2F-Fuc that inhibits FUT8), FUT8 gene knockout (POTELLIGENT platform), MGAT3 overexpression (GlycoMAb), and fucose-free media (limiting salvage pathway input).',
    },
    {
      type: 'card',
      title: 'B4GalT1 \u2014 Galactosylation (trans-Golgi)',
      color: 'amber',
      content:
        '\u03b21,4-Galactosyltransferase 1 (B4GALT1 gene) is the primary enzyme responsible for adding terminal \u03b21,4-linked galactose to the antennary GlcNAc residues of the biantennary core. B4GalT1 resides in the trans-Golgi and uses UDP-galactose as the nucleotide sugar donor and requires Mn\u00b2\u207a as an essential divalent cation cofactor for catalytic activity. The Mn\u00b2\u207a requirement makes galactosylation uniquely sensitive to manganese supplementation in cell culture media: addition of 0.01\u20130.1 mM MnCl\u2082 to CHO culture media can increase galactosylation by 10\u201330% relative. Galactosylation on IgG Fc is inherently limited compared to secreted glycoproteins because the Fc glycan is partially buried within the CH2 cavity, restricting B4GalT1 access. This steric constraint explains why CHO-derived IgG typically shows a galactosylation gradient (G0F > G1F > G2F) rather than complete galactosylation. Additional process levers include: temperature reduction (32\u201333\u00b0C increases B4GalT1 activity and Golgi transit time), UDP-galactose supplementation, and galactose feed (precursor for UDP-Gal biosynthesis).',
    },
    {
      type: 'card',
      title: 'GnTIII \u2014 Bisecting GlcNAc (medial-Golgi)',
      color: 'green',
      content:
        'N-acetylglucosaminyltransferase III (GnTIII, MGAT3 gene) adds a \u03b21,4-linked bisecting GlcNAc to the \u03b2-mannose of the trimannosyl core. Unlike antennary GlcNAc residues (which are added to the branch mannoses), the bisecting GlcNAc attaches directly to the central core mannose, creating a non-elongatable branch. Wild-type CHO cells express very low levels of MGAT3, so bisecting species are minimal (<1\u20132%) in standard processes. The functional significance of bisecting GlcNAc lies in its competitive relationship with FUT8: bisecting GlcNAc sterically prevents core fucosylation. Um\u00e3na et al. (Nat. Biotechnol. 1999) demonstrated that overexpression of MGAT3 in CHO cells produces mAbs with high bisecting GlcNAc content, which are consequently low in core fucose and exhibit enhanced ADCC. This is the basis of the GlycoMAb platform used for obinutuzumab manufacturing. The bisecting GlcNAc also prevents further antennary branching by GnTIV (MGAT4) and GnTV (MGAT5), locking the glycan in the biantennary configuration.',
    },
    {
      type: 'card',
      title: 'ST6Gal1/ST3Gal \u2014 Sialylation (trans-Golgi)',
      color: 'purple',
      content:
        'Sialyltransferases add terminal sialic acid (Neu5Ac) to galactose residues, using CMP-Neu5Ac as the sugar nucleotide donor. In human cells, the predominant IgG Fc sialyltransferase is ST6Gal1 (ST6GAL1 gene), which adds Neu5Ac via \u03b12,6 linkage. In CHO cells, however, ST6GAL1 expression is minimal; instead, CHO cells primarily express ST3Gal4 (ST3GAL4 gene) and ST3Gal6 (ST3GAL6 gene), which add Neu5Ac via \u03b12,3 linkage. This species-specific linkage difference has functional implications: the anti-inflammatory activity of sialylated IgG (DC-SIGN binding) is associated with \u03b12,6-linked sialic acid. Several groups have engineered CHO cells to overexpress human ST6GAL1 to produce \u03b12,6-sialylated mAbs. Regardless of linkage, IgG Fc sialylation from CHO is naturally low (\u22645\u201315% S1, <2% S2) because of steric constraints within the CH2 glycan pocket that limit sialyltransferase access. In-process sialidases released from lysed cells during late-stage culture can further reduce terminal sialic acid content.',
    },
    {
      type: 'table',
      title: 'Complete Golgi Enzyme Cascade \u2014 Process Levers',
      headers: ['Enzyme', 'Gene', 'Compartment', 'Substrate', 'Product', 'Sugar Donor', 'Cofactor', 'Inhibitor', 'Process Lever'],
      rows: [
        ['\u03b1-Mannosidase I', 'MAN1A1/MAN1A2', 'cis-Golgi', 'Man\u2088\u2013\u2089GlcNAc\u2082', 'Man\u2085GlcNAc\u2082', '\u2014', '\u2014', 'Kifunensine', 'Golgi transit time'],
        ['GnTI', 'MGAT1', 'medial-Golgi', 'Man\u2085GlcNAc\u2082', 'GlcNAcMan\u2085GlcNAc\u2082', 'UDP-GlcNAc', '\u2014', '\u2014', 'Glucose/Gln feed (HBP flux)'],
        ['\u03b1-Mannosidase II', 'MAN2A1', 'medial-Golgi', 'GlcNAcMan\u2085GlcNAc\u2082', 'GlcNAcMan\u2083GlcNAc\u2082', '\u2014', '\u2014', 'Swainsonine', 'Golgi pH (NH\u2083 control)'],
        ['GnTII', 'MGAT2', 'medial-Golgi', 'GlcNAcMan\u2083GlcNAc\u2082', 'GlcNAc\u2082Man\u2083GlcNAc\u2082', 'UDP-GlcNAc', '\u2014', '\u2014', 'UDP-GlcNAc availability'],
        ['FUT8', 'FUT8', 'medial\u2013trans', 'GlcNAc\u2082Man\u2083GlcNAc\u2082 (G0)', 'G0 + core Fuc (G0F)', 'GDP-Fucose', '\u2014', '2F-Fucose', 'GDP-Fuc pathway / FUT8 KO'],
        ['GnTIII', 'MGAT3', 'medial-Golgi', 'G0/G0F', 'G0 + bisecting GlcNAc', 'UDP-GlcNAc', '\u2014', '\u2014', 'MGAT3 OE (GlycoMAb)'],
        ['B4GalT1', 'B4GALT1', 'trans-Golgi', 'G0F', 'G1F / G2F', 'UDP-Gal', 'Mn\u00b2\u207a', '\u2014', 'Mn\u00b2\u207a, temp shift, UDP-Gal feed'],
        ['ST6Gal1', 'ST6GAL1', 'trans-Golgi', 'G2F', 'G2FS1 / G2FS2', 'CMP-Neu5Ac', '\u2014', '\u2014', 'ST6GAL1 OE in CHO'],
        ['ST3Gal4/6', 'ST3GAL4/ST3GAL6', 'trans-Golgi', 'G2F', 'G2FS1 (\u03b12,3)', 'CMP-Neu5Ac', '\u2014', '\u2014', 'Endogenous CHO pathway'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Nucleotide Sugar Transport \u2014 The Hidden Rate-Limiter',
      color: 'blue',
      content:
        'All Golgi glycosyltransferases use nucleotide sugar donors that are synthesised in the cytoplasm but must be transported into the Golgi lumen by specific antiporter transporters. Each transporter exchanges the nucleotide sugar for the corresponding nucleoside monophosphate product. The key transporters are: SLC35A3 for UDP-GlcNAc, SLC35A2 for UDP-Gal, SLC35C1 for GDP-Fucose, and SLC35A1 for CMP-Neu5Ac. Transport capacity can be rate-limiting: even if the glycosyltransferase enzyme is abundant, insufficient luminal substrate will stall the reaction. This is particularly relevant for galactosylation, where UDP-Gal transport via SLC35A2 can limit B4GalT1 activity. Cell engineering approaches have explored overexpression of these transporters alongside the glycosyltransferases to fully relieve the bottleneck. Additionally, the nucleotide sugar biosynthetic pathways themselves are regulated by feedback inhibition: UDP-GlcNAc inhibits glutamine:fructose-6-phosphate amidotransferase (GFPT1/GFPT2 genes, the rate-limiting step of the hexosamine biosynthetic pathway), creating metabolic constraints on glycan processing capacity.',
    },
    {
      type: 'callout',
      title: 'Ammonia and Golgi pH \u2014 A Process-Critical Interaction',
      variant: 'warning',
      content:
        'Ammonia (NH\u2083) accumulation during CHO cell culture is one of the most impactful process variables for glycan quality. Ammonia is produced from glutamine catabolism and amino acid deamination, and can reach 5\u201315 mM in fed-batch cultures without adequate control. As a weak base, NH\u2083 diffuses freely across Golgi membranes and becomes protonated (NH\u2084\u207a) in the acidic Golgi lumen (normal pH: cis ~6.7, medial ~6.3, trans ~6.0). This protonation traps ammonium in the lumen, raising the local pH. Since Golgi glycosyltransferases and glycosidases have pH optima matched to their compartment, even a 0.3\u20130.5 pH unit increase reduces enzyme activity significantly. The result is: reduced galactosylation (B4GalT1 is particularly pH-sensitive), reduced sialylation, and increased high-mannose species. Process mitigation strategies include: glutamine replacement with GlutaMAX (L-alanyl-L-glutamine dipeptide, slower ammonia release), pH-controlled feeds, and cell engineering to reduce glutaminase activity.',
    },
    {
      type: 'bullets',
      title: 'Process Lever Summary for Manufacturing Control',
      color: 'amber',
      items: [
        'Temperature shift (37\u00b0C \u2192 32\u201333\u00b0C): Slows cellular metabolism, extends Golgi transit time, increases B4GalT1 exposure time \u2192 higher galactosylation, lower Man5.',
        'Mn\u00b2\u207a supplementation (0.01\u20130.1 mM MnCl\u2082): Essential cofactor for B4GalT1 catalysis \u2192 direct increase in galactosylation (G1F, G2F).',
        'Dissolved oxygen (DO): Maintaining DO above 30% air saturation prevents hypoxia-driven Golgi dysfunction. Low DO increases Man5 and reduces galactosylation.',
        'Glucose feed strategy: Maintaining glucose above 1\u20132 g/L prevents hexosamine pathway starvation and high-mannose accumulation. Glucose bolus vs continuous feed affects glycan variability.',
        'Ammonia control: Keeping NH\u2083 below 5 mM preserves Golgi pH gradients. Strategies include GlutaMAX substitution, asparagine feeding, and controlled glutamine supplementation.',
        'UDP-galactose / galactose supplementation: Provides precursor for UDP-Gal biosynthesis, increasing the substrate pool for B4GalT1.',
        '2-Fluorofucose (2FF) addition: Generates GDP-2F-Fuc which inhibits FUT8, reducing core fucosylation for ADCC-enhanced mAbs (dose-dependent, typically 10\u2013200 \u03bcM).',
        'Cell culture duration: Extended culture increases cell lysis, releasing hexosaminidases and sialidases that degrade glycans on the secreted product. Harvest timing is a glycan quality control lever.',
      ],
    },
  ],
  mentorQuestions: [
    'You are scaling up a mAb process from 200L to 2000L and observe that Man5 increases from 4% to 9%. What process parameter changes would you investigate first, and what is the most likely root cause?',
    'Explain the kinetic competition between FUT8 and MGAT3 for the same substrate. How does this competition form the basis of the GlycoMAb platform?',
    'A colleague proposes adding both Mn\u00b2\u207a and 2-fluorofucose to the cell culture media to simultaneously increase galactosylation and decrease fucosylation. Are there any concerns with this combined strategy?',
  ],
};
