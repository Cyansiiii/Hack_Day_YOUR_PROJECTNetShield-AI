# NetShield AI 

NetShield AI is a cinematic cybersecurity landing page and dashboard-style frontend built for a real-time network monitoring and intrusion detection product.

This repository currently contains the frontend only.

## Overview

The current implementation was built from scratch in this repository based on:

- The NetShield AI product requirements brief
- The provided landing page reference
- The provided cybersecurity dashboard reference
- The requested stack: HTML, CSS, JavaScript, React, Three.js, GSAP, and Framer Motion

The goal of this frontend is to present NetShield AI as a premium cyber-defense product with a dark, high-contrast visual system, layered glows, glassmorphism panels, animated sections, and a dashboard preview inspired by the design references.

## Current Status

Implemented:

- Full Vite + React frontend scaffold
- Premium landing page with multiple sections
- Responsive layout for desktop, tablet, and mobile
- Three.js animated hero background
- GSAP entrance and scroll-based motion
- Framer Motion hover and reveal interactions
- Dashboard-inspired monitoring section
- Build-ready production output with Vite

Not yet implemented:

- Backend integration
- Live WebSocket data
- Real packet capture or intrusion detection engine
- CMS/admin editing
- Real charts sourced from APIs

## Tech Stack

- React
- Vite
- Three.js
- GSAP
- Framer Motion
- Plain CSS

## Main Sections

The current page includes:

1. Hero section
   - Large editorial headline
   - Premium navigation bar
   - CTA buttons
   - Metric badges
   - Three.js constellation/globe scene

2. Services section
   - Eight feature cards
   - Security-focused iconography
   - Hover animations

3. How it works section
   - Multi-step process narrative
   - Layered device mockup visual

4. Shared confidence / orbit section
   - Central glow composition
   - Floating trust/use-case chips

5. Cyber defense approach section
   - Pillar-style cards inspired by the reference composition

6. Monitoring dashboard preview
   - KPI cards
   - Incident timeline
   - Vulnerability line chart mock
   - Threat severity bars and tiles

7. Threat report and FAQ content
   - Executive-style reporting blocks
   - Compact knowledge modules

8. Final CTA section
   - Closing message
   - Demo/contact actions

## Folder Structure

```text
NetShield-AI/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    └── components/
        └── HeroConstellation.jsx
```

## File Guide

### `src/App.jsx`

Contains:

- Page content structure
- Section data arrays
- GSAP setup
- Framer Motion wrappers
- Dashboard and landing page composition

### `src/styles.css`

Contains:

- Global variables
- Color system
- Layout rules
- Section styling
- Responsive breakpoints
- Dashboard visuals
- Glassmorphism and glow treatments

### `src/components/HeroConstellation.jsx`

Contains:

- Three.js scene setup
- Renderer, camera, and scene logic
- Wireframe globe / network feel
- Particle field
- Pointer-based motion response

## Design Direction

The design language is based on:

- Near-black backgrounds
- Soft neon green, cyan, and warm highlight accents
- Large serif display headings
- Clean sans-serif body typography
- Frosted panels with subtle borders
- Orbital and grid-based cyber motifs
- Minimal but intentional motion

Primary accent colors used:

- `#07A5E9`
- `#07E96D`
- `#E8957C`
- `#FFFFFF`
- `#DFFF5E`

## Running the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

If you want to bind to a specific local host/port:

```bash
npm run dev -- --host 127.0.0.1 --port 4173
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Scripts

Defined in `package.json`:

- `npm run dev` — start the Vite development server
- `npm run build` — create a production build
- `npm run preview` — preview the built app locally

## Local Review URL

When started with:

```bash
npm run dev -- --host 127.0.0.1 --port 4173
```

the app is available at:

```text
http://127.0.0.1:4173/
```

## Build Verification

The frontend has been verified with:

```bash
npm run build
```

Current note:

- The build passes successfully.
- Vite reports a large chunk warning because Three.js, GSAP, and Framer Motion are bundled together in the main client build.

## Next Recommended Improvements

- Split large JS bundles with dynamic imports
- Add real product assets and logos
- Replace mock charts with live data visualization
- Connect the frontend to the NetShield AI backend
- Add dashboard routes and state management
- Introduce reusable UI components for scale
- Add accessibility polish and keyboard interaction review
- Add SEO and social metadata
- Add deployment configuration

## Notes

- This repository was initially empty, so the current implementation is the first frontend scaffold and landing page pass.
- The current code focuses on presentation and interaction quality first.
- The page is intentionally frontend-only at this stage.

## License

No license has been added yet.
