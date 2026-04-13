---
title: "MarkPush: End-to-End Backend and iOS App Testing"
author: ai
created_at: 2026-04-12T17:24:08.517Z
last_ai_edit: 2026-04-12T17:24:08.517Z
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
  - authentication
  - markpush
  - tca
  - makefile
  - test automation
---

# MarkPush: End-to-End Backend and iOS App Testing

This article details the end-to-end testing implementation for the [[MarkPush]] project (SHA: f96ee5d). It covers comprehensive backend SQL tests ensuring data integrity and security, alongside robust iOS app tests for authentication, settings, and library features, all reporting successful outcomes.

## Key Concepts

End-to-End Testing,Backend Testing,iOS Testing,SQL Database Schema,Row-Level Security (RLS),Test-Driven Development (TDD),The Composable Architecture (TCA),Authentication Flows,Application Settings,Content Library Features,Makefile Automation

## Details

This document outlines the comprehensive end-to-end (E2E) testing implemented for the [[MarkPush]] project, covering both its backend SQL database and the iOS application.

**Repository Information:**
*   **Repo:** rahilsinghi/MarkPush
*   **SHA:** f96ee5d
*   **Date:** 2026-03-17T07:11:37Z
*   **Author:** Rahil Singhi
*   **Files changed:** 13
*   **Additions:** +1353
*   **Deletions:** -2

### Backend SQL Tests

A suite of 33 assertions was developed and successfully passed, covering critical database aspects:

*   **001_schema:** Validates tables, columns, [[Row-Level Security (RLS)]], indexes, triggers, realtime capabilities, and constraints.
*   **002_rls_pushes:** Tests dual-path RLS for the `pushes` table, including legacy device_id GUC and JWT auth.uid(). It ensures read/insert/update isolation for both paths.
*   **003_rls_profiles_devices:** Checks profile CRUD isolation, device CRUD isolation, `device_type` CHECK constraint, and the `handle_new_user` trigger.
*   **004_rls_beta_whitelist_tokens:** Verifies whitelist access control, `push_token` CRUD operations, and the unique token constraint.
*   **`run_all.sh`:** A runner script that accepts `DATABASE_URL` and reports the count of passing and failing tests.

### iOS TCA Tests

40 tests across 7 suites were implemented using [[The Composable Architecture (TCA)]], all passing:

*   **AuthFeatureTests (13 tests):** Covers session restoration, email validation, OTP send/fail scenarios, deep link success/fail, resend functionality, navigation, and error dismissal.
*   **SettingsFeatureTests (8 tests):** Validates `onAppear` loads, font size adjustments, pairing sheet interactions, sign out success/failure, and state updates.
*   **AppFeatureTests (4 tests):** Tests tab selection, sign out resetting authentication state, deep link forwarding, and the `isAuthenticated` computed property.
*   **LibraryFeatureTests (5 tests):** Ensures proper functionality of search, filter cycling, and sort cycling.
*   **Existing Tests Fixes:** Included adding `import Foundation` and using key path receive syntax to improve existing test stability and adherence to best practices.

### Makefile Additions

To streamline the testing process, the following targets were added to the [[Makefile]]:

*   `db-test`: For running the backend SQL tests.
*   `db-seed`: For seeding the database with test data.
*   `mcp-test`: For running the iOS TCA tests.

## Related

[[MarkPush]],[[Backend Testing]],[[iOS Testing]],[[Row-Level Security (RLS)]],[[Authentication]],[[Makefile]],[[The Composable Architecture (TCA)]]
