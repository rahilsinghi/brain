---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:1c8f44c
ingested_at: 2026-04-09T04:03:38.390Z
parsed_at: 2026-04-09T04:03:38.390Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Fix LinkedIn scraper - now working with cookie auth

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 1c8f44c
- **Date:** 2026-02-14T17:20:31Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +131
- **Deletions:** -27

Fixed LinkedIn authentication and job parsing:

1. Cookie-based authentication:
   - Uses li_at and JSESSIONID cookies from browser
   - Avoids CAPTCHA/2FA challenges with email/password
   - Creates proper RequestsCookieJar for API

2. Job search fixes:
   - Removed location_name parameter (causes 0 results)
   - Search by keywords only, filter location client-side
   - Relaxed location matching (NYC, Manhattan, Brooklyn, etc.)

3. Job detail parsing:
   - Fixed nested company name extraction
   - Properly extracts title, location, description
   - Handles LinkedIn's complex API response structure

4. Testing:
   - Successfully authenticated and searched
   - Found and parsed NYC jobs
   - Location filtering working correctly

Tested and working - ready for overnight batch processing!

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
