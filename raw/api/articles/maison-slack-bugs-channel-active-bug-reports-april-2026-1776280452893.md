---
status: processed
source_type: api
channel: claude-code
source_id: api/articles/maison-slack-bugs-channel-active-bug-reports-april-2026-1776280452893.md
ingested_at: 2026-04-15T19:14:12.893Z
parsed_at: null
compiled_to: "[[Maison Bug Reports]]"
processed_at: 2026-04-15T19:44:56.599Z
retry_count: 0
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca66CkVpwtz1CPyitDFzu"}
compile_progress: null
---





# Maison Slack #bugs — Active Bug Reports
**Source:** Slack #bugs channel (C07PH5JEMJA)
**Retrieved:** April 15, 2026

## Critical Bugs (April 15)
- **Site loading errors resolved** (Sandeep, April 15)
- **10+ bugs on current Linear cycle** — Fredrik flagging critical period as travel season picks up
- **Prod problem creating new client** — Fredrik hit error creating client (April 15)
- **Can't add website while creating new client** — Durgansh reported (April 15)
- **STG BC logs out when adding user** — Fredrik trying to add Rahil as user on stg.maison-labs.com/console/users (April 15)

## Recurring Issues
- **Scrape failures** — Multiple clients failing to scrape. Tracked on MA-815
- **Hallucination** — Webchat referenced hotel not in KB (Grand Hacienda → "El Monte Sagrado Resort")
- **Cloudbeds pricing bug** — Mixed up per-night vs full-stay total (MA-918). Client Rachel Flatley at Hotel Moraine reported twice
- **Chat stalling** — 40s+ response times on new go-live (leParc Suites / Springboard Hospitality). Canceled.
- **Bot re-asks for guest count** — During live Park Lane demo
- **BC Clients page slow** — Due to rendering all clients without pagination
- **Theme page delete** — Deleting visual has no effect
- **UTM override** — Silently breaking booking links for clients

## Bug Reporting Process (from channel description)
1. Create ticket in Linear using bug template
2. Copy link to that ticket
3. Start thread in #bugs with link to Linear ticket
4. Keep conversation in thread