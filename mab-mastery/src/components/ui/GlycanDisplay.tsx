import { motion } from 'framer-motion';
import type { GlycoformData } from '../../types/content';

interface GlycanDisplayProps {
  glycoforms: GlycoformData[];
}

export default function GlycanDisplay({ glycoforms }: GlycanDisplayProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {glycoforms.map((gf, i) => (
        <motion.div
          key={gf.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, delay: i * 0.03 }}
          className="rounded-lg bg-[var(--bg-card)] border border-[var(--border)] p-4 flex flex-col gap-3"
        >
          {/* Header: name badge + notation */}
          <div className="flex items-start justify-between gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-teal/15 text-teal">
              {gf.name}
            </span>
            <code className="font-mono text-xs text-[var(--text-muted)] bg-[var(--code-bg)] px-2 py-1 rounded shrink-0">
              {gf.notation}
            </code>
          </div>

          {/* Description */}
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {gf.description}
          </p>

          {/* Metadata row */}
          {(gf.abundance || gf.impact) && (
            <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-[var(--border)]">
              {gf.abundance && (
                <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber" />
                  {gf.abundance}
                </span>
              )}
              {gf.impact && (
                <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple" />
                  {gf.impact}
                </span>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
