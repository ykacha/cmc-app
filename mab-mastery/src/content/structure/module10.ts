import type { ModuleContent } from '../../types/content';

export const module10: ModuleContent = {
  id: 'structure-m10',
  sectionId: 'structure',
  moduleNumber: 10,
  eyebrow: 'STRUCTURE 11',
  title: 'CH3 Domain',
  lead: 'Three functional surfaces on one domain — FcRn binding for half-life, Protein A for purification, and CH3-CH3 dimerisation for bispecific engineering.',
  tags: [
    { label: 'FcRn', color: 'teal' },
    { label: 'Protein A', color: 'green' },
    { label: 'KiH', color: 'purple' },
  ],
  stats: [
    { label: 'Tm', value: '82-85\u00B0C' },
    { label: 'FcRn Site', value: 'I253/H310/N434' },
    { label: 'ProA Site', value: 'H433/H435' },
    { label: 'KiH', value: 'T366W knob' },
  ],
  sections: [
    {
      type: 'card',
      title: 'CH3 Domain Architecture and Stability',
      color: 'blue',
      content:
        'The CH3 domain (residues 341-447, EU numbering) is the most thermally stable domain of IgG, with melting temperatures typically between 82-85 degrees C for IgG1 as measured by DSC. This exceptional stability derives from the extensive CH3-CH3 homodimer interface, which buries approximately 2000 angstrom-squared of solvent-accessible surface — roughly twice the area of the CH1-CL interface. The intra-domain disulfide bond C367-C425 further stabilises the immunoglobulin fold. CH3 hosts three functionally distinct surface patches that are spatially separated but partially overlapping: (1) the FcRn binding site on the outer face, (2) the Protein A binding site overlapping with FcRn, and (3) the CH3-CH3 homodimer interface on the inner face. The spatial overlap between the FcRn and Protein A sites has profound CMC consequences: mutations that improve FcRn binding for half-life extension can inadvertently alter Protein A chromatography behaviour, and vice versa.',
    },
    {
      type: 'card',
      title: 'FcRn Binding Site — pH-Dependent Histidine Switch',
      color: 'teal',
      content:
        'The neonatal Fc receptor (FcRn) binds IgG at the CH2-CH3 junction through a pH-dependent mechanism that is the primary determinant of serum half-life. The core contact residues are I253 (CH2), H310 (CH2-CH3 linker), H433 (CH3), N434 (CH3), H435 (CH3), and Y436 (CH3). Three histidine residues (H310, H433, H435) serve as the molecular pH switch: at endosomal pH 6.0, these histidines are protonated (pKa ~6.5), creating positive charges that form salt bridges with acidic residues on FcRn (E115, E116, D130 on FcRn alpha-chain). At physiological blood pH 7.4, the histidines are deprotonated (neutral), the salt bridges break, and IgG is released back into circulation. This pH-dependent bind-and-release cycle rescues IgG from lysosomal degradation in endothelial cells, giving IgG1 its ~21-day serum half-life. The FcRn binding site spans both the CH2-CH3 junction and the FcRn beta-2-microglobulin (beta2m) subunit: I253 contacts beta2m directly, while H310/H435 contact the FcRn alpha-chain.',
    },
    {
      type: 'table',
      title: 'FcRn Contact Residues — Detailed Binding Map',
      headers: ['Residue (EU)', 'Domain', 'FcRn Partner', 'pH 6.0 Interaction', 'pH 7.4 Interaction', 'Mutation Impact'],
      rows: [
        ['I253', 'CH2', 'FcRn \u03B22m (I1)', 'Hydrophobic core', 'Hydrophobic core', 'M252Y: adds H-bond to \u03B22m, +4x half-life (YTE)'],
        ['S254', 'CH2', 'FcRn \u03B1 (D130)', 'Weak H-bond', 'No contact', 'S254T: methyl group fills cavity (YTE)'],
        ['T256', 'CH2', 'FcRn \u03B1 (E133)', 'H-bond', 'No contact', 'T256E: salt bridge at pH 6, repulsion at pH 7.4 (YTE)'],
        ['H310', 'CH2-CH3', 'FcRn \u03B1 (E115)', 'Salt bridge (H+ charged)', 'Neutral, no bond', 'H310A: abolishes FcRn binding'],
        ['H433', 'CH3', 'FcRn \u03B1 (E116)', 'Salt bridge (H+ charged)', 'Neutral, no bond', 'H433A: severe FcRn binding loss'],
        ['N434', 'CH3', 'FcRn \u03B1 (N113)', 'H-bond network', 'Weak H-bond', 'N434S: new H-bond to FcRn H166 (LS)'],
        ['H435', 'CH3', 'FcRn \u03B1 (D130)', 'Salt bridge (H+ charged)', 'Neutral, no bond', 'H435R (IgG3): impairs FcRn binding'],
        ['Y436', 'CH3', 'FcRn \u03B1 (hydrophobic)', 'Aromatic packing', 'Reduced affinity', 'Y436F: moderate FcRn reduction'],
        ['M428', 'CH3', 'FcRn \u03B1 (hydrophobic)', 'Hydrophobic packing', 'Weak contact', 'M428L: enhanced packing (LS)'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'YTE Mutation (M252Y/S254T/T256E) — Half-Life Extension',
      color: 'green',
      content:
        'The YTE triple mutation (M252Y/S254T/T256E), developed by MedImmune/AstraZeneca (Dall\'Acqua et al., J Biol Chem 281:23514, 2006), enhances FcRn binding at pH 6.0 by approximately 10-fold while maintaining pH-dependent release at pH 7.4. The molecular mechanisms are: (1) M252Y introduces a tyrosine hydroxyl that forms a new hydrogen bond with FcRn beta2m residue I1, adding ~1.5 kcal/mol binding energy; (2) S254T adds a methyl group that fills a small hydrophobic cavity at the Fc-FcRn interface, contributing van der Waals stabilisation; (3) T256E creates a glutamate that forms a pH-dependent salt bridge with FcRn E133 — at pH 6.0, the local electrostatic environment favours this interaction, but at pH 7.4, electrostatic repulsion between the two glutamates aids release. Clinical data from motavizumab-YTE showed approximately 4-fold half-life extension (70-100 days vs 21 days for wild-type IgG1). CMC considerations include: reduced Protein A binding capacity (30-40% decrease due to proximity to ProA site), lower CH2-CH3 junction Tm (2-3 degrees C reduction), and altered pharmacokinetics requiring longer washout periods in clinical trials.',
    },
    {
      type: 'card',
      title: 'LS Mutation (M428L/N434S) — Alternative Half-Life Extension',
      color: 'teal',
      content:
        'The LS double mutation (M428L/N434S), developed by Xencor (Zalevsky et al., Nature Biotechnol 28:157, 2010), provides an alternative half-life extension approach with approximately 3-fold serum half-life improvement. M428L enhances hydrophobic packing at the FcRn interface by replacing the flexible methionine side chain with the more rigid leucine, creating tighter van der Waals contacts. N434S introduces a smaller serine residue that enables a new hydrogen bond with FcRn histidine H166, stabilising the pH 6.0-bound complex. The LS mutations offer several CMC advantages over YTE: (1) minimal impact on Protein A binding capacity (ProA site overlap is smaller), enabling standard Protein A chromatography conditions; (2) smaller Tm reduction (~1 degree C at the CH2-CH3 junction); (3) preservation of C1q binding and CDC activity (YTE can moderately reduce CDC). Sotrovimab (Xevudy, anti-SARS-CoV-2), approved 2021, carries LS mutations and demonstrated ~2-fold half-life extension in COVID-19 patients. Tixagevimab/cilgavimab (Evusheld) also carries LS mutations, achieving >6-month prophylactic coverage from a single dose.',
    },
    {
      type: 'table',
      title: 'Half-Life Extension Mutations — Head-to-Head Comparison',
      headers: ['Property', 'YTE (M252Y/S254T/T256E)', 'LS (M428L/N434S)', 'YD (M252Y/T307Q/N434Y)', 'Abdeg (M252Y/S254T/T256E/H433K/N434F)'],
      rows: [
        ['FcRn affinity at pH 6.0', '~10-fold enhanced', '~3-5-fold enhanced', '~5-fold enhanced', '~30-fold enhanced'],
        ['pH 7.4 release', 'Maintained', 'Maintained', 'Maintained', 'Slightly impaired'],
        ['Half-life extension', '~4-fold', '~2-3-fold', '~3-fold', '~4-5-fold (risk of accumulation)'],
        ['Protein A impact', '30-40% capacity loss', 'Minimal', 'Moderate', 'Severe (impaired binding)'],
        ['CH2-CH3 Tm impact', '-2-3\u00B0C', '-1\u00B0C', '-2\u00B0C', '-4\u00B0C'],
        ['CDC impact', 'Moderate reduction', 'Preserved', 'Moderate reduction', 'Reduced'],
        ['Clinical validation', 'Motavizumab-YTE', 'Sotrovimab, Evusheld', 'Preclinical', 'Preclinical (Abdeg = pH-independent binder)'],
        ['CMC preferred', 'Moderate complexity', 'Lowest complexity', 'Moderate complexity', 'High complexity'],
      ],
      sortable: true,
    },
    {
      type: 'card',
      title: 'Protein A Binding Site — Purification Implications',
      color: 'green',
      content:
        'Staphylococcal Protein A binds IgG Fc at the CH2-CH3 junction through five immunoglobulin-binding domains (E, D, A, B, C), each ~6 kDa. The primary contact residues on IgG1 CH3 are H433, H435, and Y436, with additional contacts from CH2 residues M252 and I253. The crystal structure of the Protein A B-domain/Fc complex (PDB: 1FC2) reveals that Protein A helix I contacts H435 through a histidine-mediated interaction and helix II contacts I253/M252 through hydrophobic packing. Critical subclass difference: IgG3 carries R435 (arginine) instead of H435, which creates a steric clash with Protein A helix I — this is why IgG3 does not bind standard Protein A resins and requires Protein G or engineered Protein A (e.g., MabSelect SuRe with modified Z-domain that accommodates R435). For manufacturing, Protein A chromatography conditions are: loading at pH 7.0-7.5 (where histidines are neutral and contribute hydrophobic contacts), washing at pH 7.0 with increasing salt (150-500 mM NaCl to remove non-specific binders), and elution at pH 3.0-3.5 (where H433/H435 protonation disrupts binding). Dynamic binding capacity on MabSelect PrismA resin is typically 40-60 g/L at 4-minute residence time.',
    },
    {
      type: 'bullets',
      title: 'Protein A Chromatography — Fc Engineering Interactions',
      color: 'green',
      items: [
        'YTE mutations (M252Y near the ProA site) reduce Protein A dynamic binding capacity by 30-40% at standard residence times. Mitigation: increase residence time to 6-8 minutes, reduce loading density, or switch to MabSelect PrismA (engineered for broader Fc variant binding).',
        'LS mutations (M428L/N434S) have minimal ProA impact because M428 and N434 are on the periphery of the ProA contact surface. Standard ProA conditions are typically adequate without modification.',
        'Knobs-into-holes mutations (T366W, T366S/L368A/Y407V) are on the CH3-CH3 inner face, remote from the ProA site — no impact on ProA purification.',
        'IgG4-based therapeutics: IgG4 binds Protein A via the same H433/H435 contacts as IgG1 and typically shows equivalent binding capacity. The S228P mutation in the hinge has no effect on ProA binding.',
        'Fc-fusion proteins with truncated CH2: if the fusion partner sterically occludes the CH2-CH3 junction, ProA binding may be impaired. ProA binding should be confirmed during early construct screening.',
        'Elution pH optimisation: lower pH (3.0) gives sharper elution peaks but increases hinge clipping risk. Higher pH (3.5-3.8) is gentler but may give broader peaks with lower purity. The optimal pH is molecule-specific and must be determined empirically during process development.',
      ],
    },
    {
      type: 'card',
      title: 'CH3-CH3 Dimer Interface and Knobs-into-Holes',
      color: 'purple',
      content:
        'The CH3-CH3 homodimer interface is the largest protein-protein contact surface in the antibody, burying ~2000 angstrom-squared of solvent-accessible surface area through a combination of hydrophobic core packing and peripheral salt bridges. Key interface residues include L351, T366, L368, K370, D399, Y407, K409, and T411. Knobs-into-holes (KiH) technology, pioneered by Carter and Ridgway (J Mol Biol 270:26, 1997), engineers asymmetric CH3-CH3 interfaces to drive heavy-chain heterodimerisation for bispecific antibodies. The "knob" mutation T366W places a large tryptophan side chain in the interface core, creating a steric protrusion that can only be accommodated by the "hole" mutations T366S/L368A/Y407V on the partner chain. The T366S and Y407V mutations create a cavity that receives the tryptophan indole ring, while L368A removes a leucine that would clash with the knob. KiH achieves approximately 92-95% heterodimerisation efficiency. Residual homodimer contamination (5-8%) can be reduced by adding electrostatic steering mutations: K409D/K392D (knob chain) and D399K/E357K (hole chain) add charge complementarity, pushing heterodimer purity to >99%.',
    },
    {
      type: 'table',
      title: 'CH3 Heterodimerisation Technologies for Bispecifics',
      headers: ['Technology', 'Mutations (Chain A)', 'Mutations (Chain B)', 'Heterodimer %', 'Tm Impact', 'Approved Examples'],
      rows: [
        ['Knobs-into-holes (KiH)', 'T366W', 'T366S/L368A/Y407V', '92-95%', '-3-5\u00B0C', 'Emicizumab, Faricimab'],
        ['KiH + electrostatic', 'T366W/K409D/K392D', 'T366S/L368A/Y407V/D399K/E357K', '>99%', '-5-7\u00B0C', 'Research'],
        ['DuoBody (controlled FAE)', 'F405L', 'K409R', '>95%', '-1-2\u00B0C', 'Epcoritamab, Tecvayli'],
        ['AzyAsymmetric', 'L351Y/F405A/Y407V', 'T366L/K392M/T394W', '>95%', '-4-6\u00B0C', 'Research'],
        ['SEED (strand-exchange)', 'IgA CH3 strands', 'IgG CH3 strands', '>98%', '-8-10\u00B0C', 'Research'],
        ['HA-TF', 'S364H/F405A', 'Y349T/T394F', '>95%', '-3-5\u00B0C', 'Research'],
        ['DD-KK (electrostatic only)', 'K392D/K409D', 'E356K/D399K', '~85%', '-1-2\u00B0C', 'Research'],
      ],
      sortable: true,
    },
    {
      type: 'callout',
      title: 'CMC Challenges with KiH Bispecifics',
      variant: 'warning',
      content:
        'KiH bispecific manufacturing introduces several unique CMC challenges: (1) Homodimer removal — the 5-8% knob-knob and hole-hole homodimers must be separated from the desired heterodimer. Knob-knob homodimer is ~2 kDa heavier due to two tryptophans; hole-hole is ~1 kDa lighter due to three small residue substitutions. HIC (hydrophobic interaction chromatography) is the primary separation method, exploiting the surface hydrophobicity difference between homodimer and heterodimer. CEX at shallow pH gradients can also resolve these species. (2) Asymmetric chain expression — the knob and hole heavy chains may express at different levels in co-transfection or co-infection systems, requiring empirical optimisation of DNA ratios (typically 1.2:0.8 to 1.5:0.5 knob:hole). (3) Stability — the hole chain carries three destabilising mutations (T366S/L368A/Y407V) that reduce CH3 Tm by 10-15 degrees C on the hole homodimer, though the heterodimer Tm is only 3-5 degrees C below wild-type. (4) Analytics — intact mass after IdeS digestion and deglycosylation is the primary heterodimer purity assay; HIC is the orthogonal method.',
    },
    {
      type: 'card',
      title: 'IgG3 CH3 — The R435 Anomaly',
      color: 'amber',
      content:
        'IgG3 is the only human IgG subclass with arginine at position 435 instead of histidine (R435 vs H435 in IgG1/2/4). This single residue change has three major consequences: (1) Impaired Protein A binding — the arginine guanidinium group creates a steric clash with Protein A helix I that prevents the tight helix-packing interaction, reducing binding affinity >100-fold. IgG3 purification requires alternative ligands: Protein G (which binds the CH1-hinge region rather than CH2-CH3), engineered Protein A variants (e.g., the Z-domain in MabSelect SuRe has been further modified to accommodate some IgG3 allotypes), or anti-IgG3 affinity resins. (2) Reduced FcRn binding — R435 disrupts the pH-dependent histidine switch, as arginine remains protonated at both pH 6.0 and 7.4 (pKa ~12.5). This eliminates the pH-dependent release mechanism, paradoxically reducing half-life to ~7 days (compared to ~21 days for IgG1). (3) Allotypic variation — some IgG3 allotypes (G3m16) carry H435 and show normal FcRn binding and half-life, demonstrating that the short IgG3 half-life is solely attributable to R435 and not to the extended hinge.',
    },
    {
      type: 'bullets',
      title: 'CH3 Engineering — Emerging Approaches',
      items: [
        'Abdeg technology (Fc engineered for pH-independent FcRn binding): mutations like M252Y/S254T/T256E/H433K/N434F create high-affinity FcRn binding at both pH 6.0 and 7.4. These molecules act as "sweeping antibodies" that carry target antigen into endosomes via FcRn binding, release the target for lysosomal degradation, then recycle empty. Evinacumab (Evkeeza) uses a similar principle.',
        'Recycling antibodies: engineered pH-dependent antigen binding (histidine scanning of CDRs) combined with enhanced FcRn binding allows each antibody molecule to bind, internalise, release, and rebind antigen multiple times, effectively amplifying the molar potency. Satralizumab (Enspryng, anti-IL-6R) is the first approved recycling antibody.',
        'CH3 as a scaffold for novel binding: the CH3 outer surface can accommodate loop insertions or beta-strand modifications to create dual-function molecules (Fc-antigen binding sites or Fcabs). These require extensive stability and immunogenicity assessment.',
        'Asymmetric FcRn engineering: introducing half-life mutations on only one chain of a bispecific can create monovalent FcRn binding with distinct pharmacokinetic properties — potentially useful for rapid-clearance imaging agents or short-half-life bispecifics.',
      ],
    },
  ],
  mentorQuestions: [
    'Your antibody carries YTE mutations for half-life extension but shows 35% reduced Protein A binding capacity during process development. Design a purification strategy that accommodates this reduced capacity while meeting clinical-scale productivity targets of 100 g/batch.',
    'You are developing a KiH bispecific where HIC fails to resolve the heterodimer from the knob-knob homodimer because their hydrophobicity profiles overlap. What alternative chromatographic or analytical strategies would you pursue to achieve >98% heterodimer purity at manufacturing scale?',
    'Explain why IgG3 has the shortest half-life of all IgG subclasses despite having the highest effector function. How would you engineer an IgG3-derived backbone that retains strong ADCC and CDC while achieving IgG1-like half-life and Protein A-compatible purification?',
  ],
};

export default module10;
