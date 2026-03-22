interface BulletListProps {
  items: string[];
  color?: string;
  title?: string;
}

export default function BulletList({
  items,
  color = 'var(--color-teal)',
  title,
}: BulletListProps) {
  return (
    <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] px-5 py-4 card-glow">
      {title && (
        <h4 className="text-[13.5px] font-semibold text-[var(--text)] mb-3.5">
          {title}
        </h4>
      )}
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-[13.5px] leading-[1.65]">
            <span
              className="inline-block w-[6px] h-[6px] rounded-full mt-[7px] shrink-0"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
            <span className="text-[var(--text-secondary)]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
