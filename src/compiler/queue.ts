import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
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
    } else {
      const { data } = readFrontmatter<RawFrontmatter>(filePath);
      if (shouldQuarantine(data.retry_count + 1, options.maxRetries)) {
        quarantineFile(filePath, quarantineDir);
        result.quarantined++;
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
