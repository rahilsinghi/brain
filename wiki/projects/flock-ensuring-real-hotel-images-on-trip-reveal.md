---
title: "Flock: Ensuring Real Hotel Images on Trip Reveal"
author: ai
created_at: 2026-04-10T17:12:01.905Z
last_ai_edit: 2026-04-10T17:12:01.905Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-reveal-uses-real-hotel-images-from-db-not-model-generate-754711.md]]"
tags:
  - fix
  - images
  - hotel
  - database
  - gemini vision
  - google places
  - flock
  - commit
  - b9b3328
  - trip reveal
  - ai assisted
---

# Flock: Ensuring Real Hotel Images on Trip Reveal

This commit (b9b3328) for the Flock project addresses an issue where trip reveal cards were displaying model-generated placeholder image URLs. It implements a robust fix to retrieve and display authentic hotel photography from a Gemini Vision-enriched database, primarily utilizing Google Places photos for accuracy.

## Key Concepts

Trip Reveal,Hotel Image Management,Gemini Vision Integration,Google Places API,Image Fallback Strategy,Database Lookup

## Details

This commit (`b9b3328`) by [[Rahil Singhi]] on March 21, 2026, within the [[Flock (Project)]] repository, resolves an issue where trip reveal cards displayed placeholder or model-generated URLs for hotel images.

The fix ensures that real hotel photography is utilized by implementing the following logic when the `finalize_trip` function encounters a non-real image URL:
1.  The system performs a lookup for the hotel name in the `hotels` database table.
2.  It then attempts to retrieve a `hero_image_url` directly from [[Google Places photos]].
3.  As a fallback, if a specific hero image is not available, the `first photo_url` associated with the hotel is used.
4.  Additionally, city-level hotel photos are fetched to enhance the background visuals.

This change guarantees that [[Trip Reveal (Feature)]] cards consistently showcase authentic hotel imagery, directly sourced from a [[Gemini Vision]]-enriched database, thereby eliminating placeholder visuals. The modification involved 1 file, resulting in 26 additions and 1 deletion. This work was co-authored with [[Claude Opus 4.6 (AI)]].

## Related

[[Flock (Project)]],[[Rahil Singhi]],[[Gemini Vision]],[[Google Places photos]],[[Trip Reveal (Feature)]],[[Claude Opus 4.6 (AI)]]
