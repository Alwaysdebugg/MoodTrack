import { AnonymousUser, MoodMatch, InteractionType } from '../types/social';

// 生成匿名用户身份
export const generateAnonymousUser = (): AnonymousUser => {
  const nicknames = [
    '温暖的向日葵',
    '勇敢的小树',
    '坚强的云朵',
    '平静的湖水',
    '乐观的星星',
    '智慧的月亮',
    '温柔的微风',
    '坚韧的竹子',
    '纯真的雪花',
    '希望的晨光',
    '安静的山谷',
    '活力的彩虹',
    '宁静的森林',
    '美好的花朵',
    '自由的鸟儿',
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
    lastActive: new Date(Date.now() - Math.random() * 1800000).toISOString(), // 0-30分钟前
  };
};

// 计算情绪相似度
export const calculateMoodSimilarity = (
  mood1: number,
  mood2: number,
  tags1: string[],
  tags2: string[]
): number => {
  // 情绪评分相似度 (40%权重)
  const moodSimilarity = Math.max(0, 1 - Math.abs(mood1 - mood2) / 4) * 0.4;

  // 标签匹配度 (35%权重)
  const commonTags = tags1.filter(tag => tags2.includes(tag));
  const tagSimilarity =
    (commonTags.length / Math.max(tags1.length, tags2.length, 1)) * 0.35;

  // 时间接近度 (15%权重) - 这里简化处理
  const timeSimilarity = 0.15;

  // 用户活跃度 (10%权重) - 这里简化处理
  const activitySimilarity = 0.1;

  return Math.round(
    (moodSimilarity + tagSimilarity + timeSimilarity + activitySimilarity) * 100
  );
};

// 生成模拟的情绪匹配数据
export const generateMockMoodMatches = (
  currentMood: number,
  currentTags: string[]
): MoodMatch[] => {
  const matches: MoodMatch[] = [];
  const matchCount = Math.floor(Math.random() * 6) + 3; // 3-8个匹配

  for (let i = 0; i < matchCount; i++) {
    const user = generateAnonymousUser();
    const matchMood = currentMood + (Math.random() - 0.5) * 2; // ±1分范围
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
      timestamp: new Date(Date.now() - Math.random() * 7200000).toISOString(), // 0-2小时前
      similarity,
      sharedTags: currentTags.slice(
        0,
        Math.floor(Math.random() * currentTags.length) + 1
      ),
      emotionPreview: generateEmotionPreview(),
      city: Math.random() > 0.5 ? '同城' : undefined,
      timeAgo: formatTimeAgo(new Date(Date.now() - Math.random() * 7200000)),
    });
  }

  return matches.sort((a, b) => b.similarity - a.similarity);
};

// 获取心情标签
export const getMoodLabel = (mood: number): string => {
  const labels = ['', '很糟糕', '不好', '一般', '不错', '很棒'];
  return labels[Math.max(1, Math.min(5, mood))];
};

// 生成情绪预览文本
export const generateEmotionPreview = (): string => {
  const previews = [
    '今天工作中遇到了一些挫折，感觉有些沮丧...',
    '最近压力比较大，需要找个人聊聊...',
    '心情不错，想分享一些开心的事情...',
    '对未来感到一些不确定，希望能得到支持...',
    '今天发生了一件让我很感动的事...',
    '最近在思考人生的意义，有些迷茫...',
    '工作上有了新的突破，很兴奋...',
    '和朋友发生了一些小矛盾，心情复杂...',
  ];
  return previews[Math.floor(Math.random() * previews.length)];
};

// 格式化时间差
export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 1) return '刚刚';
  if (diffMins < 60) return `${diffMins}分钟前`;
  if (diffHours < 24) return `${diffHours}小时前`;
  return `${Math.floor(diffHours / 24)}天前`;
};

// 互动类型定义
export const interactionTypes: InteractionType[] = [
  {
    id: 'like',
    label: '点赞',
    emoji: '👍',
    description: '点赞',
  },
  {
    id: 'unlike',
    label: '不喜欢',
    emoji: '☹️',
    description: '不喜欢',
  },
];

// 生成AI回复建议
export const generateAIReplySuggestions = (mood: number): string[] => {
  const suggestions: { [key: number]: string[] } = {
    1: [
      '虽然现在很困难，但你并不孤单，我们都在这里支持你',
      '每个人都会有低谷期，相信明天会更好',
      '你愿意分享这些感受已经很勇敢了',
    ],
    2: [
      '理解你现在的感受，有时候生活确实不容易',
      '你的感受是完全正常的，给自己一些时间',
      '希望你能找到让自己舒服一些的方法',
    ],
    3: [
      '平静的心情也是很珍贵的',
      '有时候平稳就是一种幸福',
      '希望你能保持这种内心的平和',
    ],
    4: [
      '很高兴听到你心情不错！',
      '你的积极能量很感染人',
      '希望这份好心情能继续保持下去',
    ],
    5: [
      '你的快乐很有感染力！',
      '太棒了！你的好心情让我也感到开心',
      '希望你能继续享受这美好的时光',
    ],
  };

  return suggestions[Math.max(1, Math.min(5, mood))] || suggestions[3];
};

// 处理敏感内容
export const processContent = (content: string): string => {
  // 简化的内容处理逻辑
  let processed = content;

  // 移除可能的个人信息
  processed = processed.replace(/我叫\S+|我是\S+/g, '我');
  processed = processed.replace(/\d{11}|\d{3}-\d{4}-\d{4}/g, '[联系方式]');
  processed = processed.replace(/\S+公司|\S+学校/g, '[工作/学习场所]');

  // 软化负面表达
  processed = processed.replace(/想死|不想活/g, '很难过');
  processed = processed.replace(/恨|讨厌/g, '不喜欢');

  return processed;
};
