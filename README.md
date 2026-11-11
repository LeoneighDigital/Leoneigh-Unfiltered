# LEONEIGH UNFILTERED // Creative Laboratory & Archive

A static, monochrome creative hub for vocal mechanics, street choreography, and visual direction. Built as a single-page application with hash routing, a canvas-based motion visualizer, a Web Audio stem player, and asynchronous inquiry dispatch.

The site is designed as an engineering terminal rather than a social media feed. No external dependencies, no trackers, no algorithmic feeds.

**Status:** `[LU-SYS.002] // ACTIVE ARCHIVE // OPERATIONAL`

## Overview

Leoneigh Unfiltered is the creative sibling to Leoneigh Digital. It contains four routes:

| Route | Page | Purpose |
|-------|------|---------|
| `#/` | Hub | Screening terminal, stem archive, repertory grid, satellite dispatch, inquiry bridge |
| `#/vocals` | Vocals | Sonic archive and stem lab with dry vocal drills and harmony stacks |
| `#/movement` | Movement | Choreography and motion studies with canvas-based rehearsal captures |
| `#/inquiry` | Inquiry | Asynchronous collaboration protocol, dispatch form, and direct mailto fallback |

All pages are rendered client-side. The application shell, header, navigation, footer, and stem-request modal are static HTML.

## Features

- Monospaced, dark-mode interface with zero decorative accents or emojis.
- Obsidian status header with live UTC clock, `OPERATIONAL` state, and system stamp `[LU-SYS.002]`.
- Canvas-rendered motion terminal with animated skeleton figures, motion trails, scanlines, and HUD overlays.
- Web Audio stem player with scrubbers, play/pause, seek, and synthesized vocal drills, melisma runs, and harmony stacks.
- Per-track technical metadata: key, range, BPM, microphone, and interface.
- Stem dispatch drawer gated behind a modal form that opens a prefilled `mailto:` draft.
- Repertory and discipline grid covering vocal mechanics, street choreography, and visual direction.
- Satellite dispatch links for TikTok, Instagram, and YouTube with explicit intents and safe external navigation.
- Asynchronous inquiry form with client-side validation, live email preview, and direct `mailto:` fallback.
- Sister studio bridge to Leoneigh Digital.
- Hash-based routing with cleanup of audio nodes, animation frames, and event listeners on route change.
- Custom obsidian scrollbars (WebKit and Firefox).
- OpenGraph and Twitter card metadata for clean link previews.
- Responsive layout down to 600px.

## File Structure

```
/
├── index.html
├── style.css
├── assets/
│   └── LeoneighUnfiltered.jpg
└── js/
    ├── app.js                    Utilities, shared audio context, router
    ├── audiotrackdefinitions.js  Track data and generated note sequences
    ├── Hub.js                    Hub page renderer
    ├── inquiry.js                Inquiry page renderer
    ├── modalhelpers.js           Modal and stem form handlers
    ├── motionterminal.js         Canvas motion terminal
    ├── movement.js               Movement page renderer
    ├── stemplayer.js             Web Audio stem player
    └── vocals.js                 Vocals page renderer
```

The scripts are loaded in dependency order from `index.html`; `app.js` loads last so all page renderers are defined before the router initializes.

Each page renderer injects its own markup, instantiates its own players and terminals, and registers cleanup handlers via `registerCleanup`. The router calls `runCleanups()` before mounting the next page.

## Running Locally

No build step is required. Serve the project directory from any static server:

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

## Constraints

- No external fonts, libraries, analytics, or third-party embeds.
- No emojis, icons, or accent colors.
- All visual output is monochrome.
- Audio is synthesized at runtime via oscillators. No audio files are bundled.
