/**
 * Telegram bot worker — runs in a separate Bun subprocess.
 * If this process crashes (e.g., native fetch errors in Bun),
 * the main daemon stays alive and can restart it.
 *
 * Communication: inherits stdio from parent.
 * Receives config via argv[2] as JSON.
 */
import { resolve } from "node:path";
import { Bot } from "grammy";
import {
  handleTextMessage,
  handleVoiceMessage,
  handleAudioMessage,
  handleStartCommand,
  handleHelpCommand,
  handleStatusCommand,
  handleSlidesCommand,
  handlePlotCommand,
  handleTimesheetStatusCommand,
  handleTimesheetEodCommand,
  type HandlerDeps,
} from "./bot.js";
import { loadConfig } from "../config.js";
import { VectorStore } from "../embedder/vector-store.js";
import { synthesize } from "../query/synthesize.js";
import { ingestContent } from "../api/ingest-core.js";
import { getHealthStats } from "../api/health-core.js";
import { generateSlides } from "../output/slides.js";
import { generatePlot } from "../output/plots.js";
import { TimesheetDB } from "../timesheet/db.js";
import { loadTimesheetConfig } from "../timesheet/config.js";
import { join } from "node:path";

const vaultRoot = resolve(import.meta.dirname, "../..");
const config = loadConfig(vaultRoot);
const startTime = Date.now();

const botToken = config.telegram.bot_token ?? process.env.TELEGRAM_BOT_TOKEN;
if (!botToken) {
  console.error("[telegram-worker] No bot token configured");
  process.exit(1);
}

// Init LanceDB for synthesis queries
const store = new VectorStore(join(vaultRoot, ".lancedb"));
await store.init();

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

// Init timesheet DB (own connection — worker is a separate process)
const timesheetConfig = loadTimesheetConfig(vaultRoot);
const timesheetDb = new TimesheetDB(join(vaultRoot, ".brain", "timesheet.db"));

// Sync employers from config
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
console.log(`[telegram-worker] Timesheet DB ready (${Object.keys(timesheetConfig.employers).length} employers).`);

const reportMessageCache = new Map<number, { date: string; entryIds: string[] }>();

const bot = new Bot(botToken);

const deps: HandlerDeps = {
  allowedUserIds: config.telegram.allowed_user_ids,
  vaultRoot,
  config,
  token: botToken,
  synthesizeFn: synthesize,
  ingestFn: ingestContent,
  store,
  startTime,
  getHealthStatsFn: getHealthStats,
  generateSlidesFn: slidesFn,
  generatePlotFn: plotFn,
  timesheetDb,
  timesheetConfig,
  reportMessageCache,
};

bot.command("start", (ctx) => handleStartCommand(ctx, deps));
bot.command("help", (ctx) => handleHelpCommand(ctx, deps));
bot.command("status", (ctx) => handleStatusCommand(ctx, deps));
bot.command("slides", (ctx) => handleSlidesCommand(ctx, deps));
bot.command("plot", (ctx) => handlePlotCommand(ctx, deps));
bot.command("ts", (ctx) => handleTimesheetStatusCommand(ctx, deps));
bot.command("eod", (ctx) => handleTimesheetEodCommand(ctx, deps));
bot.on("message:voice", (ctx) => handleVoiceMessage(ctx, deps));
bot.on("message:audio", (ctx) => handleAudioMessage(ctx, deps));
bot.on("message:text", (ctx) => handleTextMessage(ctx, deps));

bot.catch((err) => {
  console.error(`[telegram-worker] Bot error: ${err.message}`);
});

console.log("[telegram-worker] Starting polling...");
await bot.start({
  timeout: config.telegram.poll_timeout_s,
  onStart: () => console.log("[telegram-worker] Polling active."),
});
