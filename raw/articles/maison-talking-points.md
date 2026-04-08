---
status: processed
source_type: file_drop
source_id: career-datacenter/prep/maison_talking_points.md
ingested_at: 2026-04-08T14:25:52.476Z
parsed_at: 2026-04-08T14:25:52.476Z
compiled_to: "[[Maison Call — Interview Preparation Brief (Fredrik Sjoberg, March 2026)]]"
processed_at: 2026-04-08T15:34:19.792Z
retry_count: 0
last_error: null
compile_progress: null
---



# Maison Call — Talking Points & Deep Brief
**Meeting:** Sunday, March 22, 2026 (rescheduled from Saturday)
**With:** Fredrik Sjoberg (CEO/Founder), possibly Noel Panicker (Co-Founder)

---

## PART 1: YOUR STORY — In Your Own Words

These are paragraphs you can internalize and riff from. Don't memorize them word for word. Know the beats.

---

### "How I fell into hospitality tech"

A little over a year ago, hospitality tech was completely alien to me. I had no background in hotels, no idea what a PMS was, didn't know what OHIP stood for, never heard of a channel manager. I joined Kismet as a software engineering intern and within the first week I was looking at Oracle's OHIP documentation trying to figure out how to pull rates from their property API. It was like learning a new language. Every system had its own vocabulary for the same thing. One PMS calls it a "room type," another calls it a "space type," a third one calls it a "room category." Same concept, three names, three schemas, three sets of edge cases.

What surprised me is how much I liked it. The problems are genuinely hard. Not hard in the way a LeetCode problem is hard, but hard in the way real systems are hard. You're dealing with legacy APIs that were designed 15 years ago, booking engines that render rates inside iframes that no crawler can reach, PMS systems that rate-limit you differently depending on the time of day. And the stakes are real. If your rate lookup returns stale data, a guest books a room at the wrong price and the hotel eats the difference.

That's what got me hooked. Now hospitality is all I want to dig deeper into. I've spent the last year learning every layer of this stack, from the PMS data model all the way up to how a guest interacts with a booking engine. And the more I learn, the more I realize how much room there is to build better infrastructure for this industry.

---

### "Why I want to go deeper at Maison specifically"

What drew me to Maison is that you're not building another chatbot. The "agent-native distribution layer" framing is the thing I keep coming back to. Because that's the real problem. Hotels have their marketing content on one website, their actual rates buried inside a booking engine that LLMs can't reliably penetrate, and their operational data sitting in a PMS that nothing talks to. None of it is structured for AI agents to use. I've lived that problem firsthand.

I built MCP tools at Kismet that let AI agents search hotel availability, pull rates, and trigger bookings through structured function calls. That's the infrastructure layer that an agent-native platform needs. When I saw that Maison is building a knowledge graph to structure hotel data for AI consumption, I immediately recognized that as the same problem approached from a different angle. I was building the plumbing from the PMS up. Maison is building the layer from the guest conversation down. Those two need to meet in the middle.

Having worked with a hotelier turned tech founder before, I know how much that operational background shapes the product. The decisions are different when someone on the team has actually managed a property. That's one of the things that drew me to Maison. The NYU connection, the academic rigor, and the fact that you've actually run hotels. That combination is rare.

---

### "What excites me about the timing"

There's a window right now in hospitality where the entire discovery and distribution model is about to shift. Traditional SEO is losing ground to AI-native results. By next year, most informational queries will be resolved inside AI interfaces, not on Google's blue links. Hotels that aren't structured for AI agents to find them will get buried behind OTAs that are.

Maison is positioned at exactly that inflection point. You're not just solving today's problem of automating guest conversations. You're building the infrastructure that makes hotels visible in the post-Google era. That's a much bigger opportunity, and it maps directly to the kind of work I've been doing.

---

## PART 2: YOUR WORK AT KISMET — Detailed, Clean Explanations

Use these to answer "Tell me about what you built" or when you need to go deeper on any project.

---

### MCP Tools (searchHotels, getHotelRates, bookHotelOffer)

**What they are:**
I built three agent-callable endpoints that let an AI agent interact with hotel booking systems through structured function calls. searchHotels takes a location and dates and returns available properties. getHotelRates takes a specific property and returns live rates with room types, cancellation policies, and availability windows. bookHotelOffer takes a rate offer ID and guest details and initiates a booking.

**How they work:**
Built with NestJS. Exposed via JSON-RPC over Server-Sent Events (SSE). The SSE transport is important because it gives you a persistent connection where the agent can send requests and receive streaming responses without polling. Each tool has a typed input schema and output schema so the LLM knows exactly what parameters to pass and what it'll get back.

**Why this matters for Maison:**
MCP (Model Context Protocol) is becoming the standard for how AI agents interact with external systems. If Maison's knowledge graph needs to connect to PMS and booking systems so that a guest conversation can actually check availability and complete a booking, this is exactly the pattern. I've built it in production, not just as a demo.

**If asked about scale/performance:**
The tools handle concurrent requests across multiple properties. For rate lookups, I implemented a caching layer with Redis so we're not hitting the PMS API on every single query. The cache has a short TTL because rate data goes stale fast, but even a 60-second cache reduces PMS API calls significantly during peak booking windows.

---

### Playwright + LLM Tool-Calling Pipeline

**What it is:**
A pipeline that extracts structured hotel data from messy, inconsistent hotel websites. Takes a hotel URL, crawls it with Playwright (headless browser), and uses GPT-4o or Gemini with tool-calling (function calling) to extract structured fields: room types, amenities, policies, rates, cancellation terms, images, contact info.

**How it works:**
Playwright handles the browser automation. It navigates to the hotel website, waits for dynamic content to load (many hotel sites are heavy JavaScript), captures the rendered HTML, and also pulls structured data from schema.org/JSON-LD if it exists on the page. The LLM receives the page content and a set of extraction tools (functions) it can call. Each tool corresponds to a data type: extractRoomTypes, extractAmenities, extractPolicies, etc. The LLM decides which tools to call and fills in the structured output.

**Why tool-calling instead of just prompting the LLM:**
If you just ask GPT-4o "extract all room types from this page," it hallucinates. It'll make up room names, invent amenities, guess at prices. But when you give it typed function schemas, it's forced to fill specific fields with specific types. That constraint dramatically improves accuracy. We got over 95% field coverage across a wide range of hotel website formats.

**Why this matters for Maison:**
Maison has a proprietary knowledge graph that structures hotel data for AI consumption. When a new property onboards, someone needs to populate that graph with accurate, structured data about the hotel. If that's manual, it doesn't scale. A pipeline like the one I built can automate the initial data extraction and keep it updated as hotel websites change. It's the difference between onboarding a property in days versus hours.

**If asked about edge cases:**
The hardest part is booking engines. Rate data on hotel websites is almost always loaded dynamically inside an iframe from a separate booking engine (iHotelier, SynXis, etc.). Playwright can navigate into those iframes, but the data is session-gated and often requires date selection before any rates appear. I built fallback logic: if the booking engine data is unreachable, the pipeline still extracts everything else from the marketing site and flags the rate data as unavailable for manual review.

---

### PMS Adapter Parallelization

**What it is:**
A system that queries multiple PMS APIs simultaneously instead of one at a time. When you need to check rates across 10 properties, you don't want 10 sequential API calls. You want them running in parallel.

**How it works:**
Built with Python's asyncio. Each PMS integration (OHIP, Mews Connector API, Amadeus GDS) has its own adapter class that knows how to authenticate, format requests, parse responses, and handle errors for that specific system. The orchestration layer fires all the adapters concurrently using asyncio.gather, collects the results, and normalizes them into a consistent schema.

**The caching layer:**
Added Redis for frequently queried rate data. Also used AlloyDB (Google's PostgreSQL-compatible database) for persistent ID mapping. The ID mapping matters because the same hotel might have different identifiers in different systems. OHIP calls it one thing, Mews calls it another, Amadeus has its own code. AlloyDB stores the mapping so the system knows "property X in OHIP is the same as property Y in Mews."

**The fallback logic:**
If OHIP is down or rate-limited, the system falls back to Amadeus for rate data. If both are unavailable, it returns cached data with a "stale" flag. The priority order is configurable per property because some hotels have better rate fidelity in their PMS than in Amadeus.

**Why this matters for Maison:**
When a guest asks Maison's AI concierge "what rooms are available this weekend," the system needs to query the hotel's PMS in real time and get back structured availability. If Maison supports multiple PMS integrations (Cloudbeds today, possibly OHIP, Mews, others tomorrow), the parallelization and normalization patterns I built are exactly what you need. Each PMS speaks a different language; the adapter layer translates.

---

### BigQuery Data Warehouse + GA4 Attribution

**What it is:**
A data pipeline that takes raw Google Analytics 4 event data from hotel websites, transforms it, and loads it into BigQuery for reporting and analysis. The output powers dashboards that hotel operations teams use to track RevPAR, ADR, occupancy, booking velocity, and marketing attribution.

**How it works:**
GA4 exports raw event data to BigQuery as nested JSON. The raw data is messy: events have different parameter structures across different hotel properties (one hotel tracks "booking_value" as a custom parameter, another tracks "revenue," a third doesn't track it at all). I built transformation queries that normalize these into consistent fact tables. Session stitching was a big piece: connecting a user's first visit (from a Google ad, say) to their eventual booking (maybe days later on a different device) to correctly attribute the revenue.

**Why this matters for Maison:**
Maison has an analytics layer that tracks guest conversations, conversion rates, and engagement patterns. The same data engineering patterns apply: you're taking raw conversation events, normalizing them across properties with different configurations, and building aggregates that help hotel managers understand what's working. "Which types of guest questions lead to direct bookings?" is the same analytical pattern as "Which marketing channels lead to direct bookings?"

---

### Booking Engine Fragmentation (The Industry Problem)

**What it is:**
Hotels don't all use the same booking engine. There are at least 7 or 8 major ones: iHotelier, SynXis (Sabre), Allora, AZDS, Mews' native engine, Cloudbeds' native engine, and several others. Each one has a completely different UI, data model, checkout flow, and integration pattern.

**Why this matters:**
I worked across all of these during my time at Kismet. Every time we onboarded a new hotel, we'd discover their booking engine had a different way of presenting rates, a different iframe structure, a different way of handling room type metadata. There's no standard. This is one of the core reasons hotels are stuck with fragmented tech stacks and why most hotel tech integrations are so painful.

**Why this matters for Maison specifically:**
When Maison's AI concierge needs to help a guest book a room, it eventually needs to interface with whatever booking engine that hotel uses. If Maison can abstract away the booking engine layer, so that the guest conversation flows naturally regardless of whether the hotel uses iHotelier or SynXis or Cloudbeds, that's a massive competitive advantage. I've touched enough of these systems to know where the pain points are and how to design adapters that handle the differences.

---

## PART 3: EVERYTHING ABOUT MAISON

---

### What Maison Is

Maison (maison.cx) is an AI-powered guest messaging platform for hotels. On the surface, it's a chatbot: hotels embed a code snippet on their website, and guests can ask questions in natural language instead of navigating menus or filling out forms.

But Fredrik is positioning it as something bigger: **"infrastructure for agentic commerce."** The idea is that hotel content needs to be structured not just for human visitors, but for AI agents. When ChatGPT or Google Gemini or any future AI assistant needs to recommend and book a hotel, it needs structured, machine-readable data about that property. Maison's knowledge graph is that structured layer.

So there are two products in one:
1. **Today's product:** AI concierge that handles guest conversations (availability, pricing, concierge recommendations, upsells, on-stay requests) across web chat, SMS, email, and voice.
2. **Tomorrow's product:** An agent-native distribution layer that makes hotels discoverable and bookable by external AI agents.

---

### How the Product Works

- Hotel signs up (free tier available) and embeds a JavaScript widget on their website
- Maison connects to the hotel's PMS (Cloudbeds partnership confirmed, others likely in progress)
- The AI concierge engages guests in natural language conversations
- A proprietary orchestration engine manages multi-turn conversations, maintaining context across the entire guest interaction
- A proprietary knowledge graph structures each hotel's data (rooms, amenities, policies, rates, local recommendations) for the AI to reference
- LLMs fine-tuned on hospitality data power the natural language understanding
- Analytics dashboard gives the hotel visibility into what guests are asking, conversion rates, and engagement patterns

---

### Traction

- **280+ properties activated in 10 months** (from founding in 2024 to mid-2025)
- Multiple continents
- Notable properties: Grand Suites Residences & Spa (231 rooms), The Ameswell Hotel, The Maven Hotel, The Ozarker Lodge, Arbus Hospitality
- Won **2025 Best Tech Innovation from Independent Lodging Congress (ILC)**
- Cloudbeds partnership (open API connectivity)
- Free tier launched (lowering adoption barrier)

---

### Funding & Team

- **~25 employees** (LinkedIn shows 11-50 range)
- **Brooklyn, NY** headquarters
- **No publicly disclosed funding rounds.** Appears bootstrapped or very early-stage (pre-seed/seed).
- This means the team is lean and everyone ships. An early hire has outsized impact.

---

### Fredrik's Prior Company: Nelson SaaS

Before Maison, Fredrik founded **Nelson** (nelson.management), an all-in-one PMS for small hotels and rental operators. Features included smart locking, AI pricing, OTA integration (Booking.com/Expedia), and guest communications. NYC and SF.

Maison appears to be the evolution: instead of trying to replace the PMS, structure the data layer on top of whatever PMS the hotel already uses and own the guest conversation. This is a smarter wedge because PMS replacement is a multi-year sales cycle, but adding a chatbot is a weekend integration.

**Don't bring this up unless Fredrik does.** If he mentions it, you can say: "That's a really smart pivot. Owning the conversation layer instead of trying to replace the PMS gives you a much faster integration path."

---

### Competitive Landscape

| Company | Funding | Scale | Differentiator |
|---------|---------|-------|---------------|
| **Maison** | Undisclosed | 280+ properties | Agent-native distribution, knowledge graph, free tier |
| **Akia** | $12.4M Series A | Thousands | Deep PMS integration (Mews, Opera), operational focus |
| **HiJiffy** | ~$4M | 2,500+ hotels | Proprietary Aplysia AI, 130+ languages, 85% automation |
| **Duve** | $60M Series B | Enterprise (Accor, OYO) | 1M+ monthly comms, sentiment analysis |
| **Canary** | $50M+ | Large chains + independents | Full guest management (check-in, tips, upsell) |
| **Asksuite** | ~$7M | 3,000+ | Omnichannel, strong BE integration |

**How Maison differentiates:**
1. Not just a chatbot: infrastructure for the agentic era
2. Knowledge graph approach vs. simple RAG pipelines
3. Fredrik's unique combo: PhD data scientist + actual hotelier + NYU professor
4. Speed to market: 280+ properties in 10 months, likely bootstrapped
5. Free tier: competitors charge $100-200+/month
6. Independent hotel focus: 300K+ global TAM
7. "Hospitality is human first" philosophy: AI handles routine, staff handles meaningful moments

**Maison's challenges:**
- Much smaller team than competitors
- Fewer documented PMS integrations
- No major funding round (yet)
- Newer brand (2024 vs. competitors with 5+ year track records)
- These are also opportunities: small team means your work matters more

---

### The "Agentic Distribution" Thesis

This is the big idea. The argument goes:

1. **Google search is losing hotel discovery.** AI assistants will increasingly handle "find me a hotel in Brooklyn for this weekend" queries.
2. **OTAs will adapt.** Booking.com and Expedia are already building AI interfaces. If hotels don't become directly discoverable by AI agents, OTAs will be the middlemen forever.
3. **Hotels need structured data.** Not marketing copy on a website, but machine-readable data that an AI agent can query: room types, real-time availability, pricing, policies, amenities, reviews, all in a structured format.
4. **Maison's knowledge graph IS that structured layer.** When an external AI agent asks "what's available at Hotel X this weekend," Maison can serve that answer from structured data, not from scraping a website.
5. **MCP is the protocol.** Model Context Protocol is becoming the standard for agent-to-service communication. Maison could expose their knowledge graph via MCP servers, making every Maison-connected hotel instantly bookable by any AI agent.

This is why your MCP tools experience is so directly relevant. You've already built the exact tool schemas (searchHotels, getHotelRates, bookHotelOffer) that this vision requires.

---

### Fredrik's Published Research (The Academic Bridge)

**"The Effect of Bureaucratic Responsiveness on Citizen Participation"** (Public Administration Review, 2017)

- First study to quantify, at the individual level, how government responsiveness affects citizen engagement
- Used Fix My Street data (n=399,364 reports)
- Key finding: a successful first experience (the government actually fixing the reported problem) creates a **57% increase** in the probability of the citizen submitting a second report
- In other words: responsiveness breeds engagement

**Why this matters for Maison:**
This finding IS the product thesis. If the AI concierge resolves a guest's first question well (gives accurate availability, makes a helpful restaurant recommendation, handles a request quickly), that guest comes back to the concierge for everything else during their stay. They book through it, they upsell through it, they leave feedback through it. The engagement flywheel is the same mechanism Fredrik measured at the World Bank, applied to hospitality.

When you bring this up on the call, it shows you've done homework that goes beyond the product and into how Fredrik actually thinks.

---

### Fredrik's Podcast Thesis (The Modern Hotelier, Episode 223)

**"Traditional SEO is OUT: How Hotels Can Get AI-Ready"**

Key arguments:
- Traditional SEO (meta tags, keyword optimization, backlinks) is becoming irrelevant as AI handles more discovery
- Hotels need to think about AI readiness: is their content structured so that an AI agent can understand and recommend them?
- Conversational booking will replace web forms: guests will ask "book me a room" in a chat, not click through a 5-step checkout
- The distribution power is shifting: hotels that are agent-ready will capture direct bookings, hotels that aren't will keep paying OTA commissions
- Maison structures hotel data into a knowledge graph that makes properties discoverable by AI agents

**Use this on the call:** "I listened to your episode on The Modern Hotelier. The point about AI readiness replacing SEO really stuck with me. That's the problem I was solving from the infrastructure side: making hotel data machine-readable and agent-accessible."

---

## PART 4: CONVERSATION OPENERS & TRANSITIONS

Short lines you can deploy at natural moments.

---

**When he asks "tell me about yourself":**
> "I'm finishing my MS in Computer Engineering at NYU in May. Spent the last year building backend infrastructure for hotel operations. PMS integrations, booking engine adapters, AI data extraction pipelines. A year ago I didn't know what a PMS was. Now it's all I want to work on."

**When he asks "why Maison":**
> "Two things. First, the agent-native distribution framing. That's not just a chatbot, that's infrastructure for how hotels get discovered in the AI era. I built the MCP tools that sit on the other side of that equation, so I know exactly how important that structured data layer is. Second, having worked with a hotelier turned tech founder before, I know that operational background changes everything about how the product gets built. You've actually run hotels. That matters."

**When the conversation turns to your passion for hospitality:**
> "Hospitality was completely new to me a year ago. What I didn't expect is how deep the problems go. Every hotel runs a different PMS, a different booking engine, a different channel manager. Nothing talks to anything else. And the data quality is terrible because everything was designed for humans to read, not for machines to process. That's what makes it such a compelling space for AI. There's so much low-hanging fruit, and the infrastructure to capture it barely exists yet."

**When he asks about your technical work:**
> "The thread that connects everything I built is making hotel data reliable enough for AI to trust. The MCP tools give agents structured access to rates and availability. The Playwright pipeline extracts structured data from messy hotel websites. The PMS adapters normalize data across systems that all speak different languages. And the BigQuery warehouse makes it all queryable for operations and analytics. Every layer is about the same thing: turning fragmented, inconsistent hotel data into something clean and usable."

**When you want to show intellectual depth:**
> "I read your paper on bureaucratic responsiveness. The 57% re-engagement finding from Fix My Street. It's interesting because that's basically the thesis behind an AI concierge. If the first interaction is good, the guest keeps coming back to it. That engagement loop is what drives direct bookings and reduces OTA dependency. The behavioral science behind it is the same mechanism, just applied to hospitality instead of public services."

**When he asks what you'd want to work on at Maison:**
> "Honestly, the integration layer. That's where I've spent the most time and where I think I can have the most impact fastest. Connecting to more PMS systems, structuring the data that feeds the knowledge graph, and eventually building the MCP interface so external AI agents can discover and book Maison-connected hotels. That's the piece that turns Maison from a great chatbot into the distribution infrastructure for the industry."

**When he asks about your timeline/availability:**
> "Graduating in May, can start as early as June. I'm flexible on timing. And I'm in New York, so Brooklyn works perfectly."

**When the conversation starts winding down (the close):**
> "This has been really exciting. The agent-native distribution vision is exactly the kind of problem I want to go deep on. Maison is at the top of my list. What would next steps look like from your side?"

---

## PART 5: QUICK HITS — Things to Remember

1. **Confirm call logistics.** No meeting link. Reply to confirm how you'll connect.
2. **Try the product before Sunday.** Go to maison.cx and interact with the chatbot.
3. **Listen to the podcast.** The Modern Hotelier Ep 223. Fredrik in his own words.
4. **Fredrik says "Ciao"** as his sign-off. He's Finnish-Swedish but uses Italian casual. Match his energy: warm, direct, intellectual but not stiff.
5. **He misspelled your name as "Ranil"** in his first reply. Don't bring it up. He's clearly busy and fast-moving.
6. **30 minutes goes fast.** Don't spend more than 3 minutes on your intro. Flip it to him early. The more he talks, the more you learn about what they actually need.
7. **CIIAA: Talk about YOUR skills.** Not Kismet's system. "I built X" not "The company does Y."
8. **If Noel asks a technical question:** Be precise. He built agent systems at Poggio Labs. He knows ReAct, tool-calling, orchestration. Don't hand-wave.
9. **Don't mention competitors' funding.** If Maison is bootstrapped, the Duve $60M or Canary $50M comparisons are sensitive.
10. **Don't mention Nelson SaaS** unless he does.

---

*Updated: 2026-03-20 | Meeting: Sunday, March 22, 2026*
