---
title: "fix(insights+archive): Wire Real Session Data and Fix Navigation"
author: ai
created_at: 2026-04-10T21:44:10.478Z
last_ai_edit: 2026-04-10T21:44:10.478Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-insights-archive-wire-real-session-data-fix-navigatio-28b3aa.md]]"
tags:
  - commit
  - fix
  - backend
  - frontend
  - insights
  - archive
  - navigation
  - sessiondata
  - asknyc
  - persistance
---

# fix(insights+archive): Wire Real Session Data and Fix Navigation

This commit addresses issues in the `askNYC` project by wiring real session data into the insights and archive features and improving navigation. Backend changes include persisting session state information, while frontend updates enhance user experience on the insights and archive pages.

## Key Concepts

- Backend Development,- Frontend Development,- Session Management,- User Interface (UI) Navigation,- Data Persistence,- Code Refactoring

## Details

This commit, authored by [[Rahil Singhi]] on 2026-03-28, focuses on improving the `insights` and `archive` functionalities within the [[askNYC]] project. It involved changes across 6 files, with +37 additions and -12 deletions.

**Backend Changes:**
- Modified `SessionState` to include `location_address`.
- Implemented persistence for `cards` and `datasets_queried` from the `_do_investigate()` function, likely utilizing a module-level state reference.
- Ensured `location_address` is saved within `session_service` and upon `ws session_complete` events.

**Frontend Changes:**
- Updated the navigation link text from "Back to Atlas" to simply "Back" on both the `insights` and `archive` pages.
- Reconfigured these "Back" links to navigate to the `/dashboard` route.
- Added `overflow-y-auto` CSS property to the `insights` page to enable vertical scrollability, improving content accessibility.

## Related

[[Rahil Singhi]],[[askNYC]],[[Insights Feature]],[[Archive Feature]],[[SessionState]],[[Dashboard]]
