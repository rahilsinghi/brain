---
title: Maison Labs Claude On-Ramp and Best Practices
author: ai
created_at: 2026-04-15T19:15:18.958Z
last_ai_edit: 2026-04-15T19:15:18.958Z
last_human_edit: null
last_embedded_hash: dd4bbed33591a595
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maison-slack-claude-onramp-claude-code-setup-best-prac-1776280488908.md]]"
tags:
  - maison
  - claude
  - maison
  - onboarding
  - setup
  - environment_variables
  - prompting
  - best_practices
  - development
  - python
  - monorepo
  - ai
  - llm
  - slack
---




# Maison Labs Claude On-Ramp and Best Practices

This article outlines the initial setup, environment variables, and best practices for integrating Claude Code into Maison Labs projects, as discussed in the internal #claude-onramp Slack channel. It covers essential environment configurations, effective prompting strategies for Claude, development service management, and updates on Python services migration and team bootstrapping status.

## Key Concepts

Environment Variables (.env),Prompting Best Practices,Dev Service Management,Python Services Migration,Claude Code,Monorepo,Tool Calls,Telemetry,Langfuse,PostgreSQL,Firebase,AppSync Events API,Google ADK

## Details

This document compiles key information and discussions from the Maison Labs #claude-onramp Slack channel, focusing on the setup and effective utilization of Claude Code within the development environment.

### Bootstrap Environment Variables (.env)
When bootstrapping the environment using `make bootstrap`, a `.env` file is generated with critical configurations:

*   **AWS**: `AWS_DEFAULT_REGION=us-east-1`
*   **Telemetry**: `OTEL` points to `localhost:8580`, `Langfuse` to `localhost:8581`.
*   **Agent Server**: `PORT=8083`, `INTERNAL_PORT=8583`.
*   **Database**: `SQL_CONNECTION_STRING` connects to Neon PostgreSQL (test environment).
*   **Firebase**: Requires an absolute path to the Firebase service account key file (`FIREBASE_SERVICE_ACCOUNT_KEY_FILE`), which should be stored outside the repository.
*   **Chat Window**: `CHAT_DOMAIN=https://local.maison-labs.com`.
*   **PubSub**: `PUBSUB_ENDPOINT` is configured for the AppSync Events API.
*   **Quality Dashboard**: `QUALITY_ADMIN_EMAIL=admin@maison-labs.com`, `QUALITY_ADMIN_PASSWORD=admin123`.
*   **Environment**: `MAISON_ENV=local`.

### Prompting Best Practices (Sandeep, April 13)
To maximize efficiency and accuracy when prompting Claude:

*   **Be Specific, Not Verbose**: Avoid lengthy descriptions; get straight to the point.
*   **Clarity of Intent**: Do not assume Claude will infer intent. Explicitly state what is required.
*   **Visual Aids for Code Failures**: Provide screenshots when Claude makes incorrect code assumptions.
*   **UI Assumption Validation**: Instruct Claude to open a browser and run tests to validate UI assumptions.
*   **Screenshot Comparison**: Compare browser output against expected screenshots for better results.
*   **Resetting Sessions**: If Claude has not made progress after two sessions, clear the chat and start fresh.
*   **External Diagnosis**: If problems persist, use external tools like Claude web, [[Gemini]], or [[ChatGPT]] to diagnose the underlying issue.
*   **Single Task Focus**: Handle one task at a time. Start a fresh session for each change in topic.

### Dev Service Management (Sandeep, April 15)
*   **Starting Services**: Use the command "start all dev services and control the logs" to initiate development services.
*   **Log and PID Management**: Claude automatically maintains Process IDs (PIDs) and logs within the `.local` directory.
*   **Issue Resolution**: Claude has direct access to relevant logs when issues arise, aiding in debugging.

### Python Services Migration
[[Sandeep]] is actively migrating Python services, including the LLM and pipeline components, into the monorepo structure. The goal is to establish a basic workflow for a message endpoint, with all interactions, including vector search, being handled via [[tool calls]]. [[Noel]] is planning the implementation of [[Google ADK]] for the chat agent.

### Team Bootstrap Status (April 12)
As of April 12, only [[Fredrik Sjoberg]] and Kim had successfully completed the bootstrap process. All developers have since been instructed to bootstrap their environments, resolve any issues with Claude's assistance, and push their changes to a named branch. [[Sandeep]] will then consolidate these fixes into the main branch.

### Key Resources Shared
*   **Claude Code Setup Video**: [https://www.youtube.com/watch?v=l5Diqeoffa4](https://www.youtube.com/watch?v=l5Diqeoffa4)
*   **Mintlify Reference**: [https://www.mintlify.com/VineeTagarwaL-code/claude-code](https://www.mintlify.com/VineeTagarwaL-code/claude-code)
*   **Anthropic Learning Portal**: [https://anthropic.skilljar.com/](https://anthropic.skilljar.com/)

## Related

[[Claude Code Vault Integration Documentation]],[[Sandeep]],[[Fredrik Sjoberg]],[[Gemini]],[[ChatGPT]],[[Google ADK]],[[tool calls]],[[monorepo]]
