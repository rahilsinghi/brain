---
title: Configurable Google Calendar ID for Karen Project
author: ai
created_at: 2026-04-10T19:12:56.151Z
last_ai_edit: 2026-04-10T19:12:56.151Z
last_human_edit: null
last_embedded_hash: cb85dcf96e575874
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-calendar-use-configurable-calendar-id-instead-of-primar-4fe2b7.md]]"
tags:
  - fix
  - calendar
  - google
  - environment variables
  - service account
  - security
  - karen
  - backwards compatibility
---


# Configurable Google Calendar ID for Karen Project

This commit addresses an issue in the 'karen' project where a service account's 'primary' Google Calendar ID was empty, not reflecting the user's actual calendar. It introduces a configurable `GOOGLE_CALENDAR_ID` environment variable, defaulting to 'primary' for backwards compatibility, and enhances security by gitignoring service account key files.

## Key Concepts

Google Calendar ID,Service Account,Environment Variables,Backwards Compatibility,Gitignore,API Integration

## Details

This commit (SHA: `888240c`) for the `rahilsinghi/karen` project, authored by Rahil Singhi on 2026-04-04T16:17:03Z, implements a crucial fix for Google Calendar integration.

**Problem Addressed:**
Previously, the system incorrectly assumed that a service account's 'primary' calendar ID would correspond to the user's main calendar. However, it was discovered that the service account's 'primary' calendar is an empty calendar associated with the service account itself, not the intended user's calendar.

**Solution Implemented:**
To resolve this, the system now reads the Google Calendar ID from an environment variable named `GOOGLE_CALENDAR_ID`. This provides flexibility, allowing users to specify the correct calendar ID. For existing setups, it defaults to 'primary' to maintain backwards compatibility, though this default is now understood to be for the service account's own calendar.

**Security Enhancement:**
In addition to the calendar ID fix, this change also includes a security improvement: service account key files are now added to `.gitignore`. This prevents sensitive credentials from being accidentally committed to version control.

This change involved modifications to 2 files, adding 9 lines and deleting 2 lines.

Co-Authored-By: Claude Opus 4.6

## Related

[[Karen (Project)]],[[Google Calendar API]],[[Service Accounts]],[[Environment Variables]],[[Gitignore]]
