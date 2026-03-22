import type { ModuleContent } from '../../types/content';

export const module3: ModuleContent = {
  id: 'cqa-m3',
  sectionId: 'cqa',
  moduleNumber: 3,
  eyebrow: 'CQA 04',
  title: 'Charge Variants — Acidic, Basic & CDR Integrity',
  lead: 'The molecular origins, functional consequences, and analytical characterisation of charge heterogeneity in therapeutic mAbs — from deamidation and sialylation to C-terminal lysine and pyroglutamate, with emphasis on CDR vs. non-CDR risk differentiation.',
  tags: [
    { label: 'Deamidation', color: 'red' },
    { label: 'C-term Lys', color: 'teal' },
    { label: 'iCIEF / CEX', color: 'blue' },
    { label: 'CDR Hotspots', color: 'amber' },
  ],
  stats: [
    { label: 'Acidic Species Sources', value: '5+' },
    { label: 'Basic Species Sources', value: '3+' },
    { label: 'Typical Acidic Spec', value: '15–40%' },
    { label: 'Typical Main Peak', value: '50–75%' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Charge Variant Landscape — Overview',
      color: 'blue',
      content:
        'Charge heterogeneity is an intrinsic feature of every therapeutic mAb, arising from a combination of enzymatic processing (C-terminal lysine clipping, N-terminal cyclisation), non-enzymatic chemical modifications (deamidation, oxidation, glycation), and glycosylation (sialylation adds negative charge). When separated by charge-based methods (iCIEF or cation-exchange chromatography), the resulting profile typically shows three regions: acidic species (more negative charge than the main peak, typically 15-40% of total), main peak (the predominant isoform population, typically 50-75%), and basic species (more positive charge, typically 5-20%). The charge variant profile is a composite fingerprint of the product — changes in the profile indicate process or stability changes and must be understood at the molecular level. CQA classification depends on the specific modification and its location: deamidation in a CDR that reduces target binding is a high-risk CQA, while C-terminal lysine clipping (which occurs rapidly in vivo and has no functional consequence) is a non-CQA despite being the dominant source of charge heterogeneity at release.',
    },
    {
      type: 'card',
      title: 'Acidic Species — Molecular Origins',
      color: 'red',
      content:
        'Acidic species are charge variants migrating cathodic to the main peak (lower pI by iCIEF, earlier elution by CEX). The major molecular origins are: (1) Deamidation — the conversion of Asn to Asp or isoAsp introduces an additional negative charge per site. The reaction proceeds through a cyclic succinimide intermediate, which hydrolyses to a ~3:1 mixture of isoAsp:Asp. The rate is sequence-dependent: Asn-Gly is fastest (t1/2 ~1-2 days at pH 7.4, 37C), followed by Asn-Ser, Asn-His, and Asn-Ala. CDR residues are of particular concern — Asn55 in HC CDR2 (Kabat numbering) is a common hotspot across many mAb sequences. Deamidation at CDR residues can reduce target binding by 2-10 fold if the Asn participates in hydrogen bonding with the antigen. (2) Sialylation — the addition of N-acetylneuraminic acid (Neu5Ac) to galactosylated glycans at Asn297 adds one negative charge per sialic acid residue. Typical mAbs from CHO cells have 1-5% sialylation. Higher sialylation (>10%) can be seen in CHO cells engineered for extended culture. (3) Glycation — the non-enzymatic Maillard reaction between glucose (from cell culture medium) and surface-exposed lysine epsilon-amino groups. Glucose concentrations >10 mM in fed-batch culture promote glycation. Each glycation event masks a positive charge, shifting the species acidic. (4) Citrate adducts — when citrate buffer is used in formulation, citrate can form non-covalent adducts that add negative charge (primarily an artefact in iCIEF but can appear in CEX). (5) Deamidation of Gln to Glu — slower than Asn deamidation but contributes to cumulative acidic shift on storage.',
    },
    {
      type: 'card',
      title: 'Basic Species — Molecular Origins',
      color: 'teal',
      content:
        'Basic species migrate anodic to the main peak (higher pI by iCIEF, later elution by CEX). The principal molecular origins are: (1) C-terminal lysine (Lys449, EU numbering) — the dominant basic species in most mAb preparations. Each heavy chain is synthesised with a C-terminal Lys that is variably clipped by carboxypeptidase B in CHO cell culture. The resulting population contains 0, 1, or 2 Lys residues per molecule, generating three charge states. In vivo, residual C-terminal Lys is rapidly removed by serum carboxypeptidases (t1/2 < 2 hours), so this modification has no functional consequence and is universally classified as a non-CQA. (2) N-terminal pyroglutamate (pyroGlu) — cyclisation of the N-terminal Glu (or Gln) residue to pyroglutamic acid is a common modification that removes one ionisable group per chain, shifting basic. The reaction is slow at 2-8C but accelerates at elevated temperatures. Like C-terminal Lys, pyroGlu has no demonstrated impact on binding or effector function and is typically classified as non-CQA. (3) Succinimide intermediates — the cyclic succinimide formed during deamidation (Asn) or isomerisation (Asp) is itself uncharged, making it more basic than the parent Asp/isoAsp product. Succinimide intermediates are transient but can accumulate at low pH (formulation-relevant pH 5.5-6.0). In CDR regions, succinimide can alter binding more dramatically than the final deamidation product because it distorts the backbone geometry. (4) Amidated C-terminal — rare variant where the C-terminal carboxyl is amidated, removing a negative charge.',
    },
    {
      type: 'table',
      title: 'Charge Variant Origins — Summary Matrix',
      headers: ['Modification', 'Charge Shift', 'Region', 'Rate Driver', 'Functional Impact', 'CQA Status'],
      rows: [
        ['Deamidation (Asn->Asp/isoAsp)', 'Acidic (-1 per site)', 'CDR or Fc', 'pH, temperature, sequence (Asn-Gly fastest)', 'CDR: potency loss 2-10x; Fc Asn384/Asn389: minimal', 'CQA if in CDR; KQA if in Fc'],
        ['Sialylation', 'Acidic (-1 per Sia)', 'Asn297 glycan', 'Cell culture duration, sialyltransferase expression', 'Debated: anti-inflammatory at high levels; CDC reduction', 'KQA to CQA (MoA-dependent)'],
        ['Glycation', 'Acidic (masks +1 per Lys)', 'Surface Lys', 'Glucose concentration in media; culture time', 'CDR Lys: can reduce binding; Fc Lys: minimal impact', 'CQA if CDR Lys affected'],
        ['Gln deamidation', 'Acidic (-1)', 'Any Gln', 'Slow; pH/temperature', 'Usually minor; monitor at labile sites', 'Non-CQA (typically)'],
        ['C-terminal Lys', 'Basic (+1 per Lys)', 'Heavy chain C-terminus', 'Carboxypeptidase B activity in CHO culture', 'None — removed in vivo within hours', 'Non-CQA'],
        ['N-terminal pyroGlu', 'Basic (loss of ionisable group)', 'Heavy/light chain N-terminus', 'Temperature, pH; slow at 2-8C', 'No impact on binding or effector function', 'Non-CQA'],
        ['Succinimide intermediate', 'Basic (uncharged ring)', 'Asn/Asp sites', 'Transient during deamidation/isomerisation; accumulates at low pH', 'CDR: backbone distortion can reduce binding; Fc: minimal', 'CQA if in CDR; monitor if in Fc'],
        ['Asp isomerisation', 'Minimal/Acidic', 'Any Asp (Asp-Gly fastest)', 'pH, temperature, similar to deamidation', 'CDR Asp: potency impact; Fc Asp: stability signal', 'CQA if in CDR'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'CDR vs. Non-CDR Risk Differentiation',
      color: 'amber',
      content:
        'The single most important factor in charge variant CQA classification is whether the modification occurs within a CDR loop or in a framework/Fc region. CDR deamidation can directly reduce antigen binding — for example, deamidation of HC CDR1 Asn33 in trastuzumab reduces HER2 binding affinity by approximately 4-fold, directly impacting potency. Similarly, isomerisation of Asp in CDR can distort the complementarity surface and reduce binding. In contrast, Fc modifications (e.g., deamidation at Asn384 or Asn389 in CH3) have minimal impact on FcRn binding, FcgammaR binding, or stability — these sites are buried and not part of any receptor interface. The practical approach is to map all Asn-Xxx and Asp-Xxx motifs in the mAb sequence, identify which fall within CDR1, CDR2, or CDR3 (Kabat or IMGT numbering), and prioritise these for forced degradation studies and site-specific quantification by peptide mapping. The non-CDR modifications are monitored as stability indicators (they confirm degradation pathway kinetics) but rarely warrant specification unless they are unusually rapid or extensive.',
    },
    {
      type: 'table',
      title: 'Common CDR Deamidation and Isomerisation Hotspots',
      headers: ['Hotspot Motif', 'Location', 'Half-Life (pH 7.4, 37C)', 'Known Examples', 'Impact if Modified'],
      rows: [
        ['Asn-Gly', 'CDR1, CDR2', '1-2 days', 'HC CDR2 Asn55-Gly56 (common germline)', 'High: direct contact residue in many mAbs; 2-10x potency loss'],
        ['Asn-Ser', 'CDR1, CDR3', '7-14 days', 'LC CDR1 Asn30-Ser31', 'Moderate-High: depends on antigen contact involvement'],
        ['Asn-His', 'CDR2', '14-30 days', 'HC CDR2 Asn54-His55', 'Moderate: His can catalyse deamidation; impact varies'],
        ['Asp-Gly', 'CDR1', '10-20 days (isomerisation)', 'HC CDR1 Asp31-Gly32', 'High: isomerisation distorts backbone; succinimide intermediate most damaging'],
        ['Asp-Ser', 'CDR3', '20-40 days (isomerisation)', 'HC CDR3 Asp100-Ser101', 'High: CDR3 is typically the most critical for binding specificity'],
        ['Asn-Thr', 'Framework, CDR1', '30-60 days', 'FR3 conserved Asn; rarely in CDR', 'Low if framework; High if CDR contact residue'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Analytical Methods — iCIEF',
      color: 'green',
      content:
        'Imaged capillary isoelectric focusing (iCIEF) is the primary charge variant method for most mAb programmes. The protein is mixed with carrier ampholytes spanning a defined pH range (typically 3-10 or a narrower range bracketing the mAb pI), loaded into a fluorocarbon-coated capillary, and focused by applying an electric field between acidic anolyte (H3PO4) and basic catholyte (NaOH). After focusing (typically 1 minute pre-focus at 1.5 kV, then 5-10 minutes focus at 3 kV), the entire capillary is imaged simultaneously by UV detection at 280 nm, generating an electropherogram where peaks are separated by pI. Key method parameters: sample concentration (0.2-1 mg/mL), ampholyte concentration and blend (3-5% total, often a 1:1 mix of broad- and narrow-range ampholytes), pI markers for calibration (e.g., pI 7.05 and 9.77 synthetic peptides), urea concentration (0-4 M; urea denatures the molecule, improving resolution but eliminating native charge effects), and methylcellulose coating to suppress electroosmotic flow. iCIEF provides precise pI determination (+-0.05 pH units) and quantitative peak area integration (%acidic, %main, %basic). The method is typically validated to ICH Q2(R2) with a precision of <=2% (relative) for the main peak.',
    },
    {
      type: 'card',
      title: 'Analytical Methods — CEX-HPLC',
      color: 'purple',
      content:
        'Cation-exchange chromatography (CEX-HPLC) is the orthogonal charge variant method. The mAb (positively charged below its pI of ~8-9) binds to a strong cation exchanger (typically sulphopropyl groups on a non-porous or superficially porous resin). Elution is achieved by a salt gradient (NaCl 0-500 mM in phosphate or MES buffer at pH 5.5-7.0) or a pH gradient (using polyamine buffers for linear pH gradients). Salt gradient CEX is simpler to develop but provides lower resolution than pH gradient CEX. The advantage of CEX over iCIEF is that fractions can be collected for identification — individual peaks can be digested and analysed by peptide mapping LC-MS to identify the specific modification in each charge variant. This fraction-identification workflow is critical during development to understand the molecular composition of the acidic and basic regions. Key method parameters: column chemistry and particle size (4 um nonporous for high resolution, 10 um wide-pore for preparative), buffer pH (typically 5.5-6.5 for optimal selectivity), gradient slope (0.5-2%/min NaCl), and temperature (ambient or 30C). CEX resolution is typically sufficient to separate C-terminal Lys variants (0, 1, 2 Lys) as distinct peaks, enabling C-Lys processing to be monitored independently from other modifications.',
    },
    {
      type: 'card',
      title: 'Peptide Mapping for Site-Specific Quantification',
      color: 'pink',
      content:
        'While iCIEF and CEX provide the total charge variant distribution, peptide mapping with LC-MS/MS is required for site-specific quantification of individual modifications. The workflow: (1) Denature the mAb (6M guanidine-HCl or 8M urea, 37C, 30 min). (2) Reduce disulfide bonds (10 mM DTT, 37C, 30 min). (3) Alkylate free cysteines (25 mM iodoacetamide, dark, 30 min). (4) Buffer exchange to digestion buffer (50 mM Tris-HCl, pH 7.5). (5) Digest with trypsin (1:20 enzyme:protein ratio, 37C, 16 hours). (6) Analyse by reversed-phase UPLC (C18, 1.7 um, 300 A) with UV detection at 214 nm and online ESI-MS/MS (Orbitrap or QTOF). For deamidation quantification, the critical measurement is the relative abundance of the deamidated peptide (containing Asp or isoAsp) versus the unmodified peptide (containing Asn). Deamidation produces a +0.9840 Da mass shift, which is resolvable by high-resolution MS. However, chromatographic separation of Asn/Asp/isoAsp isomers requires optimised conditions — isoAsp elutes slightly later than Asp on C18 under acidic conditions. For succinimide intermediates (which have a -18.0106 Da mass shift relative to the Asp product), rapid sample handling at neutral pH is essential to prevent ex vivo succinimide hydrolysis during sample preparation.',
    },
    {
      type: 'callout',
      title: 'Specification Setting for Charge Variants',
      variant: 'info',
      content:
        'Charge variant specifications are typically set using a combination of manufacturing experience, clinical lot ranges, and stability data. The approach: (1) Establish the manufacturing range from process validation batches (minimum 3 PPQ lots, ideally 10+ commercial batches for a mature process). (2) Overlay the clinical lot ranges — all material administered in Phase I-III clinical trials that demonstrated acceptable safety and efficacy. (3) Set the specification at the outer boundary of the clinical range plus a statistical margin (typically the clinical range mean +/- 3 standard deviations, constrained by the process capability). For a typical IgG1 mAb: %Acidic 15-40%, %Main 50-75%, %Basic 5-20%. However, these ranges are highly molecule-specific because the number and kinetics of labile sites vary. A molecule with a fast-deamidating CDR Asn-Gly will have a much broader acidic region than one with only Fc-region Asn sites. The stability specification must account for the expected shift on storage (typically 3-10% acidic increase over 24 months at 2-8C).',
    },
    {
      type: 'callout',
      title: 'Forced Degradation — Identifying Charge Variant Sources',
      variant: 'warning',
      content:
        'Forced degradation (stress testing per ICH Q1A/Q5C) is essential for identifying which modifications drive charge variant changes. The standard panel: (1) Thermal stress: 40C/2 weeks accelerates deamidation and isomerisation — compare iCIEF profile shift to 2-8C control. (2) Oxidative stress: 0.1% H2O2/24 hours at 25C — if charge profile shifts, oxidation is contributing (Met oxidation itself is charge-neutral but can co-occur with other modifications). (3) High-pH stress: pH 8.5/40C/1 week — dramatically accelerates Asn deamidation (rate doubles per 0.5 pH unit increase above pH 6). (4) Low-pH stress: pH 3.5/25C/2 weeks — promotes succinimide formation (stable at low pH) and Asp isomerisation. (5) Light stress: ICH Q1B conditions (1.2M lux-hours visible, 200 W-hr/m2 UV) — photo-induced modifications including His oxidation and Trp degradation can alter charge profile. Each stressed sample is analysed by iCIEF, CEX, and peptide mapping to correlate the charge shift with specific site-level modifications.',
    },
  ],
  mentorQuestions: [
    'Your iCIEF results show that %acidic species increased from 22% at release to 35% after 18 months at 2-8C. Peptide mapping reveals that 80% of this increase is attributable to deamidation at HC CDR2 Asn55. How does this inform your specification strategy, and would you consider engineering the Asn55 site out?',
    'A reviewer challenges your classification of C-terminal lysine as a non-CQA, arguing that it changes the charge profile by 15% and therefore must be "critical." How do you defend the non-CQA classification using the Alt et al. impact scoring framework?',
    'You are developing a biosimilar and notice that your charge variant profile by iCIEF differs from the reference product — your main peak is 62% vs. the reference at 68%, with a corresponding increase in acidic species. What molecular investigations would you conduct, and how would you assess the clinical relevance of this difference?',
  ],
};
