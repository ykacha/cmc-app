import type { ModuleContent } from '../../types/content';

export const module2: ModuleContent = {
  id: 'effector-m2',
  sectionId: 'effector',
  moduleNumber: 2,
  eyebrow: 'EFFECTOR 03',
  title: 'ADCP Pathway',
  lead: 'Antibody-dependent cellular phagocytosis is the dominant Fc effector mechanism for tumour clearance in solid tissue compartments where NK cells are scarce. This module dissects the receptor biology, signalling cascade, phagocytic cup mechanics, and assay design required for CMC characterisation of ADCP-dependent mAbs.',
  tags: [
    { label: 'ADCP', color: 'green' },
    { label: 'FcγRI / FcγRIIa', color: 'blue' },
    { label: 'Macrophages', color: 'purple' },
    { label: 'CD47-SIRPα', color: 'red' },
  ],
  stats: [
    { label: 'Primary Receptor', value: 'FcγRIIa (CD32a)' },
    { label: 'High-Affinity FcγR', value: 'FcγRI (CD64)' },
    { label: 'Checkpoint', value: 'CD47-SIRPα' },
    { label: 'Cross-Presentation', value: 'MHC-I to CD8⁺ T' },
  ],
  sections: [
    {
      type: 'card',
      title: 'FcγRI (CD64) — The High-Affinity Phagocytic Receptor',
      color: 'blue',
      content:
        'FcγRI (CD64) is the only high-affinity Fcγ receptor (Ka 10⁸–10⁹ M⁻¹), capable of binding monomeric IgG at physiological serum concentrations. Its three extracellular immunoglobulin-like domains (D1–D2–D3) engage the Fc lower hinge (L234–G237) and upper CH2 domain, with D3 providing the additional ~10-fold affinity increment over two-domain receptors. FcγRI is constitutively expressed on monocytes, macrophages, and dendritic cells, with expression dramatically upregulated by IFN-γ (up to 10-fold on neutrophils). It signals through the associated FcεRIγ-chain homodimer bearing ITAMs. In the context of ADCP, FcγRI engagement on tissue-resident macrophages is particularly significant: because it can bind monomeric IgG, FcγRI can initiate phagocytosis even at lower opsonisation densities than required by FcγRIIa. However, at physiological serum IgG concentrations (7–15 mg/mL), FcγRI is constitutively occupied by endogenous IgG. Therapeutic mAb engagement therefore relies on the avidity advantage of multivalent surface-bound antibody outcompeting monovalent serum IgG.',
    },
    {
      type: 'card',
      title: 'FcγRIIa (CD32a) — The Dominant ADCP Receptor',
      color: 'green',
      content:
        'FcγRIIa (CD32a) is the principal receptor mediating ADCP by macrophages and is the most broadly distributed activating FcγR, found on monocytes, macrophages, neutrophils, eosinophils, platelets, and dendritic cells. Unlike FcγRI and FcγRIIIa, FcγRIIa contains an intrinsic ITAM in its cytoplasmic tail and does not require accessory γ-chain signalling adaptors. It is a low-affinity receptor (Ka ~10⁶ M⁻¹) that requires immune complex or opsonised target engagement for stable binding. Upon multivalent crosslinking by Fc regions on an opsonised target, intrinsic ITAM tyrosines are phosphorylated by Src-family kinases (Lyn, Hck), recruiting Syk kinase via its tandem SH2 domains. Syk activation drives parallel cascades: PLCγ → IP3/DAG → calcium flux and PKC activation; PI3K → PIP3 → Akt activation and membrane remodelling; Vav1/Rac/Cdc42 → Arp2/3-mediated actin polymerisation for pseudopod extension. The clinically significant H131R polymorphism affects IgG2 binding: H131 binds IgG2 with moderate affinity whereas R131 essentially loses IgG2 engagement. For IgG1 therapeutic mAbs, both alleles bind equivalently, but H131R genotyping of PBMC donors remains important for ADCP assay standardisation.',
    },
    {
      type: 'card',
      title: 'ITAM Signalling and Phagocytic Cup Formation',
      color: 'purple',
      content:
        'Phagocytic cup formation follows a zipper model of sequential receptor engagement. When macrophage FcγR binds opsonised target Fc, ITAM phosphorylation activates Syk, which phosphorylates scaffolding proteins (LAT, SLP-76) that nucleate a signalling complex at the nascent cup. PI3K generates PIP3 at the cup membrane, recruiting PH-domain-containing proteins (Akt, Vav1, TAPP1) that amplify the phagocytic signal. Simultaneously, Vav1 activates Rac1 and Cdc42 GTPases: Cdc42 drives filopodia formation at the cup rim, while Rac1 activates the WAVE/WASP-Arp2/3 complex to polymerise branched actin networks that extend pseudopods around the target. The pseudopods advance along the opsonised surface in a zipper-like fashion, with each FcγR–Fc contact providing a new anchor point. Complete engulfment requires continuous actin polymerisation and membrane delivery from recycling endosomes (Rab11⁺ vesicles) to supply lipid for the expanding phagosome. The cup closure step depends on dynamin-mediated membrane scission and myosin II contractile ring formation. Failure to close (e.g., due to insufficient opsonisation density or SIRPα inhibition) results in "frustrated phagocytosis" — prolonged cup extension without internalisation that releases reactive oxygen species and proteases, causing bystander tissue damage.',
    },
    {
      type: 'card',
      title: 'Phagolysosome Maturation and Antigen Processing',
      color: 'teal',
      content:
        'Once the phagocytic cup closes, the nascent phagosome undergoes a maturation cascade driven by sequential Rab GTPase exchange: Rab5 (early phagosome, pH ~6.5) → Rab7 (late phagosome, pH ~5.5) → phagolysosome (pH ~4.5–5.0 after lysosome fusion). Acidification is achieved by vacuolar H⁺-ATPase recruitment. The phagolysosome contains cathepsins (B, D, L, S), lysozyme, and reactive oxygen/nitrogen species (HOCl from myeloperoxidase, superoxide from NADPH oxidase, nitric oxide from iNOS). Protein antigens from the phagocytosed target are degraded into peptides (8–25 residues). In classical MHC-II presentation, peptides are loaded onto MHC class II molecules in the MIIC (MHC class II compartment) and presented to CD4⁺ helper T cells. Critically, macrophages and dendritic cells can also cross-present phagocytosed antigens on MHC class I molecules to CD8⁺ cytotoxic T cells through phagosome-to-cytosol export (sec61 translocon) and TAP-dependent proteasomal processing. This ADCP-driven cross-presentation is increasingly recognised as a bridge between innate Fc effector function and adaptive T-cell immunity, with implications for combination strategies pairing opsonising mAbs with checkpoint inhibitors.',
    },
    {
      type: 'card',
      title: 'Tumour-Associated Macrophage Polarisation — M1 vs M2',
      color: 'red',
      content:
        'Macrophage polarisation profoundly influences ADCP efficacy. Classically activated M1 macrophages (induced by IFN-γ, LPS, GM-CSF) express high levels of activating FcγRI and FcγRIIa, produce pro-inflammatory cytokines (TNF-α, IL-12, IL-1β), and are potent phagocytes with robust ADCP activity. Alternatively activated M2 macrophages (induced by IL-4, IL-10, IL-13, M-CSF) upregulate the inhibitory FcγRIIb, produce anti-inflammatory cytokines (IL-10, TGF-β), and exhibit reduced ADCP potency. In the tumour microenvironment (TME), tumour-associated macrophages (TAMs) are predominantly M2-polarised, driven by tumour-derived IL-10, TGF-β, CSF-1, and lactate. M2 TAMs have a low activating-to-inhibitory FcγR ratio (A/I ratio), raising the threshold for ADCP activation. Strategies to repolarise TAMs toward M1 phenotype include CSF-1R inhibitors (pexidartinib), CD40 agonists (selicrelumab), STING agonists, and TLR agonists. Repolarisation restores the A/I ratio, upregulates FcγRI expression, and dramatically enhances ADCP of opsonised tumour cells. This provides the mechanistic rationale for combining opsonising mAbs (rituximab, trastuzumab) with TAM-repolarising agents.',
    },
    {
      type: 'card',
      title: 'SIRPα-CD47 "Don\'t Eat Me" Checkpoint',
      color: 'amber',
      content:
        'The SIRPα-CD47 axis is the dominant "don\'t eat me" checkpoint that restrains ADCP. CD47, a ubiquitously expressed transmembrane protein (also called integrin-associated protein), engages SIRPα (signal regulatory protein α, also known as CD172a) on macrophages. SIRPα is an ITIM-bearing receptor: upon CD47 ligation, SIRPα ITIMs are phosphorylated, recruiting the phosphatases SHP-1 and SHP-2, which dephosphorylate the Syk/PI3K/Vav1 signalling intermediates essential for phagocytic cup formation. The net effect is a dominant-negative inhibition of ADCP — even when activating FcγR signals are present, SIRPα-mediated SHP-1 activity can veto the phagocytic programme. Tumour cells exploit this by overexpressing CD47 (2–5-fold above normal tissue levels), which correlates with poor prognosis across haematological and solid malignancies. Magrolimab (Hu5F9-G4) is a humanised anti-CD47 IgG4 mAb that blocks the CD47-SIRPα interaction, releasing the ADCP brake. In combination with rituximab (providing the "eat me" opsonisation signal through FcγR engagement), magrolimab demonstrated 50% complete response rates in DLBCL. The dual-signal model is: opsonising mAb provides activating FcγR signal (eat me) + anti-CD47 removes SIRPα inhibitory signal (block don\'t eat me) = unleashed ADCP.',
    },
    {
      type: 'table',
      title: 'ADCP vs ADCC — Mechanistic Comparison',
      headers: ['Parameter', 'ADCP', 'ADCC'],
      rows: [
        ['Primary effector cell', 'Macrophages, monocytes, DCs, neutrophils', 'NK cells (CD3⁻CD56⁺)'],
        ['Primary FcγR', 'FcγRIIa (CD32a), FcγRI (CD64)', 'FcγRIIIa (CD16a)'],
        ['Signalling motif', 'ITAM (intrinsic for FcγRIIa; γ-chain for FcγRI)', 'ITAM (via FcεRIγ or CD3ζ adaptor)'],
        ['Killing mechanism', 'Whole-cell internalisation → phagolysosomal degradation', 'Perforin pore → granzyme B → caspase-3/7 apoptosis'],
        ['Kinetics (per kill)', '30–60 min for engulfment + 2–4 h for degradation', '5–10 min synapse + 30–60 min apoptosis'],
        ['Serial killing capacity', '2–5 targets before exhaustion', '7–10 targets before exhaustion'],
        ['Dominant tissue compartment', 'Solid tissues (liver, spleen, TME)', 'Blood and lymphoid organs'],
        ['Afucosylation impact', 'Minimal (FcγRIIa not glycan-sensitive)', '10–50× enhancement (FcγRIIIa Asn162 mechanism)'],
        ['Key checkpoint', 'CD47-SIRPα ("don\'t eat me")', 'HLA-E / NKG2A (inhibitory KIR)'],
        ['Antigen cross-presentation', 'Yes — MHC-I presentation to CD8⁺ T cells', 'No — target cell destroyed extracellularly'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'ADCP Assay Design for CMC Characterisation',
      color: 'blue',
      content:
        'ADCP assays for CMC are less standardised than ADCC reporter bioassays, presenting a significant challenge for lot-release testing. The primary format uses monocyte-derived macrophages (MDMs): CD14⁺ monocytes from peripheral blood are differentiated with M-CSF (50–100 ng/mL) for 6–7 days to generate macrophages, which are then co-incubated with fluorescently labelled target cells (e.g., PKH26/CFSE-stained Raji or Daudi cells for anti-CD20, SKBR3 for anti-HER2) opsonised with the test antibody. After 2–4 hours at 37°C, phagocytosis is quantified by flow cytometry gating on CD14⁺/CD11b⁺ macrophages that are double-positive for the target cell fluorescent label, or by imaging flow cytometry (Amnis ImageStream) to distinguish true phagocytosis from surface adhesion. An alternative is the THP-1 reporter assay: THP-1 monocytic cells differentiated with PMA and transduced with an NFAT-luciferase reporter provide a standardised, reproducible ADCP surrogate, similar to ADCC reporter bioassays. Inter-donor variability with primary MDMs can exceed 30% CV, driven by FcγRIIa H131R genotype and M1/M2 polarisation state. For lot-release, the THP-1-based assay is preferred; primary MDM assays are reserved for extended characterisation.',
    },
    {
      type: 'bullets',
      title: 'Critical ADCP Assay Variables',
      items: [
        'FcγRIIa H131R genotyping: donor macrophages homozygous for H131 can show 2–10× higher ADCP activity than R131 homozygotes for IgG2 mAbs. For IgG1 mAbs the difference is smaller (~1.5–2×) but still significant. All ADCP assay reports should specify donor genotype.',
        'Macrophage differentiation protocol: M-CSF generates M2-biased macrophages (lower FcγRI, higher FcγRIIb); GM-CSF generates M1-biased macrophages (higher FcγRI, lower FcγRIIb). The choice directly affects ADCP potency readout and must be standardised.',
        'Target cell labelling: fluorescent dyes (PKH26, CFSE, pHrodo) each have advantages. pHrodo only fluoresces at acidic pH, meaning it specifically reports phagolysosomally internalised targets and eliminates false-positive surface adhesion signal.',
        'Imaging vs conventional flow cytometry: standard flow cannot distinguish a macrophage that has phagocytosed a target from one with a target merely attached to its surface. Imaging flow cytometry (ImageStream) or confocal microscopy provides definitive internalisation confirmation.',
        'Effector-to-target ratio: typical ADCP E:T ratios are 1:1 to 5:1 (macrophages are larger cells and can engulf only 2–5 targets). This contrasts with ADCC ratios of 10:1 to 50:1.',
        'Incubation time: 2–4 hours captures initial phagocytosis; 24-hour assays capture trogocytosis (partial membrane nibbling) and secondary killing but introduce confounders from macrophage apoptosis.',
      ],
    },
    {
      type: 'callout',
      title: 'Regulatory Context — ADCP in CMC Filing Strategy',
      variant: 'warning',
      content:
        'For mAbs where ADCP contributes to the mechanism of action (e.g., rituximab, trastuzumab, daratumumab), regulators expect ADCP characterisation data in the BLA/MAA dossier (ICH Q6B extended characterisation). However, ADCP is rarely included as a lot-release assay due to variability. Instead, SPR binding to FcγRIIa (both H131 and R131 alleles) and FcγRI serves as a surrogate for ADCP potency monitoring. For biosimilar applications, both FDA and EMA classify FcγRIIa binding and ADCP functional data as Tier 1 analytical similarity attributes when ADCP is part of the reference product\'s mechanism of action. The acceptable similarity margin is typically based on the reference product variability range.',
    },
    {
      type: 'callout',
      title: 'Clinical Perspective — ADCP as a Bridge to Adaptive Immunity',
      variant: 'success',
      content:
        'The cross-presentation pathway from ADCP-mediated antigen uptake to CD8⁺ T-cell priming is emerging as a critical link between innate Fc effector function and durable anti-tumour immunity. Preclinical data from Rafiq et al. (Nat. Med. 2020) demonstrated that anti-CD20 mAb-mediated ADCP by macrophages led to cross-presentation of tumour neoantigens, priming tumour-specific CD8⁺ T cells that provided long-term immune surveillance. This cross-presentation effect is enhanced by M1 macrophage polarisation and abolished by M2 polarisation. The clinical implication is that opsonising mAbs may synergise with anti-PD-1/PD-L1 checkpoint inhibitors: the mAb drives ADCP and cross-presentation (antigen priming), while the checkpoint inhibitor prevents T-cell exhaustion (effector phase). This provides mechanistic rationale for the rituximab + pembrolizumab, trastuzumab + atezolizumab, and magrolimab + anti-PD-1 combinations currently in clinical trials.',
    },
  ],
  mentorQuestions: [
    'A therapeutic anti-CD20 mAb shows strong ADCC in vitro but limited efficacy in a solid tumour setting where NK cells are scarce. How would you reframe the effector function strategy around ADCP, and what modifications to the Fc region or combination approach would you consider?',
    'Explain why afucosylation provides a dramatic enhancement for ADCC (via FcγRIIIa) but has minimal impact on ADCP (via FcγRIIa). What does this tell you about the molecular architecture of the FcγRIIa binding interface compared to FcγRIIIa?',
    'You are designing an ADCP potency assay for a biosimilar programme. Your primary macrophage assay shows 40% inter-donor CV while your THP-1 reporter assay shows 12% CV. How do you integrate both assays into the analytical similarity and lot-release testing strategy?',
  ],
};
