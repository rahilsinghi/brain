---
title: Rogers Leo — Mews Meeting Prep (March 3, 2026)
author: ai
created_at: 2026-04-10T01:49:33.270Z
last_ai_edit: 2026-04-10T01:49:33.270Z
last_human_edit: null
last_embedded_hash: acbcc522ec0299be
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/career/prep/mews_rogers_leo_prep.md]]"
tags:
  - meeting-prep
  - job-search
  - mews
  - agentic-ai
  - hospitality-tech
  - nlp
  - pms
  - mcp-tools
  - rogers-leo
  - datachat
  - full-time-offer
  - nyu
  - computer-engineering
  - revenue-management
  - api-integration
  - bigquery
  - nestjs
  - playwright
  - llm
  - series-d
---


# Rogers Leo — Mews Meeting Prep (March 3, 2026)

A 20-minute founder-to-engineer conversation with Rogers Leo, Director of Engineering and Product for Agentic AI at Mews, initiated via Richard Valtr (Mews CEO). The goal is a full-time offer for a May 2026 NYU MS Computer Engineering graduate. Rogers is a PhD computer scientist and former CEO/co-founder of DataChat, acquired by Mews in October 2025 to build the natural language interface layer over their property management system (PMS) data.

## Key Concepts

- **Rogers Leo**: PhD CS (UW-Madison), co-founder of DataChat (2017–2025), now Director of Engineering and Product for Agentic AI at Mews post-acquisition
- **DataChat**: NLP/conversational analytics startup enabling natural language queries over structured datasets; acquired by Mews October 2025
- **Mews**: Cloud-native Property Management System (PMS); $2.5B valuation, $300M Series D (January 2026), 15,000 properties, 85 countries, 132,000+ monthly active hoteliers
- **Agentic AI**: Autonomous agent systems that remove human-in-the-loop bottlenecks; Mews' declared strategic focus for 2026
- **Integration Intelligence Agent**: Three-phase agent concept (Recon → Schema Normalization → Drift Monitoring) for automating API integration lifecycle across Mews' 1,000+ marketplace integrations
- **AI Discoverability Layer**: Architecture bypassing hotel websites to expose PMS signals (rates, occupancy, booking velocity) as machine-readable structured content for external AI agents
- **MCP Tools**: Model Context Protocol tools (`searchHotels`, `getHotelRates`, `bookHotelOffer`) built over NestJS with JSON-RPC over SSE, enabling agentic interaction with PMS data
- **NL → NL Actions**: Extension of DataChat's query paradigm into executable agentic revenue management (e.g., NL query → identify properties → call `setRateOverride`)
- **Semantic Layer**: Mews' published thesis calling for a unified data model that gives AI contextual understanding for accurate hospitality decisions
- **PMS Adapter Parallelization**: asyncio-based parallel adapter calls across multiple PMSs with Redis/local caching and AlloyDB persistence
- **BigQuery Attribution Pipeline**: GA4 export, session stitching, and multi-signal attribution infrastructure producing clean structured data for agent reasoning
- **Smart Tips**: Mews AI-powered guest summary feature; 5M+ views/week — relevant to guest journey agent concepts

## Details

## Background & Context

This meeting was initiated after Mews CEO Richard Valtr flagged the candidate (Rahil) following a LinkedIn exchange. Rogers Leo reached out directly — making this a **founder-to-engineer conversation**, not a recruiter screen. The candidate is graduating NYU MS Computer Engineering in May 2026 and seeking a full-time offer.

---

## Who Is Rogers Leo

### Academic & Professional Background
- **PhD, Computer Science, UW-Madison** (top-5 program for databases and systems research)
- **Co-founded DataChat (2017–2025)** with Jignesh Patel, UW-Madison CS professor and database systems expert
- DataChat's core product: natural language queries over structured datasets — NL interface → query planner → structured results with conversational follow-ups
- **Director of Engineering and Product — Agentic AI, Mews** (post-acquisition, October 2025)
- Active open-source contributor: github.com/rogersjeffreyl

### Intellectual Profile
Rogers respects rigor, first-principles thinking, and well-reasoned tradeoffs. He is a researcher-turned-founder who prefers dialogue and ideas over monologues. His core lens: *can a non-technical person do this by just asking?* Do not bluff — acknowledge knowledge gaps directly.

### What He Cares About
- Natural language interfaces for complex systems
- Autonomous agents that remove human-in-the-loop bottlenecks
- Democratizing data access (revenue managers shouldn't need SQL)
- Reducing hospitality operational fragmentation

---

## Mews Fast Facts (2026)

| Signal | Data |
|---|---|
| Funding | $300M Series D, January 2026 (EQT Growth) |
| Valuation | $2.5B |
| Customers | 15,000 properties, 85 countries |
| Monthly Active Users | 132,000+ hoteliers |
| Daily API Volume | 10M+ messages |
| Marketplace | 1,000+ integrations |
| PMS Rating | #1 PMS 2026 (3rd consecutive year) |
| Smart Tips | AI guest summaries, 5M+ views/week |
| Atomize (acquired) | AI pricing engine — 70% autopilot rate, 35% RevPAR increase |
| DataChat Acquisition | October 2025 |
| Series D Use of Funds | Agentic AI + Mews Payments (fintech expansion) |

Strategic framing: Mews is building the **AI infrastructure layer for hospitality**, not just a better PMS. The Series D is specifically to accelerate agentic AI development.

---

## Candidate Narrative Arc

### Opening (2–3 min)
GTM tracking pain at Kismet working across 7–8 booking engines (iHotelier, SynXis, Allora, AZDS) — each with different checkout flows, cookie domains, iframe structures. Discovering Mews had native GTM support was the signal that *someone understood operational pain*. Mews treated tracking as a first-class citizen.

### Why Agentic AI + Hospitality (1–2 min)
Hospitality systems have well-defined states, repetitive decision trees, and massive human-in-the-loop latency penalties — ideal for agents. Built MCP tools (`searchHotels`, `getHotelRates`, `bookHotelOffer`) demonstrating that booking workflows can be modeled as callable function schemas for agent orchestration.

### Bridge to Mews + Rogers
The DataChat acquisition represents the missing NL interface layer. Revenue managers cannot effectively query their own data today — not from lack of data, but from lack of accessible interface. DataChat + Mews Connector API = the right architecture.

---

## Technical Talking Points

### 1. MCP Tools for Hospitality
Built `searchHotels`, `getHotelRates`, and `bookHotelOffer` using NestJS with JSON-RPC over SSE. Structured schemas, typed inputs/outputs, callable by any LLM — the exact tool-use layer agentic systems need to interact with PMS data.

### 2. Playwright + LLM Tool-Calling Pipeline
Built a Playwright crawler with GPT-4o/Gemini tool-calling that extracts hotel data from unstructured websites and converts it to schema.org/Hotel JSON-LD with >95% field coverage. Production-grade structured extraction with validation.

### 3. PMS Adapter Parallelization
asyncio-based parallelization of PMS adapters and Amadeus fallback calls, with Redis/local caching and AlloyDB persistence. Drops latency from serial seconds to parallel milliseconds for multi-property queries.

### 4. BigQuery Data Warehouse + Attribution
GA4 export pipeline, session stitching logic, and multi-signal attribution (UTM source/medium, referrer chains, landing URLs) across Kismet's hotel portfolio. Produces clean structured data for agent reasoning over hotel performance.

### 5. Booking Engine Fragmentation Problem
Seven to eight booking engines with completely different data models and checkout flows — a data normalization problem agents can solve at scale. Direct personal experience with this problem domain.

**Caveat for direct Mews API experience:** *"My team integrated with Mews API for rates — I was primarily on the OHIP/Amadeus side, but I heard firsthand how clean the Mews rate flow was compared to the other PMSs we touched."*

---

## Agentic AI Ideas — Power Sequence

Deploy in order based on conversation direction. Drop one idea, let Rogers react, follow the thread.

```
1 → ALWAYS LEAD: Integration Intelligence Agent (grounded, operational, authentic)
2 → If conversation expands: AI Discoverability Layer (ecosystem-level thinking)
3 → If he mentions DataChat: NL → NL Actions
4 → If conversation turns to operations: Guest Journey or Multi-Property Agent
```

### Idea 1 (LEAD): Integration Intelligence Agent

**Opening line:**
> "I spent weeks manually reverse-engineering booking engine flows to normalize them into a consistent data model. What I realized is there's a repetitive pattern underneath it — reconnaissance, schema mapping, field gap detection, normalization proposal. That work felt mechanical. And mechanical, repetitive, pattern-matching work is what agents are now good at. At Mews' scale with 1,000+ marketplace integrations, I'd imagine that problem is significant."

**Three-phase architecture:**

- **Phase 1 — Reconnaissance**: Given a new partner API docs URL or OpenAPI spec, the agent extracts endpoints, request/response schemas, field names, and types. Compares against Mews internal schema and outputs a gap report (e.g., "partner uses 'room_class', Mews uses 'SpaceType'")
- **Phase 2 — Normalization**: Agent generates partner→Mews field mapping as code, handling renames, type coercions, missing fields, and nested structures. Outputs a draft adapter in TypeScript/Python for human review before deployment
- **Phase 3 — Drift Monitoring**: Agent monitors partner changelog RSS and OpenAPI spec diffs weekly. Detects field renames, type changes, deprecated endpoints, new required fields. Identifies impact on live adapters and proposes patch PRs. Key risk addressed: silent data corruption (wrong room type quietly corrupts revenue reports for months before detection)

**Why candidate owns this conversation:** Designed AlloyDB schema for multi-property data across OHIP, Mews, and Amadeus. Lived the normalization problem firsthand ("RoomCategory" / "SpaceType" / "RoomType" = same room, three names). Built downstream layer that breaks when schemas drift. Playwright + LLM extraction pipeline is Phase 1 of this agent applied to hotel websites.

⚠️ **Frame as DATA SCHEMA normalization, not GTM/tracking normalization** — GTM is a Conor Winders / Distribution domain conversation, not Rogers' domain.

### Idea 2: AI Discoverability Layer

Hotels have a split architecture that breaks AI discoverability:
- Marketing content on vanity website (static CMS)
- Rates buried in booking engine (dynamic, often session-gated)
- Operational signals (occupancy, booking velocity) in PMS, invisible externally

Kismet's approach: bypass the website, connect to PMS directly via MCP tools, publish schema.org/Hotel JSON-LD enriched with live rate data to an `ai.{hotel}.com` subdomain.

Additional concept: feeding real-time behavioral signals into JSON-LD:
```json
{
  "@type": "Hotel",
  "name": "The Grand",
  "aiVisitsLast30Days": 3000,
  "bookingsLast24Hours": 22,
  "currentOccupancyRate": 0.78,
  "ratesAvailableNow": true
}
```

**Verified gap:** Mews has no CMS, no public-facing structured data layer, no anonymous API for AI discovery. The Mews Marketplace has 1 marketing integration (Bloomreach) and zero CMS/content platforms. Yet Mews has explicitly published: *"Hotel visibility will hinge less on ad spend and more on structured content, connectivity and open APIs"* and called for *"a unified semantic layer."*

**Pivot line:**
> "I saw Mews published about hotels needing a 'semantic layer' and that 'visibility will hinge on structured content.' But the Connector API is gated — there's no public-facing structured data layer that an external AI agent can discover. Is there any work on the agentic side around closing that loop?"

### Idea 3: NL → NL Actions (DataChat Angle)
*Deploy only if Rogers mentions DataChat, analytics roadmap, or revenue management.*

DataChat's architecture: NL query → Query planner → SQL generator → Execute → NL + visualization. Post-acquisition, query planner gains native Mews Connector API schema — domain-specific and dramatically more accurate.

The bridge: NL queries ("Which properties should I reprice this weekend?") → agent identifies candidates → calls `setRateOverride` → changes applied with human-in-the-loop approval. DataChat + Mews Connector API + approval gate = agentic revenue management loop.

### Idea 4: Guest Journey Agent
*Use if conversation moves to guest experience or Smart Tips.*

The guest lifecycle (reservation → post-stay) is a well-defined state machine with Mews already firing the events. Agent subscribes to PMS webhooks (reservation.created, T-24hr, checkedIn, checkout), fetches guest profile using Smart Tips-style context, and autonomously selects and executes the right action (message / upsell / upgrade check).

### Idea 5: Multi-Property Operations Coordination
*Use only if he brings up Flexkeeping or operational agents.*

The housekeeping coordination window (11am checkout → 3pm check-in) is a constraint satisfaction problem running on PMS events. An agent watching the event stream in real-time could flag conflicts early and re-prioritize queues, eliminating operational fire drills. Ask whether this sits in scope for the agentic team or the Flexkeeping integration.

---

## 20-Minute Conversation Flow

| Time | Action |
|---|---|
| 0:00–1:30 | Warm up, acknowledge Richard's intro, confirm Rogers leads agentic AI |
| 1:30–4:00 | Your story: GTM pain → booking engine fragmentation → Mews discovery → MCP tools → DataChat acquisition click |
| 4:00–8:00 | Flip to Rogers: "What does the DataChat acquisition unlock for the agentic roadmap?" — LISTEN carefully, map answer to talking points |
| 8:00–13:00 | Share 2–3 relevant technical talking points matched to his stated priorities |
| 13:00–16:00 | Lead with Integration Intelligence Agent opening line; follow the thread to other ideas based on his engagement |
| 16:00–18:30 | Role and team questions |
| 18:30–20:00 | Close — bring it up proactively at minute 17–18 |

---

## Questions to Ask Rogers

**Tier 1 (always ask):**
1. "What did the DataChat acquisition unlock specifically for the agentic AI roadmap?"
2. "What's the hardest unsolved problem you're working on right now?"
3. "Where are agents getting deployed first — back-office ops, guest-facing, or revenue management?"

**Tier 2 (if time allows):**
4. "How does the team balance building new agent capabilities vs. maintaining the integration platform?"
5. "What does the engineering culture look like on the agentic AI team post-acquisition?"
6. "What would a strong new hire bring to the team in their first 90 days?"

---

## What NOT to Do

- **Don't overstate direct Mews API experience** — you were on OHIP/Amadeus side; say that exactly
- **Don't pitch ideas as if you know their roadmap** — frame as curiosity and pattern-matching: "I've been thinking about..." not "You should build..."
- **Don't monologue** — Rogers is a researcher and founder; leave pauses, ask questions
- **Don't be vague about timeline** — graduating May 2026, looking for full-time; say it clearly at close
- **Don't skip the close** — at minute 17 if he hasn't raised next steps, you raise them
- **Don't bluff on unknowns** — "That's outside what I've worked on directly, but here's how I'd think about it..." is the right move

---

## Closing Script

At ~minute 17–18:

> "This has been really energizing — I've been thinking about exactly this space since Kismet. I'm graduating in May and actively looking for a full-time role where I can work on agentic systems in production. Mews is genuinely my top choice in hospitality tech right now. What would next steps look like from your side?"

Then stop talking.

- **On availability:** "I can start as early as June, and I'm flexible on timeline."
- **On location:** "I'm open to remote or hybrid — currently in New York."

## Related

- [[Mews Property Management System]]
- [[DataChat NLP Analytics]]
- [[Rogers Leo]]
- [[Agentic AI Systems]]
- [[Model Context Protocol (MCP)]]
- [[Hotel Technology Stack]]
- [[Natural Language Interfaces for Data]]
- [[Richard Valtr]]
- [[Kismet Hotel Platform]]
- [[BigQuery Attribution Pipeline]]
- [[PMS Adapter Architecture]]
- [[AI Discoverability for Hotels]]
- [[Revenue Management Automation]]
- [[Atomize Revenue Pricing Engine]]
- [[Flexkeeping Operations Integration]]
- [[Smart Tips Guest Summaries]]
- [[OHIP Amadeus Integration]]
- [[Schema.org Hotel JSON-LD]]
- [[Integration Drift Monitoring]]
