---
title: "JobDeduplicator Unit Tests: Persistence, Expiry, and Filter_new"
author: ai
created_at: 2026-04-13T16:13:09.954Z
last_ai_edit: 2026-04-13T16:13:09.954Z
last_human_edit: null
last_embedded_hash: 2485fb8f2ada18dc
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-jobdeduplicator-unit-tests-persistence-expi-10a6b4.md]]"
tags:
  - unittest
  - jobdeduplicator
  - career-datacenter
  - pytest
  - persistence
  - ttl
  - testing
---


# JobDeduplicator Unit Tests: Persistence, Expiry, and Filter_new

This article details the unit tests implemented for the `JobDeduplicator` component within the Career-Datacenter project. The tests validate core functionalities including marking jobs as seen, filtering unseen job IDs, persistence of seen jobs across sessions, and time-to-live (TTL) expiry logic for old entries. Pytest fixtures are used to ensure isolated file I/O for reliable testing.

## Key Concepts

Unit Testing,JobDeduplicator,Data Persistence,Time-to-Live (TTL),Pytest,File I/O

## Details

Unit tests were added for the `JobDeduplicator` component within the [[Career-Datacenter]] repository to ensure its robustness and reliability. The tests cover several critical functionalities:

*   **`is_seen()` verification**: Checks the state of a job ID before and after it has been marked as seen.
*   **`mark_seen_batch()`**: Validates the correct marking of multiple job IDs simultaneously.
*   **`filter_new()`**: Ensures that only genuinely unseen job IDs are returned from a given list, preventing reprocessing of previously encountered jobs.
*   **Persistence**: Tests the `JobDeduplicator`'s ability to save its state to disk and reload it correctly across different instances, maintaining the record of seen job IDs.
*   **TTL Expiry Logic**: Verifies that old entries are properly pruned. Specifically, it tests that entries older than 45 days are removed upon loading, while entries within the 5-day retention period are kept.

The tests leverage `pytest` fixtures, utilizing `tmp_path` to provide isolated and temporary file system locations for each test, preventing interference between test runs and ensuring clean test environments. This comprehensive testing suite contributes to the overall stability and accuracy of the job application system.

## Related

[[JobDeduplicator - Persistent Job ID Tracking]],[[Career-Datacenter]],[[Add JobDeduplicator - Persistent Job ID Tracking]]
