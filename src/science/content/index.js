import { CANDIDATE, CELLLINE } from "./molecule";
import { UPSTREAM } from "./upstream";
import { DOWNSTREAM } from "./downstream";
import { ANALYTICAL } from "./analytical";
import { FORMULATION, STABILITY } from "./formulation";
import { QBD, SPECS, CTD_TOPICS } from "./quality";

/* Deep-dive topics per journey stage. Proposal and QTPP are taught through
   a worked example instead (src/views/science/Proposal.js, Qtpp.js). */
export const TOPICS = {
  candidate: CANDIDATE,
  cellline: CELLLINE,
  upstream: UPSTREAM,
  downstream: DOWNSTREAM,
  analytical: ANALYTICAL,
  formulation: FORMULATION,
  stability: STABILITY,
  qbd: QBD,
  specs: SPECS,
  ctd: CTD_TOPICS,
};

export const topicOf = (stage, topic) => (TOPICS[stage] || []).find(t => t.id === topic);
