/* Splits a card's reference string ("ICH Q11 | Gustafsson et al. Trends Biotechnol 2004;22:346-53")
   into sources, and tells research papers apart from guidance and standards.
   Only citations already in the content are used. */

const GUIDANCE = /^(ICH|FDA|USP|EU\b|EMA|Ph\.? ?Eur|WHO|21 ?CFR|EudraLex|PDA|ISPE|PIC\/S|ISO|ASTM|JP\b|CASSS)|Guidance|Guideline|Annex|Case Study/i;
const AUTHOR = /^[A-Z][A-Za-z'-]+( [A-Z]{1,3}\.?| et al\.?| & [A-Z][A-Za-z'-]+)/;
const YEAR = /\b(19|20)\d\d\b/;

export function splitRefs(ref) {
  return String(ref || "").split("|").map(t => t.trim()).filter(Boolean).map(text => ({
    text,
    paper: !GUIDANCE.test(text) && (/et al/.test(text) || (AUTHOR.test(text) && YEAR.test(text))),
  }));
}

export const pubmed = (citation) => `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(citation.replace(/;.*$/, "").replace(/\(.*?\)/g, ""))}`;

// every paper cited anywhere in a stage, with the cards and questions that cite it
export function stagePapers(stage) {
  const map = new Map();
  [...stage.topics.map(t => ({ ...t, kind: "card" })), ...stage.questions.map(q => ({ ...q, title: q.q, kind: "question" }))].forEach(item => {
    splitRefs(item.ref).filter(r => r.paper).forEach(r => {
      const key = r.text.replace(/\s+/g, " ");
      if (!map.has(key)) map.set(key, { text: key, citedBy: [] });
      map.get(key).citedBy.push({ id: item.id, title: item.title, kind: item.kind });
    });
  });
  return [...map.values()];
}
