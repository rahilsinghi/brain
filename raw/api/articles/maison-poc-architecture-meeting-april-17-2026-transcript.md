---
status: pending
source_type: api
source_id: maison-poc-architecture-meeting-transcript-2026-04-17
ingested_at: 2026-04-17T00:00:00Z
parsed_at: 2026-04-17T00:00:00Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Maison.Travel POC Architecture Meeting — Full Transcript (April 17, 2026)

**Meeting:** Maison.Travel Tech Spec — April 16 (56 min recording via Fathom)
**Recording:** https://fathom.video/calls/640725096
**Attendees:** Rahil Singhi, Fredrik Sjoberg, Kim Granlund, Noel Panicker
**Related:** [[Maison.Travel POC Architecture Meeting April 17 2026]] (summary)

## Key Decisions Captured

- **POC deadline:** Memorial Day (May 25, 2026) — conversational booking for East End hotels
- **Architecture:** Three-layer (Content / MCP Tools / Payments) with Stripe
- **Data strategy:** Hybrid — trigger existing scraper for East End baseline + evaluate EXA for surface-level coverage
- **Pattern:** "Dockerized client" model from Hermes/KELO — each hotel is an agent with pre-hydrated KB
- **IP thesis:** Not ingestion, but what we DO with the data (Fredrik: "We're going to move up the stack")

## Critical Technical Facts

- **Context drift threshold:** 1,500–2,000 lines is where LLMs (even Haiku 4.6) start drifting without JSON schemas to ground them (Kim)
- **Schema philosophy:** JSON files as source of truth, markdown generated from JSON for Obsidian viewing, never the reverse (Kim)
- **Schema validation prevents volatility:** "You can essentially use Haiku to hydrate schemas. You don't need thinking models to figure out what stuff is." (Kim)
- **EXA is the search API** Perplexity uses — fast, web-search-based, being evaluated for dynamic content diffing
- **Preferred Hotels deal context:** Contract sent to "the largest luxury hotel operator in the world." Integration will be via their **headless CMS**, not scraping. "If we sign Preferred, we're going to drop everything else and just make it into a success."

## Content Layer: Full Debate

### Kim (pro full-ownership)
- Content ownership is the IP. "Our IP is ultimately going to be hospitality, knowledge, and intelligence."
- Structured, opinionated system with JSON schemas for every concept (amenities: gym, restaurant, conference center as sub-schemas)
- Ontology must be able to explain what an amenity is and what the different amenities are
- Long-term: "when we have 500,000 hotels in our system, then we can unlock what hospitality intelligence is to other clients. That's a whole different thing to monetize."
- Milliseconds-level query response is the target
- YAML is one-dimensional ("front matter only"), JSON stays as source of truth up and down the stack

### Noel (pro lean)
- "Content layer is a massive engineering effort that risks derailing the POC"
- Use EXA for surface-level data on demand, validate if it's sufficient
- Focus engineering on integrations + booking flow — the genuinely missing pieces
- Mentions evolution in LLM capability: past prescriptive rules that were restrictive now hurt because modern models identify patterns better than engineered templates could
- Referenced Poggio deep research agent — prescriptive rules became anti-pattern as models got stronger

### Fredrik (resolution)
- Hybrid: trigger existing scraper for East End properties to get baseline + learn the pipeline
- Then evaluate EXA to test viability for dynamic content
- "The unique IP is not going to be on the ingestion side"
- Strategic assumption: future content comes from integrations (Preferred CMS) not scraping
- "Hotels are quickly moving to make their content more agent-available anyway"

### Rahil (architectural framing)
- Two separate problems: ingestion (needs heavy guardrails + schemas) vs output (system prompts are more about glossary/definitions than instructions)
- Proposed V0/V1 split: V0 = surface-level publicly available data (scraping, Places API, Google reviews/photos), V1 = dynamic integrations
- On amenities schema / JSON-LD: "amenities table is one attribute, not the whole base... hotel gets ~5 objects (schema.org from website, rates data, PMS config, etc.)"

## Knowledge Graph Implementation Notes (Rahil's brain demo)

- Pattern: raw ingestion → wiki article per raw → embed → LanceDB index
- Query flow: LLM runs embedded search on knowledge graph — "theoretically 90% fewer tokens to get 5 layers of context" via graph traversal (BFS/DFS)
- Graphify integrated as a skill: any repo you work on, initiate graphify command and it adds to the unified KB
- Kim's response: "Instead of markdown files, we just use JSON files. We output markdown from the JSON, not the other way around. And then you can view them in Obsidian... essentially becomes an interface to your Hermes."

## "Dockerized Client" Model (Kim's vision, the core architectural pattern)

Year-ahead framing:
> "When clients sign up with Maison, they essentially get like a basic Claude account. It's like opening up Hermes or KELO. It sets up your core folders. It would hydrate your CLAUDE.md based on what Maison knows about your property to start with. There would be other folders in there for things like what we know about your customers. There would be things we know about — all of these things that are sort of unique IP that Maison brings that then essentially lets you stand up this sort of Ultron-style agent right off the bat that already has, like, it's fully trained, basically."

- All agentic workflows Fredrik is architecting hydrate the skills folder
- Tools folder = all the integrations
- "Every hotel is an agent in our system. Whether it's a Claude agent or not, it still needs to be agentic."

Operator self-service pattern (Rahil extended):
- Mobile app for hotel operator — speak/type today's restaurant offer, events
- Auto-ingests to knowledge base in real-time
- Always has latest ingested data per property

## Content Gap Problem (Fredrik's clarification)

Three data tiers:
1. **Public web data:** table stakes, trivially ingested
2. **Integrated content feeds:** third-party or direct CMS
3. **Operator-filled gaps:** forever-free starter agent lets operators flag and fill gaps

**Critical constraint for East End POC:** 100 properties, only 5-10 will sign up for admin tools. CANNOT assume operators fill gaps. Must do heavy lifting / triangulation from public data.

Flywheel rationale: if service takes off, operators have incentive to sign up to be scored higher, but this is downstream, not POC scope.

## Website Sync / Diffing Engineering Challenge

Fredrik: existing "website sync" is a premium feature, diffing-based, hotel website = main source but other sources can be pointed to.

Kim's proposed approach:
- EXA daily search for all clients, filter by last-updated
- Sitemap.xml watching + simple diffing (no LLM needed for change detection)
- Cache previous scrape, diff on date change, isolate diffed parts, give ONLY the diff to LLM to process
- Escalation logic: sitemap updated 2 hours ago → check → oh, new restaurant menu → pull and process

Noel's caveat: sitemap.xml changes aren't the only signal — seasonality matters (hotel builds pool over summer, sitemap doesn't reflect that).

Ownership: Fredrik flagged this as "Sandeep-level engineering" — "above all our pay grades." Non-trivial at scale. Potential standalone monetizable service.

## Recurring Data / Offers (Rahil raised)

- Hotels have recurring seasonal offers
- Can't be async-only — needs cron job or admin entry path
- Offers are strong KB content, especially current ones
- Resolution: covered by the operator admin entry path + sitemap diffing

## POC Scope Timeboxing (Noel's push)

- Timebox each layer — "not end up in a place where we spend four weeks on just one component and then the entire thing is just left hanging"
- Rahil's proposed first sprint (2-3 weeks): data layer + initial KB + MCP tools to READ from KB (query/response only, no rates/booking yet)
- Fredrik pushback: "two days, not two weeks" for that scope — wants more time on booking execution
- Agreement: don't fully timebox yet, but avoid getting stuck in content layer
- **Hard deadline:** something up and running by Memorial Day (May 25) that books East End hotels conversationally

## Explicit Action Items

### Rahil
- Revise architecture document — detail Content Layer, define V0 (surface-level) vs V1 (integrated, dynamic)
- Trigger the existing scraper for all East End properties (100 properties) to learn the current ingestion pipeline
- Focus on schemas and data structures before anything else: "the most important and complicated part is going to be the data, fixing on schemas and data and deciding on a uniform layer, a first layer"

### Fredrik
- Create corporate EXA account, invite Rahil, Kim, Noel
- (Fredrik-side) architect agent workflows (hydrates the skills folder in Kim's model)

### Sandeep (not present, assigned)
- Deploy the scraper and ingestion pipeline to the monorepo (currently not there)

### Kim (implicit)
- Continue to be the architectural conscience on schema-first design
- Reference Hermes / KELO / Claude Code folder structures as the supermodel to start from

## Team Dynamics Notes

- Kim: head of design / head of product / engineer ("switches 20 times a day"). Most opinionated on architecture. Hermes/KELO perspective.
- Noel: "has a day job," co-founder. Pragmatist. Pushed timeboxing. Poggio background.
- Fredrik: CEO. Recorded every meeting. "Non-technical guy" but makes the strategic calls. Preferred Hotels dealmaker.
- Rahil: new hire (Day 2), Kismet travel-tech background, brain/knowledge graph project context
- Sandeep: absent but heavily invoked — "24/7 into building this monster system," the engineering backstop

## Historical Context

- Rahil was previously at Kismet (travel startup). Same investor approached Kismet 2 months ago — now Rahil is here. "This is how the world works." (Fredrik)
- Recording is standard practice — Fathom for all meetings, Fredrik explicitly noted "we're recording this, so that's a good action item"

## Cross-References

- [[Maison.Travel POC Architecture Meeting April 17 2026]] (summary)
- [[Maison Workspace Hub]]
- [[Maison Travel AI-Native Travel App]]
- [[Maison Platform Architecture]]
- [[Bootstrap Meeting April 15 2026]]
- [[Preferred Hotels Integration]]
- [[Hermes Dockerized Client Pattern]]

## Tags
maison, poc, architecture, knowledge-graph, meeting-transcript, 2026-04-17, east-end, memorial-day, mcp, stripe, exa, derbysoft, hermes, kelo, dockerized-client, preferred-hotels, schema-driven-design, json-schemas, content-layer, scraper, sitemap-diffing, v0-v1-planning
