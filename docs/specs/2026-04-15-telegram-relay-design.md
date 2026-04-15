# Telegram Relay Bot — Always-On Message Queue

**Date:** 2026-04-15
**Status:** Design
**Problem:** Telegram bot runs as daemon subprocess on laptop. When laptop is closed, messages are lost (voice/audio file URLs expire in ~1hr) and proactive sends (daily reports, cap alerts) can't fire.
**Solution:** Lightweight always-on relay bot on Fly.io that receives, acks, and queues all messages. Daemon pulls from relay when online, processes, posts responses back. Relay sends responses and scheduled messages on their own schedule.

---

## Architecture Overview

```
User (Telegram) ←→ Fly.io Relay Bot ←→ Daemon (laptop)
                    ├── SQLite queue
                    ├── File storage (volume)
                    └── Scheduled message delivery
```

**Relay:** Always-on grammY webhook bot on Fly.io. Receives messages, downloads files, queues everything, sends acks. Exposes REST API for daemon to pull/push.

**Daemon:** Polls relay every 2 min when online. Processes inbound items (ingest, synthesis, transcription, timesheet). Posts responses and pre-stages scheduled messages.

**Principle:** Relay is a dumb pipe. Zero intelligence, zero parsing, zero LLM. All processing logic stays on the daemon.

---

## Relay Bot (Fly.io)

### Stack
- Runtime: Bun
- Framework: grammY (webhook mode, not polling)
- Queue: SQLite on Fly.io persistent volume
- Files: Fly.io persistent volume (`/data/files/`)
- API: Fastify (same as brain daemon)
- Auth: shared secret token in `RELAY_SECRET` env var

### Webhook Handler

On every incoming Telegram message:

1. **Auth check** — verify `from.id` is in allowed_user_ids
2. **Classify** — determine message type:
   - Text starting with `?` → `type: "query"`
   - Text starting with `+` and matching `^\+\d+(?:\.\d+)?h\s` → `type: "timesheet_entry"`
   - Text matching `/ts`, `/eod`, `/finalize`, `/invoice` → `type: "timesheet_command"` with `command` field
   - Text that is a reply to a report message → `type: "timesheet_reply"` with `reply_to_queue_id`
   - Plain text → `type: "ingest"`
   - Voice message → `type: "voice"`
   - Audio file → `type: "audio"`
3. **Download files** — for voice/audio, immediately download via Telegram File API and store on volume. Retry 3x with exponential backoff. If all retries fail, queue without file and set `file_status: "download_failed"`.
4. **Insert into `inbound_queue`**
5. **Ack** — reply to user based on type:
   - `ingest`: "⏳ Queued for ingestion"
   - `query`: "🔍 Queued — will answer when brain is online"
   - `voice`/`audio`: "🎤 Saved — will transcribe when brain is online"
   - `timesheet_entry`: "⏱ Queued"
   - `timesheet_command`: "⏱ Queued"
   - `timesheet_reply`: "⏱ Queued"
6. **Store report message mapping** — when daemon sends a report (via outbound queue), store its Telegram `message_id` so replies can be linked back

**Classification is NOT parsing.** The relay doesn't extract hours, employer IDs, or entry numbers. It just tags the type for priority/ordering. The daemon does all actual parsing.

### Database Schema

```sql
CREATE TABLE inbound_queue (
  id TEXT PRIMARY KEY,
  chat_id INTEGER NOT NULL,
  telegram_message_id INTEGER,
  type TEXT NOT NULL,  -- ingest, query, voice, audio, timesheet_entry, timesheet_command, timesheet_reply
  command TEXT,        -- for timesheet_command: ts, eod, finalize, invoice
  raw_text TEXT,       -- original message text
  file_path TEXT,      -- local path on volume (voice/audio only)
  file_status TEXT NOT NULL DEFAULT 'none',  -- none, downloaded, download_failed
  reply_to_queue_id TEXT,  -- for timesheet_reply: the outbound queue id of the report
  status TEXT NOT NULL DEFAULT 'pending',    -- pending, processing, completed, failed
  response TEXT,       -- daemon's response text (set via API)
  response_sent INTEGER NOT NULL DEFAULT 0, -- 1 after relay sends response to user
  created_at TEXT NOT NULL,
  processed_at TEXT,
  retry_count INTEGER NOT NULL DEFAULT 0,
  error TEXT
);

CREATE TABLE outbound_queue (
  id TEXT PRIMARY KEY,
  chat_id INTEGER NOT NULL,
  message TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',  -- daily_report, weekly_finalize, cap_alert, general
  deliver_at TEXT,     -- NULL = send immediately, ISO timestamp = scheduled
  sent_at TEXT,
  telegram_message_id INTEGER,  -- set after sending (for reply tracking)
  retry_count INTEGER NOT NULL DEFAULT 0,
  failed INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);

CREATE TABLE report_message_map (
  telegram_message_id INTEGER PRIMARY KEY,
  outbound_queue_id TEXT NOT NULL,
  date TEXT NOT NULL,          -- the date the report covers
  entry_ids TEXT NOT NULL      -- JSON array of entry IDs in display order
);
```

### REST API (for daemon)

All endpoints require `Authorization: Bearer {RELAY_SECRET}`.

#### `GET /queue/inbound?status=pending`
Returns all pending inbound items in FIFO order. Response:
```json
{
  "items": [
    {
      "id": "uuid",
      "type": "voice",
      "raw_text": null,
      "file_url": "/files/{id}.wav",
      "file_status": "downloaded",
      "created_at": "2026-04-15T03:22:00Z"
    }
  ]
}
```

#### `GET /files/{id}`
Download a stored file (voice/audio). Returns binary content.

#### `POST /queue/inbound/{id}/response`
Daemon posts processing result. Body:
```json
{
  "response": "Transcribed and saved. (voice/1713150120000)",
  "status": "completed"
}
```
Relay sends the response to the user's chat.

#### `POST /queue/inbound/{id}/fail`
Mark as permanently failed. Body:
```json
{
  "error": "File download had failed — voice note expired"
}
```
Relay sends error message to user.

#### `POST /queue/outbound`
Daemon pushes a proactive message. Body:
```json
{
  "chat_id": 123456,
  "message": "📋 Timesheet — Mon Apr 14...",
  "category": "daily_report",
  "deliver_at": "2026-04-16T09:00:00",
  "entry_ids": ["uuid1", "uuid2"],
  "report_date": "2026-04-15"
}
```
If `deliver_at` is null, send immediately. If set, hold until that time.
If `entry_ids` is provided, store in `report_message_map` after sending (for reply-to tracking).

#### `POST /queue/outbound/{id}/replace`
Replace a pre-staged scheduled message (e.g., daemon generates fresh 9 AM report, replacing the stale pre-queued one). Only works if `sent_at IS NULL`.

#### `GET /health`
Relay health check. Returns queue depths, file storage usage, uptime.

### Scheduled Message Delivery

Background loop runs every 30 seconds:
1. Query `outbound_queue WHERE deliver_at <= now() AND sent_at IS NULL AND failed = 0`
2. Send each via Telegram Bot API
3. On success: set `sent_at`, store `telegram_message_id`
4. On failure: increment `retry_count`, mark `failed` after 5 retries

### Response Relay

Background loop runs every 10 seconds:
1. Query `inbound_queue WHERE response IS NOT NULL AND response_sent = 0`
2. Send each response via Telegram Bot API (replying to original `telegram_message_id`)
3. Set `response_sent = 1`

### File Cleanup

Daily cron: delete files from volume where `inbound_queue.status IN ('completed', 'failed') AND processed_at < now() - 7 days`.

---

## Daemon Changes

### New: Relay Sync Client (`src/relay/sync.ts`)

Polls the relay API every 2 min (when relay URL is configured).

```typescript
interface RelaySyncConfig {
  relay_url: string;     // https://brain-relay.fly.dev
  relay_secret: string;  // shared auth token
  poll_interval_ms: number; // default 120_000
}
```

**Poll cycle:**
1. `GET /queue/inbound?status=pending` — fetch pending items
2. For each item (FIFO):
   a. If voice/audio: `GET /files/{id}` → save to `raw/voice/` → trigger voice pipeline
   b. If ingest: call `ingestContent()` with raw_text
   c. If query: call `synthesize()` → format response
   d. If timesheet_entry/command/reply: call appropriate handler
   e. `POST /queue/inbound/{id}/response` with result
3. On processing error: retry 3x, then `POST /queue/inbound/{id}/fail`

**Pre-stage scheduled messages:**
- After each scanner cron: generate next morning's daily report, push to relay with `deliver_at: tomorrow 9 AM`
- After finalization: push weekly summary to relay with `deliver_at: Sunday 8 PM`
- On cap alert: push immediately (no schedule)
- If a message with the same category + date already exists and hasn't been sent, replace it (keeps reports fresh)

### Config Addition (`.brain/config.yaml`)

```yaml
relay:
  enabled: true
  url: https://brain-relay.fly.dev
  secret: ${RELAY_SECRET}  # from .brain/.env
  poll_interval_seconds: 120
```

### Daemon Boot Changes

On startup, if relay is configured:
1. Immediately poll relay (don't wait for first cron tick)
2. Pre-stage today's report if not already staged
3. Flush any outbound messages that were queued locally but relay was unreachable

### Graceful Degradation

- If relay is unreachable during poll, log warning and retry next cycle
- If relay is not configured (`relay.enabled: false`), all existing behavior unchanged (local-only mode)
- The daemon's local Telegram worker still runs as fallback when laptop is open
- Both the relay and the local worker can coexist: relay handles offline messages, local worker handles real-time when available

---

## Worker Changes (`src/telegram/worker.ts`)

When relay is configured, the local worker should:
1. Still register all command handlers (for real-time processing when laptop is open)
2. On processing any message, also mark it as completed in the relay if it exists there (prevent double-processing)
3. On `/start`, push `chat_id` to relay via `POST /queue/outbound` (so relay knows where to send)

**Dedup:** Every inbound item has a `telegram_message_id`. When daemon processes via local worker, it marks that message_id as completed in the relay too. When daemon processes via relay sync, it uses the relay's queue id.

---

## Deployment (Fly.io)

### Files

```
relay/
├── src/
│   ├── index.ts        ← Entry point: webhook + API + background loops
│   ├── webhook.ts      ← grammY webhook handler (classify, download, queue)
│   ├── api.ts          ← Fastify REST API for daemon
│   ├── db.ts           ← SQLite wrapper (queue tables)
│   ├── scheduler.ts    ← Scheduled message delivery loop
│   ├── responder.ts    ← Response relay loop
│   └── cleanup.ts      ← File cleanup cron
├── fly.toml
├── Dockerfile
├── package.json
└── tsconfig.json
```

### fly.toml

```toml
app = "brain-relay"

[build]
  dockerfile = "Dockerfile"

[mounts]
  source = "brain_relay_data"
  destination = "/data"

[http_service]
  internal_port = 8080
  force_https = true

[env]
  NODE_ENV = "production"
  DB_PATH = "/data/relay.db"
  FILES_PATH = "/data/files"
```

### Environment Variables (Fly.io secrets)

```
TELEGRAM_BOT_TOKEN=<same token as local bot>
RELAY_SECRET=<shared secret for daemon auth>
ALLOWED_USER_IDS=<comma-separated>
```

### Webhook Registration

On first deploy, register webhook URL with Telegram:
```bash
curl "https://api.telegram.org/bot${TOKEN}/setWebhook?url=https://brain-relay.fly.dev/webhook"
```

**Important: One receiver per bot token.** Telegram allows only one message receiver — either polling or webhook. When the relay is active (webhook registered), the local worker in `worker.ts` must NOT start polling. Instead:
- The local worker is **disabled entirely** when `relay.enabled: true`
- All real-time processing moves to the relay sync client (`src/relay/sync.ts`) which polls the relay's REST API, not Telegram directly
- The daemon's poll interval (2 min) means slightly higher latency than the old direct-polling model, but this is acceptable — messages are acked instantly by the relay, processing follows shortly after
- When `relay.enabled: false` (default, or Mac Studio in the future), the local worker runs as before with direct Telegram polling

---

## Migration Path

### Phase 1: Deploy relay
- Build and deploy relay to Fly.io
- Register webhook
- Test: send messages while daemon is stopped, verify they queue
- Test: start daemon, verify it processes queued items

### Phase 2: Wire daemon sync
- Add `src/relay/sync.ts`
- Add relay config to `.brain/config.yaml`
- Wire poll cron into daemon
- Test: full round-trip (send → queue → process → response)

### Phase 3: Scheduled messages
- Wire report pre-staging into scanner cron
- Wire finalization pre-staging
- Test: stop daemon, wait for 9 AM, verify report arrives

### Phase 4: Dedup + coexistence
- Local worker marks relay items as completed
- Handle edge case: message processed by both local and relay
- Ensure no duplicate responses

---

## Error Scenarios

| Scenario | Behavior |
|----------|----------|
| Relay can't download voice file (URL expired) | Queue with `file_status: download_failed`, daemon notifies user |
| Daemon can't reach relay | Log warning, retry next poll cycle, local worker still handles real-time |
| Relay can't send Telegram message | Retry 5x with backoff, then mark failed |
| Daemon crashes mid-processing | Item stays `status: processing`, daemon retries on next poll |
| Both local worker and relay receive same message | Dedup via `telegram_message_id` — first to process wins |
| Relay runs out of disk space | Health check returns warning, old files cleaned up |
| Fly.io restarts relay | SQLite on persistent volume survives, webhook re-registers |

---

## Future Enhancements (not in scope)

- **Timesheet DB read replica on relay** — answer `/ts` queries even when daemon is offline
- **Push notifications from daemon** — WebSocket/SSE instead of polling for lower latency
- **Multi-user support** — relay handles multiple chat_ids
- **End-to-end encryption** — encrypt queue contents with user's key
