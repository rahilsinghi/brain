---
status: pending
source_type: file_drop
source_id: null
ingested_at: 2026-04-10T12:30:00Z
parsed_at: 2026-04-10T12:30:00Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# KAREN — Project Profile

## Project Summary

Karen is an OpenClaw-powered multi-channel escalation engine built for the MischiefClaw Hackathon. She is a mischievous follow-up agent that treats every non-response as a crisis and systematically escalates through 10 distinct communication channels with 4 interchangeable AI personalities. The system combines dark humor with serious technical infrastructure, designed to demonstrate the absurdity of aggressive follow-up tactics through an interactive demo. This is a hackathon project where the demo itself is the product—built to be shown, demoed, and remembered.

**Status**: Functionally complete. Deployed to Vercel (frontend) with local FastAPI backend. All 10 escalation levels working, SSE real-time streaming active, audio integration complete, de-escalation teardown sequence operational. Ready for live demo at MischiefClaw Hackathon.

---

## Tech Stack

**Frontend:**
- Next.js 16.2.2 (App Router, TypeScript, SSR)
- React 19.2.4, React DOM 19.2.4
- Tailwind CSS 4 with PostCSS
- Framer Motion 12.38.0 (animations, transitions)
- DM Mono typography (@fontsource/dm-mono)
- Web Audio API for music distortion effects

**Backend:**
- FastAPI 0.115.0 (async Python web framework)
- Uvicorn 0.34.0 (ASGI server)
- Pydantic 2.10.0 (data validation, schemas)
- SSE-Starlette 2.2.0 (Server-Sent Events streaming)
- Python 3.x (async/await throughout)

**AI & LLM:**
- Anthropic Claude API (Haiku 4.5 for message generation)
- OpenAI SDK 1.0.0 (fallback provider)
- Google GenAI 1.14.0 (optional provider)
- OpenClaw reasoning engine (orchestration via markdown specs)

**Integrations & APIs:**
- Resend (email delivery via API)
- Twilio (SMS, WhatsApp, voice calls via SID + token)
- Slack Bot API (channel messaging)
- Discord Bot API (server announcements)
- Google Calendar API (event creation via service account)
- GitHub API (commits to rahilsinghi/portfolio repo)
- FedEx Shipping API (sandbox for rate quotes & labels)
- ElevenLabs 1.0.0 (text-to-speech, Rachel voice ID: 21m00Tcm4TlvDq8ikWAM)

**Document Generation:**
- WeasyPrint 63.0 (HTML-to-PDF for legal letters)
- QRCode 7.4.2 (for onboarding)
- Pillow 10.0.0 (image handling)

**Infrastructure:**
- Docker Compose (local dev: OpenClaw + backend services)
- Vercel (frontend hosting)
- Google Cloud (service account for Calendar API)
- ngrok (optional tunnel for webhooks)

---

## Architecture

### System Diagram

```
┌─────────────────────────────────────────────────┐
│         FRONTEND (Next.js 16 + Tailwind)        │
│    karen-tau.vercel.app / localhost:3000        │
├─────────────────────────────────────────────────┤
│ Pages: / (circle), /trigger, /escalation/[id], │
│ /open-matters (GitHub data), /arsenal, /karen   │
│ Components: Real-time SSE timeline, sidebar     │
│ Audio: Quips queue, background music + FX       │
│ Game Mode: Pixel arena with crab/target sprites │
└────────────────┬────────────────────────────────┘
                 │ SSE (text/event-stream)
                 │ JSON POST/GET (fetch)
┌────────────────▼────────────────────────────────┐
│        BACKEND (FastAPI on localhost:8000)      │
├─────────────────────────────────────────────────┤
│ Routers:                                        │
│  • escalation.py → /api/trigger, /stream, /resolve
│  • members.py → /api/members CRUD + available  │
│  • webhook.py → /api/payment, /api/resolve     │
│  • audio.py → GET /api/audio/{path} serves mp3s│
│                                                 │
│ Core Services:                                  │
│  • karen_service.py → orchestration ladder      │
│  • personality_service.py → Claude msg gen      │
│  • channel_service.py → 10 integration handlers │
│  • audio_service.py → ElevenLabs TTS wrapper    │
│  • research_service.py → OSINT cache animation  │
│  • deescalation_service.py → teardown sequence  │
│  • pdf_service.py → formal letter generation    │
│  • calendar_service.py → Google Calendar        │
│  • slack_service.py → Slack webhook/API         │
│  • fedex_service.py → shipping rate quotes      │
│  • llm_provider.py → switchable AI backend      │
│                                                 │
│ Data:                                           │
│  • circle.json (5 pre-seeded members)           │
│  • research_cache.json (OSINT discoveries)      │
│  • In-memory escalation state (dict-based)      │
│  • Event queue per escalation (async)           │
└────────────────┬────────────────────────────────┘
                 │
    ┌────────────┼────────────┬──────────┐
    │            │            │          │
┌───▼──┐  ┌──────▼─┐  ┌──────▼──┐  ┌───▼──┐
│OpenC.│  │External│  │ Internal │  │Local │
│Reason│  │Services│  │ Services │  │Files │
├──────┤  ├────────┤  ├──────────┤  ├──────┤
│Specs │  │Resend  │  │Postgres? │  │Audio │
│Perso│  │Twilio  │  │Cache: py │  │Data  │
│nal  │  │Google  │  │Events in │  │cache │
│Files│  │FedEx   │  │mem queue │  │      │
│     │  │Discord │  │          │  │      │
│     │  │Slack   │  │          │  │      │
└──────┘  └────────┘  └──────────┘  └──────┘
```

### Data Flow — Escalation Cycle

1. **Trigger**: User submits form (initiator, target, grievance, personality, speed, max level)
2. **Validation**: Karen checks available channels for target (contacts missing FILL_BEFORE_DEMO)
3. **Orchestration**: Karen service creates escalation ID, starts async background task
4. **Level Loop**: For each level 1-max_level:
   - Generate message via personality service (Claude Haiku) parameterized by channel
   - Check for response/payment (pauses escalation if detected)
   - Dispatch to channel handler (Resend, Twilio, Slack, etc.)
   - Emit SSE events: `level_start` → `audio` → `level_complete`
   - Stream Karen's internal commentary
   - Wait configured interval (5s demo, 10s audio, 10m, 1h, 1d)
5. **De-escalation** (if payment/response detected & operator confirmed):
   - Sequential teardown: Remove from Open Matters → Delete Slack/Discord → Cancel Calendar → Cancel FedEx → Send apologies
   - Emit `deescalation_step` events with status
6. **Resolution**: Escalation marked `resolved`, Karen's closing line sent

### Message Generation Pipeline

```
Personality Markdown (openclaw/personalities/[name].md)
        ↓
ClaudeHaiku API Call
  - System: personality prompt + channel rules
  - User: level context + initiator + target + grievance
  - Output: JSON { "subject": "", "body": "" } or { "body": "" }
        ↓
JSON parsing + fence stripping (markdown code blocks)
        ↓
Channel-specific validation
        ↓
Send via handler (Resend, Twilio, etc.)
```

### State Management

- **In-memory only** (no database): escalation dict, event queues, background tasks
- **Escalation object**: id, initiator, target, grievance, personality, speed, max_level, current_level, status, messages_sent, channels_used, event_history
- **Event history**: buffered in escalation object for late subscribers (SSE reconnect recovery)
- **Member data**: loaded from circle.json at startup, kept in module-level dict

---

## Directory Structure

```
karen/
├── README.md                     ← User-facing overview + demo instructions
├── CLAUDE.md                     ← Authoritative technical spec (800+ lines)
├── dev.sh                        ← Single-command startup script
├── docker-compose.yml            ← OpenClaw + backend services
├── PROGRESS.md                   ← Current completion status
├── NEXT_STEPS.md                 ← Outstanding tasks
├── FRONTEND_CHANGES.md           ← UI iteration notes
│
├── openclaw/                     ← Karen's brain + personality
│   ├── SKILL.md                  ← Escalation logic spec
│   ├── HEARTBEAT.md              ← Response monitoring loop
│   ├── personalities/
│   │   ├── passive_aggressive.md ← "He was online. I noticed."
│   │   ├── corporate.md          ← "Per my last communication..."
│   │   ├── genuinely_concerned.md ← "I just don't want this to become a thing"
│   │   └── life_coach.md         ← "Energetic blocks, accountability muscles"
│   └── templates/
│       └── formal_letter.html    ← FedEx letter template (jinja2)
│
├── backend/                      ← FastAPI service
│   ├── main.py                   ← FastAPI app, CORS, startup (loads circle.json)
│   ├── requirements.txt           ← Python dependencies
│   ├── Dockerfile                ← Container image
│   ├── .env.example              ← Template for API keys
│   │
│   ├── routers/
│   │   ├── escalation.py         ← POST /api/trigger, GET /api/escalation/:id/stream
│   │   ├── members.py            ← GET/POST /api/members, available channels check
│   │   ├── webhook.py            ← Payment webhooks (Venmo, manual confirm)
│   │   └── audio.py              ← GET /api/audio/{path} serves quip MP3s
│   │
│   ├── services/
│   │   ├── karen_service.py      ← 500+ lines: escalation orchestration, level loop
│   │   ├── personality_service.py ← Claude message generation (4 personalities)
│   │   ├── channel_service.py    ← Dispatch handlers: email, SMS, calendar, etc.
│   │   ├── audio_service.py      ← ElevenLabs TTS, quip playback queue
│   │   ├── research_service.py   ← OSINT pre-cached animations
│   │   ├── deescalation_service.py ← Sequential teardown logic
│   │   ├── pdf_service.py        ← WeasyPrint letter generation
│   │   ├── slack_service.py      ← Slack bot token + message posting
│   │   ├── calendar_service.py   ← Google Calendar API (service account)
│   │   ├── fedex_service.py      ← FedEx API sandbox rate quotes
│   │   └── llm_provider.py       ← Abstract LLM provider (Anthropic, OpenAI, GenAI)
│   │
│   ├── models/
│   │   └── schemas.py            ← Pydantic: Member, Escalation, Event types
│   │
│   ├── scripts/
│   │   └── generate_quips.py     ← One-time: Creates 60 voice quips via ElevenLabs
│   │
│   ├── data/
│   │   ├── circle.json           ← 5 pre-seeded members (Rahil, Bharath, Chinmay, etc.)
│   │   ├── research_cache.json   ← Fake OSINT discoveries (pre-populated)
│   │   ├── legal_letter_template.md ← Letter body template
│   │   └── audio/
│   │       ├── quips/
│   │       │   ├── passive_aggressive/ (15 MP3s)
│   │       │   ├── corporate/        (15 MP3s)
│   │       │   ├── genuinely_concerned/ (15 MP3s)
│   │       │   └── life_coach/       (15 MP3s)
│   │       └── music/
│   │           └── hold-music.mp3    ← Jazz lounge BGM
│   │
│   └── __init__.py, etc.
│
└── frontend/                     ← Next.js 16 SPA
    ├── package.json              ← pnpm dependencies
    ├── tsconfig.json             ← TypeScript config
    ├── next.config.ts            ← Next.js config
    ├── tailwind.config.ts         ← Tailwind (dark theme, custom colors)
    │
    ├── src/
    │   ├── app/                  ← Next.js App Router pages
    │   │   ├── page.tsx          ← / (The Circle dashboard, fortress theme)
    │   │   ├── layout.tsx         ← Root layout, NavBar
    │   │   ├── globals.css        ← Global styles
    │   │   ├── pixel-theme.css    ← Pixel arena CSS
    │   │   ├── trigger/
    │   │   │   └── page.tsx       ← /trigger (escalation form)
    │   │   ├── escalation/
    │   │   │   ├── [id]/
    │   │   │   │   ├── page.tsx   ← /escalation/[id] (main live view)
    │   │   │   │   ├── layout.tsx ← Layout for escalation pages
    │   │   │   │   └── game/
    │   │   │   │       └── page.tsx ← /escalation/[id]/game (pixel arena)
    │   │   ├── open-matters/
    │   │   │   └── page.tsx       ← /open-matters (GitHub-driven accountability table)
    │   │   ├── arsenal/
    │   │   │   └── page.tsx       ← /arsenal (10-level breakdown + lore)
    │   │   ├── karen/
    │   │   │   └── page.tsx       ← /karen (lore page)
    │   │   └── join/
    │   │       └── page.tsx       ← /join (3-screen onboarding)
    │   │
    │   ├── components/            ← 30+ UI components
    │   │   ├── FortressLayout.tsx      ← Dark fortress theme wrapper
    │   │   ├── LevelCard.tsx           ← Individual escalation level card
    │   │   ├── LevelTimeline.tsx       ← Vertical card stack animation
    │   │   ├── KarenSidebar.tsx        ← Live commentary chat bubble
    │   │   ├── CommentaryLog.tsx       ← Typewriter commentary stream
    │   │   ├── EscalationTower.tsx     ← Level progression visualization
    │   │   ├── OpenMattersTable.tsx    ← Accountability registry
    │   │   ├── RegistryTable.tsx       ← Generic table for dossiers
    │   │   ├── MemberCard.tsx          ← Circle member card
    │   │   ├── KarenBossCard.tsx       ← Karen's status/avatar
    │   │   ├── OnboardingFlow.tsx      ← 3-screen join flow
    │   │   ├── ResearchAnimation.tsx   ← OSINT discovery animation
    │   │   ├── ProviderToggle.tsx      ← AI provider selector
    │   │   ├── TransmissionFeed.tsx    ← Live escalation feed
    │   │   ├── ArsenalCard.tsx, ArsenalDetailPanel.tsx ← Arsenal breakdown
    │   │   ├── OpenClawCoreCard.tsx    ← OpenClaw spec viewer
    │   │   ├── ThreatBadge.tsx         ← Level indicator + color
    │   │   ├── PixelStatBar.tsx        ← Drifting stat counters
    │   │   ├── TorchDecoration.tsx, RuneDivider.tsx, etc. ← Theme elements
    │   │   │
    │   │   └── game/                   ← Pixel arena game mode
    │   │       ├── PixelArenaGame.tsx     ← Main game container
    │   │       ├── EscalationTowerScene.tsx ← Tower visualization
    │   │       ├── TowerChamber.tsx       ← Individual level chamber
    │   │       ├── CrabPlayer.tsx         ← Karen crab sprite
    │   │       ├── TargetSprite.tsx       ← Target sprite
    │   │       ├── ChannelArtifact.tsx    ← Channel icons/artifacts
    │   │       ├── OpenClawCorePanel.tsx  ← Core panel
    │   │       ├── EscalationTowerScene.tsx ← Tower scene
    │   │       └── KarenGameMode.tsx      ← Game orchestration
    │   │
    │   ├── hooks/                 ← Custom React hooks
    │   │   ├── useEscalation.ts   ← SSE connection + event handling
    │   │   ├── useCircle.ts       ← Members state + trigger action
    │   │   ├── useKarenAudio.ts   ← Audio queue (quips + commentary)
    │   │   ├── useBackgroundMusic.ts ← Hold music + Web Audio distortion
    │   │   ├── useEventGameState.ts ← Game state machine
    │   │   └── useArenaGameLoop.ts ← Game animation loop
    │   │
    │   ├── contexts/              ← React Context
    │   │   └── EscalationContext.tsx ← Shared escalation + audio state
    │   │
    │   └── lib/                   ← Utilities
    │       ├── types.ts           ← TypeScript types (Escalation, Member, Event)
    │       ├── constants.ts        ← API_URL, API_HEADERS, level colors, etc.
    │       ├── fortress-data.ts    ← Sample dossiers, ritual buttons
    │       └── [helpers]
    │
    └── node_modules/, pnpm-lock.yaml
```

---

## Key Components

### 1. Karen Orchestration Service (`backend/services/karen_service.py`)

Implements the 10-level escalation ladder. Core function: `run_escalation(escalation_id)` is async and runs in background. Features:
- Level loop with interval timing (5s, 10s, 10m, 1h, 1d configurable)
- Response/payment detection polling
- Available channels check before each send
- Ad-lib commentary generation (level-specific lines + waiting ad-libs)
- Event emission for SSE stream
- Personality-aware Karen's internal monologue

**In-Memory State**: Dict of escalations keyed by ID, event queues per escalation, background tasks, sequence counters for SSE reconnect recovery.

### 2. Personality Service (`backend/services/personality_service.py`)

Dynamically generates all Karen messages via Claude Haiku. For each level, takes:
- Personality enum (4 types)
- Channel (email, SMS, Discord, etc.)
- Escalation context (initiator, target, grievance, days outstanding)

Returns JSON with channel-specific fields (e.g., `{ "subject": "...", "body": "..." }` for email, `{ "body": "..." }` for SMS).

**Personality Prompts**: Loaded from `/openclaw/personalities/[name].md` (system prompt describes tone, emoji usage, pressure tactics per personality).

### 3. Channel Service (`backend/services/channel_service.py`)

10 handlers, one per channel:
- **email**: Resend API
- **email_cc**: Resend API (CC'd coworker)
- **sms**: Twilio SMS
- **whatsapp**: Twilio WhatsApp Business
- **voice_call**: Twilio phone call (TTS)
- **research**: Cached OSINT animation (no API call)
- **slack**: Slack Bot API webhook
- **discord**: Discord Bot API
- **calendar**: Google Calendar API (service account)
- **github**: GitHub REST API (commits to portfolio repo)
- **fedex**: FedEx Shipping API (sandbox)

Each handler returns `ChannelResult(channel, success, detail, metadata)`. Graceful failures (missing contact = skip, don't crash).

### 4. Audio Service (`backend/services/audio_service.py`)

Two modes:
- **Quips**: 60 pre-recorded MP3s (15 per personality), played instantly when level fires
- **Commentary**: Generated on-the-fly via ElevenLabs during countdown, personalized to escalation

Frontend queues audio via `useKarenAudio()` hook, plays sequentially with volume ducking (music drops to 20% when Karen speaks).

### 5. SSE Stream (`backend/routers/escalation.py`)

`GET /api/escalation/{id}/stream` streams events as `text/event-stream`. Event types include:
- `escalation_started`, `level_start`, `level_complete`, `level_skipped`
- `commentary`, `response_detected`, `payment_detected`
- `deescalation_step`, `complete`, `error`
- `audio`, `research_step`, `research_discovery`, `fedex_rate`

Supports reconnect recovery via `last_seq` query param (only returns events after that sequence).

### 6. Frontend Live View (`frontend/src/app/escalation/[id]/page.tsx`)

Two-column layout:
- **Left**: Escalation timeline (level cards slide in from right, show progress bar, countdown)
- **Right**: Karen's commentary sidebar (typewriter effect, timestamps)

Uses `useEscalation()` hook to connect to SSE, `useKarenAudio()` for voice playback, `useBackgroundMusic()` for hold music + progressive Web Audio distortion.

### 7. Game Mode (`frontend/src/components/game/PixelArenaGame.tsx`)

Alternative UI with pixel art aesthetic. Karen (crab sprite) vs. target sprite across escalation tower chambers. Channels visualized as artifacts. Twitchy animations, corruption effects as escalation climbs.

### 8. De-escalation Service (`backend/services/deescalation_service.py`)

Sequential teardown (in order):
1. Remove from Open Matters (GitHub commit)
2. Delete Slack message
3. Delete Discord post
4. Delete Calendar event
5. Cancel FedEx shipment (fails honestly if shipped)
6. Send apology email to target
7. Send apology to CC'd contacts
8. Send apology to the apology ("caused confusion")

Each step emitted as SSE event with status (ok/failed), followed by Karen's closing line: "All resolved. Relationships restored. Is there anyone else you'd like me to follow up with?"

---

## APIs & Integrations

| Provider | Level(s) | Auth | Required? |
|----------|----------|------|-----------|
| **Anthropic Claude** | All (message gen) | API key | Yes |
| **Resend** | 1, 5 | API key | Yes (email) |
| **Twilio** | 2, 3 | Account SID + token | Yes (SMS/call) |
| **Google Calendar** | 8 | Service account JSON | Yes (calendar invite) |
| **Slack** | 6 | Bot token | Yes (workspace post) |
| **Discord** | 7 | Bot token | Yes (server announce) |
| **GitHub** | 9 | Fine-grained PAT | Yes (commit) |
| **FedEx** | 10 | API key + secret + acct | Optional (sandbox demo) |
| **ElevenLabs** | Audio | API key | Yes (voice) |
| **OpenAI** | All (fallback) | API key | No (backup) |
| **Google GenAI** | All (fallback) | API key | No (backup) |

**Contact Resolution**: Karen checks available channels per target. If contact has FILL_BEFORE_DEMO or is empty, that channel is skipped (not all levels execute for all targets).

---

## Development Setup

### Prerequisites
- Docker + Docker Compose
- Node.js 18+ (pnpm)
- Python 3.10+
- API keys (Anthropic, Resend, Twilio, Google, Slack, Discord, GitHub, FedEx, ElevenLabs)

### Quick Start

```bash
cp backend/.env.example backend/.env
# Fill in API keys
echo 'NEXT_PUBLIC_API_URL=http://localhost:8000' > frontend/.env.local
./dev.sh
# Opens http://localhost:3000
```

### Manual Setup

```bash
# 1. Backend
docker compose up -d  # Starts OpenClaw + FastAPI on :8000
pip install -r backend/requirements.txt
python backend/main.py

# 2. Frontend
cd frontend
pnpm install
pnpm dev  # On :3000

# 3. Generate audio (one-time)
docker compose exec backend python scripts/generate_quips.py
```

### Environment Variables (Backend)

**AI**: ANTHROPIC_API_KEY
**Email**: RESEND_API_KEY, KAREN_FROM_EMAIL
**SMS**: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER
**Slack**: SLACK_BOT_TOKEN, SLACK_CHANNEL_ID
**Discord**: DISCORD_BOT_TOKEN, DISCORD_CHANNEL_ID
**Google**: GOOGLE_CALENDAR_CREDENTIALS (path), GOOGLE_CALENDAR_ID, GITHUB_TOKEN, GITHUB_REPO
**FedEx**: FEDEX_API_KEY, FEDEX_API_SECRET, FEDEX_ACCOUNT_NUMBER, FEDEX_SENDER_ZIP
**Audio**: ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID
**App**: CORS_ORIGINS, ESCALATION_DEMO_INTERVAL_SECONDS, SECRET_KEY

### Services Running

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| OpenClaw Reasoning | http://localhost:18789 |
| Health check | GET http://localhost:8000/health |

---

## Current State

### Implemented
- 10-level escalation ladder, all channels integrated
- 4 personalities (Claude-generated, no hardcodes)
- Real-time SSE streaming with reconnect recovery
- Live escalation timeline UI (level cards, progress bars)
- Karen's internal monologue sidebar (typewriter effect)
- Audio: 60 quips + on-the-fly commentary + hold music with progressive Web Audio distortion
- Game mode: pixel arena with crab/target sprites
- De-escalation teardown sequence (8 steps)
- Circle management: 5 pre-seeded members, CRUD endpoints
- Open Matters: GitHub-driven accountability page
- Onboarding flow (/join): 3-screen signup
- Arsenal page: 10-level breakdown with lore
- Karen lore page: background story
- Response/payment detection (pauses escalation)
- Contact resolution: graceful channel skipping for missing info
- PDF generation: FedEx formal letter (print-ready)
- Docker Compose: one-command local setup

### Known Limitations / Incomplete
- Database: In-memory only (escalations cleared on restart—acceptable for hackathon demo)
- FedEx integration: Sandbox only (not shipping real letters)
- Audio quips: Pre-generated only (can't customize per-escalation)
- Research OSINT: Pre-cached (not live web scraping)
- Twilio voice: Text-to-speech via Twilio (not Karen's ElevenLabs voice on calls)
- Member avatars: Hardcoded emoji (no custom images)
- Payment webhook: Manual "Resolve" button (Venmo webhook stub)

### Testing Notes
- Demo target: Bharath (briefed, Venmo open)
- Demo speed: 5s intervals (or 10s with audio)
- All 10 levels fire sequentially, no real payouts execute
- De-escalation verified (removes from Open Matters, deletes Slack/Discord, etc.)
- Live demo: successful full run shown at MischiefClaw Hackathon
