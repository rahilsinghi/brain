---
status: processed
source_type: api
channel: claude-code
source_id: api/articles/maison-notion-qa-test-automation-full-guide-1776280313761.md
ingested_at: 2026-04-15T19:11:53.761Z
parsed_at: null
compiled_to: "[[Maison QA & Test Automation]]"
processed_at: 2026-04-15T19:12:32.387Z
retry_count: 0
last_error: null
compile_progress: null
---





# Maison QA & Test Automation
**Source:** Notion page "QA & Test Automation"
**Retrieved:** April 15, 2026

## System Overview
Maison uses an agentic, AI-driven QA system built on Playwright. Tests created by Claude, run from a web dashboard, results stored with screenshots and screen recordings. **No code needed to create or run tests.**

## Quality Dashboard URLs
- Local: local.maison-labs.com → Quality Dashboard
- Test: quality.test.maison-labs.com
- Staging: quality.stg.maison-labs.com
- Production: quality.maison-labs.com

Credentials: `QUALITY_ADMIN_EMAIL` / `QUALITY_ADMIN_PASSWORD` from .env file.

## Creating Tests
Describe to Claude in plain language. Example:
> "Create a new quality UI test. Steps: open the login page at the Maison Labs login URL. Verify the Maison wordmark is visible. Verify the wordmark changes between light mode and dark mode."

Tips: Be specific about steps, include credentials if needed, keep focused on one test.

Test suites live in `apps/quality/src/suites/` organized by type: smoke, functional, visual, api, data.

## Priority Test Areas (April 13)
- Client list page (first live in console)
- Login page (light/dark mode)
- Chat widget (load on demo sites, send/receive messages)
- Guest-facing flows (end-to-end guest experience)

## Key Dates
- Goal: comprehensive test suite ready by ~April 22 for stg → prod deploy
- Currently 194 test cases — need significantly more

## AI-Native Testing Strategy (Future)
1. Spec-to-test generation from Linear ticket ACs
2. Self-healing tests (auto-repair selectors/endpoints)
3. Intelligent test selection (AI analyzes diff, selects minimum test set)
4. Autonomous exploratory testing (AI navigates without scripts)

## Action Items (April 13)
- Sandeep: share env vars, fix Quality Dashboard stuck sessions, add git branch protection
- Julia: set up local environment, start creating tests for client list and login pages