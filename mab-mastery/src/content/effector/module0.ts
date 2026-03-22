import type { ModuleContent } from '../../types/content';

export const module0: ModuleContent = {
  id: 'effector-m0',
  sectionId: 'effector',
  moduleNumber: 0,
  eyebrow: 'EFFECTOR 01',
  title: 'The FcγR Family',
  lead: 'The Fcγ receptor family is the molecular switchboard that translates antibody opsonisation into immune cell activation or inhibition. Understanding receptor affinity, polymorphisms, and signalling is essential for rational Fc engineering in therapeutic mAb development.',
  tags: [
    { label: 'FcγR Biology', color: 'blue' },
    { label: 'ITAM/ITIM', color: 'red' },
    { label: 'Polymorphisms', color: 'amber' },
    { label: 'EU Numbering', color: 'teal' },
  ],
  stats: [
    { label: 'Activating FcγRs', value: '4' },
    { label: 'Inhibitory FcγR', value: '1 (FcγRIIb)' },
    { label: 'High-Affinity', value: 'FcγRI only' },
    { label: 'Key Polymorphism', value: 'V158F' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Overview of the Human FcγR System',
      color: 'blue',
      content:
        'The human Fcγ receptor (FcγR) system comprises five classical receptors encoded by genes on chromosome 1q23.3: FcγRI (CD64), FcγRIIa (CD32a), FcγRIIb (CD32b), FcγRIIc (CD32c), and FcγRIIIa (CD16a), plus FcγRIIIb (CD16b). These receptors bind the Fc region of IgG antibodies at the lower hinge and upper CH2 domain (EU residues L234–G237, D265–E269, N297-linked glycan, A327–P331). The receptors are divided into activating (FcγRI, FcγRIIa, FcγRIIIa) and inhibitory (FcγRIIb) classes based on their intracellular signalling motifs. FcγRIIIb is unique — it is GPI-anchored with no intracellular signalling domain and is restricted to neutrophils. The activating-to-inhibitory (A/I) ratio on a given cell determines the threshold for immune activation upon IgG immune complex engagement, making this ratio a central determinant of therapeutic antibody efficacy and safety.',
    },
    {
      type: 'table',
      title: 'Complete FcγR Family Reference',
      headers: ['Receptor', 'CD Name', 'Affinity (Ka)', 'Binding Mode', 'Signalling', 'Type', 'Primary Cell Distribution'],
      rows: [
        ['FcγRI', 'CD64', '10⁸–10⁹ M⁻¹ (HIGH)', 'Monomeric IgG', 'ITAM (γ-chain)', 'Activating', 'Monocytes, macrophages, DCs (IFN-γ-induced neutrophils)'],
        ['FcγRIIa', 'CD32a', '~10⁶ M⁻¹ (LOW)', 'Immune complexes', 'ITAM (intrinsic)', 'Activating', 'Broadly: monocytes, macrophages, neutrophils, platelets, DCs'],
        ['FcγRIIb', 'CD32b', '~10⁶ M⁻¹ (LOW)', 'Immune complexes', 'ITIM (intrinsic)', 'INHIBITORY', 'B cells, basophils, DCs, macrophages (subset)'],
        ['FcγRIIc', 'CD32c', '~10⁶ M⁻¹ (LOW)', 'Immune complexes', 'ITAM (intrinsic)', 'Activating', 'NK cells (subset — ORF allele dependent)'],
        ['FcγRIIIa', 'CD16a', '~10⁶ M⁻¹ (LOW)', 'Immune complexes', 'ITAM (via FcεRIγ/CD3ζ)', 'Activating', 'NK cells, monocytes, macrophages, γδ T cells'],
        ['FcγRIIIb', 'CD16b', '~10⁶ M⁻¹ (LOW)', 'Immune complexes', 'GPI-anchored (none)', 'Decoy/modulator', 'Neutrophils exclusively'],
        ['C1q', '—', '~10⁷ M⁻¹ (aggregate)', 'IgG hexamers/clusters', 'C1r/C1s cascade', 'Complement', 'Serum (soluble); not a membrane receptor'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'FcγRI (CD64) — The High-Affinity Receptor',
      color: 'purple',
      content:
        'FcγRI is the only high-affinity FcγR, with Ka values of 10⁸–10⁹ M⁻¹ — roughly 100–1000× higher than all other FcγRs. This high affinity means FcγRI can bind monomeric (free) IgG at physiological concentrations (5–15 mg/mL total IgG in serum), unlike the low-affinity receptors that require multivalent immune complexes for stable engagement. Structurally, FcγRI has three extracellular Ig-like domains (D1–D2–D3), whereas all other FcγRs have only two (D1–D2). The additional D3 domain contributes approximately 10-fold to the binding affinity through extended contact with the CH2 domain. FcγRI signals through the associated FcεRIγ chain homodimer, which contains ITAM motifs. Upon crosslinking, ITAM phosphorylation by Src-family kinases recruits Syk kinase, triggering phagocytosis, respiratory burst, and cytokine secretion. FcγRI preferentially binds IgG1 and IgG3; IgG4 binds with intermediate affinity; IgG2 has negligible binding. In the context of therapeutic mAbs, FcγRI is constitutively occupied by endogenous IgG at steady state, but can be engaged by therapeutic mAbs when present at high local concentrations (e.g., opsonised tumour cells). Expression is upregulated by IFN-γ on neutrophils and monocytes.',
    },
    {
      type: 'card',
      title: 'FcγRIIa (CD32a) — Broadly Expressed Activating Receptor',
      color: 'green',
      content:
        'FcγRIIa is the most broadly distributed activating FcγR, expressed on monocytes, macrophages, neutrophils, eosinophils, basophils, platelets, and dendritic cells. It is a low-affinity receptor (Ka ~10⁶ M⁻¹) that engages immune complexes rather than free IgG. Uniquely among FcγRs, FcγRIIa contains an intrinsic ITAM motif in its cytoplasmic tail — it does not require accessory signalling chains. FcγRIIa is the primary receptor driving antibody-dependent cellular phagocytosis (ADCP) by macrophages. The clinically significant H131R polymorphism (rs1801274) affects the membrane-distal D2 domain and modulates IgG subclass binding preferences: H131 binds IgG2 with moderate affinity and IgG1/IgG3 well, whereas R131 has reduced IgG2 binding. The H131 allele frequency is approximately 0.43 in Europeans and 0.52 in East Asians. In platelet biology, FcγRIIa is the sole activating FcγR on platelets and mediates heparin-induced thrombocytopenia (HIT) through anti-PF4/heparin immune complex binding. For therapeutic mAbs, FcγRIIa engagement is relevant for ADCP-dependent mechanisms and may contribute to infusion-related reactions when immune complexes form.',
    },
    {
      type: 'card',
      title: 'FcγRIIb (CD32b) — The Only Inhibitory FcγR',
      color: 'red',
      content:
        'FcγRIIb is the sole inhibitory member of the FcγR family, identifiable by its cytoplasmic ITIM (immunoreceptor tyrosine-based inhibitory motif) sequence. Upon co-crosslinking with activating receptors, ITIM phosphorylation recruits the phosphatases SHIP-1 (SH2-containing inositol 5\'-phosphatase 1) and SHP-1, which dephosphorylate signalling intermediates and antagonise the activating ITAM cascade. FcγRIIb is expressed on B cells (where it provides negative feedback to BCR signalling and prevents autoimmunity), basophils, dendritic cells, and a subset of macrophages. On B cells, FcγRIIb co-engagement with the BCR by antigen-antibody complexes triggers B-cell apoptosis — the molecular basis of antibody-mediated immune suppression and the mechanism underlying anti-RhD immunoprophylaxis. The ratio of activating FcγRs (FcγRIIa, FcγRIIIa) to inhibitory FcγRIIb on macrophages and DCs sets the activation threshold. Tumour microenvironment immunosuppression can upregulate FcγRIIb on tumour-associated macrophages, reducing ADCC/ADCP efficacy. For Fc engineering, selective binding to FcγRIIb (e.g., via S267E/L328F mutations) has been explored for agonistic anti-CD40 and anti-4-1BB antibodies that require FcγRIIb-mediated crosslinking for activity.',
    },
    {
      type: 'card',
      title: 'FcγRIIIa (CD16a) — The ADCC Receptor',
      color: 'teal',
      content:
        'FcγRIIIa (CD16a) is the principal receptor mediating antibody-dependent cellular cytotoxicity (ADCC) and is therefore the single most important FcγR for tumour-targeting therapeutic mAbs. It is the dominant activating FcγR on NK cells and is also expressed on monocytes, macrophages, and γδ T cells. FcγRIIIa signals through the associated FcεRIγ chain homodimer or CD3ζ homodimer/heterodimer, both containing ITAM motifs. Upon FcγRIIIa crosslinking by opsonised target cells, ITAM phosphorylation activates Syk and ZAP-70 kinases, leading to calcium mobilisation, degranulation (perforin/granzyme release), and target cell apoptosis. FcγRIIIa is itself glycosylated at Asn162, and this glycan critically modulates the Fc interaction — core fucose on the Fc glycan sterically clashes with the Asn162 glycan of the receptor, reducing binding affinity. This is the molecular basis for the ~50-fold ADCC enhancement seen with afucosylated antibodies. FcγRIIIa engagement can be measured by ADCC reporter bioassays (e.g., Promega ADCC Reporter Bioassay using Jurkat cells stably expressing FcγRIIIa and NFAT-response element driving luciferase) or by primary NK cell cytotoxicity assays using ⁵¹Cr-release or LDH-release.',
    },
    {
      type: 'table',
      title: 'FcγR Polymorphisms of Clinical Significance',
      headers: ['Receptor', 'Polymorphism', 'Position', 'Higher Affinity Allele', 'Allele Frequencies (European)', 'Clinical Impact'],
      rows: [
        ['FcγRIIa', 'H131R', 'Extracellular D2', 'H131 (for IgG2)', 'H: ~43%, R: ~57%', 'H131 homozygotes show better response to rituximab in some studies'],
        ['FcγRIIIa', 'V158F', 'Extracellular D2', 'V158 (~2–3× higher Ka)', 'V: ~40%, F: ~60%', 'V/V genotype: better ADCC, improved response to rituximab, trastuzumab, cetuximab'],
        ['FcγRIIIb', 'NA1/NA2', 'Extracellular', 'NA1 (higher neutrophil binding)', 'NA1: ~35%, NA2: ~65%', 'NA1 homozygotes show enhanced neutrophil phagocytosis'],
        ['FcγRIIb', 'I232T', 'Transmembrane', 'I232 (normal function)', 'I: ~90%, T: ~10%', 'T232 excludes FcγRIIb from lipid rafts → loss of inhibition → SLE risk'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'FcγRIIIa V158F — The Most Important Pharmacogenomic Variable',
      color: 'amber',
      content:
        'The V158F polymorphism (rs396991) in FcγRIIIa is the single most clinically significant pharmacogenomic variable in therapeutic mAb pharmacology. Valine at position 158 (V158) increases the affinity of FcγRIIIa for IgG1 Fc by approximately 2–3-fold compared to phenylalanine (F158). The molecular basis is a subtle difference in the D2 domain loop that contacts the lower hinge of IgG: Val158 creates a slightly more complementary hydrophobic surface for the Fc L234/L235 region. Clinical impact: Cartron et al. (Blood 99:754, 2002) first showed that FcγRIIIa V/V homozygotes had significantly higher response rates to rituximab in follicular lymphoma compared to F carriers (100% vs 67% objective response at 12 months). Similar genotype-response correlations have been reported for trastuzumab (Musolino 2008), cetuximab (Zhang 2007), and other ADCC-dependent mAbs. This polymorphism has driven the development of afucosylated and Fc-enhanced antibodies (e.g., obinutuzumab, margetuximab) designed to overcome the affinity deficit in F/F carriers, thereby equalising clinical response across genotypes.',
    },
    {
      type: 'card',
      title: 'FcγRIIIb (CD16b) — The GPI-Anchored Decoy',
      color: 'purple',
      content:
        'FcγRIIIb is unique among FcγRs in that it is attached to the cell membrane by a glycosylphosphatidylinositol (GPI) anchor rather than a transmembrane domain. It therefore has no intracellular signalling capacity of its own. FcγRIIIb is expressed exclusively on neutrophils at very high density (~100,000–300,000 copies per cell, compared to ~5,000–20,000 FcγRIIIa copies per NK cell). Its function remains debated: it may act as a "sink" or "decoy" that captures immune complexes on the neutrophil surface without triggering activation, or it may cooperate with FcγRIIa (which is co-expressed on neutrophils) to facilitate complement-mediated phagocytosis. FcγRIIIb can be shed from the neutrophil surface by ADAM17 (TACE)-mediated cleavage, releasing soluble FcγRIIIb (sFcγRIIIb) into the circulation. Elevated sFcγRIIIb levels are observed in inflammatory conditions. The NA1/NA2 polymorphism (differing in 4 glycosylation sites) affects IgG binding and neutrophil function. For therapeutic mAb development, FcγRIIIb is generally not a primary concern, but the high density of GPI-anchored FcγRIIIb on neutrophils can compete with FcγRIIIa on NK cells for antibody binding in in vitro whole-blood assays.',
    },
    {
      type: 'card',
      title: 'C1q — The Complement Bridge',
      color: 'green',
      content:
        'C1q is not a classical FcγR but is the Fc-binding initiation factor of the complement classical pathway. C1q is a soluble hexameric protein (460 kDa) composed of 18 polypeptide chains (6× A, B, C chains) arranged as six collagen-like stalks converging to a central core, each stalk terminating in a globular head domain (gC1q). The gC1q domains bind to IgG Fc at the CH2 domain face involving P329, P331, D270, K322, and K326 (EU numbering). Critical requirement: C1q requires at least two Fc regions in close proximity for avid engagement. A single monomeric IgG has insufficient affinity for C1q (~10⁴ M⁻¹). When IgG molecules cluster on a target cell surface (e.g., rituximab on CD20-dense B cells), the local Fc density enables multivalent C1q binding (apparent Ka ~10⁷ M⁻¹). Diebolder et al. (Science 343:1260, 2014) demonstrated that IgG1 can form ordered hexameric rings through Fc–Fc contacts at the CH2–CH3 interface, creating an optimal landing platform for C1q. E345R and E430G mutations enhance this hexamerisation, dramatically boosting CDC. IgG subclass hierarchy for CDC: IgG3 > IgG1 >> IgG2 > IgG4 (negligible).',
    },
    {
      type: 'table',
      title: 'IgG Subclass Preferences Across FcγRs',
      headers: ['Receptor', 'IgG1', 'IgG2', 'IgG3', 'IgG4', 'Notes'],
      rows: [
        ['FcγRI (CD64)', '+++', '−', '++++', '++', 'IgG3 highest affinity; IgG2 undetectable'],
        ['FcγRIIa-H131', '++', '+', '++', '+', 'H131 binds IgG2; only FcγR to engage IgG2 meaningfully'],
        ['FcγRIIa-R131', '++', '−/+', '++', '+', 'R131 loses most IgG2 binding'],
        ['FcγRIIb', '+', '−/+', '+', '+', 'Low affinity across all subclasses'],
        ['FcγRIIIa-V158', '++', '−', '++', '+/−', 'V158 has ~2–3× higher IgG1 affinity than F158'],
        ['FcγRIIIa-F158', '+', '−', '+', '−', 'Majority genotype; lower ADCC potency'],
        ['FcγRIIIb', '+', '−', '+', '−', 'GPI-anchored; no signalling'],
        ['C1q', '++', '+', '+++', '−', 'IgG3 strongest CDC; IgG4 essentially no C1q binding'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'ITAM vs ITIM Signalling — The Molecular Toggle',
      color: 'red',
      content:
        'The activating vs inhibitory outcome of FcγR engagement is determined by intracellular signalling motifs. Activating receptors signal through ITAMs (immunoreceptor tyrosine-based activation motifs) with the consensus sequence YxxL/I-x₆₋₈-YxxL/I. FcγRI and FcγRIIIa associate with homodimeric FcεRIγ chains containing ITAMs; FcγRIIa uniquely contains an intrinsic ITAM in its own cytoplasmic tail. Upon receptor crosslinking by multivalent ligands, Src-family kinases (Lyn, Lck, Fyn) phosphorylate ITAM tyrosines, creating docking sites for the tandem SH2 domains of Syk kinase. Syk activation initiates multiple downstream cascades: PLCγ (calcium/NFAT), PI3K/Akt (survival/proliferation), and Ras/MAPK (cytokine production). The inhibitory FcγRIIb contains an ITIM (YxxL) in its cytoplasmic tail. When co-crosslinked with activating receptors, ITIM phosphorylation recruits SHIP-1, which hydrolyses PI(3,4,5)P3 to PI(3,4)P2, terminating the PI3K signal. This creates a molecular rheostat: the A/I ratio determines whether engagement of IgG immune complexes results in activation or inhibition. On macrophages, the ratio is typically 2–5:1 (A:I), favouring activation; on B cells, FcγRIIb dominates, providing negative feedback.',
    },
    {
      type: 'bullets',
      title: 'CMC Implications of FcγR Biology',
      items: [
        'FcγR binding is measured by surface plasmon resonance (SPR) using recombinant FcγR ectodomains. Both V158 and F158 alleles of FcγRIIIa must be tested independently, as the V158 allele has ~2–3× higher affinity for IgG1 — failing to test both alleles creates blind spots in the FcγR binding profile.',
        'Cell-based ADCC assays must specify whether primary NK cells or engineered reporter cell lines are used. Primary NK cell assays are more physiologically relevant but have higher variability; reporter bioassays (e.g., Jurkat-FcγRIIIa-NFAT-luc) are more reproducible and preferred for lot-release testing.',
        'FcγRIIa H131R genotyping of PBMC donors used in ADCP assays is critical — results can vary >10-fold between H/H and R/R donors, leading to false conclusions about Fc variant potency.',
        'The activating/inhibitory FcγR ratio on effector cells varies between individuals and disease states, which is why in vitro effector function assays may not predict clinical efficacy for all patients.',
        'Fc mutations that enhance FcγRIIIa binding (e.g., S239D/I332E, afucosylation) should be checked for concurrent FcγRIIb enhancement, as this could paradoxically increase inhibitory signalling on B cells and macrophage subsets.',
        'Glycan-dependent FcγR modulation (afucosylation, galactosylation) must be characterised in the context of the specific FcγR panel — afucosylation selectively enhances FcγRIIIa without significantly affecting FcγRIIa or C1q.',
      ],
    },
    {
      type: 'callout',
      title: 'Regulatory Expectation — FcγR Binding Characterisation',
      variant: 'warning',
      content:
        'ICH S6(R1) and FDA Guidance for Industry on Scientific Considerations in Demonstrating Biosimilarity to a Reference Product (2015) require that FcγR binding be characterised as part of the functional characterisation package. For originator BLA filings, the expectation is SPR binding data for FcγRI, FcγRIIa (both H131 and R131 alleles), FcγRIIb, FcγRIIIa (both V158 and F158 alleles), FcγRIIIb, and C1q. For biosimilar applications, the FDA classifies FcγR binding as Tier 1 for analytical similarity assessment, requiring the most rigorous statistical equivalence testing (typically equivalence margin approach with 90% CI). Failure to demonstrate equivalent FcγR binding profiles is the most common analytical similarity deficiency cited in FDA Complete Response Letters for biosimilar applications.',
    },
    {
      type: 'callout',
      title: 'Key Concept — Avidity vs Affinity in FcγR Engagement',
      variant: 'info',
      content:
        'Except for FcγRI, all FcγRs are low-affinity receptors (Ka ~10⁶ M⁻¹) that cannot stably engage free monomeric IgG at physiological serum concentrations. Stable binding requires multivalent engagement: when a therapeutic mAb opsonises a target cell, multiple IgG molecules bind the target surface antigen, creating a high local density of Fc regions. The avidity of multivalent FcγR:Fc interactions (apparent Ka ~10⁸–10⁹ M⁻¹) enables stable engagement even by low-affinity receptors. This avidity requirement is why target antigen density on tumour cells is a critical determinant of ADCC efficacy — tumours with low antigen density present insufficient Fc density for FcγRIIIa crosslinking. It also explains why soluble therapeutic mAbs in serum (monomeric IgG) do not inappropriately activate FcγR-bearing cells, providing a natural safety mechanism.',
    },
  ],
  mentorQuestions: [
    'If you are developing a mAb where ADCC is the primary mechanism of action, how would the FcγRIIIa V158F polymorphism influence your Fc engineering strategy and your clinical trial design (e.g., patient stratification)?',
    'Explain why FcγRIIb (the sole inhibitory receptor) can be both a therapeutic obstacle (reducing ADCC/ADCP efficacy) and a therapeutic tool (enabling agonistic antibody crosslinking). How would you exploit each scenario?',
    'In a biosimilar development programme, your SPR data show equivalent FcγRIIIa-V158 binding but a 30% reduction in FcγRIIIa-F158 binding relative to the reference product. How would you assess the clinical significance of this finding?',
  ],
};
