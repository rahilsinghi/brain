---
title: "Flock: Color System Migration from HSL Variables to Hex Values"
author: ai
created_at: 2026-04-10T21:43:04.132Z
last_ai_edit: 2026-04-10T21:43:04.132Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-switch-all-colors-from-broken-hsl-vars-to-solid-hex-value-b33df2.md]]"
tags:
  - color system
  - hsl
  - hex
  - css variables
  - tailwind css
  - bug fix
  - flock
  - frontend
  - styling
---

# Flock: Color System Migration from HSL Variables to Hex Values

This article details a critical update to the Flock project's color system, migrating from problematic HSL CSS variables to solid hexadecimal color values. The change addresses rendering issues encountered when `hsl(var(--...))` patterns interacted with Tailwind CSS utility classes, ensuring consistent and correct color display.

## Key Concepts

HSL Color Model,Hexadecimal Color Model,CSS Variables,Tailwind CSS,Color System,Frontend Development

## Details

A significant fix was implemented in the Flock repository (`rahilsinghi/Flock`) to resolve issues with its color system. Previously, the project utilized HSL color values defined via CSS variables (e.g., `hsl(var(--...))`). This pattern proved problematic when combined with Tailwind CSS utility classes, leading to incorrect rendering, particularly when CSS variables contained space-separated HSL values.

To rectify this, the entire color system was migrated to use solid hexadecimal (`#RRGGBB`) color values, which consistently render as expected. Specific color updates include:

*   **Background:** Changed to `#0b0b14`, eliminating issues like white blob rendering previously seen with gradients.
*   **Foreground:** Set to `#e8ecf4`, ensuring sufficient brightness for readability.
*   **Primary:** Updated to `#2dd4a8`, a distinct teal color.
*   **Muted:** Switched to `#7a85a0`, providing visible labels.

Furthermore, all inline styles within the host page were updated to use hex or RGBA values instead of `hsl(var())`. The layout body now also utilizes an inline style for color definitions, replacing a Tailwind class.

This update also specifically addressed and corrected the `TravelerAura` colors within the host page to use hex values.

### Commit Details
*   **Repository:** `rahilsinghi/Flock`
*   **SHA:** `f70c257`
*   **Date:** `2026-03-21T18:00:34Z`
*   **Author:** Rahil Singhi
*   **Files changed:** 3
*   **Additions:** +114 lines
*   **Deletions:** -188 lines
*   **Co-Authored-By:** Claude Opus 4.6 (1M context)

## Related

[[Flock (Project)]],[[CSS Variables]],[[Tailwind CSS]],[[Color Systems]],[[Hexadecimal Color]],[[HSL Color]]
