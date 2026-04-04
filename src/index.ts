import { writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import cron from "node-cron";
import { loadConfig } from "./config.js";
import { startWatchers } from "./watcher.js";
import { takePreHealSnapshot } from "./snapshot.js";
import { runLintHeal } from "./lint/runner.js";

const vaultRoot = resolve(import.meta.dirname, "..");

console.log(`[brain] Starting daemon for vault: ${vaultRoot}`);

const config = loadConfig(vaultRoot);
console.log(`[brain] Config loaded (log_level: ${config.daemon.log_level})`);

mkdirSync(join(vaultRoot, ".brain"), { recursive: true });

writeFileSync(join(vaultRoot, ".brain", "daemon.pid"), String(process.pid));

const watchers = startWatchers(vaultRoot, config);
console.log("[brain] File watchers started — watching raw/ for drops");
console.log("[brain] Daemon ready. Drop files into raw/ to ingest.");

cron.schedule(config.cron.lint_heal, async () => {
  console.log("[cron] Starting nightly lint & heal...");

  const snapshotTaken = takePreHealSnapshot(vaultRoot);
  if (snapshotTaken) {
    console.log("[cron] Pre-heal git snapshot created");
  }

  try {
    const stats = await runLintHeal(vaultRoot, {
      maxOperations: config.heal.max_operations_per_run,
      maxWebSearches: config.heal.max_web_searches_per_run,
      cooldownHours: config.heal.human_edit_cooldown_hours,
    });
    console.log(`[cron] Lint & heal complete: ${stats.lintIssuesFound} issues, ${stats.healOperationsRun} operations`);
  } catch (err) {
    console.error("[cron] Lint & heal error:", err);
  }
});

console.log(`[brain] Nightly lint & heal scheduled: ${config.cron.lint_heal}`);

function shutdown() {
  console.log("\n[brain] Shutting down...");
  watchers.close().then(() => {
    console.log("[brain] Watchers closed. Goodbye.");
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
