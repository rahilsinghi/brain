---
title: "Fix: Calendar Service - Remove Attendees for Service Account Compatibility"
author: ai
created_at: 2026-04-11T01:36:23.367Z
last_ai_edit: 2026-04-11T01:36:23.367Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-calendar-remove-attendees-for-service-account-compat-up-de2286.md]]"
tags:
  - calendar
  - service account
  - bug fix
  - documentation
  - frontend
  - karen project
---

# Fix: Calendar Service - Remove Attendees for Service Account Compatibility

This commit addresses a compatibility issue in the Calendar service by removing the 'attendees' field, enabling service accounts to manage events directly on shared calendars. It also includes updates to project documentation files (`PROGRESS.md`, `NEXT_STEPS.md`, `FRONTEND_CHANGES.md`) to reflect current project status and assign UI tasks.

## Key Concepts

Calendar Service,Service Accounts,Domain-Wide Delegation,Documentation Updates,Frontend Development Tasks

## Details

This commit (SHA: `c1863fb`) primarily focuses on fixing an issue within the [[Karen Project]]'s calendar integration. The `attendees` field was removed from calendar event creation when using service accounts, as direct invitation via service accounts without [[Domain-Wide Delegation]] is not supported. Events will now appear directly on the shared calendar.

In addition to the service fix, several project documentation files were updated:
*   `PROGRESS.md`: All channel statuses were updated following recent integration testing.
*   `NEXT_STEPS.md`: This document was entirely rewritten to reflect the current state of the project and outline remaining tasks.
*   `FRONTEND_CHANGES.md`: A new file was created to detail specific UI tasks for [[Sariya's Task]] (Sariya), streamlining frontend development assignments.

## Related

[[Karen Project]],[[Calendar Service Update: Service Account Compatibility and Documentation Refresh]],[[Sariya's Task]],[[Domain-Wide Delegation]],[[Service Account]]
