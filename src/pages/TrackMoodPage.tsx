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
  const [isAnonymous, setIsAnonymous] = useState(false); // Whether to be anonymous

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
    'Financial Situation',
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

    // Save to local storage
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
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-apple-xl backdrop-blur-xl flex items-center space-x-3 animate-bounce-in">
          <CheckCircle className="w-6 h-6" strokeWidth={2.5} />
          <span className="font-semibold text-lg">Recorded Successfully</span>
        </div>
      )}

      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-apple-text mb-6 tracking-tight">Track Your Mood</h1>
        <p className="text-xl text-apple-secondary leading-relaxed">
          Select the mood that best matches your current feelings and add some notes
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-8 text-apple-text">How are you feeling today?</h2>
          <div className="grid grid-cols-5 gap-5">
            {moods.map(({ id, label, icon: Icon, color, bg }) => (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedMood(id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${selectedMood === id
                  ? 'border-apple-blue bg-apple-blue/5 shadow-apple scale-105'
                  : 'border-gray-200/50 hover:border-gray-300 hover:shadow-apple'
                  } ${bg} backdrop-blur-sm`}
              >
                <Icon className={`w-10 h-10 mx-auto mb-3 ${color}`} strokeWidth={2.5} />
                <span className="text-sm font-semibold text-apple-text">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold mb-8 flex items-center text-apple-text">
            <Tag className="w-6 h-6 mr-3" strokeWidth={2.5} />
            Trigger
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-2">
            {triggerOptions.map(trigger => (
              <button
                key={trigger}
                type="button"
                onClick={() => toggleTrigger(trigger)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${selectedTriggers.includes(trigger)
                  ? 'bg-apple-blue/10 text-apple-blue border-2 border-apple-blue/30 shadow-apple'
                  : 'bg-gray-100/80 text-apple-text border-2 border-transparent hover:bg-gray-200/80 hover:shadow-sm'
                  }`}
              >
                {trigger}
              </button>
            ))}
          </div>
          {selectedTriggers.length > 0 && (
            <div className="mt-6 p-5 bg-apple-blue/5 rounded-2xl border border-apple-blue/20">
              <p className="text-sm font-semibold text-apple-blue mb-3">Selected triggers:</p>
              <div className="flex flex-wrap gap-2.5">
                {selectedTriggers.map(trigger => (
                  <span
                    key={trigger}
                    className="inline-block bg-apple-blue/20 text-apple-blue text-sm font-medium px-4 py-2 rounded-xl"
                  >
                    {trigger}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold mb-6 text-apple-text">Add Notes</h2>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Record what happened today or describe your feelings..."
            className="w-full p-5 border-2 border-gray-200/50 rounded-2xl resize-none focus:ring-2 focus:ring-apple-blue/50 focus:border-apple-blue/50 transition-all duration-300 text-apple-text placeholder:text-apple-secondary bg-white/50 backdrop-blur-sm"
            rows={5}
          />
        </div>

        {/* Share to community options */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-8 text-apple-text">Share Settings</h2>

          {/* Share to community switch */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200/50">
            <div className="flex-1">
              <label htmlFor="public-switch" className="text-base font-semibold text-apple-text cursor-pointer">
                Share to Community
              </label>
              <p className="text-sm text-apple-secondary mt-2 leading-relaxed">
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
                <label htmlFor="anonymous-switch" className="text-base font-semibold text-apple-text cursor-pointer">
                  Share Anonymously
                </label>
                <p className="text-sm text-apple-secondary mt-2 leading-relaxed">
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
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={selectedMood === null || loading}
            className={`btn text-lg px-12 py-4 ${selectedMood === null
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
              : 'btn-primary shadow-apple-lg hover:shadow-apple-xl'
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 mr-2 animate-spin" strokeWidth={2.5} />
                Sharing...
              </>
            ) : (
              <>
                <Star className="w-6 h-6 mr-2" strokeWidth={2.5} />
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
