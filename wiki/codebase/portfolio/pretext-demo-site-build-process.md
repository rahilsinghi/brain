---
title: Pretext Demo Site Build Process
author: ai
created_at: 2026-04-13T19:06:14.299Z
last_ai_edit: 2026-04-13T19:06:14.299Z
last_human_edit: null
last_embedded_hash: 7ec0d719a66f4d4a
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/portfolio/portfolio-community-41.md]]"
tags:
  - code-community
  - portfolio
  - graphify
aliases:
  - Community 41
---



# Pretext Demo Site Build Process

This code community encapsulates the build process for the Pretext demo site within the portfolio, focusing on adapting the output for static hosting. It handles resolving HTML paths, moving built files, re-basing relative asset URLs, and rewriting demo links for correct static deployment.

## Key Concepts

Demo Site Generation,Static Site Build Automation,HTML Path Resolution,Asset URL Re-basing,Link Rewriting for Static Hosting

## Details

This code community is centered around the `build-demo-site.ts` script, located at `/Users/rahilsinghi/Desktop/portfolio/pretext/scripts/build-demo-site.ts`. Its primary purpose is to automate the preparation and optimization of the [[Pretext Submodule and @chenglou/pretext Dependency]] demo site for static web hosting.

The script orchestrates a series of interconnected operations:
*   **`build_demo_site`**: This is the main orchestrator, which contains and calls the other specific functions.
*   **`build_demo_site_resolvebuilthtmlpath`**: This function is responsible for determining and resolving the correct output paths for the generated HTML files. It is a precursor to moving the files.
*   **`build_demo_site_movebuilthtml`**: After path resolution, this function takes the compiled HTML and moves it to its designated static build directory. Crucially, it then triggers the subsequent processing steps: `rebaserelativeasseturls` and `rewritedemolinksforstaticroot`.
*   **`build_demo_site_rebaserelativeasseturls`**: This step adjusts relative URLs within the HTML content (e.g., for CSS, JavaScript, images) to ensure they correctly point to their respective assets once the site is served from a static root. This prevents broken links for resources.
*   **`build_demo_site_rewritedemolinksforstaticroot`**: This function modifies internal navigation links within the demo site to ensure they remain functional and correctly resolve when the entire site is hosted statically, typically by converting them to root-relative paths.

This build process ensures that the [[Pretext Submodule and @chenglou/pretext Dependency]] demo site is self-contained and navigable when deployed statically, without reliance on a dynamic server-side component.

## Related

[[portfolio]],[[Pretext Submodule and @chenglou/pretext Dependency]]
