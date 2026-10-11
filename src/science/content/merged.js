/* Topics folded in from the former Stability Studies and Viral Clearance
   sections, built from their reference data so nothing was lost. */
import { STABILITY_CONDITIONS, ICH_Q1_ZONES, STABILITY_TIMEPOINTS } from "../../stability-data";
import { MODEL_VIRUSES, CLEARANCE_STEPS, SPIKING_WORKFLOW, VIRAL_FACTS } from "../../viral-data";

const tp = (id) => (STABILITY_TIMEPOINTS[id] || []).join(", ");

export const STABILITY_CONDITIONS_TOPIC = {
  id: "conditions", title: "Storage conditions, climatic zones and pull points",
  lede: "The conditions a stability programme is run at, why each exists, and which markets they serve.",
  blocks: [
    { t: "p", text: "ICH Q1A(R2) defines storage conditions for new drug substances and products; ICH Q5C adapts them for biotechnological products, which are usually stored refrigerated or frozen, so the long-term condition is 5 °C (or the frozen storage temperature) and 25 °C serves as the accelerated condition." },
    { t: "table", head: ["Study", "Condition", "Humidity", "Typical duration", "Purpose", "Pull points (months)"], rows: STABILITY_CONDITIONS.map(c => [c.label, c.temp, c.rh, c.duration, c.purpose || c.description, tp(c.id) || "Per protocol"]) },
    { t: "callout", tone: "note", title: "Which rows apply to an antibody", text: "For a refrigerated monoclonal antibody, the shelf life comes from real-time data at 5 °C; 25 °C/60% RH is the accelerated condition and supports excursions; 40 °C is a stress condition, not the basis of a shelf life. Frozen drug substance is held at its own storage temperature, often well below −20 °C." },
    { t: "h", text: "Climatic zones" },
    { t: "table", head: ["Zone", "Climate", "Long-term condition", "Example markets"], rows: ICH_Q1_ZONES.map(z => [z.zone, z.label, z.mkt, z.countries]) },
    { t: "p", text: "Zones decide the long-term condition for products stored at room temperature. A refrigerated biologic is labelled 2–8 °C everywhere, but shipping and in-use studies should still reflect hot-climate distribution where the product is sold." },
    { t: "links", items: [{ label: "Types of stability study", to: "stability/studies" }, { label: "Shelf-life calculator", to: "tools:shelf" }, { label: "Trends and shelf life", to: "stability/trends" }] },
    { t: "refs", items: ["ICH Q1A(R2): Stability testing of new drug substances and products", "ICH Q5C: Stability testing of biotechnological/biological products", "ICH Q1B: Photostability testing"] },
  ],
};

export const VIRAL_STUDIES_TOPIC = {
  id: "viralstudies", title: "Model viruses and clearance studies",
  lede: "Which viruses a clearance study uses, which steps earn credit, and how the spiking study is run.",
  blocks: [
    { t: "h", text: "The model virus panel" },
    { t: "table", head: ["Virus", "Family", "Genome", "Envelope", "Size", "Resistance", "Why it is used"], rows: MODEL_VIRUSES.map(m => [m.name, m.family, m.genome, m.env, m.size, m.resistance, m.role]) },
    { t: "h", text: "Steps that clear virus" },
    { t: "table", head: ["Step", "Mechanism", "Typical LRV", "How it works"], rows: CLEARANCE_STEPS.map(c => [c.name, c.mech, c.lrv, c.how]) },
    { t: "callout", tone: "risk", title: "Orthogonality", text: VIRAL_FACTS.orthogonality },
    { t: "callout", tone: "note", title: "Small reductions", text: VIRAL_FACTS.cap },
    { t: "h", text: "Running a spiking study" },
    { t: "steps", items: SPIKING_WORKFLOW.map(s => `**${s.t}.** ${s.d}`) },
    { t: "links", items: [{ label: "LRV and safety margin calculator", to: "tools:lrv" }, { label: "Viral safety principles", to: "downstream/viral" }, { label: "The purification train", to: "downstream/train" }] },
    { t: "refs", items: ["ICH Q5A(R2): Viral safety evaluation of biotechnology products derived from cell lines of human or animal origin (2023)"] },
  ],
};
