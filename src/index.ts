import { writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import cron from "node-cron";
import { loadConfig } from "./config.js";
import { startWatchers } from "./watcher.js";
import { takePreHealSnapshot } from "./snapshot.js";
import { runLintHeal } from "./lint/runner.js";
import { createGithubSource } from "./sources/github.js";
import { SyncOrchestrator } from "./sources/orchestrator.js";
import { JsonSyncStateStore } from "./sources/state.js";
import { VectorStore } from "./embedder/vector-store.js";
import { synthesize } from "./query/synthesize.js";
import { createServer, stopServer } from "./api/server.js";

const vaultRoot = resolve(import.meta.dirname, "..");

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
  } catch (err) {
    console.error(
      `[cron] Lint & heal failed: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
});

cron.schedule(config.cron.mcp_sources, async () => {
  console.log("[cron] Running GitHub sync...");
  try {
    const github = createGithubSource(
      undefined,
      config.sources?.github?.min_stars_for_readme ?? 100,
    );
    const stateStore = new JsonSyncStateStore(vaultRoot);
    const orchestrator = new SyncOrchestrator(vaultRoot, stateStore);
    const report = await orchestrator.run([github]);
    const ingested =
      (report.results.github as { itemsIngested?: number } | undefined)
        ?.itemsIngested ?? 0;
    console.log(`[cron] GitHub sync done: ${ingested} items ingested`);
    if (report.results.github?.errors?.length) {
      console.warn(`[cron] GitHub errors: ${report.results.github.errors}`);
    }
  } catch (err) {
    console.error(
      `[cron] GitHub sync failed: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
});

// Step 5: Graceful shutdown
async function shutdown() {
  console.log("\n[brain] Shutting down...");
  await stopServer(server, 30_000);
  console.log("[brain] Server drained.");
  await watchers.close();
  console.log("[brain] Watchers closed. Goodbye.");
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
