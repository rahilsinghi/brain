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
import { SyncOrchestrator } from "./sources/orchestrator.js";
import { JsonSyncStateStore } from "./sources/state.js";
import { VectorStore } from "./embedder/vector-store.js";
import { synthesize } from "./query/synthesize.js";
import { createServer, stopServer } from "./api/server.js";
import { createTelegramBot } from "./telegram/bot.js";
import { ingestContent } from "./api/ingest-core.js";
import { getHealthStats } from "./api/health-core.js";
import { appendDailyEntry, writeDailySummary } from "./daily/log.js";
import { generateSlides } from "./output/slides.js";
import { generatePlot } from "./output/plots.js";

const vaultRoot = resolve(import.meta.dirname, "..");
const startTime = Date.now();

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

// Step 2.5: Start Telegram bot (conditional)
const botToken = config.telegram.bot_token ?? process.env.TELEGRAM_BOT_TOKEN ?? null;
let bot: ReturnType<typeof createTelegramBot> | null = null;

if (botToken && config.telegram.allowed_user_ids.length > 0) {
  bot = createTelegramBot({
    token: botToken,
    allowedUserIds: config.telegram.allowed_user_ids,
    store,
    vaultRoot,
    config,
    synthesizeFn: synthesize,
    ingestFn: ingestContent,
    getHealthStatsFn: getHealthStats,
    startTime,
    generateSlidesFn: slidesFn,
    generatePlotFn: plotFn,
  });
  bot.start({
    timeout: config.telegram.poll_timeout_s,
    onStart: () => console.log("[brain] Telegram bot started."),
  });
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
    await rebuildGraphCache(vaultRoot, cachePath, embeddings, config.graph.umap_seed);
  } catch (err) {
    console.error(
      `[cron] Graph cache rebuild failed: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
});

cron.schedule(config.cron.mcp_sources, async () => {
  console.log("[cron] Running GitHub + git-commits + gmail sync...");
  try {
    const github = createGithubSource(
      undefined,
      config.sources?.github?.min_stars_for_readme ?? 100,
    );
    const gitCommits = createGitCommitsSource();

    const sources = [github, gitCommits];

    const gmail = createGmailApiSource(vaultRoot);
    if (gmail) sources.push(gmail);

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
    console.log(
      `[cron] Sync done: ${ghIngested} GitHub items, ${commitIngested} commits, ${gmailIngested} emails ingested`,
    );
    if (ghIngested + commitIngested + gmailIngested > 0) {
      appendDailyEntry(
        vaultRoot,
        "system",
        `Source sync: ${ghIngested} GitHub items, ${commitIngested} commits, ${gmailIngested} emails ingested`,
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
  await Promise.all([
    stopServer(server, 30_000),
    bot ? bot.stop() : Promise.resolve(),
  ]);
  console.log("[brain] Server and bot stopped.");
  await watchers.close();
  console.log("[brain] Watchers closed. Goodbye.");
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
