import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ChevronDown, AlignLeft } from 'lucide-react';
import { SECTIONS } from '../../lib/sections';
import NavRow from './NavRow';
import DiagramPanel from '../ui/DiagramPanel';
import type { ModuleContent } from '../../types/content';

interface ModuleLayoutProps {
  module: ModuleContent;
  sectionId: string;
  prevModule: ModuleContent | null;
  nextModule: ModuleContent | null;
  basePath: string;
  children: ReactNode;
}

const TAG_COLORS: Record<string, string> = {
  blue: 'var(--color-blue)',   teal: 'var(--color-teal)',
  amber: 'var(--color-amber)', red: 'var(--color-red)',
  purple: 'var(--color-purple)', green: 'var(--color-green)',
  pink: 'var(--color-pink)',   slate: 'var(--color-slate)',
};

/* ── Mentor questions ── */
function MentorQuestions({ questions, color }: { questions: string[]; color: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden card-glow">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-[var(--sidebar-hover)] transition-colors duration-200 text-left"
      >
        <span
          className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
          style={{ backgroundColor: color + '14' }}
        >
          <MessageCircle size={15} style={{ color }} />
        </span>
        <span className="flex-1">
          <span className="text-sm font-medium text-[var(--text)]">Mentor Questions</span>
          <span className="ml-2 text-[11px] font-[family-name:var(--font-mono)] text-[var(--text-muted)]">
            {questions.length} question{questions.length !== 1 ? 's' : ''}
          </span>
        </span>
        <ChevronDown
          size={14}
          className="text-[var(--text-faint)] transition-transform duration-200"
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <ul className="px-5 pb-5 space-y-3 border-t border-[var(--border)]">
              {questions.map((q, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                  className="flex gap-3 text-sm leading-relaxed text-[var(--text-secondary)] pt-3"
                >
                  <span
                    className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-[family-name:var(--font-mono)] font-bold mt-0.5"
                    style={{ backgroundColor: color + '14', color }}
                  >
                    {i + 1}
                  </span>
                  <span>{q}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── TOC sidebar ── */
function TableOfContents({
  items, color,
}: {
  items: { id: string; title: string; type: string }[];
  color: string;
}) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    const container = document.getElementById('main-scroll');
    if (el && container) {
      container.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
    }
  };

  const typeLabel: Record<string, string> = {
    card: '◆', table: '▤', code: '<>', bullets: '≡',
    callout: '!', glycan: '⬡', decision: '⬡',
  };

  return (
    <div className="sticky top-[57px] px-5 py-6 border-l border-[var(--border)]">
      <div className="flex items-center gap-1.5 mb-4">
        <AlignLeft size={11} style={{ color: 'var(--text-faint)' }} />
        <span className="text-[9.5px] font-[family-name:var(--font-mono)] uppercase tracking-[0.14em] text-[var(--text-faint)]">
          On this page
        </span>
      </div>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollTo(item.id)}
              className="w-full text-left flex items-start gap-2 py-1 px-2 rounded-md hover:bg-[var(--sidebar-hover)] transition-colors duration-150 group cursor-pointer"
            >
              <span
                className="text-[9px] font-[family-name:var(--font-mono)] mt-[3px] shrink-0 opacity-40 group-hover:opacity-70"
                style={{ color }}
              >
                {typeLabel[item.type] ?? '·'}
              </span>
              <span className="text-[12px] leading-[1.45] text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors duration-150">
                {item.title}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── ModuleLayout ── */
export function ModuleLayout({ module, sectionId, prevModule, nextModule, basePath, children }: ModuleLayoutProps) {
  const section = SECTIONS.find((s) => s.id === sectionId);
  const color = section?.color ?? 'var(--color-teal)';

  const prevNav = prevModule ? { moduleNumber: prevModule.moduleNumber, title: prevModule.title } : null;
  const nextNav = nextModule ? { moduleNumber: nextModule.moduleNumber, title: nextModule.title } : null;

  const tocItems = module.sections
    .filter((s) => s.title)
    .map((s, i) => ({ id: `section-${i}`, title: s.title, type: s.type }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Header block — full width */}
      <div className="px-6 md:px-10 xl:px-14 pt-10 pb-8">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08, duration: 0.3 }}
          className="text-[10.5px] font-[family-name:var(--font-mono)] uppercase tracking-[0.16em] mb-2"
          style={{ color }}
        >
          {module.eyebrow}
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.13, duration: 0.35 }}
          className="text-3xl md:text-4xl lg:text-[2.6rem] font-[family-name:var(--font-serif)] font-bold leading-[1.1] mb-4 text-[var(--text)]"
        >
          {module.title}
        </motion.h1>

        {/* Lead */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18, duration: 0.35 }}
          className="text-base md:text-lg leading-relaxed mb-5 text-[var(--text-secondary)] max-w-3xl"
        >
          {module.lead}
        </motion.p>

        {/* Tags */}
        {module.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22, duration: 0.3 }}
            className="flex flex-wrap gap-1.5 mb-6"
          >
            {module.tags.map((tag) => {
              const c = TAG_COLORS[tag.color] ?? 'var(--color-slate)';
              return (
                <span
                  key={tag.label}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-[family-name:var(--font-mono)] font-medium"
                  style={{ backgroundColor: c + '14', color: c }}
                >
                  {tag.label}
                </span>
              );
            })}
          </motion.div>
        )}

        {/* Stats grid */}
        {module.stats && module.stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.35 }}
            className="inline-grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] card-glow mb-2"
          >
            {module.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.22 }}
                className="text-center px-3 py-2"
              >
                {stat.icon && <span className="block text-lg mb-1">{stat.icon}</span>}
                <span
                  className="block text-lg md:text-xl font-bold font-[family-name:var(--font-mono)]"
                  style={{ color }}
                >
                  {stat.value}
                </span>
                <span className="block text-[9.5px] uppercase tracking-wider mt-0.5 text-[var(--text-muted)]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Separator */}
        <div
          className="w-10 h-[2px] rounded-full mt-8"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}28)` }}
        />
      </div>

      {/* 2-column: content + TOC */}
      <div className="xl:grid xl:grid-cols-[1fr_260px]">
        {/* Main content */}
        <article className="px-6 md:px-10 xl:px-14 pb-16 min-w-0">
          <DiagramPanel moduleId={module.id} />
          <div className="space-y-5">{children}</div>

          {module.mentorQuestions && module.mentorQuestions.length > 0 && (
            <MentorQuestions questions={module.mentorQuestions} color={color} />
          )}

          <NavRow prevModule={prevNav} nextModule={nextNav} sectionId={sectionId} basePath={basePath} />
        </article>

        {/* Sticky TOC */}
        {tocItems.length > 2 && (
          <aside className="hidden xl:block">
            <TableOfContents items={tocItems} color={color} />
          </aside>
        )}
      </div>
    </motion.div>
  );
}
