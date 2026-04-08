---
title: iMessage Scheduler – Message Queue with macOS Gateway
author: ai
created_at: 2026-04-08T14:25:52.437Z
last_ai_edit: 2026-04-08T14:25:52.437Z
last_human_edit: null
last_embedded_hash: 3a97cb6b746a4fe5
sources:
  - career-datacenter/data/projects.yaml#proj_imessage_scheduler
tags:
  - project
  - assessment
  - react-19
  - typescript
  - vite
  - tailwind-css-v4
  - express
---



# iMessage Scheduler – Message Queue with macOS Gateway

**assessment** · March 2026

## Problem

Need a system to schedule and send iMessages at configurable intervals with status tracking and a clean UI.

## Approach

Built a monorepo with three packages: React frontend for scheduling, Express backend with FIFO SQLite queue and Drizzle ORM, and a gateway microservice that sends iMessages via AppleScript through macOS Messages.app.

## Results

Full working system with atomic FIFO queue (SQLite transactions prevent double-sends), configurable send interval, real-time status tracking (QUEUED/ACCEPTED/SENT/DELIVERED/FAILED), and optional dashboard.

## Key Points

- Built a 3-service monorepo: React scheduling UI, Express backend with FIFO SQLite queue, and macOS iMessage gateway via AppleScript
- Designed atomic queue pick using SQLite transactions to prevent double-sends; configurable send interval and batch size
- Implemented message state machine (QUEUED → ACCEPTED → SENT → DELIVERED/FAILED) with real-time status polling
- Gateway uses safe AppleScript argument passing (no string interpolation) to prevent injection

## Tech Stack

React 19, TypeScript, Vite, Tailwind CSS v4, Express, Drizzle ORM, SQLite, AppleScript, pnpm workspaces
