import type { ModuleContent } from '../../types/content';

export const module4: ModuleContent = {
  id: 'glycosylation-m4',
  sectionId: 'glycosylation',
  moduleNumber: 4,
  eyebrow: 'GLYCOSYLATION 05',
  title: 'Fucosylation & ADCC',
  lead: 'The molecular mechanism by which core fucose controls ADCC potency \u2014 from the Asn162 glycan\u2013glycan steric clash to clinical outcomes in Fc\u03B3RIIIa V158F patients.',
  tags: [
    { label: 'FUT8', color: 'teal' },
    { label: 'ADCC', color: 'red' },
    { label: 'Fc\u03B3RIIIa', color: 'purple' },
    { label: 'V158F', color: 'amber' },
  ],
  stats: [
    { label: 'ADCC Enhancement', value: 'Up to 50\u00D7' },
    { label: 'Fc\u03B3RIIIa Contact', value: 'Asn162' },
    { label: 'Key Papers', value: 'Shields 2002' },
    { label: 'Steric Clash', value: 'Tyr158/Phe176' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Core Fucosylation \u2014 The Dominant Modulator of ADCC',
      color: 'teal',
      content:
        'Core fucosylation is the single most impactful glycan modification for antibody-dependent cellular cytotoxicity (ADCC). The \u03B11,6-linked fucose attached by FUT8 to the innermost GlcNAc of the N297 glycan reduces Fc\u03B3RIIIa (CD16a) binding affinity by approximately 5\u201350-fold compared to the afucosylated counterpart. Because ADCC is the primary effector mechanism for many oncology mAbs (rituximab, trastuzumab, cetuximab, obinutuzumab), controlling fucosylation is a Tier 1 CQA and a major glyco-engineering target. The magnitude of the ADCC enhancement from afucosylation dwarfs all other glycan effects: galactosylation and sialylation modulate ADCC by 2\u20133-fold at most, while afucosylation delivers 10\u201350-fold enhancement depending on the assay system and effector cell source. This dominance was first demonstrated by Shields et al. (J. Biol. Chem. 2002) and Shinkawa et al. (J. Biol. Chem. 2003), establishing the field of glyco-engineered antibodies.',
    },
    {
      type: 'card',
      title: 'Crystal Structure Mechanism \u2014 PDB 3SGJ and the Glycan\u2013Glycan Clash',
      color: 'blue',
      content:
        'The molecular mechanism of fucose-mediated ADCC suppression was elucidated by Ferrara et al. (PNAS, 2011) through the crystal structure of the afucosylated Fc\u2013Fc\u03B3RIIIa complex (PDB 3SGJ). The key finding is a carbohydrate\u2013carbohydrate interaction: Fc\u03B3RIIIa carries its own N-linked glycan at Asn162, and this receptor glycan makes direct contacts with the Fc N297 glycan. When the Fc glycan lacks core fucose, the Asn162 glycan of Fc\u03B3RIIIa nestles into the space adjacent to the Fc chitobiose core, forming hydrogen bonds and van der Waals contacts with the first and second core GlcNAc residues. This intimate glycan\u2013glycan contact increases the buried surface area of the Fc\u2013receptor interface by approximately 350 \u00C5\u00B2, stabilising the complex and increasing binding affinity. When core fucose is present on the Fc glycan, it protrudes directly into the space occupied by the Fc\u03B3RIIIa Asn162 glycan, creating a steric clash that pushes the receptor glycan away and eliminates the favourable carbohydrate\u2013carbohydrate contacts. The clash occurs specifically between the C6-linked fucose of the Fc GlcNAc-1 and the first GlcNAc of the Asn162 glycan chain. This steric displacement reduces the total buried surface area and weakens the binding interaction.',
    },
    {
      type: 'card',
      title: 'Fc\u03B3RIIIa Asn162 \u2014 The Receptor Glycosylation Site',
      color: 'purple',
      content:
        'Fc\u03B3RIIIa (CD16a) has five N-linked glycosylation sites: Asn38, Asn45, Asn74, Asn162, and Asn169. Of these, Asn162 is unique because its glycan directly participates in the Fc binding interaction. Mutagenesis studies by Ferrara et al. showed that Asn162Gln mutation on Fc\u03B3RIIIa abolishes the affinity difference between fucosylated and afucosylated IgG \u2014 both bind with similar (high) affinity when the receptor lacks the Asn162 glycan. This confirms that the fucose effect is entirely mediated through the Asn162 glycan\u2013Fc glycan steric clash. The Asn162 glycan on NK cell-derived Fc\u03B3RIIIa is typically complex-type with core fucosylation and variable galactosylation and sialylation. The specific glycoform composition at Asn162 modulates the magnitude of the fucose effect: heavily sialylated Asn162 glycans show a slightly larger clash with Fc fucose because the extended sialylated antennae occupy more space. Recombinant Fc\u03B3RIIIa produced in HEK293 cells (used in SPR binding assays) may have different Asn162 glycosylation than native NK cell receptor, which can affect in vitro binding measurements and should be considered when interpreting SPR data for CQA correlations.',
    },
    {
      type: 'table',
      title: 'Fucosylation Effect on Fc\u03B3R Binding \u2014 Selectivity Profile',
      headers: ['Fc\u03B3 Receptor', 'Cell Type', 'Fucosylated K\u2084 (nM)', 'Afucosylated K\u2084 (nM)', 'Fold Enhancement', 'Functional Impact'],
      rows: [
        ['Fc\u03B3RIIIa V158', 'NK cells (high responders)', '~100\u2013300', '~2\u201310', '~20\u201350\u00D7', 'Dramatic ADCC enhancement'],
        ['Fc\u03B3RIIIa F158', 'NK cells (low responders)', '~300\u2013800', '~10\u201330', '~15\u201340\u00D7', 'Major ADCC enhancement; overcomes F158 deficit'],
        ['Fc\u03B3RI (CD64)', 'Monocytes/macrophages', '~1\u201310', '~1\u201310', '~1\u00D7 (no change)', 'High-affinity receptor; fucose-independent'],
        ['Fc\u03B3RIIa (CD32a)', 'Monocytes/macrophages', '~100\u2013700', '~50\u2013400', '~1.5\u20132\u00D7', 'Modest enhancement; contributes to ADCP'],
        ['Fc\u03B3RIIb (CD32b)', 'B cells, basophils', '~300\u20131000', '~200\u2013700', '~1.5\u00D7', 'Minimal change; inhibitory receptor'],
        ['Fc\u03B3RIIIb (CD16b)', 'Neutrophils', '~200\u2013600', '~5\u201320', '~20\u201340\u00D7', 'Enhanced but GPI-anchored; no ITAM signalling'],
        ['C1q', '\u2014', '~50 \u03BCg/mL', '~50 \u03BCg/mL', '~1\u00D7 (no change)', 'CDC unaffected by fucosylation status'],
        ['FcRn (pH 6.0)', 'Endothelium', '~500\u20131000', '~500\u20131000', '~1\u00D7 (no change)', 'PK unaffected by fucosylation status'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Fc\u03B3RIIIa V158F Polymorphism \u2014 Clinical Pharmacogenomics',
      color: 'amber',
      content:
        'The FCGR3A gene carries a functionally significant single nucleotide polymorphism (SNP) at position 158 (rs396991): valine (V, high affinity) or phenylalanine (F, low affinity). The V158 allele encodes a receptor with approximately 3\u20135-fold higher affinity for fucosylated IgG1 compared to F158, translating directly to enhanced ADCC in V/V homozygous patients. Allele frequencies vary by ethnicity: V allele frequency is approximately 40\u201345% in Caucasians, 25\u201330% in East Asians, and 45\u201350% in Africans. Cartron et al. (Blood, 2002) demonstrated the clinical impact in rituximab-treated follicular lymphoma patients: V/V patients showed significantly higher objective response rates (ORR ~90%) compared to F/F patients (ORR ~50%), with V/F heterozygotes intermediate. This pharmacogenomic disparity creates a therapeutic window that afucosylated antibodies can exploit: by removing core fucose, the antibody binds F158 receptor with affinity comparable to wild-type IgG1 binding V158. This effectively converts F/F patients into "V158-like" responders, eliminating the pharmacogenomic disadvantage. Obinutuzumab (Gazyva, glyco-engineered anti-CD20) demonstrated superior progression-free survival versus rituximab in the CLL11 trial, attributed in part to overcoming the V158F barrier.',
    },
    {
      type: 'card',
      title: 'Shields 2002 \u2014 Foundational Binding Data',
      color: 'green',
      content:
        'Shields et al. (J. Biol. Chem., 2002, "Lack of Fucose on Human IgG1 N-Linked Oligosaccharide Improves Binding to Human Fc\u03B3RIII and Antibody-Dependent Cellular Toxicity") provided the first systematic demonstration that afucosylation enhances Fc\u03B3RIIIa binding. Using a panel of IgG1 glycovariants produced in Lec13 CHO cells (which lack GDP-mannose 4,6-dehydratase, the GMD/GMDS enzyme, and therefore cannot synthesise GDP-fucose), they showed that afucosylated IgG1 bound Fc\u03B3RIIIa V158 with approximately 50-fold higher affinity than fucosylated counterparts. Crucially, afucosylation had no effect on Fc\u03B3RI binding (already high-affinity and saturated), minimal effect on Fc\u03B3RIIa/b, and no effect on FcRn or C1q binding. This selectivity for Fc\u03B3RIIIa was the key insight: it meant afucosylation could enhance ADCC without perturbing other Fc effector functions or PK. The Shields data established the quantitative relationship between fucose content and Fc\u03B3RIIIa K\u2084 that became the basis for glyco-engineering specifications.',
    },
    {
      type: 'card',
      title: 'Shinkawa 2003 \u2014 ADCC Potency Correlation',
      color: 'teal',
      content:
        'Shinkawa et al. (J. Biol. Chem., 2003, "The Absence of Fucose but Not the Presence of Galactose or Bisecting N-Acetylglucosamine of Human IgG1 Complex-Type Oligosaccharides Shows the Critical Role of Enhancing Antibody-Dependent Cellular Cytotoxicity") extended the Shields findings by systematically dissecting the contribution of each glycan modification to ADCC. Using antibodies with defined glycoform compositions, they demonstrated that: (1) afucosylation alone was sufficient and necessary for maximum ADCC enhancement \u2014 neither galactosylation, bisecting GlcNAc, nor sialylation could substitute; (2) bisecting GlcNAc enhanced ADCC only because it prevented fucosylation (the indirect mechanism via GnTIII/FUT8 competition, not a direct receptor effect); (3) the ADCC enhancement from afucosylation was consistent across multiple target antigens and cell lines; (4) the magnitude of enhancement was 20\u201350-fold in PBMC-based ADCC assays using healthy donor effector cells. This paper established that core fucose is the dominant glycan variable for ADCC and shifted the field toward FUT8-targeted glyco-engineering.',
    },
    {
      type: 'table',
      title: 'Glyco-Engineering Platforms for Afucosylation',
      headers: ['Platform', 'Company', 'Mechanism', 'Fucose Level', 'Approved Product', 'Year'],
      rows: [
        ['POTELLIGENT\u00AE', 'BioWa/Kyowa Kirin', 'FUT8 gene knockout in CHO', '<5%', 'Mogamulizumab (Poteligeo)', '2012 (JP)'],
        ['GlycoMAb\u00AE', 'Roche/Glycart', 'MGAT3 (GnTIII) overexpression in CHO', '<10% (bisecting blocks fucose)', 'Obinutuzumab (Gazyva)', '2013 (US)'],
        ['SEA\u00AE (Sugar-Engineered Antibody)', 'Seattle Genetics', '2-Fluorofucose cell culture additive', '<10%', 'None approved (in clinical trials)', '\u2014'],
        ['Lec13 CHO cells', 'Academic', 'GMD/GMDS mutation; no GDP-fucose synthesis', '<5%', 'Research tool only', '\u2014'],
        ['GlycoDelete\u2122', 'VIB/Ghent', 'Endo T expression; single GlcNAc stump', '<1% fucose', 'Preclinical', '\u2014'],
        ['YB2/0 cell line', 'LFB Biotechnologies', 'Rat cell line with low FUT8 expression', '~10\u201320%', 'Ublituximab (Briumvi)', '2022 (US)'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'FUT8 Enzymology and GDP-Fucose Metabolism',
      color: 'red',
      content:
        '\u03B11,6-Fucosyltransferase 8 (FUT8, EC 2.4.1.68) is the sole enzyme responsible for core \u03B11,6-fucosylation of N-linked glycans in mammals. FUT8 transfers fucose from GDP-fucose to the C6 hydroxyl of the asparagine-linked (reducing-end) GlcNAc of the chitobiose core. The enzyme requires at least the GnTI product (GlcNAcMan\u2085GlcNAc\u2082) as the minimal substrate, though it acts most efficiently on the GnTII product (the full biantennary core). GDP-fucose is synthesised through two pathways: the de novo pathway (GDP-mannose \u2192 GDP-4-keto-6-deoxymannose via GMD/GMDS \u2192 GDP-fucose via FX/TSTA3; accounts for ~90% of GDP-fucose) and the salvage pathway (free fucose \u2192 fucose-1-phosphate via FUK \u2192 GDP-fucose via FPGT; accounts for ~10%). GDP-fucose is transported into the Golgi lumen by SLC35C1. Process levers targeting the GDP-fucose supply chain include: 2-fluorofucose (2FF, a competitive inhibitor of FUT8 via GDP-2F-Fuc formation), fucose-free media (limiting salvage pathway), and manganese supplementation (which does not affect fucosylation but shifts other glycan parameters). FUT8 knockout is the most definitive approach, producing <1% core-fucosylated species.',
    },
    {
      type: 'bullets',
      title: 'Clinical Impact \u2014 ADCC-Dependent mAbs and Fucosylation',
      color: 'amber',
      items: [
        'Rituximab (MabThera/Rituxan): ADCC is the primary MoA for B-cell depletion. Cartron 2002 showed Fc\u03B3RIIIa V/V patients had ~90% ORR vs ~50% for F/F in follicular lymphoma, demonstrating the clinical relevance of fucose-dependent ADCC potency in vivo.',
        'Obinutuzumab (Gazyva): GlycoMAb\u00AE glyco-engineered anti-CD20 with <10% core fucose. CLL11 trial (Goede 2014, NEJM) showed superior PFS vs rituximab + chlorambucil in CLL. The ADCC enhancement from afucosylation is a key contributor, though enhanced direct cell death also plays a role.',
        'Mogamulizumab (Poteligeo): POTELLIGENT\u00AE anti-CCR4 with FUT8 knockout. Approved for adult T-cell leukaemia/lymphoma (ATLL) in Japan (2012) and cutaneous T-cell lymphoma (CTCL) in US/EU (2018). Demonstrates that afucosylation delivers clinical benefit across different tumour types and target antigens.',
        'Trastuzumab (Herceptin): ADCC contributes to anti-tumour activity in HER2+ breast cancer (Clynes 2000, Nature Med). Fc\u03B3RIIIa V/V patients show improved clinical outcomes. Afucosylated trastuzumab variants have been explored in preclinical and early clinical settings.',
        'Margetuximab (Margenza): Fc-engineered anti-HER2 with enhanced Fc\u03B3RIIIa binding (via Fc point mutations L235V/F243L/R292P/Y300L/P396L, not glyco-engineering). SOPHIA trial showed PFS benefit vs trastuzumab in Fc\u03B3RIIIa F carriers, validating the pharmacogenomic rationale.',
        'Ublituximab (Briumvi): Anti-CD20 produced in YB2/0 cells with naturally low fucosylation (~10\u201320%). Approved for relapsing MS (2022). Demonstrates that moderate afucosylation can deliver meaningful ADCC enhancement without complete FUT8 knockout.',
      ],
    },
    {
      type: 'callout',
      title: 'Afucosylation as a CQA \u2014 Specification Setting',
      variant: 'warning',
      content:
        'For ADCC-dependent mAbs, total afucosylated species is a Tier 1 CQA with release specifications. The specification range must balance two considerations: (1) sufficient afucosylation to maintain therapeutic ADCC potency within the clinically validated range, and (2) not so much afucosylation variability that batch-to-batch potency becomes unpredictable. For standard (non-glyco-engineered) IgG1, typical CHO processes produce 2\u20138% afucosylated species, and specifications are set as NMT 8\u201312% to contain upward drift. For glyco-engineered products (obinutuzumab, mogamulizumab), the target is inverted: afucosylation >90% with specifications like NLT 85% afucosylated. The relationship between afucosylation percentage and ADCC potency is non-linear: ADCC enhancement is steep from 0\u201320% afucosylation, then plateaus above ~30\u201340%. This means that even small increases in afucosylation in the 0\u201310% range can have disproportionate ADCC impact \u2014 underscoring the importance of tight process control. ADCC potency bioassays (using engineered effector cells like Jurkat-NFAT-Fc\u03B3RIIIa reporter cells) should be correlated with glycan profile data to establish molecule-specific potency\u2013glycan relationships during development.',
    },
    {
      type: 'callout',
      title: 'Beyond ADCC \u2014 Afucosylation and ADCP',
      variant: 'info',
      content:
        'While ADCC (NK cell-mediated) receives the most attention, afucosylation also modestly enhances antibody-dependent cellular phagocytosis (ADCP) mediated by macrophages through Fc\u03B3RIIIa and Fc\u03B3RIIa. Macrophages co-express Fc\u03B3RIIIa, Fc\u03B3RIIa (activating), and Fc\u03B3RIIb (inhibitory), so the net phagocytic response depends on the activating-to-inhibitory (A/I) receptor ratio. Afucosylation enhances Fc\u03B3RIIIa binding on macrophages by the same steric mechanism as on NK cells, tipping the A/I ratio toward activation and increasing ADCP. The Fc\u03B3RIIa enhancement is more modest (~1.5\u20132-fold). Importantly, Fc\u03B3RIIb (the sole inhibitory Fc\u03B3R) is minimally affected by fucosylation status, so the A/I ratio improvement is driven primarily by the Fc\u03B3RIIIa arm. For solid tumour mAbs where tumour-associated macrophage (TAM) infiltration is high, the ADCP enhancement from afucosylation may contribute meaningfully to anti-tumour efficacy beyond the NK cell ADCC component.',
    },
  ],
  mentorQuestions: [
    'Your ADCC-dependent mAb shows 5% afucosylated species by HILIC-FLD, but the ADCC potency bioassay reports 120% relative potency (vs reference standard at 100%). A new batch comes in at 9% afucosylated with 155% relative potency. Regulatory affairs asks whether the potency increase is clinically meaningful and whether the specification should be tightened. How do you construct the analytical and clinical argument?',
    'A competitor publishes that their biosimilar rituximab has 2% afucosylated species versus the innovator range of 3\u20137%. The competitor argues this is within analytical variability. You are the CMC reviewer at the agency. What additional data would you request, and what functional assays would need to demonstrate similarity?',
    'Your company is developing a new anti-CD20 mAb and must decide between three glyco-engineering approaches: FUT8 knockout (POTELLIGENT), MGAT3 overexpression (GlycoMAb), or 2-fluorofucose cell culture additive. Compare these three approaches in terms of afucosylation consistency, process robustness, regulatory precedent, and CMC development timeline.',
  ],
};
