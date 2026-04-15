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
import { TimesheetDB } from "./timesheet/db.js";
import { loadTimesheetConfig } from "./timesheet/config.js";
import { scanRepo, upsertSession } from "./timesheet/scanner.js";
import { generateDailyReport } from "./timesheet/daily-report.js";
import { checkCapAlerts } from "./timesheet/alerts.js";

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

// Init timesheet DB
console.log("[brain] Initializing timesheet DB...");
const timesheetConfig = loadTimesheetConfig(vaultRoot);
const timesheetDb = new TimesheetDB(join(vaultRoot, ".brain", "timesheet.db"));

// Sync employers from config to DB
for (const [id, emp] of Object.entries(timesheetConfig.employers)) {
  timesheetDb.upsertEmployer({
    id,
    rate_hourly: emp.rate_hourly,
    weekly_cap_hours: emp.weekly_cap ?? null,
    monthly_bonus: emp.monthly_bonus ?? null,
    currency: emp.currency,
  });
  for (const pattern of emp.repos) {
    timesheetDb.upsertRepoMapping(pattern, id, "config");
  }
}
console.log(`[brain] Timesheet DB ready (${Object.keys(timesheetConfig.employers).length} employers).`);

// Missed cron recovery
const lastScan = timesheetDb.getMeta("last_scan_time");
if (lastScan) {
  const lastScanAge = Date.now() - new Date(lastScan).getTime();
  const intervalMs = timesheetConfig.scanner.poll_interval_minutes * 60 * 1000;
  if (lastScanAge > intervalMs * 2) {
    console.log("[brain] Timesheet: missed scans detected, catch-up on next cron tick.");
  }
}

// Step 2: Start HTTP server
const server = createServer({
  store,
  vaultRoot,
  config,
  synthesizeFn: synthesize,
  timesheetDb,
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

// Timesheet scanner cron
const tsInterval = `*/${timesheetConfig.scanner.poll_interval_minutes} * * * *`;
cron.schedule(tsInterval, async () => {
  console.log("[cron] Running timesheet scanner...");
  try {
    const lastScanTime = timesheetDb.getMeta("last_scan_time") ?? new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const mappings = timesheetDb.getRepoMappings();

    // Collect local repo paths
    const localPaths = new Set<string>();
    for (const m of mappings) {
      if (m.pattern.startsWith("/")) localPaths.add(m.pattern);
    }
    for (const emp of Object.values(timesheetConfig.employers)) {
      for (const repo of emp.repos) {
        const expanded = repo.startsWith("~") ? repo.replace("~", process.env.HOME ?? "") : repo;
        if (expanded.startsWith("/")) localPaths.add(expanded);
      }
    }

    let totalSessions = 0;
    for (const repoPath of localPaths) {
      try {
        const { sessions } = await scanRepo(repoPath, lastScanTime, timesheetConfig.scanner, mappings);
        for (const session of sessions) {
          upsertSession(timesheetDb, session, timesheetConfig.scanner.buffer_minutes);
          totalSessions++;
        }
      } catch (err) {
        console.error(`[cron] Timesheet scan error for ${repoPath}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    timesheetDb.setMeta("last_scan_time", new Date().toISOString());
    if (totalSessions > 0) {
      console.log(`[cron] Timesheet: ${totalSessions} sessions upserted.`);
    }

    // Check cap alerts after scanner run
    try {
      const today = new Date().toISOString().slice(0, 10);
      const alerts = checkCapAlerts(timesheetDb, timesheetConfig, today);
      if (alerts.length > 0) {
        console.log(`[cron] Timesheet alerts: ${alerts.map((a) => a.message).join("; ")}`);
        // Alerts will be sent via Telegram when daily report is generated
      }
    } catch (alertErr) {
      console.error(`[cron] Timesheet alerts failed: ${alertErr instanceof Error ? alertErr.message : String(alertErr)}`);
    }
  } catch (err) {
    console.error(`[cron] Timesheet scan failed: ${err instanceof Error ? err.message : String(err)}`);
  }
});

// Daily timesheet report cron (9 AM, reviews yesterday)
const reportHour = timesheetConfig.review.report_hour;
cron.schedule(`0 ${reportHour} * * *`, () => {
  try {
    const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
    const report = generateDailyReport(timesheetDb, timesheetConfig, yesterday);
    if (report.entryIds.length > 0) {
      console.log(`[cron] Daily timesheet report for ${yesterday}: ${report.entryIds.length} entries.`);
      timesheetDb.setMeta("last_report_date", yesterday);
      // Report is sent via Telegram worker's /eod command or cron-triggered push
      // For now, log it — Telegram send requires bot API access from worker subprocess
    } else {
      console.log(`[cron] No timesheet entries for ${yesterday}, skipping report.`);
    }
  } catch (err) {
    console.error(`[cron] Daily timesheet report failed: ${err instanceof Error ? err.message : String(err)}`);
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
