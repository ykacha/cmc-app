import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  title?: string;
  language?: string;
}

export default function CodeBlock({ code, title, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const lines = code.split('\n');

  return (
    <div className="rounded-xl border border-[var(--border)] overflow-hidden card-glow">
      {(title || language) && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg-raised)] border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 mr-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--color-red)', opacity: 0.4 }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--color-amber)', opacity: 0.4 }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--color-green)', opacity: 0.4 }} />
            </div>
            {title && <span className="text-xs font-medium text-[var(--text)]">{title}</span>}
            {language && (
              <span className="text-[10px] font-[family-name:var(--font-mono)] px-1.5 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-muted)]">
                {language}
              </span>
            )}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-surface)] transition-all duration-150"
          >
            {copied ? <Check size={12} style={{ color: 'var(--color-green)' }} /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
      <div className="overflow-x-auto scrollbar-thin">
        <pre className="py-4 px-0 m-0 text-sm font-[family-name:var(--font-mono)] leading-relaxed" style={{ background: 'var(--code-bg)' }}>
          <code className="block">
            {lines.map((line, i) => (
              <div key={i} className="flex hover:bg-[var(--bg-surface)] transition-colors duration-100">
                <span className="w-10 shrink-0 text-right pr-4 select-none text-[11px] text-[var(--text-faint)]">
                  {i + 1}
                </span>
                <span className="text-[var(--text-secondary)] flex-1 pr-4">{line || ' '}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
