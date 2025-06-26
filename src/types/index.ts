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
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: GoogleInitConfig) => void
          renderButton: (element: HTMLElement, config: GoogleButtonConfig) => void
          prompt: () => void
          disableAutoSelect: () => void
        }
      }
    }
  }
}

export interface GoogleInitConfig {
  client_id: string
  callback: (response: GoogleCredentialResponse) => void
  auto_select?: boolean
  cancel_on_tap_outside?: boolean
}

export interface GoogleButtonConfig {
  theme?: 'outline' | 'filled_blue' | 'filled_black'
  size?: 'large' | 'medium' | 'small'
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
  shape?: 'rectangular' | 'pill' | 'circle' | 'square'
  logo_alignment?: 'left' | 'center'
  width?: string | number
  locale?: string
}

export interface GoogleCredentialResponse {
  credential: string
  select_by: string
}

export interface GoogleJwtPayload {
  iss: string
  azp: string
  aud: string
  sub: string
  email: string
  email_verified: boolean
  name: string
  picture: string
  given_name: string
  family_name: string
  iat: number
  exp: number
}