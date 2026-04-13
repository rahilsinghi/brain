---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:cad44c0
ingested_at: 2026-04-13T18:05:31.408Z
parsed_at: 2026-04-13T18:05:31.408Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Add job board scrapers (Phase 2.2 - Part 2)

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** cad44c0
- **Date:** 2026-02-14T16:45:52Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +1417
- **Deletions:** -0

Implemented three production-ready job scrapers:

**1. Base Scraper Class (job_scraper_base.py)**
- Abstract base with common scraping logic
- HTTP requests with user agent rotation
- Rate limiting (10 req/min, 6s delays)
- Retries with exponential backoff
- Error handling and logging
- Result tracking (ScrapeResult)

**2. YCombinator Jobs Scraper (scraper_ycombinator.py)**
- Scrapes https://www.ycombinator.com/jobs
- Simplest scraper (no anti-scraping)
- Extracts: title, company, location, tags, company size/stage
- Parses salary from job descriptions
- Detects visa sponsorship mentions

**3. Indeed Scraper (scraper_indeed.py)**
- Scrapes Indeed.com with anti-CAPTCHA measures
- Paginated search results (max 5 pages)
- Extracts: title, company, location, salary, description
- Parses relative dates ("3 days ago")
- CAPTCHA detection (stops if detected)
- Respects rate limits to avoid blocking

**4. Wellfound Scraper (scraper_wellfound.py)**
- Scrapes Wellfound.com (formerly AngelList)
- Startup-focused jobs
- Extracts JSON data from embedded scripts
- Fallback HTML parsing if no JSON
- Parses equity ranges
- Company stage/size extraction

**Features:**
- All scrapers inherit from JobScraperBase
- Consistent error handling across all boards
- Rate limiting prevents IP bans
- User agent rotation mimics real browsers
- Detailed logging for debugging

**Testing:**
Each scraper has a main() function for standalone testing.

Next steps: Build job tracker + integration script.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
