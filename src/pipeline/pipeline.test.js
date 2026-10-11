import { render, screen, fireEvent } from "@testing-library/react";
import { PIPELINE } from "../cmc-data";
import { STAGE_OVERVIEWS } from "../pipeline-overview-data";
import { PLANT, PHASES, TO_JOURNEY } from "./plant";
import { STAGE } from "../science/journey";
import Pipeline from "../views/pipeline/Pipeline";

describe("Pipeline content", () => {
  test("every station has line content, an overview and a valid Journey link", () => {
    PIPELINE.forEach(s => {
      expect(PLANT[s.id]).toBeDefined();
      expect(PLANT[s.id].people.length).toBeGreaterThan(0);
      expect(STAGE_OVERVIEWS[s.id]).toBeDefined();
      expect(STAGE[TO_JOURNEY[s.id]]).toBeDefined();
    });
  });
  test("phases cover every station exactly once", () => {
    const covered = PHASES.flatMap(p => Array.from({ length: p.range[1] - p.range[0] + 1 }, (_, i) => p.range[0] + i));
    expect(covered).toEqual(PIPELINE.map(s => +s.stage));
  });
});

describe("Pipeline views", () => {
  test("the line lists every station in the index", () => {
    render(<Pipeline navigate={() => {}} focus={null} />);
    expect(screen.getByRole("heading", { level: 1, name: /How a biologic/ })).toBeInTheDocument();
    PIPELINE.forEach(s => expect(screen.getAllByText(s.label).length).toBeGreaterThan(0));
  });
  test("every station page renders its deep dives", () => {
    PIPELINE.forEach(s => {
      const { unmount } = render(<Pipeline navigate={() => {}} focus={s.id} />);
      expect(screen.getByRole("heading", { level: 1, name: s.label })).toBeInTheDocument();
      expect(screen.getAllByRole("button", { expanded: false }).length).toBe(s.topics.length);
      unmount();
    });
  });
  test("a deep link opens its card, and cards toggle", () => {
    const s = PIPELINE[4], t = s.topics[1];
    render(<Pipeline navigate={() => {}} focus={`${s.id}/${t.id}`} />);
    expect(screen.getByText(t.body)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: new RegExp(t.title) }));
    expect(screen.queryByText(t.body)).toBeNull();
  });
});
