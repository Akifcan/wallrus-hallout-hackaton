# DocScout Landing Page - Design System

## 🎨 Design Philosophy: "Research Lab Chronicle"

**Concept:** Monochrome Newspaper × Academic Journal × WebGL Dither Magic

The DocScout landing page combines the authoritative aesthetic of vintage newspapers with the precision of academic journals, enhanced by cutting-edge WebGL shader effects. Every element tells a story of research, discovery, and technological innovation.

---

## 📐 Visual Direction

### Core Aesthetic Pillars

1. **Newspaper Heritage**
   - Bold serif headlines (Playfair Display)
   - Column-based layouts
   - Border treatments and rule lines
   - Halftone dither effects
   - Drop cap typography
   - Infographic-style data visualization

2. **Academic Rigor**
   - Monospace fonts for data (IBM Plex Mono)
   - Structured grid systems
   - Citation-style references
   - Clean, readable typography
   - Professional color restraint

3. **WebGL Innovation**
   - Custom dither shaders (Bayer matrix 8×8)
   - 3D newspaper planes with wave distortion
   - Particle systems for floating citations
   - Animated halftone patterns
   - Real-time network topology visualization

---

## 🎨 Color Palette

### Primary Colors
```css
--paper-white: #f5f5f3      /* Main background - aged paper */
--pure-white: #ffffff        /* Accents and highlights */
--ink-black: #000000         /* Primary text and borders */
--charcoal: #1a1a1a          /* Secondary text */
--shadow-gray: #333333       /* Shadows and depth */
--mid-gray: #666666          /* Tertiary elements */
--light-gray: #999999        /* Borders and dividers */
--paper-cream: #e5e5e5       /* Subtle backgrounds */
```

### Dither Quantization (8-bit steps)
```
0, 36, 73, 109, 146, 182, 219, 255
```

---

## 🔤 Typography

### Font Stack

```css
/* Headlines & Titles */
--font-serif: 'Playfair Display', Georgia, serif;

/* Body & Data */
--font-mono: 'IBM Plex Mono', 'Courier New', monospace;

/* Technical Elements */
--font-sans: 'Space Grotesk', 'Helvetica Neue', sans-serif;
```

### Type Scale

```css
--text-9xl: 8rem;      /* 128px - Hero headlines */
--text-8xl: 6rem;      /* 96px - Section titles */
--text-7xl: 4.5rem;    /* 72px - Large headlines */
--text-6xl: 3.75rem;   /* 60px - Subheadings */
--text-5xl: 3rem;      /* 48px - Card titles */
--text-4xl: 2.25rem;   /* 36px - Feature titles */
--text-3xl: 1.875rem;  /* 30px - Small titles */
--text-2xl: 1.5rem;    /* 24px - Subtitles */
--text-xl: 1.25rem;    /* 20px - Large body */
--text-lg: 1.125rem;   /* 18px - Body text */
--text-base: 1rem;     /* 16px - Base text */
--text-sm: 0.875rem;   /* 14px - Small text */
--text-xs: 0.75rem;    /* 12px - Captions */
```

---

## 📦 Component Library

### 1. ResearchHero
**Purpose:** Immersive 3D newspaper introduction

**Key Features:**
- WebGL canvas with floating newspaper plane
- Bayer dithering shader (8×8 matrix)
- Paper wave distortion effect
- Floating citation particles
- Newspaper-style masthead
- Grid background (graph paper aesthetic)

**Technical Implementation:**
```typescript
- Three.js Canvas
- Custom vertex/fragment shaders
- Orbital controls with auto-rotate
- Responsive camera positioning
- Particle system (50 floating citations)
```

---

### 2. FeaturesGrid
**Purpose:** Six-card grid showcasing platform capabilities

**Design Pattern:**
- 3-column responsive grid
- Bold black borders (4px)
- Drop-shadow on hover (8px offset)
- Numbered drop caps (serif, large)
- Stats displayed in 2-column sub-grid
- Dithered hover overlay

**Card Structure:**
```
┌────────────────────────┐
│ [01]                   │ ← Drop cap number
│ ─────                  │
│ Feature Title          │ ← Serif bold
│ ─                      │ ← Divider
│ Description text...    │ ← Mono regular
│                        │
│ [Stat 1]  [Stat 2]    │ ← Stats grid
└────────────────────────┘
```

---

### 3. GoogleDorkSection
**Purpose:** Visualize advanced search capabilities

**Layout:**
- Two-column split (content | 3D viz)
- Animated query typewriter effect
- Live shader rendering
- Stat cards overlay

**3D Element:**
- Custom fragment shader
- Matrix-style character rain
- Reveal progress animation
- Paper texture background

---

### 4. WalrusSection
**Purpose:** Blockchain storage explanation

**Visualization:**
- Voronoi diagram shader (network nodes)
- Animated cell patterns
- 30 orbital 3D spheres
- Dithered connection lines

**Content Structure:**
- 4-stat grid (nodes, uptime, retention, capacity)
- 4-benefit cards (2×2 grid)
- Step-by-step process (4 steps)

---

### 5. CallToAction
**Purpose:** Conversion-focused finale

**Design:**
- Full-width black background
- White text inversion
- Dithered white pattern overlay
- Dual CTA buttons (primary + secondary)
- Trust indicators (university logos)
- 3-stat confidence bar

---

### 6. ResearchHeader
**Purpose:** Fixed navigation

**Features:**
- Logo + wordmark
- Horizontal nav menu
- CTA button
- Scroll-triggered background
- Bottom progress bar on scroll

---

### 7. ResearchFooter
**Purpose:** Site links and newsletter

**Sections:**
- 6-column grid (2 brand + 4 link columns)
- Newsletter signup form
- Social media links (squared icons)
- System status indicator
- Decorative bottom strip

---

## 🎭 Shader Effects

### Newspaper Dither Shader

**Vertex Shader:**
- Simplex noise displacement
- Paper wave animation
- Normal transformation

**Fragment Shader:**
- Bayer matrix 8×8 ordered dithering
- Halftone dot patterns
- Paper grain texture
- Ink density control
- Edge darkening (bleed effect)

**Uniforms:**
```glsl
uniform float uTime;
uniform float uDitherScale;
uniform float uHalftoneScale;
uniform float uInkDensity;
```

---

### Citation Particle Shader

**Vertex Shader:**
- Size based on distance
- Pulsing animation
- Rotation attribute

**Fragment Shader:**
- Square shape (text-like)
- Dithered edges
- Alpha compositing

---

### Walrus Network Shader

**Fragment Shader:**
- Voronoi cellular pattern
- Animated node centers
- Connection line rendering
- Dithered network visualization

---

## 🎬 Animation Principles

### Motion Language

1. **Entrance Animations**
   - Fade + slide up (30-50px)
   - Staggered delays (100ms increments)
   - Ease-out timing (0.6s duration)

2. **Hover States**
   - Shadow offset (8px × 8px)
   - Scale transform (1.0 → 1.05)
   - Color transitions (300ms)

3. **Scroll Triggers**
   - Intersection Observer API
   - `once: true` (no repeat)
   - `-100px` margin (early trigger)

4. **3D Animations**
   - Slow rotation (0.1-0.3 rad/s)
   - Gentle float (sine wave)
   - Orbital particle movement

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
--mobile: 0px;        /* Base styles */
--tablet: 768px;      /* md: 2-column grids */
--desktop: 1024px;    /* lg: 3-column grids */
--wide: 1280px;       /* xl: Max content width */
```

### Responsive Patterns

**Hero Section:**
- Mobile: 1 column, smaller text (5xl)
- Tablet: 1 column, medium text (7xl)
- Desktop: 1 column, large text (9xl)

**Features Grid:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

**Google Dork Section:**
- Mobile: 1 column (stacked)
- Desktop: 2 columns (side-by-side)

---

## 🎯 Interactive Elements

### Button Styles

**Primary CTA:**
```css
.btn-primary {
  background: black;
  color: white;
  border: 4px solid black;
  padding: 1rem 2rem;
  font: mono uppercase;
  transition: all 300ms;
}

.btn-primary:hover {
  background: white;
  color: black;
  box-shadow: 8px 8px 0 black;
}
```

**Secondary CTA:**
```css
.btn-secondary {
  background: transparent;
  border: 4px solid black;
  color: black;
}

.btn-secondary:hover {
  background: black;
  color: white;
}
```

---

## 🖼️ Border Treatments

### Newspaper Borders

```css
/* Heavy outer frame */
border: 4px solid black;

/* Dividing lines */
border-top: 2px solid black;

/* Accent underlines */
border-bottom: 1px solid black;

/* Hover shadow */
box-shadow: 8px 8px 0px rgba(0,0,0,1);
```

---

## 📊 Data Visualization

### Stats Display Pattern

```html
<div class="stat-card">
  <div class="stat-value">98.7%</div>
  <div class="stat-divider"></div>
  <div class="stat-label">Precision</div>
</div>
```

**Styling:**
- Value: Serif bold, 3xl-4xl
- Divider: 12px black bar
- Label: Mono uppercase, xs

---

## 🎨 Background Patterns

### Dither Pattern (SVG Data URI)

**4×4 Checkerboard:**
```svg
<svg width='4' height='4'>
  <path d='M0 0h1v1H0zm2 2h1v1H2z' fill='#000'/>
</svg>
```

**8×8 Halftone:**
```svg
<svg width='8' height='8'>
  <path d='M0 0h2v2H0zm4 4h2v2H4zm-4 4h2v2H0zm4-4h2v2H4z' fill='#000'/>
</svg>
```

---

## ⚡ Performance Optimizations

### WebGL Best Practices

1. **Shader Complexity**
   - Keep fragment shader calculations minimal
   - Use uniforms for animated values
   - Avoid texture lookups in vertex shaders

2. **Geometry Optimization**
   - Max 128×128 subdivisions for planes
   - Use instancing for particles
   - LOD for distant objects

3. **Render Efficiency**
   - Single canvas per section
   - Pause animations off-screen
   - Use `will-change` sparingly

---

## 🌐 Browser Support

**Target:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari 14+

**WebGL Fallbacks:**
- Static dithered images
- CSS patterns
- Simplified animations

---

## 📚 Design Inspiration

**References:**
- 1960s newspaper layouts (NYT, Washington Post)
- Academic journals (Nature, Science, IEEE)
- Retro computer graphics (1-bit dithering)
- Brutalist web design
- Swiss typography (grid systems)

---

## 🔧 Development Stack

**Technologies:**
- Next.js 16
- React 19
- Three.js + React Three Fiber
- Framer Motion
- Tailwind CSS 4
- GSAP (if needed for complex timelines)

**Custom Code:**
- 6 GLSL shaders (vertex + fragment pairs)
- 7 main React components
- Responsive grid system
- Performance-optimized 3D scenes

---

## 📝 Usage Instructions

### Running the Design

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Visit research page:**
```
http://localhost:3000/research
```

### Component Import Pattern

```typescript
import ResearchHero from "@/components/research/ResearchHero";
import FeaturesGrid from "@/components/research/FeaturesGrid";
import GoogleDorkSection from "@/components/research/GoogleDorkSection";
import WalrusSection from "@/components/research/WalrusSection";
import CallToAction from "@/components/research/CallToAction";
```

---

## 🎯 Design Goals Achieved

✅ **Monochrome newspaper aesthetic**
- Black/white color scheme
- Serif typography
- Bold borders and rules
- Column layouts

✅ **Academic research paper styling**
- Professional typography
- Structured data presentation
- Citation-style elements
- Grid-based organization

✅ **WebGL dither effects**
- Bayer matrix ordered dithering
- Halftone patterns
- Custom shader materials
- Animated 3D elements

✅ **Unique DocScout identity**
- Combines all three aesthetics seamlessly
- Innovative 3D newspaper visualization
- AI research technology focus
- Walrus blockchain integration

---

## 🚀 Next Steps (Optional Enhancements)

1. **Advanced Interactions**
   - Parallax scrolling effects
   - Mouse-following 3D rotation
   - Interactive shader controls

2. **Additional Sections**
   - Pricing table (newspaper ad style)
   - Testimonials (quoted citations)
   - Case studies (research papers)

3. **Animation Polish**
   - GSAP timeline sequences
   - Scroll-triggered reveal animations
   - Magnetic cursor effects

4. **Accessibility**
   - Prefers-reduced-motion support
   - Keyboard navigation
   - Screen reader optimization

---

**Design System Version:** 1.0.0
**Last Updated:** 2025
**Designer:** Claude (Anthropic)
**Project:** DocScout Research Platform
