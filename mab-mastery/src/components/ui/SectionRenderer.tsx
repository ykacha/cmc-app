import type { ContentSection } from '../../types/content';
import Card from './Card';
import DataTable from './DataTable';
import CodeBlock from './CodeBlock';
import BulletList from './BulletList';
import InfoBox from './InfoBox';
import GlycanDisplay from './GlycanDisplay';
import DecisionTree from './DecisionTree';

interface SectionRendererProps {
  sections: ContentSection[];
}

const TYPE_LABELS: Record<string, string> = {
  card:     'KEY CONCEPT',
  table:    'REFERENCE',
  code:     'FORMULA',
  bullets:  'KEY POINTS',
  glycan:   'GLYCAN',
  decision: 'DECISION',
};

export default function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <div className="space-y-5">
      {sections.map((section, i) => {
        const label = TYPE_LABELS[section.type];

        const wrapper = (children: React.ReactNode) => (
          <div key={i} id={`section-${i}`}>
            {label && section.type !== 'callout' && (
              <p className="text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-[0.16em] text-[var(--text-faint)] mb-2 ml-0.5">
                {label}
              </p>
            )}
            {children}
          </div>
        );

        switch (section.type) {
          case 'card':
            return wrapper(
              <Card title={section.title} color={section.color}>
                <p>{section.content}</p>
              </Card>
            );

          case 'table':
            return wrapper(
              <DataTable
                title={section.title}
                headers={section.headers}
                rows={section.rows}
                sortable={section.sortable}
              />
            );

          case 'code':
            return wrapper(
              <CodeBlock
                title={section.title}
                code={section.code}
                language={section.language}
              />
            );

          case 'bullets':
            return wrapper(
              <BulletList
                title={section.title}
                items={section.items}
                color={section.color}
              />
            );

          case 'callout':
            return (
              <div key={i} id={`section-${i}`}>
                <InfoBox title={section.title} variant={section.variant}>
                  <p>{section.content}</p>
                </InfoBox>
              </div>
            );

          case 'glycan':
            return wrapper(
              <>
                {section.title && (
                  <h4 className="text-sm font-semibold text-[var(--text)] mb-3">
                    {section.title}
                  </h4>
                )}
                <GlycanDisplay glycoforms={section.glycoforms} />
              </>
            );

          case 'decision':
            return wrapper(
              <DecisionTree
                title={section.title}
                nodes={section.nodes}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
