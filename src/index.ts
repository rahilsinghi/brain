import { writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { loadConfig } from "./config.js";
import { startWatchers } from "./watcher.js";

const vaultRoot = resolve(import.meta.dirname, "..");

console.log(`[brain] Starting daemon for vault: ${vaultRoot}`);

const config = loadConfig(vaultRoot);
console.log(`[brain] Config loaded (log_level: ${config.daemon.log_level})`);

mkdirSync(join(vaultRoot, ".brain"), { recursive: true });

writeFileSync(join(vaultRoot, ".brain", "daemon.pid"), String(process.pid));

const watchers = startWatchers(vaultRoot, config);
console.log("[brain] File watchers started — watching raw/ for drops");
console.log("[brain] Daemon ready. Drop files into raw/ to ingest.");

function shutdown() {
  console.log("\n[brain] Shutting down...");
  watchers.close().then(() => {
    console.log("[brain] Watchers closed. Goodbye.");
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
