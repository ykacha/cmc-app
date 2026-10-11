import { render, screen, fireEvent } from "@testing-library/react";
import { STAGES, STAGE, CTD } from "./journey";
import { QTPP, ATTRIBUTES, bandOf, scoreOf, IMPACT_SCALE, UNCERTAINTY_SCALE } from "./product";
import { ANALYTICAL_METHODS } from "../extra-data";
import { CQA_METHODS } from "../analytical-data";
import { CHAPTERS } from "../views/analytical/journey-data";
import { linreg, tolK, mean, sd } from "../views/analytical/stats";
import Science from "../views/science/Science";
import { TOPICS, topicOf } from "./content";
import { WIDGETS } from "../views/science/widgets";
import { RELATIONS } from "./content/quality";
import { OPERATIONS } from "./content/downstream";
import { QC_TESTS, BR_ISSUES } from "./content/records";

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

describe("Deep-dive content integrity", () => {
  const VIEWS = new Set(["analytical", "compendial", "excipient", "stability", "batch", "viral", "qbd", "ctd", "pipeline"]);
  const ANALYTICAL_CH = new Set(["journey", "atlas", "cqa", "lifecycle", "validation", "sst", "standards", "specs", "stability", "oos", "comparability", "strategy", "review"]);
  const all = Object.entries(TOPICS).flatMap(([stage, ts]) => ts.map(t => ({ stage, ...t })));

  test("every stage with topics exists and topic ids are unique", () => {
    Object.entries(TOPICS).forEach(([stage, ts]) => {
      expect(STAGE[stage]).toBeDefined();
      expect(new Set(ts.map(t => t.id)).size).toBe(ts.length);
    });
  });
  test("every cross-link resolves to a real page", () => {
    const broken = all.flatMap(t => t.blocks.filter(b => b.t === "links").flatMap(b => b.items)).filter(({ to }) => {
      if (to.includes(":")) {
        const [view, focus] = to.split(":");
        if (!VIEWS.has(view)) return true;
        if (view !== "analytical" || !focus) return false;
        const [ch, item] = focus.split("/");
        return !ANALYTICAL_CH.has(ch) || (ch === "atlas" && item && !methodIds.has(item));
      }
      const [stage, topic] = to.split("/");
      return !STAGE[stage] || (topic && !topicOf(stage, topic));
    });
    expect(broken).toEqual([]);
  });
  test("every widget referenced by content exists", () => {
    all.flatMap(t => t.blocks.filter(b => b.t === "widget")).forEach(b => expect(WIDGETS[b.id]).toBeDefined());
  });
  test("relationship explorer and process data use real method ids", () => {
    RELATIONS.forEach(r => r.analytical.forEach(([, m]) => expect(methodIds.has(m)).toBe(true)));
    OPERATIONS.forEach(o => o.methods.forEach(m => expect(methodIds.has(m)).toBe(true)));
    QC_TESTS.forEach(t => expect(methodIds.has(t.method)).toBe(true));
  });
  test("every topic page renders, including its widgets", () => {
    all.forEach(t => {
      const { unmount } = render(<Science navigate={() => {}} focus={`${t.stage}/${t.id}`} />);
      expect(screen.getByRole("heading", { level: 1, name: t.title })).toBeInTheDocument();
      unmount();
    });
  });
});

describe("Science views", () => {
  test("a stage page lists its topics", () => {
    render(<Science navigate={() => {}} focus="downstream" />);
    expect(screen.getByText("Inside this stage.")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /The purification train/ }).length).toBeGreaterThan(1);
  });
  test("the FMEA ranking changes when sorted by severity", () => {
    render(<Science navigate={() => {}} focus="qbd/fmea" />);
    fireEvent.click(screen.getByRole("button", { name: "Rank by severity" }));
    const first = screen.getAllByRole("row")[1];
    expect(first.textContent).toMatch(/Low-pH hold|Virus filtration/);
  });
  test("the QTPP stage renders and the risk detail responds to selection", () => {
    render(<Science navigate={() => {}} focus="qtpp" />);
    expect(screen.getByText("The QTPP for CMX-417.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Aggregates (HMW), score 80" }));
    expect(screen.getAllByText(/16 × 5 = 80/).length).toBeGreaterThan(0);
  });
  test("the batch record review scores raised findings", () => {
    render(<Science navigate={() => {}} focus="specs/batchrecord" />);
    expect(BR_ISSUES).toHaveLength(6);
    fireEvent.click(screen.getByRole("button", { name: "Review it as QA" }));
    fireEvent.click(screen.getByRole("button", { name: "Equipment" }));
    fireEvent.click(screen.getByRole("button", { name: "Raise PHM-114" }));
    fireEvent.click(screen.getByRole("button", { name: "Raise CHR-02" }));
    fireEvent.click(screen.getByRole("button", { name: "Check my review" }));
    expect(screen.getByText("1 of 6 found, 1 not an issue")).toBeInTheDocument();
  });
  test("the overview switches to the CTD evidence map", () => {
    render(<Science navigate={() => {}} focus={null} />);
    fireEvent.click(screen.getByRole("tab", { name: "CTD evidence map" }));
    expect(screen.getByText("Quality Overall Summary")).toBeInTheDocument();
  });
});
