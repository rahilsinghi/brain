import chokidar from "chokidar";
import { join, extname } from "node:path";
import { mkdirSync } from "node:fs";
import { injectRawFrontmatter, readFrontmatter } from "./frontmatter.js";
import { routeAndParse } from "./parser/router.js";
import { processQueue } from "./compiler/queue.js";
import { syncFile, shouldReembed } from "./embedder/sync.js";
import { VectorStore } from "./embedder/vector-store.js";
import { parseVoice } from "./voice/voice-parser.js";
import { createTranscriptionProvider } from "./voice/transcribe.js";
import { classifyCluster } from "./voice/classify.js";
import type { BrainConfig } from "./types.js";

const IGNORED_FILES = new Set([".gitkeep", ".DS_Store"]);
const BINARY_NO_FRONTMATTER = new Set([
  ".pdf", ".m4a", ".mp3", ".wav",
  ".png", ".jpg", ".jpeg", ".webp",
]);
const AUDIO_EXTENSIONS = new Set([".m4a", ".mp3", ".wav", ".ogg"]);

export type TimesheetNLHandler = (text: string) => Promise<void>;

export function startWatchers(
  vaultRoot: string,
  config: BrainConfig,
  timesheetNLHandler?: TimesheetNLHandler,
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

  // Voice watcher — separate from raw watcher
  const voiceDir = join(vaultRoot, config.watchers.voice_dir);
  mkdirSync(voiceDir, { recursive: true });

  const transcriptionProvider = createTranscriptionProvider(
    config.transcription.provider,
    config.transcription.local_model,
    config.transcription.openai_model,
    vaultRoot,
  );

  const voiceWatcher = chokidar.watch(voiceDir, {
    ignored: [/(^|[\/\\])\./, /\.processed$/, /\.md$/],
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: { stabilityThreshold: 2000, pollInterval: 200 },
  });

  voiceWatcher.on("add", async (filePath: string) => {
    const ext = extname(filePath).toLowerCase();
    if (!AUDIO_EXTENSIONS.has(ext)) return;

    console.log(`[voice-watcher] New audio: ${filePath.split("/").pop()}`);
    try {
      await parseVoice(filePath, vaultRoot, transcriptionProvider, (text) =>
        classifyCluster(text, {
          clusters: config.voice.clusters,
          defaultCluster: config.voice.default_cluster,
          classifyModel: config.voice.classify_model,
        }),
        {
          onTimesheetNL: timesheetNLHandler,
        },
      );
    } catch (err) {
      console.error(
        `[voice-watcher] Error: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  });

  const lanceDbPath = join(vaultRoot, ".lancedb");
  const store = new VectorStore(lanceDbPath);
  let wikiWatcher: ReturnType<typeof chokidar.watch> | null = null;

  store.init().then(() => {
    const wikiDir = join(vaultRoot, config.watchers.wiki_dir);

    wikiWatcher = chokidar.watch(wikiDir, {
      ignored: /(^|[\/\\])\../,
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 1000,
        pollInterval: 100,
      },
    });

    wikiWatcher.on("change", async (filePath: string) => {
      if (!filePath.endsWith(".md")) return;
      try {
        if (shouldReembed(filePath)) {
          const count = await syncFile(filePath, vaultRoot, store);
          console.log(`[embedder] Re-embedded ${filePath} (${count} chunks)`);
        }
      } catch (err) {
        console.error(`[embedder] Error re-embedding ${filePath}:`, err);
      }
    });
  }).catch((err) => {
    console.error("[embedder] Failed to initialize vector store:", err);
  });

  return {
    close: async () => {
      if (compileDebounce) clearTimeout(compileDebounce);
      await rawWatcher.close();
      await voiceWatcher.close();
      if (wikiWatcher) {
        await wikiWatcher.close();
      }
    },
  };
}
