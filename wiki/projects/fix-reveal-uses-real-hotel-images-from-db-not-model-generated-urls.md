---
title: "Fix: Reveal Uses Real Hotel Images from DB, Not Model-Generated URLs"
author: ai
created_at: 2026-04-12T17:23:19.384Z
last_ai_edit: 2026-04-12T17:23:19.384Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-reveal-uses-real-hotel-images-from-db-not-model-generate-754711.md]]"
tags:
  - flock
  - bugfix
  - hotel images
  - database
  - google places
  - gemini vision
  - image fallback
  - reveal card
---

# Fix: Reveal Uses Real Hotel Images from DB, Not Model-Generated URLs

This commit for the Flock project resolves an issue where the trip reveal card would display placeholder or model-generated hotel images. It implements a lookup mechanism to fetch and display actual hotel photography from a Gemini Vision-enriched database, utilizing Google Places photos for accuracy. The fix ensures a more authentic visual presentation for trip details.

## Key Concepts

Hotel Image Display,Database Integration,Google Places API,Gemini Vision,Image Fallback Mechanism,Trip Finalization

## Details

This commit (SHA: b9b3328) by Rahil Singhi on 2026-03-21 addresses a critical display issue within the [[Flock Project]] where the `reveal` feature was showing model-generated or fake URLs for hotel images, rather than real photography.

The `finalize_trip` process has been updated with the following logic:

1.  **Hotel Lookup**: If the model provides a placeholder or example URL, the system now queries the internal `hotels` table using the hotel name.
2.  **Hero Image Retrieval**: It then attempts to retrieve the real `hero_image_url` for the hotel, preferably sourced from [[Google Places API]] photos.
3.  **Fallback Mechanism**: If no specific `hero_image_url` is available, the system falls back to using the first available `photo_url` for the hotel.
4.  **Contextual Background**: Additionally, city-level hotel photos are fetched to serve as background images, enhancing the overall visual experience.

This robust image retrieval strategy guarantees that the [[Reveal Card Feature]] presents authentic hotel photography, sourced from the [[Gemini Vision]]-enriched database, instead of generic or unverified images. This change was implemented with assistance from [[Claude Opus 4.6]].

**Commit Details:**
*   **Repo:** `rahilsinghi/Flock`
*   **SHA:** `b9b3328`
*   **Date:** `2026-03-21T18:37:36Z`
*   **Author:** Rahil Singhi
*   **Files changed:** 1
*   **Additions:** +26
*   **Deletions:** -1

## Related

[[Flock Project]],[[Google Places API]],[[Gemini Vision]],[[Claude Opus]],[[finalize_trip]],[[Hotels Database]],[[Reveal Card Feature]],[[Aishwarya Session Prompt Update – Flock Backend State Snapshot]],[[Aishwarya Session Prompt Update – Flock Repo State (e98074d)]]
