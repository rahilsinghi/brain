---
title: "Maison — Workspace Hub"
author: ai
created_at: 2026-04-14T22:00:00-04:00
last_ai_edit: 2026-04-14T22:00:00-04:00
last_human_edit: null
last_embedded_hash: null
sources: ["brain-synthesis", "stumptown-meeting-2026-04-14", "gmail-threads", "timesheet-tracker"]
tags: ["maison", "workspace", "hub", "active-engagement"]
---

# Maison — Workspace Hub

> This is the single source of truth for Rahil's engagement with Maison Labs. Every Claude session working on Maison repos should query this first via `brain_query "maison workspace"`.

## Engagement Overview

| Field | Value |
|-------|-------|
| **Company** | Maison Labs, Inc. |
| **Role** | AI Engineer (Independent Contractor → Full-Time) |
| **Start Date** | Wednesday, April 16, 2026 |
| **Trial Period** | April 16 – May 15, 2026 |
| **Full-Time Start** | June 22, 2026 (OPT EAD activation) |
| **Rate (Trial)** | $50/hr, 20 hrs/week cap |
| **Rate (Full-Time)** | $8,000/month (renegotiated Apr 14 from $7K) |
| **Equity** | 0.10% fully diluted, 4-year vest, 1-year cliff |
| **Structure** | 1099 contractor during trial, W-2 target for full-time |
| **Non-Compete** | 12 months hospitality guest-agent (6-month counter pending) |
| **Protection** | Accrued trial pay paid out if full-time doesn't materialize (verbal agreement Apr 14) |

**Contract documents received Apr 13:** "Contract for Fractional Engineer" + "Offer Letter - Rahil Singhi - AI Engineer"

## People

| Name | Role | Contact | Notes |
|------|------|---------|-------|
| **Fredrik Sjoberg** | CEO & Founder | fredrik@maison.cx | Primary contact. Swedish. Direct communicator. Met at Stumptown Apr 14. |
| **Noel Panicker** | Co-Founder, Agent Engineer | noel@maison.cx | Building the agent layer. On initial Mar 22 call. |
| **Sandeep Baynes** | Co-Founder, CTO | sandeep@maison.cx | Ad tech placement. Onboarding call Apr 8. |

## Product Vision

**Maison.travel** — AI-native travel app for hyper-personalized hotel recommendations and direct booking.

**Core thesis:** Present publicly as "just a chatbot for hotels" to avoid OTA threat perception. Long-term: become API-first infrastructure company providing knowledge graph + connectivity to LLM services (OpenAI, Claude).

### Two Technical Components

**1. Knowledge Graph (Rahil's primary scope)**
- Graph RAG architecture replacing traditional RAG
- Agents pull context from graph nodes at ~100 tokens vs ~1,000 from full DB queries
- Booking agents, rate-check agents, discoverability agents all fed by the graph
- Target: working app by August 2026

**2. Transaction Layer**
- PMS integrations: ARI read complete, write is trivial
- Current flow: agent recommends hotel → user clicks link → browser automation opens hotel site with personalized coupon code (avoids regulatory issues)
- Native in-app booking is the longer-term goal
- Aggregator partnerships: Derbysoft, Nuite, Travelport (demo calls done, API access started)

### Team Responsibilities
- **Rahil:** Knowledge graph + transaction layer
- **Noel:** Agent layer
- **Sandeep:** Ad tech placement

**Major milestone:** Preferred Hotels commercial contract confirmed (Apr 14). Described as world's largest hotel group.

## Timeline

| Date | Event |
|------|-------|
| Mar 22 | Initial call (Rahil + Fredrik + Noel) |
| Mar 27 | Hourly engagement offered |
| Mar 29 | Onboarding call, structure agreed |
| Apr 5 | Rate finalized: $50/hr, 20hr cap |
| Apr 8 | Sandeep technical call, offer letter requested |
| Apr 10-12 | Two-document structure proposed (offer + trial contract) |
| Apr 13 | Contracts received. 1099 structure confirmed. |
| Apr 14 | Stumptown meeting. Rate renegotiated to $8K/mo FT. Preferred Hotels deal confirmed. |
| **Apr 16** | **Day 1 — start coding** |
| May 15 | Trial period ends |
| May 18 – Jun 22 | Travel period (async only) |
| Jun 22 | Full-time start (OPT EAD) |
| Aug 2026 | Working app target |

## Immigration Notes

- Currently on F-1 OPT (initial 12-month period)
- STEM OPT extension requires W-2 + E-Verify from employer
- Maison has no W-2 employees yet — Rahil flagged this as a blocker for STEM OPT
- H1B filing threshold: $103K base (year-two commitment discussed)
- Offer letter structured for USCIS paperwork purposes

## Connected Repos

> Update this section as you clone Maison repos. Run `brain-connect <path>` for each.

| Repo | Path | Status | Graphified |
|------|------|--------|------------|
| *Maison monorepo* | TBD (clone Apr 16) | Pending | No |
| *maison.travel app* | TBD (clone Apr 16) | Pending | No |

### Onboarding Checklist (Apr 16)
```bash
# 1. Clone repos (get URLs from Fredrik/Sandeep)
git clone <monorepo-url> ~/Desktop/maison
git clone <travel-app-url> ~/Desktop/maison-travel

# 2. Connect each to brain (one command per repo)
brain-connect ~/Desktop/maison
brain-connect ~/Desktop/maison-travel

# 3. Add local paths to timesheet config
# Edit ~/.../brain/.brain/timesheet-config.yaml
# Under maison.repos, add:
#   - ~/Desktop/maison
#   - ~/Desktop/maison-travel

# 4. Log first hours
pnpm --dir ~/Desktop/brain timesheet log --employer maison --hours 2 --desc "Onboarding + repo setup"

# 5. Verify graphify (wait ~10 min after brain-connect)
open https://brain.rahilsinghi.com/?focus=project:maison&depth=2
```

## Hour Tracking

Timesheet tracker is active (built Apr 14). SQLite-backed, integrated into brain daemon.

| Command | What it does |
|---------|-------------|
| `pnpm timesheet log --employer maison --hours N --desc "..."` | Log hours manually |
| `pnpm timesheet status` | Current week summary |
| `pnpm timesheet status today` | Today's breakdown |
| `pnpm timesheet status week` | Day-by-day matrix |
| `pnpm timesheet backfill --since 2026-04-16` | Scan git history |

**Auto-scanning:** Every 15 minutes, the daemon scans all repos in `timesheet-config.yaml` for new commits, clusters them into work sessions, and writes draft entries to SQLite. Review via Telegram daily at 9am (Phase 2, shipping this week).

**Invoicing:** Monthly at $50/hr against the 20hr/week cap. CSV export: `pnpm timesheet invoice --employer maison --month 2026-04` (Phase 4, shipping by Apr 21).

## Brain Integration

### Querying Maison Context
```
brain_query "maison knowledge graph architecture"
brain_query "maison workspace"
brain_query "maison contract terms compensation"
brain_query "hours at maison this week"  (after timesheet Phase 4)
```

### Key Wiki Articles
- [[Maison Travel AI-Native Travel App]] — product + architecture deep dive
- [[Meeting Fredrik Sjoberg and Rahil Singhi April 14 2026]] — Stumptown meeting notes
- [[Maison AI Engineer Offer Immigration Logistics 2026]] — offer terms + immigration
- [[Rahil Singhi Onboarding at Maison]] — onboarding details
- [[Maison Rahil Onboarding Call Summary March 29 2026]] — initial structure agreement
- [[Maison AI Recruitment Thread Rahil 2026]] — full outreach timeline
- [[Rahil Singhi Maison Contract Negotiations]] — negotiation history
- [[Maison Post Sandeep Call Update and Offer Letter Request April 8 2026]] — technical fit

### Explorer Deep Link
[brain.rahilsinghi.com/?focus=project:maison&depth=2](https://brain.rahilsinghi.com/?focus=project:maison&depth=2)

## For Claude Sessions in Maison Repos

Add to each Maison repo's `CLAUDE.md`:
```markdown
## Brain Context
This repo is connected to the brain knowledge graph via graphify.
Query brain_query "maison workspace" for full engagement context.
Query brain_query with specific questions about this repo's architecture.
Use brain_graphify to refresh the graph after significant structural changes.

## Timesheet
Hours are auto-tracked from git commits every 15 minutes.
Manual entry: brain_query "log 2 hours maison meeting" or use the timesheet CLI.
```
