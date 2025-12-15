import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  TrendingUp,
  Calendar,
  Brain,
  Loader2,
  FileText,
} from 'lucide-react';
import { apiRequest } from '../utils/api';

const HomePage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  // 获取近7天的日期范围
  const getLast7DateRange = (): { startDate: string; endDate: string } => {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6);

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    };
  };

  // AI分析API调用
  const generateAnalysisReport = async () => {
    setIsGenerating(true);
    setAnalysisResult(null);

    try {
      const dateRange = getLast7DateRange();
      const reqBody = {
        analysisType: 'weekly',
        dateRange,
        preferences: {
          language: 'zh-CN',
          depth: 'detailed',
          focusAreas: ['stress', 'sleep', 'work'],
        },
      };

      const response = await apiRequest('/api/v1/ai-analysis/generate', {
        method: 'POST',
        data: reqBody,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || '分析请求失败');
      }

      console.log('AI分析结果:', result.data);
      setAnalysisResult(result.data);
    } catch (error) {
      console.error('分析生成失败:', error);
      setAnalysisResult('分析过程中出现错误，请稍后重试。');
    } finally {
      setIsGenerating(false);
    }
  };

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
          <p className="text-gray-600 mb-4">快速记录当下的心情状态</p>
          <Link to="/track" className="btn btn-primary">
            开始记录
          </Link>
        </div>

        <div className="card text-center">
          <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">趋势分析</h3>
          <p className="text-gray-600 mb-4">查看心情变化趋势和统计</p>
          <Link to="/history" className="btn btn-secondary">
            查看分析
          </Link>
        </div>

        <div className="card text-center">
          <Calendar className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">历史记录</h3>
          <p className="text-gray-600 mb-4">浏览过往的心情记录</p>
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
  );
};

export default HomePage;
