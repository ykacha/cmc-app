import manifest from "./art-manifest.json";

/* Generated stage illustrations that exist and are in use. An image shows
   only once its file has been generated (see scripts/generate-art.mjs). */
const live = new Set(manifest.assets.filter(a => a.file && !a.status).map(a => a.id));
export const stageArt = (id) => (live.has(`stage-${id}`) ? `${process.env.PUBLIC_URL || ""}/science-art/stage-${id}.webp` : null);
