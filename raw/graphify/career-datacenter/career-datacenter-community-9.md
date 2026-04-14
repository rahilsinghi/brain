---
status: processed
source_type: graphify-community
repo: career-datacenter
community_id: 9
ingested_at: 2026-04-13T22:29:48.749Z
parsed_at: 2026-04-13T22:29:48.749Z
compiled_to: "[[Job Search Outreach Tracker and Automation]]"
processed_at: 2026-04-13T22:30:17.030Z
retry_count: 0
last_error: null
compile_progress: null
---



# career-datacenter — Community 9

## Files in this cluster

- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 14 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 7 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 6 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 5 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 4 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 4 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 4 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 4 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 4 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 4 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 4 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 3 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/cli/outreach_tracker.py` — 1 connection

## Internal relationships

- `outreach_tracker` → `outreach_tracker_outreachlog` (contains)
- `outreach_tracker` → `outreach_tracker_init_outreach_log` (contains)
- `outreach_tracker` → `outreach_tracker_create_draft` (contains)
- `outreach_tracker` → `outreach_tracker_save_draft` (contains)
- `outreach_tracker` → `outreach_tracker_mark_as_sent` (contains)
- `outreach_tracker` → `outreach_tracker_mark_as_replied` (contains)
- `outreach_tracker` → `outreach_tracker_update_log_entry` (contains)
- `outreach_tracker` → `outreach_tracker_get_entries_needing_followup` (contains)
- `outreach_tracker` → `outreach_tracker_get_stats` (contains)
- `outreach_tracker` → `outreach_tracker_row_to_outreach_log` (contains)
- `outreach_tracker` → `outreach_tracker_main` (contains)
- `outreach_tracker_outreachlog` → `outreach_tracker_outreachlog_to_dict` (method)
- `outreach_tracker_outreachlog` → `outreach_tracker_outreachlog_days_since_sent` (method)
- `outreach_tracker_outreachlog` → `outreach_tracker_create_draft` (calls)
- `outreach_tracker_outreachlog` → `outreach_tracker_row_to_outreach_log` (calls)
- `outreach_tracker_outreachlog` → `outreach_tracker_rationale_24` (rationale_for)
- `outreach_tracker_outreachlog_to_dict` → `outreach_tracker_save_draft` (calls)
- `outreach_tracker_outreachlog_days_since_sent` → `outreach_tracker_get_entries_needing_followup` (calls)
- `outreach_tracker_outreachlog_days_since_sent` → `outreach_tracker_main` (calls)
- `outreach_tracker_outreachlog_days_since_sent` → `outreach_tracker_rationale_46` (rationale_for)
- `outreach_tracker_init_outreach_log` → `outreach_tracker_save_draft` (calls)
- `outreach_tracker_init_outreach_log` → `outreach_tracker_main` (calls)
- `outreach_tracker_init_outreach_log` → `outreach_tracker_rationale_54` (rationale_for)
- `outreach_tracker_create_draft` → `outreach_tracker_rationale_80` (rationale_for)
- `outreach_tracker_save_draft` → `outreach_tracker_rationale_102` (rationale_for)
- `outreach_tracker_mark_as_sent` → `outreach_tracker_update_log_entry` (calls)
- `outreach_tracker_mark_as_sent` → `outreach_tracker_main` (calls)
- `outreach_tracker_mark_as_sent` → `outreach_tracker_rationale_113` (rationale_for)
- `outreach_tracker_mark_as_replied` → `outreach_tracker_update_log_entry` (calls)
- `outreach_tracker_mark_as_replied` → `outreach_tracker_main` (calls)
- `outreach_tracker_mark_as_replied` → `outreach_tracker_rationale_130` (rationale_for)
- `outreach_tracker_update_log_entry` → `outreach_tracker_rationale_156` (rationale_for)
- `outreach_tracker_get_entries_needing_followup` → `outreach_tracker_row_to_outreach_log` (calls)
- `outreach_tracker_get_entries_needing_followup` → `outreach_tracker_main` (calls)
- `outreach_tracker_get_entries_needing_followup` → `outreach_tracker_rationale_186` (rationale_for)
- `outreach_tracker_get_stats` → `outreach_tracker_main` (calls)
- `outreach_tracker_get_stats` → `outreach_tracker_rationale_213` (rationale_for)
- `outreach_tracker_row_to_outreach_log` → `outreach_tracker_rationale_273` (rationale_for)

## External dependencies

- `outreach_tracker` → `followup_generator` (imports_from) [community 7]
- `outreach_tracker` → `hospitality_outreach` (imports) [community 7]
- `outreach_tracker` → `email_generator` (imports_from) [community 7]