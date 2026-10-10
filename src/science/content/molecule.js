/* Stages 3–4: candidate selection and cell line / cell substrate.
   General biologics science; product-specific outcomes always depend on
   the molecule and the data. */

export const CANDIDATE = [
  {
    id: "developability", title: "Developability assessment",
    lede: "Screening lead candidates for properties that make an antibody hard to manufacture, formulate or keep stable, before one is chosen.",
    blocks: [
      { t: "p", text: "Discovery optimises for binding and biology. Developability asks a different question: will this sequence survive a manufacturing process, a high-concentration formulation and two years in a syringe? Problems found here cost weeks to fix; the same problems found after the cell line is made can cost a year." },
      { t: "h", text: "Sequence liabilities" },
      { t: "table", head: ["Liability", "Motif or cause", "What it can do", "How it is assessed"], rows: [
        ["Deamidation", "Asn followed by Gly or Ser (NG, NS), especially in CDRs", "Adds negative charge; can reduce binding if in a CDR", "In-silico scan, then forced deamidation and peptide mapping"],
        ["Isomerisation", "Asp followed by Gly or Ser (DG, DS)", "isoAsp formation; can reduce binding", "Forced degradation at low pH and temperature"],
        ["Oxidation", "Exposed Met or Trp, especially in CDRs", "Loss of binding; Fc Met252/428 oxidation reduces FcRn binding", "Peroxide and light stress, peptide mapping"],
        ["N-glycosylation in CDR", "N-X-S/T sequon in the variable region", "Heterogeneous glycans in the binding site", "Sequence review; intact and subunit mass"],
        ["Unpaired cysteine", "Odd number of Cys in variable domains", "Scrambling, aggregation, heterogeneity", "Sequence review; free thiol assay"],
        ["Fragmentation", "Asp-Pro bonds, hinge sequence", "Clipping at low pH or on storage", "Low-pH and thermal stress, CE-SDS"],
      ]},
      { t: "h", text: "Biophysical screens" },
      { t: "grid", items: [
        { title: "Conformational stability", text: "DSC or nanoDSF melting temperatures, especially the first transition (often CH2 or Fab). Low values predict faster degradation." },
        { title: "Colloidal stability", text: "Self-interaction (AC-SINS, the diffusion interaction parameter kD) predicts aggregation and high viscosity at high concentration." },
        { title: "Hydrophobicity", text: "Late retention on hydrophobic interaction chromatography flags aggregation and clearance risk." },
        { title: "Polyspecificity", text: "Binding to unrelated targets (baculovirus particle or DNA ELISA) predicts fast nonspecific clearance." },
        { title: "Viscosity", text: "Measured or predicted at the target concentration; critical for subcutaneous products." },
        { title: "Expression", text: "Transient titer and product quality in the intended host as an early manufacturability signal." },
      ]},
      { t: "callout", tone: "note", title: "A liability is a risk, not a verdict", text: "Many marketed antibodies carry a deamidation or oxidation motif. The decision is whether to engineer it out or to accept it and control it with formulation, process and specifications. That depends on data: how fast it changes and whether the change matters for function." },
      { t: "links", items: [{ label: "Degradation pathways", to: "formulation/degradation" }, { label: "Peptide mapping", to: "analytical:atlas/am-peptide-map" }, { label: "QTPP and CQAs", to: "qtpp" }] },
    ],
  },
  {
    id: "nomination", title: "Candidate nomination",
    lede: "Choosing one molecule to take forward, with the trade-offs written down.",
    blocks: [
      { t: "p", text: "Nomination combines biology (potency, selectivity, pharmacology), safety signals and developability into one decision. CMC input is the developability ranking and an honest view of what each liability would cost to control." },
      { t: "table", head: ["Criterion", "Typical evidence", "Why CMC cares"], rows: [
        ["Potency and selectivity", "Binding and functional assays", "Sets the potency assay design and the dose, which sets the concentration"],
        ["Liabilities", "Sequence review, forced degradation", "Each accepted liability becomes a monitored attribute"],
        ["Stability", "Tm, short accelerated hold", "Predicts shelf life and formulation effort"],
        ["Concentration behaviour", "Viscosity, self-interaction", "Decides whether subcutaneous delivery is feasible"],
        ["Expression", "Transient titer", "Early indicator of cost of goods"],
      ]},
      { t: "steps", items: [
        "Rank candidates on biology first, then filter by developability red flags.",
        "For finalists, run short forced-degradation and high-concentration studies.",
        "Decide per liability: engineer out (and recheck biology) or accept and plan controls.",
        "Record the nomination rationale; it is cited later in 3.2.S.2.6 and the development history.",
      ]},
      { t: "links", items: [{ label: "Cell line construction", to: "cellline/host" }, { label: "Development proposal", to: "proposal" }] },
    ],
  },
];

export const CELLLINE = [
  {
    id: "host", title: "Expression system and host cell",
    lede: "Why most antibodies are made in Chinese hamster ovary cells, and what the choice of host and selection system decides.",
    blocks: [
      { t: "p", text: "CHO cells dominate antibody manufacturing because they grow in suspension in chemically defined media, add human-compatible glycans, have decades of regulatory history and adapt to high-density culture. Other hosts (NS0, Sp2/0, HEK293) are used for specific needs, but they bring different glycan profiles and safety considerations." },
      { t: "table", head: ["Host or system", "Key feature", "Consequence"], rows: [
        ["CHO-K1, CHO-S", "Robust suspension growth", "Most widely used lineages; differ in growth and glycan behaviour"],
        ["CHO-DG44 (DHFR-deficient)", "DHFR selection with methotrexate amplification", "Gene amplification raises productivity but can reduce stability"],
        ["GS knockout CHO", "Glutamine synthetase selection without glutamine", "Strong selection with fewer clones to screen; widely used today"],
        ["Murine NS0, Sp2/0", "Myeloma lines", "Can add non-human glycan epitopes (alpha-gal, NGNA) that matter for immunogenicity"],
      ]},
      { t: "callout", tone: "note", title: "The host shapes quality", text: "Glycosylation enzymes, proteases and the host-cell protein population all come from the host. Changing host later is a major change requiring extensive comparability." },
      { t: "links", items: [{ label: "Vector and integration", to: "cellline/construct" }, { label: "Glycan analysis", to: "analytical:atlas/am-glycan" }] },
    ],
  },
  {
    id: "construct", title: "Vector, transfection and integration",
    lede: "Getting the heavy- and light-chain genes into the host genome in a way that is productive and stays put.",
    blocks: [
      { t: "steps", items: [
        "Design the expression vector: heavy- and light-chain genes behind strong promoters, signal peptides, polyadenylation signals and a selection marker.",
        "Transfect the host (electroporation or chemical methods).",
        "Apply selection (for example, no glutamine for GS systems) so only cells that integrated the vector survive.",
        "Recover a stable pool, then isolate single cells to make clones.",
      ]},
      { t: "grid", cols: 2, items: [
        { title: "Random integration", text: "The vector lands anywhere in the genome. Many clones must be screened because productivity and stability vary with the integration site." },
        { title: "Targeted integration", text: "The vector is placed into a characterised landing pad. Clones are more uniform and timelines shorter, at the cost of a pre-engineered host." },
      ]},
      { t: "p", text: "ICH Q5B expects characterisation of the expression construct: the sequence of the coding region, the integration and copy number, and confirmation that the expressed protein sequence matches the intended sequence." },
      { t: "links", items: [{ label: "Clone selection", to: "cellline/clones" }] },
    ],
  },
  {
    id: "clones", title: "Clone selection and clonality",
    lede: "Picking the production clone and showing it came from a single cell.",
    blocks: [
      { t: "p", text: "Thousands of cells are screened down to a handful of clones on titer, growth, product quality and stability. Product quality screening matters as much as titer: two clones with the same titer can differ in aggregation, charge variants and glycosylation." },
      { t: "steps", items: [
        "Single-cell deposition by fluorescence-activated cell sorting or limiting dilution.",
        "Day-0 plate imaging to document that each well started from one cell.",
        "Expansion and titer screening in small scale (plates, deep wells, micro-bioreactors).",
        "Fed-batch evaluation of top clones in a representative scale-down model, with product quality analytics.",
        "Selection of the lead and backup clones; begin stability studies.",
      ]},
      { t: "callout", tone: "reg", title: "Clonality assurance", text: "Regulators expect evidence that the production cell bank is derived from a single cell, usually combining the cloning method, imaging and statistics into a probability of monoclonality. Where assurance is weaker, additional controls on product consistency are expected." },
      { t: "links", items: [{ label: "Cell line stability", to: "cellline/stability" }, { label: "Upstream development", to: "upstream/overview" }] },
    ],
  },
  {
    id: "stability", title: "Cell line stability",
    lede: "Showing that productivity and product quality hold steady over the cell age used in manufacturing.",
    blocks: [
      { t: "p", text: "Cells are passaged from the working cell bank through the seed train to the production bioreactor. Stability studies culture the clone beyond the limit of in vitro cell age used in production and check that titer, growth and product quality do not drift." },
      { t: "table", head: ["What is tracked", "Why"], rows: [
        ["Specific productivity and titer", "A falling qP signals gene loss or silencing"],
        ["Growth and viability", "Changes alter the process the clone will see at scale"],
        ["Product quality (charge, glycans, size)", "Drift can change CQAs even when titer is steady"],
        ["Gene copy number and transcript levels", "Explains instability mechanistically"],
      ]},
      { t: "p", text: "ICH Q5D asks for cell substrate stability up to and beyond the in vitro cell age used for production, and for testing of cells at that limit (end-of-production cells)." },
      { t: "links", items: [{ label: "Cell banks", to: "cellline/banks" }] },
    ],
  },
  {
    id: "banks", title: "Cell banks and their testing",
    lede: "The master and working cell banks are the starting material for every batch, and are tested accordingly.",
    blocks: [
      { t: "chain", items: [{ label: "Origin", text: "Selected clone" }, { label: "Bank", text: "Master cell bank (MCB)" }, { label: "Bank", text: "Working cell bank (WCB)" }, { label: "Each batch", text: "Seed train and production" }, { label: "Once", text: "End-of-production cells" }] },
      { t: "table", head: ["Test", "MCB", "WCB", "End-of-production cells"], rows: [
        ["Sterility and mycoplasma", "Yes", "Yes", "Yes"],
        ["Identity", "Yes", "Yes", "Yes"],
        ["In vitro adventitious virus assays", "Yes", "Yes", "Yes"],
        ["Retroviruses (electron microscopy, reverse transcriptase)", "Yes", "Not usually", "Yes"],
        ["Species-specific and in vivo tests, or molecular alternatives", "Yes, risk-based", "Not usually", "Risk-based"],
        ["Genetic stability of the construct", "Yes", "Not usually", "Yes"],
      ]},
      { t: "p", text: "The table follows the structure of ICH Q5A and Q5D; the exact panel is risk-based. ICH Q5A(R2) (adopted 2023) adds next-generation sequencing and other molecular methods as alternatives to some animal-based tests." },
      { t: "callout", tone: "reg", title: "Where it is filed", text: "Cell bank history, generation and testing go in 3.2.S.2.3 (control of materials) and the adventitious agent safety evaluation in 3.2.A.2." },
      { t: "links", items: [{ label: "Viral safety", to: "downstream/viral" }, { label: "Upstream seed train", to: "upstream/overview" }] },
      { t: "refs", items: ["ICH Q5A(R2): Viral safety evaluation of biotechnology products derived from cell lines (2023)", "ICH Q5B: Analysis of the expression construct", "ICH Q5D: Derivation and characterisation of cell substrates"] },
    ],
  },
];
