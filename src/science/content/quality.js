/* Stages 10–12: QbD and control strategy, specifications and CoA, CTD. */

/* Attribute relationship explorer: each attribute followed across the
   whole programme. Directions of effect are common tendencies; product
   data decide. */
export const RELATIONS = [
  { id: "agg", name: "Aggregates (HMW)",
    why: "Linked to immunogenicity and lower activity; among the most closely watched attributes for any antibody.",
    upstream: "Culture duration, cell lysis and harvest conditions; generally a modest contributor compared with downstream and formulation.",
    downstream: "Low-pH elution and hold can create aggregates; CEX, HIC or mixed-mode polishing removes them; UF/DF at high concentration and shear can create more.",
    analytical: [["SEC", "am-sec"], ["SV-AUC", "am-auc"], ["SEC-MALS", "am-sec-mals"], ["CE-SDS (NR, covalent)", "am-ce-sds"]],
    formulation: "pH far from pI, sugars and surfactant reduce aggregation; high concentration and interfaces increase it.",
    stability: "Usually the attribute most likely to change at 2–8 °C; trended in every stability study.",
    controls: "Polishing step pooling criteria, low-pH hold limits, freeze-thaw controls, surfactant in formulation, release and stability limits.",
    spec: "Release and shelf-life limits on % HMW by SEC, set from clinical lots, stability trends and method capability.",
    ctd: ["3.2.S.2.4", "3.2.S.3.1", "3.2.S.4.1", "3.2.S.4.5", "3.2.S.7", "3.2.P.2", "3.2.P.5.6", "3.2.P.8"] },
  { id: "charge", name: "Charge variants (deamidation)",
    why: "Deamidation in a CDR can reduce binding; elsewhere it mainly adds acidic heterogeneity. Charge profile is also a fingerprint of process consistency.",
    upstream: "Higher pH, temperature and longer culture tend to increase acidic species; C-terminal lysine processing depends on the cell line and culture.",
    downstream: "CEX can partly enrich or remove charge variants depending on pooling.",
    analytical: [["icIEF", "am-cief"], ["CEX-HPLC", "am-iex"], ["Peptide mapping", "am-peptide-map"], ["MAM", "am-mam"]],
    formulation: "Lower pH slows deamidation but may speed isomerisation and fragmentation.",
    stability: "Acidic variants typically rise over shelf life; the site-specific rate is followed by peptide mapping.",
    controls: "Upstream pH and temperature ranges, harvest timing, formulation pH, release and stability limits on main peak or acidic species.",
    spec: "Range on main, acidic and basic species, justified by characterisation showing which variants affect potency.",
    ctd: ["3.2.S.2.4", "3.2.S.3.1", "3.2.S.4.1", "3.2.S.7", "3.2.P.8"] },
  { id: "glycan", name: "N-glycosylation",
    why: "Afucosylation raises ADCC; galactosylation affects CDC; high mannose shortens half-life. Relevance depends on the mechanism of action.",
    upstream: "Strongly influenced: cell line, media (manganese, galactose), temperature, pH, osmolality, ammonia, culture duration.",
    downstream: "Little effect, apart from minor enrichment by some polishing steps.",
    analytical: [["Released glycan HILIC", "am-glycan"], ["Intact and subunit mass", "am-intact-mass"], ["MAM", "am-mam"]],
    formulation: "No direct effect.",
    stability: "Glycans are generally stable in storage.",
    controls: "Mainly by upstream design: media and raw material controls, CPP ranges. Release testing if the attribute is critical to the mechanism.",
    spec: "Ranges for afucosylated or high-mannose species where they affect activity or PK; otherwise characterisation and process control.",
    ctd: ["3.2.S.2.3", "3.2.S.2.4", "3.2.S.3.1", "3.2.S.4.1"] },
  { id: "hcp", name: "Host-cell proteins",
    why: "Potential immunogenicity, and some HCPs (lipases, proteases) degrade the polysorbate or the antibody over shelf life.",
    upstream: "Released by dying cells; higher at low harvest viability.",
    downstream: "Cleared mainly by Protein A, then CEX and AEX; some HCPs co-purify and persist.",
    analytical: [["HCP ELISA", "am-hcp-elisa"], ["HCP by LC-MS", "am-hcp-ms"]],
    formulation: "Residual lipases hydrolyse polysorbate; effect appears on stability.",
    stability: "Indirectly visible as polysorbate loss and particles.",
    controls: "Harvest viability criteria, purification step design, resin lifetime, release limit.",
    spec: "Release limit in ppm (commonly under 100 ppm), with LC-MS characterisation of persistent HCPs.",
    ctd: ["3.2.S.2.5", "3.2.S.3.2", "3.2.S.4.1", "3.2.S.4.5"] },
  { id: "ox", name: "Oxidation (Met, Trp)",
    why: "Fc Met252/Met428 oxidation reduces FcRn binding and half-life; CDR Trp or Met oxidation can reduce binding.",
    upstream: "Generally minor.",
    downstream: "Exposure to light and metals during processing.",
    analytical: [["Peptide mapping", "am-peptide-map"], ["MAM", "am-mam"], ["HIC", "am-hic"], ["FcRn binding (SPR)", "am-spr"]],
    formulation: "Polysorbate peroxides, histidine under light and trace metals promote it; methionine and chelators reduce it.",
    stability: "Monitored under light and long-term storage; photostability per ICH Q1B.",
    controls: "Light protection in manufacturing and packaging, excipient quality (low-peroxide polysorbate), formulation antioxidants.",
    spec: "Often controlled by process and characterisation; site-specific limits where oxidation affects function.",
    ctd: ["3.2.S.3.1", "3.2.P.2", "3.2.P.8"] },
];

export const FMEA = [
  { step: "Production bioreactor", mode: "Temperature shift late or missed", effect: "Lower titer; shifted glycan profile", s: 6, o: 3, d: 3, mitigation: "Automated shift with alarm; batch record verification" },
  { step: "Protein A", mode: "Load above dynamic binding capacity", effect: "Product loss; HCP breakthrough", s: 5, o: 3, d: 4, mitigation: "Load calculated from in-line titer; DBC margin" },
  { step: "Low-pH hold", mode: "pH above target range", effect: "Incomplete viral inactivation", s: 10, o: 2, d: 3, mitigation: "Two-point pH verification; hold time interlock" },
  { step: "Low-pH hold", mode: "Hold too long", effect: "Aggregates and fragments", s: 6, o: 3, d: 4, mitigation: "Maximum hold time in batch record" },
  { step: "CEX", mode: "Pooling cut too wide", effect: "Aggregates above limit", s: 7, o: 3, d: 2, mitigation: "UV-based pooling with in-process SEC" },
  { step: "Virus filtration", mode: "Filter integrity failure", effect: "Viral clearance not assured", s: 10, o: 1, d: 2, mitigation: "Pre- and post-use integrity testing" },
  { step: "UF/DF", mode: "Too few diavolumes", effect: "Excipient levels and pH off target", s: 6, o: 2, d: 3, mitigation: "Diavolume counter; in-process pH and conductivity" },
  { step: "DS fill and freeze", mode: "Uncontrolled freeze rate", effect: "Aggregation", s: 6, o: 3, d: 5, mitigation: "Controlled-rate freezing; validated containers" },
];

export const CONTROL_LAYERS = [
  { id: "raw", name: "Raw materials and components", items: ["Media and feed specifications, including trace metals", "Resin and filter qualification", "Excipient compendial grade and supplier controls"], cqas: ["glycan", "charge"] },
  { id: "cells", name: "Cell substrate", items: ["Qualified MCB and WCB", "Limit of in vitro cell age"], cqas: ["glycan", "agg"] },
  { id: "process", name: "Process parameters", items: ["CPPs held within proven acceptable ranges", "Normal operating ranges for key parameters", "Automated alarms and interlocks"], cqas: ["glycan", "charge", "agg", "hcp"] },
  { id: "ipc", name: "In-process controls", items: ["Unprocessed bulk testing (bioburden, mycoplasma, virus)", "Step yields, pH, conductivity, intermediate SEC", "Hold time limits"], cqas: ["agg", "hcp"] },
  { id: "viral", name: "Viral safety", items: ["Validated low-pH inactivation and virus filtration", "Filter integrity testing"], cqas: [] },
  { id: "methods", name: "Analytical procedure controls", items: ["System suitability", "Reference standard programme", "Validated methods"], cqas: ["agg", "charge", "glycan", "hcp", "ox"] },
  { id: "dsspec", name: "Drug substance specification", items: ["Release testing of every DS lot"], cqas: ["agg", "charge", "hcp", "glycan"] },
  { id: "dpspec", name: "Drug product specification", items: ["Release testing of every DP lot, including sterility, particles and CCI-related tests"], cqas: ["agg", "charge", "ox"] },
  { id: "stab", name: "Stability programme", items: ["Shelf-life limits", "Annual stability lots and trending"], cqas: ["agg", "charge", "ox"] },
  { id: "pack", name: "Packaging and labelling", items: ["Container closure integrity", "Light protection", "Storage instructions"], cqas: ["ox"] },
  { id: "life", name: "Lifecycle monitoring", items: ["Continued process verification", "Product quality reviews", "Change control"], cqas: ["agg", "charge", "glycan", "hcp", "ox"] },
];

export const QBD = [
  {
    id: "principles", title: "QbD across development",
    lede: "Quality by design is a way of working from the first proposal, not a late-stage document.",
    blocks: [
      { t: "chain", items: [{ text: "QTPP" }, { text: "CQAs" }, { text: "Risk assessment" }, { text: "CPPs and CMAs" }, { text: "Development studies" }, { text: "Control strategy" }, { text: "Lifecycle management" }] },
      { t: "table", head: ["Guideline", "What it contributes"], rows: [
        ["ICH Q8(R2)", "Pharmaceutical development: QTPP, CQAs, design space, control strategy"],
        ["ICH Q9(R1)", "Quality risk management principles and tools"],
        ["ICH Q10", "Pharmaceutical quality system across the lifecycle"],
        ["ICH Q11", "Development and manufacture of drug substances, including biotechnological products"],
        ["ICH Q12", "Lifecycle management: established conditions, post-approval change management protocols"],
        ["ICH Q14 and Q2(R2)", "The same principles applied to analytical procedures"],
      ]},
      { t: "p", text: "In practice QbD means each decision is linked to an attribute that matters and to evidence. The first version appears in the proposal and early risk assessment; it becomes more specific and better supported at each milestone." },
      { t: "links", items: [{ label: "Worked example: QTPP and CQAs", to: "qtpp" }, { label: "Relationship explorer", to: "qbd/explorer" }] },
    ],
  },
  {
    id: "cqa", title: "Critical quality attributes",
    lede: "What makes an attribute critical, and how that judgement matures.",
    blocks: [
      { t: "p", text: "ICH Q8(R2) defines a CQA as a physical, chemical, biological or microbiological property or characteristic that should be within an appropriate limit, range or distribution to ensure the desired product quality. Criticality is about the effect on safety and efficacy, not about whether something is easy to measure." },
      { t: "table", head: ["Stage", "Basis of the assessment", "Typical output"], rows: [
        ["Proposal and early development", "Prior knowledge, platform data, literature, molecule structure", "Provisional CQAs and a study plan"],
        ["After characterisation and forced degradation", "Structure–function studies on enriched variants", "Criticality refined for each variant"],
        ["Before process characterisation", "Updated risk assessment", "Attributes used to judge process parameters"],
        ["Commercial", "Clinical experience, full characterisation", "Final CQAs with justification in the dossier"],
      ]},
      { t: "callout", tone: "note", title: "Substance or impurity", text: "Under ICH Q6B, a variant with activity and properties comparable to the desired product is a product-related substance; one without is a product-related impurity. The distinction is made from characterisation data and decides how tightly the variant is controlled." },
      { t: "links", items: [{ label: "CQA × Method map", to: "analytical:cqa" }, { label: "Characterisation package", to: "analytical:review" }] },
    ],
  },
  {
    id: "cpp", title: "CPPs and critical material attributes",
    lede: "Which process parameters and material properties need to be controlled because they move a CQA.",
    blocks: [
      { t: "p", text: "A critical process parameter (CPP) is a process parameter whose variability has an impact on a CQA and therefore should be monitored or controlled to ensure the process produces the desired quality (ICH Q8(R2)). A critical material attribute (CMA) is the equivalent for an input material. Many parameters are monitored without being critical." },
      { t: "table", head: ["Classification", "Meaning", "Example"], rows: [
        ["CPP", "Variation within the studied range meaningfully affects a CQA", "Low-pH hold pH and time (viral inactivation, aggregates)"],
        ["Key process parameter", "Affects process performance (yield, titer) but not CQAs", "Protein A residence time within its studied range"],
        ["Non-key parameter", "No meaningful effect within the range studied", "Many agitation or flow settings in robust ranges"],
        ["CMA", "Material property that affects a CQA", "Trace manganese in a media component affecting glycosylation"],
      ]},
      { t: "p", text: "Classification uses the size of the effect relative to the CQA's acceptance range, not just statistical significance. A parameter that shifts an attribute by a statistically significant but tiny amount may not be critical; one that can push the attribute toward its limit is." },
      { t: "links", items: [{ label: "Upstream characterisation", to: "upstream/characterization" }, { label: "Design of experiments", to: "qbd/doe" }] },
    ],
  },
  {
    id: "fmea", title: "Risk assessment and FMEA",
    lede: "Ranking what could go wrong, then reducing it and reassessing.",
    blocks: [
      { t: "widget", id: "fmea" },
      { t: "callout", tone: "note", title: "RPN is a ranking aid, not a rule", text: "Severity × occurrence × detectability gives a risk priority number used to rank failure modes. No guideline prescribes an RPN threshold. A high-severity failure mode deserves attention even when its RPN is modest, because good detection does not undo harm that already happened." },
      { t: "refs", items: ["ICH Q9(R1) Quality risk management (2023): emphasises reducing subjectivity in risk scoring and the role of knowledge."] },
    ],
  },
  {
    id: "doe", title: "Design of experiments",
    lede: "Studying several parameters at once, including how they interact.",
    blocks: [
      { t: "p", text: "Changing one factor at a time misses interactions: when the effect of one parameter depends on the level of another. Designed experiments vary several factors together in a planned pattern so that main effects and interactions can be estimated from relatively few runs." },
      { t: "widget", id: "doe" },
      { t: "table", head: ["Design", "Used for"], rows: [
        ["Fractional factorial, Plackett–Burman, definitive screening", "Screening many parameters to find the few that matter"],
        ["Full factorial with centre points", "Main effects and interactions of a few parameters; checking curvature"],
        ["Response surface (central composite, Box–Behnken)", "Mapping curved responses to set ranges"],
      ]},
      { t: "links", items: [{ label: "Design space", to: "qbd/designspace" }] },
    ],
  },
  {
    id: "designspace", title: "Ranges and design space",
    lede: "Explored region, proven acceptable range, normal operating range and design space are not the same thing.",
    blocks: [
      { t: "widget", id: "designSpace" },
      { t: "table", head: ["Term", "Meaning", "Regulatory status"], rows: [
        ["Explored (knowledge) region", "Everything studied in development", "Supports understanding; not a commitment"],
        ["Proven acceptable range (PAR)", "Range of a parameter shown to give acceptable quality, other parameters held constant", "Can be filed; changes within it may need less regulatory action"],
        ["Normal operating range (NOR)", "Where the process is actually run, inside the PAR", "Usually internal"],
        ["Design space", "The multidimensional combination of inputs and parameters shown to assure quality (ICH Q8(R2))", "Formally proposed and approved; movement within it is not a change"],
      ]},
      { t: "callout", tone: "risk", title: "A heatmap is not a design space", text: "Results from development studies define what was explored. A design space exists only if it is proposed by the applicant, supported by data across the multivariate region, and approved by the regulator." },
    ],
  },
  {
    id: "control", title: "Integrated control strategy",
    lede: "Every layer of control, and which attributes each layer protects.",
    blocks: [
      { t: "widget", id: "controlLayers" },
      { t: "p", text: "ICH Q10 defines the control strategy as a planned set of controls, derived from product and process understanding, that assures process performance and product quality. Testing is only one layer. For many attributes, the strongest assurance comes from upstream design and process control, with release testing confirming rather than creating quality." },
      { t: "links", items: [{ label: "Specifications", to: "specs/justify" }, { label: "Relationship explorer", to: "qbd/explorer" }] },
    ],
  },
  {
    id: "explorer", title: "Relationship explorer",
    lede: "Choose an attribute and follow it through every part of the programme.",
    blocks: [{ t: "widget", id: "explorer" }],
  },
];

export const COA = {
  note: "Hypothetical certificate of analysis for a fictional drug substance lot. Values and limits are illustrative.",
  head: { product: "CMX-417 drug substance (fictional)", lot: "DS-24-0031", mfg: "2024-09-12", spec: "SPEC-DS-417, version 3" },
  rows: [
    { test: "Appearance", method: "Visual", limit: "Clear to slightly opalescent, colourless to slightly yellow", result: "Slightly opalescent, colourless", why: "Confirms the solution looks as expected; colour change can signal oxidation." },
    { test: "pH", method: "Potentiometry", limit: "5.7–6.3", result: "6.0", why: "Formulation identity and a driver of degradation rates." },
    { test: "Protein concentration", method: "UV A280", limit: "135–165 mg/mL", result: "151 mg/mL", why: "Sets the delivered dose." },
    { test: "Identity", method: "Peptide map", limit: "Conforms to reference standard", result: "Conforms", why: "Confirms the right molecule." },
    { test: "Monomer", method: "SEC", limit: "≥ 95.0%", result: "98.6%", why: "Main purity measure." },
    { test: "HMW species", method: "SEC", limit: "≤ 3.0%", result: "1.1%", why: "Aggregates are an immunogenicity risk." },
    { test: "Purity (non-reduced)", method: "CE-SDS", limit: "≥ 90.0%", result: "96.2%", why: "Covalent fragments and integrity." },
    { test: "Charge variants: main peak", method: "icIEF", limit: "55–75%", result: "66%", why: "Process consistency and deamidation." },
    { test: "Relative potency", method: "Cell-based neutralisation", limit: "70–130%", result: "98%", why: "Biological activity." },
    { test: "Host-cell protein", method: "ELISA", limit: "≤ 100 ppm", result: "8 ppm", why: "Process-related impurity." },
    { test: "Residual DNA", method: "qPCR", limit: "≤ 10 pg/mg", result: "< 1 pg/mg", why: "Process-related impurity." },
    { test: "Bacterial endotoxin", method: "LAL", limit: "≤ 0.5 EU/mg", result: "< 0.05 EU/mg", why: "Patient safety." },
    { test: "Bioburden", method: "Membrane filtration", limit: "≤ 10 CFU/100 mL", result: "0 CFU/100 mL", why: "Microbial control of the bulk." },
  ],
};

export const SPECS = [
  {
    id: "justify", title: "Setting and justifying specifications",
    lede: "A specification is a list of tests, procedures and acceptance criteria. Each line needs a reason.",
    blocks: [
      { t: "p", text: "ICH Q6B defines a specification as a list of tests, references to analytical procedures and appropriate acceptance criteria to which a drug substance or drug product should conform. It is one part of the control strategy, not the whole of it." },
      { t: "list", items: [
        "**Which tests**: those that control CQAs not already assured by process design and in-process controls, plus compendial and safety tests.",
        "**Which limits**: based on lots used in clinical studies and toxicology, manufacturing capability, stability trends and method variability.",
        "**Release and shelf-life**: release limits leave room for change over shelf life plus analytical variability; shelf-life limits are what the product must meet until expiry.",
        "**Phase-appropriate**: early-phase limits are wider and many attributes are 'report result'; limits tighten as data accumulate.",
      ]},
      { t: "links", items: [{ label: "Specification-setting lab", to: "analytical:specs" }, { label: "Stability and shelf life", to: "stability/trends" }] },
    ],
  },
  {
    id: "dsdp", title: "Drug substance and drug product specifications",
    lede: "Some tests are done once, on the substance; others must be repeated on the product.",
    blocks: [
      { t: "table", head: ["Test area", "Drug substance", "Drug product"], rows: [
        ["Identity", "Yes", "Yes (a specific identity test on the finished product)"],
        ["Content and potency", "Yes", "Yes"],
        ["Purity and product-related variants", "Yes", "Yes, focusing on those that can change during fill and storage"],
        ["Process-related impurities (HCP, DNA, Protein A)", "Yes", "Usually not repeated; controlled at DS"],
        ["Sterility", "No (bioburden instead)", "Yes"],
        ["Endotoxin", "Yes", "Yes"],
        ["Subvisible and visible particles", "Not usually", "Yes"],
        ["Container-related tests (extractable volume, CCI-related)", "No", "Yes"],
        ["Excipient content (e.g. polysorbate)", "If added at DS", "Commonly"],
      ]},
      { t: "callout", tone: "note", title: "In-process versus release", text: "In-process controls check the process while it runs (for example, pH at the low-pH hold or bioburden before filtration) and are filed in 3.2.S.2.4. Release tests are performed on the finished DS or DP lot and are filed in 3.2.S.4 or 3.2.P.5." },
    ],
  },
  {
    id: "coa", title: "The certificate of analysis",
    lede: "What a CoA is, what it is not, and how to read one.",
    blocks: [
      { t: "widget", id: "coa" },
      { t: "grid", items: [
        { title: "The CoA", text: "A document that reports the results of release testing for one lot against the specification, signed by QC or QA." },
        { title: "The batch record", text: "The full record of how the lot was manufactured: parameters, materials, deviations and in-process results." },
        { title: "The control strategy", text: "The overall design of controls across materials, process, testing and lifecycle. The CoA reports only one of its layers." },
      ]},
      { t: "callout", tone: "note", title: "Conforming is more than passing", text: "A result inside the limit can still be out of trend or atypical; release requires the whole lot history, including deviations, to be acceptable, not only a CoA full of passing numbers." },
      { t: "links", items: [{ label: "The executed batch record behind this lot", to: "specs/batchrecord" }, { label: "The QC worksheets behind each result", to: "specs/qcrecords" }] },
    ],
  },
  {
    id: "batchrecord", title: "The executed batch record",
    lede: "How one lot was actually made, entry by entry, and how QA reviews it before release.",
    blocks: [
      { t: "p", text: "A **master batch record** is the approved template: every instruction, parameter range, sampling point and signature box for the process. When a lot is made, Document Control issues a numbered copy, and operators complete it as they work. That completed copy is the **executed batch record**, and it is the primary evidence of how the lot was made." },
      { t: "widget", id: "batchRecord" },
      { t: "h", text: "What every entry has to be" },
      { t: "table", head: ["Principle", "Meaning in a batch record", "Typical failure"], rows: [
        ["Attributable", "Every entry traceable to a person through initials on the signature log", "A CPP with no second-person verification"],
        ["Legible", "Readable for the life of the record; corrections keep the original visible", "Overwriting, correction fluid, unexplained scribbles"],
        ["Contemporaneous", "Recorded when the action happened, with the actual time", "Times out of sequence; entries made at the end of a shift"],
        ["Original", "The first record, or a certified true copy", "Values copied from scrap paper or a glove"],
        ["Accurate", "Correct values and calculations, from calibrated equipment", "Arithmetic errors; an instrument past its calibration date"],
        ["Complete, consistent, enduring, available", "No blank fields; times and quantities agree across pages; kept for the retention period and retrievable", "Conditional lines left blank instead of marked N/A"],
      ]},
      { t: "p", text: "These are the ALCOA+ principles, used in data integrity guidance from regulators including FDA, MHRA and the PIC/S. They apply equally to paper records and electronic batch records; electronic systems add audit trails and enforced sequence, but they still need review." },
      { t: "h", text: "How a record moves to release" },
      { t: "steps", items: [
        "Document Control issues a numbered, controlled copy of the current master record for the lot.",
        "Operators execute and record; a second person verifies critical steps as the master record requires.",
        "Anything outside a range, or any unplanned event, is recorded as it happened and raised as a deviation.",
        "Production reviews the completed record for completeness and corrects documentation errors properly.",
        "QA reviews the record, deviations, in-process results and yields, and confirms all deviations are closed or assessed.",
        "QA combines the record review with QC results and makes the disposition decision.",
      ]},
      { t: "callout", tone: "reg", title: "Where the requirements come from", text: "In the US, 21 CFR 211.188 lists what batch production and control records must contain and 211.192 requires their review before release; 21 CFR 600.12 adds record requirements for biologics. In the EU, EudraLex Volume 4 Chapter 4 covers documentation, Annex 11 covers computerised systems and Annex 16 covers certification by a Qualified Person. Executed batch records are sometimes requested in a dossier, typically in regional section 3.2.R." },
      { t: "links", items: [{ label: "Batch Record Simulator", to: "batch:" }, { label: "QC records for the same lot", to: "specs/qcrecords" }, { label: "Process validation", to: "transfer/ppq" }] },
      { t: "refs", items: ["21 CFR 211.186, 211.188, 211.192 (master and batch records, record review)", "21 CFR 600.12 (records, biological products)", "EudraLex Volume 4, Part I Chapter 4 (Documentation); Annex 11; Annex 16", "FDA, Data Integrity and Compliance With Drug CGMP: Questions and Answers (2018)", "PIC/S PI 041-1, Good Practices for Data Management and Integrity in Regulated GMP/GDP Environments (2021)"] },
    ],
  },
  {
    id: "qcrecords", title: "QC testing records",
    lede: "Behind every number on a certificate is a sample log, a worksheet, a system suitability check and a second-person review.",
    blocks: [
      { t: "p", text: "The certificate shows one line per test. The laboratory record behind each line shows which sample was tested, by whom, on which calibrated instrument, with which reference standard and reagent lots, whether the run was valid, the raw data, every calculation, and who checked it. A reviewer or inspector should be able to rebuild each reported value from the record." },
      { t: "widget", id: "qcRecord" },
      { t: "grid", items: [
        { title: "System suitability failure", text: "The run is invalid. No result exists, so there is nothing to call out of specification. Find the laboratory cause, fix it and repeat as the procedure allows." },
        { title: "Valid run, result outside the limit", text: "An out-of-specification result. Report it, then investigate in phases: laboratory error first, then a full investigation including manufacturing. Retesting into compliance is not allowed." },
        { title: "Valid run, unusual but within the limit", text: "Out of trend or atypical. Assessed against historical data and the procedure's trending rules; may still need investigation." },
      ]},
      { t: "callout", tone: "reg", title: "Laboratory record requirements", text: "21 CFR 211.194 sets out what laboratory records must include, from sample description and method to raw data, calculations and the signature of a second person who reviewed them. EudraLex Volume 4 Chapter 6 covers the same ground for the EU. FDA's 2006 OOS guidance describes how out-of-specification results are investigated." },
      { t: "links", items: [{ label: "OOS investigation", to: "analytical:oos" }, { label: "System suitability", to: "analytical:sst" }, { label: "The certificate of analysis", to: "specs/coa" }, { label: "Batch release", to: "specs/release" }] },
      { t: "refs", items: ["21 CFR 211.194 (laboratory records)", "EudraLex Volume 4, Part I Chapter 6 (Quality Control)", "FDA, Investigating Out-of-Specification (OOS) Test Results for Pharmaceutical Production (2006)", "Ph. Eur. 2.6.14 and USP <85>, bacterial endotoxins"] },
    ],
  },
  {
    id: "release", title: "Batch release",
    lede: "How a lot moves from manufactured to released.",
    blocks: [
      { t: "steps", items: [
        "QC tests the lot against the specification with validated methods.",
        "Any OOS result is investigated before a decision; OOT and atypical results are assessed.",
        "QA reviews the batch record, deviations, change controls and test results.",
        "Disposition: QA releases the lot (in the EU, a Qualified Person certifies it).",
        "For some products, regulators also require lot release protocols or samples before distribution.",
      ]},
      { t: "links", items: [{ label: "OOS investigation", to: "analytical:oos" }, { label: "Batch Record Simulator", to: "batch:" }] },
    ],
  },
  {
    id: "lifecycle", title: "Lifecycle control",
    lede: "Keeping the process and its specifications in control after approval.",
    blocks: [
      { t: "list", items: [
        "**Continued process verification**: trending of CPPs and CQAs across lots with statistical process control.",
        "**Product quality review** (EU) or annual product review (US): a yearly look at all lots, deviations, changes and stability.",
        "**Change control**: every change assessed for impact on CQAs and filed at the right category.",
        "**Specification changes**: tightening based on experience is common; widening needs strong justification.",
      ]},
      { t: "links", items: [{ label: "Process validation", to: "transfer/ppq" }, { label: "Comparability", to: "analytical:comparability" }] },
    ],
  },
];

/* ICH M4Q Module 3 with the development activities that feed each section. */
export const CTD_SECTIONS = [
  { id: "2.3", title: "Quality Overall Summary", what: "A summary of Module 3 that follows its structure and highlights critical issues and how they were resolved.", from: ["All stages"], studies: ["Written last, from the final Module 3"] },
  { id: "3.2.S.1", title: "General information", what: "Nomenclature, structure, general properties.", from: ["candidate"], studies: ["Sequence, structure, physicochemical properties"] },
  { id: "3.2.S.2", title: "Manufacture", what: "Manufacturers; process description; control of materials; controls of critical steps; process validation; development history.", from: ["cellline", "upstream", "downstream", "qbd"], studies: ["Cell bank history and testing (S.2.3)", "In-process controls and CPPs (S.2.4)", "PPQ, viral clearance support, hold times (S.2.5)", "Process development and comparability (S.2.6)"] },
  { id: "3.2.S.3", title: "Characterisation", what: "Elucidation of structure and other characteristics (S.3.1); impurities (S.3.2).", from: ["analytical"], studies: ["Structure, PTMs, HOS, variants, biological activity", "Product- and process-related impurities"] },
  { id: "3.2.S.4", title: "Control of drug substance", what: "Specification, procedures, validation, batch analyses, justification.", from: ["analytical", "specs"], studies: ["Validation reports", "Batch data", "Specification justification"] },
  { id: "3.2.S.5", title: "Reference standards", what: "Preparation, characterisation and qualification of reference standards.", from: ["analytical"], studies: ["Reference standard qualification"] },
  { id: "3.2.S.6", title: "Container closure system (DS)", what: "Containers used for DS storage and their suitability.", from: ["downstream"], studies: ["Compatibility, extractables"] },
  { id: "3.2.S.7", title: "Stability (DS)", what: "Summary and conclusions, post-approval protocol and commitment, data.", from: ["stability"], studies: ["DS long-term, accelerated, stress, freeze-thaw"] },
  { id: "3.2.P.1", title: "Description and composition", what: "Dosage form and composition.", from: ["formulation"], studies: ["Final formulation"] },
  { id: "3.2.P.2", title: "Pharmaceutical development", what: "Components, formulation development, process development, container closure, microbiological attributes, compatibility.", from: ["formulation", "qbd"], studies: ["Formulation screening", "Container closure suitability and CCI", "In-use and compatibility"] },
  { id: "3.2.P.3", title: "Manufacture (DP)", what: "Fill-finish process, controls and validation.", from: ["formulation"], studies: ["Fill-finish process validation, media fills"] },
  { id: "3.2.P.4", title: "Control of excipients", what: "Excipient specifications and justification.", from: ["formulation"], studies: ["Compendial and non-compendial excipients"] },
  { id: "3.2.P.5", title: "Control of drug product", what: "Specification, procedures, validation, batch analyses, characterisation of impurities, justification.", from: ["analytical", "specs"], studies: ["DP release methods and data"] },
  { id: "3.2.P.6", title: "Reference standards (DP)", what: "Usually a cross-reference to 3.2.S.5.", from: ["analytical"], studies: [] },
  { id: "3.2.P.7", title: "Container closure system", what: "Primary packaging description and specifications.", from: ["formulation"], studies: ["Component specifications"] },
  { id: "3.2.P.8", title: "Stability (DP)", what: "Shelf life, storage conditions, in-use and photostability.", from: ["stability"], studies: ["DP long-term, accelerated, photostability, in-use"] },
  { id: "3.2.A", title: "Appendices", what: "Facilities and equipment (A.1), adventitious agents safety evaluation (A.2), novel excipients (A.3).", from: ["cellline", "downstream"], studies: ["Viral safety evaluation, viral clearance studies"] },
  { id: "3.2.R", title: "Regional information", what: "Region-specific content, for example executed batch records or method validation packages.", from: ["specs"], studies: ["Depends on region"] },
];

export const CTD_TOPICS = [
  {
    id: "dossier", title: "The complete dossier, Module 1 to 5",
    lede: "A whole marketing application for one fictional antibody, filled in end to end, with where each section's evidence comes from and why the reviewer needs it.",
    blocks: [
      { t: "p", text: "The Common Technical Document is the shared format for marketing applications in ICH regions. **Modules 2 to 5** are harmonised by ICH M4: summaries, quality, nonclinical and clinical. **Module 1** belongs to each region and holds forms, labelling and administrative content. The dossier below is complete in every module, so you can see what the finished application looks like and trace each section back to the work that produced it." },
      { t: "widget", id: "dossier" },
      { t: "h", text: "One study, many sections" },
      { t: "p", text: "Evidence does not map one to one onto the dossier. A single forced degradation study, for example, is filed in several places, each for a different purpose:" },
      { t: "table", head: ["Section", "What the forced degradation study shows there"], rows: [
        ["3.2.S.3.1 and 3.2.S.3.2", "Which degradation products form and how they affect structure and potency"],
        ["3.2.S.4.3 and 3.2.P.5.3", "That the methods are stability-indicating: they detect the degradation products"],
        ["3.2.S.4.5 and 3.2.P.5.6", "Part of the justification for which attributes are tested and why"],
        ["3.2.P.2.2", "Why the formulation protects against the dominant pathways"],
        ["3.2.S.7 and 3.2.P.8", "Supportive stress data alongside the real-time programme"],
        ["2.3", "Summarised in one paragraph of the quality story"],
      ]},
      { t: "callout", tone: "note", title: "Reading this against a real programme", text: "This example programme has finished development at laboratory and scale-down scale. Switch the widget to 'What exists today' to see the honest picture: most of the characterisation, process design and formulation evidence exists, while anything that needs GMP lots, process performance qualification, long-term stability, GLP toxicology or clinical studies does not. A real application cannot be filed until those sections are backed by real data." },
      { t: "links", items: [{ label: "Evidence navigator", to: "ctd/navigator" }, { label: "Chronology versus structure", to: "ctd/chronology" }, { label: "The executed batch record", to: "specs/batchrecord" }] },
      { t: "refs", items: ["ICH M4 (R4): Organisation of the Common Technical Document; M4Q (R1) Quality; M4S (R2) Safety; M4E (R2) Efficacy", "FDA, Comprehensive Table of Contents Headings and Hierarchy (eCTD Module 1)", "ICH S6(R1): Preclinical safety evaluation of biotechnology-derived pharmaceuticals", "ICH Q5A(R2), Q5C, Q6B, Q1E, Q2(R2) and M10, as cited in the sections"] },
    ],
  },
  {
    id: "navigator", title: "CTD evidence navigator",
    lede: "Every Module 3 section, the activities that produce its evidence, and a readiness view you can use for your own programme.",
    blocks: [
      { t: "widget", id: "ctdNavigator" },
      { t: "callout", tone: "note", title: "Educational mapping", text: "This is a learning map of where evidence typically belongs (ICH M4Q). It is not a dossier generator, and readiness depends on the quality of evidence, not on whether a section has content." },
    ],
  },
  {
    id: "qos", title: "Module 2.3, the Quality Overall Summary",
    lede: "The reviewer's first read of the quality story.",
    blocks: [
      { t: "p", text: "The QOS summarises Module 3 in the same structure. Its job is not to repeat data but to explain the critical points: why the control strategy is adequate, how CQAs were identified, what the key characterisation and validation results show, and how any issues were resolved." },
      { t: "list", items: [
        "Keep numbers identical to Module 3.",
        "Explain the logic from CQAs to controls in one place.",
        "Address known reviewer concerns directly (for example, low endotoxin recovery, HCP coverage).",
      ]},
    ],
  },
  {
    id: "chronology", title: "Development chronology versus dossier structure",
    lede: "Why the order of work and the order of the dossier differ.",
    blocks: [
      { t: "p", text: "Development is chronological: proposal, cell line, process, analytics, formulation, stability, validation. The CTD is organised by subject: one section on manufacture, one on characterisation, one on control. A single study, such as forced degradation, can supply evidence to characterisation, analytical validation, specification justification and stability." },
      { t: "table", head: ["Filing", "Quality content"], rows: [
        ["IND (US) or IMPD (EU), first in human", "Phase-appropriate: process description, qualified methods, early specifications, initial stability"],
        ["Amendments during clinical development", "Process changes, comparability, updated specifications"],
        ["BLA or MAA", "Complete Module 3 and 2.3"],
        ["Post-approval", "Supplements or variations for changes, annual reports"],
      ]},
      { t: "links", items: [{ label: "Strategy across phases", to: "analytical:strategy" }] },
    ],
  },
];
