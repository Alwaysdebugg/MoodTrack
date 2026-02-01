import { useState } from 'react';
import { Smile, Frown, Meh, Heart, Star, Tag, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { saveMoodEntry } from '@/utils/moodStorage';
import { toast } from 'sonner';

const TrackMoodPage = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMood === null) return;

    const moodEntry = {
      triggers: selectedTriggers,
      mood_type: moodTypeMapping[selectedMood],
      note: note.trim(),
      is_public: isPublic,
      is_anonymous: isAnonymous,
      created_at: new Date().toISOString(),
    };

    setLoading(true);
    try {
      saveMoodEntry(moodEntry);
      toast.success('Mood recorded successfully');
      setSelectedMood(null);
      setNote('');
      setSelectedTriggers([]);
      setIsPublic(true);
      setIsAnonymous(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 px-0 sm:px-0">
      <div className="text-center space-y-2 px-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Track Your Mood
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Select the mood that best matches your current feelings and add some
          notes
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">
              How are you feeling today?
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
              {moods.map(({ id, label, icon: Icon, color, bg }) => (
                <Button
                  key={id}
                  type="button"
                  variant={selectedMood === id ? 'default' : 'outline'}
                  className={`h-auto flex-col gap-1 sm:gap-2 py-3 sm:py-4 min-h-[72px] sm:min-h-0 ${selectedMood === id ? '' : bg}`}
                  onClick={() => setSelectedMood(id)}
                >
                  <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${color}`} />
                  <span className="text-xs font-medium">{label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Tag className="w-4 h-4 sm:w-5 sm:h-5" />
              Triggers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="flex flex-wrap gap-2">
              {triggerOptions.map(trigger => (
                <Button
                  key={trigger}
                  type="button"
                  variant={
                    selectedTriggers.includes(trigger) ? 'default' : 'secondary'
                  }
                  size="sm"
                  className="min-h-[40px] sm:min-h-0"
                  onClick={() => toggleTrigger(trigger)}
                >
                  {trigger}
                </Button>
              ))}
            </div>
            {selectedTriggers.length > 0 && (
              <p className="text-sm text-muted-foreground mt-3">
                Selected: {selectedTriggers.join(', ')}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Add Notes</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <Textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Record what happened today, or describe your feelings..."
              rows={4}
              className="resize-none"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">
              Share Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-4 sm:p-6 pt-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Share to Community</p>
                <p className="text-sm text-muted-foreground">
                  When enabled, your mood entry will be displayed in the
                  community
                </p>
              </div>
              <Switch checked={isPublic} onCheckedChange={setIsPublic} />
            </div>
            {isPublic && (
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="font-medium">Share Anonymously</p>
                  <p className="text-sm text-muted-foreground">
                    When enabled, your username will not be displayed
                  </p>
                </div>
                <Switch
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            disabled={selectedMood === null || loading}
            className="gap-2 min-h-[48px] w-full sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Star className="w-5 h-5" />
                Save Mood
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TrackMoodPage;
