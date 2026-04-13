---
title: "MarkPush: E2E Backend and iOS Application Testing Suite"
author: ai
created_at: 2026-04-13T17:15:09.747Z
last_ai_edit: 2026-04-13T17:15:09.747Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-test-e2e-backend-ios-auth-settings-app-library-tests-52fdcf.md]]"
tags:
  - e2e testing
  - backend
  - ios
  - sql
  - rls
  - tca
  - markpush
  - authentication
  - settings
  - library
  - makefile
  - development
  - testing
  - automation
---

# MarkPush: E2E Backend and iOS Application Testing Suite

This article details the comprehensive End-to-End (E2E) testing suite for the MarkPush project, covering both backend SQL database functionalities and iOS application features. It includes tests for authentication, user settings, app navigation, and library management, ensuring robust and secure operation. The suite encompasses 33 backend SQL assertions and 40 iOS TCA tests, all passing, demonstrating thorough validation.

## Key Concepts

End-to-End Testing,Backend Testing,iOS Testing,SQL Database,Row Level Security (RLS),The Composable Architecture (TCA),Authentication,Application Settings,Library Management,Makefile Automation

## Details

The [[MarkPush]] project implements a comprehensive End-to-End (E2E) testing suite, as documented in commit `f96ee5d` by [[Rahil Singhi]] on March 17, 2026. This suite covers both the backend SQL database and the iOS application, ensuring functional correctness and security.

**Backend SQL Tests**
The backend testing comprises 33 assertions, all of which are passing. These tests validate various aspects of the SQL database:
*   **001_schema**: Verifies tables, columns, Row Level Security (RLS), indexes, triggers, real-time capabilities, and database constraints.
*   **002_rls_pushes**: Specifically tests the dual-path RLS implementation for `pushes`, accommodating both legacy `device_id` GUC and JWT `auth.uid()` authentication. It ensures read, insert, and update isolation for both paths.
*   **003_rls_profiles_devices**: Focuses on CRUD (Create, Read, Update, Delete) isolation for user profiles and devices. It also validates the `device_type` CHECK constraint and the `handle_new_user` trigger.
*   **004_rls_beta_whitelist_tokens**: Ensures proper access control for the beta whitelist, covering CRUD operations for push tokens and enforcing unique token constraints.
*   **`run_all.sh`**: A shell script runner that accepts `DATABASE_URL` and reports PASS/FAIL counts for the SQL test suite.

**iOS TCA Tests**
The iOS application testing utilizes [[The Composable Architecture]] (TCA) and includes 40 tests across 7 distinct suites, all passing:
*   **AuthFeatureTests (13 tests)**: Validates session restoration, email validation, OTP sending and failure scenarios, deep link handling (success/failure), OTP resend functionality, navigation within authentication flows, and error dismissal.
*   **SettingsFeatureTests (8 tests)**: Checks `onAppear` loading behavior, font size adjustments, pairing sheet functionality, sign-out success/failure, and state updates.
*   **AppFeatureTests (4 tests)**: Covers tab selection, ensuring sign-out resets authentication state, deep link forwarding, and the correctness of the `isAuthenticated` computed property.
*   **LibraryFeatureTests (5 tests)**: Tests search functionality, filter cycle behavior, and sort cycle behavior within the application's library view.
*   **Existing Tests Fixes**: Includes improvements such as adding `import Foundation` and utilizing key path receive syntax for enhanced test structure.

**Makefile Integration**
The project's `Makefile` has been updated to include specific targets for testing and seeding:
*   `db-test`: Executes the backend SQL tests.
*   `db-seed`: Seeds the database with initial data (not detailed in this commit).
*   `mcp-test`: Likely a comprehensive test target for MarkPush.

## Related

[[Rahil Singhi]],[[MarkPush]],[[Branded CLI Output and Polished MCP Tool Responses]],[[Branded CLI Output and Polished MCP Tool Responses (MarkPush)]],[[The Composable Architecture]],[[End-to-End Testing]],[[SQL Database]],[[iOS Testing]]
