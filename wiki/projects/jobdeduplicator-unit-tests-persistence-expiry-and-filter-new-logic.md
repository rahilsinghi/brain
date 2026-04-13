---
title: "JobDeduplicator Unit Tests: Persistence, Expiry, and Filter_New Logic"
author: ai
created_at: 2026-04-10T21:43:16.618Z
last_ai_edit: 2026-04-10T21:43:16.618Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-jobdeduplicator-unit-tests-persistence-expi-10a6b4.md]]"
tags:
  - unit-tests
  - deduplication
  - persistence
  - expiry
  - ttl
  - python
  - pytest
  - file-io
  - development
  - rahil-singhi
  - claude-sonnet-4.5
  - career-datacenter
  - commit
---

# JobDeduplicator Unit Tests: Persistence, Expiry, and Filter_New Logic

This commit introduces comprehensive unit tests for the `JobDeduplicator` component within the Career-Datacenter project. The tests validate core functionalities like persistence across instances, time-to-live (TTL) expiry logic, and the accurate filtering of new, unseen job IDs. They ensure the robust and reliable operation of the deduplication mechanism.

## Key Concepts

* Unit Testing,* Job Deduplication,* Persistence,* Time-to-Live (TTL) Expiry,* `filter_new` function,* Pytest,* Isolated File I/O

## Details

This commit, identified by SHA `b73e4fa` and authored by Rahil Singhi (with co-authorship from Claude Sonnet 4.5), introduces a new unit test file to the `rahilsinghi/Career-Datacenter` repository on 2026-02-17. The commit consists of 85 additions and 0 deletions across 1 file.

The primary objective of these tests is to thoroughly validate the `JobDeduplicator` component, focusing on its core functionalities:

*   **State Tracking:** Verifies the `is_seen()` method both before and after marking entries, ensuring accurate tracking of job IDs.
*   **Batch Operations:** Tests the `mark_seen_batch()` method for correct bulk marking of job IDs.
*   **New ID Filtering:** Confirms that `filter_new()` accurately returns only those IDs that have not been previously seen.
*   **Persistence:** Validates the deduplicator's ability to persist its state across different instances. This includes testing that entries are correctly reloaded from disk when a new `JobDeduplicator` instance is initialized.
*   **Time-to-Live (TTL) Expiry:** Implements and tests the logic for expiring old entries. Specifically, it verifies that entries older than 45 days are pruned upon loading, while more recent entries (e.g., 5-day-old entries) are correctly retained.

The tests are implemented using `pytest` and leverage `pytest fixtures` with `tmp_path` to ensure isolated file I/O operations, preventing test interference and providing clean test environments. This approach ensures that persistence and expiry logic are tested against temporary, isolated files, mimicking real-world scenarios without affecting actual data.

## Related

[[Rahil Singhi]],[[JobDeduplicator]],[[Career-Datacenter]],[[Pytest]],[[Claude Sonnet 4.5]]
