import chokidar from "chokidar";
import { join, extname } from "node:path";
import { injectRawFrontmatter, readFrontmatter } from "./frontmatter.js";
import { routeAndParse } from "./parser/router.js";
import { processQueue } from "./compiler/queue.js";
import type { BrainConfig } from "./types.js";

const IGNORED_FILES = new Set([".gitkeep", ".DS_Store"]);
const BINARY_NO_FRONTMATTER = new Set([
  ".pdf", ".m4a", ".mp3", ".wav",
  ".png", ".jpg", ".jpeg", ".webp",
]);

export function startWatchers(
  vaultRoot: string,
  config: BrainConfig
): { close: () => Promise<void> } {
  const rawDir = join(vaultRoot, config.watchers.raw_dir);
  let compileDebounce: ReturnType<typeof setTimeout> | null = null;

  const rawWatcher = chokidar.watch(rawDir, {
    ignored: [
      join(rawDir, "quarantine/**"),
      /(^|[\/\\])\../,
    ],
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 1000,
      pollInterval: 100,
    },
  });

  rawWatcher.on("add", async (filePath: string) => {
    const fileName = filePath.split("/").pop() ?? "";
    if (IGNORED_FILES.has(fileName)) return;

    const ext = extname(filePath).toLowerCase();

    if (BINARY_NO_FRONTMATTER.has(ext)) {
      console.log(`[watcher] Skipping binary file (Phase 2): ${fileName}`);
      return;
    }

    try {
      const { data } = readFrontmatter(filePath);
      if (!data.status) {
        injectRawFrontmatter(filePath, "file_drop");
      }

      const currentFm = readFrontmatter(filePath);
      if (currentFm.data.status === "unparsed") {
        await routeAndParse(filePath);
      }

      if (compileDebounce) clearTimeout(compileDebounce);
      compileDebounce = setTimeout(async () => {
        try {
          const result = await processQueue(vaultRoot, {
            maxRetries: config.compile.max_retries,
            tokenLimits: {
              maxSingle: config.compile.max_single_pass_words,
              maxChunked: config.compile.max_chunked_words,
              maxStaged: config.compile.max_staged_words,
            },
          });
          if (result.processed > 0) {
            console.log(
              `[compiler] Processed ${result.processed} file(s), ${result.failed} failed, ${result.quarantined} quarantined`
            );
          }
        } catch (err) {
          console.error("[compiler] Queue error:", err);
        }
      }, 2000);
    } catch (err) {
      console.error(`[watcher] Error processing ${fileName}:`, err);
    }
  });

  return {
    close: async () => {
      if (compileDebounce) clearTimeout(compileDebounce);
      await rawWatcher.close();
    },
  };
}
