# Science platform plan and checkpoint

Living document for the seven-phase rebuild. Update the checkpoint at the end of every phase.

## Stack (audited 2026-10-10)
- React 19, Create React App, no UI or chart libraries. Inline styles plus `src/index.css`, `src/fx.css`, per-area CSS.
- State routing in `src/App.js` with hash URLs: `#/<view>/<focus...>`.
- Content lives in `src/*-data.js`; the new Science model lives in `src/science/`.
- Baseline before Phase 1: build passed; the only test (CRA default) failed; no OpenAI integration.

## Architecture
- **Science journey** `#/science/<stage>`: 12 stages in five groups (Define, Make the molecule, Measure, Make the medicine, Control and file). Shell: `src/views/science/Science.js`.
- **Two perspectives** on the overview: development chronology and CTD evidence map (stages × M4Q sections, with evidence status). They are related but deliberately not presented as the same order.
- **Stage page pattern**: `StageHero` (purpose, position, inputs → activities → evidence, decisions, risks, product status, CTD destinations, links), then optional deep content (`DEEP` map in `Science.js`).
- **Reference product**: `src/science/product.js` (CMX-417, fictional humanised IgG1κ, anti-cytokine, 150 mg/mL SC prefilled syringe). Every value carries a provenance tag: assumption, hypothetical, representative, expectation.
- **Journey model**: `src/science/journey.js` (stages, CTD sections, evidence statuses).
- **Analytical series** `#/analytical/...` remains the analytical flagship (13 chapters); Phase 4 rebuilds its hero around the shared model.
- **Art pipeline**: `scripts/generate-art.mjs` + `src/science/art-manifest.json`, output to `public/science-art/`. Server-side only; key from `OPENAI_API_KEY` (`.env`, never committed). Model via `OPENAI_IMAGE_MODEL`.

## Content classification (existing modules)
| Module | Decision | Notes |
|---|---|---|
| Analytical series (13 chapters) | KEEP / IMPROVE | Audited for accuracy 2026-10-10. Phase 4: connect to CMX-417, add HIC and RP-HPLC deep dives, split compendial area. |
| QbD (QTPP, CQA, CPP, FMEA, DoE, design space, control strategy, CoA) | IMPROVE / MOVE | QTPP mixes specification limits into product targets; generic "mAb [X]". Phase 6 rebuilds around CMX-417; Phase 1 QTPP replaces its role at stage 2. |
| Pipeline Explorer (16 stages) | KEEP / MERGE | Rich stage content; its cell-line and upstream stages feed Phase 2. Its "journey" mode overlaps the new Science journey: merge in Phase 2. |
| Viral Clearance | KEEP / MOVE | Becomes part of Downstream and viral safety (Phase 3). |
| Stability Studies | KEEP / IMPROVE | Small-molecule zone content (ICH Q1A climatic zones) dominates; Phase 5 refocuses on biologics (Q5C) and links formulation. |
| Excipient Compatibility | MOVE / MERGE | Into Formulation (Phase 5) as part of formulation science. |
| Compendial Reference | KEEP / MOVE | Becomes the compendial area of Analytical (Phase 4). |
| CTD Navigator | REPLACE | Superseded by the CTD evidence navigator (Phase 6). |
| Batch Record Simulator, OOS/OOT, Case Studies | KEEP | Linked from relevant stages. |
| Development proposal, QTPP-to-CQA risk assessment | ADD | Built in Phase 1. |

## Phase map
| Phase | Scope | Exit criteria |
|---|---|---|
| 1 | Foundation: audit, journey, product model, stage pattern, proposal, QTPP/CQA/early risk, art pipeline, tests | Done when all 12 stages route and render, stages 1–2 have deep content, tests and build pass |
| 2 | Pipeline, cell line, upstream | Hero + deep dives; variable → mechanism → quality → measurement chains |
| 3 | Downstream and viral safety | Unit-operation deep dives; impurity clearance journey; ICH Q5A viral safety |
| 4 | Analytical flagship | New hero atlas; question-first organisation; method deep dives; compendial area; data interpretation |
| 5 | Formulation, excipients, stability | Formulation science and trade-offs; biologics stability feedback loop |
| 6 | QbD, control strategy, specifications, CoA, CTD | Relationship explorer; control strategy; CTD readiness navigator |
| 7 | Global refinement | Consistency, links, accessibility, performance, tests, open review items |

## Checkpoint
- **Phase 1: complete** (7b577ee).
- **Phases 2–6: built** on `science-phase1`, after the user approved building all remaining stages at once and asked that sections teach general science rather than follow one molecule.
  - Content engine: `src/science/content/*` (54 topics across 10 stages) rendered by `src/views/science/Blocks.js`; routes `#/science/<stage>/<topic>`.
  - 14 interactive widgets in `src/views/science/widgets/` (bioreactor variables, culture profile, purification train, clearance, formulation trade-offs, injection force, stability shelf-life, relationship explorer, FMEA, DoE, design space, control layers, CoA, CTD navigator).
  - CMX-417 is now only the worked example on Proposal and QTPP; the stage hero no longer carries a product panel.
  - Analytical: HIC and RP-HPLC added (data, CQA map, guided path, theatres); Atlas splits product-specific procedures from compendial tests.
- **Phase 7 (global refinement): open.** Remaining: full accessibility pass on widgets (keyboard on SVG charts), dark-theme screenshot review of every widget, scientific review of example numbers.
- Art assets: 3 defined in the manifest, **0 generated** (no `OPENAI_API_KEY`).
- Open scientific review items: all widget numbers are hypothetical teaching values and are labelled; needle inner diameters in the injection widget are approximate; verify ICH M4Q revision status (M4Q(R2) was in draft at the time of writing).
