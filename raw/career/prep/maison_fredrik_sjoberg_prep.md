---
status: processed
source_type: career-datacenter
ingested_at: 2026-04-09T21:35:00.000Z
parsed_at: 2026-04-09T21:35:00.000Z
compiled_to: "[[Meeting Prep: Maison AI Engineering Role — Fredrik Sjoberg & Noel Panicker]]"
processed_at: 2026-04-10T01:45:00.998Z
retry_count: 0
last_error: null
compile_progress: null
---


# Meeting Prep: Fredrik Sjoberg & Noel Panicker — Maison

**Meeting:** Sunday, March 22, 2026 (rescheduled from Saturday Mar 21) · Time TBD
**Format:** Phone call (no meeting link — confirm logistics. Fredrik has your number from email signature. Text/reply to confirm: "Should I call you, or will you call me?")
**Your goal:** Full-time engineering role. Graduating NYU MS Computer Engineering May 2026.
**How this happened:** Cold email Mar 16, Fredrik replied in 30 minutes and looped in Noel. Scheduled "Rahil AI recruitment" call. This is a real recruitment conversation, not a casual chat.

**Who's on the call:** Primarily Fredrik (CEO). Noel (Co-Founder) is invited but said "I'll let you and Fredrik schedule some time to catch up first" — likely observing or joining briefly, not leading. Prep for both.

---

## Section 1: CIIAA Guardrails (Read This First)

You signed a CIIAA with Tourist Products, Inc. (Kismet). These are your boundaries.

### SAFE to discuss freely:
- Technologies you used: NestJS, FastAPI, Playwright, asyncio, Redis, BigQuery, JSON-RPC/SSE, AlloyDB
- Public APIs you integrated with: OHIP (Oracle's public API), Mews Connector API (public docs), Amadeus GDS
- MCP protocol and tool-calling patterns (MCP is an open standard)
- Architecture patterns: parallelized adapters, caching layers, webhook systems, rate fallback logic
- General industry problems: booking engine fragmentation, PMS data normalization, hotel schema inconsistency
- The types of problems you solved and your technical approach
- Anything already in your cold emails (it's public)

### DO NOT discuss:
- Specific hotel/customer names from Kismet
- Kismet's revenue, pricing, financial details, business plans
- Proprietary source code or detailed internal implementation specifics
- Partner contracts, partner-specific integration details
- Kismet's product roadmap or unreleased features
- Employee names, compensation, internal org details

### Rule of thumb:
Talk about YOUR skills and approach. Say "I built X" not "Kismet's system does Y." If asked about specifics you can't share, say: "I can't go into the specifics of my employer's implementation, but I can walk you through the architecture patterns I worked with."

### Non-compete awareness:
- Your CIIAA has a 1-year non-compete on "Conflicting Services"
- Maison (guest messaging + agent distribution) is adjacent to but not directly competing with Kismet's core product
- DO NOT bring this up with Fredrik. If asked about restrictions: "I'm wrapping up my current role and will be fully available after May."

---

## Section 2: Who Is Fredrik Sjoberg

**The short version:** A hotelier since age ~20 (1997) who got a PhD in political science, spent 7 years as a data scientist at the World Bank studying digital engagement, then came back to hotel tech. He founded Nelson (a PMS) and then Maison (the AI-native evolution). He teaches at NYU's Tisch Center of Hospitality. He thinks like an academic, operates like a founder, and has the credibility of someone who's actually run hotels.

### Why This Background Matters for Your Conversation

Fredrik is NOT a typical tech founder. He's a behavioral scientist who happens to build hotel tech. His published research found that **government responsiveness to citizens creates a 57% increase in re-engagement**. That finding IS Maison's product thesis: responsive AI concierge = repeat guest engagement = direct bookings = reduced OTA dependency.

**What he values:**
- Data-driven thinking (7 years at World Bank doing quantitative research)
- First-principles reasoning (PhD, Fulbright, postdocs at NYU + Columbia)
- Operational authenticity (ran hotels in Scandinavia, was a hotel chain CEO)
- Velocity and execution (280+ properties in 10 months, replied to your email in 30 minutes)
- Intellectual curiosity (he's a professor who teaches "Experience Design and Innovation")

**What he does NOT want:**
- Hype without substance
- Buzzword-heavy pitches
- Someone who doesn't understand hospitality as a human business

### Key Facts

| Signal | Data |
|--------|------|
| Founded Maison | 2024, Brooklyn NY |
| Prior company | Nelson SaaS (all-in-one PMS for small hotels) |
| PhD | Political Science, Uppsala University (2011) |
| Fulbright | Harvard University (2007-2008) |
| World Bank | Senior Data Scientist, 2013-2019 |
| NYU | Adjunct Instructor, Tisch Center of Hospitality |
| Research | Bureaucratic responsiveness (PAR 2017), GOTV experiments (BJPS 2017) |
| Podcast | The Modern Hotelier Ep 223: "Traditional SEO is OUT" |
| Personal | Finnish-Swedish, started hotel biz 1997, father of two, acted on Finnish TV, ran for parliament |

### His Thesis (from the podcast + LinkedIn)

"Traditional SEO is dead. Conversational AI agents will replace hotel websites for discovery. Hotels need to become agent-ready, which means structuring their content so AI agents can discover, understand, and book them. Maison is the infrastructure that makes that happen."

This is not just a chatbot company. Fredrik is building the distribution layer for the post-Google era.

---

## Section 3: Who Is Noel Panicker

**The short version:** Likely the technical co-founder. NYU ML researcher, built GPT-4/ReAct agent systems, worked as Agent Engineer at Poggio Labs (AI agents for revenue ops), AI Engineer at Nexla, Senior Engineer at Samsung.

**Why this matters:** If Noel built Maison's orchestration engine and knowledge graph, he's evaluating whether you can ship at his level. He knows ReAct agents, GPT-4 tool-calling, and agent infrastructure deeply.

**How to handle if Noel speaks up:** Be precise. He'll ask technical questions. Don't hand-wave. Your MCP tools and Playwright+LLM pipeline are directly relevant to what he's built. Speak his language: tool-calling, structured extraction, orchestration, multi-turn context management.

---

## Section 4: Your Story Arc

### Opening (1-2 min): How You Found Maison

> "I was building tracking and integration infrastructure at Kismet, working across 7 or 8 different booking engines. iHotelier, SynXis, Allora, AZDS. Every one had a different data model, different checkout flow, different way of handling rates. I spent a lot of time reverse-engineering these systems to normalize them into a consistent data layer.
>
> What struck me about Maison is the 'agent-native distribution layer' framing. That's basically the problem I was solving from the infrastructure side: hotels have their content on one system, rates buried in a booking engine, and operational signals sitting in the PMS. None of it is structured for AI agents to use. I built MCP tools that let agents search availability, pull rates, and trigger bookings through structured function calls. That's exactly the kind of infrastructure an agent-native platform needs."

### Bridge to Fredrik's Vision (30 sec)

> "I also listened to your podcast episode on The Modern Hotelier, and the thesis that traditional SEO is being replaced by AI-native discovery really resonated. The structured content layer, the knowledge graph approach, making hotels bookable through conversations instead of web forms. That maps directly to what I was building."

### Why Maison Specifically (30 sec)

> "Having worked with a hotelier turned tech founder before, I know how much that operational background shapes the product. The decisions are different when someone on the team has actually managed a property. That's one of the things that drew me to Maison. The NYU connection, the academic rigor, and the fact that you've actually run hotels. That combination is rare."

---

## Section 5: Technical Talking Points

Have 2-3 sentences ready for each. Pick the ones that connect to what Fredrik/Noel talk about.

### 1. MCP Tools for Hospitality (YOUR STRONGEST CARD)
Built `searchHotels`, `getHotelRates`, `bookHotelOffer` as agent-callable endpoints using NestJS with JSON-RPC over SSE. These are structured function call schemas that any LLM can invoke to search availability, pull rates, and execute bookings. This IS the infrastructure for "agent-native distribution." If Maison's knowledge graph needs to connect to PMS and booking systems, this is exactly how you do it.

### 2. Playwright + LLM Tool-Calling Pipeline
Built a crawler with GPT-4o/Gemini tool-calling that extracts structured hotel data (amenities, policies, rates, room types) with >95% field coverage from inconsistent hotel websites. Key insight: LLMs alone hallucinate on hospitality specifics, but grounding them with browser automation and function calling gets reliable structured data. This maps to Maison's knowledge graph population problem.

### 3. PMS Adapter Parallelization
Parallelized PMS adapters using asyncio with Redis caching and AlloyDB persistence. Integrated OHIP and Amadeus with fallback logic. When Maison needs to query a hotel's PMS for live availability during a guest conversation, this is the infrastructure pattern.

### 4. BigQuery Data Warehouse + Attribution
Built GA4 export pipeline, session stitching, multi-signal attribution across hotel booking flows. For Maison's analytics layer (understanding which conversations convert, which guest touchpoints drive direct bookings), this experience is directly applicable.

### 5. Booking Engine Fragmentation (The Empathy Card)
Worked across 7-8 different booking engines with completely different data models, checkout flows, and rate structures. This gives you genuine empathy for the problem Maison is solving. Hotels are stuck with fragmented tech stacks, and someone needs to abstract that away for AI agents.

---

## Section 6: Ideas for Maison (Power-Sequenced)

Deploy in order based on where the conversation goes. Don't monologue. Drop one idea, let Fredrik react, follow his thread.

### Idea 1 (LEAD): MCP Server for Hotel Distribution

**Opening line:**
> "One thing I've been thinking about: if Maison's knowledge graph structures hotel content for AI agents, the natural next step is exposing that via MCP servers. So when ChatGPT or any AI agent wants to book a hotel, it can discover Maison-connected properties through structured tool calls. I actually built exactly those tool schemas at my previous role: searchHotels, getHotelRates, bookHotelOffer. Is that something you're thinking about?"

**Why this lands:** It connects your exact work to Maison's stated vision. It shows you understand both the technical implementation AND the strategic positioning.

### Idea 2: Knowledge Graph Population via Structured Extraction

**Use if he mentions data quality or onboarding challenges:**
> "One of the hardest problems in hotel tech is that hotel data is scattered across websites, PMS systems, and OTA listings, and none of it is consistent. I built a pipeline that uses Playwright with LLM tool-calling to extract structured hotel data from messy sources with over 95% field coverage. That same pattern could accelerate how Maison populates its knowledge graph when onboarding new properties."

### Idea 3: The Responsiveness Loop (Academic Bridge)

**Use to connect with Fredrik's research side:**
> "I read your paper on bureaucratic responsiveness and citizen participation. The finding that a successful first interaction creates a 57% increase in re-engagement is basically the core thesis of AI concierge, right? If the chatbot resolves a guest's first question well, they come back to it for booking, for concierge recommendations, for on-stay requests. The engagement flywheel is the same mechanism you measured at the World Bank, just applied to hospitality."

**Why this lands:** Nobody else interviewing at Maison will have read his academic papers. This shows intellectual depth and genuine interest in how he thinks.

### Idea 4: PMS Integration Acceleration

**Use if he mentions integration challenges or Cloudbeds:**
> "PMS integrations are where most hotel tech companies lose velocity. Every PMS has a different API design, different data models, different auth flows. I integrated with OHIP and Mews Connector API, and the pattern I found is that the integration layer is always the bottleneck, not the PMS itself. If Maison needs to scale from Cloudbeds to OHIP to Mews to SynXis, I can help accelerate that."

---

## Section 7: 30-Minute Conversation Flow

```
0:00-1:00   WARM UP
  "Fredrik, really appreciate you making time on a Saturday. And Noel,
   great to connect. Your 'Go Violets' made my day."
  [Keep it warm, quick, then move.]

1:00-3:30   YOUR STORY
  Booking engine fragmentation at Kismet -> agent-native distribution
  framing resonated -> MCP tools connection -> podcast thesis clicked.
  [Keep it to ~2.5 min. Hit highlights, leave space for him to react.]

3:30-5:00   BRIDGE TO MAISON
  "What made me reach out is the combination of the NYU connection,
   your background actually running hotels, and the agent-native
   distribution vision. Most hotel tech is still stuck in the chatbot
   era. Maison seems like it's building for what comes after."

5:00-10:00  FLIP IT TO HIM
  "I'd love to hear how you're thinking about the knowledge graph
   and the agent-native layer. What's the current architecture look
   like, and where is the team focused right now?"
  [LISTEN CAREFULLY. This tells you what they're actually building.
   Map his answer to your talking points in Section 5.]

10:00-17:00 SHARE RELEVANT WORK + IDEAS
  Based on what he said, pick 2-3 talking points from Section 5.
  Then deploy 1-2 ideas from Section 6.

  If he talks about distribution/agents -> MCP Server idea (Idea 1)
  If he talks about data/onboarding -> Knowledge Graph idea (Idea 2)
  If the vibe is intellectual -> Responsiveness Loop (Idea 3)
  If he mentions Cloudbeds/integrations -> PMS Acceleration (Idea 4)

17:00-22:00 YOUR QUESTIONS
  Ask 3-4 from the list below. These show you're evaluating fit too.

22:00-25:00 ROLE + LOGISTICS
  "What does the engineering team look like right now?"
  "Is this remote, hybrid, or in-person in Brooklyn?"

25:00-28:00 CLOSE
  See Section 10 for closing script.

28:00-30:00 WRAP
  Thank him. Confirm next steps. End on a high note.
```

---

## Section 8: Questions to Ask

### Tier 1 (Ask no matter what)
1. **"What does the engineering team look like right now? How big, and what does a typical week look like?"**
   (Shows you care about the team, not just the product.)

2. **"What's the biggest technical bottleneck you're dealing with as you scale past 280 properties?"**
   (Direct. Shows you think about scale problems.)

3. **"The 'agent-native distribution layer' is the most interesting framing I've seen in hotel tech. Are you building MCP servers or a similar protocol for external AI agents to query the knowledge graph?"**
   (Technical + strategic. Connects to your MCP work.)

4. **"Is this remote, hybrid, or based in Brooklyn?"**
   (Logistics. You need to know.)

### Tier 2 (If time allows)
5. "How does the knowledge graph get populated when a new property onboards? Is it manual, automated, or a mix?"
   (This is where your Playwright extraction pipeline is relevant.)

6. "What does the tech stack look like? I saw mentions of Python and LLM fine-tuning."

7. "What would a strong first hire look like in their first 90 days?"

---

## Section 9: What NOT to Do

**Don't mention Nelson SaaS unless he brings it up.**
It might be a pivot he doesn't want to dwell on.

**Don't bring up competitors' funding.**
Duve's $60M, Canary's $50M. If Maison is bootstrapped, this is sensitive territory.

**Don't oversell.**
Fredrik is an academic. He values substance. If you don't know something, say "I haven't worked on that directly, but here's how I'd think about it."

**Don't make it a monologue.**
Fredrik is a professor. He teaches by asking questions and following threads. Leave pauses. Let him steer.

**Don't skip the close.**
30 minutes goes fast. At minute 25, if he hasn't brought up next steps, you bring it up.

**Don't share Kismet confidential information.**
See Section 1. Frame everything as "I built X" not "Kismet's system does Y."

**Don't forget to confirm call logistics.**
No meeting link. Reply to the email thread today asking how you'll connect.

---

## Section 10: Closing Script

At ~minute 25, say this (adapt naturally):

> "This has been really exciting to hear about. The agent-native distribution vision is exactly the kind of problem I want to work on full time. I'm graduating from NYU in May and actively looking for a role where I can ship infrastructure for hospitality AI. Maison is at the top of my list. What would next steps look like?"

Then stop. Let him respond.

**If he asks about availability:** "I can start as early as June, flexible on exact timing."

**If he asks about location:** "I'm in New York right now, so Brooklyn works great. Also open to remote or hybrid."

**If he asks about comp expectations:** "I'm flexible, especially for an early-stage company where I can have real impact. Happy to discuss specifics whenever it makes sense."

**If he asks for your resume:** "Absolutely, I'll send it right after the call." (Have it ready to email immediately.)

---

## Section 11: Quick Reference Card (Print This for Saturday)

```
LOGISTICS: Saturday Mar 21, 1 PM EST. Phone call. Confirm how to connect.

OPEN:    Booking engine fragmentation -> "agent-native" framing resonated
         -> MCP tools are exactly the infra for that -> podcast thesis clicked
BRIDGE:  NYU connection + operator credibility + agent-native vision
FLIP:    "How are you thinking about the knowledge graph and agent layer?"

TECH POINTS (pick 2-3 based on his response):
  [MCP tools]        searchHotels/getRates/bookOffer, NestJS, JSON-RPC/SSE
  [Playwright+LLM]   Structured extraction, >95% coverage, tool-calling
  [PMS adapters]     asyncio, OHIP/Mews/Amadeus, Redis, fallback logic
  [BigQuery]         GA4 export, session stitching, attribution
  [Fragmentation]    7-8 booking engines, data normalization

IDEAS (power sequence):
  1 (ALWAYS LEAD):
    "If the knowledge graph structures hotel content for AI agents,
     the next step is MCP servers. I built exactly those tool schemas."
  2 (if data/onboarding): Playwright extraction for knowledge graph population
  3 (if intellectual): Responsiveness research -> guest engagement flywheel
  4 (if integrations): PMS integration acceleration (OHIP, Mews, SynXis)

QUESTIONS:
  1. Team size + structure?
  2. Biggest technical bottleneck?
  3. MCP/protocol for external agents?
  4. Remote vs Brooklyn?

CLOSE:   "Graduating May, Maison is top of list. What are next steps?"

CIIAA:   Talk about YOUR skills. Not Kismet's system.
         No customer names, no financials, no source code.
         "I can't share specifics of my employer's implementation,
          but I can walk through the architecture patterns."
```

---

*Generated: 2026-03-19 | Meeting: 2026-03-21 1:00 PM EST*
