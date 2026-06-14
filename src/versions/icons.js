/* ──────────────────────────────────────────────────────────────
   Praxis icon set — custom monoline glyphs (stroke=currentColor).
   Calm, geometric, scientific. Replaces emoji across the app.
   ────────────────────────────────────────────────────────────── */
const F = "currentColor";
const PATHS = {
  // ── modules ──
  pipeline: <><path d="M4 7h4a3 3 0 0 1 3 3v4a3 3 0 0 0 3 3h6"/><circle cx="4" cy="7" r="1.6" fill={F} stroke="none"/><circle cx="20" cy="17" r="1.6" fill={F} stroke="none"/></>,
  methods:  <><path d="M9 3h6M10 3v5.5L5.2 17a2 2 0 0 0 1.8 3h10a2 2 0 0 0 1.8-3L14 8.5V3"/><path d="M7.7 14.5h8.6"/></>,
  qbd:      <><circle cx="12" cy="12" r="8.2"/><circle cx="12" cy="12" r="3.6"/><circle cx="12" cy="12" r="0.6" fill={F} stroke="none"/></>,
  ctd:      <><path d="M12 3l8.5 4.5L12 12 3.5 7.5 12 3z"/><path d="M4 12l8 4.5L20 12"/><path d="M4 16.5l8 4.5 8-4.5"/></>,
  timeline: <><path d="M3 12h18"/><path d="M6.5 12v-3M12 12v-4M17.5 12v-3"/><circle cx="6.5" cy="15" r="1.3" fill={F} stroke="none"/><circle cx="12" cy="15" r="1.3" fill={F} stroke="none"/><circle cx="17.5" cy="15" r="1.3" fill={F} stroke="none"/></>,
  domains:  <><rect x="3.5" y="3.5" width="7" height="7" rx="1.4"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.4"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.4"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.4"/></>,
  exam:     <><circle cx="12" cy="12" r="8.2"/><path d="M8.3 12.2l2.5 2.5 5-5.4"/></>,
  ich:      <><circle cx="12" cy="12" r="8.2"/><path d="M3.8 12h16.4"/><path d="M12 3.8c2.6 2.3 2.6 14.1 0 16.4-2.6-2.3-2.6-14.1 0-16.4z"/></>,
  career:   <><path d="M4 17l5-5 4 4 7-8"/><path d="M16 8h4v4"/></>,
  notes:    <><path d="M5 18.5l1-4L16 4.5a1.8 1.8 0 0 1 2.5 0l1 1a1.8 1.8 0 0 1 0 2.5L9.5 18l-4.5.5z"/><path d="M14 7l3 3"/></>,
  glossary: <><path d="M12 6.5C9.5 4.8 6 4.8 4 5.8v13c2-1 5.5-1 8 .7 2.5-1.7 6-1.7 8-.7v-13c-2-1-5.5-1-8 .7z"/><path d="M12 6.5V20"/></>,
  stability:<><path d="M12 3l7.5 3.2v5.3c0 4.4-3.2 7.6-7.5 9.2-4.3-1.6-7.5-4.8-7.5-9.2V6.2z"/><path d="M9 12l2 2 4-4.3"/></>,
  oos:      <><path d="M12 3.6l8.6 15.3a1 1 0 0 1-.9 1.5H4.3a1 1 0 0 1-.9-1.5z"/><path d="M12 9.5v4.2"/><circle cx="12" cy="17" r="0.7" fill={F} stroke="none"/></>,
  batch:    <><rect x="5" y="4" width="14" height="17" rx="2.2"/><path d="M9 3.6h6v2.2H9z"/><path d="M8.5 11h7M8.5 14.5h7M8.5 18h4"/></>,
  cases:    <><path d="M6 3.5h7.5L18.5 8.5v12H6z"/><path d="M13.5 3.5v5h5"/><path d="M9 13h6M9 16.5h6"/></>,
  compendial:<><path d="M4 5.5h6.5a2 2 0 0 1 2 2V20a2.4 2.4 0 0 0-2-1H4z"/><path d="M20 5.5h-6.5a2 2 0 0 0-2 2V20a2.4 2.4 0 0 1 2-1H20z"/></>,
  excipient:<><circle cx="6" cy="12" r="2.2"/><circle cx="18" cy="7.5" r="2.2"/><circle cx="16.5" cy="17" r="2.2"/><path d="M7.9 11l8-2.7M7.8 13.2l7 3.1"/></>,
  pathway:  <><path d="M6 21V4.5"/><path d="M6 5h10l-2.2 3.2L16 11.5H6"/><circle cx="6" cy="21" r="0.8" fill={F} stroke="none"/></>,
  progress: <><path d="M4 19.5h16"/><path d="M7 16.5v-4M12 16.5v-9M17 16.5v-6"/></>,
  viral:    <><circle cx="12" cy="12" r="4.4"/><path d="M12 3v3.6M12 17.4V21M3 12h3.6M17.4 12H21M5.6 5.6l2.5 2.5M15.9 15.9l2.5 2.5M18.4 5.6l-2.5 2.5M8.1 15.9l-2.5 2.5"/><circle cx="12" cy="3" r="0.9" fill={F} stroke="none"/><circle cx="12" cy="21" r="0.9" fill={F} stroke="none"/><circle cx="3" cy="12" r="0.9" fill={F} stroke="none"/><circle cx="21" cy="12" r="0.9" fill={F} stroke="none"/></>,

  // ── nav groups ──
  learn:    <><path d="M3.5 6.5l8.5-3 8.5 3-8.5 3-8.5-3z"/><path d="M7 8.2v5c0 1.4 2.2 2.8 5 2.8s5-1.4 5-2.8v-5"/><path d="M20.5 6.5v5"/></>,
  science:  <><path d="M9.5 3h5M10.3 3v4.6L5.6 16a2 2 0 0 0 1.8 3h9.2a2 2 0 0 0 1.8-3L13.7 7.6V3"/><circle cx="10.5" cy="14" r="1" fill={F} stroke="none"/><circle cx="13.5" cy="16.5" r="1" fill={F} stroke="none"/></>,
  tools:    <><path d="M14.5 6.5a3.8 3.8 0 0 0-5 5l-6 6 2 2 6-6a3.8 3.8 0 0 0 5-5l-2.3 2.3-2-2 2.3-2.3z"/></>,
  practice: <><circle cx="12" cy="12" r="8.2"/><circle cx="12" cy="12" r="3.6"/><circle cx="12" cy="12" r="0.6" fill={F} stroke="none"/></>,

  // ── pipeline stage glyphs ──
  gene:     <><path d="M8 3c0 5 8 5 8 9s-8 4-8 9"/><path d="M16 3c0 5-8 5-8 9s8 4 8 9"/><path d="M9 6h6M9.5 9h5M9.5 15h5M9 18h6"/></>,
  bolt:     <><path d="M13 2.5L5 13h5l-1 8.5L18 11h-5z"/></>,
  cell:     <><circle cx="12" cy="12" r="8.2"/><circle cx="12" cy="12" r="3"/><circle cx="9" cy="8.5" r="0.9" fill={F} stroke="none"/></>,
  vault:    <><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="12" cy="12" r="3.4"/><path d="M12 8.6v-1M12 16.4v1M8.6 12h-1M16.4 12h1"/></>,
  bioreactor:<><path d="M7 4h10M8 4v3a4 4 0 0 1-1 2.6L6 11.5V19a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19v-7.5l-1-1.9A4 4 0 0 1 16 7V4"/><path d="M6.4 14.5c2-1.4 4-1.4 6 0s4 1.4 5.2.4"/></>,
  filter:   <><path d="M3.5 5h17l-6.5 8v6l-4 1.5V13z"/></>,
  wave:     <><path d="M3 16h3l1.6-9 2.4 13 2.2-15 2 11 1.8-6h4"/></>,
  vial:     <><path d="M9 3h6M10 3v15a2 2 0 0 0 4 0V3"/><path d="M10 9h4"/><circle cx="12" cy="15" r="1.1" fill={F} stroke="none"/></>,
  transfer: <><path d="M4 8h12l-3-3M4 8l3 3"/><path d="M20 16H8l3 3M20 16l-3-3"/></>,
  factory:  <><path d="M3.5 20.5V10l5 3.5V10l5 3.5V10l5 3.5v7z"/><path d="M3.5 20.5h17"/><path d="M7 16.5h2M12 16.5h2M16.5 16.5h2"/></>,
  shieldcheck:<><path d="M12 3l7.5 3.2v5.3c0 4.4-3.2 7.6-7.5 9.2-4.3-1.6-7.5-4.8-7.5-9.2V6.2z"/><path d="M8.8 12l2.2 2.2 4.2-4.5"/></>,
  infinity: <><path d="M8 9c-2.2 0-4 1.3-4 3s1.8 3 4 3c3 0 5-6 8-6 2.2 0 4 1.3 4 3s-1.8 3-4 3c-3 0-5-6-8-6z"/></>,

  dot: <circle cx="12" cy="12" r="3" fill={F} stroke="none"/>,
};

const STAGE = {
  s01:"gene", s02:"bolt", s03:"cell", s04:"vault", s05:"bioreactor", s06:"filter",
  s07:"wave", s08:"vial", s09:"transfer", s10:"factory", s11:"qbd", s12:"shieldcheck",
  s13:"factory", s14:"stability", s15:"cases", s16:"infinity",
};
export const stageIcon = (id) => STAGE[id] || "pipeline";

export function Icon({ name, size = 20, sw = 1.7, style, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={F} strokeWidth={sw}
      strokeLinecap="round" strokeLinejoin="round" style={style} className={className} aria-hidden="true">
      {PATHS[name] || PATHS.dot}
    </svg>
  );
}
