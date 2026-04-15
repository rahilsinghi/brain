import { randomUUID } from "node:crypto";
import type { TimesheetDB } from "../timesheet/db.js";

const MAX_RETRIES = 5;

export interface TelegramQueueEntry {
  id: string;
  chat_id: number;
  message: string;
  category: string;
  created_at: string;
  sent_at: string | null;
  retry_count: number;
  failed: number;
}

export type SendFn = (chatId: number, message: string) => Promise<boolean>;

/**
 * Enqueue a message for delivery. Survives daemon restarts (SQLite-backed).
 */
export function queueTelegramMessage(
  db: TimesheetDB,
  chatId: number,
  message: string,
  category = "general",
): string {
  const id = randomUUID();
  const now = new Date().toISOString();

  // Access the raw DB via the exposed interface
  (db as unknown as DbAccess).db
    .prepare(
      `INSERT INTO telegram_queue (id, chat_id, message, category, created_at, sent_at, retry_count, failed)
       VALUES (?, ?, ?, ?, ?, NULL, 0, 0)`,
    )
    .run(id, chatId, message, category, now);

  return id;
}

/**
 * Get all pending (unsent, not failed) messages in FIFO order.
 */
export function getPendingMessages(db: TimesheetDB): TelegramQueueEntry[] {
  return (db as unknown as DbAccess).db
    .prepare(
      "SELECT * FROM telegram_queue WHERE sent_at IS NULL AND failed = 0 ORDER BY created_at ASC",
    )
    .all() as TelegramQueueEntry[];
}

/**
 * Flush the queue — attempt to send all pending messages.
 * Returns count of successfully sent messages.
 */
export async function flushTelegramQueue(
  db: TimesheetDB,
  sendFn: SendFn,
): Promise<number> {
  const pending = getPendingMessages(db);
  let sent = 0;

  for (const entry of pending) {
    const ok = await sendFn(entry.chat_id, entry.message);

    if (ok) {
      (db as unknown as DbAccess).db
        .prepare("UPDATE telegram_queue SET sent_at = ? WHERE id = ?")
        .run(new Date().toISOString(), entry.id);
      sent++;
    } else {
      const newRetry = entry.retry_count + 1;
      const failed = newRetry >= MAX_RETRIES ? 1 : 0;
      (db as unknown as DbAccess).db
        .prepare("UPDATE telegram_queue SET retry_count = ?, failed = ? WHERE id = ?")
        .run(newRetry, failed, entry.id);
    }
  }

  return sent;
}

/**
 * Send a message directly via Telegram Bot API HTTP endpoint.
 * Returns true on success, false on failure (network error, API error).
 */
export async function sendViaBotApi(
  botToken: string,
  chatId: number,
  text: string,
): Promise<boolean> {
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: undefined, // plain text — safe for all content
        }),
      },
    );
    return res.ok;
  } catch {
    return false;
  }
}

// Internal type to access the raw SQLite db from TimesheetDB
interface DbAccess {
  db: {
    prepare(sql: string): {
      run(...args: unknown[]): unknown;
      get(...args: unknown[]): unknown;
      all(...args: unknown[]): unknown[];
    };
  };
}
