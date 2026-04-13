---
title: Image Upload and Text Query to askNYC Dashboard
author: ai
created_at: 2026-04-13T17:45:45.986Z
last_ai_edit: 2026-04-13T17:45:45.986Z
last_human_edit: null
last_embedded_hash: 11a70bfc422935e2
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-add-image-upload-text-query-to-dashboard-b0478f.md]]"
tags:
  - asknyc
  - dashboard
  - image upload
  - text query
  - websocket
  - frontend
  - backend
  - feature
  - development
  - testing
---


# Image Upload and Text Query to askNYC Dashboard

This feature introduces image upload via drag-and-drop or click, and a text input field to the askNYC dashboard. It enables users to submit both visual and textual queries to the backend over an existing WebSocket connection, facilitating full demo capabilities without requiring a phone or HTTPS deployment.

## Key Concepts

Image Upload,Text Query,WebSocket Communication,LiveRequestQueue,Dashboard UI,Development Workflow

## Details

This commit (`676e784`) for the `rahilsinghi/askNYC` repository, authored by Rahil Singhi on March 28, 2026, introduces new interaction capabilities to the askNYC dashboard. The changes involved 6 files, with 200 additions and 48 deletions.

Key features added include:

*   **Image Upload**: A drop zone is implemented within the `CameraFeed` component, allowing users to upload photos via drag-and-drop or by clicking to select an image.
*   **Text Query**: An input field is added to the `IntelligenceBrief` component, enabling users to type a question and submit it to the system.

These new inputs are communicated to the backend:

*   The dashboard sends an object `{ type: dashboard_query, image, text }` over the existing WebSocket connection.
*   The backend processes the image by forwarding it via the `send_video_frame` function.
*   Text queries are handled by a new `send_text()` function, which utilizes `LiveRequestQueue.send_content()` for non-audio input.

This enhancement is crucial as it enables a full demonstration of the askNYC system's capabilities without relying on a physical phone device or requiring an HTTPS deployment, streamlining the development and testing workflow.

## Related

[[askNYC]],[[askNYC Backend: WebSocket and Vertex AI Connection Fixes]],[[askNYC: Image Upload and Thumbnail Preview in SearchInput]],[[askNYC: Remote Image Capture and Dashboard Integration (PR #4)]],[[askNYC: Functional Splash Page, Dashboard Query Params, and Settings Panel]],[[LiveRequestQueue]],[[CameraFeed]],[[IntelligenceBrief]]
