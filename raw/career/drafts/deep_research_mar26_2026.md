---
status: processed
source_type: career-datacenter
ingested_at: 2026-04-09T21:35:00.000Z
parsed_at: 2026-04-09T21:35:00.000Z
compiled_to: "[[Travel & Hospitality Tech Startup Outreach — March 2026 Research Dump]]"
processed_at: 2026-04-10T02:02:32.974Z
retry_count: 0
last_error: null
compile_progress: null
---








# Deep Research Dump — March 26, 2026

All research from multi-agent deep dive on travel/hospitality startups, PhocusWire Hot 25, YC companies, and LinkedIn outreach targets. Ready to activate in next session.

---

## CURRENT STATE SUMMARY

### What's Been Contacted (as of Mar 26)
- **Big Travel (emails sent Mar 25):** Expedia (2), Airbnb (5), Booking.com (4), KAYAK (3), Amadeus (3) = 17 emails sent
- **Big Travel (drafts only):** Sabre/Aven (3 drafts, not sent yet)
- **Big Travel (templates written, NO contacts):** Hopper, Travelport, Tripadvisor, Agoda
- **Startups contacted:** Akia (3), LodgIQ (2, CTO replied - not hiring), Hapi Cloud (4), Plusgrade (3), Stardrift (3), Mews/Rogers (call done)
- **Startups awaiting acceptance:** Revinate (4)
- **Startups researched, NOT contacted:** Duve, HyperGuest, FLYR, Cendyn
- **New startups researched, NOT activated:** 22 companies in `drafts/travel_tech_startup_research_2026.md` — NONE in tracking

### Category Imbalance
100% of recent outreach is OTA_TravelPlatform. These categories are completely untouched:
- GuestCX (Canary Technologies 9.5, HiJiffy 8.9, etc.)
- PMS (Mews 9.7 — highest priority in entire database)
- DataAnalytics (Actabl 9.3)
- RevMgmt (Duetto 9.2, Lighthouse 8.6)

### Follow-Up Schedule
- Mar 30-31: Follow up on all Mar 25 emails (5-day rule)
- Buke Dogruoglu (Booking.com): OOO until Mar 30, follow up Apr 1
- Stardrift/Leila Clark: Accepted connection Mar 26, DM her NOW

---

## NEW COMPANIES TO ADD (Not in tier1 YAML yet)

### TIER A — Activate First (perfect skill match + hiring)

#### 1. DirectBooker — #1 TARGET
- **What:** AI-powered platform feeding hotel inventory to LLMs (ChatGPT, Gemini) via MCP, bypassing OTAs
- **Funding:** ~$2M pre-seed from Baukunst
- **Location:** USA (likely SF)
- **Investors:** Stephen Kaufer (Tripadvisor co-founder/former CEO), Richard Holden (ex-Google Travel head)
- **Why #1:** They are LITERALLY building what Rahil built at Kismet. MCP tools (searchHotels, getHotelRates, bookHotelOffer) for hotel distribution to LLMs. Near-perfect overlap.
- **Contacts:**
  - **Sanjay Vakil** — CEO (former Rocket Travel team, acquired by Booking Holdings 2015)
  - **George Madrid** — CTO (key technical decision maker)
  - **Theresa Meyer** — CPO
- **Angle:** "I built MCP tools at Kismet for hotel search, rates, and booking — searchHotels, getHotelRates, bookHotelOffer via NestJS and JSON-RPC over SSE. That's your core product."
- **Source:** PhocusWire Hot 25 2026, Skift

#### 2. HostAI — Active YC Job Posts
- **What:** AI operations platform for hospitality. Automates guest messaging, phone calls, task coordination via LLM agents
- **Funding:** YC W24 + additional (small team ~4 people)
- **Location:** San Francisco
- **Open roles:** Backend Engineer, Senior AI Engineer (listed on YC job board RIGHT NOW)
- **Contacts:**
  - **Amirali Mohajer** — Co-founder (scaled OTA from 50 to 10K bookings, ex-Agoda Head of Product for Supply Monetization)
  - **Heeyoung Lee** — Co-founder (Stanford NLP PhD, Google Assistant, Gmail Smart Compose)
  - **DK Choe** — Co-founder (Brown NLP PhD, Google Search)
- **Angle:** "MCP tool-calling pipeline (GPT-4o/Gemini, >95% field coverage) and PMS integration experience (OHIP, Mews). You need someone who can build agentic systems that talk to real hospitality backends."
- **Source:** PhocusWire Hot 25 2026, YC

#### 3. Boom — AI-Native PMS
- **What:** AI-native property management system for hotels and STRs with agentic AI for autonomous operations
- **Funding:** $12.7M (Oct 2025), led by Avenue Growth Partners
- **Location:** Miami, FL
- **Contacts:** TBD — need LinkedIn research for founders/CTO
- **Angle:** "Built OHIP rate integration with PMS-first / Amadeus-fallback logic. Parallelized PMS adapters with asyncio, Redis caching, AlloyDB persistence. I've built the PMS internals you're trying to replace."
- **Source:** PhocusWire

#### 4. Bonafide — Hotel Data for LLMs
- **What:** Agentic commerce platform helping travel brands aggregate, verify, and distribute LLM-ready content through MCP
- **Funding:** Early stage. Backed by IAG (British Airways parent), Plug and Play, Javelin Venture Partners. 18 employees.
- **Location:** San Francisco
- **Contacts:** Founders not publicly named — need LinkedIn research
- **Angle:** "Playwright + LLM pipeline at Kismet: GPT-4o/Gemini tool-calling for hotel data extraction, >95% field coverage, schema.org/JSON-LD parsing. That's your exact problem — making hotel content consumable by AI."
- **Source:** PhocusWire Hot 25 2026

#### 5. Lobby — LLM Group Booking
- **What:** AI platform automating group/B2B hotel bookings. LLMs + rules + system integrations to interpret unstructured requests, check availability, apply negotiated rates
- **Funding:** $2.2M pre-seed from Founderful (founded 2025)
- **Location:** Zurich, Switzerland
- **Contacts:**
  - **Romy Abbrederis** — Co-founder
  - **Alex Mugrauer** — Co-founder
  - **Muhammad Abdullah** — Co-founder
- **Angle:** "Booking engine fragmentation — I've worked across 7-8 engines (iHotelier, SynXis, Allora, AZDS). PMS adapter parallelization with asyncio. OHIP rate integration with fallback logic."
- **Source:** PhocusWire, HotelTechnologyNews

#### 6. Riviera — AI Voice for Hotels (YC W25)
- **What:** Multilingual AI voice agents for front-desk calls, room service, reservations, guest inquiries
- **Funding:** $500K seed (YC W25)
- **Location:** TBD
- **Contacts:**
  - **Shaun Lane** — Co-founder/CEO (former travel YouTuber, UC Berkeley)
  - **Daniel Tyshler** — Co-founder (technical)
  - **Sathvik Nori** — Co-founder
- **Angle:** "LLM tool-calling pipeline (GPT-4o/Gemini, >95% field coverage) and PMS integration for hotel operations. Built MCP tools that AI agents use to search/book hotels."
- **Source:** YC

### TIER B — Activate Week 2

#### 7. Vuelo — EUR 64M Seed, AI Booking + BNPL
- **What:** AI-native travel booking with embedded buy-now-pay-later
- **Funding:** EUR 64M seed (Mar 2026) — one of largest seed rounds in European travel tech
- **Location:** London, UK (expanding to US late 2026)
- **Contacts:**
  - **Jasper Dykes** — Co-founder/CEO
  - **Edgars Kohs** — Co-founder/CTO (former CTO at Fly Now Pay Later)
- **Angle:** Booking engine fragmentation (7-8 engines), Amadeus GDS integration, rate pipeline architecture
- **Source:** EU-Startups

#### 8. Cruisebound — NYC, Series B
- **What:** Modern cruise booking comparison platform (B2C and B2B)
- **Funding:** $25.7M total ($13M Series B, Sep 2024). Backed by Thayer Ventures, Jeff Boyd (ex-Booking Holdings CEO), Steve Kaufer
- **Location:** NYC (228 Park Ave South)
- **Contacts:**
  - **Pierre-Olivier Lepage** — CEO
  - **Bjorn Larsen** — Co-founder (Rocket Travel co-founder)
  - **Jay Hoffman** — Co-founder (Rocket Travel co-founder)
- **Angle:** Booking engine architecture, rate aggregation, distribution APIs. NYC location is a plus.
- **Source:** PhocusWire Hot 25 2026

#### 9. Decagon — $4.5B AI CX Platform (Travel Vertical)
- **What:** Conversational AI for enterprise CX. Travel vertical: Avis, Budget, Hertz, Away Travel, Kindred
- **Funding:** $481M total. $250M Series D (Jan 2026) at $4.5B valuation
- **Location:** San Francisco
- **Contacts:**
  - **Ashwin Sreenivas** — Co-founder
  - **Jesse Zhang** — Co-founder
  - Need: recruiter + engineering manager for travel vertical
- **Angle:** LLM pipeline and tool-calling for travel CX automation. Hospitality domain knowledge for their vertical expansion.
- **Source:** Decagon

#### 10. Hostaway — $365M, Hiring EM for Integrations
- **What:** Market-leading vacation rental management platform. Channel management across Airbnb, Booking.com, VRBO
- **Funding:** $365M Series B (Dec 2024), PSG + General Atlantic. Over $550M total. Profitable.
- **Location:** Remote-first, global
- **Open roles:** Engineering Manager - Integrations (EMEA), EM - Trust Accounting (Europe), QA Engineers
- **Contacts:** Need LinkedIn research for engineering leadership
- **Angle:** "Worked across 7-8 booking engines at Kismet. PMS adapter architecture with asyncio parallelization. Channel management is literally what I've built."
- **Source:** Hostaway careers

#### 11. Rove — YC W24, NYC, Founding Backend Engineer
- **What:** Universal airline mile redeemable across 140+ airlines and 200K+ hotels
- **Funding:** $2M (YC W24 + General Catalyst, Soma Capital)
- **Location:** New York, NY
- **Open roles:** Founding Backend Engineer (listed on YC Work at a Startup)
- **Contacts:**
  - **Max Morganroth** — Co-founder/CEO (Wharton)
  - **Arhan Chhabra** — Co-founder (Harvard CS + Econ)
- **Angle:** Hotel rate integration, Amadeus GDS, booking system APIs. NYC + YC + active job post.
- **Source:** TechCrunch, YC

#### 12. RoomPriceGenie — $75M, Revenue Management
- **What:** Automated dynamic pricing for independent hotels. 3,000+ clients in 65 countries.
- **Funding:** $75M (Feb 2025) from Five Elms Capital
- **Location:** Zug, Switzerland (remote-friendly, 156 employees)
- **Contacts:**
  - **Ari Andricopoulos** — Founder/Chief Strategy Officer
  - **Chas Scarantino** — New CEO
- **Angle:** BigQuery data warehouse, time-series ML (LSTM, Transformer, XGBoost), PMS rate integration (OHIP, fallback logic). They process 1.7B+ rates.
- **Source:** PhocusWire

#### 13. BizTrip AI — Backed by Andrew Ng
- **What:** AI business travel assistant replacing fragmented corporate booking tools
- **Funding:** $2.5M total ($1.5M from Sabre + AI Fund/Andrew Ng's venture studio)
- **Location:** USA
- **Contacts:**
  - **Tom Romary** — Co-founder/CEO (founder of Yapta, acquired by Coupa)
  - **Scott Persinger** — Co-founder/CTO (agentic AI innovator, key technical contact)
- **Angle:** MCP tool architecture (NestJS, JSON-RPC over SSE) for hotel search/rates/booking. Sabre/GDS integration experience. Agentic booking pipeline.
- **Source:** PhocusWire Hot 25 2026

### TIER C — Worth Watching

#### 14. Humoniq (YC S25)
- AI-native BPO for travel. Voice + text AI agents for airline/OTA customer support.
- **Funding:** $8M+. **Contacts:** Todd Sullivan (CEO), Will Weber (Co-founder). Both ex-Flightfox (YC S12).
- Actively hiring Senior Backend Engineer + AI Engineers on YC.

#### 15. Inn-Flow
- Hotel back-office automation. $45M from Mainsail Partners. Cary, NC.
- **Contact:** John Erhart (Founder/CEO). Hiring 20+ employees.

#### 16. Nappr
- Hotel day-use marketplace. 1,000+ properties (Marriott, Hilton, Hyatt). NYC-based.
- **Contact:** Jared Lerner (Founder, NYU MBA grad — alumni connection).

#### 17. Kasa
- Tech-enabled hotel brand/operator. 35+ cities.
- **Contact:** Jeff McConathy (VP Engineering, ex-Niantic).

#### 18. Walkway
- AI growth platform for experience/attraction operators. Dynamic pricing + demand forecasting.
- **Contact:** Drew Patterson (Co-founder, part of Kayak founding team), Emmanuel Gautier (Co-founder/Head of Data).

#### 19. GuestOS
- AI concierge for hotels. 24/7 voice support.
- **Contact:** Jessie Fischer (Founder). Advisory board: Rod Cuthbert (Viator founder).

#### 20. Bookboost
- AI-powered hotel CRM. EUR 3.6M (Mar 2025). Malmo, Sweden.

#### 21. Reeco
- AI procure-to-pay for hotels. $25M total ($15M Series A, Jan 2025). Miami.

#### 22. Virdee
- Virtual reception / self-service check-in. $24.7M total. Austin, TX.

#### 23. Inntelo AI
- AI concierge for hotels (voice, chat, social). Pre-seed 500K GBP. London.
- **Contact:** Shahzain Badruddin (CTO, ex-Marks & Spencer / Charlotte Tilbury engineering).

#### 24. HeyMax
- Travel-fintech loyalty platform. $11M Series A (Peak XV/Sequoia India). Singapore.
- **Contact:** Ke Wang (CTO, ex-Meta).

#### 25. Wheelhouse
- Revenue management for vacation rentals. $16M Series B (NEA).
- **Contact:** Kyle Larson (Co-founder/Software Architect).

#### 26. Pointhound (YC S23)
- Credit card points for flights. Repeat YC founders (previously raised $75M, exited).
- **Contact:** Jake Malone (Co-founder/CTO).

#### 27. Blastness
- Hotel booking engine + channel management. Won Best Hotel Reservations Software 2026. Milan.

---

## EXISTING TIER 1 COMPANIES — STILL NOT CONTACTED

These are already in `hospitality_companies_tier1.yaml` with high priority scores but have zero outreach:

| Company | Priority | Category | Location | Status |
|---------|----------|----------|----------|--------|
| **Mews** | 9.7 | PMS | Amsterdam | Rogers call done, but no broader outreach to other eng contacts |
| **Canary Technologies** | 9.5 | GuestCX | NYC | $80M Series D. Zero contact. |
| **Actabl** | 9.3 | DataAnalytics | NYC | Zero contact. |
| **Duetto** | 9.2 | RevMgmt | SF | Zero contact. |
| **Cloudbeds** | 8.7 | PMS | SF | $110M Apr 2025 raise. Zero contact. |
| **HiJiffy** | 8.9 | GuestCX | Lisbon | Zero contact. |
| **IDeaS** | 8.3 | RevMgmt | Minneapolis | Zero contact. |
| **Lighthouse** | 8.6 | RevMgmt | Denver | Zero contact. |
| **Duve** | — | GuestCX | Tel Aviv | $60M Series B. In linkedin_followups but not contacted. |
| **HyperGuest** | — | Distribution | Tel Aviv | $43M. In linkedin_followups but not contacted. |
| **FLYR** | — | RevMgmt | SF | $225M+. In linkedin_followups but not contacted. |
| **Cendyn** | — | CRM | Boca Raton | PE-backed. In linkedin_followups but not contacted. |

---

## EXECUTION PLAN

### This Week (Mar 26-28)
1. Send the 3 Sabre/Aven email drafts
2. DM Leila Clark at Stardrift (she accepted connection Mar 26)
3. Send LinkedIn connection notes to big travel company contacts (already emailed, need LinkedIn touchpoint)
4. Erik Tenden at Plusgrade accepted — DM him

### Week of Mar 31 - Apr 4
1. Follow up on ALL Mar 25 emails (5-day rule hits Mar 30-31)
2. Follow up with Buke Dogruoglu at Booking.com (back from OOO Mar 30)
3. **ACTIVATE TIER A STARTUPS:** DirectBooker, HostAI, Boom, Bonafide, Lobby, Riviera
   - LinkedIn connection notes to all founders/CTOs
   - Draft emails for those with discoverable addresses (Apollo)
4. **ACTIVATE TOP TIER 1:** Canary Technologies, Actabl, Duetto
   - Research contacts (5-6 each), draft outreach
5. Apply to HostAI Backend Engineer and Rove Founding Backend Engineer on YC

### Week of Apr 7-11
1. Follow up on Tier A startup outreach
2. **ACTIVATE TIER B:** Vuelo, Cruisebound, Decagon, Hostaway, Rove, RoomPriceGenie, BizTrip AI
3. **ACTIVATE MORE TIER 1:** Cloudbeds, HiJiffy, Lighthouse, FLYR
4. Hopper, Travelport, Tripadvisor — find 5 contacts each, begin outreach
5. Apply to Hostaway EM - Integrations role

### Week of Apr 14+
1. Follow up on Tier B
2. Activate Tier C as needed
3. Agoda (if US roles exist)
4. Second follow-ups on anything from Week 1 with no response

---

## NOTES FOR NEXT SESSION

- **Kismet was on PhocusWire Hot 25 2026.** Use this for credibility: "I worked at a PhocusWire Hot 25 company."
- **SkyLink was acquired by Amadeus (Feb 2026).** Could reach out to acquired team within Amadeus.
- **DirectBooker is pre-product.** No live product or hotel partnerships yet. This means they're building the engineering team NOW. Perfect timing.
- **HostAI has live job posts on YC.** Apply AND do LinkedIn outreach simultaneously.
- **Rove is NYC + YC + active founding engineer post.** Triple signal.
- **Nappr founder is NYU MBA.** Alumni angle.
- Existing drafts in `drafts/big_travel_outreach_templates.md` have templates for Hopper, Travelport, Tripadvisor, Agoda — use these.

---

## PROMPT FOR NEXT SESSION

```
I'm continuing a deep outreach expansion for hospitality/travel tech companies.
Read these files first:
1. drafts/deep_research_mar26_2026.md (full research dump with 27 new companies)
2. drafts/travel_tech_startup_research_2026.md (earlier research, 22 companies)
3. tracking/linkedin_followups.md (current outreach state)
4. data/hospitality_companies_tier1.yaml (company database)
5. data/hospitality_positioning.yaml (positioning angles by category)

Then execute:
1. Add all Tier A + Tier B companies (13 total) to hospitality_companies_tier1.yaml
2. For each new company, research 2-3 LinkedIn contacts (founders/CTOs for startups). Use web search.
3. Draft LinkedIn connection notes (300 char max) for every contact, using category-specific angles from hospitality_positioning.yaml
4. Add everything to tracking/linkedin_followups.md with explicit next steps and deadlines
5. Also draft connection notes for the existing untouched companies: Canary Technologies, Actabl, Duetto, Cloudbeds, Duve, HyperGuest, FLYR, Cendyn
6. For Hopper, Travelport, Tripadvisor: find 5 contacts each (recruiters + EMs + senior SWEs) and draft LinkedIn notes
7. Apply to HostAI (Backend Engineer) and Rove (Founding Backend Engineer) via YC links

Writing rules: No em dashes, no corporate filler, short paragraphs, specific over generic, numbers over adjectives. Connection notes must sound like a real person, not a template.
```
