---
title: "Fix: Level 10 Skip, De-escalation UI, and Scrollable Panels in Karen Project"
author: ai
created_at: 2026-04-12T17:58:30.445Z
last_ai_edit: 2026-04-12T17:58:30.445Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-level-10-skipped-de-escalation-ui-scrollable-panels-d64548.md]]"
tags:
  - karen project
  - bug fix
  - ui improvement
  - backend
  - frontend
  - de-escalation
  - scrollable panels
  - fedex
  - escalation management
---

# Fix: Level 10 Skip, De-escalation UI, and Scrollable Panels in Karen Project

This commit addresses a critical backend issue where 'Level 10' events were silently skipped if the channel (e.g., FedEx) was not on an exemption list. Additionally, it significantly improves the frontend UI by adding a de-escalation sequence panel, ensuring UI updates during resolution, and making several key panels scrollable for better usability.

## Key Concepts

Channel skip-exemption list,Level 10 events,De-escalation UI,Scrollable panels,REFRESH_EVENTS

## Details

This commit (`2e8bad6`) to the `rahilsinghi/karen` repository introduces several important fixes and UI enhancements:

**Backend:**
*   Added "fedex" to the channel skip-exemption list. Previously, Level 10 events were silently skipped if the channel, like FedEx, was not explicitly included in the always-available set, leading to missed escalations.

**Frontend:**
*   Integrated `deescalation_step` into `REFRESH_EVENTS` to ensure that the UI dynamically updates and reflects the progress during the resolution process.
*   Implemented a dedicated de-escalation sequence panel, visually indicating each step with checkmarks or crosses as they are completed or failed.
*   Enhanced the user interface by making the center column, right sidebar, and "Intel Gathered" sections scrollable. All interactive panels now feature `overflow-y-auto` with a custom scrollbar for improved content navigation.

## Related

[[Karen Project]],[[Backend Core Implementation: FastAPI, Pydantic, and Docker]],[[Authentic Command Center and Escalation Fortress UI Implementation (Karen Project)]],[[UI updates]],[[Backend Fixes]],[[Frontend Fixes]],[[Authentic Command Center and Escalation Fortress UI Merge for Karen Project]]
