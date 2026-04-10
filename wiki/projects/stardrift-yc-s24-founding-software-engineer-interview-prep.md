---
title: Stardrift (YC S24) — Founding Software Engineer Interview Prep
author: ai
created_at: 2026-04-10T01:54:31.251Z
last_ai_edit: 2026-04-10T01:54:31.251Z
last_human_edit: null
last_embedded_hash: bec60d1bc01ae241
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/career/prep/stardrift_leila_clark_prep.md]]"
tags:
  - interview-prep
  - startup
  - yc-s24
  - ai-travel
  - founding-engineer
  - llm-applications
  - travel-apis
  - amadeus
  - duffel
  - fastapi
  - modal
  - redis
  - sse
  - tool-calling
  - leila-clark
  - stardrift
  - job-search
  - technical-screen
  - salary-negotiation
  - kismet
---


# Stardrift (YC S24) — Founding Software Engineer Interview Prep

Stardrift is a Y Combinator S24 AI travel agent startup founded by Leila Clark, offering a chat-based trip planner that integrates flights, hotels, and trains into a single conversational interface. The Founding Software Engineer role ($125K–$175K + 1–3% equity) is a 25-minute phone screen with Leila on April 3, 2026, with the goal of advancing to a technical screen. The candidate's strongest angle is direct overlap with Stardrift's core stack: Amadeus GDS integration, LLM tool-calling pipelines, async Python, Redis, and booking engine fragmentation experience from work at Kismet.

## Key Concepts

- **AI Travel Agent:** Conversational interface replacing multi-tab search (Google Flights + hotels + rail) with a unified itinerary builder that learns user preferences
- **Resumable LLM Streaming:** Architecture pattern using Modal serverless workers + Redis streams to relay LLM response chunks to a Next.js frontend via SSE, enabling stream resumption after tab loss
- **Founding Engineer Role:** Employee #4 at a 3-person pre-revenue startup; high ownership, in-person SF, rapid iteration, direct collaboration with founder
- **Starlink Flight Checker:** Viral acquisition tool (Hacker News front page) that identifies whether a given flight has Starlink wifi, targeting Stardrift's exact ICP (frequent flyers who care about connectivity)
- **Travel API Fragmentation:** Core technical challenge of normalizing heterogeneous data from Amadeus, Duffel, and other booking engines into a unified schema
- **LLM Tool-Calling Pipeline:** Multi-minute agent sessions with dozens of tool calls per trip plan, requiring reliability layers, prompt engineering, and structured output validation
- **YC S24 / Pivot History:** Originally founded as Moonglow (serverless Jupyter notebooks) with co-founder Trevor Chow; pivoted to Stardrift after YC batch; Leila now sole founder

## Details

## Company Overview

Stardrift (stardrift.ai) is an AI-powered travel agent for frequent flyers, launched publicly on Product Hunt on December 4, 2025 (ranked #9, 135 upvotes). The product is free, live, and requires no waitlist. It replaces the multi-tab booking workflow with a single chat interface that builds complete itineraries — flights, hotels, trains, ground transport — while learning user preferences over time.

### Product Lines
- **Core AI Travel Agent:** Chat-based planner with live price fetching, calendar integration, and preference learning (airlines, seats, hotel brands, travel times)
- **Starlink Flight Checker (stardrift.ai/starlink):** Enter a flight number and date to get a Starlink wifi likelihood estimate based on aircraft type and tail number. Hit Hacker News front page. Covers United, Qatar, Air France, Alaska, British Airways, Hawaiian, WestJet, ZIPAIR, Aer Lingus, Air Baltic.
- **SEO Blog:** Technical posts ("Is resumable LLM streaming hard?"), explainers (LEO vs GEO satellite latency), and comparison content

### Target Market
Corporate and frequent flyers booking complex domestic USA itineraries who optimize for preferences (airline, seat, wifi, timing) rather than lowest cost.

### Competitive Positioning
| Competitor | Stardrift's Edge |
|---|---|
| Google Flights | Full itinerary planning, not just one-leg search |
| Hopper | Multi-modal (flights+hotels+trains), not just price prediction |
| KAYAK AI | Deep preference learning vs. meta-search chat layer |
| Mindtrip | Live booking capability vs. inspiration-only |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React (Vercel) |
| Backend | Python, FastAPI (Modal) |
| LLM Streaming | Vercel AI SDK protocol, SSE |
| Compute | Modal (serverless containers) |
| Database | PostgreSQL |
| Real-time relay | Redis streams |
| Travel APIs | Amadeus, Duffel |
| Aspirational | Rust |

### Architecture Flow
1. Next.js frontend on Vercel sends request
2. FastAPI backend receives and calls `modal.spawn` to launch a worker container
3. Worker runs the LLM agent (multi-tool-call session, live API queries)
4. Worker dumps response chunks to Redis streams in real time
5. Backend subscribes to Redis stream and relays to frontend as SSE
6. Frontend renders incrementally via Vercel AI SDK protocol

This design isolates long-running agent tasks from the API server, enabling resumable streams when users navigate away.

---

## Team

### Leila Clark (Founder/CEO)
- Princeton BSE Computer Science, Class of 2018, graduated with highest honors (~top 5%)
- Originally from Tai Po, Hong Kong
- Jane Street Software Engineer (~2018–2021): OCaml-first, quantitative trading systems, market data infrastructure. Instills correctness-oriented, type-safe engineering instincts.
- FTX Software Developer (~2021–2022): Played a principled role in exposing Alameda Research's misuse of customer deposits; her call to developer Adam Yedidia was pivotal in his decision to cooperate with prosecutors at the SBF trial.
- YC S24: Co-founded Moonglow (serverless Jupyter notebooks) with Trevor Chow (Stanford Math, ex-Optiver); pivoted to Stardrift; Trevor Chow is no longer on the team.
- Twitter: @leilavclark (posts on travel, tech, NK Jemisin, Miyazaki)
- She is a frequent flyer herself (300+ flight hours listed as a bonus qualification)

### Felipe Mautner (Founding Engineer)
- CMU BS Computer Science (ML concentration) + Mathematics minor
- Former work: Helped Cognita Imaging build a Radiology Foundation Model (vision-language models on radiological images); Cognita acquired by Radiology Partners/Mosaic for ~$80M in Nov 2025
- Likely owns: backend LLM agent pipeline, Modal worker infrastructure, Amadeus/Duffel integrations
- Site: felipemautner.com

### Claire Guo (Design Engineer)
- Likely owns Next.js frontend and UX for chat interface and Starlink checker
- Limited public information confirming identity; 2nd-degree LinkedIn connection

---

## The Role

- **Title:** Founding Software Engineer
- **Salary:** $125,000–$175,000
- **Equity:** 1.00%–3.00%
- **Location:** San Francisco, Mission office, 5 days/week in-person
- **Visa sponsorship:** Yes

### What They Want
- Backend-first, full-stack capable engineer
- Shipped LLM applications with demonstrated results
- AI/ML literacy (comfortable reading research papers)
- Fast execution, customer-facing iteration, comfort with weekly pivots
- Edge-case thinking and detail orientation
- Preferred schools: Berkeley, CMU, MIT, Waterloo (or equivalent top-company experience)

### Interview Process
1. Phone screen with Leila (20–25 min) — *current stage*
2. Technical screen with problem-solving assessment (30–60 min)
3. Paid in-person work trial (1–3 days, travel covered)

---

## Candidate Fit Assessment

| Requirement | Evidence | Strength |
|---|---|---|
| Backend engineering | Python, asyncio, NestJS, FastAPI-adjacent work | Strong |
| Full-stack | Next.js, React, TypeScript | Strong |
| LLM apps shipped | Playwright + GPT-4o/Gemini pipeline, MCP tools at Kismet | Very Strong |
| Travel API integration | Amadeus GDS, OHIP fallback logic, 7–8 booking engines | Very Strong |
| Async Python | asyncio PMS adapter parallelization at Kismet | Strong |
| SSE / streaming | JSON-RPC over SSE for MCP tools | Strong |
| Redis | Redis caching in PMS adapters | Moderate–Strong |
| AI/ML literacy | MS Computer Engineering, time-series ML | Moderate |
| School pedigree | NYU (not on their preferred list) | Moderate |
| Frequent flyer signal | Not demonstrated | Weak |

---

## Technical Talking Points (Kismet → Stardrift Mapping)

### Travel API Integration
**Their problem:** Normalizing Amadeus and Duffel schemas across flights, hotels, trains.
**Your proof:** Amadeus GDS rate integration with PMS-first/Amadeus-fallback logic; adapters across 7–8 booking engines (iHotelier, SynXis, Allora, AZDS) normalizing heterogeneous responses.
**Talk track:** "The fallback logic was the hard part: when do you trust the PMS data vs. the GDS data?"

### LLM Agent Pipeline
**Their problem:** Multi-minute sessions with dozens of tool calls.
**Your proof:** MCP tools (searchHotels, getHotelRates, bookHotelOffer) called by LLM agents via JSON-RPC over SSE; Playwright + GPT-4o/Gemini tool-calling pipeline with >95% field coverage.
**Talk track:** "The edge cases in booking engine parsing required careful prompt engineering and validation layers."

### Streaming Architecture
**Their problem:** Resumable LLM streaming via Modal workers and Redis streams.
**Your proof:** SSE-based MCP tool responses; Redis caching in PMS pipeline.
**Talk track:** "I read your blog post on resumable streaming. The Modal + Redis stream pattern makes sense. At Kismet, the reliability challenge was similar: what happens when the connection drops mid-stream?"

### Async Python / Performance
**Their problem:** FastAPI handling concurrent requests while orchestrating long-running agent tasks.
**Your proof:** asyncio PMS adapter parallelization, AlloyDB persistence, Redis caching.
**Talk track:** "When you're hitting 7–8 booking engines per search, sequential calls kill latency. The async pattern with Redis caching cut response times significantly."

---

## Ideas to Pitch (If Asked "What Would You Build?")

1. **Loyalty Program Integration:** Pull in MileagePlus, Bonvoy, etc. to factor status and points into recommendations. Requires proprietary API workarounds or partner relationships but creates strong retention.
2. **Multi-City Itinerary Optimizer:** Optimize routing across legs for lounge access, preferred hubs, or meaningful layover cities — a meaningful differentiator vs. Google Flights.
3. **Corporate Expense Attribution:** Auto-generate expense reports and trip cost breakdowns for corporate users. Monetization angle and stickiness for the B2B segment.

---

## 25-Minute Conversation Flow

| Time | Stage | Notes |
|---|---|---|
| 0:00–1:00 | Pleasantries | Keep short — she runs a 3-person team |
| 1:00–3:00 | Your intro pitch | 90-second version ending with "the Amadeus/Duffel piece jumped out" |
| 3:00–5:00 | Follow-up questions on experience | Go specific; have numbers ready |
| 5:00–10:00 | She talks about Stardrift | Listen actively, ask clarifying questions |
| 10:00–15:00 | Technical discussion | Reference blog post; demonstrate stack knowledge |
| 15:00–20:00 | Your Tier 1 questions | Ask 2–3 from prepared list |
| 20:00–24:00 | Open conversation | Let it flow, don't force structure |
| 24:00–25:00 | Close | "I'd love to move forward. What does the next step look like?" |

---

## Key Questions to Ask

**Tier 1 (Always Ask)**
1. "What does the product look like in 6 months — deeper on corporate or expanding to leisure?"
2. "How do you think about LLM cost structure when a single trip plan requires dozens of tool calls?"
3. "What's been the hardest technical problem you've had to solve so far?"

**Tier 2 (If Time Allows)**
4. "How are you thinking about monetization given the product is free right now?"
5. "How much of your traffic comes from the Starlink checker vs. the core product?"
6. "What does a typical week look like for the engineering team?"

**Do Not Ask**
- Anything about the Moonglow pivot or Trevor Chow
- Anything about FTX
- Funding/runway questions
- "What's your tech stack?" — you already know it; demonstrate that

---

## What Not to Do
- Don't monologue — 25 minutes is short, every sentence must earn its place
- Don't lead with NYU — lead with what you built
- Don't claim Duffel experience — say "I haven't used Duffel specifically, but the abstraction patterns match what I worked with across 7–8 booking engines"
- Don't compare yourself to Felipe — frame it as complementary strengths
- Don't raise salary or equity — this is a phone screen
- Don't be stiff — she's a 28-year-old founder, not a corporate hiring manager

---

## Closing Script

*At ~24:00:*
"This has been really helpful. The overlap between what I built at Kismet and what you're doing at Stardrift is the tightest I've seen in my job search. I'd love to move forward — what does the next step look like?"

*If technical screen:* "Great. Should I expect coding, system design, or something else? And is it with you or Felipe?"

*If work trial:* "That works. I'm flexible on timing. What dates work for the team?"

## Related

- [[Y Combinator S24]]
- [[Leila Clark]]
- [[Felipe Mautner]]
- [[Kismet (Hospitality Tech)]]
- [[Amadeus GDS API]]
- [[Duffel API]]
- [[Model Context Protocol (MCP)]]
- [[LLM Tool-Calling Pipelines]]
- [[Server-Sent Events (SSE)]]
- [[Modal (Serverless Compute)]]
- [[Redis Streams]]
- [[FastAPI]]
- [[Next.js]]
- [[Vercel AI SDK]]
- [[Jane Street]]
- [[FTX Collapse]]
- [[Moonglow (YC S24)]]
- [[Gustaf Alstromer]]
- [[Starlink Aviation WiFi]]
- [[Founding Engineer Roles]]
