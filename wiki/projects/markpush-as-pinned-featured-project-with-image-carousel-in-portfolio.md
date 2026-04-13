---
title: MarkPush as Pinned Featured Project with Image Carousel in Portfolio
author: ai
created_at: 2026-04-11T00:27:35.227Z
last_ai_edit: 2026-04-11T00:27:35.227Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-add-markpush-as-pinned-featured-project-with-image-c-21c4f3.md]]"
tags:
  - portfolio
  - feature
  - markpush
  - ui
  - carousel
  - pinned
  - project
---

# MarkPush as Pinned Featured Project with Image Carousel in Portfolio

This update introduces MarkPush as a pinned featured project in the portfolio, displayed with a full-width hero card, a 'PINNED' badge, and a 3-image carousel showcasing its 'feed', 'reader', and 'terminal' views. It also includes direct links to its npm and GitHub repositories, facilitated by extending the `FeaturedProject` type.

## Key Concepts

Pinned Featured Project,Image Carousel,FeaturedProject Type Extension,Hero Card,NPM Link Integration,GitHub Link Integration

## Details

The `rahilsinghi/portfolio` repository received an update (SHA: `a060562`) on 2026-03-20 to prominently feature the [[MarkPush]] project. This involved implementing a new display format for MarkPush as a 'pinned' project. The UI now renders MarkPush as a full-width hero card, complete with a 'PINNED' badge for immediate visibility.

A key visual enhancement is the addition of a 3-image carousel, allowing users to scroll through different aspects of MarkPush: its 'feed', 'reader', and 'terminal' interfaces. This change was accompanied by the integration of direct links to MarkPush's npm package and GitHub repository, improving accessibility to the project's resources.

Technically, the `FeaturedProject` type was extended to accommodate new fields: `pinned`, `images` (for the carousel), and `npm` (for the npm link). This ensures that the portfolio's data structure supports the enriched presentation of featured projects. The changes involved 2 file modifications, adding 255 lines and removing 3.

## Related

[[MarkPush Project Screenshots]],[[Branded CLI Output and Polished MCP Tool Responses (MarkPush)]],[[CLAUDE.md]],[[rahilsinghi/portfolio]]
