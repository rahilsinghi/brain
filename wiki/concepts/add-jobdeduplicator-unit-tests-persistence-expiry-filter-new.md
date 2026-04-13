---
title: Add JobDeduplicator Unit Tests - Persistence, Expiry, Filter_New
author: ai
created_at: 2026-04-13T18:46:45.926Z
last_ai_edit: 2026-04-13T18:46:45.926Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-jobdeduplicator-unit-tests-persistence-expi-10a6b4.md]]"
tags:
  - jobdeduplicator
  - unit tests
  - testing
  - persistence
  - expiry
  - ttl
  - career-datacenter
  - pytest
---

# Add JobDeduplicator Unit Tests - Persistence, Expiry, Filter_New

This commit introduces comprehensive unit tests for the [[JobDeduplicator - Persistent Job ID Tracking]] component within the Career-Datacenter project. The tests validate the component's core functionalities, including job ID marking, filtering of new IDs, persistence across application instances, and time-to-live (TTL) expiry logic for old entries.

## Key Concepts

[[JobDeduplicator - Persistent Job ID Tracking]],Unit Testing,Persistence (Data),Time-To-Live (TTL),`is_seen()` method,`mark_seen_batch()` method,`filter_new()` method,Pytest fixtures,Temporary file paths (`tmp_path`)

## Details

This commit (`b73e4fa`) to the `rahilsinghi/Career-Datacenter` repository, dated 2026-02-17T22:46:37Z and authored by Rahil Singhi (co-authored by Claude Sonnet 4.5), adds robust unit tests for the [[JobDeduplicator - Persistent Job ID Tracking]] component.

The tests cover the following critical aspects of the `JobDeduplicator`:

*   **`is_seen()` functionality**: Verifies correct behavior before and after a job ID has been marked as seen.
*   **`mark_seen_batch()` operation**: Ensures that multiple job IDs can be marked as seen simultaneously.
*   **`filter_new()` accuracy**: Confirms that this method effectively returns only those job IDs that have not yet been seen, avoiding duplicates.
*   **Persistence**: Validates that job ID tracking data is correctly saved to disk and reloaded, maintaining state across different `JobDeduplicator` instance instantiations.
*   **TTL Expiry Logic**: Tests the pruning mechanism for old entries. Specifically, it ensures that entries older than 45 days are correctly removed upon loading, while entries within the 5-day retention period are preserved.

The tests leverage `pytest` fixtures, utilizing `tmp_path` to provide isolated file I/O environments, ensuring that each test run operates with a clean slate and does not interfere with persistent data outside the test scope. The commit involved changes to 1 file, with 85 additions and no deletions, indicating a focused effort on adding test coverage.

## Related

[[JobDeduplicator - Persistent Job ID Tracking]],[[Career-Datacenter]]
