import { render, screen, fireEvent } from "@testing-library/react";
import { STAGES, STAGE, CTD } from "./journey";
import { QTPP, ATTRIBUTES, bandOf, scoreOf, IMPACT_SCALE, UNCERTAINTY_SCALE } from "./product";
import { ANALYTICAL_METHODS } from "../extra-data";
import { CQA_METHODS } from "../analytical-data";
import { CHAPTERS } from "../views/analytical/journey-data";
import { linreg, tolK, mean, sd } from "../views/analytical/stats";
import Science from "../views/science/Science";

const methodIds = new Set(ANALYTICAL_METHODS.map(m => m.id));
const ctdIds = new Set(CTD.map(c => c.id));

describe("Science journey data integrity", () => {
  test("every stage maps only to known CTD sections and known stages", () => {
    STAGES.forEach(s => {
      s.ctd.forEach(c => expect(ctdIds.has(c.s)).toBe(true));
      s.feeds.forEach(f => expect(STAGE[f]).toBeDefined());
    });
  });
  test("QTPP links only to defined attributes", () => {
    const ids = new Set(ATTRIBUTES.map(a => a.id));
    QTPP.forEach(q => q.attrs.forEach(a => expect(ids.has(a)).toBe(true)));
  });
  test("attributes reference real methods, CQA entries and valid scales", () => {
    const iv = IMPACT_SCALE.map(x => x.v), uv = UNCERTAINTY_SCALE.map(x => x.v);
    ATTRIBUTES.forEach(a => {
      a.methods.forEach(m => expect(methodIds.has(m)).toBe(true));
      expect(a.cqa === null || CQA_METHODS[a.cqa] !== undefined).toBe(true);
      expect(iv).toContain(a.impact);
      expect(uv).toContain(a.uncertainty);
    });
  });
  test("risk bands follow the programme rule", () => {
    expect(bandOf(100).id).toBe("high");
    expect(bandOf(60).id).toBe("high");
    expect(bandOf(48).id).toBe("mod");
    expect(bandOf(12).id).toBe("low");
    expect(scoreOf({ impact: 20, uncertainty: 5 })).toBe(100);
  });
});

describe("Analytical content integrity", () => {
  test("guided chapters and the CQA map use real method ids", () => {
    CHAPTERS.forEach(c => c.assays.forEach(a => expect(methodIds.has(a.id)).toBe(true)));
    Object.values(CQA_METHODS).forEach(v => v.methods.forEach(m => expect(methodIds.has(m.m)).toBe(true)));
  });
});

describe("Statistics used by the labs", () => {
  test("linear regression recovers an exact line", () => {
    const f = linreg([1, 2, 3, 4], [3, 5, 7, 9]);
    expect(f.b).toBeCloseTo(2, 10);
    expect(f.a).toBeCloseTo(1, 10);
    expect(f.r2).toBeCloseTo(1, 10);
  });
  test("mean and SD", () => {
    expect(mean([2, 4, 6])).toBe(4);
    expect(sd([2, 4, 6])).toBeCloseTo(2, 10);
  });
  test("tolerance factor shrinks with more lots and is near published values", () => {
    expect(tolK(10)).toBeGreaterThan(tolK(30));
    expect(tolK(10)).toBeGreaterThan(4.3);   // tabulated 99%/95% two-sided k for n = 10 is about 4.43
    expect(tolK(10)).toBeLessThan(4.6);
  });
});

describe("Science views", () => {
  test("the QTPP stage renders and the risk detail responds to selection", () => {
    render(<Science navigate={() => {}} focus="qtpp" />);
    expect(screen.getByText("The QTPP for CMX-417.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Aggregates (HMW), score 80" }));
    expect(screen.getAllByText(/16 × 5 = 80/).length).toBeGreaterThan(0);
  });
  test("the overview switches to the CTD evidence map", () => {
    render(<Science navigate={() => {}} focus={null} />);
    fireEvent.click(screen.getByRole("tab", { name: "CTD evidence map" }));
    expect(screen.getByText("Quality Overall Summary")).toBeInTheDocument();
  });
});
