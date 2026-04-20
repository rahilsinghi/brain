---
status: pending
source_type: api
source_id: maison-monday-meeting-prep-2026-04-20
ingested_at: 2026-04-19T00:00:00Z
parsed_at: 2026-04-19T00:00:00Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Maison POC — Monday Meeting Prep (April 20, 2026)

**Purpose of this document:** Rahil's reference during the Monday Phase-1 lock-in meeting with Fredrik, Kim, Noel, and (async) Sandeep. Goal: walk out with agreed scope, architecture, and open-question list for Phase 1.

**Meeting goal (stated plainly):**
> Lock as many Phase-1 decisions as possible so we can build with confidence. Where we can't lock, get the specific questions named so we can unblock them async during the week.

---

## Part 1 — What I've Understood (Pitch in 90 seconds)

### The product context I now hold

The Maison platform is **two cooperating runtimes** today plus one consumer runtime on the roadmap:

1. **`api` (TypeScript, ECS Fargate)** — orchestrator. REST API (`/api/*`), A2A (`POST /a2a` JSON-RPC 2.0), MCP (`/mcp` streamable HTTP). Public on port 8083, internal on 8583. Three interfaces are thin transports over one OpenAPI-spec source of truth.
2. **`llm-svc` (Python, ECS Fargate, internal-only)** — LLM inference. `api` calls it via `LLM_SERVICE_HOST`. *This is the service I'm going to be contributing to.*
3. **`pipeline-tasks` (Python, ECS Fargate one-shot, triggered via SQS → Lambda)** — ingestion and batch work. Scrape, chunk, embed, QA generation, QA evaluation all land here. *This is also where my work lives.*

Chat widget, QA editor, Business Console, docs, login, status, quality dashboard — all static on S3 + CloudFront. AppSync Events (WebSocket) for real-time pub/sub.

**Data stores:** Neon Postgres (22 migrations, relational — clients, users, scrape sessions, tests, analytics), DynamoDB (6 tables — per-client runtime config, translations, A2A task store), S3 (private: scrape snapshots, analytics, pipeline payloads; public: chat-window, console, assets), EFS (shared files).

**Two-portal model confirmed:**
- **Business Console** (`apps/console/`) — internal Maison admin. Vite + TypeScript. Permissions-gated (`clients:read`, `clients:write`). UI rendered from **A2UI schemas** (`packages/a2ui-schemas/`) — declarative JSON → components. **[Updated post-Notion research]** Development has stopped on the current console; it's being refactored. New work goes into the refactored version.
- **Admin Flyout** (part of `apps/chat-window/`) — operator-facing overlay, triggered from the chat via `SHOW_ADMIN_FLYOUT`, `SHOW_TONE_EDITOR`, `SHOW_QA_EDITOR`, `SHOW_CONFIG_EDITOR` message types from the LLM. No separate login — the concierge is the entry point.

**Client lifecycle (verified in code):**
```
Client created → Demo site provisioned → KB pipeline runs (pipeline-tasks) →
  Discover URLs → Scrape Content → Chunking → Populate DB → Generate
  Embeddings → Generate QA → Evaluate QA → Invite Admin User
```
Stage status tracked in `WebsiteScrapeSession` (Postgres). Values in `ScrapeStatusType`: `QUEUED | IN_PROGRESS | SUCCESS | ERROR | NA | FAIL`.

**Quality gates (numbers now confirmed):**
- `Test` + `TestSession` tables (Postgres) — `is_golden` boolean flags the **32 Golden FAQs**. **[Updated post-Notion research]** Go-live quality bar is **70–80%** on the Golden FAQ test (confirmed April 18 demo). AI Visibility report compares the bot's answers to ChatGPT's — this shows operators what public AI knows vs. what the trained concierge knows.
- AI Visibility schedule is a client-level enum (`ScheduleType: NONE | DAILY | WEEKLY | BI_WEEKLY | MONTHLY`), run by scheduled Lambdas.

**Booking flow (verified in code + Notion):**
- LLM service decides to book → sends `ACTION_EXECUTE_BOOK_ROOM` to chat-window with `bookingParams` in the message payload
- Chat-window `postMessage`s to parent window (demo site injected script)
- Parent script constructs the URL using the per-client **"booking link instructions"** (plain text with an illustrative template the LLM populates)
- **[Updated post-Notion research]** Booking link instructions **must live in the system prompt (Client Config), NOT the KB.** KB entries are only pulled on the first relevant query and won't be available on follow-up messages. This is an existing operational rule. [See Notion: IBE & CRS Deeplink Setup](https://www.notion.so/33a8b6104b1d81c38aa3f17d64a37907)
- **April 18 demo finding:** iHotelier v5 URL structure was difficult to configure on the fly. SynXis Nexus (Island Outpost) worked cleanly. This is flagged as "the primary manual bottleneck" — slated for automation.

**PMS providers enumerated:** `MEWS, OPERA, STAYNTOUCH, APALEO, CLOUD_BEDS, RENTLIO, NONE`.

### The big surprise (and why it matters)

There are **already detailed PRDs in the repo** (`docs/prd-maison-agent-os/`) and a comprehensive Notion spec tree under `Maison.Travel PoC`. The Notion docs go significantly further than what's in the repo PRDs on the content layer.

Key documents already written:
- **PRD-001 — Agent 2.0 (substrate):** per-property agent as a "conceptual unit" composed of typed slices (persona, knowledge, skills, tools, policies, regulatory_posture, memory). "Inspectable like a Claude Code project directory." This *is* the "dockerized client" pattern Kim described.
- **PRD-006 — Maison.Travel (consumer):** *one agent per user* (not per property), cycle-aware, silent-between-trips, companion-grade in-trip. PreferenceSlice is the rate-limiter. iOS ships V1. D10-neutral tool contracts.
- **V0 Content Layer — Master Architecture** (Notion, owner: Rahil): the Layer 1 spec, with **10 schemas**, storage Option G, dockerized client folder model, media pipeline. [See Notion](https://www.notion.so/3458b6104b1d81f9b792e40dd3d5d57f)

**[Updated post-Notion research] The dockerized client model is fully specified:**

Kim's vision is a per-hotel folder structure that acts as an *agent harness* (not a content store). Each hotel gets:
```
hotels/{slug}/
├── CLAUDE.md              ← agent system prompt, auto-generated from JSON
├── data/                  ← 10 JSON schemas (source of truth — never edit markdown directly)
├── markdown/              ← GENERATED from data/ (for Obsidian viewing, Git diffs)
├── media/                 ← manifest + thumbnails
├── provenance/            ← per-field source, confidence, conflicts
├── skills/                ← hotel-specific agentic workflows (V1+)
└── tools/                 ← pms-config.json, stripe-account.json
```
JSON is the source of truth. Postgres rows, embeddings, and markdown are all derived from it. Kim's rule: *"JSON files as source of truth, markdown generated from JSON for Obsidian viewing, never the reverse."*

**What this means for my POC:**

My three-layer plan maps directly onto the four-layer architecture already spec'd. All 4 layers are in scope by Memorial Day per the Technical Spec — content first, then booking, then payments, then distribution surface.

---

## Part 2 — Proposed Phase 1 Scope

### Thesis

> By Memorial Day, we have **all 4 layers live:** content layer (Layer 1) built for ~100 East End properties, the **three MCP tools callable** (searchHotels, getHotelRates, bookHotelOffer), **direct PMS booking** (Layer 2), **Stripe Connect payments** (Layer 3), and a **live travel app surface** at maison.travel (Layer 4). Delivery is sequenced — content first, then booking, then payments, then distribution — but all 4 ship by May 25 per the Technical Spec.

### The proposed architecture (layered onto what exists)

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 4: DISTRIBUTION (MCP)                                │
│  maison.travel web app | existing chatbot | (ChatGPT Ph2)  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  LAYER 3: PAYMENTS (Stripe Connect)                         │
│  Stripe Connect per-property — in scope by Memorial Day    │
│  Completes the full booking funnel (search → book → pay)   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  LAYER 2: BOOKING                                           │
│  V0 default: third-party booking API (channel manager)    │
│  Direct PMS adapters where they already exist             │
│  MCP tools: searchHotels, getHotelRates, bookHotelOffer   │
│  ARI cache: AWS ElastiCache (Redis, 15-min TTL)           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  LAYER 1: CONTENT — V0 primary focus, 10 schemas confirmed │
│  Hotel, Room, Amenity, Policy, Offer, Experience, Media,   │
│  FAQ, Event, Rates† — all schema.org-compliant JSON-LD     │
│  Storage: Neon Postgres + pgvector (Option G — resolved)   │
│  Per-hotel folder: JSON → Postgres → embeddings            │
│  Seed hotel: Baron's Cove (Week 1) + 2 others              │
│  V0 sources: scraper + Google Places + EXA (gap fill)      │
│  † Rates = tool-contract projection, not a KnowledgeRecord │
└─────────────────────────────────────────────────────────────┘
```

### New packages confirmed (April 17 architecture session)

| Package | Purpose |
|---------|---------|
| `packages/content-schemas` | 10 JSON schemas + TypeScript types |
| `packages/hotel-tools` | 5 MCP tools (search, rates, book, experiences, details) |
| `services/normalizer` | SQS consumer: scrape output → normalized schemas → Neon |
| `services/media-worker` | CLIP embeddings + VLM captions |
| `apps/travel` | Next.js 15 web app (maison.travel) |

The **normalizer is the critical path item** — if it slips, the integration milestone slips, everything else shifts. [See Notion: Delivery Timeline](https://www.notion.so/3458b6104b1d81b39737ec9e2992aafc)

---

## Part 3 — Decisions I'm Asking to Lock Monday

### Scope decisions

**D1. Is Phase 1 one hotel or all 100 East End properties?**
- Notion spec says 100 East End properties at Memorial Day. Seed hotel = Baron's Cove + 2 others (Week 1). **My proposal: accept this — seed 3, run full 100 through pipeline by Week 3.**
- Open: is Island Outpost one of the two additional seed hotels (already in the system on SynXis)?

**D2. Phase 1 success criterion = live maison.travel URL + MCP tools callable + 100 hotels in content graph.**
- Not "perfect content" — content graph live, tools callable, app accessible.
- Booking completeness (PMS write-back + Stripe) is either confirmed in scope or confirmed as stretch.

**D3. Schema lock-in: 10 schemas, confirmed.**
- Already spec'd in V0 Content Layer: Hotel, Room, Amenity, Policy, Offer, Experience, Media, Rates, FAQ, Event.
- Rates is a tool-contract projection (live via `getHotelRates`), not a stored KnowledgeRecord.

### Architecture decisions

**D4. Storage — needs reconciling Monday.**
- V0 Content Layer spec (Option G) says: **Neon Postgres + pgvector** for the 10 structured schemas.
- **⚠️ Sandeep clarified Apr 19:** the existing KB pipeline writes knowledge records to **Pinecone**, not Postgres. DynamoDB holds only a snapshot for version history and logs (not the primary data layer).
- **Three possible reconciliations to pick from Monday:**
  1. **Parallel stores:** Pinecone for scraped-content embeddings (existing pipeline, QA-pair-style), Postgres + pgvector for the 10 structured schemas (new pipeline). Two different data shapes, two different systems.
  2. **Replace:** Migrate existing Pinecone workload to Postgres + pgvector, kill Pinecone. Higher risk, blocks everything else.
  3. **Split by layer:** Pinecone stays for the existing chatbot KB (scraped content → QA pairs). Postgres + pgvector is greenfield for the V0 content layer. No migration; they coexist cleanly.
- **My recommendation:** option 3. No migration risk, new content layer is isolated, existing chatbot keeps working.

**D5. EXA: gap-fill fallback only.**
- V0 strategy: scraper + Google Places as primary. EXA fills gaps in offer freshness and event data.
- **Action item outstanding:** Fredrik to set up corporate EXA account, invite Rahil, Kim, Noel. Is this done?

**D6. Booking URL: automate the instruction-template pattern.**
- Current: per-client "booking link instructions" in system prompt (confirmed operational rule — NOT in KB).
- April 18 demo confirmed this is the #1 manual bottleneck for onboarding.
- My proposal: automate config generation with a typed `BookingEngineConfig` record (`engine_type`, `url_template`, `param_map`) for Phase 1.

**D7. AI model: Claude for agent, GPT-4o for travel app surface.**
- Existing chatbot: Claude (already integrated). maison.travel: GPT-4o (OpenAI co-branding).
- Both call the same MCP tools — model choice is a presentation layer decision.
- Confirm: is OpenAI co-branding confirmed, or still pending?

**D8. Deployment: AWS CDK pipeline — resolved April 17.**

**D9. Team structure — DM Fredrik before Monday.**
- I don't have a clear picture of who owns what across the team yet. DM Fredrik directly to confirm: who is my counterpart for agent/LLM work, who reviews infra PRs, and who I should loop in on schema decisions.
- Don't raise this in the group meeting — handle 1:1 so it doesn't slow the session down.

**D10. Meeting cadence for Phase 1.**
- Proposed: Mon (lock), Wed (mid-sprint check), Fri (demo-ready review). 30-min each.

**D11. Phase 1 scope — all 4 layers by Memorial Day. ✅ Resolved per Technical Spec.**
- All 4 layers are in scope: content (Layer 1), booking (Layer 2), payments (Layer 3), distribution (Layer 4).
- Delivery is sequenced across 6–8 weeks, with Layer 1 shipping first (Week 1–2 seed, Week 3 full 100 properties) and Layers 2–4 layering on through Week 6.
- The Technical Spec is the authority. Monday meeting confirms sequencing and any per-layer definition of "done".

---

## Part 4 — Open Questions I Need Answered Monday

Grouped by blocker severity. 🔴 = can't start without, 🟡 = needed within 1 week, 🟢 = can async-resolve later.

### 🔴 Critical (can't start without)

1. **Dockerized client model — sell it to Noel (new question, Apr 19).** Noel pushed back on Slack asking *"why do we need this per hotel, how does it fit into the architecture of maison.travel? Are you thinking of creating client-specific agents to be used by A2A?"* Prep answer:
   - **Not hand-crafted per hotel.** Folders are **auto-generated from the 10 JSON schemas** (the normalizer produces the folder as a build artifact).
   - **Maps directly to PRD-001.** Each hotel is a `PropertyAgent` — a composition of typed slices (persona, knowledge, skills, tools, policies). The folder is just a filesystem projection of that composition, inspectable like a Claude Code project.
   - **Template skills + base `AGENTS.md` already handle the standard case** (per Noel's own agreement earlier). Per-hotel content = auto-appended to the base template.
   - **Alternative Noel may propose:** single runtime agent that queries the DB per request (no folder at all). Tradeoff: folder gives us offline inspection, git-diffable history, provenance, and simpler debugging. Runtime-only loses all of that but is simpler.
   - **Ask Noel directly:** *"Is your concern the per-hotel filesystem artifact, or the per-hotel agent concept from PRD-001? If it's the filesystem, we can keep it as a debug artifact and the runtime agent still reads from DB."*

2. **Ingestion/scraper plan — confirm Sandeep's import timeline.** Sandeep clarified Apr 19 that he's importing the legacy Python services (including `pipeline-tasks`) into the monorepo **as-is** until new services are properly sorted. Three follow-ups for Monday: (a) ETA for the import to land? (b) when I need to emit SQS events to feed the normalizer, do I PR against the imported legacy code or create a parallel new service? (c) what's the migration path from legacy-as-imported to the properly-sorted new services?

2. **Dev credentials / API access:** AWS account for CDK deploy, EXA invite (if Fredrik has set it up). (Neon and Firebase creds are already in `.env` — sorted.)

3. **PRD-006 vs Phase 1 scope — confirm the boundary.**

   In plain English: right now Maison sells a chatbot per hotel. A guest goes to Baron's Cove's website, chats with the concierge, gets their questions answered, and books a room. One AI per property. That's what Phase 1 builds the infrastructure for.

   PRD-006 is a completely different product vision — a **travel companion app for the guest** (not the hotel). In this world, *you* (the traveler) have one personal AI that knows your preferences across all your trips. It's "cycle-aware": silent between trips, proactive when you're planning, completes the booking, acts as your on-property concierge while you're there. It would require per-user agents, a preference database tracking individuals, and eventually an iOS app.

   The question: **are we building any part of PRD-006 in Phase 1, or is Phase 1 purely the per-property infrastructure (content, booking tools, travel app as a thin frontend)?**

   My assumption: PRD-006 is Phase 2+. I just need it confirmed so I don't accidentally scope-creep into user preference tracking or cycle detection when I should be focused on the content layer. If someone says "the travel app needs to remember the user" mid-sprint, I need to have this settled.

### 🟡 Important (needed within 1 week)

4. **PMS strategy for V0.** Assumption: most or all of the 100 Long Island properties won't have direct API integrations built yet, so V0 Layer 2 will default to a third-party booking API (channel manager, e.g. Nuitee) for the ones we can't connect to directly. For any properties where a direct PMS adapter already exists (or can be built quickly), we'll integrate directly. Question for Monday: which direct PMS integrations do we currently have, or are in progress? This determines the V0 booking coverage realistically. Full direct PMS rollout = V1. [See Notion: Open Questions](https://www.notion.so/3458b6104b1d81289d07fb8c72b48938)

7. **"Noah" vs Noel Panicker.** April 18 demo says "Direct Maison travel questions to Noah; Sandeep is focused on the monorepo." Is Noah = Noel, or a different person? Who is my primary technical counterpart for agent orchestration?

8. **Oracle Opera certification.** Stalled, blocking marketplace listing. Rahil has OHIP experience (built Opera adapter at Kismet). Should I take point to accelerate?

9. **Seed hotel list.** Baron's Cove is confirmed Week 1 seed. Is Island Outpost one of the "2 others"? (Already configured on SynXis.)

10. **Business Console refactor.** Legacy console development is stopped. Does any Phase 1 UI work (hotel content management, dockerized client folder view) target the refactored version?

### 🟢 Async-resolvable

11. EXA gap-fill threshold criteria (≥60%, <$1/hotel/month) — still correct?
12. Git LFS for binary media in hotel folder — needed at V0 scale (100 hotels)?
13. Confidence threshold for publishing a hotel to maison.travel?
14. Provenance conflict resolution rule (scraper vs Google Places disagreement)?
15. Rate caching TTL (15-min Redis) — right for East End?
16. Language support — English-only for POC?
17. OpenAI co-branding — confirmed logo/co-branding rights?

---

## Part 5 — What I'll Ask For (in meeting order)

1. **Storage reconciliation (Pinecone vs Postgres+pgvector).** "Sandeep confirmed KB currently goes to Pinecone. V0 content layer spec says Option G = Postgres + pgvector. Proposal: **split by layer** — Pinecone keeps the existing chatbot KB, Postgres + pgvector is greenfield for the 10 structured schemas. No migration. OK?"
2. **Dockerized client model — land it with Noel.** Walk through: auto-generated from schemas, maps to PRD-001 PropertyAgent, template skills + base AGENTS.md cover standard case. Ask: is the concern the filesystem artifact or the per-hotel agent concept?
3. **Confirm all-4-layers scope.** "Technical Spec has all 4 layers by May 25 — confirm sequencing: content Week 1–3, booking Week 3–4, payments/distribution Week 5–6. Any cuts?"
4. **Confirm schema list** — 10 schemas as spec'd, any cuts? Add `extras` catch-all per Noel's info-loss point.
5. **Baron's Cove + Island Outpost as Week 1 seeds** — confirm. (100 Long Island properties by Memorial Day.)
6. **Scraper/ingestion.** "Sandeep is importing legacy services into the monorepo — ETA? Where do I PR the SQS emit? Migration path to new services?"
7. **PMS strategy for V0.** "Assume most will go through third-party channel manager V0 — which direct integrations do we already have?"
8. **PRD-006 boundary.** "Phase 1 = per-property only, no per-user consumer layer. Confirmed?"
9. **Who is Noah / is it Noel?**
10. **Lock Mon/Wed/Fri cadence.**
11. **Exit with Week 1 milestone:** schemas in `packages/content-schemas`, normalizer skeleton, Baron's Cove manual seed, travel app scaffolded.

---

## Part 6 — Code References (for back-pocket use)

| What | Where |
|------|-------|
| Monorepo root | `/Users/rahilsinghi/Desktop/maison-agent` |
| System architecture | `docs/architecture.md` |
| PRD-001 (per-property agent substrate) | `docs/prd-maison-agent-os/PRD-001 Architecture & Runtime/PRD-001.md` |
| PRD-006 (maison.travel consumer) | `docs/prd-maison-agent-os/PRD-006 Travel Portal/PRD-006.md` |
| API service | `services/api/src/server.ts` |
| MCP tools (already exposed) | `services/api/src/mcp/server.ts` |
| LLM service client | `services/api/src/llm-client.ts` |
| Client config in DynamoDB | `packages/agent-core/src/client.ts` |
| DB tables (22 migrations) | `packages/database/src/tables/` |
| Enums | `packages/database/src/enums.ts` |
| Chat widget | `apps/chat-window/src/agent-chat.ts` |
| Booking action | `ACTION_EXECUTE_BOOK_ROOM` in `apps/chat-window/src/agent-chat.ts:757` |
| Business Console app | `apps/console/` (legacy — being refactored) |
| A2UI schemas | `packages/a2ui-schemas/src/pages/` |
| Quality framework | `services/quality/` — Playwright, 277+ tests |
| V0 Content Layer spec | `docs/specs/2026-04-17-v0-content-layer-integration-design.md` |
| NEW — normalizer (to be built) | `services/normalizer/` |
| NEW — content schemas (to be built) | `packages/content-schemas/` |
| NEW — hotel tools (to be built) | `packages/hotel-tools/` |
| NEW — travel app (to be built) | `apps/travel/` |

---

## Part 7 — Vocabulary I should use consistently in the meeting

- **PropertyAgent** (not "per-hotel agent") — PRD-001 term
- **KnowledgeRecord** (not "scraped content") — PRD-001 term
- **ToolContract** / **MCP tool** — the tools are MCP-exposed ToolContracts
- **Dockerized client** — Kim's term for the per-hotel folder/agent harness
- **Option G** — the agreed storage architecture (JSON-first + Neon Postgres materialized view + pgvector)
- **Normalizer** — the critical-path service (SQS consumer → 10 schemas → Neon)
- **PreferenceSlice** — PRD-006 consumer term; flag when I'm bleeding scope into Phase 2
- **D10 neutrality** — any LLM can call our ToolContracts
- **Cycle-aware** — PRD-006 term; flag when bleeding scope into Phase 2
- **Baron's Cove** = seed hotel for Week 1 (Sag Harbor, 67 rooms, waterfront boutique)
- **agent-pipeline-tasks** = legacy Python scraper/ingestion service; Sandeep importing into monorepo as-is Apr 19
- **Pinecone** = existing KB vector store (scraped content → QA pairs) per Sandeep
- **Option G** = Postgres + pgvector for V0 content layer (10 structured schemas); parallel to Pinecone, not a replacement

---

## Part 8 — Notion References

Every Notion document consulted in preparing this document.

| Document | URL | Relevance |
|----------|-----|-----------|
| 🗺️ Maison.Travel PoC (main hub) | [notion.so/…3158b610](https://www.notion.so/3158b6104b1d80b99a20f357dc7227ec) | Product vision, 5 functional areas, success criteria, risks — the "why" |
| 📐 V0 Content Layer — Master Architecture | [notion.so/…3458b610](https://www.notion.so/3458b6104b1d81f9b792e40dd3d5d57f) | 10 schemas, Option G storage, dockerized client — Layer 1 spec Rahil owns |
| 📅 Delivery Timeline — Memorial Day May 25 | [notion.so/…3458b610](https://www.notion.so/3458b6104b1d81b39737ec9e2992aafc) | Week-by-week plan; use for sequencing reference; Technical Spec is the scope authority |
| ❓ Open Questions & Decisions | [notion.so/…3458b610](https://www.notion.so/3458b6104b1d81289d07fb8c72b48938) | 12 resolved decisions + 7 V0 spec open questions; PMS audit flagged 🔴 |
| 📂 Dockerized Client Folder Model | [notion.so/…3458b610](https://www.notion.so/3458b6104b1d81d29844e52b23808755) | Full per-hotel folder layout, CLAUDE.md template, provenance format |
| 🔗 IBE & CRS Deeplink Setup | [notion.so/…33a8b610](https://www.notion.so/33a8b6104b1d81c38aa3f17d64a37907) | Operational rule: booking links in system prompt NOT KB; templates per engine |
| Product Demo (internal) - April 18 | [notion.so/…3468b610](https://www.notion.so/3468b6104b1d80e9b34ef82ec7d25344) | Golden FAQ bar = 70-80%; Business Console legacy; iHotelier difficulty; SynXis = clean |
| 📋 Product Overview & PRD | [notion.so/…3458b610](https://www.notion.so/3458b6104b1d810eb370c0feaed5811d) | V0 vs full PRD-006 scope table; 7 irreducibles; 6 anti-principles |
| ⚙️ Maison.Travel Technical Spec — Infrastructure PoC | [notion.so/…3448b610](https://www.notion.so/3448b6104b1d81d6a1dced978281c89d) | **Scope authority.** All 4 layers in scope by May 25. Fredrik confirmed High priority. |
| ✈️ Maison.Travel POC — Rahil's Technical Proposal | [notion.so/…3448b610](https://www.notion.so/3448b6104b1d81fa8cb0e88a686b1e3d) | Business case, MindTrip comparison, implementation priority table |
| 🗓️ Maison Weekly Wrapup - April 17 | [notion.so/…3458b610](https://www.notion.so/3458b6104b1d80898451f4a305caca05) | Rahil's Week 1 action item (JSON schema draft); enterprise client context |
| 🔌 Integration Partners | [notion.so/…3468b610](https://www.notion.so/3468b6104b1d810a9b70d130a9ffd27e) | PMS partner outreach process; mutual-hotel-customer approach |
| 🗓️ Maison.Travel — V0 PRD & PoC Execution | [notion.so/…3458b610](https://www.notion.so/3458b6104b1d815e98d5dee24d6dc01d) | Corrected monorepo architecture, 5-week delivery plan, consolidated decisions |

---

## Cross-References

- [[Maison.Travel POC Architecture Meeting April 17 2026]]
- [[Maison.Travel POC — Action Items & Sprint Plan April 17 2026]]
- [[Bootstrap Meeting Fredrik Rahil April 15 2026]]
- [[Maison Platform Architecture Local Dev Environment]]
- [[Maison Workspace Hub]]

## Tags
maison, poc, monday-meeting-prep, 2026-04-20, memorial-day, phase-1, prd-001, prd-006, baron-s-cove, island-outpost, architecture, decisions, open-questions, rahil-prep, notion-enriched
