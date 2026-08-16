# Design QA

- Source reference: `assets/reference/project-logos/reference-hero-process-panel.png`
- Implementation: `http://127.0.0.1:5173/`
- Comparison capture: `/tmp/klyx-release-design-hero-1505x1045-final.png`
- Viewport: 1505 × 1045 CSS pixels, 1× capture
- State: English, dark theme, home route, hero at page start

## Comparison

The implementation preserves the reference direction without copying its site shell: a dark hero, restrained outlined document/browser forms, left-aligned product copy and calls to action, and a right-side Understand → Build → Improve delivery panel. The panel is intentionally a little narrower and lower than the reference so the existing KLYX headline, navigation, and CTA content remain readable without overlap. Its three-stage desktop composition, animated line progression, typography hierarchy, mint accent, border treatment, and background-shape contrast are visually consistent with the target.

- Layout and spacing: passed at the exact reference viewport; no clipping or horizontal overflow.
- Typography and copy: passed; existing repository copy and type system are preserved.
- Color and boundaries: passed in dark and light themes; Hero remains deliberately dark.
- Motion: passed; restrained CSS/SVG motion is present and the reduced-motion path is preserved.
- Mobile adaptation: passed at 390 × 844 and 320 × 780; the same concept becomes a compact stacked process.
- Image and asset quality: passed; no generated assets or altered brand marks are used.

## Iteration history

1. Baseline: the current stacked panel remained readable on mobile, but its duplicated offset frame produced the visible Understand/Build/Improve card glitch and the desktop arrangement did not match the supplied process-panel direction.
2. Revision: replaced the duplicate frame with one stable panel, introduced the three-column desktop flow, retained a single-column mobile flow, and added low-contrast outlined background sheets.
3. Final verification: compared source and implementation at 1505 × 1045, then rechecked the responsive result at 1024, 768, 390, 320, English/Arabic, and dark/light states. No release-blocking visual mismatch remains.

final result: passed
