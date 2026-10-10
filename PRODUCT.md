# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary (confirmed): recruiters, hiring managers and senior CMC leaders evaluating Yash Kacha. The site is a portfolio and showcase of his biologics CMC expertise; they skim the home page and a few deep pages to judge depth, judgment and craft.
Secondary (inferred from the app's content): CMC scientists and job seekers who use it as a study reference and interview prep tool.

## Product Purpose

A single-author reference covering biologics (monoclonal antibody) Chemistry, Manufacturing and Controls end to end: 16-stage development pipeline, 22 analytical methods, QbD/CQA, viral clearance, stability, OOS/OOT investigation, batch records, compendial methods, excipients, case studies, ICH guidelines, career paths, and practice questions with spaced repetition. Success: a hiring reader leaves convinced the author understands CMC at depth and can explain it clearly.

## Positioning

Written from the bench by one practitioner: the content explains why each assay, step and rule exists, not just what it is, and the tools are working simulations (OOS decision tree, batch record, LRV calculator, T90 shelf-life math) rather than static notes.

## Operating Context

Read on desktop during evaluation (recruiter screening, pre-interview research) and on desktop or phone while studying. Navigation by section index and a command palette (Cmd/Ctrl+K). Progress, notes and quiz state live in the reader's browser (localStorage).

## Capabilities and Constraints

- React 19 (Create React App), no UI or chart libraries; inline styles plus `src/index.css` and `src/fx.css`.
- Light and dark themes are both required; the toggle persists to localStorage. New visitors default to light.
- Views are state-routed in `src/App.js`; data lives in `src/*-data.js` modules.
- Hosted on Vercel at yashkacha.com. Do not push or deploy without the owner's explicit request.
- Back up files to `src/versions/` before major rewrites.

## Brand Commitments

- Name shown in the nav: "Yash Kacha", with "CMC App" as the product label.
- The DNA monogram logo in the nav is liked by the owner and stays.
- No emoji in the interface; custom monoline icon set in `src/icons.js`.
- Owner rejected: rainbow/iridescent "liquid chrome", juvenile styling.

## Evidence on Hand

Real content only: all pipeline, method, case-study, guideline and question data in `src/*-data.js`. No testimonials, employers, metrics of usage, or credentials beyond what the owner supplies; do not invent any.

## Product Principles

1. Depth is the proof: show the reasoning, the numbers and the regulation, never vague claims.
2. One author's judgment, clearly stated, beats encyclopedic coverage.
3. Tools must actually work: simulations and calculators over static text.
4. Respect the reader's time: a hiring reader should grasp scope and quality in one screen.
