---
title: Next.js Frontend Scaffold with shadcn/ui and Zustand (Raag Project)
author: ai
created_at: 2026-04-12T17:36:19.730Z
last_ai_edit: 2026-04-12T17:36:19.730Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-nextjs-frontend-scaffold-with-shadcn-ui-and-zustand-4ff9f6.md]]"
tags:
  - frontend
  - next.js
  - typescript
  - tailwind css
  - shadcn/ui
  - zustand
  - raag
  - scaffold
  - state management
  - api client
  - pydantic
---

# Next.js Frontend Scaffold with shadcn/ui and Zustand (Raag Project)

This commit initializes the frontend for the `raag` project, establishing a modern web stack featuring Next.js 16, TypeScript, and Tailwind CSS 4. It integrates shadcn/ui for UI components and Zustand for efficient chat state management, laying the groundwork for the application's user interface. The scaffold also includes an API client designed to interact with backend Pydantic models, ensuring seamless data flow.

## Key Concepts

Next.js 16,TypeScript,Tailwind CSS 4,shadcn/ui,Zustand,Pydantic,API Client,Chat State Management,Frontend Development,Monorepo Structure

## Details

This commit, identified by SHA `2e6c13f` and authored by Rahil Singhi on 2026-03-04, marks the initial setup of the frontend for the `[[raag]]` project. The scaffold was co-authored by Claude Opus 4.6, indicating an AI-assisted development process. The core technologies chosen for this foundation include:

*   **Next.js 16**: The React framework for production, providing server-side rendering and static site generation capabilities.
*   **TypeScript**: A superset of JavaScript that adds static typing, enhancing code quality and maintainability.
*   **Tailwind CSS 4**: A utility-first CSS framework for rapidly building custom designs.
*   **shadcn/ui**: A collection of reusable UI components built with Radix UI and Tailwind CSS, integrated for a consistent and accessible design system. Specific components included are badge, button, card, input, scroll-area, sheet, avatar, separator, skeleton, textarea, and tooltip.
*   **Zustand**: A small, fast, and scalable state-management solution, specifically used here for managing the application's chat state.

The scaffold also includes a dedicated API client for interacting with the backend chat endpoint, with TypeScript interfaces mirroring the backend's `[[Pydantic]]` models to ensure type safety across the full stack.

## Related

[[raag]],[[Backend Foundation with FastAPI, Pydantic, and Celery (Raag Project)]],[[CLAP Encoder Compatibility and Lyrics Ingestion (raag eb48f40)]],[[Chat History Feature (raag)]],[[Claude-powered Word-Level Rhyme Annotator for Raag]],[[Pydantic]],[[Claude Opus 4.6]],[[Chore: Set Turbopack Root for Consistent Monorepo Compilation]],[[Chore: Set Turbopack Root for Consistent Compilation (raag)]],[[Next.js]],[[TypeScript]],[[Tailwind CSS]],[[shadcn/ui]],[[Zustand]]
