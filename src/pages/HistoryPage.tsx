import { useState, useEffect } from 'react';
import { Smile, Frown, Meh, Heart, Calendar, Tag } from 'lucide-react';
import { moodAPI } from '@/utils/api';
import { Loader2 } from 'lucide-react';

interface MoodEntry {
  mood_type: string;
  note: string;
  triggers: string[];
  is_public: boolean;
  is_anonymous: boolean;
  created_at: string;
}

const moodTypeMapping: { [key: string]: number } = {
  very_bad: 1,
  bad: 2,
  neutral: 3,
  good: 4,
  excellent: 5,
};

const HistoryPage = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch mood entries from backend
  const fetchMoodEntries = async () => {
    try {
      setLoading(true);
      // Call API to get mood entries
      const res = await moodAPI.getMoods();
      console.log('Mood entries fetched successfully:', res);
      setEntries(res || []);
    } catch (error) {
      console.error('Failed to fetch mood entries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoodEntries();
  }, []);

  const getMoodIcon = (mood: string) => {
    switch (moodTypeMapping[mood]) {
      case 1:
      case 2:
        return <Frown className="w-7 h-7 text-white" strokeWidth={2.5} />;
      case 3:
        return <Meh className="w-7 h-7 text-white" strokeWidth={2.5} />;
      case 4:
        return <Smile className="w-7 h-7 text-white" strokeWidth={2.5} />;
      case 5:
        return <Heart className="w-7 h-7 text-white" strokeWidth={2.5} />;
      default:
        return null;
    }
  };

  const getMoodLabel = (mood: string) => {
    const labels = ['', 'Very Bad', 'Bad', 'Neutral', 'Good', 'Excellent'];
    return labels[moodTypeMapping[mood]] || 'Unknown';
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (entries.length === 0 && !loading) {
    // If no mood entries, show message
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-apple-lg">
          <Calendar className="w-12 h-12 text-white" strokeWidth={2.5} />
        </div>
        <h2 className="text-3xl font-semibold text-apple-text mb-4">
          No Mood Records Yet
        </h2>
        <p className="text-xl text-apple-secondary">Start tracking your first mood!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-apple-text mb-6 tracking-tight">Mood History</h1>
        <p className="text-xl text-apple-secondary leading-relaxed">View your mood change records</p>
      </div>

      {/* Mood entries list */}
      {entries.length > 0 && !loading && (
        <div className="space-y-6">
          {entries.map((entry, index) => (
            <div key={index} className="card hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                    {getMoodIcon(entry.mood_type)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-apple-text">
                      {getMoodLabel(entry.mood_type)}
                    </h3>
                    <span className="text-sm text-apple-secondary font-medium">
                      {formatDate(entry.created_at)}
                    </span>
                  </div>
                  {entry.note && (
                    <p className="text-apple-text mb-4 leading-relaxed">{entry.note}</p>
                  )}
                  {/* Triggers display */}
                  {entry.triggers && entry.triggers.length > 0 && (
                    <div className="flex items-center space-x-3">
                      <Tag className="w-5 h-5 text-apple-secondary" strokeWidth={2.5} />
                      <div className="flex flex-wrap gap-2.5">
                        {entry.triggers.map((trigger, triggerIndex) => (
                          <span
                            key={triggerIndex}
                            className="inline-block bg-apple-gray text-apple-text text-sm font-medium px-4 py-1.5 rounded-xl"
                          >
                            {trigger}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin w-12 h-12 text-apple-blue mb-4" strokeWidth={2.5} />
          <span className="text-lg text-apple-secondary font-medium">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
