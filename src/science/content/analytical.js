/* Stage 7: analytical development. The stage page explains the role of
   analytics across the programme; the Analytical series holds the method
   detail and is linked from every topic. */

export const ANALYTICAL = [
  {
    id: "questions", title: "The questions analytics answers",
    lede: "Every analytical method exists to answer a question about the product. Start from the question, then choose the method.",
    blocks: [
      { t: "table", head: ["Question", "Attribute family", "Typical methods"], rows: [
        ["Is it the right molecule?", "Identity, primary structure", "Peptide mapping, intact mass, icIEF profile"],
        ["How much is there?", "Content", "UV A280"],
        ["Is it intact and in one piece?", "Size variants, particles", "SEC, CE-SDS, SV-AUC, light obscuration, flow imaging"],
        ["Has it been chemically changed?", "Charge variants, oxidation, glycosylation", "icIEF, CEX, HIC, RP-HPLC, peptide mapping, MAM, glycan profiling"],
        ["Is it folded correctly?", "Higher-order structure", "CD, DSC, FTIR, HDX-MS"],
        ["Does it still work?", "Potency, binding, effector function", "Cell-based bioassay, binding ELISA, SPR, ADCC and FcγR assays"],
        ["Is it clean and safe?", "Process impurities, adventitious agents, microbiology", "HCP ELISA and LC-MS, residual DNA, Protein A, endotoxin, bioburden, sterility, mycoplasma"],
      ]},
      { t: "p", text: "No single method sees everything. Each one sees the molecule through a particular property (size, charge, hydrophobicity, mass, activity), so attributes that matter are usually measured by at least two methods based on different principles. This is orthogonality." },
      { t: "links", items: [{ label: "Guided path through the assays", to: "analytical:journey" }, { label: "CQA × Method map", to: "analytical:cqa" }, { label: "All assays", to: "analytical:atlas" }] },
    ],
  },
  {
    id: "roles", title: "Characterisation, release, stability and in-process testing",
    lede: "The same technique can play very different roles. The role decides how it is controlled.",
    blocks: [
      { t: "grid", cols: 2, items: [
        { title: "Characterisation", text: "Deep, often low-throughput study of structure, variants and function, done on a few representative lots and enriched variants. It establishes what the attributes are and which ones matter. Filed in 3.2.S.3." },
        { title: "Release testing", text: "Routine testing of every lot against the specification with validated, robust, QC-friendly methods. Filed in 3.2.S.4 and 3.2.P.5." },
        { title: "Stability testing", text: "Release-type methods that have been shown to be stability-indicating: able to detect the changes that occur over time. Filed in 3.2.S.7 and 3.2.P.8." },
        { title: "In-process testing", text: "Fast tests during manufacture to steer or check the process: titer, step yields, intermediate SEC, bioburden, unprocessed bulk virus tests. Filed in 3.2.S.2.4." },
      ]},
      { t: "callout", tone: "note", title: "Characterisation is not a bigger release panel", text: "A release specification tests what needs routine control. Characterisation answers why: which variants exist, what they do, and how the release methods relate to them. Many characterisation methods never become release tests." },
      { t: "links", items: [{ label: "Characterisation and regulatory review", to: "analytical:review" }, { label: "Stability-indicating testing", to: "analytical:stability" }] },
    ],
  },
  {
    id: "lifecycle", title: "Development, qualification, validation, verification, transfer",
    lede: "Five words that are often used loosely, with different meanings and different evidence.",
    blocks: [
      { t: "table", head: ["Activity", "What it is", "When", "Evidence"], rows: [
        ["Development", "Designing the procedure and understanding how its parameters affect results. ICH Q14 describes minimal and enhanced approaches, including the analytical target profile (ATP).", "From candidate selection onward", "Development report, robustness and risk assessment"],
        ["Qualification", "Showing the method is suitable for its intended use at an early stage, with a reduced set of characteristics. Not an ICH-defined term.", "Typically before phase 1 and through early clinical development", "Qualification report"],
        ["Validation", "Formal demonstration, against predefined acceptance criteria, that the procedure is fit for its intended purpose: specificity, accuracy, precision, range and so on, per ICH Q2(R2).", "Before pivotal or commercial use; often during phase 3", "Validation protocol and report"],
        ["Verification", "Showing that a compendial method works for this product in this laboratory.", "When a pharmacopoeial method is adopted", "Verification report (USP <1226>)"],
        ["Transfer", "Showing that a receiving laboratory gets equivalent results with a validated method, by comparative testing, co-validation or partial revalidation.", "When testing moves between sites", "Transfer protocol and report (USP <1224>)"],
        ["System suitability", "Checks run with every analytical sequence to confirm the system is working on the day.", "Every run", "Run records"],
      ]},
      { t: "callout", tone: "risk", title: "Validation is not a one-time event", text: "ICH Q14 and Q2(R2) treat the analytical procedure as having a lifecycle. Performance is monitored, and changes are assessed against the ATP and the established conditions. A method validated years ago on an old column chemistry may no longer be the method being run." },
      { t: "links", items: [{ label: "Method lifecycle and transfer", to: "analytical:lifecycle" }, { label: "Validation lab", to: "analytical:validation" }, { label: "System suitability", to: "analytical:sst" }, { label: "Reference standards", to: "analytical:standards" }] },
    ],
  },
  {
    id: "orthogonal", title: "Orthogonality: HIC and RP-HPLC as worked examples",
    lede: "Why two chromatographic methods that both separate by hydrophobicity still answer different questions.",
    blocks: [
      { t: "table", head: ["", "HIC", "RP-HPLC"], rows: [
        ["State of the protein", "Native, folded", "Denatured; often reduced or IdeS-digested"],
        ["Mobile phase", "High salt to low salt, aqueous", "Water to acetonitrile, acidic"],
        ["What it responds to", "Exposed surface hydrophobicity", "Chemistry of each chain or subunit"],
        ["Typical uses", "Oxidation, CDR isomerisation, ADC drug load, developability screening", "Chain purity, subunit variants, online mass identification"],
        ["Blind spots", "Changes that do not alter the surface", "Higher-order structure and non-covalent aggregates"],
      ]},
      { t: "p", text: "Fc methionine oxidation is a good example. Peptide mapping gives the site-specific level; HIC shows it as earlier-eluting peaks of the intact, folded antibody; subunit RP-HPLC shows an oxidised Fc/2 or heavy chain; and FcRn binding by SPR shows whether it matters. Each confirms the others from a different angle." },
      { t: "links", items: [{ label: "HIC", to: "analytical:atlas/am-hic" }, { label: "RP-HPLC", to: "analytical:atlas/am-rp" }, { label: "Peptide mapping", to: "analytical:atlas/am-peptide-map" }, { label: "Oxidation across the programme", to: "qbd/explorer" }] },
    ],
  },
  {
    id: "compendial", title: "Compendial and product-specific methods",
    lede: "Pharmacopoeial tests and methods developed for this molecule are handled differently.",
    blocks: [
      { t: "grid", cols: 2, items: [
        { title: "Compendial tests", text: "pH, osmolality, appearance, endotoxin, bioburden, sterility, subvisible particles, visible particles, mycoplasma. The method is in a pharmacopoeia; the lab verifies it for the product, including checking that the product does not interfere." },
        { title: "Product-specific procedures", text: "SEC, CE-SDS, icIEF, peptide mapping, potency and HCP assays. Developed for the molecule, then qualified and validated. Their specificity has to be shown with this product's variants." },
      ]},
      { t: "callout", tone: "reg", title: "Regional pharmacopoeias differ", text: "USP, Ph. Eur. and JP chapters are harmonised for many tests (through the Pharmacopoeial Discussion Group and ICH Q4B) but not all. A global product may need to show compliance with each region's chapter." },
      { t: "links", items: [{ label: "Compendial tests in the assay list", to: "analytical:atlas" }, { label: "Compendial reference", to: "compendial:" }] },
    ],
  },
  {
    id: "evidence", title: "Where analytical evidence goes",
    lede: "Analytical work supplies evidence to more CTD sections than any other activity.",
    blocks: [
      { t: "table", head: ["Activity", "CTD section"], rows: [
        ["Characterisation of structure and variants", "3.2.S.3.1"],
        ["Impurity characterisation", "3.2.S.3.2"],
        ["Release methods, validation, batch data, specification justification", "3.2.S.4.2–4.5; 3.2.P.5"],
        ["Reference standards", "3.2.S.5; 3.2.P.6"],
        ["In-process control methods", "3.2.S.2.4"],
        ["Stability-indicating methods and data", "3.2.S.7; 3.2.P.8"],
        ["Comparability after process changes", "3.2.S.2.6; 3.2.P.2"],
      ]},
      { t: "links", items: [{ label: "CTD evidence navigator", to: "ctd/navigator" }, { label: "Analytical strategy across phases", to: "analytical:strategy" }] },
    ],
  },
];
