import type { EmotionTopic, CommunityPost } from '@/types/social';

export const mockCommunityTopics: EmotionTopic[] = [
  {
    id: 'stress',
    name: 'Stress & Anxiety',
    slug: 'stress-anxiety',
    description: 'Share and support around stress and anxiety',
    emoji: '😰',
    participantCount: 1240,
    trending: true,
    recentPosts: 89,
    tags: ['stress', 'anxiety', 'relaxation'],
  },
  {
    id: 'happiness',
    name: 'Happiness & Gratitude',
    slug: 'happiness-gratitude',
    description: 'Celebrate good moments and gratitude',
    emoji: '😊',
    participantCount: 2100,
    trending: true,
    recentPosts: 156,
    tags: ['happy', 'gratitude', 'joy'],
  },
  {
    id: 'sadness',
    name: 'Sadness & Grief',
    slug: 'sadness-grief',
    description: 'A safe space for difficult emotions',
    emoji: '😢',
    participantCount: 890,
    trending: false,
    recentPosts: 42,
    tags: ['sad', 'grief', 'support'],
  },
  {
    id: 'work',
    name: 'Work & Career',
    slug: 'work-career',
    description: 'Mood and emotions at work',
    emoji: '💼',
    participantCount: 1650,
    trending: false,
    recentPosts: 78,
    tags: ['work', 'career', 'balance'],
  },
];

const mockUsers = [
  {
    id: 'u1',
    name: 'Warm Sunflower',
    email: '',
    avatar: 'bg-gradient-to-br from-pink-400 to-purple-400',
  },
  {
    id: 'u2',
    name: 'Calm Lake',
    email: '',
    avatar: 'bg-gradient-to-br from-blue-400 to-teal-400',
  },
  {
    id: 'u3',
    name: 'Brave Little Tree',
    email: '',
    avatar: 'bg-gradient-to-br from-green-400 to-emerald-400',
  },
  {
    id: 'u4',
    name: 'Hopeful Dawn',
    email: '',
    avatar: 'bg-gradient-to-br from-yellow-400 to-orange-400',
  },
  {
    id: 'u5',
    name: 'Wise Moon',
    email: '',
    avatar: 'bg-gradient-to-br from-purple-400 to-indigo-400',
  },
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'p1',
    user: mockUsers[0],
    content:
      'Had a rough day at work but managed to take a short walk. Feeling a bit better now.',
    note: '',
    mood: 3,
    mood_type: 'neutral',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    interactions: { like: 12, unlike: 0 },
    userInteraction: null,
    replies: [
      {
        id: 'r1',
        user: mockUsers[1],
        content: 'Walking helps so much. Proud of you for taking that step!',
        timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
      },
    ],
    tags: ['work', 'stress', 'walk'],
  },
  {
    id: 'p2',
    user: mockUsers[2],
    content:
      'Grateful for the small things today: good coffee, a message from a friend, sunshine.',
    note: '',
    mood: 5,
    mood_type: 'excellent',
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    interactions: { like: 28, unlike: 1 },
    userInteraction: null,
    replies: [],
    tags: ['gratitude', 'happy'],
  },
  {
    id: 'p3',
    user: mockUsers[3],
    content:
      'Feeling overwhelmed with deadlines. Anyone else struggling to find balance?',
    note: '',
    mood: 2,
    mood_type: 'bad',
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    interactions: { like: 45, unlike: 2 },
    userInteraction: null,
    replies: [
      {
        id: 'r2',
        user: mockUsers[4],
        content: 'You are not alone. Try breaking tasks into smaller steps.',
        timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      },
    ],
    tags: ['work', 'stress', 'balance'],
  },
];
