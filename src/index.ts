import { writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import cron from "node-cron";
import { loadConfig } from "./config.js";
import { startWatchers } from "./watcher.js";
import { takePreHealSnapshot } from "./snapshot.js";
import { runLintHeal } from "./lint/runner.js";
import { createGithubSource } from "./sources/github.js";
import { createGitCommitsSource } from "./sources/git-commits.js";
import { createGmailApiSource } from "./sources/gmail.js";
import { createGraphifySource } from "./sources/graphify.js";
import { SyncOrchestrator } from "./sources/orchestrator.js";
import { JsonSyncStateStore } from "./sources/state.js";
import { VectorStore } from "./embedder/vector-store.js";
import { synthesize } from "./query/synthesize.js";
import { createServer, stopServer } from "./api/server.js";
// Telegram bot runs as isolated subprocess (src/telegram/worker.ts)
import { ingestContent } from "./api/ingest-core.js";
import { getHealthStats } from "./api/health-core.js";
import { appendDailyEntry, writeDailySummary } from "./daily/log.js";
import { generateSlides } from "./output/slides.js";
import { generatePlot } from "./output/plots.js";

const vaultRoot = resolve(import.meta.dirname, "..");
const startTime = Date.now();

// Prevent transient network errors (Telegram polling, etc.) from crashing the daemon
process.on("unhandledRejection", (err) => {
  const msg = err instanceof Error ? err.message : String(err);
  console.error(`[brain] Unhandled rejection (swallowed): ${msg}`);
});
process.on("uncaughtException", (err) => {
  const msg = err.message ?? String(err);
  // Let truly fatal errors (OOM, etc.) still crash
  if (msg.includes("ConnectionRefused") || msg.includes("getUpdates") || msg.includes("Network request")) {
    console.error(`[brain] Caught network exception (swallowed): ${msg}`);
  } else {
    console.error(`[brain] Uncaught exception (fatal): ${msg}`);
    process.exit(1);
  }
});

console.log("[brain] Starting daemon...");

const config = loadConfig(vaultRoot);

// Write PID
mkdirSync(join(vaultRoot, ".brain"), { recursive: true });
writeFileSync(join(vaultRoot, ".brain", "daemon.pid"), String(process.pid));

// Step 1: Init LanceDB
console.log("[brain] Initializing LanceDB...");
const store = new VectorStore(join(vaultRoot, ".lancedb"));
await store.init();
console.log("[brain] LanceDB ready.");

// Step 2: Start HTTP server
const server = createServer({
  store,
  vaultRoot,
  config,
  synthesizeFn: synthesize,
});
await server.listen({ port: config.api.port, host: config.api.host });
console.log(`[brain] API server listening on http://${config.api.host}:${config.api.port}`);

const slidesFn = (topic: string) =>
  generateSlides(topic, {
    vaultRoot,
    synthesizeFn: synthesize,
    store,
    topK: config.api.default_top_k,
    marpTheme: config.visual.marp_theme,
  });

const plotFn = (description: string) =>
  generatePlot(description, {
    vaultRoot,
    synthesizeFn: synthesize,
    store,
    topK: config.api.default_top_k,
    matplotlibRc: config.visual.matplotlib_rc,
  });

// Step 2.5: Start Telegram bot as isolated subprocess
const botToken = config.telegram.bot_token ?? process.env.TELEGRAM_BOT_TOKEN ?? null;
let telegramProc: ReturnType<typeof Bun.spawn> | null = null;

function spawnTelegramBot(attempt = 0) {
  const delay = Math.min(5000 * 2 ** attempt, 120_000);
  const workerPath = join(import.meta.dirname, "telegram", "worker.ts");

  telegramProc = Bun.spawn(["bun", "run", workerPath], {
    cwd: vaultRoot,
    stdout: "inherit",
    stderr: "inherit",
    env: { ...process.env },
  });

  telegramProc.exited.then((code) => {
    if (code !== 0) {
      console.error(`[brain] Telegram worker exited (code ${code}), restarting in ${delay / 1000}s...`);
      setTimeout(() => spawnTelegramBot(Math.min(attempt + 1, 5)), delay);
    } else {
      console.log("[brain] Telegram worker exited cleanly.");
    }
  });

  console.log(`[brain] Telegram worker spawned (pid=${telegramProc.pid}).`);
}

if (botToken && config.telegram.allowed_user_ids.length > 0) {
  spawnTelegramBot();
} else {
  console.log("[brain] Telegram bot disabled (no token or no allowed users).");
}

// Step 3: Start watchers
const watchers = startWatchers(vaultRoot, config);
console.log("[brain] Watchers started. Daemon ready.");

// Step 4: Schedule crons
cron.schedule(config.cron.lint_heal, async () => {
  console.log("[cron] Running lint & heal...");
  try {
    takePreHealSnapshot(vaultRoot);
    const stats = await runLintHeal(vaultRoot, {
      maxOperations: config.heal.max_operations_per_run,
      maxWebSearches: config.heal.max_web_searches_per_run,
      cooldownHours: config.heal.human_edit_cooldown_hours,
    });
    console.log(
      `[cron] Lint done: ${stats.lintIssuesFound} issues, ${stats.healOperationsRun} healed`,
    );
    appendDailyEntry(
      vaultRoot,
      "system",
      `Nightly lint: ${stats.lintIssuesFound} issues, ${stats.healOperationsRun} healed`,
    );
  } catch (err) {
    console.error(
      `[cron] Lint & heal failed: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  // Rebuild graph cache after lint/heal
  try {
    const { rebuildGraphCache } = await import("./graph/cache.js");
    const { aggregateEmbeddings } = await import("./graph/embeddings.js");
    const allChunks = await store.listAll();
    const embeddings = aggregateEmbeddings(allChunks);
    const cachePath = join(vaultRoot, config.graph.cache_path);
    const graphifyDir = config.graphify?.repos?.length
      ? join(vaultRoot, config.graphify.output_dir ?? "raw/graphify")
      : undefined;
    await rebuildGraphCache(vaultRoot, cachePath, embeddings, config.graph.umap_seed, graphifyDir);
  } catch (err) {
    console.error(
      `[cron] Graph cache rebuild failed: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
});

cron.schedule(config.cron.mcp_sources, async () => {
  console.log("[cron] Running GitHub + gmail + graphify sync...");
  try {
    const github = createGithubSource(
      undefined,
      config.sources?.github?.min_stars_for_readme ?? 100,
    );
    // git-commits source disabled — graphify provides better repo understanding
    // const gitCommits = createGitCommitsSource();

    const sources = [github];

    const gmail = createGmailApiSource(vaultRoot);
    if (gmail) sources.push(gmail);

    if (config.graphify?.repos?.length) {
      const graphifySource = createGraphifySource(vaultRoot, config.graphify);
      sources.push(graphifySource);
    }

    const stateStore = new JsonSyncStateStore(vaultRoot);
    const orchestrator = new SyncOrchestrator(vaultRoot, stateStore);
    const report = await orchestrator.run(sources);
    const ghIngested =
      (report.results.github as { itemsIngested?: number } | undefined)
        ?.itemsIngested ?? 0;
    const commitIngested =
      (report.results["git-commits"] as { itemsIngested?: number } | undefined)
        ?.itemsIngested ?? 0;
    const gmailIngested =
      (report.results.gmail as { itemsIngested?: number } | undefined)
        ?.itemsIngested ?? 0;
    const graphifyIngested =
      (report.results.graphify as { itemsIngested?: number } | undefined)
        ?.itemsIngested ?? 0;
    console.log(
      `[cron] Sync done: ${ghIngested} GitHub items, ${commitIngested} commits, ${gmailIngested} emails, ${graphifyIngested} graphify drops ingested`,
    );
    if (ghIngested + commitIngested + gmailIngested + graphifyIngested > 0) {
      appendDailyEntry(
        vaultRoot,
        "system",
        `Source sync: ${ghIngested} GitHub items, ${commitIngested} commits, ${gmailIngested} emails, ${graphifyIngested} graphify drops ingested`,
      );
    }
    if (report.results.github?.errors?.length) {
      console.warn(`[cron] GitHub errors: ${report.results.github.errors}`);
    }
    if (report.results["git-commits"]?.errors?.length) {
      console.warn(
        `[cron] git-commits errors: ${report.results["git-commits"].errors}`,
      );
    }
    if (report.results.gmail?.errors?.length) {
      console.warn(`[cron] Gmail errors: ${report.results.gmail.errors}`);
    }
    if (report.results.graphify?.errors?.length) {
      console.warn(`[cron] Graphify errors: ${report.results.graphify.errors}`);
    }
  } catch (err) {
    console.error(
      `[cron] Sync failed: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
});

// Daily summary at 23:55
cron.schedule("55 23 * * *", async () => {
  console.log("[cron] Writing daily summary...");
  try {
    const date = new Date().toISOString().split("T")[0];
    await writeDailySummary(vaultRoot, date);
    console.log(`[cron] Daily summary written for ${date}`);
  } catch (err) {
    console.error(
      `[cron] Daily summary failed: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
});

// Step 5: Graceful shutdown
async function shutdown() {
  console.log("\n[brain] Shutting down...");
  if (telegramProc) telegramProc.kill();
  await stopServer(server, 30_000);
  console.log("[brain] Server and bot stopped.");
  await watchers.close();
  console.log("[brain] Watchers closed. Goodbye.");
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
