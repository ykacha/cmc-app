import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import type { DecisionNode } from '../../types/content';

interface DecisionTreeProps {
  nodes: DecisionNode[];
  title?: string;
}

export default function DecisionTree({ nodes, title }: DecisionTreeProps) {
  const [activeId, setActiveId] = useState<string>(nodes[0]?.id || '');
  const [path, setPath] = useState<string[]>([nodes[0]?.id || '']);

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const activeNode = nodeMap.get(activeId);

  const navigate = useCallback(
    (targetId: string) => {
      if (nodeMap.has(targetId)) {
        setActiveId(targetId);
        setPath((prev) => [...prev, targetId]);
      }
    },
    [nodeMap]
  );

  const reset = useCallback(() => {
    const first = nodes[0]?.id || '';
    setActiveId(first);
    setPath([first]);
  }, [nodes]);

  if (!activeNode) return null;

  return (
    <div className="rounded-lg border border-[var(--border)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg-raised)] border-b border-[var(--border)]">
        <h4 className="text-sm font-semibold text-[var(--text)]">
          {title || 'Decision Tree'}
        </h4>
        {path.length > 1 && (
          <button
            onClick={reset}
            className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            <RotateCcw size={12} />
            Reset
          </button>
        )}
      </div>

      {/* Breadcrumb trail */}
      {path.length > 1 && (
        <div className="px-4 py-2 bg-[var(--bg-surface)] border-b border-[var(--border)] flex items-center gap-1 overflow-x-auto scrollbar-thin">
          {path.map((pid, i) => {
            const pNode = nodeMap.get(pid);
            if (!pNode) return null;
            const isLast = i === path.length - 1;
            return (
              <span key={`${pid}-${i}`} className="flex items-center gap-1 shrink-0">
                {i > 0 && (
                  <span className="text-[var(--text-faint)] text-xs mx-0.5">
                    &rarr;
                  </span>
                )}
                <button
                  onClick={() => {
                    setActiveId(pid);
                    setPath(path.slice(0, i + 1));
                  }}
                  className={`text-xs px-1.5 py-0.5 rounded transition-colors ${
                    isLast
                      ? 'bg-teal/15 text-teal font-medium'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {pNode.result ? 'Result' : `Step ${i + 1}`}
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* Active node */}
      <div className="p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.15 }}
          >
            {activeNode.result ? (
              /* Terminal result node */
              <div className="rounded-lg bg-green/10 border border-green/25 p-4">
                <div className="text-xs font-semibold text-green uppercase tracking-wider mb-2">
                  Result
                </div>
                <p className="text-sm text-[var(--text)] leading-relaxed">
                  {activeNode.result}
                </p>
                {activeNode.question && (
                  <p className="text-xs text-[var(--text-muted)] mt-2 italic">
                    {activeNode.question}
                  </p>
                )}
              </div>
            ) : (
              /* Question node */
              <div className="space-y-4">
                <div className="rounded-lg bg-[var(--bg-surface)] border border-[var(--border)] p-4">
                  <p className="text-sm text-[var(--text)] leading-relaxed font-medium">
                    {activeNode.question}
                  </p>
                </div>

                <div className="flex gap-3">
                  {activeNode.yes && (
                    <button
                      onClick={() => navigate(activeNode.yes!)}
                      className="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium bg-green/10 text-green border border-green/25 hover:bg-green/20 transition-colors"
                    >
                      Yes
                    </button>
                  )}
                  {activeNode.no && (
                    <button
                      onClick={() => navigate(activeNode.no!)}
                      className="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium bg-red/10 text-red border border-red/25 hover:bg-red/20 transition-colors"
                    >
                      No
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
