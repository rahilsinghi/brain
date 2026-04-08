---
title: Rogers Leo — Mews Meeting Prep (March 3, 2026)
author: ai
created_at: 2026-04-08T16:28:16.599Z
last_ai_edit: 2026-04-08T16:28:16.599Z
last_human_edit: null
last_embedded_hash: 22214f1d2494f523
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/articles/mews-rogers-leo.md]]"
tags:
  - interview-prep
  - mews
  - rogers-leo
  - agentic-ai
  - hospitality-tech
  - mcp-tools
  - nlp
  - pms
  - datachat
  - career
  - full-time
  - nyu
  - meeting-prep
  - integration-agents
  - structured-data
  - revenue-management
---


# Rogers Leo — Mews Meeting Prep (March 3, 2026)

Preparation document for a 20-minute founder-to-engineer conversation with Rogers Leo, Director of Engineering and Product for Agentic AI at Mews, aimed at securing a full-time offer post-graduation in May 2026. Rogers is the former CEO and co-founder of DataChat, a conversational analytics startup acquired by Mews in October 2025. The meeting focuses on demonstrating fit for Mews' agentic AI initiatives through relevant technical work, original product ideas, and strategic alignment with Rogers' research and product background.

## Key Concepts

- **Agentic AI in Hospitality**: Autonomous agent systems designed to remove human-in-the-loop bottlenecks in hotel operations, revenue management, and guest experience
- **MCP (Model Context Protocol) Tools**: Structured, typed tool-use interfaces (e.g., `searchHotels`, `getHotelRates`, `bookHotelOffer`) enabling LLMs to interact with PMS data via JSON-RPC over SSE
- **Integration Intelligence Agent**: A three-phase agent system (Reconnaissance → Schema Normalization → Drift Monitoring) for automating API integration lifecycle management across Mews' 1,000+ marketplace integrations
- **AI Discoverability Layer**: Architecture for surfacing hotel PMS signals (rates, occupancy, booking velocity) as machine-readable structured content for external AI agent discovery
- **NL → NL Actions**: Extension of DataChat's natural language query paradigm into executable agentic actions (e.g., querying underperforming properties and autonomously calling `setRateOverride`)
- **PMS Data Fragmentation**: The split architecture problem where hotel marketing content, rate/availability data, and operational signals exist in disconnected systems inaccessible to AI agents
- **Semantic Layer**: A unified, structured data model enabling AI systems to make accurate, contextually-aware decisions over hospitality data — a concept Mews has publicly advocated for
- **DataChat Acquisition**: Mews' October 2025 acquisition of DataChat to build a natural language interface layer on top of their property management system data

## Details

## Person: Rogers Leo

### Background
- **PhD, Computer Science, University of Wisconsin-Madison** (top-5 CS program for databases and systems research)
- **Co-founded DataChat (2017–2025)** with UW-Madison professor Jignesh Patel
  - Core product: natural language queries over structured datasets without SQL
  - Architecture: NL query → query planner → SQL generator → structured results with conversational follow-ups
- **Joined Mews as Director of Engineering and Product — Agentic AI** following DataChat acquisition (October 2025)
- Leads all agentic AI work at Mews
- Active open-source contributor: github.com/rogersjeffreyl

### What He Values
- Natural language interfaces for complex systems
- Autonomous agents that eliminate human-in-the-loop bottlenecks
- Democratizing data access (revenue managers should not need SQL)
- Reducing hospitality operational fragmentation
- Dialogue and intellectual exchange over monologue presentations

---

## Company: Mews (2026 Snapshot)

| Signal | Data |
|--------|------|
| Funding | $300M Series D (January 2026, EQT Growth) |
| Valuation | $2.5B |
| Customers | 15,000 properties, 85 countries |
| Monthly Active Users | 132,000+ hoteliers |
| API Volume | 10M+ daily messages |
| Marketplace | 1,000+ integrations |
| PMS Ranking | #1 PMS 2024, 2025, 2026 |
| Smart Tips | AI guest summaries, 5M+ views/week |
| Atomize | AI pricing engine, 70% autopilot rate, 35% RevPAR increase |
| Series D Use | Agentic AI + Mews Payments (fintech) |

**Strategic context:** Mews is positioning as the AI infrastructure layer for hospitality, not merely a better PMS. The Series D is explicitly allocated toward agentic AI acceleration.

---

## Narrative Arc

### Opening (2–3 min)
GTM integration pain across 7–8 booking engines at Kismet (iHotelier, SynXis, Allora, AZDS) — cookie domains, checkout iframes, referrer chains all different. Discovering Mews' native GTM support as evidence that someone at Mews understood operational pain firsthand.

### Why Agentic AI + Hospitality (1–2 min)
Hospitality systems have well-defined states, repetitive decision trees, and high latency penalties from human-in-the-loop processing. Built MCP tools precisely because booking workflows can be expressed as function call schemas — the hard part is the clean interface layer underneath, not the agent itself.

### Bridge to Mews + Rogers (1 min)
DataChat acquisition made sense immediately: revenue managers cannot query their data effectively today not because data is absent, but because access requires SQL or dedicated BI resources. DataChat's conversational analytics combined with Mews' PMS data layer is the correct architecture.

---

## Technical Talking Points

1. **MCP Tools for Hospitality**: `searchHotels`, `getHotelRates`, `bookHotelOffer` built with NestJS, JSON-RPC over SSE — the exact tool-use layer agentic systems need for PMS interaction.
2. **Playwright + LLM Tool-Calling Pipeline**: GPT-4o/Gemini tool-calling pipeline extracting hotel data from unstructured websites, converting to schema.org/Hotel JSON-LD with >95% field coverage.
3. **PMS Adapter Parallelization**: asyncio-based parallelization of PMS adapters and Amadeus fallback calls with Redis/local caching and AlloyDB persistence — reduces serial-second latency to parallel-millisecond latency.
4. **BigQuery Data Warehouse + Attribution**: GA4 export pipeline, session stitching, multi-signal attribution (UTM, referrer chains, landing URLs) across hotel portfolio — produces clean structured data for agent reasoning.
5. **The Fragmentation Problem**: Firsthand experience normalizing 7–8 booking engines with different data models — a normalization problem agents can solve at scale.

---

## Agentic AI Ideas (Power Sequence)

### Idea 1 — Integration Intelligence Agent (ALWAYS LEAD)

Grounded in booking engine schema normalization experience. At Mews' scale, framed as **data schema normalization across 1,000+ integrations** (not GTM tracking — that is the wrong domain for Rogers).

**Opening line:**
> "I spent weeks manually reverse-engineering booking engine flows to normalize them into a consistent data model. What I realized is there's a repetitive pattern underneath it — reconnaissance, schema mapping, field gap detection, normalization proposal. That work felt mechanical. And mechanical, repetitive, pattern-matching work is what agents are now good at. At Mews' scale with 1,000+ marketplace integrations, I'd imagine that problem is significant."

**Three-phase architecture:**

- **Phase 1 — Reconnaissance**: Agent ingests partner API docs or OpenAPI spec, extracts endpoints and schemas, compares against Mews internal schema, outputs a gap report (field name mismatches, missing fields, type discrepancies)
- **Phase 2 — Normalization**: Agent generates field mapping spec as code (TypeScript/Python draft adapter) with renames, type coercions, null handling; human reviews before deployment
- **Phase 3 — Drift Monitoring**: Agent monitors partner changelog RSS and OpenAPI spec diffs weekly, detects breaking changes, identifies affected live adapters, generates migration diffs and opens PRs for review

**Key risk addressed**: Silent data corruption — a booking recording the wrong room type doesn't fail; it quietly corrupts revenue reporting data for months. Drift monitoring catches this before production.

---

### Idea 2 — AI Discoverability Layer (Strategic/Semantic Layer Conversations)

**The problem**: Hotels have a split architecture — marketing content on a vanity site, rates inside a session-gated booking engine LLMs cannot reliably penetrate, and operational signals locked in the PMS invisible externally.

**Kismet's approach**: Bypass the website. Connect to the PMS via MCP tools. Publish structured content (schema.org/Hotel JSON-LD enriched with live PMS rate data) to an `ai.{hotel}.com` subdomain.

**Additional layer — tracking signals as AI context**:
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
Real-time behavioral signals (AI visit counts, booking velocity, occupancy) fed into JSON-LD as machine-readable social proof and availability confidence signals for LLM recommendations.

**Verified gap at Mews**: Mews has no CMS, no public-facing structured data layer, and only one marketing integration in the Marketplace (Bloomreach). The Connector API is credential-gated with no anonymous discovery feed — yet Mews has explicitly published that "hotel visibility will hinge on structured content, connectivity and open APIs" and called for a "unified semantic layer."

**Framing for Rogers**: Ask as a genuine question about roadmap, not a pitch.

---

### Idea 3 — NL → NL Actions (Deploy If DataChat Mentioned)

Extends DataChat's NL query paradigm to executable agentic actions:
- Query: "Which properties should I reprice this weekend?"
- Agent identifies: 3 properties with occupancy <60% and ADR 15% above comp set
- Confirms with human: "I'm going to reduce rate by $30 on these 3 properties, Fri–Sun. Confirm?"
- Executes: `setRateOverride(propertyId, dateRange, newRate)` × 3

DataChat + Mews Connector API + human-in-the-loop approval = agentic revenue management loop.

---

### Idea 4 — Guest Journey Agent (If Smart Tips or Guest Experience Mentioned)
Guest lifecycle as a well-defined state machine. PMS webhooks (reservation.created, T-24hr, checkedIn, checkout) become agent triggers. Agent fetches guest profile, selects personalized action (message, upsell, upgrade check), executes autonomously using Smart Tips-style guest context.

---

### Idea 5 — Multi-Property Operations Coordination (If Flexkeeping Mentioned)
Housekeeping coordination window (11am checkout to 3pm check-in) as a constraint satisfaction problem on PMS events. Agent monitors event stream in real-time, flags conflicts, re-prioritizes queues, eliminates operational fire drills.

---

## 20-Minute Conversation Flow

| Time | Action |
|------|--------|
| 0:00–1:30 | Warm up — acknowledge Rogers leading agentic AI work |
| 1:30–4:00 | Your story — GTM pain → Mews discovery → MCP tools → DataChat acquisition click |
| 4:00–8:00 | Flip to Rogers — "What does the DataChat acquisition unlock for the agentic roadmap?" |
| 8:00–13:00 | Share relevant technical work — 2–3 points matched to what he said |
| 13:00–16:00 | Ideas — ALWAYS lead with Integration Intelligence Agent; follow the thread |
| 16:00–18:30 | Role and team questions |
| 18:30–20:00 | Close — graduation timeline, full-time intent, next steps |

---

## Questions to Ask

**Tier 1 (Always ask)**:
1. "What did the DataChat acquisition unlock specifically for the agentic AI roadmap?"
2. "What's the hardest unsolved problem you're working on right now?"
3. "Where are agents getting deployed first — back-office ops, guest-facing, or revenue management?"

**Tier 2 (If time allows)**:
4. "How does the team balance new agent capabilities vs. integration platform maintenance?"
5. "What does engineering culture look like on the agentic AI team post-acquisition?"
6. "What would a strong new hire bring to the team in their first 90 days?"

---

## Closing Script

> "This has been really energizing — I've been thinking about exactly this space since Kismet. I'm graduating in May and actively looking for a full-time role where I can work on agentic systems in production. Mews is genuinely my top choice in hospitality tech right now. What would next steps look like from your side?"

- **Availability**: Can start as early as June, flexible on timeline
- **Location**: Open to remote or hybrid, currently in New York

---

## Key Guardrails

- Do not overstate direct Mews API experience — you were on the OHIP/Amadeus side
- Frame ideas as curiosity and pattern-matching, not roadmap prescriptions
- Do not monologue — Rogers is a researcher-founder who wants dialogue
- State graduation timeline and full-time intent clearly at close
- If you don't know something, say so: "That's outside what I've worked on directly, but here's how I'd think about it..."
- Keep GTM/tracking normalization framing for Conor Winders (Distribution domain), not Rogers

## Related

[[Rogers Leo]] | [[Mews]] | [[DataChat]] | [[Agentic AI]] | [[Model Context Protocol (MCP)]] | [[Property Management Systems (PMS)]] | [[Natural Language Interfaces]] | [[Hotel Revenue Management]] | [[AI Discoverability]] | [[Schema.org Structured Data]] | [[Kismet]] | [[Amadeus OHIP]] | [[BigQuery Data Pipeline]] | [[Playwright Web Extraction]] | [[Jignesh Patel]] | [[Richard Valtr]]
