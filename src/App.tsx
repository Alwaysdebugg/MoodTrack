import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import TrackMoodPage from './pages/TrackMoodPage';
import HistoryPage from './pages/HistoryPage';
import SocialPage from './pages/SocialPage';
import MoodMatchPage from './pages/MoodMatchPage';
import CommunityPage from './pages/CommunityPage';
import SocialInsightsPage from './pages/SocialInsightsPage';
import Layout from './components/Layout';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/track"
            element={
              <Layout>
                <TrackMoodPage />
              </Layout>
            }
          />
          <Route
            path="/history"
            element={
              <Layout>
                <HistoryPage />
              </Layout>
            }
          />
          <Route
            path="/social"
            element={
              <Layout>
                <SocialPage />
              </Layout>
            }
          />
          <Route
            path="/social/match"
            element={
              <Layout>
                <MoodMatchPage />
              </Layout>
            }
          />
          <Route
            path="/social/community"
            element={
              <Layout>
                <CommunityPage />
              </Layout>
            }
          />
          <Route
            path="/social/insights"
            element={
              <Layout>
                <SocialInsightsPage />
              </Layout>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
