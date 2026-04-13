---
title: MarkPush E2E Backend and iOS Feature Testing (f96ee5d)
author: ai
created_at: 2026-04-10T21:13:41.882Z
last_ai_edit: 2026-04-10T21:13:41.882Z
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
  - rls
  - tca
  - markpush
  - auth
  - settings
  - app
  - library
  - database
  - swift
  - makefile
  - integration-testing
---

# MarkPush E2E Backend and iOS Feature Testing (f96ee5d)

This article details the end-to-end (E2E) testing efforts for the MarkPush project, encompassing both backend SQL assertions and iOS tests built with The Composable Architecture (TCA). All 33 backend SQL assertions and 40 iOS TCA tests across 7 suites were passing, ensuring robust functionality for authentication, settings, application logic, and content library features.

## Key Concepts

E2E Testing,Backend Testing,iOS Testing,Row-Level Security (RLS),The Composable Architecture (TCA),Database Schema Testing,Authentication (AuthFeature),User Settings (SettingsFeature),Application Core Logic (AppFeature),Content Library (LibraryFeature),Makefile

## Details

This testing effort, committed to the `rahilsinghi/MarkPush` repository at SHA `f96ee5d` on 2026-03-17, involved significant changes with 13 files changed, 1353 additions, and 2 deletions. The tests cover critical components of the MarkPush application.

### Backend SQL Tests

A total of 33 assertions were executed, all passing, ensuring the integrity and security of the database. The tests covered:

*   **001_schema**: Validates the presence and configuration of tables, columns, Row-Level Security (RLS) policies, indexes, triggers, realtime capabilities, and database constraints.
*   **002_rls_pushes**: Tests the dual-path RLS implementation for push notifications, supporting both legacy `device_id` GUC (Grand Unified Configuration) and JWT `auth.uid()`. It ensures read, insert, and update isolation for both authentication paths.
*   **003_rls_profiles_devices**: Verifies CRUD (Create, Read, Update, Delete) isolation for user profiles and devices. It also checks the `device_type` constraint and the `handle_new_user` trigger.
*   **004_rls_beta_whitelist_tokens**: Assesses whitelist access control, CRUD operations for `push_token`, and enforces unique token constraints.
*   **run_all.sh**: A runner script that takes `DATABASE_URL` as an argument and reports `PASS/FAIL` counts for all backend tests.

### iOS TCA Tests

A comprehensive suite of 40 tests across 7 suites, all passing, was implemented using The Composable Architecture (TCA) for the iOS application:

*   **AuthFeatureTests (13 tests)**: Covers session restoration, email validation logic, OTP (One-Time Password) sending and failure scenarios, deep link handling (success/failure), OTP resend functionality, navigation flows, and error dismissal.
*   **SettingsFeatureTests (8 tests)**: Validates `onAppear` data loading, font size adjustments, pairing sheet interactions, sign-out success and failure, and general state updates.
*   **AppFeatureTests (4 tests)**: Tests tab selection, ensures authentication state resets on sign-out, deep link forwarding mechanisms, and the `isAuthenticated` computed property.
*   **LibraryFeatureTests (5 tests)**: Focuses on search functionality, filter cycle logic, and sort cycle behavior within the content library.
*   **Fix existing tests**: Addressed issues in existing tests by including `import Foundation` and adopting key path receive syntax for improved reliability and modern Swift practices.

### Makefile Additions

New targets were added to the Makefile to streamline development and testing workflows:

*   `db-test`: Target for running database tests.
*   `db-seed`: Target for seeding the database with test data.
*   `mcp-test`: General target for MarkPush tests.

## Related

[[MarkPush]],[[Rahil Singhi]],[[The Composable Architecture]],[[Row-Level Security]]
