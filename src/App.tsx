import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TrackMoodPage from './pages/TrackMoodPage'
import HistoryPage from './pages/HistoryPage'
import SocialPage from './pages/SocialPage'
import MoodMatchPage from './pages/MoodMatchPage'
import CommunityPage from './pages/CommunityPage'
import SocialInsightsPage from './pages/SocialInsightsPage'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/track" element={<TrackMoodPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/social/match" element={<MoodMatchPage />} />
          <Route path="/social/community" element={<CommunityPage />} />
          <Route path="/social/insights" element={<SocialInsightsPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App