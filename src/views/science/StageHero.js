import { STAGES, STAGE, CTD, GROUPS, GLANCE } from "../../science/journey";
import { CtdChip } from "../../science/ui";
import { stageArt } from "../../science/art";

const ctdTitle = Object.fromEntries(CTD.map(c => [c.id, c.title]));
const num = (n) => String(n).padStart(2, "0");

/* The section hero: one screen that explains a stage's purpose, flow,
   decisions, risks and CTD destination. Deep-dive topics follow it. */
export default function StageHero({ id, go, nav }) {
  const s = STAGE[id];
  const i = STAGES.findIndex(x => x.id === id);
  const prev = STAGES[i - 1], next = STAGES[i + 1];
  const group = GROUPS.find(g => g.id === s.group);

  return (
    <header className="sh">
      <div className={`sh-top${stageArt(id) ? " has-art" : ""}`}>
        {stageArt(id) && (
          <figure className="sh-art">
            <img src={stageArt(id)} alt="" width="1536" height="1024" />
          </figure>
        )}
        <h1 className="sh-title"><span className="sv-mono ch-num">{num(s.n)}</span>{s.title}</h1>
        <p className="sh-purpose">{s.purpose}</p>
        {GLANCE[id] && (
          <ol className="sh-keys" aria-label="In short">
            {GLANCE[id].keys.map(k => <li key={k}>{k}</li>)}
          </ol>
        )}
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
            <h3 className="an-h3">Related tools</h3>
            <div className="sh-feeds">{s.links.map(l => <button key={l.label} className="sv-tab" onClick={() => nav(l.view, l.focus || null)}>{l.label}</button>)}</div>
          </div>
        )}
      </div>

    </header>
  );
}
