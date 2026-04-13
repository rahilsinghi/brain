---
title: Image Upload and Text Query Functionality for askNYC Dashboard
author: ai
created_at: 2026-04-12T22:17:47.427Z
last_ai_edit: 2026-04-12T22:17:47.427Z
last_human_edit: null
last_embedded_hash: null
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
  - demo
---

# Image Upload and Text Query Functionality for askNYC Dashboard

This feature introduces direct image upload and text querying capabilities to the [[askNYC]] dashboard. Users can now drag-and-drop or type questions directly within the dashboard, streamlining the demo experience and eliminating the need for phone-based input or HTTPS deployment.

## Key Concepts

Image Upload,Text Query,WebSocket Communication,`LiveRequestQueue`,Frontend-Backend Integration,Demo Workflow

## Details

This commit, identified by SHA `676e784` from the `rahilsinghi/askNYC` repository, integrates new interactive capabilities into the [[askNYC]] dashboard. Authored by [[Rahil Singhi]] on 2026-03-28, this update involved 6 file changes, with 200 additions and 48 deletions.

The primary enhancements include:

*   **Image Upload**: A drag-and-drop zone has been added to the `CameraFeed` component, allowing users to upload images directly from their desktop. Users can also click the zone to select a file.
*   **Text Query**: A dedicated text input field is now available in the `IntelligenceBrief` section. Users can type natural language questions and submit them.
*   **Communication Workflow**: Both uploaded images and text queries are transmitted to the [[ADK Multi-Agent Backend (askNYC Project)|backend]] via the existing [[askNYC: Next.js 15 Dashboard with Real-time WebSocket UI|WebSocket]] connection. The data payload is structured as `{ type: dashboard_query, image, text }`.
*   **Backend Processing**: Images are forwarded using the `send_video_frame` mechanism. Text queries are handled by a new `send_text()` function which leverages `LiveRequestQueue.send_content()` to process non-audio inputs, expanding the backend's ability to handle diverse query types.

This functionality significantly improves the demonstration experience for [[askNYC]], as it enables a full demo scenario without requiring a physical phone or an HTTPS-deployed environment, making testing and presentation more convenient. This builds upon previous efforts to enhance the [[askNYC: Functional Splash Page, Dashboard Query Params, and Settings Panel|dashboard]] and [[askNYC: Remote Image Capture and Dashboard Integration (PR #4)|image capture]] capabilities.

## Related

[[askNYC — Git Activity]],[[askNYC: 3D Map-Dominant Dashboard UI Redesign]],[[askNYC: Image Upload and Thumbnail Preview in SearchInput]],[[askNYC: Remote Image Capture and Dashboard Integration (PR #4)]],[[AskNYC Recommendation Page with Multi-Agent Pipeline]],[[askNYC: Next.js 15 Dashboard with Real-time WebSocket UI]],[[ADK Multi-Agent Backend (askNYC Project)]],[[askNYC Backend Hardening (ad6b409)]],[[askNYC: Functional Splash Page, Dashboard Query Params, and Settings Panel]],[[Rahil Singhi]],[[askNYC]],[[WebSocket]],[[Frontend-Backend Integration]]
