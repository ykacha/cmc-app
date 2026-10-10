import { STAGES, STAGE, CTD, GROUPS } from "../../science/journey";
import { STAGE_STATE, PRODUCT } from "../../science/product";
import { CtdChip } from "../../science/ui";

const ctdTitle = Object.fromEntries(CTD.map(c => [c.id, c.title]));
const num = (n) => String(n).padStart(2, "0");

/* The section hero: one screen that explains a stage's purpose, flow,
   decisions, risks, product status and CTD destination. Deep content
   follows below it on built stages. */
export default function StageHero({ id, go, nav }) {
  const s = STAGE[id];
  const st = STAGE_STATE[id];
  const i = STAGES.findIndex(x => x.id === id);
  const prev = STAGES[i - 1], next = STAGES[i + 1];
  const group = GROUPS.find(g => g.id === s.group);

  return (
    <header className="sh">
      <div className="sh-top">
        <h1 className="sh-title"><span className="sv-mono ch-num">{num(s.n)}</span>{s.title}</h1>
        <p className="sh-purpose">{s.purpose}</p>
      </div>

      <div className="sh-where" aria-label="Position in the development journey">
        <span>{group.title}</span>
        <ol>
          {STAGES.map(x => (
            <li key={x.id} className={`${x.id === id ? "is-on" : ""}${x.group === s.group ? " is-group" : ""}`}>
              <button onClick={() => go(x.id)} title={x.title} aria-current={x.id === id ? "step" : undefined}><i /></button>
            </li>
          ))}
        </ol>
        <span className="sh-where-nav">
          {prev && <button className="hm-link" onClick={() => go(prev.id)}>Before: {prev.short}</button>}
          {next && <button className="hm-link" onClick={() => go(next.id)}>Next: {next.short}</button>}
        </span>
      </div>

      <div className="sh-flow">
        <div className="sh-col"><h3>Inputs</h3><ul>{s.inputs.map(x => <li key={x}>{x}</li>)}</ul></div>
        <span className="sh-arrow" aria-hidden="true" />
        <div className="sh-col sh-col-main"><h3>What happens</h3><ul>{s.activities.map(x => <li key={x}>{x}</li>)}</ul></div>
        <span className="sh-arrow" aria-hidden="true" />
        <div className="sh-col"><h3>Evidence produced</h3><ul>{s.outputs.map(x => <li key={x}>{x}</li>)}</ul></div>
      </div>

      <div className="sh-grid">
        <div>
          <h3 className="an-h3">Decisions it enables</h3>
          <ul className="an-list">{s.decisions.map(x => <li key={x}>{x}</li>)}</ul>
        </div>
        <div>
          <h3 className="an-h3">What can go wrong</h3>
          <ul className="an-list">{s.risks.map(x => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="sh-product">
          <h3 className="an-h3">{PRODUCT.code} at this stage</h3>
          <p><strong>Known now.</strong> {st.know}</p>
          <p><strong>To establish next.</strong> {st.next}</p>
        </div>
      </div>

      <div className="sh-bottom">
        <div>
          <h3 className="an-h3">Where the evidence goes</h3>
          <div className="sh-ctd">{s.ctd.map(c => <CtdChip key={c.s} s={c.s} status={c.status} title={ctdTitle[c.s]} />)}</div>
        </div>
        {s.feeds.length > 0 && (
          <div>
            <h3 className="an-h3">Feeds into</h3>
            <div className="sh-feeds">{s.feeds.map(f => <button key={f} className="sv-tab" onClick={() => go(f)}>{STAGE[f].short}</button>)}</div>
          </div>
        )}
        {s.links && (
          <div>
            <h3 className="an-h3">Existing modules</h3>
            <div className="sh-feeds">{s.links.map(l => <button key={l.label} className="sv-tab" onClick={() => nav(l.view, l.focus || null)}>{l.label}</button>)}</div>
          </div>
        )}
      </div>

      {!s.built && (
        <p className="sh-status">
          This stage is mapped and linked to the existing modules. Its full rebuild, with deep dives and visualisations, is planned for phase {s.phase}.
        </p>
      )}
    </header>
  );
}
