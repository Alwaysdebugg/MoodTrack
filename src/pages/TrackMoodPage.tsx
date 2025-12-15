import { useState, useEffect } from 'react';
import { Smile, Frown, Meh, Heart, Star, CheckCircle, Tag } from 'lucide-react';
import { apiRequest } from '../utils/api';
import { Loader2 } from 'lucide-react';

const TrackMoodPage = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);

  // 自动隐藏成功提示
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const moods = [
    {
      id: 1,
      label: '很糟糕',
      icon: Frown,
      color: 'text-red-500',
      bg: 'bg-red-50',
    },
    {
      id: 2,
      label: '不好',
      icon: Frown,
      color: 'text-orange-500',
      bg: 'bg-orange-50',
    },
    {
      id: 3,
      label: '一般',
      icon: Meh,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
    },
    {
      id: 4,
      label: '不错',
      icon: Smile,
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
    {
      id: 5,
      label: '很棒',
      icon: Heart,
      color: 'text-pink-500',
      bg: 'bg-pink-50',
    },
  ];

  const moodTypeMapping: { [key: number]: string } = {
    1: 'very_bad',
    2: 'bad',
    3: 'neutral',
    4: 'good',
    5: 'excellent',
  };

  const triggerOptions = [
    '工作压力',
    '人际关系',
    '健康问题',
    '家庭事务',
    '学习压力',
    '经济状况',
    '天气变化',
    '睡眠质量',
    '运动锻炼',
    '娱乐休闲',
    '社交活动',
    '个人成长',
    '情感关系',
    '生活变化',
    '其他',
  ];

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers(prev =>
      prev.includes(trigger)
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMood === null) return;

    const moodEntry = {
      triggers: selectedTriggers,
      mood_type: moodTypeMapping[selectedMood],
      note: note,
      is_public: true,
      is_anonymous: false,
      created_at: new Date().toISOString(),
    };

    console.log('Mood Entry:', moodEntry);

    try {
      setLoading(true);
      // 调用API保存心情记录
      await apiRequest('/api/moods', {
        method: 'POST',
        data: moodEntry,
      });
      console.log('心情记录已保存！');
      setShowSuccess(true);
    } catch (error) {
      console.error('保存心情记录失败:', error);
    } finally {
      setLoading(false);
    }

    // 本地保存记录
    const existingEntries = JSON.parse(
      localStorage.getItem('moodEntries') || '[]'
    );
    existingEntries.push(moodEntry);
    localStorage.setItem('moodEntries', JSON.stringify(existingEntries));

    setSelectedMood(null);
    setNote('');
    setSelectedTriggers([]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* 成功提示框 */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <CheckCircle className="w-5 h-5" />
          <span>记录成功</span>
        </div>
      )}

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">记录你的心情</h1>
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
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Tag className="w-5 h-5 mr-2" />
            影响因素（可选）
          </h2>
          <div className="grid grid-cols-3 gap-3 mb-2">
            {triggerOptions.map(trigger => (
              <button
                key={trigger}
                type="button"
                onClick={() => toggleTrigger(trigger)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTriggers.includes(trigger)
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                    : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                }`}
              >
                {trigger}
              </button>
            ))}
          </div>
          {selectedTriggers.length > 0 && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700 mb-2">已选择的影响因素：</p>
              <div className="flex flex-wrap gap-2">
                {selectedTriggers.map(trigger => (
                  <span
                    key={trigger}
                    className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {trigger}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">添加备注（可选）</h2>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="记录一下今天发生了什么，或者描述你的感受..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={selectedMood === null || loading}
            className={`btn text-lg px-8 py-3 ${
              selectedMood === null
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                "分享中..."
              </>
            ) : (
              <>
                <Star className="w-5 h-5" />
                分享心情
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrackMoodPage;
