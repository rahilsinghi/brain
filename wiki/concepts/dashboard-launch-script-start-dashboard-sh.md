---
title: Dashboard Launch Script (start_dashboard.sh)
author: ai
created_at: 2026-04-12T17:17:01.204Z
last_ai_edit: 2026-04-12T17:17:01.204Z
last_human_edit: null
last_embedded_hash: 97e01145691fc999
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-dashboard-launch-script-scripts-start-dashboa-40ca83.md]]"
tags:
  - shell script
  - dashboard
  - career-datacenter
  - virtual environment
  - cli
---


# Dashboard Launch Script (start_dashboard.sh)

This shell script simplifies the process of launching the Career-Datacenter dashboard. It activates the Python virtual environment and starts the dashboard application, allowing users to specify a custom port or use the default.

## Key Concepts

Shell Script,Virtual Environment Activation,Dashboard Management,CLI Utility

## Details

The `start_dashboard.sh` script, located in `scripts/start_dashboard.sh` within the [[Career-Datacenter]] repository, provides a convenient wrapper for initiating the project's dashboard. It ensures that the correct Python virtual environment is activated before launching the application. Users can execute the script with an optional port argument, defaulting to `8000` if no port is specified.

**Repository:** [[Career-Datacenter]]
**SHA:** `bd86866`
**Date:** 2026-02-17T21:57:48Z
**Author:** Rahil Singhi
**Usage:** `./scripts/start_dashboard.sh [port]`

## Related

[[Career-Datacenter]]
