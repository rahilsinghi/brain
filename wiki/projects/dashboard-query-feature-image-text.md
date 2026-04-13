---
title: Dashboard Query Feature (Image & Text)
author: ai
created_at: 2026-04-10T21:41:55.104Z
last_ai_edit: 2026-04-10T21:41:55.104Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-add-image-upload-text-query-to-dashboard-b0478f.md]]"
tags:
  - image upload
  - text query
  - dashboard
  - websockets
  - asknyc
  - feature
  - frontend
  - backend
  - demo
  - live request queue
  - commit
---

# Dashboard Query Feature (Image & Text)

This article details the implementation of image upload and text querying capabilities within the `askNYC` dashboard. This feature allows users to directly input visual and textual queries, transmitted via WebSockets to the backend. It significantly enhances the ability to conduct full system demonstrations without relying on a physical phone or HTTPS deployment.

## Key Concepts

Image Upload,Text Query,Dashboard Interface,WebSockets,LiveRequestQueue,CameraFeed (UI Component),IntelligenceBrief (UI Component),Offline/Local Demo Capability

## Details

The `askNYC` dashboard has been enhanced with new functionalities for image upload and text-based queries, introduced in commit `676e784` by [[Rahil Singhi]] on 2026-03-28.

### User Interface Enhancements:
*   **Image Upload:** A dedicated "Drop zone" has been integrated into the [[CameraFeed Component]]. This allows users to upload images by either dragging and dropping files onto the zone or by clicking it to select a file from their system.
*   **Text Query:** The [[IntelligenceBrief Component]] now includes a text input field. Users can type their questions directly into this field and submit them to the system.

### Backend and Communication Flow:
*   The dashboard communicates these new inputs to the backend using an existing [[WebSockets]] connection. It sends a structured JSON object with the format `{ type: dashboard_query, image, text }`.
*   The backend processes these incoming queries:
    *   Images are forwarded using the `send_video_frame` mechanism.
    *   Text queries are handled by a newly introduced `send_text()` function.
*   The `send_text()` function specifically utilizes `[[LiveRequestQueue]].send_content()` to process non-audio input, ensuring it integrates seamlessly into the existing request handling pipeline.

### Benefits:
This integration significantly improves the development and demonstration workflow for the [[askNYC Project]]. It enables a full system demo without the need for a physical phone device or a complete HTTPS deployment, streamlining testing and presentation efforts.

## Related

[[askNYC Project]],[[Rahil Singhi]],[[WebSockets]],[[LiveRequestQueue]],[[CameraFeed Component]],[[IntelligenceBrief Component]]
