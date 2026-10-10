---
name: CMC App (Yash Kacha)
description: Biologics CMC end to end, presented as a molecular-graphics viewer of an IgG1 antibody.
colors:
  cpk-nitrogen: "#3D63DD"
  cpk-phosphorus: "#D9731A"
  cpk-sulfur: "#C99A06"
  cpk-oxygen: "#E0393E"
  cpk-chlorine: "#1F9D63"
  figure-accent: "#2C4FC7"
  figure-accent-2: "#B85F10"
  figure-chain-l: "#C96A12"
  figure-bridge: "#A87F00"
  figure-glycan: "#D02F35"
  figure-ok: "#168553"
  figure-bad: "#C8262C"
  figure-ground: "#F2F4F5"
  figure-panel: "#FFFFFF"
  figure-panel-2: "#F7F9FA"
  figure-ink: "#0A0E13"
  figure-text-body: "#1F262E"
  figure-text-sec: "#4A5662"
  figure-text-muted: "#6B7783"
  figure-text-faint: "#98A3AE"
  figure-hairline: "#DCE2E7"
  figure-border-bright: "#BCC6CF"
  viewer-accent: "#6F8FF2"
  viewer-accent-2: "#F0A04B"
  viewer-bridge: "#F2C84B"
  viewer-glycan: "#F2555A"
  viewer-ok: "#3CC48A"
  viewer-ground: "#05070A"
  viewer-panel: "#0B0F14"
  viewer-panel-2: "#10161D"
  viewer-ink: "#F4F7FA"
  viewer-text-body: "#D5DCE3"
  viewer-text-sec: "#9AA7B4"
  viewer-text-muted: "#6E7B88"
  viewer-text-faint: "#4A5561"
  viewer-hairline: "#1C252F"
  viewer-border-bright: "#27323E"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(42px, min(6vw, 9.5vh), 100px)"
    fontWeight: 850
    lineHeight: 0.92
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(30px, 3.6vw, 52px)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 118"
  page-title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(34px, 4.6vw, 60px)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 122"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 115"
  body-lede:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "14.5px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.005em"
  readout:
    fontFamily: "JetBrains Mono, ui-monospace, Menlo, monospace"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: 1
    fontFeature: "'tnum'"
  value:
    fontFamily: "JetBrains Mono, ui-monospace, Menlo, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.2
    fontFeature: "'tnum'"
rounded:
  tick: "2px"
  focus: "3px"
  card: "16px"
  pill: "999px"
spacing:
  bond: "2px"
  xs: "6px"
  sm: "10px"
  md: "14px"
  row: "22px"
  gutter-mobile: "16px"
  gutter: "28px"
  block: "44px"
  section: "110px"
  close: "140px"
components:
  button-primary:
    backgroundColor: "{colors.cpk-nitrogen}"
    textColor: "{colors.figure-panel}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.figure-ink}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.figure-text-sec}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "9px 14px"
  tab-selected:
    backgroundColor: "{colors.figure-accent}"
    textColor: "{colors.figure-panel}"
    rounded: "{rounded.pill}"
    padding: "9px 14px"
  chip:
    textColor: "{colors.figure-ink}"
    rounded: "{rounded.pill}"
    padding: "4px 8px 4px 7px"
  question-card:
    backgroundColor: "{colors.figure-panel}"
    textColor: "{colors.figure-ink}"
    rounded: "{rounded.card}"
    padding: "36px 40px"
  masthead:
    backgroundColor: "{colors.figure-ground}"
    textColor: "{colors.figure-ink}"
    height: "58px"
    padding: "0 28px"
  track-cell-bar:
    backgroundColor: "{colors.figure-accent}"
    rounded: "{rounded.tick}"
    height: "4px"
---

# Design System: CMC App (Yash Kacha)

## Overview

**Creative North Star: "The Structure Viewer"**

The site is an IgG1 antibody you can turn in your hands. Every surface behaves like molecular-graphics software or the figure it exports: a near-black viewer ground in dark mode, a white journal-figure ground in light mode (the default for new visitors), and color that only ever means a structural role. The home page is a full-bleed canvas molecule (depth-shaded spheres, leader-line labels, a Stress mode that heats the regions a condition attacks); every other page reads the same chain of roles through the sequence track at the top of the window.

Density is that of a scientific figure: wide, heavy Archivo headlines set against quiet hairline-ruled lists, with measured values in JetBrains Mono. Navigation and indexes are not card grids; they are rows of identical "residue" cells, each led by a 4px track bar in its segment's color. The world explicitly refuses the portfolio template (name, headshot, card grid), the editorial broadsheet look the site wore before, and the rainbow "liquid chrome" the owner rejected.

**Key Characteristics:**
- Two designed grounds: viewer black and figure white, both first-class.
- Color is chemistry: CPK element roles, never decoration.
- Wide display type (Archivo, width 112 to 125%) over a plain Archivo text voice.
- Mono only for values, units and conditions.
- Hairlines and track bars instead of cards and shadows.
- One state vocabulary everywhere: hover outlines, selected fills, disabled ghosts.
- Section URLs are shareable (`#/methods/am-sec`).

## Colors

A CPK palette on a neutral graphite ground: five element hues carry every meaning, and each has a mid-tone constant plus per-theme role tokens tuned to hold contrast on its ground.

### Primary
- **Nitrogen Blue** (`cpk-nitrogen`): the heavy chain and the primary action. Fills the main call-to-action button in both themes. Its theme roles are **Figure Accent** (`figure-accent`) and **Viewer Accent** (`viewer-accent`), used for links, selected tabs, the SEC trace line, focus rings, and the heavy-chain beads (`--chain-h` equals `--accent` in both themes).

### Secondary
- **Phosphorus Orange** (`cpk-phosphorus`): the light chain and caution. Theme roles `figure-chain-l` / `viewer-accent-2`; also `--accent-2` (the live cursor in the SEC trace, the "Acquiring" dot) and `--warn`.

### Tertiary
- **Sulfur Yellow** (`cpk-sulfur`): disulfide bridges, cross-links, highlights. Theme roles `figure-bridge` / `viewer-bridge`; colors the Tools segment of the sequence track.
- **Oxygen Red** (`cpk-oxygen`): glycan, critical, failure. Theme roles `figure-glycan` / `viewer-glycan`, `figure-bad`. Selected Stress-mode tabs fill with it, stressed beads glow in it, and the stress condition line is set in it.
- **Chlorine Green** (`cpk-chlorine`): conforms, pass. Theme roles `figure-ok` / `viewer-ok`.

### Neutral
- **Figure Ground / Viewer Ground** (`figure-ground`, `viewer-ground`): the page. Never pure white or pure black.
- **Panel** (`figure-panel`, `viewer-panel`; `-panel-2` one step up): the only filled surfaces (question card, SEC trace frame, assay chips).
- **Ink** (`figure-ink`, `viewer-ink`): headings, selected labels, values.
- **Text ramp** (`text-body` > `text-sec` > `text-muted` > `text-faint`): body, supporting copy, captions and hints, then axis ticks and segment names.
- **Hairline** (`figure-hairline`, `viewer-hairline`): every rule, table border, row divider. **Border Bright** is for the secondary button's outline and scrollbars.

### Named Rules
**The CPK Role Rule.** A hue means its element role and nothing else: nitrogen blue = heavy chain and primary action, phosphorus orange = light chain and caution, sulfur yellow = bridges and highlight, oxygen red = glycan, critical and failure, chlorine green = pass. If a color has no structural or status meaning, use ink or a neutral instead.

**The Segment Color Rule.** The five navigation groups are chain segments, set by `--seg`: Learn = heavy chain, Science = light chain, Tools = bridge, Practice = glycan, Career = muted ink. Any index of sections (sequence track, home rows) uses exactly this mapping.

## Typography

**Display Font:** Archivo, variable width axis (with system-ui fallback)
**Body Font:** Archivo (with system-ui, -apple-system, Segoe UI)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SFMono-Regular, Menlo)

**Character:** One family at two widths. Archivo stretched wide and very heavy reads like a figure title on a structure paper. At normal width it stays plain and legible. JetBrains Mono appears only where a number is being reported.

### Hierarchy
- **Display** (850, width 125%, `clamp(42px, min(6vw, 9.5vh), 100px)`, line-height 0.92): the home headline "From sequence to shelf." and the closing line. One per page at most.
- **Page Title** (800, width 122%, `clamp(34px, 4.6vw, 60px)`, line-height 1, balanced wrap): the title of every tool page (`PageHead` / `SectionHeader`).
- **Headline** (800, width 118%, `clamp(30px, 3.6vw, 52px)`, line-height 1.02, max 20ch): section heads on the home page.
- **Title** (800, width 112 to 115%, 19 to 22px): the name in an index cell (method abbreviation, pipeline stage) and the hover readout.
- **Body Lede** (400, 17px, line-height 1.55, max 66ch): page subtitles and the home lede (15.5 to 18.5px, max 44ch beside the molecule).
- **Body** (400, 13 to 16.5px, line-height 1.5 to 1.65): cell descriptions, answers, table text.
- **Label** (600 to 700, 12 to 14px, sentence case): tabs, chips, buttons, row names, table headers.
- **Readout / Value** (JetBrains Mono, tabular numbers): fact readouts at 26px/600 (21px on mobile), units, conditions and table values at 11 to 13px.

### Named Rules
**The Wide Display Rule.** h1 and h2 are always Archivo set wide (width 112% minimum, 118 to 125% for display) with negative tracking (-0.02 to -0.035em). Body copy is never stretched.

**The Mono-for-Measurements Rule.** JetBrains Mono is reserved for values, units, residue numbers, run conditions and keyboard hints. Never for prose, headings, or labels in capitals.

**The 66ch Rule.** Reading copy holds a measure of at most 66ch (`.sv-measure`, page subtitles).

## Layout

Content sits in a 1360px container (the home hero widens to 1440px) with a 28px side gutter that drops to 16px under 720 to 860px. The home hero is a two-column grid of 5fr copy and 6fr molecule stage, filling the viewport height (minimum 600px) with the canvas bleeding to the right edge; under 860px it stacks headline, molecule (72vw tall, 320 to 520px) and Stress panel.

Rhythm is vertical and generous between sections (110px, 80px on mobile; 140px before the closing line) and tight inside them (22px row padding, 10px cell gap). Indexes are grids of identical cells: home rows use a 140px row label and six cells (three under 1100px, two under 860px); method cells auto-fill at 260px minimum; pipeline cells use four columns (two under 1000px, one under 560px). Data tables scroll horizontally inside their own wrapper (minimum 860px) rather than squeezing.

**The Identical Cell Rule.** An index is a set of identical cells (track bar, name, one line), never cards of varying size. Hierarchy comes from the row's segment, not from making one cell bigger.

## Elevation & Depth

The interface is flat. Surfaces are separated by 1px hairlines and a single panel fill; none of the Structure Viewer atoms cast a shadow. Real depth lives only inside the molecule canvas, where beads are depth-sorted, depth-shaded sphere sprites. The one material effect in the chrome is the sticky masthead: the ground at 92% opacity with `saturate(1.4) blur(10px)` behind it, so content passes under it like a viewer toolbar.

The theme defines `--shadow-sm`, `--shadow` and `--shadow-lg`; they serve older views only (see Do's and Don'ts).

**The Hairline-Not-Shadow Rule.** Separate with a 1px hairline or a panel fill. If something seems to need a shadow to stand out, it needs a better position or a role color instead.

## Shapes

Three shapes recur. Interactive controls (buttons, tabs, chips, assay links, molecule labels) are full pills (999px). Track bars are 4px tall with 2px rounded ends, the visual atom of the whole system: they lead every navigation cell, home cell, method cell, pipeline cell and row label, and the four-part chain rule under page titles (heavy chain, bridge, light chain, glycan in 5 : 1 : 3 : 0.5 proportion). Containers are rare and either squared (the SEC trace frame, 2px) or softly rounded (the question card, 16px). Focus rings are a 2px accent outline offset 2px with a 3px radius.

## Components

### Buttons
Confident and round, two weights only.
- **Shape:** full pill (999px), 48px tall, 0 22px padding, 15px/700 label.
- **Primary:** nitrogen blue fill, white label, same-color border. Hover darkens to nitrogen mixed 84% with black and lifts 1px.
- **Secondary:** transparent, ink label, border-bright outline; hover turns the outline to ink.
- **Text link:** accent color, 1px underline offset 4px, thickening to 2px on hover. Used for "Another question", "Open SEC-HPLC" and other in-place actions.

### Tabs and filters (`sv-tab`)
The single control for modes, filters and Stress conditions.
- **Default:** transparent, hairline outline, text-sec label (13px/600).
- **Hover:** outline takes the tab's role color (`--tab`), label goes to ink.
- **Selected:** filled with the role color, white label.
- **Disabled:** 35% opacity.
- `PageHead` places a row of these under the page title as the page's mode bar; `FilterBtn` is the same control with an optional role color.

### Chips (`sv-chip`)
- **Style:** pill, 11px/600 ink label, a 6px dot in the chip's role color, background the role color at 12%.
- **Use:** levels (Foundational = chlorine, Intermediate = nitrogen, Advanced = phosphorus, Expert = oxygen), method roles, tags. Chips are labels, not buttons.

### Cards / Containers
- **Question card:** panel fill, hairline border, 16px radius, 36px 40px padding (24px 20px on mobile), no shadow. The answer opens in two columns with a 0.35s drop-in.
- **Instrument frame (SEC trace):** panel fill, hairline border, 2px radius, a mono header strip (method in accent, lot, live status dot) and a mono footer of readings.

### Navigation
- **Masthead:** sticky, 58px row: DNA monogram plus "Yash Kacha" (800, width 118%) and the "CMC App" product label behind a hairline divider; on the right, pill ghost buttons for search (with a mono `⌘K` hint), index and theme.
- **Sequence track:** below the masthead, every section is a residue cell on one chain, grouped into the five segments. Each cell is a 4px bar (segment color at 32%, 70% on hover, solid when current) above a 12px short name (muted, ink on hover, ink 700 when current). Scrolls horizontally on narrow screens with no scrollbar.
- **Routing:** hash URLs `#/<view>/<focus>` make any section, method or stage shareable; view changes cross-fade through the View Transitions API with the masthead held still.

### Index cells (home rows, method atlas, pipeline overview)
Track bar (segment or category color at 30 to 35%, solid on hover), a wide 800-weight name that turns accent on hover, a one-line description in muted text clamped to three lines. No background, no border, no radius.

### Page head and fact readout
Page title, 17px subtitle at 66ch, optional chain rule, then a facts strip: hairline above and below, figures in 26px mono over a 12.5px muted caption, separated by vertical hairlines. Then the mode bar of tabs.

### Data table (`sv-table`)
Hairline-ruled rows, 12.5px muted headers, values in mono, a description column capped at 40ch. Rows are selectable: hover tints with the row's role color at 6%, selected at 12%, focus shows an inset accent outline.

### Signature: the molecule viewer
A canvas IgG1 model built from depth-sorted sphere beads colored by `--chain-h`, `--chain-l`, `--bridge` and `--glycan`, read live from the app root so it follows the theme. It assembles once from a scatter, turns slowly, is draggable, and carries pill labels on leader lines (`mv-label`, outline goes ink on hover or press). Hovering a domain fills the readout below the stage; clicking opens the matching assay. **Stress mode** (Heat, Low pH, Light, Agitation, High pH) re-colors the attacked beads in oxygen red and shows the condition in mono, the mechanism in one sentence, and assay pills ("Measured by") linking to Methods. With reduced motion it renders still.

## Do's and Don'ts

### Do:
- **Do** take every color from a role token (`--chain-h`, `--chain-l`, `--bridge`, `--glycan`, `--ok`, `--warn`, `--bad`, `--accent`) so both grounds hold contrast.
- **Do** use one state vocabulary everywhere: hover = outline in the role color, selected = filled with the role color, disabled = 35% opacity.
- **Do** lead every navigable index item with a 4px track bar (2px radius) in its segment color, and keep the cells identical.
- **Do** set h1 and h2 in Archivo at width 112 to 125%, weight 800 to 850, tracking -0.02 to -0.035em.
- **Do** put numbers, units and run conditions in JetBrains Mono with tabular figures.
- **Do** cap reading copy at 66ch.
- **Do** give every tool page the `PageHead`: wide title, one-paragraph subtitle, mode tabs.
- **Do** design both themes; new visitors land on the light figure ground.
- **Do** render a finished, still state under `prefers-reduced-motion` (molecule, SEC trace, reveals, view transitions).

### Don't:
- **Don't** use a CPK hue decoratively or outside its role.
- **Don't** add drop shadows, gradients or glass to Structure Viewer surfaces; separate with hairlines.
- **Don't** build indexes as card grids of mixed sizes or nest cards inside cards.
- **Don't** use emoji in the interface; use the monoline set in `src/icons.js`.
- **Don't** return to rainbow or iridescent "liquid chrome", or to the earlier editorial-broadsheet styling.
- **Don't** hardcode hex colors in inline styles; colors that bypass the tokens break on one of the two grounds.
- **Don't** put uppercase tracked mono labels above headings; the system has no eyebrow tier.
