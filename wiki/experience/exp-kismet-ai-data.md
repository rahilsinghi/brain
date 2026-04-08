---
title: Kismet — AI / Data Engineering Intern
author: ai
created_at: 2026-04-08T14:25:52.435Z
last_ai_edit: 2026-04-08T14:25:52.435Z
last_human_edit: null
last_embedded_hash: null
sources:
  - career-datacenter/data/experience.yaml#exp_kismet_ai_data
tags:
  - experience
  - kismet
  - python
  - playwright
  - gpt-4o
  - gemini-api
  - fastapi
---


# Kismet — AI / Data Engineering Intern

**2025-05 – 2025-07** · Remote

## Overview

Built end-to-end AI-powered web scraping pipeline for hotel data extraction, rate/booking integrations, and SEO optimization. Owned deployment, caching, database design, and technical documentation.

## Key Achievements

- Built Playwright crawler + GPT-4o/Gemini tool-calling pipeline to convert hotel sites into schema.org/Hotel JSON-LD; captured >95% of required fields
- Wrapped extraction in FastAPI with webhooks + signed asset delivery; added live progress tracking inside the sales portal
- Integrated OHIP rates and implemented PMS-first / Amadeus-fallback rate lookup; shipped MCP tools (searchHotels, getHotelRates, bookHotelOffer) with schemas + TS handlers (NestJS, JSON-RPC over SSE)
- Parallelized PMS adapters and Amadeus calls with asyncio; added Redis/local caching and persisted IDs to AlloyDB to cut geo-search duplication + latency
- Deployed on AWS EC2/RDS then migrated containers to Cloud Run; used Supabase Postgres and designed the target AlloyDB schema
- Injected Hotel/FAQPage JSON-LD into NLWeb templates (48% lift in rich-result impressions) and authored internal runbooks for architecture + deployments

## Tech Stack

Python, Playwright, GPT-4o, Gemini API, FastAPI, NestJS, TypeScript, Redis, PostgreSQL (Supabase), AlloyDB, AWS EC2/RDS, Google Cloud Run, Docker, JSON-LD/schema.org, asyncio, JSON-RPC, SSE

## Related

- [[exp-kismet-tracking]] — Computer Engineering Intern (Tracking Engineer)
