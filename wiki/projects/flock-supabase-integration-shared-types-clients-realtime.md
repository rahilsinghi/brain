---
title: "Flock: Supabase Integration (Shared Types, Clients, Realtime)"
author: ai
created_at: 2026-04-10T17:19:35.259Z
last_ai_edit: 2026-04-10T17:19:35.259Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-shared-types-supabase-clients-and-realtime-subscriptio-2ec267.md]]"
tags:
  - supabase
  - types
  - realtime
  - ssr
  - client
  - frontend
  - flock
  - typescript
---

# Flock: Supabase Integration (Shared Types, Clients, Realtime)

This entry details a significant set of frontend deliverables for the Flock project, focusing on integrating Supabase for data management. It establishes shared data types, implements both server-side (SSR) and browser-based Supabase clients, and sets up real-time subscriptions for various session-related data.

## Key Concepts

- Shared Types (TypeScript interfaces),- Supabase SSR Client,- Supabase Service Role Client,- Supabase Browser Client,- Supabase Realtime Subscriptions,- Typed Mapper Functions,- Frontend Deliverables

## Details

This commit (`c49d036`) by [[Rahil Singhi]], co-authored by Claude Opus 4.6, introduces foundational Supabase integration for the Flock project. The changes encompass:

-   **Shared Types (`types.ts`)**: A central file for defining all shared TypeScript interfaces, including `Participant`, `Session`, and `TripDecision`, ensuring data consistency across the application.
-   **Supabase Server-Side Clients (`supabase-server.ts`)**: Implementation of a Supabase client configured for Server-Side Rendering (SSR), capable of handling cookies for authentication, alongside a service role client for privileged backend operations.
-   **Supabase Browser Client (`supabase-client.ts`)**: A dedicated client for use in the browser environment, handling user-facing data interactions.
-   **Realtime Subscriptions (`realtime/session.ts`)**: Setup for real-time data updates, enabling dynamic interactions for sessions. This includes `subscribeToParticipants`, `subscribeToSession`, and `subscribeToProposals`, all utilizing typed mapper functions to ensure data integrity upon reception.

These updates are critical deliverables for the frontend build, attributed to [[Aishwarya (Deliverables)]]'s scope.

## Related

[[Flock]],[[Rahil Singhi]],[[Aishwarya (Deliverables)]],[[Supabase]]
