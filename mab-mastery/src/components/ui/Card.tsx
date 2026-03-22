import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  color?: 'blue' | 'teal' | 'amber' | 'red' | 'purple' | 'green' | 'pink';
  children: ReactNode;
}

const colorMap: Record<string, string> = {
  blue:   'var(--color-blue)',
  teal:   'var(--color-teal)',
  amber:  'var(--color-amber)',
  red:    'var(--color-red)',
  purple: 'var(--color-purple)',
  green:  'var(--color-green)',
  pink:   'var(--color-pink)',
};

export default function Card({ title, color = 'teal', children }: CardProps) {
  const c = colorMap[color] ?? colorMap.teal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative rounded-xl bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden card-glow"
    >
      {/* Top accent line */}
      <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${c}, ${c}40)` }} />

      <div className="px-5 py-4">
        <h3 className="text-[15px] font-semibold text-[var(--text)] mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: c }} />
          {title}
        </h3>
        <div className="text-sm text-[var(--text-secondary)] leading-[1.7]">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
