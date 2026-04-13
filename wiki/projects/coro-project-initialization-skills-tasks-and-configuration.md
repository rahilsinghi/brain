---
title: "Coro Project Initialization: Skills, Tasks, and Configuration"
author: ai
created_at: 2026-04-13T16:01:25.210Z
last_ai_edit: 2026-04-13T16:01:25.210Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-chore-add-skillsmd-task-files-and-gitignore-update-b07180.md]]"
tags:
  - coro
  - project setup
  - task management
  - team standards
  - git
  - .gitignore
  - claude
  - lyria bpm
  - gemini
  - deployment
  - frontend
  - backend
---

# Coro Project Initialization: Skills, Tasks, and Configuration

This commit initializes key foundational elements for the Coro project, including a `SKILLS.md` document outlining team code standards and Git workflow, and individual `TASK_` files detailing initial responsibilities for Rahil, Chinmay, Bharath, and Sariya. Additionally, the `.gitignore` file is updated to exclude agent-specific memory files.

## Key Concepts

Team code standards,File ownership protocols,WebSocket (WS) protocol,Git workflow,Project task assignments,LLM context management (Lyria BPM, Gemini input history),Backend deployment (Railway, Vercel),Client-side UI/audio management,.gitignore for agent memory

## Details

This chore commit marks a significant step in the `rahilsinghi/Coro` project's setup. It introduces several crucial files and configuration changes:

*   **`SKILLS.md`**: This document establishes core operational guidelines for the team, covering shared code standards, file ownership protocols, WebSocket (WS) protocol implementation details, and the prescribed Git workflow. Its purpose is to ensure consistency and clarity in development practices.
*   **Individual Task Files (`TASK_RAHIL.md`, `TASK_CHINMAY.md`, `TASK_BHARATH.md`, `TASK_SARIYA.md`)**: These markdown files delineate initial, specific tasks assigned to each team member:
    *   **Rahil**: Focuses on Lyria BPM (Business Process Model) `reset_context` implementation, session recovery mechanisms, and multi-device testing.
    *   **Chinmay**: Is responsible for `Gemini input history` management, BPM locking, defining energy roles, and `prompt tuning` for LLM interactions.
    *   **Bharath**: Is tasked with `Railway deploy`ment, addressing `CORS fix`es, handling reconnection, and creating a `demo video`.
    *   **Sariya**: Will implement BPM debounce logic, develop the Energy UI, manage an audio singleton, and perform `Vercel deploy`ment.
*   **`.gitignore` Update**: The `.gitignore` file is updated to include `.claude/`, which is intended to store agent memory and machine-local configurations, preventing these temporary or sensitive files from being committed to the repository.

## Related

[[Applause Handling Enhancement in Coro]],[[Backend Applause Handling in Coro]],[[Open Matter for Rahil Singhi]],[[Open Matter for Bharath Mahesh Gera (Karen Project)]],[[Add .coverage and htmlcov to Gitignore]],[[Add tracking CSV files to gitignore]],[[CLAUDE.md for Project Context and Session Persistence]],[[askNYC Application Deployment to Google Cloud Run]],[[Agent System Prompt Loading with PromptStore Integration in Ouroboros]],[[askNYC: Model Update to Gemini 2.5 Flash Native Audio]]
