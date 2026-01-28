import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  TrendingUp,
  MessageCircle,
  Clock,
  Users,
  Hash,
  Loader2,
  ChevronUp,
  ChevronDown,
  Share2,
  Bookmark,
  Send,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmotionTopic, CommunityPost } from '../types/social';
import { formatTimeAgo } from '../utils/socialUtils';
import { communityAPI } from '@/utils/api';
import { useAuth } from '../contexts/AuthContext';

const CommunityPage = () => {
  const [topics, setTopics] = useState<EmotionTopic[]>([]);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showingPosts, setShowingPosts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);
  const { user } = useAuth();

  // 添加心情标签映射
  // const getMoodLabel = (moodType: string): string => {
  //   const labels: Record<string, string> = {
  //     very_bad: '很糟糕',
  //     bad: '不好',
  //     neutral: '一般',
  //     good: '不错',
  //     excellent: '很棒',
  //   };
  //   return labels[moodType] || moodType;
  // };

  useEffect(() => {
    fetchCommunityTopics();
    // fetchCommunityPosts();
  }, []);

  // Fetch community topics
  const fetchCommunityTopics = async () => {
    const res = await communityAPI.getCommunityTopics();
    if (res.success && res.data) {
      setTopics(res.data || []);
    }
  };
  // Fetch community posts
  const fetchCommunityPosts = async () => {
    setLoading(true);
    const res = await communityAPI.getCommunityPosts();
    if (res.success && res.data) {
      setPosts(res.data || []);
    } else {
      console.error('Failed to fetch community mood list:', res.message);
    }
    setLoading(false);
  };

  // const generateMockPosts = (topicId: string): CommunityPost[] => {
  //   const postContents = [
  //     { content: '最近工作压力特别大，每天都感觉被任务追着跑...', mood: 2 },
  //     { content: '今天终于完成了一个重要项目，感觉轻松了很多', mood: 4 },
  //     { content: '和同事的沟通出现了问题，不知道该怎么处理', mood: 2 },
  //     { content: '学会了一些时间管理的方法，想分享给大家', mood: 4 },
  //     { content: '有时候感觉自己在职场中很迷茫，不知道方向在哪里', mood: 2 },
  //     { content: '今天收到了来自同事的感谢，心情特别好', mood: 5 },
  //   ];

  //   return postContents.slice(0, 4).map((item, index) => ({
  //     id: `post-${topicId}-${index}`,
  //     user: generateAnonymousUser(),
  //     content: item.content,
  //     processedContent: item.content,
  //     mood: item.mood,
  //     moodLabel: ['', '很糟糕', '不好', '一般', '不错', '很棒'][item.mood],
  //     timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
  //     interactions: {
  //       empathy: Math.floor(Math.random() * 20),
  //       support: Math.floor(Math.random() * 15),
  //       helpful: Math.floor(Math.random() * 10),
  //       grateful: Math.floor(Math.random() * 8),
  //       encourage: Math.floor(Math.random() * 12),
  //     },
  //     replies: [],
  //     tags: topics.find(t => t.id === topicId)?.tags.slice(0, 2) || [],
  //   }));
  // };

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId);
    fetchCommunityPosts();
    setShowingPosts(true);
  };

  const handleBack = () => {
    setShowingPosts(false);
    setSelectedTopic(null);
    setPosts([]);
  };

  const handleInteraction = async (postId: string, interactionType: string) => {
    if (!user) {
      alert('Please login first');
      return;
    }

    // 找到当前post
    const currentPost = posts.find(p => p.id === postId);
    if (!currentPost) return;

    const currentUserInteraction = currentPost.userInteraction;
    const isRemovingInteraction = currentUserInteraction === interactionType;

    try {
      // 乐观更新UI
      setPosts(prev =>
        prev.map(post => {
          if (post.id === postId) {
            const newInteractions = { ...post.interactions };

            // 如果是取消互动
            if (isRemovingInteraction) {
              newInteractions[
                interactionType as keyof typeof post.interactions
              ] = Math.max(
                0,
                newInteractions[
                interactionType as keyof typeof post.interactions
                ] - 1
              );
              return {
                ...post,
                interactions: newInteractions,
                userInteraction: null,
              };
            }
            // 如果是切换互动类型
            else if (currentUserInteraction) {
              newInteractions[
                currentUserInteraction as keyof typeof post.interactions
              ] = Math.max(
                0,
                newInteractions[
                currentUserInteraction as keyof typeof post.interactions
                ] - 1
              );
              newInteractions[
                interactionType as keyof typeof post.interactions
              ] += 1;
              return {
                ...post,
                interactions: newInteractions,
                userInteraction: interactionType as 'like' | 'unlike',
              };
            }
            // 如果是新增互动
            else {
              newInteractions[
                interactionType as keyof typeof post.interactions
              ] += 1;
              return {
                ...post,
                interactions: newInteractions,
                userInteraction: interactionType as 'like' | 'unlike',
              };
            }
          }
          return post;
        })
      );

      // Call backend API
      const res = await communityAPI.addInteraction(postId, interactionType);
      if (res.success && res.data) {
        // Update with accurate data from backend
        setPosts(prev =>
          prev.map(post => {
            if (post.id === postId) {
              return {
                ...post,
                interactions: {
                  like: res.data.like,
                  unlike: res.data.unlike,
                },
                userInteraction: res.data.userInteraction || null,
              };
            }
            return post;
          })
        );
      } else {
        // If failed, rollback to original state
        setPosts(prev =>
          prev.map(post => {
            if (post.id === postId) {
              return currentPost;
            }
            return post;
          })
        );
        alert(res.message || 'Interaction failed');
      }
    } catch (error: any) {
      console.error('Interaction failed:', error);
      // Rollback to original state
      setPosts(prev =>
        prev.map(post => {
          if (post.id === postId) {
            return currentPost;
          }
          return post;
        })
      );
      alert(error instanceof Error ? error.message : 'Interaction failed');
    }
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

  const handleReplySubmit = async (postId: string) => {
    if (!replyContent.trim()) return;

    if (!user) {
      alert('Please login first');
      return;
    }

    setSubmittingReply(true);
    try {
      const res = await communityAPI.replyToCommunityMood(postId, {
        content: replyContent.trim(),
        isAnonymous: false,
      });

      if (res.success && res.data) {
        await fetchCommunityPosts();
        setReplyingTo(null);
        setReplyContent('');
      } else {
        alert(res.message || 'Reply failed');
      }
    } catch (error) {
      console.error('Failed to reply to community mood:', error);
      alert(error instanceof Error ? error.message : 'Reply failed');
    } finally {
      setSubmittingReply(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showingPosts ? (
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back to Topics
            </button>
          ) : (
            <Link
              to="/social"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back to Social
            </Link>
          )}
          <h1 className="text-2xl font-bold text-gray-900">
            {showingPosts
              ? topics.find(t => t.id === selectedTopic)?.name
              : 'Emotion Community'}
          </h1>
        </div>
      </div>

      {!showingPosts ? (
        /* Topic list view */
        <div className="space-y-6">
          {/* Community statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card text-center bg-purple-50">
              <Hash className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-purple-700">
                {topics.length}
              </p>
              <p className="text-sm text-purple-600">Active Topics</p>
            </div>
            <div className="card text-center bg-teal-50">
              <Users className="w-6 h-6 text-teal-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-teal-700">
                {topics.reduce((sum, topic) => sum + topic.participantCount, 0)}
              </p>
              <p className="text-sm text-teal-600">Participants</p>
            </div>
            <div className="card text-center bg-orange-50">
              <MessageCircle className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-orange-700">
                {topics.reduce((sum, topic) => sum + topic.recentPosts, 0)}
              </p>
              <p className="text-sm text-orange-600">Today's Shares</p>
            </div>
            <div className="card text-center bg-green-50">
              <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-green-700">
                {topics.filter(t => t.trending).length}
              </p>
              <p className="text-sm text-green-600">Trending Topics</p>
            </div>
          </div>

          {/* 话题分类 */}
          {/* <div>
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
                              {topic.name}
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
          </div> */}

          {/* All topics */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              All Topics
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
                            {topic.name}
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
        /* Topic content view */
        <div className="space-y-6">
          {/* Topic info */}
          {selectedTopic && (
            <div className="card bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">
                  {topics.find(t => t.id === selectedTopic)?.emoji}
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {topics.find(t => t.id === selectedTopic)?.name}
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
                      participants
                    </span>
                    <span>
                      {topics.find(t => t.id === selectedTopic)?.recentPosts}{' '}
                      discussions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Post list - Reddit style */}
          <div className="space-y-2">
            {posts.map(post => {
              const totalScore =
                (post.interactions.like || 0) - (post.interactions.unlike || 0);
              const isLiked = post.userInteraction === 'like';
              const isDisliked = post.userInteraction === 'unlike';

              return (
                <div
                  key={post.id}
                  className="bg-white rounded-md border border-gray-200 hover:border-gray-300 transition-colors overflow-hidden"
                >
                  <div className="flex">
                    {/* Left voting area - Reddit style */}
                    <div className="flex flex-col items-center bg-gray-50 px-2 py-2 min-w-[40px]">
                      <button
                        onClick={() => handleInteraction(post.id, 'like')}
                        className={`p-1 rounded hover:bg-gray-200 transition-colors ${isLiked
                          ? 'text-orange-500'
                          : 'text-gray-400 hover:text-orange-500'
                          }`}
                        title="Like"
                      >
                        <ChevronUp className="w-5 h-5" />
                      </button>
                      <span
                        className={`text-xs font-semibold py-1 ${totalScore > 0
                          ? 'text-orange-500'
                          : totalScore < 0
                            ? 'text-blue-500'
                            : 'text-gray-500'
                          }`}
                      >
                        {totalScore > 0 ? '+' : ''}
                        {totalScore}
                      </span>
                      <button
                        onClick={() => handleInteraction(post.id, 'unlike')}
                        className={`p-1 rounded hover:bg-gray-200 transition-colors ${isDisliked
                          ? 'text-blue-500'
                          : 'text-gray-400 hover:text-blue-500'
                          }`}
                        title="Dislike"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Post content area */}
                    <div className="flex-1 p-3">
                      {/* Metadata - more compact */}
                      <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                        <span className="font-medium text-gray-900 hover:underline cursor-pointer">
                          {post.user.name}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-xs font-medium ${getMoodColor(post.mood)}`}
                        >
                          {post.mood_type}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(new Date(post.created_at))}
                        </span>
                      </div>

                      {/* Post content */}
                      <div className="mb-3">
                        <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-wrap">
                          {post.content}
                        </p>
                      </div>

                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100 cursor-pointer"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Reply list - clearer nesting */}
                      {post.replies && post.replies.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {post.replies.slice(0, 3).map(reply => (
                            <div
                              key={reply.id}
                              className="pl-3 border-l-2 border-gray-200 hover:border-gray-300 transition-colors"
                            >
                              <div className="flex items-center gap-2 mb-1 text-xs text-gray-500">
                                <span className="font-medium text-gray-700">
                                  {reply.user.name}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span>
                                  {formatTimeAgo(new Date(reply.timestamp))}
                                </span>
                              </div>
                              <p className="text-gray-700 text-sm leading-relaxed">
                                {reply.content}
                              </p>
                            </div>
                          ))}
                          {post.replies.length > 3 && (
                            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium ml-3">
                              View all {post.replies.length} replies
                            </button>
                          )}
                        </div>
                      )}

                      {/* Reply input */}
                      {replyingTo === post.id && (
                        <div className="mt-3 p-3 bg-gray-50 rounded border border-gray-200">
                          <textarea
                            value={replyContent}
                            onChange={e => setReplyContent(e.target.value)}
                            placeholder="Write your reply..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                            rows={3}
                          />
                          <div className="flex items-center justify-end gap-2 mt-2">
                            <button
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyContent('');
                              }}
                              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleReplySubmit(post.id)}
                              disabled={!replyContent.trim() || submittingReply}
                              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
                            >
                              {submittingReply ? (
                                <>
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                  <span>Sending...</span>
                                </>
                              ) : (
                                <>
                                  <Send className="w-3 h-3" />
                                  <span>Send</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Bottom action bar - Reddit style */}
                      <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-100">
                        <button
                          onClick={() => {
                            if (!user) {
                              alert('Please login first');
                              return;
                            }
                            setReplyingTo(
                              replyingTo === post.id ? null : post.id
                            );
                          }}
                          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.replies?.length || 0}</span>
                          <span className="hidden sm:inline">Comments</span>
                        </button>
                        <button className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded transition-colors">
                          <Bookmark className="w-4 h-4" />
                          <span className="hidden sm:inline">Save</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
              <span className="ml-2 text-gray-600">Loading...</span>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
