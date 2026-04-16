---
status: processed
source_type: api
channel: claude-code
source_id: api/articles/maison-slack-pms-integration-pms-connectivity-status-1776280520735.md
ingested_at: 2026-04-15T19:15:20.735Z
parsed_at: null
compiled_to: "[[Maison PMS Integration Status]]"
processed_at: 2026-04-15T19:15:40.398Z
retry_count: 0
last_error: null
compile_progress: null
---



# Maison Slack #pms-integration — PMS Status
**Source:** Slack #pms-integration channel (C0A6CU2Q3LP)
**Retrieved:** April 15, 2026

## PMS Integration Status

### Cloudbeds — CERTIFIED
- Marketplace listing live
- Handles ARI (availability, rates, inventory)
- Supports packages, blackout dates
- Currency handling verified
- Disconnect flow documented

### Mews — CERTIFIED (March 31)
- Certification confirmed by email
- Javed handling implementation
- Issues: rate retrieval pagination (default Count=10), need to filter Private and AvailabilityBlock rates
- Limitation: only 3 months of UpdatedUtc range per API call
- Pilot properties: Haltia Lake Lodge, Hotel Le Concorde Quebec, Stanton, Victorian, Arthur, Mogotel

### StayNTouch — In Progress
- URL update deployed to prod
- Working on second pilot (Sound View Greenport)
- Javed and Sandeep maintaining

### Opera Cloud — In Progress
- Need tenant-specific URL (maisonlabs.ohip.oraclecloud.com)
- Javed handling. Fredrik asked for certification update by EOD (April 14)

### Think Reservations — Planning
- Main PMS used by Select Registry (250+ hotels)
- API docs shared: GET /api/hotels/{hotel_id}/availabilities/v2
- client_id must be "SelectRegistry"

### DerbySoft — Exploration
- For better ARI connectivity
- API overview shared

### Apaleo — Certification call held
- Not yet demo-ready

## Security Note (Feb 21, Sandeep)
- PMS config was exposed in getMessage API response → prompt injection risk
- Config must NOT be sent to browser
- Must be fetched during POST message call only
- Ticket created for fix

## Process (Sandeep)
- Create PMS integrations in STG env first
- Verify everything works, then apply to prod client
- Or use test client in prod to verify before applying to actual client