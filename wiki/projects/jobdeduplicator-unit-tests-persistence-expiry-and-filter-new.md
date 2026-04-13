---
title: "JobDeduplicator Unit Tests: Persistence, Expiry, and Filter_new"
author: ai
created_at: 2026-04-12T22:20:28.811Z
last_ai_edit: 2026-04-12T22:20:28.811Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-jobdeduplicator-unit-tests-persistence-expi-10a6b4.md]]"
tags:
  - unit testing
  - job deduplication
  - persistence
  - ttl expiry
  - career-datacenter
  - pytest
  - software development
---

# JobDeduplicator Unit Tests: Persistence, Expiry, and Filter_new

This article details the unit tests added for the `JobDeduplicator` component within the [[Career-Datacenter]] project. These tests ensure the component's core functionalities, including job ID tracking, persistence across instances, `filter_new` method accuracy, and time-to-live (TTL) expiry logic, are working correctly. The testing leverages `pytest` and `tmp_path` for isolated file I/O.

## Key Concepts

[[Unit Testing]],Job ID Deduplication,Data Persistence,Time-to-Live (TTL) Expiry,pytest,tmp_path

## Details

Unit tests were implemented for the `JobDeduplicator` component in the [[Career-Datacenter]] repository (SHA: b73e4fa). These tests comprehensively cover the following critical functionalities:

*   **`is_seen()`**: Verifies correct behavior before and after a job ID has been marked as seen.
*   **`mark_seen_batch()`**: Ensures that batches of job IDs are correctly marked as seen.
*   **`filter_new()`**: Confirms that this method accurately returns only job IDs that have not yet been marked as seen, effectively filtering out duplicates.
*   **Persistence**: Tests that the `JobDeduplicator` can successfully reload its state from disk, maintaining continuity across different instances.
*   **TTL Expiry Logic**: Validates the component's ability to prune outdated entries. Specifically, it checks that 45-day-old entries are correctly removed upon loading, while 5-day-old entries are retained, adhering to the defined expiry policy.

The tests utilize `pytest` for the testing framework and `tmp_path` fixtures to provide isolated temporary directories, ensuring clean and reproducible file I/O operations for persistence tests. The addition of these tests significantly enhances the robustness and reliability of the [[JobDeduplicator - Persistent Job ID Tracking]] component, which is crucial for the efficient operation of the [[Career-Datacenter]]'s job scraping and application processes.

## Related

[[Career-Datacenter]],[[JobDeduplicator - Persistent Job ID Tracking]],[[Job Scraper Foundation (Phase 2.2 - Part 1) to Career-Datacenter]],[[Job Tracker Unit Tests]],[[Add Comprehensive System Test with Mock Data (Career-Datacenter)]]
