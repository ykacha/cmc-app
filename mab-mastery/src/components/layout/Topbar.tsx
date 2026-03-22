import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sun, Moon, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTIONS } from '../../lib/sections';
import { useProgressStore } from '../../store/progressStore';
import type { ModuleContent } from '../../types/content';

interface TopbarProps {
  currentModule: ModuleContent | null;
  sectionId: string;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useProgressStore();
  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[var(--sidebar-hover)] transition-all duration-200 cursor-pointer"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={darkMode ? 'dark' : 'light'}
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 30, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {darkMode
            ? <Sun size={15} style={{ color: 'var(--text-muted)' }} />
            : <Moon size={15} style={{ color: 'var(--text-muted)' }} />
          }
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Topbar({ currentModule, sectionId, onPrev, onNext, hasPrev, hasNext }: TopbarProps) {
  const navigate = useNavigate();
  const { toggleSidebar } = useProgressStore();
  const [readProgress, setReadProgress] = useState(0);
  const section = SECTIONS.find((s) => s.id === sectionId);

  useEffect(() => {
    const el = document.getElementById('main-scroll');
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const max = scrollHeight - clientHeight;
      setReadProgress(max > 0 ? Math.round((scrollTop / max) * 100) : 0);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-30 h-14 border-b border-[var(--border)] backdrop-blur-xl relative overflow-hidden"
      style={{ backgroundColor: 'var(--topbar-bg)' }}
    >
      {/* Section color left stripe */}
      {section && (
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{ backgroundColor: section.color }}
        />
      )}

      <div className="flex items-center h-full px-3 md:px-5 gap-2 pl-4 md:pl-5">
        {/* Sidebar toggle — desktop */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[var(--sidebar-hover)] text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-all duration-200 shrink-0 cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <Menu size={16} />
        </button>

        {/* Module info */}
        <div className="flex-1 min-w-0 ml-8 md:ml-0">
          {currentModule ? (
            <div className="flex items-center gap-2">
              {section && (
                <span
                  className="hidden sm:inline-block w-1 h-5 rounded-full shrink-0"
                  style={{ backgroundColor: section.color + '60' }}
                />
              )}
              <div className="min-w-0">
                <p
                  className="text-[9.5px] font-[family-name:var(--font-mono)] uppercase tracking-[0.14em] leading-tight"
                  style={{ color: section?.color ?? 'var(--text-muted)' }}
                >
                  {currentModule.eyebrow}
                </p>
                <p className="text-[13px] font-medium truncate leading-tight text-[var(--text)]">
                  {currentModule.title}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span
                className="hidden sm:inline-block w-1 h-5 rounded-full shrink-0"
                style={{ backgroundColor: 'var(--color-amber)60' }}
              />
              <p className="text-[13px] font-medium text-[var(--text)]">
                {section?.title ?? 'Knowledge Quiz'}
              </p>
            </div>
          )}
        </div>

        {/* Breadcrumb — large screens */}
        <nav className="hidden lg:flex items-center gap-1 text-[11px] shrink-0">
          <button
            onClick={() => navigate('/')}
            className="px-2 py-1 rounded-md transition-colors duration-150 hover:bg-[var(--sidebar-hover)] cursor-pointer text-[var(--text-muted)]"
          >
            Home
          </button>
          {section && (
            <>
              <span className="text-[var(--text-faint)]">/</span>
              <button
                onClick={() => navigate(section.basePath + '/m0')}
                className="px-2 py-1 rounded-md transition-colors duration-150 hover:bg-[var(--sidebar-hover)] cursor-pointer text-[var(--text-muted)]"
              >
                {section.title}
              </button>
            </>
          )}
          {currentModule && (
            <>
              <span className="text-[var(--text-faint)]">/</span>
              <span className="px-2 py-1 font-medium text-[var(--text-secondary)]">
                {currentModule.moduleNumber + 1}
              </span>
            </>
          )}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Module counter */}
          {currentModule && section && (
            <span
              className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-[family-name:var(--font-mono)] tabular-nums"
              style={{ backgroundColor: section.color + '14', color: section.color }}
            >
              {currentModule.moduleNumber + 1} / {section.moduleCount}
            </span>
          )}

          <div className="w-px h-4 mx-0.5 bg-[var(--border)]" />

          {/* Prev */}
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-150 cursor-pointer hover:bg-[var(--sidebar-hover)] disabled:opacity-25 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <ChevronLeft size={15} style={{ color: 'var(--text-muted)' }} />
          </button>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className="flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-150 cursor-pointer hover:bg-[var(--sidebar-hover)] disabled:opacity-25 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <ChevronRight size={15} style={{ color: 'var(--text-muted)' }} />
          </button>

          <div className="w-px h-4 mx-0.5 bg-[var(--border)]" />
          <DarkModeToggle />
        </div>
      </div>

      {/* Reading progress bar */}
      {currentModule && (
        <div
          className="reading-progress-bar"
          style={{ width: `${readProgress}%` }}
        />
      )}
    </header>
  );
}
