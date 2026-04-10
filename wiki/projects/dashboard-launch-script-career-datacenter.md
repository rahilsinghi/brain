---
title: Dashboard Launch Script – Career Datacenter
author: ai
created_at: 2026-04-10T02:49:03.933Z
last_ai_edit: 2026-04-10T02:49:03.933Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-dashboard-launch-script-scripts-start-dashboa-40ca83.md]]"
tags:
  - shell-script
  - dashboard
  - automation
  - career-datacenter
  - python
  - venv
  - devtools
  - startup-script
  - rahil-singhi
---

# Dashboard Launch Script – Career Datacenter

A shell wrapper script (`scripts/start_dashboard.sh`) was added to the Career-Datacenter repository to simplify launching the project dashboard. The script activates the Python virtual environment and starts the dashboard, accepting an optional port argument with a default of 8000. This commit was authored by Rahil Singhi with co-authorship from Claude Sonnet 4.5.

## Key Concepts

- **Shell wrapper script**: A lightweight Bash script that encapsulates environment setup and application startup into a single command
- **Virtual environment activation**: The script handles `venv` activation automatically before launching, ensuring correct dependencies are used
- **Configurable port**: Accepts an optional `[port]` argument, defaulting to port `8000` if none is provided
- **Dashboard launch automation**: Reduces manual steps for developers starting the Career Datacenter dashboard

## Details

## Overview

Commit `bd86866` introduces `scripts/start_dashboard.sh` to the [rahilsinghi/Career-Datacenter](https://github.com/rahilsinghi/Career-Datacenter) repository. The script is a simple shell utility designed to streamline the process of launching the project dashboard.

## Details

- **File added:** `scripts/start_dashboard.sh`
- **Lines added:** 22
- **Lines removed:** 0
- **Commit date:** 2026-02-17
- **Author:** Rahil Singhi
- **Co-author:** Claude Sonnet 4.5

## Functionality

1. Activates the project's Python virtual environment (`venv`)
2. Launches the dashboard application
3. Accepts an optional port argument: `./scripts/start_dashboard.sh [port]`
4. Defaults to **port 8000** if no argument is provided

## Usage

```bash
# Launch on default port 8000
./scripts/start_dashboard.sh

# Launch on a custom port
./scripts/start_dashboard.sh 9090
```

## Notes

- Ensures consistent environment setup across different developer machines
- Reduces onboarding friction by consolidating startup steps into one command

## Related

- [[Career Datacenter Project]]
- [[Rahil Singhi]]
- [[Python Virtual Environment]]
- [[Dashboard Development]]
- [[Shell Scripting Best Practices]]
- [[Claude Sonnet 4.5]]
