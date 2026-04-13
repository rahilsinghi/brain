---
title: Dashboard Image Upload and Text Query Feature (askNYC)
author: ai
created_at: 2026-04-11T01:39:14.509Z
last_ai_edit: 2026-04-11T01:39:14.509Z
last_human_edit: null
last_embedded_hash: de08874b04a560f3
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-add-image-upload-text-query-to-dashboard-b0478f.md]]"
tags:
  - asknyc
  - dashboard
  - image upload
  - text query
  - frontend
  - backend
  - websocket
  - feature
---


# Dashboard Image Upload and Text Query Feature (askNYC)

This feature introduces the ability to upload images and submit text queries directly from the askNYC dashboard. It allows users to interact with the system using both visual and textual input, facilitating a full demo experience without relying on a phone or HTTPS deployment.

## Key Concepts

[[askNYC]] Dashboard,Image Upload,Text Query,WebSocket Communication,Frontend-Backend Integration,LiveRequestQueue

## Details

A new feature, implemented in commit `676e784` for the [[askNYC]] project, enhances the user interaction on the dashboard by enabling image uploads and text-based queries. Users can now interact with the system via:

*   **Image Upload**: A drop zone within the `CameraFeed` component allows for drag-and-drop or click-to-upload functionality for photos.
*   **Text Query**: A dedicated text input field in the `IntelligenceBrief` section enables users to type questions and submit them.

Upon submission, the dashboard sends a structured `{ type: dashboard_query, image, text }` message over the existing WebSocket connection. The backend processes this by forwarding the image data via `send_video_frame` and the text input through a new `send_text()` function. The `send_text()` function utilizes the `LiveRequestQueue.send_content()` method to handle non-audio inputs. This update significantly improves the demo capabilities of [[askNYC]], allowing for comprehensive demonstrations without requiring a physical phone or an HTTPS-secured deployment.

## Related

[[askNYC]],[[Dashboard Image Upload and Text Query Feature]],[[Dashboard Query Feature (Image & Text)]],[[askNYC Backend Hardening (ad6b409)]],[[askNYC Frontend Backend Integration Update (2026-03-28)]],[[askNYC: Frontend Pages Wired to Backend (March 2026)]],[[CLAUDE.md Update: Composite Tool Architecture and Session Persistence in askNYC]],[[askNYC: Functional Splash Page, Dashboard Query Params, and Settings Panel]],[[WebSocket]]
