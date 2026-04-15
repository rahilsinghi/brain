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

export type EntryStatus =
  | "draft"
  | "reviewed"
  | "finalized"
  | "invoiced"
  | "paid"
  | "ignored";

export type EntryConfidence = "high" | "medium" | "low";

export type EntryCategory =
  | "coding"
  | "refactoring"
  | "testing"
  | "docs"
  | "devops"
  | "design"
  | "research"
  | "meeting"
  | "communication";

export type EntrySource =
  | "git_session"
  | "manual"
  | "voice_note"
  | "email"
  | "calendar";

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
