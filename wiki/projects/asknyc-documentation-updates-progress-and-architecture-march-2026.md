---
title: "askNYC Documentation Updates: Progress and Architecture (March 2026)"
author: ai
created_at: 2026-04-13T17:35:09.848Z
last_ai_edit: 2026-04-13T17:35:09.848Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-docs-update-claudemd-projectmd-nextmd-with-recent-progr-8000ac.md]]"
tags:
  - asknyc
  - documentation
  - project management
  - feature completion
  - architecture
  - session state
  - bug fixes
  - rahilsinghi
  - claudemd
  - projectmd
  - nextmd
---

# askNYC Documentation Updates: Progress and Architecture (March 2026)

This commit updates key documentation files, CLAUDE.md, PROJECT.md, and NEXT.md, for the askNYC project. It marks significant progress on features like the insights page, archive page, and collapsible sidebar as complete, and integrates new architectural components into diagrams. The update also details improvements in session state persistence and addresses recent bug fixes.

## Key Concepts

Documentation Management,Architecture Diagrams,Session State,Feature Completion Tracking,Bug Fixes,Project Status Reporting

## Details

This update, made on `2026-03-28T17:05:26Z` by Rahil Singhi (SHA: `b0244b9`), focuses on bringing the documentation for the `rahilsinghi/askNYC` project up to date with recent developments. The following documentation files were modified:

*   `CLAUDE.md`: Updated to reflect current progress and architectural changes.
*   `PROJECT.md`: Provides an overview of the project status and known issues.
*   `NEXT.md`: Outlines future plans and priorities.

Key changes and completions documented include:

*   **Feature Completion**: The 'insights' page, 'archive' page, collapsible sidebar, floating cards, and the session data pipeline have been marked as complete.
*   **Architectural Updates**: The architecture diagrams within the documentation now incorporate newly implemented components such as `FloatingCards`, the `Collapsible Sidebar`, and the `Insights page`.
*   **Session State Persistence**: The `investigate_location()` function is now documented to correctly persist `location_address`, `datasets_queried`, and `cards` to the [[Session State]], ensuring data continuity across user interactions.
*   **Bug Fixes**: Recent bug fixes have been added to the 'known issues' table in the [[PROJECT.md]] file.
*   **Build Priority**: The build priority has been updated to reflect the completion of new features, streamlining future development efforts.

## Related

[[askNYC]],[[askNYC CLAUDE.md Update: Pipeline, Project Structure, and Architecture]],[[askNYC Project Documentation Overview]],[[askNYC: Wire Real Session Data and Fix Navigation (Insights & Archive)]],[[askNYC: Collapsible Sidebar and Repositioned Floating Cards]],[[askNYC: Floating Data Cards & Map FlyTo Fix (Commit 202fec2)]],[[askNYC Build Fixes and Architecture Documentation Update]],[[Session State]],[[Bug Fixes]],[[Documentation Updates]]
