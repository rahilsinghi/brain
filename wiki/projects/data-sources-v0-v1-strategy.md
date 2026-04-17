---
title: Data Sources & V0 → V1 Strategy
author: ai
created_at: 2026-04-17T16:35:16.210Z
last_ai_edit: 2026-04-17T16:35:16.210Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/v0-content-layer-data-sources-v0-v1-strategy-1776443483983.md]]"
tags:
  - data-sources
  - v0
  - v1
  - confidence-scoring
  - freshness-tracking
  - exa-integration
---

# Data Sources & V0 → V1 Strategy

This document outlines the strategy for evolving data sources from a public-data-only model (V0) to an integrated and dynamic model (V1+). It defines primary and fallback sources for each schema, confidence scoring, and the transition plan involving operator-hydrated data and partner integrations.

## Key Concepts

- V0 strategy: Public/cheap sources with LLM normalization
- V1 strategy: Operator-hydrated and partner-integrated data
- Confidence scoring system (0.0-1.0) for all fields
- Freshness tracking and re-verification policies
- EXA integration for offer/event detection
- Agentic automation for scaling to 500K hotels
- Operator onboarding flow for verified clients

## Details

### Strategy Summary
**V0** = Public/cheap sources with LLM normalization. No paid APIs beyond embeddings/LLM inference.
**V1** = Operator-hydrated and partner-integrated (CMS feeds, admin uploads, paid APIs).

Every field has a confidence score and freshness timestamp. Low-confidence fields get surfaced for operator review.

### Source Matrix
Detailed per-schema source matrices are provided for:
- Hotel
- Room
- Amenity
- Policy
- Offer
- Experience
- Media
- Rates
- FAQ
- Event

Each schema lists primary, fallback, and V1+ sources with confidence thresholds.

### Fallback Logic
For every field: Primary source → confidence check → fallback if needed → null/missing if no source. Never fabricate data.

### Confidence Scoring
Computed from:
- Source type (40%)
- LLM self-reported confidence (30%)
- Cross-source agreement (20%)
- Freshness (10%)

### Freshness Tracking
Each field tracks `verifiedAt` and `source`. Re-verification intervals vary by schema (14-180 days).

### EXA Role
Evaluates offer/event freshness and gap-filling in V0. Success metrics: 60%+ gap-fill rate, 24h offer detection, $1/month per hotel max.

### Agentic Automation
At scale:
- Auto-scrape new hotels
- Auto-refresh stale data
- Agentic investigators ("Ultron" agents)
- Conflict resolution

### Operator Onboarding
Operators review low-confidence fields, upload media, verify legal info, and connect PMS for rates.

### Cost Summary
V0 costs for 100 hotels: ~$100-200 initial + $50/month recurring.

## Related

[[Schema Specifications]],[[Integration]],[[Storage]],[[Media Layer]]
