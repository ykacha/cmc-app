import type { ModuleContent } from '../../types/content';

export const module7: ModuleContent = {
  id: 'engineering-m7',
  sectionId: 'engineering',
  moduleNumber: 7,
  eyebrow: 'ENGINEERING 08',
  title: 'XTEND and Half-Life Extension Technologies',
  lead: 'Beyond YTE and LS point mutations, the industry has developed diverse half-life extension platforms including Fc-albumin fusions, PEGylation, XTEN polypeptide fusions, and engineered FcRn-binding domains. Each approach offers distinct pharmacokinetic, CMC, and regulatory trade-offs.',
  tags: [
    { label: 'XTEND', color: 'blue' },
    { label: 'Fc-Albumin', color: 'green' },
    { label: 'PEGylation', color: 'amber' },
    { label: 'Half-Life Technologies', color: 'purple' },
  ],
  stats: [
    { label: 'Technologies Covered', value: '6+' },
    { label: 'Longest Half-Life', value: '~70 days (YTE)' },
    { label: 'Most Marketed', value: 'PEGylation' },
    { label: 'Emerging', value: 'XTEN/HLX' },
  ],
  sections: [
    {
      type: 'card',
      title: '1. Xencor XTEND Technology Platform',
      color: 'blue',
      content:
        'XTEND is Xencor\'s proprietary half-life extension technology based on the LS mutations (M428L/N434S) described in the previous module. The XTEND brand encompasses not only the LS point mutations but also Xencor\'s broader expertise in combining LS with other Fc modifications (heterodimerisation, effector function modulation, cytokine engineering). XTEND-enhanced molecules achieve approximately 3-fold half-life extension (~35-40 days in humans compared to ~18-21 days for wild-type IgG1). Xencor has licensed XTEND technology to multiple partners including Vir Biotechnology (sotrovimab), Janssen, Amgen, and others. The XTEND platform is particularly attractive for bispecific antibody programmes where Xencor\'s XmAb heterodimerisation technology is already in use, as the LS mutations can be incorporated into the same Fc domain without additional engineering complexity. XTEND has been combined with Xencor\'s effector-silent (Xtmab) and effector-enhanced platforms, demonstrating broad modularity.',
    },
    {
      type: 'table',
      title: '2. Comprehensive Half-Life Extension Technology Comparison',
      headers: ['Technology', 'Mechanism', 'Half-Life Achieved', 'MW Impact', 'Key Advantage', 'Key Limitation', 'Example Product'],
      rows: [
        ['YTE (M252Y/S254T/T256E)', 'Enhanced FcRn binding (CH2-CH3)', '~50-70 days', 'Unchanged (~150 kDa)', 'Greatest half-life extension', 'Modest ADCC reduction; AZ IP', 'Ravulizumab (Ultomiris)'],
        ['LS/XTEND (M428L/N434S)', 'Enhanced FcRn binding (CH3)', '~35-40 days', 'Unchanged (~150 kDa)', 'Preserves ADCC; modular platform', 'Less extension than YTE; Xencor IP', 'Sotrovimab (Xevudy)'],
        ['N434A', 'Enhanced FcRn binding', '~30-35 days', 'Unchanged', 'Simple single mutation; broad IP freedom', 'Modest extension (~2x)', 'Motavizumab-N434A (preclinical)'],
        ['Fc-albumin fusion', 'FcRn + albumin receptor dual recycling', '~25-35 days', '~215 kDa (Fc-HSA)', 'Dual recycling pathway', 'Large MW; potential immunogenicity', 'Albiglumab (GLP-1 fusion)'],
        ['PEGylation', 'Increased hydrodynamic radius; reduced renal clearance', '~7-14 days (variable)', '+5-40 kDa per PEG', 'Well-established; decades of experience', 'Anti-PEG antibodies; vacuolation toxicity', 'Certolizumab pegol (Cimzia)'],
        ['XTEN polypeptide', 'Intrinsically disordered polypeptide increases hydrodynamic radius', '~7-14 days', '+40-80 kDa per XTEN', 'Biodegradable; no anti-PEG risk', 'Large size; potential immunogenicity', 'Efanesoctocog alfa (Altuviiio)'],
        ['Albumin binding domain', 'Non-covalent albumin binding for FcRn-mediated recycling', '~14-21 days', '+5-15 kDa', 'Modular; small size impact', 'Non-covalent; competition with endogenous albumin', 'Camelid VHH-AlbBD fusions'],
        ['Anti-FcRn antibody (inverse)', 'Blocks FcRn to reduce endogenous IgG (different application)', 'N/A (reduces IgG)', 'Standard mAb', 'Treats autoimmune IgG-mediated disease', 'Not half-life extension; IgG reduction', 'Efgartigimod (Vyvgart)'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '3. Fc-Albumin Fusion Strategy',
      color: 'green',
      content:
        'Fc-albumin fusion exploits the fact that both IgG and albumin are recycled by FcRn. The FcRn receptor has separate binding sites for IgG Fc (at the CH2-CH3 interface) and for albumin (at domain III of albumin, binding to a distinct site on FcRn alpha chain). By genetically fusing the Fc domain to human serum albumin (HSA), a dual-recycling molecule is created that engages FcRn through both binding sites simultaneously. This does not result in additive half-life (the recycling pathway is the same), but it ensures more efficient FcRn engagement per molecule. The primary disadvantage is the large molecular weight increase (~67 kDa for albumin added to ~50 kDa for Fc, yielding a ~215 kDa fusion), which can affect tissue penetration, particularly in solid tumours. Fc-albumin fusions also present CMC challenges: the fusion protein has a different glycosylation profile, different charge heterogeneity, and different stability characteristics compared to standard mAbs. Manufacturing requires optimised expression conditions as the larger construct can reduce CHO cell productivity. Despite these challenges, Fc-albumin fusions have been successful in GLP-1 agonist applications (albiglutide/Tanzeum, now discontinued for commercial rather than efficacy reasons).',
    },
    {
      type: 'card',
      title: '4. PEGylation — The Established Platform',
      color: 'amber',
      content:
        'PEGylation (conjugation of polyethylene glycol polymers) is the longest-established half-life extension technology, with the first PEGylated protein (pegademase, Adagen) approved in 1990. For antibody fragments (Fab, scFv, nanobodies), PEGylation compensates for the absence of FcRn-mediated recycling by increasing the hydrodynamic radius above the renal filtration threshold (~60 kDa). Certolizumab pegol (Cimzia) is the most prominent PEGylated antibody fragment: a humanised anti-TNFalpha Fab\' conjugated to a 40 kDa branched PEG, achieving a half-life of approximately 14 days. PEGylation limitations include: (1) Anti-PEG antibodies — increasingly recognised in the general population (pre-existing anti-PEG antibodies in up to 40% of individuals due to PEG in cosmetics and food additives), which can accelerate clearance and cause hypersensitivity; (2) Renal tubular vacuolation — PEG accumulates in renal tubular epithelial cells, causing a characteristic reversible vacuolation observed in toxicology studies; (3) Heterogeneity — site-specific PEGylation is required to avoid activity loss; random PEGylation generates complex mixtures. PEGylation does not involve FcRn engineering and is therefore orthogonal to the Fc mutation-based approaches.',
    },
    {
      type: 'card',
      title: '5. XTEN Polypeptide Fusion',
      color: 'purple',
      content:
        'XTEN is a recombinant polypeptide technology developed by Amunix/Sanofi consisting of long (typically 288-864 amino acid), intrinsically disordered sequences composed of six amino acids (Ala, Glu, Gly, Pro, Ser, Thr). XTEN polypeptides increase the apparent molecular weight and hydrodynamic radius of the fused protein, reducing renal clearance similarly to PEGylation but using a fully biodegradable, genetically encoded sequence. The most prominent XTEN-containing product is efanesoctocog alfa (Altuviiio, Sanofi), a Factor VIII-Fc-VWF-XTEN fusion for haemophilia A that achieves Factor VIII activity lasting approximately 4 days (vs 8-12 hours for native FVIII), enabling once-weekly prophylaxis. XTEN advantages over PEG include: (a) no anti-PEG antibody risk; (b) biodegradable (peptide bonds cleaved by proteases); (c) genetically encoded (no chemical conjugation step); (d) no renal vacuolation. Disadvantages include: large size (40-80 kDa polypeptide), potential immunogenicity of the non-natural sequence, and limited structural knowledge (intrinsically disordered). XTEN has not been applied to full-length mAbs (where Fc already provides FcRn-mediated half-life), but is valuable for Fab fragments, peptides, and recombinant proteins lacking Fc domains.',
    },
    {
      type: 'table',
      title: '6. Half-Life Extension Decision Matrix',
      headers: ['Criterion', 'FcRn Mutations (YTE/LS)', 'Fc-Albumin Fusion', 'PEGylation', 'XTEN Polypeptide'],
      rows: [
        ['Applicable to full-length mAbs', 'Yes (primary use case)', 'Yes (large construct)', 'Not typical (fragments)', 'Not typical (fragments)'],
        ['Applicable to Fab/scFv', 'No (requires Fc)', 'Yes (if Fc present)', 'Yes (primary use case)', 'Yes (primary use case)'],
        ['Half-life achievable', '35-70 days', '25-35 days', '7-14 days', '3-7 days'],
        ['Molecular weight impact', 'None', '+67 kDa (albumin)', '+5-40 kDa (PEG)', '+40-80 kDa (XTEN)'],
        ['Manufacturing complexity', 'Minimal (point mutations)', 'Moderate (fusion protein)', 'High (conjugation step)', 'Moderate (fusion protein)'],
        ['Immunogenicity risk', 'Low (2-3 mutations)', 'Moderate (fusion junction)', 'Moderate (anti-PEG)', 'Low-moderate (non-natural sequence)'],
        ['Regulatory precedent', 'Moderate (2-3 approved)', 'Limited (1 approved, discontinued)', 'Extensive (20+ approved)', 'Limited (1-2 approved)'],
        ['IP landscape', 'Narrow (AZ, Xencor)', 'Moderate', 'Broad (many expired)', 'Narrow (Amunix/Sanofi)'],
        ['Effector function impact', 'Variable (YTE reduces ADCC)', 'Altered (fusion format)', 'N/A (no Fc)', 'N/A (no Fc in most cases)'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: '7. Albumin Binding Domain (ABD) Approach',
      variant: 'info',
      content:
        'An elegant alternative to Fc-albumin fusion is the albumin binding domain (ABD) approach. Small (5-15 kDa) protein domains or peptides that bind non-covalently to human serum albumin are genetically fused to the therapeutic protein. Once injected, the ABD-containing molecule binds to circulating albumin (~40 mg/mL in serum), forming a non-covalent complex that is recycled by FcRn via the albumin binding site. This piggybacks on the albumin recycling pathway without requiring a direct Fc:FcRn interaction. Examples include engineered streptococcal protein G ABD (ABD035), camelid VHH anti-albumin nanobodies (ALB-binding), and designed ankyrin repeat proteins (DARPins). The ABD approach is particularly useful for small therapeutic proteins (cytokines, peptides, nanobodies) that are too small for FcRn-mediated recycling. The key limitation is competition with endogenous albumin: at ~40 mg/mL, albumin occupies most FcRn binding sites, so the ABD-drug:albumin complex must compete effectively for FcRn engagement.',
    },
    {
      type: 'card',
      title: '8. Anti-FcRn Antibodies — The Inverse Strategy',
      color: 'red',
      content:
        'While not a half-life extension strategy, anti-FcRn antibodies represent an important conceptual inverse. By blocking FcRn, these molecules prevent the recycling of all endogenous IgG, causing rapid catabolism and clearance of pathogenic autoantibodies. Efgartigimod (Vyvgart, argenx) is the first approved anti-FcRn antibody fragment (Fc domain engineered for enhanced FcRn binding at both pH 6.0 and pH 7.4, thereby blocking FcRn persistently). Efgartigimod is approved for generalised myasthenia gravis (gMG) and reduces total IgG levels by approximately 60-70% within 1-2 weeks. Rozanolixizumab (UCB) and nipocalimab (Janssen) are competing anti-FcRn antibodies in development. Understanding anti-FcRn biology is important for half-life extension engineers because it reveals the sensitivity of IgG homeostasis to FcRn modulation: even partial FcRn blockade dramatically reduces IgG levels, underscoring why precise control of FcRn binding enhancement (and preservation of pH-dependent release) is critical for avoiding FcRn sink effects with half-life extending mutations.',
    },
    {
      type: 'bullets',
      title: '9. Emerging and Next-Generation Approaches',
      items: [
        'Engineered FcRn (eFcRn): Co-administration of recombinant FcRn variants that enhance the recycling of specific therapeutic IgG. Proof-of-concept in animal models but not yet clinical.',
        'pH-switchable Fc: Engineered Fc domains with enhanced pH sensitivity, providing ultra-tight binding at pH 6.0 and even faster release at pH 7.4 than wild-type. May achieve >100-day half-life.',
        'Hexameric Fc scaffolds: Fc domains engineered to form hexameric structures (6x Fc) that engage multiple FcRn simultaneously, dramatically enhancing avidity. Early preclinical stage.',
        'Dual Fc-albumin binding: Molecules with both Fc domain and albumin binding domain, engaging FcRn through two independent pathways. Theoretical advantage but complex to engineer.',
        'Hyaluronic acid conjugation: As an alternative to PEG, hyaluronic acid conjugation provides increased hydrodynamic radius with biodegradable, naturally occurring polymer.',
        'TransCon technology (Ascendis): Transient conjugation platform where PEG or other carriers are released in vivo, providing initial half-life extension followed by release of the unmodified active protein.',
      ],
    },
    {
      type: 'table',
      title: '10. Approved Products with Half-Life Extension',
      headers: ['Product', 'Active Molecule', 'Half-Life Technology', 'Half-Life Achieved', 'Indication', 'Approval Year'],
      rows: [
        ['Ravulizumab (Ultomiris)', 'Anti-C5 mAb', 'YTE-type FcRn mutations', '~50 days', 'PNH, aHUS, gMG', '2018'],
        ['Nirsevimab (Beyfortus)', 'Anti-RSV mAb', 'YTE FcRn mutations', '~60-70 days', 'RSV prophylaxis (infants)', '2023'],
        ['Sotrovimab (Xevudy)', 'Anti-SARS-CoV-2 mAb', 'LS/XTEND', '~35-40 days', 'COVID-19 (EUA)', '2021'],
        ['Certolizumab pegol (Cimzia)', 'Anti-TNFa Fab', '40 kDa PEG', '~14 days', 'RA, Crohn, Psoriasis', '2008'],
        ['Efanesoctocog alfa (Altuviiio)', 'FVIII-Fc-VWF-XTEN', 'XTEN polypeptide', '~4 days (FVIII activity)', 'Haemophilia A', '2023'],
        ['Pegcetacoplan (Empaveli)', 'Compstatin C3 inhibitor', '40 kDa PEG', '~8 days (SC)', 'PNH', '2021'],
        ['Eftrenonacog alfa (Alprolix)', 'FIX-Fc fusion', 'Fc-mediated FcRn recycling', '~82 hours', 'Haemophilia B', '2014'],
        ['Efmoroctocog alfa (Eloctate)', 'FVIII-Fc fusion', 'Fc-mediated FcRn recycling', '~19 hours', 'Haemophilia A', '2014'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: '11. CMC Complexity Gradient Across Technologies',
      variant: 'warning',
      content:
        'Half-life extension technologies exist on a CMC complexity gradient. FcRn point mutations (YTE, LS) are the simplest: they require no additional manufacturing steps, no conjugation chemistry, and no non-standard analytical methods. The molecule remains a standard mAb with standard Protein A purification, standard characterisation, and standard stability profiles. PEGylation introduces significant CMC complexity: site-specific conjugation requires additional manufacturing steps, PEG reagent qualification, characterisation of PEG distribution (mono- vs multi-PEGylated species), PEG-specific stability testing, and anti-PEG antibody assays. XTEN and Fc-albumin fusions add recombinant protein complexity: larger constructs with different expression levels, novel glycosylation sites, altered charge profiles, and unique degradation pathways. For regulatory submissions, the CMC section (CTD Module 3) scales in complexity with the technology: FcRn mutations require minimal additional characterisation beyond standard mAb, while PEGylation and fusion proteins require substantially expanded analytical packages, process development documentation, and stability protocols.',
    },
  ],
  mentorQuestions: [
    'You are developing a target product profile for a new anti-inflammatory Fab fragment. Compare PEGylation, XTEN, and albumin binding domain approaches for achieving a 2-week half-life. Address manufacturing feasibility, immunogenicity risk, and regulatory pathway for each.',
    'Why have FcRn point mutations (YTE/LS) not replaced PEGylation for antibody fragments, even though they provide superior half-life extension for full-length mAbs? What structural requirement limits their applicability?',
    'A competitor claims their novel FcRn-enhanced mAb achieves a 90-day half-life using a proprietary Fc mutation set. What concerns would you raise about pH-dependent release, FcRn sink effects, and potential safety implications during your due diligence assessment?',
  ],
};
