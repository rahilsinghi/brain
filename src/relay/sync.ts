import { writeFileSync, mkdirSync } from "node:fs";
import { join, extname } from "node:path";
import type { RelayClient } from "./client.js";
import type { RelayInboundItem } from "./types.js";
import type { TimesheetDB } from "../timesheet/db.js";
import type { TimesheetConfig } from "../timesheet/types.js";
import { generateDailyReport } from "../timesheet/daily-report.js";
import { getStatusSummary, getWeekMatrix } from "../timesheet/status.js";
import { parseReviewCommands, applyReviewCommands } from "../timesheet/telegram-review.js";
import { finalizeWeek } from "../timesheet/finalize.js";
import { generateInvoice } from "../timesheet/invoice.js";
import { syncWeekToWiki } from "../timesheet/wiki-sync.js";
import { formatForTelegram } from "../telegram/format.js";
import { truncateAtSentence } from "../telegram/truncate.js";

const MAX_RESPONSE_LENGTH = 4096;
const MAX_RETRIES = 3;

export interface SyncDeps {
  client: RelayClient;
  ingestFn: (input: {
    content: string;
    source: string;
    vaultRoot: string;
  }) => { source_id: string };
  synthesizeFn: (
    query: string,
    store: unknown,
    topK: number,
  ) => Promise<{ answer: string }>;
  store: unknown;
  topK: number;
  vaultRoot: string;
  voiceDir: string;
  timesheetDb?: TimesheetDB;
  timesheetConfig?: TimesheetConfig;
}

async function processItem(
  item: RelayInboundItem,
  deps: SyncDeps,
): Promise<string> {
  switch (item.type) {
    case "ingest": {
      const result = deps.ingestFn({
        content: item.raw_text ?? "",
        source: "telegram",
        vaultRoot: deps.vaultRoot,
      });
      return `Saved. (${result.source_id})`;
    }

    case "query": {
      const query = (item.raw_text ?? "").replace(/^\?/, "").trim();
      const result = await deps.synthesizeFn(query, deps.store, deps.topK);
      const answer = result.answer;
      return answer.length > MAX_RESPONSE_LENGTH
        ? answer.slice(0, MAX_RESPONSE_LENGTH)
        : answer;
    }

    case "voice":
    case "audio": {
      if (item.file_status === "download_failed") {
        throw new DownloadFailedError(
          `File download failed for ${item.file_path ?? "unknown"}`,
        );
      }

      const fileName = item.file_path ?? "unknown";
      const data = await deps.client.downloadFile(fileName);

      mkdirSync(deps.voiceDir, { recursive: true });
      const ext = extname(fileName) || ".ogg";
      const outPath = join(deps.voiceDir, `${Date.now()}${ext}`);
      writeFileSync(outPath, Buffer.from(data));

      return "Transcribed (processing via voice pipeline)";
    }

    case "timesheet_entry": {
      if (!deps.timesheetDb) return "Timesheet not configured.";
      const cmds = parseReviewCommands(item.raw_text ?? "");
      const today = new Date().toISOString().slice(0, 10);
      const results = applyReviewCommands(deps.timesheetDb, cmds, [], today);
      return results.map((r) => (r.success ? `✓ ${r.message}` : `✗ ${r.error}`)).join("\n");
    }

    case "timesheet_command": {
      return handleTimesheetCommand(item, deps);
    }

    case "timesheet_reply": {
      if (!deps.timesheetDb) return "Timesheet not configured.";
      // For now, parse the reply text as review commands against today's entries
      // Full reply-to-report context requires the relay to pass entry_ids
      const cmds = parseReviewCommands(item.raw_text ?? "");
      const today = new Date().toISOString().slice(0, 10);
      const entries = deps.timesheetDb.getEntriesByDateRange(today, today);
      const entryIds = entries.map((e) => e.id);
      const results = applyReviewCommands(deps.timesheetDb, cmds, entryIds, today);
      return results.map((r) => (r.success ? `✓ ${r.message}` : `✗ ${r.error}`)).join("\n");
    }

    default:
      return `Unknown type: ${item.type}`;
  }
}

function getWeekBounds(dateStr: string): { start: string; end: string } {
  const d = new Date(dateStr + "T12:00:00");
  const day = d.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + mondayOffset);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return {
    start: monday.toISOString().slice(0, 10),
    end: sunday.toISOString().slice(0, 10),
  };
}

function handleTimesheetCommand(
  item: RelayInboundItem,
  deps: SyncDeps,
): string {
  const cmd = item.command ?? "";
  const rawText = item.raw_text ?? "";
  const args = rawText.replace(/^\/\w+\s*/, "").trim();
  const today = new Date().toISOString().slice(0, 10);
  const { start: weekStart, end: weekEnd } = getWeekBounds(today);

  if (cmd === "start") {
    return (
      "Welcome to Brain — your personal knowledge base.\n\n" +
      "Send text to save it as knowledge.\n" +
      "Send a voice note to transcribe and save.\n" +
      "+Xh employer cat desc — quick timesheet entry\n\n" +
      "Commands: /help /status /slides /plot /ts /eod /finalize /invoice"
    );
  }

  if (cmd === "help") {
    return (
      "How to use Brain:\n\n" +
      "Send text — ingest as knowledge\n" +
      "Send a voice note — transcribe and save\n" +
      "?your question — query your wiki\n" +
      "+Xh employer cat desc — quick timesheet entry\n\n" +
      "Commands:\n" +
      "/start — Welcome message\n" +
      "/help — This message\n" +
      "/status — Daemon health stats\n" +
      "/ts — Weekly timesheet summary\n" +
      "/ts today — Today's entries\n" +
      "/ts week — Day-by-day matrix\n" +
      "/eod — End-of-day review\n" +
      "/finalize — Finalize current week + wiki sync\n" +
      "/invoice <employer> <month> — Generate invoice"
    );
  }

  if (cmd === "status") {
    return "Brain daemon is online (relay mode).";
  }

  if (!deps.timesheetDb || !deps.timesheetConfig) {
    return "Timesheet not configured.";
  }

  if (cmd === "ts") {
    if (args === "today") {
      const report = generateDailyReport(deps.timesheetDb, deps.timesheetConfig, today);
      return truncateAtSentence(report.message, MAX_RESPONSE_LENGTH);
    }
    if (args === "week") {
      const matrix = getWeekMatrix(deps.timesheetDb, weekStart, weekEnd);
      if (Object.keys(matrix).length === 0) return "No entries this week.";
      const lines: string[] = ["📊 Week Matrix"];
      for (const [emp, days] of Object.entries(matrix)) {
        lines.push(`\n${emp.toUpperCase()}`);
        for (const [date, hours] of Object.entries(days)) {
          if (hours > 0) {
            const dayName = new Date(date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short" });
            lines.push(`  ${dayName} ${date}: ${hours}h`);
          }
        }
      }
      return lines.join("\n");
    }
    // Default: weekly summary
    const summary = getStatusSummary(deps.timesheetDb, weekStart, weekEnd);
    if (Object.keys(summary).length === 0) return "No entries this week.";
    const lines: string[] = ["📋 Weekly Summary"];
    for (const [emp, s] of Object.entries(summary)) {
      const capStr = s.cap_percent != null ? ` (${s.cap_percent}% of cap)` : "";
      lines.push(`${emp.toUpperCase()}: ${s.hours}h → $${s.revenue}${capStr}`);
    }
    return lines.join("\n");
  }

  if (cmd === "eod") {
    const report = generateDailyReport(deps.timesheetDb, deps.timesheetConfig, today);
    return truncateAtSentence(report.message, MAX_RESPONSE_LENGTH);
  }

  if (cmd === "finalize") {
    const result = finalizeWeek(deps.timesheetDb, deps.timesheetConfig, weekStart, weekEnd);
    if (result.finalized > 0) {
      syncWeekToWiki(deps.timesheetDb, deps.timesheetConfig, deps.vaultRoot, weekStart, weekEnd);
    }
    return truncateAtSentence(result.message, MAX_RESPONSE_LENGTH);
  }

  if (cmd === "invoice") {
    const parts = args.split(/\s+/);
    if (parts.length < 2) return "Usage: /invoice <employer> <month>\nExample: /invoice maison april";
    const employerId = parts[0].toLowerCase();
    const monthArg = parts.slice(1).join(" ").toLowerCase();
    const months: Record<string, string> = {
      january: "01", jan: "01", february: "02", feb: "02", march: "03", mar: "03",
      april: "04", apr: "04", may: "05", june: "06", jun: "06", july: "07", jul: "07",
      august: "08", aug: "08", september: "09", sep: "09", october: "10", oct: "10",
      november: "11", nov: "11", december: "12", dec: "12",
    };
    let month: string;
    if (/^\d{4}-\d{2}$/.test(monthArg)) {
      month = monthArg;
    } else if (months[monthArg]) {
      month = `${new Date().getFullYear()}-${months[monthArg]}`;
    } else {
      return `Could not parse month: "${monthArg}"`;
    }
    const periodStart = `${month}-01`;
    const lastDay = new Date(parseInt(month.slice(0, 4)), parseInt(month.slice(5, 7)), 0).getDate();
    const periodEnd = `${month}-${String(lastDay).padStart(2, "0")}`;
    const result = generateInvoice(deps.timesheetDb, deps.timesheetConfig, deps.vaultRoot, {
      employerId, periodStart, periodEnd,
    });
    if (!result.success) return `Invoice failed: ${result.error}`;
    return `✅ Invoice generated: ${result.invoiceId}\n${result.totalHours}h → $${result.totalAmount?.toFixed(2)}\nMD: ${result.mdPath}`;
  }

  return `Unknown command: /${cmd}`;
}

class DownloadFailedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DownloadFailedError";
  }
}

export async function syncRelayInbound(
  deps: SyncDeps,
): Promise<{ processed: number; failed: number }> {
  const items = await deps.client.fetchPending();
  let processed = 0;
  let failed = 0;

  for (const item of items) {
    let success = false;
    let lastError: string | null = null;

    // Download failures are not retryable
    if (
      (item.type === "voice" || item.type === "audio") &&
      item.file_status === "download_failed"
    ) {
      const errMsg = `File download failed for ${item.file_path ?? "unknown"}`;
      try {
        await deps.client.postFail(item.id, errMsg);
      } catch {
        // ignore postFail errors
      }
      failed++;
      continue;
    }

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const response = await processItem(item, deps);
        await deps.client.postResponse(item.id, response, "completed");
        success = true;
        break;
      } catch (err) {
        lastError =
          err instanceof Error ? err.message : String(err);
      }
    }

    if (success) {
      processed++;
    } else {
      try {
        await deps.client.postFail(item.id, lastError ?? "Unknown error");
      } catch {
        // ignore postFail errors
      }
      failed++;
    }
  }

  return { processed, failed };
}
