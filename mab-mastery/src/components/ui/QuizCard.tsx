import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizCardProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: string;
  onAnswer: (index: number) => void;
  answered?: number | null;
}

const prefixes = ['A', 'B', 'C', 'D', 'E', 'F'];

const diffCfg: Record<string, { color: string; bg: string }> = {
  medium: { color: 'var(--color-amber)', bg: 'rgba(245,158,11,0.12)' },
  hard:   { color: 'var(--color-red)',   bg: 'rgba(239,68,68,0.12)'  },
  expert: { color: 'var(--color-purple)', bg: 'rgba(139,92,246,0.12)' },
};

export default function QuizCard({
  question, options, correctIndex, explanation, difficulty, onAnswer, answered = null,
}: QuizCardProps) {
  const isAnswered = answered !== null;
  const dc = diffCfg[difficulty] || diffCfg.medium;

  return (
    <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden card-glow">
      {/* Question */}
      <div className="px-6 pt-6 pb-5">
        <div className="flex items-start justify-between gap-3 mb-5">
          <p className="text-[15px] font-medium text-[var(--text)] leading-relaxed flex-1">
            {question}
          </p>
          <span
            className="shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ backgroundColor: dc.bg, color: dc.color }}
          >
            {difficulty}
          </span>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {options.map((option, i) => {
            const isCorrect = i === correctIndex;
            const isSelected = i === answered;
            const isWrong = isSelected && !isCorrect;

            let borderColor = 'var(--border)';
            let bgColor = 'var(--bg-surface)';
            let opacity = 1;

            if (isAnswered) {
              if (isCorrect) { borderColor = 'rgba(16,185,129,0.4)'; bgColor = 'rgba(16,185,129,0.06)'; }
              else if (isWrong) { borderColor = 'rgba(239,68,68,0.4)'; bgColor = 'rgba(239,68,68,0.06)'; }
              else { opacity = 0.45; }
            }

            return (
              <motion.button
                key={i}
                whileHover={!isAnswered ? { scale: 1.01, y: -1 } : undefined}
                whileTap={!isAnswered ? { scale: 0.99 } : undefined}
                onClick={() => !isAnswered && onAnswer(i)}
                disabled={isAnswered}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-sm"
                style={{ border: `1px solid ${borderColor}`, backgroundColor: bgColor, opacity }}
              >
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-semibold shrink-0"
                  style={{
                    backgroundColor: isAnswered && isCorrect ? 'rgba(16,185,129,0.15)'
                      : isAnswered && isWrong ? 'rgba(239,68,68,0.15)'
                      : 'var(--bg-raised)',
                    color: isAnswered && isCorrect ? 'var(--color-green)'
                      : isAnswered && isWrong ? 'var(--color-red)'
                      : 'var(--text-muted)',
                  }}
                >
                  {isAnswered && isCorrect ? <CheckCircle size={14} /> : isAnswered && isWrong ? <XCircle size={14} /> : prefixes[i]}
                </span>
                <span className={`leading-snug ${isAnswered && !isCorrect && !isWrong ? 'text-[var(--text-faint)]' : 'text-[var(--text-secondary)]'}`}>
                  {option}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-[var(--bg-raised)] border-t border-[var(--border)]">
              <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-teal)' }}>
                Explanation
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-[1.7]">
                {explanation}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
