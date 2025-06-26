# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev          # Start development server (Vite on port 3000)
npm run build        # Build for production  
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint with TypeScript rules
npm run lint:fix     # Auto-fix ESLint issues
```

## Project Architecture

### Tech Stack
- **React 18** with **TypeScript** and **Vite** build system
- **React Router DOM** for client-side routing
- **Tailwind CSS** with custom component classes
- **Lucide React** for icons
- **localStorage** for data persistence (no backend)

### Core Structure
```
src/
├── components/     # Reusable UI components (AnonymousAvatar, MoodBadge, etc.)
├── pages/         # Route components (7 main pages)
├── types/         # TypeScript definitions
├── utils/         # Helper functions
└── App.tsx        # Router setup with Layout wrapper
```

### Key Features
1. **Mood Tracking**: 5-point scale with notes, stored in localStorage
2. **Anonymous Social System**: Users have generated identities with similarity matching
3. **Social Interactions**: 5 types (Empathy, Support, Helpful, Grateful, Encourage)
4. **Community Features**: Mood matching, community posts, social insights

### State Management
- **Local state**: React hooks (useState, useEffect)
- **Storage**: localStorage for mood entries
- **Mock data**: Simulated social features with setTimeout delays
- **No global state**: Uses prop drilling (consider Context/Zustand for complex features)

### Social Architecture
The social features use an anonymous identity system where users are assigned:
- Random avatars and usernames
- Similarity scores for mood matching
- Geographic proximity simulation
- Privacy-first content processing

### TypeScript Configuration
- Path alias: `@/*` → `./src/*` 
- Strict mode enabled
- ES2020 target with React JSX

### Styling Approach
- Tailwind CSS with custom `@layer components` classes
- Responsive mobile-first design
- Accessibility features (reduced motion, high contrast)
- Social-specific styling patterns for interactions

### Development Notes
- Uses mock data generation for social features
- Ready for backend integration (API patterns in place)
- No test suite currently implemented
- Components follow composition patterns with TypeScript interfaces