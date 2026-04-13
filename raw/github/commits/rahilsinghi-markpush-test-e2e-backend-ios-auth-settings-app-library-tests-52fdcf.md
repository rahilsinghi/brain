---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:f96ee5d
ingested_at: 2026-04-13T17:05:37.833Z
parsed_at: 2026-04-13T17:05:37.833Z
compiled_to: "[[MarkPush: E2E Backend and iOS Application Testing Suite]]"
processed_at: 2026-04-13T17:15:09.747Z
retry_count: 0
last_error: null
compile_progress: null
---



# test: E2E backend + iOS auth/settings/app/library tests

- **Repo:** rahilsinghi/MarkPush
- **SHA:** f96ee5d
- **Date:** 2026-03-17T07:11:37Z
- **Author:** Rahil Singhi
- **Files changed:** 13
- **Additions:** +1353
- **Deletions:** -2

Backend SQL tests (33 assertions, all passing):
- 001_schema: tables, columns, RLS, indexes, triggers, realtime, constraints
- 002_rls_pushes: dual-path RLS (legacy device_id GUC + JWT auth.uid()),
  read/insert/update isolation for both paths
- 003_rls_profiles_devices: profile CRUD isolation, device CRUD isolation,
  device_type CHECK constraint, handle_new_user trigger
- 004_rls_beta_whitelist_tokens: whitelist access control, push_token CRUD,
  unique token constraint
- run_all.sh: runner takes DATABASE_URL, reports PASS/FAIL counts

iOS TCA tests (40 tests across 7 suites, all passing):
- AuthFeatureTests (13): session restore, email validation, OTP send/fail,
  deep link success/fail, resend, navigation, error dismissal
- SettingsFeatureTests (8): onAppear loads, font size, pairing sheet,
  sign out success/failure, state updates
- AppFeatureTests (4): tab selection, sign out resets auth, deep link
  forwarding, isAuthenticated computed property
- LibraryFeatureTests (5): search, filter cycle, sort cycle
- Fix existing tests: add import Foundation, use key path receive syntax

Makefile: add db-test, db-seed, mcp-test targets
