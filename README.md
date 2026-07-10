Kitchen-Timer
=============

Kitchen-Timer is a lightweight, static web application that provides a simple, accessible kitchen timer implemented with HTML, CSS, and JavaScript. It aims for clear UX, responsive layout, and accessibility best practices.

Overview
--------
- Purpose: Provide a minimal, easy-to-use timer for everyday kitchen tasks and serve as an instructional front-end example.
- Audience: Casual users, front-end learners, and contributors who want a small, well-documented example project.

Full professional design & creation documentation
-------------------------------------------------

1. Project definition and goals

- Primary goals: settable timer duration, start/stop/pause/reset controls, audible or visual completion indicator.
- Non-goals: complex scheduling, server-side features, or heavy third-party dependencies.
- Success criteria: clear UI, fast load (<100 KB resources where possible), keyboard accessibility, consistent behavior across modern browsers.

2. Requirements and constraints

- Functional: start, pause, reset, editable time input, audible/visual alert.
- Non-functional: responsive layout, accessible to keyboard and screen readers, no external runtime dependencies.

3. Research and wireframing

- Quick sketches and low-fidelity wireframes were created to decide element placement and control hierarchy (primary action = Start/Stop).
- Focused on large, tappable controls for mobile and a compact layout for desktop.

4. Visual design

- Color palette selected for sufficient contrast (WCAG AA target for normal text). Accent color used sparingly for action buttons.
- Typeface: local fonts bundled under the `fonts/` folder, fallbacks to system fonts declared in CSS.
- Spacing and sizing: consistent scale for margins and buttons to improve perceived responsiveness.

5. Prototyping

- Implemented a minimal interactive prototype using `index.html`, `style.css`, and `script.js` to validate interaction flows.
- Early tests verified keyboard navigation, focus order, and screen reader labels.

6. Implementation details

- Architecture: single-page static app.
- Main responsibilities:
  - `index.html`: semantic markup and ARIA attributes where needed.
  - `style.css`: responsive layout, visual states (focus, active, disabled), and print-safe rules.
  - `script.js`: timer logic, event handling, and simple state management.

7. Accessibility

- Buttons and inputs include `aria-label` or visible labels to communicate purpose to assistive tech.
- Keyboard support ensures Start/Stop/Reset are reachable via Tab and operable via Enter/Space.
- Color contrast checked; UI does not rely on color alone to convey state.

8. Performance and testing

- Manual cross-browser testing: latest Chrome, Firefox, and a mobile browser viewport.
- Resource size: kept minimal by avoiding large frameworks and unoptimized assets.

9. Iteration and reviews

- Changes were made incrementally with small commits; each functional change was verified manually.
- Future review checkpoints were planned for accessibility audits and automated tests.

10. Deployment and distribution

- Deployment: static files can be hosted on GitHub Pages, Netlify, or any static host.
- No build step required—open `index.html` in a browser to run locally.

Project structure
-----------------

- `index.html` — application entry point and semantic markup
- `style.css` — visual design and responsive rules
- `script.js` — timer logic and event handlers
- `fonts/` — bundled font files and license/notes

Usage (local)
-------------

1. Clone the repository or download the ZIP.
2. Open `index.html` in a web browser.

Developer notes
---------------

- Keep commits small and focused. Use descriptive commit messages for each change.
- Suggested improvements: add unit tests for time arithmetic, introduce optional sound/notification settings, and extract UI components for reusability.

Testing checklist
-----------------

- [ ] Start/Stop works repeatedly without drift.
- [ ] Pause/resume preserves remaining time.
- [ ] Visual focus is visible for interactive elements.
- [ ] Screen reader announces controls and completion events.

Contributing
------------

PRs and issues are welcome. For non-trivial changes, open an issue first to discuss the approach.

Licensing
---------

If you plan to publish or reuse this code, confirm licensing with the repository owner. No explicit license is included in this repository by default.

Contact
-------

Open an issue for questions, feature requests, or reports.

Changelog
---------

- v1.0 — initial static implementation with accessible controls and responsive layout.


A minimal, mobile-first kitchen timer built with pure HTML, CSS, and JavaScript — no frameworks, no dependencies, no internet required. Inspired by the classic physical kitchen timer design with a real SVG 7-segment LCD display.

---

## Preview

> A clean white timer body with a silver LCD screen, large circular buttons, and authentic 7-segment digit rendering.
https://suman25027.github.io/Kitchen-Timer/
---

## Features

- **Real SVG 7-segment display** — digits are hand-drawn SVG polygons with chamfered ends, not a font. Ghost segments always visible behind active ones, just like a physical LCD
- **Counts up to 99 minutes 59 seconds**
- **Colon blinks** every second while running
- **LCD flashes** when the timer finishes
- **Web Audio beep** — 5-tone alert plays on completion using the Web Audio API
- **Combo reset** — press 分 and 秒 simultaneously to reset to 00:00, replicating real hardware behaviour
- **Mobile-first** — designed for phone screens; on larger screens the interface stays centered at a fixed width
- **Zero dependencies** — single `.html` file, works fully offline
- **No frameworks** — vanilla HTML, CSS, and JavaScript only

---

## How to use

### Run locally

Just open the file in any browser:

```bash
open index.html
# or on Windows
start index.html
```

### On your phone

Transfer `index.html` to your phone and open it in Safari or Chrome. You can also use "Add to Home Screen" to save it as a standalone app icon.

### GitHub Pages

Push to a repo and enable GitHub Pages under **Settings → Pages → Deploy from branch**. The timer will be live at:

```
https://<your-username>.github.io/<repo-name>/
```

---

## Controls

| Button | Action |
|---|---|
| 分 (min) | Increment minutes by 1 (wraps at 99) |
| 秒 (sec) | Increment seconds by 1 (wraps at 59) |
| 分 + 秒 simultaneously | Reset to 00:00 |
| スタート／ストップ | Start or pause the countdown |

---

## Adding a custom sound

The timer uses a synthesised beep via the Web Audio API by default. To replace it with your own audio file, find the `beep()` function in the `<script>` block and swap it out:

```js
function beep() {
  const audio = new Audio('alarm.mp3');
  audio.play();
}
```

Then place your `alarm.mp3` (or `.wav`, `.ogg`) in the same folder as `index.html`.

---

## Project structure

```
kitchen-timer/
├── index.html   # entire app — markup, styles, and logic in one file
└── README.md
```

---

## How the 7-segment display works

Each digit is rendered as an SVG `<polygon>` for every one of the seven segments (a–g). Inactive segments are drawn in a dim ghost colour, active ones in dark charcoal — matching the look of a real LCD panel. No external font is loaded; the shapes are calculated in JavaScript at runtime based on a segment map:

```
 _
|_|   →  segments: a (top), b (top-right), c (bottom-right),
|_|         d (bottom), e (bottom-left), f (top-left), g (middle)
```

Each digit character maps to the subset of segments that should be lit:

```js
const SEGS = {
  '0': 'abcdef',
  '1': 'bc',
  '2': 'abdeg',
  // ...
};
```

---

## Browser support

Works in all modern browsers that support the Web Audio API and Pointer Events — Chrome, Safari, Firefox, and Edge on both desktop and mobile.

---

## License

MIT — free to use, modify, and distribute.
