---
title: "KAREN Project: Multi-Channel Escalation Engine"
author: ai
created_at: 2026-04-10T12:53:51.220Z
last_ai_edit: 2026-04-10T12:53:51.220Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/repo-profiles/karen-project-profile.md]]"
tags:
  - hackathon
  - escalation
  - ai
  - llm
  - fastapi
  - next.js
  - openclaw
  - multi-channel
  - webhook
  - sse
  - audio
  - de-escalation
  - mockery
  - dark-humor
  - python
  - typescript
  - vercel
  - docker
  - api-integration
  - mischiefclaw
---

# KAREN Project: Multi-Channel Escalation Engine

KAREN is an OpenClaw-powered, multi-channel escalation engine developed for the MischiefClaw Hackathon. It acts as a mischievous follow-up agent, treating non-responses as crises and systematically escalating through 10 distinct communication channels with 4 interchangeable AI personalities. The project combines dark humor with robust technical infrastructure to demonstrate the absurdity of aggressive follow-up tactics through an interactive, demo-centric experience.

## Key Concepts

Multi-channel escalation,AI personalities,OpenClaw reasoning engine,Real-time Server-Sent Events (SSE),De-escalation sequencing,In-memory state management,Hackathon project development,Dark humor in software design

## Details

KAREN is an OpenClaw-powered multi-channel escalation engine, conceived during the MischiefClaw Hackathon. It functions as an aggressive, AI-driven follow-up agent designed to escalate non-responses across 10 distinct communication channels, leveraging 4 interchangeable AI personalities. The project aims to highlight the absurdity of persistent follow-up tactics through a technically sophisticated yet humorously framed interactive demonstration. The system is functionally complete, deployed to Vercel for the frontend, with a local FastAPI backend, and was ready for a live demo at the MischiefClaw Hackathon.

### Tech Stack

**Frontend:**
*   Next.js 16.2.2 (App Router, TypeScript, SSR)
*   React 19.2.4, React DOM 19.2.4
*   Tailwind CSS 4 with PostCSS
*   Framer Motion 12.38.0 (animations, transitions)
*   DM Mono typography (@fontsource/dm-mono)
*   Web Audio API for music distortion effects

**Backend:**
*   FastAPI 0.115.0 (async Python web framework)
*   Uvicorn 0.34.0 (ASGI server)
*   Pydantic 2.10.0 (data validation, schemas)
*   SSE-Starlette 2.2.0 (Server-Sent Events streaming)
*   Python 3.x (async/await throughout)

**AI & LLM:**
*   Anthropic Claude API (Haiku 4.5 for message generation)
*   OpenAI SDK 1.0.0 (fallback provider)
*   Google GenAI 1.14.0 (optional provider)
*   OpenClaw reasoning engine (orchestration via markdown specs)

**Integrations & APIs:**
*   Resend (email delivery via API)
*   Twilio (SMS, WhatsApp, voice calls via SID + token)
*   Slack Bot API (channel messaging)
*   Discord Bot API (server announcements)
*   Google Calendar API (event creation via service account)
*   GitHub API (commits to rahilsinghi/portfolio repo)
*   FedEx Shipping API (sandbox for rate quotes & labels)
*   ElevenLabs 1.0.0 (text-to-speech, Rachel voice ID: 21m00Tcm4TlvDq8ikWAM)

**Document Generation:**
*   WeasyPrint 63.0 (HTML-to-PDF for legal letters)
*   QRCode 7.4.2 (for onboarding)
*   Pillow 10.0.0 (image handling)

**Infrastructure:**
*   Docker Compose (local dev: OpenClaw + backend services)
*   Vercel (frontend hosting)
*   Google Cloud (service account for Calendar API)
*   ngrok (optional tunnel for webhooks)

### Architecture

#### System Diagram

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

#### Data Flow — Escalation Cycle

1.  **Trigger**: User submits a form with initiator, target, grievance, personality, speed, and max level.
2.  **Validation**: Karen verifies available channels for the target.
3.  **Orchestration**: A unique escalation ID is created, and an async background task starts.
4.  **Level Loop**: For each level from 1 to `max_level`:
    *   Messages are generated via the personality service, parameterized by channel.
    *   The system checks for response/payment, pausing escalation if detected.
    *   Messages are dispatched to the appropriate channel handler (Resend, Twilio, Slack, etc.).
    *   SSE events (`level_start`, `audio`, `level_complete`) are emitted.
    *   Karen's internal commentary is streamed.
    *   A configured interval is observed before proceeding (e.g., 5s, 10s, 10m, 1h, 1d).
5.  **De-escalation** (if payment/response detected and operator confirmed):
    *   A sequential teardown process occurs: removal from Open Matters, deletion of Slack/Discord posts, cancellation of Calendar events, cancellation of FedEx (if applicable), and sending apologies.
    *   `deescalation_step` events are emitted with status.
6.  **Resolution**: The escalation is marked `resolved`, and Karen sends a closing line.

#### Message Generation Pipeline

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

#### State Management

Karen uses an **in-memory only** approach for state management, meaning no persistent database is used. Escalation objects, event queues, and background tasks are stored in dictionaries. The `escalation object` contains details like ID, initiator, target, grievance, current level, status, messages sent, and event history. `Event history` is buffered for late SSE subscribers. Member data is loaded from `circle.json` at startup and held in a module-level dictionary.

### Directory Structure

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
│   │   └── audio.py              ← GET /api/audio/{path} serves mp3s│
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

### Key Components

1.  **Karen Orchestration Service (`backend/services/karen_service.py`)**
    Implements the 10-level escalation ladder. The core `run_escalation(escalation_id)` function runs asynchronously in the background. It features a level loop with configurable interval timing, response/payment detection polling, checks for available channels before each send, ad-lib commentary generation, event emission for the SSE stream, and personality-aware internal monologue from Karen. State is managed entirely in-memory.

2.  **Personality Service (`backend/services/personality_service.py`)**
    Dynamically generates all Karen's messages using the Anthropic Claude Haiku API. For each escalation level, it takes the chosen personality, communication channel, and full escalation context (initiator, target, grievance, days outstanding). It returns channel-specific JSON outputs, guided by personality prompts loaded from `/openclaw/personalities/[name].md`.

3.  **Channel Service (`backend/services/channel_service.py`)**
    Contains 10 distinct handlers for various communication channels, including email (Resend), SMS/WhatsApp/voice calls (Twilio), Slack, Discord, Google Calendar, GitHub API, and FedEx Shipping (sandbox). Each handler returns a `ChannelResult` indicating success or failure, with graceful skipping for missing contact information.

4.  **Audio Service (`backend/services/audio_service.py`)**
    Manages two types of audio: 60 pre-recorded MP3 "quips" (15 per personality) for instant playback when a level fires, and on-the-fly commentary generated via ElevenLabs during countdowns. The frontend integrates these with volume ducking for background music.

5.  **SSE Stream (`backend/routers/escalation.py`)**
    Provides a real-time event stream (`GET /api/escalation/{id}/stream`) using `text/event-stream`. Event types include `escalation_started`, `level_start`, `commentary`, `deescalation_step`, `audio`, and others. It supports reconnect recovery using a `last_seq` query parameter.

6.  **Frontend Live View (`frontend/src/app/escalation/[id]/page.tsx`)**
    The primary UI, featuring a two-column layout: an escalation timeline (level cards, progress bars, countdown) on the left, and Karen's commentary sidebar (typewriter effect, timestamps) on the right. It uses custom React hooks for SSE connection, audio playback, and background music with progressive Web Audio distortion.

7.  **Game Mode (`frontend/src/components/game/PixelArenaGame.tsx`)**
    An alternative pixel-art interface that visualizes the escalation as a game. Karen is represented by a crab sprite engaging a target sprite across an escalation tower, with channels depicted as artifacts and visual corruption effects increasing with escalation intensity.

8.  **De-escalation Service (`backend/services/deescalation_service.py`)**
    Executes a sequential 8-step teardown process if an escalation is resolved. This includes removing data from "Open Matters" (via GitHub commit), deleting Slack/Discord messages, cancelling Calendar events and FedEx shipments, and sending apology emails, followed by a final closing line from Karen.

### APIs & Integrations

| Provider           | Level(s)            | Auth                      | Required? |
| :----------------- | :------------------ | :------------------------ | :-------- |
| **Anthropic Claude** | All (message gen)   | API key                   | Yes       |
| **Resend**         | 1, 5                | API key                   | Yes       |
| **Twilio**         | 2, 3                | Account SID + token       | Yes       |
| **Google Calendar**  | 8                   | Service account JSON      | Yes       |
| **Slack**          | 6                   | Bot token                 | Yes       |
| **Discord**        | 7                   | Bot token                 | Yes       |
| **GitHub**         | 9                   | Fine-grained PAT          | Yes       |
| **FedEx**          | 10                  | API key + secret + acct   | Optional  |
| **ElevenLabs**     | Audio               | API key                   | Yes       |
| **OpenAI**         | All (fallback)      | API key                   | No        |
| **Google GenAI**   | All (fallback)      | API key                   | No        |

Contact resolution is handled by Karen checking available channels for each target, gracefully skipping channels if contact information is missing or marked `FILL_BEFORE_DEMO`.

### Development Setup

**Prerequisites:**
*   Docker + Docker Compose
*   Node.js 18+ (pnpm)
*   Python 3.10+
*   API keys for all integrated services.

**Quick Start:**
```bash
cp backend/.env.example backend/.env
# Fill in API keys
echo 'NEXT_PUBLIC_API_URL=http://localhost:8000' > frontend/.env.local
./dev.sh
# Opens http://localhost:3000
```

**Manual Setup:**
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

**Environment Variables (Backend):**
Key environment variables include `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `TWILIO_ACCOUNT_SID`, `SLACK_BOT_TOKEN`, `DISCORD_BOT_TOKEN`, `GOOGLE_CALENDAR_CREDENTIALS`, `GITHUB_TOKEN`, `FEDEX_API_KEY`, and `ELEVENLABS_API_KEY`, among others.

**Services Running:**

| Service          | URL                      |
| :--------------- | :----------------------- |
| Frontend         | `http://localhost:3000`  |
| Backend API      | `http://localhost:8000`  |
| OpenClaw Reasoning | `http://localhost:18789` |
| Health check     | `GET http://localhost:8000/health` |

### Current State

**Implemented Features:**
*   Full 10-level escalation ladder with all channels integrated.
*   4 distinct AI personalities for Claude-generated messages.
*   Real-time SSE streaming with reconnect recovery.
*   Live escalation timeline UI with level cards and progress bars.
*   Karen's internal monologue sidebar featuring a typewriter effect.
*   Audio features: 60 pre-recorded quips, on-the-fly ElevenLabs commentary, and background music with progressive Web Audio distortion.
*   "Game Mode" with pixel arena visuals, crab/target sprites, and corruption effects.
*   Complete 8-step de-escalation teardown sequence.
*   Circle management with 5 pre-seeded members and CRUD endpoints.
*   "Open Matters" page driven by GitHub data for accountability.
*   3-screen onboarding flow (`/join`) and dedicated lore pages (`/arsenal`, `/karen`).
*   Response/payment detection to pause escalations.
*   Graceful contact resolution and channel skipping for missing information.
*   HTML-to-PDF generation for formal legal letters.
*   Simplified local setup via Docker Compose.

**Known Limitations / Incomplete Aspects:**
*   **Database**: Uses in-memory state only, meaning escalation data is cleared on server restarts.
*   **FedEx integration**: Operates in sandbox mode; no real shipments are made.
*   **Audio quips**: Pre-generated, lacking customization per specific escalation.
*   **Research OSINT**: Pre-cached animations are used instead of live web scraping.
*   **Twilio voice**: Employs Twilio's text-to-speech, not Karen's ElevenLabs voice for calls.
*   **Member avatars**: Hardcoded emojis, no support for custom images.
*   **Payment webhook**: Uses a manual "Resolve" button; Venmo webhook is a stub for demonstration.

**Testing Notes:**
*   Demonstrations typically targeted a specific individual (e.g., Bharath), with a mock Venmo interaction.
*   Demo speed was set to 5-10 second intervals.
*   All 10 levels were designed to fire sequentially without real financial payouts.
*   De-escalation was verified, confirming removal from Open Matters, deletion of Slack/Discord posts, etc.
*   A full successful run was demonstrated at the MischiefClaw Hackathon.

## Related

[[OpenClaw]],[[FastAPI]],[[Next.js]],[[Anthropic Claude]],[[Twilio]],[[ElevenLabs]],[[Server-Sent Events]],[[Hackathons]]
