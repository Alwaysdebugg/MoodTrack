import { useState } from 'react'
import { Smile, Frown, Meh, Heart, Star } from 'lucide-react'

const TrackMoodPage = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [note, setNote] = useState('')

  const moods = [
    { id: 1, label: '很糟糕', icon: Frown, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 2, label: '不好', icon: Frown, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 3, label: '一般', icon: Meh, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { id: 4, label: '不错', icon: Smile, color: 'text-green-500', bg: 'bg-green-50' },
    { id: 5, label: '很棒', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-50' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedMood === null) return

    const moodEntry = {
      mood: selectedMood,
      note,
      timestamp: new Date().toISOString()
    }

    const existingEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]')
    existingEntries.push(moodEntry)
    localStorage.setItem('moodEntries', JSON.stringify(existingEntries))

    setSelectedMood(null)
    setNote('')
    alert('心情记录已保存！')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          记录你的心情
        </h1>
        <p className="text-lg text-gray-600">
          选择最符合当前感受的心情，并添加一些备注
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">今天心情如何？</h2>
          <div className="grid grid-cols-5 gap-4">
            {moods.map(({ id, label, icon: Icon, color, bg }) => (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedMood(id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedMood === id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${bg}`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${color}`} />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">添加备注（可选）</h2>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="记录一下今天发生了什么，或者描述你的感受..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={selectedMood === null}
            className={`btn text-lg px-8 py-3 ${
              selectedMood === null
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            <Star className="w-5 h-5" />
            保存心情记录
          </button>
        </div>
      </form>
    </div>
  )
}

export default TrackMoodPage