import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RotateCcw, ArrowLeft, Filter } from 'lucide-react';
import { useProgressStore } from '../store/progressStore';
import QuizCard from '../components/ui/QuizCard';
import { Topbar } from '../components/layout/Topbar';
import { SECTIONS } from '../lib/sections';
import { quizQuestions } from '../content/quiz';

export default function QuizPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const navigate = useNavigate();
  const { quizScores, addQuizScore, resetQuizScores } = useProgressStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterSection, setFilterSection] = useState<string | null>(sectionId || null);
  const [showMissedOnly, setShowMissedOnly] = useState(false);

  const filteredQuestions = useMemo(() => {
    let qs = quizQuestions;
    if (filterSection) qs = qs.filter((q) => q.sectionId === filterSection);
    if (showMissedOnly) {
      const missed = quizScores.filter((s) => !s.correct).map((s) => s.questionId);
      qs = qs.filter((q) => missed.includes(q.id));
    }
    return qs;
  }, [filterSection, showMissedOnly, quizScores]);

  const currentQuestion = filteredQuestions[currentIndex] || null;

  const answered = useMemo(() => {
    if (!currentQuestion) return null;
    const score = quizScores.find((s) => s.questionId === currentQuestion.id);
    return score ? score.selectedIndex : null;
  }, [currentQuestion, quizScores]);

  const totalAnswered = quizScores.length;
  const totalCorrect = quizScores.filter((s) => s.correct).length;
  const percentage = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const correctPct = totalAnswered > 0 ? (totalCorrect / totalAnswered) * 100 : 0;
  const incorrectPct = totalAnswered > 0 ? ((totalAnswered - totalCorrect) / totalAnswered) * 100 : 0;

  const handleAnswer = (index: number) => {
    if (!currentQuestion) return;
    addQuizScore({
      sectionId: currentQuestion.sectionId,
      questionId: currentQuestion.id,
      correct: index === currentQuestion.correctIndex,
      selectedIndex: index,
    });
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) setCurrentIndex(currentIndex + 1);
  };
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="min-h-screen">
      <Topbar
        currentModule={null}
        sectionId="quiz"
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex < filteredQuestions.length - 1}
      />

      <div className="max-w-2xl mx-auto px-5 md:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-7"
        >
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg hover:bg-[var(--bg-raised)] text-[var(--text-muted)] transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-[family-name:var(--font-serif)] text-[var(--text)]">
              Knowledge Quiz
            </h1>
            <p className="text-[var(--text-muted)] text-[12.5px] mt-0.5 font-[family-name:var(--font-mono)]">
              {filteredQuestions.length} questions
              {filterSection && ` · ${SECTIONS.find((s) => s.id === filterSection)?.title}`}
            </p>
          </div>
          {/* Score badge */}
          {totalAnswered > 0 && (
            <div
              className="flex flex-col items-center px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]"
              style={{ borderColor: percentage >= 70 ? 'var(--color-green)30' : 'var(--color-amber)30' }}
            >
              <span
                className="text-2xl font-bold font-[family-name:var(--font-mono)]"
                style={{ color: percentage >= 70 ? 'var(--color-green)' : 'var(--color-amber)' }}
              >
                {percentage}%
              </span>
              <span className="text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--text-faint)]">
                Score
              </span>
            </div>
          )}
        </motion.div>

        {/* Score breakdown bar */}
        {totalAnswered > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex h-2 rounded-full overflow-hidden bg-[var(--bg-raised)] mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${correctPct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-l-full"
                style={{ backgroundColor: 'var(--color-green)' }}
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${incorrectPct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                className="h-full"
                style={{ backgroundColor: 'var(--color-red)' }}
              />
            </div>
            <div className="flex items-center gap-4 text-[10.5px] font-[family-name:var(--font-mono)] text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: 'var(--color-green)' }} />
                {totalCorrect} correct
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: 'var(--color-red)' }} />
                {totalAnswered - totalCorrect} incorrect
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full inline-block bg-[var(--bg-raised)]" />
                {filteredQuestions.length - totalAnswered < 0 ? 0 : filteredQuestions.length - totalAnswered} remaining
              </span>
              <button
                onClick={() => { resetQuizScores(filterSection || undefined); setCurrentIndex(0); }}
                className="ml-auto flex items-center gap-1 text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors cursor-pointer"
              >
                <RotateCcw size={11} />
                Reset
              </button>
            </div>
          </motion.div>
        )}

        {/* Question progress dots */}
        {filteredQuestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-1.5 mb-6 p-3 bg-[var(--bg-card)] rounded-xl border border-[var(--border)]"
          >
            {filteredQuestions.map((q, i) => {
              const score = quizScores.find((s) => s.questionId === q.id);
              const isCurrent = i === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(i)}
                  className="rounded-full transition-all duration-200 cursor-pointer"
                  style={{
                    width: isCurrent ? '20px' : '8px',
                    height: '8px',
                    backgroundColor: isCurrent
                      ? (SECTIONS.find((s) => s.id === q.sectionId)?.color ?? 'var(--color-teal)')
                      : score
                        ? score.correct
                          ? 'var(--color-green)'
                          : 'var(--color-red)'
                        : 'var(--bg-raised)',
                    boxShadow: isCurrent
                      ? `0 0 8px ${(SECTIONS.find((s) => s.id === q.sectionId)?.color ?? 'var(--color-teal)')}60`
                      : 'none',
                  }}
                  aria-label={`Question ${i + 1}`}
                />
              );
            })}
          </motion.div>
        )}

        {/* Section filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08 }}
          className="flex flex-wrap gap-1.5 mb-6"
        >
          <button
            onClick={() => { setFilterSection(null); setCurrentIndex(0); }}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors cursor-pointer ${
              !filterSection
                ? 'bg-[var(--color-teal)] text-white'
                : 'bg-[var(--bg-raised)] text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            All
          </button>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => { setFilterSection(s.id); setCurrentIndex(0); }}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors cursor-pointer ${
                filterSection === s.id
                  ? 'text-white'
                  : 'bg-[var(--bg-raised)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
              style={filterSection === s.id ? { backgroundColor: s.color } : undefined}
            >
              {s.title}
            </button>
          ))}
          <button
            onClick={() => { setShowMissedOnly(!showMissedOnly); setCurrentIndex(0); }}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              showMissedOnly
                ? 'bg-[var(--color-red)] text-white'
                : 'bg-[var(--bg-raised)] text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            <Filter size={12} />
            Missed
          </button>
        </motion.div>

        {/* Question card */}
        {currentQuestion ? (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="text-[10px] font-[family-name:var(--font-mono)] tracking-wider text-[var(--text-muted)] mb-3 flex items-center gap-2">
              <span>QUESTION {currentIndex + 1} OF {filteredQuestions.length}</span>
              <span
                className="px-1.5 py-0.5 rounded text-[9px]"
                style={{
                  backgroundColor: SECTIONS.find((s) => s.id === currentQuestion.sectionId)?.color + '14',
                  color: SECTIONS.find((s) => s.id === currentQuestion.sectionId)?.color,
                }}
              >
                {SECTIONS.find((s) => s.id === currentQuestion.sectionId)?.title}
              </span>
            </div>
            <QuizCard
              question={currentQuestion.question}
              options={currentQuestion.options}
              correctIndex={currentQuestion.correctIndex}
              explanation={currentQuestion.explanation}
              difficulty={currentQuestion.difficulty}
              onAnswer={handleAnswer}
              answered={answered}
            />
            <div className="flex justify-between mt-5 gap-3">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-lg bg-[var(--bg-raised)] text-[var(--text-muted)] disabled:opacity-35 hover:text-[var(--text)] transition-colors text-[13px] cursor-pointer"
              >
                ← Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= filteredQuestions.length - 1}
                className="px-5 py-2 rounded-lg text-white disabled:opacity-35 hover:opacity-90 transition-opacity text-[13px] cursor-pointer"
                style={{ backgroundColor: 'var(--color-teal)' }}
              >
                Next →
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[var(--text-muted)] text-base">
              {showMissedOnly ? 'No missed questions — great job!' : 'No questions for this filter.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
