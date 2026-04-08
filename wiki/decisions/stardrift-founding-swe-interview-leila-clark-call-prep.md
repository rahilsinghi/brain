---
title: Stardrift Founding SWE Interview — Leila Clark Call Prep
author: ai
created_at: 2026-04-08T15:38:59.682Z
last_ai_edit: 2026-04-08T15:38:59.682Z
last_human_edit: null
last_embedded_hash: c3b93aaeb447c960
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/articles/stardrift-talking-points.md]]"
tags:
  - interview
  - stardrift
  - founding-engineer
  - travel-tech
  - amadeus
  - duffel
  - llm
  - mcp
  - tool-calling
  - hospitality
  - redis
  - fastapi
  - async-python
  - sse
  - equity
  - job-search
---


# Stardrift Founding SWE Interview — Leila Clark Call Prep

Preparation notes for a 25-minute founding software engineer interview call with Stardrift founder Leila Clark on April 3rd. The role offers $125K–$175K plus 1–3% equity in San Francisco. The candidate's background at Kismet in hospitality tech creates strong direct overlap with Stardrift's Amadeus/Duffel-based travel stack.

## Key Concepts

- **Founding SWE Role**: First or early engineering hire with significant equity (1–3%) and broad technical ownership
- **MCP Tools (Model Context Protocol)**: Tool-calling interface built over JSON-RPC via SSE, enabling LLMs to invoke actions like hotel search, rate retrieval, and booking
- **Amadeus GDS**: Global Distribution System used for travel inventory; candidate built PMS-first / Amadeus-fallback rate integration
- **Duffel API**: Flight booking API used by Stardrift; candidate has not used it directly but understands analogous patterns
- **Booking Engine Fragmentation**: Challenge of integrating across 7–8 distinct hotel booking engines (iHotelier, SynXis, Allora, AZDS) each with differing schemas
- **Async Python + Redis**: asyncio-based adapter parallelization with Redis caching and AlloyDB persistence for performant backend data handling
- **LLM Tool-Calling**: Use of GPT-4o and Gemini to invoke structured tools within an agentic pipeline
- **SSE Streaming**: Server-Sent Events used as transport for JSON-RPC MCP tool calls

## Details

## Call Overview
- **Date/Time**: Thursday, April 3rd, 1:20–1:45 PM (25 minutes)
- **Interviewer**: Leila Clark, Founder
- **Compensation**: $125K–$175K base + 1–3% equity
- **Location**: San Francisco

---

## 90-Second Pitch
MS Computer Engineering at NYU, graduating May 2026. Two internships at Kismet (hospitality tech) covering:
- Built MCP tools for hotel search, rates, and booking using NestJS and JSON-RPC over SSE
- Built a Playwright + GPT-4o/Gemini pipeline for hotel data extraction achieving >95% field coverage
- Built PMS adapters using asyncio, Redis caching, and Amadeus GDS integration
- Worked across 7–8 distinct booking engines

The Amadeus and Duffel API work at Stardrift is a direct overlap with this experience.

---

## 5 Proof Points
1. **Amadeus GDS** — Built rate integration with PMS-first / Amadeus-fallback logic
2. **LLM Tool-Calling** — MCP tools (`searchHotels`, `getHotelRates`, `bookHotelOffer`) via GPT-4o and Gemini
3. **Booking Engine Fragmentation** — Experience across 7–8 engines (iHotelier, SynXis, Allora, AZDS), each with different schemas
4. **Async Python + Redis** — asyncio adapter parallelization, Redis caching, AlloyDB persistence
5. **SSE Streaming** — JSON-RPC over SSE for MCP tools, the same protocol Stardrift uses

---

## Stardrift's Known Tech Stack
| Layer | Technologies |
|---|---|
| Frontend | Next.js, Vercel |
| Backend | FastAPI, Modal |
| Database | PostgreSQL, Redis Streams |
| Travel APIs | Amadeus, Duffel |
| AI | Vercel AI SDK |

---

## Questions to Ask
1. What does the product look like in 6 months — going deeper on corporate travel or expanding into leisure?
2. How do you think about LLM cost structure with dozens of tool calls per trip?
3. What has been the hardest technical problem so far?

---

## Things to Avoid
- **No monologuing** — 25 minutes is short; keep answers tight
- **Don't fake Duffel knowledge** — Say "haven't used it, but I understand similar patterns"
- **Don't ask about**: the Moonglow pivot, FTX, or funding
- **Don't ask about the tech stack** — you already know it; demonstrate that
- **Don't bring up salary** — let them lead on compensation

---

## Closing Line
> "The overlap between Kismet and Stardrift is the tightest I've seen. I'd love to move forward — what's the next step?"

## Related

- [[Kismet Internship Experience]]
- [[MCP Tool-Calling Architecture]]
- [[Amadeus GDS Integration]]
- [[Booking Engine Fragmentation]]
- [[Async Python and Redis Caching]]
- [[LLM Agentic Pipelines]]
- [[SSE and JSON-RPC Streaming]]
- [[Duffel API]]
- [[Founding Engineer Equity Negotiation]]
- [[Travel Tech Stack Landscape]]
