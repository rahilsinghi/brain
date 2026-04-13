---
title: "E2E Testing: Backend and iOS Features (MarkPush)"
author: ai
created_at: 2026-04-11T00:16:50.855Z
last_ai_edit: 2026-04-11T00:16:50.855Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-test-e2e-backend-ios-auth-settings-app-library-tests-52fdcf.md]]"
tags:
  - e2e testing
  - backend
  - ios
  - markpush
  - sql
  - tca
  - authentication
  - security
  - testing
  - ci/cd
---

# E2E Testing: Backend and iOS Features (MarkPush)

This article details the successful execution of end-to-end tests for the MarkPush project, covering both backend SQL functionality and iOS features implemented with The Composable Architecture (TCA). All 73 assertions and tests passed, ensuring the stability and correct operation of authentication, settings, application logic, and library features across the platform.

## Key Concepts

E2E Testing,Backend SQL Tests,iOS TCA Tests,Row-Level Security (RLS),JSON Web Token (JWT) Authentication,One-Time Password (OTP),Deep Linking,The Composable Architecture (TCA),Makefile Targets

## Details

This document outlines the results of a comprehensive End-to-End (E2E) testing effort for the `rahilsinghi/MarkPush` project, conducted on 2026-03-17 (SHA: `f96ee5d`). A total of 13 files were changed, with 1353 additions and 2 deletions, indicating significant test suite expansion.

### Backend SQL Tests

**33 assertions were run and passed across 4 test suites:**

*   **`001_schema`**: Validated tables, columns, Row-Level Security (RLS), indexes, triggers, realtime capabilities, and constraints.
*   **`002_rls_pushes`**: Tested dual-path RLS for `pushes` data, supporting both legacy `device_id` GUC and modern `JWT auth.uid()` for read/insert/update isolation.
*   **`003_rls_profiles_devices`**: Verified CRUD isolation for user profiles and devices, including the `device_type` CHECK constraint and the `handle_new_user` trigger.
*   **`004_rls_beta_whitelist_tokens`**: Ensured whitelist access control, push token CRUD operations, and unique token constraints.

**Runner:** The `run_all.sh` script manages these tests, taking `DATABASE_URL` as an argument and reporting PASS/FAIL counts.

### iOS TCA Tests

**40 tests were run and passed across 7 test suites:**

*   **[[AuthFeatureTests]] (13 tests)**: Covered session restoration, email validation, OTP sending/failure, deep link success/failure, resending mechanisms, navigation, and error dismissal.
*   **[[SettingsFeatureTests]] (8 tests)**: Tested `onAppear` loading, font size adjustments, pairing sheet functionality, sign-out success/failure scenarios, and state updates.
*   **[[AppFeatureTests]] (4 tests)**: Validated tab selection, sign-out leading to authentication reset, deep link forwarding, and the `isAuthenticated` computed property.
*   **[[LibraryFeatureTests]] (5 tests)**: Ensured correct functionality for searching, filter cycling, and sort cycling within the library.

**Fixes/Improvements:** Existing tests were improved by adding `import Foundation` and adopting key-path receive syntax.

### Makefile Targets

New `Makefile` targets were added to streamline development and testing workflows:

*   `db-test`: For running backend database tests.
*   `db-seed`: For seeding the database with initial data.
*   `mcp-test`: For running MarkPush-specific tests.

This comprehensive testing ensures the robustness and reliability of the MarkPush application's core functionalities.

## Related

[[MarkPush]],[[AuthFeatureTests]],[[SettingsFeatureTests]],[[AppFeatureTests]],[[LibraryFeatureTests]],[[Makefile]]
