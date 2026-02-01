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
import type { SocialInsight } from '@/types/social';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SocialInsightsPage = () => {
  const [insights, setInsights] = useState<SocialInsight | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<
    'week' | 'month' | 'year'
  >('month');

  useEffect(() => {
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
      type: 'received' as const,
      user: 'Warm Cloud',
      action: 'gave you a hug',
      time: '2 hours ago',
      emoji: '🤗',
    },
    {
      type: 'given' as const,
      user: 'Brave Little Tree',
      action: 'you showed empathy',
      time: '5 hours ago',
      emoji: '🤝',
    },
    {
      type: 'received' as const,
      user: 'Calm Lake',
      action: 'thanked you for sharing',
      time: '1 day ago',
      emoji: '🙏',
    },
    {
      type: 'given' as const,
      user: 'Wise Moon',
      action: 'you gave encouragement',
      time: '2 days ago',
      emoji: '💪',
    },
    {
      type: 'received' as const,
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
    const labels: Record<string, string> = {
      week: 'This Week',
      month: 'This Month',
      year: 'This Year',
    };
    return labels[period] ?? period;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-700';
    if (score >= 70) return 'bg-blue-100 text-blue-700';
    if (score >= 50) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
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

  if (!insights)
    return (
      <div className="flex items-center justify-center py-12">Loading...</div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="gap-1">
            <Link to="/social">
              <ArrowLeft className="w-4 h-4" />
              Back to Social
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Social Insights</h1>
        </div>
        <div className="flex gap-2">
          {(['week', 'month', 'year'] as const).map(period => (
            <Button
              key={period}
              variant={selectedPeriod === period ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
            >
              {getPeriodLabel(period)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{insights.totalInteractions}</p>
            <p className="text-sm text-muted-foreground">Total Interactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">
              {insights.interactionsReceived}
            </p>
            <p className="text-sm text-muted-foreground">Support Received</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{insights.interactionsGiven}</p>
            <p className="text-sm text-muted-foreground">Support Given</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{insights.positiveInfluence}%</p>
            <p className="text-sm text-muted-foreground">Positive Influence</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Social Influence Score</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              label: 'Ability to Support Others',
              value: insights.supportImpact,
            },
            {
              label: 'Community Engagement',
              value: insights.communityEngagement,
            },
            { label: 'Positive Influence', value: insights.positiveInfluence },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between gap-4"
            >
              <span className="text-sm">{label}</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${value}%` }}
                  />
                </div>
                <Badge variant="secondary" className={getScoreColor(value)}>
                  {value}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Mood Match Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {moodMatchHistory.map(item => (
              <div
                key={item.mood}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <Badge className={getMoodColor(item.mood)}>
                    {item.label}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {item.count} matches
                  </span>
                </div>
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(item.count / 45) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            <p className="text-sm text-muted-foreground mt-4">
              You most often resonate with users in a &quot;Neutral&quot;
              emotional state
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Achievement Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {achievementBadges.map(badge => (
                <Card
                  key={badge.id}
                  className={
                    badge.earned
                      ? 'bg-primary/5 border-primary/20'
                      : 'opacity-60'
                  }
                >
                  <CardContent className="pt-4 pb-4 text-center">
                    <span className="text-2xl block mb-1">{badge.icon}</span>
                    <h4 className="font-medium text-sm">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {badge.description}
                    </p>
                    {badge.earned && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        Earned
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Recent Interaction Records
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentInteractions.map((interaction, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
            >
              <span className="text-2xl">{interaction.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
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
                <p className="text-xs text-muted-foreground">
                  {interaction.time}
                </p>
              </div>
              <Badge
                variant={
                  interaction.type === 'received' ? 'default' : 'secondary'
                }
              >
                {interaction.type === 'received' ? 'Received' : 'Given'}
              </Badge>
            </div>
          ))}
          <div className="text-center pt-2">
            <Button variant="link" size="sm">
              View more interaction records →
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/30 border-primary/20">
        <CardHeader>
          <CardTitle>Personal Growth Suggestions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            🌟 You excel in emotional support, keep up this warm interaction
            style
          </p>
          <p>
            💡 Try participating more in community topic discussions to increase
            community engagement
          </p>
          <p>
            🎯 You&apos;re 5 helpful marks away from the &quot;Wisdom
            Sharer&quot; badge, keep going!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialInsightsPage;
