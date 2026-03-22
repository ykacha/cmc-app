import { useState, useCallback, useMemo } from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

interface DataTableProps {
  headers: string[];
  rows: (string | number)[][];
  sortable?: boolean;
  title?: string;
}

function isNumeric(value: string | number): boolean {
  if (typeof value === 'number') return true;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed !== '' && !isNaN(Number(trimmed));
  }
  return false;
}

export default function DataTable({ headers, rows, sortable = false, title }: DataTableProps) {
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const handleSort = useCallback(
    (colIndex: number) => {
      if (!sortable) return;
      if (sortCol === colIndex) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
      else { setSortCol(colIndex); setSortDir('asc'); }
    },
    [sortable, sortCol]
  );

  const sortedRows = useMemo(() => {
    if (sortCol === null || !sortable) return rows;
    return [...rows].sort((a, b) => {
      const aVal = a[sortCol], bVal = b[sortCol];
      const aNum = Number(aVal), bNum = Number(bVal);
      const cmp = (!isNaN(aNum) && !isNaN(bNum)) ? aNum - bNum : String(aVal).localeCompare(String(bVal));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [rows, sortCol, sortDir, sortable]);

  return (
    <div className="rounded-xl border border-[var(--border)] overflow-hidden card-glow">
      {title && (
        <div className="px-5 py-3 bg-[var(--bg-raised)] border-b border-[var(--border)]">
          <h4 className="text-sm font-semibold text-[var(--text)]">{title}</h4>
        </div>
      )}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--bg-raised)]">
              {headers.map((header, i) => (
                <th
                  key={i}
                  onClick={() => handleSort(i)}
                  className={`px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border)] whitespace-nowrap ${
                    sortable ? 'cursor-pointer select-none hover:text-[var(--text)] transition-colors duration-150' : ''
                  }`}
                >
                  {header}
                  {sortable && (
                    sortCol === i
                      ? sortDir === 'asc'
                        ? <ArrowUp size={11} className="ml-1 inline" style={{ color: 'var(--color-teal)' }} />
                        : <ArrowDown size={11} className="ml-1 inline" style={{ color: 'var(--color-teal)' }} />
                      : <ArrowUpDown size={11} className="ml-1 inline opacity-25" />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="border-b border-[var(--border)] last:border-b-0 transition-colors duration-150 hover:bg-[var(--bg-surface)]"
                style={rowIdx % 2 === 1 ? { backgroundColor: 'var(--bg-surface)' } : undefined}
              >
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className={`px-4 py-2.5 text-[var(--text-secondary)] whitespace-nowrap ${
                      isNumeric(cell) ? 'font-[family-name:var(--font-mono)] text-right' : ''
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
