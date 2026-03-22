import type { ModuleContent } from '../../types/content';

export const module6: ModuleContent = {
  id: 'structure-m6',
  sectionId: 'structure',
  moduleNumber: 6,
  eyebrow: 'STRUCTURE 07',
  title: 'Developability Liabilities',
  lead: 'The complete landscape of post-translational modification hotspots, self-association, polyreactivity, and viscosity challenges that determine manufacturability.',
  tags: [
    { label: 'PTM Hotspots', color: 'red' },
    { label: 'Viscosity', color: 'amber' },
    { label: 'Self-Association', color: 'purple' },
    { label: 'Developability', color: 'blue' },
  ],
  stats: [
    { label: 'Key PTM Motifs', value: 'NG/NS/DG/DS' },
    { label: 'Viscosity Limit', value: '<20 cP @ 150mg/mL' },
    { label: 'HIC Threshold', value: '<1.5 min \u0394t' },
    { label: 'PSR Threshold', value: '<0.35' },
  ],
  sections: [
    {
      type: 'table',
      title: 'Complete PTM Motif Reference Table',
      headers: ['Motif', 'Modification', 't\u00bd (pH 7, 37\u00b0C)', 'Risk Level', 'Primary Detection Method'],
      rows: [
        ['NG (Asn-Gly)', 'Deamidation (Asn\u2192Asp/isoAsp)', '1\u201314 days', 'Very High', 'CEX, peptide mapping (LC-MS/MS)'],
        ['NS (Asn-Ser)', 'Deamidation', '7\u201330 days', 'High', 'CEX, peptide mapping'],
        ['NT (Asn-Thr)', 'Deamidation', 'Weeks\u2013months', 'Medium', 'Peptide mapping'],
        ['DG (Asp-Gly)', 'Isomerisation (Asp\u2192isoAsp)', 'Weeks', 'High', 'CEX, peptide mapping + ETD'],
        ['DS (Asp-Ser)', 'Isomerisation', 'Months', 'Medium', 'Peptide mapping'],
        ['DP (Asp-Pro)', 'Backbone clipping', 'Variable (acid-catalysed)', 'Medium', 'CE-SDS, peptide mapping, SEC'],
        ['Met (surface)', 'Oxidation (Met\u2192Met(O))', 'Variable', 'High if FcRn site', 'HIC, peptide mapping'],
        ['Trp (CDR)', 'Oxidation (\u2192kynurenine/OH-Trp)', 'Variable', 'Medium\u2013High', 'Fluorescence, LC-MS/MS'],
        ['Free Cys', 'Thiol-mediated aggregation', 'N/A', 'High', 'Ellman\u2019s, HIC, nrCE-SDS'],
        ['Glycation', 'Lys + glucose \u2192 Amadori product', 'Weeks', 'Low\u2013Medium', 'Boronate affinity, LC-MS'],
        ['PyroGlu', 'N-term Gln \u2192 pyroglutamate', 'Days\u2013weeks', 'Low (cosmetic)', 'CEX, peptide mapping'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Fc Methionine Oxidation \u2014 FcRn Impact',
      color: 'red',
      content:
        'Methionine oxidation at Fc positions M252 and M428 (EU numbering) is a critical quality attribute because these residues are direct FcRn contact sites. Oxidation of Met to methionine sulfoxide (Met(O)) introduces a polar, bulky oxygen atom that disrupts the hydrophobic FcRn binding pocket. Consequences: (1) Oxidation of M252 reduces FcRn binding affinity by 3-10\u00d7 at pH 6.0, as measured by SPR. Since FcRn-mediated recycling is the mechanism responsible for the ~21-day half-life of IgG, even partial M252 oxidation can accelerate clearance; (2) M428 oxidation has similar but somewhat smaller effects on FcRn binding; (3) The combination of M252(O) + M428(O) is synergistically deleterious. In forced degradation studies, M252 is more susceptible to oxidation than M428 due to greater solvent exposure. Oxidation is accelerated by: H\u2082O\u2082 (residual from viral inactivation), metal ions (Fe\u00b2\u207a, Cu\u00b2\u207a trace contaminants), light exposure (ICH Q1B photostability), and polysorbate degradation products (peroxides). Monitoring: HIC-HPLC provides a rapid screen (oxidised species elute earlier due to increased hydrophilicity), and peptide mapping quantifies site-specific % oxidation. Typical specifications: M252 oxidation < 5-10% at release.',
    },
    {
      type: 'card',
      title: 'Self-Association & High-Concentration Viscosity',
      color: 'amber',
      content:
        'Subcutaneous (SC) delivery requires high-concentration formulations, typically 100-200 mg/mL, to deliver therapeutic doses in \u22641.5 mL injection volume. At these concentrations, some antibodies exhibit dramatically increased viscosity due to reversible self-association (RSA) \u2014 transient, non-covalent interactions between antibody molecules. Viscosity scales exponentially with concentration: a molecule that shows 3 cP at 10 mg/mL may exhibit 80+ cP at 150 mg/mL, exceeding the practical limit for syringeability (~20-30 cP for standard 27G thin-wall needles, ~50 cP for autoinjector devices). Self-association is driven by: (1) Fab-Fab interactions, often mediated by CDR surface charge or hydrophobicity patches; (2) Fab-Fc interactions, involving the CDR surface and CH2/CH3 domains; (3) Electrostatic interactions, including charge-dipole and dipole-dipole forces that create extended solution networks. Molecular-level characterisation: AC-SINS (affinity capture self-interaction nanoparticle spectroscopy) measures red-shift in gold nanoparticle plasmon resonance upon antibody self-association. CIC (cross-interaction chromatography) uses immobilised polyclonal IgG as a column ligand to measure non-specific interactions. DLS (dynamic light scattering) kD parameter quantifies the concentration dependence of the diffusion coefficient \u2014 negative kD indicates net attraction (self-association risk).',
    },
    {
      type: 'card',
      title: 'Polyreactivity \u2014 Non-Specific Binding',
      color: 'purple',
      content:
        'Polyreactivity refers to the non-specific binding of an antibody to multiple unrelated antigens (DNA, insulin, LPS, cardiolipin, cytoskeletal proteins). It indicates "sticky" surface chemistry, typically arising from large solvent-exposed hydrophobic patches or extended cationic surfaces in the CDR regions. CMC and clinical consequences: (1) Accelerated in vivo clearance \u2014 polyreactive antibodies are cleared faster through non-specific tissue uptake (pinocytosis, FcRn-independent mechanisms), reducing half-life by 30-70%; (2) Increased immunogenicity risk \u2014 non-specific binding to self-antigens may trigger T-cell responses; (3) Manufacturing challenges \u2014 non-specific binding to chromatography resins, filters, and bag surfaces reduces recovery. Measurement: PSR (polyspecificity reagent) assay uses a baculovirus-expressed membrane proteome as a non-specific binding target. PSR score > 0.35 = elevated risk (Xu et al., MAbs 2013). BVP (baculovirus particle) binding is a similar orthogonal assay. Standup Monolayer Adsorption Chromatography (SMAC) measures non-specific binding to anionic surfaces. CIC (cross-interaction chromatography) quantifies retention on polyclonal IgG columns. In developability assessment, PSR is one of the most predictive single assays for in vivo clearance risk.',
    },
    {
      type: 'card',
      title: 'Surface Hydrophobicity \u2014 SAP and HIC',
      color: 'blue',
      content:
        'Surface hydrophobicity is a root cause of multiple developability liabilities: self-association, polyreactivity, fast clearance, and aggregation. It is quantified computationally by spatial aggregation propensity (SAP) analysis (Chennamsetty et al., PNAS 2009), which maps the hydrophobic patches on the antibody surface in 3D. Patches with SAP scores > 0.15 (over a 5 \u00c5 radius) are considered aggregation-prone. Experimentally, hydrophobic interaction chromatography (HIC) retention time is a strong correlate: antibodies that elute later on a butyl or phenyl HIC column have greater surface hydrophobicity. The HIC retention time (\u0394t) relative to a reference standard antibody predicts in vivo clearance: \u0394t > 1.5 minutes is associated with 2-5\u00d7 faster clearance in human and cynomolgus monkey PK studies (Jain et al., PNAS 2017). HIC is particularly powerful because it integrates all hydrophobic contributions across the entire molecular surface \u2014 unlike SAP, which requires a crystal structure. For molecules flagged by HIC, mitigation strategies include: (1) CDR residue substitution to reduce hydrophobic patch (e.g., Leu\u2192Ser, Ile\u2192Thr at CDR tips); (2) Charge introduction to break hydrophobic clusters (e.g., introducing Asp or Glu at framework positions flanking the hydrophobic patch); (3) Alternate germline framework selection.',
    },
    {
      type: 'table',
      title: 'Developability Assessment Panel \u2014 Thresholds',
      headers: ['Assay', 'Parameter', 'Green (\u2713)', 'Amber (\u26a0)', 'Red (\u2717)'],
      rows: [
        ['AC-SINS', '\u0394\u03bbmax (nm)', '<2', '2\u20138', '>8'],
        ['HIC', 'Retention \u0394t (min)', '<0.5', '0.5\u20131.5', '>1.5'],
        ['PSR', 'Polyspecificity score', '<0.2', '0.2\u20130.35', '>0.35'],
        ['CIC (DLS)', 'kD (mL/g)', '>0', '\u22125 to 0', '<\u22125'],
        ['DSF/nanoDSF', 'Tonset (\u00b0C)', '>60', '55\u201360', '<55'],
        ['SEC (t=0)', '% Monomer', '>98', '95\u201398', '<95'],
        ['Viscosity', 'cP @ 150 mg/mL', '<15', '15\u201330', '>30'],
        ['CSI (clone stability)', 'Titre retention at P60', '>80%', '60\u201380%', '<60%'],
        ['BVP binding', 'Score', '<0.3', '0.3\u20130.5', '>0.5'],
        ['SMAC', 'Retention (min)', '<10', '10\u201320', '>20'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: 'Multi-Flag Risk Escalation',
      variant: 'danger',
      content:
        'A molecule with multiple red flags in developability assessment (e.g., high PSR + high viscosity + low Tonset) should trigger early engineering intervention. The cost of discovering these issues in Phase II/III is orders of magnitude higher than addressing them during lead optimisation. Analysis of >100 clinical-stage antibodies has shown that molecules with \u22653 amber/red flags have a >50% probability of requiring formulation redesign, process modification, or dose adjustment after Phase I. Each engineering cycle at the lead optimisation stage costs ~$50-100K and 3-6 months. The same change after Phase I costs $5-20M and 12-24 months (including bridging studies, updated CMC sections, and regulatory supplements). Developability assessment is not a "nice to have" \u2014 it is a critical risk mitigation step that should gate lead selection.',
    },
    {
      type: 'card',
      title: 'Free Cysteine and Thioether Modifications',
      color: 'teal',
      content:
        'Free (unpaired) cysteine residues in therapeutic antibodies represent a significant developability liability. Sources: (1) Incomplete inter-chain disulfide formation \u2014 the HC-LC disulfide (C220-C214) or hinge disulfides (C226, C229) may form incompletely, leaving reactive thiol groups; (2) Engineered cysteine for ADC conjugation \u2014 site-specific ADCs (e.g., ThioMab technology) introduce free Cys residues by design, but capping and conjugation efficiency must be controlled; (3) Cysteinylation \u2014 free Cys from cell culture media (up to 2 mM cysteine in CHO media) can form mixed disulfides with free thiols on the antibody surface. Consequences: Free thiols promote disulfide-mediated aggregation through thiol-disulfide exchange, generating covalent aggregates visible by non-reducing CE-SDS and SEC. Even 0.5-1.0% free thiol content can lead to progressive aggregate formation during storage. Detection: Ellman\u2019s reagent (DTNB) quantifies total free thiol per molecule. HIC can resolve species with different numbers of free thiols. Peptide mapping identifies the specific free Cys sites. Control: Process optimisation to ensure complete disulfide bond formation (adequate copper supplementation, DO control, hold time at harvest), and formulation at pH where thiol-disulfide exchange is minimised (pH 5.5-6.5).',
    },
    {
      type: 'card',
      title: 'Tryptophan Oxidation in CDRs',
      color: 'red',
      content:
        'Tryptophan residues in CDR loops are susceptible to oxidation, generating multiple products: kynurenine (ring-opening, +4 Da), N-formylkynurenine (intermediate, +32 Da), 5-hydroxytryptophan (+16 Da), and dioxindolylalanine. CDR Trp residues are frequently involved in antigen binding (Trp is overrepresented in CDRs at ~7% vs ~1.5% in frameworks) because its large planar indole ring makes extensive van der Waals contacts with antigen epitopes. Oxidation of a CDR Trp can directly reduce potency by disrupting antigen contacts and altering local CDR loop conformation. The primary oxidation triggers are: (1) UV/visible light exposure \u2014 Trp absorbs at 280 nm and undergoes photosensitised oxidation; (2) Reactive oxygen species (H\u2082O\u2082, superoxide) from polysorbate degradation or residual peroxide; (3) Metal-catalysed oxidation (Fe\u00b2\u207a/Cu\u00b2\u207a + O\u2082). Trp oxidation is particularly insidious because it can proceed during photostability testing (ICH Q1B), storage under ambient light conditions, and even during manufacturing (light exposure in glass bioreactors). Monitoring: intrinsic fluorescence (Trp\u2192kynurenine produces a characteristic fluorescence shift from 340 nm emission to 420 nm), reversed-phase peptide mapping with LC-MS/MS for site-specific quantification. Control: amber glass vials or foil overwrap for light protection, nitrogen overlay to minimise dissolved oxygen, chelating agents (DTPA, EDTA) to remove catalytic metal ions.',
    },
    {
      type: 'table',
      title: 'Viscosity Mitigation Strategies',
      headers: ['Strategy', 'Mechanism', 'Typical Effect', 'Considerations'],
      rows: [
        ['Arginine (150\u2013200 mM)', 'Charge screening + preferential interaction', '30\u201360% viscosity reduction', 'Increases ionic strength; may affect stability'],
        ['NaCl (100\u2013150 mM)', 'Electrostatic screening', '20\u201340% reduction', 'Can destabilise some molecules (Hofmeister effect)'],
        ['Proline (250 mM)', 'Preferential exclusion + steric crowding suppression', '20\u201350% reduction', 'High concentration needed; osmolality concerns'],
        ['Camphorsulfonic acid', 'Charge neutralisation + hydrophobic disruption', '30\u201370% reduction (investigational)', 'Novel excipient; limited regulatory precedent'],
        ['Histidine-arginine buffer', 'Combined pH buffering + charge screening', '30\u201350% reduction', 'Common platform combination'],
        ['Lower concentration + larger volume', 'Avoids the high-conc regime', 'N/A', 'May require device change (e.g., 2 mL cartridge)'],
        ['CDR engineering', 'Remove hydrophobic/cationic patches', 'Can normalise viscosity', 'Risk of potency loss; requires re-characterisation'],
        ['Alternate isotype (IgG4 \u2192 IgG1)', 'Different Fc self-association profile', 'Variable; molecule-specific', 'Changes effector function profile'],
      ],
    },
    {
      type: 'card',
      title: 'Glycation \u2014 Non-Enzymatic Sugar Modification',
      color: 'green',
      content:
        'Glycation is the non-enzymatic reaction between reducing sugars (glucose, lactose) and primary amines (Lys \u03b5-amino groups, N-terminus) via the Maillard reaction. The initial Schiff base rearranges to a stable Amadori product (+162 Da for glucose). In cell culture, CHO media glucose concentrations (5-30 mM) drive glycation at rates of 1-5% per Lys residue over a 14-day fed-batch process. Glycation is site-specific \u2014 surface-exposed Lys residues with low pKa (flanked by other positive charges or near Asp/Glu) react fastest. Key sites include: HC Lys residues in the Fc region (K248, K288, K290 by EU numbering) and the HC N-terminus. Glycation generates acidic charge variants detectable by CEX/iCIEF (the Amadori product masks the positive Lys charge). Impact: glycation at Fab Lys residues near the antigen-binding site can reduce potency if it sterically obstructs the paratope. Fc glycation has minimal functional impact. Control: replace glucose with galactose or mannose in cell culture media (non-reducing sugars do not form glycation products), or optimise feeding strategy to maintain glucose <5 mM during production. Formulation: sucrose and trehalose (non-reducing) are preferred over glucose/lactose.',
    },
    {
      type: 'bullets',
      title: 'Timing of Developability Assessment in Development',
      items: [
        'Lead optimisation (pre-candidate selection): This is the optimal stage for developability assessment. Assays at this stage are rapid, low-material, and can evaluate panels of 20-50 variants. Key assays: DSF/nanoDSF (Tm, Tonset), SEC (monomer%), DLS (kD), HIC, PSR, AC-SINS. Material requirement: 0.5-2 mg per assay. Timeline: 2-4 weeks. A molecule with multiple red flags should be deprioritised or engineered before advancing to candidate selection.',
        'Candidate selection: Refined developability assessment on 3-5 lead candidates. Add: viscosity at high concentration (cone-and-plate rheometry at 100-200 mg/mL), forced degradation panel (40\u00b0C/4 weeks, oxidation, light), formulation screening (nanoDSF across 20-50 conditions). Material requirement: 50-200 mg. Timeline: 4-8 weeks.',
        'Cell line development: Too late to change the molecule sequence economically. Developability data at this stage should confirm prior assessments, not reveal new issues. If a new liability emerges (e.g., viscosity problem first measured at high concentration), the options are limited to formulation mitigation.',
        'GLP toxicology / Phase I: Major sequence changes are no longer feasible without restarting toxicology. Developability issues discovered here require formulation workarounds, dose/concentration adjustments, or device engineering (e.g., autoinjector with larger bore needle for viscous formulations).',
        'Phase II/III: Process changes at this stage trigger comparability assessments (ICH Q5E). CMC liabilities must be managed through specifications, control strategies, and process parameter optimisation. The cost of a CMC-related clinical hold at this stage is estimated at $1-5M per month of delay.',
      ],
    },
    {
      type: 'card',
      title: 'Mitigation by CDR Engineering',
      color: 'purple',
      content:
        'When developability liabilities are driven by CDR sequence features (hydrophobic patches, charge clusters, liability motifs), targeted CDR engineering can resolve them without changing the molecule\u2019s fundamental mechanism of action. Strategies: (1) Hydrophobic patch reduction \u2014 substitute solvent-exposed Leu, Ile, Val, Phe in CDR tips with more hydrophilic residues (Ser, Thr, Asn). Each substitution must be tested for potency retention; typically, 30-50% of such substitutions are tolerated. (2) Charge engineering \u2014 introduce Asp or Glu at positions flanking cationic patches to reduce net positive charge in the CDR surface. This specifically addresses self-association and polyreactivity driven by electrostatic interactions. (3) Liability motif removal \u2014 N\u2192Q, G\u2192A at n+1 position for deamidation; D\u2192E for isomerisation; M\u2192L for oxidation (see Module 3 for details). (4) Germline reversion \u2014 mutate somatic hypermutation-derived residues back to germline sequence. This simultaneously improves humanness score (reducing immunogenicity risk) and often removes liabilities introduced during affinity maturation. The engineering cycle: design 10-20 variants \u2192 express in transient CHO/HEK \u2192 screen by potency + SEC + DSF + HIC \u2192 select best candidates \u2192 confirm by full developability panel.',
    },
    {
      type: 'callout',
      title: 'C-Terminal Lysine Clipping \u2014 A Universal Charge Variant',
      variant: 'info',
      content:
        'C-terminal lysine (Lys447, EU) on the heavy chain is removed by host-cell carboxypeptidase B during cell culture, resulting in a heterogeneous population: 0-Lys (both HC clipped, most basic), 1-Lys (one HC clipped), 2-Lys (neither clipped, most basic). This is a universal modification for all mAb products and is considered a "cosmetic" charge variant \u2014 it does not affect potency, safety, or pharmacokinetics. Regulatory expectation: C-terminal Lys heterogeneity should be characterised and reported (typically by CEX as part of the basic variant population), but narrow specifications are not required. Many companies remove C-terminal Lys processing from the specification if they can demonstrate functional equivalence. For biosimilar development, C-terminal Lys levels are expected to be similar to the reference product but are considered a low-risk CQA. Carboxypeptidase B activity is influenced by cell culture duration and harvest timing \u2014 longer culture = more complete clipping.',
    },
    {
      type: 'table',
      title: 'PTM Impact on Fc Functions',
      headers: ['Modification', 'Site (EU)', 'FcRn Binding', 'Fc\u03b3R Binding', 'C1q Binding', 'Protein A Binding'],
      rows: [
        ['Met oxidation', 'M252', '\u21933-10\u00d7', 'Minimal', 'Minimal', 'Minimal'],
        ['Met oxidation', 'M428', '\u21932-5\u00d7', 'Minimal', 'Minimal', 'Minimal'],
        ['Deamidation', 'N325', 'Minimal', 'Minimal', '\u21932-3\u00d7', 'Minimal'],
        ['Asn deamidation', 'N315 (isoAsp)', 'Minimal', 'Minimal', 'Minimal', 'Minimal'],
        ['Trp oxidation', 'W277', 'Minimal', '\u21931.5-2\u00d7', 'Minimal', 'Minimal'],
        ['Glycation', 'K248, K288', 'Minimal', 'Minimal', 'Minimal', 'Minimal'],
        ['Aglycosylation', 'N297', '\u21932-3\u00d7', 'Abolished', 'Abolished', 'Minimal'],
        ['PyroGlu', 'HC N-term', 'Minimal', 'Minimal', 'Minimal', 'Minimal'],
        ['C-term Lys clip', 'K447', 'None', 'None', 'None', 'None'],
      ],
      sortable: true,
    },
  ],
  mentorQuestions: [
    'You have two lead candidates with similar potency. Candidate A has an NG motif in HCDR2 and viscosity of 25 cP. Candidate B has no CDR liabilities but PSR of 0.4. Which do you advance, and why?',
    'How would you design a forced degradation study to comprehensively characterise the PTM liabilities of a new mAb?',
    'At what stage of development is it too late to address a viscosity problem, and what options remain?',
  ],
};
