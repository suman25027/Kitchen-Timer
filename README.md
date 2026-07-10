<h1 align="center">🍳 Kitchen Timer</h1>

<p align="center">
A minimal, mobile-first kitchen timer inspired by the classic physical kitchen timer.<br>
Built with <b>pure HTML, CSS, and JavaScript</b> — no frameworks, no dependencies, and works completely offline.
</p>

<p align="center">
  <a href="https://suman25027.github.io/Kitchen-Timer/"><strong>🌐 Live Demo</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Responsive-Mobile%20First-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/Offline-Ready-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge">
</p>

---

# 📸 Preview

<p align="center">
  <img src="https://suman25027.github.io/Kitchen-Timer/public/demo.png" width="700" alt="Kitchen Timer Preview">
</p>

---

# ✨ Features

- 📟 Authentic SVG **7-segment LCD display**
- ⏱️ Countdown timer up to **99 minutes 59 seconds**
- 🔔 Built-in **5-tone completion beep** using the Web Audio API
- ✨ LCD flashes when the countdown finishes
- ⏺️ Blinking colon while the timer is running
- 🔄 Hardware-style reset by pressing **分 + 秒** together
- 📱 Mobile-first responsive layout
- 💻 Works on desktop, tablet, and mobile
- 🌐 Fully offline capable
- ⚡ Zero dependencies
- 🎨 Single HTML file containing everything

---

# 🚀 Live Demo

### Try it here

**https://suman25027.github.io/Kitchen-Timer/**

---

# 🎮 Controls

| Button | Action |
|---------|--------|
| **分** | Increase minutes (+1) |
| **秒** | Increase seconds (+1) |
| **分 + 秒** | Reset timer to **00:00** |
| **スタート / ストップ** | Start or pause countdown |

---

# 🛠 Built With

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure |
| CSS3 | Styling |
| Vanilla JavaScript | Timer logic |
| SVG | 7-segment LCD display |
| Web Audio API | Completion sound |

---

# 📦 Project Structure

```text
Kitchen-Timer/
│
├── index.html
├── README.md
└── public/
    └── demo.png
```

---

# ▶️ Running Locally

Simply clone the repository.

```bash
git clone https://github.com/suman25027/Kitchen-Timer.git
```

Open the project.

```bash
cd Kitchen-Timer
```

Run by opening:

```text
index.html
```

or simply double-click the file.

No installation.

No package manager.

No build tools.

No internet connection required.

---

# 📱 Mobile Installation

The timer works perfectly on mobile browsers.

You can also install it as a shortcut:

- **Android (Chrome)** → Add to Home Screen
- **iPhone (Safari)** → Share → Add to Home Screen

---

# 🧩 How It Works

The display is not a font.

Each digit is drawn using real SVG polygons representing the seven LCD segments.

```
 _
|_|
|_|
```

Each number activates only the required segments.

Example:

```javascript
const SEGS = {
  "0": "abcdef",
  "1": "bc",
  "2": "abdeg",
  "3": "abcdg",
  "4": "bcfg",
  "5": "acdfg",
  "6": "acdefg",
  "7": "abc",
  "8": "abcdefg",
  "9": "abcdfg"
};
```

Inactive segments remain visible as "ghost" segments, recreating the appearance of a real LCD display.

---

# 🔊 Custom Alarm Sound

The default alarm is generated with the **Web Audio API**.

To use your own sound:

```javascript
function beep() {
    const audio = new Audio("alarm.mp3");
    audio.play();
}
```

Place your audio file beside `index.html`.

Supported formats:

- mp3
- wav
- ogg

---

# 🌍 Browser Support

| Browser | Supported |
|----------|-----------|
| Chrome | ✅ |
| Firefox | ✅ |
| Edge | ✅ |
| Safari | ✅ |
| Android Chrome | ✅ |
| Mobile Safari | ✅ |

---

# ⚡ Highlights

- 🚫 No frameworks
- 🚫 No libraries
- 🚫 No build step
- 🚫 No internet required
- 🚫 No dependencies

Just open **index.html** and use it.

---

# 🤝 Contributing

Contributions are always welcome.

If you'd like to improve the timer:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

Bug reports, feature ideas, and improvements are appreciated.

---

# 📄 License

This project is licensed under the **MIT License**.

Feel free to use, modify, and distribute it.

---

# ⭐ Support

If you found this project useful, please consider giving it a **Star ⭐** on GitHub.

It helps others discover the project and motivates future improvements.

---

<p align="center">

Made with ❤️ using Vanilla JavaScript

**Enjoy cooking! 🍳**

</p>
