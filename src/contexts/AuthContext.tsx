import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, AuthContextType } from '../types'
import { authAPI } from '../utils/api'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

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

  const login = (token: string) => {
    // 解析token获取用户信息
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      console.error('Parsed payload:', payload)
      const user: User = {
        id: payload.sub || payload.id,
        email: payload.email,
        name: payload.name || payload.username,
        picture: payload.picture
      }
      
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
    } catch (error) {
      console.error('Failed to parse token:', error)
    }
  }

  const logout = async () => {
    try {
      // 通知后端登出
      const token = localStorage.getItem('token')
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
      }
    } catch (error) {
      console.error('Logout API failed:', error)
    } finally {
      // 清除本地状态
      setUser(null)
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      navigate('/login') // 重定向到登录页
    }
  }

  const refreshUserFromStorage = () => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        return parsedUser
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
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