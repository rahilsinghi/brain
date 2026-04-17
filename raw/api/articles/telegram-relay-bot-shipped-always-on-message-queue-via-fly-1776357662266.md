---
status: processed
source_type: api
channel: claude-code
source_id: api/articles/telegram-relay-bot-shipped-always-on-message-queue-via-fly-1776357662266.md
ingested_at: 2026-04-16T16:41:02.266Z
parsed_at: null
compiled_to: "[[Telegram Relay Bot - Always-On Message Queue (brain-relay)]]"
processed_at: 2026-04-16T16:41:19.965Z
retry_count: 0
last_error: null
compile_progress: null
---



# Telegram Relay Bot — Always-On Message Queue

**Status:** Live (2026-04-16)
**URL:** https://brain-relay.fly.dev
**Fly.io app:** brain-relay (ewr region, 1GB persistent volume)

## What Shipped

Always-on Telegram relay bot deployed to Fly.io free tier. The brain daemon on the laptop can be offline (lid closed, sleeping) and messages still get received, acked, and queued. When the daemon comes back online, it processes everything within 15 seconds.

### Architecture
```
User (Telegram) → Fly.io Relay (webhook) → SQLite queue + file storage
                                          ↕ REST API (Bearer auth)
                  Daemon (laptop) polls every 15s → processes → posts response
                  Relay sends response back to user via Telegram
```

### Relay (Fly.io)
- grammY webhook bot — receives all messages 24/7
- SQLite on persistent volume — survives Fly.io restarts
- Voice/audio files downloaded immediately before Telegram URLs expire
- Message classifier: ingest, query, voice, audio, timesheet_entry, timesheet_command, timesheet_reply
- Instant ack to user ("⏳ Queued", "🔍 Queued", "🎤 Saved", "⏱ Queued")
- Scheduled message delivery (30s loop) — sends reports at configured times
- Response relay (10s loop) — sends daemon responses back to user
- REST API with Bearer auth for daemon pull/push
- File cleanup cron (7-day retention)

### Daemon Integration
- `src/relay/client.ts` — HTTP client for relay REST API
- `src/relay/sync.ts` — Poll loop: fetch pending → process each by type → post response
  - Executes real handlers: /help, /start, /ts, /eod, /finalize, /invoice, ingest, query, voice
  - Timesheet commands run actual logic (not generic acks)
- `src/index.ts` — relay mode: disables local Telegram worker, 15s setInterval polling
- Webhook re-registered on every daemon boot (prevents grammY polling from clearing it)
- Pre-stages daily reports and finalization summaries to relay with `deliver_at` timestamps

### Test Coverage
- 142 relay tests (db, webhook, api, scheduler, responder, edge cases, integration)
- 23 daemon relay tests (client, sync)
- 165 total new tests

### Key Fix: Webhook Clearing
grammY's `bot.start()` (polling mode) calls `deleteWebhook` on startup. When the daemon previously ran in local mode, then switched to relay mode, the old worker process had already cleared the webhook. Fixed by re-registering webhook on every daemon boot when relay is enabled.

### Key Fix: Generic Command Responses
Initial sync loop returned "Command received" for all timesheet commands. Fixed to execute real handler logic — /help returns full help text, /ts returns actual timesheet data, etc.

### Configuration
```yaml
# .brain/config.yaml
relay:
  enabled: true
  url: https://brain-relay.fly.dev
  secret: ${RELAY_SECRET}
  poll_interval_seconds: 15
```

### Fly.io Secrets
- TELEGRAM_BOT_TOKEN (same as local bot)
- RELAY_SECRET (shared auth between daemon and relay)
- ALLOWED_USER_IDS (Telegram user ID whitelist)
