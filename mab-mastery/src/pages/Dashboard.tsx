import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Dna, Hexagon, Target, Shield, Wrench, ClipboardCheck,
  Trophy, ArrowRight, BookOpen, GraduationCap, Sparkles,
  BarChart3, CheckCircle2, Layers,
} from 'lucide-react';
import { useProgressStore } from '../store/progressStore';
import ProgressRing from '../components/ui/ProgressRing';
import DarkModeToggle from '../components/ui/DarkModeToggle';
import { SECTIONS, SECTION_MODULES } from '../lib/sections';

const SECTION_ICONS: Record<string, React.ReactNode> = {
  structure:      <Dna size={20} />,
  glycosylation:  <Hexagon size={20} />,
  moa:            <Target size={20} />,
  effector:       <Shield size={20} />,
  engineering:    <Wrench size={20} />,
  cqa:            <ClipboardCheck size={20} />,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.35 } },
};
const item = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] } },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { visitedModules, lastVisited, getTotalProgress, getModuleProgress, getSectionQuizScore, quizScores } = useProgressStore();
  const totalProgress = getTotalProgress();
  const totalCorrect = quizScores.filter((s) => s.correct).length;
  const totalQuizAnswered = quizScores.length;
  const quizPct = totalQuizAnswered > 0 ? Math.round((totalCorrect / totalQuizAnswered) * 100) : 0;
  const sectionsStarted = SECTIONS.filter((s) => getModuleProgress(s.id, s.moduleCount) > 0).length;

  const getLastSection = () => {
    if (!lastVisited) return null;
    const section = SECTIONS.find((s) => lastVisited.startsWith(s.id));
    if (!section) return null;
    const moduleNum = lastVisited.split('-m')[1];
    return { section, moduleId: `m${moduleNum}` };
  };
  const lastSection = getLastSection();

  return (
    <div className="min-h-screen px-5 md:px-8 lg:px-10 py-6 md:py-8 max-w-[1400px] mx-auto">

      {/* ══════════ HERO ══════════ */}
      <div className="relative mb-8 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="aurora-blob aurora-blob-1 absolute -top-24 left-1/4" />
          <div className="aurora-blob aurora-blob-2 absolute -top-12 right-1/5" />
          <div className="aurora-blob aurora-blob-3 absolute top-8 left-1/2 -translate-x-1/2" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative glass rounded-2xl px-7 py-8 md:px-10 md:py-10"
        >
          <div className="flex items-start justify-between mb-6">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.35 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide"
              style={{ background: 'var(--glow-teal)', color: 'var(--color-teal)' }}
            >
              <Sparkles size={12} />
              MONOCLONAL ANTIBODY PLATFORM
            </motion.div>
            <DarkModeToggle />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:gap-10">
            <div className="flex-1 mb-6 lg:mb-0">
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.45 }}
                className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-serif)] leading-[1.06] mb-3"
              >
                <span className="text-[var(--text)]">mAb</span>{' '}
                <span className="gradient-text">Mastery</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.4 }}
                className="text-[var(--text-muted)] text-[15px] md:text-base max-w-lg leading-relaxed"
              >
                Biology, engineering & CMC strategy for monoclonal antibodies.
                {' '}70 modules across 6 disciplines.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.35 }}
                className="mt-5 flex flex-wrap gap-2.5"
              >
                {lastSection ? (
                  <button
                    onClick={() => navigate(`${lastSection.section.basePath}/${lastSection.moduleId}`)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-[13px] text-white transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-teal)]/20 hover:-translate-y-0.5 cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-dark))' }}
                  >
                    <BookOpen size={15} />
                    Continue Learning
                    <ArrowRight size={13} />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/structure/m0')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-[13px] text-white transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-teal)]/20 hover:-translate-y-0.5 cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-dark))' }}
                  >
                    <GraduationCap size={15} />
                    Start Learning
                    <ArrowRight size={13} />
                  </button>
                )}
                <button
                  onClick={() => navigate('/quiz')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-[13px] border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--color-amber)] hover:text-[var(--color-amber)] transition-all duration-300 cursor-pointer"
                >
                  <Trophy size={14} />
                  Take Quiz
                </button>
              </motion.div>
            </div>

            {/* Progress ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center gap-2"
            >
              <div className="glow-ring rounded-full p-1">
                <ProgressRing percentage={totalProgress} size={120} strokeWidth={7} color="#00897b" label="Overall" />
              </div>
              <span className="text-[11px] font-[family-name:var(--font-mono)] text-[var(--text-muted)]">
                {visitedModules.length} / 70 visited
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ══════════ STATS ROW ══════════ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
      >
        {[
          { icon: <Layers size={16} />, value: '70', label: 'Total Modules', color: 'var(--color-teal)' },
          { icon: <CheckCircle2 size={16} />, value: String(visitedModules.length), label: 'Modules Visited', color: 'var(--color-blue)' },
          { icon: <Trophy size={16} />, value: totalQuizAnswered > 0 ? `${quizPct}%` : '—', label: 'Quiz Score', color: 'var(--color-amber)' },
          { icon: <BarChart3 size={16} />, value: `${sectionsStarted} / 6`, label: 'Sections Started', color: 'var(--color-purple)' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3.5 flex items-center gap-3 card-glow"
          >
            <span
              className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
              style={{ backgroundColor: stat.color + '14', color: stat.color }}
            >
              {stat.icon}
            </span>
            <div>
              <div
                className="text-xl font-bold font-[family-name:var(--font-mono)] leading-tight"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-[10.5px] text-[var(--text-muted)] leading-tight mt-0.5">{stat.label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* ══════════ SECTION CARDS ══════════ */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8"
      >
        {SECTIONS.map((section) => {
          const progress = getModuleProgress(section.id, section.moduleCount);
          const quiz = getSectionQuizScore(section.id);
          const topics = (SECTION_MODULES[section.id] || []).slice(0, 4);

          return (
            <motion.div
              key={section.id}
              variants={item}
              onClick={() => navigate(`${section.basePath}/m0`)}
              className="group relative bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden cursor-pointer card-glow"
            >
              {/* Top accent */}
              <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${section.color}, ${section.color}30)` }} />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${section.color}0e, transparent 65%)` }}
              />

              <div className="relative p-5">
                {/* Icon + title */}
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: section.color + '15', color: section.color }}
                  >
                    {SECTION_ICONS[section.id]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--text)] text-[14px] leading-tight mb-0.5 group-hover:text-[var(--color-teal)] transition-colors duration-300">
                      {section.title}
                    </h3>
                    <span className="text-[10.5px] font-[family-name:var(--font-mono)] text-[var(--text-muted)]">
                      {section.moduleCount} modules
                    </span>
                  </div>
                  <ArrowRight
                    size={15}
                    className="text-[var(--text-faint)] group-hover:text-[var(--color-teal)] group-hover:translate-x-1 transition-all duration-300 mt-0.5 shrink-0"
                  />
                </div>

                {/* Topic previews */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {topics.map((topic, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-full font-[family-name:var(--font-mono)]"
                      style={{ backgroundColor: section.color + '10', color: section.color + 'cc' }}
                    >
                      {topic}
                    </span>
                  ))}
                  {section.moduleCount > 4 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-[family-name:var(--font-mono)] bg-[var(--bg-raised)] text-[var(--text-faint)]">
                      +{section.moduleCount - 4} more
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="w-full h-[3px] bg-[var(--bg-raised)] rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: section.color }}
                  />
                </div>

                {/* Stats row */}
                <div className="flex justify-between items-center text-[10.5px] font-[family-name:var(--font-mono)]">
                  <span style={{ color: progress > 0 ? section.color : 'var(--text-faint)' }}>
                    {progress > 0 ? `${progress}% complete` : 'Not started'}
                  </span>
                  {quiz.total > 0 && (
                    <span className="flex items-center gap-1 text-[var(--text-muted)]">
                      <Trophy size={9} style={{ color: 'var(--color-amber)' }} />
                      {quiz.correct}/{quiz.total}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-center text-[10.5px] text-[var(--text-faint)] font-[family-name:var(--font-mono)] tracking-wide py-4"
      >
        mAb Mastery — Built for CMC Strategy Leadership
      </motion.div>
    </div>
  );
}
