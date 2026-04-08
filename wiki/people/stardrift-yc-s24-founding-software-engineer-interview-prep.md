---
title: Stardrift (YC S24) — Founding Software Engineer Interview Prep
author: ai
created_at: 2026-04-08T15:38:39.995Z
last_ai_edit: 2026-04-08T15:38:39.995Z
last_human_edit: null
last_embedded_hash: b008ef07ba616456
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/articles/stardrift-leila-clark.md]]"
tags:
  - interview-prep
  - stardrift
  - yc-s24
  - founding-engineer
  - ai-travel
  - amadeus
  - duffel
  - llm-pipelines
  - fastapi
  - modal
  - redis
  - sse-streaming
  - leila-clark
  - job-search
  - travel-tech
  - startups
---


# Stardrift (YC S24) — Founding Software Engineer Interview Prep

Stardrift is a Y Combinator S24 AI travel agent startup founded by Leila Clark that replaces multi-tab flight and hotel search with a single conversational interface. The Founding Software Engineer role ($125K–$175K, 1–3% equity) is a 25-minute phone screen with Leila Clark on April 3, 2026, with the goal of advancing to a technical screen. Key candidate strengths include Amadeus GDS integration, LLM tool-calling pipelines, and async Python/Redis experience built at Kismet.

## Key Concepts

- **AI Travel Agent**: Chat-based trip planner fetching live flight, hotel, and train prices with calendar integration and preference learning
- **Resumable LLM Streaming**: Architecture using Modal workers + Redis streams + SSE to relay long-running agent responses to the frontend without blocking the FastAPI server
- **Booking Engine Fragmentation**: The challenge of normalizing heterogeneous data schemas across multiple travel APIs (Amadeus, Duffel, etc.)
- **MCP Tool-Calling Pattern**: AI agent tools (searchHotels, getHotelRates, bookHotelOffer) called via JSON-RPC over SSE, mirroring Stardrift's multi-tool-call agent sessions
- **Viral Acquisition Channel**: The Starlink Flight Checker tool targets frequent flyers who care about wifi quality — the exact Stardrift core user
- **Founding Engineer Role**: Employee #4, true founding team position with direct collaboration with CEO, full-stack but backend-first scope
- **Pivot History**: Originally Moonglow (serverless Jupyter notebooks, YC S24), pivoted to AI travel after batch; co-founder Trevor Chow departed post-pivot

## Details

## Company Overview

Stardrift is an AI travel agent for frequent flyers, live at stardrift.ai. It replaces the multi-tab search workflow (Google Flights + hotel sites + rail) with a single conversational interface that builds complete itineraries: flights, hotels, activities, and ground transport. The product is free with no waitlist.

### Product Lines
- **AI Travel Agent (Core)**: Chat interface with live price fetching, calendar integration, preference learning across airlines, seats, and hotel brands. Launched Product Hunt Dec 4, 2025 (#9 on launch day, 135 upvotes).
- **Starlink Flight Checker**: Tool at stardrift.ai/starlink. Enter flight number + date, receive Starlink wifi likelihood based on aircraft type and tail number. Hit Hacker News front page. Covers United, Qatar Airways, Air France, Alaska, British Airways, and others.
- **SEO / Blog Content**: Technical posts including "Is resumable LLM streaming hard?" and comparison content targeting AI travel planning keywords.

### Competitive Positioning
| Competitor | Stardrift's Edge |
|---|---|
| Google Flights | Plans the whole trip, not just one leg |
| Hopper | Multi-modal (flights+hotels+trains), not just price timing |
| KAYAK AI | Deeper preference learning over time |
| Mindtrip | Live booking, not just itinerary inspiration |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React (Vercel) |
| Backend | Python, FastAPI (Modal) |
| LLM Streaming | Vercel AI SDK, SSE |
| Compute | Modal (serverless containers) |
| Database | PostgreSQL |
| Real-time Relay | Redis streams |
| Travel APIs | Amadeus, Duffel |
| Aspirational | Rust |

### Architecture Flow
1. Next.js frontend sends request to FastAPI backend
2. Backend calls `modal.spawn` to launch a worker container
3. Worker runs LLM agent with multiple tool calls and live API queries
4. Worker writes response chunks to Redis streams in real time
5. Backend subscribes to Redis stream and relays chunks via SSE
6. Frontend renders incrementally using Vercel AI SDK protocol

This separation means long-running tasks do not block the API server, and streams are resumable because state lives in Redis, not in-memory.

---

## Team

### Leila Clark (Founder/CEO)
- **Education**: Princeton BSE Computer Science, Class of 2018, highest honors (top ~5% of class)
- **Jane Street (~2018–2021)**: Software Engineer. Primary language OCaml. Work on trading systems, market data infrastructure, risk models. Signals correctness-oriented, type-safe engineering thinking.
- **FTX (~2021–2022)**: Software Developer. Played a pivotal role in the FTX collapse narrative — called fellow developer Adam Yedidia to flag that Alameda Research was using FTX customer deposits to pay loans. Yedidia subsequently quit and cooperated with prosecutors at the SBF trial. Signals moral clarity and principled action under pressure.
- **YC S24**: Co-founded Moonglow (serverless Jupyter notebooks) with Trevor Chow. Pivoted to Stardrift. Trevor Chow departed post-pivot.
- **Values (from job post)**: Scrappy, low-ego, fast execution, comfort with weekly pivots, customer-facing iteration.
- **Bonus signals**: 300+ flight hours; literary interests (NK Jemisin, Miyazaki); active on Twitter/X at @leilavclark.

### Felipe Mautner (Founding Engineer)
- CMU BS Computer Science (ML concentration) + Mathematics minor
- Previously helped Cognita Imaging create a Radiology Foundation Model; Cognita acquired by Radiology Partners/Mosaic for ~$80M in Nov 2025
- Likely owns backend/ML: LLM agent architecture, tool-calling pipeline, Amadeus/Duffel integrations, Modal worker infrastructure

### Claire Guo (Design Engineer)
- Limited confirmed public information
- Title suggests she codes (not just designs); likely owns Next.js frontend and chat UI

---

## The Role

| Detail | Value |
|---|---|
| Title | Founding Software Engineer |
| Salary | $125,000–$175,000 |
| Equity | 1.00%–3.00% |
| Location | SF, Mission office, 5 days/week in-person |
| Visa Sponsorship | Yes |

### Interview Process
1. **Phone Screen (20 min)** — Founder conversation (THIS CALL)
2. **Technical Screen (30–60 min)** — Problem-solving assessment
3. **In-person Work Trial (1–3 days)** — Paid; travel covered

---

## Candidate Fit Map

| Requirement | Signal | Strength |
|---|---|---|
| Backend engineering | Python, asyncio, FastAPI-adjacent, NestJS | Strong |
| Full-stack | Next.js, React, TypeScript | Strong |
| LLM apps shipped | Playwright + GPT-4o/Gemini pipeline, MCP tools | Very Strong |
| Travel API integration | Amadeus GDS, 7–8 booking engines, OHIP | Very Strong |
| AI/ML literacy | MS Computer Engineering, time-series ML | Moderate |
| Fast execution | Startup internship velocity at Kismet | Strong |
| Top school | NYU (not on their stated list) | Moderate |
| Flight hours | Not established | Weak |

---

## Call Strategy

### 90-Second Opening Pitch
"I'm finishing my MS in Computer Engineering at NYU, graduating May 2026. Before that I spent two internships at Kismet, a hospitality tech startup. My core work was building the infrastructure that lets AI agents interact with hotel systems. Specifically: MCP tools for hotel search, rates, and booking using NestJS and JSON-RPC over SSE. A Playwright + LLM pipeline using GPT-4o and Gemini tool-calling for hotel data extraction, hitting >95% field coverage. And PMS adapters with asyncio parallelization, Redis caching, and Amadeus GDS integration with fallback logic. When I saw the Stardrift role, the Amadeus and Duffel API integration piece jumped out immediately."

### Key Technical Talk Tracks
- **Amadeus/Duffel**: "I built Amadeus GDS rate integration at Kismet with PMS-first/Amadeus-fallback logic. The hard part was deciding when to trust PMS data vs GDS data."
- **LLM Tool-Calling**: "The MCP tools I built follow the same pattern: agent calls searchHotels, getHotelRates, bookHotelOffer. With GPT-4o we hit >95% field coverage but edge cases required careful validation layers."
- **Streaming**: "I read your blog post on resumable streaming. The Modal + Redis stream pattern makes sense. At Kismet we used SSE for MCP responses — same reliability challenge when connections drop mid-stream."
- **Async Python**: "I used asyncio to parallelize calls across 7–8 booking engines. You can't do it sequentially. Redis caching cut response times significantly."

### 25-Minute Time Map
| Time | Activity |
|---|---|
| 0:00–1:00 | Pleasantries (brief) |
| 1:00–3:00 | 90-second pitch, end with Amadeus/Duffel overlap |
| 3:00–5:00 | Answer follow-ups on Kismet work |
| 5:00–10:00 | Listen to Leila talk about Stardrift |
| 10:00–15:00 | Technical discussion, reference blog post |
| 15:00–20:00 | Ask 2–3 Tier 1 questions |
| 20:00–24:00 | Organic back-and-forth |
| 24:00–25:00 | Close: "I'd love to move forward. What does the next step look like?" |

### Tier 1 Questions to Ask
1. "What does the product look like in 6 months — deeper on corporate travel or expanding to leisure?"
2. "How do you think about LLM cost structure when a single trip plan requires dozens of tool calls?"
3. "What's been the hardest technical problem you've had to solve so far?"

### What NOT to Do
- Do not bring up the Moonglow pivot or FTX unless Leila raises them
- Do not claim familiarity with Duffel specifically — say "I haven't used Duffel but the abstraction patterns are familiar from 7–8 booking engines"
- Do not lead with NYU — lead with what you built
- Do not ask about funding, runway, or salary/equity on this call
- Do not ask about the tech stack — demonstrate you already know it

---

## Ideas to Pitch if Asked "What Would You Build?"
1. **Loyalty Program Integration**: Pull in MileagePlus, Bonvoy etc. and factor points/status into recommendations. Most frequent flyers optimize around this.
2. **Multi-City / Complex Itinerary Optimizer**: Optimize across legs for hub lounge access or desirable layover cities — differentiator vs Google Flights.
3. **Trip Cost Attribution for Corporate**: Expense categorization and auto-generated expense reports per trip, leveraging the itinerary the agent already knows. Also a monetization angle.

## Related

- [[Y Combinator S24]]
- [[Amadeus GDS Integration]]
- [[Duffel API]]
- [[LLM Tool-Calling Pipelines]]
- [[Server-Sent Events (SSE)]]
- [[Modal (Serverless Compute)]]
- [[Redis Streams]]
- [[FastAPI]]
- [[Vercel AI SDK]]
- [[Kismet (Hospitality Tech)]]
- [[Model Context Protocol (MCP)]]
- [[Jane Street]]
- [[FTX Collapse]]
- [[Founding Engineer Roles]]
- [[AI Travel Agents]]
