---
status: processed
source_type: api
channel: claude-code
source_id: api/articles/maison-product-planning-meeting-april-16-2026-1776358468812.md
ingested_at: 2026-04-16T16:54:28.812Z
parsed_at: null
compiled_to: "[[Maison Product Planning Meeting - April 16, 2026]]"
processed_at: 2026-04-16T16:54:56.351Z
retry_count: 0
last_error: null
compile_progress: null
---



# Maison Product Planning Meeting — April 16, 2026

**Attendees:** Fredrik (CEO), Rahil (AI Engineer, Day 2), David (Sales, London), Jory (Sales, Croatia), Durgash (AI/Backend), Sandeep (via action items). Noel absent (working on Undasked scraper).

## Key Outcomes

### Rahil's Day 2 Onboarding
- Firebase credentials created with editor privileges for test environment
- Team intros completed — David handles sales demos, Jory has hotel tech background, Durgash does AI/backend with Masters from UK
- Fredrik asked Rahil to list feature ideas in Notion + Linear, use Claude Cowork connected to Slack/Notion/Linear

### Sales Agent 1.0 — Top Priority
- Core shift: reactive FAQ bot → proactive revenue-generating agent that drives direct bookings and upsells
- Hotels won't fire front desk staff for an FAQ bot, but will pay for conversion/upselling tools
- Direct booking saves hotels 20% commission vs OTA bookings
- Lead capture agent: detect group/event intent, collect info conversationally, trigger email to operator or push to CRM
- Promo code functionality: hotels create codes in booking engines, Maison deep-links with pre-populated codes
- Offers agent: detect guest intent/preferences, match with configured promotions
- Client admin interface: "sales agent" tab in admin flyout
- Fredrik created tickets for Sales Agent 1.0 — simple features shippable in days once dev setup is complete

### Rahil's 3 Feature Proposals (pitched and received well)

**1. GTM Attribution & Cookie-Based Session Intelligence**
- David called ROI attribution "our biggest problem"
- Rahil built this exact system at Kismet (6 months, production)
- Cross-domain tracking via /GL parameter, 90-day cookie window
- Enables: prove Maison ROI, returning visitor personalization, promo code transfer across domains
- Phase 1-2: 2-3 weeks

**2. Instagram Lead Generation Flow**
- Fredrik: "I want the full flow in Instagram DM, bypassing web chat entirely"
- Comment trigger → auto-DM → full conversation in Instagram DMs using Maison KB → deep link to booking
- Rahil built this at Kismet — Instagram identified as easiest lead gen channel
- Replicable to WhatsApp and Facebook once pattern works
- Phase 1: 2-3 weeks

**3. Conversational Payments (Stripe)**
- Fredrik: "Why the fuck do you need a booking engine?"
- Replace booking engine redirect with in-chat Stripe payments
- Maison already has PMS integrations + MCP tools, just missing payment capture
- Enables commission model: free chatbot, cut on transactions
- Foundation for Maison.Travel

### OHIP Certification (MA-879)
- Fredrik and Javed handling this — Rahil offered help but deprioritized for now
- Blocked since Feb 2026 on Publisher Account, Marketplace listing, UAT access

### Session Persistence & User Tracking
- Current: local storage session persistence within same site visit, no cross-session memory
- Proposed: GTM cookies for 90-day user journey, seed context for returning visitors
- Rahil has prior experience with this exact pattern (cross-domain /GL stitching)

### Omnichannel Strategy
- Vision: extend beyond web chat to WhatsApp, Instagram, Facebook, email
- Phase 1: WhatsApp + Instagram (easiest, most obvious)
- Guest comms (in-stay support) deprioritized as separate product area
- OTA integration discussed (Booking.com/Expedia messaging, similar to Runner competitor)

### Maison.Travel POC
- Travel app for East End of Long Island where Maison has existing clients
- Primary goal: build foundational content + booking + payments layer (not the consumer app)
- Foundations exposed via MCP to ChatGPT, TikTok, and other platforms
- Supports VC fundraising narrative — ambitious vision beyond web chat
- ~100 hotels in region (10-15 already done), make all bookable conversationally
- Everything must be MCP-compliant
- Rahil raised concern about prioritization — team agreed to focus on B2B foundations not B2C promotion

### Product Feature Updates
- Website sync: external URL scraping working in production, weekly auto-sync
- Source ingestion: DOC, PDF, Excel in addition to URLs
- PMS integrations: CloudBeds, Muse, StayNTouch, Opera Cloud
- Team working on monorepo refactoring, limiting bandwidth

### Action Items
- [ ] Sandeep: add client ID + dev docs to admin flyout
- [ ] David: find hotel with Synexis promo code for end-to-end demo
- [ ] Fredrik: schedule AR visibility meeting with David, Jory, potentially Rahil
- [ ] Team: create tickets for session persistence + GTM cookie implementation
- [ ] Rahil: push feature proposals to Notion + create Linear issues

## Notion Page Created
Rahil's Feature Proposals published at: https://www.notion.so/3448b6104b1d815fa899c70bb9590b5b
