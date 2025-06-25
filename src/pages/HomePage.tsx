import { Link } from 'react-router-dom'
import { Heart, TrendingUp, Calendar } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          欢迎使用 MoodTrack
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          记录你的心情变化，了解情绪模式，让每一天都更有意义
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="card text-center">
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">记录心情</h3>
          <p className="text-gray-600 mb-4">
            快速记录当下的心情状态
          </p>
          <Link to="/track" className="btn btn-primary">
            开始记录
          </Link>
        </div>

        <div className="card text-center">
          <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">趋势分析</h3>
          <p className="text-gray-600 mb-4">
            查看心情变化趋势和统计
          </p>
          <Link to="/history" className="btn btn-secondary">
            查看分析
          </Link>
        </div>

        <div className="card text-center">
          <Calendar className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">历史记录</h3>
          <p className="text-gray-600 mb-4">
            浏览过往的心情记录
          </p>
          <Link to="/history" className="btn btn-secondary">
            查看历史
          </Link>
        </div>
      </div>

      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-none">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            今天心情如何？
          </h2>
          <p className="text-gray-600 mb-6">
            记录今天的心情，开始你的情绪追踪之旅
          </p>
          <Link to="/track" className="btn btn-primary text-lg px-8 py-3">
            立即开始
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage