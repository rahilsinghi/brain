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
import { finalizeWeek } from "./timesheet/finalize.js";
import { syncWeekToWiki } from "./timesheet/wiki-sync.js";
import {
  queueTelegramMessage,
  flushTelegramQueue,
  sendViaBotApi,
} from "./telegram/send-queue.js";
import { RelayClient } from "./relay/client.js";
import { syncRelayInbound } from "./relay/sync.js";

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

// Missed cron recovery — scanner
const lastScan = timesheetDb.getMeta("last_scan_time");
if (lastScan) {
  const lastScanAge = Date.now() - new Date(lastScan).getTime();
  const intervalMs = timesheetConfig.scanner.poll_interval_minutes * 60 * 1000;
  if (lastScanAge > intervalMs * 2) {
    console.log("[brain] Timesheet: missed scans detected, catch-up on next cron tick.");
  }
}

// Missed cron recovery — daily report
// If the daemon was asleep during scheduled report time, generate and queue now
{
  const lastReportDate = timesheetDb.getMeta("last_report_date");
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  if (lastReportDate !== yesterday) {
    const report = generateDailyReport(timesheetDb, timesheetConfig, yesterday);
    if (report.entryIds.length > 0) {
      console.log(`[brain] Missed daily report for ${yesterday} — queuing now.`);
      timesheetDb.setMeta("last_report_date", yesterday);
      const chatIdStr = timesheetDb.getMeta("telegram_chat_id");
      const chatId = chatIdStr ? parseInt(chatIdStr, 10) : NaN;
      if (!Number.isNaN(chatId)) {
        queueTelegramMessage(timesheetDb, chatId, report.message, "daily_report");
      } else {
        console.log("[brain] No chat_id stored — missed report generated but not queued. Send /start to bot.");
      }
    }
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

// Step 2.5: Start Telegram bot or Relay client
const botToken = config.telegram.bot_token ?? process.env.TELEGRAM_BOT_TOKEN ?? null;
let telegramProc: ReturnType<typeof Bun.spawn> | null = null;
const relayEnabled = config.relay?.enabled === true && !!config.relay.url && !!config.relay.secret;
let relayClient: RelayClient | null = null;

if (relayEnabled) {
  // Relay mode — daemon polls relay server instead of running Telegram bot
  const relay = config.relay!;
  relayClient = new RelayClient(relay.url, relay.secret);
  console.log(`[brain] Relay mode enabled — polling ${relay.url} every ${relay.poll_interval_seconds}s.`);

  // Immediate boot sync
  syncRelayInbound({
    client: relayClient,
    ingestFn: ingestContent,
    synthesizeFn: synthesize as unknown as (q: string, s: unknown, k: number) => Promise<{ answer: string }>,
    store,
    topK: config.api.default_top_k,
    vaultRoot,
    voiceDir: join(vaultRoot, config.watchers.voice_dir),
  })
    .then(({ processed, failed }) => {
      if (processed + failed > 0) {
        console.log(`[brain] Boot relay sync: ${processed} processed, ${failed} failed.`);
      }
    })
    .catch((err) => {
      console.error(`[brain] Boot relay sync failed: ${err instanceof Error ? err.message : String(err)}`);
    });

  // Relay sync cron
  const relayInterval = relay.poll_interval_seconds;
  const relayCronExpr = relayInterval < 60
    ? `*/${Math.max(1, Math.round(relayInterval / 60))} * * * *`
    : `*/${Math.round(relayInterval / 60)} * * * *`;
  cron.schedule(relayCronExpr, async () => {
    try {
      const { processed, failed } = await syncRelayInbound({
        client: relayClient!,
        ingestFn: ingestContent,
        synthesizeFn: synthesize as unknown as (q: string, s: unknown, k: number) => Promise<{ answer: string }>,
        store,
        topK: config.api.default_top_k,
        vaultRoot,
        voiceDir: join(vaultRoot, config.watchers.voice_dir),
      });
      if (processed + failed > 0) {
        console.log(`[cron] Relay sync: ${processed} processed, ${failed} failed.`);
      }
    } catch (err) {
      console.error(`[cron] Relay sync failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  });
} else {
  // Local Telegram bot mode (existing behavior)
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

  // Flush any pending Telegram messages from before shutdown/sleep
  {
    const chatId = getTelegramChatId();
    if (chatId && botToken) {
      flushTelegramQueue(timesheetDb, (cid, msg) => sendViaBotApi(botToken, cid, msg))
        .then((sent) => {
          if (sent > 0) console.log(`[brain] Boot flush: ${sent} queued Telegram messages sent.`);
        })
        .catch((err) => {
          console.error(`[brain] Boot flush failed: ${err instanceof Error ? err.message : String(err)}`);
        });
    }
  }
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
      for (const alert of alerts) {
        console.log(`[cron] Timesheet alert: ${alert.message}`);
        enqueueTelegram(alert.message, "cap_alert");
      }
    } catch (alertErr) {
      console.error(`[cron] Timesheet alerts failed: ${alertErr instanceof Error ? alertErr.message : String(alertErr)}`);
    }
  } catch (err) {
    console.error(`[cron] Timesheet scan failed: ${err instanceof Error ? err.message : String(err)}`);
  }
});

// Helper: get stored chat_id for proactive Telegram sends
function getTelegramChatId(): number | null {
  const raw = timesheetDb.getMeta("telegram_chat_id");
  if (!raw) return null;
  const parsed = parseInt(raw, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

// Helper: enqueue a Telegram message if chat_id is known
// In relay mode, pushes to relay outbound queue instead of local SQLite queue.
function enqueueTelegram(
  message: string,
  category: string,
  opts?: { deliver_at?: string; entry_ids?: string[]; report_date?: string },
): void {
  const chatId = getTelegramChatId();
  if (!chatId) {
    console.log(`[telegram-queue] No chat_id stored yet — message queued without recipient. Send /start to the bot first.`);
    return;
  }

  if (relayEnabled && relayClient) {
    relayClient
      .pushOutbound({
        chat_id: chatId,
        message,
        category,
        deliver_at: opts?.deliver_at,
        entry_ids: opts?.entry_ids,
        report_date: opts?.report_date,
      })
      .then((id) => {
        console.log(`[relay] Outbound pushed: ${id} (${category})`);
      })
      .catch((err) => {
        console.error(`[relay] Outbound push failed: ${err instanceof Error ? err.message : String(err)}`);
      });
  } else {
    queueTelegramMessage(timesheetDb, chatId, message, category);
  }
}

// Telegram queue flush cron (every 2 min — drains pending messages)
// In relay mode, the relay server handles delivery — skip local flush.
if (!relayEnabled) {
  cron.schedule("*/2 * * * *", async () => {
    const chatId = getTelegramChatId();
    if (!chatId || !botToken) return;

    try {
      const sent = await flushTelegramQueue(timesheetDb, (cid, msg) =>
        sendViaBotApi(botToken!, cid, msg),
      );
      if (sent > 0) {
        console.log(`[cron] Telegram queue flushed: ${sent} messages sent.`);
      }
    } catch (err) {
      console.error(`[cron] Telegram flush failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  });
}

// Daily timesheet report cron (9 AM, reviews yesterday)
const reportHour = timesheetConfig.review.report_hour;
cron.schedule(`0 ${reportHour} * * *`, () => {
  try {
    const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
    const report = generateDailyReport(timesheetDb, timesheetConfig, yesterday);
    if (report.entryIds.length > 0) {
      console.log(`[cron] Daily timesheet report for ${yesterday}: ${report.entryIds.length} entries.`);
      timesheetDb.setMeta("last_report_date", yesterday);
      // For relay: include deliver_at (tomorrow 9 AM) and report metadata
      const tomorrow9am = new Date();
      tomorrow9am.setDate(tomorrow9am.getDate() + 1);
      tomorrow9am.setHours(9, 0, 0, 0);
      enqueueTelegram(report.message, "daily_report", {
        deliver_at: relayEnabled ? tomorrow9am.toISOString() : undefined,
        entry_ids: report.entryIds,
        report_date: yesterday,
      });
    } else {
      console.log(`[cron] No timesheet entries for ${yesterday}, skipping report.`);
      timesheetDb.setMeta("last_report_date", yesterday);
    }
  } catch (err) {
    console.error(`[cron] Daily timesheet report failed: ${err instanceof Error ? err.message : String(err)}`);
  }
});

// Weekly finalization cron (Sunday at configured hour)
const finalizeDay = timesheetConfig.review.finalize_day === "sunday" ? 0 : 7;
const finalizeHour = timesheetConfig.review.finalize_hour;
cron.schedule(`0 ${finalizeHour} * * ${finalizeDay}`, () => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const d = new Date(today + "T12:00:00");
    const day = d.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const monday = new Date(d);
    monday.setDate(d.getDate() + mondayOffset);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const weekStart = monday.toISOString().slice(0, 10);
    const weekEnd = sunday.toISOString().slice(0, 10);

    const result = finalizeWeek(timesheetDb, timesheetConfig, weekStart, weekEnd);
    console.log(`[cron] Timesheet finalized: ${result.finalized} entries (${result.autoFinalized} auto-finalized).`);

    if (result.finalized > 0) {
      const wikiPaths = syncWeekToWiki(timesheetDb, timesheetConfig, vaultRoot, weekStart, weekEnd);
      console.log(`[cron] Wiki synced: ${wikiPaths.join(", ")}`);
      enqueueTelegram(result.message, "weekly_finalize");
    }
  } catch (err) {
    console.error(`[cron] Weekly finalization failed: ${err instanceof Error ? err.message : String(err)}`);
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
