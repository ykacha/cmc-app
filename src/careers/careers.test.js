import { render, screen, fireEvent } from "@testing-library/react";
import { CHAPTERS, PARTS, ROLES, CHECKLIST, MARKS } from "./content";
import Careers from "../views/careers/Careers";

describe("career guide", () => {
  test("content is well formed", () => {
    const parts = new Set(PARTS.map(p => p.id));
    CHAPTERS.forEach(c => { expect(parts.has(c.part)).toBe(true); c.blocks.filter(b => b.t === "mark").forEach(b => expect(MARKS[b.kind]).toBeDefined()); });
    expect(new Set(CHAPTERS.map(c => c.id)).size).toBe(CHAPTERS.length);
    ROLES.forEach(r => { expect(r.entry.length).toBeGreaterThan(0); expect(r.path.length).toBeGreaterThan(0); });
  });
  test("renders every question, explores roles and ticks actions", () => {
    render(<Careers navigate={() => {}} />);
    CHAPTERS.forEach(c => expect(screen.getByRole("heading", { level: 3, name: new RegExp(c.q.replace(/[?]/g, "\\?")) })).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "Quality" }));
    fireEvent.click(screen.getByRole("button", { name: "QC microbiology" }));
    expect(screen.getByRole("heading", { level: 4, name: "QC microbiology" })).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("button", { name: "Mark as done" })[0]);
    expect(screen.getByText(`1 of ${CHECKLIST.length}`)).toBeInTheDocument();
  });
});
