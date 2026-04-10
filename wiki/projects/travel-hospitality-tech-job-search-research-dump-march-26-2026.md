---
title: Travel & Hospitality Tech Job Search — Research Dump (March 26, 2026)
author: ai
created_at: 2026-04-10T02:00:00.060Z
last_ai_edit: 2026-04-10T02:00:00.060Z
last_human_edit: null
last_embedded_hash: 32fa8abe29436b4e
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/career/drafts/deep_research_mar26_2026.md]]"
tags:
  - job-search
  - travel-tech
  - hospitality
  - startups
  - outreach
  - ai
  - llm
  - pms
  - mcp-tools
  - yc
  - phocuswire
  - revenue-management
  - guestcx
  - booking-engines
  - linkedin
  - email-outreach
  - follow-up
  - tier-list
  - execution-plan
  - "2026"
---


# Travel & Hospitality Tech Job Search — Research Dump (March 26, 2026)

A comprehensive outreach tracking document covering 27 newly researched travel and hospitality tech startups, organized into activation tiers based on skill match, funding stage, and open roles. The document maps current outreach status across big travel platforms and startups, identifies critical category gaps in the job search pipeline, and provides a four-week execution plan for LinkedIn and email campaigns. Key targets include AI-native hotel tech companies with direct overlap to prior MCP tool-building and PMS integration work.

## Key Concepts

- **Tier A Startups**: Highest-priority targets with near-perfect skill match and active hiring (DirectBooker, HostAI, Boom, Bonafide, Lobby, Riviera)
- **Tier B Startups**: Secondary activation targets with strong fit, planned for week two (Vuelo, Cruisebound, Decagon, Hostaway, Rove, RoomPriceGenie, BizTrip AI)
- **Tier C Startups**: Watch-list companies worth monitoring but lower immediate priority (Humoniq, Inn-Flow, Nappr, Kasa, and 13 others)
- **Existing Tier 1 Gap**: High-priority companies already in the YAML database (Mews 9.7, Canary Technologies 9.5, Actabl 9.3, Duetto 9.2) with zero outreach initiated
- **Category Imbalance**: 100% of current outreach targets OTA/TravelPlatform; GuestCX, PMS, DataAnalytics, and RevMgmt categories are completely untouched
- **Five-Day Follow-Up Rule**: Structured cadence requiring follow-ups on Mar 25 emails by Mar 30-31
- **MCP Tool Overlap**: Core positioning angle — prior work building searchHotels, getHotelRates, bookHotelOffer via NestJS and JSON-RPC over SSE maps directly to several Tier A company products
- **PhocusWire Hot 25 2026**: Credibility signal; prior employer (Kismet) appeared on this list, usable in outreach
- **PMS Integration Experience**: OHIP, Mews, asyncio parallelization, Redis caching — primary technical differentiator across multiple company pitches
- **YC Job Board Signals**: HostAI and Rove have active open roles listed; simultaneous application and LinkedIn outreach recommended

## Details

## Outreach Status as of March 26, 2026

### Big Travel (Emails Sent Mar 25)
- Expedia: 2 emails sent
- Airbnb: 5 emails sent
- Booking.com: 4 emails sent
- KAYAK: 3 emails sent
- Amadeus: 3 emails sent
- **Total sent: 17**

### Big Travel (Drafts Only — Not Sent)
- Sabre/Aven: 3 drafts ready

### Big Travel (Templates Written, No Contacts Found)
- Hopper, Travelport, Tripadvisor, Agoda

### Startups — Active Outreach
- Akia: 3 contacts reached
- LodgIQ: 2 contacts (CTO replied — not hiring)
- Hapi Cloud: 4 contacts reached
- Plusgrade: 3 contacts reached
- Stardrift: 3 contacts reached
- Mews/Rogers: call completed

### Startups — Pending
- Revinate: 4 contacts, awaiting acceptance

### Startups — Researched, Not Contacted
- Duve, HyperGuest, FLYR, Cendyn
- 22 additional companies in `drafts/travel_tech_startup_research_2026.md` — none in tracking system

---

## New Companies Research

### Tier A — Activate First

#### DirectBooker — #1 Priority Target
- **Category:** AI Hotel Distribution / LLM Integration
- **Funding:** ~$2M pre-seed (Baukunst)
- **Location:** USA (likely SF)
- **Notable Investors:** Stephen Kaufer (Tripadvisor co-founder), Richard Holden (ex-Google Travel)
- **What they do:** Feed hotel inventory to LLMs (ChatGPT, Gemini) via MCP, bypassing OTAs entirely
- **MCP tools they use:** searchHotels, getHotelRates, bookHotelOffer
- **Stage:** Pre-product — engineering team being built now
- **Key Contacts:** Sanjay Vakil (CEO), George Madrid (CTO), Theresa Meyer (CPO)
- **Pitch angle:** Built the same MCP tools at Kismet — NestJS, JSON-RPC over SSE. Near-identical product scope.
- **Sources:** PhocusWire Hot 25 2026, Skift

#### HostAI
- **Category:** AI Hospitality Operations
- **Funding:** YC W24 + additional; team ~4 people
- **Location:** San Francisco
- **Open roles:** Backend Engineer, Senior AI Engineer (live on YC board)
- **Key Contacts:** Amirali Mohajer (Co-founder, ex-Agoda Head of Product), Heeyoung Lee (Co-founder, Stanford NLP PhD, Google Assistant), DK Choe (Co-founder, Brown NLP PhD, Google Search)
- **What they do:** Automate guest messaging, phone calls, and task coordination via LLM agents
- **Pitch angle:** MCP tool-calling pipeline (GPT-4o/Gemini, >95% field coverage) and PMS integration experience (OHIP, Mews)
- **Sources:** PhocusWire Hot 25 2026, YC

#### Boom
- **Category:** AI-Native PMS
- **Funding:** $12.7M (Oct 2025), led by Avenue Growth Partners
- **Location:** Miami, FL
- **Key Contacts:** TBD — LinkedIn research needed
- **What they do:** AI-native property management system with agentic AI for autonomous hotel/STR operations
- **Pitch angle:** OHIP rate integration with PMS-first/Amadeus-fallback logic; parallelized PMS adapters with asyncio, Redis caching, AlloyDB persistence
- **Sources:** PhocusWire

#### Bonafide
- **Category:** Hotel Data / LLM Content Distribution
- **Funding:** Early stage; backed by IAG (British Airways parent), Plug and Play, Javelin Venture Partners; 18 employees
- **Location:** San Francisco
- **Key Contacts:** Founders not publicly named — LinkedIn research needed
- **What they do:** Agentic commerce platform aggregating, verifying, and distributing LLM-ready hotel content via MCP
- **Pitch angle:** Playwright + LLM pipeline at Kismet — GPT-4o/Gemini tool-calling for hotel data extraction, >95% field coverage, schema.org/JSON-LD parsing
- **Sources:** PhocusWire Hot 25 2026

#### Lobby
- **Category:** AI Group/B2B Hotel Booking
- **Funding:** $2.2M pre-seed from Founderful (founded 2025)
- **Location:** Zurich, Switzerland
- **Key Contacts:** Romy Abbrederis (Co-founder), Alex Mugrauer (Co-founder), Muhammad Abdullah (Co-founder)
- **What they do:** LLMs + rules + system integrations to interpret unstructured group booking requests, check availability, and apply negotiated rates
- **Pitch angle:** Experience across 7-8 booking engines (iHotelier, SynXis, Allora, AZDS); asyncio-based PMS adapter parallelization
- **Sources:** PhocusWire, HotelTechnologyNews

#### Riviera
- **Category:** AI Voice / Front Desk Automation
- **Funding:** $500K seed (YC W25)
- **Location:** TBD
- **Key Contacts:** Shaun Lane (Co-founder/CEO), Daniel Tyshler (Co-founder, technical), Sathvik Nori (Co-founder)
- **What they do:** Multilingual AI voice agents for hotel front-desk calls, room service, reservations, and guest inquiries
- **Pitch angle:** LLM tool-calling pipeline (GPT-4o/Gemini, >95% field coverage) and PMS integration; built MCP tools AI agents use to search and book hotels
- **Sources:** YC

---

### Tier B — Activate Week 2

#### Vuelo
- **Funding:** EUR 64M seed (Mar 2026) — one of largest European travel tech seed rounds
- **Location:** London, UK (US expansion late 2026)
- **Key Contacts:** Jasper Dykes (Co-founder/CEO), Edgars Kohs (Co-founder/CTO, ex-Fly Now Pay Later CTO)
- **What they do:** AI-native travel booking with embedded BNPL
- **Pitch angle:** Booking engine fragmentation (7-8 engines), Amadeus GDS integration, rate pipeline architecture

#### Cruisebound
- **Funding:** $25.7M total ($13M Series B, Sep 2024); backed by Thayer Ventures, Jeff Boyd (ex-Booking Holdings CEO), Steve Kaufer
- **Location:** NYC
- **Key Contacts:** Pierre-Olivier Lepage (CEO), Bjorn Larsen (Co-founder, Rocket Travel), Jay Hoffman (Co-founder, Rocket Travel)
- **What they do:** Modern cruise booking comparison (B2C and B2B)
- **Pitch angle:** Booking engine architecture, rate aggregation, distribution APIs

#### Decagon
- **Funding:** $481M total; $250M Series D (Jan 2026) at $4.5B valuation
- **Location:** San Francisco
- **Key Contacts:** Ashwin Sreenivas (Co-founder), Jesse Zhang (Co-founder); recruiter and EM for travel vertical needed
- **What they do:** Conversational AI for enterprise CX; travel vertical clients include Avis, Budget, Hertz, Away Travel, Kindred
- **Pitch angle:** LLM pipeline and tool-calling for travel CX automation; hospitality domain knowledge for vertical expansion

#### Hostaway
- **Funding:** $365M Series B (Dec 2024), PSG + General Atlantic; over $550M total; profitable
- **Location:** Remote-first, global
- **Open roles:** Engineering Manager - Integrations (EMEA), EM - Trust Accounting (Europe), QA Engineers
- **Key Contacts:** LinkedIn research needed for engineering leadership
- **What they do:** Market-leading vacation rental management platform with channel management across Airbnb, Booking.com, VRBO
- **Pitch angle:** Worked across 7-8 booking engines; asyncio PMS adapter architecture; channel management is direct experience

#### Rove
- **Funding:** $2M (YC W24 + General Catalyst, Soma Capital)
- **Location:** New York, NY
- **Open roles:** Founding Backend Engineer (live on YC Work at a Startup)
- **Key Contacts:** Max Morganroth (Co-founder/CEO, Wharton), Arhan Chhabra (Co-founder, Harvard CS + Econ)
- **What they do:** Universal airline mile platform redeemable across 140+ airlines and 200K+ hotels
- **Pitch angle:** Hotel rate integration, Amadeus GDS, booking system APIs; NYC location is a logistical match
- **Triple signal:** NYC + YC + active founding engineer post

#### RoomPriceGenie
- **Funding:** $75M (Feb 2025) from Five Elms Capital; 156 employees
- **Location:** Zug, Switzerland (remote-friendly)
- **Key Contacts:** Ari Andricopoulos (Founder/Chief Strategy Officer), Chas Scarantino (CEO)
- **What they do:** Automated dynamic pricing for independent hotels; 3,000+ clients in 65 countries; processes 1.7B+ rates
- **Pitch angle:** BigQuery data warehouse, time-series ML (LSTM, Transformer, XGBoost), PMS rate integration (OHIP, fallback logic)

#### BizTrip AI
- **Funding:** $2.5M total ($1.5M from Sabre + AI Fund/Andrew Ng's venture studio)
- **Location:** USA
- **Key Contacts:** Tom Romary (Co-founder/CEO, founded Yapta, acquired by Coupa), Scott Persinger (Co-founder/CTO)
- **What they do:** AI business travel assistant replacing fragmented corporate booking tools
- **Pitch angle:** MCP tool architecture (NestJS, JSON-RPC over SSE) for hotel search/rates/booking; Sabre/GDS integration experience

---

### Tier C — Watch List

| Company | Description | Key Contact | Notable Signal |
|---|---|---|---|
| Humoniq (YC S25) | AI-native BPO for travel, voice + text agents for airline/OTA support | Todd Sullivan (CEO), Will Weber (Co-founder) | $8M+, hiring Backend + AI Engineers |
| Inn-Flow | Hotel back-office automation | John Erhart (Founder/CEO) | $45M from Mainsail, hiring 20+ |
| Nappr | Hotel day-use marketplace, 1,000+ properties | Jared Lerner (Founder) | NYU MBA alumni angle |
| Kasa | Tech-enabled hotel brand/operator, 35+ cities | Jeff McConathy (VP Engineering, ex-Niantic) | — |
| Walkway | AI dynamic pricing for experience operators | Drew Patterson (Kayak founding team), Emmanuel Gautier (Head of Data) | — |
| GuestOS | AI concierge, 24/7 voice | Jessie Fischer (Founder) | Advisory: Rod Cuthbert (Viator founder) |
| Bookboost | AI hotel CRM | — | EUR 3.6M (Mar 2025), Malmo |
| Reeco | AI procure-to-pay for hotels | — | $25M total, $15M Series A (Jan 2025) |
| Virdee | Virtual reception / self-service check-in | — | $24.7M total, Austin |
| Inntelo AI | AI concierge (voice, chat, social) | Shahzain Badruddin (CTO, ex-M&S / Charlotte Tilbury) | 500K GBP pre-seed |
| HeyMax | Travel-fintech loyalty | Ke Wang (CTO, ex-Meta) | $11M Series A, Peak XV/Sequoia India |
| Wheelhouse | RevMgmt for vacation rentals | Kyle Larson (Co-founder/Software Architect) | $16M Series B (NEA) |
| Pointhound (YC S23) | Credit card points for flights | Jake Malone (Co-founder/CTO) | Repeat founders, prior $75M raise + exit |
| Blastness | Hotel booking engine + channel management | — | Best Hotel Reservations Software 2026, Milan |

---

## Existing Tier 1 Companies — Zero Outreach

These companies are already in `hospitality_companies_tier1.yaml` with high priority scores but have not been contacted.

| Company | Priority Score | Category | Location | Notes |
|---|---|---|---|---|
| Mews | 9.7 | PMS | Amsterdam | Rogers call done; no broader eng outreach |
| Canary Technologies | 9.5 | GuestCX | NYC | $80M Series D. Zero contact. |
| Actabl | 9.3 | DataAnalytics | NYC | Zero contact. |
| Duetto | 9.2 | RevMgmt | SF | Zero contact. |
| HiJiffy | 8.9 | GuestCX | Lisbon | Zero contact. |
| Cloudbeds | 8.7 | PMS | SF | $110M raised Apr 2025. Zero contact. |
| Lighthouse | 8.6 | RevMgmt | Denver | Zero contact. |
| IDeaS | 8.3 | RevMgmt | Minneapolis | Zero contact. |
| Duve | — | GuestCX | Tel Aviv | $60M Series B. In followups but not contacted. |
| HyperGuest | — | Distribution | Tel Aviv | $43M. In followups but not contacted. |
| FLYR | — | RevMgmt | SF | $225M+. In followups but not contacted. |
| Cendyn | — | CRM | Boca Raton | PE-backed. In followups but not contacted. |

**Critical finding:** The entire outreach pipeline is concentrated in OTA/TravelPlatform. GuestCX, PMS, DataAnalytics, and RevMgmt categories have zero outreach despite containing the highest priority scores in the database.

---

## Execution Plan

### Week of Mar 26-28
1. Send 3 Sabre/Aven email drafts
2. DM Leila Clark at Stardrift — she accepted connection Mar 26, message her now
3. Send LinkedIn connection notes to big travel contacts already emailed (secondary touchpoint)
4. DM Erik Tenden at Plusgrade — accepted connection

### Week of Mar 31 - Apr 4
1. Follow up on all Mar 25 emails (5-day rule: Mar 30-31)
2. Follow up with Buke Dogruoglu at Booking.com (back from OOO Mar 30, reach out Apr 1)
3. Activate all Tier A startups: LinkedIn connection notes to founders/CTOs; draft emails for those with discoverable addresses via Apollo
4. Activate top Tier 1 companies: Canary Technologies, Actabl, Duetto — research 5-6 contacts each, draft outreach
5. Apply to HostAI Backend Engineer and Rove Founding Backend Engineer via YC

### Week of Apr 7-11
1. Follow up on Tier A startup outreach
2. Activate all Tier B startups
3. Activate more Tier 1: Cloudbeds, HiJiffy, Lighthouse, FLYR
4. Hopper, Travelport, Tripadvisor: find 5 contacts each (recruiters + EMs + senior SWEs), begin outreach
5. Apply to Hostaway EM - Integrations role

### Week of Apr 14+
1. Follow up on Tier B
2. Activate Tier C as needed
3. Agoda outreach if US roles exist
4. Second follow-ups on anything from Week 1 with no response

---

## Key Notes for Next Session

- **Credibility anchor:** Kismet was on PhocusWire Hot 25 2026. Use this in all outreach: "I worked at a PhocusWire Hot 25 company."
- **SkyLink acquired by Amadeus (Feb 2026).** Option to reach out to the acquired team now inside Amadeus.
- **DirectBooker is pre-product.** No live product or hotel partnerships yet — engineering team is being built right now. Timing is optimal.
- **HostAI has live YC job posts.** Apply via YC AND do LinkedIn outreach in parallel.
- **Rove: NYC + YC + founding engineer post.** Three simultaneous positive signals.
- **Nappr founder Jared Lerner is NYU MBA.** Use alumni connection in outreach.
- Existing drafts in `drafts/big_travel_outreach_templates.md` cover Hopper, Travelport, Tripadvisor, and Agoda — use these as starting points.

## Related

- [[Hospitality Companies Tier 1 YAML]]
- [[Travel Tech Startup Research 2026]]
- [[LinkedIn Followups Tracking]]
- [[Big Travel Outreach Templates]]
- [[Hospitality Positioning by Category]]
- [[MCP Tool Architecture — NestJS JSON-RPC SSE]]
- [[PMS Integration — OHIP and Mews]]
- [[PhocusWire Hot 25 2026]]
- [[Kismet — Prior Employer]]
- [[YC Work at a Startup Job Board]]
- [[Amadeus GDS Integration]]
- [[Booking Engine Fragmentation Research]]
- [[DirectBooker]]
- [[HostAI]]
- [[Canary Technologies]]
- [[Mews PMS]]
- [[Duetto]]
- [[Actabl]]
- [[FLYR]]
- [[Cloudbeds]]
