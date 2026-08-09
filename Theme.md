# Brutalist Dark Design System
## Next.js Static Portfolio — Full Implementation Guide

> **Aesthetic:** Industrial terminal. Uncompromising, raw, memorable.
> **Stack:** Next.js (static export) · Tailwind CSS v4 · shadcn/ui · Brutalist UI · react-bits · Framer Motion

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Folder Structure](#2-folder-structure)
3. [Bootstrap & Configuration](#3-bootstrap--configuration)
4. [Design Tokens](#4-design-tokens)
5. [Typography System](#5-typography-system)
6. [Component Library Stack](#6-component-library-stack)
7. [Global Layout & Shell](#7-global-layout--shell)
8. [Section 1 — Navigation](#8-section-1--navigation)
9. [Section 2 — Hero / Greeting](#9-section-2--hero--greeting)
10. [Section 3 — Skills / What I Do](#10-section-3--skills--what-i-do)
11. [Section 4 — Proficiency](#11-section-4--proficiency)
12. [Section 5 — Education](#12-section-5--education)
13. [Section 6 — Experience](#13-section-6--experience)
14. [Section 7 — Testimonials](#14-section-7--testimonials)
15. [Section 8 — Projects](#15-section-8--projects)
16. [Section 9 — GitHub / Contact CTA](#16-section-9--github--contact-cta)
17. [Shared Primitive Components](#17-shared-primitive-components)
18. [Animation Conventions](#18-animation-conventions)
19. [Static Export & Deployment](#19-static-export--deployment)
20. [Content Data Layer](#20-content-data-layer)

---

## 1. Project Overview

### What We're Building

A **single-page static portfolio** for Adeer Khan using a **Brutalist Dark** design system. The aesthetic is drawn from industrial terminal interfaces: monospace type, raw grid lines, high-contrast red-on-black accents, pixel-perfect geometry, and zero decorative softness.

### Design Principles

| Principle | Implementation |
|---|---|
| **Raw grid** | CSS Grid with visible 1px borders acting as structural lines |
| **Terminal type** | `Space Mono` for headings, `IBM Plex Mono` for labels/code |
| **Signal color** | Single accent — `#FF3D00` (terminal red/orange) on `#0A0A0A` |
| **No rounding** | `border-radius: 0` everywhere, no soft shadows |
| **Ink texture** | Subtle CSS grid overlay on hero, noise via Tailwind plugin |
| **Harsh motion** | Snap-in reveals, no easing fluff — `cubic-bezier(0.22, 1, 0.36, 1)` |

### Library Decisions

```
shadcn/ui        — accessible component primitives (accordion, dialog, tabs)
Brutalist UI     — pre-styled brutalist components (buttons, cards, inputs)
react-bits       — animated backgrounds (Aurora, StarField for hero)
Framer Motion    — scroll reveals, counter animations, marquee
Space Mono       — Google Font, display headings
IBM Plex Mono    — Google Font, body/labels
```

---

## 2. Folder Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, shell
│   ├── page.tsx            # Single page — all sections composed
│   └── globals.css         # Tailwind base + design tokens
│
├── components/
│   ├── layout/
│   │   ├── PageShell.tsx       # Outer wrapper with grid overlay
│   │   └── SectionWrapper.tsx  # Numbered section container
│   │
│   ├── navigation/
│   │   └── NavBar.tsx
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProficiencySection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── ContactSection.tsx
│   │
│   ├── cards/
│   │   ├── EducationCard.tsx
│   │   ├── ExperienceCard.tsx
│   │   ├── FeedbackCard.tsx
│   │   └── ProjectCard.tsx
│   │
│   └── primitives/
│       ├── SectionLabel.tsx    # "// SECTION_01" eyebrow
│       ├── SectionTitle.tsx    # Bebas/Space Mono big heading
│       ├── TerminalLine.tsx    # Blinking cursor text line
│       ├── GlitchText.tsx      # CSS glitch on hover
│       ├── ProgressBar.tsx     # Brutalist filled bar
│       ├── SkillBadge.tsx      # Monospace skill tag
│       ├── SocialLink.tsx      # Icon + label link
│       └── ScanlineOverlay.tsx # Aesthetic CRT lines
│
├── data/
│   ├── hero.ts
│   ├── skills.ts
│   ├── proficiency.ts
│   ├── education.ts
│   ├── experience.ts
│   ├── testimonials.ts
│   ├── projects.ts
│   └── social.ts
│
├── lib/
│   └── utils.ts            # cn() helper from shadcn
│
├── public/
│   └── (no lottie — replaced with CSS/SVG animations)
│
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 3. Bootstrap & Configuration

### 3.1 Create Next.js Project

```bash
npx create-next-app@latest portfolio \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*"

cd portfolio
```

### 3.2 Install All Dependencies

```bash
# Core UI
npm install shadcn-ui@latest

# Brutalist components
npm install brutalist-ui

# Animated components (react-bits)
npm install react-bits

# Animation engine
npm install framer-motion

# Icons
npm install lucide-react
npm install @iconify/react

# Fonts
npm install @next/font

# Utility
npm install clsx tailwind-merge

# Optional: noise/texture utilities
npm install tailwindcss-animate
```

### 3.3 Initialize shadcn/ui

```bash
npx shadcn@latest init
```

When prompted, select:
- Style: **Default**
- Base color: **Zinc** (we'll override everything in CSS)
- CSS variables: **Yes**

Then add the primitives you'll actually use:

```bash
npx shadcn@latest add button
npx shadcn@latest add badge
npx shadcn@latest add card
npx shadcn@latest add accordion
npx shadcn@latest add progress
npx shadcn@latest add separator
npx shadcn@latest add tooltip
```

### 3.4 `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // static export
  images: {
    unoptimized: true,       // required for static export
  },
  trailingSlash: true,
};

export default nextConfig;
```

### 3.5 `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // ── COLORS ──────────────────────────────────────
      colors: {
        terminal: {
          bg:       "#0A0A0A",
          surface:  "#111111",
          elevated: "#1A1A1A",
          border:   "#2A2A2A",
          muted:    "#444444",
          dim:      "#666666",
          text:     "#F0F0F0",
          soft:     "#BBBBBB",
          signal:   "#FF3D00",
          "signal-dim": "#991F00",
          green:    "#00FF41",
          amber:    "#FFB800",
          white:    "#FFFFFF",
        },
      },

      // ── FONTS ───────────────────────────────────────
      fontFamily: {
        mono:    ["var(--font-space-mono)", "Space Mono", "monospace"],
        display: ["var(--font-space-mono)", "Space Mono", "monospace"],
        body:    ["var(--font-ibm-plex-mono)", "IBM Plex Mono", "monospace"],
      },

      // ── SPACING ─────────────────────────────────────
      spacing: {
        "section": "6rem",
        "section-sm": "3rem",
      },

      // ── BORDERS ─────────────────────────────────────
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
      },

      // ── ANIMATIONS ──────────────────────────────────
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        scanline: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glitch: {
          "0%":   { clipPath: "inset(40% 0 61% 0)", transform: "translate(-4px, 0)" },
          "20%":  { clipPath: "inset(92% 0 1% 0)",  transform: "translate(4px, 0)"  },
          "40%":  { clipPath: "inset(43% 0 1% 0)",  transform: "translate(-2px, 0)" },
          "60%":  { clipPath: "inset(25% 0 58% 0)", transform: "translate(2px, 0)"  },
          "80%":  { clipPath: "inset(54% 0 7% 0)",  transform: "translate(-4px, 0)" },
          "100%": { clipPath: "inset(58% 0 43% 0)", transform: "translate(0, 0)"    },
        },
        marquee: {
          "from": { transform: "translateX(0)" },
          "to":   { transform: "translateX(-50%)" },
        },
        "counter-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        blink:      "blink 1s step-start infinite",
        scanline:   "scanline 8s linear infinite",
        glitch:     "glitch 0.4s steps(1) infinite",
        marquee:    "marquee 20s linear infinite",
        "counter-up": "counter-up 0.4s ease-out forwards",
      },
    },
  },
  plugins: [animate],
};

export default config;
```

### 3.6 `app/globals.css`

```css
@import "tailwindcss";

/* ── FONT IMPORTS ───────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

/* ── CSS VARIABLES (shadcn override to brutalist) ───── */
:root {
  --background:       10 10 10;
  --foreground:       240 240 240;
  --card:             17 17 17;
  --card-foreground:  240 240 240;
  --border:           42 42 42;
  --input:            26 26 26;
  --ring:             255 61 0;
  --primary:          255 61 0;
  --primary-foreground: 10 10 10;
  --muted:            26 26 26;
  --muted-foreground: 102 102 102;
  --accent:           255 61 0;
  --accent-foreground: 10 10 10;

  --font-space-mono: 'Space Mono', monospace;
  --font-ibm-plex-mono: 'IBM Plex Mono', monospace;

  --radius: 0px;
}

/* ── BASE RESET ──────────────────────────────────────── */
* {
  box-sizing: border-box;
  border-color: rgb(42 42 42);
}

html {
  scroll-behavior: smooth;
  background: #0A0A0A;
}

body {
  background: #0A0A0A;
  color: #F0F0F0;
  font-family: var(--font-ibm-plex-mono);
  font-weight: 300;
  overflow-x: hidden;
}

/* ── SELECTION ───────────────────────────────────────── */
::selection {
  background: #FF3D00;
  color: #0A0A0A;
}

/* ── SCROLLBAR ───────────────────────────────────────── */
::-webkit-scrollbar       { width: 3px; }
::-webkit-scrollbar-track { background: #111111; }
::-webkit-scrollbar-thumb { background: #FF3D00; }

/* ── GRID OVERLAY (global subtle background) ─────────── */
.grid-overlay::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.025) 39px, rgba(255,255,255,0.025) 40px),
    repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.025) 39px, rgba(255,255,255,0.025) 40px);
  pointer-events: none;
  z-index: 0;
}

/* ── TERMINAL CURSOR ─────────────────────────────────── */
.cursor::after {
  content: '_';
  animation: blink 1s step-start infinite;
  color: #FF3D00;
}

/* ── GLITCH TEXT ─────────────────────────────────────── */
.glitch {
  position: relative;
}
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  opacity: 0;
}
.glitch:hover::before {
  opacity: 0.8;
  color: #FF3D00;
  animation: glitch 0.4s steps(1) infinite;
}
.glitch:hover::after {
  opacity: 0.8;
  color: #00FF41;
  animation: glitch 0.4s steps(1) 0.1s infinite;
}

/* ── PROGRESS BAR (brutalist override) ──────────────── */
.progress-brutalist {
  height: 4px;
  background: #1A1A1A;
  border: 1px solid #2A2A2A;
  overflow: hidden;
}
.progress-brutalist > div {
  height: 100%;
  background: #FF3D00;
  transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}
```

---

## 4. Design Tokens

All design decisions in one place. These are already embedded in `tailwind.config.ts` but listed here for reference when building components.

### 4.1 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `terminal-bg` | `#0A0A0A` | Page background |
| `terminal-surface` | `#111111` | Cards, panels |
| `terminal-elevated` | `#1A1A1A` | Hover states, inputs |
| `terminal-border` | `#2A2A2A` | All structural lines |
| `terminal-muted` | `#444444` | Disabled, subdued elements |
| `terminal-dim` | `#666666` | Metadata, captions |
| `terminal-text` | `#F0F0F0` | Primary text |
| `terminal-soft` | `#BBBBBB` | Secondary text, body |
| `terminal-signal` | `#FF3D00` | **Single accent color** — CTAs, highlights, active states |
| `terminal-signal-dim` | `#991F00` | Signal hover/pressed |
| `terminal-green` | `#00FF41` | Success states, online indicator |
| `terminal-amber` | `#FFB800` | Warnings, dates |

### 4.2 Spacing Scale

Follow an 8px base unit. Key breakpoints:

| Token | Value | Context |
|---|---|---|
| `4` | 16px | Component internal padding |
| `6` | 24px | Card padding |
| `8` | 32px | Section internal gap |
| `12` | 48px | Between section items |
| `16` | 64px | Section top/bottom |
| `24` | 96px | Major section breaks |

### 4.3 Border Rules

- **All borders:** `1px solid #2A2A2A` (never use Tailwind's default)
- **Active/signal border:** `1px solid #FF3D00`
- **No rounded corners anywhere:** `border-radius: 0`
- **Border as decoration:** Use `border-l-2 border-terminal-signal` for emphasis lines

---

## 5. Typography System

### 5.1 Font Loading in `app/layout.tsx`

```typescript
import { Space_Mono, IBM_Plex_Mono } from "next/font/google";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-space-mono",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});
```

Apply on `<html>`:

```typescript
<html className={`${spaceMono.variable} ${ibmPlexMono.variable}`}>
```

### 5.2 Type Scale

| Role | Class | Font | Size | Weight |
|---|---|---|---|---|
| Section number | `text-xs tracking-[0.3em] text-terminal-signal` | IBM Plex Mono | 11px | 400 |
| Eyebrow | `text-xs tracking-[0.2em] uppercase text-terminal-dim` | IBM Plex Mono | 11px | 400 |
| Hero heading | `font-mono text-[clamp(64px,12vw,160px)] font-bold leading-none` | Space Mono | fluid | 700 |
| Section heading | `font-mono text-[clamp(40px,7vw,96px)] font-bold leading-[0.9]` | Space Mono | fluid | 700 |
| Card heading | `font-mono text-2xl font-bold` | Space Mono | 24px | 700 |
| Body | `font-body text-sm leading-relaxed text-terminal-soft` | IBM Plex Mono | 14px | 300 |
| Label | `font-body text-xs tracking-widest uppercase` | IBM Plex Mono | 11px | 400 |
| Code inline | `font-mono text-terminal-signal` | Space Mono | inherit | 400 |

---

## 6. Component Library Stack

### 6.1 shadcn/ui — Accessible Primitives

Use shadcn for behavior-heavy components. Override all visual styles via CSS variables set in `globals.css`.

| Component | Used For |
|---|---|
| `<Button>` | All CTAs — override with `variant="outline"` + custom classes |
| `<Badge>` | Skill tags, project categories |
| `<Card>` | Base card container — override with brutalist border |
| `<Accordion>` | Experience item expansion on mobile |
| `<Progress>` | Proficiency bars — override track/indicator |
| `<Tooltip>` | Skill icon hover labels |
| `<Separator>` | Section dividers |

**Overriding shadcn button to brutalist style:**

In your component, always combine shadcn's `<Button>` with Tailwind overrides:

```typescript
<Button
  variant="outline"
  className="
    rounded-none border border-terminal-signal
    text-terminal-signal font-mono text-xs tracking-widest uppercase
    hover:bg-terminal-signal hover:text-terminal-bg
    transition-colors duration-200
    px-6 py-3
  "
>
  [ INIT CONTACT ]
</Button>
```

### 6.2 Brutalist UI — Pre-styled Brutalist Components

Brutalist UI gives you components already styled with thick borders, offset shadows, and high-contrast color. Import directly and use as-is for project cards and feedback cards.

```typescript
// Install: npm install brutalist-ui
// Usage:
import { BrutalCard, BrutalButton, BrutalInput } from "brutalist-ui";
```

Use `BrutalCard` as the outer shell for `ProjectCard` and `FeedbackCard`. Customize the shadow color to use `#FF3D00` as the offset shadow.

### 6.3 react-bits — Animated Backgrounds

Use `react-bits` for the hero section background. It has a `StarField` and `Aurora` component that work well with the dark terminal aesthetic.

```typescript
import { StarField } from "react-bits";
// or
import { Particles } from "react-bits";
```

Place inside the hero section as an absolute-positioned background layer. Set particle color to `#FF3D00` with low opacity (`0.3`) for the grid-line aesthetic.

### 6.4 Framer Motion — Scroll Reveals & Animation

Every section reveal uses the same pattern:

```typescript
import { motion, useInView } from "framer-motion";

const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-80px" });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 24 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
>
```

---

## 7. Global Layout & Shell

### `app/layout.tsx`

```typescript
import type { Metadata } from "next";
import { Space_Mono, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio Owner",
  description:
    "Full Stack Web Developer — Python, Django, React.js, Next.js, Cloud.",
  authors: [{ name: "Portfolio Owner" }],
  keywords: ["Portfolio"],
  openGraph: {
    title: "Portfolio Owner",
    description: "Full Stack Web Developer",
    url: "https://your-portfolio.vercel.app",
    images: [
      { url: "https://avatars.githubusercontent.com/u/59178380?v=4" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Owner",
    images: ["https://avatars.githubusercontent.com/u/59178380?v=4"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${spaceMono.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-terminal-bg text-terminal-text antialiased">
        {children}
      </body>
    </html>
  );
}
```

### `components/layout/PageShell.tsx`

```typescript
/**
 * PageShell
 * Wraps all page content with:
 *  - fixed CSS grid overlay
 *  - scanline effect (optional, toggle via prop)
 *  - max-width centering
 */

import { ScanlineOverlay } from "@/components/primitives/ScanlineOverlay";

interface PageShellProps {
  children: React.ReactNode;
  showScanlines?: boolean;
}

export function PageShell({ children, showScanlines = true }: PageShellProps) {
  return (
    <div className="relative min-h-screen grid-overlay">
      {showScanlines && <ScanlineOverlay />}
      <div className="relative z-10 max-w-[1400px] mx-auto">
        {children}
      </div>
    </div>
  );
}
```

### `components/layout/SectionWrapper.tsx`

```typescript
/**
 * SectionWrapper
 * - Numbered section container
 * - Horizontal top border as section divider
 * - Accepts section number and id for scroll anchoring
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionWrapperProps {
  id: string;
  num: string;           // e.g. "01", "02"
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({
  id,
  num,
  children,
  className = "",
}: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id={id}
      ref={ref}
      className={`
        border-t border-terminal-border
        px-6 md:px-12 py-16 md:py-24
        relative ${className}
      `}
    >
      {/* Section number stamp */}
      <span className="
        absolute top-6 right-6
        font-mono text-[80px] font-bold
        text-terminal-border leading-none
        pointer-events-none select-none
      ">
        {num}
      </span>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
```

---

## 8. Section 1 — Navigation

### Design Spec

```
[YOUR_NAME.DEV]                              [GH] [LI] [IG]  [ START PROJECT ]
─────────────────────────────────────────────────────────────────────────────
```

- Fixed at top, `mix-blend-mode: multiply` so grid shows through
- Brand: `Space Mono`, `font-bold`, signal color dot
- Nav links: right-aligned icon buttons
- CTA: outlined signal-color button
- Mobile: icons collapse to hamburger → slide-down drawer

### `components/navigation/NavBar.tsx` — Spec

```typescript
/**
 * NavBar
 *
 * Props: none (reads from data/social.ts)
 *
 * Behavior:
 *  - Fixed position, full width
 *  - Background: bg-terminal-bg/90 backdrop-blur-sm
 *  - Height: h-16
 *  - Bottom border: border-b border-terminal-border
 *  - Hides on scroll down (>80px), reappears on scroll up
 *    — implement with useEffect tracking window.scrollY delta
 *
 * Left slot: brand text "YOUR_NAME"
 *   - font-mono font-bold text-lg
 *   - Underscores instead of spaces — terminal naming convention
 *   - dot before name: "●" in text-terminal-signal
 *
 * Right slot: social icon links + CTA
 *   - Icons from lucide-react: Github, Linkedin, Instagram
 *   - Each icon: 18px, color text-terminal-dim, hover:text-terminal-signal
 *   - CTA button: "[ CONTACT ]" — outlined, signal color
 *
 * Mobile (<768px):
 *   - Hide text links, show hamburger (Menu icon from lucide)
 *   - Drawer: full-width panel drops from nav
 *   - Drawer bg: bg-terminal-surface, border-b border-terminal-border
 *   - Drawer items: stacked vertically with border-b separators
 */
```

### Tailwind Classes Reference

```
Outer nav wrapper:
  fixed top-0 left-0 right-0 z-50
  h-16
  bg-terminal-bg/90 backdrop-blur-sm
  border-b border-terminal-border
  flex items-center justify-between
  px-6 md:px-12
  transition-transform duration-300

Brand:
  font-mono font-bold text-lg tracking-wider
  text-terminal-text

Social icon button (each):
  w-9 h-9
  flex items-center justify-center
  border border-terminal-border
  text-terminal-dim hover:text-terminal-signal
  hover:border-terminal-signal
  transition-colors duration-200

CTA button:
  (see shadcn Button override in Section 6.1)
```

---

## 9. Section 2 — Hero / Greeting

### Design Spec

```
// INIT_SEQUENCE · FULL_STACK_DEVELOPER

HI ALL,
I'M YOUR_NAME_              ← blinking cursor after name

I'm a passionate Full Stack web developer...

[ SEE MY RESUME ]   GH  LI  IG

────────────────────────────────
  18+           9+         100%
  CLIENTS   PROJECTS   SATISFACTION
```

- Oversized Space Mono heading — fluid `clamp(64px, 12vw, 160px)`
- Background: react-bits `Particles` with signal-color dots
- Ghost text `PORTFOLIO` behind heading at 5% opacity
- Blinking cursor after name via `.cursor` pseudo-element
- Stats row at bottom — counter animation on scroll into view

### `components/sections/HeroSection.tsx` — Spec

```typescript
/**
 * HeroSection
 *
 * Layout: min-h-screen, flex column, justify-end
 * (headline anchors to bottom 30% of viewport — like the Clovi Sol reference)
 *
 * Background layer (absolute, inset-0, z-0):
 *   react-bits <Particles>
 *   - color: "#FF3D00"
 *   - quantity: 60
 *   - opacity: 0.3
 *   - size: 1
 *   + CSS grid overlay via ::before (from globals.css)
 *
 * Ghost text (absolute, z-0):
 *   "PORTFOLIO" in font-mono font-bold
 *   font-size: clamp(120px, 20vw, 280px)
 *   color: #F0F0F0 at 4% opacity
 *   positioned: top-1/2 -translate-y-1/2 left-0
 *
 * Content layer (relative, z-10, px-6 md:px-12):
 *
 *   Eyebrow:
 *     "// INIT_SEQUENCE · FULL_STACK_DEVELOPER"
 *     text-xs tracking-[0.2em] text-terminal-signal mb-4
 *
 *   Headline:
 *     Two lines: "HI ALL," / "I'M {name}_"
 *     font-mono font-bold leading-none text-terminal-text
 *     Last word has .cursor class for blinking underscore
 *
 *   Description:
 *     From data/hero.ts → hero.description
 *     max-w-xl text-sm leading-relaxed text-terminal-soft
 *     Border-left: border-l-2 border-terminal-signal pl-4
 *
 *   Actions row:
 *     <Button> "[ SEE MY RESUME ]" → hero.resumeLink
 *     <SocialLinks> — icon buttons for all social links
 *     Gap: gap-4, flex-wrap
 *
 *   Stats row (bottom, border-t border-terminal-border):
 *     grid grid-cols-3 gap-0
 *     Each stat: border-r border-terminal-border (last: no border)
 *     Number: font-mono font-bold text-4xl text-terminal-text
 *     Suffix: text-terminal-signal
 *     Label: text-xs tracking-widest uppercase text-terminal-dim
 *     Counter animation: Framer Motion useInView + spring count-up
 */
```

### Stats Data

```typescript
const stats = [
  { value: 18,  suffix: "+", label: "Happy Clients" },
  { value: 9,   suffix: "+", label: "Projects Done" },
  { value: 100, suffix: "%", label: "Satisfaction"  },
];
```

---

## 10. Section 3 — Skills / What I Do

### Design Spec

```
// SECTION_03

WHAT I DO.

CRAZY FULL STACK DEVELOPER WHO WANTS
TO EXPLORE EVERY TECH STACK

──────────────────────────────────────────

FULL STACK DEVELOPMENT

> Building responsive SPAs & PWA in React.js
> Building responsive static websites using Next.js
> Building RESTful APIs in Django & DRF

[PY] [DJ] [JS] [RX] [NX] [AW] [HK] [GH] [DK]
```

### `components/sections/SkillsSection.tsx` — Spec

```typescript
/**
 * SkillsSection
 *
 * Eyebrow: "// SECTION_03"
 * Title: "WHAT I DO." — font-mono font-bold
 * Subtitle: uppercase, all caps, text-terminal-dim, max-w-2xl
 *
 * Separator: full-width border-t border-terminal-border my-12
 *
 * Skill Group layout (for each group in data/skills.ts):
 *
 *   Two-column on desktop (md:grid-cols-2), single on mobile
 *   Left: capability bullets
 *   Right: software skill badges
 *
 *   Group title:
 *     font-mono font-bold text-2xl text-terminal-text mb-6
 *     prefix: "> " in text-terminal-signal
 *
 *   Capability bullets:
 *     Each: flex row, gap-3
 *     Prefix marker: "—" text-terminal-signal
 *     Text: text-sm text-terminal-soft
 *
 *   Software skills:
 *     flex flex-wrap gap-2
 *     Each <SkillBadge>:
 *       border border-terminal-border px-3 py-1
 *       font-body text-xs text-terminal-soft
 *       hover:border-terminal-signal hover:text-terminal-signal
 *       transition-colors duration-200
 *       Tooltip: shadcn <Tooltip> shows full skill name on hover
 *       Icon: @iconify/react <Icon icon={skill.iconifyTag} />
 *
 * Animation: stagger children — each skill badge animates in
 * with 0.04s delay per item using Framer Motion staggerChildren
 */
```

---

## 11. Section 4 — Proficiency

### Design Spec

```
// SECTION_04

PROFICIENCY.

FRONTEND/DESIGN ──────────────────── 85%
BACKEND         ──────────────────── 90%
PROGRAMMING     ──────────────────── 95%
```

### `components/sections/ProficiencySection.tsx` — Spec

```typescript
/**
 * ProficiencySection
 *
 * Layout: two-column on desktop
 *   Left col: section label + title + description text
 *   Right col: progress bars
 *
 * Progress bars (from data/proficiency.ts):
 *   Each bar:
 *     Label row: flex justify-between mb-2
 *       Left:  font-mono text-sm text-terminal-text
 *       Right: font-mono text-sm text-terminal-signal
 *     Bar track: h-[3px] bg-terminal-surface border border-terminal-border
 *     Bar fill:  bg-terminal-signal transition-[width] duration-1000
 *                ease-[cubic-bezier(0.22,1,0.36,1)]
 *                width animates from 0 to value% when in view
 *
 *   Animate on scroll: useInView, set width once isInView becomes true
 *   Space between bars: gap-8 flex-col
 *
 * Note: use shadcn <Progress> as base, override via className
 * The .progress-brutalist class from globals.css handles styling
 */
```

---

## 12. Section 5 — Education

### Design Spec

```
// SECTION_05

EDUCATION.

┌──────────────────────────────────────────────────────┐
│ UNIVERSITY OF CENTRAL PUNJAB                         │
│ B.Sc. Computer Science                    GRADE: A   │
│ Sep 2017 — Apr 2020                                  │
└──────────────────────────────────────────────────────┘
```

### `components/cards/EducationCard.tsx` — Spec

```typescript
/**
 * EducationCard
 *
 * Props:
 *   schoolName: string
 *   subHeader:  string
 *   duration:   string
 *   grade?:     string
 *   desc?:      string
 *   descBullets?: string[]
 *
 * Layout:
 *   border border-terminal-border bg-terminal-surface p-6
 *   hover:border-terminal-signal transition-colors duration-300
 *
 * Header row:
 *   flex justify-between items-start
 *   School name: font-mono font-bold text-xl text-terminal-text
 *   Grade badge: font-body text-xs text-terminal-signal
 *                border border-terminal-signal px-2 py-0.5
 *
 * Sub-row:
 *   Degree: text-sm text-terminal-soft
 *   Duration: text-xs text-terminal-amber font-mono
 *
 * Border-left accent: border-l-2 border-terminal-signal pl-4 mt-4
 *
 * No Brutalist UI card here — use raw Tailwind for clean control
 */
```

---

## 13. Section 6 — Experience

### Design Spec

```
// SECTION_06

EXPERIENCE.

┌─────────────────────┐  ┌─────────────────────┐
│ MEGANOS SOFTWARE    │  │ DUSECA SOFTWARE      │
│ Django Developer    │  │ Full Stack Developer  │
│ Aug 2022 — Present  │  │ Jan 2022 — Sept 2023 │
│ ─────────────────── │  │ ──────────────────── │
│ I crafted backends  │  │ Crafted robust...    │
└─────────────────────┘  └─────────────────────┘
```

### `components/cards/ExperienceCard.tsx` — Spec

```typescript
/**
 * ExperienceCard
 *
 * Props:
 *   company:     string
 *   role:        string
 *   date:        string
 *   companyLogo: string   (image src — use next/image)
 *   desc:        string
 *   descBullets?: string[]
 *
 * Outer shell:
 *   Use BrutalCard from brutalist-ui
 *   Override shadow color: --brutal-shadow: #FF3D00
 *   or via className: style={{ '--brutal-shadow': '#FF3D00' }}
 *
 * Header:
 *   flex items-start gap-4
 *   Logo: 40×40px border border-terminal-border bg-terminal-surface
 *         object-contain p-1 (use Next <Image>)
 *   Company: font-mono font-bold text-lg text-terminal-text
 *   Role: text-xs text-terminal-signal uppercase tracking-widest
 *   Date: text-xs text-terminal-amber font-mono
 *
 * Separator: border-t border-terminal-border my-4
 *
 * Description:
 *   text-sm text-terminal-soft leading-relaxed
 *   prefix first line: "▸ " in text-terminal-signal
 *
 * descBullets (if any):
 *   mt-3 space-y-1
 *   Each: flex gap-2 text-xs text-terminal-dim
 *   Prefix: "—" text-terminal-signal
 *
 * Grid:
 *   md:grid-cols-2 gap-4
 *   Mobile: single column
 */
```

### Experience Data (from `data/experience.ts`)

```typescript
export const experience = [
  {
    company: "Meganos Software",
    role: "Django Developer",
    date: "Aug 2022 — Present",
    companyLogo: "/img/icons/common/meganos.png",
    desc: "I crafted backends for diverse web apps, APIs, and WebSockets in e-commerce, podcasts, and property management. Managed server upkeep, deployments on Linux, Heroku, and AWS S3. Implemented PyTest for automated unit and integration testing, slashing 4 hours of manual testing each sprint.",
  },
  {
    company: "Duseca Software",
    role: "Full Stack Developer",
    date: "Jan 2022 — Sept 2023",
    companyLogo: "/img/icons/common/duseca_software_logo.jpeg",
    desc: "Crafted robust mobile application backends employing Django, Python, and REST APIs. Leveraged Django REST Framework, PostgreSQL, AWS, Firebase, Stripe, and WebSocket for efficient development. Designed intuitive UIs, empowering clients to effortlessly manage their applications.",
  },
  {
    company: "ZRTechnologies",
    role: "Full Stack Developer",
    date: "Aug 2022 — Jun 2023",
    companyLogo: "/img/icons/common/zrtech.jpeg",
    desc: "Crafting diverse web applications, I've elevated functionality and user engagement. Spearheaded Visual Portfolio, leveraging AI for captivating presentations. Proficiently set up and optimized applications on Linux servers, guaranteeing smooth scalability.",
  },
  {
    company: "Bleed-AI",
    role: "Backend Developer",
    date: "Sept 2021 — Oct 2021",
    companyLogo: "/img/icons/common/bleedAI.jpg",
    desc: "As a Django developer at Bleed AI, integrated a computer vision AI model to process YouTube URLs. Used Django Channels and WebSockets to show real-time processing and implemented threading to run multiple AI model instances.",
  },
];
```

---

## 14. Section 7 — Testimonials

### Design Spec

```
// SECTION_07

OUR CLIENTS FEEDBACK.

┌─────────────────────────────────────────┐
│ ❝ You were a wonderful addition to our  │
│   team, alhumdulillah. I'm quite        │
│   impressed with your abilities...    ❞ │
│ ──────────────────────────────────────  │
│ SYED JAMAL                              │
│ Frontend Developer at Meganos Software  │
└─────────────────────────────────────────┘
```

### `components/cards/FeedbackCard.tsx` — Spec

```typescript
/**
 * FeedbackCard
 *
 * Props:
 *   name:     string
 *   role:     string
 *   feedback: string
 *
 * Outer shell: BrutalCard from brutalist-ui
 *   Custom offset shadow: shadow color = terminal-signal at low opacity
 *   bg-terminal-surface border border-terminal-border p-6
 *
 * Opening quote mark:
 *   font-mono text-6xl text-terminal-signal leading-none mb-2
 *   content: "❝" (decorative, aria-hidden)
 *
 * Feedback text:
 *   text-sm text-terminal-soft leading-relaxed italic
 *   font-body
 *
 * Attribution separator:
 *   border-t border-terminal-border mt-4 pt-4
 *
 * Name:
 *   font-mono font-bold text-sm text-terminal-text
 *   uppercase tracking-widest
 *
 * Role:
 *   text-xs text-terminal-signal mt-1
 *
 * Grid: md:grid-cols-2 gap-4
 */
```

---

## 15. Section 8 — Projects

### Design Spec

```
// SECTION_08

PROJECTS.

┌────────────────────────────────────────┐
│ [PROJ_001] developer-portfolio         │
│ ──────────────────────────────────     │
│ Software Developer Portfolio Template  │
│ built with react.js and next.js...    │
│                                        │
│ [ GITHUB ↗ ]  [ LIVE DEMO ↗ ]         │
└────────────────────────────────────────┘
```

### `components/cards/ProjectCard.tsx` — Spec

```typescript
/**
 * ProjectCard
 *
 * Props:
 *   name:    string
 *   desc:    string
 *   github?: string
 *   link?:   string
 *   index:   number    (for [PROJ_001] label generation)
 *
 * Outer shell: BrutalCard from brutalist-ui
 *   bg-terminal-surface p-6
 *   Hover: offset shadow in terminal-signal color
 *   transition: box-shadow 0.2s
 *
 * Project ID label:
 *   font-mono text-xs text-terminal-signal mb-3
 *   Format: "[PROJ_00{index+1}]"
 *
 * Name:
 *   font-mono font-bold text-xl text-terminal-text mb-1
 *   .glitch data-text={name} — glitch on hover
 *
 * Separator: border-t border-terminal-border my-3
 *
 * Description:
 *   text-sm text-terminal-soft leading-relaxed
 *
 * Links row (flex gap-3 mt-4):
 *   GitHub link (if exists):
 *     flex items-center gap-2 text-xs font-mono
 *     border border-terminal-border px-3 py-1.5
 *     hover:border-terminal-signal hover:text-terminal-signal
 *     text-terminal-dim transition-colors
 *     Icon: <Github size={14} /> "GITHUB ↗"
 *
 *   Live link (if exists):
 *     Same styling, Icon: <ExternalLink size={14} /> "LIVE DEMO ↗"
 *
 * Grid: md:grid-cols-2 gap-4
 * Animation: stagger 0.1s per card
 */
```

---

## 16. Section 9 — GitHub / Contact CTA

### Design Spec

```
// SECTION_09

REACH OUT TO ME!

DISCUSS A PROJECT OR JUST WANT TO SAY HI?
MY INBOX IS OPEN FOR ALL

[ your.email@gmail.com ]

[ GITHUB ↗ ]  [ LINKEDIN ↗ ]  [ INSTAGRAM ↗ ]

─────────────────────────────────────────────

>> YOUR_NAME / github                       ← GitHub card
   Full Stack Web Developer. Karachi, PK
   [ VIEW PROFILE → ]
```

### `components/sections/ContactSection.tsx` — Spec

```typescript
/**
 * ContactSection
 *
 * Top half — CTA:
 *   Section label + huge heading "REACH OUT TO ME!"
 *   Subtitle: data/hero.ts or hardcoded uppercase
 *   Email as bordered pill:
 *     border border-terminal-signal px-4 py-2 font-mono text-sm
 *     text-terminal-signal hover:bg-terminal-signal hover:text-terminal-bg
 *   Social link buttons row
 *
 * Bottom half — GitHub Card:
 *   Fetch from: https://api.github.com/users/your-github-username
 *   On static export: fetch at build time in page.tsx using
 *     generateStaticParams or top-level async in page (Next.js RSC)
 *
 *   GitHub card layout:
 *     border border-terminal-border bg-terminal-surface p-6
 *     flex items-center gap-6
 *
 *     Avatar: 64×64 rounded-none border border-terminal-border
 *     Info:
 *       Username: font-mono font-bold text-terminal-text
 *       Bio: text-sm text-terminal-soft
 *       Location: text-xs text-terminal-dim flex items-center gap-1
 *         <MapPin size={12} /> location string
 *
 *     CTA: "[ VIEW PROFILE → ]" button → github URL
 *
 * Note on static export + GitHub API:
 *   In app/page.tsx (Server Component), fetch GitHub data:
 *     const res = await fetch("https://api.github.com/users/your-github-username",
 *       { next: { revalidate: 3600 } });
 *     const github = await res.json();
 *   Pass as prop to <ContactSection github={github} />
 *   This runs at build time for static export.
 */
```

---

## 17. Shared Primitive Components

### `SectionLabel.tsx`

```typescript
/**
 * Renders the eyebrow label above section headings
 * Example output: "// SECTION_01"
 *
 * Props: num (e.g. "01"), label (e.g. "HERO")
 *
 * Classes:
 *   flex items-center gap-3
 *   font-mono text-xs text-terminal-signal
 *   tracking-[0.25em] mb-4
 *
 * Left element: "// " text-terminal-dim
 * Right element: "SECTION_{num}" text-terminal-signal
 */
```

### `SectionTitle.tsx`

```typescript
/**
 * Big section heading in Space Mono
 * Props: children, className
 *
 * Default classes:
 *   font-mono font-bold leading-[0.9]
 *   text-[clamp(40px,7vw,96px)]
 *   text-terminal-text
 *   mb-12
 */
```

### `TerminalLine.tsx`

```typescript
/**
 * Animated terminal-style text that types itself in
 * using Framer Motion (character by character reveal)
 *
 * Props: text, className, delay
 *
 * Renders each character as a <span> with staggered
 * Framer Motion animate from opacity 0 → 1
 * staggerChildren: 0.03s
 *
 * Optional cursor at end: .cursor class
 */
```

### `GlitchText.tsx`

```typescript
/**
 * Wraps children with CSS glitch effect on hover
 * Uses data-text attribute + ::before/::after from globals.css
 *
 * Props: children (string), as ("h1"|"h2"|"span"|"p")
 *
 * Renders:
 *   <Tag className="glitch" data-text={children}>
 *     {children}
 *   </Tag>
 */
```

### `ScanlineOverlay.tsx`

```typescript
/**
 * Fixed overlay for CRT scanline aesthetic
 * Renders as:
 *   position: fixed, inset: 0, z-index: 1
 *   pointer-events: none
 *   background: repeating-linear-gradient(
 *     transparent 0px, transparent 1px,
 *     rgba(0,0,0,0.08) 1px, rgba(0,0,0,0.08) 2px
 *   )
 *
 * Intensity: very subtle — just enough to feel like a monitor
 * Toggle off on mobile (hidden md:block) to avoid performance hit
 */
```

### `SocialLink.tsx`

```typescript
/**
 * Reusable social icon link
 * Props: href, icon (lucide component), label, showLabel?
 *
 * Classes (icon only):
 *   w-9 h-9 flex items-center justify-center
 *   border border-terminal-border
 *   text-terminal-dim hover:text-terminal-signal
 *   hover:border-terminal-signal
 *   transition-colors duration-200
 *
 * Classes (with label):
 *   flex items-center gap-2 px-4 py-2
 *   border border-terminal-border font-mono text-xs
 *   text-terminal-dim hover:text-terminal-signal
 *   hover:border-terminal-signal
 *   transition-colors duration-200
 */
```

---

## 18. Animation Conventions

All animations follow three rules:
1. **Once only** — `useInView({ once: true })` — no re-trigger on scroll back
2. **Consistent easing** — `cubic-bezier(0.22, 1, 0.36, 1)` everywhere
3. **Stagger children** — never animate all items simultaneously

### Scroll Reveal Pattern (standard, use in all sections)

```typescript
// In any section component:
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-80px" });

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

<motion.div ref={ref} variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
  {items.map((item, i) => (
    <motion.div key={i} variants={item}>...</motion.div>
  ))}
</motion.div>
```

### Counter Animation Pattern (hero stats)

```typescript
// useCountUp hook
import { useEffect, useState } from "react";
import { useInView } from "framer-motion";

export function useCountUp(target: number, duration = 1400) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const update = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * ease));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [isInView, target, duration]);

  return { ref, count };
}
```

### Progress Bar Animation Pattern

```typescript
// In ProficiencySection:
const ref = useRef(null);
const isInView = useInView(ref, { once: true });

// In JSX:
<div
  className="progress-brutalist"
  style={{ width: isInView ? `${percentage}%` : "0%" }}
/>
// The CSS transition on .progress-brutalist > div handles the animation
```

### Marquee Pattern (skills strip)

```typescript
// Wrap items twice for seamless loop
<div className="overflow-hidden border-y border-terminal-border py-3 bg-terminal-bg">
  <motion.div
    className="flex gap-0 whitespace-nowrap"
    animate={{ x: ["0%", "-50%"] }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    {[...skills, ...skills].map((skill, i) => (
      <span key={i} className="font-mono text-xs text-terminal-dim px-8 flex items-center gap-3">
        <span className="text-terminal-signal">▸</span>
        {skill}
      </span>
    ))}
  </motion.div>
</div>
```

---

## 19. Static Export & Deployment

### `next.config.ts` for Static Export

```typescript
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};
```

### Build Command

```bash
npm run build
# Outputs to /out directory
```

### Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Vercel auto-detects Next.js. For static export, it serves from the `/out` directory. No configuration needed.

### GitHub Pages (Alternative)

```bash
# In package.json, add:
"export": "next build && touch out/.nojekyll"

# Deploy /out to gh-pages branch using gh-pages package:
npm install --save-dev gh-pages
"deploy": "gh-pages -d out"

npm run export && npm run deploy
```

### GitHub API for Static Build

In `app/page.tsx` (Server Component — runs at build time):

```typescript
export default async function Home() {
  let githubData = null;

  try {
    const res = await fetch("https://api.github.com/users/your-github-username", {
      headers: { "Accept": "application/vnd.github.v3+json" },
    });
    if (res.ok) githubData = await res.json();
  } catch {
    // Fallback to hardcoded data if fetch fails at build
    githubData = {
      avatar_url: "https://avatars.githubusercontent.com/u/59178380?v=4",
      bio: "Full Stack Web Developer | Python · Django · React · Next.js",
      location: "Karachi, PK",
    };
  }

  return (
    <PageShell>
      <NavBar />
      <HeroSection />
      {/* ... other sections */}
      <ContactSection github={githubData} />
    </PageShell>
  );
}
```

---

## 20. Content Data Layer

All content is centralized in `/data/`. Components import and render from these files. Changing text means editing only the data files — never the components.

### `data/social.ts`

```typescript
export const socialLinks = {
  email:     "mailto:your@email.com",
  linkedin:  "https://www.linkedin.com/in/your-username/",
  github:    "https://github.com/your-username",
  instagram: "https://www.instagram.com/your-handle",
};
```

### `data/hero.ts`

```typescript
export const hero = {
  greeting:    "HI ALL,",
  name:        "YOUR NAME",
  title:       "Full Stack Web Developer",
  description: `I'm a passionate Full Stack web developer with experience developing
Full Stack web applications with Python, Django, React.js, and Cloud Technologies.
I am strongly interested in learning new technologies and implementing them in my projects.
I'm a self-motivated and hardworking individual who is always ready to learn new things
and work in a team.`,
  resumeLink:  "#",
  stats: [
    { value: 18,  suffix: "+", label: "Happy Clients"  },
    { value: 9,   suffix: "+", label: "Projects Done"  },
    { value: 100, suffix: "%", label: "Satisfaction"   },
  ],
};
```

### `data/skills.ts`

```typescript
export const skillGroups = [
  {
    title: "Full Stack Development",
    capabilities: [
      "Building responsive Single-Page-Apps (SPA) & PWA in React.js",
      "Building responsive static websites using Next.js",
      "Building RESTful APIs in Django & Django REST Framework",
    ],
    softwareSkills: [
      { skillName: "Python",     iconifyTag: "logos:python"                    },
      { skillName: "Django",     iconifyTag: "vscode-icons:file-type-django"   },
      { skillName: "JavaScript", iconifyTag: "logos:javascript"                },
      { skillName: "React.js",   iconifyTag: "vscode-icons:file-type-reactjs"  },
      { skillName: "Next.js",    iconifyTag: "vscode-icons:file-type-light-next"},
      { skillName: "AWS",        iconifyTag: "logos:aws"                        },
      { skillName: "Heroku",     iconifyTag: "logos:heroku-icon"                },
      { skillName: "GitHub",     iconifyTag: "akar-icons:github-fill"           },
      { skillName: "Docker",     iconifyTag: "logos:docker-icon"                },
    ],
  },
];
```

### `data/proficiency.ts`

```typescript
export const proficiency = [
  { label: "Frontend / Design", percentage: 85 },
  { label: "Backend",           percentage: 90 },
  { label: "Programming",       percentage: 95 },
];
```

### `data/education.ts`

```typescript
export const education = [
  {
    schoolName:  "University of Central Punjab",
    subHeader:   "Bachelor of Science in Computer Science",
    duration:    "September 2017 — April 2020",
    grade:       "Grade A",
    desc:        "",
    descBullets: [],
  },
];
```

### `data/projects.ts`

```typescript
export const projects = [
  {
    name:   "developer-portfolio",
    desc:   "Software Developer Portfolio Template built with React.js and Next.js bootstrap that helps you showcase your work and skills as a software developer.",
    github: "https://github.com/your-username/portfolio-template",
    link:   "https://your-portfolio.vercel.app/",
  },
  {
    name:   "Giebo",
    desc:   "A Podcast Platform where creators can easily publish and sell their podcasts, and users can purchase with Handcash BitcoinSV, the future of fast and secure transactions.",
    link:   "https://gibeo.io/",
  },
  {
    name:   "O Mejor Oferta",
    desc:   "O Mejor Oferta is a mobile marketplace for buying and selling items nearby, helping users find deals on things they want and make money from items they no longer need.",
    link:   "https://play.google.com/store/apps/details?id=com.duseca.mejor_oferta",
  },
  {
    name:   "Hooligan Culture",
    desc:   "An Ecommerce Platform where shopping meets the future! With HandCash BitcoinSV integration, you can authenticate and purchase products with ease and confidence.",
    link:   "https://hooliganculture.com/",
  },
];
```

### `data/testimonials.ts`

```typescript
export const testimonials = [
  {
    name:     "Syed Jamal",
    role:     "Frontend Developer at Meganos Software",
    feedback: "You were a wonderful addition to our team, alhumdulillah. I'm quite impressed with your abilities and professional practices. You approach problems from a unique perspective and always ask the right question. Finding a good teammate like you is extremely difficult.",
  },
  {
    name:     "Wajahat Malek",
    role:     "CEO at Duseca Software",
    feedback: "You have a deep understanding of web development technologies and are adept at using them to build scalable, robust, and secure web applications. You have worked on various projects, ranging from small-scale to large-scale, and have shown the ability to work collaboratively with others while maintaining a high level of productivity and quality.",
  },
  {
    name:     "Zaid Zaffar",
    role:     "CEO at ZR Technologies",
    feedback: "Very skilled at what he does and has an in depth knowledge of Django and he's always ready to handle any challenges thrown at him. He's been a valuable member of my team and I look forward to working with him in the years to come.",
  },
];
```

---

## Quick Reference — Install Checklist

```bash
# 1. Create project
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --no-src-dir

# 2. Install libraries
npm install shadcn-ui brutalist-ui react-bits framer-motion
npm install lucide-react @iconify/react
npm install clsx tailwind-merge tailwindcss-animate

# 3. Init shadcn
npx shadcn@latest init
npx shadcn@latest add button badge card accordion progress separator tooltip

# 4. Configure
# → Copy tailwind.config.ts from Section 3.5
# → Copy globals.css from Section 3.6
# → Copy next.config.ts from Section 3.4

# 5. Create folder structure
# → /data, /components/layout, /components/sections,
#    /components/cards, /components/primitives

# 6. Populate data files
# → Copy all data from Section 20

# 7. Build
npm run dev    # development
npm run build  # static export → /out
```

---

*Generated for: Adeer Khan · Brutalist Dark Design System · Next.js Static · Tailwind CSS v4*