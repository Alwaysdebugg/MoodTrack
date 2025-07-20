import { useState, useEffect } from "react";
import { Smile, Frown, Meh, Heart, Calendar, Tag } from "lucide-react";
import { apiRequest } from "@/utils/api";
import { Loader2 } from "lucide-react";

interface MoodEntry {
  emotion_type: string;
  mood_description: string;
  triggers: string[];
  share_to_public: boolean;
  is_anonymous: boolean;
  record_time: string;
}

const moodTypeMapping: { [key: string]: number } = {
  "very bad": 1,
  "bad": 2,
  "neutral": 3,
  "good": 4,
  "very good": 5,
};

const HistoryPage = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // 获取后端心情记录
  const fetchMoodEntries = async () => {
    try {
      setLoading(true);
      // 调用API获取心情记录
      const res = await apiRequest("/api/v1/moods", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("获取心情记录成功:", res);
      setEntries(res.data.moods || []);
    } catch (error) {
      console.error("获取心情记录失败:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // const savedEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]')
    // setEntries(savedEntries.reverse())
    fetchMoodEntries();
  }, []);

  const getMoodIcon = (mood: string) => {
    switch (moodTypeMapping[mood]) {
      case 1:
      case 2:
        return <Frown className="w-6 h-6 text-red-500" />;
      case 3:
        return <Meh className="w-6 h-6 text-yellow-500" />;
      case 4:
        return <Smile className="w-6 h-6 text-green-500" />;
      case 5:
        return <Heart className="w-6 h-6 text-pink-500" />;
      default:
        return null;
    }
  };

  const getMoodLabel = (mood: string) => {
    const labels = ["", "很糟糕", "不好", "一般", "不错", "很棒"];
    return labels[moodTypeMapping[mood]] || "未知";
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (entries.length === 0 && !loading) {
    // 如果没有心情记录，显示提示
    return (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">
          暂无心情记录
        </h2>
        <p className="text-gray-500">开始记录你的第一个心情吧！</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">心情历史</h1>
        <p className="text-lg text-gray-600">查看你的心情变化记录</p>
      </div>

      {/* 心情记录列表 */}
      {entries.length > 0 && !loading && (
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <div key={index} className="card">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getMoodIcon(entry.emotion_type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">
                      {getMoodLabel(entry.emotion_type)}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {formatDate(entry.record_time)}
                    </span>
                  </div>
                  {entry.mood_description && (
                    <p className="text-gray-700 mb-3">{entry.mood_description}</p>
                  )}
                  {/* Triggers 显示 */}
                  {entry.triggers && entry.triggers.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-gray-500" />
                      <div className="flex flex-wrap gap-2">
                        {entry.triggers.map((trigger, triggerIndex) => (
                          <span
                            key={triggerIndex}
                            className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                          >
                            {trigger}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 加载状态 */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
          <span className="ml-2 text-gray-600">加载中...</span>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
