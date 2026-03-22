import type { ModuleContent } from '../../types/content';

export const module13: ModuleContent = {
  id: 'glycosylation-m13',
  sectionId: 'glycosylation',
  moduleNumber: 13,
  eyebrow: 'GLYCOSYLATION 14',
  title: 'Analytical Methods',
  lead: 'The complete glycan analytical toolkit — from HILIC-UPLC-FLR released glycan profiling to site-specific glycopeptide LC-MS/MS and native MS for asymmetry detection.',
  tags: [
    { label: 'HILIC-FLR', color: 'teal' },
    { label: 'LC-MS/MS', color: 'blue' },
    { label: 'Native MS', color: 'purple' },
    { label: '2-AB Label', color: 'amber' },
  ],
  stats: [
    { label: 'Primary Method', value: 'HILIC-FLR' },
    { label: 'Column', value: 'BEH Glycan' },
    { label: 'Oxonium Ions', value: '204/292/366 Da' },
    { label: 'Label', value: '2-AB fluorescent' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Overview — The Glycan Analytical Hierarchy',
      color: 'blue',
      content:
        'Glycan characterisation of therapeutic mAbs requires a tiered analytical strategy, progressing from global profiling to site-specific structural determination. Tier 1 — Released glycan profiling (HILIC-UPLC-FLR): The workhorse method for routine quality control, providing relative quantification of all major glycoforms after PNGaseF release and fluorescent labelling. Tier 2 — Site-specific glycopeptide LC-MS/MS: Provides glycan identity at each glycosylation site, essential for multi-site glycoproteins or Fab-glycosylated mAbs. Tier 3 — Intact and subunit mass spectrometry: Rapid confirmation of glycoform distribution without digestion; detects post-translational modification combinations. Tier 4 — Native MS: Preserves non-covalent interactions, enabling detection of asymmetric glycosylation and heterodimeric glycoform pairing. Tier 5 — Specialised methods (CE-LIF, NMR, exoglycosidase sequencing): Used for specific structural questions such as sialic acid linkage, anomeric configuration, or trace glycan identification. Each tier serves a distinct purpose in the CMC lifecycle — from process development (all tiers) to lot release (Tier 1, sometimes Tier 3) to characterisation/comparability (all tiers).',
    },
    {
      type: 'card',
      title: 'HILIC-UPLC-FLR — Released Glycan Profiling',
      color: 'teal',
      content:
        'Hydrophilic interaction liquid chromatography (HILIC) with fluorescence detection (FLR) is the gold-standard platform method for released N-glycan profiling of therapeutic mAbs. The workflow consists of four steps: (1) PNGaseF digestion — peptide-N-glycosidase F (from Elizabethkingia meningoseptica) cleaves the bond between Asn and the innermost GlcNAc, releasing intact N-glycans. PNGaseF is highly specific for N-linked glycans and acts on all common biantennary complex-type, high-mannose, and hybrid structures. Digestion is typically performed overnight at 37°C after mAb denaturation (heat or SDS/DTT). Rapid PNGaseF protocols (e.g., PNGase F PRIME, InstantPC) reduce digestion to 5-30 minutes using engineered enzymes with enhanced activity. (2) Fluorescent labelling — released glycans are labelled at the reducing end with 2-aminobenzamide (2-AB) via reductive amination (NaCNBH₃ reduction of the Schiff base). Alternatively, RapiFluor-MS (RFMS, Waters) provides both fluorescence and enhanced MS ionisation through a rapid labelling protocol (~5 min). Procainamide labelling offers a compromise between 2-AB and RFMS with good fluorescence and MS sensitivity. (3) HILIC separation — the labelled glycans are separated on a Waters ACQUITY UPLC BEH Glycan column (1.7 µm, 130 angstrom pore, 2.1 × 150 mm) using a gradient of acetonitrile/ammonium formate. HILIC retains glycans based on hydrophilicity — more polar glycans (larger, more sialylated) elute later. Typical gradient: 75% → 55% ACN over 30-40 minutes at 0.4 mL/min, column temperature 45-60°C. (4) Fluorescence detection — excitation 330 nm / emission 420 nm for 2-AB; excitation 265 nm / emission 425 nm for RFMS.',
    },
    {
      type: 'table',
      title: 'HILIC Elution Order and GU Values for Common IgG Glycans',
      headers: ['Glycan', 'GU Value', 'Composition', 'HILIC Elution Order', 'Typical % (WT CHO IgG1)'],
      rows: [
        ['Man5', '5.4', 'Man₅GlcNAc₂', '1st (least retained)', '3-8%'],
        ['G0', '5.8', 'GlcNAc₄Man₃', '2nd', '1-3% (minor in CHO)'],
        ['G0F', '6.0', 'Fuc₁GlcNAc₄Man₃', '3rd', '30-50%'],
        ['G0F-GlcNAc', '5.5', 'Fuc₁GlcNAc₃Man₃', 'Before G0F', '1-3%'],
        ['G1F (α1,6 arm)', '6.6', 'Gal₁Fuc₁GlcNAc₄Man₃', '4th', '12-18%'],
        ['G1F (α1,3 arm)', '6.8', 'Gal₁Fuc₁GlcNAc₄Man₃', '5th (positional isomer)', '8-15%'],
        ['G2F', '7.3', 'Gal₂Fuc₁GlcNAc₄Man₃', '6th', '5-15%'],
        ['G2FS1 (α2,6)', '8.5', 'Neu5Ac₁Gal₂Fuc₁GlcNAc₄Man₃', '7th', '1-5%'],
        ['G2FS1 (α2,3)', '8.7', 'Neu5Ac₁Gal₂Fuc₁GlcNAc₄Man₃', '8th (linkage isomer)', '0.5-2%'],
        ['G2FS2', '9.8', 'Neu5Ac₂Gal₂Fuc₁GlcNAc₄Man₃', '9th (most retained)', '<1%'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'HILIC-FLR-MS Coupling — Peak Confirmation',
      color: 'green',
      content:
        'Online coupling of HILIC-FLR with mass spectrometry (ESI-MS) provides definitive peak assignment by confirming the molecular weight of each fluorescent peak. In the HILIC-FLR-MS configuration, the column eluent is split post-column: ~90% to the fluorescence detector (for quantification) and ~10% to the mass spectrometer (for identification). This ensures that quantification remains based on fluorescence (which is stoichiometric with the labelling tag, independent of glycan ionisation efficiency) while MS provides structural confirmation. Key MS settings for glycan analysis: positive-ion mode ESI, capillary voltage 3.0-3.5 kV, cone voltage 30-80 V (gentle to avoid in-source fragmentation), scan range m/z 500-2500 for 2-AB-labelled glycans. Each labelled glycan produces [M+H]⁺, [M+Na]⁺, and [M+2H]²⁺ ions that can be matched to theoretical masses. For ambiguous peaks (e.g., isobaric bisected vs triantennary), MS/MS fragmentation provides diagnostic fragment ions that distinguish structural isomers based on glycosidic bond cleavage patterns.',
    },
    {
      type: 'card',
      title: 'Site-Specific Glycopeptide LC-MS/MS',
      color: 'blue',
      content:
        'For mAbs with multiple glycosylation sites (Fc + Fab) or for site-specific glycoform quantification, glycopeptide mapping by LC-MS/MS is essential. The workflow involves: (1) Tryptic digestion — standard trypsin digestion (1:20 enzyme:substrate, overnight 37°C) generates glycopeptides where the glycan remains attached to the Asn-containing peptide. (2) C18 reversed-phase LC — glycopeptides are separated on a standard C18 column (e.g., Waters BEH C18, 1.7 µm, 2.1 × 150 mm) using water/ACN gradient with 0.1% formic acid. Glycopeptides elute earlier than non-glycosylated peptides of similar size because the hydrophilic glycan reduces overall hydrophobicity. (3) MS acquisition — data-dependent acquisition (DDA) with HCD (higher-energy collisional dissociation) fragmentation at normalised collision energy 25-30% for Orbitrap instruments, or CID at 35% for Q-TOF instruments. (4) Glycopeptide identification — glycopeptides are identified by: (a) Oxonium ions in HCD spectra: m/z 204.087 (HexNAc⁺, [GlcNAc+H]⁺), m/z 292.103 (Neu5Ac⁺, [NeuAc+H-H₂O]⁺), m/z 366.140 (HexHexNAc⁺, [Gal-GlcNAc+H]⁺), m/z 138.055 (HexNAc fragment), m/z 274.092 (Neu5Ac-H₂O). These oxonium ions are diagnostic — any MS/MS spectrum containing m/z 204.087 is a glycopeptide. (b) Y-ions (peptide backbone + partial glycan) confirm the peptide identity and glycan attachment site.',
    },
    {
      type: 'table',
      title: 'Diagnostic Oxonium Ions for Glycopeptide Identification',
      headers: ['m/z', 'Ion Identity', 'Composition', 'Diagnostic For'],
      rows: [
        ['138.055', 'HexNAc fragment (C₆H₈NO₃⁺)', 'Cross-ring cleavage of GlcNAc', 'Any N-glycopeptide'],
        ['204.087', 'HexNAc⁺ (GlcNAc or GalNAc)', '[C₈H₁₄NO₅]⁺', 'Any N-glycopeptide (most reliable diagnostic)'],
        ['274.092', 'Neu5Ac - H₂O', '[C₁₁H₁₆NO₇]⁺', 'Sialylated glycopeptide'],
        ['292.103', 'Neu5Ac⁺', '[C₁₁H₁₈NO₈]⁺', 'Sialylated glycopeptide'],
        ['366.140', 'HexHexNAc⁺ (Gal-GlcNAc)', '[C₁₄H₂₄NO₁₀]⁺', 'Galactosylated glycopeptide'],
        ['512.197', 'HexNAcHexNeu5Ac⁺', '[C₂₀H₃₄NO₁₄]⁺', 'Sialylated LacNAc antenna'],
        ['657.235', 'HexNAcHex₂Neu5Ac⁺', 'Extended glycan fragment', 'Branched sialylated structure'],
      ],
      sortable: false,
    },
    {
      type: 'card',
      title: 'Native MS — Detecting Asymmetric Glycosylation',
      color: 'purple',
      content:
        'Native mass spectrometry analyses intact proteins under non-denaturing conditions (ammonium acetate buffer, pH 6.8-7.5, gentle ESI settings), preserving non-covalent interactions including the Fc homodimer interface. For glycan analysis, native MS provides unique information that no other method can: (1) Asymmetric glycoform detection — in standard denaturing MS, each HC is analysed independently, and the pairing between the two HC glycans is lost. Native MS preserves the intact IgG and resolves individual glycoform combinations. For example, a native mass spectrum may show separate peaks for G0F/G0F, G0F/G1F, G1F/G1F, G0F/G2F, etc., revealing the actual glycoform pairing present in the molecule. (2) Hemi-glycosylated detection — native MS can detect molecules where one HC bears a glycan and the other does not (mass difference ~1.4 kDa on the intact ~148 kDa molecule). (3) Bispecific antibody pairing — for knob-in-hole or other heterodimeric bispecific formats, native MS confirms correct HC pairing by resolving the distinct mass of each HC. The charge state distribution in native MS (typically +23 to +30 for intact IgG) provides information about molecular compactness — more compact, well-folded molecules show narrower charge state envelopes.',
    },
    {
      type: 'card',
      title: 'Intact and Subunit Mass Spectrometry',
      color: 'amber',
      content:
        'Intact and subunit-level MS bridges the gap between released glycan profiling (Tier 1) and glycopeptide mapping (Tier 2), providing rapid glycoform identification without enzymatic digestion (intact) or with minimal digestion (subunit). Intact MS: The whole mAb (~148 kDa) is analysed by denaturing ESI-MS on a Q-TOF or Orbitrap instrument. After deconvolution, the mass spectrum resolves individual glycoform combinations. Resolution is challenging — the ~1.4 kDa difference between G0F and G0F-GlcNAc must be resolved on a 148 kDa molecule, requiring mass accuracy <50 ppm. Subunit MS: IdeS protease (FabRICATOR) cleaves below the hinge, producing F(ab\')₂ (~98 kDa) and Fc/2 (~25 kDa). Under reducing conditions, four fragments are generated: Fd\' (VH-CH1, ~25 kDa), LC (~23 kDa), and Fc/2 (~25 kDa with one glycan each). The Fc/2 subunit provides the clearest glycoform resolution because each Fc/2 carries exactly one glycan, and the ~25 kDa mass range is well-suited for high-resolution deconvolution. Typical mass accuracy on a Q-TOF: ±1 Da on a 25 kDa fragment, enabling unambiguous glycoform assignment. The subunit approach is becoming the preferred rapid QC method for glycan confirmation at lot release.',
    },
    {
      type: 'card',
      title: 'CE-LIF — Capillary Electrophoresis with Laser-Induced Fluorescence',
      color: 'green',
      content:
        'Capillary electrophoresis with laser-induced fluorescence (CE-LIF) is an orthogonal glycan separation method that separates released, labelled glycans based on charge-to-size ratio in a capillary filled with polymer gel. The labelling agent is 8-aminopyrene-1,3,6-trisulfonate (APTS), which reacts with the reducing end of released glycans and provides three negative charges plus intense fluorescence (excitation 488 nm, emission 520 nm — compatible with argon laser sources). Separation is achieved by capillary gel electrophoresis — smaller, less charged glycans migrate faster, while larger sialylated glycans migrate slower due to additional negative charge and hydrodynamic size. Key advantages of CE-LIF: (1) High sensitivity — APTS labelling combined with laser excitation achieves sub-femtomole detection limits, enabling analysis from microgram quantities of mAb; (2) Speed — typical separation in 15-30 minutes with single-capillary instruments, or multiplexed on 96-capillary DNA sequencer-adapted platforms (e.g., Applied Biosystems 3500); (3) Minimal sample preparation — APTS labelling is rapid and requires less cleanup than 2-AB labelling; (4) Quantitative — APTS labels stoichiometrically (one label per glycan). Key limitation: electrophoretic migration does not always provide the same structural resolution as HILIC — some co-migrating species may require orthogonal MS confirmation.',
    },
    {
      type: 'table',
      title: 'Comparison of Glycan Analytical Methods',
      headers: ['Method', 'Level', 'Information Provided', 'Sensitivity', 'Throughput', 'Regulatory Use'],
      rows: [
        ['HILIC-UPLC-FLR', 'Released glycan', 'Glycoform profile (%); GU values for peak ID', '~0.1% relative', 'Medium (45-60 min/sample)', 'Release testing; stability; comparability'],
        ['HILIC-FLR-MS', 'Released glycan', 'Glycoform profile + MW confirmation', '~0.1% (FLR); ~0.5% (MS)', 'Medium (45-60 min/sample)', 'Extended characterisation; peak assignment'],
        ['Glycopeptide LC-MS/MS', 'Site-specific', 'Glycan identity at each site; oxonium ion confirmation', '~0.05% per site', 'Low (60-90 min/sample + data analysis)', 'Characterisation; multi-site mAbs; Fab glycan'],
        ['Intact MS (denaturing)', 'Whole molecule', 'Glycoform combinations on intact mAb', '~1% relative', 'High (5-10 min/sample)', 'Identity; rapid screening'],
        ['Subunit MS (IdeS)', 'Fc/2 fragment', 'Glycoform per HC at Asn297', '~0.5% relative', 'High (10-15 min/sample)', 'Release testing (trending); identity'],
        ['Native MS', 'Intact (native)', 'Asymmetric glycoforms; HC pairing; compactness', '~1-2% relative', 'Medium (15-30 min/sample)', 'Extended characterisation; bispecifics'],
        ['CE-LIF (APTS)', 'Released glycan', 'Glycoform profile (electrophoretic separation)', '~0.05% relative', 'High (15-30 min/sample)', 'Release testing (alternative to HILIC); high sensitivity'],
        ['Sialic acid HPLC (DMB)', 'Released SA', 'Neu5Ac vs Neu5Gc quantification', '~0.1% SA', 'Medium (30 min/sample)', 'Characterisation; non-human SA monitoring'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'NMR for Glycan Linkage Analysis',
      color: 'purple',
      content:
        'Nuclear magnetic resonance (NMR) spectroscopy provides definitive structural information about glycan linkage that cannot be obtained by any mass spectrometry-based method. Mass spectrometry determines monosaccharide composition and branching patterns but cannot distinguish α2,3 from α2,6 sialic acid linkage, α1,3 from α1,6 galactose arm substitution, or anomeric configurations (α vs β) without fragmentation-based inference. ¹H-NMR and ¹³C-NMR of released glycans (or glycopeptides) resolve these ambiguities: (1) Sialic acid linkage — α2,6-linked Neu5Ac shows a characteristic H-3eq signal at δ 2.67 ppm and H-3ax at δ 1.72 ppm, while α2,3-linked Neu5Ac has H-3eq at δ 2.76 ppm and H-3ax at δ 1.80 ppm. The distinct chemical shifts enable unambiguous linkage assignment. (2) Core fucose — α1,6-linked core fucose H-1 resonates at δ 4.86 ppm, confirming the presence and linkage of the fucose residue. (3) Bisecting GlcNAc — the β1,4-linked bisecting GlcNAc H-1 signal appears at δ 4.52 ppm, distinguishable from antenna GlcNAc H-1 signals. NMR requires milligram quantities of purified glycan, making it a characterisation-only tool unsuitable for routine QC. It is most commonly used during early-stage development to confirm glycan structures that are then tracked by more sensitive methods (HILIC, LC-MS) in routine testing.',
    },
    {
      type: 'callout',
      title: 'Exoglycosidase Sequencing — The Classical Structural Tool',
      variant: 'info',
      content:
        'Exoglycosidase sequencing (also called enzyme array or glycan sequencing) is a systematic approach to glycan structure determination using sequential digestion with linkage-specific exoglycosidases, followed by HILIC or CE-LIF analysis of the products at each step. A typical sequencing panel includes: (1) Arthrobacter ureafaciens sialidase (AUS) — cleaves all sialic acid linkages (α2,3 and α2,6); (2) Sialidase S (α2,3-specific) — cleaves only α2,3-linked sialic acid, distinguishing it from α2,6; (3) Bovine testicular β-galactosidase (BTG) — cleaves β1,3 and β1,4 galactose; (4) S. pneumoniae β-N-acetylhexosaminidase — cleaves antenna GlcNAc but not bisecting GlcNAc; (5) Jack bean α-mannosidase (JBM) — cleaves terminal α-mannose. By comparing HILIC profiles before and after each enzyme treatment, the glycan structure is deduced step-by-step. This method is lower-throughput than MS-based approaches but provides orthogonal, unambiguous structural information that validates MS-based assignments.',
    },
    {
      type: 'card',
      title: 'Method Selection for Regulatory Submissions',
      color: 'amber',
      content:
        'Regulatory expectations for glycan characterisation evolve through the product lifecycle. During early-phase development (IND/CTA Phase 1-2), HILIC-UPLC-FLR with GU-based peak assignment is sufficient for glycan profiling, supplemented by intact/subunit MS for identity. During late-phase development and BLA/MAA submission, a comprehensive glycan characterisation package is expected: (1) HILIC-UPLC-FLR or CE-LIF for quantitative glycoform profiling (lot release and stability); (2) HILIC-FLR-MS or glycopeptide LC-MS/MS for structural confirmation of all peaks >1% relative abundance; (3) Exoglycosidase sequencing for at least three representative lots to confirm structural assignments; (4) Native MS for characterisation of asymmetric glycoforms; (5) Site-specific analysis if Fab glycosylation is present; (6) Sialic acid speciation (DMB-HPLC) to quantify Neu5Ac/Neu5Gc ratio. For biosimilar submissions (351(k) or Article 10(4)), analytical glycan similarity is a cornerstone of the totality-of-evidence framework, and extensive glycan characterisation (including multiple reference product lots) is expected. ICH Q6B provides the overarching guidance, while specific regulatory expectations are detailed in EMA and FDA product-specific guidance documents.',
    },
    {
      type: 'bullets',
      title: 'Practical Analytical Workflow — From Sample to Report',
      items: [
        'Sample preparation: Buffer exchange into 50 mM ammonium bicarbonate (volatile buffer compatible with MS); denature with heat (95°C, 5 min) or SDS/DTT; PNGaseF digest (overnight or rapid protocol); label with 2-AB, RFMS, or APTS depending on downstream separation.',
        'HILIC method development: Start with Waters BEH Glycan column, 75-55% ACN gradient, 40 min. Optimise column temperature (45-60°C) for G1F positional isomer resolution. Validate with dextran ladder for GU calibration. Set integration parameters to include all peaks >0.1% relative fluorescence.',
        'Peak assignment: Assign peaks using GU database (NIBRT GlycoBase or Waters GlycoBase), confirm with online MS or offline LC-MS of collected fractions. For novel peaks (non-standard glycans, bisected species), exoglycosidase sequencing provides orthogonal confirmation.',
        'Method validation (ICH Q2(R2)): Validate for specificity (resolution between critical peak pairs), linearity (2-AB fluorescence vs glycan amount, R² > 0.99), precision (repeatability RSD < 5% for major peaks, <15% for minor peaks), accuracy (spike recovery 95-105%), range (25-150% of nominal), and robustness (column temperature, gradient slope, injection volume).',
        'Data reporting: Report all glycan species >0.1% as individual peaks with %area and GU value. Group reporting: total afucosylated, total galactosylated (G1+G2), total sialylated, total high mannose. Trending: plot glycan profile across lots, stability timepoints, and process changes using control charts with action/alert limits.',
        'System suitability: Dextran ladder injection confirms GU calibration. IgG standard injection (e.g., SILu mAb, Sigma) confirms glycan profile reproducibility. Peak resolution requirement between G0F and G1F(α1,6) isomers > 1.5.',
      ],
    },
  ],
  mentorQuestions: [
    'You observe an unknown peak at GU 6.3 in your HILIC-FLR glycan profile that appears at 2% relative abundance. Walk through your structural assignment strategy, from MS confirmation to exoglycosidase sequencing.',
    'Explain why native MS is essential for detecting hemi-glycosylated mAb species that would be missed by HILIC released glycan profiling.',
    'Design the glycan analytical package for a BLA submission of a mAb with both Fc (Asn297) and Fab (Asn84 VH) glycosylation sites — which methods at each tier and why?',
  ],
};

export default module13;
