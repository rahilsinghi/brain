---
status: processed
source_type: career-datacenter
ingested_at: 2026-04-09T21:35:00.000Z
parsed_at: 2026-04-09T21:35:00.000Z
compiled_to: "[[Meeting Prep: Sandeep Baynes — Maison Technical Fit Interview (April 8, 2026)]]"
processed_at: 2026-04-10T01:51:12.578Z
retry_count: 0
last_error: null
compile_progress: null
---


# Meeting Prep: Sandeep Baynes — Maison (Tech Lead / Co-Founder)

**Meeting:** Wednesday, April 8, 2026 · 9:00 AM - 9:30 AM EST
**Format:** Google Meet (calendar invite received)
**Context:** Comp already confirmed ($50/hr, 20hr/week cap, sign-on bonus end of June). This is the technical fit conversation.

---

## What This Call IS vs. ISN'T

This is NOT a negotiation call. Comp is done. This is Sandeep evaluating whether you can ship alongside him technically. He's the Tech Lead/Co-Founder, so he's assessing:

1. Can you actually build what they need?
2. Will you be productive quickly with minimal handholding?
3. Do you think about systems the way he does?

**Your goal:** Demonstrate technical depth, show you understand their problem space, and learn what you'd actually be working on day one.

---

## What We Know About Sandeep

- **Role:** Tech Lead & Co-Founder at Maison
- **Email timezone:** +0300 (likely based in Israel, Eastern Europe, or Middle East)
- **Communication style:** Brief, direct. His email was 1 sentence: "Can we meet at 9am tomorrow EST?" No fluff.
- **Minimal public footprint** — no articles, podcasts, or public GitHub. Likely heads-down builder.
- **LinkedIn:** linkedin.com/in/sandeepbaynes (check before the call for his background)

**What to infer:** Co-founders who have zero public presence and send 1-line emails are usually deep technical builders, not marketers. Expect technical questions. Match his directness.

---

## CIIAA Guardrails (Same as Fredrik Call)

- Talk about YOUR skills. "I built X" not "Kismet's system does Y."
- SAFE: Technologies, public APIs, architecture patterns, industry problems
- NOT SAFE: Customer names, revenue, source code, internal details, partner contracts

---

## Your Technical Story — Adapted for a Tech Lead

Sandeep doesn't need the "how I fell into hospitality" narrative. He needs to know what you can build. Lead with systems, not stories.

### Opening (keep to 1-2 minutes max)

> "I'm finishing my MS at NYU, spent the last year building backend infrastructure for hotel operations. PMS integrations across OHIP, Mews, and Amadeus. Built MCP tools for agent-driven hotel search and booking. Built a Playwright + LLM pipeline for structured hotel data extraction. And a BigQuery data warehouse for multi-property analytics. I'm most interested in the integration and knowledge graph layer at Maison."

Then flip it to him immediately:

> "I'd love to hear about the architecture. What does the stack look like, and what would I be working on first?"

---

## Technical Deep-Dives (Be Ready for These)

### If he asks about MCP tools:
- Built `searchHotels`, `getHotelRates`, `bookHotelOffer` as agent-callable endpoints
- NestJS backend, JSON-RPC over SSE transport
- Typed input/output schemas so the LLM knows exact parameters
- Redis caching layer (short TTL, rate data goes stale fast)
- Concurrent multi-property requests

### If he asks about the Playwright + LLM pipeline:
- Headless browser navigates hotel sites, captures rendered HTML + schema.org/JSON-LD
- GPT-4o/Gemini with tool-calling (not raw prompting) for extraction
- Tool schemas: `extractRoomTypes`, `extractAmenities`, `extractPolicies`, etc.
- >95% field coverage across diverse hotel website formats
- Key insight: function calling constrains the LLM output, kills hallucination

### If he asks about PMS adapters:
- Python asyncio for parallelized queries across PMS providers
- Each PMS has its own adapter class (auth, request formatting, response parsing, error handling)
- asyncio.gather for concurrent execution
- Redis for rate caching, AlloyDB for persistent ID mapping across systems
- OHIP-first / Amadeus-fallback logic, configurable per property

### If he asks about data/analytics:
- BigQuery warehouse with GA4 raw event export
- Session stitching across devices/days
- UTM attribution with multi-signal logic
- Normalized fact tables across properties with inconsistent event structures

### If he asks about your tech stack preferences:
- Python (asyncio, FastAPI) and TypeScript (NestJS, Next.js)
- Redis, PostgreSQL (AlloyDB/Supabase), BigQuery
- Playwright for browser automation
- Docker, Git, CI/CD
- Comfortable with both building from scratch and working in existing codebases

---

## Questions to Ask Sandeep

### Must-ask (technical):
1. **"What does the stack look like? What languages/frameworks are you running?"**
2. **"How does the knowledge graph work? Is it a graph DB, or structured differently?"**
3. **"What PMS integrations do you have today, and what's next on the roadmap?"**
4. **"What would my first week or two look like? What would I be shipping?"**

### If time allows:
5. "How does the orchestration engine handle multi-turn conversations? Is it ReAct-style, or something custom?"
6. "How do you handle hallucination in guest-facing responses? What guardrails are in place?"
7. "What's the deployment setup? How often do you ship?"
8. "How do you and Noel split the technical work?"

---

## What NOT to Do

1. **Don't repeat the Fredrik pitch.** Sandeep was CC'd on every email. He's read your story. Don't rehash it. Be technical.
2. **Don't monologue.** 30 minutes is short. Spend more time listening than talking.
3. **Don't ask about comp.** It's settled. Asking again signals you weren't paying attention.
4. **Don't ask about the offer letter.** That's a Fredrik conversation, not a Sandeep conversation.
5. **Don't oversell.** If he asks something you don't know, say "I haven't worked with that directly, but here's how I'd approach it."
6. **Don't bring up other companies you're talking to.** This is a commitment conversation.
7. **Don't mention the pre-June-22 work authorization issue.** Fredrik handled that. Sandeep just needs to know you're ready to start.

---

## Conversation Flow (30 minutes)

```
0:00-1:00   GREET
  "Hey Sandeep, good to meet you. Fredrik's told me great things about what
   you're building. Thanks for making the time."

1:00-3:00   YOUR QUICK INTRO
  Technical summary only. MCP tools, Playwright pipeline, PMS adapters.
  End with: "What does the stack look like on your end?"

3:00-12:00  LISTEN + LEARN
  Let him walk you through the architecture. Ask follow-up questions.
  Take mental notes on: stack, DB, deployment, team structure, current pain points.

12:00-20:00 TECHNICAL DISCUSSION
  Based on what he shares, connect your experience to their problems.
  This is where you deploy specific examples from your work.

  If he mentions PMS integrations → your adapter architecture
  If he mentions data extraction → your Playwright + LLM pipeline
  If he mentions agent tools → your MCP tools
  If he mentions analytics → your BigQuery work

20:00-25:00 YOUR QUESTIONS
  Ask 3-4 from the list above. Prioritize "what would I work on first?"

25:00-28:00 CLOSE
  "This is exactly the kind of work I want to do. I'm ready to start
   as soon as Fredrik gives the green light. What does onboarding look
   like from your side?"

28:00-30:00 WRAP
  Thank him. Confirm you're excited. End clean.
```

---

## Quick Reference Card

```
LOGISTICS: Wed Apr 8, 9:00 AM EST, Google Meet

OPEN:     Quick technical intro (1 min) → "What does the stack look like?"
LISTEN:   Architecture, DB, team split, pain points
CONNECT:  Map your work to their problems
ASK:      Stack? Knowledge graph? First week tasks? PMS roadmap?
CLOSE:    "Ready to start, what does onboarding look like?"

KEY POINTS:
  - Comp is done. Don't bring it up.
  - Be technical, not narrative.
  - Match his directness (1-line email guy).
  - CIIAA: "I built X" not "Kismet does Y"
  - 30 min goes fast. More listening, less talking.
```

---

*Generated: 2026-04-07 | Meeting: 2026-04-08 9:00 AM EST*
