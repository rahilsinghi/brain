---
status: pending
source_type: api
source_id: maison-poc-architecture-meeting-2026-04-17
ingested_at: 2026-04-17T00:00:00Z
parsed_at: 2026-04-17T00:00:00Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Maison.Travel POC Architecture Meeting — April 17, 2026

**Attendees:** Rahil, Fredrik, Kim, Noel, Sandeep
**Purpose:** Define the technical architecture for the Maison.Travel POC

## Key Takeaways

- **Architecture:** Three-layer — structured Content Layer (Knowledge Graph) → MCP Tools (Search, Rates, Book) → Payments (Stripe)
- **Data Strategy:** Hybrid approach for POC — debate between full-ownership (scraping, structured JSON) vs lean (search APIs like EXA) resolved as hybrid
- **POC Goal:** Conversational booking experience for East End hotels by **Memorial Day** (May 25, 2026). Prioritize end-to-end flow over a perfect content layer
- **Key Insight:** Adopt the "dockerized client" model from internal projects (Hermes, KELO) — each hotel is an agent with a pre-hydrated knowledge base

## Initial Architecture Proposal (Rahil)

Three-layer architecture for Maison.Travel POC:

1. **Content Layer (Knowledge Graph):** Structure all hotel data (website, AI, PMS) into a uniform, schema.org-compliant JSON object. This foundation is critical for accuracy and performance of subsequent layers.
2. **Integrations:** Connect to PMSs (e.g., Derbysoft) for rates, with third-party tools as a fallback to ensure coverage.
3. **MCP Tools:** Build the core conversational tools: Search Hotel, Get Rates, Book Offer.
4. **Payments:** Integrate Stripe to enable transactions.

## Content Layer Debate: Full Ownership vs. Lean Approach

### Full Ownership Argument (Kim)
- Structured, opinionated content system is the core IP
- JSON schemas essential for grounding LLMs, preventing context drift (which occurs around 1,500–2,000 lines of text), and enabling validation
- Long-term goal: comprehensive hospitality knowledge base to monetize as a separate intelligence service

### Lean Approach Argument (Noel)
- Building and maintaining a full content layer is a massive engineering effort that risks derailing the POC
- POC should focus on core integrations and the booking flow
- Use a performant search API (e.g., EXA) to fetch surface-level data on demand, validating if it's sufficient for relevant results

### Hybrid Resolution (Fredrik)
- POC will use a hybrid approach
- **Baseline:** Trigger the existing scraper for all East End properties to get familiar with the current pipeline
- **Exploration:** Evaluate EXA to test its viability for dynamic content and updates
- **Strategic Shift:** The unique IP is what we do with the data, not the ingestion method. The team must assume future content will come from direct integrations (e.g., Preferred Hotels' headless CMS), not just scraping.

## The "Dockerized Client" Model (Kim)

Key architectural pattern from internal projects (Hermes, KELO) to guide the POC.

- **Core Concept:** Treat each hotel as a "dockerized client" or agent
- Each client gets a pre-hydrated knowledge base (e.g., JSON files, markdown) based on Maison's initial data
- Operators can use admin tools to manually add non-public data, filling gaps and improving agent performance
- **Rationale:** Provides a clear, scalable framework for managing hotel-specific data and agent capabilities

## Next Steps / Action Items

### Rahil
- Revise the architecture document to detail the Content Layer, defining V0 (surface-level data) and V1 (integrated, dynamic data)
- Trigger the existing scraper for all East End properties to learn the current ingestion pipeline

### Fredrik
- Create a corporate EXA account and invite Rahil, Kim, and Noel

### Sandeep
- Deploy the scraper and ingestion pipeline to the monorepo

## Cross-References

- [[Maison Workspace Hub]]
- [[Maison Travel AI-Native Travel App]]
- [[Maison Platform Architecture]]
- [[Bootstrap Meeting April 15 2026]]

## Tags
maison, poc, architecture, knowledge-graph, meeting-notes, 2026-04-17, east-end, memorial-day, mcp, stripe, exa, derbysoft, hermes, kelo, dockerized-client
