// Mock mood trend: last 7 days, mood score 1–5
export const mockMoodTrendData = (): { date: string; score: number }[] => {
  const days = 7;
  const data: { date: string; score: number }[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    data.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score: Math.round(2 + Math.random() * 3), // 2–5
    });
  }
  return data;
};

// Mock mood trend: last 30 days (for detailed analysis page)
export const mockMoodTrendData30Days = (): {
  date: string;
  score: number;
}[] => {
  const days = 30;
  const data: { date: string; score: number }[] = [];
  const today = new Date();
  let score = 3;
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    score = Math.max(1, Math.min(5, score + (Math.random() - 0.48) * 2));
    data.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score: Math.round(score * 10) / 10,
    });
  }
  return data;
};

// Mock mood distribution: count per mood type
export const mockMoodDistribution = (): { name: string; value: number }[] => [
  { name: 'Very Bad', value: 4 },
  { name: 'Bad', value: 8 },
  { name: 'Neutral', value: 18 },
  { name: 'Good', value: 22 },
  { name: 'Excellent', value: 12 },
];

// Mock: average mood by weekday (for detailed analysis)
export const mockMoodByWeekday = (): {
  day: string;
  avg: number;
  count: number;
}[] => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day, i) => ({
    day,
    avg: 2.8 + Math.random() * 1.4 + (i >= 5 ? 0.3 : 0), // weekend slightly higher
    count: 8 + Math.floor(Math.random() * 12),
  }));
};

// Mock: trigger frequency (for detailed analysis)
export const mockTriggerDistribution = (): {
  name: string;
  value: number;
}[] => [
  { name: 'Work Stress', value: 24 },
  { name: 'Sleep Quality', value: 18 },
  { name: 'Exercise', value: 14 },
  { name: 'Relationships', value: 12 },
  { name: 'Weather', value: 10 },
  { name: 'Health', value: 8 },
  { name: 'Entertainment', value: 7 },
  { name: 'Other', value: 5 },
];

// Mock: weekly comparison (last 4 weeks average)
export const mockWeeklyAverages = (): { week: string; avg: number }[] => {
  const weeks = 4;
  const data: { week: string; avg: number }[] = [];
  const today = new Date();
  for (let i = weeks - 1; i >= 0; i--) {
    const end = new Date(today);
    end.setDate(end.getDate() - i * 7);
    const start = new Date(end);
    start.setDate(start.getDate() - 6);
    data.push({
      week: `${start.toLocaleDateString('en-US', { month: 'short' })} ${start.getDate()} - ${end.getDate()}`,
      avg: 2.5 + Math.random() * 1.8,
    });
  }
  return data;
};
