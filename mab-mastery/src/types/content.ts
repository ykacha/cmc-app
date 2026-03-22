export interface Tag {
  label: string;
  color: 'blue' | 'teal' | 'amber' | 'red' | 'purple' | 'green' | 'pink' | 'slate';
}

export interface Stat {
  label: string;
  value: string;
  icon?: string;
}

export interface TableRow {
  [key: string]: string | number;
}

export interface CardSection {
  type: 'card';
  title: string;
  color?: 'blue' | 'teal' | 'amber' | 'red' | 'purple' | 'green' | 'pink';
  content: string;
}

export interface TableSection {
  type: 'table';
  title: string;
  headers: string[];
  rows: (string | number)[][];
  sortable?: boolean;
}

export interface CodeSection {
  type: 'code';
  title: string;
  language?: string;
  code: string;
}

export interface BulletSection {
  type: 'bullets';
  title: string;
  color?: string;
  items: string[];
}

export interface CalloutSection {
  type: 'callout';
  title: string;
  variant: 'info' | 'warning' | 'success' | 'danger';
  content: string;
}

export interface GlycanSection {
  type: 'glycan';
  title: string;
  glycoforms: GlycoformData[];
}

export interface DecisionSection {
  type: 'decision';
  title: string;
  nodes: DecisionNode[];
}

export interface DecisionNode {
  id: string;
  question: string;
  yes?: string;
  no?: string;
  result?: string;
}

export interface GlycoformData {
  name: string;
  notation: string;
  description: string;
  abundance?: string;
  impact?: string;
}

export type ContentSection =
  | CardSection
  | TableSection
  | CodeSection
  | BulletSection
  | CalloutSection
  | GlycanSection
  | DecisionSection;

export interface ModuleContent {
  id: string;
  sectionId: string;
  moduleNumber: number;
  eyebrow: string;
  title: string;
  lead: string;
  tags: Tag[];
  stats?: Stat[];
  sections: ContentSection[];
  mentorQuestions?: string[];
}

export interface QuizQuestion {
  id: string;
  sectionId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'medium' | 'hard' | 'expert';
}

export interface SectionMeta {
  id: string;
  title: string;
  icon: string;
  color: string;
  basePath: string;
  moduleCount: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
