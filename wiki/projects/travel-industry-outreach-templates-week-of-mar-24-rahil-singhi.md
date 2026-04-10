---
title: Travel Industry Outreach Templates — Week of Mar 24 (Rahil Singhi)
author: ai
created_at: 2026-04-10T01:54:16.302Z
last_ai_edit: 2026-04-10T01:54:16.302Z
last_human_edit: null
last_embedded_hash: c0ea66b862ee1512
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/career/drafts/big_travel_outreach_templates.md]]"
tags:
  - job-search
  - outreach
  - travel-tech
  - hospitality-tech
  - email-templates
  - linkedin
  - sabre
  - amadeus
  - expedia
  - airbnb
  - booking.com
  - hopper
  - kayak
  - travelport
  - tripadvisor
  - agoda
  - gds-integration
  - booking-engines
  - rate-pipelines
  - new-grad-2026
  - nyu
  - rahil-singhi
  - apollo
  - cold-outreach
---


# Travel Industry Outreach Templates — Week of Mar 24 (Rahil Singhi)

A collection of personalized outreach templates targeting 10 major travel and hospitality technology companies for full-time software engineering roles starting May 2026. Templates include emails, LinkedIn connection notes, and LinkedIn DMs tailored to each company's specific technology stack and engineering initiatives. All templates follow a strict writing style guide emphasizing specificity, brevity, and concrete metrics over generic language.

## Key Concepts

- **Writing Style Rules**: No em dashes, no corporate filler, short paragraphs, specific over generic, numbers over adjectives, no exclamation marks
- **Core Technical Identity**: Hotel booking integrations, rate pipelines, GDS integrations, and data extraction pipelines
- **Key Experience Signal**: Kismet hospitality tech startup — integrated 7-8 booking engines (SynXis, iHotelier, Allora, AZDS)
- **Amadeus GDS Work**: PMS-first/Amadeus-fallback rate lookup logic, asyncio parallelization, Redis caching for sub-second responses
- **Data Pipeline Work**: BigQuery warehouse, GA4 export, session stitching, multi-signal attribution
- **Extraction Pipeline**: Playwright + GPT-4o pipeline with >95% field coverage across 10,000+ monthly extractions
- **MCP Tools Built**: searchHotels, getHotelRates, bookHotelOffer via NestJS/JSON-RPC over SSE
- **Academic Context**: NYU MS Computer Engineering, graduating May 2026
- **Outreach Channels**: Cold email to engineering managers, LinkedIn connection notes (300 char limit), LinkedIn DMs (150 word limit)
- **Apollo Search**: Used to pull recruiter and engineering manager emails at each target company

## Details

## Target Companies and Positioning

### 1. Sabre Hospitality Solutions (TPG) — Strongest Story
**Angle**: Direct SynXis integration experience from the client side at Kismet.
**Key Hook**: Worked with SynXis as one of 7-8 booking engines; asyncio-parallelized PMS adapters; Redis caching; AlloyDB persistence.
**Company Initiative Referenced**: SynXis Intelligent Retailing (SIP) modernization to microservices and cloud-native architecture.
**Target Titles**: Software Development Manager, Senior Software Engineer SynXis, Principal Software Engineer.

---

### 2. Amadeus — Direct GDS Experience
**Angle**: Built rate lookups directly against Amadeus GDS APIs.
**Key Hook**: PMS-first/Amadeus-fallback logic, asyncio parallelization, Redis caching; also worked across 7-8 booking engines normalizing heterogeneous rate data.
**Additional Signal**: BigQuery data warehouse with GA4 export, session stitching, multi-signal attribution.
**Target Titles**: Engineering Manager Hospitality, Software Development Engineer, Data Engineer.

---

### 3. Expedia Group — 2026 Grad Program
**Angle**: Applied to SDE I New Graduate 2026 program; recruiter follow-up email.
**Key Hook**: Booking engine integrations and data pipelines map directly to Marketplace/Supply or EPS teams.
**Specific Teams Mentioned**: Marketplace/Supply, Expedia Partner Solutions (EPS).
**Target Titles**: Technical Recruiter, University Recruiter, Engineering Manager, Senior SDE.

---

### 4. Airbnb — Search Infrastructure + Pricing
**Angle**: Search and booking infrastructure builder; eventual consistency, retry logic, schema normalization at scale.
**Key Hook**: Playwright + LLM extraction at >95% coverage; BigQuery attribution; unified rate/availability pipeline.
**Company Initiative Referenced**: Next-gen search platform including generative AI use cases.
**Target Titles**: Engineering Manager Search, Engineering Manager Pricing, Senior Software Engineer.

---

### 5. Booking.com — Compass Grad Programme
**Angle**: Applied to Compass Software Engineering Graduate Programme.
**Key Hook**: Supply/Connectivity team fit; MCP tools (searchHotels, getHotelRates, bookHotelOffer) via NestJS/JSON-RPC over SSE as analog to Connected Trip cross-product integration.
**Company Initiative Referenced**: Connected Trip vision.
**Target Titles**: Graduate Recruiter, Tech Recruiter, Engineering Manager Supply.

---

### 6. Hopper — ML-Driven Pricing
**Angle**: Rate pipelines and booking integrations; wrapping heterogeneous supplier systems behind clean APIs.
**Key Hook**: PMS adapters (OHIP, Mews Connector, SynXis) with schema normalization and retry logic across inconsistent data sources.
**Company Initiative Referenced**: Hopper Cloud B2B fintech suite.
**Target Titles**: Engineering Manager, Senior Software Engineer, ML Engineer.

---

### 7. KAYAK — Metasearch / Rate Aggregation
**Angle**: Rate aggregation and search systems across heterogeneous hotel distribution sources.
**Key Hook**: Playwright + GPT-4o scraping pipeline relevant to KAYAK's OTA price ingestion; unified rate normalization pipeline.
**Target Titles**: Software Engineering Manager, Senior Software Engineer, Data Engineer.

---

### 8. Travelport — GDS Modernization
**Angle**: GDS integration and booking pipeline experience; interest in large-scale platform modernization.
**Key Hook**: Direct Amadeus GDS API work; understands fragmentation challenges Travelport+ is solving.
**Company Initiative Referenced**: Travelport+ platform modernization — cloud-native, API-first distribution with NDC support.
**Target Titles**: Engineering Manager, Senior Software Engineer, Platform Engineer.

---

### 9. Tripadvisor — Content + Data at Scale
**Angle**: Data extraction and analytics pipelines; structured content at scale.
**Key Hook**: Playwright + GPT-4o pipeline at >95% field coverage, 10,000+ monthly extractions; BigQuery warehouse with session stitching.
**Scale Referenced**: 859M reviews, 463M monthly travelers.
**Target Titles**: Engineering Manager, Senior Software Engineer, Data Engineer.

---

### 10. Agoda — Data Engineering at Scale
**Angle**: Booking integrations and data pipelines; open to relocation.
**Key Hook**: 7-8 booking engines normalized, Amadeus GDS with PMS-first fallback, BigQuery warehouse with attribution logic.
**Target Titles**: Engineering Manager Pricing, Senior Software Engineer, Data Engineer.

---

## Apollo Search Strategy

Apollo is used to pull recruiter and engineering manager contact emails at each company using domain-based filtering and title targeting.

| Company | Domain | Priority Titles |
|---|---|---|
| Expedia Group | expediagroup.com | Technical Recruiter, University Recruiter, Engineering Manager, Senior SDE |
| Airbnb | airbnb.com | Engineering Recruiter, EM Search, EM Pricing, Senior SWE |
| Booking.com | booking.com | Graduate Recruiter, Tech Recruiter, EM Supply, Senior SWE |
| Sabre Hospitality | sabre.com | Technical Recruiter, Software Development Manager, Senior SWE SynXis, Principal SWE |
| Amadeus | amadeus.com | Recruiter Americas, EM Hospitality, SDE, Data Engineer |
| Hopper | hopper.com | Technical Recruiter, Engineering Manager, Senior SWE, ML Engineer |
| KAYAK | kayak.com | Technical Recruiter, SEM, Senior SWE, Data Engineer |
| Travelport | travelport.com | Technical Recruiter USA, Engineering Manager, Senior SWE, Platform Engineer |
| Tripadvisor | tripadvisor.com | Engineering Recruiter, Engineering Manager, Senior SWE, Data Engineer |
| Agoda | agoda.com | Technical Recruiter, EM Pricing, Senior SWE, Data Engineer |

---

## Template Format Standards

- **Email subject lines**: Role-specific, lead with function, reference company-specific tech or initiative
- **Email body**: 3-4 short paragraphs; open with function statement, follow with 2 concrete technical achievements with numbers, reference company-specific initiative, close with ask and graduation timeline
- **LinkedIn connection notes**: Hard 300-character limit; lead with specific technical credential, close with graduation and interest signal
- **LinkedIn DMs**: Under 150 words; sent after connection acceptance; expand on one technical point and make a soft ask
- **No**: exclamation marks, em dashes, phrases like 'I hope this finds you well', 'leverage', 'passionate', 'excited to'

## Related

- [[Rahil Singhi — Engineering Portfolio]]
- [[Kismet Hospitality Tech — Engineering Work]]
- [[Amadeus GDS Integration — Technical Notes]]
- [[SynXis Booking Engine Integration]]
- [[Playwright + GPT-4o Extraction Pipeline]]
- [[BigQuery Data Warehouse — Hotel Analytics]]
- [[MCP Tools — searchHotels bookHotelOffer]]
- [[NYU MS Computer Engineering 2026]]
- [[Job Search Strategy — May 2026 Graduation]]
- [[Apollo Email Outreach Workflow]]
- [[Writing Style Guide — Outreach Emails]]
- [[asyncio and Redis Caching — Rate Lookup Architecture]]
- [[PMS Adapters — OHIP Mews SynXis]]
