---
version: 1
slug: "src-views-dashboard-js"
primary_target: "src/views/Dashboard.js"
related_targets: ["src/App.js"]
---

# Home (portfolio landing), mode: Persuade

Audience: recruiters, hiring managers and CMC leaders judging Yash Kacha's depth. Action: enter the work (Pipeline, Methods) within one screen.
Scope this round: Home, Pipeline, Methods, Stability, OOS, Exam, plus global nav, tokens and shared components. Other views inherit tokens only.

## Direction contract
THESIS: The site is an IgG antibody you can turn in your hands; each domain opens the CMC knowledge about it. Refuses the portfolio template (name, headshot, card grid) and the editorial-broadsheet look the site wore before.
OWN-WORLD: Molecular-graphics viewer. Ground: viewer black #05070A (dark) / figure white #F2F4F5 (light). CPK element roles: nitrogen blue #2F55D4 = heavy chain and primary action; phosphorus orange #E0821E = light chain; sulfur yellow #E9B308 = bridges, cross-links, highlights; oxygen red #D9362B = glycan, critical, failure; carbon graphite = ink. Archivo at wide width for display, Archivo for text, JetBrains Mono only for residue numbers, values and units. Depth-shaded sphere models, leader-line labels, sequence tracks.
STORY: Visitor sees a monumental antibody, reads "From sequence to shelf.", hovers domains to see what CMC knowledge lives there, tries Stress mode to watch the molecule degrade and where each failure is measured, then enters the Pipeline or Methods.
FIRST VIEWPORT: Full-bleed canvas molecule filling the right two-thirds, turning slowly, draggable, domain labels on leader lines. Left: wide display headline at ~7vw, one-line subhead, primary action "Enter the pipeline" and secondary "Open the assays". Under the actions: Stress mode control (Heat, Low pH, Light, Agitation, High pH) with a live callout. High pH added beyond the original four because Asn deamidation is the most common charge-variant pathway reviewers ask about. Molecule takes the right ~55% so the headline and controls keep a readable measure. Top: sequence-track navigation whose segments are the site's sections.
FORM: Structure Viewer, grounded list position 4 of 7, seed key e56f9dc3. Raises: Stress mode (gravity-rain), identical domain-cell index (VU bridge), strict state vocabulary (one-bit), 66ch reading measure (zine), named shareable URLs (cyclorama).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
