import { useState, useEffect } from 'react'
import { Smile, Frown, Meh, Heart, Calendar } from 'lucide-react'

interface MoodEntry {
  mood: number
  note: string
  timestamp: string
}

const HistoryPage = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([])

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]')
    setEntries(savedEntries.reverse())
  }, [])

  const getMoodIcon = (mood: number) => {
    switch (mood) {
      case 1:
      case 2:
        return <Frown className="w-6 h-6 text-red-500" />
      case 3:
        return <Meh className="w-6 h-6 text-yellow-500" />
      case 4:
        return <Smile className="w-6 h-6 text-green-500" />
      case 5:
        return <Heart className="w-6 h-6 text-pink-500" />
      default:
        return null
    }
  }

  const getMoodLabel = (mood: number) => {
    const labels = ['', '很糟糕', '不好', '一般', '不错', '很棒']
    return labels[mood]
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">
          暂无心情记录
        </h2>
        <p className="text-gray-500">
          开始记录你的第一个心情吧！
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          心情历史
        </h1>
        <p className="text-lg text-gray-600">
          查看你的心情变化记录
        </p>
      </div>

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div key={index} className="card">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getMoodIcon(entry.mood)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">
                    {getMoodLabel(entry.mood)}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(entry.timestamp)}
                  </span>
                </div>
                {entry.note && (
                  <p className="text-gray-700">{entry.note}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HistoryPage