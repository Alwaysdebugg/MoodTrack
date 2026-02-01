import { useState, useEffect } from 'react';
import { Smile, Frown, Meh, Heart, Calendar, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getMoodEntries, type StoredMoodEntry } from '@/utils/moodStorage';

const moodTypeMapping: { [key: string]: number } = {
  very_bad: 1,
  bad: 2,
  neutral: 3,
  good: 4,
  excellent: 5,
};

const HistoryPage = () => {
  const [entries, setEntries] = useState<StoredMoodEntry[]>([]);

  useEffect(() => {
    setEntries(getMoodEntries());
  }, []);

  const getMoodIcon = (mood: string) => {
    const n = moodTypeMapping[mood];
    if (n === 1 || n === 2) return <Frown className="w-6 h-6 text-red-500" />;
    if (n === 3) return <Meh className="w-6 h-6 text-yellow-500" />;
    if (n === 4) return <Smile className="w-6 h-6 text-green-500" />;
    if (n === 5) return <Heart className="w-6 h-6 text-pink-500" />;
    return null;
  };

  const getMoodLabel = (mood: string) => {
    const labels: Record<string, string> = {
      very_bad: 'Very Bad',
      bad: 'Bad',
      neutral: 'Neutral',
      good: 'Good',
      excellent: 'Excellent',
    };
    return labels[mood] || mood;
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
        <Calendar className="w-14 h-14 sm:w-16 sm:h-16 text-muted-foreground mb-4" />
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
          No Mood Records Yet
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Start recording your first mood on the Track page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center space-y-2 px-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Mood History
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          View your mood change records
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {entries
          .slice()
          .reverse()
          .map((entry, index) => (
            <Card key={`${entry.created_at}-${index}`}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getMoodIcon(entry.mood_type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold">
                        {getMoodLabel(entry.mood_type)}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(entry.created_at)}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-muted-foreground mb-3">{entry.note}</p>
                    )}
                    {entry.triggers && entry.triggers.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <Tag className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        {entry.triggers.map((trigger, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium"
                          >
                            {trigger}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default HistoryPage;
