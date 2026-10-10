#!/usr/bin/env node
/* Development-time illustration generator (OpenAI Images API).
   Never runs in the browser; visitors only load the saved files.

   Usage:
     node scripts/generate-art.mjs --list
     node scripts/generate-art.mjs <asset-id> [--force]
     node scripts/generate-art.mjs --all [--force]
     node scripts/generate-art.mjs --edit <asset-id> --from <image path> --note "change request"

   Needs OPENAI_API_KEY in the environment or a local .env file (never committed).
   Model: OPENAI_IMAGE_MODEL, default below; check the current model list at
   https://platform.openai.com/docs/guides/image-generation before generating. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = path.join(ROOT, "src/science/art-manifest.json");
const OUT_DIR = path.join(ROOT, "public/science-art");
const DEFAULT_MODEL = "gpt-image-2.5-sunburst";

function loadEnv() {
  const f = path.join(ROOT, ".env");
  if (!fs.existsSync(f)) return;
  for (const line of fs.readFileSync(f, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]] && m[2]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const val = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };
const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const save = () => fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");

if (flag("--list")) {
  for (const a of manifest.assets) console.log(`${a.file ? "generated " : "pending   "} ${a.id.padEnd(26)} ${a.section}  [review: ${a.scientificReview}, ${a.approval}]`);
  process.exit(0);
}

loadEnv();
if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is not set. Add it to .env (see .env.example). No images were generated.");
  process.exit(2);
}

const { default: OpenAI } = await import("openai");
const client = new OpenAI();
const model = process.env.OPENAI_IMAGE_MODEL || DEFAULT_MODEL;
fs.mkdirSync(OUT_DIR, { recursive: true });

async function generate(asset) {
  if (asset.file && !flag("--force")) { console.log(`skip ${asset.id} (already generated; use --force)`); return; }
  const prompt = `${manifest.artDirection}\n\nSubject: ${asset.prompt}`;
  console.log(`generating ${asset.id} with ${model} ...`);
  const res = await client.images.generate({ model, prompt, size: asset.size || "1536x1024", output_format: "webp", n: 1 });
  writeResult(asset, res, prompt);
}

async function edit(asset, from, note) {
  const prompt = `${manifest.artDirection}\n\nSubject: ${asset.prompt}\n\nRevision: ${note}`;
  console.log(`editing ${asset.id} from ${from} with ${model} ...`);
  const { toFile } = await import("openai");
  const image = await toFile(fs.createReadStream(from), path.basename(from));
  const res = await client.images.edit({ model, image, prompt, size: asset.size || "1536x1024", output_format: "webp" });
  writeResult(asset, res, prompt);
}

function writeResult(asset, res, prompt) {
  const b64 = res?.data?.[0]?.b64_json;
  if (!b64) throw new Error("The API returned no image data.");
  const file = `science-art/${asset.id}.webp`;
  fs.writeFileSync(path.join(ROOT, "public", file), Buffer.from(b64, "base64"));
  Object.assign(asset, { file, model, generatedAt: new Date().toISOString(), lastPrompt: prompt, scientificReview: "pending", approval: "not approved" });
  save();
  console.log(`saved public/${file}  (scientific review pending)`);
}

try {
  if (flag("--edit")) {
    const asset = manifest.assets.find(a => a.id === val("--edit"));
    if (!asset || !val("--from")) throw new Error("Usage: --edit <asset-id> --from <image> --note \"...\"");
    await edit(asset, val("--from"), val("--note") || "Refine composition and accuracy.");
  } else {
    const ids = flag("--all") ? manifest.assets.map(a => a.id) : args.filter(a => !a.startsWith("--"));
    if (!ids.length) throw new Error("Name an asset id, or use --all / --list.");
    for (const id of ids) {
      const asset = manifest.assets.find(a => a.id === id);
      if (!asset) { console.error(`unknown asset ${id}`); continue; }
      await generate(asset);
    }
  }
} catch (e) {
  const status = e?.status ? ` (HTTP ${e.status})` : "";
  console.error(`Image generation failed${status}: ${e?.message || e}`);
  if (e?.status === 401) console.error("Check that OPENAI_API_KEY is valid.");
  if (e?.status === 404 || /model/i.test(e?.message || "")) console.error(`Model "${model}" may be unavailable; set OPENAI_IMAGE_MODEL to a current image model.`);
  if (e?.status === 429) console.error("Rate limit or quota reached; try again later.");
  process.exit(1);
}
