# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite, port 5173, auto-opens browser)
npm run build     # TypeScript compile + Vite production build
npm run preview   # Preview production build locally
npm run lint      # ESLint check
npm run lint:fix  # ESLint auto-fix
npm run format    # Prettier formatting
```

No test framework is configured.

## Architecture

MoodTrack is a React 18 + TypeScript SPA for mood tracking with anonymous social sharing. The backend is a separate repository; this repo is frontend-only.

### Tech Stack
- **Build**: Vite 5, TypeScript (strict mode), path alias `@/*` → `./src/*`
- **UI**: Tailwind CSS 4, shadcn/ui (new-york style, Radix primitives), Lucide icons
- **Charts**: ECharts 6
- **Auth**: Google OAuth (via Google Identity Services), JWT tokens in localStorage
- **HTTP**: Axios with interceptors for auth headers and 401 handling
- **Theming**: next-themes for dark mode, Wealthsimple-inspired green palette, DM Sans font

### Key Patterns

**State management**: React Context API only — `AuthContext` provides global auth state via `useAuth()` hook. No Redux/Zustand. Page-level state uses React hooks.

**API layer** (`src/utils/api.ts`): Centralized Axios instance with request interceptor (injects Bearer token) and response interceptor (dispatches `AUTH_ERROR_EVENT` on 401). Three API modules: `authAPI`, `moodAPI`, `communityAPI`.

**Data persistence**: Hybrid — mood entries use both localStorage (`src/utils/moodStorage.ts`) and backend API. Social/community features use mock data (`src/data/`) with API integration in progress.

**Routing** (`src/App.tsx`): React Router v6. `/` redirects to `/home`. Social routes nested under `/social/*`. All routes wrapped in `Layout` component (sticky navbar + responsive menu).

**Component library**: `src/components/ui/` contains shadcn/ui components managed via `components.json` config. Add new ones with the shadcn CLI, don't hand-write them.

### API Proxy
Vite proxies `/api` requests to `http://localhost:3000` in development. Production uses Vercel rewrites (`vercel.json`).

### Environment Variables
- `VITE_GOOGLE_CLIENT_ID` — Google OAuth client ID
- `VITE_API_BASE_URL` — Backend API URL (default: `http://127.0.0.1:3000`)
