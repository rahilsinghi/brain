---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:950091f
ingested_at: 2026-04-13T18:05:31.408Z
parsed_at: 2026-04-13T18:05:31.408Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Add job scraper foundation (Phase 2.2 - Part 1)

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 950091f
- **Date:** 2026-02-14T16:37:21Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +943
- **Deletions:** -6

Implements core infrastructure for automated job board scraping:

**1. Scraper Configuration (config/scraper_config.yaml)**
- Comprehensive search criteria (14 target job titles)
- MUST-HAVE filters (languages + core signals)
- Hard/soft dealbreaker keywords
- Visa/sponsorship preferences
- Location, salary, industry preferences
- Job board priorities (Indeed, YC Jobs, Wellfound)
- Automation settings (daily at 9am, weekly summaries)

**2. Data Models (cli/job_scraper_models.py)**
- Job class: Represents scraped job with all metadata
- JobSource enum: Indeed, YC Jobs, Wellfound, etc.
- JobStatus enum: Application tracking workflow
- FilterResult: Results of applying filters to a job
- ScrapeResult: Summary of scraping session
- ScraperConfig: Type-safe configuration loading

**3. Job Filter (cli/job_filter.py)**
- Applies MUST-HAVE keyword requirements:
  * At least ONE language (Python/TypeScript/Java/Go)
  * At least ONE core signal (Backend/API/ML/Data Pipeline)
- Checks dealbreakers (PhD, 8+ years, clearance, etc.)
- Validates salary (min $90k, boost for $120k-180k)
- Checks visa/sponsorship mentions
- Scores bonus keywords (BigQuery, GCP, LLM, etc.)
- Location preference matching

**Test Results:**
Example job (Backend Engineer, Python, NYC, $130-160k):
- ✅ Passed all filters
- +2.10 score boost (salary + visa + location + keywords)

**User Profile Updated:**
- Added detailed role targeting (Tier 1/2/3 prioritization)
- Added positioning statement
- Added key differentiators

Next steps: Build actual scrapers for each job board.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
