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
    // 生成模拟洞察数据
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
      user: '温暖的云朵',
      action: '给了你一个拥抱',
      time: '2小时前',
      emoji: '🤗',
    },
    {
      type: 'given',
      user: '勇敢的小树',
      action: '你表示了同感',
      time: '5小时前',
      emoji: '🤝',
    },
    {
      type: 'received',
      user: '平静的湖水',
      action: '感谢你的分享',
      time: '1天前',
      emoji: '🙏',
    },
    {
      type: 'given',
      user: '智慧的月亮',
      action: '你给予了鼓励',
      time: '2天前',
      emoji: '💪',
    },
    {
      type: 'received',
      user: '希望的晨光',
      action: '觉得你的分享很有帮助',
      time: '3天前',
      emoji: '💡',
    },
  ];

  const achievementBadges = [
    {
      id: 'warm-supporter',
      name: '温暖支持者',
      description: '给予他人50次支持',
      icon: '🤗',
      earned: true,
    },
    {
      id: 'empathy-master',
      name: '共鸣达人',
      description: '获得100次同感反应',
      icon: '🤝',
      earned: true,
    },
    {
      id: 'community-star',
      name: '社区之星',
      description: '连续7天活跃参与',
      icon: '⭐',
      earned: true,
    },
    {
      id: 'wisdom-sharer',
      name: '智慧分享者',
      description: '分享内容被标记为有帮助20次',
      icon: '💡',
      earned: false,
    },
    {
      id: 'mood-matcher',
      name: '情绪知音',
      description: '成功匹配相似情绪100次',
      icon: '💝',
      earned: false,
    },
    {
      id: 'positive-energy',
      name: '正能量传播者',
      description: '发布的内容获得500次积极反应',
      icon: '☀️',
      earned: false,
    },
  ];

  const moodMatchHistory = [
    { mood: 3, count: 45, label: '一般' },
    { mood: 2, count: 32, label: '不好' },
    { mood: 4, count: 28, label: '不错' },
    { mood: 1, count: 15, label: '很糟糕' },
    { mood: 5, count: 7, label: '很棒' },
  ];

  const getPeriodLabel = (period: string) => {
    const labels = { week: '本周', month: '本月', year: '本年' };
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

  if (!insights) return <div>加载中...</div>;

  return (
    <div className="space-y-6">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/social"
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            返回社交首页
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">社交洞察</h1>
        </div>

        {/* 时间周期选择 */}
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

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center bg-purple-50 border-purple-200">
          <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-700">
            {insights.totalInteractions}
          </p>
          <p className="text-sm text-purple-600">总互动次数</p>
        </div>
        <div className="card text-center bg-teal-50 border-teal-200">
          <Users className="w-8 h-8 text-teal-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-teal-700">
            {insights.interactionsReceived}
          </p>
          <p className="text-sm text-teal-600">收到支持</p>
        </div>
        <div className="card text-center bg-orange-50 border-orange-200">
          <MessageCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-orange-700">
            {insights.interactionsGiven}
          </p>
          <p className="text-sm text-orange-600">给予支持</p>
        </div>
        <div className="card text-center bg-green-50 border-green-200">
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-700">
            {insights.positiveInfluence}%
          </p>
          <p className="text-sm text-green-600">积极影响力</p>
        </div>
      </div>

      {/* 社交影响力评分 */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          社交影响力评分
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">支持他人的能力</span>
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
            <span className="text-gray-700">社区参与度</span>
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
            <span className="text-gray-700">积极影响力</span>
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

      {/* 情绪匹配分析 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            <BarChart3 className="w-5 h-5 inline mr-2" />
            情绪匹配分布
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
                    {item.count} 次匹配
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
            你最常与处于"一般"情绪状态的用户产生共鸣
          </p>
        </div>

        {/* 成就徽章 */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            <Award className="w-5 h-5 inline mr-2" />
            成就徽章
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
                    已获得
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 最近互动记录 */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          <Calendar className="w-5 h-5 inline mr-2" />
          最近互动记录
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
                {interaction.type === 'received' ? '收到' : '给出'}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="text-blue-600 hover:text-blue-700 text-sm">
            查看更多互动记录 →
          </button>
        </div>
      </div>

      {/* 个人成长建议 */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          个人成长建议
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-700">
            🌟 你在情绪支持方面表现出色，继续保持这种温暖的互动方式
          </p>
          <p className="text-sm text-gray-700">
            💡 可以尝试更多参与社区话题讨论，提升社区参与度
          </p>
          <p className="text-sm text-gray-700">
            🎯 距离"智慧分享者"徽章还差5次有帮助标记，加油！
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialInsightsPage;
