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
    <div className="space-y-6">
      {/* Header welcome area */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Emotion Social Space</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Build warm connections with people who share similar feelings in an anonymous and safe environment
        </p>
      </div>

      {/* Current anonymous identity card */}
      {currentUser && (
        <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 rounded-full ${currentUser.avatar} flex items-center justify-center`}
              >
                <span className="text-white font-bold text-lg">😊</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Current Identity</h3>
                <p className="text-gray-600">{currentUser.nickname}</p>
                <p className="text-sm text-gray-500">
                  Anonymous ID: {currentUser.id.slice(-8)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-green-600 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Online</span>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                <Shield className="w-4 h-4 inline mr-1" />
                Privacy Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Real-time statistics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card text-center bg-orange-50 border-orange-200">
          <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-orange-700">{onlineUsers}</p>
          <p className="text-sm text-orange-600">Online Users</p>
        </div>
        <div className="card text-center bg-teal-50 border-teal-200">
          <Heart className="w-8 h-8 text-teal-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-teal-700">1.2k</p>
          <p className="text-sm text-teal-600">Today's Interactions</p>
        </div>
      </div>

      {/* Main feature areas */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Discover & Connect</h2>

          <Link
            to="/social/match"
            className="card block hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Find Like-Minded</h3>
                <p className="text-gray-600 text-sm">
                  Find people with similar emotional experiences
                </p>
                <p className="text-sm text-blue-600 mt-1">Found 3 matching users</p>
              </div>
            </div>
          </Link>

          <Link
            to="/social/community"
            className="card block hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-400 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Emotion Community</h3>
                <p className="text-gray-600 text-sm">
                  Participate in topic discussions and share emotional experiences
                </p>
                <p className="text-sm text-green-600 mt-1">7 trending topics</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Personal Insights</h2>

          <Link
            to="/social/insights"
            className="card block hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Social Insights</h3>
                <p className="text-gray-600 text-sm">
                  Understand your social influence and growth
                </p>
                <p className="text-sm text-purple-600 mt-1">Interactions this month +25%</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SocialPage;
