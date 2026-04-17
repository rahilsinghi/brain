---
status: processed
source_type: api
channel: claude-code
source_id: api/articles/maisontravel-poc-vision-strategy-and-technical-plan-1776358562046.md
ingested_at: 2026-04-16T16:56:02.046Z
parsed_at: null
compiled_to: "[[Maison.Travel Strategic Vision and Technical Plan]]"
processed_at: 2026-04-16T16:56:49.426Z
retry_count: 0
last_error: null
compile_progress: null
---



# Maison.Travel POC — Vision, Strategy, and Technical Plan

## The Vision
A guest-facing travel web app for the East End of Long Island. Users discover and book hotels/experiences conversationally. But the consumer app is NOT the product — the foundational layers underneath are.

## Strategic Purpose

### Why Build a Travel App?
1. **Build the enabling layer, not the app** — content ingestion, booking connectivity, and payments that can be exposed to ChatGPT, TikTok, and other platforms via MCP
2. **VC fundraising narrative** — investors want ambitious vision, not just web chat improvements. "We're building the transactional layer for AI-native hospitality commerce" is a fundraising story
3. **Not competing on travel app** — competing on the enabling infrastructure. MindTrip and others built on existing data layers. Maison is building its own content + transactional layer
4. **Supplier self-service** — individual hotels, vineyards, experience providers sign up and manage their own content for free. This is the moat

### What Makes Maison.Travel Different from MindTrip?
- MindTrip built on top of existing aggregators (Sabre, PayPal). If that data layer changes, they're exposed
- Maison is building the content and transactional layer itself
- Individual suppliers can sign up and own their content
- Everything is MCP-compliant — any AI platform can consume it

## POC Scope: East End of Long Island

**Why this region:**
- Maison already has clients there (10-15 hotels onboarded)
- ~100 total hotels in region
- Concentrated geography makes connectivity feasible
- Real clients = real validation

**POC deliverables:**
1. Ingest all ~100 hotels in the region
2. Make all hotels bookable conversationally
3. Build connectivity to PMSs already used in the region
4. Experiences layer (restaurants, vineyards, activities)

## Technical Architecture

### Core Layers (what Maison.Travel actually builds)

**1. Content Layer**
- Hotel profiles: rooms, amenities, policies, images, descriptions
- Experience profiles: restaurants, spas, activities, tours
- Ingestion: automated scraping + supplier self-service portal
- All content structured for AI consumption (not just human-readable)

**2. Booking/Connectivity Layer**
- PMS integrations for live ARI (availability, rates, inventory)
- Currently: CloudBeds, Muse, StayNTouch, Opera Cloud
- Need: additional PMSs used in East End region
- MCP tools: searchHotels, getHotelRates, bookHotelOffer

**3. Payments Layer (Stripe)**
- Conversational payment capture (no booking engine redirect)
- Commission model: free for suppliers, Maison takes cut on transactions
- Payment links for simple flow, Stripe Elements for embedded

**4. MCP Distribution Layer**
- Everything exposed as MCP-compliant tools
- ChatGPT plugin: "Find me a pet-friendly hotel in Montauk for next weekend"
- TikTok/Instagram: conversational booking from social content
- Any AI platform can integrate

### How It Connects to Existing Chatbot

```
Existing Chatbot (web widget)     Maison.Travel (web app)
         │                                │
         └────────── Shared ──────────────┘
                       │
            ┌──────────┼──────────┐
            │          │          │
         Content    Booking    Payments
         Layer      Layer      Layer
            │          │          │
            └──────────┼──────────┘
                       │
                  MCP Tools API
                       │
            ┌──────────┼──────────┐
            │          │          │
         ChatGPT   TikTok    Instagram
         Plugin    Commerce   DM Bot
```

**Key insight:** Every piece built for the chatbot's sales agent (promo codes, lead capture, offers) is immediately reusable in Maison.Travel. And vice versa — content ingested for Travel enriches the chatbot.

## Implementation Priority

Fredrik was clear: focus on **foundations that immediately benefit the existing chatbot**, not on promoting a consumer travel app.

1. **Content ingestion pipeline** — benefits chatbot KB + Travel
2. **Booking layer + PMS connectivity** — benefits chatbot upselling + Travel
3. **Payments (Stripe)** — benefits chatbot conversion + Travel
4. **Travel web app UI** — last priority, mostly for demos and VC narrative
5. **MCP distribution** — once layers exist, exposure is incremental

## Rahil's Concern (Raised in Meeting)
Expressed concern about prioritization given limited team bandwidth and marketing/reach challenges for a consumer travel app. Team agreed: focus on B2B foundations, not B2C consumer app promotion. The Travel app is a vehicle for building and demonstrating the layers, not a consumer product to market.

## URL
maison.travel (live, POC stage)
