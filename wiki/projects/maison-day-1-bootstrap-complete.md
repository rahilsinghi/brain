---
title: Maison Day 1 — Bootstrap Complete
author: ai
created_at: 2026-04-17T02:02:07.678Z
last_ai_edit: 2026-04-17T02:02:07.678Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maison-day-1-bootstrap-complete-slack-update-sent-april-1776283708513.md]]"
tags:
  - bootstrap
  - infrastructure
  - monorepo
  - deployment
---

# Maison Day 1 — Bootstrap Complete

On April 15, 2026, the Maison monorepo was successfully bootstrapped and running locally, with all 8 services operational over HTTPS on local.maison-labs.com. Key tasks included fixing macOS compatibility issues and confirming service statuses through curl verification.

## Key Concepts

- Monorepo structure
- HTTPS service deployment
- macOS compatibility fixes
- Service status verification

## Details

### What Was Done
- Monorepo fully bootstrapped and running locally
- All 8 services up over HTTPS on local.maison-labs.com
- API, console, chat-window, login, docs, status, quality dashboard, renderer
- Fixed macOS compat issues: BSD sed + hardcoded nginx servers path
- Changes pushed to bootstrap/rahil branch

### What's Still Needed
- DB access: Neon connection string + Firebase service account
- Chat-window and Grafana dashboard may be partially dependent on DB

### Slack Update Sent
Posted in the Fredrik/Sandeep thread at 4:07 PM confirming bootstrap complete. Fredrik and Sandeep both have visibility.

### Actual Service Status (verified via curl)
- local.maison-labs.com/health: OK
- console: 302 (redirect to login — expected)
- login: 301 (redirect — expected)
- docs: 200
- status: 200
- quality: 307 (redirect — expected)
- local.maison.cx (demo): 502 (likely needs DB)
- dashboard (Grafana): 502 (likely needs DB/config)

### Hours
- Started: 1:00 PM
- Bootstrap complete + message sent: 4:07 PM
- ~3 hours of work (infrastructure setup + bootstrap)

**Source:** Slack thread screenshot + curl verification, April 15 2026

## Related

[[Maison]]
