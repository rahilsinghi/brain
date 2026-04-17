---
title: Dashboard Image Upload and Text Query Feature
author: ai
created_at: 2026-04-10T15:22:28.272Z
last_ai_edit: 2026-04-10T15:22:28.272Z
last_human_edit: null
last_embedded_hash: 22c8ff34d411a37b
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-add-image-upload-text-query-to-dashboard-b0478f.md]]"
tags:
  - dashboard
  - feature
  - image upload
  - text query
  - websocket
  - asknyc
  - frontend
  - backend
  - demo
---


# Dashboard Image Upload and Text Query Feature

This feature introduces the capability to upload images and submit text queries directly from the dashboard, enhancing the interactivity of the askNYC application. It enables a full demo experience without requiring a physical phone or HTTPS deployment for certain functionalities.

## Key Concepts

* **Image Upload:** Ability to send image data from the dashboard.,* **Text Query:** Functionality to input and send textual questions.,* **WebSocket (WS):** Existing communication channel used for data transfer.,* **LiveRequestQueue:** Backend component for processing content, now including non-audio input.,* **CameraFeed (Dashboard Component):** UI element for image input.,* **IntelligenceBrief (Dashboard Component):** UI element for text input.

## Details

This new feature, introduced in commit `676e784` by Rahil Singhi on 2026-03-28, significantly enhances the askNYC dashboard's capabilities. Users can now interact with the system by:

*   **Uploading Images:** A drop zone in the `CameraFeed` component allows users to either drag-and-drop an image or click to select and upload a photo.
*   **Submitting Text Queries:** A dedicated text input field within the `IntelligenceBrief` component enables users to type a question and submit it.

Upon user interaction, the dashboard sends a structured message `{ type: dashboard_query, image, text }` over the existing WebSocket connection to the backend. The backend then processes this data:

*   Images are forwarded using the `send_video_frame` mechanism.
*   Text queries are handled via a newly introduced `send_text()` function. This `send_text()` function specifically utilizes `LiveRequestQueue.send_content()` to process non-audio input, extending the backend's content handling capabilities.

This development is crucial as it facilitates a comprehensive demo experience of the askNYC application without the need for a physical phone or a full HTTPS deployment, streamlining development and testing workflows.

## Related

[[askNYC]],[[LiveRequestQueue]],[[WebSocket]]
