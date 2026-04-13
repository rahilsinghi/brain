---
title: Configurable Google Calendar ID for Karen Project
author: ai
created_at: 2026-04-12T17:36:25.625Z
last_ai_edit: 2026-04-12T17:36:25.625Z
last_human_edit: null
last_embedded_hash: 294e0348874050b3
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-calendar-use-configurable-calendar-id-instead-of-primar-4fe2b7.md]]"
tags:
  - karen
  - google calendar
  - service account
  - configuration
  - environment variables
  - bug fix
  - security
---


# Configurable Google Calendar ID for Karen Project

This commit addresses an issue in the Karen Project where the Google Service Account's 'primary' calendar referred to its own empty calendar instead of the user's intended calendar. The fix introduces a configurable `GOOGLE_CALENDAR_ID` environment variable, defaulting to 'primary' for backward compatibility, and updates the `.gitignore` to exclude sensitive service account key files.

## Key Concepts

[[Google Service Account]],[[Google Calendar ID]],[[Environment Variables]],[[Gitignore]],[[Configuration Management]],[[Bug Fix]]

## Details

This commit, identified by `888240c`, was made by Rahil Singhi on 2026-04-04 in the `rahilsinghi/karen` repository. It involved changes to 2 files, adding 9 lines and deleting 2 lines of code.

The core problem was that when a Google Service Account accessed the 'primary' calendar, it was referring to the service account's own, often empty, calendar rather than the user's primary calendar as expected. This led to incorrect calendar operations within the [[Karen Project]].

To resolve this, the system was updated to read the `GOOGLE_CALENDAR_ID` from environment variables. This allows developers and deployers to specify the exact calendar ID to be used, ensuring that the [[Karen Project]] interacts with the correct user calendar. For backward compatibility, if `GOOGLE_CALENDAR_ID` is not set, it defaults to 'primary'.

Additionally, the `.gitignore` file was updated to explicitly exclude service account key files, enhancing security by preventing sensitive credentials from being committed to the repository. The change was co-authored by Claude Opus 4.6.

## Related

[[Karen Project]],[[Google Service Account]],[[Google Calendar ID for Karen Project]],[[Calendar Service Update: Service Account Compatibility and Documentation Refresh]],[[Configurable Google Calendar ID for Karen Project]],[[Calendar Service Updates for Service Account Compatibility in Karen Project]]
