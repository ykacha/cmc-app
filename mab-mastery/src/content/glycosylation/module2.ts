import type { ModuleContent } from '../../types/content';

export const module2: ModuleContent = {
  id: 'glycosylation-m2',
  sectionId: 'glycosylation',
  moduleNumber: 2,
  eyebrow: 'GLYCOSYLATION 03',
  title: 'ER Biosynthesis',
  lead: 'The dolichol pathway and ER quality control machinery \u2014 from Dol-PP-GlcNAc\u2082Man\u2089Glc\u2083 precursor assembly to the calnexin/calreticulin folding checkpoint.',
  tags: [
    { label: 'Dolichol Pathway', color: 'purple' },
    { label: 'OST Complex', color: 'teal' },
    { label: 'Quality Control', color: 'green' },
  ],
  stats: [
    { label: 'Precursor', value: 'Glc\u2083Man\u2089GlcNAc\u2082' },
    { label: 'ALG Genes', value: '~12' },
    { label: 'OST Subunits', value: 'STT3A/B' },
    { label: 'QC Cycles', value: 'Calnexin/CRT' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Overview \u2014 The Dolichol Pathway',
      color: 'purple',
      content:
        'All N-linked glycosylation begins with the assembly of a lipid-linked oligosaccharide (LLO) precursor on the polyisoprenoid lipid carrier dolichol phosphate (Dol-P) in the endoplasmic reticulum membrane. The precursor \u2014 Glc\u2083Man\u2089GlcNAc\u2082-PP-Dol \u2014 is assembled by a series of glycosyltransferases encoded by the ALG (asparagine-linked glycosylation) gene family. The pathway is divided into two topological phases: assembly on the cytoplasmic face of the ER membrane (GlcNAc\u2082Man\u2085 intermediate) followed by flipping to the ER luminal face and completion with four additional mannose and three glucose residues. The fully assembled 14-sugar precursor is then transferred en bloc to the asparagine residue within the NxS/T sequon of the nascent polypeptide by the oligosaccharyltransferase (OST) complex. This en bloc transfer is why all N-glycans, regardless of their final processed form, share a common biosynthetic origin.',
    },
    {
      type: 'card',
      title: 'Cytoplasmic Face \u2014 GlcNAc\u2082Man\u2085 Assembly',
      color: 'blue',
      content:
        'The first phase of LLO assembly occurs on the cytoplasmic face of the ER membrane, using nucleotide sugar donors (UDP-GlcNAc and GDP-Man) that are synthesised in the cytoplasm. The pathway begins with ALG7 (DPAGT1 gene), which transfers GlcNAc-1-phosphate from UDP-GlcNAc to dolichol phosphate, forming GlcNAc-PP-Dol. This is the committed step and the target of tunicamycin, a potent competitive inhibitor. Next, ALG13/ALG14 (a heterodimeric enzyme complex; genes ALG13 and ALG14) adds the second GlcNAc via \u03b21,4 linkage to form GlcNAc\u2082-PP-Dol. Mannose addition then proceeds: ALG1 (ALG1 gene) adds the first \u03b21,4-linked mannose to the chitobiose core. ALG2 (ALG2 gene) adds two mannose residues \u2014 the \u03b11,3-branch mannose and the \u03b11,6-branch mannose \u2014 to form the trimannosyl core Man\u2083GlcNAc\u2082-PP-Dol. ALG11 (ALG11 gene) then extends the \u03b11,3-branch by adding two \u03b11,2-linked mannose residues, yielding Man\u2085GlcNAc\u2082-PP-Dol. At this point, the LLO intermediate is complete on the cytoplasmic face and must be flipped to the luminal side.',
    },
    {
      type: 'card',
      title: 'Flipping \u2014 Translocation Across the ER Membrane',
      color: 'teal',
      content:
        'The Man\u2085GlcNAc\u2082-PP-Dol intermediate must be translocated ("flipped") from the cytoplasmic face to the luminal face of the ER membrane to complete assembly. This topological switch is mediated by an ATP-independent flippase, with RFT1 (RFT1 gene) identified as the primary candidate in yeast and mammalian cells. The flipping is energetically unfavourable because it requires moving a large, hydrophilic glycan headgroup across the hydrophobic lipid bilayer. The mechanism likely involves a protein-facilitated channel that shields the glycan from the lipid interior. After flipping, the sugar donors change: the remaining four mannose and three glucose residues are added using dolichol-phosphate-linked sugar donors (Dol-P-Man and Dol-P-Glc) rather than cytoplasmic nucleotide sugars, because nucleotide sugars cannot efficiently cross the ER membrane at this stage.',
    },
    {
      type: 'card',
      title: 'Luminal Face \u2014 Man\u2089Glc\u2083 Completion',
      color: 'green',
      content:
        'On the luminal face, four additional mannose residues are added by ALG3, ALG9, and ALG12, all using Dol-P-Man as the sugar donor. ALG3 (ALG3 gene) adds an \u03b11,3-linked mannose to the \u03b11,6-branch, extending it. ALG9 (ALG9 gene) adds an \u03b11,2-linked mannose to the \u03b11,3-branch (its first \u03b11,2-Man extension on the luminal side) and later adds a second \u03b11,2-linked mannose to the \u03b11,6-branch. ALG12 (ALG12 gene) adds an \u03b11,6-linked mannose to create the complete Man\u2089 structure. The three terminal glucose residues are then added by ALG6 (ALG6 gene, adds Glc\u2081 via \u03b11,3 to the \u03b11,3-arm), ALG8 (ALG8 gene, adds Glc\u2082 via \u03b11,3 to Glc\u2081), and ALG10 (ALG10 gene, adds Glc\u2083 via \u03b11,2 to Glc\u2082). The glucose cap is critical: the fully glucosylated Glc\u2083Man\u2089GlcNAc\u2082-PP-Dol is the preferred substrate for the OST complex. Incomplete glucosylation (e.g., ALG6 deficiency) dramatically reduces transfer efficiency.',
    },
    {
      type: 'table',
      title: 'ALG Gene Pathway \u2014 Complete Enzyme Table',
      headers: ['Step', 'Enzyme', 'Gene', 'ER Face', 'Sugar Donor', 'Linkage Added', 'Product'],
      rows: [
        ['1', 'GlcNAc-1-P transferase', 'DPAGT1 (ALG7)', 'Cytoplasmic', 'UDP-GlcNAc', 'GlcNAc\u03b1-PP-Dol', 'GlcNAc\u2081-PP-Dol'],
        ['2', 'GlcNAc transferase', 'ALG13/ALG14', 'Cytoplasmic', 'UDP-GlcNAc', '\u03b21,4-GlcNAc', 'GlcNAc\u2082-PP-Dol'],
        ['3', 'Mannosyltransferase', 'ALG1', 'Cytoplasmic', 'GDP-Man', '\u03b21,4-Man', 'Man\u2081GlcNAc\u2082-PP-Dol'],
        ['4\u20135', 'Mannosyltransferase', 'ALG2', 'Cytoplasmic', 'GDP-Man', '\u03b11,3-Man + \u03b11,6-Man', 'Man\u2083GlcNAc\u2082-PP-Dol'],
        ['6\u20137', 'Mannosyltransferase', 'ALG11', 'Cytoplasmic', 'GDP-Man', '2\u00d7 \u03b11,2-Man', 'Man\u2085GlcNAc\u2082-PP-Dol'],
        ['Flip', 'Flippase', 'RFT1', '\u2014', '\u2014', '\u2014', 'Man\u2085GlcNAc\u2082-PP-Dol (luminal)'],
        ['8', 'Mannosyltransferase', 'ALG3', 'Luminal', 'Dol-P-Man', '\u03b11,3-Man', 'Man\u2086GlcNAc\u2082-PP-Dol'],
        ['9', 'Mannosyltransferase', 'ALG9', 'Luminal', 'Dol-P-Man', '\u03b11,2-Man', 'Man\u2087GlcNAc\u2082-PP-Dol'],
        ['10', 'Mannosyltransferase', 'ALG12', 'Luminal', 'Dol-P-Man', '\u03b11,6-Man', 'Man\u2088GlcNAc\u2082-PP-Dol'],
        ['11', 'Mannosyltransferase', 'ALG9', 'Luminal', 'Dol-P-Man', '\u03b11,2-Man', 'Man\u2089GlcNAc\u2082-PP-Dol'],
        ['12', 'Glucosyltransferase', 'ALG6', 'Luminal', 'Dol-P-Glc', '\u03b11,3-Glc', 'Glc\u2081Man\u2089GlcNAc\u2082-PP-Dol'],
        ['13', 'Glucosyltransferase', 'ALG8', 'Luminal', 'Dol-P-Glc', '\u03b11,3-Glc', 'Glc\u2082Man\u2089GlcNAc\u2082-PP-Dol'],
        ['14', 'Glucosyltransferase', 'ALG10', 'Luminal', 'Dol-P-Glc', '\u03b11,2-Glc', 'Glc\u2083Man\u2089GlcNAc\u2082-PP-Dol'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'OST Complex \u2014 En Bloc Transfer',
      color: 'amber',
      content:
        'The oligosaccharyltransferase (OST) complex catalyses the transfer of the completed Glc\u2083Man\u2089GlcNAc\u2082 glycan from Dol-PP to the asparagine side chain within the NxS/T sequon (where x is any amino acid except proline) of the nascent polypeptide. Mammalian cells express two distinct OST complexes defined by their catalytic subunits: the STT3A complex and the STT3A complex versus the STT3B complex. The STT3A-containing OST (STT3A gene) is physically associated with the Sec61 translocon and acts co-translationally \u2014 it glycosylates sequons as they emerge into the ER lumen during translation. This is the primary pathway for antibody glycosylation and is responsible for the vast majority of Asn297 modification. The STT3B-containing OST (STT3B gene) acts post-translationally, scanning the nascent chain after it has been fully translocated to "catch" any sequons that were missed by STT3A. STT3B is particularly important for sequons located near the C-terminus or in rapidly folding domains. Both complexes share accessory subunits (ribophorin I/RPN1, ribophorin II/RPN2, OST48/DDOST, DAD1, OST4) that contribute to substrate recognition and enzyme stability.',
    },
    {
      type: 'card',
      title: 'Sequon Recognition \u2014 NxS/T but Not NP',
      color: 'blue',
      content:
        'The OST recognises the consensus sequon Asn-X-Ser/Thr (NxS/T), where X can be any amino acid except proline. The X\u2260P restriction exists because proline at the +1 position forces a cis-peptide bond conformation that distorts the sequon geometry, preventing productive binding to the OST active site. NxT sequons are glycosylated approximately 2\u20133-fold more efficiently than NxS sequons, because the additional methyl group of threonine makes more favourable hydrophobic contacts with the OST. However, not all sequons are glycosylated: occupancy depends on the local structural context (accessibility of the sequon in the folding nascent chain), proximity to disulfide bonds, and competition between co-translational folding and OST access. For IgG1, the single N-glycosylation site at Asn297 uses the sequon Asn297-Ser298-Thr299 (NST), which is efficiently glycosylated (>99% occupancy under normal conditions). Macroheterogeneity (presence of unoccupied sites) is rarely an issue for IgG Asn297 but can occur under ER stress conditions.',
    },
    {
      type: 'card',
      title: 'Glucose Trimming \u2014 Glucosidase I and II',
      color: 'teal',
      content:
        'Immediately after en bloc transfer, the three glucose residues are sequentially removed by two ER-resident \u03b1-glucosidases. Glucosidase I (MOGS gene) removes the outermost \u03b11,2-linked glucose (Glc\u2083 \u2192 Glc\u2082Man\u2089GlcNAc\u2082). Glucosidase I is a type II membrane protein with a single active site specific for the terminal \u03b11,2-Glc\u2013\u03b11,3-Glc linkage. Glucosidase II (a heterodimer of GANAB/\u03b1-subunit and PRKCSH/\u03b2-subunit genes) then removes the two remaining \u03b11,3-linked glucose residues in two sequential reactions: first Glc\u2082 \u2192 Glc\u2081Man\u2089GlcNAc\u2082 (rapid), then Glc\u2081 \u2192 Man\u2089GlcNAc\u2082 (slower). The mono-glucosylated intermediate (Glc\u2081Man\u2089GlcNAc\u2082) is the critical entry point to the calnexin/calreticulin quality control cycle. The timing of glucosidase II\u2019s second cleavage relative to calnexin binding determines how long the glycoprotein spends in the QC cycle.',
    },
    {
      type: 'card',
      title: 'Calnexin/Calreticulin Quality Control Cycle',
      color: 'green',
      content:
        'The ER quality control system uses the glycan as a folding status tag. After glucosidase I removes the first glucose, glucosidase II removes the second glucose to generate the mono-glucosylated glycoprotein (Glc\u2081Man\u2089GlcNAc\u2082). This specific mono-glucosylated structure is recognised by the lectin chaperones calnexin (CANX gene, a type I ER membrane protein) and calreticulin (CALR gene, a soluble ER luminal protein). Both lectins bind the Glc\u2081Man\u2089GlcNAc\u2082 glycan through their lectin domains, retaining the glycoprotein in the ER and facilitating interaction with the oxidoreductase ERp57 (PDIA3 gene) for disulfide bond formation. Calnexin is generally associated with membrane-proximal glycosylation sites, while calreticulin handles soluble or more luminally oriented glycoproteins. For IgG heavy chain, both chaperones participate. After productive folding, glucosidase II removes the final glucose, releasing the glycoprotein from the lectin. If the protein has folded correctly, it exits the ER via COPII vesicles. If it remains misfolded, the UGGT sensor intervenes.',
    },
    {
      type: 'card',
      title: 'UGGT \u2014 The Folding Sensor',
      color: 'purple',
      content:
        'UDP-glucose:glycoprotein glucosyltransferase (UGGT1 gene, with a paralog UGGT2) is the key folding sensor of the ER quality control system. UGGT has a remarkable dual function: it contains both a glucosyltransferase catalytic domain and an extensive N-terminal domain that functions as a misfolded protein sensor. After glucosidase II removes the final glucose (producing Man\u2089GlcNAc\u2082), UGGT "inspects" the glycoprotein. If the protein is correctly folded (compact, hydrophobic core buried), UGGT does not act, and the glycoprotein proceeds to ER exit. If the protein is misfolded (exposed hydrophobic patches, incomplete disulfide bonds), UGGT re-glucosylates the glycan back to Glc\u2081Man\u2089GlcNAc\u2082 using UDP-glucose as the donor. This re-glucosylation drives the glycoprotein back into the calnexin/calreticulin cycle for another round of chaperone-assisted folding. The cycle continues until the protein either folds correctly (exits) or is deemed terminally misfolded (routed to ERAD). UGGT\u2019s sensor domain recognises regions of the protein 15\u201340 \u00c5 from the glycan attachment site, giving it a broad sampling radius for detecting misfolded regions.',
    },
    {
      type: 'card',
      title: 'ERAD \u2014 Terminal Disposal of Misfolded Glycoproteins',
      color: 'red',
      content:
        'Glycoproteins that fail to fold after multiple calnexin/calreticulin cycles are targeted for ER-associated degradation (ERAD). The commitment step to ERAD involves extensive mannose trimming. ER mannosidase I (MAN1B1 gene, also called ERManI) slowly trims Man\u2089 \u2192 Man\u2088, initiating a mannose timer. EDEM proteins (EDEM1, EDEM2, EDEM3 genes \u2014 ER degradation-enhancing \u03b1-mannosidase-like proteins) further trim the glycan to Man\u2085\u2013Man\u2086, generating a degradation signal. EDEM proteins also function as lectins/receptors that recognise the trimmed glycan and escort the misfolded glycoprotein to the retrotranslocation channel. The misfolded protein is then retrotranslocated through the Sec61/Hrd1 (SYVN1 gene) channel back to the cytoplasm, where it is ubiquitinated by the Hrd1 E3 ligase complex and degraded by the 26S proteasome. For antibody manufacturing, ERAD is a competing pathway that reduces productivity: misfolded heavy chains or improperly assembled H-L pairs are degraded before secretion. Optimising folding (chaperone co-expression, lower temperature) reduces ERAD-mediated loss.',
    },
    {
      type: 'code',
      title: 'ER Pathway Summary \u2014 From Dolichol to ER Exit',
      language: 'text',
      code: [
        'CYTOPLASMIC FACE                    LUMINAL FACE',
        '\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550',
        '',
        'Dol-P                               Glc3Man9GlcNAc2-PP-Dol',
        '  \u2502 ALG7/DPAGT1 (UDP-GlcNAc)            \u2502',
        'GlcNAc1-PP-Dol                        \u2502 OST (STT3A/B)',
        '  \u2502 ALG13/ALG14 (UDP-GlcNAc)            \u2502',
        'GlcNAc2-PP-Dol                      Glc3Man9GlcNAc2-Asn (nascent chain)',
        '  \u2502 ALG1 (GDP-Man)                       \u2502',
        'Man1GlcNAc2-PP-Dol                    \u2502 Glucosidase I (MOGS)',
        '  \u2502 ALG2 (GDP-Man)                       \u2502',
        'Man3GlcNAc2-PP-Dol                  Glc1Man9GlcNAc2-Asn',
        '  \u2502 ALG11 (GDP-Man)                      \u2502',
        'Man5GlcNAc2-PP-Dol                    \u2502 Calnexin/Calreticulin binding',
        '  \u2502                                      \u2502',
        '  \u2502 RFT1 (flippase)                      \u2502 Glucosidase II (GANAB)',
        '  \u2502                                      \u2502',
        'Man5GlcNAc2-PP-Dol (luminal)        Man9GlcNAc2-Asn',
        '  \u2502 ALG3/ALG9/ALG12 (Dol-P-Man)          \u2502',
        'Man9GlcNAc2-PP-Dol                    \u251c\u2500\u2500\u2500 Folded? \u2192 ER exit (COPII)',
        '  \u2502 ALG6/ALG8/ALG10 (Dol-P-Glc)          \u2502',
        'Glc3Man9GlcNAc2-PP-Dol               \u251c\u2500\u2500\u2500 Misfolded? \u2192 UGGT re-glucosylates',
        '                                      \u2502         \u2192 back to calnexin cycle',
        '                                      \u2502',
        '                                      \u2514\u2500\u2500\u2500 Terminal? \u2192 ManI/EDEM trimming',
        '                                                \u2192 ERAD \u2192 proteasome',
      ].join('\n'),
    },
    {
      type: 'callout',
      title: 'Tunicamycin \u2014 The ALG7 Inhibitor',
      variant: 'danger',
      content:
        'Tunicamycin is a nucleoside antibiotic that competitively inhibits ALG7 (DPAGT1), the first enzyme of the dolichol pathway, blocking GlcNAc-1-P transfer to Dol-P. Treatment with tunicamycin results in complete aglycosylation of all N-linked glycoproteins. In research settings, tunicamycin is used to produce aglycosylated antibodies for studying the impact of glycan removal on Fc functions, structure, and stability. However, tunicamycin is also highly toxic to cells (it blocks glycosylation of ALL glycoproteins, not just the product) and induces the unfolded protein response (UPR) due to accumulation of misfolded, non-glycosylated proteins in the ER. It is therefore strictly a research tool and never used in manufacturing. Kifunensine (\u03b1-mannosidase I inhibitor) and swainsonine (\u03b1-mannosidase II inhibitor) are alternative glycosylation modulators that block downstream processing rather than initial glycan attachment.',
    },
    {
      type: 'bullets',
      title: 'CMC Relevance of ER Biosynthesis',
      color: 'green',
      items: [
        'Macroheterogeneity (unoccupied Asn297) is rare for IgG but can increase under ER stress conditions (glucose starvation, tunicamycin contamination, high-level expression overwhelming OST capacity). Non-glycosylated heavy chain species are detectable by LC-MS intact mass analysis (mass shift of ~1.4 kDa per missing glycan).',
        'Cell line selection impacts ER capacity: high-producing clones (>5 g/L) may overwhelm the ER folding and glycosylation machinery, leading to increased misfolded/aggregated product, higher ERAD-mediated loss, and altered glycan occupancy.',
        'Temperature reduction during production phase (37\u00b0C \u2192 32\u201333\u00b0C) slows translation, giving STT3A more time for co-translational glycosylation and calnexin/calreticulin more time for quality control, often improving product quality.',
        'The unfolded protein response (UPR) activation during high-expression cell culture upregulates ER chaperones (BiP/GRP78/HSPA5, calnexin, calreticulin) and ERAD components, which can alter secretion rates and glycan profiles.',
        'ER mannosidase I (MAN1B1) activity determines how quickly high-mannose intermediates are trimmed. In high-expression systems, bottlenecks in ER-to-Golgi trafficking can trap glycoproteins in the ER, resulting in ER mannosidase over-trimming and increased Man5 species.',
        'Media components (e.g., manganese, zinc) that affect ER-resident metalloenzymes can indirectly alter the efficiency of glycan processing. Zinc is required for certain ER chaperone functions, while manganese affects downstream Golgi processing.',
      ],
    },
  ],
  mentorQuestions: [
    'If your CHO cell line is producing antibody with 98% glycan site occupancy at Asn297 but you want to ensure >99.5%, what process or cell engineering strategies would you consider?',
    'Explain why the dolichol pathway assembles the precursor as Glc\u2083Man\u2089GlcNAc\u2082 rather than transferring a smaller glycan. What would happen to protein folding quality if only Man\u2085GlcNAc\u2082 were transferred?',
    'A mass spectrometry analysis of your mAb shows a minor species at -1421 Da from the expected intact mass. What is the most likely explanation, and what additional data would you request?',
  ],
};
