---
title: Hospitality Tech Positioning
author: ai
created_at: 2026-04-08T14:25:52.441Z
last_ai_edit: 2026-04-08T14:25:52.441Z
last_human_edit: null
last_embedded_hash: null
sources:
  - career-datacenter/data/hospitality_positioning.yaml
tags:
  - positioning
  - hospitality
  - career
---


# Hospitality Tech Positioning

**Core:** Hospitality-tech engineer who ships integrations, tracking systems, and data pipelines for hotel operations

## Property Management Systems / Core Hotel Ops (PMS)

**Angle:** I build PMS integrations and hotel data pipelines

**Target companies:** Mews, Cloudbeds, Agilysys, Maestro PMS, Apaleo, Hotelogix, Stayflexi, Oracle Hospitality, RoomRaccoon

**Key deliverables:**
- Integrated OHIP rates and implemented PMS-first / Amadeus-fallback rate lookup
- Parallelized PMS adapters and Amadeus calls with asyncio; added Redis/local caching and persisted IDs to AlloyDB
- Built Playwright crawler + GPT-4o/Gemini tool-calling pipeline to convert hotel sites into schema.org/Hotel JSON-LD
- Designed target AlloyDB schema for multi-property hotel data

**Vocabulary:** PMS integrations, multi-property operations, property management, room inventory, reservation sync, housekeeping status, guest profiles, check-in/check-out flows

## Revenue Management & Pricing (RevMgmt)

**Angle:** I build data pipelines and analytics systems for hotel performance metrics

**Target companies:** Duetto, IDeaS, Lighthouse, Pace Revenue, Atomize, RateGain, BeyondPricing, Rainmaker

**Key deliverables:**
- Built backend APIs aggregating time-series metrics from BigQuery for performance reporting
- Designed GA4-export query patterns and summary tables; aligned schemas across hotels with inconsistent event structures
- Implemented multi-signal attribution logic using UTM source/medium, landing URLs, referrer constraints, and session stitching
- Built validation layers and guardrails to prevent breaking changes from upstream GTM/BE scripts

**Vocabulary:** revenue management, dynamic pricing, ADR (Average Daily Rate), RevPAR (Revenue Per Available Room), demand forecasting, pricing optimization, yield management, rate intelligence, competitive set analysis

## Guest CX / Messaging / AI Concierge (GuestCX)

**Angle:** I build AI-powered guest workflows and messaging systems

**Target companies:** Canary Technologies, HiJiffy, Maison, Conduit, Myma AI, Runnr.ai, ALICE, Kipsu, Zingle, OpenKey, Whistle

**Key deliverables:**
- Built Playwright + GPT-4o/Gemini tool-calling pipeline with >95% field coverage for hotel data extraction
- Wrapped extraction in FastAPI with webhooks + signed asset delivery; added live progress tracking inside sales portal
- Implemented cross-domain measurement across marketing site → booking-engine flows; standardized event conventions to preserve acquisition context
- Shipped MCP tools (searchHotels, getHotelRates, bookHotelOffer) with schemas + TS handlers (NestJS, JSON-RPC over SSE)

**Vocabulary:** guest messaging, virtual concierge, contactless check-in, guest engagement, upsell automation, pre-arrival communication, AI chatbot, guest journey, omnichannel messaging, WhatsApp/SMS integration

## Channel Manager / Booking Engine / Distribution (ChannelMgr)

**Angle:** I build booking integrations and multi-channel distribution systems

**Target companies:** SiteMinder, Availpro, Cubilis, BookingSync, D-EDGE, Vertical Booking, RMS Cloud

**Key deliverables:**
- Integrated external rate systems via NestJS handlers; exposed JSON-RPC interfaces over SSE for search/rates/booking actions
- Built Playwright crawler + tool-calling pipeline to extract and structure hotel availability/rates data
- Implemented cross-domain tracking to preserve booking source attribution through checkout
- Designed validation layers for rate data consistency across heterogeneous sources

**Vocabulary:** channel manager, OTA distribution, booking engine, inventory sync, rate parity, channel connectivity, distribution strategy, availability push, reservation import

## Data / Analytics / Business Intelligence (DataAnalytics)

**Angle:** I build data warehouses and analytics pipelines for hospitality operations

**Target companies:** Actabl, Hotel Effectiveness, Revinate, TravelClick, Knowland, STR, Kalibri Labs

**Key deliverables:**
- Built backend APIs aggregating time-series metrics from BigQuery; designed summary tables for reporting dashboards
- Designed GA4-export query patterns and standardized event schemas across hotels with inconsistent parameter types
- Implemented multi-signal attribution logic with UTM source/medium, landing URLs, referrer constraints, and session stitching
- Added guardrails and validation checks to prevent breaking changes; maintained JSON Schemas, data dictionaries, and change logs
- Produced system diagrams and runbooks; wrote incident notes/postmortems and SOPs for consent, retention, and webhook correlation

**Vocabulary:** data warehouse, BigQuery, ETL pipelines, business intelligence, performance dashboards, hotel analytics, KPI tracking, data modeling, schema design, reporting automation

## Payments / Accounting / Back Office (Payments)

**Angle:** I build payment workflows and backend integrations for hotel transactions

**Target companies:** Selfbook, Canary Technologies, Agilysys

**Key deliverables:**
- Wrapped extraction in FastAPI with webhooks + signed asset delivery
- Integrated external rate systems with NestJS handlers; exposed booking/payment flows via JSON-RPC
- Designed validation layers for transaction data consistency

**Vocabulary:** payment gateway, PCI compliance, payment processing, transaction reconciliation, payment workflows, secure payments, embedded payments

## Short-Term Rental / Property Ops (ShortTermRental)

**Angle:** I build operations platforms and automation for property management

**Target companies:** SuiteOp, BookingSync, Guesty, Hostfully

**Key deliverables:**
- Built backend APIs with validation layers for operational workflows
- Implemented task scheduling and team coordination logic
- Designed cross-domain tracking for booking flows and guest journeys

**Vocabulary:** property operations, task automation, cleaning schedules, maintenance tracking, turnover coordination, property management

## OTA / Travel Platform / GDS (OTA_TravelPlatform)

**Angle:** I build booking integrations, rate pipelines, and data systems for travel platforms

**Target companies:** Expedia Group, Booking.com, Agoda, Airbnb, Tripadvisor, KAYAK, Hopper, Travelport, Sabre, Amadeus

**Key deliverables:**
- Worked across 7-8 booking engines (SynXis, iHotelier, Allora, AZDS) normalizing rate and availability data into a unified schema
- Built Amadeus GDS rate lookups with PMS-first / Amadeus-fallback logic, asyncio parallelization, and Redis caching for sub-second responses
- Playwright + GPT-4o/Gemini tool-calling pipeline extracting structured hotel data (>95% field coverage, 10,000+ extractions/month)
- BigQuery data warehouse with GA4 export, session stitching, and multi-signal attribution across booking flows
- MCP tools (searchHotels, getHotelRates, bookHotelOffer) with NestJS handlers, JSON-RPC over SSE

**Vocabulary:** OTA distribution, GDS connectivity, rate shopping, availability search, booking engine, price comparison, metasearch, NDC (New Distribution Capability), supply aggregation, demand forecasting, conversion optimization, search ranking, marketplace engineering

## Marketing / Attribution / GTM (MarketingAttribution)

**Angle:** I build tracking infrastructure and attribution systems for hotel marketing

**Target companies:** Actabl, Revinate, TravelClick

**Key deliverables:**
- Implemented cross-domain GA4/GTM measurement across marketing site → booking-engine flows
- Standardized event + parameter conventions to preserve acquisition context through checkout
- Built multi-signal attribution logic using UTM source/medium, landing URLs, referrer constraints, session stitching
- Reduced misclassification risk in AI-Native vs AI-Search style traffic labels
- Designed validation layers to prevent breaking changes from upstream GTM scripts

**Vocabulary:** Google Analytics 4 (GA4), Google Tag Manager (GTM), cross-domain tracking, attribution modeling, conversion tracking, marketing attribution, UTM parameters, acquisition channels, session stitching
