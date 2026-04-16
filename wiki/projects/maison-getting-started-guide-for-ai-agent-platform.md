---
title: "Maison: Getting Started Guide for AI Agent Platform"
author: ai
created_at: 2026-04-15T19:12:27.543Z
last_ai_edit: 2026-04-15T19:12:27.543Z
last_human_edit: null
last_embedded_hash: fd6856683c3c8abb
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maison-notion-getting-started-full-onboarding-guide-1776280299838.md]]"
tags:
  - maison
  - ai
  - agent
  - hospitality
  - chat
  - api
  - console
  - monorepo
  - pnpm
  - turborepo
  - aws
  - cdk
  - documentation
  - onboarding
  - project
  - claude
  - llm
---




# Maison: Getting Started Guide for AI Agent Platform

Maison is an AI agent platform designed for the hospitality industry, enabling natural guest interactions across various digital surfaces. It features a deployable chat widget, an AI API for message processing and hotel system coordination, and an operator console for property management and agent configuration. The platform streamlines guest services and hotel operations through its integrated AI capabilities.

## Key Concepts

AI Agent,Chat Widget,Operator Console,Knowledge Base (KB),Agent-to-Agent (A2A) Protocol,Model Context Protocol (MCP),A2UI (Schema-driven UI),Monorepo Architecture,Development Environments (local, dev, test, stg, prod),Guest Message Flow,Operator Management Workflow

## Details

This document provides a comprehensive onboarding guide for engineers working on the Maison project.

## What Maison Is Building
Maison deploys an [[AI Agent]] across various customer interaction surfaces such as hotel websites, mobile applications, SMS, WhatsApp, email, and internal tools. Guests can interact naturally with the AI, asking questions, checking availability, and making requests, with the AI handling these in real-time. Hotel operators utilize a purpose-built [[Operator Console]] to manage their properties, [[Knowledge Base (KB)]]es, and settings.

**Maison operates across two primary domains:**
*   **maison.cx**: The public-facing business and marketing website.
*   **maison-labs.com**: Hosts the API, operator consoles, and all internal tooling.

## The Big Picture
The Maison platform consists of three core components:
1.  **A chat widget**: Deployable across any surface, managed within `apps/chat-window`.
2.  **An [[AI API]]**: Processes messages and coordinates with hotel systems, located in `apps/api`.
3.  **An operator console**: For hotel teams to configure and manage their [[AI Agent]], found in `apps/console`.

## Environments
Maison utilizes several environments, each with a distinct base domain:

| Environment | Base domain         | Notes                       |
| :---------- | :------------------ | :-------------------------- |
| local       | local.maison-labs.com | Your own machine            |
| dev         | dev.maison-labs.com   | Active development          |
| test        | test.maison-labs.com  | Integration testing         |
| stg         | stg.maison-labs.com   | Pre-production staging      |
| prod        | maison-labs.com     | Live platform               |

## Key Services
Key services within the Maison ecosystem:

| Service          | URL pattern                  | Who uses it               |
| :--------------- | :--------------------------- | :------------------------ |
| [[Chat Widget]]      | Embedded on hotel websites   | Hotel guests              |
| API              | `api.{env}.maison-labs.com`  | Every other service       |
| [[Operator Console]] | `console.{env}.maison-labs.com` | Hotel operators           |
| Login            | `login.{env}.maison-labs.com` | Hotel operators           |
| Docs             | `docs.{env}.maison-labs.com` | All team members          |
| Status page      | `status.{env}.maison-labs.com` | All team members          |
| Quality dashboard| `quality.{env}.maison-labs.com` | Engineering & QA          |

## Key Terminology
*   **Client**: A hotel (or hotel group) using Maison.
*   **[[Knowledge Base (KB)]]**: Facts, FAQs, and policies that the [[AI Agent]] draws upon.
*   **Chat session**: A conversation between a guest and the [[AI Agent]], typically stored in [[DynamoDB]].
*   **A2A (Agent-to-Agent)**: A [[JSON-RPC]] protocol for [[AI Agent]]s to interact with Maison.
*   **MCP (Model Context Protocol)**: [[Anthropic]]'s open standard; Maison exposes an MCP endpoint.
*   **A2UI**: Maison's internal schema-driven UI system, where the console renders pages from JSON schemas.

## The [[Monorepo]]
The Maison project is structured as a [[Monorepo]] named `maison-agent/` and utilizes `pnpm workspaces` and `Turborepo` for efficient development. The primary task runner is `make`.

```
maison-agent/
├── apps/       ← Deployable services (API, chat widget, console, login, etc.)
├── packages/   ← Shared libraries used across apps
├── infra/      ← [[AWS CDK]] cloud infrastructure
├── prompts/    ← [[AI Agent]] prompt source files
├── docs/       ← All documentation, architecture records
└── scripts/    ← Local dev scripts and helpers
```

**Getting Started with the Monorepo:**
*   Run `make bootstrap` on a fresh clone.
*   Use `make dev` to run everything locally.
*   Detailed setup instructions can be found in `docs/` and `.claude/docs/make-commands.md`.

## How a Guest Message Flows
1.  A guest types a message into the [[Chat Widget]], which then sends it to the [[AI API]].
2.  The [[AI API]] looks up the client's [[Knowledge Base (KB)]] and specific configuration.
3.  It calls an [[LLM service]] to generate a response, leveraging the [[Knowledge Base (KB)]] and the conversation history.
4.  The generated response is stored in [[DynamoDB]] and published via [[AppSync]] (using [[WebSocket]]).
5.  The guest receives the reply, typically within two seconds.

## How an Operator Manages Their Hotel
1.  An operator logs in through the Login application.
2.  They are redirected to the [[Operator Console]], displaying their hotel dashboard.
3.  [[Operator Console]] pages are rendered dynamically by the [[A2UI]] Renderer, which transforms JSON schemas and live data from the [[AI API]] into HTML.
4.  Operators can update the [[Knowledge Base (KB)]], review chat sessions, configure integrations, and monitor performance.

## Bootstrap Notes for Engineers
*   The `make bootstrap` scripts were initially developed on Sandeep's machine and may have edge cases or gaps.
*   If bootstrap fails, engineers are encouraged to ask [[Claude]] for assistance, push fixes to a dedicated branch, and flag the issue in Slack for Sandeep to consolidate into `main`.

## Working with [[Claude]] Tips (from team)
*   Be specific and avoid verbosity in prompts.
*   Focus on one task per session; start a fresh chat when switching topics.
*   Utilize screenshots when textual descriptions are insufficient.
*   Ask [[Claude]] to open a browser and test functionalities.
*   If stuck after two sessions, begin a new chat.
*   If still experiencing issues, paste the conversation into other LLMs like Claude.ai, [[Gemini]], or [[ChatGPT]] for further diagnosis.

## Related

[[AI Agent]],[[Chat Widget]],[[API Server Factory with Graceful Drain]],[[Operator Console]],[[DynamoDB]],[[AppSync]],[[WebSocket]],[[JSON-RPC]],[[Anthropic]],[[AWS CDK]],[[LLM Model Constants and Company Info Helper (Commit a9513cd)]],[[Claude API Rate Limit Retry with Backoff in raag]],[[Gemini]],[[ChatGPT]],[[Monorepo]]
