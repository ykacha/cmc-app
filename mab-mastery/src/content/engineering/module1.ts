import type { ModuleContent } from '../../types/content';

export const module1: ModuleContent = {
  id: 'engineering-m1',
  sectionId: 'engineering',
  moduleNumber: 1,
  eyebrow: 'ENGINEERING 02',
  title: 'LALA-PG Mutation (L234A/L235A/P329G)',
  lead: 'LALA-PG extends the LALA scaffold with a third mutation, P329G, that disrupts the proline sandwich interaction with C1q. The result is the most complete Fc-silencing strategy available, eliminating ADCC, ADCP, and CDC to below the limit of detection in validated assays.',
  tags: [
    { label: 'Complete Silencing', color: 'red' },
    { label: 'Proline Sandwich', color: 'purple' },
    { label: 'C1q Abolition', color: 'teal' },
    { label: 'Second-Generation', color: 'amber' },
  ],
  stats: [
    { label: 'Mutations', value: 'L234A/L235A/P329G' },
    { label: 'FcgammaR Binding', value: 'Undetectable' },
    { label: 'C1q/CDC', value: 'Undetectable' },
    { label: 'Half-Life Impact', value: 'None' },
  ],
  sections: [
    {
      type: 'card',
      title: '1. The Proline Sandwich — Structural Basis of P329G',
      color: 'blue',
      content:
        'Position P329 (EU numbering) is located in the FG loop of the CH2 domain. In wild-type IgG1, P329 participates in a critical "proline sandwich" interaction with C1q and FcgammaRs. Specifically, the P329 pyrrolidine ring is sandwiched between the indole rings of two tryptophan residues in the binding partner: Trp163 and Trp100 in C1q globular head domains (gC1q), and equivalent aromatic residues in FcgammaR D2 domains. This proline-tryptophan-tryptophan stacking interaction contributes substantial binding energy through CH-pi interactions and hydrophobic packing. Mutation of P329 to glycine eliminates the rigid pyrrolidine ring, replacing it with the most conformationally flexible amino acid. The glycine side chain (a single hydrogen atom) cannot engage in the sandwich interaction, abolishing the critical contact point. The loss of the proline ring also locally increases backbone flexibility in the FG loop, further destabilising the receptor interface. Importantly, P329 is conserved across all four human IgG subclasses, underscoring its fundamental importance for effector engagement.',
    },
    {
      type: 'card',
      title: '2. Mechanistic Synergy of Triple Mutation',
      color: 'teal',
      content:
        'The three mutations in LALA-PG target two distinct but overlapping binding interfaces. L234A and L235A (lower hinge) eliminate the hydrophobic contacts with the primary FcgammaR binding groove, reducing FcgammaR binding by >99%. P329G (CH2 FG loop) disrupts the proline sandwich shared by both FcgammaRs and C1q. The synergy is mechanistically elegant: LALA removes the hinge contribution to receptor binding, while P329G removes the CH2 domain contribution. For C1q specifically, the binding site centres on the CH2 domain face (D270, K322, P329, P331) rather than the lower hinge. LALA alone only indirectly reduces C1q binding (through subtle conformational effects on the CH2 domain), whereas P329G directly ablates the C1q contact. The result is a cooperative silencing where no measurable residual effector function remains. This was quantitatively demonstrated by Schlothauer et al. (Protein Engineering, Design and Selection, 2016), who showed LALA-PG reduced FcgammaRIIIa binding >4,700-fold and C1q binding to undetectable levels.',
    },
    {
      type: 'table',
      title: '3. WT vs LALA vs LALA-PG — Comprehensive Comparison',
      headers: ['Parameter', 'WT IgG1', 'LALA IgG1', 'LALA-PG IgG1'],
      rows: [
        ['FcgammaRI KD', '1-10 nM', '>10 uM (undetectable)', '>10 uM (undetectable)'],
        ['FcgammaRIIa-H131 KD', '500-800 nM', '>50 uM', '>50 uM'],
        ['FcgammaRIIa-R131 KD', '700-1,200 nM', '>50 uM', '>50 uM'],
        ['FcgammaRIIb KD', '1,000-3,000 nM', '>50 uM', '>50 uM'],
        ['FcgammaRIIIa-V158 KD', '100-300 nM', '>30 uM', '>50 uM'],
        ['FcgammaRIIIa-F158 KD', '300-800 nM', '>50 uM', '>50 uM'],
        ['C1q binding (ELISA OD)', '1.5-2.0', '0.3-0.8 (residual)', '<0.05 (undetectable)'],
        ['ADCC (max lysis)', '40-60%', '<2%', '<1% (undetectable)'],
        ['ADCP (phagocytic index)', '50-80', '<5', '<2'],
        ['CDC (max lysis)', '30-70%', '5-15% (residual)', '<1% (undetectable)'],
        ['FcRn KD (pH 6.0)', '~500 nM', '~500 nM', '~500 nM'],
        ['Serum half-life', '18-21 days', '18-21 days', '18-21 days'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: '4. Why LALA-PG Over LALA for New Programmes',
      variant: 'info',
      content:
        'For any new therapeutic programme initiated from 2018 onwards where Fc silencing is required, LALA-PG has become the preferred choice over LALA alone. The rationale is straightforward: LALA-PG provides complete silencing of all three effector pathways (ADCC, ADCP, CDC) without any biophysical or pharmacokinetic penalty. The incremental cost of adding the P329G mutation is zero — it is a single additional point mutation in the expression construct. The benefit is elimination of residual CDC risk, which is particularly important for (a) T-cell bispecific antibodies where any complement activation could cause complement-dependent cytokine release, (b) antibodies targeting antigens on immune effector cells (T cells, NK cells, dendritic cells), and (c) large-dose subcutaneous formulations where complement activation at the injection site could cause local inflammatory reactions. Legacy products approved with LALA alone (e.g., durvalumab) continue to use LALA, as post-approval mutation changes would constitute a new molecular entity.',
    },
    {
      type: 'table',
      title: '5. Clinical-Stage LALA-PG Molecules',
      headers: ['Molecule', 'Target(s)', 'Format', 'Sponsor', 'Indication', 'Stage'],
      rows: [
        ['Cibisatamab (RG7802)', 'CEA x CD3', 'T-cell bispecific (CrossMAb)', 'Roche', 'MSI-H CRC', 'Phase II'],
        ['Glofitamab (Columvi)', 'CD20 x CD3', 'T-cell bispecific (2:1 format)', 'Roche', 'DLBCL', 'Approved (2023)'],
        ['RG6346', 'HBsAg x CD3', 'T-cell bispecific', 'Roche', 'Hepatitis B', 'Phase I'],
        ['MEDI5752', 'PD-1 x CTLA-4', 'Bispecific IgG1', 'AstraZeneca', 'Solid tumours', 'Phase I/II'],
        ['Astegolimab', 'IL-33', 'IgG1 LALA-PG', 'Roche/Genentech', 'Asthma', 'Phase III'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '6. The C1q Binding Site — Why Hinge Mutations Alone Are Insufficient',
      color: 'purple',
      content:
        'C1q binding to IgG Fc is mediated primarily by residues on the CH2 domain surface rather than the lower hinge. The key C1q contact residues (EU numbering) include D270, K322, P329, P331, and A327. The globular head of C1q (gC1q) approaches the Fc from the CH2 face, not through the hinge channel used by FcgammaRs. The LALA mutations at positions 234/235 are located approximately 20 angstroms from the C1q epicentre, and their effect on C1q binding is indirect — primarily through subtle propagated conformational changes in the CH2 domain that partially destabilise the C1q docking surface. In contrast, P329 is located directly within the C1q binding footprint. The proline sandwich (P329 wedged between C1q Trp163 and Trp100) is the single most energetically important contact in the C1q:Fc interaction. By mutating P329 to glycine, LALA-PG directly ablates this contact. This explains the qualitative difference: LALA achieves ~10-40-fold C1q reduction (indirect effect), while LALA-PG achieves complete abolition (direct + indirect effects).',
    },
    {
      type: 'bullets',
      title: '7. CMC Characterisation Package for LALA-PG',
      items: [
        'Identity confirmation: Intact mass spectrometry and peptide mapping confirming A234, A235, and G329 substitutions. Expected mass shift: -84 Da (3x leucine/proline to alanine/glycine).',
        'SPR binding panel: FcgammaRI, FcgammaRIIa (H131 and R131), FcgammaRIIb, FcgammaRIIIa (V158 and F158), FcgammaRIIIb, C1q, and FcRn (pH 6.0 and pH 7.4). All FcgammaR/C1q should report as not determinable.',
        'Cell-based ADCC: Jurkat-FcgammaRIIIa-NFAT-luc reporter bioassay or primary NK cell killing assay. Expected result: no dose-response; signal indistinguishable from isotype negative control.',
        'Cell-based ADCP: Primary monocyte-derived macrophage phagocytosis assay. Expected result: phagocytic index <5% of wild-type positive control.',
        'CDC assay: Complement-replete human serum + target cells. Expected result: <1% lysis at all concentrations (below assay limit of detection).',
        'C1q ELISA: Plate-bound antibody + purified C1q detection. Expected result: OD signal at background level.',
        'Positive controls: Wild-type IgG1 for effector function; LALA (without PG) as intermediate reference; IgG4-S228P or effector-null as negative benchmark.',
        'FcRn confirmation: SPR demonstrating preserved pH-dependent binding (KD ~500 nM at pH 6.0, rapid dissociation at pH 7.4).',
      ],
    },
    {
      type: 'card',
      title: '8. Biophysical Impact Assessment',
      color: 'green',
      content:
        'The addition of P329G to the LALA backbone has negligible impact on the biophysical properties of the molecule. Thermal stability (DSC/DSF) shows CH2 Tm values within 1 degree Celsius of LALA alone (typically 67-71 degrees C). The glycine substitution at position 329 in the FG loop introduces local backbone flexibility but does not destabilise the overall CH2 beta-sandwich fold. Size-exclusion chromatography profiles of LALA-PG molecules are indistinguishable from wild-type in terms of monomer content, aggregate levels, and fragment species. Hydrophobic interaction chromatography retention times are unchanged. Protein A binding (mediated by the CH2-CH3 interface at positions H435, I253, H310, Y436) is fully preserved, allowing standard Protein A capture chromatography without modification. Charge heterogeneity profiles by isoelectric focusing or imaged capillary isoelectric focusing show no significant change. Forced degradation profiles (thermal, oxidative, pH, mechanical stress) of LALA-PG molecules are comparable to their LALA-only counterparts.',
    },
    {
      type: 'callout',
      title: '9. Intellectual Property Landscape',
      variant: 'warning',
      content:
        'The LALA-PG mutation combination is covered by intellectual property originally filed by Roche/Genentech. The key patent families (WO2012130831, US9409989) claim the P329G mutation in combination with L234A/L235A (or similar lower hinge substitutions) for effector function silencing. These patents have been widely licensed within the industry, and many bispecific antibody platforms incorporate LALA-PG under license. For biosimilar developers or companies developing novel molecules with LALA-PG, freedom-to-operate analysis should evaluate the relevant patent estates in each target jurisdiction. Alternative complete silencing strategies that may offer IP freedom include N297A/N297Q (aglycosylation), IgG2-sigma (IgG2 with specific disulfide engineering), and DANP (D265A/N297A combination), though each has distinct biophysical and CMC trade-offs.',
    },
    {
      type: 'table',
      title: '10. Alternative Complete Fc-Silencing Approaches',
      headers: ['Approach', 'Mutations/Changes', 'FcgammaR Silencing', 'C1q/CDC Silencing', 'Half-Life', 'Key Limitation'],
      rows: [
        ['LALA-PG', 'L234A/L235A/P329G', 'Complete', 'Complete', 'Preserved', 'Patent coverage (Roche)'],
        ['N297A/N297Q', 'Aglycosylation', 'Complete', 'Complete', 'Preserved', 'CH2 destabilisation; aggregation risk'],
        ['IgG2-sigma', 'IgG2 + C131S, disulfide engineered', 'Near-complete', 'Near-complete', 'Preserved', 'Complex disulfide isomers; less validated'],
        ['DANP', 'D265A/N297A', 'Complete', 'Complete', 'Preserved', 'Aglycosylation + point mutation; aggregation risk'],
        ['IgG4-PAA', 'S228P/F234A/L235A', 'Complete', 'Complete (IgG4 natural)', 'Preserved', 'IgG4 backbone; different effector biology baseline'],
        ['Fc deletion', 'Fab or scFv only', 'Complete (no Fc)', 'Complete (no Fc)', 'Short (hours)', 'No FcRn recycling; requires alternative half-life extension'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: '11. Critical Regulatory Note',
      variant: 'danger',
      content:
        'When filing an IND/CTA for a LALA-PG molecule, the mutation rationale must be explicitly justified in Module 2.3 (Quality Overall Summary) and Module 3.2.S.1.2 (Structure). Regulators expect a clear explanation of why complete Fc silencing is required for the specific therapeutic application. Simply stating "effector function is not part of the mechanism of action" is insufficient — the filing must address the potential safety risk of residual effector function (e.g., target cell depletion, complement activation, cytokine release) and how LALA-PG mitigates that risk. Additionally, for molecules that transition from LALA to LALA-PG during development, this constitutes a change in molecular entity and requires updated pharmacology and toxicology packages, not simply a CMC amendment.',
    },
  ],
  mentorQuestions: [
    'You are developing a CD3 x tumour-antigen T-cell bispecific. Your lead molecule uses LALA alone. In Phase I, you observe Grade 2 complement-mediated infusion reactions in 15% of patients. How would you evaluate whether upgrading to LALA-PG would address this, and what regulatory strategy would you use for the molecular change?',
    'Compare the risk-benefit profiles of LALA-PG versus N297A (aglycosylation) for Fc silencing in a subcutaneous formulation. Consider biophysical stability, manufacturing, and long-term storage.',
    'A biosimilar company wants to develop a copy of an approved LALA-PG molecule but the LALA-PG patent is still active in their target market. What alternative Fc-silencing strategies could they evaluate, and how would you design the analytical similarity study to demonstrate comparable silencing?',
  ],
};
