---
title: "iMessage Scheduler: Scheduled Time Picker, iMessage-Style UI, and Status Timeline"
author: ai
created_at: 2026-04-13T15:51:24.113Z
last_ai_edit: 2026-04-13T15:51:24.113Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-imessage-scheduler-add-scheduled-time-picker-imessage-style-ui-sta-29c932.md]]"
tags:
  - imessage-scheduler
  - ui/ux
  - backend
  - frontend
  - scheduling
  - status tracking
  - animations
---

# iMessage Scheduler: Scheduled Time Picker, iMessage-Style UI, and Status Timeline

This update to the iMessage Scheduler introduces a scheduled time picker, a redesigned iMessage-style user interface, and a comprehensive status timeline for messages. It enhances both backend functionality to respect future timestamps and frontend presentation with blue bubbles, live countdowns, and categorized message sections.

## Key Concepts

Scheduled Messaging,User Interface Design,iMessage-style UI,Status Timeline,Queue Worker,Datetime Picker,Staggered Animations

## Details

This significant update to the `imessage-scheduler` project (SHA: `f477fe4`, dated 2026-03-10) by [[Rahil Singhi]] introduces several key features across both the backend and frontend.

**Backend Enhancements:**
*   A new `scheduledFor` column with migration was added to the database, allowing messages to be scheduled for future delivery.
*   The queue worker now respects these future timestamps, processing messages only when their scheduled time arrives.

**Frontend Features:**
*   **Datetime Picker with Toggle:** Users can now select a specific date and time for message delivery, alongside an intuitive toggle.
*   **iMessage Blue Bubbles:** The UI has been updated to mimic the aesthetic of iMessage, featuring distinct blue message bubbles.
*   **Live Countdown:** A live countdown is displayed for scheduled messages, showing the remaining time until dispatch.
*   **Status Timeline:** Each message card includes a visual status timeline, progressing through states: `QUEUED` > `ACCEPTED` > `SENT` > `DELIVERED`.
*   **Categorized Messages:** Messages are logically grouped into sections: `Upcoming`, `Queued`, `In Progress`, `Sent`, and `Failed`, improving organization and user navigation.
*   **UI Animations:** The interface incorporates staggered card animations and smooth tab transitions for a more dynamic and engaging user experience.

## Related

[[iMessage Scheduler]],[[Rahil Singhi]],Add One-Command Start Script and Rewrite README for Clarity (iMessage Scheduler)
