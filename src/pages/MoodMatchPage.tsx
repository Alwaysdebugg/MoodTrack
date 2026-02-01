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
import type { MoodMatch } from '@/types/social';
import { generateMockMoodMatches, interactionTypes } from '@/utils/socialUtils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const MoodMatchPage = () => {
  const [matches, setMatches] = useState<MoodMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<MoodMatch | null>(null);
  const [currentMood] = useState(3);
  const [currentTags] = useState(['Work Stress', 'Anxiety']);

  useEffect(() => {
    searchMatches();
  }, []);

  const searchMatches = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newMatches = generateMockMoodMatches(currentMood, currentTags);
    setMatches(newMatches);
    setIsLoading(false);
  };

  const handleInteraction = (_matchId: string, _interactionType: string) => {
    // Mock: no-op
  };

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 80) return 'bg-green-100 text-green-700';
    if (similarity >= 60) return 'bg-blue-100 text-blue-700';
    if (similarity >= 40) return 'bg-yellow-100 text-yellow-700';
    return 'bg-muted text-muted-foreground';
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
          <h1 className="text-2xl font-bold">Find Like-Minded</h1>
        </div>
        <Button
          variant="secondary"
          onClick={searchMatches}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Rematch
        </Button>
      </div>

      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-semibold mb-2">Your Current Status</h3>
              <div className="flex items-center gap-4 flex-wrap">
                <Badge className={getMoodColor(currentMood)}>
                  Mood: {currentMood}/5
                </Badge>
                <div className="flex flex-wrap gap-2">
                  {currentTags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Search className="w-8 h-8 text-primary" />
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground">
              Finding like-minded people for you...
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Intelligent matching based on your emotional state and tags
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-lg font-semibold">
              Found {matches.length} matching users
            </h2>
            <p className="text-sm text-muted-foreground">
              Sorted by similarity · Active in last 2 hours
            </p>
          </div>

          <div className="space-y-4">
            {matches.map(match => (
              <Card
                key={match.user.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full ${match.user.avatar ?? 'bg-primary/20'} flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-xl">😊</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-medium">{match.user.name}</h3>
                          {match.user.isOnline && (
                            <span className="flex items-center gap-1 text-green-600 text-xs">
                              <span className="w-2 h-2 bg-green-500 rounded-full" />
                              Online
                            </span>
                          )}
                          {match.city && (
                            <span className="flex items-center gap-1 text-muted-foreground text-xs">
                              <MapPin className="w-3 h-3" />
                              {match.city}
                            </span>
                          )}
                        </div>
                        <Badge
                          variant="secondary"
                          className={getSimilarityColor(match.similarity)}
                        >
                          <Percent className="w-3 h-3 mr-1" />
                          {match.similarity}% similar
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getMoodColor(match.mood)}>
                          {match.moodLabel}
                        </Badge>
                        <span className="flex items-center gap-1 text-muted-foreground text-xs">
                          <Clock className="w-3 h-3" />
                          {match.timeAgo}
                        </span>
                      </div>
                      {match.sharedTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          <span className="text-xs text-muted-foreground">
                            Shared tags:
                          </span>
                          {match.sharedTags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {match.emotionPreview && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          &quot;{match.emotionPreview}&quot;
                        </p>
                      )}
                      <div className="flex items-center gap-2 flex-wrap">
                        {interactionTypes.slice(0, 3).map(type => (
                          <Button
                            key={type.id}
                            variant="secondary"
                            size="sm"
                            className="gap-1"
                            onClick={() =>
                              handleInteraction(match.user.id, type.id)
                            }
                          >
                            <span>{type.emoji}</span>
                            {type.label}
                          </Button>
                        ))}
                        <Button
                          variant="default"
                          size="sm"
                          className="gap-1"
                          onClick={() => setSelectedMatch(match)}
                        >
                          <MessageCircle className="w-3 h-3" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {matches.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No matching users found yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your mood records or check back later
                </p>
                <Button onClick={searchMatches}>Search Again</Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Dialog
        open={!!selectedMatch}
        onOpenChange={open => !open && setSelectedMatch(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to {selectedMatch?.user.name}</DialogTitle>
          </DialogHeader>
          {selectedMatch && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                &quot;{selectedMatch.emotionPreview}&quot;
              </p>
              <Textarea
                placeholder="Write your reply... (max 100 characters)"
                maxLength={100}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Reply content will be reviewed by AI to ensure friendliness
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedMatch(null)}>
              Cancel
            </Button>
            <Button>Send Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MoodMatchPage;
