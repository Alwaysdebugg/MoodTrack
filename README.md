# MoodTrack

A React-based mood tracking and social sharing application that helps users record, analyze, and share emotional states. 

**Try it out** 
[MoodTrack](https://mood-track-eight.vercel.app/)

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

## 📞 Contact

For questions or suggestions, please contact us through GitHub Issues.
