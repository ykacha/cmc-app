// src/pathway-data.js — Learning pathways per career level

export const PATHWAY_LEVELS = [
  { id: "ra1", label: "RA I / Scientist I", icon: "🌱", color: "#22D3EE", years: "0–2 years experience" },
  { id: "ra2", label: "Scientist II / Sr. Scientist", icon: "🌿", color: "#34D399", years: "2–5 years experience" },
  { id: "assoc-dir", label: "Associate Director", icon: "🌳", color: "#F59E0B", years: "5–10 years experience" },
  { id: "director", label: "Director", icon: "🏆", color: "#F472B6", years: "10–15 years experience" },
  { id: "vp", label: "VP / Head of CMC", icon: "👑", color: "#A78BFA", years: "15+ years experience" },
];

export const LEARNING_PATHWAYS = {
  "ra1": {
    level: "RA I / Scientist I",
    goal: "Build foundational CMC knowledge; master laboratory techniques; understand regulatory basics",
    day30: {
      label: "Days 1–30: Foundations",
      focus: "Core CMC concepts, pipeline basics, analytical fundamentals",
      color: "#22D3EE",
      topics: [
        { day: "1–3", topic: "Biologic Development Pipeline overview (all 16 stages)", view: "pipeline", competency: "Name and describe all 16 development stages", time_min: 60 },
        { day: "4–6", topic: "CMC Domains: Drug Substance, Drug Product, Analytical, Regulatory, QA/QC", view: "domains", competency: "Distinguish DS vs DP CMC activities", time_min: 45 },
        { day: "7–10", topic: "Analytical Methods: SEC, CE-SDS, cIEF basics", view: "methods", competency: "Explain principle of SEC and what HMW/LMW means", time_min: 90 },
        { day: "11–13", topic: "ICH Q1A(R2) Stability — conditions and timepoints", view: "stability", competency: "State long-term, accelerated, intermediate conditions for Zone I/II", time_min: 60 },
        { day: "14–17", topic: "CMC Glossary — first 25 terms", view: "glossary", competency: "Define: CQA, CPP, IPC, BLA, IND, CMC, API, DP, DS", time_min: 30 },
        { day: "18–21", topic: "CTD Module 3 structure — what goes where", view: "ctd", competency: "Map 5 CTD sections; know what Module 3 contains", time_min: 45 },
        { day: "22–25", topic: "OOS/OOT Fundamentals — Phase 1 lab investigation", view: "oos", competency: "Describe Phase 1 OOS investigation steps", time_min: 45 },
        { day: "26–30", topic: "Practice Exam: Foundational questions", view: "exam", competency: "Pass 70% of Foundational exam questions", time_min: 60 },
      ],
      milestone: "Pass Foundational exam (≥70%); able to describe pipeline and key analytical methods",
    },
    day60: {
      label: "Days 31–60: Core Skill Development",
      focus: "QbD principles, analytical methods depth, stability protocols",
      color: "#34D399",
      topics: [
        { day: "31–34", topic: "QbD: QTPP, CQA, CPP definitions and examples", view: "qbd", competency: "Identify CQAs for a mAb product from QTPP", time_min: 60 },
        { day: "35–38", topic: "Analytical Methods: Peptide mapping, glycan analysis, bioassay", view: "methods", competency: "Explain why peptide mapping is a critical characterization method", time_min: 90 },
        { day: "39–42", topic: "ICH Guidelines: Q1A, Q6B, Q5E overview", view: "ich", competency: "State the scope and key requirements of ICH Q6B", time_min: 60 },
        { day: "43–46", topic: "Compendial Methods: USP <71>, <85>, <788>, <787>", view: "compendial", competency: "State acceptance criteria for USP <71> and <85>", time_min: 45 },
        { day: "47–50", topic: "Case Studies: Heparin and Valsartan NDMA", view: "cases", competency: "Explain what CMC failure occurred and key learning", time_min: 60 },
        { day: "51–55", topic: "Stability: Forced degradation study design", view: "stability", competency: "Design a forced degradation study for a mAb", time_min: 45 },
        { day: "56–60", topic: "Practice Exam: Intermediate questions", view: "exam", competency: "Pass 65% of Intermediate exam questions", time_min: 60 },
      ],
      milestone: "Complete 5 analytical methods deep-dives; explain QbD framework; pass Intermediate exam ≥65%",
    },
    day90: {
      label: "Days 61–90: Applied Knowledge",
      focus: "Regulatory submissions, career skills, practical applications",
      color: "#F59E0B",
      topics: [
        { day: "61–65", topic: "CTD Module 3.2 — drug substance and drug product section deep dive", view: "ctd", competency: "Know what data goes in 3.2.S and 3.2.P sections", time_min: 90 },
        { day: "66–70", topic: "Excipient Compatibility basics — key incompatibilities", view: "excipient", competency: "Name 3 critical excipient incompatibilities and their mechanisms", time_min: 60 },
        { day: "71–74", topic: "FMEA and Risk Assessment for QbD", view: "qbd", competency: "Calculate RPN for a given failure mode; identify high-risk CQAs", time_min: 60 },
        { day: "75–78", topic: "Career: Scientist I competencies and interview preparation", view: "career", competency: "Answer Foundational interview questions confidently", time_min: 90 },
        { day: "79–82", topic: "Batch Record Simulator: Complete a sterile mAb BPR", view: "batch", competency: "Complete BPR with no critical deviations", time_min: 60 },
        { day: "83–86", topic: "Notes: Create personal CMC study notes", view: "notes", competency: "Maintain organized notes across 5+ topics", time_min: 30 },
        { day: "87–90", topic: "Final Assessment: Mixed exam + review progress", view: "progress", competency: "Overall exam score ≥70%; all domains covered", time_min: 90 },
      ],
      milestone: "90-day completion: ≥70% overall exam score; completed batch simulator; created personal notes library",
    },
  },
  "ra2": {
    level: "Scientist II / Sr. Scientist",
    goal: "Deepen analytical expertise; lead method validation; manage stability programs; understand filing requirements",
    day30: {
      label: "Days 1–30: Advanced Analytical Mastery",
      focus: "Advanced characterization, method validation, regulatory strategy",
      color: "#22D3EE",
      topics: [
        { day: "1–4", topic: "Advanced analytical: SPR, glycan analysis, MFI, DSC", view: "methods", competency: "Explain KD measurement by SPR and its regulatory significance", time_min: 90 },
        { day: "5–8", topic: "ICH Q2(R1) Method Validation: all validation characteristics", view: "ich", competency: "Design validation protocol for a new SEC method", time_min: 60 },
        { day: "9–12", topic: "QbD Advanced: Design space, FMEA full exercise", view: "qbd", competency: "Construct FMEA table and identify critical process steps", time_min: 90 },
        { day: "13–16", topic: "Stability Programs: IND vs. NDA stability packages", view: "stability", competency: "Outline stability data required for a BLA submission", time_min: 60 },
        { day: "17–20", topic: "OOS Investigation: Lead Phase 2A/2B exercises", view: "oos", competency: "Conduct Phase 2B manufacturing investigation to conclusion", time_min: 90 },
        { day: "21–25", topic: "Compendial: All 19 methods — focus on biologics chapters", view: "compendial", competency: "Know USP <787> vs <788> differences; state endotoxin limit calculation", time_min: 60 },
        { day: "26–30", topic: "Exam: Advanced level questions", view: "exam", competency: "Pass ≥70% of Advanced exam questions", time_min: 60 },
      ],
      milestone: "Lead mock method validation discussion; complete OOS investigation exercise; pass Advanced exam ≥70%",
    },
    day60: {
      label: "Days 31–60: Regulatory & Filing Depth",
      focus: "CTD authoring, comparability, post-approval changes",
      color: "#34D399",
      topics: [
        { day: "31–35", topic: "CTD Module 3 authoring: what makes a complete submission", view: "ctd", competency: "Identify gaps in a mock Module 3.2.S section", time_min: 90 },
        { day: "36–40", topic: "ICH Q5E Comparability for scale-up changes", view: "ich", competency: "Design comparability exercise for bioreactor scale-up", time_min: 60 },
        { day: "41–45", topic: "Case Studies: Xigris scale-up failure, Bevacizumab particles", view: "cases", competency: "Identify what comparability steps could have prevented Xigris failure", time_min: 60 },
        { day: "46–50", topic: "ICH Q3A/Q3B/Q3C: Impurity qualification", view: "ich", competency: "State qualification thresholds for process-related impurities", time_min: 60 },
        { day: "51–55", topic: "Excipient: Deep dive PS80 degradation and particle formation", view: "excipient", competency: "Explain PS80 → oleic acid → subvisible particle pathway", time_min: 60 },
        { day: "56–60", topic: "Progress review and gap assessment", view: "progress", competency: "Identify 3 knowledge gaps from progress data; create targeted study plan", time_min: 45 },
      ],
      milestone: "Can author Module 3.2.S characterization section; explain ICH Q5E comparability requirements",
    },
    day90: {
      label: "Days 61–90: Leadership & Strategy",
      focus: "Program management, technical leadership, advanced regulatory",
      color: "#F59E0B",
      topics: [
        { day: "61–65", topic: "Career: Scientist II/Sr. Scientist competencies; leadership interview prep", view: "career", competency: "Answer Intermediate-level interview questions", time_min: 90 },
        { day: "66–70", topic: "CMC Timeline: Regulatory milestones and deliverables", view: "timeline", competency: "Map CMC deliverables for IND, Phase 1, 2, 3 and BLA", time_min: 60 },
        { day: "71–75", topic: "Batch Record Simulator: Identify and manage deviation scenarios", view: "batch", competency: "Handle 3+ deviation scenarios correctly in BPR simulator", time_min: 60 },
        { day: "76–80", topic: "Exam: Expert level questions", view: "exam", competency: "Pass ≥60% of Expert exam questions", time_min: 90 },
        { day: "81–85", topic: "ICH Q10: Pharmaceutical Quality System", view: "ich", competency: "Explain PQS elements and management review requirements", time_min: 60 },
        { day: "86–90", topic: "Final review: Comprehensive CMC competency self-assessment", view: "progress", competency: "Achieve ≥75% overall; ≥80% in analytical domain", time_min: 60 },
      ],
      milestone: "90-day: Expert exam ≥60%; lead mock BPR deviation exercise; complete all career competency modules",
    },
  },
  "assoc-dir": {
    level: "Associate Director",
    goal: "Program leadership, regulatory strategy, CMC authoring, team management, regulatory agency interaction",
    day30: {
      label: "Days 1–30: Strategic CMC",
      focus: "Regulatory strategy, filing leadership, comparability programs",
      color: "#22D3EE",
      topics: [
        { day: "1–5", topic: "Full CTD review — identify strategic CMC arguments", view: "ctd", competency: "Evaluate a complete CTD module 3 for filing readiness", time_min: 120 },
        { day: "6–10", topic: "All ICH Q guidelines: Q1–Q14 strategic implications", view: "ich", competency: "Summarize impact of ICH Q14 on analytical procedure lifecycle", time_min: 90 },
        { day: "11–15", topic: "QbD: Control strategy design for commercial product", view: "qbd", competency: "Design 4-tier control strategy for a mAb DP", time_min: 90 },
        { day: "16–20", topic: "OOS: Lead full investigation including regulatory reporting", view: "oos", competency: "Draft OOS investigation report meeting 21 CFR 211.192 requirements", time_min: 90 },
        { day: "21–25", topic: "Case Studies: All 6 — strategic regulatory lessons", view: "cases", competency: "Present regulatory strategy implications of each case study", time_min: 90 },
        { day: "26–30", topic: "Exam: All levels — identify knowledge gaps", view: "exam", competency: "Pass ≥80% overall exam; Expert ≥70%", time_min: 90 },
      ],
      milestone: "Lead mock FDA CMC briefing meeting; demonstrate control strategy authorship capability",
    },
    day60: {
      label: "Days 31–60: Team Leadership",
      focus: "Mentoring, process development strategy, change control",
      color: "#34D399",
      topics: [
        { day: "31–40", topic: "Career: Director-level competencies; leadership interviews", view: "career", competency: "Answer Advanced and Expert interview questions; develop team mentoring approach", time_min: 120 },
        { day: "41–50", topic: "Stability program strategy for a full development portfolio", view: "stability", competency: "Design stability matrix for 3 products at different development stages", time_min: 90 },
        { day: "51–60", topic: "Excipient strategy and formulation risk assessment", view: "excipient", competency: "Conduct excipient compatibility risk assessment for new biologic", time_min: 90 },
      ],
      milestone: "Develop mock CMC strategy document for a Phase 1 biologic",
    },
    day90: {
      label: "Days 61–90: Commercial & Post-Approval",
      focus: "Commercial CMC, post-approval changes, lifecycle management",
      color: "#F59E0B",
      topics: [
        { day: "61–75", topic: "Batch Record Simulator: Full commercial BPR with all deviations", view: "batch", competency: "Manage all 8 deviation scenarios; write deviation reports", time_min: 120 },
        { day: "76–90", topic: "Progress: Track team-level competency development", view: "progress", competency: "Expert exam ≥80%; complete program completion badge", time_min: 60 },
      ],
      milestone: "90-day: Expert exam ≥80%; lead lifecycle management case study; all badges earned",
    },
  },
  "director": {
    level: "Director",
    goal: "Executive CMC strategy, cross-functional leadership, regulatory agency relationships, portfolio oversight",
    day30: {
      label: "Days 1–30: Executive Overview",
      focus: "Portfolio strategy, regulatory intelligence, organizational leadership",
      color: "#22D3EE",
      topics: [
        { day: "1–10", topic: "Rapid review: All 12 original + 8 new views for executive context", view: "dashboard", competency: "Identify top 3 CMC risks across a portfolio", time_min: 180 },
        { day: "11–20", topic: "All case studies: Executive lessons for portfolio risk management", view: "cases", competency: "Develop organizational policy recommendations from each case", time_min: 120 },
        { day: "21–30", topic: "Exam: Expert level — benchmark team capability", view: "exam", competency: "Expert exam ≥85%", time_min: 90 },
      ],
      milestone: "Develop CMC risk management framework for portfolio",
    },
    day60: {
      label: "Days 31–60: Organizational Capability",
      focus: "Building CMC organization, talent development, regulatory partnerships",
      color: "#34D399",
      topics: [
        { day: "31–45", topic: "Career: VP-level competencies and leadership model", view: "career", competency: "Design team development curriculum using learning pathways", time_min: 120 },
        { day: "46–60", topic: "Learning Pathway design for team members across 5 levels", view: "pathway", competency: "Assign appropriate pathway to team members at each level", time_min: 60 },
      ],
      milestone: "Deliver team CMC development strategy",
    },
    day90: {
      label: "Days 61–90: External Engagement",
      focus: "FDA/EMA interactions, industry standards, thought leadership",
      color: "#F59E0B",
      topics: [
        { day: "61–90", topic: "ICH advanced: Q12, Q13, Q14 — emerging guidelines leadership", view: "ich", competency: "Articulate industry impact of ICH Q13 continuous manufacturing", time_min: 120 },
      ],
      milestone: "Deliver regulatory intelligence report on emerging CMC guidelines",
    },
  },
  "vp": {
    level: "VP / Head of CMC",
    goal: "Enterprise CMC leadership, industry-wide perspective, innovation, regulatory intelligence",
    day30: {
      label: "Days 1–30: Strategic Landscape",
      focus: "Full app review for organizational deployment, competitive landscape, talent strategy",
      color: "#22D3EE",
      topics: [
        { day: "1–30", topic: "Full platform review: Evaluate CMC Master App for organizational training deployment", view: "dashboard", competency: "Propose deployment strategy for organization-wide CMC training", time_min: 240 },
      ],
      milestone: "Organizational training deployment proposal",
    },
    day60: {
      label: "Days 31–60: Innovation & Emerging Science",
      focus: "Novel modalities, emerging technologies, regulatory innovation",
      color: "#34D399",
      topics: [
        { day: "31–60", topic: "Advanced case studies: Lessons for next-generation biologics (ADCs, mRNA, gene therapy)", view: "cases", competency: "Extrapolate CMC principles to novel modalities beyond mAbs", time_min: 180 },
      ],
      milestone: "White paper on CMC considerations for emerging modalities",
    },
    day90: {
      label: "Days 61–90: Legacy & Impact",
      focus: "Knowledge transfer, industry contribution, mentorship at scale",
      color: "#F59E0B",
      topics: [
        { day: "61–90", topic: "Progress: Complete all badges; design team performance metrics", view: "progress", competency: "All badges earned; team performance baseline established", time_min: 120 },
      ],
      milestone: "All competency badges earned; team CMC capability baseline report delivered",
    },
  },
};

export const PATHWAY_MILESTONES = [
  { id: "m-pipeline", label: "Pipeline Master", icon: "🗺️", req: "Visit Pipeline view + pass 5 pipeline questions", color: "#C084FC" },
  { id: "m-methods", label: "Analytical Expert", icon: "🔬", req: "View 10+ methods in detail", color: "#22D3EE" },
  { id: "m-qbd", label: "QbD Practitioner", icon: "⚗️", req: "Complete all 7 QbD tabs", color: "#F472B6" },
  { id: "m-stability", label: "Stability Scientist", icon: "🧊", req: "Complete stability matrix for 2 product types", color: "#34D399" },
  { id: "m-oos", label: "OOS Investigator", icon: "🚨", req: "Complete OOS decision tree to resolution", color: "#F59E0B" },
  { id: "m-exam-found", label: "Foundational Graduate", icon: "🎓", req: "Pass Foundational exam ≥80%", color: "#60A5FA" },
  { id: "m-exam-adv", label: "Advanced Scholar", icon: "🏅", req: "Pass Advanced exam ≥70%", color: "#F59E0B" },
  { id: "m-exam-expert", label: "CMC Expert", icon: "👑", req: "Pass Expert exam ≥70%", color: "#A78BFA" },
  { id: "m-cases", label: "Case Study Analyst", icon: "📰", req: "Study all 6 case studies", color: "#FB923C" },
  { id: "m-batch", label: "Batch Record Pro", icon: "📋", req: "Complete BPR with ≤1 deviation", color: "#38BDF8" },
  { id: "m-notes", label: "Knowledge Builder", icon: "📝", req: "Create 10+ personal notes", color: "#F472B6" },
  { id: "m-complete", label: "CMC Master", icon: "🧬", req: "Earn all other badges", color: "#A78BFA" },
];
