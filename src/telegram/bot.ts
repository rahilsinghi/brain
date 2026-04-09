import { join } from "node:path";
import { mkdirSync } from "node:fs";
import { Bot } from "grammy";
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
      "Send any text to save it as knowledge.\n" +
      "Start a message with ? to query your wiki.\n\n" +
      "Example: ?What do I know about Kubernetes?",
  );
}

export async function handleHelpCommand(
  ctx: Context,
  _deps: HandlerDeps,
): Promise<void> {
  await ctx.reply(
    "How to use Brain:\n\n" +
      "Send text — ingest as knowledge (saved to your wiki pipeline)\n" +
      "?your question — query your wiki and get a synthesized answer\n\n" +
      "Commands:\n" +
      "/start — Welcome message\n" +
      "/help — This message\n" +
      "/status — Daemon health stats",
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
  };

  bot.command("start", (ctx) => handleStartCommand(ctx, deps));
  bot.command("help", (ctx) => handleHelpCommand(ctx, deps));
  bot.command("status", (ctx) => handleStatusCommand(ctx, deps));
  bot.on("message:voice", (ctx) => handleVoiceMessage(ctx, deps));
  bot.on("message:text", (ctx) => handleTextMessage(ctx, deps));

  return bot;
}
