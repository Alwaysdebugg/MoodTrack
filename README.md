# MoodTrack

A React-based mood tracking and social sharing application that helps users record, analyze, and share emotional states.

## 📱 Features

### Core Features

- **Mood Tracking**: 5-level mood scale recording with detailed notes support
- **History Records**: Visualized mood trend analysis and historical data
- **Anonymous Social**: Anonymous user social system based on similarity matching
- **Social Interactions**: 5 types of interactions (Empathy, Support, Helpful, Grateful, Encourage)
- **Community Features**: Mood matching, community posts, social insights

### Authentication System

- **Google OAuth**: Secure Google account login
- **Route Protection**: Authentication-based page access control
- **Session Management**: Automatic login state and session persistence

## 🚀 Quick Start

### Requirements

- Node.js 18+
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Environment Variables Setup

Copy the environment variables template and configure Google Client ID:

```bash
cp .env.example .env
```

Set your Google Client ID in the `.env` file:

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

### Get Google Client ID

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing project
3. Enable Google+ API
4. Create OAuth 2.0 Client ID
5. Add authorized JavaScript origins

### Development Commands

```bash
# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Code linting
npm run lint

# Auto-fix code format
npm run lint:fix
```

## 🏗️ Architecture

### Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Authentication**: Google Identity Services
- **Data Storage**: localStorage (no backend)

### Project Structure

```text
src/
├── components/        # Reusable UI components
│   ├── AnonymousAvatar.tsx
│   ├── GoogleLoginButton.tsx
│   ├── InteractionButtons.tsx
│   ├── Layout.tsx
│   ├── MoodBadge.tsx
│   ├── NotificationToast.tsx
│   ├── ProtectedRoute.tsx
│   └── SimilarityBadge.tsx
├── contexts/          # React Context
│   └── AuthContext.tsx
├── pages/             # Page components
│   ├── HomePage.tsx
│   ├── TrackMoodPage.tsx
│   ├── HistoryPage.tsx
│   ├── SocialPage.tsx
│   ├── MoodMatchPage.tsx
│   ├── CommunityPage.tsx
│   ├── SocialInsightsPage.tsx
│   └── LoginPage.tsx
├── types/             # TypeScript type definitions
│   ├── index.ts
│   └── social.ts
├── utils/             # Utility functions
│   └── socialUtils.ts
└── App.tsx            # Router configuration
```

### Core Pages

1. **Home** (`/home`) - Mood overview and quick actions
2. **Track Mood** (`/track`) - Record current mood state
3. **History** (`/history`) - View mood history trends
4. **Social Center** (`/social`) - Anonymous social features entry
5. **Mood Match** (`/social/match`) - Find users with similar moods
6. **Community** (`/social/community`) - View community posts
7. **Social Insights** (`/social/insights`) - Personal social data analysis

## 🔐 Security Features

- **Environment Variables Protection**: Sensitive information managed through environment variables
- **Anonymous Social**: Privacy-protected anonymous identity system
- **OAuth Authentication**: Google secure authentication system
- **Route Protection**: Unauthenticated users automatically redirected to login page

## 🚀 Deployment

### Vercel Deployment

Project configured for Vercel deployment with SPA routing rewrite rules.

1. Connect GitHub repository to Vercel
2. Set `VITE_GOOGLE_CLIENT_ID` in Vercel environment variables
3. Automatic deployment complete

### Environment Variables Setup

Add in Vercel project settings:

- `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID

## 📱 Design Features

### Anonymous Social System

- Randomly generated user avatars and usernames
- User matching based on mood similarity
- Geographic location simulation (privacy protection)
- Privacy-first content processing

### Responsive Design

- Mobile-first responsive layout
- Dark mode support
- Accessibility features
- Smooth animation interactions

## 🔄 State Management

- **Local State**: React Hooks (useState, useEffect)
- **Global State**: React Context (authentication state)
- **Data Persistence**: localStorage
- **Mock Data**: setTimeout delay simulating backend API

## 🛠️ Development Notes

### TypeScript Configuration

- Path alias: `@/*` → `./src/*`
- Strict mode enabled
- ES2020 target with React JSX support

### Styling Approach

- Tailwind CSS custom component classes
- Mobile-first responsive design
- Accessibility support features
- Social-specific styling patterns

### Backend Integration Ready

- API call patterns ready
- Mock data easily replaceable with real API
- Complete type definitions for easy backend integration

## 📄 License

[MIT License](LICENSE)

## 🤝 Contributing

Issues and Pull Requests are welcome to improve this project.

## 📋 To-Do & Project Progress

### Current Status: ~75% Complete

#### ✅ Completed Features

**Core Functionality (90% Complete)**
- [x] Mood tracking system with 5-point scale
- [x] Note-taking functionality for mood entries
- [x] Mood history viewing and management
- [x] localStorage data persistence

**Authentication System (95% Complete)**
- [x] Google OAuth integration
- [x] Auth context and state management
- [x] Protected routes implementation
- [x] Login/logout flow
- [x] Session persistence

**Social Features Foundation (85% Complete)**
- [x] Anonymous identity system
- [x] Social page main hub
- [x] Mood matching algorithm and UI
- [x] Social utilities and helper functions
- [x] Complete TypeScript definitions

**UI/UX & Infrastructure (85% Complete)**
- [x] All 7 main pages designed and implemented
- [x] Responsive mobile-first design
- [x] Tailwind CSS styling system
- [x] Component architecture (MoodBadge, AnonymousAvatar, etc.)
- [x] React Router DOM setup
- [x] Vercel deployment configuration

**Code Quality (80% Complete)**
- [x] TypeScript strict mode implementation
- [x] ESLint configuration
- [x] Path aliases setup
- [x] Development commands structure

#### 🟡 In Progress / Partially Complete

**Social Community Features (30% Complete)**
- [x] Community page structure
- [ ] Real community post interactions
- [ ] Advanced social insights data processing
- [ ] Real-time social features

**Advanced Analytics (20% Complete)**
- [x] Basic mood history display
- [ ] Mood trend analysis and charts
- [ ] Statistical insights and patterns
- [ ] Data visualization components

#### ❌ Pending Features

**Backend Integration (20% Complete)**
- [x] API structure and mock patterns ready
- [ ] Real backend API development
- [ ] Database integration
- [ ] Cloud data synchronization
- [ ] Real-time data updates

**Testing Infrastructure (0% Complete)**
- [ ] Unit tests setup
- [ ] Integration tests
- [ ] End-to-end testing
- [ ] Testing framework configuration (Jest/Vitest)

**Production Features (30% Complete)**
- [x] Basic error handling
- [ ] Comprehensive error boundaries
- [ ] Push notifications system
- [ ] Data export/import functionality
- [ ] Mood reminder scheduling
- [ ] Advanced privacy controls

**Performance Optimization (20% Complete)**
- [x] Basic Vite build optimization
- [ ] Code splitting and lazy loading
- [ ] Service worker implementation
- [ ] Image optimization
- [ ] Caching strategies

#### 🚀 Next Priority Tasks

1. **Backend Development**: Implement real API to replace mock data
2. **Testing Suite**: Add comprehensive test coverage
3. **Advanced Analytics**: Implement mood trend charts and insights
4. **Performance**: Add code splitting and optimization
5. **Real-time Features**: WebSocket integration for social interactions

#### 📊 Feature Completion Breakdown

| Category | Progress | Status |
|----------|----------|--------|
| Core Mood Tracking | 90% | ✅ Production Ready |
| Authentication | 95% | ✅ Production Ready |
| Social Foundation | 85% | ✅ MVP Complete |
| UI/UX Design | 85% | ✅ MVP Complete |
| Backend Integration | 20% | ❌ Development Needed |
| Testing | 0% | ❌ Critical Missing |
| Advanced Features | 30% | 🟡 Ongoing |
| Performance | 20% | 🟡 Optimization Needed |

**Overall Project Completion: 75%**

## 📞 Contact

For questions or suggestions, please contact us through GitHub Issues.