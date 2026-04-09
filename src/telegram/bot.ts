import { join } from "node:path";
import { mkdirSync } from "node:fs";
import { Bot, InputFile } from "grammy";
import type { Context } from "grammy";
import type { BrainConfig } from "../types.js";
import type { SynthesizeFn } from "../query/synthesize.js";
import type { IngestInput, IngestResult } from "../api/ingest-core.js";
import type { HealthInput, HealthStats } from "../api/health-core.js";
import { truncateAtSentence } from "./truncate.js";

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

export interface HandlerDeps {
  allowedUserIds: number[];
  vaultRoot: string;
  config: BrainConfig;
  synthesizeFn: SynthesizeFn;
  ingestFn: (input: IngestInput) => IngestResult;
  store: { search: (vector: number[], topK: number) => Promise<unknown[]> };
  startTime: number;
  getHealthStatsFn: (input: HealthInput) => HealthStats;
  convertAudioFn?: ConvertAudioFn;
  generateSlidesFn?: (topic: string) => Promise<{ mdPath: string; pdfPath: string; htmlPath: string }>;
  generatePlotFn?: (description: string) => Promise<{ pyPath: string; pngPath: string }>;
}

export async function handleTextMessage(
  ctx: Context,
  deps: HandlerDeps,
): Promise<void> {
  const userId = ctx.from?.id;
  if (!userId || !deps.allowedUserIds.includes(userId)) return;

  const text = ctx.message?.text?.trim() ?? "";
  if (text.length === 0) {
    await ctx.reply("Empty message — nothing to save.");
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
      const answer = truncateAtSentence(result.answer, TELEGRAM_MAX_LENGTH);
      await ctx.reply(answer);
    } catch {
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
  } catch {
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
    const downloadPath = await file.download();

    const timestamp = Date.now();
    const voiceDir = join(deps.vaultRoot, "raw", "voice");
    mkdirSync(voiceDir, { recursive: true });
    const wavPath = join(voiceDir, `${timestamp}.wav`);

    const convert = deps.convertAudioFn ?? defaultConvertAudio;
    await convert(downloadPath, wavPath);

    await ctx.reply("Transcribed (processing via voice pipeline)");
  } catch (err) {
    console.error(
      `[telegram] Voice processing error: ${err instanceof Error ? err.message : String(err)}`,
    );
    await ctx.reply("Voice processing failed — try again later.");
  }
}

export async function handleStartCommand(
  ctx: Context,
  _deps: HandlerDeps,
): Promise<void> {
  await ctx.reply(
    "Welcome to Brain — your personal knowledge base.\n\n" +
      "Send text to save it as knowledge.\n" +
      "Send a voice note to transcribe and save.\n" +
      "Start a message with ? to query your wiki.\n\n" +
      "Commands: /help /status /slides /plot",
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
      "?your question — query your wiki\n\n" +
      "Commands:\n" +
      "/start — Welcome message\n" +
      "/help — This message\n" +
      "/status — Daemon health stats\n" +
      "/slides <topic> — generate presentation slides\n" +
      "/plot <description> — generate a data visualization",
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
}

export function createTelegramBot(botDeps: TelegramBotDeps): Bot {
  const bot = new Bot(botDeps.token);

  const deps: HandlerDeps = {
    allowedUserIds: botDeps.allowedUserIds,
    vaultRoot: botDeps.vaultRoot,
    config: botDeps.config,
    synthesizeFn: botDeps.synthesizeFn,
    ingestFn: botDeps.ingestFn,
    store: botDeps.store,
    startTime: botDeps.startTime,
    getHealthStatsFn: botDeps.getHealthStatsFn,
    convertAudioFn: botDeps.convertAudioFn,
    generateSlidesFn: botDeps.generateSlidesFn,
    generatePlotFn: botDeps.generatePlotFn,
  };

  bot.command("start", (ctx) => handleStartCommand(ctx, deps));
  bot.command("help", (ctx) => handleHelpCommand(ctx, deps));
  bot.command("status", (ctx) => handleStatusCommand(ctx, deps));
  bot.command("slides", (ctx) => handleSlidesCommand(ctx, deps));
  bot.command("plot", (ctx) => handlePlotCommand(ctx, deps));
  bot.on("message:voice", (ctx) => handleVoiceMessage(ctx, deps));
  bot.on("message:text", (ctx) => handleTextMessage(ctx, deps));

  return bot;
}
