import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { FastifyInstance } from "fastify";

const startTime = Date.now();

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

export async function healthRoute(app: FastifyInstance): Promise<void> {
  app.get("/health", async () => {
    const vaultRoot = (app as unknown as { vaultRoot: string }).vaultRoot;
    const store = (app as unknown as { store: unknown }).store;

    return {
      status: "ok",
      uptime_s: Math.floor((Date.now() - startTime) / 1000),
      lancedb_ready: store !== null,
      wiki_article_count: countFiles(join(vaultRoot, "wiki"), ".md"),
      raw_pending_count: countPending(join(vaultRoot, "raw")),
    };
  });
}
