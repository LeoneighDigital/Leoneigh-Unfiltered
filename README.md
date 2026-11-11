# Leoneigh Unfiltered // Creative Laboratory

A static, monochrome creative hub for vocal mechanics, street choreography, and visual direction. Built as a single-page application with hash routing, a canvas-based motion visualizer, a Web Audio stem player, and asynchronous inquiry dispatch.

The site is designed as an engineering terminal rather than a social media feed. No external dependencies, no trackers, no algorithmic feeds.

## Overview

Leoneigh Unfiltered is the creative sibling to Leoneigh Digital. It contains four routes:

| Route | Page | Purpose |
|-------|------|---------|
| `#/` | Hub | Screening terminal, stem archive, repertory grid, satellite dispatch, inquiry bridge |
| `#/vocals` | Vocals | Sonic archive and stem lab with dry vocal drills and harmony stacks |
| `#/movement` | Movement | Choreography and motion studies with canvas-based rehearsal captures |
| `#/inquiry` | Inquiry | Asynchronous collaboration protocol and dispatch form |

All pages are rendered client-side. The application shell, header, navigation, footer, and stem-request modal are static HTML.

## Features

- Monospaced, dark-mode interface with zero decorative accents or emojis.
- Obsidian status header with live UTC clock and system stamp `[LU-SYS.002]`.
- Canvas-rendered motion terminal with animated skeleton figures, motion trails, scanlines, and HUD overlays.
- Web Audio stem player with scrubbers, play/pause, seek, and synthesized vocal drills, melisma runs, and harmony stacks.
- Per-track technical metadata: key, range, BPM, microphone, and interface.
- Stem dispatch drawer gated behind a modal email form.
- Repertory and discipline grid covering vocal mechanics, street choreography, and visual direction.
- Satellite dispatch links for TikTok, Instagram, and YouTube with explicit intents.
- Asynchronous inquiry form with client-side validation.
- Sister studio bridge to Leoneigh Digital.
- Hash-based routing with cleanup of audio nodes, animation frames, and event listeners on route change.
- Responsive layout down to 600px.

## File Structure

```
/
├── index.html   Static shell: header, nav, main, footer, stems modal
├── style.css    All styling and responsive rules
└── app.js       Utilities, audio engine, motion terminal, page renderers, router
```

`app.js` is organized into clear sections:

1. Utilities and cleanup registry
2. Shared AudioContext
3. `StemPlayer` class
4. `MotionTerminal` class and canvas drawing
5. Audio track definitions
6. Modal helpers and stems form
7. Page renderers: `renderHub`, `renderVocals`, `renderMovement`, `renderInquiry`
8. Router and bootstrap

Each page renderer injects its own markup, instantiates its own players and terminals, and registers cleanup handlers via `registerCleanup`. The router calls `runCleanups()` before mounting the next page.

## Running Locally

No build step is required. Serve the three files from any static server:

```bash
# Python 3
python3 -m http.server 8000

# Node.js (npx)
npx serve .
```

Then open `http://localhost:8000`.

Opening `index.html` directly via `file://` works for layout and canvas rendering, but audio playback may be blocked by browser autoplay policies. A local server is recommended.

## Browser Support

Targets current versions of Chrome, Firefox, Safari, and Edge. Requires:

- `requestAnimationFrame`
- Canvas 2D
- Web Audio API
- CSS `aspect-ratio`
- CSS custom properties
- `backdrop-filter` (decorative; degrades gracefully)

No polyfills are included.

## Customization

- **Colors and spacing:** edit the CSS custom properties in `:root` in `style.css`.
- **Audio tracks:** edit the `TRACKS` array in `app.js`. Each track requires `id`, `title`, `key`, `range`, `bpm`, `duration`, `wave`, `filter`, and a `notes` array of `{ t, f, d, a }` objects.
- **Motion studies:** edit the `studies` array in `renderMovement()` and the `POSES` array for skeleton keyframes.
- **Hero cut:** adjust the `MotionTerminal` options in `renderHub()`.
- **Navigation and metadata:** edit the static header, nav, and footer in `index.html`.

## Constraints

- No external fonts, libraries, analytics, or third-party embeds.
- No emojis, icons, or accent colors.
- All visual output is monochrome.
- Audio is synthesized at runtime via oscillators. No audio files are bundled.
