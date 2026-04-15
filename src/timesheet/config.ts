import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";
import type {
  TimesheetConfig,
  EmployerConfig,
  ScannerConfig,
  AlertsConfig,
  ReviewConfig,
} from "./types.js";

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
  ],
};

const DEFAULT_ALERTS: AlertsConfig = {
  cap_thresholds: [0.75, 0.9, 1.0],
};

const DEFAULT_REVIEW: ReviewConfig = {
  report_hour: 9,
  finalize_day: "sunday",
  finalize_hour: 18,
  gap_threshold_minutes: 45,
  gap_auto_resolve_days: 3,
};

const DEFAULTS: TimesheetConfig = {
  employers: {},
  scanner: DEFAULT_SCANNER,
  alerts: DEFAULT_ALERTS,
  review: DEFAULT_REVIEW,
};

const EMPLOYER_DEFAULTS: Omit<EmployerConfig, "rate_hourly"> = {
  weekly_cap: null,
  monthly_bonus: null,
  currency: "USD",
  repos: [],
  email_domains: [],
  contacts: [],
};

function normalizeEmployer(raw: Record<string, unknown>): EmployerConfig {
  return {
    rate_hourly: (raw.rate_hourly as number) ?? 0,
    weekly_cap: (raw.weekly_cap as number | null) ?? EMPLOYER_DEFAULTS.weekly_cap,
    monthly_bonus:
      (raw.monthly_bonus as number | null) ?? EMPLOYER_DEFAULTS.monthly_bonus,
    currency: (raw.currency as string) ?? EMPLOYER_DEFAULTS.currency,
    repos: (raw.repos as string[]) ?? EMPLOYER_DEFAULTS.repos,
    email_domains:
      (raw.email_domains as string[]) ?? EMPLOYER_DEFAULTS.email_domains,
    contacts: (raw.contacts as string[]) ?? EMPLOYER_DEFAULTS.contacts,
  };
}

export function loadTimesheetConfig(vaultRoot: string): TimesheetConfig {
  const configPath = join(vaultRoot, ".brain", "timesheet-config.yaml");
  if (!existsSync(configPath)) return DEFAULTS;

  const raw = readFileSync(configPath, "utf-8");
  const parsed = parseYaml(raw) as Record<string, unknown> | null;
  if (!parsed) return DEFAULTS;

  const employers: Record<string, EmployerConfig> = {};
  if (parsed.employers && typeof parsed.employers === "object") {
    for (const [id, rawEmployer] of Object.entries(
      parsed.employers as Record<string, Record<string, unknown>>,
    )) {
      employers[id] = normalizeEmployer(rawEmployer);
    }
  }

  const rawScanner = (parsed.scanner as Record<string, unknown>) ?? {};
  const scanner: ScannerConfig = {
    poll_interval_minutes:
      (rawScanner.poll_interval_minutes as number) ??
      DEFAULT_SCANNER.poll_interval_minutes,
    session_gap_minutes:
      (rawScanner.session_gap_minutes as number) ??
      DEFAULT_SCANNER.session_gap_minutes,
    buffer_minutes:
      (rawScanner.buffer_minutes as number) ?? DEFAULT_SCANNER.buffer_minutes,
    git_user: (rawScanner.git_user as string) ?? DEFAULT_SCANNER.git_user,
    exclude_paths:
      (rawScanner.exclude_paths as string[]) ?? DEFAULT_SCANNER.exclude_paths,
  };

  const rawAlerts = (parsed.alerts as Record<string, unknown>) ?? {};
  const alerts: AlertsConfig = {
    cap_thresholds:
      (rawAlerts.cap_thresholds as number[]) ?? DEFAULT_ALERTS.cap_thresholds,
  };

  const rawReview = (parsed.review as Record<string, unknown>) ?? {};
  const review: ReviewConfig = {
    report_hour:
      (rawReview.report_hour as number) ?? DEFAULT_REVIEW.report_hour,
    finalize_day:
      (rawReview.finalize_day as string) ?? DEFAULT_REVIEW.finalize_day,
    finalize_hour:
      (rawReview.finalize_hour as number) ?? DEFAULT_REVIEW.finalize_hour,
    gap_threshold_minutes:
      (rawReview.gap_threshold_minutes as number) ??
      DEFAULT_REVIEW.gap_threshold_minutes,
    gap_auto_resolve_days:
      (rawReview.gap_auto_resolve_days as number) ??
      DEFAULT_REVIEW.gap_auto_resolve_days,
  };

  return { employers, scanner, alerts, review };
}
