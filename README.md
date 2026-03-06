# Drive My Portfolio — Interactive F1 Racing Experience

A modern Three.js + TypeScript portfolio where visitors drive an F1 car through a stylized race world to explore sections.

## Features

- Loading screen with progress
- Start screen with engine launch flow + guided onboarding tips
- Playable F1-style driving (accelerate, brake, steering, boost, drift)
- 3 camera modes (`C`): third-person, cockpit, top-down
- Track checkpoints mapped to portfolio content with a live guide panel:
  - Pit Lane Garage → About
  - Engineering Lab → Projects
  - Sponsor Boards → Skills
  - Race Control Tower → Contact
- Lap counter, lap timer, token collectibles, minimap, racing HUD
- Auto-open section details the first time you enter each zone
- Engine/crowd/collision audio with mute toggle
- Modular architecture (`core`, `world`, `physics`, `controls`, `ui`, `sections`)

## Tech Stack

- TypeScript + Vite
- Three.js (rendering)
- cannon-es (physics)
- howler.js (audio)

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Controls

- `W` / `↑` accelerate
- `S` / `↓` brake / reverse
- `A` / `←` turn left
- `D` / `→` turn right
- `Shift` boost
- `Space` drift
- `Enter` interact (toggle section panel)
- `C` switch camera mode
- Mouse drag / scroll support can be extended (camera system is modular)

## Deploy (GitHub Pages)

The workflow `.github/workflows/deploy-pages.yml`:

1. Installs Node dependencies
2. Builds with Vite (`npm run build`)
3. Uploads `dist/`
4. Deploys to GitHub Pages

### One-time setup on GitHub

- Settings → Pages → Source: **GitHub Actions**
- Settings → Actions → General → Workflow permissions: **Read and write permissions**

Push to `main`, `master`, or `work` to deploy.

## Project Structure

```txt
src/
 ├─ core/
 │   ├─ Application.ts
 │   ├─ Renderer.ts
 │   ├─ Camera.ts
 │   ├─ Resources.ts
 │
 ├─ world/
 │   ├─ World.ts
 │   ├─ Track.ts
 │   ├─ Car.ts
 │   ├─ Buildings.ts
 │
 ├─ physics/
 │   ├─ PhysicsEngine.ts
 │
 ├─ controls/
 │   ├─ CarControls.ts
 │
 ├─ ui/
 │   ├─ HUD.ts
 │   ├─ LoadingScreen.ts
 │   ├─ Map.ts
 │
 ├─ sections/
 │   ├─ sectionsData.ts
```
