/**
 * Manually trigger a daily timesheet report.
 * Usage: bun run scripts/trigger-daily-report.ts [YYYY-MM-DD]
 * Default: yesterday.
 *
 * Uses the brain daemon's API (not direct DB access) so the cron/relay
 * flow matches what would happen from the scheduled cron.
 */
import { resolve, join } from "node:path";
import { TimesheetDB } from "../src/timesheet/db.js";
import { loadTimesheetConfig } from "../src/timesheet/config.js";
import { generateDailyReport } from "../src/timesheet/daily-report.js";
import { RelayClient } from "../src/relay/client.js";
import { loadConfig } from "../src/config.js";

const vaultRoot = resolve(import.meta.dirname, "..");
const arg = process.argv[2];
const date = arg ?? new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);

console.log(`[trigger] Generating daily report for ${date}...`);

const config = loadConfig(vaultRoot);
const tsConfig = loadTimesheetConfig(vaultRoot);
const db = new TimesheetDB(join(vaultRoot, ".brain", "timesheet.db"));

const chatId = db.getMeta("telegram_chat_id");
if (!chatId) {
  console.error("[trigger] No chat_id in DB. Send /start to the bot first.");
  process.exit(1);
}
console.log(`[trigger] Delivering to chat_id: ${chatId}`);

const report = generateDailyReport(db, tsConfig, date);
if (report.entryIds.length === 0) {
  console.log(`[trigger] No entries for ${date}. Nothing to send.`);
  process.exit(0);
}

console.log(`[trigger] Report has ${report.entryIds.length} entries. Pushing...`);
console.log("---\n" + report.message + "\n---");

const relayEnabled = config.relay?.enabled === true && !!config.relay.url && !!config.relay.secret;
if (relayEnabled) {
  const client = new RelayClient(config.relay!.url, config.relay!.secret);
  const id = await client.pushOutbound({
    chat_id: parseInt(chatId, 10),
    message: report.message,
    category: "daily_report",
    entry_ids: report.entryIds,
    report_date: date,
  });
  console.log(`[trigger] Pushed to relay: ${id}`);
} else {
  console.log("[trigger] Relay disabled. Message would go to local SQLite queue.");
}
db.setMeta("last_report_date", date);
console.log(`[trigger] last_report_date updated to ${date}`);
