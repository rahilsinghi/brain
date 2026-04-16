---
title: "Maison Slack #dev — Engineering Context (April 2026)"
author: ai
created_at: 2026-04-15T19:14:20.483Z
last_ai_edit: 2026-04-15T19:14:20.483Z
last_human_edit: null
last_embedded_hash: 85f24fb391927ee8
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maison-slack-dev-channel-engineering-context-march-apri-1776280441350.md]]"
tags:
  - maison
  - maison
  - engineering
  - development
  - monorepo
  - deployment
  - gdpr
  - claude
  - openai
  - qa
  - workflow
  - grafana
  - slack
---




# Maison Slack #dev — Engineering Context (April 2026)

This document compiles critical engineering context from Maison's Slack #dev channel in April 2026, highlighting a major monorepo migration effort and an aggressive deployment timeline. It covers crucial development challenges, including GDPR compliance for LLM usage, issues with QA pair generation, and unexpected OpenAI token spend spikes, alongside mandates for Linear workflow and branch merging protocols. The article details the progress of key features and outlines essential process notes for developers.

## Key Concepts

Monorepo Migration,Deployment Timeline,GDPR Compliance,Atomic QA Pairs,OpenAI Token Spend,Linear Workflow,Branch Merging Chaos,AI Visibility (AI Viz),Website Sync,Source Ingestion,Grafana Dashboard,Claude (LLM)

## Details

This article synthesizes key discussions and decisions from the Maison Slack `#dev` channel (C07N7QQ9YUX) during April 2026, focusing on critical engineering context and processes.

## Critical Context

### Monorepo Migration (April 2026)
- Sandeep initiated the development of the `maison-agent` monorepo approximately 10 days before April 10.
- The immediate goal was to deploy a completely refactored, agentic-built Maison to `STG` (staging environment) by the end of the weekend, April 12-13.
- Julia was scheduled for regression testing during the week of April 13, with no new features to be introduced during this period.
- **Deployment to `PROD` (production environment) was initially targeted for Monday, April 20th, later revised to Wednesday, April 22nd.**
- All engineers were mandated to begin working in [[Claude]] immediately to facilitate the migration.

### Key Deployment Timeline
- **April 10**: A 125-minute weekly developer call outlined the plan for the subsequent 10 days.
- **April 13**: Services were deployed to the test environment, with applications being pushed.
- **April 15**: Sandeep reported that "All pages deployed to test. Need to fix and optimize now."
- **Target**: `STG` to `PROD` deployment aimed for April 22nd.

### GDPR Warning (April 14, Sandeep)
- **[[Claude]] is NOT GDPR compliant.**
- It is strictly prohibited to use [[Claude]] for reviewing EU hotel data.
- It is strictly prohibited to use [[Claude]] with EU PMS APIs.
- Should an EU hotel become a client, EU-based LLMs must be used for reservation and PII handling.

### Atomic QA Pairs Issue (April 10)
- A significant issue arose due to a scraping logic change, leading to an "explosion" of QA pairs.
- Specifically, the Newbury Hotel's QA pairs increased from 29 to 645 after a re-scrape.
- Fredrik demanded immediate reversion of the changes.
- Durgansh was tasked with investigating QA pair generation and deduplication processes.

### OpenAI Token Spend Spike
- Unexplained spikes in OpenAI token expenditure were observed on April 9th and 13th.
- The scraper for Indigo East End generated over 30,000 QA pairs, resulting in a massive cost.
- The root cause was identified: the scraper was following links outside the target domain.

### Linear Workflow Mandates (April 3, Fredrik)
- Tickets must be marked "Done" immediately upon production deployment.
- All work is to be managed on the "Current Cycle" board, with ticket order dictating priority.
- Tickets must represent atomic units of work (e.g., specific features or bugs).
- Test instructions are required as part of each ticket for QA handover.

### Branch Merging Chaos (March 31)
- Significant codebase synchronization issues were identified between the `develop` and `release` branches.
- Changes present in `release 1.12` were missing from `develop`, leading to a broken production deployment.
- `release 1.13` was created as a workaround.
- The team was mandated to synchronize all changes to the `develop` branch going forward.

### Key Features In Progress
- **[[AI Visibility]] (AI Viz)**: Rearchitected from Playwright to OpenAI Agents SDK.
- **[[Website Sync]]**: Automated scraping and difference detection.
- **[[Source Ingestion]]**: Document upload functionality for the knowledge base.
- **[[Monorepo Consolidation]]**
- **[[Python Services Migration]]**: Migration of existing Python services into the monorepo.

### Grafana Dashboard
- Sandeep invited developers to the Grafana dashboard on March 26th.
- All sources were connected with appropriate read-only access to prevent unauthorized edits.
- Logs are currently configured only in the test environment.
- Production and staging environment logging were planned for subsequent implementation.

### Process Notes
- Developers are expected to bootstrap the monorepo locally and push fixes to named branches.
- Docker files are available for local debugging of Linux-specific issues.
- Local utilities are provided for debugging AWS ECS containers.
- Strict adherence to not sharing confidential data for training purposes is required, with double-checking of credentials.

## Related

[[CLAUDE.md Agent Instructions and Hospitality Outreach Playbook]],[[Monorepo Consolidation]],[[AI Visibility]],[[Website Sync]],[[Source Ingestion]],[[Python Services Migration]],[[Docker]],[[AWS ECS]]
