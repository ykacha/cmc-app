# Site structure plan (2026-10-11)

Decisions on what stays, what merges and what moves, then the plan for the
Pipeline, the deep-dive topics and Tools. Phase 1 is implemented with this
document; later phases need building.

## 1. Section decisions

| Section | Decision | Why |
|---|---|---|
| Pipeline Explorer | **Keep, first in the nav, uplift** (section 3) | The granular, hands-on encyclopedia: 16 operational stages and 275 knowledge cards. |
| Science journey | **Keep, second** | The development programme: decisions, evidence, interactive tools, CTD trace. |
| Analytical | **Keep, third** | Flagship method series; nothing else covers it. |
| QbD / CQA / CPP | **Retire, redirect to Journey** (done) | Every tab (QTPP, CQA, FMEA, CPP, design space, control strategy, CoA) exists in the Journey with more depth and working tools. |
| CTD Navigator | **Retire, redirect to the Journey dossier** (done) | The Module 1–5 dossier and evidence navigator replace it. Tools later gets a CTD readiness tracker. |
| CMC Timeline | **Merge into the Journey** (phase 2) | Its content is "what is due at each milestone". The Journey timeline already has the milestone axis; clicking a milestone will open its deliverables. A separate page would repeat it. |
| Stability Studies | **Merge** (phase 2) | Strategy, studies and shelf life are Journey topics. Its unique parts (storage conditions, ICH climatic zones, study matrix by product type) become a Journey reference topic; the T90 and shelf-life calculators move to Tools. |
| Viral Clearance | **Merge** (phase 2) | Concepts are in Journey › Downstream › Viral safety. Its unique parts (model virus panel, spiking workflow) move there; the LRV calculator moves to Tools. |
| Compendial Reference | **Move to Library** | A reference table (USP, Ph. Eur., JP), not a learning path. Linked from Analytical › Compendial. |
| Excipient Compatibility | **Move to Library** | Reference library and matrix. Linked from Journey › Formulation › Excipients. |
| Q-Bank | **Move to Practice** | Question practice belongs with Exam mode. |
| ICH Guidelines, Glossary | **Move to Library** | Reference, consulted rather than read in order. |
| Case Studies | **Move to Library** | Historical case files; linked from the topics they illustrate. |
| OOS/OOT, Batch Record | **Stay in Tools** | Seed of the Tools section (section 5). |

Retired sections keep their URLs: old links land on the matching Journey page.
Views are deleted only after their unique content has been migrated.

## 2. New top navigation

| Group | Items | Purpose |
|---|---|---|
| **Explore** | Pipeline · Journey · Analytical | The three flagship learning experiences, first. |
| **Tools** | OOS/OOT · Batch record (more in phase 4) | Work with your own data. |
| **Practice** | Q-Bank · Exam · Notes | Test and keep what you learn. |
| **Library** | ICH · Glossary · Compendial · Excipients · Cases | Reference to consult. |
| **Career** | Career · Pathways · Progress | Unchanged. |

Interim: Viral, Stability and Timeline leave the nav now but stay reachable
(Journey links, ⌘K search) until phase 2 migrates them.

## 3. Pipeline Explorer versus Science journey

They must answer different questions. Both get a one-line statement at the top and
cross-links stage to stage.

| | Pipeline Explorer | Science journey |
|---|---|---|
| Question | *How is it done?* | *Why, and what does it prove?* |
| Unit | The operation: what people and equipment do | The decision: what the programme must learn |
| Content | 16 operational stages, 275 knowledge cards, Q&A | 13 programme stages, 60 deep dives, 17 interactive tools |
| Ends with | A product made and released | A dossier filed |
| Best for | Interview prep, day-to-day practice | Understanding the logic of CMC |

**Pipeline uplift (phase 3)**
- A transparent isometric illustration per stage, same art style as the Journey.
- **People**: who does the work at each stage (roles, what a day looks like, the hand-offs), linked to Career.
- **Equipment and deliverables**: what is used, what document comes out.
- **Cross-link** each Pipeline stage to its Journey stage ("why this matters in the programme"), and back.

## 4. Deep-dive uplift (phase 3)

Make each topic page a better reading experience and connect it to practice:
- **At a glance** box at the top: three key takeaways and reading time.
- A **figure for every topic**: an interactive diagram where one teaches better, otherwise a generated illustration.
- **Check yourself**: three questions at the end, feeding the Exam spaced-repetition queue.
- **Glossary tooltips** on technical terms.
- **In practice**: one real case (from Case Studies) per topic where relevant.
- **Read progress** in the sidebar.
- **Thicken thin stages**: Candidate (2 topics), Transfer & PPQ (4). Add, for example, immunogenicity risk, device and combination products, and supply-chain and cold-chain topics.

## 5. Tools: the vision (phase 4, plan only)

One idea joins them: **a CMC workbench around your own programme**. You set a
product context once (modality, phase, presentation, key CQAs). Every tool then
uses it, every result can be saved and exported, and every tool links back to the
Journey topic that explains it.

1. **Calculators**: each shows its formula, its assumptions and the guideline it comes from.
   - LRV and viral safety margin
   - shelf life (ICH Q1E regression)
   - specification limits from tolerance intervals
   - endotoxin limit and MVD
   - HCP ppm
   - diafiltration exchange
   - injection force
   - load density and column sizing
   - mass balance
2. **Data tools**: paste your numbers.
   - stability trending with OOT flags
   - CPV control charts with run rules
   - method validation statistics (linearity, accuracy, precision)
3. **Investigations**: the OOS/OOT investigator (exists), a deviation and CAPA builder, and root cause (5-why and fishbone).
4. **Document builders**:
   - specification builder (CQA to test to limit to justification)
   - CoA generator
   - comparability protocol builder
   - batch record review (exists)
5. **Risk and control**: FMEA builder, criticality assessment, control-strategy matrix.
6. **Regulatory**:
   - CTD readiness tracker
   - phase-appropriate CMC checklist (IND/IMPD to BLA/MAA)
   - change-control impact classifier, with a check of category definitions against current guidance

Rules:
- Everything runs in the browser.
- Data is stored locally.
- No API costs for visitors.
- Every tool states its limits; none gives a regulatory decision.

## Phases

1. **Done with this plan**: new nav, QbD and CTD redirects, dashboard updated.
2. Merge Timeline, Stability and Viral into the Journey; move their calculators to Tools; then delete the old views.
3. Pipeline uplift (art, people, cross-links) and deep-dive uplift.
4. Tools workbench: product context, then calculators, data tools, builders.
5. Library refresh: ICH, Glossary, Compendial, Excipients and Cases in the current design.

## Pipeline Explorer rebuild (done 2026-10-11)

- **The production line**: scrolling down moves the page sideways through 16 stations on one continuous pipe.
  - The pipe is coloured by phase.
  - Each station shows a transparent isometric object standing on the pipe, an "In hand" figure, the people at work and the hand-off to the next station.
  - A phase minimap along the bottom jumps between stations.
  - The arrow keys work when the line has keyboard focus.
- **Phone and reduced motion**: the same stations in a vertical column.
- **Station deep dives** (`#/pipeline/<sid>`, `#/pipeline/<sid>/<card>`) show, in order:
  - arrives and leaves
  - what actually happens, step by step
  - who and with what
  - every knowledge card (expandable, deep-linkable)
  - interview questions
  - a link to the matching Journey stage
- **Content**:
  - `src/pipeline/plant.js` (in hand, people, equipment, links to Journey stages)
  - existing `PIPELINE` cards and `STAGE_OVERVIEWS`, kept in full
- **Old view**: backed up at `src/versions/PipelineView-pre-production-line.js`.

## Status (2026-10-11)

- **Phase 1, done.** Navigation restructured; QbD and CTD Navigator retired.
- **Phase 2, done.** Timeline, Stability and Viral merged into the Journey:
  - clickable milestones on the Journey timeline (the old timeline data was corrected first)
  - new topics: `stability/conditions` and `downstream/viralstudies`
  - the old views are redirected and backed up in `src/versions/`
- **Phase 3, done.** Deep-dive upgrades:
  - reading time and an outline on every topic
  - glossary hover definitions
  - read marks in the sidebar (stored in this browser)
  - "Check yourself" interview questions from the matching Pipeline stations
  - Pipeline research papers, checked against PubMed
- **Phase 4, done.** The CMC workbench at `#/tools/<id>`, with nine calculators: LRV and safety margin, shelf life (ICH Q1E), tolerance-interval limits, endotoxin K/M and MVD, HCP ppm, diafiltration, column sizing, yield and injection force.
  - The product context is saved in this browser only.
  - The calculations are tested.
- **Also done:**
  - Career, Pathways, Exam, Notes and Progress removed; their old links go to the home page.
  - Q-Bank moved to Library.
  - New brand mark (an SEC chromatogram) for the header, favicon and app icons.
- **Remaining:**
  - Phase 5: refresh ICH, Glossary, Compendial, Excipients, Cases and Q-Bank in the current design.
  - Human scientific review of the example values and the generated images.
