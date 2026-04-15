// ── Inbound Queue ──

export type InboundType =
  | "ingest"
  | "query"
  | "voice"
  | "audio"
  | "timesheet_entry"
  | "timesheet_command"
  | "timesheet_reply";

export type InboundStatus = "pending" | "processing" | "completed" | "failed";

export type FileStatus = "none" | "downloaded" | "download_failed";

export interface InboundQueueEntry {
  id: string;
  chat_id: number;
  telegram_message_id: number;
  type: InboundType;
  command: string | null;
  raw_text: string;
  file_path: string | null;
  file_status: FileStatus;
  reply_to_queue_id: string | null;
  status: InboundStatus;
  response: string | null;
  response_sent: number; // 0 or 1 (SQLite boolean)
  created_at: string;
  processed_at: string | null;
  retry_count: number;
  error: string | null;
}

// ── Outbound Queue ──

export type OutboundCategory =
  | "daily_report"
  | "weekly_finalize"
  | "cap_alert"
  | "general";

export interface OutboundQueueEntry {
  id: string;
  chat_id: number;
  message: string;
  category: OutboundCategory;
  deliver_at: string | null;
  sent_at: string | null;
  telegram_message_id: number | null;
  retry_count: number;
  failed: number; // 0 or 1 (SQLite boolean)
  created_at: string;
  report_date: string | null;
  entry_ids: string | null; // JSON string of entry ID array
}

// ── Report Message Map ──

export interface ReportMessageMap {
  telegram_message_id: number;
  outbound_queue_id: string;
  date: string;
  entry_ids: string; // JSON string of entry ID array
}
