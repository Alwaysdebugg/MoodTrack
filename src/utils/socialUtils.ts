import { AnonymousUser, MoodMatch, InteractionType } from '../types/social';

// Generate anonymous user identity
export const generateAnonymousUser = (): AnonymousUser => {
  const nicknames = [
    'Warm Sunflower',
    'Brave Little Tree',
    'Strong Cloud',
    'Calm Lake',
    'Optimistic Star',
    'Wise Moon',
    'Gentle Breeze',
    'Resilient Bamboo',
    'Pure Snowflake',
    'Hopeful Dawn',
    'Quiet Valley',
    'Vibrant Rainbow',
    'Peaceful Forest',
    'Beautiful Flower',
    'Free Bird',
  ];

  const avatarColors = [
    'bg-gradient-to-br from-pink-400 to-purple-400',
    'bg-gradient-to-br from-blue-400 to-teal-400',
    'bg-gradient-to-br from-green-400 to-emerald-400',
    'bg-gradient-to-br from-yellow-400 to-orange-400',
    'bg-gradient-to-br from-purple-400 to-indigo-400',
    'bg-gradient-to-br from-red-400 to-pink-400',
  ];

  const randomId = `mood_${Math.random().toString(36).substr(2, 9)}_${Date.now().toString().slice(-6)}`;
  const randomNickname =
    nicknames[Math.floor(Math.random() * nicknames.length)];
  const randomAvatar =
    avatarColors[Math.floor(Math.random() * avatarColors.length)];

  return {
    id: randomId,
    nickname: randomNickname,
    avatar: randomAvatar,
    isOnline: Math.random() > 0.5,
    lastActive: new Date(Date.now() - Math.random() * 1800000).toISOString(), // 0-30 minutes ago
  };
};

// Calculate mood similarity
export const calculateMoodSimilarity = (
  mood1: number,
  mood2: number,
  tags1: string[],
  tags2: string[]
): number => {
  // Mood score similarity (40% weight)
  const moodSimilarity = Math.max(0, 1 - Math.abs(mood1 - mood2) / 4) * 0.4;

  // Tag match rate (35% weight)
  const commonTags = tags1.filter(tag => tags2.includes(tag));
  const tagSimilarity =
    (commonTags.length / Math.max(tags1.length, tags2.length, 1)) * 0.35;

  // Time proximity (15% weight) - simplified here
  const timeSimilarity = 0.15;

  // User activity (10% weight) - simplified here
  const activitySimilarity = 0.1;

  return Math.round(
    (moodSimilarity + tagSimilarity + timeSimilarity + activitySimilarity) * 100
  );
};

// Generate mock mood match data
export const generateMockMoodMatches = (
  currentMood: number,
  currentTags: string[]
): MoodMatch[] => {
  const matches: MoodMatch[] = [];
  const matchCount = Math.floor(Math.random() * 6) + 3; // 3-8 matches

  for (let i = 0; i < matchCount; i++) {
    const user = generateAnonymousUser();
    const matchMood = currentMood + (Math.random() - 0.5) * 2; // ±1 point range
    const similarity = calculateMoodSimilarity(
      currentMood,
      matchMood,
      currentTags,
      currentTags
    );

    matches.push({
      user,
      mood: Math.max(1, Math.min(5, Math.round(matchMood))),
      moodLabel: getMoodLabel(Math.round(matchMood)),
      timestamp: new Date(Date.now() - Math.random() * 7200000).toISOString(), // 0-2 hours ago
      similarity,
      sharedTags: currentTags.slice(
        0,
        Math.floor(Math.random() * currentTags.length) + 1
      ),
      emotionPreview: generateEmotionPreview(),
      city: Math.random() > 0.5 ? 'Same City' : undefined,
      timeAgo: formatTimeAgo(new Date(Date.now() - Math.random() * 7200000)),
    });
  }

  return matches.sort((a, b) => b.similarity - a.similarity);
};

// Get mood label
export const getMoodLabel = (mood: number): string => {
  const labels = ['', 'Very Bad', 'Bad', 'Neutral', 'Good', 'Excellent'];
  return labels[Math.max(1, Math.min(5, mood))];
};

// Generate emotion preview text
export const generateEmotionPreview = (): string => {
  const previews = [
    'Encountered some setbacks at work today, feeling a bit down...',
    'Been under a lot of pressure lately, need someone to talk to...',
    'Feeling good, want to share some happy things...',
    'Feeling uncertain about the future, hoping for support...',
    'Something touching happened today...',
    'Been thinking about the meaning of life lately, feeling confused...',
    'Made a breakthrough at work, very excited...',
    'Had a small conflict with a friend, feeling complicated...',
  ];
  return previews[Math.floor(Math.random() * previews.length)];
};

// Format time difference
export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${Math.floor(diffHours / 24)} days ago`;
};

// Interaction type definitions
export const interactionTypes: InteractionType[] = [
  {
    id: 'like',
    label: 'Like',
    emoji: '👍',
    description: 'Like',
  },
  {
    id: 'unlike',
    label: 'Dislike',
    emoji: '☹️',
    description: 'Dislike',
  },
];

// Generate AI reply suggestions
export const generateAIReplySuggestions = (mood: number): string[] => {
  const suggestions: { [key: number]: string[] } = {
    1: [
      'Even though things are difficult right now, you are not alone. We are all here to support you',
      'Everyone goes through low periods. Believe that tomorrow will be better',
      'It is already brave of you to share these feelings',
    ],
    2: [
      'I understand how you feel. Sometimes life is indeed not easy',
      'Your feelings are completely normal. Give yourself some time',
      'Hope you can find ways to make yourself feel more comfortable',
    ],
    3: [
      'A calm mood is also precious',
      'Sometimes stability is a form of happiness',
      'Hope you can maintain this inner peace',
    ],
    4: [
      'Glad to hear you are feeling good!',
      'Your positive energy is very infectious',
      'Hope this good mood can continue',
    ],
    5: [
      'Your happiness is very infectious!',
      'Great! Your good mood makes me happy too',
      'Hope you can continue to enjoy these beautiful moments',
    ],
  };

  return suggestions[Math.max(1, Math.min(5, mood))] || suggestions[3];
};

// Process sensitive content
export const processContent = (content: string): string => {
  // Simplified content processing logic
  let processed = content;

  // Remove possible personal information
  processed = processed.replace(/我叫\S+|我是\S+/g, 'I');
  processed = processed.replace(/\d{11}|\d{3}-\d{4}-\d{4}/g, '[Contact]');
  processed = processed.replace(/\S+公司|\S+学校/g, '[Work/School]');

  // Soften negative expressions
  processed = processed.replace(/想死|不想活/g, 'very sad');
  processed = processed.replace(/恨|讨厌/g, 'dislike');

  return processed;
};
