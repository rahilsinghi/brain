---
status: processed
source_type: api
channel: claude-code
source_id: api/articles/maison-slack-dev-channel-engineering-context-march-apri-1776280441350.md
ingested_at: 2026-04-15T19:14:01.350Z
parsed_at: null
compiled_to: "[[Maison Slack #dev — Engineering Context (April 2026)]]"
processed_at: 2026-04-15T19:14:20.483Z
retry_count: 0
last_error: null
compile_progress: null
---



# Maison Slack #dev — Engineering Context
**Source:** Slack #dev channel (C07N7QQ9YUX)
**Retrieved:** April 15, 2026 — last 100 messages

## Critical Context

### Monorepo Migration (April 2026)
- Sandeep has been building the monorepo (`maison-agent`) for ~10 days as of April 10
- Goal: Deploy completely refactored agentic-built Maison to STG by end of weekend (April 12-13)
- Testing by Julia week of April 13 (regression testing, no new features)
- **Deployment to PROD: Monday April 20th** (later revised to Wed April 22)
- Every engineer working in Claude starting NOW

### Key Deployment Timeline
- April 10: Weekly Dev call — 125 minutes. Plan for next 10 days laid out
- April 13: Services deployed to test env. Pushing apps to test env
- April 15: "All pages deployed to test. Need to fix and optimize now." (Sandeep)
- Target: stg → prod deploy April 22

### GDPR Warning (April 14, Sandeep)
- Claude is NOT GDPR compliant
- Cannot use Claude to review EU hotel data
- Cannot use Claude with EU PMS APIs
- If EU hotel comes on, must use EU-based LLMs for reservation and PII

### Atomic QA Pairs Issue (April 10)
- Major issue: scraping logic change caused QA pair explosion
- Newbury Hotel went from 29 to 645 QA pairs after re-scrape
- Fredrik demanded changes be reverted
- Durgansh investigating QA pair generation and dedup

### OpenAI Token Spend Spike
- April 9 and 13 had unexplained OpenAI spend spikes
- Scraper for Indigo East End produced 30,000+ QA pairs = massive cost
- Root cause: scraper followed links outside target domain

### Linear Workflow Mandates (April 3, Fredrik)
- Mark tickets "Done" immediately upon production deployment
- All work on "Current Cycle" board, ticket order = priority
- Tickets must be atomic units of work (features, bugs)
- Test instructions as part of ticket for QA handover

### Branch Merging Chaos (March 31)
- Out-of-sync codebases between develop, release branches
- Changes in release 1.12 not in develop → broke prod deployment
- Created release 1.13 to work around
- Team must sync all changes to develop branch

### Key Features In Progress
- AI Visibility (AI Viz) — rearchitected from Playwright to OpenAI Agents SDK
- Website Sync — auto-scrape and diff
- Source Ingestion — document upload to KB
- Monorepo consolidation
- Python services migration to monorepo

### Grafana Dashboard
- Sandeep invited devs to Grafana dashboard (March 26)
- Connected all sources with proper access (read-only to prevent edits)
- Logs currently configured in test env only
- Prod and stg logging to follow

### Process Notes
- Devs should bootstrap monorepo locally and push fixes to named branches
- Use Docker files for local debugging Linux issues
- Local utils available for AWS ECS debug containers
- Confidential data must not be shared for training — double check credentials