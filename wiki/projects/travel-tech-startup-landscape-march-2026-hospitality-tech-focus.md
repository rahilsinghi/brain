---
title: Travel Tech Startup Landscape - March 2026 (Hospitality Tech Focus)
author: ai
created_at: 2026-04-10T02:05:29.925Z
last_ai_edit: 2026-04-10T02:05:29.925Z
last_human_edit: null
last_embedded_hash: 128a05acc7829b78
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/career/drafts/travel_tech_startup_research_2026.md]]"
tags:
  - travel-tech
  - hospitality
  - startups
  - job-search
  - ai
  - llm
  - mcp
  - pms-integrations
  - booking-engines
  - gds
  - amadeus
  - hotel-tech
  - data-engineering
  - "2026"
  - phocuswire
  - direct-booking
  - agentic-ai
  - revenue-management
  - vacation-rental
  - loyalty-fintech
---


# Travel Tech Startup Landscape - March 2026 (Hospitality Tech Focus)

A curated research report on travel tech startups actively hiring or growing fast as of March 2026, filtered for relevance to a candidate with hospitality tech experience including PMS integrations, booking engines, AI/LLM pipelines, Amadeus GDS, and data engineering. Companies are tiered by skill overlap and hiring signal strength, with 22 companies profiled across hotel AI, distribution, booking platforms, loyalty, and analytics. Top targets are identified based on near-perfect alignment with MCP tooling, hotel data pipelines, and LLM integration experience.

## Key Concepts

- **Model Context Protocol (MCP):** Emerging standard for feeding structured data into LLMs; central to top-tier targets DirectBooker and Bonafide
- **PMS Integrations:** Property Management System connectors are a core differentiator for hotel tech roles across Tier 1 companies
- **LLM Pipelines:** AI orchestration layers (GPT-4o, Gemini) used for booking automation, guest communication, and data extraction
- **GDS (Global Distribution Systems):** Amadeus/Sabre infrastructure underpinning corporate travel and booking engine work
- **Booking Engine Fragmentation:** Problem of integrating across disparate hotel booking systems (iHotelier, SynXis, Allora, AZDS, etc.)
- **Agentic AI in Hospitality:** Autonomous AI agents handling guest communication, group booking, concierge tasks, and marketing execution
- **schema.org/Hotel JSON-LD:** Structured data format for making hotel content LLM-readable, relevant to Bonafide
- **Direct Distribution:** Shift away from OTAs toward AI-mediated and direct booking channels
- **PhocusWire Hot 25 2026:** Annual list of top travel tech startups; primary sourcing signal for this research

## Details

## Research Overview

This document maps the 2026 travel tech startup hiring landscape for a candidate with the following core competencies:
- PMS integrations and adapter engineering
- Booking engine API work (iHotelier, SynXis, Allora, AZDS, and 4+ others)
- AI/LLM pipeline development (GPT-4o, Gemini, tool-calling)
- MCP (Model Context Protocol) tool development
- Amadeus GDS integration
- Data engineering (BigQuery, analytics dashboards)
- Playwright-based web automation and hotel data extraction
- schema.org/Hotel JSON-LD structured content

All companies in `hospitality_companies_tier1.yaml` are excluded from this research.

---

## Tier 1 — High Relevance

These companies have direct skill overlap and active hiring signals.

### 1. DirectBooker ⭐ TOP TARGET
- **Category:** GuestCX / Distribution / AI
- **Founded:** 2024 | **Location:** USA
- **Funding:** ~$2M pre-seed from Baukunst
- **What they do:** AI-powered platform feeding hotel listings directly into LLMs (ChatGPT, Gemini) via Model Context Protocol, bypassing OTAs for direct hotel booking.
- **Key People:** Sanjay Vakil (CEO, ex-Google Travel + TripAdvisor), Theresa Meyer (CPO), George Madrid (CTO). Backed by Steve Kaufer (TripAdvisor co-founder) and Richard Holden (ex-Google Travel head).
- **Why it matters:** Building MCP tools for hotel distribution to LLMs — near-perfect overlap with MCP hotel tooling (`searchHotels`, `getHotelRates`, `bookHotelOffer`). Pre-product phase means foundational engineering roles.
- **News:** PhocusWire Hot 25 2026. No live product yet; in hotel partner conversations for ~1 year.
- **Action:** LinkedIn outreach to George Madrid (CTO) and Sanjay Vakil. Lead with MCP tool-calling implementation.

### 2. Bonafide ⭐ TOP TARGET
- **Category:** Data/Integration / AI
- **Founded:** 2024 | **Location:** USA
- **Funding:** Early stage
- **What they do:** Agentic commerce enablement platform helping travel brands aggregate, verify, and distribute LLM-ready content through MCP. Ensures hotel/travel data is correctly represented in AI systems.
- **Why it matters:** MCP-native company where schema.org/Hotel JSON-LD extraction and Playwright + LLM pipelines for hotel data are directly applicable.
- **News:** PhocusWire Hot 25 2026. Working with hotels on LLM-ready content distribution.
- **Action:** Research founders, LinkedIn outreach. Lead with schema.org/Hotel JSON-LD work.

### 3. Lobby
- **Category:** Distribution / AI
- **Founded:** 2025 | **Location:** Zurich, Switzerland
- **Funding:** $2.2M pre-seed from Founderful; Y Combinator backed
- **What they do:** AI platform automating group/B2B hotel bookings. Uses LLMs + rules-based logic + system integrations to interpret unstructured booking requests (email), check availability, apply negotiated rates, and build responses. Human-in-the-loop design.
- **Key People:** Romy Abbrederis, Alex Mugrauer, Muhammad Abdullah (co-founders)
- **Why it matters:** LLM integration with PMS/availability/rates systems. Booking engine fragmentation problem maps to multi-engine adapter experience.
- **News:** PhocusWire + Hotel Technology News coverage March 2026. Just raised, building team.
- **Action:** LinkedIn to founders. Lead with PMS adapter parallelization and booking engine fragmentation experience.

### 4. HostAI
- **Category:** Distribution / AI / Marketing
- **Location:** USA
- **Funding:** Early stage (undisclosed)
- **What they do:** AI-native direct marketing platform for independent hotels and vacation rentals. Autonomously generates and executes marketing strategies. Building products for AI agent discovery and booking.
- **Key People:** Amirali Mohajer (Co-founder, ex-Agoda Head of Product for Supply Monetization), Heeyoung Lee (Co-founder, Stanford NLP PhD, ex-Google Assistant), DK Choe (Co-founder, Brown NLP PhD, ex-Google Search)
- **Why it matters:** PMS partnership expansion to 500 brands requires PMS integration engineers. AI agent booking discovery overlaps with MCP tools work. Ex-Agoda leadership deeply values OTA/booking engine experience.
- **News:** PhocusWire Hot 25 2026. Goal: shift $100M in bookings to direct channels.
- **Action:** LinkedIn to Amirali Mohajer. Lead with Kismet PMS integrations and MCP tools.

### 5. Inn-Flow
- **Category:** Hotel Operations / BI
- **Location:** Cary, NC (near Raleigh)
- **Funding:** $45M growth capital from Mainsail Partners (March 2025, first institutional round)
- **What they do:** Hotel back-office automation platform covering accounting, labor management, and operations. Expanding into facilities management, mobile tech, and BI.
- **Key People:** John Erhart (Founder, hospitality veteran, family owns CMC Hotels), Halley Gesar (VP Marketing), Michael Purcell (CFO), Nicole Ryder (VP People)
- **Why it matters:** $45M fresh capital means aggressive hiring (20+ new employees planned over 18 months in Cary area). New BI products map to BigQuery/analytics work. Hotel data pipelines and operational metrics overlap.
- **News:** $45M raise March 2025. Significant product suite expansion underway.

### 6. Inntelo AI
- **Category:** GuestCX / AI
- **Location:** London, UK
- **Funding:** ~£500K pre-seed from Haatch, British Business Investments, Look AI Ventures
- **What they do:** AI-native platform unifying guest experience, operations, and real-time personalization for hotels. AI Concierge handles voice, chat, and social media. Launched UK's first agentic AI Concierge in 2025.
- **Key People:** Asif Alidina (CEO/Co-founder, 10+ years hotel housekeeping/facilities management), Shahzain Badruddin (Co-founder/CTO, ex-Marks & Spencer, Charlotte Tilbury high-volume ecommerce)
- **Why it matters:** Building AI agents for hotels that handle guest communication and task automation. Directly maps to Playwright + LLM pipeline and MCP tool-calling experience.
- **News:** Won Startup Award at Future Hospitality Summit 2025. Startups 100 2026 recognition.

### 7. Hostaway
- **Category:** Vacation Rental / Channel Management
- **Location:** Remote-first, global (EMEA engineering focus)
- **Funding:** $365M Series B (Dec 2024), backed by PSG and General Atlantic. $550M+ total. Profitable.
- **What they do:** Market-leading vacation rental management platform. Channel management across Airbnb, Booking.com, VRBO, and others.
- **Why it matters:** Actively hiring Engineering Managers for Integrations (EMEA) and Trust Accounting (Europe), plus QA Engineers. Multi-platform integrations role maps directly to experience working across 7-8 booking engines and building PMS adapters.
- **News:** $365M Series B, profitable, 100% remote.

### 8. GuestOS
- **Category:** GuestCX / AI
- **Location:** USA
- **Funding:** Early stage (undisclosed)
- **What they do:** AI concierge for hospitality, tourism, and events. 24/7 multilingual voice support via single phone number for hotel services, tour bookings, and local recommendations.
- **Key People:** Jessie Fischer (Founder, family operated hotels near Yosemite since 1970s). Advisory board includes Elizabeth Persons (Travelzoo), Rod Cuthbert (Viator founder), Ramon Elias (ex-HotelTonight CMO).
- **Why it matters:** AI concierge interfacing with hotel services needs PMS integrations, booking engine connections, and LLM orchestration. Tool-calling pipeline and hotel data extraction experience directly applicable.
- **News:** PhocusWire Hot 25 2026.

---

## Tier 2 — Strong Relevance

Good companies with meaningful skill overlap, growing teams.

### 9. BizTrip AI
- **Category:** Business Travel / AI
- **Location:** USA
- **Funding:** $2.5M total ($1.5M latest tranche with Sabre Corp minority stake). Backed by AI Fund (Andrew Ng's studio).
- **What they do:** AI-powered business travel intelligence platform replacing fragmented corporate travel tools with a single AI layer that understands company travel rules, traveler preferences, and real-time market conditions.
- **Key People:** Tom Romary (Co-founder/CEO, founder of Yapta, SVP Deem, VP Marketing Alaska Airlines), Scott Persinger (Co-founder, founder/CEO SuperCog)
- **Why it matters:** Sabre infrastructure partnership makes GDS integration experience (Amadeus/Sabre) valuable. AI layer for travel booking overlaps with LLM pipeline and booking engine work. $1.5M specifically earmarked for product development and hiring.
- **News:** $1.5M raise Feb 2026. Sabre partnership announced.

### 10. Vuelo
- **Category:** Booking / Payments / AI
- **Location:** London, UK (FCA authorized)
- **Funding:** EUR 64M seed (~$70M) — one of the largest seed rounds in European travel tech
- **What they do:** AI-native travel booking and payments platform. Replaces search bar with proprietary AI engine that understands travel context. Every trip recommendation includes an embedded personalized payment plan.
- **Key People:** Jasper Dykes (Co-founder/CEO), Edgars Kohs (Co-founder)
- **Why it matters:** Massive seed round signals aggressive hiring. AI-native booking platform needs engineers who understand travel booking flows, hotel/flight APIs, and LLM integration. Booking engine experience across multiple systems is relevant.
- **News:** EUR 64M seed round March 2026. Already onboarding thousands of travelers monthly.

### 11. Cruisebound
- **Category:** Cruise / Booking
- **Location:** USA
- **Funding:** $25.7M total, $13M Series B (Sep 2024) led by Thayer Ventures. Backed by Jeff Boyd (ex-Booking Holdings CEO), Steve Kaufer (TripAdvisor founder).
- **What they do:** Online cruise booking platform modernizing B2C and B2B cruise search and booking.
- **Key People:** Pierre-Oliver Lepage (Co-founder/CEO), Bjorn Larsen and Jay Hoffman (Co-founders, both Rocket Travel co-founders)
- **Why it matters:** Booking engine/platform engineering. B2B API distribution maps to booking engine and API integration experience. Less hotel-specific but solid travel booking tech overlap.
- **News:** PhocusWire Hot 25 2026. Expanding B2B offerings.

### 12. Walkway
- **Category:** Revenue Management / Data Analytics
- **Location:** USA (expanding to Australia, NZ)
- **Funding:** Early stage
- **What they do:** AI-powered growth platform for tours/activities/attractions. Competitive intelligence, demand forecasting, dynamic pricing.
- **Key People:** Drew Patterson (Co-founder/Chairman, Kayak founding team, multiple travel tech exits), Emmanuel Gautier (Co-founder/Head of Data & Tech, ex-Regiondo and Rezdy data teams)
- **Why it matters:** Data engineering and analytics focus. Travel data pipeline experience is valued. BigQuery analytics, time-series data, and demand forecasting experience maps to their core product.
- **News:** PhocusWire Hot 25 2026.

### 13. Dazhboards
- **Category:** BI / Analytics
- **Location:** Australia (expanding to NZ and US)
- **Funding:** Early stage
- **What they do:** AI-powered BI and automation platform for tour/activity operators. Integrations with booking systems and financial platforms.
- **Key People:** Dinesh Kaku (Founder/CEO), Hana Robinson (Co-founder, operator of K'gari Drop Bear Adventures), Stephen Bruce (Co-founder, tourism operations veteran)
- **Why it matters:** BI/analytics platform with booking system integrations maps to data pipeline and BigQuery work. Dynamic pricing AI overlaps with time-series ML experience.
- **News:** PhocusWire Hot 25 2026.

### 14. HeyMax
- **Category:** Loyalty / Fintech
- **Location:** Singapore (expanding to Japan, Taiwan, Australia)
- **Funding:** $13.6M total, $11M Series A (2025) led by Peak XV Partners (Sequoia India successor)
- **What they do:** Travel-fintech platform with proprietary loyalty currency (Max Miles) transferring 1:1 to 30+ airline/hotel programs. Earn via shopping, redeem for flights/hotels.
- **Key People:** Joe Lu (CEO), Ke Wang (CTO), Jialu Zhong (CPO), Sean Dy (COO) — all ex-Meta engineers
- **Why it matters:** Strong technical culture (4 ex-Meta engineer founders). Hotel/airline API integrations for loyalty program transfers. AI features in active development. CTO Ke Wang is reachable on LinkedIn.
- **News:** $11M Series A 2025. 150K+ users, 500M+ Max Miles issued annually.

### 15. Meili
- **Category:** Distribution / API
- **Location:** Dublin, Ireland
- **Funding:** EUR 20M+ total, latest EUR 8.1M led by Schooner Capital and Tribal Ventures
- **What they do:** Mobility distribution platform integrating ancillary services (car rental, ground transport) directly with airlines and travel brands via API.
- **Key People:** Mike McGearty (Co-founder, former CEO of CarTrawler), Bobby Healy (Co-founder, former CTO of CarTrawler)
- **Why it matters:** API-first travel distribution. Ancillary integration with airlines/hotels maps to adapter and API integration experience. 40+ brand partnerships including Lufthansa, Latam, Accor, Enterprise.
- **News:** PhocusWire Hot 25 2026.

### 16. Decagon
- **Category:** AI / Customer Experience
- **Location:** San Francisco, CA
- **Funding:** $481M total. $250M Series D (Jan 2026) at $4.5B valuation.
- **What they do:** Conversational AI platform for enterprise customer support. Travel/hospitality vertical includes Avis, Budget, Hertz, Away Travel, Kindred.
- **Key People:** Ashwin Sreenivas and Jesse Zhang (Co-founders)
- **Why it matters:** Travel/hospitality vertical needs engineers who understand hotel operations and guest communication. Conversational AI + travel integration overlaps with LLM pipeline and MCP tool-calling work. Still startup-stage culture despite scale.
- **News:** $250M Series D Jan 2026, valuation tripled. 100+ new enterprise customers in 2025. ~210 employees.

---

## Tier 3 — Moderate Relevance

Good companies with less direct skill overlap.

| Company | Category | Location | Key Note |
|---------|----------|----------|----------|
| **Kaiban** | Airlines / AI | Unspecified | AI agent management for airlines; less hotel overlap but agentic orchestration is relevant |
| **Hospy** | GuestCX / Operations | Colombia/Brazil | LATAM-focused hotel AI; 10x growth trajectory but location limits US opportunities |
| **VanityPass** | Loyalty / Fintech | London, UK | AI loyalty engine; co-founder is ex-Pinterest senior engineer, strong technical culture |
| **Guestara** | GuestCX / Operations | Pune, India | PMS integrations + guest management; India HQ limits direct access, remote possible |
| **Landng** | Analytics / Marketing Tech | USA | O2O attribution for travel brands (Marriott, L'Oreal clients); BigQuery/GA4 tracking experience relevant |
| **Rove (YC W2024)** | Loyalty / Travel | New York, NY | Universal airline mile across airlines/hotels; YC-backed, airline/hotel API work relevant |

---

## Acquired / Less Actionable

### SkyLink → Acquired by Amadeus (Feb 2026)
- Was an AI conversational travel assistant for corporate travel (Slack/Teams integration)
- Founded by Atyab Bhatti (CEO)
- Acquired by Amadeus for undisclosed sum
- **Note:** Acquired startup teams often retain autonomy and hiring needs within the larger org. Reaching out to the team at Amadeus post-acquisition may still be valuable.

### Arcube
- Airline ancillary revenue and loyalty optimization platform
- $1.5M seed from Fuel Ventures & Oxford Capital Partners
- Manchester, UK; founded by Prithveesh Reddy and Harvey Lowe (both 21, University of Manchester)
- Airline-focused with limited hotel overlap

---

## Prioritized Target Summary

| Rank | Company | Core Overlap | Immediate Action |
|------|---------|-------------|------------------|
| 1 | **DirectBooker** | MCP hotel tools for LLMs — near-perfect match | LinkedIn to George Madrid (CTO) + Sanjay Vakil |
| 2 | **Bonafide** | MCP + schema.org hotel content for LLMs | Research founders, lead with JSON-LD extraction pipeline |
| 3 | **Lobby** | LLM + hotel system integrations for group booking | LinkedIn to co-founders, lead with PMS adapter work |
| 4 | **HostAI** | PMS partnerships + AI agent booking | LinkedIn to Amirali Mohajer (ex-Agoda), lead with Kismet work |
| 5 | **Vuelo** | EUR 64M seed + AI-native booking + massive hiring | LinkedIn to Jasper Dykes, lead with multi-engine booking experience |

## Related

- [[Hospitality Tech Companies Tier 1]]
- [[MCP Tool Development - Kismet]]
- [[PMS Integration Engineering]]
- [[LLM Pipeline Architecture]]
- [[Amadeus GDS Integration]]
- [[Booking Engine Adapter Pattern]]
- [[Hotel Data Engineering]]
- [[schema.org Hotel JSON-LD]]
- [[PhocusWire Hot 25 2026]]
- [[Job Search Strategy - Travel Tech]]
- [[DirectBooker]]
- [[Bonafide]]
- [[Lobby (Startup)]]
- [[HostAI]]
- [[Inn-Flow]]
- [[Hostaway]]
- [[Vuelo]]
- [[Decagon]]
- [[BizTrip AI]]
- [[Kismet - MCP Tools]]
