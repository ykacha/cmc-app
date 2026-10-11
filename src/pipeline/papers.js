/* Research papers for the Pipeline deep dives. Every record was checked
   against PubMed on 2026-10-11 (PMID, authors, year, title, journal, pages).
   The one-line notes say why the paper is worth reading for that station. */

export const PAPERS = {
  15245907: { authors: "Gustafsson C, Govindarajan S, Minshull J", year: 2004, title: "Codon bias and heterologous protein expression", journal: "Trends Biotechnol", cite: "22:346-53" },
  25821140: { authors: "Jarasch A, Koll H, Regula JT, et al.", year: 2015, title: "Developability assessment during the selection of novel therapeutic antibodies", journal: "J Pharm Sci", cite: "104:1885-98" },
  19571001: { authors: "Chennamsetty N, Voynov V, Kayser V, et al.", year: 2009, title: "Design of therapeutic proteins with enhanced stability", journal: "Proc Natl Acad Sci U S A", cite: "106:11937-42" },
  31231397: { authors: "Saunders KO", year: 2019, title: "Conceptual approaches to modulating antibody effector functions and circulation half-life", journal: "Front Immunol", cite: "10:1296" },
  1369995: { authors: "Cockett MI, Bebbington CR, Yarranton GT", year: 1990, title: "High level expression of tissue inhibitor of metalloproteinases in Chinese hamster ovary cells using glutamine synthetase gene amplification", journal: "Biotechnology (N Y)", cite: "8:662-7" },
  30520869: { authors: "Walsh G", year: 2018, title: "Biopharmaceutical benchmarks 2018", journal: "Nat Biotechnol", cite: "36:1136-45" },
  21964570: { authors: "Luo J, Vijayasankaran N, Autsen J, et al.", year: 2012, title: "Comparative metabolite analysis to understand lactate metabolism shift in Chinese hamster ovary cell culture process", journal: "Biotechnol Bioeng", cite: "109:146-56" },
  24942482: { authors: "Labrenz SR", year: 2014, title: "Ester hydrolysis of polysorbate 80 in mAb drug product: evidence in support of the hypothesized risk after the observation of visible particulate in mAb formulations", journal: "J Pharm Sci", cite: "103:2268-77" },
  29851298: { authors: "Walther J, Lu J, Hollenbach M, et al.", year: 2019, title: "Perfusion cell culture decreases process and product heterogeneity in a head-to-head comparison with fed-batch", journal: "Biotechnol J", cite: "14:e1700733" },
  12573005: { authors: "Mostafa SS, Gu X", year: 2003, title: "Strategies for improved dCO2 removal in large-scale fed-batch cultures", journal: "Biotechnol Prog", cite: "19:45-51" },
  10397813: { authors: "Kaufmann H, Mazur X, Fussenegger M, et al.", year: 1999, title: "Influence of low temperature on productivity, proteome and protein phosphorylation of CHO cells", journal: "Biotechnol Bioeng", cite: "63:573-82" },
  15529164: { authors: "Wurm FM", year: 2004, title: "Production of recombinant protein therapeutics in cultivated mammalian cells", journal: "Nat Biotechnol", cite: "22:1393-8" },
  17046339: { authors: "Shukla AA, Hubbard B, Tressel T, et al.", year: 2007, title: "Downstream processing of monoclonal antibodies: application of platform approaches", journal: "J Chromatogr B", cite: "848:28-39" },
  26186204: { authors: "Rogers RS, Nightlinger NS, Livingston B, et al.", year: 2015, title: "Development of a quantitative mass spectrometry multi-attribute method for characterization, quality control testing and disposition of biologics", journal: "MAbs", cite: "7:881-90" },
  23134362: { authors: "Beck A, Wagner-Rousset E, Ayoub D, et al.", year: 2013, title: "Characterization of therapeutic antibodies and related products", journal: "Anal Chem", cite: "85:715-36" },
  17025277: { authors: "Berkowitz SA", year: 2006, title: "Role of analytical ultracentrifugation in assessing the aggregation of protein biopharmaceuticals", journal: "AAPS J", cite: "8:E590-605" },
  26419285: { authors: "Doshi N, Demeule B, Yadav S", year: 2015, title: "Understanding particle formation: solubility of free fatty acids as polysorbate 20 degradation byproducts in therapeutic monoclonal antibody formulations", journal: "Mol Pharm", cite: "12:3792-804" },
  15124199: { authors: "Shire SJ, Shahrokh Z, Liu J", year: 2004, title: "Challenges in the development of high protein concentration formulations", journal: "J Pharm Sci", cite: "93:1390-402" },
  16839640: { authors: "Daugherty AL, Mrsny RJ", year: 2006, title: "Formulation and delivery issues for monoclonal antibody therapeutics", journal: "Adv Drug Deliv Rev", cite: "58:686-706" },
  20304511: { authors: "Shukla AA, Thömmes J", year: 2010, title: "Recent advances in large-scale production of monoclonal antibodies and related proteins", journal: "Trends Biotechnol", cite: "28:253-61" },
  19131992: { authors: "Rathore AS, Winkle H", year: 2009, title: "Quality by design for biopharmaceuticals", journal: "Nat Biotechnol", cite: "27:26-34" },
  20065641: { authors: "Kelley B", year: 2009, title: "Industrialization of mAb production technology: the bioprocessing industry at a crossroads", journal: "MAbs", cite: "1:443-52" },
  16998873: { authors: "Wang W, Singh S, Zeng DL, et al.", year: 2007, title: "Antibody structure, instability, and formulation", journal: "J Pharm Sci", cite: "96:1-26" },
  20143256: { authors: "Manning MC, Chou DK, Murphy BM, et al.", year: 2010, title: "Stability of protein pharmaceuticals: an update", journal: "Pharm Res", cite: "27:544-75" },
  15529163: { authors: "Chirino AJ, Mire-Sluis A", year: 2004, title: "Characterizing biological products and assessing comparability following manufacturing changes", journal: "Nat Biotechnol", cite: "22:1383-91" },
  21478841: { authors: "Schiestl M, Stangler T, Torella C, et al.", year: 2011, title: "Acceptable changes in quality attributes of glycosylated biopharmaceuticals", journal: "Nat Biotechnol", cite: "29:310-2" },
};

export const STAGE_PAPERS = {
  s01: [
    [15245907, "Why codon usage limits expression, and what optimisation can and cannot fix."],
    [25821140, "How an industry team screens candidates for manufacturability before choosing one."],
    [19571001, "Predicting aggregation-prone regions from structure and engineering them out."],
    [31231397, "The Fc engineering options that change effector function and half-life."],
  ],
  s02: [[1369995, "The original glutamine synthetase amplification system in CHO cells."]],
  s03: [
    [30520869, "The landscape of approved biologics and the expression systems behind them."],
    [21964570, "How lactate metabolism shifts between clones and processes, and why it matters."],
    [24942482, "Why host-cell enzymes surviving purification can degrade polysorbate in the vial."],
  ],
  s05: [
    [15529164, "The classic overview of how mammalian-cell production reached gram-per-litre titres."],
    [10397813, "What a temperature shift actually does to CHO productivity and the proteome."],
    [12573005, "Why dissolved CO2 builds up at large scale and how to remove it."],
    [29851298, "Perfusion against fed-batch, compared head to head on quality and heterogeneity."],
  ],
  s06: [
    [17046339, "The platform purification approach that most antibody processes still follow."],
    [24942482, "A downstream lesson: an enzyme the process failed to clear shows up as particles."],
  ],
  s07: [
    [23134362, "A broad map of the methods used to characterise therapeutic antibodies."],
    [26186204, "The multi-attribute method: one LC-MS assay for many quality attributes."],
    [17025277, "Analytical ultracentrifugation as an orthogonal check on aggregation."],
  ],
  s08: [
    [15124199, "The core problems of high-concentration formulations: viscosity, aggregation, delivery."],
    [16839640, "Formulation and delivery issues specific to monoclonal antibodies."],
    [26419285, "How polysorbate degradation products form particles in the final product."],
  ],
  s10: [[20304511, "How large-scale antibody production evolved, from titre to purification capacity."]],
  s11: [[19131992, "Quality by design applied to biopharmaceuticals: the framework behind process characterisation."]],
  s13: [[20065641, "What industrialised mAb manufacturing looks like and where it was heading."]],
  s14: [
    [16998873, "How antibody structure explains its instability, and what formulation does about it."],
    [20143256, "The standard review of protein degradation pathways and stabilisation."],
  ],
  s15: [[15529163, "How products are characterised and comparability is argued after manufacturing changes."]],
  s16: [[21478841, "How much marketed products have actually changed after process changes, and why it was acceptable."]],
};

export const pubmedUrl = (pmid) => `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;

// the verified paper a card's citation refers to, matched on first author and year
export function matchPaper(citation) {
  const year = (citation.match(/\b(19|20)\d\d\b/) || [])[0];
  const surname = (citation.match(/^[A-Z][A-Za-z'-]+/) || [])[0];
  if (!year || !surname) return null;
  const hit = Object.entries(PAPERS).find(([, p]) => String(p.year) === year && p.authors.startsWith(surname));
  return hit ? +hit[0] : null;
}
