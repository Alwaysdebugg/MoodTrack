export interface MoodEntry {
  mood: number
  note: string
  timestamp: string
}

export interface MoodOption {
  id: number
  label: string
  color: string
  bg: string
}

export interface User {
  id: string
  email: string
  name: string
  picture?: string
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: () => void
  logout: () => void
  handleCallbackToken: (token: string) => Promise<{ success: boolean; user?: User; error?: any }>
  refreshUserFromStorage: () => User | null
}

