interface ResidueTagProps {
  position: string;
  color?: 'amber' | 'blue' | 'teal' | 'red' | 'purple' | 'green';
}

const colorMap: Record<string, string> = {
  amber: 'bg-amber/15 text-amber',
  blue: 'bg-blue/15 text-blue',
  teal: 'bg-teal/15 text-teal',
  red: 'bg-red/15 text-red',
  purple: 'bg-purple/15 text-purple',
  green: 'bg-green/15 text-green',
};

export default function ResidueTag({
  position,
  color = 'amber',
}: ResidueTagProps) {
  return (
    <span
      className={`inline-flex items-center font-mono text-[0.8em] leading-none px-1.5 py-0.5 rounded ${colorMap[color]}`}
    >
      {position}
    </span>
  );
}
