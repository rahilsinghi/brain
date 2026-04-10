---
status: processed
source_type: career-datacenter
ingested_at: 2026-04-09T21:35:00.000Z
parsed_at: 2026-04-09T21:35:00.000Z
compiled_to: "[[Travel Tech Startup Landscape (March 2026) — Hiring & Growth Research]]"
processed_at: 2026-04-10T02:05:43.201Z
retry_count: 0
last_error: null
compile_progress: null
---










# Travel Tech Startup Research - March 2026

Deep research on travel tech startups that are currently hiring or growing fast.
Focus: companies where a new grad with hospitality tech experience (PMS integrations, booking engines, AI/LLM pipelines, Amadeus GDS, data engineering) would be a strong fit.

**Excluded:** All companies already in `hospitality_companies_tier1.yaml` (Mews, Cloudbeds, Apaleo, Duetto, IDeaS, Lighthouse, Akia, HiJiffy, Canary, Guesty, Duve, HyperGuest, FLYR, Cendyn, Hapi, LodgIQ, Jurny, Stardrift, Plusgrade, Selfbook, Maison, Conduit, Journey, Instalily, Actabl, SuiteOp, Stayflexi, SiteMinder, Agilysys, RoomRaccoon, etc.)

---

## TIER 1 - HIGH RELEVANCE (Hotel/hospitality core, skills map directly)

### 1. DirectBooker
- **What they do:** AI-powered platform that feeds hotel listings directly into LLMs (ChatGPT, Gemini) using Model Context Protocol (MCP), bypassing OTAs for direct hotel booking.
- **Funding:** Pre-seed, ~$2M from Baukunst
- **Location:** USA (founded 2024)
- **Key people:**
  - Sanjay Vakil, CEO (former Google Travel + TripAdvisor leadership)
  - Theresa Meyer, Chief Product Officer
  - George Madrid, CTO
  - Backed by Steve Kaufer (Tripadvisor co-founder/former CEO) and Richard Holden (ex-Google Travel head)
- **Hiring engineers:** Pre-product phase, will need to build engineering team
- **Why relevant:** THIS IS THE #1 TARGET. They are building MCP tools for hotel distribution to LLMs. Rahil built MCP tools at Kismet (`searchHotels`, `getHotelRates`, `bookHotelOffer`). DirectBooker is literally building what Rahil has already built. The MCP + hotel data + LLM pipeline overlap is near-perfect.
- **Recent news:** PhocusWire Hot 25 2026. Pre-product, speaking with hotels for ~1 year. No live product or hotel partnerships yet.
- **Category:** GuestCX / Distribution / AI

### 2. Bonafide
- **What they do:** Agentic commerce enablement platform that helps travel brands aggregate, verify, and distribute LLM-ready content through MCP. Ensures hotel/travel data is correctly represented in AI systems.
- **Funding:** Early stage (founded 2024)
- **Location:** USA
- **Key people:** Founders not publicly named in search results
- **Hiring engineers:** Early stage, likely hiring
- **Why relevant:** Another MCP-native company. Rahil's Kismet work on schema.org/Hotel JSON-LD extraction and Playwright + LLM pipelines for hotel data is directly applicable. Bonafide needs engineers who understand hotel data structures, structured content, and LLM integration.
- **Recent news:** PhocusWire Hot 25 2026. Working with hotels on LLM-ready content distribution.
- **Category:** Data/Integration / AI

### 3. Lobby
- **What they do:** AI platform that automates group/B2B hotel bookings. Uses LLMs + rules-based logic + system integrations to interpret unstructured booking requests (email), check availability, apply negotiated rates, and build responses. Human-in-the-loop.
- **Funding:** Pre-seed, $2.2M from Founderful (founded 2025)
- **Location:** Zurich, Switzerland
- **Key people:**
  - Romy Abbrederis, Co-founder
  - Alex Mugrauer, Co-founder
  - Muhammad Abdullah, Co-founder
- **Hiring engineers:** Just raised, will be building team
- **Why relevant:** LLM integration with hotel systems (PMS, availability, rates) is exactly what Rahil did at Kismet. The booking engine fragmentation problem (parsing requests across different systems) maps to working across 7-8 booking engines. PMS adapter experience and Amadeus GDS knowledge are directly applicable.
- **Recent news:** PhocusWire coverage March 2026. Y Combinator backed.
- **Category:** Distribution / AI

### 4. HostAI
- **What they do:** AI-native direct marketing platform for independent hotels and vacation rentals. Autonomously generates and executes marketing strategies, creates landing pages and ads. Building products for AI agent discovery and booking.
- **Funding:** Early stage (exact amount not disclosed)
- **Location:** USA
- **Key people:**
  - Amirali Mohajer, Co-founder (scaled OTA from 50 to 10K bookings, ex-Agoda Head of Product for Supply Monetization)
  - Heeyoung Lee, Co-founder (Stanford NLP PhD, worked on Google Assistant, Gmail Smart Compose)
  - DK Choe, Co-founder (Brown NLP PhD, Google Search on Drive)
- **Hiring engineers:** Goal to power direct distribution for 500 brands through PMS partnerships by year-end
- **Why relevant:** PMS partnership expansion means they need engineers who understand PMS integrations. The AI agent booking discovery play overlaps with Rahil's MCP tools work. Amirali's Agoda background means he values OTA/booking engine experience. Strong NLP/AI team means Rahil's LLM pipeline experience is valued.
- **Recent news:** PhocusWire Hot 25 2026. Goal: shift $100M in bookings to direct channels.
- **Category:** Distribution / AI / Marketing

### 5. Inn-Flow
- **What they do:** Hotel back-office automation platform (accounting, labor management, operations). Expanding into facilities management, mobile tech, and BI.
- **Funding:** $45M growth capital from Mainsail Partners (first institutional round, March 2025)
- **Location:** Cary, NC (near Raleigh)
- **Key people:**
  - John Erhart, Founder (hospitality veteran, family owns CMC Hotels)
  - Halley Gesar, VP Marketing
  - Michael Purcell, CFO
  - Nicole Ryder, VP People
- **Hiring engineers:** Actively hiring 20+ new employees in Cary area over next 18 months. Recent QA hire Oct 2025.
- **Why relevant:** $45M fresh capital means aggressive hiring. Building new BI products maps to Rahil's BigQuery/analytics work. Hotel data pipelines, reporting dashboards, and operational metrics are all relevant. Less direct overlap than others above, but strong hiring signal and growing team.
- **Recent news:** $45M raise March 2025. Expanding product suite significantly.
- **Category:** Hotel Operations / BI

### 6. Inntelo AI
- **What they do:** First AI-native platform unifying guest experience, operations, and real-time personalization for hotels. AI Concierge handles voice, chat, social media. Launched UK's first agentic AI Concierge in 2025.
- **Funding:** Pre-seed, ~500K GBP from Haatch, British Business Investments, Look AI Ventures
- **Location:** London, UK
- **Key people:**
  - Asif Alidina, CEO/Co-founder (10+ years hotel housekeeping/facilities management)
  - Shahzain Badruddin, Co-founder/CTO (engineered high-volume ecommerce at Marks & Spencer, Charlotte Tilbury)
- **Hiring engineers:** Early stage, small team, will grow
- **Why relevant:** Building AI agents for hotels that handle guest communication and task automation. Directly maps to Rahil's Playwright + LLM pipeline work and MCP tool-calling experience. The "agentic AI Concierge" is essentially what Rahil has experience building.
- **Recent news:** Won Startup Award at Future Hospitality Summit 2025. Startups 100 2026 recognition.
- **Category:** GuestCX / AI

### 7. Hostaway
- **What they do:** Market-leading vacation rental management platform. Channel management across Airbnb, Booking.com, VRBO, etc.
- **Funding:** $365M Series B (Dec 2024), backed by PSG and General Atlantic. Over $550M total.
- **Location:** Remote-first, global (EMEA focus for engineering)
- **Key people:** Executive team not fully detailed in search results
- **Hiring engineers:** YES, actively hiring Engineering Managers for Integrations (EMEA) and Trust Accounting (Europe). Also hiring QA Engineers.
- **Why relevant:** The Integrations Engineering Manager role is a strong signal they need people who understand multi-platform integrations (channel managers, booking engines, PMS connectors). Rahil's experience working across 7-8 booking engines and building PMS adapters is directly relevant. Large, well-funded, profitable company.
- **Recent news:** $365M Series B, profitable for years. 100% remote.
- **Category:** Vacation Rental / Channel Management

### 8. GuestOS
- **What they do:** AI concierge "employee" for hospitality, tourism, events. 24/7 multilingual voice support via single phone number for hotel services, tour bookings, local recommendations.
- **Funding:** Early stage (specific amount not disclosed)
- **Location:** USA
- **Key people:**
  - Jessie Fischer, Founder (family operated hotels near Yosemite since 1970s, worked in hotel ops since age 12)
  - Advisory board: Elizabeth Persons (Travelzoo), Rod Cuthbert (Viator founder), Ramon Elias (ex-HotelTonight CMO), Dan Christian (Travel Trends podcast)
- **Hiring engineers:** Early stage, building team
- **Why relevant:** AI concierge that interfaces with hotel services needs PMS integrations, booking engine connections, and LLM orchestration. Rahil's tool-calling pipeline (GPT-4o/Gemini) and hotel data extraction experience are directly applicable.
- **Recent news:** PhocusWire Hot 25 2026.
- **Category:** GuestCX / AI

---

## TIER 2 - STRONG RELEVANCE (Travel tech, good skill overlap, growing)

### 9. BizTrip AI
- **What they do:** AI-powered business travel intelligence platform. Replaces fragmented corporate travel tools with single AI layer that understands company travel rules, traveler preferences, and real-time market conditions.
- **Funding:** Pre-seed, $2.5M total (latest $1.5M tranche includes Sabre Corp minority stake + tech infrastructure). Backed by AI Fund (Andrew Ng's venture studio).
- **Location:** USA
- **Key people:**
  - Tom Romary, Co-founder/CEO (founder of Yapta, SVP at Deem, VP Marketing at Alaska Airlines)
  - Scott Persinger, Co-founder (founder/CEO of SuperCog, AI dev tools)
  - Board: Rob Solomon (ex-CEO GoFundMe, ex-President Groupon)
- **Hiring engineers:** $1.5M specifically for product development and hiring
- **Why relevant:** Sabre infrastructure partnership means GDS integration experience (Amadeus/Sabre) is valuable. AI layer for travel booking overlaps with Rahil's LLM pipeline and booking engine work. Early stage with fresh capital for hiring.
- **Recent news:** $1.5M raise Feb 2026. Sabre partnership.
- **Category:** Business Travel / AI

### 10. Vuelo
- **What they do:** AI-native travel booking and payments platform. Replaces search bar with proprietary AI engine that understands travel context. Every trip recommendation includes embedded personalized payment plan.
- **Funding:** Seed, EUR 64M (~$70M). One of the largest seed rounds in European travel tech.
- **Location:** London, UK (FCA authorized)
- **Key people:**
  - Jasper Dykes, Co-founder/CEO
  - Edgars Kohs, Co-founder
- **Hiring engineers:** Massive seed round means aggressive hiring. Already onboarding thousands of travelers monthly.
- **Why relevant:** AI-native booking platform needs engineers who understand travel booking flows, hotel/flight APIs, and LLM integration. Rahil's booking engine experience (iHotelier, SynXis, Allora, AZDS) and Amadeus GDS knowledge are relevant. The AI engine for travel context maps to LLM pipeline work.
- **Recent news:** EUR 64M seed round March 2026. Major European launch.
- **Category:** Booking / Payments / AI

### 11. Cruisebound
- **What they do:** Online cruise booking platform (B2C and B2B). Modernizing how cruises are searched and booked.
- **Funding:** $25.7M total, $13M Series B (Sep 2024) led by Thayer Ventures. Backed by Jeff Boyd (ex-Booking Holdings CEO), Steve Kaufer (Tripadvisor founder), Plug & Play.
- **Location:** USA
- **Key people:**
  - Pierre-Oliver Lepage, Co-founder/CEO
  - Bjorn Larsen, Co-founder (Rocket Travel co-founder)
  - Jay Hoffman, Co-founder (Rocket Travel co-founder)
- **Hiring engineers:** Growing team with strong investor backing
- **Why relevant:** Booking engine/platform engineering. The B2B API distribution side maps to Rahil's experience with booking engines and API integrations. Less hotel-specific but still travel booking tech.
- **Recent news:** PhocusWire Hot 25 2026. Expanding B2B offerings.
- **Category:** Cruise / Booking

### 12. Walkway
- **What they do:** AI-powered growth platform for tours/activities/attractions. Competitive intelligence, demand forecasting, dynamic pricing.
- **Funding:** Early stage
- **Location:** USA
- **Key people:**
  - Drew Patterson, Co-founder/Chairman (built and sold multiple travel tech startups, part of Kayak founding team)
  - Emmanuel Gautier, Co-founder/Head of Data & Tech (led data teams at Regiondo and Rezdy)
- **Hiring engineers:** Scaling globally (Australia, NZ, US)
- **Why relevant:** Data engineering and analytics focus. Emmanuel Gautier's background in booking software data teams signals they value people with travel data pipeline experience. Rahil's BigQuery analytics, time-series data, and demand forecasting (wind energy ML) are relevant.
- **Recent news:** PhocusWire Hot 25 2026. Expanding pricing and intelligence tools.
- **Category:** Revenue Management / Data Analytics

### 13. Dazhboards
- **What they do:** AI-powered BI and automation platform for tour/activity operators. Integrations with booking systems and financial platforms.
- **Funding:** Early stage
- **Location:** Australia (expanding to NZ and US)
- **Key people:**
  - Dinesh Kaku, Founder/CEO (15+ years tech, previously founded Deal A Day, Backpacker Deals)
  - Hana Robinson, Co-founder (operator of K'gari Drop Bear Adventures)
  - Stephen Bruce, Co-founder (tourism operations veteran)
- **Hiring engineers:** Scaling, investing in AI dynamic pricing, voice automation
- **Why relevant:** BI/analytics platform with booking system integrations maps to BigQuery analytics and data pipeline work. The dynamic pricing AI overlaps with time-series ML experience.
- **Recent news:** PhocusWire Hot 25 2026.
- **Category:** BI / Analytics

### 14. HeyMax
- **What they do:** Travel-fintech platform. Proprietary loyalty currency (Max Miles) that transfers 1:1 to 30+ airline/hotel programs. Earn via shopping, redeem for flights/hotels.
- **Funding:** $13.6M total. $11M Series A (2025) led by Peak XV Partners (Sequoia India successor).
- **Location:** Singapore (expanding to Japan, Taiwan, Australia)
- **Key people:**
  - Joe Lu, CEO (ex-Meta engineer)
  - Ke Wang, CTO (ex-Meta engineer)
  - Jialu Zhong, CPO (ex-Meta engineer)
  - Sean Dy, COO (ex-Meta engineer)
- **Hiring engineers:** Series A capital for product development and AI features
- **Why relevant:** Founded by 4 ex-Meta engineers, technical culture. Hotel/airline API integrations for loyalty program transfers. The CTO (Ke Wang) is reachable on LinkedIn. AI features in development.
- **Recent news:** $11M Series A 2025. 150K+ users, 500M+ Max Miles issued annually.
- **Category:** Loyalty / Fintech

### 15. Meili
- **What they do:** Mobility distribution platform. Integrates ancillary services (car rental, ground transport) directly with airlines and travel brands via API.
- **Funding:** EUR 20M+ total, latest EUR 8.1M round led by Schooner Capital and Tribal Ventures
- **Location:** Dublin, Ireland
- **Key people:**
  - Mike McGearty, Co-founder (former CEO of CarTrawler)
  - Bobby Healy, Co-founder (former CTO of CarTrawler)
- **Hiring engineers:** Growing, partnered with ~40 companies including Lufthansa, Latam, Accor, Enterprise
- **Why relevant:** API-first travel distribution. The ancillary integration with airlines/hotels maps to Rahil's experience building adapters and API integrations. Bobby Healy (former CTO) values engineering talent. Amadeus-adjacent distribution work.
- **Recent news:** PhocusWire Hot 25 2026. 40+ brand partnerships.
- **Category:** Distribution / API

### 16. Decagon
- **What they do:** Conversational AI platform for enterprise customer support. Travel/hospitality vertical includes Avis, Budget, Hertz, Away Travel, Kindred.
- **Funding:** $481M total. $250M Series D (Jan 2026) at $4.5B valuation. Previous: $131M Series C at $1.5B.
- **Location:** San Francisco, CA
- **Key people:**
  - Ashwin Sreenivas, Co-founder
  - Jesse Zhang, Co-founder
- **Hiring engineers:** 210 employees, rapidly growing. Likely hiring aggressively.
- **Why relevant:** Not hotel-specific, but their travel/hospitality vertical needs engineers who understand hotel operations and guest communication. The conversational AI + travel integration overlaps with Rahil's LLM pipeline and MCP tool-calling work. Larger company but still startup-stage culture.
- **Recent news:** $250M Series D Jan 2026, valuation tripled to $4.5B. 100+ new enterprise customers in 2025.
- **Category:** AI / Customer Experience

---

## TIER 3 - MODERATE RELEVANCE (Good companies, less direct skill overlap)

### 17. Kaiban
- **What they do:** AI agent management system for airlines. Centralized platform for deploying and managing AI-powered operations across airline departments.
- **Funding:** Not disclosed
- **Location:** Not specified
- **Key people:** Not publicly detailed
- **Hiring engineers:** Growing, conducting proof-of-concept deployments
- **Why relevant:** Airline-focused AI agents. Less hotel overlap, but the AI agent orchestration and system integration work is relevant. If they expand to hotels, Rahil's PMS integration experience becomes more valuable.
- **Recent news:** PhocusWire Hot 25 2026.
- **Category:** Airlines / AI

### 18. Hospy
- **What they do:** AI-powered digital employee for short-term rentals and boutique hotels in Latin America. Automates core operational and guest service tasks.
- **Funding:** Not disclosed (2+ years of product development)
- **Location:** Colombia/Brazil (LATAM focus)
- **Key people:** Founder with 12+ years hospitality tech experience (name not found in searches)
- **Hiring engineers:** Growing 10x over 24 months, expanding across LATAM
- **Why relevant:** AI operations platform for hotels. PMS integrations and guest automation overlap. LATAM focus may limit US-based opportunities.
- **Recent news:** PhocusWire Hot 25 2026. Expanding across LATAM.
- **Category:** GuestCX / Operations

### 19. VanityPass
- **What they do:** Credit card alternative for travelers. Subscription model democratizing premium travel perks for Gen Z/millennials. AI loyalty intelligence engine.
- **Funding:** Early stage
- **Location:** London, UK
- **Key people:**
  - Perez Tigidam, Co-founder/CEO (previously founded Satice, luxury short-term rental platform)
  - Co-founder is former senior engineer at Pinterest (unnamed) and "leading AI engineer"
- **Hiring engineers:** Early stage, building AI loyalty intelligence engine
- **Why relevant:** The co-founder being a former senior Pinterest engineer suggests a strong technical culture. AI loyalty engine development could use travel data pipeline expertise. Less direct hotel overlap.
- **Recent news:** PhocusWire Hot 25 2026.
- **Category:** Loyalty / Fintech

### 20. Guestara
- **What they do:** AI-enabled guest management platform. Centralizes and automates hospitality functions including messaging, upsells, and operations.
- **Funding:** Pre-seed, $500K (Dec 2024) led by Sanjay Ghare
- **Location:** Pune, India (targeting global market)
- **Key people:**
  - Akshay Dekate, CEO/Co-founder
  - Neelaksh Gupta, Co-founder
  - Kajal Makhija, Co-founder
  - Rajat Maheshwari, Co-founder
- **Hiring engineers:** 2000+ rooms onboarded, including 3 global hotel chains. Growing.
- **Why relevant:** Guest management + hotel operations automation. PMS integrations and guest data pipelines. India HQ may limit direct opportunities, but remote possible. Reports 20% operational efficiency increase, 35% guest satisfaction rise, 57% revenue boost.
- **Recent news:** $500K pre-seed Dec 2024.
- **Category:** GuestCX / Operations

### 21. Landng
- **What they do:** O2O (online-to-offline) attribution technology. Interactive maps and itineraries for travel brands. "Google Analytics for the real world" for experiential marketing ROI.
- **Funding:** Early stage
- **Location:** USA
- **Key people:** Not detailed in searches
- **Hiring engineers:** Scaling enterprise footprint (Marriott, L'Oreal clients)
- **Why relevant:** Attribution and analytics focus maps to BigQuery/GA4 tracking work at Kismet. Cross-domain tracking and UTM attribution experience is relevant to their O2O attribution problem.
- **Recent news:** PhocusWire Hot 25 2026. Marriott and L'Oreal customers.
- **Category:** Analytics / Marketing Tech

### 22. Rove (YC W2024)
- **What they do:** Building the first accessible and universal airline mile, redeemable across dozens of international airlines and hotel chains.
- **Funding:** YC-backed (W2024 batch)
- **Location:** New York, NY
- **Key people:** Not detailed in search results
- **Hiring engineers:** Post-YC, likely building team
- **Why relevant:** NYC-based, YC-backed. Airline/hotel API integrations for loyalty redemption. Less direct hotel tech overlap but travel API work is relevant.
- **Recent news:** YC W2024 batch.
- **Category:** Loyalty / Travel

---

## ACQUIRED / LESS ACTIONABLE

### SkyLink (ACQUIRED by Amadeus, Feb 2026)
- Was an AI conversational travel assistant for corporate travel (Slack/Teams integration).
- Founded by Atyab Bhatti (CEO).
- Acquired by Amadeus for undisclosed sum. Team now at Amadeus.
- **Note:** Could still be worth reaching out to the team at Amadeus, as acquired startup teams often have autonomy and hiring needs.

### Arcube
- Airline ancillary revenue and loyalty optimization platform.
- $1.5M seed from Fuel Ventures & Oxford Capital Partners.
- Founded by Prithveesh Reddy and Harvey Lowe (both 21, University of Manchester grads).
- Manchester, UK. Airline-focused, less hotel overlap.

---

## SUMMARY: TOP 5 TARGETS TO PRIORITIZE

| Rank | Company | Why | Action |
|------|---------|-----|--------|
| 1 | **DirectBooker** | MCP tools for hotel distribution to LLMs. Near-perfect overlap with Kismet MCP work. CTO George Madrid is the target. | LinkedIn to George Madrid + Sanjay Vakil. Cold email referencing MCP tool-calling experience. |
| 2 | **Bonafide** | MCP + schema.org hotel content for LLMs. Directly maps to Kismet JSON-LD extraction pipeline. | Research founders, LinkedIn outreach. Lead with schema.org/Hotel JSON-LD work. |
| 3 | **Lobby** | LLM + hotel system integrations for group booking. PMS adapters, rate lookup, availability. | LinkedIn to founders. Lead with PMS adapter parallelization and booking engine fragmentation. |
| 4 | **HostAI** | PMS partnership expansion + AI agent booking. Ex-Agoda leadership understands hotel tech deeply. | LinkedIn to Amirali Mohajer (ex-Agoda). Lead with Kismet PMS integrations and MCP tools. |
| 5 | **Vuelo** | EUR 64M seed, AI-native booking platform, massive hiring. Booking engine + AI pipeline overlap. | LinkedIn to Jasper Dykes. Lead with booking engine experience across 7-8 engines. |

---

## Sources

- [PhocusWire Hot 25 Travel Startups 2026](https://www.phocuswire.com/hot-25-travel-startups-2026)
- [PhocusWire Hot 25 2026: DirectBooker](https://www.phocuswire.com/hot-25-travel-startups-2026-directbooker)
- [PhocusWire Hot 25 2026: HostAI](https://www.phocuswire.com/hot-25-travel-startups-2026-hostai)
- [PhocusWire Hot 25 2026: Bonafide](https://www.phocuswire.com/hot-25-travel-startups-2026-bonafide)
- [PhocusWire Hot 25 2026: HiGem](https://www.phocuswire.com/hot-25-travel-startups-2026-higem)
- [PhocusWire Hot 25 2026: Lobby funding](https://www.phocuswire.com/news/startups/lobby-group-booking-funding)
- [PhocusWire Hot 25 2026: Kaiban](https://www.phocuswire.com/hot-25-travel-startups-2026-kaiban)
- [PhocusWire Hot 25 2026: Walkway](https://www.phocuswire.com/hot-25-travel-startups-2026-walkway)
- [PhocusWire Hot 25 2026: Dazhboards](https://www.phocuswire.com/hot-25-travel-startups-2026-dazhboards)
- [PhocusWire Hot 25 2026: VanityPass](https://www.phocuswire.com/hot-25-travel-startups-2026-vanitypass)
- [PhocusWire Hot 25 2026: Meili](https://www.phocuswire.com/hot-25-travel-startups-2026-meili)
- [PhocusWire Hot 25 2026: Cruisebound](https://www.phocuswire.com/hot-25-travel-startups-2026-cruisebound)
- [PhocusWire Hot 25 2026: BizTrip AI](https://www.phocuswire.com/hot-25-travel-startups-2026-biztrip)
- [PhocusWire Bonafide Startup Stage](https://www.phocuswire.com/startup-stage-bonafide)
- [Inn-Flow $45M Funding](https://hoteltechnologynews.com/2025/03/inn-flow-lands-45-million-investment-to-drive-innovation-and-expansion-of-hotel-back-office-automation-platform/)
- [Vuelo EUR 64M Seed](https://www.eu-startups.com/2026/03/vuelo-secures-e64-million-in-seed-funding-to-build-an-ai-native-travel-booking-experience/)
- [Lobby $2.2M Funding](https://hoteltechnologynews.com/2026/03/lobby-raises-2-2-million-to-streamline-hotel-and-group-travel-bookings/)
- [BizTrip AI $1.5M Pre-Seed](https://www.phocuswire.com/biztrip-ai-1-5-million-dollars-pre-seed-funding)
- [Meili EUR 8.1M Funding](https://www.phocuswire.com/meili-funding-ground-transportation-ancillary)
- [HeyMax $11M Series A](https://www.phocuswire.com/heymax-loyalty-rewards-funding-series-a)
- [Cruisebound $13M Funding](https://www.phocuswire.com/cruisebound-funding-thayer-ventures)
- [Inntelo AI Pre-Seed](https://lookai.vc/inntelo-ai-raises-over-500k-pre-seed-to-transform-hotel-operations-with-ai/)
- [Decagon Series D $250M](https://decagon.ai/resources/series-d-announcement)
- [Decagon Travel & Hospitality](https://decagon.ai/industry/travel-hospitality)
- [Amadeus acquires SkyLink](https://www.phocuswire.com/amadeus-acquires-skylink)
- [Hostaway Engineering Manager role](https://careers.hostaway.com/o/engineering-manager-emea)
- [Guestara $500K Pre-Seed](https://hospitalitytech.com/start-spotlight-guestara-simplifies-guest-management-modern-hotel-stack)
- [Skift Travel Startup Funding](https://skift.com/travel-startups/)
- [Phocuswright State of Travel Startup Funding](https://www.phocuswright.com/Travel-Research/Technology-Innovation/The-AI-Native-Edge-Travel-Startups-2025)
- [Y Combinator Travel Startups](https://www.ycombinator.com/companies/industry/travel-leisure-and-tourism)
- [DirectBooker former Google/Tripadvisor founders](https://skift.com/2025/07/17/former-heads-of-google-travel-and-tripadvisor-form-ai-startup-to-head-off-online-travel-agencies/)
