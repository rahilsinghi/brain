---
title: "Flock: Real Hotel Images for Reveal Card (b9b3328)"
author: ai
created_at: 2026-04-10T21:13:03.907Z
last_ai_edit: 2026-04-10T21:13:03.907Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-reveal-uses-real-hotel-images-from-db-not-model-generate-754711.md]]"
tags:
  - flock
  - fix
  - hotel images
  - realism
  - gemini vision
  - google places
  - database
  - reveal card
  - b9b3328
---

# Flock: Real Hotel Images for Reveal Card (b9b3328)

This commit (b9b3328) for the Flock project ensures that the trip reveal card displays authentic hotel imagery instead of placeholder or model-generated URLs. It fetches real hero images and other photos from the database, leveraging Google Places and Gemini Vision data.
This significantly enhances the realism of the user experience by showcasing actual hotel photography.

## Key Concepts

Gemini Vision,Google Places Photos,Hotel Image Database,Trip Reveal Card,Model-Generated URLs,finalize_trip function

## Details

The commit `b9b3328` by Rahil Singhi, dated 2026-03-21, addresses an issue where the trip reveal card might display fake or model-generated URLs for hotel images.

The `finalize_trip` function has been updated with the following logic to ensure real hotel images are used:

*   **Hotel Lookup:** If the model provides a fake or example URL for a hotel, the system first looks up the hotel name in the internal `hotels` table.
*   **Hero Image Priority:** It prioritizes using the `hero_image_url` which is derived from Google Places photos, providing high-quality, real imagery.
*   **Fallback Photo:** If a `hero_image_url` is not available, it falls back to using the first available `photo_url` associated with the hotel in the database.
*   **City-Level Backgrounds:** The system also fetches city-level hotel photos to be used for background imagery on the reveal card.

This enhancement guarantees that the 'reveal' card presents authentic hotel photography, sourced from a Gemini Vision-enriched database, delivering a more realistic and engaging user experience.

## Related

[[Flock Project]],[[Gemini Vision]],[[Google Places API]],[[Hotel Images]],[[finalize_trip function]]
