/* Executed batch record and QC testing records for one fictional drug substance
   lot (DS-24-0031, the lot on the certificate of analysis). Every number,
   identifier, initial and limit is hypothetical and exists to teach how these
   documents are built and reviewed. Cells are plain strings, "" for a blank
   field, or { was, now, by, why } for a single-line correction. */

export const BR_HEAD = [
  ["Product", "CMX-417 drug substance (fictional)"],
  ["Batch", "DS-24-0031"],
  ["Master record", "MBR-DS-417-PUR, version 5 (effective 2024-06-03)"],
  ["Upstream lot", "Harvest H-24-0031, 2,000 L bioreactor BR-2001"],
  ["Suite", "Purification suite P2"],
  ["Issued", "2024-09-06 by Document Control, copy 1 of 1, 48 pages"],
  ["Started", "2024-09-09 06:40"],
  ["Completed", "2024-09-12 17:05"],
];

export const BR_PEOPLE = [
  ["RM", "Operator"], ["JT", "Operator"], ["AK", "Operator"], ["SL", "Operator"],
  ["PB", "Production supervisor"], ["DN", "QA reviewer"],
];

// sections of the record, in page order
export const BR_SECTIONS = [
  {
    id: "clearance", title: "Line clearance and room readiness", page: 3,
    cols: ["Check", "Requirement", "Entry", "By", "Verified", "Time"],
    rows: [
      { id: "lc1", cells: ["Previous batch materials, records and labels removed", "None present", "None present", "RM", "JT", "09-Sep 06:40"] },
      { id: "lc2", cells: ["Room status label", "Clean, within hold", "Clean, cleaned 08-Sep (CL-P2-0912)", "RM", "JT", "06:44"] },
      { id: "lc3", cells: ["Pressure differential, P2 to corridor", "≥ 10 Pa", "14 Pa", "RM", "JT", "06:46"] },
      { id: "lc4", cells: ["Environmental monitoring status of P2", "No open excursions", "No open excursions", "RM", "JT", "06:47"] },
    ],
  },
  {
    id: "materials", title: "Materials issued", page: 6,
    cols: ["Material", "Lot", "Use by", "Status", "Issued", "By / Verified"],
    rows: [
      { id: "m1", cells: ["Protein A column COL-PA-07", "Resin R-2231", "Cycle 61 of 100", "In use, within lifetime", "1 column", "RM / JT"] },
      { id: "m2", cells: ["Equilibration buffer EQ-01", "BUF-24-1102", "2024-09-20", "Released", "1,200 L", "RM / JT"] },
      { id: "m3", cells: ["Elution buffer EL-02, pH 3.5", "BUF-24-1105", "2024-09-21", "Released", "400 L", "RM / JT"] },
      { id: "m4", cells: ["Neutralisation buffer, 1 M Tris", "BUF-24-1107", "2024-09-30", "Released", "40 L", "RM / JT"] },
      { id: "m5", cells: ["Cation exchange column COL-CX-03", "Resin R-1984", "Cycle 22 of 80", "In use, within lifetime", "1 column", "AK / SL"] },
      { id: "m6", cells: ["Anion exchange membrane capsule", "MX-77105", "2026-02-28", "Released", "2 capsules", "AK / SL"] },
      { id: "m7", cells: ["Virus filter, 20 nm", "VF-8841", "2026-05-31", "Released", "4 × 1 m²", "AK / SL"] },
      { id: "m8", cells: ["UF/DF cassettes, 30 kDa", "Set C-12", "Use 14 of 30", "In use, within lifetime", "6 m²", "AK / SL"] },
      { id: "m9", cells: ["Formulation buffer FB-04 (histidine, sucrose, pH 6.0)", "BUF-24-1112", "2024-09-25", "Released", "300 L", "SL / PB"] },
      { id: "m10", cells: ["Polysorbate 80 stock, 10% w/v", "PS80-2401", "2024-10-15", "Released", "0.6 L", "SL / PB"] },
      { id: "m11", cells: ["Single-use freeze bags, 12 L", "BG-5520", "2027-01-31", "Released", "3 bags", "SL / PB"] },
    ],
  },
  {
    id: "equipment", title: "Equipment", page: 8,
    cols: ["ID", "Description", "Calibration or PM due", "Cleaning status", "By", "Verified"],
    rows: [
      { id: "e1", cells: ["CHR-02", "Chromatography skid", "2025-01-15", "Clean, 08-Sep", "RM", "JT"] },
      { id: "e2", cells: ["PHM-114", "pH meter, suite P2", "2024-09-05", "Not applicable", "RM", "JT"],
        issue: { principle: "Accurate", finding: "The pH meter's calibration was due on 5 September; it was used on 9 and 10 September for the low-pH hold and neutralisation, both critical steps.", fix: "Raise a deviation. Pull the meter's as-found calibration and the daily standardisation records for each day of use. If the as-found check passed and each use was preceded by a passing two-buffer standardisation, the impact on recorded pH values can be assessed as none; otherwise every reading the meter made is in question. Either way the scheduling failure needs a corrective action." } },
      { id: "e3", cells: ["CDM-31", "Conductivity meter", "2025-02-01", "Not applicable", "RM", "JT"] },
      { id: "e4", cells: ["BAL-220", "Floor balance, 600 kg", "2024-12-01", "Not applicable", "AK", "SL"] },
      { id: "e5", cells: ["TFF-01", "UF/DF skid", "2025-03-01", "Clean, 10-Sep", "AK", "SL"] },
      { id: "e6", cells: ["FIT-09", "Filter integrity tester", "2025-03-10", "Not applicable", "AK", "SL"] },
      { id: "e7", cells: ["FRZ-06", "Freezer, ≤ −65 °C, mapped and alarmed", "2025-04-22", "Not applicable", "SL", "PB"] },
    ],
  },
  {
    id: "capture", title: "Protein A capture", page: 14, date: "2024-09-09",
    cols: ["Instruction", "Target or range", "Actual", "By", "Verified", "Time"],
    rows: [
      { id: "c1", cells: ["Equilibrate column; record effluent pH", "7.0–7.4", "7.2", "RM", "JT", "07:55"] },
      { id: "c2", cells: ["Record effluent conductivity", "14–17 mS/cm", "15.6 mS/cm", "RM", "JT", "07:56"] },
      { id: "c3", cpp: true, cells: ["Load density per cycle", "30–40 g/L resin", "36 g/L", "RM", "JT", "08:10"] },
      { id: "c4", cells: ["Number of cycles", "4", "4", "RM", "JT", "16:30"] },
      { id: "c5", cells: ["Pooled eluate volume", "Record", "306 L", "RM", "JT", "16:42"] },
      { id: "c6", cells: ["Pooled eluate concentration (A280)", "Record", { was: "17.4 g/L", now: "17.1 g/L", by: "RM 09-Sep", why: "transcription error" }, "RM", "JT", "16:50"],
        ok: "A correct single-line correction: the original is still legible, and the change is initialled, dated and explained. Nothing to raise." },
    ],
  },
  {
    id: "inactivation", title: "Low-pH viral inactivation", page: 19, date: "2024-09-10",
    cols: ["Instruction", "Target or range", "Actual", "By", "Verified", "Time"],
    rows: [
      { id: "v1", cpp: true, cells: ["Adjust pool pH (meter PHM-114)", "3.5–3.7", "3.62", "AK", "", "10:08"],
        issue: { principle: "Attributable, complete", finding: "A critical process parameter has no second-person verification. The master record requires one for every CPP entry.", fix: "The verifier cannot simply sign now as if they had witnessed it. Site procedure decides the route: usually a dated late entry with an explanation by someone who can genuinely confirm the value (for example from the meter's printout or electronic record), or a deviation if it cannot be confirmed." } },
      { id: "v2", cpp: true, cells: ["Pool temperature during hold", "18–25 °C", "21 °C", "AK", "SL", "10:10"] },
      { id: "v3", cells: ["Hold start time", "Record", "10:12", "AK", "SL", "10:12"] },
      { id: "v4", cells: ["Hold end time", "Record", "11:46", "AK", "SL", "11:46"] },
      { id: "v5", cpp: true, cells: ["Hold duration", "60–90 min", "94 min. See DEV-24-0187", "AK", "SL", "11:47"],
        ok: "Outside the range, but documented correctly: the true value is recorded and a deviation is referenced. The excursion itself is assessed in the deviation, not hidden or corrected in the record." },
      { id: "v6", cells: ["Neutralise with 1 M Tris; record pH", "5.0–5.5", "5.3", "AK", "SL", "11:58"] },
    ],
  },
  {
    id: "polish", title: "Depth filtration and polishing", page: 23, date: "2024-09-10",
    cols: ["Instruction", "Target or range", "Actual", "By", "Verified", "Time"],
    rows: [
      { id: "p1", cells: ["Depth filter differential pressure", "≤ 1.5 bar", "1.1 bar", "AK", "SL", "13:05"] },
      { id: "p2", cells: ["Filtrate turbidity", "≤ 20 NTU", "4.2 NTU", "AK", "SL", "13:20"] },
      { id: "p3", cells: ["Take bioburden and endotoxin IPC samples", "Sample IDs recorded", "IPC-0031-04, -05", "AK", "SL", "13:24"] },
      { id: "p4", cells: ["CEX load conductivity", "≤ 5.0 mS/cm", "4.3 mS/cm", "AK", "SL", "14:02"] },
      { id: "p5", cells: ["CEX elution pool volume", "Record", "118 L", "AK", "SL", "18:40"] },
      { id: "p6", cells: ["AEX capsule pre-use flush: effluent conductivity", "Within ±10% of buffer", "Within (6.0 vs 6.2 mS/cm)", "AK", "SL", "19:05"] },
      { id: "p7", cells: ["Second flush, only if first flush out of range", "If required", "", "", "", ""],
        issue: { principle: "Complete", finding: "A conditional line is left blank. A reviewer cannot tell whether it was skipped because it was not needed or because it was forgotten.", fix: "The operator draws a line through the field and writes N/A with initials, date and a short reason (here: first flush within range). Unused fields are closed so nothing can be added later." } },
      { id: "p8", cells: ["AEX load pH", "7.0–7.4", "7.2", "AK", "SL", "19:12"] },
    ],
  },
  {
    id: "viral", title: "Virus filtration", page: 28, date: "2024-09-11",
    cols: ["Instruction", "Target or range", "Actual", "By", "Verified", "Time"],
    rows: [
      { id: "f1", cpp: true, cells: ["Pre-use integrity test (FIT-09)", "Pass", "Pass, printout attached", "SL", "AK", "10:40"] },
      { id: "f2", cells: ["Filtration start", "Record", "11:05", "SL", "AK", "11:05"] },
      { id: "f3", cpp: true, cells: ["Maximum feed pressure", "≤ 2.4 bar", { was: "2.4 bar", now: "2.1 bar", by: "SL 11-Sep", why: "" }, "SL", "AK", "12:30"],
        issue: { principle: "Original, accurate", finding: "The correction keeps the original legible and is initialled and dated, but gives no reason. On a CPP, an unexplained change from a value at the limit to one inside it is exactly what a reviewer must question.", fix: "Ask the operator and check the skid's pressure trend. Add the reason as a dated late entry. If the trend shows 2.4 bar was the true peak, the original value stands." } },
      { id: "f4", cells: ["Volumetric throughput", "≤ 600 L/m²", "412 L/m²", "SL", "AK", "13:44"] },
      { id: "f5", cells: ["Filtration complete", "Record", "13:45", "SL", "AK", "13:45"] },
      { id: "f6", cpp: true, cells: ["Post-use integrity test (FIT-09)", "Pass", "Pass, printout attached", "SL", "AK", "13:20"],
        issue: { principle: "Contemporaneous, consistent", finding: "The post-use integrity test is timed at 13:20, 25 minutes before filtration was recorded as complete. One of the two times is wrong.", fix: "Compare with the integrity tester's printout and the skid's electronic record, which carry their own time stamps. Correct the wrong entry with a reason. If the test really did run before filtration finished, it does not demonstrate integrity for the whole filtration and a deviation is needed." } },
    ],
  },
  {
    id: "ufdf", title: "UF/DF, formulation and bulk fill", page: 34, date: "2024-09-12",
    cols: ["Instruction", "Target or range", "Actual", "By", "Verified", "Time"],
    rows: [
      { id: "u1", cells: ["Diafiltration volumes into FB-04", "≥ 8 DV", "8.2 DV", "AK", "SL", "09:55"] },
      { id: "u2", cells: ["Permeate pH at end of diafiltration", "5.9–6.1", "6.0", "AK", "SL", "09:58"] },
      { id: "u3", cells: ["Add polysorbate 80 stock to target", "0.02% w/v", "0.58 L added", "SL", "PB", "11:20"] },
      { id: "u4", cpp: true, cells: ["Bulk protein concentration (A280, IPC)", "140–160 g/L", "151 g/L", "SL", "PB", "12:05"] },
      { id: "u5", cpp: true, cells: ["Final 0.2 µm filtration, post-use integrity test", "Pass", "Pass, printout attached", "SL", "PB", "15:10"] },
      { id: "u6", cells: ["Bags filled and labelled", "Record", "3 bags: 9.6, 9.6, 9.4 kg", "SL", "PB", "15:30"] },
      { id: "u7", cells: ["Release, stability and retain samples taken", "Per sampling plan SP-417-DS", "Taken, see sample log", "SL", "PB", "15:40"] },
      { id: "u8", cells: ["Transfer to FRZ-06", "≤ −65 °C", "Transferred, −71 °C", "SL", "PB", "17:05"] },
    ],
  },
  {
    id: "yield", title: "Yield and reconciliation", page: 42,
    cols: ["Step", "Mass in", "Mass out", "Step yield", "By", "Verified"],
    rows: [
      { id: "y1", cells: ["Protein A capture", "5.52 kg", "5.23 kg", "94.7%", "RM", "JT"] },
      { id: "y2", cells: ["Inactivation and depth filtration", "5.23 kg", "5.10 kg", "97.5%", "AK", "SL"] },
      { id: "y3", cells: ["Cation exchange", "5.10 kg", "4.64 kg", "91.0%", "AK", "SL"] },
      { id: "y4", cells: ["Anion exchange", "4.64 kg", "4.55 kg", "98.1%", "AK", "SL"] },
      { id: "y5", cells: ["Virus filtration", "4.55 kg", "4.47 kg", "98.2%", "SL", "AK"] },
      { id: "y6", cells: ["UF/DF and formulation", "4.47 kg", "4.38 kg", "99.0%", "SL", "PB"],
        issue: { principle: "Accurate", finding: "Arithmetic error: 4.38 ÷ 4.47 is 98.0%, not 99.0%. Small, but a reviewer recalculates every yield, and a wrong calculation can hide a real loss or an impossible gain.", fix: "Correct with a single line, initials, date and reason. Check whether the same calculation was carried into the overall yield and the batch summary." } },
      { id: "y7", cells: ["Overall, harvest to drug substance", "5.52 kg", "4.38 kg", "79.3%", "PB", "DN"] },
    ],
  },
];

export const BR_ISSUES = BR_SECTIONS.flatMap(s => s.rows.filter(r => r.issue).map(r => ({ ...r, section: s.id })));

export const BR_DEVIATIONS = [
  {
    id: "DEV-24-0187", title: "Low-pH hold exceeded the maximum time", cls: "Minor",
    what: "Hold duration 94 minutes against a range of 60–90 minutes (batch record page 19).",
    cause: "Transfer of neutralisation buffer to the suite was delayed by 20 minutes.",
    impact: "Process characterisation studies held pools at pH 3.5–3.8 for up to 120 minutes with no measurable change in SEC monomer or charge variants. A longer hold does not reduce viral inactivation. In-process and release results for this lot are within the usual range.",
    capa: "Neutralisation buffer staged in the suite before the hold starts; hold timer with alarm at 80 minutes.",
    status: "Closed 2024-09-30 before disposition",
  },
];

export const BR_DISPOSITION = [
  "Batch record reviewed by production (PB) and QA (DN); all review findings corrected or closed through deviations.",
  "Deviations DEV-24-0187 and the calibration deviation raised from review closed with no impact on product quality.",
  "QC results conform to SPEC-DS-417 version 3 (certificate of analysis DS-24-0031).",
  "No open change controls affecting this lot.",
  "Disposition: released by QA, 2024-10-21.",
];

/* ─────────── QC testing records ─────────── */

export const QC_SAMPLES = [
  ["DS-24-0031-R01 to R03", "Release testing", "3 × 5 mL", "SL, 12-Sep 15:40", "≤ −65 °C", "MK, 12-Sep 16:20"],
  ["DS-24-0031-B01", "Bioburden", "1 × 100 mL", "SL, 12-Sep 15:42", "2–8 °C, test within 24 h", "MK, 12-Sep 16:20"],
  ["DS-24-0031-E01", "Endotoxin", "1 × 2 mL, depyrogenated", "SL, 12-Sep 15:43", "2–8 °C", "MK, 12-Sep 16:20"],
  ["DS-24-0031-S01 to S24", "Stability, protocol STB-417-DS-02", "24 × 1 mL", "SL, 12-Sep 15:45", "Per protocol", "TW, 12-Sep 16:35"],
  ["DS-24-0031-X01 to X02", "Retained samples", "2 × 5 mL", "SL, 12-Sep 15:46", "≤ −65 °C", "MK, 12-Sep 16:20"],
];

export const QC_TESTS = [
  {
    id: "sec", name: "SEC", title: "Size-exclusion chromatography", method: "am-sec",
    head: [["Test request", "TR-24-3318"], ["Sample", "DS-24-0031-R01"], ["Procedure", "QC-SOP-0412 version 6"], ["Instrument", "UHPLC HPLC-07, calibration due 2025-01-20"], ["Column", "SEC-C-118, 412 injections"], ["Reference standard", "RS-417-01, lot 2"], ["Analyst / date", "MK, 16-Sep-2024"]],
    sst: [
      ["Blank shows no interfering peaks", "No peak above 0.05% in the integration window", "None"],
      ["Resolution, HMW to monomer (reference)", "≥ 1.5", "2.1"],
      ["Reference standard monomer", "98.0–99.5%", "98.9%"],
      ["Monomer retention time, 5 injections", "RSD ≤ 1.0%", "0.08%"],
      ["Bracketing standard, end of sequence", "Monomer within 0.5% of first injection", "0.1%"],
    ],
    dataHead: ["Injection", "HMW %", "Monomer %", "LMW %"],
    data: [["1", "1.08", "98.62", "0.30"], ["2", "1.12", "98.56", "0.32"], ["3", "1.10", "98.60", "0.30"], ["Mean", "1.10", "98.59", "0.31"]],
    calc: ["Each injection integrated with the validated processing method; no manual integration.", "Mean of three injections calculated in the chromatography data system.", "Rounded to the number of decimals in the specification: monomer 98.6%, HMW 1.1%."],
    raw: "98.59% (mean of 3)",
    reported: [["Monomer", "≥ 95.0%", "98.6%"], ["HMW species", "≤ 3.0%", "1.1%"]],
    whatIf: { label: "Resolution was 1.3", outcome: "The system suitability test fails, so the run is invalid and no sample result can be reported. This is not an OOS result: the instrument or column did not perform, so the lab finds and fixes the cause and repeats the run as the procedure allows." },
  },
  {
    id: "icief", name: "icIEF", title: "Imaged capillary isoelectric focusing", method: "am-cief",
    head: [["Test request", "TR-24-3319"], ["Sample", "DS-24-0031-R01"], ["Procedure", "QC-SOP-0430 version 3"], ["Instrument", "CE-03, calibration due 2025-02-14"], ["Cartridge", "Lot CT-2207"], ["Reference standard", "RS-417-01, lot 2"], ["Analyst / date", "TW, 17-Sep-2024"]],
    sst: [
      ["pI marker calibration", "Linear, r² ≥ 0.99", "0.999"],
      ["Reference standard main peak", "62–70%", "65.8%"],
      ["Reference standard main-peak pI", "8.3–8.5", "8.42"],
    ],
    dataHead: ["Preparation", "Acidic %", "Main %", "Basic %"],
    data: [["1", "23.9", "66.1", "10.0"], ["2", "24.2", "65.8", "10.0"], ["Mean", "24.1", "66.0", "10.0"]],
    calc: ["Peaks assigned by pI relative to the markers; main peak pI 8.41.", "Mean of two independent preparations.", "Main peak reported to whole percent: 66%. Acidic and basic groups are reported for information."],
    raw: "66.0% (mean of 2)",
    reported: [["Main peak", "55–75%", "66%"], ["Acidic variants", "Report result", "24%"], ["Basic variants", "Report result", "10%"]],
    whatIf: { label: "Main peak was 54%", outcome: "The run is valid (system suitability passed) but the result is outside the acceptance criterion. That makes it an OOS result: it is reported to QA and a phase I laboratory investigation starts before any retest is considered." },
  },
  {
    id: "potency", name: "Potency", title: "Cell-based neutralisation bioassay", method: "am-cell-bioassay",
    head: [["Test request", "TR-24-3320"], ["Sample", "DS-24-0031-R02"], ["Procedure", "QC-SOP-0455 version 5"], ["Plate reader", "PR-04, calibration due 2025-03-02"], ["Cell bank", "Assay cells WCB-A, passage 14"], ["Reference standard", "RS-417-01, lot 2"], ["Analyst / date", "JH, 18 and 20-Sep-2024"]],
    sst: [
      ["Reference curve response window", "Upper/lower asymptote ratio ≥ 3", "6.8"],
      ["Reference EC50", "0.8–2.4 µg/mL", "1.31 µg/mL"],
      ["Parallelism, every plate", "Equivalence test within preset margins", "Pass, 4 of 4 plates"],
      ["Model fit", "Four-parameter logistic, no significant lack of fit", "Pass"],
    ],
    dataHead: ["Assay", "Plate", "Relative potency", "Assay mean"],
    data: [["1 (18-Sep)", "A", "95.8%", "97.3%"], ["", "B", "98.9%", ""], ["2 (20-Sep)", "A", "100.6%", "99.0%"], ["", "B", "97.4%", ""]],
    calc: ["Relative potency per plate from a constrained (parallel) four-parameter fit of sample against reference.", "Plates combined by geometric mean, because potency is a ratio.", "Reportable value is the geometric mean of two independent assays: 98.2%, reported as 98%. 95% confidence interval 93–104%."],
    raw: "98.2% (2 assays)",
    reported: [["Relative potency", "70–130%", "98%"]],
    whatIf: { label: "Plate 2B failed parallelism", outcome: "That plate is invalid and cannot contribute. Whether the remaining plates are enough for a reportable value is decided by the procedure, written in advance. An analyst cannot choose which plates to keep after seeing the results." },
  },
  {
    id: "hcp", name: "HCP", title: "Host-cell protein ELISA", method: "am-hcp-elisa",
    head: [["Test request", "TR-24-3321"], ["Sample", "DS-24-0031-R02"], ["Procedure", "QC-SOP-0470 version 2"], ["Plate reader", "PR-04, calibration due 2025-03-02"], ["Kit and standard", "Process-specific anti-HCP, lot HK-0912"], ["Protein concentration used", "151 mg/mL (A280 result)"], ["Analyst / date", "JH, 19-Sep-2024"]],
    sst: [
      ["Standard curve fit", "4PL, R² ≥ 0.99", "0.998"],
      ["Low and high controls", "Within assigned ranges", "Within"],
      ["Spike recovery in sample matrix", "80–120%", "94%"],
      ["Dilutional linearity", "CV of dilution-corrected results ≤ 20%", "0.8%"],
    ],
    dataHead: ["Dilution", "Protein in well (mg/mL)", "HCP measured (ng/mL)", "HCP (ng/mg)"],
    data: [["1:5", "30.2", "241", "7.98"], ["1:10", "15.1", "121", "8.01"], ["1:20", "7.55", "59.6", "7.89"], ["Mean", "", "", "7.96"]],
    calc: ["HCP in ng/mL divided by protein in mg/mL gives ng HCP per mg product, which is ppm.", "Results agree across dilutions, so the matrix is not interfering.", "Mean 7.96 ng/mg, reported as 8 ppm."],
    raw: "7.96 ng/mg",
    reported: [["Host-cell protein", "≤ 100 ppm", "8 ppm"]],
    whatIf: { label: "Results rose with dilution: 5, 8, 13 ng/mg", outcome: "Dilution-dependent results mean the sample does not dilute in parallel with the standard: matrix interference or antibody excess. The CV fails the linearity criterion, so no result is reported. The lab investigates the assay, not the lot." },
  },
  {
    id: "endotoxin", name: "Endotoxin", title: "Bacterial endotoxins, kinetic chromogenic", method: "am-endotoxin",
    head: [["Test request", "TR-24-3322"], ["Sample", "DS-24-0031-E01"], ["Procedure", "QC-SOP-0481 version 4 (Ph. Eur. 2.6.14, USP <85>)"], ["Reader", "KR-02, calibration due 2025-01-08"], ["Lysate / CSE", "Lots LY-3381 / CSE-118"], ["Endotoxin limit", "0.5 EU/mg"], ["Analyst / date", "MK, 13-Sep-2024"]],
    sst: [
      ["Standard curve, 0.005–50 EU/mL", "|r| ≥ 0.980", "0.998"],
      ["Negative control", "Below lowest standard", "< 0.005 EU/mL"],
      ["Positive product control recovery", "50–200%", "87%"],
    ],
    dataHead: ["Replicate", "Dilution", "Measured (EU/mL)", "Result (EU/mg)"],
    data: [["1", "1:1,510", "< 0.005", "< 0.05"], ["2", "1:1,510", "< 0.005", "< 0.05"]],
    calc: ["Maximum valid dilution = limit × concentration ÷ λ = 0.5 EU/mg × 151 mg/mL ÷ 0.005 EU/mL = 15,100.", "Tested at 1:1,510 (0.1 mg/mL), inside the MVD.", "< 0.005 EU/mL × 1,510 ÷ 151 mg/mL = < 0.05 EU/mg."],
    raw: "< 0.005 EU/mL at 1:1,510",
    reported: [["Bacterial endotoxin", "≤ 0.5 EU/mg", "< 0.05 EU/mg"]],
    whatIf: { label: "Spike recovery was 38%", outcome: "Below 50% means the sample inhibits the test, so a low result cannot be trusted and the test is invalid. The usual response is to retest at a higher dilution, still within the MVD. For products prone to low endotoxin recovery, hold-time spike studies are also needed." },
  },
];

export const QC_REVIEW = [
  "Audit trail reviewed for every run used: no unexplained re-processing, deletions or aborted injections.",
  "No manual integration; where it is needed it is justified, recorded and approved.",
  "System suitability met before any sample result was used.",
  "Instruments within calibration; standards, reagents and columns within expiry or use limits.",
  "Calculations recomputed; reported values rounded as the specification states.",
  "Results entered in LIMS match the raw data; LIMS generates the certificate.",
  "No OOS or OOT results; atypical results assessed.",
];
