import type { SectionMeta } from '../types/content';

export const SECTIONS: SectionMeta[] = [
  {
    id: 'structure',
    title: 'mAb Structure',
    icon: 'Dna',
    color: '#1976d2',
    basePath: '/structure',
    moduleCount: 14,
  },
  {
    id: 'glycosylation',
    title: 'Glycosylation',
    icon: 'Hexagon',
    color: '#00796b',
    basePath: '/glycosylation',
    moduleCount: 16,
  },
  {
    id: 'moa',
    title: 'Mechanisms of Action',
    icon: 'Target',
    color: '#ef4444',
    basePath: '/moa',
    moduleCount: 12,
  },
  {
    id: 'effector',
    title: 'Fc Effector Functions',
    icon: 'Shield',
    color: '#8b5cf6',
    basePath: '/effector',
    moduleCount: 8,
  },
  {
    id: 'engineering',
    title: 'Fc Engineering',
    icon: 'Wrench',
    color: '#f59e0b',
    basePath: '/engineering',
    moduleCount: 10,
  },
  {
    id: 'cqa',
    title: 'CQAs & CMC',
    icon: 'ClipboardCheck',
    color: '#10b981',
    basePath: '/cqa',
    moduleCount: 10,
  },
];

export const SECTION_MODULES: Record<string, string[]> = {
  structure: [
    'Overview & EU Numbering',
    'Immunoglobulin Fold',
    'Chain Architecture',
    'CDR Loops',
    'Numbering Schemes',
    'VH-VL Interface',
    'Developability Liabilities',
    'CH1-CL Interface',
    'Hinge Region',
    'CH2 Domain',
    'CH3 Domain',
    'Disulfide Bond Atlas',
    'Asn297 Glycan Site',
    'Structure-CQA Mapping',
  ],
  glycosylation: [
    'Why Glycans Matter',
    'Nomenclature',
    'ER Biosynthesis',
    'Golgi Processing',
    'Fucosylation & ADCC',
    'Galactosylation & CDC',
    'High-Mannose & PK',
    'Sialylation',
    'Non-Glycosylated HC',
    'Bisecting GlcNAc',
    'CPP-Glycan CQA Map',
    'Glycoengineering',
    'Fab Glycosylation',
    'Analytical Methods',
    'Glycan Specifications',
    'QTPP Decision Map',
  ],
  moa: [
    'Direct Neutralisation',
    'ADCC Mechanism',
    'ADCP Mechanism',
    'CDC Mechanism',
    'Receptor Downregulation',
    'ADC Biology',
    'T Cell Redirection',
    'Agonist Antibodies',
    'Receptor Crosslinking',
    'Bispecific Formats',
    'Bispecific CMC',
    'MoA-CQA Integration',
  ],
  effector: [
    'FcyR Family',
    'ADCC Molecular Detail',
    'ADCP Pathway',
    'CDC Classical Pathway',
    'FcRn Recycling',
    'FcRn Engineering',
    'Aggregate Clearance',
    'Effector Summary',
  ],
  engineering: [
    'LALA Mutation',
    'LALA-PG Mutation',
    'GASDALIE Mutations',
    'DE Mutations',
    'S228P IgG4',
    'YTE Half-Life',
    'LS Mutation',
    'XTEND Technology',
    'Afucosylation',
    'Combination Strategies',
  ],
  cqa: [
    'CQA Framework',
    'Risk Ranking',
    'Size Variants',
    'Charge Variants',
    'Glycosylation CQAs',
    'Oxidation',
    'Process Impurities',
    'Analytical Toolbox',
    'Control Strategy',
    'Worked Example',
  ],
};

/** Build a module id from section id and 0-based module number */
export function moduleId(sectionId: string, moduleNumber: number): string {
  return `${sectionId}-m${moduleNumber}`;
}

/** Build the route path for a module */
export function modulePath(basePath: string, moduleNumber: number): string {
  return `${basePath}/m${moduleNumber}`;
}
