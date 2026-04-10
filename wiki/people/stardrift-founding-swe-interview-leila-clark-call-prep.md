---
title: Stardrift Founding SWE Interview — Leila Clark Call Prep
author: ai
created_at: 2026-04-10T01:43:41.341Z
last_ai_edit: 2026-04-10T01:43:41.341Z
last_human_edit: null
last_embedded_hash: 140332cd49868509
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/career/prep/stardrift_talking_points.md]]"
tags:
  - interview-prep
  - stardrift
  - founding-engineer
  - amadeus
  - duffel
  - llm-toolcalling
  - mcp
  - hospitality-tech
  - kismet
  - equity
  - san-francisco
  - fastapi
  - redis
  - sse
  - travel-tech
---


# Stardrift Founding SWE Interview — Leila Clark Call Prep

Preparation notes for a 25-minute founding software engineer screening call with Stardrift founder Leila Clark on April 3rd. The role targets a $125K–$175K salary with 1–3% equity in San Francisco. The candidate's background at Kismet in hospitality tech provides direct overlap with Stardrift's Amadeus and LLM tool-calling work.

## Key Concepts

- **Founding SWE Role**: First or early engineering hire carrying significant product and architecture responsibility
- **MCP Tools**: Model Context Protocol tools enabling LLM agents to call structured functions (e.g., searchHotels, getHotelRates, bookHotelOffer)
- **Amadeus GDS**: Global Distribution System used for travel inventory; candidate built PMS-first / Amadeus-fallback rate integration
- **Duffel API**: Flight booking API used by Stardrift; candidate has no direct experience but cites transferable patterns
- **SSE Streaming**: Server-Sent Events used for JSON-RPC transport in MCP tool architecture
- **Booking Engine Fragmentation**: Challenge of integrating 7–8 distinct booking engines (iHotelier, SynXis, Allora, AZDS) each with differing schemas
- **LLM Tool-Calling**: Using GPT-4o and Gemini to invoke structured APIs within an agentic pipeline
- **PMS Adapters**: Property Management System adapters built with asyncio for parallelization and Redis for caching

## Details

## Interview Context
- **Date/Time**: Thursday, April 3, 1:20–1:45 PM (25 minutes)
- **Interviewer**: Leila Clark, Founder
- **Role**: Founding Software Engineer
- **Compensation**: $125K–$175K base + 1–3% equity
- **Location**: San Francisco

---

## 90-Second Pitch
MS Computer Engineering at NYU, graduating May 2026. Two internships at Kismet (hospitality tech). Key projects include:
- MCP tools for hotel search, rates, and booking using NestJS and JSON-RPC over SSE
- Playwright + GPT-4o/Gemini pipeline for hotel data extraction with >95% field coverage
- PMS adapters using asyncio, Redis caching, and Amadeus GDS integration
- Experience across 7–8 booking engines

The Amadeus and Duffel API work at Stardrift is a direct overlap with this background.

---

## 5 Proof Points

### 1. Amadeus GDS
Built rate integration using a PMS-first / Amadeus-fallback logic pattern, demonstrating familiarity with how Stardrift's core travel inventory layer operates.

### 2. LLM Tool-Calling
Implemented MCP tools (`searchHotels`, `getHotelRates`, `bookHotelOffer`) invoked via GPT-4o and Gemini, directly analogous to Stardrift's agentic booking flow using the Vercel AI SDK.

### 3. Booking Engine Fragmentation
Navigated schema differences across 7–8 engines including iHotelier, SynXis, Allora, and AZDS — demonstrating the ability to build abstraction layers over heterogeneous APIs.

### 4. Async Python + Redis
Built asyncio-based adapter parallelization with Redis caching and AlloyDB persistence, aligning with Stardrift's FastAPI/Modal + Redis streams backend.

### 5. SSE Streaming
Implemented JSON-RPC over SSE for MCP tool transport — the same protocol Stardrift uses — showing protocol-level familiarity beyond surface-level API integration.

---

## Stardrift's Known Tech Stack
| Layer | Technology |
|---|---|
| Frontend | Next.js / Vercel |
| Backend | FastAPI / Modal |
| Database | PostgreSQL |
| Caching / Streaming | Redis Streams |
| Travel APIs | Amadeus, Duffel |
| AI SDK | Vercel AI SDK |

---

## Questions to Ask
1. What does the product look like in 6 months — corporate travel deeper, or leisure expansion?
2. How do you think about LLM cost structure with dozens of tool calls per trip?
3. What's been the hardest technical problem so far?

---

## Pitfalls to Avoid
- **No monologuing** — 25 minutes is short; keep answers tight
- **Don't fake Duffel knowledge** — say "haven't used it, but I've seen similar patterns with Amadeus"
- **Off-limits topics**: Moonglow pivot, FTX exposure, funding details
- **Don't ask about the tech stack** — you already know it; asking signals lack of preparation
- **Don't raise salary** — let them lead on compensation

---

## Closing Statement
> "The overlap between Kismet and Stardrift is the tightest I've seen. I'd love to move forward — what's the next step?"

## Related

- [[Amadeus GDS Integration]]
- [[Model Context Protocol (MCP)]]
- [[LLM Tool-Calling Patterns]]
- [[Booking Engine Abstraction Layer]]
- [[Kismet Internship Projects]]
- [[Duffel API]]
- [[Async Python with Redis Caching]]
- [[Server-Sent Events (SSE) Streaming]]
- [[Vercel AI SDK]]
- [[Founding Engineer Interviews]]
