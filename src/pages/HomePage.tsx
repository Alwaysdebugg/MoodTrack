import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, TrendingUp, Calendar, Brain, Loader2, FileText } from 'lucide-react'
import { MoodEntry } from '../types'

const HomePage = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<string | null>(null)

  // 获取近7天的心情记录
  const getLast7DaysEntries = (): MoodEntry[] => {
    const allEntries: MoodEntry[] = JSON.parse(localStorage.getItem('moodEntries') || '[]')
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    return allEntries.filter(entry => {
      const entryDate = new Date(entry.timestamp)
      return entryDate >= sevenDaysAgo
    })
  }

  // 模拟AI分析API调用
  const generateAnalysisReport = async () => {
    setIsGenerating(true)
    setAnalysisResult(null)

    try {
      const last7DaysEntries = getLast7DaysEntries()
      
      if (last7DaysEntries.length === 0) {
        setAnalysisResult('抱歉，暂无足够的心情数据进行分析。请先记录一些心情后再试。')
        return
      }

      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 2000))

      // 这里将来会替换为真实的API调用
      // const response = await fetch('/api/analyze-mood', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ entries: last7DaysEntries })
      // })
      // const result = await response.json()

      // 生成更详细的AI分析结果
      const avgMood = last7DaysEntries.reduce((sum, entry) => sum + entry.mood, 0) / last7DaysEntries.length
      const moodVariance = last7DaysEntries.reduce((sum, entry) => sum + Math.pow(entry.mood - avgMood, 2), 0) / last7DaysEntries.length
      const stability = moodVariance < 0.5 ? '非常稳定' : moodVariance < 1 ? '较为稳定' : moodVariance < 2 ? '有波动' : '波动较大'
      
      // 分析心情分布
      const moodCounts = [0, 0, 0, 0, 0, 0] // 索引1-5对应心情1-5
      last7DaysEntries.forEach(entry => moodCounts[entry.mood]++)
      const dominantMood = moodCounts.indexOf(Math.max(...moodCounts.slice(1)))
      
      // 分析最近趋势（最后3天vs前4天）
      const recentEntries = last7DaysEntries.slice(-3)
      const earlierEntries = last7DaysEntries.slice(0, -3)
      const recentAvg = recentEntries.length > 0 ? recentEntries.reduce((sum, entry) => sum + entry.mood, 0) / recentEntries.length : avgMood
      const earlierAvg = earlierEntries.length > 0 ? earlierEntries.reduce((sum, entry) => sum + entry.mood, 0) / earlierEntries.length : avgMood
      const trend = recentAvg > earlierAvg + 0.3 ? '上升' : recentAvg < earlierAvg - 0.3 ? '下降' : '平稳'
      
      // 生成个性化建议
      const getPersonalizedAdvice = () => {
        const advice = []
        
        if (avgMood < 2.5) {
          advice.push('🌟 **优先关注心理健康**')
          advice.push('- 建议寻求专业心理咨询师的帮助')
          advice.push('- 尝试每天进行10-15分钟的深呼吸练习')
          advice.push('- 与信任的朋友或家人分享您的感受')
          advice.push('- 考虑加入情感支持小组或在线社区')
        } else if (avgMood < 3.5) {
          advice.push('💪 **提升情绪状态的建议**')
          advice.push('- 制定每日小目标，增强成就感')
          advice.push('- 尝试新的爱好或重拾旧时兴趣')
          advice.push('- 每天至少30分钟户外活动或运动')
          advice.push('- 练习感恩日记，记录每天的积极事件')
        } else {
          advice.push('✨ **保持积极状态的方法**')
          advice.push('- 继续当前的良好习惯和生活方式')
          advice.push('- 可以尝试帮助他人，分享正能量')
          advice.push('- 设定新的个人成长目标')
          advice.push('- 定期反思和庆祝自己的进步')
        }
        
        if (moodVariance > 1.5) {
          advice.push('')
          advice.push('🎯 **情绪稳定性建议**')
          advice.push('- 建立规律的日常作息时间')
          advice.push('- 学习情绪管理技巧，如正念冥想')
          advice.push('- 识别并避免情绪触发因素')
          advice.push('- 使用情绪日记追踪情绪变化的原因')
        }
        
        if (trend === '下降') {
          advice.push('')
          advice.push('⚠️ **近期趋势关注**')
          advice.push('- 最近几天心情呈下降趋势，需要特别关注')
          advice.push('- 回顾最近发生的事件，找出可能的影响因素')
          advice.push('- 主动寻求支持，不要独自承受压力')
          advice.push('- 如果趋势持续，建议咨询专业人士')
        } else if (trend === '上升') {
          advice.push('')
          advice.push('🎉 **积极趋势强化**')
          advice.push('- 最近心情有所改善，继续保持！')
          advice.push('- 总结最近做对了什么，继续这些积极行为')
          advice.push('- 可以适当增加挑战，进一步提升自己')
        }
        
        return advice.join('\n')
      }

      
    const mockAnalysis = `🤖 **AI心情分析报告**

      📊 **数据概览**
      - 分析周期：过去 ${last7DaysEntries.length} 天
      - 平均心情指数：${avgMood.toFixed(1)}/5.0
      - 情绪稳定性：${stability}
      - 近期趋势：${trend}

      🔍 **深度分析**
      ${avgMood >= 4 
        ? '您的心情状态非常积极！这表明您有良好的情绪管理能力和生活满意度。'
        : avgMood >= 3.5 
        ? '您的心情状态整体良好，大部分时间都能保持积极的心态。'
        : avgMood >= 2.5 
        ? '您的心情状态处于中等水平，有改善的空间，建议采取一些积极措施。'
        : '您最近的心情状态需要关注，建议寻求支持和专业帮助。'
      }

      在过去一周中，您${dominantMood === 5 ? '经常感到很棒' : dominantMood === 4 ? '多数时候心情不错' : dominantMood === 3 ? '心情平平居多' : dominantMood <= 2 ? '经历了一些困难时期' : '心情变化较大'}。

      ${getPersonalizedAdvice()}

      📈 **下周建议**
      - 继续记录心情，建立长期观察数据
      - 尝试实施上述1-2项建议，观察效果
      - 设定小目标，逐步改善生活质量
      - 记住：每一天都是新的开始

      💝 **温馨提醒**
      情绪波动是正常的人类体验。这份分析旨在帮助您更好地了解自己的情绪模式，但不能替代专业的心理健康咨询。如果您持续感到困扰，请寻求专业帮助。

      *本分析基于AI算法生成，结合了心理学研究和情绪管理最佳实践*`

      setAnalysisResult(mockAnalysis)
    } catch (error) {
      setAnalysisResult('分析过程中出现错误，请稍后重试。')
    } finally {
      setIsGenerating(false)
    }
  }

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

      {/* AI分析窗口 */}
      <div className="card bg-gradient-to-r from-purple-50 to-blue-50 border-none">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-8 h-8 text-purple-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">
              AI 心情分析
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            基于您的心情记录，生成个性化的情绪分析报告
          </p>
          
          {!analysisResult ? (
            <button
              onClick={generateAnalysisReport}
              disabled={isGenerating}
              className={`btn text-lg px-8 py-3 ${
                isGenerating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  正在分析中...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 mr-2" />
                  生成分析报告
                </>
              )}
            </button>
          ) : (
            <div className="text-left">
              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-4 max-h-96 overflow-y-auto">
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                    {analysisResult}
                  </pre>
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={generateAnalysisReport}
                  disabled={isGenerating}
                  className="btn btn-secondary"
                >
                  🔄 重新生成分析
                </button>
                <button
                  onClick={() => setAnalysisResult(null)}
                  className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  ✨ 生成新报告
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage