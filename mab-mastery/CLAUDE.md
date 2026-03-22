# mAb Mastery — CLAUDE.md
> Version 2.0 — Learning Studio Revamp
> Last updated: 2026-03-22

This file is the authoritative guide for AI-assisted development of **mAb Mastery**, a structured learning platform covering monoclonal antibody biology, CMC strategy, and Fc engineering. Read this fully before touching any code.

---

## 1. Project Identity

| Field | Value |
|---|---|
| App name | **mAb Mastery** |
| Tagline | Biology, engineering & CMC strategy for monoclonal antibodies |
| Scope | 70 modules across 6 disciplines (mAb Structure, Glycosylation, MoA, Fc Effector, Fc Engineering, CQAs & CMC) |
| Framework | React 19 + TypeScript + Vite 8 + Tailwind CSS v4 |
| State | Zustand 5 with `persist` middleware → localStorage key `mab-mastery-progress` |
| Dev port | `5174` (Vite), `3001` (optional AI chat proxy) |
| Repo | `https://github.com/ykacha/cmc-app.git` |
| Working dir | `mab-mastery/` inside the mono-repo |

---

## 2. Repository Layout

```
cmc-app/                          ← git root (mono-repo)
└── mab-mastery/                  ← THIS app (all work happens here)
    ├── CLAUDE.md                 ← this file
    ├── index.html
    ├── vite.config.ts            ← port 5174, proxy /api/chat → :3001
    ├── tsconfig.app.json
    ├── package.json
    ├── src/
    │   ├── main.tsx              ← BrowserRouter + StrictMode
    │   ├── App.tsx               ← Routes + Sidebar + main#main-scroll
    │   ├── index.css             ← Tailwind v4 @theme{} + all CSS vars + keyframes
    │   │
    │   ├── types/
    │   │   └── content.ts        ← ALL shared TypeScript types
    │   │
    │   ├── lib/
    │   │   ├── sections.ts       ← SECTIONS array + SECTION_MODULES + helpers
    │   │   └── anthropic.ts      ← Streaming AI chat helpers (sendChatMessage, getStarterQuestions)
    │   │
    │   ├── store/
    │   │   ├── progressStore.ts  ← Zustand: darkMode, sidebarOpen, visitedModules, quizScores
    │   │   └── chatStore.ts      ← Zustand: per-section chat history (NOT persisted)
    │   │
    │   ├── components/
    │   │   ├── ErrorBoundary.tsx
    │   │   ├── layout/
    │   │   │   ├── Sidebar.tsx       ← icon rail (56px) ↔ expanded panel (280px)
    │   │   │   ├── Topbar.tsx        ← sticky header + reading progress bar
    │   │   │   ├── ModuleLayout.tsx  ← 2-col grid: article + sticky TOC; injects DiagramPanel
    │   │   │   └── NavRow.tsx        ← prev/next module navigation footer
    │   │   └── ui/
    │   │       ├── DiagramPanel.tsx  ← SVG illustration registry (6 diagrams)
    │   │       ├── SectionRenderer.tsx ← dispatches ContentSection[] → UI components
    │   │       ├── Card.tsx          ← key-concept card with color accent
    │   │       ├── DataTable.tsx     ← sortable reference table
    │   │       ├── CodeBlock.tsx     ← syntax-highlighted code/formula block
    │   │       ├── BulletList.tsx    ← colored bullet list card
    │   │       ├── InfoBox.tsx       ← callout box (info/warning/success/danger)
    │   │       ├── GlycanDisplay.tsx ← Oxford-notation glycoform cards
    │   │       ├── DecisionTree.tsx  ← interactive decision tree
    │   │       ├── QuizCard.tsx      ← MCQ card with explanation reveal
    │   │       ├── ProgressRing.tsx  ← SVG circular progress indicator
    │   │       ├── DarkModeToggle.tsx
    │   │       ├── ResidueTag.tsx    ← amino-acid residue pill badge
    │   │       ├── StatGrid.tsx      ← grid of stat tiles
    │   │       └── AIChat.tsx        ← floating AI chat widget (Claude API, streaming)
    │   │
    │   ├── pages/
    │   │   ├── Dashboard.tsx     ← bento home: hero, stats row, 6 section cards
    │   │   ├── SectionPage.tsx   ← loads module content, wraps in ModuleLayout + AIChat
    │   │   └── QuizPage.tsx      ← quiz with progress dots, score bar, section filters
    │   │
    │   └── content/              ← ALL educational content lives here
    │       ├── quiz.ts           ← QuizQuestion[] for all sections
    │       ├── structure/        ← 14 modules (module0.ts … module13.ts + index.ts)
    │       ├── glycosylation/    ← 16 modules
    │       ├── moa/              ← 12 modules
    │       ├── effector/         ←  8 modules
    │       ├── engineering/      ← 10 modules
    │       └── cqa/              ← 10 modules
```

---

## 3. Content Architecture

### 3.1 ModuleContent shape (`src/types/content.ts`)

Every learning module is a `ModuleContent` object:

```typescript
interface ModuleContent {
  id: string;           // e.g. "structure-m0"  (sectionId + "-m" + 0-based index)
  sectionId: string;    // e.g. "structure"
  moduleNumber: number; // 0-based
  eyebrow: string;      // short category line shown above title, e.g. "STRUCTURE · MODULE 1"
  title: string;        // H1 of the module
  lead: string;         // 1–3 sentence intro paragraph
  tags: Tag[];          // colored keyword pills
  stats?: Stat[];       // 2–4 key numbers shown in a stat grid
  sections: ContentSection[];   // the actual content blocks
  mentorQuestions?: string[];   // reflection questions shown in collapsible at bottom
}
```

### 3.2 ContentSection union type

Every element in `sections[]` is one of:

| type | Component rendered | Required fields |
|------|-------------------|-----------------|
| `card` | `Card` | `title`, `content`, `color?` |
| `table` | `DataTable` | `title`, `headers[]`, `rows[][]`, `sortable?` |
| `code` | `CodeBlock` | `title`, `code`, `language?` |
| `bullets` | `BulletList` | `title`, `items[]`, `color?` |
| `callout` | `InfoBox` | `title`, `variant` (info/warning/success/danger), `content` |
| `glycan` | `GlycanDisplay` | `title`, `glycoforms[]` |
| `decision` | `DecisionTree` | `title`, `nodes[]` |

`SectionRenderer` wraps every section in `<div id="section-N">` for TOC anchor scrolling.

### 3.3 Content file pattern

Each section has an `index.ts` that re-exports an array:

```typescript
// src/content/structure/index.ts
export const structureModules: ModuleContent[] = [m0, m1, m2 /* … m13 */];
```

`SectionPage` imports from `../content/<sectionId>` and picks the module by URL index.

### 3.4 Adding a new module

1. Create `src/content/<sectionId>/module<N>.ts` — export a `ModuleContent` object
2. Import and append it to `src/content/<sectionId>/index.ts`
3. Increment `moduleCount` in `SECTIONS` array in `src/lib/sections.ts`
4. Add the module title to `SECTION_MODULES[sectionId]` in `src/lib/sections.ts`
5. Update the Dashboard stat "70 modules" and `getTotalProgress` denominator in `progressStore.ts`

---

## 4. Design System

### 4.1 Theme tokens (`src/index.css`)

The CSS custom property system is defined in `@theme {}` (Tailwind v4 syntax) and applied via `.dark` / `.light` class on the root `<div>` in `App.tsx`.

**Tailwind v4 note**: This project uses the new `@import "tailwindcss"` + `@theme {}` approach. There is **no `tailwind.config.js`**. All custom tokens live in `index.css`.

Key semantic variables (consumed everywhere via `var(--...)`):

```
--bg              Background base
--bg-card         Card/panel background
--bg-raised       Slightly elevated background (inputs, chips)
--border          All border strokes
--text            Primary text
--text-secondary  Body text
--text-muted      Captions, metadata
--text-faint      Placeholders, decorative

--rail-bg         Sidebar background (slightly different from --bg)
--sidebar-bg      Mobile drawer background
--sidebar-hover   Button hover state
--sidebar-active  Active nav item background

--topbar-bg       Header background (with opacity for blur)

--glow-teal       Teal ambient glow (tint background)
--glow-amber      Amber ambient glow
```

**Section brand colors** (hex, also available as CSS vars `var(--color-...)`):

| Section | Color hex | CSS var |
|---------|-----------|---------|
| mAb Structure | `#1976d2` | `--color-blue` |
| Glycosylation | `#00796b` | `--color-teal` |
| Mechanisms of Action | `#ef4444` | `--color-red` |
| Fc Effector Functions | `#8b5cf6` | `--color-purple` |
| Fc Engineering | `#f59e0b` | `--color-amber` |
| CQAs & CMC | `#10b981` | `--color-green` |

**Typography fonts** (loaded via Google Fonts in `index.html`):
- `--font-sans`: DM Sans (body)
- `--font-mono`: DM Mono (labels, stats, code)
- `--font-serif`: DM Serif Display (headings, hero)

### 4.2 CSS utility classes (defined in `index.css`)

| Class | Purpose |
|-------|---------|
| `.glass` | Frosted glass card (backdrop-blur + semi-transparent bg) |
| `.card-glow` | Subtle box-shadow on card hover |
| `.gradient-text` | Teal→blue gradient text for hero |
| `.aurora-blob` | Animated blurred background orb |
| `.glow-ring` | Glowing outer ring for ProgressRing |
| `.scrollbar-thin` | Custom thin scrollbar (webkit + firefox) |
| `.scrollbar-none` | Hide scrollbar |
| `.reading-progress-bar` | Absolute-positioned thin bar at Topbar bottom |
| `.sidebar-transition` | `transition: width 0.3s ease` for sidebar animation |
| `.main-transition` | `transition: margin-left 0.3s ease` for content area shift |
| `.tooltip-right` | CSS pseudo-element tooltip via `data-tooltip` attribute |

### 4.3 Tooltip system (collapsed sidebar)

The collapsed rail uses **CSS-only tooltips** via `.tooltip-right`:

```css
.tooltip-right::after {
  content: attr(data-tooltip);
  /* positioned left: calc(100% + 8px) — appears to the right of the rail */
}
```

**Critical**: The sidebar `<aside>` needs `overflow: visible` for tooltips to escape the sidebar boundary, but `overflow: hidden` during the width animation (to prevent content spill). This is solved by the `clipping` boolean state in `Sidebar.tsx`:

```typescript
const handleToggle = () => {
  setClipping(true);       // overflow: hidden during animation
  toggleSidebar();
  setTimeout(() => setClipping(false), 300);  // restore overflow: visible
};
```

---

## 5. State Management

### 5.1 `progressStore` (persisted to localStorage)

```typescript
interface ProgressState {
  darkMode: boolean;          // .dark / .light class on root
  toggleDarkMode: () => void;
  sidebarOpen: boolean;       // 280px expanded vs 56px rail
  toggleSidebar: () => void;
  visitedModules: string[];   // ["structure-m0", "glycosylation-m3", ...]
  markVisited: (id: string) => void;
  lastVisited: string | null; // drives "Continue Learning" button on Dashboard
  setLastVisited: (id: string) => void;
  quizScores: QuizScore[];    // {sectionId, questionId, correct, selectedIndex}[]
  addQuizScore: (score) => void;
  resetQuizScores: (sectionId?: string) => void;
  // Computed selectors (read-only):
  getModuleProgress(sectionId, totalModules): number  // 0–100
  getSectionQuizScore(sectionId): { correct, total }
  getTotalProgress(): number  // 0–100 based on 70 total modules
}
```

localStorage key: **`mab-mastery-progress`**

### 5.2 `chatStore` (NOT persisted — in-memory only)

```typescript
// histories: { [sectionId]: ChatMessage[] }
```

Chat history is ephemeral — cleared on page refresh by design.

### 5.3 Reading store values

Always use selector functions to avoid unnecessary re-renders:

```typescript
// ✅ Good — only re-renders when sidebarOpen changes
const sidebarOpen = useProgressStore((s) => s.sidebarOpen);

// ❌ Bad — re-renders on ANY store change
const store = useProgressStore();
```

---

## 6. Layout & Navigation

### 6.1 App shell

```
┌─────────────────────────────────────────────────┐
│ Sidebar (fixed, 56px rail OR 280px expanded)    │
├─────────────────────────────────────────────────┤
│                                                 │
│  <main id="main-scroll">                        │
│  ┌─────────────────────────────────────────┐   │
│  │  <Topbar> (sticky top-0)                │   │
│  │    reading progress bar at bottom       │   │
│  ├─────────────────────────────────────────┤   │
│  │  Page content (Dashboard / SectionPage  │   │
│  │  / QuizPage)                            │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

**`id="main-scroll"`** is critical — it is the actual scrolling container (not `window`). Any scroll-relative logic (TOC scrolling, reading progress, `scrollTo`) must target this element:

```typescript
const container = document.getElementById('main-scroll');
container?.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
```

The main content shifts via margin-left with `.main-transition`:
- Sidebar expanded → `md:ml-[280px]`
- Sidebar collapsed → `md:ml-14` (56px = 3.5rem)

### 6.2 Routes (`App.tsx`)

```
/                        → Dashboard
/structure/:moduleId     → SectionPage (sectionId="structure")
/glycosylation/:moduleId → SectionPage (sectionId="glycosylation")
/moa/:moduleId           → SectionPage (sectionId="moa")
/effector/:moduleId      → SectionPage (sectionId="effector")
/engineering/:moduleId   → SectionPage (sectionId="engineering")
/cqa/:moduleId           → SectionPage (sectionId="cqa")
/quiz                    → QuizPage (all sections)
/quiz/:sectionId         → QuizPage (pre-filtered)
*                        → redirect to /
```

`moduleId` URL param format: `m0`, `m1`, `m2` … (0-based, parsed with `parseInt(moduleId.replace('m', ''), 10)`)

### 6.3 ModuleLayout 2-column grid

On XL screens (`xl:` breakpoint), content uses a CSS grid:

```
xl:grid xl:grid-cols-[1fr_260px]
         ↑ article             ↑ sticky TOC aside
```

The TOC is only rendered when `tocItems.length > 2`. TOC items are auto-generated from `module.sections` that have a `title` field.

---

## 7. Diagram System

### 7.1 DiagramPanel (`src/components/ui/DiagramPanel.tsx`)

The diagram system adds contextual SVG illustrations to modules without modifying any content `.ts` files.

**Registry pattern:**

```typescript
const DIAGRAM_REGISTRY: Record<string, DiagramEntry> = {
  'structure-m0':     { Component: IgGStructureSVG,      caption: '...' },
  'structure-m2':     { Component: ChainArchitectureSVG, caption: '...' },
  'glycosylation-m0': { Component: NglycanCoreSVG,       caption: '...' },
  'moa-m1':           { Component: AdccMechanismSVG,     caption: '...' },
  'effector-m4':      { Component: FcrnRecyclingSVG,      caption: '...' },
  'cqa-m0':           { Component: CqaRiskMatrixSVG,     caption: '...' },
};
```

**Injection point:** `ModuleLayout.tsx` renders `<DiagramPanel moduleId={module.id} />` at the top of the `<article>`, before the `children` (SectionRenderer output). If no diagram is registered for the module, nothing is rendered.

**SVG conventions:**
- All SVGs use `viewBox="0 0 W H"` + `className="w-full"` (responsive)
- Colors use `T` object (CSS var references) for theme-aware text/backgrounds
- Domain colors use `C` object (explicit hex constants matching brand palette)
- `hex(color, alpha)` helper appends 2-digit hex alpha: `hex('#1976d2', 0.12)` → `'#1976d2'1f'`

**Adding a new diagram:**
1. Write the SVG React component in `DiagramPanel.tsx`
2. Add an entry to `DIAGRAM_REGISTRY` with the target module ID
3. No other files need changing

### 7.2 Current diagrams (v2)

| Module ID | Diagram | Description |
|-----------|---------|-------------|
| `structure-m0` | `IgGStructureSVG` | Full Y-shape IgG1 — domain boxes, CDR loops, hinge, glycan trees at N297, papain cleavage site, Fab/Fc bracket annotations |
| `structure-m2` | `ChainArchitectureSVG` | Linear domain map: HC (VH→CH1→Hinge→CH2→CH3) + LC (VL→CL), N297 lollipop, HC-LC disulfide, pairing brackets |
| `glycosylation-m0` | `NglycanCoreSVG` | Full G2F complex biantennary glycan in Oxford notation — GlcNAc (blue square), Mannose (green circle), Galactose (yellow circle), Fucose (red diamond), Sialic acid (purple diamond), linkage labels |
| `moa-m1` | `AdccMechanismSVG` | ADCC mechanism schematic — tumor cell, NK cell, bridging mAb, FcγRIIIa receptor, perforin/granzyme arrows |
| `effector-m4` | `FcrnRecyclingSVG` | FcRn recycling cycle — pH 7.4 bloodstream → pinocytosis → pH 6.0 endosome → recycling arc back OR lysosomal degradation |
| `cqa-m0` | `CqaRiskMatrixSVG` | ICH Q8/Q9 risk matrix — 2D scatter plot with 4 risk zone backgrounds, 11 real CQA dots (Aggregation, Potency, Glycosylation, Deamidation, Oxidation, etc.) |

---

## 8. AI Chat Feature

### 8.1 Architecture

- `AIChat.tsx` — floating chat widget, fixed bottom-right, per-section
- `lib/anthropic.ts` — streaming chat via `@anthropic-ai/sdk`; system prompt is mAb science tutor context
- `chatStore.ts` — per-section message history (in-memory, ephemeral)
- Proxy: Vite forwards `/api/chat` → `http://localhost:3001` (express server needed in production)

### 8.2 Starter questions

`getStarterQuestions(sectionId)` returns pre-defined prompts per section:

```typescript
// e.g. for "structure": ["What is the role of the CH2 domain?", ...]
```

These appear as chips before the user types their first message.

---

## 9. Progress & Quiz System

### 9.1 Module progress

`markVisited(moduleId)` is called in `SectionPage.tsx` via `useEffect` on every `currentModule` change. It adds the module's `id` string (e.g. `"glycosylation-m5"`) to `visitedModules[]` if not already present.

Progress percentage = `visitedModules.length / 70 * 100` (hard-coded denominator — update if module count changes).

### 9.2 Quiz

Quiz questions live in `src/content/quiz.ts` as `QuizQuestion[]`:

```typescript
interface QuizQuestion {
  id: string;
  sectionId: string;       // for section filter
  question: string;
  options: string[];       // 4 choices
  correctIndex: number;    // 0-based
  explanation: string;     // shown after answer
  difficulty: 'medium' | 'hard' | 'expert';
}
```

`QuizPage.tsx` features:
- **Section filter pills** — filter by `sectionId` or show all
- **Missed-only filter** — shows only incorrectly answered questions
- **Progress dot strip** — one dot per question, pill-shaped for current, green=correct/red=wrong/gray=unanswered, clickable to jump
- **Score breakdown bar** — animated green+red bar showing correct vs incorrect proportions
- **Reset** — `resetQuizScores(sectionId?)` clears scores for current filter or all

---

## 10. Sections Reference

```
SECTIONS array (src/lib/sections.ts):

id             title                    color     modules  basePath
────────────────────────────────────────────────────────────────────
structure      mAb Structure            #1976d2      14    /structure
glycosylation  Glycosylation            #00796b      16    /glycosylation
moa            Mechanisms of Action     #ef4444      12    /moa
effector       Fc Effector Functions    #8b5cf6       8    /effector
engineering    Fc Engineering           #f59e0b      10    /engineering
cqa            CQAs & CMC               #10b981      10    /cqa
                                               ─────────
                                   TOTAL           70
```

---

## 11. Development Commands

```bash
# Start dev server (port 5174)
cd mab-mastery
npm run dev

# Type-check only (zero output = clean)
npx tsc --noEmit

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 12. Conventions & Rules

### Code conventions
- **No default exports from layout components** — `Sidebar`, `Topbar`, `ModuleLayout` use named exports
- **Pages use default exports** — `Dashboard`, `SectionPage`, `QuizPage`, `App`
- **Content modules use named exports** — `export const structureModules: ModuleContent[]`
- **Zustand selectors** — always pass a selector function, never destructure the whole store
- **Framer Motion** — use `initial/animate/exit` pattern; never use CSS `transition` on elements that Framer controls
- **Inline `style` for dynamic/brand colors** — Tailwind classes for structural/spacing; `style={{ color: section.color }}` for section brand colors
- **CSS vars for all theme values** — `var(--bg-card)` not hardcoded hex in JSX

### Content conventions
- Module IDs follow `<sectionId>-m<0-based-number>` — e.g. `cqa-m0`, `structure-m13`
- `eyebrow` should be `"SECTION TITLE · MODULE N"` format (uppercase, centered dot separator)
- `lead` should be 2–4 sentences, written for a senior scientist / CMC director audience
- `stats` should use real regulatory/scientific numbers (ICH values, typical yields, etc.)
- `mentorQuestions` should be open-ended, suitable for a regulatory strategy interview

### DO NOT
- Do not add `max-w-3xl mx-auto` or any `max-w-*` container to module content — the layout is intentionally full-width with 2-col grid on XL
- Do not use `window.scrollTo` inside module pages — the scroll container is `#main-scroll`, not `window`
- Do not use `router.push` or `useNavigate` inside `SectionRenderer` or content components — they are purely presentational
- Do not hardcode `70` as module count anywhere except `getTotalProgress()` in `progressStore.ts`
- Do not add new dependencies without discussion — the project intentionally uses zero external UI libraries (no shadcn, no radix, no MUI)
- Do not push to GitHub without explicit user request

### DO
- Run `npx tsc --noEmit` before every commit — zero output required
- Keep all SVG diagrams in `DiagramPanel.tsx` (single file, registry pattern)
- When adding a diagram, verify the module ID matches exactly (format: `<sectionId>-m<N>`)
- Prefer `motion.div` from framer-motion over CSS keyframes for enter/exit animations
- Use `card-glow` class on any card that should have hover lift effect
- Keep `SECTION_MODULES` in sync with actual module titles when adding content

---

## 13. Versioning Convention

Before any major rewrite, save a backup:
- **Directory**: `src/versions/` (create if absent)
- **Naming**: `<ComponentName>-v<N>-<short-desc>.tsx`
- **Examples**: `ModuleLayout-v1-max-w-3xl.tsx`, `Dashboard-v1-pre-bento.tsx`
- Keep all versions — never delete

---

## 14. Version History

| Version | Date | Key Changes |
|---------|------|-------------|
| v1.0 | 2026-02 | Initial build — 70 modules, 6 sections, basic routing, Tailwind v4 setup |
| v2.0 | 2026-03-22 | **Learning Studio revamp** — icon rail sidebar (56↔280px), full-width 2-col module layout, bento Dashboard, Quiz progress dots, score bar, reading progress bar, Topbar redesign, SectionRenderer labels, BulletList card styling, **DiagramPanel** (6 scientific SVG illustrations injected by module ID) |

---

## 15. Future Work (not yet built)

- [ ] Search — full-text search across all 70 modules
- [ ] Bookmarks — save specific sections for review
- [ ] Flashcard mode — spaced repetition from module content
- [ ] Export — PDF/print-friendly module view
- [ ] Mobile TOC — bottom sheet TOC drawer on small screens
- [ ] More diagrams — target 1 diagram per module (64 more needed)
- [ ] CI/CD — Vercel deploy with DNS at yashkacha.com
