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

# Ask NYC — Comprehensive Project Profile

## 1. Project Summary

**Ask NYC** is a multimodal voice-first urban intelligence platform that transforms NYC's public datasets into real-time, conversational answers. Built for the NYC Build With AI Hackathon (March 27-28, 2026), it powers two distinct UX patterns: (1) a **live voice + camera dashboard** where users point their phone at any NYC location and receive instant context about what they're looking at, and (2) an **AI-driven recommendation engine** that synthesizes data from 7 civic sources to answer complex queries like "best pizza near Washington Square Park" or "safest neighborhood for renting in Brooklyn near transit."

**Current Status:** MVP complete with end-to-end architecture implemented. Core demos functional with hardcoded fallbacks; live Gemini integration untested pending API key. Deployed live at [asknyc-frontend-901435891859.us-central1.run.app](https://asknyc-frontend-901435891859.us-central1.run.app) with full CI/CD pipeline. 4-person student team (Rahil Singhi, Bharath Gera, Chinmay Shringi, Sariya Rizwan).

**Who It's For:** NYC residents, tourists, and urban planners seeking structured intelligence about specific neighborhoods, buildings, and locations — powered by authoritative government data rather than opinion or training knowledge.

---

## 2. Tech Stack

| Layer | Technology | Version/Details |
|-------|-----------|-----------------|
| **AI Models** | Gemini 2.5 Flash Native Audio | Live voice + vision streaming via ADK |
| | Gemini 2.5 Flash (Text API) | Structured JSON output for query parsing + synthesis |
| **Agent Framework** | Google ADK (Agent Development Kit) | v1.27+, LlmAgent + Runner + LiveRequestQueue |
| **Backend** | FastAPI + Python | 3.12, async I/O, WebSocket + SSE streaming |
| **Frontend** | Next.js 15 + React 19 | TypeScript strict mode, App Router, CSS Modules + Tailwind v4 |
| **Styling** | Tailwind CSS v4 + Framer Motion | Glass morphism, dark theme only, spring physics animations |
| **Maps** | Mapbox GL JS 3.20 | 3D buildings, animated markers, dark theme |
| **UI Components** | Lucide React 1.7, custom components | Icons, card layouts, waveforms, agent status badges |
| **Data** | Socrata API (NYC Open Data) | 7 datasets, SoQL queries, no auth required <1000 rows |
| **Geocoding** | Google Maps Geocoding API | Address ↔ lat/lng resolution |
| **Deployment** | Google Cloud Run + Cloud Build + Artifact Registry | Auto-deploy on push to `main`, containerized backend + frontend |
| **Testing** | Playwright 1.58 | End-to-end testing (e2e suite not yet populated) |

---

## 3. Architecture

### System Overview

```
┌─────────────────────────────────────────────┐
│   FRONTEND (Next.js 15 @ port 3000)        │
│  /dashboard  /ask  /remote  /archive        │
└──────────────────────────────────────────────┘
         │ WebSocket        │ SSE      │ REST
         ▼                  ▼          ▼
┌─────────────────────────────────────────────┐
│   BACKEND (FastAPI @ port 8000)            │
│  /ws/dashboard  /ws/remote  /api/recommend │
│                                             │
│  Services:                                  │
│  • GeminiService (ADK orchestration)        │
│  • RecommendService (5-7 parallel agents)   │
│  • SocrataService (7 NYC datasets)          │
│  • GeocodingService (Google Maps)           │
│  • SessionService (JSON store)              │
└──────────────────────────────────────────────┘
         │                  │           │
         ▼                  ▼           ▼
┌─────────────────────────────────────────────┐
│   EXTERNAL SERVICES                        │
│  • Gemini 2.5 Flash Native Audio (ADK)      │
│  • Gemini 2.5 Flash (text, JSON)            │
│  • Google Maps Geocoding API                │
│  • NYC Socrata API (7 datasets)             │
└─────────────────────────────────────────────┘
```

### Data Flow: Live Voice Pipeline

User points phone camera at location, speaks question → **Remote WebSocket** → Backend relay → **Gemini Live ADK session** → Tool calls to Socrata queries (parallel) → Results summarized → Audio + data cards pushed back to **Dashboard WebSocket** → Dashboard plays audio, animates cards, drops map pins.

### Data Flow: Recommendation Pipeline

User types query on `/ask` → **SSE Stream POST /api/recommend** → Step 1: Gemini parses intent + location → Step 2: Geocode location (Google Maps) → Step 3: Run 5-7 Socrata queries in parallel (asyncio.gather) → Step 4: Gemini synthesizes scored recommendation cards → Stream events for agent progress, results, timing. Offline fallback: if backend unreachable, uses hardcoded demo sequences with timed animations.

### Key Patterns

- **ADK Multi-Agent:** Root coordinator agent (voice mode) delegates to 5 specialist sub-agents (food, housing, safety, construction, transit) via tool calls. ADK Runner handles tool execution automatically.
- **WebSocket Multiplexing:** One session_id routes messages between `/ws/dashboard` and `/ws/remote`. Dashboard initiates session, remote joins via QR code + session_id.
- **SSE Streaming:** Recommend pipeline pushes agent progress events (parse → agents running → synthesis → results) to frontend via asyncio.Queue. No data loss on disconnect.
- **Heartbeat:** 25-second pongs keep WebSocket alive through proxies; no-op on idle.
- **Demo Fallback:** `/ask` page has hardcoded agent sequences + recommendation cards. If backend is unreachable, clicking a demo prompt plays full animation sequence client-side.

---

## 4. Directory Structure

```
AskNYC/
├── README.md                               # Main documentation
├── NEXT.md                                 # Roadmap & blockers (March 28, 2026)
├── .impeccable.md                         # Design system (dark, glass, Syne/DM Mono)
├── cloudbuild.yaml                        # CI/CD: auto-deploy on push to main
├── dev.sh                                 # Local dev launcher script

├── backend/
│   ├── main.py                            # FastAPI entry point, CORS, lifespan setup
│   ├── Dockerfile                         # Python 3.12-slim, uvicorn on $PORT
│   ├── requirements.txt                   # fastapi, uvicorn, google-adk, pydantic, httpx
│   ├── .env.example                       # Template for GOOGLE_GEMINI_API_KEY, MAPS key
│   ├── routers/
│   │   ├── ws.py                          # WebSocket /dashboard + /remote endpoints
│   │   └── recommend.py                   # SSE /api/recommend endpoint
│   ├── services/
│   │   ├── gemini_service.py              # ADK LlmAgent, Gemini Live orchestration
│   │   ├── recommend_service.py           # Multi-agent recommendation pipeline
│   │   ├── socrata_service.py             # 7 NYC Open Data query functions
│   │   ├── geocoding_service.py           # Google Maps geocoding
│   │   └── session_service.py             # In-memory + file-backed session store
│   ├── models/
│   │   └── schemas.py                     # Pydantic models for all message types
│   ├── tests/
│   │   ├── test_voice_pipeline.py         # (Placeholder)
│   │   └── test_bugfix_pipeline.py        # (Placeholder)
│   └── venv/                              # Python virtual environment

├── frontend/
│   ├── app/
│   │   ├── page.tsx                       # Splash page (landing, search, demo cards)
│   │   ├── dashboard/page.tsx             # Main dashboard (3D map + voice)
│   │   ├── ask/page.tsx                   # Recommendation engine page
│   │   ├── remote/page.tsx                # Phone remote (camera + mic input)
│   │   ├── archive/page.tsx               # Session history with filters
│   │   ├── insights/page.tsx              # Aggregate analytics
│   │   ├── sessions/page.tsx              # Live session management (placeholder)
│   │   ├── layout.tsx                     # Root layout, metadata
│   │   └── globals.css                    # Global styles, glass morphism, dark theme
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── DashboardLayout.tsx        # 3-column layout: sidebar, map, brief
│   │   │   ├── Sidebar.tsx                # Icon navigation
│   │   │   ├── MiniMap.tsx                # Mapbox 3D map (hero element)
│   │   │   ├── CameraFeed.tsx             # Phone camera preview + PiP mode
│   │   │   ├── MapFloatingCard.tsx        # Data cards floating on map
│   │   │   ├── IntelligenceBrief.tsx      # Right panel (transcript, cards, tools)
│   │   │   ├── DataCard.tsx               # Individual data card with animations
│   │   │   ├── Waveform.tsx               # Audio waveform visualization
│   │   │   ├── SearchInput.tsx            # Text input for dashboard queries
│   │   │   └── MapCardOverlay.tsx         # Connector lines between cards and pins
│   │   ├── ask/
│   │   │   ├── QueryInput.tsx             # Input field + 4 demo prompt buttons
│   │   │   ├── ProgressTimeline.tsx       # Visual pipeline: PARSE → AGENTS → SYNTHESIS
│   │   │   ├── AgentGrid.tsx              # Grid of agent status cards
│   │   │   ├── AgentCard.tsx              # Individual agent (running/complete state)
│   │   │   └── RecommendationCard.tsx     # Scored recommendation with badges + reasoning
│   │   ├── remote/
│   │   │   └── MicButton.tsx              # Push-to-talk button
│   │   ├── SearchInput.tsx                # Reusable search input
│   │   ├── EvidenceCard.tsx               # Demo card on splash
│   │   ├── BootScreen.tsx                 # 7-sec intro animation
│   │   └── SettingsPanel.tsx              # Volume, demo mode toggle
│   ├── hooks/
│   │   ├── useWebSocket.ts                # useDashboardWs + useRemoteWs
│   │   ├── useRecommend.ts                # SSE client, demo fallback, state mgmt
│   │   ├── useAudioPlayer.ts              # Sequential PCM 24kHz playback
│   │   ├── useCameraCapture.ts            # getUserMedia + 1fps JPEG capture
│   │   ├── useDemoMode.ts                 # Demo animation sequences
│   │   └── useSettings.ts                 # Settings state (volume, demo toggle)
│   ├── lib/
│   │   ├── types.ts                       # TypeScript interfaces (WsMessage, DataCard, etc.)
│   │   └── constants.ts                   # WS_URL, colors, Socrata dataset IDs
│   ├── package.json                       # pnpm dependencies
│   ├── tsconfig.json                      # Strict mode, ES2017, path aliases
│   ├── next.config.ts                     # Output: standalone, turbopack enabled
│   ├── tailwind.config.ts                 # Tailwind v4, dark theme, custom colors
│   ├── .env.local.example                 # NEXT_PUBLIC_WS_URL, MAPBOX_TOKEN
│   └── Dockerfile                         # Multi-stage Next.js 15 build + node:20

├── docs/
│   ├── architecture.html                  # Animated architecture diagram
│   ├── architecture.mmd                   # Mermaid diagram source
│   ├── google-products.html                # Google products used visualization
│   ├── DATA_SOURCES.md                    # Socrata API reference + dataset details
│   └── STITCH_PROMPT.md                   # Design system deep dive

└── team/
    └── [Team collaboration docs]
```

---

## 5. Key Components

### 5.1 **GeminiService** (`backend/services/gemini_service.py`)
Orchestrates Gemini Live ADK sessions for voice mode. Root coordinator agent listens to real-time audio/video from phone, identifies location from camera frame, selects appropriate topic (food_safety, housing, safety, construction, transit, general), and delegates to specialist sub-agents. Uses `LiveRequestQueue` to relay PCM 16kHz audio + JPEG frames to Gemini Live. Handles tool calls to Socrata queries, summarizes results (≤200 tokens), and streams audio output + data cards back to dashboard. Implements 20ms relay loop for low-latency audio streaming. **Status:** Code complete, untested with real API key.

### 5.2 **RecommendService** (`backend/services/recommend_service.py`)
Multi-agent orchestration for the `/ask` page. Parses user query with Gemini (location + intent extraction), geocodes location (Google Maps), then launches 5-7 parallel Socrata agents based on intent (food → Restaurant Inspections, 311, NYPD, Subway; housing → HPD Violations, Evictions, 311, NYPD, Subway, etc.). All results streamed as SSE events (agent status updates, plan details, recommendations). Final synthesis step scores each result by multiple criteria (hygiene, complaints, safety, transit) and returns ranked cards with reasoning bullets and data-backed badges. **Status:** Complete, tested locally with demo fallback.

### 5.3 **SocrataService** (`backend/services/socrata_service.py`)
Wrapper around NYC Socrata API (data.cityofnewyork.us). 7 functions: `query_restaurant_inspections` (grade, violations), `query_311_complaints` (noise, heat, water, rodent), `query_dob_permits` (active construction), `query_hpd_violations` (severity A/B/C), `query_nypd_incidents` (crimes by type), `query_evictions` (displacement), `query_subway_entrances` (transit access). All queries are async, geofiltered by lat/lng + radius (default 500m), return dict summarized for LLM consumption. No auth required for <1000 row queries. **Status:** All functions complete and tested.

### 5.4 **Dashboard WebSocket Handler** (`backend/routers/ws.py`)
Two endpoints: `/ws/dashboard` (main screen) and `/ws/remote` (phone). Dashboard creates new GeminiSession, generates session_id (8 chars), and returns QR code URL for pairing. Remote connects with session_id, sends video frames (1fps JPEG 768x768) + audio (PCM 16kHz). Backend relays frames/audio to Gemini Live via LiveRequestQueue. On tool calls, Socrata queries run; results pushed back to dashboard as data_cards + audio chunks. Heartbeat (25s pongs) prevents proxy timeouts. **Status:** Implemented, untested with Gemini Live API.

### 5.5 **Recommendation API** (`backend/routers/recommend.py`)
SSE endpoint: POST /api/recommend with JSON body `{query: string}`. Launches `RecommendService.run_pipeline()` in background, yields SSE events from asyncio.Queue (plan, agent_update, agent_complete, recommendation, synthesis_complete). Frontend SSE client receives events and updates UI in real time. **Status:** Complete, tested.

### 5.6 **Dashboard Component** (`frontend/app/dashboard/page.tsx`)
Hero page. Integrates MiniMap (Mapbox 3D, hero element, animated markers), CameraFeed (phone camera preview), IntelligenceBrief (right panel: transcript, data cards, tool badges), Sidebar (navigation). Uses `useDashboardWs()` hook to receive real-time data. Handles URL params (`?location=empire-state-building`, `?demo=restaurant`) for deep linking + demo scenarios. Demo fallback injects hardcoded cards + animations if backend unreachable. **Status:** Complete, tested.

### 5.7 **Ask Page Component** (`frontend/app/ask/page.tsx`)
Recommendation engine UI. QueryInput (text field + 4 demo buttons), ProgressTimeline (pipeline stages), AgentGrid (agent cards showing status), RecommendationCard (scored results with badges + reasoning). Uses `useRecommend()` hook (SSE client, demo fallback). On idle: shows hero heading "Ask NYC Anything" + feature pills (7 Datasets, Real-Time, <10s). On running: shows progress timeline + agent cards working in parallel. On complete: shows ranked recommendation cards. Demo sequences have hardcoded timing + animations for offline use. **Status:** Complete, tested.

### 5.8 **useWebSocket Hook** (`frontend/hooks/useWebSocket.ts`)
Manages WebSocket connection to `/ws/dashboard`, parses incoming WsMessages, maintains state (agentState, cards, pins, transcript, etc.). Handles audio playback via Web Audio API (sequential scheduling, 24kHz decoding). Implements auto-reconnect on disconnect. Includes `sendQuery(image, text)` to submit queries. Remote variant (`useRemoteWs`) handles camera + mic stream capture for phone. **Status:** Complete, untested with real WebSocket stream.

---

## 6. APIs & Integrations

### External Services

| Service | Endpoint | Auth | Purpose | Dataset |
|---------|----------|------|---------|---------|
| **Gemini 2.5 Flash Native Audio** | `google.genai` SDK (ADK) | API Key (`GOOGLE_GEMINI_API_KEY`) | Live voice + vision streaming, tool calling | N/A |
| **Gemini 2.5 Flash** | `google.genai` REST | API Key | Query parsing, synthesis (JSON output) | N/A |
| **Google Maps Geocoding** | `maps.googleapis.com/maps/api/geocode/json` | API Key (`GOOGLE_MAPS_API_KEY`) | Address/business name → lat/lng | N/A |
| **NYC Socrata API** | `data.cityofnewyork.us/resource/{endpoint}.json` | Optional app token (`SOCRATA_APP_TOKEN`) | 7 civic datasets via SoQL | Health, Safety, Permits, Violations, Evictions, Transit, Complaints |
| **Mapbox GL JS** | `api.mapbox.com` | Token (`NEXT_PUBLIC_MAPBOX_TOKEN`) | 3D vector map, dark theme, marker rendering | N/A |

### Socrata Datasets

| Dataset | Endpoint | Records | Query Pattern | Data Fresh |
|---------|----------|---------|---------------|------------|
| Restaurant Inspections | `43nn-pn8j` | 40M+ | name OR geo-radius | Daily |
| 311 Service Requests | `erm2-nwe9` | 40M+ | geo-radius + complaint type | Real-time |
| DOB Permit Issuance | `ipu4-2q9a` | 500K | geo-radius | Daily |
| HPD Violations | `wvxf-dwi5` | 5M | geo-radius + severity | Daily |
| NYPD Complaint Data YTD | `5uac-w243` | 500K | geo-radius + crime type | Daily |
| Evictions | `6z8x-wfk4` | 50K | geo-radius + zip | Monthly |
| Subway Entrances | `i9wp-a4ja` | 500 | geo-radius | Static |

Standard query: `$where=within_circle(the_geom, lat, lng, radius_meters)` with `$limit=50`, sorted by recency.

### WebSocket Message Protocol

**Dashboard → Backend:**
- `{type: "dashboard_query", image: string, text: string}` — Submit image + text query

**Remote → Backend:**
- `{type: "video_frame", data: string}` — JPEG 768x768 base64
- `{type: "audio_frame", data: string}` — PCM 16kHz mono base64
- `{type: "user_start_speaking" / "user_stop_speaking"}` — Voice activity events

**Backend → Dashboard:**
- `{type: "audio_chunk", data: string}` — PCM 24kHz base64
- `{type: "data_card", card: DataCard}` — Structured insight (category, title, detail, source)
- `{type: "map_event", event: "pin"|"zoom"|"circle", lat, lng, source}` — Map visualization
- `{type: "transcript", text, speaker, partial}` — Live speech recognition
- `{type: "tool_call", tool, status, result_count}` — Data query progress
- `{type: "agent_state", state}` — Agent lifecycle (idle, listening, processing, speaking)
- `{type: "session_complete", session: SessionSummary}` — Session archival

---

## 7. Development Setup

### Prerequisites
- Python 3.12+
- Node.js 18+ (via fnm/nvm)
- pnpm (`npm install -g pnpm`)
- Google AI Studio API key ([aistudio.google.com/apikey](https://aistudio.google.com/apikey))
- Google Maps API key with Geocoding enabled ([console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials))
- Mapbox access token ([account.mapbox.com/access-tokens](https://account.mapbox.com/access-tokens))

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # macOS/Linux; Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `backend/.env`:
```
GOOGLE_GEMINI_API_KEY=your_gemini_key
GOOGLE_MAPS_API_KEY=your_maps_key
SOCRATA_APP_TOKEN=         # Optional
CORS_ORIGINS=http://localhost:3000
GOOGLE_GENAI_USE_VERTEXAI=FALSE
```

Run:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Health check: [localhost:8000/docs](http://localhost:8000/docs) (FastAPI Swagger UI)

### Frontend Setup
```bash
cd frontend
pnpm install
```

Create `frontend/.env.local`:
```
NEXT_PUBLIC_WS_URL=ws://localhost:8000
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

Run:
```bash
pnpm dev
```

Access: [localhost:3000](http://localhost:3000)

### Phone Remote Testing
1. Open `/dashboard` on laptop
2. Open `/remote` on phone (same WiFi)
3. Scan QR code OR enter session_id manually
4. Camera access requires HTTPS on mobile → use ngrok (`ngrok http 3000`) or deploy to Cloud Run

### Testing /ask Page Offline
No backend required. Click any demo prompt; hardcoded SSE sequences animate client-side with timed agent progress + recommendation cards. Backend unreachable gracefully falls back to demo.

---

## 8. Current State

### ✅ Complete & Working
- **Architecture:** Full end-to-end pipeline (voice → Gemini Live → Socrata → Dashboard)
- **Recommendation Engine:** SSE streaming, multi-agent orchestration, scoring + synthesis working locally
- **UI Components:** Dashboard, Ask page, Splash, Archive, Insights all functional
- **Socrata Queries:** All 7 datasets queryable, tested with sample coords
- **Mapbox Integration:** 3D map, animated pins, building extrusions rendering
- **Demo Fallback:** Hardcoded agent sequences + recommendation cards for offline use
- **CI/CD:** Cloud Build auto-deploys on push to `main`, both backend + frontend containerized
- **Deployment:** Live at us-central1 Cloud Run, auto-scaling enabled

### ⚠️ Untested (No Real API Key Yet)
- **Gemini Live ADK Session:** Code complete; untested with real GOOGLE_GEMINI_API_KEY
- **Live Audio Streaming:** WebSocket relay logic written; untested with real phone audio (PCM 16kHz → 24kHz)
- **Camera → Gemini Vision:** Frame capture implemented; untested with Gemini's ability to read text from JPEG frames
- **Audio Output:** Web Audio API playback written; untested with real 24kHz PCM chunks over WebSocket
- **Tool Calling on Voice Input:** ADK tool orchestration written; untested with real Gemini Live responses

### 🔴 Known Issues & Gaps
- **Gemini Live Timeout:** Sessions timeout after ~10 min inactivity; no auto-reconnect logic yet
- **Audio Latency:** 20ms relay loop may need tuning; chunks must stream immediately to avoid buffering
- **Context Window:** Socrata JSON results require ≤200 token summaries before feeding back to Gemini; logic exists but untested
- **Detection Overlay:** `CameraFeed.tsx` has UI; backend sends `detection` events but wiring incomplete
- **Sessions Page:** Placeholder only; no live session switching UI yet
- **Evictions Data:** Queries work but endpoint sometimes slow; may need filtering by recent only
- **Playwright Tests:** Infrastructure exists; test suite not populated
- **Mobile HTTPS:** `getUserMedia()` requires HTTPS on non-localhost; local dev needs ngrok workaround

### 📋 Test Coverage
- Unit tests: None yet
- E2E tests: Framework configured (Playwright), test suite not written
- Manual testing: Demo scenarios on splash page well-verified; live Gemini pipeline awaits API key

---

## 9. Deployment & Monitoring

**Production Environment:** Google Cloud Run (us-central1), auto-scaling

| Service | URL | Container | Region | Notes |
|---------|-----|-----------|--------|-------|
| Frontend | [asknyc-frontend-901435891859.us-central1.run.app](https://asknyc-frontend-901435891859.us-central1.run.app) | Next.js 15 standalone | us-central1 | Auto-deploys on push |
| Backend | [asknyc-backend-901435891859.us-central1.run.app](https://asknyc-backend-901435891859.us-central1.run.app) | FastAPI + Python 3.12 | us-central1 | Auto-deploys on push |
| Swagger API Docs | [/docs](https://asknyc-backend-901435891859.us-central1.run.app/docs) | FastAPI auto-generated | us-central1 | Interactive endpoint testing |

**CI/CD:** Google Cloud Build (`cloudbuild.yaml`)
- On push to `main`: builds Docker images for backend + frontend
- Pushes to Artifact Registry (`us-central1-docker.pkg.dev`)
- Deploys to Cloud Run with auto-scaling
- Total build time: ~3 min

**Logging:** Google Cloud Logging (centralized, searchable)

**Monitoring:** Health check via `/docs` endpoint; no custom metrics dashboard yet

---

## 10. Design System

**Theme:** Dark cinematic command-center aesthetic. All dark mode, no light mode.

**Color Palette:**
- Backgrounds: #0c0c0f (base), #07111D (midnight), #111115 (surface)
- Accents: #15BFD2 (electric cyan), #F2B35B (warm amber/gold), #41E4F4 (highlight cyan)
- Data-coded: #84cc16 (health), #3b82f6 (permits/safety), #f59e0b (complaints/violations), #ef4444 (NYPD), #a855f7 (evictions), #06b6d4 (transit)
- Glass: `bg-slate-950/40 backdrop-blur-2xl border-white/10`

**Typography:**
- Display: Syne (Google Font) — bold, uppercase, for titles
- UI/Body: DM Mono — monospace, all labels, metadata, technical text

**Principles:**
1. Map-first: 3D Mapbox is hero, UI floats as translucent overlays
2. Data has color: Every category has fixed accent color
3. Glass over solid: Panels use glass-morphism, never opaque
4. Animate with purpose: Entrance animations on data arrival, waveforms respond to agent state
5. Monospace precision: DM Mono for technical aesthetic

---

## 11. Quick References

**Environment Variables Checklist:**
```
BACKEND:
✓ GOOGLE_GEMINI_API_KEY        (CRITICAL — live mode)
✓ GOOGLE_MAPS_API_KEY          (required for geocoding)
✓ CORS_ORIGINS                 (http://localhost:3000 for dev)
○ SOCRATA_APP_TOKEN            (optional, raises rate limits)

FRONTEND:
✓ NEXT_PUBLIC_WS_URL           (ws://localhost:8000 for dev)
✓ NEXT_PUBLIC_MAPBOX_TOKEN     (required for map rendering)
```

**Key Files by Feature:**
- Voice pipeline: `backend/services/gemini_service.py`, `backend/routers/ws.py`
- Recommendations: `backend/services/recommend_service.py`, `frontend/app/ask/page.tsx`
- Dashboard: `frontend/app/dashboard/page.tsx`, `frontend/components/dashboard/*`
- Data queries: `backend/services/socrata_service.py`
- WebSocket: `frontend/hooks/useWebSocket.ts`

**Common Commands:**
```bash
# Start dev environment
./dev.sh  # Starts both backend + frontend

# Backend only
cd backend && uvicorn main:app --reload

# Frontend only
cd frontend && pnpm dev

# Deploy (triggers Cloud Build)
git push origin main

# View live logs
gcloud run logs read asknyc-backend --limit 100
```

---

**Last Updated:** March 28, 2026 | **Built by:** Rahil Singhi, Bharath Gera, Chinmay Shringi, Sariya Rizwan
