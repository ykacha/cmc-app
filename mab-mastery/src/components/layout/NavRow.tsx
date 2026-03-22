import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SECTIONS, SECTION_MODULES, modulePath } from '../../lib/sections';

interface NavModule { moduleNumber: number; title: string; }
interface NavRowProps {
  prevModule: NavModule | null;
  nextModule: NavModule | null;
  sectionId: string;
  basePath: string;
}

export default function NavRow({ prevModule, nextModule, sectionId, basePath }: NavRowProps) {
  const navigate = useNavigate();
  const section = SECTIONS.find((s) => s.id === sectionId);
  const color = section?.color ?? 'var(--color-teal)';
  const modules = SECTION_MODULES[sectionId] ?? [];

  return (
    <motion.nav
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      className="flex items-stretch gap-3 mt-12 mb-6 pt-8 border-t border-[var(--border)]"
    >
      {/* Previous */}
      <div className="flex-1 min-w-0">
        {prevModule && (
          <button
            onClick={() => navigate(modulePath(basePath, prevModule.moduleNumber))}
            className="group w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--text-faint)] transition-all duration-250 cursor-pointer text-left card-glow"
          >
            <span
              className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
              style={{ backgroundColor: color + '12' }}
            >
              <ChevronLeft
                size={16}
                style={{ color }}
                className="group-hover:-translate-x-0.5 transition-transform duration-200"
              />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--text-muted)]">
                Previous
              </span>
              <span className="block text-sm font-medium truncate text-[var(--text)]">
                {prevModule.title}
              </span>
            </span>
          </button>
        )}
      </div>

      {/* Module counter */}
      <div
        className="hidden sm:flex items-center px-2 text-[11px] font-[family-name:var(--font-mono)] text-[var(--text-faint)]"
      >
        {prevModule ? prevModule.moduleNumber + 1 : nextModule ? nextModule.moduleNumber - 1 : 1}
        <span className="mx-1">/</span>
        {modules.length}
      </div>

      {/* Next */}
      <div className="flex-1 min-w-0">
        {nextModule && (
          <button
            onClick={() => navigate(modulePath(basePath, nextModule.moduleNumber))}
            className="group w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--text-faint)] transition-all duration-250 cursor-pointer text-right card-glow"
          >
            <span className="flex-1 min-w-0">
              <span className="block text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--text-muted)]">
                Next
              </span>
              <span className="block text-sm font-medium truncate text-[var(--text)]">
                {nextModule.title}
              </span>
            </span>
            <span
              className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
              style={{ backgroundColor: color + '12' }}
            >
              <ChevronRight
                size={16}
                style={{ color }}
                className="group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </span>
          </button>
        )}
      </div>
    </motion.nav>
  );
}
