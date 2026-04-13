---
title: "Fix: Scoreboard Venv Tool Paths for Ruff, Radon, and Python"
author: ai
created_at: 2026-04-10T19:24:08.808Z
last_ai_edit: 2026-04-10T19:24:08.808Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-fix-scoreboard-resolve-venv-tool-paths-for-ruff-radon-d7c4cd.md]]"
tags:
  - fix
  - python
  - venv
  - path
  - shutil.which
  - sys.executable
  - ruff
  - radon
  - ouroboros
  - scoreboard
---

# Fix: Scoreboard Venv Tool Paths for Ruff, Radon, and Python

This commit addresses a `FileNotFoundError` when `ruff`, `radon`, and `python` tools were invoked within a virtual environment (venv) for the scoreboard component of the Ouroboros project. The fix ensures these tools are correctly located and executed by resolving their paths using `shutil.which` with a `sys.executable` fallback.

## Key Concepts

Virtual Environments (venv),File Not Found Error (FileNotFoundError),System PATH,shutil.which,sys.executable,Ruff (linter),Radon (code complexity tool),Python tool invocation

## Details

Previously, the `ruff`, `radon`, and `python` executables, when used within the scoreboard component, were invoked as bare commands. This led to a `FileNotFoundError` specifically when running in a Python virtual environment (`venv`), because these tools were not always directly on the system's global `PATH`. The issue did not occur when they were installed globally or accessible via the global `PATH`.

This commit resolves the problem by implementing a more robust method for locating these tools. It now uses `shutil.which` to find the full path to the executables. As a fallback, if `shutil.which` fails to locate a tool, it defaults to using `sys.executable` (the path to the current Python interpreter) as a basis to find environment-specific executables. This approach mirrors a pattern already successfully implemented in the `tournament.py` module within the same project, ensuring consistent and reliable tool invocation across the `ouroboros` project.

**Commit Details:**
*   **Repo:** `rahilsinghi/ouroboros`
*   **SHA:** `073c1fb`
*   **Date:** `2026-04-04T03:42:50Z`
*   **Author:** Rahil Singhi
*   **Co-Authored-By:** Claude Opus 4.6
*   **Files Changed:** 3
*   **Additions:** +19
*   **Deletions:** -6

## Related

[[Ouroboros Project]],[[Python Virtual Environments]],[[Shutil Module]],[[Sys Module]],[[Ruff (Linter)]],[[Radon (Complexity Tool)]],[[Scoreboard Component]]
