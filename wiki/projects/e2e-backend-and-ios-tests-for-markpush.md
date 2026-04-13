---
title: E2E Backend and iOS Tests for MarkPush
author: ai
created_at: 2026-04-12T21:24:39.774Z
last_ai_edit: 2026-04-12T21:24:39.774Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-test-e2e-backend-ios-auth-settings-app-library-tests-52fdcf.md]]"
tags:
  - e2e
  - testing
  - backend
  - ios
  - sql
  - tca
  - rls
  - jwt
  - markpush
  - automation
  - commit
---

# E2E Backend and iOS Tests for MarkPush

This article details the comprehensive End-to-End (E2E) testing implemented for the MarkPush project, encompassing both backend SQL and iOS TCA components. It outlines various test suites covering database schema, Row-Level Security (RLS), user authentication, application settings, and core iOS features. Additionally, it highlights Makefile additions to streamline testing workflows.

## Key Concepts

E2E Testing,SQL Tests,iOS TCA (The Composable Architecture),Row-Level Security (RLS),JWT Authentication,Deep Linking,Makefile Automation,Unit Testing (AuthFeature, SettingsFeature, AppFeature, LibraryFeature)

## Details

This commit (`f96ee5d`) from the `rahilsinghi/MarkPush` repository, authored by Rahil Singhi on 2026-03-17, introduces extensive E2E testing for the project, with 13 files changed, 1353 additions, and 2 deletions.

### Backend SQL Tests (33 assertions, all passing)

The backend tests focus on database integrity and security, covering:

*   **001_schema**: Verifies tables, columns, [[Row-Level Security (RLS)]], indexes, triggers, [[Realtime Updates]], and constraints.
*   **002_rls_pushes**: Implements dual-path [[RLS]] for pushes, supporting both legacy `device_id` GUC and [[JWT Authentication]] (`auth.uid()`). It ensures read, insert, and update isolation for both authentication paths.
*   **003_rls_profiles_devices**: Tests profile [[CRUD]] isolation, device [[CRUD]] isolation, `device_type` `CHECK` constraints, and the `handle_new_user` trigger.
*   **004_rls_beta_whitelist_tokens**: Validates whitelist access control, `push_token` [[CRUD]] operations, and unique token constraints.
*   **run_all.sh**: A runner script that takes `DATABASE_URL` as an argument and reports `PASS`/`FAIL` counts for all SQL tests.

### iOS TCA Tests (40 tests across 7 suites, all passing)

The iOS tests, built using [[The Composable Architecture (TCA)]], ensure the robustness of the mobile application's features:

*   **AuthFeatureTests (13 tests)**: Covers session restoration, email validation, [[OTP]] send/fail scenarios, [[deep link]] success/fail, resend functionality, navigation, and error dismissal.
*   **SettingsFeatureTests (8 tests)**: Verifies `onAppear` loading behavior, font size adjustments, pairing sheet functionality, sign-out success/failure, and state updates.
*   **AppFeatureTests (4 tests)**: Tests tab selection, sign-out resetting authentication state, [[deep link]] forwarding, and the `isAuthenticated` computed property.
*   **LibraryFeatureTests (5 tests)**: Includes tests for search functionality, filter cycle logic, and sort cycle behavior.
*   **Fix existing tests**: Necessary adjustments were made to existing tests, including adding `import Foundation` and using key path receive syntax.

### Makefile Additions

To facilitate the execution of these tests, new targets have been added to the [[Makefile]]:

*   `db-test`: For running backend database tests.
*   `db-seed`: For seeding the database with test data.
*   `mcp-test`: For running [[MarkPush]]-specific tests.

## Related

[[MarkPush]],[[Row-Level Security (RLS)]],[[JWT Authentication]],[[The Composable Architecture (TCA)]],[[OTP]],[[Deep Linking]],[[Makefile]],[[CRUD]]
