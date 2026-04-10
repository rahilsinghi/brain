import { writeFileSync, readFileSync, existsSync } from "node:fs";
import type { GraphCache } from "../types.js";
import { scanWiki } from "./scan-wiki.js";
import { generateGraphCache } from "./export.js";

export async function rebuildGraphCache(
  vaultRoot: string,
  cachePath: string,
  embeddings: Map<string, number[]>,
  seed: number,
): Promise<GraphCache> {
  const scan = scanWiki(vaultRoot);
  const cache = await generateGraphCache(scan, embeddings, seed);
  writeFileSync(cachePath, JSON.stringify(cache), "utf8");
  console.log(`[graph] Cache written: ${cache.node_count} nodes → ${cachePath}`);
  return cache;
}

export function readGraphCache(cachePath: string): GraphCache | null {
  if (!existsSync(cachePath)) return null;
  try {
    return JSON.parse(readFileSync(cachePath, "utf8")) as GraphCache;
  } catch {
    return null;
  }
}
