---
title: MarkPush as Pinned Featured Project on Portfolio
author: ai
created_at: 2026-04-11T00:30:37.392Z
last_ai_edit: 2026-04-11T00:30:37.392Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-add-markpush-as-pinned-featured-project-with-image-c-21c4f3.md]]"
tags:
  - portfolio
  - markpush
  - featured project
  - ui/ux
  - carousel
  - development
  - commit
---

# MarkPush as Pinned Featured Project on Portfolio

This update integrates the MarkPush project into the personal portfolio as a pinned featured project. It features a full-width hero card display with a 'PINNED' badge, an interactive three-image carousel, and direct links to its npm package and GitHub repository. The implementation involved extending the `FeaturedProject` data type to support pinning, image arrays, and npm integration.

## Key Concepts

MarkPush Project,Portfolio Feature Integration,Featured Project Cards,Image Carousel,UI/UX Enhancement,Data Type Extension

## Details

The `rahilsinghi/portfolio` repository received an update (SHA: a060562) on 2026-03-20 by [[Rahil Singhi]] to showcase the [[MarkPush]] project prominently. This enhancement introduced a new display format for featured projects:

*   **Full-width Hero Card**: MarkPush is presented in a large, visually impactful hero card.
*   **'PINNED' Badge**: A distinct badge signals its importance and priority.
*   **Three-Image Carousel**: Users can browse through a carousel featuring three key screenshots or visuals: 'feed', 'reader', and 'terminal', demonstrating different aspects of MarkPush.
*   **Direct Links**: Convenient links are provided for accessing the project's npm package and its [[MarkPush Project Screenshots|GitHub repository]], facilitating further exploration.

Technically, this required extending the `FeaturedProject` data type within the portfolio's codebase. New fields were added to support the 'pinned' status, an array for multiple 'images' in the carousel, and a dedicated field for the 'npm' link.

## Related

[[rahilsinghi/portfolio]],[[MarkPush Project Screenshots]],[[Documentation for MarkPush MCP Server Plan and System Architecture]],[[3D Tilt Effect on Featured Project Cards]],[[Rahil Singhi]]
