/* Stage: scale-up, technology transfer, GMP manufacture and process
   validation. The bridge between a process that works in development and
   one that runs reliably under GMP at commercial scale. */

export const TRANSFER = [
  {
    id: "phases", title: "Phase-appropriate CMC",
    lede: "What the CMC package has to show for first-in-human, for pivotal studies and for licensure, and why it grows in steps.",
    blocks: [
      { t: "p", text: "CMC work is staged to match clinical risk and clinical knowledge. A first-in-human study needs a safe, adequately characterised and consistently made product; it does not need a validated commercial process. Each later milestone asks for more, and the sponsor decides when each piece of evidence is generated so that it is ready in time without being wasted on a molecule that fails in the clinic." },
      { t: "table", head: ["Area", "First in human (IND or IMPD)", "Pivotal studies (phase 3)", "Licensure (BLA or MAA)"], rows: [
        ["Process", "Clinical process run under GMP, often a platform process at modest scale", "Close to commercial; changes from earlier phases supported by comparability", "Commercial process, characterised and validated (PPQ)"],
        ["Analytical methods", "Qualified as suitable for intended use", "Release methods validated or close to it", "Validated to ICH Q2(R2), transferred to commercial QC sites"],
        ["Specifications", "Wider limits; many attributes 'report result'", "Tightened as lot data accumulate", "Justified from clinical lots, process capability and stability"],
        ["Stability", "Supports the planned clinical use period", "Ongoing on clinical lots; commercial presentation started", "Real-time data on primary lots supporting the proposed shelf life"],
        ["Viral safety", "Cell bank testing and clearance data for the main steps, often supported by platform knowledge", "Updated if the process changes", "Complete clearance package on the commercial process"],
        ["Reference standard", "Interim standard", "Primary standard established", "Primary and working standards with a qualification programme"],
      ]},
      { t: "callout", tone: "reg", title: "GMP for clinical material", text: "In the US, FDA's 2008 guidance on CGMP for phase 1 investigational drugs describes an approach for phase 1 material, with full 21 CFR 211 compliance expected for later phases. In the EU, investigational medicinal products are made under the GMP rules for IMPs (Commission Delegated Regulation 2017/1569 and its detailed guidelines). Exact expectations are set by the regulations and discussed with agencies at milestone meetings." },
      { t: "links", items: [{ label: "Analytical strategy across phases", to: "analytical:strategy" }, { label: "Development proposal", to: "proposal" }, { label: "Stability strategy", to: "stability/strategy" }] },
    ],
  },
  {
    id: "techtransfer", title: "Technology transfer",
    lede: "Moving a process or a method from the team that developed it to the site that will run it, without losing what was learnt.",
    blocks: [
      { t: "p", text: "A process is more than its batch record. It is also the reasons behind each range, the failure modes seen in development, and the tacit know-how of the people who ran it. Technology transfer is the structured hand-over of all of that, from development to a clinical manufacturing site, and later from the clinical site to the commercial one. ICH Q10 names it as one of the stages of the product lifecycle." },
      { t: "steps", items: [
        "**Knowledge package**: process description, CPPs and ranges with their justification, development and characterisation reports, raw material specifications, analytical methods and known risks.",
        "**Gap assessment**: compare equipment, scale, materials, utilities and procedures between sending and receiving sites. Different bioreactor geometry or chromatography skids are typical gaps.",
        "**Risk assessment**: decide which differences could affect CQAs and what studies close them.",
        "**Fit and engineering runs**: run the process at the receiving site, often without GMP release, to confirm equipment settings, timings and hold points.",
        "**GMP runs**: manufacture under the receiving site's quality system, with the executed batch record as the evidence.",
        "**Comparability**: show product from the receiving site is comparable to product from the sending site.",
      ]},
      { t: "grid", items: [
        { title: "Process transfer", text: "Scale and equipment differences are the main risk. Scale-up criteria (power per volume, kLa, residence time) are set in advance and confirmed with at-scale data." },
        { title: "Analytical transfer", text: "Comparative testing, co-validation or partial revalidation shows the receiving lab gets equivalent results. Usually completed before the receiving site tests GMP lots." },
        { title: "Raw materials", text: "Different suppliers, grades or lots at the new site can move product quality. Media and resin changes are common sources of surprises." },
      ]},
      { t: "callout", tone: "risk", title: "Where transfers fail", text: "Undocumented know-how (an operator who always pre-wets a filter longer than written), unrecognised equipment differences (mixing time in a larger tank), and analytical methods that behave differently in a new lab. Each one is found faster with a written risk assessment than by investigating a failed lot." },
      { t: "links", items: [{ label: "Scale-up engineering", to: "upstream/engineering" }, { label: "Method transfer", to: "analytical:lifecycle" }, { label: "The executed batch record", to: "specs/batchrecord" }] },
    ],
  },
  {
    id: "ppq", title: "Process validation and PPQ",
    lede: "From process design to qualification at scale to continued verification after approval.",
    blocks: [
      { t: "table", head: ["Stage", "What happens", "Evidence"], rows: [
        ["Process design (stage 1)", "Development and characterisation define the process and its controls", "Characterisation reports, CPP rationale, control strategy"],
        ["Process qualification (stage 2)", "Facility, utility and equipment qualification; process performance qualification (PPQ) lots at commercial scale", "PPQ protocol and report"],
        ["Continued process verification (stage 3)", "Ongoing monitoring of parameters and attributes; statistical trending", "CPV plan and periodic reports"],
      ]},
      { t: "p", text: "The three-stage model follows FDA's 2011 process validation guidance; EU GMP Annex 15 describes equivalent expectations. Post-approval, ICH Q12 defines established conditions and allows post-approval change management protocols that agree in advance how future changes will be handled." },
      { t: "h", text: "What a PPQ needs before it starts" },
      { t: "list", items: [
        "Qualified facility, utilities and equipment, and validated cleaning.",
        "Approved control strategy, with CPPs and ranges from process characterisation.",
        "Validated release and in-process methods.",
        "A qualified scale-down model for studies that cannot be done at scale, such as viral clearance and resin lifetime.",
        "A protocol with predefined acceptance criteria, enhanced sampling and a justified number of lots.",
      ]},
      { t: "callout", tone: "reg", title: "How many lots", text: "FDA's 2011 guidance does not set a number; it expects the number to be justified from process knowledge. EU Annex 15 notes that three consecutive batches under routine conditions are generally considered acceptable for the traditional approach, with other numbers justified. Three is common practice for biologics drug substance and drug product." },
      { t: "grid", items: [
        { title: "Drug substance PPQ", text: "Consecutive commercial-scale lots meeting CPP, IPC and release acceptance criteria, with extra sampling across steps and hold times." },
        { title: "Drug product PPQ", text: "Fill-finish lots plus aseptic process simulations (media fills), filter validation, and container closure and shipping qualification." },
        { title: "Studies done at small scale", text: "Viral clearance, resin and membrane lifetime and impurity spiking are run in qualified scale-down models and referenced in the PPQ package." },
      ]},
      { t: "links", items: [{ label: "Scale-down models", to: "upstream/characterization" }, { label: "Downstream holds and validation", to: "downstream/validation" }, { label: "Lifecycle control", to: "specs/lifecycle" }] },
      { t: "refs", items: ["FDA, Process Validation: General Principles and Practices (2011)", "EudraLex Volume 4, Annex 15: Qualification and Validation (2015)", "EudraLex Volume 4, Annex 1: Manufacture of Sterile Medicinal Products (2022)", "ICH Q12: Technical and regulatory considerations for pharmaceutical product lifecycle management"] },
    ],
  },
  {
    id: "comparability", title: "Comparability after process changes",
    lede: "Every programme changes its process. Comparability shows that the change did not change the product in a way that matters.",
    blocks: [
      { t: "p", text: "Between first-in-human and licensure most antibody programmes change scale, site, media, purification steps or formulation. ICH Q5E sets out how to show that pre- and post-change product are comparable: the quality attributes are highly similar, and any differences have no adverse impact on safety or efficacy." },
      { t: "steps", items: [
        "Assess the change: which steps, which CQAs could move, and how much.",
        "Write the comparability protocol with predefined acceptance criteria, before the post-change data exist.",
        "Compare release results of several pre- and post-change lots against historical ranges.",
        "Compare extended characterisation side by side: structure, glycans, charge and size variants, higher-order structure, potency and binding.",
        "Compare degradation: accelerated and stress stability side by side, because differences can appear only on stress.",
        "Decide: comparable on quality alone, or nonclinical or clinical bridging needed (for example a PK study).",
      ]},
      { t: "callout", tone: "note", title: "Criteria come first", text: "Criteria set after seeing the data are not evidence. Statistical approaches (tolerance intervals, equivalence margins) are often used for quantitative attributes, with qualitative side-by-side comparison for profiles such as peptide maps." },
      { t: "links", items: [{ label: "Comparability lab", to: "analytical:comparability" }, { label: "Manufacturing development history (3.2.S.2.6)", to: "ctd/dossier" }] },
      { t: "refs", items: ["ICH Q5E: Comparability of biotechnological/biological products subject to changes in their manufacturing process"] },
    ],
  },
];
