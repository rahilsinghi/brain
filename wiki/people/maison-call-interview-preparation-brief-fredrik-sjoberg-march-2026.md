---
title: Maison Call — Interview Preparation Brief (Fredrik Sjoberg, March 2026)
author: ai
created_at: 2026-04-08T15:34:19.792Z
last_ai_edit: 2026-04-08T15:34:19.792Z
last_human_edit: null
last_embedded_hash: 99b7d3c71bd65c50
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/articles/maison-talking-points.md]]"
tags:
  - hospitality-tech
  - interview-prep
  - ai-agents
  - mcp
  - pms-integration
  - knowledge-graph
  - hotel-tech
  - agentic-distribution
  - nestjs
  - playwright
  - redis
  - bigquery
  - llm
  - tool-calling
  - maison
  - kismet
  - booking-engine
  - career
  - nyc
  - startup
---


# Maison Call — Interview Preparation Brief (Fredrik Sjoberg, March 2026)

A comprehensive preparation brief for a meeting with Fredrik Sjoberg, CEO/Founder of Maison (maison.cx), an AI-powered guest messaging and agent-native distribution platform for hotels. The brief covers the candidate's background in hospitality tech at Kismet, detailed explanations of technical projects built, and a deep analysis of Maison's product, traction, competitive landscape, and strategic thesis. The goal is to position the candidate as a strong fit for an engineering role focused on PMS integrations, knowledge graph infrastructure, and agentic distribution tooling.

## Key Concepts

- **Agent-Native Distribution:** Maison's thesis that hotel content must be structured for AI agents (not just human visitors) to discover, query, and book properties directly
- **Model Context Protocol (MCP):** Emerging standard for how AI agents interact with external services via structured function calls; candidate built MCP tools (searchHotels, getHotelRates, bookHotelOffer) at Kismet
- **PMS (Property Management System):** Core hotel operations software (e.g., Oracle OHIP, Mews, Cloudbeds); each uses different schemas and APIs requiring adapter layers
- **Knowledge Graph:** Maison's proprietary structured data layer encoding each hotel's rooms, amenities, policies, rates, and local info for AI consumption
- **Booking Engine Fragmentation:** The lack of standardization across hotel booking engines (iHotelier, SynXis, Allora, etc.) creating integration complexity
- **OHIP (Oracle Hospitality Integration Platform):** Oracle's hotel PMS API layer, one of several PMS integrations the candidate worked with
- **Playwright + LLM Tool-Calling Pipeline:** Automated data extraction system using headless browser crawling and structured LLM function calls to populate hotel data from messy websites
- **Bureaucratic Responsiveness Research:** Fredrik Sjoberg's academic work showing a 57% re-engagement increase from a successful first civic interaction — directly analogous to the AI concierge engagement flywheel
- **RevPAR / ADR / Occupancy:** Core hotel performance metrics tracked in the candidate's BigQuery/GA4 analytics pipeline
- **Agentic Commerce Infrastructure:** The broader framing of Maison as not just a chatbot but foundational infrastructure for AI-driven hotel discovery and booking in the post-Google era

## Details

## Candidate Background

The candidate is completing an MS in Computer Engineering at NYU (graduating May 2026) and spent the past year as a software engineering intern at Kismet, building backend hospitality tech infrastructure. Prior to Kismet, hospitality tech was entirely unfamiliar territory; the role provided deep hands-on exposure to PMS APIs, booking engines, channel managers, and the broader hotel tech stack.

---

## Technical Work at Kismet

### MCP Tools (searchHotels, getHotelRates, bookHotelOffer)
Three agent-callable endpoints enabling AI agents to interact with hotel booking systems via structured function calls. Built with NestJS, exposed via JSON-RPC over Server-Sent Events (SSE) for persistent streaming connections. Each tool carries typed input/output schemas. A Redis caching layer with short TTL reduces PMS API load during peak booking windows without serving dangerously stale rate data.

### Playwright + LLM Tool-Calling Pipeline
A data extraction pipeline that crawls hotel websites using Playwright (headless browser for JavaScript-heavy sites), captures rendered HTML and schema.org/JSON-LD structured data, then uses GPT-4o or Gemini with typed function schemas (extractRoomTypes, extractAmenities, extractPolicies, etc.) to produce structured output. Tool-calling rather than open-ended prompting reduced hallucination and achieved over 95% field coverage across diverse hotel website formats. Fallback logic handles booking engine iframes that are session-gated or require date selection before rates appear.

### PMS Adapter Parallelization
A Python asyncio system querying multiple PMS APIs (OHIP, Mews Connector API, Amadeus GDS) simultaneously via adapter classes that normalize responses into a consistent schema. Redis caching and AlloyDB (Google's PostgreSQL-compatible DB) handle rate data and cross-system property ID mapping respectively. Configurable fallback priority (e.g., fall back to Amadeus if OHIP is rate-limited) with stale-data flagging.

### BigQuery Data Warehouse + GA4 Attribution
ETL pipeline ingesting raw GA4 event data (nested JSON) from hotel websites into BigQuery. Transformation queries normalize inconsistent custom event parameters across properties into consistent fact tables. Session stitching connects first-touch attribution (e.g., Google ad) to eventual bookings across devices and sessions, powering dashboards tracking RevPAR, ADR, occupancy, booking velocity, and marketing attribution.

---

## Maison Product Overview

### Core Product (Today)
- JavaScript widget embedded on hotel websites
- AI concierge handles guest conversations across web chat, SMS, email, and voice
- Proprietary orchestration engine maintains multi-turn conversation context
- Proprietary knowledge graph structures hotel data (rooms, amenities, policies, rates, local recommendations)
- Hospitality-fine-tuned LLMs power natural language understanding
- Analytics dashboard surfaces guest query patterns, conversion rates, and engagement
- Cloudbeds PMS partnership confirmed; free tier available

### Strategic Vision (Tomorrow)
- Agent-native distribution layer making hotels discoverable and bookable by external AI agents
- Knowledge graph as the machine-readable structured data source for AI-driven hotel discovery
- Potential MCP server exposure enabling any AI assistant to query and book Maison-connected hotels

---

## Traction & Team
- 280+ properties activated in approximately 10 months (founded 2024)
- Properties span multiple continents; notable names include The Ameswell Hotel, The Maven Hotel, The Ozarker Lodge, Grand Suites Residences & Spa
- Won 2025 Best Tech Innovation from Independent Lodging Congress (ILC)
- Approximately 25 employees; headquartered in Brooklyn, NY
- No publicly disclosed funding rounds; likely bootstrapped or pre-seed/seed stage

---

## Fredrik Sjoberg Profile
- CEO/Founder of Maison; previously founded Nelson (nelson.management), an all-in-one PMS for small hotels
- PhD-level data scientist, NYU professor, and former practicing hotelier
- Published research: *"The Effect of Bureaucratic Responsiveness on Citizen Participation"* (Public Administration Review, 2017) — used Fix My Street data (n=399,364) to show a 57% increase in re-engagement probability following a successful first government interaction. This behavioral finding is the intellectual foundation of the AI concierge engagement flywheel thesis.
- Podcast: The Modern Hotelier, Episode 223 — argues traditional SEO is being displaced by AI-native discovery and hotels must structure data for AI agents

---

## Competitive Landscape Summary

| Company | Est. Funding | Scale | Key Differentiator |
|---|---|---|---|
| Maison | Undisclosed | 280+ properties | Agent-native distribution, knowledge graph, free tier |
| Akia | $12.4M Series A | Thousands | Deep PMS integration (Mews, Opera) |
| HiJiffy | ~$4M | 2,500+ hotels | Proprietary Aplysia AI, 130+ languages |
| Duve | $60M Series B | Enterprise (Accor, OYO) | 1M+ monthly comms, sentiment analysis |
| Canary | $50M+ | Large chains | Full guest management suite |
| Asksuite | ~$7M | 3,000+ | Omnichannel, strong booking engine integration |

Maison differentiates on: agentic infrastructure vision, knowledge graph vs. simple RAG, founder's unique profile, speed to market, free tier pricing, and independent hotel focus (~300K global TAM).

---

## Key Talking Points & Conversation Strategy
- Lead intro with the Kismet-to-hospitality origin story; keep it under 3 minutes
- Flip conversation to Fredrik early to learn what Maison actually needs
- Connect MCP tools directly to Maison's agent-native distribution thesis
- Reference the Fix My Street paper as evidence of deep research into Fredrik's thinking
- Reference The Modern Hotelier Episode 223 to demonstrate product-level engagement
- Target role framing: integration layer (PMS connectors), knowledge graph data pipelines, and eventual MCP server buildout
- Available June 2026; located in New York (Brooklyn HQ is convenient)
- Close with explicit interest signal and ask for next steps

## Related

- [[Model Context Protocol (MCP)]]
- [[Property Management System (PMS)]]
- [[Oracle OHIP API]]
- [[Mews Connector API]]
- [[Amadeus GDS Integration]]
- [[Cloudbeds PMS]]
- [[Playwright Web Automation]]
- [[LLM Tool-Calling (Function Calling)]]
- [[Redis Caching Patterns]]
- [[AlloyDB]]
- [[BigQuery Data Warehousing]]
- [[Google Analytics 4 (GA4)]]
- [[NestJS Framework]]
- [[Server-Sent Events (SSE)]]
- [[Agentic Commerce]]
- [[Hotel Knowledge Graph]]
- [[Booking Engine Fragmentation]]
- [[Independent Lodging Congress (ILC)]]
- [[The Modern Hotelier Podcast]]
- [[Public Administration Review]]
- [[Fix My Street Dataset]]
- [[Kismet (Hospitality Tech)]]
- [[Maison (maison.cx)]]
- [[Nelson SaaS (PMS)]]
- [[NYU Computer Engineering]]
- [[Fredrik Sjoberg]]
- [[Noel Panicker]]
