import { useRef, useState } from "react";
import { ANALYTICAL_METHODS } from "../../extra-data";
import { QUALITY_ATTRIBUTES, CQA_METHODS, ATTR_GROUPS } from "../../analytical-data";

/* The CQA × Method orthogonality map: 17 attributes against 22 assays.
   Rows select an attribute; column headers open the assay. */

const byId = Object.fromEntries(ANALYTICAL_METHODS.map(m => [m.id, m]));
const ROLE_LINE = {
  primary: "Primary: the assay the specification is written on",
  orthogonal: "Orthogonal: a different physical principle that confirms it",
  supporting: "Supporting: screening and context",
};
const Dot = ({ role }) => <span className={`cm-dot cm-${role}`} aria-label={role} />;

export default function CqaMethod({ item, go }) {
  const [sel, setSel] = useState(item && CQA_METHODS[item] ? item : "agg");
  const [hoverCol, setHoverCol] = useState(null);
  const detail = useRef(null);
  const q = QUALITY_ATTRIBUTES.find(c => c.id === sel);
  const entry = CQA_METHODS[sel];
  const roleAt = (cid, mid) => CQA_METHODS[cid].methods.find(x => x.m === mid)?.role || null;
  const pick = (id) => { setSel(id); if (window.innerWidth < 1100) setTimeout(() => detail.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60); };
  const count = (cid) => CQA_METHODS[cid].methods.length;

  return (
    <div className="cm">
      <div className="cm-legend">
        <span><Dot role="primary" />Primary</span>
        <span><Dot role="orthogonal" />Orthogonal</span>
        <span><Dot role="supporting" />Supporting</span>
        <span className="cm-legend-note">Select a row to read the attribute. Select a column to open the assay.</span>
      </div>

      <div className="cm-wrap">
        <table className="cm-table">
          <thead>
            <tr>
              <th className="cm-corner">Quality attribute</th>
              {ANALYTICAL_METHODS.map(m => (
                <th key={m.id} className={`cm-col${hoverCol === m.id ? " is-hover" : ""}`} onMouseEnter={() => setHoverCol(m.id)} onMouseLeave={() => setHoverCol(null)}>
                  <button onClick={() => go("atlas/" + m.id)} title={`Open ${m.name}`}><span>{m.abbreviation}</span></button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {QUALITY_ATTRIBUTES.map(c => {
              const on = c.id === sel;
              return (
                <tr key={c.id} className={on ? "is-on" : ""} style={{ "--grp": ATTR_GROUPS[c.group]?.color }}>
                  <th scope="row" className="cm-rowhead">
                    <button onClick={() => pick(c.id)} aria-pressed={on}>
                      <i />{c.name}<span className="sv-mono">{count(c.id)}</span>
                    </button>
                  </th>
                  {ANALYTICAL_METHODS.map(m => {
                    const r = roleAt(c.id, m.id);
                    return (
                      <td key={m.id} className={hoverCol === m.id ? "is-hover" : ""} onClick={() => pick(c.id)}
                        onMouseEnter={() => setHoverCol(m.id)} onMouseLeave={() => setHoverCol(null)}
                        title={r ? `${c.name} × ${m.abbreviation}: ${r}` : undefined}>
                        {r ? <Dot role={r} /> : <span className="cm-none" />}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="cm-detail" ref={detail} key={sel}>
        <div className="cm-attr">
          <h2 className="an-abbr cm-name">{q.name}</h2>
          <p className="an-chiprow">
            <span className="sv-chip" style={{ "--chip": ATTR_GROUPS[q.group]?.color }}>{q.group}</span>
            <span className="sv-chip" style={{ "--chip": q.risk === "High" ? "var(--glycan)" : "var(--chain-l)" }}>{q.risk} risk</span>
          </p>
          <dl className="am-wwd">
            <div><dt>What it is</dt><dd>{q.what}</dd></div>
            <div><dt>Why it matters</dt><dd>{q.why}</dd></div>
            <div><dt>What drives it</dt><dd>{q.drivers}</dd></div>
          </dl>
        </div>
        <div className="cm-methods">
          {entry.ortho && (<>
            <h3 className="an-h3" style={{ marginTop: 0 }}>Why one method is not enough</h3>
            <p className="an-prose an-pearl">{entry.ortho}</p>
          </>)}
          {["primary", "orthogonal", "supporting"].map(role => {
            const ms = entry.methods.filter(x => x.role === role);
            if (!ms.length) return null;
            return (
              <div key={role}>
                <h3 className="an-h3 cm-rolehead"><Dot role={role} />{ROLE_LINE[role]}</h3>
                {ms.map(x => (
                  <button key={x.m} className="am-method" onClick={() => go("atlas/" + x.m)}>
                    <strong>{byId[x.m]?.abbreviation}</strong>
                    <span>{x.note}</span>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
