import { motion } from 'framer-motion';
import type { Stat } from '../../types/content';

interface StatGridProps {
  stats: Stat[];
}

export default function StatGrid({ stats }: StatGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, delay: i * 0.03 }}
          className="bg-[var(--bg-raised)] rounded-lg px-4 py-3.5 text-center"
        >
          {stat.icon && (
            <div className="text-xl mb-1.5" aria-hidden="true">
              {stat.icon}
            </div>
          )}
          <div className="font-serif text-xl font-bold text-[var(--text)] leading-tight">
            {stat.value}
          </div>
          <div className="text-xs text-[var(--text-muted)] mt-1 leading-snug">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
