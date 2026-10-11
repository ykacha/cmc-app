import { useState } from "react";
import { BR_HEAD, BR_PEOPLE, BR_SECTIONS, BR_ISSUES, BR_DEVIATIONS, BR_DISPOSITION, QC_SAMPLES, QC_TESTS, QC_REVIEW } from "../../../science/content/records";
import { ProvTag } from "../../../science/ui";

/* Columns whose values are written during execution, not printed by the master record. */
const ENTRY = new Set(["Entry", "Actual", "By", "Verified", "Time", "By / Verified", "Issued", "Mass in", "Mass out", "Step yield", "Lot", "Use by", "Status", "Calibration or PM due", "Cleaning status"]);

function Cell({ v, entry }) {
  if (v === "") return <span className="wg-br-blank" aria-label="blank field" />;
  if (typeof v === "object") {
    return (
      <span className="wg-br-entry">
        <s>{v.was}</s> {v.now}
        <span className="wg-br-corr">{v.by}{v.why ? `, ${v.why}` : ""}</span>
      </span>
    );
  }
  return entry ? <span className="wg-br-entry">{v}</span> : v;
}

const PAGES = [
  { id: "head", title: "Header" },
  ...BR_SECTIONS.map(s => ({ id: s.id, title: s.title })),
  { id: "dev", title: "Deviations" },
  { id: "disp", title: "Review and disposition" },
];

/* ─────────── Executed batch record, readable or reviewable ─────────── */

export function BatchRecord() {
  const [page, setPage] = useState("head");
  const [review, setReview] = useState(false);
  const [flags, setFlags] = useState(() => new Set());
  const [checked, setChecked] = useState(false);
  const sec = BR_SECTIONS.find(s => s.id === page);

  const toggle = (id) => {
    if (checked) return;
    const n = new Set(flags);
    n.has(id) ? n.delete(id) : n.add(id);
    setFlags(n);
  };
  const reset = () => { setFlags(new Set()); setChecked(false); };
  const found = BR_ISSUES.filter(r => flags.has(r.id)).length;
  const falseFlags = [...flags].filter(id => !BR_ISSUES.some(r => r.id === id)).length;

  return (
    <div className="wg">
      <div className="wg-head"><ProvTag p="hypothetical" /><span>A fictional executed record for the drug substance lot on the certificate above. Identifiers, initials, limits and values are illustrative.</span></div>

      <div className="wg-br-mode" role="group" aria-label="Mode">
        <button aria-pressed={!review} className={`sv-tab${!review ? " is-on" : ""}`} onClick={() => setReview(false)}>Read the record</button>
        <button aria-pressed={review} className={`sv-tab${review ? " is-on" : ""}`} onClick={() => setReview(true)}>Review it as QA</button>
        {review && <span className="wg-br-count" aria-live="polite">{checked ? `${found} of ${BR_ISSUES.length} found${falseFlags ? `, ${falseFlags} not an issue` : ""}` : `${flags.size} flagged`}</span>}
      </div>
      {review && !checked && <p className="vl-explain">Six entries in this record would stop a QA reviewer. Page through it, flag every row you would raise, then check your review. Not every unusual entry is a problem.</p>}

      <div className="wg-br">
        <nav className="wg-br-pages" aria-label="Batch record pages">
          {PAGES.map(p => {
            const rows = BR_SECTIONS.find(s => s.id === p.id)?.rows || [];
            const n = rows.filter(r => flags.has(r.id)).length;
            return (
              <button key={p.id} aria-current={page === p.id ? "page" : undefined} className={page === p.id ? "is-on" : ""} onClick={() => setPage(p.id)}>
                {p.title}{review && n > 0 && <i className="wg-br-dot" role="img" aria-label={`${n} raised`} />}
              </button>
            );
          })}
        </nav>

        <div className="wg-br-sheet">
          <div className="wg-br-run">
            <span>MBR-DS-417-PUR v5</span><span>Batch DS-24-0031</span>
            <span>Page {sec ? sec.page : page === "head" ? 1 : page === "dev" ? 45 : 47} of 48</span>
          </div>

          {page === "head" && (
            <>
              <h4 className="wg-br-h">Batch production record: purification and bulk drug substance</h4>
              <dl className="wg-br-headdl">{BR_HEAD.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
              <h5 className="wg-br-h5">Signature log</h5>
              <p className="wg-br-small">Everyone who makes an entry signs here once, so initials in the record can be traced to a person and a role.</p>
              <ul className="wg-br-sig">{BR_PEOPLE.map(([i, r]) => <li key={i}><span className="wg-br-entry">{i}</span>{r}</li>)}</ul>
              <div className="wg-br-legend">
                <span><b>Printed text</b> comes from the approved master record.</span>
                <span><span className="wg-br-entry">Entries</span> are made by people during execution.</span>
                <span><i className="wg-br-cpp">CPP</i> marks a critical process parameter.</span>
              </div>
            </>
          )}

          {sec && (
            <>
              <h4 className="wg-br-h">{sec.title}{sec.date && <span className="sv-mono">{sec.date}</span>}</h4>
              <div className="sv-tablewrap">
                <table className="sv-table wg-br-table">
                  <thead><tr>{sec.cols.map(c => <th key={c}>{c}</th>)}{review && <th className="wg-br-flagh">Raise</th>}</tr></thead>
                  <tbody>
                    {sec.rows.map(r => {
                      const flagged = flags.has(r.id);
                      const state = checked ? (r.issue ? (flagged ? "found" : "missed") : flagged ? "false" : "") : flagged ? "flag" : "";
                      return [
                        <tr key={r.id} className={state ? `is-${state}` : ""}>
                          {r.cells.map((c, i) => (
                            <td key={i}>
                              {i === 0 && r.cpp && <i className="wg-br-cpp">CPP</i>}
                              <Cell v={c} entry={ENTRY.has(sec.cols[i])} />
                            </td>
                          ))}
                          {review && (
                            <td className="wg-br-flagc">
                              <button aria-pressed={flagged} disabled={checked} aria-label={`Raise ${r.cells[0]}`} onClick={() => toggle(r.id)}>{flagged ? "Raised" : "Raise"}</button>
                            </td>
                          )}
                        </tr>,
                        checked && (r.issue || r.ok || flagged) && (
                          <tr key={r.id + "-x"} className={`wg-br-note is-${state || "info"}`}>
                            <td colSpan={sec.cols.length + 1}>
                              {r.issue
                                ? <><strong>{flagged ? "Found" : "Missed"}. {r.issue.principle}.</strong> {r.issue.finding} <em>What happens next:</em> {r.issue.fix}</>
                                : r.ok ? <><strong>{flagged ? "Not an issue." : "Worth noticing."}</strong> {r.ok}</>
                                : <><strong>Not an issue.</strong> This entry is complete, attributable and within its range.</>}
                            </td>
                          </tr>
                        ),
                      ];
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {page === "dev" && BR_DEVIATIONS.map(d => (
            <div key={d.id} className="wg-br-dev">
              <h4 className="wg-br-h"><span className="sv-mono">{d.id}</span>{d.title}</h4>
              <dl className="wg-dl">
                <div><dt>Classification</dt><dd>{d.cls}</dd></div>
                <div><dt>What happened</dt><dd>{d.what}</dd></div>
                <div><dt>Root cause</dt><dd>{d.cause}</dd></div>
                <div><dt>Product impact assessment</dt><dd>{d.impact}</dd></div>
                <div><dt>Corrective and preventive action</dt><dd>{d.capa}</dd></div>
                <div><dt>Status</dt><dd>{d.status}</dd></div>
              </dl>
            </div>
          ))}

          {page === "disp" && (
            <>
              <h4 className="wg-br-h">Batch review and disposition</h4>
              <ol className="wg-br-disp">{BR_DISPOSITION.map(x => <li key={x}>{x}</li>)}</ol>
              <p className="wg-br-small">Signed: production review PB 2024-10-02; QA review DN 2024-10-18; QA disposition DN 2024-10-21.</p>
            </>
          )}
        </div>
      </div>

      {review && (
        <div className="wg-br-actions">
          {!checked
            ? <button className="hm-primary" onClick={() => setChecked(true)} disabled={!flags.size}>Check my review</button>
            : <button className="hm-secondary" onClick={reset}>Start the review again</button>}
          {checked && (
            <ul className="wg-br-findings">
              {BR_ISSUES.map(r => (
                <li key={r.id} className={flags.has(r.id) ? "is-found" : "is-missed"}>
                  <button className="hm-link" onClick={() => setPage(r.section)}>{BR_SECTIONS.find(s => s.id === r.section).title}: {r.cells[0]}</button>
                  <span>{flags.has(r.id) ? "Found" : "Missed"}, {r.issue.principle.toLowerCase()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────── QC testing records, from raw data to the certificate ─────────── */

const QC_TABS = [{ id: "log", name: "Sample log" }, ...QC_TESTS.map(t => ({ id: t.id, name: t.name })), { id: "coa", name: "Review and CoA" }];

export function QcRecord({ nav }) {
  const [tab, setTab] = useState("log");
  const [what, setWhat] = useState(false);
  const t = QC_TESTS.find(x => x.id === tab);
  const pick = (id) => { setTab(id); setWhat(false); };

  return (
    <div className="wg">
      <div className="wg-head"><ProvTag p="hypothetical" /><span>Fictional QC worksheets for lot DS-24-0031. Procedures, criteria and data are illustrative; endotoxin criteria follow the pharmacopoeial test.</span></div>
      <div className="wg-chips" role="group" aria-label="QC record">
        {QC_TABS.map(x => <button key={x.id} aria-pressed={tab === x.id} className={`sv-tab${tab === x.id ? " is-on" : ""}`} onClick={() => pick(x.id)}>{x.name}</button>)}
      </div>

      <div className="wg-br-sheet">
        {tab === "log" && (
          <>
            <h4 className="wg-br-h">Sample log and chain of custody</h4>
            <p className="wg-br-small">Every sample is traceable from the moment it is taken to the moment it is tested or destroyed: who took it, how it was stored, and who received it.</p>
            <div className="sv-tablewrap">
              <table className="sv-table wg-br-table">
                <thead><tr><th>Sample ID</th><th>Purpose</th><th>Container</th><th>Taken</th><th>Storage</th><th>Received in QC</th></tr></thead>
                <tbody>{QC_SAMPLES.map(r => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{i === 0 || i === 3 || i === 5 ? <span className="wg-br-entry">{c}</span> : c}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </>
        )}

        {t && (
          <>
            <h4 className="wg-br-h">{t.title}</h4>
            <dl className="wg-br-headdl">{t.head.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>

            <h5 className="wg-br-h5">System suitability</h5>
            <div className="sv-tablewrap">
              <table className="sv-table wg-br-table">
                <thead><tr><th>Criterion</th><th>Acceptance</th><th>Result</th><th>Outcome</th></tr></thead>
                <tbody>{t.sst.map(r => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td><span className="wg-br-entry">{r[2]}</span></td><td className="wg-br-pass">Pass</td></tr>)}</tbody>
              </table>
            </div>

            <h5 className="wg-br-h5">Sample data</h5>
            <div className="sv-tablewrap">
              <table className="sv-table wg-br-table">
                <thead><tr>{t.dataHead.map(h => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>{t.data.map((r, i) => <tr key={i} className={/Mean/.test(r[0]) ? "is-sum" : ""}>{r.map((c, j) => <td key={j}>{j === 0 ? c : <span className="wg-br-entry">{c}</span>}</td>)}</tr>)}</tbody>
              </table>
            </div>

            <h5 className="wg-br-h5">Calculation</h5>
            <ol className="wg-br-disp">{t.calc.map(x => <li key={x}>{x}</li>)}</ol>

            <h5 className="wg-br-h5">Reported to the certificate</h5>
            <div className="sv-tablewrap">
              <table className="sv-table wg-br-table">
                <thead><tr><th>Attribute</th><th>Acceptance criterion</th><th>Reported</th><th>Conforms</th></tr></thead>
                <tbody>{t.reported.map(r => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td><span className="wg-br-entry">{r[2]}</span></td><td className="wg-br-pass">Yes</td></tr>)}</tbody>
              </table>
            </div>

            <div className="wg-br-what">
              <button aria-pressed={what} className={`sv-tab${what ? " is-on" : ""}`} onClick={() => setWhat(!what)}>What if: {t.whatIf.label}</button>
              <button className="hm-link" onClick={() => nav("analytical", "atlas/" + t.method)}>How the method works</button>
            </div>
            {what && <div className="bk-callout bk-risk" aria-live="polite"><strong>{t.whatIf.label}</strong><p>{t.whatIf.outcome}</p></div>}
          </>
        )}

        {tab === "coa" && (
          <>
            <h4 className="wg-br-h">Second-person review and certificate</h4>
            <p className="wg-br-small">A second analyst or QC reviewer checks every record before results are approved in LIMS. Only approved results reach the certificate.</p>
            <ul className="wg-br-check">{QC_REVIEW.map(x => <li key={x}>{x}</li>)}</ul>
            <div className="sv-tablewrap">
              <table className="sv-table wg-br-table">
                <thead><tr><th>Test</th><th>Worksheet</th><th>Raw</th><th>On the CoA</th></tr></thead>
                <tbody>{QC_TESTS.flatMap(x => x.reported.slice(0, 1).map(r => (
                  <tr key={x.id}><td>{r[0]}</td><td className="sv-mono">{x.head[0][1]}</td><td><span className="wg-br-entry">{x.raw}</span></td><td><span className="wg-br-entry">{r[2]}</span></td></tr>
                )))}</tbody>
              </table>
            </div>
            <p className="wg-br-small">Approved: QC reviewer RA 2024-10-04; QC manager LT 2024-10-07. The certificate then goes to QA with the batch record for disposition.</p>
          </>
        )}
      </div>
    </div>
  );
}
