---
title: "JobDeduplicator Unit Tests: Persistence, Expiry, and Filtering"
author: ai
created_at: 2026-04-12T18:20:56.826Z
last_ai_edit: 2026-04-12T18:20:56.826Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-jobdeduplicator-unit-tests-persistence-expi-10a6b4.md]]"
tags:
  - job deduplication
  - unit testing
  - persistence
  - expiry
  - ttl
  - career-datacenter
  - python
  - pytest
---

# JobDeduplicator Unit Tests: Persistence, Expiry, and Filtering

Comprehensive unit tests were added for the `JobDeduplicator` module in the `Career-Datacenter` repository. These tests validate the component's functionality for marking jobs as seen, filtering new entries, ensuring persistence across instances, and correctly handling Time To Live (TTL) expiry for job IDs.

## Key Concepts

- [[JobDeduplicator]],- Unit Testing,- Data Persistence,- Time To Live (TTL),- `pytest`,- `tmp_path`

## Details

This commit (SHA: `b73e4fa`), authored by Rahil Singhi and co-authored by [[Claude Sonnet 4.5]] on February 17, 2026, introduces robust unit tests for the `JobDeduplicator` component within the `rahilsinghi/Career-Datacenter` repository. The tests leverage `pytest` fixtures and `tmp_path` for isolated file I/O operations, ensuring a clean testing environment.

Key functionalities validated by these tests include:

*   **`is_seen()` Verification:** Checks the state of job IDs before and after they are marked as seen.
*   **`mark_seen_batch()` Efficacy:** Confirms the correct behavior of batch marking multiple job IDs.
*   **`filter_new()` Accuracy:** Ensures that `filter_new()` correctly identifies and returns only those job IDs that have not been previously marked as seen.
*   **Persistence Across Instances:** Validates that `JobDeduplicator` instances can correctly load and persist job ID states from disk, maintaining continuity across application runs.
*   **TTL Expiry Logic:** Tests the Time To Live mechanism for job IDs:
    *   Entries older than 45 days are correctly pruned (removed) upon loading a `JobDeduplicator` instance.
    *   Entries 5 days old or newer are correctly retained, demonstrating the selective expiry process.

These unit tests significantly enhance the reliability and maintainability of the `JobDeduplicator`, a crucial part of the [[Career-Datacenter]] project designed to prevent duplicate processing of job applications.

## Related

[[Add JobDeduplicator - Persistent Job ID Tracking]],[[Add JobDeduplicator Unit Tests]],[[Career-Datacenter]],[[pytest]],[[Claude Sonnet 4.5]]
