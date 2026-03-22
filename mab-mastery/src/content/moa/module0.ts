import type { ModuleContent } from '../../types/content';

export const module0: ModuleContent = {
  id: 'moa-m0',
  sectionId: 'moa',
  moduleNumber: 0,
  eyebrow: 'MOA 01',
  title: 'Direct Neutralisation & Receptor Blockade',
  lead: 'How therapeutic antibodies block ligand-receptor signalling — from anti-VEGF neutralisation to immune checkpoint blockade.',
  tags: [
    { label: 'Neutralisation', color: 'blue' },
    { label: 'Checkpoint Blockade', color: 'purple' },
    { label: 'Potency Assays', color: 'teal' },
  ],
  stats: [
    { label: 'Approved Blockers', value: '40+' },
    { label: 'Checkpoint mAbs', value: '10+' },
    { label: 'Typical KD', value: '0.1–10 nM' },
    { label: 'Key Assay', value: 'Cell-Based Reporter' },
  ],
  sections: [
    {
      type: 'card',
      title: 'Mechanism Overview — Ligand Neutralisation',
      color: 'blue',
      content:
        'Neutralising antibodies function by binding directly to a soluble ligand or to the ligand-binding domain of a cell-surface receptor, sterically preventing the formation of a productive ligand–receptor signalling complex. This is the simplest antibody mechanism of action: no Fc effector function is required — the Fab alone is sufficient. The therapeutic effect derives entirely from competitive inhibition of a pathological signalling axis. For ligand-targeting antibodies (e.g., bevacizumab against VEGF-A), the mAb sequesters the soluble mediator before it can engage its cognate receptor. For receptor-targeting antibodies (e.g., cetuximab against EGFR), the mAb occupies the ligand-binding epitope on the receptor ectodomain, physically preventing ligand docking. In both cases, the critical quality attributes centre on binding affinity, epitope specificity, and steric coverage of the interaction surface.',
    },
    {
      type: 'card',
      title: 'Anti-VEGF Neutralisation — Bevacizumab',
      color: 'teal',
      content:
        'Bevacizumab (Avastin) binds VEGF-A with a KD of ~1.1 nM, occupying the VEGFR2 binding epitope on VEGF-A and preventing engagement of both VEGFR1 and VEGFR2. VEGF-A is a homodimeric glycoprotein; bevacizumab binds to each monomer at the receptor-binding face, blocking the symmetrically positioned receptor-binding determinants. The mechanism is purely anti-angiogenic: by neutralising VEGF-A, bevacizumab prevents endothelial cell proliferation, migration, and new vessel formation in the tumour microenvironment. Because VEGF-A exists as multiple splice isoforms (VEGF121, VEGF165, VEGF189, VEGF206), the epitope targeted by bevacizumab is shared across all receptor-binding isoforms. From a CMC perspective, the potency assay must demonstrate inhibition of VEGF-mediated endothelial proliferation or VEGFR2 phosphorylation, and the specification must be set relative to a qualified reference standard.',
    },
    {
      type: 'card',
      title: 'Anti-EGFR Blockade — Cetuximab',
      color: 'green',
      content:
        'Cetuximab (Erbitux) is a chimeric IgG1 that binds EGFR (ErbB1/HER1) domain III with a KD of ~0.2 nM, overlapping the EGF-binding site. By occupying domain III, cetuximab prevents EGF and TGF-alpha from engaging EGFR, blocking ligand-induced receptor dimerisation and the subsequent activation of the RAS-RAF-MEK-ERK and PI3K-AKT-mTOR signalling cascades. Unlike pure neutralisers, cetuximab is an IgG1 with intact Fc effector function, so it can also elicit ADCC against EGFR-expressing tumour cells — making its clinical effect a combination of receptor blockade and immune-mediated killing. A key CMC consideration is that cetuximab is produced in murine SP2/0 cells, which attach alpha-1,3-galactose (Gal-alpha-1,3-Gal) to the Fab glycosylation site at Asn88 of the VH domain. This galactose-alpha-1,3-galactose epitope is the target of pre-existing IgE antibodies in some patients, causing anaphylaxis — a direct link between a manufacturing-dependent glycoform and a life-threatening adverse event.',
    },
    {
      type: 'card',
      title: 'Anti-PD-1 Checkpoint Blockade — Pembrolizumab & Nivolumab',
      color: 'purple',
      content:
        'PD-1 (programmed death-1, CD279) is an inhibitory receptor expressed on activated T cells. Its ligands PD-L1 (B7-H1) and PD-L2 (B7-DC) are expressed by tumour cells and tumour-infiltrating immune cells. PD-1 engagement delivers a co-inhibitory signal that suppresses T cell receptor (TCR) signalling by recruiting SHP-2 phosphatase, which dephosphorylates ZAP-70 and CD3zeta, thereby dampening T cell activation, proliferation, and cytokine production. Pembrolizumab (Keytruda, humanised IgG4-S228P) and nivolumab (Opdivo, fully human IgG4) both block the PD-L1/PD-L2 binding interface on PD-1, relieving the inhibitory brake and restoring anti-tumour T cell function. Both are IgG4 subclass — deliberately chosen to avoid Fc-mediated ADCC/CDC against PD-1-positive T cells. Pembrolizumab incorporates the S228P hinge mutation to prevent IgG4 Fab-arm exchange in vivo. Nivolumab retains wild-type IgG4 hinge but has minimal functional Fab-arm exchange due to favourable biophysical properties.',
    },
    {
      type: 'card',
      title: 'Anti-PD-L1 — Atezolizumab & Engineered Fc Silence',
      color: 'pink',
      content:
        'Atezolizumab (Tecentriq) targets PD-L1 on tumour cells and tumour-infiltrating immune cells, preventing its interaction with PD-1. Critically, PD-L1 is expressed not only on tumour cells but also on activated T cells themselves. If an anti-PD-L1 antibody retained effector function, it could deplete the very T cells it is meant to reactivate — a therapeutic paradox. Atezolizumab solves this with an engineered aglycosylated IgG1 Fc (N297A mutation), which eliminates FcgammaR binding and abolishes ADCC, ADCP, and CDC. This is a textbook example of how mechanism of action directly dictates Fc engineering strategy and, consequently, the CMC characterisation requirements. The potency assay for atezolizumab must demonstrate PD-L1 blockade (e.g., PD-1/PD-L1 binding inhibition ELISA or co-culture reporter assay) while confirming the absence of Fc-mediated effector functions.',
    },
    {
      type: 'table',
      title: 'Approved Neutralising / Blocking mAbs',
      headers: ['mAb', 'Target', 'Mechanism', 'Subclass', 'KD (nM)', 'Key CMC Note'],
      rows: [
        ['Bevacizumab', 'VEGF-A', 'Ligand neutralisation', 'IgG1', '~1.1', 'Cell-based VEGF-blocking potency assay'],
        ['Ranibizumab', 'VEGF-A', 'Ligand neutralisation', 'Fab fragment', '~0.5', 'No Fc — intravitreal route, low endotoxin'],
        ['Cetuximab', 'EGFR', 'Receptor blockade + ADCC', 'IgG1 (chimeric)', '~0.2', 'Gal-alpha-1,3-Gal glycoform — anaphylaxis risk'],
        ['Panitumumab', 'EGFR', 'Receptor blockade', 'IgG2 (fully human)', '~0.05', 'IgG2 — minimal effector function, pure blockade'],
        ['Pembrolizumab', 'PD-1', 'Checkpoint blockade', 'IgG4-S228P', '~0.03', 'S228P prevents Fab-arm exchange'],
        ['Nivolumab', 'PD-1', 'Checkpoint blockade', 'IgG4', '~3.1', 'Wild-type IgG4 hinge'],
        ['Atezolizumab', 'PD-L1', 'Checkpoint blockade', 'IgG1 (N297A)', '~0.4', 'Aglycosylated — no effector function'],
        ['Durvalumab', 'PD-L1', 'Checkpoint blockade', 'IgG1 (TM)', '~0.02', 'Triple mutation (L234F/L235E/P331S)'],
        ['Avelumab', 'PD-L1', 'Checkpoint blockade + ADCC', 'IgG1 (WT)', '~0.07', 'Wild-type Fc — retains ADCC against PD-L1+ tumours'],
        ['Adalimumab', 'TNF-alpha', 'Ligand neutralisation', 'IgG1', '~0.1', 'Most successful biosimilar target — 10+ approved biosimilars'],
        ['Infliximab', 'TNF-alpha', 'Ligand neutralisation + CDC', 'IgG1 (chimeric)', '~0.1', 'Chimeric — ADA risk, CDC against tmTNF+ cells'],
        ['Omalizumab', 'IgE', 'Ligand neutralisation', 'IgG1', '~8', 'Binds IgE CH3 domain — prevents FcepsilonRI engagement'],
        ['Canakinumab', 'IL-1beta', 'Cytokine neutralisation', 'IgG1', '~0.04', 'High affinity — long dosing interval (Q8W)'],
        ['Dupilumab', 'IL-4Ralpha', 'Receptor blockade', 'IgG4', '~0.7', 'Blocks both IL-4 and IL-13 signalling via shared receptor'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Valency, Avidity, and Steric Shielding',
      color: 'amber',
      content:
        'IgG antibodies are bivalent — two identical Fab arms can simultaneously engage two copies of a target molecule or two epitopes on a multimeric target. For soluble dimeric ligands like VEGF-A and TNF-alpha, bivalent binding by a single IgG molecule creates a stoichiometrically defined immune complex (typically 2:1 or 1:1 mAb:ligand dimer). This bivalent engagement enhances the apparent binding strength (avidity) well beyond the intrinsic monovalent affinity (KD). Avidity effects are critical in potency assay design: the functional EC50 of a bivalent IgG in a cell-based assay is often 10-100 fold lower than the KD measured by SPR (which reports monovalent affinity). For receptor blockade, steric shielding extends the effective inhibitory zone beyond the epitope itself — a large IgG molecule (~150 kDa, ~14 nm span) occupying a receptor ectodomain blocks access to adjacent binding sites even if they are not directly within the epitope footprint. This "umbrella effect" is particularly important for EGFR blockade, where cetuximab sterically prevents dimerisation of EGFR ectodomains.',
    },
    {
      type: 'bullets',
      title: 'Potency Assay Design for Neutralising/Blocking mAbs',
      items: [
        'Ligand-receptor binding assays (ELISA-based): Measure inhibition of ligand–receptor interaction in a plate-based format. Coat plate with receptor, add ligand ± mAb, detect bound ligand. Reports IC50 relative to reference standard. Simple, high-throughput, but does not capture biological downstream effects.',
        'Cell-based reporter assays (gold standard for regulatory submissions): Engineered cell lines with target-pathway-coupled reporters (e.g., VEGFR2-NFAT-luciferase, PD-1/PD-L1-NFAT-luciferase). Measure inhibition of reporter signal by the mAb. Reports relative potency (%) vs reference standard. Preferred by regulators because they confirm biological mechanism.',
        'Proliferation/survival inhibition assays: For targets where blockade inhibits cell growth (e.g., EGFR blockade inhibits A431 cell proliferation). Longer assay duration (48-72h), higher variability, but closest to clinical mechanism.',
        'SPR (surface plasmon resonance) for binding kinetics: Measures kon, koff, and KD. Not a potency assay per se, but a critical binding CQA. Used in comparability studies and lot release for binding characterisation.',
        'Epitope mapping (HDX-MS, X-ray crystallography): Defines the structural basis of neutralisation. Not a release test but essential for characterisation and IP positioning in CTD Module 3.2.S.3.',
      ],
    },
    {
      type: 'table',
      title: 'Receptor–Ligand Stoichiometry and Signalling',
      headers: ['Target Axis', 'Ligand Valency', 'Receptor Complex', 'mAb Binding Mode', 'Stoichiometry'],
      rows: [
        ['VEGF-A / VEGFR2', 'Homodimer', 'VEGFR2 homodimer', 'Binds each VEGF monomer (2 Fab per dimer)', '1 IgG : 1 VEGF dimer'],
        ['EGF / EGFR', 'Monomer', 'EGFR homodimer', 'Blocks domain III on EGFR monomer', '1 Fab : 1 EGFR (2 Fab per IgG)'],
        ['TNF-alpha / TNFR1', 'Homotrimer', 'TNFR1 trimer', 'Binds TNF trimer interface', '~2 IgG : 1 TNF trimer'],
        ['PD-L1 / PD-1', 'Monomer (on cell)', 'PD-1 monomer', 'Blocks PD-L1 IgV-like domain', '1 Fab : 1 PD-L1'],
        ['IL-6 / IL-6R / gp130', 'Monomer', 'Hexameric complex', 'Tocilizumab blocks IL-6R; sarilumab same', '1 Fab : 1 IL-6R'],
        ['IL-4 / IL-4Ralpha', 'Monomer', 'IL-4Ralpha + gamma-c or IL-13Ralpha1', 'Dupilumab blocks IL-4Ralpha', '1 Fab : 1 IL-4Ralpha'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: 'CMC Insight — Fc Subclass Selection Driven by MoA',
      variant: 'warning',
      content:
        'The choice of IgG subclass for a neutralising/blocking antibody is NOT arbitrary — it is dictated by the mechanism of action and the cellular context of the target. If the target is expressed on cells you do NOT want to kill (e.g., PD-1 on T cells, IL-4Ralpha on immune cells), you MUST use an effector-silent format: IgG4 (pembrolizumab, dupilumab), IgG1 with LALA-PG (durvalumab TM variant), or aglycosylated IgG1 (atezolizumab N297A). Conversely, if the target is on tumour cells and killing is desirable alongside blockade (e.g., cetuximab on EGFR+ tumour cells, avelumab on PD-L1+ tumour cells), wild-type IgG1 is appropriate. This subclass decision cascades through the entire CMC programme: it determines which effector function assays are required (or must demonstrate absence), the glycosylation specifications, and the potency assay design.',
    },
    {
      type: 'card',
      title: 'Binding Kinetics — SPR Parameters and Their CMC Significance',
      color: 'blue',
      content:
        'Surface plasmon resonance (SPR, typically Biacore) measures three kinetic parameters: kon (association rate, M-1 s-1), koff (dissociation rate, s-1), and KD (equilibrium dissociation constant = koff/kon, M). For neutralising antibodies, the koff is often the most clinically relevant parameter because it determines how long the antibody remains bound to the target in vivo. A slow koff (e.g., <1 x 10-4 s-1) means the antibody-target complex persists for hours, providing sustained neutralisation even as free drug concentration declines between doses. For example, pembrolizumab has an exceptionally slow koff for PD-1, contributing to its durable receptor occupancy and enabling Q3W or even Q6W dosing. In CMC comparability studies (e.g., manufacturing process changes, biosimilar development), SPR kinetics are a primary similarity criterion. Regulators expect kon, koff, and KD to fall within predefined acceptance ranges relative to the reference standard — typically within 0.8-1.25 fold for each parameter.',
    },
    {
      type: 'bullets',
      title: 'Epitope Mapping — Structural Basis of Neutralisation',
      items: [
        'Hydrogen-deuterium exchange mass spectrometry (HDX-MS): Maps the conformational epitope by measuring reduced deuterium uptake in mAb-bound regions. Provides residue-level resolution for discontinuous (conformational) epitopes. Standard characterisation for CTD Module 3.2.S.3.',
        'X-ray crystallography of Fab–antigen complex: Gold standard for atomic-resolution epitope definition. Identifies every contact residue, hydrogen bonds, and van der Waals interactions. Essential for IP claims and for understanding how mutations in the target (e.g., EGFR domain III mutations in cetuximab resistance) affect binding.',
        'Alanine scanning mutagenesis: Systematic single-residue mutations across the target surface identify "hot spot" residues contributing disproportionately to binding energy. Distinguishes structural epitope (contact residues) from functional epitope (energetically critical residues).',
        'Competitive binning by SPR or BLI: Classifies mAbs into epitope bins based on competitive binding. Determines whether two mAbs can bind simultaneously (non-competing) or block each other (same/overlapping epitope). Critical for combination therapy rational design.',
      ],
    },
    {
      type: 'callout',
      title: 'Regulatory Expectation — Potency Assay Alignment with MoA',
      variant: 'info',
      content:
        'ICH Q6B and FDA/EMA guidance require that the potency assay for a therapeutic mAb be "relevant to the mechanism of action." For neutralising/blocking antibodies, this means the potency assay must demonstrate functional blockade of the target signalling pathway — not merely binding. A simple binding ELISA (e.g., mAb binding to immobilised VEGF) is insufficient as a standalone potency assay. The expected hierarchy: (1) cell-based functional assay measuring downstream pathway inhibition (ideal), (2) cell-based reporter assay with pathway-coupled reporter (acceptable and commonly used), (3) ligand-receptor inhibition ELISA (supplementary but not standalone). The potency result is expressed as relative potency (%) compared to a qualified in-house reference standard, with typical lot-release specifications of 80-125% or tighter.',
    },
    {
      type: 'table',
      title: 'Potency Assay Formats — Neutralisation & Blockade',
      headers: ['Assay Format', 'Readout', 'Throughput', 'Variability', 'Regulatory Acceptance'],
      rows: [
        ['Cell-based reporter (NFAT-luc, SRE-luc)', 'Luminescence', 'High', 'CV 10-20%', 'Gold standard — preferred for lot release'],
        ['Cell-based proliferation inhibition', 'MTT/CellTiter-Glo', 'Medium', 'CV 15-30%', 'Accepted — closer to clinical MoA'],
        ['Ligand–receptor binding inhibition ELISA', 'Absorbance (450 nm)', 'High', 'CV 5-15%', 'Supplementary — not standalone potency'],
        ['SPR competitive binding', 'RU (response units)', 'Low', 'CV 5-10%', 'Characterisation/comparability — not potency'],
        ['Flow cytometry receptor occupancy', 'MFI', 'Medium', 'CV 10-25%', 'Clinical PD marker — not manufacturing release'],
      ],
      sortable: true,
    },
  ],
  mentorQuestions: [
    'Why is an effector-silent Fc format essential for anti-PD-1 antibodies but not for anti-EGFR antibodies, and how does this decision affect the CMC analytical package?',
    'If a biosimilar manufacturer changed the host cell line for a neutralising mAb and observed altered glycosylation, how would you assess whether the potency is comparable if the mechanism relies solely on Fab-mediated blockade?',
    'How would you design the potency assay for a bispecific antibody that combines VEGF neutralisation with PD-L1 blockade in a single molecule?',
  ],
};
