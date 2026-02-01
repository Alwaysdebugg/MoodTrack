export interface AnonymousUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isOnline?: boolean;
  lastActive?: string;
}

export interface MoodMatch {
  user: AnonymousUser;
  mood: number;
  moodLabel: string;
  timestamp: string;
  similarity: number;
  sharedTags: string[];
  emotionPreview?: string;
  city?: string;
  timeAgo: string;
}

export interface InteractionType {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

export interface SocialInteraction {
  id: string;
  type: InteractionType;
  fromUser: AnonymousUser;
  toUser: AnonymousUser;
  timestamp: string;
  content?: string;
}

export interface EmotionTopic {
  id: string;
  name: string;
  slug: string;
  description: string;
  emoji: string;
  participantCount: number;
  trending: boolean;
  recentPosts: number;
  tags: string[];
}

export interface CommunityPost {
  id: string;
  user: AnonymousUser;
  content: string;
  note: string;
  processedContent?: string;
  mood: number;
  mood_type: string;
  created_at: string;
  updated_at: string;
  interactions: {
    like: number;
    unlike: number;
  };
  userInteraction?: 'like' | 'unlike' | null; // Current user's interaction state
  replies: CommunityReply[];
  tags: string[];
}

export interface CommunityReply {
  id: string;
  user: AnonymousUser;
  content: string;
  timestamp: string;
  isAIGenerated?: boolean;
}

export interface SocialInsight {
  period: string;
  totalInteractions: number;
  interactionsReceived: number;
  interactionsGiven: number;
  mostCommonMoodMatch: number;
  supportImpact: number;
  communityEngagement: number;
  positiveInfluence: number;
}

export interface NotificationSetting {
  matchAlerts: boolean;
  interactionAlerts: boolean;
  communityUpdates: boolean;
  frequency: 'realtime' | 'hourly' | 'daily' | 'off';
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export interface PrivacySettings {
  allowGeographicMatching: boolean;
  shareLocationCity: boolean;
  allowContentSharing: boolean;
  anonymityLevel: 'basic' | 'enhanced' | 'maximum';
  dataRetention: 1 | 7 | 30; // days
}
