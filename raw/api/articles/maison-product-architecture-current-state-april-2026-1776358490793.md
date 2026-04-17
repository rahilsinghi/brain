---
status: processed
source_type: api
channel: claude-code
source_id: api/articles/maison-product-architecture-current-state-april-2026-1776358490793.md
ingested_at: 2026-04-16T16:54:50.793Z
parsed_at: null
compiled_to: "[[Maison Product Architecture - Current State (April 2026)]]"
processed_at: 2026-04-16T16:55:23.343Z
retry_count: 0
last_error: null
compile_progress: null
---



# Maison Product Architecture — Current State (April 2026)

## What Maison Is
AI-powered hotel chatbot platform. Hotels embed Maison widget on their website. The AI agent answers guest questions using the hotel's knowledge base (scraped from website + uploaded docs).

## Current Stack
- **Monorepo:** maison-agent
- **API:** api.maison-labs.com (test/stg/prod environments)
- **PMS Integrations:** CloudBeds, Muse, StayNTouch, Opera Cloud
- **Knowledge Base:** Website scraping (weekly auto-sync) + document upload (DOC, PDF, Excel)
- **Chat Widget:** Embedded iframe on hotel websites, local storage for session persistence
- **Admin Console:** Business console with flyout for client configuration
- **Firebase:** Used for some infrastructure (Rahil given editor privileges for test env)

## What Works Today
- Web chat with hotel KB
- Promo code messaging via client config prompts
- External URL scraping in production
- Source deduplication (new facts prioritized over old)
- PMS integrations for availability/rates
- MCP tools: searchHotels, getHotelRates, bookHotelOffer

## What's Missing / Being Built
- **Sales Agent 1.0:** Proactive revenue behaviors (lead capture, offers matching, promo deep links) — tickets created by Fredrik
- **ROI Attribution:** Can't prove how many bookings Maison generates — "biggest problem" per David
- **Omnichannel:** Only in web chat iframe. Need WhatsApp, Instagram, Facebook, email
- **Cross-session memory:** No returning visitor context without login
- **Conversational payments:** Redirect to booking engine loses users
- **OHIP Certification:** Opera Cloud integration blocked since Feb
- **Maison.Travel:** POC for East End Long Island — foundational content + booking layer exposed via MCP

## Key URLs
- maison-labs.com — API and internal tooling
- maison.cx — marketing/brand site
- maison.travel — guest-facing travel app (POC)

## Competitors Mentioned
- HiJiffy, Runner, BookBoost — all pushing omnichannel
- MindTrip — travel app (partnered with PayPal/Sabre) but built on existing data layers, not their own
