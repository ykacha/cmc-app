import type { ModuleContent } from '../../types/content';

export const module12: ModuleContent = {
  id: 'structure-m12',
  sectionId: 'structure',
  moduleNumber: 12,
  eyebrow: 'STRUCTURE 13',
  title: 'Asn297 Glycan Site',
  lead: 'The conserved N-linked glycosylation site that acts as a structural strut for CH2 — and the complete Golgi enzyme cascade that builds the glycan.',
  tags: [
    { label: 'N297', color: 'teal' },
    { label: 'Glycan Strut', color: 'green' },
    { label: 'Golgi Cascade', color: 'purple' },
  ],
  stats: [
    { label: 'Sequon', value: 'N-L-T (297-299)' },
    { label: 'OST Efficiency', value: '97-99%' },
    { label: 'Glycoforms', value: '~30/batch' },
    { label: '\u0394Tm aglyco', value: '-10\u00B0C CH2' },
  ],
  sections: [
    {
      type: 'card',
      title: 'The Asn297 Sequon \u2014 N-L-T (EU 297\u2013299)',
      color: 'teal',
      content:
        'Position 297 in EU numbering (Kabat 297, IMGT 84.4 in CH2) carries the sole conserved N-linked glycosylation sequon in all four human IgG subclasses. The sequon tripeptide is Asn-Leu-Thr (N-L-T), where Asn297 is the glycosylation acceptor, Leu298 occupies the X position (any residue except Pro), and Thr299 provides the hydroxyl-containing residue that completes the sequon recognition motif for oligosaccharyltransferase (OST). The N-X-T sequon is glycosylated more efficiently than N-X-S by OST because the methyl group of threonine creates a more favourable hydrogen-bonding geometry with the STT3A catalytic subunit. Measured occupancy of Asn297 in CHO-produced IgG1 is typically 97\u201399%, meaning that only 1\u20133% of heavy chains are aglycosylated at this site. The residual aglycosylation arises from rare kinetic failures of co-translational OST action as the nascent HC exits the Sec61 translocon into the ER lumen. Aglycosylated HC chains can still fold and assemble into intact IgG, but the resulting molecules have profoundly different CH2 domain behaviour.',
    },
    {
      type: 'card',
      title: 'Glycan as Structural Strut \u2014 CH2 Domain Architecture',
      color: 'green',
      content:
        'The N297 glycan plays a structural role that is unique in glycobiology: it acts as an internal strut that holds the two CH2 domains apart in the characteristic horseshoe-shaped Fc configuration. X-ray crystallography (PDB 1HZH, 1FC1, 3AVE) shows that the core GlcNAc\u2082Man\u2083 trisaccharide of each glycan chain makes extensive non-covalent contacts with the inner face of the CH2 domain. Specifically, the first core GlcNAc (GlcNAc-1) contacts residues in the C\u2019E loop of CH2, while the trimannosyl core and the \u03B11,6-arm extend toward the opposing CH2 domain. The glycan\u2013protein contacts involve approximately 500\u2013600 \u00C5\u00B2 of buried surface area per heavy chain. The \u03B11,6-arm fucose residue (when present) makes van der Waals contacts with Tyr296, further stabilising the glycan\u2013CH2 interface. Critically, the glycan makes direct contacts with the lower hinge residues L234 and L235 (the LLGG motif, EU numbering), bridging the CH2 body to the lower hinge segment. This glycan\u2013lower hinge contact positions the Fc\u03B3R binding groove in the open conformation required for receptor engagement. The inter-CH2 distance at the base of the Fc (measured between C\u03B1 atoms of equivalent residues on each CH2) is approximately 30\u201335 \u00C5 in glycosylated IgG but collapses to approximately 15\u201320 \u00C5 upon deglycosylation, occluding the Fc\u03B3R binding cleft.',
    },
    {
      type: 'card',
      title: 'Aglycosylation \u2014 Thermal and Functional Consequences',
      color: 'red',
      content:
        'Removal of the N297 glycan (by PNGase F digestion, Asn297Gln mutation, or tunicamycin treatment) has severe consequences for CH2 domain stability and Fc effector function. Differential scanning calorimetry (DSC) shows that the CH2 thermal unfolding transition (Tm1) drops by approximately 10\u00B0C in aglycosylated IgG1 (from ~71\u00B0C to ~61\u00B0C), while CH3 Tm (~83\u00B0C) and Fab Tm are minimally affected. This selective CH2 destabilisation reflects the loss of glycan-mediated internal bracing. Functionally, aglycosylated IgG1 shows: (1) complete loss of Fc\u03B3RI binding (CD64), because the collapsed CH2 domains cannot present the L234/L235/P329 binding epitope; (2) >100-fold reduction in Fc\u03B3RIIIa binding (CD16a), eliminating ADCC activity; (3) loss of C1q hexamer binding and therefore no CDC activity; (4) preserved FcRn binding at pH 6.0 (the FcRn binding site spans CH2-CH3 interface and is glycan-independent), maintaining normal PK. This selectivity is exploited in "effector-silent" Fc engineering: Asn297Ala or Asn297Gly mutations (or the LALA-PG mutation L234A/L235A/P329G which achieves similar effector ablation) are used for bispecifics and T-cell engagers where Fc effector function would cause off-target toxicity.',
    },
    {
      type: 'table',
      title: 'Aglycosylation Impact on Fc Receptor Binding',
      headers: ['Fc Receptor', 'Normal IgG1 K\u2084 (nM)', 'Aglycosylated K\u2084 (nM)', 'Fold Change', 'Functional Consequence'],
      rows: [
        ['Fc\u03B3RI (CD64)', '~1\u201310', 'Not detectable', '>1000\u00D7 loss', 'No phagocytosis activation'],
        ['Fc\u03B3RIIa (CD32a)', '~100\u2013700', '>10,000', '>20\u00D7 loss', 'Reduced ADCP'],
        ['Fc\u03B3RIIb (CD32b)', '~300\u20131000', '>10,000', '>10\u00D7 loss', 'Loss of inhibitory signalling'],
        ['Fc\u03B3RIIIa (CD16a) V158', '~50\u2013200', '>10,000', '>100\u00D7 loss', 'No ADCC'],
        ['Fc\u03B3RIIIa (CD16a) F158', '~200\u2013600', '>10,000', '>50\u00D7 loss', 'No ADCC'],
        ['C1q', '~50 \u03BCg/mL', 'Not detectable', 'Complete loss', 'No CDC'],
        ['FcRn (pH 6.0)', '~500\u20131000', '~500\u20131000', '~1\u00D7 (preserved)', 'Normal half-life'],
        ['Protein A', '~10\u201350', '~10\u201350', '~1\u00D7 (preserved)', 'Normal ProA purification'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Oligosaccharyltransferase (OST) \u2014 Co-Translational Glycan Attachment',
      color: 'blue',
      content:
        'The glycan is attached to Asn297 co-translationally by the oligosaccharyltransferase (OST) complex as the nascent HC polypeptide emerges through the Sec61 translocon into the ER lumen. The mammalian OST exists in two isoforms: STT3A-containing (co-translational, predominant for Asn297) and STT3B-containing (post-translational, mops up skipped sites). The STT3A complex scans the emerging polypeptide and transfers the pre-assembled lipid-linked oligosaccharide (LLO), Glc\u2083Man\u2089GlcNAc\u2082-PP-Dol (G3M9), from the dolichol carrier to the Asn amide nitrogen of the N-X-T/S sequon. The transfer occurs approximately 65\u201375 residues from the ribosome exit tunnel (the minimal distance for the sequon to emerge into the ER lumen). For IgG1 HC (typically ~450 residues), Asn297 is glycosylated when approximately residues 360\u2013370 are being translated. The 97\u201399% glycosylation efficiency reflects the favourable kinetics of the N-L-T sequon combined with efficient STT3A association with the Sec61 translocon. The 1\u20133% aglycosylation rate is consistent across CHO, HEK293, and NS0 expression systems and is considered an intrinsic property of OST kinetics rather than a process-dependent variable.',
    },
    {
      type: 'card',
      title: 'Complete Golgi Enzyme Cascade \u2014 From Glc\u2083Man\u2089 to Mature Glycoform',
      color: 'purple',
      content:
        'After OST-mediated transfer, the Glc\u2083Man\u2089GlcNAc\u2082 glycan undergoes sequential processing by a defined enzyme cascade spanning ER and Golgi compartments. The cascade proceeds in strict order because each enzyme\u2019s product is the next enzyme\u2019s substrate. In the ER: glucosidase I (MOGS gene) removes the terminal \u03B11,2-glucose, then glucosidase II (GANAB/PRKCSH genes) removes the two remaining \u03B11,3-glucoses sequentially, producing Man\u2089GlcNAc\u2082. The mono-glucosylated intermediate (Glc\u2081Man\u2089GlcNAc\u2082) enters the calnexin/calreticulin quality control cycle: if the glycoprotein is misfolded, UGGT1 re-glucosylates it and it re-enters the cycle. ER \u03B1-mannosidase I (MAN1B1) then trims one \u03B11,2-mannose to yield Man\u2088GlcNAc\u2082, which is the ER-exit form. In the cis-Golgi, Golgi \u03B1-mannosidase I (MAN1A1/MAN1A2) removes the remaining three \u03B11,2-mannoses to yield Man\u2085GlcNAc\u2082. This is the critical decision point: Man\u2085 must be processed by GnTI to continue to complex-type, or it exits as high-mannose. In the medial-Golgi, GnTI (MGAT1) adds the first antennary GlcNAc, then \u03B1-mannosidase II (MAN2A1) trims two mannoses, then GnTII (MGAT2) adds the second antennary GlcNAc to complete the biantennary core. In the trans-Golgi, FUT8 adds core fucose, B4GalT1 adds terminal galactose (Mn\u00B2\u207A-dependent), and ST6Gal1 (human) or ST3Gal4 (CHO) can add terminal sialic acid.',
    },
    {
      type: 'table',
      title: 'Golgi Enzyme Cascade \u2014 Gene Names, Substrates, and Process Levers',
      headers: ['Step', 'Enzyme', 'Gene', 'Compartment', 'Reaction', 'Sugar Donor / Cofactor', 'Process Lever'],
      rows: [
        ['1', 'Glucosidase I', 'MOGS', 'ER', 'Glc\u2083Man\u2089 \u2192 Glc\u2082Man\u2089', '\u2014', 'Castanospermine (inhibitor)'],
        ['2', 'Glucosidase II', 'GANAB', 'ER', 'Glc\u2082Man\u2089 \u2192 Man\u2089', '\u2014', 'QC cycle entry point'],
        ['3', 'ER ManI', 'MAN1B1', 'ER', 'Man\u2089 \u2192 Man\u2088', '\u2014', 'ERAD targeting if misfolded'],
        ['4', 'Golgi \u03B1-ManI', 'MAN1A1/A2', 'cis-Golgi', 'Man\u2088 \u2192 Man\u2085', '\u2014', 'Kifunensine (inhibitor); Golgi transit time'],
        ['5', 'GnTI', 'MGAT1', 'medial', 'Man\u2085 \u2192 GlcNAcMan\u2085', 'UDP-GlcNAc', 'Glucose feed (HBP flux)'],
        ['6', '\u03B1-ManII', 'MAN2A1', 'medial', 'GlcNAcMan\u2085 \u2192 GlcNAcMan\u2083', '\u2014', 'Swainsonine (inhibitor); NH\u2083 control'],
        ['7', 'GnTII', 'MGAT2', 'medial', 'GlcNAcMan\u2083 \u2192 GlcNAc\u2082Man\u2083', 'UDP-GlcNAc', 'UDP-GlcNAc availability'],
        ['8', 'FUT8', 'FUT8', 'medial\u2013trans', 'G0 \u2192 G0F (core Fuc)', 'GDP-Fucose', 'FUT8 KO; 2-fluorofucose; MGAT3 OE'],
        ['9', 'B4GalT1', 'B4GALT1', 'trans', 'G0F \u2192 G1F/G2F', 'UDP-Gal', 'Mn\u00B2\u207A supplement; temp shift 32\u201333\u00B0C'],
        ['10', 'ST6Gal1', 'ST6GAL1', 'trans', 'G2F \u2192 G2FS1/S2', 'CMP-Neu5Ac', 'ST6GAL1 OE; CMP-Neu5Ac feed'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Glycan\u2013Lower Hinge Contacts \u2014 L234/L235 Positioning',
      color: 'amber',
      content:
        'The structural connection between the N297 glycan and the lower hinge is the mechanistic basis for why glycosylation controls effector function. Crystal structures of Fc alone and Fc\u2013Fc\u03B3R complexes (PDB 3AVE, 3SGJ, 1T89) reveal that the \u03B11,6-arm of the glycan (the arm bearing the antennary GlcNAc, galactose, and optional sialic acid) extends from the CH2 inner face toward the lower hinge, making van der Waals contacts with the backbone of residues 234\u2013237 (the LLGG motif). These contacts position the Leu234 and Leu235 side chains in the outward-facing orientation required for insertion into the hydrophobic groove on Fc\u03B3RIIIa. When the glycan is removed, the lower hinge segment becomes disordered (invisible in X-ray electron density maps), and L234/L235 can no longer engage the receptor. The \u03B11,3-arm of the glycan (the arm bearing the other antennary GlcNAc) projects inward between the two CH2 domains and makes contacts primarily with the C\u2019E loop of the same CH2 domain, contributing to the inter-CH2 spacing. The combination of \u03B11,6-arm\u2013lower hinge contacts and \u03B11,3-arm\u2013CH2 bracing creates the open Fc conformation essential for all Fc\u03B3R interactions.',
    },
    {
      type: 'bullets',
      title: 'Glycoform Heterogeneity at Asn297 \u2014 Typical CHO IgG1 Distribution',
      color: 'teal',
      items: [
        'G0F (GlcNAc\u2082Man\u2083GlcNAc\u2082Fuc): 30\u201350% of total glycans. The dominant species in most CHO-derived IgG1 products. Carries no terminal galactose or sialic acid. Full ADCC competency.',
        'G1F (GalGlcNAc\u2082Man\u2083GlcNAc\u2082Fuc): 20\u201335%. Exists as two positional isomers \u2014 G1F(\u03B11,6) and G1F(\u03B11,3) \u2014 depending on which arm carries the galactose. The \u03B11,6-arm isomer is more common due to greater B4GalT1 accessibility.',
        'G2F (Gal\u2082GlcNAc\u2082Man\u2083GlcNAc\u2082Fuc): 5\u201315%. Fully galactosylated on both arms. Enhanced C1q binding and CDC activity relative to G0F.',
        'Man5 (Man\u2085GlcNAc\u2082): 2\u201310%. Represents glycans that exited the Golgi before GnTI could act. Cleared faster via mannose receptor. Always a CQA.',
        'G0F-GlcNAc (GlcNAcMan\u2083GlcNAc\u2082Fuc, missing one antenna): 1\u20135%. Arises from incomplete GnTII processing or from extracellular hexosaminidase clipping.',
        'Afucosylated species (G0, G1, G2): 2\u20138% total. Enhanced Fc\u03B3RIIIa binding and ADCC. May increase in late-harvest culture due to GDP-fucose depletion.',
        'Sialylated species (G2FS1, G2FS2): 1\u20135% total in standard CHO. Higher in human cell lines (HEK293). \u03B12,3-linked in CHO vs \u03B12,6-linked in human.',
        'Hybrid species (e.g., GlcNAcMan\u2085GlcNAc\u2082Fuc): <2%. Represent incomplete \u03B1-ManII processing. Typically minor and reported in characterisation only.',
      ],
    },
    {
      type: 'callout',
      title: 'Why ~30 Glycoforms Per Batch?',
      variant: 'info',
      content:
        'The approximately 30 distinct glycoforms detected in a typical CHO IgG1 batch arise from the combinatorial permutations of independent glycan modifications: fucosylation (yes/no = 2), antennary GlcNAc (0, 1 on \u03B11,3, 1 on \u03B11,6, or 2 = 4), galactosylation (0, 1 on \u03B11,3, 1 on \u03B11,6, or 2 = 4), sialylation (0, 1, or 2 = 3), high-mannose intermediates (Man5, Man6, Man7, Man8, Man9 = 5), and occasional species like bisecting GlcNAc, hybrid structures, and truncated forms. When each modification is combinatorially independent, the theoretical number of glycoforms exceeds 100, but most exist below the limit of detection. Hydrophilic interaction liquid chromatography (HILIC) coupled with fluorescence detection (2-AB or 2-AA labelled glycans) typically resolves 20\u201340 distinct peaks above the 0.1% reporting threshold. Released glycan profiling by HILIC-FLD is the primary analytical method for monitoring glycoform distribution, complemented by intact mass spectrometry for glycoform assignment and CE-LIF for rapid in-process monitoring.',
    },
    {
      type: 'table',
      title: 'Analytical Methods for Asn297 Glycan Characterisation',
      headers: ['Method', 'Analyte', 'Information Obtained', 'LOQ', 'Release/Char', 'Key Consideration'],
      rows: [
        ['HILIC-FLD (released glycans)', 'PNGase F-released, 2-AB labelled', 'Glycoform distribution (%)', '~0.1%', 'Release', 'PNGase F must be IgG-grade (no glycan contamination)'],
        ['Intact mass (LC-MS)', 'Denatured, reduced IgG', 'Glycoform mass assignment', '~1%', 'Release/Char', 'Deglycosylation optional for simplified spectrum'],
        ['CE-LIF (released glycans)', 'APTS-labelled glycans', 'Rapid glycoform screening', '~0.2%', 'In-process', 'Fast turnaround but lower resolution than HILIC'],
        ['MALDI-TOF', 'Permethylated or native glycans', 'Glycan mass fingerprint', '~1%', 'Char', 'No chromatographic separation; isomer-blind'],
        ['LC-MS/MS (glycopeptide)', 'Tryptic Asn297 glycopeptide', 'Site-specific glycoform ID', '~0.1%', 'Char', 'Confirms glycan is at Asn297 (not other sites)'],
        ['Lectin ELISA / SPR', 'Intact IgG', 'Specific motif detection (e.g., AAL for Fuc)', 'Semi-quant', 'Char', 'Useful for rapid screening, not quantitative'],
        ['Weak anion exchange (WAX)', 'Released glycans', 'Charge-based separation (sialylated)', '~0.1%', 'Char', 'Complements HILIC for sialylated species'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: 'Regulatory Expectations for Asn297 Glycan Control',
      variant: 'warning',
      content:
        'Regulatory agencies (FDA, EMA, PMDA) expect comprehensive characterisation and control of the Asn297 glycan profile as a critical quality attribute. ICH Q6B requires that "carbohydrate content (neutral sugars, amino sugars, sialic acids)" and "sugar chain structure" be characterised. In practice, this means: (1) a validated HILIC-FLD or CE-LIF released glycan method as a release test with acceptance criteria for the major glycoform groups (e.g., G0F: 25\u201355%, afucosylated: NMT 8%, Man5: NMT 10%); (2) intact mass spectrometry confirming glycoform assignments; (3) glycopeptide mapping confirming site-specific occupancy at Asn297; (4) monosaccharide composition analysis (GC-MS or HPAEC-PAD) as a characterisation method; and (5) functional correlation data linking glycan profile ranges to potency (ADCC, CDC) within the design space. For biosimilars, glycan profile similarity is one of the most scrutinised analytical comparability attributes (EMA/CHMP/BMWP/403543/2010). Any glycoform difference greater than the innovator variability range requires justification through functional and clinical bridging data.',
    },
    {
      type: 'card',
      title: 'Process Levers for Glycan Profile Control at Asn297',
      color: 'green',
      content:
        'Manufacturing control of the Asn297 glycan profile relies on upstream cell culture parameters that modulate enzyme activity and nucleotide sugar availability in the Golgi. The primary levers are: (1) Manganese (Mn\u00B2\u207A): 0.01\u20130.1 mM MnCl\u2082 supplementation increases galactosylation by enhancing B4GalT1 catalytic activity (Mn\u00B2\u207A is the essential divalent cation cofactor). (2) Temperature shift: reducing culture temperature from 37\u00B0C to 32\u201333\u00B0C at mid-exponential phase slows cell growth but extends Golgi transit time, allowing more complete processing by B4GalT1 and ST6Gal1. (3) Glucose control: maintaining glucose >1 g/L prevents hexosamine biosynthetic pathway (HBP) starvation, ensuring adequate UDP-GlcNAc for GnTI/GnTII. Glucose depletion is the primary cause of elevated Man5. (4) Ammonia control: keeping NH\u2083 below 5 mM preserves Golgi pH gradients (cis 6.7, medial 6.3, trans 6.0) required for optimal enzyme activity. GlutaMAX substitution for glutamine is the standard mitigation. (5) Dissolved oxygen (DO): maintaining DO 30\u201350% air saturation prevents hypoxia-driven Golgi dysfunction. (6) Fucosylation control: 2-fluorofucose (10\u2013200 \u03BCM) or FUT8 gene knockout for ADCC-enhanced products. (7) Harvest timing: late-harvest (viability <70%) releases intracellular hexosaminidases and sialidases that degrade the glycan ex vivo.',
    },
  ],
  mentorQuestions: [
    'Your innovator benchmarking shows Man5 at 3\u20135%, but your CHO process consistently produces 8\u201312% Man5. Walk through the root cause investigation you would conduct, prioritising the most likely upstream process parameters, and describe the analytical workflow to confirm whether the Man5 is due to incomplete Golgi \u03B1-ManI processing versus GnTI substrate limitation.',
    'A regulatory agency requests that you justify why your afucosylated glycoform specification (NMT 8%) is appropriate for a non-ADCC-dependent mAb. Draft the scientific argument, referencing the Fc\u03B3RIIIa binding mechanism and citing relevant literature to demonstrate that 8% afucosylated species will not meaningfully alter the efficacy or safety profile.',
    'During process development for a biosimilar, your HILIC glycan profile shows G0F at 48% versus the innovator mean of 35%. Both are within the individual glycoform specification ranges, but the overall profile shape is visibly different. How would you approach this comparability gap \u2014 what functional assays would you prioritise, and what process adjustments would you consider to shift the G0F:G1F:G2F ratio toward the innovator profile?',
  ],
};
