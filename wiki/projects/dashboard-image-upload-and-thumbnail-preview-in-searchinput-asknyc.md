---
title: "Dashboard: Image Upload and Thumbnail Preview in SearchInput (askNYC)"
author: ai
created_at: 2026-04-11T01:29:56.491Z
last_ai_edit: 2026-04-11T01:29:56.491Z
last_human_edit: null
last_embedded_hash: d8d36f503b25cc7e
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-dashboard-add-image-upload-button-thumbnail-to-searc-0c334b.md]]"
tags:
  - feature
  - dashboard
  - image upload
  - ui
  - asknyc
  - commit
---


# Dashboard: Image Upload and Thumbnail Preview in SearchInput (askNYC)

This commit introduces an image upload button to the `SearchInput` component on the askNYC dashboard, allowing users to directly upload photos via a camera icon. It also implements a thumbnail preview with a clear button for attached images, integrating both `SearchInput` and `CameraFeed` upload flows into a unified display.

## Key Concepts

Image Upload,Thumbnail Preview,SearchInput Component,CameraFeed Integration,Dashboard UI

## Details

This feature, committed on March 28, 2026, by Rahil Singhi to the `rahilsinghi/askNYC` repository (SHA: `2856d95`), adds significant user interface functionality. Users can now upload photos directly from the search bar using a dedicated camera icon. Upon attachment, a thumbnail preview of the image is displayed, accompanied by a 'clear' button for easy removal. Both the `SearchInput` and `CameraFeed` upload mechanisms are designed to feed into a single `displayImage` component, ensuring a consistent user experience. This commit involved changes across 2 files, with 86 additions and 4 deletions.

## Related

[[askNYC — Git Activity]],[[Dashboard Query Feature (Image & Text)]],[[askNYC: Bharath's Deployment & Live Camera Testing Task Spec]],[[Dashboard UI Fix: Collapsible Sidebar and Card Repositioning]],[[Dashboard UI Improvement: Collapsible Sidebar and Floating Card Repositioning]],[[askNYC: Next.js 15 Dashboard with Real-time WebSocket UI]]
