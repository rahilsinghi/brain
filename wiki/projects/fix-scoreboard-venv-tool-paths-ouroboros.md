---
title: "Fix: Scoreboard Venv Tool Paths (Ouroboros)"
author: ai
created_at: 2026-04-12T18:19:07.953Z
last_ai_edit: 2026-04-12T18:19:07.953Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-fix-scoreboard-resolve-venv-tool-paths-for-ruff-radon-d7c4cd.md]]"
tags:
  - ouroboros
  - python
  - venv
  - debugging
  - path resolution
  - ruff
  - radon
  - fix
---

# Fix: Scoreboard Venv Tool Paths (Ouroboros)

This commit resolves `FileNotFoundError` for tools like `ruff`, `radon`, and `python` when invoked within a virtual environment in the [[Ouroboros]] project. The fix ensures proper path resolution for these executables by mimicking the `tournament.py` script's approach, using `shutil.which` and `sys.executable` as fallbacks.

## Key Concepts

Virtual Environments (venv),Path Resolution,shutil.which,sys.executable,FileNotFoundError,Ruff (linter),Radon (complexity tool),Python scripting

## Details

This commit addresses a critical issue within the [[Ouroboros]] repository where several external tools, specifically `ruff`, `radon`, and `python` itself, were failing to execute when the project was run within a virtual environment. The problem manifested as a `FileNotFoundError` because these tools were being invoked as bare commands, and their executables were not consistently found on the system's `PATH` within the isolated venv.

To resolve this, the implementation now explicitly resolves the tool paths. It leverages `shutil.which` to locate the executable on the system `PATH`, with a fallback to `sys.executable` to ensure the correct Python interpreter associated with the virtual environment is used. This approach mirrors the robust path resolution strategy already in place for the `tournament.py` script within the project, ensuring consistent and reliable execution of all required tools.

**Commit Details:**
- **Repo:** [[Ouroboros]]
- **SHA:** `073c1fb`
- **Date:** 2026-04-04T03:42:50Z
- **Author:** Rahil Singhi
- **Co-Authored-By:** Claude Opus 4.6
- **Files changed:** 3
- **Additions:** +19
- **Deletions:** -6

## Related

[[Ouroboros]],[[Adding Docstrings to CorrectnessScorer in Ouroboros]],[[Adding Docstrings to EfficiencyScorer in Ouroboros]],[[Adding Docstrings to Ouroboros Types for Improved Coverage]],[[Agent System Prompt Loading with PromptStore Integration in Ouroboros]],[[CLAUDE.md for Session Persistence in Ouroboros]],[[CLI: Display Cost and Token Usage in Ouroboros Run Output]],[[call_with_json_retry() for Robust LLM JSON Parsing in Ouroboros]],[[CLAUDE.md Update: Ouroboros Phase 1.5 Results]],[[CLAUDE.md Update: Ouroboros Phase 2 Results]],[[CLAUDE.md Update: Ouroboros Phase 3 Meta-Learning Architecture]],[[6-Dimension Scoreboard Runner Integration in Ouroboros]]
