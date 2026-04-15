import { randomUUID } from "node:crypto";
import type {
  InboundQueueEntry,
  InboundStatus,
  InboundType,
  FileStatus,
  OutboundCategory,
  OutboundQueueEntry,
  ReportMessageMap,
} from "./types.js";

// ── SQLite driver abstraction ──
// Bun runtime (production on Fly.io): use bun:sqlite (native, no npm dep)
// Node runtime (vitest): fall back to better-sqlite3

const isBun = typeof globalThis.Bun !== "undefined";

interface SqliteStatement {
  run(...args: unknown[]): { changes: number };
  get(...args: unknown[]): unknown;
  all(...args: unknown[]): unknown[];
}

interface SqliteDatabase {
  exec(sql: string): void;
  prepare(sql: string): SqliteStatement;
  close(): void;
}

function openDatabase(dbPath: string): SqliteDatabase {
  if (isBun) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Database } = require("bun:sqlite");
    const db = new Database(dbPath);
    db.exec("PRAGMA journal_mode = WAL");
    db.exec("PRAGMA foreign_keys = ON");
    return db as SqliteDatabase;
  }

  // Node / vitest path
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const BetterSqlite3 = require("better-sqlite3");
  const db = new BetterSqlite3(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  return db as SqliteDatabase;
}

const SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS inbound_queue (
    id TEXT PRIMARY KEY,
    chat_id INTEGER NOT NULL,
    telegram_message_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    command TEXT,
    raw_text TEXT NOT NULL,
    file_path TEXT,
    file_status TEXT NOT NULL DEFAULT 'none',
    reply_to_queue_id TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    response TEXT,
    response_sent INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    processed_at TEXT,
    retry_count INTEGER NOT NULL DEFAULT 0,
    error TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_inbound_status ON inbound_queue(status);
  CREATE INDEX IF NOT EXISTS idx_inbound_response_sent ON inbound_queue(response_sent);
  CREATE INDEX IF NOT EXISTS idx_inbound_telegram_msg ON inbound_queue(telegram_message_id);

  CREATE TABLE IF NOT EXISTS outbound_queue (
    id TEXT PRIMARY KEY,
    chat_id INTEGER NOT NULL,
    message TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'general',
    deliver_at TEXT,
    sent_at TEXT,
    telegram_message_id INTEGER,
    retry_count INTEGER NOT NULL DEFAULT 0,
    failed INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    report_date TEXT,
    entry_ids TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_outbound_pending ON outbound_queue(sent_at, failed);
  CREATE INDEX IF NOT EXISTS idx_outbound_deliver ON outbound_queue(deliver_at);

  CREATE TABLE IF NOT EXISTS report_message_map (
    telegram_message_id INTEGER PRIMARY KEY,
    outbound_queue_id TEXT NOT NULL,
    date TEXT NOT NULL,
    entry_ids TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_report_map_date ON report_message_map(date);
`;

// ── Insert input types (omit auto-generated fields) ──

export interface InsertInboundInput {
  chat_id: number;
  telegram_message_id: number;
  type: InboundType;
  raw_text: string;
  command?: string | null;
  file_path?: string | null;
  file_status?: FileStatus;
  reply_to_queue_id?: string | null;
}

export interface InsertOutboundInput {
  chat_id: number;
  message: string;
  category: OutboundCategory;
  deliver_at?: string | null;
}

export class RelayDB {
  private db: SqliteDatabase;

  constructor(dbPath: string) {
    this.db = openDatabase(dbPath);
    this.db.exec(SCHEMA_SQL);
  }

  listTables(): string[] {
    const rows = this.db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name",
      )
      .all() as Array<{ name: string }>;
    return rows.map((r) => r.name);
  }

  // ── Inbound Queue ──

  insertInbound(input: InsertInboundInput): string {
    const id = randomUUID();
    const now = new Date().toISOString();
    this.db
      .prepare(
        `INSERT INTO inbound_queue
           (id, chat_id, telegram_message_id, type, command, raw_text,
            file_path, file_status, reply_to_queue_id, status,
            response, response_sent, created_at, processed_at, retry_count, error)
         VALUES
           (?, ?, ?, ?, ?, ?,
            ?, ?, ?, 'pending',
            NULL, 0, ?, NULL, 0, NULL)`,
      )
      .run(
        id,
        input.chat_id,
        input.telegram_message_id,
        input.type,
        input.command ?? null,
        input.raw_text,
        input.file_path ?? null,
        input.file_status ?? "none",
        input.reply_to_queue_id ?? null,
        now,
      );
    return id;
  }

  getInbound(id: string): InboundQueueEntry | null {
    const row = this.db
      .prepare("SELECT * FROM inbound_queue WHERE id = ?")
      .get(id) as InboundQueueEntry | undefined;
    return row ?? null;
  }

  getPendingInbound(): InboundQueueEntry[] {
    return this.db
      .prepare(
        "SELECT * FROM inbound_queue WHERE status = 'pending' ORDER BY created_at ASC",
      )
      .all() as InboundQueueEntry[];
  }

  setInboundResponse(
    id: string,
    response: string,
    status: InboundStatus,
  ): void {
    const now = new Date().toISOString();
    this.db
      .prepare(
        "UPDATE inbound_queue SET response = ?, status = ?, processed_at = ? WHERE id = ?",
      )
      .run(response, status, now, id);
  }

  setInboundFailed(id: string, error: string): void {
    this.db
      .prepare(
        `UPDATE inbound_queue
         SET status = 'failed', error = ?, retry_count = retry_count + 1
         WHERE id = ?`,
      )
      .run(error, id);
  }

  getUnsentResponses(): InboundQueueEntry[] {
    return this.db
      .prepare(
        "SELECT * FROM inbound_queue WHERE response IS NOT NULL AND response_sent = 0 ORDER BY created_at ASC",
      )
      .all() as InboundQueueEntry[];
  }

  markResponseSent(id: string, telegramMessageId: number): void {
    this.db
      .prepare(
        "UPDATE inbound_queue SET response_sent = 1, telegram_message_id = ? WHERE id = ?",
      )
      .run(telegramMessageId, id);
  }

  markInboundByTelegramId(
    telegramMessageId: number,
    status: InboundStatus,
  ): void {
    this.db
      .prepare(
        "UPDATE inbound_queue SET status = ? WHERE telegram_message_id = ?",
      )
      .run(status, telegramMessageId);
  }

  // ── Outbound Queue ──

  insertOutbound(input: InsertOutboundInput): string {
    const id = randomUUID();
    const now = new Date().toISOString();
    this.db
      .prepare(
        `INSERT INTO outbound_queue
           (id, chat_id, message, category, deliver_at,
            sent_at, telegram_message_id, retry_count, failed, created_at,
            report_date, entry_ids)
         VALUES
           (?, ?, ?, ?, ?,
            NULL, NULL, 0, 0, ?,
            NULL, NULL)`,
      )
      .run(id, input.chat_id, input.message, input.category, input.deliver_at ?? null, now);
    return id;
  }

  getOutbound(id: string): OutboundQueueEntry | null {
    const row = this.db
      .prepare("SELECT * FROM outbound_queue WHERE id = ?")
      .get(id) as OutboundQueueEntry | undefined;
    return row ?? null;
  }

  getDueOutbound(): OutboundQueueEntry[] {
    const now = new Date().toISOString();
    return this.db
      .prepare(
        `SELECT * FROM outbound_queue
         WHERE sent_at IS NULL AND failed = 0
           AND (deliver_at IS NULL OR deliver_at <= ?)
         ORDER BY created_at ASC`,
      )
      .all(now) as OutboundQueueEntry[];
  }

  markOutboundSent(id: string, telegramMessageId: number): void {
    const now = new Date().toISOString();
    this.db
      .prepare(
        "UPDATE outbound_queue SET sent_at = ?, telegram_message_id = ? WHERE id = ?",
      )
      .run(now, telegramMessageId, id);
  }

  incrementOutboundRetry(id: string): void {
    this.db
      .prepare(
        `UPDATE outbound_queue
         SET retry_count = retry_count + 1,
             failed = CASE WHEN retry_count + 1 >= 5 THEN 1 ELSE 0 END
         WHERE id = ?`,
      )
      .run(id);
  }

  replaceOutbound(id: string, newMessage: string): boolean {
    const result = this.db
      .prepare(
        "UPDATE outbound_queue SET message = ? WHERE id = ? AND sent_at IS NULL",
      )
      .run(newMessage, id);
    return result.changes > 0;
  }

  setOutboundReportMeta(
    id: string,
    reportDate: string,
    entryIds: string,
  ): void {
    this.db
      .prepare(
        "UPDATE outbound_queue SET report_date = ?, entry_ids = ? WHERE id = ?",
      )
      .run(reportDate, entryIds, id);
  }

  // ── Report Message Map ──

  insertReportMap(
    telegramMessageId: number,
    outboundQueueId: string,
    date: string,
    entryIds: string,
  ): void {
    this.db
      .prepare(
        `INSERT INTO report_message_map
           (telegram_message_id, outbound_queue_id, date, entry_ids)
         VALUES (?, ?, ?, ?)`,
      )
      .run(telegramMessageId, outboundQueueId, date, entryIds);
  }

  getReportMap(telegramMessageId: number): ReportMessageMap | null {
    const row = this.db
      .prepare(
        "SELECT * FROM report_message_map WHERE telegram_message_id = ?",
      )
      .get(telegramMessageId) as ReportMessageMap | undefined;
    return row ?? null;
  }

  // ── Lifecycle ──

  close(): void {
    this.db.close();
  }
}
