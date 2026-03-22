import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────
   Shared helpers
───────────────────────────────────────────── */

const T = {
  text:  'var(--text)',
  muted: 'var(--text-muted)',
  faint: 'var(--text-faint)',
  border:'var(--border)',
  card:  'var(--bg-card)',
  raised:'var(--bg-raised)',
};

const C = {
  blue:   '#1976d2',
  teal:   '#00897b',
  amber:  '#f59e0b',
  green:  '#10b981',
  purple: '#8b5cf6',
  red:    '#ef4444',
  pink:   '#ec4899',
  slate:  '#64748b',
};

function hex(color: string, alpha: number) {
  // append alpha as 2-digit hex
  const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return color + a;
}

/* ─────────────────────────────────────────────
   1. IgG STRUCTURE  (structure-m0)
───────────────────────────────────────────── */
function IgGStructureSVG() {
  const W = 560, H = 400;
  const fabW = 108, vhH = 52, ch1H = 48;
  const f1x = 52, f2x = W - 52 - fabW;
  const fabStartY = 30;
  const ch1Bottom = fabStartY + vhH + 8 + ch1H;
  const hingeY = 186, hingeW = 106, hingeH = 20;
  const hingeX = W / 2 - hingeW / 2;
  const ch2H = 64, ch2W = 78;
  const ch2Y = hingeY + hingeH + 14;
  const ch2Lx = W / 2 - ch2W - 2;
  const ch2Rx = W / 2 + 2;
  const ch3Y = ch2Y + ch2H + 8;
  const ch3H = 64;
  const f1cx = f1x + fabW / 2;
  const f2cx = f2x + fabW / 2;
  const ch2Lcx = ch2Lx + ch2W / 2;
  const ch2Rcx = ch2Rx + ch2W / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* defs */}
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={T.faint} />
        </marker>
      </defs>

      {/* ── LEFT FAB ── */}
      {/* VH-VL box */}
      <rect x={f1x} y={fabStartY} width={fabW} height={vhH} rx={8}
        fill={hex(C.blue, 0.13)} stroke={C.blue} strokeWidth={1.5} />
      <text x={f1cx} y={fabStartY + 18} textAnchor="middle" fontSize={13}
        fontWeight="700" fill={C.blue} fontFamily="system-ui">VH · VL</text>
      <text x={f1cx} y={fabStartY + 34} textAnchor="middle" fontSize={9}
        fill={hex(C.blue, 0.7)} fontFamily="monospace">Antigen binding</text>

      {/* CDR bumps */}
      {[f1x + 20, f1x + 54, f1x + 88].map((cx, i) => (
        <path key={i} d={`M ${cx - 9} ${fabStartY} Q ${cx} ${fabStartY - 16} ${cx + 9} ${fabStartY}`}
          fill="none" stroke={C.blue} strokeWidth={1.5} />
      ))}
      <text x={f1cx} y={fabStartY - 4} textAnchor="middle" fontSize={8}
        fill={hex(C.blue, 0.5)} fontFamily="monospace">CDR loops</text>

      {/* CH1-CL box */}
      <rect x={f1x} y={fabStartY + vhH + 8} width={fabW} height={ch1H} rx={8}
        fill={hex(C.blue, 0.07)} stroke={hex(C.blue, 0.6)} strokeWidth={1.5} />
      <text x={f1cx} y={fabStartY + vhH + 8 + ch1H / 2 + 5} textAnchor="middle"
        fontSize={13} fontWeight="700" fill={hex(C.blue, 0.85)} fontFamily="system-ui">CH1 · CL</text>

      {/* Fab1 bracket + label */}
      <path d={`M ${f1x - 6} ${fabStartY + 5} L ${f1x - 14} ${fabStartY + 5} L ${f1x - 14} ${ch1Bottom - 5} L ${f1x - 6} ${ch1Bottom - 5}`}
        fill="none" stroke={hex(C.blue, 0.35)} strokeWidth={1.2} />
      <text x={f1x - 22} y={(fabStartY + ch1Bottom) / 2 + 4} textAnchor="middle"
        fontSize={9} fontFamily="monospace" fill={hex(C.blue, 0.65)}
        transform={`rotate(-90, ${f1x - 22}, ${(fabStartY + ch1Bottom) / 2 + 4})`}>FAB</text>

      {/* Left diagonal arm → hinge */}
      <path d={`M ${f1cx} ${ch1Bottom} Q ${f1cx - 10} ${ch1Bottom + 20} ${hingeX} ${hingeY + hingeH / 2}`}
        fill="none" stroke={hex(C.blue, 0.45)} strokeWidth={2} strokeDasharray="5,3" />

      {/* ── RIGHT FAB ── */}
      <rect x={f2x} y={fabStartY} width={fabW} height={vhH} rx={8}
        fill={hex(C.blue, 0.13)} stroke={C.blue} strokeWidth={1.5} />
      <text x={f2cx} y={fabStartY + 18} textAnchor="middle" fontSize={13}
        fontWeight="700" fill={C.blue} fontFamily="system-ui">VH · VL</text>
      <text x={f2cx} y={fabStartY + 34} textAnchor="middle" fontSize={9}
        fill={hex(C.blue, 0.7)} fontFamily="monospace">Antigen binding</text>
      {[f2x + 20, f2x + 54, f2x + 88].map((cx, i) => (
        <path key={i} d={`M ${cx - 9} ${fabStartY} Q ${cx} ${fabStartY - 16} ${cx + 9} ${fabStartY}`}
          fill="none" stroke={C.blue} strokeWidth={1.5} />
      ))}
      <rect x={f2x} y={fabStartY + vhH + 8} width={fabW} height={ch1H} rx={8}
        fill={hex(C.blue, 0.07)} stroke={hex(C.blue, 0.6)} strokeWidth={1.5} />
      <text x={f2cx} y={fabStartY + vhH + 8 + ch1H / 2 + 5} textAnchor="middle"
        fontSize={13} fontWeight="700" fill={hex(C.blue, 0.85)} fontFamily="system-ui">CH1 · CL</text>
      <path d={`M ${f2cx} ${ch1Bottom} Q ${f2cx + 10} ${ch1Bottom + 20} ${hingeX + hingeW} ${hingeY + hingeH / 2}`}
        fill="none" stroke={hex(C.blue, 0.45)} strokeWidth={2} strokeDasharray="5,3" />

      {/* Fc bracket (right side) */}
      <path d={`M ${ch2Rx + ch2W + 6} ${ch2Y} L ${ch2Rx + ch2W + 14} ${ch2Y} L ${ch2Rx + ch2W + 14} ${ch3Y + ch3H} L ${ch2Rx + ch2W + 6} ${ch3Y + ch3H}`}
        fill="none" stroke={hex(C.teal, 0.4)} strokeWidth={1.2} />
      <text x={ch2Rx + ch2W + 22} y={(ch2Y + ch3Y + ch3H) / 2 + 4} textAnchor="middle"
        fontSize={9} fontFamily="monospace" fill={hex(C.teal, 0.7)}
        transform={`rotate(90, ${ch2Rx + ch2W + 22}, ${(ch2Y + ch3Y + ch3H) / 2 + 4})`}>FC</text>

      {/* ── HINGE ── */}
      <rect x={hingeX} y={hingeY} width={hingeW} height={hingeH} rx={8}
        fill={hex(C.amber, 0.18)} stroke={C.amber} strokeWidth={1.5} />
      <text x={hingeX + hingeW / 2} y={hingeY + hingeH / 2 + 4} textAnchor="middle"
        fontSize={11} fontWeight="700" fill={C.amber} fontFamily="system-ui">Hinge</text>
      {/* Papain site */}
      <line x1={f1x} y1={hingeY - 2} x2={f2x + fabW} y2={hingeY - 2}
        stroke={hex(C.amber, 0.3)} strokeWidth={1} strokeDasharray="4,4" />
      <text x={f2x + fabW + 8} y={hingeY + 2} fontSize={9}
        fontFamily="monospace" fill={hex(C.amber, 0.7)}>✂ Papain</text>

      {/* Hinge → CH2 connectors */}
      <line x1={hingeX + 18} y1={hingeY + hingeH} x2={ch2Lcx} y2={ch2Y}
        stroke={hex(C.teal, 0.5)} strokeWidth={1.5} />
      <line x1={hingeX + hingeW - 18} y1={hingeY + hingeH} x2={ch2Rcx} y2={ch2Y}
        stroke={hex(C.teal, 0.5)} strokeWidth={1.5} />

      {/* ── CH2 PAIR ── */}
      <rect x={ch2Lx} y={ch2Y} width={ch2W} height={ch2H} rx={7}
        fill={hex(C.teal, 0.15)} stroke={C.teal} strokeWidth={1.5} />
      <text x={ch2Lcx} y={ch2Y + ch2H / 2 + 5} textAnchor="middle"
        fontSize={13} fontWeight="700" fill={C.teal} fontFamily="system-ui">CH2</text>
      <rect x={ch2Rx} y={ch2Y} width={ch2W} height={ch2H} rx={7}
        fill={hex(C.teal, 0.15)} stroke={C.teal} strokeWidth={1.5} />
      <text x={ch2Rcx} y={ch2Y + ch2H / 2 + 5} textAnchor="middle"
        fontSize={13} fontWeight="700" fill={C.teal} fontFamily="system-ui">CH2</text>

      {/* N297 glycan mini-tree above each CH2 */}
      {[ch2Lcx, ch2Rcx].map((gx, k) => (
        <g key={k}>
          <line x1={gx} y1={ch2Y} x2={gx} y2={ch2Y - 11} stroke={C.purple} strokeWidth={1.3} />
          <line x1={gx} y1={ch2Y - 11} x2={gx - 11} y2={ch2Y - 24} stroke={C.purple} strokeWidth={1.3} />
          <line x1={gx} y1={ch2Y - 11} x2={gx + 11} y2={ch2Y - 24} stroke={C.purple} strokeWidth={1.3} />
          <line x1={gx - 11} y1={ch2Y - 24} x2={gx - 18} y2={ch2Y - 35} stroke={C.purple} strokeWidth={1.1} />
          <line x1={gx + 11} y1={ch2Y - 24} x2={gx + 18} y2={ch2Y - 35} stroke={C.purple} strokeWidth={1.1} />
          {/* Sugar symbols */}
          <rect x={gx - 6} y={ch2Y - 6} width={12} height={12} rx={1}
            fill={hex(C.blue, 0.25)} stroke={C.blue} strokeWidth={1} />
          <circle cx={gx} cy={ch2Y - 13} r={5} fill={hex(C.green, 0.3)} stroke={C.green} strokeWidth={1} />
          <circle cx={gx - 11} cy={ch2Y - 26} r={5} fill={hex(C.green, 0.3)} stroke={C.green} strokeWidth={1} />
          <circle cx={gx + 11} cy={ch2Y - 26} r={5} fill={hex(C.green, 0.3)} stroke={C.green} strokeWidth={1} />
          <rect x={gx - 6 - 18} y={ch2Y - 41} width={9} height={9} rx={1}
            fill={hex(C.blue, 0.2)} stroke={C.blue} strokeWidth={1} />
          <rect x={gx + 11 + 9} y={ch2Y - 41} width={9} height={9} rx={1}
            fill={hex(C.blue, 0.2)} stroke={C.blue} strokeWidth={1} />
          <text x={gx} y={ch2Y - 50} textAnchor="middle" fontSize={8}
            fontFamily="monospace" fill={C.purple}>N297</text>
        </g>
      ))}

      {/* ── CH3 PAIR ── */}
      <line x1={ch2Lcx} y1={ch2Y + ch2H} x2={ch2Lcx} y2={ch3Y}
        stroke={hex(C.green, 0.5)} strokeWidth={1.5} />
      <line x1={ch2Rcx} y1={ch2Y + ch2H} x2={ch2Rcx} y2={ch3Y}
        stroke={hex(C.green, 0.5)} strokeWidth={1.5} />
      <rect x={ch2Lx} y={ch3Y} width={ch2W} height={ch3H} rx={7}
        fill={hex(C.green, 0.15)} stroke={C.green} strokeWidth={1.5} />
      <text x={ch2Lcx} y={ch3Y + ch3H / 2 + 5} textAnchor="middle"
        fontSize={13} fontWeight="700" fill={C.green} fontFamily="system-ui">CH3</text>
      <rect x={ch2Rx} y={ch3Y} width={ch2W} height={ch3H} rx={7}
        fill={hex(C.green, 0.15)} stroke={C.green} strokeWidth={1.5} />
      <text x={ch2Rcx} y={ch3Y + ch3H / 2 + 5} textAnchor="middle"
        fontSize={13} fontWeight="700" fill={C.green} fontFamily="system-ui">CH3</text>

      {/* Protein A + FcRn annotation */}
      <text x={W / 2} y={ch3Y + ch3H + 16} textAnchor="middle" fontSize={9}
        fontFamily="monospace" fill={T.faint}>Protein A · FcRn binding  (H433, H435, Y436 · M252/S254/T256)</text>

      {/* Legend */}
      {[
        { color: C.blue, label: 'Fab (antigen binding)', x: 14, y: H - 60 },
        { color: C.amber, label: 'Hinge (flexible)', x: 14, y: H - 44 },
        { color: C.teal, label: 'CH2 (effector)', x: 14, y: H - 28 },
        { color: C.green, label: 'CH3 (dimerisation · FcRn)', x: 14, y: H - 12 },
      ].map((l) => (
        <g key={l.label}>
          <rect x={l.x} y={l.y - 8} width={10} height={10} rx={2} fill={hex(l.color, 0.5)} stroke={l.color} strokeWidth={1} />
          <text x={l.x + 14} y={l.y} fontSize={9} fontFamily="monospace" fill={T.muted}>{l.label}</text>
        </g>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   2. CHAIN ARCHITECTURE  (structure-m2)
───────────────────────────────────────────── */
function ChainArchitectureSVG() {
  const W = 580, H = 230;
  const hcY = 46, lcY = 154, boxH = 50, rx = 6;

  // HC domains: [label, width, color]
  const hcDomains: [string, number, string][] = [
    ['VH', 82, C.blue],
    ['CH1', 68, C.slate],
    ['Hinge', 22, C.amber],
    ['CH2', 82, C.teal],
    ['CH3', 76, C.green],
  ];
  const lcDomains: [string, number, string][] = [
    ['VL', 82, C.blue],
    ['CL (κ/λ)', 68, C.slate],
  ];

  const gap = 4;
  let hcX = 44;
  const hcRects: { x: number; w: number; label: string; color: string }[] = [];
  hcDomains.forEach(([label, w, color]) => {
    hcRects.push({ x: hcX, w, label, color });
    hcX += w + gap;
  });

  let lcX = 44;
  const lcRects: { x: number; w: number; label: string; color: string }[] = [];
  lcDomains.forEach(([label, w, color]) => {
    lcRects.push({ x: lcX, w, label, color });
    lcX += w + gap;
  });

  const hcEnd = hcX - gap;
  const lcEnd = lcX - gap;
  const ch2Entry = hcRects.find((d) => d.label === 'CH2')!;
  const ch2Cx = ch2Entry.x + ch2Entry.w / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* Row labels */}
      <text x={38} y={hcY - 12} textAnchor="end" fontSize={10} fontFamily="monospace"
        fill={T.muted} fontWeight="600">HC</text>
      <text x={38} y={lcY - 12} textAnchor="end" fontSize={10} fontFamily="monospace"
        fill={T.muted} fontWeight="600">LC</text>

      {/* N-term / C-term HC */}
      <text x={38} y={hcY + boxH / 2 + 4} textAnchor="end" fontSize={9} fontFamily="monospace" fill={T.faint}>H₂N</text>
      <text x={hcEnd + 8} y={hcY + boxH / 2 + 4} fontSize={9} fontFamily="monospace" fill={T.faint}>COOH</text>
      <text x={38} y={lcY + boxH / 2 + 4} textAnchor="end" fontSize={9} fontFamily="monospace" fill={T.faint}>H₂N</text>
      <text x={lcEnd + 8} y={lcY + boxH / 2 + 4} fontSize={9} fontFamily="monospace" fill={T.faint}>COOH</text>

      {/* HC domain boxes */}
      {hcRects.map(({ x, w, label, color }) => (
        <g key={label}>
          <rect x={x} y={hcY} width={w} height={boxH} rx={rx}
            fill={hex(color, 0.14)} stroke={color} strokeWidth={label === 'Hinge' ? 1 : 1.5} />
          <text x={x + w / 2} y={hcY + boxH / 2 + 4} textAnchor="middle"
            fontSize={label === 'Hinge' ? 9 : 12} fontWeight="600" fill={color} fontFamily="system-ui">
            {label}
          </text>
        </g>
      ))}

      {/* LC domain boxes */}
      {lcRects.map(({ x, w, label, color }) => (
        <g key={label}>
          <rect x={x} y={lcY} width={w} height={boxH} rx={rx}
            fill={hex(color, 0.12)} stroke={hex(color, 0.7)} strokeWidth={1.5} />
          <text x={x + w / 2} y={lcY + boxH / 2 + 4} textAnchor="middle"
            fontSize={12} fontWeight="600" fill={color} fontFamily="system-ui">{label}</text>
        </g>
      ))}

      {/* VH-VL pairing bracket */}
      <path d={`M 44 ${hcY + boxH} L 44 ${hcY + boxH + 6} L 85 ${hcY + boxH + 6} L 85 ${lcY}`}
        fill="none" stroke={hex(C.blue, 0.4)} strokeWidth={1.2} strokeDasharray="3,3" />
      <text x={64} y={hcY + boxH + 16} textAnchor="middle" fontSize={8}
        fontFamily="monospace" fill={hex(C.blue, 0.6)}>VH–VL</text>

      {/* CH1-CL pairing bracket */}
      <path d={`M 130 ${hcY + boxH} L 130 ${hcY + boxH + 6} L 170 ${hcY + boxH + 6} L 170 ${lcY}`}
        fill="none" stroke={hex(C.slate, 0.4)} strokeWidth={1.2} strokeDasharray="3,3" />
      <text x={150} y={hcY + boxH + 16} textAnchor="middle" fontSize={8}
        fontFamily="monospace" fill={hex(C.slate, 0.6)}>CH1–CL</text>

      {/* HC-LC disulfide */}
      <path d={`M 198 ${hcY + boxH} Q 198 ${hcY + boxH + 18} 198 ${lcY + boxH / 2}`}
        fill="none" stroke={C.amber} strokeWidth={1.5} strokeDasharray="2,2" />
      <text x={200} y={hcY + boxH + 15} fontSize={8} fontFamily="monospace" fill={C.amber}>S-S</text>

      {/* N297 glycan lollipop */}
      <line x1={ch2Cx} y1={hcY} x2={ch2Cx} y2={hcY - 14} stroke={C.purple} strokeWidth={1.5} />
      <circle cx={ch2Cx} cy={hcY - 22} r={8} fill={hex(C.purple, 0.25)} stroke={C.purple} strokeWidth={1.3} />
      <text x={ch2Cx} y={hcY - 18} textAnchor="middle" fontSize={7}
        fontFamily="monospace" fill={C.purple} fontWeight="700">N297</text>

      {/* LC ends arrow */}
      <line x1={lcEnd + 4} y1={lcY + boxH / 2} x2={lcEnd + 22} y2={lcY + boxH / 2}
        stroke={T.faint} strokeWidth={1} strokeDasharray="3,2" />

      {/* Scale labels */}
      <text x={W - 10} y={H - 8} textAnchor="end" fontSize={8} fontFamily="monospace" fill={T.faint}>
        N-term ──────────────────────────── C-term
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   3. N-GLYCAN CORE  (glycosylation-m0)
───────────────────────────────────────────── */
function NglycanCoreSVG() {
  const W = 440, H = 400;
  const cx = W / 2;

  // Bottom-up layout
  const asn = { x: cx, y: 380 };
  const gc1 = { x: cx, y: 340 };   // GlcNAc (Asn-linked)
  const fuc = { x: cx + 30, y: 344 }; // Core Fuc
  const gc2 = { x: cx, y: 298 };   // Second GlcNAc
  const bman = { x: cx, y: 256 };  // β-Man
  const mL = { x: cx - 72, y: 212 }; // α1,6-Man (left arm)
  const mR = { x: cx + 72, y: 212 }; // α1,3-Man (right arm)
  const gcL1 = { x: cx - 72, y: 168 }; // GlcNAc left arm
  const gcR1 = { x: cx + 72, y: 168 }; // GlcNAc right arm
  const galL = { x: cx - 72, y: 126 };  // Gal left
  const galR = { x: cx + 72, y: 126 };  // Gal right
  const siaL = { x: cx - 72, y: 86 };   // Sia left
  const siaR = { x: cx + 72, y: 86 };   // Sia right

  const S = 12; // symbol size (half)

  function GlcNAc({ x, y }: { x: number; y: number }) {
    return <rect x={x - S} y={y - S} width={S * 2} height={S * 2} rx={2}
      fill={hex(C.blue, 0.28)} stroke={C.blue} strokeWidth={1.5} />;
  }
  function Man({ x, y }: { x: number; y: number }) {
    return <circle cx={x} cy={y} r={S} fill={hex(C.green, 0.28)} stroke={C.green} strokeWidth={1.5} />;
  }
  function Gal({ x, y }: { x: number; y: number }) {
    return <circle cx={x} cy={y} r={S} fill={hex(C.amber, 0.28)} stroke={C.amber} strokeWidth={1.5} />;
  }
  function Fuc({ x, y }: { x: number; y: number }) {
    const d = S + 2;
    return <polygon points={`${x},${y - d} ${x + d},${y} ${x},${y + d} ${x - d},${y}`}
      fill={hex(C.red, 0.28)} stroke={C.red} strokeWidth={1.5} />;
  }
  function Sia({ x, y }: { x: number; y: number }) {
    const d = S + 1;
    return <polygon points={`${x},${y - d} ${x + d},${y} ${x},${y + d} ${x - d},${y}`}
      fill={hex(C.purple, 0.28)} stroke={C.purple} strokeWidth={1.5} />;
  }

  function Link({ x1, y1, x2, y2, label }: { x1: number; y1: number; x2: number; y2: number; label: string }) {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    return (
      <>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={T.border} strokeWidth={1.5} />
        <text x={mx + 4} y={my + 3} fontSize={8} fontFamily="monospace" fill={T.faint}>{label}</text>
      </>
    );
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* Title */}
      <text x={W / 2} y={14} textAnchor="middle" fontSize={11} fontFamily="monospace"
        fill={T.muted} fontWeight="600">Complex Biantennary N-Glycan (G2F) at Asn297</text>

      {/* Connections */}
      <Link x1={cx} y1={asn.y - 10} x2={gc1.x} y2={gc1.y + S} label="" />
      <Link x1={gc1.x} y1={gc1.y - S} x2={gc2.x} y2={gc2.y + S} label="β1,4" />
      <Link x1={gc2.x} y1={gc2.y - S} x2={bman.x} y2={bman.y + S} label="β1,4" />
      <Link x1={bman.x} y1={bman.y - S} x2={mL.x} y2={mL.y + S} label="α1,6" />
      <Link x1={bman.x} y1={bman.y - S} x2={mR.x} y2={mR.y + S} label="α1,3" />
      <Link x1={mL.x} y1={mL.y - S} x2={gcL1.x} y2={gcL1.y + S} label="β1,2" />
      <Link x1={mR.x} y1={mR.y - S} x2={gcR1.x} y2={gcR1.y + S} label="β1,2" />
      <Link x1={gcL1.x} y1={gcL1.y - S} x2={galL.x} y2={galL.y + S} label="β1,4" />
      <Link x1={gcR1.x} y1={gcR1.y - S} x2={galR.x} y2={galR.y + S} label="β1,4" />
      <Link x1={galL.x} y1={galL.y - S} x2={siaL.x} y2={siaL.y + S} label="α2,6" />
      <Link x1={galR.x} y1={galR.y - S} x2={siaR.x} y2={siaR.y + S} label="α2,6" />
      {/* Core fucose */}
      <line x1={gc1.x + S} y1={gc1.y} x2={fuc.x - (S + 2)} y2={fuc.y} stroke={T.border} strokeWidth={1.5} />
      <text x={gc1.x + S + 4} y={gc1.y - 5} fontSize={8} fontFamily="monospace" fill={T.faint}>α1,6</text>

      {/* Sugar symbols */}
      <GlcNAc {...gc1} />
      <Fuc {...fuc} />
      <GlcNAc {...gc2} />
      <Man {...bman} />
      <Man {...mL} />
      <Man {...mR} />
      <GlcNAc {...gcL1} />
      <GlcNAc {...gcR1} />
      <Gal {...galL} />
      <Gal {...galR} />
      <Sia {...siaL} />
      <Sia {...siaR} />

      {/* Asn297 label */}
      <text x={cx} y={asn.y + 2} textAnchor="middle" fontSize={11}
        fontFamily="monospace" fontWeight="700" fill={T.muted}>Asn297</text>

      {/* Arm labels */}
      <text x={mL.x - 18} y={mL.y + 4} textAnchor="end" fontSize={8}
        fontFamily="monospace" fill={T.faint}>α1,6 arm</text>
      <text x={mR.x + 18} y={mR.y + 4} fontSize={8}
        fontFamily="monospace" fill={T.faint}>α1,3 arm</text>

      {/* Legend */}
      <g transform="translate(12, 28)">
        {[
          { symbol: 'square', color: C.blue, label: 'GlcNAc' },
          { symbol: 'circle', color: C.green, label: 'Mannose' },
          { symbol: 'circle', color: C.amber, label: 'Galactose' },
          { symbol: 'diamond', color: C.red, label: 'Fucose (core)' },
          { symbol: 'diamond', color: C.purple, label: 'Sialic acid' },
        ].map(({ symbol, color, label }, i) => {
          const lx = 0, ly = i * 20;
          return (
            <g key={label}>
              {symbol === 'square' && <rect x={lx - 6} y={ly - 6} width={12} height={12} rx={1} fill={hex(color, 0.3)} stroke={color} strokeWidth={1} />}
              {symbol === 'circle' && <circle cx={lx} cy={ly} r={6} fill={hex(color, 0.3)} stroke={color} strokeWidth={1} />}
              {symbol === 'diamond' && <polygon points={`${lx},${ly - 7} ${lx + 7},${ly} ${lx},${ly + 7} ${lx - 7},${ly}`} fill={hex(color, 0.3)} stroke={color} strokeWidth={1} />}
              <text x={lx + 12} y={ly + 4} fontSize={9} fontFamily="monospace" fill={T.muted}>{label}</text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   4. ADCC MECHANISM  (moa-m1)
───────────────────────────────────────────── */
function AdccMechanismSVG() {
  const W = 520, H = 380;

  // Tumor cell (large rounded rect at bottom)
  const tumorY = 275, tumorH = 95;

  // NK cell (circle, top-right)
  const nkCx = 380, nkCy = 90, nkR = 68;

  // Antigens on tumor surface (3 lollipops sticking up from y=275)
  const antigens = [140, 200, 260];

  // mAb anchored on antigen at x=200 (Fab down, Fc up)
  const mabY = 180; // junction point of Y-shape
  const mabFcTop = 140;
  const mabFabLeft = { x: 175, y: tumorY };
  const mabFabRight = { x: 225, y: tumorY };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <defs>
        <marker id="arr2" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill={C.red} />
        </marker>
        <marker id="arr3" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill={C.teal} />
        </marker>
      </defs>

      {/* ── Tumor cell ── */}
      <rect x={10} y={tumorY} width={W - 20} height={tumorH} rx={24}
        fill={hex(C.red, 0.1)} stroke={C.red} strokeWidth={2} />
      <text x={W / 2} y={tumorY + tumorH / 2 + 4} textAnchor="middle"
        fontSize={13} fontWeight="600" fill={C.red} fontFamily="system-ui">Tumour / Target Cell</text>
      {/* Cell membrane label */}
      <text x={W - 30} y={tumorY - 6} textAnchor="end" fontSize={9}
        fontFamily="monospace" fill={hex(C.red, 0.6)}>Cell membrane</text>

      {/* ── Antigens on surface ── */}
      {antigens.map((ax) => (
        <g key={ax}>
          <line x1={ax} y1={tumorY} x2={ax} y2={tumorY - 22} stroke={C.red} strokeWidth={2} />
          <circle cx={ax} cy={tumorY - 30} r={8}
            fill={hex(C.red, 0.25)} stroke={C.red} strokeWidth={1.5} />
          {ax === 200 && (
            <text x={ax} y={tumorY - 43} textAnchor="middle" fontSize={9}
              fontFamily="monospace" fill={C.red}>Antigen</text>
          )}
        </g>
      ))}

      {/* ── NK cell ── */}
      <circle cx={nkCx} cy={nkCy} r={nkR} fill={hex(C.teal, 0.12)} stroke={C.teal} strokeWidth={2} />
      <text x={nkCx} y={nkCy - 8} textAnchor="middle" fontSize={13}
        fontWeight="600" fill={C.teal} fontFamily="system-ui">NK Cell</text>
      <text x={nkCx} y={nkCy + 10} textAnchor="middle" fontSize={9}
        fill={hex(C.teal, 0.7)} fontFamily="monospace">(Effector cell)</text>

      {/* FcγRIIIa receptor on NK cell bottom surface */}
      <rect x={nkCx - 20} y={nkCy + nkR - 4} width={40} height={24} rx={4}
        fill={hex(C.teal, 0.3)} stroke={C.teal} strokeWidth={1.5} />
      <text x={nkCx} y={nkCy + nkR + 10} textAnchor="middle" fontSize={9}
        fontFamily="monospace" fill={C.teal} fontWeight="600">FcγRIIIa</text>
      <text x={nkCx} y={nkCy + nkR + 22} textAnchor="middle" fontSize={8}
        fontFamily="monospace" fill={hex(C.teal, 0.6)}>CD16a</text>

      {/* ── Central mAb (Y-shape, Fab pointing down to antigen) ── */}
      {/* mAb Fab arms going down-left and down-right */}
      <line x1={200} y1={mabY} x2={mabFabLeft.x} y2={mabFabLeft.y - 10}
        stroke={C.blue} strokeWidth={3} strokeLinecap="round" />
      <line x1={200} y1={mabY} x2={mabFabRight.x} y2={mabFabRight.y - 10}
        stroke={C.blue} strokeWidth={3} strokeLinecap="round" />
      {/* Fab tip caps */}
      <circle cx={mabFabLeft.x} cy={mabFabLeft.y - 10} r={7}
        fill={hex(C.blue, 0.3)} stroke={C.blue} strokeWidth={1.5} />
      <circle cx={mabFabRight.x} cy={mabFabRight.y - 10} r={7}
        fill={hex(C.blue, 0.3)} stroke={C.blue} strokeWidth={1.5} />
      {/* Binding to antigen: short lines */}
      <line x1={mabFabLeft.x} y1={mabFabLeft.y - 3} x2={antigens[0]} y2={tumorY - 22}
        stroke={C.blue} strokeWidth={1.5} strokeDasharray="3,2" />
      <line x1={mabFabRight.x} y1={mabFabRight.y - 3} x2={antigens[1]} y2={tumorY - 22}
        stroke={C.blue} strokeWidth={1.5} strokeDasharray="3,2" />
      {/* mAb Fc (stem going up toward NK cell) */}
      <line x1={200} y1={mabY} x2={200} y2={mabFcTop}
        stroke={C.blue} strokeWidth={3} strokeLinecap="round" />
      {/* Fc block */}
      <rect x={185} y={mabFcTop - 24} width={30} height={26} rx={4}
        fill={hex(C.teal, 0.25)} stroke={C.teal} strokeWidth={1.5} />
      <text x={200} y={mabFcTop - 9} textAnchor="middle" fontSize={9}
        fontWeight="600" fill={C.teal} fontFamily="monospace">Fc</text>

      {/* Fc → FcγRIIIa engagement line */}
      <line x1={200} y1={mabFcTop - 24} x2={nkCx - 8} y2={nkCy + nkR - 4}
        stroke={C.teal} strokeWidth={1.5} strokeDasharray="5,3"
        markerEnd="url(#arr3)" />
      <text x={290} y={190} fontSize={9} fontFamily="monospace" fill={C.teal}>
        Fc binds FcγRIIIa
      </text>

      {/* mAb label */}
      <text x={130} y={mabY + 4} textAnchor="end" fontSize={11}
        fontFamily="system-ui" fontWeight="600" fill={C.blue}>mAb</text>

      {/* Cytotoxic granules (arrows from NK toward tumor) */}
      {[340, 360, 320, 345].map((gx, i) => (
        <line key={i} x1={gx + (i - 1.5) * 8} y1={nkCy + nkR + 28} x2={gx + (i - 1.5) * 8 + 6} y2={tumorY - 8}
          stroke={C.amber} strokeWidth={1.5} markerEnd="url(#arr2)" />
      ))}
      <text x={350} y={240} textAnchor="middle" fontSize={9}
        fontFamily="monospace" fill={C.amber}>Perforin / Granzyme</text>

      {/* Death indicator on tumor cell */}
      <text x={W - 50} y={tumorY + 30} fontSize={22} fill={C.red} opacity={0.5}>✕</text>
      <text x={W - 60} y={tumorY + 50} fontSize={9} fontFamily="monospace" fill={C.red}>Apoptosis</text>

      {/* Title */}
      <text x={10} y={H - 8} fontSize={10} fontFamily="monospace" fill={T.faint}>
        ADCC: FcγRIIIa (V158) allele increases NK-cell affinity ~3× · Afucosylation of N297 increases ADCC ~50×
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   5. FcRn RECYCLING  (effector-m4)
───────────────────────────────────────────── */
function FcrnRecyclingSVG() {
  const W = 520, H = 380;

  // Key positions
  const bloodY = 45, endoY = 250, lysoX = 420, lysoY = 280;
  const cellTopY = 120; // top of the cell

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <defs>
        <marker id="fcrn-arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill={C.teal} />
        </marker>
        <marker id="fcrn-arr-r" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill={C.red} />
        </marker>
        <marker id="fcrn-arr-b" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill={C.blue} />
        </marker>
      </defs>

      {/* ── Blood vessel / extracellular space ── */}
      <rect x={10} y={bloodY - 18} width={W - 20} height={58} rx={12}
        fill={hex(C.blue, 0.08)} stroke={C.blue} strokeWidth={1.5} />
      <text x={W / 2} y={bloodY + 6} textAnchor="middle" fontSize={13}
        fontWeight="600" fill={C.blue} fontFamily="system-ui">Bloodstream / Extracellular Space</text>
      <text x={W / 2} y={bloodY + 22} textAnchor="middle" fontSize={10}
        fontFamily="monospace" fill={hex(C.blue, 0.6)}>pH 7.4 · IgG does NOT bind FcRn</text>

      {/* IgG in circulation (Y shape, simple) */}
      {[80, 200].map((ix) => (
        <g key={ix}>
          <line x1={ix} y1={bloodY - 10} x2={ix - 12} y2={bloodY - 24} stroke={C.blue} strokeWidth={2} />
          <line x1={ix} y1={bloodY - 10} x2={ix + 12} y2={bloodY - 24} stroke={C.blue} strokeWidth={2} />
          <line x1={ix} y1={bloodY - 10} x2={ix} y2={bloodY - 4} stroke={C.blue} strokeWidth={2} />
        </g>
      ))}

      {/* ── Cell body ── */}
      <rect x={20} y={cellTopY} width={W - 40} height={120} rx={16}
        fill={hex(C.teal, 0.05)} stroke={T.border} strokeWidth={1.5} />
      <text x={30} y={cellTopY + 16} fontSize={9}
        fontFamily="monospace" fill={T.faint}>Endothelial / Macrophage cell</text>

      {/* Pinocytosis arrow (right side going down) */}
      <path d={`M 440 ${bloodY + 40} Q 460 ${(bloodY + endoY) / 2} 440 ${endoY - 30}`}
        fill="none" stroke={C.blue} strokeWidth={2} markerEnd="url(#fcrn-arr-b)" />
      <text x={462} y={(bloodY + endoY) / 2 + 4} fontSize={9}
        fontFamily="monospace" fill={C.blue}>Pinocytosis</text>

      {/* ── Endosome ── */}
      <ellipse cx={200} cy={endoY} rx={110} ry={58}
        fill={hex(C.amber, 0.12)} stroke={C.amber} strokeWidth={2} />
      <text x={200} y={endoY - 14} textAnchor="middle" fontSize={13}
        fontWeight="600" fill={C.amber} fontFamily="system-ui">Early Endosome</text>
      <text x={200} y={endoY + 4} textAnchor="middle" fontSize={10}
        fontFamily="monospace" fill={hex(C.amber, 0.8)}>pH 6.0 — IgG binds FcRn</text>
      <text x={200} y={endoY + 20} textAnchor="middle" fontSize={9}
        fontFamily="monospace" fill={hex(C.amber, 0.6)}>His310, His435 protonated</text>

      {/* IgG-FcRn complex inside endosome */}
      <g transform={`translate(200, ${endoY + 36})`}>
        <line x1={0} y1={0} x2={-10} y2={-16} stroke={C.blue} strokeWidth={2} />
        <line x1={0} y1={0} x2={10} y2={-16} stroke={C.blue} strokeWidth={2} />
        <line x1={0} y1={0} x2={0} y2={8} stroke={C.teal} strokeWidth={2.5} />
        <rect x={-16} y={8} width={32} height={14} rx={3}
          fill={hex(C.teal, 0.4)} stroke={C.teal} strokeWidth={1} />
        <text x={0} y={18} textAnchor="middle" fontSize={8}
          fontFamily="monospace" fill={C.teal}>FcRn</text>
      </g>

      {/* Recycling arrow (left arc: endosome → blood) */}
      <path d={`M 98 ${endoY - 20} Q 20 ${(endoY + bloodY) / 2} 60 ${bloodY + 40}`}
        fill="none" stroke={C.teal} strokeWidth={2.5} markerEnd="url(#fcrn-arr)" />
      <text x={8} y={(endoY + bloodY) / 2 - 6} fontSize={9}
        fontFamily="monospace" fill={C.teal} textAnchor="start">Recycled to</text>
      <text x={8} y={(endoY + bloodY) / 2 + 8} fontSize={9}
        fontFamily="monospace" fill={C.teal} textAnchor="start">circulation</text>
      <text x={8} y={(endoY + bloodY) / 2 + 22} fontSize={8}
        fontFamily="monospace" fill={hex(C.teal, 0.6)}>pH 7.4 → releases</text>

      {/* IgG leaving endosome (small Y shape on recycling path) */}
      <g transform={`translate(45, ${(endoY + bloodY) / 2 - 30})`}>
        <line x1={0} y1={0} x2={-8} y2={-12} stroke={C.blue} strokeWidth={1.8} />
        <line x1={0} y1={0} x2={8} y2={-12} stroke={C.blue} strokeWidth={1.8} />
        <line x1={0} y1={0} x2={0} y2={8} stroke={C.blue} strokeWidth={1.8} />
      </g>

      {/* Lysosome path (right: endosome → lysosome) */}
      <path d={`M 300 ${endoY} Q 370 ${endoY} ${lysoX - 30} ${lysoY - 30}`}
        fill="none" stroke={C.red} strokeWidth={1.5} strokeDasharray="5,3"
        markerEnd="url(#fcrn-arr-r)" />
      <text x={350} y={endoY - 12} fontSize={9}
        fontFamily="monospace" fill={C.red}>Unbound IgG</text>

      {/* Lysosome */}
      <ellipse cx={lysoX} cy={lysoY} rx={46} ry={34}
        fill={hex(C.red, 0.12)} stroke={C.red} strokeWidth={1.5} />
      <text x={lysoX} y={lysoY - 4} textAnchor="middle" fontSize={11}
        fontWeight="600" fill={C.red} fontFamily="system-ui">Lysosome</text>
      <text x={lysoX} y={lysoY + 12} textAnchor="middle" fontSize={9}
        fontFamily="monospace" fill={hex(C.red, 0.7)}>Degraded</text>

      {/* Summary bar */}
      <text x={W / 2} y={H - 14} textAnchor="middle" fontSize={9}
        fontFamily="monospace" fill={T.faint}>
        FcRn rescue → 21-day IgG half-life · YTE / LS mutations increase FcRn affinity → extended t½
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   6. CQA RISK MATRIX  (cqa-m0)
───────────────────────────────────────────── */
function CqaRiskMatrixSVG() {
  const W = 500, H = 380;
  const marginL = 70, marginB = 60, marginR = 20, marginT = 40;
  const plotW = W - marginL - marginR;
  const plotH = H - marginB - marginT;
  const x0 = marginL, y0 = marginT;

  // Impact (y) and Probability (x) are 0–1
  function px(p: number) { return x0 + p * plotW; }
  function py(p: number) { return y0 + plotH - p * plotH; }

  // CQA dots: [label, probability, impact, color]
  const cqas: [string, number, number, string][] = [
    ['Aggregation (HMWS)', 0.75, 0.92, C.red],
    ['Potency / Binding', 0.55, 0.96, C.red],
    ['Glycosylation (Fc)', 0.65, 0.80, C.red],
    ['Afucosylation (ADCC)', 0.50, 0.75, C.red],
    ['Deamidation (CDR)', 0.60, 0.65, C.amber],
    ['Oxidation (Met252)', 0.55, 0.62, C.amber],
    ['HCP impurities', 0.40, 0.70, C.amber],
    ['Charge variants', 0.70, 0.45, C.amber],
    ['C-term Lys (clipping)', 0.65, 0.20, C.green],
    ['N-term Gln (pGlu)', 0.60, 0.22, C.green],
    ['Colour / appearance', 0.30, 0.12, C.green],
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* Title */}
      <text x={W / 2} y={20} textAnchor="middle" fontSize={12}
        fontFamily="system-ui" fontWeight="700" fill={T.text}>CQA Risk Ranking Matrix</text>
      <text x={W / 2} y={34} textAnchor="middle" fontSize={9}
        fontFamily="monospace" fill={T.faint}>ICH Q8/Q9 — Severity × Probability</text>

      {/* Risk zone backgrounds */}
      {/* Low risk: bottom-left */}
      <rect x={px(0)} y={py(0.5)} width={plotW * 0.5} height={plotH * 0.5}
        fill={hex(C.green, 0.1)} />
      {/* Medium risk: diagonal */}
      <rect x={px(0)} y={py(1)} width={plotW * 0.5} height={plotH * 0.5}
        fill={hex(C.amber, 0.1)} />
      <rect x={px(0.5)} y={py(0.5)} width={plotW * 0.5} height={plotH * 0.5}
        fill={hex(C.amber, 0.1)} />
      {/* High risk: top-right */}
      <rect x={px(0.5)} y={py(1)} width={plotW * 0.5} height={plotH * 0.5}
        fill={hex(C.red, 0.12)} />

      {/* Zone labels */}
      <text x={px(0.25)} y={py(0.25) + 4} textAnchor="middle" fontSize={10}
        fontFamily="system-ui" fontWeight="600" fill={hex(C.green, 0.5)}>LOW</text>
      <text x={px(0.25)} y={py(0.75) + 4} textAnchor="middle" fontSize={10}
        fontFamily="system-ui" fontWeight="600" fill={hex(C.amber, 0.55)}>MEDIUM</text>
      <text x={px(0.75)} y={py(0.25) + 4} textAnchor="middle" fontSize={10}
        fontFamily="system-ui" fontWeight="600" fill={hex(C.amber, 0.55)}>MEDIUM</text>
      <text x={px(0.75)} y={py(0.75) + 4} textAnchor="middle" fontSize={10}
        fontFamily="system-ui" fontWeight="600" fill={hex(C.red, 0.55)}>HIGH</text>

      {/* Grid lines */}
      <line x1={px(0.5)} y1={py(0)} x2={px(0.5)} y2={py(1)}
        stroke={T.border} strokeWidth={1} strokeDasharray="4,3" />
      <line x1={px(0)} y1={py(0.5)} x2={px(1)} y2={py(0.5)}
        stroke={T.border} strokeWidth={1} strokeDasharray="4,3" />

      {/* Axes */}
      <line x1={px(0)} y1={py(0)} x2={px(1)} y2={py(0)}
        stroke={T.muted} strokeWidth={1.5} />
      <line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(1)}
        stroke={T.muted} strokeWidth={1.5} />

      {/* Axis labels */}
      <text x={px(0.5)} y={py(0) + 44} textAnchor="middle"
        fontSize={11} fontFamily="system-ui" fontWeight="600" fill={T.muted}>
        Probability of Impact on Patient
      </text>
      <text x={x0 - 50} y={py(0.5) + 4} textAnchor="middle"
        fontSize={11} fontFamily="system-ui" fontWeight="600" fill={T.muted}
        transform={`rotate(-90, ${x0 - 50}, ${py(0.5) + 4})`}>
        Clinical Impact Severity
      </text>

      {/* Axis tick labels */}
      {['Low', 'High'].map((label, i) => (
        <text key={label} x={px(i * 0.95 + 0.025)} y={py(0) + 16} textAnchor="middle"
          fontSize={9} fontFamily="monospace" fill={T.faint}>{label}</text>
      ))}
      {['Low', 'High'].map((label, i) => (
        <text key={label} x={x0 - 8} y={py(i * 0.95)} textAnchor="end" dominantBaseline="middle"
          fontSize={9} fontFamily="monospace" fill={T.faint}>{i === 1 ? 'High' : 'Low'}</text>
      ))}

      {/* CQA dots */}
      {cqas.map(([label, prob, impact, color]) => {
        const cx = px(prob), cy = py(impact);
        return (
          <g key={label}>
            <circle cx={cx} cy={cy} r={7} fill={hex(color, 0.35)} stroke={color} strokeWidth={1.5} />
            <text x={cx + 10} y={cy + 4} fontSize={8.5} fontFamily="monospace" fill={T.muted}>
              {label}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      {[
        { color: C.red, label: 'High CQA (must control)' },
        { color: C.amber, label: 'Medium CQA (monitor)' },
        { color: C.green, label: 'Low CQA / non-CQA' },
      ].map(({ color, label }, i) => (
        <g key={label}>
          <circle cx={x0 + 8} cy={py(0) + 54 + i * 16} r={5}
            fill={hex(color, 0.35)} stroke={color} strokeWidth={1.3} />
          <text x={x0 + 18} y={py(0) + 58 + i * 16} fontSize={9}
            fontFamily="monospace" fill={T.muted}>{label}</text>
        </g>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   REGISTRY  moduleId → diagram entry
───────────────────────────────────────────── */
interface DiagramEntry {
  Component: React.FC;
  caption: string;
}

const DIAGRAM_REGISTRY: Record<string, DiagramEntry> = {
  'structure-m0': {
    Component: IgGStructureSVG,
    caption: 'IgG1 quaternary structure showing two Fab arms (VH·VL / CH1·CL, blue), the flexible hinge (amber), and the Fc stem (CH2 teal + CH3 green) with biantennary N-glycans at Asn297 in each CH2 domain. Papain cleaves above the hinge; pepsin cleaves below.',
  },
  'structure-m2': {
    Component: ChainArchitectureSVG,
    caption: 'Linear domain architecture of the IgG1 heavy chain (HC, top) and light chain (LC, bottom) from N-terminus to C-terminus. Domain widths are proportional to residue count. HC–LC disulfide (C220–C214) and the N297 glycosylation site are indicated.',
  },
  'glycosylation-m0': {
    Component: NglycanCoreSVG,
    caption: 'Complex biantennary G2F N-glycan at Asn297 drawn in Oxford notation: GlcNAc (blue square), Mannose (green circle), Galactose (yellow circle), Core Fucose (red diamond), Sialic acid/NeuAc (purple diamond). Linkage positions and anomeric configurations (α/β) are labelled on each glycosidic bond.',
  },
  'moa-m1': {
    Component: AdccMechanismSVG,
    caption: 'ADCC mechanism: the therapeutic mAb opsonises the tumour cell via Fab-antigen binding, presenting its Fc domain to FcγRIIIa (CD16a) on an NK cell. Receptor crosslinking activates the NK cell, triggering degranulation of perforin and granzymes that induce target-cell apoptosis.',
  },
  'effector-m4': {
    Component: FcrnRecyclingSVG,
    caption: 'FcRn-mediated IgG recycling. At pH 6.0 in the early endosome, protonation of His310 and His435 drives high-affinity IgG–FcRn binding (Kd ~ nM). The complex is transcytosed back to the cell surface where pH 7.4 releases the IgG, extending serum half-life to ~21 days. Unbound IgG is directed to the lysosome and degraded.',
  },
  'cqa-m0': {
    Component: CqaRiskMatrixSVG,
    caption: 'ICH Q8/Q9 CQA risk ranking: quality attributes are plotted by probability of impacting patients (x-axis) × clinical severity of that impact (y-axis). Attributes in the upper-right quadrant (red) are designated High CQAs requiring tight process and analytical control.',
  },
};

/* ─────────────────────────────────────────────
   DIAGRAM PANEL  — public component
───────────────────────────────────────────── */
export default function DiagramPanel({ moduleId }: { moduleId: string }) {
  const entry = DIAGRAM_REGISTRY[moduleId];
  if (!entry) return null;
  const { Component, caption } = entry;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border)] card-glow mb-6"
    >
      {/* Label strip */}
      <div className="px-4 py-2.5 border-b border-[var(--border)] flex items-center gap-2">
        <span
          className="inline-block w-1.5 h-5 rounded-full"
          style={{ backgroundColor: 'var(--color-teal)' }}
        />
        <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-[0.14em] text-[var(--text-faint)]">
          Illustration
        </span>
      </div>

      {/* SVG area */}
      <div className="px-4 py-5 md:px-6">
        <Component />
      </div>

      {/* Caption */}
      <figcaption className="px-4 md:px-6 pb-4 text-[11px] font-[family-name:var(--font-mono)] text-[var(--text-faint)] leading-relaxed border-t border-[var(--border)] pt-3">
        <span style={{ color: 'var(--color-teal)' }}>Fig — </span>
        {caption}
      </figcaption>
    </motion.figure>
  );
}
