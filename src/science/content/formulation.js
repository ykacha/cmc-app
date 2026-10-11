/* Stages 8–9: formulation, excipients, drug product and stability. */

export const FORMULATIONS = {
  note: "Hypothetical screening results for three 150 mg/mL candidate formulations. Targets are this example's own development targets.",
  metrics: [
    { id: "hmw", name: "HMW increase, 4 weeks at 40 °C", unit: "%", target: "≤ 2.0", better: "low", ok: (v) => v <= 2.0 },
    { id: "acid", name: "Acidic variant increase, 4 weeks at 40 °C", unit: "%", target: "≤ 8.0", better: "low", ok: (v) => v <= 8.0 },
    { id: "visc", name: "Viscosity at 20 °C", unit: "mPa·s", target: "≤ 20", better: "low", ok: (v) => v <= 20 },
    { id: "pot", name: "Potency retained, 3 months at 25 °C", unit: "%", target: "≥ 90", better: "high", ok: (v) => v >= 90 },
    { id: "osmo", name: "Osmolality", unit: "mOsm/kg", target: "270–380", better: "mid", ok: (v) => v >= 270 && v <= 380 },
  ],
  candidates: [
    { id: "A", name: "Formulation A", comp: "20 mM histidine pH 6.0, 8% sucrose, 0.02% polysorbate 80", v: { hmw: 1.4, acid: 6.5, visc: 14, pot: 96, osmo: 300 } },
    { id: "B", name: "Formulation B", comp: "20 mM acetate pH 5.2, 8% trehalose, 0.02% polysorbate 20", v: { hmw: 0.8, acid: 4.0, visc: 24, pot: 97, osmo: 290 } },
    { id: "C", name: "Formulation C", comp: "20 mM histidine pH 6.0, 150 mM arginine, 4% sucrose, 0.02% polysorbate 80", v: { hmw: 2.3, acid: 7.0, visc: 8, pot: 92, osmo: 395 } },
  ],
  verdict: "B has the best stability but its viscosity is too high for a 1 mL syringe. C injects most easily but aggregates faster and is hypertonic. A is the only candidate that meets every target, so it goes forward even though it is not best on any single measure.",
};

export const FORMULATION = [
  {
    id: "degradation", title: "Degradation pathways",
    lede: "The physical and chemical ways an antibody changes, what drives each, and how each is detected.",
    blocks: [
      { t: "table", head: ["Pathway", "Mechanism", "Main drivers", "Detected by"], rows: [
        ["Aggregation", "Partial unfolding or surface interactions lead molecules to associate, reversibly or irreversibly", "Temperature, interfaces, freeze-thaw, high concentration, pH near pI", "SEC, SV-AUC, DLS, particle methods"],
        ["Subvisible and visible particles", "Aggregates grow, or form at air-liquid and silicone oil interfaces", "Agitation, shipping, syringe silicone oil, surfactant loss", "Light obscuration, flow imaging, visual inspection"],
        ["Fragmentation", "Peptide-bond hydrolysis, especially at the hinge and Asp-Pro", "Low or high pH, temperature, residual proteases", "CE-SDS, SEC"],
        ["Deamidation", "Asn forms a succinimide, then Asp or isoAsp", "Higher pH, temperature, NG/NS motifs", "icIEF, CEX, peptide mapping"],
        ["Isomerisation", "Asp to isoAsp via succinimide", "Lower pH, DG/DS motifs", "Peptide mapping, HIC"],
        ["Oxidation", "Met and Trp oxidised by peroxides, light or metal catalysis", "Polysorbate peroxides, light, trace metals", "Peptide mapping, HIC"],
        ["Glycation", "Reducing sugars react with lysines", "Glucose in culture, reducing sugars from sucrose hydrolysis", "LC-MS, boronate affinity"],
      ]},
      { t: "callout", tone: "note", title: "Pathways compete", text: "Lowering pH slows deamidation but can speed fragmentation and isomerisation. Formulation is a search for the condition where the overall rate of change is lowest, not the elimination of one pathway." },
      { t: "links", items: [{ label: "Forced degradation", to: "analytical:stability" }, { label: "Developability liabilities", to: "proposal/developability" }] },
    ],
  },
  {
    id: "preformulation", title: "Preformulation and solution behaviour",
    lede: "Characterising how the molecule behaves before choosing what to put with it.",
    blocks: [
      { t: "grid", cols: 2, items: [
        { title: "Conformational stability", text: "How resistant the folded structure is to unfolding: DSC or nanoDSF melting temperatures (Tm, onset), chemical denaturation. Low values predict aggregation via unfolded intermediates." },
        { title: "Colloidal stability", text: "How strongly molecules attract or repel each other in solution: the diffusion interaction parameter kD, the second virial coefficient B22, self-interaction assays. Attractive interactions predict aggregation and high viscosity." },
      ]},
      { t: "table", head: ["Variable", "Effect", "How it is studied"], rows: [
        ["pH relative to pI", "Net charge: far from the pI, molecules repel; close to it, they associate", "pH screen with SEC, DLS, kD"],
        ["Ionic strength", "Screens charges; can reduce viscosity but also weaken repulsion", "Salt screen with viscosity and kD"],
        ["Protein concentration", "Self-association and viscosity rise steeply at high concentration", "Concentration series, viscosity, opalescence"],
        ["Temperature", "Unfolding and chemical reaction rates", "Thermal ramps, isothermal holds"],
      ]},
      { t: "links", items: [{ label: "DSC", to: "analytical:atlas/am-dsc" }, { label: "DLS", to: "analytical:atlas/am-dls" }, { label: "Screening", to: "formulation/screening" }] },
    ],
  },
  {
    id: "excipients", title: "Excipients and why each is chosen",
    lede: "Each excipient has a mechanism, a cost and a way it can go wrong.",
    blocks: [
      { t: "table", head: ["Category", "Examples", "Intended mechanism", "Watch for"], rows: [
        ["Buffers", "Histidine (pKa ~6.0), acetate (~4.8), citrate, phosphate (~7.2), succinate", "Hold pH where degradation is slowest", "Phosphate and succinate crystallise on freezing and shift pH; citrate can cause injection pain; histidine can participate in light-induced oxidation"],
        ["Sugars and polyols", "Sucrose, trehalose, sorbitol, mannitol", "Preferential exclusion stabilises the native state; in lyophilised products, water replacement and a glassy matrix", "Sucrose hydrolyses at low pH to reducing sugars (glycation); mannitol crystallises"],
        ["Amino acids", "Arginine, proline, glycine, methionine", "Arginine and proline lower viscosity and self-association; methionine is a sacrificial antioxidant", "Arginine can reduce conformational stability and adds osmolality"],
        ["Surfactants", "Polysorbate 20, polysorbate 80, poloxamer 188", "Occupy air-liquid and solid interfaces so the antibody does not", "Polysorbates hydrolyse (residual lipases) and oxidise (peroxides), releasing fatty acids that can form particles"],
        ["Tonicity agents", "Sodium chloride, sugars", "Bring the solution near isotonic for comfort", "Salt can change colloidal stability and viscosity"],
        ["Chelators and antioxidants", "EDTA, DTPA, methionine", "Bind metals or scavenge oxidants", "Compatibility and regulatory precedent for the route"],
      ]},
      { t: "p", text: "Each candidate excipient is evaluated by its effect on the attributes it is meant to protect, measured with the stability-indicating methods: SEC and particles for surfactants, viscosity for arginine, oxidation by peptide mapping for methionine." },
      { t: "links", items: [{ label: "Excipient compatibility module", to: "excipient:" }, { label: "Polysorbate content", to: "analytical:atlas/am-ps80" }] },
    ],
  },
  {
    id: "screening", title: "Formulation screening and trade-offs",
    lede: "From a pH screen to a lead formulation, and why the best number on one test does not pick the winner.",
    blocks: [
      { t: "steps", items: [
        "pH and buffer screen: hold the antibody at several pH values and measure aggregation, fragmentation and charge change under stress.",
        "Excipient screen: a designed experiment across stabilisers, surfactant level and tonicity agents at the chosen pH.",
        "High-concentration check: viscosity, opalescence and stability at the target concentration.",
        "Lead candidates: accelerated and stress studies with the full stability-indicating panel, plus agitation and freeze-thaw.",
        "Selection against all development targets at once; confirm in the final container.",
      ]},
      { t: "widget", id: "formulations" },
      { t: "links", items: [{ label: "High-concentration delivery", to: "formulation/highconc" }, { label: "Stability studies", to: "stability/studies" }] },
    ],
  },
  {
    id: "highconc", title: "High-concentration formulation and delivery",
    lede: "Why 150 mg/mL is hard, and how viscosity turns into injection force.",
    blocks: [
      { t: "p", text: "Subcutaneous injection volume is usually limited to about 1–2 mL, so a large dose needs a concentrated product. At 100–200 mg/mL, antibodies crowd and self-associate: viscosity, opalescence and aggregation can all climb steeply, and the result must still be pushed through a fine needle." },
      { t: "widget", id: "injection" },
      { t: "list", items: [
        "Viscosity reduction: pH and ionic strength optimisation, arginine or proline, or sequence engineering of surface charge patches.",
        "Device side: wider (thin-wall) needles, longer injection times, or on-body injectors for larger volumes.",
        "Manufacturing side: UF/DF must reach the concentration without excessive pressure; Donnan effects shift pH and excipient levels.",
      ]},
      { t: "links", items: [{ label: "UF/DF", to: "downstream/filtration" }, { label: "Viscosity as a performance attribute", to: "qtpp" }] },
    ],
  },
  {
    id: "dp", title: "Drug product, presentation and fill-finish",
    lede: "Turning drug substance into the medicine a patient uses.",
    blocks: [
      { t: "table", head: ["Decision", "Options", "Quality consequences"], rows: [
        ["Dosage form", "Liquid; lyophilised powder", "Lyophilisation slows chemical degradation and allows room-temperature storage, but adds reconstitution and a complex process"],
        ["Container", "Vial; prefilled syringe; cartridge", "Syringes add silicone oil (particles), tungsten and adhesive residues, and plunger movement concerns"],
        ["Device", "Manual syringe; autoinjector; on-body injector", "Device constraints set viscosity, volume and break-loose and glide force limits"],
        ["Closure", "Elastomer stopper and plunger", "Extractables and leachables, container closure integrity, especially at low temperature"],
      ]},
      { t: "grid", items: [
        { title: "Fill-finish", text: "Thawing and pooling DS, compounding, sterile filtration and aseptic filling. Pumps, filters and tubing are checked for shear, adsorption and leachables." },
        { title: "Handling stresses", text: "Freeze-thaw of DS, agitation in shipping, light exposure in inspection and use. Each is studied and controlled." },
        { title: "In-use", text: "Time at room temperature before injection, dilution for IV products and compatibility with administration materials." },
      ]},
      { t: "callout", tone: "reg", title: "Where it is filed", text: "Composition 3.2.P.1; development rationale 3.2.P.2 (including container closure 3.2.P.2.4 and compatibility 3.2.P.2.6); manufacture 3.2.P.3; excipients 3.2.P.4; container closure 3.2.P.7." },
      { t: "links", items: [{ label: "Container closure integrity", to: "analytical:atlas/am-cci" }, { label: "Visual inspection", to: "analytical:atlas/am-visual" }, { label: "DP specification", to: "specs/dsdp" }] },
    ],
  },
];

export const STABILITY = [
  {
    id: "strategy", title: "Stability strategy",
    lede: "What a stability programme for a biologic must show, and which guidance applies.",
    blocks: [
      { t: "p", text: "ICH Q5C governs stability of biotechnological products and expects shelf life to be based on **real-time data** at the recommended storage condition. ICH Q1A(R2) provides the general framework of storage conditions and testing frequency; ICH Q1B covers photostability; ICH Q1E covers evaluation of data." },
      { t: "grid", items: [
        { title: "Which attributes", text: "Those that can change with time and matter: size variants, charge variants, potency, particles, appearance, pH, and for drug product container closure integrity and surfactant content." },
        { title: "Which methods", text: "Stability-indicating methods: shown, usually by forced degradation, to detect and quantify the relevant degradation." },
        { title: "Which lots", text: "Representative of the commercial process and container; for the application, typically at least three lots of drug substance and drug product." },
      ]},
      { t: "callout", tone: "risk", title: "Accelerated data do not set the shelf life", text: "For proteins, degradation at 25 or 40 °C can follow different pathways from those at 2–8 °C, so accelerated results support understanding and excursions but cannot be used to extrapolate a biologic's shelf life." },
      { t: "links", items: [{ label: "Stability-indicating testing", to: "analytical:stability" }, { label: "Stability Studies module", to: "stability:" }] },
    ],
  },
  {
    id: "studies", title: "Types of stability study",
    lede: "Forced degradation, formal stability and handling studies answer different questions.",
    blocks: [
      { t: "table", head: ["Study", "Purpose", "Typical design"], rows: [
        ["Forced degradation", "Find pathways; prove methods are stability-indicating", "Heat, pH, light, oxidation, agitation, freeze-thaw to roughly 5–20% change"],
        ["Long-term", "Set and confirm the shelf life", "2–8 °C, pulls at 0, 3, 6, 9, 12, 18, 24 months and beyond"],
        ["Accelerated", "Understand sensitivity; support short excursions", "25 °C, up to about 6 months"],
        ["Stressed", "Understand degradation behaviour", "40 °C, weeks"],
        ["Photostability", "Light sensitivity of product and packaging", "ICH Q1B exposure"],
        ["Freeze-thaw", "Robustness of DS to freezing", "Multiple cycles at intended conditions"],
        ["Transport and handling", "Shipping and patient handling", "Agitation, temperature cycling, simulated shipping"],
        ["In-use", "Stability after opening, dilution or removal from the fridge", "Conditions matching the label instructions"],
      ]},
      { t: "callout", tone: "note", title: "Forced degradation is not a stability study", text: "Forced degradation deliberately creates degradants to understand the molecule and the methods. Formal stability measures what happens under the storage and handling conditions the product will actually see." },
    ],
  },
  {
    id: "trends", title: "Trends and shelf-life estimation",
    lede: "How a shelf life is read from stability data, with the uncertainty included.",
    blocks: [
      { t: "widget", id: "stabilityTrend" },
      { t: "p", text: "The shelf life is the time at which the one-sided 95% confidence bound of the fitted mean trend meets the acceptance criterion (ICH Q1E). For biologics, it is also limited to the real-time data actually available, with extension later as new time points are added under the stability commitment." },
      { t: "links", items: [{ label: "Specifications", to: "specs/justify" }, { label: "OOT trending", to: "analytical:oos" }] },
    ],
  },
  {
    id: "loop", title: "The formulation–stability feedback loop",
    lede: "Stability results change formulation and packaging decisions, which change the stability plan.",
    blocks: [
      { t: "chain", items: [{ text: "Formulation selected" }, { text: "Stability study" }, { text: "Analytical measurements" }, { text: "Degradation interpreted" }, { text: "Formulation or packaging decision" }, { text: "Updated stability strategy" }] },
      { t: "table", head: ["Observation", "Interpretation", "Typical decision"], rows: [
        ["Acidic variants rise steadily at 2–8 °C", "Deamidation at a known site", "Lower pH slightly; confirm potency impact; tighten trending"],
        ["Particles rise after shipping", "Interfacial stress", "Increase surfactant or change fill volume and headspace"],
        ["Polysorbate content falls", "Enzymatic hydrolysis by residual lipase", "Improve HCP clearance or change surfactant"],
        ["Oxidation rises under light", "Photo-oxidation of Met/Trp", "Light-protective secondary packaging; label 'protect from light'"],
      ]},
      { t: "links", items: [{ label: "Formulation screening", to: "formulation/screening" }, { label: "Control strategy", to: "qbd/control" }] },
    ],
  },
  {
    id: "commitments", title: "Commitments and the ongoing programme",
    lede: "Stability does not end at approval.",
    blocks: [
      { t: "list", items: [
        "**Post-approval stability commitment**: continue registration lots to the end of the claimed shelf life (3.2.S.7.2, 3.2.P.8.2).",
        "**Annual stability lots**: at least one commercial lot per year placed on stability.",
        "**Shelf-life extension**: as real-time data accumulate, through the appropriate regulatory route.",
        "**Change support**: stability data for process, site or container changes, sized to the risk of the change.",
        "**Out-of-trend management**: unexpected results investigated before they become out of specification.",
      ]},
    ],
  },
];
