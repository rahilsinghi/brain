---
title: Travel Tech Startup Landscape (March 2026) — Hiring & Growth Research
author: ai
created_at: 2026-04-10T02:05:43.201Z
last_ai_edit: 2026-04-10T02:05:43.201Z
last_human_edit: null
last_embedded_hash: f9358fa09a05d102
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/career/drafts/travel_tech_startup_research_2026.md]]"
tags:
  - travel-tech
  - hospitality
  - startups
  - hiring
  - llm
  - mcp
  - pms-integrations
  - booking-engines
  - ai-agents
  - gds
  - amadeus
  - data-engineering
  - job-search
  - "2026"
  - phocuswire-hot-25
  - direct-booking
  - vacation-rental
  - revenue-management
  - loyalty-fintech
  - customer-experience
---


# Travel Tech Startup Landscape (March 2026) — Hiring & Growth Research

A comprehensive research compilation of travel tech and hospitality startups actively hiring or rapidly growing as of March 2026, filtered for relevance to candidates with PMS integration, booking engine, AI/LLM pipeline, Amadeus GDS, and data engineering experience. Companies are tiered by skill overlap and hiring signal, with priority outreach targets identified. The research spans 22 companies across hotel tech, vacation rental, cruise, loyalty fintech, and AI customer experience verticals.

## Key Concepts

- **Model Context Protocol (MCP):** Emerging standard for feeding structured hotel/travel data into LLMs like ChatGPT and Gemini; central to Tier 1 companies DirectBooker and Bonafide
- **PMS Integrations:** Property Management System connectivity is a core differentiator across hotel-facing startups including Lobby, HostAI, Inntelo AI, and GuestOS
- **LLM Pipelines:** AI orchestration workflows combining GPT-4o/Gemini with tool-calling, relevant across nearly all Tier 1 and Tier 2 companies
- **GDS (Global Distribution Systems):** Amadeus and Sabre infrastructure underpinning corporate travel and distribution plays (BizTrip AI, Meili, SkyLink)
- **Booking Engine Fragmentation:** Multi-platform booking engine integration (iHotelier, SynXis, Allora, AZDS) is a recurring technical challenge across hotel and vacation rental startups
- **Agentic AI:** Autonomous AI systems handling guest communication, group bookings, and operational tasks — core to Lobby, Inntelo AI, GuestOS, HostAI, and Kaiban
- **Direct Distribution / Anti-OTA:** A major thematic trend with DirectBooker, HostAI, and Selfbooker-adjacent companies trying to bypass OTA dependency
- **schema.org/Hotel JSON-LD:** Structured hotel data markup critical for LLM-readable content, relevant at Bonafide and DirectBooker
- **Dynamic Pricing & Revenue Management:** AI-driven pricing intelligence relevant at Walkway, Dazhboards, and Inn-Flow
- **Loyalty Fintech:** Travel loyalty currency aggregation and AI-powered rewards platforms (HeyMax, Rove, VanityPass)
- **PhocusWire Hot 25 2026:** Industry benchmark list identifying the most promising travel startups of the year; 15+ companies on this list appear in the research

## Details

## Research Scope and Methodology

This research was conducted in March 2026 to identify travel tech and hospitality startups that are hiring or growing rapidly, with a specific focus on companies where a candidate with the following skills would be a strong fit:

- PMS integrations and booking engine development
- AI/LLM pipeline engineering (GPT-4o, Gemini, tool-calling)
- Model Context Protocol (MCP) tool development
- Amadeus GDS experience
- Data engineering (BigQuery, analytics pipelines)
- schema.org/Hotel JSON-LD and structured data

All companies already tracked in `hospitality_companies_tier1.yaml` were excluded (Mews, Cloudbeds, Apaleo, Duetto, IDeaS, Lighthouse, Akia, HiJiffy, Canary, Guesty, Duve, HyperGuest, FLYR, Cendyn, Hapi, LodgIQ, Jurny, Stardrift, Plusgrade, Selfbook, Maison, Conduit, Journey, Instalily, Actabl, SuiteOp, Stayflexi, SiteMinder, Agilysys, RoomRaccoon, and others).

---

## TIER 1 — HIGH RELEVANCE

*Hotel/hospitality core; skills map directly*

### 1. DirectBooker ⭐ TOP TARGET
- **Category:** GDS / Distribution / AI
- **Founded:** 2024 | **Location:** USA
- **Funding:** Pre-seed, ~$2M from Baukunst
- **What they do:** AI-powered platform that feeds hotel listings directly into LLMs (ChatGPT, Gemini) via Model Context Protocol (MCP), bypassing OTAs for direct hotel booking.
- **Key People:**
  - Sanjay Vakil, CEO (former Google Travel + TripAdvisor leadership)
  - Theresa Meyer, Chief Product Officer
  - George Madrid, CTO
  - Backed by Steve Kaufer (Tripadvisor co-founder) and Richard Holden (ex-Google Travel head)
- **Hiring Signal:** Pre-product phase; will need to build engineering team
- **Why High Priority:** Near-perfect overlap with MCP tool development (searchHotels, getHotelRates, bookHotelOffer patterns). DirectBooker is building exactly what hospitality-focused MCP developers have already built.
- **Recent News:** PhocusWire Hot 25 2026. No live product yet; speaking with hotels for ~1 year.
- **Outreach Strategy:** LinkedIn to George Madrid (CTO) + Sanjay Vakil. Lead with MCP tool-calling hotel integration experience.

---

### 2. Bonafide
- **Category:** Data/Integration / AI
- **Founded:** 2024 | **Location:** USA
- **Funding:** Early stage
- **What they do:** Agentic commerce enablement platform that helps travel brands aggregate, verify, and distribute LLM-ready content through MCP. Ensures hotel/travel data is correctly represented in AI systems.
- **Key People:** Founders not publicly named
- **Hiring Signal:** Early stage, likely actively hiring
- **Why High Priority:** Another MCP-native company. schema.org/Hotel JSON-LD extraction and Playwright + LLM pipelines for hotel data are directly applicable.
- **Recent News:** PhocusWire Hot 25 2026. Working with hotels on LLM-ready content distribution.
- **Outreach Strategy:** Research founders via LinkedIn. Lead with schema.org/Hotel JSON-LD structured data work.

---

### 3. Lobby
- **Category:** Distribution / AI
- **Founded:** 2025 | **Location:** Zurich, Switzerland
- **Funding:** Pre-seed, $2.2M from Founderful; Y Combinator backed
- **What they do:** AI platform automating group/B2B hotel bookings. Uses LLMs + rules-based logic + system integrations to interpret unstructured booking requests (email), check availability, apply negotiated rates, and build responses. Human-in-the-loop design.
- **Key People:**
  - Romy Abbrederis, Co-founder
  - Alex Mugrauer, Co-founder
  - Muhammad Abdullah, Co-founder
- **Hiring Signal:** Just raised; actively building engineering team
- **Why High Priority:** LLM integration with hotel systems (PMS, availability, rates) and booking engine fragmentation across multiple systems are core engineering problems here.
- **Recent News:** PhocusWire coverage March 2026.
- **Outreach Strategy:** LinkedIn to founders. Lead with PMS adapter parallelization and multi-engine booking experience.

---

### 4. HostAI
- **Category:** Distribution / AI / Marketing
- **Location:** USA
- **Funding:** Early stage (exact amount not disclosed)
- **What they do:** AI-native direct marketing platform for independent hotels and vacation rentals. Autonomously generates and executes marketing strategies, creates landing pages and ads. Building products for AI agent discovery and booking.
- **Key People:**
  - Amirali Mohajer, Co-founder (scaled OTA from 50 to 10K bookings; ex-Agoda Head of Product for Supply Monetization)
  - Heeyoung Lee, Co-founder (Stanford NLP PhD; worked on Google Assistant, Gmail Smart Compose)
  - DK Choe, Co-founder (Brown NLP PhD; Google Search on Drive)
- **Hiring Signal:** Goal to power direct distribution for 500 brands through PMS partnerships by year-end
- **Why High Priority:** PMS partnership expansion requires engineers who understand PMS integrations deeply. AI agent booking discovery overlaps with MCP tool development.
- **Recent News:** PhocusWire Hot 25 2026. Goal: shift $100M in bookings to direct channels.
- **Outreach Strategy:** LinkedIn to Amirali Mohajer (ex-Agoda). Lead with PMS integrations and MCP tools.

---

### 5. Inn-Flow
- **Category:** Hotel Operations / BI
- **Location:** Cary, NC (near Raleigh)
- **Funding:** $45M growth capital from Mainsail Partners (first institutional round, March 2025)
- **What they do:** Hotel back-office automation platform covering accounting, labor management, and operations. Expanding into facilities management, mobile tech, and BI.
- **Key People:**
  - John Erhart, Founder (hospitality veteran; family owns CMC Hotels)
  - Halley Gesar, VP Marketing
  - Michael Purcell, CFO
  - Nicole Ryder, VP People
- **Hiring Signal:** Actively hiring 20+ new employees in Cary area over next 18 months
- **Why Relevant:** $45M fresh capital means aggressive hiring. New BI products map to BigQuery/analytics experience. Hotel data pipelines and operational metrics are directly relevant.
- **Recent News:** $45M raise March 2025. Expanding product suite significantly.

---

### 6. Inntelo AI
- **Category:** GuestCX / AI
- **Location:** London, UK
- **Funding:** Pre-seed, ~£500K from Haatch, British Business Investments, Look AI Ventures
- **What they do:** AI-native platform unifying guest experience, operations, and real-time personalization for hotels. AI Concierge handles voice, chat, and social media. Launched UK's first agentic AI Concierge in 2025.
- **Key People:**
  - Asif Alidina, CEO/Co-founder (10+ years hotel housekeeping/facilities management)
  - Shahzain Badruddin, Co-founder/CTO (high-volume ecommerce engineering at Marks & Spencer, Charlotte Tilbury)
- **Hiring Signal:** Early stage, small team, will grow
- **Why Relevant:** Agentic AI Concierge maps directly to Playwright + LLM pipeline and MCP tool-calling experience.
- **Recent News:** Won Startup Award at Future Hospitality Summit 2025. Startups 100 2026 recognition.

---

### 7. Hostaway
- **Category:** Vacation Rental / Channel Management
- **Location:** Remote-first, global (EMEA focus for engineering)
- **Funding:** $365M Series B (Dec 2024), backed by PSG and General Atlantic. Over $550M total.
- **What they do:** Market-leading vacation rental management platform. Channel management across Airbnb, Booking.com, VRBO, and others.
- **Hiring Signal:** YES — actively hiring Engineering Managers for Integrations (EMEA) and Trust Accounting (Europe); also hiring QA Engineers
- **Why Relevant:** Integrations Engineering Manager role signals strong need for multi-platform integration expertise (channel managers, booking engines, PMS connectors).
- **Recent News:** $365M Series B; profitable for years. 100% remote.

---

### 8. GuestOS
- **Category:** GuestCX / AI
- **Location:** USA
- **Funding:** Early stage (specific amount not disclosed)
- **What they do:** AI concierge for hospitality, tourism, and events. 24/7 multilingual voice support for hotel services, tour bookings, and local recommendations via single phone number.
- **Key People:**
  - Jessie Fischer, Founder (family operated hotels near Yosemite since 1970s)
  - Advisory: Elizabeth Persons (Travelzoo), Rod Cuthbert (Viator founder), Ramon Elias (ex-HotelTonight CMO)
- **Hiring Signal:** Early stage, building team
- **Why Relevant:** AI concierge interfacing with hotel services requires PMS integrations, booking engine connections, and LLM orchestration.
- **Recent News:** PhocusWire Hot 25 2026.

---

## TIER 2 — STRONG RELEVANCE

*Travel tech broadly; good skill overlap; growing companies*

### 9. BizTrip AI
- **Category:** Business Travel / AI
- **Location:** USA
- **Funding:** Pre-seed, $2.5M total ($1.5M latest tranche includes Sabre Corp minority stake); backed by AI Fund (Andrew Ng's venture studio)
- **What they do:** AI-powered business travel intelligence platform. Single AI layer understanding company travel rules, traveler preferences, and real-time market conditions.
- **Key People:**
  - Tom Romary, Co-founder/CEO (founder of Yapta; SVP at Deem; VP Marketing at Alaska Airlines)
  - Scott Persinger, Co-founder (founder/CEO of SuperCog, AI dev tools)
- **Why Relevant:** Sabre infrastructure partnership makes GDS integration experience (Amadeus/Sabre) directly valuable. $1.5M specifically allocated for product development and hiring.
- **Recent News:** $1.5M raise Feb 2026. Sabre partnership.

---

### 10. Vuelo ⭐ TOP 5 TARGET
- **Category:** Booking / Payments / AI
- **Location:** London, UK (FCA authorized)
- **Funding:** Seed, EUR 64M (~$70M) — one of the largest seed rounds in European travel tech
- **What they do:** AI-native travel booking and payments platform. Replaces search bar with proprietary AI engine that understands travel context. Every trip recommendation includes embedded personalized payment plan.
- **Key People:**
  - Jasper Dykes, Co-founder/CEO
  - Edgars Kohs, Co-founder
- **Hiring Signal:** Massive seed round means aggressive hiring; already onboarding thousands of travelers monthly
- **Why Relevant:** AI-native booking platform needs engineers with deep travel booking flows, hotel/flight APIs, and LLM integration experience.
- **Recent News:** EUR 64M seed round March 2026. Major European launch.
- **Outreach Strategy:** LinkedIn to Jasper Dykes. Lead with booking engine experience across multiple engines.

---

### 11. Cruisebound
- **Category:** Cruise / Booking
- **Location:** USA
- **Funding:** $25.7M total; $13M Series B (Sep 2024) led by Thayer Ventures; backed by Jeff Boyd (ex-Booking Holdings CEO) and Steve Kaufer (Tripadvisor founder)
- **What they do:** Online cruise booking platform (B2C and B2B). Modernizing cruise search and booking.
- **Key People:**
  - Pierre-Oliver Lepage, Co-founder/CEO
  - Bjorn Larsen, Co-founder (Rocket Travel co-founder)
  - Jay Hoffman, Co-founder (Rocket Travel co-founder)
- **Why Relevant:** Booking engine/platform engineering; B2B API distribution maps to booking engine and API integration experience.
- **Recent News:** PhocusWire Hot 25 2026. Expanding B2B offerings.

---

### 12. Walkway
- **Category:** Revenue Management / Data Analytics
- **Location:** USA (scaling to Australia, NZ)
- **Funding:** Early stage
- **What they do:** AI-powered growth platform for tours, activities, and attractions. Competitive intelligence, demand forecasting, dynamic pricing.
- **Key People:**
  - Drew Patterson, Co-founder/Chairman (Kayak founding team; multiple travel tech exits)
  - Emmanuel Gautier, Co-founder/Head of Data & Tech (led data teams at Regiondo and Rezdy)
- **Why Relevant:** Data engineering focus; travel data pipeline and demand forecasting experience (including time-series ML) are directly applicable.
- **Recent News:** PhocusWire Hot 25 2026.

---

### 13. Dazhboards
- **Category:** BI / Analytics
- **Location:** Australia (expanding to NZ and US)
- **Funding:** Early stage
- **What they do:** AI-powered BI and automation platform for tour/activity operators. Integrations with booking systems and financial platforms.
- **Key People:**
  - Dinesh Kaku, Founder/CEO (15+ years tech; previously founded Deal A Day, Backpacker Deals)
  - Hana Robinson, Co-founder (operator of K'gari Drop Bear Adventures)
  - Stephen Bruce, Co-founder (tourism operations veteran)
- **Why Relevant:** BI/analytics platform with booking system integrations; dynamic pricing AI overlaps with time-series ML experience.
- **Recent News:** PhocusWire Hot 25 2026.

---

### 14. HeyMax
- **Category:** Loyalty / Fintech
- **Location:** Singapore (expanding to Japan, Taiwan, Australia)
- **Funding:** $13.6M total; $11M Series A (2025) led by Peak XV Partners (Sequoia India successor)
- **What they do:** Travel-fintech platform with proprietary loyalty currency (Max Miles) that transfers 1:1 to 30+ airline/hotel programs. Earn via shopping, redeem for flights/hotels.
- **Key People:**
  - Joe Lu, CEO (ex-Meta engineer)
  - Ke Wang, CTO (ex-Meta engineer)
  - Jialu Zhong, CPO (ex-Meta engineer)
  - Sean Dy, COO (ex-Meta engineer)
- **Why Relevant:** Founded by 4 ex-Meta engineers; strong technical culture. Hotel/airline API integrations for loyalty program transfers. CTO reachable on LinkedIn.
- **Stats:** 150K+ users; 500M+ Max Miles issued annually.

---

### 15. Meili
- **Category:** Distribution / API
- **Location:** Dublin, Ireland
- **Funding:** EUR 20M+ total; latest EUR 8.1M led by Schooner Capital and Tribal Ventures
- **What they do:** Mobility distribution platform. Integrates ancillary services (car rental, ground transport) directly with airlines and travel brands via API.
- **Key People:**
  - Mike McGearty, Co-founder (former CEO of CarTrawler)
  - Bobby Healy, Co-founder (former CTO of CarTrawler)
- **Why Relevant:** API-first travel distribution; ancillary integration with airlines/hotels maps to adapter and API integration experience. 40+ brand partnerships including Lufthansa, Latam, Accor, Enterprise.
- **Recent News:** PhocusWire Hot 25 2026.

---

### 16. Decagon
- **Category:** AI / Customer Experience
- **Location:** San Francisco, CA
- **Funding:** $481M total; $250M Series D (Jan 2026) at $4.5B valuation
- **What they do:** Conversational AI platform for enterprise customer support. Travel/hospitality vertical includes Avis, Budget, Hertz, Away Travel, and Kindred.
- **Key People:**
  - Ashwin Sreenivas, Co-founder
  - Jesse Zhang, Co-founder
- **Hiring Signal:** 210 employees, rapidly growing; 100+ new enterprise customers in 2025
- **Why Relevant:** Travel/hospitality vertical needs engineers who understand hotel operations and guest communication. Conversational AI + travel integration overlaps with LLM pipeline and MCP tool-calling work.
- **Recent News:** $250M Series D Jan 2026; valuation tripled.

---

## TIER 3 — MODERATE RELEVANCE

*Good companies; less direct skill overlap*

| Company | Category | Location | Key Signal |
|---------|----------|----------|------------|
| **Kaiban** | Airlines / AI | Not specified | AI agent management for airlines; PhocusWire Hot 25 2026 |
| **Hospy** | GuestCX / Operations | Colombia/Brazil | AI digital employee for STR and boutique hotels; LATAM focus |
| **VanityPass** | Loyalty / Fintech | London, UK | Gen Z travel perks subscription; AI loyalty engine; ex-Pinterest co-founder |
| **Guestara** | GuestCX / Operations | Pune, India | $500K pre-seed Dec 2024; 2000+ rooms onboarded; guest management automation |
| **Landng** | Analytics / Marketing Tech | USA | O2O attribution for travel brands; Marriott and L'Oreal clients |
| **Rove (YC W2024)** | Loyalty / Travel | New York, NY | Universal airline mile across dozens of airlines/hotels; YC-backed |

---

## ACQUIRED / LESS ACTIONABLE

### SkyLink (Acquired by Amadeus, Feb 2026)
- AI conversational travel assistant for corporate travel (Slack/Teams integration)
- Founded by Atyab Bhatti (CEO)
- Acquired by Amadeus for undisclosed sum; team now at Amadeus with likely ongoing autonomy
- **Note:** Reaching out to the team at Amadeus post-acquisition may still be worthwhile

### Arcube
- Airline ancillary revenue and loyalty optimization platform
- $1.5M seed from Fuel Ventures & Oxford Capital Partners
- Founded by Prithveesh Reddy and Harvey Lowe (both 21, University of Manchester graduates)
- Manchester, UK; airline-focused with limited hotel overlap

---

## TOP 5 PRIORITY TARGETS

| Rank | Company | Core Reason | Outreach Target |
|------|---------|------------|----------------|
| 1 | **DirectBooker** | MCP tools for hotel distribution to LLMs; near-perfect overlap | George Madrid (CTO), Sanjay Vakil (CEO) |
| 2 | **Bonafide** | MCP + schema.org hotel content for LLMs; JSON-LD pipeline overlap | Research founders; lead with structured data work |
| 3 | **Lobby** | LLM + hotel system integrations for group booking; PMS adapter work | Founders; lead with PMS adapter and multi-engine booking |
| 4 | **HostAI** | PMS partnership expansion + AI agent booking; ex-Agoda leadership | Amirali Mohajer; lead with PMS integrations and MCP tools |
| 5 | **Vuelo** | EUR 64M seed, AI-native booking platform, massive hiring | Jasper Dykes (CEO); lead with multi-engine booking experience |

---

## Funding Overview by Tier

| Company | Stage | Amount | Lead Investor |
|---------|-------|--------|---------------|
| Hostaway | Series B | $365M | PSG, General Atlantic |
| Decagon | Series D | $250M ($481M total) | — |
| Vuelo | Seed | EUR 64M | — |
| Inn-Flow | Growth | $45M | Mainsail Partners |
| Cruisebound | Series B | $25.7M | Thayer Ventures |
| Meili | Late Seed | EUR 20M+ | Schooner Capital |
| HeyMax | Series A | $13.6M | Peak XV Partners |
| BizTrip AI | Pre-Seed | $2.5M | AI Fund + Sabre |
| Lobby | Pre-Seed | $2.2M | Founderful |
| DirectBooker | Pre-Seed | ~$2M | Baukunst |
| Arcube | Seed | $1.5M | Fuel Ventures |
| Inntelo AI | Pre-Seed | ~£500K | Haatch, Look AI Ventures |
| Guestara | Pre-Seed | $500K | Sanjay Ghare |

## Related

- [[Hospitality Tech Companies Tier 1]]
- [[Model Context Protocol (MCP)]]
- [[PMS Integration Patterns]]
- [[LLM Pipeline Architecture]]
- [[Amadeus GDS]]
- [[Hotel Booking Engine Landscape]]
- [[schema.org Hotel JSON-LD]]
- [[PhocusWire Hot 25 2026]]
- [[AI Agentic Systems in Travel]]
- [[Direct Booking vs OTA Distribution]]
- [[Travel Fintech and Loyalty Platforms]]
- [[Kismet Engineering Projects]]
- [[Job Search Strategy — Hospitality Tech]]
- [[Y Combinator Travel Portfolio]]
- [[Dynamic Pricing in Travel Tech]]
