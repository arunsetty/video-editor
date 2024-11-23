# Video Editor

Built for Trupeer's assesment

## Resources

- [Problem statement](./docs/statement.md)
- [Decisions](./docs/decisions.md)

## Features

- Video upload and playback
- Timeline-based zoom effect editing
- Real-time video preview with zoom effects
- Control over zoom parameters (scale, position, timing)

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Package Manager:**: pnpm
- **State Management:** MobX
- **Styling:** Tailwind CSS
- **Video Playback:** React Player
- **Linting** - ESLint
- **Hosting** - Cloudflare

## Setup

1. Clone the repository:

```bash
git clone https://github.com/arunsetty/video-editor
cd video-editor
```

2. Install dependencies:

```bash
pnpm install
```

3. Populate the env variables

```bash
echo "VITE_MODE=development
VITE_DEFAULT_BLOCK_SCALE=1.5
VITE_SCALE_MIN=1
VITE_SCALE_MAX=3
VITE_SCALE_STEP=0.1
VITE_MIN_BLOCK_WIDTH_PERCENT=2" > .env
```

4. Start the development server:

```bash
pnpm run dev
```

4. To run on a local network:

```bash
pnpm run host
```

## Build

To create a production build:

```bash
pnpm run build
```

## Project Structure

- `/src`
  - `/api` - Any Fetch Requests
  - `/assets` - Static assets
  - `/components` - Reusable UI components
  - `/modals` - Modals (Dialogs/Popups)
  - `/pages` - Page components
  - `/store` - MobX store for state management
  - `/types` - TypeScript type definitions
  - `/utils` - Utility functions

## Available Scripts

- `dev` - Start development server
- `host` - Start development server with network access
- `build` - Create production build
- `lint` - Run ESLint
- `preview` - Preview production build

## Author & License

This template is made by Arun Setty Kodavali. It is hereby declared that anyone can use this free of cost and distribute the same.

Cheers!