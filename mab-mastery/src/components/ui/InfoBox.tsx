import { type ReactNode } from 'react';
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface InfoBoxProps {
  title: string;
  variant: 'info' | 'warning' | 'success' | 'danger';
  children: ReactNode;
}

const cfg = {
  info:    { icon: Info,          color: 'var(--color-blue)',   bg: 'rgba(25,118,210,0.06)',  border: 'rgba(25,118,210,0.2)'  },
  warning: { icon: AlertTriangle, color: 'var(--color-amber)',  bg: 'rgba(245,158,11,0.06)',  border: 'rgba(245,158,11,0.2)'  },
  success: { icon: CheckCircle,   color: 'var(--color-green)',  bg: 'rgba(16,185,129,0.06)',  border: 'rgba(16,185,129,0.2)'  },
  danger:  { icon: XCircle,       color: 'var(--color-red)',    bg: 'rgba(239,68,68,0.06)',   border: 'rgba(239,68,68,0.2)'   },
};

export default function InfoBox({ title, variant, children }: InfoBoxProps) {
  const { icon: Icon, color, bg, border } = cfg[variant];

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: bg,
        border: `1px solid ${border}`,
        borderLeft: `3px solid ${color.replace('var(', '').replace(')', '') ? color : color}`,
      }}
    >
      <div className="px-5 py-4 flex items-start gap-3">
        <Icon
          size={17}
          className="mt-0.5 shrink-0"
          style={{ color }}
        />
        <div className="min-w-0">
          <h4 className="text-sm font-semibold mb-1.5" style={{ color }}>
            {title}
          </h4>
          <div className="text-sm text-[var(--text-secondary)] leading-[1.7]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
