import { useEffect, useState } from "react";
import { PIPELINE } from "../cmc-data";
import { TO_JOURNEY } from "../pipeline/plant";

/* Reading aids for deep-dive topics: reading time, outline, read progress
   (this browser only) and interview questions from the matching Pipeline stations. */

const KEY = "cmc-read-topics";
const load = () => { try { return new Set(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { return new Set(); } };
const listeners = new Set();
export function markRead(id) {
  const s = load(); if (s.has(id)) return;
  s.add(id); try { localStorage.setItem(KEY, JSON.stringify([...s])); } catch { /* private mode */ }
  listeners.forEach(f => f());
}
export function useRead() {
  const [read, setRead] = useState(load);
  useEffect(() => { const f = () => setRead(load()); listeners.add(f); return () => listeners.delete(f); }, []);
  return read;
}

const textOf = (b) => [b.text, b.title, ...(b.items || []).map(x => (typeof x === "string" ? x : `${x.title || ""} ${x.text || ""}`)), ...(b.rows || []).flat(), ...(b.head || [])].filter(Boolean).join(" ");
export function readingMinutes(blocks) {
  const words = blocks.map(textOf).join(" ").split(/\s+/).filter(Boolean).length;
  const tools = blocks.filter(b => b.t === "widget").length;
  return Math.max(1, Math.round(words / 220 + tools * 2));
}
export const outline = (blocks) => blocks.filter(b => b.t === "h").map(b => b.text);

// interview questions from Pipeline stations that map to this Journey stage
export function practiceFor(stageId, topicId, n = 3) {
  const stations = PIPELINE.filter(s => TO_JOURNEY[s.id] === stageId);
  const qs = stations.flatMap(s => s.questions.map(q => ({ ...q, station: s })));
  if (!qs.length) return [];
  let h = 0; for (const c of topicId) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return Array.from({ length: Math.min(n, qs.length) }, (_, i) => qs[(h + i * 7) % qs.length]).filter((q, i, a) => a.indexOf(q) === i);
}
