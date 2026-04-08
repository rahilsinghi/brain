---
status: pending
source_type: file_drop
source_id: career-datacenter/prep/stardrift_talking_points.md
ingested_at: 2026-04-08T14:25:52.478Z
parsed_at: 2026-04-08T14:25:52.478Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Stardrift — Talking Points (TL;DR)

**Call:** Thu Apr 3, 1:20-1:45 PM with Leila Clark (Founder)
**Role:** Founding SWE ($125K-$175K + 1-3% equity, SF)

---

## Your 90-Second Pitch
MS Computer Engineering @ NYU, graduating May 2026. Two internships at Kismet (hospitality tech). Built MCP tools for hotel search/rates/booking (NestJS, JSON-RPC over SSE). Built Playwright + GPT-4o/Gemini pipeline for hotel data extraction (>95% field coverage). Built PMS adapters with asyncio, Redis caching, Amadeus GDS integration. Worked across 7-8 booking engines. The Amadeus/Duffel API work at Stardrift is a direct overlap.

## 5 Proof Points to Hit
1. **Amadeus GDS** — Built rate integration with PMS-first / Amadeus-fallback logic
2. **LLM tool-calling** — MCP tools (searchHotels, getHotelRates, bookHotelOffer) via GPT-4o/Gemini
3. **Booking engine fragmentation** — 7-8 engines (iHotelier, SynXis, Allora, AZDS), each with different schemas
4. **Async Python + Redis** — asyncio adapter parallelization, Redis caching, AlloyDB persistence
5. **SSE streaming** — JSON-RPC over SSE for MCP tools (same protocol they use)

## Their Stack (show you know it)
Next.js/Vercel + FastAPI/Modal + PostgreSQL + Redis streams + Amadeus + Duffel + Vercel AI SDK

## 3 Questions to Ask
1. What does the product look like in 6 months? Corporate travel deeper or leisure expansion?
2. How do you think about LLM cost structure with dozens of tool calls per trip?
3. What's been the hardest technical problem so far?

## Do NOT
- Monologue (25 min is short)
- Pretend you know Duffel (say "haven't used it, but similar patterns")
- Ask about the Moonglow pivot, FTX, or funding
- Ask "what's your tech stack?" (you already know)
- Bring up salary

## Close With
"The overlap between Kismet and Stardrift is the tightest I've seen. I'd love to move forward. What's the next step?"
