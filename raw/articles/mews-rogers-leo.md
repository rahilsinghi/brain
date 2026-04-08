---
status: pending
source_type: file_drop
source_id: career-datacenter/prep/mews_rogers_leo_prep.md
ingested_at: 2026-04-08T14:25:52.475Z
parsed_at: 2026-04-08T14:25:52.475Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Meeting Prep: Rogers Leo — Mews
**Meeting:** Tuesday, March 3, 2026 · 12:30 PM · 20 minutes**Your goal:** Full-time offer. Graduating NYU MS Computer Engineering May 2026.
**How this happened:** Richard Valtr (Mews CEO) flagged Rahil after their LinkedIn exchange. Rogers reached out directly. This is a founder-to-engineer conversation, not a recruiter screen.

---

## Section 1: Who Is Rogers Leo

**The short version:** Former CEO and co-founder of DataChat — a NLP/conversational analytics startup he built from scratch with a UW-Madison professor — which Mews acquired in October 2025. He joined as Director of Engineering and Product for Agentic AI. He now leads ALL agentic AI work at Mews.

### Academic + Research Background
- **PhD in Computer Science, University of Wisconsin-Madison**
  - UW-Madison is a top-5 CS program for databases and systems research
  - This matters: Rogers respects rigor, first-principles thinking, and well-reasoned tradeoffs
  - Don't bluff. If you don't know something, say so — he'll know if you're bullshitting

### DataChat (2017–2025)
- **Co-founded with Jignesh Patel** (UW-Madison CS professor, expert in database systems)
- **Core product:** "Talk to your data" — natural language queries over structured datasets, no SQL required
  - Built for data analysts, researchers, business users who are blocked by SQL
  - NL interface → query planner → structured results, with conversational follow-ups
- **Why this matters to you:** Rogers spent nearly a decade making complex data systems simple to use. That's his lens on every engineering problem: *can a non-technical person do this by just asking?*
- **GitHub:** github.com/rogersjeffreyl — active open-source contributor

### Mews Acquisition (October 2025)
- Mews acquired DataChat to build the NL interface layer on top of their PMS data
- Rogers joined as **Director of Engineering and Product — Agentic AI**
- He's not just an engineer building features — he's a founder who built a company, sold it, and is now executing Mews' entire AI bet
- **Strategic signal:** When Mews acquired DataChat, they weren't just buying a product. They were buying Rogers' vision of what hotel data should feel like.

### What He Cares About (use to calibrate your talking points)
- Natural language interfaces for complex systems
- Autonomous agents that remove human-in-the-loop bottlenecks
- Democratizing access to data (revenue managers shouldn't need SQL)
- Making hotel operations *less fragmented*, not more
- He's a researcher-turned-founder: he likes dialogue, ideas, and questions — not monologues

---

## Section 2: Mews Fast Facts (2026)

| Signal | Data |
|--------|------|
| Funding | $300M Series D (January 2026, EQT Growth) |
| Valuation | $2.5B |
| Customers | 15,000 properties, 85 countries |
| Active users | 132,000+ monthly active hoteliers |
| API volume | 10M+ daily API messages |
| Marketplace | 1,000+ integrations |
| Rating | #1 PMS 2026 (3rd consecutive year: 2024, 2025, 2026) |
| DataChat acquisition | October 2025 → enabled Rogers joining |
| Smart Tips | AI-powered guest summaries, 5M+ views/week |
| Atomize (acquired) | AI revenue pricing engine — 70% autopilot rate, 35% RevPAR increase |
| 2026 declaration | "Make-or-break year for hotel AI" (published report) |
| Series D use of funds | Agentic AI, Mews Payments (fintech expansion) |

**Key insight:** Mews isn't just building a better PMS. They're building the AI infrastructure layer for hospitality. The Series D is specifically to accelerate that.

---

## Section 3: Your Story Arc

This is the narrative you tell. Practice this until it flows naturally — don't read it, *tell* it.

### Opening Arc (2–3 min): How You Found Mews

> "I was building tracking infrastructure at Kismet, working across 7–8 different booking engines — iHotelier, SynXis, Allora, AZDS. None of them had a clean GTM integration path. I spent weeks reverse-engineering booking flows just to drop footer scripts without breaking checkout. Cookie domains, checkout iframes, referrer chains — every one was different.
>
> When I found Mews had native GTM support built in, it was the first time I thought, 'someone here actually understands the operational pain.' Most booking engines treat tracking as an afterthought. Mews made it a first-class citizen. That became my real interest in Mews."

### Why Agentic AI + Hospitality (1–2 min)

> "What I discovered at Kismet is that hospitality is full of low-hanging fruit for agents. These are systems with well-defined states, repetitive decision trees, and massive latency penalties from human-in-the-loop processing.
>
> I built MCP tools — searchHotels, getHotelRates, bookHotelOffer — precisely because the booking workflow can be turned into a function call schema. Once you have that, agents can orchestrate it. The hard part isn't the agent. It's the clean interface layer underneath."

### Bridge to Mews + Rogers (1 min)

> "When I saw Mews acquired DataChat, it made total sense. The NL interface layer is the missing piece. Revenue managers can't query their data effectively today — not because the data isn't there, but because getting to it requires SQL, or BI tools, or someone on the data team. Combining DataChat's conversational analytics with Mews' PMS data layer is exactly the right architecture."

---

## Section 4: Technical Talking Points

Have 2–3 sentences ready for each. Don't dump them all — pick the 2–3 that connect to what Rogers is working on.

### 1. MCP Tools for Hospitality
Built `searchHotels`, `getHotelRates`, and `bookHotelOffer` using NestJS with JSON-RPC over SSE. This is the exact tool-use layer that agentic systems need to interact with PMS data — structured schemas, typed inputs/outputs, callable by any LLM. Rogers will know immediately what MCP is and why it matters.

### 2. Playwright + LLM Tool-Calling Pipeline
Built a Playwright crawler with GPT-4o/Gemini tool-calling that extracts hotel data from messy, unstructured websites and converts it to schema.org/Hotel JSON-LD with >95% field coverage. This is what a "scraper agent" looks like in production — it's not just extraction, it's structured extraction with validation.

### 3. PMS Adapter Parallelization
Used asyncio to parallelize PMS adapters and Amadeus fallback calls, with Redis/local caching and AlloyDB persistence. When an agentic system needs to query 10+ properties simultaneously, this is the infrastructure. Latency drops from serial seconds to parallel milliseconds.

### 4. BigQuery Data Warehouse + Attribution
Built the GA4 export pipeline, session stitching logic, and multi-signal attribution (UTM source/medium, referrer chains, landing URLs) across Kismet's hotel portfolio. For agents to reason about hotel performance, they need clean, structured data. I built the pipeline that produces it.

### 5. The Fragmentation Problem (The Richard Email Story)
Seven or eight booking engines with completely different GTM patterns, data models, and checkout flows. This is a data normalization problem that agents can solve at scale. I experienced it firsthand — and that's why I immediately recognized Mews' clean integration approach as a meaningful product decision, not just a feature.

*Caveat to use if asked about direct Mews API work:*
> "My team integrated with Mews API for rates — I was primarily on the OHIP/Amadeus side, but I heard firsthand how clean the Mews rate flow was compared to the other PMSs we touched."

---

## Section 5: Agentic AI Ideas for Mews (Power-Sequenced)

**How to use this section:**

Deploy ideas in this order based on where the conversation goes. Don't monologue — drop one idea, let him react, follow the thread.

```
POWER SEQUENCE:
  1 → ALWAYS lead with the Integration Intelligence Agent (grounded, operational, authentic)
  2 → If conversation expands → pivot to AI Discoverability Layer (ecosystem-level thinking)
  3 → If he mentions DataChat → pivot to NL → NL Actions
  4 → If conversation turns to operations → Guest Journey or Multi-Property

That sequence shows: you can operate → think at infra level → think at product level
→ think at ecosystem level. That combination is rare.
```

> **Note on framing:** The "Integration Intelligence Agent" idea is grounded in your Kismet experience with booking engine fragmentation — but for Rogers, the relevant version is **data schema normalization across Mews' 1,000+ integrations**, not GTM tracking (Mews has their own booking engine with native GTM, so tracking normalization isn't their problem). The GTM/tracking angle is your strongest card with Conor Winders (Distribution domain). Keep it separate.

---

### Idea 1 (LEAD): Integration Intelligence Agent
*Combines: booking engine recon + schema normalization + drift monitoring into one lifecycle system*

**The opening line (use this exactly):**
> "I spent weeks manually reverse-engineering booking engine flows to normalize them into a consistent data model. What I realized is there's a repetitive pattern underneath it — reconnaissance, schema mapping, field gap detection, normalization proposal. That work felt mechanical. And mechanical, repetitive, pattern-matching work is what agents are now good at. At Mews' scale with 1,000+ marketplace integrations, I'd imagine that problem is significant."

Then stop. Let him react.

**If he engages — go here:**
> "The way I think about it is three phases that naturally chain together. Phase 1 is recon: given a new partner API, the agent maps their data model and identifies gaps versus Mews' internal schema — what fields exist, what's missing, what's named differently. Phase 2 is normalization: the agent generates a field mapping spec, essentially a translation layer. Phase 3 is drift monitoring: once the integration is live, the agent watches the partner's API changelog and OpenAPI spec for changes and proposes patches before they hit production."

**Technical depth:**

```
PHASE 1 — RECONNAISSANCE (new integration onboarding)
  Input: partner API docs URL or OpenAPI spec
  Agent reads spec → extracts: endpoints, request/response schemas, field names, types
  Compares against Mews internal schema (SpaceType, ReservationState, RatePlan, etc.)
  Outputs: gap report — "partner uses 'room_class', Mews uses 'SpaceType';
           partner has no equivalent for Mews 'RatePlan.restrictions'"

PHASE 2 — NORMALIZATION (field mapping spec generation)
  Agent generates: partner field → Mews field mapping as code
  Handles: renames, type coercions, missing fields (null vs. default), nested structures
  Output: a draft adapter in the target language (TypeScript/Python)
  Human reviews + approves before deployment

PHASE 3 — DRIFT MONITORING (ongoing maintenance)
  Agent monitors: partner changelog RSS, OpenAPI spec diffs (weekly pull + diff)
  Detects: field renames, type changes, deprecated endpoints, new required fields
  Queries impact: "which of our live adapters use this field?"
  Proposes patch: generates a migration diff, opens a PR for review
  Non-obvious cost of drift: silent data corruption — a booking that records the
  wrong room type doesn't fail, it just quietly corrupts the data for 3 months
  until someone notices a revenue report is wrong. Agent catches it before prod.
```

**Why you can own this conversation:**
- At Kismet, you designed the AlloyDB schema for multi-property data across OHIP, Mews, and Amadeus
- The normalization problem (one room, three names: "RoomCategory" / "SpaceType" / "RoomType") is exactly what you lived with
- You built the downstream layer that *depends* on these schemas being stable — so you understand intimately what breaks when they drift
- The Playwright + LLM extraction pipeline you built is Phase 1 of this agent applied to hotel websites. The same architecture applies to API specs.

**⚠️ What NOT to frame this as with Rogers:** Don't use the GTM/tracking version of this idea (reverse-engineering booking engine checkout flows to normalize event models). Mews has their own booking engine with native GTM. That's a Conor Winders / Distribution domain conversation. With Rogers, stay on the data schema / integration infrastructure side.

---

### Idea 2: AI Discoverability Layer
*Use this when the conversation turns strategic, or if Rogers mentions the "semantic layer" concept*

*(Full technical detail in Section 10 — read that before the call.)*

**The pivot line:**
> "At Kismet we were actually solving the inverse problem — instead of agents consuming hotel data, we were structuring hotel data to be consumed by agents. The core insight was that hotels have a split architecture: marketing content on one domain, rates buried in a booking engine LLMs can't reliably penetrate, and operational signals sitting in the PMS invisible to the outside world. Our answer was to bypass the website entirely — connect to the PMS via MCP tools, and publish a hybrid structured content layer to an AI subdomain: static hotel content plus live rate injection at serve time."

**Then the Mews-specific pivot:**
> "I saw Mews published about hotels needing a 'semantic layer' and that 'visibility will hinge on structured content.' But the Connector API is gated — there's no public-facing structured data layer that an external AI agent can discover. Is there any work on the agentic side around closing that loop?"

**Why this lands with Rogers:**
- His published thesis (Mews Agentic AI report, AI Tipping Point report) explicitly calls for a "unified semantic layer"
- Mews has no CMS, no public JSON-LD layer, no AI-readable content product — confirmed gap
- DataChat's strength (NL over structured data) could extend *outbound* — generating AI-readable content from PMS data
- Rogers will understand the architecture immediately. This is his intellectual territory.

**The tracking signal angle (if he engages):**
> "There's one more layer — the data from our GTM/BigQuery pipeline. We had per-hotel signals: AI visit counts, booking velocity, occupancy. The idea was feeding those into the JSON-LD as real-time trust signals — '22 bookings in the last 24 hours, 78% occupied.' An LLM recommending hotels doesn't just need availability, it needs confidence signals. That's the machine-readable equivalent of a hotel with a busy lobby."

---

### Idea 3: NL → NL Actions (DataChat Angle)
*Deploy only if Rogers mentions DataChat, the analytics roadmap, or revenue management*

**Say this:**
> "This is exactly what DataChat was built to do. For a revenue manager with 50 properties, that looks like: 'Which of my properties has the worst RevPAR vs. comp set this weekend?' and getting an answer, not a dashboard. But the version I find interesting is what comes next — NL actions, not just NL queries. 'Which properties should I reprice this weekend?' → agent identifies them → agent calls setRateOverride → changes applied. That's the bridge from DataChat's analytics roots to a fully agentic revenue management loop. Is that on the roadmap?"

**Technical depth:**

```
DataChat's architecture (what Rogers built):
  NL query → Query planner (NLP) → SQL generator → Execute → NL + visualization
  Hard problems solved:
    Ambiguity: "worst RevPAR" needs comp set definition + time window + normalization
    Multi-step: "which to reprice?" = occupancy forecast + comp set rates + gap analysis
    Schema awareness: RevPAR = total_revenue / available_rooms (computed, not a raw field)

What changes post-acquisition:
  DataChat was generic (any structured DB). Now it has Mews' Connector API schema
  natively — every hospitality concept already modeled. Query planner can be
  domain-specific and dramatically more accurate.

The NL → Actions bridge:
  Query: "Which properties should I reprice this weekend?"
  Agent identifies: 3 properties with occupancy < 60% and ADR 15% above comp set
  Confirms: "I'm going to reduce rate by $30 on these 3 properties, Fri-Sun. Confirm?"
  Executes: setRateOverride(propertyId, dateRange, newRate) × 3
  That's DataChat + Mews Connector API + human-in-the-loop approval = agentic RevMgmt
```

**Your angle:** The BigQuery pipeline you built at Kismet is the data production side of this. You understand both ends — getting clean structured data into a warehouse *and* designing the tables that answer business questions. That combination (data pipeline engineer who also thinks about the query layer) is not common.

---

### Idea 4: Guest Journey Agent
*Use if conversation moves to guest experience or Smart Tips*

**One-liner:**
> "The guest lifecycle from reservation to post-stay is a well-defined state machine — and Mews already fires the events. An agent subscribing to those webhooks and personalizing each touchpoint using Smart Tips-style guest context could handle the full comms lifecycle autonomously. Has that pattern been explored on the agentic side?"

**Key technical detail if he asks:**
Each PMS webhook event (reservation.created, T-24hr, checkedIn, checkout) becomes an agent trigger. The agent fetches the guest profile, selects the right action (message / upsell offer / upgrade check), and executes — no human in the loop. The personalization input is exactly what Smart Tips already summarizes: stay history, preferences, spend patterns.

---

### Idea 5: Multi-Property Operations Coordination
*Use only if he brings up Flexkeeping or operational agents*

**One-liner:**
> "The housekeeping coordination window — 11am checkout to 3pm check-in — is a constraint satisfaction problem running on PMS events and room status. An agent watching that event stream in real-time, flagging conflicts early and re-prioritizing queues, could eliminate a whole class of operational fire drills. Is that in scope for the agentic team or does it sit in the Flexkeeping integration?"

*(The Flexkeeping question is smart to raise — it shows you know about the acquisition and understand organizational boundaries.)*

---

## Section 6: 20-Minute Conversation Flow

Print this. Glance at it before the call.

```
0:00–1:30  WARM UP
  "Rogers, really appreciate you reaching out. Richard mentioned you're leading
   the agentic AI work at Mews — that's exactly the intersection I've been
   thinking about most."

1:30–4:00  YOUR STORY
  GTM pain at Kismet → booking engine fragmentation → Mews discovery →
  built MCP tools → saw DataChat acquisition and it clicked.
  [Keep it to ~2 min. Hit the highlights, leave space for him to react.]

4:00–8:00  FLIP IT TO HIM
  "I saw Mews acquired DataChat in October — what does that unlock for the
   agentic roadmap that wasn't possible before?"
  [LISTEN CAREFULLY. This tells you what he's actually building right now.
   Take mental notes. Map his answer to your talking points in Section 4.]

8:00–13:00  SHARE YOUR RELEVANT WORK
  Based on what he said, pick 2–3 talking points from Section 4.
  Don't dump all five. Match his priorities.
  If he mentioned NL queries → go to point 4 (BigQuery) or point 1 (MCP tools).
  If he mentioned integrations → go to points 3 (parallelization) or 5 (fragmentation).

13:00–16:00  IDEAS + CURIOSITY
  ALWAYS lead with the Integration Intelligence Agent (Section 5, Idea 1).
  Use the exact opening line:
  "I spent weeks manually reverse-engineering booking engine flows to normalize
   them into a consistent data model. What I realized is there's a repetitive
   pattern underneath it — recon, schema mapping, gap detection, normalization
   proposal. At Mews' scale with 1,000+ integrations, I'd imagine that problem
   is significant."

  Then follow the thread:
    He engages on integrations → go deeper on the 3-phase architecture
    He mentions DataChat / analytics → pivot to NL → NL Actions (Idea 3)
    He talks about hotel visibility / semantic layer → AI Discoverability (Idea 2)
    He mentions Flexkeeping / ops → Multi-Property Agent (Idea 5)

16:00–18:30  ROLE + TEAM QUESTIONS
  "What does the team structure look like for agentic AI right now?"
  "What would a strong addition to the team look like in the first 90 days?"

18:30–20:00  CLOSE
  [Don't wait for him to bring it up. You bring it up at minute 17–18.]
  → See Section 9 for closing script.
```

---

## Section 7: Questions to Ask Rogers

### Tier 1 — Ask these no matter what
1. **"What did the DataChat acquisition unlock specifically for the agentic AI roadmap?"**
   *(This is the most important question. His answer tells you what he's working on.)*

2. **"What's the hardest unsolved problem you're working on right now?"**
   *(Research-founder question. He'll respect the directness.)*

3. **"Where are agents getting deployed first — back-office ops, guest-facing, or revenue management?"**
   *(Practical. Shows you understand the product surface.)*

### Tier 2 — If time allows
4. "How does the team balance building new agent capabilities vs. maintaining the integration platform?"

5. "What does the engineering culture look like on the agentic AI team post-acquisition?"

6. "What would a strong new hire bring to the team in their first 90 days?"

---

## Section 8: What NOT to Do

**Don't overstate direct Mews API experience.**
You were on the OHIP/Amadeus side. You heard the Mews rate flow was clean. Say that exactly.

**Don't pitch ideas as if you know their roadmap.**
Frame as curiosity + pattern-matching from your own experience. "I've been thinking about..." beats "You should build..."

**Don't make it a monologue.**
Rogers is a researcher and founder. He wants a conversation, not a presentation. Leave pauses. Ask questions.

**Don't be vague about your timeline.**
You're graduating May 2026. You're looking for full-time. Say it clearly when you close.

**Don't skip the close.**
20 minutes moves fast. At minute 17, if he hasn't brought up next steps, you bring it up. See Section 9.

**Don't ramble if you don't know something.**
He has a PhD and built a company. He'll know. "That's outside what I've worked on directly, but here's how I'd think about it..." is the right move.

---

## Section 9: Closing Script

At ~minute 17–18, say this (adapt naturally to the flow of the conversation):

> "This has been really energizing — I've been thinking about exactly this space since Kismet.
> I'm graduating in May and actively looking for a full-time role where I can work on agentic
> systems in production. Mews is genuinely my top choice in hospitality tech right now.
> What would next steps look like from your side?"

Then stop talking. Let him respond.

If he asks about your availability: "I can start as early as June, and I'm flexible on timeline."

If he asks about location: "I'm open to remote or hybrid — currently in New York."

---

## Section 10: The Kismet Idea — AI Discoverability for Hotels

This is your strongest original idea for this meeting. Use it as a question, not a pitch.

### The Problem Kismet Was Solving

Hotels have a **split architecture** that breaks AI discoverability:
- **Marketing content** lives on a vanity website (separate CMS, mostly static)
- **Real rates + availability** live inside the Booking Engine (separate system, loaded dynamically)
- **Operational signals** (occupancy, booking velocity, recent stays) live in the PMS

When an LLM crawls a hotel website or tries to answer "what's available at Hotel X this weekend?" it either:
- Gets marketing fluff (content), no rates
- Halluccinates rates (it can't penetrate the BE's dynamic load)
- Gets no real-time signal about how popular/available the hotel actually is

Even newer models that can execute JS and wait for the BE to load are fragile — rate availability is session-gated and hard to reliably extract.

### What Kismet Built

Kismet's approach: **bypass the website entirely, connect to the PMS directly**.

1. MCP tools (`searchHotels`, `getHotelRates`, `bookHotelOffer`) connected to the PMS via NestJS/JSON-RPC
2. Structured hotel content organized as objects (not pages) and published to an `ai.{hotel}.com` subdomain
3. Schema.org/Hotel JSON-LD enriched with real-time rate data from the PMS feed

The insight: **content on pages is becoming obsolete**. Chat is becoming the primary discovery surface. Hotels need their content stored as machine-readable objects, not HTML pages.

### Rahil's Additional Idea: Tracking Signals as AI Context

Beyond static content, I was thinking about feeding **real-time behavioral signals** into the JSON-LD on the hotel homepage:

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

When an LLM visits the page or is fed context from an AI-visible crawl, it has **social proof and availability signals** that influence its recommendations. "3,000 AI visits this month and 22 bookings in the last 24 hours" is the kind of data that makes an LLM trust a recommendation.

The tracking infrastructure for this (GTM → BigQuery → API serving the structured signal) is exactly what I built at Kismet.

### Why This Matters for Mews Specifically

**Research finding: Mews has NO CMS and NO public-facing structured data layer.**

- Mews published a blog titled "Best hotel website builders" — recommending Wix and Squarespace. They don't offer website/content management.
- The Mews Connector API and Booking Engine API are gated (require hotel-specific credentials). There is no anonymous, publicly-accessible structured data feed from Mews properties.
- The Mews Marketplace has exactly **1 marketing integration** (Bloomreach) and **zero CMS/content platforms**.

Yet Mews has been *extremely explicit* about the problem publicly:

> *"Hotel visibility will hinge less on ad spend and more on structured content, connectivity and open APIs."*
> — Mews "AI Tipping Point" report, December 2025

> *"By 2035, most hotel discovery and bookings will happen through a single AI conversation."*
> — Mews 2035 Outlook (multiple publications)

> *"A unified semantic layer — a unified data model that gives AI the contextual understanding it needs to make accurate, trustworthy decisions."*
> — Mews Agentic AI Report

**The gap: Mews knows the problem and has published the thesis, but has no product that actually helps hotels produce AI-readable structured content or expose PMS signals for external AI discovery.**

Mews owns the richest operational data in hospitality — real-time occupancy, booking velocity, guest signals, rate data. None of it is surfaced in a way that external AI agents can use for hotel discovery.

### How to Raise This in the Meeting

Frame it as curiosity, not a pitch. Time it for the ideas section (~13:00–16:00):

> "At Kismet we were working on something that connects directly to what you've published about — the split architecture problem. Hotels have their marketing content on one system, their rates buried in a booking engine that LLMs can't reliably penetrate, and their operational signals sitting in the PMS invisible to the outside world.
>
> Our approach was to bypass the website, connect directly to the PMS via MCP tool calls, and publish structured content to an AI subdomain — schema.org/JSON-LD enriched with live rate and availability data.
>
> I was also thinking about feeding real-time tracking signals — AI visit counts, booking velocity, occupancy — into that structured data layer. So when an AI agent evaluates a property, it gets 'this hotel had 3,000 AI-driven visits last month and 22 bookings in the last 24 hours' as part of its context.
>
> I saw Mews published about hotels needing a 'semantic layer' and 'AI-ready structured content' — but there seems to be a gap: Mews doesn't have a CMS, and the Connector API is gated, so nothing in the Mews ecosystem actually helps hotels surface as AI-discoverable. Is there any thinking on the agentic side around closing that loop — making PMS signals visible to external AI agents for discovery?"

### Why This Resonates With Rogers Specifically

- **DataChat background**: Rogers spent years building NL interfaces over structured data. The "make operational data queryable" problem is exactly what he built DataChat to solve. Extending that *outbound* — to make Mews property data discoverable by external LLMs — is the logical next move from his research background.
- **The semantic layer**: Mews' agentic AI report explicitly calls for a "unified semantic layer." Rogers is likely the architect of what that means internally. Your idea is a specific, concrete instantiation of it for the discovery use case.
- **It's a genuine question**: You're not telling him what to build. You're connecting your real work at Kismet to a gap you've verified in Mews' public product portfolio and asking if it's on the roadmap.

### One-liner version (if time is short)

> "Kismet was basically building an AI discoverability layer for hotels — MCP tools connected to the PMS, structured content published to an AI subdomain. Is there any thinking at Mews about surfacing PMS signals publicly so hotels become more visible to AI agents?"

---

## Quick Reference Card (Print This for Tomorrow)

```
OPEN:    GTM pain at Kismet → Mews native GTM → "someone gets the operational pain"
BRIDGE:  DataChat acquisition → NL layer on PMS data = the right architecture
FLIP:    "What does the DataChat acquisition unlock for the roadmap?"
TECH:    [MCP tools] [Playwright+LLM pipeline] [PMS parallelization] [BigQuery]

IDEAS — POWER SEQUENCE:
  1 (ALWAYS LEAD):
    "I spent weeks reverse-engineering booking engine flows to normalize them
     into a consistent data model — recon, schema mapping, gap detection,
     normalization proposal. At Mews' scale with 1,000+ integrations, that
     feels like something an agent could now automate."
    → 3 phases: Recon → Schema Normalization → Drift Monitoring
    → NOTE: frame as DATA SCHEMA normalization, not GTM tracking (wrong domain for Rogers)

  2 (if conversation goes strategic / semantic layer):
    Split architecture → Kismet AI subdomain → Mews has no public data layer
    → "Is there work on surfacing PMS signals for external AI discoverability?"

  3 (if he mentions DataChat):
    NL queries → NL actions → setRateOverride as agentic RevMgmt loop

Q's:     DataChat unlock → hardest problem → where agents deploy first
CLOSE:   "Graduating May, full-time, Mews is top choice. What are next steps?"
```

---

*Generated: 2026-03-02 | Meeting: 2026-03-03 12:30 PM*
