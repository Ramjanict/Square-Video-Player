<div align="center">

# 🔲 Square Video Player

**A sleek, modern 1:1 aspect ratio video player featuring an animated perimeter SVG progress ring, smooth seeking, and glowing accents.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#license)

[**🌐 Live Demo**](https://square-video-player.vercel.app) • [**📦 GitHub Repository**](https://github.com/Ramjanict/Square-Video-Player) • [**Report Bug**](https://github.com/Ramjanict/Square-Video-Player/issues)

</div>

---

## 📖 Overview

**Square Video Player** is a creative, minimalist video player concept designed for modern web applications and social-style media experiences. 

Unlike conventional video players that rely on a standard horizontal progress bar beneath the media, **Square Video Player** wraps the playback progress along the outer perimeter of a rounded squircle frame using reactive SVG path tracing. Users can scrub and jump across the video by clicking anywhere along the border, with smooth mathematical easing animations handling the seek transition.

---

## ✨ Key Features

- ⬛ **1:1 Geometric Aspect Ratio**: Built inside a balanced square container (`400x400`) with smooth rounded corners (`50px` radius) ideal for Instagram/TikTok-style square video presentations.
- 🔴 **Perimeter SVG Progress Ring**: Custom SVG stroke dasharray/offset calculations that trace the perimeter in real time with an eye-catching neon red glow (`drop-shadow`).
- ⚡ **Interactive Perimeter Scrubbing**: Click anywhere along the top, right, bottom, or left border edge to calculate exact timeline coordinates and jump directly to that timestamp.
- 🎯 **Smooth Easing Seek Animation**: Uses `requestAnimationFrame` with quadratic ease-in/ease-out mathematical interpolation for fluid playback seeking without stutter.
- 🟡 **Dynamic Pointer Indicator**: Synchronized angular indicator tracking the playback progress along the player circumference.
- 🚀 **Modern Tooling & Zero Bloat**: Powered by **React 19**, **Tailwind CSS v4**, and **Vite 7** with zero bulky third-party video libraries.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Declarative component UI and reactive lifecycle management |
| **TypeScript** | Strict type safety and maintainable developer experience |
| **Tailwind CSS v4** | Next-gen utility-first styling |
| **HTML5 Media API** | Native video hardware acceleration and playback hooks |
| **Vite 7** | Ultra-fast build tool and lightning-quick HMR |

---

## 📂 Project Structure

```bash
Square-Video-Player/
├── public/
│   ├── demo.mp4               # Sample video asset
│   └── hat.png                # Favicon
├── src/
│   ├── App.tsx                # Core video player logic & perimeter calculations
│   ├── index.css              # Tailwind CSS imports & global styles
│   ├── main.tsx               # React application root
│   └── vite-env.d.ts          # Vite TypeScript declarations
├── index.html                 # Entry HTML template
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript compiler configuration
├── vite.config.ts             # Vite bundler configuration
└── README.md                  # Project documentation
```

---

## 🧮 How It Works

### Perimeter Distance Calculation
The SVG progress bar dynamically calculates the total perimeter of the rounded squircle:
$$\text{Perimeter} = 2 \times (\text{width} + \text{height})$$

As playback progresses:
$$\text{offset} = \text{Perimeter} \times (1 - \text{progress})$$

### Border Click Detection & Eased Seek
When clicking on the perimeter, the coordinate distance relative to the 4 sides is resolved into a progress float $[0.0, 1.0]$. An easing function then animates the video `currentTime`:
```ts
const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
video.currentTime = startTime + diff * ease;
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ramjanict/Square-Video-Player.git
   cd Square-Video-Player
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or with pnpm:
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:4321` (or the URL printed in the terminal).

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check out the [issues page](https://github.com/Ramjanict/Square-Video-Player/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
Made with ❤️ by <a href="https://github.com/Ramjanict">Ramjan</a>
</div>
