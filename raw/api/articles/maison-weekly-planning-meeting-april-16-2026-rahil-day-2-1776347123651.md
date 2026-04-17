---
status: processed
source_type: api
channel: claude-code
source_id: api/articles/maison-weekly-planning-meeting-april-16-2026-rahil-day-2-1776347123651.md
ingested_at: 2026-04-16T13:45:23.651Z
parsed_at: null
compiled_to: "[[Maison Weekly Planning Meeting — April 16, 2026]]"
processed_at: 2026-04-16T13:45:53.384Z
retry_count: 0
last_error: null
compile_progress: null
---



# Maison Weekly Planning Meeting — April 16, 2026 (8:00–9:30 AM ET)

**Attendees:** Fredrik Sjoberg (CEO), Sandeep Baynes (CTO), David McGloin (Sales, London), Jory (Sales, Croatia, hotel tech background), Durgansh (AI/Backend, Masters UK), Rahil Singhi (Day 2)
**Absent:** Noel (working on Undasked scraper for high-priority client)
**Recording/Notion:** https://www.notion.so/3448b6104b1d806ba054df36ad0be72e

## Key Outcomes for Rahil

### Firebase Access Granted
- Fredrik created Firebase user for Rahil on test project with **editor** privileges
- Rahil can now log into the Console at local.maison-labs.com/login

### Team Introductions
- David: Sales, London — handles demos, client onboarding, promo code configuration
- Jory: Sales, Croatia — decade in hotel tech, sell side
- Durgansh: AI/Backend engineer, Masters in AI & Robotics from UK
- Noel: Working on scraper, absent

### Rahil's Contributions (proactive, well-received)

**1. GTM Cookie Attribution System (major highlight)**
- Rahil shared his work from Kismet: a GTM-based tracking system that captures full 90-day attribution journey
- Tracks first touch → all touchpoints → booking conversion, including revenue, room nights
- Uses /GL parameter to correlate users between marketing site and booking engine
- GTM acts as mediator between hotel site and Maison
- Scripts injected via GTM read session cookies, correlate across domains, record bookings
- Fredrik's reaction: "I didn't realize right away I was so strong on attribution and ad tech" and "I'm slotting now Rahil as a domain expert"
- David validated: "Very helpful" — this solves their ROI attribution problem (their "biggest problem")
- This was 6 months of Rahil's work at Kismet, described as "one of my best achievements last year"

**2. Instagram Omnichannel Flow (detailed proposal)**
- Rahil described a working Instagram → booking flow from Kismet:
  - Hotel posts offer on Instagram, users comment trigger word
  - Instagram bot (powered by Maison) auto-DMs with offer details
  - Full conversation happens in Instagram DM using Maison's knowledge base
  - Final step: deep link to booking engine with pre-populated promo code and cookie context
- Fredrik loved it but insisted: "I want the full flow in Instagram DM, bypassing web chat entirely"
- Rahil confirmed this is doable
- Team agreed Instagram is easiest channel for lead gen, should be Phase 1 alongside WhatsApp

**3. Session Persistence / Cookie Tracking**
- Rahil asked about cookie-based user tracking — sparked major discussion
- Current state: Maison uses localStorage for same-session persistence, no cross-session memory
- Rahil proposed: use hotel's existing cookie policy + GTM to seed context for returning visitors
- Enables: personalization (remembering dietary preferences, names), promo code transfer to booking engine, attribution

**4. Stripe/Payments**
- Rahil mentioned researching Stripe MCP after a prior conversation with Fredrik
- Vision: conversational payments could replace booking engines entirely
- Fredrik: "Why the fuck do you need a booking engine?" if chat has ARI + payments

## Major Features Discussed

### Sales Agent (Major Priority)
- Shift from reactive FAQ bot → proactive revenue-generating agent
- **Lead Capture Agent**: detect booking intent, collect info conversationally (mimicking lead forms), trigger email/CRM
- **Promo Code Functionality**: hotels create codes in booking engines, Maison deep-links with pre-populated codes
- **Offers Agent**: detect guest intent + preferences, match to configured hotel offers
- David demoed existing promo code config on Deshon Lodge Moab client
- Fredrik created Linear tickets for Sales Agent 1.0 — "simple features that can ship in days"
- Client admin flyout will get a "Sales Agent" tab with easy config blocks

### Omnichannel Strategy
- Break out of web chat → WhatsApp, Instagram, Facebook, email, OTAs
- Phase 1: WhatsApp + Instagram (easiest, most active)
- Distinction: omnichannel (inbound, pre-stay) vs guest comms (in-stay support) — guest comms deprioritized
- OTA integration discussed (Runner does Booking.com + Expedia messaging)
- Competitors: HiJiffy, Runner, BookBoost all pushing omnichannel

### Maison.Travel POC
- Vision: travel app for discovering/booking hotels, but real goal is building foundational layers (content, booking, payments)
- Strategic purpose: expose via MCP to ChatGPT, TikTok, other platforms — not competing on consumer app
- Unique angle: Maison builds the content AND transactional layer (unlike MindTrip which builds on existing layers)
- POC scope: East End of Long Island — ~100 hotels, 10-15 already ingested, existing client base
- Sandeep: "Everything must be MCP compliant"
- Rahil raised valid concern about prioritization/marketing — team agreed: focus on B2B foundations, not B2C promotion
- Fredrik: "We're not fundraising for a web chat chatbot. We're fundraising for this."

### Product Feature Updates
- **Website Sync**: External URL scraping working in production, weekly auto-sync available in console
- **Source Ingestion**: Works with DOC, PDF, Excel + external URLs. Excel extracts facts (doesn't preserve exact Q&A)
- **Deduplication**: Reverted to previous version, new facts get priority
- **PMS Integrations**: CloudBeds, Muse, StayNTouch, Opera Cloud currently integrated

## Action Items
- Sandeep: add client ID and developer docs link to admin flyout
- David: find hotel with Synexis promo code for full end-to-end booking demo
- Fredrik: schedule separate meeting on AR visibility with David, Jory, potentially Rahil
- Team: create tickets for session persistence and GTM cookie implementation

## Context for Rahil's Positioning
- Fredrik explicitly positioned Rahil as "domain expert" in attribution/ad tech
- Rahil's GTM attribution work and Instagram omnichannel flow were the strongest contributions
- Fredrik noted these are critical for fundraising narrative and competitive differentiation
- Rahil is being considered for work on Maison.Travel foundations while Sandeep finishes monorepo setup
- The team values Rahil's "verified potential" — things he's actually built and shipped before
