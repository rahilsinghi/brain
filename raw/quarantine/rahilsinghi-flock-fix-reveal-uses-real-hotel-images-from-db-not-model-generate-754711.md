---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:b9b3328
ingested_at: 2026-04-09T22:03:19.498Z
parsed_at: 2026-04-09T22:03:19.498Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM2WhXywW99eaitBWCy"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:10.220Z
---






# fix: reveal uses real hotel images from DB, not model-generated URLs

- **Repo:** rahilsinghi/Flock
- **SHA:** b9b3328
- **Date:** 2026-03-21T18:37:36Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +26
- **Deletions:** -1

When finalize_trip runs, if the model passes a fake/example URL:
1. Looks up the hotel name in the hotels table
2. Uses real hero_image_url from Google Places photos
3. Falls back to first photo_url if no hero image
4. Also fetches city-level hotel photos for background

This ensures the reveal card shows real hotel photography from
our Gemini Vision-enriched database, not placeholder images.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
