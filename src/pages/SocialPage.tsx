import { Link } from 'react-router-dom'
import { Heart, Users, TrendingUp, MessageCircle, Search, Settings, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'
import { generateAnonymousUser } from '../utils/socialUtils'
import { AnonymousUser } from '../types/social'

const SocialPage = () => {
  const [currentUser, setCurrentUser] = useState<AnonymousUser | null>(null)
  const [onlineUsers, setOnlineUsers] = useState(0)

  useEffect(() => {
    // 生成当前用户的匿名身份
    const user = generateAnonymousUser()
    setCurrentUser(user)
    
    // 模拟在线用户数量
    setOnlineUsers(Math.floor(Math.random() * 200) + 50)
  }, [])

  return (
    <div className="space-y-6">
      {/* 头部欢迎区域 */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          情绪社交空间
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          在匿名安全的环境中，与有相似感受的人建立温暖连接
        </p>
      </div>

      {/* 当前匿名身份卡片 */}
      {currentUser && (
        <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full ${currentUser.avatar} flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">😊</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">当前身份</h3>
                <p className="text-gray-600">{currentUser.nickname}</p>
                <p className="text-sm text-gray-500">匿名ID: {currentUser.id.slice(-8)}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-green-600 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">在线</span>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                <Shield className="w-4 h-4 inline mr-1" />
                隐私设置
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 实时统计 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center bg-orange-50 border-orange-200">
          <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-orange-700">{onlineUsers}</p>
          <p className="text-sm text-orange-600">在线用户</p>
        </div>
        <div className="card text-center bg-teal-50 border-teal-200">
          <Heart className="w-8 h-8 text-teal-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-teal-700">1.2k</p>
          <p className="text-sm text-teal-600">今日互动</p>
        </div>
        <div className="card text-center bg-purple-50 border-purple-200">
          <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-700">86</p>
          <p className="text-sm text-purple-600">活跃话题</p>
        </div>
        <div className="card text-center bg-green-50 border-green-200">
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-700">94%</p>
          <p className="text-sm text-green-600">积极互动</p>
        </div>
      </div>

      {/* 主要功能区域 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">发现与连接</h2>
          
          <Link to="/social/match" className="card block hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">寻找同感者</h3>
                <p className="text-gray-600 text-sm">找到与你有相似情绪体验的人</p>
                <p className="text-sm text-blue-600 mt-1">发现 3 个匹配用户</p>
              </div>
            </div>
          </Link>

          <Link to="/social/community" className="card block hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-400 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">情绪社区</h3>
                <p className="text-gray-600 text-sm">参与话题讨论，分享情绪体验</p>
                <p className="text-sm text-green-600 mt-1">7 个热门话题</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">个人洞察</h2>
          
          <Link to="/social/insights" className="card block hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">社交洞察</h3>
                <p className="text-gray-600 text-sm">了解你的社交影响力和成长</p>
                <p className="text-sm text-purple-600 mt-1">本月互动 +25%</p>
              </div>
            </div>
          </Link>

          <div className="card bg-gray-50">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">隐私设置</h3>
                <p className="text-gray-600 text-sm">管理你的社交偏好和隐私控制</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 最近互动预览 */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">最近互动</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-2xl">🤝</span>
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                <span className="font-medium">温暖的云朵</span> 对你的分享表示同感
              </p>
              <p className="text-xs text-gray-500">5分钟前</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <span className="text-2xl">🤗</span>
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                <span className="font-medium">勇敢的小树</span> 给了你一个拥抱
              </p>
              <p className="text-xs text-gray-500">12分钟前</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
            <span className="text-2xl">💡</span>
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                你的分享帮助了 <span className="font-medium">平静的湖水</span>
              </p>
              <p className="text-xs text-gray-500">25分钟前</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <Link to="/social/insights" className="text-blue-600 hover:text-blue-700 text-sm">
            查看所有互动 →
          </Link>
        </div>
      </div>

      {/* 隐私提醒 */}
      <div className="card bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-amber-600 mt-1" />
          <div>
            <h4 className="font-semibold text-amber-800 mb-1">隐私保护提醒</h4>
            <p className="text-sm text-amber-700">
              我们使用匿名身份保护你的隐私，所有数据都经过脱敏处理。你可以随时刷新身份或退出社交功能。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialPage