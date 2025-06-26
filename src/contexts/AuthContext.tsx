import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, AuthContextType, GoogleCredentialResponse, GoogleJwtPayload } from '../types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const decodeJwtResponse = (token: string): GoogleJwtPayload => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  }

  const handleCredentialResponse = (response: GoogleCredentialResponse) => {
    try {
      const userObject = decodeJwtResponse(response.credential)
      const userData: User = {
        id: userObject.sub,
        email: userObject.email,
        name: userObject.name,
        picture: userObject.picture
      }
      
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to decode JWT:', error)
      setIsLoading(false)
    }
  }

  const login = () => {
    if (window.google) {
      window.google.accounts.id.prompt()
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    if (window.google) {
      window.google.accounts.id.disableAutoSelect()
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google && GOOGLE_CLIENT_ID) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true
        })
      }
    }

    if (window.google) {
      initializeGoogleSignIn()
    } else {
      const checkGoogle = setInterval(() => {
        if (window.google) {
          initializeGoogleSignIn()
          clearInterval(checkGoogle)
        }
      }, 100)

      return () => clearInterval(checkGoogle)
    }
  }, [])

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}