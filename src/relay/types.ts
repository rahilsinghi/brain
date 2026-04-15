export interface RelayConfig {
  enabled: boolean;
  url: string;
  secret: string;
  poll_interval_seconds: number;
}

export interface RelayInboundItem {
  id: string;
  chat_id: number;
  telegram_message_id: number | null;
  type: string;
  command: string | null;
  raw_text: string | null;
  file_path: string | null;
  file_status: string;
  reply_to_queue_id: string | null;
  created_at: string;
}
