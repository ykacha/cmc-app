import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, ChevronLeft, ChevronRight,
  Trophy, Menu, X,
  Dna, Hexagon, Target, Shield, Wrench, ClipboardCheck, LayoutDashboard,
  type LucideIcon,
} from 'lucide-react';
import { SECTIONS, SECTION_MODULES } from '../../lib/sections';
import { useProgressStore } from '../../store/progressStore';

const ICONS: Record<string, LucideIcon> = {
  structure:     Dna,
  glycosylation: Hexagon,
  moa:           Target,
  effector:      Shield,
  engineering:   Wrench,
  cqa:           ClipboardCheck,
};

/* ── Collapsed rail icon button ── */
function RailButton({
  icon: Icon, color, active, tooltip, onClick,
}: {
  icon: LucideIcon; color: string; active: boolean; tooltip: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      data-tooltip={tooltip}
      className="tooltip-right relative w-full h-11 flex items-center justify-center transition-all duration-150 cursor-pointer"
      style={{
        borderLeft: active ? `3px solid ${color}` : '3px solid transparent',
        backgroundColor: active ? color + '1a' : 'transparent',
        color: active ? color : 'var(--text-faint)',
      }}
      onMouseEnter={(e) => {
        if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--sidebar-hover)';
      }}
      onMouseLeave={(e) => {
        if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
      }}
    >
      <Icon size={17} />
    </button>
  );
}

/* ── Section accordion group (expanded sidebar) ── */
function SectionGroup({
  section, modules, isActive, onNavigate,
}: {
  section: typeof SECTIONS[0];
  modules: string[];
  isActive: boolean;
  onNavigate: (path: string) => void;
}) {
  const [open, setOpen] = useState(isActive);
  const location = useLocation();
  const { visitedModules, getModuleProgress } = useProgressStore();
  const progress = getModuleProgress(section.id, section.moduleCount);
  const Icon = ICONS[section.id];

  return (
    <div className="mb-0.5">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all duration-200 hover:bg-[var(--sidebar-hover)] group cursor-pointer"
      >
        <span
          className="flex items-center justify-center w-6 h-6 rounded-md shrink-0"
          style={{ backgroundColor: section.color + '18', color: section.color }}
        >
          {Icon && <Icon size={13} />}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-[12.5px] font-medium text-[var(--text)] truncate leading-tight">
            {section.title}
          </span>
          <span className="block mt-[3px] h-[2px] w-full rounded-full bg-[var(--bg-raised)] overflow-hidden">
            <span
              className="block h-full rounded-full transition-all duration-700"
              style={{ width: `${progress}%`, backgroundColor: section.color }}
            />
          </span>
        </span>
        <ChevronDown
          size={12}
          className="text-[var(--text-faint)] transition-transform duration-200 shrink-0"
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="ml-[19px] pl-3 border-l border-[var(--border)] py-1 space-y-0.5">
              {modules.map((title, i) => {
                const moduleId = `${section.id}-m${i}`;
                const path = `${section.basePath}/m${i}`;
                const visited = visitedModules.includes(moduleId);
                const active = location.pathname === path;
                return (
                  <button
                    key={i}
                    onClick={() => onNavigate(path)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-all duration-150 cursor-pointer ${
                      active ? 'bg-[var(--sidebar-active)]' : 'hover:bg-[var(--sidebar-hover)]'
                    }`}
                  >
                    <span
                      className="w-[5px] h-[5px] rounded-full shrink-0 transition-all duration-200"
                      style={
                        active
                          ? { backgroundColor: section.color, boxShadow: `0 0 5px ${section.color}70` }
                          : visited
                            ? { backgroundColor: section.color + '90' }
                            : { border: '1.5px solid var(--border)' }
                      }
                    />
                    <span
                      className="text-[11.5px] leading-snug truncate transition-colors duration-150"
                      style={{ color: active ? section.color : 'var(--text-muted)' }}
                    >
                      {title}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Sidebar ── */
export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clipping, setClipping] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalProgress, sidebarOpen, toggleSidebar } = useProgressStore();
  const totalProgress = getTotalProgress();

  const activeSectionId = SECTIONS.find((s) => location.pathname.startsWith(s.basePath))?.id ?? '';

  const handleNav = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleToggle = () => {
    setClipping(true);
    toggleSidebar();
    setTimeout(() => setClipping(false), 300);
  };

  /* ── Collapsed icon rail ── */
  const rail = (
    <div className="flex flex-col h-full">
      {/* Home */}
      <div className="border-b border-[var(--border)] py-1.5">
        <RailButton
          icon={LayoutDashboard}
          color="var(--color-teal)"
          active={location.pathname === '/'}
          tooltip="Dashboard"
          onClick={() => handleNav('/')}
        />
      </div>

      {/* Section icons */}
      <nav className="flex-1 py-1.5 overflow-y-auto scrollbar-none">
        {SECTIONS.map((section) => {
          const Icon = ICONS[section.id];
          return (
            <RailButton
              key={section.id}
              icon={Icon}
              color={section.color}
              active={section.id === activeSectionId}
              tooltip={section.title}
              onClick={() => handleNav(`${section.basePath}/m0`)}
            />
          );
        })}
      </nav>

      {/* Quiz + expand */}
      <div className="border-t border-[var(--border)] py-1.5">
        <RailButton
          icon={Trophy}
          color="var(--color-amber)"
          active={location.pathname.startsWith('/quiz')}
          tooltip="Knowledge Quiz"
          onClick={() => handleNav('/quiz')}
        />
        <button
          onClick={handleToggle}
          data-tooltip="Expand sidebar"
          className="tooltip-right w-full h-9 flex items-center justify-center text-[var(--text-faint)] hover:text-[var(--text-muted)] hover:bg-[var(--sidebar-hover)] transition-all duration-200 cursor-pointer"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );

  /* ── Expanded panel ── */
  const expanded = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.12, duration: 0.18 }}
      className="flex flex-col h-full"
    >
      {/* Logo + progress */}
      <div className="px-3.5 pt-4 pb-3.5 border-b border-[var(--border)]">
        <div className="flex items-center justify-between mb-2.5">
          <button onClick={() => handleNav('/')} className="flex items-baseline gap-0.5 group cursor-pointer">
            <span className="text-[19px] font-[family-name:var(--font-serif)] font-bold text-[var(--color-teal)] group-hover:opacity-80 transition-opacity">
              mAb
            </span>
            <span className="text-[19px] font-[family-name:var(--font-serif)] font-light text-[var(--text)]">
              Mastery
            </span>
          </button>
          <button
            onClick={handleToggle}
            className="w-6 h-6 flex items-center justify-center rounded-md text-[var(--text-faint)] hover:text-[var(--text-muted)] hover:bg-[var(--sidebar-hover)] transition-all duration-200 cursor-pointer"
          >
            <ChevronLeft size={14} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-[3px] rounded-full bg-[var(--bg-raised)] overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--color-teal), var(--color-blue))' }}
              initial={{ width: 0 }}
              animate={{ width: `${totalProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <span className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--text-muted)] tabular-nums">
            {totalProgress}%
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 py-2 space-y-0.5">
        {SECTIONS.map((section) => (
          <SectionGroup
            key={section.id}
            section={section}
            modules={SECTION_MODULES[section.id] || []}
            isActive={section.id === activeSectionId}
            onNavigate={handleNav}
          />
        ))}
      </nav>

      {/* Quiz button */}
      <div className="px-3 py-2.5 border-t border-[var(--border)]">
        <button
          onClick={() => handleNav('/quiz')}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
            location.pathname.startsWith('/quiz')
              ? 'border border-[var(--color-amber)]/25'
              : 'hover:bg-[var(--sidebar-hover)] border border-transparent'
          }`}
          style={location.pathname.startsWith('/quiz') ? { backgroundColor: 'rgba(245,158,11,0.08)' } : undefined}
        >
          <span
            className="flex items-center justify-center w-6 h-6 rounded-md"
            style={{ backgroundColor: 'rgba(245,158,11,0.14)', color: 'var(--color-amber)' }}
          >
            <Trophy size={13} />
          </span>
          <span className="text-[12.5px] font-medium text-[var(--text)]">Knowledge Quiz</span>
        </button>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-[18px] left-4 z-50 md:hidden w-8 h-8 rounded-lg glass flex items-center justify-center text-[var(--text-muted)] cursor-pointer"
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex fixed top-0 left-0 bottom-0 z-40 flex-col bg-[var(--rail-bg)] border-r border-[var(--border)] sidebar-transition ${
          clipping ? 'overflow-hidden' : 'overflow-visible'
        }`}
        style={{ width: sidebarOpen ? '280px' : '56px' }}
      >
        {sidebarOpen ? expanded : rail}
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 left-0 bottom-0 w-[280px] z-50 flex flex-col bg-[var(--sidebar-bg)] border-r border-[var(--border)] md:hidden overflow-hidden"
            >
              {expanded}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
