---
title: "Calendar Service Update: Service Account Compatibility and Documentation Refresh"
author: ai
created_at: 2026-04-13T17:47:03.880Z
last_ai_edit: 2026-04-13T17:47:03.880Z
last_human_edit: null
last_embedded_hash: bfd83070d9ebc96e
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-calendar-remove-attendees-for-service-account-compat-up-de2286.md]]"
tags:
  - karen
  - calendar
  - service account
  - documentation
  - frontend
  - bugfix
---


# Calendar Service Update: Service Account Compatibility and Documentation Refresh

This update addresses compatibility issues within the Karen project's calendar service by removing attendee fields, enabling direct event creation on shared calendars. It also includes significant documentation updates across `PROGRESS.md`, `NEXT_STEPS.md`, and a new `FRONTEND_CHANGES.md` file outlining UI tasks for Sariya.

## Key Concepts

Calendar Service,Service Accounts,Domain-Wide Delegation (DWD),Documentation Management,Frontend Development Tasks

## Details

This commit (SHA: `c1863fb`) for the [[Karen Project]] focuses on a critical fix for the calendar service and comprehensive documentation updates.

**Calendar Service Compatibility:** The primary change involves the `calendar` service, where the 'attendees' field has been removed. This modification is crucial for compatibility with service accounts, as they typically cannot invite individuals to events without explicit [[Domain-Wide Delegation (DWD)]] configured. By removing this field, events are now designed to appear directly on a shared calendar, streamlining the process and avoiding authentication hurdles.

**Documentation Refresh:** Several key documentation files were updated to reflect the current state and future tasks:
*   **`PROGRESS.md`**: All channel statuses were updated following integration testing, providing an accurate overview of project advancement.
*   **`NEXT_STEPS.md`**: This file was completely rewritten to reflect the current state of the project and clearly delineate remaining tasks, offering a refined roadmap.
*   **`FRONTEND_CHANGES.md`**: A new file was introduced specifically detailing UI tasks assigned to Sariya, ensuring clear communication and organization for frontend development.

## Related

[[Karen Project]],[[Calendar Service Update: Service Account Compatibility and Documentation Refresh]],[[Calendar Service Updates for Service Account Compatibility in Karen Project]],[[AskNYC Frontend UI Specification (Sariya's Task)]]
