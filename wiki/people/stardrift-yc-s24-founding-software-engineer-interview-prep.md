---
title: Stardrift (YC S24) — Founding Software Engineer Interview Prep
author: ai
created_at: 2026-04-10T01:54:47.055Z
last_ai_edit: 2026-04-10T01:54:47.055Z
last_human_edit: null
last_embedded_hash: 912e662d8527265f
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/career/prep/stardrift_leila_clark_prep.md]]"
tags:
  - interview-prep
  - job-search
  - ai-travel
  - llm-agents
  - yc-s24
  - startup
  - founding-engineer
  - amadeus
  - duffel
  - fastapi
  - modal
  - redis
  - sse-streaming
  - travel-tech
  - leila-clark
  - stardrift
  - kismet
  - technical-screen
---


# Stardrift (YC S24) — Founding Software Engineer Interview Prep

Stardrift is a YC S24 AI travel agent startup founded by Leila Clark, offering a chat-based trip planner that integrates live flight, hotel, and train pricing with preference learning. The Founding Software Engineer role ($125K–$175K + 1–3% equity) involves building LLM agent pipelines, travel API integrations (Amadeus, Duffel), and real-time streaming infrastructure. This document covers company research, founder background, technical stack analysis, and a structured 25-minute conversation strategy for a phone screen on April 3, 2026.

## Key Concepts

- **AI Travel Agent**: Conversational interface replacing multi-tab flight/hotel/train search with a unified, preference-aware planner
- **Resumable LLM Streaming**: Architecture using Modal workers + Redis streams + SSE to support long-running, multi-tool-call agent tasks without blocking the FastAPI server
- **Travel API Fragmentation**: Challenge of normalizing heterogeneous data from Amadeus, Duffel, and other booking engines into a consistent schema
- **Viral Acquisition Tool**: Starlink Flight Checker (stardrift.ai/starlink) attracts frequent flyers — Stardrift's exact target demographic — via Hacker News and organic search
- **Founding Engineer Role**: Employee #4 at a 3-person team; true co-founder-level ownership, in-person SF, 5 days/week
- **Preference Learning**: Stardrift remembers airline preferences, seat preferences, travel times, and trusted hotel brands across sessions
- **YC S24 Pivot**: Originally Moonglow (serverless Jupyter notebooks), pivoted to Stardrift after the batch; co-founder Trevor Chow departed during or after the pivot

## Details

## Company Overview

Stardrift (stardrift.ai) is a free, live AI travel agent for frequent flyers. It replaces the multi-tab search workflow (Google Flights + hotel sites + rail booking) with a single conversational interface. Users describe where they want to go, and Stardrift builds a complete itinerary including flights, hotels, activities, and ground transport — learning preferences over time.

### Product Lines

**1. AI Travel Agent (Core)**
Chat interface with live price fetching, calendar integration, and multi-modal itinerary building (flights + hotels + trains + rideshare). Launched on Product Hunt December 4, 2025 (ranked #9, 135 upvotes).

**2. Starlink Flight Checker**
Tool at stardrift.ai/starlink answering "Will my flight have Starlink wifi?" Uses aircraft type and tail number data. Hit Hacker News front page. Strategic acquisition channel targeting frequent flyers who care about inflight connectivity.

**3. Blog / SEO Content**
Technical posts including "Is resumable LLM streaming hard?" (architecture deep dive) and comparison content like "Best AI Tools to Search Flights and Hotels Together."

---

## Technical Architecture

| Layer | Technology |
|---|---|
| Frontend | Next.js, React (Vercel) |
| Backend | Python, FastAPI (Modal) |
| LLM Streaming | Vercel AI SDK protocol, SSE |
| Compute/Orchestration | Modal (serverless containers) |
| Database | PostgreSQL |
| Real-time relay | Redis streams |
| Travel APIs | Amadeus, Duffel |
| Aspirational | Rust |

### Request Flow
1. Next.js frontend on Vercel sends request
2. FastAPI backend receives it
3. `modal.spawn` kicks off a worker in its own container
4. Worker runs LLM agent (multiple tool calls, live API queries)
5. Worker dumps response chunks to Redis streams in real time
6. Backend subscribes to Redis stream, relays chunks to frontend as SSE
7. Frontend renders incrementally via Vercel AI SDK protocol

This design isolates long-running agent tasks from the FastAPI server and enables resumable streaming because state is persisted in Redis, not in-memory.

---

## Founder: Leila Clark

- **Education:** Princeton BSE Computer Science, Class of 2018, highest honors (~top 5%)
- **Jane Street (2018–2021):** Software Engineer in OCaml. Quantitative trading systems, market data infrastructure. Signals: correctness-oriented, type-driven thinking, clean abstractions.
- **FTX (2021–2022):** Called developer Adam Yedidia to report that Alameda Research was using FTX customer deposits to repay Alameda loans. Yedidia quit and cooperated with prosecutors. Leila left FTX when things went wrong — demonstrates principled decision-making under pressure.
- **YC S24:** Co-founded Moonglow (serverless Jupyter) with Trevor Chow; pivoted to Stardrift. Trevor Chow departed. Leila is now sole founder.
- **What she values (from job post):** Scrappy, intense, low-ego, comfortable with weekly pivots, ships fast, iterates on customer feedback. 300+ flight hours; she is the target user.

---

## Team

| Person | Role | Background |
|---|---|---|
| Leila Clark | Founder/CEO | Princeton CS, Jane Street, FTX |
| Felipe Mautner | Founding Engineer | CMU CS+ML, ex-Cognita (radiology foundation models, acquired for $80M) |
| Claire Guo | Design Engineer | Likely owns Next.js frontend; codes and designs |

The candidate would be employee #4.

---

## Role Details

- **Salary:** $125,000 – $175,000
- **Equity:** 1.00% – 3.00%
- **Location:** San Francisco, Mission office, in-person 5 days/week
- **Visa sponsorship:** Yes

### Core Responsibilities
- Optimizing LLM performance and building evals
- Integrating Amadeus and Duffel APIs
- Building and maintaining the agent tool-calling pipeline
- Taking customer feedback and shipping fixes/features directly with the founder

### Interview Process
1. Phone screen (20 min) — founder conversation
2. Technical screen (30–60 min) — problem-solving assessment
3. In-person work trial (1–3 days, paid, travel covered)

---

## Candidate Fit Analysis

| Requirement | Signal | Strength |
|---|---|---|
| Backend engineering | Python, asyncio, NestJS, FastAPI-adjacent | Strong |
| Full-stack | Next.js, React, TypeScript | Strong |
| LLM apps shipped | GPT-4o/Gemini tool-calling pipeline, MCP tools | Very Strong |
| Travel API integration | Amadeus GDS, 7–8 booking engines, OHIP | Very Strong |
| AI/ML literacy | MS Computer Engineering, time-series ML | Moderate |
| Fast execution | Startup internship velocity at Kismet | Strong |
| Top school pedigree | NYU (solid; not on their Berkeley/CMU/MIT/Waterloo list) | Moderate |
| Flight hours | Not a strength | Weak |

**Key differentiator:** Amadeus GDS integration with PMS-first/fallback logic and multi-booking-engine adapter experience is a direct and rare overlap with Stardrift's core infrastructure.

---

## Technical Talking Points (Kismet → Stardrift Mapping)

**Travel API Integration**
Built Amadeus GDS rate integration with PMS-first/Amadeus-fallback logic. Normalized responses from 7–8 booking engines (iHotelier, SynXis, Allora, AZDS) into a unified schema using async adapters. Relevant because Stardrift faces the same heterogeneous data problem across Amadeus and Duffel.

**LLM Agent Pipeline**
Built MCP tools (searchHotels, getHotelRates, bookHotelOffer) called via JSON-RPC over SSE. Built Playwright + GPT-4o/Gemini tool-calling pipeline achieving >95% field coverage across hotel booking engine pages.

**Streaming Architecture**
Built JSON-RPC over SSE for MCP tool responses. Used Redis caching in PMS adapter pipeline. Can speak to the resumable streaming blog post with genuine architectural familiarity.

**Async Python**
Used asyncio to parallelize PMS adapter calls across 7–8 booking engines per search. Redis caching reduced repeated API calls.

---

## Conversation Strategy (25 Minutes)

| Time | Segment | Goal |
|---|---|---|
| 0:00–1:00 | Pleasantries | Short. She's busy. |
| 1:00–3:00 | Your intro | 90-second pitch ending with "Amadeus/Duffel piece jumped out" |
| 3:00–5:00 | Follow-up on experience | Depth on Kismet. Use specific numbers. |
| 5:00–10:00 | She talks about Stardrift | Active listening. Ask clarifying questions. |
| 10:00–15:00 | Technical discussion | Reference the resumable streaming blog post. Show homework. |
| 15:00–20:00 | Your questions | Ask 2–3 Tier 1 questions (see below) |
| 20:00–24:00 | Back and forth | Let conversation flow naturally |
| 24:00–25:00 | Close | "I'd love to move forward. What does the next step look like?" |

### Tier 1 Questions to Ask
1. "What does the product look like in 6 months — going deeper on corporate travel or expanding to leisure?"
2. "How do you think about LLM cost structure when a single trip plan requires dozens of tool calls?"
3. "What's been the hardest technical problem you've had to solve so far?"

### Do Not Ask
- About the Moonglow pivot (unless she raises it)
- About FTX
- About funding or runway
- About the tech stack (you already know it — demonstrate that)

---

## Ideas to Propose if Asked "What Would You Build?"

1. **Loyalty Program Integration** — Pull in MileagePlus, Bonvoy, etc. to factor points/status into recommendations. Technical challenge: proprietary loyalty APIs may require screen scraping or partner agreements.
2. **Multi-City Itinerary Optimizer** — Optimize across legs for lounge access, hub connections, or desired layover cities. Differentiates from Google Flights on complex routing.
3. **Corporate Trip Cost Attribution** — Auto-generate expense reports from the itinerary. Monetization angle for the corporate travel segment.

---

## Competitor Landscape

| Competitor | Positioning | Stardrift's Edge |
|---|---|---|
| Google Flights | Cheapest fare, known dates | Stardrift plans whole trip, not one leg |
| Hopper | Price prediction, deal alerts | Multi-modal (flights+hotels+trains), not just price timing |
| KAYAK AI | Meta-search with chat layer | Preference learning, deeper personalization |
| Kiwi.com | Budget multi-city, self-transfer | Quality/preference focus, not cheapest |
| Mindtrip | AI itinerary inspiration | Live booking, not just inspiration |

---

## Funding and Business Context

- **YC S24** standard deal (~$500K for 7%)
- YC partner: Gustaf Alstromer (ex-Airbnb, started their growth team in 2012)
- No publicly disclosed additional funding
- Product is currently free; pre-revenue
- Pivot from Moonglow (serverless Jupyter) signals Leila's willingness to make hard calls based on market signal

## Related

- [[Y Combinator S24]]
- [[Amadeus GDS API]]
- [[Duffel API]]
- [[Modal (Serverless Compute)]]
- [[Vercel AI SDK]]
- [[Server-Sent Events (SSE)]]
- [[Redis Streams]]
- [[FastAPI]]
- [[LLM Tool-Calling Pipelines]]
- [[Model Context Protocol (MCP)]]
- [[Kismet (Hospitality Tech)]]
- [[Jane Street]]
- [[FTX Collapse]]
- [[Founding Engineer Roles]]
- [[AI Travel Agents]]
- [[Starlink Inflight Wifi]]
