import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import GoogleLoginButton from '../components/GoogleLoginButton'
import { Heart } from 'lucide-react'

const LoginPage = () => {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && !isLoading) {
      navigate('/home')
    }
  }, [user, isLoading, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <Heart className="h-12 w-12 text-blue-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">MoodTrack</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            欢迎使用心情追踪器
          </h2>
          <p className="text-gray-600 mb-8">
            记录你的每日心情，与他人分享情感体验，建立更好的情绪健康习惯
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              登录你的账户
            </h3>
            <p className="text-gray-600 text-sm">
              使用Google账号快速登录，安全便捷
            </p>
          </div>

          <div className="flex justify-center">
            <GoogleLoginButton
              onSuccess={() => {
                console.log('Google login button rendered successfully')
              }}
              onError={(error) => {
                console.error('Google login button error:', error)
              }}
            />
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              登录即表示你同意我们的服务条款和隐私政策
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
              心情记录
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
              社交分享
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
              数据分析
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage