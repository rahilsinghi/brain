---
title: "Meeting Prep: Nathan Roe at Bonafide (Software Engineer Interview)"
author: ai
created_at: 2026-04-10T01:50:23.481Z
last_ai_edit: 2026-04-10T01:50:23.481Z
last_human_edit: null
last_embedded_hash: 9db2c165287b3cce
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/career/prep/bonafide_nathan_roe_prep.md]]"
tags:
  - interview-prep
  - bonafide
  - mcp
  - hotel-tech
  - hospitality
  - software-engineering
  - job-search
  - llm
  - pms
  - data-pipeline
  - networking
  - seed-stage-startup
---


# Meeting Prep: Nathan Roe at Bonafide (Software Engineer Interview)

Preparation notes for a peer-level screening call with Nathan Roe, a Software Engineer at Bonafide, referred by CTO Jeevan Bhattar. Bonafide builds an AI alignment platform that makes hotel data LLM-readable via MCP (Model Context Protocol). The candidate's background in MCP tooling, hotel data extraction, and PMS integrations represents a near-perfect technical overlap with Bonafide's core engineering work.

## Key Concepts

- **MCP (Model Context Protocol):** The technical standard Bonafide uses to expose verified hotel data to LLM agents; candidate has built MCP tools on the consumer side
- **Verified Context Layer:** Bonafide's core product — a trusted data intermediary between hotel backend systems (PMS, CRS, CRM) and AI agents
- **Interrogator Benchmark:** Bonafide's Hugging Face dataset (`bonafide/bonafide_hotel_data`) with 6,400+ records across 755 hotels used to measure LLM accuracy on factual hotel data
- **PMS Adapters:** Integrations with Property Management Systems (OHIP, Mews, Amadeus) that serve as the primary source of structured hotel data
- **Hotel Data Hallucination Problem:** LLMs frequently return stale, incorrect, or fabricated hotel information (rates, amenities, policies) without a verified data layer
- **Neuromorphic Computing:** Nathan Roe's research background (spiking networks for shortest-path problems), useful as a rapport-building topic
- **Tool-Calling Schema Approach:** Constraining LLM output via typed schemas to eliminate hallucination in data extraction pipelines

## Details

## Company Overview: Bonafide

**One-liner:** AI alignment platform that makes hotel data LLM-readable via MCP.

**Founded:** 2024, San Francisco | **Stage:** Seed (Javelin Venture Partners, IAG/British Airways parent) | **Team:** ~19 people, ~5–8 engineers

**Recognition:** PhocusWire Hot 25 2026, Plug and Play Startup of 2025 | **Partnerships:** Peninsula Hotels, HEDNA 2025

### The Problem
When travelers ask ChatGPT or Perplexity "does this hotel have a pool?" or "book me a room in Brooklyn," LLMs hallucinate, return stale data, or cannot access real-time information. Hotel data is scattered across PMS systems, booking engines, and marketing sites — none of it structured for AI agents.

### Bonafide's Solution
A verified context layer between hotel backends and LLMs that:
1. **Aggregates** hotel data from PMS/CRS/CRM into MCP-compatible format
2. **Verifies** accuracy (rates, amenities, policies, availability)
3. **Distributes** via MCP so any AI agent can query trusted hotel data
4. **Benchmarks** via the Interrogator dataset (Hugging Face) to measure LLM factual accuracy

**Expansion roadmap (2026):** International hotels, cruises, rental cars, loyalty programs

---

## Founding Team

| Name | Role | Background |
|------|------|------------|
| Layton Han | CEO | Serial entrepreneur (4th company); MyPoints.com (sold to United Airlines), ADARA (sold to RateGain); scaled 3 companies to $100M+ |
| Jeevan Bhattar | CTO | 30yr tech; ex-Bank of the West SVP IT, ex-HP, founded ServiceWRx; blockchain, fintech — **the referral source** |
| Tom Underwood | COO | Ex-CEO StayNTouch PMS (competed with Oracle Hospitality), ex-SVP Hotels at Orbitz/Expedia |
| Christopher Brown | Founder / Chief Data Scientist / Head of Product | UC Berkeley; likely architect of Interrogator benchmark |

---

## Nathan Roe — Profile

- **Title:** Software Engineer at Bonafide
- **Education:** University of Minnesota, Mathematics + Computer Science
- **Research:** Published preprint on spiking networks solving shortest-path problems without Dijkstra's (neuromorphic computing)
- **LinkedIn:** ~11 connections — early-career, small network
- **Communication style:** Polite, responsive, formal but friendly
- **Implication:** Peer-level conversation; likely values theoretical depth given math/research background

---

## Candidate–Bonafide Technical Alignment

| Bonafide Needs | Candidate Experience |
|----------------|---------------------|
| MCP server infrastructure for hotel data | Built `searchHotels`, `getHotelRates`, `bookHotelOffer` as MCP tools |
| Hotel data extraction and structuring | Playwright + LLM pipeline, >95% field coverage, schema.org/JSON-LD |
| PMS backend connections | OHIP, Mews Connector API, Amadeus GDS adapters |
| Data accuracy / hallucination prevention | Tool-calling approach constrains LLM output vs. raw prompting |
| Handling inconsistent hotel data | Normalized schemas across 7–8 booking engines |
| Benchmarking LLM accuracy | Deep understanding of the data quality problem from extraction side |

---

## Call Structure

### Opening (1–2 minutes)
> "Thanks for making the time, Nathan. Jeevan connected us after we talked last week. Quick background: I'm finishing my MS at NYU, spent the last year at a hospitality tech startup building MCP tools for hotel search and booking, PMS adapters across OHIP, Mews, and Amadeus, and a data extraction pipeline that structures hotel data from messy websites using LLM tool-calling. When Jeevan told me about Bonafide, the overlap was immediately obvious. You're building the verified data layer via MCP, and I built MCP tools that consume exactly that kind of data on the other side."

Then flip: **"I'd love to hear about what you're working on day to day. What does the engineering team look like?"**

### Key Technical Talking Points

**1. MCP Tools (Lead with this)**
- Three agent-callable MCP endpoints: `searchHotels`, `getHotelRates`, `bookHotelOffer`
- NestJS, JSON-RPC over SSE; typed schemas for parameter/return type clarity
- Redis caching with short TTL (rate data goes stale fast)
- *Framing:* "I was building the consumer side of what you're building on the provider side."

**2. Hotel Data Extraction Pipeline**
- Playwright + GPT-4o/Gemini tool-calling
- >95% field coverage across diverse hotel websites
- Schema.org/JSON-LD extraction; tool-calling schemas (`extractRoomTypes`, `extractAmenities`) eliminate hallucination
- *Framing:* "The Interrogator benchmark measures whether LLMs get hotel facts right. I built the pipeline that extracts those facts in the first place."

**3. PMS Adapters**
- asyncio parallelization across OHIP, Mews, Amadeus
- Per-PMS adapters: auth, request format, response parsing, error handling
- Redis caching + AlloyDB for persistent ID mapping; OHIP-first / Amadeus-fallback logic
- *Framing:* "PMS is the core data source for aggregation. I've integrated with OHIP and Mews and know where the data quality issues live."

**4. Interrogator Benchmark (Demonstrate homework)**
- "I looked at the `bonafide_hotel_data` dataset on Hugging Face — 6,400+ records across 755 hotels, ternary QA on amenities. Smart baseline for LLM factual accuracy. Are you expanding beyond the current 13 feature types?"

---

## Questions to Ask

### Must-ask
1. "What does the engineering team look like? How many engineers, and how do you split work?"
2. "What's the tech stack? What languages and frameworks are you running the MCP servers on?"
3. "How does the data pipeline work — real-time PMS connections, batch processing, or both?"
4. "What are you personally working on right now?"

### If time allows
5. "How are you scaling beyond the 3 states in the Interrogator dataset?"
6. "What does the Peninsula Hotels integration look like technically?"
7. "Are you building custom MCP servers per hotel chain, or a generalized adapter layer?"
8. "How do you handle schema inconsistency across properties? Every PMS structures amenities differently."
9. "I saw your spiking networks paper — how did you end up going from neuromorphic computing to hotel data?" *(rapport builder)*

---

## Closing Script
> "This is really exciting. The overlap between what I've built and what Bonafide is doing is about as close as it gets. I'd love to keep the conversation going. What do next steps look like from your side?"

---

## What NOT to Do
- Do not treat this as a casual chat — Nathan requested a formal meeting
- Do not oversell; substance over polish with a technical early-career peer
- Do not discuss compensation or logistics (too early)
- Do not reference other companies by name
- Do not skip acknowledging Jeevan's referral — it is the primary trust signal
- Do not skip asking about next steps before ending the call

---

## Logistics
- **Date:** Thursday or Friday, April 10–11 (time TBD by Nathan)
- **Format:** Likely video call (confirm when Nathan sends details)
- **Referral source:** Jeevan Bhattar (CTO)

## Related

- [[Bonafide AI]]
- [[Model Context Protocol (MCP)]]
- [[Hotel Data Extraction Pipeline]]
- [[PMS Adapter Architecture]]
- [[Jeevan Bhattar]]
- [[Interrogator Benchmark]]
- [[LLM Hallucination in Hospitality Data]]
- [[OHIP Integration]]
- [[Mews Connector API]]
- [[Amadeus GDS Adapter]]
- [[Neuromorphic Computing]]
- [[NYU MS Job Search]]
