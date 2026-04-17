---
status: processed
source_type: conversation
ingested_at: 2026-04-16T20:00:00.000Z
parsed_at: 2026-04-16T20:00:00.000Z
compiled_to: "[[Daily Digest — Thursday April 16, 2026]]"
processed_at: 2026-04-16T20:38:17.339Z
retry_count: 0
last_error: null
compile_progress: null
---



# Daily Digest — Thursday April 16, 2026

## Summary

Day 2 at Maison, and a significant one: Rahil presented three feature proposals to the full team in the weekly planning meeting, was positioned by Fredrik as a domain expert in attribution and adtech, and published four Notion specs within hours of the call. Concurrently, the brain repo saw substantial engineering work — relay fixes, two new auto-ingestion sources (Calendar + Slack), and embedding quality improvements landed by end of day.

## Meetings

### Maison Weekly Planning Meeting (Morning)
**Attendees:** Fredrik Sjoberg (CEO), Rahil, David McGloin (Sales, London), Jory (Sales, Croatia), Durgash (AI/Backend)
- Rahil received Firebase editor access to test environment (`local.maison-labs.com/login`)
- Full team introductions: David runs sales demos, Jory has hotel tech background, Durgash has Masters in AI & Robotics from UK. Noel absent (working on high-priority scraper client)
- **Fredrik framing:** Positioned Rahil as a "domain expert" in attribution and adtech — cited GTM work at Kismet as a competitive differentiator and fundraising asset
- Fredrik's ask: Document all ideas in Notion and Linear; use Claude Code / Cowork for Slack/Notion/Linear integration

### Maison Product Planning Meeting (Afternoon)
**Same attendees** — deeper dive on priorities and feature proposals

**Sales Agent 1.0 — confirmed top priority:**
- Shift from reactive FAQ bot to proactive revenue-generating agent
- Goals: drive direct bookings (save hotels 20% vs OTA commissions), capture group/event leads, surface offers matching guest preferences
- Lead Capture Agent: detects intent, collects info conversationally, triggers email/CRM
- Promo Code: hotels create codes in booking engines, Maison deep-links with pre-populated promo + cookie context
- Admin flyout: new "Sales Agent" tab with config blocks
- Linear tickets created for Sales Agent 1.0 (simple, ship-in-days scope)
- David demoed existing promo code config on Deshon Lodge Moab client

### 1pm Post-Meeting with Fredrik
- Fredrik confirmed Instagram + WhatsApp specs completed within his 30-minute ask
- Fredrik is creating the Meta Developer Account for unified Instagram/WhatsApp integration
- Next: prepare Maison.Travel POC plan for tomorrow's meeting
- Fredrik to review specs before Rahil creates Linear tickets

## Slack Highlights

*Note: Slack MCP requires OAuth authentication — could not be accessed in this automated run. Key decisions and communications are captured via brain ingestion above.*

## Work Completed

### Maison (Day 2 — new job)
- **3 Feature Proposals presented** in morning planning meeting (GTM Attribution, Instagram Lead Gen, Conversational Payments)
- **4 Notion pages published** post-meeting within ~30 minutes:
  1. Instagram DM Integration spec (Phase 2a) — comment triggers, auto-DM, Meta Graph API architecture, 3-sprint build plan, UTM tracking, session management, deep links
  2. WhatsApp Native Meta API spec (Phase 2b) — replace Twilio with Meta Graph API, unified transport with Instagram, estimated 2 sprints
  3. Rahil's Feature Proposals — GTM Attribution (2-3 wks), Instagram Lead Gen (2-3 wks), Conversational Payments/Stripe (3-4 wks), connected pipeline diagram
  4. Maison.Travel POC — 4-layer architecture (content, booking, payments, MCP distribution), East End of Long Island scope (~100 properties, 10-15 existing clients)
- **Key architecture decision:** Unified Meta transport layer for both Instagram and WhatsApp — single Maison Meta App, shared webhook receiver, unified token management. Replaces Twilio for WhatsApp.
- **Notion page:** Feature proposals published at `https://www.notion.so/3448b6104b1d815fa899c70bb9590b5b`

### Brain Repo Engineering

**Relay fixes (morning):**
- `fix(relay): re-register Telegram webhook on daemon boot in relay mode` — ensures relay re-registers webhook every time daemon restarts, preventing stale webhook registrations
- `fix(relay): execute real command handlers in sync loop + 15s poll interval` — relay sync loop now executes actual command handlers (ingest, query, timesheet, voice) instead of no-ops; added 177 lines to `src/relay/sync.ts`

**New auto-ingestion sources (afternoon, merged from `feat/timesheet-phase3-4-invoices-mcp`):**
- `feat: Calendar + Slack auto-ingestion sources`
  - **Calendar source** (`src/sources/calendar.ts`): multi-account support (personal + Maison workspace), Google Calendar API via googleapis (same OAuth2 pattern as Gmail), smart filtering by color ID and title keywords (#private, SKIP), generalized Google auth (`src/sources/google-auth.ts`), auth script `pnpm calendar:auth -- --account personal|maison`, 11 tests
  - **Slack source** (`src/sources/slack.ts`): polls messages sent by user + messages mentioning user, two searches merged + deduped by channel-ts, channel exclusion list for noise filtering, auth script `pnpm slack:auth`, 10 tests
  - Both wired into hourly cron alongside GitHub/Gmail/Graphify

**Embedding + query quality (late afternoon, branch `feat/brain-quality-improvements`):**
- `fix(query): improve synthesis prompt for table/structured data extraction` — old prompt refused to answer from tables/structured formats; new prompt instructs LLM to extract from any format, prefer partial answers over refusals
- `feat(embedder): finer chunking at ### headings + 500-word max guard` — split chunks at `###` headings (not just `##`), 500-word max with paragraph-boundary splitting, breadcrumbs now include h2→h3 path (e.g., "Title → Section → Subsection")

**System activity:**
- Nightly lint (03:00): 12,060 issues flagged, 15 healed; 15 format-issue proposals written to `proposals/` for git-activity wiki files
- Source sync (16:00): 2 emails ingested, 0 GitHub items, 0 graphify drops

## Timesheet

*Note: No wiki/timesheet/ entries found — timesheet data may be stored in daemon memory or not yet compiled. Hours below are estimated from activity.*

- **Maison:** ~6h (onboarding, planning meeting, product meeting, 4 Notion specs)
- **Brain/personal:** ~4h (relay fixes, Calendar/Slack sources, embedding quality improvements)

## Decisions Made

1. **Unified Meta transport for Instagram + WhatsApp** — use single Meta Graph API instead of Twilio for WhatsApp. Fredrik owns Meta Developer Account setup. Rationale: lower operational cost, shared webhook/token management.
2. **Sales Agent 1.0 is top priority at Maison** — proactive revenue agent over reactive FAQ bot. Direct booking saves hotels 20% OTA commission.
3. **Maison.Travel POC scope set** — East End of Long Island, ~100 properties, 10-15 existing Maison clients. Focus B2B foundations (content + booking + payments + MCP layer) over B2C app promotion.
4. **Chunking at `###` level** in brain embedder — finer granularity improves retrieval precision, especially for deeply nested wiki articles.
5. **Synthesis prompt fix** — brain was refusing to answer questions extractable from tables. Fixed to prefer partial answers over refusals.

## Action Items

- [ ] **Rahil:** Create Linear tickets for GTM Attribution, Instagram Lead Gen, Conversational Payments after Fredrik reviews Notion specs
- [ ] **Rahil:** Prepare Maison.Travel POC plan for Friday meeting with Fredrik
- [ ] **Fredrik:** Set up Meta Developer Account for unified Instagram/WhatsApp transport
- [ ] **Sandeep:** Add client ID + developer docs to admin flyout
- [ ] **David:** Find hotel with Synexis promo code for end-to-end booking demo
- [ ] **Fredrik:** Schedule AR visibility meeting with David, Jory, (Rahil?)
- [ ] **Team:** Create Linear tickets for Session Persistence + GTM Cookie Attribution implementation
- [ ] **OHIP Certification (MA-879):** Blocked since Feb 2026 (Publisher Account + Marketplace + UAT). Fredrik + Javed handling. Deprioritized.

## Connections

- Today's Maison omnichannel work connects directly to **[[Telegram Relay Bot]]** — the pattern of multi-channel message routing (Telegram → relay → daemon) is identical to what Instagram DM and WhatsApp will implement through Maison's unified Meta transport
- GTM Attribution proposal at Maison mirrors **[[Session Persistence & User Tracking]]** — the `/GL` cross-domain stitching and 90-day cookie window Rahil built at Kismet
- Calendar source added to brain today enables **[[Phase 3b (Calendar)]]** — the long-deferred Google Calendar auto-ingestion source is now complete
- Slack source added to brain closes the loop on today's Maison standup data — future daily digests can read Slack activity automatically
- Finer embedding chunking improves recall for **[[Graphify Phase 4 (Embeddings + Query)]]** — community-level wiki articles with deep `###` sections will now embed more precisely
- Maison.Travel POC's MCP distribution layer conceptually mirrors **[[Graphify On-Demand]]** — both expose structured data (hotel content vs. code graph) via standardized protocol interfaces

## Tags

maison, brain, relay, embedder, calendar, slack, ingestion, omnichannel, instagram, whatsapp, meta-api, gtm, attribution, sales-agent, maison-travel, poc, day-2, onboarding, fredrik-sjoberg, daily-digest
