import { render, screen, fireEvent } from "@testing-library/react";
import { CHAPTERS, PARTS, ROLES, MARKS, AUDIENCES, chaptersFor, checklistFor } from "./content";
import Careers from "../views/careers/Careers";

describe("career guide", () => {
  test("content is well formed", () => {
    const parts = new Set(PARTS.map(p => p.id));
    CHAPTERS.forEach(c => { expect(parts.has(c.part)).toBe(true); c.blocks.filter(b => b.t === "mark").forEach(b => expect(MARKS[b.kind]).toBeDefined()); });
    expect(new Set(CHAPTERS.map(c => c.id)).size).toBe(CHAPTERS.length);
    ROLES.forEach(r => { expect(r.entry.length).toBeGreaterThan(0); expect(r.path.length).toBeGreaterThan(0); });
    const ids = new Set(AUDIENCES.map(a => a.id));
    CHAPTERS.forEach(c => { expect(c.for.length).toBeGreaterThan(0); c.for.forEach(a => expect(ids.has(a)).toBe(true)); });
  });
  test("each track renders only its own questions", () => {
    AUDIENCES.forEach(a => {
      const { unmount } = render(<Careers navigate={() => {}} focus={a.id} />);
      expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(chaptersFor(a.id).length);
      unmount();
    });
  });
  test("renders the student track, explores roles and ticks actions", () => {
    render(<Careers navigate={() => {}} />);
    chaptersFor("student").forEach(c => expect(screen.getByRole("heading", { level: 3, name: new RegExp(c.q.replace(/[?]/g, "\\?")) })).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "Quality" }));
    fireEvent.click(screen.getByRole("button", { name: "QC microbiology" }));
    expect(screen.getByRole("heading", { level: 4, name: "QC microbiology" })).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("button", { name: "Mark as done" })[0]);
    expect(screen.getByText(`1 of ${checklistFor("student").length}`)).toBeInTheDocument();
  });
});
