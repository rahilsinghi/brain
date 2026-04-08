---
title: Flock — Git Activity
status: current
author: ai
source_type: git-commits
created_at: 2026-04-08T23:10:56.385Z
updated_at: 2026-04-08T23:10:56.385Z
tags:
  - git-activity
  - flock
category: projects
last_embedded_hash: f2c4feabd10b43f0
---


# Flock — Git Activity

## Summary

Flock is a real-time group travel decision-making app built for a hackathon, enabling multiple participants to negotiate and reach consensus on travel destinations through AI agents. The system uses personal AI agents and a mediator with a 10-step negotiation algorithm to evaluate destinations against user preferences, ultimately revealing a recommended trip to all participants simultaneously. Built in a single day (March 21, 2026), it demonstrates a full-stack AI application with voice, realtime, and multi-agent coordination. See also [[rahil-singhi]] for contributor context.

---

## Key Developments

### Foundation & Database
The project kicked off with project documentation and pre-hackathon database seeding (`d5dee54`), immediately followed by scaffolding a Next.js 16 + Tailwind 4 app shell (`6af9dcd`). Core infrastructure included a `public_proposals` table with a `tension_score` column, shared TypeScript types, Supabase clients, and Realtime subscriptions — establishing the data layer for live multi-user coordination.

### AI Agent System
The heart of Flock is a multi-agent negotiation pipeline. Six specialized agent tools handle destination evaluation and negotiation (`b1ef2c4`), while a personal agent and mediator implement a 10-step negotiation algorithm (`c13fee4`). Eight API routes manage the full session lifecycle and agent streaming (`e20b2f4`). A `personal_context.md` compiler pipeline (`2f3461d`) feeds user preferences into the agents. Several fixes ensured correctness — the mediator was required to call `finalize_trip` as a tool rather than describe results in prose (`305dce6`), and user IDs were passed as exact strings rather than display names (`b76e9c0`). This work is thematically related to other agent-oriented projects like [[proj-marketpulse-ai]] and [[proj-adversarial]].

### Authentication & Session Management
Authentication went through two iterations: initial ElevenLabs TTS and Clerk middleware integration (`a14b0de`), followed by removal of the Clerk dependency in favor of lightweight cookie-based auth with name and room code login (`65eee64`, `5d9ae01`). Round gate enforcement and session utilities (`721975a`) controlled the flow of multi-round preference gathering. An `/admin` route was added for session creation (`a88d054`), and a hardcoded demo user was replaced with the logged-in user (`3b668f5`). Related job-search and session tooling thinking appears in [[decision-framework-what-to-build-first-for-job-search-automation]].

### Participant Profiles & Preference Input
Six judge profiles were pre-seeded with aesthetic embeddings (`2755a48`), and unknown participant names receive cloned pre-built profiles with random assignment (`c944d36`). The preference room UI went through several iterations — from an initial profile card and text input (`9639205`) to a gallery redesign featuring glowing cards, vibrant colors, and floating animation (`0c432a6`). A VoiceOrb microphone was added to all round input screens (`33f8183`).

### Host Screen & Real-Time Coordination
The host screen was wired to real data via a TravelerAura lobby (`a0da686`), and a Three.js animated sphere was integrated with a teal primary color scheme (`562734f`). The live room received a major overhaul with polling, a participant list, and admin start control (`2098ccc`). A polling fallback (every 3 seconds) was added to the phone room page as a Realtime safety net (`a070972`). The host page was later migrated from client-side Supabase to an API layer to resolve proposal and audio issues (`26ae077`, `6ad5aa1`).

### Visual Design System
UI work went through multiple passes: an initial merge of host, phone, and preference room screens (`6ac6672`), a login and preference room redesign (`11173e6`), icon and gradient enhancements (`210d0c1`), and full integration of a "Lovable" design system with blue primary, glass panels, and a void aesthetic (`3008f74`). All colors were eventually migrated from broken HSL CSS variables to solid hex values (`f70c257`). The TravelerAura component gained personality auras, speech bubbles, and sphere reactions (`2282945`). This rapid visual iteration parallels design work documented in [[proj-optireality]] and [[proj-superplay]].

### Audio Layer
A dedicated audio layer was introduced late in the day (`92555aa`), including ambient background music, ElevenLabs voice synthesis, and sound effects. Audio was wired into the host screen and phone live view (`13742fd`). Subsequent fixes eliminated voice echo (`3238684`), implemented a sequential voice queue with round advancement (`3861106`), and replaced ambient music with a generated drone track (`36d5475`).

### Reveal & Fallback
The final reveal experience was refined iteratively: real hotel images from the database replaced model-generated URLs (`b9b3328`), a SplitReveal component was rewritten (`36d5475`), a force-reveal fallback and admin emergency button were added (`8996f38`), and the final commit introduced rich fallback cards alongside a separate agent "surprise" section in the reveal (`700792c`). A QR code pointing to the live deployment (`flock-ruddy.vercel.app`) was added for judges to scan (`5369b62`).

---

## Timeline

### March 2026

All 46 commits landed on **March 21, 2026** — a single intensive hackathon day. The day followed a clear arc:

- **Early phase**: Project scaffolding, database setup, Supabase Realtime wiring, and the `personal_context.md` compiler pipeline.
- **Mid phase**: Full agent system implementation (six tools, personal agent, mediator, 10-step negotiation, eight API routes), authentication, and judge profile seeding.
- **UI buildout**: Merging of host, phone, and preference room frontends; multiple rounds of visual redesign culminating in the Lovable design system and Three.js sphere integration.
- **Polish & fixes**: Audio layer addition, voice echo elimination, sequential queue, color system fixes, Vercel timeout configuration (`maxDuration`), and polling fallbacks.
- **Final preparation**: QR code generation, force-reveal fallback, admin emergency controls, and rich reveal cards — all aimed at a live judge demo at `flock-ruddy.vercel.app`.

The velocity and scope of this single-day build reflects the kind of focused execution documented in [[stardrift-yc-s24-founding-software-engineer-interview-prep]] and [[harrison-qian-builder-profile-meeting-prep]], and the multi-agent negotiation approach connects conceptually to work explored in [[mechanize-rl-environment-company-for-frontier-ai-labs]].
