import type { ModuleContent } from '../../types/content';

export const module2: ModuleContent = {
  id: 'engineering-m2',
  sectionId: 'engineering',
  moduleNumber: 2,
  eyebrow: 'ENGINEERING 03',
  title: 'GASDALIE Mutations (G236A/S239D/A330L/I332E)',
  lead: 'GASDALIE is the most potent Fc-enhancing mutation set described to date, achieving approximately 100-fold enhancement of FcgammaRIIIa binding and 40-fold ADCC enhancement through four synergistic point mutations that optimise distinct contact surfaces in the Fc:FcgammaRIIIa interface.',
  tags: [
    { label: 'Fc Enhancement', color: 'green' },
    { label: 'ADCC Boost', color: 'blue' },
    { label: 'FcgammaRIIIa', color: 'amber' },
    { label: 'Crystal Structure', color: 'purple' },
  ],
  stats: [
    { label: 'Mutations', value: 'G236A/S239D/A330L/I332E' },
    { label: 'FcgammaRIIIa Enhancement', value: '~100x' },
    { label: 'ADCC Enhancement', value: '~40x' },
    { label: 'Source', value: 'Lazar et al. (PNAS 2006)' },
  ],
  sections: [
    {
      type: 'card',
      title: '1. Overview: Rational Design of GASDALIE',
      color: 'blue',
      content:
        'The GASDALIE mutations were identified through a combination of computational structure-based design and directed evolution screening by Gregory Lazar and colleagues at Xencor (Lazar et al., PNAS 103:4005, 2006). The design process started from the crystal structure of the IgG1 Fc:FcgammaRIIIa complex (PDB: 1E4K) and used computational alanine scanning to identify energetically important contact residues. Subsequent rounds of combinatorial library screening identified four mutations — G236A, S239D, A330L, and I332E — that each contribute distinct binding enhancements and act synergistically when combined. The quadruple mutant achieves approximately 100-fold enhancement of FcgammaRIIIa binding affinity and approximately 40-fold enhancement of ADCC potency in cell-based assays. Critically, GASDALIE also enhances FcgammaRIIa binding (relevant for ADCP) while having a more modest effect on C1q/CDC. The name GASDALIE is derived from the single-letter amino acid codes of the substitutions: Gly236Ala, Ser239Asp, Ala330Leu, Ile332Glu.',
    },
    {
      type: 'card',
      title: '2. G236A — Van der Waals Enhancement to FcgammaRIIIa',
      color: 'teal',
      content:
        'G236 (EU numbering) is located at the junction of the lower hinge and the CH2 domain N-terminus. In wild-type IgG1, glycine at this position provides backbone flexibility but offers no side-chain contacts to FcgammaRIIIa. Mutation to alanine introduces a methyl group that creates new van der Waals contacts with hydrophobic residues in the FcgammaRIIIa D2 domain. The alanine side chain packs against a hydrophobic microenvironment at the base of the receptor binding groove. Individually, G236A contributes approximately 3-5-fold enhancement of FcgammaRIIIa binding. G236A also modestly enhances FcgammaRIIa binding, which contributes to the enhanced ADCP activity observed with GASDALIE. Importantly, G236A has a selectivity effect: it preferentially enhances the activating receptor FcgammaRIIa over the inhibitory receptor FcgammaRIIb, thereby increasing the activating-to-inhibitory (A/I) ratio on macrophages. This selectivity is structurally explained by subtle differences in the binding groove geometry between FcgammaRIIa and FcgammaRIIb at the position 131 polymorphic site.',
    },
    {
      type: 'card',
      title: '3. S239D — Salt Bridge to FcgammaRIIIa Lys158',
      color: 'green',
      content:
        'S239 (EU numbering) is located in the BC loop of the CH2 domain, within the lower face of the Fc:FcgammaRIIIa interface. In wild-type IgG1, S239 makes a weak hydrogen bond to FcgammaRIIIa via its hydroxyl group. Mutation to aspartate (S239D) introduces a negatively charged carboxylate group that forms a strong electrostatic salt bridge with Lys158 (or Lys161 in some numbering systems) on the FcgammaRIIIa D2 domain surface. This salt bridge contributes approximately 2-3 kcal/mol of binding free energy — equivalent to roughly 10-fold affinity enhancement on its own. The S239D mutation is the single most impactful of the four GASDALIE substitutions for FcgammaRIIIa binding. The Lys158 partner residue on FcgammaRIIIa is adjacent to the V158/F158 polymorphic site, which explains why S239D partially compensates for the F158 allele, narrowing the affinity gap between V/V and F/F genotypes. S239D is also a component of the DE (S239D/I332E) subset, which is independently used in clinical molecules such as margetuximab.',
    },
    {
      type: 'card',
      title: '4. A330L — Hydrophobic Packing in the CH2 Core',
      color: 'purple',
      content:
        'A330 (EU numbering) resides in the CH2 domain, proximal to the C1q binding region and the lower portion of the FcgammaR interface. In wild-type IgG1, the alanine methyl group makes minimal contacts. Mutation to leucine (A330L) introduces a larger hydrophobic isobutyl side chain that packs against an adjacent hydrophobic cluster in the CH2 domain, stabilising the local conformation and creating a more rigid, pre-organised binding surface for FcgammaRIIIa. The A330L contribution is primarily structural — it locks the CH2 domain into a conformation that is more complementary to the FcgammaRIIIa binding groove. A330L individually contributes approximately 2-3-fold FcgammaRIIIa enhancement. Notably, A330L also affects C1q binding: it is near the P329/P331 C1q contact region. In isolation, A330L modestly enhances C1q binding and CDC, but in the GASDALIE context, the net effect on CDC is dominated by the other mutations. The A330L mutation also has implications for thermal stability: the increased hydrophobic packing slightly increases the CH2 Tm by 0.5-1 degree Celsius in some constructs.',
    },
    {
      type: 'card',
      title: '5. I332E — Hydrogen Bond to FcgammaRIIIa Tyr157',
      color: 'amber',
      content:
        'I332 (EU numbering) is in the CH2 domain, adjacent to A330 and S239, forming a cluster of residues that collectively shape the lower FcgammaR contact surface. In wild-type IgG1, isoleucine at position 332 provides hydrophobic contacts to FcgammaRIIIa. Mutation to glutamate (I332E) introduces a negatively charged side chain that forms a hydrogen bond with the hydroxyl group of Tyr157 on FcgammaRIIIa. This hydrogen bond is shorter and stronger than the hydrophobic van der Waals interaction it replaces, contributing approximately 1.5-2 kcal/mol of binding free energy (roughly 5-10-fold affinity enhancement). I332E also enhances FcgammaRIIa binding, contributing to ADCP enhancement. Like S239D, I332E is a component of the DE combination (S239D/I332E). The I332E mutation has an additional benefit: the glutamate carboxylate contributes to the increased selectivity for activating FcgammaRs (FcgammaRIIa, FcgammaRIIIa) over inhibitory FcgammaRIIb, as the corresponding contact residue on FcgammaRIIb has a different local electrostatic environment.',
    },
    {
      type: 'table',
      title: '6. Individual vs Combined Mutation Effects',
      headers: ['Mutation(s)', 'FcgammaRIIIa-V158 Fold Change', 'FcgammaRIIIa-F158 Fold Change', 'ADCC EC50 Fold Change', 'ADCP Fold Change', 'CDC Fold Change'],
      rows: [
        ['WT IgG1 (reference)', '1.0x', '1.0x', '1.0x', '1.0x', '1.0x'],
        ['G236A', '~3-5x', '~3-5x', '~3x', '~3x', '~1.5x'],
        ['S239D', '~10x', '~15x', '~8x', '~5x', '~1.2x'],
        ['A330L', '~2-3x', '~2-3x', '~2x', '~1.5x', '~2x'],
        ['I332E', '~5-10x', '~8-12x', '~5x', '~3x', '~1x'],
        ['S239D/I332E (DE)', '~30-50x', '~50-70x', '~15-20x', '~10x', '~1.5x'],
        ['G236A/S239D/A330L/I332E (GASDALIE)', '~80-120x', '~100-150x', '~30-50x', '~15-20x', '~2-3x'],
      ],
      sortable: true,
    },
    {
      type: 'code',
      title: '7. Crystal Structure Contacts — Fc:FcgammaRIIIa Interface',
      language: 'text',
      code:
`GASDALIE Fc : FcgammaRIIIa Contact Map (EU numbering)

Fc Residue    Mutation     Contact Partner(s) on FcgammaRIIIa    Interaction Type
-----------   ----------   -----------------------------------   ----------------
G236 -> A236  G236A        Hydrophobic groove (D2 domain)        Van der Waals
S239 -> D239  S239D        Lys158 / Lys161                       Salt bridge (electrostatic)
A330 -> L330  A330L        CH2 core (intramolecular packing)     Hydrophobic; conformational
I332 -> E332  I332E        Tyr157                                H-bond (side chain OH)

Key distances (from PDB 3SGK / modelled):
  D239 carboxylate — Lys158 amino:  ~2.8 A (salt bridge)
  E332 carboxylate — Tyr157 OH:     ~2.6 A (H-bond)
  L330 isobutyl — CH2 Phe243:       ~3.8 A (VdW packing)
  A236 methyl — FcgammaRIIIa Leu:   ~4.0 A (VdW contact)

Total buried surface area increase:  ~350 sq A over WT`,
    },
    {
      type: 'table',
      title: '8. GASDALIE vs Competing Fc Enhancement Technologies',
      headers: ['Technology', 'Mutations', 'FcgammaRIIIa Enhancement', 'ADCC Enhancement', 'CDC Effect', 'Developer'],
      rows: [
        ['GASDALIE', 'G236A/S239D/A330L/I332E', '~100x', '~40x', 'Modest increase', 'Xencor'],
        ['DE', 'S239D/I332E', '~40x', '~15x', 'Minimal change', 'Xencor'],
        ['Afucosylation', 'FUT8 KO / GnTIII OE', '~50x', '~30-50x', 'No change', 'Various (Kyowa, Roche)'],
        ['Margetuximab Fc', 'F243L/R292P/Y300L/V305I/P396L', '~10x', '~5-10x', 'Reduced', 'MacroGenics (MGAH22)'],
        ['DLE (S239D/A330L/I332E)', 'S239D/A330L/I332E', '~60x', '~25x', 'Modest increase', 'Xencor'],
        ['Obinutuzumab glyco', 'GnTIII overexpression', '~50x', '~50x', 'Reduced', 'Roche/GlycoArt'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: '9. A/I Ratio Optimisation — The Selectivity Advantage',
      variant: 'success',
      content:
        'A critical advantage of GASDALIE over simple afucosylation is its impact on the activating-to-inhibitory (A/I) receptor ratio. Afucosylation selectively enhances FcgammaRIIIa binding (~50x) without significantly affecting FcgammaRIIa or FcgammaRIIb. GASDALIE, by contrast, enhances both FcgammaRIIIa (~100x) and FcgammaRIIa (~30x, via G236A primarily) while having a more modest effect on FcgammaRIIb (~5-10x). The net result is an increased A/I ratio on macrophages, which lowers the activation threshold for ADCP. This broader effector enhancement profile (ADCC + ADCP) may be advantageous in tumour microenvironments where macrophage-mediated phagocytosis is a significant component of the anti-tumour response. However, the enhanced FcgammaRIIb binding also means GASDALIE antibodies may experience more rapid internalisation on FcgammaRIIb-expressing cells, which can affect pharmacokinetics in certain disease contexts.',
    },
    {
      type: 'bullets',
      title: '10. CMC Analytical Considerations for GASDALIE Molecules',
      items: [
        'SPR binding panel must include all FcgammaR allotypes with quantitative KD reporting. Enhancement factors should be calculated relative to a wild-type IgG1 reference standard run in the same campaign.',
        'ADCC reporter bioassay (Jurkat-FcgammaRIIIa-V158 and F158 variants) with full dose-response curves to determine EC50 shift. Expect 30-50-fold left-shift in EC50 relative to wild-type.',
        'Primary NK cell ADCC assay using PBMCs from V/V, V/F, and F/F donors to demonstrate genotype-independent efficacy — a key value proposition of GASDALIE engineering.',
        'CDC assay to characterise the modest CDC enhancement (2-3-fold). Determine whether this is clinically relevant for the specific target antigen.',
        'Glycan profile must be tightly controlled: GASDALIE enhancement is additive with afucosylation. If afucose levels drift upward during manufacturing, the combined effect could exceed the desired potency range.',
        'Thermal stability assessment (DSC/DSF): confirm that the quadruple mutation does not significantly alter CH2 Tm. Expect minimal impact (<1 degree Celsius reduction).',
        'Charge variant analysis: S239D and I332E introduce negative charges; expect a slight acidic shift in the pI of the Fc region.',
        'Potency assay development: for lot-release, the ADCC reporter bioassay relative potency should use a GASDALIE reference standard (not a wild-type reference) to achieve acceptable assay precision.',
      ],
    },
    {
      type: 'callout',
      title: '11. Clinical Translation and Current Status',
      variant: 'warning',
      content:
        'Despite the impressive in vitro enhancement, the full GASDALIE quadruple mutant has not yet been incorporated into an approved product. The DE subset (S239D/I332E) has advanced further clinically, most notably in the context of anti-FcgammaRIIb antibodies and Fc-engineered molecules. The primary reason for slower clinical adoption of the full GASDALIE set relates to the balance between efficacy and safety: the ~100-fold enhancement of FcgammaR binding raises concerns about excessive immune activation, particularly cytokine release syndrome, infusion-related reactions, and off-target immune cell activation. Clinical programmes using GASDALIE-type mutations require careful dose-escalation strategies and cytokine monitoring. Additionally, the IP landscape (Xencor patents) has influenced adoption. Many sponsors have opted for afucosylation (which achieves comparable ADCC enhancement through a glycoengineering approach) or the DE subset (which provides a more moderate enhancement profile).',
    },
  ],
  mentorQuestions: [
    'Your oncology programme uses a GASDALIE-enhanced anti-tumour mAb. During Phase I dose escalation, you observe dose-limiting cytokine release at lower doses than predicted from pre-clinical models. How would you investigate whether the GASDALIE enhancement is contributing, and what dose modification strategy would you propose?',
    'Compare the CMC and manufacturing implications of achieving ADCC enhancement via GASDALIE mutations versus afucosylation. Consider cell line development, process control, lot-to-lot variability, and potency assay design.',
    'A regulatory reviewer questions why you chose the full GASDALIE quadruple mutant over the DE (S239D/I332E) subset for your molecule. Draft the scientific justification you would include in your BLA response.',
  ],
};
