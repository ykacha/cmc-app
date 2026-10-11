import { lrv, particleMargin, endotoxin, hcpPpm, dfRemaining, dfVolumesFor, tolerance, shelfLife, column, overallYield } from "./calc";

describe("workbench calculations", () => {
  test("LRV ignores steps under 1 log and flags shared mechanisms", () => {
    const r = lrv([{ mech: "a", inTiter: 1e6, outTiter: 1e2 }, { mech: "a", inTiter: 1e6, outTiter: 1e3 }, { mech: "b", inTiter: 1e6, outTiter: 5e5 }]);
    expect(r.total).toBeCloseTo(7, 6);
    expect(r.rows[2].counted).toBe(false);
    expect(r.dupes).toEqual(["a"]);
  });
  test("particle margin", () => {
    expect(particleMargin({ rvlpPerMl: 1e6, harvestLPerDose: 1, totalLrv: 15 }).logPerDose).toBeCloseTo(-6, 6);
  });
  test("endotoxin K/M and MVD match the worked QC example", () => {
    const r = endotoxin({ doseMgPerKg: 10, concMgPerMl: 151, lambda: 0.005 });
    expect(r.limit).toBeCloseTo(0.5, 6);
    expect(r.mvd).toBeCloseTo(15100, 3);
  });
  test("HCP ppm, diafiltration and yield", () => {
    expect(hcpPpm(121, 15.1)).toBeCloseTo(8.01, 2);
    expect(dfRemaining(7)).toBeLessThan(0.001);
    expect(dfVolumesFor(Math.exp(-5))).toBeCloseTo(5, 6);
    expect(overallYield([50, 50])).toBeCloseTo(25, 6);
    expect(column({ massG: 1000, loadGPerL: 40, columnL: 10 }).cycles).toBe(3);
  });
  test("tolerance interval brackets the mean and needs three results", () => {
    expect(tolerance([1, 2])).toBeNull();
    const r = tolerance([10, 11, 9, 10, 10.5, 9.5]);
    expect(r.lo).toBeLessThan(r.mean); expect(r.hi).toBeGreaterThan(r.mean);
  });
  test("shelf life: a flat trend never crosses, a steep one does", () => {
    const flat = shelfLife([0, 6, 12, 18, 24].map(t => ({ t, y: 99 + (t % 2 ? 0.05 : -0.05) })), 95);
    expect(flat.cross).toBeNull();
    const steep = shelfLife([0, 3, 6, 9, 12].map(t => ({ t, y: 100 - 0.5 * t + (t % 2 ? 0.1 : -0.1) })), 95);
    expect(steep.cross).toBeGreaterThan(8); expect(steep.cross).toBeLessThan(10);
  });
});
