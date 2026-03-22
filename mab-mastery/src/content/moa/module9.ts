import type { ModuleContent } from '../../types/content';

export const module9: ModuleContent = {
  id: 'moa-m9',
  sectionId: 'moa',
  moduleNumber: 9,
  eyebrow: 'MOA 10',
  title: 'Bispecific Antibody Formats — Complete Comparison',
  lead: 'Comprehensive format comparison: KiH, CrossMAb, DVD-Ig, IgG-scFv, DART, BiTE, SEED — architecture, half-life, effector functions, manufacturing complexity, and clinical examples.',
  tags: [
    { label: 'Bispecific', color: 'purple' },
    { label: 'KiH / CrossMAb', color: 'blue' },
    { label: 'Format Engineering', color: 'teal' },
    { label: 'Manufacturing', color: 'amber' },
  ],
  stats: [
    { label: 'Major Formats', value: '7+ Platforms' },
    { label: 'Approved Bispecifics', value: '8+ (2024)' },
    { label: 'KiH Mutations', value: 'T366W / T366S+L368A+Y407V' },
    { label: 'MW Range', value: '~55–210 kDa' },
  ],
  sections: [
    {
      type: 'card',
      title: '1. Bispecific Antibody Formats — Landscape Overview',
      color: 'blue',
      content:
        'Bispecific antibodies (bsAbs) simultaneously bind two different epitopes — either on two different antigens or two different epitopes on the same antigen. Over 100 bispecific formats have been described in the literature, but a handful of platform technologies dominate the clinical pipeline. The formats divide into two fundamental architectures: (1) IgG-like formats that retain the Fc region, providing FcRn-mediated half-life extension (~14-21 days), straightforward purification via Protein A, and potentially retained effector functions; and (2) non-IgG-like (fragment-based) formats that lack the Fc, offering smaller size (better tissue penetration, lower immunogenicity risk) but shorter half-life (hours to days) and absence of effector functions. The choice of format is driven by the mechanism of action: T cell engagers require effector-silent Fc (or no Fc); tumour-targeting bispecifics may benefit from ADCC-competent Fc; bridging molecules for receptor co-engagement need precise geometry to bring targets into proximity. Each format presents distinct CMC challenges for expression, purification, characterisation, and stability.',
    },
    {
      type: 'card',
      title: '2. Knobs-into-Holes (KiH) — CH3 Heterodimerisation',
      color: 'teal',
      content:
        'Knobs-into-holes (Ridgway et al., Protein Eng 1996) is the most widely adopted CH3 engineering strategy for heavy chain heterodimerisation. The "knob" mutation T366W introduces a bulky tryptophan residue into one CH3 domain. The "hole" mutations T366S/L368A/Y407V create a complementary cavity in the partner CH3 domain. The steric complementarity drives preferential knob-hole heterodimerisation over knob-knob or hole-hole homodimerisation. An additional interchain disulfide bond (S354C on the knob chain, Y349C on the hole chain) is typically engineered to stabilise the heterodimer. KiH technology achieves >95% heterodimer purity when combined with optimised co-expression ratios. Residual homodimer species (typically 1-5%) must be removed chromatographically or quantified and specified. KiH is the foundation of Roche/Genentech bispecific platforms and is used in approved products including emicizumab (Hemlibra), glofitamab, and mosunetuzumab. The KiH mutations are located in the CH3 domain away from the FcRn binding site (CH2-CH3 junction), so they do not affect pharmacokinetics. However, the asymmetric CH3 can affect Protein A binding — the knob chain may show slightly different Protein A interaction than the hole chain.',
    },
    {
      type: 'card',
      title: '3. CrossMAb — Solving the Light Chain Pairing Problem',
      color: 'green',
      content:
        'KiH solves heavy chain heterodimerisation but does not address the light chain (LC) mispairing problem: when two different heavy chains (HA, HB) and two different light chains (LA, LB) are co-expressed, the correct pairings (HA-LA and HB-LB) compete with incorrect pairings (HA-LB and HB-LA), producing up to 10 species including 3 homodimers, 6 mispaired heterodimers, and 1 correct bispecific. CrossMAb technology (Roche) solves this by domain crossover in one Fab arm: the CH1 and CL domains are swapped between heavy and light chain in one arm (CrossMAb-CH1-CL), so that the light chain of arm B carries a CH1 domain and the heavy chain carries a CL domain. This domain swap creates orthogonal HC-LC interfaces — LA only pairs with HA (normal interface) and LB only pairs with HB (swapped interface), because CH1 does not pair with CH1, and CL does not pair with CL. CrossMAb combined with KiH produces highly pure bispecific heterodimer (>95%) and is used in glofitamab (approved 2023) and numerous Roche pipeline candidates.',
    },
    {
      type: 'card',
      title: '4. DVD-Ig — Dual Variable Domain Immunoglobulin',
      color: 'amber',
      content:
        'DVD-Ig (AbbVie) places two different variable domains in tandem on each arm of an IgG molecule. The outer variable domain (VD1) is fused to the N-terminus of the inner variable domain (VD2) via a short linker (typically G4S or a designed linker of 5-15 residues). The inner VD2 connects to CH1/CL as in a normal IgG. Both heavy and light chains carry dual variable domains: VH1-linker-VH2-CH1-hinge-CH2-CH3 and VL1-linker-VL2-CL. The resulting molecule (~200 kDa) is a symmetric homodimeric IgG with two outer binding sites and two inner binding sites (4 total binding sites, 2 per specificity). DVD-Ig retains full Fc effector function and FcRn-mediated half-life. CMC considerations: (1) the outer VD may sterically hinder access to the inner VD, requiring linker length optimisation (short linkers ~5 aa favour outer VD access; longer linkers ~15 aa improve inner VD access), (2) the molecule is symmetric so no HC heterodimerisation or LC mispairing issues (simpler manufacturing than KiH/CrossMAb), but (3) the large size and tandem domains increase aggregation propensity and viscosity at high concentrations. Lutikizumab (IL-1alpha/IL-1beta DVD-Ig) reached Phase III but was discontinued for insufficient efficacy.',
    },
    {
      type: 'card',
      title: '5. IgG-scFv Fusions — Appended Binding Domains',
      color: 'purple',
      content:
        'IgG-scFv formats append a single-chain variable fragment (scFv) to the C-terminus of one or both heavy chains of an IgG, creating asymmetric (1+1) or symmetric (2+2) bispecific molecules. The IgG backbone provides the primary binding specificity via its native Fab arms, while the appended scFv(s) provide the second specificity. This is a "bolt-on" approach that requires minimal Fc engineering — the scFv is simply fused to the C-terminus of CH3 (or, less commonly, inserted between CH2 and CH3, or between hinge and CH2). Advantages: (1) simple construction — start with any validated IgG and append the scFv, (2) retains standard Protein A purification and IgG-like manufacturing, (3) the IgG portion retains full native structure and function. Challenges: (1) scFv stability — single-chain format may misfold or aggregate (VH-VL interface is non-covalent and prone to opening at elevated temperatures), (2) asymmetric formats (one scFv appended) require KiH for HC heterodimerisation if only one chain carries the scFv, (3) the scFv linker and C-terminal fusion junction are potential immunogenic neoantigens. Teclistamab (BCMAxCD3, Janssen) uses a related approach.',
    },
    {
      type: 'table',
      title: 'Bispecific Format Comparison — Complete Overview',
      headers: ['Format', 'MW (kDa)', 'Half-Life', 'Fc Effector Function', 'Manufacturing Complexity', 'HC:LC Pairing', 'Clinical Examples'],
      rows: [
        ['KiH (knobs-into-holes)', '~150', '14–21 days', 'Retained or silenced', 'Moderate — co-expression, KiH purification', 'Not solved (needs CrossMAb or common LC)', 'Emicizumab (FIXa x FX)'],
        ['CrossMAb (KiH + domain swap)', '~150', '14–21 days', 'Retained or silenced', 'High — 4-chain co-expression, domain swap', 'Solved by CH1-CL crossover', 'Glofitamab (CD20 x CD3)'],
        ['DVD-Ig', '~200', '14–21 days', 'Retained', 'Moderate — symmetric, standard IgG production', 'No issue — symmetric homodimer', 'Lutikizumab (IL-1a x IL-1b)'],
        ['IgG-scFv (appended)', '~175–200', '14–21 days', 'Retained or silenced', 'Moderate–High — scFv stability, asymmetry', 'Partial (scFv is single-chain)', 'Teclistamab-related formats'],
        ['BiTE (tandem scFv)', '~55', '~2 hours', 'None', 'Low — E. coli or CHO, single chain', 'N/A (single polypeptide)', 'Blinatumomab (CD19 x CD3)'],
        ['DART (diabody + Fc)', '~110', '5–10 days', 'Silenced', 'Moderate — disulfide-stabilised diabody', 'Forced by diabody pairing', 'Flotetuzumab (CD123 x CD3)'],
        ['SEED (strand-exchange engineered domain)', '~150', '14–21 days', 'Retained or silenced', 'High — alternating IgG/IgA CH3 strands', 'Not solved (needs additional strategy)', 'Preclinical — limited clinical data'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '6. DART — Dual-Affinity Re-Targeting',
      color: 'red',
      content:
        'DART (MacroGenics) is a bispecific format based on a stabilised diabody architecture. In a standard diabody, VHA-VLB and VHB-VLA polypeptides associate non-covalently to form a bispecific dimer. DARTs enhance this by adding an interchain disulfide bond (engineered C-terminal cysteines) that covalently locks the two chains, preventing dissociation. The compact diabody core (~50 kDa) provides dual specificity in a small footprint. For in vivo applications, an Fc domain (typically effector-silent) is fused to one or both C-termini, creating a DART-Fc format (~110 kDa) with extended half-life. Flotetuzumab (MGD006, CD123xCD3 DART-Fc) demonstrated clinical activity in relapsed/refractory AML. Tebotelimab (MGD013, PD-1xLAG-3 DART-Fc) targets two immune checkpoint receptors for enhanced checkpoint blockade. CMC advantages: the disulfide-stabilised diabody core is relatively stable and well-characterised. CMC challenges: the non-natural VH-VL pairing in the diabody format (VHA-VLB cross-pairing) may introduce non-germline junctional sequences with immunogenicity potential, and the interchain disulfide must be confirmed by peptide mapping.',
    },
    {
      type: 'card',
      title: '7. SEED — Strand-Exchange Engineered Domain',
      color: 'teal',
      content:
        'SEED technology (EMD Serono/Merck KGaA) achieves CH3 heterodimerisation through a fundamentally different approach than KiH. Instead of steric complementarity mutations, SEED creates two hybrid CH3 domains by alternating beta-strands from IgG and IgA CH3 domains. One chain (SEED-AG) contains alternating IgA and IgG beta-strands; the partner chain (SEED-GA) contains the complementary pattern. The asymmetric beta-strand composition creates preferential heterodimeric pairing because AG-AG and GA-GA homodimers have incompatible strand interactions, while AG-GA heterodimers form a stable complementary beta-sheet. The resulting heterodimeric Fc maintains IgG-like FcRn binding (the FcRn-interacting residues are on the CH2-CH3 junction, which is preserved) and Protein A binding. SEED achieves >90% heterodimer purity without additional purification. However, the hybrid CH3 introduces non-natural amino acid sequences at the strand junctions, raising potential immunogenicity concerns that require clinical evaluation. The SEED platform remains primarily in preclinical development, with limited clinical data compared to KiH-based approaches.',
    },
    {
      type: 'bullets',
      title: 'Format Selection Decision Criteria',
      items: [
        'Mechanism of action: T cell engagers require compact format for tight synapse (BiTE/DART) or IgG-based with effector-silent Fc (KiH/CrossMAb). Receptor co-engagement (emicizumab) requires precise Fab arm geometry. CDC/ADCC-dependent mechanisms require intact Fc.',
        'Half-life requirement: Chronic diseases (e.g., haemophilia A — emicizumab, Q1-4W SC) require long half-life (IgG-based, Fc-containing). Acute indications (e.g., haematological malignancies) can tolerate short half-life with CIVI (BiTE) or weekly dosing (DART-Fc).',
        'Manufacturing feasibility: Symmetric formats (DVD-Ig) are simpler to manufacture (standard IgG platform). Asymmetric formats (KiH, CrossMAb, IgG-scFv) require co-expression of 3-4 different polypeptide chains, increasing process development complexity and analytical burden.',
        'Tissue penetration: Smaller formats (BiTE ~55 kDa, DART ~50 kDa) penetrate solid tumours more effectively than full IgG (~150 kDa). This may be critical for solid tumour indications where large molecules have limited extravasation.',
        'Purification strategy: Protein A captures all Fc-containing formats. Non-Fc formats (BiTE, diabodies) require ion-exchange or mixed-mode chromatography. KiH heterodimers may require additional chromatography to remove residual homodimers (HIC, ion-exchange, or CH1-affinity).',
        'Regulatory track record: KiH/CrossMAb (Roche) and KiH (Janssen) have the most regulatory precedent with multiple approvals. BiTE (Amgen) has established regulatory pathway. Novel formats (SEED, Zymeworks Azymetric) have less regulatory history.',
      ],
    },
    {
      type: 'callout',
      title: 'CMC Note — Analytical Complexity Scales with Format',
      variant: 'warning',
      content:
        'The analytical characterisation burden for bispecific antibodies scales with molecular complexity. For a CrossMAb bispecific: (1) intact mass by native MS must confirm the correct heterodimer mass and exclude homodimers (the homodimer masses differ from the heterodimer), (2) reduced mass must confirm the correct 4-chain composition (knob HC, hole HC, LC-A, LC-B), (3) binding assays must independently confirm each arm (SPR with antigen A alone, antigen B alone, and simultaneous dual binding), (4) charge variant analysis (icIEF) must characterise a more complex profile than a homodimeric mAb, (5) glycosylation may differ between the two heavy chains (asymmetric glycan occupancy), and (6) stability-indicating methods must detect preferential degradation of one arm versus the other. This 2-3x increase in analytical scope compared to a conventional mAb must be factored into development timelines and CMC resource planning.',
    },
    {
      type: 'callout',
      title: 'Landmark Product — Emicizumab (Hemlibra)',
      variant: 'success',
      content:
        'Emicizumab is a bispecific antibody bridging Factor IXa and Factor X, mimicking the cofactor function of Factor VIIIa in the intrinsic coagulation pathway. Approved for haemophilia A (with and without FVIII inhibitors), emicizumab demonstrates the versatility of the bispecific platform. Key features: (1) KiH Fc with common light chain (ART-Ig technology — both Fab arms share an identical light chain, eliminating the LC mispairing problem), (2) IgG4-based Fc (no effector function needed — purely enzymatic cofactor mimicry), (3) subcutaneous dosing Q1-4W at steady state due to long half-life, (4) the potency assay measures Factor Xa generation (chromogenic or clotting-time based) rather than any binding or effector function endpoint. This unique MoA — enzymatic cofactor replacement by an antibody — required a non-standard potency assay that directly measures coagulation function.',
    },
  ],
  mentorQuestions: [
    'For a bispecific T cell engager using KiH + CrossMAb technology, describe the complete analytical strategy you would use to confirm correct chain pairing and exclude all possible mispaired species — what techniques are required and in what order?',
    'Compare the CMC advantages and disadvantages of DVD-Ig versus KiH-CrossMAb for a dual-cytokine-blocking antibody (e.g., IL-4R x IL-13) where no effector function is needed — which format would you recommend and why?',
    'If you observed a 3% homodimer impurity by native MS in a KiH bispecific drug substance, how would you determine whether this is a knob-knob or hole-hole homodimer, and what are the functional consequences of each?',
  ],
};
