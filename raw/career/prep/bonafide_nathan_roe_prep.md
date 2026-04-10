---
status: processed
source_type: career-datacenter
ingested_at: 2026-04-09T21:35:00.000Z
parsed_at: 2026-04-09T21:35:00.000Z
compiled_to: "[[Meeting Prep: Nathan Roe at Bonafide (Software Engineer Interview)]]"
processed_at: 2026-04-10T01:50:23.481Z
retry_count: 0
last_error: null
compile_progress: null
---


# Meeting Prep: Nathan Roe — Bonafide (Software Engineer)

**Meeting:** Thu/Fri this week (Apr 10-11), time TBD by Nathan
**Format:** Likely video call (confirm when he sends details)
**How this happened:** Jeevan Bhattar (CTO) referred you. You messaged Nathan, he accepted and immediately asked to meet.

---

## What This Call IS

Nathan is early-career (UMN math + CS, small LinkedIn network, neuromorphic computing research). This is likely a peer-level conversation, not a senior engineering grilling. Expect:

1. Getting to know each other technically
2. Gauging fit for the team
3. Seeing if you understand the problem space
4. Possibly a soft screen before a deeper technical round with Jeevan or Chris Brown

**Your goal:** Show you deeply understand what Bonafide is building, demonstrate MCP expertise (you literally built MCP tools for hotel data), and learn what you'd actually work on.

---

## Bonafide — What They Build

**One-liner:** AI alignment platform that makes hotel data LLM-readable via MCP.

**The problem:** When travelers ask ChatGPT or Perplexity "does this hotel have a pool?" or "book me a room in Brooklyn," LLMs either hallucinate, give stale data, or can't access real-time info. Hotel data is scattered across PMS systems, booking engines, and marketing sites. None of it is structured for AI agents to use.

**Bonafide's solution:** A verified context layer between hotel backend systems (PMS, CRS, CRM) and LLMs. They:
1. **Aggregate** hotel data from backend systems into MCP-compatible format
2. **Verify** accuracy (rates, amenities, policies, availability)
3. **Distribute** via MCP so any AI agent can query trusted hotel data
4. **Benchmark** with their Interrogator dataset (Hugging Face) to measure how well LLMs actually get hotel facts right

**Key insight:** Without a verified data layer, LLMs hallucinate hotel amenities, give outdated rates, and misrepresent policies. Bonafide is the "source of truth" layer.

---

## Bonafide — Key Facts

| Detail | Info |
|--------|------|
| Founded | 2024, San Francisco |
| Stage | Seed (Javelin Venture Partners, IAG/British Airways parent) |
| Team | ~19 people, ~5-8 engineers |
| Recognition | PhocusWire Hot 25 2026, Plug and Play Startup of 2025 |
| Partnerships | Peninsula Hotels, HEDNA 2025 |
| Product | bonafide.ai / app.bonafide.ai |
| Expansion | International + cruises, rental cars, loyalty programs (2026) |
| HuggingFace | bonafide/bonafide_hotel_data (Interrogator benchmark) |

---

## Founding Team

**Layton Han** (CEO) — Serial entrepreneur, 4th company. Previous 3 scaled to $100M+ (MyPoints.com sold to United Airlines, ADARA sold to RateGain). Data + commerce + loyalty.

**Jeevan Bhattar** (CTO) — 30yr tech. Ex-Bank of the West SVP IT, ex-HP. Founded ServiceWRx. Blockchain, digital transformation, fintech. He's the one who referred you.

**Tom Underwood** (COO) — Ex-CEO StayNTouch PMS (challenged Oracle Hospitality), ex-SVP Hotels at Orbitz/Expedia. Deep hotel distribution experience. His PMS background is directly relevant to your adapter work.

**Christopher Brown** — Founder, Chief Data Scientist, Head of Product. UC Berkeley. Likely architect of the Interrogator benchmark.

---

## Nathan Roe — What We Know

- **Title:** Software Engineer at Bonafide
- **Education:** University of Minnesota, Mathematics + Computer Science
- **Research:** Published preprint on spiking networks solving shortest path problems without Dijkstra's (neuromorphic computing)
- **LinkedIn:** ~11 connections (early career, small network)
- **Style:** Polite, responsive. Replied within hours of your message. "Please let me know your availability" — formal but friendly.

**Implication:** Early-career like you. This will be more peer-to-peer than hierarchical. He probably values theoretical depth given his math background and research interests.

---

## Why Your Experience Is a Near-Perfect Match

This is the closest overlap of any company you've talked to. Spell it out:

| Bonafide Needs | Your Experience |
|----------------|-----------------|
| MCP server infrastructure for hotel data | Built `searchHotels`, `getHotelRates`, `bookHotelOffer` as MCP tools |
| Hotel data extraction and structuring | Playwright + LLM pipeline, >95% field coverage, schema.org/JSON-LD |
| PMS backend connections | OHIP, Mews Connector API, Amadeus GDS adapters |
| Data accuracy/verification | Tool-calling approach kills hallucination vs. raw prompting |
| Handling inconsistent hotel data | Worked across 7-8 booking engines, normalized schemas |
| Benchmarking LLM accuracy | Understand the data quality problem from the extraction side |

---

## Your Opening (1-2 minutes)

> "Thanks for making the time, Nathan. Jeevan connected us after we talked last week. Quick background: I'm finishing my MS at NYU, spent the last year at a hospitality tech startup building MCP tools for hotel search and booking, PMS adapters across OHIP, Mews, and Amadeus, and a data extraction pipeline that structures hotel data from messy websites using LLM tool-calling. When Jeevan told me about Bonafide, the overlap was immediately obvious. You're building the verified data layer via MCP, and I built MCP tools that consume exactly that kind of data on the other side."

Then flip: **"I'd love to hear about what you're working on day to day. What does the engineering team look like?"**

---

## Technical Talking Points

### 1. MCP Tools (LEAD WITH THIS)
- Built three agent-callable MCP endpoints: searchHotels, getHotelRates, bookHotelOffer
- NestJS, JSON-RPC over SSE
- Typed schemas so the LLM knows exact parameters and return types
- Redis caching (short TTL, rate data goes stale fast)
- **Connection to Bonafide:** "I was building the consumer side of what you're building on the provider side. My MCP tools needed a verified data source. That's literally what Bonafide is."

### 2. Hotel Data Extraction Pipeline
- Playwright + GPT-4o/Gemini tool-calling
- >95% field coverage across diverse hotel websites
- Schema.org/JSON-LD extraction where available
- Tool-calling schemas (extractRoomTypes, extractAmenities, etc.) constrain LLM output and kill hallucination
- **Connection to Bonafide:** "The Interrogator benchmark measures whether LLMs get hotel facts right. I built the pipeline that extracts those facts in the first place. The accuracy problem is the same from both directions."

### 3. PMS Adapters
- asyncio parallelization across OHIP, Mews, Amadeus
- Each PMS has its own adapter (auth, request format, response parsing, errors)
- Redis caching + AlloyDB for persistent ID mapping
- OHIP-first / Amadeus-fallback logic
- **Connection to Bonafide:** "If you're aggregating from hotel backends, PMS is the core data source. I've integrated with OHIP and Mews and know where the data quality issues live."

### 4. Interrogator Benchmark (Show You've Done Homework)
- "I looked at the bonafide_hotel_data dataset on Hugging Face. 6,400+ records across 755 hotels, ternary QA on amenities. Smart approach to establish a baseline for LLM accuracy on factual hotel data. Are you expanding the feature types beyond the current 13?"

---

## Questions to Ask Nathan

### Must-ask:
1. **"What does the engineering team look like? How many engineers, and how do you split work?"**
2. **"What's the tech stack? What languages and frameworks are you running the MCP servers on?"**
3. **"How does the data pipeline work? Is it real-time PMS connections, batch processing, or both?"**
4. **"What are you personally working on right now?"**

### If time allows:
5. "How are you scaling beyond the 3 states in the Interrogator dataset?"
6. "What does the Peninsula Hotels integration look like technically?"
7. "Are you building custom MCP servers per hotel chain, or a generalized adapter layer?"
8. "How do you handle the schema inconsistency problem across properties? Every PMS structures amenities differently."
9. "I saw your spiking networks paper. How did you end up going from neuromorphic computing to hotel data?" (rapport builder)

---

## What NOT to Do

1. **Don't treat this as a casual chat.** Nathan asked to meet formally ("schedule a time"). Treat it as a real screen.
2. **Don't oversell.** He's technical and early-career. Substance over polish.
3. **Don't talk about comp or logistics.** Too early. This is fit and interest.
4. **Don't badmouth other companies.** Don't mention Kismet by name.
5. **Don't forget to mention Jeevan.** The warm referral is your biggest advantage. Acknowledge it naturally.
6. **Don't skip the close.** Ask about next steps before hanging up.

---

## Closing Script

> "This is really exciting. The overlap between what I've built and what Bonafide is doing is about as close as it gets. I'd love to keep the conversation going. What do next steps look like from your side?"

---

## Quick Reference Card

```
LOGISTICS: Thu/Fri this week, time TBD by Nathan

OPEN:     "Jeevan connected us" → quick technical intro → MCP tools overlap
          → "What are you working on day to day?"
LISTEN:   Stack, team structure, data pipeline, current priorities
CONNECT:  MCP tools, Playwright pipeline, PMS adapters, Interrogator benchmark
ASK:      Team size? Stack? Data pipeline (real-time vs batch)? Your current work?
CLOSE:    "Overlap is about as close as it gets. What are next steps?"

DIFFERENTIATORS:
  - You built MCP tools for hotel data (consumer side of their product)
  - Playwright + LLM extraction pipeline (data quality from the source)
  - PMS adapters across OHIP/Mews/Amadeus (backend connections they need)
  - You actually know hospitality data problems firsthand

CIIAA:    "I built X" not "Kismet does Y"
```

---

*Generated: 2026-04-09 | Meeting: Apr 10-11 (TBD)*
