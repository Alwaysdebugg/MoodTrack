import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, AuthContextType } from '../types'
import { authAPI } from '../utils/api'

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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 处理来自OAuth回调的token
  const handleCallbackToken = async (token: string) => {
    try {
      setIsLoading(true)
      
      // 发送token到后端进行验证
      const { user, accessToken } = await authAPI.verifyCallbackToken(token)
      
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('accessToken', accessToken)
      setIsLoading(false)
      
      return { success: true, user }
    } catch (error) {
      console.error('Authentication failed:', error)
      setIsLoading(false)
      return { success: false, error }
    }
  }

  const login = () => {
    // 重定向到Google OAuth登录
    const googleLoginUrl = authAPI.getGoogleLoginUrl()
    window.location.href = googleLoginUrl
  }

  const logout = async () => {
    try {
      // 通知后端登出
      await authAPI.logout()
    } catch (error) {
      console.error('Logout API failed:', error)
    } finally {
      // 清除本地状态
      setUser(null)
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
    }
  }

  const refreshUserFromStorage = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        return parsedUser
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
      }
    }
    return null
  }

  useEffect(() => {
    refreshUserFromStorage()
    setIsLoading(false)
  }, [])

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    handleCallbackToken,
    refreshUserFromStorage
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}