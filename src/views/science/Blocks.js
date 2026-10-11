import { Fragment } from "react";
import { GLOSSARY } from "../../cmc-data";
import { WIDGETS } from "./widgets";

/* Renders structured deep-dive content. Content lives in src/science/content;
   this file decides how each kind of block looks.

   Block types:
     p        { text }                         paragraph (supports **bold**)
     h        { text }                         subheading
     list     { items }                        bulleted list
     steps    { items }                        numbered workflow
     chain    { items }                        causal chain, read left to right
     table    { head, rows }                   data table
     grid     { items: [{ title, text }] }     definitions side by side
     callout  { title, text, tone }            highlighted point (tone: note | risk | reg)
     widget   { id, props }                    interactive component from widgets/
     links    { items: [{ label, to }] }       cross-links: "stage/topic" or "view:focus"
     refs     { items }                        references, collapsed */

// glossary terms get a hover definition the first time they appear on a page
const GLOSS = Object.fromEntries(GLOSSARY.map(g => [g.term, g.def]));
const GLOSS_RE = new RegExp(`\\b(${GLOSSARY.map(g => g.term.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")).sort((a, b) => b.length - a.length).join("|")})\\b`);
function gloss(text, seen, key) {
  if (!seen) return text;
  const out = []; let rest = String(text), k = 0;
  for (;;) {
    const m = rest.match(GLOSS_RE);
    if (!m || seen.has(m[1])) { out.push(rest); break; }
    seen.add(m[1]);
    out.push(rest.slice(0, m.index));
    out.push(<abbr key={`${key}-${k++}`} className="bk-gloss" title={GLOSS[m[1]]} tabIndex={0}>{m[1]}</abbr>);
    rest = rest.slice(m.index + m[1].length);
  }
  return out;
}

// minimal inline formatting: **bold**, plus glossary definitions
function rich(text, seen) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => p.startsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong> : <Fragment key={i}>{gloss(p, seen, i)}</Fragment>);
}
export const slug = (t) => String(t).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function Blocks({ blocks, go, nav, dark }) {
  const seen = new Set();   // rebuilt every render, so the first mention is always the one defined
  const follow = (to) => {
    if (to.includes(":")) { const [view, focus] = to.split(":"); nav(view, focus || null); }
    else go(to);
  };
  return (
    <div className="bk">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "p": return <p key={i} className="an-prose bk-p">{rich(b.text, seen)}</p>;
          case "h": return <h3 key={i} id={slug(b.text)} className="bk-h">{b.text}</h3>;
          case "list": return <ul key={i} className="an-list bk-list">{b.items.map((x, k) => <li key={k}>{rich(x, seen)}</li>)}</ul>;
          case "steps": return (
            <ol key={i} className="bk-steps">{b.items.map((x, k) => <li key={k}><span className="sv-mono">{String(k + 1).padStart(2, "0")}</span><span>{rich(x, seen)}</span></li>)}</ol>
          );
          case "chain": return (
            <div key={i} className="bk-chain" role="list">
              {b.items.map((x, k) => (
                <Fragment key={k}>
                  <div role="listitem" className="bk-chain-node"><span>{x.label || ""}</span><strong>{rich(x.text || x)}</strong></div>
                  {k < b.items.length - 1 && <span className="bk-chain-arrow" aria-hidden="true" />}
                </Fragment>
              ))}
            </div>
          );
          case "table": return (
            <div key={i} className="sv-tablewrap bk-table">
              <table className="sv-table">
                <thead><tr>{b.head.map(h => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>{b.rows.map((r, k) => <tr key={k} style={{ "--row": "var(--chain-h)" }}>{r.map((c, j) => <td key={j}>{j === 0 ? <span className="sv-rowname bk-first">{rich(c)}</span> : rich(c)}</td>)}</tr>)}</tbody>
              </table>
            </div>
          );
          case "grid": return (
            <div key={i} className={`bk-grid bk-grid-${b.cols || 3}`}>{b.items.map((x, k) => <div key={k}><i /><strong>{x.title}</strong><p>{rich(x.text, seen)}</p></div>)}</div>
          );
          case "callout": return <div key={i} className={`bk-callout bk-${b.tone || "note"}`}><strong>{b.title}</strong><p>{rich(b.text, seen)}</p></div>;
          case "widget": { const W = WIDGETS[b.id]; return W ? <div key={i} className="bk-widget"><W {...(b.props || {})} go={go} nav={nav} dark={dark} /></div> : null; }
          case "links": return (
            <div key={i} className="bk-links"><span>Connects to</span>{b.items.map(x => <button key={x.label} className="sv-tab" onClick={() => follow(x.to)}>{x.label}</button>)}</div>
          );
          case "refs": return (
            <details key={i} className="bk-refs"><summary>References and guidance</summary><ul>{b.items.map(x => <li key={x}>{x}</li>)}</ul></details>
          );
          default: return null;
        }
      })}
    </div>
  );
}
