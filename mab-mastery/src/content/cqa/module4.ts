import type { ModuleContent } from '../../types/content';

export const module4: ModuleContent = {
  id: 'cqa-m4',
  sectionId: 'cqa',
  moduleNumber: 4,
  eyebrow: 'CQA 05',
  title: 'Glycosylation CQAs — MoA-Dependent Classification',
  lead: 'A systematic framework for classifying glycan attributes as CQAs based on mechanism of action — from ADCC-driven afucosylation to PK-impacting high-mannose, with quantitative impact data and specification-setting rationale for each glycoform.',
  tags: [
    { label: 'Afucosylation', color: 'red' },
    { label: 'High-Mannose', color: 'amber' },
    { label: 'Sialylation', color: 'purple' },
    { label: 'MoA-Dependent', color: 'blue' },
  ],
  stats: [
    { label: 'Key Glycan Attributes', value: '6' },
    { label: 'Fc Glycosylation Site', value: 'Asn297' },
    { label: 'Dominant Glycoform', value: 'G0F (~50%)' },
    { label: 'ADCC Enhancement', value: '~50x (afucosylated)' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Glycosylation as CQA — The Regulatory Imperative',
      color: 'blue',
      content:
        'Fc glycosylation at Asn297 (EU numbering) is among the most impactful quality attributes for therapeutic IgG antibodies. The glycan composition directly modulates effector function (ADCC, CDC, ADCP), pharmacokinetics (clearance via mannose and asialoglycoprotein receptors), and immunogenicity (non-human glycan epitopes). Unlike most other CQAs, the criticality of specific glycan attributes is highly dependent on the mechanism of action — afucosylation is a dominant CQA for ADCC-dependent oncology mAbs but may be irrelevant for a blocking antibody. This MoA-dependency means that glycosylation CQA classification cannot be copied from a platform template and must be assessed molecule by molecule based on the intended pharmacological effect. The glycan profile is also the attribute most sensitive to upstream process changes — cell line, medium composition, dissolved oxygen, pH, temperature, and harvest timing all affect glycosylation, making it a sentinel indicator of process consistency.',
    },
    {
      type: 'table',
      title: 'MoA-Dependent Glycan CQA Classification',
      headers: ['Glycan Attribute', 'ADCC Impact', 'CDC Impact', 'PK Impact', 'Immunogenicity', 'CQA? (ADCC mAb)', 'CQA? (Blocking mAb)', 'Typical Spec'],
      rows: [
        ['Afucosylation (% lacking core Fuc)', 'Critical: 50x ADCC enhancement via FcgRIIIa binding', 'Minimal', 'Minimal', 'Low (human glycan)', 'Yes — High Risk', 'No — Low Risk (KQA)', '5-15% (ADCC); report only (blocking)'],
        ['Galactosylation (% G1F + G2F)', 'Moderate: 1.5-2x ADCC via allosteric CH2 opening', 'Significant: 2-5x CDC via C1q binding enhancement', 'Minimal', 'Low', 'Yes — Medium Risk', 'KQA if CDC relevant', '30-70% total galactosylation'],
        ['High-Mannose (% Man5-Man9)', 'Minimal direct effect', 'Reduced (impairs C1q)', 'Significant: 2-3x faster clearance via mannose receptor', 'Low', 'Yes — Medium Risk', 'Yes — Medium Risk', '<=5-10%'],
        ['Sialylation (% SA)', 'Reduced ADCC (charge repulsion at FcgR interface)', 'Reduced CDC', 'Moderate: ASGPR-mediated clearance if highly sialylated', 'Low (Neu5Ac); High (Neu5Gc)', 'KQA to CQA', 'KQA', '<=5% (report Neu5Gc separately)'],
        ['Non-Human Glycan Content (NGHC: alpha-Gal, Neu5Gc)', 'Indirect via altered Fc conformation', 'Indirect', 'Moderate (clearance by pre-existing Abs)', 'Critical: pre-existing antibodies in 90%+ humans', 'Yes — CQA', 'Yes — CQA', 'Alpha-Gal <=2%; Neu5Gc <=1%'],
        ['Bisecting GlcNAc', 'Enhanced ADCC (inhibits core fucosylation in vivo)', 'Minimal', 'Minimal', 'Low', 'KQA', 'Non-CQA', 'Report only; typically <5% from CHO'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Afucosylation — The ADCC Master Switch',
      color: 'red',
      content:
        'Core fucosylation at the Asn297 glycan is the single most impactful glycosylation attribute for ADCC-dependent mAbs. The molecular mechanism: core fucose on the Fc glycan sterically clashes with a glycan on FcgammaRIIIa (Asn162), preventing close approach of the Fc to the receptor. Removal of core fucose eliminates this clash, increasing FcgammaRIIIa binding affinity approximately 50-fold and ADCC potency 10-100-fold (depending on the assay and the FcgammaRIIIa allotype — V158 vs. F158). This discovery (Shields et al., 2002; Shinkawa et al., 2003) led to the development of glycoengineered mAbs: obinutuzumab (GlycoMAb technology, afucosylated anti-CD20), mogamulizumab (POTELIGENT, afucosylated anti-CCR4), and benralizumab (afucosylated anti-IL-5Ralpha). For standard CHO-produced mAbs, core fucosylation is typically 85-95%; the 5-15% afucosylated fraction drives most of the ADCC activity. Therefore, the afucosylation specification directly controls the potency of ADCC-dependent molecules. A shift from 10% to 5% afucosylation can reduce ADCC by 50%, making this a tight-tolerance specification for oncology mAbs.',
    },
    {
      type: 'card',
      title: 'High-Mannose — The PK Liability',
      color: 'amber',
      content:
        'High-mannose glycans (Man5, Man6, Man7, Man8, Man9) are biosynthetic intermediates that escape processing in the Golgi when the secretory pathway is overwhelmed (high productivity cell lines, nutrient limitation, low temperature). Their clinical significance lies primarily in pharmacokinetics: mannose-terminated glycoproteins are cleared via the mannose receptor (CD206) on liver sinusoidal endothelial cells and macrophages, resulting in 2-3 fold faster clearance compared to fucosylated complex-type glycans. The clinical evidence is most robust for Man5 (which has the highest mannose receptor affinity due to terminal alpha-1,2-linked mannose exposure), while Man8/Man9 show intermediate clearance effects. Notably, high-mannose glycans also lack core fucose by definition (fucose is added after mannose trimming), so high-mannose species contribute to the afucosylated population and can enhance ADCC — creating a complex interplay where a PK liability simultaneously provides an efficacy benefit for ADCC-dependent molecules. Process control of high-mannose is primarily through upstream cell culture parameters: cell-specific productivity (lower = less high-mannose), media manganese levels (supplementation promotes Golgi processing), and harvest timing (later harvest = more processing time = less high-mannose).',
    },
    {
      type: 'card',
      title: 'Sialylation — Context-Dependent Impacts',
      color: 'purple',
      content:
        'Sialylation of the Fc glycan adds N-acetylneuraminic acid (Neu5Ac) in alpha-2,6 linkage (primarily) or alpha-2,3 linkage to the terminal galactose residue. The functional impacts are context-dependent and remain debated: (1) Anti-inflammatory activity — Kaneko et al. (2006) reported that the anti-inflammatory activity of IVIG was mediated by the sialylated Fc fraction, requiring binding to DC-SIGN (CD209). Subsequent studies have both supported and challenged this finding. For anti-inflammatory mAbs, sialylation may be beneficial. (2) ADCC/CDC reduction — sialic acid adds negative charge to the Fc-FcgammaR interface, modestly reducing binding affinity. For ADCC-dependent mAbs, high sialylation is undesirable. (3) PK impact — highly sialylated proteins (>20% sialylation) can be cleared via the asialoglycoprotein receptor (ASGPR) if sialic acid is removed by circulating sialidases, exposing terminal galactose. At typical mAb sialylation levels (1-5%), this is not clinically significant. The critical immunogenicity concern is Neu5Gc (N-glycolylneuraminic acid), a non-human sialic acid produced by non-human mammalian cell lines. Humans lost the CMAH gene required for Neu5Gc synthesis and carry circulating anti-Neu5Gc antibodies (prevalence >90%). CHO cells produce very low Neu5Gc (<0.5%), but murine cell lines (NS0, SP2/0) produce significant levels, making Neu5Gc a CQA for products from murine-derived cell lines.',
    },
    {
      type: 'table',
      title: 'Glycan Analytical Methods',
      headers: ['Method', 'Glycan Level', 'Principle', 'Key Output', 'Throughput', 'Regulatory Role'],
      rows: [
        ['HILIC-FLR (released glycans)', 'Released N-glycans (PNGase F)', '2-AB or RFMS labelling; HILIC separation by polarity', 'Relative % of each glycoform (G0F, G1F, G2F, Man5, etc.)', 'High (96-well plate release + UPLC)', 'Primary release method; Tier 1'],
        ['CE-LIF (released glycans)', 'Released N-glycans', 'APTS labelling; CE separation', 'Similar to HILIC but different selectivity', 'High', 'Alternative release method; Tier 1'],
        ['LC-MS glycopeptide mapping', 'Site-specific', 'Tryptic digest; glycopeptide identification by MS', 'Site-specific glycan composition (Fc vs Fab)', 'Medium', 'Tier 3 characterisation; site specificity'],
        ['Intact / subunit MS', 'Intact protein or IdeS fragments', 'ESI-MS of intact mAb or Fc/2, Fd, LC fragments', 'Molecular weight confirmation of major glycoforms', 'Medium-High', 'Tier 2/3; glycoform mass confirmation'],
        ['MALDI-TOF (released glycans)', 'Released N-glycans', 'Matrix-assisted laser desorption/ionisation', 'Glycan mass profile; rapid screening', 'High', 'Development screening; not typically release'],
        ['SPR (FcgRIIIa binding)', 'Functional glycan impact', 'Surface plasmon resonance with FcgRIIIa-V158/F158', 'KD for Fc-FcgR interaction as function of fucosylation', 'Medium', 'Tier 2/3; correlates glycan to function'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Non-Human Glycan Content (NGHC) — Alpha-Gal and Neu5Gc',
      color: 'pink',
      content:
        'Non-human glycan epitopes represent a unique immunogenicity CQA because humans carry pre-existing antibodies against them (unlike most other CQAs where immunogenicity risk is prospective). The two principal NGHC concerns are: (1) Galactose-alpha-1,3-galactose (alpha-Gal) — the alpha-Gal epitope is produced by murine cell lines (NS0, SP2/0) that express alpha-1,3-galactosyltransferase. Humans (and Old World primates) lack this enzyme and carry abundant anti-alpha-Gal IgE and IgG antibodies (1% of circulating IgG). Alpha-Gal on therapeutic mAbs can cause hypersensitivity reactions including anaphylaxis — the most notable example being cetuximab, where alpha-Gal on the Fab glycosylation site (Asn88 in VH) caused severe hypersensitivity in patients with high anti-alpha-Gal IgE titres (prevalent in the southeastern US due to tick-bite sensitisation). CHO cells do not express alpha-1,3-galactosyltransferase and produce no alpha-Gal, which is one reason CHO became the dominant expression system. (2) Neu5Gc — as described in the sialylation section, this non-human sialic acid is a CQA for murine cell-line products. Both NGHC species require sensitive detection methods: alpha-Gal by LC-MS/MS glycopeptide mapping or lectin ELISA (Griffonia simplicifolia lectin), Neu5Gc by DMB derivatisation HPLC or LC-MS after mild acid hydrolysis to release sialic acids.',
    },
    {
      type: 'bullets',
      title: 'Glycan Specification Setting — Practical Approach',
      items: [
        'Start with the mechanism of action: If ADCC-dependent, afucosylation requires a release specification with acceptance criteria (e.g., 8-15% afucosylated). If ligand-blocking only, afucosylation may be reported for information without formal limits.',
        'Use clinical lot data to define the clinically qualified range: All glycan profiles from Phase I-III clinical material define the proven acceptable range. Specifications should not extend beyond this range without bridging studies.',
        'Account for upstream process variability: Glycosylation is the most process-sensitive CQA. Set specifications wide enough to accommodate normal batch-to-batch variability (typically +-5% absolute for major glycoforms) while still ensuring functional equivalence.',
        'Correlate glycan to function: Establish quantitative correlations between key glycoforms and functional assays (ADCC reporter for afucosylation, C1q ELISA for galactosylation, FcRn binding for high-mannose/oxidation). These correlations underpin specification justification.',
        'High-mannose strategy: Set an upper limit (typically <=5-10%) based on PK impact data. If clinical PK data show acceptable exposure despite higher high-mannose, a wider limit may be justified. Document the PK-glycan correlation in CTD 3.2.P.2.',
        'Biosimilar-specific: Demonstrate similar glycan profiles to the reference product using multiple methods (HILIC, LC-MS, SPR). The FDA/EMA expect statistical similarity assessment, not just visual comparison.',
      ],
    },
    {
      type: 'callout',
      title: 'Process Levers for Glycan Control',
      variant: 'success',
      content:
        'Upstream process parameters provide the primary control over glycan composition: (1) Cell culture temperature — lower temperature (32-34C vs. 37C) reduces cell-specific productivity and allows more complete Golgi processing, reducing high-mannose. (2) Dissolved oxygen — low DO can impair glycosyltransferase function; maintain >=30% air saturation. (3) Manganese supplementation — Mn2+ is an essential cofactor for GnT-I and other Golgi glycosyltransferases; supplementation (0.04-0.4 uM) promotes complex-type glycan maturation. (4) Uridine/galactose feeding — adding galactose (0.5-5 g/L) and uridine (1-5 mM) as galactosyltransferase substrates increases galactosylation. (5) Fucosylation control — for glycoengineered mAbs, FUT8 knockout (CRISPR), kifunensine (mannosidase inhibitor), or 2-fluorofucose (decoy substrate) reduce core fucosylation. (6) Harvest timing — earlier harvest generally yields lower high-mannose and more complete processing. (7) pH shift — reducing culture pH from 7.0 to 6.8-6.9 in production phase can alter glycan profiles. The optimal combination is molecule- and cell-line specific and is determined through DOE studies during process development.',
    },
    {
      type: 'callout',
      title: 'Regulatory Case Study — Glycan Differences in Biosimilars',
      variant: 'warning',
      content:
        'Glycan differences between biosimilar and reference products are among the most scrutinised attributes in regulatory review. The FDA Oncologic Drugs Advisory Committee (ODAC) review of biosimilar trastuzumab (multiple applicants, 2017-2019) illustrates the approach: reviewers examined afucosylation levels, galactosylation, high-mannose, and sialylation, then correlated any differences to ADCC and CDC functional assays. Small glycan differences (e.g., +-3% afucosylation vs. reference) were accepted when functional assays showed similarity. Larger differences triggered requests for additional PK or clinical bridging data. The lesson: glycan specifications for biosimilars are not about matching the reference product exactly (impossible given process differences) but about demonstrating that any glycan differences do not translate to clinically meaningful functional or PK differences. This "totality of evidence" approach requires robust structure-function correlations specific to the molecule.',
    },
  ],
  mentorQuestions: [
    'Your ADCC-dependent anti-CD20 IgG1 shows 12% afucosylation, which is within your 8-15% specification. However, batch-to-batch ADCC potency varies from 80% to 140% relative to reference standard. Beyond afucosylation, what other glycan attributes and non-glycan attributes could explain this potency variability?',
    'You are developing a biosimilar to a murine cell line-derived mAb that contains 3% alpha-Gal. Your CHO-expressed biosimilar has 0% alpha-Gal. How do you handle this glycan difference in your biosimilarity assessment — is it a benefit, a risk, or both?',
    'A process change shifts your high-mannose from 4% to 8%. PK data from a separate glycovariant study showed no difference between 3% and 7% high-mannose lots. Can you approve this change based on existing data, or do you need additional studies?',
  ],
};
