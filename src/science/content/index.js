import { CANDIDATE, CELLLINE } from "./molecule";
import { UPSTREAM } from "./upstream";
import { DOWNSTREAM } from "./downstream";
import { ANALYTICAL } from "./analytical";
import { FORMULATION, STABILITY } from "./formulation";
import { QBD, SPECS, CTD_TOPICS } from "./quality";
import { TRANSFER } from "./transfer";
import { STABILITY_CONDITIONS_TOPIC, VIRAL_STUDIES_TOPIC } from "./merged";

/* Deep-dive topics per journey stage. Proposal and QTPP also have a worked
   example (src/views/science/Proposal.js, Qtpp.js). */
export const TOPICS = {
  proposal: CANDIDATE,
  cellline: CELLLINE,
  upstream: UPSTREAM,
  downstream: [...DOWNSTREAM.slice(0, 5), VIRAL_STUDIES_TOPIC, ...DOWNSTREAM.slice(5)],
  analytical: ANALYTICAL,
  formulation: FORMULATION,
  stability: [...STABILITY.slice(0, 2), STABILITY_CONDITIONS_TOPIC, ...STABILITY.slice(2)],
  qbd: QBD,
  transfer: TRANSFER,
  specs: SPECS,
  ctd: CTD_TOPICS,
};

export const topicOf = (stage, topic) => (TOPICS[stage] || []).find(t => t.id === topic);
