import type { ModuleContent } from '../../types/content';

export const module3: ModuleContent = {
  id: 'moa-m3',
  sectionId: 'moa',
  moduleNumber: 3,
  eyebrow: 'MOA 04',
  title: 'CDC — Complement-Dependent Cytotoxicity',
  lead: 'The complete classical complement cascade from C1q hexameric IgG recognition through MAC pore formation — subclass hierarchy, glycosylation impact, and regulatory escape mechanisms.',
  tags: [
    { label: 'CDC', color: 'blue' },
    { label: 'C1q Binding', color: 'teal' },
    { label: 'MAC Formation', color: 'red' },
    { label: 'IgG Subclass', color: 'amber' },
  ],
  stats: [
    { label: 'Key Initiator', value: 'C1q Hexamer' },
    { label: 'Pore Complex', value: 'C5b-9 (MAC)' },
    { label: 'Critical Residues', value: 'P329/P331 (EU)' },
    { label: 'IgG1 vs IgG4 CDC', value: '~100-fold diff' },
  ],
  sections: [
    {
      type: 'card',
      title: '1. Classical Complement Pathway — Overview',
      color: 'blue',
      content:
        'Complement-dependent cytotoxicity (CDC) is an Fc-mediated effector mechanism in which the classical complement cascade is activated on the surface of antibody-opsonised target cells, culminating in membrane attack complex (MAC) insertion and osmotic lysis. Unlike ADCC and ADCP, which require cellular effectors, CDC is entirely humoral — it proceeds through a proteolytic cascade of soluble serum proteins once triggered by IgG Fc engagement of C1q. CDC is the primary mechanism of action for rituximab (anti-CD20 type I) in CLL, where complement is abundant in the blood compartment. The cascade follows an ordered proteolytic amplification: C1q recognition of clustered Fc regions triggers C1r autoactivation, which activates C1s, which cleaves C4 and C2 to form the C3 convertase (C4b2a), which cleaves hundreds of C3 molecules, generating C3b opsonins and assembling the C5 convertase (C4b2a3b), which cleaves C5 to initiate the terminal pathway — assembly of C5b-6-7-8-poly-C9, the membrane attack complex.',
    },
    {
      type: 'card',
      title: '2. C1q Recognition — The Hexameric IgG Model',
      color: 'teal',
      content:
        'C1q is a 460 kDa heterohexameric protein comprising six globular head domains (gC1q), each assembled from heterotrimers of C1qA, C1qB, and C1qC chains, connected by collagen-like stalks to a central fibril-like stem. Each gC1q head can bind one IgG Fc domain, but productive C1 activation requires multivalent engagement — a single IgG-gC1q interaction is insufficient. The "hexameric IgG model" (Diebolder et al., Science 2014) demonstrated that IgGs form ordered hexameric ring structures on the cell surface through non-covalent Fc-Fc contacts. The hexameric IgG ring presents six Fc domains in an arrangement that matches the six gC1q heads of C1q, creating high-avidity multivalent binding. The Fc-Fc interface involves residues in the CH2-CH3 elbow region, including K439 and S440 (EU numbering). Point mutations that enhance Fc-Fc contacts (e.g., E345R, E430G, S440Y — the "HexaBody" mutations) dramatically enhance hexamerisation and CDC activity, even at low antigen densities where wild-type IgG1 fails to induce CDC.',
    },
    {
      type: 'card',
      title: '3. C1q Binding Interface — P329/P331 Proline Sandwich',
      color: 'green',
      content:
        'C1q binds the IgG Fc at the CH2 domain, in a region distinct from but adjacent to the FcgammaR binding site. The key structural motif is the "proline sandwich": Pro329 on IgG Fc is intercalated between two aromatic residues (Trp and Phe) on the gC1q head, forming a conserved hydrophobic core. Pro331 (EU numbering) is adjacent and contributes to the binding interface. The L234/L235 lower hinge residues also contribute, as does D270. The IgG subclass hierarchy for C1q binding (IgG3 > IgG1 >> IgG2 > IgG4) is largely explained by differences at position 331: IgG1 has Pro331, IgG2 has Ala331 (reduced C1q binding), and IgG4 has Ser331 (essentially no C1q binding). The P329G mutation (LALA-PG: L234A/L235A/P329G) is used to engineer Fc silence in antibodies where CDC is undesirable, as it directly disrupts the proline sandwich without altering the overall CH2 fold. This is particularly important for bispecific antibodies and checkpoint inhibitors targeting cells that should not be lysed.',
    },
    {
      type: 'card',
      title: '4. C1r/C1s Activation and C4/C2 Cleavage',
      color: 'amber',
      content:
        'Upon C1q binding to hexameric IgG, a conformational change is transmitted through the collagen stalks to the C1r2-C1s2 tetramer held within the C1 complex. C1r is a serine protease zymogen that undergoes autocatalytic activation — the conformational change induced by C1q binding brings the two C1r catalytic domains into proximity, enabling trans-cleavage and activation. Activated C1r then cleaves and activates both C1s molecules within the same C1 complex. C1s is the effector protease that cleaves two substrates: (1) C4 is cleaved into C4a (anaphylatoxin, released) and C4b, which exposes a reactive thioester that covalently bonds to hydroxyl or amino groups on the target cell surface (covalent opsonisation). (2) C2 is cleaved by C1s in complex with C4b, generating C2a (the serine protease catalytic fragment that remains associated with C4b) and C2b (released). The resulting C4b2a complex is the classical pathway C3 convertase. C1 inhibitor (C1-INH, serpin) regulates this step by irreversibly binding activated C1r and C1s, dissociating them from C1q.',
    },
    {
      type: 'card',
      title: '5. C3 Convertase Amplification and C5 Convertase Assembly',
      color: 'purple',
      content:
        'The C3 convertase C4b2a is the amplification engine of the complement cascade. A single C4b2a complex can cleave hundreds of C3 molecules into C3a (anaphylatoxin) and C3b (opsonin). C3b deposits covalently on the target cell surface via the same thioester mechanism as C4b, creating a dense coat of C3b. This massive C3b deposition serves three functions: (1) opsonisation for phagocytosis via complement receptors CR1 (CD35) and CR3 (CD11b/CD18), (2) further C3 convertase assembly via the alternative pathway amplification loop (C3b-Bb), and (3) assembly of the C5 convertase. The C5 convertase forms when an additional C3b molecule binds to the C4b2a complex, creating C4b2a3b. This trimolecular complex cleaves C5 into C5a (the most potent anaphylatoxin, 74 aa) and C5b, which initiates the terminal complement pathway. The amplification is remarkable: each C1 complex generates ~30 C4b2a enzymes, each C4b2a cleaves ~200 C3 molecules, yielding ~6,000 C3b per initiating C1. Factor H and Factor I regulate this amplification by cleaving C3b to inactive iC3b on host cells.',
    },
    {
      type: 'card',
      title: '6. Terminal Pathway — MAC Assembly (C5b-9)',
      color: 'red',
      content:
        'C5b generated by the C5 convertase initiates the terminal pathway by sequentially recruiting C6, C7, C8, and poly-C9 to form the membrane attack complex (MAC). C5b binds C6, forming a stable C5b-6 complex. C7 then binds, inducing a conformational change that exposes hydrophobic domains, enabling the C5b-7 complex to insert into the lipid bilayer. C8 (alpha-beta-gamma heterotrimer) binds C5b-7 and partially inserts into the membrane via its beta chain. The C5b-8 complex then recruits 12-18 molecules of C9, which polymerise to form a transmembrane pore of approximately 10 nm internal diameter. Each poly-C9 monomer unfolds from a globular soluble form into an extended transmembrane hairpin, a structural transition homologous to perforin pore formation (both share the MACPF domain). The MAC pore allows unregulated influx of water and ions, collapsing the electrochemical gradient and causing osmotic lysis. Sublytic MAC deposition (insufficient pores for lysis) can still trigger pro-inflammatory signalling in target cells, including NF-kappaB activation and cytokine release.',
    },
    {
      type: 'table',
      title: 'IgG Subclass Hierarchy for CDC',
      headers: ['IgG Subclass', 'Residue 331 (EU)', 'C1q Binding', 'CDC Activity', 'Hexamerisation', 'Clinical CDC Example'],
      rows: [
        ['IgG3', 'Pro', '+++++ (highest)', 'Very strong', 'Efficient (long hinge)', 'Rare therapeutic use — short half-life'],
        ['IgG1', 'Pro', '++++', 'Strong', 'Efficient', 'Rituximab, ofatumumab (anti-CD20)'],
        ['IgG2', 'Ala', '++', 'Weak', 'Poor (rigid hinge, disulfide variants)', 'Panitumumab — minimal CDC desired'],
        ['IgG4', 'Ser', '+/−', 'Absent', 'Very poor', 'Pembrolizumab — no CDC by design'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: '7. Galactosylation Impact on C1q Binding',
      color: 'amber',
      content:
        'Terminal galactosylation of the N297 Fc glycan significantly affects C1q binding and CDC activity. The predominant glycoform species on therapeutic mAbs are classified by the number of terminal galactose residues: G0F (no galactose, agalactosylated), G1F (one galactose), and G2F (two galactoses). Increasing galactosylation from G0F to G2F enhances C1q binding and CDC activity by approximately 2-4 fold. The structural mechanism involves the terminal galactose residue on the alpha-1,6-arm of the glycan, which contacts the CH2 domain and stabilises the "open" Fc conformation that is optimal for C1q engagement. Conversely, the G0F glycoform favours a more "closed" Fc conformation with reduced C1q accessibility. Sialylation (addition of sialic acid to terminal galactose) has a more nuanced effect: moderate sialylation maintains or slightly reduces CDC, while high sialylation (as in IVIG) may shift the Fc toward anti-inflammatory properties. In manufacturing, galactosylation is controlled through cell culture conditions: galactose supplementation, manganese addition, and temperature shifts during production phase can increase G1F/G2F content.',
    },
    {
      type: 'table',
      title: 'Complement Regulatory Proteins on Target Cells',
      headers: ['Regulator', 'CD Name', 'Mechanism', 'Pathway Stage Blocked', 'Clinical Relevance'],
      rows: [
        ['CD55 (DAF)', 'CD55', 'Accelerates decay of C3/C5 convertases (C4b2a, C3bBb)', 'C3/C5 convertase', 'Overexpressed on tumours — CDC resistance'],
        ['CD59 (protectin)', 'CD59', 'Binds C8/C9, prevents C9 polymerisation in MAC', 'Terminal pathway (MAC)', 'Major CDC resistance factor — blocks pore formation'],
        ['CD46 (MCP)', 'CD46', 'Cofactor for Factor I — cleaves C3b/C4b', 'C3b/C4b inactivation', 'Broadly expressed, limits C3b opsonisation'],
        ['Factor H', '—', 'Displaces Bb from C3bBb, cofactor for Factor I', 'Alternative pathway amplification', 'Recruited by sialic acid on host cells'],
        ['C1 inhibitor', '—', 'Serpin — irreversibly inactivates C1r, C1s, MASP', 'C1 complex', 'Deficiency: hereditary angioedema'],
        ['C4BP', '—', 'Cofactor for Factor I — cleaves C4b', 'C4b inactivation', 'Limits classical pathway amplification'],
      ],
      sortable: true,
    },
    {
      type: 'bullets',
      title: 'CDC Enhancement Strategies in mAb Engineering',
      items: [
        'HexaBody mutations (E345R, E430G, S440Y): Enhance Fc-Fc contacts to promote IgG hexamerisation on the cell surface, increasing C1q avidity. GEN3009 (HexaBody-DR5/DR5) uses E430G to enable potent CDC against DR5-expressing tumour cells even at low antigen density.',
        'Isotype switching to IgG1 or mixed IgG1/IgG3: IgG3 has the highest CDC activity but poor half-life (7 days vs 21 days for IgG1). IgG1/IgG3 Fc chimeras retain high CDC while maintaining IgG1-like pharmacokinetics.',
        'Complement-enhancing Fc mutations: K326W and E333S mutations in the CH2 domain enhance C1q binding by 2-5 fold, increasing CDC without affecting FcgammaR binding.',
        'Glycoengineering for high galactosylation: Cell culture process control to maintain G1F/G2F >60% enhances C1q binding. Galactose feed supplementation (0.5-5 g/L) during production phase shifts the glycoprofile toward G2F.',
        'Anti-CD55/CD59 combination: Co-administration of antibodies or small molecules that block complement regulatory proteins on tumour cells restores CDC sensitivity in resistant tumours. siRNA knockdown of CD59 enhances rituximab CDC by 5-10 fold in vitro.',
        'Ofatumumab epitope advantage: Ofatumumab binds a membrane-proximal epitope on CD20 (small loop and N-terminal region), positioning the Fc closer to the cell membrane. This proximal binding enhances CDC potency compared to rituximab, which binds the large extracellular loop, positioning Fc further from the membrane.',
      ],
    },
    {
      type: 'callout',
      title: 'CMC Specification — CDC as a CQA',
      variant: 'warning',
      content:
        'For CDC-dependent antibodies (rituximab, ofatumumab, daratumumab), CDC activity is a critical quality attribute requiring: (1) a validated CDC potency assay in the lot-release panel (typically using complement-sensitive cell lines such as WIL2-S or Daudi for anti-CD20, with human serum as complement source), (2) glycosylation specifications that include galactosylation range (G0F/G1F/G2F distribution) given the established impact on C1q binding, (3) comparability assessment of CDC activity for any manufacturing process change, and (4) biosimilar CDC equivalence testing as a Tier 1 analytical attribute. The CDC assay is inherently variable (CV 15-30%) due to lot-to-lot variability in human serum complement activity and cell line passage-dependent expression of complement regulators (CD55, CD59). Baby rabbit complement is sometimes used as an alternative but does not fully replicate human complement biology.',
    },
    {
      type: 'callout',
      title: 'Regulatory Note — Fc Silence for Non-CDC mAbs',
      variant: 'info',
      content:
        'When CDC is undesirable — as with checkpoint inhibitors targeting immune cells (PD-1, CTLA-4) or T cell redirecting bispecifics — the Fc must be engineered for complement silence. The IgG4 subclass naturally lacks CDC due to Ser331 and poor hexamerisation, making it the default choice for anti-PD-1 antibodies. For IgG1-based molecules requiring complement silence, the P329G mutation (disrupting the proline sandwich) or the complete LALA-PG triple mutation (L234A/L235A/P329G) effectively eliminates C1q binding while maintaining FcRn binding for half-life. The CMC characterisation package must include a negative CDC assay confirming the absence of complement activation, using the same assay format that would detect CDC for a wild-type IgG1 — demonstrating absence requires proving the assay is capable of detecting the activity if it were present.',
    },
  ],
  mentorQuestions: [
    'If a manufacturing process change shifted the glycosylation profile from 40% G0F / 45% G1F / 15% G2F to 60% G0F / 30% G1F / 10% G2F for a CDC-dependent anti-CD20 mAb, how would you assess the impact on complement activation and what additional studies would you require?',
    'Why does ofatumumab induce more potent CDC than rituximab despite both targeting CD20, and how does epitope location relative to the cell membrane explain this difference at the molecular level?',
    'How would you design a CMC strategy for a HexaBody-engineered antibody where the primary mechanism is enhanced CDC — what unique CQAs and potency assay considerations arise from the Fc-Fc hexamerisation requirement?',
  ],
};
