---
title: Travel Tech Startup Outreach Campaign — March 2026 Research Dump
author: ai
created_at: 2026-04-10T02:02:29.761Z
last_ai_edit: 2026-04-10T02:02:29.761Z
last_human_edit: null
last_embedded_hash: d1f3b94584bf5c53
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/career/drafts/deep_research_mar26_2026.md]]"
tags:
  - travel-tech
  - hospitality
  - job-search
  - outreach
  - startups
  - ai
  - mcp
  - pms
  - ota
  - revenue-management
  - guest-cx
  - llm
  - yc
  - series-b
  - booking-engine
  - agentic-ai
  - linkedin
  - phocuswire
  - sabre
  - amadeus
---


# Travel Tech Startup Outreach Campaign — March 2026 Research Dump

A comprehensive multi-agent research dump compiled on March 26, 2026, cataloging 27 new travel and hospitality tech companies across AI booking, PMS, guest CX, and revenue management verticals. The document tracks current outreach state, identifies category gaps in existing outreach, and maps a tiered activation plan for LinkedIn and email campaigns. It is designed to resume in a subsequent session with explicit file references, execution steps, and prompt instructions.

## Key Concepts

- **Tier A Startups**: Highest-priority targets with perfect skill match and active hiring (DirectBooker, HostAI, Boom, Bonafide, Lobby, Riviera)
- **Tier B Startups**: Secondary activation targets for week 2 (Vuelo, Cruisebound, Decagon, Hostaway, Rove, RoomPriceGenie, BizTrip AI)
- **Tier C Startups**: Watch-list companies worth monitoring (Humoniq, Inn-Flow, Nappr, Kasa, Walkway, GuestOS, and 8 others)
- **Category Imbalance**: Current outreach is 100% OTA/TravelPlatform; GuestCX, PMS, DataAnalytics, and RevMgmt are completely untouched
- **MCP Tools**: Model Context Protocol tools (searchHotels, getHotelRates, bookHotelOffer) built at Kismet, used as the core technical angle for AI-native hotel distribution companies
- **Existing Tier 1 Gap**: 12 high-priority companies already in the YAML database with zero outreach (Mews 9.7, Canary Technologies 9.5, Actabl 9.3, Duetto 9.2, Cloudbeds 8.7, HiJiffy 8.9, IDeaS 8.3, Lighthouse 8.6, Duve, HyperGuest, FLYR, Cendyn)
- **5-Day Follow-Up Rule**: Standard cadence triggering follow-ups on March 30-31 for all March 25 emails
- **PhocusWire Hot 25 2026**: Industry credibility signal; Kismet was listed, used as a positioning hook
- **PMS Adapter Architecture**: Parallelized asyncio adapters with Redis caching, AlloyDB persistence, OHIP rate integration with Amadeus fallback — core technical positioning angle
- **Positioning Angles by Category**: Each company category (PMS, GuestCX, RevMgmt, Distribution, AI Booking) has tailored outreach framing drawn from hospitality_positioning.yaml

## Details

## Outreach State as of March 26, 2026

### Emails Sent
- Expedia (2), Airbnb (5), Booking.com (4), KAYAK (3), Amadeus (3) = 17 emails sent March 25
- Sabre/Aven: 3 drafts written, not yet sent
- Hopper, Travelport, Tripadvisor, Agoda: templates written, no contacts found yet

### Startup Outreach Status
- **Contacted:** Akia (3), LodgIQ (2 — CTO replied, not hiring), Hapi Cloud (4), Plusgrade (3), Stardrift (3)
- **Call completed:** Mews/Rogers
- **Awaiting connection acceptance:** Revinate (4)
- **Researched, not contacted:** Duve, HyperGuest, FLYR, Cendyn
- **New research complete, not activated:** 22 companies in drafts/travel_tech_startup_research_2026.md

### Immediate Actions (March 26)
- DM Leila Clark at Stardrift — accepted connection March 26
- DM Erik Tenden at Plusgrade — accepted connection
- Send Sabre/Aven drafts

---

## Tier A Companies — Activate First

### 1. DirectBooker — #1 Priority
- **What:** AI platform feeding hotel inventory to LLMs (ChatGPT, Gemini) via MCP, bypassing OTAs
- **Funding:** ~$2M pre-seed from Baukunst
- **Location:** USA (likely SF)
- **Stage:** Pre-product, building engineering team now
- **Investors:** Stephen Kaufer (Tripadvisor co-founder), Richard Holden (ex-Google Travel head)
- **Contacts:** Sanjay Vakil (CEO), George Madrid (CTO), Theresa Meyer (CPO)
- **Angle:** Built identical MCP tools at Kismet — searchHotels, getHotelRates, bookHotelOffer via NestJS and JSON-RPC over SSE
- **Source:** PhocusWire Hot 25 2026, Skift

### 2. HostAI
- **What:** AI operations platform automating guest messaging, phone calls, and task coordination via LLM agents
- **Funding:** YC W24, small team (~4 people)
- **Location:** San Francisco
- **Open Roles:** Backend Engineer, Senior AI Engineer (live on YC job board)
- **Contacts:** Amirali Mohajer (Co-founder, ex-Agoda Head of Product), Heeyoung Lee (Co-founder, Stanford NLP PhD, Google Assistant), DK Choe (Co-founder, Brown NLP PhD, Google Search)
- **Angle:** MCP tool-calling pipeline (GPT-4o/Gemini, >95% field coverage), PMS integration (OHIP, Mews)
- **Action:** Apply via YC AND send LinkedIn outreach simultaneously

### 3. Boom
- **What:** AI-native PMS for hotels and STRs with agentic autonomous operations
- **Funding:** $12.7M (Oct 2025), led by Avenue Growth Partners
- **Location:** Miami, FL
- **Contacts:** TBD — LinkedIn research needed for founders/CTO
- **Angle:** OHIP rate integration with PMS-first/Amadeus-fallback logic, asyncio parallelization, Redis caching, AlloyDB

### 4. Bonafide
- **What:** Agentic commerce platform aggregating, verifying, and distributing LLM-ready hotel content via MCP
- **Funding:** Early stage. Backed by IAG (British Airways parent), Plug and Play, Javelin Venture Partners. 18 employees.
- **Location:** San Francisco
- **Contacts:** Founders not publicly named — LinkedIn research needed
- **Angle:** Playwright + LLM pipeline at Kismet: GPT-4o/Gemini tool-calling for hotel data extraction, >95% field coverage, schema.org/JSON-LD parsing

### 5. Lobby
- **What:** AI platform automating group and B2B hotel bookings using LLMs, rules, and system integrations
- **Funding:** $2.2M pre-seed from Founderful (founded 2025)
- **Location:** Zurich, Switzerland
- **Contacts:** Romy Abbrederis, Alex Mugrauer, Muhammad Abdullah (all co-founders)
- **Angle:** Experience across 7-8 booking engines (iHotelier, SynXis, Allora, AZDS); asyncio parallelization for PMS adapters

### 6. Riviera (YC W25)
- **What:** Multilingual AI voice agents for hotel front-desk calls, room service, reservations, and guest inquiries
- **Funding:** $500K seed (YC W25)
- **Contacts:** Shaun Lane (CEO), Daniel Tyshler (technical co-founder), Sathvik Nori (co-founder)
- **Angle:** LLM tool-calling pipeline (GPT-4o/Gemini), PMS integration, MCP tools for hotel search and booking

---

## Tier B Companies — Activate Week 2

### 7. Vuelo
- **What:** AI-native travel booking with embedded buy-now-pay-later
- **Funding:** EUR 64M seed (March 2026) — one of largest seed rounds in European travel tech
- **Location:** London, UK (US expansion late 2026)
- **Contacts:** Jasper Dykes (CEO), Edgars Kohs (CTO, ex-Fly Now Pay Later)

### 8. Cruisebound
- **What:** Modern cruise booking comparison platform (B2C and B2B)
- **Funding:** $25.7M total ($13M Series B, Sep 2024). Backed by Thayer Ventures, Jeff Boyd (ex-Booking Holdings CEO), Steve Kaufer
- **Location:** NYC (228 Park Ave South)
- **Contacts:** Pierre-Olivier Lepage (CEO), Bjorn Larsen (co-founder), Jay Hoffman (co-founder)

### 9. Decagon
- **What:** Conversational AI for enterprise CX with a travel vertical (Avis, Budget, Hertz, Away Travel, Kindred)
- **Funding:** $481M total; $250M Series D (Jan 2026) at $4.5B valuation
- **Location:** San Francisco
- **Contacts:** Ashwin Sreenivas (co-founder), Jesse Zhang (co-founder); recruiter/EM for travel vertical needed

### 10. Hostaway
- **What:** Vacation rental management platform with channel management across Airbnb, Booking.com, VRBO
- **Funding:** $365M Series B (Dec 2024), PSG + General Atlantic; $550M+ total; profitable
- **Location:** Remote-first, global
- **Open Roles:** Engineering Manager - Integrations (EMEA), EM - Trust Accounting (Europe), QA Engineers
- **Angle:** Worked across 7-8 booking engines; asyncio PMS adapter architecture

### 11. Rove (YC W24)
- **What:** Universal airline mile redemption across 140+ airlines and 200K+ hotels
- **Funding:** $2M (YC W24 + General Catalyst, Soma Capital)
- **Location:** New York, NY
- **Open Roles:** Founding Backend Engineer (live on YC Work at a Startup)
- **Contacts:** Max Morganroth (CEO), Arhan Chhabra (co-founder)
- **Signal:** NYC + YC + active founding engineer post = triple signal

### 12. RoomPriceGenie
- **What:** Automated dynamic pricing for independent hotels; 3,000+ clients in 65 countries
- **Funding:** $75M (Feb 2025) from Five Elms Capital
- **Location:** Zug, Switzerland (remote-friendly, 156 employees)
- **Contacts:** Ari Andricopoulos (Founder/CSO), Chas Scarantino (CEO)
- **Angle:** BigQuery data warehouse, LSTM/Transformer/XGBoost for time-series ML, OHIP rate integration; they process 1.7B+ rates

### 13. BizTrip AI
- **What:** AI business travel assistant replacing fragmented corporate booking tools
- **Funding:** $2.5M total ($1.5M from Sabre + AI Fund/Andrew Ng's venture studio)
- **Contacts:** Tom Romary (CEO, founder of Yapta, acquired by Coupa), Scott Persinger (CTO)
- **Angle:** MCP tool architecture (NestJS, JSON-RPC over SSE), Sabre/GDS integration, agentic booking pipeline

---

## Existing Tier 1 — Zero Outreach (High Priority)

| Company | Priority Score | Category | Location |
|---|---|---|---|
| Mews | 9.7 | PMS | Amsterdam |
| Canary Technologies | 9.5 | GuestCX | NYC |
| Actabl | 9.3 | DataAnalytics | NYC |
| Duetto | 9.2 | RevMgmt | SF |
| HiJiffy | 8.9 | GuestCX | Lisbon |
| Cloudbeds | 8.7 | PMS | SF |
| Lighthouse | 8.6 | RevMgmt | Denver |
| IDeaS | 8.3 | RevMgmt | Minneapolis |
| Duve | — | GuestCX | Tel Aviv |
| HyperGuest | — | Distribution | Tel Aviv |
| FLYR | — | RevMgmt | SF |
| Cendyn | — | CRM | Boca Raton |

Note: Canary Technologies raised $80M Series D. Cloudbeds raised $110M in April 2025. FLYR has raised $225M+. Duve raised $60M Series B. HyperGuest raised $43M.

---

## Weekly Execution Plan

### March 26-28
1. Send 3 Sabre/Aven email drafts
2. DM Leila Clark at Stardrift
3. Send LinkedIn connection notes to big travel contacts already emailed
4. DM Erik Tenden at Plusgrade

### March 31 - April 4
1. Follow up on all March 25 emails (5-day rule)
2. Follow up with Buke Dogruoglu at Booking.com (back from OOO March 30)
3. Activate all 6 Tier A startups: LinkedIn connection notes + email drafts via Apollo
4. Activate Canary Technologies, Actabl, Duetto: 5-6 contacts each
5. Apply to HostAI Backend Engineer and Rove Founding Backend Engineer via YC

### April 7-11
1. Follow up on Tier A outreach
2. Activate all 7 Tier B companies
3. Activate Cloudbeds, HiJiffy, Lighthouse, FLYR
4. Find 5 contacts each for Hopper, Travelport, Tripadvisor; draft LinkedIn notes
5. Apply to Hostaway EM - Integrations role

### April 14+
1. Follow up on Tier B
2. Activate Tier C as needed
3. Agoda (if US roles exist)
4. Second follow-ups on week 1 non-responses

---

## Key Positioning Notes

- **PhocusWire credibility:** Kismet was on PhocusWire Hot 25 2026. Use: "I worked at a PhocusWire Hot 25 company."
- **SkyLink acquisition:** Acquired by Amadeus in February 2026. Potential warm outreach to acquired team within Amadeus.
- **DirectBooker timing:** Pre-product, no live hotel partnerships. Engineering team is being built right now.
- **Nappr alumni angle:** Founder Jared Lerner is an NYU MBA grad — use alumni connection.
- **Existing templates:** drafts/big_travel_outreach_templates.md has Hopper, Travelport, Tripadvisor, Agoda templates ready to use.

## Related

- [[Kismet — PhocusWire Hot 25 2026]]
- [[MCP Tool Architecture — NestJS JSON-RPC SSE]]
- [[OHIP Rate Integration and PMS Adapter Design]]
- [[Amadeus GDS Integration]]
- [[DirectBooker — AI Hotel Distribution via LLMs]]
- [[HostAI — Hospitality Agentic Operations]]
- [[Mews PMS]]
- [[Canary Technologies — GuestCX]]
- [[Duetto — Revenue Management]]
- [[YC Work at a Startup — Travel Roles]]
- [[PhocusWire Hot 25 2026]]
- [[LinkedIn Outreach Tracking]]
- [[hospitality_companies_tier1.yaml]]
- [[hospitality_positioning.yaml]]
- [[travel_tech_startup_research_2026.md]]
