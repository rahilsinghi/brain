---
status: processed
source_type: graphify-community
repo: career-datacenter
community_id: 18
ingested_at: 2026-04-13T22:29:48.750Z
parsed_at: 2026-04-13T22:29:48.750Z
compiled_to: "[[Job Search Outreach Campaign Automation]]"
processed_at: 2026-04-13T22:30:27.047Z
retry_count: 0
last_error: null
compile_progress: null
---



# career-datacenter — Community 18

## Files in this cluster

- `/Users/rahilsinghi/Desktop/career-datacenter/scripts/wave1_outreach.py` — 7 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/scripts/wave1_outreach.py` — 4 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/scripts/wave1_outreach.py` — 4 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/scripts/wave1_outreach.py` — 4 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/scripts/wave1_outreach.py` — 4 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/scripts/wave1_outreach.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/scripts/wave1_outreach.py` — 2 connections
- `/Users/rahilsinghi/Desktop/career-datacenter/scripts/wave1_outreach.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/scripts/wave1_outreach.py` — 1 connection
- `/Users/rahilsinghi/Desktop/career-datacenter/scripts/wave1_outreach.py` — 1 connection

## Internal relationships

- `wave1_outreach` → `wave1_outreach_load_env` (contains)
- `wave1_outreach` → `wave1_outreach_body_to_html` (contains)
- `wave1_outreach` → `wave1_outreach_build_msg` (contains)
- `wave1_outreach` → `wave1_outreach_create_draft` (contains)
- `wave1_outreach` → `wave1_outreach_send_email` (contains)
- `wave1_outreach` → `wave1_outreach_log_to_csv` (contains)
- `wave1_outreach` → `wave1_outreach_main` (contains)
- `wave1_outreach_body_to_html` → `wave1_outreach_build_msg` (calls)
- `wave1_outreach_build_msg` → `wave1_outreach_create_draft` (calls)
- `wave1_outreach_build_msg` → `wave1_outreach_send_email` (calls)
- `wave1_outreach_create_draft` → `wave1_outreach_main` (calls)
- `wave1_outreach_create_draft` → `wave1_outreach_rationale_153` (rationale_for)
- `wave1_outreach_send_email` → `wave1_outreach_main` (calls)
- `wave1_outreach_send_email` → `wave1_outreach_rationale_170` (rationale_for)
- `wave1_outreach_log_to_csv` → `wave1_outreach_main` (calls)

## External dependencies

_none_