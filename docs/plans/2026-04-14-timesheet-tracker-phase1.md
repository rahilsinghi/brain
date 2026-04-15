# Timesheet Tracker Phase 1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Working timesheet tracker with SQLite storage, git session scanning, manual entry CLI, and status reports — tracking hours from Day 1 at Maison.

**Architecture:** SQLite via `bun:sqlite` as source of truth. Git log polling on 15-minute daemon cron scans local repos, clusters commits into sessions with immutable IDs, writes draft entries. Manual entries via API route + CLI. Status queries via API + CLI. Config loaded from `.brain/timesheet-config.yaml`.

**Tech Stack:** Bun, TypeScript strict, bun:sqlite, Fastify (existing daemon), node-cron (existing), Vitest

**Spec:** `docs/specs/2026-04-14-timesheet-tracker-design.md`

---

## File Structure

```
src/timesheet/
├── types.ts          ← TimesheetEntry, ProofArtifact, Employer, SessionCluster, etc.
├── db.ts             ← SQLite connection, schema creation, typed query helpers
├── config.ts         ← Load timesheet-config.yaml, return typed TimesheetConfig
├── scanner.ts        ← Git log polling, session clustering, dedup, upsert
├── status.ts         ← Query functions: today, week, month, summary

src/api/routes/
├── timesheet-log.ts      ← POST /timesheet/log
├── timesheet-status.ts   ← GET /timesheet/status (+ /today, /week)

src/cli/
└── timesheet.ts          ← brain timesheet log/status/backfill

.brain/
├── timesheet.db              ← SQLite database (created on first boot)
└── timesheet-config.yaml     ← Employer definitions + repo maps

tests/timesheet/
├── db.test.ts
├── config.test.ts
├── scanner.test.ts
├── status.test.ts

tests/api/routes/
├── timesheet-log.test.ts
├── timesheet-status.test.ts
```

---

### Task 1: Types + Config

**Files:**
- Create: `src/timesheet/types.ts`
- Create: `src/timesheet/config.ts`
- Create: `.brain/timesheet-config.yaml`
- Create: `tests/timesheet/config.test.ts`

- [ ] **Step 1: Write the failing test for config loading**

```typescript
// tests/timesheet/config.test.ts
import { describe, it, expect } from "vitest";
import { loadTimesheetConfig, type TimesheetConfig } from "../../src/timesheet/config.js";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

describe("loadTimesheetConfig", () => {
  const tmp = join(tmpdir(), "ts-config-test-" + Date.now());
  const brainDir = join(tmp, ".brain");

  beforeEach(() => {
    mkdirSync(brainDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(tmp, { recursive: true, force: true });
  });

  it("returns empty employers when no config file exists", () => {
    const config = loadTimesheetConfig(tmp);
    expect(config.employers).toEqual({});
    expect(config.scanner.poll_interval_minutes).toBe(15);
  });

  it("loads employers from yaml", () => {
    writeFileSync(
      join(brainDir, "timesheet-config.yaml"),
      `employers:
  maison:
    rate_hourly: 50
    weekly_cap: 20
    currency: USD
    repos:
      - "maison/*"
scanner:
  git_user: "Test User"
`,
    );
    const config = loadTimesheetConfig(tmp);
    expect(config.employers.maison.rate_hourly).toBe(50);
    expect(config.employers.maison.weekly_cap).toBe(20);
    expect(config.employers.maison.currency).toBe("USD");
    expect(config.employers.maison.repos).toEqual(["maison/*"]);
    expect(config.scanner.git_user).toBe("Test User");
  });

  it("applies defaults for missing scanner fields", () => {
    writeFileSync(
      join(brainDir, "timesheet-config.yaml"),
      `employers: {}
`,
    );
    const config = loadTimesheetConfig(tmp);
    expect(config.scanner.session_gap_minutes).toBe(30);
    expect(config.scanner.buffer_minutes).toBe(15);
    expect(config.scanner.exclude_paths).toContain("package-lock.json");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- tests/timesheet/config.test.ts`
Expected: FAIL — cannot resolve `../../src/timesheet/config.js`

- [ ] **Step 3: Create types file**

```typescript
// src/timesheet/types.ts

export interface EmployerConfig {
  rate_hourly: number;
  weekly_cap: number | null;
  monthly_bonus: number | null;
  currency: string;
  repos: string[];
  email_domains: string[];
  contacts: string[];
}

export interface ScannerConfig {
  poll_interval_minutes: number;
  session_gap_minutes: number;
  buffer_minutes: number;
  git_user: string;
  exclude_paths: string[];
}

export interface AlertsConfig {
  cap_thresholds: number[];
}

export interface ReviewConfig {
  report_hour: number;
  finalize_day: string;
  finalize_hour: number;
  gap_threshold_minutes: number;
  gap_auto_resolve_days: number;
}

export interface TimesheetConfig {
  employers: Record<string, EmployerConfig>;
  scanner: ScannerConfig;
  alerts: AlertsConfig;
  review: ReviewConfig;
}

export type EntryStatus = "draft" | "reviewed" | "finalized" | "invoiced" | "paid" | "ignored";
export type EntryConfidence = "high" | "medium" | "low";
export type EntryCategory =
  | "coding" | "refactoring" | "testing" | "docs"
  | "devops" | "design" | "research"
  | "meeting" | "communication";
export type EntrySource = "git_session" | "manual" | "voice_note" | "email" | "calendar";

export interface TimesheetEntry {
  id: string;
  date: string;
  employer_id: string;
  hours: number;
  start_time: string;
  end_time: string;
  timezone: string;
  confidence: EntryConfidence;
  category: EntryCategory;
  description: string;
  source: EntrySource;
  status: EntryStatus;
  session_id: string | null;
  invoice_id: string | null;
  created_at: string;
  reviewed_at: string | null;
  finalized_at: string | null;
}

export interface ProofArtifact {
  id: string;
  entry_id: string;
  type: "commit" | "voice_note" | "email" | "calendar_event";
  reference: string;
  timestamp: string;
  url: string | null;
  metadata: string;
}

export interface GitCommitInfo {
  sha: string;
  timestamp: string;
  message: string;
  files_changed: number;
  additions: number;
  deletions: number;
}

export interface SessionCluster {
  session_id: string;
  repo_path: string;
  employer_id: string;
  commits: GitCommitInfo[];
  start_time: string;
  end_time: string;
}
```

- [ ] **Step 4: Create config loader**

```typescript
// src/timesheet/config.ts
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";
import type { TimesheetConfig, ScannerConfig, EmployerConfig } from "./types.js";

const DEFAULT_SCANNER: ScannerConfig = {
  poll_interval_minutes: 15,
  session_gap_minutes: 30,
  buffer_minutes: 15,
  git_user: "",
  exclude_paths: [
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
    "bun.lockb",
    "*.min.js",
    "*.min.css",
    "dist/**",
    "build/**",
    "node_modules/**",
    ".lancedb/**",
    "*.generated.*",
    "*.pb.go",
    "*.pb.ts",
  ],
};

const DEFAULTS: TimesheetConfig = {
  employers: {},
  scanner: DEFAULT_SCANNER,
  alerts: { cap_thresholds: [0.75, 0.9, 1.0] },
  review: {
    report_hour: 9,
    finalize_day: "sunday",
    finalize_hour: 20,
    gap_threshold_minutes: 45,
    gap_auto_resolve_days: 3,
  },
};

export function loadTimesheetConfig(vaultRoot: string): TimesheetConfig {
  const configPath = join(vaultRoot, ".brain", "timesheet-config.yaml");
  if (!existsSync(configPath)) return DEFAULTS;

  const raw = readFileSync(configPath, "utf-8");
  const parsed = parseYaml(raw) as Record<string, unknown> | null;
  if (!parsed) return DEFAULTS;

  const employers: Record<string, EmployerConfig> = {};
  const rawEmployers = (parsed.employers ?? {}) as Record<string, Record<string, unknown>>;

  for (const [id, raw] of Object.entries(rawEmployers)) {
    employers[id] = {
      rate_hourly: (raw.rate_hourly as number) ?? 0,
      weekly_cap: (raw.weekly_cap as number) ?? null,
      monthly_bonus: (raw.monthly_bonus as number) ?? null,
      currency: (raw.currency as string) ?? "USD",
      repos: (raw.repos as string[]) ?? [],
      email_domains: (raw.email_domains as string[]) ?? [],
      contacts: (raw.contacts as string[]) ?? [],
    };
  }

  const rawScanner = (parsed.scanner ?? {}) as Record<string, unknown>;
  const scanner: ScannerConfig = {
    poll_interval_minutes: (rawScanner.poll_interval_minutes as number) ?? DEFAULT_SCANNER.poll_interval_minutes,
    session_gap_minutes: (rawScanner.session_gap_minutes as number) ?? DEFAULT_SCANNER.session_gap_minutes,
    buffer_minutes: (rawScanner.buffer_minutes as number) ?? DEFAULT_SCANNER.buffer_minutes,
    git_user: (rawScanner.git_user as string) ?? DEFAULT_SCANNER.git_user,
    exclude_paths: (rawScanner.exclude_paths as string[]) ?? DEFAULT_SCANNER.exclude_paths,
  };

  const rawAlerts = (parsed.alerts ?? {}) as Record<string, unknown>;
  const rawReview = (parsed.review ?? {}) as Record<string, unknown>;

  return {
    employers,
    scanner,
    alerts: {
      cap_thresholds: (rawAlerts.cap_thresholds as number[]) ?? DEFAULTS.alerts.cap_thresholds,
    },
    review: {
      report_hour: (rawReview.report_hour as number) ?? DEFAULTS.review.report_hour,
      finalize_day: (rawReview.finalize_day as string) ?? DEFAULTS.review.finalize_day,
      finalize_hour: (rawReview.finalize_hour as number) ?? DEFAULTS.review.finalize_hour,
      gap_threshold_minutes: (rawReview.gap_threshold_minutes as number) ?? DEFAULTS.review.gap_threshold_minutes,
      gap_auto_resolve_days: (rawReview.gap_auto_resolve_days as number) ?? DEFAULTS.review.gap_auto_resolve_days,
    },
  };
}

export type { TimesheetConfig };
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm test -- tests/timesheet/config.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 6: Create the production config file**

```yaml
# .brain/timesheet-config.yaml
employers:
  maison:
    rate_hourly: 50
    weekly_cap: 20
    currency: USD
    repos:
      - "maison/*"
    email_domains:
      - maison.cx
    contacts:
      - fredrik@maison.cx
      - sandeep@maison.cx
      - noel@maison.cx
  wilbo:
    rate_hourly: 0
    monthly_bonus: 1800
    currency: USD
    repos:
      - "wilbo-*"
      - "screenwriting-*"
    contacts:
      - brentonandersen@hotmail.com

scanner:
  poll_interval_minutes: 15
  session_gap_minutes: 30
  buffer_minutes: 15
  git_user: "Rahil Singhi"
  exclude_paths:
    - "package-lock.json"
    - "pnpm-lock.yaml"
    - "yarn.lock"
    - "bun.lockb"
    - "*.min.js"
    - "*.min.css"
    - "dist/**"
    - "build/**"
    - "node_modules/**"
    - ".lancedb/**"
    - "*.generated.*"

alerts:
  cap_thresholds: [0.75, 0.90, 1.0]

review:
  report_hour: 9
  finalize_day: sunday
  finalize_hour: 20
  gap_threshold_minutes: 45
  gap_auto_resolve_days: 3
```

- [ ] **Step 7: Commit**

```bash
git add src/timesheet/types.ts src/timesheet/config.ts .brain/timesheet-config.yaml tests/timesheet/config.test.ts
git commit -m "feat(timesheet): types, config loader, and employer definitions"
```

---

### Task 2: SQLite Database Layer

**Files:**
- Create: `src/timesheet/db.ts`
- Create: `tests/timesheet/db.test.ts`

- [ ] **Step 1: Write the failing test for db initialization and CRUD**

```typescript
// tests/timesheet/db.test.ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { TimesheetDB } from "../../src/timesheet/db.js";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import type { EntryCategory, EntrySource } from "../../src/timesheet/types.js";

describe("TimesheetDB", () => {
  const tmp = join(tmpdir(), "ts-db-test-" + Date.now());
  const brainDir = join(tmp, ".brain");
  let db: TimesheetDB;

  beforeEach(() => {
    mkdirSync(brainDir, { recursive: true });
    db = new TimesheetDB(join(brainDir, "timesheet.db"));
  });

  afterEach(() => {
    db.close();
    rmSync(tmp, { recursive: true, force: true });
  });

  it("creates tables on construction", () => {
    // Query sqlite_master to verify tables exist
    const tables = db.listTables();
    expect(tables).toContain("employers");
    expect(tables).toContain("entries");
    expect(tables).toContain("proof_artifacts");
    expect(tables).toContain("invoices");
    expect(tables).toContain("alerts");
    expect(tables).toContain("repo_map");
  });

  it("upserts and retrieves an employer", () => {
    db.upsertEmployer({
      id: "maison",
      rate_hourly: 50,
      weekly_cap_hours: 20,
      monthly_bonus: null,
      currency: "USD",
    });
    const emp = db.getEmployer("maison");
    expect(emp).not.toBeNull();
    expect(emp!.rate_hourly).toBe(50);
    expect(emp!.weekly_cap_hours).toBe(20);
  });

  it("inserts and retrieves an entry", () => {
    db.upsertEmployer({ id: "maison", rate_hourly: 50, weekly_cap_hours: 20, monthly_bonus: null, currency: "USD" });

    const entryId = db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 2.5,
      start_time: "2026-04-15T09:00:00-04:00",
      end_time: "2026-04-15T11:30:00-04:00",
      timezone: "America/New_York",
      confidence: "high",
      category: "coding" as EntryCategory,
      description: "Auth middleware",
      source: "git_session" as EntrySource,
      session_id: "maison-travel_abc1234",
    });

    const entry = db.getEntry(entryId);
    expect(entry).not.toBeNull();
    expect(entry!.employer_id).toBe("maison");
    expect(entry!.hours).toBe(2.5);
    expect(entry!.status).toBe("draft");
  });

  it("finds entry by session_id", () => {
    db.upsertEmployer({ id: "maison", rate_hourly: 50, weekly_cap_hours: 20, monthly_bonus: null, currency: "USD" });
    db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 2,
      start_time: "2026-04-15T09:00:00-04:00",
      end_time: "2026-04-15T11:00:00-04:00",
      timezone: "America/New_York",
      confidence: "medium",
      category: "coding" as EntryCategory,
      description: "Test",
      source: "git_session" as EntrySource,
      session_id: "repo_abc1234",
    });

    const entry = db.findBySessionId("repo_abc1234");
    expect(entry).not.toBeNull();
    expect(entry!.session_id).toBe("repo_abc1234");
  });

  it("queries entries by date range", () => {
    db.upsertEmployer({ id: "maison", rate_hourly: 50, weekly_cap_hours: 20, monthly_bonus: null, currency: "USD" });
    db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 3,
      start_time: "2026-04-15T09:00:00-04:00",
      end_time: "2026-04-15T12:00:00-04:00",
      timezone: "America/New_York",
      confidence: "high",
      category: "coding" as EntryCategory,
      description: "Day 1",
      source: "manual" as EntrySource,
      session_id: null,
    });
    db.insertEntry({
      date: "2026-04-16",
      employer_id: "maison",
      hours: 4,
      start_time: "2026-04-16T09:00:00-04:00",
      end_time: "2026-04-16T13:00:00-04:00",
      timezone: "America/New_York",
      confidence: "high",
      category: "coding" as EntryCategory,
      description: "Day 2",
      source: "manual" as EntrySource,
      session_id: null,
    });

    const entries = db.getEntriesByDateRange("2026-04-15", "2026-04-15");
    expect(entries).toHaveLength(1);
    expect(entries[0].description).toBe("Day 1");

    const allEntries = db.getEntriesByDateRange("2026-04-15", "2026-04-16");
    expect(allEntries).toHaveLength(2);
  });

  it("calculates weekly hours per employer", () => {
    db.upsertEmployer({ id: "maison", rate_hourly: 50, weekly_cap_hours: 20, monthly_bonus: null, currency: "USD" });
    db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 3,
      start_time: "2026-04-15T09:00:00-04:00",
      end_time: "2026-04-15T12:00:00-04:00",
      timezone: "America/New_York",
      confidence: "high",
      category: "coding" as EntryCategory,
      description: "Work",
      source: "manual" as EntrySource,
      session_id: null,
    });
    db.insertEntry({
      date: "2026-04-16",
      employer_id: "maison",
      hours: 4,
      start_time: "2026-04-16T09:00:00-04:00",
      end_time: "2026-04-16T13:00:00-04:00",
      timezone: "America/New_York",
      confidence: "high",
      category: "coding" as EntryCategory,
      description: "Work 2",
      source: "manual" as EntrySource,
      session_id: null,
    });

    const total = db.getWeeklyHours("maison", "2026-04-14", "2026-04-18");
    expect(total).toBe(7);
  });

  it("updates entry status", () => {
    db.upsertEmployer({ id: "maison", rate_hourly: 50, weekly_cap_hours: 20, monthly_bonus: null, currency: "USD" });
    const id = db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 2,
      start_time: "2026-04-15T09:00:00-04:00",
      end_time: "2026-04-15T11:00:00-04:00",
      timezone: "America/New_York",
      confidence: "high",
      category: "coding" as EntryCategory,
      description: "Test",
      source: "manual" as EntrySource,
      session_id: null,
    });

    db.updateEntryStatus(id, "reviewed");
    const entry = db.getEntry(id);
    expect(entry!.status).toBe("reviewed");
    expect(entry!.reviewed_at).not.toBeNull();
  });

  it("inserts and retrieves proof artifacts", () => {
    db.upsertEmployer({ id: "maison", rate_hourly: 50, weekly_cap_hours: 20, monthly_bonus: null, currency: "USD" });
    const entryId = db.insertEntry({
      date: "2026-04-15",
      employer_id: "maison",
      hours: 2,
      start_time: "2026-04-15T09:00:00-04:00",
      end_time: "2026-04-15T11:00:00-04:00",
      timezone: "America/New_York",
      confidence: "high",
      category: "coding" as EntryCategory,
      description: "Test",
      source: "git_session" as EntrySource,
      session_id: "repo_abc",
    });

    db.insertProofArtifact({
      entry_id: entryId,
      type: "commit",
      reference: "abc1234",
      timestamp: "2026-04-15T09:30:00-04:00",
      url: "https://github.com/maison/app/commit/abc1234",
      metadata: JSON.stringify({ additions: 50, deletions: 10 }),
    });

    const artifacts = db.getProofArtifacts(entryId);
    expect(artifacts).toHaveLength(1);
    expect(artifacts[0].reference).toBe("abc1234");
  });

  it("stores and retrieves metadata for missed cron recovery", () => {
    db.setMeta("last_scan_time", "2026-04-15T09:00:00-04:00");
    expect(db.getMeta("last_scan_time")).toBe("2026-04-15T09:00:00-04:00");

    db.setMeta("last_report_date", "2026-04-15");
    expect(db.getMeta("last_report_date")).toBe("2026-04-15");
    expect(db.getMeta("nonexistent")).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- tests/timesheet/db.test.ts`
Expected: FAIL — cannot resolve `../../src/timesheet/db.js`

- [ ] **Step 3: Implement the database layer**

```typescript
// src/timesheet/db.ts
import { Database } from "bun:sqlite";
import { randomUUID } from "node:crypto";
import type {
  TimesheetEntry,
  ProofArtifact,
  EntryStatus,
  EntryCategory,
  EntrySource,
  EntryConfidence,
} from "./types.js";

interface EmployerRow {
  id: string;
  rate_hourly: number;
  weekly_cap_hours: number | null;
  monthly_bonus: number | null;
  currency: string;
}

interface InsertEntryInput {
  date: string;
  employer_id: string;
  hours: number;
  start_time: string;
  end_time: string;
  timezone: string;
  confidence: EntryConfidence;
  category: EntryCategory;
  description: string;
  source: EntrySource;
  session_id: string | null;
}

interface InsertProofArtifactInput {
  entry_id: string;
  type: "commit" | "voice_note" | "email" | "calendar_event";
  reference: string;
  timestamp: string;
  url: string | null;
  metadata: string;
}

export class TimesheetDB {
  private db: Database;

  constructor(dbPath: string) {
    this.db = new Database(dbPath, { create: true });
    this.db.exec("PRAGMA journal_mode = WAL");
    this.db.exec("PRAGMA foreign_keys = ON");
    this.migrate();
  }

  private migrate(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS employers (
        id TEXT PRIMARY KEY,
        rate_hourly REAL NOT NULL DEFAULT 0,
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
        description TEXT NOT NULL DEFAULT '',
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
    `);
  }

  listTables(): string[] {
    const rows = this.db.query("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all() as { name: string }[];
    return rows.map((r) => r.name);
  }

  // --- Employers ---

  upsertEmployer(emp: EmployerRow): void {
    this.db.query(`
      INSERT INTO employers (id, rate_hourly, weekly_cap_hours, monthly_bonus, currency)
      VALUES (?1, ?2, ?3, ?4, ?5)
      ON CONFLICT(id) DO UPDATE SET
        rate_hourly = ?2, weekly_cap_hours = ?3, monthly_bonus = ?4, currency = ?5
    `).run(emp.id, emp.rate_hourly, emp.weekly_cap_hours, emp.monthly_bonus, emp.currency);
  }

  getEmployer(id: string): EmployerRow | null {
    return this.db.query("SELECT * FROM employers WHERE id = ?").get(id) as EmployerRow | null;
  }

  // --- Entries ---

  insertEntry(input: InsertEntryInput): string {
    const id = randomUUID();
    const now = new Date().toISOString();
    this.db.query(`
      INSERT INTO entries (id, date, employer_id, hours, start_time, end_time, timezone,
        confidence, category, description, source, status, session_id, created_at)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, 'draft', ?12, ?13)
    `).run(
      id, input.date, input.employer_id, input.hours,
      input.start_time, input.end_time, input.timezone,
      input.confidence, input.category, input.description,
      input.source, input.session_id, now,
    );
    return id;
  }

  getEntry(id: string): TimesheetEntry | null {
    return this.db.query("SELECT * FROM entries WHERE id = ?").get(id) as TimesheetEntry | null;
  }

  findBySessionId(sessionId: string): TimesheetEntry | null {
    return this.db.query("SELECT * FROM entries WHERE session_id = ?").get(sessionId) as TimesheetEntry | null;
  }

  getEntriesByDateRange(startDate: string, endDate: string, employerId?: string): TimesheetEntry[] {
    if (employerId) {
      return this.db.query(
        "SELECT * FROM entries WHERE date >= ? AND date <= ? AND employer_id = ? AND status != 'ignored' ORDER BY start_time"
      ).all(startDate, endDate, employerId) as TimesheetEntry[];
    }
    return this.db.query(
      "SELECT * FROM entries WHERE date >= ? AND date <= ? AND status != 'ignored' ORDER BY start_time"
    ).all(startDate, endDate) as TimesheetEntry[];
  }

  getWeeklyHours(employerId: string, weekStart: string, weekEnd: string): number {
    const row = this.db.query(
      "SELECT COALESCE(SUM(hours), 0) as total FROM entries WHERE employer_id = ? AND date >= ? AND date <= ? AND status != 'ignored'"
    ).get(employerId, weekStart, weekEnd) as { total: number };
    return row.total;
  }

  updateEntryStatus(id: string, status: EntryStatus): void {
    const now = new Date().toISOString();
    const timestampCol = status === "reviewed" ? "reviewed_at" : status === "finalized" ? "finalized_at" : null;
    if (timestampCol) {
      this.db.query(`UPDATE entries SET status = ?, ${timestampCol} = ? WHERE id = ?`).run(status, now, id);
    } else {
      this.db.query("UPDATE entries SET status = ? WHERE id = ?").run(status, id);
    }
  }

  updateEntryHours(id: string, hours: number, endTime: string): void {
    this.db.query("UPDATE entries SET hours = ?, end_time = ? WHERE id = ?").run(hours, endTime, id);
  }

  updateEntryDescription(id: string, description: string): void {
    this.db.query("UPDATE entries SET description = ? WHERE id = ?").run(description, id);
  }

  // --- Proof Artifacts ---

  insertProofArtifact(input: InsertProofArtifactInput): string {
    const id = randomUUID();
    this.db.query(`
      INSERT INTO proof_artifacts (id, entry_id, type, reference, timestamp, url, metadata)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
    `).run(id, input.entry_id, input.type, input.reference, input.timestamp, input.url, input.metadata);
    return id;
  }

  getProofArtifacts(entryId: string): ProofArtifact[] {
    return this.db.query("SELECT * FROM proof_artifacts WHERE entry_id = ?").all(entryId) as ProofArtifact[];
  }

  // --- Repo Map ---

  upsertRepoMapping(pattern: string, employerId: string, source: string): void {
    const now = new Date().toISOString();
    this.db.query(`
      INSERT INTO repo_map (pattern, employer_id, source, added_at)
      VALUES (?1, ?2, ?3, ?4)
      ON CONFLICT(pattern) DO UPDATE SET employer_id = ?2, source = ?3
    `).run(pattern, employerId, source, now);
  }

  getRepoMappings(): Array<{ pattern: string; employer_id: string; source: string }> {
    return this.db.query("SELECT pattern, employer_id, source FROM repo_map").all() as Array<{ pattern: string; employer_id: string; source: string }>;
  }

  // --- Meta (for cron recovery) ---

  setMeta(key: string, value: string): void {
    this.db.query("INSERT INTO meta (key, value) VALUES (?1, ?2) ON CONFLICT(key) DO UPDATE SET value = ?2").run(key, value);
  }

  getMeta(key: string): string | null {
    const row = this.db.query("SELECT value FROM meta WHERE key = ?").get(key) as { value: string } | null;
    return row?.value ?? null;
  }

  close(): void {
    this.db.close();
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- tests/timesheet/db.test.ts`
Expected: PASS (8 tests)

- [ ] **Step 5: Commit**

```bash
git add src/timesheet/db.ts tests/timesheet/db.test.ts
git commit -m "feat(timesheet): SQLite database layer with bun:sqlite"
```

---

### Task 3: Git Session Scanner

**Files:**
- Create: `src/timesheet/scanner.ts`
- Create: `tests/timesheet/scanner.test.ts`

- [ ] **Step 1: Write the failing test for session clustering**

```typescript
// tests/timesheet/scanner.test.ts
import { describe, it, expect } from "vitest";
import {
  clusterCommitsIntoSessions,
  parseGitNumstat,
  filterExcludedPaths,
  resolveEmployer,
} from "../../src/timesheet/scanner.js";
import type { GitCommitInfo, SessionCluster } from "../../src/timesheet/types.js";

describe("clusterCommitsIntoSessions", () => {
  it("groups commits within 30-min gap into one session", () => {
    const commits: GitCommitInfo[] = [
      { sha: "aaa1111", timestamp: "2026-04-15T09:00:00-04:00", message: "feat: add auth", files_changed: 3, additions: 50, deletions: 10 },
      { sha: "bbb2222", timestamp: "2026-04-15T09:20:00-04:00", message: "fix: auth bug", files_changed: 1, additions: 5, deletions: 2 },
      { sha: "ccc3333", timestamp: "2026-04-15T09:45:00-04:00", message: "test: auth tests", files_changed: 2, additions: 80, deletions: 0 },
    ];

    const sessions = clusterCommitsIntoSessions(commits, "/path/to/repo", "maison", 30);
    expect(sessions).toHaveLength(1);
    expect(sessions[0].session_id).toBe("repo_aaa1111");
    expect(sessions[0].commits).toHaveLength(3);
  });

  it("splits commits with >30 min gap into separate sessions", () => {
    const commits: GitCommitInfo[] = [
      { sha: "aaa1111", timestamp: "2026-04-15T09:00:00-04:00", message: "morning work", files_changed: 3, additions: 50, deletions: 10 },
      { sha: "bbb2222", timestamp: "2026-04-15T09:15:00-04:00", message: "more morning", files_changed: 1, additions: 5, deletions: 2 },
      { sha: "ccc3333", timestamp: "2026-04-15T14:00:00-04:00", message: "afternoon work", files_changed: 2, additions: 80, deletions: 0 },
    ];

    const sessions = clusterCommitsIntoSessions(commits, "/path/to/repo", "maison", 30);
    expect(sessions).toHaveLength(2);
    expect(sessions[0].session_id).toBe("repo_aaa1111");
    expect(sessions[0].commits).toHaveLength(2);
    expect(sessions[1].session_id).toBe("repo_ccc3333");
    expect(sessions[1].commits).toHaveLength(1);
  });

  it("uses repo basename for session_id prefix", () => {
    const commits: GitCommitInfo[] = [
      { sha: "abc1234", timestamp: "2026-04-15T09:00:00-04:00", message: "work", files_changed: 1, additions: 10, deletions: 0 },
    ];
    const sessions = clusterCommitsIntoSessions(commits, "/Users/rahil/Desktop/maison-travel", "maison", 30);
    expect(sessions[0].session_id).toBe("maison-travel_abc1234");
  });
});

describe("parseGitNumstat", () => {
  it("parses numstat output into additions/deletions per file", () => {
    const numstat = "10\t5\tsrc/auth.ts\n20\t3\tsrc/api/routes.ts\n";
    const result = parseGitNumstat(numstat);
    expect(result).toEqual([
      { file: "src/auth.ts", additions: 10, deletions: 5 },
      { file: "src/api/routes.ts", additions: 20, deletions: 3 },
    ]);
  });

  it("handles binary files (- - notation)", () => {
    const numstat = "10\t5\tsrc/auth.ts\n-\t-\timage.png\n";
    const result = parseGitNumstat(numstat);
    expect(result).toEqual([
      { file: "src/auth.ts", additions: 10, deletions: 5 },
      { file: "image.png", additions: 0, deletions: 0 },
    ]);
  });
});

describe("filterExcludedPaths", () => {
  it("excludes lockfiles and build dirs", () => {
    const files = [
      { file: "src/auth.ts", additions: 50, deletions: 10 },
      { file: "package-lock.json", additions: 15000, deletions: 14000 },
      { file: "dist/bundle.js", additions: 5000, deletions: 0 },
      { file: "src/api/routes.ts", additions: 20, deletions: 3 },
    ];
    const excludes = ["package-lock.json", "dist/**"];
    const result = filterExcludedPaths(files, excludes);
    expect(result).toHaveLength(2);
    expect(result[0].file).toBe("src/auth.ts");
    expect(result[1].file).toBe("src/api/routes.ts");
  });
});

describe("resolveEmployer", () => {
  it("matches repo path against patterns", () => {
    const mappings = [
      { pattern: "maison/*", employer_id: "maison", source: "config" },
      { pattern: "wilbo-*", employer_id: "wilbo", source: "config" },
    ];

    expect(resolveEmployer("/Users/rahil/Desktop/maison-travel", "https://github.com/maison/travel.git", mappings)).toBe("maison");
    expect(resolveEmployer("/Users/rahil/Desktop/wilbo-app", null, mappings)).toBe("wilbo");
    expect(resolveEmployer("/Users/rahil/Desktop/personal-notes", null, mappings)).toBeNull();
  });

  it("matches exact local paths", () => {
    const mappings = [
      { pattern: "/Users/rahil/Desktop/maison-travel", employer_id: "maison", source: "user_assigned" },
    ];
    expect(resolveEmployer("/Users/rahil/Desktop/maison-travel", null, mappings)).toBe("maison");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- tests/timesheet/scanner.test.ts`
Expected: FAIL — cannot resolve `../../src/timesheet/scanner.js`

- [ ] **Step 3: Implement the scanner**

```typescript
// src/timesheet/scanner.ts
import { execSync } from "node:child_process";
import { basename } from "node:path";
import { minimatch } from "minimatch";
import type { GitCommitInfo, SessionCluster } from "./types.js";
import type { TimesheetDB } from "./db.js";
import type { TimesheetConfig } from "./config.js";

export interface NumstatEntry {
  file: string;
  additions: number;
  deletions: number;
}

export function parseGitNumstat(raw: string): NumstatEntry[] {
  return raw
    .trim()
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => {
      const parts = line.split("\t");
      if (parts.length < 3) return null;
      const additions = parts[0] === "-" ? 0 : parseInt(parts[0], 10);
      const deletions = parts[1] === "-" ? 0 : parseInt(parts[1], 10);
      return { file: parts.slice(2).join("\t"), additions, deletions };
    })
    .filter((e): e is NumstatEntry => e !== null);
}

export function filterExcludedPaths(
  files: NumstatEntry[],
  excludePatterns: string[],
): NumstatEntry[] {
  return files.filter((f) =>
    !excludePatterns.some((pattern) => minimatch(f.file, pattern, { matchBase: true })),
  );
}

export function clusterCommitsIntoSessions(
  commits: GitCommitInfo[],
  repoPath: string,
  employerId: string,
  gapMinutes: number,
): SessionCluster[] {
  if (commits.length === 0) return [];

  const sorted = [...commits].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );

  const repoSlug = basename(repoPath);
  const sessions: SessionCluster[] = [];
  let current: GitCommitInfo[] = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const prevTime = new Date(current[current.length - 1].timestamp).getTime();
    const currTime = new Date(sorted[i].timestamp).getTime();
    const gapMs = currTime - prevTime;

    if (gapMs > gapMinutes * 60 * 1000) {
      sessions.push(buildCluster(current, repoPath, repoSlug, employerId));
      current = [sorted[i]];
    } else {
      current.push(sorted[i]);
    }
  }

  sessions.push(buildCluster(current, repoPath, repoSlug, employerId));
  return sessions;
}

function buildCluster(
  commits: GitCommitInfo[],
  repoPath: string,
  repoSlug: string,
  employerId: string,
): SessionCluster {
  const firstSha = commits[0].sha.slice(0, 7);
  return {
    session_id: `${repoSlug}_${firstSha}`,
    repo_path: repoPath,
    employer_id: employerId,
    commits,
    start_time: commits[0].timestamp,
    end_time: commits[commits.length - 1].timestamp,
  };
}

export function resolveEmployer(
  repoPath: string,
  remoteUrl: string | null,
  mappings: Array<{ pattern: string; employer_id: string; source: string }>,
): string | null {
  const repoName = basename(repoPath);

  for (const mapping of mappings) {
    // Exact local path match
    if (mapping.pattern === repoPath) return mapping.employer_id;

    // Glob on remote URL (e.g. "maison/*" matches github.com/maison/anything)
    if (remoteUrl) {
      const urlPath = remoteUrl.replace(/\.git$/, "").split("/").slice(-2).join("/");
      if (minimatch(urlPath, mapping.pattern)) return mapping.employer_id;
    }

    // Glob on directory name (e.g. "wilbo-*")
    if (minimatch(repoName, mapping.pattern, { matchBase: true })) return mapping.employer_id;
  }

  return null;
}

export interface ScanRepoDeps {
  execGitLog: (repoPath: string, since: string, author: string) => string;
  execGitRemote: (repoPath: string) => string | null;
}

function defaultExecGitLog(repoPath: string, since: string, author: string): string {
  try {
    return execSync(
      `git -C "${repoPath}" log --since="${since}" --author="${author}" --format="%H|%aI|%s" --numstat`,
      { encoding: "utf-8", timeout: 10_000 },
    );
  } catch {
    return "";
  }
}

function defaultExecGitRemote(repoPath: string): string | null {
  try {
    return execSync(`git -C "${repoPath}" remote get-url origin`, { encoding: "utf-8", timeout: 5_000 }).trim();
  } catch {
    return null;
  }
}

interface ParsedCommitWithStats {
  info: GitCommitInfo;
  rawFiles: NumstatEntry[];
}

function parseGitLogOutput(raw: string): ParsedCommitWithStats[] {
  if (!raw.trim()) return [];

  const results: ParsedCommitWithStats[] = [];
  const lines = raw.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line || !line.includes("|")) { i++; continue; }

    const parts = line.split("|");
    if (parts.length < 3) { i++; continue; }

    const sha = parts[0];
    const timestamp = parts[1];
    const message = parts.slice(2).join("|");

    i++;
    // Collect numstat lines until next commit or end
    let numstatBlock = "";
    while (i < lines.length && !lines[i].includes("|")) {
      if (lines[i].trim()) numstatBlock += lines[i] + "\n";
      i++;
    }

    const rawFiles = numstatBlock ? parseGitNumstat(numstatBlock) : [];
    const totalAdd = rawFiles.reduce((s, f) => s + f.additions, 0);
    const totalDel = rawFiles.reduce((s, f) => s + f.deletions, 0);

    results.push({
      info: {
        sha: sha.slice(0, 7),
        timestamp,
        message,
        files_changed: rawFiles.length,
        additions: totalAdd,
        deletions: totalDel,
      },
      rawFiles,
    });
  }

  return results;
}

export function scanRepo(
  repoPath: string,
  since: string,
  config: TimesheetConfig,
  mappings: Array<{ pattern: string; employer_id: string; source: string }>,
  deps?: Partial<ScanRepoDeps>,
): { sessions: SessionCluster[]; filteredStats: Map<string, { additions: number; deletions: number; files: number }>; unknownRepo: boolean } {
  const execGitLog = deps?.execGitLog ?? defaultExecGitLog;
  const execGitRemote = deps?.execGitRemote ?? defaultExecGitRemote;

  const remoteUrl = execGitRemote(repoPath);
  const employerId = resolveEmployer(repoPath, remoteUrl, mappings);

  if (!employerId) {
    return { sessions: [], filteredStats: new Map(), unknownRepo: true };
  }

  const raw = execGitLog(repoPath, since, config.scanner.git_user);
  const parsed = parseGitLogOutput(raw);

  if (parsed.length === 0) {
    return { sessions: [], filteredStats: new Map(), unknownRepo: false };
  }

  // Filter excluded paths and compute filtered stats per commit
  const filteredStats = new Map<string, { additions: number; deletions: number; files: number }>();
  const commitInfos: GitCommitInfo[] = [];

  for (const entry of parsed) {
    const filtered = filterExcludedPaths(entry.rawFiles, config.scanner.exclude_paths);
    const additions = filtered.reduce((s, f) => s + f.additions, 0);
    const deletions = filtered.reduce((s, f) => s + f.deletions, 0);
    filteredStats.set(entry.info.sha, { additions, deletions, files: filtered.length });

    commitInfos.push({
      ...entry.info,
      additions,
      deletions,
      files_changed: filtered.length,
    });
  }

  const sessions = clusterCommitsIntoSessions(
    commitInfos,
    repoPath,
    employerId,
    config.scanner.session_gap_minutes,
  );

  return { sessions, filteredStats, unknownRepo: false };
}

export function upsertSession(
  db: TimesheetDB,
  session: SessionCluster,
  bufferMinutes: number,
): void {
  const existing = db.findBySessionId(session.session_id);

  const startMs = new Date(session.start_time).getTime() - bufferMinutes * 60 * 1000;
  const endMs = new Date(session.end_time).getTime() + bufferMinutes * 60 * 1000;
  const hours = Math.round(((endMs - startMs) / (1000 * 60 * 60)) * 4) / 4; // round to 0.25

  const startTime = new Date(startMs).toISOString();
  const endTime = new Date(endMs).toISOString();
  const date = session.start_time.split("T")[0];

  const description = session.commits.map((c) => c.message.split("\n")[0]).join("; ");
  const totalAdd = session.commits.reduce((s, c) => s + c.additions, 0);
  const totalDel = session.commits.reduce((s, c) => s + c.deletions, 0);

  if (existing) {
    // Update existing session with new end time and hours
    db.updateEntryHours(existing.id, hours, endTime);
    db.updateEntryDescription(existing.id, description);

    // Add new proof artifacts for commits not yet recorded
    const existingArtifacts = db.getProofArtifacts(existing.id);
    const existingRefs = new Set(existingArtifacts.map((a) => a.reference));

    for (const commit of session.commits) {
      if (!existingRefs.has(commit.sha)) {
        db.insertProofArtifact({
          entry_id: existing.id,
          type: "commit",
          reference: commit.sha,
          timestamp: commit.timestamp,
          url: null,
          metadata: JSON.stringify({ additions: commit.additions, deletions: commit.deletions, files: commit.files_changed }),
        });
      }
    }
  } else {
    // Insert new entry
    const entryId = db.insertEntry({
      date,
      employer_id: session.employer_id,
      hours,
      start_time: startTime,
      end_time: endTime,
      timezone: "America/New_York",
      confidence: session.commits.length >= 3 ? "medium" : "low",
      category: "coding",
      description,
      source: "git_session",
      session_id: session.session_id,
    });

    for (const commit of session.commits) {
      db.insertProofArtifact({
        entry_id: entryId,
        type: "commit",
        reference: commit.sha,
        timestamp: commit.timestamp,
        url: null,
        metadata: JSON.stringify({ additions: commit.additions, deletions: commit.deletions, files: commit.files_changed }),
      });
    }
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- tests/timesheet/scanner.test.ts`
Expected: PASS (7 tests)

Note: `minimatch` is already a transitive dependency via chokidar. If not available at runtime, install: `pnpm add minimatch` and `pnpm add -D @types/minimatch`.

- [ ] **Step 5: Commit**

```bash
git add src/timesheet/scanner.ts tests/timesheet/scanner.test.ts
git commit -m "feat(timesheet): git session scanner with clustering and dedup"
```

---

### Task 4: Status Queries

**Files:**
- Create: `src/timesheet/status.ts`
- Create: `tests/timesheet/status.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/timesheet/status.test.ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { TimesheetDB } from "../../src/timesheet/db.js";
import { getStatusSummary, getTodayBreakdown, getWeekMatrix } from "../../src/timesheet/status.js";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import type { EntryCategory, EntrySource } from "../../src/timesheet/types.js";

describe("status queries", () => {
  const tmp = join(tmpdir(), "ts-status-test-" + Date.now());
  const brainDir = join(tmp, ".brain");
  let db: TimesheetDB;

  beforeEach(() => {
    mkdirSync(brainDir, { recursive: true });
    db = new TimesheetDB(join(brainDir, "timesheet.db"));
    db.upsertEmployer({ id: "maison", rate_hourly: 50, weekly_cap_hours: 20, monthly_bonus: null, currency: "USD" });
    db.upsertEmployer({ id: "wilbo", rate_hourly: 0, weekly_cap_hours: null, monthly_bonus: 1800, currency: "USD" });
  });

  afterEach(() => {
    db.close();
    rmSync(tmp, { recursive: true, force: true });
  });

  it("getStatusSummary returns per-employer totals for a week", () => {
    db.insertEntry({
      date: "2026-04-15", employer_id: "maison", hours: 3,
      start_time: "2026-04-15T09:00:00-04:00", end_time: "2026-04-15T12:00:00-04:00",
      timezone: "America/New_York", confidence: "high", category: "coding" as EntryCategory,
      description: "Work", source: "manual" as EntrySource, session_id: null,
    });
    db.insertEntry({
      date: "2026-04-16", employer_id: "maison", hours: 4,
      start_time: "2026-04-16T09:00:00-04:00", end_time: "2026-04-16T13:00:00-04:00",
      timezone: "America/New_York", confidence: "high", category: "coding" as EntryCategory,
      description: "Work 2", source: "manual" as EntrySource, session_id: null,
    });
    db.insertEntry({
      date: "2026-04-15", employer_id: "wilbo", hours: 2,
      start_time: "2026-04-15T14:00:00-04:00", end_time: "2026-04-15T16:00:00-04:00",
      timezone: "America/New_York", confidence: "high", category: "coding" as EntryCategory,
      description: "Wilbo work", source: "manual" as EntrySource, session_id: null,
    });

    const summary = getStatusSummary(db, "2026-04-14", "2026-04-18");
    expect(summary.maison.hours).toBe(7);
    expect(summary.maison.revenue).toBe(350);
    expect(summary.maison.cap_percent).toBe(35);
    expect(summary.wilbo.hours).toBe(2);
    expect(summary.wilbo.revenue).toBe(0);
  });

  it("getTodayBreakdown returns entries for a single day", () => {
    db.insertEntry({
      date: "2026-04-15", employer_id: "maison", hours: 2.5,
      start_time: "2026-04-15T09:00:00-04:00", end_time: "2026-04-15T11:30:00-04:00",
      timezone: "America/New_York", confidence: "high", category: "coding" as EntryCategory,
      description: "Auth work", source: "git_session" as EntrySource, session_id: "repo_abc",
    });

    const breakdown = getTodayBreakdown(db, "2026-04-15");
    expect(breakdown.entries).toHaveLength(1);
    expect(breakdown.entries[0].description).toBe("Auth work");
    expect(breakdown.total_hours).toBe(2.5);
  });

  it("getWeekMatrix returns hours per day per employer", () => {
    db.insertEntry({
      date: "2026-04-15", employer_id: "maison", hours: 4,
      start_time: "2026-04-15T09:00:00-04:00", end_time: "2026-04-15T13:00:00-04:00",
      timezone: "America/New_York", confidence: "high", category: "coding" as EntryCategory,
      description: "Mon", source: "manual" as EntrySource, session_id: null,
    });
    db.insertEntry({
      date: "2026-04-16", employer_id: "maison", hours: 3.5,
      start_time: "2026-04-16T09:00:00-04:00", end_time: "2026-04-16T12:30:00-04:00",
      timezone: "America/New_York", confidence: "high", category: "coding" as EntryCategory,
      description: "Tue", source: "manual" as EntrySource, session_id: null,
    });

    const matrix = getWeekMatrix(db, "2026-04-14", "2026-04-18");
    expect(matrix.maison["2026-04-15"]).toBe(4);
    expect(matrix.maison["2026-04-16"]).toBe(3.5);
    expect(matrix.maison["2026-04-14"]).toBe(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- tests/timesheet/status.test.ts`
Expected: FAIL — cannot resolve `../../src/timesheet/status.js`

- [ ] **Step 3: Implement status queries**

```typescript
// src/timesheet/status.ts
import type { TimesheetDB } from "./db.js";
import type { TimesheetEntry } from "./types.js";

export interface EmployerSummary {
  hours: number;
  revenue: number;
  cap_percent: number | null;
  days_worked: number;
  entries_by_status: Record<string, number>;
  categories: Record<string, number>;
}

export interface StatusSummary {
  [employerId: string]: EmployerSummary;
}

export interface DayBreakdown {
  date: string;
  entries: TimesheetEntry[];
  total_hours: number;
  by_employer: Record<string, number>;
}

export interface WeekMatrix {
  [employerId: string]: Record<string, number>;
}

export function getStatusSummary(
  db: TimesheetDB,
  weekStart: string,
  weekEnd: string,
): StatusSummary {
  const entries = db.getEntriesByDateRange(weekStart, weekEnd);
  const employers = new Map<string, TimesheetEntry[]>();

  for (const entry of entries) {
    const list = employers.get(entry.employer_id) ?? [];
    list.push(entry);
    employers.set(entry.employer_id, list);
  }

  const summary: StatusSummary = {};

  for (const [empId, empEntries] of employers) {
    const emp = db.getEmployer(empId);
    const totalHours = empEntries.reduce((s, e) => s + e.hours, 0);
    const rate = emp?.rate_hourly ?? 0;
    const cap = emp?.weekly_cap_hours ?? null;
    const daysSet = new Set(empEntries.map((e) => e.date));

    const categories: Record<string, number> = {};
    const statusCounts: Record<string, number> = {};

    for (const e of empEntries) {
      categories[e.category] = (categories[e.category] ?? 0) + e.hours;
      statusCounts[e.status] = (statusCounts[e.status] ?? 0) + 1;
    }

    summary[empId] = {
      hours: Math.round(totalHours * 100) / 100,
      revenue: Math.round(totalHours * rate * 100) / 100,
      cap_percent: cap ? Math.round((totalHours / cap) * 100) : null,
      days_worked: daysSet.size,
      entries_by_status: statusCounts,
      categories,
    };
  }

  return summary;
}

export function getTodayBreakdown(
  db: TimesheetDB,
  date: string,
): DayBreakdown {
  const entries = db.getEntriesByDateRange(date, date);
  const byEmployer: Record<string, number> = {};

  for (const e of entries) {
    byEmployer[e.employer_id] = (byEmployer[e.employer_id] ?? 0) + e.hours;
  }

  return {
    date,
    entries,
    total_hours: entries.reduce((s, e) => s + e.hours, 0),
    by_employer: byEmployer,
  };
}

export function getWeekMatrix(
  db: TimesheetDB,
  weekStart: string,
  weekEnd: string,
): WeekMatrix {
  const entries = db.getEntriesByDateRange(weekStart, weekEnd);
  const matrix: WeekMatrix = {};

  // Initialize all dates in range
  const start = new Date(weekStart);
  const end = new Date(weekEnd);
  const allDates: string[] = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    allDates.push(d.toISOString().split("T")[0]);
  }

  for (const entry of entries) {
    if (!matrix[entry.employer_id]) {
      matrix[entry.employer_id] = {};
      for (const date of allDates) matrix[entry.employer_id][date] = 0;
    }
    matrix[entry.employer_id][entry.date] =
      (matrix[entry.employer_id][entry.date] ?? 0) + entry.hours;
  }

  return matrix;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- tests/timesheet/status.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/timesheet/status.ts tests/timesheet/status.test.ts
git commit -m "feat(timesheet): status query functions (summary, today, week matrix)"
```

---

### Task 5: API Routes

**Files:**
- Create: `src/api/routes/timesheet-log.ts`
- Create: `src/api/routes/timesheet-status.ts`
- Create: `tests/api/routes/timesheet-log.test.ts`
- Create: `tests/api/routes/timesheet-status.test.ts`
- Modify: `src/api/server.ts` — register new routes
- Modify: `src/api/fastify.d.ts` — add `timesheetDb` to decorations
- Modify: `src/index.ts` — init TimesheetDB, pass to server, wire cron

- [ ] **Step 1: Write the failing test for POST /timesheet/log**

```typescript
// tests/api/routes/timesheet-log.test.ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import Fastify from "fastify";
import { timesheetLogRoute } from "../../../src/api/routes/timesheet-log.js";
import { TimesheetDB } from "../../../src/timesheet/db.js";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

describe("POST /timesheet/log", () => {
  const tmp = join(tmpdir(), "ts-route-log-test-" + Date.now());
  const brainDir = join(tmp, ".brain");
  let db: TimesheetDB;
  let app: ReturnType<typeof Fastify>;

  beforeEach(async () => {
    mkdirSync(brainDir, { recursive: true });
    db = new TimesheetDB(join(brainDir, "timesheet.db"));
    db.upsertEmployer({ id: "maison", rate_hourly: 50, weekly_cap_hours: 20, monthly_bonus: null, currency: "USD" });

    app = Fastify();
    app.decorate("timesheetDb", db);
    app.register(timesheetLogRoute);
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
    db.close();
    rmSync(tmp, { recursive: true, force: true });
  });

  it("creates a manual entry with explicit times", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/timesheet/log",
      payload: {
        employer_id: "maison",
        hours: 2,
        description: "Meeting with Fredrik",
        category: "meeting",
        start_time: "2026-04-15T14:00:00-04:00",
        end_time: "2026-04-15T16:00:00-04:00",
        timezone: "America/New_York",
      },
    });

    expect(res.statusCode).toBe(201);
    const body = JSON.parse(res.body);
    expect(body.id).toBeDefined();
    expect(body.hours).toBe(2);
    expect(body.confidence).toBe("high");
  });

  it("creates entry with only hours (backfills times)", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/timesheet/log",
      payload: {
        employer_id: "maison",
        hours: 1.5,
        description: "Research",
        category: "research",
      },
    });

    expect(res.statusCode).toBe(201);
    const body = JSON.parse(res.body);
    expect(body.confidence).toBe("medium");
    expect(body.start_time).toBeDefined();
    expect(body.end_time).toBeDefined();
  });

  it("rejects unknown employer", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/timesheet/log",
      payload: {
        employer_id: "unknown",
        hours: 1,
        description: "Test",
        category: "coding",
      },
    });

    expect(res.statusCode).toBe(400);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- tests/api/routes/timesheet-log.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement POST /timesheet/log route**

```typescript
// src/api/routes/timesheet-log.ts
import type { FastifyInstance } from "fastify";
import type { EntryCategory } from "../../timesheet/types.js";

interface LogBody {
  employer_id: string;
  hours: number;
  description: string;
  category: EntryCategory;
  start_time?: string;
  end_time?: string;
  timezone?: string;
}

export async function timesheetLogRoute(app: FastifyInstance): Promise<void> {
  app.post<{ Body: LogBody }>(
    "/timesheet/log",
    async (request, reply) => {
      const { employer_id, hours, description, category, start_time, end_time, timezone } = request.body;
      const db = app.timesheetDb;

      const employer = db.getEmployer(employer_id);
      if (!employer) {
        return reply.status(400).send({ error: `Unknown employer: ${employer_id}` });
      }

      const tz = timezone ?? "America/New_York";
      let finalStart: string;
      let finalEnd: string;
      let confidence: "high" | "medium" = "medium";

      if (start_time && end_time) {
        finalStart = start_time;
        finalEnd = end_time;
        confidence = "high";
      } else {
        const now = new Date();
        finalEnd = now.toISOString();
        finalStart = new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();
      }

      const date = finalStart.split("T")[0];
      const id = db.insertEntry({
        date,
        employer_id,
        hours,
        start_time: finalStart,
        end_time: finalEnd,
        timezone: tz,
        confidence,
        category,
        description,
        source: "manual",
        session_id: null,
      });

      const entry = db.getEntry(id);
      return reply.status(201).send(entry);
    },
  );
}
```

- [ ] **Step 4: Write test for GET /timesheet/status**

```typescript
// tests/api/routes/timesheet-status.test.ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import Fastify from "fastify";
import { timesheetStatusRoute } from "../../../src/api/routes/timesheet-status.js";
import { TimesheetDB } from "../../../src/timesheet/db.js";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

describe("GET /timesheet/status", () => {
  const tmp = join(tmpdir(), "ts-route-status-test-" + Date.now());
  const brainDir = join(tmp, ".brain");
  let db: TimesheetDB;
  let app: ReturnType<typeof Fastify>;

  beforeEach(async () => {
    mkdirSync(brainDir, { recursive: true });
    db = new TimesheetDB(join(brainDir, "timesheet.db"));
    db.upsertEmployer({ id: "maison", rate_hourly: 50, weekly_cap_hours: 20, monthly_bonus: null, currency: "USD" });

    app = Fastify();
    app.decorate("timesheetDb", db);
    app.register(timesheetStatusRoute);
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
    db.close();
    rmSync(tmp, { recursive: true, force: true });
  });

  it("returns weekly summary", async () => {
    db.insertEntry({
      date: "2026-04-15", employer_id: "maison", hours: 3,
      start_time: "2026-04-15T09:00:00-04:00", end_time: "2026-04-15T12:00:00-04:00",
      timezone: "America/New_York", confidence: "high", category: "coding",
      description: "Work", source: "manual", session_id: null,
    });

    const res = await app.inject({ method: "GET", url: "/timesheet/status?week_start=2026-04-14&week_end=2026-04-18" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.maison.hours).toBe(3);
  });

  it("returns today breakdown", async () => {
    db.insertEntry({
      date: "2026-04-15", employer_id: "maison", hours: 4,
      start_time: "2026-04-15T09:00:00-04:00", end_time: "2026-04-15T13:00:00-04:00",
      timezone: "America/New_York", confidence: "high", category: "coding",
      description: "Auth", source: "manual", session_id: null,
    });

    const res = await app.inject({ method: "GET", url: "/timesheet/status/today?date=2026-04-15" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.total_hours).toBe(4);
    expect(body.entries).toHaveLength(1);
  });

  it("returns week matrix", async () => {
    db.insertEntry({
      date: "2026-04-15", employer_id: "maison", hours: 4,
      start_time: "2026-04-15T09:00:00-04:00", end_time: "2026-04-15T13:00:00-04:00",
      timezone: "America/New_York", confidence: "high", category: "coding",
      description: "Mon", source: "manual", session_id: null,
    });

    const res = await app.inject({ method: "GET", url: "/timesheet/status/week?week_start=2026-04-14&week_end=2026-04-18" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.maison["2026-04-15"]).toBe(4);
  });
});
```

- [ ] **Step 5: Implement GET /timesheet/status route**

```typescript
// src/api/routes/timesheet-status.ts
import type { FastifyInstance } from "fastify";
import { getStatusSummary, getTodayBreakdown, getWeekMatrix } from "../../timesheet/status.js";

export async function timesheetStatusRoute(app: FastifyInstance): Promise<void> {
  app.get<{ Querystring: { week_start?: string; week_end?: string } }>(
    "/timesheet/status",
    async (request, reply) => {
      const { week_start, week_end } = request.query;
      if (!week_start || !week_end) {
        return reply.status(400).send({ error: "week_start and week_end required" });
      }
      const summary = getStatusSummary(app.timesheetDb, week_start, week_end);
      return reply.send(summary);
    },
  );

  app.get<{ Querystring: { date?: string } }>(
    "/timesheet/status/today",
    async (request, reply) => {
      const date = request.query.date ?? new Date().toISOString().split("T")[0];
      const breakdown = getTodayBreakdown(app.timesheetDb, date);
      return reply.send(breakdown);
    },
  );

  app.get<{ Querystring: { week_start?: string; week_end?: string } }>(
    "/timesheet/status/week",
    async (request, reply) => {
      const { week_start, week_end } = request.query;
      if (!week_start || !week_end) {
        return reply.status(400).send({ error: "week_start and week_end required" });
      }
      const matrix = getWeekMatrix(app.timesheetDb, week_start, week_end);
      return reply.send(matrix);
    },
  );
}
```

- [ ] **Step 6: Run both route tests**

Run: `pnpm test -- tests/api/routes/timesheet-log.test.ts tests/api/routes/timesheet-status.test.ts`
Expected: PASS (6 tests)

- [ ] **Step 7: Update Fastify type augmentation**

Add to `src/api/fastify.d.ts`:

```typescript
import type { TimesheetDB } from "../timesheet/db.js";

declare module "fastify" {
  interface FastifyInstance {
    timesheetDb: TimesheetDB;
  }
}
```

- [ ] **Step 8: Register routes in server.ts**

Modify `src/api/server.ts` — add imports and register:

```typescript
import { timesheetLogRoute } from "./routes/timesheet-log.js";
import { timesheetStatusRoute } from "./routes/timesheet-status.js";

// Inside createServer, after existing registers:
app.register(timesheetLogRoute);
app.register(timesheetStatusRoute);
```

Also add `timesheetDb` to the `ServerOptions` interface and the `app.decorate` call.

- [ ] **Step 9: Commit**

```bash
git add src/api/routes/timesheet-log.ts src/api/routes/timesheet-status.ts \
  tests/api/routes/timesheet-log.test.ts tests/api/routes/timesheet-status.test.ts \
  src/api/server.ts src/api/fastify.d.ts
git commit -m "feat(timesheet): API routes for manual log and status queries"
```

---

### Task 6: CLI Commands

**Files:**
- Create: `src/cli/timesheet.ts`
- Modify: `package.json` — add `timesheet` script

- [ ] **Step 1: Create the CLI**

```typescript
// src/cli/timesheet.ts
const DAEMON_URL = "http://127.0.0.1:3577";
const TIMEOUT_MS = 5000;

async function fetchDaemon(path: string, options?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${DAEMON_URL}${path}`, { ...options, signal: controller.signal });
    clearTimeout(timeout);
    return res;
  } catch (err) {
    clearTimeout(timeout);
    if (err instanceof Error && err.name === "AbortError") {
      console.error("✖ Brain daemon not responding. Is it running?");
      console.error("  Try: launchctl start com.rahilsinghi.brain-daemon");
    } else {
      console.error("✖ " + (err instanceof Error ? err.message : String(err)));
    }
    process.exit(1);
  }
}

function getWeekBounds(dateStr?: string): { week_start: string; week_end: string } {
  const date = dateStr ? new Date(dateStr) : new Date();
  const day = date.getDay();
  const monday = new Date(date);
  monday.setDate(date.getDate() - ((day + 6) % 7));
  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);
  return {
    week_start: monday.toISOString().split("T")[0],
    week_end: friday.toISOString().split("T")[0],
  };
}

async function logEntry(): Promise<void> {
  const args = process.argv.slice(3);
  const flags: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--") && i + 1 < args.length) {
      flags[args[i].slice(2)] = args[i + 1];
      i++;
    }
  }

  if (!flags.employer || !flags.hours || !flags.desc) {
    console.error("Usage: brain timesheet log --employer <id> --hours <n> --desc <text> [--category <cat>]");
    process.exit(1);
  }

  const res = await fetchDaemon("/timesheet/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      employer_id: flags.employer,
      hours: parseFloat(flags.hours),
      description: flags.desc,
      category: flags.category ?? "coding",
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    console.error("✖ " + (body as { error: string }).error);
    process.exit(1);
  }

  const entry = await res.json() as { id: string; hours: number; employer_id: string; description: string };
  console.log(`✓ Logged ${entry.hours}h for ${entry.employer_id}: ${entry.description}`);
}

async function showStatus(): Promise<void> {
  const subcommand = process.argv[3] ?? "week";
  const { week_start, week_end } = getWeekBounds();

  if (subcommand === "today") {
    const today = new Date().toISOString().split("T")[0];
    const res = await fetchDaemon(`/timesheet/status/today?date=${today}`);
    const data = await res.json() as { total_hours: number; entries: Array<{ employer_id: string; hours: number; category: string; description: string; start_time: string; end_time: string; confidence: string }> };
    console.log(`\n📋 Today (${today}) — ${data.total_hours}h total\n`);
    for (const e of data.entries) {
      const start = new Date(e.start_time).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
      const end = new Date(e.end_time).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
      console.log(`  ${e.employer_id.toUpperCase()} | ${e.hours}h ${e.category} [${e.confidence}] ${start}–${end}`);
      console.log(`    ${e.description}`);
    }
  } else if (subcommand === "week") {
    const res = await fetchDaemon(`/timesheet/status/week?week_start=${week_start}&week_end=${week_end}`);
    const matrix = await res.json() as Record<string, Record<string, number>>;
    console.log(`\n📊 Week (${week_start} to ${week_end})\n`);
    for (const [employer, days] of Object.entries(matrix)) {
      const total = Object.values(days).reduce((s, h) => s + h, 0);
      const dayStr = Object.entries(days).map(([d, h]) => {
        const dayName = new Date(d).toLocaleDateString("en-US", { weekday: "short" });
        return `${dayName}: ${h}h`;
      }).join(" | ");
      console.log(`  ${employer.toUpperCase()} (${total}h total)`);
      console.log(`  ${dayStr}\n`);
    }
  } else {
    const res = await fetchDaemon(`/timesheet/status?week_start=${week_start}&week_end=${week_end}`);
    const summary = await res.json() as Record<string, { hours: number; revenue: number; cap_percent: number | null; days_worked: number; categories: Record<string, number> }>;
    console.log(`\n📋 Status (${week_start} to ${week_end})\n`);
    for (const [employer, data] of Object.entries(summary)) {
      const capStr = data.cap_percent !== null ? ` (${data.cap_percent}% of cap)` : "";
      console.log(`  ${employer.toUpperCase()} — ${data.hours}h${capStr}`);
      if (data.revenue > 0) console.log(`    Revenue: $${data.revenue.toFixed(2)}`);
      console.log(`    Days: ${data.days_worked} | Categories: ${Object.entries(data.categories).map(([k, v]) => `${k} ${v}h`).join(", ")}\n`);
    }
  }
}

async function main(): Promise<void> {
  const command = process.argv[2];

  switch (command) {
    case "log":
      await logEntry();
      break;
    case "status":
      await showStatus();
      break;
    case "backfill":
      await backfill();
      break;
    default:
      console.log("Usage: brain timesheet <command>");
      console.log("  log       Log hours manually");
      console.log("  status    Show current status [today|week]");
      console.log("  backfill  Scan git history since a date (--since 2026-04-13)");
      process.exit(1);
  }
}

async function backfill(): Promise<void> {
  const args = process.argv.slice(3);
  const sinceIdx = args.indexOf("--since");
  if (sinceIdx === -1 || sinceIdx + 1 >= args.length) {
    console.error("Usage: brain timesheet backfill --since 2026-04-13");
    process.exit(1);
  }
  const since = args[sinceIdx + 1];

  const res = await fetchDaemon("/timesheet/backfill", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ since }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    console.error("✖ " + (body as { error: string }).error);
    process.exit(1);
  }

  const data = await res.json() as { sessions_found: number; message: string };
  console.log(`✓ ${data.message}`);
  console.log(`  ${data.sessions_found} sessions ingested as drafts (confidence: low).`);
  console.log("  Review with: pnpm timesheet status today");
}

main();
```

- [ ] **Step 2: Add script to package.json**

Add to `scripts` in `package.json`:
```json
"timesheet": "bun run src/cli/timesheet.ts"
```

- [ ] **Step 3: Commit**

```bash
git add src/cli/timesheet.ts package.json
git commit -m "feat(timesheet): CLI for manual logging and status queries"
```

---

### Task 7: Wire into Daemon + Cron

**Files:**
- Modify: `src/index.ts` — init TimesheetDB, load config, sync employers, wire 15-min cron
- Modify: `src/api/server.ts` — accept + decorate `timesheetDb`

- [ ] **Step 1: Update server.ts to accept TimesheetDB**

Modify `src/api/server.ts`:

Add `TimesheetDB` to `ServerOptions`:
```typescript
import type { TimesheetDB } from "../timesheet/db.js";

interface ServerOptions {
  store: VectorStore;
  vaultRoot: string;
  config: BrainConfig;
  synthesizeFn: SynthesizeFn;
  timesheetDb?: TimesheetDB;
}
```

In `createServer`, after existing decorates:
```typescript
if (opts.timesheetDb) {
  app.decorate("timesheetDb", opts.timesheetDb);
  app.register(timesheetLogRoute);
  app.register(timesheetStatusRoute);
}
```

- [ ] **Step 2: Update src/index.ts — init + cron**

Add these imports at the top of `src/index.ts`:
```typescript
import { TimesheetDB } from "./timesheet/db.js";
import { loadTimesheetConfig } from "./timesheet/config.js";
import { scanRepo, upsertSession } from "./timesheet/scanner.js";
```

After LanceDB init (after `await store.init()`), add:
```typescript
// Step 1.5: Init timesheet DB
console.log("[brain] Initializing timesheet DB...");
const timesheetConfig = loadTimesheetConfig(vaultRoot);
const timesheetDb = new TimesheetDB(join(vaultRoot, ".brain", "timesheet.db"));

// Sync employers from config to DB
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
console.log(`[brain] Timesheet DB ready (${Object.keys(timesheetConfig.employers).length} employers).`);
```

Pass `timesheetDb` to `createServer`:
```typescript
const server = createServer({
  store,
  vaultRoot,
  config,
  synthesizeFn: synthesize,
  timesheetDb,
});
```

Add the 15-minute timesheet scanner cron after existing crons:
```typescript
// Timesheet scanner cron
const tsInterval = `*/${timesheetConfig.scanner.poll_interval_minutes} * * * *`;
cron.schedule(tsInterval, () => {
  console.log("[cron] Running timesheet scanner...");
  const lastScan = timesheetDb.getMeta("last_scan_time") ?? new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const mappings = timesheetDb.getRepoMappings();

  // Scan each repo that has a local path pattern
  const localPaths = new Set<string>();
  for (const m of mappings) {
    if (m.pattern.startsWith("/")) localPaths.add(m.pattern);
  }

  // Also scan repos from timesheet config that are local paths
  for (const emp of Object.values(timesheetConfig.employers)) {
    for (const repo of emp.repos) {
      const expanded = repo.startsWith("~") ? repo.replace("~", process.env.HOME ?? "") : repo;
      if (expanded.startsWith("/")) localPaths.add(expanded);
    }
  }

  let totalSessions = 0;
  for (const repoPath of localPaths) {
    try {
      const { sessions } = scanRepo(repoPath, lastScan, timesheetConfig, mappings);
      for (const session of sessions) {
        upsertSession(timesheetDb, session, timesheetConfig.scanner.buffer_minutes);
        totalSessions++;
      }
    } catch (err) {
      console.error(`[cron] Timesheet scan failed for ${repoPath}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  timesheetDb.setMeta("last_scan_time", new Date().toISOString());
  if (totalSessions > 0) {
    console.log(`[cron] Timesheet scanner: ${totalSessions} sessions upserted.`);
  }
});
```

Add a `POST /timesheet/backfill` route in `src/api/routes/timesheet-log.ts` (same file as log):
```typescript
app.post<{ Body: { since: string } }>(
  "/timesheet/backfill",
  async (request, reply) => {
    const { since } = request.body;
    const mappings = app.timesheetDb.getRepoMappings();
    const tsConfig = loadTimesheetConfig(app.vaultRoot);

    // Collect local repo paths from mappings
    const localPaths = new Set<string>();
    for (const m of mappings) {
      if (m.pattern.startsWith("/")) localPaths.add(m.pattern);
    }
    for (const emp of Object.values(tsConfig.employers)) {
      for (const repo of emp.repos) {
        const expanded = repo.startsWith("~") ? repo.replace("~", process.env.HOME ?? "") : repo;
        if (expanded.startsWith("/")) localPaths.add(expanded);
      }
    }

    let totalSessions = 0;
    for (const repoPath of localPaths) {
      const { sessions } = scanRepo(repoPath, since, tsConfig, mappings);
      for (const session of sessions) {
        upsertSession(app.timesheetDb, session, tsConfig.scanner.buffer_minutes);
        totalSessions++;
      }
    }

    return reply.send({
      sessions_found: totalSessions,
      message: `Backfilled from ${since}: ${totalSessions} sessions ingested`,
    });
  },
);
```

Add missed-cron recovery right after timesheetDb init:
```typescript
// Missed cron recovery: check if we missed any scans
const lastScan = timesheetDb.getMeta("last_scan_time");
if (lastScan) {
  const lastScanAge = Date.now() - new Date(lastScan).getTime();
  if (lastScanAge > timesheetConfig.scanner.poll_interval_minutes * 60 * 1000) {
    console.log("[brain] Timesheet: missed scans detected, running catch-up...");
    // The first cron tick will handle this since lastScan is stale
  }
}
```

- [ ] **Step 3: Run full test suite to verify no regressions**

Run: `pnpm test`
Expected: All existing tests pass + new timesheet tests pass

- [ ] **Step 4: Commit**

```bash
git add src/index.ts src/api/server.ts src/api/fastify.d.ts
git commit -m "feat(timesheet): wire DB, config, scanner cron into daemon"
```

---

### Task 8: Manual Smoke Test

- [ ] **Step 1: Restart the daemon**

```bash
pnpm restart
# or if running locally:
pnpm start
```

- [ ] **Step 2: Check health**

```bash
curl http://127.0.0.1:3577/health | jq
```

Expected: 200 OK with stats

- [ ] **Step 3: Log a manual entry**

```bash
pnpm timesheet log --employer maison --hours 2 --desc "Onboarding + repo setup" --category research
```

Expected: `✓ Logged 2h for maison: Onboarding + repo setup`

- [ ] **Step 4: Check status**

```bash
pnpm timesheet status
pnpm timesheet status today
pnpm timesheet status week
```

Expected: Shows the logged entry in all three views

- [ ] **Step 5: Verify scanner is running**

```bash
tail -f /tmp/brain-daemon.stdout.log | grep timesheet
```

Wait up to 15 minutes for the scanner cron to fire. Expected: `[cron] Running timesheet scanner...`

- [ ] **Step 6: Final commit with any smoke test fixes**

```bash
git add -A
git commit -m "fix(timesheet): smoke test adjustments"
```

Only commit if there were fixes needed. Skip if everything worked first try.

---

## Summary

| Task | What it builds | Files | Tests |
|------|---------------|-------|-------|
| 1 | Types + config | 3 new | 3 |
| 2 | SQLite DB layer | 1 new | 8 |
| 3 | Git session scanner | 1 new | 7 |
| 4 | Status queries | 1 new | 3 |
| 5 | API routes | 2 new, 2 modified | 6 |
| 6 | CLI commands | 1 new, 1 modified | — |
| 7 | Daemon wiring + cron | 2 modified | — |
| 8 | Smoke test | — | manual |

**Total:** 9 new files, 4 modified files, ~27 automated tests, 1 smoke test.

After Phase 1 completes, you have: working git session scanning every 15 minutes, manual CLI entry, status queries, and the SQLite foundation for all future phases. Hours are tracked from Day 1.
