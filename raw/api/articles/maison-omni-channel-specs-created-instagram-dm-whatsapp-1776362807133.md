---
status: processed
source_type: api
channel: claude-code
source_id: api/articles/maison-omni-channel-specs-created-instagram-dm-whatsapp-1776362807133.md
ingested_at: 2026-04-16T18:06:47.134Z
parsed_at: null
compiled_to: "[[Maison Omni-Channel Specifications - April 2026]]"
processed_at: 2026-04-16T18:07:09.949Z
retry_count: 0
last_error: null
compile_progress: null
---



# Maison Omni Channel Specs — April 16, 2026

## What Was Created

Four Notion pages published under Product Plan, visible to entire Maison team:

1. **Instagram DM Integration (Phase 2a)** — Full spec: comment triggers, auto-DM, deep links with promo codes + UTM tracking, Meta Graph API architecture, 3 build sprints, session management, edge cases. Links to Sales Agent FRs (FR2/FR5/FR6/FR7/FR8).

2. **WhatsApp Native Meta API (Phase 2b)** — Proposes replacing Twilio with native Meta Graph API to unify transport layer with Instagram. Same webhook receiver, same token management, lower cost. Handles 24hr session window, template messages. 2 build sprints.

3. **Rahil's Feature Proposals** — 3 features: GTM Attribution (2-3 weeks), Instagram Lead Gen (2-3 weeks), Conversational Payments/Stripe (3-4 weeks). Connected pipeline diagram.

4. **Maison.Travel POC** — 4-layer architecture (content, booking, payments, MCP distribution). East End Long Island scope, ~100 properties. Links to Maison Exchange as enabling tech.

## Key Architecture Decision: Unified Meta Transport
Both Instagram and WhatsApp on Meta's Graph API instead of Twilio for WhatsApp. Single Maison Meta App, shared webhook receiver, shared token management. Fredrik handling Meta Developer Account.

## Omni Channel Epic Updated
Added Phase 2a/2b links + Apr 16 update note to the parent Omni Channel epic page.

## Post-Meeting with Fredrik (1pm call)
- Fredrik asked to spec Instagram + WhatsApp in 30 minutes — done
- He's creating Meta Developer Account
- Tomorrow's meeting: bring Maison.Travel plan
- Next steps: Linear tickets once Fredrik reviews specs
- Asked if specs should be posted to a team channel for broader visibility

## Notion URLs
- Instagram: https://www.notion.so/3448b6104b1d816885dee51336037782
- WhatsApp: https://www.notion.so/3448b6104b1d8100bb62c21fcce6abf9
- Feature Proposals: https://www.notion.so/3448b6104b1d815fa899c70bb9590b5b
- Maison.Travel: https://www.notion.so/3448b6104b1d81fa8cb0e88a686b1e3d
