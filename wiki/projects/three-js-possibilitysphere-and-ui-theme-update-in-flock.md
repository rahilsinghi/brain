---
title: Three.js PossibilitySphere and UI Theme Update in Flock
author: ai
created_at: 2026-04-12T17:48:43.919Z
last_ai_edit: 2026-04-12T17:48:43.919Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-threejs-sphere-wired-to-host-page-teal-primary-brig-f07479.md]]"
tags:
  - flock
  - three.js
  - ui
  - ux
  - theme
  - 3d
  - design
  - component
  - supabase
  - react
  - performance
---

# Three.js PossibilitySphere and UI Theme Update in Flock

This commit introduces the `PossibilitySphere` Three.js component to the Flock project, integrating interactive 3D elements like wireframe orbs, particle fields, and orbiting destination nodes. It also implements a significant UI theme refresh, shifting the primary color to teal and brightening various foreground and background elements for improved readability and visual consistency with the 'Lovable' aesthetic.

## Key Concepts

[[Three.js]],3D Graphics,UI Design,Color Themes,Lazy Loading,Data Visualization,[[Supabase]]

## Details

This update, originating from the `rahilsinghi/Flock` repository (SHA: `562734f`), focuses on enhancing the visual and interactive aspects of the Flock project.

### PossibilitySphere Component
The `PossibilitySphere` component was ported from 'Lovable' and is a central feature. It integrates several 3D elements:
-   **CoreSphere:** A wireframe orb forming the central structure.
-   **ParticleField:** Consists of 600 ambient particles, adding dynamic visual interest.
-   **DestinationNode:** Features orbiting spheres complete with trails, gravity rings, and textual labels.

Cities are dynamically fetched from [[Supabase]] upon component mount and are rendered as these orbiting 'planets'. The component exposes an imperative handle for actions such as `updateGravity`, `eliminatePlanet`, and `setWinner`. For optimized performance, the `PossibilitySphere` is lazy-loaded using [[React.lazy()]] and [[React.Suspense]], ensuring a fast initial render of the page.

### Color Theme Brightening
A significant UI refresh was performed to brighten the overall theme and align it more closely with the 'Lovable' project's visual identity:
-   **Primary Color:** Shifted from blue to a distinct teal (`hsl 174 72% 50%`), matching the 'FLOCK' teal glow observed in 'Lovable' screenshots.
-   **Foreground:** Brightness increased from 92% to 95%.
-   **Muted Foreground:** Brightness increased substantially from 50% to 60%, greatly improving readability.
-   **Border:** Brightness slightly increased from 16% to 18%, making borders more visible.
-   **`text-luminous`:** Now utilizes the new primary teal color with a stronger glow effect.
-   **Cards and Secondary Backgrounds:** Slightly lightened for a more cohesive and airy feel.

## Related

[[Flock Project]],[[API: Embed HTTP Server in Daemon Boot with Graceful Shutdown]],[[Add QR Code for Judges (Flock Project)]],[[Aishwarya Session Prompt Update – Flock Backend State Snapshot]],[[Chore: Remove @clerk/nextjs Dependency and Dynamic Agent Labels (Flock)]]
