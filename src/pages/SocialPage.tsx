import { Link } from 'react-router-dom';
import {
  Heart,
  Users,
  TrendingUp,
  MessageCircle,
  Search,
  Settings,
  Shield,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { generateAnonymousUser } from '../utils/socialUtils';
import { AnonymousUser } from '../types/social';

const SocialPage = () => {
  const [currentUser, setCurrentUser] = useState<AnonymousUser | null>(null);
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    // Generate anonymous identity for current user
    const user = generateAnonymousUser();
    setCurrentUser(user);

    // Simulate online user count
    setOnlineUsers(Math.floor(Math.random() * 200) + 50);
  }, []);

  return (
    <div className="space-y-12">
      {/* Header welcome section */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-apple-text mb-6 tracking-tight">Emotional Social Space</h1>
        <p className="text-xl text-apple-secondary leading-relaxed">
          Build warm connections with people who share similar feelings in an anonymous and safe environment
        </p>
      </div>

      {/* Current anonymous identity card */}
      {currentUser && (
        <div className="card bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-indigo-50/50 border-blue-200/30 shadow-apple-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <div
                className={`w-16 h-16 rounded-2xl ${currentUser.avatar} flex items-center justify-center shadow-lg`}
              >
                <span className="text-white font-bold text-2xl">😊</span>
              </div>
              <div>
                <h3 className="font-semibold text-apple-text text-lg mb-1">Current Identity</h3>
                <p className="text-apple-text font-medium">{currentUser.nickname}</p>
                <p className="text-sm text-apple-secondary mt-1">
                  Anonymous ID: {currentUser.id.slice(-8)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-green-600 mb-3 bg-green-50 px-3 py-1.5 rounded-xl">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">Online</span>
              </div>
              <button className="text-sm text-apple-blue hover:text-blue-700 font-medium transition-colors">
                <Shield className="w-4 h-4 inline mr-1.5" strokeWidth={2.5} />
                Privacy Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Real-time statistics */}
      <div className="grid grid-cols-2 gap-6">
        <div className="card text-center bg-gradient-to-br from-orange-50/50 to-red-50/50 border-orange-200/30 hover:scale-105 transition-transform duration-500">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Users className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <p className="text-3xl font-bold text-apple-text mb-2">{onlineUsers}</p>
          <p className="text-sm font-semibold text-apple-secondary">Online Users</p>
        </div>
        <div className="card text-center bg-gradient-to-br from-teal-50/50 to-green-50/50 border-teal-200/30 hover:scale-105 transition-transform duration-500">
          <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-teal-500/30">
            <Heart className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <p className="text-3xl font-bold text-apple-text mb-2">1.2k</p>
          <p className="text-sm font-semibold text-apple-secondary">Today's Interactions</p>
        </div>
      </div>

      {/* Main feature area */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-apple-text">Discover & Connect</h2>

          <Link
            to="/social/match"
            className="card block hover:scale-105 hover:shadow-apple-lg transition-all duration-500 group"
          >
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:shadow-xl group-hover:shadow-pink-500/40 transition-all duration-500">
                <Search className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-apple-text text-lg mb-2">Find Like-Minded People</h3>
                <p className="text-apple-secondary text-sm leading-relaxed mb-2">
                  Find people who share similar emotional experiences
                </p>
                <p className="text-sm text-apple-blue font-semibold">3 matches found</p>
              </div>
            </div>
          </Link>

          <Link
            to="/social/community"
            className="card block hover:scale-105 hover:shadow-apple-lg transition-all duration-500 group"
          >
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:shadow-xl group-hover:shadow-teal-500/40 transition-all duration-500">
                <MessageCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-apple-text text-lg mb-2">Emotion Community</h3>
                <p className="text-apple-secondary text-sm leading-relaxed mb-2">
                  Participate in topic discussions and share emotional experiences
                </p>
                <p className="text-sm text-green-600 font-semibold">7 trending topics</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-apple-text">Personal Insights</h2>

          <Link
            to="/social/insights"
            className="card block hover:scale-105 hover:shadow-apple-lg transition-all duration-500 group"
          >
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:shadow-xl group-hover:shadow-green-500/40 transition-all duration-500">
                <TrendingUp className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-apple-text text-lg mb-2">Social Insights</h3>
                <p className="text-apple-secondary text-sm leading-relaxed mb-2">
                  Understand your social influence and growth
                </p>
                <p className="text-sm text-purple-600 font-semibold">+25% interactions this month</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SocialPage;
