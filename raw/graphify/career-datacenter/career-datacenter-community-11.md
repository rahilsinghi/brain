---
status: processed
source_type: graphify-community
repo: career-datacenter
community_id: 11
ingested_at: 2026-04-13T22:29:48.747Z
parsed_at: 2026-04-13T22:29:48.747Z
compiled_to: "[[Job Tracker Core Logic Unit Tests]]"
processed_at: 2026-04-13T22:33:18.771Z
retry_count: 0
last_error: null
compile_progress: null
---



# career-datacenter — Community 11

## Files in this cluster

- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 14 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 9 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 9 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 9 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 9 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 7 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/tests/test_job_tracker.py` — 1 connection

## Internal relationships

- `test_job_tracker` → `test_job_tracker_make_job` (contains)
- `test_job_tracker` → `test_job_tracker_tmp_tracker` (contains)
- `test_job_tracker` → `test_job_tracker_testsavejobs` (contains)
- `test_job_tracker` → `test_job_tracker_testloadjobs` (contains)
- `test_job_tracker` → `test_job_tracker_testupdatestatus` (contains)
- `test_job_tracker` → `test_job_tracker_testsummaryreport` (contains)
- `test_job_tracker_make_job` → `test_job_tracker_testsavejobs_test_saves_new_jobs` (calls)
- `test_job_tracker_make_job` → `test_job_tracker_testsavejobs_test_deduplicates_on_second_save` (calls)
- `test_job_tracker_make_job` → `test_job_tracker_testsavejobs_test_partial_duplicates` (calls)
- `test_job_tracker_make_job` → `test_job_tracker_testsavejobs_test_overwrite_duplicates` (calls)
- `test_job_tracker_make_job` → `test_job_tracker_testloadjobs_test_load_all_returns_dicts` (calls)
- `test_job_tracker_make_job` → `test_job_tracker_testloadjobs_test_get_jobs_by_status` (calls)
- `test_job_tracker_make_job` → `test_job_tracker_testloadjobs_test_get_high_fit_jobs` (calls)
- `test_job_tracker_make_job` → `test_job_tracker_testloadjobs_test_high_fit_sorted_descending` (calls)
- `test_job_tracker_make_job` → `test_job_tracker_testupdatestatus_test_update_existing_job_status` (calls)
- `test_job_tracker_make_job` → `test_job_tracker_testupdatestatus_test_applied_sets_applied_at` (calls)
- `test_job_tracker_make_job` → `test_job_tracker_testupdatestatus_test_update_with_notes` (calls)
- `test_job_tracker_make_job` → `test_job_tracker_testupdatestatus_test_update_nonexistent_job_is_noop` (calls)
- `test_job_tracker_make_job` → `test_job_tracker_testsummaryreport_test_report_is_string` (calls)
- `test_job_tracker_testsavejobs` → `test_job_tracker_testsavejobs_test_saves_new_jobs` (method)
- `test_job_tracker_testsavejobs` → `test_job_tracker_testsavejobs_test_deduplicates_on_second_save` (method)
- `test_job_tracker_testsavejobs` → `test_job_tracker_testsavejobs_test_partial_duplicates` (method)
- `test_job_tracker_testsavejobs` → `test_job_tracker_testsavejobs_test_overwrite_duplicates` (method)
- `test_job_tracker_testloadjobs` → `test_job_tracker_testloadjobs_test_load_all_returns_dicts` (method)
- `test_job_tracker_testloadjobs` → `test_job_tracker_testloadjobs_test_get_jobs_by_status` (method)
- `test_job_tracker_testloadjobs` → `test_job_tracker_testloadjobs_test_get_high_fit_jobs` (method)
- `test_job_tracker_testloadjobs` → `test_job_tracker_testloadjobs_test_high_fit_sorted_descending` (method)
- `test_job_tracker_testupdatestatus` → `test_job_tracker_testupdatestatus_test_update_existing_job_status` (method)
- `test_job_tracker_testupdatestatus` → `test_job_tracker_testupdatestatus_test_applied_sets_applied_at` (method)
- `test_job_tracker_testupdatestatus` → `test_job_tracker_testupdatestatus_test_update_with_notes` (method)
- `test_job_tracker_testupdatestatus` → `test_job_tracker_testupdatestatus_test_update_nonexistent_job_is_noop` (method)
- `test_job_tracker_testsummaryreport` → `test_job_tracker_testsummaryreport_test_report_is_string` (method)
- `test_job_tracker_testsummaryreport` → `test_job_tracker_testsummaryreport_test_report_handles_empty` (method)

## External dependencies

- `test_job_tracker` → `job_tracker` (imports_from) [community 5]
- `test_job_tracker` → `job_scraper_models` (imports_from) [community 0]
- `test_job_tracker` → `test_job_tracker_rationale_1` (rationale_for) [community 0]
- `test_job_tracker_testsavejobs` → `job_tracker_jobtracker` (uses) [community 5]
- `test_job_tracker_testsavejobs` → `job_scraper_models_job` (uses) [community 0]
- `test_job_tracker_testsavejobs` → `job_scraper_models_jobsource` (uses) [community 0]
- `test_job_tracker_testsavejobs` → `job_scraper_models_jobstatus` (uses) [community 0]
- `test_job_tracker_testloadjobs` → `job_tracker_jobtracker` (uses) [community 5]
- `test_job_tracker_testloadjobs` → `job_scraper_models_job` (uses) [community 0]
- `test_job_tracker_testloadjobs` → `job_scraper_models_jobsource` (uses) [community 0]
- `test_job_tracker_testloadjobs` → `job_scraper_models_jobstatus` (uses) [community 0]
- `test_job_tracker_testupdatestatus` → `job_tracker_jobtracker` (uses) [community 5]
- `test_job_tracker_testupdatestatus` → `job_scraper_models_job` (uses) [community 0]
- `test_job_tracker_testupdatestatus` → `job_scraper_models_jobsource` (uses) [community 0]
- `test_job_tracker_testupdatestatus` → `job_scraper_models_jobstatus` (uses) [community 0]
- `test_job_tracker_testsummaryreport` → `job_tracker_jobtracker` (uses) [community 5]
- `test_job_tracker_testsummaryreport` → `job_scraper_models_job` (uses) [community 0]
- `test_job_tracker_testsummaryreport` → `job_scraper_models_jobsource` (uses) [community 0]
- `test_job_tracker_testsummaryreport` → `job_scraper_models_jobstatus` (uses) [community 0]