---
title: iMessage Scheduler Monorepo
author: ai
created_at: 2026-04-12T17:59:55.805Z
last_ai_edit: 2026-04-12T17:59:55.805Z
last_human_edit: null
last_embedded_hash: 11a4958b7a731dac
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-imessage-scheduler-initial-commit-imessage-scheduler-monorepo-bdfdd3.md]]"
tags:
  - imessage
  - scheduler
  - monorepo
  - react
  - express
  - drizzle orm
  - sqlite
  - applescript
  - macos
  - software development
---


# iMessage Scheduler Monorepo

This article details the initial commit for the `imessage-scheduler` monorepo, a three-package project designed to schedule iMessages. It includes a React frontend, an Express backend with a FIFO queue, and a macOS iMessage gateway via AppleScript.

## Key Concepts

Monorepo,React,Express.js,Drizzle ORM,SQLite,AppleScript,FIFO Queue,Vite,Tailwind CSS

## Details

This entry documents the initial commit (`2f645bc`) for the `rahilsinghi/imessage-scheduler` project, authored by [[Rahil Singhi]] on March 10, 2026.

The project is structured as a three-package monorepo, enabling the scheduling and delivery of iMessages. It comprises:

*   **Frontend**: Built with [[React]] 19, TypeScript, [[Vite]], and [[Tailwind CSS]] v4, providing a user interface for scheduling messages and viewing statistics.
*   **Backend**: An [[Express.js]] server leveraging [[Drizzle ORM]] with [[SQLite]] for data persistence and a FIFO (First-In, First-Out) queue worker to manage scheduled messages.
*   **Gateway**: A macOS-specific component that utilizes [[AppleScript]] to bridge with the native Messages.app for message delivery.

The system also features a dashboard to display real-time statistics and allows for configurable message send intervals.

### Commit Details

*   **Repository**: `rahilsinghi/imessage-scheduler`
*   **SHA**: `2f645bc`
*   **Date**: 2026-03-10T17:58:11Z
*   **Author**: [[Rahil Singhi]]
*   **Files changed**: 41
*   **Additions**: +6260 lines
*   **Deletions**: -0 lines

## Related

[[Rahil Singhi]]
