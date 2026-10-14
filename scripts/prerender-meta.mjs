// Runs after `react-scripts build`. Link-preview crawlers (WhatsApp, LinkedIn, Slack, iMessage)
// don't run JavaScript, so each route gets its own copy of index.html with its own title,
// description, canonical URL and preview image. The app itself is unchanged.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const BUILD = "build";
const ORIGIN = "https://yashkacha.com";
const html = readFileSync(join(BUILD, "index.html"), "utf8");

const PAGES = {
  "pipeline":   ["Pipeline Explorer", "The 16 stages of biologics CMC, from cell line engineering to filing and lifecycle."],
  "science":    ["Science journey", "A guided walk through biologics CMC: upstream, downstream, formulation, analytics, stability and the CTD."],
  "analytical": ["Analytical methods", "Analytical methods for monoclonal antibodies: what each assay measures, how it works and when to use it."],
  "tools":      ["CMC workbench", "Calculators and working tools for biologics CMC."],
  "oos":        ["OOS/OOT Investigation", "A step-by-step walk through an out-of-specification investigation, with root causes and OOT criteria."],
  "batch":      ["Batch Record Simulator", "Walk a sterile mAb batch record, trigger deviations and see their yield impact."],
  "domains":    ["Domain Q-Bank", "Interview and exam questions across the main CMC domains."],
  "ich":        ["ICH Guidelines", "The ICH guidelines that shape biologics development, explained in plain language."],
  "glossary":   ["CMC Glossary", "Plain-language definitions of biologics CMC terms."],
  "compendial": ["Compendial Reference", "USP, EP and JP methods side by side."],
  "excipient":  ["Excipient Compatibility", "Excipient functions and known incompatibilities for biologic formulations."],
  "cases":      ["Case Studies", "Real CMC failures and what they taught the industry."],
  "careers":    ["Careers in biologics CMC", "Short answers on bench, QC, CDMO, automation and leadership paths in biologics CMC.", "careers"],
  "careers/student": ["Careers in biologics CMC: student or graduate", "Getting the first job in biologics CMC: routes in, what your degree leads to, CV and interviews.", "careers"],
  "careers/mid":     ["Careers in biologics CMC: building your career", "Specialise or broaden, switch function, and plan the next step in biologics CMC.", "careers"],
  "careers/senior":  ["Careers in biologics CMC: experienced", "Manager or expert, director level and hiring decisions in biologics CMC.", "careers"],
  "privacy":    ["Privacy", "How Biologics CMC handles your data."],
  "terms":      ["Terms", "Terms of use for Biologics CMC."],
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const setMeta = (h, re, value) => {
  if (!re.test(h)) throw new Error(`pattern not found: ${re}`);
  return h.replace(re, value);
};

for (const [route, [name, desc, img = "default"]] of Object.entries(PAGES)) {
  const title = `${name} | Biologics CMC`;
  const url = `${ORIGIN}/${route}`;
  const image = `${ORIGIN}/og/${img}.png`;
  let h = html;
  h = setMeta(h, /<title>.*?<\/title>/, `<title>${esc(title)}</title>`);
  h = setMeta(h, /(<meta name="description" content=").*?(")/, `$1${esc(desc)}$2`);
  h = setMeta(h, /(<link rel="canonical" href=").*?(")/, `$1${url}$2`);
  h = setMeta(h, /(<meta property="og:title" content=").*?(")/, `$1${esc(title)}$2`);
  h = setMeta(h, /(<meta property="og:description" content=").*?(")/, `$1${esc(desc)}$2`);
  h = setMeta(h, /(<meta property="og:url" content=").*?(")/, `$1${url}$2`);
  h = setMeta(h, /(<meta property="og:image" content=").*?(")/, `$1${image}$2`);
  h = setMeta(h, /(<meta name="twitter:title" content=").*?(")/, `$1${esc(title)}$2`);
  h = setMeta(h, /(<meta name="twitter:description" content=").*?(")/, `$1${esc(desc)}$2`);
  h = setMeta(h, /(<meta name="twitter:image" content=").*?(")/, `$1${image}$2`);
  const out = join(BUILD, route, "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, h);
}
console.log(`prerender-meta: wrote ${Object.keys(PAGES).length} route pages`);
