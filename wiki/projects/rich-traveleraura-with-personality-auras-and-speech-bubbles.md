---
title: Rich TravelerAura with Personality Auras and Speech Bubbles
author: ai
created_at: 2026-04-12T18:13:33.547Z
last_ai_edit: 2026-04-12T18:13:33.547Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-rich-traveleraura-with-personality-auras-speech-bubble-0ec7d2.md]]"
tags:
  - flock
  - traveleraura
  - ui
  - ux
  - agent
  - visualization
  - animation
  - frontend
---

# Rich TravelerAura with Personality Auras and Speech Bubbles

This feature introduces an enhanced `TravelerAura` component to the [[Flock Project]], incorporating dynamic visual effects like concentric orbit rings, personality-driven core glows, and floating SVG icons. It also adds interactive elements such as speech bubbles for agent proposals and visual cues for agent states (thinking, blocking, ready).

## Key Concepts

TravelerAura Component,Personality Auras,Speech Bubbles,Orbital Animations,Agent State Visualization,Dynamic UI Effects,Glassmorphism

## Details

This commit introduces significant UI enhancements to the `rahilsinghi/Flock` repository, focusing on the `TravelerAura` component and its integration into the host page.

**TravelerAura Component Features (New):**
*   **Orbital Rings:** Three concentric rings with independent rotation speeds, providing a dynamic visual effect.
*   **Core Glow:** A radial gradient core glow whose color is driven by the agent's personality.
*   **Outer Atmosphere:** A diffuse glow effect for the outer atmosphere.
*   **Floating Icons:** Travel-related SVG icons (e.g., architecture, food, walking) float in orbit around the aura.
*   **Thinking State:** When an agent is in a 'thinking' state, the aura exhibits a faster pulse and displays a "travelling..." label.
*   **Blocking State:** A red flash glow visually indicates an agent is in a 'blocking' state.
*   **Ready State:** A teal checkmark badge with a spring animation signifies an agent is 'ready'.
*   **Speech Bubble Overlay:** Appears when an agent posts a proposal, featuring a glass panel with the agent's color accent. These bubbles automatically clear after 5 seconds.

**Host Page Updates:**
*   The host page now utilizes the new `TravelerAura` component with its integrated speech bubbles.
*   New proposals automatically trigger speech bubbles on the speaking agent's aura.
*   **Sphere Gravity:** The gravity of interaction spheres is updated dynamically based on proposal actions:
    *   `PROPOSE`: +0.15
    *   `BLOCK`: -0.1
    *   `ACCEPT`: +0.25
    *   Other consensus triggers also affect gravity.
*   **Round Indicator:** Displays the current round's name and description.
*   **FLOCK Logo:** The FLOCK logo in the top bar now features a teal glow.
*   **Ambient Glow:** Three ambient glow blobs are added for enhanced visual depth.
*   **Layout:** Fixed column widths ensure a consistent page layout.

## Related

[[Flock Project]],[[Aishwarya Session Prompt Update – Flock Repo State (e98074d)]],[[Add QR Code for Judges (Flock Project)]],[[Audio Layer Implementation for Flock Project]]
