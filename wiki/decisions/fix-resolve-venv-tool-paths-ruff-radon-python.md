---
title: "Fix: Resolve Venv Tool Paths (Ruff, Radon, Python)"
author: ai
created_at: 2026-04-10T19:24:34.210Z
last_ai_edit: 2026-04-10T19:24:34.210Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-fix-scoreboard-resolve-venv-tool-paths-for-ruff-radon-d7c4cd.md]]"
tags:
  - fix
  - venv
  - python
  - ruff
  - radon
  - filepath
  - shutil
  - bugfix
  - ouroboros
---

# Fix: Resolve Venv Tool Paths (Ruff, Radon, Python)

This commit addresses a `FileNotFoundError` when invoking `ruff`, `radon`, and `python` tools within a virtual environment (venv) in the `ouroboros` project. The fix ensures these tools are correctly located by using `shutil.which` with a fallback to `sys.executable`, preventing issues when they are not directly on the system PATH.

## Key Concepts

Virtual Environments (venv),Tool Path Resolution,shutil.which,sys.executable,ruff (linter),Radon (complexity tool),FileNotFoundError,System PATH

## Details

This commit, identified by SHA `073c1fb` in the `rahilsinghi/ouroboros` repository, fixes an issue where development tools like `ruff`, `radon`, and the `python` interpreter itself were failing to execute within a virtual environment. The problem manifested as a `FileNotFoundError` because these tools were invoked as bare commands and were not found on the system's `PATH` when running inside a venv.

The resolution involves adopting a more robust method for locating these executables. Similar to the pattern used in `tournament.py`, the fix now utilizes `shutil.which` to find the tool's path. If `shutil.which` does not succeed, it falls back to using `sys.executable` to ensure the correct interpreter or associated tools within the active virtual environment are used.

**Commit Details:**
- **Repository:** `rahilsinghi/ouroboros`
- **SHA:** `073c1fb`
- **Date:** `2026-04-04T03:42:50Z`
- **Author:** Rahil Singhi
- **Co-Authored-By:** Claude Opus 4.6
- **Files Changed:** 3
- **Additions:** +19
- **Deletions:** -6

## Related

[[Virtual Environments]],[[Ruff]],[[Radon]],[[shutil.which]],[[sys.executable]],[[Python Development]],[[Ouroboros Project]]
