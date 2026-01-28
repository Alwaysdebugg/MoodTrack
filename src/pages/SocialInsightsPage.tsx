import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  TrendingUp,
  Heart,
  Users,
  MessageCircle,
  Award,
  Calendar,
  BarChart3,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SocialInsight } from '../types/social';
import { formatTimeAgo } from '../utils/socialUtils';

const SocialInsightsPage = () => {
  const [insights, setInsights] = useState<SocialInsight | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<
    'week' | 'month' | 'year'
  >('month');

  useEffect(() => {
    // Generate mock insights data
    const mockInsights: SocialInsight = {
      period: selectedPeriod,
      totalInteractions: 127,
      interactionsReceived: 73,
      interactionsGiven: 54,
      mostCommonMoodMatch: 3,
      supportImpact: 85,
      communityEngagement: 78,
      positiveInfluence: 92,
    };
    setInsights(mockInsights);
  }, [selectedPeriod]);

  const recentInteractions = [
    {
      type: 'received',
      user: 'Warm Cloud',
      action: 'gave you a hug',
      time: '2 hours ago',
      emoji: '🤗',
    },
    {
      type: 'given',
      user: 'Brave Little Tree',
      action: 'you showed empathy',
      time: '5 hours ago',
      emoji: '🤝',
    },
    {
      type: 'received',
      user: 'Calm Lake',
      action: 'thanked you for sharing',
      time: '1 day ago',
      emoji: '🙏',
    },
    {
      type: 'given',
      user: 'Wise Moon',
      action: 'you gave encouragement',
      time: '2 days ago',
      emoji: '💪',
    },
    {
      type: 'received',
      user: 'Hopeful Dawn',
      action: 'found your share helpful',
      time: '3 days ago',
      emoji: '💡',
    },
  ];

  const achievementBadges = [
    {
      id: 'warm-supporter',
      name: 'Warm Supporter',
      description: 'Gave support to others 50 times',
      icon: '🤗',
      earned: true,
    },
    {
      id: 'empathy-master',
      name: 'Empathy Master',
      description: 'Received 100 empathy reactions',
      icon: '🤝',
      earned: true,
    },
    {
      id: 'community-star',
      name: 'Community Star',
      description: 'Active participation for 7 consecutive days',
      icon: '⭐',
      earned: true,
    },
    {
      id: 'wisdom-sharer',
      name: 'Wisdom Sharer',
      description: 'Shared content marked as helpful 20 times',
      icon: '💡',
      earned: false,
    },
    {
      id: 'mood-matcher',
      name: 'Mood Matcher',
      description: 'Successfully matched similar moods 100 times',
      icon: '💝',
      earned: false,
    },
    {
      id: 'positive-energy',
      name: 'Positive Energy Spreader',
      description: 'Published content received 500 positive reactions',
      icon: '☀️',
      earned: false,
    },
  ];

  const moodMatchHistory = [
    { mood: 3, count: 45, label: 'Neutral' },
    { mood: 2, count: 32, label: 'Bad' },
    { mood: 4, count: 28, label: 'Good' },
    { mood: 1, count: 15, label: 'Very Bad' },
    { mood: 5, count: 7, label: 'Excellent' },
  ];

  const getPeriodLabel = (period: string) => {
    const labels = { week: 'This Week', month: 'This Month', year: 'This Year' };
    return labels[period as keyof typeof labels];
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getMoodColor = (mood: number) => {
    const colors = {
      1: 'bg-red-100 text-red-700',
      2: 'bg-orange-100 text-orange-700',
      3: 'bg-yellow-100 text-yellow-700',
      4: 'bg-green-100 text-green-700',
      5: 'bg-blue-100 text-blue-700',
    };
    return colors[mood as keyof typeof colors] || colors[3];
  };

  if (!insights) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Top navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/social"
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to Social
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Social Insights</h1>
        </div>

        {/* Time period selection */}
        <div className="flex space-x-2">
          {(['week', 'month', 'year'] as const).map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {getPeriodLabel(period)}
            </button>
          ))}
        </div>
      </div>

      {/* Core metrics cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center bg-purple-50 border-purple-200">
          <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-700">
            {insights.totalInteractions}
          </p>
          <p className="text-sm text-purple-600">Total Interactions</p>
        </div>
        <div className="card text-center bg-teal-50 border-teal-200">
          <Users className="w-8 h-8 text-teal-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-teal-700">
            {insights.interactionsReceived}
          </p>
          <p className="text-sm text-teal-600">Support Received</p>
        </div>
        <div className="card text-center bg-orange-50 border-orange-200">
          <MessageCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-orange-700">
            {insights.interactionsGiven}
          </p>
          <p className="text-sm text-orange-600">Support Given</p>
        </div>
        <div className="card text-center bg-green-50 border-green-200">
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-700">
            {insights.positiveInfluence}%
          </p>
          <p className="text-sm text-green-600">Positive Influence</p>
        </div>
      </div>

      {/* Social influence score */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Social Influence Score
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Ability to Support Others</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${insights.supportImpact}%` }}
                ></div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(insights.supportImpact)}`}
              >
                {insights.supportImpact}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">Community Engagement</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${insights.communityEngagement}%` }}
                ></div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(insights.communityEngagement)}`}
              >
                {insights.communityEngagement}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">Positive Influence</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${insights.positiveInfluence}%` }}
                ></div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(insights.positiveInfluence)}`}
              >
                {insights.positiveInfluence}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mood match analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            <BarChart3 className="w-5 h-5 inline mr-2" />
            Mood Match Distribution
          </h3>
          <div className="space-y-3">
            {moodMatchHistory.map(item => (
              <div
                key={item.mood}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getMoodColor(item.mood)}`}
                  >
                    {item.label}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {item.count} matches
                  </span>
                </div>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(item.count / 45) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            You most often resonate with users in a "Neutral" emotional state
          </p>
        </div>

        {/* Achievement badges */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            <Award className="w-5 h-5 inline mr-2" />
            Achievement Badges
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {achievementBadges.map(badge => (
              <div
                key={badge.id}
                className={`p-3 rounded-lg border text-center ${
                  badge.earned
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <span className="text-2xl mb-1 block">{badge.icon}</span>
                <h4 className="font-medium text-gray-800 text-sm">
                  {badge.name}
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  {badge.description}
                </p>
                {badge.earned && (
                  <span className="inline-block mt-2 px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full">
                    Earned
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent interaction records */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          <Calendar className="w-5 h-5 inline mr-2" />
          Recent Interaction Records
        </h3>
        <div className="space-y-3">
          {recentInteractions.map((interaction, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-2xl">{interaction.emoji}</span>
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  {interaction.type === 'received' ? (
                    <>
                      <span className="font-medium">{interaction.user}</span>{' '}
                      {interaction.action}
                    </>
                  ) : (
                    <>
                      {interaction.action}{' '}
                      <span className="font-medium">{interaction.user}</span>
                    </>
                  )}
                </p>
                <p className="text-xs text-gray-500">{interaction.time}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  interaction.type === 'received'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {interaction.type === 'received' ? 'Received' : 'Given'}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="text-blue-600 hover:text-blue-700 text-sm">
            View more interaction records →
          </button>
        </div>
      </div>

      {/* Personal growth suggestions */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Personal Growth Suggestions
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-700">
            🌟 You excel in emotional support, keep up this warm interaction style
          </p>
          <p className="text-sm text-gray-700">
            💡 Try participating more in community topic discussions to increase community engagement
          </p>
          <p className="text-sm text-gray-700">
            🎯 You're 5 helpful marks away from the "Wisdom Sharer" badge, keep going!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialInsightsPage;
