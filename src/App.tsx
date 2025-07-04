import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TrackMoodPage from './pages/TrackMoodPage'
import HistoryPage from './pages/HistoryPage'
import SocialPage from './pages/SocialPage'
import MoodMatchPage from './pages/MoodMatchPage'
import CommunityPage from './pages/CommunityPage'
import SocialInsightsPage from './pages/SocialInsightsPage'
import LoginPage from './pages/LoginPage'
import LoginCallback from './components/LoginCallback'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login-callback" element={<LoginCallback />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={
            <ProtectedRoute>
              <Layout>
                <HomePage />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/track" element={
            <ProtectedRoute>
              <Layout>
                <TrackMoodPage />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute>
              <Layout>
                <HistoryPage />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/social" element={
            <ProtectedRoute>
              <Layout>
                <SocialPage />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/social/match" element={
            <ProtectedRoute>
              <Layout>
                <MoodMatchPage />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/social/community" element={
            <ProtectedRoute>
              <Layout>
                <CommunityPage />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/social/insights" element={
            <ProtectedRoute>
              <Layout>
                <SocialInsightsPage />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App