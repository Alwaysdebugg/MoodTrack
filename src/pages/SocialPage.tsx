import { Link } from 'react-router-dom';
import {
  Heart,
  Users,
  MessageCircle,
  Search,
  TrendingUp,
  Shield,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { generateAnonymousUser } from '@/utils/socialUtils';
import type { AnonymousUser } from '@/types/social';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SocialPage = () => {
  const [currentUser, setCurrentUser] = useState<AnonymousUser | null>(null);
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    setCurrentUser(generateAnonymousUser());
    setOnlineUsers(Math.floor(Math.random() * 200) + 50);
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center space-y-2 px-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Feel together.
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Connect anonymously with people who feel the way you do.
        </p>
      </div>

      {currentUser && (
        <Card className="bg-muted/30">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full ${currentUser.avatar ?? 'bg-primary/20'} flex items-center justify-center`}
                >
                  <span className="text-xl">😊</span>
                </div>
                <div>
                  <h3 className="font-semibold">Your identity</h3>
                  <p className="text-muted-foreground">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Anonymous ID: {currentUser.id.slice(-8)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-green-600 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Online
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Shield className="w-4 h-4" />
                  Privacy Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{onlineUsers}</p>
            <p className="text-sm text-muted-foreground">Online now</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">1.2k</p>
            <p className="text-sm text-muted-foreground">
              Interactions today
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Discover</h2>
          <Button
            variant="outline"
            className="w-full h-auto py-4 justify-start gap-4"
            asChild
          >
            <Link to="/social/match">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Mood match</p>
                <p className="text-sm text-muted-foreground">
                  Find people who feel like you
                </p>
                <p className="text-sm text-primary mt-1">
                  3 matches found
                </p>
              </div>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="w-full h-auto py-4 justify-start gap-4"
            asChild
          >
            <Link to="/social/community">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Community</p>
                <p className="text-sm text-muted-foreground">
                  Join conversations, share experiences
                </p>
                <p className="text-sm text-primary mt-1">7 trending</p>
              </div>
            </Link>
          </Button>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Insights</h2>
          <Button
            variant="outline"
            className="w-full h-auto py-4 justify-start gap-4"
            asChild
          >
            <Link to="/social/insights">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Your impact</p>
                <p className="text-sm text-muted-foreground">
                  See how you're making a difference
                </p>
                <p className="text-sm text-primary mt-1">
                  +25% this month
                </p>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialPage;
