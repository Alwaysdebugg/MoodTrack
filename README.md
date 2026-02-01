# MoodTrack

A React-based mood tracking and social sharing application that helps users record, analyze, and share emotional states.

**Try it out**
[MoodTrack](https://mood-track-git-feature-preview-alwaysdebuggs-projects.vercel.app/home)

## ✨ Features

### 🎯 Core Features

- **Mood Tracking**: 5-level mood scale with detailed notes and trigger markers
- **AI-Powered Analysis**: Personalized emotional insights based on mood data
- **Historical Trends**: Visualized mood history and trend analysis
- **Anonymous Social**: User matching based on mood similarity

### 🔐 Authentication

- **Google OAuth**: Secure sign-in with Google accounts
- **Route Protection**: Access control based on authentication status
- **Session Management**: Automatic login persistence and session handling

### 🌐 Social Features

- **Mood Matching**: Smart matching with users in similar mood states
- **Community Interaction**: 5 interaction types (Empathy, Support, Helpful, Grateful, Encourage)
- **Social Insights**: Personal social data analysis and insights

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Environment Variables

Copy the environment template and configure:

```bash
cp .env.example .env
```

Set the required variables in `.env`:

```env
VITE_API_BASE_URL=
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

### Development Commands

```bash
# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Auto-fix lint issues
npm run lint:fix
```

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Auth**: Google Identity Services
- **HTTP Client**: Axios (via apiRequest utility)
- **Backend**: Express.js + Supabase

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── AnonymousAvatar.tsx      # Anonymous avatar component
│   ├── GoogleLoginButton.tsx    # Google login button
│   ├── InteractionButtons.tsx   # Social interaction buttons
│   ├── Layout.tsx               # Layout component
│   ├── LoginCallback.tsx        # Login callback handler
│   ├── MoodBadge.tsx            # Mood badge component
│   ├── NotificationToast.tsx    # Notification toast component
│   ├── ProtectedRoute.tsx       # Route protection component
│   └── SimilarityBadge.tsx      # Similarity badge component
├── contexts/             # React Context
│   └── AuthContext.tsx          # Auth state management
├── hooks/                # Custom Hooks
├── pages/                # Page components
│   ├── HomePage.tsx             # Home page
│   ├── TrackMoodPage.tsx        # Mood tracking page
│   ├── HistoryPage.tsx          # History page
│   ├── SocialPage.tsx           # Social hub page
│   ├── MoodMatchPage.tsx        # Mood matching page
│   ├── CommunityPage.tsx        # Community page
│   ├── SocialInsightsPage.tsx   # Social insights page
│   └── Login.tsx                # Login page
├── types/                # TypeScript type definitions
│   ├── index.ts                 # Base types
│   └── social.ts                # Social feature types
├── utils/                # Utility functions
│   ├── api.ts                   # API utilities (authAPI, moodAPI, communityAPI)
│   └── socialUtils.ts           # Social helpers
└── App.tsx               # App routing
```

### Main Pages

1. **Home** (`/home`) – Mood overview and AI analysis
2. **Track Mood** (`/track`) – Record current mood
3. **History** (`/history`) – View mood history and trends
4. **Social Hub** (`/social`) – Anonymous social features
5. **Mood Match** (`/social/match`) – Find users with similar moods
6. **Community** (`/social/community`) – Community feed
7. **Social Insights** (`/social/insights`) – Personal social analytics

## 🔧 API Integration

### Backend Architecture

The project uses a separated frontend/backend setup:

- **API Proxy**: Requests proxied via Vite dev server (configure `VITE_API_BASE_URL` or Vercel rewrites for production)
- **Auth**: Bearer token authentication, read from localStorage

### API Request Utility

Uses an `apiRequest` wrapper (Axios-based) for all API calls:

- Automatic Bearer token headers
- Centralized request/response interceptors
- Shared error handling
- Dev/production environment handling
- TypeScript type safety
- 10-second request timeout

### Main API Endpoints

#### Auth API (authAPI)

```typescript
// Verify Google OAuth credential
POST /api/auth/verify-google-credential
Body: { credential: string }

// Register
POST /api/auth/register
Body: { name: string, email: string, password: string }

// Login
POST /api/auth/login
Body: { email: string, password: string }

// Verify callback token
POST /api/auth/verify-token
Body: { token: string }

// Refresh token
POST /api/auth/refresh
Body: { refreshToken: string }

// Logout
POST /api/auth/logout
```

#### Mood API (moodAPI)

```typescript
// Create mood entry
POST /api/moods
Body: {
  mood_type: 'very_bad' | 'bad' | 'neutral' | 'good' | 'excellent',
  note?: string,
  triggers?: string[],
  is_public?: boolean,
  is_anonymous?: boolean
}

// List mood entries
GET /api/moods

// Get mood entry
GET /api/moods/:id

// Delete mood entry
DELETE /api/moods/:id
```

#### Community API (communityAPI)

```typescript
// Get online users
GET /api/community/online-users

// Get community mood list
GET /api/community/moods

// Get community mood detail
GET /api/community/moods/:id

// Like community mood
POST /api/community/moods/:id/like

// Unlike
POST /api/community/moods/:id/unlike

// Reply to community mood
POST /api/community/moods/:id/reply
Body: { content: string }
```

## 🚀 Deployment

### Vercel

The project includes Vercel deployment configuration:

**vercel.json**:

Add rewrites to proxy `/api` and `/oauth2` to your backend URL. Example:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "YOUR_BACKEND_URL/api/$1"
    },
    {
      "source": "/oauth2/(.*)",
      "destination": "YOUR_BACKEND_URL/oauth2/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Environment Variables

Configure in Vercel project settings:

- `VITE_API_BASE_URL`: Backend API base URL
- `VITE_GOOGLE_CLIENT_ID`: Google OAuth client ID

### Deployment Steps

1. Connect the GitHub repo to Vercel
2. Add environment variables
3. Deploy (automatic on push)

## 🔐 Security

- **Environment variables**: Sensitive data via env vars
- **Anonymous social system**: Privacy-preserving anonymous identities
- **OAuth**: Google authentication
- **Route protection**: Unauthenticated users redirected to login
- **HTTPS**: All API traffic over HTTPS

## 🎨 Design

### Responsive Design

- **Mobile-first**: Responsive layouts
- **Dark mode**: System theme support
- **Accessibility**: A11y support
- **Animations**: Smooth transitions

### Anonymous Social System

- **Random identities**: Generated avatars and usernames
- **Smart matching**: Mood similarity-based matching
- **Privacy**: Simulated location and content privacy
- **Interactions**: 5 types of emotional support

## 🔄 State Management

- **Local state**: React Hooks (useState, useEffect)
- **Global state**: React Context (auth)
- **Persistence**: localStorage + backend API
- **Updates**: API-based data sync

## 🛠️ Development

### TypeScript

- **Path alias**: `@/*` → `./src/*`
- **Strict mode**: Enabled
- **Target**: ES2020 + React JSX

### Styling

- **Tailwind CSS**: Custom component classes
- **Responsive**: Mobile-first approach
- **Accessibility**: ARIA support
- **Social**: Styles tailored to social features

### Code Quality

- **ESLint**: TypeScript rules
- **Formatting**: ESLint auto-fix
- **Types**: Strict TypeScript checking

## 🤝 Contributing

Contributions via issues and pull requests are welcome.

### Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

[MIT License](LICENSE)

## 📞 Contact

For questions or suggestions, please open a GitHub Issue.

---

**MoodTrack** – Make every mood count ❤️
