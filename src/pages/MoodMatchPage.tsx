import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  MapPin,
  Clock,
  Percent,
  MessageCircle,
  Heart,
  RefreshCw,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MoodMatch } from '../types/social';
import {
  generateMockMoodMatches,
  interactionTypes,
} from '../utils/socialUtils';

const MoodMatchPage = () => {
  const [matches, setMatches] = useState<MoodMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<MoodMatch | null>(null);
  const [currentMood] = useState(3); // 模拟当前心情
  const [currentTags] = useState(['工作压力', '焦虑']); // 模拟当前标签

  useEffect(() => {
    searchMatches();
  }, []);

  const searchMatches = async () => {
    setIsLoading(true);
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newMatches = generateMockMoodMatches(currentMood, currentTags);
    setMatches(newMatches);
    setIsLoading(false);
  };

  const handleInteraction = (matchId: string, interactionType: string) => {
    // 这里处理互动逻辑
    console.log('Interaction:', matchId, interactionType);
  };

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 80) return 'text-green-600 bg-green-100';
    if (similarity >= 60) return 'text-blue-600 bg-blue-100';
    if (similarity >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
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
          <h1 className="text-2xl font-bold text-gray-900">寻找同感者</h1>
        </div>
        <button
          onClick={searchMatches}
          className="btn btn-secondary"
          disabled={isLoading}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          重新匹配
        </button>
      </div>

      {/* 当前状态展示 */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">你的当前状态</h3>
            <div className="flex items-center space-x-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getMoodColor(currentMood)}`}
              >
                心情: {currentMood}/5 分
              </span>
              <div className="flex flex-wrap gap-2">
                {currentTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white text-gray-700 text-xs rounded-full border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Search className="w-8 h-8 text-blue-600" />
        </div>
      </div>

      {/* 匹配结果 */}
      {isLoading ? (
        <div className="space-y-4">
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">正在为你寻找同感者...</p>
            <p className="text-sm text-gray-500 mt-2">
              基于你的情绪状态和标签进行智能匹配
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              找到 {matches.length} 个匹配用户
            </h2>
            <p className="text-sm text-gray-600">
              按相似度排序 • 最近2小时内活跃
            </p>
          </div>

          <div className="grid gap-4">
            {matches.map(match => (
              <div
                key={match.user.id}
                className="card hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  {/* 用户头像 */}
                  <div
                    className={`w-12 h-12 rounded-full ${match.user.avatar} flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-white font-bold">😊</span>
                  </div>

                  {/* 用户信息 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-800">
                          {match.user.nickname}
                        </h3>
                        {match.user.isOnline && (
                          <div className="flex items-center text-green-600 text-xs">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                            在线
                          </div>
                        )}
                        {match.city && (
                          <div className="flex items-center text-gray-500 text-xs">
                            <MapPin className="w-3 h-3 mr-1" />
                            {match.city}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getSimilarityColor(match.similarity)}`}
                        >
                          <Percent className="w-3 h-3 inline mr-1" />
                          {match.similarity}% 相似
                        </span>
                      </div>
                    </div>

                    {/* 情绪信息 */}
                    <div className="flex items-center space-x-3 mb-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getMoodColor(match.mood)}`}
                      >
                        {match.moodLabel}
                      </span>
                      <div className="flex items-center text-gray-500 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {match.timeAgo}
                      </div>
                    </div>

                    {/* 共同标签 */}
                    {match.sharedTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        <span className="text-xs text-gray-500">共同标签:</span>
                        {match.sharedTags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 情绪预览 */}
                    {match.emotionPreview && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        "{match.emotionPreview}"
                      </p>
                    )}

                    {/* 互动按钮 */}
                    <div className="flex items-center space-x-2">
                      {interactionTypes.slice(0, 3).map(type => (
                        <button
                          key={type.id}
                          onClick={() =>
                            handleInteraction(match.user.id, type.id)
                          }
                          className="flex items-center space-x-1 px-3 py-1 bg-gray-50 hover:bg-gray-100 rounded-full text-xs transition-colors"
                          title={type.description}
                        >
                          <span>{type.emoji}</span>
                          <span>{type.label}</span>
                        </button>
                      ))}
                      <button
                        onClick={() => setSelectedMatch(match)}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-xs transition-colors"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>回复</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 无匹配结果 */}
          {matches.length === 0 && (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                暂时没有找到匹配用户
              </h3>
              <p className="text-gray-500 mb-4">
                试试调整你的心情记录或稍后再来看看
              </p>
              <button onClick={searchMatches} className="btn btn-primary">
                重新搜索
              </button>
            </div>
          )}
        </div>
      )}

      {/* 回复弹窗 */}
      {selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                回复 {selectedMatch.user.nickname}
              </h3>
              <button
                onClick={() => setSelectedMatch(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                "{selectedMatch.emotionPreview}"
              </p>
            </div>

            <textarea
              placeholder="写下你的回复... (最多100字)"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24"
              maxLength={100}
            />

            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-gray-500">
                回复内容将通过AI审核以确保友善
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedMatch(null)}
                  className="btn btn-secondary"
                >
                  取消
                </button>
                <button className="btn btn-primary">发送回复</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodMatchPage;
