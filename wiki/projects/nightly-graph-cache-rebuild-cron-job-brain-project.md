---
title: Nightly Graph Cache Rebuild Cron Job (Brain Project)
author: ai
created_at: 2026-04-12T21:54:50.917Z
last_ai_edit: 2026-04-12T21:54:50.917Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-cron-rebuild-graph-cache-nightly-after-lint-heal-cycle-90b53c.md]]"
tags:
  - cron
  - graph cache
  - brain project
  - nightly job
  - automation
  - maintenance
  - data integrity
---

# Nightly Graph Cache Rebuild Cron Job (Brain Project)

A new cron job has been implemented within the [[Brain Project]] to automatically rebuild the graph cache nightly. This process ensures that the cached graph data, used by the Brain Explorer, remains up-to-date and consistent after the daily lint and heal cycles are completed.

## Key Concepts

Cron Job,Graph Cache,Lint/Heal Cycle,Brain Project,Automation

## Details

This feature introduces a cron job to automate the rebuilding of the graph cache for the [[Brain Project]]. The cron job is scheduled to run nightly, specifically after the completion of the `lint` and `heal` cycles. This ensures that any changes or corrections made during the linting and healing process are reflected in the cached graph data.

**Commit Details:**
*   **Repository:** `rahilsinghi/brain`
*   **SHA:** `aaed510`
*   **Date:** `2026-04-10T16:18:51Z`
*   **Author:** Rahil Singhi
*   **Co-Authored-By:** Claude Opus 4.6 (1M context)
*   **Files changed:** 1
*   **Additions:** +14
*   **Deletions:** -0

The primary purpose of this automation is to maintain the integrity and freshness of the graph data presented in the [[Brain-Explorer]], reducing the need for manual intervention.

## Related

[[Brain Project]],[[Brain-Explorer]],[[Daily Summary Cron]],[[API: GET /graph-export Endpoint for Cached Graph Data]],[[API: POST /graph-push Endpoint for Graph Cache Rebuild and Explorer Update]],[[Brain Project Phase 2 Hardening: Embed Safety, Connection Discovery, and Healer Tests (33a3510)]],[[Brain Repository: Pre-Heal Snapshot (2026-04-09)]],[[Automated Knowledge System Maintenance (d145456)]]
