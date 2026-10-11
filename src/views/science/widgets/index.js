import { Bioreactor, CultureProfile, Train, Clearance, Formulations, Injection, StabilityTrend } from "./process";
import { Explorer, Fmea, Doe, DesignSpace, ControlLayers, Coa, CtdNavigator } from "./quality";
import { BatchRecord, QcRecord } from "./records";

/* Interactive teaching components, referenced by id from content blocks. */
export const WIDGETS = {
  bioreactor: Bioreactor,
  cultureProfile: CultureProfile,
  train: Train,
  clearance: Clearance,
  formulations: Formulations,
  injection: Injection,
  stabilityTrend: StabilityTrend,
  explorer: Explorer,
  fmea: Fmea,
  doe: Doe,
  designSpace: DesignSpace,
  controlLayers: ControlLayers,
  coa: Coa,
  ctdNavigator: CtdNavigator,
  batchRecord: BatchRecord,
  qcRecord: QcRecord,
};
