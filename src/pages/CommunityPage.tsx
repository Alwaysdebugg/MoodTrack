import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  TrendingUp,
  MessageCircle,
  Clock,
  Heart,
  Users,
  Hash,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmotionTopic, CommunityPost } from '../types/social';
import {
  generateAnonymousUser,
  interactionTypes,
  formatTimeAgo,
} from '../utils/socialUtils';

const CommunityPage = () => {
  const [topics, setTopics] = useState<EmotionTopic[]>([]);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showingPosts, setShowingPosts] = useState(false);

  useEffect(() => {
    // 生成模拟话题数据
    const mockTopics: EmotionTopic[] = [
      {
        id: 'work-stress',
        title: '工作压力与焦虑',
        description: '分享工作中的压力体验和应对方法',
        emoji: '💼',
        participantCount: 156,
        trending: true,
        recentPosts: 23,
        tags: ['工作', '压力', '焦虑', '职场'],
      },
      {
        id: 'relationship',
        title: '人际关系困扰',
        description: '探讨人际交往中的情感问题',
        emoji: '💝',
        participantCount: 89,
        trending: false,
        recentPosts: 12,
        tags: ['人际关系', '友情', '亲情', '社交'],
      },
      {
        id: 'self-growth',
        title: '个人成长与迷茫',
        description: '一起探索自我，寻找人生方向',
        emoji: '🌱',
        participantCount: 134,
        trending: true,
        recentPosts: 18,
        tags: ['成长', '迷茫', '自我探索', '人生'],
      },
      {
        id: 'daily-mood',
        title: '日常小情绪',
        description: '分享生活中的小确幸与小烦恼',
        emoji: '🌈',
        participantCount: 203,
        trending: false,
        recentPosts: 31,
        tags: ['日常', '情绪', '生活', '分享'],
      },
      {
        id: 'mental-health',
        title: '心理健康关爱',
        description: '互相支持，共同关注心理健康',
        emoji: '🧠',
        participantCount: 78,
        trending: true,
        recentPosts: 9,
        tags: ['心理健康', '自我关爱', '支持', '治愈'],
      },
      {
        id: 'positive-energy',
        title: '正能量分享',
        description: '传递温暖，分享积极的生活态度',
        emoji: '☀️',
        participantCount: 167,
        trending: false,
        recentPosts: 15,
        tags: ['正能量', '积极', '温暖', '鼓励'],
      },
    ];
    setTopics(mockTopics);
  }, []);

  const generateMockPosts = (topicId: string): CommunityPost[] => {
    const postContents = [
      { content: '最近工作压力特别大，每天都感觉被任务追着跑...', mood: 2 },
      { content: '今天终于完成了一个重要项目，感觉轻松了很多', mood: 4 },
      { content: '和同事的沟通出现了问题，不知道该怎么处理', mood: 2 },
      { content: '学会了一些时间管理的方法，想分享给大家', mood: 4 },
      { content: '有时候感觉自己在职场中很迷茫，不知道方向在哪里', mood: 2 },
      { content: '今天收到了来自同事的感谢，心情特别好', mood: 5 },
    ];

    return postContents.slice(0, 4).map((item, index) => ({
      id: `post-${topicId}-${index}`,
      user: generateAnonymousUser(),
      content: item.content,
      processedContent: item.content,
      mood: item.mood,
      moodLabel: ['', '很糟糕', '不好', '一般', '不错', '很棒'][item.mood],
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      interactions: {
        empathy: Math.floor(Math.random() * 20),
        support: Math.floor(Math.random() * 15),
        helpful: Math.floor(Math.random() * 10),
        grateful: Math.floor(Math.random() * 8),
        encourage: Math.floor(Math.random() * 12),
      },
      replies: [],
      tags: topics.find(t => t.id === topicId)?.tags.slice(0, 2) || [],
    }));
  };

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId);
    setPosts(generateMockPosts(topicId));
    setShowingPosts(true);
  };

  const handleBack = () => {
    setShowingPosts(false);
    setSelectedTopic(null);
    setPosts([]);
  };

  const handleInteraction = (postId: string, interactionType: string) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            interactions: {
              ...post.interactions,
              [interactionType]:
                post.interactions[
                  interactionType as keyof typeof post.interactions
                ] + 1,
            },
          };
        }
        return post;
      })
    );
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
          {showingPosts ? (
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              返回话题列表
            </button>
          ) : (
            <Link
              to="/social"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              返回社交首页
            </Link>
          )}
          <h1 className="text-2xl font-bold text-gray-900">
            {showingPosts
              ? topics.find(t => t.id === selectedTopic)?.title
              : '情绪社区'}
          </h1>
        </div>
        {showingPosts && (
          <button className="btn btn-primary">
            <MessageCircle className="w-4 h-4" />
            发表感受
          </button>
        )}
      </div>

      {!showingPosts ? (
        /* 话题列表视图 */
        <div className="space-y-6">
          {/* 社区统计 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card text-center bg-purple-50">
              <Hash className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-purple-700">
                {topics.length}
              </p>
              <p className="text-sm text-purple-600">活跃话题</p>
            </div>
            <div className="card text-center bg-teal-50">
              <Users className="w-6 h-6 text-teal-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-teal-700">
                {topics.reduce((sum, topic) => sum + topic.participantCount, 0)}
              </p>
              <p className="text-sm text-teal-600">参与用户</p>
            </div>
            <div className="card text-center bg-orange-50">
              <MessageCircle className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-orange-700">
                {topics.reduce((sum, topic) => sum + topic.recentPosts, 0)}
              </p>
              <p className="text-sm text-orange-600">今日分享</p>
            </div>
            <div className="card text-center bg-green-50">
              <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-green-700">
                {topics.filter(t => t.trending).length}
              </p>
              <p className="text-sm text-green-600">热门话题</p>
            </div>
          </div>

          {/* 话题分类 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">热门话题</h2>
              <span className="text-sm text-gray-600">点击话题查看讨论</span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {topics
                .filter(topic => topic.trending)
                .map(topic => (
                  <div
                    key={topic.id}
                    onClick={() => handleTopicClick(topic.id)}
                    className="card hover:shadow-md transition-all cursor-pointer border-l-4 border-orange-400"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <span className="text-3xl">{topic.emoji}</span>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-800">
                              {topic.title}
                            </h3>
                            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                              热门
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">
                            {topic.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {topic.participantCount} 人参与
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {topic.recentPosts} 条新动态
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {topic.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* 所有话题 */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              所有话题
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {topics
                .filter(topic => !topic.trending)
                .map(topic => (
                  <div
                    key={topic.id}
                    onClick={() => handleTopicClick(topic.id)}
                    className="card hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{topic.emoji}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            {topic.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {topic.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {topic.participantCount}
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {topic.recentPosts}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        /* 话题内容视图 */
        <div className="space-y-6">
          {/* 话题信息 */}
          {selectedTopic && (
            <div className="card bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">
                  {topics.find(t => t.id === selectedTopic)?.emoji}
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {topics.find(t => t.id === selectedTopic)?.title}
                  </h2>
                  <p className="text-gray-600">
                    {topics.find(t => t.id === selectedTopic)?.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                    <span>
                      {
                        topics.find(t => t.id === selectedTopic)
                          ?.participantCount
                      }{' '}
                      人参与
                    </span>
                    <span>
                      {topics.find(t => t.id === selectedTopic)?.recentPosts}{' '}
                      条讨论
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 帖子列表 */}
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="card">
                <div className="flex items-start space-x-4">
                  {/* 用户头像 */}
                  <div
                    className={`w-10 h-10 rounded-full ${post.user.avatar} flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-white text-sm">😊</span>
                  </div>

                  {/* 帖子内容 */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-800">
                          {post.user.nickname}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getMoodColor(post.mood)}`}
                        >
                          {post.moodLabel}
                        </span>
                        <div className="flex items-center text-gray-500 text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTimeAgo(new Date(post.timestamp))}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-3">{post.content}</p>

                    {/* 标签 */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 互动区域 */}
                    <div className="flex items-center space-x-4">
                      {interactionTypes.map(type => (
                        <button
                          key={type.id}
                          onClick={() => handleInteraction(post.id, type.id)}
                          className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                          title={type.description}
                        >
                          <span>{type.emoji}</span>
                          <span>
                            {
                              post.interactions[
                                type.id as keyof typeof post.interactions
                              ]
                            }
                          </span>
                        </button>
                      ))}
                      <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700">
                        <MessageCircle className="w-4 h-4" />
                        <span>回复</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 加载更多 */}
          <div className="text-center">
            <button className="btn btn-secondary">加载更多讨论</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
