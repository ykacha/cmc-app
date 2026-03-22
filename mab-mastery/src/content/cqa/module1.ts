import type { ModuleContent } from '../../types/content';

export const module1: ModuleContent = {
  id: 'cqa-m1',
  sectionId: 'cqa',
  moduleNumber: 1,
  eyebrow: 'CQA 02',
  title: 'Risk Ranking & Alt et al. Methodology',
  lead: 'The quantitative risk-ranking framework from Alt et al. (2016) that transformed CQA assessment from subjective opinion into a structured, defensible scoring system — including worked examples for every major mAb quality attribute.',
  tags: [
    { label: 'Alt et al. 2016', color: 'blue' },
    { label: 'Risk Ranking', color: 'amber' },
    { label: 'Impact Scoring', color: 'red' },
    { label: 'Uncertainty', color: 'teal' },
  ],
  stats: [
    { label: 'Impact Categories', value: '4' },
    { label: 'Impact Scale', value: '2–20 each' },
    { label: 'Uncertainty Scale', value: '1–7' },
    { label: 'Max Risk Score', value: '140' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Alt et al. 2016 — Origin and Rationale',
      color: 'blue',
      content:
        'The Alt, Moreadith, and Bader (2016) paper "Biopharmaceutical Development — A Risk-Based Approach to Define Critical Quality Attributes" (published in Biopharm International and subsequently adopted widely across the industry) addressed a fundamental problem: the lack of a standardised, quantitative methodology for CQA classification. Prior to this framework, companies used ad hoc approaches — some relied on expert opinion alone, others borrowed FMEA severity/occurrence/detection scales designed for small molecules, and many simply copied CQA lists from platform molecules without molecule-specific assessment. Alt et al. proposed a semi-quantitative risk-ranking matrix that evaluates each potential CQA (pCQA) across four clinical impact categories and one uncertainty dimension. The key innovation was separating impact (an intrinsic property of the attribute) from uncertainty (a measure of available knowledge), then combining them multiplicatively to generate a single risk score that drives classification. The framework has since been adopted or adapted by numerous biopharmaceutical companies and is explicitly referenced in regulatory submissions and FDA advisory committee briefing documents.',
    },
    {
      type: 'card',
      title: 'The Four Impact Categories',
      color: 'teal',
      content:
        'Each pCQA is scored across four clinical impact categories, each on a scale of 2 (no/negligible impact) to 20 (severe/direct impact). The categories are: (1) Biological Activity — does variation in this attribute alter the primary mechanism of action? For ADCC-dependent mAbs, afucosylation scores 20 because it directly modulates FcgammaRIIIa binding and ADCC potency. For a blocking antibody, it might score only 4. (2) Pharmacokinetics/Pharmacodynamics (PK/PD) — does variation affect drug exposure, clearance, or half-life? High-mannose glycans score 8-12 because mannose receptor-mediated clearance accelerates PK. Aggregates score moderately because large aggregates are cleared faster via the reticuloendothelial system. (3) Immunogenicity — could variation increase the risk of anti-drug antibody (ADA) formation? Aggregates score 12-16 because multivalent repetitive epitope presentation activates B cells via cross-linking of surface IgM. Novel glycan epitopes (alpha-Gal, Neu5Gc) score 12-16 due to pre-existing antibodies. (4) Safety — could variation cause direct toxicity independent of immunogenicity? HCP contaminants score 12-20 depending on the specific hitchhiker protein (e.g., PLBL2 caused clinical hypersensitivity). Residual Protein A scores 12-16 due to anti-Protein A antibody responses observed clinically.',
    },
    {
      type: 'table',
      title: 'Impact Scoring Scale (2–20 per Category)',
      headers: ['Score', 'Severity', 'Criteria', 'Example'],
      rows: [
        ['2', 'None/Negligible', 'No detectable impact on the category even at extreme variation', 'C-terminal Lys on Biological Activity'],
        ['4', 'Minimal', 'Detectable in vitro effect but no in vivo relevance demonstrated', 'Galactosylation on PK (minor CDC modulation)'],
        ['8', 'Low-Moderate', 'In vivo effect demonstrated in animal models but clinical significance uncertain', 'High-mannose on PK (mannose receptor clearance in mice)'],
        ['12', 'Moderate', 'Clinical relevance probable based on class knowledge or limited clinical data', 'Aggregates on Immunogenicity (B-cell cross-linking)'],
        ['16', 'High', 'Clinical relevance demonstrated for this molecule class', 'Afucosylation on ADCC for anti-CD20 IgG1'],
        ['20', 'Severe/Direct', 'Definitive clinical impact proven for this specific molecule', 'Afucosylation on BioActivity for ADCC-dependent oncology mAb'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Uncertainty Scoring (1–7)',
      color: 'amber',
      content:
        'The uncertainty dimension captures how confident you are in the impact scores. It is scored on a scale of 1 (high certainty) to 7 (very high uncertainty). Score 1 — definitive data from this specific molecule in clinical studies (e.g., glycovariant clinical lots with PK/efficacy correlation). Score 2 — strong data from the same molecule in preclinical studies plus class knowledge from approved biosimilars. Score 3 — robust class knowledge from multiple approved molecules in the same format (e.g., IgG1 ADCC data from rituximab, obinutuzumab, mogamulizumab). Score 4 — moderate class knowledge plus limited molecule-specific data (e.g., forced degradation studies showing CDR oxidation reduces binding). Score 5 — general platform knowledge without molecule-specific confirmation (e.g., general understanding that deamidation in CDR can reduce potency, but no data for this specific CDR sequence). Score 6 — limited or conflicting literature data (e.g., sialylation effects on anti-inflammatory activity — context-dependent). Score 7 — no published data, novel attribute, or novel format (e.g., impact of a novel engineered glycan on a bispecific). The critical principle: when uncertainty is high, the framework defaults to conservative classification (treat as CQA until data prove otherwise).',
    },
    {
      type: 'card',
      title: 'Risk Score Calculation: Risk = max(Impact) x Uncertainty',
      color: 'red',
      content:
        'The risk score is computed as the maximum impact score across all four categories multiplied by the uncertainty score. Using the maximum rather than the average or sum ensures that a single high-impact category drives the classification — this prevents dilution of critical safety or efficacy signals by low scores in other categories. For example, if an attribute scores Impact = [4, 4, 16, 4] (high immunogenicity but low everything else), the max(Impact) = 16, and with Uncertainty = 3, the Risk = 16 x 3 = 48 (Medium — classified as CQA). The classification thresholds are: High Risk (>84): definitive CQA, mandatory release specification with tight acceptance criteria. Medium Risk (28–84): CQA requiring specification; range may be wider than high-risk attributes, or may be monitored through in-process controls. Low Risk (<28): non-CQA or KQA; characterisation testing sufficient, no release specification required unless warranted by additional considerations.',
    },
    {
      type: 'table',
      title: 'Risk Classification Thresholds',
      headers: ['Risk Score Range', 'Classification', 'Control Strategy', 'Regulatory Expectation'],
      rows: [
        ['>84', 'High Risk — CQA', 'Tier 1 release specification with tight acceptance criteria; real-time monitoring', 'Specification in CoA; stability program; comparability upon change'],
        ['28–84', 'Medium Risk — CQA', 'Tier 1/2 release or stability specification; may use wider ranges', 'Specification or justified in-process control; stability monitoring'],
        ['<28', 'Low Risk — Non-CQA', 'Tier 3/4 characterisation only; one-time or periodic testing', 'Document in development report; no routine specification required'],
      ],
    },
    {
      type: 'table',
      title: 'Worked Scoring Example — Six Key mAb Attributes (ADCC-Dependent IgG1)',
      headers: ['Attribute', 'BioActivity (2-20)', 'PK/PD (2-20)', 'Immunogenicity (2-20)', 'Safety (2-20)', 'max(Impact)', 'Uncertainty (1-7)', 'Risk Score', 'Class'],
      rows: [
        ['Afucosylation', '20', '4', '2', '4', '20', '2', '40', 'CQA (Medium)'],
        ['Galactosylation', '8', '4', '2', '2', '8', '4', '32', 'CQA (Medium)'],
        ['High-Mannose', '4', '12', '2', '2', '12', '3', '36', 'CQA (Medium)'],
        ['Aggregates', '4', '8', '16', '12', '16', '2', '32', 'CQA (Medium)'],
        ['Charge Variants (CDR deamidation)', '16', '4', '2', '2', '16', '3', '48', 'CQA (Medium)'],
        ['Met252 Oxidation', '4', '12', '2', '2', '12', '3', '36', 'CQA (Medium)'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Worked Example: Afucosylation Scoring Walkthrough',
      color: 'green',
      content:
        'Consider afucosylation for an ADCC-dependent anti-CD20 IgG1 (rituximab-like). Biological Activity: Score 20. Afucosylation at Asn297 directly controls FcgammaRIIIa (CD16a) binding affinity — a 50-fold increase in ADCC potency has been demonstrated with fully afucosylated mAbs (Shields et al., 2002; Shinkawa et al., 2003). For an ADCC-dependent mechanism, this is the most impactful single attribute. PK/PD: Score 4. Afucosylation has minimal direct effect on FcRn binding and serum half-life. Some evidence suggests mannose receptor engagement at extreme afucosylation levels could marginally affect clearance, but this is generally negligible within typical manufacturing ranges (5-15% afucosylation). Immunogenicity: Score 2. Core fucose is a human glycan; its absence does not introduce foreign epitopes. No evidence links afucosylation levels to ADA formation. Safety: Score 4. Enhanced ADCC could theoretically exacerbate on-target toxicity (e.g., B-cell depletion in healthy tissues), but this is a mechanism-related effect rather than a quality attribute safety concern per se. max(Impact) = 20. Uncertainty: Score 2. Extensive published clinical and preclinical data across multiple molecules (obinutuzumab, mogamulizumab, benralizumab) confirm the ADCC-afucosylation relationship. Risk = 20 x 2 = 40, classified as Medium-Risk CQA with a Tier 1 release specification.',
    },
    {
      type: 'card',
      title: 'Worked Example: Aggregates Scoring Walkthrough',
      color: 'purple',
      content:
        'Consider soluble aggregates (dimer/oligomer by SEC) for the same ADCC-dependent IgG1. Biological Activity: Score 4. Aggregates generally have reduced target binding on a molar basis (steric occlusion of one or both Fab arms), but the primary concern for aggregates is not efficacy loss — it is immunogenicity and safety. PK/PD: Score 8. Large aggregates (>100 nm) are cleared rapidly via the reticuloendothelial system, reducing systemic exposure. Soluble dimers may have modestly altered PK. The PK impact is real but moderate. Immunogenicity: Score 16. This is the dominant concern. Aggregated mAbs present repetitive epitopes that cross-link B-cell surface IgM receptors, bypassing the need for T-cell help and potentially breaking tolerance. Rosenberg (2006) and Ratanji (2014) established the immunogenicity risk hierarchy: subvisible aggregates (0.1-10 um) are particularly potent because they are in the optimal size range for dendritic cell uptake and antigen presentation. Safety: Score 12. Beyond immunogenicity-mediated ADA, aggregates can cause infusion-related reactions through complement activation (C3a/C5a anaphylatoxin generation) and Fc-gamma receptor cross-linking on mast cells and basophils. max(Impact) = 16. Uncertainty: Score 2. Decades of clinical experience across hundreds of mAb products confirm the aggregate-immunogenicity-safety relationship. Risk = 16 x 2 = 32, classified as Medium-Risk CQA with Tier 1 release specification (typically <=2% by SEC).',
    },
    {
      type: 'bullets',
      title: 'MoA-Dependent Scoring — How Mechanism Shifts Impact Scores',
      items: [
        'ADCC-dependent oncology mAb (anti-CD20 IgG1): Afucosylation BioActivity = 20 (directly controls ADCC). Galactosylation BioActivity = 8 (CDC modulation relevant as secondary mechanism). Risk profile dominated by glycosylation and effector function attributes.',
        'Ligand-blocking mAb (anti-TNF IgG1): Afucosylation BioActivity = 4 (effector function not the primary MoA — target neutralization is). CDR integrity attributes (deamidation, oxidation, isomerization) score BioActivity = 16-20. Risk profile shifts toward structural stability and CDR chemical modifications.',
        'Immune checkpoint inhibitor (anti-PD-1 IgG4): Afucosylation BioActivity = 2 (IgG4 has inherently low effector function; Fc-silencing mutations further reduce relevance). Fab-arm exchange risk becomes a unique pCQA: BioActivity = 16, Uncertainty = 3 (well-characterised for IgG4 class). S228P hinge mutation status is a critical design attribute.',
        'ADC (antibody-drug conjugate): Drug-to-antibody ratio (DAR) becomes a CQA: BioActivity = 20, Uncertainty = 2. Unconjugated mAb fraction and free drug levels emerge as high-priority pCQAs not present in naked mAb assessments. Glycosylation may still matter if ADCC contributes to the MoA (e.g., trastuzumab emtansine).',
      ],
    },
    {
      type: 'callout',
      title: 'Common Pitfall — Anchoring Bias in Expert Panels',
      variant: 'warning',
      content:
        'A well-documented failure mode in risk-ranking exercises is anchoring bias: the first attribute scored in a panel session sets an implicit reference point that skews all subsequent scores. If the panel starts with aggregates (which most experts intuitively rate as high-risk), subsequent attributes may be scored lower than warranted by comparison. Best practice: (1) Score all four impact categories independently before combining. (2) Use anonymised individual scoring before panel discussion (Delphi method). (3) Include at least one subject matter expert per impact category (cell biologist for BioActivity, PK scientist for PK/PD, immunologist for Immunogenicity, toxicologist for Safety). (4) Document the rationale for each score, not just the number. (5) Perform a calibration exercise using a well-characterised reference attribute before scoring the target molecule.',
    },
    {
      type: 'callout',
      title: 'Regulatory Application — Presenting Risk Scores in CTD',
      variant: 'info',
      content:
        'When presenting the Alt et al. risk-ranking results in a regulatory submission (CTD Module 3.2.P.2), include: (1) the complete scoring matrix with all pCQAs, all four impact scores, the uncertainty score, and the resulting risk classification; (2) the composition and expertise of the risk assessment panel; (3) the literature references and internal data supporting each impact score; (4) a clear statement of the classification thresholds and their rationale; (5) a summary of how the CQA classification maps to the control strategy (which CQAs have release specifications, which are monitored on stability, which are characterisation-only). FDA reviewers may challenge individual scores — having documented rationale for each number (not just the final classification) is essential for a defensible submission.',
    },
  ],
  mentorQuestions: [
    'The Alt et al. framework uses max(Impact) rather than the average or sum of impact scores. What is the scientific rationale for this design choice, and can you construct a scenario where using the average would lead to a dangerous misclassification?',
    'Your ADCC-dependent anti-CD20 mAb is being repurposed as a B-cell depletion therapy for autoimmune disease, where the MoA shifts from tumour cell killing to immune modulation. How would you re-score afucosylation and aggregates in the new therapeutic context?',
    'An expert panelist argues that Met252 oxidation should receive an Uncertainty score of 1 because "everyone knows Met oxidation affects FcRn binding." How would you challenge this, and what molecule-specific data would you require before accepting a score of 1?',
  ],
};
