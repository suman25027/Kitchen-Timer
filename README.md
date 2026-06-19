# 🕐 Kitchen Timer

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
