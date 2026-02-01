const MOOD_ENTRIES_KEY = 'moodEntries';

export interface StoredMoodEntry {
  triggers: string[];
  mood_type: string;
  note: string;
  is_public: boolean;
  is_anonymous: boolean;
  created_at: string;
}

export function getMoodEntries(): StoredMoodEntry[] {
  try {
    const raw = localStorage.getItem(MOOD_ENTRIES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveMoodEntry(entry: StoredMoodEntry): void {
  const entries = getMoodEntries();
  entries.push(entry);
  localStorage.setItem(MOOD_ENTRIES_KEY, JSON.stringify(entries));
}
