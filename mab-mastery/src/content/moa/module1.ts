import type { ModuleContent } from '../../types/content';

export const module1: ModuleContent = {
  id: 'moa-m1',
  sectionId: 'moa',
  moduleNumber: 1,
  eyebrow: 'MOA 02',
  title: 'ADCC — Antibody-Dependent Cellular Cytotoxicity',
  lead: 'The complete ADCC cascade from target opsonisation to tumour cell apoptosis — every molecular step at the residue level.',
  tags: [
    { label: 'ADCC', color: 'red' },
    { label: 'FcgammaRIIIa', color: 'amber' },
    { label: 'Glycosylation CQA', color: 'teal' },
    { label: 'NK Cells', color: 'green' },
  ],
  stats: [
    { label: 'Key Receptor', value: 'FcgammaRIIIa (CD16a)' },
    { label: 'Effector Cell', value: 'NK Cell' },
    { label: 'Critical Residue', value: 'N297 Glycan' },
    { label: 'Enhancement', value: 'Afucosylation ~50x' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Step 1 — Target Cell Opsonisation',
      color: 'blue',
      content:
        'ADCC begins when a therapeutic IgG antibody binds to its target antigen on the surface of a tumour cell (or other target cell) via Fab-mediated recognition. This "opsonisation" coats the target cell surface with antibody molecules, presenting their Fc regions outward in a clustered array. The density of Fc presentation is critical: sparse antigen expression may not provide sufficient Fc clustering to engage effector cells effectively. Target antigen density is therefore a key determinant of ADCC susceptibility — typically >10,000 molecules per cell are required for robust ADCC. High-affinity Fab binding (slow koff) ensures that the antibody remains stably associated with the target long enough for effector cell engagement. The orientation of the Fc is determined by the hinge flexibility and the geometry of the Fab-antigen interaction, which influences accessibility of the lower hinge loop (L234-G236) and CH2 domain face to the approaching effector cell.',
    },
    {
      type: 'card',
      title: 'Step 2 — NK Cell FcgammaRIIIa Engagement',
      color: 'teal',
      content:
        'Natural killer (NK) cells are the primary effector cells for ADCC. They constitutively express FcgammaRIIIa (CD16a), a low-affinity activating Fc receptor that binds the CH2 domain of IgG1 and IgG3. The FcgammaRIIIa binding interface on IgG1 Fc involves the lower hinge residues (L234, L235, G236), the CH2 loop residues (D265, N297-linked glycan, A330, I332), and contributions from P238 and S239. The N297-linked glycan is NOT merely structural — it directly contacts FcgammaRIIIa. Specifically, the core fucose on the N297 glycan sterically clashes with a glycan on FcgammaRIIIa (Asn162), reducing binding affinity by approximately 50-fold. This is why afucosylated antibodies are dramatically more potent ADCC mediators. The V158F polymorphism in FcgammaRIIIa creates two allotypes: V158 (higher affinity for IgG1 Fc, ~lower KD) and F158 (lower affinity). Approximately 10-15% of individuals are V/V homozygous, 35-50% V/F heterozygous, and 35-50% F/F homozygous. Clinical response to ADCC-dependent mAbs (rituximab, trastuzumab) correlates with V158F genotype.',
    },
    {
      type: 'card',
      title: 'Step 3 — FcgammaRIIIa Crosslinking and Microcluster Formation',
      color: 'green',
      content:
        'Productive ADCC signalling requires multimerisation of FcgammaRIIIa at the NK cell surface, driven by engagement of multiple clustered Fc regions on the opsonised target cell. Individual FcgammaRIIIa-Fc interactions are low affinity (KD ~1 microM for IgG1); avidity from multiple simultaneous interactions at the immunological synapse increases the effective binding by orders of magnitude. FcgammaRIIIa crosslinking triggers receptor microclustering in the NK cell membrane, concentrating the signalling machinery at the contact interface. This is analogous to TCR microcluster formation in T cell activation. The minimum number of crosslinked receptors required for NK cell activation is estimated at 3-6, corresponding to engagement of 3-6 Fc regions in a membrane microdomain.',
    },
    {
      type: 'card',
      title: 'Step 4 — ITAM Phosphorylation and Proximal Signalling',
      color: 'amber',
      content:
        'FcgammaRIIIa lacks intrinsic signalling capacity; it signals through associated adaptor chains bearing immunoreceptor tyrosine-based activation motifs (ITAMs). On NK cells, CD16a associates with either CD3zeta or FcepsilonRI-gamma chains, each containing ITAMs. Upon receptor crosslinking, Src family kinases (primarily Lck, also Fyn) phosphorylate the tyrosine residues within the ITAM sequences (consensus YxxL/I-x6-8-YxxL/I). These doubly phosphorylated ITAMs serve as docking sites for the tandem SH2 domains of Syk family kinases (ZAP-70 and Syk). The stoichiometry of ITAM phosphorylation — how many ITAMs are phosphorylated per receptor complex — correlates with the magnitude of downstream signalling and ultimately the cytotoxic response.',
    },
    {
      type: 'card',
      title: 'Step 5 — Downstream Signalling Cascade',
      color: 'purple',
      content:
        'Recruited ZAP-70/Syk kinases phosphorylate multiple downstream substrates, initiating parallel signalling cascades. (1) PLCgamma2 activation: Syk phosphorylates PLCgamma2, which hydrolyses PIP2 into IP3 and DAG. IP3 triggers Ca2+ release from the endoplasmic reticulum, causing a rapid cytosolic calcium flux. DAG activates protein kinase C (PKC). (2) PI3K pathway: PI3K activation generates PIP3, recruiting PH-domain-containing effectors (Akt, Vav1). Vav1 is a guanine nucleotide exchange factor (GEF) for Rac1/Cdc42, driving actin cytoskeleton reorganisation essential for immunological synapse formation. (3) MAPK pathway: ERK1/2 activation via Ras-Raf-MEK provides transcriptional activation signals. The calcium flux is the most critical immediate signal — it drives both degranulation (exocytosis of cytotoxic granules) and transcription of cytokine genes (IFN-gamma, TNF-alpha) via NFAT nuclear translocation.',
    },
    {
      type: 'card',
      title: 'Step 6 — Granule Polarisation and Degranulation',
      color: 'red',
      content:
        'NK cells store pre-formed cytotoxic granules (also called lytic granules or secretory lysosomes) containing perforin and granzymes. Upon activation, these granules undergo directed transport along microtubules toward the immunological synapse — a process called "polarised degranulation." The microtubule-organising centre (MTOC) reorients toward the target cell contact site, and granules move along polarised microtubule tracks via dynein motors. At the synapse, granules dock at the plasma membrane, and SNARE-mediated fusion releases their contents into the synaptic cleft. This directed release ensures that cytotoxic mediators are delivered specifically to the target cell while sparing bystander cells. The actin cytoskeleton at the synapse first clears to create a "degranulation zone" (requiring Vav1/Rac1 signalling), then reforms to seal the synapse. Degranulation is detected experimentally by surface expression of CD107a (LAMP-1), a granule membrane protein that appears on the NK cell surface after granule fusion.',
    },
    {
      type: 'card',
      title: 'Step 7 — Perforin Pore Formation',
      color: 'blue',
      content:
        'Perforin is a 67 kDa calcium-dependent pore-forming protein homologous to complement component C9. Released into the synaptic cleft, perforin monomers bind to the target cell membrane in a calcium-dependent manner and oligomerise to form transmembrane pores of ~16 nm internal diameter (composed of 20-24 perforin monomers). These pores are distinct from the complement membrane attack complex (MAC) but share the MACPF (membrane attack complex/perforin) domain fold. Perforin pore formation is essential for ADCC killing — perforin-deficient NK cells cannot kill targets. The pores serve as conduits for granzyme entry but also create osmotic stress on the target cell. Perforin activity is tightly regulated: it is stored in an inactive form in acidic granules (pH 5.5), activated upon release into the neutral pH synaptic cleft, and inhibited by calreticulin on the NK cell surface to prevent self-damage.',
    },
    {
      type: 'card',
      title: 'Steps 8-9 — Granzyme Entry and Apoptosis Induction',
      color: 'green',
      content:
        'Granzyme B (GrB) is a serine protease that enters the target cell through perforin pores and directly activates the apoptotic machinery. GrB cleaves and activates caspase-3 (executioner caspase) and caspase-8 (initiator caspase) directly. GrB also cleaves Bid, generating truncated Bid (tBid), which translocates to mitochondria and activates Bax/Bak, triggering mitochondrial outer membrane permeabilisation (MOMP), cytochrome c release, and activation of the intrinsic apoptotic pathway (apoptosome formation, caspase-9 activation). This dual activation of both extrinsic (caspase-8) and intrinsic (mitochondrial) pathways ensures efficient target cell killing. Additional granzymes (A, H, K, M) provide redundant killing mechanisms. The target cell undergoes classic apoptotic morphology: membrane blebbing, DNA fragmentation, phosphatidylserine externalisation, and ultimately phagocytic clearance. The entire ADCC killing process — from NK cell contact to target cell apoptosis — takes approximately 20-60 minutes.',
    },
    {
      type: 'table',
      title: 'Critical EU Residues in the ADCC Pathway',
      headers: ['EU Position', 'Residue (IgG1)', 'Role in ADCC', 'Engineering Mutation', 'Effect on ADCC'],
      rows: [
        ['L234', 'Leu', 'Lower hinge — primary FcgammaR contact', 'L234A (LALA)', 'Abolishes ADCC'],
        ['L235', 'Leu', 'Lower hinge — primary FcgammaR contact', 'L235A (LALA)', 'Abolishes ADCC'],
        ['G236', 'Gly', 'FcgammaRIIIa contact loop', 'G236A (GASDALIE)', 'Enhances ADCC ~40x'],
        ['S239', 'Ser', 'CH2 FcgammaR interface', 'S239D (DE)', 'Enhances ADCC ~5-10x'],
        ['D265', 'Asp', 'Glycan-receptor interface', 'D265A', 'Abolishes all FcgammaR binding'],
        ['N297', 'Asn', 'N-glycosylation site', 'N297A/Q', 'Aglycosylation — abolishes ADCC'],
        ['A330', 'Ala', 'CH2 FcgammaR loop', 'A330L (GASDALIE)', 'Enhances ADCC synergistically'],
        ['I332', 'Ile', 'CH2 FcgammaR interface', 'I332E (DE, GASDALIE)', 'Enhances ADCC ~5-10x'],
        ['P329', 'Pro', 'Proline sandwich with C1q', 'P329G (PG)', 'Reduces C1q; minor ADCC effect'],
        ['Core fucose', 'Fuc-alpha-1,6', 'Steric clash with FcgammaRIIIa Asn162 glycan', 'Afucosylation', 'Enhances ADCC ~50x'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Glycosylation and ADCC — The Afucosylation Story',
      color: 'amber',
      content:
        'The single most impactful CQA for ADCC-dependent antibodies is core fucosylation at N297. Removal of the core alpha-1,6-fucose from the N297 glycan enhances FcgammaRIIIa binding affinity by approximately 50-fold and ADCC activity by a corresponding magnitude. The structural basis: core fucose on the Fc N297 glycan sterically clashes with the N-glycan at Asn162 on FcgammaRIIIa. Without this clash, the Fc glycan makes additional carbohydrate-carbohydrate contacts with the receptor glycan, stabilising the complex. Afucosylated antibodies in clinical use include obinutuzumab (Gazyva, glycoengineered anti-CD20, produced in GlycoMAb-engineered CHO cells with FUT8 knockout) and mogamulizumab (Poteligeo, anti-CCR4, produced in FUT8-knockout CHO by Kyowa Kirin POTELLIGENT technology). Manufacturing approaches to control fucosylation include: (1) FUT8 gene knockout in CHO cells, (2) addition of fucose analogues (e.g., 2-fluorofucose) as biosynthetic inhibitors during cell culture, (3) use of non-CHO host cells with different glycosylation pathways (e.g., YB2/0 rat myeloma cells naturally produce low-fucose antibodies).',
    },
    {
      type: 'table',
      title: 'FcgammaRIIIa V158F Polymorphism — Clinical Impact',
      headers: ['Parameter', 'V158 (High Affinity)', 'F158 (Low Affinity)'],
      rows: [
        ['Frequency (Caucasian)', '~10-15% V/V homozygous', '~35-50% F/F homozygous'],
        ['KD for IgG1 Fc', '~0.2-0.5 microM', '~1-2 microM'],
        ['ADCC with WT IgG1', 'Robust', 'Reduced (~30-50%)'],
        ['ADCC with afucosylated IgG1', 'Very strong', 'Restored to WT V158 levels'],
        ['Clinical example (rituximab)', 'Higher ORR in NHL', 'Lower ORR in NHL'],
        ['Biosimilar implication', 'Sensitive to fucosylation changes', 'Less discriminating'],
      ],
      sortable: true,
    },
    {
      type: 'bullets',
      title: 'In Vitro ADCC Assay Platforms',
      items: [
        'Primary NK cell ADCC assay (gold standard): Fresh or cryopreserved peripheral blood NK cells as effectors, tumour cell line as targets, chromium-51 release or LDH release readout. Reports % specific lysis at varying E:T ratios. High biological relevance but high variability (CV 20-40%) due to donor NK cell quality and FcgammaRIIIa genotype.',
        'ADCC reporter bioassay (Promega): Jurkat T cells stably expressing FcgammaRIIIa (V158 allele) and an NFAT-response element driving firefly luciferase. Upon engagement with Fc on opsonised target cells, NFAT activation drives luciferase expression. Readout: luminescence. Advantages: defined effector cell genotype (V158), no killing involved (reporter only), higher precision (CV 10-20%), suitable for lot release. Limitation: reports receptor engagement/signalling, not actual cell killing.',
        'KILR assay (DiscoverX): Target cells express a reporter that is released upon killing. Measures actual cytotoxicity rather than signalling. Intermediate between primary NK and reporter assays.',
        'Flow cytometry-based ADCC: Target cell death detected by viability dye (7-AAD, PI) or Annexin V. NK cell degranulation detected by CD107a surface expression. Allows simultaneous measurement of killing and effector activation.',
        'Specification setting: ADCC potency for lot release is expressed as relative potency (%) vs reference standard. Typical specification: 50-200% (wider than binding assays due to inherent variability of cell-based assays). Tighter specifications require larger datasets to establish control chart limits.',
      ],
    },
    {
      type: 'callout',
      title: 'CMC Criticality — ADCC as a CQA',
      variant: 'warning',
      content:
        'For ADCC-dependent antibodies (rituximab, trastuzumab, obinutuzumab, mogamulizumab), ADCC activity is classified as a critical quality attribute (CQA) with HIGH impact. This classification means: (1) ADCC potency is a lot-release specification, (2) glycosylation profile (especially fucosylation level) has a defined specification, (3) any manufacturing process change requires ADCC comparability assessment, (4) the ADCC assay must be qualified/validated to ICH Q2(R1) with demonstrated fitness for purpose, and (5) the reference standard must be qualified for ADCC potency. For biosimilar development, ADCC similarity is a Tier 1 analytical attribute requiring equivalence testing with predefined margins. Failure to demonstrate ADCC similarity may trigger additional clinical pharmacology or efficacy studies.',
    },
    {
      type: 'card',
      title: 'NK Cell Exhaustion and Serial Killing',
      color: 'purple',
      content:
        'Individual NK cells can kill multiple target cells sequentially ("serial killing"), with a single NK cell capable of eliminating 4-10 targets over 6-12 hours. However, repeated ADCC cycles progressively deplete granule contents and downregulate FcgammaRIIIa (CD16a) from the NK cell surface through ADAM17-mediated proteolytic shedding ("CD16 shedding"). This creates a state of NK cell exhaustion that limits ADCC efficacy, particularly in the context of high tumour burden or prolonged antibody therapy. Strategies to overcome NK cell exhaustion include: (1) combination with IL-2 or IL-15 cytokines to promote NK cell proliferation and granule replenishment, (2) anti-CD16a antibodies engineered to resist ADAM17 cleavage (S197P mutation in CD16a), and (3) therapeutic timing to allow NK cell recovery between dosing cycles. From a CMC perspective, NK cell exhaustion is relevant to potency assay design: the E:T ratio and incubation time must be optimised to capture ADCC activity within the dynamic range before effector exhaustion confounds the readout.',
    },
  ],
  mentorQuestions: [
    'If a process change increased the afucosylated glycoform fraction from 5% to 15% for a mAb where ADCC is the primary mechanism, would you consider this a process improvement or a comparability concern, and what data would you need to support your position?',
    'Why does the ADCC reporter bioassay (Jurkat/NFAT-luciferase) use the V158 allele of FcgammaRIIIa, and how would using the F158 allele change the assay sensitivity and clinical relevance?',
    'How would you design a head-to-head study comparing ADCC potency of an originator and biosimilar if the originator has batch-to-batch variability in fucosylation from 85% to 95%?',
  ],
};
