import { useState, useEffect } from 'react';
import { Smile, Frown, Meh, Heart, Star, CheckCircle, Tag } from 'lucide-react';
import { apiRequest } from '../utils/api';
import { Loader2 } from 'lucide-react';
import Switch from '../components/Switch';

const TrackMoodPage = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(true); // Whether to share to community
  const [isAnonymous, setIsAnonymous] = useState(false); // Whether to share anonymously

  // Auto-hide success message
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const moods = [
    {
      id: 1,
      label: 'Very Bad',
      icon: Frown,
      color: 'text-red-500',
      bg: 'bg-red-50',
    },
    {
      id: 2,
      label: 'Bad',
      icon: Frown,
      color: 'text-orange-500',
      bg: 'bg-orange-50',
    },
    {
      id: 3,
      label: 'Neutral',
      icon: Meh,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
    },
    {
      id: 4,
      label: 'Good',
      icon: Smile,
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
    {
      id: 5,
      label: 'Excellent',
      icon: Heart,
      color: 'text-pink-500',
      bg: 'bg-pink-50',
    },
  ];

  const moodTypeMapping: { [key: number]: string } = {
    1: 'very_bad',
    2: 'bad',
    3: 'neutral',
    4: 'good',
    5: 'excellent',
  };

  const triggerOptions = [
    'Work Stress',
    'Relationships',
    'Health Issues',
    'Family Matters',
    'Study Pressure',
    'Financial Status',
    'Weather Changes',
    'Sleep Quality',
    'Exercise',
    'Entertainment',
    'Social Activities',
    'Personal Growth',
    'Romantic Relationship',
    'Life Changes',
    'Other',
  ];

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers(prev =>
      prev.includes(trigger)
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMood === null) return;

    const moodEntry = {
      triggers: selectedTriggers,
      mood_type: moodTypeMapping[selectedMood],
      note: note,
      is_public: isPublic,
      is_anonymous: isAnonymous,
      created_at: new Date().toISOString(),
    };

    console.log('Mood Entry:', moodEntry);

    try {
      setLoading(true);
      // Call API to save mood entry
      await apiRequest('/api/moods', {
        method: 'POST',
        data: moodEntry,
      });
      console.log('Mood entry saved!');
      setShowSuccess(true);
    } catch (error) {
      console.error('Failed to save mood entry:', error);
    } finally {
      setLoading(false);
    }

    // Save locally
    const existingEntries = JSON.parse(
      localStorage.getItem('moodEntries') || '[]'
    );
    existingEntries.push(moodEntry);
    localStorage.setItem('moodEntries', JSON.stringify(existingEntries));

    setSelectedMood(null);
    setNote('');
    setSelectedTriggers([]);
    setIsPublic(true);
    setIsAnonymous(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success message */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <CheckCircle className="w-5 h-5" />
          <span>Recorded successfully</span>
        </div>
      )}

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Track Your Mood</h1>
        <p className="text-lg text-gray-600">
          Select the mood that best matches your current feelings and add some notes
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
          <div className="grid grid-cols-5 gap-4">
            {moods.map(({ id, label, icon: Icon, color, bg }) => (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedMood(id)}
                className={`p-4 rounded-lg border-2 transition-all ${selectedMood === id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
                  } ${bg}`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${color}`} />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Tag className="w-5 h-5 mr-2" />
            Trigger
          </h2>
          <div className="grid grid-cols-3 gap-3 mb-2">
            {triggerOptions.map(trigger => (
              <button
                key={trigger}
                type="button"
                onClick={() => toggleTrigger(trigger)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedTriggers.includes(trigger)
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                  : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                  }`}
              >
                {trigger}
              </button>
            ))}
          </div>
          {selectedTriggers.length > 0 && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700 mb-2">Selected triggers:</p>
              <div className="flex flex-wrap gap-2">
                {selectedTriggers.map(trigger => (
                  <span
                    key={trigger}
                    className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {trigger}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Add Notes</h2>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Record what happened today, or describe your feelings..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
        </div>

        {/* Share to community options */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Share Settings</h2>

          {/* Share to community switch */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <div className="flex-1">
              <label htmlFor="public-switch" className="text-sm font-medium text-gray-700 cursor-pointer">
                Share to Community
              </label>
              <p className="text-xs text-gray-500 mt-1">
                When enabled, your mood entry will be displayed in the community
              </p>
            </div>
            <Switch
              id="public-switch"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
          </div>

          {/* Anonymous share switch - only shown when public */}
          {isPublic && (
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label htmlFor="anonymous-switch" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Share Anonymously
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  When enabled, your username will not be displayed
                </p>
              </div>
              <Switch
                id="anonymous-switch"
                checked={isAnonymous}
                onCheckedChange={setIsAnonymous}
              />
            </div>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={selectedMood === null || loading}
            className={`btn text-lg px-8 py-3 ${selectedMood === null
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'btn-primary'
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Sharing...
              </>
            ) : (
              <>
                <Star className="w-5 h-5" />
                Share Mood
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrackMoodPage;
