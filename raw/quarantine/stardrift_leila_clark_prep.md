---
status: quarantined
source_type: career-datacenter
ingested_at: 2026-04-09T21:35:00.000Z
parsed_at: 2026-04-09T21:35:00.000Z
compiled_to: "[[Stardrift (YC S24) — Founding Software Engineer Interview Prep]]"
processed_at: 2026-04-10T01:54:47.055Z
retry_count: 2
last_error: "JSON Parse error: Expected '}'"
compile_progress: null
quarantined_at: 2026-04-10T01:56:31.448Z
---









# Meeting Prep: Leila Clark — Stardrift (YC S24)

**Meeting:** Thursday, April 3, 2026 · 1:20-1:45 PM · 25 minutes
**Your goal:** Advance to technical screen for Founding Software Engineer role.
**How this happened:** Connected on LinkedIn Mar 26. DM sent Mar 31. Leila scheduled a call.
**Role:** Founding Software Engineer ($125K-$175K + 1.00%-3.00% equity)

---

## Section 1: What Is Stardrift

### The One-Liner
AI travel agent for frequent flyers. Chat-based trip planner that fetches live flight, hotel, and train prices, connects to your calendar, and learns your preferences.

### The Full Picture
Stardrift replaces the multi-tab search workflow (Google Flights + hotel sites + rail) with a single conversational interface. You tell it where you want to go, and it builds a complete itinerary: flights, hotels, activities, ground transport. It remembers your airline preferences, seat preferences, travel times, and trusted hotel brands.

The product is free to use, live at stardrift.ai. No waitlist.

### Product Lines

**1. AI Travel Agent (Core Product)**
- Chat interface for trip planning
- Live price fetching across flights, hotels, trains
- Calendar integration
- Preference learning (airlines, seats, travel times, hotel brands)
- Multi-modal: flights + hotels + trains + rideshare in one plan
- Launched on Product Hunt Dec 4, 2025 (ranked #9 on launch day, 135 upvotes, 17 comments, 139 followers)

**2. Starlink Flight Checker (Viral Growth Tool)**
- "Will my flight have Starlink?" tool at stardrift.ai/starlink
- Database of all airlines that have rolled out Starlink wifi
- Enter flight number + date, get likelihood estimate based on aircraft type and tail number
- Fleet summary page showing rollout progress across airlines
- Covers: United, Qatar Airways, Air France, Alaska, British Airways, Hawaiian, WestJet, ZIPAIR, Aer Lingus, Air Baltic
- Hit Hacker News front page ("Show HN: Will my flight have Starlink?")
- This is a smart acquisition channel: frequent flyers who care about wifi are exactly Stardrift's target user

**3. Blog / SEO Content**
- "Why is Starlink on planes so good?" (explainer on LEO vs GEO satellite latency)
- "Is resumable LLM streaming hard?" (deep technical post on their architecture)
- "Best AI Tools to Search Flights and Hotels Together" (comparison content)
- Resource guides for AI travel planning

### Target Market
- Starting with corporate travel search in domestic USA
- Frequent flyers who book complex itineraries
- People who care about specifics: airline preference, seat selection, wifi quality, travel times

### Competitors
| Competitor | Positioning | Stardrift's Edge |
|-----------|------------|-----------------|
| Google Flights | Cheapest fare search, you know where/when | Stardrift plans the whole trip, not just one leg |
| Hopper | Price prediction, freeze + deal alerts | Stardrift does multi-modal (flights+hotels+trains), not just price timing |
| KAYAK AI | Meta-search with chat layer | Stardrift learns preferences over time, deeper personalization |
| Kiwi.com | Budget multi-city, self-transfer | Stardrift focuses on quality/preference, not cheapest possible |
| Mindtrip | AI itinerary planning | Stardrift has live booking, not just inspiration |

### Value Proposition (from their own content)
"The value of AI travel tools is not cheaper fares. It is faster, more coherent planning. Instead of running five separate searches, a tool like Stardrift builds a single plan that fits together."

---

## Section 2: Tech Stack and Architecture

This is critical. You need to speak their language.

### Confirmed Stack
| Layer | Technology |
|-------|-----------|
| Frontend | Next.js, React (on Vercel) |
| Backend | Python, FastAPI (on Modal) |
| LLM Streaming | Vercel AI SDK protocol, SSE (server-sent events) |
| Compute/Orchestration | Modal (serverless containers) |
| Database | PostgreSQL |
| Real-time | Redis streams (worker-to-backend chunk relay) |
| Travel APIs | Amadeus, Duffel |
| Desired (from job post) | Rust (wished for, infrequently used) |

### Architecture Deep Dive (from their blog)
Stardrift's tasks run for minutes at a time with dozens of tool calls. Their architecture:

1. Next.js frontend on Vercel sends request
2. FastAPI backend receives it
3. Backend uses `modal.spawn` to kick off a worker in its own container
4. Worker runs the LLM agent (multiple tool calls, live API queries)
5. Worker dumps response chunks to Redis streams in real time
6. Backend subscribes to Redis stream, relays chunks to frontend as SSE
7. Frontend renders incrementally using Vercel AI SDK protocol

**Why this matters:** They separated the conversation/agent logic from the FastAPI server into standalone Modal workers. This means each request gets its own container, so long-running agent tasks don't block the server. When users tab away and come back, the stream is resumable because the state lives in Redis, not in-memory.

### Your Technical Overlap
- **Amadeus API:** You built OHIP rate integration with Amadeus-fallback logic at Kismet. Stardrift uses Amadeus for flight/hotel data.
- **Duffel API:** Modern flight booking API. You haven't used Duffel specifically, but your multi-booking-engine experience (7-8 engines) means you understand the abstraction patterns.
- **FastAPI + async:** You used asyncio for PMS adapter parallelization at Kismet. They use FastAPI (async Python).
- **SSE streaming:** You built MCP tools using JSON-RPC over SSE at Kismet. They use SSE for LLM streaming.
- **Redis:** You used Redis for caching in PMS adapters. They use Redis streams for real-time data relay.
- **LLM tool-calling:** You built Playwright + GPT-4o/Gemini tool-calling pipeline. Their agent makes dozens of tool calls per session.
- **PostgreSQL:** Standard. You used AlloyDB (Postgres-compatible) at Kismet.

---

## Section 3: Funding and Business

### Funding
- **Y Combinator S24** (Summer 2024 batch)
- YC partner: Gustaf Alstromer (ex-Airbnb Growth PM who started their growth team in 2012)
- No publicly disclosed additional funding beyond YC standard deal ($500K for 7%)
- Pre-revenue (product is free)

### Pivot History
Stardrift was originally **Moonglow (YC S24)**, a serverless Jupyter notebooks product. Leila co-founded Moonglow with Trevor Chow (Stanford Math, ex-Optiver, ex-Stanford AI Lab). They pivoted to Stardrift (AI travel) sometime after the S24 batch. The YC Moonglow page now redirects to Stardrift.

**Why this matters for the call:**
- Shows Leila's willingness to pivot hard when the market signal isn't right
- Trevor Chow is no longer listed on the team, so the co-founder split happened during or after the pivot
- Don't bring up the pivot unless she does. But if she asks about your adaptability, you can reference it as a quality you respect in founders.

### Team Size
3 people total:
1. Leila Clark (Founder/CEO)
2. Felipe Mautner (Founding Engineer)
3. Claire Guo (Design Engineer)

You would be employee #4. This is a true founding team role.

---

## Section 4: Who Is Leila Clark

### The Short Version
Princeton CS (highest honors, class of 2018) -> Jane Street (SWE, ~3 years, 2018-2021) -> FTX (developer, 2021-2022) -> YC S24 (Moonglow, then pivot to Stardrift). She's a technical founder who can code, not a business person who hired engineers.

### Education
- **Princeton University, BSE Computer Science, Class of 2018**
- Graduated with highest honors (this is Princeton's top designation, roughly top 5% of class)
- From Tai Po, Hong Kong originally

### Jane Street (~2018-2021)
- Software Developer/Engineer, ~3 years
- Jane Street is a quantitative trading firm, one of the most selective engineering employers in the world
- Primary language: OCaml (functional programming). Also Python for ML/data analysis.
- Jane Street SWEs work on trading systems, market data infrastructure, risk models. The bar is extremely high: algorithmic problem-solving, systems thinking, correctness-oriented engineering.
- **What this tells you about Leila:** She thinks in types, correctness, and edge cases. She values clean abstractions and well-reasoned code. The job post says "design simple, elegant solutions to complex problems" -- that's Jane Street DNA.

### FTX (~2021-2022)
- Software Developer at FTX (cryptocurrency exchange)
- Leila was directly involved in the FTX collapse story: she called fellow developer Adam Yedidia to tell him that Alameda Research had been using FTX customer deposits to pay Alameda's loans. This call was pivotal testimony at the SBF trial.
- Yedidia testified that after Leila told him this, he quit FTX and cooperated with prosecutors.
- **What this tells you about Leila:** She had the moral clarity to flag fraud internally and the courage to do it. She left FTX when things went wrong. Don't bring this up unless she does. But it's important context: she's someone who acts on principles.

### Post-FTX
- Founded Moonglow (serverless Jupyter notebooks) with Trevor Chow for YC S24
- Pivoted to Stardrift during/after YC S24
- Trevor Chow left (no longer on team)
- Leila is now sole founder running a 3-person team

### What She Values (from job post and public signals)
- "Scrappy, intense, and stubborn about solving problems"
- "Low-ego, collaborative communication style"
- "Comfort navigating weekly pivots based on customer feedback"
- She wants someone who ships fast and iterates. Not someone who over-architects.
- "Strongest candidates usually attended top schools (Berkeley, CMU, Waterloo, MIT) or worked at top companies"
- Bonus: 300+ flight hours (she's building for frequent flyers because she IS one)
- Bonus: design appreciation

### Social Presence
- Twitter/X: @leilavclark (active, posts about travel, tech, occasional literary interests like NK Jemisin / Miyazaki)
- LinkedIn: linkedin.com/in/leila-clark-8087a9157

---

## Section 5: Who Is Felipe Mautner (Founding Engineer)

- **Education:** CMU, BS Computer Science with ML concentration + Mathematics minor
- **Focus areas:** Computer Vision, Machine Learning
- **Previous work:** Helped Cognita create a Radiology Foundation Model. Cognita Imaging was a Stanford-researcher-founded AI startup acquired by Radiology Partners/Mosaic for $80M in Nov 2025. They trained vision-language models on radiological images and reports.
- **Personal site:** felipemautner.com
- **LinkedIn:** linkedin.com/in/felipemautner
- **What he likely does at Stardrift:** Backend/ML work. The LLM agent architecture, tool-calling pipeline, Amadeus/Duffel API integrations, the Modal worker infrastructure. He probably wrote the "resumable LLM streaming" blog post.

### Your angle with Felipe
If Leila routes you to a technical screen with Felipe, lead with:
- LLM tool-calling pipeline experience (GPT-4o/Gemini at Kismet)
- async Python / FastAPI / Redis (his daily stack)
- Travel API integration specifics (Amadeus, booking engine fragmentation)

---

## Section 6: Who Is Claire Guo (Design Engineer)

Limited public information specifically linking Claire Guo to Stardrift. Based on available data:
- Likely responsible for the frontend/UX of the chat interface and the Starlink checker tool
- The title "Design Engineer" suggests she codes (not just designs), probably owns the Next.js frontend
- She's a 2nd-degree connection on LinkedIn (you sent a connection note Mar 26)
- There is a Claire Guo who is a NYC-based product designer at Adobe (byclaireguo.com), but it's unclear if this is the same person or a different Claire Guo

---

## Section 7: The Founding Software Engineer Role

### From the YC Job Post
| Detail | Value |
|--------|-------|
| Salary | $125,000 - $175,000 |
| Equity | 1.00% - 3.00% |
| Location | SF, in-person, 5 days/week in Mission office |
| Visa sponsorship | Yes |
| Experience level | Any (new grads welcome) |

### What They Want
1. **Backend-first, full-stack capable.** You'll work across the entire stack but the core work is backend.
2. **LLM application experience.** You need to have shipped something with LLMs and show it.
3. **AI/ML literacy.** Comfortable reading research papers.
4. **Fast execution.** They ship fast. "10am until completion, sometimes past midnight."
5. **Customer-facing iteration.** "Take customer feedback and improve our product, working shoulder-to-shoulder with the founder."
6. **Edge-case thinking.** Detail-oriented, catches the things others miss.
7. **Weekly pivots.** Comfortable with rapid direction changes.

### What You'd Be Doing
- Optimizing LLM performance and building evals
- Integrating APIs like Amadeus and Duffel
- Building the agent pipeline (tool calls, search, booking)
- Taking customer feedback and shipping fixes/features
- Working directly with Leila (shoulder-to-shoulder)

### Interview Process
1. **Phone Screen (20 min):** Founder conversation -- THIS IS YOUR CALL ON THURSDAY
2. **Technical Screen (30-60 min):** Problem-solving assessment
3. **In-person Work Trial (1-3 days):** Paid trial. They fly you out if needed and cover accommodation.

### Your Fit Assessment
| Requirement | Your Signal | Strength |
|------------|------------|----------|
| Backend engineering | Python, asyncio, NestJS, FastAPI-adjacent | Strong |
| Full-stack | Next.js, React, TypeScript | Strong |
| LLM apps shipped | Playwright + GPT-4o/Gemini pipeline, MCP tools | Very Strong |
| Travel API integration | Amadeus GDS, 7-8 booking engines, OHIP | Very Strong |
| AI/ML literacy | MS Computer Engineering, time-series ML | Moderate |
| Fast execution | Startup internship velocity at Kismet | Strong |
| Top school | NYU (solid, but they list Berkeley/CMU/MIT/Waterloo) | Moderate |
| Flight hours | Unknown / not a strength | Weak |

---

## Section 8: Your Story Arc (25 minutes)

### Opening (when she asks "tell me about yourself") -- 90 seconds max

"I'm finishing my MS in Computer Engineering at NYU, graduating May 2026. Before that I spent two internships at Kismet, a hospitality tech startup. My core work there was building the infrastructure that lets AI agents interact with hotel systems.

Specifically: I built MCP tools for hotel search, rates, and booking using NestJS and JSON-RPC over SSE. I built a Playwright + LLM pipeline using GPT-4o and Gemini tool-calling for hotel data extraction, hitting >95% field coverage across thousands of hotel pages. And I built PMS adapters with asyncio parallelization, Redis caching, and Amadeus GDS integration with fallback logic.

When I saw the Stardrift role, the Amadeus and Duffel API integration piece jumped out immediately. That's what I've been doing for the past year."

### Bridge to Stardrift -- 30 seconds

"The architecture challenge you're solving feels familiar. Long-running agent tasks that make multiple API calls, streaming results back to users in real time, dealing with flaky third-party APIs. I've dealt with all of that in the hotel booking space. The travel data fragmentation problem is something I understand at a technical level."

### Why Stardrift Specifically -- 30 seconds

"I'm drawn to early-stage companies where I can own significant surface area. A 3-person team building an AI product on top of real travel APIs is exactly the kind of problem space I want to be in. And the Starlink checker is a smart growth move. That kind of creative product thinking is something I'd want to contribute to."

---

## Section 9: Technical Talking Points

Map your Kismet work to Stardrift's problems:

### 1. Travel API Integration (Amadeus + Duffel)
**Their problem:** Integrating Amadeus and Duffel APIs for flights, hotels, trains. Each API has different schemas, rate structures, availability formats.
**Your proof:** Built Amadeus GDS rate integration at Kismet with PMS-first / Amadeus-fallback logic. Worked across 7-8 booking engines (iHotelier, SynXis, Allora, AZDS), each with different data formats. Built adapters that normalized heterogeneous responses into a unified schema.
**Talk track:** "At Kismet, I dealt with the same problem you have with Amadeus and Duffel, just on the hotel side. Each booking engine returns data differently. I built adapters with asyncio parallelization that normalized everything into a consistent format. The fallback logic was the hard part: when do you trust the PMS data vs the GDS data?"

### 2. LLM Agent Pipeline
**Their problem:** Multi-minute agent tasks with dozens of tool calls per session.
**Your proof:** Built MCP tools (searchHotels, getHotelRates, bookHotelOffer) that AI agents call via JSON-RPC over SSE. Built Playwright + GPT-4o/Gemini tool-calling pipeline for structured data extraction.
**Talk track:** "The MCP tools I built at Kismet are essentially the same pattern: an LLM agent calls tools to search, get rates, and book. The interesting part was handling the tool-calling reliability. With GPT-4o, we got >95% field coverage, but the edge cases in booking engine parsing required careful prompt engineering and validation layers."

### 3. Streaming and Real-time Architecture
**Their problem:** Resumable LLM streaming over SSE with Modal workers and Redis streams.
**Your proof:** Built JSON-RPC over SSE for MCP tools. Used Redis caching in PMS adapter pipeline.
**Talk track:** "I read your blog post on resumable streaming. The Modal worker + Redis stream pattern makes sense for long-running tasks. At Kismet, we used SSE for real-time MCP tool responses. The reliability challenge was similar: what happens when the connection drops mid-stream?"

### 4. Data Extraction from Messy Sources
**Their problem:** Travel data isn't standardized. Airlines, hotels, trains all structure data differently.
**Your proof:** Playwright + LLM pipeline extracted hotel data from booking engines with schema.org/Hotel JSON-LD parsing. >95% field coverage across heterogeneous sources.
**Talk track:** "Hotel booking engines are notoriously inconsistent. At Kismet, we built a pipeline that could extract structured data from any booking engine page. Some had JSON-LD, some had nothing. The LLM tool-calling layer was what made it work across all of them."

### 5. Async Python / Performance
**Their problem:** FastAPI backend needs to handle concurrent requests while orchestrating long-running LLM tasks.
**Your proof:** asyncio PMS adapter parallelization. AlloyDB persistence. Redis caching.
**Talk track:** "I used asyncio at Kismet to parallelize PMS adapter calls. When you're hitting 7-8 different booking engines per search, you can't do it sequentially. The async pattern with Redis caching cut response times significantly."

---

## Section 10: Ideas for Stardrift (2-3 things you could build)

Have 1-2 of these ready if she asks "what would you build?"

### 1. Loyalty Program Integration
"Most frequent flyers optimize around points and status. If Stardrift could pull in a user's loyalty accounts (United MileagePlus, Marriott Bonvoy, etc.) and factor that into recommendations, you'd have a much stickier product. The technical challenge is the airline loyalty APIs are mostly proprietary, so you'd likely need to start with screen scraping or partner APIs."

### 2. Multi-City / Complex Itinerary Optimizer
"Frequent flyers often book multi-city trips where the order and routing matters. An agent that can optimize across legs (e.g., fly through a hub where you have lounge access, or choose a layover city you actually want to visit) would be a meaningful differentiator vs Google Flights."

### 3. Trip Cost Attribution for Corporate
"If you're targeting corporate travel, expense categorization and budget tracking per trip would be valuable. The agent already knows the full itinerary, so it can generate expense reports automatically. That's a monetization angle too."

---

## Section 11: 25-Minute Conversation Flow

| Time | What | Notes |
|------|------|-------|
| 0:00-1:00 | Pleasantries | Keep it short. She's busy, 3-person team. |
| 1:00-3:00 | She asks about you | 90-second pitch (Section 8). End with "the Amadeus/Duffel piece jumped out." |
| 3:00-5:00 | She asks follow-ups on your experience | Go deeper on whichever Kismet project she asks about. Have specific numbers ready. |
| 5:00-10:00 | She talks about Stardrift | Listen actively. Ask clarifying questions. Don't just nod. |
| 10:00-15:00 | Technical discussion | She may probe your understanding of their stack. Reference the blog post. Show you've done homework. |
| 15:00-20:00 | Your questions (Section 12) | Ask 2-3 Tier 1 questions. |
| 20:00-24:00 | Discussion / back and forth | Let the conversation flow. Don't force structure. |
| 24:00-25:00 | Close | "I'd love to move forward. What does the next step look like?" |

---

## Section 12: Questions to Ask

### Tier 1 (Always Ask)
1. "What does the product look like in 6 months? Are you going deeper on corporate travel or expanding to leisure?"
2. "How do you think about the LLM cost structure? When a single trip plan requires dozens of tool calls, what's the unit economics look like?"
3. "What's been the hardest technical problem you've had to solve so far?"

### Tier 2 (If Time)
4. "How are you thinking about monetization? The product is free right now."
5. "The Starlink checker is a smart growth channel. How much of your traffic comes from that vs the core product?"
6. "What does a typical week look like for the engineering team right now?"

### Questions NOT to Ask
- Don't ask about the pivot from Moonglow unless she brings it up
- Don't ask about FTX
- Don't ask about funding/runway (too early, and it's a sensitive topic for a 3-person pre-revenue company)
- Don't ask "what's your tech stack?" (you already know it, demonstrate that)

---

## Section 13: What NOT to Do

1. **Don't monologue.** 25 minutes is short. Every sentence needs to earn its place.
2. **Don't oversell NYU.** The job post says "Berkeley, CMU, Waterloo, MIT." NYU is good but not on their list. Lead with what you built, not where you went.
3. **Don't pretend you know Duffel.** You know Amadeus. You know booking engine fragmentation. But you haven't used Duffel. Say "I haven't used Duffel specifically, but the abstraction patterns are similar to what I worked with across 7-8 booking engines."
4. **Don't ask basic questions.** You know their stack, their architecture, their product. Show it.
5. **Don't compare yourself to Felipe.** He's CMU CS+ML with a Cognita/radiology AI background. You bring domain-specific travel API experience that he doesn't. Different strengths.
6. **Don't bring up salary/equity.** This is a phone screen, not a negotiation.
7. **Don't be stiff.** She's a 28-year-old founder, not a corporate hiring manager. Be natural.

---

## Section 14: Closing Script

At ~24:00:

"This has been really helpful. The overlap between what I built at Kismet and what you're doing at Stardrift is the tightest I've seen in my job search. I'd love to move forward. What does the next step look like?"

If she says technical screen:
"Great. Should I expect coding, system design, or something else? And is it with you or Felipe?"

If she says work trial:
"That works. I'm flexible on timing. I'm in [NYC / can fly to SF]. What dates work for the team?"

---

## Section 15: Quick Reference Card

**Company:** Stardrift (YC S24, ex-Moonglow)
**What:** AI travel agent for frequent flyers. Chat-based flight/hotel/train planning.
**Team:** 3 people. Leila (founder, Princeton CS, ex-Jane Street, ex-FTX), Felipe (CMU CS+ML, ex-Cognita), Claire (Design Engineer).
**Stack:** Next.js/Vercel + FastAPI/Modal + PostgreSQL + Redis + Amadeus + Duffel + Vercel AI SDK
**YC Partner:** Gustaf Alstromer (ex-Airbnb Growth)
**Role:** Founding SWE, $125K-$175K + 1-3% equity, SF in-person
**Your angle:** Amadeus GDS integration, LLM tool-calling pipeline, booking engine fragmentation, async Python + Redis
**This call:** 25-min phone screen with founder. Goal: advance to technical screen.
**Key phrase to land:** "The Amadeus and Duffel API work is a direct overlap with what I built at Kismet."
