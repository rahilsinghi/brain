import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Bot } from "grammy";
import { webhookCallback } from "grammy";
import { RelayDB } from "./db.js";
import { buildRelayApi } from "./api.js";
import { classifyMessage, getAckMessage } from "./webhook.js";
import { flushDueOutbound } from "./scheduler.js";
import { flushResponses } from "./responder.js";
import { cleanupOldFiles } from "./cleanup.js";

// ── Env vars ──

const DB_PATH = process.env.DB_PATH ?? "/data/relay.db";
const FILES_PATH = process.env.FILES_PATH ?? "/data/files";
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const RELAY_SECRET = process.env.RELAY_SECRET;
const ALLOWED_USER_IDS_RAW = process.env.ALLOWED_USER_IDS ?? "";
const PORT = parseInt(process.env.PORT ?? "8080", 10);

if (!BOT_TOKEN) {
  console.error("TELEGRAM_BOT_TOKEN is required");
  process.exit(1);
}
if (!RELAY_SECRET) {
  console.error("RELAY_SECRET is required");
  process.exit(1);
}

const ALLOWED_USER_IDS: Set<number> = new Set(
  ALLOWED_USER_IDS_RAW.split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number)
    .filter((n) => !isNaN(n)),
);

// ── Init ──

mkdirSync(FILES_PATH, { recursive: true });

const db = new RelayDB(DB_PATH);
const bot = new Bot(BOT_TOKEN);
const api = buildRelayApi(db, RELAY_SECRET, FILES_PATH);

// ── Telegram helpers ──

async function sendTelegram(
  chatId: number,
  text: string,
): Promise<{ message_id: number } | null> {
  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    },
  );
  if (!res.ok) return null;
  const data = (await res.json()) as { result: { message_id: number } };
  return { message_id: data.result.message_id };
}

async function sendReply(
  chatId: number,
  text: string,
  replyTo: number | null,
): Promise<{ message_id: number } | null> {
  const body: Record<string, unknown> = { chat_id: chatId, text };
  if (replyTo) body.reply_to_message_id = replyTo;
  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) return null;
  const data = (await res.json()) as { result: { message_id: number } };
  return { message_id: data.result.message_id };
}

// ── File download helper ──

async function downloadTelegramFile(
  fileId: string,
  destPath: string,
): Promise<boolean> {
  // Step 1: get file path from Telegram
  const metaRes = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`,
  );
  if (!metaRes.ok) return false;
  const meta = (await metaRes.json()) as {
    ok: boolean;
    result?: { file_path?: string };
  };
  if (!meta.ok || !meta.result?.file_path) return false;

  // Step 2: download content
  const downloadRes = await fetch(
    `https://api.telegram.org/file/bot${BOT_TOKEN}/${meta.result.file_path}`,
  );
  if (!downloadRes.ok) return false;

  const bytes = await downloadRes.arrayBuffer();
  writeFileSync(destPath, Buffer.from(bytes));
  return true;
}

// ── grammY handlers ──

function isAllowed(userId: number | undefined): boolean {
  if (ALLOWED_USER_IDS.size === 0) return true; // no restriction configured
  return userId !== undefined && ALLOWED_USER_IDS.has(userId);
}

bot.on("message:text", async (ctx) => {
  if (!isAllowed(ctx.from?.id)) return;

  const text = ctx.message.text;
  const chatId = ctx.chat.id;
  const telegramMessageId = ctx.message.message_id;

  // Check if this is a reply to a known outbound message
  const replyToTelegramId = ctx.message.reply_to_message?.message_id ?? null;
  let replyToOutboundId: string | null = null;
  if (replyToTelegramId !== null) {
    const mapped = db.getReportMap(replyToTelegramId);
    replyToOutboundId = mapped?.outbound_queue_id ?? null;
  }

  const classified = classifyMessage(text, replyToOutboundId);
  db.insertInbound({
    chat_id: chatId,
    telegram_message_id: telegramMessageId,
    type: classified.type,
    raw_text: text,
    command: classified.command ?? null,
    reply_to_queue_id: classified.reply_to_queue_id ?? null,
  });

  await ctx.reply(getAckMessage(classified.type), {
    reply_parameters: { message_id: telegramMessageId },
  });
});

bot.on("message:voice", async (ctx) => {
  if (!isAllowed(ctx.from?.id)) return;

  const chatId = ctx.chat.id;
  const telegramMessageId = ctx.message.message_id;
  const fileId = ctx.message.voice.file_id;
  const ext = "ogg";
  const destPath = join(FILES_PATH, `${fileId}.${ext}`);

  const ok = await downloadTelegramFile(fileId, destPath);
  db.insertInbound({
    chat_id: chatId,
    telegram_message_id: telegramMessageId,
    type: "voice",
    raw_text: "",
    file_path: ok ? destPath : null,
    file_status: ok ? "downloaded" : "download_failed",
  });

  await ctx.reply(getAckMessage("voice"), {
    reply_parameters: { message_id: telegramMessageId },
  });
});

bot.on("message:audio", async (ctx) => {
  if (!isAllowed(ctx.from?.id)) return;

  const chatId = ctx.chat.id;
  const telegramMessageId = ctx.message.message_id;
  const audio = ctx.message.audio;
  const fileId = audio.file_id;
  // Preserve original extension from mime_type or file_name, fallback to m4a
  const mimeExt = audio.mime_type?.split("/")[1] ?? "m4a";
  const origExt =
    audio.file_name?.split(".").pop() ?? mimeExt;
  const destPath = join(FILES_PATH, `${fileId}.${origExt}`);

  const ok = await downloadTelegramFile(fileId, destPath);
  db.insertInbound({
    chat_id: chatId,
    telegram_message_id: telegramMessageId,
    type: "audio",
    raw_text: "",
    file_path: ok ? destPath : null,
    file_status: ok ? "downloaded" : "download_failed",
  });

  await ctx.reply(getAckMessage("audio"), {
    reply_parameters: { message_id: telegramMessageId },
  });
});

// ── Webhook route ──

api.post("/webhook", async (request, reply) => {
  const handler = webhookCallback(bot, "fastify");
  return handler(request, reply);
});

// ── Background loops ──

setInterval(() => {
  flushDueOutbound(db, sendTelegram).catch((err: unknown) => {
    console.error("[scheduler] flushDueOutbound error:", err);
  });
}, 30_000);

setInterval(() => {
  flushResponses(db, sendReply).catch((err: unknown) => {
    console.error("[responder] flushResponses error:", err);
  });
}, 10_000);

setInterval(() => {
  cleanupOldFiles(db, FILES_PATH);
}, 86_400_000);

// ── Start ──

api.listen({ port: PORT, host: "0.0.0.0" }, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
  console.log(`[relay] listening on 0.0.0.0:${PORT}`);
});
