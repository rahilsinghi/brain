---
title: "Meeting Prep: Sandeep Baynes — Maison Technical Fit Interview (April 8, 2026)"
author: ai
created_at: 2026-04-10T01:51:12.578Z
last_ai_edit: 2026-04-10T01:51:12.578Z
last_human_edit: null
last_embedded_hash: aaed3c607014ca2d
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/career/prep/maison_sandeep_baynes_prep.md]]"
tags:
  - maison
  - interview-prep
  - technical-interview
  - maison
  - hotel-tech
  - pms-integration
  - mcp-tools
  - llm-pipeline
  - playwright
  - bigquery
  - nestjs
  - python-asyncio
  - knowledge-graph
  - meeting-prep
  - co-founder
  - contractor
---


# Meeting Prep: Sandeep Baynes — Maison Technical Fit Interview (April 8, 2026)

A structured preparation guide for a 30-minute technical fit conversation with Sandeep Baynes, Tech Lead and Co-Founder at Maison, scheduled for April 8, 2026. Compensation has already been confirmed at $50/hr with a 20hr/week cap, making this call focused exclusively on evaluating technical capability and architectural alignment. The goal is to demonstrate depth in PMS integrations, MCP tooling, and LLM pipelines while learning about Maison's stack and first deliverables.

## Key Concepts

- **Technical Fit Interview**: A candidate evaluation focused on engineering capability rather than compensation or culture, typically led by a technical co-founder or lead
- **MCP Tools**: Agent-callable endpoints (e.g., `searchHotels`, `getHotelRates`, `bookHotelOffer`) built on NestJS with JSON-RPC over SSE transport, typed schemas, and Redis caching
- **Playwright + LLM Pipeline**: A headless browser automation system combined with GPT-4o/Gemini function-calling for structured hotel data extraction, achieving >95% field coverage
- **PMS Adapters**: Modular Python asyncio adapter classes for hotel Property Management Systems (OHIP, Mews, Amadeus) with concurrent execution and Redis/AlloyDB caching
- **Knowledge Graph Layer**: Maison's apparent data architecture component, likely representing structured relationships between hotel entities — details to be confirmed in the call
- **CIIAA Guardrails**: Confidentiality rules requiring discussion to reference personal contributions ('I built X') rather than internal company details, customer names, or proprietary source code
- **Conversation Flow Strategy**: A time-boxed 30-minute script emphasizing listening over talking, technical specificity, and closing with onboarding questions
- **BigQuery Data Warehouse**: Multi-property analytics infrastructure with GA4 event export, session stitching, UTM attribution, and normalized fact tables

## Details

## Meeting Logistics

- **Date & Time:** Wednesday, April 8, 2026 · 9:00 AM – 9:30 AM EST
- **Format:** Google Meet (calendar invite confirmed)
- **Counterpart:** Sandeep Baynes, Tech Lead & Co-Founder, Maison
- **Status:** Comp settled ($50/hr, 20hr/week cap, sign-on bonus end of June). This is a pure technical evaluation.

---

## Purpose of the Call

This is not a negotiation. Sandeep is evaluating three things:
1. Can the candidate build what Maison needs?
2. Will the candidate be productive quickly with minimal handholding?
3. Does the candidate think about systems the way he does?

The candidate's objective: demonstrate technical depth, show understanding of Maison's problem space, and identify what the first deliverables would be.

---

## Profile: Sandeep Baynes

- **Role:** Tech Lead & Co-Founder at Maison
- **Timezone:** +0300 (likely Israel, Eastern Europe, or Middle East)
- **Communication style:** Extremely direct and brief (example: one-sentence email — "Can we meet at 9am tomorrow EST?")
- **Public presence:** Minimal — no articles, podcasts, or public GitHub. Inferred to be a heads-down builder
- **LinkedIn:** linkedin.com/in/sandeepbaynes (review before the call)

**Inference:** Co-founders with no public presence and one-line emails are typically deep technical builders. Expect precise technical questions. Match his directness.

---

## Recommended Opening (1–2 Minutes)

> "I'm finishing my MS at NYU, spent the last year building backend infrastructure for hotel operations. PMS integrations across OHIP, Mews, and Amadeus. Built MCP tools for agent-driven hotel search and booking. Built a Playwright + LLM pipeline for structured hotel data extraction. And a BigQuery data warehouse for multi-property analytics. I'm most interested in the integration and knowledge graph layer at Maison."

Immediately flip to him:

> "I'd love to hear about the architecture. What does the stack look like, and what would I be working on first?"

---

## Technical Deep-Dive Reference

### MCP Tools
- Endpoints: `searchHotels`, `getHotelRates`, `bookHotelOffer` as agent-callable functions
- Stack: NestJS, JSON-RPC over SSE transport
- Typed input/output schemas for LLM parameter resolution
- Redis caching with short TTL (rate data degrades quickly)
- Concurrent multi-property request handling

### Playwright + LLM Pipeline
- Headless browser captures rendered HTML and schema.org/JSON-LD from hotel sites
- GPT-4o/Gemini with tool-calling (not raw prompting) for extraction
- Tool schemas: `extractRoomTypes`, `extractAmenities`, `extractPolicies`, etc.
- >95% field coverage across diverse hotel website formats
- Key insight: function calling constrains LLM output and eliminates hallucination

### PMS Adapters
- Python asyncio for parallelized queries across providers
- Each PMS has a dedicated adapter class: auth, request formatting, response parsing, error handling
- `asyncio.gather` for concurrent execution
- Redis for rate caching; AlloyDB for persistent ID mapping across systems
- OHIP-first / Amadeus-fallback logic, configurable per property

### Data & Analytics
- BigQuery warehouse with GA4 raw event export
- Session stitching across devices and days
- UTM attribution with multi-signal logic
- Normalized fact tables across properties with inconsistent event structures

### Tech Stack
- **Languages/Frameworks:** Python (asyncio, FastAPI), TypeScript (NestJS, Next.js)
- **Databases:** Redis, PostgreSQL (AlloyDB/Supabase), BigQuery
- **Tooling:** Playwright, Docker, Git, CI/CD
- Comfortable building from scratch or working in existing codebases

---

## Questions to Ask Sandeep

### Must-Ask (Technical)
1. "What does the stack look like? What languages and frameworks are you running?"
2. "How does the knowledge graph work? Is it a graph DB, or structured differently?"
3. "What PMS integrations do you have today, and what's next on the roadmap?"
4. "What would my first week or two look like? What would I be shipping?"

### If Time Allows
5. "How does the orchestration engine handle multi-turn conversations? ReAct-style or something custom?"
6. "How do you handle hallucination in guest-facing responses? What guardrails are in place?"
7. "What's the deployment setup? How often do you ship?"
8. "How do you and Noel split the technical work?"

---

## What NOT to Do

1. **Don't repeat the Fredrik pitch.** Sandeep was CC'd on all prior emails. Be technical, not narrative.
2. **Don't monologue.** 30 minutes is short. Listen more than you talk.
3. **Don't ask about comp.** It's settled. Asking signals inattention.
4. **Don't ask about the offer letter.** That's a Fredrik conversation.
5. **Don't oversell.** If asked something unfamiliar, say: "I haven't worked with that directly, but here's how I'd approach it."
6. **Don't mention other companies.** This is a commitment conversation.
7. **Don't raise the pre-June-22 work authorization issue.** Fredrik handled it.

---

## 30-Minute Conversation Flow

| Time | Phase | Action |
|------|-------|--------|
| 0:00–1:00 | Greet | "Hey Sandeep, good to meet you. Fredrik's told me great things about what you're building." |
| 1:00–3:00 | Quick Technical Intro | MCP tools, Playwright pipeline, PMS adapters. End with: "What does the stack look like on your end?" |
| 3:00–12:00 | Listen + Learn | Let him walk through the architecture. Note: stack, DB, deployment, team structure, pain points. |
| 12:00–20:00 | Technical Discussion | Connect your experience to their problems based on what he shared. Deploy specific examples. |
| 20:00–25:00 | Your Questions | Ask 3–4 from the list. Prioritize "what would I work on first?" |
| 25:00–28:00 | Close | "This is exactly the kind of work I want to do. What does onboarding look like from your side?" |
| 28:00–30:00 | Wrap | Thank him. Confirm excitement. End clean. |

**Mapping cues during technical discussion:**
- He mentions PMS integrations → your adapter architecture
- He mentions data extraction → your Playwright + LLM pipeline
- He mentions agent tools → your MCP tools
- He mentions analytics → your BigQuery work

---

## CIIAA Confidentiality Guardrails

- **Safe:** Technologies, public APIs, architecture patterns, industry problems
- **Not safe:** Customer names, revenue figures, source code, internal details, partner contracts
- Always frame as: "I built X" — never "Kismet's system does Y"

---

## Quick Reference Card

```
LOGISTICS: Wed Apr 8, 9:00 AM EST, Google Meet

OPEN:     Quick technical intro (1 min) → "What does the stack look like?"
LISTEN:   Architecture, DB, team split, pain points
CONNECT:  Map your work to their problems
ASK:      Stack? Knowledge graph? First week tasks? PMS roadmap?
CLOSE:    "Ready to start, what does onboarding look like?"

KEY REMINDERS:
  - Comp is done. Don't bring it up.
  - Be technical, not narrative.
  - Match his directness.
  - CIIAA: "I built X" not "Kismet does Y"
  - 30 min goes fast. More listening, less talking.
```

## Related

- [[Maison — Company Overview]]
- [[Sandeep Baynes — Contact Profile]]
- [[Fredrik Meeting Prep — Maison]]
- [[MCP Tool Architecture]]
- [[Playwright + LLM Data Extraction Pipeline]]
- [[PMS Adapter Architecture]]
- [[Hotel Property Management Systems — OHIP, Mews, Amadeus]]
- [[BigQuery Analytics Warehouse]]
- [[CIIAA Confidentiality Guidelines]]
- [[Technical Interview Preparation]]
- [[Knowledge Graph Architecture]]
- [[NestJS Backend Patterns]]
- [[Python Asyncio Patterns]]
- [[Redis Caching Strategy]]
