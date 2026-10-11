import { CANDIDATE, CELLLINE } from "./molecule";
import { UPSTREAM } from "./upstream";
import { DOWNSTREAM } from "./downstream";
import { ANALYTICAL } from "./analytical";
import { FORMULATION, STABILITY } from "./formulation";
import { QBD, SPECS, CTD_TOPICS } from "./quality";
import { TRANSFER } from "./transfer";

/* Deep-dive topics per journey stage. Proposal and QTPP also have a worked
   example (src/views/science/Proposal.js, Qtpp.js). */
export const TOPICS = {
  proposal: CANDIDATE,
  cellline: CELLLINE,
  upstream: UPSTREAM,
  downstream: DOWNSTREAM,
  analytical: ANALYTICAL,
  formulation: FORMULATION,
  stability: STABILITY,
  qbd: QBD,
  transfer: TRANSFER,
  specs: SPECS,
  ctd: CTD_TOPICS,
};

export const topicOf = (stage, topic) => (TOPICS[stage] || []).find(t => t.id === topic);
