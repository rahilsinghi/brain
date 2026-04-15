import { randomUUID } from "node:crypto";
import type {
  EmployerRow,
  EntryStatus,
  InsertEntryInput,
  InsertProofArtifactInput,
  ProofArtifact,
  TimesheetEntry,
} from "./types.js";

// ── SQLite driver abstraction ──
// Bun runtime: use bun:sqlite (native, no npm dep)
// Node runtime (vitest): fall back to better-sqlite3

const isBun = typeof globalThis.Bun !== "undefined";

interface SqliteStatement {
  run(...args: unknown[]): unknown;
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
    // bun:sqlite uses db.exec() for pragmas
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

// ── Named param conversion ──
// bun:sqlite: SQL $foo binds to object key "$foo"
// better-sqlite3: SQL $foo binds to object key "foo" (strips prefix)
// We author SQL with $name and pass objects with $-prefixed keys.
// For better-sqlite3, we strip the $ prefix before binding.

function bindParams(params: Record<string, unknown>): Record<string, unknown> {
  if (isBun) return params;
  // better-sqlite3 expects keys without the $ prefix
  const stripped: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(params)) {
    stripped[k.startsWith("$") ? k.slice(1) : k] = v;
  }
  return stripped;
}

// Wrap a SqliteDatabase so named-param objects are auto-converted
function wrapDatabase(raw: SqliteDatabase): SqliteDatabase {
  if (isBun) return raw; // no conversion needed
  return {
    exec: (sql: string) => raw.exec(sql),
    prepare: (sql: string) => {
      const stmt = raw.prepare(sql);
      return {
        run: (...args: unknown[]) => {
          const a = args.length === 1 && typeof args[0] === "object" && args[0] !== null && !Array.isArray(args[0])
            ? [bindParams(args[0] as Record<string, unknown>)]
            : args;
          return stmt.run(...a);
        },
        get: (...args: unknown[]) => {
          const a = args.length === 1 && typeof args[0] === "object" && args[0] !== null && !Array.isArray(args[0])
            ? [bindParams(args[0] as Record<string, unknown>)]
            : args;
          return stmt.get(...a);
        },
        all: (...args: unknown[]) => {
          const a = args.length === 1 && typeof args[0] === "object" && args[0] !== null && !Array.isArray(args[0])
            ? [bindParams(args[0] as Record<string, unknown>)]
            : args;
          return stmt.all(...a);
        },
      };
    },
    close: () => raw.close(),
  };
}

const SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS employers (
    id TEXT PRIMARY KEY,
    rate_hourly REAL NOT NULL,
    weekly_cap_hours REAL,
    monthly_bonus REAL,
    currency TEXT NOT NULL DEFAULT 'USD'
  );

  CREATE TABLE IF NOT EXISTS repo_map (
    pattern TEXT PRIMARY KEY,
    employer_id TEXT NOT NULL REFERENCES employers(id),
    source TEXT NOT NULL DEFAULT 'config',
    added_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS entries (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    employer_id TEXT NOT NULL REFERENCES employers(id),
    hours REAL NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    timezone TEXT NOT NULL DEFAULT 'America/New_York',
    confidence TEXT NOT NULL DEFAULT 'medium',
    category TEXT NOT NULL DEFAULT 'coding',
    description TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'manual',
    status TEXT NOT NULL DEFAULT 'draft',
    session_id TEXT,
    invoice_id TEXT,
    created_at TEXT NOT NULL,
    reviewed_at TEXT,
    finalized_at TEXT
  );

  CREATE TABLE IF NOT EXISTS proof_artifacts (
    id TEXT PRIMARY KEY,
    entry_id TEXT NOT NULL REFERENCES entries(id),
    type TEXT NOT NULL,
    reference TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    url TEXT,
    metadata TEXT NOT NULL DEFAULT '{}'
  );

  CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    employer_id TEXT NOT NULL REFERENCES employers(id),
    period_start TEXT NOT NULL,
    period_end TEXT NOT NULL,
    total_hours REAL NOT NULL,
    total_amount REAL NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    generated_at TEXT NOT NULL,
    sent_at TEXT,
    paid_at TEXT,
    notes TEXT
  );

  CREATE TABLE IF NOT EXISTS alerts (
    id TEXT PRIMARY KEY,
    employer_id TEXT NOT NULL,
    week TEXT NOT NULL,
    type TEXT NOT NULL,
    message TEXT NOT NULL,
    sent_at TEXT NOT NULL,
    acknowledged INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS meta (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_entries_date ON entries(date);
  CREATE INDEX IF NOT EXISTS idx_entries_employer ON entries(employer_id);
  CREATE INDEX IF NOT EXISTS idx_entries_session ON entries(session_id);
  CREATE INDEX IF NOT EXISTS idx_entries_status ON entries(status);
  CREATE INDEX IF NOT EXISTS idx_artifacts_entry ON proof_artifacts(entry_id);
`;

export class TimesheetDB {
  private db: SqliteDatabase;

  constructor(dbPath: string) {
    this.db = wrapDatabase(openDatabase(dbPath));
    this.db.exec(SCHEMA_SQL);
  }

  listTables(): string[] {
    const rows = this.db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
      )
      .all() as Array<{ name: string }>;
    return rows.map((r) => r.name);
  }

  // ── Employers ──

  upsertEmployer(emp: EmployerRow): void {
    this.db
      .prepare(
        `INSERT INTO employers (id, rate_hourly, weekly_cap_hours, monthly_bonus, currency)
         VALUES ($id, $rate_hourly, $weekly_cap_hours, $monthly_bonus, $currency)
         ON CONFLICT(id) DO UPDATE SET
           rate_hourly = excluded.rate_hourly,
           weekly_cap_hours = excluded.weekly_cap_hours,
           monthly_bonus = excluded.monthly_bonus,
           currency = excluded.currency`
      )
      .run({
        $id: emp.id,
        $rate_hourly: emp.rate_hourly,
        $weekly_cap_hours: emp.weekly_cap_hours,
        $monthly_bonus: emp.monthly_bonus,
        $currency: emp.currency,
      });
  }

  getEmployer(id: string): EmployerRow | null {
    const row = this.db
      .prepare("SELECT * FROM employers WHERE id = ?")
      .get(id) as EmployerRow | undefined;
    return row ?? null;
  }

  // ── Entries ──

  insertEntry(input: InsertEntryInput): string {
    const id = randomUUID();
    const now = new Date().toISOString();
    this.db
      .prepare(
        `INSERT INTO entries (id, date, employer_id, hours, start_time, end_time,
           timezone, confidence, category, description, source, status,
           session_id, invoice_id, created_at, reviewed_at, finalized_at)
         VALUES ($id, $date, $employer_id, $hours, $start_time, $end_time,
           $timezone, $confidence, $category, $description, $source, 'draft',
           $session_id, NULL, $created_at, NULL, NULL)`
      )
      .run({
        $id: id,
        $date: input.date,
        $employer_id: input.employer_id,
        $hours: input.hours,
        $start_time: input.start_time,
        $end_time: input.end_time,
        $timezone: input.timezone ?? "America/New_York",
        $confidence: input.confidence ?? "medium",
        $category: input.category ?? "coding",
        $description: input.description,
        $source: input.source ?? "manual",
        $session_id: input.session_id ?? null,
        $created_at: now,
      });
    return id;
  }

  getEntry(id: string): TimesheetEntry | null {
    const row = this.db
      .prepare("SELECT * FROM entries WHERE id = ?")
      .get(id) as TimesheetEntry | undefined;
    return row ?? null;
  }

  findBySessionId(sessionId: string): TimesheetEntry | null {
    const row = this.db
      .prepare("SELECT * FROM entries WHERE session_id = ? LIMIT 1")
      .get(sessionId) as TimesheetEntry | undefined;
    return row ?? null;
  }

  getEntriesByDateRange(
    startDate: string,
    endDate: string,
    employerId?: string
  ): TimesheetEntry[] {
    if (employerId) {
      return this.db
        .prepare(
          `SELECT * FROM entries
           WHERE date >= ? AND date <= ? AND employer_id = ? AND status != 'ignored'
           ORDER BY date, start_time`
        )
        .all(startDate, endDate, employerId) as TimesheetEntry[];
    }
    return this.db
      .prepare(
        `SELECT * FROM entries
         WHERE date >= ? AND date <= ? AND status != 'ignored'
         ORDER BY date, start_time`
      )
      .all(startDate, endDate) as TimesheetEntry[];
  }

  getWeeklyHours(
    employerId: string,
    weekStart: string,
    weekEnd: string
  ): number {
    const row = this.db
      .prepare(
        `SELECT SUM(hours) as total FROM entries
         WHERE employer_id = ? AND date >= ? AND date <= ? AND status != 'ignored'`
      )
      .get(employerId, weekStart, weekEnd) as { total: number | null };
    return row?.total ?? 0;
  }

  updateEntryStatus(id: string, status: EntryStatus): void {
    const now = new Date().toISOString();

    if (status === "reviewed") {
      this.db
        .prepare(
          "UPDATE entries SET status = $status, reviewed_at = $now WHERE id = $id"
        )
        .run({ $status: status, $now: now, $id: id });
    } else if (status === "finalized") {
      this.db
        .prepare(
          "UPDATE entries SET status = $status, finalized_at = $now WHERE id = $id"
        )
        .run({ $status: status, $now: now, $id: id });
    } else {
      this.db
        .prepare("UPDATE entries SET status = $status WHERE id = $id")
        .run({ $status: status, $id: id });
    }
  }

  updateEntryHours(id: string, hours: number, endTime: string): void {
    this.db
      .prepare(
        "UPDATE entries SET hours = $hours, end_time = $end_time WHERE id = $id"
      )
      .run({ $hours: hours, $end_time: endTime, $id: id });
  }

  updateEntryDescription(id: string, description: string): void {
    this.db
      .prepare(
        "UPDATE entries SET description = $description WHERE id = $id"
      )
      .run({ $description: description, $id: id });
  }

  updateEntryCategory(id: string, category: string): void {
    this.db
      .prepare(
        "UPDATE entries SET category = $category WHERE id = $id"
      )
      .run({ $category: category, $id: id });
  }

  updateEntryInvoice(id: string, invoiceId: string): void {
    this.db
      .prepare(
        "UPDATE entries SET status = 'invoiced', invoice_id = $invoice_id WHERE id = $id"
      )
      .run({ $invoice_id: invoiceId, $id: id });
  }

  getEntriesByStatus(
    startDate: string,
    endDate: string,
    employerId: string,
    status: EntryStatus,
  ): TimesheetEntry[] {
    return this.db
      .prepare(
        `SELECT * FROM entries
         WHERE date >= ? AND date <= ? AND employer_id = ? AND status = ?
         ORDER BY date, start_time`
      )
      .all(startDate, endDate, employerId, status) as TimesheetEntry[];
  }

  // ── Invoices ──

  insertInvoice(invoice: {
    id: string;
    employer_id: string;
    period_start: string;
    period_end: string;
    total_hours: number;
    total_amount: number;
    currency: string;
    generated_at: string;
    notes?: string | null;
  }): void {
    this.db
      .prepare(
        `INSERT INTO invoices (id, employer_id, period_start, period_end, total_hours,
           total_amount, currency, generated_at, sent_at, paid_at, notes)
         VALUES ($id, $employer_id, $period_start, $period_end, $total_hours,
           $total_amount, $currency, $generated_at, NULL, NULL, $notes)`
      )
      .run({
        $id: invoice.id,
        $employer_id: invoice.employer_id,
        $period_start: invoice.period_start,
        $period_end: invoice.period_end,
        $total_hours: invoice.total_hours,
        $total_amount: invoice.total_amount,
        $currency: invoice.currency,
        $generated_at: invoice.generated_at,
        $notes: invoice.notes ?? null,
      });
  }

  getInvoice(id: string): {
    id: string;
    employer_id: string;
    period_start: string;
    period_end: string;
    total_hours: number;
    total_amount: number;
    currency: string;
    generated_at: string;
    sent_at: string | null;
    paid_at: string | null;
    notes: string | null;
  } | null {
    const row = this.db
      .prepare("SELECT * FROM invoices WHERE id = ?")
      .get(id) as Record<string, unknown> | undefined;
    return (row as ReturnType<TimesheetDB["getInvoice"]>) ?? null;
  }

  markInvoicePaid(id: string): void {
    this.db
      .prepare("UPDATE invoices SET paid_at = $paid_at WHERE id = $id")
      .run({ $paid_at: new Date().toISOString(), $id: id });
  }

  // ── Proof Artifacts ──

  insertProofArtifact(input: InsertProofArtifactInput): string {
    const id = randomUUID();
    this.db
      .prepare(
        `INSERT INTO proof_artifacts (id, entry_id, type, reference, timestamp, url, metadata)
         VALUES ($id, $entry_id, $type, $reference, $timestamp, $url, $metadata)`
      )
      .run({
        $id: id,
        $entry_id: input.entry_id,
        $type: input.type,
        $reference: input.reference,
        $timestamp: input.timestamp,
        $url: input.url ?? null,
        $metadata: input.metadata ?? "{}",
      });
    return id;
  }

  getProofArtifacts(entryId: string): ProofArtifact[] {
    return this.db
      .prepare(
        "SELECT * FROM proof_artifacts WHERE entry_id = ? ORDER BY timestamp"
      )
      .all(entryId) as ProofArtifact[];
  }

  // ── Repo Mappings ──

  upsertRepoMapping(
    pattern: string,
    employerId: string,
    source: string
  ): void {
    this.db
      .prepare(
        `INSERT INTO repo_map (pattern, employer_id, source, added_at)
         VALUES ($pattern, $employer_id, $source, $added_at)
         ON CONFLICT(pattern) DO UPDATE SET
           employer_id = excluded.employer_id,
           source = excluded.source,
           added_at = excluded.added_at`
      )
      .run({
        $pattern: pattern,
        $employer_id: employerId,
        $source: source,
        $added_at: new Date().toISOString(),
      });
  }

  getRepoMappings(): Array<{
    pattern: string;
    employer_id: string;
    source: string;
  }> {
    return this.db
      .prepare(
        "SELECT pattern, employer_id, source FROM repo_map ORDER BY pattern"
      )
      .all() as Array<{ pattern: string; employer_id: string; source: string }>;
  }

  // ── Meta ──

  setMeta(key: string, value: string): void {
    this.db
      .prepare(
        `INSERT INTO meta (key, value) VALUES ($key, $value)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value`
      )
      .run({ $key: key, $value: value });
  }

  getMeta(key: string): string | null {
    const row = this.db
      .prepare("SELECT value FROM meta WHERE key = ?")
      .get(key) as { value: string } | undefined;
    return row?.value ?? null;
  }

  // ── Alerts ──

  findAlert(employerId: string, week: string, type: string): boolean {
    const row = this.db
      .prepare(
        "SELECT id FROM alerts WHERE employer_id = ? AND week = ? AND type = ? LIMIT 1"
      )
      .get(employerId, week, type);
    return row != null;
  }

  insertAlert(
    id: string,
    employerId: string,
    week: string,
    type: string,
    message: string,
    sentAt: string,
  ): void {
    this.db
      .prepare(
        `INSERT INTO alerts (id, employer_id, week, type, message, sent_at)
         VALUES ($id, $employer_id, $week, $type, $message, $sent_at)`
      )
      .run({
        $id: id,
        $employer_id: employerId,
        $week: week,
        $type: type,
        $message: message,
        $sent_at: sentAt,
      });
  }

  // ── Lifecycle ──

  close(): void {
    this.db.close();
  }
}
