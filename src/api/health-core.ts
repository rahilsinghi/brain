import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

export interface HealthInput {
  store: unknown | null;
  vaultRoot: string;
  startTime: number;
}

export interface HealthStats {
  status: string;
  uptime_s: number;
  lancedb_ready: boolean;
  wiki_article_count: number;
  raw_pending_count: number;
}

function countFiles(dir: string, ext: string): number {
  if (!existsSync(dir)) return 0;
  let count = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      count += countFiles(join(dir, entry.name), ext);
    } else if (entry.name.endsWith(ext)) {
      count++;
    }
  }
  return count;
}

function countPending(dir: string): number {
  if (!existsSync(dir)) return 0;
  let count = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "quarantine") continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      count += countPending(fullPath);
    } else if (entry.name.endsWith(".md")) {
      count++;
    }
  }
  return count;
}

export function getHealthStats(input: HealthInput): HealthStats {
  const { store, vaultRoot, startTime } = input;

  return {
    status: "ok",
    uptime_s: Math.floor((Date.now() - startTime) / 1000),
    lancedb_ready: store !== null,
    wiki_article_count: countFiles(join(vaultRoot, "wiki"), ".md"),
    raw_pending_count: countPending(join(vaultRoot, "raw")),
  };
}
