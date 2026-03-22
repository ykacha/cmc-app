import type { ModuleContent } from '../../types/content';

export const module5: ModuleContent = {
  id: 'cqa-m5',
  sectionId: 'cqa',
  moduleNumber: 5,
  eyebrow: 'CQA 06',
  title: 'Oxidation — Met, Trp & Forced Degradation',
  lead: 'The oxidation-susceptible residues in therapeutic mAbs, their specific functional consequences on FcRn binding, effector function, and target engagement, and the forced degradation strategies used to map the oxidation landscape.',
  tags: [
    { label: 'Met252/Met428', color: 'red' },
    { label: 'Trp Oxidation', color: 'amber' },
    { label: 'FcRn Binding', color: 'blue' },
    { label: 'HIC / Peptide Map', color: 'teal' },
  ],
  stats: [
    { label: 'Key Met Sites', value: 'Met252, Met428' },
    { label: 'FcRn KD Shift (Met252-ox)', value: '~3-5 fold' },
    { label: 'Half-Life Reduction', value: '20-30%' },
    { label: 'Detection Methods', value: '3 orthogonal' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Oxidation as a CQA — Biological Rationale',
      color: 'blue',
      content:
        'Methionine and tryptophan oxidation are among the most clinically consequential chemical degradation pathways for therapeutic mAbs. Unlike deamidation (which primarily affects charge), oxidation directly alters the hydrophobic packing that maintains higher-order structure and receptor binding. The clinical significance depends entirely on the specific residue oxidised: Met252 and Met428 in the Fc CH3 domain are at the FcRn binding interface and their oxidation directly impairs FcRn-mediated recycling, reducing serum half-life by 20-30%. CDR tryptophan oxidation can reduce antigen binding by disrupting the hydrophobic core of the antigen-binding site. In contrast, surface-exposed Met residues in framework regions (e.g., Met82 in VH FR3) may oxidise readily but have negligible functional impact. This site-specificity demands a residue-level oxidation map for each molecule, generated through forced degradation studies and confirmed by peptide mapping, before CQA classification decisions are made.',
    },
    {
      type: 'card',
      title: 'Met252 — The FcRn Critical Residue',
      color: 'red',
      content:
        'Met252 (EU numbering, located in the CH2-CH3 interface of the Fc region) is the single most important oxidation-sensitive residue for mAb PK. The molecular mechanism: Met252 sits at the hydrophobic core of the FcRn binding pocket, where the Fc CH2-CH3 hinge region contacts FcRn alpha-chain His310 and Ile253. Oxidation of Met252 to methionine sulfoxide (Met-SO) introduces a polar sulfoxide group that disrupts the hydrophobic packing, weakening the Fc-FcRn interaction. The KD for FcRn binding increases 3-5 fold upon Met252 oxidation (from ~1 uM to 3-5 uM at pH 6.0), which translates to reduced endosomal recycling efficiency and a clinically measurable 20-30% reduction in serum half-life. Wang et al. (2011) demonstrated this with oxidized IgG1 variants in cynomolgus monkeys — Met252-oxidised material showed significantly faster clearance than unmodified material, with AUC reductions of 25-35%. The oxidation rate of Met252 is relatively slow under standard 2-8C storage (typically <2% increase per year in well-formulated product) but accelerates dramatically under oxidative stress or at elevated temperatures.',
    },
    {
      type: 'card',
      title: 'Met428 — The Secondary Fc Oxidation Site',
      color: 'amber',
      content:
        'Met428 (EU numbering, in the CH3 domain) is the second FcRn-relevant oxidation site, located near but not directly within the FcRn binding interface. Met428 oxidation has a more modest effect on FcRn binding than Met252 (~1.5-2 fold KD increase), but the two sites often co-oxidise under stress conditions because both are partially solvent-exposed in the CH2-CH3 interface region. The combined oxidation of Met252 + Met428 has an additive or slightly synergistic effect, with FcRn binding reductions of 5-8 fold. Interestingly, the "YTE" mutations (M252Y/S254T/T256E) used in some half-life-extended mAbs (e.g., motavizumab-YTE, MEDI8897) replace Met252 with tyrosine, eliminating the Met252 oxidation liability entirely — this is a molecular design solution to a CQA problem. Met428 is also the site of the "LS" mutation (M428L/N434S) used in other half-life extension strategies (e.g., ravulizumab, ALXN1210), which similarly eliminates the Met428 oxidation concern. For standard IgG1 without these mutations, both Met252 and Met428 oxidation must be monitored as stability-indicating CQAs.',
    },
    {
      type: 'card',
      title: 'CDR Tryptophan Oxidation',
      color: 'purple',
      content:
        'Tryptophan residues in CDR loops are uniquely vulnerable to oxidation because: (1) Trp has the lowest ionisation potential of the 20 amino acids, making it the most susceptible to photo-oxidation and reactive oxygen species. (2) CDR Trp residues are frequently surface-exposed (participating in antigen contact through aromatic stacking and hydrophobic interactions) rather than buried in the hydrophobic core. (3) Photo-oxidation of Trp generates multiple products — kynurenine (Kyn, +4 Da), N-formylkynurenine (NFK, +32 Da), hydroxytryptophan (OH-Trp, +16 Da), and dioxindolylalanine (DiOia) — each with distinct spectroscopic and chromatographic properties. The clinical impact of CDR Trp oxidation depends on the specific role of the Trp in antigen binding. If the Trp forms a critical aromatic stacking interaction with the antigen (common in anti-hapten and anti-peptide antibodies), oxidation can reduce binding by 5-50 fold. For mAbs where CDR Trp is framework-adjacent and does not contact antigen, the impact may be negligible. Forced degradation with H2O2 (0.01-1%) or ICH Q1B light stress is used to identify susceptible CDR Trp residues and quantify the binding impact of oxidation variants.',
    },
    {
      type: 'table',
      title: 'Oxidation-Susceptible Residues — Impact Summary',
      headers: ['Residue', 'Location', 'Oxidation Product', 'Mass Shift', 'Functional Impact', 'Rate Driver', 'CQA Status'],
      rows: [
        ['Met252', 'CH2-CH3 interface (Fc)', 'Met sulfoxide (Met-SO)', '+16 Da', 'FcRn binding reduced 3-5x; half-life decreased 20-30%', 'H2O2, metals, temperature', 'CQA — PK impact'],
        ['Met428', 'CH3 domain (Fc)', 'Met sulfoxide', '+16 Da', 'FcRn binding reduced 1.5-2x; additive with Met252', 'Same as Met252; co-oxidises', 'CQA — PK impact'],
        ['CDR Trp (variable)', 'CDR1, CDR2, CDR3', 'Kynurenine (+4), NFK (+32), OH-Trp (+16)', 'Variable', 'Target binding reduced 5-50x if contact residue', 'Light (UV), H2O2, singlet oxygen', 'CQA if contact residue'],
        ['Met82 (VH FR3)', 'Framework 3', 'Met sulfoxide', '+16 Da', 'Minimal — surface-exposed but not at binding interface', 'H2O2, metals', 'Non-CQA (typically)'],
        ['Met358 (CH3)', 'CH3 domain', 'Met sulfoxide', '+16 Da', 'Minimal — no receptor interface involvement', 'H2O2, metals', 'Non-CQA'],
        ['His (various)', 'CDR or framework', '2-oxo-His', '+16 Da', 'Variable — depends on location; photo-oxidation product', 'UV light primarily', 'Molecule-specific assessment'],
        ['Cys (free)', 'Terminal Cys or unpaired', 'Cystine, sulfinic/sulfonic acid', '+32/+48 Da', 'Can promote disulfide scrambling and aggregation', 'Metals, oxidative stress', 'KQA — process control'],
      ],
      sortable: true,
    },
    {
      type: 'table',
      title: 'Forced Degradation Protocol for Oxidation',
      headers: ['Stress Condition', 'Protocol', 'Target Degradation', 'Primary Oxidation Sites Revealed', 'Key Controls'],
      rows: [
        ['H2O2 oxidative stress', '0.01-1% H2O2, 25C, 2-24 hr; quench with catalase or methionine', '10-30% total oxidation', 'Met252, Met428, Met82, surface Met; dose-dependent', 'Include non-stressed control; quench completely before analysis'],
        ['Transition metal stress', '10-100 uM Fe2+/Cu2+ with H2O2 (Fenton), 25C, 2-24 hr', '10-20%', 'Same Met sites; also His oxidation (metal-catalysed)', 'Chelator (DTPA) in control; metal levels mimic worst-case container leaching'],
        ['ICH Q1B light stress', '1.2M lux-hr visible + 200 W-hr/m2 UV-A (ICH Q1B Option 2)', 'Variable', 'CDR Trp (primary photo-target), His, Tyr; protein-specific', 'Dark control; wrapped sample for temperature control; photoprotective packaging assessment'],
        ['Thermal acceleration', '40C/75%RH, 1-3 months', '3-10% Met-SO at Met252', 'Met252 > Met428 > surface Met; Trp slow at 40C', 'Compare to 5C/25C stability for rate extrapolation'],
        ['Ambient light exposure', 'Fluorescent light 1000-5000 lux, 4-12 weeks at 25C', '1-5%', 'CDR Trp if light-sensitive; secondary packaging assessment', 'Assesses in-use conditions; informs secondary packaging requirements'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Analytical Detection — HIC',
      color: 'teal',
      content:
        'Hydrophobic interaction chromatography (HIC) is a powerful orthogonal method for detecting oxidation because methionine sulfoxide is less hydrophobic than methionine, causing oxidised species to elute earlier on HIC columns. The assay uses a butyl or propyl HIC column (e.g., TSKgel Butyl-NPR, 4.6 x 35 mm) with a decreasing ammonium sulfate gradient (1.5 M to 0 M (NH4)2SO4 in 50 mM phosphate, pH 7.0) at 25C, detecting at 214/280 nm. HIC provides intact-level oxidation profiling without denaturation, preserving the native conformation and allowing assessment of how oxidation affects surface hydrophobicity. The resolution is sufficient to separate native, singly-oxidised (Met252 or Met428), and doubly-oxidised (Met252 + Met428) species as distinct peaks. HIC is increasingly used as a release/stability method for oxidation monitoring because it is simpler and faster than peptide mapping, though it provides less site-specific information. HIC can also detect Trp oxidation products (kynurenine/NFK) because they alter surface hydrophobicity, though the chromatographic shift direction depends on the product and location.',
    },
    {
      type: 'card',
      title: 'Analytical Detection — Peptide Mapping LC-MS/MS',
      color: 'green',
      content:
        'Peptide mapping with LC-MS/MS is the gold standard for site-specific oxidation quantification. After tryptic digestion, the oxidised peptide containing Met-SO (+15.9949 Da) is chromatographically resolved from the unmodified peptide on reversed-phase C18 (Met-SO peptide elutes slightly earlier due to increased polarity). The extracted ion chromatogram (XIC) for the oxidised and unmodified peptide masses enables quantification as: %Oxidation = Area(oxidised) / [Area(oxidised) + Area(unmodified)] x 100. Critical method considerations: (1) Minimise artifactual oxidation during sample preparation — include 10 mM methionine in digestion buffer as a radical scavenger, avoid exposure to light, process samples under nitrogen. (2) Validate the linearity of XIC quantification by spiking known ratios of oxidised and unmodified reference peptides. (3) For Trp oxidation products (NFK, Kyn, OH-Trp), each product must be quantified separately because they have different mass shifts and ionisation efficiencies. (4) Typical release data: Met252 oxidation 2-5% (initial), with a stability trend of 0.5-1.5% increase per year at 2-8C. Specifications are typically set at <=10-15% total Fc Met oxidation (Met252 + Met428 combined).',
    },
    {
      type: 'card',
      title: 'Tryptophan Fluorescence — Rapid Screening',
      color: 'pink',
      content:
        'Intrinsic tryptophan fluorescence provides a rapid, label-free method to screen for Trp oxidation. Native Trp has a characteristic fluorescence emission at 330-340 nm when excited at 280 nm. Oxidation products (kynurenine, NFK) have dramatically altered fluorescence — kynurenine fluoresces at 480 nm (yellow-green), providing a spectroscopic fingerprint for Trp degradation. The assay: excite the mAb sample (0.1-1 mg/mL in formulation buffer) at 295 nm (selective for Trp, avoiding Tyr excitation), and record the emission spectrum from 300-550 nm. A decrease in 330-340 nm intensity combined with an increase in 400-480 nm intensity indicates Trp oxidation. The method is semi-quantitative (useful for screening and trending) but not site-specific — it reports total Trp modification across all sites. For site specificity, follow up with peptide mapping. Tryptophan fluorescence is particularly useful for photostability assessment (ICH Q1B) because light-induced Trp oxidation is the primary photo-degradation pathway for most mAbs.',
    },
    {
      type: 'bullets',
      title: 'Oxidation Control Strategy — Formulation and Process Levers',
      items: [
        'Formulation: Include methionine (5-10 mM) as an antioxidant sacrificial scavenger — methionine in the formulation buffer oxidises preferentially, protecting protein Met residues. This is now standard practice for most commercial mAb formulations.',
        'pH optimisation: Methionine oxidation rate is minimally pH-dependent (unlike deamidation), but the stability of the sulfoxide product varies. Formulation pH 5.5-6.5 is acceptable for oxidation control.',
        'Chelators: Include EDTA or DTPA (0.01-0.05 mM) to chelate transition metals (Fe2+, Cu2+) that catalyse Fenton-type oxidation reactions. Particularly important when using stainless steel processing equipment.',
        'Headspace control: Minimise dissolved oxygen in the drug product by nitrogen overlay during filling. Residual DO contributes to long-term oxidation. Target <1 ppm headspace oxygen for sensitive molecules.',
        'Light protection: Secondary packaging (carton) is the primary defence against photo-oxidation of CDR Trp. Amber glass vials provide additional UV filtration. Label the product "Protect from Light" if ICH Q1B studies show sensitivity.',
        'Process: Avoid H2O2 sanitisation of downstream equipment or demonstrate complete rinse removal. Control cell culture DO to minimise oxidative stress during production. Monitor peroxide in excipient lots (PS80 peroxides are a common root cause of oxidation).',
      ],
    },
    {
      type: 'callout',
      title: 'Polysorbate Degradation — The Hidden Oxidation Source',
      variant: 'danger',
      content:
        'Polysorbate 80 (PS80) degradation is an increasingly recognised root cause of protein oxidation in drug product. PS80 undergoes both auto-oxidation (generating peroxides, aldehydes, and short-chain fatty acids) and enzymatic hydrolysis (by residual CHO lipases such as PLBL2, LPL, and LPLA2). The peroxide species generated by PS80 auto-oxidation (organic hydroperoxides, ROOH) directly oxidise Met252 and Met428, with kinetics that depend on PS80 lot quality, storage temperature, and light exposure. Mitigation: (1) Screen PS80 lots for peroxide value (<10 mEq/kg at receipt). (2) Store PS80 under nitrogen at 2-8C. (3) Include methionine in formulation to quench peroxide radicals. (4) Monitor PS80 concentration on stability (loss of PS80 indicates degradation). (5) For products with high PS80 sensitivity, consider PS20 (less auto-oxidation-prone) or poloxamer 188 as alternative surfactants.',
    },
  ],
  mentorQuestions: [
    'Your stability data show Met252 oxidation increasing from 3% at release to 8% at 18 months (2-8C). FcRn binding data on a forced-oxidised sample (25% Met252-ox) show a 4-fold KD reduction. How would you model the PK impact of 8% Met252 oxidation at the end of shelf life, and is this clinically acceptable?',
    'You discover that CDR HC Trp33 oxidises to 12% kynurenine after ICH Q1B light stress, with a corresponding 40% reduction in target binding. The product is packaged in a carton (secondary packaging). How do you set the oxidation specification and what in-use stability data do you need?',
    'A competitor mAb uses the YTE mutation (M252Y) to extend half-life and simultaneously eliminates the Met252 oxidation CQA. Your mAb uses the LS mutation (M428L/N434S). Compare the CQA implications of each approach — which residual oxidation liabilities remain for each?',
  ],
};
