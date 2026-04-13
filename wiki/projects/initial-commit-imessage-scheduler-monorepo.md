---
title: "Initial Commit: iMessage Scheduler Monorepo"
author: ai
created_at: 2026-04-12T22:00:57.239Z
last_ai_edit: 2026-04-12T22:00:57.239Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-imessage-scheduler-initial-commit-imessage-scheduler-monorepo-bdfdd3.md]]"
tags:
  - imessage
  - scheduler
  - monorepo
  - react
  - express
  - applescript
  - full-stack
  - automation
  - macos
  - typescript
---

# Initial Commit: iMessage Scheduler Monorepo

This document details the initial commit for the `imessage-scheduler` monorepo, a system designed to schedule iMessages. It comprises a React frontend, an Express backend with a FIFO queue, and an AppleScript-based macOS gateway for message delivery. The project also features a dashboard for monitoring and configuration.

## Key Concepts

Monorepo Architecture,React.js,Express.js,AppleScript,FIFO Queue,Drizzle ORM,SQLite,Vite,Tailwind CSS,TypeScript,iMessage Automation

## Details

This entry marks the initial commit (SHA: `2f645bc`) for the `rahilsinghi/imessage-scheduler` project, authored by [[Rahil Singhi]] on March 10, 2026. The project is structured as a three-package monorepo:

*   **Frontend**: Built with React 19, TypeScript, Vite, and Tailwind CSS v4, providing the user interface for scheduling messages.
*   **Backend**: An Express.js server utilizing Drizzle ORM and SQLite for data persistence, managing a FIFO (First-In, First-Out) queue for message scheduling. A dedicated queue worker processes pending messages.
*   **Gateway**: A macOS-specific component that acts as an AppleScript bridge to interact with the native Messages.app for actual message delivery.

The system includes a dashboard that provides statistics and allows users to configure sending intervals and other parameters for scheduled messages.

## Related

[[Rahil Singhi]],[[rahilsinghi/imessage-scheduler Project]]
