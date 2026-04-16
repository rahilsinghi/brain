---
title: Maison Claude Code Onboarding - April 2026
author: ai
created_at: 2026-04-15T19:13:10.119Z
last_ai_edit: 2026-04-15T19:13:10.119Z
last_human_edit: null
last_embedded_hash: 48bc73d67f582b85
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maison-notion-claude-code-onboarding-april-14-meeting-not-1776280332337.md]]"
tags:
  - maison
  - onboarding
  - claude
  - monorepo
  - agentic development
  - websockets
  - ssr
  - development workflow
  - architecture
  - troubleshooting
  - maison
  - nginx
  - postgresql
  - firebase
  - langfuse
  - otlp
---




# Maison Claude Code Onboarding - April 2026

This document summarizes the Maison Claude code onboarding session from April 2026, which successfully enabled all participants to set up their development environments. It outlines the project's monorepo architecture, emphasizes an 'agentic development' mandate using Claude for all tasks, and details critical action items and troubleshooting solutions.

## Key Concepts

Monorepo Architecture,Agentic Development,Server-Side Rendering (SSR),WebSockets,`make dev` setup,`/notify` endpoint,A2UI renderer,Langfuse,OTLP,Firebase service account,Nginx configuration,PostgreSQL users table

## Details

## Overview
This session marked the successful completion of the Maison Claude code onboarding, with all participants now having a functional `make dev` setup. A central theme is the **Agentic Development Mandate**, requiring the use of [[Claude]] for all development tasks. This approach is intended to continuously train the agent on the codebase, fostering an intelligent development workflow.

## Monorepo Architecture
The project is structured as a monorepo, divided into distinct categories:
- `apps/`: Houses frontend shells, such as the administrative console and chat window.
- `packages/`: Contains shared business logic, including `a2ui-schemas` and reusable components.
- `services/`: Comprises backend services, including the main API.

The [[A2UI renderer]] plays a crucial role by performing [[Server-Side Rendering]] (SSR), transforming schemas defined in `a2ui-schemas` into HTML. The `apps` are designed as minimal shells that retrieve their content from this renderer. Real-time chat functionality is achieved using [[WebSockets]] via [[AppSync]], with agents pushing events to the frontend through an internal `/notify` endpoint.

## Action Items
Several key action items were identified:
- **Admin Flyout Login:** Address and fix login issues related to new APIs.
- **Bootstrap Feedback:** Consolidate and merge bootstrap feedback, then share updated instructions.
- **Nginx Configuration:** Remove any conflicting Nginx configurations and re-run `make dev`.
- **Python Services Migration:** Migrate [[Python]] services, including the [[LLM]], into the monorepo. This migration will also involve integrating [[Langfuse]] and [[OTLP]] for observability and enabling asynchronous notifications.
- **Agentic Development Adoption:** All team members are required to adopt the [[Agentic Development Mandate]] by exclusively using [[Claude]] for all development activities.
- **Dashboard/Screen Development:** Begin constructing dashboards and screens within the business console.

## Troubleshooting Notes
During the onboarding, specific issues were encountered and resolved:
- **Port Conflicts (Javed):** Caused by residual Nginx configurations from a previous development environment. The fix involved removing `dev.mason.cx.conf` from `/opt/homebrew/etc/nginx/servers/`.
- **Login Failure (Noel):** Traced to the `disabled_date` field in the [[PostgreSQL]] users table being incorrectly set during a production-to-test data restore. The resolution was to set this field to `null`.

## .env File Setup
The `.env` file is crucial for configuration and requires the absolute path to the [[Firebase]] service account key file. This key is stored securely outside the repository to prevent accidental commits. The `make bootstrap` script (`scripts/bootstrap.sh`) is responsible for its generation. The `.env.example` file serves as comprehensive documentation for all required environment variables.

## Related

[[Claude API Rate Limit Retry with Backoff in raag]],[[CLAUDE.md for Claude Code Vault Integration]],[[Chore: Set Turbopack Root for Consistent Monorepo Compilation]],[[Fix: Handle Room Capacity in WebSocket Join Logic (PR #10)]],[[Fix: Restore room_id on WebSocket Reconnect (Coro)]],[[Agent System Prompt Loading with PromptStore Integration in Ouroboros]],[[Database Layer with PostgreSQL Models and Qdrant Collections for raag]],[[Add LLM Model Constants and Company Info Helper (Commit a9513cd)]],[[Resolve Venv Tool Paths (Ruff, Radon, Python)]],[[Agentic Development]],[[Server-Side Rendering]],[[AppSync]],[[A2UI renderer]],[[Langfuse]],[[OTLP]],[[Firebase]],[[Notify Endpoint]],[[make dev]]
