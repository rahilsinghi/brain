import { join } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { Bot, InputFile } from "grammy";
import type { Context } from "grammy";
import type { BrainConfig } from "../types.js";
import type { SynthesizeFn } from "../query/synthesize.js";
import type { IngestInput, IngestResult } from "../api/ingest-core.js";
import type { HealthInput, HealthStats } from "../api/health-core.js";
import type { TimesheetDB } from "../timesheet/db.js";
import type { TimesheetConfig } from "../timesheet/types.js";
import { generateDailyReport } from "../timesheet/daily-report.js";
import {
  parseReviewCommands,
  applyReviewCommands,
} from "../timesheet/telegram-review.js";
import {
  getStatusSummary,
  getWeekMatrix,
} from "../timesheet/status.js";
import { finalizeWeek } from "../timesheet/finalize.js";
import { generateInvoice } from "../timesheet/invoice.js";
import { syncWeekToWiki } from "../timesheet/wiki-sync.js";
import { truncateAtSentence } from "./truncate.js";
import { formatForTelegram } from "./format.js";

const TELEGRAM_MAX_LENGTH = 4096;

export type ConvertAudioFn = (inputPath: string, outputPath: string) => Promise<string>;

async function defaultConvertAudio(inputPath: string, outputPath: string): Promise<string> {
  const proc = Bun.spawn(["ffmpeg", "-y", "-i", inputPath, outputPath], {
    stdout: "pipe",
    stderr: "pipe",
  });
  const exitCode = await proc.exited;
  if (exitCode !== 0) {
    const stderr = await new Response(proc.stderr).text();
    throw new Error(`ffmpeg failed (exit ${exitCode}): ${stderr}`);
  }
  return outputPath;
}

export type FetchFileFn = (url: string) => Promise<ArrayBuffer>;

async function defaultFetchFile(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Telegram file download failed (${res.status})`);
  return res.arrayBuffer();
}

export interface HandlerDeps {
  allowedUserIds: number[];
  vaultRoot: string;
  config: BrainConfig;
  token: string;
  synthesizeFn: SynthesizeFn;
  ingestFn: (input: IngestInput) => IngestResult;
  store: { search: (vector: number[], topK: number) => Promise<unknown[]> };
  startTime: number;
  getHealthStatsFn: (input: HealthInput) => HealthStats;
  convertAudioFn?: ConvertAudioFn;
  fetchFileFn?: FetchFileFn;
  generateSlidesFn?: (topic: string) => Promise<{ mdPath: string; pdfPath: string; htmlPath: string }>;
  generatePlotFn?: (description: string) => Promise<{ pyPath: string; pngPath: string }>;
  timesheetDb?: TimesheetDB;
  timesheetConfig?: TimesheetConfig;
  reportMessageCache?: Map<number, { date: string; entryIds: string[] }>;
}

export async function handleTextMessage(
  ctx: Context,
  deps: HandlerDeps,
): Promise<void> {
  const userId = ctx.from?.id;
  if (!userId || !deps.allowedUserIds.includes(userId)) return;

  // Lazily persist chat_id for daemon-initiated messages
  const chatId = ctx.chat?.id;
  if (chatId && deps.timesheetDb && !deps.timesheetDb.getMeta("telegram_chat_id")) {
    deps.timesheetDb.setMeta("telegram_chat_id", String(chatId));
  }

  const text = ctx.message?.text?.trim() ?? "";
  if (text.length === 0) {
    await ctx.reply("Empty message — nothing to save.");
    return;
  }

  // Reply to daily report → parse timesheet corrections
  if (ctx.message?.reply_to_message?.message_id && deps.reportMessageCache) {
    const cached = deps.reportMessageCache.get(ctx.message.reply_to_message.message_id);
    if (cached && deps.timesheetDb) {
      await handleTimesheetReply(ctx, deps);
      return;
    }
  }

  // Quick-entry: +Xh employer ... → timesheet entry (intercept before ingest)
  if (text.match(/^\+\d+(?:\.\d+)?h\s/) && deps.timesheetDb) {
    const cmds = parseReviewCommands(text);
    const today = new Date().toISOString().slice(0, 10);
    const results = applyReviewCommands(deps.timesheetDb, cmds, [], today);
    const reply = results.map((r) => (r.success ? `✓ ${r.message}` : `✗ ${r.error}`)).join("\n");
    await ctx.reply(reply);
    return;
  }

  if (text.startsWith("?")) {
    const query = text.slice(1).trim();
    try {
      const result = await deps.synthesizeFn(
        query,
        deps.store as never,
        deps.config.api.default_top_k,
      );
      const answer = truncateAtSentence(formatForTelegram(result.answer), TELEGRAM_MAX_LENGTH);
      await ctx.reply(answer);
    } catch (err) {
      console.error(`[telegram] Synthesis error: ${err instanceof Error ? err.message : String(err)}`);
      await ctx.reply("Synthesis failed — try again later.");
    }
    return;
  }

  try {
    const result = deps.ingestFn({
      content: text,
      source: "telegram",
      vaultRoot: deps.vaultRoot,
    });
    await ctx.reply(`Saved. (${result.source_id})`);
  } catch (err) {
    console.error(`[telegram] Ingest error: ${err instanceof Error ? err.stack : String(err)}`);
    await ctx.reply("Failed to save — try again later.");
  }
}

export async function handleVoiceMessage(
  ctx: Context,
  deps: HandlerDeps,
): Promise<void> {
  const userId = ctx.from?.id;
  if (!userId || !deps.allowedUserIds.includes(userId)) return;

  try {
    const file = await ctx.getFile();
    if (!file.file_path) throw new Error("Telegram returned no file_path");

    const fetchFile = deps.fetchFileFn ?? defaultFetchFile;
    const url = `https://api.telegram.org/file/bot${deps.token}/${file.file_path}`;
    const data = await fetchFile(url);

    const timestamp = Date.now();
    const oggPath = join(tmpdir(), `brain-voice-${timestamp}.ogg`);
    writeFileSync(oggPath, Buffer.from(data));

    const voiceDir = join(deps.vaultRoot, "raw", "voice");
    mkdirSync(voiceDir, { recursive: true });
    const wavPath = join(voiceDir, `${timestamp}.wav`);

    const convert = deps.convertAudioFn ?? defaultConvertAudio;
    await convert(oggPath, wavPath);

    await ctx.reply("Transcribed (processing via voice pipeline)");
  } catch (err) {
    console.error(
      `[telegram] Voice processing error: ${err instanceof Error ? err.message : String(err)}`,
    );
    await ctx.reply("Voice processing failed — try again later.");
  }
}

export async function handleAudioMessage(
  ctx: Context,
  deps: HandlerDeps,
): Promise<void> {
  const userId = ctx.from?.id;
  if (!userId || !deps.allowedUserIds.includes(userId)) return;

  try {
    const file = await ctx.getFile();
    if (!file.file_path) throw new Error("Telegram returned no file_path");

    const fetchFile = deps.fetchFileFn ?? defaultFetchFile;
    const url = `https://api.telegram.org/file/bot${deps.token}/${file.file_path}`;
    const data = await fetchFile(url);

    const timestamp = Date.now();
    const ext = file.file_path.split(".").pop() ?? "m4a";
    const inputPath = join(tmpdir(), `brain-audio-${timestamp}.${ext}`);
    writeFileSync(inputPath, Buffer.from(data));

    const voiceDir = join(deps.vaultRoot, "raw", "voice");
    mkdirSync(voiceDir, { recursive: true });
    const wavPath = join(voiceDir, `${timestamp}.wav`);

    const convert = deps.convertAudioFn ?? defaultConvertAudio;
    await convert(inputPath, wavPath);

    await ctx.reply("Audio received and queued for transcription.");
  } catch (err) {
    console.error(
      `[telegram] Audio processing error: ${err instanceof Error ? err.message : String(err)}`,
    );
    await ctx.reply("Audio processing failed — try again later.");
  }
}

export async function handleStartCommand(
  ctx: Context,
  deps: HandlerDeps,
): Promise<void> {
  // Persist chat_id so daemon crons can send proactive messages
  const chatId = ctx.chat?.id;
  if (chatId && deps.timesheetDb) {
    deps.timesheetDb.setMeta("telegram_chat_id", String(chatId));
  }

  await ctx.reply(
    "Welcome to Brain — your personal knowledge base.\n\n" +
      "Send text to save it as knowledge.\n" +
      "Send a voice note to transcribe and save.\n" +
      "Start a message with ? to query your wiki.\n" +
      "+Xh employer cat desc — quick timesheet entry\n\n" +
      "Commands: /help /status /slides /plot /ts /eod",
  );
}

export async function handleHelpCommand(
  ctx: Context,
  _deps: HandlerDeps,
): Promise<void> {
  await ctx.reply(
    "How to use Brain:\n\n" +
      "Send text — ingest as knowledge\n" +
      "Send a voice note — transcribe and save\n" +
      "?your question — query your wiki\n" +
      "+Xh employer cat desc — quick timesheet entry\n\n" +
      "Commands:\n" +
      "/start — Welcome message\n" +
      "/help — This message\n" +
      "/status — Daemon health stats\n" +
      "/slides <topic> — generate presentation slides\n" +
      "/plot <description> — generate a data visualization\n" +
      "/ts — Weekly timesheet summary\n" +
      "/ts today — Today's entries\n" +
      "/ts week — Day-by-day matrix\n" +
      "/eod — End-of-day review (reply to edit)\n" +
      "/finalize — Finalize current week + wiki sync\n" +
      "/invoice <employer> <month> — Generate invoice",
  );
}

export async function handleStatusCommand(
  ctx: Context,
  deps: HandlerDeps,
): Promise<void> {
  const stats = deps.getHealthStatsFn({
    store: deps.store,
    vaultRoot: deps.vaultRoot,
    startTime: deps.startTime,
  });

  await ctx.reply(
    `Status: ${stats.status}\n` +
      `Uptime: ${stats.uptime_s}s\n` +
      `LanceDB: ${stats.lancedb_ready ? "ready" : "not ready"}\n` +
      `Wiki articles: ${stats.wiki_article_count}\n` +
      `Raw pending: ${stats.raw_pending_count}`,
  );
}

export async function handleSlidesCommand(
  ctx: Context,
  deps: HandlerDeps,
): Promise<void> {
  const userId = ctx.from?.id;
  if (!userId || !deps.allowedUserIds.includes(userId)) return;

  const text = ctx.message?.text?.replace(/^\/slides\s*/, "").trim() ?? "";
  if (text.length === 0) {
    await ctx.reply("Usage: /slides <topic>");
    return;
  }

  if (!deps.generateSlidesFn) {
    await ctx.reply("Not configured.");
    return;
  }

  await ctx.reply("Generating slides...");
  try {
    const result = await deps.generateSlidesFn(text);
    const absolutePath = join(deps.vaultRoot, result.pdfPath);
    await ctx.replyWithDocument(new InputFile(absolutePath));
  } catch {
    await ctx.reply("Generation failed — check logs.");
  }
}

export async function handlePlotCommand(
  ctx: Context,
  deps: HandlerDeps,
): Promise<void> {
  const userId = ctx.from?.id;
  if (!userId || !deps.allowedUserIds.includes(userId)) return;

  const text = ctx.message?.text?.replace(/^\/plot\s*/, "").trim() ?? "";
  if (text.length === 0) {
    await ctx.reply("Usage: /plot <description>");
    return;
  }

  if (!deps.generatePlotFn) {
    await ctx.reply("Not configured.");
    return;
  }

  await ctx.reply("Generating plot...");
  try {
    const result = await deps.generatePlotFn(text);
    const absolutePath = join(deps.vaultRoot, result.pngPath);
    await ctx.replyWithPhoto(new InputFile(absolutePath));
  } catch {
    await ctx.reply("Generation failed — check logs.");
  }
}

// ── Timesheet Handlers ──

function getWeekBoundsForDate(dateStr: string): { start: string; end: string } {
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

export async function handleTimesheetStatusCommand(
  ctx: Context,
  deps: HandlerDeps,
): Promise<void> {
  const userId = ctx.from?.id;
  if (!userId || !deps.allowedUserIds.includes(userId)) return;
  if (!deps.timesheetDb || !deps.timesheetConfig) {
    await ctx.reply("Timesheet not configured.");
    return;
  }

  const text = ctx.message?.text?.replace(/^\/ts\s*/, "").trim() ?? "";
  const today = new Date().toISOString().slice(0, 10);
  const { start: weekStart, end: weekEnd } = getWeekBoundsForDate(today);

  if (text === "today") {
    const report = generateDailyReport(deps.timesheetDb, deps.timesheetConfig, today);
    await ctx.reply(truncateAtSentence(report.message, TELEGRAM_MAX_LENGTH));
    return;
  }

  if (text === "week") {
    const matrix = getWeekMatrix(deps.timesheetDb, weekStart, weekEnd);
    if (Object.keys(matrix).length === 0) {
      await ctx.reply("No entries this week.");
      return;
    }
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
    await ctx.reply(lines.join("\n"));
    return;
  }

  // Default: weekly summary
  const summary = getStatusSummary(deps.timesheetDb, weekStart, weekEnd);
  if (Object.keys(summary).length === 0) {
    await ctx.reply("No entries this week.");
    return;
  }
  const lines: string[] = ["📋 Weekly Summary"];
  for (const [emp, s] of Object.entries(summary)) {
    const capStr = s.cap_percent != null ? ` (${s.cap_percent}% of cap)` : "";
    lines.push(`${emp.toUpperCase()}: ${s.hours}h → $${s.revenue}${capStr}`);
  }
  await ctx.reply(lines.join("\n"));
}

export async function handleTimesheetEodCommand(
  ctx: Context,
  deps: HandlerDeps,
): Promise<void> {
  const userId = ctx.from?.id;
  if (!userId || !deps.allowedUserIds.includes(userId)) return;
  if (!deps.timesheetDb || !deps.timesheetConfig) {
    await ctx.reply("Timesheet not configured.");
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const report = generateDailyReport(deps.timesheetDb, deps.timesheetConfig, today);
  const sent = await ctx.reply(truncateAtSentence(report.message, TELEGRAM_MAX_LENGTH));

  // Store message_id → date + entryIds for reply parsing
  if (deps.reportMessageCache && sent.message_id) {
    deps.reportMessageCache.set(sent.message_id, {
      date: report.date,
      entryIds: report.entryIds,
    });
  }
}

export async function handleTimesheetReply(
  ctx: Context,
  deps: HandlerDeps,
): Promise<void> {
  const userId = ctx.from?.id;
  if (!userId || !deps.allowedUserIds.includes(userId)) return;
  if (!deps.timesheetDb || !deps.reportMessageCache) return;

  const replyToId = ctx.message?.reply_to_message?.message_id;
  if (!replyToId) return;

  const cached = deps.reportMessageCache.get(replyToId);
  if (!cached) return;

  const text = ctx.message?.text?.trim() ?? "";
  if (!text) return;

  const commands = parseReviewCommands(text);
  const results = applyReviewCommands(
    deps.timesheetDb,
    commands,
    cached.entryIds,
    cached.date,
  );

  const reply = results
    .map((r) => (r.success ? `✓ ${r.message}` : `✗ ${r.error ?? r.message}`))
    .join("\n");
  await ctx.reply(reply);
}

export async function handleFinalizeCommand(
  ctx: Context,
  deps: HandlerDeps,
): Promise<void> {
  const userId = ctx.from?.id;
  if (!userId || !deps.allowedUserIds.includes(userId)) return;
  if (!deps.timesheetDb || !deps.timesheetConfig) {
    await ctx.reply("Timesheet not configured.");
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const { start: weekStart, end: weekEnd } = getWeekBoundsForDate(today);

  const result = finalizeWeek(deps.timesheetDb, deps.timesheetConfig, weekStart, weekEnd);
  await ctx.reply(truncateAtSentence(result.message, TELEGRAM_MAX_LENGTH));

  // Sync to wiki
  if (result.finalized > 0) {
    const wikiPaths = syncWeekToWiki(
      deps.timesheetDb, deps.timesheetConfig, deps.vaultRoot, weekStart, weekEnd,
    );
    if (wikiPaths.length > 0) {
      await ctx.reply(`📝 Wiki synced: ${wikiPaths.join(", ")}`);
    }
  }
}

export async function handleInvoiceCommand(
  ctx: Context,
  deps: HandlerDeps,
): Promise<void> {
  const userId = ctx.from?.id;
  if (!userId || !deps.allowedUserIds.includes(userId)) return;
  if (!deps.timesheetDb || !deps.timesheetConfig) {
    await ctx.reply("Timesheet not configured.");
    return;
  }

  // Parse: /invoice maison april  OR  /invoice maison 2026-04
  const text = ctx.message?.text?.replace(/^\/invoice\s*/, "").trim() ?? "";
  const parts = text.split(/\s+/);
  if (parts.length < 2) {
    await ctx.reply("Usage: /invoice <employer> <month>\nExample: /invoice maison april");
    return;
  }

  const employerId = parts[0].toLowerCase();
  const monthArg = parts.slice(1).join(" ").toLowerCase();

  // Resolve month to YYYY-MM
  const month = resolveMonth(monthArg);
  if (!month) {
    await ctx.reply(`Could not parse month: "${monthArg}". Use "april", "2026-04", etc.`);
    return;
  }

  const periodStart = `${month}-01`;
  const lastDay = new Date(parseInt(month.slice(0, 4)), parseInt(month.slice(5, 7)), 0).getDate();
  const periodEnd = `${month}-${String(lastDay).padStart(2, "0")}`;

  const result = generateInvoice(deps.timesheetDb, deps.timesheetConfig, deps.vaultRoot, {
    employerId,
    periodStart,
    periodEnd,
  });

  if (!result.success) {
    await ctx.reply(`Invoice failed: ${result.error}`);
    return;
  }

  await ctx.reply(
    `✅ Invoice generated: ${result.invoiceId}\n` +
    `${result.totalHours}h → $${result.totalAmount?.toFixed(2)}\n` +
    `MD: ${result.mdPath}\nCSV: ${result.csvPath}`,
  );

  // Send the markdown file as a document
  if (result.mdPath) {
    try {
      await ctx.replyWithDocument(new InputFile(join(deps.vaultRoot, result.mdPath)));
    } catch {
      // File send is best-effort
    }
  }
}

function resolveMonth(input: string): string | null {
  // Direct YYYY-MM
  if (/^\d{4}-\d{2}$/.test(input)) return input;

  const year = new Date().getFullYear();
  const months: Record<string, string> = {
    january: "01", jan: "01",
    february: "02", feb: "02",
    march: "03", mar: "03",
    april: "04", apr: "04",
    may: "05",
    june: "06", jun: "06",
    july: "07", jul: "07",
    august: "08", aug: "08",
    september: "09", sep: "09",
    october: "10", oct: "10",
    november: "11", nov: "11",
    december: "12", dec: "12",
  };

  const num = months[input];
  if (num) return `${year}-${num}`;
  return null;
}

export interface TelegramBotDeps {
  token: string;
  allowedUserIds: number[];
  store: { search: (vector: number[], topK: number) => Promise<unknown[]> };
  vaultRoot: string;
  config: BrainConfig;
  synthesizeFn: SynthesizeFn;
  ingestFn: (input: IngestInput) => IngestResult;
  getHealthStatsFn: (input: HealthInput) => HealthStats;
  startTime: number;
  convertAudioFn?: ConvertAudioFn;
  generateSlidesFn?: (topic: string) => Promise<{ mdPath: string; pdfPath: string; htmlPath: string }>;
  generatePlotFn?: (description: string) => Promise<{ pyPath: string; pngPath: string }>;
  timesheetDb?: TimesheetDB;
  timesheetConfig?: TimesheetConfig;
}

export function createTelegramBot(botDeps: TelegramBotDeps): Bot {
  const bot = new Bot(botDeps.token);

  const reportMessageCache = new Map<number, { date: string; entryIds: string[] }>();

  const deps: HandlerDeps = {
    allowedUserIds: botDeps.allowedUserIds,
    vaultRoot: botDeps.vaultRoot,
    config: botDeps.config,
    token: botDeps.token,
    synthesizeFn: botDeps.synthesizeFn,
    ingestFn: botDeps.ingestFn,
    store: botDeps.store,
    startTime: botDeps.startTime,
    getHealthStatsFn: botDeps.getHealthStatsFn,
    convertAudioFn: botDeps.convertAudioFn,
    generateSlidesFn: botDeps.generateSlidesFn,
    generatePlotFn: botDeps.generatePlotFn,
    timesheetDb: botDeps.timesheetDb,
    timesheetConfig: botDeps.timesheetConfig,
    reportMessageCache,
  };

  bot.command("start", (ctx) => handleStartCommand(ctx, deps));
  bot.command("help", (ctx) => handleHelpCommand(ctx, deps));
  bot.command("status", (ctx) => handleStatusCommand(ctx, deps));
  bot.command("slides", (ctx) => handleSlidesCommand(ctx, deps));
  bot.command("plot", (ctx) => handlePlotCommand(ctx, deps));
  bot.command("ts", (ctx) => handleTimesheetStatusCommand(ctx, deps));
  bot.command("eod", (ctx) => handleTimesheetEodCommand(ctx, deps));
  bot.command("finalize", (ctx) => handleFinalizeCommand(ctx, deps));
  bot.command("invoice", (ctx) => handleInvoiceCommand(ctx, deps));
  bot.on("message:voice", (ctx) => handleVoiceMessage(ctx, deps));
  bot.on("message:audio", (ctx) => handleAudioMessage(ctx, deps));
  bot.on("message:text", (ctx) => handleTextMessage(ctx, deps));

  return bot;
}
