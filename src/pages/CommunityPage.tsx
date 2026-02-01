import { useState } from 'react';
import {
  ArrowLeft,
  TrendingUp,
  MessageCircle,
  Clock,
  Users,
  Hash,
  ChevronUp,
  ChevronDown,
  Bookmark,
  Send,
  Loader2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmotionTopic, CommunityPost } from '@/types/social';
import { formatTimeAgo } from '@/utils/socialUtils';
import { mockCommunityTopics, mockCommunityPosts } from '@/data/communityMock';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const CommunityPage = () => {
  const [topics] = useState<EmotionTopic[]>(mockCommunityTopics);
  const [posts, setPosts] = useState<CommunityPost[]>(mockCommunityPosts);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showingPosts, setShowingPosts] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId);
    setShowingPosts(true);
  };

  const handleBack = () => {
    setShowingPosts(false);
    setSelectedTopic(null);
  };

  const handleInteraction = (
    postId: string,
    interactionType: 'like' | 'unlike'
  ) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id !== postId) return post;
        const current = post.userInteraction;
        const isRemoving = current === interactionType;
        let newLike = post.interactions.like;
        let newUnlike = post.interactions.unlike;
        if (isRemoving) {
          if (interactionType === 'like') newLike = Math.max(0, newLike - 1);
          else newUnlike = Math.max(0, newUnlike - 1);
        } else {
          if (current === 'like') newLike = Math.max(0, newLike - 1);
          else if (current === 'unlike') newUnlike = Math.max(0, newUnlike - 1);
          if (interactionType === 'like') newLike += 1;
          else newUnlike += 1;
        }
        return {
          ...post,
          interactions: { like: newLike, unlike: newUnlike },
          userInteraction: isRemoving ? null : interactionType,
        };
      })
    );
  };

  const getMoodColor = (mood: number) => {
    const colors: Record<number, string> = {
      1: 'bg-red-100 text-red-700',
      2: 'bg-orange-100 text-orange-700',
      3: 'bg-yellow-100 text-yellow-700',
      4: 'bg-green-100 text-green-700',
      5: 'bg-blue-100 text-blue-700',
    };
    return colors[mood] ?? colors[3];
  };

  const handleReplySubmit = (postId: string) => {
    if (!replyContent.trim()) return;
    setSubmittingReply(true);
    setTimeout(() => {
      setPosts(prev =>
        prev.map(post => {
          if (post.id !== postId) return post;
          return {
            ...post,
            replies: [
              ...post.replies,
              {
                id: `r-${Date.now()}`,
                user: { id: 'me', name: 'You', email: '', avatar: '' },
                content: replyContent.trim(),
                timestamp: new Date().toISOString(),
              },
            ],
          };
        })
      );
      setReplyingTo(null);
      setReplyContent('');
      setSubmittingReply(false);
    }, 300);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          {showingPosts && selectedTopic ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Topics
            </Button>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/social" className="gap-1">
                <ArrowLeft className="w-4 h-4" />
                Back to Social
              </Link>
            </Button>
          )}
          <h1 className="text-2xl font-bold">
            {showingPosts && selectedTopic
              ? topics.find(t => t.id === selectedTopic)?.name
              : 'Emotion Community'}
          </h1>
        </div>
      </div>

      {!showingPosts || !selectedTopic ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <Hash className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{topics.length}</p>
                <p className="text-sm text-muted-foreground">Active Topics</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">
                  {topics.reduce((s, t) => s + t.participantCount, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Participants</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <MessageCircle className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">
                  {topics.reduce((s, t) => s + t.recentPosts, 0)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Today&apos;s Shares
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">
                  {topics.filter(t => t.trending).length}
                </p>
                <p className="text-sm text-muted-foreground">Trending</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">All Topics</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {topics.map(topic => (
                <Card
                  key={topic.id}
                  className="cursor-pointer transition-shadow hover:shadow-md"
                  onClick={() => handleTopicClick(topic.id)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{topic.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1">{topic.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {topic.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {topic.participantCount}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {topic.recentPosts}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {selectedTopic && (
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">
                    {topics.find(t => t.id === selectedTopic)?.emoji}
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {topics.find(t => t.id === selectedTopic)?.name}
                    </h2>
                    <p className="text-muted-foreground">
                      {topics.find(t => t.id === selectedTopic)?.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            {posts.map(post => {
              const totalScore =
                (post.interactions.like || 0) - (post.interactions.unlike || 0);
              const isLiked = post.userInteraction === 'like';
              const isDisliked = post.userInteraction === 'unlike';

              return (
                <Card key={post.id}>
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="flex flex-col items-center bg-muted/50 px-2 py-3 min-w-[48px] gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 ${isLiked ? 'text-orange-500' : ''}`}
                          onClick={() => handleInteraction(post.id, 'like')}
                        >
                          <ChevronUp className="w-5 h-5" />
                        </Button>
                        <span className="text-xs font-medium">
                          {totalScore > 0 ? '+' : ''}
                          {totalScore}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 ${isDisliked ? 'text-blue-500' : ''}`}
                          onClick={() => handleInteraction(post.id, 'unlike')}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </Button>
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground flex-wrap">
                          <span className="font-medium text-foreground">
                            {post.user.name}
                          </span>
                          <Badge
                            variant="secondary"
                            className={getMoodColor(post.mood)}
                          >
                            {post.mood_type}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(new Date(post.created_at))}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed mb-3">
                          {post.content}
                        </p>
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {post.tags.map((tag, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="text-xs"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        {post.replies.length > 0 && (
                          <div className="space-y-2 mt-3 pl-3 border-l-2">
                            {post.replies.map(reply => (
                              <div key={reply.id}>
                                <span className="text-xs font-medium text-muted-foreground">
                                  {reply.user.name} ·{' '}
                                  {formatTimeAgo(new Date(reply.timestamp))}
                                </span>
                                <p className="text-sm">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        {replyingTo === post.id && (
                          <div className="mt-3 space-y-2">
                            <Textarea
                              value={replyContent}
                              onChange={e => setReplyContent(e.target.value)}
                              placeholder="Write your reply..."
                              rows={3}
                              className="resize-none"
                            />
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyContent('');
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                disabled={
                                  !replyContent.trim() || submittingReply
                                }
                                onClick={() => handleReplySubmit(post.id)}
                                className="gap-1"
                              >
                                {submittingReply ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Send className="w-4 h-4" />
                                )}
                                Send
                              </Button>
                            </div>
                          </div>
                        )}
                        <div className="flex gap-2 mt-3 pt-2 border-t">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-muted-foreground"
                            onClick={() =>
                              setReplyingTo(
                                replyingTo === post.id ? null : post.id
                              )
                            }
                          >
                            <MessageCircle className="w-4 h-4" />
                            {post.replies?.length ?? 0} Comments
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-muted-foreground"
                          >
                            <Bookmark className="w-4 h-4" />
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
