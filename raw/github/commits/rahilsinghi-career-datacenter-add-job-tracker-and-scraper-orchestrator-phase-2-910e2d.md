---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:8913d71
ingested_at: 2026-04-10T09:03:48.664Z
parsed_at: 2026-04-10T09:03:48.664Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZupcP21vH4vR4pZQeFyn"}
compile_progress: null
---



# Add job tracker and scraper orchestrator (Phase 2.2 - Part 3)

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 8913d71
- **Date:** 2026-02-14T16:47:44Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +725
- **Deletions:** -0

Completed job scraping system with tracking and orchestration:

**1. Job Tracker (job_tracker.py)**
- Saves scraped jobs to CSV database
- Deduplication by job_id
- Status tracking (new, applied, interview, etc.)
- Query jobs by status or fit score
- Update job status and notes
- Generate summary reports

Features:
- CSV format for easy viewing/editing
- Tracks 20 fields per job
- High-fit job queries (≥8.0)
- Statistics by status, source, fit score

**2. Scraper Orchestrator (run_job_scraper.py)**
- Main entry point for job scraping
- Runs all configured scrapers (Indeed, YC, Wellfound)
- Filters jobs using JobFilter
- Scores jobs using FitScorer
- Saves to JobTracker
- Auto-generates applications for high-fit jobs (≥8.0)

Workflow:
1. Scrape jobs from all boards
2. Apply MUST-HAVE/DEALBREAKER filters
3. Score for fit (uses existing fit_scorer)
4. Save to tracking/scraped_jobs.csv
5. Flag high-fit jobs for application generation
6. Generate summary report

Usage:
  python run_job_scraper.py                           # All boards
  python run_job_scraper.py --boards indeed           # Specific board
  python run_job_scraper.py --dry-run                 # Test mode

**Testing:**
Both modules have standalone test modes:
  python job_tracker.py      # Test tracking
  python run_job_scraper.py --dry-run  # Test scraping

Next steps: Add scheduler for daily automation.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
