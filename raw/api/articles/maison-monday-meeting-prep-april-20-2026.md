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
- **Business Console** (`apps/console/`) — internal Maison admin. Vite + TypeScript. Permissions-gated (`clients:read`, `clients:write`). UI rendered from **A2UI schemas** (`packages/a2ui-schemas/`) — declarative JSON → components. This is the pattern Kim was gesturing at.
- **Admin Flyout** (part of `apps/chat-window/`) — operator-facing overlay, triggered from the chat via `SHOW_ADMIN_FLYOUT`, `SHOW_TONE_EDITOR`, `SHOW_QA_EDITOR`, `SHOW_CONFIG_EDITOR` message types from the LLM. Clever: no separate login, the concierge *is* the entry point.

**Client lifecycle (verified in code):**
```
Client created → Demo site provisioned → KB pipeline runs (pipeline-tasks) →
  Discover URLs → Scrape Content → Chunking → Populate DB → Generate
  Embeddings → Generate QA → Evaluate QA → Invite Admin User
```
Stage status tracked in `WebsiteScrapeSession` (Postgres). Values in `ScrapeStatusType`: `QUEUED | IN_PROGRESS | SUCCESS | ERROR | NA | FAIL`.

**Quality gates:**
- `Test` + `TestSession` tables (Postgres) — `is_golden` boolean flags the **32 Golden FAQs**. Sessions run `TestSessionTest` rows per client with status tracking.
- AI Visibility schedule is a client-level enum (`ScheduleType: NONE | DAILY | WEEKLY | BI_WEEKLY | MONTHLY`), run by scheduled Lambdas.

**Booking flow (verified):**
- LLM service decides to book → sends `ACTION_EXECUTE_BOOK_ROOM` to chat-window with `bookingParams` in the message payload
- Chat-window `postMessage`s to parent window (demo site injected script)
- Parent script constructs the URL using the per-client **"booking link instructions"** (plain text with an illustrative template the LLM populates)
- The booking URL template lives in the Client Configuration properties in DynamoDB, not hard-coded per engine type

**PMS providers enumerated:** `MEWS, OPERA, STAYNTOUCH, APALEO, CLOUD_BEDS, RENTLIO, NONE`.

### The big surprise (and why it matters)

There are **already detailed PRDs in the repo** (`docs/prd-maison-agent-os/`):

- **PRD-001 — Agent 2.0 (substrate):** per-property agent as a "conceptual unit" composed of typed slices (persona, knowledge, skills, tools, policies, regulatory_posture, memory). "Inspectable like a Claude Code project directory." This *is* the "dockerized client" pattern Kim described. Not vague vision — already a spec.
- **PRD-002:** Agent Competence (skills)
- **PRD-003:** Agent Campus
- **PRD-004:** Operator Console
- **PRD-005:** Admin UI
- **PRD-006 — Maison.Travel (consumer):** *one agent per user* (not per property), cycle-aware, silent-between-trips, companion-grade in-trip. PreferenceSlice is the rate-limiter. iOS ships V1. Tool contracts are D10-neutral (any LLM can call them).

**What this means for my POC:**

My three-layer plan (Content Layer → MCP Tools → Payments) is **not wrong, but it needs to be re-framed as implementing PRD-001's substrate** — specifically the `KnowledgeRecord`, `ToolContract`, and `AgentSurface` entities — constrained to the East End, with Memorial Day as the deadline.

PRD-006 (the consumer-facing maison.travel portal) is a *downstream consumer* of what I build. Not my scope for the POC, but it IS the thing my work must enable.

---

## Part 2 — Proposed Phase 1 Scope

### Thesis

> By Memorial Day, we have **one East End hotel (probably Island Outpost, already in the system)** with a **schema-complete KnowledgeRecord substrate**, **three working ToolContracts** (Search, Rates, Book), and **a conversational booking flow that commits a real Stripe payment**. We are NOT building the 100-property solution in Phase 1 — we are building the spine that supports 100 once we scale it.

### Why this framing

- **Narrow to widen:** one hotel, zero ambiguity. Scale to 100 once the spine is proven.
- **Aligns with PRD-001:** we're building the PropertyAgent substrate, not a side project.
- **Aligns with Fredrik's resolution (Apr 17):** hybrid — use existing scraper for baseline, evaluate EXA for fill-in, assume future content comes via integrations (Preferred CMS). Unique IP is what we do *with* data, not ingestion.
- **Sets up PRD-006 later:** per-property ToolContracts in Phase 1 become the substrate that one-agent-per-user cycle-aware Maison.Travel consumes.

### The proposed architecture (layered onto what exists)

```
┌──────────────────────────────────────────────────────────────────┐
│  1. CONTENT — KnowledgeRecord substrate                          │
│     V0: existing scraper + EXA fill-in → typed KnowledgeRecords │
│     V1: Preferred-style headless CMS integration (later)        │
│     Schemas: amenity, policy, faq, menu, rate_rule, room_type,  │
│              event, offer (6-8 golden templates, JSON-validated)│
│     Storage: Postgres tables + S3 raw + Pinecone embeddings     │
│     Ingestion: pipeline-tasks (Python) — extends existing flow  │
└──────────────────────────────────────────────────────────────────┘
                               ↓
┌──────────────────────────────────────────────────────────────────┐
│  2. AGENT — PropertyAgent composition + ToolContracts            │
│     Reuses PRD-001 substrate (per-property agent)               │
│     ToolContracts I own for POC:                                │
│       • search_hotel(query, filters) → typed results            │
│       • get_rates(dates, guests, room_type?) → rate inventory   │
│       • book_offer(rate_id, guest_info, payment_intent) →       │
│         booking_confirmation                                    │
│     Composition: persona + knowledge + tools + policies frozen  │
│       at session start (cache discipline from PRD-001)          │
│     Surface: webchat initially (SMS / WhatsApp / voice later)   │
└──────────────────────────────────────────────────────────────────┘
                               ↓
┌──────────────────────────────────────────────────────────────────┐
│  3. TRANSACTIONS — Unified Checkout + Stripe                    │
│     Atomic commit per PRD-006 D6 (referenced, not redefined)    │
│     ARI read: already exists ("we already have that" — Fredrik)│
│     Booking URL fallback: current "booking link instructions" +│
│       parent-window postMessage pattern remains                 │
│     Stripe integration: NEW for POC                             │
│     Payment intent + booking commit = single transaction        │
└──────────────────────────────────────────────────────────────────┘
```

### Why this stands

1. **Schema-first disarms the content-layer debate.** Kim is right that ungrounded markdown drifts (confirmed: 1,500–2,000-line context drift threshold). Noel is right that building a full content layer for Phase 1 is overbuilding. The resolution: **six to eight typed JSON schemas** (amenity, policy, faq, menu, rate_rule, room_type, event, offer), each < 50 fields, validated. Fill them V0-style via scraper + EXA + operator input. This is 2-3 days of schema work, not a 4-week engineering lift.
2. **ToolContracts are the real deliverable.** Three tools (Search, Rates, Book) × one hotel = a demoable end-to-end flow. Tools consume typed KnowledgeRecords, so incomplete content doesn't break the tool — it just returns partial results the LLM can explain.
3. **We piggyback on existing infrastructure.** Pipeline-tasks for ingestion, DynamoDB for runtime config, Postgres for relational state. New code in three places: (a) schema definitions, (b) three tool implementations in llm-svc, (c) Stripe integration.
4. **It's testable with Golden FAQs day one.** The existing 32-FAQ Golden test becomes our acceptance bar. 70% at end of week 1 → 80% at Memorial Day.

---

## Part 3 — Decisions I'm Asking to Lock Monday

### Scope decisions

**D1. Is Phase 1 one hotel or the full East End (100)?**
- My proposal: **one hotel** (Island Outpost — already scraping). Prove the spine. Then scale-test with five. Then run the remaining 95 through the same pipeline at end of Phase 1.
- Risk of full-East-End: we spend 4 weeks on ingestion edge cases, never ship booking.

**D2. Phase 1 success criterion = booking-complete demo, not content-perfect demo.**
- My proposal: the acceptance test is "Guest converses with Island Outpost's agent, picks dates, gets a rate, commits a booking via Stripe, sees a confirmation." Content gaps are allowed — the agent answers "I don't know, but here's who to ask" when it hits one.

**D3. Schema lock-in: 6-8 typed JSON schemas, decided this week.**
- Proposed list: `Amenity`, `Policy`, `FAQ`, `MenuItem`, `RateRule`, `RoomType`, `Event`, `Offer`.
- Open: should we add `Location` (geo for near-hotel queries) or fold that into `Amenity`?

### Architecture decisions

**D4. PRD-001 alignment: I'm building against PRD-001 substrate entities (KnowledgeRecord, ToolContract, AgentSurface), not inventing a parallel model. Confirmed?**

**D5. Where does the KnowledgeRecord live physically?**
- My proposal: **Postgres** (relational, queryable, versioned). Embed into Pinecone for semantic retrieval. The JSON schema-validated record is the source of truth; embeddings are a lookup index.
- Alternative: raw S3 documents + embeddings only. Worse — loses structured query.

**D6. EXA: how much do we integrate in Phase 1?**
- My proposal: **EXA as a fill-in fallback only.** If the scraped KnowledgeRecord for a client is missing fields, EXA search fills gaps (nearby restaurants, event context). Not a primary ingestion source.
- Risk of heavier EXA: we get good surface-level results early but can't move up the stack to operator-authored content.

**D7. Booking URL: keep current instruction-template pattern or move to typed config?**
- Current: per-client "booking link instructions" text property, LLM constructs URL at runtime.
- My proposal for Phase 1: **keep current pattern** — it works, it's flexible, SynXis/iHotelier already handled. But wrap it in a typed `BookingEngineConfig` record with `engine_type`, `url_template`, `param_map` for Phase 2 so we're not fighting the LLM to produce valid URLs.

### Team + coordination decisions

**D8. Who owns what in Phase 1?**
- Proposed:
  - **Rahil (me):** schemas, KnowledgeRecord service, ToolContracts (Search/Rates/Book), Stripe integration
  - **Sandeep:** deploy scraper + pipeline-tasks to monorepo, infrastructure for new schemas
  - **Noel:** agent orchestration (how the LLM calls the three tools), prompt engineering
  - **Kim:** architectural conscience, schema review, agent persona for Island Outpost
  - **Fredrik:** EXA account, Stripe account, any Preferred Hotels CMS coordination

**D9. Meeting cadence for Phase 1.**
- Proposed: Mon (lock), Wed (mid-sprint check), Fri (demo-ready review). 30-min each.

**D10. What does "Memorial Day demo" mean?**
- Proposed: live walkthrough, Fredrik acting as a real guest, booking Island Outpost for Memorial Day weekend, live Stripe charge (test mode or real $1 hold).

---

## Part 4 — Open Questions I Need Answered Monday

Grouped by blocker severity. 🔴 = can't start without, 🟡 = needed within 1 week, 🟢 = can async-resolve later.

### 🔴 Critical (can't start without)

1. **Is Island Outpost the Phase-1 hotel?** If not, which one? (Preferred — "I Preferred" — was mentioned as the enterprise priority. Is that actually the target vs. East End?)
2. **Do I get credentials / API access for:** (a) the existing scraper service, (b) pipeline-tasks, (c) the Stripe test account, (d) the chosen hotel's PMS (SynXis / Derbysoft / iHotelier), (e) EXA?
3. **Is the LLM service (`llm-svc`, Python) in the monorepo yet or still separate?** I cannot add ToolContracts to the agent without knowing where the code lives. The README mentioned Python support is "follow-up phase." Sandeep said last Tuesday he'd migrate it this week.
4. **PRD-006 vs Phase 1 scope.** PRD-006 describes per-user consumer agents. Am I correctly reading that Phase 1 is still PER-PROPERTY (substrate), and maison.travel consumer layer is Phase 2+? If there's any ambiguity, this determines the whole data model.
5. **Preferred Hotels CMS timing.** Fredrik said if Preferred signs, we drop everything. Has that moved? Do I plan around "Preferred lands in 4 weeks" or "Preferred is a Phase 2 thing"?

### 🟡 Important (needed within 1 week)

6. **Booking URL: are all East End hotels on SynXis/iHotelier, or is PMS diversity higher?** (The enum has 7 providers.) If diverse, do we accept "booking link instructions" template approach for Phase 1 and defer typed adapters?
7. **Golden FAQ list.** Is the current 32-FAQ set good for Island Outpost specifically, or do we need to tailor? How much does a 70% baseline change per-hotel?
8. **A2UI ambition in Phase 1.** The chat widget supports plain text + GenUI components. Do we ship POC with text-only responses, or invest in GenUI payloads (property cards, rate tables, comparison views) from the start? PRD-006 treats GenUI as irreducible — does that apply to the POC demo?
9. **Non-hotel content sources.** Rate APIs, event feeds, local partner graph (PRD referenced `11-local-partner-graph.md`). In scope for Memorial Day?
10. **Conversational session model.** Does Phase 1 need cross-device continuation, or only single-session? (PRD-006 treats it as first-class for consumer; PRD-001 has frozen composition per session — we should explicitly scope.)

### 🟢 Async-resolvable

11. Deployments tab in Business Console — who has go-live rights, what's the flow?
12. Analytics + AI Visibility reports — do we run them during Phase 1 or exempt the POC hotel?
13. Tone & Voice defaults for Island Outpost — who authors persona slice, Fredrik or Kim?
14. Language support — English-only for POC or multilingual from day one? (Widget supports 8 locales.)
15. Rate caching strategy (SynXis calls cost money / latency) — real-time or 5-min TTL?

---

## Part 5 — What I'll Ask For (in meeting order)

Here's the order I'll present, to make the meeting feel like a decision-making session and not a download:

1. **Confirm product framing.** "Phase 1 = PRD-001 substrate implementation, constrained to East End, booking-complete by Memorial Day, PRD-006 consumer layer is Phase 2+. Correct?"
2. **Confirm one-hotel start.** "Island Outpost. Expand to 5, then 100, in that order."
3. **Present the schema list** (8 schemas) and ask for additions/cuts.
4. **Walk through the three ToolContracts** and ask for approval of signatures.
5. **Ask the 🔴 questions** (credentials, llm-svc location, Preferred status).
6. **Ownership matrix.** Confirm D8.
7. **Meeting cadence.** Lock Mon/Wed/Fri.
8. **Exit with a written Phase 1 milestone list** — at minimum: schemas (Week 1), search tool (Week 2), rates tool (Week 3), book tool + Stripe (Week 4).

---

## Part 6 — Code References (for back-pocket use)

If anyone asks "where does X live":

| What | Where |
|------|-------|
| Monorepo root | `/Users/rahilsinghi/Desktop/maison-agent` |
| System architecture | `docs/architecture.md` |
| PRD-001 (per-property agent substrate) | `docs/prd-maison-agent-os/PRD-001 Architecture & Runtime/PRD-001.md` |
| PRD-006 (maison.travel consumer) | `docs/prd-maison-agent-os/PRD-006 Travel Portal/PRD-006.md` |
| API service | `services/api/src/server.ts` |
| MCP tools (already exposed) | `services/api/src/mcp/server.ts` — `query_hotel`, `get_session`, `create_session`, `get_client_info`, `list_translations`, `list_clients`, `get_client`, `create_client`, `update_client`, `disable_client` |
| A2A methods | `services/api/src/a2a/methods.ts` |
| LLM service client (calls Python llm-svc) | `services/api/src/llm-client.ts` |
| Client config in DynamoDB | `packages/agent-core/src/client.ts` — `getClientConfig`, `getClientTranslations`, `getClientFields` |
| DB tables (22 migrations) | `packages/database/src/tables/` — clients, knowledge, pms-integration, testing (golden FAQs), analytics, a2a-tasks, kb-version-history, scrape-snapshot, sessions |
| Enums | `packages/database/src/enums.ts` — `ScrapeStatusType`, `PmsProvider`, `ChatMessageType`, `ScheduleType`, `AnalyticsStatusType` |
| Chat widget | `apps/chat-window/src/agent-chat.ts`, `agent-inject.ts` |
| Admin flyout triggers | `apps/chat-window/src/constants.ts` — `SHOW_ADMIN_FLYOUT`, `SHOW_TONE_EDITOR`, `SHOW_QA_EDITOR`, `SHOW_CONFIG_EDITOR` |
| Booking action | `ACTION_EXECUTE_BOOK_ROOM` in `apps/chat-window/src/agent-chat.ts:757` |
| Business Console app | `apps/console/` (Vite + TS, A2UI-rendered) |
| A2UI schemas | `packages/a2ui-schemas/src/pages/` — `clients.json`, `clients/[clientId].json`, `dashboard.json`, `nav.json` |
| Quality framework | `services/quality/` — Playwright, 277+ tests, scenarios + sessions DB |

---

## Part 7 — Vocabulary I should use consistently in the meeting

- **PropertyAgent** (not "per-hotel agent") — PRD-001 term
- **KnowledgeRecord** (not "scraped content") — PRD-001 term
- **ToolContract** (not "MCP tool," though MCP is a transport for it)
- **ComposableSlice** / **persona slice** / **knowledge slice** — PRD-001 composition model
- **PreferenceSlice** — PRD-006 consumer term, for future-scope clarity
- **D10 neutrality** — any LLM can call our ToolContracts. Important when discussing MCP.
- **Cycle-aware** — PRD-006 term. Flag when I'm bleeding scope into Phase 2.
- **I Preferred** = Preferred Hotels (to confirm)

## Cross-References

- [[Maison.Travel POC Architecture Meeting April 17 2026]]
- [[Maison.Travel POC — Action Items & Sprint Plan April 17 2026]]
- [[Bootstrap Meeting Fredrik Rahil April 15 2026]]
- [[Maison Platform Architecture Local Dev Environment]]
- [[Maison Workspace Hub]]

## Tags
maison, poc, monday-meeting-prep, 2026-04-20, memorial-day, phase-1, prd-001, prd-006, island-outpost, architecture, decisions, open-questions, rahil-prep
