import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Heart, AlertCircle, CheckCircle } from 'lucide-react'

const LoginCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { handleCallbackToken } = useAuth()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const processCallback = async () => {
      const token = searchParams.get('token')
      const error = searchParams.get('error')

      if (error) {
        setStatus('error')
        setMessage(`登录失败: ${error}`)
        setTimeout(() => {
          navigate('/login')
        }, 3000)
        return
      }

      if (!token) {
        setStatus('error')
        setMessage('未找到有效的登录凭证')
        setTimeout(() => {
          navigate('/login')
        }, 3000)
        return
      }

      try {
        const result = await handleCallbackToken(token)
        
        if (result.success) {
          setStatus('success')
          setMessage('登录成功！正在跳转到首页...')
          setTimeout(() => {
            navigate('/home')
          }, 1500)
        } else {
          setStatus('error')
          setMessage('登录验证失败，请重试')
          setTimeout(() => {
            navigate('/login')
          }, 3000)
        }
      } catch (error) {
        console.error('Login callback error:', error)
        setStatus('error')
        setMessage('登录过程中发生错误，请重试')
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }
    }

    processCallback()
  }, [searchParams, handleCallbackToken, navigate])

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">正在处理登录...</h2>
            <p className="text-gray-600">请稍候，我们正在验证您的登录信息</p>
          </>
        )
      case 'success':
        return (
          <>
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">登录成功！</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )
      case 'error':
        return (
          <>
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">登录失败</h2>
            <p className="text-gray-600">{message}</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              返回登录页
            </button>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <Heart className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">MoodTrack</h1>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default LoginCallback