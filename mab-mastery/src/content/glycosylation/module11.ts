import type { ModuleContent } from '../../types/content';

export const module11: ModuleContent = {
  id: 'glycosylation-m11',
  sectionId: 'glycosylation',
  moduleNumber: 11,
  eyebrow: 'GLYCOSYLATION 12',
  title: 'Glycoengineering Strategies',
  lead: 'From FUT8 knockout to chemoenzymatic remodelling — every glycoengineering approach with mechanism, regulatory implications, and head-to-head comparison.',
  tags: [
    { label: 'FUT8 KO', color: 'red' },
    { label: 'GnTIII OE', color: 'purple' },
    { label: '2F-Fucose', color: 'amber' },
    { label: 'CRISPR', color: 'blue' },
  ],
  stats: [
    { label: 'Approaches', value: '6+' },
    { label: 'Most Common', value: 'FUT8 KO' },
    { label: 'Media Additive', value: '2F-Fucose' },
    { label: 'Approved Products', value: '3+' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Why Glycoengineer? — The Biological Rationale',
      color: 'blue',
      content:
        'The driving force behind glycoengineering in therapeutic mAb development is the desire to enhance Fc-mediated effector functions — principally ADCC — beyond what is achievable with wild-type CHO-produced glycans. Standard CHO cell lines produce mAbs with >90% core-fucosylated glycans, because the endogenous FUT8 (α1,6-fucosyltransferase, gene FUT8) is highly active and efficiently adds core fucose to essentially all complex-type N-glycans. This core fucose creates a steric clash with the N-glycan on FcγRIIIa (at Asn162, which is itself fucosylated in the majority of human FcγRIIIa allotypes), reducing Fc-FcγRIIIa binding affinity by ~50-fold compared to afucosylated IgG. For mAbs whose mechanism of action depends on ADCC (e.g., anti-CD20 for B-cell depletion, anti-CCR4 for T-cell lymphoma, anti-IL-5Rα for eosinophil depletion), enhancing ADCC through glycoengineering can provide clinically meaningful improvements in efficacy. Six major glycoengineering approaches have been developed, each with distinct mechanisms, advantages, and regulatory implications.',
    },
    {
      type: 'card',
      title: 'Strategy 1 — FUT8 Knockout (CRISPR/ZFN)',
      color: 'red',
      content:
        'Complete biallelic knockout of the FUT8 gene eliminates core fucosylation entirely, producing 100% afucosylated N-glycans on all glycoproteins expressed by the cell line. Historical approaches used zinc finger nucleases (ZFNs) or TALENs for FUT8 disruption, but CRISPR/Cas9 has become the standard due to its efficiency and design flexibility. The engineering process involves: (1) Design of guide RNAs targeting early exons of FUT8 (typically exons 7-9, encoding the catalytic domain); (2) Transfection of CHO cells with Cas9 + dual guide RNAs to create frameshift deletions; (3) Clonal selection using lectin (Lens culinaris agglutinin, LCA) — LCA binds core-fucosylated glycans, so FUT8-KO clones survive LCA selection while wild-type cells are killed; (4) Confirmation of biallelic knockout by genomic sequencing and HILIC glycan analysis showing 0% fucosylation. The POTELLIGENT platform (Kyowa Kirin/BioWa) pioneered this approach. Key advantages: complete and permanent afucosylation, no residual fucose variability, clean glycan profile. Key limitation: requires new cell line development from scratch — cannot be applied to an existing manufacturing cell line without creating a new clone, triggering full CMC comparability.',
    },
    {
      type: 'card',
      title: 'Strategy 2 — GnTIII Overexpression (GlycoMAb)',
      color: 'purple',
      content:
        'Overexpression of N-acetylglucosaminyltransferase III (GnTIII, gene MGAT3) introduces bisecting β1,4-GlcNAc residues on the trimannosyl core. The bisecting GlcNAc sterically blocks FUT8 access to the innermost core GlcNAc, thereby preventing core fucosylation on bisected glycans. The GlycoMAb platform (Roche/Glycart) co-expresses GnTIII with a Golgi-targeted variant of α-mannosidase II (MAN2A1 fused to the N-terminal Golgi-targeting signal of GnTI/MGAT1). This mannosidase II ensures efficient trimming of Man5GlcNAc₂ to GlcNAcMan₃GlcNAc₂, providing the optimal substrate for GnTIII. Without co-expressed mannosidase II, GnTIII overexpression produces hybrid-type glycans (Man₅GlcNAc₃ with bisecting) that are suboptimal for FcγRIIIa engagement. The resulting glycan profile is predominantly afucosylated and bisected (typically >70% afucosylated), with residual fucosylated species (10-30%) reflecting the kinetic competition between GnTIII and endogenous FUT8. Obinutuzumab (Gazyva) is the approved product manufactured using this technology.',
    },
    {
      type: 'card',
      title: 'Strategy 3 — FUT8 KO + GnTIII Overexpression',
      color: 'green',
      content:
        'The combination of FUT8 knockout with GnTIII (MGAT3) overexpression represents the most aggressive glycoengineering approach, producing glycans that are both 100% afucosylated (from FUT8 KO) and predominantly bisected (from GnTIII OE). This eliminates the residual fucosylation inherent in the GnTIII-only approach and adds the direct FcγRIIIa contact mechanism of the bisecting GlcNAc. In vitro, FUT8-KO/GnTIII-OE antibodies show the highest ADCC enhancement — typically 50-100× over wild-type CHO mAbs — due to the dual mechanism. However, this approach has not yet been commercialised for approved products, likely because: (1) The marginal ADCC benefit over FUT8-KO alone is modest in vivo; (2) The glycan profile complexity increases significantly, complicating analytical characterisation and specification setting; (3) The regulatory pathway requires justification for each engineering modification. Research applications continue to explore this dual approach for targets where maximal NK cell activation is desired (e.g., solid tumour antigens with limited cell-surface density).',
    },
    {
      type: 'card',
      title: 'Strategy 4 — 2-Fluorofucose Media Additive',
      color: 'amber',
      content:
        'Peracetylated 2-fluorofucose (2F-Fuc) is a small-molecule inhibitor of GDP-fucose biosynthesis that can be added directly to cell culture media to reduce core fucosylation without any genetic modification of the host cell line. The mechanism involves: (1) 2F-Fuc enters the cell and is converted to GDP-2F-Fuc via the fucose salvage pathway; (2) GDP-2F-Fuc acts as a competitive inhibitor of GDP-mannose-4,6-dehydratase (GMDS), the first committed enzyme in the de novo GDP-fucose synthesis pathway; (3) GDP-2F-Fuc also inhibits FUT8 directly as a non-productive substrate analogue. At concentrations of 100-400 µM, 2F-Fuc reduces core fucosylation to <5%, producing an ADCC-enhanced glycan profile comparable to FUT8-KO cell lines. Key advantages: (1) No genetic modification required — can be applied to any existing CHO cell line, including manufacturing cell lines with established regulatory history; (2) Dose-dependent control — by adjusting 2F-Fuc concentration, intermediate fucosylation levels (e.g., 20%, 50%) can be achieved for fine-tuning; (3) Reversible — removing 2F-Fuc restores normal fucosylation. Key limitations: (1) Media additive supply chain and lot-to-lot variability must be controlled; (2) Regulatory classification — 2F-Fuc is a novel media component that requires toxicological qualification and demonstration of clearance during downstream purification; (3) Batch-to-batch fucosylation consistency depends on 2F-Fuc dosing precision.',
    },
    {
      type: 'card',
      title: 'Strategy 5 — Kifunensine (α-Mannosidase I Inhibitor)',
      color: 'teal',
      content:
        'Kifunensine is a potent inhibitor of α-mannosidase I (MAN1A1, MAN1A2, MAN1B1), the ER/cis-Golgi enzyme that trims Man₉GlcNAc₂ to Man₅GlcNAc₂ — the first committed step in converting high-mannose glycans to complex-type. Treatment of CHO cells with kifunensine (typically 1-10 µg/mL) blocks this trimming, producing mAbs bearing predominantly Man₈-Man₉GlcNAc₂ high-mannose glycans. These Man₈-Man₉ glycans are inherently afucosylated (FUT8 requires complex-type substrates) and lack terminal galactose and sialic acid. Kifunensine-produced mAbs show enhanced ADCC (due to afucosylation) but have dramatically altered PK — high-mannose glycans bind mannose receptors on liver sinusoidal endothelial cells and Kupffer cells, accelerating clearance and reducing serum half-life by 2-5×. This PK penalty makes kifunensine impractical for therapeutic manufacturing. However, kifunensine is valuable as a research tool: (1) Producing uniformly glycosylated material for structural studies (X-ray crystallography of glycoprotein complexes); (2) Generating high-mannose-enriched reference standards for HILIC method development; (3) Investigating the relationship between glycan processing and protein folding/secretion.',
    },
    {
      type: 'card',
      title: 'Strategy 6 — Chemoenzymatic Glycan Remodelling',
      color: 'blue',
      content:
        'Chemoenzymatic remodelling is a post-production glycoengineering strategy that uses enzymes to remove endogenous heterogeneous glycans and replace them with defined, homogeneous glycoforms. The process involves two enzymatic steps: (1) Endoglycosidase cleavage — Endo-S2 (from Streptococcus pyogenes) cleaves the β1,4-glycosidic bond between the two core GlcNAc residues, leaving a single GlcNAc (±fucose) attached to Asn297. This generates a truncated, homogeneous glycan stub. (2) Transglycosylation — a mutant endoglycosidase (e.g., Endo-S2 D184M or Endo-D N322Q, engineered to have transglycosylation but not hydrolysis activity) transfers a synthetic sugar-oxazoline (activated glycan donor) to the GlcNAc stub, rebuilding a defined complex-type glycan. By using different sugar-oxazoline donors, any desired glycoform can be installed: fully galactosylated, afucosylated, sialylated, or combinations. This approach produces unprecedented glycan homogeneity (>95% single glycoform) compared to the heterogeneous profiles from cell-based production. Applications include: (1) Producing ADC intermediates with defined glycan for site-specific conjugation (GlycoConnect technology, Synaffix); (2) Structure-activity studies correlating specific glycoforms with effector function; (3) Potential manufacturing of homogeneous glycoprotein therapeutics, although scalability and cost remain challenges.',
    },
    {
      type: 'table',
      title: 'Head-to-Head Comparison of All Glycoengineering Strategies',
      headers: ['Feature', 'FUT8 KO', 'GnTIII OE', 'FUT8 KO + GnTIII', '2F-Fucose', 'Kifunensine', 'Chemoenzymatic'],
      rows: [
        ['Modification type', 'Genetic (KO)', 'Genetic (OE)', 'Genetic (KO + OE)', 'Media additive', 'Media additive', 'Post-production'],
        ['Core fucose', '0%', '10-30% residual', '0%', '0-5% (dose-dep)', '0% (Man8-9)', 'Designable'],
        ['Bisecting GlcNAc', 'No', 'Yes (majority)', 'Yes', 'No', 'No', 'Designable'],
        ['Glycan type produced', 'Complex afucosylated', 'Bisected complex', 'Bisected afucosylated', 'Complex afucosylated', 'Man8-Man9 high mannose', 'Homogeneous defined'],
        ['ADCC enhancement', '50-100×', '10-20×', '50-100×', '20-50×', '10-20×', 'Glycoform-dependent'],
        ['Cell line change required', 'Yes (new clone)', 'Yes (new clone)', 'Yes (new clone)', 'No', 'No', 'No (post-prod step)'],
        ['Reversible', 'No (permanent KO)', 'No (stable OE)', 'No', 'Yes', 'Yes', 'N/A (in vitro)'],
        ['PK impact', 'None', 'None', 'None', 'None', 'Major (↓ t½)', 'Glycoform-dependent'],
        ['Glycan profile complexity', 'Low (clean)', 'High (bisected peaks)', 'High', 'Low', 'Low (Man8-9)', 'Minimal (homogeneous)'],
        ['Regulatory pathway', 'New cell line BLA', 'New cell line BLA', 'New cell line BLA', 'Process change / comparability', 'Research only', 'Novel manufacturing step'],
        ['Scalability', 'Standard CHO process', 'Standard CHO process', 'Standard CHO process', 'Standard + additive', 'Standard + additive', 'Additional unit operation'],
        ['Approved products', 'Mogamulizumab, Benralizumab', 'Obinutuzumab', 'None (preclinical)', 'None (clinical stage)', 'N/A (research tool)', 'None (clinical stage)'],
      ],
      sortable: false,
    },
    {
      type: 'callout',
      title: 'Regulatory Classification — Cell Line vs Media Change',
      variant: 'info',
      content:
        'The regulatory pathway for glycoengineering depends critically on whether the modification involves a cell line change or a process/media change. FUT8 KO and GnTIII OE require creating a new production cell line, which means a new BLA/MAA submission with full CMC characterisation — cell banking, genetic stability, process development, analytical comparability, and potentially new clinical data. In contrast, 2-fluorofucose is a media additive that can theoretically be introduced as a process change to an existing marketed product. However, because 2F-Fuc fundamentally alters the glycan profile (and therefore effector function), it would be classified as a major manufacturing change requiring extensive comparability and potentially a bridging clinical study. The FDA guidance on process changes (2017) states that changes affecting CQAs linked to clinical outcomes require the most rigorous comparability exercise. Chemoenzymatic remodelling adds a novel manufacturing step that falls outside traditional mAb production paradigms — regulatory agencies would evaluate it as a new manufacturing process requiring full justification of the enzymatic step, enzyme clearance validation, and product quality comparability.',
    },
    {
      type: 'card',
      title: 'Emerging Strategies — GMD/FX KO and RMD Expression',
      color: 'green',
      content:
        'Beyond the six established approaches, additional glycoengineering strategies are under development. GDP-mannose 4,6-dehydratase (GMDS/GMD) knockout eliminates the first step of de novo GDP-fucose biosynthesis, producing afucosylated glycans. Unlike FUT8 KO, GMD-KO cells can be "rescued" by exogenous fucose addition (which feeds the salvage pathway), enabling tuneable fucosylation control at the media level. GDP-fucose pyrophosphatase (GFPP) overexpression depletes the intracellular GDP-fucose pool by hydrolysing it to GMP + fucose-1-phosphate. GDP-4-keto-6-deoxymannose-3,5-epimerase-4-reductase (FX, also known as TSTA3) knockout blocks the second step of de novo GDP-fucose synthesis, with similar effects to GMD KO. Bacterial GDP-6-deoxy-D-lyxo-4-hexulose reductase (RMD) expression in CHO cells diverts GDP-4-keto-6-deoxymannose away from GDP-fucose synthesis toward GDP-rhamnose (a sugar not used in mammalian glycosylation), effectively depleting the GDP-fucose pool without completely blocking it. Each of these approaches offers nuanced control over fucosylation levels and is being evaluated for clinical development.',
    },
    {
      type: 'card',
      title: 'The GlycoDelete Approach — Minimal Glycosylation',
      color: 'purple',
      content:
        'An orthogonal glycoengineering philosophy is embodied by GlycoDelete (VIB/Ghent University), which aims to simplify rather than enhance glycosylation. The GlycoDelete system involves: (1) Knockout of GnTI (MGAT1) — blocking the conversion of Man5GlcNAc₂ to complex-type glycans; (2) Expression of an ER-targeted endo-β-N-acetylglucosaminidase (EndoT from Hypocrea jecorina) that trims Man5GlcNAc₂ to a single GlcNAc; (3) Optional expression of galactosyltransferase and sialyltransferase to build a minimal trisaccharide (Sia-Gal-GlcNAc) on the remaining stub. The resulting glycoproteins bear short, homogeneous glycans that do not engage mannose receptors (avoiding the PK penalty of high-mannose) but also eliminate Fc effector function heterogeneity. GlycoDelete mAbs are essentially effector-silent by glycan modification, which may be desirable for blocking/neutralising mAbs where effector function is unwanted. This approach remains in research/early preclinical stage but represents an important conceptual expansion of the glycoengineering toolkit — moving beyond "more ADCC" to "designed effector silence."',
    },
    {
      type: 'bullets',
      title: 'Decision Framework — Selecting a Glycoengineering Strategy',
      items: [
        'Step 1 — Define the therapeutic need: Does the MoA require ADCC enhancement? If yes, glycoengineering is warranted. If the MoA is blocking/neutralising with no effector requirement, standard glycosylation (or even effector-silent engineering) may be preferred.',
        'Step 2 — New product vs existing product: For new products, cell line-based approaches (FUT8 KO, GnTIII OE) are preferred because the cell line can be engineered from the start. For existing marketed products where ADCC enhancement is desired, media-based approaches (2F-fucose) avoid creating a new cell line.',
        'Step 3 — Degree of afucosylation needed: If 100% afucosylation is required for maximal and consistent ADCC, FUT8 KO is the best choice. If partial afucosylation (70-90%) is acceptable, GnTIII OE or 2F-fucose offer flexibility.',
        'Step 4 — IP landscape: Evaluate freedom-to-operate for each technology. POTELLIGENT (Kyowa Kirin) and GlycoMAb (Roche) patents may restrict access to FUT8-KO and GnTIII-OE approaches, respectively. 2F-fucose and CRISPR-based approaches may offer a less encumbered IP path.',
        'Step 5 — Analytical and regulatory readiness: Consider the analytical complexity of the resulting glycan profile. FUT8 KO produces the simplest profile (standard minus fucose). GnTIII OE produces the most complex (bisected species). Simpler profiles reduce analytical development burden and regulatory risk.',
        'Step 6 — Manufacturing platform compatibility: Evaluate whether the selected strategy is compatible with the existing manufacturing platform (CHO host cell, media system, purification process). Cell line-based approaches require full process development; media-based approaches can leverage existing platforms.',
      ],
    },
  ],
  mentorQuestions: [
    'You are developing an ADCC-dependent anti-tumour mAb and need to choose a glycoengineering strategy. Walk through the decision framework, considering that your company has an existing CHO-K1 platform with established regulatory history.',
    'Explain why 2-fluorofucose would be classified as a major manufacturing change even though it does not require cell line modification — what regulatory precedents apply?',
    'Compare the analytical characterisation requirements for a FUT8-KO product versus a GnTIII-OE product — which creates more work for the analytical development team and why?',
  ],
};

export default module11;
