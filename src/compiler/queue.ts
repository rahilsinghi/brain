import { readdirSync, existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { readFrontmatter, updateFrontmatter } from "../frontmatter.js";
import { compileSinglePass } from "./compile.js";
import { classifyDocument, type TokenGuardLimits } from "./token-guard.js";
import { shouldQuarantine, quarantineFile } from "../quarantine.js";
import { updateIndex } from "./index-updater.js";
import type { RawFrontmatter } from "../types.js";

interface QueueOptions {
  maxRetries: number;
  tokenLimits?: TokenGuardLimits;
}

interface QueueResult {
  processed: number;
  failed: number;
  quarantined: number;
  manualReview: number;
}

interface SentinelData {
  total_drops: number;
  repo: string;
  created_at: string;
}

function checkSentinelCompletion(rawFilePath: string, vaultRoot: string): SentinelData | null {
  const dir = dirname(rawFilePath);
  if (!dir.includes(join("raw", "graphify"))) return null;

  const sentinelPath = join(dir, ".sentinel");
  if (!existsSync(sentinelPath)) return null;

  const sentinel: SentinelData = JSON.parse(readFileSync(sentinelPath, "utf-8")) as SentinelData;

  const files = readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith("."));
  let processedCount = 0;
  for (const file of files) {
    try {
      const { data } = readFrontmatter(join(dir, file));
      const status = (data as Record<string, unknown>).status as string | undefined;
      if (status === "processed" || status === "failed") processedCount++;
    } catch {
      /* skip */
    }
  }

  return processedCount >= sentinel.total_drops ? sentinel : null;
}

async function triggerGraphRebuild(vaultRoot: string): Promise<void> {
  const { rebuildGraphCache } = await import("../graph/cache.js");
  const { aggregateEmbeddings } = await import("../graph/embeddings.js");
  const { pushGraphToRepo } = await import("../graph/push.js");
  const { VectorStore } = await import("../embedder/vector-store.js");
  const { loadConfig } = await import("../config.js");

  const config = loadConfig(vaultRoot);
  const store = new VectorStore(join(vaultRoot, ".lancedb"));
  await store.init();
  const allChunks = await store.listAll();
  const embeddings = aggregateEmbeddings(allChunks);
  const cachePath = join(vaultRoot, config.graph.cache_path);
  const graphifyDir = join(vaultRoot, config.graphify?.output_dir ?? "raw/graphify");
  const explorerPath = config.graph.explorer_repo_path.replace(/^~/, process.env.HOME ?? "");
  const cache = await rebuildGraphCache(vaultRoot, cachePath, embeddings, config.graph.umap_seed, graphifyDir);
  await pushGraphToRepo(cache, explorerPath);
  console.log(`[graphify] Graph rebuilt and pushed.`);
}

function collectRawFiles(dir: string): string[] {
  const files: string[] = [];
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "quarantine" || entry.name === ".gitkeep") continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectRawFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

export async function processQueue(vaultRoot: string, options: QueueOptions): Promise<QueueResult> {
  const rawDir = join(vaultRoot, "raw");
  const quarantineDir = join(rawDir, "quarantine");
  const allFiles = collectRawFiles(rawDir);
  const result: QueueResult = { processed: 0, failed: 0, quarantined: 0, manualReview: 0 };

  const pendingFiles = allFiles.filter((f) => {
    try {
      const { data } = readFrontmatter<RawFrontmatter>(f);
      return data.status === "pending";
    } catch {
      return false;
    }
  });

  for (const filePath of pendingFiles) {
    const { content } = readFrontmatter(filePath);
    const limits = options.tokenLimits ?? { maxSingle: 5000, maxChunked: 20000, maxStaged: 100000 };
    const strategy = classifyDocument(content, limits);

    if (strategy === "manual_review") {
      updateFrontmatter(filePath, { requires_manual_review: true });
      result.manualReview++;
      continue;
    }

    if (strategy !== "single") {
      result.manualReview++;
      continue;
    }

    const compileResult = await compileSinglePass(filePath, vaultRoot);
    if (compileResult.success) {
      result.processed++;
      const completedSentinel = checkSentinelCompletion(filePath, vaultRoot);
      if (completedSentinel) {
        console.log(
          `[graphify] All ${completedSentinel.total_drops} drops processed for ${completedSentinel.repo}. Triggering graph rebuild...`,
        );
        triggerGraphRebuild(vaultRoot).catch((err) =>
          console.error(
            `[graphify] Graph rebuild failed: ${err instanceof Error ? err.message : String(err)}`,
          ),
        );
      }
    } else {
      const { data } = readFrontmatter<RawFrontmatter>(filePath);
      if (shouldQuarantine(data.retry_count + 1, options.maxRetries)) {
        quarantineFile(filePath, quarantineDir);
        result.quarantined++;
        const completedSentinel = checkSentinelCompletion(filePath, vaultRoot);
        if (completedSentinel) {
          console.log(
            `[graphify] All ${completedSentinel.total_drops} drops processed for ${completedSentinel.repo}. Triggering graph rebuild...`,
          );
          triggerGraphRebuild(vaultRoot).catch((err) =>
            console.error(
              `[graphify] Graph rebuild failed: ${err instanceof Error ? err.message : String(err)}`,
            ),
          );
        }
      } else {
        result.failed++;
      }
    }
  }

  if (result.processed > 0) {
    updateIndex(vaultRoot);
  }
  return result;
}
