import type { ModuleContent } from '../../types/content';

export const module10: ModuleContent = {
  id: 'glycosylation-m10',
  sectionId: 'glycosylation',
  moduleNumber: 10,
  eyebrow: 'GLYCOSYLATION 11',
  title: 'Upstream CPP → Glycan CQA Map',
  lead: 'The complete matrix linking cell culture process parameters to glycan quality attributes — the mechanistic basis for every CPP-CQA relationship.',
  tags: [
    { label: 'Process Control', color: 'amber' },
    { label: 'CPP-CQA', color: 'green' },
    { label: 'Cell Culture', color: 'teal' },
  ],
  stats: [
    { label: 'Key CPPs', value: '8+' },
    { label: 'Primary Target', value: 'Glycan Profile' },
    { label: 'Control Strategy', value: 'Multivariate' },
    { label: 'DoE Approach', value: 'Response Surface' },
  ],
  sections: [
    {
      type: 'card',
      title: 'The CPP-CQA Paradigm for Glycosylation',
      color: 'blue',
      content:
        'Glycosylation is the quality attribute most sensitive to upstream process conditions. Unlike primary sequence, which is genetically determined and essentially invariant under normal manufacturing conditions, the glycan profile is a direct readout of Golgi processing efficiency, nucleotide sugar donor availability, enzyme expression levels, and cellular metabolic state — all of which are influenced by cell culture process parameters (CPPs). ICH Q8(R2) defines a CPP as a process parameter whose variability has an impact on a critical quality attribute (CQA) and therefore should be monitored or controlled. For glycosylation, the CPP-CQA relationships form a complex, interconnected network: a single CPP (e.g., pH) can affect multiple glycan CQAs (galactosylation, sialylation, high mannose), and a single glycan CQA (e.g., afucosylation) can be influenced by multiple CPPs (manganese, temperature, cell viability). Understanding the mechanistic basis for each CPP-CQA link is essential for defining the design space, setting proven acceptable ranges (PARs), and building the process control strategy that ensures consistent glycan quality.',
    },
    {
      type: 'table',
      title: 'Complete CPP → Glycan CQA Matrix',
      headers: ['CPP', 'Normal Range', 'Glycan CQA Affected', 'Direction', 'Mechanism', 'Monitoring'],
      rows: [
        ['pH', '6.8-7.2', 'Galactosylation', '↓ pH → ↑ Gal', 'B4GalT1 (B4GALT1) has optimal activity at pH ~6.5; lower culture pH shifts Golgi lumen toward B4GalT1 optimum', 'Online pH probe; at-line BGA'],
        ['pH', '6.8-7.2', 'Sialylation', '↓ pH → ↑ SA', 'ST6Gal1 (ST6GAL1) activity also favoured at mildly acidic Golgi pH', 'Online pH probe'],
        ['Dissolved oxygen', '10-60% air sat', 'High mannose (Man5)', '↓ DO → ↑ Man5', 'Hypoxia impairs Golgi enzyme function; incomplete processing leaves Man5 intermediates', 'Online DO probe'],
        ['Glucose', '2-6 g/L', 'High mannose', 'Depletion → ↑ Man5', 'Glucose feeds hexosamine/nucleotide sugar pathways; depletion → low UDP-Glc, UDP-GlcNAc → stalled processing', 'At-line glucose analyser (Nova/Cedex)'],
        ['Glucose', '2-6 g/L', 'NGHC', 'Depletion → ↑ NGHC', 'Reduced dolichol-oligosaccharide synthesis → lower OST substrate → missed Asn297', 'At-line glucose; offline HILIC'],
        ['Glutamine/GlutaMAX', '2-6 mM', 'Galactosylation, Sialylation', 'Gln → NH₃ → ↓ Gal, ↓ SA', 'Glutamine deamidation generates ammonia; ammonia raises Golgi pH → inhibits Gal-T and SA-T', 'At-line Gln/NH₃ (Nova)'],
        ['Mn²⁺ supplement', '0-50 µM', 'Galactosylation', '↑ Mn²⁺ → ↑ Gal', 'Mn²⁺ is essential divalent cation cofactor for B4GalT1 (B4GALT1); supplementation increases enzyme activity', 'ICP-MS of media/harvest'],
        ['Mn²⁺ supplement', '0-50 µM', 'Bisecting GlcNAc', '↑ Mn²⁺ → ↑ bisecting', 'GnTIII (MGAT3) also uses Mn²⁺; supplementation can increase bisecting in GnTIII+ lines', 'ICP-MS'],
        ['Ammonia', '>5 mM inhibitory', 'Galactosylation', '↑ NH₃ → ↓ Gal (more G0)', 'NH₃/NH₄⁺ is a weak base that accumulates in acidic Golgi compartments, raising Golgi lumenal pH → inhibits B4GalT1', 'At-line NH₃ (Nova/Cedex)'],
        ['Ammonia', '>5 mM inhibitory', 'Sialylation', '↑ NH₃ → ↓ SA', 'Same Golgi pH disruption mechanism; ST6Gal1 (ST6GAL1) is even more pH-sensitive than B4GalT1', 'At-line NH₃'],
        ['Temperature', '32-37°C', 'Galactosylation', '↓ Temp → ↑ Gal', 'Lower temperature extends Golgi residence time (slower vesicular transport) + B4GalT1 remains active → more complete galactosylation', 'Online RTD probe'],
        ['Temperature', '32-37°C', 'High mannose', '↓ Temp → ↓ Man5', 'Extended Golgi residence allows mannosidase I/II (MAN1A1/MAN2A1) more time for trimming', 'Online RTD probe'],
        ['Cell viability', '>90% target', 'Galactosylation', '↓ Viability → ↓ Gal', 'Dying cells release β-galactosidase, sialidase into culture supernatant → extracellular glycan degradation', 'Trypan blue/Vi-CELL'],
        ['Cell viability', '>90% target', 'High mannose', '↓ Viability → ↑ Man5', 'Dying cells have impaired Golgi function; released glycosidases degrade processed glycans back toward high mannose', 'Trypan blue; at-line LDH'],
        ['Feed strategy', 'Bolus or continuous', 'Lactate/glycan profile', 'Overfeeding → ↑ lactate → ↓ Gal', 'Excess glucose → lactate accumulation → acidifies cytoplasm → disrupts Golgi pH homeostasis', 'At-line glucose/lactate'],
        ['Culture duration', '10-14 days', 'Overall glycan profile', 'Extended → degradation', 'Prolonged culture → viability decline → extracellular glycosidase activity → loss of terminal sugars', 'VCD/viability trending'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'pH — The Master Glycosylation Controller',
      color: 'green',
      content:
        'Culture pH is arguably the single most influential CPP for glycosylation because it affects Golgi lumenal pH, which in turn controls the activity of every glycosyltransferase in the processing pathway. The Golgi lumen is normally maintained at pH 6.0-6.5 by vesicular H⁺-ATPases, and glycosyltransferases have evolved to function optimally in this mildly acidic environment. B4GalT1 (B4GALT1) — the primary β1,4-galactosyltransferase responsible for adding galactose to GlcNAc termini — has optimal activity at pH ~6.5 and is significantly inhibited above pH 7.0. When culture pH is set to the lower end of the normal range (6.8-6.9), the Golgi lumen tends toward its optimal acidic pH, and galactosylation increases. Conversely, higher culture pH (7.1-7.2) shifts the Golgi lumen toward neutral pH, inhibiting B4GalT1 and producing a glycan profile enriched in agalactosylated species (G0F). This pH-galactosylation relationship is one of the most robust and reproducible CPP-CQA links in mAb manufacturing and is frequently exploited as a deliberate control lever during process development.',
    },
    {
      type: 'card',
      title: 'Temperature Shift Strategy',
      color: 'teal',
      content:
        'Temperature reduction (typically from 37°C to 32-33°C at day 3-5 of culture) is a widely used fed-batch strategy to extend culture longevity, improve viability, and modulate product quality. For glycosylation, the temperature shift has multiple beneficial effects: (1) Reduced cell growth rate extends the Golgi residence time of nascent glycoproteins — each molecule spends more time in contact with Golgi-resident glycosyltransferases, enabling more complete processing. (2) B4GalT1 (B4GALT1) retains catalytic activity at 32-33°C (it is not a heat-activated enzyme), so the extended residence time translates to higher galactosylation. (3) Lower temperature reduces metabolic rate, decreasing ammonia accumulation (a galactosylation inhibitor) and lactate production (which disrupts pH homeostasis). (4) Improved viability at lower temperature reduces extracellular glycosidase release. The net effect is typically a 5-15 percentage point increase in galactosylated species (G1F + G2F) and a corresponding decrease in G0F. However, temperature also affects titre — lower temperature reduces specific productivity (qP) — creating a quality vs yield trade-off that must be optimised during process development using DoE approaches.',
    },
    {
      type: 'card',
      title: 'Ammonia — The Silent Glycosylation Killer',
      color: 'red',
      content:
        'Ammonia (NH₃/NH₄⁺) is generated primarily from glutamine deamidation (spontaneous and enzymatic) and from amino acid catabolism during cell culture. At concentrations above ~5 mM (frequently reached in late-stage fed-batch cultures), ammonia significantly impairs glycosylation through a well-characterised mechanism: NH₃ is a weak base (pKa 9.25) that freely diffuses across membranes in its uncharged form, but becomes protonated (NH₄⁺) in the acidic Golgi lumen. This proton consumption raises Golgi pH, disrupting the optimal acidic environment required by galactosyltransferases and sialyltransferases. The result is a dose-dependent shift toward agalactosylated glycans (G0/G0F) and reduced sialylation. At ammonia concentrations >10 mM, effects on high-mannose species (Man5) also become apparent, suggesting disruption of earlier Golgi processing steps. Mitigation strategies include: (1) Replacing glutamine with GlutaMAX (L-alanyl-L-glutamine dipeptide), which releases glutamine slowly and reduces peak ammonia by 50-70%; (2) Limiting total glutamine addition; (3) Earlier harvest to avoid late-culture ammonia accumulation; (4) Medium pH control to minimise glutamine decomposition rate.',
    },
    {
      type: 'card',
      title: 'Mn²⁺ Supplementation — B4GalT1 Cofactor',
      color: 'amber',
      content:
        'Manganese (Mn²⁺) is an essential divalent cation cofactor for B4GalT1 (B4GALT1) and several other Golgi-resident glycosyltransferases. Standard CHO basal media contain trace levels of Mn²⁺ (typically 0.1-1 µM), which may be suboptimal for maximal galactosyltransferase activity. Deliberate Mn²⁺ supplementation (10-50 µM MnCl₂ added to feed medium) has been demonstrated to increase galactosylation by 10-30 percentage points in multiple CHO cell lines and mAb products. The mechanism is straightforward: Mn²⁺ binds to the DxD motif in the B4GalT1 catalytic domain, stabilising the active conformation and positioning the UDP-galactose donor substrate for transfer. However, Mn²⁺ supplementation requires careful optimisation because: (1) Mn²⁺ above 50-100 µM can be cytotoxic; (2) Mn²⁺ may also affect other metalloenzymes, potentially increasing bisecting GlcNAc (if GnTIII/MGAT3 is expressed) or altering other post-translational modifications; (3) Mn²⁺ is a transition metal that could catalyse oxidation reactions in the final drug product if not adequately removed during downstream purification — residual Mn²⁺ levels should be monitored by ICP-MS in the drug substance.',
    },
    {
      type: 'table',
      title: 'Nucleotide Sugar Donor Pathways',
      headers: ['Donor', 'Enzyme Using It', 'Gene', 'Biosynthetic Precursor', 'Process Lever'],
      rows: [
        ['UDP-GlcNAc', 'GnTI, GnTII, GnTIII', 'MGAT1, MGAT2, MGAT3', 'Fructose-6-P → GlcN-6-P → GlcNAc-1-P → UDP-GlcNAc (hexosamine pathway)', 'Glucose/glutamine feeding; GlcNAc supplement'],
        ['UDP-Gal', 'B4GalT1', 'B4GALT1', 'UDP-Glc → UDP-Gal (UDP-galactose-4-epimerase, GALE)', 'Galactose supplement; UDP-Gal may be limiting at high cell density'],
        ['GDP-Fucose', 'FUT8', 'FUT8', 'GDP-Man → GDP-4-keto-6-deoxy-Man → GDP-Fuc (de novo); or Fuc-1-P → GDP-Fuc (salvage)', '2F-fucose inhibits de novo pathway; fucose feeding enhances salvage'],
        ['CMP-Neu5Ac', 'ST6Gal1', 'ST6GAL1', 'UDP-GlcNAc → ManNAc → Neu5Ac → CMP-Neu5Ac (sialic acid pathway)', 'ManNAc supplementation; GlcNAc feeding; ammonia control'],
        ['UDP-Glc', 'Glucosidases I/II (ER quality control)', 'UGGT1', 'Glc-1-P → UDP-Glc (UGP2)', 'Glucose feeding — depletion disrupts ER quality control cycle'],
      ],
      sortable: false,
    },
    {
      type: 'card',
      title: 'Dissolved Oxygen and Golgi Processing',
      color: 'purple',
      content:
        'Dissolved oxygen (DO) directly impacts glycan processing through multiple mechanisms. Under hypoxic conditions (DO < 10% air saturation), cells activate the HIF-1α (hypoxia-inducible factor) response, which reprograms central carbon metabolism and can reduce flux through the hexosamine biosynthetic pathway, depleting UDP-GlcNAc and UDP-Gal pools. Furthermore, the Golgi apparatus itself requires adequate oxygen for optimal vesicular trafficking — hypoxia-induced cytoskeletal remodelling can disrupt Golgi morphology and impair the transit of glycoproteins through sequential Golgi cisternae. The net effect of DO limitation is typically an increase in high-mannose species (Man5), reflecting incomplete trimming by mannosidase I (MAN1A1) and mannosidase II (MAN2A1), plus reduced galactosylation due to depleted UDP-Gal and suboptimal B4GalT1 activity. In manufacturing, DO is controlled at 30-60% air saturation using cascade control (agitation and/or gas flow rate adjustment). DO excursions below 20% should trigger investigation, and sustained hypoxia is a process deviation requiring glycan profile reassessment. It is important to note that hyperoxia (DO > 80%) can also be detrimental by promoting reactive oxygen species (ROS) formation, which can damage Golgi membranes and lipid-anchored enzymes.',
    },
    {
      type: 'card',
      title: 'Cell Viability and Extracellular Glycan Degradation',
      color: 'red',
      content:
        'Cell viability is a CPP that affects glycan quality through two distinct mechanisms: (1) Intracellular — dying cells have impaired Golgi function, producing incompletely processed glycans enriched in Man5 and G0; (2) Extracellular — lysed cells release intracellular glycosidases (β-galactosidase, sialidase/neuraminidase, hexosaminidase) into the culture supernatant, where they can degrade terminal sugars on secreted mAb glycans. The extracellular degradation mechanism is particularly insidious because it affects the entire mAb pool, not just molecules produced by dying cells. Sialidase activity is detectable in conditioned medium when viability drops below ~85%, and significant sialic acid loss occurs below ~75%. Galactosidase activity becomes problematic at lower viability (<70%), producing a progressive shift from G2F → G1F → G0F over time. This creates a time-dependent glycan degradation profile — longer harvest holds at low viability progressively worsen the glycan profile. Harvest timing is therefore a key control: harvest at viability >80% is a common criterion, and rapid harvest processing (minimising hold time between harvest and Protein A capture) protects the glycan profile.',
    },
    {
      type: 'callout',
      title: 'Feed Strategy — The Glucose-Lactate-Glycan Triangle',
      variant: 'warning',
      content:
        'Glucose feeding strategy creates a three-way interaction between glucose availability, lactate accumulation, and glycan quality. Overfeeding glucose drives excessive glycolysis, producing lactate (often >5 g/L in late-stage cultures). High lactate acidifies the cytoplasm, disrupting Golgi pH homeostasis and impairing glycosyltransferase activity. Paradoxically, glucose starvation is also detrimental — it depletes the nucleotide sugar donor pools (UDP-Glc, UDP-GlcNAc, UDP-Gal) that feed the glycosylation machinery. The optimal strategy maintains glucose at 2-4 g/L via controlled feeding (bolus or continuous), avoiding both starvation (<0.5 g/L) and excess (>6 g/L). Many modern fed-batch processes use at-line glucose monitoring (Nova BioProfile or Roche Cedex) to implement feedback-controlled glucose feeding, maintaining a narrow glucose setpoint. This approach simultaneously controls lactate, ammonia (indirectly, through reduced overflow metabolism), and glycan profile — demonstrating how a single CPP control strategy can impact multiple CQAs.',
    },
    {
      type: 'table',
      title: 'DoE Response Surface — CPP Ranges for Glycan Control',
      headers: ['CPP', 'Low (-1)', 'Center (0)', 'High (+1)', 'Primary Glycan Response', 'Interaction Effects'],
      rows: [
        ['pH', '6.80', '6.95', '7.10', 'Galactosylation (linear, ↑ at low pH)', 'pH × Temp interaction on Gal; pH × NH₃ on Man5'],
        ['Temperature (°C)', '32.0', '34.5', '37.0', 'Galactosylation (↑ at low T)', 'T × pH on Gal; T × Duration on viability'],
        ['DO (% air sat)', '20', '40', '60', 'Man5 (↑ at low DO)', 'DO × Viability on Man5'],
        ['Mn²⁺ (µM)', '0', '25', '50', 'Galactosylation (linear ↑)', 'Mn²⁺ × pH on Gal (synergistic)'],
        ['Glucose setpoint (g/L)', '1.5', '3.0', '4.5', 'Man5 (↑ at low Glc); Lactate (↑ at high Glc)', 'Glc × Feed rate on lactate'],
        ['Harvest day', '10', '12', '14', 'Viability-dependent degradation', 'Duration × Viability threshold'],
      ],
      sortable: false,
    },
    {
      type: 'card',
      title: 'Multivariate Control Strategy',
      color: 'green',
      content:
        'No single CPP controls the glycan profile in isolation — the CPP-CQA relationships form a multivariate network with significant interaction effects. The ICH Q8/Q11-aligned control strategy for glycosylation therefore involves: (1) Design space definition through DoE — typically a response surface methodology (RSM) design (central composite or Box-Behnken) with 4-6 CPPs, 15-30 experimental runs, and glycan profile as the multivariate response. (2) Proven acceptable ranges (PARs) for each CPP — derived from the design space boundary where all glycan CQAs remain within specification simultaneously. (3) Normal operating ranges (NORs) — tighter than PARs, reflecting the target operating conditions. (4) Process analytical technology (PAT) — online/at-line monitoring of pH, DO, glucose, lactate, glutamine, ammonia, and viability to detect and correct CPP deviations before they impact glycan quality. (5) Glycan profile as in-process control (IPC) — at-line HILIC or CE-LIF glycan analysis at mid-run (day 5-7) and pre-harvest to confirm glycan profile trajectory. The control strategy is documented in the regulatory filing (CTD Module 3.2.S.2.4) and serves as the mechanistic foundation for post-approval process change management.',
    },
    {
      type: 'bullets',
      title: 'Advanced CPP-CQA Considerations',
      items: [
        'Media lot-to-lot variability: Trace metal content (Mn²⁺, Zn²⁺, Cu²⁺), amino acid ratios, and vitamin levels vary between media lots and can shift glycan profiles by 2-5 percentage points. Incoming media lot testing should include ICP-MS for metals and amino acid analysis, with glycan impact assessment for out-of-trend lots.',
        'Scale-dependent mixing effects: At manufacturing scale (2000-15000L), impeller tip speed, power per unit volume (P/V), and mixing time (θ) differ from bench scale. These affect local pH and DO gradients, creating micro-environments where cells transiently experience suboptimal conditions. Computational fluid dynamics (CFD) modelling predicts zones of low DO or high pH that may affect glycosylation consistency.',
        'Cell line-specific CPP sensitivity: The magnitude and direction of CPP-CQA relationships can differ between cell lines. A CPP DoE performed on one CHO host cell line may not directly translate to another. Cell line-specific characterisation is required during early process development.',
        'Continuous processing considerations: In perfusion culture, steady-state conditions eliminate the temporal dynamics of fed-batch (nutrient depletion, metabolite accumulation, viability decline), potentially producing more consistent glycan profiles. However, perfusion introduces new CPPs — perfusion rate, cell density setpoint, and bleed rate — that require their own glycan impact characterisation.',
        'Real-time glycan monitoring: Emerging PAT approaches include at-line CE-LIF (15-minute turnaround), Raman spectroscopy-based glycan prediction models, and HPLC auto-samplers connected to the bioreactor. These technologies enable real-time CPP adjustment based on glycan profile trajectory — the ultimate implementation of the ICH Q8 design space concept.',
      ],
    },
  ],
  mentorQuestions: [
    'Design a DoE study to characterise the pH-temperature-Mn²⁺ interaction effects on galactosylation. How many runs, what design type, and what glycan endpoints would you measure?',
    'If you observe a sudden increase in Man5 species at manufacturing scale that was not seen at bench scale, what scale-dependent CPP factors would you investigate?',
    'How would you build a multivariate control strategy for glycosylation that satisfies ICH Q8(R2) requirements — walk through the elements from design space to PAT?',
  ],
};

export default module10;
